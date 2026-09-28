currentDirectory::/home/src/workspaces/project
useCaseSensitiveFileNames::true
Input::
//// [/home/src/workspaces/project/app.vue] *new* 
export const value = 1;
//// [/home/src/workspaces/project/node_modules/mapper/package.json] *new* 
{
	"name": "mapper",
	"version": "1.0.0",
	"typescript": { "contentMapper": { "exec": ["dynamic-verbatim-mapper"], "dynamicConfig": true } }
}
//// [/home/src/workspaces/project/tsconfig.json] *new* 
{
    "contentMappers": [
        {
            "package": "mapper",
            "extensions": [".vue"],
            "options": { "plugins": [{ "name": 1 }] }
        }
    ]
}

tsgo --runExternalCode --pretty false
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
tsconfig.json(6,48): error mapper123: Option 'name' requires a string.
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

