currentDirectory::/home/src/workspaces/project
useCaseSensitiveFileNames::true
Input::
//// [/home/src/workspaces/project/packages/pkg1.tsconfig.json] *new* 
{
    "compilerOptions": {
        "composite": true,
        "typeRoots": ["./typeroot1"]
    },
    "files": ["./pkg1_index.ts"],
}
//// [/home/src/workspaces/project/packages/pkg1_index.ts] *new* 
export const theNum: TheNum = "type1";
//// [/home/src/workspaces/project/packages/pkg2.tsconfig.json] *new* 
{
    "compilerOptions": {
        "composite": true,
        "typeRoots": ["./typeroot2"]
    },
    "files": ["./pkg2_index.ts"],
}
//// [/home/src/workspaces/project/packages/pkg2_index.ts] *new* 
export const theNum: TheNum2 = "type2";
//// [/home/src/workspaces/project/packages/typeroot1/sometype/index.d.ts] *new* 
declare type TheNum = "type1";
//// [/home/src/workspaces/project/packages/typeroot2/sometype/index.d.ts] *new* 
declare type TheNum2 = "type2";

tsgo -b packages/pkg1.tsconfig.json packages/pkg2.tsconfig.json --verbose --traceResolution
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * packages/pkg1.tsconfig.json
    * packages/pkg2.tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'packages/pkg1.tsconfig.json' is out of date because output file 'packages/pkg1.tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project 'packages/pkg1.tsconfig.json'...

[96mpackages/pkg1_index.ts[0m:[93m1[0m:[93m22[0m - [91merror[0m[90m TS2304: [0mCannot find name 'TheNum'.

[7m1[0m export const theNum: TheNum = "type1";
[7m [0m [91m                     ~~~~~~[0m

[[90mHH:MM:SS AM[0m] Project 'packages/pkg2.tsconfig.json' is out of date because output file 'packages/pkg2.tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project 'packages/pkg2.tsconfig.json'...

[96mpackages/pkg2_index.ts[0m:[93m1[0m:[93m22[0m - [91merror[0m[90m TS2304: [0mCannot find name 'TheNum2'.

[7m1[0m export const theNum: TheNum2 = "type2";
[7m [0m [91m                     ~~~~~~~[0m


Found 2 errors in 2 files.

Errors  Files
     1  packages/pkg1_index.ts[90m:1[0m
     1  packages/pkg2_index.ts[90m:1[0m

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
//// [/home/src/workspaces/project/packages/pkg1.tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":[2],"fileNames":["lib.es2025.full.d.ts","./pkg1_index.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"f4662ef3bd793790375f811e7f7d599f-export const theNum: TheNum = \"type1\";","signature":"dea6d3f907d93004db9004d6cea5698d-export declare const theNum: TheNum;\n","impliedNodeFormat":1}],"options":{"composite":true},"semanticDiagnosticsPerFile":[[2,[{"pos":21,"end":27,"code":2304,"category":1,"messageKey":"Cannot_find_name_0_2304","messageArgs":["TheNum"]}]]],"latestChangedDtsFile":"./pkg1_index.d.ts"}
//// [/home/src/workspaces/project/packages/pkg1.tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./pkg1_index.ts"
      ],
      "original": 2
    }
  ],
  "fileNames": [
    "lib.es2025.full.d.ts",
    "./pkg1_index.ts"
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
      "fileName": "./pkg1_index.ts",
      "version": "f4662ef3bd793790375f811e7f7d599f-export const theNum: TheNum = \"type1\";",
      "signature": "dea6d3f907d93004db9004d6cea5698d-export declare const theNum: TheNum;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "f4662ef3bd793790375f811e7f7d599f-export const theNum: TheNum = \"type1\";",
        "signature": "dea6d3f907d93004db9004d6cea5698d-export declare const theNum: TheNum;\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "options": {
    "composite": true
  },
  "semanticDiagnosticsPerFile": [
    [
      "./pkg1_index.ts",
      [
        {
          "pos": 21,
          "end": 27,
          "code": 2304,
          "category": 1,
          "messageKey": "Cannot_find_name_0_2304",
          "messageArgs": [
            "TheNum"
          ]
        }
      ]
    ]
  ],
  "latestChangedDtsFile": "./pkg1_index.d.ts",
  "size": 1291
}
//// [/home/src/workspaces/project/packages/pkg1_index.d.ts] *new* 
export declare const theNum: TheNum;

//// [/home/src/workspaces/project/packages/pkg1_index.js] *new* 
export const theNum = "type1";

//// [/home/src/workspaces/project/packages/pkg2.tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":[2],"fileNames":["lib.es2025.full.d.ts","./pkg2_index.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"5520638613ac947a47797c35d3ad9c4b-export const theNum: TheNum2 = \"type2\";","signature":"becc5ed6bddc5e1124b92e180d59b5e3-export declare const theNum: TheNum2;\n","impliedNodeFormat":1}],"options":{"composite":true},"semanticDiagnosticsPerFile":[[2,[{"pos":21,"end":28,"code":2304,"category":1,"messageKey":"Cannot_find_name_0_2304","messageArgs":["TheNum2"]}]]],"latestChangedDtsFile":"./pkg2_index.d.ts"}
//// [/home/src/workspaces/project/packages/pkg2.tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./pkg2_index.ts"
      ],
      "original": 2
    }
  ],
  "fileNames": [
    "lib.es2025.full.d.ts",
    "./pkg2_index.ts"
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
      "fileName": "./pkg2_index.ts",
      "version": "5520638613ac947a47797c35d3ad9c4b-export const theNum: TheNum2 = \"type2\";",
      "signature": "becc5ed6bddc5e1124b92e180d59b5e3-export declare const theNum: TheNum2;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "5520638613ac947a47797c35d3ad9c4b-export const theNum: TheNum2 = \"type2\";",
        "signature": "becc5ed6bddc5e1124b92e180d59b5e3-export declare const theNum: TheNum2;\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "options": {
    "composite": true
  },
  "semanticDiagnosticsPerFile": [
    [
      "./pkg2_index.ts",
      [
        {
          "pos": 21,
          "end": 28,
          "code": 2304,
          "category": 1,
          "messageKey": "Cannot_find_name_0_2304",
          "messageArgs": [
            "TheNum2"
          ]
        }
      ]
    ]
  ],
  "latestChangedDtsFile": "./pkg2_index.d.ts",
  "size": 1294
}
//// [/home/src/workspaces/project/packages/pkg2_index.d.ts] *new* 
export declare const theNum: TheNum2;

//// [/home/src/workspaces/project/packages/pkg2_index.js] *new* 
export const theNum = "type2";


packages/pkg1.tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es2025.full.d.ts
*refresh*    /home/src/workspaces/project/packages/pkg1_index.ts
Signatures::
(stored at emit) /home/src/workspaces/project/packages/pkg1_index.ts

packages/pkg2.tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es2025.full.d.ts
*refresh*    /home/src/workspaces/project/packages/pkg2_index.ts
Signatures::
(stored at emit) /home/src/workspaces/project/packages/pkg2_index.ts
