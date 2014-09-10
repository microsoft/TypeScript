/// <reference path="../src/harness/external/node.d.ts" />

import fs = require('fs');
import path = require('path');

interface IOLog {
    filesRead: {
        path: string;
        result: { contents: string; };
    }[];
}

module Commands {
    export function dir(obj: IOLog) {
        obj.filesRead.filter(f => f.result !== undefined).forEach(f => {
            console.log(f.path);
        });
    }
    dir['description'] = ': displays a list of files';

    export function find(obj: IOLog, str: string) {
        obj.filesRead.filter(f => f.result !== undefined).forEach(f => {
            var lines = f.result.contents.split('\n');
            var printedHeader = false;
            lines.forEach(line => {
                if (line.indexOf(str) >= 0) {
                    if (!printedHeader) {
                        console.log(' === ' + f.path + ' ===');
                        printedHeader = true;
                    }
                    console.log(line);
                }
            });
        });
    }
    find['description'] = ' string: finds text in files';

    export function grab(obj: IOLog, filename: string) {
        obj.filesRead.filter(f => f.result !== undefined).forEach(f => {
            if (path.basename(f.path) === filename) {
                fs.writeFile(filename, f.result.contents);
            }
        });
    }
    grab['description'] = ' filename.ts: writes out the specified file to disk';
}

var args = process.argv.slice(2);
if (args.length < 2) {
    console.log('Usage: node ior.js path_to_file.json [command]');
    console.log('List of commands: ');
    Object.keys(Commands).forEach(k => console.log('   ' + k + Commands[k]['description']));
} else {
    var cmd: Function = Commands[args[1]];
    if (cmd === undefined) {
        console.log('Unknown command ' + args[1]);
    } else {
        fs.readFile(args[0], 'utf-8', (err, data) => {
            if (err) throw err;
            var json = JSON.parse(data);
            cmd.apply(undefined, [json].concat(args.slice(2)));
        });
    }
}

