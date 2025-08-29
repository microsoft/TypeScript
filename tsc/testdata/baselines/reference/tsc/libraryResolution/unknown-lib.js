currentDirectory::/home/src/workspace/projects
useCaseSensitiveFileNames::true
Input::
//// [/home/src/tslibs/TS/Lib/lib.scripthost.d.ts] *new* 
interface ScriptHostInterface { }
//// [/home/src/tslibs/TS/Lib/lib.webworker.d.ts] *new* 
interface WebWorkerInterface { }
//// [/home/src/workspace/projects/project1/core.d.ts] *new* 
export const core = 10;
//// [/home/src/workspace/projects/project1/file.ts] *new* 
export const file = 10;
//// [/home/src/workspace/projects/project1/file2.ts] *new* 
/// <reference lib="webworker2"/>
/// <reference lib="unknownlib"/>
/// <reference lib="scripthost"/>
//// [/home/src/workspace/projects/project1/index.ts] *new* 
export const x = "type1";
//// [/home/src/workspace/projects/project1/tsconfig.json] *new* 
{
    "compilerOptions": {
        "composite": true,
        "traceResolution": true,
        "libReplacement": true
    }
}
//// [/home/src/workspace/projects/project1/utils.d.ts] *new* 
export const y = 10;

tsgo -p project1 --explainFiles
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
======== Resolving module '@typescript/lib-scripthost' from '/home/src/workspace/projects/project1/__lib_node_modules_lookup_lib.scripthost.d.ts__.ts'. ========
Module resolution kind is not specified, using 'Bundler'.
Resolving in CJS mode with conditions 'require', 'types'.
File '/home/src/workspace/projects/project1/package.json' does not exist.
File '/home/src/workspace/projects/package.json' does not exist.
File '/home/src/workspace/package.json' does not exist.
File '/home/src/package.json' does not exist.
File '/home/package.json' does not exist.
File '/package.json' does not exist.
Loading module '@typescript/lib-scripthost' from 'node_modules' folder, target file types: TypeScript, JavaScript, Declaration, JSON.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Directory '/home/src/workspace/projects/project1/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/workspace/projects/project1/node_modules/@types' does not exist, skipping all lookups in it.
Scoped package detected, looking in 'typescript__lib-scripthost'
Directory '/home/src/workspace/projects/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/workspace/projects/node_modules/@types' does not exist, skipping all lookups in it.
Scoped package detected, looking in 'typescript__lib-scripthost'
Directory '/home/src/workspace/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/workspace/node_modules/@types' does not exist, skipping all lookups in it.
Scoped package detected, looking in 'typescript__lib-scripthost'
Directory '/home/src/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/node_modules/@types' does not exist, skipping all lookups in it.
Scoped package detected, looking in 'typescript__lib-scripthost'
Directory '/home/node_modules' does not exist, skipping all lookups in it.
Directory '/home/node_modules/@types' does not exist, skipping all lookups in it.
Scoped package detected, looking in 'typescript__lib-scripthost'
Directory '/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules/@types' does not exist, skipping all lookups in it.
Scoped package detected, looking in 'typescript__lib-scripthost'
Searching all ancestor node_modules directories for fallback extensions: JavaScript, JSON.
Directory '/home/src/workspace/projects/project1/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/workspace/projects/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/workspace/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/node_modules' does not exist, skipping all lookups in it.
Directory '/home/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
======== Module name '@typescript/lib-scripthost' was not resolved. ========
[96mproject1/file2.ts[0m:[93m1[0m:[93m21[0m - [91merror[0m[90m TS2727: [0mCannot find lib definition for 'webworker2'. Did you mean 'webworker'?

[7m1[0m /// <reference lib="webworker2"/>
[7m [0m [91m                    ~~~~~~~~~~[0m

[96mproject1/file2.ts[0m:[93m2[0m:[93m21[0m - [91merror[0m[90m TS2726: [0mCannot find lib definition for 'unknownlib'.

[7m2[0m /// <reference lib="unknownlib"/>
[7m [0m [91m                    ~~~~~~~~~~[0m

../../tslibs/TS/Lib/lib.d.ts
   Default library for target 'ES5'
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

Found 2 errors in the same file, starting at: project1/file2.ts[90m:1[0m

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
//// [/home/src/workspace/projects/project1/file.d.ts] *new* 
export declare const file = 10;

//// [/home/src/workspace/projects/project1/file.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.file = void 0;
exports.file = 10;

//// [/home/src/workspace/projects/project1/file2.d.ts] *new* 

//// [/home/src/workspace/projects/project1/file2.js] *new* 
/// <reference lib="webworker2"/>
/// <reference lib="unknownlib"/>
/// <reference lib="scripthost"/>

//// [/home/src/workspace/projects/project1/index.d.ts] *new* 
export declare const x = "type1";

//// [/home/src/workspace/projects/project1/index.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = "type1";

//// [/home/src/workspace/projects/project1/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","errors":true,"root":[[3,7]],"fileNames":["lib.d.ts","lib.scripthost.d.ts","./core.d.ts","./file.ts","./file2.ts","./index.ts","./utils.d.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"2fa71959819338965a3c6b2122d95c96-interface ScriptHostInterface { }","affectsGlobalScope":true,"impliedNodeFormat":1},"a1f9b824326bab2c3c8f13eccf69f182-export const core = 10;",{"version":"69c4ea0c9ff13ab7fc078607d9363624-export const file = 10;","signature":"a224c1b0cbd2f5fe611e588db48243cb-export declare const file = 10;\n","impliedNodeFormat":1},{"version":"aceac74b29bc0f88aeca1c3e8d6b44c0-/// <reference lib=\"webworker2\"/>\n/// <reference lib=\"unknownlib\"/>\n/// <reference lib=\"scripthost\"/>","signature":"99aa06d3014798d86001c324468d497f-","impliedNodeFormat":1},{"version":"aeb695aed936d7539a32fc3cd25af558-export const x = \"type1\";","signature":"e2f8d12de2edba256e37cf4a656ac52d-export declare const x = \"type1\";\n","impliedNodeFormat":1},"4e905e76b648aae5f92e8bd5418e19b3-export const y = 10;"],"options":{"composite":true},"latestChangedDtsFile":"./index.d.ts"}
//// [/home/src/workspace/projects/project1/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "errors": true,
  "root": [
    {
      "files": [
        "./core.d.ts",
        "./file.ts",
        "./file2.ts",
        "./index.ts",
        "./utils.d.ts"
      ],
      "original": [
        3,
        7
      ]
    }
  ],
  "fileNames": [
    "lib.d.ts",
    "lib.scripthost.d.ts",
    "./core.d.ts",
    "./file.ts",
    "./file2.ts",
    "./index.ts",
    "./utils.d.ts"
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
      "version": "aceac74b29bc0f88aeca1c3e8d6b44c0-/// <reference lib=\"webworker2\"/>\n/// <reference lib=\"unknownlib\"/>\n/// <reference lib=\"scripthost\"/>",
      "signature": "99aa06d3014798d86001c324468d497f-",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "aceac74b29bc0f88aeca1c3e8d6b44c0-/// <reference lib=\"webworker2\"/>\n/// <reference lib=\"unknownlib\"/>\n/// <reference lib=\"scripthost\"/>",
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
    }
  ],
  "options": {
    "composite": true
  },
  "latestChangedDtsFile": "./index.d.ts",
  "size": 1848
}

project1/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.d.ts
*refresh*    /home/src/tslibs/TS/Lib/lib.scripthost.d.ts
*refresh*    /home/src/workspace/projects/project1/core.d.ts
*refresh*    /home/src/workspace/projects/project1/file.ts
*refresh*    /home/src/workspace/projects/project1/file2.ts
*refresh*    /home/src/workspace/projects/project1/index.ts
*refresh*    /home/src/workspace/projects/project1/utils.d.ts
Signatures::
(stored at emit) /home/src/workspace/projects/project1/file.ts
(stored at emit) /home/src/workspace/projects/project1/file2.ts
(stored at emit) /home/src/workspace/projects/project1/index.ts
