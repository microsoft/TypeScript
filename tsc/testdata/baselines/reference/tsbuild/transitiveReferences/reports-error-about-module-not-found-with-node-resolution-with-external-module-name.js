currentDirectory::/user/username/projects/transitiveReferences
useCaseSensitiveFileNames::true
Input::
//// [/user/username/projects/transitiveReferences/a.ts] *new* 
export class A {}
//// [/user/username/projects/transitiveReferences/b.ts] *new* 
import {A} from 'a';
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
        "module": "nodenext",
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
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/transitiveReferences/a.ts
[96mb.ts[0m:[93m1[0m:[93m17[0m - [91merror[0m[90m TS2307: [0mCannot find module 'a' or its corresponding type declarations.

[7m1[0m import {A} from 'a';
[7m [0m [91m                ~~~[0m

/home/src/tslibs/TS/Lib/lib.esnext.full.d.ts
/user/username/projects/transitiveReferences/b.ts
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/transitiveReferences/b.d.ts
/user/username/projects/transitiveReferences/refs/a.d.ts
/user/username/projects/transitiveReferences/c.ts

Found 1 error in b.ts[90m:1[0m

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
//// [/home/src/tslibs/TS/Lib/lib.esnext.full.d.ts] *Lib*
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
export declare const b: any;

//// [/user/username/projects/transitiveReferences/b.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.b = void 0;
const a_1 = require("a");
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
{"version":"FakeTSVersion","root":[2],"fileNames":["lib.esnext.full.d.ts","./b.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"d0c1e70086e2297c6733a209dc8aebd5-import {A} from 'a';\nexport const b = new A();","signature":"5c4caa93805477a2ce78ec8e61b569d7-export declare const b: any;\n","impliedNodeFormat":1}],"options":{"composite":true,"module":199},"semanticDiagnosticsPerFile":[[2,[{"pos":16,"end":19,"code":2307,"category":1,"message":"Cannot find module 'a' or its corresponding type declarations."}]]],"latestChangedDtsFile":"./b.d.ts"}
//// [/user/username/projects/transitiveReferences/tsconfig.b.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./b.ts"
      ],
      "original": 2
    }
  ],
  "fileNames": [
    "lib.esnext.full.d.ts",
    "./b.ts"
  ],
  "fileInfos": [
    {
      "fileName": "lib.esnext.full.d.ts",
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
      "fileName": "./b.ts",
      "version": "d0c1e70086e2297c6733a209dc8aebd5-import {A} from 'a';\nexport const b = new A();",
      "signature": "5c4caa93805477a2ce78ec8e61b569d7-export declare const b: any;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "d0c1e70086e2297c6733a209dc8aebd5-import {A} from 'a';\nexport const b = new A();",
        "signature": "5c4caa93805477a2ce78ec8e61b569d7-export declare const b: any;\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "options": {
    "composite": true,
    "module": 199
  },
  "semanticDiagnosticsPerFile": [
    [
      "./b.ts",
      [
        {
          "pos": 16,
          "end": 19,
          "code": 2307,
          "category": 1,
          "message": "Cannot find module 'a' or its corresponding type declarations."
        }
      ]
    ]
  ],
  "latestChangedDtsFile": "./b.d.ts",
  "size": 1296
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
*refresh*    /home/src/tslibs/TS/Lib/lib.esnext.full.d.ts
*refresh*    /user/username/projects/transitiveReferences/b.ts
Signatures::
(stored at emit) /user/username/projects/transitiveReferences/b.ts

tsconfig.c.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.d.ts
*refresh*    /user/username/projects/transitiveReferences/b.d.ts
*refresh*    /user/username/projects/transitiveReferences/refs/a.d.ts
*refresh*    /user/username/projects/transitiveReferences/c.ts
Signatures::
