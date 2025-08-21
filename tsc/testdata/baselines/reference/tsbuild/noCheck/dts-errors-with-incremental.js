currentDirectory::/home/src/workspaces/project
useCaseSensitiveFileNames::true
Input::
//// [/home/src/workspaces/project/a.ts] *new* 
export const a = class { private p = 10; };
//// [/home/src/workspaces/project/b.ts] *new* 
export const b = 10;
//// [/home/src/workspaces/project/tsconfig.json] *new* 
{
    "compilerOptions": {
        "declaration": true,
        "incremental": true
    }
}

tsgo -b -v --noCheck
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because output file 'tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project 'tsconfig.json'...

[96ma.ts[0m:[93m1[0m:[93m14[0m - [91merror[0m[90m TS4094: [0mProperty 'p' of exported anonymous class type may not be private or protected.

[7m1[0m export const a = class { private p = 10; };
[7m [0m [91m             ~[0m

  [96ma.ts[0m:[93m1[0m:[93m14[0m - Add a type annotation to the variable a.
    [7m1[0m export const a = class { private p = 10; };
    [7m [0m [96m             ~[0m


Found 1 error in a.ts[90m:1[0m

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
export declare const a: {
    new (): {
        p: number;
    };
};

//// [/home/src/workspaces/project/a.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.a = void 0;
const a = class {
    p = 10;
};
exports.a = a;

//// [/home/src/workspaces/project/b.d.ts] *new* 
export declare const b = 10;

//// [/home/src/workspaces/project/b.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.b = void 0;
exports.b = 10;

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","checkPending":true,"root":[[2,3]],"fileNames":["lib.d.ts","./a.ts","./b.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"9c1fc7106f3a21aadb5219db8b3209bc-export const a = class { private p = 10; };","signature":"ee8f9d3f76983159b6f8f0407d3b0dff-export declare const a: {\n    new (): {\n        p: number;\n    };\n};\n\n(13,1): error4094: Property 'p' of exported anonymous class type may not be private or protected.\n(13,1): error9027: Add a type annotation to the variable a.","impliedNodeFormat":1},{"version":"907abc8137ceb88f0ddd6eccfa92d573-export const b = 10;","signature":"eaed5dafb4668e1b7c86b65b584b776a-export declare const b = 10;\n","impliedNodeFormat":1}],"options":{"declaration":true},"semanticDiagnosticsPerFile":[1,2,3],"emitDiagnosticsPerFile":[[2,[{"pos":13,"end":14,"code":4094,"category":1,"message":"Property 'p' of exported anonymous class type may not be private or protected.","relatedInformation":[{"pos":13,"end":14,"code":9027,"category":1,"message":"Add a type annotation to the variable a."}]}]]]}
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "checkPending": true,
  "root": [
    {
      "files": [
        "./a.ts",
        "./b.ts"
      ],
      "original": [
        2,
        3
      ]
    }
  ],
  "fileNames": [
    "lib.d.ts",
    "./a.ts",
    "./b.ts"
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
      "version": "9c1fc7106f3a21aadb5219db8b3209bc-export const a = class { private p = 10; };",
      "signature": "ee8f9d3f76983159b6f8f0407d3b0dff-export declare const a: {\n    new (): {\n        p: number;\n    };\n};\n\n(13,1): error4094: Property 'p' of exported anonymous class type may not be private or protected.\n(13,1): error9027: Add a type annotation to the variable a.",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "9c1fc7106f3a21aadb5219db8b3209bc-export const a = class { private p = 10; };",
        "signature": "ee8f9d3f76983159b6f8f0407d3b0dff-export declare const a: {\n    new (): {\n        p: number;\n    };\n};\n\n(13,1): error4094: Property 'p' of exported anonymous class type may not be private or protected.\n(13,1): error9027: Add a type annotation to the variable a.",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./b.ts",
      "version": "907abc8137ceb88f0ddd6eccfa92d573-export const b = 10;",
      "signature": "eaed5dafb4668e1b7c86b65b584b776a-export declare const b = 10;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "907abc8137ceb88f0ddd6eccfa92d573-export const b = 10;",
        "signature": "eaed5dafb4668e1b7c86b65b584b776a-export declare const b = 10;\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "options": {
    "declaration": true
  },
  "semanticDiagnosticsPerFile": [
    "lib.d.ts",
    "./a.ts",
    "./b.ts"
  ],
  "emitDiagnosticsPerFile": [
    [
      "./a.ts",
      [
        {
          "pos": 13,
          "end": 14,
          "code": 4094,
          "category": 1,
          "message": "Property 'p' of exported anonymous class type may not be private or protected.",
          "relatedInformation": [
            {
              "pos": 13,
              "end": 14,
              "code": 9027,
              "category": 1,
              "message": "Add a type annotation to the variable a."
            }
          ]
        }
      ]
    ]
  ],
  "size": 1810
}

tsconfig.json::
SemanticDiagnostics::
*not cached* /home/src/tslibs/TS/Lib/lib.d.ts
*not cached* /home/src/workspaces/project/a.ts
*not cached* /home/src/workspaces/project/b.ts
Signatures::
(stored at emit) /home/src/workspaces/project/a.ts
(stored at emit) /home/src/workspaces/project/b.ts


Edit [0]:: no change

tsgo -b -v --noCheck
ExitStatus:: DiagnosticsPresent_OutputsSkipped
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because buildinfo file 'tsconfig.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project 'tsconfig.json'...

[96ma.ts[0m:[93m1[0m:[93m14[0m - [91merror[0m[90m TS4094: [0mProperty 'p' of exported anonymous class type may not be private or protected.

[7m1[0m export const a = class { private p = 10; };
[7m [0m [91m             ~[0m

  [96ma.ts[0m:[93m1[0m:[93m14[0m - Add a type annotation to the variable a.
    [7m1[0m export const a = class { private p = 10; };
    [7m [0m [96m             ~[0m


Found 1 error in a.ts[90m:1[0m

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo] *rewrite with same content*
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt] *rewrite with same content*

tsconfig.json::
SemanticDiagnostics::
*not cached* /home/src/tslibs/TS/Lib/lib.d.ts
*not cached* /home/src/workspaces/project/a.ts
*not cached* /home/src/workspaces/project/b.ts
Signatures::


Edit [1]:: Fix `a` error with noCheck
//// [/home/src/workspaces/project/a.ts] *modified* 
export const a = "hello";

tsgo -b -v --noCheck
ExitStatus:: Success
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because buildinfo file 'tsconfig.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project 'tsconfig.json'...

//// [/home/src/workspaces/project/a.d.ts] *modified* 
export declare const a = "hello";

//// [/home/src/workspaces/project/a.js] *modified* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.a = void 0;
exports.a = "hello";

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","checkPending":true,"root":[[2,3]],"fileNames":["lib.d.ts","./a.ts","./b.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"270675b5bc3d695752ac89c2c3af7b2e-export const a = \"hello\";","signature":"8db48ef76072c70d24f212a9f210f622-export declare const a = \"hello\";\n","impliedNodeFormat":1},{"version":"907abc8137ceb88f0ddd6eccfa92d573-export const b = 10;","signature":"eaed5dafb4668e1b7c86b65b584b776a-export declare const b = 10;\n","impliedNodeFormat":1}],"options":{"declaration":true},"semanticDiagnosticsPerFile":[1,2,3]}
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "checkPending": true,
  "root": [
    {
      "files": [
        "./a.ts",
        "./b.ts"
      ],
      "original": [
        2,
        3
      ]
    }
  ],
  "fileNames": [
    "lib.d.ts",
    "./a.ts",
    "./b.ts"
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
      "version": "270675b5bc3d695752ac89c2c3af7b2e-export const a = \"hello\";",
      "signature": "8db48ef76072c70d24f212a9f210f622-export declare const a = \"hello\";\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "270675b5bc3d695752ac89c2c3af7b2e-export const a = \"hello\";",
        "signature": "8db48ef76072c70d24f212a9f210f622-export declare const a = \"hello\";\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./b.ts",
      "version": "907abc8137ceb88f0ddd6eccfa92d573-export const b = 10;",
      "signature": "eaed5dafb4668e1b7c86b65b584b776a-export declare const b = 10;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "907abc8137ceb88f0ddd6eccfa92d573-export const b = 10;",
        "signature": "eaed5dafb4668e1b7c86b65b584b776a-export declare const b = 10;\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "options": {
    "declaration": true
  },
  "semanticDiagnosticsPerFile": [
    "lib.d.ts",
    "./a.ts",
    "./b.ts"
  ],
  "size": 1307
}

tsconfig.json::
SemanticDiagnostics::
*not cached* /home/src/tslibs/TS/Lib/lib.d.ts
*not cached* /home/src/workspaces/project/a.ts
*not cached* /home/src/workspaces/project/b.ts
Signatures::
(computed .d.ts) /home/src/workspaces/project/a.ts


Edit [2]:: no change

tsgo -b -v --noCheck
ExitStatus:: Success
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is up to date because newest input 'a.ts' is older than output 'tsconfig.tsbuildinfo'




Edit [3]:: No Change run with checking

tsgo -b -v
ExitStatus:: Success
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because buildinfo file 'tsconfig.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project 'tsconfig.json'...

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[[2,3]],"fileNames":["lib.d.ts","./a.ts","./b.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"270675b5bc3d695752ac89c2c3af7b2e-export const a = \"hello\";","signature":"8db48ef76072c70d24f212a9f210f622-export declare const a = \"hello\";\n","impliedNodeFormat":1},{"version":"907abc8137ceb88f0ddd6eccfa92d573-export const b = 10;","signature":"eaed5dafb4668e1b7c86b65b584b776a-export declare const b = 10;\n","impliedNodeFormat":1}],"options":{"declaration":true}}
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./a.ts",
        "./b.ts"
      ],
      "original": [
        2,
        3
      ]
    }
  ],
  "fileNames": [
    "lib.d.ts",
    "./a.ts",
    "./b.ts"
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
      "version": "270675b5bc3d695752ac89c2c3af7b2e-export const a = \"hello\";",
      "signature": "8db48ef76072c70d24f212a9f210f622-export declare const a = \"hello\";\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "270675b5bc3d695752ac89c2c3af7b2e-export const a = \"hello\";",
        "signature": "8db48ef76072c70d24f212a9f210f622-export declare const a = \"hello\";\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./b.ts",
      "version": "907abc8137ceb88f0ddd6eccfa92d573-export const b = 10;",
      "signature": "eaed5dafb4668e1b7c86b65b584b776a-export declare const b = 10;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "907abc8137ceb88f0ddd6eccfa92d573-export const b = 10;",
        "signature": "eaed5dafb4668e1b7c86b65b584b776a-export declare const b = 10;\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "options": {
    "declaration": true
  },
  "size": 1250
}

tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.d.ts
*refresh*    /home/src/workspaces/project/a.ts
*refresh*    /home/src/workspaces/project/b.ts
Signatures::


Edit [4]:: No Change run with checking

tsgo -b -v
ExitStatus:: Success
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is up to date because newest input 'a.ts' is older than output 'tsconfig.tsbuildinfo'




Edit [5]:: no change

tsgo -b -v --noCheck
ExitStatus:: Success
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is up to date because newest input 'a.ts' is older than output 'tsconfig.tsbuildinfo'




Edit [6]:: Introduce error with noCheck
//// [/home/src/workspaces/project/a.ts] *modified* 
export const a = class { private p = 10; };

tsgo -b -v --noCheck
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because output 'tsconfig.tsbuildinfo' is older than input 'a.ts'

[[90mHH:MM:SS AM[0m] Building project 'tsconfig.json'...

[96ma.ts[0m:[93m1[0m:[93m14[0m - [91merror[0m[90m TS4094: [0mProperty 'p' of exported anonymous class type may not be private or protected.

[7m1[0m export const a = class { private p = 10; };
[7m [0m [91m             ~[0m

  [96ma.ts[0m:[93m1[0m:[93m14[0m - Add a type annotation to the variable a.
    [7m1[0m export const a = class { private p = 10; };
    [7m [0m [96m             ~[0m


Found 1 error in a.ts[90m:1[0m

//// [/home/src/workspaces/project/a.d.ts] *modified* 
export declare const a: {
    new (): {
        p: number;
    };
};

//// [/home/src/workspaces/project/a.js] *modified* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.a = void 0;
const a = class {
    p = 10;
};
exports.a = a;

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","checkPending":true,"root":[[2,3]],"fileNames":["lib.d.ts","./a.ts","./b.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"9c1fc7106f3a21aadb5219db8b3209bc-export const a = class { private p = 10; };","signature":"ee8f9d3f76983159b6f8f0407d3b0dff-export declare const a: {\n    new (): {\n        p: number;\n    };\n};\n\n(13,1): error4094: Property 'p' of exported anonymous class type may not be private or protected.\n(13,1): error9027: Add a type annotation to the variable a.","impliedNodeFormat":1},{"version":"907abc8137ceb88f0ddd6eccfa92d573-export const b = 10;","signature":"eaed5dafb4668e1b7c86b65b584b776a-export declare const b = 10;\n","impliedNodeFormat":1}],"options":{"declaration":true},"semanticDiagnosticsPerFile":[2],"emitDiagnosticsPerFile":[[2,[{"pos":13,"end":14,"code":4094,"category":1,"message":"Property 'p' of exported anonymous class type may not be private or protected.","relatedInformation":[{"pos":13,"end":14,"code":9027,"category":1,"message":"Add a type annotation to the variable a."}]}]]]}
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "checkPending": true,
  "root": [
    {
      "files": [
        "./a.ts",
        "./b.ts"
      ],
      "original": [
        2,
        3
      ]
    }
  ],
  "fileNames": [
    "lib.d.ts",
    "./a.ts",
    "./b.ts"
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
      "version": "9c1fc7106f3a21aadb5219db8b3209bc-export const a = class { private p = 10; };",
      "signature": "ee8f9d3f76983159b6f8f0407d3b0dff-export declare const a: {\n    new (): {\n        p: number;\n    };\n};\n\n(13,1): error4094: Property 'p' of exported anonymous class type may not be private or protected.\n(13,1): error9027: Add a type annotation to the variable a.",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "9c1fc7106f3a21aadb5219db8b3209bc-export const a = class { private p = 10; };",
        "signature": "ee8f9d3f76983159b6f8f0407d3b0dff-export declare const a: {\n    new (): {\n        p: number;\n    };\n};\n\n(13,1): error4094: Property 'p' of exported anonymous class type may not be private or protected.\n(13,1): error9027: Add a type annotation to the variable a.",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./b.ts",
      "version": "907abc8137ceb88f0ddd6eccfa92d573-export const b = 10;",
      "signature": "eaed5dafb4668e1b7c86b65b584b776a-export declare const b = 10;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "907abc8137ceb88f0ddd6eccfa92d573-export const b = 10;",
        "signature": "eaed5dafb4668e1b7c86b65b584b776a-export declare const b = 10;\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "options": {
    "declaration": true
  },
  "semanticDiagnosticsPerFile": [
    "./a.ts"
  ],
  "emitDiagnosticsPerFile": [
    [
      "./a.ts",
      [
        {
          "pos": 13,
          "end": 14,
          "code": 4094,
          "category": 1,
          "message": "Property 'p' of exported anonymous class type may not be private or protected.",
          "relatedInformation": [
            {
              "pos": 13,
              "end": 14,
              "code": 9027,
              "category": 1,
              "message": "Add a type annotation to the variable a."
            }
          ]
        }
      ]
    ]
  ],
  "size": 1806
}

tsconfig.json::
SemanticDiagnostics::
*not cached* /home/src/workspaces/project/a.ts
Signatures::
(computed .d.ts) /home/src/workspaces/project/a.ts


Edit [7]:: no change

tsgo -b -v --noCheck
ExitStatus:: DiagnosticsPresent_OutputsSkipped
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because buildinfo file 'tsconfig.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project 'tsconfig.json'...

[96ma.ts[0m:[93m1[0m:[93m14[0m - [91merror[0m[90m TS4094: [0mProperty 'p' of exported anonymous class type may not be private or protected.

[7m1[0m export const a = class { private p = 10; };
[7m [0m [91m             ~[0m

  [96ma.ts[0m:[93m1[0m:[93m14[0m - Add a type annotation to the variable a.
    [7m1[0m export const a = class { private p = 10; };
    [7m [0m [96m             ~[0m


Found 1 error in a.ts[90m:1[0m

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo] *rewrite with same content*
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt] *rewrite with same content*

tsconfig.json::
SemanticDiagnostics::
*not cached* /home/src/workspaces/project/a.ts
Signatures::


Edit [8]:: No Change run with checking

tsgo -b -v
ExitStatus:: DiagnosticsPresent_OutputsSkipped
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because buildinfo file 'tsconfig.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project 'tsconfig.json'...

[96ma.ts[0m:[93m1[0m:[93m14[0m - [91merror[0m[90m TS4094: [0mProperty 'p' of exported anonymous class type may not be private or protected.

[7m1[0m export const a = class { private p = 10; };
[7m [0m [91m             ~[0m

  [96ma.ts[0m:[93m1[0m:[93m14[0m - Add a type annotation to the variable a.
    [7m1[0m export const a = class { private p = 10; };
    [7m [0m [96m             ~[0m


Found 1 error in a.ts[90m:1[0m

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[[2,3]],"fileNames":["lib.d.ts","./a.ts","./b.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"9c1fc7106f3a21aadb5219db8b3209bc-export const a = class { private p = 10; };","signature":"ee8f9d3f76983159b6f8f0407d3b0dff-export declare const a: {\n    new (): {\n        p: number;\n    };\n};\n\n(13,1): error4094: Property 'p' of exported anonymous class type may not be private or protected.\n(13,1): error9027: Add a type annotation to the variable a.","impliedNodeFormat":1},{"version":"907abc8137ceb88f0ddd6eccfa92d573-export const b = 10;","signature":"eaed5dafb4668e1b7c86b65b584b776a-export declare const b = 10;\n","impliedNodeFormat":1}],"options":{"declaration":true},"emitDiagnosticsPerFile":[[2,[{"pos":13,"end":14,"code":4094,"category":1,"message":"Property 'p' of exported anonymous class type may not be private or protected.","relatedInformation":[{"pos":13,"end":14,"code":9027,"category":1,"message":"Add a type annotation to the variable a."}]}]]]}
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./a.ts",
        "./b.ts"
      ],
      "original": [
        2,
        3
      ]
    }
  ],
  "fileNames": [
    "lib.d.ts",
    "./a.ts",
    "./b.ts"
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
      "version": "9c1fc7106f3a21aadb5219db8b3209bc-export const a = class { private p = 10; };",
      "signature": "ee8f9d3f76983159b6f8f0407d3b0dff-export declare const a: {\n    new (): {\n        p: number;\n    };\n};\n\n(13,1): error4094: Property 'p' of exported anonymous class type may not be private or protected.\n(13,1): error9027: Add a type annotation to the variable a.",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "9c1fc7106f3a21aadb5219db8b3209bc-export const a = class { private p = 10; };",
        "signature": "ee8f9d3f76983159b6f8f0407d3b0dff-export declare const a: {\n    new (): {\n        p: number;\n    };\n};\n\n(13,1): error4094: Property 'p' of exported anonymous class type may not be private or protected.\n(13,1): error9027: Add a type annotation to the variable a.",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./b.ts",
      "version": "907abc8137ceb88f0ddd6eccfa92d573-export const b = 10;",
      "signature": "eaed5dafb4668e1b7c86b65b584b776a-export declare const b = 10;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "907abc8137ceb88f0ddd6eccfa92d573-export const b = 10;",
        "signature": "eaed5dafb4668e1b7c86b65b584b776a-export declare const b = 10;\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "options": {
    "declaration": true
  },
  "emitDiagnosticsPerFile": [
    [
      "./a.ts",
      [
        {
          "pos": 13,
          "end": 14,
          "code": 4094,
          "category": 1,
          "message": "Property 'p' of exported anonymous class type may not be private or protected.",
          "relatedInformation": [
            {
              "pos": 13,
              "end": 14,
              "code": 9027,
              "category": 1,
              "message": "Add a type annotation to the variable a."
            }
          ]
        }
      ]
    ]
  ],
  "size": 1753
}

tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/workspaces/project/a.ts
Signatures::


Edit [9]:: Fix `a` error with noCheck
//// [/home/src/workspaces/project/a.ts] *modified* 
export const a = "hello";

tsgo -b -v --noCheck
ExitStatus:: Success
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because buildinfo file 'tsconfig.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project 'tsconfig.json'...

//// [/home/src/workspaces/project/a.d.ts] *modified* 
export declare const a = "hello";

//// [/home/src/workspaces/project/a.js] *modified* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.a = void 0;
exports.a = "hello";

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","checkPending":true,"root":[[2,3]],"fileNames":["lib.d.ts","./a.ts","./b.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"270675b5bc3d695752ac89c2c3af7b2e-export const a = \"hello\";","signature":"8db48ef76072c70d24f212a9f210f622-export declare const a = \"hello\";\n","impliedNodeFormat":1},{"version":"907abc8137ceb88f0ddd6eccfa92d573-export const b = 10;","signature":"eaed5dafb4668e1b7c86b65b584b776a-export declare const b = 10;\n","impliedNodeFormat":1}],"options":{"declaration":true},"semanticDiagnosticsPerFile":[2]}
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "checkPending": true,
  "root": [
    {
      "files": [
        "./a.ts",
        "./b.ts"
      ],
      "original": [
        2,
        3
      ]
    }
  ],
  "fileNames": [
    "lib.d.ts",
    "./a.ts",
    "./b.ts"
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
      "version": "270675b5bc3d695752ac89c2c3af7b2e-export const a = \"hello\";",
      "signature": "8db48ef76072c70d24f212a9f210f622-export declare const a = \"hello\";\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "270675b5bc3d695752ac89c2c3af7b2e-export const a = \"hello\";",
        "signature": "8db48ef76072c70d24f212a9f210f622-export declare const a = \"hello\";\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./b.ts",
      "version": "907abc8137ceb88f0ddd6eccfa92d573-export const b = 10;",
      "signature": "eaed5dafb4668e1b7c86b65b584b776a-export declare const b = 10;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "907abc8137ceb88f0ddd6eccfa92d573-export const b = 10;",
        "signature": "eaed5dafb4668e1b7c86b65b584b776a-export declare const b = 10;\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "options": {
    "declaration": true
  },
  "semanticDiagnosticsPerFile": [
    "./a.ts"
  ],
  "size": 1303
}

tsconfig.json::
SemanticDiagnostics::
*not cached* /home/src/workspaces/project/a.ts
Signatures::
(computed .d.ts) /home/src/workspaces/project/a.ts


Edit [10]:: No Change run with checking

tsgo -b -v
ExitStatus:: Success
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because buildinfo file 'tsconfig.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project 'tsconfig.json'...

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[[2,3]],"fileNames":["lib.d.ts","./a.ts","./b.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"270675b5bc3d695752ac89c2c3af7b2e-export const a = \"hello\";","signature":"8db48ef76072c70d24f212a9f210f622-export declare const a = \"hello\";\n","impliedNodeFormat":1},{"version":"907abc8137ceb88f0ddd6eccfa92d573-export const b = 10;","signature":"eaed5dafb4668e1b7c86b65b584b776a-export declare const b = 10;\n","impliedNodeFormat":1}],"options":{"declaration":true}}
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./a.ts",
        "./b.ts"
      ],
      "original": [
        2,
        3
      ]
    }
  ],
  "fileNames": [
    "lib.d.ts",
    "./a.ts",
    "./b.ts"
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
      "version": "270675b5bc3d695752ac89c2c3af7b2e-export const a = \"hello\";",
      "signature": "8db48ef76072c70d24f212a9f210f622-export declare const a = \"hello\";\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "270675b5bc3d695752ac89c2c3af7b2e-export const a = \"hello\";",
        "signature": "8db48ef76072c70d24f212a9f210f622-export declare const a = \"hello\";\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./b.ts",
      "version": "907abc8137ceb88f0ddd6eccfa92d573-export const b = 10;",
      "signature": "eaed5dafb4668e1b7c86b65b584b776a-export declare const b = 10;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "907abc8137ceb88f0ddd6eccfa92d573-export const b = 10;",
        "signature": "eaed5dafb4668e1b7c86b65b584b776a-export declare const b = 10;\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "options": {
    "declaration": true
  },
  "size": 1250
}

tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/workspaces/project/a.ts
Signatures::


Edit [11]:: Add file with error
//// [/home/src/workspaces/project/c.ts] *new* 
export const c: number = "hello";

tsgo -b -v
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because output 'tsconfig.tsbuildinfo' is older than input 'c.ts'

[[90mHH:MM:SS AM[0m] Building project 'tsconfig.json'...

[96mc.ts[0m:[93m1[0m:[93m14[0m - [91merror[0m[90m TS2322: [0mType 'string' is not assignable to type 'number'.

[7m1[0m export const c: number = "hello";
[7m [0m [91m             ~[0m


Found 1 error in c.ts[90m:1[0m

//// [/home/src/workspaces/project/c.d.ts] *new* 
export declare const c: number;

//// [/home/src/workspaces/project/c.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.c = void 0;
exports.c = "hello";

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[[2,4]],"fileNames":["lib.d.ts","./a.ts","./b.ts","./c.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"270675b5bc3d695752ac89c2c3af7b2e-export const a = \"hello\";","signature":"8db48ef76072c70d24f212a9f210f622-export declare const a = \"hello\";\n","impliedNodeFormat":1},{"version":"907abc8137ceb88f0ddd6eccfa92d573-export const b = 10;","signature":"eaed5dafb4668e1b7c86b65b584b776a-export declare const b = 10;\n","impliedNodeFormat":1},{"version":"32c618963fbf4ae5f1475f9be91d77bb-export const c: number = \"hello\";","signature":"330cf13f2bbf810d913e97d0cc189ea6-export declare const c: number;\n","impliedNodeFormat":1}],"options":{"declaration":true},"semanticDiagnosticsPerFile":[[4,[{"pos":13,"end":14,"code":2322,"category":1,"message":"Type 'string' is not assignable to type 'number'."}]]]}
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./a.ts",
        "./b.ts",
        "./c.ts"
      ],
      "original": [
        2,
        4
      ]
    }
  ],
  "fileNames": [
    "lib.d.ts",
    "./a.ts",
    "./b.ts",
    "./c.ts"
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
      "version": "270675b5bc3d695752ac89c2c3af7b2e-export const a = \"hello\";",
      "signature": "8db48ef76072c70d24f212a9f210f622-export declare const a = \"hello\";\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "270675b5bc3d695752ac89c2c3af7b2e-export const a = \"hello\";",
        "signature": "8db48ef76072c70d24f212a9f210f622-export declare const a = \"hello\";\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./b.ts",
      "version": "907abc8137ceb88f0ddd6eccfa92d573-export const b = 10;",
      "signature": "eaed5dafb4668e1b7c86b65b584b776a-export declare const b = 10;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "907abc8137ceb88f0ddd6eccfa92d573-export const b = 10;",
        "signature": "eaed5dafb4668e1b7c86b65b584b776a-export declare const b = 10;\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./c.ts",
      "version": "32c618963fbf4ae5f1475f9be91d77bb-export const c: number = \"hello\";",
      "signature": "330cf13f2bbf810d913e97d0cc189ea6-export declare const c: number;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "32c618963fbf4ae5f1475f9be91d77bb-export const c: number = \"hello\";",
        "signature": "330cf13f2bbf810d913e97d0cc189ea6-export declare const c: number;\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "options": {
    "declaration": true
  },
  "semanticDiagnosticsPerFile": [
    [
      "./c.ts",
      [
        {
          "pos": 13,
          "end": 14,
          "code": 2322,
          "category": 1,
          "message": "Type 'string' is not assignable to type 'number'."
        }
      ]
    ]
  ],
  "size": 1589
}

tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/workspaces/project/c.ts
Signatures::
(computed .d.ts) /home/src/workspaces/project/c.ts


Edit [12]:: Introduce error with noCheck
//// [/home/src/workspaces/project/a.ts] *modified* 
export const a = class { private p = 10; };

tsgo -b -v --noCheck
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because output 'tsconfig.tsbuildinfo' is older than input 'a.ts'

[[90mHH:MM:SS AM[0m] Building project 'tsconfig.json'...

[96ma.ts[0m:[93m1[0m:[93m14[0m - [91merror[0m[90m TS4094: [0mProperty 'p' of exported anonymous class type may not be private or protected.

[7m1[0m export const a = class { private p = 10; };
[7m [0m [91m             ~[0m

  [96ma.ts[0m:[93m1[0m:[93m14[0m - Add a type annotation to the variable a.
    [7m1[0m export const a = class { private p = 10; };
    [7m [0m [96m             ~[0m


Found 1 error in a.ts[90m:1[0m

//// [/home/src/workspaces/project/a.d.ts] *modified* 
export declare const a: {
    new (): {
        p: number;
    };
};

//// [/home/src/workspaces/project/a.js] *modified* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.a = void 0;
const a = class {
    p = 10;
};
exports.a = a;

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","checkPending":true,"root":[[2,4]],"fileNames":["lib.d.ts","./a.ts","./b.ts","./c.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"9c1fc7106f3a21aadb5219db8b3209bc-export const a = class { private p = 10; };","signature":"ee8f9d3f76983159b6f8f0407d3b0dff-export declare const a: {\n    new (): {\n        p: number;\n    };\n};\n\n(13,1): error4094: Property 'p' of exported anonymous class type may not be private or protected.\n(13,1): error9027: Add a type annotation to the variable a.","impliedNodeFormat":1},{"version":"907abc8137ceb88f0ddd6eccfa92d573-export const b = 10;","signature":"eaed5dafb4668e1b7c86b65b584b776a-export declare const b = 10;\n","impliedNodeFormat":1},{"version":"32c618963fbf4ae5f1475f9be91d77bb-export const c: number = \"hello\";","signature":"330cf13f2bbf810d913e97d0cc189ea6-export declare const c: number;\n","impliedNodeFormat":1}],"options":{"declaration":true},"semanticDiagnosticsPerFile":[2,[4,[{"pos":13,"end":14,"code":2322,"category":1,"message":"Type 'string' is not assignable to type 'number'."}]]],"emitDiagnosticsPerFile":[[2,[{"pos":13,"end":14,"code":4094,"category":1,"message":"Property 'p' of exported anonymous class type may not be private or protected.","relatedInformation":[{"pos":13,"end":14,"code":9027,"category":1,"message":"Add a type annotation to the variable a."}]}]]]}
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "checkPending": true,
  "root": [
    {
      "files": [
        "./a.ts",
        "./b.ts",
        "./c.ts"
      ],
      "original": [
        2,
        4
      ]
    }
  ],
  "fileNames": [
    "lib.d.ts",
    "./a.ts",
    "./b.ts",
    "./c.ts"
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
      "version": "9c1fc7106f3a21aadb5219db8b3209bc-export const a = class { private p = 10; };",
      "signature": "ee8f9d3f76983159b6f8f0407d3b0dff-export declare const a: {\n    new (): {\n        p: number;\n    };\n};\n\n(13,1): error4094: Property 'p' of exported anonymous class type may not be private or protected.\n(13,1): error9027: Add a type annotation to the variable a.",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "9c1fc7106f3a21aadb5219db8b3209bc-export const a = class { private p = 10; };",
        "signature": "ee8f9d3f76983159b6f8f0407d3b0dff-export declare const a: {\n    new (): {\n        p: number;\n    };\n};\n\n(13,1): error4094: Property 'p' of exported anonymous class type may not be private or protected.\n(13,1): error9027: Add a type annotation to the variable a.",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./b.ts",
      "version": "907abc8137ceb88f0ddd6eccfa92d573-export const b = 10;",
      "signature": "eaed5dafb4668e1b7c86b65b584b776a-export declare const b = 10;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "907abc8137ceb88f0ddd6eccfa92d573-export const b = 10;",
        "signature": "eaed5dafb4668e1b7c86b65b584b776a-export declare const b = 10;\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./c.ts",
      "version": "32c618963fbf4ae5f1475f9be91d77bb-export const c: number = \"hello\";",
      "signature": "330cf13f2bbf810d913e97d0cc189ea6-export declare const c: number;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "32c618963fbf4ae5f1475f9be91d77bb-export const c: number = \"hello\";",
        "signature": "330cf13f2bbf810d913e97d0cc189ea6-export declare const c: number;\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "options": {
    "declaration": true
  },
  "semanticDiagnosticsPerFile": [
    "./a.ts",
    [
      "./c.ts",
      [
        {
          "pos": 13,
          "end": 14,
          "code": 2322,
          "category": 1,
          "message": "Type 'string' is not assignable to type 'number'."
        }
      ]
    ]
  ],
  "emitDiagnosticsPerFile": [
    [
      "./a.ts",
      [
        {
          "pos": 13,
          "end": 14,
          "code": 4094,
          "category": 1,
          "message": "Property 'p' of exported anonymous class type may not be private or protected.",
          "relatedInformation": [
            {
              "pos": 13,
              "end": 14,
              "code": 9027,
              "category": 1,
              "message": "Add a type annotation to the variable a."
            }
          ]
        }
      ]
    ]
  ],
  "size": 2114
}

tsconfig.json::
SemanticDiagnostics::
*not cached* /home/src/workspaces/project/a.ts
Signatures::
(computed .d.ts) /home/src/workspaces/project/a.ts


Edit [13]:: Fix `a` error with noCheck
//// [/home/src/workspaces/project/a.ts] *modified* 
export const a = "hello";

tsgo -b -v --noCheck
ExitStatus:: Success
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because buildinfo file 'tsconfig.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project 'tsconfig.json'...

//// [/home/src/workspaces/project/a.d.ts] *modified* 
export declare const a = "hello";

//// [/home/src/workspaces/project/a.js] *modified* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.a = void 0;
exports.a = "hello";

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","checkPending":true,"root":[[2,4]],"fileNames":["lib.d.ts","./a.ts","./b.ts","./c.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"270675b5bc3d695752ac89c2c3af7b2e-export const a = \"hello\";","signature":"8db48ef76072c70d24f212a9f210f622-export declare const a = \"hello\";\n","impliedNodeFormat":1},{"version":"907abc8137ceb88f0ddd6eccfa92d573-export const b = 10;","signature":"eaed5dafb4668e1b7c86b65b584b776a-export declare const b = 10;\n","impliedNodeFormat":1},{"version":"32c618963fbf4ae5f1475f9be91d77bb-export const c: number = \"hello\";","signature":"330cf13f2bbf810d913e97d0cc189ea6-export declare const c: number;\n","impliedNodeFormat":1}],"options":{"declaration":true},"semanticDiagnosticsPerFile":[2,[4,[{"pos":13,"end":14,"code":2322,"category":1,"message":"Type 'string' is not assignable to type 'number'."}]]]}
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "checkPending": true,
  "root": [
    {
      "files": [
        "./a.ts",
        "./b.ts",
        "./c.ts"
      ],
      "original": [
        2,
        4
      ]
    }
  ],
  "fileNames": [
    "lib.d.ts",
    "./a.ts",
    "./b.ts",
    "./c.ts"
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
      "version": "270675b5bc3d695752ac89c2c3af7b2e-export const a = \"hello\";",
      "signature": "8db48ef76072c70d24f212a9f210f622-export declare const a = \"hello\";\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "270675b5bc3d695752ac89c2c3af7b2e-export const a = \"hello\";",
        "signature": "8db48ef76072c70d24f212a9f210f622-export declare const a = \"hello\";\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./b.ts",
      "version": "907abc8137ceb88f0ddd6eccfa92d573-export const b = 10;",
      "signature": "eaed5dafb4668e1b7c86b65b584b776a-export declare const b = 10;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "907abc8137ceb88f0ddd6eccfa92d573-export const b = 10;",
        "signature": "eaed5dafb4668e1b7c86b65b584b776a-export declare const b = 10;\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./c.ts",
      "version": "32c618963fbf4ae5f1475f9be91d77bb-export const c: number = \"hello\";",
      "signature": "330cf13f2bbf810d913e97d0cc189ea6-export declare const c: number;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "32c618963fbf4ae5f1475f9be91d77bb-export const c: number = \"hello\";",
        "signature": "330cf13f2bbf810d913e97d0cc189ea6-export declare const c: number;\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "options": {
    "declaration": true
  },
  "semanticDiagnosticsPerFile": [
    "./a.ts",
    [
      "./c.ts",
      [
        {
          "pos": 13,
          "end": 14,
          "code": 2322,
          "category": 1,
          "message": "Type 'string' is not assignable to type 'number'."
        }
      ]
    ]
  ],
  "size": 1611
}

tsconfig.json::
SemanticDiagnostics::
*not cached* /home/src/workspaces/project/a.ts
Signatures::
(computed .d.ts) /home/src/workspaces/project/a.ts


Edit [14]:: No Change run with checking

tsgo -b -v
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because buildinfo file 'tsconfig.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project 'tsconfig.json'...

[96mc.ts[0m:[93m1[0m:[93m14[0m - [91merror[0m[90m TS2322: [0mType 'string' is not assignable to type 'number'.

[7m1[0m export const c: number = "hello";
[7m [0m [91m             ~[0m


Found 1 error in c.ts[90m:1[0m

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[[2,4]],"fileNames":["lib.d.ts","./a.ts","./b.ts","./c.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"270675b5bc3d695752ac89c2c3af7b2e-export const a = \"hello\";","signature":"8db48ef76072c70d24f212a9f210f622-export declare const a = \"hello\";\n","impliedNodeFormat":1},{"version":"907abc8137ceb88f0ddd6eccfa92d573-export const b = 10;","signature":"eaed5dafb4668e1b7c86b65b584b776a-export declare const b = 10;\n","impliedNodeFormat":1},{"version":"32c618963fbf4ae5f1475f9be91d77bb-export const c: number = \"hello\";","signature":"330cf13f2bbf810d913e97d0cc189ea6-export declare const c: number;\n","impliedNodeFormat":1}],"options":{"declaration":true},"semanticDiagnosticsPerFile":[[4,[{"pos":13,"end":14,"code":2322,"category":1,"message":"Type 'string' is not assignable to type 'number'."}]]]}
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./a.ts",
        "./b.ts",
        "./c.ts"
      ],
      "original": [
        2,
        4
      ]
    }
  ],
  "fileNames": [
    "lib.d.ts",
    "./a.ts",
    "./b.ts",
    "./c.ts"
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
      "version": "270675b5bc3d695752ac89c2c3af7b2e-export const a = \"hello\";",
      "signature": "8db48ef76072c70d24f212a9f210f622-export declare const a = \"hello\";\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "270675b5bc3d695752ac89c2c3af7b2e-export const a = \"hello\";",
        "signature": "8db48ef76072c70d24f212a9f210f622-export declare const a = \"hello\";\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./b.ts",
      "version": "907abc8137ceb88f0ddd6eccfa92d573-export const b = 10;",
      "signature": "eaed5dafb4668e1b7c86b65b584b776a-export declare const b = 10;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "907abc8137ceb88f0ddd6eccfa92d573-export const b = 10;",
        "signature": "eaed5dafb4668e1b7c86b65b584b776a-export declare const b = 10;\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./c.ts",
      "version": "32c618963fbf4ae5f1475f9be91d77bb-export const c: number = \"hello\";",
      "signature": "330cf13f2bbf810d913e97d0cc189ea6-export declare const c: number;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "32c618963fbf4ae5f1475f9be91d77bb-export const c: number = \"hello\";",
        "signature": "330cf13f2bbf810d913e97d0cc189ea6-export declare const c: number;\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "options": {
    "declaration": true
  },
  "semanticDiagnosticsPerFile": [
    [
      "./c.ts",
      [
        {
          "pos": 13,
          "end": 14,
          "code": 2322,
          "category": 1,
          "message": "Type 'string' is not assignable to type 'number'."
        }
      ]
    ]
  ],
  "size": 1589
}

tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/workspaces/project/a.ts
Signatures::


Edit [15]:: no change

tsgo -b -v --noCheck
ExitStatus:: Success
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is up to date because newest input 'a.ts' is older than output 'tsconfig.tsbuildinfo'




Edit [16]:: No Change run with checking

tsgo -b -v
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because buildinfo file 'tsconfig.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project 'tsconfig.json'...

[96mc.ts[0m:[93m1[0m:[93m14[0m - [91merror[0m[90m TS2322: [0mType 'string' is not assignable to type 'number'.

[7m1[0m export const c: number = "hello";
[7m [0m [91m             ~[0m


Found 1 error in c.ts[90m:1[0m


tsconfig.json::
SemanticDiagnostics::
Signatures::
