currentDirectory:: /home/src/workspaces/project useCaseSensitiveFileNames:: false
Input::
//// [/home/src/workspaces/project/a.ts]
export const a: number = "hello";

//// [/home/src/workspaces/project/b.ts]
export const b = 10;

//// [/home/src/workspaces/project/tsconfig.json]
{
  "compilerOptions": {
    "declaration": true,
    "incremental": true
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


/home/src/tslibs/TS/Lib/tsc.js --noCheck
Output::


//// [/home/src/workspaces/project/a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.a = void 0;
exports.a = "hello";


//// [/home/src/workspaces/project/a.d.ts]
export declare const a: number;


//// [/home/src/workspaces/project/b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.b = void 0;
exports.b = 10;


//// [/home/src/workspaces/project/b.d.ts]
export declare const b = 10;


//// [/home/src/workspaces/project/tsconfig.tsbuildinfo]
{"fileNames":["../../tslibs/ts/lib/lib.d.ts","./a.ts","./b.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-11705693502-export const a: number = \"hello\";","signature":"-3045186137-export declare const a: number;\n"},{"version":"-13368947479-export const b = 10;","signature":"-3829150557-export declare const b = 10;\n"}],"root":[2,3],"options":{"declaration":true},"semanticDiagnosticsPerFile":[1,2,3],"checkPending":true,"version":"FakeTSVersion"}

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../tslibs/ts/lib/lib.d.ts",
    "./a.ts",
    "./b.ts"
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
    "./a.ts": {
      "original": {
        "version": "-11705693502-export const a: number = \"hello\";",
        "signature": "-3045186137-export declare const a: number;\n"
      },
      "version": "-11705693502-export const a: number = \"hello\";",
      "signature": "-3045186137-export declare const a: number;\n"
    },
    "./b.ts": {
      "original": {
        "version": "-13368947479-export const b = 10;",
        "signature": "-3829150557-export declare const b = 10;\n"
      },
      "version": "-13368947479-export const b = 10;",
      "signature": "-3829150557-export declare const b = 10;\n"
    }
  },
  "root": [
    [
      2,
      "./a.ts"
    ],
    [
      3,
      "./b.ts"
    ]
  ],
  "options": {
    "declaration": true
  },
  "semanticDiagnosticsPerFile": [
    [
      "../../tslibs/ts/lib/lib.d.ts",
      "not cached or not changed"
    ],
    [
      "./a.ts",
      "not cached or not changed"
    ],
    [
      "./b.ts",
      "not cached or not changed"
    ]
  ],
  "checkPending": true,
  "version": "FakeTSVersion",
  "size": 912
}


Program root files: [
  "/home/src/workspaces/project/a.ts",
  "/home/src/workspaces/project/b.ts"
]
Program options: {
  "declaration": true,
  "incremental": true,
  "noCheck": true,
  "configFilePath": "/home/src/workspaces/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/project/a.ts
/home/src/workspaces/project/b.ts

No cached semantic diagnostics in the builder::

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/home/src/workspaces/project/a.ts (computed .d.ts during emit)
/home/src/workspaces/project/b.ts (computed .d.ts during emit)

exitCode:: ExitStatus.Success

Change:: no-change-run

Input::

/home/src/tslibs/TS/Lib/tsc.js --noCheck
Output::



Program root files: [
  "/home/src/workspaces/project/a.ts",
  "/home/src/workspaces/project/b.ts"
]
Program options: {
  "declaration": true,
  "incremental": true,
  "noCheck": true,
  "configFilePath": "/home/src/workspaces/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/project/a.ts
/home/src/workspaces/project/b.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::

exitCode:: ExitStatus.Success

Change:: Fix `a` error with noCheck

Input::
//// [/home/src/workspaces/project/a.ts]
export const a = "hello";


/home/src/tslibs/TS/Lib/tsc.js --noCheck
Output::


//// [/home/src/workspaces/project/a.js] file written with same contents
//// [/home/src/workspaces/project/a.d.ts]
export declare const a = "hello";


//// [/home/src/workspaces/project/tsconfig.tsbuildinfo]
{"fileNames":["../../tslibs/ts/lib/lib.d.ts","./a.ts","./b.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-16641552193-export const a = \"hello\";","signature":"-2692717255-export declare const a = \"hello\";\n"},{"version":"-13368947479-export const b = 10;","signature":"-3829150557-export declare const b = 10;\n"}],"root":[2,3],"options":{"declaration":true},"semanticDiagnosticsPerFile":[1,2,3],"checkPending":true,"version":"FakeTSVersion"}

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../tslibs/ts/lib/lib.d.ts",
    "./a.ts",
    "./b.ts"
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
    "./a.ts": {
      "original": {
        "version": "-16641552193-export const a = \"hello\";",
        "signature": "-2692717255-export declare const a = \"hello\";\n"
      },
      "version": "-16641552193-export const a = \"hello\";",
      "signature": "-2692717255-export declare const a = \"hello\";\n"
    },
    "./b.ts": {
      "original": {
        "version": "-13368947479-export const b = 10;",
        "signature": "-3829150557-export declare const b = 10;\n"
      },
      "version": "-13368947479-export const b = 10;",
      "signature": "-3829150557-export declare const b = 10;\n"
    }
  },
  "root": [
    [
      2,
      "./a.ts"
    ],
    [
      3,
      "./b.ts"
    ]
  ],
  "options": {
    "declaration": true
  },
  "semanticDiagnosticsPerFile": [
    [
      "../../tslibs/ts/lib/lib.d.ts",
      "not cached or not changed"
    ],
    [
      "./a.ts",
      "not cached or not changed"
    ],
    [
      "./b.ts",
      "not cached or not changed"
    ]
  ],
  "checkPending": true,
  "version": "FakeTSVersion",
  "size": 908
}


Program root files: [
  "/home/src/workspaces/project/a.ts",
  "/home/src/workspaces/project/b.ts"
]
Program options: {
  "declaration": true,
  "incremental": true,
  "noCheck": true,
  "configFilePath": "/home/src/workspaces/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/project/a.ts
/home/src/workspaces/project/b.ts

No cached semantic diagnostics in the builder::

Shape signatures in builder refreshed for::
/home/src/workspaces/project/a.ts (computed .d.ts)

exitCode:: ExitStatus.Success

Change:: no-change-run

Input::

/home/src/tslibs/TS/Lib/tsc.js --noCheck
Output::



Program root files: [
  "/home/src/workspaces/project/a.ts",
  "/home/src/workspaces/project/b.ts"
]
Program options: {
  "declaration": true,
  "incremental": true,
  "noCheck": true,
  "configFilePath": "/home/src/workspaces/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/project/a.ts
/home/src/workspaces/project/b.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::

exitCode:: ExitStatus.Success

Change:: No Change run with checking

Input::

/home/src/tslibs/TS/Lib/tsc.js 
Output::


//// [/home/src/workspaces/project/tsconfig.tsbuildinfo]
{"fileNames":["../../tslibs/ts/lib/lib.d.ts","./a.ts","./b.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-16641552193-export const a = \"hello\";","signature":"-2692717255-export declare const a = \"hello\";\n"},{"version":"-13368947479-export const b = 10;","signature":"-3829150557-export declare const b = 10;\n"}],"root":[2,3],"options":{"declaration":true},"version":"FakeTSVersion"}

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../tslibs/ts/lib/lib.d.ts",
    "./a.ts",
    "./b.ts"
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
    "./a.ts": {
      "original": {
        "version": "-16641552193-export const a = \"hello\";",
        "signature": "-2692717255-export declare const a = \"hello\";\n"
      },
      "version": "-16641552193-export const a = \"hello\";",
      "signature": "-2692717255-export declare const a = \"hello\";\n"
    },
    "./b.ts": {
      "original": {
        "version": "-13368947479-export const b = 10;",
        "signature": "-3829150557-export declare const b = 10;\n"
      },
      "version": "-13368947479-export const b = 10;",
      "signature": "-3829150557-export declare const b = 10;\n"
    }
  },
  "root": [
    [
      2,
      "./a.ts"
    ],
    [
      3,
      "./b.ts"
    ]
  ],
  "options": {
    "declaration": true
  },
  "version": "FakeTSVersion",
  "size": 851
}


Program root files: [
  "/home/src/workspaces/project/a.ts",
  "/home/src/workspaces/project/b.ts"
]
Program options: {
  "declaration": true,
  "incremental": true,
  "configFilePath": "/home/src/workspaces/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/project/a.ts
/home/src/workspaces/project/b.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/project/a.ts
/home/src/workspaces/project/b.ts

No shapes updated in the builder::

exitCode:: ExitStatus.Success

Change:: No Change run with checking

Input::

/home/src/tslibs/TS/Lib/tsc.js 
Output::



Program root files: [
  "/home/src/workspaces/project/a.ts",
  "/home/src/workspaces/project/b.ts"
]
Program options: {
  "declaration": true,
  "incremental": true,
  "configFilePath": "/home/src/workspaces/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/project/a.ts
/home/src/workspaces/project/b.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

exitCode:: ExitStatus.Success

Change:: no-change-run

Input::

/home/src/tslibs/TS/Lib/tsc.js --noCheck
Output::



Program root files: [
  "/home/src/workspaces/project/a.ts",
  "/home/src/workspaces/project/b.ts"
]
Program options: {
  "declaration": true,
  "incremental": true,
  "noCheck": true,
  "configFilePath": "/home/src/workspaces/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/project/a.ts
/home/src/workspaces/project/b.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

exitCode:: ExitStatus.Success

Change:: Introduce error with noCheck

Input::
//// [/home/src/workspaces/project/a.ts]
export const a: number = "hello";


/home/src/tslibs/TS/Lib/tsc.js --noCheck
Output::


//// [/home/src/workspaces/project/a.js] file written with same contents
//// [/home/src/workspaces/project/a.d.ts]
export declare const a: number;


//// [/home/src/workspaces/project/tsconfig.tsbuildinfo]
{"fileNames":["../../tslibs/ts/lib/lib.d.ts","./a.ts","./b.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-11705693502-export const a: number = \"hello\";","signature":"-3045186137-export declare const a: number;\n"},{"version":"-13368947479-export const b = 10;","signature":"-3829150557-export declare const b = 10;\n"}],"root":[2,3],"options":{"declaration":true},"semanticDiagnosticsPerFile":[2],"checkPending":true,"version":"FakeTSVersion"}

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../tslibs/ts/lib/lib.d.ts",
    "./a.ts",
    "./b.ts"
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
    "./a.ts": {
      "original": {
        "version": "-11705693502-export const a: number = \"hello\";",
        "signature": "-3045186137-export declare const a: number;\n"
      },
      "version": "-11705693502-export const a: number = \"hello\";",
      "signature": "-3045186137-export declare const a: number;\n"
    },
    "./b.ts": {
      "original": {
        "version": "-13368947479-export const b = 10;",
        "signature": "-3829150557-export declare const b = 10;\n"
      },
      "version": "-13368947479-export const b = 10;",
      "signature": "-3829150557-export declare const b = 10;\n"
    }
  },
  "root": [
    [
      2,
      "./a.ts"
    ],
    [
      3,
      "./b.ts"
    ]
  ],
  "options": {
    "declaration": true
  },
  "semanticDiagnosticsPerFile": [
    [
      "./a.ts",
      "not cached or not changed"
    ]
  ],
  "checkPending": true,
  "version": "FakeTSVersion",
  "size": 908
}


Program root files: [
  "/home/src/workspaces/project/a.ts",
  "/home/src/workspaces/project/b.ts"
]
Program options: {
  "declaration": true,
  "incremental": true,
  "noCheck": true,
  "configFilePath": "/home/src/workspaces/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/project/a.ts
/home/src/workspaces/project/b.ts

Semantic diagnostics in builder refreshed for::
/home/src/workspaces/project/a.ts

Shape signatures in builder refreshed for::
/home/src/workspaces/project/a.ts (computed .d.ts)

exitCode:: ExitStatus.Success

Change:: no-change-run

Input::

/home/src/tslibs/TS/Lib/tsc.js --noCheck
Output::



Program root files: [
  "/home/src/workspaces/project/a.ts",
  "/home/src/workspaces/project/b.ts"
]
Program options: {
  "declaration": true,
  "incremental": true,
  "noCheck": true,
  "configFilePath": "/home/src/workspaces/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/project/a.ts
/home/src/workspaces/project/b.ts

Semantic diagnostics in builder refreshed for::
/home/src/workspaces/project/a.ts

No shapes updated in the builder::

exitCode:: ExitStatus.Success

Change:: No Change run with checking

Input::

/home/src/tslibs/TS/Lib/tsc.js 
Output::
[96ma.ts[0m:[93m1[0m:[93m14[0m - [91merror[0m[90m TS2322: [0mType 'string' is not assignable to type 'number'.

[7m1[0m export const a: number = "hello";
[7m [0m [91m             ~[0m


Found 1 error in a.ts[90m:1[0m



//// [/home/src/workspaces/project/tsconfig.tsbuildinfo]
{"fileNames":["../../tslibs/ts/lib/lib.d.ts","./a.ts","./b.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-11705693502-export const a: number = \"hello\";","signature":"-3045186137-export declare const a: number;\n"},{"version":"-13368947479-export const b = 10;","signature":"-3829150557-export declare const b = 10;\n"}],"root":[2,3],"options":{"declaration":true},"semanticDiagnosticsPerFile":[[2,[{"start":13,"length":1,"code":2322,"category":1,"messageText":"Type 'string' is not assignable to type 'number'."}]]],"version":"FakeTSVersion"}

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../tslibs/ts/lib/lib.d.ts",
    "./a.ts",
    "./b.ts"
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
    "./a.ts": {
      "original": {
        "version": "-11705693502-export const a: number = \"hello\";",
        "signature": "-3045186137-export declare const a: number;\n"
      },
      "version": "-11705693502-export const a: number = \"hello\";",
      "signature": "-3045186137-export declare const a: number;\n"
    },
    "./b.ts": {
      "original": {
        "version": "-13368947479-export const b = 10;",
        "signature": "-3829150557-export declare const b = 10;\n"
      },
      "version": "-13368947479-export const b = 10;",
      "signature": "-3829150557-export declare const b = 10;\n"
    }
  },
  "root": [
    [
      2,
      "./a.ts"
    ],
    [
      3,
      "./b.ts"
    ]
  ],
  "options": {
    "declaration": true
  },
  "semanticDiagnosticsPerFile": [
    [
      "./a.ts",
      [
        {
          "start": 13,
          "length": 1,
          "code": 2322,
          "category": 1,
          "messageText": "Type 'string' is not assignable to type 'number'."
        }
      ]
    ]
  ],
  "version": "FakeTSVersion",
  "size": 1007
}


Program root files: [
  "/home/src/workspaces/project/a.ts",
  "/home/src/workspaces/project/b.ts"
]
Program options: {
  "declaration": true,
  "incremental": true,
  "configFilePath": "/home/src/workspaces/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/project/a.ts
/home/src/workspaces/project/b.ts

Semantic diagnostics in builder refreshed for::
/home/src/workspaces/project/a.ts

No shapes updated in the builder::

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated

Change:: Fix `a` error with noCheck

Input::
//// [/home/src/workspaces/project/a.ts]
export const a = "hello";


/home/src/tslibs/TS/Lib/tsc.js --noCheck
Output::


//// [/home/src/workspaces/project/a.js] file written with same contents
//// [/home/src/workspaces/project/a.d.ts]
export declare const a = "hello";


//// [/home/src/workspaces/project/tsconfig.tsbuildinfo]
{"fileNames":["../../tslibs/ts/lib/lib.d.ts","./a.ts","./b.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-16641552193-export const a = \"hello\";","signature":"-2692717255-export declare const a = \"hello\";\n"},{"version":"-13368947479-export const b = 10;","signature":"-3829150557-export declare const b = 10;\n"}],"root":[2,3],"options":{"declaration":true},"semanticDiagnosticsPerFile":[2],"checkPending":true,"version":"FakeTSVersion"}

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../tslibs/ts/lib/lib.d.ts",
    "./a.ts",
    "./b.ts"
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
    "./a.ts": {
      "original": {
        "version": "-16641552193-export const a = \"hello\";",
        "signature": "-2692717255-export declare const a = \"hello\";\n"
      },
      "version": "-16641552193-export const a = \"hello\";",
      "signature": "-2692717255-export declare const a = \"hello\";\n"
    },
    "./b.ts": {
      "original": {
        "version": "-13368947479-export const b = 10;",
        "signature": "-3829150557-export declare const b = 10;\n"
      },
      "version": "-13368947479-export const b = 10;",
      "signature": "-3829150557-export declare const b = 10;\n"
    }
  },
  "root": [
    [
      2,
      "./a.ts"
    ],
    [
      3,
      "./b.ts"
    ]
  ],
  "options": {
    "declaration": true
  },
  "semanticDiagnosticsPerFile": [
    [
      "./a.ts",
      "not cached or not changed"
    ]
  ],
  "checkPending": true,
  "version": "FakeTSVersion",
  "size": 904
}


Program root files: [
  "/home/src/workspaces/project/a.ts",
  "/home/src/workspaces/project/b.ts"
]
Program options: {
  "declaration": true,
  "incremental": true,
  "noCheck": true,
  "configFilePath": "/home/src/workspaces/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/project/a.ts
/home/src/workspaces/project/b.ts

Semantic diagnostics in builder refreshed for::
/home/src/workspaces/project/a.ts

Shape signatures in builder refreshed for::
/home/src/workspaces/project/a.ts (computed .d.ts)

exitCode:: ExitStatus.Success

Change:: No Change run with checking

Input::

/home/src/tslibs/TS/Lib/tsc.js 
Output::


//// [/home/src/workspaces/project/tsconfig.tsbuildinfo]
{"fileNames":["../../tslibs/ts/lib/lib.d.ts","./a.ts","./b.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-16641552193-export const a = \"hello\";","signature":"-2692717255-export declare const a = \"hello\";\n"},{"version":"-13368947479-export const b = 10;","signature":"-3829150557-export declare const b = 10;\n"}],"root":[2,3],"options":{"declaration":true},"version":"FakeTSVersion"}

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../tslibs/ts/lib/lib.d.ts",
    "./a.ts",
    "./b.ts"
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
    "./a.ts": {
      "original": {
        "version": "-16641552193-export const a = \"hello\";",
        "signature": "-2692717255-export declare const a = \"hello\";\n"
      },
      "version": "-16641552193-export const a = \"hello\";",
      "signature": "-2692717255-export declare const a = \"hello\";\n"
    },
    "./b.ts": {
      "original": {
        "version": "-13368947479-export const b = 10;",
        "signature": "-3829150557-export declare const b = 10;\n"
      },
      "version": "-13368947479-export const b = 10;",
      "signature": "-3829150557-export declare const b = 10;\n"
    }
  },
  "root": [
    [
      2,
      "./a.ts"
    ],
    [
      3,
      "./b.ts"
    ]
  ],
  "options": {
    "declaration": true
  },
  "version": "FakeTSVersion",
  "size": 851
}


Program root files: [
  "/home/src/workspaces/project/a.ts",
  "/home/src/workspaces/project/b.ts"
]
Program options: {
  "declaration": true,
  "incremental": true,
  "configFilePath": "/home/src/workspaces/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/project/a.ts
/home/src/workspaces/project/b.ts

Semantic diagnostics in builder refreshed for::
/home/src/workspaces/project/a.ts

No shapes updated in the builder::

exitCode:: ExitStatus.Success

Change:: Add file with error

Input::
//// [/home/src/workspaces/project/c.ts]
export const c: number = "hello";


/home/src/tslibs/TS/Lib/tsc.js 
Output::
[96mc.ts[0m:[93m1[0m:[93m14[0m - [91merror[0m[90m TS2322: [0mType 'string' is not assignable to type 'number'.

[7m1[0m export const c: number = "hello";
[7m [0m [91m             ~[0m


Found 1 error in c.ts[90m:1[0m



//// [/home/src/workspaces/project/tsconfig.tsbuildinfo]
{"fileNames":["../../tslibs/ts/lib/lib.d.ts","./a.ts","./b.ts","./c.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-16641552193-export const a = \"hello\";","signature":"-2692717255-export declare const a = \"hello\";\n"},{"version":"-13368947479-export const b = 10;","signature":"-3829150557-export declare const b = 10;\n"},{"version":"-9150421116-export const c: number = \"hello\";","signature":"1429704745-export declare const c: number;\n"}],"root":[[2,4]],"options":{"declaration":true},"semanticDiagnosticsPerFile":[[4,[{"start":13,"length":1,"code":2322,"category":1,"messageText":"Type 'string' is not assignable to type 'number'."}]]],"version":"FakeTSVersion"}

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../tslibs/ts/lib/lib.d.ts",
    "./a.ts",
    "./b.ts",
    "./c.ts"
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
    "./a.ts": {
      "original": {
        "version": "-16641552193-export const a = \"hello\";",
        "signature": "-2692717255-export declare const a = \"hello\";\n"
      },
      "version": "-16641552193-export const a = \"hello\";",
      "signature": "-2692717255-export declare const a = \"hello\";\n"
    },
    "./b.ts": {
      "original": {
        "version": "-13368947479-export const b = 10;",
        "signature": "-3829150557-export declare const b = 10;\n"
      },
      "version": "-13368947479-export const b = 10;",
      "signature": "-3829150557-export declare const b = 10;\n"
    },
    "./c.ts": {
      "original": {
        "version": "-9150421116-export const c: number = \"hello\";",
        "signature": "1429704745-export declare const c: number;\n"
      },
      "version": "-9150421116-export const c: number = \"hello\";",
      "signature": "1429704745-export declare const c: number;\n"
    }
  },
  "root": [
    [
      [
        2,
        4
      ],
      [
        "./a.ts",
        "./b.ts",
        "./c.ts"
      ]
    ]
  ],
  "options": {
    "declaration": true
  },
  "semanticDiagnosticsPerFile": [
    [
      "./c.ts",
      [
        {
          "start": 13,
          "length": 1,
          "code": 2322,
          "category": 1,
          "messageText": "Type 'string' is not assignable to type 'number'."
        }
      ]
    ]
  ],
  "version": "FakeTSVersion",
  "size": 1135
}

//// [/home/src/workspaces/project/c.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.c = void 0;
exports.c = "hello";


//// [/home/src/workspaces/project/c.d.ts]
export declare const c: number;



Program root files: [
  "/home/src/workspaces/project/a.ts",
  "/home/src/workspaces/project/b.ts",
  "/home/src/workspaces/project/c.ts"
]
Program options: {
  "declaration": true,
  "incremental": true,
  "configFilePath": "/home/src/workspaces/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/project/a.ts
/home/src/workspaces/project/b.ts
/home/src/workspaces/project/c.ts

Semantic diagnostics in builder refreshed for::
/home/src/workspaces/project/c.ts

Shape signatures in builder refreshed for::
/home/src/workspaces/project/c.ts (computed .d.ts)

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated

Change:: Introduce error with noCheck

Input::
//// [/home/src/workspaces/project/a.ts]
export const a: number = "hello";


/home/src/tslibs/TS/Lib/tsc.js --noCheck
Output::


//// [/home/src/workspaces/project/a.js] file written with same contents
//// [/home/src/workspaces/project/a.d.ts]
export declare const a: number;


//// [/home/src/workspaces/project/tsconfig.tsbuildinfo]
{"fileNames":["../../tslibs/ts/lib/lib.d.ts","./a.ts","./b.ts","./c.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-11705693502-export const a: number = \"hello\";","signature":"-3045186137-export declare const a: number;\n"},{"version":"-13368947479-export const b = 10;","signature":"-3829150557-export declare const b = 10;\n"},{"version":"-9150421116-export const c: number = \"hello\";","signature":"1429704745-export declare const c: number;\n"}],"root":[[2,4]],"options":{"declaration":true},"semanticDiagnosticsPerFile":[2,[4,[{"start":13,"length":1,"code":2322,"category":1,"messageText":"Type 'string' is not assignable to type 'number'."}]]],"checkPending":true,"version":"FakeTSVersion"}

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../tslibs/ts/lib/lib.d.ts",
    "./a.ts",
    "./b.ts",
    "./c.ts"
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
    "./a.ts": {
      "original": {
        "version": "-11705693502-export const a: number = \"hello\";",
        "signature": "-3045186137-export declare const a: number;\n"
      },
      "version": "-11705693502-export const a: number = \"hello\";",
      "signature": "-3045186137-export declare const a: number;\n"
    },
    "./b.ts": {
      "original": {
        "version": "-13368947479-export const b = 10;",
        "signature": "-3829150557-export declare const b = 10;\n"
      },
      "version": "-13368947479-export const b = 10;",
      "signature": "-3829150557-export declare const b = 10;\n"
    },
    "./c.ts": {
      "original": {
        "version": "-9150421116-export const c: number = \"hello\";",
        "signature": "1429704745-export declare const c: number;\n"
      },
      "version": "-9150421116-export const c: number = \"hello\";",
      "signature": "1429704745-export declare const c: number;\n"
    }
  },
  "root": [
    [
      [
        2,
        4
      ],
      [
        "./a.ts",
        "./b.ts",
        "./c.ts"
      ]
    ]
  ],
  "options": {
    "declaration": true
  },
  "semanticDiagnosticsPerFile": [
    [
      "./a.ts",
      "not cached or not changed"
    ],
    [
      "./c.ts",
      [
        {
          "start": 13,
          "length": 1,
          "code": 2322,
          "category": 1,
          "messageText": "Type 'string' is not assignable to type 'number'."
        }
      ]
    ]
  ],
  "checkPending": true,
  "version": "FakeTSVersion",
  "size": 1161
}


Program root files: [
  "/home/src/workspaces/project/a.ts",
  "/home/src/workspaces/project/b.ts",
  "/home/src/workspaces/project/c.ts"
]
Program options: {
  "declaration": true,
  "incremental": true,
  "noCheck": true,
  "configFilePath": "/home/src/workspaces/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/project/a.ts
/home/src/workspaces/project/b.ts
/home/src/workspaces/project/c.ts

Semantic diagnostics in builder refreshed for::
/home/src/workspaces/project/a.ts

Shape signatures in builder refreshed for::
/home/src/workspaces/project/a.ts (computed .d.ts)

exitCode:: ExitStatus.Success

Change:: Fix `a` error with noCheck

Input::
//// [/home/src/workspaces/project/a.ts]
export const a = "hello";


/home/src/tslibs/TS/Lib/tsc.js --noCheck
Output::


//// [/home/src/workspaces/project/a.js] file written with same contents
//// [/home/src/workspaces/project/a.d.ts]
export declare const a = "hello";


//// [/home/src/workspaces/project/tsconfig.tsbuildinfo]
{"fileNames":["../../tslibs/ts/lib/lib.d.ts","./a.ts","./b.ts","./c.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-16641552193-export const a = \"hello\";","signature":"-2692717255-export declare const a = \"hello\";\n"},{"version":"-13368947479-export const b = 10;","signature":"-3829150557-export declare const b = 10;\n"},{"version":"-9150421116-export const c: number = \"hello\";","signature":"1429704745-export declare const c: number;\n"}],"root":[[2,4]],"options":{"declaration":true},"semanticDiagnosticsPerFile":[2,[4,[{"start":13,"length":1,"code":2322,"category":1,"messageText":"Type 'string' is not assignable to type 'number'."}]]],"checkPending":true,"version":"FakeTSVersion"}

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../tslibs/ts/lib/lib.d.ts",
    "./a.ts",
    "./b.ts",
    "./c.ts"
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
    "./a.ts": {
      "original": {
        "version": "-16641552193-export const a = \"hello\";",
        "signature": "-2692717255-export declare const a = \"hello\";\n"
      },
      "version": "-16641552193-export const a = \"hello\";",
      "signature": "-2692717255-export declare const a = \"hello\";\n"
    },
    "./b.ts": {
      "original": {
        "version": "-13368947479-export const b = 10;",
        "signature": "-3829150557-export declare const b = 10;\n"
      },
      "version": "-13368947479-export const b = 10;",
      "signature": "-3829150557-export declare const b = 10;\n"
    },
    "./c.ts": {
      "original": {
        "version": "-9150421116-export const c: number = \"hello\";",
        "signature": "1429704745-export declare const c: number;\n"
      },
      "version": "-9150421116-export const c: number = \"hello\";",
      "signature": "1429704745-export declare const c: number;\n"
    }
  },
  "root": [
    [
      [
        2,
        4
      ],
      [
        "./a.ts",
        "./b.ts",
        "./c.ts"
      ]
    ]
  ],
  "options": {
    "declaration": true
  },
  "semanticDiagnosticsPerFile": [
    [
      "./a.ts",
      "not cached or not changed"
    ],
    [
      "./c.ts",
      [
        {
          "start": 13,
          "length": 1,
          "code": 2322,
          "category": 1,
          "messageText": "Type 'string' is not assignable to type 'number'."
        }
      ]
    ]
  ],
  "checkPending": true,
  "version": "FakeTSVersion",
  "size": 1157
}


Program root files: [
  "/home/src/workspaces/project/a.ts",
  "/home/src/workspaces/project/b.ts",
  "/home/src/workspaces/project/c.ts"
]
Program options: {
  "declaration": true,
  "incremental": true,
  "noCheck": true,
  "configFilePath": "/home/src/workspaces/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/project/a.ts
/home/src/workspaces/project/b.ts
/home/src/workspaces/project/c.ts

Semantic diagnostics in builder refreshed for::
/home/src/workspaces/project/a.ts

Shape signatures in builder refreshed for::
/home/src/workspaces/project/a.ts (computed .d.ts)

exitCode:: ExitStatus.Success

Change:: No Change run with checking

Input::

/home/src/tslibs/TS/Lib/tsc.js 
Output::
[96mc.ts[0m:[93m1[0m:[93m14[0m - [91merror[0m[90m TS2322: [0mType 'string' is not assignable to type 'number'.

[7m1[0m export const c: number = "hello";
[7m [0m [91m             ~[0m


Found 1 error in c.ts[90m:1[0m



//// [/home/src/workspaces/project/tsconfig.tsbuildinfo]
{"fileNames":["../../tslibs/ts/lib/lib.d.ts","./a.ts","./b.ts","./c.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-16641552193-export const a = \"hello\";","signature":"-2692717255-export declare const a = \"hello\";\n"},{"version":"-13368947479-export const b = 10;","signature":"-3829150557-export declare const b = 10;\n"},{"version":"-9150421116-export const c: number = \"hello\";","signature":"1429704745-export declare const c: number;\n"}],"root":[[2,4]],"options":{"declaration":true},"semanticDiagnosticsPerFile":[[4,[{"start":13,"length":1,"code":2322,"category":1,"messageText":"Type 'string' is not assignable to type 'number'."}]]],"version":"FakeTSVersion"}

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../tslibs/ts/lib/lib.d.ts",
    "./a.ts",
    "./b.ts",
    "./c.ts"
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
    "./a.ts": {
      "original": {
        "version": "-16641552193-export const a = \"hello\";",
        "signature": "-2692717255-export declare const a = \"hello\";\n"
      },
      "version": "-16641552193-export const a = \"hello\";",
      "signature": "-2692717255-export declare const a = \"hello\";\n"
    },
    "./b.ts": {
      "original": {
        "version": "-13368947479-export const b = 10;",
        "signature": "-3829150557-export declare const b = 10;\n"
      },
      "version": "-13368947479-export const b = 10;",
      "signature": "-3829150557-export declare const b = 10;\n"
    },
    "./c.ts": {
      "original": {
        "version": "-9150421116-export const c: number = \"hello\";",
        "signature": "1429704745-export declare const c: number;\n"
      },
      "version": "-9150421116-export const c: number = \"hello\";",
      "signature": "1429704745-export declare const c: number;\n"
    }
  },
  "root": [
    [
      [
        2,
        4
      ],
      [
        "./a.ts",
        "./b.ts",
        "./c.ts"
      ]
    ]
  ],
  "options": {
    "declaration": true
  },
  "semanticDiagnosticsPerFile": [
    [
      "./c.ts",
      [
        {
          "start": 13,
          "length": 1,
          "code": 2322,
          "category": 1,
          "messageText": "Type 'string' is not assignable to type 'number'."
        }
      ]
    ]
  ],
  "version": "FakeTSVersion",
  "size": 1135
}


Program root files: [
  "/home/src/workspaces/project/a.ts",
  "/home/src/workspaces/project/b.ts",
  "/home/src/workspaces/project/c.ts"
]
Program options: {
  "declaration": true,
  "incremental": true,
  "configFilePath": "/home/src/workspaces/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/project/a.ts
/home/src/workspaces/project/b.ts
/home/src/workspaces/project/c.ts

Semantic diagnostics in builder refreshed for::
/home/src/workspaces/project/a.ts

No shapes updated in the builder::

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated

Change:: no-change-run

Input::

/home/src/tslibs/TS/Lib/tsc.js --noCheck
Output::



Program root files: [
  "/home/src/workspaces/project/a.ts",
  "/home/src/workspaces/project/b.ts",
  "/home/src/workspaces/project/c.ts"
]
Program options: {
  "declaration": true,
  "incremental": true,
  "noCheck": true,
  "configFilePath": "/home/src/workspaces/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/project/a.ts
/home/src/workspaces/project/b.ts
/home/src/workspaces/project/c.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

exitCode:: ExitStatus.Success

Change:: No Change run with checking

Input::

/home/src/tslibs/TS/Lib/tsc.js 
Output::
[96mc.ts[0m:[93m1[0m:[93m14[0m - [91merror[0m[90m TS2322: [0mType 'string' is not assignable to type 'number'.

[7m1[0m export const c: number = "hello";
[7m [0m [91m             ~[0m


Found 1 error in c.ts[90m:1[0m




Program root files: [
  "/home/src/workspaces/project/a.ts",
  "/home/src/workspaces/project/b.ts",
  "/home/src/workspaces/project/c.ts"
]
Program options: {
  "declaration": true,
  "incremental": true,
  "configFilePath": "/home/src/workspaces/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/project/a.ts
/home/src/workspaces/project/b.ts
/home/src/workspaces/project/c.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated
