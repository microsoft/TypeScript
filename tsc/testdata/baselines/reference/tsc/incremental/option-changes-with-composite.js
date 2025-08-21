currentDirectory::/home/src/workspaces/project
useCaseSensitiveFileNames::true
Input::
//// [/home/src/workspaces/project/a.ts] *new* 
export const a = 10;const aLocal = 10;
//// [/home/src/workspaces/project/b.ts] *new* 
export const b = 10;const bLocal = 10;
//// [/home/src/workspaces/project/c.ts] *new* 
import { a } from "./a";export const c = a;
//// [/home/src/workspaces/project/d.ts] *new* 
import { b } from "./b";export const d = b;
//// [/home/src/workspaces/project/tsconfig.json] *new* 
{
    "compilerOptions": {
        "composite": true,
    }
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
//// [/home/src/workspaces/project/a.d.ts] *new* 
export declare const a = 10;

//// [/home/src/workspaces/project/a.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.a = void 0;
exports.a = 10;
const aLocal = 10;

//// [/home/src/workspaces/project/b.d.ts] *new* 
export declare const b = 10;

//// [/home/src/workspaces/project/b.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.b = void 0;
exports.b = 10;
const bLocal = 10;

//// [/home/src/workspaces/project/c.d.ts] *new* 
export declare const c = 10;

//// [/home/src/workspaces/project/c.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.c = void 0;
const a_1 = require("./a");
exports.c = a_1.a;

//// [/home/src/workspaces/project/d.d.ts] *new* 
export declare const d = 10;

//// [/home/src/workspaces/project/d.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.d = void 0;
const b_1 = require("./b");
exports.d = b_1.b;

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":[[2,5]],"fileNames":["lib.d.ts","./a.ts","./b.ts","./c.ts","./d.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"6f850043fadb2d6b35e16ae1adaad5a5-export const a = 10;const aLocal = 10;","signature":"5d46ba05302682a2bc47daa29368141f-export declare const a = 10;\n","impliedNodeFormat":1},{"version":"bf1b9c3562b043596607d537fbaf9814-export const b = 10;const bLocal = 10;","signature":"eaed5dafb4668e1b7c86b65b584b776a-export declare const b = 10;\n","impliedNodeFormat":1},{"version":"28822e22fad7308e03af07d91b210c8f-import { a } from \"./a\";export const c = a;","signature":"6bc89426f721fe78f6ac43d3e4d9058f-export declare const c = 10;\n","impliedNodeFormat":1},{"version":"b392c90ba2c0413defc12f6bbf323140-import { b } from \"./b\";export const d = b;","signature":"3624f737ffc30774e872b3f5a7340537-export declare const d = 10;\n","impliedNodeFormat":1}],"fileIdsList":[[2],[3]],"options":{"composite":true},"referencedMap":[[4,1],[5,2]],"latestChangedDtsFile":"./d.d.ts"}
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./a.ts",
        "./b.ts",
        "./c.ts",
        "./d.ts"
      ],
      "original": [
        2,
        5
      ]
    }
  ],
  "fileNames": [
    "lib.d.ts",
    "./a.ts",
    "./b.ts",
    "./c.ts",
    "./d.ts"
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
      "version": "6f850043fadb2d6b35e16ae1adaad5a5-export const a = 10;const aLocal = 10;",
      "signature": "5d46ba05302682a2bc47daa29368141f-export declare const a = 10;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "6f850043fadb2d6b35e16ae1adaad5a5-export const a = 10;const aLocal = 10;",
        "signature": "5d46ba05302682a2bc47daa29368141f-export declare const a = 10;\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./b.ts",
      "version": "bf1b9c3562b043596607d537fbaf9814-export const b = 10;const bLocal = 10;",
      "signature": "eaed5dafb4668e1b7c86b65b584b776a-export declare const b = 10;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "bf1b9c3562b043596607d537fbaf9814-export const b = 10;const bLocal = 10;",
        "signature": "eaed5dafb4668e1b7c86b65b584b776a-export declare const b = 10;\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./c.ts",
      "version": "28822e22fad7308e03af07d91b210c8f-import { a } from \"./a\";export const c = a;",
      "signature": "6bc89426f721fe78f6ac43d3e4d9058f-export declare const c = 10;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "28822e22fad7308e03af07d91b210c8f-import { a } from \"./a\";export const c = a;",
        "signature": "6bc89426f721fe78f6ac43d3e4d9058f-export declare const c = 10;\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./d.ts",
      "version": "b392c90ba2c0413defc12f6bbf323140-import { b } from \"./b\";export const d = b;",
      "signature": "3624f737ffc30774e872b3f5a7340537-export declare const d = 10;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "b392c90ba2c0413defc12f6bbf323140-import { b } from \"./b\";export const d = b;",
        "signature": "3624f737ffc30774e872b3f5a7340537-export declare const d = 10;\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "fileIdsList": [
    [
      "./a.ts"
    ],
    [
      "./b.ts"
    ]
  ],
  "options": {
    "composite": true
  },
  "referencedMap": {
    "./c.ts": [
      "./a.ts"
    ],
    "./d.ts": [
      "./b.ts"
    ]
  },
  "latestChangedDtsFile": "./d.d.ts",
  "size": 1762
}

tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.d.ts
*refresh*    /home/src/workspaces/project/a.ts
*refresh*    /home/src/workspaces/project/b.ts
*refresh*    /home/src/workspaces/project/c.ts
*refresh*    /home/src/workspaces/project/d.ts
Signatures::
(stored at emit) /home/src/workspaces/project/a.ts
(stored at emit) /home/src/workspaces/project/b.ts
(stored at emit) /home/src/workspaces/project/c.ts
(stored at emit) /home/src/workspaces/project/d.ts


Edit [0]:: with sourceMap

tsgo --sourceMap
ExitStatus:: Success
Output::
//// [/home/src/workspaces/project/a.js] *modified* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.a = void 0;
exports.a = 10;
const aLocal = 10;
//# sourceMappingURL=a.js.map
//// [/home/src/workspaces/project/a.js.map] *new* 
{"version":3,"file":"a.js","sourceRoot":"","sources":["a.ts"],"names":[],"mappings":";;;AAAa,QAAA,CAAC,GAAG,EAAE,CAAC;AAAA,MAAM,MAAM,GAAG,EAAE,CAAC"}
//// [/home/src/workspaces/project/b.js] *modified* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.b = void 0;
exports.b = 10;
const bLocal = 10;
//# sourceMappingURL=b.js.map
//// [/home/src/workspaces/project/b.js.map] *new* 
{"version":3,"file":"b.js","sourceRoot":"","sources":["b.ts"],"names":[],"mappings":";;;AAAa,QAAA,CAAC,GAAG,EAAE,CAAC;AAAA,MAAM,MAAM,GAAG,EAAE,CAAC"}
//// [/home/src/workspaces/project/c.js] *modified* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.c = void 0;
const a_1 = require("./a");
exports.c = a_1.a;
//# sourceMappingURL=c.js.map
//// [/home/src/workspaces/project/c.js.map] *new* 
{"version":3,"file":"c.js","sourceRoot":"","sources":["c.ts"],"names":[],"mappings":";;;AAAA,2BAAwB;AAAa,QAAA,CAAC,GAAG,KAAC,CAAC"}
//// [/home/src/workspaces/project/d.js] *modified* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.d = void 0;
const b_1 = require("./b");
exports.d = b_1.b;
//# sourceMappingURL=d.js.map
//// [/home/src/workspaces/project/d.js.map] *new* 
{"version":3,"file":"d.js","sourceRoot":"","sources":["d.ts"],"names":[],"mappings":";;;AAAA,2BAAwB;AAAa,QAAA,CAAC,GAAG,KAAC,CAAC"}
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[[2,5]],"fileNames":["lib.d.ts","./a.ts","./b.ts","./c.ts","./d.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"6f850043fadb2d6b35e16ae1adaad5a5-export const a = 10;const aLocal = 10;","signature":"5d46ba05302682a2bc47daa29368141f-export declare const a = 10;\n","impliedNodeFormat":1},{"version":"bf1b9c3562b043596607d537fbaf9814-export const b = 10;const bLocal = 10;","signature":"eaed5dafb4668e1b7c86b65b584b776a-export declare const b = 10;\n","impliedNodeFormat":1},{"version":"28822e22fad7308e03af07d91b210c8f-import { a } from \"./a\";export const c = a;","signature":"6bc89426f721fe78f6ac43d3e4d9058f-export declare const c = 10;\n","impliedNodeFormat":1},{"version":"b392c90ba2c0413defc12f6bbf323140-import { b } from \"./b\";export const d = b;","signature":"3624f737ffc30774e872b3f5a7340537-export declare const d = 10;\n","impliedNodeFormat":1}],"fileIdsList":[[2],[3]],"options":{"composite":true,"sourceMap":true},"referencedMap":[[4,1],[5,2]],"latestChangedDtsFile":"./d.d.ts"}
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./a.ts",
        "./b.ts",
        "./c.ts",
        "./d.ts"
      ],
      "original": [
        2,
        5
      ]
    }
  ],
  "fileNames": [
    "lib.d.ts",
    "./a.ts",
    "./b.ts",
    "./c.ts",
    "./d.ts"
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
      "version": "6f850043fadb2d6b35e16ae1adaad5a5-export const a = 10;const aLocal = 10;",
      "signature": "5d46ba05302682a2bc47daa29368141f-export declare const a = 10;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "6f850043fadb2d6b35e16ae1adaad5a5-export const a = 10;const aLocal = 10;",
        "signature": "5d46ba05302682a2bc47daa29368141f-export declare const a = 10;\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./b.ts",
      "version": "bf1b9c3562b043596607d537fbaf9814-export const b = 10;const bLocal = 10;",
      "signature": "eaed5dafb4668e1b7c86b65b584b776a-export declare const b = 10;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "bf1b9c3562b043596607d537fbaf9814-export const b = 10;const bLocal = 10;",
        "signature": "eaed5dafb4668e1b7c86b65b584b776a-export declare const b = 10;\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./c.ts",
      "version": "28822e22fad7308e03af07d91b210c8f-import { a } from \"./a\";export const c = a;",
      "signature": "6bc89426f721fe78f6ac43d3e4d9058f-export declare const c = 10;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "28822e22fad7308e03af07d91b210c8f-import { a } from \"./a\";export const c = a;",
        "signature": "6bc89426f721fe78f6ac43d3e4d9058f-export declare const c = 10;\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./d.ts",
      "version": "b392c90ba2c0413defc12f6bbf323140-import { b } from \"./b\";export const d = b;",
      "signature": "3624f737ffc30774e872b3f5a7340537-export declare const d = 10;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "b392c90ba2c0413defc12f6bbf323140-import { b } from \"./b\";export const d = b;",
        "signature": "3624f737ffc30774e872b3f5a7340537-export declare const d = 10;\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "fileIdsList": [
    [
      "./a.ts"
    ],
    [
      "./b.ts"
    ]
  ],
  "options": {
    "composite": true,
    "sourceMap": true
  },
  "referencedMap": {
    "./c.ts": [
      "./a.ts"
    ],
    "./d.ts": [
      "./b.ts"
    ]
  },
  "latestChangedDtsFile": "./d.d.ts",
  "size": 1779
}

tsconfig.json::
SemanticDiagnostics::
Signatures::


Edit [1]:: should re-emit only js so they dont contain sourcemap

tsgo 
ExitStatus:: Success
Output::
//// [/home/src/workspaces/project/a.js] *modified* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.a = void 0;
exports.a = 10;
const aLocal = 10;

//// [/home/src/workspaces/project/b.js] *modified* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.b = void 0;
exports.b = 10;
const bLocal = 10;

//// [/home/src/workspaces/project/c.js] *modified* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.c = void 0;
const a_1 = require("./a");
exports.c = a_1.a;

//// [/home/src/workspaces/project/d.js] *modified* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.d = void 0;
const b_1 = require("./b");
exports.d = b_1.b;

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[[2,5]],"fileNames":["lib.d.ts","./a.ts","./b.ts","./c.ts","./d.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"6f850043fadb2d6b35e16ae1adaad5a5-export const a = 10;const aLocal = 10;","signature":"5d46ba05302682a2bc47daa29368141f-export declare const a = 10;\n","impliedNodeFormat":1},{"version":"bf1b9c3562b043596607d537fbaf9814-export const b = 10;const bLocal = 10;","signature":"eaed5dafb4668e1b7c86b65b584b776a-export declare const b = 10;\n","impliedNodeFormat":1},{"version":"28822e22fad7308e03af07d91b210c8f-import { a } from \"./a\";export const c = a;","signature":"6bc89426f721fe78f6ac43d3e4d9058f-export declare const c = 10;\n","impliedNodeFormat":1},{"version":"b392c90ba2c0413defc12f6bbf323140-import { b } from \"./b\";export const d = b;","signature":"3624f737ffc30774e872b3f5a7340537-export declare const d = 10;\n","impliedNodeFormat":1}],"fileIdsList":[[2],[3]],"options":{"composite":true},"referencedMap":[[4,1],[5,2]],"latestChangedDtsFile":"./d.d.ts"}
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./a.ts",
        "./b.ts",
        "./c.ts",
        "./d.ts"
      ],
      "original": [
        2,
        5
      ]
    }
  ],
  "fileNames": [
    "lib.d.ts",
    "./a.ts",
    "./b.ts",
    "./c.ts",
    "./d.ts"
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
      "version": "6f850043fadb2d6b35e16ae1adaad5a5-export const a = 10;const aLocal = 10;",
      "signature": "5d46ba05302682a2bc47daa29368141f-export declare const a = 10;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "6f850043fadb2d6b35e16ae1adaad5a5-export const a = 10;const aLocal = 10;",
        "signature": "5d46ba05302682a2bc47daa29368141f-export declare const a = 10;\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./b.ts",
      "version": "bf1b9c3562b043596607d537fbaf9814-export const b = 10;const bLocal = 10;",
      "signature": "eaed5dafb4668e1b7c86b65b584b776a-export declare const b = 10;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "bf1b9c3562b043596607d537fbaf9814-export const b = 10;const bLocal = 10;",
        "signature": "eaed5dafb4668e1b7c86b65b584b776a-export declare const b = 10;\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./c.ts",
      "version": "28822e22fad7308e03af07d91b210c8f-import { a } from \"./a\";export const c = a;",
      "signature": "6bc89426f721fe78f6ac43d3e4d9058f-export declare const c = 10;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "28822e22fad7308e03af07d91b210c8f-import { a } from \"./a\";export const c = a;",
        "signature": "6bc89426f721fe78f6ac43d3e4d9058f-export declare const c = 10;\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./d.ts",
      "version": "b392c90ba2c0413defc12f6bbf323140-import { b } from \"./b\";export const d = b;",
      "signature": "3624f737ffc30774e872b3f5a7340537-export declare const d = 10;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "b392c90ba2c0413defc12f6bbf323140-import { b } from \"./b\";export const d = b;",
        "signature": "3624f737ffc30774e872b3f5a7340537-export declare const d = 10;\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "fileIdsList": [
    [
      "./a.ts"
    ],
    [
      "./b.ts"
    ]
  ],
  "options": {
    "composite": true
  },
  "referencedMap": {
    "./c.ts": [
      "./a.ts"
    ],
    "./d.ts": [
      "./b.ts"
    ]
  },
  "latestChangedDtsFile": "./d.d.ts",
  "size": 1762
}

tsconfig.json::
SemanticDiagnostics::
Signatures::


Edit [2]:: with declaration should not emit anything

tsgo --declaration
ExitStatus:: Success
Output::

tsconfig.json::
SemanticDiagnostics::
Signatures::


Edit [3]:: no change

tsgo 
ExitStatus:: Success
Output::

tsconfig.json::
SemanticDiagnostics::
Signatures::


Edit [4]:: with declaration and declarationMap

tsgo --declaration --declarationMap
ExitStatus:: Success
Output::
//// [/home/src/workspaces/project/a.d.ts] *modified* 
export declare const a = 10;
//# sourceMappingURL=a.d.ts.map
//// [/home/src/workspaces/project/a.d.ts.map] *new* 
{"version":3,"file":"a.d.ts","sourceRoot":"","sources":["a.ts"],"names":[],"mappings":"AAAA,eAAO,MAAM,CAAC,KAAK,CAAC"}
//// [/home/src/workspaces/project/b.d.ts] *modified* 
export declare const b = 10;
//# sourceMappingURL=b.d.ts.map
//// [/home/src/workspaces/project/b.d.ts.map] *new* 
{"version":3,"file":"b.d.ts","sourceRoot":"","sources":["b.ts"],"names":[],"mappings":"AAAA,eAAO,MAAM,CAAC,KAAK,CAAC"}
//// [/home/src/workspaces/project/c.d.ts] *modified* 
export declare const c = 10;
//# sourceMappingURL=c.d.ts.map
//// [/home/src/workspaces/project/c.d.ts.map] *new* 
{"version":3,"file":"c.d.ts","sourceRoot":"","sources":["c.ts"],"names":[],"mappings":"AAAwB,eAAO,MAAM,CAAC,KAAI,CAAC"}
//// [/home/src/workspaces/project/d.d.ts] *modified* 
export declare const d = 10;
//# sourceMappingURL=d.d.ts.map
//// [/home/src/workspaces/project/d.d.ts.map] *new* 
{"version":3,"file":"d.d.ts","sourceRoot":"","sources":["d.ts"],"names":[],"mappings":"AAAwB,eAAO,MAAM,CAAC,KAAI,CAAC"}
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[[2,5]],"fileNames":["lib.d.ts","./a.ts","./b.ts","./c.ts","./d.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"6f850043fadb2d6b35e16ae1adaad5a5-export const a = 10;const aLocal = 10;","signature":"5d46ba05302682a2bc47daa29368141f-export declare const a = 10;\n","impliedNodeFormat":1},{"version":"bf1b9c3562b043596607d537fbaf9814-export const b = 10;const bLocal = 10;","signature":"eaed5dafb4668e1b7c86b65b584b776a-export declare const b = 10;\n","impliedNodeFormat":1},{"version":"28822e22fad7308e03af07d91b210c8f-import { a } from \"./a\";export const c = a;","signature":"6bc89426f721fe78f6ac43d3e4d9058f-export declare const c = 10;\n","impliedNodeFormat":1},{"version":"b392c90ba2c0413defc12f6bbf323140-import { b } from \"./b\";export const d = b;","signature":"3624f737ffc30774e872b3f5a7340537-export declare const d = 10;\n","impliedNodeFormat":1}],"fileIdsList":[[2],[3]],"options":{"composite":true,"declaration":true,"declarationMap":true},"referencedMap":[[4,1],[5,2]],"latestChangedDtsFile":"./d.d.ts"}
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./a.ts",
        "./b.ts",
        "./c.ts",
        "./d.ts"
      ],
      "original": [
        2,
        5
      ]
    }
  ],
  "fileNames": [
    "lib.d.ts",
    "./a.ts",
    "./b.ts",
    "./c.ts",
    "./d.ts"
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
      "version": "6f850043fadb2d6b35e16ae1adaad5a5-export const a = 10;const aLocal = 10;",
      "signature": "5d46ba05302682a2bc47daa29368141f-export declare const a = 10;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "6f850043fadb2d6b35e16ae1adaad5a5-export const a = 10;const aLocal = 10;",
        "signature": "5d46ba05302682a2bc47daa29368141f-export declare const a = 10;\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./b.ts",
      "version": "bf1b9c3562b043596607d537fbaf9814-export const b = 10;const bLocal = 10;",
      "signature": "eaed5dafb4668e1b7c86b65b584b776a-export declare const b = 10;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "bf1b9c3562b043596607d537fbaf9814-export const b = 10;const bLocal = 10;",
        "signature": "eaed5dafb4668e1b7c86b65b584b776a-export declare const b = 10;\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./c.ts",
      "version": "28822e22fad7308e03af07d91b210c8f-import { a } from \"./a\";export const c = a;",
      "signature": "6bc89426f721fe78f6ac43d3e4d9058f-export declare const c = 10;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "28822e22fad7308e03af07d91b210c8f-import { a } from \"./a\";export const c = a;",
        "signature": "6bc89426f721fe78f6ac43d3e4d9058f-export declare const c = 10;\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./d.ts",
      "version": "b392c90ba2c0413defc12f6bbf323140-import { b } from \"./b\";export const d = b;",
      "signature": "3624f737ffc30774e872b3f5a7340537-export declare const d = 10;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "b392c90ba2c0413defc12f6bbf323140-import { b } from \"./b\";export const d = b;",
        "signature": "3624f737ffc30774e872b3f5a7340537-export declare const d = 10;\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "fileIdsList": [
    [
      "./a.ts"
    ],
    [
      "./b.ts"
    ]
  ],
  "options": {
    "composite": true,
    "declaration": true,
    "declarationMap": true
  },
  "referencedMap": {
    "./c.ts": [
      "./a.ts"
    ],
    "./d.ts": [
      "./b.ts"
    ]
  },
  "latestChangedDtsFile": "./d.d.ts",
  "size": 1803
}

tsconfig.json::
SemanticDiagnostics::
Signatures::


Edit [5]:: should re-emit only dts so they dont contain sourcemap

tsgo 
ExitStatus:: Success
Output::
//// [/home/src/workspaces/project/a.d.ts] *modified* 
export declare const a = 10;

//// [/home/src/workspaces/project/b.d.ts] *modified* 
export declare const b = 10;

//// [/home/src/workspaces/project/c.d.ts] *modified* 
export declare const c = 10;

//// [/home/src/workspaces/project/d.d.ts] *modified* 
export declare const d = 10;

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[[2,5]],"fileNames":["lib.d.ts","./a.ts","./b.ts","./c.ts","./d.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"6f850043fadb2d6b35e16ae1adaad5a5-export const a = 10;const aLocal = 10;","signature":"5d46ba05302682a2bc47daa29368141f-export declare const a = 10;\n","impliedNodeFormat":1},{"version":"bf1b9c3562b043596607d537fbaf9814-export const b = 10;const bLocal = 10;","signature":"eaed5dafb4668e1b7c86b65b584b776a-export declare const b = 10;\n","impliedNodeFormat":1},{"version":"28822e22fad7308e03af07d91b210c8f-import { a } from \"./a\";export const c = a;","signature":"6bc89426f721fe78f6ac43d3e4d9058f-export declare const c = 10;\n","impliedNodeFormat":1},{"version":"b392c90ba2c0413defc12f6bbf323140-import { b } from \"./b\";export const d = b;","signature":"3624f737ffc30774e872b3f5a7340537-export declare const d = 10;\n","impliedNodeFormat":1}],"fileIdsList":[[2],[3]],"options":{"composite":true},"referencedMap":[[4,1],[5,2]],"latestChangedDtsFile":"./d.d.ts"}
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./a.ts",
        "./b.ts",
        "./c.ts",
        "./d.ts"
      ],
      "original": [
        2,
        5
      ]
    }
  ],
  "fileNames": [
    "lib.d.ts",
    "./a.ts",
    "./b.ts",
    "./c.ts",
    "./d.ts"
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
      "version": "6f850043fadb2d6b35e16ae1adaad5a5-export const a = 10;const aLocal = 10;",
      "signature": "5d46ba05302682a2bc47daa29368141f-export declare const a = 10;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "6f850043fadb2d6b35e16ae1adaad5a5-export const a = 10;const aLocal = 10;",
        "signature": "5d46ba05302682a2bc47daa29368141f-export declare const a = 10;\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./b.ts",
      "version": "bf1b9c3562b043596607d537fbaf9814-export const b = 10;const bLocal = 10;",
      "signature": "eaed5dafb4668e1b7c86b65b584b776a-export declare const b = 10;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "bf1b9c3562b043596607d537fbaf9814-export const b = 10;const bLocal = 10;",
        "signature": "eaed5dafb4668e1b7c86b65b584b776a-export declare const b = 10;\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./c.ts",
      "version": "28822e22fad7308e03af07d91b210c8f-import { a } from \"./a\";export const c = a;",
      "signature": "6bc89426f721fe78f6ac43d3e4d9058f-export declare const c = 10;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "28822e22fad7308e03af07d91b210c8f-import { a } from \"./a\";export const c = a;",
        "signature": "6bc89426f721fe78f6ac43d3e4d9058f-export declare const c = 10;\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./d.ts",
      "version": "b392c90ba2c0413defc12f6bbf323140-import { b } from \"./b\";export const d = b;",
      "signature": "3624f737ffc30774e872b3f5a7340537-export declare const d = 10;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "b392c90ba2c0413defc12f6bbf323140-import { b } from \"./b\";export const d = b;",
        "signature": "3624f737ffc30774e872b3f5a7340537-export declare const d = 10;\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "fileIdsList": [
    [
      "./a.ts"
    ],
    [
      "./b.ts"
    ]
  ],
  "options": {
    "composite": true
  },
  "referencedMap": {
    "./c.ts": [
      "./a.ts"
    ],
    "./d.ts": [
      "./b.ts"
    ]
  },
  "latestChangedDtsFile": "./d.d.ts",
  "size": 1762
}

tsconfig.json::
SemanticDiagnostics::
Signatures::


Edit [6]:: with emitDeclarationOnly should not emit anything

tsgo --emitDeclarationOnly
ExitStatus:: Success
Output::

tsconfig.json::
SemanticDiagnostics::
Signatures::


Edit [7]:: no change

tsgo 
ExitStatus:: Success
Output::

tsconfig.json::
SemanticDiagnostics::
Signatures::


Edit [8]:: local change
//// [/home/src/workspaces/project/a.ts] *modified* 
export const a = 10;const aLocal = 100;

tsgo 
ExitStatus:: Success
Output::
//// [/home/src/workspaces/project/a.js] *modified* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.a = void 0;
exports.a = 10;
const aLocal = 100;

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[[2,5]],"fileNames":["lib.d.ts","./a.ts","./b.ts","./c.ts","./d.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"c74d6b68e2cb0ed4cb8c18e3879119d9-export const a = 10;const aLocal = 100;","signature":"5d46ba05302682a2bc47daa29368141f-export declare const a = 10;\n","impliedNodeFormat":1},{"version":"bf1b9c3562b043596607d537fbaf9814-export const b = 10;const bLocal = 10;","signature":"eaed5dafb4668e1b7c86b65b584b776a-export declare const b = 10;\n","impliedNodeFormat":1},{"version":"28822e22fad7308e03af07d91b210c8f-import { a } from \"./a\";export const c = a;","signature":"6bc89426f721fe78f6ac43d3e4d9058f-export declare const c = 10;\n","impliedNodeFormat":1},{"version":"b392c90ba2c0413defc12f6bbf323140-import { b } from \"./b\";export const d = b;","signature":"3624f737ffc30774e872b3f5a7340537-export declare const d = 10;\n","impliedNodeFormat":1}],"fileIdsList":[[2],[3]],"options":{"composite":true},"referencedMap":[[4,1],[5,2]],"latestChangedDtsFile":"./d.d.ts"}
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./a.ts",
        "./b.ts",
        "./c.ts",
        "./d.ts"
      ],
      "original": [
        2,
        5
      ]
    }
  ],
  "fileNames": [
    "lib.d.ts",
    "./a.ts",
    "./b.ts",
    "./c.ts",
    "./d.ts"
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
      "version": "c74d6b68e2cb0ed4cb8c18e3879119d9-export const a = 10;const aLocal = 100;",
      "signature": "5d46ba05302682a2bc47daa29368141f-export declare const a = 10;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "c74d6b68e2cb0ed4cb8c18e3879119d9-export const a = 10;const aLocal = 100;",
        "signature": "5d46ba05302682a2bc47daa29368141f-export declare const a = 10;\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./b.ts",
      "version": "bf1b9c3562b043596607d537fbaf9814-export const b = 10;const bLocal = 10;",
      "signature": "eaed5dafb4668e1b7c86b65b584b776a-export declare const b = 10;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "bf1b9c3562b043596607d537fbaf9814-export const b = 10;const bLocal = 10;",
        "signature": "eaed5dafb4668e1b7c86b65b584b776a-export declare const b = 10;\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./c.ts",
      "version": "28822e22fad7308e03af07d91b210c8f-import { a } from \"./a\";export const c = a;",
      "signature": "6bc89426f721fe78f6ac43d3e4d9058f-export declare const c = 10;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "28822e22fad7308e03af07d91b210c8f-import { a } from \"./a\";export const c = a;",
        "signature": "6bc89426f721fe78f6ac43d3e4d9058f-export declare const c = 10;\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./d.ts",
      "version": "b392c90ba2c0413defc12f6bbf323140-import { b } from \"./b\";export const d = b;",
      "signature": "3624f737ffc30774e872b3f5a7340537-export declare const d = 10;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "b392c90ba2c0413defc12f6bbf323140-import { b } from \"./b\";export const d = b;",
        "signature": "3624f737ffc30774e872b3f5a7340537-export declare const d = 10;\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "fileIdsList": [
    [
      "./a.ts"
    ],
    [
      "./b.ts"
    ]
  ],
  "options": {
    "composite": true
  },
  "referencedMap": {
    "./c.ts": [
      "./a.ts"
    ],
    "./d.ts": [
      "./b.ts"
    ]
  },
  "latestChangedDtsFile": "./d.d.ts",
  "size": 1763
}

tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/workspaces/project/a.ts
Signatures::
(computed .d.ts) /home/src/workspaces/project/a.ts


Edit [9]:: with declaration should not emit anything

tsgo --declaration
ExitStatus:: Success
Output::

tsconfig.json::
SemanticDiagnostics::
Signatures::


Edit [10]:: with inlineSourceMap

tsgo --inlineSourceMap
ExitStatus:: Success
Output::
//// [/home/src/workspaces/project/a.js] *modified* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.a = void 0;
exports.a = 10;
const aLocal = 100;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQWEsUUFBQSxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBQUEsTUFBTSxNQUFNLEdBQUcsR0FBRyxDQUFDIn0=
//// [/home/src/workspaces/project/b.js] *modified* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.b = void 0;
exports.b = 10;
const bLocal = 10;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQWEsUUFBQSxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBQUEsTUFBTSxNQUFNLEdBQUcsRUFBRSxDQUFDIn0=
//// [/home/src/workspaces/project/c.js] *modified* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.c = void 0;
const a_1 = require("./a");
exports.c = a_1.a;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsMkJBQXdCO0FBQWEsUUFBQSxDQUFDLEdBQUcsS0FBQyxDQUFDIn0=
//// [/home/src/workspaces/project/d.js] *modified* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.d = void 0;
const b_1 = require("./b");
exports.d = b_1.b;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsMkJBQXdCO0FBQWEsUUFBQSxDQUFDLEdBQUcsS0FBQyxDQUFDIn0=
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[[2,5]],"fileNames":["lib.d.ts","./a.ts","./b.ts","./c.ts","./d.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"c74d6b68e2cb0ed4cb8c18e3879119d9-export const a = 10;const aLocal = 100;","signature":"5d46ba05302682a2bc47daa29368141f-export declare const a = 10;\n","impliedNodeFormat":1},{"version":"bf1b9c3562b043596607d537fbaf9814-export const b = 10;const bLocal = 10;","signature":"eaed5dafb4668e1b7c86b65b584b776a-export declare const b = 10;\n","impliedNodeFormat":1},{"version":"28822e22fad7308e03af07d91b210c8f-import { a } from \"./a\";export const c = a;","signature":"6bc89426f721fe78f6ac43d3e4d9058f-export declare const c = 10;\n","impliedNodeFormat":1},{"version":"b392c90ba2c0413defc12f6bbf323140-import { b } from \"./b\";export const d = b;","signature":"3624f737ffc30774e872b3f5a7340537-export declare const d = 10;\n","impliedNodeFormat":1}],"fileIdsList":[[2],[3]],"options":{"composite":true,"inlineSourceMap":true},"referencedMap":[[4,1],[5,2]],"latestChangedDtsFile":"./d.d.ts"}
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./a.ts",
        "./b.ts",
        "./c.ts",
        "./d.ts"
      ],
      "original": [
        2,
        5
      ]
    }
  ],
  "fileNames": [
    "lib.d.ts",
    "./a.ts",
    "./b.ts",
    "./c.ts",
    "./d.ts"
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
      "version": "c74d6b68e2cb0ed4cb8c18e3879119d9-export const a = 10;const aLocal = 100;",
      "signature": "5d46ba05302682a2bc47daa29368141f-export declare const a = 10;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "c74d6b68e2cb0ed4cb8c18e3879119d9-export const a = 10;const aLocal = 100;",
        "signature": "5d46ba05302682a2bc47daa29368141f-export declare const a = 10;\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./b.ts",
      "version": "bf1b9c3562b043596607d537fbaf9814-export const b = 10;const bLocal = 10;",
      "signature": "eaed5dafb4668e1b7c86b65b584b776a-export declare const b = 10;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "bf1b9c3562b043596607d537fbaf9814-export const b = 10;const bLocal = 10;",
        "signature": "eaed5dafb4668e1b7c86b65b584b776a-export declare const b = 10;\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./c.ts",
      "version": "28822e22fad7308e03af07d91b210c8f-import { a } from \"./a\";export const c = a;",
      "signature": "6bc89426f721fe78f6ac43d3e4d9058f-export declare const c = 10;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "28822e22fad7308e03af07d91b210c8f-import { a } from \"./a\";export const c = a;",
        "signature": "6bc89426f721fe78f6ac43d3e4d9058f-export declare const c = 10;\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./d.ts",
      "version": "b392c90ba2c0413defc12f6bbf323140-import { b } from \"./b\";export const d = b;",
      "signature": "3624f737ffc30774e872b3f5a7340537-export declare const d = 10;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "b392c90ba2c0413defc12f6bbf323140-import { b } from \"./b\";export const d = b;",
        "signature": "3624f737ffc30774e872b3f5a7340537-export declare const d = 10;\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "fileIdsList": [
    [
      "./a.ts"
    ],
    [
      "./b.ts"
    ]
  ],
  "options": {
    "composite": true,
    "inlineSourceMap": true
  },
  "referencedMap": {
    "./c.ts": [
      "./a.ts"
    ],
    "./d.ts": [
      "./b.ts"
    ]
  },
  "latestChangedDtsFile": "./d.d.ts",
  "size": 1786
}

tsconfig.json::
SemanticDiagnostics::
Signatures::


Edit [11]:: with sourceMap

tsgo --sourceMap
ExitStatus:: Success
Output::
//// [/home/src/workspaces/project/a.js] *modified* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.a = void 0;
exports.a = 10;
const aLocal = 100;
//# sourceMappingURL=a.js.map
//// [/home/src/workspaces/project/a.js.map] *modified* 
{"version":3,"file":"a.js","sourceRoot":"","sources":["a.ts"],"names":[],"mappings":";;;AAAa,QAAA,CAAC,GAAG,EAAE,CAAC;AAAA,MAAM,MAAM,GAAG,GAAG,CAAC"}
//// [/home/src/workspaces/project/b.js] *modified* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.b = void 0;
exports.b = 10;
const bLocal = 10;
//# sourceMappingURL=b.js.map
//// [/home/src/workspaces/project/b.js.map] *rewrite with same content*
//// [/home/src/workspaces/project/c.js] *modified* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.c = void 0;
const a_1 = require("./a");
exports.c = a_1.a;
//# sourceMappingURL=c.js.map
//// [/home/src/workspaces/project/c.js.map] *rewrite with same content*
//// [/home/src/workspaces/project/d.js] *modified* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.d = void 0;
const b_1 = require("./b");
exports.d = b_1.b;
//# sourceMappingURL=d.js.map
//// [/home/src/workspaces/project/d.js.map] *rewrite with same content*
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[[2,5]],"fileNames":["lib.d.ts","./a.ts","./b.ts","./c.ts","./d.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"c74d6b68e2cb0ed4cb8c18e3879119d9-export const a = 10;const aLocal = 100;","signature":"5d46ba05302682a2bc47daa29368141f-export declare const a = 10;\n","impliedNodeFormat":1},{"version":"bf1b9c3562b043596607d537fbaf9814-export const b = 10;const bLocal = 10;","signature":"eaed5dafb4668e1b7c86b65b584b776a-export declare const b = 10;\n","impliedNodeFormat":1},{"version":"28822e22fad7308e03af07d91b210c8f-import { a } from \"./a\";export const c = a;","signature":"6bc89426f721fe78f6ac43d3e4d9058f-export declare const c = 10;\n","impliedNodeFormat":1},{"version":"b392c90ba2c0413defc12f6bbf323140-import { b } from \"./b\";export const d = b;","signature":"3624f737ffc30774e872b3f5a7340537-export declare const d = 10;\n","impliedNodeFormat":1}],"fileIdsList":[[2],[3]],"options":{"composite":true,"sourceMap":true},"referencedMap":[[4,1],[5,2]],"latestChangedDtsFile":"./d.d.ts"}
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./a.ts",
        "./b.ts",
        "./c.ts",
        "./d.ts"
      ],
      "original": [
        2,
        5
      ]
    }
  ],
  "fileNames": [
    "lib.d.ts",
    "./a.ts",
    "./b.ts",
    "./c.ts",
    "./d.ts"
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
      "version": "c74d6b68e2cb0ed4cb8c18e3879119d9-export const a = 10;const aLocal = 100;",
      "signature": "5d46ba05302682a2bc47daa29368141f-export declare const a = 10;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "c74d6b68e2cb0ed4cb8c18e3879119d9-export const a = 10;const aLocal = 100;",
        "signature": "5d46ba05302682a2bc47daa29368141f-export declare const a = 10;\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./b.ts",
      "version": "bf1b9c3562b043596607d537fbaf9814-export const b = 10;const bLocal = 10;",
      "signature": "eaed5dafb4668e1b7c86b65b584b776a-export declare const b = 10;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "bf1b9c3562b043596607d537fbaf9814-export const b = 10;const bLocal = 10;",
        "signature": "eaed5dafb4668e1b7c86b65b584b776a-export declare const b = 10;\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./c.ts",
      "version": "28822e22fad7308e03af07d91b210c8f-import { a } from \"./a\";export const c = a;",
      "signature": "6bc89426f721fe78f6ac43d3e4d9058f-export declare const c = 10;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "28822e22fad7308e03af07d91b210c8f-import { a } from \"./a\";export const c = a;",
        "signature": "6bc89426f721fe78f6ac43d3e4d9058f-export declare const c = 10;\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./d.ts",
      "version": "b392c90ba2c0413defc12f6bbf323140-import { b } from \"./b\";export const d = b;",
      "signature": "3624f737ffc30774e872b3f5a7340537-export declare const d = 10;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "b392c90ba2c0413defc12f6bbf323140-import { b } from \"./b\";export const d = b;",
        "signature": "3624f737ffc30774e872b3f5a7340537-export declare const d = 10;\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "fileIdsList": [
    [
      "./a.ts"
    ],
    [
      "./b.ts"
    ]
  ],
  "options": {
    "composite": true,
    "sourceMap": true
  },
  "referencedMap": {
    "./c.ts": [
      "./a.ts"
    ],
    "./d.ts": [
      "./b.ts"
    ]
  },
  "latestChangedDtsFile": "./d.d.ts",
  "size": 1780
}

tsconfig.json::
SemanticDiagnostics::
Signatures::


Edit [12]:: declarationMap enabling
//// [/home/src/workspaces/project/tsconfig.json] *modified* 
{
    "compilerOptions": {
        "composite": true,        "declarationMap": true
    }
}

tsgo 
ExitStatus:: Success
Output::
//// [/home/src/workspaces/project/a.d.ts] *modified* 
export declare const a = 10;
//# sourceMappingURL=a.d.ts.map
//// [/home/src/workspaces/project/a.d.ts.map] *rewrite with same content*
//// [/home/src/workspaces/project/a.js] *modified* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.a = void 0;
exports.a = 10;
const aLocal = 100;

//// [/home/src/workspaces/project/b.d.ts] *modified* 
export declare const b = 10;
//# sourceMappingURL=b.d.ts.map
//// [/home/src/workspaces/project/b.d.ts.map] *rewrite with same content*
//// [/home/src/workspaces/project/b.js] *modified* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.b = void 0;
exports.b = 10;
const bLocal = 10;

//// [/home/src/workspaces/project/c.d.ts] *modified* 
export declare const c = 10;
//# sourceMappingURL=c.d.ts.map
//// [/home/src/workspaces/project/c.d.ts.map] *rewrite with same content*
//// [/home/src/workspaces/project/c.js] *modified* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.c = void 0;
const a_1 = require("./a");
exports.c = a_1.a;

//// [/home/src/workspaces/project/d.d.ts] *modified* 
export declare const d = 10;
//# sourceMappingURL=d.d.ts.map
//// [/home/src/workspaces/project/d.d.ts.map] *rewrite with same content*
//// [/home/src/workspaces/project/d.js] *modified* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.d = void 0;
const b_1 = require("./b");
exports.d = b_1.b;

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[[2,5]],"fileNames":["lib.d.ts","./a.ts","./b.ts","./c.ts","./d.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"c74d6b68e2cb0ed4cb8c18e3879119d9-export const a = 10;const aLocal = 100;","signature":"5d46ba05302682a2bc47daa29368141f-export declare const a = 10;\n","impliedNodeFormat":1},{"version":"bf1b9c3562b043596607d537fbaf9814-export const b = 10;const bLocal = 10;","signature":"eaed5dafb4668e1b7c86b65b584b776a-export declare const b = 10;\n","impliedNodeFormat":1},{"version":"28822e22fad7308e03af07d91b210c8f-import { a } from \"./a\";export const c = a;","signature":"6bc89426f721fe78f6ac43d3e4d9058f-export declare const c = 10;\n","impliedNodeFormat":1},{"version":"b392c90ba2c0413defc12f6bbf323140-import { b } from \"./b\";export const d = b;","signature":"3624f737ffc30774e872b3f5a7340537-export declare const d = 10;\n","impliedNodeFormat":1}],"fileIdsList":[[2],[3]],"options":{"composite":true,"declarationMap":true},"referencedMap":[[4,1],[5,2]],"latestChangedDtsFile":"./d.d.ts"}
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./a.ts",
        "./b.ts",
        "./c.ts",
        "./d.ts"
      ],
      "original": [
        2,
        5
      ]
    }
  ],
  "fileNames": [
    "lib.d.ts",
    "./a.ts",
    "./b.ts",
    "./c.ts",
    "./d.ts"
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
      "version": "c74d6b68e2cb0ed4cb8c18e3879119d9-export const a = 10;const aLocal = 100;",
      "signature": "5d46ba05302682a2bc47daa29368141f-export declare const a = 10;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "c74d6b68e2cb0ed4cb8c18e3879119d9-export const a = 10;const aLocal = 100;",
        "signature": "5d46ba05302682a2bc47daa29368141f-export declare const a = 10;\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./b.ts",
      "version": "bf1b9c3562b043596607d537fbaf9814-export const b = 10;const bLocal = 10;",
      "signature": "eaed5dafb4668e1b7c86b65b584b776a-export declare const b = 10;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "bf1b9c3562b043596607d537fbaf9814-export const b = 10;const bLocal = 10;",
        "signature": "eaed5dafb4668e1b7c86b65b584b776a-export declare const b = 10;\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./c.ts",
      "version": "28822e22fad7308e03af07d91b210c8f-import { a } from \"./a\";export const c = a;",
      "signature": "6bc89426f721fe78f6ac43d3e4d9058f-export declare const c = 10;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "28822e22fad7308e03af07d91b210c8f-import { a } from \"./a\";export const c = a;",
        "signature": "6bc89426f721fe78f6ac43d3e4d9058f-export declare const c = 10;\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./d.ts",
      "version": "b392c90ba2c0413defc12f6bbf323140-import { b } from \"./b\";export const d = b;",
      "signature": "3624f737ffc30774e872b3f5a7340537-export declare const d = 10;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "b392c90ba2c0413defc12f6bbf323140-import { b } from \"./b\";export const d = b;",
        "signature": "3624f737ffc30774e872b3f5a7340537-export declare const d = 10;\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "fileIdsList": [
    [
      "./a.ts"
    ],
    [
      "./b.ts"
    ]
  ],
  "options": {
    "composite": true,
    "declarationMap": true
  },
  "referencedMap": {
    "./c.ts": [
      "./a.ts"
    ],
    "./d.ts": [
      "./b.ts"
    ]
  },
  "latestChangedDtsFile": "./d.d.ts",
  "size": 1785
}

tsconfig.json::
SemanticDiagnostics::
Signatures::


Edit [13]:: with sourceMap should not emit d.ts

tsgo --sourceMap
ExitStatus:: Success
Output::
//// [/home/src/workspaces/project/a.js] *modified* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.a = void 0;
exports.a = 10;
const aLocal = 100;
//# sourceMappingURL=a.js.map
//// [/home/src/workspaces/project/a.js.map] *rewrite with same content*
//// [/home/src/workspaces/project/b.js] *modified* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.b = void 0;
exports.b = 10;
const bLocal = 10;
//# sourceMappingURL=b.js.map
//// [/home/src/workspaces/project/b.js.map] *rewrite with same content*
//// [/home/src/workspaces/project/c.js] *modified* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.c = void 0;
const a_1 = require("./a");
exports.c = a_1.a;
//# sourceMappingURL=c.js.map
//// [/home/src/workspaces/project/c.js.map] *rewrite with same content*
//// [/home/src/workspaces/project/d.js] *modified* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.d = void 0;
const b_1 = require("./b");
exports.d = b_1.b;
//# sourceMappingURL=d.js.map
//// [/home/src/workspaces/project/d.js.map] *rewrite with same content*
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[[2,5]],"fileNames":["lib.d.ts","./a.ts","./b.ts","./c.ts","./d.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"c74d6b68e2cb0ed4cb8c18e3879119d9-export const a = 10;const aLocal = 100;","signature":"5d46ba05302682a2bc47daa29368141f-export declare const a = 10;\n","impliedNodeFormat":1},{"version":"bf1b9c3562b043596607d537fbaf9814-export const b = 10;const bLocal = 10;","signature":"eaed5dafb4668e1b7c86b65b584b776a-export declare const b = 10;\n","impliedNodeFormat":1},{"version":"28822e22fad7308e03af07d91b210c8f-import { a } from \"./a\";export const c = a;","signature":"6bc89426f721fe78f6ac43d3e4d9058f-export declare const c = 10;\n","impliedNodeFormat":1},{"version":"b392c90ba2c0413defc12f6bbf323140-import { b } from \"./b\";export const d = b;","signature":"3624f737ffc30774e872b3f5a7340537-export declare const d = 10;\n","impliedNodeFormat":1}],"fileIdsList":[[2],[3]],"options":{"composite":true,"declarationMap":true,"sourceMap":true},"referencedMap":[[4,1],[5,2]],"latestChangedDtsFile":"./d.d.ts"}
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./a.ts",
        "./b.ts",
        "./c.ts",
        "./d.ts"
      ],
      "original": [
        2,
        5
      ]
    }
  ],
  "fileNames": [
    "lib.d.ts",
    "./a.ts",
    "./b.ts",
    "./c.ts",
    "./d.ts"
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
      "version": "c74d6b68e2cb0ed4cb8c18e3879119d9-export const a = 10;const aLocal = 100;",
      "signature": "5d46ba05302682a2bc47daa29368141f-export declare const a = 10;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "c74d6b68e2cb0ed4cb8c18e3879119d9-export const a = 10;const aLocal = 100;",
        "signature": "5d46ba05302682a2bc47daa29368141f-export declare const a = 10;\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./b.ts",
      "version": "bf1b9c3562b043596607d537fbaf9814-export const b = 10;const bLocal = 10;",
      "signature": "eaed5dafb4668e1b7c86b65b584b776a-export declare const b = 10;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "bf1b9c3562b043596607d537fbaf9814-export const b = 10;const bLocal = 10;",
        "signature": "eaed5dafb4668e1b7c86b65b584b776a-export declare const b = 10;\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./c.ts",
      "version": "28822e22fad7308e03af07d91b210c8f-import { a } from \"./a\";export const c = a;",
      "signature": "6bc89426f721fe78f6ac43d3e4d9058f-export declare const c = 10;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "28822e22fad7308e03af07d91b210c8f-import { a } from \"./a\";export const c = a;",
        "signature": "6bc89426f721fe78f6ac43d3e4d9058f-export declare const c = 10;\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./d.ts",
      "version": "b392c90ba2c0413defc12f6bbf323140-import { b } from \"./b\";export const d = b;",
      "signature": "3624f737ffc30774e872b3f5a7340537-export declare const d = 10;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "b392c90ba2c0413defc12f6bbf323140-import { b } from \"./b\";export const d = b;",
        "signature": "3624f737ffc30774e872b3f5a7340537-export declare const d = 10;\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "fileIdsList": [
    [
      "./a.ts"
    ],
    [
      "./b.ts"
    ]
  ],
  "options": {
    "composite": true,
    "declarationMap": true,
    "sourceMap": true
  },
  "referencedMap": {
    "./c.ts": [
      "./a.ts"
    ],
    "./d.ts": [
      "./b.ts"
    ]
  },
  "latestChangedDtsFile": "./d.d.ts",
  "size": 1802
}

tsconfig.json::
SemanticDiagnostics::
Signatures::
