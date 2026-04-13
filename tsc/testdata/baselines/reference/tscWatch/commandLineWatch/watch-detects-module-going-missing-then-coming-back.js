currentDirectory::/home/src/workspaces/project
useCaseSensitiveFileNames::true
Input::
//// [/home/src/workspaces/project/index.ts] *new* 
import { util } from "./util";
//// [/home/src/workspaces/project/tsconfig.json] *new* 
{}
//// [/home/src/workspaces/project/util.ts] *new* 
export const util = "v1";

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
//// [/home/src/workspaces/project/index.js] *new* 
export {};

//// [/home/src/workspaces/project/util.js] *new* 
export const util = "v1";


tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es2025.full.d.ts
*refresh*    /home/src/workspaces/project/util.ts
*refresh*    /home/src/workspaces/project/index.ts
Signatures::


Edit [0]:: delete util module
//// [/home/src/workspaces/project/util.ts] *deleted*


Output::
[2J[3J[H[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

[96mindex.ts[0m:[93m1[0m:[93m22[0m - [91merror[0m[90m TS7016: [0mCould not find a declaration file for module './util'. '/home/src/workspaces/project/util.js' implicitly has an 'any' type.

[7m1[0m import { util } from "./util";
[7m [0m [91m                     ~~~~~~~~[0m


Found 1 error in index.ts[90m:1[0m

[[90mHH:MM:SS AM[0m] Found 1 error. Watching for file changes.

//// [/home/src/workspaces/project/index.js] *rewrite with same content*

tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/workspaces/project/index.ts
Signatures::
(computed .d.ts) /home/src/workspaces/project/index.ts


Diff:: incremental resolves to .js output from prior build while clean build cannot find module
--- nonIncremental.output.txt
+++ incremental.output.txt
@@ -1,4 +1,4 @@
-[96mindex.ts[0m:[93m1[0m:[93m22[0m - [91merror[0m[90m TS2307: [0mCannot find module './util' or its corresponding type declarations.
+[96mindex.ts[0m:[93m1[0m:[93m22[0m - [91merror[0m[90m TS7016: [0mCould not find a declaration file for module './util'. '/home/src/workspaces/project/util.js' implicitly has an 'any' type.

 [7m1[0m import { util } from "./util";
 [7m [0m [91m                     ~~~~~~~~[0m

Edit [1]:: recreate util module with new content
//// [/home/src/workspaces/project/util.ts] *new* 
export const util = "v2";


Output::
[2J[3J[H[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.

//// [/home/src/workspaces/project/index.js] *rewrite with same content*
//// [/home/src/workspaces/project/util.js] *modified* 
export const util = "v2";


tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/workspaces/project/util.ts
*refresh*    /home/src/workspaces/project/index.ts
Signatures::
(computed .d.ts) /home/src/workspaces/project/util.ts
(computed .d.ts) /home/src/workspaces/project/index.ts
