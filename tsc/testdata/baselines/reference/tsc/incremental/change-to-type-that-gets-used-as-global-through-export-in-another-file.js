currentDirectory::/home/src/workspaces/project
useCaseSensitiveFileNames::true
Input::
//// [/home/src/workspaces/project/class1.ts] *new* 
const a: MagicNumber = 1;
console.log(a);
//// [/home/src/workspaces/project/constants.ts] *new* 
export default 1;
//// [/home/src/workspaces/project/tsconfig.json] *new* 
{
    "compilerOptions": {
        "composite": true
    }
}
//// [/home/src/workspaces/project/types.d.ts] *new* 
type MagicNumber = typeof import('./constants').default

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

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","fileNames":["../../tslibs/TS/Lib/lib.d.ts","./class1.ts","./constants.ts","./types.d.ts"],"fileInfos":[{"version":"eae9e83ef0f77eeb2e35dc9b91facce1-/// \u003creference no-default-lib=\"true\"/\u003e\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array\u003cT\u003e { length: number; [n: number]: T; }\ninterface ReadonlyArray\u003cT\u003e {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"d0a794b162cf3390f4459e605071e66e-const a: MagicNumber = 1;\nconsole.log(a);","signature":"35bf2598d1c57d937287926df6e9c014-declare const a = 1;\n","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"ef5973d4f83d5ff79f946f9225102482-export default 1;","signature":"ef75d19097ce2a07c18bda9c0f2a7b24-declare const _default: number;\nexport default _default;\n","impliedNodeFormat":1},{"version":"fd9d4985dc509151f5ac67dbae1e1a92-type MagicNumber = typeof import('./constants').default","affectsGlobalScope":true,"impliedNodeFormat":1}],"fileIdsList":[[3]],"options":{"composite":true},"referencedMap":[[4,1]],"latestChangedDtsFile":"./constants.d.ts"}
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "fileNames": [
    "../../tslibs/TS/Lib/lib.d.ts",
    "./class1.ts",
    "./constants.ts",
    "./types.d.ts"
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
      "fileName": "./class1.ts",
      "version": "d0a794b162cf3390f4459e605071e66e-const a: MagicNumber = 1;\nconsole.log(a);",
      "signature": "35bf2598d1c57d937287926df6e9c014-declare const a = 1;\n",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "d0a794b162cf3390f4459e605071e66e-const a: MagicNumber = 1;\nconsole.log(a);",
        "signature": "35bf2598d1c57d937287926df6e9c014-declare const a = 1;\n",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./constants.ts",
      "version": "ef5973d4f83d5ff79f946f9225102482-export default 1;",
      "signature": "ef75d19097ce2a07c18bda9c0f2a7b24-declare const _default: number;\nexport default _default;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "ef5973d4f83d5ff79f946f9225102482-export default 1;",
        "signature": "ef75d19097ce2a07c18bda9c0f2a7b24-declare const _default: number;\nexport default _default;\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./types.d.ts",
      "version": "fd9d4985dc509151f5ac67dbae1e1a92-type MagicNumber = typeof import('./constants').default",
      "signature": "fd9d4985dc509151f5ac67dbae1e1a92-type MagicNumber = typeof import('./constants').default",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "fd9d4985dc509151f5ac67dbae1e1a92-type MagicNumber = typeof import('./constants').default",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    }
  ],
  "fileIdsList": [
    [
      "./constants.ts"
    ]
  ],
  "options": {
    "composite": true
  },
  "referencedMap": {
    "./types.d.ts": [
      "./constants.ts"
    ]
  },
  "latestChangedDtsFile": "./constants.d.ts",
  "size": 1600
}

SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.d.ts
*refresh*    /home/src/workspaces/project/class1.ts
*refresh*    /home/src/workspaces/project/constants.ts
*refresh*    /home/src/workspaces/project/types.d.ts
Signatures::
(stored at emit) /home/src/workspaces/project/class1.ts
(stored at emit) /home/src/workspaces/project/constants.ts


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
{"version":"FakeTSVersion","fileNames":["../../tslibs/TS/Lib/lib.d.ts","./class1.ts","./constants.ts","./types.d.ts"],"fileInfos":[{"version":"eae9e83ef0f77eeb2e35dc9b91facce1-/// \u003creference no-default-lib=\"true\"/\u003e\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array\u003cT\u003e { length: number; [n: number]: T; }\ninterface ReadonlyArray\u003cT\u003e {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"d0a794b162cf3390f4459e605071e66e-const a: MagicNumber = 1;\nconsole.log(a);","signature":"35bf2598d1c57d937287926df6e9c014-declare const a = 1;\n","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"ef5973cd783d5ff79f946f92250b74cd-export default 2;","signature":"ef75d19097ce2a07c18bda9c0f2a7b24-declare const _default: number;\nexport default _default;\n","impliedNodeFormat":1},{"version":"fd9d4985dc509151f5ac67dbae1e1a92-type MagicNumber = typeof import('./constants').default","affectsGlobalScope":true,"impliedNodeFormat":1}],"fileIdsList":[[3]],"options":{"composite":true},"referencedMap":[[4,1]],"latestChangedDtsFile":"./constants.d.ts"}
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "fileNames": [
    "../../tslibs/TS/Lib/lib.d.ts",
    "./class1.ts",
    "./constants.ts",
    "./types.d.ts"
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
      "fileName": "./class1.ts",
      "version": "d0a794b162cf3390f4459e605071e66e-const a: MagicNumber = 1;\nconsole.log(a);",
      "signature": "35bf2598d1c57d937287926df6e9c014-declare const a = 1;\n",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "d0a794b162cf3390f4459e605071e66e-const a: MagicNumber = 1;\nconsole.log(a);",
        "signature": "35bf2598d1c57d937287926df6e9c014-declare const a = 1;\n",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./constants.ts",
      "version": "ef5973cd783d5ff79f946f92250b74cd-export default 2;",
      "signature": "ef75d19097ce2a07c18bda9c0f2a7b24-declare const _default: number;\nexport default _default;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "ef5973cd783d5ff79f946f92250b74cd-export default 2;",
        "signature": "ef75d19097ce2a07c18bda9c0f2a7b24-declare const _default: number;\nexport default _default;\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./types.d.ts",
      "version": "fd9d4985dc509151f5ac67dbae1e1a92-type MagicNumber = typeof import('./constants').default",
      "signature": "fd9d4985dc509151f5ac67dbae1e1a92-type MagicNumber = typeof import('./constants').default",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "fd9d4985dc509151f5ac67dbae1e1a92-type MagicNumber = typeof import('./constants').default",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    }
  ],
  "fileIdsList": [
    [
      "./constants.ts"
    ]
  ],
  "options": {
    "composite": true
  },
  "referencedMap": {
    "./types.d.ts": [
      "./constants.ts"
    ]
  },
  "latestChangedDtsFile": "./constants.d.ts",
  "size": 1600
}

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
--- nonIncremental errors.txt
+++ incremental errors.txt
@@ -1,7 +0,0 @@
-[96mclass1.ts[0m:[93m1[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType '1' is not assignable to type '2'.
-
-[7m1[0m const a: MagicNumber = 1;
-[7m [0m [91m      ~[0m
-
-Found 1 error in class1.ts[90m:1[0m
-