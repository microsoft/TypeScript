currentDirectory::/user/username/projects/transitiveReferences
useCaseSensitiveFileNames::true
Input::
//// [/user/username/projects/transitiveReferences/a.ts] *new* 
export class A {}
//// [/user/username/projects/transitiveReferences/b.ts] *new* 
import {A} from '@ref/a';
export const b = new A();
//// [/user/username/projects/transitiveReferences/c.ts] *new* 
import {b} from './b';
import {X} from "@ref/a";
b;
X;
//// [/user/username/projects/transitiveReferences/refs/a.d.ts] *new* 
export class X {}
export class A {}
//// [/user/username/projects/transitiveReferences/tsconfig.a.json] *new* 
{
    "files": ["a.ts"],
    "compilerOptions": {
        "composite": true,
    },
}
//// [/user/username/projects/transitiveReferences/tsconfig.b.json] *new* 
{
    "files": ["b.ts"],
    "compilerOptions": {
        "composite": true,
        "paths": {
            "@ref/*": ["./*"],
        },
    },
    "references": [{ "path": "tsconfig.a.json" }],
}
//// [/user/username/projects/transitiveReferences/tsconfig.c.json] *new* 
{
    "files": ["c.ts"],
    "compilerOptions": {
        "paths": {
            "@ref/*": ["./refs/*"],
        },
    },
    "references": [{ "path": "tsconfig.b.json" }],
}

tsgo --b tsconfig.c.json --listFiles
ExitStatus:: Success
Output::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/transitiveReferences/a.ts
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/transitiveReferences/a.d.ts
/user/username/projects/transitiveReferences/b.ts
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/transitiveReferences/a.d.ts
/user/username/projects/transitiveReferences/b.d.ts
/user/username/projects/transitiveReferences/refs/a.d.ts
/user/username/projects/transitiveReferences/c.ts
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
//// [/user/username/projects/transitiveReferences/a.d.ts] *new* 
export declare class A {
}

//// [/user/username/projects/transitiveReferences/a.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.A = void 0;
class A {
}
exports.A = A;

//// [/user/username/projects/transitiveReferences/b.d.ts] *new* 
import { A } from '@ref/a';
export declare const b: A;

//// [/user/username/projects/transitiveReferences/b.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.b = void 0;
const a_1 = require("@ref/a");
exports.b = new a_1.A();

//// [/user/username/projects/transitiveReferences/c.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const b_1 = require("./b");
const a_1 = require("@ref/a");
b_1.b;
a_1.X;

//// [/user/username/projects/transitiveReferences/tsconfig.a.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":[2],"fileNames":["lib.d.ts","./a.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"0a3004c9585165dfcdd47d90e20f798d-export class A {}","signature":"0ccee316fe0e81d05228833d759a8fea-export declare class A {\n}\n","impliedNodeFormat":1}],"options":{"composite":true},"latestChangedDtsFile":"./a.d.ts"}
//// [/user/username/projects/transitiveReferences/tsconfig.a.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./a.ts"
      ],
      "original": 2
    }
  ],
  "fileNames": [
    "lib.d.ts",
    "./a.ts"
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
      "fileName": "./a.ts",
      "version": "0a3004c9585165dfcdd47d90e20f798d-export class A {}",
      "signature": "0ccee316fe0e81d05228833d759a8fea-export declare class A {\n}\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "0a3004c9585165dfcdd47d90e20f798d-export class A {}",
        "signature": "0ccee316fe0e81d05228833d759a8fea-export declare class A {\n}\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "options": {
    "composite": true
  },
  "latestChangedDtsFile": "./a.d.ts",
  "size": 1083
}
//// [/user/username/projects/transitiveReferences/tsconfig.b.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":[3],"fileNames":["lib.d.ts","./a.d.ts","./b.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},"0ccee316fe0e81d05228833d759a8fea-export declare class A {\n}\n",{"version":"22b83bc3eaf6d7b067d7a6659b0b318f-import {A} from '@ref/a';\nexport const b = new A();","signature":"92d534c2dbda627a55a8cdaeb4843b7a-import { A } from '@ref/a';\nexport declare const b: A;\n","impliedNodeFormat":1}],"fileIdsList":[[2]],"options":{"composite":true},"referencedMap":[[3,1]],"latestChangedDtsFile":"./b.d.ts"}
//// [/user/username/projects/transitiveReferences/tsconfig.b.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./b.ts"
      ],
      "original": 3
    }
  ],
  "fileNames": [
    "lib.d.ts",
    "./a.d.ts",
    "./b.ts"
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
      "fileName": "./a.d.ts",
      "version": "0ccee316fe0e81d05228833d759a8fea-export declare class A {\n}\n",
      "signature": "0ccee316fe0e81d05228833d759a8fea-export declare class A {\n}\n",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "./b.ts",
      "version": "22b83bc3eaf6d7b067d7a6659b0b318f-import {A} from '@ref/a';\nexport const b = new A();",
      "signature": "92d534c2dbda627a55a8cdaeb4843b7a-import { A } from '@ref/a';\nexport declare const b: A;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "22b83bc3eaf6d7b067d7a6659b0b318f-import {A} from '@ref/a';\nexport const b = new A();",
        "signature": "92d534c2dbda627a55a8cdaeb4843b7a-import { A } from '@ref/a';\nexport declare const b: A;\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "fileIdsList": [
    [
      "./a.d.ts"
    ]
  ],
  "options": {
    "composite": true
  },
  "referencedMap": {
    "./b.ts": [
      "./a.d.ts"
    ]
  },
  "latestChangedDtsFile": "./b.d.ts",
  "size": 1266
}
//// [/user/username/projects/transitiveReferences/tsconfig.c.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":["./c.ts"]}
//// [/user/username/projects/transitiveReferences/tsconfig.c.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./c.ts"
      ],
      "original": "./c.ts"
    }
  ],
  "size": 45
}

tsconfig.a.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.d.ts
*refresh*    /user/username/projects/transitiveReferences/a.ts
Signatures::
(stored at emit) /user/username/projects/transitiveReferences/a.ts

tsconfig.b.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.d.ts
*refresh*    /user/username/projects/transitiveReferences/a.d.ts
*refresh*    /user/username/projects/transitiveReferences/b.ts
Signatures::
(stored at emit) /user/username/projects/transitiveReferences/b.ts

tsconfig.c.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.d.ts
*refresh*    /user/username/projects/transitiveReferences/a.d.ts
*refresh*    /user/username/projects/transitiveReferences/b.d.ts
*refresh*    /user/username/projects/transitiveReferences/refs/a.d.ts
*refresh*    /user/username/projects/transitiveReferences/c.ts
Signatures::
