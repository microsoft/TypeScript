///<reference path='../node/node.d.ts' />

import http = require("http")
import url = require("url")
import routes = require("./routes/index")
import db = require("./db")
import express = require("express")

var app = express();

// Configuration
app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.set('view options', { layout: false });
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});


// Routes

app.get('/', routes.index);

app.get('/findImages', function(req, res) {
    console.log('getting images from' + req.query['url']);
   
    var req2 = http.get(url.parse(req.query['url']), function(urlres) {  
      console.log("Got response: " + urlres.statusCode);   
      var text = "";
      urlres.on('data', function(chunk: string) {  
        text += chunk;
      });   
      urlres.on('end', function() {
        console.log(text);     
        var re = /<img[^>]+src=[\"\']([^\'\"]+)[\"\']/g;
        var match, matches = [];
        while(match = re.exec(text)) {
            matches.push(match[1]);
        }
        res.write(JSON.stringify(matches));
        res.end();
      });
    }).on('error', function(a,e) {  
      console.log("Got error: " + e.message);   
    });   
});

app.get('/user/:userid', function(req, res) {
    console.log('getting user ' + req.params.userid);
    db.getUser(req.params.userid, function(user) {
        res.render('user', { 
            title: user._id,
            username: user._id, 
            boards: user.boards 
       });
    });
});

app.get('/user/:userid/newboard', function(req, res) {
    res.render('newboard', { 
        username: req.params.userid
    });    
});

app.post('/user/:userid/newboard', function(req, res) {
    db.addBoard(req.params.userid, req.param('title'), req.param('description'), function(user) {
        res.redirect('/user/'+req.params.userid)
    });
});

app.get('/user/:userid/:boardid', function(req, res) {
    console.log('getting ' + req.params.userid + ", " + req.params.boardid);
    db.getUser(req.params.userid, function(user) {
        var board = user.boards.filter(function(board) {
            return decodeURIComponent(req.params.boardid) === board.title;
        })[0];
        if(board) {
            db.getImages(board.images, function(images) {
                res.render('board', { 
                    title: user._id,
                    username: user._id, 
                    board: board,
                    images: images
                });
            });
        } else {
            res.send('not found', 404);
        }
    });
});

app.get('/user/:userid/:boardid/newpin', function(req, res) {
    res.render('newpin', { 
        username: req.params.userid,
        boardid: req.params.boardid
    });    
});

app.post('/user/:userid/:boardid/newpin', function(req, res) {
    db.addPin(req.params.userid, req.params.boardid, req.param('imageUri'), req.param('link'), req.param('caption'), function(user) {
        res.redirect('/user/'+req.params.userid +"/" + req.params.boardid)
    });
});

app.get('/image/:imageid', function(req, res) {
    console.log('getting image ' + req.params.imageid);
    db.getImage(req.params.imageid, function(image) {
        res.render('image', { 
            title: "image",
            image: image
        });
    });
});

app.listen(3000, function(){
    console.log("Demo Express server listening on port %d in %s mode", 3000, app.settings.env);
});

export var App = app;