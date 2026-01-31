currentDirectory:: /user/username/projects/myproject useCaseSensitiveFileNames:: false
Input::
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

//// [/home/src/tslibs/TS/Lib/lib.d.ts]
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


/home/src/tslibs/TS/Lib/tsc.js -b -w -verbose --incremental
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] Starting compilation in watch mode...

[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because output file '../out.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project '/user/username/projects/myproject/tsconfig.json'...

[96mtsconfig.json[0m:[93m5[0m:[93m5[0m - [91merror[0m[90m TS5101: [0mOption 'outFile' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.

[7m5[0m     "outFile": "../out.js"
[7m [0m [91m    ~~~~~~~~~[0m

[[90mHH:MM:SS AM[0m] Found 1 error. Watching for file changes.



//// [/user/username/projects/out.tsbuildinfo]
{"fileNames":["../../../home/src/tslibs/ts/lib/lib.d.ts","./myproject/a.js","./myproject/b.ts"],"fileInfos":["-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","5381-","5381-"],"root":[2,3],"options":{"allowJs":true,"outFile":"./out.js"},"changeFileSet":[1,2,3],"version":"FakeTSVersion"}

//// [/user/username/projects/out.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../home/src/tslibs/ts/lib/lib.d.ts",
    "./myproject/a.js",
    "./myproject/b.ts"
  ],
  "fileInfos": {
    "../../../home/src/tslibs/ts/lib/lib.d.ts": "-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
    "./myproject/a.js": "5381-",
    "./myproject/b.ts": "5381-"
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
  "changeFileSet": [
    "../../../home/src/tslibs/ts/lib/lib.d.ts",
    "./myproject/a.js",
    "./myproject/b.ts"
  ],
  "version": "FakeTSVersion",
  "size": 638
}


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
  "tscBuild": true,
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/a.js
/user/username/projects/myproject/b.ts

No cached semantic diagnostics in the builder::

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

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because buildinfo file '../out.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project '/user/username/projects/myproject/tsconfig.json'...

[96mtsconfig.json[0m:[93m5[0m:[93m5[0m - [91merror[0m[90m TS5101: [0mOption 'outFile' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.

[7m5[0m     "outFile": "../out.js"
[7m [0m [91m    ~~~~~~~~~[0m

[[90mHH:MM:SS AM[0m] Found 1 error. Watching for file changes.





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
  "tscBuild": true,
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/a.js
/user/username/projects/myproject/b.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::

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

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because buildinfo file '../out.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project '/user/username/projects/myproject/tsconfig.json'...

[96mtsconfig.json[0m:[93m5[0m:[93m5[0m - [91merror[0m[90m TS5101: [0mOption 'outFile' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.

[7m5[0m     "outFile": "../out.js"
[7m [0m [91m    ~~~~~~~~~[0m

[[90mHH:MM:SS AM[0m] Found 1 error. Watching for file changes.



//// [/user/username/projects/out.tsbuildinfo]
{"fileNames":["../../../home/src/tslibs/ts/lib/lib.d.ts","./myproject/a.js","./myproject/b.ts"],"fileInfos":["-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","5029505981-const x = 10;","5381-"],"root":[2,3],"options":{"allowJs":true,"outFile":"./out.js"},"changeFileSet":[1,2,3],"version":"FakeTSVersion"}

//// [/user/username/projects/out.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../home/src/tslibs/ts/lib/lib.d.ts",
    "./myproject/a.js",
    "./myproject/b.ts"
  ],
  "fileInfos": {
    "../../../home/src/tslibs/ts/lib/lib.d.ts": "-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
    "./myproject/a.js": "5029505981-const x = 10;",
    "./myproject/b.ts": "5381-"
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
  "changeFileSet": [
    "../../../home/src/tslibs/ts/lib/lib.d.ts",
    "./myproject/a.js",
    "./myproject/b.ts"
  ],
  "version": "FakeTSVersion",
  "size": 657
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
  "tscBuild": true,
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/a.js
/user/username/projects/myproject/b.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::

exitCode:: ExitStatus.undefined
