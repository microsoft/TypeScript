currentDirectory::/home/src/workspaces/project
useCaseSensitiveFileNames::true
Input::
//// [/home/src/workspaces/project/a.ts] *new* 
export const a = "hello
//// [/home/src/workspaces/project/b.ts] *new* 
export const b = 10;
//// [/home/src/workspaces/project/tsconfig.json] *new* 
{
    "compilerOptions": {
        "declaration": true,
        "incremental": false
    }
}

tsgo -b -v --noCheck
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because output file 'tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project 'tsconfig.json'...

[96ma.ts[0m:[93m1[0m:[93m24[0m - [91merror[0m[90m TS1002: [0mUnterminated string literal.

[7m1[0m export const a = "hello
[7m [0m [91m                       ~[0m


Found 1 error in a.ts[90m:1[0m

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
//// [/home/src/workspaces/project/a.d.ts] *new* 
export declare const a = "hello";

//// [/home/src/workspaces/project/a.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.a = void 0;
exports.a = "hello;

//// [/home/src/workspaces/project/b.d.ts] *new* 
export declare const b = 10;

//// [/home/src/workspaces/project/b.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.b = void 0;
exports.b = 10;

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","errors":true,"checkPending":true,"root":["./a.ts","./b.ts"]}
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "errors": true,
  "checkPending": true,
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
    }
  ],
  "size": 88
}

tsconfig.json::
SemanticDiagnostics::
*not cached* /home/src/tslibs/TS/Lib/lib.d.ts
*not cached* /home/src/workspaces/project/a.ts
*not cached* /home/src/workspaces/project/b.ts
Signatures::
(stored at emit) /home/src/workspaces/project/a.ts
(stored at emit) /home/src/workspaces/project/b.ts


Edit [0]:: no change

tsgo -b -v --noCheck
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because buildinfo file 'tsconfig.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project 'tsconfig.json'...

[96ma.ts[0m:[93m1[0m:[93m24[0m - [91merror[0m[90m TS1002: [0mUnterminated string literal.

[7m1[0m export const a = "hello
[7m [0m [91m                       ~[0m


Found 1 error in a.ts[90m:1[0m

//// [/home/src/workspaces/project/a.d.ts] *rewrite with same content*
//// [/home/src/workspaces/project/a.js] *rewrite with same content*
//// [/home/src/workspaces/project/b.d.ts] *rewrite with same content*
//// [/home/src/workspaces/project/b.js] *rewrite with same content*
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo] *rewrite with same content*
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt] *rewrite with same content*

tsconfig.json::
SemanticDiagnostics::
*not cached* /home/src/tslibs/TS/Lib/lib.d.ts
*not cached* /home/src/workspaces/project/a.ts
*not cached* /home/src/workspaces/project/b.ts
Signatures::
(stored at emit) /home/src/workspaces/project/a.ts
(stored at emit) /home/src/workspaces/project/b.ts


Edit [1]:: Fix `a` error with noCheck
//// [/home/src/workspaces/project/a.ts] *modified* 
export const a = "hello";

tsgo -b -v --noCheck
ExitStatus:: Success
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because buildinfo file 'tsconfig.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project 'tsconfig.json'...

//// [/home/src/workspaces/project/a.d.ts] *rewrite with same content*
//// [/home/src/workspaces/project/a.js] *modified* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.a = void 0;
exports.a = "hello";

//// [/home/src/workspaces/project/b.d.ts] *rewrite with same content*
//// [/home/src/workspaces/project/b.js] *rewrite with same content*
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","checkPending":true,"root":["./a.ts","./b.ts"]}
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "checkPending": true,
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
    }
  ],
  "size": 74
}

tsconfig.json::
SemanticDiagnostics::
*not cached* /home/src/tslibs/TS/Lib/lib.d.ts
*not cached* /home/src/workspaces/project/a.ts
*not cached* /home/src/workspaces/project/b.ts
Signatures::
(stored at emit) /home/src/workspaces/project/a.ts
(stored at emit) /home/src/workspaces/project/b.ts


Edit [2]:: no change

tsgo -b -v --noCheck
ExitStatus:: Success
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is up to date because newest input 'a.ts' is older than output 'a.js'




Edit [3]:: No Change run with checking

tsgo -b -v
ExitStatus:: Success
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because buildinfo file 'tsconfig.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project 'tsconfig.json'...

//// [/home/src/workspaces/project/a.d.ts] *rewrite with same content*
//// [/home/src/workspaces/project/a.js] *rewrite with same content*
//// [/home/src/workspaces/project/b.d.ts] *rewrite with same content*
//// [/home/src/workspaces/project/b.js] *rewrite with same content*
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":["./a.ts","./b.ts"]}
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
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
    }
  ],
  "size": 54
}

tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.d.ts
*refresh*    /home/src/workspaces/project/a.ts
*refresh*    /home/src/workspaces/project/b.ts
Signatures::
(stored at emit) /home/src/workspaces/project/a.ts
(stored at emit) /home/src/workspaces/project/b.ts


Edit [4]:: No Change run with checking

tsgo -b -v
ExitStatus:: Success
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is up to date because newest input 'a.ts' is older than output 'a.js'




Edit [5]:: no change

tsgo -b -v --noCheck
ExitStatus:: Success
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is up to date because newest input 'a.ts' is older than output 'a.js'




Edit [6]:: Introduce error with noCheck
//// [/home/src/workspaces/project/a.ts] *modified* 
export const a = "hello

tsgo -b -v --noCheck
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because output 'tsconfig.tsbuildinfo' is older than input 'a.ts'

[[90mHH:MM:SS AM[0m] Building project 'tsconfig.json'...

[96ma.ts[0m:[93m1[0m:[93m24[0m - [91merror[0m[90m TS1002: [0mUnterminated string literal.

[7m1[0m export const a = "hello
[7m [0m [91m                       ~[0m


Found 1 error in a.ts[90m:1[0m

//// [/home/src/workspaces/project/a.d.ts] *rewrite with same content*
//// [/home/src/workspaces/project/a.js] *modified* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.a = void 0;
exports.a = "hello;

//// [/home/src/workspaces/project/b.d.ts] *rewrite with same content*
//// [/home/src/workspaces/project/b.js] *rewrite with same content*
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","errors":true,"checkPending":true,"root":["./a.ts","./b.ts"]}
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "errors": true,
  "checkPending": true,
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
    }
  ],
  "size": 88
}

tsconfig.json::
SemanticDiagnostics::
*not cached* /home/src/tslibs/TS/Lib/lib.d.ts
*not cached* /home/src/workspaces/project/a.ts
*not cached* /home/src/workspaces/project/b.ts
Signatures::
(stored at emit) /home/src/workspaces/project/a.ts
(stored at emit) /home/src/workspaces/project/b.ts


Edit [7]:: no change

tsgo -b -v --noCheck
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because buildinfo file 'tsconfig.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project 'tsconfig.json'...

[96ma.ts[0m:[93m1[0m:[93m24[0m - [91merror[0m[90m TS1002: [0mUnterminated string literal.

[7m1[0m export const a = "hello
[7m [0m [91m                       ~[0m


Found 1 error in a.ts[90m:1[0m

//// [/home/src/workspaces/project/a.d.ts] *rewrite with same content*
//// [/home/src/workspaces/project/a.js] *rewrite with same content*
//// [/home/src/workspaces/project/b.d.ts] *rewrite with same content*
//// [/home/src/workspaces/project/b.js] *rewrite with same content*
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo] *rewrite with same content*
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt] *rewrite with same content*

tsconfig.json::
SemanticDiagnostics::
*not cached* /home/src/tslibs/TS/Lib/lib.d.ts
*not cached* /home/src/workspaces/project/a.ts
*not cached* /home/src/workspaces/project/b.ts
Signatures::
(stored at emit) /home/src/workspaces/project/a.ts
(stored at emit) /home/src/workspaces/project/b.ts


Edit [8]:: No Change run with checking

tsgo -b -v
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because buildinfo file 'tsconfig.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project 'tsconfig.json'...

[96ma.ts[0m:[93m1[0m:[93m24[0m - [91merror[0m[90m TS1002: [0mUnterminated string literal.

[7m1[0m export const a = "hello
[7m [0m [91m                       ~[0m


Found 1 error in a.ts[90m:1[0m

//// [/home/src/workspaces/project/a.d.ts] *rewrite with same content*
//// [/home/src/workspaces/project/a.js] *rewrite with same content*
//// [/home/src/workspaces/project/b.d.ts] *rewrite with same content*
//// [/home/src/workspaces/project/b.js] *rewrite with same content*
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","errors":true,"root":["./a.ts","./b.ts"]}
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "errors": true,
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
    }
  ],
  "size": 68
}

tsconfig.json::
SemanticDiagnostics::
*not cached* /home/src/tslibs/TS/Lib/lib.d.ts
*not cached* /home/src/workspaces/project/a.ts
*not cached* /home/src/workspaces/project/b.ts
Signatures::
(stored at emit) /home/src/workspaces/project/a.ts
(stored at emit) /home/src/workspaces/project/b.ts


Edit [9]:: Fix `a` error with noCheck
//// [/home/src/workspaces/project/a.ts] *modified* 
export const a = "hello";

tsgo -b -v --noCheck
ExitStatus:: Success
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because buildinfo file 'tsconfig.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project 'tsconfig.json'...

//// [/home/src/workspaces/project/a.d.ts] *rewrite with same content*
//// [/home/src/workspaces/project/a.js] *modified* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.a = void 0;
exports.a = "hello";

//// [/home/src/workspaces/project/b.d.ts] *rewrite with same content*
//// [/home/src/workspaces/project/b.js] *rewrite with same content*
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","checkPending":true,"root":["./a.ts","./b.ts"]}
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "checkPending": true,
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
    }
  ],
  "size": 74
}

tsconfig.json::
SemanticDiagnostics::
*not cached* /home/src/tslibs/TS/Lib/lib.d.ts
*not cached* /home/src/workspaces/project/a.ts
*not cached* /home/src/workspaces/project/b.ts
Signatures::
(stored at emit) /home/src/workspaces/project/a.ts
(stored at emit) /home/src/workspaces/project/b.ts


Edit [10]:: No Change run with checking

tsgo -b -v
ExitStatus:: Success
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because buildinfo file 'tsconfig.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project 'tsconfig.json'...

//// [/home/src/workspaces/project/a.d.ts] *rewrite with same content*
//// [/home/src/workspaces/project/a.js] *rewrite with same content*
//// [/home/src/workspaces/project/b.d.ts] *rewrite with same content*
//// [/home/src/workspaces/project/b.js] *rewrite with same content*
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":["./a.ts","./b.ts"]}
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
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
    }
  ],
  "size": 54
}

tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.d.ts
*refresh*    /home/src/workspaces/project/a.ts
*refresh*    /home/src/workspaces/project/b.ts
Signatures::
(stored at emit) /home/src/workspaces/project/a.ts
(stored at emit) /home/src/workspaces/project/b.ts


Edit [11]:: Add file with error
//// [/home/src/workspaces/project/c.ts] *new* 
export const c: number = "hello";

tsgo -b -v
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because output 'tsconfig.tsbuildinfo' is older than input 'c.ts'

[[90mHH:MM:SS AM[0m] Building project 'tsconfig.json'...

[96mc.ts[0m:[93m1[0m:[93m14[0m - [91merror[0m[90m TS2322: [0mType 'string' is not assignable to type 'number'.

[7m1[0m export const c: number = "hello";
[7m [0m [91m             ~[0m


Found 1 error in c.ts[90m:1[0m

//// [/home/src/workspaces/project/a.d.ts] *rewrite with same content*
//// [/home/src/workspaces/project/a.js] *rewrite with same content*
//// [/home/src/workspaces/project/b.d.ts] *rewrite with same content*
//// [/home/src/workspaces/project/b.js] *rewrite with same content*
//// [/home/src/workspaces/project/c.d.ts] *new* 
export declare const c: number;

//// [/home/src/workspaces/project/c.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.c = void 0;
exports.c = "hello";

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":["./a.ts","./b.ts","./c.ts"],"semanticErrors":true}
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
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
    }
  ],
  "size": 85,
  "semanticErrors": true
}

tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.d.ts
*refresh*    /home/src/workspaces/project/a.ts
*refresh*    /home/src/workspaces/project/b.ts
*refresh*    /home/src/workspaces/project/c.ts
Signatures::
(stored at emit) /home/src/workspaces/project/a.ts
(stored at emit) /home/src/workspaces/project/b.ts
(stored at emit) /home/src/workspaces/project/c.ts


Edit [12]:: Introduce error with noCheck
//// [/home/src/workspaces/project/a.ts] *modified* 
export const a = "hello

tsgo -b -v --noCheck
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because output 'tsconfig.tsbuildinfo' is older than input 'a.ts'

[[90mHH:MM:SS AM[0m] Building project 'tsconfig.json'...

[96ma.ts[0m:[93m1[0m:[93m24[0m - [91merror[0m[90m TS1002: [0mUnterminated string literal.

[7m1[0m export const a = "hello
[7m [0m [91m                       ~[0m


Found 1 error in a.ts[90m:1[0m

//// [/home/src/workspaces/project/a.d.ts] *rewrite with same content*
//// [/home/src/workspaces/project/a.js] *modified* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.a = void 0;
exports.a = "hello;

//// [/home/src/workspaces/project/b.d.ts] *rewrite with same content*
//// [/home/src/workspaces/project/b.js] *rewrite with same content*
//// [/home/src/workspaces/project/c.d.ts] *rewrite with same content*
//// [/home/src/workspaces/project/c.js] *rewrite with same content*
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","errors":true,"checkPending":true,"root":["./a.ts","./b.ts","./c.ts"]}
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "errors": true,
  "checkPending": true,
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
    }
  ],
  "size": 97
}

tsconfig.json::
SemanticDiagnostics::
*not cached* /home/src/tslibs/TS/Lib/lib.d.ts
*not cached* /home/src/workspaces/project/a.ts
*not cached* /home/src/workspaces/project/b.ts
*not cached* /home/src/workspaces/project/c.ts
Signatures::
(stored at emit) /home/src/workspaces/project/a.ts
(stored at emit) /home/src/workspaces/project/b.ts
(stored at emit) /home/src/workspaces/project/c.ts


Edit [13]:: Fix `a` error with noCheck
//// [/home/src/workspaces/project/a.ts] *modified* 
export const a = "hello";

tsgo -b -v --noCheck
ExitStatus:: Success
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because buildinfo file 'tsconfig.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project 'tsconfig.json'...

//// [/home/src/workspaces/project/a.d.ts] *rewrite with same content*
//// [/home/src/workspaces/project/a.js] *modified* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.a = void 0;
exports.a = "hello";

//// [/home/src/workspaces/project/b.d.ts] *rewrite with same content*
//// [/home/src/workspaces/project/b.js] *rewrite with same content*
//// [/home/src/workspaces/project/c.d.ts] *rewrite with same content*
//// [/home/src/workspaces/project/c.js] *rewrite with same content*
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","checkPending":true,"root":["./a.ts","./b.ts","./c.ts"]}
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "checkPending": true,
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
    }
  ],
  "size": 83
}

tsconfig.json::
SemanticDiagnostics::
*not cached* /home/src/tslibs/TS/Lib/lib.d.ts
*not cached* /home/src/workspaces/project/a.ts
*not cached* /home/src/workspaces/project/b.ts
*not cached* /home/src/workspaces/project/c.ts
Signatures::
(stored at emit) /home/src/workspaces/project/a.ts
(stored at emit) /home/src/workspaces/project/b.ts
(stored at emit) /home/src/workspaces/project/c.ts


Edit [14]:: No Change run with checking

tsgo -b -v
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because buildinfo file 'tsconfig.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project 'tsconfig.json'...

[96mc.ts[0m:[93m1[0m:[93m14[0m - [91merror[0m[90m TS2322: [0mType 'string' is not assignable to type 'number'.

[7m1[0m export const c: number = "hello";
[7m [0m [91m             ~[0m


Found 1 error in c.ts[90m:1[0m

//// [/home/src/workspaces/project/a.d.ts] *rewrite with same content*
//// [/home/src/workspaces/project/a.js] *rewrite with same content*
//// [/home/src/workspaces/project/b.d.ts] *rewrite with same content*
//// [/home/src/workspaces/project/b.js] *rewrite with same content*
//// [/home/src/workspaces/project/c.d.ts] *rewrite with same content*
//// [/home/src/workspaces/project/c.js] *rewrite with same content*
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":["./a.ts","./b.ts","./c.ts"],"semanticErrors":true}
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
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
    }
  ],
  "size": 85,
  "semanticErrors": true
}

tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.d.ts
*refresh*    /home/src/workspaces/project/a.ts
*refresh*    /home/src/workspaces/project/b.ts
*refresh*    /home/src/workspaces/project/c.ts
Signatures::
(stored at emit) /home/src/workspaces/project/a.ts
(stored at emit) /home/src/workspaces/project/b.ts
(stored at emit) /home/src/workspaces/project/c.ts


Edit [15]:: no change

tsgo -b -v --noCheck
ExitStatus:: Success
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is up to date because newest input 'a.ts' is older than output 'a.js'




Edit [16]:: No Change run with checking

tsgo -b -v
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because buildinfo file 'tsconfig.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project 'tsconfig.json'...

[96mc.ts[0m:[93m1[0m:[93m14[0m - [91merror[0m[90m TS2322: [0mType 'string' is not assignable to type 'number'.

[7m1[0m export const c: number = "hello";
[7m [0m [91m             ~[0m


Found 1 error in c.ts[90m:1[0m

//// [/home/src/workspaces/project/a.d.ts] *rewrite with same content*
//// [/home/src/workspaces/project/a.js] *rewrite with same content*
//// [/home/src/workspaces/project/b.d.ts] *rewrite with same content*
//// [/home/src/workspaces/project/b.js] *rewrite with same content*
//// [/home/src/workspaces/project/c.d.ts] *rewrite with same content*
//// [/home/src/workspaces/project/c.js] *rewrite with same content*
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo] *rewrite with same content*
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt] *rewrite with same content*

tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.d.ts
*refresh*    /home/src/workspaces/project/a.ts
*refresh*    /home/src/workspaces/project/b.ts
*refresh*    /home/src/workspaces/project/c.ts
Signatures::
(stored at emit) /home/src/workspaces/project/a.ts
(stored at emit) /home/src/workspaces/project/b.ts
(stored at emit) /home/src/workspaces/project/c.ts
