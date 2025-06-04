currentDirectory:: /home/src/workspaces/project useCaseSensitiveFileNames:: false
Input::
//// [/home/src/workspaces/project/src/tsconfig.json]
{
  "compilerOptions": {
    "target": "es2016",
    "composite": true,
    "module": "node16",
    "outDir": "../out",
    "traceResolution": true
  },
  "files": [
    "main.ts",
    "fileA.ts",
    "fileB.mts",
    "randomFile.ts",
    "a/randomFile.ts",
    "b/ba/randomFile.ts",
    "b/randomFile.ts",
    "c/ca/randomFile.ts",
    "c/ca/caa/randomFile.ts",
    "c/ca/caa/caaa/randomFile.ts",
    "c/cb/randomFile.ts",
    "d/da/daa/daaa/x/y/z/randomFile.ts",
    "d/da/daa/daaa/randomFile.ts",
    "d/da/daa/randomFile.ts",
    "d/da/randomFile.ts",
    "e/ea/randomFile.ts",
    "e/ea/eaa/randomFile.ts",
    "e/ea/eaa/eaaa/randomFile.ts",
    "e/ea/eaa/eaaa/x/y/z/randomFile.ts",
    "f/fa/faa/x/y/z/randomFile.ts",
    "f/fa/faa/faaa/randomFile.ts"
  ]
}

//// [/home/src/workspaces/project/src/main.ts]
export const x = 10;

//// [/home/src/workspaces/project/src/fileA.ts]
import { foo } from "./fileB.mjs";
foo();


//// [/home/src/workspaces/project/src/fileB.mts]
export function foo() {}

//// [/home/src/workspaces/project/src/randomFile.ts]
export const x = 10;

//// [/home/src/workspaces/project/src/a/randomFile.ts]
export const x = 10;

//// [/home/src/workspaces/project/src/b/ba/randomFile.ts]
export const x = 10;

//// [/home/src/workspaces/project/src/b/randomFile.ts]
export const x = 10;

//// [/home/src/workspaces/project/src/c/ca/randomFile.ts]
export const x = 10;

//// [/home/src/workspaces/project/src/c/ca/caa/randomFile.ts]
export const x = 10;

//// [/home/src/workspaces/project/src/c/ca/caa/caaa/randomFile.ts]
export const x = 10;

//// [/home/src/workspaces/project/src/c/cb/randomFile.ts]
export const x = 10;

//// [/home/src/workspaces/project/src/d/da/daa/daaa/x/y/z/randomFile.ts]
export const x = 10;

//// [/home/src/workspaces/project/src/d/da/daa/daaa/randomFile.ts]
export const x = 10;

//// [/home/src/workspaces/project/src/d/da/daa/randomFile.ts]
export const x = 10;

//// [/home/src/workspaces/project/src/d/da/randomFile.ts]
export const x = 10;

//// [/home/src/workspaces/project/src/e/ea/randomFile.ts]
export const x = 10;

//// [/home/src/workspaces/project/src/e/ea/eaa/randomFile.ts]
export const x = 10;

//// [/home/src/workspaces/project/src/e/ea/eaa/eaaa/randomFile.ts]
export const x = 10;

//// [/home/src/workspaces/project/src/e/ea/eaa/eaaa/x/y/z/randomFile.ts]
export const x = 10;

//// [/home/src/workspaces/project/src/f/fa/faa/faaa/randomFile.ts]
export const x = 10;

//// [/home/src/workspaces/project/src/f/fa/faa/x/y/z/randomFile.ts]
export const x = 10;

//// [/home/src/workspaces/project/package.json]
{
  "name": "app",
  "version": "1.0.0"
}

//// [/home/src/tslibs/TS/Lib/lib.d.ts]
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
declare const console: { log(msg: any): void; };


/home/src/tslibs/TS/Lib/tsc.js -p /home/src/workspaces/project/src/tsconfig.json --explainFiles --extendedDiagnostics
Output::
File '/home/src/workspaces/project/src/package.json' does not exist.
Found 'package.json' at '/home/src/workspaces/project/package.json'.
File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
======== Resolving module './fileB.mjs' from '/home/src/workspaces/project/src/fileA.ts'. ========
Module resolution kind is not specified, using 'Node16'.
Resolving in CJS mode with conditions 'require', 'types', 'node'.
Loading module as file / folder, candidate module location '/home/src/workspaces/project/src/fileB.mjs', target file types: TypeScript, JavaScript, Declaration.
File name '/home/src/workspaces/project/src/fileB.mjs' has a '.mjs' extension - stripping it.
File '/home/src/workspaces/project/src/fileB.mts' exists - use it as a name resolution result.
======== Module name './fileB.mjs' was successfully resolved to '/home/src/workspaces/project/src/fileB.mts'. ========
File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
File '/home/src/workspaces/project/src/a/package.json' does not exist.
File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
File '/home/src/workspaces/project/src/b/ba/package.json' does not exist.
File '/home/src/workspaces/project/src/b/package.json' does not exist.
File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
File '/home/src/workspaces/project/src/b/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
File '/home/src/workspaces/project/src/c/ca/package.json' does not exist.
File '/home/src/workspaces/project/src/c/package.json' does not exist.
File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
File '/home/src/workspaces/project/src/c/ca/caa/package.json' does not exist.
File '/home/src/workspaces/project/src/c/ca/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/c/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
File '/home/src/workspaces/project/src/c/ca/caa/caaa/package.json' does not exist.
File '/home/src/workspaces/project/src/c/ca/caa/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/c/ca/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/c/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
File '/home/src/workspaces/project/src/c/cb/package.json' does not exist.
File '/home/src/workspaces/project/src/c/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
File '/home/src/workspaces/project/src/d/da/daa/daaa/x/y/z/package.json' does not exist.
File '/home/src/workspaces/project/src/d/da/daa/daaa/x/y/package.json' does not exist.
File '/home/src/workspaces/project/src/d/da/daa/daaa/x/package.json' does not exist.
File '/home/src/workspaces/project/src/d/da/daa/daaa/package.json' does not exist.
File '/home/src/workspaces/project/src/d/da/daa/package.json' does not exist.
File '/home/src/workspaces/project/src/d/da/package.json' does not exist.
File '/home/src/workspaces/project/src/d/package.json' does not exist.
File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
File '/home/src/workspaces/project/src/d/da/daa/daaa/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/d/da/daa/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/d/da/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/d/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
File '/home/src/workspaces/project/src/d/da/daa/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/d/da/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/d/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
File '/home/src/workspaces/project/src/d/da/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/d/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
File '/home/src/workspaces/project/src/e/ea/package.json' does not exist.
File '/home/src/workspaces/project/src/e/package.json' does not exist.
File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
File '/home/src/workspaces/project/src/e/ea/eaa/package.json' does not exist.
File '/home/src/workspaces/project/src/e/ea/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/e/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
File '/home/src/workspaces/project/src/e/ea/eaa/eaaa/package.json' does not exist.
File '/home/src/workspaces/project/src/e/ea/eaa/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/e/ea/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/e/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
File '/home/src/workspaces/project/src/e/ea/eaa/eaaa/x/y/z/package.json' does not exist.
File '/home/src/workspaces/project/src/e/ea/eaa/eaaa/x/y/package.json' does not exist.
File '/home/src/workspaces/project/src/e/ea/eaa/eaaa/x/package.json' does not exist.
File '/home/src/workspaces/project/src/e/ea/eaa/eaaa/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/e/ea/eaa/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/e/ea/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/e/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
File '/home/src/workspaces/project/src/f/fa/faa/x/y/z/package.json' does not exist.
File '/home/src/workspaces/project/src/f/fa/faa/x/y/package.json' does not exist.
File '/home/src/workspaces/project/src/f/fa/faa/x/package.json' does not exist.
File '/home/src/workspaces/project/src/f/fa/faa/package.json' does not exist.
File '/home/src/workspaces/project/src/f/fa/package.json' does not exist.
File '/home/src/workspaces/project/src/f/package.json' does not exist.
File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
File '/home/src/workspaces/project/src/f/fa/faa/faaa/package.json' does not exist.
File '/home/src/workspaces/project/src/f/fa/faa/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/f/fa/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/f/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
File '/home/src/tslibs/TS/Lib/package.json' does not exist.
File '/home/src/tslibs/TS/package.json' does not exist.
File '/home/src/tslibs/package.json' does not exist.
File '/home/src/package.json' does not exist.
File '/home/package.json' does not exist.
File '/package.json' does not exist.
[96msrc/fileA.ts[0m:[93m1[0m:[93m21[0m - [91merror[0m[90m TS1479: [0mThe current file is a CommonJS module whose imports will produce 'require' calls; however, the referenced file is an ECMAScript module and cannot be imported with 'require'. Consider writing a dynamic 'import("./fileB.mjs")' call instead.
  To convert this file to an ECMAScript module, change its file extension to '.mts', or add the field `"type": "module"` to '/home/src/workspaces/project/package.json'.

[7m1[0m import { foo } from "./fileB.mjs";
[7m [0m [91m                    ~~~~~~~~~~~~~[0m

../../tslibs/TS/Lib/lib.es2016.full.d.ts
  Default library for target 'es2016'
src/main.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' does not have field "type"
src/fileB.mts
  Imported via "./fileB.mjs" from file 'src/fileA.ts'
  Part of 'files' list in tsconfig.json
src/fileA.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' does not have field "type"
src/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' does not have field "type"
src/a/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' does not have field "type"
src/b/ba/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' does not have field "type"
src/b/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' does not have field "type"
src/c/ca/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' does not have field "type"
src/c/ca/caa/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' does not have field "type"
src/c/ca/caa/caaa/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' does not have field "type"
src/c/cb/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' does not have field "type"
src/d/da/daa/daaa/x/y/z/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' does not have field "type"
src/d/da/daa/daaa/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' does not have field "type"
src/d/da/daa/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' does not have field "type"
src/d/da/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' does not have field "type"
src/e/ea/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' does not have field "type"
src/e/ea/eaa/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' does not have field "type"
src/e/ea/eaa/eaaa/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' does not have field "type"
src/e/ea/eaa/eaaa/x/y/z/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' does not have field "type"
src/f/fa/faa/x/y/z/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' does not have field "type"
src/f/fa/faa/faaa/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' does not have field "type"

Found 1 error in src/fileA.ts[90m:1[0m



//// [/home/src/tslibs/TS/Lib/lib.es2016.full.d.ts] *Lib*

//// [/home/src/workspaces/project/out/main.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = 10;


//// [/home/src/workspaces/project/out/main.d.ts]
export declare const x = 10;


//// [/home/src/workspaces/project/out/fileB.mjs]
export function foo() { }


//// [/home/src/workspaces/project/out/fileB.d.mts]
export declare function foo(): void;


//// [/home/src/workspaces/project/out/fileA.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fileB_mjs_1 = require("./fileB.mjs");
(0, fileB_mjs_1.foo)();


//// [/home/src/workspaces/project/out/fileA.d.ts]
export {};


//// [/home/src/workspaces/project/out/randomFile.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = 10;


//// [/home/src/workspaces/project/out/randomFile.d.ts]
export declare const x = 10;


//// [/home/src/workspaces/project/out/a/randomFile.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = 10;


//// [/home/src/workspaces/project/out/a/randomFile.d.ts]
export declare const x = 10;


//// [/home/src/workspaces/project/out/b/ba/randomFile.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = 10;


//// [/home/src/workspaces/project/out/b/ba/randomFile.d.ts]
export declare const x = 10;


//// [/home/src/workspaces/project/out/b/randomFile.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = 10;


//// [/home/src/workspaces/project/out/b/randomFile.d.ts]
export declare const x = 10;


//// [/home/src/workspaces/project/out/c/ca/randomFile.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = 10;


//// [/home/src/workspaces/project/out/c/ca/randomFile.d.ts]
export declare const x = 10;


//// [/home/src/workspaces/project/out/c/ca/caa/randomFile.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = 10;


//// [/home/src/workspaces/project/out/c/ca/caa/randomFile.d.ts]
export declare const x = 10;


//// [/home/src/workspaces/project/out/c/ca/caa/caaa/randomFile.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = 10;


//// [/home/src/workspaces/project/out/c/ca/caa/caaa/randomFile.d.ts]
export declare const x = 10;


//// [/home/src/workspaces/project/out/c/cb/randomFile.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = 10;


//// [/home/src/workspaces/project/out/c/cb/randomFile.d.ts]
export declare const x = 10;


//// [/home/src/workspaces/project/out/d/da/daa/daaa/x/y/z/randomFile.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = 10;


//// [/home/src/workspaces/project/out/d/da/daa/daaa/x/y/z/randomFile.d.ts]
export declare const x = 10;


//// [/home/src/workspaces/project/out/d/da/daa/daaa/randomFile.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = 10;


//// [/home/src/workspaces/project/out/d/da/daa/daaa/randomFile.d.ts]
export declare const x = 10;


//// [/home/src/workspaces/project/out/d/da/daa/randomFile.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = 10;


//// [/home/src/workspaces/project/out/d/da/daa/randomFile.d.ts]
export declare const x = 10;


//// [/home/src/workspaces/project/out/d/da/randomFile.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = 10;


//// [/home/src/workspaces/project/out/d/da/randomFile.d.ts]
export declare const x = 10;


//// [/home/src/workspaces/project/out/e/ea/randomFile.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = 10;


//// [/home/src/workspaces/project/out/e/ea/randomFile.d.ts]
export declare const x = 10;


//// [/home/src/workspaces/project/out/e/ea/eaa/randomFile.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = 10;


//// [/home/src/workspaces/project/out/e/ea/eaa/randomFile.d.ts]
export declare const x = 10;


//// [/home/src/workspaces/project/out/e/ea/eaa/eaaa/randomFile.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = 10;


//// [/home/src/workspaces/project/out/e/ea/eaa/eaaa/randomFile.d.ts]
export declare const x = 10;


//// [/home/src/workspaces/project/out/e/ea/eaa/eaaa/x/y/z/randomFile.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = 10;


//// [/home/src/workspaces/project/out/e/ea/eaa/eaaa/x/y/z/randomFile.d.ts]
export declare const x = 10;


//// [/home/src/workspaces/project/out/f/fa/faa/x/y/z/randomFile.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = 10;


//// [/home/src/workspaces/project/out/f/fa/faa/x/y/z/randomFile.d.ts]
export declare const x = 10;


//// [/home/src/workspaces/project/out/f/fa/faa/faaa/randomFile.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = 10;


//// [/home/src/workspaces/project/out/f/fa/faa/faaa/randomFile.d.ts]
export declare const x = 10;


//// [/home/src/workspaces/project/out/tsconfig.tsbuildinfo]
{"fileNames":["../../../tslibs/ts/lib/lib.es2016.full.d.ts","../src/main.ts","../src/fileb.mts","../src/filea.ts","../src/randomfile.ts","../src/a/randomfile.ts","../src/b/ba/randomfile.ts","../src/b/randomfile.ts","../src/c/ca/randomfile.ts","../src/c/ca/caa/randomfile.ts","../src/c/ca/caa/caaa/randomfile.ts","../src/c/cb/randomfile.ts","../src/d/da/daa/daaa/x/y/z/randomfile.ts","../src/d/da/daa/daaa/randomfile.ts","../src/d/da/daa/randomfile.ts","../src/d/da/randomfile.ts","../src/e/ea/randomfile.ts","../src/e/ea/eaa/randomfile.ts","../src/e/ea/eaa/eaaa/randomfile.ts","../src/e/ea/eaa/eaaa/x/y/z/randomfile.ts","../src/f/fa/faa/x/y/z/randomfile.ts","../src/f/fa/faa/faaa/randomfile.ts"],"fileIdsList":[[3]],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedFormat":1},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":1},{"version":"3524703962-export function foo() {}","signature":"-5677608893-export declare function foo(): void;\n","impliedFormat":99},{"version":"-5325347830-import { foo } from \"./fileB.mjs\";\nfoo();\n","signature":"-3531856636-export {};\n","impliedFormat":1},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":1},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":1},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":1},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":1},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":1},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":1},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":1},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":1},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":1},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":1},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":1},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":1},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":1},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":1},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":1},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":1},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":1},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":1}],"root":[[2,22]],"options":{"composite":true,"module":100,"outDir":"./","target":3},"referencedMap":[[4,1]],"semanticDiagnosticsPerFile":[[4,[{"start":20,"length":13,"code":1479,"category":1,"messageText":{"messageText":"The current file is a CommonJS module whose imports will produce 'require' calls; however, the referenced file is an ECMAScript module and cannot be imported with 'require'. Consider writing a dynamic 'import(\"./fileB.mjs\")' call instead.","category":1,"code":1479,"next":[{"info":true}]}}]]],"latestChangedDtsFile":"./f/fa/faa/faaa/randomFile.d.ts","version":"FakeTSVersion"}

//// [/home/src/workspaces/project/out/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../tslibs/ts/lib/lib.es2016.full.d.ts",
    "../src/main.ts",
    "../src/fileb.mts",
    "../src/filea.ts",
    "../src/randomfile.ts",
    "../src/a/randomfile.ts",
    "../src/b/ba/randomfile.ts",
    "../src/b/randomfile.ts",
    "../src/c/ca/randomfile.ts",
    "../src/c/ca/caa/randomfile.ts",
    "../src/c/ca/caa/caaa/randomfile.ts",
    "../src/c/cb/randomfile.ts",
    "../src/d/da/daa/daaa/x/y/z/randomfile.ts",
    "../src/d/da/daa/daaa/randomfile.ts",
    "../src/d/da/daa/randomfile.ts",
    "../src/d/da/randomfile.ts",
    "../src/e/ea/randomfile.ts",
    "../src/e/ea/eaa/randomfile.ts",
    "../src/e/ea/eaa/eaaa/randomfile.ts",
    "../src/e/ea/eaa/eaaa/x/y/z/randomfile.ts",
    "../src/f/fa/faa/x/y/z/randomfile.ts",
    "../src/f/fa/faa/faaa/randomfile.ts"
  ],
  "fileIdsList": [
    [
      "../src/fileb.mts"
    ]
  ],
  "fileInfos": {
    "../../../tslibs/ts/lib/lib.es2016.full.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true,
        "impliedFormat": 1
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true,
      "impliedFormat": "commonjs"
    },
    "../src/main.ts": {
      "original": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": 1
      },
      "version": "-10726455937-export const x = 10;",
      "signature": "-6821242887-export declare const x = 10;\n",
      "impliedFormat": "commonjs"
    },
    "../src/fileb.mts": {
      "original": {
        "version": "3524703962-export function foo() {}",
        "signature": "-5677608893-export declare function foo(): void;\n",
        "impliedFormat": 99
      },
      "version": "3524703962-export function foo() {}",
      "signature": "-5677608893-export declare function foo(): void;\n",
      "impliedFormat": "esnext"
    },
    "../src/filea.ts": {
      "original": {
        "version": "-5325347830-import { foo } from \"./fileB.mjs\";\nfoo();\n",
        "signature": "-3531856636-export {};\n",
        "impliedFormat": 1
      },
      "version": "-5325347830-import { foo } from \"./fileB.mjs\";\nfoo();\n",
      "signature": "-3531856636-export {};\n",
      "impliedFormat": "commonjs"
    },
    "../src/randomfile.ts": {
      "original": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": 1
      },
      "version": "-10726455937-export const x = 10;",
      "signature": "-6821242887-export declare const x = 10;\n",
      "impliedFormat": "commonjs"
    },
    "../src/a/randomfile.ts": {
      "original": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": 1
      },
      "version": "-10726455937-export const x = 10;",
      "signature": "-6821242887-export declare const x = 10;\n",
      "impliedFormat": "commonjs"
    },
    "../src/b/ba/randomfile.ts": {
      "original": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": 1
      },
      "version": "-10726455937-export const x = 10;",
      "signature": "-6821242887-export declare const x = 10;\n",
      "impliedFormat": "commonjs"
    },
    "../src/b/randomfile.ts": {
      "original": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": 1
      },
      "version": "-10726455937-export const x = 10;",
      "signature": "-6821242887-export declare const x = 10;\n",
      "impliedFormat": "commonjs"
    },
    "../src/c/ca/randomfile.ts": {
      "original": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": 1
      },
      "version": "-10726455937-export const x = 10;",
      "signature": "-6821242887-export declare const x = 10;\n",
      "impliedFormat": "commonjs"
    },
    "../src/c/ca/caa/randomfile.ts": {
      "original": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": 1
      },
      "version": "-10726455937-export const x = 10;",
      "signature": "-6821242887-export declare const x = 10;\n",
      "impliedFormat": "commonjs"
    },
    "../src/c/ca/caa/caaa/randomfile.ts": {
      "original": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": 1
      },
      "version": "-10726455937-export const x = 10;",
      "signature": "-6821242887-export declare const x = 10;\n",
      "impliedFormat": "commonjs"
    },
    "../src/c/cb/randomfile.ts": {
      "original": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": 1
      },
      "version": "-10726455937-export const x = 10;",
      "signature": "-6821242887-export declare const x = 10;\n",
      "impliedFormat": "commonjs"
    },
    "../src/d/da/daa/daaa/x/y/z/randomfile.ts": {
      "original": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": 1
      },
      "version": "-10726455937-export const x = 10;",
      "signature": "-6821242887-export declare const x = 10;\n",
      "impliedFormat": "commonjs"
    },
    "../src/d/da/daa/daaa/randomfile.ts": {
      "original": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": 1
      },
      "version": "-10726455937-export const x = 10;",
      "signature": "-6821242887-export declare const x = 10;\n",
      "impliedFormat": "commonjs"
    },
    "../src/d/da/daa/randomfile.ts": {
      "original": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": 1
      },
      "version": "-10726455937-export const x = 10;",
      "signature": "-6821242887-export declare const x = 10;\n",
      "impliedFormat": "commonjs"
    },
    "../src/d/da/randomfile.ts": {
      "original": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": 1
      },
      "version": "-10726455937-export const x = 10;",
      "signature": "-6821242887-export declare const x = 10;\n",
      "impliedFormat": "commonjs"
    },
    "../src/e/ea/randomfile.ts": {
      "original": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": 1
      },
      "version": "-10726455937-export const x = 10;",
      "signature": "-6821242887-export declare const x = 10;\n",
      "impliedFormat": "commonjs"
    },
    "../src/e/ea/eaa/randomfile.ts": {
      "original": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": 1
      },
      "version": "-10726455937-export const x = 10;",
      "signature": "-6821242887-export declare const x = 10;\n",
      "impliedFormat": "commonjs"
    },
    "../src/e/ea/eaa/eaaa/randomfile.ts": {
      "original": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": 1
      },
      "version": "-10726455937-export const x = 10;",
      "signature": "-6821242887-export declare const x = 10;\n",
      "impliedFormat": "commonjs"
    },
    "../src/e/ea/eaa/eaaa/x/y/z/randomfile.ts": {
      "original": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": 1
      },
      "version": "-10726455937-export const x = 10;",
      "signature": "-6821242887-export declare const x = 10;\n",
      "impliedFormat": "commonjs"
    },
    "../src/f/fa/faa/x/y/z/randomfile.ts": {
      "original": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": 1
      },
      "version": "-10726455937-export const x = 10;",
      "signature": "-6821242887-export declare const x = 10;\n",
      "impliedFormat": "commonjs"
    },
    "../src/f/fa/faa/faaa/randomfile.ts": {
      "original": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": 1
      },
      "version": "-10726455937-export const x = 10;",
      "signature": "-6821242887-export declare const x = 10;\n",
      "impliedFormat": "commonjs"
    }
  },
  "root": [
    [
      [
        2,
        22
      ],
      [
        "../src/main.ts",
        "../src/fileb.mts",
        "../src/filea.ts",
        "../src/randomfile.ts",
        "../src/a/randomfile.ts",
        "../src/b/ba/randomfile.ts",
        "../src/b/randomfile.ts",
        "../src/c/ca/randomfile.ts",
        "../src/c/ca/caa/randomfile.ts",
        "../src/c/ca/caa/caaa/randomfile.ts",
        "../src/c/cb/randomfile.ts",
        "../src/d/da/daa/daaa/x/y/z/randomfile.ts",
        "../src/d/da/daa/daaa/randomfile.ts",
        "../src/d/da/daa/randomfile.ts",
        "../src/d/da/randomfile.ts",
        "../src/e/ea/randomfile.ts",
        "../src/e/ea/eaa/randomfile.ts",
        "../src/e/ea/eaa/eaaa/randomfile.ts",
        "../src/e/ea/eaa/eaaa/x/y/z/randomfile.ts",
        "../src/f/fa/faa/x/y/z/randomfile.ts",
        "../src/f/fa/faa/faaa/randomfile.ts"
      ]
    ]
  ],
  "options": {
    "composite": true,
    "module": 100,
    "outDir": "./",
    "target": 3
  },
  "referencedMap": {
    "../src/filea.ts": [
      "../src/fileb.mts"
    ]
  },
  "semanticDiagnosticsPerFile": [
    [
      "../src/filea.ts",
      [
        {
          "start": 20,
          "length": 13,
          "code": 1479,
          "category": 1,
          "messageText": {
            "messageText": "The current file is a CommonJS module whose imports will produce 'require' calls; however, the referenced file is an ECMAScript module and cannot be imported with 'require'. Consider writing a dynamic 'import(\"./fileB.mjs\")' call instead.",
            "category": 1,
            "code": 1479,
            "next": [
              {
                "info": true
              }
            ]
          }
        }
      ]
    ]
  ],
  "latestChangedDtsFile": "./f/fa/faa/faaa/randomFile.d.ts",
  "version": "FakeTSVersion",
  "size": 4426
}


exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated

Change:: random edit

Input::
//// [/home/src/workspaces/project/src/randomFile.ts]
export const x = 10;export const y = 10;


/home/src/tslibs/TS/Lib/tsc.js -p /home/src/workspaces/project/src/tsconfig.json --explainFiles --extendedDiagnostics
Output::
File '/home/src/workspaces/project/src/package.json' does not exist.
Found 'package.json' at '/home/src/workspaces/project/package.json'.
File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
======== Resolving module './fileB.mjs' from '/home/src/workspaces/project/src/fileA.ts'. ========
Module resolution kind is not specified, using 'Node16'.
Resolving in CJS mode with conditions 'require', 'types', 'node'.
Loading module as file / folder, candidate module location '/home/src/workspaces/project/src/fileB.mjs', target file types: TypeScript, JavaScript, Declaration.
File name '/home/src/workspaces/project/src/fileB.mjs' has a '.mjs' extension - stripping it.
File '/home/src/workspaces/project/src/fileB.mts' exists - use it as a name resolution result.
======== Module name './fileB.mjs' was successfully resolved to '/home/src/workspaces/project/src/fileB.mts'. ========
File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
File '/home/src/workspaces/project/src/a/package.json' does not exist.
File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
File '/home/src/workspaces/project/src/b/ba/package.json' does not exist.
File '/home/src/workspaces/project/src/b/package.json' does not exist.
File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
File '/home/src/workspaces/project/src/b/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
File '/home/src/workspaces/project/src/c/ca/package.json' does not exist.
File '/home/src/workspaces/project/src/c/package.json' does not exist.
File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
File '/home/src/workspaces/project/src/c/ca/caa/package.json' does not exist.
File '/home/src/workspaces/project/src/c/ca/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/c/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
File '/home/src/workspaces/project/src/c/ca/caa/caaa/package.json' does not exist.
File '/home/src/workspaces/project/src/c/ca/caa/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/c/ca/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/c/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
File '/home/src/workspaces/project/src/c/cb/package.json' does not exist.
File '/home/src/workspaces/project/src/c/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
File '/home/src/workspaces/project/src/d/da/daa/daaa/x/y/z/package.json' does not exist.
File '/home/src/workspaces/project/src/d/da/daa/daaa/x/y/package.json' does not exist.
File '/home/src/workspaces/project/src/d/da/daa/daaa/x/package.json' does not exist.
File '/home/src/workspaces/project/src/d/da/daa/daaa/package.json' does not exist.
File '/home/src/workspaces/project/src/d/da/daa/package.json' does not exist.
File '/home/src/workspaces/project/src/d/da/package.json' does not exist.
File '/home/src/workspaces/project/src/d/package.json' does not exist.
File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
File '/home/src/workspaces/project/src/d/da/daa/daaa/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/d/da/daa/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/d/da/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/d/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
File '/home/src/workspaces/project/src/d/da/daa/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/d/da/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/d/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
File '/home/src/workspaces/project/src/d/da/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/d/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
File '/home/src/workspaces/project/src/e/ea/package.json' does not exist.
File '/home/src/workspaces/project/src/e/package.json' does not exist.
File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
File '/home/src/workspaces/project/src/e/ea/eaa/package.json' does not exist.
File '/home/src/workspaces/project/src/e/ea/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/e/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
File '/home/src/workspaces/project/src/e/ea/eaa/eaaa/package.json' does not exist.
File '/home/src/workspaces/project/src/e/ea/eaa/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/e/ea/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/e/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
File '/home/src/workspaces/project/src/e/ea/eaa/eaaa/x/y/z/package.json' does not exist.
File '/home/src/workspaces/project/src/e/ea/eaa/eaaa/x/y/package.json' does not exist.
File '/home/src/workspaces/project/src/e/ea/eaa/eaaa/x/package.json' does not exist.
File '/home/src/workspaces/project/src/e/ea/eaa/eaaa/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/e/ea/eaa/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/e/ea/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/e/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
File '/home/src/workspaces/project/src/f/fa/faa/x/y/z/package.json' does not exist.
File '/home/src/workspaces/project/src/f/fa/faa/x/y/package.json' does not exist.
File '/home/src/workspaces/project/src/f/fa/faa/x/package.json' does not exist.
File '/home/src/workspaces/project/src/f/fa/faa/package.json' does not exist.
File '/home/src/workspaces/project/src/f/fa/package.json' does not exist.
File '/home/src/workspaces/project/src/f/package.json' does not exist.
File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
File '/home/src/workspaces/project/src/f/fa/faa/faaa/package.json' does not exist.
File '/home/src/workspaces/project/src/f/fa/faa/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/f/fa/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/f/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
File '/home/src/tslibs/TS/Lib/package.json' does not exist.
File '/home/src/tslibs/TS/package.json' does not exist.
File '/home/src/tslibs/package.json' does not exist.
File '/home/src/package.json' does not exist.
File '/home/package.json' does not exist.
File '/package.json' does not exist.
[96msrc/fileA.ts[0m:[93m1[0m:[93m21[0m - [91merror[0m[90m TS1479: [0mThe current file is a CommonJS module whose imports will produce 'require' calls; however, the referenced file is an ECMAScript module and cannot be imported with 'require'. Consider writing a dynamic 'import("./fileB.mjs")' call instead.
  To convert this file to an ECMAScript module, change its file extension to '.mts', or add the field `"type": "module"` to '/home/src/workspaces/project/package.json'.

[7m1[0m import { foo } from "./fileB.mjs";
[7m [0m [91m                    ~~~~~~~~~~~~~[0m

../../tslibs/TS/Lib/lib.es2016.full.d.ts
  Default library for target 'es2016'
src/main.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' does not have field "type"
src/fileB.mts
  Imported via "./fileB.mjs" from file 'src/fileA.ts'
  Part of 'files' list in tsconfig.json
src/fileA.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' does not have field "type"
src/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' does not have field "type"
src/a/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' does not have field "type"
src/b/ba/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' does not have field "type"
src/b/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' does not have field "type"
src/c/ca/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' does not have field "type"
src/c/ca/caa/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' does not have field "type"
src/c/ca/caa/caaa/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' does not have field "type"
src/c/cb/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' does not have field "type"
src/d/da/daa/daaa/x/y/z/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' does not have field "type"
src/d/da/daa/daaa/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' does not have field "type"
src/d/da/daa/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' does not have field "type"
src/d/da/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' does not have field "type"
src/e/ea/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' does not have field "type"
src/e/ea/eaa/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' does not have field "type"
src/e/ea/eaa/eaaa/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' does not have field "type"
src/e/ea/eaa/eaaa/x/y/z/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' does not have field "type"
src/f/fa/faa/x/y/z/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' does not have field "type"
src/f/fa/faa/faaa/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' does not have field "type"

Found 1 error in src/fileA.ts[90m:1[0m



//// [/home/src/workspaces/project/out/randomFile.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.y = exports.x = void 0;
exports.x = 10;
exports.y = 10;


//// [/home/src/workspaces/project/out/randomFile.d.ts]
export declare const x = 10;
export declare const y = 10;


//// [/home/src/workspaces/project/out/tsconfig.tsbuildinfo]
{"fileNames":["../../../tslibs/ts/lib/lib.es2016.full.d.ts","../src/main.ts","../src/fileb.mts","../src/filea.ts","../src/randomfile.ts","../src/a/randomfile.ts","../src/b/ba/randomfile.ts","../src/b/randomfile.ts","../src/c/ca/randomfile.ts","../src/c/ca/caa/randomfile.ts","../src/c/ca/caa/caaa/randomfile.ts","../src/c/cb/randomfile.ts","../src/d/da/daa/daaa/x/y/z/randomfile.ts","../src/d/da/daa/daaa/randomfile.ts","../src/d/da/daa/randomfile.ts","../src/d/da/randomfile.ts","../src/e/ea/randomfile.ts","../src/e/ea/eaa/randomfile.ts","../src/e/ea/eaa/eaaa/randomfile.ts","../src/e/ea/eaa/eaaa/x/y/z/randomfile.ts","../src/f/fa/faa/x/y/z/randomfile.ts","../src/f/fa/faa/faaa/randomfile.ts"],"fileIdsList":[[3]],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedFormat":1},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":1},{"version":"3524703962-export function foo() {}","signature":"-5677608893-export declare function foo(): void;\n","impliedFormat":99},{"version":"-5325347830-import { foo } from \"./fileB.mjs\";\nfoo();\n","signature":"-3531856636-export {};\n","impliedFormat":1},{"version":"-9547279430-export const x = 10;export const y = 10;","signature":"-18799098802-export declare const x = 10;\nexport declare const y = 10;\n","impliedFormat":1},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":1},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":1},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":1},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":1},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":1},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":1},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":1},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":1},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":1},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":1},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":1},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":1},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":1},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":1},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":1},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":1},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":1}],"root":[[2,22]],"options":{"composite":true,"module":100,"outDir":"./","target":3},"referencedMap":[[4,1]],"semanticDiagnosticsPerFile":[[4,[{"start":20,"length":13,"code":1479,"category":1,"messageText":{"messageText":"The current file is a CommonJS module whose imports will produce 'require' calls; however, the referenced file is an ECMAScript module and cannot be imported with 'require'. Consider writing a dynamic 'import(\"./fileB.mjs\")' call instead.","category":1,"code":1479,"next":[{"info":true}]}}]]],"latestChangedDtsFile":"./randomFile.d.ts","version":"FakeTSVersion"}

//// [/home/src/workspaces/project/out/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../tslibs/ts/lib/lib.es2016.full.d.ts",
    "../src/main.ts",
    "../src/fileb.mts",
    "../src/filea.ts",
    "../src/randomfile.ts",
    "../src/a/randomfile.ts",
    "../src/b/ba/randomfile.ts",
    "../src/b/randomfile.ts",
    "../src/c/ca/randomfile.ts",
    "../src/c/ca/caa/randomfile.ts",
    "../src/c/ca/caa/caaa/randomfile.ts",
    "../src/c/cb/randomfile.ts",
    "../src/d/da/daa/daaa/x/y/z/randomfile.ts",
    "../src/d/da/daa/daaa/randomfile.ts",
    "../src/d/da/daa/randomfile.ts",
    "../src/d/da/randomfile.ts",
    "../src/e/ea/randomfile.ts",
    "../src/e/ea/eaa/randomfile.ts",
    "../src/e/ea/eaa/eaaa/randomfile.ts",
    "../src/e/ea/eaa/eaaa/x/y/z/randomfile.ts",
    "../src/f/fa/faa/x/y/z/randomfile.ts",
    "../src/f/fa/faa/faaa/randomfile.ts"
  ],
  "fileIdsList": [
    [
      "../src/fileb.mts"
    ]
  ],
  "fileInfos": {
    "../../../tslibs/ts/lib/lib.es2016.full.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true,
        "impliedFormat": 1
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true,
      "impliedFormat": "commonjs"
    },
    "../src/main.ts": {
      "original": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": 1
      },
      "version": "-10726455937-export const x = 10;",
      "signature": "-6821242887-export declare const x = 10;\n",
      "impliedFormat": "commonjs"
    },
    "../src/fileb.mts": {
      "original": {
        "version": "3524703962-export function foo() {}",
        "signature": "-5677608893-export declare function foo(): void;\n",
        "impliedFormat": 99
      },
      "version": "3524703962-export function foo() {}",
      "signature": "-5677608893-export declare function foo(): void;\n",
      "impliedFormat": "esnext"
    },
    "../src/filea.ts": {
      "original": {
        "version": "-5325347830-import { foo } from \"./fileB.mjs\";\nfoo();\n",
        "signature": "-3531856636-export {};\n",
        "impliedFormat": 1
      },
      "version": "-5325347830-import { foo } from \"./fileB.mjs\";\nfoo();\n",
      "signature": "-3531856636-export {};\n",
      "impliedFormat": "commonjs"
    },
    "../src/randomfile.ts": {
      "original": {
        "version": "-9547279430-export const x = 10;export const y = 10;",
        "signature": "-18799098802-export declare const x = 10;\nexport declare const y = 10;\n",
        "impliedFormat": 1
      },
      "version": "-9547279430-export const x = 10;export const y = 10;",
      "signature": "-18799098802-export declare const x = 10;\nexport declare const y = 10;\n",
      "impliedFormat": "commonjs"
    },
    "../src/a/randomfile.ts": {
      "original": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": 1
      },
      "version": "-10726455937-export const x = 10;",
      "signature": "-6821242887-export declare const x = 10;\n",
      "impliedFormat": "commonjs"
    },
    "../src/b/ba/randomfile.ts": {
      "original": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": 1
      },
      "version": "-10726455937-export const x = 10;",
      "signature": "-6821242887-export declare const x = 10;\n",
      "impliedFormat": "commonjs"
    },
    "../src/b/randomfile.ts": {
      "original": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": 1
      },
      "version": "-10726455937-export const x = 10;",
      "signature": "-6821242887-export declare const x = 10;\n",
      "impliedFormat": "commonjs"
    },
    "../src/c/ca/randomfile.ts": {
      "original": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": 1
      },
      "version": "-10726455937-export const x = 10;",
      "signature": "-6821242887-export declare const x = 10;\n",
      "impliedFormat": "commonjs"
    },
    "../src/c/ca/caa/randomfile.ts": {
      "original": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": 1
      },
      "version": "-10726455937-export const x = 10;",
      "signature": "-6821242887-export declare const x = 10;\n",
      "impliedFormat": "commonjs"
    },
    "../src/c/ca/caa/caaa/randomfile.ts": {
      "original": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": 1
      },
      "version": "-10726455937-export const x = 10;",
      "signature": "-6821242887-export declare const x = 10;\n",
      "impliedFormat": "commonjs"
    },
    "../src/c/cb/randomfile.ts": {
      "original": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": 1
      },
      "version": "-10726455937-export const x = 10;",
      "signature": "-6821242887-export declare const x = 10;\n",
      "impliedFormat": "commonjs"
    },
    "../src/d/da/daa/daaa/x/y/z/randomfile.ts": {
      "original": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": 1
      },
      "version": "-10726455937-export const x = 10;",
      "signature": "-6821242887-export declare const x = 10;\n",
      "impliedFormat": "commonjs"
    },
    "../src/d/da/daa/daaa/randomfile.ts": {
      "original": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": 1
      },
      "version": "-10726455937-export const x = 10;",
      "signature": "-6821242887-export declare const x = 10;\n",
      "impliedFormat": "commonjs"
    },
    "../src/d/da/daa/randomfile.ts": {
      "original": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": 1
      },
      "version": "-10726455937-export const x = 10;",
      "signature": "-6821242887-export declare const x = 10;\n",
      "impliedFormat": "commonjs"
    },
    "../src/d/da/randomfile.ts": {
      "original": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": 1
      },
      "version": "-10726455937-export const x = 10;",
      "signature": "-6821242887-export declare const x = 10;\n",
      "impliedFormat": "commonjs"
    },
    "../src/e/ea/randomfile.ts": {
      "original": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": 1
      },
      "version": "-10726455937-export const x = 10;",
      "signature": "-6821242887-export declare const x = 10;\n",
      "impliedFormat": "commonjs"
    },
    "../src/e/ea/eaa/randomfile.ts": {
      "original": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": 1
      },
      "version": "-10726455937-export const x = 10;",
      "signature": "-6821242887-export declare const x = 10;\n",
      "impliedFormat": "commonjs"
    },
    "../src/e/ea/eaa/eaaa/randomfile.ts": {
      "original": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": 1
      },
      "version": "-10726455937-export const x = 10;",
      "signature": "-6821242887-export declare const x = 10;\n",
      "impliedFormat": "commonjs"
    },
    "../src/e/ea/eaa/eaaa/x/y/z/randomfile.ts": {
      "original": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": 1
      },
      "version": "-10726455937-export const x = 10;",
      "signature": "-6821242887-export declare const x = 10;\n",
      "impliedFormat": "commonjs"
    },
    "../src/f/fa/faa/x/y/z/randomfile.ts": {
      "original": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": 1
      },
      "version": "-10726455937-export const x = 10;",
      "signature": "-6821242887-export declare const x = 10;\n",
      "impliedFormat": "commonjs"
    },
    "../src/f/fa/faa/faaa/randomfile.ts": {
      "original": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": 1
      },
      "version": "-10726455937-export const x = 10;",
      "signature": "-6821242887-export declare const x = 10;\n",
      "impliedFormat": "commonjs"
    }
  },
  "root": [
    [
      [
        2,
        22
      ],
      [
        "../src/main.ts",
        "../src/fileb.mts",
        "../src/filea.ts",
        "../src/randomfile.ts",
        "../src/a/randomfile.ts",
        "../src/b/ba/randomfile.ts",
        "../src/b/randomfile.ts",
        "../src/c/ca/randomfile.ts",
        "../src/c/ca/caa/randomfile.ts",
        "../src/c/ca/caa/caaa/randomfile.ts",
        "../src/c/cb/randomfile.ts",
        "../src/d/da/daa/daaa/x/y/z/randomfile.ts",
        "../src/d/da/daa/daaa/randomfile.ts",
        "../src/d/da/daa/randomfile.ts",
        "../src/d/da/randomfile.ts",
        "../src/e/ea/randomfile.ts",
        "../src/e/ea/eaa/randomfile.ts",
        "../src/e/ea/eaa/eaaa/randomfile.ts",
        "../src/e/ea/eaa/eaaa/x/y/z/randomfile.ts",
        "../src/f/fa/faa/x/y/z/randomfile.ts",
        "../src/f/fa/faa/faaa/randomfile.ts"
      ]
    ]
  ],
  "options": {
    "composite": true,
    "module": 100,
    "outDir": "./",
    "target": 3
  },
  "referencedMap": {
    "../src/filea.ts": [
      "../src/fileb.mts"
    ]
  },
  "semanticDiagnosticsPerFile": [
    [
      "../src/filea.ts",
      [
        {
          "start": 20,
          "length": 13,
          "code": 1479,
          "category": 1,
          "messageText": {
            "messageText": "The current file is a CommonJS module whose imports will produce 'require' calls; however, the referenced file is an ECMAScript module and cannot be imported with 'require'. Consider writing a dynamic 'import(\"./fileB.mjs\")' call instead.",
            "category": 1,
            "code": 1479,
            "next": [
              {
                "info": true
              }
            ]
          }
        }
      ]
    ]
  ],
  "latestChangedDtsFile": "./randomFile.d.ts",
  "version": "FakeTSVersion",
  "size": 4462
}


exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated

Change:: Modify package json file to add type module

Input::
//// [/home/src/workspaces/project/package.json]
{
  "name": "app",
  "version": "1.0.0",
  "type": "module"
}


/home/src/tslibs/TS/Lib/tsc.js -p /home/src/workspaces/project/src/tsconfig.json --explainFiles --extendedDiagnostics
Output::
File '/home/src/workspaces/project/src/package.json' does not exist.
Found 'package.json' at '/home/src/workspaces/project/package.json'.
File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
======== Resolving module './fileB.mjs' from '/home/src/workspaces/project/src/fileA.ts'. ========
Module resolution kind is not specified, using 'Node16'.
Resolving in ESM mode with conditions 'import', 'types', 'node'.
Loading module as file / folder, candidate module location '/home/src/workspaces/project/src/fileB.mjs', target file types: TypeScript, JavaScript, Declaration.
File name '/home/src/workspaces/project/src/fileB.mjs' has a '.mjs' extension - stripping it.
File '/home/src/workspaces/project/src/fileB.mts' exists - use it as a name resolution result.
======== Module name './fileB.mjs' was successfully resolved to '/home/src/workspaces/project/src/fileB.mts'. ========
File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
File '/home/src/workspaces/project/src/a/package.json' does not exist.
File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
File '/home/src/workspaces/project/src/b/ba/package.json' does not exist.
File '/home/src/workspaces/project/src/b/package.json' does not exist.
File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
File '/home/src/workspaces/project/src/b/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
File '/home/src/workspaces/project/src/c/ca/package.json' does not exist.
File '/home/src/workspaces/project/src/c/package.json' does not exist.
File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
File '/home/src/workspaces/project/src/c/ca/caa/package.json' does not exist.
File '/home/src/workspaces/project/src/c/ca/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/c/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
File '/home/src/workspaces/project/src/c/ca/caa/caaa/package.json' does not exist.
File '/home/src/workspaces/project/src/c/ca/caa/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/c/ca/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/c/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
File '/home/src/workspaces/project/src/c/cb/package.json' does not exist.
File '/home/src/workspaces/project/src/c/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
File '/home/src/workspaces/project/src/d/da/daa/daaa/x/y/z/package.json' does not exist.
File '/home/src/workspaces/project/src/d/da/daa/daaa/x/y/package.json' does not exist.
File '/home/src/workspaces/project/src/d/da/daa/daaa/x/package.json' does not exist.
File '/home/src/workspaces/project/src/d/da/daa/daaa/package.json' does not exist.
File '/home/src/workspaces/project/src/d/da/daa/package.json' does not exist.
File '/home/src/workspaces/project/src/d/da/package.json' does not exist.
File '/home/src/workspaces/project/src/d/package.json' does not exist.
File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
File '/home/src/workspaces/project/src/d/da/daa/daaa/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/d/da/daa/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/d/da/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/d/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
File '/home/src/workspaces/project/src/d/da/daa/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/d/da/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/d/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
File '/home/src/workspaces/project/src/d/da/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/d/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
File '/home/src/workspaces/project/src/e/ea/package.json' does not exist.
File '/home/src/workspaces/project/src/e/package.json' does not exist.
File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
File '/home/src/workspaces/project/src/e/ea/eaa/package.json' does not exist.
File '/home/src/workspaces/project/src/e/ea/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/e/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
File '/home/src/workspaces/project/src/e/ea/eaa/eaaa/package.json' does not exist.
File '/home/src/workspaces/project/src/e/ea/eaa/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/e/ea/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/e/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
File '/home/src/workspaces/project/src/e/ea/eaa/eaaa/x/y/z/package.json' does not exist.
File '/home/src/workspaces/project/src/e/ea/eaa/eaaa/x/y/package.json' does not exist.
File '/home/src/workspaces/project/src/e/ea/eaa/eaaa/x/package.json' does not exist.
File '/home/src/workspaces/project/src/e/ea/eaa/eaaa/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/e/ea/eaa/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/e/ea/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/e/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
File '/home/src/workspaces/project/src/f/fa/faa/x/y/z/package.json' does not exist.
File '/home/src/workspaces/project/src/f/fa/faa/x/y/package.json' does not exist.
File '/home/src/workspaces/project/src/f/fa/faa/x/package.json' does not exist.
File '/home/src/workspaces/project/src/f/fa/faa/package.json' does not exist.
File '/home/src/workspaces/project/src/f/fa/package.json' does not exist.
File '/home/src/workspaces/project/src/f/package.json' does not exist.
File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
File '/home/src/workspaces/project/src/f/fa/faa/faaa/package.json' does not exist.
File '/home/src/workspaces/project/src/f/fa/faa/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/f/fa/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/f/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
File '/home/src/tslibs/TS/Lib/package.json' does not exist.
File '/home/src/tslibs/TS/package.json' does not exist.
File '/home/src/tslibs/package.json' does not exist.
File '/home/src/package.json' does not exist.
File '/home/package.json' does not exist.
File '/package.json' does not exist.
../../tslibs/TS/Lib/lib.es2016.full.d.ts
  Default library for target 'es2016'
src/main.ts
  Part of 'files' list in tsconfig.json
  File is ECMAScript module because 'package.json' has field "type" with value "module"
src/fileB.mts
  Imported via "./fileB.mjs" from file 'src/fileA.ts'
  Part of 'files' list in tsconfig.json
src/fileA.ts
  Part of 'files' list in tsconfig.json
  File is ECMAScript module because 'package.json' has field "type" with value "module"
src/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is ECMAScript module because 'package.json' has field "type" with value "module"
src/a/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is ECMAScript module because 'package.json' has field "type" with value "module"
src/b/ba/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is ECMAScript module because 'package.json' has field "type" with value "module"
src/b/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is ECMAScript module because 'package.json' has field "type" with value "module"
src/c/ca/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is ECMAScript module because 'package.json' has field "type" with value "module"
src/c/ca/caa/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is ECMAScript module because 'package.json' has field "type" with value "module"
src/c/ca/caa/caaa/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is ECMAScript module because 'package.json' has field "type" with value "module"
src/c/cb/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is ECMAScript module because 'package.json' has field "type" with value "module"
src/d/da/daa/daaa/x/y/z/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is ECMAScript module because 'package.json' has field "type" with value "module"
src/d/da/daa/daaa/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is ECMAScript module because 'package.json' has field "type" with value "module"
src/d/da/daa/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is ECMAScript module because 'package.json' has field "type" with value "module"
src/d/da/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is ECMAScript module because 'package.json' has field "type" with value "module"
src/e/ea/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is ECMAScript module because 'package.json' has field "type" with value "module"
src/e/ea/eaa/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is ECMAScript module because 'package.json' has field "type" with value "module"
src/e/ea/eaa/eaaa/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is ECMAScript module because 'package.json' has field "type" with value "module"
src/e/ea/eaa/eaaa/x/y/z/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is ECMAScript module because 'package.json' has field "type" with value "module"
src/f/fa/faa/x/y/z/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is ECMAScript module because 'package.json' has field "type" with value "module"
src/f/fa/faa/faaa/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is ECMAScript module because 'package.json' has field "type" with value "module"


//// [/home/src/workspaces/project/out/main.js]
export const x = 10;


//// [/home/src/workspaces/project/out/fileA.js]
import { foo } from "./fileB.mjs";
foo();


//// [/home/src/workspaces/project/out/randomFile.js]
export const x = 10;
export const y = 10;


//// [/home/src/workspaces/project/out/a/randomFile.js]
export const x = 10;


//// [/home/src/workspaces/project/out/b/ba/randomFile.js]
export const x = 10;


//// [/home/src/workspaces/project/out/b/randomFile.js]
export const x = 10;


//// [/home/src/workspaces/project/out/c/ca/randomFile.js]
export const x = 10;


//// [/home/src/workspaces/project/out/c/ca/caa/randomFile.js]
export const x = 10;


//// [/home/src/workspaces/project/out/c/ca/caa/caaa/randomFile.js]
export const x = 10;


//// [/home/src/workspaces/project/out/c/cb/randomFile.js]
export const x = 10;


//// [/home/src/workspaces/project/out/d/da/daa/daaa/x/y/z/randomFile.js]
export const x = 10;


//// [/home/src/workspaces/project/out/d/da/daa/daaa/randomFile.js]
export const x = 10;


//// [/home/src/workspaces/project/out/d/da/daa/randomFile.js]
export const x = 10;


//// [/home/src/workspaces/project/out/d/da/randomFile.js]
export const x = 10;


//// [/home/src/workspaces/project/out/e/ea/randomFile.js]
export const x = 10;


//// [/home/src/workspaces/project/out/e/ea/eaa/randomFile.js]
export const x = 10;


//// [/home/src/workspaces/project/out/e/ea/eaa/eaaa/randomFile.js]
export const x = 10;


//// [/home/src/workspaces/project/out/e/ea/eaa/eaaa/x/y/z/randomFile.js]
export const x = 10;


//// [/home/src/workspaces/project/out/f/fa/faa/x/y/z/randomFile.js]
export const x = 10;


//// [/home/src/workspaces/project/out/f/fa/faa/faaa/randomFile.js]
export const x = 10;


//// [/home/src/workspaces/project/out/tsconfig.tsbuildinfo]
{"fileNames":["../../../tslibs/ts/lib/lib.es2016.full.d.ts","../src/main.ts","../src/fileb.mts","../src/filea.ts","../src/randomfile.ts","../src/a/randomfile.ts","../src/b/ba/randomfile.ts","../src/b/randomfile.ts","../src/c/ca/randomfile.ts","../src/c/ca/caa/randomfile.ts","../src/c/ca/caa/caaa/randomfile.ts","../src/c/cb/randomfile.ts","../src/d/da/daa/daaa/x/y/z/randomfile.ts","../src/d/da/daa/daaa/randomfile.ts","../src/d/da/daa/randomfile.ts","../src/d/da/randomfile.ts","../src/e/ea/randomfile.ts","../src/e/ea/eaa/randomfile.ts","../src/e/ea/eaa/eaaa/randomfile.ts","../src/e/ea/eaa/eaaa/x/y/z/randomfile.ts","../src/f/fa/faa/x/y/z/randomfile.ts","../src/f/fa/faa/faaa/randomfile.ts"],"fileIdsList":[[3]],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedFormat":1},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":99},{"version":"3524703962-export function foo() {}","signature":"-5677608893-export declare function foo(): void;\n","impliedFormat":99},{"version":"-5325347830-import { foo } from \"./fileB.mjs\";\nfoo();\n","signature":"-3531856636-export {};\n","impliedFormat":99},{"version":"-9547279430-export const x = 10;export const y = 10;","signature":"-18799098802-export declare const x = 10;\nexport declare const y = 10;\n","impliedFormat":99},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":99},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":99},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":99},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":99},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":99},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":99},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":99},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":99},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":99},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":99},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":99},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":99},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":99},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":99},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":99},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":99},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":99}],"root":[[2,22]],"options":{"composite":true,"module":100,"outDir":"./","target":3},"referencedMap":[[4,1]],"latestChangedDtsFile":"./randomFile.d.ts","version":"FakeTSVersion"}

//// [/home/src/workspaces/project/out/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../tslibs/ts/lib/lib.es2016.full.d.ts",
    "../src/main.ts",
    "../src/fileb.mts",
    "../src/filea.ts",
    "../src/randomfile.ts",
    "../src/a/randomfile.ts",
    "../src/b/ba/randomfile.ts",
    "../src/b/randomfile.ts",
    "../src/c/ca/randomfile.ts",
    "../src/c/ca/caa/randomfile.ts",
    "../src/c/ca/caa/caaa/randomfile.ts",
    "../src/c/cb/randomfile.ts",
    "../src/d/da/daa/daaa/x/y/z/randomfile.ts",
    "../src/d/da/daa/daaa/randomfile.ts",
    "../src/d/da/daa/randomfile.ts",
    "../src/d/da/randomfile.ts",
    "../src/e/ea/randomfile.ts",
    "../src/e/ea/eaa/randomfile.ts",
    "../src/e/ea/eaa/eaaa/randomfile.ts",
    "../src/e/ea/eaa/eaaa/x/y/z/randomfile.ts",
    "../src/f/fa/faa/x/y/z/randomfile.ts",
    "../src/f/fa/faa/faaa/randomfile.ts"
  ],
  "fileIdsList": [
    [
      "../src/fileb.mts"
    ]
  ],
  "fileInfos": {
    "../../../tslibs/ts/lib/lib.es2016.full.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true,
        "impliedFormat": 1
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true,
      "impliedFormat": "commonjs"
    },
    "../src/main.ts": {
      "original": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": 99
      },
      "version": "-10726455937-export const x = 10;",
      "signature": "-6821242887-export declare const x = 10;\n",
      "impliedFormat": "esnext"
    },
    "../src/fileb.mts": {
      "original": {
        "version": "3524703962-export function foo() {}",
        "signature": "-5677608893-export declare function foo(): void;\n",
        "impliedFormat": 99
      },
      "version": "3524703962-export function foo() {}",
      "signature": "-5677608893-export declare function foo(): void;\n",
      "impliedFormat": "esnext"
    },
    "../src/filea.ts": {
      "original": {
        "version": "-5325347830-import { foo } from \"./fileB.mjs\";\nfoo();\n",
        "signature": "-3531856636-export {};\n",
        "impliedFormat": 99
      },
      "version": "-5325347830-import { foo } from \"./fileB.mjs\";\nfoo();\n",
      "signature": "-3531856636-export {};\n",
      "impliedFormat": "esnext"
    },
    "../src/randomfile.ts": {
      "original": {
        "version": "-9547279430-export const x = 10;export const y = 10;",
        "signature": "-18799098802-export declare const x = 10;\nexport declare const y = 10;\n",
        "impliedFormat": 99
      },
      "version": "-9547279430-export const x = 10;export const y = 10;",
      "signature": "-18799098802-export declare const x = 10;\nexport declare const y = 10;\n",
      "impliedFormat": "esnext"
    },
    "../src/a/randomfile.ts": {
      "original": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": 99
      },
      "version": "-10726455937-export const x = 10;",
      "signature": "-6821242887-export declare const x = 10;\n",
      "impliedFormat": "esnext"
    },
    "../src/b/ba/randomfile.ts": {
      "original": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": 99
      },
      "version": "-10726455937-export const x = 10;",
      "signature": "-6821242887-export declare const x = 10;\n",
      "impliedFormat": "esnext"
    },
    "../src/b/randomfile.ts": {
      "original": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": 99
      },
      "version": "-10726455937-export const x = 10;",
      "signature": "-6821242887-export declare const x = 10;\n",
      "impliedFormat": "esnext"
    },
    "../src/c/ca/randomfile.ts": {
      "original": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": 99
      },
      "version": "-10726455937-export const x = 10;",
      "signature": "-6821242887-export declare const x = 10;\n",
      "impliedFormat": "esnext"
    },
    "../src/c/ca/caa/randomfile.ts": {
      "original": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": 99
      },
      "version": "-10726455937-export const x = 10;",
      "signature": "-6821242887-export declare const x = 10;\n",
      "impliedFormat": "esnext"
    },
    "../src/c/ca/caa/caaa/randomfile.ts": {
      "original": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": 99
      },
      "version": "-10726455937-export const x = 10;",
      "signature": "-6821242887-export declare const x = 10;\n",
      "impliedFormat": "esnext"
    },
    "../src/c/cb/randomfile.ts": {
      "original": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": 99
      },
      "version": "-10726455937-export const x = 10;",
      "signature": "-6821242887-export declare const x = 10;\n",
      "impliedFormat": "esnext"
    },
    "../src/d/da/daa/daaa/x/y/z/randomfile.ts": {
      "original": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": 99
      },
      "version": "-10726455937-export const x = 10;",
      "signature": "-6821242887-export declare const x = 10;\n",
      "impliedFormat": "esnext"
    },
    "../src/d/da/daa/daaa/randomfile.ts": {
      "original": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": 99
      },
      "version": "-10726455937-export const x = 10;",
      "signature": "-6821242887-export declare const x = 10;\n",
      "impliedFormat": "esnext"
    },
    "../src/d/da/daa/randomfile.ts": {
      "original": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": 99
      },
      "version": "-10726455937-export const x = 10;",
      "signature": "-6821242887-export declare const x = 10;\n",
      "impliedFormat": "esnext"
    },
    "../src/d/da/randomfile.ts": {
      "original": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": 99
      },
      "version": "-10726455937-export const x = 10;",
      "signature": "-6821242887-export declare const x = 10;\n",
      "impliedFormat": "esnext"
    },
    "../src/e/ea/randomfile.ts": {
      "original": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": 99
      },
      "version": "-10726455937-export const x = 10;",
      "signature": "-6821242887-export declare const x = 10;\n",
      "impliedFormat": "esnext"
    },
    "../src/e/ea/eaa/randomfile.ts": {
      "original": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": 99
      },
      "version": "-10726455937-export const x = 10;",
      "signature": "-6821242887-export declare const x = 10;\n",
      "impliedFormat": "esnext"
    },
    "../src/e/ea/eaa/eaaa/randomfile.ts": {
      "original": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": 99
      },
      "version": "-10726455937-export const x = 10;",
      "signature": "-6821242887-export declare const x = 10;\n",
      "impliedFormat": "esnext"
    },
    "../src/e/ea/eaa/eaaa/x/y/z/randomfile.ts": {
      "original": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": 99
      },
      "version": "-10726455937-export const x = 10;",
      "signature": "-6821242887-export declare const x = 10;\n",
      "impliedFormat": "esnext"
    },
    "../src/f/fa/faa/x/y/z/randomfile.ts": {
      "original": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": 99
      },
      "version": "-10726455937-export const x = 10;",
      "signature": "-6821242887-export declare const x = 10;\n",
      "impliedFormat": "esnext"
    },
    "../src/f/fa/faa/faaa/randomfile.ts": {
      "original": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": 99
      },
      "version": "-10726455937-export const x = 10;",
      "signature": "-6821242887-export declare const x = 10;\n",
      "impliedFormat": "esnext"
    }
  },
  "root": [
    [
      [
        2,
        22
      ],
      [
        "../src/main.ts",
        "../src/fileb.mts",
        "../src/filea.ts",
        "../src/randomfile.ts",
        "../src/a/randomfile.ts",
        "../src/b/ba/randomfile.ts",
        "../src/b/randomfile.ts",
        "../src/c/ca/randomfile.ts",
        "../src/c/ca/caa/randomfile.ts",
        "../src/c/ca/caa/caaa/randomfile.ts",
        "../src/c/cb/randomfile.ts",
        "../src/d/da/daa/daaa/x/y/z/randomfile.ts",
        "../src/d/da/daa/daaa/randomfile.ts",
        "../src/d/da/daa/randomfile.ts",
        "../src/d/da/randomfile.ts",
        "../src/e/ea/randomfile.ts",
        "../src/e/ea/eaa/randomfile.ts",
        "../src/e/ea/eaa/eaaa/randomfile.ts",
        "../src/e/ea/eaa/eaaa/x/y/z/randomfile.ts",
        "../src/f/fa/faa/x/y/z/randomfile.ts",
        "../src/f/fa/faa/faaa/randomfile.ts"
      ]
    ]
  ],
  "options": {
    "composite": true,
    "module": 100,
    "outDir": "./",
    "target": 3
  },
  "referencedMap": {
    "../src/filea.ts": [
      "../src/fileb.mts"
    ]
  },
  "latestChangedDtsFile": "./randomFile.d.ts",
  "version": "FakeTSVersion",
  "size": 4074
}


exitCode:: ExitStatus.Success

Change:: Modify package.json file to remove type module

Input::
//// [/home/src/workspaces/project/package.json]
{
  "name": "app",
  "version": "1.0.0"
}


/home/src/tslibs/TS/Lib/tsc.js -p /home/src/workspaces/project/src/tsconfig.json --explainFiles --extendedDiagnostics
Output::
File '/home/src/workspaces/project/src/package.json' does not exist.
Found 'package.json' at '/home/src/workspaces/project/package.json'.
File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
======== Resolving module './fileB.mjs' from '/home/src/workspaces/project/src/fileA.ts'. ========
Module resolution kind is not specified, using 'Node16'.
Resolving in CJS mode with conditions 'require', 'types', 'node'.
Loading module as file / folder, candidate module location '/home/src/workspaces/project/src/fileB.mjs', target file types: TypeScript, JavaScript, Declaration.
File name '/home/src/workspaces/project/src/fileB.mjs' has a '.mjs' extension - stripping it.
File '/home/src/workspaces/project/src/fileB.mts' exists - use it as a name resolution result.
======== Module name './fileB.mjs' was successfully resolved to '/home/src/workspaces/project/src/fileB.mts'. ========
File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
File '/home/src/workspaces/project/src/a/package.json' does not exist.
File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
File '/home/src/workspaces/project/src/b/ba/package.json' does not exist.
File '/home/src/workspaces/project/src/b/package.json' does not exist.
File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
File '/home/src/workspaces/project/src/b/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
File '/home/src/workspaces/project/src/c/ca/package.json' does not exist.
File '/home/src/workspaces/project/src/c/package.json' does not exist.
File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
File '/home/src/workspaces/project/src/c/ca/caa/package.json' does not exist.
File '/home/src/workspaces/project/src/c/ca/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/c/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
File '/home/src/workspaces/project/src/c/ca/caa/caaa/package.json' does not exist.
File '/home/src/workspaces/project/src/c/ca/caa/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/c/ca/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/c/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
File '/home/src/workspaces/project/src/c/cb/package.json' does not exist.
File '/home/src/workspaces/project/src/c/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
File '/home/src/workspaces/project/src/d/da/daa/daaa/x/y/z/package.json' does not exist.
File '/home/src/workspaces/project/src/d/da/daa/daaa/x/y/package.json' does not exist.
File '/home/src/workspaces/project/src/d/da/daa/daaa/x/package.json' does not exist.
File '/home/src/workspaces/project/src/d/da/daa/daaa/package.json' does not exist.
File '/home/src/workspaces/project/src/d/da/daa/package.json' does not exist.
File '/home/src/workspaces/project/src/d/da/package.json' does not exist.
File '/home/src/workspaces/project/src/d/package.json' does not exist.
File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
File '/home/src/workspaces/project/src/d/da/daa/daaa/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/d/da/daa/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/d/da/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/d/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
File '/home/src/workspaces/project/src/d/da/daa/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/d/da/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/d/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
File '/home/src/workspaces/project/src/d/da/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/d/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
File '/home/src/workspaces/project/src/e/ea/package.json' does not exist.
File '/home/src/workspaces/project/src/e/package.json' does not exist.
File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
File '/home/src/workspaces/project/src/e/ea/eaa/package.json' does not exist.
File '/home/src/workspaces/project/src/e/ea/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/e/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
File '/home/src/workspaces/project/src/e/ea/eaa/eaaa/package.json' does not exist.
File '/home/src/workspaces/project/src/e/ea/eaa/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/e/ea/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/e/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
File '/home/src/workspaces/project/src/e/ea/eaa/eaaa/x/y/z/package.json' does not exist.
File '/home/src/workspaces/project/src/e/ea/eaa/eaaa/x/y/package.json' does not exist.
File '/home/src/workspaces/project/src/e/ea/eaa/eaaa/x/package.json' does not exist.
File '/home/src/workspaces/project/src/e/ea/eaa/eaaa/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/e/ea/eaa/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/e/ea/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/e/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
File '/home/src/workspaces/project/src/f/fa/faa/x/y/z/package.json' does not exist.
File '/home/src/workspaces/project/src/f/fa/faa/x/y/package.json' does not exist.
File '/home/src/workspaces/project/src/f/fa/faa/x/package.json' does not exist.
File '/home/src/workspaces/project/src/f/fa/faa/package.json' does not exist.
File '/home/src/workspaces/project/src/f/fa/package.json' does not exist.
File '/home/src/workspaces/project/src/f/package.json' does not exist.
File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
File '/home/src/workspaces/project/src/f/fa/faa/faaa/package.json' does not exist.
File '/home/src/workspaces/project/src/f/fa/faa/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/f/fa/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/f/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
File '/home/src/tslibs/TS/Lib/package.json' does not exist.
File '/home/src/tslibs/TS/package.json' does not exist.
File '/home/src/tslibs/package.json' does not exist.
File '/home/src/package.json' does not exist.
File '/home/package.json' does not exist.
File '/package.json' does not exist.
[96msrc/fileA.ts[0m:[93m1[0m:[93m21[0m - [91merror[0m[90m TS1479: [0mThe current file is a CommonJS module whose imports will produce 'require' calls; however, the referenced file is an ECMAScript module and cannot be imported with 'require'. Consider writing a dynamic 'import("./fileB.mjs")' call instead.
  To convert this file to an ECMAScript module, change its file extension to '.mts', or add the field `"type": "module"` to '/home/src/workspaces/project/package.json'.

[7m1[0m import { foo } from "./fileB.mjs";
[7m [0m [91m                    ~~~~~~~~~~~~~[0m

../../tslibs/TS/Lib/lib.es2016.full.d.ts
  Default library for target 'es2016'
src/main.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' does not have field "type"
src/fileB.mts
  Imported via "./fileB.mjs" from file 'src/fileA.ts'
  Part of 'files' list in tsconfig.json
src/fileA.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' does not have field "type"
src/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' does not have field "type"
src/a/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' does not have field "type"
src/b/ba/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' does not have field "type"
src/b/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' does not have field "type"
src/c/ca/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' does not have field "type"
src/c/ca/caa/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' does not have field "type"
src/c/ca/caa/caaa/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' does not have field "type"
src/c/cb/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' does not have field "type"
src/d/da/daa/daaa/x/y/z/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' does not have field "type"
src/d/da/daa/daaa/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' does not have field "type"
src/d/da/daa/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' does not have field "type"
src/d/da/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' does not have field "type"
src/e/ea/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' does not have field "type"
src/e/ea/eaa/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' does not have field "type"
src/e/ea/eaa/eaaa/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' does not have field "type"
src/e/ea/eaa/eaaa/x/y/z/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' does not have field "type"
src/f/fa/faa/x/y/z/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' does not have field "type"
src/f/fa/faa/faaa/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' does not have field "type"

Found 1 error in src/fileA.ts[90m:1[0m



//// [/home/src/workspaces/project/out/main.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = 10;


//// [/home/src/workspaces/project/out/fileA.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fileB_mjs_1 = require("./fileB.mjs");
(0, fileB_mjs_1.foo)();


//// [/home/src/workspaces/project/out/randomFile.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.y = exports.x = void 0;
exports.x = 10;
exports.y = 10;


//// [/home/src/workspaces/project/out/a/randomFile.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = 10;


//// [/home/src/workspaces/project/out/b/ba/randomFile.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = 10;


//// [/home/src/workspaces/project/out/b/randomFile.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = 10;


//// [/home/src/workspaces/project/out/c/ca/randomFile.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = 10;


//// [/home/src/workspaces/project/out/c/ca/caa/randomFile.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = 10;


//// [/home/src/workspaces/project/out/c/ca/caa/caaa/randomFile.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = 10;


//// [/home/src/workspaces/project/out/c/cb/randomFile.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = 10;


//// [/home/src/workspaces/project/out/d/da/daa/daaa/x/y/z/randomFile.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = 10;


//// [/home/src/workspaces/project/out/d/da/daa/daaa/randomFile.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = 10;


//// [/home/src/workspaces/project/out/d/da/daa/randomFile.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = 10;


//// [/home/src/workspaces/project/out/d/da/randomFile.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = 10;


//// [/home/src/workspaces/project/out/e/ea/randomFile.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = 10;


//// [/home/src/workspaces/project/out/e/ea/eaa/randomFile.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = 10;


//// [/home/src/workspaces/project/out/e/ea/eaa/eaaa/randomFile.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = 10;


//// [/home/src/workspaces/project/out/e/ea/eaa/eaaa/x/y/z/randomFile.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = 10;


//// [/home/src/workspaces/project/out/f/fa/faa/x/y/z/randomFile.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = 10;


//// [/home/src/workspaces/project/out/f/fa/faa/faaa/randomFile.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = 10;


//// [/home/src/workspaces/project/out/tsconfig.tsbuildinfo]
{"fileNames":["../../../tslibs/ts/lib/lib.es2016.full.d.ts","../src/main.ts","../src/fileb.mts","../src/filea.ts","../src/randomfile.ts","../src/a/randomfile.ts","../src/b/ba/randomfile.ts","../src/b/randomfile.ts","../src/c/ca/randomfile.ts","../src/c/ca/caa/randomfile.ts","../src/c/ca/caa/caaa/randomfile.ts","../src/c/cb/randomfile.ts","../src/d/da/daa/daaa/x/y/z/randomfile.ts","../src/d/da/daa/daaa/randomfile.ts","../src/d/da/daa/randomfile.ts","../src/d/da/randomfile.ts","../src/e/ea/randomfile.ts","../src/e/ea/eaa/randomfile.ts","../src/e/ea/eaa/eaaa/randomfile.ts","../src/e/ea/eaa/eaaa/x/y/z/randomfile.ts","../src/f/fa/faa/x/y/z/randomfile.ts","../src/f/fa/faa/faaa/randomfile.ts"],"fileIdsList":[[3]],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedFormat":1},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":1},{"version":"3524703962-export function foo() {}","signature":"-5677608893-export declare function foo(): void;\n","impliedFormat":99},{"version":"-5325347830-import { foo } from \"./fileB.mjs\";\nfoo();\n","signature":"-3531856636-export {};\n","impliedFormat":1},{"version":"-9547279430-export const x = 10;export const y = 10;","signature":"-18799098802-export declare const x = 10;\nexport declare const y = 10;\n","impliedFormat":1},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":1},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":1},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":1},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":1},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":1},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":1},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":1},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":1},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":1},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":1},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":1},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":1},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":1},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":1},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":1},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":1},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":1}],"root":[[2,22]],"options":{"composite":true,"module":100,"outDir":"./","target":3},"referencedMap":[[4,1]],"semanticDiagnosticsPerFile":[[4,[{"start":20,"length":13,"code":1479,"category":1,"messageText":{"messageText":"The current file is a CommonJS module whose imports will produce 'require' calls; however, the referenced file is an ECMAScript module and cannot be imported with 'require'. Consider writing a dynamic 'import(\"./fileB.mjs\")' call instead.","category":1,"code":1479,"next":[{"info":true}]}}]]],"latestChangedDtsFile":"./randomFile.d.ts","version":"FakeTSVersion"}

//// [/home/src/workspaces/project/out/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../tslibs/ts/lib/lib.es2016.full.d.ts",
    "../src/main.ts",
    "../src/fileb.mts",
    "../src/filea.ts",
    "../src/randomfile.ts",
    "../src/a/randomfile.ts",
    "../src/b/ba/randomfile.ts",
    "../src/b/randomfile.ts",
    "../src/c/ca/randomfile.ts",
    "../src/c/ca/caa/randomfile.ts",
    "../src/c/ca/caa/caaa/randomfile.ts",
    "../src/c/cb/randomfile.ts",
    "../src/d/da/daa/daaa/x/y/z/randomfile.ts",
    "../src/d/da/daa/daaa/randomfile.ts",
    "../src/d/da/daa/randomfile.ts",
    "../src/d/da/randomfile.ts",
    "../src/e/ea/randomfile.ts",
    "../src/e/ea/eaa/randomfile.ts",
    "../src/e/ea/eaa/eaaa/randomfile.ts",
    "../src/e/ea/eaa/eaaa/x/y/z/randomfile.ts",
    "../src/f/fa/faa/x/y/z/randomfile.ts",
    "../src/f/fa/faa/faaa/randomfile.ts"
  ],
  "fileIdsList": [
    [
      "../src/fileb.mts"
    ]
  ],
  "fileInfos": {
    "../../../tslibs/ts/lib/lib.es2016.full.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true,
        "impliedFormat": 1
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true,
      "impliedFormat": "commonjs"
    },
    "../src/main.ts": {
      "original": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": 1
      },
      "version": "-10726455937-export const x = 10;",
      "signature": "-6821242887-export declare const x = 10;\n",
      "impliedFormat": "commonjs"
    },
    "../src/fileb.mts": {
      "original": {
        "version": "3524703962-export function foo() {}",
        "signature": "-5677608893-export declare function foo(): void;\n",
        "impliedFormat": 99
      },
      "version": "3524703962-export function foo() {}",
      "signature": "-5677608893-export declare function foo(): void;\n",
      "impliedFormat": "esnext"
    },
    "../src/filea.ts": {
      "original": {
        "version": "-5325347830-import { foo } from \"./fileB.mjs\";\nfoo();\n",
        "signature": "-3531856636-export {};\n",
        "impliedFormat": 1
      },
      "version": "-5325347830-import { foo } from \"./fileB.mjs\";\nfoo();\n",
      "signature": "-3531856636-export {};\n",
      "impliedFormat": "commonjs"
    },
    "../src/randomfile.ts": {
      "original": {
        "version": "-9547279430-export const x = 10;export const y = 10;",
        "signature": "-18799098802-export declare const x = 10;\nexport declare const y = 10;\n",
        "impliedFormat": 1
      },
      "version": "-9547279430-export const x = 10;export const y = 10;",
      "signature": "-18799098802-export declare const x = 10;\nexport declare const y = 10;\n",
      "impliedFormat": "commonjs"
    },
    "../src/a/randomfile.ts": {
      "original": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": 1
      },
      "version": "-10726455937-export const x = 10;",
      "signature": "-6821242887-export declare const x = 10;\n",
      "impliedFormat": "commonjs"
    },
    "../src/b/ba/randomfile.ts": {
      "original": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": 1
      },
      "version": "-10726455937-export const x = 10;",
      "signature": "-6821242887-export declare const x = 10;\n",
      "impliedFormat": "commonjs"
    },
    "../src/b/randomfile.ts": {
      "original": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": 1
      },
      "version": "-10726455937-export const x = 10;",
      "signature": "-6821242887-export declare const x = 10;\n",
      "impliedFormat": "commonjs"
    },
    "../src/c/ca/randomfile.ts": {
      "original": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": 1
      },
      "version": "-10726455937-export const x = 10;",
      "signature": "-6821242887-export declare const x = 10;\n",
      "impliedFormat": "commonjs"
    },
    "../src/c/ca/caa/randomfile.ts": {
      "original": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": 1
      },
      "version": "-10726455937-export const x = 10;",
      "signature": "-6821242887-export declare const x = 10;\n",
      "impliedFormat": "commonjs"
    },
    "../src/c/ca/caa/caaa/randomfile.ts": {
      "original": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": 1
      },
      "version": "-10726455937-export const x = 10;",
      "signature": "-6821242887-export declare const x = 10;\n",
      "impliedFormat": "commonjs"
    },
    "../src/c/cb/randomfile.ts": {
      "original": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": 1
      },
      "version": "-10726455937-export const x = 10;",
      "signature": "-6821242887-export declare const x = 10;\n",
      "impliedFormat": "commonjs"
    },
    "../src/d/da/daa/daaa/x/y/z/randomfile.ts": {
      "original": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": 1
      },
      "version": "-10726455937-export const x = 10;",
      "signature": "-6821242887-export declare const x = 10;\n",
      "impliedFormat": "commonjs"
    },
    "../src/d/da/daa/daaa/randomfile.ts": {
      "original": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": 1
      },
      "version": "-10726455937-export const x = 10;",
      "signature": "-6821242887-export declare const x = 10;\n",
      "impliedFormat": "commonjs"
    },
    "../src/d/da/daa/randomfile.ts": {
      "original": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": 1
      },
      "version": "-10726455937-export const x = 10;",
      "signature": "-6821242887-export declare const x = 10;\n",
      "impliedFormat": "commonjs"
    },
    "../src/d/da/randomfile.ts": {
      "original": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": 1
      },
      "version": "-10726455937-export const x = 10;",
      "signature": "-6821242887-export declare const x = 10;\n",
      "impliedFormat": "commonjs"
    },
    "../src/e/ea/randomfile.ts": {
      "original": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": 1
      },
      "version": "-10726455937-export const x = 10;",
      "signature": "-6821242887-export declare const x = 10;\n",
      "impliedFormat": "commonjs"
    },
    "../src/e/ea/eaa/randomfile.ts": {
      "original": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": 1
      },
      "version": "-10726455937-export const x = 10;",
      "signature": "-6821242887-export declare const x = 10;\n",
      "impliedFormat": "commonjs"
    },
    "../src/e/ea/eaa/eaaa/randomfile.ts": {
      "original": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": 1
      },
      "version": "-10726455937-export const x = 10;",
      "signature": "-6821242887-export declare const x = 10;\n",
      "impliedFormat": "commonjs"
    },
    "../src/e/ea/eaa/eaaa/x/y/z/randomfile.ts": {
      "original": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": 1
      },
      "version": "-10726455937-export const x = 10;",
      "signature": "-6821242887-export declare const x = 10;\n",
      "impliedFormat": "commonjs"
    },
    "../src/f/fa/faa/x/y/z/randomfile.ts": {
      "original": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": 1
      },
      "version": "-10726455937-export const x = 10;",
      "signature": "-6821242887-export declare const x = 10;\n",
      "impliedFormat": "commonjs"
    },
    "../src/f/fa/faa/faaa/randomfile.ts": {
      "original": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": 1
      },
      "version": "-10726455937-export const x = 10;",
      "signature": "-6821242887-export declare const x = 10;\n",
      "impliedFormat": "commonjs"
    }
  },
  "root": [
    [
      [
        2,
        22
      ],
      [
        "../src/main.ts",
        "../src/fileb.mts",
        "../src/filea.ts",
        "../src/randomfile.ts",
        "../src/a/randomfile.ts",
        "../src/b/ba/randomfile.ts",
        "../src/b/randomfile.ts",
        "../src/c/ca/randomfile.ts",
        "../src/c/ca/caa/randomfile.ts",
        "../src/c/ca/caa/caaa/randomfile.ts",
        "../src/c/cb/randomfile.ts",
        "../src/d/da/daa/daaa/x/y/z/randomfile.ts",
        "../src/d/da/daa/daaa/randomfile.ts",
        "../src/d/da/daa/randomfile.ts",
        "../src/d/da/randomfile.ts",
        "../src/e/ea/randomfile.ts",
        "../src/e/ea/eaa/randomfile.ts",
        "../src/e/ea/eaa/eaaa/randomfile.ts",
        "../src/e/ea/eaa/eaaa/x/y/z/randomfile.ts",
        "../src/f/fa/faa/x/y/z/randomfile.ts",
        "../src/f/fa/faa/faaa/randomfile.ts"
      ]
    ]
  ],
  "options": {
    "composite": true,
    "module": 100,
    "outDir": "./",
    "target": 3
  },
  "referencedMap": {
    "../src/filea.ts": [
      "../src/fileb.mts"
    ]
  },
  "semanticDiagnosticsPerFile": [
    [
      "../src/filea.ts",
      [
        {
          "start": 20,
          "length": 13,
          "code": 1479,
          "category": 1,
          "messageText": {
            "messageText": "The current file is a CommonJS module whose imports will produce 'require' calls; however, the referenced file is an ECMAScript module and cannot be imported with 'require'. Consider writing a dynamic 'import(\"./fileB.mjs\")' call instead.",
            "category": 1,
            "code": 1479,
            "next": [
              {
                "info": true
              }
            ]
          }
        }
      ]
    ]
  ],
  "latestChangedDtsFile": "./randomFile.d.ts",
  "version": "FakeTSVersion",
  "size": 4462
}


exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated

Change:: Delete package.json

Input::
//// [/home/src/workspaces/project/package.json] deleted

/home/src/tslibs/TS/Lib/tsc.js -p /home/src/workspaces/project/src/tsconfig.json --explainFiles --extendedDiagnostics
Output::
File '/home/src/workspaces/project/src/package.json' does not exist.
File '/home/src/workspaces/project/package.json' does not exist.
File '/home/src/workspaces/package.json' does not exist.
File '/home/src/package.json' does not exist.
File '/home/package.json' does not exist.
File '/package.json' does not exist.
File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
======== Resolving module './fileB.mjs' from '/home/src/workspaces/project/src/fileA.ts'. ========
Module resolution kind is not specified, using 'Node16'.
Resolving in CJS mode with conditions 'require', 'types', 'node'.
Loading module as file / folder, candidate module location '/home/src/workspaces/project/src/fileB.mjs', target file types: TypeScript, JavaScript, Declaration.
File name '/home/src/workspaces/project/src/fileB.mjs' has a '.mjs' extension - stripping it.
File '/home/src/workspaces/project/src/fileB.mts' exists - use it as a name resolution result.
======== Module name './fileB.mjs' was successfully resolved to '/home/src/workspaces/project/src/fileB.mts'. ========
File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/a/package.json' does not exist.
File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/b/ba/package.json' does not exist.
File '/home/src/workspaces/project/src/b/package.json' does not exist.
File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/b/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/c/ca/package.json' does not exist.
File '/home/src/workspaces/project/src/c/package.json' does not exist.
File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/c/ca/caa/package.json' does not exist.
File '/home/src/workspaces/project/src/c/ca/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/c/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/c/ca/caa/caaa/package.json' does not exist.
File '/home/src/workspaces/project/src/c/ca/caa/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/c/ca/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/c/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/c/cb/package.json' does not exist.
File '/home/src/workspaces/project/src/c/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/d/da/daa/daaa/x/y/z/package.json' does not exist.
File '/home/src/workspaces/project/src/d/da/daa/daaa/x/y/package.json' does not exist.
File '/home/src/workspaces/project/src/d/da/daa/daaa/x/package.json' does not exist.
File '/home/src/workspaces/project/src/d/da/daa/daaa/package.json' does not exist.
File '/home/src/workspaces/project/src/d/da/daa/package.json' does not exist.
File '/home/src/workspaces/project/src/d/da/package.json' does not exist.
File '/home/src/workspaces/project/src/d/package.json' does not exist.
File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/d/da/daa/daaa/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/d/da/daa/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/d/da/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/d/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/d/da/daa/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/d/da/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/d/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/d/da/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/d/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/e/ea/package.json' does not exist.
File '/home/src/workspaces/project/src/e/package.json' does not exist.
File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/e/ea/eaa/package.json' does not exist.
File '/home/src/workspaces/project/src/e/ea/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/e/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/e/ea/eaa/eaaa/package.json' does not exist.
File '/home/src/workspaces/project/src/e/ea/eaa/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/e/ea/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/e/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/e/ea/eaa/eaaa/x/y/z/package.json' does not exist.
File '/home/src/workspaces/project/src/e/ea/eaa/eaaa/x/y/package.json' does not exist.
File '/home/src/workspaces/project/src/e/ea/eaa/eaaa/x/package.json' does not exist.
File '/home/src/workspaces/project/src/e/ea/eaa/eaaa/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/e/ea/eaa/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/e/ea/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/e/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/f/fa/faa/x/y/z/package.json' does not exist.
File '/home/src/workspaces/project/src/f/fa/faa/x/y/package.json' does not exist.
File '/home/src/workspaces/project/src/f/fa/faa/x/package.json' does not exist.
File '/home/src/workspaces/project/src/f/fa/faa/package.json' does not exist.
File '/home/src/workspaces/project/src/f/fa/package.json' does not exist.
File '/home/src/workspaces/project/src/f/package.json' does not exist.
File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/f/fa/faa/faaa/package.json' does not exist.
File '/home/src/workspaces/project/src/f/fa/faa/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/f/fa/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/f/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
File '/home/src/tslibs/TS/Lib/package.json' does not exist.
File '/home/src/tslibs/TS/package.json' does not exist.
File '/home/src/tslibs/package.json' does not exist.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
[96msrc/fileA.ts[0m:[93m1[0m:[93m21[0m - [91merror[0m[90m TS1479: [0mThe current file is a CommonJS module whose imports will produce 'require' calls; however, the referenced file is an ECMAScript module and cannot be imported with 'require'. Consider writing a dynamic 'import("./fileB.mjs")' call instead.
  To convert this file to an ECMAScript module, change its file extension to '.mts' or create a local package.json file with `{ "type": "module" }`.

[7m1[0m import { foo } from "./fileB.mjs";
[7m [0m [91m                    ~~~~~~~~~~~~~[0m

../../tslibs/TS/Lib/lib.es2016.full.d.ts
  Default library for target 'es2016'
src/main.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' was not found
src/fileB.mts
  Imported via "./fileB.mjs" from file 'src/fileA.ts'
  Part of 'files' list in tsconfig.json
src/fileA.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' was not found
src/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' was not found
src/a/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' was not found
src/b/ba/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' was not found
src/b/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' was not found
src/c/ca/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' was not found
src/c/ca/caa/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' was not found
src/c/ca/caa/caaa/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' was not found
src/c/cb/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' was not found
src/d/da/daa/daaa/x/y/z/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' was not found
src/d/da/daa/daaa/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' was not found
src/d/da/daa/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' was not found
src/d/da/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' was not found
src/e/ea/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' was not found
src/e/ea/eaa/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' was not found
src/e/ea/eaa/eaaa/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' was not found
src/e/ea/eaa/eaaa/x/y/z/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' was not found
src/f/fa/faa/x/y/z/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' was not found
src/f/fa/faa/faaa/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' was not found

Found 1 error in src/fileA.ts[90m:1[0m




exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated

Change:: Add package json file with type module

Input::
//// [/home/src/workspaces/project/package.json]
{
  "name": "app",
  "version": "1.0.0",
  "type": "module"
}


/home/src/tslibs/TS/Lib/tsc.js -p /home/src/workspaces/project/src/tsconfig.json --explainFiles --extendedDiagnostics
Output::
File '/home/src/workspaces/project/src/package.json' does not exist.
Found 'package.json' at '/home/src/workspaces/project/package.json'.
File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
======== Resolving module './fileB.mjs' from '/home/src/workspaces/project/src/fileA.ts'. ========
Module resolution kind is not specified, using 'Node16'.
Resolving in ESM mode with conditions 'import', 'types', 'node'.
Loading module as file / folder, candidate module location '/home/src/workspaces/project/src/fileB.mjs', target file types: TypeScript, JavaScript, Declaration.
File name '/home/src/workspaces/project/src/fileB.mjs' has a '.mjs' extension - stripping it.
File '/home/src/workspaces/project/src/fileB.mts' exists - use it as a name resolution result.
======== Module name './fileB.mjs' was successfully resolved to '/home/src/workspaces/project/src/fileB.mts'. ========
File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
File '/home/src/workspaces/project/src/a/package.json' does not exist.
File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
File '/home/src/workspaces/project/src/b/ba/package.json' does not exist.
File '/home/src/workspaces/project/src/b/package.json' does not exist.
File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
File '/home/src/workspaces/project/src/b/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
File '/home/src/workspaces/project/src/c/ca/package.json' does not exist.
File '/home/src/workspaces/project/src/c/package.json' does not exist.
File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
File '/home/src/workspaces/project/src/c/ca/caa/package.json' does not exist.
File '/home/src/workspaces/project/src/c/ca/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/c/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
File '/home/src/workspaces/project/src/c/ca/caa/caaa/package.json' does not exist.
File '/home/src/workspaces/project/src/c/ca/caa/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/c/ca/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/c/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
File '/home/src/workspaces/project/src/c/cb/package.json' does not exist.
File '/home/src/workspaces/project/src/c/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
File '/home/src/workspaces/project/src/d/da/daa/daaa/x/y/z/package.json' does not exist.
File '/home/src/workspaces/project/src/d/da/daa/daaa/x/y/package.json' does not exist.
File '/home/src/workspaces/project/src/d/da/daa/daaa/x/package.json' does not exist.
File '/home/src/workspaces/project/src/d/da/daa/daaa/package.json' does not exist.
File '/home/src/workspaces/project/src/d/da/daa/package.json' does not exist.
File '/home/src/workspaces/project/src/d/da/package.json' does not exist.
File '/home/src/workspaces/project/src/d/package.json' does not exist.
File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
File '/home/src/workspaces/project/src/d/da/daa/daaa/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/d/da/daa/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/d/da/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/d/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
File '/home/src/workspaces/project/src/d/da/daa/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/d/da/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/d/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
File '/home/src/workspaces/project/src/d/da/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/d/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
File '/home/src/workspaces/project/src/e/ea/package.json' does not exist.
File '/home/src/workspaces/project/src/e/package.json' does not exist.
File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
File '/home/src/workspaces/project/src/e/ea/eaa/package.json' does not exist.
File '/home/src/workspaces/project/src/e/ea/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/e/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
File '/home/src/workspaces/project/src/e/ea/eaa/eaaa/package.json' does not exist.
File '/home/src/workspaces/project/src/e/ea/eaa/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/e/ea/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/e/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
File '/home/src/workspaces/project/src/e/ea/eaa/eaaa/x/y/z/package.json' does not exist.
File '/home/src/workspaces/project/src/e/ea/eaa/eaaa/x/y/package.json' does not exist.
File '/home/src/workspaces/project/src/e/ea/eaa/eaaa/x/package.json' does not exist.
File '/home/src/workspaces/project/src/e/ea/eaa/eaaa/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/e/ea/eaa/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/e/ea/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/e/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
File '/home/src/workspaces/project/src/f/fa/faa/x/y/z/package.json' does not exist.
File '/home/src/workspaces/project/src/f/fa/faa/x/y/package.json' does not exist.
File '/home/src/workspaces/project/src/f/fa/faa/x/package.json' does not exist.
File '/home/src/workspaces/project/src/f/fa/faa/package.json' does not exist.
File '/home/src/workspaces/project/src/f/fa/package.json' does not exist.
File '/home/src/workspaces/project/src/f/package.json' does not exist.
File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
File '/home/src/workspaces/project/src/f/fa/faa/faaa/package.json' does not exist.
File '/home/src/workspaces/project/src/f/fa/faa/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/f/fa/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/f/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
File '/home/src/tslibs/TS/Lib/package.json' does not exist.
File '/home/src/tslibs/TS/package.json' does not exist.
File '/home/src/tslibs/package.json' does not exist.
File '/home/src/package.json' does not exist.
File '/home/package.json' does not exist.
File '/package.json' does not exist.
../../tslibs/TS/Lib/lib.es2016.full.d.ts
  Default library for target 'es2016'
src/main.ts
  Part of 'files' list in tsconfig.json
  File is ECMAScript module because 'package.json' has field "type" with value "module"
src/fileB.mts
  Imported via "./fileB.mjs" from file 'src/fileA.ts'
  Part of 'files' list in tsconfig.json
src/fileA.ts
  Part of 'files' list in tsconfig.json
  File is ECMAScript module because 'package.json' has field "type" with value "module"
src/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is ECMAScript module because 'package.json' has field "type" with value "module"
src/a/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is ECMAScript module because 'package.json' has field "type" with value "module"
src/b/ba/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is ECMAScript module because 'package.json' has field "type" with value "module"
src/b/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is ECMAScript module because 'package.json' has field "type" with value "module"
src/c/ca/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is ECMAScript module because 'package.json' has field "type" with value "module"
src/c/ca/caa/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is ECMAScript module because 'package.json' has field "type" with value "module"
src/c/ca/caa/caaa/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is ECMAScript module because 'package.json' has field "type" with value "module"
src/c/cb/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is ECMAScript module because 'package.json' has field "type" with value "module"
src/d/da/daa/daaa/x/y/z/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is ECMAScript module because 'package.json' has field "type" with value "module"
src/d/da/daa/daaa/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is ECMAScript module because 'package.json' has field "type" with value "module"
src/d/da/daa/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is ECMAScript module because 'package.json' has field "type" with value "module"
src/d/da/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is ECMAScript module because 'package.json' has field "type" with value "module"
src/e/ea/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is ECMAScript module because 'package.json' has field "type" with value "module"
src/e/ea/eaa/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is ECMAScript module because 'package.json' has field "type" with value "module"
src/e/ea/eaa/eaaa/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is ECMAScript module because 'package.json' has field "type" with value "module"
src/e/ea/eaa/eaaa/x/y/z/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is ECMAScript module because 'package.json' has field "type" with value "module"
src/f/fa/faa/x/y/z/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is ECMAScript module because 'package.json' has field "type" with value "module"
src/f/fa/faa/faaa/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is ECMAScript module because 'package.json' has field "type" with value "module"


//// [/home/src/workspaces/project/out/main.js]
export const x = 10;


//// [/home/src/workspaces/project/out/fileA.js]
import { foo } from "./fileB.mjs";
foo();


//// [/home/src/workspaces/project/out/randomFile.js]
export const x = 10;
export const y = 10;


//// [/home/src/workspaces/project/out/a/randomFile.js]
export const x = 10;


//// [/home/src/workspaces/project/out/b/ba/randomFile.js]
export const x = 10;


//// [/home/src/workspaces/project/out/b/randomFile.js]
export const x = 10;


//// [/home/src/workspaces/project/out/c/ca/randomFile.js]
export const x = 10;


//// [/home/src/workspaces/project/out/c/ca/caa/randomFile.js]
export const x = 10;


//// [/home/src/workspaces/project/out/c/ca/caa/caaa/randomFile.js]
export const x = 10;


//// [/home/src/workspaces/project/out/c/cb/randomFile.js]
export const x = 10;


//// [/home/src/workspaces/project/out/d/da/daa/daaa/x/y/z/randomFile.js]
export const x = 10;


//// [/home/src/workspaces/project/out/d/da/daa/daaa/randomFile.js]
export const x = 10;


//// [/home/src/workspaces/project/out/d/da/daa/randomFile.js]
export const x = 10;


//// [/home/src/workspaces/project/out/d/da/randomFile.js]
export const x = 10;


//// [/home/src/workspaces/project/out/e/ea/randomFile.js]
export const x = 10;


//// [/home/src/workspaces/project/out/e/ea/eaa/randomFile.js]
export const x = 10;


//// [/home/src/workspaces/project/out/e/ea/eaa/eaaa/randomFile.js]
export const x = 10;


//// [/home/src/workspaces/project/out/e/ea/eaa/eaaa/x/y/z/randomFile.js]
export const x = 10;


//// [/home/src/workspaces/project/out/f/fa/faa/x/y/z/randomFile.js]
export const x = 10;


//// [/home/src/workspaces/project/out/f/fa/faa/faaa/randomFile.js]
export const x = 10;


//// [/home/src/workspaces/project/out/tsconfig.tsbuildinfo]
{"fileNames":["../../../tslibs/ts/lib/lib.es2016.full.d.ts","../src/main.ts","../src/fileb.mts","../src/filea.ts","../src/randomfile.ts","../src/a/randomfile.ts","../src/b/ba/randomfile.ts","../src/b/randomfile.ts","../src/c/ca/randomfile.ts","../src/c/ca/caa/randomfile.ts","../src/c/ca/caa/caaa/randomfile.ts","../src/c/cb/randomfile.ts","../src/d/da/daa/daaa/x/y/z/randomfile.ts","../src/d/da/daa/daaa/randomfile.ts","../src/d/da/daa/randomfile.ts","../src/d/da/randomfile.ts","../src/e/ea/randomfile.ts","../src/e/ea/eaa/randomfile.ts","../src/e/ea/eaa/eaaa/randomfile.ts","../src/e/ea/eaa/eaaa/x/y/z/randomfile.ts","../src/f/fa/faa/x/y/z/randomfile.ts","../src/f/fa/faa/faaa/randomfile.ts"],"fileIdsList":[[3]],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedFormat":1},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":99},{"version":"3524703962-export function foo() {}","signature":"-5677608893-export declare function foo(): void;\n","impliedFormat":99},{"version":"-5325347830-import { foo } from \"./fileB.mjs\";\nfoo();\n","signature":"-3531856636-export {};\n","impliedFormat":99},{"version":"-9547279430-export const x = 10;export const y = 10;","signature":"-18799098802-export declare const x = 10;\nexport declare const y = 10;\n","impliedFormat":99},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":99},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":99},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":99},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":99},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":99},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":99},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":99},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":99},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":99},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":99},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":99},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":99},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":99},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":99},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":99},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":99},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":99}],"root":[[2,22]],"options":{"composite":true,"module":100,"outDir":"./","target":3},"referencedMap":[[4,1]],"latestChangedDtsFile":"./randomFile.d.ts","version":"FakeTSVersion"}

//// [/home/src/workspaces/project/out/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../tslibs/ts/lib/lib.es2016.full.d.ts",
    "../src/main.ts",
    "../src/fileb.mts",
    "../src/filea.ts",
    "../src/randomfile.ts",
    "../src/a/randomfile.ts",
    "../src/b/ba/randomfile.ts",
    "../src/b/randomfile.ts",
    "../src/c/ca/randomfile.ts",
    "../src/c/ca/caa/randomfile.ts",
    "../src/c/ca/caa/caaa/randomfile.ts",
    "../src/c/cb/randomfile.ts",
    "../src/d/da/daa/daaa/x/y/z/randomfile.ts",
    "../src/d/da/daa/daaa/randomfile.ts",
    "../src/d/da/daa/randomfile.ts",
    "../src/d/da/randomfile.ts",
    "../src/e/ea/randomfile.ts",
    "../src/e/ea/eaa/randomfile.ts",
    "../src/e/ea/eaa/eaaa/randomfile.ts",
    "../src/e/ea/eaa/eaaa/x/y/z/randomfile.ts",
    "../src/f/fa/faa/x/y/z/randomfile.ts",
    "../src/f/fa/faa/faaa/randomfile.ts"
  ],
  "fileIdsList": [
    [
      "../src/fileb.mts"
    ]
  ],
  "fileInfos": {
    "../../../tslibs/ts/lib/lib.es2016.full.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true,
        "impliedFormat": 1
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true,
      "impliedFormat": "commonjs"
    },
    "../src/main.ts": {
      "original": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": 99
      },
      "version": "-10726455937-export const x = 10;",
      "signature": "-6821242887-export declare const x = 10;\n",
      "impliedFormat": "esnext"
    },
    "../src/fileb.mts": {
      "original": {
        "version": "3524703962-export function foo() {}",
        "signature": "-5677608893-export declare function foo(): void;\n",
        "impliedFormat": 99
      },
      "version": "3524703962-export function foo() {}",
      "signature": "-5677608893-export declare function foo(): void;\n",
      "impliedFormat": "esnext"
    },
    "../src/filea.ts": {
      "original": {
        "version": "-5325347830-import { foo } from \"./fileB.mjs\";\nfoo();\n",
        "signature": "-3531856636-export {};\n",
        "impliedFormat": 99
      },
      "version": "-5325347830-import { foo } from \"./fileB.mjs\";\nfoo();\n",
      "signature": "-3531856636-export {};\n",
      "impliedFormat": "esnext"
    },
    "../src/randomfile.ts": {
      "original": {
        "version": "-9547279430-export const x = 10;export const y = 10;",
        "signature": "-18799098802-export declare const x = 10;\nexport declare const y = 10;\n",
        "impliedFormat": 99
      },
      "version": "-9547279430-export const x = 10;export const y = 10;",
      "signature": "-18799098802-export declare const x = 10;\nexport declare const y = 10;\n",
      "impliedFormat": "esnext"
    },
    "../src/a/randomfile.ts": {
      "original": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": 99
      },
      "version": "-10726455937-export const x = 10;",
      "signature": "-6821242887-export declare const x = 10;\n",
      "impliedFormat": "esnext"
    },
    "../src/b/ba/randomfile.ts": {
      "original": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": 99
      },
      "version": "-10726455937-export const x = 10;",
      "signature": "-6821242887-export declare const x = 10;\n",
      "impliedFormat": "esnext"
    },
    "../src/b/randomfile.ts": {
      "original": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": 99
      },
      "version": "-10726455937-export const x = 10;",
      "signature": "-6821242887-export declare const x = 10;\n",
      "impliedFormat": "esnext"
    },
    "../src/c/ca/randomfile.ts": {
      "original": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": 99
      },
      "version": "-10726455937-export const x = 10;",
      "signature": "-6821242887-export declare const x = 10;\n",
      "impliedFormat": "esnext"
    },
    "../src/c/ca/caa/randomfile.ts": {
      "original": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": 99
      },
      "version": "-10726455937-export const x = 10;",
      "signature": "-6821242887-export declare const x = 10;\n",
      "impliedFormat": "esnext"
    },
    "../src/c/ca/caa/caaa/randomfile.ts": {
      "original": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": 99
      },
      "version": "-10726455937-export const x = 10;",
      "signature": "-6821242887-export declare const x = 10;\n",
      "impliedFormat": "esnext"
    },
    "../src/c/cb/randomfile.ts": {
      "original": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": 99
      },
      "version": "-10726455937-export const x = 10;",
      "signature": "-6821242887-export declare const x = 10;\n",
      "impliedFormat": "esnext"
    },
    "../src/d/da/daa/daaa/x/y/z/randomfile.ts": {
      "original": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": 99
      },
      "version": "-10726455937-export const x = 10;",
      "signature": "-6821242887-export declare const x = 10;\n",
      "impliedFormat": "esnext"
    },
    "../src/d/da/daa/daaa/randomfile.ts": {
      "original": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": 99
      },
      "version": "-10726455937-export const x = 10;",
      "signature": "-6821242887-export declare const x = 10;\n",
      "impliedFormat": "esnext"
    },
    "../src/d/da/daa/randomfile.ts": {
      "original": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": 99
      },
      "version": "-10726455937-export const x = 10;",
      "signature": "-6821242887-export declare const x = 10;\n",
      "impliedFormat": "esnext"
    },
    "../src/d/da/randomfile.ts": {
      "original": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": 99
      },
      "version": "-10726455937-export const x = 10;",
      "signature": "-6821242887-export declare const x = 10;\n",
      "impliedFormat": "esnext"
    },
    "../src/e/ea/randomfile.ts": {
      "original": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": 99
      },
      "version": "-10726455937-export const x = 10;",
      "signature": "-6821242887-export declare const x = 10;\n",
      "impliedFormat": "esnext"
    },
    "../src/e/ea/eaa/randomfile.ts": {
      "original": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": 99
      },
      "version": "-10726455937-export const x = 10;",
      "signature": "-6821242887-export declare const x = 10;\n",
      "impliedFormat": "esnext"
    },
    "../src/e/ea/eaa/eaaa/randomfile.ts": {
      "original": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": 99
      },
      "version": "-10726455937-export const x = 10;",
      "signature": "-6821242887-export declare const x = 10;\n",
      "impliedFormat": "esnext"
    },
    "../src/e/ea/eaa/eaaa/x/y/z/randomfile.ts": {
      "original": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": 99
      },
      "version": "-10726455937-export const x = 10;",
      "signature": "-6821242887-export declare const x = 10;\n",
      "impliedFormat": "esnext"
    },
    "../src/f/fa/faa/x/y/z/randomfile.ts": {
      "original": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": 99
      },
      "version": "-10726455937-export const x = 10;",
      "signature": "-6821242887-export declare const x = 10;\n",
      "impliedFormat": "esnext"
    },
    "../src/f/fa/faa/faaa/randomfile.ts": {
      "original": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": 99
      },
      "version": "-10726455937-export const x = 10;",
      "signature": "-6821242887-export declare const x = 10;\n",
      "impliedFormat": "esnext"
    }
  },
  "root": [
    [
      [
        2,
        22
      ],
      [
        "../src/main.ts",
        "../src/fileb.mts",
        "../src/filea.ts",
        "../src/randomfile.ts",
        "../src/a/randomfile.ts",
        "../src/b/ba/randomfile.ts",
        "../src/b/randomfile.ts",
        "../src/c/ca/randomfile.ts",
        "../src/c/ca/caa/randomfile.ts",
        "../src/c/ca/caa/caaa/randomfile.ts",
        "../src/c/cb/randomfile.ts",
        "../src/d/da/daa/daaa/x/y/z/randomfile.ts",
        "../src/d/da/daa/daaa/randomfile.ts",
        "../src/d/da/daa/randomfile.ts",
        "../src/d/da/randomfile.ts",
        "../src/e/ea/randomfile.ts",
        "../src/e/ea/eaa/randomfile.ts",
        "../src/e/ea/eaa/eaaa/randomfile.ts",
        "../src/e/ea/eaa/eaaa/x/y/z/randomfile.ts",
        "../src/f/fa/faa/x/y/z/randomfile.ts",
        "../src/f/fa/faa/faaa/randomfile.ts"
      ]
    ]
  ],
  "options": {
    "composite": true,
    "module": 100,
    "outDir": "./",
    "target": 3
  },
  "referencedMap": {
    "../src/filea.ts": [
      "../src/fileb.mts"
    ]
  },
  "latestChangedDtsFile": "./randomFile.d.ts",
  "version": "FakeTSVersion",
  "size": 4074
}


exitCode:: ExitStatus.Success

Change:: Delete package.json

Input::
//// [/home/src/workspaces/project/package.json] deleted

/home/src/tslibs/TS/Lib/tsc.js -p /home/src/workspaces/project/src/tsconfig.json --explainFiles --extendedDiagnostics
Output::
File '/home/src/workspaces/project/src/package.json' does not exist.
File '/home/src/workspaces/project/package.json' does not exist.
File '/home/src/workspaces/package.json' does not exist.
File '/home/src/package.json' does not exist.
File '/home/package.json' does not exist.
File '/package.json' does not exist.
File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
======== Resolving module './fileB.mjs' from '/home/src/workspaces/project/src/fileA.ts'. ========
Module resolution kind is not specified, using 'Node16'.
Resolving in CJS mode with conditions 'require', 'types', 'node'.
Loading module as file / folder, candidate module location '/home/src/workspaces/project/src/fileB.mjs', target file types: TypeScript, JavaScript, Declaration.
File name '/home/src/workspaces/project/src/fileB.mjs' has a '.mjs' extension - stripping it.
File '/home/src/workspaces/project/src/fileB.mts' exists - use it as a name resolution result.
======== Module name './fileB.mjs' was successfully resolved to '/home/src/workspaces/project/src/fileB.mts'. ========
File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/a/package.json' does not exist.
File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/b/ba/package.json' does not exist.
File '/home/src/workspaces/project/src/b/package.json' does not exist.
File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/b/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/c/ca/package.json' does not exist.
File '/home/src/workspaces/project/src/c/package.json' does not exist.
File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/c/ca/caa/package.json' does not exist.
File '/home/src/workspaces/project/src/c/ca/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/c/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/c/ca/caa/caaa/package.json' does not exist.
File '/home/src/workspaces/project/src/c/ca/caa/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/c/ca/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/c/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/c/cb/package.json' does not exist.
File '/home/src/workspaces/project/src/c/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/d/da/daa/daaa/x/y/z/package.json' does not exist.
File '/home/src/workspaces/project/src/d/da/daa/daaa/x/y/package.json' does not exist.
File '/home/src/workspaces/project/src/d/da/daa/daaa/x/package.json' does not exist.
File '/home/src/workspaces/project/src/d/da/daa/daaa/package.json' does not exist.
File '/home/src/workspaces/project/src/d/da/daa/package.json' does not exist.
File '/home/src/workspaces/project/src/d/da/package.json' does not exist.
File '/home/src/workspaces/project/src/d/package.json' does not exist.
File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/d/da/daa/daaa/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/d/da/daa/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/d/da/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/d/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/d/da/daa/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/d/da/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/d/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/d/da/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/d/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/e/ea/package.json' does not exist.
File '/home/src/workspaces/project/src/e/package.json' does not exist.
File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/e/ea/eaa/package.json' does not exist.
File '/home/src/workspaces/project/src/e/ea/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/e/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/e/ea/eaa/eaaa/package.json' does not exist.
File '/home/src/workspaces/project/src/e/ea/eaa/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/e/ea/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/e/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/e/ea/eaa/eaaa/x/y/z/package.json' does not exist.
File '/home/src/workspaces/project/src/e/ea/eaa/eaaa/x/y/package.json' does not exist.
File '/home/src/workspaces/project/src/e/ea/eaa/eaaa/x/package.json' does not exist.
File '/home/src/workspaces/project/src/e/ea/eaa/eaaa/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/e/ea/eaa/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/e/ea/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/e/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/f/fa/faa/x/y/z/package.json' does not exist.
File '/home/src/workspaces/project/src/f/fa/faa/x/y/package.json' does not exist.
File '/home/src/workspaces/project/src/f/fa/faa/x/package.json' does not exist.
File '/home/src/workspaces/project/src/f/fa/faa/package.json' does not exist.
File '/home/src/workspaces/project/src/f/fa/package.json' does not exist.
File '/home/src/workspaces/project/src/f/package.json' does not exist.
File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/f/fa/faa/faaa/package.json' does not exist.
File '/home/src/workspaces/project/src/f/fa/faa/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/f/fa/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/f/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
File '/home/src/tslibs/TS/Lib/package.json' does not exist.
File '/home/src/tslibs/TS/package.json' does not exist.
File '/home/src/tslibs/package.json' does not exist.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
[96msrc/fileA.ts[0m:[93m1[0m:[93m21[0m - [91merror[0m[90m TS1479: [0mThe current file is a CommonJS module whose imports will produce 'require' calls; however, the referenced file is an ECMAScript module and cannot be imported with 'require'. Consider writing a dynamic 'import("./fileB.mjs")' call instead.
  To convert this file to an ECMAScript module, change its file extension to '.mts' or create a local package.json file with `{ "type": "module" }`.

[7m1[0m import { foo } from "./fileB.mjs";
[7m [0m [91m                    ~~~~~~~~~~~~~[0m

../../tslibs/TS/Lib/lib.es2016.full.d.ts
  Default library for target 'es2016'
src/main.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' was not found
src/fileB.mts
  Imported via "./fileB.mjs" from file 'src/fileA.ts'
  Part of 'files' list in tsconfig.json
src/fileA.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' was not found
src/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' was not found
src/a/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' was not found
src/b/ba/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' was not found
src/b/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' was not found
src/c/ca/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' was not found
src/c/ca/caa/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' was not found
src/c/ca/caa/caaa/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' was not found
src/c/cb/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' was not found
src/d/da/daa/daaa/x/y/z/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' was not found
src/d/da/daa/daaa/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' was not found
src/d/da/daa/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' was not found
src/d/da/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' was not found
src/e/ea/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' was not found
src/e/ea/eaa/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' was not found
src/e/ea/eaa/eaaa/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' was not found
src/e/ea/eaa/eaaa/x/y/z/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' was not found
src/f/fa/faa/x/y/z/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' was not found
src/f/fa/faa/faaa/randomFile.ts
  Part of 'files' list in tsconfig.json
  File is CommonJS module because 'package.json' was not found

Found 1 error in src/fileA.ts[90m:1[0m



//// [/home/src/workspaces/project/out/main.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = 10;


//// [/home/src/workspaces/project/out/fileA.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fileB_mjs_1 = require("./fileB.mjs");
(0, fileB_mjs_1.foo)();


//// [/home/src/workspaces/project/out/randomFile.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.y = exports.x = void 0;
exports.x = 10;
exports.y = 10;


//// [/home/src/workspaces/project/out/a/randomFile.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = 10;


//// [/home/src/workspaces/project/out/b/ba/randomFile.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = 10;


//// [/home/src/workspaces/project/out/b/randomFile.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = 10;


//// [/home/src/workspaces/project/out/c/ca/randomFile.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = 10;


//// [/home/src/workspaces/project/out/c/ca/caa/randomFile.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = 10;


//// [/home/src/workspaces/project/out/c/ca/caa/caaa/randomFile.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = 10;


//// [/home/src/workspaces/project/out/c/cb/randomFile.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = 10;


//// [/home/src/workspaces/project/out/d/da/daa/daaa/x/y/z/randomFile.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = 10;


//// [/home/src/workspaces/project/out/d/da/daa/daaa/randomFile.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = 10;


//// [/home/src/workspaces/project/out/d/da/daa/randomFile.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = 10;


//// [/home/src/workspaces/project/out/d/da/randomFile.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = 10;


//// [/home/src/workspaces/project/out/e/ea/randomFile.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = 10;


//// [/home/src/workspaces/project/out/e/ea/eaa/randomFile.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = 10;


//// [/home/src/workspaces/project/out/e/ea/eaa/eaaa/randomFile.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = 10;


//// [/home/src/workspaces/project/out/e/ea/eaa/eaaa/x/y/z/randomFile.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = 10;


//// [/home/src/workspaces/project/out/f/fa/faa/x/y/z/randomFile.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = 10;


//// [/home/src/workspaces/project/out/f/fa/faa/faaa/randomFile.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = 10;


//// [/home/src/workspaces/project/out/tsconfig.tsbuildinfo]
{"fileNames":["../../../tslibs/ts/lib/lib.es2016.full.d.ts","../src/main.ts","../src/fileb.mts","../src/filea.ts","../src/randomfile.ts","../src/a/randomfile.ts","../src/b/ba/randomfile.ts","../src/b/randomfile.ts","../src/c/ca/randomfile.ts","../src/c/ca/caa/randomfile.ts","../src/c/ca/caa/caaa/randomfile.ts","../src/c/cb/randomfile.ts","../src/d/da/daa/daaa/x/y/z/randomfile.ts","../src/d/da/daa/daaa/randomfile.ts","../src/d/da/daa/randomfile.ts","../src/d/da/randomfile.ts","../src/e/ea/randomfile.ts","../src/e/ea/eaa/randomfile.ts","../src/e/ea/eaa/eaaa/randomfile.ts","../src/e/ea/eaa/eaaa/x/y/z/randomfile.ts","../src/f/fa/faa/x/y/z/randomfile.ts","../src/f/fa/faa/faaa/randomfile.ts"],"fileIdsList":[[3]],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedFormat":1},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":1},{"version":"3524703962-export function foo() {}","signature":"-5677608893-export declare function foo(): void;\n","impliedFormat":99},{"version":"-5325347830-import { foo } from \"./fileB.mjs\";\nfoo();\n","signature":"-3531856636-export {};\n","impliedFormat":1},{"version":"-9547279430-export const x = 10;export const y = 10;","signature":"-18799098802-export declare const x = 10;\nexport declare const y = 10;\n","impliedFormat":1},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":1},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":1},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":1},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":1},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":1},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":1},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":1},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":1},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":1},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":1},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":1},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":1},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":1},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":1},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":1},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":1},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n","impliedFormat":1}],"root":[[2,22]],"options":{"composite":true,"module":100,"outDir":"./","target":3},"referencedMap":[[4,1]],"semanticDiagnosticsPerFile":[[4,[{"start":20,"length":13,"code":1479,"category":1,"messageText":{"messageText":"The current file is a CommonJS module whose imports will produce 'require' calls; however, the referenced file is an ECMAScript module and cannot be imported with 'require'. Consider writing a dynamic 'import(\"./fileB.mjs\")' call instead.","category":1,"code":1479,"next":[{"info":true}]}}]]],"latestChangedDtsFile":"./randomFile.d.ts","version":"FakeTSVersion"}

//// [/home/src/workspaces/project/out/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../tslibs/ts/lib/lib.es2016.full.d.ts",
    "../src/main.ts",
    "../src/fileb.mts",
    "../src/filea.ts",
    "../src/randomfile.ts",
    "../src/a/randomfile.ts",
    "../src/b/ba/randomfile.ts",
    "../src/b/randomfile.ts",
    "../src/c/ca/randomfile.ts",
    "../src/c/ca/caa/randomfile.ts",
    "../src/c/ca/caa/caaa/randomfile.ts",
    "../src/c/cb/randomfile.ts",
    "../src/d/da/daa/daaa/x/y/z/randomfile.ts",
    "../src/d/da/daa/daaa/randomfile.ts",
    "../src/d/da/daa/randomfile.ts",
    "../src/d/da/randomfile.ts",
    "../src/e/ea/randomfile.ts",
    "../src/e/ea/eaa/randomfile.ts",
    "../src/e/ea/eaa/eaaa/randomfile.ts",
    "../src/e/ea/eaa/eaaa/x/y/z/randomfile.ts",
    "../src/f/fa/faa/x/y/z/randomfile.ts",
    "../src/f/fa/faa/faaa/randomfile.ts"
  ],
  "fileIdsList": [
    [
      "../src/fileb.mts"
    ]
  ],
  "fileInfos": {
    "../../../tslibs/ts/lib/lib.es2016.full.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true,
        "impliedFormat": 1
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true,
      "impliedFormat": "commonjs"
    },
    "../src/main.ts": {
      "original": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": 1
      },
      "version": "-10726455937-export const x = 10;",
      "signature": "-6821242887-export declare const x = 10;\n",
      "impliedFormat": "commonjs"
    },
    "../src/fileb.mts": {
      "original": {
        "version": "3524703962-export function foo() {}",
        "signature": "-5677608893-export declare function foo(): void;\n",
        "impliedFormat": 99
      },
      "version": "3524703962-export function foo() {}",
      "signature": "-5677608893-export declare function foo(): void;\n",
      "impliedFormat": "esnext"
    },
    "../src/filea.ts": {
      "original": {
        "version": "-5325347830-import { foo } from \"./fileB.mjs\";\nfoo();\n",
        "signature": "-3531856636-export {};\n",
        "impliedFormat": 1
      },
      "version": "-5325347830-import { foo } from \"./fileB.mjs\";\nfoo();\n",
      "signature": "-3531856636-export {};\n",
      "impliedFormat": "commonjs"
    },
    "../src/randomfile.ts": {
      "original": {
        "version": "-9547279430-export const x = 10;export const y = 10;",
        "signature": "-18799098802-export declare const x = 10;\nexport declare const y = 10;\n",
        "impliedFormat": 1
      },
      "version": "-9547279430-export const x = 10;export const y = 10;",
      "signature": "-18799098802-export declare const x = 10;\nexport declare const y = 10;\n",
      "impliedFormat": "commonjs"
    },
    "../src/a/randomfile.ts": {
      "original": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": 1
      },
      "version": "-10726455937-export const x = 10;",
      "signature": "-6821242887-export declare const x = 10;\n",
      "impliedFormat": "commonjs"
    },
    "../src/b/ba/randomfile.ts": {
      "original": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": 1
      },
      "version": "-10726455937-export const x = 10;",
      "signature": "-6821242887-export declare const x = 10;\n",
      "impliedFormat": "commonjs"
    },
    "../src/b/randomfile.ts": {
      "original": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": 1
      },
      "version": "-10726455937-export const x = 10;",
      "signature": "-6821242887-export declare const x = 10;\n",
      "impliedFormat": "commonjs"
    },
    "../src/c/ca/randomfile.ts": {
      "original": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": 1
      },
      "version": "-10726455937-export const x = 10;",
      "signature": "-6821242887-export declare const x = 10;\n",
      "impliedFormat": "commonjs"
    },
    "../src/c/ca/caa/randomfile.ts": {
      "original": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": 1
      },
      "version": "-10726455937-export const x = 10;",
      "signature": "-6821242887-export declare const x = 10;\n",
      "impliedFormat": "commonjs"
    },
    "../src/c/ca/caa/caaa/randomfile.ts": {
      "original": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": 1
      },
      "version": "-10726455937-export const x = 10;",
      "signature": "-6821242887-export declare const x = 10;\n",
      "impliedFormat": "commonjs"
    },
    "../src/c/cb/randomfile.ts": {
      "original": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": 1
      },
      "version": "-10726455937-export const x = 10;",
      "signature": "-6821242887-export declare const x = 10;\n",
      "impliedFormat": "commonjs"
    },
    "../src/d/da/daa/daaa/x/y/z/randomfile.ts": {
      "original": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": 1
      },
      "version": "-10726455937-export const x = 10;",
      "signature": "-6821242887-export declare const x = 10;\n",
      "impliedFormat": "commonjs"
    },
    "../src/d/da/daa/daaa/randomfile.ts": {
      "original": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": 1
      },
      "version": "-10726455937-export const x = 10;",
      "signature": "-6821242887-export declare const x = 10;\n",
      "impliedFormat": "commonjs"
    },
    "../src/d/da/daa/randomfile.ts": {
      "original": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": 1
      },
      "version": "-10726455937-export const x = 10;",
      "signature": "-6821242887-export declare const x = 10;\n",
      "impliedFormat": "commonjs"
    },
    "../src/d/da/randomfile.ts": {
      "original": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": 1
      },
      "version": "-10726455937-export const x = 10;",
      "signature": "-6821242887-export declare const x = 10;\n",
      "impliedFormat": "commonjs"
    },
    "../src/e/ea/randomfile.ts": {
      "original": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": 1
      },
      "version": "-10726455937-export const x = 10;",
      "signature": "-6821242887-export declare const x = 10;\n",
      "impliedFormat": "commonjs"
    },
    "../src/e/ea/eaa/randomfile.ts": {
      "original": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": 1
      },
      "version": "-10726455937-export const x = 10;",
      "signature": "-6821242887-export declare const x = 10;\n",
      "impliedFormat": "commonjs"
    },
    "../src/e/ea/eaa/eaaa/randomfile.ts": {
      "original": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": 1
      },
      "version": "-10726455937-export const x = 10;",
      "signature": "-6821242887-export declare const x = 10;\n",
      "impliedFormat": "commonjs"
    },
    "../src/e/ea/eaa/eaaa/x/y/z/randomfile.ts": {
      "original": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": 1
      },
      "version": "-10726455937-export const x = 10;",
      "signature": "-6821242887-export declare const x = 10;\n",
      "impliedFormat": "commonjs"
    },
    "../src/f/fa/faa/x/y/z/randomfile.ts": {
      "original": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": 1
      },
      "version": "-10726455937-export const x = 10;",
      "signature": "-6821242887-export declare const x = 10;\n",
      "impliedFormat": "commonjs"
    },
    "../src/f/fa/faa/faaa/randomfile.ts": {
      "original": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n",
        "impliedFormat": 1
      },
      "version": "-10726455937-export const x = 10;",
      "signature": "-6821242887-export declare const x = 10;\n",
      "impliedFormat": "commonjs"
    }
  },
  "root": [
    [
      [
        2,
        22
      ],
      [
        "../src/main.ts",
        "../src/fileb.mts",
        "../src/filea.ts",
        "../src/randomfile.ts",
        "../src/a/randomfile.ts",
        "../src/b/ba/randomfile.ts",
        "../src/b/randomfile.ts",
        "../src/c/ca/randomfile.ts",
        "../src/c/ca/caa/randomfile.ts",
        "../src/c/ca/caa/caaa/randomfile.ts",
        "../src/c/cb/randomfile.ts",
        "../src/d/da/daa/daaa/x/y/z/randomfile.ts",
        "../src/d/da/daa/daaa/randomfile.ts",
        "../src/d/da/daa/randomfile.ts",
        "../src/d/da/randomfile.ts",
        "../src/e/ea/randomfile.ts",
        "../src/e/ea/eaa/randomfile.ts",
        "../src/e/ea/eaa/eaaa/randomfile.ts",
        "../src/e/ea/eaa/eaaa/x/y/z/randomfile.ts",
        "../src/f/fa/faa/x/y/z/randomfile.ts",
        "../src/f/fa/faa/faaa/randomfile.ts"
      ]
    ]
  ],
  "options": {
    "composite": true,
    "module": 100,
    "outDir": "./",
    "target": 3
  },
  "referencedMap": {
    "../src/filea.ts": [
      "../src/fileb.mts"
    ]
  },
  "semanticDiagnosticsPerFile": [
    [
      "../src/filea.ts",
      [
        {
          "start": 20,
          "length": 13,
          "code": 1479,
          "category": 1,
          "messageText": {
            "messageText": "The current file is a CommonJS module whose imports will produce 'require' calls; however, the referenced file is an ECMAScript module and cannot be imported with 'require'. Consider writing a dynamic 'import(\"./fileB.mjs\")' call instead.",
            "category": 1,
            "code": 1479,
            "next": [
              {
                "info": true
              }
            ]
          }
        }
      ]
    ]
  ],
  "latestChangedDtsFile": "./randomFile.d.ts",
  "version": "FakeTSVersion",
  "size": 4462
}


exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated
