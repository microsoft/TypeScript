currentDirectory::/home/src/workspaces/project
useCaseSensitiveFileNames::true
Input::
//// [/home/src/workspaces/project/producer/index.ts] *new* 
namespace Value { export const enum Field { One } }

//// [/home/src/workspaces/project/producer/other.ts] *new* 
class Value {}

//// [/home/src/workspaces/project/producer/tsconfig.json] *new* 
{
    "compilerOptions": {
        "composite": true,
        "declaration": true,
        "emitDeclarationOnly": true,
        "lib": [
            "es2020"
        ],
        "module": "esnext",
        "moduleDetection": "legacy",
        "moduleResolution": "bundler",
        "outDir": "dist",
        "preserveConstEnums": true,
        "rootDir": ".",
        "strict": true,
        "target": "es2020"
    },
    "files": [
        "index.ts",
        "other.ts"
    ]
}

tsgo --project producer --listEmittedFiles
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[96mproducer/index.ts[0m:[93m1[0m:[93m11[0m - [91merror[0m[90m TS2433: [0mA namespace declaration cannot be in a different file from a class or function with which it is merged.

[7m1[0m namespace Value { export const enum Field { One } }
[7m [0m [91m          ~~~~~[0m

TSFILE: /home/src/workspaces/project/producer/dist/index.d.ts
TSFILE: /home/src/workspaces/project/producer/dist/other.d.ts
TSFILE: /home/src/workspaces/project/producer/dist/tsconfig.tsbuildinfo

Found 1 error in producer/index.ts[90m:1[0m

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
declare namespace Value {
    const enum Field {
        One = 0
    }
}

//// [/home/src/workspaces/project/producer/dist/other.d.ts] *new* 
declare class Value {
}

//// [/home/src/workspaces/project/producer/dist/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":[[2,3]],"fileNames":["lib.es2020.d.ts","../index.ts","../other.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"bc313e9f7e06046b36e33c63099c19fb-namespace Value { export const enum Field { One } }\n","signature":"6220140372d87df4d13eaeb310e98329-declare namespace Value {\n    const enum Field {\n        One = 0\n    }\n}\n","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"e0ad4879312c3de57b2fb2b729378854-class Value {}\n","signature":"9f36ed7c4e3f51d34eece5b03afd9245-declare class Value {\n}\n","affectsGlobalScope":true,"impliedNodeFormat":1}],"options":{"composite":true,"emitDeclarationOnly":true,"declaration":true,"module":99,"moduleResolution":100,"moduleDetection":2,"outDir":"./","preserveConstEnums":true,"rootDir":"..","strict":true,"target":7},"semanticDiagnosticsPerFile":[[2,[{"pos":10,"end":15,"code":2433,"category":1,"messageKey":"A_namespace_declaration_cannot_be_in_a_different_file_from_a_class_or_function_with_which_it_is_merg_2433"}]]],"latestChangedDtsFile":"./other.d.ts"}
//// [/home/src/workspaces/project/producer/dist/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "../index.ts",
        "../other.ts"
      ],
      "original": [
        2,
        3
      ]
    }
  ],
  "fileNames": [
    "lib.es2020.d.ts",
    "../index.ts",
    "../other.ts"
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
      "fileName": "../index.ts",
      "version": "bc313e9f7e06046b36e33c63099c19fb-namespace Value { export const enum Field { One } }\n",
      "signature": "6220140372d87df4d13eaeb310e98329-declare namespace Value {\n    const enum Field {\n        One = 0\n    }\n}\n",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "bc313e9f7e06046b36e33c63099c19fb-namespace Value { export const enum Field { One } }\n",
        "signature": "6220140372d87df4d13eaeb310e98329-declare namespace Value {\n    const enum Field {\n        One = 0\n    }\n}\n",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "../other.ts",
      "version": "e0ad4879312c3de57b2fb2b729378854-class Value {}\n",
      "signature": "9f36ed7c4e3f51d34eece5b03afd9245-declare class Value {\n}\n",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "e0ad4879312c3de57b2fb2b729378854-class Value {}\n",
        "signature": "9f36ed7c4e3f51d34eece5b03afd9245-declare class Value {\n}\n",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    }
  ],
  "options": {
    "composite": true,
    "emitDeclarationOnly": true,
    "declaration": true,
    "module": 99,
    "moduleResolution": 100,
    "moduleDetection": 2,
    "outDir": "./",
    "preserveConstEnums": true,
    "rootDir": "..",
    "strict": true,
    "target": 7
  },
  "semanticDiagnosticsPerFile": [
    [
      "../index.ts",
      [
        {
          "pos": 10,
          "end": 15,
          "code": 2433,
          "category": 1,
          "messageKey": "A_namespace_declaration_cannot_be_in_a_different_file_from_a_class_or_function_with_which_it_is_merg_2433"
        }
      ]
    ]
  ],
  "latestChangedDtsFile": "./other.d.ts",
  "size": 1798
}

producer/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es2020.d.ts
*refresh*    /home/src/workspaces/project/producer/index.ts
*refresh*    /home/src/workspaces/project/producer/other.ts
Signatures::
(stored at emit) /home/src/workspaces/project/producer/index.ts
(stored at emit) /home/src/workspaces/project/producer/other.ts


Edit [0]:: no change

tsgo --project producer --listEmittedFiles
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[96mproducer/index.ts[0m:[93m1[0m:[93m11[0m - [91merror[0m[90m TS2433: [0mA namespace declaration cannot be in a different file from a class or function with which it is merged.

[7m1[0m namespace Value { export const enum Field { One } }
[7m [0m [91m          ~~~~~[0m


Found 1 error in producer/index.ts[90m:1[0m


producer/tsconfig.json::
SemanticDiagnostics::
Signatures::


Edit [1]:: change preserveConstEnums without changing source files
//// [/home/src/workspaces/project/producer/tsconfig.json] *modified* 
{
    "compilerOptions": {
        "composite": true,
        "declaration": true,
        "emitDeclarationOnly": true,
        "lib": [
            "es2020"
        ],
        "module": "esnext",
        "moduleDetection": "legacy",
        "moduleResolution": "bundler",
        "outDir": "dist",
        "preserveConstEnums": false,
        "rootDir": ".",
        "strict": true,
        "target": "es2020"
    },
    "files": [
        "index.ts",
        "other.ts"
    ]
}

tsgo --project producer --listEmittedFiles
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[96mproducer/index.ts[0m:[93m1[0m:[93m11[0m - [91merror[0m[90m TS2433: [0mA namespace declaration cannot be in a different file from a class or function with which it is merged.

[7m1[0m namespace Value { export const enum Field { One } }
[7m [0m [91m          ~~~~~[0m

TSFILE: /home/src/workspaces/project/producer/dist/tsconfig.tsbuildinfo

Found 1 error in producer/index.ts[90m:1[0m

//// [/home/src/workspaces/project/producer/dist/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[[2,3]],"fileNames":["lib.es2020.d.ts","../index.ts","../other.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"bc313e9f7e06046b36e33c63099c19fb-namespace Value { export const enum Field { One } }\n","signature":"6220140372d87df4d13eaeb310e98329-declare namespace Value {\n    const enum Field {\n        One = 0\n    }\n}\n","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"e0ad4879312c3de57b2fb2b729378854-class Value {}\n","signature":"9f36ed7c4e3f51d34eece5b03afd9245-declare class Value {\n}\n","affectsGlobalScope":true,"impliedNodeFormat":1}],"options":{"composite":true,"emitDeclarationOnly":true,"declaration":true,"module":99,"moduleResolution":100,"moduleDetection":2,"outDir":"./","preserveConstEnums":false,"rootDir":"..","strict":true,"target":7},"semanticDiagnosticsPerFile":[[2,[{"pos":10,"end":15,"code":2433,"category":1,"messageKey":"A_namespace_declaration_cannot_be_in_a_different_file_from_a_class_or_function_with_which_it_is_merg_2433"}]]],"latestChangedDtsFile":"./other.d.ts"}
//// [/home/src/workspaces/project/producer/dist/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "../index.ts",
        "../other.ts"
      ],
      "original": [
        2,
        3
      ]
    }
  ],
  "fileNames": [
    "lib.es2020.d.ts",
    "../index.ts",
    "../other.ts"
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
      "fileName": "../index.ts",
      "version": "bc313e9f7e06046b36e33c63099c19fb-namespace Value { export const enum Field { One } }\n",
      "signature": "6220140372d87df4d13eaeb310e98329-declare namespace Value {\n    const enum Field {\n        One = 0\n    }\n}\n",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "bc313e9f7e06046b36e33c63099c19fb-namespace Value { export const enum Field { One } }\n",
        "signature": "6220140372d87df4d13eaeb310e98329-declare namespace Value {\n    const enum Field {\n        One = 0\n    }\n}\n",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "../other.ts",
      "version": "e0ad4879312c3de57b2fb2b729378854-class Value {}\n",
      "signature": "9f36ed7c4e3f51d34eece5b03afd9245-declare class Value {\n}\n",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "e0ad4879312c3de57b2fb2b729378854-class Value {}\n",
        "signature": "9f36ed7c4e3f51d34eece5b03afd9245-declare class Value {\n}\n",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    }
  ],
  "options": {
    "composite": true,
    "emitDeclarationOnly": true,
    "declaration": true,
    "module": 99,
    "moduleResolution": 100,
    "moduleDetection": 2,
    "outDir": "./",
    "preserveConstEnums": false,
    "rootDir": "..",
    "strict": true,
    "target": 7
  },
  "semanticDiagnosticsPerFile": [
    [
      "../index.ts",
      [
        {
          "pos": 10,
          "end": 15,
          "code": 2433,
          "category": 1,
          "messageKey": "A_namespace_declaration_cannot_be_in_a_different_file_from_a_class_or_function_with_which_it_is_merg_2433"
        }
      ]
    ]
  ],
  "latestChangedDtsFile": "./other.d.ts",
  "size": 1799
}

producer/tsconfig.json::
SemanticDiagnostics::
Signatures::


Diff:: Changing preserveConstEnums retains the previous cross-file namespace/class merge diagnostics.
--- nonIncremental.output.txt
+++ incremental.output.txt
@@ -0,0 +1,8 @@
+[96mproducer/index.ts[0m:[93m1[0m:[93m11[0m - [91merror[0m[90m TS2433: [0mA namespace declaration cannot be in a different file from a class or function with which it is merged.
+
+[7m1[0m namespace Value { export const enum Field { One } }
+[7m [0m [91m          ~~~~~[0m
+
+
+Found 1 error in producer/index.ts[90m:1[0m
+

Edit [2]:: no change

tsgo --project producer --listEmittedFiles
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[96mproducer/index.ts[0m:[93m1[0m:[93m11[0m - [91merror[0m[90m TS2433: [0mA namespace declaration cannot be in a different file from a class or function with which it is merged.

[7m1[0m namespace Value { export const enum Field { One } }
[7m [0m [91m          ~~~~~[0m


Found 1 error in producer/index.ts[90m:1[0m


producer/tsconfig.json::
SemanticDiagnostics::
Signatures::


Diff:: Changing preserveConstEnums retains the previous cross-file namespace/class merge diagnostics.
--- nonIncremental.output.txt
+++ incremental.output.txt
@@ -0,0 +1,8 @@
+[96mproducer/index.ts[0m:[93m1[0m:[93m11[0m - [91merror[0m[90m TS2433: [0mA namespace declaration cannot be in a different file from a class or function with which it is merged.
+
+[7m1[0m namespace Value { export const enum Field { One } }
+[7m [0m [91m          ~~~~~[0m
+
+
+Found 1 error in producer/index.ts[90m:1[0m
+

Edit [3]:: force rebuild with the same compiler options

tsgo --build producer --verbose --force
ExitStatus:: Success
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * producer/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'producer/tsconfig.json' is being forcibly rebuilt

[[90mHH:MM:SS AM[0m] Building project 'producer/tsconfig.json'...

//// [/home/src/workspaces/project/producer/dist/index.d.ts] *rewrite with same content*
//// [/home/src/workspaces/project/producer/dist/other.d.ts] *rewrite with same content*
//// [/home/src/workspaces/project/producer/dist/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[[2,3]],"fileNames":["lib.es2020.d.ts","../index.ts","../other.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"bc313e9f7e06046b36e33c63099c19fb-namespace Value { export const enum Field { One } }\n","signature":"6220140372d87df4d13eaeb310e98329-declare namespace Value {\n    const enum Field {\n        One = 0\n    }\n}\n","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"e0ad4879312c3de57b2fb2b729378854-class Value {}\n","signature":"9f36ed7c4e3f51d34eece5b03afd9245-declare class Value {\n}\n","affectsGlobalScope":true,"impliedNodeFormat":1}],"options":{"composite":true,"emitDeclarationOnly":true,"declaration":true,"module":99,"moduleResolution":100,"moduleDetection":2,"outDir":"./","preserveConstEnums":false,"rootDir":"..","strict":true,"target":7},"latestChangedDtsFile":"./other.d.ts"}
//// [/home/src/workspaces/project/producer/dist/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "../index.ts",
        "../other.ts"
      ],
      "original": [
        2,
        3
      ]
    }
  ],
  "fileNames": [
    "lib.es2020.d.ts",
    "../index.ts",
    "../other.ts"
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
      "fileName": "../index.ts",
      "version": "bc313e9f7e06046b36e33c63099c19fb-namespace Value { export const enum Field { One } }\n",
      "signature": "6220140372d87df4d13eaeb310e98329-declare namespace Value {\n    const enum Field {\n        One = 0\n    }\n}\n",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "bc313e9f7e06046b36e33c63099c19fb-namespace Value { export const enum Field { One } }\n",
        "signature": "6220140372d87df4d13eaeb310e98329-declare namespace Value {\n    const enum Field {\n        One = 0\n    }\n}\n",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "../other.ts",
      "version": "e0ad4879312c3de57b2fb2b729378854-class Value {}\n",
      "signature": "9f36ed7c4e3f51d34eece5b03afd9245-declare class Value {\n}\n",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "e0ad4879312c3de57b2fb2b729378854-class Value {}\n",
        "signature": "9f36ed7c4e3f51d34eece5b03afd9245-declare class Value {\n}\n",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    }
  ],
  "options": {
    "composite": true,
    "emitDeclarationOnly": true,
    "declaration": true,
    "module": 99,
    "moduleResolution": 100,
    "moduleDetection": 2,
    "outDir": "./",
    "preserveConstEnums": false,
    "rootDir": "..",
    "strict": true,
    "target": 7
  },
  "latestChangedDtsFile": "./other.d.ts",
  "size": 1596
}

producer/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es2020.d.ts
*refresh*    /home/src/workspaces/project/producer/index.ts
*refresh*    /home/src/workspaces/project/producer/other.ts
Signatures::
(stored at emit) /home/src/workspaces/project/producer/index.ts
(stored at emit) /home/src/workspaces/project/producer/other.ts


Edit [4]:: no change

tsgo --project producer --listEmittedFiles
ExitStatus:: Success
Output::

producer/tsconfig.json::
SemanticDiagnostics::
Signatures::
