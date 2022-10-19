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
{"compilerOptions":{"composite":true}}



Output::
/lib/tsc --b /src/project --verbose
[[90m12:00:12 AM[0m] Projects in this build: 
    * src/project/tsconfig.json

[[90m12:00:13 AM[0m] Project 'src/project/tsconfig.json' is out of date because output file 'src/project/tsconfig.tsbuildinfo' does not exist

[[90m12:00:14 AM[0m] Building project '/src/project/tsconfig.json'...

exitCode:: ExitStatus.Success
Program root files: ["/src/project/a.ts","/src/project/b.ts","/src/project/c.ts","/src/project/d.ts"]
Program options: {"composite":true,"configFilePath":"/src/project/tsconfig.json"}
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
/src/project/a.ts (computed .d.ts during emit)
/src/project/b.ts (computed .d.ts during emit)
/src/project/c.ts (computed .d.ts during emit)
/src/project/d.ts (computed .d.ts during emit)


//// [/src/project/a.d.ts]
export declare const a = 10;


//// [/src/project/a.js]
"use strict";
exports.__esModule = true;
exports.a = void 0;
exports.a = 10;
var aLocal = 10;


//// [/src/project/b.d.ts]
export declare const b = 10;


//// [/src/project/b.js]
"use strict";
exports.__esModule = true;
exports.b = void 0;
exports.b = 10;
var bLocal = 10;


//// [/src/project/c.d.ts]
export declare const c = 10;


//// [/src/project/c.js]
"use strict";
exports.__esModule = true;
exports.c = void 0;
var a_1 = require("./a");
exports.c = a_1.a;


//// [/src/project/d.d.ts]
export declare const d = 10;


//// [/src/project/d.js]
"use strict";
exports.__esModule = true;
exports.d = void 0;
var b_1 = require("./b");
exports.d = b_1.b;


//// [/src/project/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../lib/lib.d.ts","./a.ts","./b.ts","./c.ts","./d.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-18487752940-export const a = 10;const aLocal = 10;","signature":"-3762229137-export declare const a = 10;\r\n"},{"version":"-6189287562-export const b = 10;const bLocal = 10;","signature":"-1807916688-export declare const b = 10;\r\n"},{"version":"3248317647-import { a } from \"./a\";export const c = a;","signature":"-4148571535-export declare const c = 10;\r\n"},{"version":"-19615769517-import { b } from \"./b\";export const d = b;","signature":"-6489226382-export declare const d = 10;\r\n"}],"options":{"composite":true},"fileIdsList":[[2],[3]],"referencedMap":[[4,1],[5,2]],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,2,3,4,5],"latestChangedDtsFile":"./d.d.ts"},"version":"FakeTSVersion"}

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
          "version": "-18487752940-export const a = 10;const aLocal = 10;",
          "signature": "-3762229137-export declare const a = 10;\r\n"
        },
        "version": "-18487752940-export const a = 10;const aLocal = 10;",
        "signature": "-3762229137-export declare const a = 10;\r\n"
      },
      "./b.ts": {
        "original": {
          "version": "-6189287562-export const b = 10;const bLocal = 10;",
          "signature": "-1807916688-export declare const b = 10;\r\n"
        },
        "version": "-6189287562-export const b = 10;const bLocal = 10;",
        "signature": "-1807916688-export declare const b = 10;\r\n"
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
        "original": {
          "version": "-19615769517-import { b } from \"./b\";export const d = b;",
          "signature": "-6489226382-export declare const d = 10;\r\n"
        },
        "version": "-19615769517-import { b } from \"./b\";export const d = b;",
        "signature": "-6489226382-export declare const d = 10;\r\n"
      }
    },
    "options": {
      "composite": true
    },
    "referencedMap": {
      "./c.ts": [
        "./a.ts"
      ],
      "./d.ts": [
        "./b.ts"
      ]
    },
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      "./a.ts",
      "./b.ts",
      "./c.ts",
      "./d.ts"
    ],
    "latestChangedDtsFile": "./d.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 1296
}



Change:: with sourceMap
Input::


Output::
/lib/tsc --b /src/project --verbose --sourceMap
[91merror[0m[90m TS5094: [0mCompiler option '--sourceMap' may not be used with '--build'.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped




Change:: should re-emit only js so they dont contain sourcemap
Input::


Output::
/lib/tsc --b /src/project --verbose
[[90m12:00:26 AM[0m] Projects in this build: 
    * src/project/tsconfig.json

[[90m12:00:27 AM[0m] Project 'src/project/tsconfig.json' is up to date because newest input 'src/project/d.ts' is older than output 'src/project/tsconfig.tsbuildinfo'

exitCode:: ExitStatus.Success




Change:: with declaration should not emit anything
Input::


Output::
/lib/tsc --b /src/project --verbose --declaration
[91merror[0m[90m TS5094: [0mCompiler option '--declaration' may not be used with '--build'.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped




Change:: no-change-run
Input::


Output::
/lib/tsc --b /src/project --verbose
[[90m12:00:28 AM[0m] Projects in this build: 
    * src/project/tsconfig.json

[[90m12:00:29 AM[0m] Project 'src/project/tsconfig.json' is up to date because newest input 'src/project/d.ts' is older than output 'src/project/tsconfig.tsbuildinfo'

exitCode:: ExitStatus.Success




Change:: with declaration and declarationMap
Input::


Output::
/lib/tsc --b /src/project --verbose --declaration --declarationMap
[91merror[0m[90m TS5094: [0mCompiler option '--declaration' may not be used with '--build'.

[91merror[0m[90m TS5094: [0mCompiler option '--declarationMap' may not be used with '--build'.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped




Change:: should re-emit only dts so they dont contain sourcemap
Input::


Output::
/lib/tsc --b /src/project --verbose
[[90m12:00:30 AM[0m] Projects in this build: 
    * src/project/tsconfig.json

[[90m12:00:31 AM[0m] Project 'src/project/tsconfig.json' is up to date because newest input 'src/project/d.ts' is older than output 'src/project/tsconfig.tsbuildinfo'

exitCode:: ExitStatus.Success




Change:: with emitDeclarationOnly should not emit anything
Input::


Output::
/lib/tsc --b /src/project --verbose --emitDeclarationOnly
[91merror[0m[90m TS5094: [0mCompiler option '--emitDeclarationOnly' may not be used with '--build'.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped




Change:: no-change-run
Input::


Output::
/lib/tsc --b /src/project --verbose
[[90m12:00:32 AM[0m] Projects in this build: 
    * src/project/tsconfig.json

[[90m12:00:33 AM[0m] Project 'src/project/tsconfig.json' is up to date because newest input 'src/project/d.ts' is older than output 'src/project/tsconfig.tsbuildinfo'

exitCode:: ExitStatus.Success




Change:: local change
Input::
//// [/src/project/a.ts]
export const a = 10;const aLocal = 100;



Output::
/lib/tsc --b /src/project --verbose
[[90m12:00:35 AM[0m] Projects in this build: 
    * src/project/tsconfig.json

[[90m12:00:36 AM[0m] Project 'src/project/tsconfig.json' is out of date because output 'src/project/tsconfig.tsbuildinfo' is older than input 'src/project/a.ts'

[[90m12:00:37 AM[0m] Building project '/src/project/tsconfig.json'...

exitCode:: ExitStatus.Success
Program root files: ["/src/project/a.ts","/src/project/b.ts","/src/project/c.ts","/src/project/d.ts"]
Program options: {"composite":true,"configFilePath":"/src/project/tsconfig.json"}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/project/a.ts
/src/project/b.ts
/src/project/c.ts
/src/project/d.ts

Semantic diagnostics in builder refreshed for::
/src/project/a.ts

Shape signatures in builder refreshed for::
/src/project/a.ts (computed .d.ts)


//// [/src/project/a.js]
"use strict";
exports.__esModule = true;
exports.a = void 0;
exports.a = 10;
var aLocal = 100;


//// [/src/project/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../lib/lib.d.ts","./a.ts","./b.ts","./c.ts","./d.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-17390360476-export const a = 10;const aLocal = 100;","signature":"-3762229137-export declare const a = 10;\r\n"},{"version":"-6189287562-export const b = 10;const bLocal = 10;","signature":"-1807916688-export declare const b = 10;\r\n"},{"version":"3248317647-import { a } from \"./a\";export const c = a;","signature":"-4148571535-export declare const c = 10;\r\n"},{"version":"-19615769517-import { b } from \"./b\";export const d = b;","signature":"-6489226382-export declare const d = 10;\r\n"}],"options":{"composite":true},"fileIdsList":[[2],[3]],"referencedMap":[[4,1],[5,2]],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,2,3,4,5],"latestChangedDtsFile":"./d.d.ts"},"version":"FakeTSVersion"}

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
        "original": {
          "version": "-6189287562-export const b = 10;const bLocal = 10;",
          "signature": "-1807916688-export declare const b = 10;\r\n"
        },
        "version": "-6189287562-export const b = 10;const bLocal = 10;",
        "signature": "-1807916688-export declare const b = 10;\r\n"
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
        "original": {
          "version": "-19615769517-import { b } from \"./b\";export const d = b;",
          "signature": "-6489226382-export declare const d = 10;\r\n"
        },
        "version": "-19615769517-import { b } from \"./b\";export const d = b;",
        "signature": "-6489226382-export declare const d = 10;\r\n"
      }
    },
    "options": {
      "composite": true
    },
    "referencedMap": {
      "./c.ts": [
        "./a.ts"
      ],
      "./d.ts": [
        "./b.ts"
      ]
    },
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      "./a.ts",
      "./b.ts",
      "./c.ts",
      "./d.ts"
    ],
    "latestChangedDtsFile": "./d.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 1297
}



Change:: with declaration should not emit anything
Input::


Output::
/lib/tsc --b /src/project --verbose --declaration
[91merror[0m[90m TS5094: [0mCompiler option '--declaration' may not be used with '--build'.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped




Change:: with inlineSourceMap
Input::


Output::
/lib/tsc --b /src/project --verbose --inlineSourceMap
[91merror[0m[90m TS5094: [0mCompiler option '--inlineSourceMap' may not be used with '--build'.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped




Change:: with sourceMap
Input::


Output::
/lib/tsc --b /src/project --verbose --sourceMap
[91merror[0m[90m TS5094: [0mCompiler option '--sourceMap' may not be used with '--build'.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped


