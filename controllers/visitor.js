const models = require('../models');
const nodemailer = require("nodemailer");
const config = require('../config/config');
const Nexmo = require('nexmo');

exports.initialise = function(req, res, next) {
    console.log("host id:", req.body.host_id);

    var hostid = req.body.host_id;
    return models.Host.findOne({
        where: { id: hostid }
    }).then(host => {
        res.render('visitor', { host: host, title: 'Get Appointmnet' });
    })
}

exports.create = function(req, res, next) {
    console.log("Visitor Details",
        req.body.visitor_email,
        req.body.visitor_name,
        req.body.host_id,
        req.body.visitor_phone
    );

    var datetime = Date.now();

    return models.Visitor.create({
        hostid: req.body.host_id,
        visitorname: req.body.visitor_name,
        email: req.body.visitor_email,
        phonenumber: req.body.visitor_phone,
        checkin: datetime
    }).then(visitor => {
        sendVisitingMail(visitor).catch(console.error);
        sendVisitingSMS(visitor);
        sendCheckoutLink(visitor).catch(console.error);
        res.render("success", { visitor: visitor, title: 'Appointment Success' });
    })
}

exports.checkout = function(req, res, next) {

    var datetime = new Date();

    return models.Visitor.update({
			checkout: datetime
		}, {
				returning: true, where: {
				id: req.params.id
			} 
		}).then(([ rowsUpdate, [visitor] ]) => {
        checkoutVisitor(visitor).catch(console.error);
        sendCheckoutSMS(visitor);
        res.render("success", { checkout: visitor, title: 'Checkout Success' });
    })
}

async function sendVisitingMail(visitor) {
    let testAccount = await nodemailer.createTestAccount();
    var host = models.Host.findOne({ where:{ id: visitor.hostid } }).then(host => {
    	let transporter = nodemailer.createTransport({
	        service: 'gmail',
	        auth: {
	            user: config.mailInfo.username,
	            pass: config.mailInfo.password
	        }
	    });

	    let mail_string = `
			  Mr. <strong>` + host.hostname.toUpperCase() + `</strong>, you have a visitor.
			  <br><br>Details are as follows:
			  <br><strong>Visitor Name:</strong> ` + visitor.visitorname + `
			  <br><strong>Visitor Phone Number:</strong> ` + visitor.phonenumber + `
			  <br><strong>Visitor Email:</strong> ` + visitor.email + `
			  <br><strong>Checkin Time:</strong> ` + visitor.checkin + ``;

	    // send mail with defined transport object
	    (async function(){
	    	info = await transporter.sendMail({
	        from: '"' + visitor.visitorname + '" <' + visitor.email + '>', // sender address
	        to: host.email, // list of receivers
	        subject: "Visitor Notification", // Subject line
	        html: mail_string // html body
	    },()=>{
				console.log("Message sent: %s", info.messageId);
		    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
	    });
	    })();
    });
}

async function sendCheckoutLink(visitor) {
    let testAccount = await nodemailer.createTestAccount();
    var host = models.Host.findOne({ where:{ id: visitor.hostid } }).then(host => {
    	let transporter = nodemailer.createTransport({
	        service: 'gmail',
	        auth: {
	            user: config.mailInfo.username,
	            pass: config.mailInfo.password
	        }
	    });

    	var link = config.webdomain + '/visitor/' + visitor.id + '/checkout';

	    let mail_string = `
			  Mr. <strong>` + visitor.visitorname.toUpperCase() + `</strong>, Welcome to our office.
			  <br><br>Kindly visit the below link at time of checkout.
			  <br><strong>Checkout Link:</strong> ` + link + ``;

	    // send mail with defined transport object
	    (async function(){
	    	info = await transporter.sendMail({
	        from: '"' + host.hostname + '" <' + host.email + '>', // sender address
	        to: visitor.email, // list of receivers
	        subject: "Appointment with Mr. " + host.hostname.toUpperCase(), // Subject line
	        html: mail_string // html body
	    },()=>{
				console.log("Message sent: %s", info.messageId);
		    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
	    });
	    })();
    });
}

async function checkoutVisitor(visitor) {
    let testAccount = await nodemailer.createTestAccount();
    var host = models.Host.findOne({ where:{ id: visitor.hostid } }).then(host => {
    	let transporter = nodemailer.createTransport({
	        service: 'gmail',
	        auth: {
	            user: config.mailInfo.username,
	            pass: config.mailInfo.password
	        }
	    });

	    let mail_string = `
			  Mr. <strong>` + visitor.visitorname.toUpperCase() + `</strong>, thank you for your visit.
			  <br><br>Here are your visit details:
			  <br><strong>Name:</strong> ` + visitor.visitorname + `
			  <br><strong>Host Name:</strong> ` + host.hostname + `
			  <br><strong>Host Phone Number:</strong> ` + host.phonenumber + `
			  <br><strong>Visited Address:</strong> ` + host.address + `
			  <br><strong>Checkin Time:</strong> ` + visitor.checkin + `
			  <br><strong>Checkout Time:</strong> ` + visitor.checkout + `
			  <br><br>Have a nice day!`;

	    // send mail with defined transport object
	    (async function(){
	    	info = await transporter.sendMail({
	        from: '"' + host.hostname + '" <' + host.email + '>', // sender address
	        to: visitor.email, // list of receivers
	        subject: "Checkout Updates", // Subject line
	        html: mail_string // html body
	    },()=>{
			console.log("Message sent: %s", info.messageId);
		    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
	    });
	    })();
    });
}



function sendVisitingSMS(visitor){
  var host = models.Host.findOne({ where:{ id: visitor.hostid } }).then(host => {
  	const nexmo = new Nexmo({
      apiKey: config.nexmoSMS.API_KEY,
      apiSecret: config.nexmoSMS.SECRET_KEY,
    });

    const from = visitor.name;
    const to = config.nexmoSMS.whitelist_contact;

    let sms_string = `Mr. ` + host.hostname.toUpperCase() + `, you have a visitor.\nDetails are as follows:\nVisitor Name: ` + visitor.visitorname + `\nVisitor Phone Number: ` + visitor.phonenumber + `\nVisitor Email: ` + visitor.email + `\nCheckin Time:` + visitor.checkin + `\n`;

    nexmo.message.sendSms(config.nexmoSMS.whitelist_contact, to, sms_string, {type:'unicode'},(err,response)=>{
      if(err){
        console.log(err);
      }else{
        console.log(response);
      }
    });
  });
}


function sendCheckoutSMS(visitor){
  var host = models.Host.findOne({ where:{ id: visitor.hostid } }).then(host => {
  	const nexmo = new Nexmo({
      apiKey: config.nexmoSMS.API_KEY,
      apiSecret: config.nexmoSMS.SECRET_KEY,
    });

    const from = host.name;
    const to = config.nexmoSMS.whitelist_contact;

    let sms_string = `Mr. ` + visitor.visitorname.toUpperCase() + `, thank you for your visit.\nHere are your visit details:\nName: ` + visitor.visitorname + `\nHost Name: ` + host.hostname + `\nHost Phone Number: ` + host.phonenumber + `\nVisited Address: ` + host.address + `\nCheckin Time: ` + visitor.checkin + `\nCheckout Time: ` + visitor.checkout + `\n`;

    nexmo.message.sendSms(config.nexmoSMS.whitelist_contact, to, sms_string, {type:'unicode'},(err,response)=>{
      if(err){
        console.log(err);
      }else{
        console.log(response);
      }
    });
  });
}