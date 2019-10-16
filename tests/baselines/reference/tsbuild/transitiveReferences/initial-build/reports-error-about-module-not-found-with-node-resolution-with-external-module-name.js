//// [/lib/initial-buildOutput.txt]
/lib/tsc --b /src/tsconfig.c.json --listFiles
/lib/lib.d.ts
/src/a.ts
src/b.ts(1,17): error TS2307: Cannot find module 'a'.
/lib/lib.d.ts
/src/b.ts
exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated


//// [/src/a.d.ts]
export declare class A {
}


//// [/src/a.js]
"use strict";
exports.__esModule = true;
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
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
      },
      "./a.ts": {
        "version": "-8566332115-export class A {}\r\n",
        "signature": "-9529994156-export declare class A {\r\n}\r\n"
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

