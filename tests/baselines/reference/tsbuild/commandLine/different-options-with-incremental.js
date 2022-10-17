Input::
//// [/lib/lib.d.ts]
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

//// [/src/project/a.ts]
export const a = 10;const aLocal = 10;

//// [/src/project/b.ts]
export const b = 10;const bLocal = 10;

//// [/src/project/c.ts]
import { a } from "./a";export const c = a;

//// [/src/project/d.ts]
import { b } from "./b";export const d = b;

//// [/src/project/tsconfig.json]
{"compilerOptions":{"incremental":true}}



Output::
/lib/tsc --b /src/project --verbose
[[90m12:00:12 AM[0m] Projects in this build: 
    * src/project/tsconfig.json

[[90m12:00:13 AM[0m] Project 'src/project/tsconfig.json' is out of date because output file 'src/project/tsconfig.tsbuildinfo' does not exist

[[90m12:00:14 AM[0m] Building project '/src/project/tsconfig.json'...

exitCode:: ExitStatus.Success
Program root files: ["/src/project/a.ts","/src/project/b.ts","/src/project/c.ts","/src/project/d.ts"]
Program options: {"incremental":true,"configFilePath":"/src/project/tsconfig.json"}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/project/a.ts
/src/project/b.ts
/src/project/c.ts
/src/project/d.ts

Semantic diagnostics in builder refreshed for::
/lib/lib.d.ts
/src/project/a.ts
/src/project/b.ts
/src/project/c.ts
/src/project/d.ts

Shape signatures in builder refreshed for::
/lib/lib.d.ts (used version)
/src/project/a.ts (used version)
/src/project/b.ts (used version)
/src/project/c.ts (used version)
/src/project/d.ts (used version)


//// [/src/project/a.js]
"use strict";
exports.__esModule = true;
exports.a = void 0;
exports.a = 10;
var aLocal = 10;


//// [/src/project/b.js]
"use strict";
exports.__esModule = true;
exports.b = void 0;
exports.b = 10;
var bLocal = 10;


//// [/src/project/c.js]
"use strict";
exports.__esModule = true;
exports.c = void 0;
var a_1 = require("./a");
exports.c = a_1.a;


//// [/src/project/d.js]
"use strict";
exports.__esModule = true;
exports.d = void 0;
var b_1 = require("./b");
exports.d = b_1.b;


//// [/src/project/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../lib/lib.d.ts","./a.ts","./b.ts","./c.ts","./d.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},"-18487752940-export const a = 10;const aLocal = 10;","-6189287562-export const b = 10;const bLocal = 10;","3248317647-import { a } from \"./a\";export const c = a;","-19615769517-import { b } from \"./b\";export const d = b;"],"fileIdsList":[[2],[3]],"referencedMap":[[4,1],[5,2]],"exportedModulesMap":[[4,1],[5,2]],"semanticDiagnosticsPerFile":[1,2,3,4,5]},"version":"FakeTSVersion"}

//// [/src/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "./a.ts",
      "./b.ts",
      "./c.ts",
      "./d.ts"
    ],
    "fileNamesList": [
      [
        "./a.ts"
      ],
      [
        "./b.ts"
      ]
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "original": {
          "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
          "affectsGlobalScope": true
        },
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./a.ts": {
        "version": "-18487752940-export const a = 10;const aLocal = 10;",
        "signature": "-18487752940-export const a = 10;const aLocal = 10;"
      },
      "./b.ts": {
        "version": "-6189287562-export const b = 10;const bLocal = 10;",
        "signature": "-6189287562-export const b = 10;const bLocal = 10;"
      },
      "./c.ts": {
        "version": "3248317647-import { a } from \"./a\";export const c = a;",
        "signature": "3248317647-import { a } from \"./a\";export const c = a;"
      },
      "./d.ts": {
        "version": "-19615769517-import { b } from \"./b\";export const d = b;",
        "signature": "-19615769517-import { b } from \"./b\";export const d = b;"
      }
    },
    "referencedMap": {
      "./c.ts": [
        "./a.ts"
      ],
      "./d.ts": [
        "./b.ts"
      ]
    },
    "exportedModulesMap": {
      "./c.ts": [
        "./a.ts"
      ],
      "./d.ts": [
        "./b.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      "./a.ts",
      "./b.ts",
      "./c.ts",
      "./d.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 960
}



Change:: with sourceMap
Input::


Output::
/lib/tsc --b /src/project --verbose --sourceMap
[[90m12:00:22 AM[0m] Projects in this build: 
    * src/project/tsconfig.json

[[90m12:00:23 AM[0m] Project 'src/project/tsconfig.json' is up to date because newest input 'src/project/d.ts' is older than output 'src/project/tsconfig.tsbuildinfo'

exitCode:: ExitStatus.Success




Change:: should re-emit only js so they dont contain sourcemap
Input::


Output::
/lib/tsc --b /src/project --verbose
[[90m12:00:24 AM[0m] Projects in this build: 
    * src/project/tsconfig.json

[[90m12:00:25 AM[0m] Project 'src/project/tsconfig.json' is up to date because newest input 'src/project/d.ts' is older than output 'src/project/tsconfig.tsbuildinfo'

exitCode:: ExitStatus.Success




Change:: with declaration, emit Dts and should not emit js
Input::


Output::
/lib/tsc --b /src/project --verbose --declaration
[[90m12:00:26 AM[0m] Projects in this build: 
    * src/project/tsconfig.json

[[90m12:00:27 AM[0m] Project 'src/project/tsconfig.json' is up to date because newest input 'src/project/d.ts' is older than output 'src/project/tsconfig.tsbuildinfo'

exitCode:: ExitStatus.Success




Change:: with declaration and declarationMap
Input::


Output::
/lib/tsc --b /src/project --verbose --declaration --declarationMap
[[90m12:00:28 AM[0m] Projects in this build: 
    * src/project/tsconfig.json

[[90m12:00:29 AM[0m] Project 'src/project/tsconfig.json' is up to date because newest input 'src/project/d.ts' is older than output 'src/project/tsconfig.tsbuildinfo'

exitCode:: ExitStatus.Success




Change:: no-change-run
Input::


Output::
/lib/tsc --b /src/project --verbose
[[90m12:00:30 AM[0m] Projects in this build: 
    * src/project/tsconfig.json

[[90m12:00:31 AM[0m] Project 'src/project/tsconfig.json' is up to date because newest input 'src/project/d.ts' is older than output 'src/project/tsconfig.tsbuildinfo'

exitCode:: ExitStatus.Success




Change:: local change
Input::
//// [/src/project/a.ts]
export const a = 10;const aLocal = 100;



Output::
/lib/tsc --b /src/project --verbose
[[90m12:00:33 AM[0m] Projects in this build: 
    * src/project/tsconfig.json

[[90m12:00:34 AM[0m] Project 'src/project/tsconfig.json' is out of date because output 'src/project/tsconfig.tsbuildinfo' is older than input 'src/project/a.ts'

[[90m12:00:35 AM[0m] Building project '/src/project/tsconfig.json'...

exitCode:: ExitStatus.Success
Program root files: ["/src/project/a.ts","/src/project/b.ts","/src/project/c.ts","/src/project/d.ts"]
Program options: {"incremental":true,"configFilePath":"/src/project/tsconfig.json"}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/project/a.ts
/src/project/b.ts
/src/project/c.ts
/src/project/d.ts

Semantic diagnostics in builder refreshed for::
/src/project/a.ts
/src/project/c.ts

Shape signatures in builder refreshed for::
/src/project/a.ts (computed .d.ts)
/src/project/c.ts (computed .d.ts)


//// [/src/project/a.js]
"use strict";
exports.__esModule = true;
exports.a = void 0;
exports.a = 10;
var aLocal = 100;


//// [/src/project/c.js] file written with same contents
//// [/src/project/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../lib/lib.d.ts","./a.ts","./b.ts","./c.ts","./d.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-17390360476-export const a = 10;const aLocal = 100;","signature":"-3762229137-export declare const a = 10;\r\n"},"-6189287562-export const b = 10;const bLocal = 10;",{"version":"3248317647-import { a } from \"./a\";export const c = a;","signature":"-4148571535-export declare const c = 10;\r\n"},"-19615769517-import { b } from \"./b\";export const d = b;"],"fileIdsList":[[2],[3]],"referencedMap":[[4,1],[5,2]],"exportedModulesMap":[[5,2]],"semanticDiagnosticsPerFile":[1,2,3,4,5]},"version":"FakeTSVersion"}

//// [/src/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "./a.ts",
      "./b.ts",
      "./c.ts",
      "./d.ts"
    ],
    "fileNamesList": [
      [
        "./a.ts"
      ],
      [
        "./b.ts"
      ]
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "original": {
          "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
          "affectsGlobalScope": true
        },
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./a.ts": {
        "original": {
          "version": "-17390360476-export const a = 10;const aLocal = 100;",
          "signature": "-3762229137-export declare const a = 10;\r\n"
        },
        "version": "-17390360476-export const a = 10;const aLocal = 100;",
        "signature": "-3762229137-export declare const a = 10;\r\n"
      },
      "./b.ts": {
        "version": "-6189287562-export const b = 10;const bLocal = 10;",
        "signature": "-6189287562-export const b = 10;const bLocal = 10;"
      },
      "./c.ts": {
        "original": {
          "version": "3248317647-import { a } from \"./a\";export const c = a;",
          "signature": "-4148571535-export declare const c = 10;\r\n"
        },
        "version": "3248317647-import { a } from \"./a\";export const c = a;",
        "signature": "-4148571535-export declare const c = 10;\r\n"
      },
      "./d.ts": {
        "version": "-19615769517-import { b } from \"./b\";export const d = b;",
        "signature": "-19615769517-import { b } from \"./b\";export const d = b;"
      }
    },
    "referencedMap": {
      "./c.ts": [
        "./a.ts"
      ],
      "./d.ts": [
        "./b.ts"
      ]
    },
    "exportedModulesMap": {
      "./d.ts": [
        "./b.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      "./a.ts",
      "./b.ts",
      "./c.ts",
      "./d.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 1097
}



Change:: with declaration and declarationMap
Input::


Output::
/lib/tsc --b /src/project --verbose --declaration --declarationMap
[[90m12:00:41 AM[0m] Projects in this build: 
    * src/project/tsconfig.json

[[90m12:00:42 AM[0m] Project 'src/project/tsconfig.json' is up to date because newest input 'src/project/a.ts' is older than output 'src/project/tsconfig.tsbuildinfo'

exitCode:: ExitStatus.Success




Change:: no-change-run
Input::


Output::
/lib/tsc --b /src/project --verbose
[[90m12:00:43 AM[0m] Projects in this build: 
    * src/project/tsconfig.json

[[90m12:00:44 AM[0m] Project 'src/project/tsconfig.json' is up to date because newest input 'src/project/a.ts' is older than output 'src/project/tsconfig.tsbuildinfo'

exitCode:: ExitStatus.Success




Change:: with inlineSourceMap
Input::


Output::
/lib/tsc --b /src/project --verbose --inlineSourceMap
[[90m12:00:45 AM[0m] Projects in this build: 
    * src/project/tsconfig.json

[[90m12:00:46 AM[0m] Project 'src/project/tsconfig.json' is up to date because newest input 'src/project/a.ts' is older than output 'src/project/tsconfig.tsbuildinfo'

exitCode:: ExitStatus.Success




Change:: with sourceMap
Input::


Output::
/lib/tsc --b /src/project --verbose --sourceMap
[[90m12:00:47 AM[0m] Projects in this build: 
    * src/project/tsconfig.json

[[90m12:00:48 AM[0m] Project 'src/project/tsconfig.json' is up to date because newest input 'src/project/a.ts' is older than output 'src/project/tsconfig.tsbuildinfo'

exitCode:: ExitStatus.Success




Change:: emit js files
Input::


Output::
/lib/tsc --b /src/project --verbose
[[90m12:00:49 AM[0m] Projects in this build: 
    * src/project/tsconfig.json

[[90m12:00:50 AM[0m] Project 'src/project/tsconfig.json' is up to date because newest input 'src/project/a.ts' is older than output 'src/project/tsconfig.tsbuildinfo'

exitCode:: ExitStatus.Success




Change:: with declaration and declarationMap
Input::


Output::
/lib/tsc --b /src/project --verbose --declaration --declarationMap
[[90m12:00:51 AM[0m] Projects in this build: 
    * src/project/tsconfig.json

[[90m12:00:52 AM[0m] Project 'src/project/tsconfig.json' is up to date because newest input 'src/project/a.ts' is older than output 'src/project/tsconfig.tsbuildinfo'

exitCode:: ExitStatus.Success




Change:: with declaration and declarationMap, should not re-emit
Input::


Output::
/lib/tsc --b /src/project --verbose --declaration --declarationMap
[[90m12:00:53 AM[0m] Projects in this build: 
    * src/project/tsconfig.json

[[90m12:00:54 AM[0m] Project 'src/project/tsconfig.json' is up to date because newest input 'src/project/a.ts' is older than output 'src/project/tsconfig.tsbuildinfo'

exitCode:: ExitStatus.Success


