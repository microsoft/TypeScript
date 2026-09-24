currentDirectory::/home/src/workspaces/project
useCaseSensitiveFileNames::true
Input::
//// [/home/src/tslibs/TS/Lib/lib.es2025.full.d.ts] *new* 
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
interface ReadonlyArray<T> { readonly length: number; readonly [n: number]: T; }
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
//// [/home/src/workspaces/project/repro.ts] *new* 
type Json = string | readonly [Json];
type Parsed<T> = T extends object ? { [K in keyof T]: Parsed<T[K]> } : T;
declare function wrap<T>(value: T): Parsed<T>;
export const value = wrap({ items: null as unknown as Json });
//// [/home/src/workspaces/project/tsconfig.json] *new* 
{"compilerOptions": {"strict": true, "noEmit": true, "incremental": true}}

tsgo 
ExitStatus:: Success
Output::
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":[2],"fileNames":["lib.es2025.full.d.ts","./repro.ts"],"fileInfos":[{"version":"0e330bc1e98a7e2601e4b38548df5e2b-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> { readonly length: number; readonly [n: number]: T; }\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},"718eb10aef6486cea25710beddecaa05-type Json = string | readonly [Json];\ntype Parsed<T> = T extends object ? { [K in keyof T]: Parsed<T[K]> } : T;\ndeclare function wrap<T>(value: T): Parsed<T>;\nexport const value = wrap({ items: null as unknown as Json });"],"options":{"strict":true},"affectedFilesPendingEmit":[2]}
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./repro.ts"
      ],
      "original": 2
    }
  ],
  "fileNames": [
    "lib.es2025.full.d.ts",
    "./repro.ts"
  ],
  "fileInfos": [
    {
      "fileName": "lib.es2025.full.d.ts",
      "version": "0e330bc1e98a7e2601e4b38548df5e2b-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> { readonly length: number; readonly [n: number]: T; }\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };",
      "signature": "0e330bc1e98a7e2601e4b38548df5e2b-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> { readonly length: number; readonly [n: number]: T; }\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "0e330bc1e98a7e2601e4b38548df5e2b-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> { readonly length: number; readonly [n: number]: T; }\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./repro.ts",
      "version": "718eb10aef6486cea25710beddecaa05-type Json = string | readonly [Json];\ntype Parsed<T> = T extends object ? { [K in keyof T]: Parsed<T[K]> } : T;\ndeclare function wrap<T>(value: T): Parsed<T>;\nexport const value = wrap({ items: null as unknown as Json });",
      "signature": "718eb10aef6486cea25710beddecaa05-type Json = string | readonly [Json];\ntype Parsed<T> = T extends object ? { [K in keyof T]: Parsed<T[K]> } : T;\ndeclare function wrap<T>(value: T): Parsed<T>;\nexport const value = wrap({ items: null as unknown as Json });",
      "impliedNodeFormat": "CommonJS"
    }
  ],
  "options": {
    "strict": true
  },
  "affectedFilesPendingEmit": [
    [
      "./repro.ts",
      "Js",
      2
    ]
  ],
  "size": 1240
}

tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es2025.full.d.ts
*refresh*    /home/src/workspaces/project/repro.ts
Signatures::


Edit [0]:: add a comment
//// [/home/src/workspaces/project/repro.ts] *modified* 
type Json = string | readonly [Json];
type Parsed<T> = T extends object ? { [K in keyof T]: Parsed<T[K]> } : T;
declare function wrap<T>(value: T): Parsed<T>;
export const value = wrap({ items: null as unknown as Json });
// comment-only edit


tsgo 
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[91merror[0m[90m TS2589: [0mType instantiation is excessively deep and possibly infinite.

Found 1 error.

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","errors":true,"root":[2],"fileNames":["lib.es2025.full.d.ts","./repro.ts"],"fileInfos":[{"version":"0e330bc1e98a7e2601e4b38548df5e2b-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> { readonly length: number; readonly [n: number]: T; }\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"344e69a90d2cf0ab824957141ca67014-type Json = string | readonly [Json];\ntype Parsed<T> = T extends object ? { [K in keyof T]: Parsed<T[K]> } : T;\ndeclare function wrap<T>(value: T): Parsed<T>;\nexport const value = wrap({ items: null as unknown as Json });\n// comment-only edit\n","signature":"b52bd8d0905c67e4d4c2a1cf19cc0483-type Json = string | readonly [Json];\nexport declare const value: {\n    items: Json;\n};\nexport {};\n","impliedNodeFormat":1}],"options":{"strict":true},"affectedFilesPendingEmit":[2]}
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "errors": true,
  "root": [
    {
      "files": [
        "./repro.ts"
      ],
      "original": 2
    }
  ],
  "fileNames": [
    "lib.es2025.full.d.ts",
    "./repro.ts"
  ],
  "fileInfos": [
    {
      "fileName": "lib.es2025.full.d.ts",
      "version": "0e330bc1e98a7e2601e4b38548df5e2b-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> { readonly length: number; readonly [n: number]: T; }\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };",
      "signature": "0e330bc1e98a7e2601e4b38548df5e2b-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> { readonly length: number; readonly [n: number]: T; }\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "0e330bc1e98a7e2601e4b38548df5e2b-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> { readonly length: number; readonly [n: number]: T; }\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./repro.ts",
      "version": "344e69a90d2cf0ab824957141ca67014-type Json = string | readonly [Json];\ntype Parsed<T> = T extends object ? { [K in keyof T]: Parsed<T[K]> } : T;\ndeclare function wrap<T>(value: T): Parsed<T>;\nexport const value = wrap({ items: null as unknown as Json });\n// comment-only edit\n",
      "signature": "b52bd8d0905c67e4d4c2a1cf19cc0483-type Json = string | readonly [Json];\nexport declare const value: {\n    items: Json;\n};\nexport {};\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "344e69a90d2cf0ab824957141ca67014-type Json = string | readonly [Json];\ntype Parsed<T> = T extends object ? { [K in keyof T]: Parsed<T[K]> } : T;\ndeclare function wrap<T>(value: T): Parsed<T>;\nexport const value = wrap({ items: null as unknown as Json });\n// comment-only edit\n",
        "signature": "b52bd8d0905c67e4d4c2a1cf19cc0483-type Json = string | readonly [Json];\nexport declare const value: {\n    items: Json;\n};\nexport {};\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "options": {
    "strict": true
  },
  "affectedFilesPendingEmit": [
    [
      "./repro.ts",
      "Js",
      2
    ]
  ],
  "size": 1464
}

tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/workspaces/project/repro.ts
Signatures::
(computed .d.ts) /home/src/workspaces/project/repro.ts


Diff:: Incremental checking incorrectly reports a locationless TS2589 after a comment-only edit.
--- nonIncremental.output.txt
+++ incremental.output.txt
@@ -0,0 +1,4 @@
+[91merror[0m[90m TS2589: [0mType instantiation is excessively deep and possibly infinite.
+
+Found 1 error.
+

Edit [1]:: no change

tsgo 
ExitStatus:: Success
Output::
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[2],"fileNames":["lib.es2025.full.d.ts","./repro.ts"],"fileInfos":[{"version":"0e330bc1e98a7e2601e4b38548df5e2b-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> { readonly length: number; readonly [n: number]: T; }\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"344e69a90d2cf0ab824957141ca67014-type Json = string | readonly [Json];\ntype Parsed<T> = T extends object ? { [K in keyof T]: Parsed<T[K]> } : T;\ndeclare function wrap<T>(value: T): Parsed<T>;\nexport const value = wrap({ items: null as unknown as Json });\n// comment-only edit\n","signature":"b52bd8d0905c67e4d4c2a1cf19cc0483-type Json = string | readonly [Json];\nexport declare const value: {\n    items: Json;\n};\nexport {};\n","impliedNodeFormat":1}],"options":{"strict":true},"affectedFilesPendingEmit":[2]}
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./repro.ts"
      ],
      "original": 2
    }
  ],
  "fileNames": [
    "lib.es2025.full.d.ts",
    "./repro.ts"
  ],
  "fileInfos": [
    {
      "fileName": "lib.es2025.full.d.ts",
      "version": "0e330bc1e98a7e2601e4b38548df5e2b-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> { readonly length: number; readonly [n: number]: T; }\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };",
      "signature": "0e330bc1e98a7e2601e4b38548df5e2b-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> { readonly length: number; readonly [n: number]: T; }\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "0e330bc1e98a7e2601e4b38548df5e2b-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> { readonly length: number; readonly [n: number]: T; }\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./repro.ts",
      "version": "344e69a90d2cf0ab824957141ca67014-type Json = string | readonly [Json];\ntype Parsed<T> = T extends object ? { [K in keyof T]: Parsed<T[K]> } : T;\ndeclare function wrap<T>(value: T): Parsed<T>;\nexport const value = wrap({ items: null as unknown as Json });\n// comment-only edit\n",
      "signature": "b52bd8d0905c67e4d4c2a1cf19cc0483-type Json = string | readonly [Json];\nexport declare const value: {\n    items: Json;\n};\nexport {};\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "344e69a90d2cf0ab824957141ca67014-type Json = string | readonly [Json];\ntype Parsed<T> = T extends object ? { [K in keyof T]: Parsed<T[K]> } : T;\ndeclare function wrap<T>(value: T): Parsed<T>;\nexport const value = wrap({ items: null as unknown as Json });\n// comment-only edit\n",
        "signature": "b52bd8d0905c67e4d4c2a1cf19cc0483-type Json = string | readonly [Json];\nexport declare const value: {\n    items: Json;\n};\nexport {};\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "options": {
    "strict": true
  },
  "affectedFilesPendingEmit": [
    [
      "./repro.ts",
      "Js",
      2
    ]
  ],
  "size": 1450
}

tsconfig.json::
SemanticDiagnostics::
Signatures::


Edit [2]:: add another comment
//// [/home/src/workspaces/project/repro.ts] *modified* 
type Json = string | readonly [Json];
type Parsed<T> = T extends object ? { [K in keyof T]: Parsed<T[K]> } : T;
declare function wrap<T>(value: T): Parsed<T>;
export const value = wrap({ items: null as unknown as Json });
// comment-only edit

// another comment


tsgo 
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[91merror[0m[90m TS2589: [0mType instantiation is excessively deep and possibly infinite.

Found 1 error.

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","errors":true,"root":[2],"fileNames":["lib.es2025.full.d.ts","./repro.ts"],"fileInfos":[{"version":"0e330bc1e98a7e2601e4b38548df5e2b-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> { readonly length: number; readonly [n: number]: T; }\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"4d105f43f7f34f1142cf18a2ccbd4b01-type Json = string | readonly [Json];\ntype Parsed<T> = T extends object ? { [K in keyof T]: Parsed<T[K]> } : T;\ndeclare function wrap<T>(value: T): Parsed<T>;\nexport const value = wrap({ items: null as unknown as Json });\n// comment-only edit\n\n// another comment\n","signature":"b52bd8d0905c67e4d4c2a1cf19cc0483-type Json = string | readonly [Json];\nexport declare const value: {\n    items: Json;\n};\nexport {};\n","impliedNodeFormat":1}],"options":{"strict":true},"affectedFilesPendingEmit":[2]}
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "errors": true,
  "root": [
    {
      "files": [
        "./repro.ts"
      ],
      "original": 2
    }
  ],
  "fileNames": [
    "lib.es2025.full.d.ts",
    "./repro.ts"
  ],
  "fileInfos": [
    {
      "fileName": "lib.es2025.full.d.ts",
      "version": "0e330bc1e98a7e2601e4b38548df5e2b-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> { readonly length: number; readonly [n: number]: T; }\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };",
      "signature": "0e330bc1e98a7e2601e4b38548df5e2b-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> { readonly length: number; readonly [n: number]: T; }\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "0e330bc1e98a7e2601e4b38548df5e2b-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> { readonly length: number; readonly [n: number]: T; }\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./repro.ts",
      "version": "4d105f43f7f34f1142cf18a2ccbd4b01-type Json = string | readonly [Json];\ntype Parsed<T> = T extends object ? { [K in keyof T]: Parsed<T[K]> } : T;\ndeclare function wrap<T>(value: T): Parsed<T>;\nexport const value = wrap({ items: null as unknown as Json });\n// comment-only edit\n\n// another comment\n",
      "signature": "b52bd8d0905c67e4d4c2a1cf19cc0483-type Json = string | readonly [Json];\nexport declare const value: {\n    items: Json;\n};\nexport {};\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "4d105f43f7f34f1142cf18a2ccbd4b01-type Json = string | readonly [Json];\ntype Parsed<T> = T extends object ? { [K in keyof T]: Parsed<T[K]> } : T;\ndeclare function wrap<T>(value: T): Parsed<T>;\nexport const value = wrap({ items: null as unknown as Json });\n// comment-only edit\n\n// another comment\n",
        "signature": "b52bd8d0905c67e4d4c2a1cf19cc0483-type Json = string | readonly [Json];\nexport declare const value: {\n    items: Json;\n};\nexport {};\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "options": {
    "strict": true
  },
  "affectedFilesPendingEmit": [
    [
      "./repro.ts",
      "Js",
      2
    ]
  ],
  "size": 1486
}

tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/workspaces/project/repro.ts
Signatures::
(computed .d.ts) /home/src/workspaces/project/repro.ts


Diff:: Incremental checking incorrectly reports a locationless TS2589 after a comment-only edit.
--- nonIncremental.output.txt
+++ incremental.output.txt
@@ -0,0 +1,4 @@
+[91merror[0m[90m TS2589: [0mType instantiation is excessively deep and possibly infinite.
+
+Found 1 error.
+

Edit [3]:: no change

tsgo 
ExitStatus:: Success
Output::
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[2],"fileNames":["lib.es2025.full.d.ts","./repro.ts"],"fileInfos":[{"version":"0e330bc1e98a7e2601e4b38548df5e2b-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> { readonly length: number; readonly [n: number]: T; }\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"4d105f43f7f34f1142cf18a2ccbd4b01-type Json = string | readonly [Json];\ntype Parsed<T> = T extends object ? { [K in keyof T]: Parsed<T[K]> } : T;\ndeclare function wrap<T>(value: T): Parsed<T>;\nexport const value = wrap({ items: null as unknown as Json });\n// comment-only edit\n\n// another comment\n","signature":"b52bd8d0905c67e4d4c2a1cf19cc0483-type Json = string | readonly [Json];\nexport declare const value: {\n    items: Json;\n};\nexport {};\n","impliedNodeFormat":1}],"options":{"strict":true},"affectedFilesPendingEmit":[2]}
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./repro.ts"
      ],
      "original": 2
    }
  ],
  "fileNames": [
    "lib.es2025.full.d.ts",
    "./repro.ts"
  ],
  "fileInfos": [
    {
      "fileName": "lib.es2025.full.d.ts",
      "version": "0e330bc1e98a7e2601e4b38548df5e2b-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> { readonly length: number; readonly [n: number]: T; }\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };",
      "signature": "0e330bc1e98a7e2601e4b38548df5e2b-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> { readonly length: number; readonly [n: number]: T; }\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "0e330bc1e98a7e2601e4b38548df5e2b-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> { readonly length: number; readonly [n: number]: T; }\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./repro.ts",
      "version": "4d105f43f7f34f1142cf18a2ccbd4b01-type Json = string | readonly [Json];\ntype Parsed<T> = T extends object ? { [K in keyof T]: Parsed<T[K]> } : T;\ndeclare function wrap<T>(value: T): Parsed<T>;\nexport const value = wrap({ items: null as unknown as Json });\n// comment-only edit\n\n// another comment\n",
      "signature": "b52bd8d0905c67e4d4c2a1cf19cc0483-type Json = string | readonly [Json];\nexport declare const value: {\n    items: Json;\n};\nexport {};\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "4d105f43f7f34f1142cf18a2ccbd4b01-type Json = string | readonly [Json];\ntype Parsed<T> = T extends object ? { [K in keyof T]: Parsed<T[K]> } : T;\ndeclare function wrap<T>(value: T): Parsed<T>;\nexport const value = wrap({ items: null as unknown as Json });\n// comment-only edit\n\n// another comment\n",
        "signature": "b52bd8d0905c67e4d4c2a1cf19cc0483-type Json = string | readonly [Json];\nexport declare const value: {\n    items: Json;\n};\nexport {};\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "options": {
    "strict": true
  },
  "affectedFilesPendingEmit": [
    [
      "./repro.ts",
      "Js",
      2
    ]
  ],
  "size": 1472
}

tsconfig.json::
SemanticDiagnostics::
Signatures::
