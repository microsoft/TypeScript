currentDirectory:: /user/username/projects/myproject useCaseSensitiveFileNames:: false
Input::
//// [/user/username/projects/myproject/packages/B/package.json]
{
  "main": "lib/index.js",
  "types": "lib/index.d.ts"
}

//// [/user/username/projects/myproject/packages/A/tsconfig.json]
{
  "compilerOptions": {
    "outDir": "lib",
    "rootDir": "src",
    "composite": true,
    "preserveSymlinks": true
  },
  "include": [
    "src"
  ],
  "references": [
    {
      "path": "../B"
    }
  ]
}

//// [/user/username/projects/myproject/packages/B/tsconfig.json]
{
  "compilerOptions": {
    "outDir": "lib",
    "rootDir": "src",
    "composite": true,
    "preserveSymlinks": true
  },
  "include": [
    "src"
  ]
}

//// [/user/username/projects/myproject/packages/A/src/index.ts]
import { foo } from '@issue/b';
import { bar } from '@issue/b/lib/bar';
foo();
bar();


//// [/user/username/projects/myproject/packages/B/src/index.ts]
export function foo() { }

//// [/user/username/projects/myproject/packages/B/src/bar.ts]
export function bar() { }

//// [/user/username/projects/myproject/node_modules/@issue/b] symlink(/user/username/projects/myproject/packages/B)

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

//// [/user/username/projects/myproject/packages/B/lib/bar.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bar = bar;
function bar() { }


//// [/user/username/projects/myproject/packages/B/lib/bar.d.ts]
export declare function bar(): void;


//// [/user/username/projects/myproject/packages/B/lib/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.foo = foo;
function foo() { }


//// [/user/username/projects/myproject/packages/B/lib/index.d.ts]
export declare function foo(): void;


//// [/user/username/projects/myproject/packages/B/tsconfig.tsbuildinfo]
{"fileNames":["../../../../../../home/src/tslibs/ts/lib/lib.d.ts","./src/bar.ts","./src/index.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"1045484683-export function bar() { }","signature":"-2904461644-export declare function bar(): void;\n"},{"version":"4646078106-export function foo() { }","signature":"-5677608893-export declare function foo(): void;\n"}],"root":[2,3],"options":{"composite":true,"outDir":"./lib","rootDir":"./src"},"latestChangedDtsFile":"./lib/index.d.ts","version":"FakeTSVersion"}

//// [/user/username/projects/myproject/packages/B/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../../../home/src/tslibs/ts/lib/lib.d.ts",
    "./src/bar.ts",
    "./src/index.ts"
  ],
  "fileInfos": {
    "../../../../../../home/src/tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "./src/bar.ts": {
      "original": {
        "version": "1045484683-export function bar() { }",
        "signature": "-2904461644-export declare function bar(): void;\n"
      },
      "version": "1045484683-export function bar() { }",
      "signature": "-2904461644-export declare function bar(): void;\n"
    },
    "./src/index.ts": {
      "original": {
        "version": "4646078106-export function foo() { }",
        "signature": "-5677608893-export declare function foo(): void;\n"
      },
      "version": "4646078106-export function foo() { }",
      "signature": "-5677608893-export declare function foo(): void;\n"
    }
  },
  "root": [
    [
      2,
      "./src/bar.ts"
    ],
    [
      3,
      "./src/index.ts"
    ]
  ],
  "options": {
    "composite": true,
    "outDir": "./lib",
    "rootDir": "./src"
  },
  "latestChangedDtsFile": "./lib/index.d.ts",
  "version": "FakeTSVersion",
  "size": 969
}

//// [/user/username/projects/myproject/packages/A/lib/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var b_1 = require("@issue/b");
var bar_1 = require("@issue/b/lib/bar");
(0, b_1.foo)();
(0, bar_1.bar)();


//// [/user/username/projects/myproject/packages/A/lib/index.d.ts]
export {};


//// [/user/username/projects/myproject/packages/A/tsconfig.tsbuildinfo]
{"fileNames":["../../../../../../home/src/tslibs/ts/lib/lib.d.ts","../../node_modules/@issue/b/lib/index.d.ts","../../node_modules/@issue/b/lib/bar.d.ts","./src/index.ts"],"fileIdsList":[[2,3]],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-5677608893-export declare function foo(): void;\n","impliedFormat":1},{"version":"-2904461644-export declare function bar(): void;\n","impliedFormat":1},{"version":"8545527381-import { foo } from '@issue/b';\nimport { bar } from '@issue/b/lib/bar';\nfoo();\nbar();\n","signature":"-3531856636-export {};\n"}],"root":[4],"options":{"composite":true,"outDir":"./lib","rootDir":"./src"},"referencedMap":[[4,1]],"latestChangedDtsFile":"./lib/index.d.ts","version":"FakeTSVersion"}

//// [/user/username/projects/myproject/packages/A/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../../../home/src/tslibs/ts/lib/lib.d.ts",
    "../../node_modules/@issue/b/lib/index.d.ts",
    "../../node_modules/@issue/b/lib/bar.d.ts",
    "./src/index.ts"
  ],
  "fileIdsList": [
    [
      "../../node_modules/@issue/b/lib/index.d.ts",
      "../../node_modules/@issue/b/lib/bar.d.ts"
    ]
  ],
  "fileInfos": {
    "../../../../../../home/src/tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "../../node_modules/@issue/b/lib/index.d.ts": {
      "original": {
        "version": "-5677608893-export declare function foo(): void;\n",
        "impliedFormat": 1
      },
      "version": "-5677608893-export declare function foo(): void;\n",
      "signature": "-5677608893-export declare function foo(): void;\n",
      "impliedFormat": "commonjs"
    },
    "../../node_modules/@issue/b/lib/bar.d.ts": {
      "original": {
        "version": "-2904461644-export declare function bar(): void;\n",
        "impliedFormat": 1
      },
      "version": "-2904461644-export declare function bar(): void;\n",
      "signature": "-2904461644-export declare function bar(): void;\n",
      "impliedFormat": "commonjs"
    },
    "./src/index.ts": {
      "original": {
        "version": "8545527381-import { foo } from '@issue/b';\nimport { bar } from '@issue/b/lib/bar';\nfoo();\nbar();\n",
        "signature": "-3531856636-export {};\n"
      },
      "version": "8545527381-import { foo } from '@issue/b';\nimport { bar } from '@issue/b/lib/bar';\nfoo();\nbar();\n",
      "signature": "-3531856636-export {};\n"
    }
  },
  "root": [
    [
      4,
      "./src/index.ts"
    ]
  ],
  "options": {
    "composite": true,
    "outDir": "./lib",
    "rootDir": "./src"
  },
  "referencedMap": {
    "./src/index.ts": [
      "../../node_modules/@issue/b/lib/index.d.ts",
      "../../node_modules/@issue/b/lib/bar.d.ts"
    ]
  },
  "latestChangedDtsFile": "./lib/index.d.ts",
  "version": "FakeTSVersion",
  "size": 1175
}


/home/src/tslibs/TS/Lib/tsc.js --w --p /user/username/projects/myproject/packages/A/tsconfig.json
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] Starting compilation in watch mode...

[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/user/username/projects/myproject/packages/A/lib/index.js] file written with same contents
//// [/user/username/projects/myproject/packages/A/tsconfig.tsbuildinfo]
{"fileNames":["../../../../../../home/src/tslibs/ts/lib/lib.d.ts","../b/src/index.ts","../b/src/bar.ts","./src/index.ts"],"fileIdsList":[[2,3]],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},"4646078106-export function foo() { }","1045484683-export function bar() { }",{"version":"8545527381-import { foo } from '@issue/b';\nimport { bar } from '@issue/b/lib/bar';\nfoo();\nbar();\n","signature":"-3531856636-export {};\n"}],"root":[4],"options":{"composite":true,"outDir":"./lib","rootDir":"./src"},"referencedMap":[[4,1]],"latestChangedDtsFile":"./lib/index.d.ts","version":"FakeTSVersion"}

//// [/user/username/projects/myproject/packages/A/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../../../home/src/tslibs/ts/lib/lib.d.ts",
    "../b/src/index.ts",
    "../b/src/bar.ts",
    "./src/index.ts"
  ],
  "fileIdsList": [
    [
      "../b/src/index.ts",
      "../b/src/bar.ts"
    ]
  ],
  "fileInfos": {
    "../../../../../../home/src/tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "../b/src/index.ts": {
      "version": "4646078106-export function foo() { }",
      "signature": "4646078106-export function foo() { }"
    },
    "../b/src/bar.ts": {
      "version": "1045484683-export function bar() { }",
      "signature": "1045484683-export function bar() { }"
    },
    "./src/index.ts": {
      "original": {
        "version": "8545527381-import { foo } from '@issue/b';\nimport { bar } from '@issue/b/lib/bar';\nfoo();\nbar();\n",
        "signature": "-3531856636-export {};\n"
      },
      "version": "8545527381-import { foo } from '@issue/b';\nimport { bar } from '@issue/b/lib/bar';\nfoo();\nbar();\n",
      "signature": "-3531856636-export {};\n"
    }
  },
  "root": [
    [
      4,
      "./src/index.ts"
    ]
  ],
  "options": {
    "composite": true,
    "outDir": "./lib",
    "rootDir": "./src"
  },
  "referencedMap": {
    "./src/index.ts": [
      "../b/src/index.ts",
      "../b/src/bar.ts"
    ]
  },
  "latestChangedDtsFile": "./lib/index.d.ts",
  "version": "FakeTSVersion",
  "size": 1037
}


PolledWatches::
/user/username/projects/myproject/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/myproject/packages/A/node_modules: *new*
  {"pollingInterval":500}
/user/username/projects/myproject/packages/A/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/myproject/packages/node_modules: *new*
  {"pollingInterval":500}
/user/username/projects/myproject/packages/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts: *new*
  {}
/user/username/projects/myproject/packages/A/src/index.ts: *new*
  {}
/user/username/projects/myproject/packages/A/tsconfig.json: *new*
  {}
/user/username/projects/myproject/packages/B/package.json: *new*
  {}
/user/username/projects/myproject/packages/B/src/bar.ts: *new*
  {}
/user/username/projects/myproject/packages/B/src/index.ts: *new*
  {}
/user/username/projects/myproject/packages/B/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/user/username/projects/myproject/node_modules: *new*
  {}
/user/username/projects/myproject/node_modules/@issue/b: *new*
  {}
/user/username/projects/myproject/packages/A/src: *new*
  {}
/user/username/projects/myproject/packages/B/src: *new*
  {}

Program root files: [
  "/user/username/projects/myproject/packages/A/src/index.ts"
]
Program options: {
  "outDir": "/user/username/projects/myproject/packages/A/lib",
  "rootDir": "/user/username/projects/myproject/packages/A/src",
  "composite": true,
  "preserveSymlinks": true,
  "configFilePath": "/user/username/projects/myproject/packages/A/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/packages/B/src/index.ts
/user/username/projects/myproject/packages/B/src/bar.ts
/user/username/projects/myproject/packages/A/src/index.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/myproject/packages/B/src/index.ts
/user/username/projects/myproject/packages/B/src/bar.ts
/user/username/projects/myproject/packages/A/src/index.ts

Shape signatures in builder refreshed for::
/user/username/projects/myproject/packages/b/src/index.ts (used version)
/user/username/projects/myproject/packages/a/src/index.ts (computed .d.ts)
/user/username/projects/myproject/packages/b/src/bar.ts (used version)

exitCode:: ExitStatus.undefined
