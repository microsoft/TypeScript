currentDirectory::/home/src/workspaces/project
useCaseSensitiveFileNames::true
Input::
//// [/home/src/workspaces/project/c.ts] *new* 
export const c = 10;
//// [/home/src/workspaces/project/src/a.ts] *new* 
export const a = 10;
//// [/home/src/workspaces/project/src/b.ts] *new* 
export const b = 10;
//// [/home/src/workspaces/project/tsconfig.json] *new* 
{
    "include": ["src"],
}

tsgo -p . --ignoreConfig
ExitStatus:: Success
Output::
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
//// [/home/src/workspaces/project/src/a.js] *new* 
export const a = 10;

//// [/home/src/workspaces/project/src/b.js] *new* 
export const b = 10;


