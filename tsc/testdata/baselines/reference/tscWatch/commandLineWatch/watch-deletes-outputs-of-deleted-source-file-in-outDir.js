currentDirectory::/home/src/workspaces/project
useCaseSensitiveFileNames::true
Input::
//// [/home/src/workspaces/project/a.ts] *new* 
export const a = 1;
//// [/home/src/workspaces/project/b.ts] *new* 
export const b = 2;
//// [/home/src/workspaces/project/index.ts] *new* 
import { a } from "./a"; import { b } from "./b"; export const main = a + b;
//// [/home/src/workspaces/project/tsconfig.json] *new* 
{"compilerOptions":{"outDir":"out","declaration":true,"declarationMap":true,"sourceMap":true,"incremental":true},"include":["*.ts"]}

tsc --watch
ExitStatus:: Success
Output::
[2J[3J[H[[90mHH:MM:SS AM[0m] Starting compilation in watch mode...

[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.

//// [/home/src/tslibs/TS/Lib/lib.es2026.full.d.ts] *Lib*
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
//// [/home/src/workspaces/project/out/a.d.ts] *new* 
export declare const a = 1;
//# sourceMappingURL=a.d.ts.map
//// [/home/src/workspaces/project/out/a.d.ts.map] *new* 
{"version":3,"file":"a.d.ts","sources":["../a.ts"],"names":[],"mappings":"AAAA,eAAO,MAAM,CAAC,IAAI,CAAC"}
//// [/home/src/workspaces/project/out/a.js] *new* 
export const a = 1;
//# sourceMappingURL=a.js.map
//// [/home/src/workspaces/project/out/a.js.map] *new* 
{"version":3,"file":"a.js","sources":["../a.ts"],"names":[],"mappings":"AAAA,MAAM,CAAC,MAAM,CAAC,GAAG,CAAC,CAAC"}
//// [/home/src/workspaces/project/out/b.d.ts] *new* 
export declare const b = 2;
//# sourceMappingURL=b.d.ts.map
//// [/home/src/workspaces/project/out/b.d.ts.map] *new* 
{"version":3,"file":"b.d.ts","sources":["../b.ts"],"names":[],"mappings":"AAAA,eAAO,MAAM,CAAC,IAAI,CAAC"}
//// [/home/src/workspaces/project/out/b.js] *new* 
export const b = 2;
//# sourceMappingURL=b.js.map
//// [/home/src/workspaces/project/out/b.js.map] *new* 
{"version":3,"file":"b.js","sources":["../b.ts"],"names":[],"mappings":"AAAA,MAAM,CAAC,MAAM,CAAC,GAAG,CAAC,CAAC"}
//// [/home/src/workspaces/project/out/index.d.ts] *new* 
export declare const main: number;
//# sourceMappingURL=index.d.ts.map
//// [/home/src/workspaces/project/out/index.d.ts.map] *new* 
{"version":3,"file":"index.d.ts","sources":["../index.ts"],"names":[],"mappings":"AAAkD,eAAO,MAAM,IAAI,QAAQ,CAAC"}
//// [/home/src/workspaces/project/out/index.js] *new* 
import { a } from "./a";
import { b } from "./b";
export const main = a + b;
//# sourceMappingURL=index.js.map
//// [/home/src/workspaces/project/out/index.js.map] *new* 
{"version":3,"file":"index.js","sources":["../index.ts"],"names":[],"mappings":"AAAA,OAAO,EAAE,CAAC,EAAE,MAAM,KAAK,CAAC;AAAC,OAAO,EAAE,CAAC,EAAE,MAAM,KAAK,CAAC;AAAC,MAAM,CAAC,MAAM,IAAI,GAAG,CAAC,GAAG,CAAC,CAAC"}
//// [/home/src/workspaces/project/out/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":[[2,4]],"fileNames":["lib.es2026.full.d.ts","../a.ts","../b.ts","../index.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"f5c8fff6e1fca35f4a292d48868d4086-export const a = 1;","signature":"67cd7ccc14045107336f34154f76a8ca-export declare const a = 1;\n","impliedNodeFormat":1},{"version":"a8da94c0a8fada72e123de05c6818d3a-export const b = 2;","signature":"e1d275f86bf4a4a1f6fd0e8d8709f902-export declare const b = 2;\n","impliedNodeFormat":1},{"version":"82bfd479d08397ebfae0c90721d8cd9f-import { a } from \"./a\"; import { b } from \"./b\"; export const main = a + b;","signature":"5cdf992e880b2f243dbd4fb6577d4cf8-export declare const main: number;\n","impliedNodeFormat":1}],"fileIdsList":[[2,3]],"options":{"declaration":true,"declarationMap":true,"outDir":"./","sourceMap":true},"referencedMap":[[4,1]]}
//// [/home/src/workspaces/project/out/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "../a.ts",
        "../b.ts",
        "../index.ts"
      ],
      "original": [
        2,
        4
      ]
    }
  ],
  "fileNames": [
    "lib.es2026.full.d.ts",
    "../a.ts",
    "../b.ts",
    "../index.ts"
  ],
  "fileInfos": [
    {
      "fileName": "lib.es2026.full.d.ts",
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
      "fileName": "../a.ts",
      "version": "f5c8fff6e1fca35f4a292d48868d4086-export const a = 1;",
      "signature": "67cd7ccc14045107336f34154f76a8ca-export declare const a = 1;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "f5c8fff6e1fca35f4a292d48868d4086-export const a = 1;",
        "signature": "67cd7ccc14045107336f34154f76a8ca-export declare const a = 1;\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "../b.ts",
      "version": "a8da94c0a8fada72e123de05c6818d3a-export const b = 2;",
      "signature": "e1d275f86bf4a4a1f6fd0e8d8709f902-export declare const b = 2;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "a8da94c0a8fada72e123de05c6818d3a-export const b = 2;",
        "signature": "e1d275f86bf4a4a1f6fd0e8d8709f902-export declare const b = 2;\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "../index.ts",
      "version": "82bfd479d08397ebfae0c90721d8cd9f-import { a } from \"./a\"; import { b } from \"./b\"; export const main = a + b;",
      "signature": "5cdf992e880b2f243dbd4fb6577d4cf8-export declare const main: number;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "82bfd479d08397ebfae0c90721d8cd9f-import { a } from \"./a\"; import { b } from \"./b\"; export const main = a + b;",
        "signature": "5cdf992e880b2f243dbd4fb6577d4cf8-export declare const main: number;\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "fileIdsList": [
    [
      "../a.ts",
      "../b.ts"
    ]
  ],
  "options": {
    "declaration": true,
    "declarationMap": true,
    "outDir": "./",
    "sourceMap": true
  },
  "referencedMap": {
    "../index.ts": [
      "../a.ts",
      "../b.ts"
    ]
  },
  "size": 1593
}

Watch Registrations::
Directory watches::
  /home/src/tslibs/TS/Lib
  /home/src/workspaces/project
tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es2026.full.d.ts
*refresh*    /home/src/workspaces/project/a.ts
*refresh*    /home/src/workspaces/project/b.ts
*refresh*    /home/src/workspaces/project/index.ts
Signatures::
(stored at emit) /home/src/workspaces/project/a.ts
(stored at emit) /home/src/workspaces/project/b.ts
(stored at emit) /home/src/workspaces/project/index.ts


Edit [0]:: delete a.ts
//// [/home/src/workspaces/project/a.ts] *deleted*


Output::
[2J[3J[H[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

[96mindex.ts[0m:[93m1[0m:[93m19[0m - [91merror[0m[90m TS2307: [0mCannot find module './a' or its corresponding type declarations.

[7m1[0m import { a } from "./a"; import { b } from "./b"; export const main = a + b;
[7m [0m [91m                  ~~~~~[0m


Found 1 error in index.ts[90m:1[0m

[[90mHH:MM:SS AM[0m] Found 1 error. Watching for file changes.

//// [/home/src/workspaces/project/out/a.d.ts] *deleted*
//// [/home/src/workspaces/project/out/a.d.ts.map] *deleted*
//// [/home/src/workspaces/project/out/a.js] *deleted*
//// [/home/src/workspaces/project/out/a.js.map] *deleted*
//// [/home/src/workspaces/project/out/index.d.ts] *modified* 
export declare const main: any;
//# sourceMappingURL=index.d.ts.map
//// [/home/src/workspaces/project/out/index.d.ts.map] *modified* 
{"version":3,"file":"index.d.ts","sources":["../index.ts"],"names":[],"mappings":"AAAkD,eAAO,MAAM,IAAI,KAAQ,CAAC"}
//// [/home/src/workspaces/project/out/index.js] *rewrite with same content*
//// [/home/src/workspaces/project/out/index.js.map] *rewrite with same content*
//// [/home/src/workspaces/project/out/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[[2,3]],"fileNames":["lib.es2026.full.d.ts","../b.ts","../index.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"a8da94c0a8fada72e123de05c6818d3a-export const b = 2;","signature":"e1d275f86bf4a4a1f6fd0e8d8709f902-export declare const b = 2;\n","impliedNodeFormat":1},{"version":"82bfd479d08397ebfae0c90721d8cd9f-import { a } from \"./a\"; import { b } from \"./b\"; export const main = a + b;","signature":"c9181fbf7e7a03c7b74d16442e00ce39-export declare const main: any;\n","impliedNodeFormat":1}],"fileIdsList":[[2]],"options":{"declaration":true,"declarationMap":true,"outDir":"./","sourceMap":true},"referencedMap":[[3,1]],"semanticDiagnosticsPerFile":[[3,[{"pos":18,"end":23,"code":2307,"category":1,"messageKey":"Cannot_find_module_0_or_its_corresponding_type_declarations_2307","messageArgs":["./a"]}]]]}
//// [/home/src/workspaces/project/out/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "../b.ts",
        "../index.ts"
      ],
      "original": [
        2,
        3
      ]
    }
  ],
  "fileNames": [
    "lib.es2026.full.d.ts",
    "../b.ts",
    "../index.ts"
  ],
  "fileInfos": [
    {
      "fileName": "lib.es2026.full.d.ts",
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
      "fileName": "../b.ts",
      "version": "a8da94c0a8fada72e123de05c6818d3a-export const b = 2;",
      "signature": "e1d275f86bf4a4a1f6fd0e8d8709f902-export declare const b = 2;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "a8da94c0a8fada72e123de05c6818d3a-export const b = 2;",
        "signature": "e1d275f86bf4a4a1f6fd0e8d8709f902-export declare const b = 2;\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "../index.ts",
      "version": "82bfd479d08397ebfae0c90721d8cd9f-import { a } from \"./a\"; import { b } from \"./b\"; export const main = a + b;",
      "signature": "c9181fbf7e7a03c7b74d16442e00ce39-export declare const main: any;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "82bfd479d08397ebfae0c90721d8cd9f-import { a } from \"./a\"; import { b } from \"./b\"; export const main = a + b;",
        "signature": "c9181fbf7e7a03c7b74d16442e00ce39-export declare const main: any;\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "fileIdsList": [
    [
      "../b.ts"
    ]
  ],
  "options": {
    "declaration": true,
    "declarationMap": true,
    "outDir": "./",
    "sourceMap": true
  },
  "referencedMap": {
    "../index.ts": [
      "../b.ts"
    ]
  },
  "semanticDiagnosticsPerFile": [
    [
      "../index.ts",
      [
        {
          "pos": 18,
          "end": 23,
          "code": 2307,
          "category": 1,
          "messageKey": "Cannot_find_module_0_or_its_corresponding_type_declarations_2307",
          "messageArgs": [
            "./a"
          ]
        }
      ]
    ]
  ],
  "size": 1596
}

Watch Registrations::
Directory watches::
  /home/src/tslibs/TS/Lib
  /home/src/workspaces/project
  /home/src/workspaces/project/out
tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/workspaces/project/index.ts
Signatures::
(computed .d.ts) /home/src/workspaces/project/index.ts


Edit [1]:: recreate a.ts
//// [/home/src/workspaces/project/a.ts] *new* 
export const a = 3;


Output::
[2J[3J[H[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.

//// [/home/src/workspaces/project/out/a.d.ts] *new* 
export declare const a = 3;
//# sourceMappingURL=a.d.ts.map
//// [/home/src/workspaces/project/out/a.d.ts.map] *new* 
{"version":3,"file":"a.d.ts","sources":["../a.ts"],"names":[],"mappings":"AAAA,eAAO,MAAM,CAAC,IAAI,CAAC"}
//// [/home/src/workspaces/project/out/a.js] *new* 
export const a = 3;
//# sourceMappingURL=a.js.map
//// [/home/src/workspaces/project/out/a.js.map] *new* 
{"version":3,"file":"a.js","sources":["../a.ts"],"names":[],"mappings":"AAAA,MAAM,CAAC,MAAM,CAAC,GAAG,CAAC,CAAC"}
//// [/home/src/workspaces/project/out/index.d.ts] *modified* 
export declare const main: number;
//# sourceMappingURL=index.d.ts.map
//// [/home/src/workspaces/project/out/index.d.ts.map] *modified* 
{"version":3,"file":"index.d.ts","sources":["../index.ts"],"names":[],"mappings":"AAAkD,eAAO,MAAM,IAAI,QAAQ,CAAC"}
//// [/home/src/workspaces/project/out/index.js] *rewrite with same content*
//// [/home/src/workspaces/project/out/index.js.map] *rewrite with same content*
//// [/home/src/workspaces/project/out/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[[2,4]],"fileNames":["lib.es2026.full.d.ts","../a.ts","../b.ts","../index.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"51d2d7760096fd595a36c6c4e3e8d543-export const a = 3;","signature":"aaff685faaba0d428347632b2d5e4869-export declare const a = 3;\n","impliedNodeFormat":1},{"version":"a8da94c0a8fada72e123de05c6818d3a-export const b = 2;","signature":"e1d275f86bf4a4a1f6fd0e8d8709f902-export declare const b = 2;\n","impliedNodeFormat":1},{"version":"82bfd479d08397ebfae0c90721d8cd9f-import { a } from \"./a\"; import { b } from \"./b\"; export const main = a + b;","signature":"5cdf992e880b2f243dbd4fb6577d4cf8-export declare const main: number;\n","impliedNodeFormat":1}],"fileIdsList":[[2,3]],"options":{"declaration":true,"declarationMap":true,"outDir":"./","sourceMap":true},"referencedMap":[[4,1]]}
//// [/home/src/workspaces/project/out/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "../a.ts",
        "../b.ts",
        "../index.ts"
      ],
      "original": [
        2,
        4
      ]
    }
  ],
  "fileNames": [
    "lib.es2026.full.d.ts",
    "../a.ts",
    "../b.ts",
    "../index.ts"
  ],
  "fileInfos": [
    {
      "fileName": "lib.es2026.full.d.ts",
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
      "fileName": "../a.ts",
      "version": "51d2d7760096fd595a36c6c4e3e8d543-export const a = 3;",
      "signature": "aaff685faaba0d428347632b2d5e4869-export declare const a = 3;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "51d2d7760096fd595a36c6c4e3e8d543-export const a = 3;",
        "signature": "aaff685faaba0d428347632b2d5e4869-export declare const a = 3;\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "../b.ts",
      "version": "a8da94c0a8fada72e123de05c6818d3a-export const b = 2;",
      "signature": "e1d275f86bf4a4a1f6fd0e8d8709f902-export declare const b = 2;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "a8da94c0a8fada72e123de05c6818d3a-export const b = 2;",
        "signature": "e1d275f86bf4a4a1f6fd0e8d8709f902-export declare const b = 2;\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "../index.ts",
      "version": "82bfd479d08397ebfae0c90721d8cd9f-import { a } from \"./a\"; import { b } from \"./b\"; export const main = a + b;",
      "signature": "5cdf992e880b2f243dbd4fb6577d4cf8-export declare const main: number;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "82bfd479d08397ebfae0c90721d8cd9f-import { a } from \"./a\"; import { b } from \"./b\"; export const main = a + b;",
        "signature": "5cdf992e880b2f243dbd4fb6577d4cf8-export declare const main: number;\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "fileIdsList": [
    [
      "../a.ts",
      "../b.ts"
    ]
  ],
  "options": {
    "declaration": true,
    "declarationMap": true,
    "outDir": "./",
    "sourceMap": true
  },
  "referencedMap": {
    "../index.ts": [
      "../a.ts",
      "../b.ts"
    ]
  },
  "size": 1593
}

Watch Registrations::
Directory watches::
  /home/src/tslibs/TS/Lib
  /home/src/workspaces/project
tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/workspaces/project/a.ts
*refresh*    /home/src/workspaces/project/index.ts
Signatures::
(computed .d.ts) /home/src/workspaces/project/a.ts
(computed .d.ts) /home/src/workspaces/project/index.ts
