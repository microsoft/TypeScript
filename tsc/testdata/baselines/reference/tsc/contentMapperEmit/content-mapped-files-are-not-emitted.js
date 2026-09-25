currentDirectory::/home/src/workspaces/project
useCaseSensitiveFileNames::true
Input::
//// [/home/src/workspaces/project/app.vue] *new* 
export const app = 1;
//// [/home/src/workspaces/project/index.ts] *new* 
export const local = 1;
//// [/home/src/workspaces/project/node_modules/vue-ts-mapper/package.json] *new* 
{
    "name": "vue-ts-mapper",
    "version": "1.0.0",
    "typescript": { "contentMapper": { "exec": ["verbatim-mapper"] } }
}
//// [/home/src/workspaces/project/tsconfig.json] *new* 
{
    "compilerOptions": {
        "outDir": "./dist"
    },
    "contentMappers": [
        { "package": "vue-ts-mapper", "extensions": [".vue"] }
    ]
}

tsgo --runExternalCode
ExitStatus:: Success
Output::
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
//// [/home/src/workspaces/project/dist/index.js] *new* 
export const local = 1;


