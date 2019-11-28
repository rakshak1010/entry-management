
const models = require('../models')

exports.show_create = function(req, res, next) {
  res.render('host', { title: 'Register Host' });
}

exports.create = function(req,res,next){
	console.log("Host Details", 
					req.body.host_email,
					req.body.host_name,
					req.body.host_phone,
					req.body.host_address
				);

	return models.Host.create({
		hostname: req.body.host_name,
		email: req.body.host_email,
		phonenumber: req.body.host_phone,
		address: req.body.host_address
	}).then(host => {
		res.render("success", {host: host, title: 'Register Success'});
	})
}

exports.show_hosts = function(req,res,next){
	return models.Host.findAll().then(hosts =>{
		res.render('hosts', {title: 'Search Host', hosts: hosts});
	})
}