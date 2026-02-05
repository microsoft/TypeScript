currentDirectory::/home/src/projects/project
useCaseSensitiveFileNames::true
Input::
//// [/home/src/projects/project/a.ts] *new* 
export const a = class { private p = 10; };
//// [/home/src/projects/project/b.ts] *new* 
export const b = 10;
//// [/home/src/projects/project/tsconfig.json] *new* 
{
    "compilerOptions": {
        "incremental": true,
        "declaration": true
    }
}

tsgo --noEmit
ExitStatus:: DiagnosticsPresent_OutputsSkipped
Output::
[96ma.ts[0m:[93m1[0m:[93m14[0m - [91merror[0m[90m TS4094: [0mProperty 'p' of exported anonymous class type may not be private or protected.

[7m1[0m export const a = class { private p = 10; };
[7m [0m [91m             ~[0m

  [96ma.ts[0m:[93m1[0m:[93m14[0m - Add a type annotation to the variable a.
    [7m1[0m export const a = class { private p = 10; };
    [7m [0m [96m             ~[0m


Found 1 error in a.ts[90m:1[0m

//// [/home/src/projects/project/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":[[2,3]],"fileNames":["lib.es2024.full.d.ts","./a.ts","./b.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},"9c1fc7106f3a21aadb5219db8b3209bc-export const a = class { private p = 10; };","907abc8137ceb88f0ddd6eccfa92d573-export const b = 10;"],"options":{"declaration":true},"emitDiagnosticsPerFile":[[2,[{"pos":13,"end":14,"code":4094,"category":1,"messageKey":"Property_0_of_exported_anonymous_class_type_may_not_be_private_or_protected_4094","messageArgs":["p"],"relatedInformation":[{"pos":13,"end":14,"code":9027,"category":1,"messageKey":"Add_a_type_annotation_to_the_variable_0_9027","messageArgs":["a"]}]}]]],"affectedFilesPendingEmit":[[2,17],[3,17]]}
//// [/home/src/projects/project/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
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
    "lib.es2024.full.d.ts",
    "./a.ts",
    "./b.ts"
  ],
  "fileInfos": [
    {
      "fileName": "lib.es2024.full.d.ts",
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
      "signature": "9c1fc7106f3a21aadb5219db8b3209bc-export const a = class { private p = 10; };",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "./b.ts",
      "version": "907abc8137ceb88f0ddd6eccfa92d573-export const b = 10;",
      "signature": "907abc8137ceb88f0ddd6eccfa92d573-export const b = 10;",
      "impliedNodeFormat": "CommonJS"
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
          "messageKey": "Property_0_of_exported_anonymous_class_type_may_not_be_private_or_protected_4094",
          "messageArgs": [
            "p"
          ],
          "relatedInformation": [
            {
              "pos": 13,
              "end": 14,
              "code": 9027,
              "category": 1,
              "messageKey": "Add_a_type_annotation_to_the_variable_0_9027",
              "messageArgs": [
                "a"
              ]
            }
          ]
        }
      ]
    ]
  ],
  "affectedFilesPendingEmit": [
    [
      "./a.ts",
      "Js|DtsEmit",
      [
        2,
        17
      ]
    ],
    [
      "./b.ts",
      "Js|DtsEmit",
      [
        3,
        17
      ]
    ]
  ],
  "size": 1432
}
//// [/home/src/tslibs/TS/Lib/lib.es2024.full.d.ts] *Lib*
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

tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es2024.full.d.ts
*refresh*    /home/src/projects/project/a.ts
*refresh*    /home/src/projects/project/b.ts
Signatures::


Edit [0]:: no change

tsgo --noEmit
ExitStatus:: DiagnosticsPresent_OutputsSkipped
Output::
[96ma.ts[0m:[93m1[0m:[93m14[0m - [91merror[0m[90m TS4094: [0mProperty 'p' of exported anonymous class type may not be private or protected.

[7m1[0m export const a = class { private p = 10; };
[7m [0m [91m             ~[0m

  [96ma.ts[0m:[93m1[0m:[93m14[0m - Add a type annotation to the variable a.
    [7m1[0m export const a = class { private p = 10; };
    [7m [0m [96m             ~[0m


Found 1 error in a.ts[90m:1[0m


tsconfig.json::
SemanticDiagnostics::
Signatures::


Edit [1]:: Fix error
//// [/home/src/projects/project/a.ts] *modified* 
export const a = "hello";

tsgo --noEmit
ExitStatus:: Success
Output::
//// [/home/src/projects/project/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[[2,3]],"fileNames":["lib.es2024.full.d.ts","./a.ts","./b.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"270675b5bc3d695752ac89c2c3af7b2e-export const a = \"hello\";","signature":"8db48ef76072c70d24f212a9f210f622-export declare const a = \"hello\";\n","impliedNodeFormat":1},"907abc8137ceb88f0ddd6eccfa92d573-export const b = 10;"],"options":{"declaration":true},"affectedFilesPendingEmit":[[2,17],[3,17]]}
//// [/home/src/projects/project/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
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
    "lib.es2024.full.d.ts",
    "./a.ts",
    "./b.ts"
  ],
  "fileInfos": [
    {
      "fileName": "lib.es2024.full.d.ts",
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
      "signature": "907abc8137ceb88f0ddd6eccfa92d573-export const b = 10;",
      "impliedNodeFormat": "CommonJS"
    }
  ],
  "options": {
    "declaration": true
  },
  "affectedFilesPendingEmit": [
    [
      "./a.ts",
      "Js|DtsEmit",
      [
        2,
        17
      ]
    ],
    [
      "./b.ts",
      "Js|DtsEmit",
      [
        3,
        17
      ]
    ]
  ],
  "size": 1193
}

tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/projects/project/a.ts
Signatures::
(computed .d.ts) /home/src/projects/project/a.ts


Edit [2]:: no change

tsgo --noEmit
ExitStatus:: Success
Output::

tsconfig.json::
SemanticDiagnostics::
Signatures::


Edit [3]:: Emit after fixing error

tsgo 
ExitStatus:: Success
Output::
//// [/home/src/projects/project/a.d.ts] *new* 
export declare const a = "hello";

//// [/home/src/projects/project/a.js] *new* 
export const a = "hello";

//// [/home/src/projects/project/b.d.ts] *new* 
export declare const b = 10;

//// [/home/src/projects/project/b.js] *new* 
export const b = 10;

//// [/home/src/projects/project/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[[2,3]],"fileNames":["lib.es2024.full.d.ts","./a.ts","./b.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"270675b5bc3d695752ac89c2c3af7b2e-export const a = \"hello\";","signature":"8db48ef76072c70d24f212a9f210f622-export declare const a = \"hello\";\n","impliedNodeFormat":1},{"version":"907abc8137ceb88f0ddd6eccfa92d573-export const b = 10;","signature":"eaed5dafb4668e1b7c86b65b584b776a-export declare const b = 10;\n","impliedNodeFormat":1}],"options":{"declaration":true}}
//// [/home/src/projects/project/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
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
    "lib.es2024.full.d.ts",
    "./a.ts",
    "./b.ts"
  ],
  "fileInfos": [
    {
      "fileName": "lib.es2024.full.d.ts",
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
  "size": 1262
}

tsconfig.json::
SemanticDiagnostics::
Signatures::
(stored at emit) /home/src/projects/project/b.ts


Edit [4]:: no change

tsgo --noEmit
ExitStatus:: Success
Output::

tsconfig.json::
SemanticDiagnostics::
Signatures::


Edit [5]:: Introduce error
//// [/home/src/projects/project/a.ts] *modified* 
const a = class { private p = 10; };

tsgo --noEmit
ExitStatus:: DiagnosticsPresent_OutputsSkipped
Output::
[96ma.ts[0m:[93m1[0m:[93m7[0m - [91merror[0m[90m TS4094: [0mProperty 'p' of exported anonymous class type may not be private or protected.

[7m1[0m const a = class { private p = 10; };
[7m [0m [91m      ~[0m

  [96ma.ts[0m:[93m1[0m:[93m7[0m - Add a type annotation to the variable a.
    [7m1[0m const a = class { private p = 10; };
    [7m [0m [96m      ~[0m


Found 1 error in a.ts[90m:1[0m

//// [/home/src/projects/project/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[[2,3]],"fileNames":["lib.es2024.full.d.ts","./a.ts","./b.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"54435c7adb578d59d7e39dd2f567250e-const a = class { private p = 10; };","signature":"e4289913a1e3c6021f5a6745f65d4044-declare const a: {\n    new (): {\n        p: number;\n    };\n};\n\n(6,1): error4094: Property_0_of_exported_anonymous_class_type_may_not_be_private_or_protected_4094\np\n\n(6,1): error9027: Add_a_type_annotation_to_the_variable_0_9027\na\n","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"907abc8137ceb88f0ddd6eccfa92d573-export const b = 10;","signature":"eaed5dafb4668e1b7c86b65b584b776a-export declare const b = 10;\n","impliedNodeFormat":1}],"options":{"declaration":true},"emitDiagnosticsPerFile":[[2,[{"pos":6,"end":7,"code":4094,"category":1,"messageKey":"Property_0_of_exported_anonymous_class_type_may_not_be_private_or_protected_4094","messageArgs":["p"],"relatedInformation":[{"pos":6,"end":7,"code":9027,"category":1,"messageKey":"Add_a_type_annotation_to_the_variable_0_9027","messageArgs":["a"]}]}]]],"affectedFilesPendingEmit":[[2,17]]}
//// [/home/src/projects/project/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
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
    "lib.es2024.full.d.ts",
    "./a.ts",
    "./b.ts"
  ],
  "fileInfos": [
    {
      "fileName": "lib.es2024.full.d.ts",
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
      "version": "54435c7adb578d59d7e39dd2f567250e-const a = class { private p = 10; };",
      "signature": "e4289913a1e3c6021f5a6745f65d4044-declare const a: {\n    new (): {\n        p: number;\n    };\n};\n\n(6,1): error4094: Property_0_of_exported_anonymous_class_type_may_not_be_private_or_protected_4094\np\n\n(6,1): error9027: Add_a_type_annotation_to_the_variable_0_9027\na\n",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "54435c7adb578d59d7e39dd2f567250e-const a = class { private p = 10; };",
        "signature": "e4289913a1e3c6021f5a6745f65d4044-declare const a: {\n    new (): {\n        p: number;\n    };\n};\n\n(6,1): error4094: Property_0_of_exported_anonymous_class_type_may_not_be_private_or_protected_4094\np\n\n(6,1): error9027: Add_a_type_annotation_to_the_variable_0_9027\na\n",
        "affectsGlobalScope": true,
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
          "pos": 6,
          "end": 7,
          "code": 4094,
          "category": 1,
          "messageKey": "Property_0_of_exported_anonymous_class_type_may_not_be_private_or_protected_4094",
          "messageArgs": [
            "p"
          ],
          "relatedInformation": [
            {
              "pos": 6,
              "end": 7,
              "code": 9027,
              "category": 1,
              "messageKey": "Add_a_type_annotation_to_the_variable_0_9027",
              "messageArgs": [
                "a"
              ]
            }
          ]
        }
      ]
    ]
  ],
  "affectedFilesPendingEmit": [
    [
      "./a.ts",
      "Js|DtsEmit",
      [
        2,
        17
      ]
    ]
  ],
  "size": 1875
}

tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es2024.full.d.ts
*refresh*    /home/src/projects/project/a.ts
Signatures::
(computed .d.ts) /home/src/projects/project/a.ts


Edit [6]:: Emit when error

tsgo 
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[96ma.ts[0m:[93m1[0m:[93m7[0m - [91merror[0m[90m TS4094: [0mProperty 'p' of exported anonymous class type may not be private or protected.

[7m1[0m const a = class { private p = 10; };
[7m [0m [91m      ~[0m

  [96ma.ts[0m:[93m1[0m:[93m7[0m - Add a type annotation to the variable a.
    [7m1[0m const a = class { private p = 10; };
    [7m [0m [96m      ~[0m


Found 1 error in a.ts[90m:1[0m

//// [/home/src/projects/project/a.d.ts] *modified* 
declare const a: {
    new (): {
        p: number;
    };
};

//// [/home/src/projects/project/a.js] *modified* 
"use strict";
const a = class {
    p = 10;
};

//// [/home/src/projects/project/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[[2,3]],"fileNames":["lib.es2024.full.d.ts","./a.ts","./b.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"54435c7adb578d59d7e39dd2f567250e-const a = class { private p = 10; };","signature":"e4289913a1e3c6021f5a6745f65d4044-declare const a: {\n    new (): {\n        p: number;\n    };\n};\n\n(6,1): error4094: Property_0_of_exported_anonymous_class_type_may_not_be_private_or_protected_4094\np\n\n(6,1): error9027: Add_a_type_annotation_to_the_variable_0_9027\na\n","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"907abc8137ceb88f0ddd6eccfa92d573-export const b = 10;","signature":"eaed5dafb4668e1b7c86b65b584b776a-export declare const b = 10;\n","impliedNodeFormat":1}],"options":{"declaration":true},"emitDiagnosticsPerFile":[[2,[{"pos":6,"end":7,"code":4094,"category":1,"messageKey":"Property_0_of_exported_anonymous_class_type_may_not_be_private_or_protected_4094","messageArgs":["p"],"relatedInformation":[{"pos":6,"end":7,"code":9027,"category":1,"messageKey":"Add_a_type_annotation_to_the_variable_0_9027","messageArgs":["a"]}]}]]]}
//// [/home/src/projects/project/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
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
    "lib.es2024.full.d.ts",
    "./a.ts",
    "./b.ts"
  ],
  "fileInfos": [
    {
      "fileName": "lib.es2024.full.d.ts",
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
      "version": "54435c7adb578d59d7e39dd2f567250e-const a = class { private p = 10; };",
      "signature": "e4289913a1e3c6021f5a6745f65d4044-declare const a: {\n    new (): {\n        p: number;\n    };\n};\n\n(6,1): error4094: Property_0_of_exported_anonymous_class_type_may_not_be_private_or_protected_4094\np\n\n(6,1): error9027: Add_a_type_annotation_to_the_variable_0_9027\na\n",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "54435c7adb578d59d7e39dd2f567250e-const a = class { private p = 10; };",
        "signature": "e4289913a1e3c6021f5a6745f65d4044-declare const a: {\n    new (): {\n        p: number;\n    };\n};\n\n(6,1): error4094: Property_0_of_exported_anonymous_class_type_may_not_be_private_or_protected_4094\np\n\n(6,1): error9027: Add_a_type_annotation_to_the_variable_0_9027\na\n",
        "affectsGlobalScope": true,
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
          "pos": 6,
          "end": 7,
          "code": 4094,
          "category": 1,
          "messageKey": "Property_0_of_exported_anonymous_class_type_may_not_be_private_or_protected_4094",
          "messageArgs": [
            "p"
          ],
          "relatedInformation": [
            {
              "pos": 6,
              "end": 7,
              "code": 9027,
              "category": 1,
              "messageKey": "Add_a_type_annotation_to_the_variable_0_9027",
              "messageArgs": [
                "a"
              ]
            }
          ]
        }
      ]
    ]
  ],
  "size": 1839
}

tsconfig.json::
SemanticDiagnostics::
Signatures::


Edit [7]:: no change

tsgo --noEmit
ExitStatus:: DiagnosticsPresent_OutputsSkipped
Output::
[96ma.ts[0m:[93m1[0m:[93m7[0m - [91merror[0m[90m TS4094: [0mProperty 'p' of exported anonymous class type may not be private or protected.

[7m1[0m const a = class { private p = 10; };
[7m [0m [91m      ~[0m

  [96ma.ts[0m:[93m1[0m:[93m7[0m - Add a type annotation to the variable a.
    [7m1[0m const a = class { private p = 10; };
    [7m [0m [96m      ~[0m


Found 1 error in a.ts[90m:1[0m


tsconfig.json::
SemanticDiagnostics::
Signatures::
