currentDirectory:: /user/username/projects/myproject useCaseSensitiveFileNames:: false
Input::
//// [/user/username/projects/myproject/a.ts]
import {B} from './b';
declare var console: any;
let b = new B();
console.log(b.c.d);

//// [/user/username/projects/myproject/b.ts]
import {C} from './c';
export class B
{
    c = new C();
}

//// [/user/username/projects/myproject/c.ts]
export class C
{
    d = 1;
}

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


/home/src/tslibs/TS/Lib/tsc.js --w --assumeChangesOnlyAffectDirectDependencies --d --incremental
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] Starting compilation in watch mode...

[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/user/username/projects/myproject/c.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.C = void 0;
var C = /** @class */ (function () {
    function C() {
        this.d = 1;
    }
    return C;
}());
exports.C = C;


//// [/user/username/projects/myproject/c.d.ts]
export declare class C {
    d: number;
}


//// [/user/username/projects/myproject/b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.B = void 0;
var c_1 = require("./c");
var B = /** @class */ (function () {
    function B() {
        this.c = new c_1.C();
    }
    return B;
}());
exports.B = B;


//// [/user/username/projects/myproject/b.d.ts]
import { C } from './c';
export declare class B {
    c: C;
}


//// [/user/username/projects/myproject/a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var b_1 = require("./b");
var b = new b_1.B();
console.log(b.c.d);


//// [/user/username/projects/myproject/a.d.ts]
export {};


//// [/user/username/projects/myproject/tsconfig.tsbuildinfo]
{"fileNames":["../../../../home/src/tslibs/ts/lib/lib.d.ts","./c.ts","./b.ts","./a.ts"],"fileIdsList":[[3],[2]],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-22447130237-export class C\n{\n    d = 1;\n}","signature":"-6977846840-export declare class C {\n    d: number;\n}\n"},{"version":"-6292386773-import {C} from './c';\nexport class B\n{\n    c = new C();\n}","signature":"-165097315-import { C } from './c';\nexport declare class B {\n    c: C;\n}\n"},{"version":"4878398349-import {B} from './b';\ndeclare var console: any;\nlet b = new B();\nconsole.log(b.c.d);","signature":"-3531856636-export {};\n"}],"root":[[2,4]],"options":{"assumeChangesOnlyAffectDirectDependencies":true,"declaration":true},"referencedMap":[[4,1],[3,2]],"version":"FakeTSVersion"}

//// [/user/username/projects/myproject/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../home/src/tslibs/ts/lib/lib.d.ts",
    "./c.ts",
    "./b.ts",
    "./a.ts"
  ],
  "fileIdsList": [
    [
      "./b.ts"
    ],
    [
      "./c.ts"
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
    "./c.ts": {
      "original": {
        "version": "-22447130237-export class C\n{\n    d = 1;\n}",
        "signature": "-6977846840-export declare class C {\n    d: number;\n}\n"
      },
      "version": "-22447130237-export class C\n{\n    d = 1;\n}",
      "signature": "-6977846840-export declare class C {\n    d: number;\n}\n"
    },
    "./b.ts": {
      "original": {
        "version": "-6292386773-import {C} from './c';\nexport class B\n{\n    c = new C();\n}",
        "signature": "-165097315-import { C } from './c';\nexport declare class B {\n    c: C;\n}\n"
      },
      "version": "-6292386773-import {C} from './c';\nexport class B\n{\n    c = new C();\n}",
      "signature": "-165097315-import { C } from './c';\nexport declare class B {\n    c: C;\n}\n"
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
        "./c.ts",
        "./b.ts",
        "./a.ts"
      ]
    ]
  ],
  "options": {
    "assumeChangesOnlyAffectDirectDependencies": true,
    "declaration": true
  },
  "referencedMap": {
    "./a.ts": [
      "./b.ts"
    ],
    "./b.ts": [
      "./c.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 1222
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
/user/username/projects/myproject/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/user/username/projects/myproject: *new*
  {}

Program root files: [
  "/user/username/projects/myproject/a.ts",
  "/user/username/projects/myproject/b.ts",
  "/user/username/projects/myproject/c.ts"
]
Program options: {
  "watch": true,
  "assumeChangesOnlyAffectDirectDependencies": true,
  "declaration": true,
  "incremental": true,
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/c.ts
/user/username/projects/myproject/b.ts
/user/username/projects/myproject/a.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/c.ts
/user/username/projects/myproject/b.ts
/user/username/projects/myproject/a.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/user/username/projects/myproject/c.ts (computed .d.ts during emit)
/user/username/projects/myproject/b.ts (computed .d.ts during emit)
/user/username/projects/myproject/a.ts (computed .d.ts during emit)

exitCode:: ExitStatus.undefined

Change:: Rename property d to d2 of class C to initialize signatures

Input::
//// [/user/username/projects/myproject/c.ts]
export class C
{
    d2 = 1;
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



//// [/user/username/projects/myproject/c.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.C = void 0;
var C = /** @class */ (function () {
    function C() {
        this.d2 = 1;
    }
    return C;
}());
exports.C = C;


//// [/user/username/projects/myproject/c.d.ts]
export declare class C {
    d2: number;
}


//// [/user/username/projects/myproject/b.js] file written with same contents
//// [/user/username/projects/myproject/b.d.ts] file written with same contents
//// [/user/username/projects/myproject/tsconfig.tsbuildinfo]
{"fileNames":["../../../../home/src/tslibs/ts/lib/lib.d.ts","./c.ts","./b.ts","./a.ts"],"fileIdsList":[[3],[2]],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-22846341163-export class C\n{\n    d2 = 1;\n}","signature":"-4637923302-export declare class C {\n    d2: number;\n}\n"},{"version":"-6292386773-import {C} from './c';\nexport class B\n{\n    c = new C();\n}","signature":"-165097315-import { C } from './c';\nexport declare class B {\n    c: C;\n}\n"},{"version":"4878398349-import {B} from './b';\ndeclare var console: any;\nlet b = new B();\nconsole.log(b.c.d);","signature":"-3531856636-export {};\n"}],"root":[[2,4]],"options":{"assumeChangesOnlyAffectDirectDependencies":true,"declaration":true},"referencedMap":[[4,1],[3,2]],"version":"FakeTSVersion"}

//// [/user/username/projects/myproject/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../home/src/tslibs/ts/lib/lib.d.ts",
    "./c.ts",
    "./b.ts",
    "./a.ts"
  ],
  "fileIdsList": [
    [
      "./b.ts"
    ],
    [
      "./c.ts"
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
    "./c.ts": {
      "original": {
        "version": "-22846341163-export class C\n{\n    d2 = 1;\n}",
        "signature": "-4637923302-export declare class C {\n    d2: number;\n}\n"
      },
      "version": "-22846341163-export class C\n{\n    d2 = 1;\n}",
      "signature": "-4637923302-export declare class C {\n    d2: number;\n}\n"
    },
    "./b.ts": {
      "original": {
        "version": "-6292386773-import {C} from './c';\nexport class B\n{\n    c = new C();\n}",
        "signature": "-165097315-import { C } from './c';\nexport declare class B {\n    c: C;\n}\n"
      },
      "version": "-6292386773-import {C} from './c';\nexport class B\n{\n    c = new C();\n}",
      "signature": "-165097315-import { C } from './c';\nexport declare class B {\n    c: C;\n}\n"
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
        "./c.ts",
        "./b.ts",
        "./a.ts"
      ]
    ]
  ],
  "options": {
    "assumeChangesOnlyAffectDirectDependencies": true,
    "declaration": true
  },
  "referencedMap": {
    "./a.ts": [
      "./b.ts"
    ],
    "./b.ts": [
      "./c.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 1224
}



Program root files: [
  "/user/username/projects/myproject/a.ts",
  "/user/username/projects/myproject/b.ts",
  "/user/username/projects/myproject/c.ts"
]
Program options: {
  "watch": true,
  "assumeChangesOnlyAffectDirectDependencies": true,
  "declaration": true,
  "incremental": true,
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
}
Program structureReused: Completely
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/c.ts
/user/username/projects/myproject/b.ts
/user/username/projects/myproject/a.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/myproject/c.ts
/user/username/projects/myproject/b.ts

Shape signatures in builder refreshed for::
/user/username/projects/myproject/c.ts (computed .d.ts)
/user/username/projects/myproject/b.ts (computed .d.ts)

exitCode:: ExitStatus.undefined

Change:: Rename property d2 to d of class C to revert back to original text

Input::
//// [/user/username/projects/myproject/c.ts]
export class C
{
    d = 1;
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

[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/user/username/projects/myproject/c.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.C = void 0;
var C = /** @class */ (function () {
    function C() {
        this.d = 1;
    }
    return C;
}());
exports.C = C;


//// [/user/username/projects/myproject/c.d.ts]
export declare class C {
    d: number;
}


//// [/user/username/projects/myproject/b.js] file written with same contents
//// [/user/username/projects/myproject/b.d.ts] file written with same contents
//// [/user/username/projects/myproject/tsconfig.tsbuildinfo]
{"fileNames":["../../../../home/src/tslibs/ts/lib/lib.d.ts","./c.ts","./b.ts","./a.ts"],"fileIdsList":[[3],[2]],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-22447130237-export class C\n{\n    d = 1;\n}","signature":"-6977846840-export declare class C {\n    d: number;\n}\n"},{"version":"-6292386773-import {C} from './c';\nexport class B\n{\n    c = new C();\n}","signature":"-165097315-import { C } from './c';\nexport declare class B {\n    c: C;\n}\n"},{"version":"4878398349-import {B} from './b';\ndeclare var console: any;\nlet b = new B();\nconsole.log(b.c.d);","signature":"-3531856636-export {};\n"}],"root":[[2,4]],"options":{"assumeChangesOnlyAffectDirectDependencies":true,"declaration":true},"referencedMap":[[4,1],[3,2]],"version":"FakeTSVersion"}

//// [/user/username/projects/myproject/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../home/src/tslibs/ts/lib/lib.d.ts",
    "./c.ts",
    "./b.ts",
    "./a.ts"
  ],
  "fileIdsList": [
    [
      "./b.ts"
    ],
    [
      "./c.ts"
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
    "./c.ts": {
      "original": {
        "version": "-22447130237-export class C\n{\n    d = 1;\n}",
        "signature": "-6977846840-export declare class C {\n    d: number;\n}\n"
      },
      "version": "-22447130237-export class C\n{\n    d = 1;\n}",
      "signature": "-6977846840-export declare class C {\n    d: number;\n}\n"
    },
    "./b.ts": {
      "original": {
        "version": "-6292386773-import {C} from './c';\nexport class B\n{\n    c = new C();\n}",
        "signature": "-165097315-import { C } from './c';\nexport declare class B {\n    c: C;\n}\n"
      },
      "version": "-6292386773-import {C} from './c';\nexport class B\n{\n    c = new C();\n}",
      "signature": "-165097315-import { C } from './c';\nexport declare class B {\n    c: C;\n}\n"
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
        "./c.ts",
        "./b.ts",
        "./a.ts"
      ]
    ]
  ],
  "options": {
    "assumeChangesOnlyAffectDirectDependencies": true,
    "declaration": true
  },
  "referencedMap": {
    "./a.ts": [
      "./b.ts"
    ],
    "./b.ts": [
      "./c.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 1222
}



Program root files: [
  "/user/username/projects/myproject/a.ts",
  "/user/username/projects/myproject/b.ts",
  "/user/username/projects/myproject/c.ts"
]
Program options: {
  "watch": true,
  "assumeChangesOnlyAffectDirectDependencies": true,
  "declaration": true,
  "incremental": true,
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
}
Program structureReused: Completely
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/c.ts
/user/username/projects/myproject/b.ts
/user/username/projects/myproject/a.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/myproject/c.ts
/user/username/projects/myproject/b.ts

Shape signatures in builder refreshed for::
/user/username/projects/myproject/c.ts (computed .d.ts)
/user/username/projects/myproject/b.ts (computed .d.ts)

exitCode:: ExitStatus.undefined

Change:: Rename property d to d2 of class C

Input::
//// [/user/username/projects/myproject/c.ts]
export class C
{
    d2 = 1;
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



//// [/user/username/projects/myproject/c.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.C = void 0;
var C = /** @class */ (function () {
    function C() {
        this.d2 = 1;
    }
    return C;
}());
exports.C = C;


//// [/user/username/projects/myproject/c.d.ts]
export declare class C {
    d2: number;
}


//// [/user/username/projects/myproject/b.js] file written with same contents
//// [/user/username/projects/myproject/b.d.ts] file written with same contents
//// [/user/username/projects/myproject/tsconfig.tsbuildinfo]
{"fileNames":["../../../../home/src/tslibs/ts/lib/lib.d.ts","./c.ts","./b.ts","./a.ts"],"fileIdsList":[[3],[2]],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-22846341163-export class C\n{\n    d2 = 1;\n}","signature":"-4637923302-export declare class C {\n    d2: number;\n}\n"},{"version":"-6292386773-import {C} from './c';\nexport class B\n{\n    c = new C();\n}","signature":"-165097315-import { C } from './c';\nexport declare class B {\n    c: C;\n}\n"},{"version":"4878398349-import {B} from './b';\ndeclare var console: any;\nlet b = new B();\nconsole.log(b.c.d);","signature":"-3531856636-export {};\n"}],"root":[[2,4]],"options":{"assumeChangesOnlyAffectDirectDependencies":true,"declaration":true},"referencedMap":[[4,1],[3,2]],"version":"FakeTSVersion"}

//// [/user/username/projects/myproject/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../home/src/tslibs/ts/lib/lib.d.ts",
    "./c.ts",
    "./b.ts",
    "./a.ts"
  ],
  "fileIdsList": [
    [
      "./b.ts"
    ],
    [
      "./c.ts"
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
    "./c.ts": {
      "original": {
        "version": "-22846341163-export class C\n{\n    d2 = 1;\n}",
        "signature": "-4637923302-export declare class C {\n    d2: number;\n}\n"
      },
      "version": "-22846341163-export class C\n{\n    d2 = 1;\n}",
      "signature": "-4637923302-export declare class C {\n    d2: number;\n}\n"
    },
    "./b.ts": {
      "original": {
        "version": "-6292386773-import {C} from './c';\nexport class B\n{\n    c = new C();\n}",
        "signature": "-165097315-import { C } from './c';\nexport declare class B {\n    c: C;\n}\n"
      },
      "version": "-6292386773-import {C} from './c';\nexport class B\n{\n    c = new C();\n}",
      "signature": "-165097315-import { C } from './c';\nexport declare class B {\n    c: C;\n}\n"
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
        "./c.ts",
        "./b.ts",
        "./a.ts"
      ]
    ]
  ],
  "options": {
    "assumeChangesOnlyAffectDirectDependencies": true,
    "declaration": true
  },
  "referencedMap": {
    "./a.ts": [
      "./b.ts"
    ],
    "./b.ts": [
      "./c.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 1224
}



Program root files: [
  "/user/username/projects/myproject/a.ts",
  "/user/username/projects/myproject/b.ts",
  "/user/username/projects/myproject/c.ts"
]
Program options: {
  "watch": true,
  "assumeChangesOnlyAffectDirectDependencies": true,
  "declaration": true,
  "incremental": true,
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
}
Program structureReused: Completely
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/c.ts
/user/username/projects/myproject/b.ts
/user/username/projects/myproject/a.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/myproject/c.ts
/user/username/projects/myproject/b.ts

Shape signatures in builder refreshed for::
/user/username/projects/myproject/c.ts (computed .d.ts)
/user/username/projects/myproject/b.ts (computed .d.ts)

exitCode:: ExitStatus.undefined
