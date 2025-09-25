currentDirectory::/user/username/projects/myproject
useCaseSensitiveFileNames::true
Input::
//// [/user/username/projects/myproject/node_modules/pkg2] -> /user/username/projects/myproject/packages/pkg2 *new*
//// [/user/username/projects/myproject/packages/pkg1/index.ts] *new* 
import type { TheNum } from 'pkg2'
export const theNum: TheNum = 42;
//// [/user/username/projects/myproject/packages/pkg1/package.json] *new* 
{
    "name": "pkg1",
    "version": "1.0.0",
    "main": "build/index.js",
    "type": "module"
}
//// [/user/username/projects/myproject/packages/pkg1/tsconfig.json] *new* 
{
    "compilerOptions": {
        "outDir": "build",
        "module": "node16",
    },
    "references": [{ "path": "../pkg2" }],
}
//// [/user/username/projects/myproject/packages/pkg2/const.cts] *new* 
export type TheNum = 42;
//// [/user/username/projects/myproject/packages/pkg2/index.ts] *new* 
export type { TheNum } from './const.cjs';
//// [/user/username/projects/myproject/packages/pkg2/package.json] *new* 
{
    "name": "pkg2",
    "version": "1.0.0",
    "main": "build/index.js",
    "type": "module"
}
//// [/user/username/projects/myproject/packages/pkg2/tsconfig.json] *new* 
{
    "compilerOptions": {
        "composite": true,
        "outDir": "build",
        "module": "node16",
    },
}

tsgo -b packages/pkg1 -w --verbose --traceResolution
ExitStatus:: Success
Output::
[2J[3J[H[[90mHH:MM:SS AM[0m] Starting compilation in watch mode...

[[90mHH:MM:SS AM[0m] Projects in this build: 
    * packages/pkg2/tsconfig.json
    * packages/pkg1/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'packages/pkg2/tsconfig.json' is out of date because output file 'packages/pkg2/build/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project 'packages/pkg2/tsconfig.json'...

======== Resolving module './const.cjs' from '/user/username/projects/myproject/packages/pkg2/index.ts'. ========
Module resolution kind is not specified, using 'Node16'.
Resolving in ESM mode with conditions 'import', 'types', 'node'.
Loading module as file / folder, candidate module location '/user/username/projects/myproject/packages/pkg2/const.cjs', target file types: TypeScript, JavaScript, Declaration.
File name '/user/username/projects/myproject/packages/pkg2/const.cjs' has a '.cjs' extension - stripping it.
File '/user/username/projects/myproject/packages/pkg2/const.cts' exists - use it as a name resolution result.
======== Module name './const.cjs' was successfully resolved to '/user/username/projects/myproject/packages/pkg2/const.cts'. ========
[[90mHH:MM:SS AM[0m] Project 'packages/pkg1/tsconfig.json' is out of date because output file 'packages/pkg1/build/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project 'packages/pkg1/tsconfig.json'...

======== Resolving module 'pkg2' from '/user/username/projects/myproject/packages/pkg1/index.ts'. ========
Module resolution kind is not specified, using 'Node16'.
Resolving in ESM mode with conditions 'import', 'types', 'node'.
Found 'package.json' at '/user/username/projects/myproject/packages/pkg1/package.json'.
Loading module 'pkg2' from 'node_modules' folder, target file types: TypeScript, JavaScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Directory '/user/username/projects/myproject/packages/pkg1/node_modules' does not exist, skipping all lookups in it.
Directory '/user/username/projects/myproject/packages/pkg1/node_modules/@types' does not exist, skipping all lookups in it.
Directory '/user/username/projects/myproject/packages/node_modules' does not exist, skipping all lookups in it.
Directory '/user/username/projects/myproject/packages/node_modules/@types' does not exist, skipping all lookups in it.
Found 'package.json' at '/user/username/projects/myproject/node_modules/pkg2/package.json'.
'package.json' does not have a 'typesVersions' field.
'package.json' does not have a 'typings' field.
'package.json' does not have a 'types' field.
'package.json' has 'main' field 'build/index.js' that references '/user/username/projects/myproject/node_modules/pkg2/build/index.js'.
File name '/user/username/projects/myproject/node_modules/pkg2/build/index.js' has a '.js' extension - stripping it.
File '/user/username/projects/myproject/node_modules/pkg2/build/index.ts' does not exist.
File '/user/username/projects/myproject/node_modules/pkg2/build/index.tsx' does not exist.
File '/user/username/projects/myproject/node_modules/pkg2/build/index.d.ts' exists - use it as a name resolution result.
'package.json' does not have a 'peerDependencies' field.
Resolving real path for '/user/username/projects/myproject/node_modules/pkg2/build/index.d.ts', result '/user/username/projects/myproject/packages/pkg2/build/index.d.ts'.
======== Module name 'pkg2' was successfully resolved to '/user/username/projects/myproject/packages/pkg2/build/index.d.ts' with Package ID 'pkg2@1.0.0'. ========
======== Resolving module './const.cjs' from '/user/username/projects/myproject/packages/pkg2/index.ts'. ========
Using compiler options of project reference redirect '/user/username/projects/myproject/packages/pkg2/tsconfig.json'.
Module resolution kind is not specified, using 'Node16'.
Resolving in ESM mode with conditions 'import', 'types', 'node'.
Loading module as file / folder, candidate module location '/user/username/projects/myproject/packages/pkg2/const.cjs', target file types: TypeScript, JavaScript, Declaration.
File name '/user/username/projects/myproject/packages/pkg2/const.cjs' has a '.cjs' extension - stripping it.
File '/user/username/projects/myproject/packages/pkg2/const.cts' exists - use it as a name resolution result.
======== Module name './const.cjs' was successfully resolved to '/user/username/projects/myproject/packages/pkg2/const.cts'. ========
[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.

//// [/home/src/tslibs/TS/Lib/lib.es2022.full.d.ts] *Lib*
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
//// [/user/username/projects/myproject/packages/pkg1/build/index.js] *new* 
export const theNum = 42;

//// [/user/username/projects/myproject/packages/pkg1/build/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":["../index.ts"]}
//// [/user/username/projects/myproject/packages/pkg1/build/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "../index.ts"
      ],
      "original": "../index.ts"
    }
  ],
  "size": 50
}
//// [/user/username/projects/myproject/packages/pkg2/build/const.cjs] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

//// [/user/username/projects/myproject/packages/pkg2/build/const.d.cts] *new* 
export type TheNum = 42;

//// [/user/username/projects/myproject/packages/pkg2/build/index.d.ts] *new* 
export type { TheNum } from './const.cjs';

//// [/user/username/projects/myproject/packages/pkg2/build/index.js] *new* 
export {};

//// [/user/username/projects/myproject/packages/pkg2/build/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":[[2,3]],"fileNames":["lib.es2022.full.d.ts","../const.cts","../index.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"be0f939ab1143e4064a3742586332724-export type TheNum = 42;","signature":"56e2d69d2edd1f0edd1a64ecfdf6de0d-export type TheNum = 42;\n","impliedNodeFormat":1},{"version":"7bb214373f4d1876e9a0040d287d1b6e-export type { TheNum } from './const.cjs';","signature":"2c7786a1f125eb57a4db00a4d58e384a-export type { TheNum } from './const.cjs';\n","impliedNodeFormat":99}],"fileIdsList":[[2]],"options":{"composite":true,"module":100,"outDir":"./"},"referencedMap":[[3,1]],"latestChangedDtsFile":"./index.d.ts"}
//// [/user/username/projects/myproject/packages/pkg2/build/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "../const.cts",
        "../index.ts"
      ],
      "original": [
        2,
        3
      ]
    }
  ],
  "fileNames": [
    "lib.es2022.full.d.ts",
    "../const.cts",
    "../index.ts"
  ],
  "fileInfos": [
    {
      "fileName": "lib.es2022.full.d.ts",
      "version": "8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };",
      "signature": "8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "../const.cts",
      "version": "be0f939ab1143e4064a3742586332724-export type TheNum = 42;",
      "signature": "56e2d69d2edd1f0edd1a64ecfdf6de0d-export type TheNum = 42;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "be0f939ab1143e4064a3742586332724-export type TheNum = 42;",
        "signature": "56e2d69d2edd1f0edd1a64ecfdf6de0d-export type TheNum = 42;\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "../index.ts",
      "version": "7bb214373f4d1876e9a0040d287d1b6e-export type { TheNum } from './const.cjs';",
      "signature": "2c7786a1f125eb57a4db00a4d58e384a-export type { TheNum } from './const.cjs';\n",
      "impliedNodeFormat": "ESNext",
      "original": {
        "version": "7bb214373f4d1876e9a0040d287d1b6e-export type { TheNum } from './const.cjs';",
        "signature": "2c7786a1f125eb57a4db00a4d58e384a-export type { TheNum } from './const.cjs';\n",
        "impliedNodeFormat": 99
      }
    }
  ],
  "fileIdsList": [
    [
      "../const.cts"
    ]
  ],
  "options": {
    "composite": true,
    "module": 100,
    "outDir": "./"
  },
  "referencedMap": {
    "../index.ts": [
      "../const.cts"
    ]
  },
  "latestChangedDtsFile": "./index.d.ts",
  "size": 1403
}

packages/pkg2/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es2022.full.d.ts
*refresh*    /user/username/projects/myproject/packages/pkg2/const.cts
*refresh*    /user/username/projects/myproject/packages/pkg2/index.ts
Signatures::
(stored at emit) /user/username/projects/myproject/packages/pkg2/const.cts
(stored at emit) /user/username/projects/myproject/packages/pkg2/index.ts

packages/pkg1/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es2022.full.d.ts
*refresh*    /user/username/projects/myproject/packages/pkg2/build/const.d.cts
*refresh*    /user/username/projects/myproject/packages/pkg2/build/index.d.ts
*refresh*    /user/username/projects/myproject/packages/pkg1/index.ts
Signatures::


Edit [0]:: reports import errors after change to package file
//// [/user/username/projects/myproject/packages/pkg1/package.json] *modified* 
{
    "name": "pkg1",
    "version": "1.0.0",
    "main": "build/index.js",
    "type": "commonjs"
}


Output::



Diff:: Package.json watch pending, so no change detected yet
--- nonIncremental /user/username/projects/myproject/packages/pkg1/build/index.js
+++ incremental /user/username/projects/myproject/packages/pkg1/build/index.js
@@ -1,4 +1,1 @@
-"use strict";
-Object.defineProperty(exports, "__esModule", { value: true });
-exports.theNum = void 0;
-exports.theNum = 42;
+export const theNum = 42;
--- nonIncremental.output.txt
+++ incremental.output.txt
@@ -1,6 +0,0 @@
-[96mpackages/pkg1/index.ts[0m:[93m1[0m:[93m29[0m - [91merror[0m[90m TS1541: [0mType-only import of an ECMAScript module from a CommonJS module must have a 'resolution-mode' attribute.
-  To convert this file to an ECMAScript module, change its file extension to '.mts' or create a local package.json file with `{ "type": "module" }`.
-
-[7m1[0m import type { TheNum } from 'pkg2'
-[7m [0m [91m                            ~~~~~~[0m
-

Edit [1]:: removes those errors when a package file is changed back
//// [/user/username/projects/myproject/packages/pkg1/package.json] *modified* 
{
    "name": "pkg1",
    "version": "1.0.0",
    "main": "build/index.js",
    "type": "module"
}


Output::



Edit [2]:: reports import errors after change to package file
//// [/user/username/projects/myproject/packages/pkg1/package.json] *modified* 
{
    "name": "pkg1",
    "version": "1.0.0",
    "main": "build/index.js",
    "type": "commonjs"
}


Output::



Diff:: Package.json watch pending, so no change detected yet
--- nonIncremental /user/username/projects/myproject/packages/pkg1/build/index.js
+++ incremental /user/username/projects/myproject/packages/pkg1/build/index.js
@@ -1,4 +1,1 @@
-"use strict";
-Object.defineProperty(exports, "__esModule", { value: true });
-exports.theNum = void 0;
-exports.theNum = 42;
+export const theNum = 42;
--- nonIncremental.output.txt
+++ incremental.output.txt
@@ -1,6 +0,0 @@
-[96mpackages/pkg1/index.ts[0m:[93m1[0m:[93m29[0m - [91merror[0m[90m TS1541: [0mType-only import of an ECMAScript module from a CommonJS module must have a 'resolution-mode' attribute.
-  To convert this file to an ECMAScript module, change its file extension to '.mts' or create a local package.json file with `{ "type": "module" }`.
-
-[7m1[0m import type { TheNum } from 'pkg2'
-[7m [0m [91m                            ~~~~~~[0m
-

Edit [3]:: removes those errors when a package file is changed to cjs extensions
//// [/user/username/projects/myproject/packages/pkg2/index.cts] *new* 
export type { TheNum } from './const.cjs';
//// [/user/username/projects/myproject/packages/pkg2/index.ts] *deleted*
//// [/user/username/projects/myproject/packages/pkg2/package.json] *modified* 
{
    "name": "pkg2",
    "version": "1.0.0",
    "main": "build/index.cjs",
    "type": "module"
}


Output::
[2J[3J[H[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

[[90mHH:MM:SS AM[0m] Projects in this build: 
    * packages/pkg2/tsconfig.json
    * packages/pkg1/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'packages/pkg2/tsconfig.json' is out of date because output 'packages/pkg2/build/tsconfig.tsbuildinfo' is older than input 'packages/pkg2/index.cts'

[[90mHH:MM:SS AM[0m] Building project 'packages/pkg2/tsconfig.json'...

======== Resolving module './const.cjs' from '/user/username/projects/myproject/packages/pkg2/index.cts'. ========
Module resolution kind is not specified, using 'Node16'.
Resolving in CJS mode with conditions 'require', 'types', 'node'.
Loading module as file / folder, candidate module location '/user/username/projects/myproject/packages/pkg2/const.cjs', target file types: TypeScript, JavaScript, Declaration.
File name '/user/username/projects/myproject/packages/pkg2/const.cjs' has a '.cjs' extension - stripping it.
File '/user/username/projects/myproject/packages/pkg2/const.cts' exists - use it as a name resolution result.
======== Module name './const.cjs' was successfully resolved to '/user/username/projects/myproject/packages/pkg2/const.cts'. ========
[[90mHH:MM:SS AM[0m] Project 'packages/pkg1/tsconfig.json' is out of date because output 'packages/pkg1/build/index.js' is older than input 'packages/pkg2/tsconfig.json'

[[90mHH:MM:SS AM[0m] Building project 'packages/pkg1/tsconfig.json'...

======== Resolving module 'pkg2' from '/user/username/projects/myproject/packages/pkg1/index.ts'. ========
Module resolution kind is not specified, using 'Node16'.
Resolving in CJS mode with conditions 'require', 'types', 'node'.
Found 'package.json' at '/user/username/projects/myproject/packages/pkg1/package.json'.
Loading module 'pkg2' from 'node_modules' folder, target file types: TypeScript, JavaScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Directory '/user/username/projects/myproject/packages/pkg1/node_modules' does not exist, skipping all lookups in it.
Directory '/user/username/projects/myproject/packages/pkg1/node_modules/@types' does not exist, skipping all lookups in it.
Directory '/user/username/projects/myproject/packages/node_modules' does not exist, skipping all lookups in it.
Directory '/user/username/projects/myproject/packages/node_modules/@types' does not exist, skipping all lookups in it.
Found 'package.json' at '/user/username/projects/myproject/node_modules/pkg2/package.json'.
File '/user/username/projects/myproject/node_modules/pkg2.ts' does not exist.
File '/user/username/projects/myproject/node_modules/pkg2.tsx' does not exist.
File '/user/username/projects/myproject/node_modules/pkg2.d.ts' does not exist.
'package.json' does not have a 'typesVersions' field.
'package.json' does not have a 'typings' field.
'package.json' does not have a 'types' field.
'package.json' has 'main' field 'build/index.cjs' that references '/user/username/projects/myproject/node_modules/pkg2/build/index.cjs'.
File name '/user/username/projects/myproject/node_modules/pkg2/build/index.cjs' has a '.cjs' extension - stripping it.
File '/user/username/projects/myproject/node_modules/pkg2/build/index.cts' does not exist.
File '/user/username/projects/myproject/node_modules/pkg2/build/index.d.cts' exists - use it as a name resolution result.
'package.json' does not have a 'peerDependencies' field.
Resolving real path for '/user/username/projects/myproject/node_modules/pkg2/build/index.d.cts', result '/user/username/projects/myproject/packages/pkg2/build/index.d.cts'.
======== Module name 'pkg2' was successfully resolved to '/user/username/projects/myproject/packages/pkg2/build/index.d.cts' with Package ID 'pkg2@1.0.0'. ========
======== Resolving module './const.cjs' from '/user/username/projects/myproject/packages/pkg2/index.cts'. ========
Using compiler options of project reference redirect '/user/username/projects/myproject/packages/pkg2/tsconfig.json'.
Module resolution kind is not specified, using 'Node16'.
Resolving in CJS mode with conditions 'require', 'types', 'node'.
Loading module as file / folder, candidate module location '/user/username/projects/myproject/packages/pkg2/const.cjs', target file types: TypeScript, JavaScript, Declaration.
File name '/user/username/projects/myproject/packages/pkg2/const.cjs' has a '.cjs' extension - stripping it.
File '/user/username/projects/myproject/packages/pkg2/const.cts' exists - use it as a name resolution result.
======== Module name './const.cjs' was successfully resolved to '/user/username/projects/myproject/packages/pkg2/const.cts'. ========
[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.

//// [/user/username/projects/myproject/packages/pkg1/build/index.js] *modified* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.theNum = void 0;
exports.theNum = 42;

//// [/user/username/projects/myproject/packages/pkg1/build/tsconfig.tsbuildinfo] *rewrite with same content*
//// [/user/username/projects/myproject/packages/pkg1/build/tsconfig.tsbuildinfo.readable.baseline.txt] *rewrite with same content*
//// [/user/username/projects/myproject/packages/pkg2/build/index.cjs] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

//// [/user/username/projects/myproject/packages/pkg2/build/index.d.cts] *new* 
export type { TheNum } from './const.cjs';

//// [/user/username/projects/myproject/packages/pkg2/build/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[[2,3]],"fileNames":["lib.es2022.full.d.ts","../const.cts","../index.cts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"be0f939ab1143e4064a3742586332724-export type TheNum = 42;","signature":"56e2d69d2edd1f0edd1a64ecfdf6de0d-export type TheNum = 42;\n","impliedNodeFormat":1},{"version":"7bb214373f4d1876e9a0040d287d1b6e-export type { TheNum } from './const.cjs';","signature":"2c7786a1f125eb57a4db00a4d58e384a-export type { TheNum } from './const.cjs';\n","impliedNodeFormat":1}],"fileIdsList":[[2]],"options":{"composite":true,"module":100,"outDir":"./"},"referencedMap":[[3,1]],"latestChangedDtsFile":"./index.d.cts"}
//// [/user/username/projects/myproject/packages/pkg2/build/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "../const.cts",
        "../index.cts"
      ],
      "original": [
        2,
        3
      ]
    }
  ],
  "fileNames": [
    "lib.es2022.full.d.ts",
    "../const.cts",
    "../index.cts"
  ],
  "fileInfos": [
    {
      "fileName": "lib.es2022.full.d.ts",
      "version": "8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };",
      "signature": "8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "../const.cts",
      "version": "be0f939ab1143e4064a3742586332724-export type TheNum = 42;",
      "signature": "56e2d69d2edd1f0edd1a64ecfdf6de0d-export type TheNum = 42;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "be0f939ab1143e4064a3742586332724-export type TheNum = 42;",
        "signature": "56e2d69d2edd1f0edd1a64ecfdf6de0d-export type TheNum = 42;\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "../index.cts",
      "version": "7bb214373f4d1876e9a0040d287d1b6e-export type { TheNum } from './const.cjs';",
      "signature": "2c7786a1f125eb57a4db00a4d58e384a-export type { TheNum } from './const.cjs';\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "7bb214373f4d1876e9a0040d287d1b6e-export type { TheNum } from './const.cjs';",
        "signature": "2c7786a1f125eb57a4db00a4d58e384a-export type { TheNum } from './const.cjs';\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "fileIdsList": [
    [
      "../const.cts"
    ]
  ],
  "options": {
    "composite": true,
    "module": 100,
    "outDir": "./"
  },
  "referencedMap": {
    "../index.cts": [
      "../const.cts"
    ]
  },
  "latestChangedDtsFile": "./index.d.cts",
  "size": 1404
}

packages/pkg2/tsconfig.json::
SemanticDiagnostics::
*refresh*    /user/username/projects/myproject/packages/pkg2/index.cts
Signatures::
(computed .d.ts) /user/username/projects/myproject/packages/pkg2/index.cts

packages/pkg1/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es2022.full.d.ts
*refresh*    /user/username/projects/myproject/packages/pkg2/build/const.d.cts
*refresh*    /user/username/projects/myproject/packages/pkg2/build/index.d.cts
*refresh*    /user/username/projects/myproject/packages/pkg1/index.ts
Signatures::
