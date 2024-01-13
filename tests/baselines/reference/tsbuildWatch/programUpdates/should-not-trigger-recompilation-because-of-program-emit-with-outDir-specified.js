currentDirectory:: /user/username/projects useCaseSensitiveFileNames: false
Input::
//// [/a/lib/lib.d.ts]
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

//// [/user/username/projects/sample1/core/tsconfig.json]
{
  "compilerOptions": {
    "composite": true,
    "outDir": "outDir"
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



/a/lib/tsc.js -b -w sample1/core -verbose
Output::
>> Screen clear
[[90m12:00:39 AM[0m] Starting compilation in watch mode...

[[90m12:00:40 AM[0m] Projects in this build: 
    * sample1/core/tsconfig.json

[[90m12:00:41 AM[0m] Project 'sample1/core/tsconfig.json' is out of date because output file 'sample1/core/outDir/tsconfig.tsbuildinfo' does not exist

[[90m12:00:42 AM[0m] Building project '/user/username/projects/sample1/core/tsconfig.json'...

[[90m12:00:59 AM[0m] Found 0 errors. Watching for file changes.



//// [/user/username/projects/sample1/core/outDir/anotherModule.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.World = void 0;
exports.World = "hello";


//// [/user/username/projects/sample1/core/outDir/anotherModule.d.ts]
export declare const World = "hello";


//// [/user/username/projects/sample1/core/outDir/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.multiply = exports.leftPad = exports.someString = void 0;
exports.someString = "HELLO WORLD";
function leftPad(s, n) { return s + n; }
exports.leftPad = leftPad;
function multiply(a, b) { return a * b; }
exports.multiply = multiply;


//// [/user/username/projects/sample1/core/outDir/index.d.ts]
export declare const someString: string;
export declare function leftPad(s: string, n: number): string;
export declare function multiply(a: number, b: number): number;


//// [/user/username/projects/sample1/core/outDir/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../../../a/lib/lib.d.ts","../anothermodule.ts","../index.ts","../some_decl.d.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},{"version":"-3090574810-export const World = \"hello\";","signature":"-9234818176-export declare const World = \"hello\";\n"},{"version":"-15745098553-export const someString: string = \"HELLO WORLD\";\nexport function leftPad(s: string, n: number) { return s + n; }\nexport function multiply(a: number, b: number) { return a * b; }\n","signature":"-7362568283-export declare const someString: string;\nexport declare function leftPad(s: string, n: number): string;\nexport declare function multiply(a: number, b: number): number;\n"},{"version":"-7959511260-declare const dts: any;","affectsGlobalScope":true}],"root":[[2,4]],"options":{"composite":true,"outDir":"./"},"referencedMap":[],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,2,3,4],"latestChangedDtsFile":"./index.d.ts"},"version":"FakeTSVersion"}

//// [/user/username/projects/sample1/core/outDir/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../../../a/lib/lib.d.ts",
      "../anothermodule.ts",
      "../index.ts",
      "../some_decl.d.ts"
    ],
    "fileInfos": {
      "../../../../../../a/lib/lib.d.ts": {
        "original": {
          "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
          "affectsGlobalScope": true
        },
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true
      },
      "../anothermodule.ts": {
        "original": {
          "version": "-3090574810-export const World = \"hello\";",
          "signature": "-9234818176-export declare const World = \"hello\";\n"
        },
        "version": "-3090574810-export const World = \"hello\";",
        "signature": "-9234818176-export declare const World = \"hello\";\n"
      },
      "../index.ts": {
        "original": {
          "version": "-15745098553-export const someString: string = \"HELLO WORLD\";\nexport function leftPad(s: string, n: number) { return s + n; }\nexport function multiply(a: number, b: number) { return a * b; }\n",
          "signature": "-7362568283-export declare const someString: string;\nexport declare function leftPad(s: string, n: number): string;\nexport declare function multiply(a: number, b: number): number;\n"
        },
        "version": "-15745098553-export const someString: string = \"HELLO WORLD\";\nexport function leftPad(s: string, n: number) { return s + n; }\nexport function multiply(a: number, b: number) { return a * b; }\n",
        "signature": "-7362568283-export declare const someString: string;\nexport declare function leftPad(s: string, n: number): string;\nexport declare function multiply(a: number, b: number): number;\n"
      },
      "../some_decl.d.ts": {
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
          "../anothermodule.ts",
          "../index.ts",
          "../some_decl.d.ts"
        ]
      ]
    ],
    "options": {
      "composite": true,
      "outDir": "./"
    },
    "referencedMap": {},
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../../../../a/lib/lib.d.ts",
      "../anothermodule.ts",
      "../index.ts",
      "../some_decl.d.ts"
    ],
    "latestChangedDtsFile": "./index.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 1346
}


FsWatches::
/user/username/projects/sample1/core/anotherModule.ts: *new*
  {}
/user/username/projects/sample1/core/index.ts: *new*
  {}
/user/username/projects/sample1/core/some_decl.d.ts: *new*
  {}
/user/username/projects/sample1/core/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/user/username/projects/sample1/core: *new*
  {}

Program root files: [
  "/user/username/projects/sample1/core/anotherModule.ts",
  "/user/username/projects/sample1/core/index.ts",
  "/user/username/projects/sample1/core/some_decl.d.ts"
]
Program options: {
  "composite": true,
  "outDir": "/user/username/projects/sample1/core/outDir",
  "watch": true,
  "configFilePath": "/user/username/projects/sample1/core/tsconfig.json"
}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/sample1/core/anotherModule.ts
/user/username/projects/sample1/core/index.ts
/user/username/projects/sample1/core/some_decl.d.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/user/username/projects/sample1/core/anotherModule.ts
/user/username/projects/sample1/core/index.ts
/user/username/projects/sample1/core/some_decl.d.ts

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/user/username/projects/sample1/core/anothermodule.ts (computed .d.ts during emit)
/user/username/projects/sample1/core/index.ts (computed .d.ts during emit)
/user/username/projects/sample1/core/some_decl.d.ts (used version)

exitCode:: ExitStatus.undefined

Change:: No change

Input::


exitCode:: ExitStatus.undefined

Change:: Add new file

Input::
//// [/user/username/projects/sample1/core/file3.ts]
export const y = 10;


Timeout callback:: count: 1
1: timerToBuildInvalidatedProject *new*

Before running Timeout callback:: count: 1
1: timerToBuildInvalidatedProject

After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90m12:01:02 AM[0m] File change detected. Starting incremental compilation...

[[90m12:01:03 AM[0m] Project 'sample1/core/tsconfig.json' is out of date because output 'sample1/core/outDir/tsconfig.tsbuildinfo' is older than input 'sample1/core/file3.ts'

[[90m12:01:04 AM[0m] Building project '/user/username/projects/sample1/core/tsconfig.json'...

[[90m12:01:16 AM[0m] Found 0 errors. Watching for file changes.



//// [/user/username/projects/sample1/core/outDir/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../../../a/lib/lib.d.ts","../anothermodule.ts","../file3.ts","../index.ts","../some_decl.d.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},{"version":"-3090574810-export const World = \"hello\";","signature":"-9234818176-export declare const World = \"hello\";\n"},{"version":"-13729955264-export const y = 10;","signature":"-7152472870-export declare const y = 10;\n"},{"version":"-15745098553-export const someString: string = \"HELLO WORLD\";\nexport function leftPad(s: string, n: number) { return s + n; }\nexport function multiply(a: number, b: number) { return a * b; }\n","signature":"-7362568283-export declare const someString: string;\nexport declare function leftPad(s: string, n: number): string;\nexport declare function multiply(a: number, b: number): number;\n"},{"version":"-7959511260-declare const dts: any;","affectsGlobalScope":true}],"root":[[2,5]],"options":{"composite":true,"outDir":"./"},"referencedMap":[],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,2,3,4,5],"latestChangedDtsFile":"./file3.d.ts"},"version":"FakeTSVersion"}

//// [/user/username/projects/sample1/core/outDir/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../../../a/lib/lib.d.ts",
      "../anothermodule.ts",
      "../file3.ts",
      "../index.ts",
      "../some_decl.d.ts"
    ],
    "fileInfos": {
      "../../../../../../a/lib/lib.d.ts": {
        "original": {
          "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
          "affectsGlobalScope": true
        },
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true
      },
      "../anothermodule.ts": {
        "original": {
          "version": "-3090574810-export const World = \"hello\";",
          "signature": "-9234818176-export declare const World = \"hello\";\n"
        },
        "version": "-3090574810-export const World = \"hello\";",
        "signature": "-9234818176-export declare const World = \"hello\";\n"
      },
      "../file3.ts": {
        "original": {
          "version": "-13729955264-export const y = 10;",
          "signature": "-7152472870-export declare const y = 10;\n"
        },
        "version": "-13729955264-export const y = 10;",
        "signature": "-7152472870-export declare const y = 10;\n"
      },
      "../index.ts": {
        "original": {
          "version": "-15745098553-export const someString: string = \"HELLO WORLD\";\nexport function leftPad(s: string, n: number) { return s + n; }\nexport function multiply(a: number, b: number) { return a * b; }\n",
          "signature": "-7362568283-export declare const someString: string;\nexport declare function leftPad(s: string, n: number): string;\nexport declare function multiply(a: number, b: number): number;\n"
        },
        "version": "-15745098553-export const someString: string = \"HELLO WORLD\";\nexport function leftPad(s: string, n: number) { return s + n; }\nexport function multiply(a: number, b: number) { return a * b; }\n",
        "signature": "-7362568283-export declare const someString: string;\nexport declare function leftPad(s: string, n: number): string;\nexport declare function multiply(a: number, b: number): number;\n"
      },
      "../some_decl.d.ts": {
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
          5
        ],
        [
          "../anothermodule.ts",
          "../file3.ts",
          "../index.ts",
          "../some_decl.d.ts"
        ]
      ]
    ],
    "options": {
      "composite": true,
      "outDir": "./"
    },
    "referencedMap": {},
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../../../../a/lib/lib.d.ts",
      "../anothermodule.ts",
      "../file3.ts",
      "../index.ts",
      "../some_decl.d.ts"
    ],
    "latestChangedDtsFile": "./file3.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 1467
}

//// [/user/username/projects/sample1/core/outDir/file3.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.y = void 0;
exports.y = 10;


//// [/user/username/projects/sample1/core/outDir/file3.d.ts]
export declare const y = 10;



FsWatches::
/user/username/projects/sample1/core/anotherModule.ts:
  {}
/user/username/projects/sample1/core/file3.ts: *new*
  {}
/user/username/projects/sample1/core/index.ts:
  {}
/user/username/projects/sample1/core/some_decl.d.ts:
  {}
/user/username/projects/sample1/core/tsconfig.json:
  {}

FsWatchesRecursive::
/user/username/projects/sample1/core:
  {}


Program root files: [
  "/user/username/projects/sample1/core/anotherModule.ts",
  "/user/username/projects/sample1/core/file3.ts",
  "/user/username/projects/sample1/core/index.ts",
  "/user/username/projects/sample1/core/some_decl.d.ts"
]
Program options: {
  "composite": true,
  "outDir": "/user/username/projects/sample1/core/outDir",
  "watch": true,
  "configFilePath": "/user/username/projects/sample1/core/tsconfig.json"
}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/sample1/core/anotherModule.ts
/user/username/projects/sample1/core/file3.ts
/user/username/projects/sample1/core/index.ts
/user/username/projects/sample1/core/some_decl.d.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/sample1/core/file3.ts

Shape signatures in builder refreshed for::
/user/username/projects/sample1/core/file3.ts (computed .d.ts)

exitCode:: ExitStatus.undefined

Change:: No change

Input::


exitCode:: ExitStatus.undefined
