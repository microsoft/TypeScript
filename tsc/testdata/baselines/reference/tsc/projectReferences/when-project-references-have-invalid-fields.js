currentDirectory::/home/src/workspaces/solution
useCaseSensitiveFileNames::true
Input::
//// [/home/src/workspaces/solution/project/index.ts] *new* 
export const x = 10;
//// [/home/src/workspaces/solution/project/tsconfig.json] *new* 
{
    "compilerOptions": {
        "noEmit": true
    },
    "files": ["index.ts"],
    "references": [
        { "path": true },
        { "circular": true },
        { "path": "../utils", "circular": "yes" },
        { "path": "" },
        { "path": "../valid", "circular": true }
    ]
}
//// [/home/src/workspaces/solution/utils/index.d.ts] *new* 
export declare const y = 10;
//// [/home/src/workspaces/solution/utils/index.ts] *new* 
export const y = 10;
//// [/home/src/workspaces/solution/utils/tsconfig.json] *new* 
{
    "compilerOptions": {
        "composite": true
    }
}
//// [/home/src/workspaces/solution/valid/index.d.ts] *new* 
export declare const z = 10;
//// [/home/src/workspaces/solution/valid/index.ts] *new* 
export const z = 10;
//// [/home/src/workspaces/solution/valid/tsconfig.json] *new* 
{
    "compilerOptions": {
        "composite": true
    }
}

tsgo --p project
ExitStatus:: DiagnosticsPresent_OutputsSkipped
Output::
[96mproject/tsconfig.json[0m:[93m7[0m:[93m19[0m - [91merror[0m[90m TS5024: [0mCompiler option 'reference.path' requires a value of type string.

[7m7[0m         { "path": true },
[7m [0m [91m                  ~~~~[0m

[96mproject/tsconfig.json[0m:[93m8[0m:[93m9[0m - [91merror[0m[90m TS5024: [0mCompiler option 'reference.path' requires a value of type string.

[7m8[0m         { "circular": true },
[7m [0m [91m        ~~~~~~~~~~~~~~~~~~~~[0m

[96mproject/tsconfig.json[0m:[93m9[0m:[93m43[0m - [91merror[0m[90m TS5024: [0mCompiler option 'reference.circular' requires a value of type boolean.

[7m9[0m         { "path": "../utils", "circular": "yes" },
[7m [0m [91m                                          ~~~~~[0m

[96mproject/tsconfig.json[0m:[93m10[0m:[93m19[0m - [91merror[0m[90m TS18051: [0mCompiler option 'reference.path' cannot be given an empty string.

[7m10[0m         { "path": "" },
[7m  [0m [91m                  ~~[0m


Found 4 errors in the same file, starting at: project/tsconfig.json[90m:7[0m

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

