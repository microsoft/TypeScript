/// <reference path="..\src\harness\external\node.d.ts" />

import cp = require('child_process');
import fs = require('fs');

var args = process.argv.slice(2);

var jake = cp.exec('jake clean local', () => void 0);
jake.on('close', code => {
    if (code === 0) {
        // See what we're being asked to do
        if (args[1] === 'compiles' || args[1] === '!compiles') {
            var tsc = cp.exec('node built/local/tsc.js ' + args[0], () => void 0);
            tsc.on('close', tscCode => {
                if ((tscCode === 0) === (args[1] === 'compiles')) {
                    console.log('Good');
                    process.exit(0); // Good
                } else {
                    console.log('Bad');
                    process.exit(1); // Bad
                }
            });
        } else if (args[1] === 'emits' || args[1] === '!emits') {
            var tsc = cp.exec('node built/local/tsc.js ' + args[0], () => void 0);
            tsc.on('close', tscCode => {
                fs.readFile(args[2], 'utf-8', (err, data) => {
                    var doesContains = data.indexOf(args[3]) >= 0;
                    if (doesContains === (args[1] === 'emits')) {
                        console.log('Good');
                        process.exit(0); // Good
                    } else {
                        console.log('Bad');
                        process.exit(1); // Bad
                    }
                });
            });
        } else {
            console.log('Unknown command line arguments.');
            console.log('Usage (compile errors): git bisect run scripts\bisect.js "foo.ts --module amd" compiles');
            console.log('Usage (emit check): git bisect run scripts\bisect.js bar.ts emits bar.js "_this = this"');
            process.exit(-1);
        }
    } else {
        // Build failed
        process.exit(125); // bisect skip
    }
});
 