currentDirectory::/home/src/workspaces/solution
useCaseSensitiveFileNames::true
Input::
//// [/home/src/workspaces/solution/dist/compiler/parser.d.ts] *new* 
export {};
//// [/home/src/workspaces/solution/src/compiler/parser.ts] *new* 
export {};
//// [/home/src/workspaces/solution/src/compiler/tsconfig.json] *new* 
{
    "extends": "../tsconfig-base.json",
    "compilerOptions": {
        "rootDir": ".",
        "outDir": "../../dist/compiler"
    }
}
//// [/home/src/workspaces/solution/src/services/services.ts] *new* 
import {} from "../compiler/parser.ts";
//// [/home/src/workspaces/solution/src/services/tsconfig.json] *new* 
{
    "extends": "../tsconfig-base.json",
    "compilerOptions": {
        "rootDir": ".", 
        "outDir": "../../dist/services"
    },
    "references": [
        { "path": "../compiler" }
    ]
}
//// [/home/src/workspaces/solution/src/tsconfig-base.json] *new* 
{
    "compilerOptions": { 
        "module": "nodenext",
        "composite": true,
        "rewriteRelativeImportExtensions": true
    }
}

tsgo --p src/services --pretty false
ExitStatus:: Success
Output::
No output
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
//// [/home/src/workspaces/solution/dist/services/services.d.ts] *new* 
export {};

//// [/home/src/workspaces/solution/dist/services/services.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

//// [/home/src/workspaces/solution/dist/services/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","fileNames":["../../../../tslibs/TS/Lib/lib.esnext.full.d.ts","../compiler/parser.d.ts","../../src/services/services.ts"],"fileInfos":[{"version":"eae9e83ef0f77eeb2e35dc9b91facce1-/// \u003creference no-default-lib=\"true\"/\u003e\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array\u003cT\u003e { length: number; [n: number]: T; }\ninterface ReadonlyArray\u003cT\u003e {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},"cfa3a281a55f906e741cc0868d71cc7e-export {};",{"version":"f33c006175af536b357e04f67c3196f8-import {} from \"../compiler/parser.ts\";","signature":"04e66752f096b7e8df60e5900b0692bc-export {};\n","impliedNodeFormat":1}],"fileIdsList":[[2]],"options":{"composite":true,"module":199,"outDir":"./","rewriteRelativeImportExtensions":true,"rootDir":"../../src/services"},"referencedMap":[[3,1]],"latestChangedDtsFile":"./services.d.ts"}
//// [/home/src/workspaces/solution/dist/services/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "fileNames": [
    "../../../../tslibs/TS/Lib/lib.esnext.full.d.ts",
    "../compiler/parser.d.ts",
    "../../src/services/services.ts"
  ],
  "fileInfos": [
    {
      "fileName": "../../../../tslibs/TS/Lib/lib.esnext.full.d.ts",
      "version": "eae9e83ef0f77eeb2e35dc9b91facce1-/// \u003creference no-default-lib=\"true\"/\u003e\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array\u003cT\u003e { length: number; [n: number]: T; }\ninterface ReadonlyArray\u003cT\u003e {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };",
      "signature": "eae9e83ef0f77eeb2e35dc9b91facce1-/// \u003creference no-default-lib=\"true\"/\u003e\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array\u003cT\u003e { length: number; [n: number]: T; }\ninterface ReadonlyArray\u003cT\u003e {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "eae9e83ef0f77eeb2e35dc9b91facce1-/// \u003creference no-default-lib=\"true\"/\u003e\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array\u003cT\u003e { length: number; [n: number]: T; }\ninterface ReadonlyArray\u003cT\u003e {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "../compiler/parser.d.ts",
      "version": "cfa3a281a55f906e741cc0868d71cc7e-export {};",
      "signature": "cfa3a281a55f906e741cc0868d71cc7e-export {};",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "../../src/services/services.ts",
      "version": "f33c006175af536b357e04f67c3196f8-import {} from \"../compiler/parser.ts\";",
      "signature": "04e66752f096b7e8df60e5900b0692bc-export {};\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "f33c006175af536b357e04f67c3196f8-import {} from \"../compiler/parser.ts\";",
        "signature": "04e66752f096b7e8df60e5900b0692bc-export {};\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "fileIdsList": [
    [
      "../compiler/parser.d.ts"
    ]
  ],
  "options": {
    "composite": true,
    "module": 199,
    "outDir": "./",
    "rewriteRelativeImportExtensions": true,
    "rootDir": "../../src/services"
  },
  "referencedMap": {
    "../../src/services/services.ts": [
      "../compiler/parser.d.ts"
    ]
  },
  "latestChangedDtsFile": "./services.d.ts",
  "size": 1391
}

SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.esnext.full.d.ts
*refresh*    /home/src/workspaces/solution/dist/compiler/parser.d.ts
*refresh*    /home/src/workspaces/solution/src/services/services.ts
Signatures::
(stored at emit) /home/src/workspaces/solution/src/services/services.ts
