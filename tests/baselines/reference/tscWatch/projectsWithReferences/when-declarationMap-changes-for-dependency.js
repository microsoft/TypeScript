currentDirectory:: /user/username/projects/sample1 useCaseSensitiveFileNames:: false
Input::
//// [/user/username/projects/sample1/core/tsconfig.json]
{
  "compilerOptions": {
    "composite": true,
    "declaration": true,
    "declarationMap": true,
    "skipDefaultLibCheck": true
  }
}

//// [/user/username/projects/sample1/core/index.ts]
export const someString: string = "HELLO WORLD";
export function leftPad(s: string, n: number) { return s + n; }
export function multiply(a: number, b: number) { return a * b; }


//// [/user/username/projects/sample1/core/some_decl.d.ts]
declare const dts: any;

//// [/user/username/projects/sample1/core/anotherModule.ts]
export const World = "hello";

//// [/user/username/projects/sample1/logic/tsconfig.json]
{
  "compilerOptions": {
    "composite": true,
    "declaration": true,
    "sourceMap": true,
    "forceConsistentCasingInFileNames": true,
    "skipDefaultLibCheck": true
  },
  "references": [
    {
      "path": "../core"
    }
  ]
}

//// [/user/username/projects/sample1/logic/index.ts]
import * as c from '../core/index';
export function getSecondsInDay() {
    return c.multiply(10, 15);
}
import * as mod from '../core/anotherModule';
export const m = mod;


//// [/user/username/projects/sample1/tests/tsconfig.json]
{
  "references": [
    {
      "path": "../core"
    },
    {
      "path": "../logic"
    }
  ],
  "files": [
    "index.ts"
  ],
  "compilerOptions": {
    "composite": true,
    "declaration": true,
    "forceConsistentCasingInFileNames": true,
    "skipDefaultLibCheck": true
  }
}

//// [/user/username/projects/sample1/tests/index.ts]
import * as c from '../core/index';
import * as logic from '../logic/index';

c.leftPad("", 10);
logic.getSecondsInDay();

import * as mod from '../core/anotherModule';
export const m = mod;


//// [/home/src/tslibs/TS/Lib/lib.d.ts]
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
declare const console: { log(msg: any): void; };

//// [/user/username/projects/sample1/core/anotherModule.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.World = void 0;
exports.World = "hello";


//// [/user/username/projects/sample1/core/anotherModule.d.ts.map]
{"version":3,"file":"anotherModule.d.ts","sourceRoot":"","sources":["anotherModule.ts"],"names":[],"mappings":"AAAA,eAAO,MAAM,KAAK,UAAU,CAAC"}

//// [/user/username/projects/sample1/core/anotherModule.d.ts]
export declare const World = "hello";
//# sourceMappingURL=anotherModule.d.ts.map

//// [/user/username/projects/sample1/core/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.someString = void 0;
exports.leftPad = leftPad;
exports.multiply = multiply;
exports.someString = "HELLO WORLD";
function leftPad(s, n) { return s + n; }
function multiply(a, b) { return a * b; }


//// [/user/username/projects/sample1/core/index.d.ts.map]
{"version":3,"file":"index.d.ts","sourceRoot":"","sources":["index.ts"],"names":[],"mappings":"AAAA,eAAO,MAAM,UAAU,EAAE,MAAsB,CAAC;AAChD,wBAAgB,OAAO,CAAC,CAAC,EAAE,MAAM,EAAE,CAAC,EAAE,MAAM,UAAmB;AAC/D,wBAAgB,QAAQ,CAAC,CAAC,EAAE,MAAM,EAAE,CAAC,EAAE,MAAM,UAAmB"}

//// [/user/username/projects/sample1/core/index.d.ts]
export declare const someString: string;
export declare function leftPad(s: string, n: number): string;
export declare function multiply(a: number, b: number): number;
//# sourceMappingURL=index.d.ts.map

//// [/user/username/projects/sample1/core/tsconfig.tsbuildinfo]
{"fileNames":["../../../../../home/src/tslibs/ts/lib/lib.d.ts","./anothermodule.ts","./index.ts","./some_decl.d.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-3090574810-export const World = \"hello\";","signature":"-9234818176-export declare const World = \"hello\";\n"},{"version":"-15745098553-export const someString: string = \"HELLO WORLD\";\nexport function leftPad(s: string, n: number) { return s + n; }\nexport function multiply(a: number, b: number) { return a * b; }\n","signature":"-7362568283-export declare const someString: string;\nexport declare function leftPad(s: string, n: number): string;\nexport declare function multiply(a: number, b: number): number;\n"},{"version":"-7959511260-declare const dts: any;","affectsGlobalScope":true}],"root":[[2,4]],"options":{"composite":true,"declaration":true,"declarationMap":true,"skipDefaultLibCheck":true},"latestChangedDtsFile":"./index.d.ts","version":"FakeTSVersion"}

//// [/user/username/projects/sample1/core/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../../home/src/tslibs/ts/lib/lib.d.ts",
    "./anothermodule.ts",
    "./index.ts",
    "./some_decl.d.ts"
  ],
  "fileInfos": {
    "../../../../../home/src/tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "./anothermodule.ts": {
      "original": {
        "version": "-3090574810-export const World = \"hello\";",
        "signature": "-9234818176-export declare const World = \"hello\";\n"
      },
      "version": "-3090574810-export const World = \"hello\";",
      "signature": "-9234818176-export declare const World = \"hello\";\n"
    },
    "./index.ts": {
      "original": {
        "version": "-15745098553-export const someString: string = \"HELLO WORLD\";\nexport function leftPad(s: string, n: number) { return s + n; }\nexport function multiply(a: number, b: number) { return a * b; }\n",
        "signature": "-7362568283-export declare const someString: string;\nexport declare function leftPad(s: string, n: number): string;\nexport declare function multiply(a: number, b: number): number;\n"
      },
      "version": "-15745098553-export const someString: string = \"HELLO WORLD\";\nexport function leftPad(s: string, n: number) { return s + n; }\nexport function multiply(a: number, b: number) { return a * b; }\n",
      "signature": "-7362568283-export declare const someString: string;\nexport declare function leftPad(s: string, n: number): string;\nexport declare function multiply(a: number, b: number): number;\n"
    },
    "./some_decl.d.ts": {
      "original": {
        "version": "-7959511260-declare const dts: any;",
        "affectsGlobalScope": true
      },
      "version": "-7959511260-declare const dts: any;",
      "signature": "-7959511260-declare const dts: any;",
      "affectsGlobalScope": true
    }
  },
  "root": [
    [
      [
        2,
        4
      ],
      [
        "./anothermodule.ts",
        "./index.ts",
        "./some_decl.d.ts"
      ]
    ]
  ],
  "options": {
    "composite": true,
    "declaration": true,
    "declarationMap": true,
    "skipDefaultLibCheck": true
  },
  "latestChangedDtsFile": "./index.d.ts",
  "version": "FakeTSVersion",
  "size": 1397
}


/home/src/tslibs/TS/Lib/tsc.js -w -p logic --traceResolution --explainFiles
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] Starting compilation in watch mode...

======== Resolving module '../core/index' from '/user/username/projects/sample1/logic/index.ts'. ========
Module resolution kind is not specified, using 'Node10'.
Loading module as file / folder, candidate module location '/user/username/projects/sample1/core/index', target file types: TypeScript, Declaration.
File '/user/username/projects/sample1/core/index.ts' exists - use it as a name resolution result.
======== Module name '../core/index' was successfully resolved to '/user/username/projects/sample1/core/index.ts'. ========
======== Resolving module '../core/anotherModule' from '/user/username/projects/sample1/logic/index.ts'. ========
Module resolution kind is not specified, using 'Node10'.
Loading module as file / folder, candidate module location '/user/username/projects/sample1/core/anotherModule', target file types: TypeScript, Declaration.
File '/user/username/projects/sample1/core/anotherModule.ts' exists - use it as a name resolution result.
======== Module name '../core/anotherModule' was successfully resolved to '/user/username/projects/sample1/core/anotherModule.ts'. ========
../../../../home/src/tslibs/TS/Lib/lib.d.ts
  Default library for target 'es5'
core/index.d.ts
  Imported via '../core/index' from file 'logic/index.ts'
  File is output of project reference source 'core/index.ts'
core/anotherModule.d.ts
  Imported via '../core/anotherModule' from file 'logic/index.ts'
  File is output of project reference source 'core/anotherModule.ts'
logic/index.ts
  Matched by default include pattern '**/*'
[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/user/username/projects/sample1/logic/index.js.map]
{"version":3,"file":"index.js","sourceRoot":"","sources":["index.ts"],"names":[],"mappings":";;;AACA,0CAEC;AAHD,iCAAmC;AACnC,SAAgB,eAAe;IAC3B,OAAO,CAAC,CAAC,QAAQ,CAAC,EAAE,EAAE,EAAE,CAAC,CAAC;AAC9B,CAAC;AACD,2CAA6C;AAChC,QAAA,CAAC,GAAG,GAAG,CAAC"}

//// [/user/username/projects/sample1/logic/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.m = void 0;
exports.getSecondsInDay = getSecondsInDay;
var c = require("../core/index");
function getSecondsInDay() {
    return c.multiply(10, 15);
}
var mod = require("../core/anotherModule");
exports.m = mod;
//# sourceMappingURL=index.js.map

//// [/user/username/projects/sample1/logic/index.d.ts]
export declare function getSecondsInDay(): number;
import * as mod from '../core/anotherModule';
export declare const m: typeof mod;


//// [/user/username/projects/sample1/logic/tsconfig.tsbuildinfo]
{"fileNames":["../../../../../home/src/tslibs/ts/lib/lib.d.ts","../core/index.d.ts","../core/anothermodule.d.ts","./index.ts"],"fileIdsList":[[2,3]],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},"-7362568283-export declare const someString: string;\nexport declare function leftPad(s: string, n: number): string;\nexport declare function multiply(a: number, b: number): number;\n","-9234818176-export declare const World = \"hello\";\n",{"version":"-9623801128-import * as c from '../core/index';\nexport function getSecondsInDay() {\n    return c.multiply(10, 15);\n}\nimport * as mod from '../core/anotherModule';\nexport const m = mod;\n","signature":"-9659407152-export declare function getSecondsInDay(): number;\nimport * as mod from '../core/anotherModule';\nexport declare const m: typeof mod;\n"}],"root":[4],"options":{"composite":true,"declaration":true,"skipDefaultLibCheck":true,"sourceMap":true},"referencedMap":[[4,1]],"latestChangedDtsFile":"./index.d.ts","version":"FakeTSVersion"}

//// [/user/username/projects/sample1/logic/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../../home/src/tslibs/ts/lib/lib.d.ts",
    "../core/index.d.ts",
    "../core/anothermodule.d.ts",
    "./index.ts"
  ],
  "fileIdsList": [
    [
      "../core/index.d.ts",
      "../core/anothermodule.d.ts"
    ]
  ],
  "fileInfos": {
    "../../../../../home/src/tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "../core/index.d.ts": {
      "version": "-7362568283-export declare const someString: string;\nexport declare function leftPad(s: string, n: number): string;\nexport declare function multiply(a: number, b: number): number;\n",
      "signature": "-7362568283-export declare const someString: string;\nexport declare function leftPad(s: string, n: number): string;\nexport declare function multiply(a: number, b: number): number;\n"
    },
    "../core/anothermodule.d.ts": {
      "version": "-9234818176-export declare const World = \"hello\";\n",
      "signature": "-9234818176-export declare const World = \"hello\";\n"
    },
    "./index.ts": {
      "original": {
        "version": "-9623801128-import * as c from '../core/index';\nexport function getSecondsInDay() {\n    return c.multiply(10, 15);\n}\nimport * as mod from '../core/anotherModule';\nexport const m = mod;\n",
        "signature": "-9659407152-export declare function getSecondsInDay(): number;\nimport * as mod from '../core/anotherModule';\nexport declare const m: typeof mod;\n"
      },
      "version": "-9623801128-import * as c from '../core/index';\nexport function getSecondsInDay() {\n    return c.multiply(10, 15);\n}\nimport * as mod from '../core/anotherModule';\nexport const m = mod;\n",
      "signature": "-9659407152-export declare function getSecondsInDay(): number;\nimport * as mod from '../core/anotherModule';\nexport declare const m: typeof mod;\n"
    }
  },
  "root": [
    [
      4,
      "./index.ts"
    ]
  ],
  "options": {
    "composite": true,
    "declaration": true,
    "skipDefaultLibCheck": true,
    "sourceMap": true
  },
  "referencedMap": {
    "./index.ts": [
      "../core/index.d.ts",
      "../core/anothermodule.d.ts"
    ]
  },
  "latestChangedDtsFile": "./index.d.ts",
  "version": "FakeTSVersion",
  "size": 1444
}


PolledWatches::
/user/username/projects/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/sample1/logic/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/sample1/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts: *new*
  {}
/user/username/projects/sample1/core/anotherModule.d.ts: *new*
  {}
/user/username/projects/sample1/core/index.d.ts: *new*
  {}
/user/username/projects/sample1/core/tsconfig.json: *new*
  {}
/user/username/projects/sample1/logic/index.ts: *new*
  {}
/user/username/projects/sample1/logic/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/user/username/projects/sample1/core: *new*
  {}
/user/username/projects/sample1/logic: *new*
  {}

Program root files: [
  "/user/username/projects/sample1/logic/index.ts"
]
Program options: {
  "composite": true,
  "declaration": true,
  "sourceMap": true,
  "forceConsistentCasingInFileNames": true,
  "skipDefaultLibCheck": true,
  "watch": true,
  "project": "/user/username/projects/sample1/logic",
  "traceResolution": true,
  "explainFiles": true,
  "configFilePath": "/user/username/projects/sample1/logic/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/sample1/core/index.d.ts
/user/username/projects/sample1/core/anotherModule.d.ts
/user/username/projects/sample1/logic/index.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/sample1/core/index.d.ts
/user/username/projects/sample1/core/anotherModule.d.ts
/user/username/projects/sample1/logic/index.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/user/username/projects/sample1/core/index.d.ts (used version)
/user/username/projects/sample1/core/anothermodule.d.ts (used version)
/user/username/projects/sample1/logic/index.ts (computed .d.ts during emit)

Dependencies for::
/home/src/tslibs/TS/Lib/lib.d.ts:
  /home/src/tslibs/TS/Lib/lib.d.ts
  /user/username/projects/sample1/core/index.d.ts
  /user/username/projects/sample1/core/anotherModule.d.ts
  /user/username/projects/sample1/logic/index.ts
/user/username/projects/sample1/core/index.d.ts:
  /user/username/projects/sample1/core/index.d.ts
/user/username/projects/sample1/core/anotherModule.d.ts:
  /user/username/projects/sample1/core/anotherModule.d.ts
/user/username/projects/sample1/logic/index.ts:
  /user/username/projects/sample1/logic/index.ts
  /user/username/projects/sample1/core/anotherModule.d.ts
  /user/username/projects/sample1/core/index.d.ts

exitCode:: ExitStatus.undefined

Change:: change declration map in core

Input::
//// [/user/username/projects/sample1/core/tsconfig.json]
{
  "compilerOptions": {
    "composite": true,
    "declaration": true,
    "declarationMap": false,
    "skipDefaultLibCheck": true
  }
}

//// [/user/username/projects/sample1/core/anotherModule.d.ts]
export declare const World = "hello";


//// [/user/username/projects/sample1/core/index.d.ts]
export declare const someString: string;
export declare function leftPad(s: string, n: number): string;
export declare function multiply(a: number, b: number): number;


//// [/user/username/projects/sample1/core/tsconfig.tsbuildinfo]
{"fileNames":["../../../../../home/src/tslibs/ts/lib/lib.d.ts","./anothermodule.ts","./index.ts","./some_decl.d.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-3090574810-export const World = \"hello\";","signature":"-9234818176-export declare const World = \"hello\";\n"},{"version":"-15745098553-export const someString: string = \"HELLO WORLD\";\nexport function leftPad(s: string, n: number) { return s + n; }\nexport function multiply(a: number, b: number) { return a * b; }\n","signature":"-7362568283-export declare const someString: string;\nexport declare function leftPad(s: string, n: number): string;\nexport declare function multiply(a: number, b: number): number;\n"},{"version":"-7959511260-declare const dts: any;","affectsGlobalScope":true}],"root":[[2,4]],"options":{"composite":true,"declaration":true,"declarationMap":false,"skipDefaultLibCheck":true},"latestChangedDtsFile":"./index.d.ts","version":"FakeTSVersion"}

//// [/user/username/projects/sample1/core/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../../home/src/tslibs/ts/lib/lib.d.ts",
    "./anothermodule.ts",
    "./index.ts",
    "./some_decl.d.ts"
  ],
  "fileInfos": {
    "../../../../../home/src/tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "./anothermodule.ts": {
      "original": {
        "version": "-3090574810-export const World = \"hello\";",
        "signature": "-9234818176-export declare const World = \"hello\";\n"
      },
      "version": "-3090574810-export const World = \"hello\";",
      "signature": "-9234818176-export declare const World = \"hello\";\n"
    },
    "./index.ts": {
      "original": {
        "version": "-15745098553-export const someString: string = \"HELLO WORLD\";\nexport function leftPad(s: string, n: number) { return s + n; }\nexport function multiply(a: number, b: number) { return a * b; }\n",
        "signature": "-7362568283-export declare const someString: string;\nexport declare function leftPad(s: string, n: number): string;\nexport declare function multiply(a: number, b: number): number;\n"
      },
      "version": "-15745098553-export const someString: string = \"HELLO WORLD\";\nexport function leftPad(s: string, n: number) { return s + n; }\nexport function multiply(a: number, b: number) { return a * b; }\n",
      "signature": "-7362568283-export declare const someString: string;\nexport declare function leftPad(s: string, n: number): string;\nexport declare function multiply(a: number, b: number): number;\n"
    },
    "./some_decl.d.ts": {
      "original": {
        "version": "-7959511260-declare const dts: any;",
        "affectsGlobalScope": true
      },
      "version": "-7959511260-declare const dts: any;",
      "signature": "-7959511260-declare const dts: any;",
      "affectsGlobalScope": true
    }
  },
  "root": [
    [
      [
        2,
        4
      ],
      [
        "./anothermodule.ts",
        "./index.ts",
        "./some_decl.d.ts"
      ]
    ]
  ],
  "options": {
    "composite": true,
    "declaration": true,
    "declarationMap": false,
    "skipDefaultLibCheck": true
  },
  "latestChangedDtsFile": "./index.d.ts",
  "version": "FakeTSVersion",
  "size": 1398
}


Timeout callback:: count: 1
5: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
5: timerToUpdateProgram

After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

Reusing resolution of module '../core/index' from '/user/username/projects/sample1/logic/index.ts' of old program, it was successfully resolved to '/user/username/projects/sample1/core/index.ts'.
Reusing resolution of module '../core/anotherModule' from '/user/username/projects/sample1/logic/index.ts' of old program, it was successfully resolved to '/user/username/projects/sample1/core/anotherModule.ts'.
../../../../home/src/tslibs/TS/Lib/lib.d.ts
  Default library for target 'es5'
core/index.d.ts
  Imported via '../core/index' from file 'logic/index.ts'
  File is output of project reference source 'core/index.ts'
core/anotherModule.d.ts
  Imported via '../core/anotherModule' from file 'logic/index.ts'
  File is output of project reference source 'core/anotherModule.ts'
logic/index.ts
  Matched by default include pattern '**/*'
[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.





Program root files: [
  "/user/username/projects/sample1/logic/index.ts"
]
Program options: {
  "composite": true,
  "declaration": true,
  "sourceMap": true,
  "forceConsistentCasingInFileNames": true,
  "skipDefaultLibCheck": true,
  "watch": true,
  "project": "/user/username/projects/sample1/logic",
  "traceResolution": true,
  "explainFiles": true,
  "configFilePath": "/user/username/projects/sample1/logic/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/sample1/core/index.d.ts
/user/username/projects/sample1/core/anotherModule.d.ts
/user/username/projects/sample1/logic/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

Dependencies for::
/home/src/tslibs/TS/Lib/lib.d.ts:
  /home/src/tslibs/TS/Lib/lib.d.ts
  /user/username/projects/sample1/core/index.d.ts
  /user/username/projects/sample1/core/anotherModule.d.ts
  /user/username/projects/sample1/logic/index.ts
/user/username/projects/sample1/core/index.d.ts:
  /user/username/projects/sample1/core/index.d.ts
/user/username/projects/sample1/core/anotherModule.d.ts:
  /user/username/projects/sample1/core/anotherModule.d.ts
/user/username/projects/sample1/logic/index.ts:
  /user/username/projects/sample1/logic/index.ts
  /user/username/projects/sample1/core/anotherModule.d.ts
  /user/username/projects/sample1/core/index.d.ts

exitCode:: ExitStatus.undefined
