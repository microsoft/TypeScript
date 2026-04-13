currentDirectory::/home/src/workspaces/project
useCaseSensitiveFileNames::true
Input::
//// [/home/src/workspaces/project/src/lib/helper.ts] *new* 
export const helper = "v1";
//// [/home/src/workspaces/project/tsconfig.json] *new* 
{
	"compilerOptions": {},
	"include": ["src/**/*.ts"]
}

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
//// [/home/src/workspaces/project/src/lib/helper.js] *new* 
export const helper = "v1";


tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es2025.full.d.ts
*refresh*    /home/src/workspaces/project/src/lib/helper.ts
Signatures::


Edit [0]:: remove nested dir
//// [/home/src/workspaces/project/src/lib/helper.ts] *deleted*


Output::
[2J[3J[H[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.


tsconfig.json::
SemanticDiagnostics::
Signatures::


Diff:: incremental has prior state and does not report no-inputs error
--- nonIncremental.output.txt
+++ incremental.output.txt
@@ -1,4 +0,0 @@
-[91merror[0m[90m TS18003: [0mNo inputs were found in config file '/home/src/workspaces/project/tsconfig.json'. Specified 'include' paths were '["src/**/*.ts"]' and 'exclude' paths were '[]'.
-
-Found 1 error.
-

Edit [1]:: recreate nested dir with new content
//// [/home/src/workspaces/project/src/lib/helper.ts] *new* 
export const helper = "v2";


Output::
[2J[3J[H[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.

//// [/home/src/workspaces/project/src/lib/helper.js] *modified* 
export const helper = "v2";


tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es2025.full.d.ts
*refresh*    /home/src/workspaces/project/src/lib/helper.ts
Signatures::
(used version)   /home/src/tslibs/TS/Lib/lib.es2025.full.d.ts
(computed .d.ts) /home/src/workspaces/project/src/lib/helper.ts
