currentDirectory::/home/src/workspaces/project
useCaseSensitiveFileNames::true
Input::
//// [/home/src/workspaces/project/generator.ts] *new* 
export function* values() { yield 1; }
//// [/home/src/workspaces/project/index.ts] *new* 
import { values } from "./generator"; export const get = values;
//// [/home/src/workspaces/project/tsconfig.json] *new* 
{"compilerOptions": {"declaration": true, "incremental": true, "checkers": 1}}

tsgo --watch
ExitStatus:: Success
Output::
[2J[3J[H[[90mHH:MM:SS AM[0m] Starting compilation in watch mode...

[91merror[0m[90m TS2318: [0mCannot find global type 'IterableIterator'.

Found 1 error.

[[90mHH:MM:SS AM[0m] Found 1 error. Watching for file changes.

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
//// [/home/src/workspaces/project/generator.d.ts] *new* 
export declare function values(): {};

//// [/home/src/workspaces/project/generator.js] *new* 
export function* values() { yield 1; }

//// [/home/src/workspaces/project/index.d.ts] *new* 
import { values } from "./generator";
export declare const get: typeof values;

//// [/home/src/workspaces/project/index.js] *new* 
import { values } from "./generator";
export const get = values;

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","errors":true,"root":[[2,3]],"fileNames":["lib.es2026.full.d.ts","./generator.ts","./index.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"51bda3a41e0748f62a85aacc5f248cea-export function* values() { yield 1; }","signature":"b9f7a0d32d9887fdd864bf1c0dcd3591-export declare function values(): {};\n","impliedNodeFormat":1},{"version":"408eddb7fe06b3d0f0b51cc3f764f9c6-import { values } from \"./generator\"; export const get = values;","signature":"da99cb370e431238f572327aec584c8c-import { values } from \"./generator\";\nexport declare const get: typeof values;\n","impliedNodeFormat":1}],"fileIdsList":[[2]],"options":{"declaration":true},"referencedMap":[[3,1]],"semanticDiagnosticsPerFile":[[2,[{"noFile":true,"code":2318,"category":1,"messageKey":"Cannot_find_global_type_0_2318","messageArgs":["IterableIterator"]}]]]}
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "errors": true,
  "root": [
    {
      "files": [
        "./generator.ts",
        "./index.ts"
      ],
      "original": [
        2,
        3
      ]
    }
  ],
  "fileNames": [
    "lib.es2026.full.d.ts",
    "./generator.ts",
    "./index.ts"
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
      "fileName": "./generator.ts",
      "version": "51bda3a41e0748f62a85aacc5f248cea-export function* values() { yield 1; }",
      "signature": "b9f7a0d32d9887fdd864bf1c0dcd3591-export declare function values(): {};\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "51bda3a41e0748f62a85aacc5f248cea-export function* values() { yield 1; }",
        "signature": "b9f7a0d32d9887fdd864bf1c0dcd3591-export declare function values(): {};\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./index.ts",
      "version": "408eddb7fe06b3d0f0b51cc3f764f9c6-import { values } from \"./generator\"; export const get = values;",
      "signature": "da99cb370e431238f572327aec584c8c-import { values } from \"./generator\";\nexport declare const get: typeof values;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "408eddb7fe06b3d0f0b51cc3f764f9c6-import { values } from \"./generator\"; export const get = values;",
        "signature": "da99cb370e431238f572327aec584c8c-import { values } from \"./generator\";\nexport declare const get: typeof values;\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "fileIdsList": [
    [
      "./generator.ts"
    ]
  ],
  "options": {
    "declaration": true
  },
  "referencedMap": {
    "./index.ts": [
      "./generator.ts"
    ]
  },
  "semanticDiagnosticsPerFile": [
    [
      "./generator.ts",
      [
        {
          "noFile": true,
          "code": 2318,
          "category": 1,
          "messageKey": "Cannot_find_global_type_0_2318",
          "messageArgs": [
            "IterableIterator"
          ]
        }
      ]
    ]
  ],
  "size": 1603
}

Watch Registrations::
Directory watches::
  /home/src/tslibs/TS/Lib
  /home/src/workspaces/project (recursive)
tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es2026.full.d.ts
*refresh*    /home/src/workspaces/project/generator.ts
*refresh*    /home/src/workspaces/project/index.ts
Signatures::
(stored at emit) /home/src/workspaces/project/generator.ts
(stored at emit) /home/src/workspaces/project/index.ts


Edit [0]:: edit both modules without changing their types
//// [/home/src/workspaces/project/generator.ts] *modified* 
export function* values() { yield 1; }
// generator comment

//// [/home/src/workspaces/project/index.ts] *modified* 
import { values } from "./generator"; export const get = values;
// consumer comment



Output::
[2J[3J[H[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

[91merror[0m[90m TS2318: [0mCannot find global type 'IterableIterator'.

Found 1 error.

[[90mHH:MM:SS AM[0m] Found 1 error. Watching for file changes.

//// [/home/src/workspaces/project/generator.d.ts] *rewrite with same content*
//// [/home/src/workspaces/project/generator.js] *modified* 
export function* values() { yield 1; }
// generator comment

//// [/home/src/workspaces/project/index.d.ts] *rewrite with same content*
//// [/home/src/workspaces/project/index.js] *modified* 
import { values } from "./generator";
export const get = values;
// consumer comment

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","errors":true,"root":[[2,3]],"fileNames":["lib.es2026.full.d.ts","./generator.ts","./index.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"58e23b3277591ca3c8f38099ef173b64-export function* values() { yield 1; }\n// generator comment\n","signature":"b9f7a0d32d9887fdd864bf1c0dcd3591-export declare function values(): {};\n","impliedNodeFormat":1},{"version":"d48419cdb5e1e89bf06ed8dfe5c86e52-import { values } from \"./generator\"; export const get = values;\n// consumer comment\n","signature":"da99cb370e431238f572327aec584c8c-import { values } from \"./generator\";\nexport declare const get: typeof values;\n","impliedNodeFormat":1}],"fileIdsList":[[2]],"options":{"declaration":true},"referencedMap":[[3,1]],"semanticDiagnosticsPerFile":[[2,[{"noFile":true,"code":2318,"category":1,"messageKey":"Cannot_find_global_type_0_2318","messageArgs":["IterableIterator"]}]]]}
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "errors": true,
  "root": [
    {
      "files": [
        "./generator.ts",
        "./index.ts"
      ],
      "original": [
        2,
        3
      ]
    }
  ],
  "fileNames": [
    "lib.es2026.full.d.ts",
    "./generator.ts",
    "./index.ts"
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
      "fileName": "./generator.ts",
      "version": "58e23b3277591ca3c8f38099ef173b64-export function* values() { yield 1; }\n// generator comment\n",
      "signature": "b9f7a0d32d9887fdd864bf1c0dcd3591-export declare function values(): {};\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "58e23b3277591ca3c8f38099ef173b64-export function* values() { yield 1; }\n// generator comment\n",
        "signature": "b9f7a0d32d9887fdd864bf1c0dcd3591-export declare function values(): {};\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./index.ts",
      "version": "d48419cdb5e1e89bf06ed8dfe5c86e52-import { values } from \"./generator\"; export const get = values;\n// consumer comment\n",
      "signature": "da99cb370e431238f572327aec584c8c-import { values } from \"./generator\";\nexport declare const get: typeof values;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "d48419cdb5e1e89bf06ed8dfe5c86e52-import { values } from \"./generator\"; export const get = values;\n// consumer comment\n",
        "signature": "da99cb370e431238f572327aec584c8c-import { values } from \"./generator\";\nexport declare const get: typeof values;\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "fileIdsList": [
    [
      "./generator.ts"
    ]
  ],
  "options": {
    "declaration": true
  },
  "referencedMap": {
    "./index.ts": [
      "./generator.ts"
    ]
  },
  "semanticDiagnosticsPerFile": [
    [
      "./generator.ts",
      [
        {
          "noFile": true,
          "code": 2318,
          "category": 1,
          "messageKey": "Cannot_find_global_type_0_2318",
          "messageArgs": [
            "IterableIterator"
          ]
        }
      ]
    ]
  ],
  "size": 1650
}

Watch Registrations::
Directory watches::
  /home/src/tslibs/TS/Lib
  /home/src/workspaces/project (recursive)
tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/workspaces/project/generator.ts
*refresh*    /home/src/workspaces/project/index.ts
Signatures::
(computed .d.ts) /home/src/workspaces/project/generator.ts
(computed .d.ts) /home/src/workspaces/project/index.ts


Edit [1]:: remove the generator
//// [/home/src/workspaces/project/generator.ts] *modified* 
export function values() { return 1; }


Output::
[2J[3J[H[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.

//// [/home/src/workspaces/project/generator.d.ts] *modified* 
export declare function values(): number;

//// [/home/src/workspaces/project/generator.js] *modified* 
export function values() { return 1; }

//// [/home/src/workspaces/project/index.d.ts] *rewrite with same content*
//// [/home/src/workspaces/project/index.js] *rewrite with same content*
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[[2,3]],"fileNames":["lib.es2026.full.d.ts","./generator.ts","./index.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"76b50f103fa58d67d807c2c7bb428b36-export function values() { return 1; }","signature":"5b54bfb007e5ca333c7948c422d77602-export declare function values(): number;\n","impliedNodeFormat":1},{"version":"d48419cdb5e1e89bf06ed8dfe5c86e52-import { values } from \"./generator\"; export const get = values;\n// consumer comment\n","signature":"da99cb370e431238f572327aec584c8c-import { values } from \"./generator\";\nexport declare const get: typeof values;\n","impliedNodeFormat":1}],"fileIdsList":[[2]],"options":{"declaration":true},"referencedMap":[[3,1]]}
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./generator.ts",
        "./index.ts"
      ],
      "original": [
        2,
        3
      ]
    }
  ],
  "fileNames": [
    "lib.es2026.full.d.ts",
    "./generator.ts",
    "./index.ts"
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
      "fileName": "./generator.ts",
      "version": "76b50f103fa58d67d807c2c7bb428b36-export function values() { return 1; }",
      "signature": "5b54bfb007e5ca333c7948c422d77602-export declare function values(): number;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "76b50f103fa58d67d807c2c7bb428b36-export function values() { return 1; }",
        "signature": "5b54bfb007e5ca333c7948c422d77602-export declare function values(): number;\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./index.ts",
      "version": "d48419cdb5e1e89bf06ed8dfe5c86e52-import { values } from \"./generator\"; export const get = values;\n// consumer comment\n",
      "signature": "da99cb370e431238f572327aec584c8c-import { values } from \"./generator\";\nexport declare const get: typeof values;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "d48419cdb5e1e89bf06ed8dfe5c86e52-import { values } from \"./generator\"; export const get = values;\n// consumer comment\n",
        "signature": "da99cb370e431238f572327aec584c8c-import { values } from \"./generator\";\nexport declare const get: typeof values;\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "fileIdsList": [
    [
      "./generator.ts"
    ]
  ],
  "options": {
    "declaration": true
  },
  "referencedMap": {
    "./index.ts": [
      "./generator.ts"
    ]
  },
  "size": 1457
}

Watch Registrations::
Directory watches::
  /home/src/tslibs/TS/Lib
  /home/src/workspaces/project (recursive)
tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/workspaces/project/generator.ts
*refresh*    /home/src/workspaces/project/index.ts
Signatures::
(computed .d.ts) /home/src/workspaces/project/generator.ts
(computed .d.ts) /home/src/workspaces/project/index.ts


Edit [2]:: restore the generator
//// [/home/src/workspaces/project/generator.ts] *modified* 
export function* values() { yield 2; }


Output::
[2J[3J[H[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

[91merror[0m[90m TS2318: [0mCannot find global type 'IterableIterator'.

Found 1 error.

[[90mHH:MM:SS AM[0m] Found 1 error. Watching for file changes.

//// [/home/src/workspaces/project/generator.d.ts] *modified* 
export declare function values(): {};

//// [/home/src/workspaces/project/generator.js] *modified* 
export function* values() { yield 2; }

//// [/home/src/workspaces/project/index.d.ts] *rewrite with same content*
//// [/home/src/workspaces/project/index.js] *rewrite with same content*
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","errors":true,"root":[[2,3]],"fileNames":["lib.es2026.full.d.ts","./generator.ts","./index.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"1c667088c742cf10b57aed5bfc5adcb1-export function* values() { yield 2; }","signature":"b9f7a0d32d9887fdd864bf1c0dcd3591-export declare function values(): {};\n","impliedNodeFormat":1},{"version":"d48419cdb5e1e89bf06ed8dfe5c86e52-import { values } from \"./generator\"; export const get = values;\n// consumer comment\n","signature":"da99cb370e431238f572327aec584c8c-import { values } from \"./generator\";\nexport declare const get: typeof values;\n","impliedNodeFormat":1}],"fileIdsList":[[2]],"options":{"declaration":true},"referencedMap":[[3,1]],"semanticDiagnosticsPerFile":[[2,[{"noFile":true,"code":2318,"category":1,"messageKey":"Cannot_find_global_type_0_2318","messageArgs":["IterableIterator"]}]]]}
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "errors": true,
  "root": [
    {
      "files": [
        "./generator.ts",
        "./index.ts"
      ],
      "original": [
        2,
        3
      ]
    }
  ],
  "fileNames": [
    "lib.es2026.full.d.ts",
    "./generator.ts",
    "./index.ts"
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
      "fileName": "./generator.ts",
      "version": "1c667088c742cf10b57aed5bfc5adcb1-export function* values() { yield 2; }",
      "signature": "b9f7a0d32d9887fdd864bf1c0dcd3591-export declare function values(): {};\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "1c667088c742cf10b57aed5bfc5adcb1-export function* values() { yield 2; }",
        "signature": "b9f7a0d32d9887fdd864bf1c0dcd3591-export declare function values(): {};\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./index.ts",
      "version": "d48419cdb5e1e89bf06ed8dfe5c86e52-import { values } from \"./generator\"; export const get = values;\n// consumer comment\n",
      "signature": "da99cb370e431238f572327aec584c8c-import { values } from \"./generator\";\nexport declare const get: typeof values;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "d48419cdb5e1e89bf06ed8dfe5c86e52-import { values } from \"./generator\"; export const get = values;\n// consumer comment\n",
        "signature": "da99cb370e431238f572327aec584c8c-import { values } from \"./generator\";\nexport declare const get: typeof values;\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "fileIdsList": [
    [
      "./generator.ts"
    ]
  ],
  "options": {
    "declaration": true
  },
  "referencedMap": {
    "./index.ts": [
      "./generator.ts"
    ]
  },
  "semanticDiagnosticsPerFile": [
    [
      "./generator.ts",
      [
        {
          "noFile": true,
          "code": 2318,
          "category": 1,
          "messageKey": "Cannot_find_global_type_0_2318",
          "messageArgs": [
            "IterableIterator"
          ]
        }
      ]
    ]
  ],
  "size": 1626
}

Watch Registrations::
Directory watches::
  /home/src/tslibs/TS/Lib
  /home/src/workspaces/project (recursive)
tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/workspaces/project/generator.ts
*refresh*    /home/src/workspaces/project/index.ts
Signatures::
(computed .d.ts) /home/src/workspaces/project/generator.ts
(computed .d.ts) /home/src/workspaces/project/index.ts
