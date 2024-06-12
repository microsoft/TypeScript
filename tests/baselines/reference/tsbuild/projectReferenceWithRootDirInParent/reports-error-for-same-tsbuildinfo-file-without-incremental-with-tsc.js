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

//// [/src/src/main/a.ts]
import { b } from './b';
const a = b;


//// [/src/src/main/b.ts]
export const b = 0;


//// [/src/src/main/tsconfig.json]
{
  "compilerOptions": {
    "outDir": "../../dist/"
  },
  "references": [
    {
      "path": "../other"
    }
  ]
}

//// [/src/src/other/other.ts]
export const Other = 0;


//// [/src/src/other/tsconfig.json]
{
  "compilerOptions": {
    "composite": true,
    "outDir": "../../dist/"
  }
}

//// [/src/tsconfig.base.json]
{
  "compilerOptions": {
    "composite": true,
    "declaration": true,
    "rootDir": "./src/",
    "outDir": "./dist/",
    "skipDefaultLibCheck": true
  },
  "exclude": [
    "node_modules"
  ]
}



Output::
/lib/tsc --b /src/src/other --verbose
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * src/src/other/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'src/src/other/tsconfig.json' is out of date because output file 'src/dist/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project '/src/src/other/tsconfig.json'...

exitCode:: ExitStatus.Success


//// [/src/dist/other.d.ts]
export declare const Other = 0;


//// [/src/dist/other.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Other = void 0;
exports.Other = 0;


//// [/src/dist/tsconfig.tsbuildinfo]
{"fileNames":["../../lib/lib.d.ts","../src/other/other.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-4254247902-export const Other = 0;\n","signature":"-10003600206-export declare const Other = 0;\n"}],"root":[2],"options":{"composite":true,"outDir":"./"},"latestChangedDtsFile":"./other.d.ts","version":"FakeTSVersion"}

//// [/src/dist/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../lib/lib.d.ts",
    "../src/other/other.ts"
  ],
  "fileInfos": {
    "../../lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "../src/other/other.ts": {
      "original": {
        "version": "-4254247902-export const Other = 0;\n",
        "signature": "-10003600206-export declare const Other = 0;\n"
      },
      "version": "-4254247902-export const Other = 0;\n",
      "signature": "-10003600206-export declare const Other = 0;\n"
    }
  },
  "root": [
    [
      2,
      "../src/other/other.ts"
    ]
  ],
  "options": {
    "composite": true,
    "outDir": "./"
  },
  "latestChangedDtsFile": "./other.d.ts",
  "version": "FakeTSVersion",
  "size": 784
}



Change:: Running tsc on main
Input::


Output::
/lib/tsc -p /src/src/main
exitCode:: ExitStatus.Success


//// [/src/dist/a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var b_1 = require("./b");
var a = b_1.b;


//// [/src/dist/b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.b = void 0;
exports.b = 0;


