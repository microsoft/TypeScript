currentDirectory:: /home/src/projects/project useCaseSensitiveFileNames:: false
Input::
//// [/home/src/projects/project/a.ts]
export const a: number = "hello"

//// [/home/src/projects/project/tsconfig.json]
{
  "compilerOptions": {
    "incremental": true,
    "noEmit": true
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

//// [/home/src/projects/project/b.ts]
export const b = 10;


/home/src/tslibs/TS/Lib/tsc.js -b -verbose -w
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] Starting compilation in watch mode...

[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because output file 'tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project '/home/src/projects/project/tsconfig.json'...

[96ma.ts[0m:[93m1[0m:[93m14[0m - [91merror[0m[90m TS2322: [0mType 'string' is not assignable to type 'number'.

[7m1[0m export const a: number = "hello"
[7m [0m [91m             ~[0m

[[90mHH:MM:SS AM[0m] Found 1 error. Watching for file changes.



//// [/home/src/projects/project/tsconfig.tsbuildinfo]
{"fileNames":["../../tslibs/ts/lib/lib.d.ts","./a.ts","./b.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},"-11417512537-export const a: number = \"hello\"","-13368947479-export const b = 10;"],"root":[2,3],"semanticDiagnosticsPerFile":[[2,[{"start":13,"length":1,"code":2322,"category":1,"messageText":"Type 'string' is not assignable to type 'number'."}]]],"affectedFilesPendingEmit":[2,3],"version":"FakeTSVersion"}

//// [/home/src/projects/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../tslibs/ts/lib/lib.d.ts",
    "./a.ts",
    "./b.ts"
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
    "./a.ts": {
      "version": "-11417512537-export const a: number = \"hello\"",
      "signature": "-11417512537-export const a: number = \"hello\""
    },
    "./b.ts": {
      "version": "-13368947479-export const b = 10;",
      "signature": "-13368947479-export const b = 10;"
    }
  },
  "root": [
    [
      2,
      "./a.ts"
    ],
    [
      3,
      "./b.ts"
    ]
  ],
  "semanticDiagnosticsPerFile": [
    [
      "./a.ts",
      [
        {
          "start": 13,
          "length": 1,
          "code": 2322,
          "category": 1,
          "messageText": "Type 'string' is not assignable to type 'number'."
        }
      ]
    ]
  ],
  "affectedFilesPendingEmit": [
    [
      "./a.ts",
      "Js"
    ],
    [
      "./b.ts",
      "Js"
    ]
  ],
  "version": "FakeTSVersion",
  "size": 867
}


FsWatches::
/home/src/projects/project/a.ts: *new*
  {}
/home/src/projects/project/b.ts: *new*
  {}
/home/src/projects/project/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/home/src/projects/project: *new*
  {}

Program root files: [
  "/home/src/projects/project/a.ts",
  "/home/src/projects/project/b.ts"
]
Program options: {
  "incremental": true,
  "noEmit": true,
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/home/src/projects/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/projects/project/a.ts
/home/src/projects/project/b.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/projects/project/a.ts
/home/src/projects/project/b.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/home/src/projects/project/a.ts (used version)
/home/src/projects/project/b.ts (used version)

exitCode:: ExitStatus.undefined

Change:: Fix error

Input::
//// [/home/src/projects/project/a.ts]
export const a = "hello";


Timeout callback:: count: 1
1: timerToBuildInvalidatedProject *new*

Before running Timeout callback:: count: 1
1: timerToBuildInvalidatedProject

Host is moving to new time
After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because buildinfo file 'tsconfig.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project '/home/src/projects/project/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/home/src/projects/project/tsconfig.tsbuildinfo]
{"fileNames":["../../tslibs/ts/lib/lib.d.ts","./a.ts","./b.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-16641552193-export const a = \"hello\";","signature":"-2692717255-export declare const a = \"hello\";\n"},"-13368947479-export const b = 10;"],"root":[2,3],"affectedFilesPendingEmit":[2,3],"version":"FakeTSVersion"}

//// [/home/src/projects/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../tslibs/ts/lib/lib.d.ts",
    "./a.ts",
    "./b.ts"
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
    "./a.ts": {
      "original": {
        "version": "-16641552193-export const a = \"hello\";",
        "signature": "-2692717255-export declare const a = \"hello\";\n"
      },
      "version": "-16641552193-export const a = \"hello\";",
      "signature": "-2692717255-export declare const a = \"hello\";\n"
    },
    "./b.ts": {
      "version": "-13368947479-export const b = 10;",
      "signature": "-13368947479-export const b = 10;"
    }
  },
  "root": [
    [
      2,
      "./a.ts"
    ],
    [
      3,
      "./b.ts"
    ]
  ],
  "affectedFilesPendingEmit": [
    [
      "./a.ts",
      "Js"
    ],
    [
      "./b.ts",
      "Js"
    ]
  ],
  "version": "FakeTSVersion",
  "size": 784
}



Program root files: [
  "/home/src/projects/project/a.ts",
  "/home/src/projects/project/b.ts"
]
Program options: {
  "incremental": true,
  "noEmit": true,
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/home/src/projects/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/projects/project/a.ts
/home/src/projects/project/b.ts

Semantic diagnostics in builder refreshed for::
/home/src/projects/project/a.ts

Shape signatures in builder refreshed for::
/home/src/projects/project/a.ts (computed .d.ts)

exitCode:: ExitStatus.undefined

Change:: Emit after fixing error

Input::
//// [/home/src/projects/project/tsconfig.json]
{
  "compilerOptions": {
    "incremental": true
  }
}


Timeout callback:: count: 1
2: timerToBuildInvalidatedProject *new*

Before running Timeout callback:: count: 1
2: timerToBuildInvalidatedProject

Host is moving to new time
After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because buildinfo file 'tsconfig.tsbuildinfo' indicates that some of the changes were not emitted

[[90mHH:MM:SS AM[0m] Building project '/home/src/projects/project/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/home/src/projects/project/tsconfig.tsbuildinfo]
{"fileNames":["../../tslibs/ts/lib/lib.d.ts","./a.ts","./b.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-16641552193-export const a = \"hello\";","signature":"-2692717255-export declare const a = \"hello\";\n"},"-13368947479-export const b = 10;"],"root":[2,3],"version":"FakeTSVersion"}

//// [/home/src/projects/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../tslibs/ts/lib/lib.d.ts",
    "./a.ts",
    "./b.ts"
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
    "./a.ts": {
      "original": {
        "version": "-16641552193-export const a = \"hello\";",
        "signature": "-2692717255-export declare const a = \"hello\";\n"
      },
      "version": "-16641552193-export const a = \"hello\";",
      "signature": "-2692717255-export declare const a = \"hello\";\n"
    },
    "./b.ts": {
      "version": "-13368947479-export const b = 10;",
      "signature": "-13368947479-export const b = 10;"
    }
  },
  "root": [
    [
      2,
      "./a.ts"
    ],
    [
      3,
      "./b.ts"
    ]
  ],
  "version": "FakeTSVersion",
  "size": 751
}

//// [/home/src/projects/project/a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.a = void 0;
exports.a = "hello";


//// [/home/src/projects/project/b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.b = void 0;
exports.b = 10;




Program root files: [
  "/home/src/projects/project/a.ts",
  "/home/src/projects/project/b.ts"
]
Program options: {
  "incremental": true,
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/home/src/projects/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/projects/project/a.ts
/home/src/projects/project/b.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

exitCode:: ExitStatus.undefined

Change:: no Emit run after fixing error

Input::
//// [/home/src/projects/project/tsconfig.json]
{
  "compilerOptions": {
    "incremental": true,
    "noEmit": true
  }
}


Timeout callback:: count: 1
3: timerToBuildInvalidatedProject *new*

Before running Timeout callback:: count: 1
3: timerToBuildInvalidatedProject

Host is moving to new time
After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because output 'tsconfig.tsbuildinfo' is older than input 'tsconfig.json'

[[90mHH:MM:SS AM[0m] Building project '/home/src/projects/project/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.





Program root files: [
  "/home/src/projects/project/a.ts",
  "/home/src/projects/project/b.ts"
]
Program options: {
  "incremental": true,
  "noEmit": true,
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/home/src/projects/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/projects/project/a.ts
/home/src/projects/project/b.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

exitCode:: ExitStatus.undefined

Change:: Introduce error

Input::
//// [/home/src/projects/project/a.ts]
export const a: number = "hello"


Timeout callback:: count: 1
4: timerToBuildInvalidatedProject *new*

Before running Timeout callback:: count: 1
4: timerToBuildInvalidatedProject

Host is moving to new time
After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because output 'tsconfig.tsbuildinfo' is older than input 'a.ts'

[[90mHH:MM:SS AM[0m] Building project '/home/src/projects/project/tsconfig.json'...

[96ma.ts[0m:[93m1[0m:[93m14[0m - [91merror[0m[90m TS2322: [0mType 'string' is not assignable to type 'number'.

[7m1[0m export const a: number = "hello"
[7m [0m [91m             ~[0m

[[90mHH:MM:SS AM[0m] Found 1 error. Watching for file changes.



//// [/home/src/projects/project/tsconfig.tsbuildinfo]
{"fileNames":["../../tslibs/ts/lib/lib.d.ts","./a.ts","./b.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-11417512537-export const a: number = \"hello\"","signature":"-3045186137-export declare const a: number;\n"},"-13368947479-export const b = 10;"],"root":[2,3],"semanticDiagnosticsPerFile":[[2,[{"start":13,"length":1,"code":2322,"category":1,"messageText":"Type 'string' is not assignable to type 'number'."}]]],"affectedFilesPendingEmit":[2],"version":"FakeTSVersion"}

//// [/home/src/projects/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../tslibs/ts/lib/lib.d.ts",
    "./a.ts",
    "./b.ts"
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
    "./a.ts": {
      "original": {
        "version": "-11417512537-export const a: number = \"hello\"",
        "signature": "-3045186137-export declare const a: number;\n"
      },
      "version": "-11417512537-export const a: number = \"hello\"",
      "signature": "-3045186137-export declare const a: number;\n"
    },
    "./b.ts": {
      "version": "-13368947479-export const b = 10;",
      "signature": "-13368947479-export const b = 10;"
    }
  },
  "root": [
    [
      2,
      "./a.ts"
    ],
    [
      3,
      "./b.ts"
    ]
  ],
  "semanticDiagnosticsPerFile": [
    [
      "./a.ts",
      [
        {
          "start": 13,
          "length": 1,
          "code": 2322,
          "category": 1,
          "messageText": "Type 'string' is not assignable to type 'number'."
        }
      ]
    ]
  ],
  "affectedFilesPendingEmit": [
    [
      "./a.ts",
      "Js"
    ]
  ],
  "version": "FakeTSVersion",
  "size": 937
}



Program root files: [
  "/home/src/projects/project/a.ts",
  "/home/src/projects/project/b.ts"
]
Program options: {
  "incremental": true,
  "noEmit": true,
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/home/src/projects/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/projects/project/a.ts
/home/src/projects/project/b.ts

Semantic diagnostics in builder refreshed for::
/home/src/projects/project/a.ts

Shape signatures in builder refreshed for::
/home/src/projects/project/a.ts (computed .d.ts)

exitCode:: ExitStatus.undefined

Change:: Emit when error

Input::
//// [/home/src/projects/project/tsconfig.json]
{
  "compilerOptions": {
    "incremental": true
  }
}


Timeout callback:: count: 1
5: timerToBuildInvalidatedProject *new*

Before running Timeout callback:: count: 1
5: timerToBuildInvalidatedProject

Host is moving to new time
After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because buildinfo file 'tsconfig.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project '/home/src/projects/project/tsconfig.json'...

[96ma.ts[0m:[93m1[0m:[93m14[0m - [91merror[0m[90m TS2322: [0mType 'string' is not assignable to type 'number'.

[7m1[0m export const a: number = "hello"
[7m [0m [91m             ~[0m

[[90mHH:MM:SS AM[0m] Found 1 error. Watching for file changes.



//// [/home/src/projects/project/tsconfig.tsbuildinfo]
{"fileNames":["../../tslibs/ts/lib/lib.d.ts","./a.ts","./b.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-11417512537-export const a: number = \"hello\"","signature":"-3045186137-export declare const a: number;\n"},"-13368947479-export const b = 10;"],"root":[2,3],"semanticDiagnosticsPerFile":[[2,[{"start":13,"length":1,"code":2322,"category":1,"messageText":"Type 'string' is not assignable to type 'number'."}]]],"version":"FakeTSVersion"}

//// [/home/src/projects/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../tslibs/ts/lib/lib.d.ts",
    "./a.ts",
    "./b.ts"
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
    "./a.ts": {
      "original": {
        "version": "-11417512537-export const a: number = \"hello\"",
        "signature": "-3045186137-export declare const a: number;\n"
      },
      "version": "-11417512537-export const a: number = \"hello\"",
      "signature": "-3045186137-export declare const a: number;\n"
    },
    "./b.ts": {
      "version": "-13368947479-export const b = 10;",
      "signature": "-13368947479-export const b = 10;"
    }
  },
  "root": [
    [
      2,
      "./a.ts"
    ],
    [
      3,
      "./b.ts"
    ]
  ],
  "semanticDiagnosticsPerFile": [
    [
      "./a.ts",
      [
        {
          "start": 13,
          "length": 1,
          "code": 2322,
          "category": 1,
          "messageText": "Type 'string' is not assignable to type 'number'."
        }
      ]
    ]
  ],
  "version": "FakeTSVersion",
  "size": 906
}

//// [/home/src/projects/project/a.js] file written with same contents


Program root files: [
  "/home/src/projects/project/a.ts",
  "/home/src/projects/project/b.ts"
]
Program options: {
  "incremental": true,
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/home/src/projects/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/projects/project/a.ts
/home/src/projects/project/b.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

exitCode:: ExitStatus.undefined

Change:: no Emit run when error

Input::
//// [/home/src/projects/project/tsconfig.json]
{
  "compilerOptions": {
    "incremental": true,
    "noEmit": true
  }
}


Timeout callback:: count: 1
6: timerToBuildInvalidatedProject *new*

Before running Timeout callback:: count: 1
6: timerToBuildInvalidatedProject

Host is moving to new time
After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because buildinfo file 'tsconfig.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project '/home/src/projects/project/tsconfig.json'...

[96ma.ts[0m:[93m1[0m:[93m14[0m - [91merror[0m[90m TS2322: [0mType 'string' is not assignable to type 'number'.

[7m1[0m export const a: number = "hello"
[7m [0m [91m             ~[0m

[[90mHH:MM:SS AM[0m] Found 1 error. Watching for file changes.





Program root files: [
  "/home/src/projects/project/a.ts",
  "/home/src/projects/project/b.ts"
]
Program options: {
  "incremental": true,
  "noEmit": true,
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/home/src/projects/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/projects/project/a.ts
/home/src/projects/project/b.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

exitCode:: ExitStatus.undefined
