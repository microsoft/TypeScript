currentDirectory::/home/src/workspaces/project
useCaseSensitiveFileNames::true
Input::
//// [/home/src/workspaces/project/src/a.ts] *new* 
import { B } from "./b";

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
//// [/home/src/workspaces/project/src/index.ts] *new* 
export { A } from "./a";
export { B } from "./b";
export { C } from "./c";
//// [/home/src/workspaces/project/tsconfig.json] *new* 
{
    "compilerOptions": {
        "incremental": true,
        "target": "es5",
        "module": "commonjs",
        "declaration": true,
        "declarationMap": false,
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
import { B } from "./b";
export interface A {
    b: B;
}

//// [/home/src/workspaces/project/lib/b.d.ts] *new* 
import { C } from "./c";
export interface B {
    b: C;
}

//// [/home/src/workspaces/project/lib/c.d.ts] *new* 
import { A } from "./a";
export interface C {
    a: A;
}

//// [/home/src/workspaces/project/lib/index.d.ts] *new* 
export { A } from "./a";
export { B } from "./b";
export { C } from "./c";

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":[[2,5]],"fileNames":["lib.d.ts","./src/c.ts","./src/b.ts","./src/a.ts","./src/index.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"e8d66a87a10151e3d8c84e04e3d962c9-import { A } from \"./a\";\n\nexport interface C {\n    a: A;\n}","signature":"57c1fb7dd5816e999a47a54abfd60004-import { A } from \"./a\";\nexport interface C {\n    a: A;\n}\n","impliedNodeFormat":1},{"version":"635cd13fa5127837a0f61aa9d436e764-import { C } from \"./c\";\n\nexport interface B {\n    b: C;\n}","signature":"2c6af9ce6f102ba192048b07d4b44ebf-import { C } from \"./c\";\nexport interface B {\n    b: C;\n}\n","impliedNodeFormat":1},{"version":"0c094e56b7619bf6cde26939daf7a796-import { B } from \"./b\";\n\nexport interface A {\n    b: B;\n}","signature":"2904de9e1ae84b014654eae6ae9d57b8-import { B } from \"./b\";\nexport interface A {\n    b: B;\n}\n","impliedNodeFormat":1},{"version":"9752277022f460184d673fd343fe2c3f-export { A } from \"./a\";\nexport { B } from \"./b\";\nexport { C } from \"./c\";","signature":"c689f6bb5a7ac5a812528f5b6ccb6872-export { A } from \"./a\";\nexport { B } from \"./b\";\nexport { C } from \"./c\";\n","impliedNodeFormat":1}],"fileIdsList":[[3],[2],[4],[2,3,4]],"options":{"alwaysStrict":true,"composite":true,"emitDeclarationOnly":true,"declaration":true,"declarationMap":false,"esModuleInterop":true,"module":1,"outDir":"./lib","rootDir":"./src","strict":true,"sourceMap":true,"target":1},"referencedMap":[[4,1],[3,2],[2,3],[5,4]],"latestChangedDtsFile":"./lib/index.d.ts"}
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./src/c.ts",
        "./src/b.ts",
        "./src/a.ts",
        "./src/index.ts"
      ],
      "original": [
        2,
        5
      ]
    }
  ],
  "fileNames": [
    "lib.d.ts",
    "./src/c.ts",
    "./src/b.ts",
    "./src/a.ts",
    "./src/index.ts"
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
    },
    {
      "fileName": "./src/a.ts",
      "version": "0c094e56b7619bf6cde26939daf7a796-import { B } from \"./b\";\n\nexport interface A {\n    b: B;\n}",
      "signature": "2904de9e1ae84b014654eae6ae9d57b8-import { B } from \"./b\";\nexport interface A {\n    b: B;\n}\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "0c094e56b7619bf6cde26939daf7a796-import { B } from \"./b\";\n\nexport interface A {\n    b: B;\n}",
        "signature": "2904de9e1ae84b014654eae6ae9d57b8-import { B } from \"./b\";\nexport interface A {\n    b: B;\n}\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./src/index.ts",
      "version": "9752277022f460184d673fd343fe2c3f-export { A } from \"./a\";\nexport { B } from \"./b\";\nexport { C } from \"./c\";",
      "signature": "c689f6bb5a7ac5a812528f5b6ccb6872-export { A } from \"./a\";\nexport { B } from \"./b\";\nexport { C } from \"./c\";\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "9752277022f460184d673fd343fe2c3f-export { A } from \"./a\";\nexport { B } from \"./b\";\nexport { C } from \"./c\";",
        "signature": "c689f6bb5a7ac5a812528f5b6ccb6872-export { A } from \"./a\";\nexport { B } from \"./b\";\nexport { C } from \"./c\";\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "fileIdsList": [
    [
      "./src/b.ts"
    ],
    [
      "./src/c.ts"
    ],
    [
      "./src/a.ts"
    ],
    [
      "./src/c.ts",
      "./src/b.ts",
      "./src/a.ts"
    ]
  ],
  "options": {
    "alwaysStrict": true,
    "composite": true,
    "emitDeclarationOnly": true,
    "declaration": true,
    "declarationMap": false,
    "esModuleInterop": true,
    "module": 1,
    "outDir": "./lib",
    "rootDir": "./src",
    "strict": true,
    "sourceMap": true,
    "target": 1
  },
  "referencedMap": {
    "./src/a.ts": [
      "./src/b.ts"
    ],
    "./src/b.ts": [
      "./src/c.ts"
    ],
    "./src/c.ts": [
      "./src/a.ts"
    ],
    "./src/index.ts": [
      "./src/c.ts",
      "./src/b.ts",
      "./src/a.ts"
    ]
  },
  "latestChangedDtsFile": "./lib/index.d.ts",
  "size": 2278
}

tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.d.ts
*refresh*    /home/src/workspaces/project/src/c.ts
*refresh*    /home/src/workspaces/project/src/b.ts
*refresh*    /home/src/workspaces/project/src/a.ts
*refresh*    /home/src/workspaces/project/src/index.ts
Signatures::
(stored at emit) /home/src/workspaces/project/src/c.ts
(stored at emit) /home/src/workspaces/project/src/b.ts
(stored at emit) /home/src/workspaces/project/src/a.ts
(stored at emit) /home/src/workspaces/project/src/index.ts


Edit [0]:: incremental-declaration-changes
//// [/home/src/workspaces/project/src/a.ts] *modified* 
import { B } from "./b";

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
import { B } from "./b";
export interface A {
    b: B;
    foo: any;
}

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[[2,5]],"fileNames":["lib.d.ts","./src/c.ts","./src/b.ts","./src/a.ts","./src/index.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"e8d66a87a10151e3d8c84e04e3d962c9-import { A } from \"./a\";\n\nexport interface C {\n    a: A;\n}","signature":"57c1fb7dd5816e999a47a54abfd60004-import { A } from \"./a\";\nexport interface C {\n    a: A;\n}\n","impliedNodeFormat":1},{"version":"635cd13fa5127837a0f61aa9d436e764-import { C } from \"./c\";\n\nexport interface B {\n    b: C;\n}","signature":"2c6af9ce6f102ba192048b07d4b44ebf-import { C } from \"./c\";\nexport interface B {\n    b: C;\n}\n","impliedNodeFormat":1},{"version":"078c59719381373c2fc227a7b5ee0f0b-import { B } from \"./b\";\n\nexport interface A {\n    b: B; foo: any;\n}","signature":"ddf8205c0552214926ecdcce4664e925-import { B } from \"./b\";\nexport interface A {\n    b: B;\n    foo: any;\n}\n","impliedNodeFormat":1},{"version":"9752277022f460184d673fd343fe2c3f-export { A } from \"./a\";\nexport { B } from \"./b\";\nexport { C } from \"./c\";","signature":"c689f6bb5a7ac5a812528f5b6ccb6872-export { A } from \"./a\";\nexport { B } from \"./b\";\nexport { C } from \"./c\";\n","impliedNodeFormat":1}],"fileIdsList":[[3],[2],[4],[2,3,4]],"options":{"alwaysStrict":true,"composite":true,"emitDeclarationOnly":true,"declaration":true,"declarationMap":false,"esModuleInterop":true,"module":1,"outDir":"./lib","rootDir":"./src","strict":true,"sourceMap":true,"target":1},"referencedMap":[[4,1],[3,2],[2,3],[5,4]],"latestChangedDtsFile":"./lib/a.d.ts"}
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./src/c.ts",
        "./src/b.ts",
        "./src/a.ts",
        "./src/index.ts"
      ],
      "original": [
        2,
        5
      ]
    }
  ],
  "fileNames": [
    "lib.d.ts",
    "./src/c.ts",
    "./src/b.ts",
    "./src/a.ts",
    "./src/index.ts"
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
    },
    {
      "fileName": "./src/a.ts",
      "version": "078c59719381373c2fc227a7b5ee0f0b-import { B } from \"./b\";\n\nexport interface A {\n    b: B; foo: any;\n}",
      "signature": "ddf8205c0552214926ecdcce4664e925-import { B } from \"./b\";\nexport interface A {\n    b: B;\n    foo: any;\n}\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "078c59719381373c2fc227a7b5ee0f0b-import { B } from \"./b\";\n\nexport interface A {\n    b: B; foo: any;\n}",
        "signature": "ddf8205c0552214926ecdcce4664e925-import { B } from \"./b\";\nexport interface A {\n    b: B;\n    foo: any;\n}\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./src/index.ts",
      "version": "9752277022f460184d673fd343fe2c3f-export { A } from \"./a\";\nexport { B } from \"./b\";\nexport { C } from \"./c\";",
      "signature": "c689f6bb5a7ac5a812528f5b6ccb6872-export { A } from \"./a\";\nexport { B } from \"./b\";\nexport { C } from \"./c\";\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "9752277022f460184d673fd343fe2c3f-export { A } from \"./a\";\nexport { B } from \"./b\";\nexport { C } from \"./c\";",
        "signature": "c689f6bb5a7ac5a812528f5b6ccb6872-export { A } from \"./a\";\nexport { B } from \"./b\";\nexport { C } from \"./c\";\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "fileIdsList": [
    [
      "./src/b.ts"
    ],
    [
      "./src/c.ts"
    ],
    [
      "./src/a.ts"
    ],
    [
      "./src/c.ts",
      "./src/b.ts",
      "./src/a.ts"
    ]
  ],
  "options": {
    "alwaysStrict": true,
    "composite": true,
    "emitDeclarationOnly": true,
    "declaration": true,
    "declarationMap": false,
    "esModuleInterop": true,
    "module": 1,
    "outDir": "./lib",
    "rootDir": "./src",
    "strict": true,
    "sourceMap": true,
    "target": 1
  },
  "referencedMap": {
    "./src/a.ts": [
      "./src/b.ts"
    ],
    "./src/b.ts": [
      "./src/c.ts"
    ],
    "./src/c.ts": [
      "./src/a.ts"
    ],
    "./src/index.ts": [
      "./src/c.ts",
      "./src/b.ts",
      "./src/a.ts"
    ]
  },
  "latestChangedDtsFile": "./lib/a.d.ts",
  "size": 2299
}

tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/workspaces/project/src/c.ts
*refresh*    /home/src/workspaces/project/src/b.ts
*refresh*    /home/src/workspaces/project/src/a.ts
*refresh*    /home/src/workspaces/project/src/index.ts
Signatures::
(computed .d.ts) /home/src/workspaces/project/src/c.ts
(stored at emit) /home/src/workspaces/project/src/b.ts
(computed .d.ts) /home/src/workspaces/project/src/a.ts
(computed .d.ts) /home/src/workspaces/project/src/index.ts
