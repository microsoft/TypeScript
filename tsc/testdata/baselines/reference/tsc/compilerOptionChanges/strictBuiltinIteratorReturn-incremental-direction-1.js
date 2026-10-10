currentDirectory::/home/src/workspaces/project
useCaseSensitiveFileNames::true
Input::
//// [/home/src/tslibs/TS/Lib/lib.es2020.d.ts] *new* 
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
declare const console: { log(msg: any): void; };type BuiltinIteratorReturn = intrinsic;
interface Set<T> {
    values(): { next(): { value: T; done?: false } | { value: BuiltinIteratorReturn; done: true } };
}
declare const Set: { new<T>(): Set<T> };
//// [/home/src/workspaces/project/producer/index.ts] *new* 
export const result = new Set<string>().values().next().value;

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
        "moduleResolution": "bundler",
        "outDir": "dist",
        "rootDir": ".",
        "strict": true,
        "strictBuiltinIteratorReturn": true,
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
export declare const result: string | undefined;

//// [/home/src/workspaces/project/producer/dist/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":[2],"fileNames":["lib.es2020.d.ts","../index.ts"],"fileInfos":[{"version":"fbc656977d10ce0d133c6b3428dd0ec6-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };type BuiltinIteratorReturn = intrinsic;\ninterface Set<T> {\n    values(): { next(): { value: T; done?: false } | { value: BuiltinIteratorReturn; done: true } };\n}\ndeclare const Set: { new<T>(): Set<T> };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"5101d84f9ace10747f4ede9ff5732389-export const result = new Set<string>().values().next().value;\n","signature":"233fb08c56c1b5c6a94a087c9b369d38-export declare const result: string | undefined;\n","impliedNodeFormat":1}],"options":{"composite":true,"emitDeclarationOnly":true,"declaration":true,"module":99,"moduleResolution":100,"outDir":"./","rootDir":"..","strict":true,"strictBuiltinIteratorReturn":true,"target":7},"latestChangedDtsFile":"./index.d.ts"}
//// [/home/src/workspaces/project/producer/dist/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "../index.ts"
      ],
      "original": 2
    }
  ],
  "fileNames": [
    "lib.es2020.d.ts",
    "../index.ts"
  ],
  "fileInfos": [
    {
      "fileName": "lib.es2020.d.ts",
      "version": "fbc656977d10ce0d133c6b3428dd0ec6-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };type BuiltinIteratorReturn = intrinsic;\ninterface Set<T> {\n    values(): { next(): { value: T; done?: false } | { value: BuiltinIteratorReturn; done: true } };\n}\ndeclare const Set: { new<T>(): Set<T> };",
      "signature": "fbc656977d10ce0d133c6b3428dd0ec6-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };type BuiltinIteratorReturn = intrinsic;\ninterface Set<T> {\n    values(): { next(): { value: T; done?: false } | { value: BuiltinIteratorReturn; done: true } };\n}\ndeclare const Set: { new<T>(): Set<T> };",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "fbc656977d10ce0d133c6b3428dd0ec6-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };type BuiltinIteratorReturn = intrinsic;\ninterface Set<T> {\n    values(): { next(): { value: T; done?: false } | { value: BuiltinIteratorReturn; done: true } };\n}\ndeclare const Set: { new<T>(): Set<T> };",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "../index.ts",
      "version": "5101d84f9ace10747f4ede9ff5732389-export const result = new Set<string>().values().next().value;\n",
      "signature": "233fb08c56c1b5c6a94a087c9b369d38-export declare const result: string | undefined;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "5101d84f9ace10747f4ede9ff5732389-export const result = new Set<string>().values().next().value;\n",
        "signature": "233fb08c56c1b5c6a94a087c9b369d38-export declare const result: string | undefined;\n",
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
    "strictBuiltinIteratorReturn": true,
    "target": 7
  },
  "latestChangedDtsFile": "./index.d.ts",
  "size": 1543
}

producer/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es2020.d.ts
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


Edit [1]:: change strictBuiltinIteratorReturn without changing source files
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
        "moduleResolution": "bundler",
        "outDir": "dist",
        "rootDir": ".",
        "strict": true,
        "strictBuiltinIteratorReturn": false,
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
//// [/home/src/workspaces/project/producer/dist/index.d.ts] *modified* 
export declare const result: any;

//// [/home/src/workspaces/project/producer/dist/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[2],"fileNames":["lib.es2020.d.ts","../index.ts"],"fileInfos":[{"version":"fbc656977d10ce0d133c6b3428dd0ec6-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };type BuiltinIteratorReturn = intrinsic;\ninterface Set<T> {\n    values(): { next(): { value: T; done?: false } | { value: BuiltinIteratorReturn; done: true } };\n}\ndeclare const Set: { new<T>(): Set<T> };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"5101d84f9ace10747f4ede9ff5732389-export const result = new Set<string>().values().next().value;\n","signature":"ade73a776296d5caf71a4247dda83bca-export declare const result: any;\n","impliedNodeFormat":1}],"options":{"composite":true,"emitDeclarationOnly":true,"declaration":true,"module":99,"moduleResolution":100,"outDir":"./","rootDir":"..","strict":true,"strictBuiltinIteratorReturn":false,"target":7},"latestChangedDtsFile":"./index.d.ts"}
//// [/home/src/workspaces/project/producer/dist/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "../index.ts"
      ],
      "original": 2
    }
  ],
  "fileNames": [
    "lib.es2020.d.ts",
    "../index.ts"
  ],
  "fileInfos": [
    {
      "fileName": "lib.es2020.d.ts",
      "version": "fbc656977d10ce0d133c6b3428dd0ec6-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };type BuiltinIteratorReturn = intrinsic;\ninterface Set<T> {\n    values(): { next(): { value: T; done?: false } | { value: BuiltinIteratorReturn; done: true } };\n}\ndeclare const Set: { new<T>(): Set<T> };",
      "signature": "fbc656977d10ce0d133c6b3428dd0ec6-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };type BuiltinIteratorReturn = intrinsic;\ninterface Set<T> {\n    values(): { next(): { value: T; done?: false } | { value: BuiltinIteratorReturn; done: true } };\n}\ndeclare const Set: { new<T>(): Set<T> };",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "fbc656977d10ce0d133c6b3428dd0ec6-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };type BuiltinIteratorReturn = intrinsic;\ninterface Set<T> {\n    values(): { next(): { value: T; done?: false } | { value: BuiltinIteratorReturn; done: true } };\n}\ndeclare const Set: { new<T>(): Set<T> };",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "../index.ts",
      "version": "5101d84f9ace10747f4ede9ff5732389-export const result = new Set<string>().values().next().value;\n",
      "signature": "ade73a776296d5caf71a4247dda83bca-export declare const result: any;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "5101d84f9ace10747f4ede9ff5732389-export const result = new Set<string>().values().next().value;\n",
        "signature": "ade73a776296d5caf71a4247dda83bca-export declare const result: any;\n",
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
    "strictBuiltinIteratorReturn": false,
    "target": 7
  },
  "latestChangedDtsFile": "./index.d.ts",
  "size": 1529
}

producer/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es2020.d.ts
*refresh*    /home/src/workspaces/project/producer/index.ts
Signatures::
(stored at emit) /home/src/workspaces/project/producer/index.ts


Edit [2]:: no change

tsgo --project producer --listEmittedFiles
ExitStatus:: Success
Output::

producer/tsconfig.json::
SemanticDiagnostics::
Signatures::


Edit [3]:: force rebuild with the same compiler options

tsgo --build producer --verbose --force
ExitStatus:: Success
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * producer/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'producer/tsconfig.json' is being forcibly rebuilt

[[90mHH:MM:SS AM[0m] Building project 'producer/tsconfig.json'...

//// [/home/src/workspaces/project/producer/dist/index.d.ts] *rewrite with same content*
//// [/home/src/workspaces/project/producer/dist/tsconfig.tsbuildinfo] *rewrite with same content*
//// [/home/src/workspaces/project/producer/dist/tsconfig.tsbuildinfo.readable.baseline.txt] *rewrite with same content*

producer/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es2020.d.ts
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
