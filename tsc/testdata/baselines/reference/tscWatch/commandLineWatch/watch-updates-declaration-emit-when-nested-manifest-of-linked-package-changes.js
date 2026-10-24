currentDirectory::/home/src/workspaces/project/a
useCaseSensitiveFileNames::true
Input::
//// [/home/src/workspaces/project/a/node_modules/b] -> /home/src/workspaces/project/b *new*
//// [/home/src/workspaces/project/a/node_modules/c] -> /home/src/workspaces/project/c *new*
//// [/home/src/workspaces/project/a/package.json] *new* 
{"name":"a","version":"1.0.0","type":"module","dependencies":{"b":"1.0.0","c":"1.0.0"}}
//// [/home/src/workspaces/project/a/src/index.ts] *new* 
import { currentStage } from "b";
export const stage = currentStage();
//// [/home/src/workspaces/project/a/tsconfig.json] *new* 
{
    "compilerOptions": {
        "incremental": true,
        "declaration": true,
        "emitDeclarationOnly": true,
        "strict": true,
        "module": "nodenext",
        "types": [],
        "rootDir": "src",
        "outDir": "dist"
    },
    "include": ["src"]
}
//// [/home/src/workspaces/project/b/index.d.ts] *new* 
export declare const currentStage: () => import("c/src/index.js").Current;
//// [/home/src/workspaces/project/b/node_modules/c] -> /home/src/workspaces/project/c *new*
//// [/home/src/workspaces/project/b/package.json] *new* 
{"name":"b","version":"1.0.0","type":"module","types":"./index.d.ts","dependencies":{"c":"1.0.0"}}
//// [/home/src/workspaces/project/c/package.json] *new* 
{"name":"c","version":"1.0.0","type":"module","types":"./src/main.d.ts"}
//// [/home/src/workspaces/project/c/src/index.d.ts] *new* 
export interface Current { readonly stage: string }
export declare const current: Current;
//// [/home/src/workspaces/project/c/src/main.d.ts] *new* 
export declare const version: string;
//// [/home/src/workspaces/project/c/src/package.json] *new* 
{"type":"module","types":"./index.d.ts"}

tsgo --watch --incremental false
ExitStatus:: Success
Output::
[2J[3J[H[[90mHH:MM:SS AM[0m] Starting compilation in watch mode...

[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.

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
//// [/home/src/workspaces/project/a/dist/index.d.ts] *new* 
export declare const stage: import("c/src").Current;


Watch Registrations::
Directory watches::
  /home/src/tslibs/TS/Lib
  /home/src/workspaces/project
  /home/src/workspaces/project/a
  /home/src/workspaces/project/a/node_modules
  /home/src/workspaces/project/a/node_modules/b
  /home/src/workspaces/project/a/node_modules/c
  /home/src/workspaces/project/a/node_modules/c/src
  /home/src/workspaces/project/a/src (recursive)
  /home/src/workspaces/project/b
  /home/src/workspaces/project/b/node_modules
  /home/src/workspaces/project/b/node_modules/c
  /home/src/workspaces/project/b/node_modules/c/src
  /home/src/workspaces/project/c
  /home/src/workspaces/project/c/src
tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es2026.full.d.ts
*refresh*    /home/src/workspaces/project/c/src/index.d.ts
*refresh*    /home/src/workspaces/project/b/index.d.ts
*refresh*    /home/src/workspaces/project/a/src/index.ts
Signatures::
(stored at emit) /home/src/workspaces/project/a/src/index.ts


Edit [0]:: point types of nested manifest of c to another entry
//// [/home/src/workspaces/project/c/src/package.json] *modified* 
{"type":"module","types":"./main.d.ts"}


Output::
[2J[3J[H[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.

//// [/home/src/workspaces/project/a/dist/index.d.ts] *modified* 
export declare const stage: import("c/src/index.js").Current;


Watch Registrations::
Directory watches::
  /home/src/tslibs/TS/Lib
  /home/src/workspaces/project
  /home/src/workspaces/project/a
  /home/src/workspaces/project/a/node_modules
  /home/src/workspaces/project/a/node_modules/b
  /home/src/workspaces/project/a/node_modules/c
  /home/src/workspaces/project/a/node_modules/c/src
  /home/src/workspaces/project/a/src (recursive)
  /home/src/workspaces/project/b
  /home/src/workspaces/project/b/node_modules
  /home/src/workspaces/project/b/node_modules/c
  /home/src/workspaces/project/b/node_modules/c/src
  /home/src/workspaces/project/c
  /home/src/workspaces/project/c/src
tsconfig.json::
SemanticDiagnostics::
Signatures::


Edit [1]:: remove nested manifest of c
//// [/home/src/workspaces/project/c/src/package.json] *deleted*


Output::
[2J[3J[H[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.

//// [/home/src/workspaces/project/a/dist/index.d.ts] *rewrite with same content*

Watch Registrations::
Directory watches::
  /home/src/tslibs/TS/Lib
  /home/src/workspaces/project
  /home/src/workspaces/project/a
  /home/src/workspaces/project/a/node_modules
  /home/src/workspaces/project/a/node_modules/b
  /home/src/workspaces/project/a/node_modules/c
  /home/src/workspaces/project/a/node_modules/c/src
  /home/src/workspaces/project/a/src (recursive)
  /home/src/workspaces/project/b
  /home/src/workspaces/project/b/node_modules
  /home/src/workspaces/project/b/node_modules/c
  /home/src/workspaces/project/b/node_modules/c/src
  /home/src/workspaces/project/c
  /home/src/workspaces/project/c/src
tsconfig.json::
SemanticDiagnostics::
Signatures::


Edit [2]:: add nested manifest of c pointing types to index
//// [/home/src/workspaces/project/c/src/package.json] *new* 
{"type":"module","types":"./index.d.ts"}


Output::
[2J[3J[H[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.

//// [/home/src/workspaces/project/a/dist/index.d.ts] *modified* 
export declare const stage: import("c/src").Current;


Watch Registrations::
Directory watches::
  /home/src/tslibs/TS/Lib
  /home/src/workspaces/project
  /home/src/workspaces/project/a
  /home/src/workspaces/project/a/node_modules
  /home/src/workspaces/project/a/node_modules/b
  /home/src/workspaces/project/a/node_modules/c
  /home/src/workspaces/project/a/node_modules/c/src
  /home/src/workspaces/project/a/src (recursive)
  /home/src/workspaces/project/b
  /home/src/workspaces/project/b/node_modules
  /home/src/workspaces/project/b/node_modules/c
  /home/src/workspaces/project/b/node_modules/c/src
  /home/src/workspaces/project/c
  /home/src/workspaces/project/c/src
tsconfig.json::
SemanticDiagnostics::
Signatures::
