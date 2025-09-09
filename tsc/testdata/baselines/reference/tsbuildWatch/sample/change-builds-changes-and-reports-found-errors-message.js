currentDirectory::/user/username/projects/sample1
useCaseSensitiveFileNames::true
Input::
//// [/user/username/projects/sample1/core/anotherModule.ts] *new* 
export const World = "hello";
//// [/user/username/projects/sample1/core/index.ts] *new* 
export const someString: string = "HELLO WORLD";
export function leftPad(s: string, n: number) { return s + n; }
export function multiply(a: number, b: number) { return a * b; }
//// [/user/username/projects/sample1/core/some_decl.d.ts] *new* 
declare const dts: any;
//// [/user/username/projects/sample1/core/tsconfig.json] *new* 
{
    "compilerOptions": {
        "composite": true,
        "declaration": true,
        "declarationMap": true,
        "skipDefaultLibCheck": true,
    },
}
//// [/user/username/projects/sample1/logic/index.ts] *new* 
import * as c from '../core/index';
export function getSecondsInDay() {
    return c.multiply(10, 15);
}
import * as mod from '../core/anotherModule';
export const m = mod;
//// [/user/username/projects/sample1/logic/tsconfig.json] *new* 
{
    "compilerOptions": {
        "composite": true,
        "declaration": true,
        "sourceMap": true,
        "skipDefaultLibCheck": true,
    },
    "references": [
        { "path": "../core" },
    ],
}
//// [/user/username/projects/sample1/tests/index.ts] *new* 
import * as c from '../core/index';
import * as logic from '../logic/index';

c.leftPad("", 10);
logic.getSecondsInDay();

import * as mod from '../core/anotherModule';
export const m = mod;
//// [/user/username/projects/sample1/tests/tsconfig.json] *new* 
{
    "references": [
        { "path": "../core" },
        { "path": "../logic" },
    ],
    "files": ["index.ts"],
    "compilerOptions": {
        "composite": true,
        "declaration": true,
        "skipDefaultLibCheck": true,
    },
}

tsgo --b -w tests
ExitStatus:: Success
Output::
[2J[3J[H[[90mHH:MM:SS AM[0m] Starting compilation in watch mode...

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
//// [/user/username/projects/sample1/core/anotherModule.d.ts] *new* 
export declare const World = "hello";
//# sourceMappingURL=anotherModule.d.ts.map
//// [/user/username/projects/sample1/core/anotherModule.d.ts.map] *new* 
{"version":3,"file":"anotherModule.d.ts","sourceRoot":"","sources":["anotherModule.ts"],"names":[],"mappings":"AAAA,eAAO,MAAM,KAAK,UAAU,CAAC"}
//// [/user/username/projects/sample1/core/anotherModule.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.World = void 0;
exports.World = "hello";

//// [/user/username/projects/sample1/core/index.d.ts] *new* 
export declare const someString: string;
export declare function leftPad(s: string, n: number): string;
export declare function multiply(a: number, b: number): number;
//# sourceMappingURL=index.d.ts.map
//// [/user/username/projects/sample1/core/index.d.ts.map] *new* 
{"version":3,"file":"index.d.ts","sourceRoot":"","sources":["index.ts"],"names":[],"mappings":"AAAA,eAAO,MAAM,UAAU,EAAE,MAAsB,CAAC;AAChD,wBAAgB,OAAO,CAAC,CAAC,EAAE,MAAM,EAAE,CAAC,EAAE,MAAM,UAAmB;AAC/D,wBAAgB,QAAQ,CAAC,CAAC,EAAE,MAAM,EAAE,CAAC,EAAE,MAAM,UAAmB"}
//// [/user/username/projects/sample1/core/index.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.someString = void 0;
exports.leftPad = leftPad;
exports.multiply = multiply;
exports.someString = "HELLO WORLD";
function leftPad(s, n) { return s + n; }
function multiply(a, b) { return a * b; }

//// [/user/username/projects/sample1/core/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":[[2,4]],"fileNames":["lib.d.ts","./anotherModule.ts","./index.ts","./some_decl.d.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"19cd44ed7278957051fca663f821c916-export const World = \"hello\";","signature":"5aad0de3e7b08bb6e110c7b97361b89e-export declare const World = \"hello\";\n","impliedNodeFormat":1},{"version":"2753a1085d587a7d57069e1105af24ec-export const someString: string = \"HELLO WORLD\";\nexport function leftPad(s: string, n: number) { return s + n; }\nexport function multiply(a: number, b: number) { return a * b; }","signature":"da642d80443e7ccd327091080a82a43c-export declare const someString: string;\nexport declare function leftPad(s: string, n: number): string;\nexport declare function multiply(a: number, b: number): number;\n","impliedNodeFormat":1},{"version":"6ceab83400a6167be2fb5feab881ded0-declare const dts: any;","affectsGlobalScope":true,"impliedNodeFormat":1}],"options":{"composite":true,"declaration":true,"declarationMap":true,"skipDefaultLibCheck":true},"latestChangedDtsFile":"./index.d.ts"}
//// [/user/username/projects/sample1/core/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./anotherModule.ts",
        "./index.ts",
        "./some_decl.d.ts"
      ],
      "original": [
        2,
        4
      ]
    }
  ],
  "fileNames": [
    "lib.d.ts",
    "./anotherModule.ts",
    "./index.ts",
    "./some_decl.d.ts"
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
      "fileName": "./anotherModule.ts",
      "version": "19cd44ed7278957051fca663f821c916-export const World = \"hello\";",
      "signature": "5aad0de3e7b08bb6e110c7b97361b89e-export declare const World = \"hello\";\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "19cd44ed7278957051fca663f821c916-export const World = \"hello\";",
        "signature": "5aad0de3e7b08bb6e110c7b97361b89e-export declare const World = \"hello\";\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./index.ts",
      "version": "2753a1085d587a7d57069e1105af24ec-export const someString: string = \"HELLO WORLD\";\nexport function leftPad(s: string, n: number) { return s + n; }\nexport function multiply(a: number, b: number) { return a * b; }",
      "signature": "da642d80443e7ccd327091080a82a43c-export declare const someString: string;\nexport declare function leftPad(s: string, n: number): string;\nexport declare function multiply(a: number, b: number): number;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "2753a1085d587a7d57069e1105af24ec-export const someString: string = \"HELLO WORLD\";\nexport function leftPad(s: string, n: number) { return s + n; }\nexport function multiply(a: number, b: number) { return a * b; }",
        "signature": "da642d80443e7ccd327091080a82a43c-export declare const someString: string;\nexport declare function leftPad(s: string, n: number): string;\nexport declare function multiply(a: number, b: number): number;\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./some_decl.d.ts",
      "version": "6ceab83400a6167be2fb5feab881ded0-declare const dts: any;",
      "signature": "6ceab83400a6167be2fb5feab881ded0-declare const dts: any;",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "6ceab83400a6167be2fb5feab881ded0-declare const dts: any;",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    }
  ],
  "options": {
    "composite": true,
    "declaration": true,
    "declarationMap": true,
    "skipDefaultLibCheck": true
  },
  "latestChangedDtsFile": "./index.d.ts",
  "size": 1818
}
//// [/user/username/projects/sample1/logic/index.d.ts] *new* 
export declare function getSecondsInDay(): number;
import * as mod from '../core/anotherModule';
export declare const m: typeof mod;

//// [/user/username/projects/sample1/logic/index.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.m = void 0;
exports.getSecondsInDay = getSecondsInDay;
const c = require("../core/index");
function getSecondsInDay() {
    return c.multiply(10, 15);
}
const mod = require("../core/anotherModule");
exports.m = mod;
//# sourceMappingURL=index.js.map
//// [/user/username/projects/sample1/logic/index.js.map] *new* 
{"version":3,"file":"index.js","sourceRoot":"","sources":["index.ts"],"names":[],"mappings":";;;;AAAA,MAAY,CAAC,4BAAsB;AACnC,2BAAkC;IAC9B,OAAO,CAAC,CAAC,QAAQ,CAAC,EAAE,EAAE,EAAE,CAAC,CAAC;AAAA,CAC7B;AACD,MAAY,GAAG,oCAA8B;AAChC,QAAA,CAAC,GAAG,GAAG,CAAC"}
//// [/user/username/projects/sample1/logic/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":[4],"fileNames":["lib.d.ts","../core/index.d.ts","../core/anotherModule.d.ts","./index.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},"fc70810d80f598d415c6f21c113a400b-export declare const someString: string;\nexport declare function leftPad(s: string, n: number): string;\nexport declare function multiply(a: number, b: number): number;\n//# sourceMappingURL=index.d.ts.map","5ef600f6f6585506cfe942fc161e76c5-export declare const World = \"hello\";\n//# sourceMappingURL=anotherModule.d.ts.map",{"version":"590556060bc156a64834010df8cda255-import * as c from '../core/index';\nexport function getSecondsInDay() {\n    return c.multiply(10, 15);\n}\nimport * as mod from '../core/anotherModule';\nexport const m = mod;","signature":"487f7216384ec40e22ff7dc40c01be4b-export declare function getSecondsInDay(): number;\nimport * as mod from '../core/anotherModule';\nexport declare const m: typeof mod;\n","impliedNodeFormat":1}],"fileIdsList":[[2,3]],"options":{"composite":true,"declaration":true,"skipDefaultLibCheck":true,"sourceMap":true},"referencedMap":[[4,1]],"latestChangedDtsFile":"./index.d.ts"}
//// [/user/username/projects/sample1/logic/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./index.ts"
      ],
      "original": 4
    }
  ],
  "fileNames": [
    "lib.d.ts",
    "../core/index.d.ts",
    "../core/anotherModule.d.ts",
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
      "fileName": "../core/index.d.ts",
      "version": "fc70810d80f598d415c6f21c113a400b-export declare const someString: string;\nexport declare function leftPad(s: string, n: number): string;\nexport declare function multiply(a: number, b: number): number;\n//# sourceMappingURL=index.d.ts.map",
      "signature": "fc70810d80f598d415c6f21c113a400b-export declare const someString: string;\nexport declare function leftPad(s: string, n: number): string;\nexport declare function multiply(a: number, b: number): number;\n//# sourceMappingURL=index.d.ts.map",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "../core/anotherModule.d.ts",
      "version": "5ef600f6f6585506cfe942fc161e76c5-export declare const World = \"hello\";\n//# sourceMappingURL=anotherModule.d.ts.map",
      "signature": "5ef600f6f6585506cfe942fc161e76c5-export declare const World = \"hello\";\n//# sourceMappingURL=anotherModule.d.ts.map",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "./index.ts",
      "version": "590556060bc156a64834010df8cda255-import * as c from '../core/index';\nexport function getSecondsInDay() {\n    return c.multiply(10, 15);\n}\nimport * as mod from '../core/anotherModule';\nexport const m = mod;",
      "signature": "487f7216384ec40e22ff7dc40c01be4b-export declare function getSecondsInDay(): number;\nimport * as mod from '../core/anotherModule';\nexport declare const m: typeof mod;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "590556060bc156a64834010df8cda255-import * as c from '../core/index';\nexport function getSecondsInDay() {\n    return c.multiply(10, 15);\n}\nimport * as mod from '../core/anotherModule';\nexport const m = mod;",
        "signature": "487f7216384ec40e22ff7dc40c01be4b-export declare function getSecondsInDay(): number;\nimport * as mod from '../core/anotherModule';\nexport declare const m: typeof mod;\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "fileIdsList": [
    [
      "../core/index.d.ts",
      "../core/anotherModule.d.ts"
    ]
  ],
  "options": {
    "composite": true,
    "declaration": true,
    "skipDefaultLibCheck": true,
    "sourceMap": true
  },
  "referencedMap": {
    "./index.ts": [
      "../core/index.d.ts",
      "../core/anotherModule.d.ts"
    ]
  },
  "latestChangedDtsFile": "./index.d.ts",
  "size": 1879
}
//// [/user/username/projects/sample1/tests/index.d.ts] *new* 
import * as mod from '../core/anotherModule';
export declare const m: typeof mod;

//// [/user/username/projects/sample1/tests/index.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.m = void 0;
const c = require("../core/index");
const logic = require("../logic/index");
c.leftPad("", 10);
logic.getSecondsInDay();
const mod = require("../core/anotherModule");
exports.m = mod;

//// [/user/username/projects/sample1/tests/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":[5],"fileNames":["lib.d.ts","../core/index.d.ts","../core/anotherModule.d.ts","../logic/index.d.ts","./index.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},"fc70810d80f598d415c6f21c113a400b-export declare const someString: string;\nexport declare function leftPad(s: string, n: number): string;\nexport declare function multiply(a: number, b: number): number;\n//# sourceMappingURL=index.d.ts.map","5ef600f6f6585506cfe942fc161e76c5-export declare const World = \"hello\";\n//# sourceMappingURL=anotherModule.d.ts.map","487f7216384ec40e22ff7dc40c01be4b-export declare function getSecondsInDay(): number;\nimport * as mod from '../core/anotherModule';\nexport declare const m: typeof mod;\n",{"version":"7fa4162f733e6b9e7f7d9d9410e62f61-import * as c from '../core/index';\nimport * as logic from '../logic/index';\n\nc.leftPad(\"\", 10);\nlogic.getSecondsInDay();\n\nimport * as mod from '../core/anotherModule';\nexport const m = mod;","signature":"4b3c99afe665034856f74c660f74d6fd-import * as mod from '../core/anotherModule';\nexport declare const m: typeof mod;\n","impliedNodeFormat":1}],"fileIdsList":[[3],[2,3,4]],"options":{"composite":true,"declaration":true,"skipDefaultLibCheck":true},"referencedMap":[[4,1],[5,2]],"latestChangedDtsFile":"./index.d.ts"}
//// [/user/username/projects/sample1/tests/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./index.ts"
      ],
      "original": 5
    }
  ],
  "fileNames": [
    "lib.d.ts",
    "../core/index.d.ts",
    "../core/anotherModule.d.ts",
    "../logic/index.d.ts",
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
      "fileName": "../core/index.d.ts",
      "version": "fc70810d80f598d415c6f21c113a400b-export declare const someString: string;\nexport declare function leftPad(s: string, n: number): string;\nexport declare function multiply(a: number, b: number): number;\n//# sourceMappingURL=index.d.ts.map",
      "signature": "fc70810d80f598d415c6f21c113a400b-export declare const someString: string;\nexport declare function leftPad(s: string, n: number): string;\nexport declare function multiply(a: number, b: number): number;\n//# sourceMappingURL=index.d.ts.map",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "../core/anotherModule.d.ts",
      "version": "5ef600f6f6585506cfe942fc161e76c5-export declare const World = \"hello\";\n//# sourceMappingURL=anotherModule.d.ts.map",
      "signature": "5ef600f6f6585506cfe942fc161e76c5-export declare const World = \"hello\";\n//# sourceMappingURL=anotherModule.d.ts.map",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "../logic/index.d.ts",
      "version": "487f7216384ec40e22ff7dc40c01be4b-export declare function getSecondsInDay(): number;\nimport * as mod from '../core/anotherModule';\nexport declare const m: typeof mod;\n",
      "signature": "487f7216384ec40e22ff7dc40c01be4b-export declare function getSecondsInDay(): number;\nimport * as mod from '../core/anotherModule';\nexport declare const m: typeof mod;\n",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "./index.ts",
      "version": "7fa4162f733e6b9e7f7d9d9410e62f61-import * as c from '../core/index';\nimport * as logic from '../logic/index';\n\nc.leftPad(\"\", 10);\nlogic.getSecondsInDay();\n\nimport * as mod from '../core/anotherModule';\nexport const m = mod;",
      "signature": "4b3c99afe665034856f74c660f74d6fd-import * as mod from '../core/anotherModule';\nexport declare const m: typeof mod;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "7fa4162f733e6b9e7f7d9d9410e62f61-import * as c from '../core/index';\nimport * as logic from '../logic/index';\n\nc.leftPad(\"\", 10);\nlogic.getSecondsInDay();\n\nimport * as mod from '../core/anotherModule';\nexport const m = mod;",
        "signature": "4b3c99afe665034856f74c660f74d6fd-import * as mod from '../core/anotherModule';\nexport declare const m: typeof mod;\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "fileIdsList": [
    [
      "../core/anotherModule.d.ts"
    ],
    [
      "../core/index.d.ts",
      "../core/anotherModule.d.ts",
      "../logic/index.d.ts"
    ]
  ],
  "options": {
    "composite": true,
    "declaration": true,
    "skipDefaultLibCheck": true
  },
  "referencedMap": {
    "../logic/index.d.ts": [
      "../core/anotherModule.d.ts"
    ],
    "./index.ts": [
      "../core/index.d.ts",
      "../core/anotherModule.d.ts",
      "../logic/index.d.ts"
    ]
  },
  "latestChangedDtsFile": "./index.d.ts",
  "size": 2038
}

core/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.d.ts
*refresh*    /user/username/projects/sample1/core/anotherModule.ts
*refresh*    /user/username/projects/sample1/core/index.ts
*refresh*    /user/username/projects/sample1/core/some_decl.d.ts
Signatures::
(stored at emit) /user/username/projects/sample1/core/anotherModule.ts
(stored at emit) /user/username/projects/sample1/core/index.ts

logic/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.d.ts
*refresh*    /user/username/projects/sample1/core/index.d.ts
*refresh*    /user/username/projects/sample1/core/anotherModule.d.ts
*refresh*    /user/username/projects/sample1/logic/index.ts
Signatures::
(stored at emit) /user/username/projects/sample1/logic/index.ts

tests/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.d.ts
*refresh*    /user/username/projects/sample1/core/index.d.ts
*refresh*    /user/username/projects/sample1/core/anotherModule.d.ts
*refresh*    /user/username/projects/sample1/logic/index.d.ts
*refresh*    /user/username/projects/sample1/tests/index.ts
Signatures::
(stored at emit) /user/username/projects/sample1/tests/index.ts


Edit [0]:: Make change to core
//// [/user/username/projects/sample1/core/index.ts] *modified* 
export const someString: string = "HELLO WORLD";
export function leftPad(s: string, n: number) { return s + n; }
export function multiply(a: number, b: number) { return a * b; }
export class someClass { }


Output::
[2J[3J[H[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.

//// [/user/username/projects/sample1/core/index.d.ts] *modified* 
export declare const someString: string;
export declare function leftPad(s: string, n: number): string;
export declare function multiply(a: number, b: number): number;
export declare class someClass {
}
//# sourceMappingURL=index.d.ts.map
//// [/user/username/projects/sample1/core/index.d.ts.map] *modified* 
{"version":3,"file":"index.d.ts","sourceRoot":"","sources":["index.ts"],"names":[],"mappings":"AAAA,eAAO,MAAM,UAAU,EAAE,MAAsB,CAAC;AAChD,wBAAgB,OAAO,CAAC,CAAC,EAAE,MAAM,EAAE,CAAC,EAAE,MAAM,UAAmB;AAC/D,wBAAgB,QAAQ,CAAC,CAAC,EAAE,MAAM,EAAE,CAAC,EAAE,MAAM,UAAmB;AAChE,qBAAa,SAAS;CAAI"}
//// [/user/username/projects/sample1/core/index.js] *modified* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.someClass = exports.someString = void 0;
exports.leftPad = leftPad;
exports.multiply = multiply;
exports.someString = "HELLO WORLD";
function leftPad(s, n) { return s + n; }
function multiply(a, b) { return a * b; }
class someClass {
}
exports.someClass = someClass;

//// [/user/username/projects/sample1/core/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[[2,4]],"fileNames":["lib.d.ts","./anotherModule.ts","./index.ts","./some_decl.d.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"19cd44ed7278957051fca663f821c916-export const World = \"hello\";","signature":"5aad0de3e7b08bb6e110c7b97361b89e-export declare const World = \"hello\";\n","impliedNodeFormat":1},{"version":"ce98c7b232474711a6089b586825cf2a-export const someString: string = \"HELLO WORLD\";\nexport function leftPad(s: string, n: number) { return s + n; }\nexport function multiply(a: number, b: number) { return a * b; }\nexport class someClass { }","signature":"f678e4b80b87bcfac584b8a641b31960-export declare const someString: string;\nexport declare function leftPad(s: string, n: number): string;\nexport declare function multiply(a: number, b: number): number;\nexport declare class someClass {\n}\n","impliedNodeFormat":1},{"version":"6ceab83400a6167be2fb5feab881ded0-declare const dts: any;","affectsGlobalScope":true,"impliedNodeFormat":1}],"options":{"composite":true,"declaration":true,"declarationMap":true,"skipDefaultLibCheck":true},"latestChangedDtsFile":"./index.d.ts"}
//// [/user/username/projects/sample1/core/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./anotherModule.ts",
        "./index.ts",
        "./some_decl.d.ts"
      ],
      "original": [
        2,
        4
      ]
    }
  ],
  "fileNames": [
    "lib.d.ts",
    "./anotherModule.ts",
    "./index.ts",
    "./some_decl.d.ts"
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
      "fileName": "./anotherModule.ts",
      "version": "19cd44ed7278957051fca663f821c916-export const World = \"hello\";",
      "signature": "5aad0de3e7b08bb6e110c7b97361b89e-export declare const World = \"hello\";\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "19cd44ed7278957051fca663f821c916-export const World = \"hello\";",
        "signature": "5aad0de3e7b08bb6e110c7b97361b89e-export declare const World = \"hello\";\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./index.ts",
      "version": "ce98c7b232474711a6089b586825cf2a-export const someString: string = \"HELLO WORLD\";\nexport function leftPad(s: string, n: number) { return s + n; }\nexport function multiply(a: number, b: number) { return a * b; }\nexport class someClass { }",
      "signature": "f678e4b80b87bcfac584b8a641b31960-export declare const someString: string;\nexport declare function leftPad(s: string, n: number): string;\nexport declare function multiply(a: number, b: number): number;\nexport declare class someClass {\n}\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "ce98c7b232474711a6089b586825cf2a-export const someString: string = \"HELLO WORLD\";\nexport function leftPad(s: string, n: number) { return s + n; }\nexport function multiply(a: number, b: number) { return a * b; }\nexport class someClass { }",
        "signature": "f678e4b80b87bcfac584b8a641b31960-export declare const someString: string;\nexport declare function leftPad(s: string, n: number): string;\nexport declare function multiply(a: number, b: number): number;\nexport declare class someClass {\n}\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./some_decl.d.ts",
      "version": "6ceab83400a6167be2fb5feab881ded0-declare const dts: any;",
      "signature": "6ceab83400a6167be2fb5feab881ded0-declare const dts: any;",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "6ceab83400a6167be2fb5feab881ded0-declare const dts: any;",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    }
  ],
  "options": {
    "composite": true,
    "declaration": true,
    "declarationMap": true,
    "skipDefaultLibCheck": true
  },
  "latestChangedDtsFile": "./index.d.ts",
  "size": 1883
}
//// [/user/username/projects/sample1/logic/index.js] *rewrite with same content*
//// [/user/username/projects/sample1/logic/index.js.map] *rewrite with same content*
//// [/user/username/projects/sample1/logic/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[4],"fileNames":["lib.d.ts","../core/index.d.ts","../core/anotherModule.d.ts","./index.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},"4c69c21de8985cc5cf2addb044c738b6-export declare const someString: string;\nexport declare function leftPad(s: string, n: number): string;\nexport declare function multiply(a: number, b: number): number;\nexport declare class someClass {\n}\n//# sourceMappingURL=index.d.ts.map","5ef600f6f6585506cfe942fc161e76c5-export declare const World = \"hello\";\n//# sourceMappingURL=anotherModule.d.ts.map",{"version":"590556060bc156a64834010df8cda255-import * as c from '../core/index';\nexport function getSecondsInDay() {\n    return c.multiply(10, 15);\n}\nimport * as mod from '../core/anotherModule';\nexport const m = mod;","signature":"487f7216384ec40e22ff7dc40c01be4b-export declare function getSecondsInDay(): number;\nimport * as mod from '../core/anotherModule';\nexport declare const m: typeof mod;\n","impliedNodeFormat":1}],"fileIdsList":[[2,3]],"options":{"composite":true,"declaration":true,"skipDefaultLibCheck":true,"sourceMap":true},"referencedMap":[[4,1]],"latestChangedDtsFile":"./index.d.ts"}
//// [/user/username/projects/sample1/logic/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./index.ts"
      ],
      "original": 4
    }
  ],
  "fileNames": [
    "lib.d.ts",
    "../core/index.d.ts",
    "../core/anotherModule.d.ts",
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
      "fileName": "../core/index.d.ts",
      "version": "4c69c21de8985cc5cf2addb044c738b6-export declare const someString: string;\nexport declare function leftPad(s: string, n: number): string;\nexport declare function multiply(a: number, b: number): number;\nexport declare class someClass {\n}\n//# sourceMappingURL=index.d.ts.map",
      "signature": "4c69c21de8985cc5cf2addb044c738b6-export declare const someString: string;\nexport declare function leftPad(s: string, n: number): string;\nexport declare function multiply(a: number, b: number): number;\nexport declare class someClass {\n}\n//# sourceMappingURL=index.d.ts.map",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "../core/anotherModule.d.ts",
      "version": "5ef600f6f6585506cfe942fc161e76c5-export declare const World = \"hello\";\n//# sourceMappingURL=anotherModule.d.ts.map",
      "signature": "5ef600f6f6585506cfe942fc161e76c5-export declare const World = \"hello\";\n//# sourceMappingURL=anotherModule.d.ts.map",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "./index.ts",
      "version": "590556060bc156a64834010df8cda255-import * as c from '../core/index';\nexport function getSecondsInDay() {\n    return c.multiply(10, 15);\n}\nimport * as mod from '../core/anotherModule';\nexport const m = mod;",
      "signature": "487f7216384ec40e22ff7dc40c01be4b-export declare function getSecondsInDay(): number;\nimport * as mod from '../core/anotherModule';\nexport declare const m: typeof mod;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "590556060bc156a64834010df8cda255-import * as c from '../core/index';\nexport function getSecondsInDay() {\n    return c.multiply(10, 15);\n}\nimport * as mod from '../core/anotherModule';\nexport const m = mod;",
        "signature": "487f7216384ec40e22ff7dc40c01be4b-export declare function getSecondsInDay(): number;\nimport * as mod from '../core/anotherModule';\nexport declare const m: typeof mod;\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "fileIdsList": [
    [
      "../core/index.d.ts",
      "../core/anotherModule.d.ts"
    ]
  ],
  "options": {
    "composite": true,
    "declaration": true,
    "skipDefaultLibCheck": true,
    "sourceMap": true
  },
  "referencedMap": {
    "./index.ts": [
      "../core/index.d.ts",
      "../core/anotherModule.d.ts"
    ]
  },
  "latestChangedDtsFile": "./index.d.ts",
  "size": 1916
}
//// [/user/username/projects/sample1/tests/index.js] *rewrite with same content*
//// [/user/username/projects/sample1/tests/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[5],"fileNames":["lib.d.ts","../core/index.d.ts","../core/anotherModule.d.ts","../logic/index.d.ts","./index.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},"4c69c21de8985cc5cf2addb044c738b6-export declare const someString: string;\nexport declare function leftPad(s: string, n: number): string;\nexport declare function multiply(a: number, b: number): number;\nexport declare class someClass {\n}\n//# sourceMappingURL=index.d.ts.map","5ef600f6f6585506cfe942fc161e76c5-export declare const World = \"hello\";\n//# sourceMappingURL=anotherModule.d.ts.map","487f7216384ec40e22ff7dc40c01be4b-export declare function getSecondsInDay(): number;\nimport * as mod from '../core/anotherModule';\nexport declare const m: typeof mod;\n",{"version":"7fa4162f733e6b9e7f7d9d9410e62f61-import * as c from '../core/index';\nimport * as logic from '../logic/index';\n\nc.leftPad(\"\", 10);\nlogic.getSecondsInDay();\n\nimport * as mod from '../core/anotherModule';\nexport const m = mod;","signature":"4b3c99afe665034856f74c660f74d6fd-import * as mod from '../core/anotherModule';\nexport declare const m: typeof mod;\n","impliedNodeFormat":1}],"fileIdsList":[[3],[2,3,4]],"options":{"composite":true,"declaration":true,"skipDefaultLibCheck":true},"referencedMap":[[4,1],[5,2]],"latestChangedDtsFile":"./index.d.ts"}
//// [/user/username/projects/sample1/tests/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./index.ts"
      ],
      "original": 5
    }
  ],
  "fileNames": [
    "lib.d.ts",
    "../core/index.d.ts",
    "../core/anotherModule.d.ts",
    "../logic/index.d.ts",
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
      "fileName": "../core/index.d.ts",
      "version": "4c69c21de8985cc5cf2addb044c738b6-export declare const someString: string;\nexport declare function leftPad(s: string, n: number): string;\nexport declare function multiply(a: number, b: number): number;\nexport declare class someClass {\n}\n//# sourceMappingURL=index.d.ts.map",
      "signature": "4c69c21de8985cc5cf2addb044c738b6-export declare const someString: string;\nexport declare function leftPad(s: string, n: number): string;\nexport declare function multiply(a: number, b: number): number;\nexport declare class someClass {\n}\n//# sourceMappingURL=index.d.ts.map",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "../core/anotherModule.d.ts",
      "version": "5ef600f6f6585506cfe942fc161e76c5-export declare const World = \"hello\";\n//# sourceMappingURL=anotherModule.d.ts.map",
      "signature": "5ef600f6f6585506cfe942fc161e76c5-export declare const World = \"hello\";\n//# sourceMappingURL=anotherModule.d.ts.map",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "../logic/index.d.ts",
      "version": "487f7216384ec40e22ff7dc40c01be4b-export declare function getSecondsInDay(): number;\nimport * as mod from '../core/anotherModule';\nexport declare const m: typeof mod;\n",
      "signature": "487f7216384ec40e22ff7dc40c01be4b-export declare function getSecondsInDay(): number;\nimport * as mod from '../core/anotherModule';\nexport declare const m: typeof mod;\n",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "./index.ts",
      "version": "7fa4162f733e6b9e7f7d9d9410e62f61-import * as c from '../core/index';\nimport * as logic from '../logic/index';\n\nc.leftPad(\"\", 10);\nlogic.getSecondsInDay();\n\nimport * as mod from '../core/anotherModule';\nexport const m = mod;",
      "signature": "4b3c99afe665034856f74c660f74d6fd-import * as mod from '../core/anotherModule';\nexport declare const m: typeof mod;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "7fa4162f733e6b9e7f7d9d9410e62f61-import * as c from '../core/index';\nimport * as logic from '../logic/index';\n\nc.leftPad(\"\", 10);\nlogic.getSecondsInDay();\n\nimport * as mod from '../core/anotherModule';\nexport const m = mod;",
        "signature": "4b3c99afe665034856f74c660f74d6fd-import * as mod from '../core/anotherModule';\nexport declare const m: typeof mod;\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "fileIdsList": [
    [
      "../core/anotherModule.d.ts"
    ],
    [
      "../core/index.d.ts",
      "../core/anotherModule.d.ts",
      "../logic/index.d.ts"
    ]
  ],
  "options": {
    "composite": true,
    "declaration": true,
    "skipDefaultLibCheck": true
  },
  "referencedMap": {
    "../logic/index.d.ts": [
      "../core/anotherModule.d.ts"
    ],
    "./index.ts": [
      "../core/index.d.ts",
      "../core/anotherModule.d.ts",
      "../logic/index.d.ts"
    ]
  },
  "latestChangedDtsFile": "./index.d.ts",
  "size": 2075
}

core/tsconfig.json::
SemanticDiagnostics::
*refresh*    /user/username/projects/sample1/core/index.ts
Signatures::
(computed .d.ts) /user/username/projects/sample1/core/index.ts

logic/tsconfig.json::
SemanticDiagnostics::
*refresh*    /user/username/projects/sample1/core/index.d.ts
*refresh*    /user/username/projects/sample1/logic/index.ts
Signatures::
(used version)   /user/username/projects/sample1/core/index.d.ts
(computed .d.ts) /user/username/projects/sample1/logic/index.ts

tests/tsconfig.json::
SemanticDiagnostics::
*refresh*    /user/username/projects/sample1/core/index.d.ts
*refresh*    /user/username/projects/sample1/tests/index.ts
Signatures::
(used version)   /user/username/projects/sample1/core/index.d.ts
(computed .d.ts) /user/username/projects/sample1/tests/index.ts


Edit [1]:: Revert core file
//// [/user/username/projects/sample1/core/index.ts] *modified* 
export const someString: string = "HELLO WORLD";
export function leftPad(s: string, n: number) { return s + n; }
export function multiply(a: number, b: number) { return a * b; }


Output::
[2J[3J[H[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.

//// [/user/username/projects/sample1/core/index.d.ts] *modified* 
export declare const someString: string;
export declare function leftPad(s: string, n: number): string;
export declare function multiply(a: number, b: number): number;
//# sourceMappingURL=index.d.ts.map
//// [/user/username/projects/sample1/core/index.d.ts.map] *modified* 
{"version":3,"file":"index.d.ts","sourceRoot":"","sources":["index.ts"],"names":[],"mappings":"AAAA,eAAO,MAAM,UAAU,EAAE,MAAsB,CAAC;AAChD,wBAAgB,OAAO,CAAC,CAAC,EAAE,MAAM,EAAE,CAAC,EAAE,MAAM,UAAmB;AAC/D,wBAAgB,QAAQ,CAAC,CAAC,EAAE,MAAM,EAAE,CAAC,EAAE,MAAM,UAAmB"}
//// [/user/username/projects/sample1/core/index.js] *modified* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.someString = void 0;
exports.leftPad = leftPad;
exports.multiply = multiply;
exports.someString = "HELLO WORLD";
function leftPad(s, n) { return s + n; }
function multiply(a, b) { return a * b; }

//// [/user/username/projects/sample1/core/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[[2,4]],"fileNames":["lib.d.ts","./anotherModule.ts","./index.ts","./some_decl.d.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"19cd44ed7278957051fca663f821c916-export const World = \"hello\";","signature":"5aad0de3e7b08bb6e110c7b97361b89e-export declare const World = \"hello\";\n","impliedNodeFormat":1},{"version":"2753a1085d587a7d57069e1105af24ec-export const someString: string = \"HELLO WORLD\";\nexport function leftPad(s: string, n: number) { return s + n; }\nexport function multiply(a: number, b: number) { return a * b; }","signature":"da642d80443e7ccd327091080a82a43c-export declare const someString: string;\nexport declare function leftPad(s: string, n: number): string;\nexport declare function multiply(a: number, b: number): number;\n","impliedNodeFormat":1},{"version":"6ceab83400a6167be2fb5feab881ded0-declare const dts: any;","affectsGlobalScope":true,"impliedNodeFormat":1}],"options":{"composite":true,"declaration":true,"declarationMap":true,"skipDefaultLibCheck":true},"latestChangedDtsFile":"./index.d.ts"}
//// [/user/username/projects/sample1/core/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./anotherModule.ts",
        "./index.ts",
        "./some_decl.d.ts"
      ],
      "original": [
        2,
        4
      ]
    }
  ],
  "fileNames": [
    "lib.d.ts",
    "./anotherModule.ts",
    "./index.ts",
    "./some_decl.d.ts"
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
      "fileName": "./anotherModule.ts",
      "version": "19cd44ed7278957051fca663f821c916-export const World = \"hello\";",
      "signature": "5aad0de3e7b08bb6e110c7b97361b89e-export declare const World = \"hello\";\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "19cd44ed7278957051fca663f821c916-export const World = \"hello\";",
        "signature": "5aad0de3e7b08bb6e110c7b97361b89e-export declare const World = \"hello\";\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./index.ts",
      "version": "2753a1085d587a7d57069e1105af24ec-export const someString: string = \"HELLO WORLD\";\nexport function leftPad(s: string, n: number) { return s + n; }\nexport function multiply(a: number, b: number) { return a * b; }",
      "signature": "da642d80443e7ccd327091080a82a43c-export declare const someString: string;\nexport declare function leftPad(s: string, n: number): string;\nexport declare function multiply(a: number, b: number): number;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "2753a1085d587a7d57069e1105af24ec-export const someString: string = \"HELLO WORLD\";\nexport function leftPad(s: string, n: number) { return s + n; }\nexport function multiply(a: number, b: number) { return a * b; }",
        "signature": "da642d80443e7ccd327091080a82a43c-export declare const someString: string;\nexport declare function leftPad(s: string, n: number): string;\nexport declare function multiply(a: number, b: number): number;\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./some_decl.d.ts",
      "version": "6ceab83400a6167be2fb5feab881ded0-declare const dts: any;",
      "signature": "6ceab83400a6167be2fb5feab881ded0-declare const dts: any;",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "6ceab83400a6167be2fb5feab881ded0-declare const dts: any;",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    }
  ],
  "options": {
    "composite": true,
    "declaration": true,
    "declarationMap": true,
    "skipDefaultLibCheck": true
  },
  "latestChangedDtsFile": "./index.d.ts",
  "size": 1818
}
//// [/user/username/projects/sample1/logic/index.js] *rewrite with same content*
//// [/user/username/projects/sample1/logic/index.js.map] *rewrite with same content*
//// [/user/username/projects/sample1/logic/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[4],"fileNames":["lib.d.ts","../core/index.d.ts","../core/anotherModule.d.ts","./index.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},"fc70810d80f598d415c6f21c113a400b-export declare const someString: string;\nexport declare function leftPad(s: string, n: number): string;\nexport declare function multiply(a: number, b: number): number;\n//# sourceMappingURL=index.d.ts.map","5ef600f6f6585506cfe942fc161e76c5-export declare const World = \"hello\";\n//# sourceMappingURL=anotherModule.d.ts.map",{"version":"590556060bc156a64834010df8cda255-import * as c from '../core/index';\nexport function getSecondsInDay() {\n    return c.multiply(10, 15);\n}\nimport * as mod from '../core/anotherModule';\nexport const m = mod;","signature":"487f7216384ec40e22ff7dc40c01be4b-export declare function getSecondsInDay(): number;\nimport * as mod from '../core/anotherModule';\nexport declare const m: typeof mod;\n","impliedNodeFormat":1}],"fileIdsList":[[2,3]],"options":{"composite":true,"declaration":true,"skipDefaultLibCheck":true,"sourceMap":true},"referencedMap":[[4,1]],"latestChangedDtsFile":"./index.d.ts"}
//// [/user/username/projects/sample1/logic/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./index.ts"
      ],
      "original": 4
    }
  ],
  "fileNames": [
    "lib.d.ts",
    "../core/index.d.ts",
    "../core/anotherModule.d.ts",
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
      "fileName": "../core/index.d.ts",
      "version": "fc70810d80f598d415c6f21c113a400b-export declare const someString: string;\nexport declare function leftPad(s: string, n: number): string;\nexport declare function multiply(a: number, b: number): number;\n//# sourceMappingURL=index.d.ts.map",
      "signature": "fc70810d80f598d415c6f21c113a400b-export declare const someString: string;\nexport declare function leftPad(s: string, n: number): string;\nexport declare function multiply(a: number, b: number): number;\n//# sourceMappingURL=index.d.ts.map",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "../core/anotherModule.d.ts",
      "version": "5ef600f6f6585506cfe942fc161e76c5-export declare const World = \"hello\";\n//# sourceMappingURL=anotherModule.d.ts.map",
      "signature": "5ef600f6f6585506cfe942fc161e76c5-export declare const World = \"hello\";\n//# sourceMappingURL=anotherModule.d.ts.map",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "./index.ts",
      "version": "590556060bc156a64834010df8cda255-import * as c from '../core/index';\nexport function getSecondsInDay() {\n    return c.multiply(10, 15);\n}\nimport * as mod from '../core/anotherModule';\nexport const m = mod;",
      "signature": "487f7216384ec40e22ff7dc40c01be4b-export declare function getSecondsInDay(): number;\nimport * as mod from '../core/anotherModule';\nexport declare const m: typeof mod;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "590556060bc156a64834010df8cda255-import * as c from '../core/index';\nexport function getSecondsInDay() {\n    return c.multiply(10, 15);\n}\nimport * as mod from '../core/anotherModule';\nexport const m = mod;",
        "signature": "487f7216384ec40e22ff7dc40c01be4b-export declare function getSecondsInDay(): number;\nimport * as mod from '../core/anotherModule';\nexport declare const m: typeof mod;\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "fileIdsList": [
    [
      "../core/index.d.ts",
      "../core/anotherModule.d.ts"
    ]
  ],
  "options": {
    "composite": true,
    "declaration": true,
    "skipDefaultLibCheck": true,
    "sourceMap": true
  },
  "referencedMap": {
    "./index.ts": [
      "../core/index.d.ts",
      "../core/anotherModule.d.ts"
    ]
  },
  "latestChangedDtsFile": "./index.d.ts",
  "size": 1879
}
//// [/user/username/projects/sample1/tests/index.js] *rewrite with same content*
//// [/user/username/projects/sample1/tests/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[5],"fileNames":["lib.d.ts","../core/index.d.ts","../core/anotherModule.d.ts","../logic/index.d.ts","./index.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},"fc70810d80f598d415c6f21c113a400b-export declare const someString: string;\nexport declare function leftPad(s: string, n: number): string;\nexport declare function multiply(a: number, b: number): number;\n//# sourceMappingURL=index.d.ts.map","5ef600f6f6585506cfe942fc161e76c5-export declare const World = \"hello\";\n//# sourceMappingURL=anotherModule.d.ts.map","487f7216384ec40e22ff7dc40c01be4b-export declare function getSecondsInDay(): number;\nimport * as mod from '../core/anotherModule';\nexport declare const m: typeof mod;\n",{"version":"7fa4162f733e6b9e7f7d9d9410e62f61-import * as c from '../core/index';\nimport * as logic from '../logic/index';\n\nc.leftPad(\"\", 10);\nlogic.getSecondsInDay();\n\nimport * as mod from '../core/anotherModule';\nexport const m = mod;","signature":"4b3c99afe665034856f74c660f74d6fd-import * as mod from '../core/anotherModule';\nexport declare const m: typeof mod;\n","impliedNodeFormat":1}],"fileIdsList":[[3],[2,3,4]],"options":{"composite":true,"declaration":true,"skipDefaultLibCheck":true},"referencedMap":[[4,1],[5,2]],"latestChangedDtsFile":"./index.d.ts"}
//// [/user/username/projects/sample1/tests/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./index.ts"
      ],
      "original": 5
    }
  ],
  "fileNames": [
    "lib.d.ts",
    "../core/index.d.ts",
    "../core/anotherModule.d.ts",
    "../logic/index.d.ts",
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
      "fileName": "../core/index.d.ts",
      "version": "fc70810d80f598d415c6f21c113a400b-export declare const someString: string;\nexport declare function leftPad(s: string, n: number): string;\nexport declare function multiply(a: number, b: number): number;\n//# sourceMappingURL=index.d.ts.map",
      "signature": "fc70810d80f598d415c6f21c113a400b-export declare const someString: string;\nexport declare function leftPad(s: string, n: number): string;\nexport declare function multiply(a: number, b: number): number;\n//# sourceMappingURL=index.d.ts.map",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "../core/anotherModule.d.ts",
      "version": "5ef600f6f6585506cfe942fc161e76c5-export declare const World = \"hello\";\n//# sourceMappingURL=anotherModule.d.ts.map",
      "signature": "5ef600f6f6585506cfe942fc161e76c5-export declare const World = \"hello\";\n//# sourceMappingURL=anotherModule.d.ts.map",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "../logic/index.d.ts",
      "version": "487f7216384ec40e22ff7dc40c01be4b-export declare function getSecondsInDay(): number;\nimport * as mod from '../core/anotherModule';\nexport declare const m: typeof mod;\n",
      "signature": "487f7216384ec40e22ff7dc40c01be4b-export declare function getSecondsInDay(): number;\nimport * as mod from '../core/anotherModule';\nexport declare const m: typeof mod;\n",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "./index.ts",
      "version": "7fa4162f733e6b9e7f7d9d9410e62f61-import * as c from '../core/index';\nimport * as logic from '../logic/index';\n\nc.leftPad(\"\", 10);\nlogic.getSecondsInDay();\n\nimport * as mod from '../core/anotherModule';\nexport const m = mod;",
      "signature": "4b3c99afe665034856f74c660f74d6fd-import * as mod from '../core/anotherModule';\nexport declare const m: typeof mod;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "7fa4162f733e6b9e7f7d9d9410e62f61-import * as c from '../core/index';\nimport * as logic from '../logic/index';\n\nc.leftPad(\"\", 10);\nlogic.getSecondsInDay();\n\nimport * as mod from '../core/anotherModule';\nexport const m = mod;",
        "signature": "4b3c99afe665034856f74c660f74d6fd-import * as mod from '../core/anotherModule';\nexport declare const m: typeof mod;\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "fileIdsList": [
    [
      "../core/anotherModule.d.ts"
    ],
    [
      "../core/index.d.ts",
      "../core/anotherModule.d.ts",
      "../logic/index.d.ts"
    ]
  ],
  "options": {
    "composite": true,
    "declaration": true,
    "skipDefaultLibCheck": true
  },
  "referencedMap": {
    "../logic/index.d.ts": [
      "../core/anotherModule.d.ts"
    ],
    "./index.ts": [
      "../core/index.d.ts",
      "../core/anotherModule.d.ts",
      "../logic/index.d.ts"
    ]
  },
  "latestChangedDtsFile": "./index.d.ts",
  "size": 2038
}

core/tsconfig.json::
SemanticDiagnostics::
*refresh*    /user/username/projects/sample1/core/index.ts
Signatures::
(computed .d.ts) /user/username/projects/sample1/core/index.ts

logic/tsconfig.json::
SemanticDiagnostics::
*refresh*    /user/username/projects/sample1/core/index.d.ts
*refresh*    /user/username/projects/sample1/logic/index.ts
Signatures::
(used version)   /user/username/projects/sample1/core/index.d.ts
(computed .d.ts) /user/username/projects/sample1/logic/index.ts

tests/tsconfig.json::
SemanticDiagnostics::
*refresh*    /user/username/projects/sample1/core/index.d.ts
*refresh*    /user/username/projects/sample1/tests/index.ts
Signatures::
(used version)   /user/username/projects/sample1/core/index.d.ts
(computed .d.ts) /user/username/projects/sample1/tests/index.ts


Edit [2]:: Make two changes
//// [/user/username/projects/sample1/core/index.ts] *modified* 
export const someString: string = "HELLO WORLD";
export function leftPad(s: string, n: number) { return s + n; }
export function multiply(a: number, b: number) { return a * b; }
export class someClass { }
export class someClass2 { }


Output::
[2J[3J[H[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.

//// [/user/username/projects/sample1/core/index.d.ts] *modified* 
export declare const someString: string;
export declare function leftPad(s: string, n: number): string;
export declare function multiply(a: number, b: number): number;
export declare class someClass {
}
export declare class someClass2 {
}
//# sourceMappingURL=index.d.ts.map
//// [/user/username/projects/sample1/core/index.d.ts.map] *modified* 
{"version":3,"file":"index.d.ts","sourceRoot":"","sources":["index.ts"],"names":[],"mappings":"AAAA,eAAO,MAAM,UAAU,EAAE,MAAsB,CAAC;AAChD,wBAAgB,OAAO,CAAC,CAAC,EAAE,MAAM,EAAE,CAAC,EAAE,MAAM,UAAmB;AAC/D,wBAAgB,QAAQ,CAAC,CAAC,EAAE,MAAM,EAAE,CAAC,EAAE,MAAM,UAAmB;AAChE,qBAAa,SAAS;CAAI;AAC1B,qBAAa,UAAU;CAAI"}
//// [/user/username/projects/sample1/core/index.js] *modified* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.someClass2 = exports.someClass = exports.someString = void 0;
exports.leftPad = leftPad;
exports.multiply = multiply;
exports.someString = "HELLO WORLD";
function leftPad(s, n) { return s + n; }
function multiply(a, b) { return a * b; }
class someClass {
}
exports.someClass = someClass;
class someClass2 {
}
exports.someClass2 = someClass2;

//// [/user/username/projects/sample1/core/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[[2,4]],"fileNames":["lib.d.ts","./anotherModule.ts","./index.ts","./some_decl.d.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"19cd44ed7278957051fca663f821c916-export const World = \"hello\";","signature":"5aad0de3e7b08bb6e110c7b97361b89e-export declare const World = \"hello\";\n","impliedNodeFormat":1},{"version":"3682101db2184c6bccaa98c1c1ac0791-export const someString: string = \"HELLO WORLD\";\nexport function leftPad(s: string, n: number) { return s + n; }\nexport function multiply(a: number, b: number) { return a * b; }\nexport class someClass { }\nexport class someClass2 { }","signature":"6b05b9011aa41b6b276b3708df078d1d-export declare const someString: string;\nexport declare function leftPad(s: string, n: number): string;\nexport declare function multiply(a: number, b: number): number;\nexport declare class someClass {\n}\nexport declare class someClass2 {\n}\n","impliedNodeFormat":1},{"version":"6ceab83400a6167be2fb5feab881ded0-declare const dts: any;","affectsGlobalScope":true,"impliedNodeFormat":1}],"options":{"composite":true,"declaration":true,"declarationMap":true,"skipDefaultLibCheck":true},"latestChangedDtsFile":"./index.d.ts"}
//// [/user/username/projects/sample1/core/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./anotherModule.ts",
        "./index.ts",
        "./some_decl.d.ts"
      ],
      "original": [
        2,
        4
      ]
    }
  ],
  "fileNames": [
    "lib.d.ts",
    "./anotherModule.ts",
    "./index.ts",
    "./some_decl.d.ts"
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
      "fileName": "./anotherModule.ts",
      "version": "19cd44ed7278957051fca663f821c916-export const World = \"hello\";",
      "signature": "5aad0de3e7b08bb6e110c7b97361b89e-export declare const World = \"hello\";\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "19cd44ed7278957051fca663f821c916-export const World = \"hello\";",
        "signature": "5aad0de3e7b08bb6e110c7b97361b89e-export declare const World = \"hello\";\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./index.ts",
      "version": "3682101db2184c6bccaa98c1c1ac0791-export const someString: string = \"HELLO WORLD\";\nexport function leftPad(s: string, n: number) { return s + n; }\nexport function multiply(a: number, b: number) { return a * b; }\nexport class someClass { }\nexport class someClass2 { }",
      "signature": "6b05b9011aa41b6b276b3708df078d1d-export declare const someString: string;\nexport declare function leftPad(s: string, n: number): string;\nexport declare function multiply(a: number, b: number): number;\nexport declare class someClass {\n}\nexport declare class someClass2 {\n}\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "3682101db2184c6bccaa98c1c1ac0791-export const someString: string = \"HELLO WORLD\";\nexport function leftPad(s: string, n: number) { return s + n; }\nexport function multiply(a: number, b: number) { return a * b; }\nexport class someClass { }\nexport class someClass2 { }",
        "signature": "6b05b9011aa41b6b276b3708df078d1d-export declare const someString: string;\nexport declare function leftPad(s: string, n: number): string;\nexport declare function multiply(a: number, b: number): number;\nexport declare class someClass {\n}\nexport declare class someClass2 {\n}\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./some_decl.d.ts",
      "version": "6ceab83400a6167be2fb5feab881ded0-declare const dts: any;",
      "signature": "6ceab83400a6167be2fb5feab881ded0-declare const dts: any;",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "6ceab83400a6167be2fb5feab881ded0-declare const dts: any;",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    }
  ],
  "options": {
    "composite": true,
    "declaration": true,
    "declarationMap": true,
    "skipDefaultLibCheck": true
  },
  "latestChangedDtsFile": "./index.d.ts",
  "size": 1950
}
//// [/user/username/projects/sample1/logic/index.js] *rewrite with same content*
//// [/user/username/projects/sample1/logic/index.js.map] *rewrite with same content*
//// [/user/username/projects/sample1/logic/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[4],"fileNames":["lib.d.ts","../core/index.d.ts","../core/anotherModule.d.ts","./index.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},"d4da7cae37db82b1a9affca237e15204-export declare const someString: string;\nexport declare function leftPad(s: string, n: number): string;\nexport declare function multiply(a: number, b: number): number;\nexport declare class someClass {\n}\nexport declare class someClass2 {\n}\n//# sourceMappingURL=index.d.ts.map","5ef600f6f6585506cfe942fc161e76c5-export declare const World = \"hello\";\n//# sourceMappingURL=anotherModule.d.ts.map",{"version":"590556060bc156a64834010df8cda255-import * as c from '../core/index';\nexport function getSecondsInDay() {\n    return c.multiply(10, 15);\n}\nimport * as mod from '../core/anotherModule';\nexport const m = mod;","signature":"487f7216384ec40e22ff7dc40c01be4b-export declare function getSecondsInDay(): number;\nimport * as mod from '../core/anotherModule';\nexport declare const m: typeof mod;\n","impliedNodeFormat":1}],"fileIdsList":[[2,3]],"options":{"composite":true,"declaration":true,"skipDefaultLibCheck":true,"sourceMap":true},"referencedMap":[[4,1]],"latestChangedDtsFile":"./index.d.ts"}
//// [/user/username/projects/sample1/logic/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./index.ts"
      ],
      "original": 4
    }
  ],
  "fileNames": [
    "lib.d.ts",
    "../core/index.d.ts",
    "../core/anotherModule.d.ts",
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
      "fileName": "../core/index.d.ts",
      "version": "d4da7cae37db82b1a9affca237e15204-export declare const someString: string;\nexport declare function leftPad(s: string, n: number): string;\nexport declare function multiply(a: number, b: number): number;\nexport declare class someClass {\n}\nexport declare class someClass2 {\n}\n//# sourceMappingURL=index.d.ts.map",
      "signature": "d4da7cae37db82b1a9affca237e15204-export declare const someString: string;\nexport declare function leftPad(s: string, n: number): string;\nexport declare function multiply(a: number, b: number): number;\nexport declare class someClass {\n}\nexport declare class someClass2 {\n}\n//# sourceMappingURL=index.d.ts.map",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "../core/anotherModule.d.ts",
      "version": "5ef600f6f6585506cfe942fc161e76c5-export declare const World = \"hello\";\n//# sourceMappingURL=anotherModule.d.ts.map",
      "signature": "5ef600f6f6585506cfe942fc161e76c5-export declare const World = \"hello\";\n//# sourceMappingURL=anotherModule.d.ts.map",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "./index.ts",
      "version": "590556060bc156a64834010df8cda255-import * as c from '../core/index';\nexport function getSecondsInDay() {\n    return c.multiply(10, 15);\n}\nimport * as mod from '../core/anotherModule';\nexport const m = mod;",
      "signature": "487f7216384ec40e22ff7dc40c01be4b-export declare function getSecondsInDay(): number;\nimport * as mod from '../core/anotherModule';\nexport declare const m: typeof mod;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "590556060bc156a64834010df8cda255-import * as c from '../core/index';\nexport function getSecondsInDay() {\n    return c.multiply(10, 15);\n}\nimport * as mod from '../core/anotherModule';\nexport const m = mod;",
        "signature": "487f7216384ec40e22ff7dc40c01be4b-export declare function getSecondsInDay(): number;\nimport * as mod from '../core/anotherModule';\nexport declare const m: typeof mod;\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "fileIdsList": [
    [
      "../core/index.d.ts",
      "../core/anotherModule.d.ts"
    ]
  ],
  "options": {
    "composite": true,
    "declaration": true,
    "skipDefaultLibCheck": true,
    "sourceMap": true
  },
  "referencedMap": {
    "./index.ts": [
      "../core/index.d.ts",
      "../core/anotherModule.d.ts"
    ]
  },
  "latestChangedDtsFile": "./index.d.ts",
  "size": 1954
}
//// [/user/username/projects/sample1/tests/index.js] *rewrite with same content*
//// [/user/username/projects/sample1/tests/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[5],"fileNames":["lib.d.ts","../core/index.d.ts","../core/anotherModule.d.ts","../logic/index.d.ts","./index.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},"d4da7cae37db82b1a9affca237e15204-export declare const someString: string;\nexport declare function leftPad(s: string, n: number): string;\nexport declare function multiply(a: number, b: number): number;\nexport declare class someClass {\n}\nexport declare class someClass2 {\n}\n//# sourceMappingURL=index.d.ts.map","5ef600f6f6585506cfe942fc161e76c5-export declare const World = \"hello\";\n//# sourceMappingURL=anotherModule.d.ts.map","487f7216384ec40e22ff7dc40c01be4b-export declare function getSecondsInDay(): number;\nimport * as mod from '../core/anotherModule';\nexport declare const m: typeof mod;\n",{"version":"7fa4162f733e6b9e7f7d9d9410e62f61-import * as c from '../core/index';\nimport * as logic from '../logic/index';\n\nc.leftPad(\"\", 10);\nlogic.getSecondsInDay();\n\nimport * as mod from '../core/anotherModule';\nexport const m = mod;","signature":"4b3c99afe665034856f74c660f74d6fd-import * as mod from '../core/anotherModule';\nexport declare const m: typeof mod;\n","impliedNodeFormat":1}],"fileIdsList":[[3],[2,3,4]],"options":{"composite":true,"declaration":true,"skipDefaultLibCheck":true},"referencedMap":[[4,1],[5,2]],"latestChangedDtsFile":"./index.d.ts"}
//// [/user/username/projects/sample1/tests/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./index.ts"
      ],
      "original": 5
    }
  ],
  "fileNames": [
    "lib.d.ts",
    "../core/index.d.ts",
    "../core/anotherModule.d.ts",
    "../logic/index.d.ts",
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
      "fileName": "../core/index.d.ts",
      "version": "d4da7cae37db82b1a9affca237e15204-export declare const someString: string;\nexport declare function leftPad(s: string, n: number): string;\nexport declare function multiply(a: number, b: number): number;\nexport declare class someClass {\n}\nexport declare class someClass2 {\n}\n//# sourceMappingURL=index.d.ts.map",
      "signature": "d4da7cae37db82b1a9affca237e15204-export declare const someString: string;\nexport declare function leftPad(s: string, n: number): string;\nexport declare function multiply(a: number, b: number): number;\nexport declare class someClass {\n}\nexport declare class someClass2 {\n}\n//# sourceMappingURL=index.d.ts.map",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "../core/anotherModule.d.ts",
      "version": "5ef600f6f6585506cfe942fc161e76c5-export declare const World = \"hello\";\n//# sourceMappingURL=anotherModule.d.ts.map",
      "signature": "5ef600f6f6585506cfe942fc161e76c5-export declare const World = \"hello\";\n//# sourceMappingURL=anotherModule.d.ts.map",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "../logic/index.d.ts",
      "version": "487f7216384ec40e22ff7dc40c01be4b-export declare function getSecondsInDay(): number;\nimport * as mod from '../core/anotherModule';\nexport declare const m: typeof mod;\n",
      "signature": "487f7216384ec40e22ff7dc40c01be4b-export declare function getSecondsInDay(): number;\nimport * as mod from '../core/anotherModule';\nexport declare const m: typeof mod;\n",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "./index.ts",
      "version": "7fa4162f733e6b9e7f7d9d9410e62f61-import * as c from '../core/index';\nimport * as logic from '../logic/index';\n\nc.leftPad(\"\", 10);\nlogic.getSecondsInDay();\n\nimport * as mod from '../core/anotherModule';\nexport const m = mod;",
      "signature": "4b3c99afe665034856f74c660f74d6fd-import * as mod from '../core/anotherModule';\nexport declare const m: typeof mod;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "7fa4162f733e6b9e7f7d9d9410e62f61-import * as c from '../core/index';\nimport * as logic from '../logic/index';\n\nc.leftPad(\"\", 10);\nlogic.getSecondsInDay();\n\nimport * as mod from '../core/anotherModule';\nexport const m = mod;",
        "signature": "4b3c99afe665034856f74c660f74d6fd-import * as mod from '../core/anotherModule';\nexport declare const m: typeof mod;\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "fileIdsList": [
    [
      "../core/anotherModule.d.ts"
    ],
    [
      "../core/index.d.ts",
      "../core/anotherModule.d.ts",
      "../logic/index.d.ts"
    ]
  ],
  "options": {
    "composite": true,
    "declaration": true,
    "skipDefaultLibCheck": true
  },
  "referencedMap": {
    "../logic/index.d.ts": [
      "../core/anotherModule.d.ts"
    ],
    "./index.ts": [
      "../core/index.d.ts",
      "../core/anotherModule.d.ts",
      "../logic/index.d.ts"
    ]
  },
  "latestChangedDtsFile": "./index.d.ts",
  "size": 2113
}

core/tsconfig.json::
SemanticDiagnostics::
*refresh*    /user/username/projects/sample1/core/index.ts
Signatures::
(computed .d.ts) /user/username/projects/sample1/core/index.ts

logic/tsconfig.json::
SemanticDiagnostics::
*refresh*    /user/username/projects/sample1/core/index.d.ts
*refresh*    /user/username/projects/sample1/logic/index.ts
Signatures::
(used version)   /user/username/projects/sample1/core/index.d.ts
(computed .d.ts) /user/username/projects/sample1/logic/index.ts

tests/tsconfig.json::
SemanticDiagnostics::
*refresh*    /user/username/projects/sample1/core/index.d.ts
*refresh*    /user/username/projects/sample1/tests/index.ts
Signatures::
(used version)   /user/username/projects/sample1/core/index.d.ts
(computed .d.ts) /user/username/projects/sample1/tests/index.ts
