currentDirectory::/home/src/workspaces/solution
useCaseSensitiveFileNames::true
Input::
//// [/home/src/workspaces/solution/project/index.ts] *new* 
export const x = 10;
//// [/home/src/workspaces/solution/project/tsconfig.json] *new* 
{
    "references": [
        { "path": "../utils" },
    ],
}

tsgo --p project
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[96mproject/tsconfig.json[0m:[93m3[0m:[93m9[0m - [91merror[0m[90m TS6053: [0mFile '/home/src/workspaces/solution/utils' not found.

[7m3[0m         { "path": "../utils" },
[7m [0m [91m        ~~~~~~~~~~~~~~~~~~~~~~[0m


Found 1 error in project/tsconfig.json[90m:3[0m

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
exports.x = void 0;
exports.x = 10;


