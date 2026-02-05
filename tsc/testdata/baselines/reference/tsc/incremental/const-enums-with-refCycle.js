currentDirectory::/home/src/workspaces/project
useCaseSensitiveFileNames::true
Input::
//// [/home/src/workspaces/project/aworker.ts] *new* 
export const AWorker  = 10
//// [/home/src/workspaces/project/b.ts] *new* 
import { AWorker } from "./aworker"
import { A as ACycle } from "./c"
export const enum A {
    ONE = 1
}
//// [/home/src/workspaces/project/c.ts] *new* 
import {A} from "./b"
let b = A.ONE
export {A}
//// [/home/src/workspaces/project/file.ts] *new* 
import {A} from "./c"
let a = A.ONE
//// [/home/src/workspaces/project/tsconfig.json] *new* 
{
    "compilerOptions": {
        "composite": true,
    }
}

tsgo 
ExitStatus:: Success
Output::
//// [/home/src/tslibs/TS/Lib/lib.es2024.full.d.ts] *Lib*
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
//// [/home/src/workspaces/project/aworker.d.ts] *new* 
export declare const AWorker = 10;

//// [/home/src/workspaces/project/aworker.js] *new* 
export const AWorker = 10;

//// [/home/src/workspaces/project/b.d.ts] *new* 
export declare const enum A {
    ONE = 1
}

//// [/home/src/workspaces/project/b.js] *new* 
export {};

//// [/home/src/workspaces/project/c.d.ts] *new* 
import { A } from "./b";
export { A };

//// [/home/src/workspaces/project/c.js] *new* 
let b = 1 /* A.ONE */;
export {};

//// [/home/src/workspaces/project/file.d.ts] *new* 
export {};

//// [/home/src/workspaces/project/file.js] *new* 
let a = 1 /* A.ONE */;
export {};

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":[[2,5]],"fileNames":["lib.es2024.full.d.ts","./aworker.ts","./c.ts","./b.ts","./file.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"5fe80ccba36a579325309b8069ecdcbf-export const AWorker  = 10","signature":"6bac69de224c872c50dea01f4c4b43d6-export declare const AWorker = 10;\n","impliedNodeFormat":1},{"version":"27be335cb83f09e0543d1a6458f51e79-import {A} from \"./b\"\nlet b = A.ONE\nexport {A}","signature":"f6d90ac6a94594899853de488fc81940-import { A } from \"./b\";\nexport { A };\n","impliedNodeFormat":1},{"version":"fd5de56c8fb277639e17b90c496b1f4e-import { AWorker } from \"./aworker\"\nimport { A as ACycle } from \"./c\"\nexport const enum A {\n    ONE = 1\n}","signature":"d315610a03cc0f05df42654a56107b7a-export declare const enum A {\n    ONE = 1\n}\n","impliedNodeFormat":1},{"version":"f69fa3d8747995fb7603cfd9c694aa6b-import {A} from \"./c\"\nlet a = A.ONE","signature":"abe7d9981d6018efb6b2b794f40a1607-export {};\n","impliedNodeFormat":1}],"fileIdsList":[[2,3],[4],[3]],"options":{"composite":true},"referencedMap":[[4,1],[3,2],[5,3]],"latestChangedDtsFile":"./file.d.ts"}
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./aworker.ts",
        "./c.ts",
        "./b.ts",
        "./file.ts"
      ],
      "original": [
        2,
        5
      ]
    }
  ],
  "fileNames": [
    "lib.es2024.full.d.ts",
    "./aworker.ts",
    "./c.ts",
    "./b.ts",
    "./file.ts"
  ],
  "fileInfos": [
    {
      "fileName": "lib.es2024.full.d.ts",
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
      "fileName": "./aworker.ts",
      "version": "5fe80ccba36a579325309b8069ecdcbf-export const AWorker  = 10",
      "signature": "6bac69de224c872c50dea01f4c4b43d6-export declare const AWorker = 10;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "5fe80ccba36a579325309b8069ecdcbf-export const AWorker  = 10",
        "signature": "6bac69de224c872c50dea01f4c4b43d6-export declare const AWorker = 10;\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./c.ts",
      "version": "27be335cb83f09e0543d1a6458f51e79-import {A} from \"./b\"\nlet b = A.ONE\nexport {A}",
      "signature": "f6d90ac6a94594899853de488fc81940-import { A } from \"./b\";\nexport { A };\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "27be335cb83f09e0543d1a6458f51e79-import {A} from \"./b\"\nlet b = A.ONE\nexport {A}",
        "signature": "f6d90ac6a94594899853de488fc81940-import { A } from \"./b\";\nexport { A };\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./b.ts",
      "version": "fd5de56c8fb277639e17b90c496b1f4e-import { AWorker } from \"./aworker\"\nimport { A as ACycle } from \"./c\"\nexport const enum A {\n    ONE = 1\n}",
      "signature": "d315610a03cc0f05df42654a56107b7a-export declare const enum A {\n    ONE = 1\n}\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "fd5de56c8fb277639e17b90c496b1f4e-import { AWorker } from \"./aworker\"\nimport { A as ACycle } from \"./c\"\nexport const enum A {\n    ONE = 1\n}",
        "signature": "d315610a03cc0f05df42654a56107b7a-export declare const enum A {\n    ONE = 1\n}\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./file.ts",
      "version": "f69fa3d8747995fb7603cfd9c694aa6b-import {A} from \"./c\"\nlet a = A.ONE",
      "signature": "abe7d9981d6018efb6b2b794f40a1607-export {};\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "f69fa3d8747995fb7603cfd9c694aa6b-import {A} from \"./c\"\nlet a = A.ONE",
        "signature": "abe7d9981d6018efb6b2b794f40a1607-export {};\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "fileIdsList": [
    [
      "./aworker.ts",
      "./c.ts"
    ],
    [
      "./b.ts"
    ],
    [
      "./c.ts"
    ]
  ],
  "options": {
    "composite": true
  },
  "referencedMap": {
    "./b.ts": [
      "./aworker.ts",
      "./c.ts"
    ],
    "./c.ts": [
      "./b.ts"
    ],
    "./file.ts": [
      "./c.ts"
    ]
  },
  "latestChangedDtsFile": "./file.d.ts",
  "size": 1877
}

tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es2024.full.d.ts
*refresh*    /home/src/workspaces/project/aworker.ts
*refresh*    /home/src/workspaces/project/c.ts
*refresh*    /home/src/workspaces/project/b.ts
*refresh*    /home/src/workspaces/project/file.ts
Signatures::
(stored at emit) /home/src/workspaces/project/aworker.ts
(stored at emit) /home/src/workspaces/project/c.ts
(stored at emit) /home/src/workspaces/project/b.ts
(stored at emit) /home/src/workspaces/project/file.ts


Edit [0]:: change aworker
//// [/home/src/workspaces/project/aworker.ts] *modified* 
export const AWorker  = 20

tsgo 
ExitStatus:: Success
Output::
//// [/home/src/workspaces/project/aworker.d.ts] *modified* 
export declare const AWorker = 20;

//// [/home/src/workspaces/project/aworker.js] *modified* 
export const AWorker = 20;

//// [/home/src/workspaces/project/b.js] *rewrite with same content*
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[[2,5]],"fileNames":["lib.es2024.full.d.ts","./aworker.ts","./c.ts","./b.ts","./file.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"cfd897966c854a85734f846eebdc2522-export const AWorker  = 20","signature":"9ae79a49b184a51267da768d96c0c874-export declare const AWorker = 20;\n","impliedNodeFormat":1},{"version":"27be335cb83f09e0543d1a6458f51e79-import {A} from \"./b\"\nlet b = A.ONE\nexport {A}","signature":"f6d90ac6a94594899853de488fc81940-import { A } from \"./b\";\nexport { A };\n","impliedNodeFormat":1},{"version":"fd5de56c8fb277639e17b90c496b1f4e-import { AWorker } from \"./aworker\"\nimport { A as ACycle } from \"./c\"\nexport const enum A {\n    ONE = 1\n}","signature":"d315610a03cc0f05df42654a56107b7a-export declare const enum A {\n    ONE = 1\n}\n","impliedNodeFormat":1},{"version":"f69fa3d8747995fb7603cfd9c694aa6b-import {A} from \"./c\"\nlet a = A.ONE","signature":"abe7d9981d6018efb6b2b794f40a1607-export {};\n","impliedNodeFormat":1}],"fileIdsList":[[2,3],[4],[3]],"options":{"composite":true},"referencedMap":[[4,1],[3,2],[5,3]],"latestChangedDtsFile":"./aworker.d.ts"}
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./aworker.ts",
        "./c.ts",
        "./b.ts",
        "./file.ts"
      ],
      "original": [
        2,
        5
      ]
    }
  ],
  "fileNames": [
    "lib.es2024.full.d.ts",
    "./aworker.ts",
    "./c.ts",
    "./b.ts",
    "./file.ts"
  ],
  "fileInfos": [
    {
      "fileName": "lib.es2024.full.d.ts",
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
      "fileName": "./aworker.ts",
      "version": "cfd897966c854a85734f846eebdc2522-export const AWorker  = 20",
      "signature": "9ae79a49b184a51267da768d96c0c874-export declare const AWorker = 20;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "cfd897966c854a85734f846eebdc2522-export const AWorker  = 20",
        "signature": "9ae79a49b184a51267da768d96c0c874-export declare const AWorker = 20;\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./c.ts",
      "version": "27be335cb83f09e0543d1a6458f51e79-import {A} from \"./b\"\nlet b = A.ONE\nexport {A}",
      "signature": "f6d90ac6a94594899853de488fc81940-import { A } from \"./b\";\nexport { A };\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "27be335cb83f09e0543d1a6458f51e79-import {A} from \"./b\"\nlet b = A.ONE\nexport {A}",
        "signature": "f6d90ac6a94594899853de488fc81940-import { A } from \"./b\";\nexport { A };\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./b.ts",
      "version": "fd5de56c8fb277639e17b90c496b1f4e-import { AWorker } from \"./aworker\"\nimport { A as ACycle } from \"./c\"\nexport const enum A {\n    ONE = 1\n}",
      "signature": "d315610a03cc0f05df42654a56107b7a-export declare const enum A {\n    ONE = 1\n}\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "fd5de56c8fb277639e17b90c496b1f4e-import { AWorker } from \"./aworker\"\nimport { A as ACycle } from \"./c\"\nexport const enum A {\n    ONE = 1\n}",
        "signature": "d315610a03cc0f05df42654a56107b7a-export declare const enum A {\n    ONE = 1\n}\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./file.ts",
      "version": "f69fa3d8747995fb7603cfd9c694aa6b-import {A} from \"./c\"\nlet a = A.ONE",
      "signature": "abe7d9981d6018efb6b2b794f40a1607-export {};\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "f69fa3d8747995fb7603cfd9c694aa6b-import {A} from \"./c\"\nlet a = A.ONE",
        "signature": "abe7d9981d6018efb6b2b794f40a1607-export {};\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "fileIdsList": [
    [
      "./aworker.ts",
      "./c.ts"
    ],
    [
      "./b.ts"
    ],
    [
      "./c.ts"
    ]
  ],
  "options": {
    "composite": true
  },
  "referencedMap": {
    "./b.ts": [
      "./aworker.ts",
      "./c.ts"
    ],
    "./c.ts": [
      "./b.ts"
    ],
    "./file.ts": [
      "./c.ts"
    ]
  },
  "latestChangedDtsFile": "./aworker.d.ts",
  "size": 1880
}

tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/workspaces/project/aworker.ts
*refresh*    /home/src/workspaces/project/c.ts
*refresh*    /home/src/workspaces/project/b.ts
*refresh*    /home/src/workspaces/project/file.ts
Signatures::
(computed .d.ts) /home/src/workspaces/project/aworker.ts
(stored at emit) /home/src/workspaces/project/c.ts
(computed .d.ts) /home/src/workspaces/project/b.ts
(stored at emit) /home/src/workspaces/project/file.ts


Edit [1]:: change aworker and enum value
//// [/home/src/workspaces/project/aworker.ts] *modified* 
export const AWorker  = 30
//// [/home/src/workspaces/project/b.ts] *modified* 
import { AWorker } from "./aworker"
import { A as ACycle } from "./c"
export const enum A {
    ONE = 2
}

tsgo 
ExitStatus:: Success
Output::
//// [/home/src/workspaces/project/aworker.d.ts] *modified* 
export declare const AWorker = 30;

//// [/home/src/workspaces/project/aworker.js] *modified* 
export const AWorker = 30;

//// [/home/src/workspaces/project/b.d.ts] *modified* 
export declare const enum A {
    ONE = 2
}

//// [/home/src/workspaces/project/b.js] *rewrite with same content*
//// [/home/src/workspaces/project/c.js] *modified* 
let b = 2 /* A.ONE */;
export {};

//// [/home/src/workspaces/project/file.js] *modified* 
let a = 2 /* A.ONE */;
export {};

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[[2,5]],"fileNames":["lib.es2024.full.d.ts","./aworker.ts","./c.ts","./b.ts","./file.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"0abee34025663fa477c509e26cf273a2-export const AWorker  = 30","signature":"d29f137c75d23f69893ba2fa8bbe5074-export declare const AWorker = 30;\n","impliedNodeFormat":1},{"version":"27be335cb83f09e0543d1a6458f51e79-import {A} from \"./b\"\nlet b = A.ONE\nexport {A}","signature":"f6d90ac6a94594899853de488fc81940-import { A } from \"./b\";\nexport { A };\n","impliedNodeFormat":1},{"version":"91ccb4a8cfdae5e306e69639971e3c6c-import { AWorker } from \"./aworker\"\nimport { A as ACycle } from \"./c\"\nexport const enum A {\n    ONE = 2\n}","signature":"3705929e4c6d5205d1a7e3d88e35d3e7-export declare const enum A {\n    ONE = 2\n}\n","impliedNodeFormat":1},{"version":"f69fa3d8747995fb7603cfd9c694aa6b-import {A} from \"./c\"\nlet a = A.ONE","signature":"abe7d9981d6018efb6b2b794f40a1607-export {};\n","impliedNodeFormat":1}],"fileIdsList":[[2,3],[4],[3]],"options":{"composite":true},"referencedMap":[[4,1],[3,2],[5,3]],"latestChangedDtsFile":"./b.d.ts"}
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./aworker.ts",
        "./c.ts",
        "./b.ts",
        "./file.ts"
      ],
      "original": [
        2,
        5
      ]
    }
  ],
  "fileNames": [
    "lib.es2024.full.d.ts",
    "./aworker.ts",
    "./c.ts",
    "./b.ts",
    "./file.ts"
  ],
  "fileInfos": [
    {
      "fileName": "lib.es2024.full.d.ts",
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
      "fileName": "./aworker.ts",
      "version": "0abee34025663fa477c509e26cf273a2-export const AWorker  = 30",
      "signature": "d29f137c75d23f69893ba2fa8bbe5074-export declare const AWorker = 30;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "0abee34025663fa477c509e26cf273a2-export const AWorker  = 30",
        "signature": "d29f137c75d23f69893ba2fa8bbe5074-export declare const AWorker = 30;\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./c.ts",
      "version": "27be335cb83f09e0543d1a6458f51e79-import {A} from \"./b\"\nlet b = A.ONE\nexport {A}",
      "signature": "f6d90ac6a94594899853de488fc81940-import { A } from \"./b\";\nexport { A };\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "27be335cb83f09e0543d1a6458f51e79-import {A} from \"./b\"\nlet b = A.ONE\nexport {A}",
        "signature": "f6d90ac6a94594899853de488fc81940-import { A } from \"./b\";\nexport { A };\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./b.ts",
      "version": "91ccb4a8cfdae5e306e69639971e3c6c-import { AWorker } from \"./aworker\"\nimport { A as ACycle } from \"./c\"\nexport const enum A {\n    ONE = 2\n}",
      "signature": "3705929e4c6d5205d1a7e3d88e35d3e7-export declare const enum A {\n    ONE = 2\n}\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "91ccb4a8cfdae5e306e69639971e3c6c-import { AWorker } from \"./aworker\"\nimport { A as ACycle } from \"./c\"\nexport const enum A {\n    ONE = 2\n}",
        "signature": "3705929e4c6d5205d1a7e3d88e35d3e7-export declare const enum A {\n    ONE = 2\n}\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./file.ts",
      "version": "f69fa3d8747995fb7603cfd9c694aa6b-import {A} from \"./c\"\nlet a = A.ONE",
      "signature": "abe7d9981d6018efb6b2b794f40a1607-export {};\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "f69fa3d8747995fb7603cfd9c694aa6b-import {A} from \"./c\"\nlet a = A.ONE",
        "signature": "abe7d9981d6018efb6b2b794f40a1607-export {};\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "fileIdsList": [
    [
      "./aworker.ts",
      "./c.ts"
    ],
    [
      "./b.ts"
    ],
    [
      "./c.ts"
    ]
  ],
  "options": {
    "composite": true
  },
  "referencedMap": {
    "./b.ts": [
      "./aworker.ts",
      "./c.ts"
    ],
    "./c.ts": [
      "./b.ts"
    ],
    "./file.ts": [
      "./c.ts"
    ]
  },
  "latestChangedDtsFile": "./b.d.ts",
  "size": 1874
}

tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/workspaces/project/aworker.ts
*refresh*    /home/src/workspaces/project/c.ts
*refresh*    /home/src/workspaces/project/b.ts
*refresh*    /home/src/workspaces/project/file.ts
Signatures::
(computed .d.ts) /home/src/workspaces/project/aworker.ts
(computed .d.ts) /home/src/workspaces/project/c.ts
(computed .d.ts) /home/src/workspaces/project/b.ts
(stored at emit) /home/src/workspaces/project/file.ts
