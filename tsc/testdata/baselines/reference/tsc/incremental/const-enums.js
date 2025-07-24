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
let a = c_1.A.ONE;

//// [/home/src/workspaces/project/a.tsbuildinfo] *new* 
{"version":"FakeTSVersion","fileNames":["../../tslibs/TS/Lib/lib.d.ts","./b.d.ts","./c.ts","./a.ts"],"fileInfos":[{"version":"eae9e83ef0f77eeb2e35dc9b91facce1-/// \u003creference no-default-lib=\"true\"/\u003e\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array\u003cT\u003e { length: number; [n: number]: T; }\ninterface ReadonlyArray\u003cT\u003e {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},"384e3f1bddf1dab879ea54729579f69c-export const enum A {\n    ONE = 1\n}","9009f336e8ed72592885099218551552-import {A} from \"./b\"\nlet b = A.ONE\nexport {A}","17d4d403e8dc89869758bdec331d42ab-import {A} from \"./c\"\nlet a = A.ONE"],"fileIdsList":[[3],[2]],"options":{"tsBuildInfoFile":"./a.tsbuildinfo"},"referencedMap":[[4,1],[3,2]]}
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
      "version": "384e3f1bddf1dab879ea54729579f69c-export const enum A {\n    ONE = 1\n}",
      "signature": "384e3f1bddf1dab879ea54729579f69c-export const enum A {\n    ONE = 1\n}",
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
  "size": 1250
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
export const enum A {
    ONE = 2
}

tsgo -i a.ts --tsbuildinfofile a.tsbuildinfo
ExitStatus:: Success
Output::
//// [/home/src/workspaces/project/a.js] *rewrite with same content*
//// [/home/src/workspaces/project/a.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","fileNames":["../../tslibs/TS/Lib/lib.d.ts","./b.d.ts","./c.ts","./a.ts"],"fileInfos":[{"version":"eae9e83ef0f77eeb2e35dc9b91facce1-/// \u003creference no-default-lib=\"true\"/\u003e\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array\u003cT\u003e { length: number; [n: number]: T; }\ninterface ReadonlyArray\u003cT\u003e {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},"384e317c16f1dab879ea54728fe3ec51-export const enum A {\n    ONE = 2\n}",{"version":"9009f336e8ed72592885099218551552-import {A} from \"./b\"\nlet b = A.ONE\nexport {A}","signature":"d6ab1b9a17fa3bd846de1c1fcc6861d1-import { A } from \"./b\";\nexport { A };\n","impliedNodeFormat":1},{"version":"17d4d403e8dc89869758bdec331d42ab-import {A} from \"./c\"\nlet a = A.ONE","signature":"04e66752f096b7e8df60e5900b0692bc-export {};\n","impliedNodeFormat":1}],"fileIdsList":[[3],[2]],"options":{"tsBuildInfoFile":"./a.tsbuildinfo"},"referencedMap":[[4,1],[3,2]]}
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
      "version": "384e317c16f1dab879ea54728fe3ec51-export const enum A {\n    ONE = 2\n}",
      "signature": "384e317c16f1dab879ea54728fe3ec51-export const enum A {\n    ONE = 2\n}",
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
  "size": 1469
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
export const enum A {
    ONE = 3
}

tsgo -i a.ts --tsbuildinfofile a.tsbuildinfo
ExitStatus:: Success
Output::
//// [/home/src/workspaces/project/a.js] *rewrite with same content*
//// [/home/src/workspaces/project/a.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","fileNames":["../../tslibs/TS/Lib/lib.d.ts","./b.d.ts","./c.ts","./a.ts"],"fileInfos":[{"version":"eae9e83ef0f77eeb2e35dc9b91facce1-/// \u003creference no-default-lib=\"true\"/\u003e\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array\u003cT\u003e { length: number; [n: number]: T; }\ninterface ReadonlyArray\u003cT\u003e {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},"384e35d5aff1dab879ea547291a29902-export const enum A {\n    ONE = 3\n}",{"version":"9009f336e8ed72592885099218551552-import {A} from \"./b\"\nlet b = A.ONE\nexport {A}","signature":"d6ab1b9a17fa3bd846de1c1fcc6861d1-import { A } from \"./b\";\nexport { A };\n","impliedNodeFormat":1},"17d4d403e8dc89869758bdec331d42ab-import {A} from \"./c\"\nlet a = A.ONE"],"fileIdsList":[[3],[2]],"options":{"tsBuildInfoFile":"./a.tsbuildinfo"},"referencedMap":[[4,1],[3,2]]}
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
      "version": "384e35d5aff1dab879ea547291a29902-export const enum A {\n    ONE = 3\n}",
      "signature": "384e35d5aff1dab879ea547291a29902-export const enum A {\n    ONE = 3\n}",
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
  "size": 1375
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
export const enum A {
    ONE = 3
}export const randomThing = 10;

tsgo -i a.ts --tsbuildinfofile a.tsbuildinfo
ExitStatus:: Success
Output::
//// [/home/src/workspaces/project/a.js] *rewrite with same content*
//// [/home/src/workspaces/project/a.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","fileNames":["../../tslibs/TS/Lib/lib.d.ts","./b.d.ts","./c.ts","./a.ts"],"fileInfos":[{"version":"eae9e83ef0f77eeb2e35dc9b91facce1-/// \u003creference no-default-lib=\"true\"/\u003e\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array\u003cT\u003e { length: number; [n: number]: T; }\ninterface ReadonlyArray\u003cT\u003e {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},"81a82ccb95dc84e67e85da519039f7c7-export const enum A {\n    ONE = 3\n}export const randomThing = 10;",{"version":"9009f336e8ed72592885099218551552-import {A} from \"./b\"\nlet b = A.ONE\nexport {A}","signature":"d6ab1b9a17fa3bd846de1c1fcc6861d1-import { A } from \"./b\";\nexport { A };\n","impliedNodeFormat":1},"17d4d403e8dc89869758bdec331d42ab-import {A} from \"./c\"\nlet a = A.ONE"],"fileIdsList":[[3],[2]],"options":{"tsBuildInfoFile":"./a.tsbuildinfo"},"referencedMap":[[4,1],[3,2]]}
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
      "version": "81a82ccb95dc84e67e85da519039f7c7-export const enum A {\n    ONE = 3\n}export const randomThing = 10;",
      "signature": "81a82ccb95dc84e67e85da519039f7c7-export const enum A {\n    ONE = 3\n}export const randomThing = 10;",
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
  "size": 1405
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
{"version":"FakeTSVersion","fileNames":["../../tslibs/TS/Lib/lib.d.ts","./b.d.ts","./c.ts","./a.ts"],"fileInfos":[{"version":"eae9e83ef0f77eeb2e35dc9b91facce1-/// \u003creference no-default-lib=\"true\"/\u003e\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array\u003cT\u003e { length: number; [n: number]: T; }\ninterface ReadonlyArray\u003cT\u003e {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},"93dfd7dc48a64f3d635a4e86aea98c2a-export const enum A {\n    ONE = 3\n}export const randomThing = 10;export const randomThing2 = 10;",{"version":"9009f336e8ed72592885099218551552-import {A} from \"./b\"\nlet b = A.ONE\nexport {A}","signature":"d6ab1b9a17fa3bd846de1c1fcc6861d1-import { A } from \"./b\";\nexport { A };\n","impliedNodeFormat":1},"17d4d403e8dc89869758bdec331d42ab-import {A} from \"./c\"\nlet a = A.ONE"],"fileIdsList":[[3],[2]],"options":{"tsBuildInfoFile":"./a.tsbuildinfo"},"referencedMap":[[4,1],[3,2]]}
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
      "version": "93dfd7dc48a64f3d635a4e86aea98c2a-export const enum A {\n    ONE = 3\n}export const randomThing = 10;export const randomThing2 = 10;",
      "signature": "93dfd7dc48a64f3d635a4e86aea98c2a-export const enum A {\n    ONE = 3\n}export const randomThing = 10;export const randomThing2 = 10;",
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
  "size": 1436
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
