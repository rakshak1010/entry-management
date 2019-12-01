module.exports = {
  "development": {
    "username": "db_user_name",
    "password": 'db_use_password',
    "database": "db_name",
    "host": "127.0.0.1",
    "dialect": "postgres",
    "port" : 5432,
    "operatorsAliases": false
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "operatorsAliases": false
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "operatorsAliases": false
  },
  "mailInfo": {
    "username" : 'xxxxxxxxx@xxx.com' ,
    "password" : 'xxxx-xxxx-xxxx' 
  },
  "nexmoSMS": {
    "API_KEY" : 'xxxxxxxxx' ,
    "SECRET_KEY" : 'xxxx-xxxx-xxxx'
    "whitelist_contact" : '91xxxxxxxxxx'
  },
  "webdomain": 'ENTERYOURDOMAIN (example: localhost:3000)'
}
