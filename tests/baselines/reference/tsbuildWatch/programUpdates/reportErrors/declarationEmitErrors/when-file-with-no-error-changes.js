currentDirectory:: /user/username/projects/solution useCaseSensitiveFileNames:: false
Input::
//// [/user/username/projects/solution/app/fileWithError.ts]
export var myClassWithError = class {
        tags() { }
        private p = 12
    };

//// [/user/username/projects/solution/app/fileWithoutError.ts]
export class myClass { }

//// [/user/username/projects/solution/app/tsconfig.json]
{
  "compilerOptions": {
    "composite": true
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


/home/src/tslibs/TS/Lib/tsc.js -b -w app
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] Starting compilation in watch mode...

[96mapp/fileWithError.ts[0m:[93m1[0m:[93m12[0m - [91merror[0m[90m TS4094: [0mProperty 'p' of exported anonymous class type may not be private or protected.

[7m1[0m export var myClassWithError = class {
[7m [0m [91m           ~~~~~~~~~~~~~~~~[0m

  [96mapp/fileWithError.ts[0m:[93m1[0m:[93m12[0m
    [7m1[0m export var myClassWithError = class {
    [7m [0m [96m           ~~~~~~~~~~~~~~~~[0m
    Add a type annotation to the variable myClassWithError.

[[90mHH:MM:SS AM[0m] Found 1 error. Watching for file changes.



//// [/user/username/projects/solution/app/fileWithError.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.myClassWithError = void 0;
exports.myClassWithError = /** @class */ (function () {
    function class_1() {
        this.p = 12;
    }
    class_1.prototype.tags = function () { };
    return class_1;
}());


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
{"fileNames":["../../../../../home/src/tslibs/ts/lib/lib.d.ts","./filewitherror.ts","./filewithouterror.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},"-8103865863-export var myClassWithError = class {\n        tags() { }\n        private p = 12\n    };",{"version":"-11785903855-export class myClass { }","signature":"-7432826827-export declare class myClass {\n}\n"}],"root":[2,3],"options":{"composite":true},"emitDiagnosticsPerFile":[[2,[{"start":11,"length":16,"messageText":"Property 'p' of exported anonymous class type may not be private or protected.","category":1,"code":4094,"relatedInformation":[{"start":11,"length":16,"messageText":"Add a type annotation to the variable myClassWithError.","category":1,"code":9027}]}]]],"emitSignatures":[2],"latestChangedDtsFile":"./fileWithoutError.d.ts","version":"FakeTSVersion"}

//// [/user/username/projects/solution/app/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../../home/src/tslibs/ts/lib/lib.d.ts",
    "./filewitherror.ts",
    "./filewithouterror.ts"
  ],
  "fileInfos": {
    "../../../../../home/src/tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "./filewitherror.ts": {
      "version": "-8103865863-export var myClassWithError = class {\n        tags() { }\n        private p = 12\n    };",
      "signature": "-8103865863-export var myClassWithError = class {\n        tags() { }\n        private p = 12\n    };"
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
  "root": [
    [
      2,
      "./filewitherror.ts"
    ],
    [
      3,
      "./filewithouterror.ts"
    ]
  ],
  "options": {
    "composite": true
  },
  "emitDiagnosticsPerFile": [
    [
      "./filewitherror.ts",
      [
        {
          "start": 11,
          "length": 16,
          "messageText": "Property 'p' of exported anonymous class type may not be private or protected.",
          "category": 1,
          "code": 4094,
          "relatedInformation": [
            {
              "start": 11,
              "length": 16,
              "messageText": "Add a type annotation to the variable myClassWithError.",
              "category": 1,
              "code": 9027
            }
          ]
        }
      ]
    ]
  ],
  "emitSignatures": [
    "./filewitherror.ts"
  ],
  "latestChangedDtsFile": "./fileWithoutError.d.ts",
  "version": "FakeTSVersion",
  "size": 1281
}


FsWatches::
/user/username/projects/solution/app/fileWithError.ts: *new*
  {}
/user/username/projects/solution/app/fileWithoutError.ts: *new*
  {}
/user/username/projects/solution/app/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/user/username/projects/solution/app: *new*
  {}

Program root files: [
  "/user/username/projects/solution/app/fileWithError.ts",
  "/user/username/projects/solution/app/fileWithoutError.ts"
]
Program options: {
  "composite": true,
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/solution/app/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/solution/app/fileWithError.ts
/user/username/projects/solution/app/fileWithoutError.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/solution/app/fileWithError.ts
/user/username/projects/solution/app/fileWithoutError.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/user/username/projects/solution/app/filewitherror.ts (used version)
/user/username/projects/solution/app/filewithouterror.ts (computed .d.ts during emit)

exitCode:: ExitStatus.undefined

Change:: Change fileWithoutError

Input::
//// [/user/username/projects/solution/app/fileWithoutError.ts]
export class myClass2 { }


Timeout callback:: count: 1
1: timerToBuildInvalidatedProject *new*

Before running Timeout callback:: count: 1
1: timerToBuildInvalidatedProject

Host is moving to new time
After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

[96mapp/fileWithError.ts[0m:[93m1[0m:[93m12[0m - [91merror[0m[90m TS4094: [0mProperty 'p' of exported anonymous class type may not be private or protected.

[7m1[0m export var myClassWithError = class {
[7m [0m [91m           ~~~~~~~~~~~~~~~~[0m

  [96mapp/fileWithError.ts[0m:[93m1[0m:[93m12[0m
    [7m1[0m export var myClassWithError = class {
    [7m [0m [96m           ~~~~~~~~~~~~~~~~[0m
    Add a type annotation to the variable myClassWithError.

[[90mHH:MM:SS AM[0m] Found 1 error. Watching for file changes.



//// [/user/username/projects/solution/app/fileWithoutError.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.myClass2 = void 0;
var myClass2 = /** @class */ (function () {
    function myClass2() {
    }
    return myClass2;
}());
exports.myClass2 = myClass2;


//// [/user/username/projects/solution/app/fileWithoutError.d.ts]
export declare class myClass2 {
}


//// [/user/username/projects/solution/app/tsconfig.tsbuildinfo]
{"fileNames":["../../../../../home/src/tslibs/ts/lib/lib.d.ts","./filewitherror.ts","./filewithouterror.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},"-8103865863-export var myClassWithError = class {\n        tags() { }\n        private p = 12\n    };",{"version":"-10959532701-export class myClass2 { }","signature":"-8459626297-export declare class myClass2 {\n}\n"}],"root":[2,3],"options":{"composite":true},"emitDiagnosticsPerFile":[[2,[{"start":11,"length":16,"messageText":"Property 'p' of exported anonymous class type may not be private or protected.","category":1,"code":4094,"relatedInformation":[{"start":11,"length":16,"messageText":"Add a type annotation to the variable myClassWithError.","category":1,"code":9027}]}]]],"emitSignatures":[2],"latestChangedDtsFile":"./fileWithoutError.d.ts","version":"FakeTSVersion"}

//// [/user/username/projects/solution/app/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../../home/src/tslibs/ts/lib/lib.d.ts",
    "./filewitherror.ts",
    "./filewithouterror.ts"
  ],
  "fileInfos": {
    "../../../../../home/src/tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "./filewitherror.ts": {
      "version": "-8103865863-export var myClassWithError = class {\n        tags() { }\n        private p = 12\n    };",
      "signature": "-8103865863-export var myClassWithError = class {\n        tags() { }\n        private p = 12\n    };"
    },
    "./filewithouterror.ts": {
      "original": {
        "version": "-10959532701-export class myClass2 { }",
        "signature": "-8459626297-export declare class myClass2 {\n}\n"
      },
      "version": "-10959532701-export class myClass2 { }",
      "signature": "-8459626297-export declare class myClass2 {\n}\n"
    }
  },
  "root": [
    [
      2,
      "./filewitherror.ts"
    ],
    [
      3,
      "./filewithouterror.ts"
    ]
  ],
  "options": {
    "composite": true
  },
  "emitDiagnosticsPerFile": [
    [
      "./filewitherror.ts",
      [
        {
          "start": 11,
          "length": 16,
          "messageText": "Property 'p' of exported anonymous class type may not be private or protected.",
          "category": 1,
          "code": 4094,
          "relatedInformation": [
            {
              "start": 11,
              "length": 16,
              "messageText": "Add a type annotation to the variable myClassWithError.",
              "category": 1,
              "code": 9027
            }
          ]
        }
      ]
    ]
  ],
  "emitSignatures": [
    "./filewitherror.ts"
  ],
  "latestChangedDtsFile": "./fileWithoutError.d.ts",
  "version": "FakeTSVersion",
  "size": 1283
}



Program root files: [
  "/user/username/projects/solution/app/fileWithError.ts",
  "/user/username/projects/solution/app/fileWithoutError.ts"
]
Program options: {
  "composite": true,
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/solution/app/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/solution/app/fileWithError.ts
/user/username/projects/solution/app/fileWithoutError.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/solution/app/fileWithoutError.ts

Shape signatures in builder refreshed for::
/user/username/projects/solution/app/filewithouterror.ts (computed .d.ts)

exitCode:: ExitStatus.undefined
