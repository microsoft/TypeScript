currentDirectory:: / useCaseSensitiveFileNames: false
Input::
//// [/lib/lib.d.ts]
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

//// [/src/src/globals.d.ts]
interface SymbolConstructor {
    (description?: string | number): symbol;
}
declare var Symbol: SymbolConstructor;


//// [/src/src/hkt.ts]
export interface HKT<T> { }

//// [/src/src/main.ts]
import { HKT } from "./hkt";

const sym = Symbol();

declare module "./hkt" {
    interface HKT<T> {
        [sym]: { a: T }
    }
}
const x = 10;
type A = HKT<number>[typeof sym];


//// [/src/tsconfig.json]
{
  "compilerOptions": {
    "rootDir": "src",
    "incremental": true
  }
}



Output::
/lib/tsc --b /src/tsconfig.json --verbose
[[90m12:00:11 AM[0m] Projects in this build: 
    * src/tsconfig.json

[[90m12:00:12 AM[0m] Project 'src/tsconfig.json' is out of date because output file 'src/tsconfig.tsbuildinfo' does not exist

[[90m12:00:13 AM[0m] Building project '/src/tsconfig.json'...

exitCode:: ExitStatus.Success


//// [/src/src/hkt.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });


//// [/src/src/main.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sym = Symbol();
var x = 10;


//// [/src/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../lib/lib.d.ts","./src/globals.d.ts","./src/hkt.ts","./src/main.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-1383980825-interface SymbolConstructor {\n    (description?: string | number): symbol;\n}\ndeclare var Symbol: SymbolConstructor;\n","affectsGlobalScope":true},"675797797-export interface HKT<T> { }","-28636726258-import { HKT } from \"./hkt\";\n\nconst sym = Symbol();\n\ndeclare module \"./hkt\" {\n    interface HKT<T> {\n        [sym]: { a: T }\n    }\n}\nconst x = 10;\ntype A = HKT<number>[typeof sym];\n"],"root":[[2,4]],"options":{"rootDir":"./src"},"fileIdsList":[[3,4]],"referencedMap":[[4,1]],"exportedModulesMap":[[4,1]],"semanticDiagnosticsPerFile":[1,2,3,4]},"version":"FakeTSVersion"}

//// [/src/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../lib/lib.d.ts",
      "./src/globals.d.ts",
      "./src/hkt.ts",
      "./src/main.ts"
    ],
    "fileNamesList": [
      [
        "./src/hkt.ts",
        "./src/main.ts"
      ]
    ],
    "fileInfos": {
      "../lib/lib.d.ts": {
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
    "exportedModulesMap": {
      "./src/main.ts": [
        "./src/hkt.ts",
        "./src/main.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../lib/lib.d.ts",
      "./src/globals.d.ts",
      "./src/hkt.ts",
      "./src/main.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 1200
}



Change:: incremental-declaration-doesnt-change
Input::
//// [/src/src/main.ts]
import { HKT } from "./hkt";

const sym = Symbol();

declare module "./hkt" {
    interface HKT<T> {
        [sym]: { a: T }
    }
}

type A = HKT<number>[typeof sym];




Output::
/lib/tsc --b /src/tsconfig.json --verbose
[[90m12:00:20 AM[0m] Projects in this build: 
    * src/tsconfig.json

[[90m12:00:21 AM[0m] Project 'src/tsconfig.json' is out of date because output 'src/tsconfig.tsbuildinfo' is older than input 'src/src/main.ts'

[[90m12:00:22 AM[0m] Building project '/src/tsconfig.json'...

exitCode:: ExitStatus.Success


//// [/src/src/main.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sym = Symbol();


//// [/src/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../lib/lib.d.ts","./src/globals.d.ts","./src/hkt.ts","./src/main.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-1383980825-interface SymbolConstructor {\n    (description?: string | number): symbol;\n}\ndeclare var Symbol: SymbolConstructor;\n","affectsGlobalScope":true},"675797797-export interface HKT<T> { }",{"version":"-13476768170-import { HKT } from \"./hkt\";\n\nconst sym = Symbol();\n\ndeclare module \"./hkt\" {\n    interface HKT<T> {\n        [sym]: { a: T }\n    }\n}\n\ntype A = HKT<number>[typeof sym];\n","signature":"-13155653598-declare const sym: unique symbol;\ndeclare module \"./hkt\" {\n    interface HKT<T> {\n        [sym]: {\n            a: T;\n        };\n    }\n}\nexport {};\n"}],"root":[[2,4]],"options":{"rootDir":"./src"},"fileIdsList":[[3,4]],"referencedMap":[[4,1]],"exportedModulesMap":[[4,1]],"semanticDiagnosticsPerFile":[1,2,3,4]},"version":"FakeTSVersion"}

//// [/src/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../lib/lib.d.ts",
      "./src/globals.d.ts",
      "./src/hkt.ts",
      "./src/main.ts"
    ],
    "fileNamesList": [
      [
        "./src/hkt.ts",
        "./src/main.ts"
      ]
    ],
    "fileInfos": {
      "../lib/lib.d.ts": {
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
    "exportedModulesMap": {
      "./src/main.ts": [
        "./src/hkt.ts",
        "./src/main.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../lib/lib.d.ts",
      "./src/globals.d.ts",
      "./src/hkt.ts",
      "./src/main.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 1385
}



Change:: incremental-declaration-doesnt-change
Input::
//// [/src/src/main.ts]
import { HKT } from "./hkt";

const sym = Symbol();

declare module "./hkt" {
    interface HKT<T> {
        [sym]: { a: T }
    }
}

type A = HKT<number>[typeof sym];
const x = 10;



Output::
/lib/tsc --b /src/tsconfig.json --verbose
[[90m12:00:28 AM[0m] Projects in this build: 
    * src/tsconfig.json

[[90m12:00:29 AM[0m] Project 'src/tsconfig.json' is out of date because output 'src/tsconfig.tsbuildinfo' is older than input 'src/src/main.ts'

[[90m12:00:30 AM[0m] Building project '/src/tsconfig.json'...

exitCode:: ExitStatus.Success


//// [/src/src/main.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sym = Symbol();
var x = 10;


//// [/src/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../lib/lib.d.ts","./src/globals.d.ts","./src/hkt.ts","./src/main.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-1383980825-interface SymbolConstructor {\n    (description?: string | number): symbol;\n}\ndeclare var Symbol: SymbolConstructor;\n","affectsGlobalScope":true},"675797797-export interface HKT<T> { }",{"version":"-8082110290-import { HKT } from \"./hkt\";\n\nconst sym = Symbol();\n\ndeclare module \"./hkt\" {\n    interface HKT<T> {\n        [sym]: { a: T }\n    }\n}\n\ntype A = HKT<number>[typeof sym];\nconst x = 10;","signature":"-13155653598-declare const sym: unique symbol;\ndeclare module \"./hkt\" {\n    interface HKT<T> {\n        [sym]: {\n            a: T;\n        };\n    }\n}\nexport {};\n"}],"root":[[2,4]],"options":{"rootDir":"./src"},"fileIdsList":[[3,4]],"referencedMap":[[4,1]],"exportedModulesMap":[[4,1]],"semanticDiagnosticsPerFile":[1,2,3,4]},"version":"FakeTSVersion"}

//// [/src/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../lib/lib.d.ts",
      "./src/globals.d.ts",
      "./src/hkt.ts",
      "./src/main.ts"
    ],
    "fileNamesList": [
      [
        "./src/hkt.ts",
        "./src/main.ts"
      ]
    ],
    "fileInfos": {
      "../lib/lib.d.ts": {
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
    "exportedModulesMap": {
      "./src/main.ts": [
        "./src/hkt.ts",
        "./src/main.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../lib/lib.d.ts",
      "./src/globals.d.ts",
      "./src/hkt.ts",
      "./src/main.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 1397
}

