currentDirectory:: /home/src/projects/project useCaseSensitiveFileNames:: false
Input::
//// [/home/src/projects/project/main.ts]
import data from "./data.json"; let x: string = data;

//// [/home/src/projects/project/data.json]
{}

//// [/home/src/projects/project/data.d.json.ts]
declare var val: string; export default val;

//// [/home/src/projects/project/tsconfig.json]
{
  "compilerOptions": {
    "resolveJsonModule": true
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


/home/src/tslibs/TS/Lib/tsc.js -i -w
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] Starting compilation in watch mode...

[96mmain.ts[0m:[93m1[0m:[93m18[0m - [91merror[0m[90m TS6263: [0mModule './data.json' was resolved to '/home/src/projects/project/data.d.json.ts', but '--allowArbitraryExtensions' is not set.

[7m1[0m import data from "./data.json"; let x: string = data;
[7m [0m [91m                 ~~~~~~~~~~~~~[0m

[[90mHH:MM:SS AM[0m] Found 1 error. Watching for file changes.



//// [/home/src/projects/project/main.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var data_json_1 = require("./data.json");
var x = data_json_1.default;


//// [/home/src/projects/project/tsconfig.tsbuildinfo]
{"fileNames":["../../tslibs/ts/lib/lib.d.ts","./data.d.json.ts","./main.ts"],"fileIdsList":[[2]],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},"2718060498-declare var val: string; export default val;","6961905452-import data from \"./data.json\"; let x: string = data;"],"root":[2,3],"referencedMap":[[3,1]],"semanticDiagnosticsPerFile":[[3,[{"start":17,"length":13,"messageText":"Module './data.json' was resolved to '/home/src/projects/project/data.d.json.ts', but '--allowArbitraryExtensions' is not set.","category":1,"code":6263}]]],"version":"FakeTSVersion"}

//// [/home/src/projects/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../tslibs/ts/lib/lib.d.ts",
    "./data.d.json.ts",
    "./main.ts"
  ],
  "fileIdsList": [
    [
      "./data.d.json.ts"
    ]
  ],
  "fileInfos": {
    "../../tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "./data.d.json.ts": {
      "version": "2718060498-declare var val: string; export default val;",
      "signature": "2718060498-declare var val: string; export default val;"
    },
    "./main.ts": {
      "version": "6961905452-import data from \"./data.json\"; let x: string = data;",
      "signature": "6961905452-import data from \"./data.json\"; let x: string = data;"
    }
  },
  "root": [
    [
      2,
      "./data.d.json.ts"
    ],
    [
      3,
      "./main.ts"
    ]
  ],
  "referencedMap": {
    "./main.ts": [
      "./data.d.json.ts"
    ]
  },
  "semanticDiagnosticsPerFile": [
    [
      "./main.ts",
      [
        {
          "start": 17,
          "length": 13,
          "messageText": "Module './data.json' was resolved to '/home/src/projects/project/data.d.json.ts', but '--allowArbitraryExtensions' is not set.",
          "category": 1,
          "code": 6263
        }
      ]
    ]
  ],
  "version": "FakeTSVersion",
  "size": 1010
}


PolledWatches::
/home/src/projects/node_modules/@types: *new*
  {"pollingInterval":500}
/home/src/projects/project/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/home/src/projects/project/data.d.json.ts: *new*
  {}
/home/src/projects/project/main.ts: *new*
  {}
/home/src/projects/project/tsconfig.json: *new*
  {}
/home/src/tslibs/TS/Lib/lib.d.ts: *new*
  {}

FsWatchesRecursive::
/home/src/projects/project: *new*
  {}

Program root files: [
  "/home/src/projects/project/data.d.json.ts",
  "/home/src/projects/project/main.ts"
]
Program options: {
  "resolveJsonModule": true,
  "incremental": true,
  "watch": true,
  "configFilePath": "/home/src/projects/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/projects/project/data.d.json.ts
/home/src/projects/project/main.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/projects/project/data.d.json.ts
/home/src/projects/project/main.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/home/src/projects/project/data.d.json.ts (used version)
/home/src/projects/project/main.ts (used version)

exitCode:: ExitStatus.undefined

Change:: Change json setting

Input::
//// [/home/src/projects/project/tsconfig.json]
{
  "compilerOptions": {
    "resolveJsonModule": false
  }
}


Timeout callback:: count: 1
1: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
1: timerToUpdateProgram

Host is moving to new time
After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

[96mmain.ts[0m:[93m1[0m:[93m18[0m - [91merror[0m[90m TS6263: [0mModule './data.json' was resolved to '/home/src/projects/project/data.d.json.ts', but '--allowArbitraryExtensions' is not set.

[7m1[0m import data from "./data.json"; let x: string = data;
[7m [0m [91m                 ~~~~~~~~~~~~~[0m

[[90mHH:MM:SS AM[0m] Found 1 error. Watching for file changes.





Program root files: [
  "/home/src/projects/project/data.d.json.ts",
  "/home/src/projects/project/main.ts"
]
Program options: {
  "resolveJsonModule": false,
  "incremental": true,
  "watch": true,
  "configFilePath": "/home/src/projects/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/projects/project/data.d.json.ts
/home/src/projects/project/main.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

exitCode:: ExitStatus.undefined
