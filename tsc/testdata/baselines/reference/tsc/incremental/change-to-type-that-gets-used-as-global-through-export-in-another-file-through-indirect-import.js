currentDirectory::/home/src/workspaces/project
useCaseSensitiveFileNames::true
Input::
//// [/home/src/workspaces/project/class1.ts] *new* 
const a: MagicNumber = 1;
console.log(a);
//// [/home/src/workspaces/project/constants.ts] *new* 
export default 1;
//// [/home/src/workspaces/project/reexport.ts] *new* 
export { default as ConstantNumber } from "./constants"
//// [/home/src/workspaces/project/tsconfig.json] *new* 
{
    "compilerOptions": {
        "composite": true
    }
}
//// [/home/src/workspaces/project/types.d.ts] *new* 
type MagicNumber = typeof import('./reexport').ConstantNumber

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
//// [/home/src/workspaces/project/class1.d.ts] *new* 
declare const a = 1;

//// [/home/src/workspaces/project/class1.js] *new* 
const a = 1;
console.log(a);

//// [/home/src/workspaces/project/constants.d.ts] *new* 
declare const _default: number;
export default _default;

//// [/home/src/workspaces/project/constants.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = 1;

//// [/home/src/workspaces/project/reexport.d.ts] *new* 
export { default as ConstantNumber } from "./constants";

//// [/home/src/workspaces/project/reexport.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConstantNumber = void 0;
const constants_1 = require("./constants");
Object.defineProperty(exports, "ConstantNumber", { enumerable: true, get: function () { return constants_1.default; } });

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":[[2,5]],"fileNames":["lib.d.ts","./class1.ts","./constants.ts","./reexport.ts","./types.d.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"881068d51dfd24d338a5f3706ee1097f-const a: MagicNumber = 1;\nconsole.log(a);","signature":"f59d1a67db5f979e23689dc09b68c628-declare const a = 1;\n","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"c93bc8f54a24dc311538894cf3d7ac17-export default 1;","signature":"18ae69a2c0b372747b9973ad9c14a1e0-declare const _default: number;\nexport default _default;\n","impliedNodeFormat":1},{"version":"75c0647a66f2f74c4448b4b393e889d1-export { default as ConstantNumber } from \"./constants\"","signature":"3c986fce7f0f21b6b269681962fc7feb-export { default as ConstantNumber } from \"./constants\";\n","impliedNodeFormat":1},{"version":"d84f446b9b1fc3f56545f03793b7992c-type MagicNumber = typeof import('./reexport').ConstantNumber","affectsGlobalScope":true,"impliedNodeFormat":1}],"fileIdsList":[[3],[4]],"options":{"composite":true},"referencedMap":[[4,1],[5,2]],"latestChangedDtsFile":"./reexport.d.ts"}
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./class1.ts",
        "./constants.ts",
        "./reexport.ts",
        "./types.d.ts"
      ],
      "original": [
        2,
        5
      ]
    }
  ],
  "fileNames": [
    "lib.d.ts",
    "./class1.ts",
    "./constants.ts",
    "./reexport.ts",
    "./types.d.ts"
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
      "fileName": "./class1.ts",
      "version": "881068d51dfd24d338a5f3706ee1097f-const a: MagicNumber = 1;\nconsole.log(a);",
      "signature": "f59d1a67db5f979e23689dc09b68c628-declare const a = 1;\n",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "881068d51dfd24d338a5f3706ee1097f-const a: MagicNumber = 1;\nconsole.log(a);",
        "signature": "f59d1a67db5f979e23689dc09b68c628-declare const a = 1;\n",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./constants.ts",
      "version": "c93bc8f54a24dc311538894cf3d7ac17-export default 1;",
      "signature": "18ae69a2c0b372747b9973ad9c14a1e0-declare const _default: number;\nexport default _default;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "c93bc8f54a24dc311538894cf3d7ac17-export default 1;",
        "signature": "18ae69a2c0b372747b9973ad9c14a1e0-declare const _default: number;\nexport default _default;\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./reexport.ts",
      "version": "75c0647a66f2f74c4448b4b393e889d1-export { default as ConstantNumber } from \"./constants\"",
      "signature": "3c986fce7f0f21b6b269681962fc7feb-export { default as ConstantNumber } from \"./constants\";\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "75c0647a66f2f74c4448b4b393e889d1-export { default as ConstantNumber } from \"./constants\"",
        "signature": "3c986fce7f0f21b6b269681962fc7feb-export { default as ConstantNumber } from \"./constants\";\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./types.d.ts",
      "version": "d84f446b9b1fc3f56545f03793b7992c-type MagicNumber = typeof import('./reexport').ConstantNumber",
      "signature": "d84f446b9b1fc3f56545f03793b7992c-type MagicNumber = typeof import('./reexport').ConstantNumber",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "d84f446b9b1fc3f56545f03793b7992c-type MagicNumber = typeof import('./reexport').ConstantNumber",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    }
  ],
  "fileIdsList": [
    [
      "./constants.ts"
    ],
    [
      "./reexport.ts"
    ]
  ],
  "options": {
    "composite": true
  },
  "referencedMap": {
    "./reexport.ts": [
      "./constants.ts"
    ],
    "./types.d.ts": [
      "./reexport.ts"
    ]
  },
  "latestChangedDtsFile": "./reexport.d.ts",
  "size": 1831
}

tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.d.ts
*refresh*    /home/src/workspaces/project/class1.ts
*refresh*    /home/src/workspaces/project/constants.ts
*refresh*    /home/src/workspaces/project/reexport.ts
*refresh*    /home/src/workspaces/project/types.d.ts
Signatures::
(stored at emit) /home/src/workspaces/project/class1.ts
(stored at emit) /home/src/workspaces/project/constants.ts
(stored at emit) /home/src/workspaces/project/reexport.ts


Edit [0]:: Modify imports used in global file
//// [/home/src/workspaces/project/constants.ts] *modified* 
export default 2;

tsgo 
ExitStatus:: Success
Output::
//// [/home/src/workspaces/project/constants.js] *modified* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = 2;

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[[2,5]],"fileNames":["lib.d.ts","./class1.ts","./constants.ts","./reexport.ts","./types.d.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"881068d51dfd24d338a5f3706ee1097f-const a: MagicNumber = 1;\nconsole.log(a);","signature":"f59d1a67db5f979e23689dc09b68c628-declare const a = 1;\n","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"b8fa0b3912c91197fa3ec685cbc93c70-export default 2;","signature":"18ae69a2c0b372747b9973ad9c14a1e0-declare const _default: number;\nexport default _default;\n","impliedNodeFormat":1},{"version":"75c0647a66f2f74c4448b4b393e889d1-export { default as ConstantNumber } from \"./constants\"","signature":"3c986fce7f0f21b6b269681962fc7feb-export { default as ConstantNumber } from \"./constants\";\n","impliedNodeFormat":1},{"version":"d84f446b9b1fc3f56545f03793b7992c-type MagicNumber = typeof import('./reexport').ConstantNumber","affectsGlobalScope":true,"impliedNodeFormat":1}],"fileIdsList":[[3],[4]],"options":{"composite":true},"referencedMap":[[4,1],[5,2]],"latestChangedDtsFile":"./reexport.d.ts"}
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./class1.ts",
        "./constants.ts",
        "./reexport.ts",
        "./types.d.ts"
      ],
      "original": [
        2,
        5
      ]
    }
  ],
  "fileNames": [
    "lib.d.ts",
    "./class1.ts",
    "./constants.ts",
    "./reexport.ts",
    "./types.d.ts"
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
      "fileName": "./class1.ts",
      "version": "881068d51dfd24d338a5f3706ee1097f-const a: MagicNumber = 1;\nconsole.log(a);",
      "signature": "f59d1a67db5f979e23689dc09b68c628-declare const a = 1;\n",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "881068d51dfd24d338a5f3706ee1097f-const a: MagicNumber = 1;\nconsole.log(a);",
        "signature": "f59d1a67db5f979e23689dc09b68c628-declare const a = 1;\n",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./constants.ts",
      "version": "b8fa0b3912c91197fa3ec685cbc93c70-export default 2;",
      "signature": "18ae69a2c0b372747b9973ad9c14a1e0-declare const _default: number;\nexport default _default;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "b8fa0b3912c91197fa3ec685cbc93c70-export default 2;",
        "signature": "18ae69a2c0b372747b9973ad9c14a1e0-declare const _default: number;\nexport default _default;\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./reexport.ts",
      "version": "75c0647a66f2f74c4448b4b393e889d1-export { default as ConstantNumber } from \"./constants\"",
      "signature": "3c986fce7f0f21b6b269681962fc7feb-export { default as ConstantNumber } from \"./constants\";\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "75c0647a66f2f74c4448b4b393e889d1-export { default as ConstantNumber } from \"./constants\"",
        "signature": "3c986fce7f0f21b6b269681962fc7feb-export { default as ConstantNumber } from \"./constants\";\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./types.d.ts",
      "version": "d84f446b9b1fc3f56545f03793b7992c-type MagicNumber = typeof import('./reexport').ConstantNumber",
      "signature": "d84f446b9b1fc3f56545f03793b7992c-type MagicNumber = typeof import('./reexport').ConstantNumber",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "d84f446b9b1fc3f56545f03793b7992c-type MagicNumber = typeof import('./reexport').ConstantNumber",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    }
  ],
  "fileIdsList": [
    [
      "./constants.ts"
    ],
    [
      "./reexport.ts"
    ]
  ],
  "options": {
    "composite": true
  },
  "referencedMap": {
    "./reexport.ts": [
      "./constants.ts"
    ],
    "./types.d.ts": [
      "./reexport.ts"
    ]
  },
  "latestChangedDtsFile": "./reexport.d.ts",
  "size": 1831
}

tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/workspaces/project/constants.ts
Signatures::
(computed .d.ts) /home/src/workspaces/project/constants.ts


Diff:: Currently there is issue with d.ts emit for export default = 1 to widen in dts which is why we are not re-computing errors and results in incorrect error reporting
--- nonIncremental /home/src/workspaces/project/class1.d.ts
+++ incremental /home/src/workspaces/project/class1.d.ts
@@ -1,1 +1,1 @@
-declare const a = 2;
+declare const a = 1;
--- nonIncremental.output.txt
+++ incremental.output.txt
@@ -1,8 +0,0 @@
-[96mclass1.ts[0m:[93m1[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType '1' is not assignable to type '2'.
-
-[7m1[0m const a: MagicNumber = 1;
-[7m [0m [91m      ~[0m
-
-
-Found 1 error in class1.ts[90m:1[0m
-