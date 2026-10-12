currentDirectory::/home/src/workspaces/project
useCaseSensitiveFileNames::true
Input::
//// [/home/src/workspaces/project/configs/first/base.json] *new* 
{"compilerOptions":{"paths":{"short":["./thing.ts"]}}}
//// [/home/src/workspaces/project/configs/first/thing.ts] *new* 
export class Thing { private field = 1; }

//// [/home/src/workspaces/project/configs/second/base.json] *new* 
{"compilerOptions":{"paths":{"short":["./thing.ts"]}}}
//// [/home/src/workspaces/project/configs/second/thing.ts] *new* 
export class Thing { private field = 2; }

//// [/home/src/workspaces/project/producer/factory.ts] *new* 
import { Thing } from '../configs/first/thing';
export function make() { return new Thing(); }

//// [/home/src/workspaces/project/producer/index.ts] *new* 
import { make } from './factory';
export const result = make();

//// [/home/src/workspaces/project/producer/tsconfig.json] *new* 
{
					"extends": "../configs/second/base.json",
					"compilerOptions": {
						"strict": true, "module": "esnext", "moduleResolution": "bundler",
						"composite": true, "declaration": true, "emitDeclarationOnly": true,
						"rootDir": "..", "outDir": "dist"
					},
					"files": ["index.ts"]
				}

tsgo --build producer --verbose
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * producer/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'producer/tsconfig.json' is out of date because output file 'producer/dist/producer/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project 'producer/tsconfig.json'...

[96mproducer/factory.ts[0m:[93m1[0m:[93m23[0m - [91merror[0m[90m TS6307: [0mFile '/home/src/workspaces/project/configs/first/thing.ts' is not listed within the file list of project '/home/src/workspaces/project/producer/tsconfig.json'. Projects must list all files or use an 'include' pattern.

[7m1[0m import { Thing } from '../configs/first/thing';
[7m [0m [91m                      ~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m1[0m:[93m22[0m - [91merror[0m[90m TS6307: [0mFile '/home/src/workspaces/project/producer/factory.ts' is not listed within the file list of project '/home/src/workspaces/project/producer/tsconfig.json'. Projects must list all files or use an 'include' pattern.

[7m1[0m import { make } from './factory';
[7m [0m [91m                     ~~~~~~~~~~~[0m


Found 2 errors in 2 files.

Errors  Files
     1  producer/factory.ts[90m:1[0m
     1  producer/index.ts[90m:1[0m

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
//// [/home/src/workspaces/project/producer/dist/configs/first/thing.d.ts] *new* 
export declare class Thing {
    private field;
}

//// [/home/src/workspaces/project/producer/dist/producer/factory.d.ts] *new* 
import { Thing } from '../configs/first/thing';
export declare function make(): Thing;

//// [/home/src/workspaces/project/producer/dist/producer/index.d.ts] *new* 
export declare const result: import("../configs/first/thing").Thing;

//// [/home/src/workspaces/project/producer/dist/producer/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","errors":true,"root":[4],"fileNames":["lib.es2026.full.d.ts","../../../configs/first/thing.ts","../../factory.ts","../../index.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"1e13636538b7ccc39e192111e556e4fd-export class Thing { private field = 1; }\n","signature":"fd3b9b2da1026c3ff32025ff8ed07329-export declare class Thing {\n    private field;\n}\n","impliedNodeFormat":1},{"version":"8b7b5a693a77e15abcd9007840a17c07-import { Thing } from '../configs/first/thing';\nexport function make() { return new Thing(); }\n","signature":"e8598c58e2f7e802512f5c8d9e198fe8-import { Thing } from '../configs/first/thing';\nexport declare function make(): Thing;\n","impliedNodeFormat":1},{"version":"b279346232fdfce139138519c257ae08-import { make } from './factory';\nexport const result = make();\n","signature":"c0bfd7d589d12d912d62249ca8e6c68a-export declare const result: import(\"../configs/first/thing\").Thing;\n","impliedNodeFormat":1}],"fileIdsList":[[2],[3]],"options":{"composite":true,"emitDeclarationOnly":true,"declaration":true,"module":99,"moduleResolution":100,"outDir":"..","paths":{"short":["./thing.ts"]},"rootDir":"../../..","strict":true},"referencedMap":[[3,1],[4,2]],"latestChangedDtsFile":"./index.d.ts"}
//// [/home/src/workspaces/project/producer/dist/producer/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "errors": true,
  "root": [
    {
      "files": [
        "../../index.ts"
      ],
      "original": 4
    }
  ],
  "fileNames": [
    "lib.es2026.full.d.ts",
    "../../../configs/first/thing.ts",
    "../../factory.ts",
    "../../index.ts"
  ],
  "fileInfos": [
    {
      "fileName": "lib.es2026.full.d.ts",
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
      "fileName": "../../../configs/first/thing.ts",
      "version": "1e13636538b7ccc39e192111e556e4fd-export class Thing { private field = 1; }\n",
      "signature": "fd3b9b2da1026c3ff32025ff8ed07329-export declare class Thing {\n    private field;\n}\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "1e13636538b7ccc39e192111e556e4fd-export class Thing { private field = 1; }\n",
        "signature": "fd3b9b2da1026c3ff32025ff8ed07329-export declare class Thing {\n    private field;\n}\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "../../factory.ts",
      "version": "8b7b5a693a77e15abcd9007840a17c07-import { Thing } from '../configs/first/thing';\nexport function make() { return new Thing(); }\n",
      "signature": "e8598c58e2f7e802512f5c8d9e198fe8-import { Thing } from '../configs/first/thing';\nexport declare function make(): Thing;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "8b7b5a693a77e15abcd9007840a17c07-import { Thing } from '../configs/first/thing';\nexport function make() { return new Thing(); }\n",
        "signature": "e8598c58e2f7e802512f5c8d9e198fe8-import { Thing } from '../configs/first/thing';\nexport declare function make(): Thing;\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "../../index.ts",
      "version": "b279346232fdfce139138519c257ae08-import { make } from './factory';\nexport const result = make();\n",
      "signature": "c0bfd7d589d12d912d62249ca8e6c68a-export declare const result: import(\"../configs/first/thing\").Thing;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "b279346232fdfce139138519c257ae08-import { make } from './factory';\nexport const result = make();\n",
        "signature": "c0bfd7d589d12d912d62249ca8e6c68a-export declare const result: import(\"../configs/first/thing\").Thing;\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "fileIdsList": [
    [
      "../../../configs/first/thing.ts"
    ],
    [
      "../../factory.ts"
    ]
  ],
  "options": {
    "composite": true,
    "emitDeclarationOnly": true,
    "declaration": true,
    "module": 99,
    "moduleResolution": 100,
    "outDir": "..",
    "paths": {
      "short": [
        "./thing.ts"
      ]
    },
    "rootDir": "../../..",
    "strict": true
  },
  "referencedMap": {
    "../../factory.ts": [
      "../../../configs/first/thing.ts"
    ],
    "../../index.ts": [
      "../../factory.ts"
    ]
  },
  "latestChangedDtsFile": "./index.d.ts",
  "size": 2001
}

producer/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es2026.full.d.ts
*refresh*    /home/src/workspaces/project/configs/first/thing.ts
*refresh*    /home/src/workspaces/project/producer/factory.ts
*refresh*    /home/src/workspaces/project/producer/index.ts
Signatures::
(stored at emit) /home/src/workspaces/project/configs/first/thing.ts
(stored at emit) /home/src/workspaces/project/producer/factory.ts
(stored at emit) /home/src/workspaces/project/producer/index.ts


Edit [0]:: no change

tsgo --build producer --verbose
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * producer/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'producer/tsconfig.json' is out of date because buildinfo file 'producer/dist/producer/tsconfig.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project 'producer/tsconfig.json'...

[96mproducer/factory.ts[0m:[93m1[0m:[93m23[0m - [91merror[0m[90m TS6307: [0mFile '/home/src/workspaces/project/configs/first/thing.ts' is not listed within the file list of project '/home/src/workspaces/project/producer/tsconfig.json'. Projects must list all files or use an 'include' pattern.

[7m1[0m import { Thing } from '../configs/first/thing';
[7m [0m [91m                      ~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m1[0m:[93m22[0m - [91merror[0m[90m TS6307: [0mFile '/home/src/workspaces/project/producer/factory.ts' is not listed within the file list of project '/home/src/workspaces/project/producer/tsconfig.json'. Projects must list all files or use an 'include' pattern.

[7m1[0m import { make } from './factory';
[7m [0m [91m                     ~~~~~~~~~~~[0m


Found 2 errors in 2 files.

Errors  Files
     1  producer/factory.ts[90m:1[0m
     1  producer/index.ts[90m:1[0m


producer/tsconfig.json::
SemanticDiagnostics::
Signatures::


Edit [1]:: change extends without changing paths or source files
//// [/home/src/workspaces/project/producer/tsconfig.json] *modified* 
{
					"extends": "../configs/first/base.json",
					"compilerOptions": {
						"strict": true, "module": "esnext", "moduleResolution": "bundler",
						"composite": true, "declaration": true, "emitDeclarationOnly": true,
						"rootDir": "..", "outDir": "dist"
					},
					"files": ["index.ts"]
				}

tsgo --build producer --verbose
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * producer/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'producer/tsconfig.json' is out of date because buildinfo file 'producer/dist/producer/tsconfig.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project 'producer/tsconfig.json'...

[96mproducer/factory.ts[0m:[93m1[0m:[93m23[0m - [91merror[0m[90m TS6307: [0mFile '/home/src/workspaces/project/configs/first/thing.ts' is not listed within the file list of project '/home/src/workspaces/project/producer/tsconfig.json'. Projects must list all files or use an 'include' pattern.

[7m1[0m import { Thing } from '../configs/first/thing';
[7m [0m [91m                      ~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m1[0m:[93m22[0m - [91merror[0m[90m TS6307: [0mFile '/home/src/workspaces/project/producer/factory.ts' is not listed within the file list of project '/home/src/workspaces/project/producer/tsconfig.json'. Projects must list all files or use an 'include' pattern.

[7m1[0m import { make } from './factory';
[7m [0m [91m                     ~~~~~~~~~~~[0m


Found 2 errors in 2 files.

Errors  Files
     1  producer/factory.ts[90m:1[0m
     1  producer/index.ts[90m:1[0m


producer/tsconfig.json::
SemanticDiagnostics::
Signatures::


Diff:: Changing the base of inherited paths leaves stale declaration module specifiers.
--- nonIncremental /home/src/workspaces/project/producer/dist/producer/index.d.ts
+++ incremental /home/src/workspaces/project/producer/dist/producer/index.d.ts
@@ -1,1 +1,1 @@
-export declare const result: import("short").Thing;
+export declare const result: import("../configs/first/thing").Thing;


Edit [2]:: no change

tsgo --build producer --verbose
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * producer/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'producer/tsconfig.json' is out of date because buildinfo file 'producer/dist/producer/tsconfig.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project 'producer/tsconfig.json'...

[96mproducer/factory.ts[0m:[93m1[0m:[93m23[0m - [91merror[0m[90m TS6307: [0mFile '/home/src/workspaces/project/configs/first/thing.ts' is not listed within the file list of project '/home/src/workspaces/project/producer/tsconfig.json'. Projects must list all files or use an 'include' pattern.

[7m1[0m import { Thing } from '../configs/first/thing';
[7m [0m [91m                      ~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m1[0m:[93m22[0m - [91merror[0m[90m TS6307: [0mFile '/home/src/workspaces/project/producer/factory.ts' is not listed within the file list of project '/home/src/workspaces/project/producer/tsconfig.json'. Projects must list all files or use an 'include' pattern.

[7m1[0m import { make } from './factory';
[7m [0m [91m                     ~~~~~~~~~~~[0m


Found 2 errors in 2 files.

Errors  Files
     1  producer/factory.ts[90m:1[0m
     1  producer/index.ts[90m:1[0m


producer/tsconfig.json::
SemanticDiagnostics::
Signatures::


Diff:: Changing the base of inherited paths leaves stale declaration module specifiers.
--- nonIncremental /home/src/workspaces/project/producer/dist/producer/index.d.ts
+++ incremental /home/src/workspaces/project/producer/dist/producer/index.d.ts
@@ -1,1 +1,1 @@
-export declare const result: import("short").Thing;
+export declare const result: import("../configs/first/thing").Thing;


Edit [3]:: force rebuild

tsgo --build producer --verbose --force
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * producer/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'producer/tsconfig.json' is being forcibly rebuilt

[[90mHH:MM:SS AM[0m] Building project 'producer/tsconfig.json'...

[96mproducer/factory.ts[0m:[93m1[0m:[93m23[0m - [91merror[0m[90m TS6307: [0mFile '/home/src/workspaces/project/configs/first/thing.ts' is not listed within the file list of project '/home/src/workspaces/project/producer/tsconfig.json'. Projects must list all files or use an 'include' pattern.

[7m1[0m import { Thing } from '../configs/first/thing';
[7m [0m [91m                      ~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m1[0m:[93m22[0m - [91merror[0m[90m TS6307: [0mFile '/home/src/workspaces/project/producer/factory.ts' is not listed within the file list of project '/home/src/workspaces/project/producer/tsconfig.json'. Projects must list all files or use an 'include' pattern.

[7m1[0m import { make } from './factory';
[7m [0m [91m                     ~~~~~~~~~~~[0m


Found 2 errors in 2 files.

Errors  Files
     1  producer/factory.ts[90m:1[0m
     1  producer/index.ts[90m:1[0m

//// [/home/src/workspaces/project/producer/dist/configs/first/thing.d.ts] *rewrite with same content*
//// [/home/src/workspaces/project/producer/dist/producer/factory.d.ts] *rewrite with same content*
//// [/home/src/workspaces/project/producer/dist/producer/index.d.ts] *modified* 
export declare const result: import("short").Thing;

//// [/home/src/workspaces/project/producer/dist/producer/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","errors":true,"root":[4],"fileNames":["lib.es2026.full.d.ts","../../../configs/first/thing.ts","../../factory.ts","../../index.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"1e13636538b7ccc39e192111e556e4fd-export class Thing { private field = 1; }\n","signature":"fd3b9b2da1026c3ff32025ff8ed07329-export declare class Thing {\n    private field;\n}\n","impliedNodeFormat":1},{"version":"8b7b5a693a77e15abcd9007840a17c07-import { Thing } from '../configs/first/thing';\nexport function make() { return new Thing(); }\n","signature":"e8598c58e2f7e802512f5c8d9e198fe8-import { Thing } from '../configs/first/thing';\nexport declare function make(): Thing;\n","impliedNodeFormat":1},{"version":"b279346232fdfce139138519c257ae08-import { make } from './factory';\nexport const result = make();\n","signature":"0e35362bb91c0babf0255c92a3f9a217-export declare const result: import(\"short\").Thing;\n","impliedNodeFormat":1}],"fileIdsList":[[2],[3]],"options":{"composite":true,"emitDeclarationOnly":true,"declaration":true,"module":99,"moduleResolution":100,"outDir":"..","paths":{"short":["./thing.ts"]},"rootDir":"../../..","strict":true},"referencedMap":[[3,1],[4,2]],"latestChangedDtsFile":"./index.d.ts"}
//// [/home/src/workspaces/project/producer/dist/producer/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "errors": true,
  "root": [
    {
      "files": [
        "../../index.ts"
      ],
      "original": 4
    }
  ],
  "fileNames": [
    "lib.es2026.full.d.ts",
    "../../../configs/first/thing.ts",
    "../../factory.ts",
    "../../index.ts"
  ],
  "fileInfos": [
    {
      "fileName": "lib.es2026.full.d.ts",
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
      "fileName": "../../../configs/first/thing.ts",
      "version": "1e13636538b7ccc39e192111e556e4fd-export class Thing { private field = 1; }\n",
      "signature": "fd3b9b2da1026c3ff32025ff8ed07329-export declare class Thing {\n    private field;\n}\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "1e13636538b7ccc39e192111e556e4fd-export class Thing { private field = 1; }\n",
        "signature": "fd3b9b2da1026c3ff32025ff8ed07329-export declare class Thing {\n    private field;\n}\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "../../factory.ts",
      "version": "8b7b5a693a77e15abcd9007840a17c07-import { Thing } from '../configs/first/thing';\nexport function make() { return new Thing(); }\n",
      "signature": "e8598c58e2f7e802512f5c8d9e198fe8-import { Thing } from '../configs/first/thing';\nexport declare function make(): Thing;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "8b7b5a693a77e15abcd9007840a17c07-import { Thing } from '../configs/first/thing';\nexport function make() { return new Thing(); }\n",
        "signature": "e8598c58e2f7e802512f5c8d9e198fe8-import { Thing } from '../configs/first/thing';\nexport declare function make(): Thing;\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "../../index.ts",
      "version": "b279346232fdfce139138519c257ae08-import { make } from './factory';\nexport const result = make();\n",
      "signature": "0e35362bb91c0babf0255c92a3f9a217-export declare const result: import(\"short\").Thing;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "b279346232fdfce139138519c257ae08-import { make } from './factory';\nexport const result = make();\n",
        "signature": "0e35362bb91c0babf0255c92a3f9a217-export declare const result: import(\"short\").Thing;\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "fileIdsList": [
    [
      "../../../configs/first/thing.ts"
    ],
    [
      "../../factory.ts"
    ]
  ],
  "options": {
    "composite": true,
    "emitDeclarationOnly": true,
    "declaration": true,
    "module": 99,
    "moduleResolution": 100,
    "outDir": "..",
    "paths": {
      "short": [
        "./thing.ts"
      ]
    },
    "rootDir": "../../..",
    "strict": true
  },
  "referencedMap": {
    "../../factory.ts": [
      "../../../configs/first/thing.ts"
    ],
    "../../index.ts": [
      "../../factory.ts"
    ]
  },
  "latestChangedDtsFile": "./index.d.ts",
  "size": 1984
}

producer/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es2026.full.d.ts
*refresh*    /home/src/workspaces/project/configs/first/thing.ts
*refresh*    /home/src/workspaces/project/producer/factory.ts
*refresh*    /home/src/workspaces/project/producer/index.ts
Signatures::
(stored at emit) /home/src/workspaces/project/configs/first/thing.ts
(stored at emit) /home/src/workspaces/project/producer/factory.ts
(stored at emit) /home/src/workspaces/project/producer/index.ts


Edit [4]:: no change

tsgo --build producer --verbose
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * producer/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'producer/tsconfig.json' is out of date because buildinfo file 'producer/dist/producer/tsconfig.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project 'producer/tsconfig.json'...

[96mproducer/factory.ts[0m:[93m1[0m:[93m23[0m - [91merror[0m[90m TS6307: [0mFile '/home/src/workspaces/project/configs/first/thing.ts' is not listed within the file list of project '/home/src/workspaces/project/producer/tsconfig.json'. Projects must list all files or use an 'include' pattern.

[7m1[0m import { Thing } from '../configs/first/thing';
[7m [0m [91m                      ~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m1[0m:[93m22[0m - [91merror[0m[90m TS6307: [0mFile '/home/src/workspaces/project/producer/factory.ts' is not listed within the file list of project '/home/src/workspaces/project/producer/tsconfig.json'. Projects must list all files or use an 'include' pattern.

[7m1[0m import { make } from './factory';
[7m [0m [91m                     ~~~~~~~~~~~[0m


Found 2 errors in 2 files.

Errors  Files
     1  producer/factory.ts[90m:1[0m
     1  producer/index.ts[90m:1[0m


producer/tsconfig.json::
SemanticDiagnostics::
Signatures::
