currentDirectory::/home/src/workspaces/project
useCaseSensitiveFileNames::true
Input::
//// [/home/src/workspaces/project/app.ts] *new* 
import { platform } from "pkg";
const check: "native" = platform;
//// [/home/src/workspaces/project/node_modules/pkg] -> /home/src/workspaces/project/pkg *new*
//// [/home/src/workspaces/project/pkg/index.native.ts] *new* 
export { platform } from "./src/util";
//// [/home/src/workspaces/project/pkg/index.ts] *new* 
export { platform } from "./src/util";
//// [/home/src/workspaces/project/pkg/package.json] *new* 
{
    "name": "pkg",
    "exports": {
        ".": {
            "react-native": "./index.native.ts",
            "types": "./index.ts",
            "default": "./index.ts"
        }
    }
}
//// [/home/src/workspaces/project/pkg/src/util.native.ts] *new* 
export const platform = "native" as const;
//// [/home/src/workspaces/project/pkg/src/util.ts] *new* 
export const platform = "web" as const;
//// [/home/src/workspaces/project/pkg/tsconfig.json] *new* 
{
    "compilerOptions": {
        "module": "esnext",
        "moduleResolution": "bundler",
        "composite": true,
        "declaration": true,
        "emitDeclarationOnly": true,
        "outDir": "./dist",
        "strict": true
    },
    "include": ["**/*"],
    "exclude": ["dist"],
    "references": [
        { "path": "./tsconfig.native.json" }
    ]
}
//// [/home/src/workspaces/project/pkg/tsconfig.native.json] *new* 
{
    "compilerOptions": {
        "module": "esnext",
        "moduleResolution": "bundler",
        "composite": true,
        "declaration": true,
        "emitDeclarationOnly": true,
        "outDir": "./dist",
        "strict": true,
        "customConditions": ["react-native"],
        "moduleSuffixes": [".native", ""]
    },
    "include": ["index.native.ts", "src/util.native.ts", "src/util.ts"],
    "exclude": ["dist"]
}
//// [/home/src/workspaces/project/tsconfig.json] *new* 
{
    "compilerOptions": {
        "module": "esnext",
        "moduleResolution": "bundler",
        "customConditions": ["react-native"],
        "moduleSuffixes": [".native", ""],
        "strict": true,
        "noEmit": true
    },
    "include": ["app.ts"],
    "references": [
        { "path": "./pkg" }
    ]
}

tsgo --b --verbose
ExitStatus:: Success
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * pkg/tsconfig.native.json
    * pkg/tsconfig.json
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'pkg/tsconfig.native.json' is out of date because output file 'pkg/dist/tsconfig.native.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project 'pkg/tsconfig.native.json'...

[[90mHH:MM:SS AM[0m] Project 'pkg/tsconfig.json' is out of date because output file 'pkg/dist/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project 'pkg/tsconfig.json'...

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
//// [/home/src/workspaces/project/pkg/dist/index.d.ts] *new* 
export { platform } from "./src/util";

//// [/home/src/workspaces/project/pkg/dist/index.native.d.ts] *new* 
export { platform } from "./src/util";

//// [/home/src/workspaces/project/pkg/dist/src/util.d.ts] *new* 
export declare const platform: "web";

//// [/home/src/workspaces/project/pkg/dist/src/util.native.d.ts] *new* 
export declare const platform: "native";

//// [/home/src/workspaces/project/pkg/dist/tsconfig.native.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":[[2,4]],"fileNames":["lib.es2025.full.d.ts","../src/util.native.ts","../index.native.ts","../src/util.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"c1f8db351239c175fbb3960262e28684-export const platform = \"native\" as const;","signature":"1f876b2eee633f65aa2e7817bfee737a-export declare const platform: \"native\";\n","impliedNodeFormat":1},{"version":"0a747b719fd37e7b799139c5f607d76b-export { platform } from \"./src/util\";","signature":"b065ccf77d7f1159c74552524b8d4d2b-export { platform } from \"./src/util\";\n","impliedNodeFormat":1},{"version":"7941de8fb997b556c0afef2b586d7205-export const platform = \"web\" as const;","signature":"5082e4a38cc5cc308625a8754198c0e3-export declare const platform: \"web\";\n","impliedNodeFormat":1}],"fileIdsList":[[2]],"options":{"composite":true,"emitDeclarationOnly":true,"declaration":true,"module":99,"outDir":"./","strict":true},"referencedMap":[[3,1]],"latestChangedDtsFile":"./src/util.d.ts"}
//// [/home/src/workspaces/project/pkg/dist/tsconfig.native.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "../src/util.native.ts",
        "../index.native.ts",
        "../src/util.ts"
      ],
      "original": [
        2,
        4
      ]
    }
  ],
  "fileNames": [
    "lib.es2025.full.d.ts",
    "../src/util.native.ts",
    "../index.native.ts",
    "../src/util.ts"
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
      "fileName": "../src/util.native.ts",
      "version": "c1f8db351239c175fbb3960262e28684-export const platform = \"native\" as const;",
      "signature": "1f876b2eee633f65aa2e7817bfee737a-export declare const platform: \"native\";\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "c1f8db351239c175fbb3960262e28684-export const platform = \"native\" as const;",
        "signature": "1f876b2eee633f65aa2e7817bfee737a-export declare const platform: \"native\";\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "../index.native.ts",
      "version": "0a747b719fd37e7b799139c5f607d76b-export { platform } from \"./src/util\";",
      "signature": "b065ccf77d7f1159c74552524b8d4d2b-export { platform } from \"./src/util\";\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "0a747b719fd37e7b799139c5f607d76b-export { platform } from \"./src/util\";",
        "signature": "b065ccf77d7f1159c74552524b8d4d2b-export { platform } from \"./src/util\";\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "../src/util.ts",
      "version": "7941de8fb997b556c0afef2b586d7205-export const platform = \"web\" as const;",
      "signature": "5082e4a38cc5cc308625a8754198c0e3-export declare const platform: \"web\";\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "7941de8fb997b556c0afef2b586d7205-export const platform = \"web\" as const;",
        "signature": "5082e4a38cc5cc308625a8754198c0e3-export declare const platform: \"web\";\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "fileIdsList": [
    [
      "../src/util.native.ts"
    ]
  ],
  "options": {
    "composite": true,
    "emitDeclarationOnly": true,
    "declaration": true,
    "module": 99,
    "outDir": "./",
    "strict": true
  },
  "referencedMap": {
    "../index.native.ts": [
      "../src/util.native.ts"
    ]
  },
  "latestChangedDtsFile": "./src/util.d.ts",
  "size": 1731
}
//// [/home/src/workspaces/project/pkg/dist/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":[[2,5]],"fileNames":["lib.es2025.full.d.ts","./src/util.native.d.ts","./index.native.d.ts","./src/util.d.ts","../index.ts","../src/util.native.ts","../index.native.ts","../src/util.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},"1f876b2eee633f65aa2e7817bfee737a-export declare const platform: \"native\";\n","b065ccf77d7f1159c74552524b8d4d2b-export { platform } from \"./src/util\";\n","5082e4a38cc5cc308625a8754198c0e3-export declare const platform: \"web\";\n",{"version":"0a747b719fd37e7b799139c5f607d76b-export { platform } from \"./src/util\";","signature":"b065ccf77d7f1159c74552524b8d4d2b-export { platform } from \"./src/util\";\n","impliedNodeFormat":1}],"fileIdsList":[[2],[4]],"options":{"composite":true,"emitDeclarationOnly":true,"declaration":true,"module":99,"outDir":"./","strict":true},"referencedMap":[[3,1],[5,2]],"latestChangedDtsFile":"./index.d.ts","resolvedRoot":[[2,6],[3,7],[4,8]]}
//// [/home/src/workspaces/project/pkg/dist/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./src/util.native.d.ts",
        "./index.native.d.ts",
        "./src/util.d.ts",
        "../index.ts"
      ],
      "original": [
        2,
        5
      ]
    }
  ],
  "fileNames": [
    "lib.es2025.full.d.ts",
    "./src/util.native.d.ts",
    "./index.native.d.ts",
    "./src/util.d.ts",
    "../index.ts",
    "../src/util.native.ts",
    "../index.native.ts",
    "../src/util.ts"
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
      "fileName": "./src/util.native.d.ts",
      "version": "1f876b2eee633f65aa2e7817bfee737a-export declare const platform: \"native\";\n",
      "signature": "1f876b2eee633f65aa2e7817bfee737a-export declare const platform: \"native\";\n",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "./index.native.d.ts",
      "version": "b065ccf77d7f1159c74552524b8d4d2b-export { platform } from \"./src/util\";\n",
      "signature": "b065ccf77d7f1159c74552524b8d4d2b-export { platform } from \"./src/util\";\n",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "./src/util.d.ts",
      "version": "5082e4a38cc5cc308625a8754198c0e3-export declare const platform: \"web\";\n",
      "signature": "5082e4a38cc5cc308625a8754198c0e3-export declare const platform: \"web\";\n",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "../index.ts",
      "version": "0a747b719fd37e7b799139c5f607d76b-export { platform } from \"./src/util\";",
      "signature": "b065ccf77d7f1159c74552524b8d4d2b-export { platform } from \"./src/util\";\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "0a747b719fd37e7b799139c5f607d76b-export { platform } from \"./src/util\";",
        "signature": "b065ccf77d7f1159c74552524b8d4d2b-export { platform } from \"./src/util\";\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "fileIdsList": [
    [
      "./src/util.native.d.ts"
    ],
    [
      "./src/util.d.ts"
    ]
  ],
  "options": {
    "composite": true,
    "emitDeclarationOnly": true,
    "declaration": true,
    "module": 99,
    "outDir": "./",
    "strict": true
  },
  "referencedMap": {
    "./index.native.d.ts": [
      "./src/util.native.d.ts"
    ],
    "../index.ts": [
      "./src/util.d.ts"
    ]
  },
  "latestChangedDtsFile": "./index.d.ts",
  "resolvedRoot": [
    [
      "./src/util.native.d.ts",
      "../src/util.native.ts"
    ],
    [
      "./index.native.d.ts",
      "../index.native.ts"
    ],
    [
      "./src/util.d.ts",
      "../src/util.ts"
    ]
  ],
  "size": 1681
}
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":["./app.ts"]}
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./app.ts"
      ],
      "original": "./app.ts"
    }
  ],
  "size": 47
}

pkg/tsconfig.native.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es2025.full.d.ts
*refresh*    /home/src/workspaces/project/pkg/src/util.native.ts
*refresh*    /home/src/workspaces/project/pkg/index.native.ts
*refresh*    /home/src/workspaces/project/pkg/src/util.ts
Signatures::
(stored at emit) /home/src/workspaces/project/pkg/src/util.native.ts
(stored at emit) /home/src/workspaces/project/pkg/index.native.ts
(stored at emit) /home/src/workspaces/project/pkg/src/util.ts

pkg/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es2025.full.d.ts
*refresh*    /home/src/workspaces/project/pkg/dist/src/util.native.d.ts
*refresh*    /home/src/workspaces/project/pkg/dist/index.native.d.ts
*refresh*    /home/src/workspaces/project/pkg/dist/src/util.d.ts
*refresh*    /home/src/workspaces/project/pkg/index.ts
Signatures::
(stored at emit) /home/src/workspaces/project/pkg/index.ts

tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es2025.full.d.ts
*refresh*    /home/src/workspaces/project/pkg/dist/src/util.native.d.ts
*refresh*    /home/src/workspaces/project/pkg/dist/index.native.d.ts
*refresh*    /home/src/workspaces/project/app.ts
Signatures::
