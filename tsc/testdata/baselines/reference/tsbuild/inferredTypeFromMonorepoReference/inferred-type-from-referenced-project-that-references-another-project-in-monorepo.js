currentDirectory::/home/src/workspaces/solution
useCaseSensitiveFileNames::true
Input::
//// [/home/src/workspaces/solution/node_modules/package-a] -> /home/src/workspaces/solution/packages/package-a *new*
//// [/home/src/workspaces/solution/node_modules/package-b] -> /home/src/workspaces/solution/packages/package-b *new*
//// [/home/src/workspaces/solution/node_modules/package-c] -> /home/src/workspaces/solution/packages/package-c *new*
//// [/home/src/workspaces/solution/package.json] *new* 
{
    "name": "tsgo-monorepo-issue",
    "private": true,
    "workspaces": ["packages/*"]
}
//// [/home/src/workspaces/solution/packages/package-a/package.json] *new* 
{
    "name": "package-a",
    "version": "1.0.0",
    "private": true,
    "type": "module",
    "main": "./src/index.ts",
    "types": "./src/index.ts",
    "exports": {
        ".": "./src/index.ts"
    },
    "dependencies": {
        "package-b": "workspace:*"
    }
}
//// [/home/src/workspaces/solution/packages/package-a/src/index.ts] *new* 
import { createThing } from "package-b";

class MyClass {
    public thing = createThing({ id: "1", name: "test", enabled: true });
}

export { MyClass };
//// [/home/src/workspaces/solution/packages/package-a/tsconfig.json] *new* 
{
    "compilerOptions": {
        "composite": true,
        "declaration": true,
        "emitDeclarationOnly": true,
        "module": "ESNext",
        "moduleResolution": "Bundler",
        "target": "ES2022",
        "outDir": "./out",
        "rootDir": "./src"
    },
    "include": ["src/**/*"],
    "references": [{ "path": "../package-b" }]
}
//// [/home/src/workspaces/solution/packages/package-b/package.json] *new* 
{
    "name": "package-b",
    "version": "1.0.0",
    "private": true,
    "type": "module",
    "main": "./src/index.ts",
    "types": "./src/index.ts",
    "exports": {
        ".": "./src/index.ts"
    },
    "dependencies": {
        "package-c": "workspace:*"
    }
}
//// [/home/src/workspaces/solution/packages/package-b/src/index.ts] *new* 
import type { MyType } from "package-c";

export function createThing(input: MyType): MyType {
    return { ...input };
}
//// [/home/src/workspaces/solution/packages/package-b/tsconfig.json] *new* 
{
    "compilerOptions": {
        "composite": true,
        "declaration": true,
        "emitDeclarationOnly": true,
        "module": "ESNext",
        "moduleResolution": "Bundler",
        "target": "ES2022",
        "outDir": "./out",
        "rootDir": "./src"
    },
    "include": ["src/**/*"],
    "references": [{ "path": "../package-c" }]
}
//// [/home/src/workspaces/solution/packages/package-c/package.json] *new* 
{
    "name": "package-c",
    "version": "1.0.0",
    "private": true,
    "type": "module",
    "main": "./src/index.ts",
    "types": "./src/index.ts",
    "exports": {
        ".": "./src/index.ts"
    }
}
//// [/home/src/workspaces/solution/packages/package-c/src/index.ts] *new* 
export interface MyType {
    id: string;
    name: string;
    enabled: boolean;
}
//// [/home/src/workspaces/solution/packages/package-c/tsconfig.json] *new* 
{
    "compilerOptions": {
        "composite": true,
        "declaration": true,
        "emitDeclarationOnly": true,
        "module": "ESNext",
        "moduleResolution": "Bundler",
        "target": "ES2022",
        "outDir": "./out",
        "rootDir": "./src"
    },
    "include": ["src/**/*"]
}
//// [/home/src/workspaces/solution/tsconfig.json] *new* 
{
    "files": [],
    "include": [],
    "references": [
        { "path": "packages/package-a" },
        { "path": "packages/package-b" },
        { "path": "packages/package-c" }
    ]
}

tsgo --b --verbose
ExitStatus:: Success
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * packages/package-c/tsconfig.json
    * packages/package-b/tsconfig.json
    * packages/package-a/tsconfig.json
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'packages/package-c/tsconfig.json' is out of date because output file 'packages/package-c/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project 'packages/package-c/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'packages/package-b/tsconfig.json' is out of date because output file 'packages/package-b/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project 'packages/package-b/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'packages/package-a/tsconfig.json' is out of date because output file 'packages/package-a/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project 'packages/package-a/tsconfig.json'...

//// [/home/src/tslibs/TS/Lib/lib.es2022.full.d.ts] *Lib*
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
//// [/home/src/workspaces/solution/packages/package-a/out/index.d.ts] *new* 
declare class MyClass {
    thing: import("package-c").MyType;
}
export { MyClass };

//// [/home/src/workspaces/solution/packages/package-a/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":[4],"fileNames":["lib.es2022.full.d.ts","../package-c/out/index.d.ts","../package-b/out/index.d.ts","./src/index.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},"fda98a6734eab276b5c9c8694ee117da-export interface MyType {\n    id: string;\n    name: string;\n    enabled: boolean;\n}\n","c244312b1cf9f2fd4ddd2d16bb44d0b9-import type { MyType } from \"package-c\";\nexport declare function createThing(input: MyType): MyType;\n",{"version":"1b8e37ecd837c2f357c793c86828b133-import { createThing } from \"package-b\";\n\nclass MyClass {\n    public thing = createThing({ id: \"1\", name: \"test\", enabled: true });\n}\n\nexport { MyClass };","signature":"f0d3d8e75bf995728f62a7d715cdf8a8-declare class MyClass {\n    thing: import(\"package-c\").MyType;\n}\nexport { MyClass };\n","impliedNodeFormat":1}],"fileIdsList":[[3],[2]],"options":{"composite":true,"emitDeclarationOnly":true,"declaration":true,"module":99,"outDir":"./out","rootDir":"./src","target":9},"referencedMap":[[4,1],[3,2]],"latestChangedDtsFile":"./out/index.d.ts"}
//// [/home/src/workspaces/solution/packages/package-a/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./src/index.ts"
      ],
      "original": 4
    }
  ],
  "fileNames": [
    "lib.es2022.full.d.ts",
    "../package-c/out/index.d.ts",
    "../package-b/out/index.d.ts",
    "./src/index.ts"
  ],
  "fileInfos": [
    {
      "fileName": "lib.es2022.full.d.ts",
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
      "fileName": "../package-c/out/index.d.ts",
      "version": "fda98a6734eab276b5c9c8694ee117da-export interface MyType {\n    id: string;\n    name: string;\n    enabled: boolean;\n}\n",
      "signature": "fda98a6734eab276b5c9c8694ee117da-export interface MyType {\n    id: string;\n    name: string;\n    enabled: boolean;\n}\n",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "../package-b/out/index.d.ts",
      "version": "c244312b1cf9f2fd4ddd2d16bb44d0b9-import type { MyType } from \"package-c\";\nexport declare function createThing(input: MyType): MyType;\n",
      "signature": "c244312b1cf9f2fd4ddd2d16bb44d0b9-import type { MyType } from \"package-c\";\nexport declare function createThing(input: MyType): MyType;\n",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "./src/index.ts",
      "version": "1b8e37ecd837c2f357c793c86828b133-import { createThing } from \"package-b\";\n\nclass MyClass {\n    public thing = createThing({ id: \"1\", name: \"test\", enabled: true });\n}\n\nexport { MyClass };",
      "signature": "f0d3d8e75bf995728f62a7d715cdf8a8-declare class MyClass {\n    thing: import(\"package-c\").MyType;\n}\nexport { MyClass };\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "1b8e37ecd837c2f357c793c86828b133-import { createThing } from \"package-b\";\n\nclass MyClass {\n    public thing = createThing({ id: \"1\", name: \"test\", enabled: true });\n}\n\nexport { MyClass };",
        "signature": "f0d3d8e75bf995728f62a7d715cdf8a8-declare class MyClass {\n    thing: import(\"package-c\").MyType;\n}\nexport { MyClass };\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "fileIdsList": [
    [
      "../package-b/out/index.d.ts"
    ],
    [
      "../package-c/out/index.d.ts"
    ]
  ],
  "options": {
    "composite": true,
    "emitDeclarationOnly": true,
    "declaration": true,
    "module": 99,
    "outDir": "./out",
    "rootDir": "./src",
    "target": 9
  },
  "referencedMap": {
    "./src/index.ts": [
      "../package-b/out/index.d.ts"
    ],
    "../package-b/out/index.d.ts": [
      "../package-c/out/index.d.ts"
    ]
  },
  "latestChangedDtsFile": "./out/index.d.ts",
  "size": 1806
}
//// [/home/src/workspaces/solution/packages/package-b/out/index.d.ts] *new* 
import type { MyType } from "package-c";
export declare function createThing(input: MyType): MyType;

//// [/home/src/workspaces/solution/packages/package-b/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":[3],"fileNames":["lib.es2022.full.d.ts","../package-c/out/index.d.ts","./src/index.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},"fda98a6734eab276b5c9c8694ee117da-export interface MyType {\n    id: string;\n    name: string;\n    enabled: boolean;\n}\n",{"version":"fbb82e716b8d6d09c2f530e11f7c8614-import type { MyType } from \"package-c\";\n\nexport function createThing(input: MyType): MyType {\n    return { ...input };\n}","signature":"c244312b1cf9f2fd4ddd2d16bb44d0b9-import type { MyType } from \"package-c\";\nexport declare function createThing(input: MyType): MyType;\n","impliedNodeFormat":1}],"fileIdsList":[[2]],"options":{"composite":true,"emitDeclarationOnly":true,"declaration":true,"module":99,"outDir":"./out","rootDir":"./src","target":9},"referencedMap":[[3,1]],"latestChangedDtsFile":"./out/index.d.ts"}
//// [/home/src/workspaces/solution/packages/package-b/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./src/index.ts"
      ],
      "original": 3
    }
  ],
  "fileNames": [
    "lib.es2022.full.d.ts",
    "../package-c/out/index.d.ts",
    "./src/index.ts"
  ],
  "fileInfos": [
    {
      "fileName": "lib.es2022.full.d.ts",
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
      "fileName": "../package-c/out/index.d.ts",
      "version": "fda98a6734eab276b5c9c8694ee117da-export interface MyType {\n    id: string;\n    name: string;\n    enabled: boolean;\n}\n",
      "signature": "fda98a6734eab276b5c9c8694ee117da-export interface MyType {\n    id: string;\n    name: string;\n    enabled: boolean;\n}\n",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "./src/index.ts",
      "version": "fbb82e716b8d6d09c2f530e11f7c8614-import type { MyType } from \"package-c\";\n\nexport function createThing(input: MyType): MyType {\n    return { ...input };\n}",
      "signature": "c244312b1cf9f2fd4ddd2d16bb44d0b9-import type { MyType } from \"package-c\";\nexport declare function createThing(input: MyType): MyType;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "fbb82e716b8d6d09c2f530e11f7c8614-import type { MyType } from \"package-c\";\n\nexport function createThing(input: MyType): MyType {\n    return { ...input };\n}",
        "signature": "c244312b1cf9f2fd4ddd2d16bb44d0b9-import type { MyType } from \"package-c\";\nexport declare function createThing(input: MyType): MyType;\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "fileIdsList": [
    [
      "../package-c/out/index.d.ts"
    ]
  ],
  "options": {
    "composite": true,
    "emitDeclarationOnly": true,
    "declaration": true,
    "module": 99,
    "outDir": "./out",
    "rootDir": "./src",
    "target": 9
  },
  "referencedMap": {
    "./src/index.ts": [
      "../package-c/out/index.d.ts"
    ]
  },
  "latestChangedDtsFile": "./out/index.d.ts",
  "size": 1600
}
//// [/home/src/workspaces/solution/packages/package-c/out/index.d.ts] *new* 
export interface MyType {
    id: string;
    name: string;
    enabled: boolean;
}

//// [/home/src/workspaces/solution/packages/package-c/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":[2],"fileNames":["lib.es2022.full.d.ts","./src/index.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"998713b32693f1c4f45ac4bad0f3285c-export interface MyType {\n    id: string;\n    name: string;\n    enabled: boolean;\n}","signature":"fda98a6734eab276b5c9c8694ee117da-export interface MyType {\n    id: string;\n    name: string;\n    enabled: boolean;\n}\n","impliedNodeFormat":1}],"options":{"composite":true,"emitDeclarationOnly":true,"declaration":true,"module":99,"outDir":"./out","rootDir":"./src","target":9},"latestChangedDtsFile":"./out/index.d.ts"}
//// [/home/src/workspaces/solution/packages/package-c/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./src/index.ts"
      ],
      "original": 2
    }
  ],
  "fileNames": [
    "lib.es2022.full.d.ts",
    "./src/index.ts"
  ],
  "fileInfos": [
    {
      "fileName": "lib.es2022.full.d.ts",
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
      "fileName": "./src/index.ts",
      "version": "998713b32693f1c4f45ac4bad0f3285c-export interface MyType {\n    id: string;\n    name: string;\n    enabled: boolean;\n}",
      "signature": "fda98a6734eab276b5c9c8694ee117da-export interface MyType {\n    id: string;\n    name: string;\n    enabled: boolean;\n}\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "998713b32693f1c4f45ac4bad0f3285c-export interface MyType {\n    id: string;\n    name: string;\n    enabled: boolean;\n}",
        "signature": "fda98a6734eab276b5c9c8694ee117da-export interface MyType {\n    id: string;\n    name: string;\n    enabled: boolean;\n}\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "options": {
    "composite": true,
    "emitDeclarationOnly": true,
    "declaration": true,
    "module": 99,
    "outDir": "./out",
    "rootDir": "./src",
    "target": 9
  },
  "latestChangedDtsFile": "./out/index.d.ts",
  "size": 1345
}

packages/package-c/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es2022.full.d.ts
*refresh*    /home/src/workspaces/solution/packages/package-c/src/index.ts
Signatures::
(stored at emit) /home/src/workspaces/solution/packages/package-c/src/index.ts

packages/package-b/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es2022.full.d.ts
*refresh*    /home/src/workspaces/solution/packages/package-c/out/index.d.ts
*refresh*    /home/src/workspaces/solution/packages/package-b/src/index.ts
Signatures::
(stored at emit) /home/src/workspaces/solution/packages/package-b/src/index.ts

packages/package-a/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es2022.full.d.ts
*refresh*    /home/src/workspaces/solution/packages/package-c/out/index.d.ts
*refresh*    /home/src/workspaces/solution/packages/package-b/out/index.d.ts
*refresh*    /home/src/workspaces/solution/packages/package-a/src/index.ts
Signatures::
(stored at emit) /home/src/workspaces/solution/packages/package-a/src/index.ts
