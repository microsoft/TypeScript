//// [/lib/initial-buildOutput.txt]
/lib/tsc --b /src/tsconfig.c.json --listFiles
/lib/lib.d.ts
/src/a.ts
/lib/lib.d.ts
/src/a.d.ts
/src/b.ts
/lib/lib.d.ts
/src/a.d.ts
/src/b.d.ts
/src/refs/a.d.ts
/src/c.ts
exitCode:: ExitStatus.Success


//// [/src/a.d.ts]
export declare class A {
}


//// [/src/a.js]
"use strict";
exports.__esModule = true;
exports.A = void 0;
var A = /** @class */ (function () {
    function A() {
    }
    return A;
}());
exports.A = A;


//// [/src/b.d.ts]
import { A } from '@ref/a';
export declare const b: A;


//// [/src/b.js]
"use strict";
exports.__esModule = true;
exports.b = void 0;
var a_1 = require("@ref/a");
exports.b = new a_1.A();


//// [/src/c.js]
"use strict";
exports.__esModule = true;
var b_1 = require("./b");
var a_1 = require("@ref/a");
b_1.b;
a_1.X;


//// [/src/tsconfig.a.tsbuildinfo]
{
  "program": {
    "fileInfos": {
      "../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./a.ts": {
        "version": "-8566332115-export class A {}\r\n",
        "signature": "-9529994156-export declare class A {\r\n}\r\n",
        "affectsGlobalScope": false
      }
    },
    "options": {
      "composite": true,
      "listFiles": true,
      "configFilePath": "./tsconfig.a.json"
    },
    "referencedMap": {},
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../lib/lib.d.ts",
      "./a.ts"
    ]
  },
  "version": "FakeTSVersion"
}

//// [/src/tsconfig.b.tsbuildinfo]
{
  "program": {
    "fileInfos": {
      "../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./a.d.ts": {
        "version": "-9529994156-export declare class A {\r\n}\r\n",
        "signature": "-9529994156-export declare class A {\r\n}\r\n",
        "affectsGlobalScope": false
      },
      "./b.ts": {
        "version": "-13104686224-import {A} from '@ref/a';\r\nexport const b = new A();\r\n",
        "signature": "-10067914302-import { A } from '@ref/a';\r\nexport declare const b: A;\r\n",
        "affectsGlobalScope": false
      }
    },
    "options": {
      "composite": true,
      "baseUrl": "./",
      "paths": {
        "@ref/*": [
          "./*"
        ]
      },
      "listFiles": true,
      "configFilePath": "./tsconfig.b.json"
    },
    "referencedMap": {
      "./b.ts": [
        "./a.d.ts"
      ]
    },
    "exportedModulesMap": {
      "./b.ts": [
        "./a.d.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../lib/lib.d.ts",
      "./a.d.ts",
      "./b.ts"
    ]
  },
  "version": "FakeTSVersion"
}

