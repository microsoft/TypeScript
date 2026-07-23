currentDirectory::/home/src/workspaces/project
useCaseSensitiveFileNames::true
Input::
//// [/home/src/workspaces/project/node_modules/dep-b/index.d.ts] *new* 
declare global {
    var globalMarker: string;
}
export {};
//// [/home/src/workspaces/project/node_modules/dep-b/package.json] *new* 
{
    "name": "dep-b",
    "version": "1.0.0",
    "types": "index.d.ts"
}
//// [/home/src/workspaces/project/src/env.ts] *new* 
import "dep-b";
//// [/home/src/workspaces/project/src/user.ts] *new* 
export const marker: string = globalMarker;
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
//// [/home/src/workspaces/project/dist/src/env.d.ts] *new* 
import "dep-b";

//// [/home/src/workspaces/project/dist/src/env.js] *new* 
import "dep-b";

//// [/home/src/workspaces/project/dist/src/user.d.ts] *new* 
export declare const marker: string;

//// [/home/src/workspaces/project/dist/src/user.js] *new* 
export const marker = globalMarker;

//// [/home/src/workspaces/project/dist/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":[[3,4]],"packageJsons":["../node_modules/dep-b/package.json"],"fileNames":["lib.es2025.full.d.ts","../node_modules/dep-b/index.d.ts","../src/env.ts","../src/user.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"cd032fb5030949e5f19325decfe193f4-declare global {\n    var globalMarker: string;\n}\nexport {};","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"fcc1d4c4b073cc5a548e7244f608884c-import \"dep-b\";","signature":"9fb8fd76a089f5d7d03937148c718fd8-import \"dep-b\";\n","impliedNodeFormat":1},{"version":"8e795fc4632e557befae4a0de611e036-export const marker: string = globalMarker;","signature":"62128710b5d65ffc36c246ad1f599f44-export declare const marker: string;\n","impliedNodeFormat":1}],"fileIdsList":[[2]],"options":{"composite":true,"outDir":"./","strict":true},"referencedMap":[[3,1]],"latestChangedDtsFile":"./src/user.d.ts"}
//// [/home/src/workspaces/project/dist/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "../src/env.ts",
        "../src/user.ts"
      ],
      "original": [
        3,
        4
      ]
    }
  ],
  "packageJsons": [
    "../node_modules/dep-b/package.json"
  ],
  "fileNames": [
    "lib.es2025.full.d.ts",
    "../node_modules/dep-b/index.d.ts",
    "../src/env.ts",
    "../src/user.ts"
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
      "fileName": "../node_modules/dep-b/index.d.ts",
      "version": "cd032fb5030949e5f19325decfe193f4-declare global {\n    var globalMarker: string;\n}\nexport {};",
      "signature": "cd032fb5030949e5f19325decfe193f4-declare global {\n    var globalMarker: string;\n}\nexport {};",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "cd032fb5030949e5f19325decfe193f4-declare global {\n    var globalMarker: string;\n}\nexport {};",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "../src/env.ts",
      "version": "fcc1d4c4b073cc5a548e7244f608884c-import \"dep-b\";",
      "signature": "9fb8fd76a089f5d7d03937148c718fd8-import \"dep-b\";\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "fcc1d4c4b073cc5a548e7244f608884c-import \"dep-b\";",
        "signature": "9fb8fd76a089f5d7d03937148c718fd8-import \"dep-b\";\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "../src/user.ts",
      "version": "8e795fc4632e557befae4a0de611e036-export const marker: string = globalMarker;",
      "signature": "62128710b5d65ffc36c246ad1f599f44-export declare const marker: string;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "8e795fc4632e557befae4a0de611e036-export const marker: string = globalMarker;",
        "signature": "62128710b5d65ffc36c246ad1f599f44-export declare const marker: string;\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "fileIdsList": [
    [
      "../node_modules/dep-b/index.d.ts"
    ]
  ],
  "options": {
    "composite": true,
    "outDir": "./",
    "strict": true
  },
  "referencedMap": {
    "../src/env.ts": [
      "../node_modules/dep-b/index.d.ts"
    ]
  },
  "latestChangedDtsFile": "./src/user.d.ts",
  "size": 1638
}

tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es2025.full.d.ts
*refresh*    /home/src/workspaces/project/node_modules/dep-b/index.d.ts
*refresh*    /home/src/workspaces/project/src/env.ts
*refresh*    /home/src/workspaces/project/src/user.ts
Signatures::
(stored at emit) /home/src/workspaces/project/src/env.ts
(stored at emit) /home/src/workspaces/project/src/user.ts


Edit [0]:: update dep-b changing the type of a global
//// [/home/src/workspaces/project/node_modules/dep-b/index.d.ts] *modified* 
declare global {
    var globalMarker: number;
}
export {};

tsgo --b --verbose
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because output 'dist/tsconfig.tsbuildinfo' is older than input 'node_modules/dep-b/index.d.ts'

[[90mHH:MM:SS AM[0m] Building project 'tsconfig.json'...

[96msrc/user.ts[0m:[93m1[0m:[93m14[0m - [91merror[0m[90m TS2322: [0mType 'number' is not assignable to type 'string'.

[7m1[0m export const marker: string = globalMarker;
[7m [0m [91m             ~~~~~~[0m


Found 1 error in src/user.ts[90m:1[0m

//// [/home/src/workspaces/project/dist/src/env.js] *rewrite with same content*
//// [/home/src/workspaces/project/dist/src/user.js] *rewrite with same content*
//// [/home/src/workspaces/project/dist/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[[3,4]],"packageJsons":["../node_modules/dep-b/package.json"],"fileNames":["lib.es2025.full.d.ts","../node_modules/dep-b/index.d.ts","../src/env.ts","../src/user.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"7913b3844cab0fd9a89d3aaee6d67888-declare global {\n    var globalMarker: number;\n}\nexport {};","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"fcc1d4c4b073cc5a548e7244f608884c-import \"dep-b\";","signature":"9fb8fd76a089f5d7d03937148c718fd8-import \"dep-b\";\n","impliedNodeFormat":1},{"version":"8e795fc4632e557befae4a0de611e036-export const marker: string = globalMarker;","signature":"62128710b5d65ffc36c246ad1f599f44-export declare const marker: string;\n","impliedNodeFormat":1}],"fileIdsList":[[2]],"options":{"composite":true,"outDir":"./","strict":true},"referencedMap":[[3,1]],"semanticDiagnosticsPerFile":[[4,[{"pos":13,"end":19,"code":2322,"category":1,"messageKey":"Type_0_is_not_assignable_to_type_1_2322","messageArgs":["number","string"]}]]],"latestChangedDtsFile":"./src/user.d.ts"}
//// [/home/src/workspaces/project/dist/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "../src/env.ts",
        "../src/user.ts"
      ],
      "original": [
        3,
        4
      ]
    }
  ],
  "packageJsons": [
    "../node_modules/dep-b/package.json"
  ],
  "fileNames": [
    "lib.es2025.full.d.ts",
    "../node_modules/dep-b/index.d.ts",
    "../src/env.ts",
    "../src/user.ts"
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
      "fileName": "../node_modules/dep-b/index.d.ts",
      "version": "7913b3844cab0fd9a89d3aaee6d67888-declare global {\n    var globalMarker: number;\n}\nexport {};",
      "signature": "7913b3844cab0fd9a89d3aaee6d67888-declare global {\n    var globalMarker: number;\n}\nexport {};",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "7913b3844cab0fd9a89d3aaee6d67888-declare global {\n    var globalMarker: number;\n}\nexport {};",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "../src/env.ts",
      "version": "fcc1d4c4b073cc5a548e7244f608884c-import \"dep-b\";",
      "signature": "9fb8fd76a089f5d7d03937148c718fd8-import \"dep-b\";\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "fcc1d4c4b073cc5a548e7244f608884c-import \"dep-b\";",
        "signature": "9fb8fd76a089f5d7d03937148c718fd8-import \"dep-b\";\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "../src/user.ts",
      "version": "8e795fc4632e557befae4a0de611e036-export const marker: string = globalMarker;",
      "signature": "62128710b5d65ffc36c246ad1f599f44-export declare const marker: string;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "8e795fc4632e557befae4a0de611e036-export const marker: string = globalMarker;",
        "signature": "62128710b5d65ffc36c246ad1f599f44-export declare const marker: string;\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "fileIdsList": [
    [
      "../node_modules/dep-b/index.d.ts"
    ]
  ],
  "options": {
    "composite": true,
    "outDir": "./",
    "strict": true
  },
  "referencedMap": {
    "../src/env.ts": [
      "../node_modules/dep-b/index.d.ts"
    ]
  },
  "semanticDiagnosticsPerFile": [
    [
      "../src/user.ts",
      [
        {
          "pos": 13,
          "end": 19,
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
  "latestChangedDtsFile": "./src/user.d.ts",
  "size": 1809
}

tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es2025.full.d.ts
*refresh*    /home/src/workspaces/project/node_modules/dep-b/index.d.ts
*refresh*    /home/src/workspaces/project/src/env.ts
*refresh*    /home/src/workspaces/project/src/user.ts
Signatures::
(used version)   /home/src/workspaces/project/node_modules/dep-b/index.d.ts
(computed .d.ts) /home/src/workspaces/project/src/env.ts
(computed .d.ts) /home/src/workspaces/project/src/user.ts
