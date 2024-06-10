currentDirectory:: / useCaseSensitiveFileNames: false
Input::
//// [/src/project/main.ts]
export const x = 10;

//// [/src/project/tsconfig.json]
{}

//// [/src/project/tsconfig.tsbuildinfo]
Some random string

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


/a/lib/tsc.js --b src/project -i -w
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] Starting compilation in watch mode...

[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/src/project/tsconfig.tsbuildinfo]
{"fileNames":["../../a/lib/lib.d.ts","./main.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true,"impliedFormat":1},{"version":"-10726455937-export const x = 10;","impliedFormat":1}],"root":[2],"version":"FakeTSVersion"}

//// [/src/project/main.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = 10;


//// [/src/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../a/lib/lib.d.ts",
    "./main.ts"
  ],
  "fileInfos": {
    "../../a/lib/lib.d.ts": {
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
        "impliedFormat": 1
      },
      "version": "-10726455937-export const x = 10;",
      "signature": "-10726455937-export const x = 10;",
      "impliedFormat": "commonjs"
    }
  },
  "root": [
    [
      2,
      "./main.ts"
    ]
  ],
  "version": "FakeTSVersion",
  "size": 584
}


PolledWatches::
/a/lib/package.json: *new*
  {"pollingInterval":2000}
/a/package.json: *new*
  {"pollingInterval":2000}
/package.json: *new*
  {"pollingInterval":2000}
/src/package.json: *new*
  {"pollingInterval":2000}
/src/project/package.json: *new*
  {"pollingInterval":2000}

FsWatches::
/src/project/main.ts: *new*
  {}
/src/project/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/src/project: *new*
  {}

Program root files: [
  "/src/project/main.ts"
]
Program options: {
  "watch": true,
  "incremental": true,
  "configFilePath": "/src/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/src/project/main.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/src/project/main.ts

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/src/project/main.ts (used version)

exitCode:: ExitStatus.undefined
