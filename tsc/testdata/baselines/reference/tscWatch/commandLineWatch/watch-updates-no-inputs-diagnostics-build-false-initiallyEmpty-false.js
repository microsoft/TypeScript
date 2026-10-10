currentDirectory::/home/src/workspaces/project
useCaseSensitiveFileNames::true
Input::
//// [/home/src/workspaces/project/src/helper.ts] *new* 
export const helper = 1;
//// [/home/src/workspaces/project/tsconfig.json] *new* 
{
	"compilerOptions": { "composite": false, "outDir": "out" },
	"include": ["src/**/*.ts"]
}

tsgo --watch
ExitStatus:: Success
Output::
[2J[3J[H[[90mHH:MM:SS AM[0m] Starting compilation in watch mode...

[96mtsconfig.json[0m:[93m2[0m:[93m43[0m - [91merror[0m[90m TS5011: [0mThe common source directory of 'tsconfig.json' is './src'. The 'rootDir' setting must be explicitly set to this or another path to adjust your output's file layout.
  Visit https://aka.ms/ts6 for migration information.

[7m2[0m  "compilerOptions": { "composite": false, "outDir": "out" },
[7m [0m [91m                                          ~~~~~~~~[0m


Found 1 error in tsconfig.json[90m:2[0m

[[90mHH:MM:SS AM[0m] Found 1 error. Watching for file changes.

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
//// [/home/src/workspaces/project/out/src/helper.js] *new* 
export const helper = 1;


Watch Registrations::
Directory watches::
  /home/src/tslibs/TS/Lib
  /home/src/workspaces/project
  /home/src/workspaces/project/src (recursive)
tsconfig.json::
SemanticDiagnostics::
*not cached* /home/src/tslibs/TS/Lib/lib.es2026.full.d.ts
*not cached* /home/src/workspaces/project/src/helper.ts
Signatures::


Edit [0]:: remove last source file
//// [/home/src/workspaces/project/src/helper.ts] *deleted*


Output::
[2J[3J[H[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

[91merror[0m[90m TS18003: [0mNo inputs were found in config file '/home/src/workspaces/project/tsconfig.json'. Specified 'include' paths were '["src/**/*.ts"]' and 'exclude' paths were '["/home/src/workspaces/project/out"]'.

Found 1 error.

[[90mHH:MM:SS AM[0m] Found 1 error. Watching for file changes.


Watch Registrations::
Directory watches::
  /home/src/workspaces/project
  /home/src/workspaces/project/src (recursive)
tsconfig.json::
SemanticDiagnostics::
Signatures::


Edit [1]:: add first source file
//// [/home/src/workspaces/project/src/helper.ts] *new* 
export const helper = 2;


Output::
[2J[3J[H[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

[96mtsconfig.json[0m:[93m2[0m:[93m43[0m - [91merror[0m[90m TS5011: [0mThe common source directory of 'tsconfig.json' is './src'. The 'rootDir' setting must be explicitly set to this or another path to adjust your output's file layout.
  Visit https://aka.ms/ts6 for migration information.

[7m2[0m  "compilerOptions": { "composite": false, "outDir": "out" },
[7m [0m [91m                                          ~~~~~~~~[0m


Found 1 error in tsconfig.json[90m:2[0m

[[90mHH:MM:SS AM[0m] Found 1 error. Watching for file changes.

//// [/home/src/workspaces/project/out/src/helper.js] *modified* 
export const helper = 2;


Watch Registrations::
Directory watches::
  /home/src/tslibs/TS/Lib
  /home/src/workspaces/project
  /home/src/workspaces/project/src (recursive)
tsconfig.json::
SemanticDiagnostics::
*not cached* /home/src/tslibs/TS/Lib/lib.es2026.full.d.ts
*not cached* /home/src/workspaces/project/src/helper.ts
Signatures::
(used version)   /home/src/tslibs/TS/Lib/lib.es2026.full.d.ts
(computed .d.ts) /home/src/workspaces/project/src/helper.ts
