currentDirectory::/home/src/workspaces/solution
useCaseSensitiveFileNames::true
Input::
//// [/home/src/workspaces/solution/project1/src/a.ts] *new* 
export const a = 10;const aLocal = 10;
//// [/home/src/workspaces/solution/project1/src/b.ts] *new* 
export const b = 10;const bLocal = 10;
//// [/home/src/workspaces/solution/project1/src/c.ts] *new* 
import { a } from "./a";export const c = a;
//// [/home/src/workspaces/solution/project1/src/d.ts] *new* 
import { b } from "./b";export const d = b;
//// [/home/src/workspaces/solution/project1/src/tsconfig.json] *new* 
{
    "compilerOptions": { "declaration": true, "emitDeclarationOnly": true }
}
//// [/home/src/workspaces/solution/project2/src/e.ts] *new* 
export const e = 10;
//// [/home/src/workspaces/solution/project2/src/f.ts] *new* 
import { a } from "../../project1/src/a"; export const f = a;
//// [/home/src/workspaces/solution/project2/src/g.ts] *new* 
import { b } from "../../project1/src/b"; export const g = b;
//// [/home/src/workspaces/solution/project2/src/tsconfig.json] *new* 
{
    "compilerOptions": { "declaration": true, "emitDeclarationOnly": true },
    "references": [{ "path": "../../project1/src" }]
}

tsgo --b project2/src --verbose
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * project1/src/tsconfig.json
    * project2/src/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'project1/src/tsconfig.json' is out of date because output file 'project1/src/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project 'project1/src/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'project2/src/tsconfig.json' is out of date because output file 'project2/src/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project 'project2/src/tsconfig.json'...

[96mproject2/src/tsconfig.json[0m:[93m3[0m:[93m20[0m - [91merror[0m[90m TS6306: [0mReferenced project '/home/src/workspaces/solution/project1/src' must have setting "composite": true.

[7m3[0m     "references": [{ "path": "../../project1/src" }]
[7m [0m [91m                   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m


Found 1 error in project2/src/tsconfig.json[90m:3[0m

//// [/home/src/tslibs/TS/Lib/lib.d.ts] *Lib*
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
//// [/home/src/workspaces/solution/project1/src/a.d.ts] *new* 
export declare const a = 10;

//// [/home/src/workspaces/solution/project1/src/b.d.ts] *new* 
export declare const b = 10;

//// [/home/src/workspaces/solution/project1/src/c.d.ts] *new* 
export declare const c = 10;

//// [/home/src/workspaces/solution/project1/src/d.d.ts] *new* 
export declare const d = 10;

//// [/home/src/workspaces/solution/project1/src/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":["./a.ts","./b.ts","./c.ts","./d.ts"]}
//// [/home/src/workspaces/solution/project1/src/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./a.ts"
      ],
      "original": "./a.ts"
    },
    {
      "files": [
        "./b.ts"
      ],
      "original": "./b.ts"
    },
    {
      "files": [
        "./c.ts"
      ],
      "original": "./c.ts"
    },
    {
      "files": [
        "./d.ts"
      ],
      "original": "./d.ts"
    }
  ],
  "size": 72
}
//// [/home/src/workspaces/solution/project2/src/e.d.ts] *new* 
export declare const e = 10;

//// [/home/src/workspaces/solution/project2/src/f.d.ts] *new* 
export declare const f = 10;

//// [/home/src/workspaces/solution/project2/src/g.d.ts] *new* 
export declare const g = 10;

//// [/home/src/workspaces/solution/project2/src/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","errors":true,"root":["./e.ts","./f.ts","./g.ts"]}
//// [/home/src/workspaces/solution/project2/src/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "errors": true,
  "root": [
    {
      "files": [
        "./e.ts"
      ],
      "original": "./e.ts"
    },
    {
      "files": [
        "./f.ts"
      ],
      "original": "./f.ts"
    },
    {
      "files": [
        "./g.ts"
      ],
      "original": "./g.ts"
    }
  ],
  "size": 77
}

project1/src/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.d.ts
*refresh*    /home/src/workspaces/solution/project1/src/a.ts
*refresh*    /home/src/workspaces/solution/project1/src/b.ts
*refresh*    /home/src/workspaces/solution/project1/src/c.ts
*refresh*    /home/src/workspaces/solution/project1/src/d.ts
Signatures::
(stored at emit) /home/src/workspaces/solution/project1/src/a.ts
(stored at emit) /home/src/workspaces/solution/project1/src/b.ts
(stored at emit) /home/src/workspaces/solution/project1/src/c.ts
(stored at emit) /home/src/workspaces/solution/project1/src/d.ts

project2/src/tsconfig.json::
SemanticDiagnostics::
*not cached* /home/src/tslibs/TS/Lib/lib.d.ts
*not cached* /home/src/workspaces/solution/project2/src/e.ts
*not cached* /home/src/workspaces/solution/project1/src/a.d.ts
*not cached* /home/src/workspaces/solution/project2/src/f.ts
*not cached* /home/src/workspaces/solution/project1/src/b.d.ts
*not cached* /home/src/workspaces/solution/project2/src/g.ts
Signatures::
(stored at emit) /home/src/workspaces/solution/project2/src/e.ts
(stored at emit) /home/src/workspaces/solution/project2/src/f.ts
(stored at emit) /home/src/workspaces/solution/project2/src/g.ts


Edit [0]:: no change

tsgo --b project2/src --verbose
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * project1/src/tsconfig.json
    * project2/src/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'project1/src/tsconfig.json' is up to date because newest input 'project1/src/d.ts' is older than output 'project1/src/a.d.ts'

[[90mHH:MM:SS AM[0m] Project 'project2/src/tsconfig.json' is out of date because buildinfo file 'project2/src/tsconfig.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project 'project2/src/tsconfig.json'...

[96mproject2/src/tsconfig.json[0m:[93m3[0m:[93m20[0m - [91merror[0m[90m TS6306: [0mReferenced project '/home/src/workspaces/solution/project1/src' must have setting "composite": true.

[7m3[0m     "references": [{ "path": "../../project1/src" }]
[7m [0m [91m                   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m


Found 1 error in project2/src/tsconfig.json[90m:3[0m

//// [/home/src/workspaces/solution/project2/src/e.d.ts] *rewrite with same content*
//// [/home/src/workspaces/solution/project2/src/f.d.ts] *rewrite with same content*
//// [/home/src/workspaces/solution/project2/src/g.d.ts] *rewrite with same content*
//// [/home/src/workspaces/solution/project2/src/tsconfig.tsbuildinfo] *rewrite with same content*
//// [/home/src/workspaces/solution/project2/src/tsconfig.tsbuildinfo.readable.baseline.txt] *rewrite with same content*

project2/src/tsconfig.json::
SemanticDiagnostics::
*not cached* /home/src/tslibs/TS/Lib/lib.d.ts
*not cached* /home/src/workspaces/solution/project2/src/e.ts
*not cached* /home/src/workspaces/solution/project1/src/a.d.ts
*not cached* /home/src/workspaces/solution/project2/src/f.ts
*not cached* /home/src/workspaces/solution/project1/src/b.d.ts
*not cached* /home/src/workspaces/solution/project2/src/g.ts
Signatures::
(stored at emit) /home/src/workspaces/solution/project2/src/e.ts
(stored at emit) /home/src/workspaces/solution/project2/src/f.ts
(stored at emit) /home/src/workspaces/solution/project2/src/g.ts


Edit [1]:: change
//// [/home/src/workspaces/solution/project1/src/a.ts] *modified* 
export const a = 10;const aLocal = 10;const aa = 10;

tsgo --b project2/src --verbose
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * project1/src/tsconfig.json
    * project2/src/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'project1/src/tsconfig.json' is out of date because output 'project1/src/tsconfig.tsbuildinfo' is older than input 'project1/src/a.ts'

[[90mHH:MM:SS AM[0m] Building project 'project1/src/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'project2/src/tsconfig.json' is out of date because buildinfo file 'project2/src/tsconfig.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project 'project2/src/tsconfig.json'...

[96mproject2/src/tsconfig.json[0m:[93m3[0m:[93m20[0m - [91merror[0m[90m TS6306: [0mReferenced project '/home/src/workspaces/solution/project1/src' must have setting "composite": true.

[7m3[0m     "references": [{ "path": "../../project1/src" }]
[7m [0m [91m                   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m


Found 1 error in project2/src/tsconfig.json[90m:3[0m

//// [/home/src/workspaces/solution/project1/src/a.d.ts] *rewrite with same content*
//// [/home/src/workspaces/solution/project1/src/b.d.ts] *rewrite with same content*
//// [/home/src/workspaces/solution/project1/src/c.d.ts] *rewrite with same content*
//// [/home/src/workspaces/solution/project1/src/d.d.ts] *rewrite with same content*
//// [/home/src/workspaces/solution/project1/src/tsconfig.tsbuildinfo] *rewrite with same content*
//// [/home/src/workspaces/solution/project1/src/tsconfig.tsbuildinfo.readable.baseline.txt] *rewrite with same content*
//// [/home/src/workspaces/solution/project2/src/e.d.ts] *rewrite with same content*
//// [/home/src/workspaces/solution/project2/src/f.d.ts] *rewrite with same content*
//// [/home/src/workspaces/solution/project2/src/g.d.ts] *rewrite with same content*
//// [/home/src/workspaces/solution/project2/src/tsconfig.tsbuildinfo] *rewrite with same content*
//// [/home/src/workspaces/solution/project2/src/tsconfig.tsbuildinfo.readable.baseline.txt] *rewrite with same content*

project1/src/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.d.ts
*refresh*    /home/src/workspaces/solution/project1/src/a.ts
*refresh*    /home/src/workspaces/solution/project1/src/b.ts
*refresh*    /home/src/workspaces/solution/project1/src/c.ts
*refresh*    /home/src/workspaces/solution/project1/src/d.ts
Signatures::
(stored at emit) /home/src/workspaces/solution/project1/src/a.ts
(stored at emit) /home/src/workspaces/solution/project1/src/b.ts
(stored at emit) /home/src/workspaces/solution/project1/src/c.ts
(stored at emit) /home/src/workspaces/solution/project1/src/d.ts

project2/src/tsconfig.json::
SemanticDiagnostics::
*not cached* /home/src/tslibs/TS/Lib/lib.d.ts
*not cached* /home/src/workspaces/solution/project2/src/e.ts
*not cached* /home/src/workspaces/solution/project1/src/a.d.ts
*not cached* /home/src/workspaces/solution/project2/src/f.ts
*not cached* /home/src/workspaces/solution/project1/src/b.d.ts
*not cached* /home/src/workspaces/solution/project2/src/g.ts
Signatures::
(stored at emit) /home/src/workspaces/solution/project2/src/e.ts
(stored at emit) /home/src/workspaces/solution/project2/src/f.ts
(stored at emit) /home/src/workspaces/solution/project2/src/g.ts


Edit [2]:: emit js files

tsgo --b project2/src --verbose --emitDeclarationOnly false
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * project1/src/tsconfig.json
    * project2/src/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'project1/src/tsconfig.json' is out of date because output file 'project1/src/a.js' does not exist

[[90mHH:MM:SS AM[0m] Building project 'project1/src/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'project2/src/tsconfig.json' is out of date because buildinfo file 'project2/src/tsconfig.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project 'project2/src/tsconfig.json'...

[96mproject2/src/tsconfig.json[0m:[93m3[0m:[93m20[0m - [91merror[0m[90m TS6306: [0mReferenced project '/home/src/workspaces/solution/project1/src' must have setting "composite": true.

[7m3[0m     "references": [{ "path": "../../project1/src" }]
[7m [0m [91m                   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m


Found 1 error in project2/src/tsconfig.json[90m:3[0m

//// [/home/src/workspaces/solution/project1/src/a.d.ts] *rewrite with same content*
//// [/home/src/workspaces/solution/project1/src/a.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.a = void 0;
exports.a = 10;
const aLocal = 10;
const aa = 10;

//// [/home/src/workspaces/solution/project1/src/b.d.ts] *rewrite with same content*
//// [/home/src/workspaces/solution/project1/src/b.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.b = void 0;
exports.b = 10;
const bLocal = 10;

//// [/home/src/workspaces/solution/project1/src/c.d.ts] *rewrite with same content*
//// [/home/src/workspaces/solution/project1/src/c.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.c = void 0;
const a_1 = require("./a");
exports.c = a_1.a;

//// [/home/src/workspaces/solution/project1/src/d.d.ts] *rewrite with same content*
//// [/home/src/workspaces/solution/project1/src/d.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.d = void 0;
const b_1 = require("./b");
exports.d = b_1.b;

//// [/home/src/workspaces/solution/project1/src/tsconfig.tsbuildinfo] *rewrite with same content*
//// [/home/src/workspaces/solution/project1/src/tsconfig.tsbuildinfo.readable.baseline.txt] *rewrite with same content*
//// [/home/src/workspaces/solution/project2/src/e.d.ts] *rewrite with same content*
//// [/home/src/workspaces/solution/project2/src/e.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.e = void 0;
exports.e = 10;

//// [/home/src/workspaces/solution/project2/src/f.d.ts] *rewrite with same content*
//// [/home/src/workspaces/solution/project2/src/f.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.f = void 0;
const a_1 = require("../../project1/src/a");
exports.f = a_1.a;

//// [/home/src/workspaces/solution/project2/src/g.d.ts] *rewrite with same content*
//// [/home/src/workspaces/solution/project2/src/g.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.g = void 0;
const b_1 = require("../../project1/src/b");
exports.g = b_1.b;

//// [/home/src/workspaces/solution/project2/src/tsconfig.tsbuildinfo] *rewrite with same content*
//// [/home/src/workspaces/solution/project2/src/tsconfig.tsbuildinfo.readable.baseline.txt] *rewrite with same content*

project1/src/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.d.ts
*refresh*    /home/src/workspaces/solution/project1/src/a.ts
*refresh*    /home/src/workspaces/solution/project1/src/b.ts
*refresh*    /home/src/workspaces/solution/project1/src/c.ts
*refresh*    /home/src/workspaces/solution/project1/src/d.ts
Signatures::
(stored at emit) /home/src/workspaces/solution/project1/src/a.ts
(stored at emit) /home/src/workspaces/solution/project1/src/b.ts
(stored at emit) /home/src/workspaces/solution/project1/src/c.ts
(stored at emit) /home/src/workspaces/solution/project1/src/d.ts

project2/src/tsconfig.json::
SemanticDiagnostics::
*not cached* /home/src/tslibs/TS/Lib/lib.d.ts
*not cached* /home/src/workspaces/solution/project2/src/e.ts
*not cached* /home/src/workspaces/solution/project1/src/a.d.ts
*not cached* /home/src/workspaces/solution/project2/src/f.ts
*not cached* /home/src/workspaces/solution/project1/src/b.d.ts
*not cached* /home/src/workspaces/solution/project2/src/g.ts
Signatures::
(stored at emit) /home/src/workspaces/solution/project2/src/e.ts
(stored at emit) /home/src/workspaces/solution/project2/src/f.ts
(stored at emit) /home/src/workspaces/solution/project2/src/g.ts


Edit [3]:: no change

tsgo --b project2/src --verbose
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * project1/src/tsconfig.json
    * project2/src/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'project1/src/tsconfig.json' is up to date because newest input 'project1/src/a.ts' is older than output 'project1/src/a.d.ts'

[[90mHH:MM:SS AM[0m] Project 'project2/src/tsconfig.json' is out of date because buildinfo file 'project2/src/tsconfig.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project 'project2/src/tsconfig.json'...

[96mproject2/src/tsconfig.json[0m:[93m3[0m:[93m20[0m - [91merror[0m[90m TS6306: [0mReferenced project '/home/src/workspaces/solution/project1/src' must have setting "composite": true.

[7m3[0m     "references": [{ "path": "../../project1/src" }]
[7m [0m [91m                   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m


Found 1 error in project2/src/tsconfig.json[90m:3[0m

//// [/home/src/workspaces/solution/project2/src/e.d.ts] *rewrite with same content*
//// [/home/src/workspaces/solution/project2/src/f.d.ts] *rewrite with same content*
//// [/home/src/workspaces/solution/project2/src/g.d.ts] *rewrite with same content*
//// [/home/src/workspaces/solution/project2/src/tsconfig.tsbuildinfo] *rewrite with same content*
//// [/home/src/workspaces/solution/project2/src/tsconfig.tsbuildinfo.readable.baseline.txt] *rewrite with same content*

project2/src/tsconfig.json::
SemanticDiagnostics::
*not cached* /home/src/tslibs/TS/Lib/lib.d.ts
*not cached* /home/src/workspaces/solution/project2/src/e.ts
*not cached* /home/src/workspaces/solution/project1/src/a.d.ts
*not cached* /home/src/workspaces/solution/project2/src/f.ts
*not cached* /home/src/workspaces/solution/project1/src/b.d.ts
*not cached* /home/src/workspaces/solution/project2/src/g.ts
Signatures::
(stored at emit) /home/src/workspaces/solution/project2/src/e.ts
(stored at emit) /home/src/workspaces/solution/project2/src/f.ts
(stored at emit) /home/src/workspaces/solution/project2/src/g.ts


Edit [4]:: no change run with js emit

tsgo --b project2/src --verbose --emitDeclarationOnly false
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * project1/src/tsconfig.json
    * project2/src/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'project1/src/tsconfig.json' is up to date because newest input 'project1/src/a.ts' is older than output 'project1/src/a.js'

[[90mHH:MM:SS AM[0m] Project 'project2/src/tsconfig.json' is out of date because buildinfo file 'project2/src/tsconfig.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project 'project2/src/tsconfig.json'...

[96mproject2/src/tsconfig.json[0m:[93m3[0m:[93m20[0m - [91merror[0m[90m TS6306: [0mReferenced project '/home/src/workspaces/solution/project1/src' must have setting "composite": true.

[7m3[0m     "references": [{ "path": "../../project1/src" }]
[7m [0m [91m                   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m


Found 1 error in project2/src/tsconfig.json[90m:3[0m

//// [/home/src/workspaces/solution/project2/src/e.d.ts] *rewrite with same content*
//// [/home/src/workspaces/solution/project2/src/e.js] *rewrite with same content*
//// [/home/src/workspaces/solution/project2/src/f.d.ts] *rewrite with same content*
//// [/home/src/workspaces/solution/project2/src/f.js] *rewrite with same content*
//// [/home/src/workspaces/solution/project2/src/g.d.ts] *rewrite with same content*
//// [/home/src/workspaces/solution/project2/src/g.js] *rewrite with same content*
//// [/home/src/workspaces/solution/project2/src/tsconfig.tsbuildinfo] *rewrite with same content*
//// [/home/src/workspaces/solution/project2/src/tsconfig.tsbuildinfo.readable.baseline.txt] *rewrite with same content*

project2/src/tsconfig.json::
SemanticDiagnostics::
*not cached* /home/src/tslibs/TS/Lib/lib.d.ts
*not cached* /home/src/workspaces/solution/project2/src/e.ts
*not cached* /home/src/workspaces/solution/project1/src/a.d.ts
*not cached* /home/src/workspaces/solution/project2/src/f.ts
*not cached* /home/src/workspaces/solution/project1/src/b.d.ts
*not cached* /home/src/workspaces/solution/project2/src/g.ts
Signatures::
(stored at emit) /home/src/workspaces/solution/project2/src/e.ts
(stored at emit) /home/src/workspaces/solution/project2/src/f.ts
(stored at emit) /home/src/workspaces/solution/project2/src/g.ts


Edit [5]:: js emit with change
//// [/home/src/workspaces/solution/project1/src/b.ts] *modified* 
export const b = 10;const bLocal = 10;const blocal = 10;

tsgo --b project2/src --verbose --emitDeclarationOnly false
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * project1/src/tsconfig.json
    * project2/src/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'project1/src/tsconfig.json' is out of date because output 'project1/src/tsconfig.tsbuildinfo' is older than input 'project1/src/b.ts'

[[90mHH:MM:SS AM[0m] Building project 'project1/src/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'project2/src/tsconfig.json' is out of date because buildinfo file 'project2/src/tsconfig.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project 'project2/src/tsconfig.json'...

[96mproject2/src/tsconfig.json[0m:[93m3[0m:[93m20[0m - [91merror[0m[90m TS6306: [0mReferenced project '/home/src/workspaces/solution/project1/src' must have setting "composite": true.

[7m3[0m     "references": [{ "path": "../../project1/src" }]
[7m [0m [91m                   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m


Found 1 error in project2/src/tsconfig.json[90m:3[0m

//// [/home/src/workspaces/solution/project1/src/a.d.ts] *rewrite with same content*
//// [/home/src/workspaces/solution/project1/src/a.js] *rewrite with same content*
//// [/home/src/workspaces/solution/project1/src/b.d.ts] *rewrite with same content*
//// [/home/src/workspaces/solution/project1/src/b.js] *modified* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.b = void 0;
exports.b = 10;
const bLocal = 10;
const blocal = 10;

//// [/home/src/workspaces/solution/project1/src/c.d.ts] *rewrite with same content*
//// [/home/src/workspaces/solution/project1/src/c.js] *rewrite with same content*
//// [/home/src/workspaces/solution/project1/src/d.d.ts] *rewrite with same content*
//// [/home/src/workspaces/solution/project1/src/d.js] *rewrite with same content*
//// [/home/src/workspaces/solution/project1/src/tsconfig.tsbuildinfo] *rewrite with same content*
//// [/home/src/workspaces/solution/project1/src/tsconfig.tsbuildinfo.readable.baseline.txt] *rewrite with same content*
//// [/home/src/workspaces/solution/project2/src/e.d.ts] *rewrite with same content*
//// [/home/src/workspaces/solution/project2/src/e.js] *rewrite with same content*
//// [/home/src/workspaces/solution/project2/src/f.d.ts] *rewrite with same content*
//// [/home/src/workspaces/solution/project2/src/f.js] *rewrite with same content*
//// [/home/src/workspaces/solution/project2/src/g.d.ts] *rewrite with same content*
//// [/home/src/workspaces/solution/project2/src/g.js] *rewrite with same content*
//// [/home/src/workspaces/solution/project2/src/tsconfig.tsbuildinfo] *rewrite with same content*
//// [/home/src/workspaces/solution/project2/src/tsconfig.tsbuildinfo.readable.baseline.txt] *rewrite with same content*

project1/src/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.d.ts
*refresh*    /home/src/workspaces/solution/project1/src/a.ts
*refresh*    /home/src/workspaces/solution/project1/src/b.ts
*refresh*    /home/src/workspaces/solution/project1/src/c.ts
*refresh*    /home/src/workspaces/solution/project1/src/d.ts
Signatures::
(stored at emit) /home/src/workspaces/solution/project1/src/a.ts
(stored at emit) /home/src/workspaces/solution/project1/src/b.ts
(stored at emit) /home/src/workspaces/solution/project1/src/c.ts
(stored at emit) /home/src/workspaces/solution/project1/src/d.ts

project2/src/tsconfig.json::
SemanticDiagnostics::
*not cached* /home/src/tslibs/TS/Lib/lib.d.ts
*not cached* /home/src/workspaces/solution/project2/src/e.ts
*not cached* /home/src/workspaces/solution/project1/src/a.d.ts
*not cached* /home/src/workspaces/solution/project2/src/f.ts
*not cached* /home/src/workspaces/solution/project1/src/b.d.ts
*not cached* /home/src/workspaces/solution/project2/src/g.ts
Signatures::
(stored at emit) /home/src/workspaces/solution/project2/src/e.ts
(stored at emit) /home/src/workspaces/solution/project2/src/f.ts
(stored at emit) /home/src/workspaces/solution/project2/src/g.ts
