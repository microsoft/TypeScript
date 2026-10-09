currentDirectory::/home/src/workspaces/project
useCaseSensitiveFileNames::true
Input::
//// [/home/src/workspaces/project/external/factory.ts] *new* 
import { Thing } from './thing';
export function make() { return new Thing(); }

//// [/home/src/workspaces/project/external/thing.ts] *new* 
export class Thing { private field = 1; }

//// [/home/src/workspaces/project/producer/index.ts] *new* 
import { make } from '../external/factory';
export const result = make();

//// [/home/src/workspaces/project/producer/tsconfig.json] *new* 
{
    "compilerOptions": {
        "composite": true,
        "declaration": true,
        "emitDeclarationOnly": true,
        "lib": [
            "es2020"
        ],
        "module": "esnext",
        "moduleResolution": "bundler",
        "outDir": "dist",
        "paths": {
            "short": [
                "../external/thing.ts"
            ]
        },
        "rootDir": "..",
        "strict": true,
        "target": "es2020"
    },
    "files": [
        "index.ts"
    ]
}

tsgo --project producer --listEmittedFiles
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[96mexternal/factory.ts[0m:[93m1[0m:[93m23[0m - [91merror[0m[90m TS6307: [0mFile '/home/src/workspaces/project/external/thing.ts' is not listed within the file list of project '/home/src/workspaces/project/producer/tsconfig.json'. Projects must list all files or use an 'include' pattern.

[7m1[0m import { Thing } from './thing';
[7m [0m [91m                      ~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m1[0m:[93m22[0m - [91merror[0m[90m TS6307: [0mFile '/home/src/workspaces/project/external/factory.ts' is not listed within the file list of project '/home/src/workspaces/project/producer/tsconfig.json'. Projects must list all files or use an 'include' pattern.

[7m1[0m import { make } from '../external/factory';
[7m [0m [91m                     ~~~~~~~~~~~~~~~~~~~~~[0m

TSFILE: /home/src/workspaces/project/producer/dist/external/thing.d.ts
TSFILE: /home/src/workspaces/project/producer/dist/external/factory.d.ts
TSFILE: /home/src/workspaces/project/producer/dist/producer/index.d.ts
TSFILE: /home/src/workspaces/project/producer/dist/producer/tsconfig.tsbuildinfo

Found 2 errors in 2 files.

Errors  Files
     1  external/factory.ts[90m:1[0m
     1  producer/index.ts[90m:1[0m

//// [/home/src/tslibs/TS/Lib/lib.es2020.d.ts] *Lib*
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
//// [/home/src/workspaces/project/producer/dist/external/factory.d.ts] *new* 
import { Thing } from './thing';
export declare function make(): Thing;

//// [/home/src/workspaces/project/producer/dist/external/thing.d.ts] *new* 
export declare class Thing {
    private field;
}

//// [/home/src/workspaces/project/producer/dist/producer/index.d.ts] *new* 
export declare const result: import("short").Thing;

//// [/home/src/workspaces/project/producer/dist/producer/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","errors":true,"root":[4],"fileNames":["lib.es2020.d.ts","../../../external/thing.ts","../../../external/factory.ts","../../index.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"1e13636538b7ccc39e192111e556e4fd-export class Thing { private field = 1; }\n","signature":"fd3b9b2da1026c3ff32025ff8ed07329-export declare class Thing {\n    private field;\n}\n","impliedNodeFormat":1},{"version":"ca900e2385cd189084934dd47c6733af-import { Thing } from './thing';\nexport function make() { return new Thing(); }\n","signature":"8541230877a83bcc0999fabcf92106a2-import { Thing } from './thing';\nexport declare function make(): Thing;\n","impliedNodeFormat":1},{"version":"c380ebe92cb8d9563d50748aaca5c414-import { make } from '../external/factory';\nexport const result = make();\n","signature":"0e35362bb91c0babf0255c92a3f9a217-export declare const result: import(\"short\").Thing;\n","impliedNodeFormat":1}],"fileIdsList":[[2],[3]],"options":{"composite":true,"emitDeclarationOnly":true,"declaration":true,"module":99,"outDir":"..","rootDir":"../../..","strict":true,"target":7},"referencedMap":[[3,1],[4,2]],"latestChangedDtsFile":"./index.d.ts"}
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
    "lib.es2020.d.ts",
    "../../../external/thing.ts",
    "../../../external/factory.ts",
    "../../index.ts"
  ],
  "fileInfos": [
    {
      "fileName": "lib.es2020.d.ts",
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
      "fileName": "../../../external/thing.ts",
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
      "fileName": "../../../external/factory.ts",
      "version": "ca900e2385cd189084934dd47c6733af-import { Thing } from './thing';\nexport function make() { return new Thing(); }\n",
      "signature": "8541230877a83bcc0999fabcf92106a2-import { Thing } from './thing';\nexport declare function make(): Thing;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "ca900e2385cd189084934dd47c6733af-import { Thing } from './thing';\nexport function make() { return new Thing(); }\n",
        "signature": "8541230877a83bcc0999fabcf92106a2-import { Thing } from './thing';\nexport declare function make(): Thing;\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "../../index.ts",
      "version": "c380ebe92cb8d9563d50748aaca5c414-import { make } from '../external/factory';\nexport const result = make();\n",
      "signature": "0e35362bb91c0babf0255c92a3f9a217-export declare const result: import(\"short\").Thing;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "c380ebe92cb8d9563d50748aaca5c414-import { make } from '../external/factory';\nexport const result = make();\n",
        "signature": "0e35362bb91c0babf0255c92a3f9a217-export declare const result: import(\"short\").Thing;\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "fileIdsList": [
    [
      "../../../external/thing.ts"
    ],
    [
      "../../../external/factory.ts"
    ]
  ],
  "options": {
    "composite": true,
    "emitDeclarationOnly": true,
    "declaration": true,
    "module": 99,
    "outDir": "..",
    "rootDir": "../../..",
    "strict": true,
    "target": 7
  },
  "referencedMap": {
    "../../../external/factory.ts": [
      "../../../external/thing.ts"
    ],
    "../../index.ts": [
      "../../../external/factory.ts"
    ]
  },
  "latestChangedDtsFile": "./index.d.ts",
  "size": 1921
}

producer/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es2020.d.ts
*refresh*    /home/src/workspaces/project/external/thing.ts
*refresh*    /home/src/workspaces/project/external/factory.ts
*refresh*    /home/src/workspaces/project/producer/index.ts
Signatures::
(stored at emit) /home/src/workspaces/project/external/thing.ts
(stored at emit) /home/src/workspaces/project/external/factory.ts
(stored at emit) /home/src/workspaces/project/producer/index.ts


Edit [0]:: no change

tsgo --project producer --listEmittedFiles
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[96mexternal/factory.ts[0m:[93m1[0m:[93m23[0m - [91merror[0m[90m TS6307: [0mFile '/home/src/workspaces/project/external/thing.ts' is not listed within the file list of project '/home/src/workspaces/project/producer/tsconfig.json'. Projects must list all files or use an 'include' pattern.

[7m1[0m import { Thing } from './thing';
[7m [0m [91m                      ~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m1[0m:[93m22[0m - [91merror[0m[90m TS6307: [0mFile '/home/src/workspaces/project/external/factory.ts' is not listed within the file list of project '/home/src/workspaces/project/producer/tsconfig.json'. Projects must list all files or use an 'include' pattern.

[7m1[0m import { make } from '../external/factory';
[7m [0m [91m                     ~~~~~~~~~~~~~~~~~~~~~[0m


Found 2 errors in 2 files.

Errors  Files
     1  external/factory.ts[90m:1[0m
     1  producer/index.ts[90m:1[0m


producer/tsconfig.json::
SemanticDiagnostics::
Signatures::


Edit [1]:: change paths without changing source files
//// [/home/src/workspaces/project/producer/tsconfig.json] *modified* 
{
    "compilerOptions": {
        "composite": true,
        "declaration": true,
        "emitDeclarationOnly": true,
        "lib": [
            "es2020"
        ],
        "module": "esnext",
        "moduleResolution": "bundler",
        "outDir": "dist",
        "paths": {
            "renamed": [
                "../external/thing.ts"
            ]
        },
        "rootDir": "..",
        "strict": true,
        "target": "es2020"
    },
    "files": [
        "index.ts"
    ]
}

tsgo --project producer --listEmittedFiles
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[96mexternal/factory.ts[0m:[93m1[0m:[93m23[0m - [91merror[0m[90m TS6307: [0mFile '/home/src/workspaces/project/external/thing.ts' is not listed within the file list of project '/home/src/workspaces/project/producer/tsconfig.json'. Projects must list all files or use an 'include' pattern.

[7m1[0m import { Thing } from './thing';
[7m [0m [91m                      ~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m1[0m:[93m22[0m - [91merror[0m[90m TS6307: [0mFile '/home/src/workspaces/project/external/factory.ts' is not listed within the file list of project '/home/src/workspaces/project/producer/tsconfig.json'. Projects must list all files or use an 'include' pattern.

[7m1[0m import { make } from '../external/factory';
[7m [0m [91m                     ~~~~~~~~~~~~~~~~~~~~~[0m


Found 2 errors in 2 files.

Errors  Files
     1  external/factory.ts[90m:1[0m
     1  producer/index.ts[90m:1[0m


producer/tsconfig.json::
SemanticDiagnostics::
Signatures::


Diff:: Changing paths without editing source files leaves stale output or diagnostics.
--- nonIncremental /home/src/workspaces/project/producer/dist/producer/index.d.ts
+++ incremental /home/src/workspaces/project/producer/dist/producer/index.d.ts
@@ -1,1 +1,1 @@
-export declare const result: import("renamed").Thing;
+export declare const result: import("short").Thing;


Edit [2]:: no change

tsgo --project producer --listEmittedFiles
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[96mexternal/factory.ts[0m:[93m1[0m:[93m23[0m - [91merror[0m[90m TS6307: [0mFile '/home/src/workspaces/project/external/thing.ts' is not listed within the file list of project '/home/src/workspaces/project/producer/tsconfig.json'. Projects must list all files or use an 'include' pattern.

[7m1[0m import { Thing } from './thing';
[7m [0m [91m                      ~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m1[0m:[93m22[0m - [91merror[0m[90m TS6307: [0mFile '/home/src/workspaces/project/external/factory.ts' is not listed within the file list of project '/home/src/workspaces/project/producer/tsconfig.json'. Projects must list all files or use an 'include' pattern.

[7m1[0m import { make } from '../external/factory';
[7m [0m [91m                     ~~~~~~~~~~~~~~~~~~~~~[0m


Found 2 errors in 2 files.

Errors  Files
     1  external/factory.ts[90m:1[0m
     1  producer/index.ts[90m:1[0m


producer/tsconfig.json::
SemanticDiagnostics::
Signatures::


Diff:: Changing paths without editing source files leaves stale output or diagnostics.
--- nonIncremental /home/src/workspaces/project/producer/dist/producer/index.d.ts
+++ incremental /home/src/workspaces/project/producer/dist/producer/index.d.ts
@@ -1,1 +1,1 @@
-export declare const result: import("renamed").Thing;
+export declare const result: import("short").Thing;


Edit [3]:: force rebuild with the same compiler options

tsgo --build producer --verbose --force
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * producer/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'producer/tsconfig.json' is being forcibly rebuilt

[[90mHH:MM:SS AM[0m] Building project 'producer/tsconfig.json'...

[96mexternal/factory.ts[0m:[93m1[0m:[93m23[0m - [91merror[0m[90m TS6307: [0mFile '/home/src/workspaces/project/external/thing.ts' is not listed within the file list of project '/home/src/workspaces/project/producer/tsconfig.json'. Projects must list all files or use an 'include' pattern.

[7m1[0m import { Thing } from './thing';
[7m [0m [91m                      ~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m1[0m:[93m22[0m - [91merror[0m[90m TS6307: [0mFile '/home/src/workspaces/project/external/factory.ts' is not listed within the file list of project '/home/src/workspaces/project/producer/tsconfig.json'. Projects must list all files or use an 'include' pattern.

[7m1[0m import { make } from '../external/factory';
[7m [0m [91m                     ~~~~~~~~~~~~~~~~~~~~~[0m


Found 2 errors in 2 files.

Errors  Files
     1  external/factory.ts[90m:1[0m
     1  producer/index.ts[90m:1[0m

//// [/home/src/workspaces/project/producer/dist/external/factory.d.ts] *rewrite with same content*
//// [/home/src/workspaces/project/producer/dist/external/thing.d.ts] *rewrite with same content*
//// [/home/src/workspaces/project/producer/dist/producer/index.d.ts] *modified* 
export declare const result: import("renamed").Thing;

//// [/home/src/workspaces/project/producer/dist/producer/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","errors":true,"root":[4],"fileNames":["lib.es2020.d.ts","../../../external/thing.ts","../../../external/factory.ts","../../index.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"1e13636538b7ccc39e192111e556e4fd-export class Thing { private field = 1; }\n","signature":"fd3b9b2da1026c3ff32025ff8ed07329-export declare class Thing {\n    private field;\n}\n","impliedNodeFormat":1},{"version":"ca900e2385cd189084934dd47c6733af-import { Thing } from './thing';\nexport function make() { return new Thing(); }\n","signature":"8541230877a83bcc0999fabcf92106a2-import { Thing } from './thing';\nexport declare function make(): Thing;\n","impliedNodeFormat":1},{"version":"c380ebe92cb8d9563d50748aaca5c414-import { make } from '../external/factory';\nexport const result = make();\n","signature":"dc47be6432a95c739ebc4a61d1942dd9-export declare const result: import(\"renamed\").Thing;\n","impliedNodeFormat":1}],"fileIdsList":[[2],[3]],"options":{"composite":true,"emitDeclarationOnly":true,"declaration":true,"module":99,"outDir":"..","rootDir":"../../..","strict":true,"target":7},"referencedMap":[[3,1],[4,2]],"latestChangedDtsFile":"./index.d.ts"}
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
    "lib.es2020.d.ts",
    "../../../external/thing.ts",
    "../../../external/factory.ts",
    "../../index.ts"
  ],
  "fileInfos": [
    {
      "fileName": "lib.es2020.d.ts",
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
      "fileName": "../../../external/thing.ts",
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
      "fileName": "../../../external/factory.ts",
      "version": "ca900e2385cd189084934dd47c6733af-import { Thing } from './thing';\nexport function make() { return new Thing(); }\n",
      "signature": "8541230877a83bcc0999fabcf92106a2-import { Thing } from './thing';\nexport declare function make(): Thing;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "ca900e2385cd189084934dd47c6733af-import { Thing } from './thing';\nexport function make() { return new Thing(); }\n",
        "signature": "8541230877a83bcc0999fabcf92106a2-import { Thing } from './thing';\nexport declare function make(): Thing;\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "../../index.ts",
      "version": "c380ebe92cb8d9563d50748aaca5c414-import { make } from '../external/factory';\nexport const result = make();\n",
      "signature": "dc47be6432a95c739ebc4a61d1942dd9-export declare const result: import(\"renamed\").Thing;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "c380ebe92cb8d9563d50748aaca5c414-import { make } from '../external/factory';\nexport const result = make();\n",
        "signature": "dc47be6432a95c739ebc4a61d1942dd9-export declare const result: import(\"renamed\").Thing;\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "fileIdsList": [
    [
      "../../../external/thing.ts"
    ],
    [
      "../../../external/factory.ts"
    ]
  ],
  "options": {
    "composite": true,
    "emitDeclarationOnly": true,
    "declaration": true,
    "module": 99,
    "outDir": "..",
    "rootDir": "../../..",
    "strict": true,
    "target": 7
  },
  "referencedMap": {
    "../../../external/factory.ts": [
      "../../../external/thing.ts"
    ],
    "../../index.ts": [
      "../../../external/factory.ts"
    ]
  },
  "latestChangedDtsFile": "./index.d.ts",
  "size": 1923
}

producer/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es2020.d.ts
*refresh*    /home/src/workspaces/project/external/thing.ts
*refresh*    /home/src/workspaces/project/external/factory.ts
*refresh*    /home/src/workspaces/project/producer/index.ts
Signatures::
(stored at emit) /home/src/workspaces/project/external/thing.ts
(stored at emit) /home/src/workspaces/project/external/factory.ts
(stored at emit) /home/src/workspaces/project/producer/index.ts


Edit [4]:: no change

tsgo --project producer --listEmittedFiles
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[96mexternal/factory.ts[0m:[93m1[0m:[93m23[0m - [91merror[0m[90m TS6307: [0mFile '/home/src/workspaces/project/external/thing.ts' is not listed within the file list of project '/home/src/workspaces/project/producer/tsconfig.json'. Projects must list all files or use an 'include' pattern.

[7m1[0m import { Thing } from './thing';
[7m [0m [91m                      ~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m1[0m:[93m22[0m - [91merror[0m[90m TS6307: [0mFile '/home/src/workspaces/project/external/factory.ts' is not listed within the file list of project '/home/src/workspaces/project/producer/tsconfig.json'. Projects must list all files or use an 'include' pattern.

[7m1[0m import { make } from '../external/factory';
[7m [0m [91m                     ~~~~~~~~~~~~~~~~~~~~~[0m


Found 2 errors in 2 files.

Errors  Files
     1  external/factory.ts[90m:1[0m
     1  producer/index.ts[90m:1[0m


producer/tsconfig.json::
SemanticDiagnostics::
Signatures::
