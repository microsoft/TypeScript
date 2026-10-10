currentDirectory::/home/src/workspaces/project
useCaseSensitiveFileNames::true
Input::
//// [/home/src/workspaces/project/producer/index.ts] *new* 
interface Animal { name: string; }
interface Dog extends Animal { bark(): void; }
declare function infer<T>(a: (value: T) => void, b: (value: T) => void): T;
declare const animal: (value: Animal) => void;
declare const dog: (value: Dog) => void;
export const result = infer(animal, dog);
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
        "strictFunctionTypes": true,
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
interface Animal {
    name: string;
}
interface Dog extends Animal {
    bark(): void;
}
export declare const result: Dog;
export {};

//// [/home/src/workspaces/project/producer/dist/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":[2],"fileNames":["lib.es2020.d.ts","../index.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"13facb7318a788cda4c43947066a625c-interface Animal { name: string; }\ninterface Dog extends Animal { bark(): void; }\ndeclare function infer<T>(a: (value: T) => void, b: (value: T) => void): T;\ndeclare const animal: (value: Animal) => void;\ndeclare const dog: (value: Dog) => void;\nexport const result = infer(animal, dog);","signature":"58143b567605f3d0fa12321118ee48b1-interface Animal {\n    name: string;\n}\ninterface Dog extends Animal {\n    bark(): void;\n}\nexport declare const result: Dog;\nexport {};\n","impliedNodeFormat":1}],"options":{"composite":true,"emitDeclarationOnly":true,"declaration":true,"module":99,"moduleResolution":100,"outDir":"./","rootDir":"..","strict":true,"strictFunctionTypes":true,"target":7},"latestChangedDtsFile":"./index.d.ts"}
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
      "version": "13facb7318a788cda4c43947066a625c-interface Animal { name: string; }\ninterface Dog extends Animal { bark(): void; }\ndeclare function infer<T>(a: (value: T) => void, b: (value: T) => void): T;\ndeclare const animal: (value: Animal) => void;\ndeclare const dog: (value: Dog) => void;\nexport const result = infer(animal, dog);",
      "signature": "58143b567605f3d0fa12321118ee48b1-interface Animal {\n    name: string;\n}\ninterface Dog extends Animal {\n    bark(): void;\n}\nexport declare const result: Dog;\nexport {};\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "13facb7318a788cda4c43947066a625c-interface Animal { name: string; }\ninterface Dog extends Animal { bark(): void; }\ndeclare function infer<T>(a: (value: T) => void, b: (value: T) => void): T;\ndeclare const animal: (value: Animal) => void;\ndeclare const dog: (value: Dog) => void;\nexport const result = infer(animal, dog);",
        "signature": "58143b567605f3d0fa12321118ee48b1-interface Animal {\n    name: string;\n}\ninterface Dog extends Animal {\n    bark(): void;\n}\nexport declare const result: Dog;\nexport {};\n",
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
    "strictFunctionTypes": true,
    "target": 7
  },
  "latestChangedDtsFile": "./index.d.ts",
  "size": 1650
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


Edit [1]:: change strictFunctionTypes without changing source files
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
        "strictFunctionTypes": false,
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
interface Animal {
    name: string;
}
export declare const result: Animal;
export {};

//// [/home/src/workspaces/project/producer/dist/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[2],"fileNames":["lib.es2020.d.ts","../index.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"13facb7318a788cda4c43947066a625c-interface Animal { name: string; }\ninterface Dog extends Animal { bark(): void; }\ndeclare function infer<T>(a: (value: T) => void, b: (value: T) => void): T;\ndeclare const animal: (value: Animal) => void;\ndeclare const dog: (value: Dog) => void;\nexport const result = infer(animal, dog);","signature":"cc8f0d15597161cda5db542420972365-interface Animal {\n    name: string;\n}\nexport declare const result: Animal;\nexport {};\n","impliedNodeFormat":1}],"options":{"composite":true,"emitDeclarationOnly":true,"declaration":true,"module":99,"moduleResolution":100,"outDir":"./","rootDir":"..","strict":true,"strictFunctionTypes":false,"target":7},"latestChangedDtsFile":"./index.d.ts"}
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
      "version": "13facb7318a788cda4c43947066a625c-interface Animal { name: string; }\ninterface Dog extends Animal { bark(): void; }\ndeclare function infer<T>(a: (value: T) => void, b: (value: T) => void): T;\ndeclare const animal: (value: Animal) => void;\ndeclare const dog: (value: Dog) => void;\nexport const result = infer(animal, dog);",
      "signature": "cc8f0d15597161cda5db542420972365-interface Animal {\n    name: string;\n}\nexport declare const result: Animal;\nexport {};\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "13facb7318a788cda4c43947066a625c-interface Animal { name: string; }\ninterface Dog extends Animal { bark(): void; }\ndeclare function infer<T>(a: (value: T) => void, b: (value: T) => void): T;\ndeclare const animal: (value: Animal) => void;\ndeclare const dog: (value: Dog) => void;\nexport const result = infer(animal, dog);",
        "signature": "cc8f0d15597161cda5db542420972365-interface Animal {\n    name: string;\n}\nexport declare const result: Animal;\nexport {};\n",
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
    "strictFunctionTypes": false,
    "target": 7
  },
  "latestChangedDtsFile": "./index.d.ts",
  "size": 1600
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
