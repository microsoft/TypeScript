currentDirectory::/home/src/workspaces/project
useCaseSensitiveFileNames::true
Input::
//// [/home/src/workspaces/project/producer/index.tsx] *new* 
declare namespace A { function create(...args: any[]): any; namespace JSX { interface Element { a: string; } interface IntrinsicElements { div: {}; } } }
declare namespace B { function create(...args: any[]): any; namespace JSX { interface Element { b: number; } interface IntrinsicElements { div: {}; } } }
export const result = <div />;
//// [/home/src/workspaces/project/producer/tsconfig.json] *new* 
{
    "compilerOptions": {
        "composite": true,
        "declaration": true,
        "emitDeclarationOnly": true,
        "jsx": "react",
        "jsxFactory": "B.create",
        "lib": [
            "es2020"
        ],
        "module": "esnext",
        "moduleResolution": "bundler",
        "outDir": "dist",
        "rootDir": ".",
        "strict": true,
        "target": "es2020"
    },
    "files": [
        "index.tsx"
    ]
}

tsgo --build producer --verbose
ExitStatus:: Success
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * producer/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'producer/tsconfig.json' is out of date because output file 'producer/dist/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project 'producer/tsconfig.json'...

//// [/home/src/tslibs/TS/Lib/lib.es2020.d.ts] *Lib*
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
//// [/home/src/workspaces/project/producer/dist/index.d.ts] *new* 
declare namespace B {
    function create(...args: any[]): any;
    namespace JSX {
        interface Element {
            b: number;
        }
        interface IntrinsicElements {
            div: {};
        }
    }
}
export declare const result: B.JSX.Element;
export {};

//// [/home/src/workspaces/project/producer/dist/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":[2],"fileNames":["lib.es2020.d.ts","../index.tsx"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"23628e376238d49062aee78e65258589-declare namespace A { function create(...args: any[]): any; namespace JSX { interface Element { a: string; } interface IntrinsicElements { div: {}; } } }\ndeclare namespace B { function create(...args: any[]): any; namespace JSX { interface Element { b: number; } interface IntrinsicElements { div: {}; } } }\nexport const result = <div />;","signature":"3fe95b2d9b150f2d7a0ef4e0a5ebfd93-declare namespace B {\n    function create(...args: any[]): any;\n    namespace JSX {\n        interface Element {\n            b: number;\n        }\n        interface IntrinsicElements {\n            div: {};\n        }\n    }\n}\nexport declare const result: B.JSX.Element;\nexport {};\n","impliedNodeFormat":1}],"options":{"composite":true,"emitDeclarationOnly":true,"declaration":true,"jsx":2,"module":99,"outDir":"./","rootDir":"..","strict":true,"target":7},"latestChangedDtsFile":"./index.d.ts"}
//// [/home/src/workspaces/project/producer/dist/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "../index.tsx"
      ],
      "original": 2
    }
  ],
  "fileNames": [
    "lib.es2020.d.ts",
    "../index.tsx"
  ],
  "fileInfos": [
    {
      "fileName": "lib.es2020.d.ts",
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
      "fileName": "../index.tsx",
      "version": "23628e376238d49062aee78e65258589-declare namespace A { function create(...args: any[]): any; namespace JSX { interface Element { a: string; } interface IntrinsicElements { div: {}; } } }\ndeclare namespace B { function create(...args: any[]): any; namespace JSX { interface Element { b: number; } interface IntrinsicElements { div: {}; } } }\nexport const result = <div />;",
      "signature": "3fe95b2d9b150f2d7a0ef4e0a5ebfd93-declare namespace B {\n    function create(...args: any[]): any;\n    namespace JSX {\n        interface Element {\n            b: number;\n        }\n        interface IntrinsicElements {\n            div: {};\n        }\n    }\n}\nexport declare const result: B.JSX.Element;\nexport {};\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "23628e376238d49062aee78e65258589-declare namespace A { function create(...args: any[]): any; namespace JSX { interface Element { a: string; } interface IntrinsicElements { div: {}; } } }\ndeclare namespace B { function create(...args: any[]): any; namespace JSX { interface Element { b: number; } interface IntrinsicElements { div: {}; } } }\nexport const result = <div />;",
        "signature": "3fe95b2d9b150f2d7a0ef4e0a5ebfd93-declare namespace B {\n    function create(...args: any[]): any;\n    namespace JSX {\n        interface Element {\n            b: number;\n        }\n        interface IntrinsicElements {\n            div: {};\n        }\n    }\n}\nexport declare const result: B.JSX.Element;\nexport {};\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "options": {
    "composite": true,
    "emitDeclarationOnly": true,
    "declaration": true,
    "jsx": 2,
    "module": 99,
    "outDir": "./",
    "rootDir": "..",
    "strict": true,
    "target": 7
  },
  "latestChangedDtsFile": "./index.d.ts",
  "size": 1804
}

producer/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es2020.d.ts
*refresh*    /home/src/workspaces/project/producer/index.tsx
Signatures::
(stored at emit) /home/src/workspaces/project/producer/index.tsx


Edit [0]:: no change

tsgo --build producer --verbose
ExitStatus:: Success
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * producer/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'producer/tsconfig.json' is up to date because newest input 'producer/index.tsx' is older than output 'producer/dist/tsconfig.tsbuildinfo'




Edit [1]:: change jsxFactory without changing source files
//// [/home/src/workspaces/project/producer/tsconfig.json] *modified* 
{
    "compilerOptions": {
        "composite": true,
        "declaration": true,
        "emitDeclarationOnly": true,
        "jsx": "react",
        "jsxFactory": "A.create",
        "lib": [
            "es2020"
        ],
        "module": "esnext",
        "moduleResolution": "bundler",
        "outDir": "dist",
        "rootDir": ".",
        "strict": true,
        "target": "es2020"
    },
    "files": [
        "index.tsx"
    ]
}

tsgo --build producer --verbose
ExitStatus:: Success
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * producer/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'producer/tsconfig.json' is out of date because output 'producer/dist/tsconfig.tsbuildinfo' is older than input 'producer/tsconfig.json'

[[90mHH:MM:SS AM[0m] Building project 'producer/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Updating unchanged output timestamps of project 'producer/tsconfig.json'...

//// [/home/src/workspaces/project/producer/dist/tsconfig.tsbuildinfo] *mTime changed*

producer/tsconfig.json::
SemanticDiagnostics::
Signatures::


Diff:: Changing jsxFactory without editing source files leaves stale output or diagnostics.
--- nonIncremental /home/src/workspaces/project/producer/dist/index.d.ts
+++ incremental /home/src/workspaces/project/producer/dist/index.d.ts
@@ -1,13 +1,13 @@
-declare namespace A {
+declare namespace B {
     function create(...args: any[]): any;
     namespace JSX {
         interface Element {
-            a: string;
+            b: number;
         }
         interface IntrinsicElements {
             div: {};
         }
     }
 }
-export declare const result: A.JSX.Element;
+export declare const result: B.JSX.Element;
 export {};


Edit [2]:: no change

tsgo --build producer --verbose
ExitStatus:: Success
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * producer/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'producer/tsconfig.json' is up to date because newest input 'producer/index.tsx' is older than output 'producer/dist/tsconfig.tsbuildinfo'




Diff:: Changing jsxFactory without editing source files leaves stale output or diagnostics.
--- nonIncremental /home/src/workspaces/project/producer/dist/index.d.ts
+++ incremental /home/src/workspaces/project/producer/dist/index.d.ts
@@ -1,13 +1,13 @@
-declare namespace A {
+declare namespace B {
     function create(...args: any[]): any;
     namespace JSX {
         interface Element {
-            a: string;
+            b: number;
         }
         interface IntrinsicElements {
             div: {};
         }
     }
 }
-export declare const result: A.JSX.Element;
+export declare const result: B.JSX.Element;
 export {};


Edit [3]:: force rebuild with the same compiler options

tsgo --build producer --verbose --force
ExitStatus:: Success
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * producer/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'producer/tsconfig.json' is being forcibly rebuilt

[[90mHH:MM:SS AM[0m] Building project 'producer/tsconfig.json'...

//// [/home/src/workspaces/project/producer/dist/index.d.ts] *modified* 
declare namespace A {
    function create(...args: any[]): any;
    namespace JSX {
        interface Element {
            a: string;
        }
        interface IntrinsicElements {
            div: {};
        }
    }
}
export declare const result: A.JSX.Element;
export {};

//// [/home/src/workspaces/project/producer/dist/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[2],"fileNames":["lib.es2020.d.ts","../index.tsx"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"23628e376238d49062aee78e65258589-declare namespace A { function create(...args: any[]): any; namespace JSX { interface Element { a: string; } interface IntrinsicElements { div: {}; } } }\ndeclare namespace B { function create(...args: any[]): any; namespace JSX { interface Element { b: number; } interface IntrinsicElements { div: {}; } } }\nexport const result = <div />;","signature":"4508f79e06e6e1fd9854f7b21e7c2ad6-declare namespace A {\n    function create(...args: any[]): any;\n    namespace JSX {\n        interface Element {\n            a: string;\n        }\n        interface IntrinsicElements {\n            div: {};\n        }\n    }\n}\nexport declare const result: A.JSX.Element;\nexport {};\n","impliedNodeFormat":1}],"options":{"composite":true,"emitDeclarationOnly":true,"declaration":true,"jsx":2,"module":99,"outDir":"./","rootDir":"..","strict":true,"target":7},"latestChangedDtsFile":"./index.d.ts"}
//// [/home/src/workspaces/project/producer/dist/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "../index.tsx"
      ],
      "original": 2
    }
  ],
  "fileNames": [
    "lib.es2020.d.ts",
    "../index.tsx"
  ],
  "fileInfos": [
    {
      "fileName": "lib.es2020.d.ts",
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
      "fileName": "../index.tsx",
      "version": "23628e376238d49062aee78e65258589-declare namespace A { function create(...args: any[]): any; namespace JSX { interface Element { a: string; } interface IntrinsicElements { div: {}; } } }\ndeclare namespace B { function create(...args: any[]): any; namespace JSX { interface Element { b: number; } interface IntrinsicElements { div: {}; } } }\nexport const result = <div />;",
      "signature": "4508f79e06e6e1fd9854f7b21e7c2ad6-declare namespace A {\n    function create(...args: any[]): any;\n    namespace JSX {\n        interface Element {\n            a: string;\n        }\n        interface IntrinsicElements {\n            div: {};\n        }\n    }\n}\nexport declare const result: A.JSX.Element;\nexport {};\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "23628e376238d49062aee78e65258589-declare namespace A { function create(...args: any[]): any; namespace JSX { interface Element { a: string; } interface IntrinsicElements { div: {}; } } }\ndeclare namespace B { function create(...args: any[]): any; namespace JSX { interface Element { b: number; } interface IntrinsicElements { div: {}; } } }\nexport const result = <div />;",
        "signature": "4508f79e06e6e1fd9854f7b21e7c2ad6-declare namespace A {\n    function create(...args: any[]): any;\n    namespace JSX {\n        interface Element {\n            a: string;\n        }\n        interface IntrinsicElements {\n            div: {};\n        }\n    }\n}\nexport declare const result: A.JSX.Element;\nexport {};\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "options": {
    "composite": true,
    "emitDeclarationOnly": true,
    "declaration": true,
    "jsx": 2,
    "module": 99,
    "outDir": "./",
    "rootDir": "..",
    "strict": true,
    "target": 7
  },
  "latestChangedDtsFile": "./index.d.ts",
  "size": 1804
}

producer/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es2020.d.ts
*refresh*    /home/src/workspaces/project/producer/index.tsx
Signatures::
(stored at emit) /home/src/workspaces/project/producer/index.tsx


Edit [4]:: no change

tsgo --build producer --verbose
ExitStatus:: Success
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * producer/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'producer/tsconfig.json' is up to date because newest input 'producer/index.tsx' is older than output 'producer/dist/tsconfig.tsbuildinfo'


