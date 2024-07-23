currentDirectory:: /src/projects/project useCaseSensitiveFileNames: false
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

//// [/lib/lib.es2016.full.d.ts]
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

//// [/src/projects/project/package.json]
{
  "name": "app",
  "version": "1.0.0"
}

//// [/src/projects/project/src/fileA.ts]
import { foo } from "./fileB.mjs";
foo();


//// [/src/projects/project/src/fileB.mts]
export function foo() {}

//// [/src/projects/project/src/main.ts]
export const x = 10;

//// [/src/projects/project/src/tsconfig.json]
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



Output::
/lib/tsc -p src --explainFiles --extendedDiagnostics
File '/src/projects/project/src/package.json' does not exist.
Found 'package.json' at '/src/projects/project/package.json'.
File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/package.json' exists according to earlier cached lookups.
======== Resolving module './fileB.mjs' from '/src/projects/project/src/fileA.ts'. ========
Module resolution kind is not specified, using 'Node16'.
Resolving in CJS mode with conditions 'require', 'types', 'node'.
Loading module as file / folder, candidate module location '/src/projects/project/src/fileB.mjs', target file types: TypeScript, JavaScript, Declaration.
File name '/src/projects/project/src/fileB.mjs' has a '.mjs' extension - stripping it.
File '/src/projects/project/src/fileB.mts' exists - use it as a name resolution result.
======== Module name './fileB.mjs' was successfully resolved to '/src/projects/project/src/fileB.mts'. ========
File '/lib/package.json' does not exist.
File '/package.json' does not exist.
[96msrc/fileA.ts[0m:[93m1[0m:[93m21[0m - [91merror[0m[90m TS1479: [0mThe current file is a CommonJS module whose imports will produce 'require' calls; however, the referenced file is an ECMAScript module and cannot be imported with 'require'. Consider writing a dynamic 'import("./fileB.mjs")' call instead.
  To convert this file to an ECMAScript module, change its file extension to '.mts', or add the field `"type": "module"` to '/src/projects/project/package.json'.

[7m1[0m import { foo } from "./fileB.mjs";
[7m [0m [91m                    ~~~~~~~~~~~~~[0m

../../../lib/lib.es2016.full.d.ts
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

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated


//// [/src/projects/project/src/fileA.d.ts]
export {};


//// [/src/projects/project/src/fileA.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fileB_mjs_1 = require("./fileB.mjs");
(0, fileB_mjs_1.foo)();


//// [/src/projects/project/src/fileB.d.mts]
export declare function foo(): void;


//// [/src/projects/project/src/fileB.mjs]
export function foo() { }


//// [/src/projects/project/src/main.d.ts]
export declare const x = 10;


//// [/src/projects/project/src/main.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = 10;


//// [/src/projects/project/src/tsconfig.tsbuildinfo]
{"fileNames":["../../../../lib/lib.es2016.full.d.ts","./main.ts","./fileb.mts","./filea.ts"],"fileIdsList":[[3]],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true,"impliedFormat":1},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":1},{"version":"3524703962-export function foo() {}","signature":"-5677608893-export declare function foo(): void;\n","impliedFormat":99},{"version":"-5325347830-import { foo } from \"./fileB.mjs\";\nfoo();\n","signature":"-3531856636-export {};\n","impliedFormat":1}],"root":[[2,4]],"options":{"composite":true,"module":100,"target":3},"referencedMap":[[4,1]],"semanticDiagnosticsPerFile":[[4,[{"start":20,"length":13,"code":1479,"category":1,"messageText":{"messageText":"The current file is a CommonJS module whose imports will produce 'require' calls; however, the referenced file is an ECMAScript module and cannot be imported with 'require'. Consider writing a dynamic 'import(\"./fileB.mjs\")' call instead.","category":1,"code":1479,"next":[{"info":true}]}}]]],"latestChangedDtsFile":"./fileA.d.ts","version":"FakeTSVersion"}

//// [/src/projects/project/src/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../lib/lib.es2016.full.d.ts",
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
    "../../../../lib/lib.es2016.full.d.ts": {
      "original": {
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true,
        "impliedFormat": 1
      },
      "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
      "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
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
  "size": 1495
}



Change:: Delete package.json
Input::
//// [/src/projects/project/package.json] unlink


Output::
/lib/tsc -p src --explainFiles --extendedDiagnostics
File '/src/projects/project/src/package.json' does not exist.
File '/src/projects/project/package.json' does not exist.
File '/src/projects/package.json' does not exist.
File '/src/package.json' does not exist.
File '/package.json' does not exist.
File '/src/projects/project/src/package.json' does not exist according to earlier cached lookups.
File '/src/projects/project/package.json' does not exist according to earlier cached lookups.
File '/src/projects/package.json' does not exist according to earlier cached lookups.
File '/src/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
======== Resolving module './fileB.mjs' from '/src/projects/project/src/fileA.ts'. ========
Module resolution kind is not specified, using 'Node16'.
Resolving in CJS mode with conditions 'require', 'types', 'node'.
Loading module as file / folder, candidate module location '/src/projects/project/src/fileB.mjs', target file types: TypeScript, JavaScript, Declaration.
File name '/src/projects/project/src/fileB.mjs' has a '.mjs' extension - stripping it.
File '/src/projects/project/src/fileB.mts' exists - use it as a name resolution result.
======== Module name './fileB.mjs' was successfully resolved to '/src/projects/project/src/fileB.mts'. ========
File '/lib/package.json' does not exist.
File '/package.json' does not exist according to earlier cached lookups.
[96msrc/fileA.ts[0m:[93m1[0m:[93m21[0m - [91merror[0m[90m TS1479: [0mThe current file is a CommonJS module whose imports will produce 'require' calls; however, the referenced file is an ECMAScript module and cannot be imported with 'require'. Consider writing a dynamic 'import("./fileB.mjs")' call instead.
  To convert this file to an ECMAScript module, change its file extension to '.mts' or create a local package.json file with `{ "type": "module" }`.

[7m1[0m import { foo } from "./fileB.mjs";
[7m [0m [91m                    ~~~~~~~~~~~~~[0m

../../../lib/lib.es2016.full.d.ts
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


