currentDirectory:: /users/username/projects/project useCaseSensitiveFileNames:: false
Input::
//// [/users/username/projects/project/globals.d.ts]
declare namespace Config { const value: string;} 

//// [/users/username/projects/project/index.ts]
console.log(Config.value);

//// [/users/username/projects/project/tsconfig.json]
{
  "compilerOptions": {
    "incremental": true
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


/home/src/tslibs/TS/Lib/tsc.js -w
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] Starting compilation in watch mode...

[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/users/username/projects/project/index.js]
console.log(Config.value);


//// [/users/username/projects/project/tsconfig.tsbuildinfo]
{"fileNames":["../../../../home/src/tslibs/ts/lib/lib.d.ts","./globals.d.ts","./index.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-6314871648-declare namespace Config { const value: string;} ","affectsGlobalScope":true},{"version":"5371023861-console.log(Config.value);","affectsGlobalScope":true}],"root":[2,3],"version":"FakeTSVersion"}

//// [/users/username/projects/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../home/src/tslibs/ts/lib/lib.d.ts",
    "./globals.d.ts",
    "./index.ts"
  ],
  "fileInfos": {
    "../../../../home/src/tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "./globals.d.ts": {
      "original": {
        "version": "-6314871648-declare namespace Config { const value: string;} ",
        "affectsGlobalScope": true
      },
      "version": "-6314871648-declare namespace Config { const value: string;} ",
      "signature": "-6314871648-declare namespace Config { const value: string;} ",
      "affectsGlobalScope": true
    },
    "./index.ts": {
      "original": {
        "version": "5371023861-console.log(Config.value);",
        "affectsGlobalScope": true
      },
      "version": "5371023861-console.log(Config.value);",
      "signature": "5371023861-console.log(Config.value);",
      "affectsGlobalScope": true
    }
  },
  "root": [
    [
      2,
      "./globals.d.ts"
    ],
    [
      3,
      "./index.ts"
    ]
  ],
  "version": "FakeTSVersion",
  "size": 803
}


PolledWatches::
/users/username/projects/node_modules/@types: *new*
  {"pollingInterval":500}
/users/username/projects/project/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts: *new*
  {}
/users/username/projects/project/globals.d.ts: *new*
  {}
/users/username/projects/project/index.ts: *new*
  {}
/users/username/projects/project/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/users/username/projects/project: *new*
  {}

Program root files: [
  "/users/username/projects/project/globals.d.ts",
  "/users/username/projects/project/index.ts"
]
Program options: {
  "incremental": true,
  "watch": true,
  "configFilePath": "/users/username/projects/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/users/username/projects/project/globals.d.ts
/users/username/projects/project/index.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/users/username/projects/project/globals.d.ts
/users/username/projects/project/index.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/users/username/projects/project/globals.d.ts (used version)
/users/username/projects/project/index.ts (used version)

exitCode:: ExitStatus.undefined

Change::

Input::
//// [/users/username/projects/project/globals.d.ts] deleted

PolledWatches *deleted*::
/users/username/projects/node_modules/@types:
  {"pollingInterval":500}
/users/username/projects/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches *deleted*::
/home/src/tslibs/TS/Lib/lib.d.ts:
  {}
/users/username/projects/project/globals.d.ts:
  {}
/users/username/projects/project/index.ts:
  {}
/users/username/projects/project/tsconfig.json:
  {}

FsWatchesRecursive *deleted*::
/users/username/projects/project:
  {}

Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] Starting compilation in watch mode...

[96mindex.ts[0m:[93m1[0m:[93m13[0m - [91merror[0m[90m TS2304: [0mCannot find name 'Config'.

[7m1[0m console.log(Config.value);
[7m [0m [91m            ~~~~~~[0m

[[90mHH:MM:SS AM[0m] Found 1 error. Watching for file changes.



//// [/users/username/projects/project/index.js] file written with same contents
//// [/users/username/projects/project/tsconfig.tsbuildinfo]
{"fileNames":["../../../../home/src/tslibs/ts/lib/lib.d.ts","./index.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"5371023861-console.log(Config.value);","signature":"5381-","affectsGlobalScope":true}],"root":[2],"semanticDiagnosticsPerFile":[[2,[{"start":12,"length":6,"messageText":"Cannot find name 'Config'.","category":1,"code":2304}]]],"version":"FakeTSVersion"}

//// [/users/username/projects/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../home/src/tslibs/ts/lib/lib.d.ts",
    "./index.ts"
  ],
  "fileInfos": {
    "../../../../home/src/tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "./index.ts": {
      "original": {
        "version": "5371023861-console.log(Config.value);",
        "signature": "5381-",
        "affectsGlobalScope": true
      },
      "version": "5371023861-console.log(Config.value);",
      "signature": "5381-",
      "affectsGlobalScope": true
    }
  },
  "root": [
    [
      2,
      "./index.ts"
    ]
  ],
  "semanticDiagnosticsPerFile": [
    [
      "./index.ts",
      [
        {
          "start": 12,
          "length": 6,
          "messageText": "Cannot find name 'Config'.",
          "category": 1,
          "code": 2304
        }
      ]
    ]
  ],
  "version": "FakeTSVersion",
  "size": 831
}


PolledWatches::
/users/username/projects/node_modules/@types: *new*
  {"pollingInterval":500}
/users/username/projects/project/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts: *new*
  {}
/users/username/projects/project/index.ts: *new*
  {}
/users/username/projects/project/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/users/username/projects/project: *new*
  {}

Program root files: [
  "/users/username/projects/project/index.ts"
]
Program options: {
  "incremental": true,
  "watch": true,
  "configFilePath": "/users/username/projects/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/users/username/projects/project/index.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/users/username/projects/project/index.ts

Shape signatures in builder refreshed for::
/users/username/projects/project/index.ts (computed .d.ts)

exitCode:: ExitStatus.undefined
