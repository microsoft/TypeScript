//// [/lib/initial-buildOutput.txt]
/lib/tsc --b /src/tsconfig.c.json --listFiles
/lib/lib.d.ts
/src/a.ts
[96msrc/b.ts[0m:[93m1[0m:[93m17[0m - [91merror[0m[90m TS2307: [0mCannot find module 'a' or its corresponding type declarations.

[7m1[0m import {A} from 'a';
[7m [0m [91m                ~~~[0m

/lib/lib.d.ts
/src/b.ts

Found 1 error.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated


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


//// [/src/b.ts]
import {A} from 'a';
export const b = new A();

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

//// [/src/tsconfig.b.json]
{"compilerOptions":{"composite":true,"moduleResolution":"node"},"files":["b.ts"],"references":[{"path":"tsconfig.a.json"}]}

