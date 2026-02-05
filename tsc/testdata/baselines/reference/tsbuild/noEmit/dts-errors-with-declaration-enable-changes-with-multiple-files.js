currentDirectory::/home/src/projects/project
useCaseSensitiveFileNames::true
Input::
//// [/home/src/projects/project/a.ts] *new* 
export const a = class { private p = 10; };
//// [/home/src/projects/project/b.ts] *new* 
export const b = 10;
//// [/home/src/projects/project/c.ts] *new* 
export const c = class { private p = 10; };
//// [/home/src/projects/project/d.ts] *new* 
export const d = class { private p = 10; };
//// [/home/src/projects/project/tsconfig.json] *new* 
{
    "compilerOptions": {
        "incremental": true,
    }
}

tsgo -b -v --noEmit
ExitStatus:: Success
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because output file 'tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project 'tsconfig.json'...

//// [/home/src/projects/project/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":[[2,5]],"fileNames":["lib.es2024.full.d.ts","./a.ts","./b.ts","./c.ts","./d.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},"9c1fc7106f3a21aadb5219db8b3209bc-export const a = class { private p = 10; };","907abc8137ceb88f0ddd6eccfa92d573-export const b = 10;","6f729672e1964d12037938bd07604115-export const c = class { private p = 10; };","eee493071f513e65e5368e45a4d35584-export const d = class { private p = 10; };"],"affectedFilesPendingEmit":[2,3,4,5]}
//// [/home/src/projects/project/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
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
    "lib.es2024.full.d.ts",
    "./a.ts",
    "./b.ts",
    "./c.ts",
    "./d.ts"
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
    },
    {
      "fileName": "./c.ts",
      "version": "6f729672e1964d12037938bd07604115-export const c = class { private p = 10; };",
      "signature": "6f729672e1964d12037938bd07604115-export const c = class { private p = 10; };",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "./d.ts",
      "version": "eee493071f513e65e5368e45a4d35584-export const d = class { private p = 10; };",
      "signature": "eee493071f513e65e5368e45a4d35584-export const d = class { private p = 10; };",
      "impliedNodeFormat": "CommonJS"
    }
  ],
  "affectedFilesPendingEmit": [
    [
      "./a.ts",
      "Js",
      2
    ],
    [
      "./b.ts",
      "Js",
      3
    ],
    [
      "./c.ts",
      "Js",
      4
    ],
    [
      "./d.ts",
      "Js",
      5
    ]
  ],
  "size": 1229
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
*refresh*    /home/src/projects/project/c.ts
*refresh*    /home/src/projects/project/d.ts
Signatures::


Edit [0]:: no change

tsgo -b -v --noEmit
ExitStatus:: Success
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is up to date because newest input 'd.ts' is older than output 'tsconfig.tsbuildinfo'




Edit [1]:: With declaration enabled noEmit - Should report errors

tsgo -b -v --noEmit --declaration
ExitStatus:: DiagnosticsPresent_OutputsSkipped
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because buildinfo file 'tsconfig.tsbuildinfo' indicates there is change in compilerOptions

[[90mHH:MM:SS AM[0m] Building project 'tsconfig.json'...

[96ma.ts[0m:[93m1[0m:[93m14[0m - [91merror[0m[90m TS4094: [0mProperty 'p' of exported anonymous class type may not be private or protected.

[7m1[0m export const a = class { private p = 10; };
[7m [0m [91m             ~[0m

  [96ma.ts[0m:[93m1[0m:[93m14[0m - Add a type annotation to the variable a.
    [7m1[0m export const a = class { private p = 10; };
    [7m [0m [96m             ~[0m

[96mc.ts[0m:[93m1[0m:[93m14[0m - [91merror[0m[90m TS4094: [0mProperty 'p' of exported anonymous class type may not be private or protected.

[7m1[0m export const c = class { private p = 10; };
[7m [0m [91m             ~[0m

  [96mc.ts[0m:[93m1[0m:[93m14[0m - Add a type annotation to the variable c.
    [7m1[0m export const c = class { private p = 10; };
    [7m [0m [96m             ~[0m

[96md.ts[0m:[93m1[0m:[93m14[0m - [91merror[0m[90m TS4094: [0mProperty 'p' of exported anonymous class type may not be private or protected.

[7m1[0m export const d = class { private p = 10; };
[7m [0m [91m             ~[0m

  [96md.ts[0m:[93m1[0m:[93m14[0m - Add a type annotation to the variable d.
    [7m1[0m export const d = class { private p = 10; };
    [7m [0m [96m             ~[0m


Found 3 errors in 3 files.

Errors  Files
     1  a.ts[90m:1[0m
     1  c.ts[90m:1[0m
     1  d.ts[90m:1[0m

//// [/home/src/projects/project/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[[2,5]],"fileNames":["lib.es2024.full.d.ts","./a.ts","./b.ts","./c.ts","./d.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},"9c1fc7106f3a21aadb5219db8b3209bc-export const a = class { private p = 10; };","907abc8137ceb88f0ddd6eccfa92d573-export const b = 10;","6f729672e1964d12037938bd07604115-export const c = class { private p = 10; };","eee493071f513e65e5368e45a4d35584-export const d = class { private p = 10; };"],"options":{"declaration":true},"emitDiagnosticsPerFile":[[2,[{"pos":13,"end":14,"code":4094,"category":1,"messageKey":"Property_0_of_exported_anonymous_class_type_may_not_be_private_or_protected_4094","messageArgs":["p"],"relatedInformation":[{"pos":13,"end":14,"code":9027,"category":1,"messageKey":"Add_a_type_annotation_to_the_variable_0_9027","messageArgs":["a"]}]}]],[4,[{"pos":13,"end":14,"code":4094,"category":1,"messageKey":"Property_0_of_exported_anonymous_class_type_may_not_be_private_or_protected_4094","messageArgs":["p"],"relatedInformation":[{"pos":13,"end":14,"code":9027,"category":1,"messageKey":"Add_a_type_annotation_to_the_variable_0_9027","messageArgs":["c"]}]}]],[5,[{"pos":13,"end":14,"code":4094,"category":1,"messageKey":"Property_0_of_exported_anonymous_class_type_may_not_be_private_or_protected_4094","messageArgs":["p"],"relatedInformation":[{"pos":13,"end":14,"code":9027,"category":1,"messageKey":"Add_a_type_annotation_to_the_variable_0_9027","messageArgs":["d"]}]}]]],"affectedFilesPendingEmit":[[2,17],[3,17],[4,17],[5,17]]}
//// [/home/src/projects/project/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
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
    "lib.es2024.full.d.ts",
    "./a.ts",
    "./b.ts",
    "./c.ts",
    "./d.ts"
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
    },
    {
      "fileName": "./c.ts",
      "version": "6f729672e1964d12037938bd07604115-export const c = class { private p = 10; };",
      "signature": "6f729672e1964d12037938bd07604115-export const c = class { private p = 10; };",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "./d.ts",
      "version": "eee493071f513e65e5368e45a4d35584-export const d = class { private p = 10; };",
      "signature": "eee493071f513e65e5368e45a4d35584-export const d = class { private p = 10; };",
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
    ],
    [
      "./c.ts",
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
                "c"
              ]
            }
          ]
        }
      ]
    ],
    [
      "./d.ts",
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
                "d"
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
    ],
    [
      "./c.ts",
      "Js|DtsEmit",
      [
        4,
        17
      ]
    ],
    [
      "./d.ts",
      "Js|DtsEmit",
      [
        5,
        17
      ]
    ]
  ],
  "size": 2252
}

tsconfig.json::
SemanticDiagnostics::
Signatures::


Edit [2]:: With declaration and declarationMap noEmit - Should report errors

tsgo -b -v --noEmit --declaration --declarationMap
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

[96mc.ts[0m:[93m1[0m:[93m14[0m - [91merror[0m[90m TS4094: [0mProperty 'p' of exported anonymous class type may not be private or protected.

[7m1[0m export const c = class { private p = 10; };
[7m [0m [91m             ~[0m

  [96mc.ts[0m:[93m1[0m:[93m14[0m - Add a type annotation to the variable c.
    [7m1[0m export const c = class { private p = 10; };
    [7m [0m [96m             ~[0m

[96md.ts[0m:[93m1[0m:[93m14[0m - [91merror[0m[90m TS4094: [0mProperty 'p' of exported anonymous class type may not be private or protected.

[7m1[0m export const d = class { private p = 10; };
[7m [0m [91m             ~[0m

  [96md.ts[0m:[93m1[0m:[93m14[0m - Add a type annotation to the variable d.
    [7m1[0m export const d = class { private p = 10; };
    [7m [0m [96m             ~[0m


Found 3 errors in 3 files.

Errors  Files
     1  a.ts[90m:1[0m
     1  c.ts[90m:1[0m
     1  d.ts[90m:1[0m

//// [/home/src/projects/project/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[[2,5]],"fileNames":["lib.es2024.full.d.ts","./a.ts","./b.ts","./c.ts","./d.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},"9c1fc7106f3a21aadb5219db8b3209bc-export const a = class { private p = 10; };","907abc8137ceb88f0ddd6eccfa92d573-export const b = 10;","6f729672e1964d12037938bd07604115-export const c = class { private p = 10; };","eee493071f513e65e5368e45a4d35584-export const d = class { private p = 10; };"],"options":{"declaration":true,"declarationMap":true},"emitDiagnosticsPerFile":[[2,[{"pos":13,"end":14,"code":4094,"category":1,"messageKey":"Property_0_of_exported_anonymous_class_type_may_not_be_private_or_protected_4094","messageArgs":["p"],"relatedInformation":[{"pos":13,"end":14,"code":9027,"category":1,"messageKey":"Add_a_type_annotation_to_the_variable_0_9027","messageArgs":["a"]}]}]],[4,[{"pos":13,"end":14,"code":4094,"category":1,"messageKey":"Property_0_of_exported_anonymous_class_type_may_not_be_private_or_protected_4094","messageArgs":["p"],"relatedInformation":[{"pos":13,"end":14,"code":9027,"category":1,"messageKey":"Add_a_type_annotation_to_the_variable_0_9027","messageArgs":["c"]}]}]],[5,[{"pos":13,"end":14,"code":4094,"category":1,"messageKey":"Property_0_of_exported_anonymous_class_type_may_not_be_private_or_protected_4094","messageArgs":["p"],"relatedInformation":[{"pos":13,"end":14,"code":9027,"category":1,"messageKey":"Add_a_type_annotation_to_the_variable_0_9027","messageArgs":["d"]}]}]]],"affectedFilesPendingEmit":[[2,49],[3,49],[4,49],[5,49]]}
//// [/home/src/projects/project/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
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
    "lib.es2024.full.d.ts",
    "./a.ts",
    "./b.ts",
    "./c.ts",
    "./d.ts"
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
    },
    {
      "fileName": "./c.ts",
      "version": "6f729672e1964d12037938bd07604115-export const c = class { private p = 10; };",
      "signature": "6f729672e1964d12037938bd07604115-export const c = class { private p = 10; };",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "./d.ts",
      "version": "eee493071f513e65e5368e45a4d35584-export const d = class { private p = 10; };",
      "signature": "eee493071f513e65e5368e45a4d35584-export const d = class { private p = 10; };",
      "impliedNodeFormat": "CommonJS"
    }
  ],
  "options": {
    "declaration": true,
    "declarationMap": true
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
    ],
    [
      "./c.ts",
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
                "c"
              ]
            }
          ]
        }
      ]
    ],
    [
      "./d.ts",
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
                "d"
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
      "Js|DtsEmit|DtsMap",
      [
        2,
        49
      ]
    ],
    [
      "./b.ts",
      "Js|DtsEmit|DtsMap",
      [
        3,
        49
      ]
    ],
    [
      "./c.ts",
      "Js|DtsEmit|DtsMap",
      [
        4,
        49
      ]
    ],
    [
      "./d.ts",
      "Js|DtsEmit|DtsMap",
      [
        5,
        49
      ]
    ]
  ],
  "size": 2274
}

tsconfig.json::
SemanticDiagnostics::
Signatures::


Edit [3]:: no change

tsgo -b -v --noEmit
ExitStatus:: Success
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is up to date because newest input 'd.ts' is older than output 'tsconfig.tsbuildinfo'




Edit [4]:: Dts Emit with error

tsgo -b -v --declaration
ExitStatus:: DiagnosticsPresent_OutputsGenerated
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

[96mc.ts[0m:[93m1[0m:[93m14[0m - [91merror[0m[90m TS4094: [0mProperty 'p' of exported anonymous class type may not be private or protected.

[7m1[0m export const c = class { private p = 10; };
[7m [0m [91m             ~[0m

  [96mc.ts[0m:[93m1[0m:[93m14[0m - Add a type annotation to the variable c.
    [7m1[0m export const c = class { private p = 10; };
    [7m [0m [96m             ~[0m

[96md.ts[0m:[93m1[0m:[93m14[0m - [91merror[0m[90m TS4094: [0mProperty 'p' of exported anonymous class type may not be private or protected.

[7m1[0m export const d = class { private p = 10; };
[7m [0m [91m             ~[0m

  [96md.ts[0m:[93m1[0m:[93m14[0m - Add a type annotation to the variable d.
    [7m1[0m export const d = class { private p = 10; };
    [7m [0m [96m             ~[0m


Found 3 errors in 3 files.

Errors  Files
     1  a.ts[90m:1[0m
     1  c.ts[90m:1[0m
     1  d.ts[90m:1[0m

//// [/home/src/projects/project/a.d.ts] *new* 
export declare const a: {
    new (): {
        p: number;
    };
};

//// [/home/src/projects/project/a.js] *new* 
export const a = class {
    p = 10;
};

//// [/home/src/projects/project/b.d.ts] *new* 
export declare const b = 10;

//// [/home/src/projects/project/b.js] *new* 
export const b = 10;

//// [/home/src/projects/project/c.d.ts] *new* 
export declare const c: {
    new (): {
        p: number;
    };
};

//// [/home/src/projects/project/c.js] *new* 
export const c = class {
    p = 10;
};

//// [/home/src/projects/project/d.d.ts] *new* 
export declare const d: {
    new (): {
        p: number;
    };
};

//// [/home/src/projects/project/d.js] *new* 
export const d = class {
    p = 10;
};

//// [/home/src/projects/project/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[[2,5]],"fileNames":["lib.es2024.full.d.ts","./a.ts","./b.ts","./c.ts","./d.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"9c1fc7106f3a21aadb5219db8b3209bc-export const a = class { private p = 10; };","signature":"797d7267ef7f35dc3f989be23b6d4fe3-export declare const a: {\n    new (): {\n        p: number;\n    };\n};\n\n(13,1): error4094: Property_0_of_exported_anonymous_class_type_may_not_be_private_or_protected_4094\np\n\n(13,1): error9027: Add_a_type_annotation_to_the_variable_0_9027\na\n","impliedNodeFormat":1},{"version":"907abc8137ceb88f0ddd6eccfa92d573-export const b = 10;","signature":"eaed5dafb4668e1b7c86b65b584b776a-export declare const b = 10;\n","impliedNodeFormat":1},{"version":"6f729672e1964d12037938bd07604115-export const c = class { private p = 10; };","signature":"e1e85d69ff8bbf5440c12f8f1badf3e4-export declare const c: {\n    new (): {\n        p: number;\n    };\n};\n\n(13,1): error4094: Property_0_of_exported_anonymous_class_type_may_not_be_private_or_protected_4094\np\n\n(13,1): error9027: Add_a_type_annotation_to_the_variable_0_9027\nc\n","impliedNodeFormat":1},{"version":"eee493071f513e65e5368e45a4d35584-export const d = class { private p = 10; };","signature":"9bb613afbef9c5e40a1cbd833df92c7f-export declare const d: {\n    new (): {\n        p: number;\n    };\n};\n\n(13,1): error4094: Property_0_of_exported_anonymous_class_type_may_not_be_private_or_protected_4094\np\n\n(13,1): error9027: Add_a_type_annotation_to_the_variable_0_9027\nd\n","impliedNodeFormat":1}],"options":{"declaration":true},"emitDiagnosticsPerFile":[[2,[{"pos":13,"end":14,"code":4094,"category":1,"messageKey":"Property_0_of_exported_anonymous_class_type_may_not_be_private_or_protected_4094","messageArgs":["p"],"relatedInformation":[{"pos":13,"end":14,"code":9027,"category":1,"messageKey":"Add_a_type_annotation_to_the_variable_0_9027","messageArgs":["a"]}]}]],[4,[{"pos":13,"end":14,"code":4094,"category":1,"messageKey":"Property_0_of_exported_anonymous_class_type_may_not_be_private_or_protected_4094","messageArgs":["p"],"relatedInformation":[{"pos":13,"end":14,"code":9027,"category":1,"messageKey":"Add_a_type_annotation_to_the_variable_0_9027","messageArgs":["c"]}]}]],[5,[{"pos":13,"end":14,"code":4094,"category":1,"messageKey":"Property_0_of_exported_anonymous_class_type_may_not_be_private_or_protected_4094","messageArgs":["p"],"relatedInformation":[{"pos":13,"end":14,"code":9027,"category":1,"messageKey":"Add_a_type_annotation_to_the_variable_0_9027","messageArgs":["d"]}]}]]]}
//// [/home/src/projects/project/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
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
    "lib.es2024.full.d.ts",
    "./a.ts",
    "./b.ts",
    "./c.ts",
    "./d.ts"
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
      "signature": "797d7267ef7f35dc3f989be23b6d4fe3-export declare const a: {\n    new (): {\n        p: number;\n    };\n};\n\n(13,1): error4094: Property_0_of_exported_anonymous_class_type_may_not_be_private_or_protected_4094\np\n\n(13,1): error9027: Add_a_type_annotation_to_the_variable_0_9027\na\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "9c1fc7106f3a21aadb5219db8b3209bc-export const a = class { private p = 10; };",
        "signature": "797d7267ef7f35dc3f989be23b6d4fe3-export declare const a: {\n    new (): {\n        p: number;\n    };\n};\n\n(13,1): error4094: Property_0_of_exported_anonymous_class_type_may_not_be_private_or_protected_4094\np\n\n(13,1): error9027: Add_a_type_annotation_to_the_variable_0_9027\na\n",
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
      "version": "6f729672e1964d12037938bd07604115-export const c = class { private p = 10; };",
      "signature": "e1e85d69ff8bbf5440c12f8f1badf3e4-export declare const c: {\n    new (): {\n        p: number;\n    };\n};\n\n(13,1): error4094: Property_0_of_exported_anonymous_class_type_may_not_be_private_or_protected_4094\np\n\n(13,1): error9027: Add_a_type_annotation_to_the_variable_0_9027\nc\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "6f729672e1964d12037938bd07604115-export const c = class { private p = 10; };",
        "signature": "e1e85d69ff8bbf5440c12f8f1badf3e4-export declare const c: {\n    new (): {\n        p: number;\n    };\n};\n\n(13,1): error4094: Property_0_of_exported_anonymous_class_type_may_not_be_private_or_protected_4094\np\n\n(13,1): error9027: Add_a_type_annotation_to_the_variable_0_9027\nc\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./d.ts",
      "version": "eee493071f513e65e5368e45a4d35584-export const d = class { private p = 10; };",
      "signature": "9bb613afbef9c5e40a1cbd833df92c7f-export declare const d: {\n    new (): {\n        p: number;\n    };\n};\n\n(13,1): error4094: Property_0_of_exported_anonymous_class_type_may_not_be_private_or_protected_4094\np\n\n(13,1): error9027: Add_a_type_annotation_to_the_variable_0_9027\nd\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "eee493071f513e65e5368e45a4d35584-export const d = class { private p = 10; };",
        "signature": "9bb613afbef9c5e40a1cbd833df92c7f-export declare const d: {\n    new (): {\n        p: number;\n    };\n};\n\n(13,1): error4094: Property_0_of_exported_anonymous_class_type_may_not_be_private_or_protected_4094\np\n\n(13,1): error9027: Add_a_type_annotation_to_the_variable_0_9027\nd\n",
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
    ],
    [
      "./c.ts",
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
                "c"
              ]
            }
          ]
        }
      ]
    ],
    [
      "./d.ts",
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
                "d"
              ]
            }
          ]
        }
      ]
    ]
  ],
  "size": 3303
}

tsconfig.json::
SemanticDiagnostics::
Signatures::
(stored at emit) /home/src/projects/project/a.ts
(stored at emit) /home/src/projects/project/b.ts
(stored at emit) /home/src/projects/project/c.ts
(stored at emit) /home/src/projects/project/d.ts


Edit [5]:: Fix the error
//// [/home/src/projects/project/a.ts] *modified* 
export const a = class { public p = 10; };

tsgo -b -v --noEmit
ExitStatus:: Success
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because output 'tsconfig.tsbuildinfo' is older than input 'a.ts'

[[90mHH:MM:SS AM[0m] Building project 'tsconfig.json'...

//// [/home/src/projects/project/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[[2,5]],"fileNames":["lib.es2024.full.d.ts","./a.ts","./b.ts","./c.ts","./d.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"257f0ffae056266a216e22aca9e25055-export const a = class { public p = 10; };","signature":"1aa32af20adf1f5d970642bd31541eeb-export declare const a: {\n    new (): {\n        p: number;\n    };\n};\n","impliedNodeFormat":1},{"version":"907abc8137ceb88f0ddd6eccfa92d573-export const b = 10;","signature":"eaed5dafb4668e1b7c86b65b584b776a-export declare const b = 10;\n","impliedNodeFormat":1},{"version":"6f729672e1964d12037938bd07604115-export const c = class { private p = 10; };","signature":"e1e85d69ff8bbf5440c12f8f1badf3e4-export declare const c: {\n    new (): {\n        p: number;\n    };\n};\n\n(13,1): error4094: Property_0_of_exported_anonymous_class_type_may_not_be_private_or_protected_4094\np\n\n(13,1): error9027: Add_a_type_annotation_to_the_variable_0_9027\nc\n","impliedNodeFormat":1},{"version":"eee493071f513e65e5368e45a4d35584-export const d = class { private p = 10; };","signature":"9bb613afbef9c5e40a1cbd833df92c7f-export declare const d: {\n    new (): {\n        p: number;\n    };\n};\n\n(13,1): error4094: Property_0_of_exported_anonymous_class_type_may_not_be_private_or_protected_4094\np\n\n(13,1): error9027: Add_a_type_annotation_to_the_variable_0_9027\nd\n","impliedNodeFormat":1}],"emitDiagnosticsPerFile":[[4,[{"pos":13,"end":14,"code":4094,"category":1,"messageKey":"Property_0_of_exported_anonymous_class_type_may_not_be_private_or_protected_4094","messageArgs":["p"],"relatedInformation":[{"pos":13,"end":14,"code":9027,"category":1,"messageKey":"Add_a_type_annotation_to_the_variable_0_9027","messageArgs":["c"]}]}]],[5,[{"pos":13,"end":14,"code":4094,"category":1,"messageKey":"Property_0_of_exported_anonymous_class_type_may_not_be_private_or_protected_4094","messageArgs":["p"],"relatedInformation":[{"pos":13,"end":14,"code":9027,"category":1,"messageKey":"Add_a_type_annotation_to_the_variable_0_9027","messageArgs":["d"]}]}]]],"affectedFilesPendingEmit":[2]}
//// [/home/src/projects/project/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
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
    "lib.es2024.full.d.ts",
    "./a.ts",
    "./b.ts",
    "./c.ts",
    "./d.ts"
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
      "version": "257f0ffae056266a216e22aca9e25055-export const a = class { public p = 10; };",
      "signature": "1aa32af20adf1f5d970642bd31541eeb-export declare const a: {\n    new (): {\n        p: number;\n    };\n};\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "257f0ffae056266a216e22aca9e25055-export const a = class { public p = 10; };",
        "signature": "1aa32af20adf1f5d970642bd31541eeb-export declare const a: {\n    new (): {\n        p: number;\n    };\n};\n",
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
      "version": "6f729672e1964d12037938bd07604115-export const c = class { private p = 10; };",
      "signature": "e1e85d69ff8bbf5440c12f8f1badf3e4-export declare const c: {\n    new (): {\n        p: number;\n    };\n};\n\n(13,1): error4094: Property_0_of_exported_anonymous_class_type_may_not_be_private_or_protected_4094\np\n\n(13,1): error9027: Add_a_type_annotation_to_the_variable_0_9027\nc\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "6f729672e1964d12037938bd07604115-export const c = class { private p = 10; };",
        "signature": "e1e85d69ff8bbf5440c12f8f1badf3e4-export declare const c: {\n    new (): {\n        p: number;\n    };\n};\n\n(13,1): error4094: Property_0_of_exported_anonymous_class_type_may_not_be_private_or_protected_4094\np\n\n(13,1): error9027: Add_a_type_annotation_to_the_variable_0_9027\nc\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./d.ts",
      "version": "eee493071f513e65e5368e45a4d35584-export const d = class { private p = 10; };",
      "signature": "9bb613afbef9c5e40a1cbd833df92c7f-export declare const d: {\n    new (): {\n        p: number;\n    };\n};\n\n(13,1): error4094: Property_0_of_exported_anonymous_class_type_may_not_be_private_or_protected_4094\np\n\n(13,1): error9027: Add_a_type_annotation_to_the_variable_0_9027\nd\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "eee493071f513e65e5368e45a4d35584-export const d = class { private p = 10; };",
        "signature": "9bb613afbef9c5e40a1cbd833df92c7f-export declare const d: {\n    new (): {\n        p: number;\n    };\n};\n\n(13,1): error4094: Property_0_of_exported_anonymous_class_type_may_not_be_private_or_protected_4094\np\n\n(13,1): error9027: Add_a_type_annotation_to_the_variable_0_9027\nd\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "emitDiagnosticsPerFile": [
    [
      "./c.ts",
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
                "c"
              ]
            }
          ]
        }
      ]
    ],
    [
      "./d.ts",
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
                "d"
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
      "Js",
      2
    ]
  ],
  "size": 2811
}

tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/projects/project/a.ts
Signatures::
(computed .d.ts) /home/src/projects/project/a.ts


Edit [6]:: With declaration enabled noEmit

tsgo -b -v --noEmit --declaration
ExitStatus:: DiagnosticsPresent_OutputsSkipped
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because buildinfo file 'tsconfig.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project 'tsconfig.json'...

[96mc.ts[0m:[93m1[0m:[93m14[0m - [91merror[0m[90m TS4094: [0mProperty 'p' of exported anonymous class type may not be private or protected.

[7m1[0m export const c = class { private p = 10; };
[7m [0m [91m             ~[0m

  [96mc.ts[0m:[93m1[0m:[93m14[0m - Add a type annotation to the variable c.
    [7m1[0m export const c = class { private p = 10; };
    [7m [0m [96m             ~[0m

[96md.ts[0m:[93m1[0m:[93m14[0m - [91merror[0m[90m TS4094: [0mProperty 'p' of exported anonymous class type may not be private or protected.

[7m1[0m export const d = class { private p = 10; };
[7m [0m [91m             ~[0m

  [96md.ts[0m:[93m1[0m:[93m14[0m - Add a type annotation to the variable d.
    [7m1[0m export const d = class { private p = 10; };
    [7m [0m [96m             ~[0m


Found 2 errors in 2 files.

Errors  Files
     1  c.ts[90m:1[0m
     1  d.ts[90m:1[0m

//// [/home/src/projects/project/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[[2,5]],"fileNames":["lib.es2024.full.d.ts","./a.ts","./b.ts","./c.ts","./d.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"257f0ffae056266a216e22aca9e25055-export const a = class { public p = 10; };","signature":"1aa32af20adf1f5d970642bd31541eeb-export declare const a: {\n    new (): {\n        p: number;\n    };\n};\n","impliedNodeFormat":1},{"version":"907abc8137ceb88f0ddd6eccfa92d573-export const b = 10;","signature":"eaed5dafb4668e1b7c86b65b584b776a-export declare const b = 10;\n","impliedNodeFormat":1},{"version":"6f729672e1964d12037938bd07604115-export const c = class { private p = 10; };","signature":"e1e85d69ff8bbf5440c12f8f1badf3e4-export declare const c: {\n    new (): {\n        p: number;\n    };\n};\n\n(13,1): error4094: Property_0_of_exported_anonymous_class_type_may_not_be_private_or_protected_4094\np\n\n(13,1): error9027: Add_a_type_annotation_to_the_variable_0_9027\nc\n","impliedNodeFormat":1},{"version":"eee493071f513e65e5368e45a4d35584-export const d = class { private p = 10; };","signature":"9bb613afbef9c5e40a1cbd833df92c7f-export declare const d: {\n    new (): {\n        p: number;\n    };\n};\n\n(13,1): error4094: Property_0_of_exported_anonymous_class_type_may_not_be_private_or_protected_4094\np\n\n(13,1): error9027: Add_a_type_annotation_to_the_variable_0_9027\nd\n","impliedNodeFormat":1}],"options":{"declaration":true},"emitDiagnosticsPerFile":[[4,[{"pos":13,"end":14,"code":4094,"category":1,"messageKey":"Property_0_of_exported_anonymous_class_type_may_not_be_private_or_protected_4094","messageArgs":["p"],"relatedInformation":[{"pos":13,"end":14,"code":9027,"category":1,"messageKey":"Add_a_type_annotation_to_the_variable_0_9027","messageArgs":["c"]}]}]],[5,[{"pos":13,"end":14,"code":4094,"category":1,"messageKey":"Property_0_of_exported_anonymous_class_type_may_not_be_private_or_protected_4094","messageArgs":["p"],"relatedInformation":[{"pos":13,"end":14,"code":9027,"category":1,"messageKey":"Add_a_type_annotation_to_the_variable_0_9027","messageArgs":["d"]}]}]]],"affectedFilesPendingEmit":[[2,17],[3,16],[4,16],[5,16]]}
//// [/home/src/projects/project/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
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
    "lib.es2024.full.d.ts",
    "./a.ts",
    "./b.ts",
    "./c.ts",
    "./d.ts"
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
      "version": "257f0ffae056266a216e22aca9e25055-export const a = class { public p = 10; };",
      "signature": "1aa32af20adf1f5d970642bd31541eeb-export declare const a: {\n    new (): {\n        p: number;\n    };\n};\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "257f0ffae056266a216e22aca9e25055-export const a = class { public p = 10; };",
        "signature": "1aa32af20adf1f5d970642bd31541eeb-export declare const a: {\n    new (): {\n        p: number;\n    };\n};\n",
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
      "version": "6f729672e1964d12037938bd07604115-export const c = class { private p = 10; };",
      "signature": "e1e85d69ff8bbf5440c12f8f1badf3e4-export declare const c: {\n    new (): {\n        p: number;\n    };\n};\n\n(13,1): error4094: Property_0_of_exported_anonymous_class_type_may_not_be_private_or_protected_4094\np\n\n(13,1): error9027: Add_a_type_annotation_to_the_variable_0_9027\nc\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "6f729672e1964d12037938bd07604115-export const c = class { private p = 10; };",
        "signature": "e1e85d69ff8bbf5440c12f8f1badf3e4-export declare const c: {\n    new (): {\n        p: number;\n    };\n};\n\n(13,1): error4094: Property_0_of_exported_anonymous_class_type_may_not_be_private_or_protected_4094\np\n\n(13,1): error9027: Add_a_type_annotation_to_the_variable_0_9027\nc\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./d.ts",
      "version": "eee493071f513e65e5368e45a4d35584-export const d = class { private p = 10; };",
      "signature": "9bb613afbef9c5e40a1cbd833df92c7f-export declare const d: {\n    new (): {\n        p: number;\n    };\n};\n\n(13,1): error4094: Property_0_of_exported_anonymous_class_type_may_not_be_private_or_protected_4094\np\n\n(13,1): error9027: Add_a_type_annotation_to_the_variable_0_9027\nd\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "eee493071f513e65e5368e45a4d35584-export const d = class { private p = 10; };",
        "signature": "9bb613afbef9c5e40a1cbd833df92c7f-export declare const d: {\n    new (): {\n        p: number;\n    };\n};\n\n(13,1): error4094: Property_0_of_exported_anonymous_class_type_may_not_be_private_or_protected_4094\np\n\n(13,1): error9027: Add_a_type_annotation_to_the_variable_0_9027\nd\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "options": {
    "declaration": true
  },
  "emitDiagnosticsPerFile": [
    [
      "./c.ts",
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
                "c"
              ]
            }
          ]
        }
      ]
    ],
    [
      "./d.ts",
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
                "d"
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
      "DtsEmit",
      [
        3,
        16
      ]
    ],
    [
      "./c.ts",
      "DtsEmit",
      [
        4,
        16
      ]
    ],
    [
      "./d.ts",
      "DtsEmit",
      [
        5,
        16
      ]
    ]
  ],
  "size": 2868
}

tsconfig.json::
SemanticDiagnostics::
Signatures::


Edit [7]:: With declaration and declarationMap noEmit

tsgo -b -v --noEmit --declaration --declarationMap
ExitStatus:: DiagnosticsPresent_OutputsSkipped
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because buildinfo file 'tsconfig.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project 'tsconfig.json'...

[96mc.ts[0m:[93m1[0m:[93m14[0m - [91merror[0m[90m TS4094: [0mProperty 'p' of exported anonymous class type may not be private or protected.

[7m1[0m export const c = class { private p = 10; };
[7m [0m [91m             ~[0m

  [96mc.ts[0m:[93m1[0m:[93m14[0m - Add a type annotation to the variable c.
    [7m1[0m export const c = class { private p = 10; };
    [7m [0m [96m             ~[0m

[96md.ts[0m:[93m1[0m:[93m14[0m - [91merror[0m[90m TS4094: [0mProperty 'p' of exported anonymous class type may not be private or protected.

[7m1[0m export const d = class { private p = 10; };
[7m [0m [91m             ~[0m

  [96md.ts[0m:[93m1[0m:[93m14[0m - Add a type annotation to the variable d.
    [7m1[0m export const d = class { private p = 10; };
    [7m [0m [96m             ~[0m


Found 2 errors in 2 files.

Errors  Files
     1  c.ts[90m:1[0m
     1  d.ts[90m:1[0m

//// [/home/src/projects/project/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[[2,5]],"fileNames":["lib.es2024.full.d.ts","./a.ts","./b.ts","./c.ts","./d.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"257f0ffae056266a216e22aca9e25055-export const a = class { public p = 10; };","signature":"1aa32af20adf1f5d970642bd31541eeb-export declare const a: {\n    new (): {\n        p: number;\n    };\n};\n","impliedNodeFormat":1},{"version":"907abc8137ceb88f0ddd6eccfa92d573-export const b = 10;","signature":"eaed5dafb4668e1b7c86b65b584b776a-export declare const b = 10;\n","impliedNodeFormat":1},{"version":"6f729672e1964d12037938bd07604115-export const c = class { private p = 10; };","signature":"e1e85d69ff8bbf5440c12f8f1badf3e4-export declare const c: {\n    new (): {\n        p: number;\n    };\n};\n\n(13,1): error4094: Property_0_of_exported_anonymous_class_type_may_not_be_private_or_protected_4094\np\n\n(13,1): error9027: Add_a_type_annotation_to_the_variable_0_9027\nc\n","impliedNodeFormat":1},{"version":"eee493071f513e65e5368e45a4d35584-export const d = class { private p = 10; };","signature":"9bb613afbef9c5e40a1cbd833df92c7f-export declare const d: {\n    new (): {\n        p: number;\n    };\n};\n\n(13,1): error4094: Property_0_of_exported_anonymous_class_type_may_not_be_private_or_protected_4094\np\n\n(13,1): error9027: Add_a_type_annotation_to_the_variable_0_9027\nd\n","impliedNodeFormat":1}],"options":{"declaration":true,"declarationMap":true},"emitDiagnosticsPerFile":[[4,[{"pos":13,"end":14,"code":4094,"category":1,"messageKey":"Property_0_of_exported_anonymous_class_type_may_not_be_private_or_protected_4094","messageArgs":["p"],"relatedInformation":[{"pos":13,"end":14,"code":9027,"category":1,"messageKey":"Add_a_type_annotation_to_the_variable_0_9027","messageArgs":["c"]}]}]],[5,[{"pos":13,"end":14,"code":4094,"category":1,"messageKey":"Property_0_of_exported_anonymous_class_type_may_not_be_private_or_protected_4094","messageArgs":["p"],"relatedInformation":[{"pos":13,"end":14,"code":9027,"category":1,"messageKey":"Add_a_type_annotation_to_the_variable_0_9027","messageArgs":["d"]}]}]]],"affectedFilesPendingEmit":[[2,49],[3,48],[4,48],[5,48]]}
//// [/home/src/projects/project/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
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
    "lib.es2024.full.d.ts",
    "./a.ts",
    "./b.ts",
    "./c.ts",
    "./d.ts"
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
      "version": "257f0ffae056266a216e22aca9e25055-export const a = class { public p = 10; };",
      "signature": "1aa32af20adf1f5d970642bd31541eeb-export declare const a: {\n    new (): {\n        p: number;\n    };\n};\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "257f0ffae056266a216e22aca9e25055-export const a = class { public p = 10; };",
        "signature": "1aa32af20adf1f5d970642bd31541eeb-export declare const a: {\n    new (): {\n        p: number;\n    };\n};\n",
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
      "version": "6f729672e1964d12037938bd07604115-export const c = class { private p = 10; };",
      "signature": "e1e85d69ff8bbf5440c12f8f1badf3e4-export declare const c: {\n    new (): {\n        p: number;\n    };\n};\n\n(13,1): error4094: Property_0_of_exported_anonymous_class_type_may_not_be_private_or_protected_4094\np\n\n(13,1): error9027: Add_a_type_annotation_to_the_variable_0_9027\nc\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "6f729672e1964d12037938bd07604115-export const c = class { private p = 10; };",
        "signature": "e1e85d69ff8bbf5440c12f8f1badf3e4-export declare const c: {\n    new (): {\n        p: number;\n    };\n};\n\n(13,1): error4094: Property_0_of_exported_anonymous_class_type_may_not_be_private_or_protected_4094\np\n\n(13,1): error9027: Add_a_type_annotation_to_the_variable_0_9027\nc\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./d.ts",
      "version": "eee493071f513e65e5368e45a4d35584-export const d = class { private p = 10; };",
      "signature": "9bb613afbef9c5e40a1cbd833df92c7f-export declare const d: {\n    new (): {\n        p: number;\n    };\n};\n\n(13,1): error4094: Property_0_of_exported_anonymous_class_type_may_not_be_private_or_protected_4094\np\n\n(13,1): error9027: Add_a_type_annotation_to_the_variable_0_9027\nd\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "eee493071f513e65e5368e45a4d35584-export const d = class { private p = 10; };",
        "signature": "9bb613afbef9c5e40a1cbd833df92c7f-export declare const d: {\n    new (): {\n        p: number;\n    };\n};\n\n(13,1): error4094: Property_0_of_exported_anonymous_class_type_may_not_be_private_or_protected_4094\np\n\n(13,1): error9027: Add_a_type_annotation_to_the_variable_0_9027\nd\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "options": {
    "declaration": true,
    "declarationMap": true
  },
  "emitDiagnosticsPerFile": [
    [
      "./c.ts",
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
                "c"
              ]
            }
          ]
        }
      ]
    ],
    [
      "./d.ts",
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
                "d"
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
      "Js|DtsEmit|DtsMap",
      [
        2,
        49
      ]
    ],
    [
      "./b.ts",
      "DtsEmit|DtsMap",
      [
        3,
        48
      ]
    ],
    [
      "./c.ts",
      "DtsEmit|DtsMap",
      [
        4,
        48
      ]
    ],
    [
      "./d.ts",
      "DtsEmit|DtsMap",
      [
        5,
        48
      ]
    ]
  ],
  "size": 2890
}

tsconfig.json::
SemanticDiagnostics::
Signatures::


Edit [8]:: Fix the another 
//// [/home/src/projects/project/c.ts] *modified* 
export const c = class { public p = 10; };

tsgo -b -v --noEmit --declaration --declarationMap
ExitStatus:: DiagnosticsPresent_OutputsSkipped
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because buildinfo file 'tsconfig.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project 'tsconfig.json'...

[96md.ts[0m:[93m1[0m:[93m14[0m - [91merror[0m[90m TS4094: [0mProperty 'p' of exported anonymous class type may not be private or protected.

[7m1[0m export const d = class { private p = 10; };
[7m [0m [91m             ~[0m

  [96md.ts[0m:[93m1[0m:[93m14[0m - Add a type annotation to the variable d.
    [7m1[0m export const d = class { private p = 10; };
    [7m [0m [96m             ~[0m


Found 1 error in d.ts[90m:1[0m

//// [/home/src/projects/project/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[[2,5]],"fileNames":["lib.es2024.full.d.ts","./a.ts","./b.ts","./c.ts","./d.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"257f0ffae056266a216e22aca9e25055-export const a = class { public p = 10; };","signature":"1aa32af20adf1f5d970642bd31541eeb-export declare const a: {\n    new (): {\n        p: number;\n    };\n};\n","impliedNodeFormat":1},{"version":"907abc8137ceb88f0ddd6eccfa92d573-export const b = 10;","signature":"eaed5dafb4668e1b7c86b65b584b776a-export declare const b = 10;\n","impliedNodeFormat":1},{"version":"dc7165893e9c62cfeea6f0fad1d8b57c-export const c = class { public p = 10; };","signature":"17c24c6640bff8629aa96eed43575ace-export declare const c: {\n    new (): {\n        p: number;\n    };\n};\n","impliedNodeFormat":1},{"version":"eee493071f513e65e5368e45a4d35584-export const d = class { private p = 10; };","signature":"9bb613afbef9c5e40a1cbd833df92c7f-export declare const d: {\n    new (): {\n        p: number;\n    };\n};\n\n(13,1): error4094: Property_0_of_exported_anonymous_class_type_may_not_be_private_or_protected_4094\np\n\n(13,1): error9027: Add_a_type_annotation_to_the_variable_0_9027\nd\n","impliedNodeFormat":1}],"options":{"declaration":true,"declarationMap":true},"emitDiagnosticsPerFile":[[5,[{"pos":13,"end":14,"code":4094,"category":1,"messageKey":"Property_0_of_exported_anonymous_class_type_may_not_be_private_or_protected_4094","messageArgs":["p"],"relatedInformation":[{"pos":13,"end":14,"code":9027,"category":1,"messageKey":"Add_a_type_annotation_to_the_variable_0_9027","messageArgs":["d"]}]}]]],"affectedFilesPendingEmit":[[2,49],[3,48],[4,49],[5,48]]}
//// [/home/src/projects/project/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
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
    "lib.es2024.full.d.ts",
    "./a.ts",
    "./b.ts",
    "./c.ts",
    "./d.ts"
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
      "version": "257f0ffae056266a216e22aca9e25055-export const a = class { public p = 10; };",
      "signature": "1aa32af20adf1f5d970642bd31541eeb-export declare const a: {\n    new (): {\n        p: number;\n    };\n};\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "257f0ffae056266a216e22aca9e25055-export const a = class { public p = 10; };",
        "signature": "1aa32af20adf1f5d970642bd31541eeb-export declare const a: {\n    new (): {\n        p: number;\n    };\n};\n",
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
      "version": "dc7165893e9c62cfeea6f0fad1d8b57c-export const c = class { public p = 10; };",
      "signature": "17c24c6640bff8629aa96eed43575ace-export declare const c: {\n    new (): {\n        p: number;\n    };\n};\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "dc7165893e9c62cfeea6f0fad1d8b57c-export const c = class { public p = 10; };",
        "signature": "17c24c6640bff8629aa96eed43575ace-export declare const c: {\n    new (): {\n        p: number;\n    };\n};\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./d.ts",
      "version": "eee493071f513e65e5368e45a4d35584-export const d = class { private p = 10; };",
      "signature": "9bb613afbef9c5e40a1cbd833df92c7f-export declare const d: {\n    new (): {\n        p: number;\n    };\n};\n\n(13,1): error4094: Property_0_of_exported_anonymous_class_type_may_not_be_private_or_protected_4094\np\n\n(13,1): error9027: Add_a_type_annotation_to_the_variable_0_9027\nd\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "eee493071f513e65e5368e45a4d35584-export const d = class { private p = 10; };",
        "signature": "9bb613afbef9c5e40a1cbd833df92c7f-export declare const d: {\n    new (): {\n        p: number;\n    };\n};\n\n(13,1): error4094: Property_0_of_exported_anonymous_class_type_may_not_be_private_or_protected_4094\np\n\n(13,1): error9027: Add_a_type_annotation_to_the_variable_0_9027\nd\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "options": {
    "declaration": true,
    "declarationMap": true
  },
  "emitDiagnosticsPerFile": [
    [
      "./d.ts",
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
                "d"
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
      "Js|DtsEmit|DtsMap",
      [
        2,
        49
      ]
    ],
    [
      "./b.ts",
      "DtsEmit|DtsMap",
      [
        3,
        48
      ]
    ],
    [
      "./c.ts",
      "Js|DtsEmit|DtsMap",
      [
        4,
        49
      ]
    ],
    [
      "./d.ts",
      "DtsEmit|DtsMap",
      [
        5,
        48
      ]
    ]
  ],
  "size": 2398
}

tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/projects/project/c.ts
Signatures::
(computed .d.ts) /home/src/projects/project/c.ts
