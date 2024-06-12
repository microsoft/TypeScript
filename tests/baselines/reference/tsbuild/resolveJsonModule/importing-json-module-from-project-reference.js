currentDirectory:: / useCaseSensitiveFileNames: false
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

//// [/src/main/index.ts]
import { foo } from '../strings/foo.json';
console.log(foo);


//// [/src/main/tsconfig.json]
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

//// [/src/strings/foo.json]
{
  "foo": "bar baz"
}

//// [/src/strings/tsconfig.json]
{
  "extends": "../tsconfig.json",
  "include": [
    "foo.json"
  ],
  "references": []
}

//// [/src/tsconfig.json]
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



Output::
/lib/tsc --b src/tsconfig.json --verbose --explainFiles
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * src/strings/tsconfig.json
    * src/main/tsconfig.json
    * src/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'src/strings/tsconfig.json' is out of date because output file 'src/strings/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project '/src/strings/tsconfig.json'...

lib/lib.d.ts
  Default library for target 'es5'
src/strings/foo.json
  Matched by include pattern 'foo.json' in 'src/strings/tsconfig.json'
[[90mHH:MM:SS AM[0m] Project 'src/main/tsconfig.json' is out of date because output file 'src/main/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project '/src/main/tsconfig.json'...

lib/lib.d.ts
  Default library for target 'es5'
src/strings/foo.json
  Imported via '../strings/foo.json' from file 'src/main/index.ts'
src/main/index.ts
  Matched by include pattern './**/*.ts' in 'src/main/tsconfig.json'
exitCode:: ExitStatus.Success


//// [/src/main/index.d.ts]
export {};


//// [/src/main/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var foo_json_1 = require("../strings/foo.json");
console.log(foo_json_1.foo);


//// [/src/main/tsconfig.tsbuildinfo]
<<<<<<< HEAD
{"program":{"fileNames":["../../lib/lib.d.ts","../strings/foo.json","./index.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedFormat":1},"-6280880055-{\n  \"foo\": \"bar baz\"\n}",{"version":"-6647471184-import { foo } from '../strings/foo.json';\nconsole.log(foo);\n","signature":"-3531856636-export {};\n","impliedFormat":1}],"root":[3],"options":{"composite":true,"esModuleInterop":true,"module":1,"rootDir":"..","strict":true,"target":1},"fileIdsList":[[2]],"referencedMap":[[3,1]],"latestChangedDtsFile":"./index.d.ts"},"version":"FakeTSVersion"}
=======
{"fileNames":["../../lib/lib.d.ts","../strings/foo.json","./index.ts"],"fileIdsList":[[2]],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},"-6280880055-{\n  \"foo\": \"bar baz\"\n}",{"version":"-6647471184-import { foo } from '../strings/foo.json';\nconsole.log(foo);\n","signature":"-3531856636-export {};\n"}],"root":[3],"options":{"composite":true,"esModuleInterop":true,"module":1,"rootDir":"..","strict":true,"target":1},"referencedMap":[[3,1]],"latestChangedDtsFile":"./index.d.ts","version":"FakeTSVersion"}
>>>>>>> c4daafb597 (Merge 1ab44d1ef58360d56e708c6d9f422205d116c199 into 1948e92e3a102b40800fdc731ddf67f5dc8bda82)

//// [/src/main/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "../strings/foo.json",
      "./index.ts"
    ],
    "fileNamesList": [
      [
        "../strings/foo.json"
      ]
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "original": {
          "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
          "affectsGlobalScope": true,
          "impliedFormat": 1
        },
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
<<<<<<< HEAD
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true,
        "impliedFormat": "commonjs"
      },
      "../strings/foo.json": {
        "version": "-6280880055-{\n  \"foo\": \"bar baz\"\n}",
        "signature": "-6280880055-{\n  \"foo\": \"bar baz\"\n}"
      },
      "./index.ts": {
        "original": {
          "version": "-6647471184-import { foo } from '../strings/foo.json';\nconsole.log(foo);\n",
          "signature": "-3531856636-export {};\n",
          "impliedFormat": 1
        },
        "version": "-6647471184-import { foo } from '../strings/foo.json';\nconsole.log(foo);\n",
        "signature": "-3531856636-export {};\n",
        "impliedFormat": "commonjs"
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
    "latestChangedDtsFile": "./index.d.ts"
=======
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
>>>>>>> c4daafb597 (Merge 1ab44d1ef58360d56e708c6d9f422205d116c199 into 1948e92e3a102b40800fdc731ddf67f5dc8bda82)
  },
  "version": "FakeTSVersion",
<<<<<<< HEAD
  "size": 1006
}

//// [/src/strings/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../lib/lib.d.ts","./foo.json"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedFormat":1},"-6280880055-{\n  \"foo\": \"bar baz\"\n}"],"root":[2],"options":{"composite":true,"esModuleInterop":true,"module":1,"rootDir":"..","strict":true,"target":1}},"version":"FakeTSVersion"}
=======
  "size": 958
}

//// [/src/strings/tsconfig.tsbuildinfo]
{"fileNames":["../../lib/lib.d.ts","./foo.json"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},"-6280880055-{\n  \"foo\": \"bar baz\"\n}"],"root":[2],"options":{"composite":true,"esModuleInterop":true,"module":1,"rootDir":"..","strict":true,"target":1},"version":"FakeTSVersion"}
>>>>>>> c4daafb597 (Merge 1ab44d1ef58360d56e708c6d9f422205d116c199 into 1948e92e3a102b40800fdc731ddf67f5dc8bda82)

//// [/src/strings/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "./foo.json"
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "original": {
          "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
          "affectsGlobalScope": true,
          "impliedFormat": 1
        },
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
<<<<<<< HEAD
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true,
        "impliedFormat": "commonjs"
      },
      "./foo.json": {
        "version": "-6280880055-{\n  \"foo\": \"bar baz\"\n}",
        "signature": "-6280880055-{\n  \"foo\": \"bar baz\"\n}"
      }
=======
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
>>>>>>> c4daafb597 (Merge 1ab44d1ef58360d56e708c6d9f422205d116c199 into 1948e92e3a102b40800fdc731ddf67f5dc8bda82)
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
    }
  },
  "version": "FakeTSVersion",
<<<<<<< HEAD
  "size": 755
=======
  "size": 725
>>>>>>> c4daafb597 (Merge 1ab44d1ef58360d56e708c6d9f422205d116c199 into 1948e92e3a102b40800fdc731ddf67f5dc8bda82)
}



Change:: no-change-run
Input::


Output::
/lib/tsc --b src/tsconfig.json --verbose --explainFiles
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * src/strings/tsconfig.json
    * src/main/tsconfig.json
    * src/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'src/strings/tsconfig.json' is up to date because newest input 'src/strings/foo.json' is older than output 'src/strings/tsconfig.tsbuildinfo'

[[90mHH:MM:SS AM[0m] Project 'src/main/tsconfig.json' is up to date because newest input 'src/main/index.ts' is older than output 'src/main/tsconfig.tsbuildinfo'

exitCode:: ExitStatus.Success


