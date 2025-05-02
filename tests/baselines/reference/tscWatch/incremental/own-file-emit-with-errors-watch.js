currentDirectory:: /users/username/projects/project useCaseSensitiveFileNames:: false
Input::
//// [/users/username/projects/project/file1.ts]
const x = 10;

//// [/users/username/projects/project/tsconfig.json]
{
  "compilerOptions": {
    "incremental": true
  }
}

//// [/users/username/projects/project/file2.ts]
const y: string = 20;

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

[96mfile2.ts[0m:[93m1[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'number' is not assignable to type 'string'.

[7m1[0m const y: string = 20;
[7m [0m [91m      ~[0m

[[90mHH:MM:SS AM[0m] Found 1 error. Watching for file changes.



//// [/users/username/projects/project/file1.js]
var x = 10;


//// [/users/username/projects/project/file2.js]
var y = 20;


//// [/users/username/projects/project/tsconfig.tsbuildinfo]
{"fileNames":["../../../../home/src/tslibs/ts/lib/lib.d.ts","./file1.ts","./file2.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"5029505981-const x = 10;","affectsGlobalScope":true},{"version":"2414573776-const y: string = 20;","affectsGlobalScope":true}],"root":[2,3],"semanticDiagnosticsPerFile":[[3,[{"start":6,"length":1,"code":2322,"category":1,"messageText":"Type 'number' is not assignable to type 'string'."}]]],"version":"FakeTSVersion"}

//// [/users/username/projects/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../home/src/tslibs/ts/lib/lib.d.ts",
    "./file1.ts",
    "./file2.ts"
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
    "./file1.ts": {
      "original": {
        "version": "5029505981-const x = 10;",
        "affectsGlobalScope": true
      },
      "version": "5029505981-const x = 10;",
      "signature": "5029505981-const x = 10;",
      "affectsGlobalScope": true
    },
    "./file2.ts": {
      "original": {
        "version": "2414573776-const y: string = 20;",
        "affectsGlobalScope": true
      },
      "version": "2414573776-const y: string = 20;",
      "signature": "2414573776-const y: string = 20;",
      "affectsGlobalScope": true
    }
  },
  "root": [
    [
      2,
      "./file1.ts"
    ],
    [
      3,
      "./file2.ts"
    ]
  ],
  "semanticDiagnosticsPerFile": [
    [
      "./file2.ts",
      [
        {
          "start": 6,
          "length": 1,
          "code": 2322,
          "category": 1,
          "messageText": "Type 'number' is not assignable to type 'string'."
        }
      ]
    ]
  ],
  "version": "FakeTSVersion",
  "size": 908
}


PolledWatches::
/users/username/projects/node_modules/@types: *new*
  {"pollingInterval":500}
/users/username/projects/project/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts: *new*
  {}
/users/username/projects/project/file1.ts: *new*
  {}
/users/username/projects/project/file2.ts: *new*
  {}
/users/username/projects/project/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/users/username/projects/project: *new*
  {}

Program root files: [
  "/users/username/projects/project/file1.ts",
  "/users/username/projects/project/file2.ts"
]
Program options: {
  "incremental": true,
  "watch": true,
  "configFilePath": "/users/username/projects/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/users/username/projects/project/file1.ts
/users/username/projects/project/file2.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/users/username/projects/project/file1.ts
/users/username/projects/project/file2.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/users/username/projects/project/file1.ts (used version)
/users/username/projects/project/file2.ts (used version)

exitCode:: ExitStatus.undefined

Change::

Input::
//// [/users/username/projects/project/file1.ts]
const z = 10;


PolledWatches *deleted*::
/users/username/projects/node_modules/@types:
  {"pollingInterval":500}
/users/username/projects/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches *deleted*::
/home/src/tslibs/TS/Lib/lib.d.ts:
  {}
/users/username/projects/project/file1.ts:
  {}
/users/username/projects/project/file2.ts:
  {}
/users/username/projects/project/tsconfig.json:
  {}

FsWatchesRecursive *deleted*::
/users/username/projects/project:
  {}

Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] Starting compilation in watch mode...

[96mfile2.ts[0m:[93m1[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'number' is not assignable to type 'string'.

[7m1[0m const y: string = 20;
[7m [0m [91m      ~[0m

[[90mHH:MM:SS AM[0m] Found 1 error. Watching for file changes.



//// [/users/username/projects/project/file1.js]
var z = 10;


//// [/users/username/projects/project/file2.js] file written with same contents
//// [/users/username/projects/project/tsconfig.tsbuildinfo]
{"fileNames":["../../../../home/src/tslibs/ts/lib/lib.d.ts","./file1.ts","./file2.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"3317474623-const z = 10;","signature":"-368931399-declare const z = 10;\n","affectsGlobalScope":true},{"version":"2414573776-const y: string = 20;","signature":"509180395-declare const y: string;\n","affectsGlobalScope":true}],"root":[2,3],"semanticDiagnosticsPerFile":[[3,[{"start":6,"length":1,"code":2322,"category":1,"messageText":"Type 'number' is not assignable to type 'string'."}]]],"version":"FakeTSVersion"}

//// [/users/username/projects/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../home/src/tslibs/ts/lib/lib.d.ts",
    "./file1.ts",
    "./file2.ts"
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
    "./file1.ts": {
      "original": {
        "version": "3317474623-const z = 10;",
        "signature": "-368931399-declare const z = 10;\n",
        "affectsGlobalScope": true
      },
      "version": "3317474623-const z = 10;",
      "signature": "-368931399-declare const z = 10;\n",
      "affectsGlobalScope": true
    },
    "./file2.ts": {
      "original": {
        "version": "2414573776-const y: string = 20;",
        "signature": "509180395-declare const y: string;\n",
        "affectsGlobalScope": true
      },
      "version": "2414573776-const y: string = 20;",
      "signature": "509180395-declare const y: string;\n",
      "affectsGlobalScope": true
    }
  },
  "root": [
    [
      2,
      "./file1.ts"
    ],
    [
      3,
      "./file2.ts"
    ]
  ],
  "semanticDiagnosticsPerFile": [
    [
      "./file2.ts",
      [
        {
          "start": 6,
          "length": 1,
          "code": 2322,
          "category": 1,
          "messageText": "Type 'number' is not assignable to type 'string'."
        }
      ]
    ]
  ],
  "version": "FakeTSVersion",
  "size": 1008
}


PolledWatches::
/users/username/projects/node_modules/@types: *new*
  {"pollingInterval":500}
/users/username/projects/project/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts: *new*
  {}
/users/username/projects/project/file1.ts: *new*
  {}
/users/username/projects/project/file2.ts: *new*
  {}
/users/username/projects/project/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/users/username/projects/project: *new*
  {}

Program root files: [
  "/users/username/projects/project/file1.ts",
  "/users/username/projects/project/file2.ts"
]
Program options: {
  "incremental": true,
  "watch": true,
  "configFilePath": "/users/username/projects/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/users/username/projects/project/file1.ts
/users/username/projects/project/file2.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/users/username/projects/project/file1.ts
/users/username/projects/project/file2.ts

Shape signatures in builder refreshed for::
/users/username/projects/project/file1.ts (computed .d.ts)
/users/username/projects/project/file2.ts (computed .d.ts)

exitCode:: ExitStatus.undefined
