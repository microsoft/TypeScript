currentDirectory::/home/src/workspaces/project
useCaseSensitiveFileNames::true
Input::
//// [/home/src/workspaces/project/a.ts] *new* 
console.log(a);
//// [/home/src/workspaces/project/tsconfig.json] *new* 
{}
//// [/home/src/workspaces/project/x.ts] *new* 
const a = 1;

tsgo --watch
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
//// [/home/src/workspaces/project/a.js] *new* 
"use strict";
console.log(a);

//// [/home/src/workspaces/project/x.js] *new* 
"use strict";
const a = 1;


Watch Registrations::
Directory watches::
  /home/src/tslibs/TS/Lib
  /home/src/workspaces/project (recursive)
tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es2026.full.d.ts
*refresh*    /home/src/workspaces/project/a.ts
*refresh*    /home/src/workspaces/project/x.ts
Signatures::


Edit [0]:: comment out global declaration
//// [/home/src/workspaces/project/x.ts] *modified* 
// const a = 1;


Output::
[2J[3J[H[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

[96ma.ts[0m:[93m1[0m:[93m13[0m - [91merror[0m[90m TS2304: [0mCannot find name 'a'.

[7m1[0m console.log(a);
[7m [0m [91m            ~[0m


Found 1 error in a.ts[90m:1[0m

[[90mHH:MM:SS AM[0m] Found 1 error. Watching for file changes.

//// [/home/src/workspaces/project/a.js] *rewrite with same content*
//// [/home/src/workspaces/project/x.js] *modified* 
"use strict";
// const a = 1;


Watch Registrations::
Directory watches::
  /home/src/tslibs/TS/Lib
  /home/src/workspaces/project (recursive)
tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es2026.full.d.ts
*refresh*    /home/src/workspaces/project/a.ts
*refresh*    /home/src/workspaces/project/x.ts
Signatures::
(computed .d.ts) /home/src/workspaces/project/a.ts
(computed .d.ts) /home/src/workspaces/project/x.ts


Edit [1]:: restore global declaration
//// [/home/src/workspaces/project/x.ts] *modified* 
const a = 1;


Output::
[2J[3J[H[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.

//// [/home/src/workspaces/project/a.js] *rewrite with same content*
//// [/home/src/workspaces/project/x.js] *modified* 
"use strict";
const a = 1;


Watch Registrations::
Directory watches::
  /home/src/tslibs/TS/Lib
  /home/src/workspaces/project (recursive)
tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es2026.full.d.ts
*refresh*    /home/src/workspaces/project/a.ts
*refresh*    /home/src/workspaces/project/x.ts
Signatures::
(computed .d.ts) /home/src/workspaces/project/a.ts
(computed .d.ts) /home/src/workspaces/project/x.ts
