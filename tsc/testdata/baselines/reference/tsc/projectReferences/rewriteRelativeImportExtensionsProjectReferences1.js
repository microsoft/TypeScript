currentDirectory::/home/src/workspaces
useCaseSensitiveFileNames::true
Input::
//// [/home/src/workspaces/packages/common/dist/index.d.ts] *new* 
export {};
//// [/home/src/workspaces/packages/common/package.json] *new* 
{
        "name": "common",
        "version": "1.0.0",
        "type": "module",
        "exports": {
            ".": {
                "source": "./src/index.ts",
                "default": "./dist/index.js"
            }
        }
}
//// [/home/src/workspaces/packages/common/src/index.ts] *new* 
export {};
//// [/home/src/workspaces/packages/common/tsconfig.json] *new* 
{
    "compilerOptions": {
        "composite": true,
        "rootDir": "src",
        "outDir": "dist", 
        "module": "nodenext"
    }
}
//// [/home/src/workspaces/packages/main/package.json] *new* 
{
    "type": "module"
}
//// [/home/src/workspaces/packages/main/src/index.ts] *new* 
import {} from "../../common/src/index.ts";
//// [/home/src/workspaces/packages/main/tsconfig.json] *new* 
{
    "compilerOptions": {
        "module": "nodenext",
        "rewriteRelativeImportExtensions": true,
        "rootDir": "src",
        "outDir": "dist"
    },
    "references": [
        { "path": "../common" }
    ]
}

tsgo -p packages/main --pretty false
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
packages/main/src/index.ts(1,16): error TS2878: This import path is unsafe to rewrite because it resolves to another project, and the relative path between the projects' output files is not the same as the relative path between its input files.

//// [/home/src/tslibs/TS/Lib/lib.esnext.full.d.ts] *Lib*
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
//// [/home/src/workspaces/packages/main/dist/index.js] *new* 
export {};


