currentDirectory::/home/src/workspaces/solution
useCaseSensitiveFileNames::true
Input::
//// [/home/src/workspaces/solution/project/src/hello.json] *new* 
{
    "hello": "world"
}
//// [/home/src/workspaces/solution/project/src/index.ts] *new* 
import hello from "./hello.json"
export default hello.hello
//// [/home/src/workspaces/solution/project/tsconfig.json] *new* 
{
    "compilerOptions": {
        "composite": true,
        "moduleResolution": "node",
        "module": "commonjs",
        "resolveJsonModule": true,
        "esModuleInterop": true,
        "allowSyntheticDefaultImports": true,
        "outDir": "dist",
        "skipDefaultLibCheck": true,
        "sourceMap": true,
    },
    "files": [ "src/index.ts", "src/hello.json", ],
}

tsgo --b project --v --explainFiles --listEmittedFiles
ExitStatus:: Success
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * project/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'project/tsconfig.json' is out of date because output file 'project/dist/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project 'project/tsconfig.json'...

TSFILE:  /home/src/workspaces/solution/project/dist/src/hello.json
TSFILE:  /home/src/workspaces/solution/project/dist/src/index.js.map
TSFILE:  /home/src/workspaces/solution/project/dist/src/index.js
TSFILE:  /home/src/workspaces/solution/project/dist/src/index.d.ts
TSFILE:  /home/src/workspaces/solution/project/dist/tsconfig.tsbuildinfo
../../tslibs/TS/Lib/lib.d.ts
   Default library for target 'ES5'
project/src/hello.json
   Imported via "./hello.json" from file 'project/src/index.ts'
   Part of 'files' list in tsconfig.json
project/src/index.ts
   Part of 'files' list in tsconfig.json
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
//// [/home/src/workspaces/solution/project/dist/src/hello.json] *new* 
{
    "hello": "world"
}

//// [/home/src/workspaces/solution/project/dist/src/index.d.ts] *new* 
declare const _default: string;
export default _default;

//// [/home/src/workspaces/solution/project/dist/src/index.js] *new* 
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const hello_json_1 = __importDefault(require("./hello.json"));
exports.default = hello_json_1.default.hello;
//# sourceMappingURL=index.js.map
//// [/home/src/workspaces/solution/project/dist/src/index.js.map] *new* 
{"version":3,"file":"index.js","sourceRoot":"","sources":["../../src/index.ts"],"names":[],"mappings":";;;;;AAAA,8DAAgC;kBACjB,oBAAK,CAAC,KAAK"}
//// [/home/src/workspaces/solution/project/dist/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":[[2,3]],"fileNames":["lib.d.ts","../src/hello.json","../src/index.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"18e7247c85a6a2e7a4ec2e284716edd8-{\n    \"hello\": \"world\"\n}"},{"version":"c15eb6733af1bd811cd113368bb377e5-import hello from \"./hello.json\"\nexport default hello.hello","signature":"a44184f4ac1ed50126ac624c885b51a8-declare const _default: string;\nexport default _default;\n","impliedNodeFormat":1}],"fileIdsList":[[2]],"options":{"allowSyntheticDefaultImports":true,"composite":true,"esModuleInterop":true,"module":1,"outDir":"./","skipDefaultLibCheck":true,"sourceMap":true},"referencedMap":[[3,1]],"latestChangedDtsFile":"./src/index.d.ts"}
//// [/home/src/workspaces/solution/project/dist/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "../src/hello.json",
        "../src/index.ts"
      ],
      "original": [
        2,
        3
      ]
    }
  ],
  "fileNames": [
    "lib.d.ts",
    "../src/hello.json",
    "../src/index.ts"
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
      "fileName": "../src/hello.json",
      "version": "18e7247c85a6a2e7a4ec2e284716edd8-{\n    \"hello\": \"world\"\n}",
      "signature": "18e7247c85a6a2e7a4ec2e284716edd8-{\n    \"hello\": \"world\"\n}",
      "impliedNodeFormat": "None",
      "original": {
        "version": "18e7247c85a6a2e7a4ec2e284716edd8-{\n    \"hello\": \"world\"\n}"
      }
    },
    {
      "fileName": "../src/index.ts",
      "version": "c15eb6733af1bd811cd113368bb377e5-import hello from \"./hello.json\"\nexport default hello.hello",
      "signature": "a44184f4ac1ed50126ac624c885b51a8-declare const _default: string;\nexport default _default;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "c15eb6733af1bd811cd113368bb377e5-import hello from \"./hello.json\"\nexport default hello.hello",
        "signature": "a44184f4ac1ed50126ac624c885b51a8-declare const _default: string;\nexport default _default;\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "fileIdsList": [
    [
      "../src/hello.json"
    ]
  ],
  "options": {
    "allowSyntheticDefaultImports": true,
    "composite": true,
    "esModuleInterop": true,
    "module": 1,
    "outDir": "./",
    "skipDefaultLibCheck": true,
    "sourceMap": true
  },
  "referencedMap": {
    "../src/index.ts": [
      "../src/hello.json"
    ]
  },
  "latestChangedDtsFile": "./src/index.d.ts",
  "size": 1449
}

project/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.d.ts
*refresh*    /home/src/workspaces/solution/project/src/hello.json
*refresh*    /home/src/workspaces/solution/project/src/index.ts
Signatures::
(stored at emit) /home/src/workspaces/solution/project/src/index.ts


Edit [0]:: no change

tsgo --b project --v --explainFiles --listEmittedFiles
ExitStatus:: Success
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * project/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'project/tsconfig.json' is up to date because newest input 'project/src/index.ts' is older than output 'project/dist/tsconfig.tsbuildinfo'


