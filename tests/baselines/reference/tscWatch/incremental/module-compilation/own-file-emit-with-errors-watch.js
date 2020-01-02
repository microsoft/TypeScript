/a/lib/tsc.js -w
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

//// [/users/username/projects/project/file1.ts]
export const x = 10;

//// [/users/username/projects/project/file2.ts]
export const y: string = 20;

//// [/users/username/projects/project/tsconfig.json]
{"compilerOptions":{"incremental":true,"module":"amd"}}

//// [/users/username/projects/project/file1.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.x = 10;
});


//// [/users/username/projects/project/file2.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.y = 20;
});


//// [/users/username/projects/project/tsconfig.tsbuildinfo]
{
  "program": {
    "fileInfos": {
      "../../../../a/lib/lib.d.ts": {
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
      },
      "./file1.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n"
      },
      "./file2.ts": {
        "version": "-13939690350-export const y: string = 20;",
        "signature": "-7924398419-export declare const y: string;\n"
      }
    },
    "options": {
      "incremental": true,
      "module": 2,
      "watch": true,
      "configFilePath": "./tsconfig.json"
    },
    "referencedMap": {},
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../../a/lib/lib.d.ts",
      "./file1.ts",
      [
        "./file2.ts",
        [
          {
            "file": "./file2.ts",
            "start": 13,
            "length": 1,
            "code": 2322,
            "category": 1,
            "messageText": "Type '20' is not assignable to type 'string'."
          }
        ]
      ]
    ]
  },
  "version": "FakeTSVersion"
}


Output::
>> Screen clear
12:00:23 AM - Starting compilation in watch mode...


file2.ts(1,14): error TS2322: Type '20' is not assignable to type 'string'.


12:00:30 AM - Found 1 error. Watching for file changes.


Program root files: ["/users/username/projects/project/file1.ts","/users/username/projects/project/file2.ts"]
Program options: {"incremental":true,"module":2,"watch":true,"configFilePath":"/users/username/projects/project/tsconfig.json"}
Program files::
/a/lib/lib.d.ts
/users/username/projects/project/file1.ts
/users/username/projects/project/file2.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/users/username/projects/project/file1.ts
/users/username/projects/project/file2.ts

WatchedFiles::
/users/username/projects/project/tsconfig.json:
  {"pollingInterval":250}
/users/username/projects/project/file1.ts:
  {"pollingInterval":250}
/users/username/projects/project/file2.ts:
  {"pollingInterval":250}
/a/lib/lib.d.ts:
  {"pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/users/username/projects/project/node_modules/@types:
  {"fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/users/username/projects/project:
  {"fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

Change::

//// [/users/username/projects/project/file1.ts]
export const z = 10;

//// [/users/username/projects/project/file1.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.z = 10;
});


//// [/users/username/projects/project/tsconfig.tsbuildinfo]
{
  "program": {
    "fileInfos": {
      "../../../../a/lib/lib.d.ts": {
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
      },
      "./file1.ts": {
        "version": "-12438487295-export const z = 10;",
        "signature": "-7483702853-export declare const z = 10;\n"
      },
      "./file2.ts": {
        "version": "-13939690350-export const y: string = 20;",
        "signature": "-7924398419-export declare const y: string;\n"
      }
    },
    "options": {
      "incremental": true,
      "module": 2,
      "watch": true,
      "configFilePath": "./tsconfig.json"
    },
    "referencedMap": {},
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../../a/lib/lib.d.ts",
      "./file1.ts",
      [
        "./file2.ts",
        [
          {
            "file": "./file2.ts",
            "start": 13,
            "length": 1,
            "code": 2322,
            "category": 1,
            "messageText": "Type '20' is not assignable to type 'string'."
          }
        ]
      ]
    ]
  },
  "version": "FakeTSVersion"
}


Output::
>> Screen clear
12:00:34 AM - Starting compilation in watch mode...


file2.ts(1,14): error TS2322: Type '20' is not assignable to type 'string'.


12:00:41 AM - Found 1 error. Watching for file changes.


Program root files: ["/users/username/projects/project/file1.ts","/users/username/projects/project/file2.ts"]
Program options: {"incremental":true,"module":2,"watch":true,"configFilePath":"/users/username/projects/project/tsconfig.json"}
Program files::
/a/lib/lib.d.ts
/users/username/projects/project/file1.ts
/users/username/projects/project/file2.ts

Semantic diagnostics in builder refreshed for::
/users/username/projects/project/file1.ts

WatchedFiles::
/users/username/projects/project/tsconfig.json:
  {"pollingInterval":250}
/users/username/projects/project/file1.ts:
  {"pollingInterval":250}
/users/username/projects/project/file2.ts:
  {"pollingInterval":250}
/a/lib/lib.d.ts:
  {"pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/users/username/projects/project/node_modules/@types:
  {"fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/users/username/projects/project:
  {"fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined
