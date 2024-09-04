currentDirectory:: /home/src/workspaces/solution useCaseSensitiveFileNames:: false
Input::
//// [/home/src/workspaces/solution/project/strings/foo.json]
{
  "foo": "bar baz"
}

//// [/home/src/workspaces/solution/project/strings/tsconfig.json]
{
  "extends": "../tsconfig.json",
  "include": [
    "foo.json"
  ],
  "references": []
}

//// [/home/src/workspaces/solution/project/main/index.ts]
import { foo } from '../strings/foo.json';
console.log(foo);


//// [/home/src/workspaces/solution/project/main/tsconfig.json]
{
  "extends": "../tsconfig.json",
  "include": [
    "./**/*.ts"
  ],
  "references": [
    {
      "path": "../strings/tsconfig.json"
    }
  ]
}

//// [/home/src/workspaces/solution/project/tsconfig.json]
{
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs",
    "rootDir": "./",
    "composite": true,
    "resolveJsonModule": true,
    "strict": true,
    "esModuleInterop": true
  },
  "references": [
    {
      "path": "./strings/tsconfig.json"
    },
    {
      "path": "./main/tsconfig.json"
    }
  ],
  "files": []
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


/home/src/tslibs/TS/Lib/tsc.js --b project --verbose --explainFiles
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * project/strings/tsconfig.json
    * project/main/tsconfig.json
    * project/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'project/strings/tsconfig.json' is out of date because output file 'project/strings/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/solution/project/strings/tsconfig.json'...

../../tslibs/TS/Lib/lib.d.ts
  Default library for target 'es5'
project/strings/foo.json
  Matched by include pattern 'foo.json' in 'project/strings/tsconfig.json'
[[90mHH:MM:SS AM[0m] Project 'project/main/tsconfig.json' is out of date because output file 'project/main/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/solution/project/main/tsconfig.json'...

../../tslibs/TS/Lib/lib.d.ts
  Default library for target 'es5'
project/strings/foo.json
  Imported via '../strings/foo.json' from file 'project/main/index.ts'
project/main/index.ts
  Matched by include pattern './**/*.ts' in 'project/main/tsconfig.json'


//// [/home/src/workspaces/solution/project/strings/tsconfig.tsbuildinfo]
{"fileNames":["../../../../tslibs/ts/lib/lib.d.ts","./foo.json"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},"-6280880055-{\n  \"foo\": \"bar baz\"\n}"],"root":[2],"options":{"composite":true,"esModuleInterop":true,"module":1,"rootDir":"..","strict":true,"target":1},"version":"FakeTSVersion"}

//// [/home/src/workspaces/solution/project/strings/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../tslibs/ts/lib/lib.d.ts",
    "./foo.json"
  ],
  "fileInfos": {
    "../../../../tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "./foo.json": {
      "version": "-6280880055-{\n  \"foo\": \"bar baz\"\n}",
      "signature": "-6280880055-{\n  \"foo\": \"bar baz\"\n}"
    }
  },
  "root": [
    [
      2,
      "./foo.json"
    ]
  ],
  "options": {
    "composite": true,
    "esModuleInterop": true,
    "module": 1,
    "rootDir": "..",
    "strict": true,
    "target": 1
  },
  "version": "FakeTSVersion",
  "size": 741
}

//// [/home/src/workspaces/solution/project/main/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var foo_json_1 = require("../strings/foo.json");
console.log(foo_json_1.foo);


//// [/home/src/workspaces/solution/project/main/index.d.ts]
export {};


//// [/home/src/workspaces/solution/project/main/tsconfig.tsbuildinfo]
{"fileNames":["../../../../tslibs/ts/lib/lib.d.ts","../strings/foo.json","./index.ts"],"fileIdsList":[[2]],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},"-6280880055-{\n  \"foo\": \"bar baz\"\n}",{"version":"-6647471184-import { foo } from '../strings/foo.json';\nconsole.log(foo);\n","signature":"-3531856636-export {};\n"}],"root":[3],"options":{"composite":true,"esModuleInterop":true,"module":1,"rootDir":"..","strict":true,"target":1},"referencedMap":[[3,1]],"latestChangedDtsFile":"./index.d.ts","version":"FakeTSVersion"}

//// [/home/src/workspaces/solution/project/main/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../tslibs/ts/lib/lib.d.ts",
    "../strings/foo.json",
    "./index.ts"
  ],
  "fileIdsList": [
    [
      "../strings/foo.json"
    ]
  ],
  "fileInfos": {
    "../../../../tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "../strings/foo.json": {
      "version": "-6280880055-{\n  \"foo\": \"bar baz\"\n}",
      "signature": "-6280880055-{\n  \"foo\": \"bar baz\"\n}"
    },
    "./index.ts": {
      "original": {
        "version": "-6647471184-import { foo } from '../strings/foo.json';\nconsole.log(foo);\n",
        "signature": "-3531856636-export {};\n"
      },
      "version": "-6647471184-import { foo } from '../strings/foo.json';\nconsole.log(foo);\n",
      "signature": "-3531856636-export {};\n"
    }
  },
  "root": [
    [
      3,
      "./index.ts"
    ]
  ],
  "options": {
    "composite": true,
    "esModuleInterop": true,
    "module": 1,
    "rootDir": "..",
    "strict": true,
    "target": 1
  },
  "referencedMap": {
    "./index.ts": [
      "../strings/foo.json"
    ]
  },
  "latestChangedDtsFile": "./index.d.ts",
  "version": "FakeTSVersion",
  "size": 974
}


exitCode:: ExitStatus.Success

Change:: no-change-run

Input::

/home/src/tslibs/TS/Lib/tsc.js --b project --verbose --explainFiles
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * project/strings/tsconfig.json
    * project/main/tsconfig.json
    * project/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'project/strings/tsconfig.json' is up to date because newest input 'project/strings/foo.json' is older than output 'project/strings/tsconfig.tsbuildinfo'

[[90mHH:MM:SS AM[0m] Project 'project/main/tsconfig.json' is up to date because newest input 'project/main/index.ts' is older than output 'project/main/tsconfig.tsbuildinfo'




exitCode:: ExitStatus.Success
