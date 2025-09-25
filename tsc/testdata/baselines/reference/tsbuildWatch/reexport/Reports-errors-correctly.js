currentDirectory::/user/username/projects/reexport
useCaseSensitiveFileNames::true
Input::
//// [/user/username/projects/reexport/src/main/index.ts] *new* 
import { Session } from "../pure";

export const session: Session = {
    foo: 1
};
//// [/user/username/projects/reexport/src/main/tsconfig.json] *new* 
{
    "compilerOptions": {
        "outDir": "../../out",
        "rootDir": "../",
    },
    "include": ["**/*.ts"],
    "references": [{ "path": "../pure" }],
}
//// [/user/username/projects/reexport/src/pure/index.ts] *new* 
export * from "./session";
//// [/user/username/projects/reexport/src/pure/session.ts] *new* 
export interface Session {
    foo: number;
    // bar: number;
}
//// [/user/username/projects/reexport/src/pure/tsconfig.json] *new* 
{
    "compilerOptions": {
        "composite": true,
        "outDir": "../../out",
        "rootDir": "../",
    },
    "include": ["**/*.ts"],
}
//// [/user/username/projects/reexport/src/tsconfig.json] *new* 
{
    "files": [],
    "include": [],
    "references": [{ "path": "./pure" }, { "path": "./main" }],
}

tsgo -b -w -verbose src
ExitStatus:: Success
Output::
[2J[3J[H[[90mHH:MM:SS AM[0m] Starting compilation in watch mode...

[[90mHH:MM:SS AM[0m] Projects in this build: 
    * src/pure/tsconfig.json
    * src/main/tsconfig.json
    * src/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'src/pure/tsconfig.json' is out of date because output file 'out/pure/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project 'src/pure/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'src/main/tsconfig.json' is out of date because output file 'out/main/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project 'src/main/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.

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
//// [/user/username/projects/reexport/out/main/index.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.session = void 0;
exports.session = {
    foo: 1
};

//// [/user/username/projects/reexport/out/main/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":["../../src/main/index.ts"]}
//// [/user/username/projects/reexport/out/main/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "../../src/main/index.ts"
      ],
      "original": "../../src/main/index.ts"
    }
  ],
  "size": 62
}
//// [/user/username/projects/reexport/out/pure/index.d.ts] *new* 
export * from "./session";

//// [/user/username/projects/reexport/out/pure/index.js] *new* 
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./session"), exports);

//// [/user/username/projects/reexport/out/pure/session.d.ts] *new* 
export interface Session {
    foo: number;
}

//// [/user/username/projects/reexport/out/pure/session.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

//// [/user/username/projects/reexport/out/pure/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":[[2,3]],"fileNames":["lib.d.ts","../../src/pure/session.ts","../../src/pure/index.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"1beb34deefa28062ed4b4b605c69e42f-export interface Session {\n    foo: number;\n    // bar: number;\n}","signature":"90b43415bdb2993dfd8c888e444ab471-export interface Session {\n    foo: number;\n}\n","impliedNodeFormat":1},{"version":"c3b7227625b1dcb56b6fb13c17c504fe-export * from \"./session\";","signature":"14ab788547e1e852fa86d4bf1731e8c8-export * from \"./session\";\n","impliedNodeFormat":1}],"fileIdsList":[[2]],"options":{"composite":true,"outDir":"..","rootDir":"../../src"},"referencedMap":[[3,1]],"latestChangedDtsFile":"./index.d.ts"}
//// [/user/username/projects/reexport/out/pure/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "../../src/pure/session.ts",
        "../../src/pure/index.ts"
      ],
      "original": [
        2,
        3
      ]
    }
  ],
  "fileNames": [
    "lib.d.ts",
    "../../src/pure/session.ts",
    "../../src/pure/index.ts"
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
      "fileName": "../../src/pure/session.ts",
      "version": "1beb34deefa28062ed4b4b605c69e42f-export interface Session {\n    foo: number;\n    // bar: number;\n}",
      "signature": "90b43415bdb2993dfd8c888e444ab471-export interface Session {\n    foo: number;\n}\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "1beb34deefa28062ed4b4b605c69e42f-export interface Session {\n    foo: number;\n    // bar: number;\n}",
        "signature": "90b43415bdb2993dfd8c888e444ab471-export interface Session {\n    foo: number;\n}\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "../../src/pure/index.ts",
      "version": "c3b7227625b1dcb56b6fb13c17c504fe-export * from \"./session\";",
      "signature": "14ab788547e1e852fa86d4bf1731e8c8-export * from \"./session\";\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "c3b7227625b1dcb56b6fb13c17c504fe-export * from \"./session\";",
        "signature": "14ab788547e1e852fa86d4bf1731e8c8-export * from \"./session\";\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "fileIdsList": [
    [
      "../../src/pure/session.ts"
    ]
  ],
  "options": {
    "composite": true,
    "outDir": "..",
    "rootDir": "../../src"
  },
  "referencedMap": {
    "../../src/pure/index.ts": [
      "../../src/pure/session.ts"
    ]
  },
  "latestChangedDtsFile": "./index.d.ts",
  "size": 1463
}

src/pure/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.d.ts
*refresh*    /user/username/projects/reexport/src/pure/session.ts
*refresh*    /user/username/projects/reexport/src/pure/index.ts
Signatures::
(stored at emit) /user/username/projects/reexport/src/pure/session.ts
(stored at emit) /user/username/projects/reexport/src/pure/index.ts

src/main/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.d.ts
*refresh*    /user/username/projects/reexport/out/pure/session.d.ts
*refresh*    /user/username/projects/reexport/out/pure/index.d.ts
*refresh*    /user/username/projects/reexport/src/main/index.ts
Signatures::


Edit [0]:: Introduce error
//// [/user/username/projects/reexport/src/pure/session.ts] *modified* 
export interface Session {
    foo: number;
    bar: number;
}


Output::
[2J[3J[H[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

[[90mHH:MM:SS AM[0m] Projects in this build: 
    * src/pure/tsconfig.json
    * src/main/tsconfig.json
    * src/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'src/pure/tsconfig.json' is out of date because output 'out/pure/tsconfig.tsbuildinfo' is older than input 'src/pure/session.ts'

[[90mHH:MM:SS AM[0m] Building project 'src/pure/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'src/main/tsconfig.json' is out of date because output 'out/main/index.js' is older than input 'src/pure/tsconfig.json'

[[90mHH:MM:SS AM[0m] Building project 'src/main/tsconfig.json'...

[96msrc/main/index.ts[0m:[93m3[0m:[93m14[0m - [91merror[0m[90m TS2741: [0mProperty 'bar' is missing in type '{ foo: number; }' but required in type 'Session'.

[7m3[0m export const session: Session = {
[7m [0m [91m             ~~~~~~~[0m

  [96mout/pure/session.d.ts[0m:[93m3[0m:[93m5[0m - 'bar' is declared here.
    [7m3[0m     bar: number;
    [7m [0m [96m    ~~~[0m

[[90mHH:MM:SS AM[0m] Found 1 error. Watching for file changes.

//// [/user/username/projects/reexport/out/main/index.js] *rewrite with same content*
//// [/user/username/projects/reexport/out/main/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":["../../src/main/index.ts"],"semanticErrors":true}
//// [/user/username/projects/reexport/out/main/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "../../src/main/index.ts"
      ],
      "original": "../../src/main/index.ts"
    }
  ],
  "size": 84,
  "semanticErrors": true
}
//// [/user/username/projects/reexport/out/pure/index.js] *rewrite with same content*
//// [/user/username/projects/reexport/out/pure/session.d.ts] *modified* 
export interface Session {
    foo: number;
    bar: number;
}

//// [/user/username/projects/reexport/out/pure/session.js] *rewrite with same content*
//// [/user/username/projects/reexport/out/pure/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[[2,3]],"fileNames":["lib.d.ts","../../src/pure/session.ts","../../src/pure/index.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"f993dc94313f77cb079d7ee366b10997-export interface Session {\n    foo: number;\n    bar: number;\n}","signature":"5daeec8bad73c67127f3b3aae951c919-export interface Session {\n    foo: number;\n    bar: number;\n}\n","impliedNodeFormat":1},{"version":"c3b7227625b1dcb56b6fb13c17c504fe-export * from \"./session\";","signature":"14ab788547e1e852fa86d4bf1731e8c8-export * from \"./session\";\n","impliedNodeFormat":1}],"fileIdsList":[[2]],"options":{"composite":true,"outDir":"..","rootDir":"../../src"},"referencedMap":[[3,1]],"latestChangedDtsFile":"./session.d.ts"}
//// [/user/username/projects/reexport/out/pure/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "../../src/pure/session.ts",
        "../../src/pure/index.ts"
      ],
      "original": [
        2,
        3
      ]
    }
  ],
  "fileNames": [
    "lib.d.ts",
    "../../src/pure/session.ts",
    "../../src/pure/index.ts"
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
      "fileName": "../../src/pure/session.ts",
      "version": "f993dc94313f77cb079d7ee366b10997-export interface Session {\n    foo: number;\n    bar: number;\n}",
      "signature": "5daeec8bad73c67127f3b3aae951c919-export interface Session {\n    foo: number;\n    bar: number;\n}\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "f993dc94313f77cb079d7ee366b10997-export interface Session {\n    foo: number;\n    bar: number;\n}",
        "signature": "5daeec8bad73c67127f3b3aae951c919-export interface Session {\n    foo: number;\n    bar: number;\n}\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "../../src/pure/index.ts",
      "version": "c3b7227625b1dcb56b6fb13c17c504fe-export * from \"./session\";",
      "signature": "14ab788547e1e852fa86d4bf1731e8c8-export * from \"./session\";\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "c3b7227625b1dcb56b6fb13c17c504fe-export * from \"./session\";",
        "signature": "14ab788547e1e852fa86d4bf1731e8c8-export * from \"./session\";\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "fileIdsList": [
    [
      "../../src/pure/session.ts"
    ]
  ],
  "options": {
    "composite": true,
    "outDir": "..",
    "rootDir": "../../src"
  },
  "referencedMap": {
    "../../src/pure/index.ts": [
      "../../src/pure/session.ts"
    ]
  },
  "latestChangedDtsFile": "./session.d.ts",
  "size": 1480
}

src/pure/tsconfig.json::
SemanticDiagnostics::
*refresh*    /user/username/projects/reexport/src/pure/session.ts
*refresh*    /user/username/projects/reexport/src/pure/index.ts
Signatures::
(computed .d.ts) /user/username/projects/reexport/src/pure/session.ts
(computed .d.ts) /user/username/projects/reexport/src/pure/index.ts

src/main/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.d.ts
*refresh*    /user/username/projects/reexport/out/pure/session.d.ts
*refresh*    /user/username/projects/reexport/out/pure/index.d.ts
*refresh*    /user/username/projects/reexport/src/main/index.ts
Signatures::


Edit [1]:: Fix error
//// [/user/username/projects/reexport/src/pure/session.ts] *modified* 
export interface Session {
    foo: number;
    // bar: number;
}


Output::
[2J[3J[H[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

[[90mHH:MM:SS AM[0m] Projects in this build: 
    * src/pure/tsconfig.json
    * src/main/tsconfig.json
    * src/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'src/pure/tsconfig.json' is out of date because output 'out/pure/tsconfig.tsbuildinfo' is older than input 'src/pure/session.ts'

[[90mHH:MM:SS AM[0m] Building project 'src/pure/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'src/main/tsconfig.json' is out of date because it has errors.

[[90mHH:MM:SS AM[0m] Building project 'src/main/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.

//// [/user/username/projects/reexport/out/main/index.js] *rewrite with same content*
//// [/user/username/projects/reexport/out/main/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":["../../src/main/index.ts"]}
//// [/user/username/projects/reexport/out/main/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "../../src/main/index.ts"
      ],
      "original": "../../src/main/index.ts"
    }
  ],
  "size": 62
}
//// [/user/username/projects/reexport/out/pure/index.js] *rewrite with same content*
//// [/user/username/projects/reexport/out/pure/session.d.ts] *modified* 
export interface Session {
    foo: number;
}

//// [/user/username/projects/reexport/out/pure/session.js] *rewrite with same content*
//// [/user/username/projects/reexport/out/pure/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[[2,3]],"fileNames":["lib.d.ts","../../src/pure/session.ts","../../src/pure/index.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"1beb34deefa28062ed4b4b605c69e42f-export interface Session {\n    foo: number;\n    // bar: number;\n}","signature":"90b43415bdb2993dfd8c888e444ab471-export interface Session {\n    foo: number;\n}\n","impliedNodeFormat":1},{"version":"c3b7227625b1dcb56b6fb13c17c504fe-export * from \"./session\";","signature":"14ab788547e1e852fa86d4bf1731e8c8-export * from \"./session\";\n","impliedNodeFormat":1}],"fileIdsList":[[2]],"options":{"composite":true,"outDir":"..","rootDir":"../../src"},"referencedMap":[[3,1]],"latestChangedDtsFile":"./session.d.ts"}
//// [/user/username/projects/reexport/out/pure/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "../../src/pure/session.ts",
        "../../src/pure/index.ts"
      ],
      "original": [
        2,
        3
      ]
    }
  ],
  "fileNames": [
    "lib.d.ts",
    "../../src/pure/session.ts",
    "../../src/pure/index.ts"
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
      "fileName": "../../src/pure/session.ts",
      "version": "1beb34deefa28062ed4b4b605c69e42f-export interface Session {\n    foo: number;\n    // bar: number;\n}",
      "signature": "90b43415bdb2993dfd8c888e444ab471-export interface Session {\n    foo: number;\n}\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "1beb34deefa28062ed4b4b605c69e42f-export interface Session {\n    foo: number;\n    // bar: number;\n}",
        "signature": "90b43415bdb2993dfd8c888e444ab471-export interface Session {\n    foo: number;\n}\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "../../src/pure/index.ts",
      "version": "c3b7227625b1dcb56b6fb13c17c504fe-export * from \"./session\";",
      "signature": "14ab788547e1e852fa86d4bf1731e8c8-export * from \"./session\";\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "c3b7227625b1dcb56b6fb13c17c504fe-export * from \"./session\";",
        "signature": "14ab788547e1e852fa86d4bf1731e8c8-export * from \"./session\";\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "fileIdsList": [
    [
      "../../src/pure/session.ts"
    ]
  ],
  "options": {
    "composite": true,
    "outDir": "..",
    "rootDir": "../../src"
  },
  "referencedMap": {
    "../../src/pure/index.ts": [
      "../../src/pure/session.ts"
    ]
  },
  "latestChangedDtsFile": "./session.d.ts",
  "size": 1465
}

src/pure/tsconfig.json::
SemanticDiagnostics::
*refresh*    /user/username/projects/reexport/src/pure/session.ts
*refresh*    /user/username/projects/reexport/src/pure/index.ts
Signatures::
(computed .d.ts) /user/username/projects/reexport/src/pure/session.ts
(computed .d.ts) /user/username/projects/reexport/src/pure/index.ts

src/main/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.d.ts
*refresh*    /user/username/projects/reexport/out/pure/session.d.ts
*refresh*    /user/username/projects/reexport/out/pure/index.d.ts
*refresh*    /user/username/projects/reexport/src/main/index.ts
Signatures::
