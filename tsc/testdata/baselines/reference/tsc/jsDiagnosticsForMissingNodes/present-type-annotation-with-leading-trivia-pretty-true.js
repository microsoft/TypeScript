currentDirectory::/home/src/workspaces/project
useCaseSensitiveFileNames::true
Input::
//// [/home/src/workspaces/project/a.js] *new* 
var R:    number ;

tsgo a.js --allowJs --noEmit --pretty true
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[96ma.js[0m:[93m1[0m:[93m11[0m - [91merror[0m[90m TS8010: [0mType annotations can only be used in TypeScript files.

[7m1[0m var R:    number ;
[7m [0m [91m          ~~~~~~[0m


Found 1 error in a.js[90m:1[0m

//// [/home/src/tslibs/TS/Lib/lib.es2026.full.d.ts] *Lib*
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

