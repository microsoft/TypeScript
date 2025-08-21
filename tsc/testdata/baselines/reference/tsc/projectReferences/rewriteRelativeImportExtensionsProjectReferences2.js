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
    "compilerOptions": {}
}
//// [/home/src/workspaces/solution/src/services/services.ts] *new* 
import {} from "../compiler/parser.ts";
//// [/home/src/workspaces/solution/src/services/tsconfig.json] *new* 
{
    "extends": "../tsconfig-base.json",
    "compilerOptions": {},
    "references": [
        { "path": "../compiler" }
    ]
}
//// [/home/src/workspaces/solution/src/tsconfig-base.json] *new* 
{
    "compilerOptions": {
        "module": "nodenext",
        "composite": true,
        "rootDir": ".",
        "outDir": "../dist",
        "rewriteRelativeImportExtensions": true
    }
}

tsgo --p src/services --pretty false
ExitStatus:: Success
Output::
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
{"version":"FakeTSVersion","root":[3],"fileNames":["lib.esnext.full.d.ts","../compiler/parser.d.ts","../../src/services/services.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},"e7d000b03d217d92080c065ffa5ccd5e-export {};",{"version":"a59ae1ffa1209f5747a43f6a4028f563-import {} from \"../compiler/parser.ts\";","signature":"abe7d9981d6018efb6b2b794f40a1607-export {};\n","impliedNodeFormat":1}],"fileIdsList":[[2]],"options":{"composite":true,"module":199,"outDir":"..","rewriteRelativeImportExtensions":true,"rootDir":"../../src"},"referencedMap":[[3,1]],"latestChangedDtsFile":"./services.d.ts"}
//// [/home/src/workspaces/solution/dist/services/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "../../src/services/services.ts"
      ],
      "original": 3
    }
  ],
  "fileNames": [
    "lib.esnext.full.d.ts",
    "../compiler/parser.d.ts",
    "../../src/services/services.ts"
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
      "fileName": "../compiler/parser.d.ts",
      "version": "e7d000b03d217d92080c065ffa5ccd5e-export {};",
      "signature": "e7d000b03d217d92080c065ffa5ccd5e-export {};",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "../../src/services/services.ts",
      "version": "a59ae1ffa1209f5747a43f6a4028f563-import {} from \"../compiler/parser.ts\";",
      "signature": "abe7d9981d6018efb6b2b794f40a1607-export {};\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "a59ae1ffa1209f5747a43f6a4028f563-import {} from \"../compiler/parser.ts\";",
        "signature": "abe7d9981d6018efb6b2b794f40a1607-export {};\n",
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
    "outDir": "..",
    "rewriteRelativeImportExtensions": true,
    "rootDir": "../../src"
  },
  "referencedMap": {
    "../../src/services/services.ts": [
      "../compiler/parser.d.ts"
    ]
  },
  "latestChangedDtsFile": "./services.d.ts",
  "size": 1337
}

src/services/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.esnext.full.d.ts
*refresh*    /home/src/workspaces/solution/dist/compiler/parser.d.ts
*refresh*    /home/src/workspaces/solution/src/services/services.ts
Signatures::
(stored at emit) /home/src/workspaces/solution/src/services/services.ts
