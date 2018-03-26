var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

//#region "Keystone"
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
//#endregion




app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
    //TODO: Send Ack to client
    socket.on('acknowledgement', function (data, sendAck) {
        var UserModel = keystone.list('User');
        var displayNameData = data;

        console.log('Data on Server -----> ' + displayNameData);

        //Send Ack
        sendAck(displayNameData);


        //#region Get All
        UserModel.model.find()
            .exec(function (err, data) {
                console.log('---------------------------');
                console.log('UserDate is -->' + data);
            });
        //#endregion

        //#region GET 5 POST
        //TODO: to load the last 5 posts
        // UserModel.model.find()
        //     .where('state', 'published')
        //     .populate('author')
        //     .sort('-publishedAt')
        //     .limit(5)
        //     .exec(function (err, posts) {
        //         // do something with posts
        //     });
        //#endregion

        //#region FIND ONE
        UserModel.model.findOne({ displayName: displayNameData })
            .exec(function (err, data) {
                console.log('---------------------------');
                console.log('UserDate "findOne" is -->' + data);
            });
        //#endregion

        //#region POST
        if (displayNameData != null && displayNameData != '') {

            //TODO: Create Model
            var newUser = new UserModel.model({
                displayName: displayNameData,
                email: displayNameData + '@gmail.com',
                password: displayNameData + '@11'
            });

            newUser.save(function (err) {
                // post has been saved
                console.log("---------------------------------");
                if (!err)
                    console.log("Data Saved");
            });
        }
        //#endregion

        //#region DELETE
        // UserModel.model.findById(postId)
        //     .remove(function (err) {
        //         // post has been deleted
        //     });
        //#endregion

    });
});




server.listen(1200, function () {
    console.log('Server connected..');
});
