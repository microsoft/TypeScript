currentDirectory:: /user/username/projects/myproject useCaseSensitiveFileNames: false
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
interface ReadonlyArray<T> {}
declare const console: { log(msg: any): void; };

//// [/user/username/projects/myproject/a.js]


//// [/user/username/projects/myproject/b.ts]


//// [/user/username/projects/myproject/tsconfig.json]
{
  "compilerOptions": {
    "allowJs": true,
    "noEmit": true,
    "outFile": "../out.js"
  }
}


/a/lib/tsc.js -b -w -verbose --incremental
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] Starting compilation in watch mode...

[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because output file '../out.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project '/user/username/projects/myproject/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/user/username/projects/out.tsbuildinfo]
{"fileNames":["../../../a/lib/lib.d.ts","./myproject/a.js","./myproject/b.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","impliedFormat":1},{"version":"5381-","impliedFormat":1},{"version":"5381-","impliedFormat":1}],"root":[2,3],"options":{"allowJs":true,"outFile":"./out.js"},"pendingEmit":false,"version":"FakeTSVersion"}

//// [/user/username/projects/out.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../a/lib/lib.d.ts",
    "./myproject/a.js",
    "./myproject/b.ts"
  ],
  "fileInfos": {
    "../../../a/lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "impliedFormat": 1
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "impliedFormat": "commonjs"
    },
    "./myproject/a.js": {
      "original": {
        "version": "5381-",
        "impliedFormat": 1
      },
      "version": "5381-",
      "impliedFormat": "commonjs"
    },
    "./myproject/b.ts": {
      "original": {
        "version": "5381-",
        "impliedFormat": 1
      },
      "version": "5381-",
      "impliedFormat": "commonjs"
    }
  },
  "root": [
    [
      2,
      "./myproject/a.js"
    ],
    [
      3,
      "./myproject/b.ts"
    ]
  ],
  "options": {
    "allowJs": true,
    "outFile": "./out.js"
  },
  "pendingEmit": [
    "Js",
    false
  ],
  "version": "FakeTSVersion",
  "size": 747
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
/user/username/projects/myproject/package.json: *new*
  {"pollingInterval":2000}
/user/username/projects/package.json: *new*
  {"pollingInterval":2000}

FsWatches::
/user/username/projects/myproject/a.js: *new*
  {}
/user/username/projects/myproject/b.ts: *new*
  {}
/user/username/projects/myproject/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/user/username/projects/myproject: *new*
  {}

Program root files: [
  "/user/username/projects/myproject/a.js",
  "/user/username/projects/myproject/b.ts"
]
Program options: {
  "allowJs": true,
  "noEmit": true,
  "outFile": "/user/username/projects/out.js",
  "watch": true,
  "incremental": true,
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/a.js
/user/username/projects/myproject/b.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/user/username/projects/myproject/a.js
/user/username/projects/myproject/b.ts

No shapes updated in the builder::

exitCode:: ExitStatus.undefined

Change:: No change

Input::
//// [/user/username/projects/myproject/a.js] file written with same contents

Timeout callback:: count: 1
1: timerToBuildInvalidatedProject *new*

Before running Timeout callback:: count: 1
1: timerToBuildInvalidatedProject

Host is moving to new time
After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is up to date but needs to update timestamps of output files that are older than input files

[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.





exitCode:: ExitStatus.undefined

Change:: change

Input::
//// [/user/username/projects/myproject/a.js]
const x = 10;


Timeout callback:: count: 1
2: timerToBuildInvalidatedProject *new*

Before running Timeout callback:: count: 1
2: timerToBuildInvalidatedProject

Host is moving to new time
After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because output '../out.tsbuildinfo' is older than input 'a.js'

[[90mHH:MM:SS AM[0m] Building project '/user/username/projects/myproject/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/user/username/projects/out.tsbuildinfo]
{"fileNames":["../../../a/lib/lib.d.ts","./myproject/a.js","./myproject/b.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","impliedFormat":1},{"version":"5029505981-const x = 10;","impliedFormat":1},{"version":"5381-","impliedFormat":1}],"root":[2,3],"options":{"allowJs":true,"outFile":"./out.js"},"pendingEmit":false,"version":"FakeTSVersion"}

//// [/user/username/projects/out.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../a/lib/lib.d.ts",
    "./myproject/a.js",
    "./myproject/b.ts"
  ],
  "fileInfos": {
    "../../../a/lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "impliedFormat": 1
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "impliedFormat": "commonjs"
    },
    "./myproject/a.js": {
      "original": {
        "version": "5029505981-const x = 10;",
        "impliedFormat": 1
      },
      "version": "5029505981-const x = 10;",
      "impliedFormat": "commonjs"
    },
    "./myproject/b.ts": {
      "original": {
        "version": "5381-",
        "impliedFormat": 1
      },
      "version": "5381-",
      "impliedFormat": "commonjs"
    }
  },
  "root": [
    [
      2,
      "./myproject/a.js"
    ],
    [
      3,
      "./myproject/b.ts"
    ]
  ],
  "options": {
    "allowJs": true,
    "outFile": "./out.js"
  },
  "pendingEmit": [
    "Js",
    false
  ],
  "version": "FakeTSVersion",
  "size": 766
}



Program root files: [
  "/user/username/projects/myproject/a.js",
  "/user/username/projects/myproject/b.ts"
]
Program options: {
  "allowJs": true,
  "noEmit": true,
  "outFile": "/user/username/projects/out.js",
  "watch": true,
  "incremental": true,
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/a.js
/user/username/projects/myproject/b.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/user/username/projects/myproject/a.js
/user/username/projects/myproject/b.ts

No shapes updated in the builder::

exitCode:: ExitStatus.undefined
