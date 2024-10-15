currentDirectory:: /home/src/workspaces/solution useCaseSensitiveFileNames:: false
Input::
//// [/home/src/workspaces/solution/utils/index.ts]
export const enum E { A = 1 }

//// [/home/src/workspaces/solution/utils/index.d.ts]
export declare const enum E { A = 1 }

//// [/home/src/workspaces/solution/utils/tsconfig.json]
{
  "compilerOptions": {
    "composite": true,
    "declaration": true,
    "preserveConstEnums": true
  }
}

//// [/home/src/workspaces/solution/project/index.ts]
import { E } from "../utils"; E.A;

//// [/home/src/workspaces/solution/project/tsconfig.json]
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


/home/src/tslibs/TS/Lib/tsc.js --p project
Output::


//// [/home/src/workspaces/solution/project/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../utils");
utils_1.E.A;



exitCode:: ExitStatus.Success
