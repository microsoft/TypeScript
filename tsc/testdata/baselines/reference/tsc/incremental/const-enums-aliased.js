currentDirectory::/home/src/workspaces/project
useCaseSensitiveFileNames::true
Input::
//// [/home/src/workspaces/project/a.ts] *new* 
import {A} from "./c"
let a = A.ONE
//// [/home/src/workspaces/project/b.d.ts] *new* 
export const enum AWorker {
    ONE = 1
}
export { AWorker as A };
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
let a = c_1.A.ONE;

//// [/home/src/workspaces/project/a.tsbuildinfo] *new* 
{"version":"FakeTSVersion","fileNames":["../../tslibs/TS/Lib/lib.d.ts","./b.d.ts","./c.ts","./a.ts"],"fileInfos":[{"version":"eae9e83ef0f77eeb2e35dc9b91facce1-/// \u003creference no-default-lib=\"true\"/\u003e\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array\u003cT\u003e { length: number; [n: number]: T; }\ninterface ReadonlyArray\u003cT\u003e {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},"23dab841f7623d382f0da49b63459c0b-export const enum AWorker {\n    ONE = 1\n}\nexport { AWorker as A };","9009f336e8ed72592885099218551552-import {A} from \"./b\"\nlet b = A.ONE\nexport {A}","17d4d403e8dc89869758bdec331d42ab-import {A} from \"./c\"\nlet a = A.ONE"],"fileIdsList":[[3],[2]],"options":{"tsBuildInfoFile":"./a.tsbuildinfo"},"referencedMap":[[4,1],[3,2]]}
//// [/home/src/workspaces/project/a.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "fileNames": [
    "../../tslibs/TS/Lib/lib.d.ts",
    "./b.d.ts",
    "./c.ts",
    "./a.ts"
  ],
  "fileInfos": [
    {
      "fileName": "../../tslibs/TS/Lib/lib.d.ts",
      "version": "eae9e83ef0f77eeb2e35dc9b91facce1-/// \u003creference no-default-lib=\"true\"/\u003e\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array\u003cT\u003e { length: number; [n: number]: T; }\ninterface ReadonlyArray\u003cT\u003e {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };",
      "signature": "eae9e83ef0f77eeb2e35dc9b91facce1-/// \u003creference no-default-lib=\"true\"/\u003e\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array\u003cT\u003e { length: number; [n: number]: T; }\ninterface ReadonlyArray\u003cT\u003e {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "eae9e83ef0f77eeb2e35dc9b91facce1-/// \u003creference no-default-lib=\"true\"/\u003e\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array\u003cT\u003e { length: number; [n: number]: T; }\ninterface ReadonlyArray\u003cT\u003e {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./b.d.ts",
      "version": "23dab841f7623d382f0da49b63459c0b-export const enum AWorker {\n    ONE = 1\n}\nexport { AWorker as A };",
      "signature": "23dab841f7623d382f0da49b63459c0b-export const enum AWorker {\n    ONE = 1\n}\nexport { AWorker as A };",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "./c.ts",
      "version": "9009f336e8ed72592885099218551552-import {A} from \"./b\"\nlet b = A.ONE\nexport {A}",
      "signature": "9009f336e8ed72592885099218551552-import {A} from \"./b\"\nlet b = A.ONE\nexport {A}",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "./a.ts",
      "version": "17d4d403e8dc89869758bdec331d42ab-import {A} from \"./c\"\nlet a = A.ONE",
      "signature": "17d4d403e8dc89869758bdec331d42ab-import {A} from \"./c\"\nlet a = A.ONE",
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
  "size": 1282
}
//// [/home/src/workspaces/project/c.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let b = b_1.A.ONE;


SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.d.ts
*refresh*    /home/src/workspaces/project/b.d.ts
*refresh*    /home/src/workspaces/project/c.ts
*refresh*    /home/src/workspaces/project/a.ts
Signatures::


Edit [0]:: change enum value
//// [/home/src/workspaces/project/b.d.ts] *modified* 
export const enum AWorker {
    ONE = 2
}
export { AWorker as A };

tsgo -i a.ts --tsbuildinfofile a.tsbuildinfo
ExitStatus:: Success
Output::
//// [/home/src/workspaces/project/a.js] *rewrite with same content*
//// [/home/src/workspaces/project/a.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","fileNames":["../../tslibs/TS/Lib/lib.d.ts","./b.d.ts","./c.ts","./a.ts"],"fileInfos":[{"version":"eae9e83ef0f77eeb2e35dc9b91facce1-/// \u003creference no-default-lib=\"true\"/\u003e\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array\u003cT\u003e { length: number; [n: number]: T; }\ninterface ReadonlyArray\u003cT\u003e {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},"e14f164fda43a07f2ea9160c5fb4b028-export const enum AWorker {\n    ONE = 2\n}\nexport { AWorker as A };",{"version":"9009f336e8ed72592885099218551552-import {A} from \"./b\"\nlet b = A.ONE\nexport {A}","signature":"d6ab1b9a17fa3bd846de1c1fcc6861d1-import { A } from \"./b\";\nexport { A };\n","impliedNodeFormat":1},{"version":"17d4d403e8dc89869758bdec331d42ab-import {A} from \"./c\"\nlet a = A.ONE","signature":"04e66752f096b7e8df60e5900b0692bc-export {};\n","impliedNodeFormat":1}],"fileIdsList":[[3],[2]],"options":{"tsBuildInfoFile":"./a.tsbuildinfo"},"referencedMap":[[4,1],[3,2]]}
//// [/home/src/workspaces/project/a.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "fileNames": [
    "../../tslibs/TS/Lib/lib.d.ts",
    "./b.d.ts",
    "./c.ts",
    "./a.ts"
  ],
  "fileInfos": [
    {
      "fileName": "../../tslibs/TS/Lib/lib.d.ts",
      "version": "eae9e83ef0f77eeb2e35dc9b91facce1-/// \u003creference no-default-lib=\"true\"/\u003e\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array\u003cT\u003e { length: number; [n: number]: T; }\ninterface ReadonlyArray\u003cT\u003e {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };",
      "signature": "eae9e83ef0f77eeb2e35dc9b91facce1-/// \u003creference no-default-lib=\"true\"/\u003e\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array\u003cT\u003e { length: number; [n: number]: T; }\ninterface ReadonlyArray\u003cT\u003e {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "eae9e83ef0f77eeb2e35dc9b91facce1-/// \u003creference no-default-lib=\"true\"/\u003e\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array\u003cT\u003e { length: number; [n: number]: T; }\ninterface ReadonlyArray\u003cT\u003e {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./b.d.ts",
      "version": "e14f164fda43a07f2ea9160c5fb4b028-export const enum AWorker {\n    ONE = 2\n}\nexport { AWorker as A };",
      "signature": "e14f164fda43a07f2ea9160c5fb4b028-export const enum AWorker {\n    ONE = 2\n}\nexport { AWorker as A };",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "./c.ts",
      "version": "9009f336e8ed72592885099218551552-import {A} from \"./b\"\nlet b = A.ONE\nexport {A}",
      "signature": "d6ab1b9a17fa3bd846de1c1fcc6861d1-import { A } from \"./b\";\nexport { A };\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "9009f336e8ed72592885099218551552-import {A} from \"./b\"\nlet b = A.ONE\nexport {A}",
        "signature": "d6ab1b9a17fa3bd846de1c1fcc6861d1-import { A } from \"./b\";\nexport { A };\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./a.ts",
      "version": "17d4d403e8dc89869758bdec331d42ab-import {A} from \"./c\"\nlet a = A.ONE",
      "signature": "04e66752f096b7e8df60e5900b0692bc-export {};\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "17d4d403e8dc89869758bdec331d42ab-import {A} from \"./c\"\nlet a = A.ONE",
        "signature": "04e66752f096b7e8df60e5900b0692bc-export {};\n",
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
  "size": 1501
}
//// [/home/src/workspaces/project/c.js] *rewrite with same content*

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
export const enum AWorker {
    ONE = 3
}
export { AWorker as A };

tsgo -i a.ts --tsbuildinfofile a.tsbuildinfo
ExitStatus:: Success
Output::
//// [/home/src/workspaces/project/a.js] *rewrite with same content*
//// [/home/src/workspaces/project/a.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","fileNames":["../../tslibs/TS/Lib/lib.d.ts","./b.d.ts","./c.ts","./a.ts"],"fileInfos":[{"version":"eae9e83ef0f77eeb2e35dc9b91facce1-/// \u003creference no-default-lib=\"true\"/\u003e\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array\u003cT\u003e { length: number; [n: number]: T; }\ninterface ReadonlyArray\u003cT\u003e {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},"7813c68ad525769c183dec4d947ea015-export const enum AWorker {\n    ONE = 3\n}\nexport { AWorker as A };",{"version":"9009f336e8ed72592885099218551552-import {A} from \"./b\"\nlet b = A.ONE\nexport {A}","signature":"d6ab1b9a17fa3bd846de1c1fcc6861d1-import { A } from \"./b\";\nexport { A };\n","impliedNodeFormat":1},"17d4d403e8dc89869758bdec331d42ab-import {A} from \"./c\"\nlet a = A.ONE"],"fileIdsList":[[3],[2]],"options":{"tsBuildInfoFile":"./a.tsbuildinfo"},"referencedMap":[[4,1],[3,2]]}
//// [/home/src/workspaces/project/a.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "fileNames": [
    "../../tslibs/TS/Lib/lib.d.ts",
    "./b.d.ts",
    "./c.ts",
    "./a.ts"
  ],
  "fileInfos": [
    {
      "fileName": "../../tslibs/TS/Lib/lib.d.ts",
      "version": "eae9e83ef0f77eeb2e35dc9b91facce1-/// \u003creference no-default-lib=\"true\"/\u003e\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array\u003cT\u003e { length: number; [n: number]: T; }\ninterface ReadonlyArray\u003cT\u003e {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };",
      "signature": "eae9e83ef0f77eeb2e35dc9b91facce1-/// \u003creference no-default-lib=\"true\"/\u003e\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array\u003cT\u003e { length: number; [n: number]: T; }\ninterface ReadonlyArray\u003cT\u003e {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "eae9e83ef0f77eeb2e35dc9b91facce1-/// \u003creference no-default-lib=\"true\"/\u003e\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array\u003cT\u003e { length: number; [n: number]: T; }\ninterface ReadonlyArray\u003cT\u003e {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./b.d.ts",
      "version": "7813c68ad525769c183dec4d947ea015-export const enum AWorker {\n    ONE = 3\n}\nexport { AWorker as A };",
      "signature": "7813c68ad525769c183dec4d947ea015-export const enum AWorker {\n    ONE = 3\n}\nexport { AWorker as A };",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "./c.ts",
      "version": "9009f336e8ed72592885099218551552-import {A} from \"./b\"\nlet b = A.ONE\nexport {A}",
      "signature": "d6ab1b9a17fa3bd846de1c1fcc6861d1-import { A } from \"./b\";\nexport { A };\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "9009f336e8ed72592885099218551552-import {A} from \"./b\"\nlet b = A.ONE\nexport {A}",
        "signature": "d6ab1b9a17fa3bd846de1c1fcc6861d1-import { A } from \"./b\";\nexport { A };\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./a.ts",
      "version": "17d4d403e8dc89869758bdec331d42ab-import {A} from \"./c\"\nlet a = A.ONE",
      "signature": "17d4d403e8dc89869758bdec331d42ab-import {A} from \"./c\"\nlet a = A.ONE",
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
  "size": 1407
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


Edit [2]:: something else changes in b.d.ts
//// [/home/src/workspaces/project/b.d.ts] *modified* 
export const enum AWorker {
    ONE = 3
}
export { AWorker as A };export const randomThing = 10;

tsgo -i a.ts --tsbuildinfofile a.tsbuildinfo
ExitStatus:: Success
Output::
//// [/home/src/workspaces/project/a.js] *rewrite with same content*
//// [/home/src/workspaces/project/a.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","fileNames":["../../tslibs/TS/Lib/lib.d.ts","./b.d.ts","./c.ts","./a.ts"],"fileInfos":[{"version":"eae9e83ef0f77eeb2e35dc9b91facce1-/// \u003creference no-default-lib=\"true\"/\u003e\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array\u003cT\u003e { length: number; [n: number]: T; }\ninterface ReadonlyArray\u003cT\u003e {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},"ba33f0bf13326748455285120fd26538-export const enum AWorker {\n    ONE = 3\n}\nexport { AWorker as A };export const randomThing = 10;",{"version":"9009f336e8ed72592885099218551552-import {A} from \"./b\"\nlet b = A.ONE\nexport {A}","signature":"d6ab1b9a17fa3bd846de1c1fcc6861d1-import { A } from \"./b\";\nexport { A };\n","impliedNodeFormat":1},"17d4d403e8dc89869758bdec331d42ab-import {A} from \"./c\"\nlet a = A.ONE"],"fileIdsList":[[3],[2]],"options":{"tsBuildInfoFile":"./a.tsbuildinfo"},"referencedMap":[[4,1],[3,2]]}
//// [/home/src/workspaces/project/a.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "fileNames": [
    "../../tslibs/TS/Lib/lib.d.ts",
    "./b.d.ts",
    "./c.ts",
    "./a.ts"
  ],
  "fileInfos": [
    {
      "fileName": "../../tslibs/TS/Lib/lib.d.ts",
      "version": "eae9e83ef0f77eeb2e35dc9b91facce1-/// \u003creference no-default-lib=\"true\"/\u003e\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array\u003cT\u003e { length: number; [n: number]: T; }\ninterface ReadonlyArray\u003cT\u003e {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };",
      "signature": "eae9e83ef0f77eeb2e35dc9b91facce1-/// \u003creference no-default-lib=\"true\"/\u003e\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array\u003cT\u003e { length: number; [n: number]: T; }\ninterface ReadonlyArray\u003cT\u003e {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "eae9e83ef0f77eeb2e35dc9b91facce1-/// \u003creference no-default-lib=\"true\"/\u003e\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array\u003cT\u003e { length: number; [n: number]: T; }\ninterface ReadonlyArray\u003cT\u003e {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./b.d.ts",
      "version": "ba33f0bf13326748455285120fd26538-export const enum AWorker {\n    ONE = 3\n}\nexport { AWorker as A };export const randomThing = 10;",
      "signature": "ba33f0bf13326748455285120fd26538-export const enum AWorker {\n    ONE = 3\n}\nexport { AWorker as A };export const randomThing = 10;",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "./c.ts",
      "version": "9009f336e8ed72592885099218551552-import {A} from \"./b\"\nlet b = A.ONE\nexport {A}",
      "signature": "d6ab1b9a17fa3bd846de1c1fcc6861d1-import { A } from \"./b\";\nexport { A };\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "9009f336e8ed72592885099218551552-import {A} from \"./b\"\nlet b = A.ONE\nexport {A}",
        "signature": "d6ab1b9a17fa3bd846de1c1fcc6861d1-import { A } from \"./b\";\nexport { A };\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./a.ts",
      "version": "17d4d403e8dc89869758bdec331d42ab-import {A} from \"./c\"\nlet a = A.ONE",
      "signature": "17d4d403e8dc89869758bdec331d42ab-import {A} from \"./c\"\nlet a = A.ONE",
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
  "size": 1437
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
export const enum AWorker {
    ONE = 3
}
export { AWorker as A };export const randomThing = 10;export const randomThing2 = 10;

tsgo -i a.ts --tsbuildinfofile a.tsbuildinfo
ExitStatus:: Success
Output::
//// [/home/src/workspaces/project/a.js] *rewrite with same content*
//// [/home/src/workspaces/project/a.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","fileNames":["../../tslibs/TS/Lib/lib.d.ts","./b.d.ts","./c.ts","./a.ts"],"fileInfos":[{"version":"eae9e83ef0f77eeb2e35dc9b91facce1-/// \u003creference no-default-lib=\"true\"/\u003e\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array\u003cT\u003e { length: number; [n: number]: T; }\ninterface ReadonlyArray\u003cT\u003e {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},"592953da0dd36f33d9176dec9aaaa6c7-export const enum AWorker {\n    ONE = 3\n}\nexport { AWorker as A };export const randomThing = 10;export const randomThing2 = 10;",{"version":"9009f336e8ed72592885099218551552-import {A} from \"./b\"\nlet b = A.ONE\nexport {A}","signature":"d6ab1b9a17fa3bd846de1c1fcc6861d1-import { A } from \"./b\";\nexport { A };\n","impliedNodeFormat":1},"17d4d403e8dc89869758bdec331d42ab-import {A} from \"./c\"\nlet a = A.ONE"],"fileIdsList":[[3],[2]],"options":{"tsBuildInfoFile":"./a.tsbuildinfo"},"referencedMap":[[4,1],[3,2]]}
//// [/home/src/workspaces/project/a.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "fileNames": [
    "../../tslibs/TS/Lib/lib.d.ts",
    "./b.d.ts",
    "./c.ts",
    "./a.ts"
  ],
  "fileInfos": [
    {
      "fileName": "../../tslibs/TS/Lib/lib.d.ts",
      "version": "eae9e83ef0f77eeb2e35dc9b91facce1-/// \u003creference no-default-lib=\"true\"/\u003e\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array\u003cT\u003e { length: number; [n: number]: T; }\ninterface ReadonlyArray\u003cT\u003e {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };",
      "signature": "eae9e83ef0f77eeb2e35dc9b91facce1-/// \u003creference no-default-lib=\"true\"/\u003e\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array\u003cT\u003e { length: number; [n: number]: T; }\ninterface ReadonlyArray\u003cT\u003e {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "eae9e83ef0f77eeb2e35dc9b91facce1-/// \u003creference no-default-lib=\"true\"/\u003e\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array\u003cT\u003e { length: number; [n: number]: T; }\ninterface ReadonlyArray\u003cT\u003e {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./b.d.ts",
      "version": "592953da0dd36f33d9176dec9aaaa6c7-export const enum AWorker {\n    ONE = 3\n}\nexport { AWorker as A };export const randomThing = 10;export const randomThing2 = 10;",
      "signature": "592953da0dd36f33d9176dec9aaaa6c7-export const enum AWorker {\n    ONE = 3\n}\nexport { AWorker as A };export const randomThing = 10;export const randomThing2 = 10;",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "./c.ts",
      "version": "9009f336e8ed72592885099218551552-import {A} from \"./b\"\nlet b = A.ONE\nexport {A}",
      "signature": "d6ab1b9a17fa3bd846de1c1fcc6861d1-import { A } from \"./b\";\nexport { A };\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "9009f336e8ed72592885099218551552-import {A} from \"./b\"\nlet b = A.ONE\nexport {A}",
        "signature": "d6ab1b9a17fa3bd846de1c1fcc6861d1-import { A } from \"./b\";\nexport { A };\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./a.ts",
      "version": "17d4d403e8dc89869758bdec331d42ab-import {A} from \"./c\"\nlet a = A.ONE",
      "signature": "17d4d403e8dc89869758bdec331d42ab-import {A} from \"./c\"\nlet a = A.ONE",
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
  "size": 1468
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
