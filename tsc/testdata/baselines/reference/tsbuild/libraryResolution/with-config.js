currentDirectory::/home/src/workspace/projects
useCaseSensitiveFileNames::true
Input::
//// [/home/src/tslibs/TS/Lib/lib.dom.d.ts] *new* 
interface DOMInterface { }
//// [/home/src/tslibs/TS/Lib/lib.scripthost.d.ts] *new* 
interface ScriptHostInterface { }
//// [/home/src/tslibs/TS/Lib/lib.webworker.d.ts] *new* 
interface WebWorkerInterface { }
//// [/home/src/workspace/projects/node_modules/@typescript/unlreated/index.d.ts] *new* 
export const unrelated = 10;
//// [/home/src/workspace/projects/project1/core.d.ts] *new* 
export const core = 10;
//// [/home/src/workspace/projects/project1/file.ts] *new* 
export const file = 10;
//// [/home/src/workspace/projects/project1/file2.ts] *new* 
/// <reference lib="webworker"/>
/// <reference lib="scripthost"/>
/// <reference lib="es5"/>
//// [/home/src/workspace/projects/project1/index.ts] *new* 
export const x = "type1";
//// [/home/src/workspace/projects/project1/tsconfig.json] *new* 
{
    "compilerOptions": {
        "composite": true,
        "typeRoots": ["./typeroot1"],
        "lib": ["es5", "dom"],
        "traceResolution": true,
        "libReplacement": false
    }
}
//// [/home/src/workspace/projects/project1/typeroot1/sometype/index.d.ts] *new* 
export type TheNum = "type1";
//// [/home/src/workspace/projects/project1/utils.d.ts] *new* 
export const y = 10;
//// [/home/src/workspace/projects/project2/index.ts] *new* 
export const y = 10
//// [/home/src/workspace/projects/project2/tsconfig.json] *new* 
{
    "compilerOptions": {
        "composite": true,
        "lib": ["es5", "dom"],
        "traceResolution": true,
        "libReplacement": false
    }
}
//// [/home/src/workspace/projects/project2/utils.d.ts] *new* 
export const y = 10;
//// [/home/src/workspace/projects/project3/index.ts] *new* 
export const z = 10
//// [/home/src/workspace/projects/project3/tsconfig.json] *new* 
{
    "compilerOptions": {
        "composite": true,
        "lib": ["es5", "dom"],
        "traceResolution": true,
        "libReplacement": false
    }
}
//// [/home/src/workspace/projects/project3/utils.d.ts] *new* 
export const y = 10;
//// [/home/src/workspace/projects/project4/index.ts] *new* 
export const z = 10
//// [/home/src/workspace/projects/project4/tsconfig.json] *new* 
{
    "compilerOptions": {
        "composite": true,
        "lib": ["esnext", "dom", "webworker"],
        "traceResolution": true,
        "libReplacement": false
    }
}
//// [/home/src/workspace/projects/project4/utils.d.ts] *new* 
export const y = 10;

tsgo -b project1 project2 project3 project4 --verbose --explainFiles
ExitStatus:: Success
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * project1/tsconfig.json
    * project2/tsconfig.json
    * project3/tsconfig.json
    * project4/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'project1/tsconfig.json' is out of date because output file 'project1/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project 'project1/tsconfig.json'...

======== Resolving type reference directive 'sometype', containing file '/home/src/workspace/projects/project1/__inferred type names__.ts', root directory '/home/src/workspace/projects/project1/typeroot1'. ========
Resolving with primary search path '/home/src/workspace/projects/project1/typeroot1'.
File '/home/src/workspace/projects/project1/typeroot1/sometype.d.ts' does not exist.
File '/home/src/workspace/projects/project1/typeroot1/sometype/package.json' does not exist.
File '/home/src/workspace/projects/project1/typeroot1/sometype/index.d.ts' exists - use it as a name resolution result.
Resolving real path for '/home/src/workspace/projects/project1/typeroot1/sometype/index.d.ts', result '/home/src/workspace/projects/project1/typeroot1/sometype/index.d.ts'.
======== Type reference directive 'sometype' was successfully resolved to '/home/src/workspace/projects/project1/typeroot1/sometype/index.d.ts', primary: true. ========
../../tslibs/TS/Lib/lib.es5.d.ts
   Library referenced via 'es5' from file 'project1/file2.ts'
   Library 'lib.es5.d.ts' specified in compilerOptions
../../tslibs/TS/Lib/lib.dom.d.ts
   Library 'lib.dom.d.ts' specified in compilerOptions
../../tslibs/TS/Lib/lib.webworker.d.ts
   Library referenced via 'webworker' from file 'project1/file2.ts'
../../tslibs/TS/Lib/lib.scripthost.d.ts
   Library referenced via 'scripthost' from file 'project1/file2.ts'
project1/core.d.ts
   Matched by default include pattern '**/*'
project1/file.ts
   Matched by default include pattern '**/*'
project1/file2.ts
   Matched by default include pattern '**/*'
project1/index.ts
   Matched by default include pattern '**/*'
project1/utils.d.ts
   Matched by default include pattern '**/*'
project1/typeroot1/sometype/index.d.ts
   Matched by default include pattern '**/*'
   Entry point for implicit type library 'sometype'
[[90mHH:MM:SS AM[0m] Project 'project2/tsconfig.json' is out of date because output file 'project2/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project 'project2/tsconfig.json'...

../../tslibs/TS/Lib/lib.es5.d.ts
   Library 'lib.es5.d.ts' specified in compilerOptions
../../tslibs/TS/Lib/lib.dom.d.ts
   Library 'lib.dom.d.ts' specified in compilerOptions
project2/index.ts
   Matched by default include pattern '**/*'
project2/utils.d.ts
   Matched by default include pattern '**/*'
[[90mHH:MM:SS AM[0m] Project 'project3/tsconfig.json' is out of date because output file 'project3/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project 'project3/tsconfig.json'...

../../tslibs/TS/Lib/lib.es5.d.ts
   Library 'lib.es5.d.ts' specified in compilerOptions
../../tslibs/TS/Lib/lib.dom.d.ts
   Library 'lib.dom.d.ts' specified in compilerOptions
project3/index.ts
   Matched by default include pattern '**/*'
project3/utils.d.ts
   Matched by default include pattern '**/*'
[[90mHH:MM:SS AM[0m] Project 'project4/tsconfig.json' is out of date because output file 'project4/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project 'project4/tsconfig.json'...

../../tslibs/TS/Lib/lib.esnext.d.ts
   Library 'lib.esnext.d.ts' specified in compilerOptions
../../tslibs/TS/Lib/lib.dom.d.ts
   Library 'lib.dom.d.ts' specified in compilerOptions
../../tslibs/TS/Lib/lib.webworker.d.ts
   Library 'lib.webworker.d.ts' specified in compilerOptions
project4/index.ts
   Matched by default include pattern '**/*'
project4/utils.d.ts
   Matched by default include pattern '**/*'
//// [/home/src/tslibs/TS/Lib/lib.es5.d.ts] *Lib*
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
//// [/home/src/tslibs/TS/Lib/lib.esnext.d.ts] *Lib*
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
//// [/home/src/workspace/projects/project1/file.d.ts] *new* 
export declare const file = 10;

//// [/home/src/workspace/projects/project1/file.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.file = void 0;
exports.file = 10;

//// [/home/src/workspace/projects/project1/file2.d.ts] *new* 

//// [/home/src/workspace/projects/project1/file2.js] *new* 
/// <reference lib="webworker"/>
/// <reference lib="scripthost"/>
/// <reference lib="es5"/>

//// [/home/src/workspace/projects/project1/index.d.ts] *new* 
export declare const x = "type1";

//// [/home/src/workspace/projects/project1/index.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = "type1";

//// [/home/src/workspace/projects/project1/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":[[5,10]],"fileNames":["lib.es5.d.ts","lib.dom.d.ts","lib.webworker.d.ts","lib.scripthost.d.ts","./core.d.ts","./file.ts","./file2.ts","./index.ts","./utils.d.ts","./typeroot1/sometype/index.d.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"d9b7428535134fcb21dad91303dc6311-interface DOMInterface { }","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"95c5e18b7871b756fb3bb843e03aa05d-interface WebWorkerInterface { }","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"2fa71959819338965a3c6b2122d95c96-interface ScriptHostInterface { }","affectsGlobalScope":true,"impliedNodeFormat":1},"a1f9b824326bab2c3c8f13eccf69f182-export const core = 10;",{"version":"69c4ea0c9ff13ab7fc078607d9363624-export const file = 10;","signature":"a224c1b0cbd2f5fe611e588db48243cb-export declare const file = 10;\n","impliedNodeFormat":1},{"version":"76f8c505d1aaf1122ce1da0807c21477-/// <reference lib=\"webworker\"/>\n/// <reference lib=\"scripthost\"/>\n/// <reference lib=\"es5\"/>","signature":"99aa06d3014798d86001c324468d497f-","impliedNodeFormat":1},{"version":"aeb695aed936d7539a32fc3cd25af558-export const x = \"type1\";","signature":"e2f8d12de2edba256e37cf4a656ac52d-export declare const x = \"type1\";\n","impliedNodeFormat":1},"4e905e76b648aae5f92e8bd5418e19b3-export const y = 10;","6bf5e0a71dae6fccf68b93fbbb73f178-export type TheNum = \"type1\";"],"options":{"composite":true},"latestChangedDtsFile":"./index.d.ts"}
//// [/home/src/workspace/projects/project1/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./core.d.ts",
        "./file.ts",
        "./file2.ts",
        "./index.ts",
        "./utils.d.ts",
        "./typeroot1/sometype/index.d.ts"
      ],
      "original": [
        5,
        10
      ]
    }
  ],
  "fileNames": [
    "lib.es5.d.ts",
    "lib.dom.d.ts",
    "lib.webworker.d.ts",
    "lib.scripthost.d.ts",
    "./core.d.ts",
    "./file.ts",
    "./file2.ts",
    "./index.ts",
    "./utils.d.ts",
    "./typeroot1/sometype/index.d.ts"
  ],
  "fileInfos": [
    {
      "fileName": "lib.es5.d.ts",
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
      "fileName": "lib.dom.d.ts",
      "version": "d9b7428535134fcb21dad91303dc6311-interface DOMInterface { }",
      "signature": "d9b7428535134fcb21dad91303dc6311-interface DOMInterface { }",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "d9b7428535134fcb21dad91303dc6311-interface DOMInterface { }",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "lib.webworker.d.ts",
      "version": "95c5e18b7871b756fb3bb843e03aa05d-interface WebWorkerInterface { }",
      "signature": "95c5e18b7871b756fb3bb843e03aa05d-interface WebWorkerInterface { }",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "95c5e18b7871b756fb3bb843e03aa05d-interface WebWorkerInterface { }",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "lib.scripthost.d.ts",
      "version": "2fa71959819338965a3c6b2122d95c96-interface ScriptHostInterface { }",
      "signature": "2fa71959819338965a3c6b2122d95c96-interface ScriptHostInterface { }",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "2fa71959819338965a3c6b2122d95c96-interface ScriptHostInterface { }",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./core.d.ts",
      "version": "a1f9b824326bab2c3c8f13eccf69f182-export const core = 10;",
      "signature": "a1f9b824326bab2c3c8f13eccf69f182-export const core = 10;",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "./file.ts",
      "version": "69c4ea0c9ff13ab7fc078607d9363624-export const file = 10;",
      "signature": "a224c1b0cbd2f5fe611e588db48243cb-export declare const file = 10;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "69c4ea0c9ff13ab7fc078607d9363624-export const file = 10;",
        "signature": "a224c1b0cbd2f5fe611e588db48243cb-export declare const file = 10;\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./file2.ts",
      "version": "76f8c505d1aaf1122ce1da0807c21477-/// <reference lib=\"webworker\"/>\n/// <reference lib=\"scripthost\"/>\n/// <reference lib=\"es5\"/>",
      "signature": "99aa06d3014798d86001c324468d497f-",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "76f8c505d1aaf1122ce1da0807c21477-/// <reference lib=\"webworker\"/>\n/// <reference lib=\"scripthost\"/>\n/// <reference lib=\"es5\"/>",
        "signature": "99aa06d3014798d86001c324468d497f-",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./index.ts",
      "version": "aeb695aed936d7539a32fc3cd25af558-export const x = \"type1\";",
      "signature": "e2f8d12de2edba256e37cf4a656ac52d-export declare const x = \"type1\";\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "aeb695aed936d7539a32fc3cd25af558-export const x = \"type1\";",
        "signature": "e2f8d12de2edba256e37cf4a656ac52d-export declare const x = \"type1\";\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./utils.d.ts",
      "version": "4e905e76b648aae5f92e8bd5418e19b3-export const y = 10;",
      "signature": "4e905e76b648aae5f92e8bd5418e19b3-export const y = 10;",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "./typeroot1/sometype/index.d.ts",
      "version": "6bf5e0a71dae6fccf68b93fbbb73f178-export type TheNum = \"type1\";",
      "signature": "6bf5e0a71dae6fccf68b93fbbb73f178-export type TheNum = \"type1\";",
      "impliedNodeFormat": "CommonJS"
    }
  ],
  "options": {
    "composite": true
  },
  "latestChangedDtsFile": "./index.d.ts",
  "size": 2218
}
//// [/home/src/workspace/projects/project2/index.d.ts] *new* 
export declare const y = 10;

//// [/home/src/workspace/projects/project2/index.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.y = void 0;
exports.y = 10;

//// [/home/src/workspace/projects/project2/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":[[3,4]],"fileNames":["lib.es5.d.ts","lib.dom.d.ts","./index.ts","./utils.d.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"d9b7428535134fcb21dad91303dc6311-interface DOMInterface { }","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"95e641b4f34db55d73f0f5008cdd30f0-export const y = 10","signature":"7ab1b6e8968172bdd365c972b27a69e2-export declare const y = 10;\n","impliedNodeFormat":1},"4e905e76b648aae5f92e8bd5418e19b3-export const y = 10;"],"options":{"composite":true},"latestChangedDtsFile":"./index.d.ts"}
//// [/home/src/workspace/projects/project2/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./index.ts",
        "./utils.d.ts"
      ],
      "original": [
        3,
        4
      ]
    }
  ],
  "fileNames": [
    "lib.es5.d.ts",
    "lib.dom.d.ts",
    "./index.ts",
    "./utils.d.ts"
  ],
  "fileInfos": [
    {
      "fileName": "lib.es5.d.ts",
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
      "fileName": "lib.dom.d.ts",
      "version": "d9b7428535134fcb21dad91303dc6311-interface DOMInterface { }",
      "signature": "d9b7428535134fcb21dad91303dc6311-interface DOMInterface { }",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "d9b7428535134fcb21dad91303dc6311-interface DOMInterface { }",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./index.ts",
      "version": "95e641b4f34db55d73f0f5008cdd30f0-export const y = 10",
      "signature": "7ab1b6e8968172bdd365c972b27a69e2-export declare const y = 10;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "95e641b4f34db55d73f0f5008cdd30f0-export const y = 10",
        "signature": "7ab1b6e8968172bdd365c972b27a69e2-export declare const y = 10;\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./utils.d.ts",
      "version": "4e905e76b648aae5f92e8bd5418e19b3-export const y = 10;",
      "signature": "4e905e76b648aae5f92e8bd5418e19b3-export const y = 10;",
      "impliedNodeFormat": "CommonJS"
    }
  ],
  "options": {
    "composite": true
  },
  "latestChangedDtsFile": "./index.d.ts",
  "size": 1310
}
//// [/home/src/workspace/projects/project3/index.d.ts] *new* 
export declare const z = 10;

//// [/home/src/workspace/projects/project3/index.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.z = void 0;
exports.z = 10;

//// [/home/src/workspace/projects/project3/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":[[3,4]],"fileNames":["lib.es5.d.ts","lib.dom.d.ts","./index.ts","./utils.d.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"d9b7428535134fcb21dad91303dc6311-interface DOMInterface { }","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"6f4aaa0b206d74bd2835c8fd3a4020fe-export const z = 10","signature":"f4ea7cd61571728ffc44aefcffc4eda1-export declare const z = 10;\n","impliedNodeFormat":1},"4e905e76b648aae5f92e8bd5418e19b3-export const y = 10;"],"options":{"composite":true},"latestChangedDtsFile":"./index.d.ts"}
//// [/home/src/workspace/projects/project3/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./index.ts",
        "./utils.d.ts"
      ],
      "original": [
        3,
        4
      ]
    }
  ],
  "fileNames": [
    "lib.es5.d.ts",
    "lib.dom.d.ts",
    "./index.ts",
    "./utils.d.ts"
  ],
  "fileInfos": [
    {
      "fileName": "lib.es5.d.ts",
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
      "fileName": "lib.dom.d.ts",
      "version": "d9b7428535134fcb21dad91303dc6311-interface DOMInterface { }",
      "signature": "d9b7428535134fcb21dad91303dc6311-interface DOMInterface { }",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "d9b7428535134fcb21dad91303dc6311-interface DOMInterface { }",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./index.ts",
      "version": "6f4aaa0b206d74bd2835c8fd3a4020fe-export const z = 10",
      "signature": "f4ea7cd61571728ffc44aefcffc4eda1-export declare const z = 10;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "6f4aaa0b206d74bd2835c8fd3a4020fe-export const z = 10",
        "signature": "f4ea7cd61571728ffc44aefcffc4eda1-export declare const z = 10;\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./utils.d.ts",
      "version": "4e905e76b648aae5f92e8bd5418e19b3-export const y = 10;",
      "signature": "4e905e76b648aae5f92e8bd5418e19b3-export const y = 10;",
      "impliedNodeFormat": "CommonJS"
    }
  ],
  "options": {
    "composite": true
  },
  "latestChangedDtsFile": "./index.d.ts",
  "size": 1310
}
//// [/home/src/workspace/projects/project4/index.d.ts] *new* 
export declare const z = 10;

//// [/home/src/workspace/projects/project4/index.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.z = void 0;
exports.z = 10;

//// [/home/src/workspace/projects/project4/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":[[4,5]],"fileNames":["lib.esnext.d.ts","lib.dom.d.ts","lib.webworker.d.ts","./index.ts","./utils.d.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"d9b7428535134fcb21dad91303dc6311-interface DOMInterface { }","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"95c5e18b7871b756fb3bb843e03aa05d-interface WebWorkerInterface { }","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"6f4aaa0b206d74bd2835c8fd3a4020fe-export const z = 10","signature":"f4ea7cd61571728ffc44aefcffc4eda1-export declare const z = 10;\n","impliedNodeFormat":1},"4e905e76b648aae5f92e8bd5418e19b3-export const y = 10;"],"options":{"composite":true},"latestChangedDtsFile":"./index.d.ts"}
//// [/home/src/workspace/projects/project4/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./index.ts",
        "./utils.d.ts"
      ],
      "original": [
        4,
        5
      ]
    }
  ],
  "fileNames": [
    "lib.esnext.d.ts",
    "lib.dom.d.ts",
    "lib.webworker.d.ts",
    "./index.ts",
    "./utils.d.ts"
  ],
  "fileInfos": [
    {
      "fileName": "lib.esnext.d.ts",
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
      "fileName": "lib.dom.d.ts",
      "version": "d9b7428535134fcb21dad91303dc6311-interface DOMInterface { }",
      "signature": "d9b7428535134fcb21dad91303dc6311-interface DOMInterface { }",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "d9b7428535134fcb21dad91303dc6311-interface DOMInterface { }",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "lib.webworker.d.ts",
      "version": "95c5e18b7871b756fb3bb843e03aa05d-interface WebWorkerInterface { }",
      "signature": "95c5e18b7871b756fb3bb843e03aa05d-interface WebWorkerInterface { }",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "95c5e18b7871b756fb3bb843e03aa05d-interface WebWorkerInterface { }",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./index.ts",
      "version": "6f4aaa0b206d74bd2835c8fd3a4020fe-export const z = 10",
      "signature": "f4ea7cd61571728ffc44aefcffc4eda1-export declare const z = 10;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "6f4aaa0b206d74bd2835c8fd3a4020fe-export const z = 10",
        "signature": "f4ea7cd61571728ffc44aefcffc4eda1-export declare const z = 10;\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./utils.d.ts",
      "version": "4e905e76b648aae5f92e8bd5418e19b3-export const y = 10;",
      "signature": "4e905e76b648aae5f92e8bd5418e19b3-export const y = 10;",
      "impliedNodeFormat": "CommonJS"
    }
  ],
  "options": {
    "composite": true
  },
  "latestChangedDtsFile": "./index.d.ts",
  "size": 1462
}

project1/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es5.d.ts
*refresh*    /home/src/tslibs/TS/Lib/lib.dom.d.ts
*refresh*    /home/src/tslibs/TS/Lib/lib.webworker.d.ts
*refresh*    /home/src/tslibs/TS/Lib/lib.scripthost.d.ts
*refresh*    /home/src/workspace/projects/project1/core.d.ts
*refresh*    /home/src/workspace/projects/project1/file.ts
*refresh*    /home/src/workspace/projects/project1/file2.ts
*refresh*    /home/src/workspace/projects/project1/index.ts
*refresh*    /home/src/workspace/projects/project1/utils.d.ts
*refresh*    /home/src/workspace/projects/project1/typeroot1/sometype/index.d.ts
Signatures::
(stored at emit) /home/src/workspace/projects/project1/file.ts
(stored at emit) /home/src/workspace/projects/project1/file2.ts
(stored at emit) /home/src/workspace/projects/project1/index.ts

project2/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es5.d.ts
*refresh*    /home/src/tslibs/TS/Lib/lib.dom.d.ts
*refresh*    /home/src/workspace/projects/project2/index.ts
*refresh*    /home/src/workspace/projects/project2/utils.d.ts
Signatures::
(stored at emit) /home/src/workspace/projects/project2/index.ts

project3/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es5.d.ts
*refresh*    /home/src/tslibs/TS/Lib/lib.dom.d.ts
*refresh*    /home/src/workspace/projects/project3/index.ts
*refresh*    /home/src/workspace/projects/project3/utils.d.ts
Signatures::
(stored at emit) /home/src/workspace/projects/project3/index.ts

project4/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.esnext.d.ts
*refresh*    /home/src/tslibs/TS/Lib/lib.dom.d.ts
*refresh*    /home/src/tslibs/TS/Lib/lib.webworker.d.ts
*refresh*    /home/src/workspace/projects/project4/index.ts
*refresh*    /home/src/workspace/projects/project4/utils.d.ts
Signatures::
(stored at emit) /home/src/workspace/projects/project4/index.ts
