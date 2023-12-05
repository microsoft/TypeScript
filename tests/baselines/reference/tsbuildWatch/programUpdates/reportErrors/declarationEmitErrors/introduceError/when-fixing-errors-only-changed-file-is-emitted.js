currentDirectory:: /user/username/projects/solution useCaseSensitiveFileNames: false
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
{
  "compilerOptions": {
    "composite": true
  }
}


/a/lib/tsc.js -b -w app
Output::
>> Screen clear
[[90m12:00:25 AM[0m] Starting compilation in watch mode...

[[90m12:00:39 AM[0m] Found 0 errors. Watching for file changes.



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
{"program":{"fileNames":["../../../../../a/lib/lib.d.ts","./filewitherror.ts","./filewithouterror.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},{"version":"-8106435186-export var myClassWithError = class {\n        tags() { }\n        \n    };","signature":"6892461904-export declare var myClassWithError: {\n    new (): {\n        tags(): void;\n    };\n};\n"},{"version":"-11785903855-export class myClass { }","signature":"-7432826827-export declare class myClass {\n}\n"}],"root":[2,3],"options":{"composite":true},"referencedMap":[],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,2,3],"latestChangedDtsFile":"./fileWithoutError.d.ts"},"version":"FakeTSVersion"}

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
  "size": 1046
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
  "configFilePath": "/user/username/projects/solution/app/tsconfig.json"
}
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

exitCode:: ExitStatus.undefined

Change:: Introduce error

Input::
//// [/user/username/projects/solution/app/fileWithError.ts]
export var myClassWithError = class {
        tags() { }
        private p = 12
    };


Timeout callback:: count: 1
1: timerToBuildInvalidatedProject *new*

Before running Timeout callback:: count: 1
1: timerToBuildInvalidatedProject

After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90m12:00:43 AM[0m] File change detected. Starting incremental compilation...

[96mapp/fileWithError.ts[0m:[93m1[0m:[93m12[0m - [91merror[0m[90m TS4094: [0mProperty 'p' of exported class expression may not be private or protected.

[7m1[0m export var myClassWithError = class {
[7m [0m [91m           ~~~~~~~~~~~~~~~~[0m

[[90m12:00:51 AM[0m] Found 1 error. Watching for file changes.



//// [/user/username/projects/solution/app/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../../a/lib/lib.d.ts","./filewitherror.ts","./filewithouterror.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},{"version":"-8103865863-export var myClassWithError = class {\n        tags() { }\n        private p = 12\n    };","signature":"7927555551-export declare var myClassWithError: {\n    new (): {\n        tags(): void;\n        p: number;\n    };\n};\n(11,16)Error4094: Property 'p' of exported class expression may not be private or protected."},{"version":"-11785903855-export class myClass { }","signature":"-7432826827-export declare class myClass {\n}\n"}],"root":[2,3],"options":{"composite":true},"referencedMap":[],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,2,3],"affectedFilesPendingEmit":[2],"emitSignatures":[[2,"6892461904-export declare var myClassWithError: {\n    new (): {\n        tags(): void;\n    };\n};\n"]],"latestChangedDtsFile":"./fileWithoutError.d.ts"},"version":"FakeTSVersion"}

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
          "version": "-8103865863-export var myClassWithError = class {\n        tags() { }\n        private p = 12\n    };",
          "signature": "7927555551-export declare var myClassWithError: {\n    new (): {\n        tags(): void;\n        p: number;\n    };\n};\n(11,16)Error4094: Property 'p' of exported class expression may not be private or protected."
        },
        "version": "-8103865863-export var myClassWithError = class {\n        tags() { }\n        private p = 12\n    };",
        "signature": "7927555551-export declare var myClassWithError: {\n    new (): {\n        tags(): void;\n        p: number;\n    };\n};\n(11,16)Error4094: Property 'p' of exported class expression may not be private or protected."
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
    "referencedMap": {},
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../../../a/lib/lib.d.ts",
      "./filewitherror.ts",
      "./filewithouterror.ts"
    ],
    "affectedFilesPendingEmit": [
      [
        "./filewitherror.ts",
        "Js | Dts"
      ]
    ],
    "emitSignatures": [
      [
        "./filewitherror.ts",
        "6892461904-export declare var myClassWithError: {\n    new (): {\n        tags(): void;\n    };\n};\n"
      ]
    ],
    "latestChangedDtsFile": "./fileWithoutError.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 1330
}



Program root files: [
  "/user/username/projects/solution/app/fileWithError.ts",
  "/user/username/projects/solution/app/fileWithoutError.ts"
]
Program options: {
  "composite": true,
  "watch": true,
  "configFilePath": "/user/username/projects/solution/app/tsconfig.json"
}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/solution/app/fileWithError.ts
/user/username/projects/solution/app/fileWithoutError.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/solution/app/fileWithError.ts

Shape signatures in builder refreshed for::
/user/username/projects/solution/app/filewitherror.ts (computed .d.ts)

exitCode:: ExitStatus.undefined

Change:: Fix error in fileWithError

Input::
//// [/user/username/projects/solution/app/fileWithError.ts]
export var myClassWithError = class {
        tags() { }
        
    };


Timeout callback:: count: 1
2: timerToBuildInvalidatedProject *new*

Before running Timeout callback:: count: 1
2: timerToBuildInvalidatedProject

After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90m12:00:55 AM[0m] File change detected. Starting incremental compilation...

[[90m12:01:06 AM[0m] Found 0 errors. Watching for file changes.



//// [/user/username/projects/solution/app/fileWithError.js] file written with same contents
//// [/user/username/projects/solution/app/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../../a/lib/lib.d.ts","./filewitherror.ts","./filewithouterror.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},{"version":"-8106435186-export var myClassWithError = class {\n        tags() { }\n        \n    };","signature":"6892461904-export declare var myClassWithError: {\n    new (): {\n        tags(): void;\n    };\n};\n"},{"version":"-11785903855-export class myClass { }","signature":"-7432826827-export declare class myClass {\n}\n"}],"root":[2,3],"options":{"composite":true},"referencedMap":[],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,2,3],"latestChangedDtsFile":"./fileWithoutError.d.ts"},"version":"FakeTSVersion"}

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
  "size": 1046
}



Program root files: [
  "/user/username/projects/solution/app/fileWithError.ts",
  "/user/username/projects/solution/app/fileWithoutError.ts"
]
Program options: {
  "composite": true,
  "watch": true,
  "configFilePath": "/user/username/projects/solution/app/tsconfig.json"
}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/solution/app/fileWithError.ts
/user/username/projects/solution/app/fileWithoutError.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/solution/app/fileWithError.ts

Shape signatures in builder refreshed for::
/user/username/projects/solution/app/filewitherror.ts (computed .d.ts)

exitCode:: ExitStatus.undefined
