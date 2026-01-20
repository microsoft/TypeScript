currentDirectory:: /user/username/projects/myproject useCaseSensitiveFileNames:: false
Input::
//// [/user/username/projects/myproject/tsconfig.json]
{
  "compilerOptions": {
    "composite": true,
    "noEmitOnError": true,
    "outFile": "../outFile.js",
    "module": "amd"
  }
}

//// [/user/username/projects/myproject/main.ts]
export const x: string = 10;

//// [/user/username/projects/myproject/other.ts]
export const y = 10;

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


tsc --w
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] Starting compilation in watch mode...

[96mmain.ts[0m:[93m1[0m:[93m14[0m - [91merror[0m[90m TS2322: [0mType 'number' is not assignable to type 'string'.

[7m1[0m export const x: string = 10;
[7m [0m [91m             ~[0m

[96mtsconfig.json[0m:[93m5[0m:[93m5[0m - [91merror[0m[90m TS5101: [0mOption 'outFile' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.

[7m5[0m     "outFile": "../outFile.js",
[7m [0m [91m    ~~~~~~~~~[0m

[96mtsconfig.json[0m:[93m6[0m:[93m15[0m - [91merror[0m[90m TS5107: [0mOption 'module=AMD' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.

[7m6[0m     "module": "amd"
[7m [0m [91m              ~~~~~[0m

[[90mHH:MM:SS AM[0m] Found 3 errors. Watching for file changes.



//// [/user/username/projects/outFile.tsbuildinfo]
{"fileNames":["../../../home/src/tslibs/ts/lib/lib.d.ts","./myproject/main.ts","./myproject/other.ts"],"fileInfos":["-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-8089124208-export const x: string = 10;","-13729955264-export const y = 10;"],"root":[2,3],"options":{"composite":true,"module":2,"noEmitOnError":true,"outFile":"./outFile.js"},"semanticDiagnosticsPerFile":[[2,[{"start":13,"length":1,"code":2322,"category":1,"messageText":"Type 'number' is not assignable to type 'string'."}]]],"pendingEmit":false,"version":"FakeTSVersion"}

//// [/user/username/projects/outFile.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../home/src/tslibs/ts/lib/lib.d.ts",
    "./myproject/main.ts",
    "./myproject/other.ts"
  ],
  "fileInfos": {
    "../../../home/src/tslibs/ts/lib/lib.d.ts": "-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
    "./myproject/main.ts": "-8089124208-export const x: string = 10;",
    "./myproject/other.ts": "-13729955264-export const y = 10;"
  },
  "root": [
    [
      2,
      "./myproject/main.ts"
    ],
    [
      3,
      "./myproject/other.ts"
    ]
  ],
  "options": {
    "composite": true,
    "module": 2,
    "noEmitOnError": true,
    "outFile": "./outFile.js"
  },
  "semanticDiagnosticsPerFile": [
    [
      "./myproject/main.ts",
      [
        {
          "start": 13,
          "length": 1,
          "code": 2322,
          "category": 1,
          "messageText": "Type 'number' is not assignable to type 'string'."
        }
      ]
    ]
  ],
  "pendingEmit": [
    "Js | Dts",
    false
  ],
  "version": "FakeTSVersion",
  "size": 894
}


PolledWatches::
/user/username/projects/myproject/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts: *new*
  {}
/user/username/projects/myproject/main.ts: *new*
  {}
/user/username/projects/myproject/other.ts: *new*
  {}
/user/username/projects/myproject/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/user/username/projects/myproject: *new*
  {}

Program root files: [
  "/user/username/projects/myproject/main.ts",
  "/user/username/projects/myproject/other.ts"
]
Program options: {
  "composite": true,
  "noEmitOnError": true,
  "outFile": "/user/username/projects/outFile.js",
  "module": 2,
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/main.ts
/user/username/projects/myproject/other.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/main.ts
/user/username/projects/myproject/other.ts

No shapes updated in the builder::

exitCode:: ExitStatus.undefined

Checking if output is same as EmitAndSemanticDiagnosticsBuilderProgram::
Output file text for /user/username/projects/myproject/main.js is same:: true
Output file text for /user/username/projects/myproject/main.d.ts is same:: true
Output file text for /user/username/projects/myproject/other.js is same:: true
Output file text for /user/username/projects/myproject/other.d.ts is same:: true
Output file text for /user/username/projects/myproject/tsconfig.tsbuildinfo is same:: true

Change:: Add comment

Input::
//// [/user/username/projects/myproject/main.ts]
export const x: string = 10;
// SomeComment


PolledWatches *deleted*::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/node_modules/@types:
  {"pollingInterval":500}

FsWatches *deleted*::
/home/src/tslibs/TS/Lib/lib.d.ts:
  {}
/user/username/projects/myproject/main.ts:
  {}
/user/username/projects/myproject/other.ts:
  {}
/user/username/projects/myproject/tsconfig.json:
  {}

FsWatchesRecursive *deleted*::
/user/username/projects/myproject:
  {}

tsc --w
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] Starting compilation in watch mode...

[96mmain.ts[0m:[93m1[0m:[93m14[0m - [91merror[0m[90m TS2322: [0mType 'number' is not assignable to type 'string'.

[7m1[0m export const x: string = 10;
[7m [0m [91m             ~[0m

[96mtsconfig.json[0m:[93m5[0m:[93m5[0m - [91merror[0m[90m TS5101: [0mOption 'outFile' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.

[7m5[0m     "outFile": "../outFile.js",
[7m [0m [91m    ~~~~~~~~~[0m

[96mtsconfig.json[0m:[93m6[0m:[93m15[0m - [91merror[0m[90m TS5107: [0mOption 'module=AMD' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.

[7m6[0m     "module": "amd"
[7m [0m [91m              ~~~~~[0m

[[90mHH:MM:SS AM[0m] Found 3 errors. Watching for file changes.



//// [/user/username/projects/outFile.tsbuildinfo]
{"fileNames":["../../../home/src/tslibs/ts/lib/lib.d.ts","./myproject/main.ts","./myproject/other.ts"],"fileInfos":["-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-5691975201-export const x: string = 10;\n// SomeComment","-13729955264-export const y = 10;"],"root":[2,3],"options":{"composite":true,"module":2,"noEmitOnError":true,"outFile":"./outFile.js"},"semanticDiagnosticsPerFile":[[2,[{"start":13,"length":1,"code":2322,"category":1,"messageText":"Type 'number' is not assignable to type 'string'."}]]],"pendingEmit":false,"version":"FakeTSVersion"}

//// [/user/username/projects/outFile.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../home/src/tslibs/ts/lib/lib.d.ts",
    "./myproject/main.ts",
    "./myproject/other.ts"
  ],
  "fileInfos": {
    "../../../home/src/tslibs/ts/lib/lib.d.ts": "-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
    "./myproject/main.ts": "-5691975201-export const x: string = 10;\n// SomeComment",
    "./myproject/other.ts": "-13729955264-export const y = 10;"
  },
  "root": [
    [
      2,
      "./myproject/main.ts"
    ],
    [
      3,
      "./myproject/other.ts"
    ]
  ],
  "options": {
    "composite": true,
    "module": 2,
    "noEmitOnError": true,
    "outFile": "./outFile.js"
  },
  "semanticDiagnosticsPerFile": [
    [
      "./myproject/main.ts",
      [
        {
          "start": 13,
          "length": 1,
          "code": 2322,
          "category": 1,
          "messageText": "Type 'number' is not assignable to type 'string'."
        }
      ]
    ]
  ],
  "pendingEmit": [
    "Js | Dts",
    false
  ],
  "version": "FakeTSVersion",
  "size": 910
}


PolledWatches::
/user/username/projects/myproject/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts: *new*
  {}
/user/username/projects/myproject/main.ts: *new*
  {}
/user/username/projects/myproject/other.ts: *new*
  {}
/user/username/projects/myproject/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/user/username/projects/myproject: *new*
  {}

Program root files: [
  "/user/username/projects/myproject/main.ts",
  "/user/username/projects/myproject/other.ts"
]
Program options: {
  "composite": true,
  "noEmitOnError": true,
  "outFile": "/user/username/projects/outFile.js",
  "module": 2,
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/main.ts
/user/username/projects/myproject/other.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/main.ts
/user/username/projects/myproject/other.ts

No shapes updated in the builder::

exitCode:: ExitStatus.undefined

Checking if output is same as EmitAndSemanticDiagnosticsBuilderProgram::
Output file text for /user/username/projects/myproject/main.js is same:: true
Output file text for /user/username/projects/myproject/main.d.ts is same:: true
Output file text for /user/username/projects/myproject/other.js is same:: true
Output file text for /user/username/projects/myproject/other.d.ts is same:: true
Output file text for /user/username/projects/myproject/tsconfig.tsbuildinfo is same:: true

Change:: Fix error

Input::
//// [/user/username/projects/myproject/main.ts]
export const x = 10;


PolledWatches *deleted*::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/node_modules/@types:
  {"pollingInterval":500}

FsWatches *deleted*::
/home/src/tslibs/TS/Lib/lib.d.ts:
  {}
/user/username/projects/myproject/main.ts:
  {}
/user/username/projects/myproject/other.ts:
  {}
/user/username/projects/myproject/tsconfig.json:
  {}

FsWatchesRecursive *deleted*::
/user/username/projects/myproject:
  {}

tsc --w
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] Starting compilation in watch mode...

[96mtsconfig.json[0m:[93m5[0m:[93m5[0m - [91merror[0m[90m TS5101: [0mOption 'outFile' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.

[7m5[0m     "outFile": "../outFile.js",
[7m [0m [91m    ~~~~~~~~~[0m

[96mtsconfig.json[0m:[93m6[0m:[93m15[0m - [91merror[0m[90m TS5107: [0mOption 'module=AMD' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.

[7m6[0m     "module": "amd"
[7m [0m [91m              ~~~~~[0m

[[90mHH:MM:SS AM[0m] Found 2 errors. Watching for file changes.



//// [/user/username/projects/outFile.tsbuildinfo]
{"fileNames":["../../../home/src/tslibs/ts/lib/lib.d.ts","./myproject/main.ts","./myproject/other.ts"],"fileInfos":["-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-10726455937-export const x = 10;","-13729955264-export const y = 10;"],"root":[2,3],"options":{"composite":true,"module":2,"noEmitOnError":true,"outFile":"./outFile.js"},"pendingEmit":false,"errors":true,"version":"FakeTSVersion"}

//// [/user/username/projects/outFile.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../home/src/tslibs/ts/lib/lib.d.ts",
    "./myproject/main.ts",
    "./myproject/other.ts"
  ],
  "fileInfos": {
    "../../../home/src/tslibs/ts/lib/lib.d.ts": "-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
    "./myproject/main.ts": "-10726455937-export const x = 10;",
    "./myproject/other.ts": "-13729955264-export const y = 10;"
  },
  "root": [
    [
      2,
      "./myproject/main.ts"
    ],
    [
      3,
      "./myproject/other.ts"
    ]
  ],
  "options": {
    "composite": true,
    "module": 2,
    "noEmitOnError": true,
    "outFile": "./outFile.js"
  },
  "pendingEmit": [
    "Js | Dts",
    false
  ],
  "errors": true,
  "version": "FakeTSVersion",
  "size": 749
}


PolledWatches::
/user/username/projects/myproject/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts: *new*
  {}
/user/username/projects/myproject/main.ts: *new*
  {}
/user/username/projects/myproject/other.ts: *new*
  {}
/user/username/projects/myproject/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/user/username/projects/myproject: *new*
  {}

Program root files: [
  "/user/username/projects/myproject/main.ts",
  "/user/username/projects/myproject/other.ts"
]
Program options: {
  "composite": true,
  "noEmitOnError": true,
  "outFile": "/user/username/projects/outFile.js",
  "module": 2,
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/main.ts
/user/username/projects/myproject/other.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/main.ts
/user/username/projects/myproject/other.ts

No shapes updated in the builder::

exitCode:: ExitStatus.undefined

Checking if output is same as EmitAndSemanticDiagnosticsBuilderProgram::
Output file text for /user/username/projects/myproject/main.js is same:: true
Output file text for /user/username/projects/myproject/main.d.ts is same:: true
Output file text for /user/username/projects/myproject/other.js is same:: true
Output file text for /user/username/projects/myproject/other.d.ts is same:: true
Output file text for /user/username/projects/myproject/tsconfig.tsbuildinfo is same:: true
