currentDirectory::/home/src/workspaces/project
useCaseSensitiveFileNames::true
Input::
//// [/home/src/workspaces/project/app/src/index.ts] *new* 
import local from "./local"; // Error
import esm from "esm-package"; // Error
import referencedSource from "../../lib/src/a"; // Error
import referencedDeclaration from "../../lib/dist/a"; // Error
import ambiguous from "ambiguous-package"; // Ok
//// [/home/src/workspaces/project/app/src/local.ts] *new* 
export const local = 0;
//// [/home/src/workspaces/project/app/tsconfig.json] *new* 
{
    "compilerOptions": {
        "module": "esnext",
        "moduleResolution": "bundler",
        "rootDir": "src",
        "outDir": "dist",
    },
    "include": ["src"],
    "references": [
        { "path": "../lib" },
    ],
}
//// [/home/src/workspaces/project/lib/dist/a.d.ts] *new* 
export declare const a = 0;
//// [/home/src/workspaces/project/lib/src/a.ts] *new* 
export const a = 0;
//// [/home/src/workspaces/project/lib/tsconfig.json] *new* 
{
    "compilerOptions": {
        "composite": true,
        "declaration": true,
        "rootDir": "src",
        "outDir": "dist",
        "module": "esnext",
        "moduleResolution": "bundler",
    },
    "include": ["src"],
}
//// [/home/src/workspaces/project/node_modules/ambiguous-package/index.d.ts] *new* 
export declare const ambiguous: number;
//// [/home/src/workspaces/project/node_modules/ambiguous-package/package.json] *new* 
{
    "name": "ambiguous-package"
}
//// [/home/src/workspaces/project/node_modules/esm-package/index.d.ts] *new* 
export declare const esm: number;
//// [/home/src/workspaces/project/node_modules/esm-package/package.json] *new* 
{
    "name": "esm-package",
    "type": "module"
}

tsgo --p app --pretty false
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
app/src/index.ts(1,8): error TS2613: Module '"/home/src/workspaces/project/app/src/local"' has no default export. Did you mean to use 'import { local } from "/home/src/workspaces/project/app/src/local"' instead?

app/src/index.ts(2,8): error TS2613: Module '"/home/src/workspaces/project/node_modules/esm-package/index"' has no default export. Did you mean to use 'import { esm } from "/home/src/workspaces/project/node_modules/esm-package/index"' instead?

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
//// [/home/src/workspaces/project/app/dist/index.js] *new* 
export {};

//// [/home/src/workspaces/project/app/dist/local.js] *new* 
export const local = 0;


