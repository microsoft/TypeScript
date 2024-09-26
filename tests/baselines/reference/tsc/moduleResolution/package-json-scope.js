currentDirectory:: /home/src/workspaces/project useCaseSensitiveFileNames:: false
Input::
//// [/home/src/workspaces/project/src/tsconfig.json]
{
  "compilerOptions": {
    "target": "es2016",
    "composite": true,
    "module": "node16",
    "traceResolution": true
  },
  "files": [
    "main.ts",
    "fileA.ts",
    "fileB.mts"
  ]
}

//// [/home/src/workspaces/project/src/main.ts]
export const x = 10;

//// [/home/src/workspaces/project/src/fileA.ts]
import { foo } from "./fileB.mjs";
foo();


//// [/home/src/workspaces/project/src/fileB.mts]
export function foo() {}

//// [/home/src/workspaces/project/package.json]
{
  "name": "app",
  "version": "1.0.0"
}

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


/home/src/tslibs/TS/Lib/tsc.js -p src --explainFiles --extendedDiagnostics
Output::
File '/home/src/workspaces/project/src/package.json' does not exist.
Found 'package.json' at '/home/src/workspaces/project/package.json'.
File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
======== Resolving module './fileB.mjs' from '/home/src/workspaces/project/src/fileA.ts'. ========
Module resolution kind is not specified, using 'Node16'.
Resolving in CJS mode with conditions 'require', 'types', 'node'.
Loading module as file / folder, candidate module location '/home/src/workspaces/project/src/fileB.mjs', target file types: TypeScript, JavaScript, Declaration.
File name '/home/src/workspaces/project/src/fileB.mjs' has a '.mjs' extension - stripping it.
File '/home/src/workspaces/project/src/fileB.mts' exists - use it as a name resolution result.
======== Module name './fileB.mjs' was successfully resolved to '/home/src/workspaces/project/src/fileB.mts'. ========
File '/home/src/tslibs/TS/Lib/package.json' does not exist.
File '/home/src/tslibs/TS/package.json' does not exist.
File '/home/src/tslibs/package.json' does not exist.
File '/home/src/package.json' does not exist.
File '/home/package.json' does not exist.
File '/package.json' does not exist.
[96msrc/fileA.ts[0m:[93m1[0m:[93m21[0m - [91merror[0m[90m TS1479: [0mThe current file is a CommonJS module whose imports will produce 'require' calls; however, the referenced file is an ECMAScript module and cannot be imported with 'require'. Consider writing a dynamic 'import("./fileB.mjs")' call instead.
  To convert this file to an ECMAScript module, change its file extension to '.mts', or add the field `"type": "module"` to '/home/src/workspaces/project/package.json'.

[7m1[0m import { foo } from "./fileB.mjs";
[7m [0m [91m                    ~~~~~~~~~~~~~[0m

../../tslibs/TS/Lib/lib.es2016.full.d.ts
  Default library for target 'es2016'
src/main.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' does not have field "type"
src/fileB.mts
  Imported via "./fileB.mjs" from file 'src/fileA.ts'
  Part of 'files' list in tsconfig.json
src/fileA.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' does not have field "type"

Found 1 error in src/fileA.ts[90m:1[0m



//// [/home/src/tslibs/TS/Lib/lib.es2016.full.d.ts] *Lib*

//// [/home/src/workspaces/project/src/main.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = 10;


//// [/home/src/workspaces/project/src/main.d.ts]
export declare const x = 10;


//// [/home/src/workspaces/project/src/fileB.mjs]
export function foo() { }


//// [/home/src/workspaces/project/src/fileB.d.mts]
export declare function foo(): void;


//// [/home/src/workspaces/project/src/fileA.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fileB_mjs_1 = require("./fileB.mjs");
(0, fileB_mjs_1.foo)();


//// [/home/src/workspaces/project/src/fileA.d.ts]
export {};


//// [/home/src/workspaces/project/src/tsconfig.tsbuildinfo]
{"fileNames":["../../../tslibs/ts/lib/lib.es2016.full.d.ts","./main.ts","./fileb.mts","./filea.ts"],"fileIdsList":[[3]],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedFormat":1},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":1},{"version":"3524703962-export function foo() {}","signature":"-5677608893-export declare function foo(): void;\n","impliedFormat":99},{"version":"-5325347830-import { foo } from \"./fileB.mjs\";\nfoo();\n","signature":"-3531856636-export {};\n","impliedFormat":1}],"root":[[2,4]],"options":{"composite":true,"module":100,"target":3},"referencedMap":[[4,1]],"semanticDiagnosticsPerFile":[[4,[{"start":20,"length":13,"code":1479,"category":1,"messageText":{"messageText":"The current file is a CommonJS module whose imports will produce 'require' calls; however, the referenced file is an ECMAScript module and cannot be imported with 'require'. Consider writing a dynamic 'import(\"./fileB.mjs\")' call instead.","category":1,"code":1479,"next":[{"info":true}]}}]]],"latestChangedDtsFile":"./fileA.d.ts","version":"FakeTSVersion"}

//// [/home/src/workspaces/project/src/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../tslibs/ts/lib/lib.es2016.full.d.ts",
    "./main.ts",
    "./fileb.mts",
    "./filea.ts"
  ],
  "fileIdsList": [
    [
      "./fileb.mts"
    ]
  ],
  "fileInfos": {
    "../../../tslibs/ts/lib/lib.es2016.full.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true,
        "impliedFormat": 1
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true,
      "impliedFormat": "commonjs"
    },
    "./main.ts": {
      "original": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": 1
      },
      "version": "-10726455937-export const x = 10;",
      "signature": "-6821242887-export declare const x = 10;\n",
      "impliedFormat": "commonjs"
    },
    "./fileb.mts": {
      "original": {
        "version": "3524703962-export function foo() {}",
        "signature": "-5677608893-export declare function foo(): void;\n",
        "impliedFormat": 99
      },
      "version": "3524703962-export function foo() {}",
      "signature": "-5677608893-export declare function foo(): void;\n",
      "impliedFormat": "esnext"
    },
    "./filea.ts": {
      "original": {
        "version": "-5325347830-import { foo } from \"./fileB.mjs\";\nfoo();\n",
        "signature": "-3531856636-export {};\n",
        "impliedFormat": 1
      },
      "version": "-5325347830-import { foo } from \"./fileB.mjs\";\nfoo();\n",
      "signature": "-3531856636-export {};\n",
      "impliedFormat": "commonjs"
    }
  },
  "root": [
    [
      [
        2,
        4
      ],
      [
        "./main.ts",
        "./fileb.mts",
        "./filea.ts"
      ]
    ]
  ],
  "options": {
    "composite": true,
    "module": 100,
    "target": 3
  },
  "referencedMap": {
    "./filea.ts": [
      "./fileb.mts"
    ]
  },
  "semanticDiagnosticsPerFile": [
    [
      "./filea.ts",
      [
        {
          "start": 20,
          "length": 13,
          "code": 1479,
          "category": 1,
          "messageText": {
            "messageText": "The current file is a CommonJS module whose imports will produce 'require' calls; however, the referenced file is an ECMAScript module and cannot be imported with 'require'. Consider writing a dynamic 'import(\"./fileB.mjs\")' call instead.",
            "category": 1,
            "code": 1479,
            "next": [
              {
                "info": true
              }
            ]
          }
        }
      ]
    ]
  ],
  "latestChangedDtsFile": "./fileA.d.ts",
  "version": "FakeTSVersion",
  "size": 1582
}


exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated

Change:: Delete package.json

Input::
//// [/home/src/workspaces/project/package.json] deleted

/home/src/tslibs/TS/Lib/tsc.js -p src --explainFiles --extendedDiagnostics
Output::
File '/home/src/workspaces/project/src/package.json' does not exist.
File '/home/src/workspaces/project/package.json' does not exist.
File '/home/src/workspaces/package.json' does not exist.
File '/home/src/package.json' does not exist.
File '/home/package.json' does not exist.
File '/package.json' does not exist.
File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
======== Resolving module './fileB.mjs' from '/home/src/workspaces/project/src/fileA.ts'. ========
Module resolution kind is not specified, using 'Node16'.
Resolving in CJS mode with conditions 'require', 'types', 'node'.
Loading module as file / folder, candidate module location '/home/src/workspaces/project/src/fileB.mjs', target file types: TypeScript, JavaScript, Declaration.
File name '/home/src/workspaces/project/src/fileB.mjs' has a '.mjs' extension - stripping it.
File '/home/src/workspaces/project/src/fileB.mts' exists - use it as a name resolution result.
======== Module name './fileB.mjs' was successfully resolved to '/home/src/workspaces/project/src/fileB.mts'. ========
File '/home/src/tslibs/TS/Lib/package.json' does not exist.
File '/home/src/tslibs/TS/package.json' does not exist.
File '/home/src/tslibs/package.json' does not exist.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
[96msrc/fileA.ts[0m:[93m1[0m:[93m21[0m - [91merror[0m[90m TS1479: [0mThe current file is a CommonJS module whose imports will produce 'require' calls; however, the referenced file is an ECMAScript module and cannot be imported with 'require'. Consider writing a dynamic 'import("./fileB.mjs")' call instead.
  To convert this file to an ECMAScript module, change its file extension to '.mts' or create a local package.json file with `{ "type": "module" }`.

[7m1[0m import { foo } from "./fileB.mjs";
[7m [0m [91m                    ~~~~~~~~~~~~~[0m

../../tslibs/TS/Lib/lib.es2016.full.d.ts
  Default library for target 'es2016'
src/main.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' was not found
src/fileB.mts
  Imported via "./fileB.mjs" from file 'src/fileA.ts'
  Part of 'files' list in tsconfig.json
src/fileA.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' was not found

Found 1 error in src/fileA.ts[90m:1[0m




exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated
