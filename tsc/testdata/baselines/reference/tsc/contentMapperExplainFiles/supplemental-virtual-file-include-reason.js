currentDirectory::/home/src/workspaces/project
useCaseSensitiveFileNames::true
Input::
//// [/home/src/workspaces/project/app.vue] *new* 
export const value = 1;
//// [/home/src/workspaces/project/node_modules/mapper/package.json] *new* 
{
    "name": "mapper",
    "version": "1.0.0",
    "typescript": { "contentMapper": { "exec": ["supplemental-mapper"] } }
}
//// [/home/src/workspaces/project/tsconfig.json] *new* 
{
    "contentMappers": [
        { "package": "mapper", "extensions": [".vue"] }
    ]
}

tsgo --runExternalCode --explainFiles
ExitStatus:: Success
Output::
../../tslibs/TS/Lib/lib.es2025.full.d.ts
   Default library for target 'ES2025'
app.vue.0.ts
   Supplemental virtual file produced by the content mapper for file 'app.vue'.
app.vue
   Matched by default include pattern '**/*'
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

