currentDirectory::/user/username/projects/sample1
useCaseSensitiveFileNames::true
Input::
//// [/user/username/projects/sample1/core/anotherModule.ts] *new* 
export const World = "hello";
//// [/user/username/projects/sample1/core/index.ts] *new* 
export const someString: string = "HELLO WORLD";
export function leftPad(s: string, n: number) { return s + n; }
export function multiply(a: number, b: number) { return a * b; }
//// [/user/username/projects/sample1/core/some_decl.d.ts] *new* 
declare const dts: any;
//// [/user/username/projects/sample1/core/tsconfig.json] *new* 
{
    "compilerOptions": {
        
        "declaration": true,
        "declarationMap": true,
        "skipDefaultLibCheck": true,
    },
}
//// [/user/username/projects/sample1/logic/index.ts] *new* 
import * as c from '../core/index';
export function getSecondsInDay() {
    return c.multiply(10, 15);
}
import * as mod from '../core/anotherModule';
export const m = mod;
//// [/user/username/projects/sample1/logic/tsconfig.json] *new* 
{
    "compilerOptions": {
        "composite": true,
        "declaration": true,
        "sourceMap": true,
        "skipDefaultLibCheck": true,
    },
    "references": [
        { "path": "../core" },
    ],
}
//// [/user/username/projects/sample1/tests/index.ts] *new* 
import * as c from '../core/index';
import * as logic from '../logic/index';

c.leftPad("", 10);
logic.getSecondsInDay();

import * as mod from '../core/anotherModule';
export const m = mod;
//// [/user/username/projects/sample1/tests/tsconfig.json] *new* 
{
    "references": [
        { "path": "../core" },
        { "path": "../logic" },
    ],
    "files": ["index.ts"],
    "compilerOptions": {
        "composite": true,
        "declaration": true,
        "skipDefaultLibCheck": true,
    },
}

tsgo --b core --verbose
ExitStatus:: Success
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * core/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'core/tsconfig.json' is out of date because output file 'core/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project 'core/tsconfig.json'...

//// [/home/src/tslibs/TS/Lib/lib.d.ts] *Lib*
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
//// [/user/username/projects/sample1/core/anotherModule.d.ts] *new* 
export declare const World = "hello";
//# sourceMappingURL=anotherModule.d.ts.map
//// [/user/username/projects/sample1/core/anotherModule.d.ts.map] *new* 
{"version":3,"file":"anotherModule.d.ts","sourceRoot":"","sources":["anotherModule.ts"],"names":[],"mappings":"AAAA,eAAO,MAAM,KAAK,UAAU,CAAC"}
//// [/user/username/projects/sample1/core/anotherModule.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.World = void 0;
exports.World = "hello";

//// [/user/username/projects/sample1/core/index.d.ts] *new* 
export declare const someString: string;
export declare function leftPad(s: string, n: number): string;
export declare function multiply(a: number, b: number): number;
//# sourceMappingURL=index.d.ts.map
//// [/user/username/projects/sample1/core/index.d.ts.map] *new* 
{"version":3,"file":"index.d.ts","sourceRoot":"","sources":["index.ts"],"names":[],"mappings":"AAAA,eAAO,MAAM,UAAU,EAAE,MAAsB,CAAC;AAChD,wBAAgB,OAAO,CAAC,CAAC,EAAE,MAAM,EAAE,CAAC,EAAE,MAAM,UAAmB;AAC/D,wBAAgB,QAAQ,CAAC,CAAC,EAAE,MAAM,EAAE,CAAC,EAAE,MAAM,UAAmB"}
//// [/user/username/projects/sample1/core/index.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.someString = void 0;
exports.leftPad = leftPad;
exports.multiply = multiply;
exports.someString = "HELLO WORLD";
function leftPad(s, n) { return s + n; }
function multiply(a, b) { return a * b; }

//// [/user/username/projects/sample1/core/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":["./anotherModule.ts","./index.ts","./some_decl.d.ts"]}
//// [/user/username/projects/sample1/core/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./anotherModule.ts"
      ],
      "original": "./anotherModule.ts"
    },
    {
      "files": [
        "./index.ts"
      ],
      "original": "./index.ts"
    },
    {
      "files": [
        "./some_decl.d.ts"
      ],
      "original": "./some_decl.d.ts"
    }
  ],
  "size": 89
}

core/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.d.ts
*refresh*    /user/username/projects/sample1/core/anotherModule.ts
*refresh*    /user/username/projects/sample1/core/index.ts
*refresh*    /user/username/projects/sample1/core/some_decl.d.ts
Signatures::
(stored at emit) /user/username/projects/sample1/core/anotherModule.ts
(stored at emit) /user/username/projects/sample1/core/index.ts
