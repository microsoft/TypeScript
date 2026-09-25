currentDirectory::/home/src/workspaces/project
useCaseSensitiveFileNames::true
Input::
//// [/home/src/workspaces/project/src/common] -> /home/src/workspaces/shared/src *new*
//// [/home/src/workspaces/project/src/index.ts] *new* 
import { Greeting } from "./common/types"; const g: Greeting = { message: "hi" }; console.log(g);
//// [/home/src/workspaces/project/tsconfig.json] *new* 
{ "compilerOptions": { "rootDir": "src", "outDir": "dist" }, "include": ["src/**/*.ts"] }
//// [/home/src/workspaces/shared/src/types.ts] *new* 
export type Greeting = { message: string };

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
//// [/home/src/workspaces/project/dist/common/types.js] *new* 
export {};

//// [/home/src/workspaces/project/dist/index.js] *new* 
const g = { message: "hi" };
console.log(g);
export {};


Watch Registrations::
Directory watches::
  /home/src/tslibs/TS/Lib
  /home/src/workspaces/project
  /home/src/workspaces/project/src (recursive)
  /home/src/workspaces/shared/src
tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es2025.full.d.ts
*refresh*    /home/src/workspaces/project/src/common/types.ts
*refresh*    /home/src/workspaces/project/src/index.ts
Signatures::


Edit [0]:: modify file behind symlinked directory
//// [/home/src/workspaces/shared/src/types.ts] *modified* 
export type Greeting = { message: number };


Output::
[2J[3J[H[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

[96msrc/index.ts[0m:[93m1[0m:[93m66[0m - [91merror[0m[90m TS2322: [0mType 'string' is not assignable to type 'number'.

[7m1[0m import { Greeting } from "./common/types"; const g: Greeting = { message: "hi" }; console.log(g);
[7m [0m [91m                                                                 ~~~~~~~[0m

  [96msrc/common/types.ts[0m:[93m1[0m:[93m26[0m - The expected type comes from property 'message' which is declared here on type 'Greeting'
    [7m1[0m export type Greeting = { message: number };
    [7m [0m [96m                         ~~~~~~~[0m


Found 1 error in src/index.ts[90m:1[0m

[[90mHH:MM:SS AM[0m] Found 1 error. Watching for file changes.

//// [/home/src/workspaces/project/dist/common/types.js] *rewrite with same content*
//// [/home/src/workspaces/project/dist/index.js] *rewrite with same content*

Watch Registrations::
Directory watches::
  /home/src/tslibs/TS/Lib
  /home/src/workspaces/project
  /home/src/workspaces/project/src (recursive)
  /home/src/workspaces/shared/src
tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/workspaces/project/src/common/types.ts
*refresh*    /home/src/workspaces/project/src/index.ts
Signatures::
(computed .d.ts) /home/src/workspaces/project/src/common/types.ts
(computed .d.ts) /home/src/workspaces/project/src/index.ts
