currentDirectory::/home/src/workspaces/project
useCaseSensitiveFileNames::true
Input::
//// [/home/src/workspaces/project/src/a.ts] *new* 
export class B { prop = "hello"; }

export interface A {
    b: B;
}
//// [/home/src/workspaces/project/src/b.ts] *new* 
import { C } from "./c";

export interface B {
    b: C;
}
//// [/home/src/workspaces/project/src/c.ts] *new* 
import { A } from "./a";

export interface C {
    a: A;
}
//// [/home/src/workspaces/project/tsconfig.json] *new* 
{
    "compilerOptions": {
        "incremental": true,
        "target": "es5",
        "module": "commonjs",
        "declaration": true,
        "declarationMap": true,
        "sourceMap": true,
        "outDir": "./lib",
        "composite": true,
        "strict": true,
        "esModuleInterop": true,
        "alwaysStrict": true,
        "rootDir": "src",
        "emitDeclarationOnly": true,
    },
}

tsgo --b --verbose
ExitStatus:: Success
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because output file 'tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project 'tsconfig.json'...

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
//// [/home/src/workspaces/project/lib/a.d.ts] *new* 
export declare class B {
    prop: string;
}
export interface A {
    b: B;
}
//# sourceMappingURL=a.d.ts.map
//// [/home/src/workspaces/project/lib/a.d.ts.map] *new* 
{"version":3,"file":"a.d.ts","sourceRoot":"","sources":["../src/a.ts"],"names":[],"mappings":"AAAA,qBAAa,CAAC;IAAG,IAAI,SAAW;CAAE;AAElC,MAAM,WAAW,CAAC;IACd,CAAC,EAAE,CAAC,CAAC;CACR"}
//// [/home/src/workspaces/project/lib/b.d.ts] *new* 
import { C } from "./c";
export interface B {
    b: C;
}
//# sourceMappingURL=b.d.ts.map
//// [/home/src/workspaces/project/lib/b.d.ts.map] *new* 
{"version":3,"file":"b.d.ts","sourceRoot":"","sources":["../src/b.ts"],"names":[],"mappings":"AAAA,OAAO,EAAE,CAAC,EAAE,MAAM,KAAK,CAAC;AAExB,MAAM,WAAW,CAAC;IACd,CAAC,EAAE,CAAC,CAAC;CACR"}
//// [/home/src/workspaces/project/lib/c.d.ts] *new* 
import { A } from "./a";
export interface C {
    a: A;
}
//# sourceMappingURL=c.d.ts.map
//// [/home/src/workspaces/project/lib/c.d.ts.map] *new* 
{"version":3,"file":"c.d.ts","sourceRoot":"","sources":["../src/c.ts"],"names":[],"mappings":"AAAA,OAAO,EAAE,CAAC,EAAE,MAAM,KAAK,CAAC;AAExB,MAAM,WAAW,CAAC;IACd,CAAC,EAAE,CAAC,CAAC;CACR"}
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":[[2,4]],"fileNames":["lib.d.ts","./src/a.ts","./src/c.ts","./src/b.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"665f99944701507453d40566cb1ae14c-export class B { prop = \"hello\"; }\n\nexport interface A {\n    b: B;\n}","signature":"99c00a9e07d33f360f88c1625460e5f4-export declare class B {\n    prop: string;\n}\nexport interface A {\n    b: B;\n}\n","impliedNodeFormat":1},{"version":"e8d66a87a10151e3d8c84e04e3d962c9-import { A } from \"./a\";\n\nexport interface C {\n    a: A;\n}","signature":"57c1fb7dd5816e999a47a54abfd60004-import { A } from \"./a\";\nexport interface C {\n    a: A;\n}\n","impliedNodeFormat":1},{"version":"635cd13fa5127837a0f61aa9d436e764-import { C } from \"./c\";\n\nexport interface B {\n    b: C;\n}","signature":"2c6af9ce6f102ba192048b07d4b44ebf-import { C } from \"./c\";\nexport interface B {\n    b: C;\n}\n","impliedNodeFormat":1}],"fileIdsList":[[3],[2]],"options":{"alwaysStrict":true,"composite":true,"emitDeclarationOnly":true,"declaration":true,"declarationMap":true,"esModuleInterop":true,"module":1,"outDir":"./lib","rootDir":"./src","strict":true,"sourceMap":true,"target":1},"referencedMap":[[4,1],[3,2]],"latestChangedDtsFile":"./lib/b.d.ts"}
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./src/a.ts",
        "./src/c.ts",
        "./src/b.ts"
      ],
      "original": [
        2,
        4
      ]
    }
  ],
  "fileNames": [
    "lib.d.ts",
    "./src/a.ts",
    "./src/c.ts",
    "./src/b.ts"
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
      "fileName": "./src/a.ts",
      "version": "665f99944701507453d40566cb1ae14c-export class B { prop = \"hello\"; }\n\nexport interface A {\n    b: B;\n}",
      "signature": "99c00a9e07d33f360f88c1625460e5f4-export declare class B {\n    prop: string;\n}\nexport interface A {\n    b: B;\n}\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "665f99944701507453d40566cb1ae14c-export class B { prop = \"hello\"; }\n\nexport interface A {\n    b: B;\n}",
        "signature": "99c00a9e07d33f360f88c1625460e5f4-export declare class B {\n    prop: string;\n}\nexport interface A {\n    b: B;\n}\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./src/c.ts",
      "version": "e8d66a87a10151e3d8c84e04e3d962c9-import { A } from \"./a\";\n\nexport interface C {\n    a: A;\n}",
      "signature": "57c1fb7dd5816e999a47a54abfd60004-import { A } from \"./a\";\nexport interface C {\n    a: A;\n}\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "e8d66a87a10151e3d8c84e04e3d962c9-import { A } from \"./a\";\n\nexport interface C {\n    a: A;\n}",
        "signature": "57c1fb7dd5816e999a47a54abfd60004-import { A } from \"./a\";\nexport interface C {\n    a: A;\n}\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./src/b.ts",
      "version": "635cd13fa5127837a0f61aa9d436e764-import { C } from \"./c\";\n\nexport interface B {\n    b: C;\n}",
      "signature": "2c6af9ce6f102ba192048b07d4b44ebf-import { C } from \"./c\";\nexport interface B {\n    b: C;\n}\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "635cd13fa5127837a0f61aa9d436e764-import { C } from \"./c\";\n\nexport interface B {\n    b: C;\n}",
        "signature": "2c6af9ce6f102ba192048b07d4b44ebf-import { C } from \"./c\";\nexport interface B {\n    b: C;\n}\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "fileIdsList": [
    [
      "./src/c.ts"
    ],
    [
      "./src/a.ts"
    ]
  ],
  "options": {
    "alwaysStrict": true,
    "composite": true,
    "emitDeclarationOnly": true,
    "declaration": true,
    "declarationMap": true,
    "esModuleInterop": true,
    "module": 1,
    "outDir": "./lib",
    "rootDir": "./src",
    "strict": true,
    "sourceMap": true,
    "target": 1
  },
  "referencedMap": {
    "./src/b.ts": [
      "./src/c.ts"
    ],
    "./src/c.ts": [
      "./src/a.ts"
    ]
  },
  "latestChangedDtsFile": "./lib/b.d.ts",
  "size": 1978
}

tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.d.ts
*refresh*    /home/src/workspaces/project/src/a.ts
*refresh*    /home/src/workspaces/project/src/c.ts
*refresh*    /home/src/workspaces/project/src/b.ts
Signatures::
(stored at emit) /home/src/workspaces/project/src/a.ts
(stored at emit) /home/src/workspaces/project/src/c.ts
(stored at emit) /home/src/workspaces/project/src/b.ts


Edit [0]:: incremental-declaration-doesnt-change
//// [/home/src/workspaces/project/src/a.ts] *modified* 
export class B { prop = "hello"; }

class C { }
export interface A {
    b: B;
}

tsgo --b --verbose
ExitStatus:: Success
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because output 'tsconfig.tsbuildinfo' is older than input 'src/a.ts'

[[90mHH:MM:SS AM[0m] Building project 'tsconfig.json'...

//// [/home/src/workspaces/project/lib/a.d.ts.map] *modified* 
{"version":3,"file":"a.d.ts","sourceRoot":"","sources":["../src/a.ts"],"names":[],"mappings":"AAAA,qBAAa,CAAC;IAAG,IAAI,SAAW;CAAE;AAGlC,MAAM,WAAW,CAAC;IACd,CAAC,EAAE,CAAC,CAAC;CACR"}
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[[2,4]],"fileNames":["lib.d.ts","./src/a.ts","./src/c.ts","./src/b.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"d6b87c1d5c5dc8a828f29d0ccdf50a96-export class B { prop = \"hello\"; }\n\nclass C { }\nexport interface A {\n    b: B;\n}","signature":"99c00a9e07d33f360f88c1625460e5f4-export declare class B {\n    prop: string;\n}\nexport interface A {\n    b: B;\n}\n","impliedNodeFormat":1},{"version":"e8d66a87a10151e3d8c84e04e3d962c9-import { A } from \"./a\";\n\nexport interface C {\n    a: A;\n}","signature":"57c1fb7dd5816e999a47a54abfd60004-import { A } from \"./a\";\nexport interface C {\n    a: A;\n}\n","impliedNodeFormat":1},{"version":"635cd13fa5127837a0f61aa9d436e764-import { C } from \"./c\";\n\nexport interface B {\n    b: C;\n}","signature":"2c6af9ce6f102ba192048b07d4b44ebf-import { C } from \"./c\";\nexport interface B {\n    b: C;\n}\n","impliedNodeFormat":1}],"fileIdsList":[[3],[2]],"options":{"alwaysStrict":true,"composite":true,"emitDeclarationOnly":true,"declaration":true,"declarationMap":true,"esModuleInterop":true,"module":1,"outDir":"./lib","rootDir":"./src","strict":true,"sourceMap":true,"target":1},"referencedMap":[[4,1],[3,2]],"latestChangedDtsFile":"./lib/b.d.ts"}
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./src/a.ts",
        "./src/c.ts",
        "./src/b.ts"
      ],
      "original": [
        2,
        4
      ]
    }
  ],
  "fileNames": [
    "lib.d.ts",
    "./src/a.ts",
    "./src/c.ts",
    "./src/b.ts"
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
      "fileName": "./src/a.ts",
      "version": "d6b87c1d5c5dc8a828f29d0ccdf50a96-export class B { prop = \"hello\"; }\n\nclass C { }\nexport interface A {\n    b: B;\n}",
      "signature": "99c00a9e07d33f360f88c1625460e5f4-export declare class B {\n    prop: string;\n}\nexport interface A {\n    b: B;\n}\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "d6b87c1d5c5dc8a828f29d0ccdf50a96-export class B { prop = \"hello\"; }\n\nclass C { }\nexport interface A {\n    b: B;\n}",
        "signature": "99c00a9e07d33f360f88c1625460e5f4-export declare class B {\n    prop: string;\n}\nexport interface A {\n    b: B;\n}\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./src/c.ts",
      "version": "e8d66a87a10151e3d8c84e04e3d962c9-import { A } from \"./a\";\n\nexport interface C {\n    a: A;\n}",
      "signature": "57c1fb7dd5816e999a47a54abfd60004-import { A } from \"./a\";\nexport interface C {\n    a: A;\n}\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "e8d66a87a10151e3d8c84e04e3d962c9-import { A } from \"./a\";\n\nexport interface C {\n    a: A;\n}",
        "signature": "57c1fb7dd5816e999a47a54abfd60004-import { A } from \"./a\";\nexport interface C {\n    a: A;\n}\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./src/b.ts",
      "version": "635cd13fa5127837a0f61aa9d436e764-import { C } from \"./c\";\n\nexport interface B {\n    b: C;\n}",
      "signature": "2c6af9ce6f102ba192048b07d4b44ebf-import { C } from \"./c\";\nexport interface B {\n    b: C;\n}\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "635cd13fa5127837a0f61aa9d436e764-import { C } from \"./c\";\n\nexport interface B {\n    b: C;\n}",
        "signature": "2c6af9ce6f102ba192048b07d4b44ebf-import { C } from \"./c\";\nexport interface B {\n    b: C;\n}\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "fileIdsList": [
    [
      "./src/c.ts"
    ],
    [
      "./src/a.ts"
    ]
  ],
  "options": {
    "alwaysStrict": true,
    "composite": true,
    "emitDeclarationOnly": true,
    "declaration": true,
    "declarationMap": true,
    "esModuleInterop": true,
    "module": 1,
    "outDir": "./lib",
    "rootDir": "./src",
    "strict": true,
    "sourceMap": true,
    "target": 1
  },
  "referencedMap": {
    "./src/b.ts": [
      "./src/c.ts"
    ],
    "./src/c.ts": [
      "./src/a.ts"
    ]
  },
  "latestChangedDtsFile": "./lib/b.d.ts",
  "size": 1991
}

tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/workspaces/project/src/a.ts
Signatures::
(computed .d.ts) /home/src/workspaces/project/src/a.ts


Edit [1]:: incremental-declaration-changes
//// [/home/src/workspaces/project/src/a.ts] *modified* 
export class B { prop = "hello"; }

class C { }
export interface A {
    b: B; foo: any;
}

tsgo --b --verbose
ExitStatus:: Success
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because output 'tsconfig.tsbuildinfo' is older than input 'src/a.ts'

[[90mHH:MM:SS AM[0m] Building project 'tsconfig.json'...

//// [/home/src/workspaces/project/lib/a.d.ts] *modified* 
export declare class B {
    prop: string;
}
export interface A {
    b: B;
    foo: any;
}
//# sourceMappingURL=a.d.ts.map
//// [/home/src/workspaces/project/lib/a.d.ts.map] *modified* 
{"version":3,"file":"a.d.ts","sourceRoot":"","sources":["../src/a.ts"],"names":[],"mappings":"AAAA,qBAAa,CAAC;IAAG,IAAI,SAAW;CAAE;AAGlC,MAAM,WAAW,CAAC;IACd,CAAC,EAAE,CAAC,CAAC;IAAC,GAAG,EAAE,GAAG,CAAC;CAClB"}
//// [/home/src/workspaces/project/lib/b.d.ts.map] *rewrite with same content*
//// [/home/src/workspaces/project/lib/c.d.ts.map] *rewrite with same content*
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[[2,4]],"fileNames":["lib.d.ts","./src/a.ts","./src/c.ts","./src/b.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"f2ea1f64003c617e4826031e7133d22d-export class B { prop = \"hello\"; }\n\nclass C { }\nexport interface A {\n    b: B; foo: any;\n}","signature":"1bd611ec5b00f8f076ed030967bcfa3e-export declare class B {\n    prop: string;\n}\nexport interface A {\n    b: B;\n    foo: any;\n}\n","impliedNodeFormat":1},{"version":"e8d66a87a10151e3d8c84e04e3d962c9-import { A } from \"./a\";\n\nexport interface C {\n    a: A;\n}","signature":"57c1fb7dd5816e999a47a54abfd60004-import { A } from \"./a\";\nexport interface C {\n    a: A;\n}\n","impliedNodeFormat":1},{"version":"635cd13fa5127837a0f61aa9d436e764-import { C } from \"./c\";\n\nexport interface B {\n    b: C;\n}","signature":"2c6af9ce6f102ba192048b07d4b44ebf-import { C } from \"./c\";\nexport interface B {\n    b: C;\n}\n","impliedNodeFormat":1}],"fileIdsList":[[3],[2]],"options":{"alwaysStrict":true,"composite":true,"emitDeclarationOnly":true,"declaration":true,"declarationMap":true,"esModuleInterop":true,"module":1,"outDir":"./lib","rootDir":"./src","strict":true,"sourceMap":true,"target":1},"referencedMap":[[4,1],[3,2]],"latestChangedDtsFile":"./lib/a.d.ts"}
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./src/a.ts",
        "./src/c.ts",
        "./src/b.ts"
      ],
      "original": [
        2,
        4
      ]
    }
  ],
  "fileNames": [
    "lib.d.ts",
    "./src/a.ts",
    "./src/c.ts",
    "./src/b.ts"
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
      "fileName": "./src/a.ts",
      "version": "f2ea1f64003c617e4826031e7133d22d-export class B { prop = \"hello\"; }\n\nclass C { }\nexport interface A {\n    b: B; foo: any;\n}",
      "signature": "1bd611ec5b00f8f076ed030967bcfa3e-export declare class B {\n    prop: string;\n}\nexport interface A {\n    b: B;\n    foo: any;\n}\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "f2ea1f64003c617e4826031e7133d22d-export class B { prop = \"hello\"; }\n\nclass C { }\nexport interface A {\n    b: B; foo: any;\n}",
        "signature": "1bd611ec5b00f8f076ed030967bcfa3e-export declare class B {\n    prop: string;\n}\nexport interface A {\n    b: B;\n    foo: any;\n}\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./src/c.ts",
      "version": "e8d66a87a10151e3d8c84e04e3d962c9-import { A } from \"./a\";\n\nexport interface C {\n    a: A;\n}",
      "signature": "57c1fb7dd5816e999a47a54abfd60004-import { A } from \"./a\";\nexport interface C {\n    a: A;\n}\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "e8d66a87a10151e3d8c84e04e3d962c9-import { A } from \"./a\";\n\nexport interface C {\n    a: A;\n}",
        "signature": "57c1fb7dd5816e999a47a54abfd60004-import { A } from \"./a\";\nexport interface C {\n    a: A;\n}\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./src/b.ts",
      "version": "635cd13fa5127837a0f61aa9d436e764-import { C } from \"./c\";\n\nexport interface B {\n    b: C;\n}",
      "signature": "2c6af9ce6f102ba192048b07d4b44ebf-import { C } from \"./c\";\nexport interface B {\n    b: C;\n}\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "635cd13fa5127837a0f61aa9d436e764-import { C } from \"./c\";\n\nexport interface B {\n    b: C;\n}",
        "signature": "2c6af9ce6f102ba192048b07d4b44ebf-import { C } from \"./c\";\nexport interface B {\n    b: C;\n}\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "fileIdsList": [
    [
      "./src/c.ts"
    ],
    [
      "./src/a.ts"
    ]
  ],
  "options": {
    "alwaysStrict": true,
    "composite": true,
    "emitDeclarationOnly": true,
    "declaration": true,
    "declarationMap": true,
    "esModuleInterop": true,
    "module": 1,
    "outDir": "./lib",
    "rootDir": "./src",
    "strict": true,
    "sourceMap": true,
    "target": 1
  },
  "referencedMap": {
    "./src/b.ts": [
      "./src/c.ts"
    ],
    "./src/c.ts": [
      "./src/a.ts"
    ]
  },
  "latestChangedDtsFile": "./lib/a.d.ts",
  "size": 2016
}

tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/workspaces/project/src/a.ts
*refresh*    /home/src/workspaces/project/src/c.ts
*refresh*    /home/src/workspaces/project/src/b.ts
Signatures::
(computed .d.ts) /home/src/workspaces/project/src/a.ts
(computed .d.ts) /home/src/workspaces/project/src/c.ts
(stored at emit) /home/src/workspaces/project/src/b.ts
