currentDirectory:: /home/src/workspaces/solution useCaseSensitiveFileNames:: false
Input::
//// [/home/src/workspaces/solution/src/utils/index.ts]
export const x = 10;

//// [/home/src/workspaces/solution/src/utils/tsconfig.json]
{
  "compilerOptions": {
    "composite": true,
    "noEmit": true
  }
}

//// [/home/src/workspaces/solution/project/index.ts]
import { x } from "../utils";

//// [/home/src/workspaces/solution/project/tsconfig.json]
{
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
[96mproject/tsconfig.json[0m:[93m3[0m:[93m5[0m - [91merror[0m[90m TS6053: [0mFile '/home/src/workspaces/solution/utils' not found.

[7m3[0m     {
[7m [0m [91m    ~[0m
[7m4[0m       "path": "../utils"
[7m [0m [91m~~~~~~~~~~~~~~~~~~~~~~~~[0m
[7m5[0m     }
[7m [0m [91m~~~~~[0m


Found 1 error in project/tsconfig.json[90m:3[0m



//// [/home/src/workspaces/solution/project/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });



exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated
