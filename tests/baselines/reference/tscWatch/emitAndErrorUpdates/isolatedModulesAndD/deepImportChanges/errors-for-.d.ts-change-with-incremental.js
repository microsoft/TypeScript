currentDirectory:: /user/username/projects/myproject useCaseSensitiveFileNames: false
Input::
//// [/user/username/projects/myproject/a.ts]
import {B} from './b';
declare var console: any;
let b = new B();
console.log(b.c.d);

//// [/user/username/projects/myproject/b.d.ts]
import {C} from './c';
export class B
{
    c: C;
}

//// [/user/username/projects/myproject/c.d.ts]
export class C
{
    d: number;
}

//// [/user/username/projects/myproject/tsconfig.json]
{}

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


/a/lib/tsc.js --w --isolatedModules --d --incremental
Output::
>> Screen clear
[[90m12:00:25 AM[0m] Starting compilation in watch mode...

[[90m12:00:32 AM[0m] Found 0 errors. Watching for file changes.



//// [/user/username/projects/myproject/a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var b_1 = require("./b");
var b = new b_1.B();
console.log(b.c.d);


//// [/user/username/projects/myproject/a.d.ts]
export {};


//// [/user/username/projects/myproject/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../a/lib/lib.d.ts","./c.d.ts","./b.d.ts","./a.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},"-18774426152-export class C\n{\n    d: number;\n}","-1688906387-import {C} from './c';\nexport class B\n{\n    c: C;\n}",{"version":"4878398349-import {B} from './b';\ndeclare var console: any;\nlet b = new B();\nconsole.log(b.c.d);","signature":"-3531856636-export {};\n"}],"root":[[2,4]],"options":{"declaration":true},"fileIdsList":[[3],[2]],"referencedMap":[[4,1],[3,2]],"exportedModulesMap":[[3,2]],"semanticDiagnosticsPerFile":[1,4,3,2]},"version":"FakeTSVersion"}

//// [/user/username/projects/myproject/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../a/lib/lib.d.ts",
      "./c.d.ts",
      "./b.d.ts",
      "./a.ts"
    ],
    "fileNamesList": [
      [
        "./b.d.ts"
      ],
      [
        "./c.d.ts"
      ]
    ],
    "fileInfos": {
      "../../../../a/lib/lib.d.ts": {
        "original": {
          "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
          "affectsGlobalScope": true
        },
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true
      },
      "./c.d.ts": {
        "version": "-18774426152-export class C\n{\n    d: number;\n}",
        "signature": "-18774426152-export class C\n{\n    d: number;\n}"
      },
      "./b.d.ts": {
        "version": "-1688906387-import {C} from './c';\nexport class B\n{\n    c: C;\n}",
        "signature": "-1688906387-import {C} from './c';\nexport class B\n{\n    c: C;\n}"
      },
      "./a.ts": {
        "original": {
          "version": "4878398349-import {B} from './b';\ndeclare var console: any;\nlet b = new B();\nconsole.log(b.c.d);",
          "signature": "-3531856636-export {};\n"
        },
        "version": "4878398349-import {B} from './b';\ndeclare var console: any;\nlet b = new B();\nconsole.log(b.c.d);",
        "signature": "-3531856636-export {};\n"
      }
    },
    "root": [
      [
        [
          2,
          4
        ],
        [
          "./c.d.ts",
          "./b.d.ts",
          "./a.ts"
        ]
      ]
    ],
    "options": {
      "declaration": true
    },
    "referencedMap": {
      "./a.ts": [
        "./b.d.ts"
      ],
      "./b.d.ts": [
        "./c.d.ts"
      ]
    },
    "exportedModulesMap": {
      "./b.d.ts": [
        "./c.d.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../../../a/lib/lib.d.ts",
      "./a.ts",
      "./b.d.ts",
      "./c.d.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 969
}


PolledWatches::
/user/username/projects/myproject/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts: *new*
  {}
/user/username/projects/myproject: *new*
  {}
/user/username/projects/myproject/a.ts: *new*
  {}
/user/username/projects/myproject/b.d.ts: *new*
  {}
/user/username/projects/myproject/c.d.ts: *new*
  {}
/user/username/projects/myproject/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/user/username/projects/myproject: *new*
  {}

Timeout callback:: count: 1
2: timerToInvalidateFailedLookupResolutions *new*

Program root files: [
  "/user/username/projects/myproject/a.ts",
  "/user/username/projects/myproject/b.d.ts",
  "/user/username/projects/myproject/c.d.ts"
]
Program options: {
  "watch": true,
  "isolatedModules": true,
  "declaration": true,
  "incremental": true,
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/c.d.ts
/user/username/projects/myproject/b.d.ts
/user/username/projects/myproject/a.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/user/username/projects/myproject/c.d.ts
/user/username/projects/myproject/b.d.ts
/user/username/projects/myproject/a.ts

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/user/username/projects/myproject/c.d.ts (used version)
/user/username/projects/myproject/b.d.ts (used version)
/user/username/projects/myproject/a.ts (computed .d.ts during emit)

exitCode:: ExitStatus.undefined

Change:: Rename property d to d2 of class C to initialize signatures

Input::
//// [/user/username/projects/myproject/c.d.ts]
export class C
{
    d2: number;
}


Timeout callback:: count: 2
2: timerToInvalidateFailedLookupResolutions
3: timerToUpdateProgram *new*

Before running Timeout callback:: count: 2
2: timerToInvalidateFailedLookupResolutions
3: timerToUpdateProgram

After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90m12:00:38 AM[0m] File change detected. Starting incremental compilation...

[96ma.ts[0m:[93m4[0m:[93m17[0m - [91merror[0m[90m TS2339: [0mProperty 'd' does not exist on type 'C'.

[7m4[0m console.log(b.c.d);
[7m [0m [91m                ~[0m

[[90m12:00:45 AM[0m] Found 1 error. Watching for file changes.



//// [/user/username/projects/myproject/a.d.ts] file written with same contents
//// [/user/username/projects/myproject/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../a/lib/lib.d.ts","./c.d.ts","./b.d.ts","./a.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},"-21444928214-export class C\n{\n    d2: number;\n}","-1688906387-import {C} from './c';\nexport class B\n{\n    c: C;\n}",{"version":"4878398349-import {B} from './b';\ndeclare var console: any;\nlet b = new B();\nconsole.log(b.c.d);","signature":"-3531856636-export {};\n"}],"root":[[2,4]],"options":{"declaration":true},"fileIdsList":[[3],[2]],"referencedMap":[[4,1],[3,2]],"exportedModulesMap":[[3,2]],"semanticDiagnosticsPerFile":[1,[4,[{"file":"./a.ts","start":82,"length":1,"code":2339,"category":1,"messageText":"Property 'd' does not exist on type 'C'."}]],3,2]},"version":"FakeTSVersion"}

//// [/user/username/projects/myproject/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../a/lib/lib.d.ts",
      "./c.d.ts",
      "./b.d.ts",
      "./a.ts"
    ],
    "fileNamesList": [
      [
        "./b.d.ts"
      ],
      [
        "./c.d.ts"
      ]
    ],
    "fileInfos": {
      "../../../../a/lib/lib.d.ts": {
        "original": {
          "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
          "affectsGlobalScope": true
        },
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true
      },
      "./c.d.ts": {
        "version": "-21444928214-export class C\n{\n    d2: number;\n}",
        "signature": "-21444928214-export class C\n{\n    d2: number;\n}"
      },
      "./b.d.ts": {
        "version": "-1688906387-import {C} from './c';\nexport class B\n{\n    c: C;\n}",
        "signature": "-1688906387-import {C} from './c';\nexport class B\n{\n    c: C;\n}"
      },
      "./a.ts": {
        "original": {
          "version": "4878398349-import {B} from './b';\ndeclare var console: any;\nlet b = new B();\nconsole.log(b.c.d);",
          "signature": "-3531856636-export {};\n"
        },
        "version": "4878398349-import {B} from './b';\ndeclare var console: any;\nlet b = new B();\nconsole.log(b.c.d);",
        "signature": "-3531856636-export {};\n"
      }
    },
    "root": [
      [
        [
          2,
          4
        ],
        [
          "./c.d.ts",
          "./b.d.ts",
          "./a.ts"
        ]
      ]
    ],
    "options": {
      "declaration": true
    },
    "referencedMap": {
      "./a.ts": [
        "./b.d.ts"
      ],
      "./b.d.ts": [
        "./c.d.ts"
      ]
    },
    "exportedModulesMap": {
      "./b.d.ts": [
        "./c.d.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../../../a/lib/lib.d.ts",
      [
        "./a.ts",
        [
          {
            "file": "./a.ts",
            "start": 82,
            "length": 1,
            "code": 2339,
            "category": 1,
            "messageText": "Property 'd' does not exist on type 'C'."
          }
        ]
      ],
      "./b.d.ts",
      "./c.d.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 1096
}



Program root files: [
  "/user/username/projects/myproject/a.ts",
  "/user/username/projects/myproject/b.d.ts",
  "/user/username/projects/myproject/c.d.ts"
]
Program options: {
  "watch": true,
  "isolatedModules": true,
  "declaration": true,
  "incremental": true,
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
}
Program structureReused: Completely
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/c.d.ts
/user/username/projects/myproject/b.d.ts
/user/username/projects/myproject/a.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/myproject/c.d.ts
/user/username/projects/myproject/b.d.ts
/user/username/projects/myproject/a.ts

Shape signatures in builder refreshed for::
/user/username/projects/myproject/c.d.ts (used version)
/user/username/projects/myproject/b.d.ts (used version)
/user/username/projects/myproject/a.ts (computed .d.ts during emit)

exitCode:: ExitStatus.undefined

Change:: Rename property d2 to d of class C to revert back to original text

Input::
//// [/user/username/projects/myproject/c.d.ts]
export class C
{
    d: number;
}


Timeout callback:: count: 1
4: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
4: timerToUpdateProgram

After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90m12:00:52 AM[0m] File change detected. Starting incremental compilation...

[[90m12:00:59 AM[0m] Found 0 errors. Watching for file changes.



//// [/user/username/projects/myproject/a.d.ts] file written with same contents
//// [/user/username/projects/myproject/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../a/lib/lib.d.ts","./c.d.ts","./b.d.ts","./a.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},"-18774426152-export class C\n{\n    d: number;\n}","-1688906387-import {C} from './c';\nexport class B\n{\n    c: C;\n}",{"version":"4878398349-import {B} from './b';\ndeclare var console: any;\nlet b = new B();\nconsole.log(b.c.d);","signature":"-3531856636-export {};\n"}],"root":[[2,4]],"options":{"declaration":true},"fileIdsList":[[3],[2]],"referencedMap":[[4,1],[3,2]],"exportedModulesMap":[[3,2]],"semanticDiagnosticsPerFile":[1,4,3,2]},"version":"FakeTSVersion"}

//// [/user/username/projects/myproject/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../a/lib/lib.d.ts",
      "./c.d.ts",
      "./b.d.ts",
      "./a.ts"
    ],
    "fileNamesList": [
      [
        "./b.d.ts"
      ],
      [
        "./c.d.ts"
      ]
    ],
    "fileInfos": {
      "../../../../a/lib/lib.d.ts": {
        "original": {
          "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
          "affectsGlobalScope": true
        },
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true
      },
      "./c.d.ts": {
        "version": "-18774426152-export class C\n{\n    d: number;\n}",
        "signature": "-18774426152-export class C\n{\n    d: number;\n}"
      },
      "./b.d.ts": {
        "version": "-1688906387-import {C} from './c';\nexport class B\n{\n    c: C;\n}",
        "signature": "-1688906387-import {C} from './c';\nexport class B\n{\n    c: C;\n}"
      },
      "./a.ts": {
        "original": {
          "version": "4878398349-import {B} from './b';\ndeclare var console: any;\nlet b = new B();\nconsole.log(b.c.d);",
          "signature": "-3531856636-export {};\n"
        },
        "version": "4878398349-import {B} from './b';\ndeclare var console: any;\nlet b = new B();\nconsole.log(b.c.d);",
        "signature": "-3531856636-export {};\n"
      }
    },
    "root": [
      [
        [
          2,
          4
        ],
        [
          "./c.d.ts",
          "./b.d.ts",
          "./a.ts"
        ]
      ]
    ],
    "options": {
      "declaration": true
    },
    "referencedMap": {
      "./a.ts": [
        "./b.d.ts"
      ],
      "./b.d.ts": [
        "./c.d.ts"
      ]
    },
    "exportedModulesMap": {
      "./b.d.ts": [
        "./c.d.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../../../a/lib/lib.d.ts",
      "./a.ts",
      "./b.d.ts",
      "./c.d.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 969
}



Program root files: [
  "/user/username/projects/myproject/a.ts",
  "/user/username/projects/myproject/b.d.ts",
  "/user/username/projects/myproject/c.d.ts"
]
Program options: {
  "watch": true,
  "isolatedModules": true,
  "declaration": true,
  "incremental": true,
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
}
Program structureReused: Completely
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/c.d.ts
/user/username/projects/myproject/b.d.ts
/user/username/projects/myproject/a.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/myproject/c.d.ts
/user/username/projects/myproject/b.d.ts
/user/username/projects/myproject/a.ts

Shape signatures in builder refreshed for::
/user/username/projects/myproject/c.d.ts (used version)
/user/username/projects/myproject/b.d.ts (used version)
/user/username/projects/myproject/a.ts (computed .d.ts during emit)

exitCode:: ExitStatus.undefined

Change:: Rename property d to d2 of class C

Input::
//// [/user/username/projects/myproject/c.d.ts]
export class C
{
    d2: number;
}


Timeout callback:: count: 1
5: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
5: timerToUpdateProgram

After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90m12:01:06 AM[0m] File change detected. Starting incremental compilation...

[96ma.ts[0m:[93m4[0m:[93m17[0m - [91merror[0m[90m TS2339: [0mProperty 'd' does not exist on type 'C'.

[7m4[0m console.log(b.c.d);
[7m [0m [91m                ~[0m

[[90m12:01:13 AM[0m] Found 1 error. Watching for file changes.



//// [/user/username/projects/myproject/a.d.ts] file written with same contents
//// [/user/username/projects/myproject/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../a/lib/lib.d.ts","./c.d.ts","./b.d.ts","./a.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},"-21444928214-export class C\n{\n    d2: number;\n}","-1688906387-import {C} from './c';\nexport class B\n{\n    c: C;\n}",{"version":"4878398349-import {B} from './b';\ndeclare var console: any;\nlet b = new B();\nconsole.log(b.c.d);","signature":"-3531856636-export {};\n"}],"root":[[2,4]],"options":{"declaration":true},"fileIdsList":[[3],[2]],"referencedMap":[[4,1],[3,2]],"exportedModulesMap":[[3,2]],"semanticDiagnosticsPerFile":[1,[4,[{"file":"./a.ts","start":82,"length":1,"code":2339,"category":1,"messageText":"Property 'd' does not exist on type 'C'."}]],3,2]},"version":"FakeTSVersion"}

//// [/user/username/projects/myproject/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../a/lib/lib.d.ts",
      "./c.d.ts",
      "./b.d.ts",
      "./a.ts"
    ],
    "fileNamesList": [
      [
        "./b.d.ts"
      ],
      [
        "./c.d.ts"
      ]
    ],
    "fileInfos": {
      "../../../../a/lib/lib.d.ts": {
        "original": {
          "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
          "affectsGlobalScope": true
        },
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true
      },
      "./c.d.ts": {
        "version": "-21444928214-export class C\n{\n    d2: number;\n}",
        "signature": "-21444928214-export class C\n{\n    d2: number;\n}"
      },
      "./b.d.ts": {
        "version": "-1688906387-import {C} from './c';\nexport class B\n{\n    c: C;\n}",
        "signature": "-1688906387-import {C} from './c';\nexport class B\n{\n    c: C;\n}"
      },
      "./a.ts": {
        "original": {
          "version": "4878398349-import {B} from './b';\ndeclare var console: any;\nlet b = new B();\nconsole.log(b.c.d);",
          "signature": "-3531856636-export {};\n"
        },
        "version": "4878398349-import {B} from './b';\ndeclare var console: any;\nlet b = new B();\nconsole.log(b.c.d);",
        "signature": "-3531856636-export {};\n"
      }
    },
    "root": [
      [
        [
          2,
          4
        ],
        [
          "./c.d.ts",
          "./b.d.ts",
          "./a.ts"
        ]
      ]
    ],
    "options": {
      "declaration": true
    },
    "referencedMap": {
      "./a.ts": [
        "./b.d.ts"
      ],
      "./b.d.ts": [
        "./c.d.ts"
      ]
    },
    "exportedModulesMap": {
      "./b.d.ts": [
        "./c.d.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../../../a/lib/lib.d.ts",
      [
        "./a.ts",
        [
          {
            "file": "./a.ts",
            "start": 82,
            "length": 1,
            "code": 2339,
            "category": 1,
            "messageText": "Property 'd' does not exist on type 'C'."
          }
        ]
      ],
      "./b.d.ts",
      "./c.d.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 1096
}



Program root files: [
  "/user/username/projects/myproject/a.ts",
  "/user/username/projects/myproject/b.d.ts",
  "/user/username/projects/myproject/c.d.ts"
]
Program options: {
  "watch": true,
  "isolatedModules": true,
  "declaration": true,
  "incremental": true,
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
}
Program structureReused: Completely
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/c.d.ts
/user/username/projects/myproject/b.d.ts
/user/username/projects/myproject/a.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/myproject/c.d.ts
/user/username/projects/myproject/b.d.ts
/user/username/projects/myproject/a.ts

Shape signatures in builder refreshed for::
/user/username/projects/myproject/c.d.ts (used version)
/user/username/projects/myproject/b.d.ts (used version)
/user/username/projects/myproject/a.ts (computed .d.ts during emit)

exitCode:: ExitStatus.undefined
