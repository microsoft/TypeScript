//// [/lib/incremental-declaration-doesnt-changeOutput.txt]
/lib/tsc --b /src/tsconfig.json
exitCode:: ExitStatus.Success


//// [/src/a.d.ts]
export declare function foo(): void;
export declare function fooBar(): void;


//// [/src/a.js]
"use strict";
exports.__esModule = true;
function foo() { }
exports.foo = foo;
function fooBar() { }
exports.fooBar = fooBar;


//// [/src/a.ts]
export function foo() { }export function fooBar() { }

//// [/src/tsconfig.tsbuildinfo]
{
  "program": {
    "fileInfos": {
      "../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
      },
      "./a.ts": {
        "version": "9819159940-export function foo() { }export function fooBar() { }",
        "signature": "-827728784-export declare function foo(): void;\r\nexport declare function fooBar(): void;\r\n"
      },
      "./b.ts": {
        "version": "1045484683-export function bar() { }",
        "signature": "-1357953631-export declare function bar(): void;\r\n"
      }
    },
    "options": {
      "composite": true,
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

