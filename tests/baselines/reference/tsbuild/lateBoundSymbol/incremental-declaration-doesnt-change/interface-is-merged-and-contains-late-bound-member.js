//// [/lib/incremental-declaration-doesnt-changeOutput.txt]
/lib/tsc --b /src/tsconfig.json --verbose
[[90m12:04:00 AM[0m] Projects in this build: 
    * src/tsconfig.json

[[90m12:04:00 AM[0m] Project 'src/tsconfig.json' is out of date because oldest output 'src/src/hkt.js' is older than newest input 'src/src/main.ts'

[[90m12:04:00 AM[0m] Building project '/src/tsconfig.json'...

[[90m12:04:00 AM[0m] Updating unchanged output timestamps of project '/src/tsconfig.json'...

exitCode:: ExitStatus.Success


//// [/src/src/main.js]
"use strict";
exports.__esModule = true;
var sym = Symbol();


//// [/src/src/main.ts]
import { HKT } from "./hkt";

const sym = Symbol();

declare module "./hkt" {
  interface HKT<T> {
    [sym]: { a: T }
  }
}

type A = HKT<number>[typeof sym];

//// [/src/tsconfig.tsbuildinfo]
{
  "program": {
    "fileInfos": {
      "../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./src/globals.d.ts": {
        "version": "-1994196675-interface SymbolConstructor {\n    (description?: string | number): symbol;\n}\ndeclare var Symbol: SymbolConstructor;",
        "signature": "-1994196675-interface SymbolConstructor {\n    (description?: string | number): symbol;\n}\ndeclare var Symbol: SymbolConstructor;",
        "affectsGlobalScope": true
      },
      "./src/hkt.ts": {
        "version": "675797797-export interface HKT<T> { }",
        "signature": "2373810515-export interface HKT<T> {\r\n}\r\n",
        "affectsGlobalScope": false
      },
      "./src/main.ts": {
        "version": "-27494779858-import { HKT } from \"./hkt\";\r\n\r\nconst sym = Symbol();\r\n\r\ndeclare module \"./hkt\" {\r\n  interface HKT<T> {\r\n    [sym]: { a: T }\r\n  }\r\n}\r\n\r\ntype A = HKT<number>[typeof sym];",
        "signature": "-7779857705-declare const sym: unique symbol;\r\ndeclare module \"./hkt\" {\r\n    interface HKT<T> {\r\n        [sym]: {\r\n            a: T;\r\n        };\r\n    }\r\n}\r\nexport {};\r\n",
        "affectsGlobalScope": false
      }
    },
    "options": {
      "rootDir": "./src",
      "incremental": true,
      "configFilePath": "./tsconfig.json"
    },
    "referencedMap": {
      "./src/main.ts": [
        "./src/hkt.ts"
      ]
    },
    "exportedModulesMap": {
      "./src/main.ts": [
        "./src/hkt.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../lib/lib.d.ts",
      "./src/globals.d.ts",
      "./src/hkt.ts",
      "./src/main.ts"
    ]
  },
  "version": "FakeTSVersion"
}

