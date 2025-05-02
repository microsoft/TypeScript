currentDirectory:: /user/username/projects/myproject useCaseSensitiveFileNames:: false
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
{}

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


/home/src/tslibs/TS/Lib/tsc.js --w --isolatedModules --d --incremental
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] Starting compilation in watch mode...

[96mc.ts[0m:[93m6[0m:[93m13[0m - [91merror[0m[90m TS2353: [0mObject literal may only specify known properties, and 'x' does not exist in type 'Coords'.

[7m6[0m             x: 1,
[7m [0m [91m            ~[0m

  [96ma.ts[0m:[93m3[0m:[93m5[0m
    [7m3[0m     c: Coords;
    [7m [0m [96m    ~[0m
    The expected type comes from property 'c' which is declared here on type 'PointWrapper'

[96md.ts[0m:[93m2[0m:[93m14[0m - [91merror[0m[90m TS2339: [0mProperty 'x' does not exist on type 'Coords'.

[7m2[0m getPoint().c.x;
[7m [0m [91m             ~[0m

[[90mHH:MM:SS AM[0m] Found 2 errors. Watching for file changes.



//// [/user/username/projects/myproject/a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });


//// [/user/username/projects/myproject/a.d.ts]
export interface Point {
    name: string;
    c: Coords;
}
export interface Coords {
    x2: number;
    y: number;
}


//// [/user/username/projects/myproject/b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });


//// [/user/username/projects/myproject/b.d.ts]
import { Point } from "./a";
export interface PointWrapper extends Point {
}


//// [/user/username/projects/myproject/c.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPoint = getPoint;
function getPoint() {
    return {
        name: "test",
        c: {
            x: 1,
            y: 2
        }
    };
}
;


//// [/user/username/projects/myproject/c.d.ts]
import { PointWrapper } from "./b";
export declare function getPoint(): PointWrapper;


//// [/user/username/projects/myproject/d.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var c_1 = require("./c");
(0, c_1.getPoint)().c.x;


//// [/user/username/projects/myproject/d.d.ts]
export {};


//// [/user/username/projects/myproject/e.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./d");


//// [/user/username/projects/myproject/e.d.ts]
import "./d";


//// [/user/username/projects/myproject/tsconfig.tsbuildinfo]
{"fileNames":["../../../../home/src/tslibs/ts/lib/lib.d.ts","./a.ts","./b.ts","./c.ts","./d.ts","./e.ts"],"fileIdsList":[[2],[3],[4],[5]],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"9889814467-export interface Point {\n    name: string;\n    c: Coords;\n}\nexport interface Coords {\n    x2: number;\n    y: number;\n}","signature":"8536297517-export interface Point {\n    name: string;\n    c: Coords;\n}\nexport interface Coords {\n    x2: number;\n    y: number;\n}\n"},{"version":"-8029610078-import { Point } from \"./a\";\nexport interface PointWrapper extends Point {\n}","signature":"-7279094804-import { Point } from \"./a\";\nexport interface PointWrapper extends Point {\n}\n"},{"version":"-37232372138-import { PointWrapper } from \"./b\";\nexport function getPoint(): PointWrapper {\n    return {\n        name: \"test\",\n        c: {\n            x: 1,\n            y: 2\n        }\n    }\n};","signature":"-3387333988-import { PointWrapper } from \"./b\";\nexport declare function getPoint(): PointWrapper;\n"},{"version":"-17875457076-import { getPoint } from \"./c\";\ngetPoint().c.x;","signature":"-3531856636-export {};\n"},{"version":"-5185546240-import \"./d\";","signature":"-3619301366-import \"./d\";\n"}],"root":[[2,6]],"options":{"declaration":true},"referencedMap":[[3,1],[4,2],[5,3],[6,4]],"semanticDiagnosticsPerFile":[[4,[{"start":139,"length":1,"code":2353,"category":1,"messageText":"Object literal may only specify known properties, and 'x' does not exist in type 'Coords'.","relatedInformation":[{"file":"./a.ts","start":47,"length":1,"messageText":"The expected type comes from property 'c' which is declared here on type 'PointWrapper'","category":3,"code":6500}]}]],[5,[{"start":45,"length":1,"code":2339,"category":1,"messageText":"Property 'x' does not exist on type 'Coords'."}]]],"version":"FakeTSVersion"}

//// [/user/username/projects/myproject/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../home/src/tslibs/ts/lib/lib.d.ts",
    "./a.ts",
    "./b.ts",
    "./c.ts",
    "./d.ts",
    "./e.ts"
  ],
  "fileIdsList": [
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
    "../../../../home/src/tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "./a.ts": {
      "original": {
        "version": "9889814467-export interface Point {\n    name: string;\n    c: Coords;\n}\nexport interface Coords {\n    x2: number;\n    y: number;\n}",
        "signature": "8536297517-export interface Point {\n    name: string;\n    c: Coords;\n}\nexport interface Coords {\n    x2: number;\n    y: number;\n}\n"
      },
      "version": "9889814467-export interface Point {\n    name: string;\n    c: Coords;\n}\nexport interface Coords {\n    x2: number;\n    y: number;\n}",
      "signature": "8536297517-export interface Point {\n    name: string;\n    c: Coords;\n}\nexport interface Coords {\n    x2: number;\n    y: number;\n}\n"
    },
    "./b.ts": {
      "original": {
        "version": "-8029610078-import { Point } from \"./a\";\nexport interface PointWrapper extends Point {\n}",
        "signature": "-7279094804-import { Point } from \"./a\";\nexport interface PointWrapper extends Point {\n}\n"
      },
      "version": "-8029610078-import { Point } from \"./a\";\nexport interface PointWrapper extends Point {\n}",
      "signature": "-7279094804-import { Point } from \"./a\";\nexport interface PointWrapper extends Point {\n}\n"
    },
    "./c.ts": {
      "original": {
        "version": "-37232372138-import { PointWrapper } from \"./b\";\nexport function getPoint(): PointWrapper {\n    return {\n        name: \"test\",\n        c: {\n            x: 1,\n            y: 2\n        }\n    }\n};",
        "signature": "-3387333988-import { PointWrapper } from \"./b\";\nexport declare function getPoint(): PointWrapper;\n"
      },
      "version": "-37232372138-import { PointWrapper } from \"./b\";\nexport function getPoint(): PointWrapper {\n    return {\n        name: \"test\",\n        c: {\n            x: 1,\n            y: 2\n        }\n    }\n};",
      "signature": "-3387333988-import { PointWrapper } from \"./b\";\nexport declare function getPoint(): PointWrapper;\n"
    },
    "./d.ts": {
      "original": {
        "version": "-17875457076-import { getPoint } from \"./c\";\ngetPoint().c.x;",
        "signature": "-3531856636-export {};\n"
      },
      "version": "-17875457076-import { getPoint } from \"./c\";\ngetPoint().c.x;",
      "signature": "-3531856636-export {};\n"
    },
    "./e.ts": {
      "original": {
        "version": "-5185546240-import \"./d\";",
        "signature": "-3619301366-import \"./d\";\n"
      },
      "version": "-5185546240-import \"./d\";",
      "signature": "-3619301366-import \"./d\";\n"
    }
  },
  "root": [
    [
      [
        2,
        6
      ],
      [
        "./a.ts",
        "./b.ts",
        "./c.ts",
        "./d.ts",
        "./e.ts"
      ]
    ]
  ],
  "options": {
    "declaration": true
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
  "semanticDiagnosticsPerFile": [
    [
      "./c.ts",
      [
        {
          "start": 139,
          "length": 1,
          "code": 2353,
          "category": 1,
          "messageText": "Object literal may only specify known properties, and 'x' does not exist in type 'Coords'.",
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
          "start": 45,
          "length": 1,
          "code": 2339,
          "category": 1,
          "messageText": "Property 'x' does not exist on type 'Coords'."
        }
      ]
    ]
  ],
  "version": "FakeTSVersion",
  "size": 2309
}


PolledWatches::
/user/username/projects/myproject/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts: *new*
  {}
/user/username/projects/myproject/a.ts: *new*
  {}
/user/username/projects/myproject/b.ts: *new*
  {}
/user/username/projects/myproject/c.ts: *new*
  {}
/user/username/projects/myproject/d.ts: *new*
  {}
/user/username/projects/myproject/e.ts: *new*
  {}
/user/username/projects/myproject/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/user/username/projects/myproject: *new*
  {}

Program root files: [
  "/user/username/projects/myproject/a.ts",
  "/user/username/projects/myproject/b.ts",
  "/user/username/projects/myproject/c.ts",
  "/user/username/projects/myproject/d.ts",
  "/user/username/projects/myproject/e.ts"
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
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/a.ts
/user/username/projects/myproject/b.ts
/user/username/projects/myproject/c.ts
/user/username/projects/myproject/d.ts
/user/username/projects/myproject/e.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/a.ts
/user/username/projects/myproject/b.ts
/user/username/projects/myproject/c.ts
/user/username/projects/myproject/d.ts
/user/username/projects/myproject/e.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/user/username/projects/myproject/a.ts (computed .d.ts during emit)
/user/username/projects/myproject/b.ts (computed .d.ts during emit)
/user/username/projects/myproject/c.ts (computed .d.ts during emit)
/user/username/projects/myproject/d.ts (computed .d.ts during emit)
/user/username/projects/myproject/e.ts (computed .d.ts during emit)

exitCode:: ExitStatus.undefined

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


Timeout callback:: count: 1
1: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
1: timerToUpdateProgram

Host is moving to new time
After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/user/username/projects/myproject/a.js] file written with same contents
//// [/user/username/projects/myproject/a.d.ts]
export interface Point {
    name: string;
    c: Coords;
}
export interface Coords {
    x: number;
    y: number;
}


//// [/user/username/projects/myproject/b.d.ts] file written with same contents
//// [/user/username/projects/myproject/c.d.ts] file written with same contents
//// [/user/username/projects/myproject/d.d.ts] file written with same contents
//// [/user/username/projects/myproject/e.d.ts] file written with same contents
//// [/user/username/projects/myproject/tsconfig.tsbuildinfo]
{"fileNames":["../../../../home/src/tslibs/ts/lib/lib.d.ts","./a.ts","./b.ts","./c.ts","./d.ts","./e.ts"],"fileIdsList":[[2],[3],[4],[5]],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"2103509937-export interface Point {\n    name: string;\n    c: Coords;\n}\nexport interface Coords {\n    x: number;\n    y: number;\n}","signature":"696351195-export interface Point {\n    name: string;\n    c: Coords;\n}\nexport interface Coords {\n    x: number;\n    y: number;\n}\n"},{"version":"-8029610078-import { Point } from \"./a\";\nexport interface PointWrapper extends Point {\n}","signature":"-7279094804-import { Point } from \"./a\";\nexport interface PointWrapper extends Point {\n}\n"},{"version":"-37232372138-import { PointWrapper } from \"./b\";\nexport function getPoint(): PointWrapper {\n    return {\n        name: \"test\",\n        c: {\n            x: 1,\n            y: 2\n        }\n    }\n};","signature":"-3387333988-import { PointWrapper } from \"./b\";\nexport declare function getPoint(): PointWrapper;\n"},{"version":"-17875457076-import { getPoint } from \"./c\";\ngetPoint().c.x;","signature":"-3531856636-export {};\n"},{"version":"-5185546240-import \"./d\";","signature":"-3619301366-import \"./d\";\n"}],"root":[[2,6]],"options":{"declaration":true},"referencedMap":[[3,1],[4,2],[5,3],[6,4]],"version":"FakeTSVersion"}

//// [/user/username/projects/myproject/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../home/src/tslibs/ts/lib/lib.d.ts",
    "./a.ts",
    "./b.ts",
    "./c.ts",
    "./d.ts",
    "./e.ts"
  ],
  "fileIdsList": [
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
    "../../../../home/src/tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "./a.ts": {
      "original": {
        "version": "2103509937-export interface Point {\n    name: string;\n    c: Coords;\n}\nexport interface Coords {\n    x: number;\n    y: number;\n}",
        "signature": "696351195-export interface Point {\n    name: string;\n    c: Coords;\n}\nexport interface Coords {\n    x: number;\n    y: number;\n}\n"
      },
      "version": "2103509937-export interface Point {\n    name: string;\n    c: Coords;\n}\nexport interface Coords {\n    x: number;\n    y: number;\n}",
      "signature": "696351195-export interface Point {\n    name: string;\n    c: Coords;\n}\nexport interface Coords {\n    x: number;\n    y: number;\n}\n"
    },
    "./b.ts": {
      "original": {
        "version": "-8029610078-import { Point } from \"./a\";\nexport interface PointWrapper extends Point {\n}",
        "signature": "-7279094804-import { Point } from \"./a\";\nexport interface PointWrapper extends Point {\n}\n"
      },
      "version": "-8029610078-import { Point } from \"./a\";\nexport interface PointWrapper extends Point {\n}",
      "signature": "-7279094804-import { Point } from \"./a\";\nexport interface PointWrapper extends Point {\n}\n"
    },
    "./c.ts": {
      "original": {
        "version": "-37232372138-import { PointWrapper } from \"./b\";\nexport function getPoint(): PointWrapper {\n    return {\n        name: \"test\",\n        c: {\n            x: 1,\n            y: 2\n        }\n    }\n};",
        "signature": "-3387333988-import { PointWrapper } from \"./b\";\nexport declare function getPoint(): PointWrapper;\n"
      },
      "version": "-37232372138-import { PointWrapper } from \"./b\";\nexport function getPoint(): PointWrapper {\n    return {\n        name: \"test\",\n        c: {\n            x: 1,\n            y: 2\n        }\n    }\n};",
      "signature": "-3387333988-import { PointWrapper } from \"./b\";\nexport declare function getPoint(): PointWrapper;\n"
    },
    "./d.ts": {
      "original": {
        "version": "-17875457076-import { getPoint } from \"./c\";\ngetPoint().c.x;",
        "signature": "-3531856636-export {};\n"
      },
      "version": "-17875457076-import { getPoint } from \"./c\";\ngetPoint().c.x;",
      "signature": "-3531856636-export {};\n"
    },
    "./e.ts": {
      "original": {
        "version": "-5185546240-import \"./d\";",
        "signature": "-3619301366-import \"./d\";\n"
      },
      "version": "-5185546240-import \"./d\";",
      "signature": "-3619301366-import \"./d\";\n"
    }
  },
  "root": [
    [
      [
        2,
        6
      ],
      [
        "./a.ts",
        "./b.ts",
        "./c.ts",
        "./d.ts",
        "./e.ts"
      ]
    ]
  ],
  "options": {
    "declaration": true
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
  "version": "FakeTSVersion",
  "size": 1803
}



Program root files: [
  "/user/username/projects/myproject/a.ts",
  "/user/username/projects/myproject/b.ts",
  "/user/username/projects/myproject/c.ts",
  "/user/username/projects/myproject/d.ts",
  "/user/username/projects/myproject/e.ts"
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
/home/src/tslibs/TS/Lib/lib.d.ts
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
/user/username/projects/myproject/b.ts (computed .d.ts during emit)
/user/username/projects/myproject/c.ts (computed .d.ts during emit)
/user/username/projects/myproject/d.ts (computed .d.ts during emit)
/user/username/projects/myproject/e.ts (computed .d.ts during emit)

exitCode:: ExitStatus.undefined

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


Timeout callback:: count: 1
2: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
2: timerToUpdateProgram

Host is moving to new time
After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

[96mc.ts[0m:[93m6[0m:[93m13[0m - [91merror[0m[90m TS2353: [0mObject literal may only specify known properties, and 'x' does not exist in type 'Coords'.

[7m6[0m             x: 1,
[7m [0m [91m            ~[0m

  [96ma.ts[0m:[93m3[0m:[93m5[0m
    [7m3[0m     c: Coords;
    [7m [0m [96m    ~[0m
    The expected type comes from property 'c' which is declared here on type 'PointWrapper'

[96md.ts[0m:[93m2[0m:[93m14[0m - [91merror[0m[90m TS2339: [0mProperty 'x' does not exist on type 'Coords'.

[7m2[0m getPoint().c.x;
[7m [0m [91m             ~[0m

[[90mHH:MM:SS AM[0m] Found 2 errors. Watching for file changes.



//// [/user/username/projects/myproject/a.js] file written with same contents
//// [/user/username/projects/myproject/a.d.ts]
export interface Point {
    name: string;
    c: Coords;
}
export interface Coords {
    x2: number;
    y: number;
}


//// [/user/username/projects/myproject/b.d.ts] file written with same contents
//// [/user/username/projects/myproject/c.d.ts] file written with same contents
//// [/user/username/projects/myproject/d.d.ts] file written with same contents
//// [/user/username/projects/myproject/e.d.ts] file written with same contents
//// [/user/username/projects/myproject/tsconfig.tsbuildinfo]
{"fileNames":["../../../../home/src/tslibs/ts/lib/lib.d.ts","./a.ts","./b.ts","./c.ts","./d.ts","./e.ts"],"fileIdsList":[[2],[3],[4],[5]],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"9889814467-export interface Point {\n    name: string;\n    c: Coords;\n}\nexport interface Coords {\n    x2: number;\n    y: number;\n}","signature":"8536297517-export interface Point {\n    name: string;\n    c: Coords;\n}\nexport interface Coords {\n    x2: number;\n    y: number;\n}\n"},{"version":"-8029610078-import { Point } from \"./a\";\nexport interface PointWrapper extends Point {\n}","signature":"-7279094804-import { Point } from \"./a\";\nexport interface PointWrapper extends Point {\n}\n"},{"version":"-37232372138-import { PointWrapper } from \"./b\";\nexport function getPoint(): PointWrapper {\n    return {\n        name: \"test\",\n        c: {\n            x: 1,\n            y: 2\n        }\n    }\n};","signature":"-3387333988-import { PointWrapper } from \"./b\";\nexport declare function getPoint(): PointWrapper;\n"},{"version":"-17875457076-import { getPoint } from \"./c\";\ngetPoint().c.x;","signature":"-3531856636-export {};\n"},{"version":"-5185546240-import \"./d\";","signature":"-3619301366-import \"./d\";\n"}],"root":[[2,6]],"options":{"declaration":true},"referencedMap":[[3,1],[4,2],[5,3],[6,4]],"semanticDiagnosticsPerFile":[[4,[{"start":139,"length":1,"code":2353,"category":1,"messageText":"Object literal may only specify known properties, and 'x' does not exist in type 'Coords'.","relatedInformation":[{"file":"./a.ts","start":47,"length":1,"messageText":"The expected type comes from property 'c' which is declared here on type 'PointWrapper'","category":3,"code":6500}]}]],[5,[{"start":45,"length":1,"code":2339,"category":1,"messageText":"Property 'x' does not exist on type 'Coords'."}]]],"version":"FakeTSVersion"}

//// [/user/username/projects/myproject/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../home/src/tslibs/ts/lib/lib.d.ts",
    "./a.ts",
    "./b.ts",
    "./c.ts",
    "./d.ts",
    "./e.ts"
  ],
  "fileIdsList": [
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
    "../../../../home/src/tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "./a.ts": {
      "original": {
        "version": "9889814467-export interface Point {\n    name: string;\n    c: Coords;\n}\nexport interface Coords {\n    x2: number;\n    y: number;\n}",
        "signature": "8536297517-export interface Point {\n    name: string;\n    c: Coords;\n}\nexport interface Coords {\n    x2: number;\n    y: number;\n}\n"
      },
      "version": "9889814467-export interface Point {\n    name: string;\n    c: Coords;\n}\nexport interface Coords {\n    x2: number;\n    y: number;\n}",
      "signature": "8536297517-export interface Point {\n    name: string;\n    c: Coords;\n}\nexport interface Coords {\n    x2: number;\n    y: number;\n}\n"
    },
    "./b.ts": {
      "original": {
        "version": "-8029610078-import { Point } from \"./a\";\nexport interface PointWrapper extends Point {\n}",
        "signature": "-7279094804-import { Point } from \"./a\";\nexport interface PointWrapper extends Point {\n}\n"
      },
      "version": "-8029610078-import { Point } from \"./a\";\nexport interface PointWrapper extends Point {\n}",
      "signature": "-7279094804-import { Point } from \"./a\";\nexport interface PointWrapper extends Point {\n}\n"
    },
    "./c.ts": {
      "original": {
        "version": "-37232372138-import { PointWrapper } from \"./b\";\nexport function getPoint(): PointWrapper {\n    return {\n        name: \"test\",\n        c: {\n            x: 1,\n            y: 2\n        }\n    }\n};",
        "signature": "-3387333988-import { PointWrapper } from \"./b\";\nexport declare function getPoint(): PointWrapper;\n"
      },
      "version": "-37232372138-import { PointWrapper } from \"./b\";\nexport function getPoint(): PointWrapper {\n    return {\n        name: \"test\",\n        c: {\n            x: 1,\n            y: 2\n        }\n    }\n};",
      "signature": "-3387333988-import { PointWrapper } from \"./b\";\nexport declare function getPoint(): PointWrapper;\n"
    },
    "./d.ts": {
      "original": {
        "version": "-17875457076-import { getPoint } from \"./c\";\ngetPoint().c.x;",
        "signature": "-3531856636-export {};\n"
      },
      "version": "-17875457076-import { getPoint } from \"./c\";\ngetPoint().c.x;",
      "signature": "-3531856636-export {};\n"
    },
    "./e.ts": {
      "original": {
        "version": "-5185546240-import \"./d\";",
        "signature": "-3619301366-import \"./d\";\n"
      },
      "version": "-5185546240-import \"./d\";",
      "signature": "-3619301366-import \"./d\";\n"
    }
  },
  "root": [
    [
      [
        2,
        6
      ],
      [
        "./a.ts",
        "./b.ts",
        "./c.ts",
        "./d.ts",
        "./e.ts"
      ]
    ]
  ],
  "options": {
    "declaration": true
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
  "semanticDiagnosticsPerFile": [
    [
      "./c.ts",
      [
        {
          "start": 139,
          "length": 1,
          "code": 2353,
          "category": 1,
          "messageText": "Object literal may only specify known properties, and 'x' does not exist in type 'Coords'.",
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
          "start": 45,
          "length": 1,
          "code": 2339,
          "category": 1,
          "messageText": "Property 'x' does not exist on type 'Coords'."
        }
      ]
    ]
  ],
  "version": "FakeTSVersion",
  "size": 2309
}



Program root files: [
  "/user/username/projects/myproject/a.ts",
  "/user/username/projects/myproject/b.ts",
  "/user/username/projects/myproject/c.ts",
  "/user/username/projects/myproject/d.ts",
  "/user/username/projects/myproject/e.ts"
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
/home/src/tslibs/TS/Lib/lib.d.ts
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
/user/username/projects/myproject/b.ts (computed .d.ts during emit)
/user/username/projects/myproject/c.ts (computed .d.ts during emit)
/user/username/projects/myproject/d.ts (computed .d.ts during emit)
/user/username/projects/myproject/e.ts (computed .d.ts during emit)

exitCode:: ExitStatus.undefined

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


Timeout callback:: count: 1
3: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
3: timerToUpdateProgram

Host is moving to new time
After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/user/username/projects/myproject/a.js] file written with same contents
//// [/user/username/projects/myproject/a.d.ts]
export interface Point {
    name: string;
    c: Coords;
}
export interface Coords {
    x: number;
    y: number;
}


//// [/user/username/projects/myproject/b.d.ts] file written with same contents
//// [/user/username/projects/myproject/c.d.ts] file written with same contents
//// [/user/username/projects/myproject/d.d.ts] file written with same contents
//// [/user/username/projects/myproject/e.d.ts] file written with same contents
//// [/user/username/projects/myproject/tsconfig.tsbuildinfo]
{"fileNames":["../../../../home/src/tslibs/ts/lib/lib.d.ts","./a.ts","./b.ts","./c.ts","./d.ts","./e.ts"],"fileIdsList":[[2],[3],[4],[5]],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"2103509937-export interface Point {\n    name: string;\n    c: Coords;\n}\nexport interface Coords {\n    x: number;\n    y: number;\n}","signature":"696351195-export interface Point {\n    name: string;\n    c: Coords;\n}\nexport interface Coords {\n    x: number;\n    y: number;\n}\n"},{"version":"-8029610078-import { Point } from \"./a\";\nexport interface PointWrapper extends Point {\n}","signature":"-7279094804-import { Point } from \"./a\";\nexport interface PointWrapper extends Point {\n}\n"},{"version":"-37232372138-import { PointWrapper } from \"./b\";\nexport function getPoint(): PointWrapper {\n    return {\n        name: \"test\",\n        c: {\n            x: 1,\n            y: 2\n        }\n    }\n};","signature":"-3387333988-import { PointWrapper } from \"./b\";\nexport declare function getPoint(): PointWrapper;\n"},{"version":"-17875457076-import { getPoint } from \"./c\";\ngetPoint().c.x;","signature":"-3531856636-export {};\n"},{"version":"-5185546240-import \"./d\";","signature":"-3619301366-import \"./d\";\n"}],"root":[[2,6]],"options":{"declaration":true},"referencedMap":[[3,1],[4,2],[5,3],[6,4]],"version":"FakeTSVersion"}

//// [/user/username/projects/myproject/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../home/src/tslibs/ts/lib/lib.d.ts",
    "./a.ts",
    "./b.ts",
    "./c.ts",
    "./d.ts",
    "./e.ts"
  ],
  "fileIdsList": [
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
    "../../../../home/src/tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "./a.ts": {
      "original": {
        "version": "2103509937-export interface Point {\n    name: string;\n    c: Coords;\n}\nexport interface Coords {\n    x: number;\n    y: number;\n}",
        "signature": "696351195-export interface Point {\n    name: string;\n    c: Coords;\n}\nexport interface Coords {\n    x: number;\n    y: number;\n}\n"
      },
      "version": "2103509937-export interface Point {\n    name: string;\n    c: Coords;\n}\nexport interface Coords {\n    x: number;\n    y: number;\n}",
      "signature": "696351195-export interface Point {\n    name: string;\n    c: Coords;\n}\nexport interface Coords {\n    x: number;\n    y: number;\n}\n"
    },
    "./b.ts": {
      "original": {
        "version": "-8029610078-import { Point } from \"./a\";\nexport interface PointWrapper extends Point {\n}",
        "signature": "-7279094804-import { Point } from \"./a\";\nexport interface PointWrapper extends Point {\n}\n"
      },
      "version": "-8029610078-import { Point } from \"./a\";\nexport interface PointWrapper extends Point {\n}",
      "signature": "-7279094804-import { Point } from \"./a\";\nexport interface PointWrapper extends Point {\n}\n"
    },
    "./c.ts": {
      "original": {
        "version": "-37232372138-import { PointWrapper } from \"./b\";\nexport function getPoint(): PointWrapper {\n    return {\n        name: \"test\",\n        c: {\n            x: 1,\n            y: 2\n        }\n    }\n};",
        "signature": "-3387333988-import { PointWrapper } from \"./b\";\nexport declare function getPoint(): PointWrapper;\n"
      },
      "version": "-37232372138-import { PointWrapper } from \"./b\";\nexport function getPoint(): PointWrapper {\n    return {\n        name: \"test\",\n        c: {\n            x: 1,\n            y: 2\n        }\n    }\n};",
      "signature": "-3387333988-import { PointWrapper } from \"./b\";\nexport declare function getPoint(): PointWrapper;\n"
    },
    "./d.ts": {
      "original": {
        "version": "-17875457076-import { getPoint } from \"./c\";\ngetPoint().c.x;",
        "signature": "-3531856636-export {};\n"
      },
      "version": "-17875457076-import { getPoint } from \"./c\";\ngetPoint().c.x;",
      "signature": "-3531856636-export {};\n"
    },
    "./e.ts": {
      "original": {
        "version": "-5185546240-import \"./d\";",
        "signature": "-3619301366-import \"./d\";\n"
      },
      "version": "-5185546240-import \"./d\";",
      "signature": "-3619301366-import \"./d\";\n"
    }
  },
  "root": [
    [
      [
        2,
        6
      ],
      [
        "./a.ts",
        "./b.ts",
        "./c.ts",
        "./d.ts",
        "./e.ts"
      ]
    ]
  ],
  "options": {
    "declaration": true
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
  "version": "FakeTSVersion",
  "size": 1803
}



Program root files: [
  "/user/username/projects/myproject/a.ts",
  "/user/username/projects/myproject/b.ts",
  "/user/username/projects/myproject/c.ts",
  "/user/username/projects/myproject/d.ts",
  "/user/username/projects/myproject/e.ts"
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
/home/src/tslibs/TS/Lib/lib.d.ts
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
/user/username/projects/myproject/b.ts (computed .d.ts during emit)
/user/username/projects/myproject/c.ts (computed .d.ts during emit)
/user/username/projects/myproject/d.ts (computed .d.ts during emit)
/user/username/projects/myproject/e.ts (computed .d.ts during emit)

exitCode:: ExitStatus.undefined
