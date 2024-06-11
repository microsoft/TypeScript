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

//// [/src/file1.ts]
export const x = "hello";

//// [/src/file2.ts]
import { random } from "./random";
export const y = "world";


//// [/src/random.d.ts]
export const random = "world";

//// [/src/tsconfig.json]
{
  "compilerOptions": {
    "composite": true
  },
  "include": [
    "file*.ts"
  ]
}



Output::
/lib/tsc --b /src/tsconfig.json -v
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * src/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'src/tsconfig.json' is out of date because output file 'src/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project '/src/tsconfig.json'...

exitCode:: ExitStatus.Success


//// [/src/file1.d.ts]
export declare const x = "hello";


//// [/src/file1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = "hello";


//// [/src/file2.d.ts]
export declare const y = "world";


//// [/src/file2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.y = void 0;
exports.y = "world";


//// [/src/tsconfig.tsbuildinfo]
{"fileNames":["../lib/lib.d.ts","./file1.ts","./random.d.ts","./file2.ts"],"fileIdsList":[[3]],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedFormat":1},{"version":"-10637577098-export const x = \"hello\";","signature":"-6425002032-export declare const x = \"hello\";\n","impliedFormat":1},{"version":"-12516578989-export const random = \"world\";","impliedFormat":1},{"version":"-12123221340-import { random } from \"./random\";\nexport const y = \"world\";\n","signature":"-5502661211-export declare const y = \"world\";\n","impliedFormat":1}],"root":[2,4],"options":{"composite":true},"referencedMap":[[4,1]],"latestChangedDtsFile":"./file2.d.ts","version":"FakeTSVersion"}

//// [/src/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../lib/lib.d.ts",
    "./file1.ts",
    "./random.d.ts",
    "./file2.ts"
  ],
  "fileIdsList": [
    [
      "./random.d.ts"
    ]
  ],
  "fileInfos": {
    "../lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true,
        "impliedFormat": 1
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true,
      "impliedFormat": "commonjs"
    },
    "./file1.ts": {
      "original": {
        "version": "-10637577098-export const x = \"hello\";",
        "signature": "-6425002032-export declare const x = \"hello\";\n",
        "impliedFormat": 1
      },
      "version": "-10637577098-export const x = \"hello\";",
      "signature": "-6425002032-export declare const x = \"hello\";\n",
      "impliedFormat": "commonjs"
    },
    "./random.d.ts": {
      "original": {
        "version": "-12516578989-export const random = \"world\";",
        "impliedFormat": 1
      },
      "version": "-12516578989-export const random = \"world\";",
      "signature": "-12516578989-export const random = \"world\";",
      "impliedFormat": "commonjs"
    },
    "./file2.ts": {
      "original": {
        "version": "-12123221340-import { random } from \"./random\";\nexport const y = \"world\";\n",
        "signature": "-5502661211-export declare const y = \"world\";\n",
        "impliedFormat": 1
      },
      "version": "-12123221340-import { random } from \"./random\";\nexport const y = \"world\";\n",
      "signature": "-5502661211-export declare const y = \"world\";\n",
      "impliedFormat": "commonjs"
    }
  },
  "root": [
    [
      2,
      "./file1.ts"
    ],
    [
      4,
      "./file2.ts"
    ]
  ],
  "options": {
    "composite": true
  },
  "referencedMap": {
    "./file2.ts": [
      "./random.d.ts"
    ]
  },
  "latestChangedDtsFile": "./file2.d.ts",
  "version": "FakeTSVersion",
  "size": 1128
}



Change:: delete file1
Input::
//// [/src/file1.d.ts] unlink
//// [/src/file1.js] unlink
//// [/src/file1.ts] unlink


Output::
/lib/tsc --b /src/tsconfig.json -v
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * src/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'src/tsconfig.json' is out of date because buildinfo file 'src/tsconfig.tsbuildinfo' indicates that file 'src/file1.ts' was root file of compilation but not any more.

[[90mHH:MM:SS AM[0m] Building project '/src/tsconfig.json'...

exitCode:: ExitStatus.Success


//// [/src/tsconfig.tsbuildinfo]
{"fileNames":["../lib/lib.d.ts","./random.d.ts","./file2.ts"],"fileIdsList":[[2]],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedFormat":1},{"version":"-12516578989-export const random = \"world\";","impliedFormat":1},{"version":"-12123221340-import { random } from \"./random\";\nexport const y = \"world\";\n","signature":"-5502661211-export declare const y = \"world\";\n","impliedFormat":1}],"root":[3],"options":{"composite":true},"referencedMap":[[3,1]],"latestChangedDtsFile":"./file2.d.ts","version":"FakeTSVersion"}

//// [/src/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../lib/lib.d.ts",
    "./random.d.ts",
    "./file2.ts"
  ],
  "fileIdsList": [
    [
      "./random.d.ts"
    ]
  ],
  "fileInfos": {
    "../lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true,
        "impliedFormat": 1
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true,
      "impliedFormat": "commonjs"
    },
    "./random.d.ts": {
      "original": {
        "version": "-12516578989-export const random = \"world\";",
        "impliedFormat": 1
      },
      "version": "-12516578989-export const random = \"world\";",
      "signature": "-12516578989-export const random = \"world\";",
      "impliedFormat": "commonjs"
    },
    "./file2.ts": {
      "original": {
        "version": "-12123221340-import { random } from \"./random\";\nexport const y = \"world\";\n",
        "signature": "-5502661211-export declare const y = \"world\";\n",
        "impliedFormat": 1
      },
      "version": "-12123221340-import { random } from \"./random\";\nexport const y = \"world\";\n",
      "signature": "-5502661211-export declare const y = \"world\";\n",
      "impliedFormat": "commonjs"
    }
  },
  "root": [
    [
      3,
      "./file2.ts"
    ]
  ],
  "options": {
    "composite": true
  },
  "referencedMap": {
    "./file2.ts": [
      "./random.d.ts"
    ]
  },
  "latestChangedDtsFile": "./file2.d.ts",
  "version": "FakeTSVersion",
  "size": 976
}

