currentDirectory::/user/username/projects/noEmitOnError
useCaseSensitiveFileNames::true
Input::
//// [/user/username/projects/noEmitOnError/shared/types/db.ts] *new* 
export interface A {
    name: string;
}
//// [/user/username/projects/noEmitOnError/src/main.ts] *new* 
import { A } from "../shared/types/db";
const a: string = 10;
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

tsgo -b -v
ExitStatus:: DiagnosticsPresent_OutputsSkipped
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because output file 'dev-build/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project 'tsconfig.json'...

[96msrc/main.ts[0m:[93m2[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'number' is not assignable to type 'string'.

[7m2[0m const a: string = 10;
[7m [0m [91m      ~[0m


Found 1 error in src/main.ts[90m:2[0m

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
{"version":"FakeTSVersion","root":[[2,4]],"fileNames":["lib.d.ts","../shared/types/db.ts","../src/main.ts","../src/other.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},"4dba75627964632af83642176cf4b611-export interface A {\n    name: string;\n}","21728e732a07c83043db4a93ca54350c-import { A } from \"../shared/types/db\";\nconst a: string = 10;","ac4084c9455da7165ada8cb39f592843-console.log(\"hi\");\nexport { }"],"fileIdsList":[[2]],"options":{"declaration":true,"noEmitOnError":true,"outDir":"./"},"referencedMap":[[3,1]],"semanticDiagnosticsPerFile":[[3,[{"pos":46,"end":47,"code":2322,"category":1,"message":"Type 'number' is not assignable to type 'string'."}]]],"affectedFilesPendingEmit":[2,3,4]}
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
      "version": "21728e732a07c83043db4a93ca54350c-import { A } from \"../shared/types/db\";\nconst a: string = 10;",
      "signature": "21728e732a07c83043db4a93ca54350c-import { A } from \"../shared/types/db\";\nconst a: string = 10;",
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
    [
      "../src/main.ts",
      [
        {
          "pos": 46,
          "end": 47,
          "code": 2322,
          "category": 1,
          "message": "Type 'number' is not assignable to type 'string'."
        }
      ]
    ]
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
  "size": 1445
}

tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.d.ts
*refresh*    /user/username/projects/noEmitOnError/shared/types/db.ts
*refresh*    /user/username/projects/noEmitOnError/src/main.ts
*refresh*    /user/username/projects/noEmitOnError/src/other.ts
Signatures::


Edit [0]:: no change

tsgo -b -v
ExitStatus:: DiagnosticsPresent_OutputsSkipped
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because buildinfo file 'dev-build/tsconfig.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project 'tsconfig.json'...

[96msrc/main.ts[0m:[93m2[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'number' is not assignable to type 'string'.

[7m2[0m const a: string = 10;
[7m [0m [91m      ~[0m


Found 1 error in src/main.ts[90m:2[0m


tsconfig.json::
SemanticDiagnostics::
Signatures::


Edit [1]:: Fix error
//// [/user/username/projects/noEmitOnError/src/main.ts] *modified* 
import { A } from "../shared/types/db";
const a: string = "hello";

tsgo -b -v
ExitStatus:: Success
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because buildinfo file 'dev-build/tsconfig.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project 'tsconfig.json'...

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
const a = "hello";

//// [/user/username/projects/noEmitOnError/dev-build/src/other.d.ts] *new* 
export {};

//// [/user/username/projects/noEmitOnError/dev-build/src/other.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
console.log("hi");

//// [/user/username/projects/noEmitOnError/dev-build/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[[2,4]],"fileNames":["lib.d.ts","../shared/types/db.ts","../src/main.ts","../src/other.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"4dba75627964632af83642176cf4b611-export interface A {\n    name: string;\n}","signature":"54943827690173f946e7a76cd9b9eb27-export interface A {\n    name: string;\n}\n","impliedNodeFormat":1},{"version":"53d07f7c18bc0a70f0fe62e902ac491d-import { A } from \"../shared/types/db\";\nconst a: string = \"hello\";","signature":"abe7d9981d6018efb6b2b794f40a1607-export {};\n","impliedNodeFormat":1},{"version":"ac4084c9455da7165ada8cb39f592843-console.log(\"hi\");\nexport { }","signature":"abe7d9981d6018efb6b2b794f40a1607-export {};\n","impliedNodeFormat":1}],"fileIdsList":[[2]],"options":{"declaration":true,"noEmitOnError":true,"outDir":"./"},"referencedMap":[[3,1]]}
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
      "version": "53d07f7c18bc0a70f0fe62e902ac491d-import { A } from \"../shared/types/db\";\nconst a: string = \"hello\";",
      "signature": "abe7d9981d6018efb6b2b794f40a1607-export {};\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "53d07f7c18bc0a70f0fe62e902ac491d-import { A } from \"../shared/types/db\";\nconst a: string = \"hello\";",
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
  "size": 1587
}

tsconfig.json::
SemanticDiagnostics::
*refresh*    /user/username/projects/noEmitOnError/src/main.ts
Signatures::
(stored at emit) /user/username/projects/noEmitOnError/shared/types/db.ts
(computed .d.ts) /user/username/projects/noEmitOnError/src/main.ts
(stored at emit) /user/username/projects/noEmitOnError/src/other.ts


Edit [2]:: no change

tsgo -b -v
ExitStatus:: Success
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is up to date because newest input 'src/main.ts' is older than output 'dev-build/tsconfig.tsbuildinfo'


