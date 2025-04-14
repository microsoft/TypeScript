currentDirectory:: /user/username/projects/myproject useCaseSensitiveFileNames:: false
Input::
//// [/user/username/projects/myproject/packages/B/package.json]
{}

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

//// [/user/username/projects/myproject/packages/A/src/test.ts]
import { foo } from 'b/lib/foo';
import { bar } from 'b/lib/bar/foo';
foo();
bar();


//// [/user/username/projects/myproject/packages/B/src/foo.ts]
export function foo() { }

//// [/user/username/projects/myproject/packages/B/src/bar/foo.ts]
export function bar() { }

//// [/user/username/projects/myproject/node_modules/b] symlink(/user/username/projects/myproject/packages/B)

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


/home/src/tslibs/TS/Lib/tsc.js --w --p /user/username/projects/myproject/packages/A/tsconfig.json
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] Starting compilation in watch mode...

[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/user/username/projects/myproject/packages/A/lib/test.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var foo_1 = require("b/lib/foo");
var foo_2 = require("b/lib/bar/foo");
(0, foo_1.foo)();
(0, foo_2.bar)();


//// [/user/username/projects/myproject/packages/A/lib/test.d.ts]
export {};


//// [/user/username/projects/myproject/packages/A/tsconfig.tsbuildinfo]
{"fileNames":["../../../../../../home/src/tslibs/ts/lib/lib.d.ts","../b/src/foo.ts","../b/src/bar/foo.ts","./src/test.ts"],"fileIdsList":[[2,3]],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},"4646078106-export function foo() { }","1045484683-export function bar() { }",{"version":"14700910833-import { foo } from 'b/lib/foo';\nimport { bar } from 'b/lib/bar/foo';\nfoo();\nbar();\n","signature":"-3531856636-export {};\n"}],"root":[4],"options":{"composite":true,"outDir":"./lib","rootDir":"./src"},"referencedMap":[[4,1]],"latestChangedDtsFile":"./lib/test.d.ts","version":"FakeTSVersion"}

//// [/user/username/projects/myproject/packages/A/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../../../home/src/tslibs/ts/lib/lib.d.ts",
    "../b/src/foo.ts",
    "../b/src/bar/foo.ts",
    "./src/test.ts"
  ],
  "fileIdsList": [
    [
      "../b/src/foo.ts",
      "../b/src/bar/foo.ts"
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
    "../b/src/foo.ts": {
      "version": "4646078106-export function foo() { }",
      "signature": "4646078106-export function foo() { }"
    },
    "../b/src/bar/foo.ts": {
      "version": "1045484683-export function bar() { }",
      "signature": "1045484683-export function bar() { }"
    },
    "./src/test.ts": {
      "original": {
        "version": "14700910833-import { foo } from 'b/lib/foo';\nimport { bar } from 'b/lib/bar/foo';\nfoo();\nbar();\n",
        "signature": "-3531856636-export {};\n"
      },
      "version": "14700910833-import { foo } from 'b/lib/foo';\nimport { bar } from 'b/lib/bar/foo';\nfoo();\nbar();\n",
      "signature": "-3531856636-export {};\n"
    }
  },
  "root": [
    [
      4,
      "./src/test.ts"
    ]
  ],
  "options": {
    "composite": true,
    "outDir": "./lib",
    "rootDir": "./src"
  },
  "referencedMap": {
    "./src/test.ts": [
      "../b/src/foo.ts",
      "../b/src/bar/foo.ts"
    ]
  },
  "latestChangedDtsFile": "./lib/test.d.ts",
  "version": "FakeTSVersion",
  "size": 1036
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
/user/username/projects/myproject/packages/A/src/test.ts: *new*
  {}
/user/username/projects/myproject/packages/A/tsconfig.json: *new*
  {}
/user/username/projects/myproject/packages/B/package.json: *new*
  {}
/user/username/projects/myproject/packages/B/src/bar/foo.ts: *new*
  {}
/user/username/projects/myproject/packages/B/src/foo.ts: *new*
  {}
/user/username/projects/myproject/packages/B/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/user/username/projects/myproject/node_modules/b: *new*
  {}
/user/username/projects/myproject/packages/A/src: *new*
  {}
/user/username/projects/myproject/packages/B/src: *new*
  {}

Program root files: [
  "/user/username/projects/myproject/packages/A/src/test.ts"
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
/user/username/projects/myproject/packages/B/src/foo.ts
/user/username/projects/myproject/packages/B/src/bar/foo.ts
/user/username/projects/myproject/packages/A/src/test.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/packages/B/src/foo.ts
/user/username/projects/myproject/packages/B/src/bar/foo.ts
/user/username/projects/myproject/packages/A/src/test.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/user/username/projects/myproject/packages/b/src/foo.ts (used version)
/user/username/projects/myproject/packages/b/src/bar/foo.ts (used version)
/user/username/projects/myproject/packages/a/src/test.ts (computed .d.ts during emit)

exitCode:: ExitStatus.undefined
