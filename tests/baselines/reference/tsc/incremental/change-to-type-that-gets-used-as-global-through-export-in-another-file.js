currentDirectory:: /home/src/workspaces/project useCaseSensitiveFileNames:: false
Input::
//// [/home/src/workspaces/project/tsconfig.json]
{
  "compilerOptions": {
    "composite": true
  }
}

//// [/home/src/workspaces/project/class1.ts]
const a: MagicNumber = 1;
console.log(a);

//// [/home/src/workspaces/project/constants.ts]
export default 1;

//// [/home/src/workspaces/project/types.d.ts]
type MagicNumber = typeof import('./constants').default

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


/home/src/tslibs/TS/Lib/tsc.js 
Output::


//// [/home/src/workspaces/project/class1.js]
var a = 1;
console.log(a);


//// [/home/src/workspaces/project/class1.d.ts]
declare const a = 1;


//// [/home/src/workspaces/project/constants.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = 1;


//// [/home/src/workspaces/project/constants.d.ts]
declare const _default: 1;
export default _default;


//// [/home/src/workspaces/project/tsconfig.tsbuildinfo]
{"fileNames":["../../tslibs/ts/lib/lib.d.ts","./class1.ts","./constants.ts","./types.d.ts"],"fileIdsList":[[3]],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"4085502068-const a: MagicNumber = 1;\nconsole.log(a);","signature":"-3664763344-declare const a = 1;\n","affectsGlobalScope":true},{"version":"-2659799048-export default 1;","signature":"-183154784-declare const _default: 1;\nexport default _default;\n"},{"version":"-2080821236-type MagicNumber = typeof import('./constants').default","affectsGlobalScope":true}],"root":[[2,4]],"options":{"composite":true},"referencedMap":[[4,1]],"latestChangedDtsFile":"./constants.d.ts","version":"FakeTSVersion"}

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../tslibs/ts/lib/lib.d.ts",
    "./class1.ts",
    "./constants.ts",
    "./types.d.ts"
  ],
  "fileIdsList": [
    [
      "./constants.ts"
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
    "./class1.ts": {
      "original": {
        "version": "4085502068-const a: MagicNumber = 1;\nconsole.log(a);",
        "signature": "-3664763344-declare const a = 1;\n",
        "affectsGlobalScope": true
      },
      "version": "4085502068-const a: MagicNumber = 1;\nconsole.log(a);",
      "signature": "-3664763344-declare const a = 1;\n",
      "affectsGlobalScope": true
    },
    "./constants.ts": {
      "original": {
        "version": "-2659799048-export default 1;",
        "signature": "-183154784-declare const _default: 1;\nexport default _default;\n"
      },
      "version": "-2659799048-export default 1;",
      "signature": "-183154784-declare const _default: 1;\nexport default _default;\n"
    },
    "./types.d.ts": {
      "original": {
        "version": "-2080821236-type MagicNumber = typeof import('./constants').default",
        "affectsGlobalScope": true
      },
      "version": "-2080821236-type MagicNumber = typeof import('./constants').default",
      "signature": "-2080821236-type MagicNumber = typeof import('./constants').default",
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
        "./class1.ts",
        "./constants.ts",
        "./types.d.ts"
      ]
    ]
  ],
  "options": {
    "composite": true
  },
  "referencedMap": {
    "./types.d.ts": [
      "./constants.ts"
    ]
  },
  "latestChangedDtsFile": "./constants.d.ts",
  "version": "FakeTSVersion",
  "size": 1116
}


exitCode:: ExitStatus.Success

Change:: Modify imports used in global file

Input::
//// [/home/src/workspaces/project/constants.ts]
export default 2;


/home/src/tslibs/TS/Lib/tsc.js 
Output::
[96mclass1.ts[0m:[93m1[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType '1' is not assignable to type '2'.

[7m1[0m const a: MagicNumber = 1;
[7m [0m [91m      ~[0m


Found 1 error in class1.ts[90m:1[0m



//// [/home/src/workspaces/project/class1.d.ts]
declare const a = 2;


//// [/home/src/workspaces/project/constants.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = 2;


//// [/home/src/workspaces/project/constants.d.ts]
declare const _default: 2;
export default _default;


//// [/home/src/workspaces/project/tsconfig.tsbuildinfo]
{"fileNames":["../../tslibs/ts/lib/lib.d.ts","./class1.ts","./constants.ts","./types.d.ts"],"fileIdsList":[[3]],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"4085502068-const a: MagicNumber = 1;\nconsole.log(a);","signature":"-3664762255-declare const a = 2;\n","affectsGlobalScope":true},{"version":"-2659799015-export default 2;","signature":"-10876795135-declare const _default: 2;\nexport default _default;\n"},{"version":"-2080821236-type MagicNumber = typeof import('./constants').default","affectsGlobalScope":true}],"root":[[2,4]],"options":{"composite":true},"referencedMap":[[4,1]],"semanticDiagnosticsPerFile":[[2,[{"start":6,"length":1,"code":2322,"category":1,"messageText":"Type '1' is not assignable to type '2'."}]]],"latestChangedDtsFile":"./class1.d.ts","version":"FakeTSVersion"}

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../tslibs/ts/lib/lib.d.ts",
    "./class1.ts",
    "./constants.ts",
    "./types.d.ts"
  ],
  "fileIdsList": [
    [
      "./constants.ts"
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
    "./class1.ts": {
      "original": {
        "version": "4085502068-const a: MagicNumber = 1;\nconsole.log(a);",
        "signature": "-3664762255-declare const a = 2;\n",
        "affectsGlobalScope": true
      },
      "version": "4085502068-const a: MagicNumber = 1;\nconsole.log(a);",
      "signature": "-3664762255-declare const a = 2;\n",
      "affectsGlobalScope": true
    },
    "./constants.ts": {
      "original": {
        "version": "-2659799015-export default 2;",
        "signature": "-10876795135-declare const _default: 2;\nexport default _default;\n"
      },
      "version": "-2659799015-export default 2;",
      "signature": "-10876795135-declare const _default: 2;\nexport default _default;\n"
    },
    "./types.d.ts": {
      "original": {
        "version": "-2080821236-type MagicNumber = typeof import('./constants').default",
        "affectsGlobalScope": true
      },
      "version": "-2080821236-type MagicNumber = typeof import('./constants').default",
      "signature": "-2080821236-type MagicNumber = typeof import('./constants').default",
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
        "./class1.ts",
        "./constants.ts",
        "./types.d.ts"
      ]
    ]
  ],
  "options": {
    "composite": true
  },
  "referencedMap": {
    "./types.d.ts": [
      "./constants.ts"
    ]
  },
  "semanticDiagnosticsPerFile": [
    [
      "./class1.ts",
      [
        {
          "start": 6,
          "length": 1,
          "code": 2322,
          "category": 1,
          "messageText": "Type '1' is not assignable to type '2'."
        }
      ]
    ]
  ],
  "latestChangedDtsFile": "./class1.d.ts",
  "version": "FakeTSVersion",
  "size": 1256
}


exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated
