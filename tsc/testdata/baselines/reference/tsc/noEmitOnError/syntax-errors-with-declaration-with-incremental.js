currentDirectory::/user/username/projects/noEmitOnError
useCaseSensitiveFileNames::true
Input::
//// [/user/username/projects/noEmitOnError/shared/types/db.ts] *new* 
export interface A {
    name: string;
}
//// [/user/username/projects/noEmitOnError/src/main.ts] *new* 
import { A } from "../shared/types/db";
const a = {
    lastName: 'sdsd'
;
//// [/user/username/projects/noEmitOnError/src/other.ts] *new* 
console.log("hi");
export { }
//// [/user/username/projects/noEmitOnError/tsconfig.json] *new* 
{
    "compilerOptions": {
        "outDir": "./dev-build",
        "declaration": true,
        "incremental": true,
        "noEmitOnError": true,
    },
}

tsgo 
ExitStatus:: DiagnosticsPresent_OutputsSkipped
Output::
[96msrc/main.ts[0m:[93m4[0m:[93m1[0m - [91merror[0m[90m TS1005: [0m',' expected.

[7m4[0m ;
[7m [0m [91m~[0m


Found 1 error in src/main.ts[90m:4[0m

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
//// [/user/username/projects/noEmitOnError/dev-build/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","errors":true,"root":[[2,4]],"fileNames":["lib.d.ts","../shared/types/db.ts","../src/main.ts","../src/other.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},"4dba75627964632af83642176cf4b611-export interface A {\n    name: string;\n}","6ac30e235b3496214b9c209edec4d109-import { A } from \"../shared/types/db\";\nconst a = {\n    lastName: 'sdsd'\n;","ac4084c9455da7165ada8cb39f592843-console.log(\"hi\");\nexport { }"],"fileIdsList":[[2]],"options":{"declaration":true,"noEmitOnError":true,"outDir":"./"},"referencedMap":[[3,1]],"semanticDiagnosticsPerFile":[1,2,3,4],"affectedFilesPendingEmit":[2,3,4]}
//// [/user/username/projects/noEmitOnError/dev-build/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "errors": true,
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
      "version": "6ac30e235b3496214b9c209edec4d109-import { A } from \"../shared/types/db\";\nconst a = {\n    lastName: 'sdsd'\n;",
      "signature": "6ac30e235b3496214b9c209edec4d109-import { A } from \"../shared/types/db\";\nconst a = {\n    lastName: 'sdsd'\n;",
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
    "declaration": true,
    "noEmitOnError": true,
    "outDir": "./"
  },
  "referencedMap": {
    "../src/main.ts": [
      "../shared/types/db.ts"
    ]
  },
  "semanticDiagnosticsPerFile": [
    "lib.d.ts",
    "../shared/types/db.ts",
    "../src/main.ts",
    "../src/other.ts"
  ],
  "affectedFilesPendingEmit": [
    [
      "../shared/types/db.ts",
      "Js|Dts",
      2
    ],
    [
      "../src/main.ts",
      "Js|Dts",
      3
    ],
    [
      "../src/other.ts",
      "Js|Dts",
      4
    ]
  ],
  "size": 1369
}

tsconfig.json::
SemanticDiagnostics::
*not cached* /home/src/tslibs/TS/Lib/lib.d.ts
*not cached* /user/username/projects/noEmitOnError/shared/types/db.ts
*not cached* /user/username/projects/noEmitOnError/src/main.ts
*not cached* /user/username/projects/noEmitOnError/src/other.ts
Signatures::


Edit [0]:: no change

tsgo 
ExitStatus:: DiagnosticsPresent_OutputsSkipped
Output::
[96msrc/main.ts[0m:[93m4[0m:[93m1[0m - [91merror[0m[90m TS1005: [0m',' expected.

[7m4[0m ;
[7m [0m [91m~[0m


Found 1 error in src/main.ts[90m:4[0m


tsconfig.json::
SemanticDiagnostics::
*not cached* /home/src/tslibs/TS/Lib/lib.d.ts
*not cached* /user/username/projects/noEmitOnError/shared/types/db.ts
*not cached* /user/username/projects/noEmitOnError/src/main.ts
*not cached* /user/username/projects/noEmitOnError/src/other.ts
Signatures::


Edit [1]:: Fix error
//// [/user/username/projects/noEmitOnError/src/main.ts] *modified* 
import { A } from "../shared/types/db";
const a = {
    lastName: 'sdsd'
};

tsgo 
ExitStatus:: Success
Output::
//// [/user/username/projects/noEmitOnError/dev-build/shared/types/db.d.ts] *new* 
export interface A {
    name: string;
}

//// [/user/username/projects/noEmitOnError/dev-build/shared/types/db.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

//// [/user/username/projects/noEmitOnError/dev-build/src/main.d.ts] *new* 
export {};

//// [/user/username/projects/noEmitOnError/dev-build/src/main.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const a = {
    lastName: 'sdsd'
};

//// [/user/username/projects/noEmitOnError/dev-build/src/other.d.ts] *new* 
export {};

//// [/user/username/projects/noEmitOnError/dev-build/src/other.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
console.log("hi");

//// [/user/username/projects/noEmitOnError/dev-build/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[[2,4]],"fileNames":["lib.d.ts","../shared/types/db.ts","../src/main.ts","../src/other.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"4dba75627964632af83642176cf4b611-export interface A {\n    name: string;\n}","signature":"54943827690173f946e7a76cd9b9eb27-export interface A {\n    name: string;\n}\n","impliedNodeFormat":1},{"version":"7b22ad4790ccb4d687e7d84c4e640776-import { A } from \"../shared/types/db\";\nconst a = {\n    lastName: 'sdsd'\n};","signature":"abe7d9981d6018efb6b2b794f40a1607-export {};\n","impliedNodeFormat":1},{"version":"ac4084c9455da7165ada8cb39f592843-console.log(\"hi\");\nexport { }","signature":"abe7d9981d6018efb6b2b794f40a1607-export {};\n","impliedNodeFormat":1}],"fileIdsList":[[2]],"options":{"declaration":true,"noEmitOnError":true,"outDir":"./"},"referencedMap":[[3,1]]}
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
      "signature": "54943827690173f946e7a76cd9b9eb27-export interface A {\n    name: string;\n}\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "4dba75627964632af83642176cf4b611-export interface A {\n    name: string;\n}",
        "signature": "54943827690173f946e7a76cd9b9eb27-export interface A {\n    name: string;\n}\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "../src/main.ts",
      "version": "7b22ad4790ccb4d687e7d84c4e640776-import { A } from \"../shared/types/db\";\nconst a = {\n    lastName: 'sdsd'\n};",
      "signature": "abe7d9981d6018efb6b2b794f40a1607-export {};\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "7b22ad4790ccb4d687e7d84c4e640776-import { A } from \"../shared/types/db\";\nconst a = {\n    lastName: 'sdsd'\n};",
        "signature": "abe7d9981d6018efb6b2b794f40a1607-export {};\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "../src/other.ts",
      "version": "ac4084c9455da7165ada8cb39f592843-console.log(\"hi\");\nexport { }",
      "signature": "abe7d9981d6018efb6b2b794f40a1607-export {};\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "ac4084c9455da7165ada8cb39f592843-console.log(\"hi\");\nexport { }",
        "signature": "abe7d9981d6018efb6b2b794f40a1607-export {};\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "fileIdsList": [
    [
      "../shared/types/db.ts"
    ]
  ],
  "options": {
    "declaration": true,
    "noEmitOnError": true,
    "outDir": "./"
  },
  "referencedMap": {
    "../src/main.ts": [
      "../shared/types/db.ts"
    ]
  },
  "size": 1596
}

tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.d.ts
*refresh*    /user/username/projects/noEmitOnError/shared/types/db.ts
*refresh*    /user/username/projects/noEmitOnError/src/main.ts
*refresh*    /user/username/projects/noEmitOnError/src/other.ts
Signatures::
(stored at emit) /user/username/projects/noEmitOnError/shared/types/db.ts
(computed .d.ts) /user/username/projects/noEmitOnError/src/main.ts
(stored at emit) /user/username/projects/noEmitOnError/src/other.ts


Edit [2]:: no change

tsgo 
ExitStatus:: Success
Output::

tsconfig.json::
SemanticDiagnostics::
Signatures::
