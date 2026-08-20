currentDirectory::/home/src/workspaces/project
useCaseSensitiveFileNames::true
Input::
//// [/home/src/workspaces/project/node_modules/my-dep/alt.d.ts] *new* 
export declare const myValue: number;
//// [/home/src/workspaces/project/node_modules/my-dep/index.d.ts] *new* 
export declare const myValue: string;
//// [/home/src/workspaces/project/src/index.ts] *new* 
import { myValue } from "my-dep";
export const value: string = myValue;
//// [/home/src/workspaces/project/tsconfig.json] *new* 
{
    "compilerOptions": {
        "composite": true,
        "outDir": "dist",
        "strict": true
    },
    "include": ["src/**/*"]
}

tsgo --b --verbose
ExitStatus:: Success
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because output file 'dist/tsconfig.tsbuildinfo' does not exist

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
//// [/home/src/workspaces/project/dist/src/index.d.ts] *new* 
export declare const value: string;

//// [/home/src/workspaces/project/dist/src/index.js] *new* 
import { myValue } from "my-dep";
export const value = myValue;

//// [/home/src/workspaces/project/dist/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":[3],"missingPackageJsons":["../node_modules/my-dep/package.json","../node_modules/package.json"],"fileNames":["lib.es2025.full.d.ts","../node_modules/my-dep/index.d.ts","../src/index.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},"4384f7716e1c7cc875e39624007cccc9-export declare const myValue: string;",{"version":"bae961fec80482368db43a089f169190-import { myValue } from \"my-dep\";\nexport const value: string = myValue;","signature":"d704bb9feb766d5360f4081857e4c09e-export declare const value: string;\n","impliedNodeFormat":1}],"fileIdsList":[[2]],"options":{"composite":true,"outDir":"./","strict":true},"referencedMap":[[3,1]],"latestChangedDtsFile":"./src/index.d.ts"}
//// [/home/src/workspaces/project/dist/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "../src/index.ts"
      ],
      "original": 3
    }
  ],
  "missingPackageJsons": [
    "../node_modules/my-dep/package.json",
    "../node_modules/package.json"
  ],
  "fileNames": [
    "lib.es2025.full.d.ts",
    "../node_modules/my-dep/index.d.ts",
    "../src/index.ts"
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
      "fileName": "../node_modules/my-dep/index.d.ts",
      "version": "4384f7716e1c7cc875e39624007cccc9-export declare const myValue: string;",
      "signature": "4384f7716e1c7cc875e39624007cccc9-export declare const myValue: string;",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "../src/index.ts",
      "version": "bae961fec80482368db43a089f169190-import { myValue } from \"my-dep\";\nexport const value: string = myValue;",
      "signature": "d704bb9feb766d5360f4081857e4c09e-export declare const value: string;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "bae961fec80482368db43a089f169190-import { myValue } from \"my-dep\";\nexport const value: string = myValue;",
        "signature": "d704bb9feb766d5360f4081857e4c09e-export declare const value: string;\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "fileIdsList": [
    [
      "../node_modules/my-dep/index.d.ts"
    ]
  ],
  "options": {
    "composite": true,
    "outDir": "./",
    "strict": true
  },
  "referencedMap": {
    "../src/index.ts": [
      "../node_modules/my-dep/index.d.ts"
    ]
  },
  "latestChangedDtsFile": "./src/index.d.ts",
  "size": 1451
}

tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es2025.full.d.ts
*refresh*    /home/src/workspaces/project/node_modules/my-dep/index.d.ts
*refresh*    /home/src/workspaces/project/src/index.ts
Signatures::
(stored at emit) /home/src/workspaces/project/src/index.ts


Edit [0]:: add package json redirecting types to a declaration file with a breaking type change
//// [/home/src/workspaces/project/node_modules/my-dep/package.json] *new* 
{"types":"alt.d.ts"}

tsgo --b --verbose
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because output 'dist/tsconfig.tsbuildinfo' is older than input 'node_modules/my-dep/package.json'

[[90mHH:MM:SS AM[0m] Building project 'tsconfig.json'...

[96msrc/index.ts[0m:[93m2[0m:[93m14[0m - [91merror[0m[90m TS2322: [0mType 'number' is not assignable to type 'string'.

[7m2[0m export const value: string = myValue;
[7m [0m [91m             ~~~~~[0m


Found 1 error in src/index.ts[90m:2[0m

//// [/home/src/workspaces/project/dist/src/index.js] *rewrite with same content*
//// [/home/src/workspaces/project/dist/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[3],"packageJsons":["../node_modules/my-dep/package.json"],"fileNames":["lib.es2025.full.d.ts","../node_modules/my-dep/alt.d.ts","../src/index.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},"936f1acf4d15f440cdb2eb27f80fb9c9-export declare const myValue: number;",{"version":"bae961fec80482368db43a089f169190-import { myValue } from \"my-dep\";\nexport const value: string = myValue;","signature":"d704bb9feb766d5360f4081857e4c09e-export declare const value: string;\n","impliedNodeFormat":1}],"fileIdsList":[[2]],"options":{"composite":true,"outDir":"./","strict":true},"referencedMap":[[3,1]],"semanticDiagnosticsPerFile":[[3,[{"pos":47,"end":52,"code":2322,"category":1,"messageKey":"Type_0_is_not_assignable_to_type_1_2322","messageArgs":["number","string"]}]]],"latestChangedDtsFile":"./src/index.d.ts"}
//// [/home/src/workspaces/project/dist/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "../src/index.ts"
      ],
      "original": 3
    }
  ],
  "packageJsons": [
    "../node_modules/my-dep/package.json"
  ],
  "fileNames": [
    "lib.es2025.full.d.ts",
    "../node_modules/my-dep/alt.d.ts",
    "../src/index.ts"
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
      "fileName": "../node_modules/my-dep/alt.d.ts",
      "version": "936f1acf4d15f440cdb2eb27f80fb9c9-export declare const myValue: number;",
      "signature": "936f1acf4d15f440cdb2eb27f80fb9c9-export declare const myValue: number;",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "../src/index.ts",
      "version": "bae961fec80482368db43a089f169190-import { myValue } from \"my-dep\";\nexport const value: string = myValue;",
      "signature": "d704bb9feb766d5360f4081857e4c09e-export declare const value: string;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "bae961fec80482368db43a089f169190-import { myValue } from \"my-dep\";\nexport const value: string = myValue;",
        "signature": "d704bb9feb766d5360f4081857e4c09e-export declare const value: string;\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "fileIdsList": [
    [
      "../node_modules/my-dep/alt.d.ts"
    ]
  ],
  "options": {
    "composite": true,
    "outDir": "./",
    "strict": true
  },
  "referencedMap": {
    "../src/index.ts": [
      "../node_modules/my-dep/alt.d.ts"
    ]
  },
  "semanticDiagnosticsPerFile": [
    [
      "../src/index.ts",
      [
        {
          "pos": 47,
          "end": 52,
          "code": 2322,
          "category": 1,
          "messageKey": "Type_0_is_not_assignable_to_type_1_2322",
          "messageArgs": [
            "number",
            "string"
          ]
        }
      ]
    ]
  ],
  "latestChangedDtsFile": "./src/index.d.ts",
  "size": 1582
}

tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/workspaces/project/node_modules/my-dep/alt.d.ts
*refresh*    /home/src/workspaces/project/src/index.ts
Signatures::
(used version)   /home/src/workspaces/project/node_modules/my-dep/alt.d.ts
(computed .d.ts) /home/src/workspaces/project/src/index.ts
