/a/lib/tsc.js -b -w -verbose src
//// [/user/username/projects/reexport/src/tsconfig.json]
{
  "files": [],
  "include": [],
  "references": [{ "path": "./pure" }, { "path": "./main" }]
}


//// [/user/username/projects/reexport/src/main/tsconfig.json]
{
  "compilerOptions": {
    "outDir": "../../out",
    "rootDir": "../"
  },
  "include": ["**/*.ts"],
  "references": [{ "path": "../pure" }]
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
  "include": ["**/*.ts"]
}


//// [/user/username/projects/reexport/src/pure/index.ts]
export * from "./session";


//// [/user/username/projects/reexport/src/pure/session.ts]
export interface Session {
  foo: number;
  // bar: number;
}


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

//// [/user/username/projects/reexport/out/pure/session.js]
"use strict";
exports.__esModule = true;


//// [/user/username/projects/reexport/out/pure/session.d.ts]
export interface Session {
    foo: number;
}


//// [/user/username/projects/reexport/out/pure/index.js]
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (!exports.hasOwnProperty(p)) __createBinding(exports, m, p);
}
exports.__esModule = true;
__exportStar(require("./session"), exports);


//// [/user/username/projects/reexport/out/pure/index.d.ts]
export * from "./session";


//// [/user/username/projects/reexport/out/pure/tsconfig.tsbuildinfo]
{
  "program": {
    "fileInfos": {
      "../../../../../../a/lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
      },
      "../../src/pure/session.ts": {
        "version": "5375279855-export interface Session {\n  foo: number;\n  // bar: number;\n}\n",
        "signature": "-1218067212-export interface Session {\n    foo: number;\n}\n"
      },
      "../../src/pure/index.ts": {
        "version": "-5356193041-export * from \"./session\";\n",
        "signature": "-5356193041-export * from \"./session\";\n"
      }
    },
    "options": {
      "composite": true,
      "outDir": "..",
      "rootDir": "../../src",
      "watch": true,
      "configFilePath": "../../src/pure/tsconfig.json"
    },
    "referencedMap": {
      "../../src/pure/index.ts": [
        "../../src/pure/session.ts"
      ]
    },
    "exportedModulesMap": {
      "../../src/pure/index.ts": [
        "../../src/pure/session.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../../../../../a/lib/lib.d.ts",
      "../../src/pure/index.ts",
      "../../src/pure/session.ts"
    ]
  },
  "version": "FakeTSVersion"
}

//// [/user/username/projects/reexport/out/main/index.js]
"use strict";
exports.__esModule = true;
exports.session = void 0;
exports.session = {
    foo: 1
};



Output::
>> Screen clear
12:00:35 AM - Starting compilation in watch mode...


12:00:36 AM - Projects in this build: 
    * src/pure/tsconfig.json
    * src/main/tsconfig.json
    * src/tsconfig.json


12:00:37 AM - Project 'src/pure/tsconfig.json' is out of date because output file 'out/pure/index.js' does not exist


12:00:38 AM - Building project '/user/username/projects/reexport/src/pure/tsconfig.json'...


12:00:54 AM - Project 'src/main/tsconfig.json' is out of date because output file 'out/main/index.js' does not exist


12:00:55 AM - Building project '/user/username/projects/reexport/src/main/tsconfig.json'...



12:01:01 AM - Found 0 errors. Watching for file changes.


Program root files: ["/user/username/projects/reexport/src/pure/index.ts","/user/username/projects/reexport/src/pure/session.ts"]
Program options: {"composite":true,"outDir":"/user/username/projects/reexport/out","rootDir":"/user/username/projects/reexport/src","watch":true,"configFilePath":"/user/username/projects/reexport/src/pure/tsconfig.json"}
Program files::
/a/lib/lib.d.ts
/user/username/projects/reexport/src/pure/session.ts
/user/username/projects/reexport/src/pure/index.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/user/username/projects/reexport/src/pure/session.ts
/user/username/projects/reexport/src/pure/index.ts

Program root files: ["/user/username/projects/reexport/src/main/index.ts"]
Program options: {"outDir":"/user/username/projects/reexport/out","rootDir":"/user/username/projects/reexport/src","watch":true,"configFilePath":"/user/username/projects/reexport/src/main/tsconfig.json"}
Program files::
/a/lib/lib.d.ts
/user/username/projects/reexport/out/pure/session.d.ts
/user/username/projects/reexport/out/pure/index.d.ts
/user/username/projects/reexport/src/main/index.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/user/username/projects/reexport/out/pure/session.d.ts
/user/username/projects/reexport/out/pure/index.d.ts
/user/username/projects/reexport/src/main/index.ts

WatchedFiles::
/user/username/projects/reexport/src/pure/tsconfig.json:
  {"fileName":"/user/username/projects/reexport/src/pure/tsconfig.json","pollingInterval":250}
/user/username/projects/reexport/src/pure/index.ts:
  {"fileName":"/user/username/projects/reexport/src/pure/index.ts","pollingInterval":250}
/user/username/projects/reexport/src/pure/session.ts:
  {"fileName":"/user/username/projects/reexport/src/pure/session.ts","pollingInterval":250}
/user/username/projects/reexport/src/main/tsconfig.json:
  {"fileName":"/user/username/projects/reexport/src/main/tsconfig.json","pollingInterval":250}
/user/username/projects/reexport/src/main/index.ts:
  {"fileName":"/user/username/projects/reexport/src/main/index.ts","pollingInterval":250}
/user/username/projects/reexport/src/tsconfig.json:
  {"fileName":"/user/username/projects/reexport/src/tsconfig.json","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/reexport/src/pure:
  {"directoryName":"/user/username/projects/reexport/src/pure","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/reexport/src/main:
  {"directoryName":"/user/username/projects/reexport/src/main","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

Change:: Introduce error

//// [/user/username/projects/reexport/src/pure/session.ts]
export interface Session {
  foo: number;
  bar: number;
}


//// [/user/username/projects/reexport/out/pure/session.js] file written with same contents
//// [/user/username/projects/reexport/out/pure/session.d.ts]
export interface Session {
    foo: number;
    bar: number;
}


//// [/user/username/projects/reexport/out/pure/index.js] file written with same contents
//// [/user/username/projects/reexport/out/pure/index.d.ts] file written with same contents
//// [/user/username/projects/reexport/out/pure/tsconfig.tsbuildinfo]
{
  "program": {
    "fileInfos": {
      "../../../../../../a/lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
      },
      "../../src/pure/session.ts": {
        "version": "4223553457-export interface Session {\n  foo: number;\n  bar: number;\n}\n",
        "signature": "309257137-export interface Session {\n    foo: number;\n    bar: number;\n}\n"
      },
      "../../src/pure/index.ts": {
        "version": "-5356193041-export * from \"./session\";\n",
        "signature": "-5356193041-export * from \"./session\";\n"
      }
    },
    "options": {
      "composite": true,
      "outDir": "..",
      "rootDir": "../../src",
      "watch": true,
      "configFilePath": "../../src/pure/tsconfig.json"
    },
    "referencedMap": {
      "../../src/pure/index.ts": [
        "../../src/pure/session.ts"
      ]
    },
    "exportedModulesMap": {
      "../../src/pure/index.ts": [
        "../../src/pure/session.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../../../../../a/lib/lib.d.ts",
      "../../src/pure/index.ts",
      "../../src/pure/session.ts"
    ]
  },
  "version": "FakeTSVersion"
}


Output::
>> Screen clear
12:01:05 AM - File change detected. Starting incremental compilation...


12:01:06 AM - Project 'src/pure/tsconfig.json' is out of date because oldest output 'out/pure/index.js' is older than newest input 'src/pure/session.ts'


12:01:07 AM - Building project '/user/username/projects/reexport/src/pure/tsconfig.json'...


12:01:23 AM - Project 'src/main/tsconfig.json' is out of date because oldest output 'out/main/index.js' is older than newest input 'src/pure/tsconfig.json'


12:01:24 AM - Building project '/user/username/projects/reexport/src/main/tsconfig.json'...


src/main/index.ts(3,14): error TS2741: Property 'bar' is missing in type '{ foo: number; }' but required in type 'Session'.


12:01:25 AM - Found 1 error. Watching for file changes.


Program root files: ["/user/username/projects/reexport/src/pure/index.ts","/user/username/projects/reexport/src/pure/session.ts"]
Program options: {"composite":true,"outDir":"/user/username/projects/reexport/out","rootDir":"/user/username/projects/reexport/src","watch":true,"configFilePath":"/user/username/projects/reexport/src/pure/tsconfig.json"}
Program files::
/a/lib/lib.d.ts
/user/username/projects/reexport/src/pure/session.ts
/user/username/projects/reexport/src/pure/index.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/reexport/src/pure/session.ts
/user/username/projects/reexport/src/pure/index.ts

Program root files: ["/user/username/projects/reexport/src/main/index.ts"]
Program options: {"outDir":"/user/username/projects/reexport/out","rootDir":"/user/username/projects/reexport/src","watch":true,"configFilePath":"/user/username/projects/reexport/src/main/tsconfig.json"}
Program files::
/a/lib/lib.d.ts
/user/username/projects/reexport/out/pure/session.d.ts
/user/username/projects/reexport/out/pure/index.d.ts
/user/username/projects/reexport/src/main/index.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/reexport/out/pure/session.d.ts
/user/username/projects/reexport/out/pure/index.d.ts
/user/username/projects/reexport/src/main/index.ts

WatchedFiles::
/user/username/projects/reexport/src/pure/tsconfig.json:
  {"fileName":"/user/username/projects/reexport/src/pure/tsconfig.json","pollingInterval":250}
/user/username/projects/reexport/src/pure/index.ts:
  {"fileName":"/user/username/projects/reexport/src/pure/index.ts","pollingInterval":250}
/user/username/projects/reexport/src/pure/session.ts:
  {"fileName":"/user/username/projects/reexport/src/pure/session.ts","pollingInterval":250}
/user/username/projects/reexport/src/main/tsconfig.json:
  {"fileName":"/user/username/projects/reexport/src/main/tsconfig.json","pollingInterval":250}
/user/username/projects/reexport/src/main/index.ts:
  {"fileName":"/user/username/projects/reexport/src/main/index.ts","pollingInterval":250}
/user/username/projects/reexport/src/tsconfig.json:
  {"fileName":"/user/username/projects/reexport/src/tsconfig.json","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/reexport/src/pure:
  {"directoryName":"/user/username/projects/reexport/src/pure","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/reexport/src/main:
  {"directoryName":"/user/username/projects/reexport/src/main","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

Change:: Fix error

//// [/user/username/projects/reexport/src/pure/session.ts]
export interface Session {
  foo: number;
  // bar: number;
}


//// [/user/username/projects/reexport/out/pure/session.js] file written with same contents
//// [/user/username/projects/reexport/out/pure/session.d.ts]
export interface Session {
    foo: number;
}


//// [/user/username/projects/reexport/out/pure/index.js] file written with same contents
//// [/user/username/projects/reexport/out/pure/index.d.ts] file written with same contents
//// [/user/username/projects/reexport/out/pure/tsconfig.tsbuildinfo]
{
  "program": {
    "fileInfos": {
      "../../../../../../a/lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
      },
      "../../src/pure/session.ts": {
        "version": "5375279855-export interface Session {\n  foo: number;\n  // bar: number;\n}\n",
        "signature": "-1218067212-export interface Session {\n    foo: number;\n}\n"
      },
      "../../src/pure/index.ts": {
        "version": "-5356193041-export * from \"./session\";\n",
        "signature": "-5356193041-export * from \"./session\";\n"
      }
    },
    "options": {
      "composite": true,
      "outDir": "..",
      "rootDir": "../../src",
      "watch": true,
      "configFilePath": "../../src/pure/tsconfig.json"
    },
    "referencedMap": {
      "../../src/pure/index.ts": [
        "../../src/pure/session.ts"
      ]
    },
    "exportedModulesMap": {
      "../../src/pure/index.ts": [
        "../../src/pure/session.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../../../../../a/lib/lib.d.ts",
      "../../src/pure/index.ts",
      "../../src/pure/session.ts"
    ]
  },
  "version": "FakeTSVersion"
}

//// [/user/username/projects/reexport/out/main/index.js] file changed its modified time

Output::
>> Screen clear
12:01:29 AM - File change detected. Starting incremental compilation...


12:01:30 AM - Project 'src/pure/tsconfig.json' is out of date because oldest output 'out/pure/index.js' is older than newest input 'src/pure/session.ts'


12:01:31 AM - Building project '/user/username/projects/reexport/src/pure/tsconfig.json'...


12:01:47 AM - Failed to parse file 'src/main/tsconfig.json': Semantic errors.


12:01:48 AM - Building project '/user/username/projects/reexport/src/main/tsconfig.json'...


12:01:50 AM - Updating unchanged output timestamps of project '/user/username/projects/reexport/src/main/tsconfig.json'...



12:01:51 AM - Found 0 errors. Watching for file changes.


Program root files: ["/user/username/projects/reexport/src/pure/index.ts","/user/username/projects/reexport/src/pure/session.ts"]
Program options: {"composite":true,"outDir":"/user/username/projects/reexport/out","rootDir":"/user/username/projects/reexport/src","watch":true,"configFilePath":"/user/username/projects/reexport/src/pure/tsconfig.json"}
Program files::
/a/lib/lib.d.ts
/user/username/projects/reexport/src/pure/session.ts
/user/username/projects/reexport/src/pure/index.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/reexport/src/pure/session.ts
/user/username/projects/reexport/src/pure/index.ts

Program root files: ["/user/username/projects/reexport/src/main/index.ts"]
Program options: {"outDir":"/user/username/projects/reexport/out","rootDir":"/user/username/projects/reexport/src","watch":true,"configFilePath":"/user/username/projects/reexport/src/main/tsconfig.json"}
Program files::
/a/lib/lib.d.ts
/user/username/projects/reexport/out/pure/session.d.ts
/user/username/projects/reexport/out/pure/index.d.ts
/user/username/projects/reexport/src/main/index.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/reexport/out/pure/session.d.ts
/user/username/projects/reexport/out/pure/index.d.ts
/user/username/projects/reexport/src/main/index.ts

WatchedFiles::
/user/username/projects/reexport/src/pure/tsconfig.json:
  {"fileName":"/user/username/projects/reexport/src/pure/tsconfig.json","pollingInterval":250}
/user/username/projects/reexport/src/pure/index.ts:
  {"fileName":"/user/username/projects/reexport/src/pure/index.ts","pollingInterval":250}
/user/username/projects/reexport/src/pure/session.ts:
  {"fileName":"/user/username/projects/reexport/src/pure/session.ts","pollingInterval":250}
/user/username/projects/reexport/src/main/tsconfig.json:
  {"fileName":"/user/username/projects/reexport/src/main/tsconfig.json","pollingInterval":250}
/user/username/projects/reexport/src/main/index.ts:
  {"fileName":"/user/username/projects/reexport/src/main/index.ts","pollingInterval":250}
/user/username/projects/reexport/src/tsconfig.json:
  {"fileName":"/user/username/projects/reexport/src/tsconfig.json","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/reexport/src/pure:
  {"directoryName":"/user/username/projects/reexport/src/pure","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/reexport/src/main:
  {"directoryName":"/user/username/projects/reexport/src/main","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined
