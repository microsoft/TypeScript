currentDirectory::/home/src/workspaces/project
useCaseSensitiveFileNames::true
Input::
//// [/home/src/workspaces/project/src/main.ts] *new* 
export const x = 10;
//// [/home/src/workspaces/project/tsconfig.json] *new* 
{
    "compilerOptions": {
        "target": "es5",
        "module": "commonjs"
    },
    "include": [
        "src/**/*.ts"
    ],
}

tsgo --incremental --tsBuildInfoFile .tsbuildinfo --explainFiles
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[96mtsconfig.json[0m:[93m3[0m:[93m19[0m - [91merror[0m[90m TS5108: [0mOption 'target=ES5' has been removed. Please remove it from your configuration.

[7m3[0m         "target": "es5",
[7m [0m [91m                  ~~~~~[0m

../../tslibs/TS/Lib/lib.d.ts
   Default library for target 'ES5'
src/main.ts
   Matched by include pattern 'src/**/*.ts' in 'tsconfig.json'

Found 1 error in tsconfig.json[90m:3[0m

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
//// [/home/src/workspaces/project/.tsbuildinfo] *new* 
{"version":"FakeTSVersion","errors":true,"root":[2],"fileNames":["lib.d.ts","./src/main.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},"28e8748a7acd58f4f59388926e914f86-export const x = 10;"],"options":{"module":1,"target":1,"tsBuildInfoFile":"./.tsbuildinfo"},"semanticDiagnosticsPerFile":[1,2]}
//// [/home/src/workspaces/project/.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "errors": true,
  "root": [
    {
      "files": [
        "./src/main.ts"
      ],
      "original": 2
    }
  ],
  "fileNames": [
    "lib.d.ts",
    "./src/main.ts"
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
      "fileName": "./src/main.ts",
      "version": "28e8748a7acd58f4f59388926e914f86-export const x = 10;",
      "signature": "28e8748a7acd58f4f59388926e914f86-export const x = 10;",
      "impliedNodeFormat": "CommonJS"
    }
  ],
  "options": {
    "module": 1,
    "target": 1,
    "tsBuildInfoFile": "./.tsbuildinfo"
  },
  "semanticDiagnosticsPerFile": [
    "lib.d.ts",
    "./src/main.ts"
  ],
  "size": 1037
}
//// [/home/src/workspaces/project/src/main.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = 10;


tsconfig.json::
SemanticDiagnostics::
*not cached* /home/src/tslibs/TS/Lib/lib.d.ts
*not cached* /home/src/workspaces/project/src/main.ts
Signatures::


Edit [0]:: no change

tsgo --incremental --tsBuildInfoFile .tsbuildinfo --explainFiles
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[96mtsconfig.json[0m:[93m3[0m:[93m19[0m - [91merror[0m[90m TS5108: [0mOption 'target=ES5' has been removed. Please remove it from your configuration.

[7m3[0m         "target": "es5",
[7m [0m [91m                  ~~~~~[0m

../../tslibs/TS/Lib/lib.d.ts
   Default library for target 'ES5'
src/main.ts
   Matched by include pattern 'src/**/*.ts' in 'tsconfig.json'

Found 1 error in tsconfig.json[90m:3[0m


tsconfig.json::
SemanticDiagnostics::
*not cached* /home/src/tslibs/TS/Lib/lib.d.ts
*not cached* /home/src/workspaces/project/src/main.ts
Signatures::
