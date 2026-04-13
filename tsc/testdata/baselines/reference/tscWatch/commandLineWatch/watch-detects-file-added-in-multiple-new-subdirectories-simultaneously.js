currentDirectory::/home/src/workspaces/project
useCaseSensitiveFileNames::true
Input::
//// [/home/src/workspaces/project/src/a.ts] *new* 
export const a = 1;
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
//// [/home/src/workspaces/project/src/a.js] *new* 
export const a = 1;


tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es2025.full.d.ts
*refresh*    /home/src/workspaces/project/src/a.ts
Signatures::


Edit [0]:: create multiple new subdirs with files
//// [/home/src/workspaces/project/src/models/user.ts] *new* 
export interface User { name: string; }
//// [/home/src/workspaces/project/src/utils/format.ts] *new* 
export function format(s: string): string { return s.trim(); }


Output::
[2J[3J[H[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

[96msrc/utils/format.ts[0m:[93m1[0m:[93m54[0m - [91merror[0m[90m TS2339: [0mProperty 'trim' does not exist on type 'string'.

[7m1[0m export function format(s: string): string { return s.trim(); }
[7m [0m [91m                                                     ~~~~[0m


Found 1 error in src/utils/format.ts[90m:1[0m

[[90mHH:MM:SS AM[0m] Found 1 error. Watching for file changes.

//// [/home/src/workspaces/project/src/models/user.js] *new* 
export {};

//// [/home/src/workspaces/project/src/utils/format.js] *new* 
export function format(s) { return s.trim(); }


tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/workspaces/project/src/models/user.ts
*refresh*    /home/src/workspaces/project/src/utils/format.ts
Signatures::
(computed .d.ts) /home/src/workspaces/project/src/models/user.ts
(computed .d.ts) /home/src/workspaces/project/src/utils/format.ts
