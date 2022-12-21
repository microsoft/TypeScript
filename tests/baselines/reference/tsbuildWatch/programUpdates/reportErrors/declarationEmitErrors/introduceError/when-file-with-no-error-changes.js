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

[[90m12:00:39 AM[0m] Found 0 errors. Watching for file changes.



Program root files: ["/user/username/projects/solution/app/fileWithError.ts","/user/username/projects/solution/app/fileWithoutError.ts"]
Program options: {"composite":true,"watch":true,"configFilePath":"/user/username/projects/solution/app/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/solution/app/fileWithError.ts
/user/username/projects/solution/app/fileWithoutError.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/user/username/projects/solution/app/fileWithError.ts
/user/username/projects/solution/app/fileWithoutError.ts

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/user/username/projects/solution/app/filewitherror.ts (computed .d.ts during emit)
/user/username/projects/solution/app/filewithouterror.ts (computed .d.ts during emit)

PolledWatches::

FsWatches::
/user/username/projects/solution/app/tsconfig.json:
  {}
/user/username/projects/solution/app/filewitherror.ts:
  {}
/user/username/projects/solution/app/filewithouterror.ts:
  {}

FsWatchesRecursive::
/user/username/projects/solution/app:
  {}

exitCode:: ExitStatus.undefined

//// [/user/username/projects/solution/app/fileWithError.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
Object.defineProperty(exports, "__esModule", { value: true });
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
{"program":{"fileNames":["../../../../../a/lib/lib.d.ts","./filewitherror.ts","./filewithouterror.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},{"version":"-8106435186-export var myClassWithError = class {\n        tags() { }\n        \n    };","signature":"6892461904-export declare var myClassWithError: {\n    new (): {\n        tags(): void;\n    };\n};\n"},{"version":"-11785903855-export class myClass { }","signature":"-7432826827-export declare class myClass {\n}\n"}],"options":{"composite":true},"referencedMap":[],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,2,3],"latestChangedDtsFile":"./fileWithoutError.d.ts"},"version":"FakeTSVersion"}

//// [/user/username/projects/solution/app/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../../a/lib/lib.d.ts",
      "./filewitherror.ts",
      "./filewithouterror.ts"
    ],
    "fileInfos": {
      "../../../../../a/lib/lib.d.ts": {
        "original": {
          "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
          "affectsGlobalScope": true
        },
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true
      },
      "./filewitherror.ts": {
        "original": {
          "version": "-8106435186-export var myClassWithError = class {\n        tags() { }\n        \n    };",
          "signature": "6892461904-export declare var myClassWithError: {\n    new (): {\n        tags(): void;\n    };\n};\n"
        },
        "version": "-8106435186-export var myClassWithError = class {\n        tags() { }\n        \n    };",
        "signature": "6892461904-export declare var myClassWithError: {\n    new (): {\n        tags(): void;\n    };\n};\n"
      },
      "./filewithouterror.ts": {
        "original": {
          "version": "-11785903855-export class myClass { }",
          "signature": "-7432826827-export declare class myClass {\n}\n"
        },
        "version": "-11785903855-export class myClass { }",
        "signature": "-7432826827-export declare class myClass {\n}\n"
      }
    },
    "options": {
      "composite": true
    },
    "referencedMap": {},
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../../../a/lib/lib.d.ts",
      "./filewitherror.ts",
      "./filewithouterror.ts"
    ],
    "latestChangedDtsFile": "./fileWithoutError.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 1033
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
[[90m12:00:43 AM[0m] File change detected. Starting incremental compilation...

[96mapp/fileWithError.ts[0m:[93m1[0m:[93m12[0m - [91merror[0m[90m TS4094: [0mProperty 'p' of exported class expression may not be private or protected.

[7m1[0m export var myClassWithError = class {
[7m [0m [91m           ~~~~~~~~~~~~~~~~[0m

[[90m12:00:44 AM[0m] Found 1 error. Watching for file changes.



Program root files: ["/user/username/projects/solution/app/fileWithError.ts","/user/username/projects/solution/app/fileWithoutError.ts"]
Program options: {"composite":true,"watch":true,"configFilePath":"/user/username/projects/solution/app/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/solution/app/fileWithError.ts
/user/username/projects/solution/app/fileWithoutError.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/solution/app/fileWithError.ts

Shape signatures in builder refreshed for::
/user/username/projects/solution/app/filewitherror.ts (computed .d.ts)

PolledWatches::

FsWatches::
/user/username/projects/solution/app/tsconfig.json:
  {}
/user/username/projects/solution/app/filewitherror.ts:
  {}
/user/username/projects/solution/app/filewithouterror.ts:
  {}

FsWatchesRecursive::
/user/username/projects/solution/app:
  {}

exitCode:: ExitStatus.undefined


Change:: Change fileWithoutError

Input::
//// [/user/username/projects/solution/app/fileWithoutError.ts]
export class myClass2 { }


Output::
>> Screen clear
[[90m12:00:48 AM[0m] File change detected. Starting incremental compilation...

[96mapp/fileWithError.ts[0m:[93m1[0m:[93m12[0m - [91merror[0m[90m TS4094: [0mProperty 'p' of exported class expression may not be private or protected.

[7m1[0m export var myClassWithError = class {
[7m [0m [91m           ~~~~~~~~~~~~~~~~[0m

[[90m12:00:49 AM[0m] Found 1 error. Watching for file changes.



Program root files: ["/user/username/projects/solution/app/fileWithError.ts","/user/username/projects/solution/app/fileWithoutError.ts"]
Program options: {"composite":true,"watch":true,"configFilePath":"/user/username/projects/solution/app/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/solution/app/fileWithError.ts
/user/username/projects/solution/app/fileWithoutError.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/solution/app/fileWithoutError.ts

Shape signatures in builder refreshed for::
/user/username/projects/solution/app/filewithouterror.ts (computed .d.ts)

PolledWatches::

FsWatches::
/user/username/projects/solution/app/tsconfig.json:
  {}
/user/username/projects/solution/app/filewitherror.ts:
  {}
/user/username/projects/solution/app/filewithouterror.ts:
  {}

FsWatchesRecursive::
/user/username/projects/solution/app:
  {}

exitCode:: ExitStatus.undefined

