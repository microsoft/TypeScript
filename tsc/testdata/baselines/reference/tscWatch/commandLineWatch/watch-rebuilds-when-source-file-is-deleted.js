currentDirectory::/home/src/workspaces/project
useCaseSensitiveFileNames::true
Input::
//// [/home/src/workspaces/project/a.ts] *new* 
import { b } from "./b";
//// [/home/src/workspaces/project/b.ts] *new* 
export const b = 1;
//// [/home/src/workspaces/project/tsconfig.json] *new* 
{}

tsgo --watch
ExitStatus:: Success
Output::
[2J[3J[H[[90mHH:MM:SS AM[0m] Starting compilation in watch mode...

[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.

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
//// [/home/src/workspaces/project/a.js] *new* 
export {};

//// [/home/src/workspaces/project/b.js] *new* 
export const b = 1;


tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es2025.full.d.ts
*refresh*    /home/src/workspaces/project/b.ts
*refresh*    /home/src/workspaces/project/a.ts
Signatures::


Edit [0]:: delete imported file
//// [/home/src/workspaces/project/b.ts] *deleted*


Output::
[2J[3J[H[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

[96ma.ts[0m:[93m1[0m:[93m19[0m - [91merror[0m[90m TS7016: [0mCould not find a declaration file for module './b'. '/home/src/workspaces/project/b.js' implicitly has an 'any' type.

[7m1[0m import { b } from "./b";
[7m [0m [91m                  ~~~~~[0m


Found 1 error in a.ts[90m:1[0m

[[90mHH:MM:SS AM[0m] Found 1 error. Watching for file changes.

//// [/home/src/workspaces/project/a.js] *rewrite with same content*

tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/workspaces/project/a.ts
Signatures::
(computed .d.ts) /home/src/workspaces/project/a.ts


Diff:: incremental resolves to .js output from prior build (TS7016) while clean build cannot find module at all (TS2307)
--- nonIncremental.output.txt
+++ incremental.output.txt
@@ -1,4 +1,4 @@
-[96ma.ts[0m:[93m1[0m:[93m19[0m - [91merror[0m[90m TS2307: [0mCannot find module './b' or its corresponding type declarations.
+[96ma.ts[0m:[93m1[0m:[93m19[0m - [91merror[0m[90m TS7016: [0mCould not find a declaration file for module './b'. '/home/src/workspaces/project/b.js' implicitly has an 'any' type.

 [7m1[0m import { b } from "./b";
 [7m [0m [91m                  ~~~~~[0m