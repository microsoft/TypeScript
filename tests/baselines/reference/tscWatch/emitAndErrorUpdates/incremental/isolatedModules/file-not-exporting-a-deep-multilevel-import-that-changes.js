Input::
//// [/user/username/projects/myproject/a.ts]
export interface Point {
    name: string;
    c: Coords;
}
export interface Coords {
    x2: number;
    y: number;
}

//// [/user/username/projects/myproject/b.ts]
import { Point } from "./a";
export interface PointWrapper extends Point {
}

//// [/user/username/projects/myproject/c.ts]
import { PointWrapper } from "./b";
export function getPoint(): PointWrapper {
    return {
        name: "test",
        c: {
            x: 1,
            y: 2
        }
    }
};

//// [/user/username/projects/myproject/d.ts]
import { getPoint } from "./c";
getPoint().c.x;

//// [/user/username/projects/myproject/e.ts]
import "./d";

//// [/user/username/projects/myproject/tsconfig.json]
{"compilerOptions":{"isolatedModules":true}}

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


/a/lib/tsc.js --w --i
Output::
>> Screen clear
[[90m12:00:29 AM[0m] Starting compilation in watch mode...

[96mc.ts[0m:[93m6[0m:[93m13[0m - [91merror[0m[90m TS2322: [0mType '{ x: number; y: number; }' is not assignable to type 'Coords'.
  Object literal may only specify known properties, and 'x' does not exist in type 'Coords'.

[7m6[0m             x: 1,
[7m [0m [91m            ~~~~[0m

  [96ma.ts[0m:[93m3[0m:[93m5[0m
    [7m3[0m     c: Coords;
    [7m [0m [96m    ~[0m
    The expected type comes from property 'c' which is declared here on type 'PointWrapper'

[96md.ts[0m:[93m2[0m:[93m14[0m - [91merror[0m[90m TS2339: [0mProperty 'x' does not exist on type 'Coords'.

[7m2[0m getPoint().c.x;
[7m [0m [91m             ~[0m

[[90m12:00:42 AM[0m] Found 2 errors. Watching for file changes.



Program root files: ["/user/username/projects/myproject/a.ts","/user/username/projects/myproject/b.ts","/user/username/projects/myproject/c.ts","/user/username/projects/myproject/d.ts","/user/username/projects/myproject/e.ts"]
Program options: {"isolatedModules":true,"watch":true,"incremental":true,"configFilePath":"/user/username/projects/myproject/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/a.ts
/user/username/projects/myproject/b.ts
/user/username/projects/myproject/c.ts
/user/username/projects/myproject/d.ts
/user/username/projects/myproject/e.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/user/username/projects/myproject/a.ts
/user/username/projects/myproject/b.ts
/user/username/projects/myproject/c.ts
/user/username/projects/myproject/d.ts
/user/username/projects/myproject/e.ts

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/user/username/projects/myproject/a.ts (used version)
/user/username/projects/myproject/b.ts (used version)
/user/username/projects/myproject/c.ts (used version)
/user/username/projects/myproject/d.ts (used version)
/user/username/projects/myproject/e.ts (used version)

WatchedFiles::
/user/username/projects/myproject/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/a.ts:
  {"fileName":"/user/username/projects/myproject/a.ts","pollingInterval":250}
/user/username/projects/myproject/b.ts:
  {"fileName":"/user/username/projects/myproject/b.ts","pollingInterval":250}
/user/username/projects/myproject/c.ts:
  {"fileName":"/user/username/projects/myproject/c.ts","pollingInterval":250}
/user/username/projects/myproject/d.ts:
  {"fileName":"/user/username/projects/myproject/d.ts","pollingInterval":250}
/user/username/projects/myproject/e.ts:
  {"fileName":"/user/username/projects/myproject/e.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/myproject/node_modules/@types:
  {"directoryName":"/user/username/projects/myproject/node_modules/@types","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject:
  {"directoryName":"/user/username/projects/myproject","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

//// [/user/username/projects/myproject/a.js]
"use strict";
exports.__esModule = true;


//// [/user/username/projects/myproject/b.js]
"use strict";
exports.__esModule = true;


//// [/user/username/projects/myproject/c.js]
"use strict";
exports.__esModule = true;
exports.getPoint = void 0;
function getPoint() {
    return {
        name: "test",
        c: {
            x: 1,
            y: 2
        }
    };
}
exports.getPoint = getPoint;
;


//// [/user/username/projects/myproject/d.js]
"use strict";
exports.__esModule = true;
var c_1 = require("./c");
(0, c_1.getPoint)().c.x;


//// [/user/username/projects/myproject/e.js]
"use strict";
exports.__esModule = true;
require("./d");


//// [/user/username/projects/myproject/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../a/lib/lib.d.ts","./a.ts","./b.ts","./c.ts","./d.ts","./e.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},"9889814467-export interface Point {\n    name: string;\n    c: Coords;\n}\nexport interface Coords {\n    x2: number;\n    y: number;\n}","-8029610078-import { Point } from \"./a\";\nexport interface PointWrapper extends Point {\n}","-37232372138-import { PointWrapper } from \"./b\";\nexport function getPoint(): PointWrapper {\n    return {\n        name: \"test\",\n        c: {\n            x: 1,\n            y: 2\n        }\n    }\n};","-17875457076-import { getPoint } from \"./c\";\ngetPoint().c.x;","-5185546240-import \"./d\";"],"fileIdsList":[[2],[3],[4],[5]],"referencedMap":[[3,1],[4,2],[5,3],[6,4]],"exportedModulesMap":[[3,1],[4,2],[5,3],[6,4]],"semanticDiagnosticsPerFile":[1,2,3,[4,[{"file":"./c.ts","start":139,"length":4,"code":2322,"category":1,"messageText":{"messageText":"Type '{ x: number; y: number; }' is not assignable to type 'Coords'.","category":1,"code":2322,"next":[{"messageText":"Object literal may only specify known properties, and 'x' does not exist in type 'Coords'.","category":1,"code":2353}]},"relatedInformation":[{"file":"./a.ts","start":47,"length":1,"messageText":"The expected type comes from property 'c' which is declared here on type 'PointWrapper'","category":3,"code":6500}]}]],[5,[{"file":"./d.ts","start":45,"length":1,"code":2339,"category":1,"messageText":"Property 'x' does not exist on type 'Coords'."}]],6]},"version":"FakeTSVersion"}

//// [/user/username/projects/myproject/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../a/lib/lib.d.ts",
      "./a.ts",
      "./b.ts",
      "./c.ts",
      "./d.ts",
      "./e.ts"
    ],
    "fileNamesList": [
      [
        "./a.ts"
      ],
      [
        "./b.ts"
      ],
      [
        "./c.ts"
      ],
      [
        "./d.ts"
      ]
    ],
    "fileInfos": {
      "../../../../a/lib/lib.d.ts": {
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true
      },
      "./a.ts": {
        "version": "9889814467-export interface Point {\n    name: string;\n    c: Coords;\n}\nexport interface Coords {\n    x2: number;\n    y: number;\n}",
        "signature": "9889814467-export interface Point {\n    name: string;\n    c: Coords;\n}\nexport interface Coords {\n    x2: number;\n    y: number;\n}"
      },
      "./b.ts": {
        "version": "-8029610078-import { Point } from \"./a\";\nexport interface PointWrapper extends Point {\n}",
        "signature": "-8029610078-import { Point } from \"./a\";\nexport interface PointWrapper extends Point {\n}"
      },
      "./c.ts": {
        "version": "-37232372138-import { PointWrapper } from \"./b\";\nexport function getPoint(): PointWrapper {\n    return {\n        name: \"test\",\n        c: {\n            x: 1,\n            y: 2\n        }\n    }\n};",
        "signature": "-37232372138-import { PointWrapper } from \"./b\";\nexport function getPoint(): PointWrapper {\n    return {\n        name: \"test\",\n        c: {\n            x: 1,\n            y: 2\n        }\n    }\n};"
      },
      "./d.ts": {
        "version": "-17875457076-import { getPoint } from \"./c\";\ngetPoint().c.x;",
        "signature": "-17875457076-import { getPoint } from \"./c\";\ngetPoint().c.x;"
      },
      "./e.ts": {
        "version": "-5185546240-import \"./d\";",
        "signature": "-5185546240-import \"./d\";"
      }
    },
    "referencedMap": {
      "./b.ts": [
        "./a.ts"
      ],
      "./c.ts": [
        "./b.ts"
      ],
      "./d.ts": [
        "./c.ts"
      ],
      "./e.ts": [
        "./d.ts"
      ]
    },
    "exportedModulesMap": {
      "./b.ts": [
        "./a.ts"
      ],
      "./c.ts": [
        "./b.ts"
      ],
      "./d.ts": [
        "./c.ts"
      ],
      "./e.ts": [
        "./d.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../../../a/lib/lib.d.ts",
      "./a.ts",
      "./b.ts",
      [
        "./c.ts",
        [
          {
            "file": "./c.ts",
            "start": 139,
            "length": 4,
            "code": 2322,
            "category": 1,
            "messageText": {
              "messageText": "Type '{ x: number; y: number; }' is not assignable to type 'Coords'.",
              "category": 1,
              "code": 2322,
              "next": [
                {
                  "messageText": "Object literal may only specify known properties, and 'x' does not exist in type 'Coords'.",
                  "category": 1,
                  "code": 2353
                }
              ]
            },
            "relatedInformation": [
              {
                "file": "./a.ts",
                "start": 47,
                "length": 1,
                "messageText": "The expected type comes from property 'c' which is declared here on type 'PointWrapper'",
                "category": 3,
                "code": 6500
              }
            ]
          }
        ]
      ],
      [
        "./d.ts",
        [
          {
            "file": "./d.ts",
            "start": 45,
            "length": 1,
            "code": 2339,
            "category": 1,
            "messageText": "Property 'x' does not exist on type 'Coords'."
          }
        ]
      ],
      "./e.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 1905
}


Change:: Rename property x2 to x of interface Coords to initialize signatures

Input::
//// [/user/username/projects/myproject/a.ts]
export interface Point {
    name: string;
    c: Coords;
}
export interface Coords {
    x: number;
    y: number;
}


Output::
>> Screen clear
[[90m12:00:48 AM[0m] File change detected. Starting incremental compilation...

[[90m12:00:55 AM[0m] Found 0 errors. Watching for file changes.



Program root files: ["/user/username/projects/myproject/a.ts","/user/username/projects/myproject/b.ts","/user/username/projects/myproject/c.ts","/user/username/projects/myproject/d.ts","/user/username/projects/myproject/e.ts"]
Program options: {"isolatedModules":true,"watch":true,"incremental":true,"configFilePath":"/user/username/projects/myproject/tsconfig.json"}
Program structureReused: Completely
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/a.ts
/user/username/projects/myproject/b.ts
/user/username/projects/myproject/c.ts
/user/username/projects/myproject/d.ts
/user/username/projects/myproject/e.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/myproject/a.ts
/user/username/projects/myproject/b.ts
/user/username/projects/myproject/c.ts
/user/username/projects/myproject/d.ts
/user/username/projects/myproject/e.ts

Shape signatures in builder refreshed for::
/user/username/projects/myproject/a.ts (computed .d.ts)
/user/username/projects/myproject/b.ts (used version)
/user/username/projects/myproject/c.ts (used version)
/user/username/projects/myproject/d.ts (used version)
/user/username/projects/myproject/e.ts (used version)

WatchedFiles::
/user/username/projects/myproject/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/a.ts:
  {"fileName":"/user/username/projects/myproject/a.ts","pollingInterval":250}
/user/username/projects/myproject/b.ts:
  {"fileName":"/user/username/projects/myproject/b.ts","pollingInterval":250}
/user/username/projects/myproject/c.ts:
  {"fileName":"/user/username/projects/myproject/c.ts","pollingInterval":250}
/user/username/projects/myproject/d.ts:
  {"fileName":"/user/username/projects/myproject/d.ts","pollingInterval":250}
/user/username/projects/myproject/e.ts:
  {"fileName":"/user/username/projects/myproject/e.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/myproject/node_modules/@types:
  {"directoryName":"/user/username/projects/myproject/node_modules/@types","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject:
  {"directoryName":"/user/username/projects/myproject","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

//// [/user/username/projects/myproject/a.js] file written with same contents
//// [/user/username/projects/myproject/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../a/lib/lib.d.ts","./a.ts","./b.ts","./c.ts","./d.ts","./e.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},{"version":"2103509937-export interface Point {\n    name: string;\n    c: Coords;\n}\nexport interface Coords {\n    x: number;\n    y: number;\n}","signature":"696351195-export interface Point {\n    name: string;\n    c: Coords;\n}\nexport interface Coords {\n    x: number;\n    y: number;\n}\n"},"-8029610078-import { Point } from \"./a\";\nexport interface PointWrapper extends Point {\n}","-37232372138-import { PointWrapper } from \"./b\";\nexport function getPoint(): PointWrapper {\n    return {\n        name: \"test\",\n        c: {\n            x: 1,\n            y: 2\n        }\n    }\n};","-17875457076-import { getPoint } from \"./c\";\ngetPoint().c.x;","-5185546240-import \"./d\";"],"fileIdsList":[[2],[3],[4],[5]],"referencedMap":[[3,1],[4,2],[5,3],[6,4]],"exportedModulesMap":[[3,1],[4,2],[5,3],[6,4]],"semanticDiagnosticsPerFile":[1,2,3,4,5,6]},"version":"FakeTSVersion"}

//// [/user/username/projects/myproject/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../a/lib/lib.d.ts",
      "./a.ts",
      "./b.ts",
      "./c.ts",
      "./d.ts",
      "./e.ts"
    ],
    "fileNamesList": [
      [
        "./a.ts"
      ],
      [
        "./b.ts"
      ],
      [
        "./c.ts"
      ],
      [
        "./d.ts"
      ]
    ],
    "fileInfos": {
      "../../../../a/lib/lib.d.ts": {
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true
      },
      "./a.ts": {
        "version": "2103509937-export interface Point {\n    name: string;\n    c: Coords;\n}\nexport interface Coords {\n    x: number;\n    y: number;\n}",
        "signature": "696351195-export interface Point {\n    name: string;\n    c: Coords;\n}\nexport interface Coords {\n    x: number;\n    y: number;\n}\n"
      },
      "./b.ts": {
        "version": "-8029610078-import { Point } from \"./a\";\nexport interface PointWrapper extends Point {\n}",
        "signature": "-8029610078-import { Point } from \"./a\";\nexport interface PointWrapper extends Point {\n}"
      },
      "./c.ts": {
        "version": "-37232372138-import { PointWrapper } from \"./b\";\nexport function getPoint(): PointWrapper {\n    return {\n        name: \"test\",\n        c: {\n            x: 1,\n            y: 2\n        }\n    }\n};",
        "signature": "-37232372138-import { PointWrapper } from \"./b\";\nexport function getPoint(): PointWrapper {\n    return {\n        name: \"test\",\n        c: {\n            x: 1,\n            y: 2\n        }\n    }\n};"
      },
      "./d.ts": {
        "version": "-17875457076-import { getPoint } from \"./c\";\ngetPoint().c.x;",
        "signature": "-17875457076-import { getPoint } from \"./c\";\ngetPoint().c.x;"
      },
      "./e.ts": {
        "version": "-5185546240-import \"./d\";",
        "signature": "-5185546240-import \"./d\";"
      }
    },
    "referencedMap": {
      "./b.ts": [
        "./a.ts"
      ],
      "./c.ts": [
        "./b.ts"
      ],
      "./d.ts": [
        "./c.ts"
      ],
      "./e.ts": [
        "./d.ts"
      ]
    },
    "exportedModulesMap": {
      "./b.ts": [
        "./a.ts"
      ],
      "./c.ts": [
        "./b.ts"
      ],
      "./d.ts": [
        "./c.ts"
      ],
      "./e.ts": [
        "./d.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../../../a/lib/lib.d.ts",
      "./a.ts",
      "./b.ts",
      "./c.ts",
      "./d.ts",
      "./e.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 1405
}


Change:: Rename property x to x2 of interface Coords to revert back to original text

Input::
//// [/user/username/projects/myproject/a.ts]
export interface Point {
    name: string;
    c: Coords;
}
export interface Coords {
    x2: number;
    y: number;
}


Output::
>> Screen clear
[[90m12:01:02 AM[0m] File change detected. Starting incremental compilation...

[96mc.ts[0m:[93m6[0m:[93m13[0m - [91merror[0m[90m TS2322: [0mType '{ x: number; y: number; }' is not assignable to type 'Coords'.
  Object literal may only specify known properties, and 'x' does not exist in type 'Coords'.

[7m6[0m             x: 1,
[7m [0m [91m            ~~~~[0m

  [96ma.ts[0m:[93m3[0m:[93m5[0m
    [7m3[0m     c: Coords;
    [7m [0m [96m    ~[0m
    The expected type comes from property 'c' which is declared here on type 'PointWrapper'

[96md.ts[0m:[93m2[0m:[93m14[0m - [91merror[0m[90m TS2339: [0mProperty 'x' does not exist on type 'Coords'.

[7m2[0m getPoint().c.x;
[7m [0m [91m             ~[0m

[[90m12:01:09 AM[0m] Found 2 errors. Watching for file changes.



Program root files: ["/user/username/projects/myproject/a.ts","/user/username/projects/myproject/b.ts","/user/username/projects/myproject/c.ts","/user/username/projects/myproject/d.ts","/user/username/projects/myproject/e.ts"]
Program options: {"isolatedModules":true,"watch":true,"incremental":true,"configFilePath":"/user/username/projects/myproject/tsconfig.json"}
Program structureReused: Completely
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/a.ts
/user/username/projects/myproject/b.ts
/user/username/projects/myproject/c.ts
/user/username/projects/myproject/d.ts
/user/username/projects/myproject/e.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/myproject/a.ts
/user/username/projects/myproject/b.ts
/user/username/projects/myproject/c.ts
/user/username/projects/myproject/d.ts
/user/username/projects/myproject/e.ts

Shape signatures in builder refreshed for::
/user/username/projects/myproject/a.ts (computed .d.ts)
/user/username/projects/myproject/b.ts (used version)
/user/username/projects/myproject/c.ts (used version)
/user/username/projects/myproject/d.ts (used version)
/user/username/projects/myproject/e.ts (used version)

WatchedFiles::
/user/username/projects/myproject/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/a.ts:
  {"fileName":"/user/username/projects/myproject/a.ts","pollingInterval":250}
/user/username/projects/myproject/b.ts:
  {"fileName":"/user/username/projects/myproject/b.ts","pollingInterval":250}
/user/username/projects/myproject/c.ts:
  {"fileName":"/user/username/projects/myproject/c.ts","pollingInterval":250}
/user/username/projects/myproject/d.ts:
  {"fileName":"/user/username/projects/myproject/d.ts","pollingInterval":250}
/user/username/projects/myproject/e.ts:
  {"fileName":"/user/username/projects/myproject/e.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/myproject/node_modules/@types:
  {"directoryName":"/user/username/projects/myproject/node_modules/@types","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject:
  {"directoryName":"/user/username/projects/myproject","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

//// [/user/username/projects/myproject/a.js] file written with same contents
//// [/user/username/projects/myproject/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../a/lib/lib.d.ts","./a.ts","./b.ts","./c.ts","./d.ts","./e.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},{"version":"9889814467-export interface Point {\n    name: string;\n    c: Coords;\n}\nexport interface Coords {\n    x2: number;\n    y: number;\n}","signature":"8536297517-export interface Point {\n    name: string;\n    c: Coords;\n}\nexport interface Coords {\n    x2: number;\n    y: number;\n}\n"},"-8029610078-import { Point } from \"./a\";\nexport interface PointWrapper extends Point {\n}","-37232372138-import { PointWrapper } from \"./b\";\nexport function getPoint(): PointWrapper {\n    return {\n        name: \"test\",\n        c: {\n            x: 1,\n            y: 2\n        }\n    }\n};","-17875457076-import { getPoint } from \"./c\";\ngetPoint().c.x;","-5185546240-import \"./d\";"],"fileIdsList":[[2],[3],[4],[5]],"referencedMap":[[3,1],[4,2],[5,3],[6,4]],"exportedModulesMap":[[3,1],[4,2],[5,3],[6,4]],"semanticDiagnosticsPerFile":[1,2,3,[4,[{"file":"./c.ts","start":139,"length":4,"code":2322,"category":1,"messageText":{"messageText":"Type '{ x: number; y: number; }' is not assignable to type 'Coords'.","category":1,"code":2322,"next":[{"messageText":"Object literal may only specify known properties, and 'x' does not exist in type 'Coords'.","category":1,"code":2353}]},"relatedInformation":[{"file":"./a.ts","start":47,"length":1,"messageText":"The expected type comes from property 'c' which is declared here on type 'PointWrapper'","category":3,"code":6500}]}]],[5,[{"file":"./d.ts","start":45,"length":1,"code":2339,"category":1,"messageText":"Property 'x' does not exist on type 'Coords'."}]],6]},"version":"FakeTSVersion"}

//// [/user/username/projects/myproject/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../a/lib/lib.d.ts",
      "./a.ts",
      "./b.ts",
      "./c.ts",
      "./d.ts",
      "./e.ts"
    ],
    "fileNamesList": [
      [
        "./a.ts"
      ],
      [
        "./b.ts"
      ],
      [
        "./c.ts"
      ],
      [
        "./d.ts"
      ]
    ],
    "fileInfos": {
      "../../../../a/lib/lib.d.ts": {
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true
      },
      "./a.ts": {
        "version": "9889814467-export interface Point {\n    name: string;\n    c: Coords;\n}\nexport interface Coords {\n    x2: number;\n    y: number;\n}",
        "signature": "8536297517-export interface Point {\n    name: string;\n    c: Coords;\n}\nexport interface Coords {\n    x2: number;\n    y: number;\n}\n"
      },
      "./b.ts": {
        "version": "-8029610078-import { Point } from \"./a\";\nexport interface PointWrapper extends Point {\n}",
        "signature": "-8029610078-import { Point } from \"./a\";\nexport interface PointWrapper extends Point {\n}"
      },
      "./c.ts": {
        "version": "-37232372138-import { PointWrapper } from \"./b\";\nexport function getPoint(): PointWrapper {\n    return {\n        name: \"test\",\n        c: {\n            x: 1,\n            y: 2\n        }\n    }\n};",
        "signature": "-37232372138-import { PointWrapper } from \"./b\";\nexport function getPoint(): PointWrapper {\n    return {\n        name: \"test\",\n        c: {\n            x: 1,\n            y: 2\n        }\n    }\n};"
      },
      "./d.ts": {
        "version": "-17875457076-import { getPoint } from \"./c\";\ngetPoint().c.x;",
        "signature": "-17875457076-import { getPoint } from \"./c\";\ngetPoint().c.x;"
      },
      "./e.ts": {
        "version": "-5185546240-import \"./d\";",
        "signature": "-5185546240-import \"./d\";"
      }
    },
    "referencedMap": {
      "./b.ts": [
        "./a.ts"
      ],
      "./c.ts": [
        "./b.ts"
      ],
      "./d.ts": [
        "./c.ts"
      ],
      "./e.ts": [
        "./d.ts"
      ]
    },
    "exportedModulesMap": {
      "./b.ts": [
        "./a.ts"
      ],
      "./c.ts": [
        "./b.ts"
      ],
      "./d.ts": [
        "./c.ts"
      ],
      "./e.ts": [
        "./d.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../../../a/lib/lib.d.ts",
      "./a.ts",
      "./b.ts",
      [
        "./c.ts",
        [
          {
            "file": "./c.ts",
            "start": 139,
            "length": 4,
            "code": 2322,
            "category": 1,
            "messageText": {
              "messageText": "Type '{ x: number; y: number; }' is not assignable to type 'Coords'.",
              "category": 1,
              "code": 2322,
              "next": [
                {
                  "messageText": "Object literal may only specify known properties, and 'x' does not exist in type 'Coords'.",
                  "category": 1,
                  "code": 2353
                }
              ]
            },
            "relatedInformation": [
              {
                "file": "./a.ts",
                "start": 47,
                "length": 1,
                "messageText": "The expected type comes from property 'c' which is declared here on type 'PointWrapper'",
                "category": 3,
                "code": 6500
              }
            ]
          }
        ]
      ],
      [
        "./d.ts",
        [
          {
            "file": "./d.ts",
            "start": 45,
            "length": 1,
            "code": 2339,
            "category": 1,
            "messageText": "Property 'x' does not exist on type 'Coords'."
          }
        ]
      ],
      "./e.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 2070
}


Change:: Rename property x2 to x of interface Coords

Input::
//// [/user/username/projects/myproject/a.ts]
export interface Point {
    name: string;
    c: Coords;
}
export interface Coords {
    x: number;
    y: number;
}


Output::
>> Screen clear
[[90m12:01:16 AM[0m] File change detected. Starting incremental compilation...

[[90m12:01:23 AM[0m] Found 0 errors. Watching for file changes.



Program root files: ["/user/username/projects/myproject/a.ts","/user/username/projects/myproject/b.ts","/user/username/projects/myproject/c.ts","/user/username/projects/myproject/d.ts","/user/username/projects/myproject/e.ts"]
Program options: {"isolatedModules":true,"watch":true,"incremental":true,"configFilePath":"/user/username/projects/myproject/tsconfig.json"}
Program structureReused: Completely
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/a.ts
/user/username/projects/myproject/b.ts
/user/username/projects/myproject/c.ts
/user/username/projects/myproject/d.ts
/user/username/projects/myproject/e.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/myproject/a.ts
/user/username/projects/myproject/b.ts
/user/username/projects/myproject/c.ts
/user/username/projects/myproject/d.ts
/user/username/projects/myproject/e.ts

Shape signatures in builder refreshed for::
/user/username/projects/myproject/a.ts (computed .d.ts)
/user/username/projects/myproject/b.ts (used version)
/user/username/projects/myproject/c.ts (used version)
/user/username/projects/myproject/d.ts (used version)
/user/username/projects/myproject/e.ts (used version)

WatchedFiles::
/user/username/projects/myproject/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/a.ts:
  {"fileName":"/user/username/projects/myproject/a.ts","pollingInterval":250}
/user/username/projects/myproject/b.ts:
  {"fileName":"/user/username/projects/myproject/b.ts","pollingInterval":250}
/user/username/projects/myproject/c.ts:
  {"fileName":"/user/username/projects/myproject/c.ts","pollingInterval":250}
/user/username/projects/myproject/d.ts:
  {"fileName":"/user/username/projects/myproject/d.ts","pollingInterval":250}
/user/username/projects/myproject/e.ts:
  {"fileName":"/user/username/projects/myproject/e.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/myproject/node_modules/@types:
  {"directoryName":"/user/username/projects/myproject/node_modules/@types","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject:
  {"directoryName":"/user/username/projects/myproject","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

//// [/user/username/projects/myproject/a.js] file written with same contents
//// [/user/username/projects/myproject/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../a/lib/lib.d.ts","./a.ts","./b.ts","./c.ts","./d.ts","./e.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},{"version":"2103509937-export interface Point {\n    name: string;\n    c: Coords;\n}\nexport interface Coords {\n    x: number;\n    y: number;\n}","signature":"696351195-export interface Point {\n    name: string;\n    c: Coords;\n}\nexport interface Coords {\n    x: number;\n    y: number;\n}\n"},"-8029610078-import { Point } from \"./a\";\nexport interface PointWrapper extends Point {\n}","-37232372138-import { PointWrapper } from \"./b\";\nexport function getPoint(): PointWrapper {\n    return {\n        name: \"test\",\n        c: {\n            x: 1,\n            y: 2\n        }\n    }\n};","-17875457076-import { getPoint } from \"./c\";\ngetPoint().c.x;","-5185546240-import \"./d\";"],"fileIdsList":[[2],[3],[4],[5]],"referencedMap":[[3,1],[4,2],[5,3],[6,4]],"exportedModulesMap":[[3,1],[4,2],[5,3],[6,4]],"semanticDiagnosticsPerFile":[1,2,3,4,5,6]},"version":"FakeTSVersion"}

//// [/user/username/projects/myproject/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../a/lib/lib.d.ts",
      "./a.ts",
      "./b.ts",
      "./c.ts",
      "./d.ts",
      "./e.ts"
    ],
    "fileNamesList": [
      [
        "./a.ts"
      ],
      [
        "./b.ts"
      ],
      [
        "./c.ts"
      ],
      [
        "./d.ts"
      ]
    ],
    "fileInfos": {
      "../../../../a/lib/lib.d.ts": {
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true
      },
      "./a.ts": {
        "version": "2103509937-export interface Point {\n    name: string;\n    c: Coords;\n}\nexport interface Coords {\n    x: number;\n    y: number;\n}",
        "signature": "696351195-export interface Point {\n    name: string;\n    c: Coords;\n}\nexport interface Coords {\n    x: number;\n    y: number;\n}\n"
      },
      "./b.ts": {
        "version": "-8029610078-import { Point } from \"./a\";\nexport interface PointWrapper extends Point {\n}",
        "signature": "-8029610078-import { Point } from \"./a\";\nexport interface PointWrapper extends Point {\n}"
      },
      "./c.ts": {
        "version": "-37232372138-import { PointWrapper } from \"./b\";\nexport function getPoint(): PointWrapper {\n    return {\n        name: \"test\",\n        c: {\n            x: 1,\n            y: 2\n        }\n    }\n};",
        "signature": "-37232372138-import { PointWrapper } from \"./b\";\nexport function getPoint(): PointWrapper {\n    return {\n        name: \"test\",\n        c: {\n            x: 1,\n            y: 2\n        }\n    }\n};"
      },
      "./d.ts": {
        "version": "-17875457076-import { getPoint } from \"./c\";\ngetPoint().c.x;",
        "signature": "-17875457076-import { getPoint } from \"./c\";\ngetPoint().c.x;"
      },
      "./e.ts": {
        "version": "-5185546240-import \"./d\";",
        "signature": "-5185546240-import \"./d\";"
      }
    },
    "referencedMap": {
      "./b.ts": [
        "./a.ts"
      ],
      "./c.ts": [
        "./b.ts"
      ],
      "./d.ts": [
        "./c.ts"
      ],
      "./e.ts": [
        "./d.ts"
      ]
    },
    "exportedModulesMap": {
      "./b.ts": [
        "./a.ts"
      ],
      "./c.ts": [
        "./b.ts"
      ],
      "./d.ts": [
        "./c.ts"
      ],
      "./e.ts": [
        "./d.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../../../a/lib/lib.d.ts",
      "./a.ts",
      "./b.ts",
      "./c.ts",
      "./d.ts",
      "./e.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 1405
}

