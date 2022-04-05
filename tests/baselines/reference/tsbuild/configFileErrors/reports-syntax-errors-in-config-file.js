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

//// [/src/a.ts]
export function foo() { }

//// [/src/b.ts]
export function bar() { }

//// [/src/tsconfig.json]
{
    "compilerOptions": {
        "composite": true,
    },
    "files": [
        "a.ts"
        "b.ts"
    ]
}



Output::
/lib/tsc --b /src/tsconfig.json
[96msrc/tsconfig.json[0m:[93m7[0m:[93m9[0m - [91merror[0m[90m TS1005: [0m',' expected.

[7m7[0m         "b.ts"
[7m [0m [91m        ~~~~~~[0m


Found 1 error.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped




Change:: reports syntax errors after change to config file
Input::
//// [/src/tsconfig.json]
{
    "compilerOptions": {
        "composite": true,
        "declaration": true,
    },
    "files": [
        "a.ts"
        "b.ts"
    ]
}



Output::
/lib/tsc --b /src/tsconfig.json
[96msrc/tsconfig.json[0m:[93m8[0m:[93m9[0m - [91merror[0m[90m TS1005: [0m',' expected.

[7m8[0m         "b.ts"
[7m [0m [91m        ~~~~~~[0m


Found 1 error.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped




Change:: reports syntax errors after change to ts file
Input::
//// [/src/a.ts]
export function foo() { }export function fooBar() { }



Output::
/lib/tsc --b /src/tsconfig.json
[96msrc/tsconfig.json[0m:[93m8[0m:[93m9[0m - [91merror[0m[90m TS1005: [0m',' expected.

[7m8[0m         "b.ts"
[7m [0m [91m        ~~~~~~[0m


Found 1 error.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped




Change:: no-change-run
Input::


Output::
/lib/tsc --b /src/tsconfig.json
[96msrc/tsconfig.json[0m:[93m8[0m:[93m9[0m - [91merror[0m[90m TS1005: [0m',' expected.

[7m8[0m         "b.ts"
[7m [0m [91m        ~~~~~~[0m


Found 1 error.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped




Change:: builds after fixing config file errors
Input::
//// [/src/tsconfig.json]
{"compilerOptions":{"composite":true,"declaration":true},"files":["a.ts","b.ts"]}



Output::
/lib/tsc --b /src/tsconfig.json
exitCode:: ExitStatus.Success


//// [/src/a.d.ts]
export declare function foo(): void;
export declare function fooBar(): void;


//// [/src/a.js]
"use strict";
exports.__esModule = true;
exports.fooBar = exports.foo = void 0;
function foo() { }
exports.foo = foo;
function fooBar() { }
exports.fooBar = fooBar;


//// [/src/b.d.ts]
export declare function bar(): void;


//// [/src/b.js]
"use strict";
exports.__esModule = true;
exports.bar = void 0;
function bar() { }
exports.bar = bar;


//// [/src/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../lib/lib.d.ts","./a.ts","./b.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},"9819159940-export function foo() { }export function fooBar() { }","1045484683-export function bar() { }"],"options":{"composite":true,"declaration":true},"referencedMap":[],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,2,3]},"version":"FakeTSVersion"}

//// [/src/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../lib/lib.d.ts",
      "./a.ts",
      "./b.ts"
    ],
    "fileInfos": {
      "../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./a.ts": {
        "version": "9819159940-export function foo() { }export function fooBar() { }",
        "signature": "9819159940-export function foo() { }export function fooBar() { }"
      },
      "./b.ts": {
        "version": "1045484683-export function bar() { }",
        "signature": "1045484683-export function bar() { }"
      }
    },
    "options": {
      "composite": true,
      "declaration": true
    },
    "referencedMap": {},
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../lib/lib.d.ts",
      "./a.ts",
      "./b.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 816
}

