currentDirectory::/home/src/workspaces/solution
useCaseSensitiveFileNames::true
Input::
//// [/home/src/workspaces/solution/no-preserve/index.d.ts] *new* 
export declare const enum F { A = 1 }
//// [/home/src/workspaces/solution/no-preserve/index.ts] *new* 
export const enum E { A = 1 }
//// [/home/src/workspaces/solution/no-preserve/tsconfig.json] *new* 
{
    "compilerOptions": {
        "composite": true,
        "declaration": true,
        "preserveConstEnums": false,
    },
}
//// [/home/src/workspaces/solution/preserve/index.d.ts] *new* 
export declare const enum E { A = 1 }
//// [/home/src/workspaces/solution/preserve/index.ts] *new* 
export const enum E { A = 1 }
//// [/home/src/workspaces/solution/preserve/tsconfig.json] *new* 
{
    "compilerOptions": {
        "composite": true,
        "declaration": true,
        "preserveConstEnums": true,
    },
}
//// [/home/src/workspaces/solution/project/index.ts] *new* 
import { E } from "../preserve";
import { F } from "../no-preserve";
E.A;
F.A;
//// [/home/src/workspaces/solution/project/tsconfig.json] *new* 
{
    "compilerOptions": {
        "module": "preserve",
        "verbatimModuleSyntax": true,
    },
    "references": [
        { "path": "../preserve" },
        { "path": "../no-preserve" },
    ],
}

tsgo --p project --pretty false
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
project/index.ts(2,10): error TS2748: Cannot access ambient const enums when 'verbatimModuleSyntax' is enabled.

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
//// [/home/src/workspaces/solution/project/index.js] *new* 
import { E } from "../preserve";
import { F } from "../no-preserve";
E.A;
F.A;


