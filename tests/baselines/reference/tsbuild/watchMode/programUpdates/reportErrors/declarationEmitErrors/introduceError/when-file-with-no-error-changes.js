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

//// [/user/username/projects/solution/app/fileWithError.ts]
export var myClassWithError = class {
        tags() { }
        
    };

//// [/user/username/projects/solution/app/fileWithoutError.ts]
export class myClass { }

//// [/user/username/projects/solution/app/tsconfig.json]
{"compilerOptions":{"composite":true}}


/a/lib/tsc.js -b -w app
Output::
>> Screen clear
[[90m12:00:25 AM[0m] Starting compilation in watch mode...


[[90m12:00:36 AM[0m] Found 0 errors. Watching for file changes.



Program root files: ["/user/username/projects/solution/app/fileWithError.ts","/user/username/projects/solution/app/fileWithoutError.ts"]
Program options: {"composite":true,"watch":true,"configFilePath":"/user/username/projects/solution/app/tsconfig.json"}
Program files::
/a/lib/lib.d.ts
/user/username/projects/solution/app/fileWithError.ts
/user/username/projects/solution/app/fileWithoutError.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/user/username/projects/solution/app/fileWithError.ts
/user/username/projects/solution/app/fileWithoutError.ts

WatchedFiles::
/user/username/projects/solution/app/tsconfig.json:
  {"fileName":"/user/username/projects/solution/app/tsconfig.json","pollingInterval":250}
/user/username/projects/solution/app/filewitherror.ts:
  {"fileName":"/user/username/projects/solution/app/fileWithError.ts","pollingInterval":250}
/user/username/projects/solution/app/filewithouterror.ts:
  {"fileName":"/user/username/projects/solution/app/fileWithoutError.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/solution/app:
  {"directoryName":"/user/username/projects/solution/app","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

//// [/user/username/projects/solution/app/fileWithError.js]
"use strict";
exports.__esModule = true;
exports.myClassWithError = void 0;
exports.myClassWithError = /** @class */ (function () {
    function myClassWithError() {
    }
    myClassWithError.prototype.tags = function () { };
    return myClassWithError;
}());


//// [/user/username/projects/solution/app/fileWithError.d.ts]
export declare var myClassWithError: {
    new (): {
        tags(): void;
    };
};


//// [/user/username/projects/solution/app/fileWithoutError.js]
"use strict";
exports.__esModule = true;
exports.myClass = void 0;
var myClass = /** @class */ (function () {
    function myClass() {
    }
    return myClass;
}());
exports.myClass = myClass;


//// [/user/username/projects/solution/app/fileWithoutError.d.ts]
export declare class myClass {
}


//// [/user/username/projects/solution/app/tsconfig.tsbuildinfo]
{
  "program": {
    "fileInfos": {
      "../../../../../a/lib/lib.d.ts": {
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true
      },
      "./filewitherror.ts": {
        "version": "-8106435186-export var myClassWithError = class {\n        tags() { }\n        \n    };",
        "signature": "6892461904-export declare var myClassWithError: {\n    new (): {\n        tags(): void;\n    };\n};\n",
        "affectsGlobalScope": false
      },
      "./filewithouterror.ts": {
        "version": "-11785903855-export class myClass { }",
        "signature": "-7432826827-export declare class myClass {\n}\n",
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
      "./filewitherror.ts",
      "./filewithouterror.ts"
    ]
  },
  "version": "FakeTSVersion"
}


Change:: Introduce error

Input::
//// [/user/username/projects/solution/app/fileWithError.ts]
export var myClassWithError = class {
        tags() { }
        private p = 12
    };


Output::
>> Screen clear
[[90m12:00:40 AM[0m] File change detected. Starting incremental compilation...


[96mapp/fileWithError.ts[0m:[93m1[0m:[93m12[0m - [91merror[0m[90m TS4094: [0mProperty 'p' of exported class expression may not be private or protected.

[7m1[0m export var myClassWithError = class {
[7m [0m [91m           ~~~~~~~~~~~~~~~~[0m


[[90m12:00:41 AM[0m] Found 1 error. Watching for file changes.



Program root files: ["/user/username/projects/solution/app/fileWithError.ts","/user/username/projects/solution/app/fileWithoutError.ts"]
Program options: {"composite":true,"watch":true,"configFilePath":"/user/username/projects/solution/app/tsconfig.json"}
Program files::
/a/lib/lib.d.ts
/user/username/projects/solution/app/fileWithError.ts
/user/username/projects/solution/app/fileWithoutError.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/solution/app/fileWithError.ts

WatchedFiles::
/user/username/projects/solution/app/tsconfig.json:
  {"fileName":"/user/username/projects/solution/app/tsconfig.json","pollingInterval":250}
/user/username/projects/solution/app/filewitherror.ts:
  {"fileName":"/user/username/projects/solution/app/fileWithError.ts","pollingInterval":250}
/user/username/projects/solution/app/filewithouterror.ts:
  {"fileName":"/user/username/projects/solution/app/fileWithoutError.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/solution/app:
  {"directoryName":"/user/username/projects/solution/app","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined


Change:: Change fileWithoutError

Input::
//// [/user/username/projects/solution/app/fileWithoutError.ts]
export class myClass2 { }


Output::
>> Screen clear
[[90m12:00:45 AM[0m] File change detected. Starting incremental compilation...


[96mapp/fileWithError.ts[0m:[93m1[0m:[93m12[0m - [91merror[0m[90m TS4094: [0mProperty 'p' of exported class expression may not be private or protected.

[7m1[0m export var myClassWithError = class {
[7m [0m [91m           ~~~~~~~~~~~~~~~~[0m


[[90m12:00:46 AM[0m] Found 1 error. Watching for file changes.



Program root files: ["/user/username/projects/solution/app/fileWithError.ts","/user/username/projects/solution/app/fileWithoutError.ts"]
Program options: {"composite":true,"watch":true,"configFilePath":"/user/username/projects/solution/app/tsconfig.json"}
Program files::
/a/lib/lib.d.ts
/user/username/projects/solution/app/fileWithError.ts
/user/username/projects/solution/app/fileWithoutError.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/solution/app/fileWithoutError.ts

WatchedFiles::
/user/username/projects/solution/app/tsconfig.json:
  {"fileName":"/user/username/projects/solution/app/tsconfig.json","pollingInterval":250}
/user/username/projects/solution/app/filewitherror.ts:
  {"fileName":"/user/username/projects/solution/app/fileWithError.ts","pollingInterval":250}
/user/username/projects/solution/app/filewithouterror.ts:
  {"fileName":"/user/username/projects/solution/app/fileWithoutError.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/solution/app:
  {"directoryName":"/user/username/projects/solution/app","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

