currentDirectory:: /user/username/projects/sample1 useCaseSensitiveFileNames:: false
Input::
//// [/user/username/projects/sample1/core/tsconfig.json]
{
  "compilerOptions": {
    "composite": true,
    "declaration": true,
    "declarationMap": true,
    "skipDefaultLibCheck": true
  }
}

//// [/user/username/projects/sample1/core/index.ts]
export const someString: string = "HELLO WORLD";
export function leftPad(s: string, n: number) { return s + n; }
export function multiply(a: number, b: number) { return a * b; }


//// [/user/username/projects/sample1/core/some_decl.d.ts]
declare const dts: any;

//// [/user/username/projects/sample1/core/anotherModule.ts]
export const World = "hello";

//// [/user/username/projects/sample1/logic/tsconfig.json]
{
  "compilerOptions": {
    "composite": true,
    "declaration": true,
    "sourceMap": true,
    "forceConsistentCasingInFileNames": true,
    "skipDefaultLibCheck": true
  },
  "references": [
    {
      "path": "../core"
    }
  ]
}

//// [/user/username/projects/sample1/logic/index.ts]
import * as c from '../core/index';
export function getSecondsInDay() {
    return c.multiply(10, 15);
}
import * as mod from '../core/anotherModule';
export const m = mod;


//// [/user/username/projects/sample1/tests/tsconfig.json]
{
  "references": [
    {
      "path": "../core"
    },
    {
      "path": "../logic"
    }
  ],
  "files": [
    "index.ts"
  ],
  "compilerOptions": {
    "composite": true,
    "declaration": true,
    "forceConsistentCasingInFileNames": true,
    "skipDefaultLibCheck": true
  }
}

//// [/user/username/projects/sample1/tests/index.ts]
import * as c from '../core/index';
import * as logic from '../logic/index';

c.leftPad("", 10);
logic.getSecondsInDay();

import * as mod from '../core/anotherModule';
export const m = mod;


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


/home/src/tslibs/TS/Lib/tsc.js -b -w tests
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] Starting compilation in watch mode...

[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/user/username/projects/sample1/core/anotherModule.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.World = void 0;
exports.World = "hello";


//// [/user/username/projects/sample1/core/anotherModule.d.ts.map]
{"version":3,"file":"anotherModule.d.ts","sourceRoot":"","sources":["anotherModule.ts"],"names":[],"mappings":"AAAA,eAAO,MAAM,KAAK,UAAU,CAAC"}

//// [/user/username/projects/sample1/core/anotherModule.d.ts]
export declare const World = "hello";
//# sourceMappingURL=anotherModule.d.ts.map

//// [/user/username/projects/sample1/core/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.someString = void 0;
exports.leftPad = leftPad;
exports.multiply = multiply;
exports.someString = "HELLO WORLD";
function leftPad(s, n) { return s + n; }
function multiply(a, b) { return a * b; }


//// [/user/username/projects/sample1/core/index.d.ts.map]
{"version":3,"file":"index.d.ts","sourceRoot":"","sources":["index.ts"],"names":[],"mappings":"AAAA,eAAO,MAAM,UAAU,EAAE,MAAsB,CAAC;AAChD,wBAAgB,OAAO,CAAC,CAAC,EAAE,MAAM,EAAE,CAAC,EAAE,MAAM,UAAmB;AAC/D,wBAAgB,QAAQ,CAAC,CAAC,EAAE,MAAM,EAAE,CAAC,EAAE,MAAM,UAAmB"}

//// [/user/username/projects/sample1/core/index.d.ts]
export declare const someString: string;
export declare function leftPad(s: string, n: number): string;
export declare function multiply(a: number, b: number): number;
//# sourceMappingURL=index.d.ts.map

//// [/user/username/projects/sample1/core/tsconfig.tsbuildinfo]
{"fileNames":["../../../../../home/src/tslibs/ts/lib/lib.d.ts","./anothermodule.ts","./index.ts","./some_decl.d.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-3090574810-export const World = \"hello\";","signature":"-9234818176-export declare const World = \"hello\";\n"},{"version":"-15745098553-export const someString: string = \"HELLO WORLD\";\nexport function leftPad(s: string, n: number) { return s + n; }\nexport function multiply(a: number, b: number) { return a * b; }\n","signature":"-7362568283-export declare const someString: string;\nexport declare function leftPad(s: string, n: number): string;\nexport declare function multiply(a: number, b: number): number;\n"},{"version":"-7959511260-declare const dts: any;","affectsGlobalScope":true}],"root":[[2,4]],"options":{"composite":true,"declaration":true,"declarationMap":true,"skipDefaultLibCheck":true},"latestChangedDtsFile":"./index.d.ts","version":"FakeTSVersion"}

//// [/user/username/projects/sample1/core/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../../home/src/tslibs/ts/lib/lib.d.ts",
    "./anothermodule.ts",
    "./index.ts",
    "./some_decl.d.ts"
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
    "./anothermodule.ts": {
      "original": {
        "version": "-3090574810-export const World = \"hello\";",
        "signature": "-9234818176-export declare const World = \"hello\";\n"
      },
      "version": "-3090574810-export const World = \"hello\";",
      "signature": "-9234818176-export declare const World = \"hello\";\n"
    },
    "./index.ts": {
      "original": {
        "version": "-15745098553-export const someString: string = \"HELLO WORLD\";\nexport function leftPad(s: string, n: number) { return s + n; }\nexport function multiply(a: number, b: number) { return a * b; }\n",
        "signature": "-7362568283-export declare const someString: string;\nexport declare function leftPad(s: string, n: number): string;\nexport declare function multiply(a: number, b: number): number;\n"
      },
      "version": "-15745098553-export const someString: string = \"HELLO WORLD\";\nexport function leftPad(s: string, n: number) { return s + n; }\nexport function multiply(a: number, b: number) { return a * b; }\n",
      "signature": "-7362568283-export declare const someString: string;\nexport declare function leftPad(s: string, n: number): string;\nexport declare function multiply(a: number, b: number): number;\n"
    },
    "./some_decl.d.ts": {
      "original": {
        "version": "-7959511260-declare const dts: any;",
        "affectsGlobalScope": true
      },
      "version": "-7959511260-declare const dts: any;",
      "signature": "-7959511260-declare const dts: any;",
      "affectsGlobalScope": true
    }
  },
  "root": [
    [
      [
        2,
        4
      ],
      [
        "./anothermodule.ts",
        "./index.ts",
        "./some_decl.d.ts"
      ]
    ]
  ],
  "options": {
    "composite": true,
    "declaration": true,
    "declarationMap": true,
    "skipDefaultLibCheck": true
  },
  "latestChangedDtsFile": "./index.d.ts",
  "version": "FakeTSVersion",
  "size": 1397
}

//// [/user/username/projects/sample1/logic/index.js.map]
{"version":3,"file":"index.js","sourceRoot":"","sources":["index.ts"],"names":[],"mappings":";;;AACA,0CAEC;AAHD,iCAAmC;AACnC,SAAgB,eAAe;IAC3B,OAAO,CAAC,CAAC,QAAQ,CAAC,EAAE,EAAE,EAAE,CAAC,CAAC;AAC9B,CAAC;AACD,2CAA6C;AAChC,QAAA,CAAC,GAAG,GAAG,CAAC"}

//// [/user/username/projects/sample1/logic/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.m = void 0;
exports.getSecondsInDay = getSecondsInDay;
var c = require("../core/index");
function getSecondsInDay() {
    return c.multiply(10, 15);
}
var mod = require("../core/anotherModule");
exports.m = mod;
//# sourceMappingURL=index.js.map

//// [/user/username/projects/sample1/logic/index.d.ts]
export declare function getSecondsInDay(): number;
import * as mod from '../core/anotherModule';
export declare const m: typeof mod;


//// [/user/username/projects/sample1/logic/tsconfig.tsbuildinfo]
{"fileNames":["../../../../../home/src/tslibs/ts/lib/lib.d.ts","../core/index.d.ts","../core/anothermodule.d.ts","./index.ts"],"fileIdsList":[[2,3]],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},"-7362568283-export declare const someString: string;\nexport declare function leftPad(s: string, n: number): string;\nexport declare function multiply(a: number, b: number): number;\n","-9234818176-export declare const World = \"hello\";\n",{"version":"-9623801128-import * as c from '../core/index';\nexport function getSecondsInDay() {\n    return c.multiply(10, 15);\n}\nimport * as mod from '../core/anotherModule';\nexport const m = mod;\n","signature":"-9659407152-export declare function getSecondsInDay(): number;\nimport * as mod from '../core/anotherModule';\nexport declare const m: typeof mod;\n"}],"root":[4],"options":{"composite":true,"declaration":true,"skipDefaultLibCheck":true,"sourceMap":true},"referencedMap":[[4,1]],"latestChangedDtsFile":"./index.d.ts","version":"FakeTSVersion"}

//// [/user/username/projects/sample1/logic/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../../home/src/tslibs/ts/lib/lib.d.ts",
    "../core/index.d.ts",
    "../core/anothermodule.d.ts",
    "./index.ts"
  ],
  "fileIdsList": [
    [
      "../core/index.d.ts",
      "../core/anothermodule.d.ts"
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
    "../core/index.d.ts": {
      "version": "-7362568283-export declare const someString: string;\nexport declare function leftPad(s: string, n: number): string;\nexport declare function multiply(a: number, b: number): number;\n",
      "signature": "-7362568283-export declare const someString: string;\nexport declare function leftPad(s: string, n: number): string;\nexport declare function multiply(a: number, b: number): number;\n"
    },
    "../core/anothermodule.d.ts": {
      "version": "-9234818176-export declare const World = \"hello\";\n",
      "signature": "-9234818176-export declare const World = \"hello\";\n"
    },
    "./index.ts": {
      "original": {
        "version": "-9623801128-import * as c from '../core/index';\nexport function getSecondsInDay() {\n    return c.multiply(10, 15);\n}\nimport * as mod from '../core/anotherModule';\nexport const m = mod;\n",
        "signature": "-9659407152-export declare function getSecondsInDay(): number;\nimport * as mod from '../core/anotherModule';\nexport declare const m: typeof mod;\n"
      },
      "version": "-9623801128-import * as c from '../core/index';\nexport function getSecondsInDay() {\n    return c.multiply(10, 15);\n}\nimport * as mod from '../core/anotherModule';\nexport const m = mod;\n",
      "signature": "-9659407152-export declare function getSecondsInDay(): number;\nimport * as mod from '../core/anotherModule';\nexport declare const m: typeof mod;\n"
    }
  },
  "root": [
    [
      4,
      "./index.ts"
    ]
  ],
  "options": {
    "composite": true,
    "declaration": true,
    "skipDefaultLibCheck": true,
    "sourceMap": true
  },
  "referencedMap": {
    "./index.ts": [
      "../core/index.d.ts",
      "../core/anothermodule.d.ts"
    ]
  },
  "latestChangedDtsFile": "./index.d.ts",
  "version": "FakeTSVersion",
  "size": 1444
}

//// [/user/username/projects/sample1/tests/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.m = void 0;
var c = require("../core/index");
var logic = require("../logic/index");
c.leftPad("", 10);
logic.getSecondsInDay();
var mod = require("../core/anotherModule");
exports.m = mod;


//// [/user/username/projects/sample1/tests/index.d.ts]
import * as mod from '../core/anotherModule';
export declare const m: typeof mod;


//// [/user/username/projects/sample1/tests/tsconfig.tsbuildinfo]
{"fileNames":["../../../../../home/src/tslibs/ts/lib/lib.d.ts","../core/index.d.ts","../core/anothermodule.d.ts","../logic/index.d.ts","./index.ts"],"fileIdsList":[[3],[2,3,4]],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},"-7362568283-export declare const someString: string;\nexport declare function leftPad(s: string, n: number): string;\nexport declare function multiply(a: number, b: number): number;\n","-9234818176-export declare const World = \"hello\";\n","-9659407152-export declare function getSecondsInDay(): number;\nimport * as mod from '../core/anotherModule';\nexport declare const m: typeof mod;\n",{"version":"-11950676699-import * as c from '../core/index';\nimport * as logic from '../logic/index';\n\nc.leftPad(\"\", 10);\nlogic.getSecondsInDay();\n\nimport * as mod from '../core/anotherModule';\nexport const m = mod;\n","signature":"2702201019-import * as mod from '../core/anotherModule';\nexport declare const m: typeof mod;\n"}],"root":[5],"options":{"composite":true,"declaration":true,"skipDefaultLibCheck":true},"referencedMap":[[4,1],[5,2]],"latestChangedDtsFile":"./index.d.ts","version":"FakeTSVersion"}

//// [/user/username/projects/sample1/tests/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../../home/src/tslibs/ts/lib/lib.d.ts",
    "../core/index.d.ts",
    "../core/anothermodule.d.ts",
    "../logic/index.d.ts",
    "./index.ts"
  ],
  "fileIdsList": [
    [
      "../core/anothermodule.d.ts"
    ],
    [
      "../core/index.d.ts",
      "../core/anothermodule.d.ts",
      "../logic/index.d.ts"
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
    "../core/index.d.ts": {
      "version": "-7362568283-export declare const someString: string;\nexport declare function leftPad(s: string, n: number): string;\nexport declare function multiply(a: number, b: number): number;\n",
      "signature": "-7362568283-export declare const someString: string;\nexport declare function leftPad(s: string, n: number): string;\nexport declare function multiply(a: number, b: number): number;\n"
    },
    "../core/anothermodule.d.ts": {
      "version": "-9234818176-export declare const World = \"hello\";\n",
      "signature": "-9234818176-export declare const World = \"hello\";\n"
    },
    "../logic/index.d.ts": {
      "version": "-9659407152-export declare function getSecondsInDay(): number;\nimport * as mod from '../core/anotherModule';\nexport declare const m: typeof mod;\n",
      "signature": "-9659407152-export declare function getSecondsInDay(): number;\nimport * as mod from '../core/anotherModule';\nexport declare const m: typeof mod;\n"
    },
    "./index.ts": {
      "original": {
        "version": "-11950676699-import * as c from '../core/index';\nimport * as logic from '../logic/index';\n\nc.leftPad(\"\", 10);\nlogic.getSecondsInDay();\n\nimport * as mod from '../core/anotherModule';\nexport const m = mod;\n",
        "signature": "2702201019-import * as mod from '../core/anotherModule';\nexport declare const m: typeof mod;\n"
      },
      "version": "-11950676699-import * as c from '../core/index';\nimport * as logic from '../logic/index';\n\nc.leftPad(\"\", 10);\nlogic.getSecondsInDay();\n\nimport * as mod from '../core/anotherModule';\nexport const m = mod;\n",
      "signature": "2702201019-import * as mod from '../core/anotherModule';\nexport declare const m: typeof mod;\n"
    }
  },
  "root": [
    [
      5,
      "./index.ts"
    ]
  ],
  "options": {
    "composite": true,
    "declaration": true,
    "skipDefaultLibCheck": true
  },
  "referencedMap": {
    "../logic/index.d.ts": [
      "../core/anothermodule.d.ts"
    ],
    "./index.ts": [
      "../core/index.d.ts",
      "../core/anothermodule.d.ts",
      "../logic/index.d.ts"
    ]
  },
  "latestChangedDtsFile": "./index.d.ts",
  "version": "FakeTSVersion",
  "size": 1582
}


FsWatches::
/user/username/projects/sample1/core/anotherModule.ts: *new*
  {}
/user/username/projects/sample1/core/index.ts: *new*
  {}
/user/username/projects/sample1/core/some_decl.d.ts: *new*
  {}
/user/username/projects/sample1/core/tsconfig.json: *new*
  {}
/user/username/projects/sample1/logic/index.ts: *new*
  {}
/user/username/projects/sample1/logic/tsconfig.json: *new*
  {}
/user/username/projects/sample1/tests/index.ts: *new*
  {}
/user/username/projects/sample1/tests/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/user/username/projects/sample1/core: *new*
  {}
/user/username/projects/sample1/logic: *new*
  {}

Program root files: [
  "/user/username/projects/sample1/core/anotherModule.ts",
  "/user/username/projects/sample1/core/index.ts",
  "/user/username/projects/sample1/core/some_decl.d.ts"
]
Program options: {
  "composite": true,
  "declaration": true,
  "declarationMap": true,
  "skipDefaultLibCheck": true,
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/sample1/core/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/sample1/core/anotherModule.ts
/user/username/projects/sample1/core/index.ts
/user/username/projects/sample1/core/some_decl.d.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/sample1/core/anotherModule.ts
/user/username/projects/sample1/core/index.ts
/user/username/projects/sample1/core/some_decl.d.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/user/username/projects/sample1/core/anothermodule.ts (computed .d.ts during emit)
/user/username/projects/sample1/core/index.ts (computed .d.ts during emit)
/user/username/projects/sample1/core/some_decl.d.ts (used version)

Program root files: [
  "/user/username/projects/sample1/logic/index.ts"
]
Program options: {
  "composite": true,
  "declaration": true,
  "sourceMap": true,
  "forceConsistentCasingInFileNames": true,
  "skipDefaultLibCheck": true,
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/sample1/logic/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/sample1/core/index.d.ts
/user/username/projects/sample1/core/anotherModule.d.ts
/user/username/projects/sample1/logic/index.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/sample1/core/index.d.ts
/user/username/projects/sample1/core/anotherModule.d.ts
/user/username/projects/sample1/logic/index.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/user/username/projects/sample1/core/index.d.ts (used version)
/user/username/projects/sample1/core/anothermodule.d.ts (used version)
/user/username/projects/sample1/logic/index.ts (computed .d.ts during emit)

Program root files: [
  "/user/username/projects/sample1/tests/index.ts"
]
Program options: {
  "composite": true,
  "declaration": true,
  "forceConsistentCasingInFileNames": true,
  "skipDefaultLibCheck": true,
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/sample1/tests/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/sample1/core/index.d.ts
/user/username/projects/sample1/core/anotherModule.d.ts
/user/username/projects/sample1/logic/index.d.ts
/user/username/projects/sample1/tests/index.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/sample1/core/index.d.ts
/user/username/projects/sample1/core/anotherModule.d.ts
/user/username/projects/sample1/logic/index.d.ts
/user/username/projects/sample1/tests/index.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/user/username/projects/sample1/core/index.d.ts (used version)
/user/username/projects/sample1/core/anothermodule.d.ts (used version)
/user/username/projects/sample1/logic/index.d.ts (used version)
/user/username/projects/sample1/tests/index.ts (computed .d.ts during emit)

exitCode:: ExitStatus.undefined

Change:: Change to new File and build core

Input::
//// [/user/username/projects/sample1/core/newfile.ts]
export const newFileConst = 30;


Timeout callback:: count: 1
1: timerToBuildInvalidatedProject *new*

Before running Timeout callback:: count: 1
1: timerToBuildInvalidatedProject

Host is moving to new time
After running Timeout callback:: count: 1
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...



//// [/user/username/projects/sample1/core/tsconfig.tsbuildinfo]
{"fileNames":["../../../../../home/src/tslibs/ts/lib/lib.d.ts","./anothermodule.ts","./index.ts","./newfile.ts","./some_decl.d.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-3090574810-export const World = \"hello\";","signature":"-9234818176-export declare const World = \"hello\";\n"},{"version":"-15745098553-export const someString: string = \"HELLO WORLD\";\nexport function leftPad(s: string, n: number) { return s + n; }\nexport function multiply(a: number, b: number) { return a * b; }\n","signature":"-7362568283-export declare const someString: string;\nexport declare function leftPad(s: string, n: number): string;\nexport declare function multiply(a: number, b: number): number;\n"},{"version":"-16320201030-export const newFileConst = 30;","signature":"-22941483372-export declare const newFileConst = 30;\n"},{"version":"-7959511260-declare const dts: any;","affectsGlobalScope":true}],"root":[[2,5]],"options":{"composite":true,"declaration":true,"declarationMap":true,"skipDefaultLibCheck":true},"latestChangedDtsFile":"./newfile.d.ts","version":"FakeTSVersion"}

//// [/user/username/projects/sample1/core/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../../home/src/tslibs/ts/lib/lib.d.ts",
    "./anothermodule.ts",
    "./index.ts",
    "./newfile.ts",
    "./some_decl.d.ts"
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
    "./anothermodule.ts": {
      "original": {
        "version": "-3090574810-export const World = \"hello\";",
        "signature": "-9234818176-export declare const World = \"hello\";\n"
      },
      "version": "-3090574810-export const World = \"hello\";",
      "signature": "-9234818176-export declare const World = \"hello\";\n"
    },
    "./index.ts": {
      "original": {
        "version": "-15745098553-export const someString: string = \"HELLO WORLD\";\nexport function leftPad(s: string, n: number) { return s + n; }\nexport function multiply(a: number, b: number) { return a * b; }\n",
        "signature": "-7362568283-export declare const someString: string;\nexport declare function leftPad(s: string, n: number): string;\nexport declare function multiply(a: number, b: number): number;\n"
      },
      "version": "-15745098553-export const someString: string = \"HELLO WORLD\";\nexport function leftPad(s: string, n: number) { return s + n; }\nexport function multiply(a: number, b: number) { return a * b; }\n",
      "signature": "-7362568283-export declare const someString: string;\nexport declare function leftPad(s: string, n: number): string;\nexport declare function multiply(a: number, b: number): number;\n"
    },
    "./newfile.ts": {
      "original": {
        "version": "-16320201030-export const newFileConst = 30;",
        "signature": "-22941483372-export declare const newFileConst = 30;\n"
      },
      "version": "-16320201030-export const newFileConst = 30;",
      "signature": "-22941483372-export declare const newFileConst = 30;\n"
    },
    "./some_decl.d.ts": {
      "original": {
        "version": "-7959511260-declare const dts: any;",
        "affectsGlobalScope": true
      },
      "version": "-7959511260-declare const dts: any;",
      "signature": "-7959511260-declare const dts: any;",
      "affectsGlobalScope": true
    }
  },
  "root": [
    [
      [
        2,
        5
      ],
      [
        "./anothermodule.ts",
        "./index.ts",
        "./newfile.ts",
        "./some_decl.d.ts"
      ]
    ]
  ],
  "options": {
    "composite": true,
    "declaration": true,
    "declarationMap": true,
    "skipDefaultLibCheck": true
  },
  "latestChangedDtsFile": "./newfile.d.ts",
  "version": "FakeTSVersion",
  "size": 1542
}

//// [/user/username/projects/sample1/core/newfile.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newFileConst = void 0;
exports.newFileConst = 30;


//// [/user/username/projects/sample1/core/newfile.d.ts.map]
{"version":3,"file":"newfile.d.ts","sourceRoot":"","sources":["newfile.ts"],"names":[],"mappings":"AAAA,eAAO,MAAM,YAAY,KAAK,CAAC"}

//// [/user/username/projects/sample1/core/newfile.d.ts]
export declare const newFileConst = 30;
//# sourceMappingURL=newfile.d.ts.map


FsWatches::
/user/username/projects/sample1/core/anotherModule.ts:
  {}
/user/username/projects/sample1/core/index.ts:
  {}
/user/username/projects/sample1/core/newfile.ts: *new*
  {}
/user/username/projects/sample1/core/some_decl.d.ts:
  {}
/user/username/projects/sample1/core/tsconfig.json:
  {}
/user/username/projects/sample1/logic/index.ts:
  {}
/user/username/projects/sample1/logic/tsconfig.json:
  {}
/user/username/projects/sample1/tests/index.ts:
  {}
/user/username/projects/sample1/tests/tsconfig.json:
  {}

FsWatchesRecursive::
/user/username/projects/sample1/core:
  {}
/user/username/projects/sample1/logic:
  {}

Timeout callback:: count: 1
2: timerToBuildInvalidatedProject *new*


Program root files: [
  "/user/username/projects/sample1/core/anotherModule.ts",
  "/user/username/projects/sample1/core/index.ts",
  "/user/username/projects/sample1/core/newfile.ts",
  "/user/username/projects/sample1/core/some_decl.d.ts"
]
Program options: {
  "composite": true,
  "declaration": true,
  "declarationMap": true,
  "skipDefaultLibCheck": true,
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/sample1/core/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/sample1/core/anotherModule.ts
/user/username/projects/sample1/core/index.ts
/user/username/projects/sample1/core/newfile.ts
/user/username/projects/sample1/core/some_decl.d.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/sample1/core/newfile.ts

Shape signatures in builder refreshed for::
/user/username/projects/sample1/core/newfile.ts (computed .d.ts)

exitCode:: ExitStatus.undefined

Change:: Build logic and tests

Input::

Before running Timeout callback:: count: 1
2: timerToBuildInvalidatedProject

Host is moving to new time
After running Timeout callback:: count: 0
Output::
[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/user/username/projects/sample1/logic/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/sample1/tests/tsconfig.tsbuildinfo] file changed its modified time


Program root files: [
  "/user/username/projects/sample1/logic/index.ts"
]
Program options: {
  "composite": true,
  "declaration": true,
  "sourceMap": true,
  "forceConsistentCasingInFileNames": true,
  "skipDefaultLibCheck": true,
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/sample1/logic/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/sample1/core/index.d.ts
/user/username/projects/sample1/core/anotherModule.d.ts
/user/username/projects/sample1/logic/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

Program root files: [
  "/user/username/projects/sample1/tests/index.ts"
]
Program options: {
  "composite": true,
  "declaration": true,
  "forceConsistentCasingInFileNames": true,
  "skipDefaultLibCheck": true,
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/sample1/tests/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/sample1/core/index.d.ts
/user/username/projects/sample1/core/anotherModule.d.ts
/user/username/projects/sample1/logic/index.d.ts
/user/username/projects/sample1/tests/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

exitCode:: ExitStatus.undefined

Change:: Change to new File and build core

Input::
//// [/user/username/projects/sample1/core/newfile.ts]
export const newFileConst = 30;
export class someClass2 { }


Timeout callback:: count: 1
3: timerToBuildInvalidatedProject *new*

Before running Timeout callback:: count: 1
3: timerToBuildInvalidatedProject

Host is moving to new time
After running Timeout callback:: count: 1
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...



//// [/user/username/projects/sample1/core/tsconfig.tsbuildinfo]
{"fileNames":["../../../../../home/src/tslibs/ts/lib/lib.d.ts","./anothermodule.ts","./index.ts","./newfile.ts","./some_decl.d.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-3090574810-export const World = \"hello\";","signature":"-9234818176-export declare const World = \"hello\";\n"},{"version":"-15745098553-export const someString: string = \"HELLO WORLD\";\nexport function leftPad(s: string, n: number) { return s + n; }\nexport function multiply(a: number, b: number) { return a * b; }\n","signature":"-7362568283-export declare const someString: string;\nexport declare function leftPad(s: string, n: number): string;\nexport declare function multiply(a: number, b: number): number;\n"},{"version":"-9703836816-export const newFileConst = 30;\nexport class someClass2 { }","signature":"-12384508924-export declare const newFileConst = 30;\nexport declare class someClass2 {\n}\n"},{"version":"-7959511260-declare const dts: any;","affectsGlobalScope":true}],"root":[[2,5]],"options":{"composite":true,"declaration":true,"declarationMap":true,"skipDefaultLibCheck":true},"latestChangedDtsFile":"./newfile.d.ts","version":"FakeTSVersion"}

//// [/user/username/projects/sample1/core/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../../home/src/tslibs/ts/lib/lib.d.ts",
    "./anothermodule.ts",
    "./index.ts",
    "./newfile.ts",
    "./some_decl.d.ts"
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
    "./anothermodule.ts": {
      "original": {
        "version": "-3090574810-export const World = \"hello\";",
        "signature": "-9234818176-export declare const World = \"hello\";\n"
      },
      "version": "-3090574810-export const World = \"hello\";",
      "signature": "-9234818176-export declare const World = \"hello\";\n"
    },
    "./index.ts": {
      "original": {
        "version": "-15745098553-export const someString: string = \"HELLO WORLD\";\nexport function leftPad(s: string, n: number) { return s + n; }\nexport function multiply(a: number, b: number) { return a * b; }\n",
        "signature": "-7362568283-export declare const someString: string;\nexport declare function leftPad(s: string, n: number): string;\nexport declare function multiply(a: number, b: number): number;\n"
      },
      "version": "-15745098553-export const someString: string = \"HELLO WORLD\";\nexport function leftPad(s: string, n: number) { return s + n; }\nexport function multiply(a: number, b: number) { return a * b; }\n",
      "signature": "-7362568283-export declare const someString: string;\nexport declare function leftPad(s: string, n: number): string;\nexport declare function multiply(a: number, b: number): number;\n"
    },
    "./newfile.ts": {
      "original": {
        "version": "-9703836816-export const newFileConst = 30;\nexport class someClass2 { }",
        "signature": "-12384508924-export declare const newFileConst = 30;\nexport declare class someClass2 {\n}\n"
      },
      "version": "-9703836816-export const newFileConst = 30;\nexport class someClass2 { }",
      "signature": "-12384508924-export declare const newFileConst = 30;\nexport declare class someClass2 {\n}\n"
    },
    "./some_decl.d.ts": {
      "original": {
        "version": "-7959511260-declare const dts: any;",
        "affectsGlobalScope": true
      },
      "version": "-7959511260-declare const dts: any;",
      "signature": "-7959511260-declare const dts: any;",
      "affectsGlobalScope": true
    }
  },
  "root": [
    [
      [
        2,
        5
      ],
      [
        "./anothermodule.ts",
        "./index.ts",
        "./newfile.ts",
        "./some_decl.d.ts"
      ]
    ]
  ],
  "options": {
    "composite": true,
    "declaration": true,
    "declarationMap": true,
    "skipDefaultLibCheck": true
  },
  "latestChangedDtsFile": "./newfile.d.ts",
  "version": "FakeTSVersion",
  "size": 1608
}

//// [/user/username/projects/sample1/core/newfile.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.someClass2 = exports.newFileConst = void 0;
exports.newFileConst = 30;
var someClass2 = /** @class */ (function () {
    function someClass2() {
    }
    return someClass2;
}());
exports.someClass2 = someClass2;


//// [/user/username/projects/sample1/core/newfile.d.ts.map]
{"version":3,"file":"newfile.d.ts","sourceRoot":"","sources":["newfile.ts"],"names":[],"mappings":"AAAA,eAAO,MAAM,YAAY,KAAK,CAAC;AAC/B,qBAAa,UAAU;CAAI"}

//// [/user/username/projects/sample1/core/newfile.d.ts]
export declare const newFileConst = 30;
export declare class someClass2 {
}
//# sourceMappingURL=newfile.d.ts.map


Timeout callback:: count: 1
4: timerToBuildInvalidatedProject *new*


Program root files: [
  "/user/username/projects/sample1/core/anotherModule.ts",
  "/user/username/projects/sample1/core/index.ts",
  "/user/username/projects/sample1/core/newfile.ts",
  "/user/username/projects/sample1/core/some_decl.d.ts"
]
Program options: {
  "composite": true,
  "declaration": true,
  "declarationMap": true,
  "skipDefaultLibCheck": true,
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/sample1/core/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/sample1/core/anotherModule.ts
/user/username/projects/sample1/core/index.ts
/user/username/projects/sample1/core/newfile.ts
/user/username/projects/sample1/core/some_decl.d.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/sample1/core/newfile.ts

Shape signatures in builder refreshed for::
/user/username/projects/sample1/core/newfile.ts (computed .d.ts)

exitCode:: ExitStatus.undefined

Change:: Build logic and tests

Input::

Before running Timeout callback:: count: 1
4: timerToBuildInvalidatedProject

Host is moving to new time
After running Timeout callback:: count: 0
Output::
[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/user/username/projects/sample1/logic/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/sample1/tests/tsconfig.tsbuildinfo] file changed its modified time


Program root files: [
  "/user/username/projects/sample1/logic/index.ts"
]
Program options: {
  "composite": true,
  "declaration": true,
  "sourceMap": true,
  "forceConsistentCasingInFileNames": true,
  "skipDefaultLibCheck": true,
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/sample1/logic/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/sample1/core/index.d.ts
/user/username/projects/sample1/core/anotherModule.d.ts
/user/username/projects/sample1/logic/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

Program root files: [
  "/user/username/projects/sample1/tests/index.ts"
]
Program options: {
  "composite": true,
  "declaration": true,
  "forceConsistentCasingInFileNames": true,
  "skipDefaultLibCheck": true,
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/sample1/tests/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/sample1/core/index.d.ts
/user/username/projects/sample1/core/anotherModule.d.ts
/user/username/projects/sample1/logic/index.d.ts
/user/username/projects/sample1/tests/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

exitCode:: ExitStatus.undefined
