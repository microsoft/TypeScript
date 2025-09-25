currentDirectory::/home/src/workspaces/project
useCaseSensitiveFileNames::true
Input::
//// [/home/src/workspaces/project/index.ts] *new* 
import ky from 'ky';
export const api = ky.extend({});
//// [/home/src/workspaces/project/node_modules/ky/distribution/index.d.ts] *new* 
type KyInstance = {
    extend(options: Record<string,unknown>): KyInstance;
}
declare const ky: KyInstance;
export default ky;
//// [/home/src/workspaces/project/node_modules/ky/package.json] *new* 
{
    "name": "ky",
    "type": "module",
    "main": "./distribution/index.js"
}
//// [/home/src/workspaces/project/package.json] *new* 
{
    "type": "module"
}
//// [/home/src/workspaces/project/tsconfig.json] *new* 
{
    "compilerOptions": {
        "module": "NodeNext",
        "moduleResolution": "NodeNext",
        "composite": false,
        "incremental": false,
        "declaration": true,
        "skipLibCheck": true,
        "skipDefaultLibCheck": true,
    },
}

tsgo --explainFiles --listEmittedFiles
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[96mindex.ts[0m:[93m2[0m:[93m14[0m - [91merror[0m[90m TS4023: [0mExported variable 'api' has or is using name 'KyInstance' from external module "/home/src/workspaces/project/node_modules/ky/distribution/index" but cannot be named.

[7m2[0m export const api = ky.extend({});
[7m [0m [91m             ~~~[0m

TSFILE:  /home/src/workspaces/project/index.js
TSFILE:  /home/src/workspaces/project/index.d.ts
../../tslibs/TS/Lib/lib.esnext.full.d.ts
   Default library for target 'ESNext'
node_modules/ky/distribution/index.d.ts
   Imported via 'ky' from file 'index.ts'
   File is ECMAScript module because 'node_modules/ky/package.json' has field "type" with value "module"
index.ts
   Matched by default include pattern '**/*'
   File is ECMAScript module because 'package.json' has field "type" with value "module"

Found 1 error in index.ts[90m:2[0m

//// [/home/src/tslibs/TS/Lib/lib.esnext.full.d.ts] *Lib*
/// <reference no-default-lib="true"/>
interface Boolean {}
interface Function {}
interface CallableFunction {}
interface NewableFunction {}
interface IArguments {}
interface Number { toExponential: any; }
interface Object {}
interface RegExp {}
interface String { charAt: any; }
interface Array<T> { length: number; [n: number]: T; }
interface ReadonlyArray<T> {}
interface SymbolConstructor {
    (desc?: string | number): symbol;
    for(name: string): symbol;
    readonly toStringTag: symbol;
}
declare var Symbol: SymbolConstructor;
interface Symbol {
    readonly [Symbol.toStringTag]: string;
}
declare const console: { log(msg: any): void; };
//// [/home/src/workspaces/project/index.d.ts] *new* 
export declare const api: {
    extend(options: Record<string, unknown>): KyInstance;
};

//// [/home/src/workspaces/project/index.js] *new* 
import ky from 'ky';
export const api = ky.extend({});




Edit [0]:: no change

tsgo --explainFiles --listEmittedFiles
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[96mindex.ts[0m:[93m2[0m:[93m14[0m - [91merror[0m[90m TS4023: [0mExported variable 'api' has or is using name 'KyInstance' from external module "/home/src/workspaces/project/node_modules/ky/distribution/index" but cannot be named.

[7m2[0m export const api = ky.extend({});
[7m [0m [91m             ~~~[0m

TSFILE:  /home/src/workspaces/project/index.js
TSFILE:  /home/src/workspaces/project/index.d.ts
../../tslibs/TS/Lib/lib.esnext.full.d.ts
   Default library for target 'ESNext'
node_modules/ky/distribution/index.d.ts
   Imported via 'ky' from file 'index.ts'
   File is ECMAScript module because 'node_modules/ky/package.json' has field "type" with value "module"
index.ts
   Matched by default include pattern '**/*'
   File is ECMAScript module because 'package.json' has field "type" with value "module"

Found 1 error in index.ts[90m:2[0m

//// [/home/src/workspaces/project/index.d.ts] *rewrite with same content*
//// [/home/src/workspaces/project/index.js] *rewrite with same content*



Edit [1]:: build -b

tsgo -b --explainFiles --listEmittedFiles --v
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because output file 'tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project 'tsconfig.json'...

[96mindex.ts[0m:[93m2[0m:[93m14[0m - [91merror[0m[90m TS4023: [0mExported variable 'api' has or is using name 'KyInstance' from external module "/home/src/workspaces/project/node_modules/ky/distribution/index" but cannot be named.

[7m2[0m export const api = ky.extend({});
[7m [0m [91m             ~~~[0m

TSFILE:  /home/src/workspaces/project/index.js
TSFILE:  /home/src/workspaces/project/index.d.ts
TSFILE:  /home/src/workspaces/project/tsconfig.tsbuildinfo
../../tslibs/TS/Lib/lib.esnext.full.d.ts
   Default library for target 'ESNext'
node_modules/ky/distribution/index.d.ts
   Imported via 'ky' from file 'index.ts'
   File is ECMAScript module because 'node_modules/ky/package.json' has field "type" with value "module"
index.ts
   Matched by default include pattern '**/*'
   File is ECMAScript module because 'package.json' has field "type" with value "module"

Found 1 error in index.ts[90m:2[0m

//// [/home/src/workspaces/project/index.d.ts] *rewrite with same content*
//// [/home/src/workspaces/project/index.js] *rewrite with same content*
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","errors":true,"root":["./index.ts"]}
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "errors": true,
  "root": [
    {
      "files": [
        "./index.ts"
      ],
      "original": "./index.ts"
    }
  ],
  "size": 63
}

tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.esnext.full.d.ts
*refresh*    /home/src/workspaces/project/node_modules/ky/distribution/index.d.ts
*refresh*    /home/src/workspaces/project/index.ts
Signatures::
