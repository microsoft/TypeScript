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

//// [/src/project/index.ts]
import { E } from "../utils"; E.A;

//// [/src/project/tsconfig.json]
{
  "compilerOptions": {
    "isolatedModules": true
  },
  "references": [
    {
      "path": "../utils"
    }
  ]
}

//// [/src/utils/index.d.ts]
export declare const enum E { A = 1 }

//// [/src/utils/index.ts]
export const enum E { A = 1 }

//// [/src/utils/tsconfig.json]
{
  "compilerOptions": {
    "composite": true,
    "declaration": true,
    "preserveConstEnums": true
  }
}



Output::
/lib/tsc --p src/project
exitCode:: ExitStatus.Success


//// [/src/project/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../utils");
utils_1.E.A;


