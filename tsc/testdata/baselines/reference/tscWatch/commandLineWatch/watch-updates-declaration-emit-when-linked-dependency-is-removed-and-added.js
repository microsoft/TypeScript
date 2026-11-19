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
export declare const currentStage: () => import("c").Current;
//// [/home/src/workspaces/project/b/node_modules/c] -> /home/src/workspaces/project/c *new*
//// [/home/src/workspaces/project/b/package.json] *new* 
{"name":"b","version":"1.0.0","type":"module","types":"./index.d.ts","dependencies":{"c":"1.0.0"}}
//// [/home/src/workspaces/project/c/index.d.ts] *new* 
export interface Current { readonly stage: string }
export declare const current: Current;
//// [/home/src/workspaces/project/c/package.json] *new* 
{"name":"c","version":"1.0.0","type":"module","types":"./index.d.ts"}

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
export declare const stage: import("c").Current;


Watch Registrations::
Directory watches::
  /home/src/tslibs/TS/Lib
  /home/src/workspaces/project
  /home/src/workspaces/project/a
  /home/src/workspaces/project/a/node_modules
  /home/src/workspaces/project/a/node_modules/b
  /home/src/workspaces/project/a/node_modules/c
  /home/src/workspaces/project/a/src (recursive)
  /home/src/workspaces/project/b
  /home/src/workspaces/project/b/node_modules
  /home/src/workspaces/project/b/node_modules/c
  /home/src/workspaces/project/c
tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es2026.full.d.ts
*refresh*    /home/src/workspaces/project/c/index.d.ts
*refresh*    /home/src/workspaces/project/b/index.d.ts
*refresh*    /home/src/workspaces/project/a/src/index.ts
Signatures::
(stored at emit) /home/src/workspaces/project/a/src/index.ts


Edit [0]:: remove c from dependencies and unlink it
//// [/home/src/workspaces/project/a/node_modules/c] *deleted*
//// [/home/src/workspaces/project/a/package.json] *modified* 
{"name":"a","version":"1.0.0","type":"module","dependencies":{"b":"1.0.0"}}


Output::
[2J[3J[H[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

[96msrc/index.ts[0m:[93m2[0m:[93m14[0m - [91merror[0m[90m TS2883: [0mThe inferred type of 'stage' cannot be named without a reference to 'Current' from '../../b/node_modules/c/index.js'. This is likely not portable. A type annotation is necessary.

[7m2[0m export const stage = currentStage();
[7m [0m [91m             ~~~~~[0m


Found 1 error in src/index.ts[90m:2[0m

[[90mHH:MM:SS AM[0m] Found 1 error. Watching for file changes.


Watch Registrations::
Directory watches::
  /home/src/tslibs/TS/Lib
  /home/src/workspaces/project
  /home/src/workspaces/project/a
  /home/src/workspaces/project/a/node_modules
  /home/src/workspaces/project/a/node_modules/b
  /home/src/workspaces/project/a/src (recursive)
  /home/src/workspaces/project/b
  /home/src/workspaces/project/b/node_modules
  /home/src/workspaces/project/b/node_modules/c
  /home/src/workspaces/project/c
tsconfig.json::
SemanticDiagnostics::
Signatures::


Edit [1]:: add c to dependencies and link it
//// [/home/src/workspaces/project/a/node_modules/c] -> /home/src/workspaces/project/c *new*
//// [/home/src/workspaces/project/a/package.json] *modified* 
{"name":"a","version":"1.0.0","type":"module","dependencies":{"b":"1.0.0","c":"1.0.0"}}


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
  /home/src/workspaces/project/a/src (recursive)
  /home/src/workspaces/project/b
  /home/src/workspaces/project/b/node_modules
  /home/src/workspaces/project/b/node_modules/c
  /home/src/workspaces/project/c
tsconfig.json::
SemanticDiagnostics::
Signatures::
