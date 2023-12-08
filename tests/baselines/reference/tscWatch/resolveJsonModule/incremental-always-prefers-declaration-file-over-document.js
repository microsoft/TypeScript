currentDirectory:: / useCaseSensitiveFileNames: false
Input::
//// [/src/project/main.ts]
import data from "./data.json"; let x: string = data;

//// [/src/project/data.json]
{}

//// [/src/project/data.d.json.ts]
declare var val: string; export default val;

//// [/src/project/tsconfig.json]
{
  "compilerOptions": {
    "resolveJsonModule": true
  }
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


/a/lib/tsc.js --p src/project -i -w
Output::
>> Screen clear
[[90m12:00:21 AM[0m] Starting compilation in watch mode...

[96msrc/project/main.ts[0m:[93m1[0m:[93m18[0m - [91merror[0m[90m TS6263: [0mModule './data.json' was resolved to '/src/project/data.d.json.ts', but '--allowArbitraryExtensions' is not set.

[7m1[0m import data from "./data.json"; let x: string = data;
[7m [0m [91m                 ~~~~~~~~~~~~~[0m

[[90m12:00:26 AM[0m] Found 1 error. Watching for file changes.



//// [/src/project/main.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var data_json_1 = require("./data.json");
var x = data_json_1.default;


//// [/src/project/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../a/lib/lib.d.ts","./data.d.json.ts","./main.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},"2718060498-declare var val: string; export default val;","6961905452-import data from \"./data.json\"; let x: string = data;"],"root":[2,3],"referencedMap":[],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,2,[3,[{"file":"./main.ts","start":17,"length":13,"messageText":"Module './data.json' was resolved to '/src/project/data.d.json.ts', but '--allowArbitraryExtensions' is not set.","category":1,"code":6263}]]]},"version":"FakeTSVersion"}

//// [/src/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../a/lib/lib.d.ts",
      "./data.d.json.ts",
      "./main.ts"
    ],
    "fileInfos": {
      "../../a/lib/lib.d.ts": {
        "original": {
          "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
          "affectsGlobalScope": true
        },
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
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
    "referencedMap": {},
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../a/lib/lib.d.ts",
      "./data.d.json.ts",
      [
        "./main.ts",
        [
          {
            "file": "./main.ts",
            "start": 17,
            "length": 13,
            "messageText": "Module './data.json' was resolved to '/src/project/data.d.json.ts', but '--allowArbitraryExtensions' is not set.",
            "category": 1,
            "code": 6263
          }
        ]
      ]
    ]
  },
  "version": "FakeTSVersion",
  "size": 942
}


FsWatches::
/a/lib/lib.d.ts: *new*
  {}
/src/project/data.d.json.ts: *new*
  {}
/src/project/main.ts: *new*
  {}
/src/project/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/src/project: *new*
  {}

Program root files: [
  "/src/project/data.d.json.ts",
  "/src/project/main.ts"
]
Program options: {
  "resolveJsonModule": true,
  "project": "/src/project",
  "incremental": true,
  "watch": true,
  "configFilePath": "/src/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/src/project/data.d.json.ts
/src/project/main.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/src/project/data.d.json.ts
/src/project/main.ts

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/src/project/data.d.json.ts (used version)
/src/project/main.ts (used version)

exitCode:: ExitStatus.undefined

Change:: Change json setting

Input::
//// [/src/project/tsconfig.json]
{
  "compilerOptions": {
    "resolveJsonModule": false
  }
}


Timeout callback:: count: 1
1: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
1: timerToUpdateProgram

After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90m12:00:32 AM[0m] File change detected. Starting incremental compilation...

[96msrc/project/main.ts[0m:[93m1[0m:[93m18[0m - [91merror[0m[90m TS6263: [0mModule './data.json' was resolved to '/src/project/data.d.json.ts', but '--allowArbitraryExtensions' is not set.

[7m1[0m import data from "./data.json"; let x: string = data;
[7m [0m [91m                 ~~~~~~~~~~~~~[0m

[[90m12:00:33 AM[0m] Found 1 error. Watching for file changes.





Program root files: [
  "/src/project/data.d.json.ts",
  "/src/project/main.ts"
]
Program options: {
  "resolveJsonModule": false,
  "project": "/src/project",
  "incremental": true,
  "watch": true,
  "configFilePath": "/src/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/src/project/data.d.json.ts
/src/project/main.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

exitCode:: ExitStatus.undefined
