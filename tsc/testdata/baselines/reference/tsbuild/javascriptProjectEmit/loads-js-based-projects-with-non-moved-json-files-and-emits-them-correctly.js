currentDirectory::/home/src/workspaces/solution
useCaseSensitiveFileNames::true
Input::
//// [/home/src/workspaces/solution/common/index.ts] *new* 
import x = require("./obj.json");
export = x;
//// [/home/src/workspaces/solution/common/obj.json] *new* 
{
    "val": 42,
}
//// [/home/src/workspaces/solution/common/tsconfig.json] *new* 
{
    "extends": "../tsconfig.base.json",
    "compilerOptions": {
        "outDir": null,
        "composite": true,
    },
    "include": ["index.ts", "obj.json"],
}
//// [/home/src/workspaces/solution/sub-project-2/index.js] *new* 
import { m } from '../sub-project/index';

const variable = {
    key: m,
};

export function getVar() {
    return variable;
}
//// [/home/src/workspaces/solution/sub-project-2/tsconfig.json] *new* 
{
    "extends": "../tsconfig.base.json",
    "compilerOptions": {
        "composite": true,
    },
    "references": [
        { "path": "../sub-project" },
    ],
    "include": ["./index.js"],
}
//// [/home/src/workspaces/solution/sub-project/index.js] *new* 
import mod from '../common';

export const m = mod;
//// [/home/src/workspaces/solution/sub-project/tsconfig.json] *new* 
{
    "extends": "../tsconfig.base.json",
    "compilerOptions": {
        "composite": true,
    },
    "references": [
        { "path": "../common" },
    ],
    "include": ["./index.js"],
}
//// [/home/src/workspaces/solution/tsconfig.base.json] *new* 
{
    "compilerOptions": {
        "skipLibCheck": true,
        "rootDir": "./",
        "outDir": "../out",
        "allowJs": true,
        "checkJs": true,
        "resolveJsonModule": true,
        "esModuleInterop": true,
        "declaration": true,
    },
}
//// [/home/src/workspaces/solution/tsconfig.json] *new* 
{
    "compilerOptions": {
        "composite": true,
    },
    "references": [
        { "path": "./sub-project" },
        { "path": "./sub-project-2" },
    ],
    "include": [],
}

tsgo -b
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
//// [/home/src/workspaces/out/sub-project-2/index.d.ts] *new* 
export declare function getVar(): {
    key: {
        val: number;
    };
};

//// [/home/src/workspaces/out/sub-project-2/index.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVar = getVar;
const index_1 = require("../sub-project/index");
const variable = {
    key: index_1.m,
};
function getVar() {
    return variable;
}

//// [/home/src/workspaces/out/sub-project-2/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":[3],"fileNames":["lib.d.ts","../sub-project/index.d.ts","../../solution/sub-project-2/index.js"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},"b13b16e08eb0717669fa55818828b2cb-export declare const m: {\n    val: number;\n};\n",{"version":"56ecb5738c72a131a1514873df723721-import { m } from '../sub-project/index';\n\nconst variable = {\n    key: m,\n};\n\nexport function getVar() {\n    return variable;\n}","signature":"f6a0b1edad82fddabb5c98ad5da1660d-export declare function getVar(): {\n    key: {\n        val: number;\n    };\n};\n","impliedNodeFormat":1}],"fileIdsList":[[2]],"options":{"allowJs":true,"checkJs":true,"composite":true,"declaration":true,"esModuleInterop":true,"outDir":"..","rootDir":"../../solution","skipLibCheck":true},"referencedMap":[[3,1]],"latestChangedDtsFile":"./index.d.ts"}
//// [/home/src/workspaces/out/sub-project-2/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "../../solution/sub-project-2/index.js"
      ],
      "original": 3
    }
  ],
  "fileNames": [
    "lib.d.ts",
    "../sub-project/index.d.ts",
    "../../solution/sub-project-2/index.js"
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
      "fileName": "../sub-project/index.d.ts",
      "version": "b13b16e08eb0717669fa55818828b2cb-export declare const m: {\n    val: number;\n};\n",
      "signature": "b13b16e08eb0717669fa55818828b2cb-export declare const m: {\n    val: number;\n};\n",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "../../solution/sub-project-2/index.js",
      "version": "56ecb5738c72a131a1514873df723721-import { m } from '../sub-project/index';\n\nconst variable = {\n    key: m,\n};\n\nexport function getVar() {\n    return variable;\n}",
      "signature": "f6a0b1edad82fddabb5c98ad5da1660d-export declare function getVar(): {\n    key: {\n        val: number;\n    };\n};\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "56ecb5738c72a131a1514873df723721-import { m } from '../sub-project/index';\n\nconst variable = {\n    key: m,\n};\n\nexport function getVar() {\n    return variable;\n}",
        "signature": "f6a0b1edad82fddabb5c98ad5da1660d-export declare function getVar(): {\n    key: {\n        val: number;\n    };\n};\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "fileIdsList": [
    [
      "../sub-project/index.d.ts"
    ]
  ],
  "options": {
    "allowJs": true,
    "checkJs": true,
    "composite": true,
    "declaration": true,
    "esModuleInterop": true,
    "outDir": "..",
    "rootDir": "../../solution",
    "skipLibCheck": true
  },
  "referencedMap": {
    "../../solution/sub-project-2/index.js": [
      "../sub-project/index.d.ts"
    ]
  },
  "latestChangedDtsFile": "./index.d.ts",
  "size": 1580
}
//// [/home/src/workspaces/out/sub-project/index.d.ts] *new* 
export declare const m: {
    val: number;
};

//// [/home/src/workspaces/out/sub-project/index.js] *new* 
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.m = void 0;
const common_1 = __importDefault(require("../common"));
exports.m = common_1.default;

//// [/home/src/workspaces/out/sub-project/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":[4],"fileNames":["lib.d.ts","../../solution/common/obj.json","../../solution/common/index.d.ts","../../solution/sub-project/index.js"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"d47747c9a3b20f363d6de91e2bd8ed62-{\n    \"val\": 42,\n}"},"641f5162aeaa035322008b19df89c663-import x = require(\"./obj.json\");\nexport = x;\n",{"version":"4c69d0c670e9dc788b5e107f277aa8ab-import mod from '../common';\n\nexport const m = mod;","signature":"b13b16e08eb0717669fa55818828b2cb-export declare const m: {\n    val: number;\n};\n","impliedNodeFormat":1}],"fileIdsList":[[2],[3]],"options":{"allowJs":true,"checkJs":true,"composite":true,"declaration":true,"esModuleInterop":true,"outDir":"..","rootDir":"../../solution","skipLibCheck":true},"referencedMap":[[3,1],[4,2]],"latestChangedDtsFile":"./index.d.ts"}
//// [/home/src/workspaces/out/sub-project/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "../../solution/sub-project/index.js"
      ],
      "original": 4
    }
  ],
  "fileNames": [
    "lib.d.ts",
    "../../solution/common/obj.json",
    "../../solution/common/index.d.ts",
    "../../solution/sub-project/index.js"
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
      "fileName": "../../solution/common/obj.json",
      "version": "d47747c9a3b20f363d6de91e2bd8ed62-{\n    \"val\": 42,\n}",
      "signature": "d47747c9a3b20f363d6de91e2bd8ed62-{\n    \"val\": 42,\n}",
      "impliedNodeFormat": "None",
      "original": {
        "version": "d47747c9a3b20f363d6de91e2bd8ed62-{\n    \"val\": 42,\n}"
      }
    },
    {
      "fileName": "../../solution/common/index.d.ts",
      "version": "641f5162aeaa035322008b19df89c663-import x = require(\"./obj.json\");\nexport = x;\n",
      "signature": "641f5162aeaa035322008b19df89c663-import x = require(\"./obj.json\");\nexport = x;\n",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "../../solution/sub-project/index.js",
      "version": "4c69d0c670e9dc788b5e107f277aa8ab-import mod from '../common';\n\nexport const m = mod;",
      "signature": "b13b16e08eb0717669fa55818828b2cb-export declare const m: {\n    val: number;\n};\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "4c69d0c670e9dc788b5e107f277aa8ab-import mod from '../common';\n\nexport const m = mod;",
        "signature": "b13b16e08eb0717669fa55818828b2cb-export declare const m: {\n    val: number;\n};\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "fileIdsList": [
    [
      "../../solution/common/obj.json"
    ],
    [
      "../../solution/common/index.d.ts"
    ]
  ],
  "options": {
    "allowJs": true,
    "checkJs": true,
    "composite": true,
    "declaration": true,
    "esModuleInterop": true,
    "outDir": "..",
    "rootDir": "../../solution",
    "skipLibCheck": true
  },
  "referencedMap": {
    "../../solution/common/index.d.ts": [
      "../../solution/common/obj.json"
    ],
    "../../solution/sub-project/index.js": [
      "../../solution/common/index.d.ts"
    ]
  },
  "latestChangedDtsFile": "./index.d.ts",
  "size": 1583
}
//// [/home/src/workspaces/solution/common/index.d.ts] *new* 
import x = require("./obj.json");
export = x;

//// [/home/src/workspaces/solution/common/index.js] *new* 
"use strict";
const x = require("./obj.json");
module.exports = x;

//// [/home/src/workspaces/solution/common/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":[[2,3]],"fileNames":["lib.d.ts","./obj.json","./index.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"d47747c9a3b20f363d6de91e2bd8ed62-{\n    \"val\": 42,\n}"},{"version":"6d5621da1dbc82712844ae5e706b9295-import x = require(\"./obj.json\");\nexport = x;","signature":"641f5162aeaa035322008b19df89c663-import x = require(\"./obj.json\");\nexport = x;\n","impliedNodeFormat":1}],"fileIdsList":[[2]],"options":{"allowJs":true,"checkJs":true,"composite":true,"declaration":true,"esModuleInterop":true,"rootDir":"..","skipLibCheck":true},"referencedMap":[[3,1]],"latestChangedDtsFile":"./index.d.ts"}
//// [/home/src/workspaces/solution/common/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./obj.json",
        "./index.ts"
      ],
      "original": [
        2,
        3
      ]
    }
  ],
  "fileNames": [
    "lib.d.ts",
    "./obj.json",
    "./index.ts"
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
      "fileName": "./obj.json",
      "version": "d47747c9a3b20f363d6de91e2bd8ed62-{\n    \"val\": 42,\n}",
      "signature": "d47747c9a3b20f363d6de91e2bd8ed62-{\n    \"val\": 42,\n}",
      "impliedNodeFormat": "None",
      "original": {
        "version": "d47747c9a3b20f363d6de91e2bd8ed62-{\n    \"val\": 42,\n}"
      }
    },
    {
      "fileName": "./index.ts",
      "version": "6d5621da1dbc82712844ae5e706b9295-import x = require(\"./obj.json\");\nexport = x;",
      "signature": "641f5162aeaa035322008b19df89c663-import x = require(\"./obj.json\");\nexport = x;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "6d5621da1dbc82712844ae5e706b9295-import x = require(\"./obj.json\");\nexport = x;",
        "signature": "641f5162aeaa035322008b19df89c663-import x = require(\"./obj.json\");\nexport = x;\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "fileIdsList": [
    [
      "./obj.json"
    ]
  ],
  "options": {
    "allowJs": true,
    "checkJs": true,
    "composite": true,
    "declaration": true,
    "esModuleInterop": true,
    "rootDir": "..",
    "skipLibCheck": true
  },
  "referencedMap": {
    "./index.ts": [
      "./obj.json"
    ]
  },
  "latestChangedDtsFile": "./index.d.ts",
  "size": 1381
}

common/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.d.ts
*refresh*    /home/src/workspaces/solution/common/obj.json
*refresh*    /home/src/workspaces/solution/common/index.ts
Signatures::
(stored at emit) /home/src/workspaces/solution/common/index.ts

sub-project/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.d.ts
*refresh*    /home/src/workspaces/solution/common/obj.json
*refresh*    /home/src/workspaces/solution/common/index.d.ts
*refresh*    /home/src/workspaces/solution/sub-project/index.js
Signatures::
(stored at emit) /home/src/workspaces/solution/sub-project/index.js

sub-project-2/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.d.ts
*refresh*    /home/src/workspaces/out/sub-project/index.d.ts
*refresh*    /home/src/workspaces/solution/sub-project-2/index.js
Signatures::
(stored at emit) /home/src/workspaces/solution/sub-project-2/index.js
