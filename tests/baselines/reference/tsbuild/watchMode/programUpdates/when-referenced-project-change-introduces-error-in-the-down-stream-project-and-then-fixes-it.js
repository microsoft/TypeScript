/a/lib/tsc.js -b -w App
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

//// [/user/username/projects/sample1/Library/library.js]
"use strict";
exports.__esModule = true;
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
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
      },
      "./library.ts": {
        "version": "5256469508-\ninterface SomeObject\n{\n    message: string;\n}\n\nexport function createSomeObject(): SomeObject\n{\n    return {\n        message: \"new Object\"\n    };\n}",
        "signature": "-18933614215-interface SomeObject {\n    message: string;\n}\nexport declare function createSomeObject(): SomeObject;\nexport {};\n"
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



Output::
>> Screen clear
12:00:29 AM - Starting compilation in watch mode...



12:00:38 AM - Found 0 errors. Watching for file changes.


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

Change:: Introduce error

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

//// [/user/username/projects/sample1/Library/library.js]
"use strict";
exports.__esModule = true;
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
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
      },
      "./library.ts": {
        "version": "-9741349880-\ninterface SomeObject\n{\n    message2: string;\n}\n\nexport function createSomeObject(): SomeObject\n{\n    return {\n        message2: \"new Object\"\n    };\n}",
        "signature": "1956297931-interface SomeObject {\n    message2: string;\n}\nexport declare function createSomeObject(): SomeObject;\nexport {};\n"
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


Output::
>> Screen clear
12:00:42 AM - File change detected. Starting incremental compilation...


App/app.ts(2,20): error TS2551: Property 'message' does not exist on type 'SomeObject'. Did you mean 'message2'?


12:00:52 AM - Found 1 error. Watching for file changes.


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

Change:: Fix error

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

//// [/user/username/projects/sample1/Library/library.js]
"use strict";
exports.__esModule = true;
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
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
      },
      "./library.ts": {
        "version": "5256469508-\ninterface SomeObject\n{\n    message: string;\n}\n\nexport function createSomeObject(): SomeObject\n{\n    return {\n        message: \"new Object\"\n    };\n}",
        "signature": "-18933614215-interface SomeObject {\n    message: string;\n}\nexport declare function createSomeObject(): SomeObject;\nexport {};\n"
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

Output::
>> Screen clear
12:00:56 AM - File change detected. Starting incremental compilation...



12:01:09 AM - Found 0 errors. Watching for file changes.


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
