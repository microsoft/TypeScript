var mdeps = require('../');
var test = require('tap').test;
var JSONStream = require('JSONStream');
var packer = require('browser-pack');
var through = require('through2');
var concat = require('concat-stream');
var path = require('path');

test('transform no entry', function (t) {
    t.plan(1);
    var p = mdeps({
        transform: [ function (file) {
            return through(function (buf, enc, next) {
                this.push(String(buf).replace(/AAA/g, '"WOW"'));
                next();
            });
        } ]
    });
    p.end({
        file: path.join(__dirname, '/files/tr_no_entry/main.js'),
        id: 'xxx'
    });
    
    p.pipe(JSONStream.stringify()).pipe(packer())
        .pipe(concat(function (body) {
            var con = { log: function (x) { t.equal(x, 'WOW') } };
            var src = 'require=' + body.toString('utf8') + ';require("xxx")';
            Function('console', src)(con);
        }))
    ;
});
