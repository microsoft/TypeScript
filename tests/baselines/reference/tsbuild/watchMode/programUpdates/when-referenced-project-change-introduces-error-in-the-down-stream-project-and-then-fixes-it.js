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

//// [/user/username/projects/sample1/Library/library.ts]

interface SomeObject
{
    message: string;
}

export function createSomeObject(): SomeObject
{
    return {
        message: "new Object"
    };
}

//// [/user/username/projects/sample1/Library/tsconfig.json]
{"compilerOptions":{"composite":true}}

//// [/user/username/projects/sample1/App/app.ts]
import { createSomeObject } from "../Library/library";
createSomeObject().message;

//// [/user/username/projects/sample1/App/tsconfig.json]
{"references":[{"path":"../Library"}]}


/a/lib/tsc.js -b -w App
Output::
>> Screen clear
[[90m12:00:29 AM[0m] Starting compilation in watch mode...


[[90m12:00:38 AM[0m] Found 0 errors. Watching for file changes.



Program root files: ["/user/username/projects/sample1/Library/library.ts"]
Program options: {"composite":true,"watch":true,"configFilePath":"/user/username/projects/sample1/Library/tsconfig.json"}
Program files::
/a/lib/lib.d.ts
/user/username/projects/sample1/Library/library.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/user/username/projects/sample1/Library/library.ts

Program root files: ["/user/username/projects/sample1/App/app.ts"]
Program options: {"watch":true,"configFilePath":"/user/username/projects/sample1/App/tsconfig.json"}
Program files::
/a/lib/lib.d.ts
/user/username/projects/sample1/Library/library.d.ts
/user/username/projects/sample1/App/app.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/user/username/projects/sample1/Library/library.d.ts
/user/username/projects/sample1/App/app.ts

WatchedFiles::
/user/username/projects/sample1/library/tsconfig.json:
  {"fileName":"/user/username/projects/sample1/Library/tsconfig.json","pollingInterval":250}
/user/username/projects/sample1/library/library.ts:
  {"fileName":"/user/username/projects/sample1/Library/library.ts","pollingInterval":250}
/user/username/projects/sample1/app/tsconfig.json:
  {"fileName":"/user/username/projects/sample1/App/tsconfig.json","pollingInterval":250}
/user/username/projects/sample1/app/app.ts:
  {"fileName":"/user/username/projects/sample1/App/app.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/sample1/library:
  {"directoryName":"/user/username/projects/sample1/library","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/sample1/app:
  {"directoryName":"/user/username/projects/sample1/app","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

//// [/user/username/projects/sample1/Library/library.js]
"use strict";
exports.__esModule = true;
exports.createSomeObject = void 0;
function createSomeObject() {
    return {
        message: "new Object"
    };
}
exports.createSomeObject = createSomeObject;


//// [/user/username/projects/sample1/Library/library.d.ts]
interface SomeObject {
    message: string;
}
export declare function createSomeObject(): SomeObject;
export {};


//// [/user/username/projects/sample1/Library/tsconfig.tsbuildinfo]
{
  "program": {
    "fileInfos": {
      "../../../../../a/lib/lib.d.ts": {
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true
      },
      "./library.ts": {
        "version": "5256469508-\ninterface SomeObject\n{\n    message: string;\n}\n\nexport function createSomeObject(): SomeObject\n{\n    return {\n        message: \"new Object\"\n    };\n}",
        "signature": "-18933614215-interface SomeObject {\n    message: string;\n}\nexport declare function createSomeObject(): SomeObject;\nexport {};\n",
        "affectsGlobalScope": false
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
      "../../../../../a/lib/lib.d.ts",
      "./library.ts"
    ]
  },
  "version": "FakeTSVersion"
}

//// [/user/username/projects/sample1/App/app.js]
"use strict";
exports.__esModule = true;
var library_1 = require("../Library/library");
library_1.createSomeObject().message;



Change:: Introduce error

Input::
//// [/user/username/projects/sample1/Library/library.ts]

interface SomeObject
{
    message2: string;
}

export function createSomeObject(): SomeObject
{
    return {
        message2: "new Object"
    };
}


Output::
>> Screen clear
[[90m12:00:42 AM[0m] File change detected. Starting incremental compilation...


[96mApp/app.ts[0m:[93m2[0m:[93m20[0m - [91merror[0m[90m TS2551: [0mProperty 'message' does not exist on type 'SomeObject'. Did you mean 'message2'?

[7m2[0m createSomeObject().message;
[7m [0m [91m                   ~~~~~~~[0m

  [96mLibrary/library.d.ts[0m:[93m2[0m:[93m5[0m
    [7m2[0m     message2: string;
    [7m [0m [96m    ~~~~~~~~[0m
    'message2' is declared here.


[[90m12:00:52 AM[0m] Found 1 error. Watching for file changes.



Program root files: ["/user/username/projects/sample1/Library/library.ts"]
Program options: {"composite":true,"watch":true,"configFilePath":"/user/username/projects/sample1/Library/tsconfig.json"}
Program files::
/a/lib/lib.d.ts
/user/username/projects/sample1/Library/library.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/sample1/Library/library.ts

Program root files: ["/user/username/projects/sample1/App/app.ts"]
Program options: {"watch":true,"configFilePath":"/user/username/projects/sample1/App/tsconfig.json"}
Program files::
/a/lib/lib.d.ts
/user/username/projects/sample1/Library/library.d.ts
/user/username/projects/sample1/App/app.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/sample1/Library/library.d.ts
/user/username/projects/sample1/App/app.ts

WatchedFiles::
/user/username/projects/sample1/library/tsconfig.json:
  {"fileName":"/user/username/projects/sample1/Library/tsconfig.json","pollingInterval":250}
/user/username/projects/sample1/library/library.ts:
  {"fileName":"/user/username/projects/sample1/Library/library.ts","pollingInterval":250}
/user/username/projects/sample1/app/tsconfig.json:
  {"fileName":"/user/username/projects/sample1/App/tsconfig.json","pollingInterval":250}
/user/username/projects/sample1/app/app.ts:
  {"fileName":"/user/username/projects/sample1/App/app.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/sample1/library:
  {"directoryName":"/user/username/projects/sample1/library","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/sample1/app:
  {"directoryName":"/user/username/projects/sample1/app","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

//// [/user/username/projects/sample1/Library/library.js]
"use strict";
exports.__esModule = true;
exports.createSomeObject = void 0;
function createSomeObject() {
    return {
        message2: "new Object"
    };
}
exports.createSomeObject = createSomeObject;


//// [/user/username/projects/sample1/Library/library.d.ts]
interface SomeObject {
    message2: string;
}
export declare function createSomeObject(): SomeObject;
export {};


//// [/user/username/projects/sample1/Library/tsconfig.tsbuildinfo]
{
  "program": {
    "fileInfos": {
      "../../../../../a/lib/lib.d.ts": {
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true
      },
      "./library.ts": {
        "version": "-9741349880-\ninterface SomeObject\n{\n    message2: string;\n}\n\nexport function createSomeObject(): SomeObject\n{\n    return {\n        message2: \"new Object\"\n    };\n}",
        "signature": "1956297931-interface SomeObject {\n    message2: string;\n}\nexport declare function createSomeObject(): SomeObject;\nexport {};\n",
        "affectsGlobalScope": false
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
      "../../../../../a/lib/lib.d.ts",
      "./library.ts"
    ]
  },
  "version": "FakeTSVersion"
}


Change:: Fix error

Input::
//// [/user/username/projects/sample1/Library/library.ts]

interface SomeObject
{
    message: string;
}

export function createSomeObject(): SomeObject
{
    return {
        message: "new Object"
    };
}


Output::
>> Screen clear
[[90m12:00:56 AM[0m] File change detected. Starting incremental compilation...


[[90m12:01:09 AM[0m] Found 0 errors. Watching for file changes.



Program root files: ["/user/username/projects/sample1/Library/library.ts"]
Program options: {"composite":true,"watch":true,"configFilePath":"/user/username/projects/sample1/Library/tsconfig.json"}
Program files::
/a/lib/lib.d.ts
/user/username/projects/sample1/Library/library.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/sample1/Library/library.ts

Program root files: ["/user/username/projects/sample1/App/app.ts"]
Program options: {"watch":true,"configFilePath":"/user/username/projects/sample1/App/tsconfig.json"}
Program files::
/a/lib/lib.d.ts
/user/username/projects/sample1/Library/library.d.ts
/user/username/projects/sample1/App/app.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/sample1/Library/library.d.ts
/user/username/projects/sample1/App/app.ts

WatchedFiles::
/user/username/projects/sample1/library/tsconfig.json:
  {"fileName":"/user/username/projects/sample1/Library/tsconfig.json","pollingInterval":250}
/user/username/projects/sample1/library/library.ts:
  {"fileName":"/user/username/projects/sample1/Library/library.ts","pollingInterval":250}
/user/username/projects/sample1/app/tsconfig.json:
  {"fileName":"/user/username/projects/sample1/App/tsconfig.json","pollingInterval":250}
/user/username/projects/sample1/app/app.ts:
  {"fileName":"/user/username/projects/sample1/App/app.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/sample1/library:
  {"directoryName":"/user/username/projects/sample1/library","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/sample1/app:
  {"directoryName":"/user/username/projects/sample1/app","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

//// [/user/username/projects/sample1/Library/library.js]
"use strict";
exports.__esModule = true;
exports.createSomeObject = void 0;
function createSomeObject() {
    return {
        message: "new Object"
    };
}
exports.createSomeObject = createSomeObject;


//// [/user/username/projects/sample1/Library/library.d.ts]
interface SomeObject {
    message: string;
}
export declare function createSomeObject(): SomeObject;
export {};


//// [/user/username/projects/sample1/Library/tsconfig.tsbuildinfo]
{
  "program": {
    "fileInfos": {
      "../../../../../a/lib/lib.d.ts": {
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true
      },
      "./library.ts": {
        "version": "5256469508-\ninterface SomeObject\n{\n    message: string;\n}\n\nexport function createSomeObject(): SomeObject\n{\n    return {\n        message: \"new Object\"\n    };\n}",
        "signature": "-18933614215-interface SomeObject {\n    message: string;\n}\nexport declare function createSomeObject(): SomeObject;\nexport {};\n",
        "affectsGlobalScope": false
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
      "../../../../../a/lib/lib.d.ts",
      "./library.ts"
    ]
  },
  "version": "FakeTSVersion"
}

//// [/user/username/projects/sample1/App/app.js] file written with same contents
