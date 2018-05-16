#!/usr/bin/env node

var spawn = require('child_process').spawn;
var fs = require('fs');
var concat = require('concat-stream');
var path = require('path');

var uglify = spawn(
    require.resolve('uglify-js/bin/uglifyjs'),
    ['--wrap-iife', '-c', 'side_effects=false,screw_ie8=false', '--verbose', '--ie8', '--passes=5', '-m', '--source-map', '--', '-']
);

fs.createReadStream(path.join(__dirname, '..', 'prelude.js'))
    .pipe(uglify.stdin)
;

uglify.stdout
    .pipe(concat({ encoding: 'string' }, function (str) {
        fs.writeFileSync(path.join(__dirname, '..', '_prelude.js'), str.replace(/;\s*$/, ''));
    }))
;
