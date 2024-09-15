currentDirectory:: /home/src/workspaces/project useCaseSensitiveFileNames:: false
Input::
//// [/home/src/workspaces/project/a.ts]
export function foo() { }

//// [/home/src/workspaces/project/b.ts]
export function bar() { }

//// [/home/src/workspaces/project/tsconfig.json]
{
    "compilerOptions": {
        "composite": true,
  "outFile": "../outFile.js",
  "module": "amd"

    },
    "files": [
        "a.ts"
        "b.ts"
    ]
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


/home/src/tslibs/TS/Lib/tsc.js --b
Output::
[96mtsconfig.json[0m:[93m10[0m:[93m9[0m - [91merror[0m[90m TS1005: [0m',' expected.

[7m10[0m         "b.ts"
[7m  [0m [91m        ~~~~~~[0m


Found 1 error.



//// [/home/src/workspaces/outFile.js]
define("a", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.foo = foo;
    function foo() { }
});
define("b", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.bar = bar;
    function bar() { }
});


//// [/home/src/workspaces/outFile.d.ts]
declare module "a" {
    export function foo(): void;
}
declare module "b" {
    export function bar(): void;
}


//// [/home/src/workspaces/outFile.tsbuildinfo]
{"fileNames":["../tslibs/ts/lib/lib.d.ts","./project/a.ts","./project/b.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","4646078106-export function foo() { }","1045484683-export function bar() { }"],"root":[2,3],"options":{"composite":true,"module":2,"outFile":"./outFile.js"},"outSignature":"-5340070911-declare module \"a\" {\n    export function foo(): void;\n}\ndeclare module \"b\" {\n    export function bar(): void;\n}\n","latestChangedDtsFile":"./outFile.d.ts","errors":true,"version":"FakeTSVersion"}

//// [/home/src/workspaces/outFile.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../tslibs/ts/lib/lib.d.ts",
    "./project/a.ts",
    "./project/b.ts"
  ],
  "fileInfos": {
    "../tslibs/ts/lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
    "./project/a.ts": "4646078106-export function foo() { }",
    "./project/b.ts": "1045484683-export function bar() { }"
  },
  "root": [
    [
      2,
      "./project/a.ts"
    ],
    [
      3,
      "./project/b.ts"
    ]
  ],
  "options": {
    "composite": true,
    "module": 2,
    "outFile": "./outFile.js"
  },
  "outSignature": "-5340070911-declare module \"a\" {\n    export function foo(): void;\n}\ndeclare module \"b\" {\n    export function bar(): void;\n}\n",
  "latestChangedDtsFile": "./outFile.d.ts",
  "errors": true,
  "version": "FakeTSVersion",
  "size": 920
}


exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped

Change:: reports syntax errors after change to config file

Input::
//// [/home/src/workspaces/project/tsconfig.json]
{
    "compilerOptions": {
        "composite": true,
        "declaration": true,
  "outFile": "../outFile.js",
  "module": "amd"

    },
    "files": [
        "a.ts"
        "b.ts"
    ]
}


/home/src/tslibs/TS/Lib/tsc.js --b
Output::
[96mtsconfig.json[0m:[93m11[0m:[93m9[0m - [91merror[0m[90m TS1005: [0m',' expected.

[7m11[0m         "b.ts"
[7m  [0m [91m        ~~~~~~[0m


Found 1 error.




exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped

Change:: reports syntax errors after change to ts file

Input::
//// [/home/src/workspaces/project/a.ts]
export function foo() { }export function fooBar() { }


/home/src/tslibs/TS/Lib/tsc.js --b
Output::
[96mtsconfig.json[0m:[93m11[0m:[93m9[0m - [91merror[0m[90m TS1005: [0m',' expected.

[7m11[0m         "b.ts"
[7m  [0m [91m        ~~~~~~[0m


Found 1 error.



//// [/home/src/workspaces/outFile.js]
define("a", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.foo = foo;
    exports.fooBar = fooBar;
    function foo() { }
    function fooBar() { }
});
define("b", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.bar = bar;
    function bar() { }
});


//// [/home/src/workspaces/outFile.d.ts]
declare module "a" {
    export function foo(): void;
    export function fooBar(): void;
}
declare module "b" {
    export function bar(): void;
}


//// [/home/src/workspaces/outFile.tsbuildinfo]
{"fileNames":["../tslibs/ts/lib/lib.d.ts","./project/a.ts","./project/b.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","9819159940-export function foo() { }export function fooBar() { }","1045484683-export function bar() { }"],"root":[2,3],"options":{"composite":true,"declaration":true,"module":2,"outFile":"./outFile.js"},"outSignature":"-12543119676-declare module \"a\" {\n    export function foo(): void;\n    export function fooBar(): void;\n}\ndeclare module \"b\" {\n    export function bar(): void;\n}\n","latestChangedDtsFile":"./outFile.d.ts","errors":true,"version":"FakeTSVersion"}

//// [/home/src/workspaces/outFile.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../tslibs/ts/lib/lib.d.ts",
    "./project/a.ts",
    "./project/b.ts"
  ],
  "fileInfos": {
    "../tslibs/ts/lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
    "./project/a.ts": "9819159940-export function foo() { }export function fooBar() { }",
    "./project/b.ts": "1045484683-export function bar() { }"
  },
  "root": [
    [
      2,
      "./project/a.ts"
    ],
    [
      3,
      "./project/b.ts"
    ]
  ],
  "options": {
    "composite": true,
    "declaration": true,
    "module": 2,
    "outFile": "./outFile.js"
  },
  "outSignature": "-12543119676-declare module \"a\" {\n    export function foo(): void;\n    export function fooBar(): void;\n}\ndeclare module \"b\" {\n    export function bar(): void;\n}\n",
  "latestChangedDtsFile": "./outFile.d.ts",
  "errors": true,
  "version": "FakeTSVersion",
  "size": 1005
}


exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped

Change:: no-change-run

Input::

/home/src/tslibs/TS/Lib/tsc.js --b
Output::
[96mtsconfig.json[0m:[93m11[0m:[93m9[0m - [91merror[0m[90m TS1005: [0m',' expected.

[7m11[0m         "b.ts"
[7m  [0m [91m        ~~~~~~[0m


Found 1 error.




exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped

Change:: builds after fixing config file errors

Input::
//// [/home/src/workspaces/project/tsconfig.json]
{
  "compilerOptions": {
    "composite": true,
    "declaration": true,
    "outFile": "../outFile.js",
    "module": "amd"
  },
  "files": [
    "a.ts",
    "b.ts"
  ]
}


/home/src/tslibs/TS/Lib/tsc.js --b
Output::


//// [/home/src/workspaces/outFile.tsbuildinfo]
{"fileNames":["../tslibs/ts/lib/lib.d.ts","./project/a.ts","./project/b.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","9819159940-export function foo() { }export function fooBar() { }","1045484683-export function bar() { }"],"root":[2,3],"options":{"composite":true,"declaration":true,"module":2,"outFile":"./outFile.js"},"outSignature":"-12543119676-declare module \"a\" {\n    export function foo(): void;\n    export function fooBar(): void;\n}\ndeclare module \"b\" {\n    export function bar(): void;\n}\n","latestChangedDtsFile":"./outFile.d.ts","version":"FakeTSVersion"}

//// [/home/src/workspaces/outFile.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../tslibs/ts/lib/lib.d.ts",
    "./project/a.ts",
    "./project/b.ts"
  ],
  "fileInfos": {
    "../tslibs/ts/lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
    "./project/a.ts": "9819159940-export function foo() { }export function fooBar() { }",
    "./project/b.ts": "1045484683-export function bar() { }"
  },
  "root": [
    [
      2,
      "./project/a.ts"
    ],
    [
      3,
      "./project/b.ts"
    ]
  ],
  "options": {
    "composite": true,
    "declaration": true,
    "module": 2,
    "outFile": "./outFile.js"
  },
  "outSignature": "-12543119676-declare module \"a\" {\n    export function foo(): void;\n    export function fooBar(): void;\n}\ndeclare module \"b\" {\n    export function bar(): void;\n}\n",
  "latestChangedDtsFile": "./outFile.d.ts",
  "version": "FakeTSVersion",
  "size": 991
}


exitCode:: ExitStatus.Success
