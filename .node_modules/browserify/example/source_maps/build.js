var browserify = require('../..'),
    path = require('path'),
    fs = require('fs'),
    bundlePath = path.join(__dirname, 'js', 'build', 'bundle.js');

browserify()
    .require(require.resolve('./js/main.js'), { 
    	entry: true, 
    	debug: true  
    })
    .bundle()
    .on('error', function (err) { console.error(err); })
    .pipe(fs.createWriteStream(bundlePath));
