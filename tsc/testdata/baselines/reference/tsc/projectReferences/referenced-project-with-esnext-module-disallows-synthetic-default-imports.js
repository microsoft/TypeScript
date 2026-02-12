currentDirectory::/home/src/workspaces/project
useCaseSensitiveFileNames::true
Input::
//// [/home/src/workspaces/project/app/index.ts] *new* 
import TestSrc from '../lib/src/utils'; // Error
import TestDecl from '../lib/dist/utils'; // Error
console.log(TestSrc.test());
console.log(TestDecl.test());
//// [/home/src/workspaces/project/app/tsconfig.json] *new* 
{
    "compilerOptions": {
        "module": "esnext",
        "moduleResolution": "bundler"
    },
    "references": [
        { "path": "../lib" }
    ]
}
//// [/home/src/workspaces/project/lib/dist/utils.d.ts] *new* 
export declare const test: () => string;
//// [/home/src/workspaces/project/lib/src/utils.ts] *new* 
export const test = () => 'test';
//// [/home/src/workspaces/project/lib/tsconfig.json] *new* 
{
    "compilerOptions": {
        "composite": true,
        "declaration": true,
        "module": "esnext",
        "moduleResolution": "bundler",
        "rootDir": "src",
        "outDir": "dist"
    },
    "include": ["src"]
}

tsgo --p app --pretty false
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
app/index.ts(1,8): error TS1192: Module '"/home/src/workspaces/project/lib/dist/utils"' has no default export.
app/index.ts(2,8): error TS1192: Module '"/home/src/workspaces/project/lib/dist/utils"' has no default export.
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
//// [/home/src/workspaces/project/app/index.js] *new* 
import TestSrc from '../lib/src/utils'; // Error
import TestDecl from '../lib/dist/utils'; // Error
console.log(TestSrc.test());
console.log(TestDecl.test());


