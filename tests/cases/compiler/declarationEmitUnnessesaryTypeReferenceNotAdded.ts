// @declaration: true
// @target: es5
// @module: commonjs
// @strict: true
// @noImplicitReferences: true
// @currentDirectory: /
// @filename: /node_modules/@types/minimist/minimist.d.ts
declare namespace thing {
    interface ParsedArgs {}
}
declare function thing(x: any): thing.ParsedArgs;
export = thing;
// @filename: /node_modules/@types/minimist/package.json
{
    "name": "minimist",
    "version": "0.0.1",
    "types": "./minimist.d.ts"
}
// @filename: /node_modules/@types/process/process.d.ts
declare const thing: any;
export = thing;
// @filename: /node_modules/@types/process/package.json
{
    "name": "process",
    "version": "0.0.1",
    "types": "./process.d.ts"
}
// @filename: /index.ts
import minimist = require('minimist');
import process = require('process');

export default function parseArgs(): minimist.ParsedArgs {
  return minimist(process.argv.slice(2));
}
