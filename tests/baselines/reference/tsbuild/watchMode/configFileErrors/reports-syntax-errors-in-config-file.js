/a/lib/tsc.js --b -w
//// [/user/username/projects/myproject/a.ts]
export function foo() { }

//// [/user/username/projects/myproject/b.ts]
export function bar() { }

//// [/user/username/projects/myproject/tsconfig.json]
{
    "compilerOptions": {
        "composite": true,
    },
    "files": [
        "a.ts"
        "b.ts"
    ]
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

//// [/user/username/projects/myproject/a.js]
"use strict";
exports.__esModule = true;
function foo() { }
exports.foo = foo;


//// [/user/username/projects/myproject/a.d.ts]
export declare function foo(): void;


//// [/user/username/projects/myproject/b.js]
"use strict";
exports.__esModule = true;
function bar() { }
exports.bar = bar;


//// [/user/username/projects/myproject/b.d.ts]
export declare function bar(): void;


//// [/user/username/projects/myproject/tsconfig.tsbuildinfo]
{
  "program": {
    "fileInfos": {
      "../../../../a/lib/lib.d.ts": {
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
      },
      "./a.ts": {
        "version": "4646078106-export function foo() { }",
        "signature": "-5677608893-export declare function foo(): void;\n"
      },
      "./b.ts": {
        "version": "1045484683-export function bar() { }",
        "signature": "-2904461644-export declare function bar(): void;\n"
      }
    },
    "options": {
      "composite": true,
      "watch": true,
      "configFilePath": "./tsconfig.json"
    },
    "referencedMap": {},
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../../a/lib/lib.d.ts",
      "./a.ts",
      "./b.ts"
    ]
  },
  "version": "FakeTSVersion"
}


Output::
>> Screen clear
12:00:23 AM - Starting compilation in watch mode...



12:00:34 AM - Found 0 errors. Watching for file changes.


Program root files: ["/user/username/projects/myproject/a.ts","/user/username/projects/myproject/b.ts"]
Program options: {"composite":true,"watch":true,"configFilePath":"/user/username/projects/myproject/tsconfig.json"}
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/a.ts
/user/username/projects/myproject/b.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/user/username/projects/myproject/a.ts
/user/username/projects/myproject/b.ts

WatchedFiles::
/user/username/projects/myproject/tsconfig.json:
  {"pollingInterval":250}
/user/username/projects/myproject/a.ts:
  {"pollingInterval":250}
/user/username/projects/myproject/b.ts:
  {"pollingInterval":250}

FsWatches::

FsWatchesRecursive::

exitCode:: ExitStatus.undefined

Change:: reports syntax errors after change to config file

//// [/user/username/projects/myproject/tsconfig.json]
{
    "compilerOptions": {
        "composite": true,
        "declaration": true,
    },
    "files": [
        "a.ts"
        "b.ts"
    ]
}

//// [/user/username/projects/myproject/a.js] file written with same contents
//// [/user/username/projects/myproject/a.d.ts] file written with same contents
//// [/user/username/projects/myproject/b.js] file written with same contents
//// [/user/username/projects/myproject/b.d.ts] file written with same contents
//// [/user/username/projects/myproject/tsconfig.tsbuildinfo]
{
  "program": {
    "fileInfos": {
      "../../../../a/lib/lib.d.ts": {
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
      },
      "./a.ts": {
        "version": "4646078106-export function foo() { }",
        "signature": "-5677608893-export declare function foo(): void;\n"
      },
      "./b.ts": {
        "version": "1045484683-export function bar() { }",
        "signature": "-2904461644-export declare function bar(): void;\n"
      }
    },
    "options": {
      "composite": true,
      "declaration": true,
      "watch": true,
      "configFilePath": "./tsconfig.json"
    },
    "referencedMap": {},
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../../a/lib/lib.d.ts",
      "./a.ts",
      "./b.ts"
    ]
  },
  "version": "FakeTSVersion"
}


Output::
>> Screen clear
12:00:38 AM - File change detected. Starting incremental compilation...



12:00:54 AM - Found 0 errors. Watching for file changes.


Program root files: ["/user/username/projects/myproject/a.ts","/user/username/projects/myproject/b.ts"]
Program options: {"composite":true,"declaration":true,"watch":true,"configFilePath":"/user/username/projects/myproject/tsconfig.json"}
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/a.ts
/user/username/projects/myproject/b.ts

Semantic diagnostics in builder refreshed for::

WatchedFiles::
/user/username/projects/myproject/tsconfig.json:
  {"pollingInterval":250}
/user/username/projects/myproject/a.ts:
  {"pollingInterval":250}
/user/username/projects/myproject/b.ts:
  {"pollingInterval":250}

FsWatches::

FsWatchesRecursive::

exitCode:: ExitStatus.undefined

Change:: reports syntax errors after change to ts file

//// [/user/username/projects/myproject/a.ts]
export function fooBar() { }

//// [/user/username/projects/myproject/a.js]
"use strict";
exports.__esModule = true;
function fooBar() { }
exports.fooBar = fooBar;


//// [/user/username/projects/myproject/a.d.ts]
export declare function fooBar(): void;


//// [/user/username/projects/myproject/b.js] file changed its modified time
//// [/user/username/projects/myproject/b.d.ts] file changed its modified time
//// [/user/username/projects/myproject/tsconfig.tsbuildinfo]
{
  "program": {
    "fileInfos": {
      "../../../../a/lib/lib.d.ts": {
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
      },
      "./a.ts": {
        "version": "-3260843409-export function fooBar() { }",
        "signature": "-6611919720-export declare function fooBar(): void;\n"
      },
      "./b.ts": {
        "version": "1045484683-export function bar() { }",
        "signature": "-2904461644-export declare function bar(): void;\n"
      }
    },
    "options": {
      "composite": true,
      "declaration": true,
      "watch": true,
      "configFilePath": "./tsconfig.json"
    },
    "referencedMap": {},
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../../a/lib/lib.d.ts",
      "./a.ts",
      "./b.ts"
    ]
  },
  "version": "FakeTSVersion"
}


Output::
>> Screen clear
12:00:58 AM - File change detected. Starting incremental compilation...



12:01:09 AM - Found 0 errors. Watching for file changes.


Program root files: ["/user/username/projects/myproject/a.ts","/user/username/projects/myproject/b.ts"]
Program options: {"composite":true,"declaration":true,"watch":true,"configFilePath":"/user/username/projects/myproject/tsconfig.json"}
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/a.ts
/user/username/projects/myproject/b.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/myproject/a.ts

WatchedFiles::
/user/username/projects/myproject/tsconfig.json:
  {"pollingInterval":250}
/user/username/projects/myproject/a.ts:
  {"pollingInterval":250}
/user/username/projects/myproject/b.ts:
  {"pollingInterval":250}

FsWatches::

FsWatchesRecursive::

exitCode:: ExitStatus.undefined

Change:: reports error when there is no change to tsconfig file

//// [/user/username/projects/myproject/tsconfig.json] file written with same contents
//// [/user/username/projects/myproject/a.js] file changed its modified time
//// [/user/username/projects/myproject/a.d.ts] file changed its modified time
//// [/user/username/projects/myproject/b.js] file changed its modified time
//// [/user/username/projects/myproject/b.d.ts] file changed its modified time
//// [/user/username/projects/myproject/tsconfig.tsbuildinfo] file changed its modified time

Output::
>> Screen clear
12:01:13 AM - File change detected. Starting incremental compilation...



12:01:15 AM - Found 0 errors. Watching for file changes.


Program root files: ["/user/username/projects/myproject/a.ts","/user/username/projects/myproject/b.ts"]
Program options: {"composite":true,"declaration":true,"watch":true,"configFilePath":"/user/username/projects/myproject/tsconfig.json"}
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/a.ts
/user/username/projects/myproject/b.ts

Semantic diagnostics in builder refreshed for::

WatchedFiles::
/user/username/projects/myproject/tsconfig.json:
  {"pollingInterval":250}
/user/username/projects/myproject/a.ts:
  {"pollingInterval":250}
/user/username/projects/myproject/b.ts:
  {"pollingInterval":250}

FsWatches::

FsWatchesRecursive::

exitCode:: ExitStatus.undefined

Change:: builds after fixing config file errors

//// [/user/username/projects/myproject/tsconfig.json]
{"compilerOptions":{"composite":true,"declaration":true},"files":["a.ts","b.ts"]}

//// [/user/username/projects/myproject/a.js] file changed its modified time
//// [/user/username/projects/myproject/a.d.ts] file changed its modified time
//// [/user/username/projects/myproject/b.js] file changed its modified time
//// [/user/username/projects/myproject/b.d.ts] file changed its modified time
//// [/user/username/projects/myproject/tsconfig.tsbuildinfo] file changed its modified time

Output::
>> Screen clear
12:01:19 AM - File change detected. Starting incremental compilation...



12:01:21 AM - Found 0 errors. Watching for file changes.


Program root files: ["/user/username/projects/myproject/a.ts","/user/username/projects/myproject/b.ts"]
Program options: {"composite":true,"declaration":true,"watch":true,"configFilePath":"/user/username/projects/myproject/tsconfig.json"}
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/a.ts
/user/username/projects/myproject/b.ts

Semantic diagnostics in builder refreshed for::

WatchedFiles::
/user/username/projects/myproject/tsconfig.json:
  {"pollingInterval":250}
/user/username/projects/myproject/a.ts:
  {"pollingInterval":250}
/user/username/projects/myproject/b.ts:
  {"pollingInterval":250}

FsWatches::

FsWatchesRecursive::

exitCode:: ExitStatus.undefined
