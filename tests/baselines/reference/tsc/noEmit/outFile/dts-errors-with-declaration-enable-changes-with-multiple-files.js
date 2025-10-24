currentDirectory:: /home/src/projects/project useCaseSensitiveFileNames:: false
Input::
//// [/home/src/projects/project/a.ts]
export const a = class { private p = 10; };

//// [/home/src/projects/project/b.ts]
export const b = 10;

//// [/home/src/projects/project/c.ts]
export const c = class { private p = 10; };

//// [/home/src/projects/project/d.ts]
export const d = class { private p = 10; };

//// [/home/src/projects/project/tsconfig.json]
{
  "compilerOptions": {
    "outFile": "../outFile.js",
    "module": "amd",
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


/home/src/tslibs/TS/Lib/tsc.js -p . --noEmit
Output::
[96mtsconfig.json[0m:[93m4[0m:[93m15[0m - [91merror[0m[90m TS5107: [0mOption 'module=AMD' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.

[7m4[0m     "module": "amd",
[7m [0m [91m              ~~~~~[0m


Found 1 error in tsconfig.json[90m:4[0m



//// [/home/src/projects/outFile.tsbuildinfo]
<<<<<<< HEAD
{"fileNames":["../tslibs/ts/lib/lib.d.ts","./project/a.ts","./project/b.ts","./project/c.ts","./project/d.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-9502176711-export const a = class { private p = 10; };","-13368947479-export const b = 10;","-17233149573-export const c = class { private p = 10; };","2523684124-export const d = class { private p = 10; };"],"root":[[2,5]],"options":{"module":2,"outFile":"./outFile.js"},"pendingEmit":false,"version":"FakeTSVersion"}
||||||| parent of 42f6576e83 (Deprecate `--module amd`, `umd`, `system`, `none`; `--moduleResolution classic`; change defaults (#62669))
{"fileNames":["../tslibs/ts/lib/lib.d.ts","./project/a.ts","./project/b.ts","./project/c.ts","./project/d.ts"],"fileInfos":["-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-9502176711-export const a = class { private p = 10; };","-13368947479-export const b = 10;","-17233149573-export const c = class { private p = 10; };","2523684124-export const d = class { private p = 10; };"],"root":[[2,5]],"options":{"module":2,"outFile":"./outFile.js"},"pendingEmit":false,"version":"FakeTSVersion"}
=======
{"fileNames":["../tslibs/ts/lib/lib.d.ts","./project/a.ts","./project/b.ts","./project/c.ts","./project/d.ts"],"fileInfos":["-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-9502176711-export const a = class { private p = 10; };","-13368947479-export const b = 10;","-17233149573-export const c = class { private p = 10; };","2523684124-export const d = class { private p = 10; };"],"root":[[2,5]],"options":{"module":2,"outFile":"./outFile.js"},"changeFileSet":[2,3,4,5,1],"version":"FakeTSVersion"}
>>>>>>> 42f6576e83 (Deprecate `--module amd`, `umd`, `system`, `none`; `--moduleResolution classic`; change defaults (#62669))

//// [/home/src/projects/outFile.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../tslibs/ts/lib/lib.d.ts",
    "./project/a.ts",
    "./project/b.ts",
    "./project/c.ts",
    "./project/d.ts"
  ],
  "fileInfos": {
    "../tslibs/ts/lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
    "./project/a.ts": "-9502176711-export const a = class { private p = 10; };",
    "./project/b.ts": "-13368947479-export const b = 10;",
    "./project/c.ts": "-17233149573-export const c = class { private p = 10; };",
    "./project/d.ts": "2523684124-export const d = class { private p = 10; };"
  },
  "root": [
    [
      [
        2,
        5
      ],
      [
        "./project/a.ts",
        "./project/b.ts",
        "./project/c.ts",
        "./project/d.ts"
      ]
    ]
  ],
  "options": {
    "module": 2,
    "outFile": "./outFile.js"
  },
  "changeFileSet": [
    "./project/a.ts",
    "./project/b.ts",
    "./project/c.ts",
    "./project/d.ts",
    "../tslibs/ts/lib/lib.d.ts"
  ],
  "version": "FakeTSVersion",
<<<<<<< HEAD
  "size": 885
||||||| parent of 42f6576e83 (Deprecate `--module amd`, `umd`, `system`, `none`; `--moduleResolution classic`; change defaults (#62669))
  "size": 845
=======
  "size": 853
>>>>>>> 42f6576e83 (Deprecate `--module amd`, `umd`, `system`, `none`; `--moduleResolution classic`; change defaults (#62669))
}


Program root files: [
  "/home/src/projects/project/a.ts",
  "/home/src/projects/project/b.ts",
  "/home/src/projects/project/c.ts",
  "/home/src/projects/project/d.ts"
]
Program options: {
  "outFile": "/home/src/projects/outFile.js",
  "module": 2,
  "incremental": true,
  "project": "/home/src/projects/project",
  "noEmit": true,
  "configFilePath": "/home/src/projects/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/projects/project/a.ts
/home/src/projects/project/b.ts
/home/src/projects/project/c.ts
/home/src/projects/project/d.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated

Change:: no-change-run

Input::

/home/src/tslibs/TS/Lib/tsc.js -p . --noEmit
Output::
[96mtsconfig.json[0m:[93m4[0m:[93m15[0m - [91merror[0m[90m TS5107: [0mOption 'module=AMD' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.

[7m4[0m     "module": "amd",
[7m [0m [91m              ~~~~~[0m


Found 1 error in tsconfig.json[90m:4[0m




Program root files: [
  "/home/src/projects/project/a.ts",
  "/home/src/projects/project/b.ts",
  "/home/src/projects/project/c.ts",
  "/home/src/projects/project/d.ts"
]
Program options: {
  "outFile": "/home/src/projects/outFile.js",
  "module": 2,
  "incremental": true,
  "project": "/home/src/projects/project",
  "noEmit": true,
  "configFilePath": "/home/src/projects/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/projects/project/a.ts
/home/src/projects/project/b.ts
/home/src/projects/project/c.ts
/home/src/projects/project/d.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped

Change:: With declaration enabled noEmit - Should report errors

Input::

/home/src/tslibs/TS/Lib/tsc.js -p . --noEmit --declaration
Output::
[96mtsconfig.json[0m:[93m4[0m:[93m15[0m - [91merror[0m[90m TS5107: [0mOption 'module=AMD' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.

[7m4[0m     "module": "amd",
[7m [0m [91m              ~~~~~[0m


Found 1 error in tsconfig.json[90m:4[0m



//// [/home/src/projects/outFile.tsbuildinfo]
<<<<<<< HEAD
{"fileNames":["../tslibs/ts/lib/lib.d.ts","./project/a.ts","./project/b.ts","./project/c.ts","./project/d.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-9502176711-export const a = class { private p = 10; };","-13368947479-export const b = 10;","-17233149573-export const c = class { private p = 10; };","2523684124-export const d = class { private p = 10; };"],"root":[[2,5]],"options":{"declaration":true,"module":2,"outFile":"./outFile.js"},"emitDiagnosticsPerFile":[[2,[{"start":13,"length":1,"messageText":"Property 'p' of exported anonymous class type may not be private or protected.","category":1,"code":4094,"relatedInformation":[{"start":13,"length":1,"messageText":"Add a type annotation to the variable a.","category":1,"code":9027}]}]],[4,[{"start":13,"length":1,"messageText":"Property 'p' of exported anonymous class type may not be private or protected.","category":1,"code":4094,"relatedInformation":[{"start":13,"length":1,"messageText":"Add a type annotation to the variable c.","category":1,"code":9027}]}]],[5,[{"start":13,"length":1,"messageText":"Property 'p' of exported anonymous class type may not be private or protected.","category":1,"code":4094,"relatedInformation":[{"start":13,"length":1,"messageText":"Add a type annotation to the variable d.","category":1,"code":9027}]}]]],"pendingEmit":17,"version":"FakeTSVersion"}
||||||| parent of 42f6576e83 (Deprecate `--module amd`, `umd`, `system`, `none`; `--moduleResolution classic`; change defaults (#62669))
{"fileNames":["../tslibs/ts/lib/lib.d.ts","./project/a.ts","./project/b.ts","./project/c.ts","./project/d.ts"],"fileInfos":["-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-9502176711-export const a = class { private p = 10; };","-13368947479-export const b = 10;","-17233149573-export const c = class { private p = 10; };","2523684124-export const d = class { private p = 10; };"],"root":[[2,5]],"options":{"declaration":true,"module":2,"outFile":"./outFile.js"},"emitDiagnosticsPerFile":[[2,[{"start":13,"length":1,"messageText":"Property 'p' of exported anonymous class type may not be private or protected.","category":1,"code":4094,"relatedInformation":[{"start":13,"length":1,"messageText":"Add a type annotation to the variable a.","category":1,"code":9027}]}]],[4,[{"start":13,"length":1,"messageText":"Property 'p' of exported anonymous class type may not be private or protected.","category":1,"code":4094,"relatedInformation":[{"start":13,"length":1,"messageText":"Add a type annotation to the variable c.","category":1,"code":9027}]}]],[5,[{"start":13,"length":1,"messageText":"Property 'p' of exported anonymous class type may not be private or protected.","category":1,"code":4094,"relatedInformation":[{"start":13,"length":1,"messageText":"Add a type annotation to the variable d.","category":1,"code":9027}]}]]],"pendingEmit":17,"version":"FakeTSVersion"}
=======
{"fileNames":["../tslibs/ts/lib/lib.d.ts","./project/a.ts","./project/b.ts","./project/c.ts","./project/d.ts"],"fileInfos":["-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-9502176711-export const a = class { private p = 10; };","-13368947479-export const b = 10;","-17233149573-export const c = class { private p = 10; };","2523684124-export const d = class { private p = 10; };"],"root":[[2,5]],"options":{"declaration":true,"module":2,"outFile":"./outFile.js"},"changeFileSet":[2,3,4,5,1],"version":"FakeTSVersion"}
>>>>>>> 42f6576e83 (Deprecate `--module amd`, `umd`, `system`, `none`; `--moduleResolution classic`; change defaults (#62669))

//// [/home/src/projects/outFile.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../tslibs/ts/lib/lib.d.ts",
    "./project/a.ts",
    "./project/b.ts",
    "./project/c.ts",
    "./project/d.ts"
  ],
  "fileInfos": {
    "../tslibs/ts/lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
    "./project/a.ts": "-9502176711-export const a = class { private p = 10; };",
    "./project/b.ts": "-13368947479-export const b = 10;",
    "./project/c.ts": "-17233149573-export const c = class { private p = 10; };",
    "./project/d.ts": "2523684124-export const d = class { private p = 10; };"
  },
  "root": [
    [
      [
        2,
        5
      ],
      [
        "./project/a.ts",
        "./project/b.ts",
        "./project/c.ts",
        "./project/d.ts"
      ]
    ]
  ],
  "options": {
    "declaration": true,
    "module": 2,
    "outFile": "./outFile.js"
  },
  "changeFileSet": [
    "./project/a.ts",
    "./project/b.ts",
    "./project/c.ts",
    "./project/d.ts",
    "../tslibs/ts/lib/lib.d.ts"
  ],
  "version": "FakeTSVersion",
<<<<<<< HEAD
  "size": 1765
||||||| parent of 42f6576e83 (Deprecate `--module amd`, `umd`, `system`, `none`; `--moduleResolution classic`; change defaults (#62669))
  "size": 1725
=======
  "size": 872
>>>>>>> 42f6576e83 (Deprecate `--module amd`, `umd`, `system`, `none`; `--moduleResolution classic`; change defaults (#62669))
}


Program root files: [
  "/home/src/projects/project/a.ts",
  "/home/src/projects/project/b.ts",
  "/home/src/projects/project/c.ts",
  "/home/src/projects/project/d.ts"
]
Program options: {
  "outFile": "/home/src/projects/outFile.js",
  "module": 2,
  "incremental": true,
  "project": "/home/src/projects/project",
  "noEmit": true,
  "declaration": true,
  "configFilePath": "/home/src/projects/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/projects/project/a.ts
/home/src/projects/project/b.ts
/home/src/projects/project/c.ts
/home/src/projects/project/d.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated

Change:: With declaration and declarationMap noEmit - Should report errors

Input::

/home/src/tslibs/TS/Lib/tsc.js -p . --noEmit --declaration --declarationMap
Output::
[96mtsconfig.json[0m:[93m4[0m:[93m15[0m - [91merror[0m[90m TS5107: [0mOption 'module=AMD' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.

[7m4[0m     "module": "amd",
[7m [0m [91m              ~~~~~[0m


Found 1 error in tsconfig.json[90m:4[0m



//// [/home/src/projects/outFile.tsbuildinfo]
<<<<<<< HEAD
{"fileNames":["../tslibs/ts/lib/lib.d.ts","./project/a.ts","./project/b.ts","./project/c.ts","./project/d.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-9502176711-export const a = class { private p = 10; };","-13368947479-export const b = 10;","-17233149573-export const c = class { private p = 10; };","2523684124-export const d = class { private p = 10; };"],"root":[[2,5]],"options":{"declaration":true,"declarationMap":true,"module":2,"outFile":"./outFile.js"},"emitDiagnosticsPerFile":[[2,[{"start":13,"length":1,"messageText":"Property 'p' of exported anonymous class type may not be private or protected.","category":1,"code":4094,"relatedInformation":[{"start":13,"length":1,"messageText":"Add a type annotation to the variable a.","category":1,"code":9027}]}]],[4,[{"start":13,"length":1,"messageText":"Property 'p' of exported anonymous class type may not be private or protected.","category":1,"code":4094,"relatedInformation":[{"start":13,"length":1,"messageText":"Add a type annotation to the variable c.","category":1,"code":9027}]}]],[5,[{"start":13,"length":1,"messageText":"Property 'p' of exported anonymous class type may not be private or protected.","category":1,"code":4094,"relatedInformation":[{"start":13,"length":1,"messageText":"Add a type annotation to the variable d.","category":1,"code":9027}]}]]],"pendingEmit":49,"version":"FakeTSVersion"}
||||||| parent of 42f6576e83 (Deprecate `--module amd`, `umd`, `system`, `none`; `--moduleResolution classic`; change defaults (#62669))
{"fileNames":["../tslibs/ts/lib/lib.d.ts","./project/a.ts","./project/b.ts","./project/c.ts","./project/d.ts"],"fileInfos":["-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-9502176711-export const a = class { private p = 10; };","-13368947479-export const b = 10;","-17233149573-export const c = class { private p = 10; };","2523684124-export const d = class { private p = 10; };"],"root":[[2,5]],"options":{"declaration":true,"declarationMap":true,"module":2,"outFile":"./outFile.js"},"emitDiagnosticsPerFile":[[2,[{"start":13,"length":1,"messageText":"Property 'p' of exported anonymous class type may not be private or protected.","category":1,"code":4094,"relatedInformation":[{"start":13,"length":1,"messageText":"Add a type annotation to the variable a.","category":1,"code":9027}]}]],[4,[{"start":13,"length":1,"messageText":"Property 'p' of exported anonymous class type may not be private or protected.","category":1,"code":4094,"relatedInformation":[{"start":13,"length":1,"messageText":"Add a type annotation to the variable c.","category":1,"code":9027}]}]],[5,[{"start":13,"length":1,"messageText":"Property 'p' of exported anonymous class type may not be private or protected.","category":1,"code":4094,"relatedInformation":[{"start":13,"length":1,"messageText":"Add a type annotation to the variable d.","category":1,"code":9027}]}]]],"pendingEmit":49,"version":"FakeTSVersion"}
=======
{"fileNames":["../tslibs/ts/lib/lib.d.ts","./project/a.ts","./project/b.ts","./project/c.ts","./project/d.ts"],"fileInfos":["-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-9502176711-export const a = class { private p = 10; };","-13368947479-export const b = 10;","-17233149573-export const c = class { private p = 10; };","2523684124-export const d = class { private p = 10; };"],"root":[[2,5]],"options":{"declaration":true,"declarationMap":true,"module":2,"outFile":"./outFile.js"},"changeFileSet":[2,3,4,5,1],"version":"FakeTSVersion"}
>>>>>>> 42f6576e83 (Deprecate `--module amd`, `umd`, `system`, `none`; `--moduleResolution classic`; change defaults (#62669))

//// [/home/src/projects/outFile.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../tslibs/ts/lib/lib.d.ts",
    "./project/a.ts",
    "./project/b.ts",
    "./project/c.ts",
    "./project/d.ts"
  ],
  "fileInfos": {
    "../tslibs/ts/lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
    "./project/a.ts": "-9502176711-export const a = class { private p = 10; };",
    "./project/b.ts": "-13368947479-export const b = 10;",
    "./project/c.ts": "-17233149573-export const c = class { private p = 10; };",
    "./project/d.ts": "2523684124-export const d = class { private p = 10; };"
  },
  "root": [
    [
      [
        2,
        5
      ],
      [
        "./project/a.ts",
        "./project/b.ts",
        "./project/c.ts",
        "./project/d.ts"
      ]
    ]
  ],
  "options": {
    "declaration": true,
    "declarationMap": true,
    "module": 2,
    "outFile": "./outFile.js"
  },
  "changeFileSet": [
    "./project/a.ts",
    "./project/b.ts",
    "./project/c.ts",
    "./project/d.ts",
    "../tslibs/ts/lib/lib.d.ts"
  ],
  "version": "FakeTSVersion",
<<<<<<< HEAD
  "size": 1787
||||||| parent of 42f6576e83 (Deprecate `--module amd`, `umd`, `system`, `none`; `--moduleResolution classic`; change defaults (#62669))
  "size": 1747
=======
  "size": 894
>>>>>>> 42f6576e83 (Deprecate `--module amd`, `umd`, `system`, `none`; `--moduleResolution classic`; change defaults (#62669))
}


Program root files: [
  "/home/src/projects/project/a.ts",
  "/home/src/projects/project/b.ts",
  "/home/src/projects/project/c.ts",
  "/home/src/projects/project/d.ts"
]
Program options: {
  "outFile": "/home/src/projects/outFile.js",
  "module": 2,
  "incremental": true,
  "project": "/home/src/projects/project",
  "noEmit": true,
  "declaration": true,
  "declarationMap": true,
  "configFilePath": "/home/src/projects/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/projects/project/a.ts
/home/src/projects/project/b.ts
/home/src/projects/project/c.ts
/home/src/projects/project/d.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated

Change:: no-change-run

Input::

/home/src/tslibs/TS/Lib/tsc.js -p . --noEmit
Output::
[96mtsconfig.json[0m:[93m4[0m:[93m15[0m - [91merror[0m[90m TS5107: [0mOption 'module=AMD' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.

[7m4[0m     "module": "amd",
[7m [0m [91m              ~~~~~[0m


Found 1 error in tsconfig.json[90m:4[0m




Program root files: [
  "/home/src/projects/project/a.ts",
  "/home/src/projects/project/b.ts",
  "/home/src/projects/project/c.ts",
  "/home/src/projects/project/d.ts"
]
Program options: {
  "outFile": "/home/src/projects/outFile.js",
  "module": 2,
  "incremental": true,
  "project": "/home/src/projects/project",
  "noEmit": true,
  "configFilePath": "/home/src/projects/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/projects/project/a.ts
/home/src/projects/project/b.ts
/home/src/projects/project/c.ts
/home/src/projects/project/d.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped

Change:: Dts Emit with error

Input::

/home/src/tslibs/TS/Lib/tsc.js -p . --declaration
Output::
[96ma.ts[0m:[93m1[0m:[93m14[0m - [91merror[0m[90m TS4094: [0mProperty 'p' of exported anonymous class type may not be private or protected.

[7m1[0m export const a = class { private p = 10; };
[7m [0m [91m             ~[0m

  [96ma.ts[0m:[93m1[0m:[93m14[0m
    [7m1[0m export const a = class { private p = 10; };
    [7m [0m [96m             ~[0m
    Add a type annotation to the variable a.

[96mc.ts[0m:[93m1[0m:[93m14[0m - [91merror[0m[90m TS4094: [0mProperty 'p' of exported anonymous class type may not be private or protected.

[7m1[0m export const c = class { private p = 10; };
[7m [0m [91m             ~[0m

  [96mc.ts[0m:[93m1[0m:[93m14[0m
    [7m1[0m export const c = class { private p = 10; };
    [7m [0m [96m             ~[0m
    Add a type annotation to the variable c.

[96md.ts[0m:[93m1[0m:[93m14[0m - [91merror[0m[90m TS4094: [0mProperty 'p' of exported anonymous class type may not be private or protected.

[7m1[0m export const d = class { private p = 10; };
[7m [0m [91m             ~[0m

  [96md.ts[0m:[93m1[0m:[93m14[0m
    [7m1[0m export const d = class { private p = 10; };
    [7m [0m [96m             ~[0m
    Add a type annotation to the variable d.

[96mtsconfig.json[0m:[93m4[0m:[93m15[0m - [91merror[0m[90m TS5107: [0mOption 'module=AMD' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.

[7m4[0m     "module": "amd",
[7m [0m [91m              ~~~~~[0m


Found 4 errors in 4 files.

Errors  Files
     1  a.ts[90m:1[0m
     1  c.ts[90m:1[0m
     1  d.ts[90m:1[0m
     1  tsconfig.json[90m:4[0m


//// [/home/src/projects/outFile.tsbuildinfo]
<<<<<<< HEAD
{"fileNames":["../tslibs/ts/lib/lib.d.ts","./project/a.ts","./project/b.ts","./project/c.ts","./project/d.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-9502176711-export const a = class { private p = 10; };","-13368947479-export const b = 10;","-17233149573-export const c = class { private p = 10; };","2523684124-export const d = class { private p = 10; };"],"root":[[2,5]],"options":{"declaration":true,"module":2,"outFile":"./outFile.js"},"emitDiagnosticsPerFile":[[2,[{"start":13,"length":1,"messageText":"Property 'p' of exported anonymous class type may not be private or protected.","category":1,"code":4094,"relatedInformation":[{"start":13,"length":1,"messageText":"Add a type annotation to the variable a.","category":1,"code":9027}]}]],[4,[{"start":13,"length":1,"messageText":"Property 'p' of exported anonymous class type may not be private or protected.","category":1,"code":4094,"relatedInformation":[{"start":13,"length":1,"messageText":"Add a type annotation to the variable c.","category":1,"code":9027}]}]],[5,[{"start":13,"length":1,"messageText":"Property 'p' of exported anonymous class type may not be private or protected.","category":1,"code":4094,"relatedInformation":[{"start":13,"length":1,"messageText":"Add a type annotation to the variable d.","category":1,"code":9027}]}]]],"version":"FakeTSVersion"}
||||||| parent of 42f6576e83 (Deprecate `--module amd`, `umd`, `system`, `none`; `--moduleResolution classic`; change defaults (#62669))
{"fileNames":["../tslibs/ts/lib/lib.d.ts","./project/a.ts","./project/b.ts","./project/c.ts","./project/d.ts"],"fileInfos":["-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-9502176711-export const a = class { private p = 10; };","-13368947479-export const b = 10;","-17233149573-export const c = class { private p = 10; };","2523684124-export const d = class { private p = 10; };"],"root":[[2,5]],"options":{"declaration":true,"module":2,"outFile":"./outFile.js"},"emitDiagnosticsPerFile":[[2,[{"start":13,"length":1,"messageText":"Property 'p' of exported anonymous class type may not be private or protected.","category":1,"code":4094,"relatedInformation":[{"start":13,"length":1,"messageText":"Add a type annotation to the variable a.","category":1,"code":9027}]}]],[4,[{"start":13,"length":1,"messageText":"Property 'p' of exported anonymous class type may not be private or protected.","category":1,"code":4094,"relatedInformation":[{"start":13,"length":1,"messageText":"Add a type annotation to the variable c.","category":1,"code":9027}]}]],[5,[{"start":13,"length":1,"messageText":"Property 'p' of exported anonymous class type may not be private or protected.","category":1,"code":4094,"relatedInformation":[{"start":13,"length":1,"messageText":"Add a type annotation to the variable d.","category":1,"code":9027}]}]]],"version":"FakeTSVersion"}
=======
{"fileNames":["../tslibs/ts/lib/lib.d.ts","./project/a.ts","./project/b.ts","./project/c.ts","./project/d.ts"],"fileInfos":["-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-9502176711-export const a = class { private p = 10; };","-13368947479-export const b = 10;","-17233149573-export const c = class { private p = 10; };","2523684124-export const d = class { private p = 10; };"],"root":[[2,5]],"options":{"declaration":true,"module":2,"outFile":"./outFile.js"},"semanticDiagnosticsPerFile":[1,2,3,4,5],"emitDiagnosticsPerFile":[[2,[{"start":13,"length":1,"messageText":"Property 'p' of exported anonymous class type may not be private or protected.","category":1,"code":4094,"relatedInformation":[{"start":13,"length":1,"messageText":"Add a type annotation to the variable a.","category":1,"code":9027}]}]],[4,[{"start":13,"length":1,"messageText":"Property 'p' of exported anonymous class type may not be private or protected.","category":1,"code":4094,"relatedInformation":[{"start":13,"length":1,"messageText":"Add a type annotation to the variable c.","category":1,"code":9027}]}]],[5,[{"start":13,"length":1,"messageText":"Property 'p' of exported anonymous class type may not be private or protected.","category":1,"code":4094,"relatedInformation":[{"start":13,"length":1,"messageText":"Add a type annotation to the variable d.","category":1,"code":9027}]}]]],"version":"FakeTSVersion"}
>>>>>>> 42f6576e83 (Deprecate `--module amd`, `umd`, `system`, `none`; `--moduleResolution classic`; change defaults (#62669))

//// [/home/src/projects/outFile.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../tslibs/ts/lib/lib.d.ts",
    "./project/a.ts",
    "./project/b.ts",
    "./project/c.ts",
    "./project/d.ts"
  ],
  "fileInfos": {
    "../tslibs/ts/lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
    "./project/a.ts": "-9502176711-export const a = class { private p = 10; };",
    "./project/b.ts": "-13368947479-export const b = 10;",
    "./project/c.ts": "-17233149573-export const c = class { private p = 10; };",
    "./project/d.ts": "2523684124-export const d = class { private p = 10; };"
  },
  "root": [
    [
      [
        2,
        5
      ],
      [
        "./project/a.ts",
        "./project/b.ts",
        "./project/c.ts",
        "./project/d.ts"
      ]
    ]
  ],
  "options": {
    "declaration": true,
    "module": 2,
    "outFile": "./outFile.js"
  },
  "semanticDiagnosticsPerFile": [
    [
      "../tslibs/ts/lib/lib.d.ts",
      "not cached or not changed"
    ],
    [
      "./project/a.ts",
      "not cached or not changed"
    ],
    [
      "./project/b.ts",
      "not cached or not changed"
    ],
    [
      "./project/c.ts",
      "not cached or not changed"
    ],
    [
      "./project/d.ts",
      "not cached or not changed"
    ]
  ],
  "emitDiagnosticsPerFile": [
    [
      "./project/a.ts",
      [
        {
          "start": 13,
          "length": 1,
          "messageText": "Property 'p' of exported anonymous class type may not be private or protected.",
          "category": 1,
          "code": 4094,
          "relatedInformation": [
            {
              "start": 13,
              "length": 1,
              "messageText": "Add a type annotation to the variable a.",
              "category": 1,
              "code": 9027
            }
          ]
        }
      ]
    ],
    [
      "./project/c.ts",
      [
        {
          "start": 13,
          "length": 1,
          "messageText": "Property 'p' of exported anonymous class type may not be private or protected.",
          "category": 1,
          "code": 4094,
          "relatedInformation": [
            {
              "start": 13,
              "length": 1,
              "messageText": "Add a type annotation to the variable c.",
              "category": 1,
              "code": 9027
            }
          ]
        }
      ]
    ],
    [
      "./project/d.ts",
      [
        {
          "start": 13,
          "length": 1,
          "messageText": "Property 'p' of exported anonymous class type may not be private or protected.",
          "category": 1,
          "code": 4094,
          "relatedInformation": [
            {
              "start": 13,
              "length": 1,
              "messageText": "Add a type annotation to the variable d.",
              "category": 1,
              "code": 9027
            }
          ]
        }
      ]
    ]
  ],
  "version": "FakeTSVersion",
<<<<<<< HEAD
  "size": 1748
||||||| parent of 42f6576e83 (Deprecate `--module amd`, `umd`, `system`, `none`; `--moduleResolution classic`; change defaults (#62669))
  "size": 1708
=======
  "size": 1749
>>>>>>> 42f6576e83 (Deprecate `--module amd`, `umd`, `system`, `none`; `--moduleResolution classic`; change defaults (#62669))
}

//// [/home/src/projects/outFile.js]
define("a", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.a = void 0;
    const a = class {
        constructor() {
            this.p = 10;
        }
    };
    exports.a = a;
});
define("b", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.b = void 0;
    exports.b = 10;
});
define("c", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.c = void 0;
    const c = class {
        constructor() {
            this.p = 10;
        }
    };
    exports.c = c;
});
define("d", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.d = void 0;
    const d = class {
        constructor() {
            this.p = 10;
        }
    };
    exports.d = d;
});



Program root files: [
  "/home/src/projects/project/a.ts",
  "/home/src/projects/project/b.ts",
  "/home/src/projects/project/c.ts",
  "/home/src/projects/project/d.ts"
]
Program options: {
  "outFile": "/home/src/projects/outFile.js",
  "module": 2,
  "incremental": true,
  "project": "/home/src/projects/project",
  "declaration": true,
  "configFilePath": "/home/src/projects/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/projects/project/a.ts
/home/src/projects/project/b.ts
/home/src/projects/project/c.ts
/home/src/projects/project/d.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped

Change:: Fix the error

Input::
//// [/home/src/projects/project/a.ts]
export const a = class { public p = 10; };


/home/src/tslibs/TS/Lib/tsc.js -p . --noEmit
Output::
[96mtsconfig.json[0m:[93m4[0m:[93m15[0m - [91merror[0m[90m TS5107: [0mOption 'module=AMD' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.

[7m4[0m     "module": "amd",
[7m [0m [91m              ~~~~~[0m


Found 1 error in tsconfig.json[90m:4[0m



//// [/home/src/projects/outFile.tsbuildinfo]
<<<<<<< HEAD
{"fileNames":["../tslibs/ts/lib/lib.d.ts","./project/a.ts","./project/b.ts","./project/c.ts","./project/d.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-9483521475-export const a = class { public p = 10; };","-13368947479-export const b = 10;","-17233149573-export const c = class { private p = 10; };","2523684124-export const d = class { private p = 10; };"],"root":[[2,5]],"options":{"module":2,"outFile":"./outFile.js"},"pendingEmit":false,"version":"FakeTSVersion"}
||||||| parent of 42f6576e83 (Deprecate `--module amd`, `umd`, `system`, `none`; `--moduleResolution classic`; change defaults (#62669))
{"fileNames":["../tslibs/ts/lib/lib.d.ts","./project/a.ts","./project/b.ts","./project/c.ts","./project/d.ts"],"fileInfos":["-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-9483521475-export const a = class { public p = 10; };","-13368947479-export const b = 10;","-17233149573-export const c = class { private p = 10; };","2523684124-export const d = class { private p = 10; };"],"root":[[2,5]],"options":{"module":2,"outFile":"./outFile.js"},"pendingEmit":false,"version":"FakeTSVersion"}
=======
{"fileNames":["../tslibs/ts/lib/lib.d.ts","./project/a.ts","./project/b.ts","./project/c.ts","./project/d.ts"],"fileInfos":["-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-9483521475-export const a = class { public p = 10; };","-13368947479-export const b = 10;","-17233149573-export const c = class { private p = 10; };","2523684124-export const d = class { private p = 10; };"],"root":[[2,5]],"options":{"module":2,"outFile":"./outFile.js"},"changeFileSet":[2],"version":"FakeTSVersion"}
>>>>>>> 42f6576e83 (Deprecate `--module amd`, `umd`, `system`, `none`; `--moduleResolution classic`; change defaults (#62669))

//// [/home/src/projects/outFile.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../tslibs/ts/lib/lib.d.ts",
    "./project/a.ts",
    "./project/b.ts",
    "./project/c.ts",
    "./project/d.ts"
  ],
  "fileInfos": {
    "../tslibs/ts/lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
    "./project/a.ts": "-9483521475-export const a = class { public p = 10; };",
    "./project/b.ts": "-13368947479-export const b = 10;",
    "./project/c.ts": "-17233149573-export const c = class { private p = 10; };",
    "./project/d.ts": "2523684124-export const d = class { private p = 10; };"
  },
  "root": [
    [
      [
        2,
        5
      ],
      [
        "./project/a.ts",
        "./project/b.ts",
        "./project/c.ts",
        "./project/d.ts"
      ]
    ]
  ],
  "options": {
    "module": 2,
    "outFile": "./outFile.js"
  },
  "changeFileSet": [
    "./project/a.ts"
  ],
  "version": "FakeTSVersion",
  "size": 884
}


Program root files: [
  "/home/src/projects/project/a.ts",
  "/home/src/projects/project/b.ts",
  "/home/src/projects/project/c.ts",
  "/home/src/projects/project/d.ts"
]
Program options: {
  "outFile": "/home/src/projects/outFile.js",
  "module": 2,
  "incremental": true,
  "project": "/home/src/projects/project",
  "noEmit": true,
  "configFilePath": "/home/src/projects/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/projects/project/a.ts
/home/src/projects/project/b.ts
/home/src/projects/project/c.ts
/home/src/projects/project/d.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated

Change:: With declaration enabled noEmit

Input::

/home/src/tslibs/TS/Lib/tsc.js -p . --noEmit --declaration
Output::
[96mtsconfig.json[0m:[93m4[0m:[93m15[0m - [91merror[0m[90m TS5107: [0mOption 'module=AMD' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.

[7m4[0m     "module": "amd",
[7m [0m [91m              ~~~~~[0m


Found 1 error in tsconfig.json[90m:4[0m



//// [/home/src/projects/outFile.tsbuildinfo]
<<<<<<< HEAD
{"fileNames":["../tslibs/ts/lib/lib.d.ts","./project/a.ts","./project/b.ts","./project/c.ts","./project/d.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-9483521475-export const a = class { public p = 10; };","-13368947479-export const b = 10;","-17233149573-export const c = class { private p = 10; };","2523684124-export const d = class { private p = 10; };"],"root":[[2,5]],"options":{"declaration":true,"module":2,"outFile":"./outFile.js"},"emitDiagnosticsPerFile":[[4,[{"start":13,"length":1,"messageText":"Property 'p' of exported anonymous class type may not be private or protected.","category":1,"code":4094,"relatedInformation":[{"start":13,"length":1,"messageText":"Add a type annotation to the variable c.","category":1,"code":9027}]}]],[5,[{"start":13,"length":1,"messageText":"Property 'p' of exported anonymous class type may not be private or protected.","category":1,"code":4094,"relatedInformation":[{"start":13,"length":1,"messageText":"Add a type annotation to the variable d.","category":1,"code":9027}]}]]],"pendingEmit":17,"version":"FakeTSVersion"}
||||||| parent of 42f6576e83 (Deprecate `--module amd`, `umd`, `system`, `none`; `--moduleResolution classic`; change defaults (#62669))
{"fileNames":["../tslibs/ts/lib/lib.d.ts","./project/a.ts","./project/b.ts","./project/c.ts","./project/d.ts"],"fileInfos":["-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-9483521475-export const a = class { public p = 10; };","-13368947479-export const b = 10;","-17233149573-export const c = class { private p = 10; };","2523684124-export const d = class { private p = 10; };"],"root":[[2,5]],"options":{"declaration":true,"module":2,"outFile":"./outFile.js"},"emitDiagnosticsPerFile":[[4,[{"start":13,"length":1,"messageText":"Property 'p' of exported anonymous class type may not be private or protected.","category":1,"code":4094,"relatedInformation":[{"start":13,"length":1,"messageText":"Add a type annotation to the variable c.","category":1,"code":9027}]}]],[5,[{"start":13,"length":1,"messageText":"Property 'p' of exported anonymous class type may not be private or protected.","category":1,"code":4094,"relatedInformation":[{"start":13,"length":1,"messageText":"Add a type annotation to the variable d.","category":1,"code":9027}]}]]],"pendingEmit":17,"version":"FakeTSVersion"}
=======
{"fileNames":["../tslibs/ts/lib/lib.d.ts","./project/a.ts","./project/b.ts","./project/c.ts","./project/d.ts"],"fileInfos":["-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-9483521475-export const a = class { public p = 10; };","-13368947479-export const b = 10;","-17233149573-export const c = class { private p = 10; };","2523684124-export const d = class { private p = 10; };"],"root":[[2,5]],"options":{"declaration":true,"module":2,"outFile":"./outFile.js"},"changeFileSet":[2],"version":"FakeTSVersion"}
>>>>>>> 42f6576e83 (Deprecate `--module amd`, `umd`, `system`, `none`; `--moduleResolution classic`; change defaults (#62669))

//// [/home/src/projects/outFile.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../tslibs/ts/lib/lib.d.ts",
    "./project/a.ts",
    "./project/b.ts",
    "./project/c.ts",
    "./project/d.ts"
  ],
  "fileInfos": {
    "../tslibs/ts/lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
    "./project/a.ts": "-9483521475-export const a = class { public p = 10; };",
    "./project/b.ts": "-13368947479-export const b = 10;",
    "./project/c.ts": "-17233149573-export const c = class { private p = 10; };",
    "./project/d.ts": "2523684124-export const d = class { private p = 10; };"
  },
  "root": [
    [
      [
        2,
        5
      ],
      [
        "./project/a.ts",
        "./project/b.ts",
        "./project/c.ts",
        "./project/d.ts"
      ]
    ]
  ],
  "options": {
    "declaration": true,
    "module": 2,
    "outFile": "./outFile.js"
  },
  "changeFileSet": [
    "./project/a.ts"
  ],
  "version": "FakeTSVersion",
<<<<<<< HEAD
  "size": 1485
||||||| parent of 42f6576e83 (Deprecate `--module amd`, `umd`, `system`, `none`; `--moduleResolution classic`; change defaults (#62669))
  "size": 1445
=======
  "size": 863
>>>>>>> 42f6576e83 (Deprecate `--module amd`, `umd`, `system`, `none`; `--moduleResolution classic`; change defaults (#62669))
}


Program root files: [
  "/home/src/projects/project/a.ts",
  "/home/src/projects/project/b.ts",
  "/home/src/projects/project/c.ts",
  "/home/src/projects/project/d.ts"
]
Program options: {
  "outFile": "/home/src/projects/outFile.js",
  "module": 2,
  "incremental": true,
  "project": "/home/src/projects/project",
  "noEmit": true,
  "declaration": true,
  "configFilePath": "/home/src/projects/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/projects/project/a.ts
/home/src/projects/project/b.ts
/home/src/projects/project/c.ts
/home/src/projects/project/d.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated

Change:: With declaration and declarationMap noEmit

Input::

/home/src/tslibs/TS/Lib/tsc.js -p . --noEmit --declaration --declarationMap
Output::
[96mtsconfig.json[0m:[93m4[0m:[93m15[0m - [91merror[0m[90m TS5107: [0mOption 'module=AMD' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.

[7m4[0m     "module": "amd",
[7m [0m [91m              ~~~~~[0m


Found 1 error in tsconfig.json[90m:4[0m



//// [/home/src/projects/outFile.tsbuildinfo]
<<<<<<< HEAD
{"fileNames":["../tslibs/ts/lib/lib.d.ts","./project/a.ts","./project/b.ts","./project/c.ts","./project/d.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-9483521475-export const a = class { public p = 10; };","-13368947479-export const b = 10;","-17233149573-export const c = class { private p = 10; };","2523684124-export const d = class { private p = 10; };"],"root":[[2,5]],"options":{"declaration":true,"declarationMap":true,"module":2,"outFile":"./outFile.js"},"emitDiagnosticsPerFile":[[4,[{"start":13,"length":1,"messageText":"Property 'p' of exported anonymous class type may not be private or protected.","category":1,"code":4094,"relatedInformation":[{"start":13,"length":1,"messageText":"Add a type annotation to the variable c.","category":1,"code":9027}]}]],[5,[{"start":13,"length":1,"messageText":"Property 'p' of exported anonymous class type may not be private or protected.","category":1,"code":4094,"relatedInformation":[{"start":13,"length":1,"messageText":"Add a type annotation to the variable d.","category":1,"code":9027}]}]]],"pendingEmit":49,"version":"FakeTSVersion"}
||||||| parent of 42f6576e83 (Deprecate `--module amd`, `umd`, `system`, `none`; `--moduleResolution classic`; change defaults (#62669))
{"fileNames":["../tslibs/ts/lib/lib.d.ts","./project/a.ts","./project/b.ts","./project/c.ts","./project/d.ts"],"fileInfos":["-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-9483521475-export const a = class { public p = 10; };","-13368947479-export const b = 10;","-17233149573-export const c = class { private p = 10; };","2523684124-export const d = class { private p = 10; };"],"root":[[2,5]],"options":{"declaration":true,"declarationMap":true,"module":2,"outFile":"./outFile.js"},"emitDiagnosticsPerFile":[[4,[{"start":13,"length":1,"messageText":"Property 'p' of exported anonymous class type may not be private or protected.","category":1,"code":4094,"relatedInformation":[{"start":13,"length":1,"messageText":"Add a type annotation to the variable c.","category":1,"code":9027}]}]],[5,[{"start":13,"length":1,"messageText":"Property 'p' of exported anonymous class type may not be private or protected.","category":1,"code":4094,"relatedInformation":[{"start":13,"length":1,"messageText":"Add a type annotation to the variable d.","category":1,"code":9027}]}]]],"pendingEmit":49,"version":"FakeTSVersion"}
=======
{"fileNames":["../tslibs/ts/lib/lib.d.ts","./project/a.ts","./project/b.ts","./project/c.ts","./project/d.ts"],"fileInfos":["-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-9483521475-export const a = class { public p = 10; };","-13368947479-export const b = 10;","-17233149573-export const c = class { private p = 10; };","2523684124-export const d = class { private p = 10; };"],"root":[[2,5]],"options":{"declaration":true,"declarationMap":true,"module":2,"outFile":"./outFile.js"},"changeFileSet":[2],"version":"FakeTSVersion"}
>>>>>>> 42f6576e83 (Deprecate `--module amd`, `umd`, `system`, `none`; `--moduleResolution classic`; change defaults (#62669))

//// [/home/src/projects/outFile.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../tslibs/ts/lib/lib.d.ts",
    "./project/a.ts",
    "./project/b.ts",
    "./project/c.ts",
    "./project/d.ts"
  ],
  "fileInfos": {
    "../tslibs/ts/lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
    "./project/a.ts": "-9483521475-export const a = class { public p = 10; };",
    "./project/b.ts": "-13368947479-export const b = 10;",
    "./project/c.ts": "-17233149573-export const c = class { private p = 10; };",
    "./project/d.ts": "2523684124-export const d = class { private p = 10; };"
  },
  "root": [
    [
      [
        2,
        5
      ],
      [
        "./project/a.ts",
        "./project/b.ts",
        "./project/c.ts",
        "./project/d.ts"
      ]
    ]
  ],
  "options": {
    "declaration": true,
    "declarationMap": true,
    "module": 2,
    "outFile": "./outFile.js"
  },
  "changeFileSet": [
    "./project/a.ts"
  ],
  "version": "FakeTSVersion",
<<<<<<< HEAD
  "size": 1507
||||||| parent of 42f6576e83 (Deprecate `--module amd`, `umd`, `system`, `none`; `--moduleResolution classic`; change defaults (#62669))
  "size": 1467
=======
  "size": 885
>>>>>>> 42f6576e83 (Deprecate `--module amd`, `umd`, `system`, `none`; `--moduleResolution classic`; change defaults (#62669))
}


Program root files: [
  "/home/src/projects/project/a.ts",
  "/home/src/projects/project/b.ts",
  "/home/src/projects/project/c.ts",
  "/home/src/projects/project/d.ts"
]
Program options: {
  "outFile": "/home/src/projects/outFile.js",
  "module": 2,
  "incremental": true,
  "project": "/home/src/projects/project",
  "noEmit": true,
  "declaration": true,
  "declarationMap": true,
  "configFilePath": "/home/src/projects/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/projects/project/a.ts
/home/src/projects/project/b.ts
/home/src/projects/project/c.ts
/home/src/projects/project/d.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated

Change:: Fix the another 

Input::
//// [/home/src/projects/project/c.ts]
export const c = class { public p = 10; };


/home/src/tslibs/TS/Lib/tsc.js -p . --noEmit --declaration --declarationMap
Output::
[96mtsconfig.json[0m:[93m4[0m:[93m15[0m - [91merror[0m[90m TS5107: [0mOption 'module=AMD' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.

[7m4[0m     "module": "amd",
[7m [0m [91m              ~~~~~[0m


Found 1 error in tsconfig.json[90m:4[0m



//// [/home/src/projects/outFile.tsbuildinfo]
<<<<<<< HEAD
{"fileNames":["../tslibs/ts/lib/lib.d.ts","./project/a.ts","./project/b.ts","./project/c.ts","./project/d.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-9483521475-export const a = class { public p = 10; };","-13368947479-export const b = 10;","-15184115393-export const c = class { public p = 10; };","2523684124-export const d = class { private p = 10; };"],"root":[[2,5]],"options":{"declaration":true,"declarationMap":true,"module":2,"outFile":"./outFile.js"},"emitDiagnosticsPerFile":[[5,[{"start":13,"length":1,"messageText":"Property 'p' of exported anonymous class type may not be private or protected.","category":1,"code":4094,"relatedInformation":[{"start":13,"length":1,"messageText":"Add a type annotation to the variable d.","category":1,"code":9027}]}]]],"pendingEmit":49,"version":"FakeTSVersion"}
||||||| parent of 42f6576e83 (Deprecate `--module amd`, `umd`, `system`, `none`; `--moduleResolution classic`; change defaults (#62669))
{"fileNames":["../tslibs/ts/lib/lib.d.ts","./project/a.ts","./project/b.ts","./project/c.ts","./project/d.ts"],"fileInfos":["-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-9483521475-export const a = class { public p = 10; };","-13368947479-export const b = 10;","-15184115393-export const c = class { public p = 10; };","2523684124-export const d = class { private p = 10; };"],"root":[[2,5]],"options":{"declaration":true,"declarationMap":true,"module":2,"outFile":"./outFile.js"},"emitDiagnosticsPerFile":[[5,[{"start":13,"length":1,"messageText":"Property 'p' of exported anonymous class type may not be private or protected.","category":1,"code":4094,"relatedInformation":[{"start":13,"length":1,"messageText":"Add a type annotation to the variable d.","category":1,"code":9027}]}]]],"pendingEmit":49,"version":"FakeTSVersion"}
=======
{"fileNames":["../tslibs/ts/lib/lib.d.ts","./project/a.ts","./project/b.ts","./project/c.ts","./project/d.ts"],"fileInfos":["-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-9483521475-export const a = class { public p = 10; };","-13368947479-export const b = 10;","-15184115393-export const c = class { public p = 10; };","2523684124-export const d = class { private p = 10; };"],"root":[[2,5]],"options":{"declaration":true,"declarationMap":true,"module":2,"outFile":"./outFile.js"},"changeFileSet":[2,4],"version":"FakeTSVersion"}
>>>>>>> 42f6576e83 (Deprecate `--module amd`, `umd`, `system`, `none`; `--moduleResolution classic`; change defaults (#62669))

//// [/home/src/projects/outFile.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../tslibs/ts/lib/lib.d.ts",
    "./project/a.ts",
    "./project/b.ts",
    "./project/c.ts",
    "./project/d.ts"
  ],
  "fileInfos": {
    "../tslibs/ts/lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
    "./project/a.ts": "-9483521475-export const a = class { public p = 10; };",
    "./project/b.ts": "-13368947479-export const b = 10;",
    "./project/c.ts": "-15184115393-export const c = class { public p = 10; };",
    "./project/d.ts": "2523684124-export const d = class { private p = 10; };"
  },
  "root": [
    [
      [
        2,
        5
      ],
      [
        "./project/a.ts",
        "./project/b.ts",
        "./project/c.ts",
        "./project/d.ts"
      ]
    ]
  ],
  "options": {
    "declaration": true,
    "declarationMap": true,
    "module": 2,
    "outFile": "./outFile.js"
  },
  "changeFileSet": [
    "./project/a.ts",
    "./project/c.ts"
  ],
  "version": "FakeTSVersion",
<<<<<<< HEAD
  "size": 1227
||||||| parent of 42f6576e83 (Deprecate `--module amd`, `umd`, `system`, `none`; `--moduleResolution classic`; change defaults (#62669))
  "size": 1187
=======
  "size": 886
>>>>>>> 42f6576e83 (Deprecate `--module amd`, `umd`, `system`, `none`; `--moduleResolution classic`; change defaults (#62669))
}


Program root files: [
  "/home/src/projects/project/a.ts",
  "/home/src/projects/project/b.ts",
  "/home/src/projects/project/c.ts",
  "/home/src/projects/project/d.ts"
]
Program options: {
  "outFile": "/home/src/projects/outFile.js",
  "module": 2,
  "incremental": true,
  "project": "/home/src/projects/project",
  "noEmit": true,
  "declaration": true,
  "declarationMap": true,
  "configFilePath": "/home/src/projects/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/projects/project/a.ts
/home/src/projects/project/b.ts
/home/src/projects/project/c.ts
/home/src/projects/project/d.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated
