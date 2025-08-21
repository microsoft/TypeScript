currentDirectory::/home/src/workspaces/project
useCaseSensitiveFileNames::true
Input::
//// [/home/src/workspaces/project/a.ts] *new* 
import {A} from "./c"
let a = A.ONE
//// [/home/src/workspaces/project/b.d.ts] *new* 
export { AWorker as A } from "./worker";
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
{"version":"FakeTSVersion","root":[5],"fileNames":["lib.d.ts","./worker.d.ts","./b.d.ts","./c.ts","./a.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},"8a851657dbab1650611535d934e0e8a0-export const enum AWorker {\n    ONE = 1\n}","e1ab01aa60a97dafcae2e9a0fe6467c6-export { AWorker as A } from \"./worker\";","27be335cb83f09e0543d1a6458f51e79-import {A} from \"./b\"\nlet b = A.ONE\nexport {A}","f69fa3d8747995fb7603cfd9c694aa6b-import {A} from \"./c\"\nlet a = A.ONE"],"fileIdsList":[[4],[2],[3]],"options":{"tsBuildInfoFile":"./a.tsbuildinfo"},"referencedMap":[[5,1],[3,2],[4,3]]}
//// [/home/src/workspaces/project/a.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./a.ts"
      ],
      "original": 5
    }
  ],
  "fileNames": [
    "lib.d.ts",
    "./worker.d.ts",
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
      "fileName": "./worker.d.ts",
      "version": "8a851657dbab1650611535d934e0e8a0-export const enum AWorker {\n    ONE = 1\n}",
      "signature": "8a851657dbab1650611535d934e0e8a0-export const enum AWorker {\n    ONE = 1\n}",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "./b.d.ts",
      "version": "e1ab01aa60a97dafcae2e9a0fe6467c6-export { AWorker as A } from \"./worker\";",
      "signature": "e1ab01aa60a97dafcae2e9a0fe6467c6-export { AWorker as A } from \"./worker\";",
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
      "./worker.d.ts"
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
    "./b.d.ts": [
      "./worker.d.ts"
    ],
    "./c.ts": [
      "./b.d.ts"
    ]
  },
  "size": 1321
}
//// [/home/src/workspaces/project/c.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let b = 1 /* A.ONE */;


SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.d.ts
*refresh*    /home/src/workspaces/project/worker.d.ts
*refresh*    /home/src/workspaces/project/b.d.ts
*refresh*    /home/src/workspaces/project/c.ts
*refresh*    /home/src/workspaces/project/a.ts
Signatures::


Edit [0]:: change enum value
//// [/home/src/workspaces/project/worker.d.ts] *modified* 
export const enum AWorker {
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
{"version":"FakeTSVersion","root":[5],"fileNames":["lib.d.ts","./worker.d.ts","./b.d.ts","./c.ts","./a.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},"85732ecf91c49f8d8fff8ae96e3c1c8b-export const enum AWorker {\n    ONE = 2\n}","e1ab01aa60a97dafcae2e9a0fe6467c6-export { AWorker as A } from \"./worker\";","27be335cb83f09e0543d1a6458f51e79-import {A} from \"./b\"\nlet b = A.ONE\nexport {A}","f69fa3d8747995fb7603cfd9c694aa6b-import {A} from \"./c\"\nlet a = A.ONE"],"fileIdsList":[[4],[2],[3]],"options":{"tsBuildInfoFile":"./a.tsbuildinfo"},"referencedMap":[[5,1],[3,2],[4,3]]}
//// [/home/src/workspaces/project/a.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./a.ts"
      ],
      "original": 5
    }
  ],
  "fileNames": [
    "lib.d.ts",
    "./worker.d.ts",
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
      "fileName": "./worker.d.ts",
      "version": "85732ecf91c49f8d8fff8ae96e3c1c8b-export const enum AWorker {\n    ONE = 2\n}",
      "signature": "85732ecf91c49f8d8fff8ae96e3c1c8b-export const enum AWorker {\n    ONE = 2\n}",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "./b.d.ts",
      "version": "e1ab01aa60a97dafcae2e9a0fe6467c6-export { AWorker as A } from \"./worker\";",
      "signature": "e1ab01aa60a97dafcae2e9a0fe6467c6-export { AWorker as A } from \"./worker\";",
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
      "./worker.d.ts"
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
    "./b.d.ts": [
      "./worker.d.ts"
    ],
    "./c.ts": [
      "./b.d.ts"
    ]
  },
  "size": 1321
}
//// [/home/src/workspaces/project/c.js] *modified* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let b = 2 /* A.ONE */;


SemanticDiagnostics::
*refresh*    /home/src/workspaces/project/worker.d.ts
*refresh*    /home/src/workspaces/project/b.d.ts
*refresh*    /home/src/workspaces/project/c.ts
*refresh*    /home/src/workspaces/project/a.ts
Signatures::
(used version)   /home/src/workspaces/project/worker.d.ts
(used version)   /home/src/workspaces/project/b.d.ts
(used version)   /home/src/workspaces/project/c.ts
(used version)   /home/src/workspaces/project/a.ts


Edit [1]:: change enum value again
//// [/home/src/workspaces/project/worker.d.ts] *modified* 
export const enum AWorker {
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
{"version":"FakeTSVersion","root":[5],"fileNames":["lib.d.ts","./worker.d.ts","./b.d.ts","./c.ts","./a.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},"c1b69d4c011b97277dab4f0539048ca5-export const enum AWorker {\n    ONE = 3\n}","e1ab01aa60a97dafcae2e9a0fe6467c6-export { AWorker as A } from \"./worker\";","27be335cb83f09e0543d1a6458f51e79-import {A} from \"./b\"\nlet b = A.ONE\nexport {A}","f69fa3d8747995fb7603cfd9c694aa6b-import {A} from \"./c\"\nlet a = A.ONE"],"fileIdsList":[[4],[2],[3]],"options":{"tsBuildInfoFile":"./a.tsbuildinfo"},"referencedMap":[[5,1],[3,2],[4,3]]}
//// [/home/src/workspaces/project/a.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./a.ts"
      ],
      "original": 5
    }
  ],
  "fileNames": [
    "lib.d.ts",
    "./worker.d.ts",
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
      "fileName": "./worker.d.ts",
      "version": "c1b69d4c011b97277dab4f0539048ca5-export const enum AWorker {\n    ONE = 3\n}",
      "signature": "c1b69d4c011b97277dab4f0539048ca5-export const enum AWorker {\n    ONE = 3\n}",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "./b.d.ts",
      "version": "e1ab01aa60a97dafcae2e9a0fe6467c6-export { AWorker as A } from \"./worker\";",
      "signature": "e1ab01aa60a97dafcae2e9a0fe6467c6-export { AWorker as A } from \"./worker\";",
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
      "./worker.d.ts"
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
    "./b.d.ts": [
      "./worker.d.ts"
    ],
    "./c.ts": [
      "./b.d.ts"
    ]
  },
  "size": 1321
}
//// [/home/src/workspaces/project/c.js] *modified* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let b = 3 /* A.ONE */;


SemanticDiagnostics::
*refresh*    /home/src/workspaces/project/worker.d.ts
*refresh*    /home/src/workspaces/project/b.d.ts
*refresh*    /home/src/workspaces/project/c.ts
*refresh*    /home/src/workspaces/project/a.ts
Signatures::
(used version)   /home/src/workspaces/project/worker.d.ts
(used version)   /home/src/workspaces/project/b.d.ts
(used version)   /home/src/workspaces/project/c.ts
(used version)   /home/src/workspaces/project/a.ts


Edit [2]:: something else changes in b.d.ts
//// [/home/src/workspaces/project/b.d.ts] *modified* 
export { AWorker as A } from "./worker";export const randomThing = 10;

tsgo -i a.ts --tsbuildinfofile a.tsbuildinfo
ExitStatus:: Success
Output::
//// [/home/src/workspaces/project/a.js] *rewrite with same content*
//// [/home/src/workspaces/project/a.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[5],"fileNames":["lib.d.ts","./worker.d.ts","./b.d.ts","./c.ts","./a.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},"c1b69d4c011b97277dab4f0539048ca5-export const enum AWorker {\n    ONE = 3\n}","7e628d40719306e63d220f210cef8697-export { AWorker as A } from \"./worker\";export const randomThing = 10;",{"version":"27be335cb83f09e0543d1a6458f51e79-import {A} from \"./b\"\nlet b = A.ONE\nexport {A}","signature":"f6d90ac6a94594899853de488fc81940-import { A } from \"./b\";\nexport { A };\n","impliedNodeFormat":1},{"version":"f69fa3d8747995fb7603cfd9c694aa6b-import {A} from \"./c\"\nlet a = A.ONE","signature":"abe7d9981d6018efb6b2b794f40a1607-export {};\n","impliedNodeFormat":1}],"fileIdsList":[[4],[2],[3]],"options":{"tsBuildInfoFile":"./a.tsbuildinfo"},"referencedMap":[[5,1],[3,2],[4,3]]}
//// [/home/src/workspaces/project/a.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./a.ts"
      ],
      "original": 5
    }
  ],
  "fileNames": [
    "lib.d.ts",
    "./worker.d.ts",
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
      "fileName": "./worker.d.ts",
      "version": "c1b69d4c011b97277dab4f0539048ca5-export const enum AWorker {\n    ONE = 3\n}",
      "signature": "c1b69d4c011b97277dab4f0539048ca5-export const enum AWorker {\n    ONE = 3\n}",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "./b.d.ts",
      "version": "7e628d40719306e63d220f210cef8697-export { AWorker as A } from \"./worker\";export const randomThing = 10;",
      "signature": "7e628d40719306e63d220f210cef8697-export { AWorker as A } from \"./worker\";export const randomThing = 10;",
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
      "./worker.d.ts"
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
    "./b.d.ts": [
      "./worker.d.ts"
    ],
    "./c.ts": [
      "./b.d.ts"
    ]
  },
  "size": 1570
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


Edit [3]:: something else changes in b.d.ts again
//// [/home/src/workspaces/project/b.d.ts] *modified* 
export { AWorker as A } from "./worker";export const randomThing = 10;export const randomThing2 = 10;

tsgo -i a.ts --tsbuildinfofile a.tsbuildinfo
ExitStatus:: Success
Output::
//// [/home/src/workspaces/project/a.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[5],"fileNames":["lib.d.ts","./worker.d.ts","./b.d.ts","./c.ts","./a.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},"c1b69d4c011b97277dab4f0539048ca5-export const enum AWorker {\n    ONE = 3\n}","85de628566e341d0050fe40f7319973e-export { AWorker as A } from \"./worker\";export const randomThing = 10;export const randomThing2 = 10;",{"version":"27be335cb83f09e0543d1a6458f51e79-import {A} from \"./b\"\nlet b = A.ONE\nexport {A}","signature":"f6d90ac6a94594899853de488fc81940-import { A } from \"./b\";\nexport { A };\n","impliedNodeFormat":1},"f69fa3d8747995fb7603cfd9c694aa6b-import {A} from \"./c\"\nlet a = A.ONE"],"fileIdsList":[[4],[2],[3]],"options":{"tsBuildInfoFile":"./a.tsbuildinfo"},"referencedMap":[[5,1],[3,2],[4,3]]}
//// [/home/src/workspaces/project/a.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./a.ts"
      ],
      "original": 5
    }
  ],
  "fileNames": [
    "lib.d.ts",
    "./worker.d.ts",
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
      "fileName": "./worker.d.ts",
      "version": "c1b69d4c011b97277dab4f0539048ca5-export const enum AWorker {\n    ONE = 3\n}",
      "signature": "c1b69d4c011b97277dab4f0539048ca5-export const enum AWorker {\n    ONE = 3\n}",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "./b.d.ts",
      "version": "85de628566e341d0050fe40f7319973e-export { AWorker as A } from \"./worker\";export const randomThing = 10;export const randomThing2 = 10;",
      "signature": "85de628566e341d0050fe40f7319973e-export { AWorker as A } from \"./worker\";export const randomThing = 10;export const randomThing2 = 10;",
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
      "./worker.d.ts"
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
    "./b.d.ts": [
      "./worker.d.ts"
    ],
    "./c.ts": [
      "./b.d.ts"
    ]
  },
  "size": 1507
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
