Input::
//// [/src/tsconfig.json]
{"compilerOptions":{"composite":true,"declaration":true},"files":["a.ts","b.ts"]}



Output::
/lib/tsc --b /src/tsconfig.json
exitCode:: ExitStatus.Success


//// [/src/a.d.ts]
export declare function foo(): void;


//// [/src/a.js]
"use strict";
exports.__esModule = true;
exports.foo = void 0;
function foo() { }
exports.foo = foo;


//// [/src/b.d.ts]
export declare function bar(): void;


//// [/src/b.js]
"use strict";
exports.__esModule = true;
exports.bar = void 0;
function bar() { }
exports.bar = bar;


//// [/src/tsconfig.tsbuildinfo]
{
  "program": {
    "fileInfos": {
      "../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./a.ts": {
        "version": "4646078106-export function foo() { }",
        "signature": "-6972466928-export declare function foo(): void;\r\n",
        "affectsGlobalScope": false
      },
      "./b.ts": {
        "version": "1045484683-export function bar() { }",
        "signature": "-1357953631-export declare function bar(): void;\r\n",
        "affectsGlobalScope": false
      }
    },
    "options": {
      "composite": true,
      "declaration": true,
      "configFilePath": "./tsconfig.json"
    },
    "referencedMap": {},
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../lib/lib.d.ts",
      "./a.ts",
      "./b.ts"
    ]
  },
  "version": "FakeTSVersion"
}

