currentDirectory:: /user/username/projects/myproject useCaseSensitiveFileNames:: false
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


/home/src/tslibs/TS/Lib/tsc.js --b -w -v
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] Starting compilation in watch mode...

[[90mHH:MM:SS AM[0m] Projects in this build: 
    * project1/tsconfig.json
    * project2/tsconfig.json
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'project1/tsconfig.json' is out of date because output file 'project1/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project '/user/username/projects/myproject/project1/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'project2/tsconfig.json' is out of date because output file 'project2/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project '/user/username/projects/myproject/project2/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/user/username/projects/myproject/project1/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });


//// [/user/username/projects/myproject/project1/index.d.ts]
export {};


//// [/user/username/projects/myproject/project1/tsconfig.tsbuildinfo]
{"fileNames":["../../../../../home/src/tslibs/ts/lib/lib.d.ts","./node_modules/file/index.d.ts","./index.ts","../node_modules/@types/foo/index.d.ts","../node_modules/@types/bar/index.d.ts"],"fileIdsList":[[2]],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-12737086933-export const foo = 10;","impliedFormat":1},{"version":"-4708082513-import { foo } from \"file\";","signature":"-3531856636-export {};\n"},{"version":"-12737086933-export const foo = 10;","impliedFormat":1},{"version":"-12042713060-export const bar = 10;","impliedFormat":1}],"root":[3],"options":{"composite":true},"referencedMap":[[3,1]],"latestChangedDtsFile":"./index.d.ts","version":"FakeTSVersion"}

//// [/user/username/projects/myproject/project1/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../../home/src/tslibs/ts/lib/lib.d.ts",
    "./node_modules/file/index.d.ts",
    "./index.ts",
    "../node_modules/@types/foo/index.d.ts",
    "../node_modules/@types/bar/index.d.ts"
  ],
  "fileIdsList": [
    [
      "./node_modules/file/index.d.ts"
    ]
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
    "./node_modules/file/index.d.ts": {
      "original": {
        "version": "-12737086933-export const foo = 10;",
        "impliedFormat": 1
      },
      "version": "-12737086933-export const foo = 10;",
      "signature": "-12737086933-export const foo = 10;",
      "impliedFormat": "commonjs"
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
      "original": {
        "version": "-12737086933-export const foo = 10;",
        "impliedFormat": 1
      },
      "version": "-12737086933-export const foo = 10;",
      "signature": "-12737086933-export const foo = 10;",
      "impliedFormat": "commonjs"
    },
    "../node_modules/@types/bar/index.d.ts": {
      "original": {
        "version": "-12042713060-export const bar = 10;",
        "impliedFormat": 1
      },
      "version": "-12042713060-export const bar = 10;",
      "signature": "-12042713060-export const bar = 10;",
      "impliedFormat": "commonjs"
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
  "latestChangedDtsFile": "./index.d.ts",
  "version": "FakeTSVersion",
  "size": 1130
}

//// [/user/username/projects/myproject/project2/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });


//// [/user/username/projects/myproject/project2/index.d.ts]
export {};


//// [/user/username/projects/myproject/project2/tsconfig.tsbuildinfo]
{"fileNames":["../../../../../home/src/tslibs/ts/lib/lib.d.ts","./file.d.ts","./index.ts","../node_modules/@types/foo/index.d.ts"],"fileIdsList":[[2]],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},"-12737086933-export const foo = 10;",{"version":"-4708082513-import { foo } from \"file\";","signature":"-3531856636-export {};\n"},{"version":"-12737086933-export const foo = 10;","impliedFormat":1}],"root":[3],"options":{"composite":true},"referencedMap":[[3,1]],"latestChangedDtsFile":"./index.d.ts","version":"FakeTSVersion"}

//// [/user/username/projects/myproject/project2/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../../home/src/tslibs/ts/lib/lib.d.ts",
    "./file.d.ts",
    "./index.ts",
    "../node_modules/@types/foo/index.d.ts"
  ],
  "fileIdsList": [
    [
      "./file.d.ts"
    ]
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
      "original": {
        "version": "-12737086933-export const foo = 10;",
        "impliedFormat": 1
      },
      "version": "-12737086933-export const foo = 10;",
      "signature": "-12737086933-export const foo = 10;",
      "impliedFormat": "commonjs"
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
  "latestChangedDtsFile": "./index.d.ts",
  "version": "FakeTSVersion",
  "size": 973
}


PolledWatches::
/package.json: *new*
  {"pollingInterval":2000}
/user/package.json: *new*
  {"pollingInterval":2000}
/user/username/package.json: *new*
  {"pollingInterval":2000}
/user/username/projects/myproject/node_modules/@types/bar/package.json: *new*
  {"pollingInterval":2000}
/user/username/projects/myproject/node_modules/@types/foo/package.json: *new*
  {"pollingInterval":2000}
/user/username/projects/myproject/node_modules/@types/package.json: *new*
  {"pollingInterval":2000}
/user/username/projects/myproject/node_modules/package.json: *new*
  {"pollingInterval":2000}
/user/username/projects/myproject/package.json: *new*
  {"pollingInterval":2000}
/user/username/projects/myproject/project1/node_modules/file/package.json: *new*
  {"pollingInterval":2000}
/user/username/projects/myproject/project1/node_modules/package.json: *new*
  {"pollingInterval":2000}
/user/username/projects/myproject/project1/package.json: *new*
  {"pollingInterval":2000}
/user/username/projects/package.json: *new*
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
  "tscBuild": true,
  "configFilePath": "/user/username/projects/myproject/project1/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/project1/node_modules/file/index.d.ts
/user/username/projects/myproject/project1/index.ts
/user/username/projects/myproject/node_modules/@types/foo/index.d.ts
/user/username/projects/myproject/node_modules/@types/bar/index.d.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/project1/node_modules/file/index.d.ts
/user/username/projects/myproject/project1/index.ts
/user/username/projects/myproject/node_modules/@types/foo/index.d.ts
/user/username/projects/myproject/node_modules/@types/bar/index.d.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
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
  "tscBuild": true,
  "configFilePath": "/user/username/projects/myproject/project2/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/project2/file.d.ts
/user/username/projects/myproject/project2/index.ts
/user/username/projects/myproject/node_modules/@types/foo/index.d.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/project2/file.d.ts
/user/username/projects/myproject/project2/index.ts
/user/username/projects/myproject/node_modules/@types/foo/index.d.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
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

Host is moving to new time
After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

[[90mHH:MM:SS AM[0m] Project 'project1/tsconfig.json' is out of date because output 'project1/tsconfig.tsbuildinfo' is older than input 'project1/index.ts'

[[90mHH:MM:SS AM[0m] Building project '/user/username/projects/myproject/project1/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/user/username/projects/myproject/project1/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bar = 10;


//// [/user/username/projects/myproject/project1/tsconfig.tsbuildinfo]
{"fileNames":["../../../../../home/src/tslibs/ts/lib/lib.d.ts","./node_modules/file/index.d.ts","./index.ts","../node_modules/@types/foo/index.d.ts","../node_modules/@types/bar/index.d.ts"],"fileIdsList":[[2]],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-12737086933-export const foo = 10;","impliedFormat":1},{"version":"-7561100220-import { foo } from \"file\";const bar = 10;","signature":"-3531856636-export {};\n"},{"version":"-12737086933-export const foo = 10;","impliedFormat":1},{"version":"-12042713060-export const bar = 10;","impliedFormat":1}],"root":[3],"options":{"composite":true},"referencedMap":[[3,1]],"latestChangedDtsFile":"./index.d.ts","version":"FakeTSVersion"}

//// [/user/username/projects/myproject/project1/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../../home/src/tslibs/ts/lib/lib.d.ts",
    "./node_modules/file/index.d.ts",
    "./index.ts",
    "../node_modules/@types/foo/index.d.ts",
    "../node_modules/@types/bar/index.d.ts"
  ],
  "fileIdsList": [
    [
      "./node_modules/file/index.d.ts"
    ]
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
    "./node_modules/file/index.d.ts": {
      "original": {
        "version": "-12737086933-export const foo = 10;",
        "impliedFormat": 1
      },
      "version": "-12737086933-export const foo = 10;",
      "signature": "-12737086933-export const foo = 10;",
      "impliedFormat": "commonjs"
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
      "original": {
        "version": "-12737086933-export const foo = 10;",
        "impliedFormat": 1
      },
      "version": "-12737086933-export const foo = 10;",
      "signature": "-12737086933-export const foo = 10;",
      "impliedFormat": "commonjs"
    },
    "../node_modules/@types/bar/index.d.ts": {
      "original": {
        "version": "-12042713060-export const bar = 10;",
        "impliedFormat": 1
      },
      "version": "-12042713060-export const bar = 10;",
      "signature": "-12042713060-export const bar = 10;",
      "impliedFormat": "commonjs"
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
  "latestChangedDtsFile": "./index.d.ts",
  "version": "FakeTSVersion",
  "size": 1145
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
  "tscBuild": true,
  "configFilePath": "/user/username/projects/myproject/project1/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/project1/node_modules/file/index.d.ts
/user/username/projects/myproject/project1/index.ts
/user/username/projects/myproject/node_modules/@types/foo/index.d.ts
/user/username/projects/myproject/node_modules/@types/bar/index.d.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/myproject/project1/index.ts

Shape signatures in builder refreshed for::
/user/username/projects/myproject/project1/index.ts (computed .d.ts)

exitCode:: ExitStatus.undefined
