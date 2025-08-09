currentDirectory:: /home/src/workspaces/project useCaseSensitiveFileNames:: false
Input::
//// [/home/src/workspaces/project/file1.ts]
export const x = "hello";

//// [/home/src/workspaces/project/random.d.ts]
export const random = "world";

//// [/home/src/workspaces/project/file2.ts]
import { random } from "./random";
export const y = "world";


//// [/home/src/workspaces/project/tsconfig.json]
{
  "compilerOptions": {
    "composite": true
  },
  "include": [
    "file*.ts"
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


/home/src/tslibs/TS/Lib/tsc.js --b -v
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because output file 'tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/project/tsconfig.json'...



//// [/home/src/workspaces/project/file1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = "hello";


//// [/home/src/workspaces/project/file1.d.ts]
export declare const x = "hello";


//// [/home/src/workspaces/project/file2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.y = void 0;
exports.y = "world";


//// [/home/src/workspaces/project/file2.d.ts]
export declare const y = "world";


//// [/home/src/workspaces/project/tsconfig.tsbuildinfo]
{"fileNames":["../../tslibs/ts/lib/lib.d.ts","./file1.ts","./random.d.ts","./file2.ts"],"fileIdsList":[[3]],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-10637577098-export const x = \"hello\";","signature":"-6425002032-export declare const x = \"hello\";\n"},"-12516578989-export const random = \"world\";",{"version":"-12123221340-import { random } from \"./random\";\nexport const y = \"world\";\n","signature":"-5502661211-export declare const y = \"world\";\n"}],"root":[2,4],"options":{"composite":true},"referencedMap":[[4,1]],"latestChangedDtsFile":"./file2.d.ts","version":"FakeTSVersion"}

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../tslibs/ts/lib/lib.d.ts",
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
    "../../tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "./file1.ts": {
      "original": {
        "version": "-10637577098-export const x = \"hello\";",
        "signature": "-6425002032-export declare const x = \"hello\";\n"
      },
      "version": "-10637577098-export const x = \"hello\";",
      "signature": "-6425002032-export declare const x = \"hello\";\n"
    },
    "./random.d.ts": {
      "version": "-12516578989-export const random = \"world\";",
      "signature": "-12516578989-export const random = \"world\";"
    },
    "./file2.ts": {
      "original": {
        "version": "-12123221340-import { random } from \"./random\";\nexport const y = \"world\";\n",
        "signature": "-5502661211-export declare const y = \"world\";\n"
      },
      "version": "-12123221340-import { random } from \"./random\";\nexport const y = \"world\";\n",
      "signature": "-5502661211-export declare const y = \"world\";\n"
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
  "size": 1057
}


exitCode:: ExitStatus.Success

Change:: delete file1

Input::
//// [/home/src/workspaces/project/file1.ts] deleted
//// [/home/src/workspaces/project/file1.js] deleted
//// [/home/src/workspaces/project/file1.d.ts] deleted

/home/src/tslibs/TS/Lib/tsc.js --b -v
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because buildinfo file 'tsconfig.tsbuildinfo' indicates that file 'file1.ts' was root file of compilation but not any more.

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/project/tsconfig.json'...



//// [/home/src/workspaces/project/tsconfig.tsbuildinfo]
{"fileNames":["../../tslibs/ts/lib/lib.d.ts","./random.d.ts","./file2.ts"],"fileIdsList":[[2]],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},"-12516578989-export const random = \"world\";",{"version":"-12123221340-import { random } from \"./random\";\nexport const y = \"world\";\n","signature":"-5502661211-export declare const y = \"world\";\n"}],"root":[3],"options":{"composite":true},"referencedMap":[[3,1]],"latestChangedDtsFile":"./file2.d.ts","version":"FakeTSVersion"}

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../tslibs/ts/lib/lib.d.ts",
    "./random.d.ts",
    "./file2.ts"
  ],
  "fileIdsList": [
    [
      "./random.d.ts"
    ]
  ],
  "fileInfos": {
    "../../tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "./random.d.ts": {
      "version": "-12516578989-export const random = \"world\";",
      "signature": "-12516578989-export const random = \"world\";"
    },
    "./file2.ts": {
      "original": {
        "version": "-12123221340-import { random } from \"./random\";\nexport const y = \"world\";\n",
        "signature": "-5502661211-export declare const y = \"world\";\n"
      },
      "version": "-12123221340-import { random } from \"./random\";\nexport const y = \"world\";\n",
      "signature": "-5502661211-export declare const y = \"world\";\n"
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
  "size": 923
}


exitCode:: ExitStatus.Success
