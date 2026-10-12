currentDirectory::/home/src/workspaces/project
useCaseSensitiveFileNames::true
Input::
//// [/home/src/workspaces/project/producer/index.ts] *new* 
import { input as a } from 'first';
import { input as b } from 'second';
export const result = [a, b];

//// [/home/src/workspaces/project/producer/node_modules/first/index.d.ts] *new* 
export { input } from 'dependency';

//// [/home/src/workspaces/project/producer/node_modules/first/node_modules/dependency/index.d.ts] *new* 
export const input: 'first';

//// [/home/src/workspaces/project/producer/node_modules/first/node_modules/dependency/package.json] *new* 
{"name":"dependency","version":"1.0.0","types":"index.d.ts"}
//// [/home/src/workspaces/project/producer/node_modules/first/package.json] *new* 
{"name":"first","version":"1.0.0","types":"index.d.ts"}
//// [/home/src/workspaces/project/producer/node_modules/second/index.d.ts] *new* 
export { input } from 'dependency';

//// [/home/src/workspaces/project/producer/node_modules/second/node_modules/dependency/index.d.ts] *new* 
export const input: 'second';

//// [/home/src/workspaces/project/producer/node_modules/second/node_modules/dependency/package.json] *new* 
{"name":"dependency","version":"1.0.0","types":"index.d.ts"}
//// [/home/src/workspaces/project/producer/node_modules/second/package.json] *new* 
{"name":"second","version":"1.0.0","types":"index.d.ts"}
//// [/home/src/workspaces/project/producer/tsconfig.json] *new* 
{
    "compilerOptions": {
        "composite": true,
        "declaration": true,
        "deduplicatePackages": false,
        "emitDeclarationOnly": true,
        "lib": [
            "es2020"
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
export declare const result: ("first" | "second")[];

//// [/home/src/workspaces/project/producer/dist/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":[6],"packageJsons":["../node_modules/first/node_modules/dependency/package.json","../node_modules/first/package.json","../node_modules/second/node_modules/dependency/package.json","../node_modules/second/package.json"],"fileNames":["lib.es2020.d.ts","../node_modules/first/node_modules/dependency/index.d.ts","../node_modules/first/index.d.ts","../node_modules/second/node_modules/dependency/index.d.ts","../node_modules/second/index.d.ts","../index.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},"8314dc361a146d40f123a1696028ad63-export const input: 'first';\n","7f7c915aaec78d3b8809e464f7ce1464-export { input } from 'dependency';\n","2be5566647752018a2f34c167fe6f053-export const input: 'second';\n","7f7c915aaec78d3b8809e464f7ce1464-export { input } from 'dependency';\n",{"version":"c48cd4fc72f2e3723fd9cb54f2cbab0c-import { input as a } from 'first';\nimport { input as b } from 'second';\nexport const result = [a, b];\n","signature":"e96591b5ed8dde6e90e57827d7658d94-export declare const result: (\"first\" | \"second\")[];\n","impliedNodeFormat":1}],"fileIdsList":[[3,5],[2],[4]],"options":{"composite":true,"emitDeclarationOnly":true,"declaration":true,"module":99,"outDir":"./","rootDir":"..","strict":true,"target":7},"referencedMap":[[6,1],[3,2],[5,3]],"latestChangedDtsFile":"./index.d.ts"}
//// [/home/src/workspaces/project/producer/dist/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "../index.ts"
      ],
      "original": 6
    }
  ],
  "packageJsons": [
    "../node_modules/first/node_modules/dependency/package.json",
    "../node_modules/first/package.json",
    "../node_modules/second/node_modules/dependency/package.json",
    "../node_modules/second/package.json"
  ],
  "fileNames": [
    "lib.es2020.d.ts",
    "../node_modules/first/node_modules/dependency/index.d.ts",
    "../node_modules/first/index.d.ts",
    "../node_modules/second/node_modules/dependency/index.d.ts",
    "../node_modules/second/index.d.ts",
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
      "fileName": "../node_modules/first/node_modules/dependency/index.d.ts",
      "version": "8314dc361a146d40f123a1696028ad63-export const input: 'first';\n",
      "signature": "8314dc361a146d40f123a1696028ad63-export const input: 'first';\n",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "../node_modules/first/index.d.ts",
      "version": "7f7c915aaec78d3b8809e464f7ce1464-export { input } from 'dependency';\n",
      "signature": "7f7c915aaec78d3b8809e464f7ce1464-export { input } from 'dependency';\n",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "../node_modules/second/node_modules/dependency/index.d.ts",
      "version": "2be5566647752018a2f34c167fe6f053-export const input: 'second';\n",
      "signature": "2be5566647752018a2f34c167fe6f053-export const input: 'second';\n",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "../node_modules/second/index.d.ts",
      "version": "7f7c915aaec78d3b8809e464f7ce1464-export { input } from 'dependency';\n",
      "signature": "7f7c915aaec78d3b8809e464f7ce1464-export { input } from 'dependency';\n",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "../index.ts",
      "version": "c48cd4fc72f2e3723fd9cb54f2cbab0c-import { input as a } from 'first';\nimport { input as b } from 'second';\nexport const result = [a, b];\n",
      "signature": "e96591b5ed8dde6e90e57827d7658d94-export declare const result: (\"first\" | \"second\")[];\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "c48cd4fc72f2e3723fd9cb54f2cbab0c-import { input as a } from 'first';\nimport { input as b } from 'second';\nexport const result = [a, b];\n",
        "signature": "e96591b5ed8dde6e90e57827d7658d94-export declare const result: (\"first\" | \"second\")[];\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "fileIdsList": [
    [
      "../node_modules/first/index.d.ts",
      "../node_modules/second/index.d.ts"
    ],
    [
      "../node_modules/first/node_modules/dependency/index.d.ts"
    ],
    [
      "../node_modules/second/node_modules/dependency/index.d.ts"
    ]
  ],
  "options": {
    "composite": true,
    "emitDeclarationOnly": true,
    "declaration": true,
    "module": 99,
    "outDir": "./",
    "rootDir": "..",
    "strict": true,
    "target": 7
  },
  "referencedMap": {
    "../index.ts": [
      "../node_modules/first/index.d.ts",
      "../node_modules/second/index.d.ts"
    ],
    "../node_modules/first/index.d.ts": [
      "../node_modules/first/node_modules/dependency/index.d.ts"
    ],
    "../node_modules/second/index.d.ts": [
      "../node_modules/second/node_modules/dependency/index.d.ts"
    ]
  },
  "latestChangedDtsFile": "./index.d.ts",
  "size": 2079
}

producer/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es2020.d.ts
*refresh*    /home/src/workspaces/project/producer/node_modules/first/node_modules/dependency/index.d.ts
*refresh*    /home/src/workspaces/project/producer/node_modules/first/index.d.ts
*refresh*    /home/src/workspaces/project/producer/node_modules/second/node_modules/dependency/index.d.ts
*refresh*    /home/src/workspaces/project/producer/node_modules/second/index.d.ts
*refresh*    /home/src/workspaces/project/producer/index.ts
Signatures::
(stored at emit) /home/src/workspaces/project/producer/index.ts


Edit [0]:: no change

tsgo --build producer --verbose
ExitStatus:: Success
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * producer/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'producer/tsconfig.json' is up to date because newest input 'producer/index.ts' is older than output 'producer/dist/tsconfig.tsbuildinfo'




Edit [1]:: change deduplicatePackages without changing source files
//// [/home/src/workspaces/project/producer/tsconfig.json] *modified* 
{
    "compilerOptions": {
        "composite": true,
        "declaration": true,
        "deduplicatePackages": true,
        "emitDeclarationOnly": true,
        "lib": [
            "es2020"
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

tsgo --build producer --verbose
ExitStatus:: Success
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * producer/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'producer/tsconfig.json' is out of date because output 'producer/dist/tsconfig.tsbuildinfo' is older than input 'producer/tsconfig.json'

[[90mHH:MM:SS AM[0m] Building project 'producer/tsconfig.json'...

//// [/home/src/workspaces/project/producer/dist/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[5],"packageJsons":["../node_modules/first/node_modules/dependency/package.json","../node_modules/first/package.json","../node_modules/second/node_modules/dependency/package.json","../node_modules/second/package.json"],"fileNames":["lib.es2020.d.ts","../node_modules/first/node_modules/dependency/index.d.ts","../node_modules/first/index.d.ts","../node_modules/second/index.d.ts","../index.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},"8314dc361a146d40f123a1696028ad63-export const input: 'first';\n","7f7c915aaec78d3b8809e464f7ce1464-export { input } from 'dependency';\n","7f7c915aaec78d3b8809e464f7ce1464-export { input } from 'dependency';\n",{"version":"c48cd4fc72f2e3723fd9cb54f2cbab0c-import { input as a } from 'first';\nimport { input as b } from 'second';\nexport const result = [a, b];\n","signature":"e96591b5ed8dde6e90e57827d7658d94-export declare const result: (\"first\" | \"second\")[];\n","impliedNodeFormat":1}],"fileIdsList":[[3,4],[2]],"options":{"composite":true,"emitDeclarationOnly":true,"declaration":true,"module":99,"outDir":"./","rootDir":"..","strict":true,"target":7},"referencedMap":[[5,1],[3,2],[4,2]],"latestChangedDtsFile":"./index.d.ts"}
//// [/home/src/workspaces/project/producer/dist/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "../index.ts"
      ],
      "original": 5
    }
  ],
  "packageJsons": [
    "../node_modules/first/node_modules/dependency/package.json",
    "../node_modules/first/package.json",
    "../node_modules/second/node_modules/dependency/package.json",
    "../node_modules/second/package.json"
  ],
  "fileNames": [
    "lib.es2020.d.ts",
    "../node_modules/first/node_modules/dependency/index.d.ts",
    "../node_modules/first/index.d.ts",
    "../node_modules/second/index.d.ts",
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
      "fileName": "../node_modules/first/node_modules/dependency/index.d.ts",
      "version": "8314dc361a146d40f123a1696028ad63-export const input: 'first';\n",
      "signature": "8314dc361a146d40f123a1696028ad63-export const input: 'first';\n",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "../node_modules/first/index.d.ts",
      "version": "7f7c915aaec78d3b8809e464f7ce1464-export { input } from 'dependency';\n",
      "signature": "7f7c915aaec78d3b8809e464f7ce1464-export { input } from 'dependency';\n",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "../node_modules/second/index.d.ts",
      "version": "7f7c915aaec78d3b8809e464f7ce1464-export { input } from 'dependency';\n",
      "signature": "7f7c915aaec78d3b8809e464f7ce1464-export { input } from 'dependency';\n",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "../index.ts",
      "version": "c48cd4fc72f2e3723fd9cb54f2cbab0c-import { input as a } from 'first';\nimport { input as b } from 'second';\nexport const result = [a, b];\n",
      "signature": "e96591b5ed8dde6e90e57827d7658d94-export declare const result: (\"first\" | \"second\")[];\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "c48cd4fc72f2e3723fd9cb54f2cbab0c-import { input as a } from 'first';\nimport { input as b } from 'second';\nexport const result = [a, b];\n",
        "signature": "e96591b5ed8dde6e90e57827d7658d94-export declare const result: (\"first\" | \"second\")[];\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "fileIdsList": [
    [
      "../node_modules/first/index.d.ts",
      "../node_modules/second/index.d.ts"
    ],
    [
      "../node_modules/first/node_modules/dependency/index.d.ts"
    ]
  ],
  "options": {
    "composite": true,
    "emitDeclarationOnly": true,
    "declaration": true,
    "module": 99,
    "outDir": "./",
    "rootDir": "..",
    "strict": true,
    "target": 7
  },
  "referencedMap": {
    "../index.ts": [
      "../node_modules/first/index.d.ts",
      "../node_modules/second/index.d.ts"
    ],
    "../node_modules/first/index.d.ts": [
      "../node_modules/first/node_modules/dependency/index.d.ts"
    ],
    "../node_modules/second/index.d.ts": [
      "../node_modules/first/node_modules/dependency/index.d.ts"
    ]
  },
  "latestChangedDtsFile": "./index.d.ts",
  "size": 1948
}

producer/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/workspaces/project/producer/node_modules/second/index.d.ts
Signatures::
(used version)   /home/src/workspaces/project/producer/node_modules/second/index.d.ts


Diff:: Changing deduplicatePackages without editing source files leaves stale output or diagnostics.
--- nonIncremental /home/src/workspaces/project/producer/dist/index.d.ts
+++ incremental /home/src/workspaces/project/producer/dist/index.d.ts
@@ -1,1 +1,1 @@
-export declare const result: "first"[];
+export declare const result: ("first" | "second")[];


Edit [2]:: no change

tsgo --build producer --verbose
ExitStatus:: Success
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * producer/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'producer/tsconfig.json' is up to date because newest input 'producer/index.ts' is older than output 'producer/dist/tsconfig.tsbuildinfo'




Diff:: Changing deduplicatePackages without editing source files leaves stale output or diagnostics.
--- nonIncremental /home/src/workspaces/project/producer/dist/index.d.ts
+++ incremental /home/src/workspaces/project/producer/dist/index.d.ts
@@ -1,1 +1,1 @@
-export declare const result: "first"[];
+export declare const result: ("first" | "second")[];


Edit [3]:: force rebuild with the same compiler options

tsgo --build producer --verbose --force
ExitStatus:: Success
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * producer/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'producer/tsconfig.json' is being forcibly rebuilt

[[90mHH:MM:SS AM[0m] Building project 'producer/tsconfig.json'...

//// [/home/src/workspaces/project/producer/dist/index.d.ts] *modified* 
export declare const result: "first"[];

//// [/home/src/workspaces/project/producer/dist/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[5],"packageJsons":["../node_modules/first/node_modules/dependency/package.json","../node_modules/first/package.json","../node_modules/second/node_modules/dependency/package.json","../node_modules/second/package.json"],"fileNames":["lib.es2020.d.ts","../node_modules/first/node_modules/dependency/index.d.ts","../node_modules/first/index.d.ts","../node_modules/second/index.d.ts","../index.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},"8314dc361a146d40f123a1696028ad63-export const input: 'first';\n","7f7c915aaec78d3b8809e464f7ce1464-export { input } from 'dependency';\n","7f7c915aaec78d3b8809e464f7ce1464-export { input } from 'dependency';\n",{"version":"c48cd4fc72f2e3723fd9cb54f2cbab0c-import { input as a } from 'first';\nimport { input as b } from 'second';\nexport const result = [a, b];\n","signature":"4fa89edf3c871627b0eabe835299a013-export declare const result: \"first\"[];\n","impliedNodeFormat":1}],"fileIdsList":[[3,4],[2]],"options":{"composite":true,"emitDeclarationOnly":true,"declaration":true,"module":99,"outDir":"./","rootDir":"..","strict":true,"target":7},"referencedMap":[[5,1],[3,2],[4,2]],"latestChangedDtsFile":"./index.d.ts"}
//// [/home/src/workspaces/project/producer/dist/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "../index.ts"
      ],
      "original": 5
    }
  ],
  "packageJsons": [
    "../node_modules/first/node_modules/dependency/package.json",
    "../node_modules/first/package.json",
    "../node_modules/second/node_modules/dependency/package.json",
    "../node_modules/second/package.json"
  ],
  "fileNames": [
    "lib.es2020.d.ts",
    "../node_modules/first/node_modules/dependency/index.d.ts",
    "../node_modules/first/index.d.ts",
    "../node_modules/second/index.d.ts",
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
      "fileName": "../node_modules/first/node_modules/dependency/index.d.ts",
      "version": "8314dc361a146d40f123a1696028ad63-export const input: 'first';\n",
      "signature": "8314dc361a146d40f123a1696028ad63-export const input: 'first';\n",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "../node_modules/first/index.d.ts",
      "version": "7f7c915aaec78d3b8809e464f7ce1464-export { input } from 'dependency';\n",
      "signature": "7f7c915aaec78d3b8809e464f7ce1464-export { input } from 'dependency';\n",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "../node_modules/second/index.d.ts",
      "version": "7f7c915aaec78d3b8809e464f7ce1464-export { input } from 'dependency';\n",
      "signature": "7f7c915aaec78d3b8809e464f7ce1464-export { input } from 'dependency';\n",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "../index.ts",
      "version": "c48cd4fc72f2e3723fd9cb54f2cbab0c-import { input as a } from 'first';\nimport { input as b } from 'second';\nexport const result = [a, b];\n",
      "signature": "4fa89edf3c871627b0eabe835299a013-export declare const result: \"first\"[];\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "c48cd4fc72f2e3723fd9cb54f2cbab0c-import { input as a } from 'first';\nimport { input as b } from 'second';\nexport const result = [a, b];\n",
        "signature": "4fa89edf3c871627b0eabe835299a013-export declare const result: \"first\"[];\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "fileIdsList": [
    [
      "../node_modules/first/index.d.ts",
      "../node_modules/second/index.d.ts"
    ],
    [
      "../node_modules/first/node_modules/dependency/index.d.ts"
    ]
  ],
  "options": {
    "composite": true,
    "emitDeclarationOnly": true,
    "declaration": true,
    "module": 99,
    "outDir": "./",
    "rootDir": "..",
    "strict": true,
    "target": 7
  },
  "referencedMap": {
    "../index.ts": [
      "../node_modules/first/index.d.ts",
      "../node_modules/second/index.d.ts"
    ],
    "../node_modules/first/index.d.ts": [
      "../node_modules/first/node_modules/dependency/index.d.ts"
    ],
    "../node_modules/second/index.d.ts": [
      "../node_modules/first/node_modules/dependency/index.d.ts"
    ]
  },
  "latestChangedDtsFile": "./index.d.ts",
  "size": 1933
}

producer/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es2020.d.ts
*refresh*    /home/src/workspaces/project/producer/node_modules/first/node_modules/dependency/index.d.ts
*refresh*    /home/src/workspaces/project/producer/node_modules/first/index.d.ts
*refresh*    /home/src/workspaces/project/producer/node_modules/second/index.d.ts
*refresh*    /home/src/workspaces/project/producer/index.ts
Signatures::
(stored at emit) /home/src/workspaces/project/producer/index.ts


Edit [4]:: no change

tsgo --build producer --verbose
ExitStatus:: Success
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * producer/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'producer/tsconfig.json' is up to date because newest input 'producer/index.ts' is older than output 'producer/dist/tsconfig.tsbuildinfo'


