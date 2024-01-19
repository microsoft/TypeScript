currentDirectory:: /user/username/projects/myproject useCaseSensitiveFileNames: false
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

//// [/user/username/projects/myproject/pkg0/index.ts]
export const pkg0 = 0;

//// [/user/username/projects/myproject/pkg0/tsconfig.json]
{
  "compilerOptions": {
    "composite": true
  }
}

//// [/user/username/projects/myproject/pkg1/index.ts]
export const pkg1 = 1;

//// [/user/username/projects/myproject/pkg1/tsconfig.json]
{
  "compilerOptions": {
    "composite": true
  },
  "references": [
    {
      "path": "../pkg0"
    }
  ]
}

//// [/user/username/projects/myproject/pkg2/index.ts]
export const pkg2 = 2;

//// [/user/username/projects/myproject/pkg2/tsconfig.json]
{
  "compilerOptions": {
    "composite": true
  },
  "references": [
    {
      "path": "../pkg0"
    }
  ]
}

//// [/user/username/projects/myproject/tsconfig.json]
{
  "references": [
    {
      "path": "./pkg0"
    },
    {
      "path": "./pkg1"
    },
    {
      "path": "./pkg2"
    }
  ],
  "files": []
}


/a/lib/tsc.js -b -w -v
Output::
>> Screen clear
[[90m12:00:37 AM[0m] Starting compilation in watch mode...

[[90m12:00:38 AM[0m] Projects in this build: 
    * pkg0/tsconfig.json
    * pkg1/tsconfig.json
    * pkg2/tsconfig.json
    * tsconfig.json

[[90m12:00:39 AM[0m] Project 'pkg0/tsconfig.json' is out of date because output file 'pkg0/tsconfig.tsbuildinfo' does not exist

[[90m12:00:40 AM[0m] Building project '/user/username/projects/myproject/pkg0/tsconfig.json'...

[[90m12:00:50 AM[0m] Project 'pkg1/tsconfig.json' is out of date because output file 'pkg1/tsconfig.tsbuildinfo' does not exist

[[90m12:00:51 AM[0m] Building project '/user/username/projects/myproject/pkg1/tsconfig.json'...

[[90m12:01:01 AM[0m] Project 'pkg2/tsconfig.json' is out of date because output file 'pkg2/tsconfig.tsbuildinfo' does not exist

[[90m12:01:02 AM[0m] Building project '/user/username/projects/myproject/pkg2/tsconfig.json'...

[[90m12:01:12 AM[0m] Found 0 errors. Watching for file changes.



//// [/user/username/projects/myproject/pkg0/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pkg0 = void 0;
exports.pkg0 = 0;


//// [/user/username/projects/myproject/pkg0/index.d.ts]
export declare const pkg0 = 0;


//// [/user/username/projects/myproject/pkg0/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../../a/lib/lib.d.ts","./index.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},{"version":"-10197922616-export const pkg0 = 0;","signature":"-4821832606-export declare const pkg0 = 0;\n"}],"root":[2],"options":{"composite":true},"referencedMap":[],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,2],"latestChangedDtsFile":"./index.d.ts"},"version":"FakeTSVersion"}

//// [/user/username/projects/myproject/pkg0/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../../a/lib/lib.d.ts",
      "./index.ts"
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
      "./index.ts": {
        "original": {
          "version": "-10197922616-export const pkg0 = 0;",
          "signature": "-4821832606-export declare const pkg0 = 0;\n"
        },
        "version": "-10197922616-export const pkg0 = 0;",
        "signature": "-4821832606-export declare const pkg0 = 0;\n"
      }
    },
    "root": [
      [
        2,
        "./index.ts"
      ]
    ],
    "options": {
      "composite": true
    },
    "referencedMap": {},
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../../../a/lib/lib.d.ts",
      "./index.ts"
    ],
    "latestChangedDtsFile": "./index.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 776
}

//// [/user/username/projects/myproject/pkg1/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pkg1 = void 0;
exports.pkg1 = 1;


//// [/user/username/projects/myproject/pkg1/index.d.ts]
export declare const pkg1 = 1;


//// [/user/username/projects/myproject/pkg1/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../../a/lib/lib.d.ts","./index.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},{"version":"-10158787190-export const pkg1 = 1;","signature":"-3530363548-export declare const pkg1 = 1;\n"}],"root":[2],"options":{"composite":true},"referencedMap":[],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,2],"latestChangedDtsFile":"./index.d.ts"},"version":"FakeTSVersion"}

//// [/user/username/projects/myproject/pkg1/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../../a/lib/lib.d.ts",
      "./index.ts"
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
      "./index.ts": {
        "original": {
          "version": "-10158787190-export const pkg1 = 1;",
          "signature": "-3530363548-export declare const pkg1 = 1;\n"
        },
        "version": "-10158787190-export const pkg1 = 1;",
        "signature": "-3530363548-export declare const pkg1 = 1;\n"
      }
    },
    "root": [
      [
        2,
        "./index.ts"
      ]
    ],
    "options": {
      "composite": true
    },
    "referencedMap": {},
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../../../a/lib/lib.d.ts",
      "./index.ts"
    ],
    "latestChangedDtsFile": "./index.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 776
}

//// [/user/username/projects/myproject/pkg2/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pkg2 = void 0;
exports.pkg2 = 2;


//// [/user/username/projects/myproject/pkg2/index.d.ts]
export declare const pkg2 = 2;


//// [/user/username/projects/myproject/pkg2/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../../a/lib/lib.d.ts","./index.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},{"version":"-14414619060-export const pkg2 = 2;","signature":"-6533861786-export declare const pkg2 = 2;\n"}],"root":[2],"options":{"composite":true},"referencedMap":[],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,2],"latestChangedDtsFile":"./index.d.ts"},"version":"FakeTSVersion"}

//// [/user/username/projects/myproject/pkg2/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../../a/lib/lib.d.ts",
      "./index.ts"
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
      "./index.ts": {
        "original": {
          "version": "-14414619060-export const pkg2 = 2;",
          "signature": "-6533861786-export declare const pkg2 = 2;\n"
        },
        "version": "-14414619060-export const pkg2 = 2;",
        "signature": "-6533861786-export declare const pkg2 = 2;\n"
      }
    },
    "root": [
      [
        2,
        "./index.ts"
      ]
    ],
    "options": {
      "composite": true
    },
    "referencedMap": {},
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../../../a/lib/lib.d.ts",
      "./index.ts"
    ],
    "latestChangedDtsFile": "./index.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 776
}


FsWatches::
/user/username/projects/myproject/pkg0/index.ts: *new*
  {}
/user/username/projects/myproject/pkg0/tsconfig.json: *new*
  {}
/user/username/projects/myproject/pkg1/index.ts: *new*
  {}
/user/username/projects/myproject/pkg1/tsconfig.json: *new*
  {}
/user/username/projects/myproject/pkg2/index.ts: *new*
  {}
/user/username/projects/myproject/pkg2/tsconfig.json: *new*
  {}
/user/username/projects/myproject/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/user/username/projects/myproject/pkg0: *new*
  {}
/user/username/projects/myproject/pkg1: *new*
  {}
/user/username/projects/myproject/pkg2: *new*
  {}

Program root files: [
  "/user/username/projects/myproject/pkg0/index.ts"
]
Program options: {
  "composite": true,
  "watch": true,
  "configFilePath": "/user/username/projects/myproject/pkg0/tsconfig.json"
}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg0/index.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg0/index.ts

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/user/username/projects/myproject/pkg0/index.ts (computed .d.ts during emit)

Program root files: [
  "/user/username/projects/myproject/pkg1/index.ts"
]
Program options: {
  "composite": true,
  "watch": true,
  "configFilePath": "/user/username/projects/myproject/pkg1/tsconfig.json"
}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg1/index.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg1/index.ts

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/user/username/projects/myproject/pkg1/index.ts (computed .d.ts during emit)

Program root files: [
  "/user/username/projects/myproject/pkg2/index.ts"
]
Program options: {
  "composite": true,
  "watch": true,
  "configFilePath": "/user/username/projects/myproject/pkg2/tsconfig.json"
}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg2/index.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg2/index.ts

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/user/username/projects/myproject/pkg2/index.ts (computed .d.ts during emit)

exitCode:: ExitStatus.undefined

Change:: dts doesn't change

Input::
//// [/user/username/projects/myproject/pkg0/index.ts]
export const pkg0 = 0;const someConst2 = 10;


Timeout callback:: count: 1
1: timerToBuildInvalidatedProject *new*

Before running Timeout callback:: count: 1
1: timerToBuildInvalidatedProject

After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90m12:01:15 AM[0m] File change detected. Starting incremental compilation...

[[90m12:01:16 AM[0m] Project 'pkg0/tsconfig.json' is out of date because output 'pkg0/tsconfig.tsbuildinfo' is older than input 'pkg0/index.ts'

[[90m12:01:17 AM[0m] Building project '/user/username/projects/myproject/pkg0/tsconfig.json'...

[[90m12:01:28 AM[0m] Project 'pkg1/tsconfig.json' is up to date with .d.ts files from its dependencies

[[90m12:01:29 AM[0m] Updating output timestamps of project '/user/username/projects/myproject/pkg1/tsconfig.json'...

[[90m12:01:31 AM[0m] Project 'pkg2/tsconfig.json' is up to date with .d.ts files from its dependencies

[[90m12:01:32 AM[0m] Updating output timestamps of project '/user/username/projects/myproject/pkg2/tsconfig.json'...

[[90m12:01:34 AM[0m] Found 0 errors. Watching for file changes.



//// [/user/username/projects/myproject/pkg0/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pkg0 = void 0;
exports.pkg0 = 0;
var someConst2 = 10;


//// [/user/username/projects/myproject/pkg0/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../../a/lib/lib.d.ts","./index.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},{"version":"-7839887915-export const pkg0 = 0;const someConst2 = 10;","signature":"-4821832606-export declare const pkg0 = 0;\n"}],"root":[2],"options":{"composite":true},"referencedMap":[],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,2],"latestChangedDtsFile":"./index.d.ts"},"version":"FakeTSVersion"}

//// [/user/username/projects/myproject/pkg0/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../../a/lib/lib.d.ts",
      "./index.ts"
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
      "./index.ts": {
        "original": {
          "version": "-7839887915-export const pkg0 = 0;const someConst2 = 10;",
          "signature": "-4821832606-export declare const pkg0 = 0;\n"
        },
        "version": "-7839887915-export const pkg0 = 0;const someConst2 = 10;",
        "signature": "-4821832606-export declare const pkg0 = 0;\n"
      }
    },
    "root": [
      [
        2,
        "./index.ts"
      ]
    ],
    "options": {
      "composite": true
    },
    "referencedMap": {},
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../../../a/lib/lib.d.ts",
      "./index.ts"
    ],
    "latestChangedDtsFile": "./index.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 797
}

//// [/user/username/projects/myproject/pkg1/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg2/tsconfig.tsbuildinfo] file changed its modified time


Program root files: [
  "/user/username/projects/myproject/pkg0/index.ts"
]
Program options: {
  "composite": true,
  "watch": true,
  "configFilePath": "/user/username/projects/myproject/pkg0/tsconfig.json"
}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg0/index.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/myproject/pkg0/index.ts

Shape signatures in builder refreshed for::
/user/username/projects/myproject/pkg0/index.ts (computed .d.ts)

exitCode:: ExitStatus.undefined

Change:: No change

Input::


exitCode:: ExitStatus.undefined

Change:: dts change

Input::
//// [/user/username/projects/myproject/pkg0/index.ts]
export const pkg0 = 0;const someConst2 = 10;export const someConst = 10;


Timeout callback:: count: 1
2: timerToBuildInvalidatedProject *new*

Before running Timeout callback:: count: 1
2: timerToBuildInvalidatedProject

After running Timeout callback:: count: 1
Output::
>> Screen clear
[[90m12:01:37 AM[0m] File change detected. Starting incremental compilation...

[[90m12:01:38 AM[0m] Project 'pkg0/tsconfig.json' is out of date because output 'pkg0/tsconfig.tsbuildinfo' is older than input 'pkg0/index.ts'

[[90m12:01:39 AM[0m] Building project '/user/username/projects/myproject/pkg0/tsconfig.json'...



//// [/user/username/projects/myproject/pkg0/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.someConst = exports.pkg0 = void 0;
exports.pkg0 = 0;
var someConst2 = 10;
exports.someConst = 10;


//// [/user/username/projects/myproject/pkg0/index.d.ts]
export declare const pkg0 = 0;
export declare const someConst = 10;


//// [/user/username/projects/myproject/pkg0/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../../a/lib/lib.d.ts","./index.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},{"version":"1748855762-export const pkg0 = 0;const someConst2 = 10;export const someConst = 10;","signature":"-6216230055-export declare const pkg0 = 0;\nexport declare const someConst = 10;\n"}],"root":[2],"options":{"composite":true},"referencedMap":[],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,2],"latestChangedDtsFile":"./index.d.ts"},"version":"FakeTSVersion"}

//// [/user/username/projects/myproject/pkg0/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../../a/lib/lib.d.ts",
      "./index.ts"
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
      "./index.ts": {
        "original": {
          "version": "1748855762-export const pkg0 = 0;const someConst2 = 10;export const someConst = 10;",
          "signature": "-6216230055-export declare const pkg0 = 0;\nexport declare const someConst = 10;\n"
        },
        "version": "1748855762-export const pkg0 = 0;const someConst2 = 10;export const someConst = 10;",
        "signature": "-6216230055-export declare const pkg0 = 0;\nexport declare const someConst = 10;\n"
      }
    },
    "root": [
      [
        2,
        "./index.ts"
      ]
    ],
    "options": {
      "composite": true
    },
    "referencedMap": {},
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../../../a/lib/lib.d.ts",
      "./index.ts"
    ],
    "latestChangedDtsFile": "./index.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 862
}


Timeout callback:: count: 1
3: timerToBuildInvalidatedProject *new*


Program root files: [
  "/user/username/projects/myproject/pkg0/index.ts"
]
Program options: {
  "composite": true,
  "watch": true,
  "configFilePath": "/user/username/projects/myproject/pkg0/tsconfig.json"
}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg0/index.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/myproject/pkg0/index.ts

Shape signatures in builder refreshed for::
/user/username/projects/myproject/pkg0/index.ts (computed .d.ts)

exitCode:: ExitStatus.undefined

Change:: build pkg1,pkg2

Input::

Before running Timeout callback:: count: 1
3: timerToBuildInvalidatedProject

After running Timeout callback:: count: 0
Output::
[[90m12:01:53 AM[0m] Project 'pkg1/tsconfig.json' is out of date because output 'pkg1/index.js' is older than input 'pkg0/tsconfig.json'

[[90m12:01:54 AM[0m] Building project '/user/username/projects/myproject/pkg1/tsconfig.json'...

[[90m12:01:55 AM[0m] Updating unchanged output timestamps of project '/user/username/projects/myproject/pkg1/tsconfig.json'...

[[90m12:01:57 AM[0m] Project 'pkg2/tsconfig.json' is out of date because output 'pkg2/index.js' is older than input 'pkg0/tsconfig.json'

[[90m12:01:58 AM[0m] Building project '/user/username/projects/myproject/pkg2/tsconfig.json'...

[[90m12:01:59 AM[0m] Updating unchanged output timestamps of project '/user/username/projects/myproject/pkg2/tsconfig.json'...

[[90m12:02:01 AM[0m] Found 0 errors. Watching for file changes.



//// [/user/username/projects/myproject/pkg1/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg2/tsconfig.tsbuildinfo] file changed its modified time


Program root files: [
  "/user/username/projects/myproject/pkg1/index.ts"
]
Program options: {
  "composite": true,
  "watch": true,
  "configFilePath": "/user/username/projects/myproject/pkg1/tsconfig.json"
}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg1/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

Program root files: [
  "/user/username/projects/myproject/pkg2/index.ts"
]
Program options: {
  "composite": true,
  "watch": true,
  "configFilePath": "/user/username/projects/myproject/pkg2/tsconfig.json"
}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg2/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

exitCode:: ExitStatus.undefined

Change:: No change

Input::


exitCode:: ExitStatus.undefined
