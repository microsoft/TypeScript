currentDirectory::/home/src/workspaces/project
useCaseSensitiveFileNames::true
Input::
//// [/home/src/workspaces/project/app.vue] *new* 
export const app = 1;
//// [/home/src/workspaces/project/index.ts] *new* 
export const local = 1;
//// [/home/src/workspaces/project/node_modules/vue-ts-mapper/package.json] *new* 
{
    "name": "vue-ts-mapper",
    "version": "1.0.0",
    "typescript": { "contentMapper": { "exec": ["verbatim-mapper"] } }
}
//// [/home/src/workspaces/project/tsconfig.json] *new* 
{
    "compilerOptions": {
        "incremental": true
    },
    "contentMappers": [
        { "package": "vue-ts-mapper", "extensions": [".vue"] }
    ]
}

tsgo --build --verbose --runExternalCode
ExitStatus:: Success
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because output file 'tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project 'tsconfig.json'...

//// [/home/src/tslibs/TS/Lib/lib.es2025.full.d.ts] *Lib*
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
//// [/home/src/workspaces/project/index.js] *new* 
export const local = 1;

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":[[2,3]],"contentMapperIdentities":["vue-ts-mapper@1.0.0:73be0d73aaae2d96a1838e1c836ed877"],"fileNames":["lib.es2025.full.d.ts","./app.vue","./index.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},"1580cf1a4ed94901306464bcb265de50-export const app = 1;\u0000vue-ts-mapper@1.0.0:73be0d73aaae2d96a1838e1c836ed877","652b2b5c9eb278600aaa728787469dc8-export const local = 1;"]}
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./app.vue",
        "./index.ts"
      ],
      "original": [
        2,
        3
      ]
    }
  ],
  "fileNames": [
    "lib.es2025.full.d.ts",
    "./app.vue",
    "./index.ts"
  ],
  "fileInfos": [
    {
      "fileName": "lib.es2025.full.d.ts",
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
      "fileName": "./app.vue",
      "version": "1580cf1a4ed94901306464bcb265de50-export const app = 1;\u0000vue-ts-mapper@1.0.0:73be0d73aaae2d96a1838e1c836ed877",
      "signature": "1580cf1a4ed94901306464bcb265de50-export const app = 1;\u0000vue-ts-mapper@1.0.0:73be0d73aaae2d96a1838e1c836ed877",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "./index.ts",
      "version": "652b2b5c9eb278600aaa728787469dc8-export const local = 1;",
      "signature": "652b2b5c9eb278600aaa728787469dc8-export const local = 1;",
      "impliedNodeFormat": "CommonJS"
    }
  ],
  "size": 1145
}

tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es2025.full.d.ts
*refresh*    /home/src/workspaces/project/app.vue
*refresh*    /home/src/workspaces/project/index.ts
Signatures::


Edit [0]:: no change

tsgo --build --verbose --runExternalCode
ExitStatus:: Success
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is up to date because newest input 'index.ts' is older than output 'tsconfig.tsbuildinfo'




Edit [1]:: upgrade the content mapper package to a new version
//// [/home/src/workspaces/project/node_modules/vue-ts-mapper/package.json] *modified* 
{
    "name": "vue-ts-mapper",
    "version": "2.0.0",
    "typescript": { "contentMapper": { "exec": ["verbatim-mapper"] } }
}

tsgo --build --verbose --runExternalCode
ExitStatus:: Success
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because buildinfo file 'tsconfig.tsbuildinfo' indicates there is change in compilerOptions

[[90mHH:MM:SS AM[0m] Building project 'tsconfig.json'...

//// [/home/src/workspaces/project/index.js] *rewrite with same content*
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[[2,3]],"contentMapperIdentities":["vue-ts-mapper@2.0.0:05b947849e920bdde4933cf4d8e7aea7"],"fileNames":["lib.es2025.full.d.ts","./app.vue","./index.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},"c9c9dc3a72743c8966ee574132b43f06-export const app = 1;\u0000vue-ts-mapper@2.0.0:05b947849e920bdde4933cf4d8e7aea7","652b2b5c9eb278600aaa728787469dc8-export const local = 1;"]}
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./app.vue",
        "./index.ts"
      ],
      "original": [
        2,
        3
      ]
    }
  ],
  "fileNames": [
    "lib.es2025.full.d.ts",
    "./app.vue",
    "./index.ts"
  ],
  "fileInfos": [
    {
      "fileName": "lib.es2025.full.d.ts",
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
      "fileName": "./app.vue",
      "version": "c9c9dc3a72743c8966ee574132b43f06-export const app = 1;\u0000vue-ts-mapper@2.0.0:05b947849e920bdde4933cf4d8e7aea7",
      "signature": "c9c9dc3a72743c8966ee574132b43f06-export const app = 1;\u0000vue-ts-mapper@2.0.0:05b947849e920bdde4933cf4d8e7aea7",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "./index.ts",
      "version": "652b2b5c9eb278600aaa728787469dc8-export const local = 1;",
      "signature": "652b2b5c9eb278600aaa728787469dc8-export const local = 1;",
      "impliedNodeFormat": "CommonJS"
    }
  ],
  "size": 1145
}

tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es2025.full.d.ts
*refresh*    /home/src/workspaces/project/app.vue
*refresh*    /home/src/workspaces/project/index.ts
Signatures::


Edit [2]:: no change

tsgo --build --verbose --runExternalCode
ExitStatus:: Success
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is up to date because newest input 'index.ts' is older than output 'tsconfig.tsbuildinfo'


