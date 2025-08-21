currentDirectory::/home/src/workspaces/project
useCaseSensitiveFileNames::true
Input::
//// [/home/src/workspaces/project/a.ts] *new* 
import {A} from "./c"
let a = A.ONE
//// [/home/src/workspaces/project/b.d.ts] *new* 
export const enum A {
    ONE = 1
}
//// [/home/src/workspaces/project/c.ts] *new* 
import {A} from "./b"
let b = A.ONE
export {A}
//// [/home/src/workspaces/project/worker.d.ts] *new* 
export const enum AWorker {
    ONE = 1
}

tsgo -i a.ts --tsbuildinfofile a.tsbuildinfo
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
//// [/home/src/workspaces/project/a.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let a = 1 /* A.ONE */;

//// [/home/src/workspaces/project/a.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":[4],"fileNames":["lib.d.ts","./b.d.ts","./c.ts","./a.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},"53c5c35ee54571b647e3f723569d09cf-export const enum A {\n    ONE = 1\n}","27be335cb83f09e0543d1a6458f51e79-import {A} from \"./b\"\nlet b = A.ONE\nexport {A}","f69fa3d8747995fb7603cfd9c694aa6b-import {A} from \"./c\"\nlet a = A.ONE"],"fileIdsList":[[3],[2]],"options":{"tsBuildInfoFile":"./a.tsbuildinfo"},"referencedMap":[[4,1],[3,2]]}
//// [/home/src/workspaces/project/a.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./a.ts"
      ],
      "original": 4
    }
  ],
  "fileNames": [
    "lib.d.ts",
    "./b.d.ts",
    "./c.ts",
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
      "fileName": "./b.d.ts",
      "version": "53c5c35ee54571b647e3f723569d09cf-export const enum A {\n    ONE = 1\n}",
      "signature": "53c5c35ee54571b647e3f723569d09cf-export const enum A {\n    ONE = 1\n}",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "./c.ts",
      "version": "27be335cb83f09e0543d1a6458f51e79-import {A} from \"./b\"\nlet b = A.ONE\nexport {A}",
      "signature": "27be335cb83f09e0543d1a6458f51e79-import {A} from \"./b\"\nlet b = A.ONE\nexport {A}",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "./a.ts",
      "version": "f69fa3d8747995fb7603cfd9c694aa6b-import {A} from \"./c\"\nlet a = A.ONE",
      "signature": "f69fa3d8747995fb7603cfd9c694aa6b-import {A} from \"./c\"\nlet a = A.ONE",
      "impliedNodeFormat": "CommonJS"
    }
  ],
  "fileIdsList": [
    [
      "./c.ts"
    ],
    [
      "./b.d.ts"
    ]
  ],
  "options": {
    "tsBuildInfoFile": "./a.tsbuildinfo"
  },
  "referencedMap": {
    "./a.ts": [
      "./c.ts"
    ],
    "./c.ts": [
      "./b.d.ts"
    ]
  },
  "size": 1211
}
//// [/home/src/workspaces/project/c.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let b = 1 /* A.ONE */;


SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.d.ts
*refresh*    /home/src/workspaces/project/b.d.ts
*refresh*    /home/src/workspaces/project/c.ts
*refresh*    /home/src/workspaces/project/a.ts
Signatures::


Edit [0]:: change enum value
//// [/home/src/workspaces/project/b.d.ts] *modified* 
export const enum A {
    ONE = 2
}

tsgo -i a.ts --tsbuildinfofile a.tsbuildinfo
ExitStatus:: Success
Output::
//// [/home/src/workspaces/project/a.js] *modified* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let a = 2 /* A.ONE */;

//// [/home/src/workspaces/project/a.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[4],"fileNames":["lib.d.ts","./b.d.ts","./c.ts","./a.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},"d04ca273da9def3b63557363c6eae3ca-export const enum A {\n    ONE = 2\n}",{"version":"27be335cb83f09e0543d1a6458f51e79-import {A} from \"./b\"\nlet b = A.ONE\nexport {A}","signature":"f6d90ac6a94594899853de488fc81940-import { A } from \"./b\";\nexport { A };\n","impliedNodeFormat":1},{"version":"f69fa3d8747995fb7603cfd9c694aa6b-import {A} from \"./c\"\nlet a = A.ONE","signature":"abe7d9981d6018efb6b2b794f40a1607-export {};\n","impliedNodeFormat":1}],"fileIdsList":[[3],[2]],"options":{"tsBuildInfoFile":"./a.tsbuildinfo"},"referencedMap":[[4,1],[3,2]]}
//// [/home/src/workspaces/project/a.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./a.ts"
      ],
      "original": 4
    }
  ],
  "fileNames": [
    "lib.d.ts",
    "./b.d.ts",
    "./c.ts",
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
      "fileName": "./b.d.ts",
      "version": "d04ca273da9def3b63557363c6eae3ca-export const enum A {\n    ONE = 2\n}",
      "signature": "d04ca273da9def3b63557363c6eae3ca-export const enum A {\n    ONE = 2\n}",
      "impliedNodeFormat": "CommonJS"
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
      "fileName": "./a.ts",
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
      "./c.ts"
    ],
    [
      "./b.d.ts"
    ]
  ],
  "options": {
    "tsBuildInfoFile": "./a.tsbuildinfo"
  },
  "referencedMap": {
    "./a.ts": [
      "./c.ts"
    ],
    "./c.ts": [
      "./b.d.ts"
    ]
  },
  "size": 1430
}
//// [/home/src/workspaces/project/c.js] *modified* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let b = 2 /* A.ONE */;


SemanticDiagnostics::
*refresh*    /home/src/workspaces/project/b.d.ts
*refresh*    /home/src/workspaces/project/c.ts
*refresh*    /home/src/workspaces/project/a.ts
Signatures::
(used version)   /home/src/workspaces/project/b.d.ts
(computed .d.ts) /home/src/workspaces/project/c.ts
(computed .d.ts) /home/src/workspaces/project/a.ts


Edit [1]:: change enum value again
//// [/home/src/workspaces/project/b.d.ts] *modified* 
export const enum A {
    ONE = 3
}

tsgo -i a.ts --tsbuildinfofile a.tsbuildinfo
ExitStatus:: Success
Output::
//// [/home/src/workspaces/project/a.js] *modified* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let a = 3 /* A.ONE */;

//// [/home/src/workspaces/project/a.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[4],"fileNames":["lib.d.ts","./b.d.ts","./c.ts","./a.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},"097e7efa854e788c6281c17b46d9460a-export const enum A {\n    ONE = 3\n}",{"version":"27be335cb83f09e0543d1a6458f51e79-import {A} from \"./b\"\nlet b = A.ONE\nexport {A}","signature":"f6d90ac6a94594899853de488fc81940-import { A } from \"./b\";\nexport { A };\n","impliedNodeFormat":1},"f69fa3d8747995fb7603cfd9c694aa6b-import {A} from \"./c\"\nlet a = A.ONE"],"fileIdsList":[[3],[2]],"options":{"tsBuildInfoFile":"./a.tsbuildinfo"},"referencedMap":[[4,1],[3,2]]}
//// [/home/src/workspaces/project/a.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./a.ts"
      ],
      "original": 4
    }
  ],
  "fileNames": [
    "lib.d.ts",
    "./b.d.ts",
    "./c.ts",
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
      "fileName": "./b.d.ts",
      "version": "097e7efa854e788c6281c17b46d9460a-export const enum A {\n    ONE = 3\n}",
      "signature": "097e7efa854e788c6281c17b46d9460a-export const enum A {\n    ONE = 3\n}",
      "impliedNodeFormat": "CommonJS"
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
      "fileName": "./a.ts",
      "version": "f69fa3d8747995fb7603cfd9c694aa6b-import {A} from \"./c\"\nlet a = A.ONE",
      "signature": "f69fa3d8747995fb7603cfd9c694aa6b-import {A} from \"./c\"\nlet a = A.ONE",
      "impliedNodeFormat": "CommonJS"
    }
  ],
  "fileIdsList": [
    [
      "./c.ts"
    ],
    [
      "./b.d.ts"
    ]
  ],
  "options": {
    "tsBuildInfoFile": "./a.tsbuildinfo"
  },
  "referencedMap": {
    "./a.ts": [
      "./c.ts"
    ],
    "./c.ts": [
      "./b.d.ts"
    ]
  },
  "size": 1336
}
//// [/home/src/workspaces/project/c.js] *modified* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let b = 3 /* A.ONE */;


SemanticDiagnostics::
*refresh*    /home/src/workspaces/project/b.d.ts
*refresh*    /home/src/workspaces/project/c.ts
*refresh*    /home/src/workspaces/project/a.ts
Signatures::
(used version)   /home/src/workspaces/project/b.d.ts
(computed .d.ts) /home/src/workspaces/project/c.ts
(used version)   /home/src/workspaces/project/a.ts


Edit [2]:: something else changes in b.d.ts
//// [/home/src/workspaces/project/b.d.ts] *modified* 
export const enum A {
    ONE = 3
}export const randomThing = 10;

tsgo -i a.ts --tsbuildinfofile a.tsbuildinfo
ExitStatus:: Success
Output::
//// [/home/src/workspaces/project/a.js] *rewrite with same content*
//// [/home/src/workspaces/project/a.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[4],"fileNames":["lib.d.ts","./b.d.ts","./c.ts","./a.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},"40d09f9f7c0089340619c57a80ff0ab1-export const enum A {\n    ONE = 3\n}export const randomThing = 10;",{"version":"27be335cb83f09e0543d1a6458f51e79-import {A} from \"./b\"\nlet b = A.ONE\nexport {A}","signature":"f6d90ac6a94594899853de488fc81940-import { A } from \"./b\";\nexport { A };\n","impliedNodeFormat":1},"f69fa3d8747995fb7603cfd9c694aa6b-import {A} from \"./c\"\nlet a = A.ONE"],"fileIdsList":[[3],[2]],"options":{"tsBuildInfoFile":"./a.tsbuildinfo"},"referencedMap":[[4,1],[3,2]]}
//// [/home/src/workspaces/project/a.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./a.ts"
      ],
      "original": 4
    }
  ],
  "fileNames": [
    "lib.d.ts",
    "./b.d.ts",
    "./c.ts",
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
      "fileName": "./b.d.ts",
      "version": "40d09f9f7c0089340619c57a80ff0ab1-export const enum A {\n    ONE = 3\n}export const randomThing = 10;",
      "signature": "40d09f9f7c0089340619c57a80ff0ab1-export const enum A {\n    ONE = 3\n}export const randomThing = 10;",
      "impliedNodeFormat": "CommonJS"
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
      "fileName": "./a.ts",
      "version": "f69fa3d8747995fb7603cfd9c694aa6b-import {A} from \"./c\"\nlet a = A.ONE",
      "signature": "f69fa3d8747995fb7603cfd9c694aa6b-import {A} from \"./c\"\nlet a = A.ONE",
      "impliedNodeFormat": "CommonJS"
    }
  ],
  "fileIdsList": [
    [
      "./c.ts"
    ],
    [
      "./b.d.ts"
    ]
  ],
  "options": {
    "tsBuildInfoFile": "./a.tsbuildinfo"
  },
  "referencedMap": {
    "./a.ts": [
      "./c.ts"
    ],
    "./c.ts": [
      "./b.d.ts"
    ]
  },
  "size": 1366
}
//// [/home/src/workspaces/project/c.js] *rewrite with same content*

SemanticDiagnostics::
*refresh*    /home/src/workspaces/project/b.d.ts
*refresh*    /home/src/workspaces/project/c.ts
*refresh*    /home/src/workspaces/project/a.ts
Signatures::
(used version)   /home/src/workspaces/project/b.d.ts
(computed .d.ts) /home/src/workspaces/project/c.ts
(used version)   /home/src/workspaces/project/a.ts


Edit [3]:: something else changes in b.d.ts again
//// [/home/src/workspaces/project/b.d.ts] *modified* 
export const enum A {
    ONE = 3
}export const randomThing = 10;export const randomThing2 = 10;

tsgo -i a.ts --tsbuildinfofile a.tsbuildinfo
ExitStatus:: Success
Output::
//// [/home/src/workspaces/project/a.js] *rewrite with same content*
//// [/home/src/workspaces/project/a.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[4],"fileNames":["lib.d.ts","./b.d.ts","./c.ts","./a.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},"ee6472d5ac80e48bb4cea44493dd5fe8-export const enum A {\n    ONE = 3\n}export const randomThing = 10;export const randomThing2 = 10;",{"version":"27be335cb83f09e0543d1a6458f51e79-import {A} from \"./b\"\nlet b = A.ONE\nexport {A}","signature":"f6d90ac6a94594899853de488fc81940-import { A } from \"./b\";\nexport { A };\n","impliedNodeFormat":1},"f69fa3d8747995fb7603cfd9c694aa6b-import {A} from \"./c\"\nlet a = A.ONE"],"fileIdsList":[[3],[2]],"options":{"tsBuildInfoFile":"./a.tsbuildinfo"},"referencedMap":[[4,1],[3,2]]}
//// [/home/src/workspaces/project/a.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./a.ts"
      ],
      "original": 4
    }
  ],
  "fileNames": [
    "lib.d.ts",
    "./b.d.ts",
    "./c.ts",
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
      "fileName": "./b.d.ts",
      "version": "ee6472d5ac80e48bb4cea44493dd5fe8-export const enum A {\n    ONE = 3\n}export const randomThing = 10;export const randomThing2 = 10;",
      "signature": "ee6472d5ac80e48bb4cea44493dd5fe8-export const enum A {\n    ONE = 3\n}export const randomThing = 10;export const randomThing2 = 10;",
      "impliedNodeFormat": "CommonJS"
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
      "fileName": "./a.ts",
      "version": "f69fa3d8747995fb7603cfd9c694aa6b-import {A} from \"./c\"\nlet a = A.ONE",
      "signature": "f69fa3d8747995fb7603cfd9c694aa6b-import {A} from \"./c\"\nlet a = A.ONE",
      "impliedNodeFormat": "CommonJS"
    }
  ],
  "fileIdsList": [
    [
      "./c.ts"
    ],
    [
      "./b.d.ts"
    ]
  ],
  "options": {
    "tsBuildInfoFile": "./a.tsbuildinfo"
  },
  "referencedMap": {
    "./a.ts": [
      "./c.ts"
    ],
    "./c.ts": [
      "./b.d.ts"
    ]
  },
  "size": 1397
}
//// [/home/src/workspaces/project/c.js] *rewrite with same content*

SemanticDiagnostics::
*refresh*    /home/src/workspaces/project/b.d.ts
*refresh*    /home/src/workspaces/project/c.ts
*refresh*    /home/src/workspaces/project/a.ts
Signatures::
(used version)   /home/src/workspaces/project/b.d.ts
(computed .d.ts) /home/src/workspaces/project/c.ts
(used version)   /home/src/workspaces/project/a.ts
