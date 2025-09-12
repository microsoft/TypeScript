currentDirectory::/home/src/workspaces/solution
useCaseSensitiveFileNames::true
Input::
//// [/home/src/workspaces/solution/projects/server/src/server.ts] *new* 
import { MyClass } from ':shared/myClass.js';
console.log('Hello, world!');
//// [/home/src/workspaces/solution/projects/server/tsconfig.json] *new* 
{
    "extends": "../../tsconfig.json",
    "compilerOptions": {
        "rootDir": "..",
        "outDir": "./dist",
        "paths": {
            ":shared/*": ["./src/../../shared/src/*"],
        },
    },
    "include": [ "../shared/src/**/*.ts", "src/**/*.ts" ],
    "references": [
        { "path": "../shared" },
    ],
}
//// [/home/src/workspaces/solution/projects/shared/src/logging.ts] *new* 
export function log(str: string) {
    console.log(str);
}
//// [/home/src/workspaces/solution/projects/shared/src/myClass.ts] *new* 
export class MyClass { }
//// [/home/src/workspaces/solution/projects/shared/src/random.ts] *new* 
export function randomFn(str: string) {
    console.log(str);
}
//// [/home/src/workspaces/solution/projects/shared/tsconfig.json] *new* 
{
    "extends": "../../tsconfig.json",
    "compilerOptions": {
        "outDir": "./dist",
    },
    "include": ["src/**/*.ts"],
}
//// [/home/src/workspaces/solution/tsconfig.json] *new* 
{
    "compilerOptions": {
        "composite": true,
    },
    "references": [
        { "path": "projects/server" },
        { "path": "projects/shared" },
    ],
}

tsgo --b -w projects/server -v --traceResolution --explainFiles
ExitStatus:: Success
Output::
[2J[3J[H[[90mHH:MM:SS AM[0m] Starting compilation in watch mode...

[[90mHH:MM:SS AM[0m] Projects in this build: 
    * projects/shared/tsconfig.json
    * projects/server/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'projects/shared/tsconfig.json' is out of date because output file 'projects/shared/dist/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project 'projects/shared/tsconfig.json'...

../../tslibs/TS/Lib/lib.d.ts
   Default library for target 'ES5'
projects/shared/src/logging.ts
   Matched by include pattern 'src/**/*.ts' in 'projects/shared/tsconfig.json'
projects/shared/src/myClass.ts
   Matched by include pattern 'src/**/*.ts' in 'projects/shared/tsconfig.json'
projects/shared/src/random.ts
   Matched by include pattern 'src/**/*.ts' in 'projects/shared/tsconfig.json'
[[90mHH:MM:SS AM[0m] Project 'projects/server/tsconfig.json' is out of date because output file 'projects/server/dist/server/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project 'projects/server/tsconfig.json'...

======== Resolving module ':shared/myClass.js' from '/home/src/workspaces/solution/projects/server/src/server.ts'. ========
Module resolution kind is not specified, using 'Bundler'.
Resolving in CJS mode with conditions 'require', 'types'.
'paths' option is specified, looking for a pattern to match module name ':shared/myClass.js'.
Module name ':shared/myClass.js', matched pattern ':shared/*'.
Trying substitution './src/../../shared/src/*', candidate module location: './src/../../shared/src/myClass.js'.
Loading module as file / folder, candidate module location '/home/src/workspaces/solution/projects/shared/src/myClass.js', target file types: TypeScript, JavaScript, Declaration, JSON.
File name '/home/src/workspaces/solution/projects/shared/src/myClass.js' has a '.js' extension - stripping it.
File '/home/src/workspaces/solution/projects/shared/src/myClass.ts' exists - use it as a name resolution result.
======== Module name ':shared/myClass.js' was successfully resolved to '/home/src/workspaces/solution/projects/shared/src/myClass.ts'. ========
../../tslibs/TS/Lib/lib.d.ts
   Default library for target 'ES5'
projects/shared/dist/src/logging.d.ts
   Matched by include pattern '../shared/src/**/*.ts' in 'projects/server/tsconfig.json'
   File is output of project reference source 'projects/shared/src/logging.ts'
projects/shared/dist/src/myClass.d.ts
   Matched by include pattern '../shared/src/**/*.ts' in 'projects/server/tsconfig.json'
   Imported via ':shared/myClass.js' from file 'projects/server/src/server.ts'
   File is output of project reference source 'projects/shared/src/myClass.ts'
projects/shared/dist/src/random.d.ts
   Matched by include pattern '../shared/src/**/*.ts' in 'projects/server/tsconfig.json'
   File is output of project reference source 'projects/shared/src/random.ts'
projects/server/src/server.ts
   Matched by include pattern 'src/**/*.ts' in 'projects/server/tsconfig.json'
[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.

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
//// [/home/src/workspaces/solution/projects/server/dist/server/src/server.d.ts] *new* 
export {};

//// [/home/src/workspaces/solution/projects/server/dist/server/src/server.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
console.log('Hello, world!');

//// [/home/src/workspaces/solution/projects/server/dist/server/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":[[2,5]],"fileNames":["lib.d.ts","../../../shared/dist/src/logging.d.ts","../../../shared/dist/src/myClass.d.ts","../../../shared/dist/src/random.d.ts","../../src/server.ts","../../../shared/src/logging.ts","../../../shared/src/myClass.ts","../../../shared/src/random.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},"380f2d6d625cf989bc9f9bcd67ce3afe-export declare function log(str: string): void;\n","21b0030a128ccc5aedc6fdbe3cdf12e3-export declare class MyClass {\n}\n","1d6adcd8c4dee61b744fc1ff84370372-export declare function randomFn(str: string): void;\n",{"version":"12354a7ec5afade35d10a2c1fa79eb29-import { MyClass } from ':shared/myClass.js';\nconsole.log('Hello, world!');","signature":"abe7d9981d6018efb6b2b794f40a1607-export {};\n","impliedNodeFormat":1}],"fileIdsList":[[3]],"options":{"composite":true,"outDir":"..","rootDir":"../../.."},"referencedMap":[[5,1]],"latestChangedDtsFile":"./src/server.d.ts","resolvedRoot":[[2,6],[3,7],[4,8]]}
//// [/home/src/workspaces/solution/projects/server/dist/server/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "../../../shared/dist/src/logging.d.ts",
        "../../../shared/dist/src/myClass.d.ts",
        "../../../shared/dist/src/random.d.ts",
        "../../src/server.ts"
      ],
      "original": [
        2,
        5
      ]
    }
  ],
  "fileNames": [
    "lib.d.ts",
    "../../../shared/dist/src/logging.d.ts",
    "../../../shared/dist/src/myClass.d.ts",
    "../../../shared/dist/src/random.d.ts",
    "../../src/server.ts",
    "../../../shared/src/logging.ts",
    "../../../shared/src/myClass.ts",
    "../../../shared/src/random.ts"
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
      "fileName": "../../../shared/dist/src/logging.d.ts",
      "version": "380f2d6d625cf989bc9f9bcd67ce3afe-export declare function log(str: string): void;\n",
      "signature": "380f2d6d625cf989bc9f9bcd67ce3afe-export declare function log(str: string): void;\n",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "../../../shared/dist/src/myClass.d.ts",
      "version": "21b0030a128ccc5aedc6fdbe3cdf12e3-export declare class MyClass {\n}\n",
      "signature": "21b0030a128ccc5aedc6fdbe3cdf12e3-export declare class MyClass {\n}\n",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "../../../shared/dist/src/random.d.ts",
      "version": "1d6adcd8c4dee61b744fc1ff84370372-export declare function randomFn(str: string): void;\n",
      "signature": "1d6adcd8c4dee61b744fc1ff84370372-export declare function randomFn(str: string): void;\n",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "../../src/server.ts",
      "version": "12354a7ec5afade35d10a2c1fa79eb29-import { MyClass } from ':shared/myClass.js';\nconsole.log('Hello, world!');",
      "signature": "abe7d9981d6018efb6b2b794f40a1607-export {};\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "12354a7ec5afade35d10a2c1fa79eb29-import { MyClass } from ':shared/myClass.js';\nconsole.log('Hello, world!');",
        "signature": "abe7d9981d6018efb6b2b794f40a1607-export {};\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "fileIdsList": [
    [
      "../../../shared/dist/src/myClass.d.ts"
    ]
  ],
  "options": {
    "composite": true,
    "outDir": "..",
    "rootDir": "../../.."
  },
  "referencedMap": {
    "../../src/server.ts": [
      "../../../shared/dist/src/myClass.d.ts"
    ]
  },
  "latestChangedDtsFile": "./src/server.d.ts",
  "resolvedRoot": [
    [
      "../../../shared/dist/src/logging.d.ts",
      "../../../shared/src/logging.ts"
    ],
    [
      "../../../shared/dist/src/myClass.d.ts",
      "../../../shared/src/myClass.ts"
    ],
    [
      "../../../shared/dist/src/random.d.ts",
      "../../../shared/src/random.ts"
    ]
  ],
  "size": 1728
}
//// [/home/src/workspaces/solution/projects/shared/dist/src/logging.d.ts] *new* 
export declare function log(str: string): void;

//// [/home/src/workspaces/solution/projects/shared/dist/src/logging.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = log;
function log(str) {
    console.log(str);
}

//// [/home/src/workspaces/solution/projects/shared/dist/src/myClass.d.ts] *new* 
export declare class MyClass {
}

//// [/home/src/workspaces/solution/projects/shared/dist/src/myClass.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyClass = void 0;
class MyClass {
}
exports.MyClass = MyClass;

//// [/home/src/workspaces/solution/projects/shared/dist/src/random.d.ts] *new* 
export declare function randomFn(str: string): void;

//// [/home/src/workspaces/solution/projects/shared/dist/src/random.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomFn = randomFn;
function randomFn(str) {
    console.log(str);
}

//// [/home/src/workspaces/solution/projects/shared/dist/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":[[2,4]],"fileNames":["lib.d.ts","../src/logging.ts","../src/myClass.ts","../src/random.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"e8c4594410128d4531f2321647cc451d-export function log(str: string) {\n    console.log(str);\n}","signature":"380f2d6d625cf989bc9f9bcd67ce3afe-export declare function log(str: string): void;\n","impliedNodeFormat":1},{"version":"22f018e389f527d25fc2ad2b2c6c9702-export class MyClass { }","signature":"21b0030a128ccc5aedc6fdbe3cdf12e3-export declare class MyClass {\n}\n","impliedNodeFormat":1},{"version":"4f1c4e78a007da37552cba1c9b98db63-export function randomFn(str: string) {\n    console.log(str);\n}","signature":"1d6adcd8c4dee61b744fc1ff84370372-export declare function randomFn(str: string): void;\n","impliedNodeFormat":1}],"options":{"composite":true,"outDir":"./"},"latestChangedDtsFile":"./src/random.d.ts"}
//// [/home/src/workspaces/solution/projects/shared/dist/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "../src/logging.ts",
        "../src/myClass.ts",
        "../src/random.ts"
      ],
      "original": [
        2,
        4
      ]
    }
  ],
  "fileNames": [
    "lib.d.ts",
    "../src/logging.ts",
    "../src/myClass.ts",
    "../src/random.ts"
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
      "fileName": "../src/logging.ts",
      "version": "e8c4594410128d4531f2321647cc451d-export function log(str: string) {\n    console.log(str);\n}",
      "signature": "380f2d6d625cf989bc9f9bcd67ce3afe-export declare function log(str: string): void;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "e8c4594410128d4531f2321647cc451d-export function log(str: string) {\n    console.log(str);\n}",
        "signature": "380f2d6d625cf989bc9f9bcd67ce3afe-export declare function log(str: string): void;\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "../src/myClass.ts",
      "version": "22f018e389f527d25fc2ad2b2c6c9702-export class MyClass { }",
      "signature": "21b0030a128ccc5aedc6fdbe3cdf12e3-export declare class MyClass {\n}\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "22f018e389f527d25fc2ad2b2c6c9702-export class MyClass { }",
        "signature": "21b0030a128ccc5aedc6fdbe3cdf12e3-export declare class MyClass {\n}\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "../src/random.ts",
      "version": "4f1c4e78a007da37552cba1c9b98db63-export function randomFn(str: string) {\n    console.log(str);\n}",
      "signature": "1d6adcd8c4dee61b744fc1ff84370372-export declare function randomFn(str: string): void;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "4f1c4e78a007da37552cba1c9b98db63-export function randomFn(str: string) {\n    console.log(str);\n}",
        "signature": "1d6adcd8c4dee61b744fc1ff84370372-export declare function randomFn(str: string): void;\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "options": {
    "composite": true,
    "outDir": "./"
  },
  "latestChangedDtsFile": "./src/random.d.ts",
  "size": 1637
}

projects/shared/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.d.ts
*refresh*    /home/src/workspaces/solution/projects/shared/src/logging.ts
*refresh*    /home/src/workspaces/solution/projects/shared/src/myClass.ts
*refresh*    /home/src/workspaces/solution/projects/shared/src/random.ts
Signatures::
(stored at emit) /home/src/workspaces/solution/projects/shared/src/logging.ts
(stored at emit) /home/src/workspaces/solution/projects/shared/src/myClass.ts
(stored at emit) /home/src/workspaces/solution/projects/shared/src/random.ts

projects/server/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.d.ts
*refresh*    /home/src/workspaces/solution/projects/shared/dist/src/logging.d.ts
*refresh*    /home/src/workspaces/solution/projects/shared/dist/src/myClass.d.ts
*refresh*    /home/src/workspaces/solution/projects/shared/dist/src/random.d.ts
*refresh*    /home/src/workspaces/solution/projects/server/src/server.ts
Signatures::
(stored at emit) /home/src/workspaces/solution/projects/server/src/server.ts


Edit [0]:: no change


Output::



Edit [1]:: edit logging file
//// [/home/src/workspaces/solution/projects/shared/src/logging.ts] *modified* 
export function log(str: string) {
    console.log(str);
}export const x = 10;


Output::
[2J[3J[H[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

[[90mHH:MM:SS AM[0m] Projects in this build: 
    * projects/shared/tsconfig.json
    * projects/server/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'projects/shared/tsconfig.json' is out of date because output 'projects/shared/dist/tsconfig.tsbuildinfo' is older than input 'projects/shared/src/logging.ts'

[[90mHH:MM:SS AM[0m] Building project 'projects/shared/tsconfig.json'...

../../tslibs/TS/Lib/lib.d.ts
   Default library for target 'ES5'
projects/shared/src/logging.ts
   Matched by include pattern 'src/**/*.ts' in 'projects/shared/tsconfig.json'
projects/shared/src/myClass.ts
   Matched by include pattern 'src/**/*.ts' in 'projects/shared/tsconfig.json'
projects/shared/src/random.ts
   Matched by include pattern 'src/**/*.ts' in 'projects/shared/tsconfig.json'
[[90mHH:MM:SS AM[0m] Project 'projects/server/tsconfig.json' is out of date because output 'projects/server/dist/server/tsconfig.tsbuildinfo' is older than input 'projects/shared/src/logging.ts'

[[90mHH:MM:SS AM[0m] Building project 'projects/server/tsconfig.json'...

======== Resolving module ':shared/myClass.js' from '/home/src/workspaces/solution/projects/server/src/server.ts'. ========
Module resolution kind is not specified, using 'Bundler'.
Resolving in CJS mode with conditions 'require', 'types'.
'paths' option is specified, looking for a pattern to match module name ':shared/myClass.js'.
Module name ':shared/myClass.js', matched pattern ':shared/*'.
Trying substitution './src/../../shared/src/*', candidate module location: './src/../../shared/src/myClass.js'.
Loading module as file / folder, candidate module location '/home/src/workspaces/solution/projects/shared/src/myClass.js', target file types: TypeScript, JavaScript, Declaration, JSON.
File name '/home/src/workspaces/solution/projects/shared/src/myClass.js' has a '.js' extension - stripping it.
File '/home/src/workspaces/solution/projects/shared/src/myClass.ts' exists - use it as a name resolution result.
======== Module name ':shared/myClass.js' was successfully resolved to '/home/src/workspaces/solution/projects/shared/src/myClass.ts'. ========
../../tslibs/TS/Lib/lib.d.ts
   Default library for target 'ES5'
projects/shared/dist/src/logging.d.ts
   Matched by include pattern '../shared/src/**/*.ts' in 'projects/server/tsconfig.json'
   File is output of project reference source 'projects/shared/src/logging.ts'
projects/shared/dist/src/myClass.d.ts
   Matched by include pattern '../shared/src/**/*.ts' in 'projects/server/tsconfig.json'
   Imported via ':shared/myClass.js' from file 'projects/server/src/server.ts'
   File is output of project reference source 'projects/shared/src/myClass.ts'
projects/shared/dist/src/random.d.ts
   Matched by include pattern '../shared/src/**/*.ts' in 'projects/server/tsconfig.json'
   File is output of project reference source 'projects/shared/src/random.ts'
projects/server/src/server.ts
   Matched by include pattern 'src/**/*.ts' in 'projects/server/tsconfig.json'
[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.

//// [/home/src/workspaces/solution/projects/server/dist/server/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[[2,5]],"fileNames":["lib.d.ts","../../../shared/dist/src/logging.d.ts","../../../shared/dist/src/myClass.d.ts","../../../shared/dist/src/random.d.ts","../../src/server.ts","../../../shared/src/logging.ts","../../../shared/src/myClass.ts","../../../shared/src/random.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},"5178e2a779ca8b29fb07201995347a09-export declare function log(str: string): void;\nexport declare const x = 10;\n","21b0030a128ccc5aedc6fdbe3cdf12e3-export declare class MyClass {\n}\n","1d6adcd8c4dee61b744fc1ff84370372-export declare function randomFn(str: string): void;\n",{"version":"12354a7ec5afade35d10a2c1fa79eb29-import { MyClass } from ':shared/myClass.js';\nconsole.log('Hello, world!');","signature":"abe7d9981d6018efb6b2b794f40a1607-export {};\n","impliedNodeFormat":1}],"fileIdsList":[[3]],"options":{"composite":true,"outDir":"..","rootDir":"../../.."},"referencedMap":[[5,1]],"latestChangedDtsFile":"./src/server.d.ts","resolvedRoot":[[2,6],[3,7],[4,8]]}
//// [/home/src/workspaces/solution/projects/server/dist/server/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "../../../shared/dist/src/logging.d.ts",
        "../../../shared/dist/src/myClass.d.ts",
        "../../../shared/dist/src/random.d.ts",
        "../../src/server.ts"
      ],
      "original": [
        2,
        5
      ]
    }
  ],
  "fileNames": [
    "lib.d.ts",
    "../../../shared/dist/src/logging.d.ts",
    "../../../shared/dist/src/myClass.d.ts",
    "../../../shared/dist/src/random.d.ts",
    "../../src/server.ts",
    "../../../shared/src/logging.ts",
    "../../../shared/src/myClass.ts",
    "../../../shared/src/random.ts"
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
      "fileName": "../../../shared/dist/src/logging.d.ts",
      "version": "5178e2a779ca8b29fb07201995347a09-export declare function log(str: string): void;\nexport declare const x = 10;\n",
      "signature": "5178e2a779ca8b29fb07201995347a09-export declare function log(str: string): void;\nexport declare const x = 10;\n",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "../../../shared/dist/src/myClass.d.ts",
      "version": "21b0030a128ccc5aedc6fdbe3cdf12e3-export declare class MyClass {\n}\n",
      "signature": "21b0030a128ccc5aedc6fdbe3cdf12e3-export declare class MyClass {\n}\n",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "../../../shared/dist/src/random.d.ts",
      "version": "1d6adcd8c4dee61b744fc1ff84370372-export declare function randomFn(str: string): void;\n",
      "signature": "1d6adcd8c4dee61b744fc1ff84370372-export declare function randomFn(str: string): void;\n",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "../../src/server.ts",
      "version": "12354a7ec5afade35d10a2c1fa79eb29-import { MyClass } from ':shared/myClass.js';\nconsole.log('Hello, world!');",
      "signature": "abe7d9981d6018efb6b2b794f40a1607-export {};\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "12354a7ec5afade35d10a2c1fa79eb29-import { MyClass } from ':shared/myClass.js';\nconsole.log('Hello, world!');",
        "signature": "abe7d9981d6018efb6b2b794f40a1607-export {};\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "fileIdsList": [
    [
      "../../../shared/dist/src/myClass.d.ts"
    ]
  ],
  "options": {
    "composite": true,
    "outDir": "..",
    "rootDir": "../../.."
  },
  "referencedMap": {
    "../../src/server.ts": [
      "../../../shared/dist/src/myClass.d.ts"
    ]
  },
  "latestChangedDtsFile": "./src/server.d.ts",
  "resolvedRoot": [
    [
      "../../../shared/dist/src/logging.d.ts",
      "../../../shared/src/logging.ts"
    ],
    [
      "../../../shared/dist/src/myClass.d.ts",
      "../../../shared/src/myClass.ts"
    ],
    [
      "../../../shared/dist/src/random.d.ts",
      "../../../shared/src/random.ts"
    ]
  ],
  "size": 1758
}
//// [/home/src/workspaces/solution/projects/shared/dist/src/logging.d.ts] *modified* 
export declare function log(str: string): void;
export declare const x = 10;

//// [/home/src/workspaces/solution/projects/shared/dist/src/logging.js] *modified* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.log = log;
function log(str) {
    console.log(str);
}
exports.x = 10;

//// [/home/src/workspaces/solution/projects/shared/dist/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[[2,4]],"fileNames":["lib.d.ts","../src/logging.ts","../src/myClass.ts","../src/random.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"107fb48a395fd47390346ab424ebcc12-export function log(str: string) {\n    console.log(str);\n}export const x = 10;","signature":"5178e2a779ca8b29fb07201995347a09-export declare function log(str: string): void;\nexport declare const x = 10;\n","impliedNodeFormat":1},{"version":"22f018e389f527d25fc2ad2b2c6c9702-export class MyClass { }","signature":"21b0030a128ccc5aedc6fdbe3cdf12e3-export declare class MyClass {\n}\n","impliedNodeFormat":1},{"version":"4f1c4e78a007da37552cba1c9b98db63-export function randomFn(str: string) {\n    console.log(str);\n}","signature":"1d6adcd8c4dee61b744fc1ff84370372-export declare function randomFn(str: string): void;\n","impliedNodeFormat":1}],"options":{"composite":true,"outDir":"./"},"latestChangedDtsFile":"./src/logging.d.ts"}
//// [/home/src/workspaces/solution/projects/shared/dist/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "../src/logging.ts",
        "../src/myClass.ts",
        "../src/random.ts"
      ],
      "original": [
        2,
        4
      ]
    }
  ],
  "fileNames": [
    "lib.d.ts",
    "../src/logging.ts",
    "../src/myClass.ts",
    "../src/random.ts"
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
      "fileName": "../src/logging.ts",
      "version": "107fb48a395fd47390346ab424ebcc12-export function log(str: string) {\n    console.log(str);\n}export const x = 10;",
      "signature": "5178e2a779ca8b29fb07201995347a09-export declare function log(str: string): void;\nexport declare const x = 10;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "107fb48a395fd47390346ab424ebcc12-export function log(str: string) {\n    console.log(str);\n}export const x = 10;",
        "signature": "5178e2a779ca8b29fb07201995347a09-export declare function log(str: string): void;\nexport declare const x = 10;\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "../src/myClass.ts",
      "version": "22f018e389f527d25fc2ad2b2c6c9702-export class MyClass { }",
      "signature": "21b0030a128ccc5aedc6fdbe3cdf12e3-export declare class MyClass {\n}\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "22f018e389f527d25fc2ad2b2c6c9702-export class MyClass { }",
        "signature": "21b0030a128ccc5aedc6fdbe3cdf12e3-export declare class MyClass {\n}\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "../src/random.ts",
      "version": "4f1c4e78a007da37552cba1c9b98db63-export function randomFn(str: string) {\n    console.log(str);\n}",
      "signature": "1d6adcd8c4dee61b744fc1ff84370372-export declare function randomFn(str: string): void;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "4f1c4e78a007da37552cba1c9b98db63-export function randomFn(str: string) {\n    console.log(str);\n}",
        "signature": "1d6adcd8c4dee61b744fc1ff84370372-export declare function randomFn(str: string): void;\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "options": {
    "composite": true,
    "outDir": "./"
  },
  "latestChangedDtsFile": "./src/logging.d.ts",
  "size": 1688
}

projects/shared/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/workspaces/solution/projects/shared/src/logging.ts
Signatures::
(computed .d.ts) /home/src/workspaces/solution/projects/shared/src/logging.ts

projects/server/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/workspaces/solution/projects/shared/dist/src/logging.d.ts
Signatures::
(used version)   /home/src/workspaces/solution/projects/shared/dist/src/logging.d.ts


Edit [2]:: no change


Output::



Edit [3]:: delete random file
//// [/home/src/workspaces/solution/projects/shared/src/random.ts] *deleted*


Output::
[2J[3J[H[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

[[90mHH:MM:SS AM[0m] Projects in this build: 
    * projects/shared/tsconfig.json
    * projects/server/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'projects/shared/tsconfig.json' is out of date because buildinfo file 'projects/shared/dist/tsconfig.tsbuildinfo' indicates that file 'projects/shared/src/random.ts' was root file of compilation but not any more.

[[90mHH:MM:SS AM[0m] Building project 'projects/shared/tsconfig.json'...

../../tslibs/TS/Lib/lib.d.ts
   Default library for target 'ES5'
projects/shared/src/logging.ts
   Matched by include pattern 'src/**/*.ts' in 'projects/shared/tsconfig.json'
projects/shared/src/myClass.ts
   Matched by include pattern 'src/**/*.ts' in 'projects/shared/tsconfig.json'
[[90mHH:MM:SS AM[0m] Project 'projects/server/tsconfig.json' is out of date because buildinfo file 'projects/server/dist/server/tsconfig.tsbuildinfo' indicates that file 'projects/shared/src/random.ts' was root file of compilation but not any more.

[[90mHH:MM:SS AM[0m] Building project 'projects/server/tsconfig.json'...

======== Resolving module ':shared/myClass.js' from '/home/src/workspaces/solution/projects/server/src/server.ts'. ========
Module resolution kind is not specified, using 'Bundler'.
Resolving in CJS mode with conditions 'require', 'types'.
'paths' option is specified, looking for a pattern to match module name ':shared/myClass.js'.
Module name ':shared/myClass.js', matched pattern ':shared/*'.
Trying substitution './src/../../shared/src/*', candidate module location: './src/../../shared/src/myClass.js'.
Loading module as file / folder, candidate module location '/home/src/workspaces/solution/projects/shared/src/myClass.js', target file types: TypeScript, JavaScript, Declaration, JSON.
File name '/home/src/workspaces/solution/projects/shared/src/myClass.js' has a '.js' extension - stripping it.
File '/home/src/workspaces/solution/projects/shared/src/myClass.ts' exists - use it as a name resolution result.
======== Module name ':shared/myClass.js' was successfully resolved to '/home/src/workspaces/solution/projects/shared/src/myClass.ts'. ========
../../tslibs/TS/Lib/lib.d.ts
   Default library for target 'ES5'
projects/shared/dist/src/logging.d.ts
   Matched by include pattern '../shared/src/**/*.ts' in 'projects/server/tsconfig.json'
   File is output of project reference source 'projects/shared/src/logging.ts'
projects/shared/dist/src/myClass.d.ts
   Matched by include pattern '../shared/src/**/*.ts' in 'projects/server/tsconfig.json'
   Imported via ':shared/myClass.js' from file 'projects/server/src/server.ts'
   File is output of project reference source 'projects/shared/src/myClass.ts'
projects/server/src/server.ts
   Matched by include pattern 'src/**/*.ts' in 'projects/server/tsconfig.json'
[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.

//// [/home/src/workspaces/solution/projects/server/dist/server/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[[2,4]],"fileNames":["lib.d.ts","../../../shared/dist/src/logging.d.ts","../../../shared/dist/src/myClass.d.ts","../../src/server.ts","../../../shared/src/logging.ts","../../../shared/src/myClass.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},"5178e2a779ca8b29fb07201995347a09-export declare function log(str: string): void;\nexport declare const x = 10;\n","21b0030a128ccc5aedc6fdbe3cdf12e3-export declare class MyClass {\n}\n",{"version":"12354a7ec5afade35d10a2c1fa79eb29-import { MyClass } from ':shared/myClass.js';\nconsole.log('Hello, world!');","signature":"abe7d9981d6018efb6b2b794f40a1607-export {};\n","impliedNodeFormat":1}],"fileIdsList":[[3]],"options":{"composite":true,"outDir":"..","rootDir":"../../.."},"referencedMap":[[4,1]],"latestChangedDtsFile":"./src/server.d.ts","resolvedRoot":[[2,5],[3,6]]}
//// [/home/src/workspaces/solution/projects/server/dist/server/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "../../../shared/dist/src/logging.d.ts",
        "../../../shared/dist/src/myClass.d.ts",
        "../../src/server.ts"
      ],
      "original": [
        2,
        4
      ]
    }
  ],
  "fileNames": [
    "lib.d.ts",
    "../../../shared/dist/src/logging.d.ts",
    "../../../shared/dist/src/myClass.d.ts",
    "../../src/server.ts",
    "../../../shared/src/logging.ts",
    "../../../shared/src/myClass.ts"
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
      "fileName": "../../../shared/dist/src/logging.d.ts",
      "version": "5178e2a779ca8b29fb07201995347a09-export declare function log(str: string): void;\nexport declare const x = 10;\n",
      "signature": "5178e2a779ca8b29fb07201995347a09-export declare function log(str: string): void;\nexport declare const x = 10;\n",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "../../../shared/dist/src/myClass.d.ts",
      "version": "21b0030a128ccc5aedc6fdbe3cdf12e3-export declare class MyClass {\n}\n",
      "signature": "21b0030a128ccc5aedc6fdbe3cdf12e3-export declare class MyClass {\n}\n",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "../../src/server.ts",
      "version": "12354a7ec5afade35d10a2c1fa79eb29-import { MyClass } from ':shared/myClass.js';\nconsole.log('Hello, world!');",
      "signature": "abe7d9981d6018efb6b2b794f40a1607-export {};\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "12354a7ec5afade35d10a2c1fa79eb29-import { MyClass } from ':shared/myClass.js';\nconsole.log('Hello, world!');",
        "signature": "abe7d9981d6018efb6b2b794f40a1607-export {};\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "fileIdsList": [
    [
      "../../../shared/dist/src/myClass.d.ts"
    ]
  ],
  "options": {
    "composite": true,
    "outDir": "..",
    "rootDir": "../../.."
  },
  "referencedMap": {
    "../../src/server.ts": [
      "../../../shared/dist/src/myClass.d.ts"
    ]
  },
  "latestChangedDtsFile": "./src/server.d.ts",
  "resolvedRoot": [
    [
      "../../../shared/dist/src/logging.d.ts",
      "../../../shared/src/logging.ts"
    ],
    [
      "../../../shared/dist/src/myClass.d.ts",
      "../../../shared/src/myClass.ts"
    ]
  ],
  "size": 1591
}
//// [/home/src/workspaces/solution/projects/shared/dist/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[[2,3]],"fileNames":["lib.d.ts","../src/logging.ts","../src/myClass.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"107fb48a395fd47390346ab424ebcc12-export function log(str: string) {\n    console.log(str);\n}export const x = 10;","signature":"5178e2a779ca8b29fb07201995347a09-export declare function log(str: string): void;\nexport declare const x = 10;\n","impliedNodeFormat":1},{"version":"22f018e389f527d25fc2ad2b2c6c9702-export class MyClass { }","signature":"21b0030a128ccc5aedc6fdbe3cdf12e3-export declare class MyClass {\n}\n","impliedNodeFormat":1}],"options":{"composite":true,"outDir":"./"},"latestChangedDtsFile":"./src/logging.d.ts"}
//// [/home/src/workspaces/solution/projects/shared/dist/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "../src/logging.ts",
        "../src/myClass.ts"
      ],
      "original": [
        2,
        3
      ]
    }
  ],
  "fileNames": [
    "lib.d.ts",
    "../src/logging.ts",
    "../src/myClass.ts"
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
      "fileName": "../src/logging.ts",
      "version": "107fb48a395fd47390346ab424ebcc12-export function log(str: string) {\n    console.log(str);\n}export const x = 10;",
      "signature": "5178e2a779ca8b29fb07201995347a09-export declare function log(str: string): void;\nexport declare const x = 10;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "107fb48a395fd47390346ab424ebcc12-export function log(str: string) {\n    console.log(str);\n}export const x = 10;",
        "signature": "5178e2a779ca8b29fb07201995347a09-export declare function log(str: string): void;\nexport declare const x = 10;\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "../src/myClass.ts",
      "version": "22f018e389f527d25fc2ad2b2c6c9702-export class MyClass { }",
      "signature": "21b0030a128ccc5aedc6fdbe3cdf12e3-export declare class MyClass {\n}\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "22f018e389f527d25fc2ad2b2c6c9702-export class MyClass { }",
        "signature": "21b0030a128ccc5aedc6fdbe3cdf12e3-export declare class MyClass {\n}\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "options": {
    "composite": true,
    "outDir": "./"
  },
  "latestChangedDtsFile": "./src/logging.d.ts",
  "size": 1432
}

projects/shared/tsconfig.json::
SemanticDiagnostics::
Signatures::

projects/server/tsconfig.json::
SemanticDiagnostics::
Signatures::


Edit [4]:: no change


Output::

