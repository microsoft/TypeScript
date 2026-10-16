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
declare const console: { log(msg: any): void; };interface Function { bind(thisArg: any, ...args: any[]): any; }
interface CallableFunction {
    bind<T, A0, A extends any[], R>(this: (this: T, arg: A0, ...args: A) => R, thisArg: T, arg: A0): (...args: A) => R;
}
//// [/home/src/workspaces/project/producer/index.ts] *new* 
declare function input(value: string): number;
export const result = input.bind(null, 'hello');

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
        "strictBindCallApply": true,
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
export declare const result: () => number;

//// [/home/src/workspaces/project/producer/dist/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":[2],"fileNames":["lib.es2020.d.ts","../index.ts"],"fileInfos":[{"version":"232a999ac84a6297b58685837cdd4eda-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };interface Function { bind(thisArg: any, ...args: any[]): any; }\ninterface CallableFunction {\n    bind<T, A0, A extends any[], R>(this: (this: T, arg: A0, ...args: A) => R, thisArg: T, arg: A0): (...args: A) => R;\n}","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"32bb4831b1d4efff69ff4cfce3a163e8-declare function input(value: string): number;\nexport const result = input.bind(null, 'hello');\n","signature":"dd700f0a27833368337e604b37882a82-export declare const result: () => number;\n","impliedNodeFormat":1}],"options":{"composite":true,"emitDeclarationOnly":true,"declaration":true,"module":99,"moduleResolution":100,"outDir":"./","rootDir":"..","strict":true,"strictBindCallApply":true,"target":7},"latestChangedDtsFile":"./index.d.ts"}
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
      "version": "232a999ac84a6297b58685837cdd4eda-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };interface Function { bind(thisArg: any, ...args: any[]): any; }\ninterface CallableFunction {\n    bind<T, A0, A extends any[], R>(this: (this: T, arg: A0, ...args: A) => R, thisArg: T, arg: A0): (...args: A) => R;\n}",
      "signature": "232a999ac84a6297b58685837cdd4eda-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };interface Function { bind(thisArg: any, ...args: any[]): any; }\ninterface CallableFunction {\n    bind<T, A0, A extends any[], R>(this: (this: T, arg: A0, ...args: A) => R, thisArg: T, arg: A0): (...args: A) => R;\n}",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "232a999ac84a6297b58685837cdd4eda-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };interface Function { bind(thisArg: any, ...args: any[]): any; }\ninterface CallableFunction {\n    bind<T, A0, A extends any[], R>(this: (this: T, arg: A0, ...args: A) => R, thisArg: T, arg: A0): (...args: A) => R;\n}",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "../index.ts",
      "version": "32bb4831b1d4efff69ff4cfce3a163e8-declare function input(value: string): number;\nexport const result = input.bind(null, 'hello');\n",
      "signature": "dd700f0a27833368337e604b37882a82-export declare const result: () => number;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "32bb4831b1d4efff69ff4cfce3a163e8-declare function input(value: string): number;\nexport const result = input.bind(null, 'hello');\n",
        "signature": "dd700f0a27833368337e604b37882a82-export declare const result: () => number;\n",
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
    "strictBindCallApply": true,
    "target": 7
  },
  "latestChangedDtsFile": "./index.d.ts",
  "size": 1574
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


Edit [1]:: change strictBindCallApply without changing source files
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
        "strictBindCallApply": false,
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
{"version":"FakeTSVersion","root":[2],"fileNames":["lib.es2020.d.ts","../index.ts"],"fileInfos":[{"version":"232a999ac84a6297b58685837cdd4eda-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };interface Function { bind(thisArg: any, ...args: any[]): any; }\ninterface CallableFunction {\n    bind<T, A0, A extends any[], R>(this: (this: T, arg: A0, ...args: A) => R, thisArg: T, arg: A0): (...args: A) => R;\n}","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"32bb4831b1d4efff69ff4cfce3a163e8-declare function input(value: string): number;\nexport const result = input.bind(null, 'hello');\n","signature":"ade73a776296d5caf71a4247dda83bca-export declare const result: any;\n","impliedNodeFormat":1}],"options":{"composite":true,"emitDeclarationOnly":true,"declaration":true,"module":99,"moduleResolution":100,"outDir":"./","rootDir":"..","strict":true,"strictBindCallApply":false,"target":7},"latestChangedDtsFile":"./index.d.ts"}
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
      "version": "232a999ac84a6297b58685837cdd4eda-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };interface Function { bind(thisArg: any, ...args: any[]): any; }\ninterface CallableFunction {\n    bind<T, A0, A extends any[], R>(this: (this: T, arg: A0, ...args: A) => R, thisArg: T, arg: A0): (...args: A) => R;\n}",
      "signature": "232a999ac84a6297b58685837cdd4eda-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };interface Function { bind(thisArg: any, ...args: any[]): any; }\ninterface CallableFunction {\n    bind<T, A0, A extends any[], R>(this: (this: T, arg: A0, ...args: A) => R, thisArg: T, arg: A0): (...args: A) => R;\n}",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "232a999ac84a6297b58685837cdd4eda-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };interface Function { bind(thisArg: any, ...args: any[]): any; }\ninterface CallableFunction {\n    bind<T, A0, A extends any[], R>(this: (this: T, arg: A0, ...args: A) => R, thisArg: T, arg: A0): (...args: A) => R;\n}",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "../index.ts",
      "version": "32bb4831b1d4efff69ff4cfce3a163e8-declare function input(value: string): number;\nexport const result = input.bind(null, 'hello');\n",
      "signature": "ade73a776296d5caf71a4247dda83bca-export declare const result: any;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "32bb4831b1d4efff69ff4cfce3a163e8-declare function input(value: string): number;\nexport const result = input.bind(null, 'hello');\n",
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
    "strictBindCallApply": false,
    "target": 7
  },
  "latestChangedDtsFile": "./index.d.ts",
  "size": 1566
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
