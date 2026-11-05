currentDirectory::/home/src/workspaces/project
useCaseSensitiveFileNames::true
Input::
//// [/home/src/workspaces/project/a.ts] *new* 
export class Result {
    /** @internal */
    value = "";
}

//// [/home/src/workspaces/project/b.ts] *new* 
import { Result } from './a';
export const forwarded = new Result().value;

//// [/home/src/workspaces/project/tsconfig.json] *new* 
{
					"compilerOptions": {
						"composite": true, "declaration": true, "emitDeclarationOnly": true,
						"strict": true, "stripInternal": true,
						"outDir": "dist"
					},
					"files": ["a.ts", "b.ts"]
				}

tsgo --project . --listEmittedFiles
ExitStatus:: Success
Output::
TSFILE: /home/src/workspaces/project/dist/a.d.ts
TSFILE: /home/src/workspaces/project/dist/b.d.ts
TSFILE: /home/src/workspaces/project/dist/tsconfig.tsbuildinfo
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
//// [/home/src/workspaces/project/dist/a.d.ts] *new* 
export declare class Result {
}

//// [/home/src/workspaces/project/dist/b.d.ts] *new* 
export declare const forwarded: string;

//// [/home/src/workspaces/project/dist/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":[[2,3]],"fileNames":["lib.es2026.full.d.ts","../a.ts","../b.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"6afaf1032039cbb1d697c5a0d9d5ef8e-export class Result {\n    /** @internal */\n    value = \"\";\n}\n","signature":"7eaaf76209ae3bb09b01c12a46574b5b-export declare class Result {\n}\n","impliedNodeFormat":1},{"version":"35c8c17113c91a4b31a43459ee90365b-import { Result } from './a';\nexport const forwarded = new Result().value;\n","signature":"3ed67fd4ad48a5fd29c57ca49adac5f4-export declare const forwarded: string;\n","impliedNodeFormat":1}],"fileIdsList":[[2]],"options":{"composite":true,"emitDeclarationOnly":true,"declaration":true,"outDir":"./","strict":true,"stripInternal":true},"referencedMap":[[3,1]],"latestChangedDtsFile":"./b.d.ts"}
//// [/home/src/workspaces/project/dist/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "../a.ts",
        "../b.ts"
      ],
      "original": [
        2,
        3
      ]
    }
  ],
  "fileNames": [
    "lib.es2026.full.d.ts",
    "../a.ts",
    "../b.ts"
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
      "fileName": "../a.ts",
      "version": "6afaf1032039cbb1d697c5a0d9d5ef8e-export class Result {\n    /** @internal */\n    value = \"\";\n}\n",
      "signature": "7eaaf76209ae3bb09b01c12a46574b5b-export declare class Result {\n}\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "6afaf1032039cbb1d697c5a0d9d5ef8e-export class Result {\n    /** @internal */\n    value = \"\";\n}\n",
        "signature": "7eaaf76209ae3bb09b01c12a46574b5b-export declare class Result {\n}\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "../b.ts",
      "version": "35c8c17113c91a4b31a43459ee90365b-import { Result } from './a';\nexport const forwarded = new Result().value;\n",
      "signature": "3ed67fd4ad48a5fd29c57ca49adac5f4-export declare const forwarded: string;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "35c8c17113c91a4b31a43459ee90365b-import { Result } from './a';\nexport const forwarded = new Result().value;\n",
        "signature": "3ed67fd4ad48a5fd29c57ca49adac5f4-export declare const forwarded: string;\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "fileIdsList": [
    [
      "../a.ts"
    ]
  ],
  "options": {
    "composite": true,
    "emitDeclarationOnly": true,
    "declaration": true,
    "outDir": "./",
    "strict": true,
    "stripInternal": true
  },
  "referencedMap": {
    "../b.ts": [
      "../a.ts"
    ]
  },
  "latestChangedDtsFile": "./b.d.ts",
  "size": 1540
}

tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es2026.full.d.ts
*refresh*    /home/src/workspaces/project/a.ts
*refresh*    /home/src/workspaces/project/b.ts
Signatures::
(stored at emit) /home/src/workspaces/project/a.ts
(stored at emit) /home/src/workspaces/project/b.ts


Edit [0]:: disable stripInternal without changing source files
//// [/home/src/workspaces/project/tsconfig.json] *modified* 
{
					"compilerOptions": {
						"composite": true, "declaration": true, "emitDeclarationOnly": true,
						"strict": true, "stripInternal": false,
						"outDir": "dist"
					},
					"files": ["a.ts", "b.ts"]
				}

tsgo --project . --listEmittedFiles
ExitStatus:: Success
Output::
TSFILE: /home/src/workspaces/project/dist/a.d.ts
TSFILE: /home/src/workspaces/project/dist/tsconfig.tsbuildinfo
//// [/home/src/workspaces/project/dist/a.d.ts] *modified* 
export declare class Result {
    /** @internal */
    value: string;
}

//// [/home/src/workspaces/project/dist/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[[2,3]],"fileNames":["lib.es2026.full.d.ts","../a.ts","../b.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"6afaf1032039cbb1d697c5a0d9d5ef8e-export class Result {\n    /** @internal */\n    value = \"\";\n}\n","signature":"5b620b9a2eeda942af7e65d54347d0b1-export declare class Result {\n    /** @internal */\n    value: string;\n}\n","impliedNodeFormat":1},{"version":"35c8c17113c91a4b31a43459ee90365b-import { Result } from './a';\nexport const forwarded = new Result().value;\n","signature":"3ed67fd4ad48a5fd29c57ca49adac5f4-export declare const forwarded: string;\n","impliedNodeFormat":1}],"fileIdsList":[[2]],"options":{"composite":true,"emitDeclarationOnly":true,"declaration":true,"outDir":"./","strict":true,"stripInternal":false},"referencedMap":[[3,1]],"latestChangedDtsFile":"./a.d.ts"}
//// [/home/src/workspaces/project/dist/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "../a.ts",
        "../b.ts"
      ],
      "original": [
        2,
        3
      ]
    }
  ],
  "fileNames": [
    "lib.es2026.full.d.ts",
    "../a.ts",
    "../b.ts"
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
      "fileName": "../a.ts",
      "version": "6afaf1032039cbb1d697c5a0d9d5ef8e-export class Result {\n    /** @internal */\n    value = \"\";\n}\n",
      "signature": "5b620b9a2eeda942af7e65d54347d0b1-export declare class Result {\n    /** @internal */\n    value: string;\n}\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "6afaf1032039cbb1d697c5a0d9d5ef8e-export class Result {\n    /** @internal */\n    value = \"\";\n}\n",
        "signature": "5b620b9a2eeda942af7e65d54347d0b1-export declare class Result {\n    /** @internal */\n    value: string;\n}\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "../b.ts",
      "version": "35c8c17113c91a4b31a43459ee90365b-import { Result } from './a';\nexport const forwarded = new Result().value;\n",
      "signature": "3ed67fd4ad48a5fd29c57ca49adac5f4-export declare const forwarded: string;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "35c8c17113c91a4b31a43459ee90365b-import { Result } from './a';\nexport const forwarded = new Result().value;\n",
        "signature": "3ed67fd4ad48a5fd29c57ca49adac5f4-export declare const forwarded: string;\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "fileIdsList": [
    [
      "../a.ts"
    ]
  ],
  "options": {
    "composite": true,
    "emitDeclarationOnly": true,
    "declaration": true,
    "outDir": "./",
    "strict": true,
    "stripInternal": false
  },
  "referencedMap": {
    "../b.ts": [
      "../a.ts"
    ]
  },
  "latestChangedDtsFile": "./a.d.ts",
  "size": 1583
}

tsconfig.json::
SemanticDiagnostics::
Signatures::
(stored at emit) /home/src/workspaces/project/a.ts


Edit [1]:: no change

tsgo --project . --listEmittedFiles
ExitStatus:: Success
Output::

tsconfig.json::
SemanticDiagnostics::
Signatures::


Edit [2]:: restore the original declaration shape with a source edit
//// [/home/src/workspaces/project/a.ts] *modified* 
export class Result {
}


tsgo --project . --listEmittedFiles
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[96mb.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2339: [0mProperty 'value' does not exist on type 'Result'.

[7m2[0m export const forwarded = new Result().value;
[7m [0m [91m                                      ~~~~~[0m

TSFILE: /home/src/workspaces/project/dist/a.d.ts
TSFILE: /home/src/workspaces/project/dist/b.d.ts
TSFILE: /home/src/workspaces/project/dist/tsconfig.tsbuildinfo

Found 1 error in b.ts[90m:2[0m

//// [/home/src/workspaces/project/dist/a.d.ts] *modified* 
export declare class Result {
}

//// [/home/src/workspaces/project/dist/b.d.ts] *modified* 
export declare const forwarded: any;

//// [/home/src/workspaces/project/dist/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[[2,3]],"fileNames":["lib.es2026.full.d.ts","../a.ts","../b.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"5c3a12ee16d0d3c078ce1908a8a47a69-export class Result {\n}\n","signature":"7eaaf76209ae3bb09b01c12a46574b5b-export declare class Result {\n}\n","impliedNodeFormat":1},{"version":"35c8c17113c91a4b31a43459ee90365b-import { Result } from './a';\nexport const forwarded = new Result().value;\n","signature":"caea12f66905151156caacf79adc3b29-export declare const forwarded: any;\n","impliedNodeFormat":1}],"fileIdsList":[[2]],"options":{"composite":true,"emitDeclarationOnly":true,"declaration":true,"outDir":"./","strict":true,"stripInternal":false},"referencedMap":[[3,1]],"semanticDiagnosticsPerFile":[[3,[{"pos":68,"end":73,"code":2339,"category":1,"messageKey":"Property_0_does_not_exist_on_type_1_2339","messageArgs":["value","Result"]}]]],"latestChangedDtsFile":"./b.d.ts"}
//// [/home/src/workspaces/project/dist/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "../a.ts",
        "../b.ts"
      ],
      "original": [
        2,
        3
      ]
    }
  ],
  "fileNames": [
    "lib.es2026.full.d.ts",
    "../a.ts",
    "../b.ts"
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
      "fileName": "../a.ts",
      "version": "5c3a12ee16d0d3c078ce1908a8a47a69-export class Result {\n}\n",
      "signature": "7eaaf76209ae3bb09b01c12a46574b5b-export declare class Result {\n}\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "5c3a12ee16d0d3c078ce1908a8a47a69-export class Result {\n}\n",
        "signature": "7eaaf76209ae3bb09b01c12a46574b5b-export declare class Result {\n}\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "../b.ts",
      "version": "35c8c17113c91a4b31a43459ee90365b-import { Result } from './a';\nexport const forwarded = new Result().value;\n",
      "signature": "caea12f66905151156caacf79adc3b29-export declare const forwarded: any;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "35c8c17113c91a4b31a43459ee90365b-import { Result } from './a';\nexport const forwarded = new Result().value;\n",
        "signature": "caea12f66905151156caacf79adc3b29-export declare const forwarded: any;\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "fileIdsList": [
    [
      "../a.ts"
    ]
  ],
  "options": {
    "composite": true,
    "emitDeclarationOnly": true,
    "declaration": true,
    "outDir": "./",
    "strict": true,
    "stripInternal": false
  },
  "referencedMap": {
    "../b.ts": [
      "../a.ts"
    ]
  },
  "semanticDiagnosticsPerFile": [
    [
      "../b.ts",
      [
        {
          "pos": 68,
          "end": 73,
          "code": 2339,
          "category": 1,
          "messageKey": "Property_0_does_not_exist_on_type_1_2339",
          "messageArgs": [
            "value",
            "Result"
          ]
        }
      ]
    ]
  ],
  "latestChangedDtsFile": "./b.d.ts",
  "size": 1668
}

tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/workspaces/project/a.ts
*refresh*    /home/src/workspaces/project/b.ts
Signatures::
(computed .d.ts) /home/src/workspaces/project/a.ts
(computed .d.ts) /home/src/workspaces/project/b.ts


Edit [3]:: no change

tsgo --project . --listEmittedFiles
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[96mb.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2339: [0mProperty 'value' does not exist on type 'Result'.

[7m2[0m export const forwarded = new Result().value;
[7m [0m [91m                                      ~~~~~[0m


Found 1 error in b.ts[90m:2[0m


tsconfig.json::
SemanticDiagnostics::
Signatures::


Edit [4]:: force rebuild

tsgo --build --verbose --force
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is being forcibly rebuilt

[[90mHH:MM:SS AM[0m] Building project 'tsconfig.json'...

[96mb.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2339: [0mProperty 'value' does not exist on type 'Result'.

[7m2[0m export const forwarded = new Result().value;
[7m [0m [91m                                      ~~~~~[0m


Found 1 error in b.ts[90m:2[0m

//// [/home/src/workspaces/project/dist/a.d.ts] *rewrite with same content*
//// [/home/src/workspaces/project/dist/b.d.ts] *rewrite with same content*
//// [/home/src/workspaces/project/dist/tsconfig.tsbuildinfo] *rewrite with same content*
//// [/home/src/workspaces/project/dist/tsconfig.tsbuildinfo.readable.baseline.txt] *rewrite with same content*

tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es2026.full.d.ts
*refresh*    /home/src/workspaces/project/a.ts
*refresh*    /home/src/workspaces/project/b.ts
Signatures::
(stored at emit) /home/src/workspaces/project/a.ts
(stored at emit) /home/src/workspaces/project/b.ts


Edit [5]:: no change

tsgo --project . --listEmittedFiles
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[96mb.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2339: [0mProperty 'value' does not exist on type 'Result'.

[7m2[0m export const forwarded = new Result().value;
[7m [0m [91m                                      ~~~~~[0m


Found 1 error in b.ts[90m:2[0m


tsconfig.json::
SemanticDiagnostics::
Signatures::
