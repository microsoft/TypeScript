currentDirectory::/home/src/projects/project
useCaseSensitiveFileNames::true
Input::
//// [/home/src/projects/project/base.json] *new* 
{
    "include": ["main.ts", 1],
}
//// [/home/src/projects/project/main.ts] *new* 
export const x = 1;
//// [/home/src/projects/project/tsconfig.json] *new* 
{
    "extends": "./base.json",
}

tsgo -p tsconfig.json --pretty false
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
base.json(2,28): error TS5024: Compiler option 'include' requires a value of type string.
//// [/home/src/projects/project/main.js] *new* 
export const x = 1;

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

