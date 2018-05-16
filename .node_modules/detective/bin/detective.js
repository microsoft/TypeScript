#!/usr/bin/env node

var detective = require('../');
var argv = require('minimist')(process.argv.slice(2));
var fs = require('fs');

argv._.forEach(function(file) {
    var src = fs.readFileSync(file, 'utf8');
    var requires = detective(src, argv);
    console.log(requires.join('\n'));
});
