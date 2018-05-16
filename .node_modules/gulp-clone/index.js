'use strict';

var through = require('through2')
var PluginError = require('plugin-error')

var cloneStream = function() {
    return through.obj(function(file, enc, cb) {
        cb(null, file.clone());
    });
};

var cloneSink = function() {
    var tapStream = through.obj();

    var stream = through.obj(function(file, enc, cb) {
        if (file.isStream()) {
            this.emit('error', new PluginError('gulp-clone', 'Streaming not supported'));
            return cb();
        }

        if (file.isNull()) {
            return cb(null, file);  // Do nothing if no contents
        }

        tapStream.write(file.clone());
        cb(null, file);
    });

    stream.tap = function() {
        return tapStream;
    };

    return stream;
};

module.exports = cloneStream;
module.exports.sink = cloneSink;
