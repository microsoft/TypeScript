currentDirectory:: /home/src/workspaces/project useCaseSensitiveFileNames:: false
Input::
//// [/home/src/workspaces/project/src/globals.d.ts]
interface SymbolConstructor {
    (description?: string | number): symbol;
}
declare var Symbol: SymbolConstructor;


//// [/home/src/workspaces/project/src/hkt.ts]
export interface HKT<T> { }

//// [/home/src/workspaces/project/src/main.ts]
import { HKT } from "./hkt";

const sym = Symbol();

declare module "./hkt" {
    interface HKT<T> {
        [sym]: { a: T }
    }
}
const x = 10;
type A = HKT<number>[typeof sym];


//// [/home/src/workspaces/project/tsconfig.json]
{
  "compilerOptions": {
    "rootDir": "src",
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


/home/src/tslibs/TS/Lib/tsc.js --b --verbose
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because output file 'tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/project/tsconfig.json'...



//// [/home/src/workspaces/project/src/hkt.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });


//// [/home/src/workspaces/project/src/main.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sym = Symbol();
var x = 10;


//// [/home/src/workspaces/project/tsconfig.tsbuildinfo]
{"fileNames":["../../tslibs/ts/lib/lib.d.ts","./src/globals.d.ts","./src/hkt.ts","./src/main.ts"],"fileIdsList":[[3,4]],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-1383980825-interface SymbolConstructor {\n    (description?: string | number): symbol;\n}\ndeclare var Symbol: SymbolConstructor;\n","affectsGlobalScope":true},"675797797-export interface HKT<T> { }","-28636726258-import { HKT } from \"./hkt\";\n\nconst sym = Symbol();\n\ndeclare module \"./hkt\" {\n    interface HKT<T> {\n        [sym]: { a: T }\n    }\n}\nconst x = 10;\ntype A = HKT<number>[typeof sym];\n"],"root":[[2,4]],"options":{"rootDir":"./src"},"referencedMap":[[4,1]],"version":"FakeTSVersion"}

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../tslibs/ts/lib/lib.d.ts",
    "./src/globals.d.ts",
    "./src/hkt.ts",
    "./src/main.ts"
  ],
  "fileIdsList": [
    [
      "./src/hkt.ts",
      "./src/main.ts"
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
    "./src/globals.d.ts": {
      "original": {
        "version": "-1383980825-interface SymbolConstructor {\n    (description?: string | number): symbol;\n}\ndeclare var Symbol: SymbolConstructor;\n",
        "affectsGlobalScope": true
      },
      "version": "-1383980825-interface SymbolConstructor {\n    (description?: string | number): symbol;\n}\ndeclare var Symbol: SymbolConstructor;\n",
      "signature": "-1383980825-interface SymbolConstructor {\n    (description?: string | number): symbol;\n}\ndeclare var Symbol: SymbolConstructor;\n",
      "affectsGlobalScope": true
    },
    "./src/hkt.ts": {
      "version": "675797797-export interface HKT<T> { }",
      "signature": "675797797-export interface HKT<T> { }"
    },
    "./src/main.ts": {
      "version": "-28636726258-import { HKT } from \"./hkt\";\n\nconst sym = Symbol();\n\ndeclare module \"./hkt\" {\n    interface HKT<T> {\n        [sym]: { a: T }\n    }\n}\nconst x = 10;\ntype A = HKT<number>[typeof sym];\n",
      "signature": "-28636726258-import { HKT } from \"./hkt\";\n\nconst sym = Symbol();\n\ndeclare module \"./hkt\" {\n    interface HKT<T> {\n        [sym]: { a: T }\n    }\n}\nconst x = 10;\ntype A = HKT<number>[typeof sym];\n"
    }
  },
  "root": [
    [
      [
        2,
        4
      ],
      [
        "./src/globals.d.ts",
        "./src/hkt.ts",
        "./src/main.ts"
      ]
    ]
  ],
  "options": {
    "rootDir": "./src"
  },
  "referencedMap": {
    "./src/main.ts": [
      "./src/hkt.ts",
      "./src/main.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 1133
}


exitCode:: ExitStatus.Success

Change:: incremental-declaration-doesnt-change

Input::
//// [/home/src/workspaces/project/src/main.ts]
import { HKT } from "./hkt";

const sym = Symbol();

declare module "./hkt" {
    interface HKT<T> {
        [sym]: { a: T }
    }
}

type A = HKT<number>[typeof sym];



/home/src/tslibs/TS/Lib/tsc.js --b --verbose
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because output 'tsconfig.tsbuildinfo' is older than input 'src/main.ts'

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/project/tsconfig.json'...



//// [/home/src/workspaces/project/src/main.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sym = Symbol();


//// [/home/src/workspaces/project/tsconfig.tsbuildinfo]
{"fileNames":["../../tslibs/ts/lib/lib.d.ts","./src/globals.d.ts","./src/hkt.ts","./src/main.ts"],"fileIdsList":[[3,4]],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-1383980825-interface SymbolConstructor {\n    (description?: string | number): symbol;\n}\ndeclare var Symbol: SymbolConstructor;\n","affectsGlobalScope":true},"675797797-export interface HKT<T> { }",{"version":"-13476768170-import { HKT } from \"./hkt\";\n\nconst sym = Symbol();\n\ndeclare module \"./hkt\" {\n    interface HKT<T> {\n        [sym]: { a: T }\n    }\n}\n\ntype A = HKT<number>[typeof sym];\n","signature":"-13155653598-declare const sym: unique symbol;\ndeclare module \"./hkt\" {\n    interface HKT<T> {\n        [sym]: {\n            a: T;\n        };\n    }\n}\nexport {};\n"}],"root":[[2,4]],"options":{"rootDir":"./src"},"referencedMap":[[4,1]],"version":"FakeTSVersion"}

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../tslibs/ts/lib/lib.d.ts",
    "./src/globals.d.ts",
    "./src/hkt.ts",
    "./src/main.ts"
  ],
  "fileIdsList": [
    [
      "./src/hkt.ts",
      "./src/main.ts"
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
    "./src/globals.d.ts": {
      "original": {
        "version": "-1383980825-interface SymbolConstructor {\n    (description?: string | number): symbol;\n}\ndeclare var Symbol: SymbolConstructor;\n",
        "affectsGlobalScope": true
      },
      "version": "-1383980825-interface SymbolConstructor {\n    (description?: string | number): symbol;\n}\ndeclare var Symbol: SymbolConstructor;\n",
      "signature": "-1383980825-interface SymbolConstructor {\n    (description?: string | number): symbol;\n}\ndeclare var Symbol: SymbolConstructor;\n",
      "affectsGlobalScope": true
    },
    "./src/hkt.ts": {
      "version": "675797797-export interface HKT<T> { }",
      "signature": "675797797-export interface HKT<T> { }"
    },
    "./src/main.ts": {
      "original": {
        "version": "-13476768170-import { HKT } from \"./hkt\";\n\nconst sym = Symbol();\n\ndeclare module \"./hkt\" {\n    interface HKT<T> {\n        [sym]: { a: T }\n    }\n}\n\ntype A = HKT<number>[typeof sym];\n",
        "signature": "-13155653598-declare const sym: unique symbol;\ndeclare module \"./hkt\" {\n    interface HKT<T> {\n        [sym]: {\n            a: T;\n        };\n    }\n}\nexport {};\n"
      },
      "version": "-13476768170-import { HKT } from \"./hkt\";\n\nconst sym = Symbol();\n\ndeclare module \"./hkt\" {\n    interface HKT<T> {\n        [sym]: { a: T }\n    }\n}\n\ntype A = HKT<number>[typeof sym];\n",
      "signature": "-13155653598-declare const sym: unique symbol;\ndeclare module \"./hkt\" {\n    interface HKT<T> {\n        [sym]: {\n            a: T;\n        };\n    }\n}\nexport {};\n"
    }
  },
  "root": [
    [
      [
        2,
        4
      ],
      [
        "./src/globals.d.ts",
        "./src/hkt.ts",
        "./src/main.ts"
      ]
    ]
  ],
  "options": {
    "rootDir": "./src"
  },
  "referencedMap": {
    "./src/main.ts": [
      "./src/hkt.ts",
      "./src/main.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 1318
}


exitCode:: ExitStatus.Success

Change:: incremental-declaration-doesnt-change

Input::
//// [/home/src/workspaces/project/src/main.ts]
import { HKT } from "./hkt";

const sym = Symbol();

declare module "./hkt" {
    interface HKT<T> {
        [sym]: { a: T }
    }
}

type A = HKT<number>[typeof sym];
const x = 10;


/home/src/tslibs/TS/Lib/tsc.js --b --verbose
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because output 'tsconfig.tsbuildinfo' is older than input 'src/main.ts'

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/project/tsconfig.json'...



//// [/home/src/workspaces/project/src/main.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sym = Symbol();
var x = 10;


//// [/home/src/workspaces/project/tsconfig.tsbuildinfo]
{"fileNames":["../../tslibs/ts/lib/lib.d.ts","./src/globals.d.ts","./src/hkt.ts","./src/main.ts"],"fileIdsList":[[3,4]],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-1383980825-interface SymbolConstructor {\n    (description?: string | number): symbol;\n}\ndeclare var Symbol: SymbolConstructor;\n","affectsGlobalScope":true},"675797797-export interface HKT<T> { }",{"version":"-8082110290-import { HKT } from \"./hkt\";\n\nconst sym = Symbol();\n\ndeclare module \"./hkt\" {\n    interface HKT<T> {\n        [sym]: { a: T }\n    }\n}\n\ntype A = HKT<number>[typeof sym];\nconst x = 10;","signature":"-13155653598-declare const sym: unique symbol;\ndeclare module \"./hkt\" {\n    interface HKT<T> {\n        [sym]: {\n            a: T;\n        };\n    }\n}\nexport {};\n"}],"root":[[2,4]],"options":{"rootDir":"./src"},"referencedMap":[[4,1]],"version":"FakeTSVersion"}

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../tslibs/ts/lib/lib.d.ts",
    "./src/globals.d.ts",
    "./src/hkt.ts",
    "./src/main.ts"
  ],
  "fileIdsList": [
    [
      "./src/hkt.ts",
      "./src/main.ts"
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
    "./src/globals.d.ts": {
      "original": {
        "version": "-1383980825-interface SymbolConstructor {\n    (description?: string | number): symbol;\n}\ndeclare var Symbol: SymbolConstructor;\n",
        "affectsGlobalScope": true
      },
      "version": "-1383980825-interface SymbolConstructor {\n    (description?: string | number): symbol;\n}\ndeclare var Symbol: SymbolConstructor;\n",
      "signature": "-1383980825-interface SymbolConstructor {\n    (description?: string | number): symbol;\n}\ndeclare var Symbol: SymbolConstructor;\n",
      "affectsGlobalScope": true
    },
    "./src/hkt.ts": {
      "version": "675797797-export interface HKT<T> { }",
      "signature": "675797797-export interface HKT<T> { }"
    },
    "./src/main.ts": {
      "original": {
        "version": "-8082110290-import { HKT } from \"./hkt\";\n\nconst sym = Symbol();\n\ndeclare module \"./hkt\" {\n    interface HKT<T> {\n        [sym]: { a: T }\n    }\n}\n\ntype A = HKT<number>[typeof sym];\nconst x = 10;",
        "signature": "-13155653598-declare const sym: unique symbol;\ndeclare module \"./hkt\" {\n    interface HKT<T> {\n        [sym]: {\n            a: T;\n        };\n    }\n}\nexport {};\n"
      },
      "version": "-8082110290-import { HKT } from \"./hkt\";\n\nconst sym = Symbol();\n\ndeclare module \"./hkt\" {\n    interface HKT<T> {\n        [sym]: { a: T }\n    }\n}\n\ntype A = HKT<number>[typeof sym];\nconst x = 10;",
      "signature": "-13155653598-declare const sym: unique symbol;\ndeclare module \"./hkt\" {\n    interface HKT<T> {\n        [sym]: {\n            a: T;\n        };\n    }\n}\nexport {};\n"
    }
  },
  "root": [
    [
      [
        2,
        4
      ],
      [
        "./src/globals.d.ts",
        "./src/hkt.ts",
        "./src/main.ts"
      ]
    ]
  ],
  "options": {
    "rootDir": "./src"
  },
  "referencedMap": {
    "./src/main.ts": [
      "./src/hkt.ts",
      "./src/main.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 1330
}


exitCode:: ExitStatus.Success
