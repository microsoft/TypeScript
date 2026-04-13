currentDirectory::/home/src/workspaces/project
useCaseSensitiveFileNames::true
Input::
//// [/home/src/workspaces/project/index.ts] *new* 
import * as lib from "untyped-lib";
//// [/home/src/workspaces/project/node_modules/untyped-lib/index.js] *new* 
module.exports = {};
//// [/home/src/workspaces/project/tsconfig.json] *new* 
{}

tsgo --watch
ExitStatus:: Success
Output::
[2J[3J[H[[90mHH:MM:SS AM[0m] Starting compilation in watch mode...

[96mindex.ts[0m:[93m1[0m:[93m22[0m - [91merror[0m[90m TS7016: [0mCould not find a declaration file for module 'untyped-lib'. '/home/src/workspaces/project/node_modules/untyped-lib/index.js' implicitly has an 'any' type.

[7m1[0m import * as lib from "untyped-lib";
[7m [0m [91m                     ~~~~~~~~~~~~~[0m


Found 1 error in index.ts[90m:1[0m

[[90mHH:MM:SS AM[0m] Found 1 error. Watching for file changes.

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
//// [/home/src/workspaces/project/index.js] *new* 
export {};


tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es2025.full.d.ts
*refresh*    /home/src/workspaces/project/index.ts
Signatures::


Edit [0]:: install @types for the library
//// [/home/src/workspaces/project/node_modules/@types/untyped-lib/index.d.ts] *new* 
declare module "untyped-lib" { export const value: string; }
//// [/home/src/workspaces/project/node_modules/@types/untyped-lib/package.json] *new* 
{"name": "@types/untyped-lib", "types": "index.d.ts"}


Output::
[2J[3J[H[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.

//// [/home/src/workspaces/project/index.js] *rewrite with same content*

tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es2025.full.d.ts
*refresh*    /home/src/workspaces/project/node_modules/@types/untyped-lib/index.d.ts
*refresh*    /home/src/workspaces/project/index.ts
Signatures::
(used version)   /home/src/tslibs/TS/Lib/lib.es2025.full.d.ts
(used version)   /home/src/workspaces/project/node_modules/@types/untyped-lib/index.d.ts
(computed .d.ts) /home/src/workspaces/project/index.ts
