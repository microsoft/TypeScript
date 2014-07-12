// Mongo
import mongodb = require('mongodb');

var server = new mongodb.Server('localhost', 27017, {auto_reconnect: true}, {})
var db = new mongodb.Db('mydb', server);
db.open(function() {});

export interface User {
    _id: string;
    email: string;
    first_name: string;
    last_name: string;
    fbId: number;
    boards: Board[];
}

export interface Board {
    title: string;
    description: string;
    images: mongodb.ObjectID[];
}

export interface Image {
    _id: mongodb.ObjectID;
    user: string;
    caption: string;
    imageUri: string;
    link: string;
    board: string;
    comments: {text: string; user: string;}[];
}

export function getUser(id: string, callback: (user: User) => void) {
    db.collection('users', function(error, users) {
        if(error) { console.error(error); return; }
        users.findOne({_id: id}, function(error, user) {
           if(error) { console.error(error); return; }
           callback(user);
        });
    });
}

export function getUsers(callback: (users: User[]) => void) {
    db.collection('users', function(error, users_collection) {
        if(error) { console.error(error); return; }
        users_collection.find({}, { '_id': 1 }).toArray(function(error, userobjs) {
           if(error) { console.error(error); return; }
           callback(userobjs);
        });
    });
}

export function getImage(imageId: string, callback: (image: Image) => void) {
    db.collection('images', function(error, images_collection) {
        if(error) { console.error(error); return; }
        images_collection.findOne({_id: new mongodb.ObjectID(imageId)}, function(error, image) {
            if(error) { console.error(error); return; }
            callback(image);
        });
    });
}

export function getImages(imageIds: mongodb.ObjectID[], callback: (images: Image[]) => void) {
    db.collection('images', function(error, images_collection) {
        if(error) { console.error(error); return; }
        images_collection.find({_id: {$in: imageIds}}).toArray(function(error, images) {
            callback(images);
        });
    }); 
}

export function addBoard(userid: any, title: string, description: string, callback: (user: User) => void) {
    db.collection('users', function(error, users) {
        if(error) { console.error(error); return; }
        users.update(
            {_id: userid}, 
            {"$push": {boards: { title: title, description: description, images: []}}}, 
            function(error, user) {
                if(error) { console.error(error); return; }
                callback(user);
            }
        );
    });
}

export function addPin(userid: string, boardid: string, imageUri: string, link: string, caption: string, callback: (user: User) => void) {
    db.collection('images', function(error, images_collection) {
        if(error) { console.error(error); return; }
        images_collection.insert({
            user: userid,
            caption: caption,
            imageUri: imageUri,
            link: link,
            board: boardid,
            comments: []
        }, function(error, image) {
            console.log(image);
            db.collection('users', function(error, users) {
                if(error) { console.error(error); return; }
                users.update(
                    {_id: userid, "boards.title": boardid}, 
                    {"$push": {"boards.$.images": image[0]._id}},
                    function(error, user) {
                        callback(user);
                    }
                );
            })
        })
    })
}
