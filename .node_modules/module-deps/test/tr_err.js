var mdeps = require('../');
var test = require('tap').test;
var JSONStream = require('JSONStream');
var packer = require('browser-pack');
var through = require('through2');
var path = require('path');

test('transform', function (t) {
    t.plan(1);
    var p = mdeps({
        transform: function (file) {
            return through(function () {
                this.emit('error', new Error('rawr'));
            });
        }
    });
    p.on('error', function (err) {
        t.ok(/tr_sh[\\\/]main\.js/.test(err));
    });
    p.end(path.join(__dirname, '/files/tr_sh/main.js'));
});
