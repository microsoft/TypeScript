currentDirectory:: /user/username/projects/solution useCaseSensitiveFileNames: false
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

//// [/user/username/projects/solution/app/fileWithError.ts]
export var myClassWithError = class {
        tags() { }
        private p = 12
    };

//// [/user/username/projects/solution/app/fileWithoutError.ts]
export class myClass { }

//// [/user/username/projects/solution/app/tsconfig.json]
{
  "compilerOptions": {
    "composite": true
  }
}


/a/lib/tsc.js -b -w app
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] Starting compilation in watch mode...

[96mapp/fileWithError.ts[0m:[93m1[0m:[93m12[0m - [91merror[0m[90m TS4094: [0mProperty 'p' of exported class expression may not be private or protected.

[7m1[0m export var myClassWithError = class {
[7m [0m [91m           ~~~~~~~~~~~~~~~~[0m

[[90mHH:MM:SS AM[0m] Found 1 error. Watching for file changes.



//// [/user/username/projects/solution/app/tsconfig.tsbuildinfo]
{"fileNames":["../../../../../a/lib/lib.d.ts","./filewitherror.ts","./filewithouterror.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true,"impliedFormat":1},{"version":"-8103865863-export var myClassWithError = class {\n        tags() { }\n        private p = 12\n    };","impliedFormat":1},{"version":"-11785903855-export class myClass { }","signature":"-7432826827-export declare class myClass {\n}\n","impliedFormat":1}],"root":[2,3],"options":{"composite":true},"affectedFilesPendingEmit":[2,3],"emitSignatures":[2,3],"version":"FakeTSVersion"}

//// [/user/username/projects/solution/app/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../../a/lib/lib.d.ts",
    "./filewitherror.ts",
    "./filewithouterror.ts"
  ],
  "fileInfos": {
    "../../../../../a/lib/lib.d.ts": {
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
    "./filewitherror.ts": {
      "original": {
        "version": "-8103865863-export var myClassWithError = class {\n        tags() { }\n        private p = 12\n    };",
        "impliedFormat": 1
      },
      "version": "-8103865863-export var myClassWithError = class {\n        tags() { }\n        private p = 12\n    };",
      "signature": "-8103865863-export var myClassWithError = class {\n        tags() { }\n        private p = 12\n    };",
      "impliedFormat": "commonjs"
    },
    "./filewithouterror.ts": {
      "original": {
        "version": "-11785903855-export class myClass { }",
        "signature": "-7432826827-export declare class myClass {\n}\n",
        "impliedFormat": 1
      },
      "version": "-11785903855-export class myClass { }",
      "signature": "-7432826827-export declare class myClass {\n}\n",
      "impliedFormat": "commonjs"
    }
  },
  "root": [
    [
      2,
      "./filewitherror.ts"
    ],
    [
      3,
      "./filewithouterror.ts"
    ]
  ],
  "options": {
    "composite": true
  },
  "affectedFilesPendingEmit": [
    [
      "./filewitherror.ts",
      "Js | Dts"
    ],
    [
      "./filewithouterror.ts",
      "Js | Dts"
    ]
  ],
  "emitSignatures": [
    "./filewitherror.ts",
    "./filewithouterror.ts"
  ],
  "version": "FakeTSVersion",
  "size": 913
}


PolledWatches::
/a/lib/package.json: *new*
  {"pollingInterval":2000}
/a/package.json: *new*
  {"pollingInterval":2000}
/package.json: *new*
  {"pollingInterval":2000}
/user/package.json: *new*
  {"pollingInterval":2000}
/user/username/package.json: *new*
  {"pollingInterval":2000}
/user/username/projects/package.json: *new*
  {"pollingInterval":2000}
/user/username/projects/solution/app/package.json: *new*
  {"pollingInterval":2000}
/user/username/projects/solution/package.json: *new*
  {"pollingInterval":2000}

FsWatches::
/user/username/projects/solution/app/fileWithError.ts: *new*
  {}
/user/username/projects/solution/app/fileWithoutError.ts: *new*
  {}
/user/username/projects/solution/app/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/user/username/projects/solution/app: *new*
  {}

Program root files: [
  "/user/username/projects/solution/app/fileWithError.ts",
  "/user/username/projects/solution/app/fileWithoutError.ts"
]
Program options: {
  "composite": true,
  "watch": true,
  "configFilePath": "/user/username/projects/solution/app/tsconfig.json"
}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/solution/app/fileWithError.ts
/user/username/projects/solution/app/fileWithoutError.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/user/username/projects/solution/app/fileWithError.ts
/user/username/projects/solution/app/fileWithoutError.ts

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/user/username/projects/solution/app/filewitherror.ts (used version)
/user/username/projects/solution/app/filewithouterror.ts (computed .d.ts during emit)

exitCode:: ExitStatus.undefined

Change:: Change fileWithoutError

Input::
//// [/user/username/projects/solution/app/fileWithoutError.ts]
export class myClass2 { }


Timeout callback:: count: 1
1: timerToBuildInvalidatedProject *new*

Before running Timeout callback:: count: 1
1: timerToBuildInvalidatedProject

Host is moving to new time
After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

[96mapp/fileWithError.ts[0m:[93m1[0m:[93m12[0m - [91merror[0m[90m TS4094: [0mProperty 'p' of exported class expression may not be private or protected.

[7m1[0m export var myClassWithError = class {
[7m [0m [91m           ~~~~~~~~~~~~~~~~[0m

[[90mHH:MM:SS AM[0m] Found 1 error. Watching for file changes.



//// [/user/username/projects/solution/app/tsconfig.tsbuildinfo]
{"fileNames":["../../../../../a/lib/lib.d.ts","./filewitherror.ts","./filewithouterror.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true,"impliedFormat":1},{"version":"-8103865863-export var myClassWithError = class {\n        tags() { }\n        private p = 12\n    };","impliedFormat":1},{"version":"-10959532701-export class myClass2 { }","signature":"-8459626297-export declare class myClass2 {\n}\n","impliedFormat":1}],"root":[2,3],"options":{"composite":true},"affectedFilesPendingEmit":[2,3],"emitSignatures":[2,3],"version":"FakeTSVersion"}

//// [/user/username/projects/solution/app/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../../a/lib/lib.d.ts",
    "./filewitherror.ts",
    "./filewithouterror.ts"
  ],
  "fileInfos": {
    "../../../../../a/lib/lib.d.ts": {
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
    "./filewitherror.ts": {
      "original": {
        "version": "-8103865863-export var myClassWithError = class {\n        tags() { }\n        private p = 12\n    };",
        "impliedFormat": 1
      },
      "version": "-8103865863-export var myClassWithError = class {\n        tags() { }\n        private p = 12\n    };",
      "signature": "-8103865863-export var myClassWithError = class {\n        tags() { }\n        private p = 12\n    };",
      "impliedFormat": "commonjs"
    },
    "./filewithouterror.ts": {
      "original": {
        "version": "-10959532701-export class myClass2 { }",
        "signature": "-8459626297-export declare class myClass2 {\n}\n",
        "impliedFormat": 1
      },
      "version": "-10959532701-export class myClass2 { }",
      "signature": "-8459626297-export declare class myClass2 {\n}\n",
      "impliedFormat": "commonjs"
    }
  },
  "root": [
    [
      2,
      "./filewitherror.ts"
    ],
    [
      3,
      "./filewithouterror.ts"
    ]
  ],
  "options": {
    "composite": true
  },
  "affectedFilesPendingEmit": [
    [
      "./filewitherror.ts",
      "Js | Dts"
    ],
    [
      "./filewithouterror.ts",
      "Js | Dts"
    ]
  ],
  "emitSignatures": [
    "./filewitherror.ts",
    "./filewithouterror.ts"
  ],
  "version": "FakeTSVersion",
  "size": 915
}



Program root files: [
  "/user/username/projects/solution/app/fileWithError.ts",
  "/user/username/projects/solution/app/fileWithoutError.ts"
]
Program options: {
  "composite": true,
  "watch": true,
  "configFilePath": "/user/username/projects/solution/app/tsconfig.json"
}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/solution/app/fileWithError.ts
/user/username/projects/solution/app/fileWithoutError.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/solution/app/fileWithoutError.ts

Shape signatures in builder refreshed for::
/user/username/projects/solution/app/filewithouterror.ts (computed .d.ts)

exitCode:: ExitStatus.undefined
