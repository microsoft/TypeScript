currentDirectory:: /user/username/projects/reexport useCaseSensitiveFileNames:: false
Input::
//// [/user/username/projects/reexport/src/tsconfig.json]
{
  "files": [],
  "include": [],
  "references": [
    {
      "path": "./pure"
    },
    {
      "path": "./main"
    }
  ]
}

//// [/user/username/projects/reexport/src/main/tsconfig.json]
{
  "compilerOptions": {
    "outDir": "../../out",
    "rootDir": "../"
  },
  "include": [
    "**/*.ts"
  ],
  "references": [
    {
      "path": "../pure"
    }
  ]
}

//// [/user/username/projects/reexport/src/main/index.ts]
import { Session } from "../pure";

export const session: Session = {
    foo: 1
};


//// [/user/username/projects/reexport/src/pure/tsconfig.json]
{
  "compilerOptions": {
    "composite": true,
    "outDir": "../../out",
    "rootDir": "../"
  },
  "include": [
    "**/*.ts"
  ]
}

//// [/user/username/projects/reexport/src/pure/index.ts]
export * from "./session";


//// [/user/username/projects/reexport/src/pure/session.ts]
export interface Session {
    foo: number;
    // bar: number;
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


/home/src/tslibs/TS/Lib/tsc.js -b -w -verbose src
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] Starting compilation in watch mode...

[[90mHH:MM:SS AM[0m] Projects in this build: 
    * src/pure/tsconfig.json
    * src/main/tsconfig.json
    * src/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'src/pure/tsconfig.json' is out of date because output file 'out/pure/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project '/user/username/projects/reexport/src/pure/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'src/main/tsconfig.json' is out of date because output file 'out/main/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project '/user/username/projects/reexport/src/main/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/user/username/projects/reexport/out/pure/session.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });


//// [/user/username/projects/reexport/out/pure/session.d.ts]
export interface Session {
    foo: number;
}


//// [/user/username/projects/reexport/out/pure/index.js]
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./session"), exports);


//// [/user/username/projects/reexport/out/pure/index.d.ts]
export * from "./session";


//// [/user/username/projects/reexport/out/pure/tsconfig.tsbuildinfo]
{"fileNames":["../../../../../../home/src/tslibs/ts/lib/lib.d.ts","../../src/pure/session.ts","../../src/pure/index.ts"],"fileIdsList":[[2]],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"1782339311-export interface Session {\n    foo: number;\n    // bar: number;\n}\n","signature":"-1218067212-export interface Session {\n    foo: number;\n}\n"},"-5356193041-export * from \"./session\";\n"],"root":[2,3],"options":{"composite":true,"outDir":"..","rootDir":"../../src"},"referencedMap":[[3,1]],"latestChangedDtsFile":"./index.d.ts","version":"FakeTSVersion"}

//// [/user/username/projects/reexport/out/pure/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../../../home/src/tslibs/ts/lib/lib.d.ts",
    "../../src/pure/session.ts",
    "../../src/pure/index.ts"
  ],
  "fileIdsList": [
    [
      "../../src/pure/session.ts"
    ]
  ],
  "fileInfos": {
    "../../../../../../home/src/tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "../../src/pure/session.ts": {
      "original": {
        "version": "1782339311-export interface Session {\n    foo: number;\n    // bar: number;\n}\n",
        "signature": "-1218067212-export interface Session {\n    foo: number;\n}\n"
      },
      "version": "1782339311-export interface Session {\n    foo: number;\n    // bar: number;\n}\n",
      "signature": "-1218067212-export interface Session {\n    foo: number;\n}\n"
    },
    "../../src/pure/index.ts": {
      "version": "-5356193041-export * from \"./session\";\n",
      "signature": "-5356193041-export * from \"./session\";\n"
    }
  },
  "root": [
    [
      2,
      "../../src/pure/session.ts"
    ],
    [
      3,
      "../../src/pure/index.ts"
    ]
  ],
  "options": {
    "composite": true,
    "outDir": "..",
    "rootDir": "../../src"
  },
  "referencedMap": {
    "../../src/pure/index.ts": [
      "../../src/pure/session.ts"
    ]
  },
  "latestChangedDtsFile": "./index.d.ts",
  "version": "FakeTSVersion",
  "size": 1017
}

//// [/user/username/projects/reexport/out/main/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.session = void 0;
exports.session = {
    foo: 1
};


//// [/user/username/projects/reexport/out/main/tsconfig.tsbuildinfo]
{"root":["../../src/main/index.ts"],"version":"FakeTSVersion"}

//// [/user/username/projects/reexport/out/main/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "root": [
    "../../src/main/index.ts"
  ],
  "version": "FakeTSVersion",
  "size": 62
}


PolledWatches::
/user/username/projects/reexport/src/pure/package.json: *new*
  {"pollingInterval":2000}

FsWatches::
/user/username/projects/reexport/src/main/index.ts: *new*
  {}
/user/username/projects/reexport/src/main/tsconfig.json: *new*
  {}
/user/username/projects/reexport/src/pure/index.ts: *new*
  {}
/user/username/projects/reexport/src/pure/session.ts: *new*
  {}
/user/username/projects/reexport/src/pure/tsconfig.json: *new*
  {}
/user/username/projects/reexport/src/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/user/username/projects/reexport/src/main: *new*
  {}
/user/username/projects/reexport/src/pure: *new*
  {}

Program root files: [
  "/user/username/projects/reexport/src/pure/index.ts",
  "/user/username/projects/reexport/src/pure/session.ts"
]
Program options: {
  "composite": true,
  "outDir": "/user/username/projects/reexport/out",
  "rootDir": "/user/username/projects/reexport/src",
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/reexport/src/pure/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/reexport/src/pure/session.ts
/user/username/projects/reexport/src/pure/index.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/reexport/src/pure/session.ts
/user/username/projects/reexport/src/pure/index.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/user/username/projects/reexport/src/pure/session.ts (computed .d.ts during emit)
/user/username/projects/reexport/src/pure/index.ts (used version)

Program root files: [
  "/user/username/projects/reexport/src/main/index.ts"
]
Program options: {
  "outDir": "/user/username/projects/reexport/out",
  "rootDir": "/user/username/projects/reexport/src",
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/reexport/src/main/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/reexport/out/pure/session.d.ts
/user/username/projects/reexport/out/pure/index.d.ts
/user/username/projects/reexport/src/main/index.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/reexport/out/pure/session.d.ts
/user/username/projects/reexport/out/pure/index.d.ts
/user/username/projects/reexport/src/main/index.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/user/username/projects/reexport/out/pure/session.d.ts (used version)
/user/username/projects/reexport/out/pure/index.d.ts (used version)
/user/username/projects/reexport/src/main/index.ts (used version)

exitCode:: ExitStatus.undefined

Change:: Introduce error

Input::
//// [/user/username/projects/reexport/src/pure/session.ts]
export interface Session {
    foo: number;
    bar: number;
}



Timeout callback:: count: 1
1: timerToBuildInvalidatedProject *new*

Before running Timeout callback:: count: 1
1: timerToBuildInvalidatedProject

Host is moving to new time
After running Timeout callback:: count: 1
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

[[90mHH:MM:SS AM[0m] Project 'src/pure/tsconfig.json' is out of date because output 'out/pure/tsconfig.tsbuildinfo' is older than input 'src/pure/session.ts'

[[90mHH:MM:SS AM[0m] Building project '/user/username/projects/reexport/src/pure/tsconfig.json'...



//// [/user/username/projects/reexport/out/pure/session.js] file written with same contents
//// [/user/username/projects/reexport/out/pure/session.d.ts]
export interface Session {
    foo: number;
    bar: number;
}


//// [/user/username/projects/reexport/out/pure/index.js] file written with same contents
//// [/user/username/projects/reexport/out/pure/tsconfig.tsbuildinfo]
{"fileNames":["../../../../../../home/src/tslibs/ts/lib/lib.d.ts","../../src/pure/session.ts","../../src/pure/index.ts"],"fileIdsList":[[2]],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},"309257137-export interface Session {\n    foo: number;\n    bar: number;\n}\n","-5356193041-export * from \"./session\";\n"],"root":[2,3],"options":{"composite":true,"outDir":"..","rootDir":"../../src"},"referencedMap":[[3,1]],"latestChangedDtsFile":"./session.d.ts","version":"FakeTSVersion"}

//// [/user/username/projects/reexport/out/pure/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../../../home/src/tslibs/ts/lib/lib.d.ts",
    "../../src/pure/session.ts",
    "../../src/pure/index.ts"
  ],
  "fileIdsList": [
    [
      "../../src/pure/session.ts"
    ]
  ],
  "fileInfos": {
    "../../../../../../home/src/tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "../../src/pure/session.ts": {
      "version": "309257137-export interface Session {\n    foo: number;\n    bar: number;\n}\n",
      "signature": "309257137-export interface Session {\n    foo: number;\n    bar: number;\n}\n"
    },
    "../../src/pure/index.ts": {
      "version": "-5356193041-export * from \"./session\";\n",
      "signature": "-5356193041-export * from \"./session\";\n"
    }
  },
  "root": [
    [
      2,
      "../../src/pure/session.ts"
    ],
    [
      3,
      "../../src/pure/index.ts"
    ]
  ],
  "options": {
    "composite": true,
    "outDir": "..",
    "rootDir": "../../src"
  },
  "referencedMap": {
    "../../src/pure/index.ts": [
      "../../src/pure/session.ts"
    ]
  },
  "latestChangedDtsFile": "./session.d.ts",
  "version": "FakeTSVersion",
  "size": 927
}


Timeout callback:: count: 1
2: timerToBuildInvalidatedProject *new*

Before running Timeout callback:: count: 1
2: timerToBuildInvalidatedProject

Host is moving to new time
After running Timeout callback:: count: 0
Output::
[[90mHH:MM:SS AM[0m] Project 'src/main/tsconfig.json' is out of date because output 'out/main/index.js' is older than input 'src/pure/tsconfig.json'

[[90mHH:MM:SS AM[0m] Building project '/user/username/projects/reexport/src/main/tsconfig.json'...

[96msrc/main/index.ts[0m:[93m3[0m:[93m14[0m - [91merror[0m[90m TS2741: [0mProperty 'bar' is missing in type '{ foo: number; }' but required in type 'Session'.

[7m3[0m export const session: Session = {
[7m [0m [91m             ~~~~~~~[0m

  [96mout/pure/session.d.ts[0m:[93m3[0m:[93m5[0m
    [7m3[0m     bar: number;
    [7m [0m [96m    ~~~[0m
    'bar' is declared here.

[[90mHH:MM:SS AM[0m] Updating unchanged output timestamps of project '/user/username/projects/reexport/src/main/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Found 1 error. Watching for file changes.



//// [/user/username/projects/reexport/out/main/index.js] file changed its modified time
//// [/user/username/projects/reexport/out/main/tsconfig.tsbuildinfo]
{"root":["../../src/main/index.ts"],"errors":true,"version":"FakeTSVersion"}

//// [/user/username/projects/reexport/out/main/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "root": [
    "../../src/main/index.ts"
  ],
  "errors": true,
  "version": "FakeTSVersion",
  "size": 76
}



Program root files: [
  "/user/username/projects/reexport/src/pure/index.ts",
  "/user/username/projects/reexport/src/pure/session.ts"
]
Program options: {
  "composite": true,
  "outDir": "/user/username/projects/reexport/out",
  "rootDir": "/user/username/projects/reexport/src",
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/reexport/src/pure/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/reexport/src/pure/session.ts
/user/username/projects/reexport/src/pure/index.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/reexport/src/pure/session.ts
/user/username/projects/reexport/src/pure/index.ts

Shape signatures in builder refreshed for::
/user/username/projects/reexport/src/pure/session.ts (computed .d.ts)
/user/username/projects/reexport/src/pure/index.ts (computed .d.ts)

Program root files: [
  "/user/username/projects/reexport/src/main/index.ts"
]
Program options: {
  "outDir": "/user/username/projects/reexport/out",
  "rootDir": "/user/username/projects/reexport/src",
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/reexport/src/main/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/reexport/out/pure/session.d.ts
/user/username/projects/reexport/out/pure/index.d.ts
/user/username/projects/reexport/src/main/index.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/reexport/out/pure/session.d.ts
/user/username/projects/reexport/out/pure/index.d.ts
/user/username/projects/reexport/src/main/index.ts

Shape signatures in builder refreshed for::
/user/username/projects/reexport/out/pure/session.d.ts (used version)
/user/username/projects/reexport/out/pure/index.d.ts (used version)
/user/username/projects/reexport/src/main/index.ts (used version)

exitCode:: ExitStatus.undefined

Change:: Fix error

Input::
//// [/user/username/projects/reexport/src/pure/session.ts]
export interface Session {
    foo: number;
    // bar: number;
}



Timeout callback:: count: 1
3: timerToBuildInvalidatedProject *new*

Before running Timeout callback:: count: 1
3: timerToBuildInvalidatedProject

Host is moving to new time
After running Timeout callback:: count: 1
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

[[90mHH:MM:SS AM[0m] Project 'src/pure/tsconfig.json' is out of date because output 'out/pure/tsconfig.tsbuildinfo' is older than input 'src/pure/session.ts'

[[90mHH:MM:SS AM[0m] Building project '/user/username/projects/reexport/src/pure/tsconfig.json'...



//// [/user/username/projects/reexport/out/pure/session.js] file written with same contents
//// [/user/username/projects/reexport/out/pure/session.d.ts]
export interface Session {
    foo: number;
}


//// [/user/username/projects/reexport/out/pure/index.js] file written with same contents
//// [/user/username/projects/reexport/out/pure/tsconfig.tsbuildinfo]
{"fileNames":["../../../../../../home/src/tslibs/ts/lib/lib.d.ts","../../src/pure/session.ts","../../src/pure/index.ts"],"fileIdsList":[[2]],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"1782339311-export interface Session {\n    foo: number;\n    // bar: number;\n}\n","signature":"-1218067212-export interface Session {\n    foo: number;\n}\n"},"-5356193041-export * from \"./session\";\n"],"root":[2,3],"options":{"composite":true,"outDir":"..","rootDir":"../../src"},"referencedMap":[[3,1]],"latestChangedDtsFile":"./session.d.ts","version":"FakeTSVersion"}

//// [/user/username/projects/reexport/out/pure/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../../../home/src/tslibs/ts/lib/lib.d.ts",
    "../../src/pure/session.ts",
    "../../src/pure/index.ts"
  ],
  "fileIdsList": [
    [
      "../../src/pure/session.ts"
    ]
  ],
  "fileInfos": {
    "../../../../../../home/src/tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "../../src/pure/session.ts": {
      "original": {
        "version": "1782339311-export interface Session {\n    foo: number;\n    // bar: number;\n}\n",
        "signature": "-1218067212-export interface Session {\n    foo: number;\n}\n"
      },
      "version": "1782339311-export interface Session {\n    foo: number;\n    // bar: number;\n}\n",
      "signature": "-1218067212-export interface Session {\n    foo: number;\n}\n"
    },
    "../../src/pure/index.ts": {
      "version": "-5356193041-export * from \"./session\";\n",
      "signature": "-5356193041-export * from \"./session\";\n"
    }
  },
  "root": [
    [
      2,
      "../../src/pure/session.ts"
    ],
    [
      3,
      "../../src/pure/index.ts"
    ]
  ],
  "options": {
    "composite": true,
    "outDir": "..",
    "rootDir": "../../src"
  },
  "referencedMap": {
    "../../src/pure/index.ts": [
      "../../src/pure/session.ts"
    ]
  },
  "latestChangedDtsFile": "./session.d.ts",
  "version": "FakeTSVersion",
  "size": 1019
}


Timeout callback:: count: 1
4: timerToBuildInvalidatedProject *new*

Before running Timeout callback:: count: 1
4: timerToBuildInvalidatedProject

Host is moving to new time
After running Timeout callback:: count: 0
Output::
[[90mHH:MM:SS AM[0m] Project 'src/main/tsconfig.json' is out of date because it had errors.

[[90mHH:MM:SS AM[0m] Building project '/user/username/projects/reexport/src/main/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Updating unchanged output timestamps of project '/user/username/projects/reexport/src/main/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/user/username/projects/reexport/out/main/index.js] file changed its modified time
//// [/user/username/projects/reexport/out/main/tsconfig.tsbuildinfo]
{"root":["../../src/main/index.ts"],"version":"FakeTSVersion"}

//// [/user/username/projects/reexport/out/main/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "root": [
    "../../src/main/index.ts"
  ],
  "version": "FakeTSVersion",
  "size": 62
}



Program root files: [
  "/user/username/projects/reexport/src/pure/index.ts",
  "/user/username/projects/reexport/src/pure/session.ts"
]
Program options: {
  "composite": true,
  "outDir": "/user/username/projects/reexport/out",
  "rootDir": "/user/username/projects/reexport/src",
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/reexport/src/pure/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/reexport/src/pure/session.ts
/user/username/projects/reexport/src/pure/index.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/reexport/src/pure/session.ts
/user/username/projects/reexport/src/pure/index.ts

Shape signatures in builder refreshed for::
/user/username/projects/reexport/src/pure/session.ts (computed .d.ts)
/user/username/projects/reexport/src/pure/index.ts (computed .d.ts)

Program root files: [
  "/user/username/projects/reexport/src/main/index.ts"
]
Program options: {
  "outDir": "/user/username/projects/reexport/out",
  "rootDir": "/user/username/projects/reexport/src",
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/reexport/src/main/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/reexport/out/pure/session.d.ts
/user/username/projects/reexport/out/pure/index.d.ts
/user/username/projects/reexport/src/main/index.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/reexport/out/pure/session.d.ts
/user/username/projects/reexport/out/pure/index.d.ts
/user/username/projects/reexport/src/main/index.ts

Shape signatures in builder refreshed for::
/user/username/projects/reexport/out/pure/session.d.ts (used version)
/user/username/projects/reexport/out/pure/index.d.ts (used version)
/user/username/projects/reexport/src/main/index.ts (used version)

exitCode:: ExitStatus.undefined
