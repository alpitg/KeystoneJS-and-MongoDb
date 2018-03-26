var keystone = require('keystone');

keystone.init({
    'cookie secret': 'secure string goes here',
    'name': 'keystoneJs',
    'user model': 'User',
    'auto update': true,
    'auth': true,
});

//This should be placed after keystone.init but before keystone.start
keystone.import('models');

keystone.start();