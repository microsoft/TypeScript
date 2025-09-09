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
    "main": "build/index.js"
}
//// [/user/username/projects/myproject/packages/pkg1/tsconfig.json] *new* 
{
    "compilerOptions": {
        "outDir": "build",
    },
    "references": [{ "path": "../pkg2" }],
}
//// [/user/username/projects/myproject/packages/pkg2/const.ts] *new* 
export type TheNum = 42;
//// [/user/username/projects/myproject/packages/pkg2/index.ts] *new* 
export type { TheNum } from './const.js';
//// [/user/username/projects/myproject/packages/pkg2/other.ts] *new* 
export type TheStr = string;
//// [/user/username/projects/myproject/packages/pkg2/package.json] *new* 
{
    "name": "pkg2",
    "version": "1.0.0",
    "main": "build/index.js"
}
//// [/user/username/projects/myproject/packages/pkg2/tsconfig.json] *new* 
{
    "compilerOptions": {
        "composite": true,
        "outDir": "build",
    },
}

tsgo -b packages/pkg1 --verbose -w --traceResolution
ExitStatus:: Success
Output::
[2J[3J[H[[90mHH:MM:SS AM[0m] Starting compilation in watch mode...

[[90mHH:MM:SS AM[0m] Projects in this build: 
    * packages/pkg2/tsconfig.json
    * packages/pkg1/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'packages/pkg2/tsconfig.json' is out of date because output file 'packages/pkg2/build/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project 'packages/pkg2/tsconfig.json'...

======== Resolving module './const.js' from '/user/username/projects/myproject/packages/pkg2/index.ts'. ========
Module resolution kind is not specified, using 'Bundler'.
Resolving in CJS mode with conditions 'require', 'types'.
Loading module as file / folder, candidate module location '/user/username/projects/myproject/packages/pkg2/const.js', target file types: TypeScript, JavaScript, Declaration, JSON.
File name '/user/username/projects/myproject/packages/pkg2/const.js' has a '.js' extension - stripping it.
File '/user/username/projects/myproject/packages/pkg2/const.ts' exists - use it as a name resolution result.
======== Module name './const.js' was successfully resolved to '/user/username/projects/myproject/packages/pkg2/const.ts'. ========
[[90mHH:MM:SS AM[0m] Project 'packages/pkg1/tsconfig.json' is out of date because output file 'packages/pkg1/build/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project 'packages/pkg1/tsconfig.json'...

======== Resolving module 'pkg2' from '/user/username/projects/myproject/packages/pkg1/index.ts'. ========
Module resolution kind is not specified, using 'Bundler'.
Resolving in CJS mode with conditions 'require', 'types'.
Found 'package.json' at '/user/username/projects/myproject/packages/pkg1/package.json'.
Loading module 'pkg2' from 'node_modules' folder, target file types: TypeScript, JavaScript, Declaration, JSON.
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
'package.json' has 'main' field 'build/index.js' that references '/user/username/projects/myproject/node_modules/pkg2/build/index.js'.
File name '/user/username/projects/myproject/node_modules/pkg2/build/index.js' has a '.js' extension - stripping it.
File '/user/username/projects/myproject/node_modules/pkg2/build/index.ts' does not exist.
File '/user/username/projects/myproject/node_modules/pkg2/build/index.tsx' does not exist.
File '/user/username/projects/myproject/node_modules/pkg2/build/index.d.ts' exists - use it as a name resolution result.
'package.json' does not have a 'peerDependencies' field.
Resolving real path for '/user/username/projects/myproject/node_modules/pkg2/build/index.d.ts', result '/user/username/projects/myproject/packages/pkg2/build/index.d.ts'.
======== Module name 'pkg2' was successfully resolved to '/user/username/projects/myproject/packages/pkg2/build/index.d.ts' with Package ID 'pkg2@1.0.0'. ========
======== Resolving module './const.js' from '/user/username/projects/myproject/packages/pkg2/index.ts'. ========
Using compiler options of project reference redirect '/user/username/projects/myproject/packages/pkg2/tsconfig.json'.
Module resolution kind is not specified, using 'Bundler'.
Resolving in CJS mode with conditions 'require', 'types'.
Loading module as file / folder, candidate module location '/user/username/projects/myproject/packages/pkg2/const.js', target file types: TypeScript, JavaScript, Declaration, JSON.
File name '/user/username/projects/myproject/packages/pkg2/const.js' has a '.js' extension - stripping it.
File '/user/username/projects/myproject/packages/pkg2/const.ts' exists - use it as a name resolution result.
======== Module name './const.js' was successfully resolved to '/user/username/projects/myproject/packages/pkg2/const.ts'. ========
[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.

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
//// [/user/username/projects/myproject/packages/pkg1/build/index.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.theNum = void 0;
exports.theNum = 42;

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
//// [/user/username/projects/myproject/packages/pkg2/build/const.d.ts] *new* 
export type TheNum = 42;

//// [/user/username/projects/myproject/packages/pkg2/build/const.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

//// [/user/username/projects/myproject/packages/pkg2/build/index.d.ts] *new* 
export type { TheNum } from './const.js';

//// [/user/username/projects/myproject/packages/pkg2/build/index.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

//// [/user/username/projects/myproject/packages/pkg2/build/other.d.ts] *new* 
export type TheStr = string;

//// [/user/username/projects/myproject/packages/pkg2/build/other.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

//// [/user/username/projects/myproject/packages/pkg2/build/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":[[2,4]],"fileNames":["lib.d.ts","../const.ts","../index.ts","../other.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"be0f939ab1143e4064a3742586332724-export type TheNum = 42;","signature":"56e2d69d2edd1f0edd1a64ecfdf6de0d-export type TheNum = 42;\n","impliedNodeFormat":1},{"version":"c95c354b23966e289caeaece40bb8d0a-export type { TheNum } from './const.js';","signature":"f257912cfebb94a04c6ba4e8f754166a-export type { TheNum } from './const.js';\n","impliedNodeFormat":1},{"version":"dfadcd1940a5dc36721d3311ebd8eb8b-export type TheStr = string;","signature":"9551f60bc06319547b96535db4cb8520-export type TheStr = string;\n","impliedNodeFormat":1}],"fileIdsList":[[2]],"options":{"composite":true,"outDir":"./"},"referencedMap":[[3,1]],"latestChangedDtsFile":"./other.d.ts"}
//// [/user/username/projects/myproject/packages/pkg2/build/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "../const.ts",
        "../index.ts",
        "../other.ts"
      ],
      "original": [
        2,
        4
      ]
    }
  ],
  "fileNames": [
    "lib.d.ts",
    "../const.ts",
    "../index.ts",
    "../other.ts"
  ],
  "fileInfos": [
    {
      "fileName": "lib.d.ts",
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
      "fileName": "../const.ts",
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
      "version": "c95c354b23966e289caeaece40bb8d0a-export type { TheNum } from './const.js';",
      "signature": "f257912cfebb94a04c6ba4e8f754166a-export type { TheNum } from './const.js';\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "c95c354b23966e289caeaece40bb8d0a-export type { TheNum } from './const.js';",
        "signature": "f257912cfebb94a04c6ba4e8f754166a-export type { TheNum } from './const.js';\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "../other.ts",
      "version": "dfadcd1940a5dc36721d3311ebd8eb8b-export type TheStr = string;",
      "signature": "9551f60bc06319547b96535db4cb8520-export type TheStr = string;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "dfadcd1940a5dc36721d3311ebd8eb8b-export type TheStr = string;",
        "signature": "9551f60bc06319547b96535db4cb8520-export type TheStr = string;\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "fileIdsList": [
    [
      "../const.ts"
    ]
  ],
  "options": {
    "composite": true,
    "outDir": "./"
  },
  "referencedMap": {
    "../index.ts": [
      "../const.ts"
    ]
  },
  "latestChangedDtsFile": "./other.d.ts",
  "size": 1564
}

packages/pkg2/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.d.ts
*refresh*    /user/username/projects/myproject/packages/pkg2/const.ts
*refresh*    /user/username/projects/myproject/packages/pkg2/index.ts
*refresh*    /user/username/projects/myproject/packages/pkg2/other.ts
Signatures::
(stored at emit) /user/username/projects/myproject/packages/pkg2/const.ts
(stored at emit) /user/username/projects/myproject/packages/pkg2/index.ts
(stored at emit) /user/username/projects/myproject/packages/pkg2/other.ts

packages/pkg1/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.d.ts
*refresh*    /user/username/projects/myproject/packages/pkg2/build/const.d.ts
*refresh*    /user/username/projects/myproject/packages/pkg2/build/index.d.ts
*refresh*    /user/username/projects/myproject/packages/pkg1/index.ts
Signatures::


Edit [0]:: reports import errors after change to package file
//// [/user/username/projects/myproject/packages/pkg2/package.json] *modified* 
{
    "name": "pkg2",
    "version": "1.0.0",
    "main": "build/other.js"
}


Output::



Diff:: Package.json watch pending, so no change detected yet
--- nonIncremental.output.txt
+++ incremental.output.txt
@@ -1,5 +0,0 @@
-[96mpackages/pkg1/index.ts[0m:[93m1[0m:[93m15[0m - [91merror[0m[90m TS2305: [0mModule '"pkg2"' has no exported member 'TheNum'.
-
-[7m1[0m import type { TheNum } from 'pkg2'
-[7m [0m [91m              ~~~~~~[0m
-

Edit [1]:: removes those errors when a package file is changed back
//// [/user/username/projects/myproject/packages/pkg2/package.json] *modified* 
{
    "name": "pkg2",
    "version": "1.0.0",
    "main": "build/index.js"
}


Output::

