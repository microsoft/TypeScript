currentDirectory::/user/username/projects/myproject
useCaseSensitiveFileNames::true
Input::
//// [/user/username/projects/myproject/node_modules/@types/bar/index.d.ts] *new* 
export const bar = 10;
//// [/user/username/projects/myproject/node_modules/@types/foo/index.d.ts] *new* 
export const foo = 10;
//// [/user/username/projects/myproject/project1/index.ts] *new* 
import { foo } from "file";
//// [/user/username/projects/myproject/project1/node_modules/file/index.d.ts] *new* 
export const foo = 10;
//// [/user/username/projects/myproject/project1/tsconfig.json] *new* 
{
    "compilerOptions": {
        "composite": true,
        "types": ["foo", "bar"]
    },
    "files": ["index.ts"],
}
//// [/user/username/projects/myproject/project2/index.ts] *new* 
import { foo } from "file";
//// [/user/username/projects/myproject/project2/node_modules/file/index.d.ts] *new* 
export const foo = 10;
//// [/user/username/projects/myproject/project2/tsconfig.json] *new* 
{
    "compilerOptions": {
        "composite": true,
        "types": ["foo"],
        "module": "nodenext",
        "moduleResolution": "nodenext"
    },
    "files": ["index.ts"],
}
//// [/user/username/projects/myproject/tsconfig.json] *new* 
{
     "files": [],
     "references": [
         { "path": "./project1" },
         { "path": "./project2" },
     ],
}

tsgo --b -w -v
ExitStatus:: Success
Output::
[2J[3J[H[[90mHH:MM:SS AM[0m] Starting compilation in watch mode...

[[90mHH:MM:SS AM[0m] Projects in this build: 
    * project1/tsconfig.json
    * project2/tsconfig.json
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'project1/tsconfig.json' is out of date because output file 'project1/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project 'project1/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'project2/tsconfig.json' is out of date because output file 'project2/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project 'project2/tsconfig.json'...

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
//// [/home/src/tslibs/TS/Lib/lib.esnext.full.d.ts] *Lib*
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
//// [/user/username/projects/myproject/project1/index.d.ts] *new* 
export {};

//// [/user/username/projects/myproject/project1/index.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

//// [/user/username/projects/myproject/project1/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":[3],"fileNames":["lib.d.ts","./node_modules/file/index.d.ts","./index.ts","../node_modules/@types/foo/index.d.ts","../node_modules/@types/bar/index.d.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},"bf6a9897955595825a99e7ef50878c55-export const foo = 10;",{"version":"7ae42cb6eee47288e3acb472bb3aad16-import { foo } from \"file\";","signature":"abe7d9981d6018efb6b2b794f40a1607-export {};\n","impliedNodeFormat":1},"bf6a9897955595825a99e7ef50878c55-export const foo = 10;","a0d503557e945e94b2464694c91a48ba-export const bar = 10;"],"fileIdsList":[[2]],"options":{"composite":true},"referencedMap":[[3,1]],"latestChangedDtsFile":"./index.d.ts"}
//// [/user/username/projects/myproject/project1/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./index.ts"
      ],
      "original": 3
    }
  ],
  "fileNames": [
    "lib.d.ts",
    "./node_modules/file/index.d.ts",
    "./index.ts",
    "../node_modules/@types/foo/index.d.ts",
    "../node_modules/@types/bar/index.d.ts"
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
      "fileName": "./node_modules/file/index.d.ts",
      "version": "bf6a9897955595825a99e7ef50878c55-export const foo = 10;",
      "signature": "bf6a9897955595825a99e7ef50878c55-export const foo = 10;",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "./index.ts",
      "version": "7ae42cb6eee47288e3acb472bb3aad16-import { foo } from \"file\";",
      "signature": "abe7d9981d6018efb6b2b794f40a1607-export {};\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "7ae42cb6eee47288e3acb472bb3aad16-import { foo } from \"file\";",
        "signature": "abe7d9981d6018efb6b2b794f40a1607-export {};\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "../node_modules/@types/foo/index.d.ts",
      "version": "bf6a9897955595825a99e7ef50878c55-export const foo = 10;",
      "signature": "bf6a9897955595825a99e7ef50878c55-export const foo = 10;",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "../node_modules/@types/bar/index.d.ts",
      "version": "a0d503557e945e94b2464694c91a48ba-export const bar = 10;",
      "signature": "a0d503557e945e94b2464694c91a48ba-export const bar = 10;",
      "impliedNodeFormat": "CommonJS"
    }
  ],
  "fileIdsList": [
    [
      "./node_modules/file/index.d.ts"
    ]
  ],
  "options": {
    "composite": true
  },
  "referencedMap": {
    "./index.ts": [
      "./node_modules/file/index.d.ts"
    ]
  },
  "latestChangedDtsFile": "./index.d.ts",
  "size": 1417
}
//// [/user/username/projects/myproject/project2/index.d.ts] *new* 
export {};

//// [/user/username/projects/myproject/project2/index.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

//// [/user/username/projects/myproject/project2/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":[3],"fileNames":["lib.esnext.full.d.ts","./node_modules/file/index.d.ts","./index.ts","../node_modules/@types/foo/index.d.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},"bf6a9897955595825a99e7ef50878c55-export const foo = 10;",{"version":"7ae42cb6eee47288e3acb472bb3aad16-import { foo } from \"file\";","signature":"abe7d9981d6018efb6b2b794f40a1607-export {};\n","impliedNodeFormat":1},"bf6a9897955595825a99e7ef50878c55-export const foo = 10;"],"fileIdsList":[[2]],"options":{"composite":true,"module":199},"referencedMap":[[3,1]],"latestChangedDtsFile":"./index.d.ts"}
//// [/user/username/projects/myproject/project2/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./index.ts"
      ],
      "original": 3
    }
  ],
  "fileNames": [
    "lib.esnext.full.d.ts",
    "./node_modules/file/index.d.ts",
    "./index.ts",
    "../node_modules/@types/foo/index.d.ts"
  ],
  "fileInfos": [
    {
      "fileName": "lib.esnext.full.d.ts",
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
      "fileName": "./node_modules/file/index.d.ts",
      "version": "bf6a9897955595825a99e7ef50878c55-export const foo = 10;",
      "signature": "bf6a9897955595825a99e7ef50878c55-export const foo = 10;",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "./index.ts",
      "version": "7ae42cb6eee47288e3acb472bb3aad16-import { foo } from \"file\";",
      "signature": "abe7d9981d6018efb6b2b794f40a1607-export {};\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "7ae42cb6eee47288e3acb472bb3aad16-import { foo } from \"file\";",
        "signature": "abe7d9981d6018efb6b2b794f40a1607-export {};\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "../node_modules/@types/foo/index.d.ts",
      "version": "bf6a9897955595825a99e7ef50878c55-export const foo = 10;",
      "signature": "bf6a9897955595825a99e7ef50878c55-export const foo = 10;",
      "impliedNodeFormat": "CommonJS"
    }
  ],
  "fileIdsList": [
    [
      "./node_modules/file/index.d.ts"
    ]
  ],
  "options": {
    "composite": true,
    "module": 199
  },
  "referencedMap": {
    "./index.ts": [
      "./node_modules/file/index.d.ts"
    ]
  },
  "latestChangedDtsFile": "./index.d.ts",
  "size": 1344
}

project1/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.d.ts
*refresh*    /user/username/projects/myproject/project1/node_modules/file/index.d.ts
*refresh*    /user/username/projects/myproject/project1/index.ts
*refresh*    /user/username/projects/myproject/node_modules/@types/foo/index.d.ts
*refresh*    /user/username/projects/myproject/node_modules/@types/bar/index.d.ts
Signatures::
(stored at emit) /user/username/projects/myproject/project1/index.ts

project2/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.esnext.full.d.ts
*refresh*    /user/username/projects/myproject/project2/node_modules/file/index.d.ts
*refresh*    /user/username/projects/myproject/project2/index.ts
*refresh*    /user/username/projects/myproject/node_modules/@types/foo/index.d.ts
Signatures::
(stored at emit) /user/username/projects/myproject/project2/index.ts


Edit [0]:: Append text
//// [/user/username/projects/myproject/project1/index.ts] *modified* 
import { foo } from "file";const bar = 10;


Output::
[2J[3J[H[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

[[90mHH:MM:SS AM[0m] Projects in this build: 
    * project1/tsconfig.json
    * project2/tsconfig.json
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'project1/tsconfig.json' is out of date because output 'project1/tsconfig.tsbuildinfo' is older than input 'project1/index.ts'

[[90mHH:MM:SS AM[0m] Building project 'project1/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.

//// [/user/username/projects/myproject/project1/index.js] *modified* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bar = 10;

//// [/user/username/projects/myproject/project1/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[3],"fileNames":["lib.d.ts","./node_modules/file/index.d.ts","./index.ts","../node_modules/@types/foo/index.d.ts","../node_modules/@types/bar/index.d.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},"bf6a9897955595825a99e7ef50878c55-export const foo = 10;",{"version":"1ab147b130b9a5309305c28d6be6beb4-import { foo } from \"file\";const bar = 10;","signature":"abe7d9981d6018efb6b2b794f40a1607-export {};\n","impliedNodeFormat":1},"bf6a9897955595825a99e7ef50878c55-export const foo = 10;","a0d503557e945e94b2464694c91a48ba-export const bar = 10;"],"fileIdsList":[[2]],"options":{"composite":true},"referencedMap":[[3,1]],"latestChangedDtsFile":"./index.d.ts"}
//// [/user/username/projects/myproject/project1/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./index.ts"
      ],
      "original": 3
    }
  ],
  "fileNames": [
    "lib.d.ts",
    "./node_modules/file/index.d.ts",
    "./index.ts",
    "../node_modules/@types/foo/index.d.ts",
    "../node_modules/@types/bar/index.d.ts"
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
      "fileName": "./node_modules/file/index.d.ts",
      "version": "bf6a9897955595825a99e7ef50878c55-export const foo = 10;",
      "signature": "bf6a9897955595825a99e7ef50878c55-export const foo = 10;",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "./index.ts",
      "version": "1ab147b130b9a5309305c28d6be6beb4-import { foo } from \"file\";const bar = 10;",
      "signature": "abe7d9981d6018efb6b2b794f40a1607-export {};\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "1ab147b130b9a5309305c28d6be6beb4-import { foo } from \"file\";const bar = 10;",
        "signature": "abe7d9981d6018efb6b2b794f40a1607-export {};\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "../node_modules/@types/foo/index.d.ts",
      "version": "bf6a9897955595825a99e7ef50878c55-export const foo = 10;",
      "signature": "bf6a9897955595825a99e7ef50878c55-export const foo = 10;",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "../node_modules/@types/bar/index.d.ts",
      "version": "a0d503557e945e94b2464694c91a48ba-export const bar = 10;",
      "signature": "a0d503557e945e94b2464694c91a48ba-export const bar = 10;",
      "impliedNodeFormat": "CommonJS"
    }
  ],
  "fileIdsList": [
    [
      "./node_modules/file/index.d.ts"
    ]
  ],
  "options": {
    "composite": true
  },
  "referencedMap": {
    "./index.ts": [
      "./node_modules/file/index.d.ts"
    ]
  },
  "latestChangedDtsFile": "./index.d.ts",
  "size": 1432
}

project1/tsconfig.json::
SemanticDiagnostics::
*refresh*    /user/username/projects/myproject/project1/index.ts
Signatures::
(computed .d.ts) /user/username/projects/myproject/project1/index.ts
