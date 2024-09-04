currentDirectory:: /home/src/workspaces/project useCaseSensitiveFileNames:: false
Input::
//// [/home/src/workspaces/project/src/index.ts]
export const x = 10;

//// [/home/src/workspaces/project/types/type.ts]
export type t = string;

//// [/home/src/workspaces/project/tsconfig.json]
{
  "compilerOptions": {
    "outDir": "dist",
    "rootDir": "src",
    "composite": true
  }
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


/home/src/tslibs/TS/Lib/tsc.js --b -v
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because output file 'tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/project/tsconfig.json'...

[91merror[0m[90m TS6059: [0mFile '/home/src/workspaces/project/types/type.ts' is not under 'rootDir' '/home/src/workspaces/project/src'. 'rootDir' is expected to contain all source files.
  The file is in the program because:
    Matched by default include pattern '**/*'


Found 1 error.



//// [/home/src/workspaces/project/dist/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = 10;


//// [/home/src/workspaces/project/dist/index.d.ts]
export declare const x = 10;


//// [/home/src/workspaces/project/types/type.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });


//// [/home/src/workspaces/project/types/type.d.ts]
export type t = string;


//// [/home/src/workspaces/project/tsconfig.tsbuildinfo]
{"fileNames":["../../tslibs/ts/lib/lib.d.ts","./src/index.ts","./types/type.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n"},{"version":"-4885977236-export type t = string;","signature":"-6618426122-export type t = string;\n"}],"root":[2,3],"options":{"composite":true,"outDir":"./dist","rootDir":"./src"},"semanticDiagnosticsPerFile":[1,2,3],"latestChangedDtsFile":"./types/type.d.ts","version":"FakeTSVersion"}

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../tslibs/ts/lib/lib.d.ts",
    "./src/index.ts",
    "./types/type.ts"
  ],
  "fileInfos": {
    "../../tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "./src/index.ts": {
      "original": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n"
      },
      "version": "-10726455937-export const x = 10;",
      "signature": "-6821242887-export declare const x = 10;\n"
    },
    "./types/type.ts": {
      "original": {
        "version": "-4885977236-export type t = string;",
        "signature": "-6618426122-export type t = string;\n"
      },
      "version": "-4885977236-export type t = string;",
      "signature": "-6618426122-export type t = string;\n"
    }
  },
  "root": [
    [
      2,
      "./src/index.ts"
    ],
    [
      3,
      "./types/type.ts"
    ]
  ],
  "options": {
    "composite": true,
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "semanticDiagnosticsPerFile": [
    [
      "../../tslibs/ts/lib/lib.d.ts",
      "not cached or not changed"
    ],
    [
      "./src/index.ts",
      "not cached or not changed"
    ],
    [
      "./types/type.ts",
      "not cached or not changed"
    ]
  ],
  "latestChangedDtsFile": "./types/type.d.ts",
  "version": "FakeTSVersion",
  "size": 965
}


exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped

Change:: no-change-run

Input::

/home/src/tslibs/TS/Lib/tsc.js --b -v
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because buildinfo file 'tsconfig.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/project/tsconfig.json'...

[91merror[0m[90m TS6059: [0mFile '/home/src/workspaces/project/types/type.ts' is not under 'rootDir' '/home/src/workspaces/project/src'. 'rootDir' is expected to contain all source files.
  The file is in the program because:
    Matched by default include pattern '**/*'


Found 1 error.




exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped

Change:: Normal build without change, that does not block emit on error to show files that get emitted

Input::

/home/src/tslibs/TS/Lib/tsc.js -p /home/src/workspaces/project/tsconfig.json
Output::
[91merror[0m[90m TS6059: [0mFile '/home/src/workspaces/project/types/type.ts' is not under 'rootDir' '/home/src/workspaces/project/src'. 'rootDir' is expected to contain all source files.
  The file is in the program because:
    Matched by default include pattern '**/*'


Found 1 error.




exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated
