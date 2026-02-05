currentDirectory::/home/src/workspaces/project
useCaseSensitiveFileNames::false
Input::
//// [/home/src/workspaces/project/src/c.ts] *new* 
/// <reference path="./D.ts"/>
//// [/home/src/workspaces/project/src/d.ts] *new* 
declare class c { }
//// [/home/src/workspaces/project/tsconfig.json] *new* 
{ }

tsgo 
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[96msrc/c.ts[0m:[93m1[0m:[93m22[0m - [91merror[0m[90m TS1261: [0mAlready included file name '/home/src/workspaces/project/src/D.ts' differs from file name '/home/src/workspaces/project/src/d.ts' only in casing.
  The file is in the program because:
    Referenced via './D.ts' from file '/home/src/workspaces/project/src/c.ts'
    Matched by default include pattern '**/*'

[7m1[0m /// <reference path="./D.ts"/>
[7m [0m [91m                     ~~~~~~[0m


Found 1 error in src/c.ts[90m:1[0m

//// [/home/src/tslibs/TS/Lib/lib.es2024.full.d.ts] *Lib*
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
//// [/home/src/workspaces/project/src/D.js] *new* 
"use strict";

//// [/home/src/workspaces/project/src/c.js] *new* 
"use strict";
/// <reference path="./D.ts"/>


