currentDirectory::/home/src/workspaces/project
useCaseSensitiveFileNames::true
Input::
//// [/home/src/workspaces/project/producer/index.ts] *new* 
export const result = input();

//// [/home/src/workspaces/project/producer/node_modules/@typescript/lib-es2015/package.json] *new* 
{"name":"@typescript/lib-es2015"}
//// [/home/src/workspaces/project/producer/node_modules/@typescript/lib-es2015/symbol.d.ts] *new* 
/// <reference no-default-lib="true" />
declare function input(): 'second';

//// [/home/src/workspaces/project/producer/node_modules/@typescript/lib-es5/index.d.ts] *new* 
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
declare function input(): 'first';

//// [/home/src/workspaces/project/producer/node_modules/@typescript/lib-es5/package.json] *new* 
{"name":"@typescript/lib-es5","types":"index.d.ts"}
//// [/home/src/workspaces/project/producer/tsconfig.json] *new* 
{
    "compilerOptions": {
        "composite": true,
        "declaration": true,
        "emitDeclarationOnly": true,
        "lib": [
            "es5",
            "es2015.symbol"
        ],
        "libReplacement": true,
        "module": "esnext",
        "moduleResolution": "bundler",
        "outDir": "dist",
        "rootDir": ".",
        "strict": true,
        "target": "es2020"
    },
    "files": [
        "index.ts"
    ]
}

tsgo --project producer --listEmittedFiles
ExitStatus:: Success
Output::
TSFILE: /home/src/workspaces/project/producer/dist/index.d.ts
TSFILE: /home/src/workspaces/project/producer/dist/tsconfig.tsbuildinfo
//// [/home/src/workspaces/project/producer/dist/index.d.ts] *new* 
export declare const result: "second";

//// [/home/src/workspaces/project/producer/dist/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":[3],"packageJsons":["../node_modules/@typescript/lib-es2015/package.json","../node_modules/@typescript/lib-es5/package.json"],"missingPackageJsons":["../node_modules/@typescript/lib-es2015/symbol/package.json"],"fileNames":["../node_modules/@typescript/lib-es5/index.d.ts","../node_modules/@typescript/lib-es2015/symbol.d.ts","../index.ts"],"fileInfos":[{"version":"24a6a79ff734278d9380e94844780011-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };\ndeclare function input(): 'first';\n","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"a6020120d14c7c5fefa5ac3b42037042-/// <reference no-default-lib=\"true\" />\ndeclare function input(): 'second';\n","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"26b427adfeca24f5b62a735e11365618-export const result = input();\n","signature":"d8331a24b0c5de40a3ff21c9ad3ee6ed-export declare const result: \"second\";\n","impliedNodeFormat":1}],"options":{"composite":true,"emitDeclarationOnly":true,"declaration":true,"module":99,"moduleResolution":100,"outDir":"./","rootDir":"..","strict":true,"target":7},"latestChangedDtsFile":"./index.d.ts"}
//// [/home/src/workspaces/project/producer/dist/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "../index.ts"
      ],
      "original": 3
    }
  ],
  "packageJsons": [
    "../node_modules/@typescript/lib-es2015/package.json",
    "../node_modules/@typescript/lib-es5/package.json"
  ],
  "missingPackageJsons": [
    "../node_modules/@typescript/lib-es2015/symbol/package.json"
  ],
  "fileNames": [
    "../node_modules/@typescript/lib-es5/index.d.ts",
    "../node_modules/@typescript/lib-es2015/symbol.d.ts",
    "../index.ts"
  ],
  "fileInfos": [
    {
      "fileName": "../node_modules/@typescript/lib-es5/index.d.ts",
      "version": "24a6a79ff734278d9380e94844780011-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };\ndeclare function input(): 'first';\n",
      "signature": "24a6a79ff734278d9380e94844780011-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };\ndeclare function input(): 'first';\n",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "24a6a79ff734278d9380e94844780011-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };\ndeclare function input(): 'first';\n",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "../node_modules/@typescript/lib-es2015/symbol.d.ts",
      "version": "a6020120d14c7c5fefa5ac3b42037042-/// <reference no-default-lib=\"true\" />\ndeclare function input(): 'second';\n",
      "signature": "a6020120d14c7c5fefa5ac3b42037042-/// <reference no-default-lib=\"true\" />\ndeclare function input(): 'second';\n",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "a6020120d14c7c5fefa5ac3b42037042-/// <reference no-default-lib=\"true\" />\ndeclare function input(): 'second';\n",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "../index.ts",
      "version": "26b427adfeca24f5b62a735e11365618-export const result = input();\n",
      "signature": "d8331a24b0c5de40a3ff21c9ad3ee6ed-export declare const result: \"second\";\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "26b427adfeca24f5b62a735e11365618-export const result = input();\n",
        "signature": "d8331a24b0c5de40a3ff21c9ad3ee6ed-export declare const result: \"second\";\n",
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
    "outDir": "./",
    "rootDir": "..",
    "strict": true,
    "target": 7
  },
  "latestChangedDtsFile": "./index.d.ts",
  "size": 1767
}

producer/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/workspaces/project/producer/node_modules/@typescript/lib-es5/index.d.ts
*refresh*    /home/src/workspaces/project/producer/node_modules/@typescript/lib-es2015/symbol.d.ts
*refresh*    /home/src/workspaces/project/producer/index.ts
Signatures::
(stored at emit) /home/src/workspaces/project/producer/index.ts


Edit [0]:: no change

tsgo --project producer --listEmittedFiles
ExitStatus:: Success
Output::

producer/tsconfig.json::
SemanticDiagnostics::
Signatures::


Edit [1]:: change lib without changing source files
//// [/home/src/workspaces/project/producer/tsconfig.json] *modified* 
{
    "compilerOptions": {
        "composite": true,
        "declaration": true,
        "emitDeclarationOnly": true,
        "lib": [
            "es2015.symbol",
            "es5"
        ],
        "libReplacement": true,
        "module": "esnext",
        "moduleResolution": "bundler",
        "outDir": "dist",
        "rootDir": ".",
        "strict": true,
        "target": "es2020"
    },
    "files": [
        "index.ts"
    ]
}

tsgo --project producer --listEmittedFiles
ExitStatus:: Success
Output::

producer/tsconfig.json::
SemanticDiagnostics::
Signatures::


Diff:: Reordering lib changes overload selection without changing the file set, leaving the inferred declaration stale.
--- nonIncremental /home/src/workspaces/project/producer/dist/index.d.ts
+++ incremental /home/src/workspaces/project/producer/dist/index.d.ts
@@ -1,1 +1,1 @@
-export declare const result: "first";
+export declare const result: "second";


Edit [2]:: no change

tsgo --project producer --listEmittedFiles
ExitStatus:: Success
Output::

producer/tsconfig.json::
SemanticDiagnostics::
Signatures::


Diff:: Reordering lib changes overload selection without changing the file set, leaving the inferred declaration stale.
--- nonIncremental /home/src/workspaces/project/producer/dist/index.d.ts
+++ incremental /home/src/workspaces/project/producer/dist/index.d.ts
@@ -1,1 +1,1 @@
-export declare const result: "first";
+export declare const result: "second";


Edit [3]:: force rebuild with the same compiler options

tsgo --build producer --verbose --force
ExitStatus:: Success
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * producer/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'producer/tsconfig.json' is being forcibly rebuilt

[[90mHH:MM:SS AM[0m] Building project 'producer/tsconfig.json'...

//// [/home/src/workspaces/project/producer/dist/index.d.ts] *modified* 
export declare const result: "first";

//// [/home/src/workspaces/project/producer/dist/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[3],"packageJsons":["../node_modules/@typescript/lib-es2015/package.json","../node_modules/@typescript/lib-es5/package.json"],"missingPackageJsons":["../node_modules/@typescript/lib-es2015/symbol/package.json"],"fileNames":["../node_modules/@typescript/lib-es2015/symbol.d.ts","../node_modules/@typescript/lib-es5/index.d.ts","../index.ts"],"fileInfos":[{"version":"a6020120d14c7c5fefa5ac3b42037042-/// <reference no-default-lib=\"true\" />\ndeclare function input(): 'second';\n","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"24a6a79ff734278d9380e94844780011-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };\ndeclare function input(): 'first';\n","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"26b427adfeca24f5b62a735e11365618-export const result = input();\n","signature":"5a64247cbccb0d8fcd870d0ee9b7c167-export declare const result: \"first\";\n","impliedNodeFormat":1}],"options":{"composite":true,"emitDeclarationOnly":true,"declaration":true,"module":99,"moduleResolution":100,"outDir":"./","rootDir":"..","strict":true,"target":7},"latestChangedDtsFile":"./index.d.ts"}
//// [/home/src/workspaces/project/producer/dist/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "../index.ts"
      ],
      "original": 3
    }
  ],
  "packageJsons": [
    "../node_modules/@typescript/lib-es2015/package.json",
    "../node_modules/@typescript/lib-es5/package.json"
  ],
  "missingPackageJsons": [
    "../node_modules/@typescript/lib-es2015/symbol/package.json"
  ],
  "fileNames": [
    "../node_modules/@typescript/lib-es2015/symbol.d.ts",
    "../node_modules/@typescript/lib-es5/index.d.ts",
    "../index.ts"
  ],
  "fileInfos": [
    {
      "fileName": "../node_modules/@typescript/lib-es2015/symbol.d.ts",
      "version": "a6020120d14c7c5fefa5ac3b42037042-/// <reference no-default-lib=\"true\" />\ndeclare function input(): 'second';\n",
      "signature": "a6020120d14c7c5fefa5ac3b42037042-/// <reference no-default-lib=\"true\" />\ndeclare function input(): 'second';\n",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "a6020120d14c7c5fefa5ac3b42037042-/// <reference no-default-lib=\"true\" />\ndeclare function input(): 'second';\n",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "../node_modules/@typescript/lib-es5/index.d.ts",
      "version": "24a6a79ff734278d9380e94844780011-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };\ndeclare function input(): 'first';\n",
      "signature": "24a6a79ff734278d9380e94844780011-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };\ndeclare function input(): 'first';\n",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "24a6a79ff734278d9380e94844780011-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };\ndeclare function input(): 'first';\n",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "../index.ts",
      "version": "26b427adfeca24f5b62a735e11365618-export const result = input();\n",
      "signature": "5a64247cbccb0d8fcd870d0ee9b7c167-export declare const result: \"first\";\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "26b427adfeca24f5b62a735e11365618-export const result = input();\n",
        "signature": "5a64247cbccb0d8fcd870d0ee9b7c167-export declare const result: \"first\";\n",
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
    "outDir": "./",
    "rootDir": "..",
    "strict": true,
    "target": 7
  },
  "latestChangedDtsFile": "./index.d.ts",
  "size": 1766
}

producer/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/workspaces/project/producer/node_modules/@typescript/lib-es2015/symbol.d.ts
*refresh*    /home/src/workspaces/project/producer/node_modules/@typescript/lib-es5/index.d.ts
*refresh*    /home/src/workspaces/project/producer/index.ts
Signatures::
(stored at emit) /home/src/workspaces/project/producer/index.ts


Edit [4]:: no change

tsgo --project producer --listEmittedFiles
ExitStatus:: Success
Output::

producer/tsconfig.json::
SemanticDiagnostics::
Signatures::
