currentDirectory::/user/username/projects/noEmitOnError
useCaseSensitiveFileNames::true
Input::
//// [/user/username/projects/noEmitOnError/shared/types/db.ts] *new* 
export interface A {
    name: string;
}
//// [/user/username/projects/noEmitOnError/src/main.ts] *new* 
import { A } from "../shared/types/db";
export const a = class { private p = 10; };
//// [/user/username/projects/noEmitOnError/src/other.ts] *new* 
console.log("hi");
export { }
//// [/user/username/projects/noEmitOnError/tsconfig.json] *new* 
{
    "compilerOptions": {
        "outDir": "./dev-build",
        "declaration": false,
        "incremental": true,
        "noEmitOnError": true,
    },
}

tsgo 
ExitStatus:: Success
Output::
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
//// [/user/username/projects/noEmitOnError/dev-build/shared/types/db.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

//// [/user/username/projects/noEmitOnError/dev-build/src/main.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.a = void 0;
const a = class {
    p = 10;
};
exports.a = a;

//// [/user/username/projects/noEmitOnError/dev-build/src/other.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
console.log("hi");

//// [/user/username/projects/noEmitOnError/dev-build/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":[[2,4]],"fileNames":["lib.d.ts","../shared/types/db.ts","../src/main.ts","../src/other.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},"4dba75627964632af83642176cf4b611-export interface A {\n    name: string;\n}","6cc24027429965f7fa7493c1b9efd532-import { A } from \"../shared/types/db\";\nexport const a = class { private p = 10; };","ac4084c9455da7165ada8cb39f592843-console.log(\"hi\");\nexport { }"],"fileIdsList":[[2]],"options":{"declaration":false,"noEmitOnError":true,"outDir":"./"},"referencedMap":[[3,1]]}
//// [/user/username/projects/noEmitOnError/dev-build/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "../shared/types/db.ts",
        "../src/main.ts",
        "../src/other.ts"
      ],
      "original": [
        2,
        4
      ]
    }
  ],
  "fileNames": [
    "lib.d.ts",
    "../shared/types/db.ts",
    "../src/main.ts",
    "../src/other.ts"
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
      "fileName": "../shared/types/db.ts",
      "version": "4dba75627964632af83642176cf4b611-export interface A {\n    name: string;\n}",
      "signature": "4dba75627964632af83642176cf4b611-export interface A {\n    name: string;\n}",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "../src/main.ts",
      "version": "6cc24027429965f7fa7493c1b9efd532-import { A } from \"../shared/types/db\";\nexport const a = class { private p = 10; };",
      "signature": "6cc24027429965f7fa7493c1b9efd532-import { A } from \"../shared/types/db\";\nexport const a = class { private p = 10; };",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "../src/other.ts",
      "version": "ac4084c9455da7165ada8cb39f592843-console.log(\"hi\");\nexport { }",
      "signature": "ac4084c9455da7165ada8cb39f592843-console.log(\"hi\");\nexport { }",
      "impliedNodeFormat": "CommonJS"
    }
  ],
  "fileIdsList": [
    [
      "../shared/types/db.ts"
    ]
  ],
  "options": {
    "declaration": false,
    "noEmitOnError": true,
    "outDir": "./"
  },
  "referencedMap": {
    "../src/main.ts": [
      "../shared/types/db.ts"
    ]
  },
  "size": 1289
}

tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.d.ts
*refresh*    /user/username/projects/noEmitOnError/shared/types/db.ts
*refresh*    /user/username/projects/noEmitOnError/src/main.ts
*refresh*    /user/username/projects/noEmitOnError/src/other.ts
Signatures::


Edit [0]:: no change

tsgo 
ExitStatus:: Success
Output::

tsconfig.json::
SemanticDiagnostics::
Signatures::


Edit [1]:: Fix error
//// [/user/username/projects/noEmitOnError/src/main.ts] *modified* 
import { A } from "../shared/types/db";
export const a = class { p = 10; };

tsgo 
ExitStatus:: Success
Output::
//// [/user/username/projects/noEmitOnError/dev-build/src/main.js] *rewrite with same content*
//// [/user/username/projects/noEmitOnError/dev-build/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[[2,4]],"fileNames":["lib.d.ts","../shared/types/db.ts","../src/main.ts","../src/other.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},"4dba75627964632af83642176cf4b611-export interface A {\n    name: string;\n}",{"version":"7cd05f722edaaaf0c0efca32b04362e8-import { A } from \"../shared/types/db\";\nexport const a = class { p = 10; };","signature":"1aa32af20adf1f5d970642bd31541eeb-export declare const a: {\n    new (): {\n        p: number;\n    };\n};\n","impliedNodeFormat":1},"ac4084c9455da7165ada8cb39f592843-console.log(\"hi\");\nexport { }"],"fileIdsList":[[2]],"options":{"declaration":false,"noEmitOnError":true,"outDir":"./"},"referencedMap":[[3,1]]}
//// [/user/username/projects/noEmitOnError/dev-build/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "../shared/types/db.ts",
        "../src/main.ts",
        "../src/other.ts"
      ],
      "original": [
        2,
        4
      ]
    }
  ],
  "fileNames": [
    "lib.d.ts",
    "../shared/types/db.ts",
    "../src/main.ts",
    "../src/other.ts"
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
      "fileName": "../shared/types/db.ts",
      "version": "4dba75627964632af83642176cf4b611-export interface A {\n    name: string;\n}",
      "signature": "4dba75627964632af83642176cf4b611-export interface A {\n    name: string;\n}",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "../src/main.ts",
      "version": "7cd05f722edaaaf0c0efca32b04362e8-import { A } from \"../shared/types/db\";\nexport const a = class { p = 10; };",
      "signature": "1aa32af20adf1f5d970642bd31541eeb-export declare const a: {\n    new (): {\n        p: number;\n    };\n};\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "7cd05f722edaaaf0c0efca32b04362e8-import { A } from \"../shared/types/db\";\nexport const a = class { p = 10; };",
        "signature": "1aa32af20adf1f5d970642bd31541eeb-export declare const a: {\n    new (): {\n        p: number;\n    };\n};\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "../src/other.ts",
      "version": "ac4084c9455da7165ada8cb39f592843-console.log(\"hi\");\nexport { }",
      "signature": "ac4084c9455da7165ada8cb39f592843-console.log(\"hi\");\nexport { }",
      "impliedNodeFormat": "CommonJS"
    }
  ],
  "fileIdsList": [
    [
      "../shared/types/db.ts"
    ]
  ],
  "options": {
    "declaration": false,
    "noEmitOnError": true,
    "outDir": "./"
  },
  "referencedMap": {
    "../src/main.ts": [
      "../shared/types/db.ts"
    ]
  },
  "size": 1437
}

tsconfig.json::
SemanticDiagnostics::
*refresh*    /user/username/projects/noEmitOnError/src/main.ts
Signatures::
(computed .d.ts) /user/username/projects/noEmitOnError/src/main.ts


Edit [2]:: no change

tsgo 
ExitStatus:: Success
Output::

tsconfig.json::
SemanticDiagnostics::
Signatures::
