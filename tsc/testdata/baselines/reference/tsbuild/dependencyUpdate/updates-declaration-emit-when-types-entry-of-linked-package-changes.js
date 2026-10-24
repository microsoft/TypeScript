currentDirectory::/home/src/workspaces/solution
useCaseSensitiveFileNames::true
Input::
//// [/home/src/workspaces/solution/a/node_modules/b] -> /home/src/workspaces/solution/b *new*
//// [/home/src/workspaces/solution/a/node_modules/c] -> /home/src/workspaces/solution/c *new*
//// [/home/src/workspaces/solution/a/package.json] *new* 
{"name":"a","version":"1.0.0","type":"module","types":"./src/index.ts","dependencies":{"b":"1.0.0","c":"1.0.0"}}
//// [/home/src/workspaces/solution/a/src/index.ts] *new* 
import { currentStage } from "b";
export const stage = currentStage();
//// [/home/src/workspaces/solution/a/tsconfig.json] *new* 
{
    "compilerOptions": {
        "composite": true,
        "emitDeclarationOnly": true,
        "noEmitOnError": true,
        "strict": true,
        "module": "nodenext",
        "types": [],
        "rootDir": "src",
        "outDir": "../dist/a",
        "tsBuildInfoFile": "../dist/a.tsbuildinfo"
    },
    "include": ["src"],
    "references": [{"path":"../b"}]
}
//// [/home/src/workspaces/solution/b/node_modules/c] -> /home/src/workspaces/solution/c *new*
//// [/home/src/workspaces/solution/b/package.json] *new* 
{"name":"b","version":"1.0.0","type":"module","types":"./src/index.ts","dependencies":{"c":"1.0.0"}}
//// [/home/src/workspaces/solution/b/src/index.ts] *new* 
import { current } from "c/src/index.js";
export const currentStage = () => current;
//// [/home/src/workspaces/solution/b/tsconfig.json] *new* 
{
    "compilerOptions": {
        "composite": true,
        "emitDeclarationOnly": true,
        "noEmitOnError": true,
        "strict": true,
        "module": "nodenext",
        "types": [],
        "rootDir": "src",
        "outDir": "../dist/b",
        "tsBuildInfoFile": "../dist/b.tsbuildinfo"
    },
    "include": ["src"],
    "references": [{"path":"../c"}]
}
//// [/home/src/workspaces/solution/c/package.json] *new* 
{"name":"c","version":"1.0.0","type":"module","types":"./src/index.ts","dependencies":{}}
//// [/home/src/workspaces/solution/c/src/index.ts] *new* 
export interface Current { readonly stage: string }
export const current: Current = { stage: "test" };
//// [/home/src/workspaces/solution/c/src/main.ts] *new* 
export const version = "1.0.0";
//// [/home/src/workspaces/solution/c/tsconfig.json] *new* 
{
    "compilerOptions": {
        "composite": true,
        "emitDeclarationOnly": true,
        "noEmitOnError": true,
        "strict": true,
        "module": "nodenext",
        "types": [],
        "rootDir": "src",
        "outDir": "../dist/c",
        "tsBuildInfoFile": "../dist/c.tsbuildinfo"
    },
    "include": ["src"],
    "references": []
}
//// [/home/src/workspaces/solution/tsconfig.json] *new* 
{"files":[],"references":[{"path":"./a"}]}

tsgo --b --verbose
ExitStatus:: Success
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * c/tsconfig.json
    * b/tsconfig.json
    * a/tsconfig.json
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'c/tsconfig.json' is out of date because output file 'dist/c.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project 'c/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'b/tsconfig.json' is out of date because output file 'dist/b.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project 'b/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'a/tsconfig.json' is out of date because output file 'dist/a.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project 'a/tsconfig.json'...

//// [/home/src/tslibs/TS/Lib/lib.es2026.full.d.ts] *Lib*
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
//// [/home/src/workspaces/solution/dist/a.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":[4],"packageJsons":["../a/package.json","../b/package.json","../c/package.json"],"missingPackageJsons":["../a/node_modules/b/src/package.json","../a/node_modules/c/src/package.json","../b/node_modules/c/src/index.js/package.json","../b/node_modules/c/src/package.json"],"fileNames":["lib.es2026.full.d.ts","./c/index.d.ts","./b/index.d.ts","../a/src/index.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},"772688f640dfff8943755b05148ff770-export interface Current {\n    readonly stage: string;\n}\nexport declare const current: Current;\n","d1346b3ed40bf05c6a20fa24037a99a2-export declare const currentStage: () => import(\"c/src/index.js\").Current;\n",{"version":"58d3d85f395f5825bc9d710f0024af35-import { currentStage } from \"b\";\nexport const stage = currentStage();","signature":"620c9be1975f68589ff91cdbbde3297b-export declare const stage: import(\"c\").Current;\n","impliedNodeFormat":99}],"fileIdsList":[[3],[2]],"options":{"composite":true,"emitDeclarationOnly":true,"module":199,"noEmitOnError":true,"outDir":"./a","rootDir":"../a/src","strict":true,"tsBuildInfoFile":"./a.tsbuildinfo"},"referencedMap":[[4,1],[3,2]],"latestChangedDtsFile":"./a/index.d.ts","linkedPackagesSignature":"a8bdd73a7c24411c788c0ede9f17cb59-../a/node_modules/b -> ../b\n../a/node_modules/b {\"type\":\"module\",\"types\":\"./src/index.ts\"}\n../a/node_modules/c -> ../c\n../a/node_modules/c {\"type\":\"module\",\"types\":\"./src/index.ts\"}\n../b/node_modules/c -> ../c\n../b/node_modules/c {\"type\":\"module\",\"types\":\"./src/index.ts\"}"}
//// [/home/src/workspaces/solution/dist/a.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "../a/src/index.ts"
      ],
      "original": 4
    }
  ],
  "packageJsons": [
    "../a/package.json",
    "../b/package.json",
    "../c/package.json"
  ],
  "missingPackageJsons": [
    "../a/node_modules/b/src/package.json",
    "../a/node_modules/c/src/package.json",
    "../b/node_modules/c/src/index.js/package.json",
    "../b/node_modules/c/src/package.json"
  ],
  "fileNames": [
    "lib.es2026.full.d.ts",
    "./c/index.d.ts",
    "./b/index.d.ts",
    "../a/src/index.ts"
  ],
  "fileInfos": [
    {
      "fileName": "lib.es2026.full.d.ts",
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
      "fileName": "./c/index.d.ts",
      "version": "772688f640dfff8943755b05148ff770-export interface Current {\n    readonly stage: string;\n}\nexport declare const current: Current;\n",
      "signature": "772688f640dfff8943755b05148ff770-export interface Current {\n    readonly stage: string;\n}\nexport declare const current: Current;\n",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "./b/index.d.ts",
      "version": "d1346b3ed40bf05c6a20fa24037a99a2-export declare const currentStage: () => import(\"c/src/index.js\").Current;\n",
      "signature": "d1346b3ed40bf05c6a20fa24037a99a2-export declare const currentStage: () => import(\"c/src/index.js\").Current;\n",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "../a/src/index.ts",
      "version": "58d3d85f395f5825bc9d710f0024af35-import { currentStage } from \"b\";\nexport const stage = currentStage();",
      "signature": "620c9be1975f68589ff91cdbbde3297b-export declare const stage: import(\"c\").Current;\n",
      "impliedNodeFormat": "ESNext",
      "original": {
        "version": "58d3d85f395f5825bc9d710f0024af35-import { currentStage } from \"b\";\nexport const stage = currentStage();",
        "signature": "620c9be1975f68589ff91cdbbde3297b-export declare const stage: import(\"c\").Current;\n",
        "impliedNodeFormat": 99
      }
    }
  ],
  "fileIdsList": [
    [
      "./b/index.d.ts"
    ],
    [
      "./c/index.d.ts"
    ]
  ],
  "options": {
    "composite": true,
    "emitDeclarationOnly": true,
    "module": 199,
    "noEmitOnError": true,
    "outDir": "./a",
    "rootDir": "../a/src",
    "strict": true,
    "tsBuildInfoFile": "./a.tsbuildinfo"
  },
  "referencedMap": {
    "../a/src/index.ts": [
      "./b/index.d.ts"
    ],
    "./b/index.d.ts": [
      "./c/index.d.ts"
    ]
  },
  "latestChangedDtsFile": "./a/index.d.ts",
  "linkedPackagesSignature": "a8bdd73a7c24411c788c0ede9f17cb59-../a/node_modules/b -> ../b\n../a/node_modules/b {\"type\":\"module\",\"types\":\"./src/index.ts\"}\n../a/node_modules/c -> ../c\n../a/node_modules/c {\"type\":\"module\",\"types\":\"./src/index.ts\"}\n../b/node_modules/c -> ../c\n../b/node_modules/c {\"type\":\"module\",\"types\":\"./src/index.ts\"}",
  "size": 2306
}
//// [/home/src/workspaces/solution/dist/a/index.d.ts] *new* 
export declare const stage: import("c").Current;

//// [/home/src/workspaces/solution/dist/b.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":[3],"packageJsons":["../b/package.json","../c/package.json"],"missingPackageJsons":["../b/node_modules/c/src/index.js/package.json","../b/node_modules/c/src/package.json"],"fileNames":["lib.es2026.full.d.ts","./c/index.d.ts","../b/src/index.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},"772688f640dfff8943755b05148ff770-export interface Current {\n    readonly stage: string;\n}\nexport declare const current: Current;\n",{"version":"1be45da9493d61c890e76e46bc9e35a5-import { current } from \"c/src/index.js\";\nexport const currentStage = () => current;","signature":"d1346b3ed40bf05c6a20fa24037a99a2-export declare const currentStage: () => import(\"c/src/index.js\").Current;\n","impliedNodeFormat":99}],"fileIdsList":[[2]],"options":{"composite":true,"emitDeclarationOnly":true,"module":199,"noEmitOnError":true,"outDir":"./b","rootDir":"../b/src","strict":true,"tsBuildInfoFile":"./b.tsbuildinfo"},"referencedMap":[[3,1]],"latestChangedDtsFile":"./b/index.d.ts","linkedPackagesSignature":"3ddb9b35e40e855c208d52b982bd5b19-../b/node_modules/c -> ../c\n../b/node_modules/c {\"type\":\"module\",\"types\":\"./src/index.ts\"}"}
//// [/home/src/workspaces/solution/dist/b.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "../b/src/index.ts"
      ],
      "original": 3
    }
  ],
  "packageJsons": [
    "../b/package.json",
    "../c/package.json"
  ],
  "missingPackageJsons": [
    "../b/node_modules/c/src/index.js/package.json",
    "../b/node_modules/c/src/package.json"
  ],
  "fileNames": [
    "lib.es2026.full.d.ts",
    "./c/index.d.ts",
    "../b/src/index.ts"
  ],
  "fileInfos": [
    {
      "fileName": "lib.es2026.full.d.ts",
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
      "fileName": "./c/index.d.ts",
      "version": "772688f640dfff8943755b05148ff770-export interface Current {\n    readonly stage: string;\n}\nexport declare const current: Current;\n",
      "signature": "772688f640dfff8943755b05148ff770-export interface Current {\n    readonly stage: string;\n}\nexport declare const current: Current;\n",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "../b/src/index.ts",
      "version": "1be45da9493d61c890e76e46bc9e35a5-import { current } from \"c/src/index.js\";\nexport const currentStage = () => current;",
      "signature": "d1346b3ed40bf05c6a20fa24037a99a2-export declare const currentStage: () => import(\"c/src/index.js\").Current;\n",
      "impliedNodeFormat": "ESNext",
      "original": {
        "version": "1be45da9493d61c890e76e46bc9e35a5-import { current } from \"c/src/index.js\";\nexport const currentStage = () => current;",
        "signature": "d1346b3ed40bf05c6a20fa24037a99a2-export declare const currentStage: () => import(\"c/src/index.js\").Current;\n",
        "impliedNodeFormat": 99
      }
    }
  ],
  "fileIdsList": [
    [
      "./c/index.d.ts"
    ]
  ],
  "options": {
    "composite": true,
    "emitDeclarationOnly": true,
    "module": 199,
    "noEmitOnError": true,
    "outDir": "./b",
    "rootDir": "../b/src",
    "strict": true,
    "tsBuildInfoFile": "./b.tsbuildinfo"
  },
  "referencedMap": {
    "../b/src/index.ts": [
      "./c/index.d.ts"
    ]
  },
  "latestChangedDtsFile": "./b/index.d.ts",
  "linkedPackagesSignature": "3ddb9b35e40e855c208d52b982bd5b19-../b/node_modules/c -> ../c\n../b/node_modules/c {\"type\":\"module\",\"types\":\"./src/index.ts\"}",
  "size": 1905
}
//// [/home/src/workspaces/solution/dist/b/index.d.ts] *new* 
export declare const currentStage: () => import("c/src/index.js").Current;

//// [/home/src/workspaces/solution/dist/c.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":[[2,3]],"packageJsons":["../c/package.json"],"fileNames":["lib.es2026.full.d.ts","../c/src/index.ts","../c/src/main.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"24adc195ff28658d712c9b893a84480c-export interface Current { readonly stage: string }\nexport const current: Current = { stage: \"test\" };","signature":"772688f640dfff8943755b05148ff770-export interface Current {\n    readonly stage: string;\n}\nexport declare const current: Current;\n","impliedNodeFormat":99},{"version":"8c62520a4c541b0aab40e2e7abefd466-export const version = \"1.0.0\";","signature":"1b669051a90e86443f194e6eeaf4bfd6-export declare const version = \"1.0.0\";\n","impliedNodeFormat":99}],"options":{"composite":true,"emitDeclarationOnly":true,"module":199,"noEmitOnError":true,"outDir":"./c","rootDir":"../c/src","strict":true,"tsBuildInfoFile":"./c.tsbuildinfo"},"latestChangedDtsFile":"./c/main.d.ts"}
//// [/home/src/workspaces/solution/dist/c.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "../c/src/index.ts",
        "../c/src/main.ts"
      ],
      "original": [
        2,
        3
      ]
    }
  ],
  "packageJsons": [
    "../c/package.json"
  ],
  "fileNames": [
    "lib.es2026.full.d.ts",
    "../c/src/index.ts",
    "../c/src/main.ts"
  ],
  "fileInfos": [
    {
      "fileName": "lib.es2026.full.d.ts",
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
      "fileName": "../c/src/index.ts",
      "version": "24adc195ff28658d712c9b893a84480c-export interface Current { readonly stage: string }\nexport const current: Current = { stage: \"test\" };",
      "signature": "772688f640dfff8943755b05148ff770-export interface Current {\n    readonly stage: string;\n}\nexport declare const current: Current;\n",
      "impliedNodeFormat": "ESNext",
      "original": {
        "version": "24adc195ff28658d712c9b893a84480c-export interface Current { readonly stage: string }\nexport const current: Current = { stage: \"test\" };",
        "signature": "772688f640dfff8943755b05148ff770-export interface Current {\n    readonly stage: string;\n}\nexport declare const current: Current;\n",
        "impliedNodeFormat": 99
      }
    },
    {
      "fileName": "../c/src/main.ts",
      "version": "8c62520a4c541b0aab40e2e7abefd466-export const version = \"1.0.0\";",
      "signature": "1b669051a90e86443f194e6eeaf4bfd6-export declare const version = \"1.0.0\";\n",
      "impliedNodeFormat": "ESNext",
      "original": {
        "version": "8c62520a4c541b0aab40e2e7abefd466-export const version = \"1.0.0\";",
        "signature": "1b669051a90e86443f194e6eeaf4bfd6-export declare const version = \"1.0.0\";\n",
        "impliedNodeFormat": 99
      }
    }
  ],
  "options": {
    "composite": true,
    "emitDeclarationOnly": true,
    "module": 199,
    "noEmitOnError": true,
    "outDir": "./c",
    "rootDir": "../c/src",
    "strict": true,
    "tsBuildInfoFile": "./c.tsbuildinfo"
  },
  "latestChangedDtsFile": "./c/main.d.ts",
  "size": 1673
}
//// [/home/src/workspaces/solution/dist/c/index.d.ts] *new* 
export interface Current {
    readonly stage: string;
}
export declare const current: Current;

//// [/home/src/workspaces/solution/dist/c/main.d.ts] *new* 
export declare const version = "1.0.0";


c/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es2026.full.d.ts
*refresh*    /home/src/workspaces/solution/c/src/index.ts
*refresh*    /home/src/workspaces/solution/c/src/main.ts
Signatures::
(stored at emit) /home/src/workspaces/solution/c/src/index.ts
(stored at emit) /home/src/workspaces/solution/c/src/main.ts

b/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es2026.full.d.ts
*refresh*    /home/src/workspaces/solution/dist/c/index.d.ts
*refresh*    /home/src/workspaces/solution/b/src/index.ts
Signatures::
(stored at emit) /home/src/workspaces/solution/b/src/index.ts

a/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es2026.full.d.ts
*refresh*    /home/src/workspaces/solution/dist/c/index.d.ts
*refresh*    /home/src/workspaces/solution/dist/b/index.d.ts
*refresh*    /home/src/workspaces/solution/a/src/index.ts
Signatures::
(stored at emit) /home/src/workspaces/solution/a/src/index.ts


Edit [0]:: point types of c to another entry
//// [/home/src/workspaces/solution/c/package.json] *modified* 
{"name":"c","version":"1.0.0","type":"module","types":"./src/main.ts","dependencies":{}}

tsgo --b --verbose
ExitStatus:: Success
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * c/tsconfig.json
    * b/tsconfig.json
    * a/tsconfig.json
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'c/tsconfig.json' is out of date because output 'dist/c.tsbuildinfo' is older than input 'c/package.json'

[[90mHH:MM:SS AM[0m] Building project 'c/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Updating unchanged output timestamps of project 'c/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'b/tsconfig.json' is out of date because output 'dist/b.tsbuildinfo' is older than input 'c/package.json'

[[90mHH:MM:SS AM[0m] Building project 'b/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'a/tsconfig.json' is out of date because output 'dist/a.tsbuildinfo' is older than input 'c/package.json'

[[90mHH:MM:SS AM[0m] Building project 'a/tsconfig.json'...

//// [/home/src/workspaces/solution/dist/a.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[4],"packageJsons":["../a/package.json","../b/package.json","../c/package.json"],"missingPackageJsons":["../a/node_modules/b/src/package.json","../a/node_modules/c/src/package.json","../b/node_modules/c/src/index.js/package.json","../b/node_modules/c/src/package.json"],"fileNames":["lib.es2026.full.d.ts","./c/index.d.ts","./b/index.d.ts","../a/src/index.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},"772688f640dfff8943755b05148ff770-export interface Current {\n    readonly stage: string;\n}\nexport declare const current: Current;\n","d1346b3ed40bf05c6a20fa24037a99a2-export declare const currentStage: () => import(\"c/src/index.js\").Current;\n",{"version":"58d3d85f395f5825bc9d710f0024af35-import { currentStage } from \"b\";\nexport const stage = currentStage();","signature":"620c9be1975f68589ff91cdbbde3297b-export declare const stage: import(\"c\").Current;\n","impliedNodeFormat":99}],"fileIdsList":[[3],[2]],"options":{"composite":true,"emitDeclarationOnly":true,"module":199,"noEmitOnError":true,"outDir":"./a","rootDir":"../a/src","strict":true,"tsBuildInfoFile":"./a.tsbuildinfo"},"referencedMap":[[4,1],[3,2]],"latestChangedDtsFile":"./a/index.d.ts","emitSignatures":[[4,"166dc830f76f60dbfa1d5ff8e21580de-export declare const stage: import(\"c/src/index.js\").Current;\n"]],"linkedPackagesSignature":"bf9fc568da2eda7fb0d70936964f4974-../a/node_modules/b -> ../b\n../a/node_modules/b {\"type\":\"module\",\"types\":\"./src/index.ts\"}\n../a/node_modules/c -> ../c\n../a/node_modules/c {\"type\":\"module\",\"types\":\"./src/main.ts\"}\n../b/node_modules/c -> ../c\n../b/node_modules/c {\"type\":\"module\",\"types\":\"./src/main.ts\"}"}
//// [/home/src/workspaces/solution/dist/a.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "../a/src/index.ts"
      ],
      "original": 4
    }
  ],
  "packageJsons": [
    "../a/package.json",
    "../b/package.json",
    "../c/package.json"
  ],
  "missingPackageJsons": [
    "../a/node_modules/b/src/package.json",
    "../a/node_modules/c/src/package.json",
    "../b/node_modules/c/src/index.js/package.json",
    "../b/node_modules/c/src/package.json"
  ],
  "fileNames": [
    "lib.es2026.full.d.ts",
    "./c/index.d.ts",
    "./b/index.d.ts",
    "../a/src/index.ts"
  ],
  "fileInfos": [
    {
      "fileName": "lib.es2026.full.d.ts",
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
      "fileName": "./c/index.d.ts",
      "version": "772688f640dfff8943755b05148ff770-export interface Current {\n    readonly stage: string;\n}\nexport declare const current: Current;\n",
      "signature": "772688f640dfff8943755b05148ff770-export interface Current {\n    readonly stage: string;\n}\nexport declare const current: Current;\n",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "./b/index.d.ts",
      "version": "d1346b3ed40bf05c6a20fa24037a99a2-export declare const currentStage: () => import(\"c/src/index.js\").Current;\n",
      "signature": "d1346b3ed40bf05c6a20fa24037a99a2-export declare const currentStage: () => import(\"c/src/index.js\").Current;\n",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "../a/src/index.ts",
      "version": "58d3d85f395f5825bc9d710f0024af35-import { currentStage } from \"b\";\nexport const stage = currentStage();",
      "signature": "620c9be1975f68589ff91cdbbde3297b-export declare const stage: import(\"c\").Current;\n",
      "impliedNodeFormat": "ESNext",
      "original": {
        "version": "58d3d85f395f5825bc9d710f0024af35-import { currentStage } from \"b\";\nexport const stage = currentStage();",
        "signature": "620c9be1975f68589ff91cdbbde3297b-export declare const stage: import(\"c\").Current;\n",
        "impliedNodeFormat": 99
      }
    }
  ],
  "fileIdsList": [
    [
      "./b/index.d.ts"
    ],
    [
      "./c/index.d.ts"
    ]
  ],
  "options": {
    "composite": true,
    "emitDeclarationOnly": true,
    "module": 199,
    "noEmitOnError": true,
    "outDir": "./a",
    "rootDir": "../a/src",
    "strict": true,
    "tsBuildInfoFile": "./a.tsbuildinfo"
  },
  "referencedMap": {
    "../a/src/index.ts": [
      "./b/index.d.ts"
    ],
    "./b/index.d.ts": [
      "./c/index.d.ts"
    ]
  },
  "latestChangedDtsFile": "./a/index.d.ts",
  "emitSignatures": [
    {
      "file": "../a/src/index.ts",
      "signature": "166dc830f76f60dbfa1d5ff8e21580de-export declare const stage: import(\"c/src/index.js\").Current;\n",
      "original": [
        4,
        "166dc830f76f60dbfa1d5ff8e21580de-export declare const stage: import(\"c/src/index.js\").Current;\n"
      ]
    }
  ],
  "linkedPackagesSignature": "bf9fc568da2eda7fb0d70936964f4974-../a/node_modules/b -> ../b\n../a/node_modules/b {\"type\":\"module\",\"types\":\"./src/index.ts\"}\n../a/node_modules/c -> ../c\n../a/node_modules/c {\"type\":\"module\",\"types\":\"./src/main.ts\"}\n../b/node_modules/c -> ../c\n../b/node_modules/c {\"type\":\"module\",\"types\":\"./src/main.ts\"}",
  "size": 2428
}
//// [/home/src/workspaces/solution/dist/a/index.d.ts] *modified* 
export declare const stage: import("c/src/index.js").Current;

//// [/home/src/workspaces/solution/dist/b.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[3],"packageJsons":["../b/package.json","../c/package.json"],"missingPackageJsons":["../b/node_modules/c/src/index.js/package.json","../b/node_modules/c/src/package.json"],"fileNames":["lib.es2026.full.d.ts","./c/index.d.ts","../b/src/index.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},"772688f640dfff8943755b05148ff770-export interface Current {\n    readonly stage: string;\n}\nexport declare const current: Current;\n",{"version":"1be45da9493d61c890e76e46bc9e35a5-import { current } from \"c/src/index.js\";\nexport const currentStage = () => current;","signature":"d1346b3ed40bf05c6a20fa24037a99a2-export declare const currentStage: () => import(\"c/src/index.js\").Current;\n","impliedNodeFormat":99}],"fileIdsList":[[2]],"options":{"composite":true,"emitDeclarationOnly":true,"module":199,"noEmitOnError":true,"outDir":"./b","rootDir":"../b/src","strict":true,"tsBuildInfoFile":"./b.tsbuildinfo"},"referencedMap":[[3,1]],"latestChangedDtsFile":"./b/index.d.ts","linkedPackagesSignature":"a55f4c3259e4dc340c2a2a92b9eb89f3-../b/node_modules/c -> ../c\n../b/node_modules/c {\"type\":\"module\",\"types\":\"./src/main.ts\"}"}
//// [/home/src/workspaces/solution/dist/b.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "../b/src/index.ts"
      ],
      "original": 3
    }
  ],
  "packageJsons": [
    "../b/package.json",
    "../c/package.json"
  ],
  "missingPackageJsons": [
    "../b/node_modules/c/src/index.js/package.json",
    "../b/node_modules/c/src/package.json"
  ],
  "fileNames": [
    "lib.es2026.full.d.ts",
    "./c/index.d.ts",
    "../b/src/index.ts"
  ],
  "fileInfos": [
    {
      "fileName": "lib.es2026.full.d.ts",
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
      "fileName": "./c/index.d.ts",
      "version": "772688f640dfff8943755b05148ff770-export interface Current {\n    readonly stage: string;\n}\nexport declare const current: Current;\n",
      "signature": "772688f640dfff8943755b05148ff770-export interface Current {\n    readonly stage: string;\n}\nexport declare const current: Current;\n",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "../b/src/index.ts",
      "version": "1be45da9493d61c890e76e46bc9e35a5-import { current } from \"c/src/index.js\";\nexport const currentStage = () => current;",
      "signature": "d1346b3ed40bf05c6a20fa24037a99a2-export declare const currentStage: () => import(\"c/src/index.js\").Current;\n",
      "impliedNodeFormat": "ESNext",
      "original": {
        "version": "1be45da9493d61c890e76e46bc9e35a5-import { current } from \"c/src/index.js\";\nexport const currentStage = () => current;",
        "signature": "d1346b3ed40bf05c6a20fa24037a99a2-export declare const currentStage: () => import(\"c/src/index.js\").Current;\n",
        "impliedNodeFormat": 99
      }
    }
  ],
  "fileIdsList": [
    [
      "./c/index.d.ts"
    ]
  ],
  "options": {
    "composite": true,
    "emitDeclarationOnly": true,
    "module": 199,
    "noEmitOnError": true,
    "outDir": "./b",
    "rootDir": "../b/src",
    "strict": true,
    "tsBuildInfoFile": "./b.tsbuildinfo"
  },
  "referencedMap": {
    "../b/src/index.ts": [
      "./c/index.d.ts"
    ]
  },
  "latestChangedDtsFile": "./b/index.d.ts",
  "linkedPackagesSignature": "a55f4c3259e4dc340c2a2a92b9eb89f3-../b/node_modules/c -> ../c\n../b/node_modules/c {\"type\":\"module\",\"types\":\"./src/main.ts\"}",
  "size": 1904
}
//// [/home/src/workspaces/solution/dist/c.tsbuildinfo] *mTime changed*

c/tsconfig.json::
SemanticDiagnostics::
Signatures::

b/tsconfig.json::
SemanticDiagnostics::
Signatures::

a/tsconfig.json::
SemanticDiagnostics::
Signatures::


Edit [1]:: no change

tsgo --b --verbose
ExitStatus:: Success
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * c/tsconfig.json
    * b/tsconfig.json
    * a/tsconfig.json
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'c/tsconfig.json' is up to date because newest input 'c/src/main.ts' is older than output 'dist/c.tsbuildinfo'

[[90mHH:MM:SS AM[0m] Project 'b/tsconfig.json' is up to date because newest input 'b/src/index.ts' is older than output 'dist/b.tsbuildinfo'

[[90mHH:MM:SS AM[0m] Project 'a/tsconfig.json' is up to date because newest input 'a/src/index.ts' is older than output 'dist/a.tsbuildinfo'




Edit [2]:: point types of c back to index
//// [/home/src/workspaces/solution/c/package.json] *modified* 
{"name":"c","version":"1.0.0","type":"module","types":"./src/index.ts","dependencies":{}}

tsgo --b --verbose
ExitStatus:: Success
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * c/tsconfig.json
    * b/tsconfig.json
    * a/tsconfig.json
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'c/tsconfig.json' is out of date because output 'dist/c.tsbuildinfo' is older than input 'c/package.json'

[[90mHH:MM:SS AM[0m] Building project 'c/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Updating unchanged output timestamps of project 'c/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'b/tsconfig.json' is out of date because output 'dist/b.tsbuildinfo' is older than input 'c/package.json'

[[90mHH:MM:SS AM[0m] Building project 'b/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'a/tsconfig.json' is out of date because output 'dist/a.tsbuildinfo' is older than input 'c/package.json'

[[90mHH:MM:SS AM[0m] Building project 'a/tsconfig.json'...

//// [/home/src/workspaces/solution/dist/a.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[4],"packageJsons":["../a/package.json","../b/package.json","../c/package.json"],"missingPackageJsons":["../a/node_modules/b/src/package.json","../a/node_modules/c/src/package.json","../b/node_modules/c/src/index.js/package.json","../b/node_modules/c/src/package.json"],"fileNames":["lib.es2026.full.d.ts","./c/index.d.ts","./b/index.d.ts","../a/src/index.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},"772688f640dfff8943755b05148ff770-export interface Current {\n    readonly stage: string;\n}\nexport declare const current: Current;\n","d1346b3ed40bf05c6a20fa24037a99a2-export declare const currentStage: () => import(\"c/src/index.js\").Current;\n",{"version":"58d3d85f395f5825bc9d710f0024af35-import { currentStage } from \"b\";\nexport const stage = currentStage();","signature":"620c9be1975f68589ff91cdbbde3297b-export declare const stage: import(\"c\").Current;\n","impliedNodeFormat":99}],"fileIdsList":[[3],[2]],"options":{"composite":true,"emitDeclarationOnly":true,"module":199,"noEmitOnError":true,"outDir":"./a","rootDir":"../a/src","strict":true,"tsBuildInfoFile":"./a.tsbuildinfo"},"referencedMap":[[4,1],[3,2]],"latestChangedDtsFile":"./a/index.d.ts","linkedPackagesSignature":"a8bdd73a7c24411c788c0ede9f17cb59-../a/node_modules/b -> ../b\n../a/node_modules/b {\"type\":\"module\",\"types\":\"./src/index.ts\"}\n../a/node_modules/c -> ../c\n../a/node_modules/c {\"type\":\"module\",\"types\":\"./src/index.ts\"}\n../b/node_modules/c -> ../c\n../b/node_modules/c {\"type\":\"module\",\"types\":\"./src/index.ts\"}"}
//// [/home/src/workspaces/solution/dist/a.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "../a/src/index.ts"
      ],
      "original": 4
    }
  ],
  "packageJsons": [
    "../a/package.json",
    "../b/package.json",
    "../c/package.json"
  ],
  "missingPackageJsons": [
    "../a/node_modules/b/src/package.json",
    "../a/node_modules/c/src/package.json",
    "../b/node_modules/c/src/index.js/package.json",
    "../b/node_modules/c/src/package.json"
  ],
  "fileNames": [
    "lib.es2026.full.d.ts",
    "./c/index.d.ts",
    "./b/index.d.ts",
    "../a/src/index.ts"
  ],
  "fileInfos": [
    {
      "fileName": "lib.es2026.full.d.ts",
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
      "fileName": "./c/index.d.ts",
      "version": "772688f640dfff8943755b05148ff770-export interface Current {\n    readonly stage: string;\n}\nexport declare const current: Current;\n",
      "signature": "772688f640dfff8943755b05148ff770-export interface Current {\n    readonly stage: string;\n}\nexport declare const current: Current;\n",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "./b/index.d.ts",
      "version": "d1346b3ed40bf05c6a20fa24037a99a2-export declare const currentStage: () => import(\"c/src/index.js\").Current;\n",
      "signature": "d1346b3ed40bf05c6a20fa24037a99a2-export declare const currentStage: () => import(\"c/src/index.js\").Current;\n",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "../a/src/index.ts",
      "version": "58d3d85f395f5825bc9d710f0024af35-import { currentStage } from \"b\";\nexport const stage = currentStage();",
      "signature": "620c9be1975f68589ff91cdbbde3297b-export declare const stage: import(\"c\").Current;\n",
      "impliedNodeFormat": "ESNext",
      "original": {
        "version": "58d3d85f395f5825bc9d710f0024af35-import { currentStage } from \"b\";\nexport const stage = currentStage();",
        "signature": "620c9be1975f68589ff91cdbbde3297b-export declare const stage: import(\"c\").Current;\n",
        "impliedNodeFormat": 99
      }
    }
  ],
  "fileIdsList": [
    [
      "./b/index.d.ts"
    ],
    [
      "./c/index.d.ts"
    ]
  ],
  "options": {
    "composite": true,
    "emitDeclarationOnly": true,
    "module": 199,
    "noEmitOnError": true,
    "outDir": "./a",
    "rootDir": "../a/src",
    "strict": true,
    "tsBuildInfoFile": "./a.tsbuildinfo"
  },
  "referencedMap": {
    "../a/src/index.ts": [
      "./b/index.d.ts"
    ],
    "./b/index.d.ts": [
      "./c/index.d.ts"
    ]
  },
  "latestChangedDtsFile": "./a/index.d.ts",
  "linkedPackagesSignature": "a8bdd73a7c24411c788c0ede9f17cb59-../a/node_modules/b -> ../b\n../a/node_modules/b {\"type\":\"module\",\"types\":\"./src/index.ts\"}\n../a/node_modules/c -> ../c\n../a/node_modules/c {\"type\":\"module\",\"types\":\"./src/index.ts\"}\n../b/node_modules/c -> ../c\n../b/node_modules/c {\"type\":\"module\",\"types\":\"./src/index.ts\"}",
  "size": 2306
}
//// [/home/src/workspaces/solution/dist/a/index.d.ts] *modified* 
export declare const stage: import("c").Current;

//// [/home/src/workspaces/solution/dist/b.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[3],"packageJsons":["../b/package.json","../c/package.json"],"missingPackageJsons":["../b/node_modules/c/src/index.js/package.json","../b/node_modules/c/src/package.json"],"fileNames":["lib.es2026.full.d.ts","./c/index.d.ts","../b/src/index.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},"772688f640dfff8943755b05148ff770-export interface Current {\n    readonly stage: string;\n}\nexport declare const current: Current;\n",{"version":"1be45da9493d61c890e76e46bc9e35a5-import { current } from \"c/src/index.js\";\nexport const currentStage = () => current;","signature":"d1346b3ed40bf05c6a20fa24037a99a2-export declare const currentStage: () => import(\"c/src/index.js\").Current;\n","impliedNodeFormat":99}],"fileIdsList":[[2]],"options":{"composite":true,"emitDeclarationOnly":true,"module":199,"noEmitOnError":true,"outDir":"./b","rootDir":"../b/src","strict":true,"tsBuildInfoFile":"./b.tsbuildinfo"},"referencedMap":[[3,1]],"latestChangedDtsFile":"./b/index.d.ts","linkedPackagesSignature":"3ddb9b35e40e855c208d52b982bd5b19-../b/node_modules/c -> ../c\n../b/node_modules/c {\"type\":\"module\",\"types\":\"./src/index.ts\"}"}
//// [/home/src/workspaces/solution/dist/b.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "../b/src/index.ts"
      ],
      "original": 3
    }
  ],
  "packageJsons": [
    "../b/package.json",
    "../c/package.json"
  ],
  "missingPackageJsons": [
    "../b/node_modules/c/src/index.js/package.json",
    "../b/node_modules/c/src/package.json"
  ],
  "fileNames": [
    "lib.es2026.full.d.ts",
    "./c/index.d.ts",
    "../b/src/index.ts"
  ],
  "fileInfos": [
    {
      "fileName": "lib.es2026.full.d.ts",
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
      "fileName": "./c/index.d.ts",
      "version": "772688f640dfff8943755b05148ff770-export interface Current {\n    readonly stage: string;\n}\nexport declare const current: Current;\n",
      "signature": "772688f640dfff8943755b05148ff770-export interface Current {\n    readonly stage: string;\n}\nexport declare const current: Current;\n",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "../b/src/index.ts",
      "version": "1be45da9493d61c890e76e46bc9e35a5-import { current } from \"c/src/index.js\";\nexport const currentStage = () => current;",
      "signature": "d1346b3ed40bf05c6a20fa24037a99a2-export declare const currentStage: () => import(\"c/src/index.js\").Current;\n",
      "impliedNodeFormat": "ESNext",
      "original": {
        "version": "1be45da9493d61c890e76e46bc9e35a5-import { current } from \"c/src/index.js\";\nexport const currentStage = () => current;",
        "signature": "d1346b3ed40bf05c6a20fa24037a99a2-export declare const currentStage: () => import(\"c/src/index.js\").Current;\n",
        "impliedNodeFormat": 99
      }
    }
  ],
  "fileIdsList": [
    [
      "./c/index.d.ts"
    ]
  ],
  "options": {
    "composite": true,
    "emitDeclarationOnly": true,
    "module": 199,
    "noEmitOnError": true,
    "outDir": "./b",
    "rootDir": "../b/src",
    "strict": true,
    "tsBuildInfoFile": "./b.tsbuildinfo"
  },
  "referencedMap": {
    "../b/src/index.ts": [
      "./c/index.d.ts"
    ]
  },
  "latestChangedDtsFile": "./b/index.d.ts",
  "linkedPackagesSignature": "3ddb9b35e40e855c208d52b982bd5b19-../b/node_modules/c -> ../c\n../b/node_modules/c {\"type\":\"module\",\"types\":\"./src/index.ts\"}",
  "size": 1905
}
//// [/home/src/workspaces/solution/dist/c.tsbuildinfo] *mTime changed*

c/tsconfig.json::
SemanticDiagnostics::
Signatures::

b/tsconfig.json::
SemanticDiagnostics::
Signatures::

a/tsconfig.json::
SemanticDiagnostics::
Signatures::


Edit [3]:: no change

tsgo --b --verbose
ExitStatus:: Success
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * c/tsconfig.json
    * b/tsconfig.json
    * a/tsconfig.json
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'c/tsconfig.json' is up to date because newest input 'c/src/main.ts' is older than output 'dist/c.tsbuildinfo'

[[90mHH:MM:SS AM[0m] Project 'b/tsconfig.json' is up to date because newest input 'b/src/index.ts' is older than output 'dist/b.tsbuildinfo'

[[90mHH:MM:SS AM[0m] Project 'a/tsconfig.json' is up to date because newest input 'a/src/index.ts' is older than output 'dist/a.tsbuildinfo'


