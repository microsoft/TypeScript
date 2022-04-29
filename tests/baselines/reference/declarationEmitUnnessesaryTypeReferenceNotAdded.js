//// [tests/cases/compiler/declarationEmitUnnessesaryTypeReferenceNotAdded.ts] ////

//// [minimist.d.ts]
declare namespace thing {
    interface ParsedArgs {}
}
declare function thing(x: any): thing.ParsedArgs;
export = thing;
//// [package.json]
{
    "name": "minimist",
    "version": "0.0.1",
    "types": "./minimist.d.ts"
}
//// [process.d.ts]
declare const thing: any;
export = thing;
//// [package.json]
{
    "name": "process",
    "version": "0.0.1",
    "types": "./process.d.ts"
}
//// [index.ts]
import minimist = require('minimist');
import process = require('process');

export default function parseArgs(): minimist.ParsedArgs {
  return minimist(process.argv.slice(2));
}


//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var minimist = require("minimist");
var process = require("process");
function parseArgs() {
    return minimist(process.argv.slice(2));
}
exports.default = parseArgs;


//// [index.d.ts]
import minimist = require('minimist');
export default function parseArgs(): minimist.ParsedArgs;
