currentDirectory::/home/src/workspaces/solution
useCaseSensitiveFileNames::true
Input::
//// [/home/src/workspaces/solution/project/index.ts] *new* 
import { x } from "../utils";
//// [/home/src/workspaces/solution/project/tsconfig.json] *new* 
{
    "references": [
        { "path": "../utils" },
    ],
}
//// [/home/src/workspaces/solution/utils/index.ts] *new* 
export const x = 10;
//// [/home/src/workspaces/solution/utils/tsconfig.json] *new* 
{
    "compilerOptions": {
        "composite": true,
        "noEmit": true
    }
}

tsgo --p project
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[96mproject/index.ts[0m:[93m1[0m:[93m19[0m - [91merror[0m[90m TS6305: [0mOutput file '/home/src/workspaces/solution/utils/index.d.ts' has not been built from source file '/home/src/workspaces/solution/utils/index.ts'.

[7m1[0m import { x } from "../utils";
[7m [0m [91m                  ~~~~~~~~~~[0m


Found 1 error in project/index.ts[90m:1[0m

//// [/home/src/tslibs/TS/Lib/lib.d.ts] *Lib*
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
interface SymbolConstructor {
    (desc?: string | number): symbol;
    for(name: string): symbol;
    readonly toStringTag: symbol;
}
declare var Symbol: SymbolConstructor;
interface Symbol {
    readonly [Symbol.toStringTag]: string;
}
declare const console: { log(msg: any): void; };
//// [/home/src/workspaces/solution/project/index.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });


