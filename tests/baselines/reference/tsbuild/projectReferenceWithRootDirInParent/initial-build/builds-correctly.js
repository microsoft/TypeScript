//// [/lib/initial-buildOutput.txt]
/lib/tsc --b /src/src/main /src/src/other
exitCode:: ExitStatus.Success


//// [/src/dist/main/a.d.ts]
export {};


//// [/src/dist/main/a.js]
"use strict";
exports.__esModule = true;
var b_1 = require("./b");
var a = b_1.b;


//// [/src/dist/main/b.d.ts]
export declare const b = 0;


//// [/src/dist/main/b.js]
"use strict";
exports.__esModule = true;
exports.b = void 0;
exports.b = 0;


//// [/src/dist/main/tsconfig.tsbuildinfo]
{
  "program": {
    "fileInfos": {
      "../../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "../../src/main/b.ts": {
        "version": "-11678562673-export const b = 0;\r\n",
        "signature": "-3829176033-export declare const b = 0;\r\n",
        "affectsGlobalScope": false
      },
      "../../src/main/a.ts": {
        "version": "-17071184049-import { b } from './b';\r\nconst a = b;",
        "signature": "-4882119183-export {};\r\n",
        "affectsGlobalScope": false
      }
    },
    "options": {
      "composite": true,
      "declaration": true,
      "rootDir": "../../src",
      "outDir": "..",
      "skipDefaultLibCheck": true,
      "configFilePath": "../../src/main/tsconfig.json"
    },
    "referencedMap": {
      "../../src/main/a.ts": [
        "../../src/main/b.ts"
      ]
    },
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../lib/lib.d.ts",
      "../../src/main/a.ts",
      "../../src/main/b.ts"
    ]
  },
  "version": "FakeTSVersion"
}

//// [/src/dist/other/other.d.ts]
export declare const Other = 0;


//// [/src/dist/other/other.js]
"use strict";
exports.__esModule = true;
exports.Other = void 0;
exports.Other = 0;


//// [/src/dist/other/tsconfig.tsbuildinfo]
{
  "program": {
    "fileInfos": {
      "../../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "../../src/other/other.ts": {
        "version": "-2951227185-export const Other = 0;\r\n",
        "signature": "-7996259489-export declare const Other = 0;\r\n",
        "affectsGlobalScope": false
      }
    },
    "options": {
      "composite": true,
      "declaration": true,
      "rootDir": "../../src",
      "outDir": "..",
      "skipDefaultLibCheck": true,
      "configFilePath": "../../src/other/tsconfig.json"
    },
    "referencedMap": {},
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../lib/lib.d.ts",
      "../../src/other/other.ts"
    ]
  },
  "version": "FakeTSVersion"
}

