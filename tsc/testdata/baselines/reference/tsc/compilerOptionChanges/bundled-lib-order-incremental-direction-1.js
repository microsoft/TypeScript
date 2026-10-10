currentDirectory::/home/src/workspaces/project
useCaseSensitiveFileNames::true
Input::
//// [/home/src/tslibs/TS/Lib/lib.es2015.symbol.d.ts] *new* 
/// <reference no-default-lib="true" />
declare function input(): 'second';

//// [/home/src/tslibs/TS/Lib/lib.es5.d.ts] *new* 
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

//// [/home/src/workspaces/project/producer/index.ts] *new* 
export const result = input();

//// [/home/src/workspaces/project/producer/tsconfig.json] *new* 
{
    "compilerOptions": {
        "composite": true,
        "declaration": true,
        "emitDeclarationOnly": true,
        "lib": [
            "es2015.symbol",
            "es5"
        ],
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
{"version":"FakeTSVersion","root":[3],"fileNames":["lib.es5.d.ts","lib.es2015.symbol.d.ts","../index.ts"],"fileInfos":[{"version":"24a6a79ff734278d9380e94844780011-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };\ndeclare function input(): 'first';\n","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"a6020120d14c7c5fefa5ac3b42037042-/// <reference no-default-lib=\"true\" />\ndeclare function input(): 'second';\n","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"26b427adfeca24f5b62a735e11365618-export const result = input();\n","signature":"d8331a24b0c5de40a3ff21c9ad3ee6ed-export declare const result: \"second\";\n","impliedNodeFormat":1}],"options":{"composite":true,"emitDeclarationOnly":true,"declaration":true,"module":99,"moduleResolution":100,"outDir":"./","rootDir":"..","strict":true,"target":7},"latestChangedDtsFile":"./index.d.ts"}
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
  "fileNames": [
    "lib.es5.d.ts",
    "lib.es2015.symbol.d.ts",
    "../index.ts"
  ],
  "fileInfos": [
    {
      "fileName": "lib.es5.d.ts",
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
      "fileName": "lib.es2015.symbol.d.ts",
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
  "size": 1498
}

producer/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es5.d.ts
*refresh*    /home/src/tslibs/TS/Lib/lib.es2015.symbol.d.ts
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
            "es5",
            "es2015.symbol"
        ],
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
*refresh*    /home/src/tslibs/TS/Lib/lib.es5.d.ts
*refresh*    /home/src/tslibs/TS/Lib/lib.es2015.symbol.d.ts
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
