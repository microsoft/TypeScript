currentDirectory::/home/src/workspaces/project
useCaseSensitiveFileNames::true
Input::
//// [/home/src/workspaces/project/producer/index.ts] *new* 
export const result = input();

//// [/home/src/workspaces/project/producer/node_modules/@types/first/index.d.ts] *new* 
declare function input(): 'first';

//// [/home/src/workspaces/project/producer/node_modules/@types/second/index.d.ts] *new* 
declare function input(): 'second';

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
        "target": "es2020",
        "types": [
            "second",
            "first"
        ]
    },
    "files": [
        "index.ts"
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
export declare const result: "first";

//// [/home/src/workspaces/project/producer/dist/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":[2],"missingPackageJsons":["../node_modules/@types/first/package.json","../node_modules/@types/package.json","../node_modules/@types/second/package.json","../node_modules/package.json"],"fileNames":["lib.es2020.d.ts","../index.ts","../node_modules/@types/second/index.d.ts","../node_modules/@types/first/index.d.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"26b427adfeca24f5b62a735e11365618-export const result = input();\n","signature":"5a64247cbccb0d8fcd870d0ee9b7c167-export declare const result: \"first\";\n","impliedNodeFormat":1},{"version":"7310e40b4471d53101cf3f1181033c10-declare function input(): 'second';\n","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"de71218713951cfb72b34e51c1c9c2bd-declare function input(): 'first';\n","affectsGlobalScope":true,"impliedNodeFormat":1}],"options":{"composite":true,"emitDeclarationOnly":true,"declaration":true,"module":99,"moduleResolution":100,"outDir":"./","rootDir":"..","strict":true,"target":7,"types":["second","first"]},"latestChangedDtsFile":"./index.d.ts"}
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
  "missingPackageJsons": [
    "../node_modules/@types/first/package.json",
    "../node_modules/@types/package.json",
    "../node_modules/@types/second/package.json",
    "../node_modules/package.json"
  ],
  "fileNames": [
    "lib.es2020.d.ts",
    "../index.ts",
    "../node_modules/@types/second/index.d.ts",
    "../node_modules/@types/first/index.d.ts"
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
      "version": "26b427adfeca24f5b62a735e11365618-export const result = input();\n",
      "signature": "5a64247cbccb0d8fcd870d0ee9b7c167-export declare const result: \"first\";\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "26b427adfeca24f5b62a735e11365618-export const result = input();\n",
        "signature": "5a64247cbccb0d8fcd870d0ee9b7c167-export declare const result: \"first\";\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "../node_modules/@types/second/index.d.ts",
      "version": "7310e40b4471d53101cf3f1181033c10-declare function input(): 'second';\n",
      "signature": "7310e40b4471d53101cf3f1181033c10-declare function input(): 'second';\n",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "7310e40b4471d53101cf3f1181033c10-declare function input(): 'second';\n",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "../node_modules/@types/first/index.d.ts",
      "version": "de71218713951cfb72b34e51c1c9c2bd-declare function input(): 'first';\n",
      "signature": "de71218713951cfb72b34e51c1c9c2bd-declare function input(): 'first';\n",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "de71218713951cfb72b34e51c1c9c2bd-declare function input(): 'first';\n",
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
    "outDir": "./",
    "rootDir": "..",
    "strict": true,
    "target": 7,
    "types": [
      "second",
      "first"
    ]
  },
  "latestChangedDtsFile": "./index.d.ts",
  "size": 1820
}

producer/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es2020.d.ts
*refresh*    /home/src/workspaces/project/producer/index.ts
*refresh*    /home/src/workspaces/project/producer/node_modules/@types/second/index.d.ts
*refresh*    /home/src/workspaces/project/producer/node_modules/@types/first/index.d.ts
Signatures::
(stored at emit) /home/src/workspaces/project/producer/index.ts


Edit [0]:: no change

tsgo --build producer --verbose
ExitStatus:: Success
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * producer/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'producer/tsconfig.json' is up to date because newest input 'producer/index.ts' is older than output 'producer/dist/tsconfig.tsbuildinfo'




Edit [1]:: change types without changing source files
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
        "target": "es2020",
        "types": [
            "first",
            "second"
        ]
    },
    "files": [
        "index.ts"
    ]
}

tsgo --build producer --verbose
ExitStatus:: Success
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * producer/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'producer/tsconfig.json' is out of date because output 'producer/dist/tsconfig.tsbuildinfo' is older than input 'producer/tsconfig.json'

[[90mHH:MM:SS AM[0m] Building project 'producer/tsconfig.json'...

//// [/home/src/workspaces/project/producer/dist/index.d.ts] *modified* 
export declare const result: "second";

//// [/home/src/workspaces/project/producer/dist/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[2],"missingPackageJsons":["../node_modules/@types/first/package.json","../node_modules/@types/package.json","../node_modules/@types/second/package.json","../node_modules/package.json"],"fileNames":["lib.es2020.d.ts","../index.ts","../node_modules/@types/first/index.d.ts","../node_modules/@types/second/index.d.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"26b427adfeca24f5b62a735e11365618-export const result = input();\n","signature":"d8331a24b0c5de40a3ff21c9ad3ee6ed-export declare const result: \"second\";\n","impliedNodeFormat":1},{"version":"de71218713951cfb72b34e51c1c9c2bd-declare function input(): 'first';\n","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"7310e40b4471d53101cf3f1181033c10-declare function input(): 'second';\n","affectsGlobalScope":true,"impliedNodeFormat":1}],"options":{"composite":true,"emitDeclarationOnly":true,"declaration":true,"module":99,"moduleResolution":100,"outDir":"./","rootDir":"..","strict":true,"target":7,"types":["first","second"]},"latestChangedDtsFile":"./index.d.ts"}
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
  "missingPackageJsons": [
    "../node_modules/@types/first/package.json",
    "../node_modules/@types/package.json",
    "../node_modules/@types/second/package.json",
    "../node_modules/package.json"
  ],
  "fileNames": [
    "lib.es2020.d.ts",
    "../index.ts",
    "../node_modules/@types/first/index.d.ts",
    "../node_modules/@types/second/index.d.ts"
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
      "version": "26b427adfeca24f5b62a735e11365618-export const result = input();\n",
      "signature": "d8331a24b0c5de40a3ff21c9ad3ee6ed-export declare const result: \"second\";\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "26b427adfeca24f5b62a735e11365618-export const result = input();\n",
        "signature": "d8331a24b0c5de40a3ff21c9ad3ee6ed-export declare const result: \"second\";\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "../node_modules/@types/first/index.d.ts",
      "version": "de71218713951cfb72b34e51c1c9c2bd-declare function input(): 'first';\n",
      "signature": "de71218713951cfb72b34e51c1c9c2bd-declare function input(): 'first';\n",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "de71218713951cfb72b34e51c1c9c2bd-declare function input(): 'first';\n",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "../node_modules/@types/second/index.d.ts",
      "version": "7310e40b4471d53101cf3f1181033c10-declare function input(): 'second';\n",
      "signature": "7310e40b4471d53101cf3f1181033c10-declare function input(): 'second';\n",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "7310e40b4471d53101cf3f1181033c10-declare function input(): 'second';\n",
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
    "outDir": "./",
    "rootDir": "..",
    "strict": true,
    "target": 7,
    "types": [
      "first",
      "second"
    ]
  },
  "latestChangedDtsFile": "./index.d.ts",
  "size": 1821
}

producer/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es2020.d.ts
*refresh*    /home/src/workspaces/project/producer/index.ts
*refresh*    /home/src/workspaces/project/producer/node_modules/@types/first/index.d.ts
*refresh*    /home/src/workspaces/project/producer/node_modules/@types/second/index.d.ts
Signatures::
(stored at emit) /home/src/workspaces/project/producer/index.ts


Edit [2]:: no change

tsgo --build producer --verbose
ExitStatus:: Success
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * producer/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'producer/tsconfig.json' is up to date because newest input 'producer/index.ts' is older than output 'producer/dist/tsconfig.tsbuildinfo'




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
*refresh*    /home/src/workspaces/project/producer/node_modules/@types/first/index.d.ts
*refresh*    /home/src/workspaces/project/producer/node_modules/@types/second/index.d.ts
Signatures::
(stored at emit) /home/src/workspaces/project/producer/index.ts


Edit [4]:: no change

tsgo --build producer --verbose
ExitStatus:: Success
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * producer/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'producer/tsconfig.json' is up to date because newest input 'producer/index.ts' is older than output 'producer/dist/tsconfig.tsbuildinfo'


