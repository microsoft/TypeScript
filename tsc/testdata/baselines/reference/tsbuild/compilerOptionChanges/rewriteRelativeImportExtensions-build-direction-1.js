currentDirectory::/home/src/workspaces/project
useCaseSensitiveFileNames::true
Input::
//// [/home/src/workspaces/project/producer/index.ts] *new* 
export { result } from './other.ts';

//// [/home/src/workspaces/project/producer/other.ts] *new* 
export const result = 1;

//// [/home/src/workspaces/project/producer/tsconfig.json] *new* 
{
    "compilerOptions": {
        "allowImportingTsExtensions": true,
        "composite": true,
        "declaration": true,
        "emitDeclarationOnly": false,
        "lib": [
            "es2020"
        ],
        "module": "esnext",
        "moduleResolution": "bundler",
        "outDir": "dist",
        "rewriteRelativeImportExtensions": true,
        "rootDir": ".",
        "strict": true,
        "target": "es2020"
    },
    "files": [
        "index.ts",
        "other.ts"
    ]
}

tsgo --build producer --verbose
ExitStatus:: Success
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * producer/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'producer/tsconfig.json' is out of date because output file 'producer/dist/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project 'producer/tsconfig.json'...

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
//// [/home/src/workspaces/project/producer/dist/index.d.ts] *new* 
export { result } from './other.ts';

//// [/home/src/workspaces/project/producer/dist/index.js] *new* 
export { result } from './other.js';

//// [/home/src/workspaces/project/producer/dist/other.d.ts] *new* 
export declare const result = 1;

//// [/home/src/workspaces/project/producer/dist/other.js] *new* 
export const result = 1;

//// [/home/src/workspaces/project/producer/dist/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":[[2,3]],"fileNames":["lib.es2020.d.ts","../other.ts","../index.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"b33cb3c0fc12538ee0608497e30c503f-export const result = 1;\n","signature":"993e425aeb82a5fb982b8b91a1f7366e-export declare const result = 1;\n","impliedNodeFormat":1},"1df26769cf0ee6ac1620f40ac896ea8a-export { result } from './other.ts';\n"],"fileIdsList":[[2]],"options":{"allowImportingTsExtensions":true,"composite":true,"emitDeclarationOnly":false,"declaration":true,"module":99,"outDir":"./","rewriteRelativeImportExtensions":true,"rootDir":"..","strict":true,"target":7},"referencedMap":[[3,1]],"latestChangedDtsFile":"./index.d.ts"}
//// [/home/src/workspaces/project/producer/dist/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "../other.ts",
        "../index.ts"
      ],
      "original": [
        2,
        3
      ]
    }
  ],
  "fileNames": [
    "lib.es2020.d.ts",
    "../other.ts",
    "../index.ts"
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
      "fileName": "../other.ts",
      "version": "b33cb3c0fc12538ee0608497e30c503f-export const result = 1;\n",
      "signature": "993e425aeb82a5fb982b8b91a1f7366e-export declare const result = 1;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "b33cb3c0fc12538ee0608497e30c503f-export const result = 1;\n",
        "signature": "993e425aeb82a5fb982b8b91a1f7366e-export declare const result = 1;\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "../index.ts",
      "version": "1df26769cf0ee6ac1620f40ac896ea8a-export { result } from './other.ts';\n",
      "signature": "1df26769cf0ee6ac1620f40ac896ea8a-export { result } from './other.ts';\n",
      "impliedNodeFormat": "CommonJS"
    }
  ],
  "fileIdsList": [
    [
      "../other.ts"
    ]
  ],
  "options": {
    "allowImportingTsExtensions": true,
    "composite": true,
    "emitDeclarationOnly": false,
    "declaration": true,
    "module": 99,
    "outDir": "./",
    "rewriteRelativeImportExtensions": true,
    "rootDir": "..",
    "strict": true,
    "target": 7
  },
  "referencedMap": {
    "../index.ts": [
      "../other.ts"
    ]
  },
  "latestChangedDtsFile": "./index.d.ts",
  "size": 1435
}

producer/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es2020.d.ts
*refresh*    /home/src/workspaces/project/producer/other.ts
*refresh*    /home/src/workspaces/project/producer/index.ts
Signatures::
(stored at emit) /home/src/workspaces/project/producer/other.ts


Edit [0]:: no change

tsgo --build producer --verbose
ExitStatus:: Success
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * producer/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'producer/tsconfig.json' is up to date because newest input 'producer/other.ts' is older than output 'producer/dist/tsconfig.tsbuildinfo'




Edit [1]:: change rewriteRelativeImportExtensions without changing source files
//// [/home/src/workspaces/project/producer/tsconfig.json] *modified* 
{
    "compilerOptions": {
        "allowImportingTsExtensions": true,
        "composite": true,
        "declaration": true,
        "emitDeclarationOnly": false,
        "lib": [
            "es2020"
        ],
        "module": "esnext",
        "moduleResolution": "bundler",
        "outDir": "dist",
        "rewriteRelativeImportExtensions": false,
        "rootDir": ".",
        "strict": true,
        "target": "es2020"
    },
    "files": [
        "index.ts",
        "other.ts"
    ]
}

tsgo --build producer --verbose
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * producer/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'producer/tsconfig.json' is out of date because output 'producer/dist/tsconfig.tsbuildinfo' is older than input 'producer/tsconfig.json'

[[90mHH:MM:SS AM[0m] Building project 'producer/tsconfig.json'...

[96mproducer/tsconfig.json[0m:[93m3[0m:[93m39[0m - [91merror[0m[90m TS5096: [0mOption 'allowImportingTsExtensions' can only be used when one of 'noEmit', 'emitDeclarationOnly', or 'rewriteRelativeImportExtensions' is set.

[7m3[0m         "allowImportingTsExtensions": true,
[7m [0m [91m                                      ~~~~[0m


Found 1 error in producer/tsconfig.json[90m:3[0m

//// [/home/src/workspaces/project/producer/dist/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","errors":true,"root":[[2,3]],"fileNames":["lib.es2020.d.ts","../other.ts","../index.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"b33cb3c0fc12538ee0608497e30c503f-export const result = 1;\n","signature":"993e425aeb82a5fb982b8b91a1f7366e-export declare const result = 1;\n","impliedNodeFormat":1},"1df26769cf0ee6ac1620f40ac896ea8a-export { result } from './other.ts';\n"],"fileIdsList":[[2]],"options":{"allowImportingTsExtensions":true,"composite":true,"emitDeclarationOnly":false,"declaration":true,"module":99,"outDir":"./","rewriteRelativeImportExtensions":false,"rootDir":"..","strict":true,"target":7},"referencedMap":[[3,1]],"semanticDiagnosticsPerFile":[1,2,3],"latestChangedDtsFile":"./index.d.ts"}
//// [/home/src/workspaces/project/producer/dist/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "errors": true,
  "root": [
    {
      "files": [
        "../other.ts",
        "../index.ts"
      ],
      "original": [
        2,
        3
      ]
    }
  ],
  "fileNames": [
    "lib.es2020.d.ts",
    "../other.ts",
    "../index.ts"
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
      "fileName": "../other.ts",
      "version": "b33cb3c0fc12538ee0608497e30c503f-export const result = 1;\n",
      "signature": "993e425aeb82a5fb982b8b91a1f7366e-export declare const result = 1;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "b33cb3c0fc12538ee0608497e30c503f-export const result = 1;\n",
        "signature": "993e425aeb82a5fb982b8b91a1f7366e-export declare const result = 1;\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "../index.ts",
      "version": "1df26769cf0ee6ac1620f40ac896ea8a-export { result } from './other.ts';\n",
      "signature": "1df26769cf0ee6ac1620f40ac896ea8a-export { result } from './other.ts';\n",
      "impliedNodeFormat": "CommonJS"
    }
  ],
  "fileIdsList": [
    [
      "../other.ts"
    ]
  ],
  "options": {
    "allowImportingTsExtensions": true,
    "composite": true,
    "emitDeclarationOnly": false,
    "declaration": true,
    "module": 99,
    "outDir": "./",
    "rewriteRelativeImportExtensions": false,
    "rootDir": "..",
    "strict": true,
    "target": 7
  },
  "referencedMap": {
    "../index.ts": [
      "../other.ts"
    ]
  },
  "semanticDiagnosticsPerFile": [
    "lib.es2020.d.ts",
    "../other.ts",
    "../index.ts"
  ],
  "latestChangedDtsFile": "./index.d.ts",
  "size": 1487
}

producer/tsconfig.json::
SemanticDiagnostics::
*not cached* /home/src/tslibs/TS/Lib/lib.es2020.d.ts
*not cached* /home/src/workspaces/project/producer/other.ts
*not cached* /home/src/workspaces/project/producer/index.ts
Signatures::


Diff:: Changing rewriteRelativeImportExtensions without editing source files leaves stale output or diagnostics.
--- nonIncremental /home/src/workspaces/project/producer/dist/index.js
+++ incremental /home/src/workspaces/project/producer/dist/index.js
@@ -1,1 +1,1 @@
-export { result } from './other.ts';
+export { result } from './other.js';


Edit [2]:: no change

tsgo --build producer --verbose
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * producer/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'producer/tsconfig.json' is out of date because buildinfo file 'producer/dist/tsconfig.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project 'producer/tsconfig.json'...

[96mproducer/tsconfig.json[0m:[93m3[0m:[93m39[0m - [91merror[0m[90m TS5096: [0mOption 'allowImportingTsExtensions' can only be used when one of 'noEmit', 'emitDeclarationOnly', or 'rewriteRelativeImportExtensions' is set.

[7m3[0m         "allowImportingTsExtensions": true,
[7m [0m [91m                                      ~~~~[0m


Found 1 error in producer/tsconfig.json[90m:3[0m


producer/tsconfig.json::
SemanticDiagnostics::
*not cached* /home/src/tslibs/TS/Lib/lib.es2020.d.ts
*not cached* /home/src/workspaces/project/producer/other.ts
*not cached* /home/src/workspaces/project/producer/index.ts
Signatures::


Diff:: Changing rewriteRelativeImportExtensions without editing source files leaves stale output or diagnostics.
--- nonIncremental /home/src/workspaces/project/producer/dist/index.js
+++ incremental /home/src/workspaces/project/producer/dist/index.js
@@ -1,1 +1,1 @@
-export { result } from './other.ts';
+export { result } from './other.js';


Edit [3]:: force rebuild with the same compiler options

tsgo --build producer --verbose --force
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * producer/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'producer/tsconfig.json' is being forcibly rebuilt

[[90mHH:MM:SS AM[0m] Building project 'producer/tsconfig.json'...

[96mproducer/tsconfig.json[0m:[93m3[0m:[93m39[0m - [91merror[0m[90m TS5096: [0mOption 'allowImportingTsExtensions' can only be used when one of 'noEmit', 'emitDeclarationOnly', or 'rewriteRelativeImportExtensions' is set.

[7m3[0m         "allowImportingTsExtensions": true,
[7m [0m [91m                                      ~~~~[0m


Found 1 error in producer/tsconfig.json[90m:3[0m

//// [/home/src/workspaces/project/producer/dist/index.d.ts] *rewrite with same content*
//// [/home/src/workspaces/project/producer/dist/index.js] *modified* 
export { result } from './other.ts';

//// [/home/src/workspaces/project/producer/dist/other.d.ts] *rewrite with same content*
//// [/home/src/workspaces/project/producer/dist/other.js] *rewrite with same content*
//// [/home/src/workspaces/project/producer/dist/tsconfig.tsbuildinfo] *rewrite with same content*
//// [/home/src/workspaces/project/producer/dist/tsconfig.tsbuildinfo.readable.baseline.txt] *rewrite with same content*

producer/tsconfig.json::
SemanticDiagnostics::
*not cached* /home/src/tslibs/TS/Lib/lib.es2020.d.ts
*not cached* /home/src/workspaces/project/producer/other.ts
*not cached* /home/src/workspaces/project/producer/index.ts
Signatures::
(stored at emit) /home/src/workspaces/project/producer/other.ts


Edit [4]:: no change

tsgo --build producer --verbose
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * producer/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'producer/tsconfig.json' is out of date because buildinfo file 'producer/dist/tsconfig.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project 'producer/tsconfig.json'...

[96mproducer/tsconfig.json[0m:[93m3[0m:[93m39[0m - [91merror[0m[90m TS5096: [0mOption 'allowImportingTsExtensions' can only be used when one of 'noEmit', 'emitDeclarationOnly', or 'rewriteRelativeImportExtensions' is set.

[7m3[0m         "allowImportingTsExtensions": true,
[7m [0m [91m                                      ~~~~[0m


Found 1 error in producer/tsconfig.json[90m:3[0m


producer/tsconfig.json::
SemanticDiagnostics::
*not cached* /home/src/tslibs/TS/Lib/lib.es2020.d.ts
*not cached* /home/src/workspaces/project/producer/other.ts
*not cached* /home/src/workspaces/project/producer/index.ts
Signatures::
