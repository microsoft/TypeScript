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

tsgo --noEmit
ExitStatus:: Success
Output::
//// [/home/src/projects/project/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":[[2,5]],"fileNames":["lib.d.ts","./a.ts","./b.ts","./c.ts","./d.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},"9c1fc7106f3a21aadb5219db8b3209bc-export const a = class { private p = 10; };","907abc8137ceb88f0ddd6eccfa92d573-export const b = 10;","6f729672e1964d12037938bd07604115-export const c = class { private p = 10; };","eee493071f513e65e5368e45a4d35584-export const d = class { private p = 10; };"],"affectedFilesPendingEmit":[2,3,4,5]}
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
  "size": 1217
}
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

tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.d.ts
*refresh*    /home/src/projects/project/a.ts
*refresh*    /home/src/projects/project/b.ts
*refresh*    /home/src/projects/project/c.ts
*refresh*    /home/src/projects/project/d.ts
Signatures::


Edit [0]:: no change

tsgo --noEmit
ExitStatus:: Success
Output::

tsconfig.json::
SemanticDiagnostics::
Signatures::


Edit [1]:: With declaration enabled noEmit - Should report errors

tsgo --noEmit --declaration
ExitStatus:: DiagnosticsPresent_OutputsSkipped
Output::
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
{"version":"FakeTSVersion","root":[[2,5]],"fileNames":["lib.d.ts","./a.ts","./b.ts","./c.ts","./d.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},"9c1fc7106f3a21aadb5219db8b3209bc-export const a = class { private p = 10; };","907abc8137ceb88f0ddd6eccfa92d573-export const b = 10;","6f729672e1964d12037938bd07604115-export const c = class { private p = 10; };","eee493071f513e65e5368e45a4d35584-export const d = class { private p = 10; };"],"options":{"declaration":true},"emitDiagnosticsPerFile":[[2,[{"pos":13,"end":14,"code":4094,"category":1,"message":"Property 'p' of exported anonymous class type may not be private or protected.","relatedInformation":[{"pos":13,"end":14,"code":9027,"category":1,"message":"Add a type annotation to the variable a."}]}]],[4,[{"pos":13,"end":14,"code":4094,"category":1,"message":"Property 'p' of exported anonymous class type may not be private or protected.","relatedInformation":[{"pos":13,"end":14,"code":9027,"category":1,"message":"Add a type annotation to the variable c."}]}]],[5,[{"pos":13,"end":14,"code":4094,"category":1,"message":"Property 'p' of exported anonymous class type may not be private or protected.","relatedInformation":[{"pos":13,"end":14,"code":9027,"category":1,"message":"Add a type annotation to the variable d."}]}]]],"affectedFilesPendingEmit":[[2,17],[3,17],[4,17],[5,17]]}
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
    ],
    [
      "./c.ts",
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
              "message": "Add a type annotation to the variable c."
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
          "message": "Property 'p' of exported anonymous class type may not be private or protected.",
          "relatedInformation": [
            {
              "pos": 13,
              "end": 14,
              "code": 9027,
              "category": 1,
              "message": "Add a type annotation to the variable d."
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
  "size": 2084
}

tsconfig.json::
SemanticDiagnostics::
Signatures::


Edit [2]:: With declaration and declarationMap noEmit - Should report errors

tsgo --noEmit --declaration --declarationMap
ExitStatus:: DiagnosticsPresent_OutputsSkipped
Output::
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
{"version":"FakeTSVersion","root":[[2,5]],"fileNames":["lib.d.ts","./a.ts","./b.ts","./c.ts","./d.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},"9c1fc7106f3a21aadb5219db8b3209bc-export const a = class { private p = 10; };","907abc8137ceb88f0ddd6eccfa92d573-export const b = 10;","6f729672e1964d12037938bd07604115-export const c = class { private p = 10; };","eee493071f513e65e5368e45a4d35584-export const d = class { private p = 10; };"],"options":{"declaration":true,"declarationMap":true},"emitDiagnosticsPerFile":[[2,[{"pos":13,"end":14,"code":4094,"category":1,"message":"Property 'p' of exported anonymous class type may not be private or protected.","relatedInformation":[{"pos":13,"end":14,"code":9027,"category":1,"message":"Add a type annotation to the variable a."}]}]],[4,[{"pos":13,"end":14,"code":4094,"category":1,"message":"Property 'p' of exported anonymous class type may not be private or protected.","relatedInformation":[{"pos":13,"end":14,"code":9027,"category":1,"message":"Add a type annotation to the variable c."}]}]],[5,[{"pos":13,"end":14,"code":4094,"category":1,"message":"Property 'p' of exported anonymous class type may not be private or protected.","relatedInformation":[{"pos":13,"end":14,"code":9027,"category":1,"message":"Add a type annotation to the variable d."}]}]]],"affectedFilesPendingEmit":[[2,49],[3,49],[4,49],[5,49]]}
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
    ],
    [
      "./c.ts",
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
              "message": "Add a type annotation to the variable c."
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
          "message": "Property 'p' of exported anonymous class type may not be private or protected.",
          "relatedInformation": [
            {
              "pos": 13,
              "end": 14,
              "code": 9027,
              "category": 1,
              "message": "Add a type annotation to the variable d."
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
  "size": 2106
}

tsconfig.json::
SemanticDiagnostics::
Signatures::


Edit [3]:: no change

tsgo --noEmit
ExitStatus:: Success
Output::

tsconfig.json::
SemanticDiagnostics::
Signatures::


Edit [4]:: Dts Emit with error

tsgo --declaration
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
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
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.a = void 0;
const a = class {
    p = 10;
};
exports.a = a;

//// [/home/src/projects/project/b.d.ts] *new* 
export declare const b = 10;

//// [/home/src/projects/project/b.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.b = void 0;
exports.b = 10;

//// [/home/src/projects/project/c.d.ts] *new* 
export declare const c: {
    new (): {
        p: number;
    };
};

//// [/home/src/projects/project/c.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.c = void 0;
const c = class {
    p = 10;
};
exports.c = c;

//// [/home/src/projects/project/d.d.ts] *new* 
export declare const d: {
    new (): {
        p: number;
    };
};

//// [/home/src/projects/project/d.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.d = void 0;
const d = class {
    p = 10;
};
exports.d = d;

//// [/home/src/projects/project/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[[2,5]],"fileNames":["lib.d.ts","./a.ts","./b.ts","./c.ts","./d.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"9c1fc7106f3a21aadb5219db8b3209bc-export const a = class { private p = 10; };","signature":"ee8f9d3f76983159b6f8f0407d3b0dff-export declare const a: {\n    new (): {\n        p: number;\n    };\n};\n\n(13,1): error4094: Property 'p' of exported anonymous class type may not be private or protected.\n(13,1): error9027: Add a type annotation to the variable a.","impliedNodeFormat":1},{"version":"907abc8137ceb88f0ddd6eccfa92d573-export const b = 10;","signature":"eaed5dafb4668e1b7c86b65b584b776a-export declare const b = 10;\n","impliedNodeFormat":1},{"version":"6f729672e1964d12037938bd07604115-export const c = class { private p = 10; };","signature":"e2ca0ad93099a06094277675c8c60e6f-export declare const c: {\n    new (): {\n        p: number;\n    };\n};\n\n(13,1): error4094: Property 'p' of exported anonymous class type may not be private or protected.\n(13,1): error9027: Add a type annotation to the variable c.","impliedNodeFormat":1},{"version":"eee493071f513e65e5368e45a4d35584-export const d = class { private p = 10; };","signature":"da46c64a7214d458d5aad6924e4d69d3-export declare const d: {\n    new (): {\n        p: number;\n    };\n};\n\n(13,1): error4094: Property 'p' of exported anonymous class type may not be private or protected.\n(13,1): error9027: Add a type annotation to the variable d.","impliedNodeFormat":1}],"options":{"declaration":true},"emitDiagnosticsPerFile":[[2,[{"pos":13,"end":14,"code":4094,"category":1,"message":"Property 'p' of exported anonymous class type may not be private or protected.","relatedInformation":[{"pos":13,"end":14,"code":9027,"category":1,"message":"Add a type annotation to the variable a."}]}]],[4,[{"pos":13,"end":14,"code":4094,"category":1,"message":"Property 'p' of exported anonymous class type may not be private or protected.","relatedInformation":[{"pos":13,"end":14,"code":9027,"category":1,"message":"Add a type annotation to the variable c."}]}]],[5,[{"pos":13,"end":14,"code":4094,"category":1,"message":"Property 'p' of exported anonymous class type may not be private or protected.","relatedInformation":[{"pos":13,"end":14,"code":9027,"category":1,"message":"Add a type annotation to the variable d."}]}]]]}
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
      "version": "6f729672e1964d12037938bd07604115-export const c = class { private p = 10; };",
      "signature": "e2ca0ad93099a06094277675c8c60e6f-export declare const c: {\n    new (): {\n        p: number;\n    };\n};\n\n(13,1): error4094: Property 'p' of exported anonymous class type may not be private or protected.\n(13,1): error9027: Add a type annotation to the variable c.",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "6f729672e1964d12037938bd07604115-export const c = class { private p = 10; };",
        "signature": "e2ca0ad93099a06094277675c8c60e6f-export declare const c: {\n    new (): {\n        p: number;\n    };\n};\n\n(13,1): error4094: Property 'p' of exported anonymous class type may not be private or protected.\n(13,1): error9027: Add a type annotation to the variable c.",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./d.ts",
      "version": "eee493071f513e65e5368e45a4d35584-export const d = class { private p = 10; };",
      "signature": "da46c64a7214d458d5aad6924e4d69d3-export declare const d: {\n    new (): {\n        p: number;\n    };\n};\n\n(13,1): error4094: Property 'p' of exported anonymous class type may not be private or protected.\n(13,1): error9027: Add a type annotation to the variable d.",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "eee493071f513e65e5368e45a4d35584-export const d = class { private p = 10; };",
        "signature": "da46c64a7214d458d5aad6924e4d69d3-export declare const d: {\n    new (): {\n        p: number;\n    };\n};\n\n(13,1): error4094: Property 'p' of exported anonymous class type may not be private or protected.\n(13,1): error9027: Add a type annotation to the variable d.",
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
    ],
    [
      "./c.ts",
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
              "message": "Add a type annotation to the variable c."
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
          "message": "Property 'p' of exported anonymous class type may not be private or protected.",
          "relatedInformation": [
            {
              "pos": 13,
              "end": 14,
              "code": 9027,
              "category": 1,
              "message": "Add a type annotation to the variable d."
            }
          ]
        }
      ]
    ]
  ],
  "size": 3087
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

tsgo --noEmit
ExitStatus:: Success
Output::
//// [/home/src/projects/project/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[[2,5]],"fileNames":["lib.d.ts","./a.ts","./b.ts","./c.ts","./d.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"257f0ffae056266a216e22aca9e25055-export const a = class { public p = 10; };","signature":"1aa32af20adf1f5d970642bd31541eeb-export declare const a: {\n    new (): {\n        p: number;\n    };\n};\n","impliedNodeFormat":1},{"version":"907abc8137ceb88f0ddd6eccfa92d573-export const b = 10;","signature":"eaed5dafb4668e1b7c86b65b584b776a-export declare const b = 10;\n","impliedNodeFormat":1},{"version":"6f729672e1964d12037938bd07604115-export const c = class { private p = 10; };","signature":"e2ca0ad93099a06094277675c8c60e6f-export declare const c: {\n    new (): {\n        p: number;\n    };\n};\n\n(13,1): error4094: Property 'p' of exported anonymous class type may not be private or protected.\n(13,1): error9027: Add a type annotation to the variable c.","impliedNodeFormat":1},{"version":"eee493071f513e65e5368e45a4d35584-export const d = class { private p = 10; };","signature":"da46c64a7214d458d5aad6924e4d69d3-export declare const d: {\n    new (): {\n        p: number;\n    };\n};\n\n(13,1): error4094: Property 'p' of exported anonymous class type may not be private or protected.\n(13,1): error9027: Add a type annotation to the variable d.","impliedNodeFormat":1}],"emitDiagnosticsPerFile":[[4,[{"pos":13,"end":14,"code":4094,"category":1,"message":"Property 'p' of exported anonymous class type may not be private or protected.","relatedInformation":[{"pos":13,"end":14,"code":9027,"category":1,"message":"Add a type annotation to the variable c."}]}]],[5,[{"pos":13,"end":14,"code":4094,"category":1,"message":"Property 'p' of exported anonymous class type may not be private or protected.","relatedInformation":[{"pos":13,"end":14,"code":9027,"category":1,"message":"Add a type annotation to the variable d."}]}]]],"affectedFilesPendingEmit":[2]}
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
      "signature": "e2ca0ad93099a06094277675c8c60e6f-export declare const c: {\n    new (): {\n        p: number;\n    };\n};\n\n(13,1): error4094: Property 'p' of exported anonymous class type may not be private or protected.\n(13,1): error9027: Add a type annotation to the variable c.",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "6f729672e1964d12037938bd07604115-export const c = class { private p = 10; };",
        "signature": "e2ca0ad93099a06094277675c8c60e6f-export declare const c: {\n    new (): {\n        p: number;\n    };\n};\n\n(13,1): error4094: Property 'p' of exported anonymous class type may not be private or protected.\n(13,1): error9027: Add a type annotation to the variable c.",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./d.ts",
      "version": "eee493071f513e65e5368e45a4d35584-export const d = class { private p = 10; };",
      "signature": "da46c64a7214d458d5aad6924e4d69d3-export declare const d: {\n    new (): {\n        p: number;\n    };\n};\n\n(13,1): error4094: Property 'p' of exported anonymous class type may not be private or protected.\n(13,1): error9027: Add a type annotation to the variable d.",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "eee493071f513e65e5368e45a4d35584-export const d = class { private p = 10; };",
        "signature": "da46c64a7214d458d5aad6924e4d69d3-export declare const d: {\n    new (): {\n        p: number;\n    };\n};\n\n(13,1): error4094: Property 'p' of exported anonymous class type may not be private or protected.\n(13,1): error9027: Add a type annotation to the variable d.",
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
          "message": "Property 'p' of exported anonymous class type may not be private or protected.",
          "relatedInformation": [
            {
              "pos": 13,
              "end": 14,
              "code": 9027,
              "category": 1,
              "message": "Add a type annotation to the variable c."
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
          "message": "Property 'p' of exported anonymous class type may not be private or protected.",
          "relatedInformation": [
            {
              "pos": 13,
              "end": 14,
              "code": 9027,
              "category": 1,
              "message": "Add a type annotation to the variable d."
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
  "size": 2663
}

tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/projects/project/a.ts
Signatures::
(computed .d.ts) /home/src/projects/project/a.ts


Edit [6]:: With declaration enabled noEmit

tsgo --noEmit --declaration
ExitStatus:: DiagnosticsPresent_OutputsSkipped
Output::
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
{"version":"FakeTSVersion","root":[[2,5]],"fileNames":["lib.d.ts","./a.ts","./b.ts","./c.ts","./d.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"257f0ffae056266a216e22aca9e25055-export const a = class { public p = 10; };","signature":"1aa32af20adf1f5d970642bd31541eeb-export declare const a: {\n    new (): {\n        p: number;\n    };\n};\n","impliedNodeFormat":1},{"version":"907abc8137ceb88f0ddd6eccfa92d573-export const b = 10;","signature":"eaed5dafb4668e1b7c86b65b584b776a-export declare const b = 10;\n","impliedNodeFormat":1},{"version":"6f729672e1964d12037938bd07604115-export const c = class { private p = 10; };","signature":"e2ca0ad93099a06094277675c8c60e6f-export declare const c: {\n    new (): {\n        p: number;\n    };\n};\n\n(13,1): error4094: Property 'p' of exported anonymous class type may not be private or protected.\n(13,1): error9027: Add a type annotation to the variable c.","impliedNodeFormat":1},{"version":"eee493071f513e65e5368e45a4d35584-export const d = class { private p = 10; };","signature":"da46c64a7214d458d5aad6924e4d69d3-export declare const d: {\n    new (): {\n        p: number;\n    };\n};\n\n(13,1): error4094: Property 'p' of exported anonymous class type may not be private or protected.\n(13,1): error9027: Add a type annotation to the variable d.","impliedNodeFormat":1}],"options":{"declaration":true},"emitDiagnosticsPerFile":[[4,[{"pos":13,"end":14,"code":4094,"category":1,"message":"Property 'p' of exported anonymous class type may not be private or protected.","relatedInformation":[{"pos":13,"end":14,"code":9027,"category":1,"message":"Add a type annotation to the variable c."}]}]],[5,[{"pos":13,"end":14,"code":4094,"category":1,"message":"Property 'p' of exported anonymous class type may not be private or protected.","relatedInformation":[{"pos":13,"end":14,"code":9027,"category":1,"message":"Add a type annotation to the variable d."}]}]]],"affectedFilesPendingEmit":[[2,17],[3,16],[4,16],[5,16]]}
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
      "signature": "e2ca0ad93099a06094277675c8c60e6f-export declare const c: {\n    new (): {\n        p: number;\n    };\n};\n\n(13,1): error4094: Property 'p' of exported anonymous class type may not be private or protected.\n(13,1): error9027: Add a type annotation to the variable c.",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "6f729672e1964d12037938bd07604115-export const c = class { private p = 10; };",
        "signature": "e2ca0ad93099a06094277675c8c60e6f-export declare const c: {\n    new (): {\n        p: number;\n    };\n};\n\n(13,1): error4094: Property 'p' of exported anonymous class type may not be private or protected.\n(13,1): error9027: Add a type annotation to the variable c.",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./d.ts",
      "version": "eee493071f513e65e5368e45a4d35584-export const d = class { private p = 10; };",
      "signature": "da46c64a7214d458d5aad6924e4d69d3-export declare const d: {\n    new (): {\n        p: number;\n    };\n};\n\n(13,1): error4094: Property 'p' of exported anonymous class type may not be private or protected.\n(13,1): error9027: Add a type annotation to the variable d.",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "eee493071f513e65e5368e45a4d35584-export const d = class { private p = 10; };",
        "signature": "da46c64a7214d458d5aad6924e4d69d3-export declare const d: {\n    new (): {\n        p: number;\n    };\n};\n\n(13,1): error4094: Property 'p' of exported anonymous class type may not be private or protected.\n(13,1): error9027: Add a type annotation to the variable d.",
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
          "message": "Property 'p' of exported anonymous class type may not be private or protected.",
          "relatedInformation": [
            {
              "pos": 13,
              "end": 14,
              "code": 9027,
              "category": 1,
              "message": "Add a type annotation to the variable c."
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
          "message": "Property 'p' of exported anonymous class type may not be private or protected.",
          "relatedInformation": [
            {
              "pos": 13,
              "end": 14,
              "code": 9027,
              "category": 1,
              "message": "Add a type annotation to the variable d."
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
  "size": 2720
}

tsconfig.json::
SemanticDiagnostics::
Signatures::


Edit [7]:: With declaration and declarationMap noEmit

tsgo --noEmit --declaration --declarationMap
ExitStatus:: DiagnosticsPresent_OutputsSkipped
Output::
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
{"version":"FakeTSVersion","root":[[2,5]],"fileNames":["lib.d.ts","./a.ts","./b.ts","./c.ts","./d.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"257f0ffae056266a216e22aca9e25055-export const a = class { public p = 10; };","signature":"1aa32af20adf1f5d970642bd31541eeb-export declare const a: {\n    new (): {\n        p: number;\n    };\n};\n","impliedNodeFormat":1},{"version":"907abc8137ceb88f0ddd6eccfa92d573-export const b = 10;","signature":"eaed5dafb4668e1b7c86b65b584b776a-export declare const b = 10;\n","impliedNodeFormat":1},{"version":"6f729672e1964d12037938bd07604115-export const c = class { private p = 10; };","signature":"e2ca0ad93099a06094277675c8c60e6f-export declare const c: {\n    new (): {\n        p: number;\n    };\n};\n\n(13,1): error4094: Property 'p' of exported anonymous class type may not be private or protected.\n(13,1): error9027: Add a type annotation to the variable c.","impliedNodeFormat":1},{"version":"eee493071f513e65e5368e45a4d35584-export const d = class { private p = 10; };","signature":"da46c64a7214d458d5aad6924e4d69d3-export declare const d: {\n    new (): {\n        p: number;\n    };\n};\n\n(13,1): error4094: Property 'p' of exported anonymous class type may not be private or protected.\n(13,1): error9027: Add a type annotation to the variable d.","impliedNodeFormat":1}],"options":{"declaration":true,"declarationMap":true},"emitDiagnosticsPerFile":[[4,[{"pos":13,"end":14,"code":4094,"category":1,"message":"Property 'p' of exported anonymous class type may not be private or protected.","relatedInformation":[{"pos":13,"end":14,"code":9027,"category":1,"message":"Add a type annotation to the variable c."}]}]],[5,[{"pos":13,"end":14,"code":4094,"category":1,"message":"Property 'p' of exported anonymous class type may not be private or protected.","relatedInformation":[{"pos":13,"end":14,"code":9027,"category":1,"message":"Add a type annotation to the variable d."}]}]]],"affectedFilesPendingEmit":[[2,49],[3,48],[4,48],[5,48]]}
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
      "signature": "e2ca0ad93099a06094277675c8c60e6f-export declare const c: {\n    new (): {\n        p: number;\n    };\n};\n\n(13,1): error4094: Property 'p' of exported anonymous class type may not be private or protected.\n(13,1): error9027: Add a type annotation to the variable c.",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "6f729672e1964d12037938bd07604115-export const c = class { private p = 10; };",
        "signature": "e2ca0ad93099a06094277675c8c60e6f-export declare const c: {\n    new (): {\n        p: number;\n    };\n};\n\n(13,1): error4094: Property 'p' of exported anonymous class type may not be private or protected.\n(13,1): error9027: Add a type annotation to the variable c.",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./d.ts",
      "version": "eee493071f513e65e5368e45a4d35584-export const d = class { private p = 10; };",
      "signature": "da46c64a7214d458d5aad6924e4d69d3-export declare const d: {\n    new (): {\n        p: number;\n    };\n};\n\n(13,1): error4094: Property 'p' of exported anonymous class type may not be private or protected.\n(13,1): error9027: Add a type annotation to the variable d.",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "eee493071f513e65e5368e45a4d35584-export const d = class { private p = 10; };",
        "signature": "da46c64a7214d458d5aad6924e4d69d3-export declare const d: {\n    new (): {\n        p: number;\n    };\n};\n\n(13,1): error4094: Property 'p' of exported anonymous class type may not be private or protected.\n(13,1): error9027: Add a type annotation to the variable d.",
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
          "message": "Property 'p' of exported anonymous class type may not be private or protected.",
          "relatedInformation": [
            {
              "pos": 13,
              "end": 14,
              "code": 9027,
              "category": 1,
              "message": "Add a type annotation to the variable c."
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
          "message": "Property 'p' of exported anonymous class type may not be private or protected.",
          "relatedInformation": [
            {
              "pos": 13,
              "end": 14,
              "code": 9027,
              "category": 1,
              "message": "Add a type annotation to the variable d."
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
  "size": 2742
}

tsconfig.json::
SemanticDiagnostics::
Signatures::


Edit [8]:: Fix the another 
//// [/home/src/projects/project/c.ts] *modified* 
export const c = class { public p = 10; };

tsgo --noEmit --declaration --declarationMap
ExitStatus:: DiagnosticsPresent_OutputsSkipped
Output::
[96md.ts[0m:[93m1[0m:[93m14[0m - [91merror[0m[90m TS4094: [0mProperty 'p' of exported anonymous class type may not be private or protected.

[7m1[0m export const d = class { private p = 10; };
[7m [0m [91m             ~[0m

  [96md.ts[0m:[93m1[0m:[93m14[0m - Add a type annotation to the variable d.
    [7m1[0m export const d = class { private p = 10; };
    [7m [0m [96m             ~[0m


Found 1 error in d.ts[90m:1[0m

//// [/home/src/projects/project/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[[2,5]],"fileNames":["lib.d.ts","./a.ts","./b.ts","./c.ts","./d.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"257f0ffae056266a216e22aca9e25055-export const a = class { public p = 10; };","signature":"1aa32af20adf1f5d970642bd31541eeb-export declare const a: {\n    new (): {\n        p: number;\n    };\n};\n","impliedNodeFormat":1},{"version":"907abc8137ceb88f0ddd6eccfa92d573-export const b = 10;","signature":"eaed5dafb4668e1b7c86b65b584b776a-export declare const b = 10;\n","impliedNodeFormat":1},{"version":"dc7165893e9c62cfeea6f0fad1d8b57c-export const c = class { public p = 10; };","signature":"17c24c6640bff8629aa96eed43575ace-export declare const c: {\n    new (): {\n        p: number;\n    };\n};\n","impliedNodeFormat":1},{"version":"eee493071f513e65e5368e45a4d35584-export const d = class { private p = 10; };","signature":"da46c64a7214d458d5aad6924e4d69d3-export declare const d: {\n    new (): {\n        p: number;\n    };\n};\n\n(13,1): error4094: Property 'p' of exported anonymous class type may not be private or protected.\n(13,1): error9027: Add a type annotation to the variable d.","impliedNodeFormat":1}],"options":{"declaration":true,"declarationMap":true},"emitDiagnosticsPerFile":[[5,[{"pos":13,"end":14,"code":4094,"category":1,"message":"Property 'p' of exported anonymous class type may not be private or protected.","relatedInformation":[{"pos":13,"end":14,"code":9027,"category":1,"message":"Add a type annotation to the variable d."}]}]]],"affectedFilesPendingEmit":[[2,49],[3,48],[4,49],[5,48]]}
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
      "signature": "da46c64a7214d458d5aad6924e4d69d3-export declare const d: {\n    new (): {\n        p: number;\n    };\n};\n\n(13,1): error4094: Property 'p' of exported anonymous class type may not be private or protected.\n(13,1): error9027: Add a type annotation to the variable d.",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "eee493071f513e65e5368e45a4d35584-export const d = class { private p = 10; };",
        "signature": "da46c64a7214d458d5aad6924e4d69d3-export declare const d: {\n    new (): {\n        p: number;\n    };\n};\n\n(13,1): error4094: Property 'p' of exported anonymous class type may not be private or protected.\n(13,1): error9027: Add a type annotation to the variable d.",
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
          "message": "Property 'p' of exported anonymous class type may not be private or protected.",
          "relatedInformation": [
            {
              "pos": 13,
              "end": 14,
              "code": 9027,
              "category": 1,
              "message": "Add a type annotation to the variable d."
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
  "size": 2318
}

tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/projects/project/c.ts
Signatures::
(computed .d.ts) /home/src/projects/project/c.ts
