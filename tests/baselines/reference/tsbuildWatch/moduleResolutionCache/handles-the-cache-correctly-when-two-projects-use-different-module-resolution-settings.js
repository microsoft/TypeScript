currentDirectory:: /user/username/projects/myproject useCaseSensitiveFileNames: false
Input::
//// [/user/username/projects/myproject/project1/index.ts]
import { foo } from "file";

//// [/user/username/projects/myproject/project1/node_modules/file/index.d.ts]
export const foo = 10;

//// [/user/username/projects/myproject/project1/tsconfig.json]
{
  "compilerOptions": {
    "composite": true,
    "types": [
      "foo",
      "bar"
    ]
  },
  "files": [
    "index.ts"
  ]
}

//// [/user/username/projects/myproject/project2/index.ts]
import { foo } from "file";

//// [/user/username/projects/myproject/project2/file.d.ts]
export const foo = 10;

//// [/user/username/projects/myproject/project2/tsconfig.json]
{
  "compilerOptions": {
    "composite": true,
    "types": [
      "foo"
    ],
    "moduleResolution": "classic"
  },
  "files": [
    "index.ts"
  ]
}

//// [/user/username/projects/myproject/node_modules/@types/foo/index.d.ts]
export const foo = 10;

//// [/user/username/projects/myproject/node_modules/@types/bar/index.d.ts]
export const bar = 10;

//// [/user/username/projects/myproject/tsconfig.json]
{
  "files": [],
  "references": [
    {
      "path": "./project1"
    },
    {
      "path": "./project2"
    }
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


/a/lib/tsc.js --b -w -v
Output::
>> Screen clear
[[90m12:00:51 AM[0m] Starting compilation in watch mode...

[[90m12:00:52 AM[0m] Projects in this build: 
    * project1/tsconfig.json
    * project2/tsconfig.json
    * tsconfig.json

[[90m12:00:53 AM[0m] Project 'project1/tsconfig.json' is out of date because output file 'project1/tsconfig.tsbuildinfo' does not exist

[[90m12:00:54 AM[0m] Building project '/user/username/projects/myproject/project1/tsconfig.json'...

[[90m12:01:04 AM[0m] Project 'project2/tsconfig.json' is out of date because output file 'project2/tsconfig.tsbuildinfo' does not exist

[[90m12:01:05 AM[0m] Building project '/user/username/projects/myproject/project2/tsconfig.json'...

[[90m12:01:15 AM[0m] Found 0 errors. Watching for file changes.



//// [/user/username/projects/myproject/project1/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });


//// [/user/username/projects/myproject/project1/index.d.ts]
export {};


//// [/user/username/projects/myproject/project1/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../../a/lib/lib.d.ts","./node_modules/file/index.d.ts","./index.ts","../node_modules/@types/foo/index.d.ts","../node_modules/@types/bar/index.d.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},"-12737086933-export const foo = 10;",{"version":"-4708082513-import { foo } from \"file\";","signature":"-3531856636-export {};\n"},"-12737086933-export const foo = 10;","-12042713060-export const bar = 10;"],"root":[3],"options":{"composite":true},"fileIdsList":[[2]],"referencedMap":[[3,1]],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,5,4,3,2],"latestChangedDtsFile":"./index.d.ts"},"version":"FakeTSVersion"}

//// [/user/username/projects/myproject/project1/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../../a/lib/lib.d.ts",
      "./node_modules/file/index.d.ts",
      "./index.ts",
      "../node_modules/@types/foo/index.d.ts",
      "../node_modules/@types/bar/index.d.ts"
    ],
    "fileNamesList": [
      [
        "./node_modules/file/index.d.ts"
      ]
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
      "./node_modules/file/index.d.ts": {
        "version": "-12737086933-export const foo = 10;",
        "signature": "-12737086933-export const foo = 10;"
      },
      "./index.ts": {
        "original": {
          "version": "-4708082513-import { foo } from \"file\";",
          "signature": "-3531856636-export {};\n"
        },
        "version": "-4708082513-import { foo } from \"file\";",
        "signature": "-3531856636-export {};\n"
      },
      "../node_modules/@types/foo/index.d.ts": {
        "version": "-12737086933-export const foo = 10;",
        "signature": "-12737086933-export const foo = 10;"
      },
      "../node_modules/@types/bar/index.d.ts": {
        "version": "-12042713060-export const bar = 10;",
        "signature": "-12042713060-export const bar = 10;"
      }
    },
    "root": [
      [
        3,
        "./index.ts"
      ]
    ],
    "options": {
      "composite": true
    },
    "referencedMap": {
      "./index.ts": [
        "./node_modules/file/index.d.ts"
      ]
    },
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../../../a/lib/lib.d.ts",
      "../node_modules/@types/bar/index.d.ts",
      "../node_modules/@types/foo/index.d.ts",
      "./index.ts",
      "./node_modules/file/index.d.ts"
    ],
    "latestChangedDtsFile": "./index.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 1020
}

//// [/user/username/projects/myproject/project2/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });


//// [/user/username/projects/myproject/project2/index.d.ts]
export {};


//// [/user/username/projects/myproject/project2/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../../a/lib/lib.d.ts","./file.d.ts","./index.ts","../node_modules/@types/foo/index.d.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},"-12737086933-export const foo = 10;",{"version":"-4708082513-import { foo } from \"file\";","signature":"-3531856636-export {};\n"},"-12737086933-export const foo = 10;"],"root":[3],"options":{"composite":true},"fileIdsList":[[2]],"referencedMap":[[3,1]],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,4,2,3],"latestChangedDtsFile":"./index.d.ts"},"version":"FakeTSVersion"}

//// [/user/username/projects/myproject/project2/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../../a/lib/lib.d.ts",
      "./file.d.ts",
      "./index.ts",
      "../node_modules/@types/foo/index.d.ts"
    ],
    "fileNamesList": [
      [
        "./file.d.ts"
      ]
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
      "./file.d.ts": {
        "version": "-12737086933-export const foo = 10;",
        "signature": "-12737086933-export const foo = 10;"
      },
      "./index.ts": {
        "original": {
          "version": "-4708082513-import { foo } from \"file\";",
          "signature": "-3531856636-export {};\n"
        },
        "version": "-4708082513-import { foo } from \"file\";",
        "signature": "-3531856636-export {};\n"
      },
      "../node_modules/@types/foo/index.d.ts": {
        "version": "-12737086933-export const foo = 10;",
        "signature": "-12737086933-export const foo = 10;"
      }
    },
    "root": [
      [
        3,
        "./index.ts"
      ]
    ],
    "options": {
      "composite": true
    },
    "referencedMap": {
      "./index.ts": [
        "./file.d.ts"
      ]
    },
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../../../a/lib/lib.d.ts",
      "../node_modules/@types/foo/index.d.ts",
      "./file.d.ts",
      "./index.ts"
    ],
    "latestChangedDtsFile": "./index.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 921
}


PolledWatches::
/user/username/projects/myproject/node_modules/@types/bar/package.json: *new*
  {"pollingInterval":2000}
/user/username/projects/myproject/node_modules/@types/foo/package.json: *new*
  {"pollingInterval":2000}
/user/username/projects/myproject/project1/node_modules/file/package.json: *new*
  {"pollingInterval":2000}

FsWatches::
/user/username/projects/myproject/project1/index.ts: *new*
  {}
/user/username/projects/myproject/project1/tsconfig.json: *new*
  {}
/user/username/projects/myproject/project2/index.ts: *new*
  {}
/user/username/projects/myproject/project2/tsconfig.json: *new*
  {}
/user/username/projects/myproject/tsconfig.json: *new*
  {}

Program root files: [
  "/user/username/projects/myproject/project1/index.ts"
]
Program options: {
  "composite": true,
  "types": [
    "foo",
    "bar"
  ],
  "watch": true,
  "configFilePath": "/user/username/projects/myproject/project1/tsconfig.json"
}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/project1/node_modules/file/index.d.ts
/user/username/projects/myproject/project1/index.ts
/user/username/projects/myproject/node_modules/@types/foo/index.d.ts
/user/username/projects/myproject/node_modules/@types/bar/index.d.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/user/username/projects/myproject/project1/node_modules/file/index.d.ts
/user/username/projects/myproject/project1/index.ts
/user/username/projects/myproject/node_modules/@types/foo/index.d.ts
/user/username/projects/myproject/node_modules/@types/bar/index.d.ts

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/user/username/projects/myproject/project1/node_modules/file/index.d.ts (used version)
/user/username/projects/myproject/project1/index.ts (computed .d.ts during emit)
/user/username/projects/myproject/node_modules/@types/foo/index.d.ts (used version)
/user/username/projects/myproject/node_modules/@types/bar/index.d.ts (used version)

Program root files: [
  "/user/username/projects/myproject/project2/index.ts"
]
Program options: {
  "composite": true,
  "types": [
    "foo"
  ],
  "moduleResolution": 1,
  "watch": true,
  "configFilePath": "/user/username/projects/myproject/project2/tsconfig.json"
}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/project2/file.d.ts
/user/username/projects/myproject/project2/index.ts
/user/username/projects/myproject/node_modules/@types/foo/index.d.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/user/username/projects/myproject/project2/file.d.ts
/user/username/projects/myproject/project2/index.ts
/user/username/projects/myproject/node_modules/@types/foo/index.d.ts

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/user/username/projects/myproject/project2/file.d.ts (used version)
/user/username/projects/myproject/project2/index.ts (computed .d.ts during emit)
/user/username/projects/myproject/node_modules/@types/foo/index.d.ts (used version)

exitCode:: ExitStatus.undefined

Change:: Append text

Input::
//// [/user/username/projects/myproject/project1/index.ts]
import { foo } from "file";const bar = 10;


Timeout callback:: count: 1
1: timerToBuildInvalidatedProject *new*

Before running Timeout callback:: count: 1
1: timerToBuildInvalidatedProject

After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90m12:01:18 AM[0m] File change detected. Starting incremental compilation...

[[90m12:01:19 AM[0m] Project 'project1/tsconfig.json' is out of date because output 'project1/tsconfig.tsbuildinfo' is older than input 'project1/index.ts'

[[90m12:01:20 AM[0m] Building project '/user/username/projects/myproject/project1/tsconfig.json'...

[[90m12:01:31 AM[0m] Found 0 errors. Watching for file changes.



//// [/user/username/projects/myproject/project1/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bar = 10;


//// [/user/username/projects/myproject/project1/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../../a/lib/lib.d.ts","./node_modules/file/index.d.ts","./index.ts","../node_modules/@types/foo/index.d.ts","../node_modules/@types/bar/index.d.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},"-12737086933-export const foo = 10;",{"version":"-7561100220-import { foo } from \"file\";const bar = 10;","signature":"-3531856636-export {};\n"},"-12737086933-export const foo = 10;","-12042713060-export const bar = 10;"],"root":[3],"options":{"composite":true},"fileIdsList":[[2]],"referencedMap":[[3,1]],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,5,4,3,2],"latestChangedDtsFile":"./index.d.ts"},"version":"FakeTSVersion"}

//// [/user/username/projects/myproject/project1/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../../a/lib/lib.d.ts",
      "./node_modules/file/index.d.ts",
      "./index.ts",
      "../node_modules/@types/foo/index.d.ts",
      "../node_modules/@types/bar/index.d.ts"
    ],
    "fileNamesList": [
      [
        "./node_modules/file/index.d.ts"
      ]
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
      "./node_modules/file/index.d.ts": {
        "version": "-12737086933-export const foo = 10;",
        "signature": "-12737086933-export const foo = 10;"
      },
      "./index.ts": {
        "original": {
          "version": "-7561100220-import { foo } from \"file\";const bar = 10;",
          "signature": "-3531856636-export {};\n"
        },
        "version": "-7561100220-import { foo } from \"file\";const bar = 10;",
        "signature": "-3531856636-export {};\n"
      },
      "../node_modules/@types/foo/index.d.ts": {
        "version": "-12737086933-export const foo = 10;",
        "signature": "-12737086933-export const foo = 10;"
      },
      "../node_modules/@types/bar/index.d.ts": {
        "version": "-12042713060-export const bar = 10;",
        "signature": "-12042713060-export const bar = 10;"
      }
    },
    "root": [
      [
        3,
        "./index.ts"
      ]
    ],
    "options": {
      "composite": true
    },
    "referencedMap": {
      "./index.ts": [
        "./node_modules/file/index.d.ts"
      ]
    },
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../../../a/lib/lib.d.ts",
      "../node_modules/@types/bar/index.d.ts",
      "../node_modules/@types/foo/index.d.ts",
      "./index.ts",
      "./node_modules/file/index.d.ts"
    ],
    "latestChangedDtsFile": "./index.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 1035
}



Program root files: [
  "/user/username/projects/myproject/project1/index.ts"
]
Program options: {
  "composite": true,
  "types": [
    "foo",
    "bar"
  ],
  "watch": true,
  "configFilePath": "/user/username/projects/myproject/project1/tsconfig.json"
}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/project1/node_modules/file/index.d.ts
/user/username/projects/myproject/project1/index.ts
/user/username/projects/myproject/node_modules/@types/foo/index.d.ts
/user/username/projects/myproject/node_modules/@types/bar/index.d.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/myproject/project1/index.ts

Shape signatures in builder refreshed for::
/user/username/projects/myproject/project1/index.ts (computed .d.ts)

exitCode:: ExitStatus.undefined
