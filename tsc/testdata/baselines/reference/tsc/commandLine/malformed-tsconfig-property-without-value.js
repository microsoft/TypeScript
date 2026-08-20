currentDirectory::/home/src/workspaces/project
useCaseSensitiveFileNames::true
Input::
//// [/home/src/workspaces/project/index.ts] *new* 

//// [/home/src/workspaces/project/tsconfig.json] *new* 
{"" }

tsgo 
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[96mtsconfig.json[0m:[93m1[0m:[93m4[0m - [91merror[0m[90m TS1328: [0mProperty value can only be string literal, numeric literal, 'true', 'false', 'null', object literal or array literal.

[7m1[0m {"" }
[7m [0m [91m   ~[0m

[96mtsconfig.json[0m:[93m1[0m:[93m5[0m - [91merror[0m[90m TS1005: [0m':' expected.

[7m1[0m {"" }
[7m [0m [91m    ~[0m


Found 2 errors in the same file, starting at: tsconfig.json[90m:1[0m

//// [/home/src/tslibs/TS/Lib/lib.es2025.full.d.ts] *Lib*
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
//// [/home/src/workspaces/project/index.js] *new* 
"use strict";


