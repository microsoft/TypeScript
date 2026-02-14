currentDirectory::/home/src/workspaces/solution
useCaseSensitiveFileNames::true
Input::
//// [/home/src/workspaces/solution/project/main/index.ts] *new* 
import { foo } from '../strings/foo.json';
console.log(foo);
//// [/home/src/workspaces/solution/project/main/tsconfig.json] *new* 
{
    "extends": "../tsconfig.json",
    "include": [
        "./**/*.ts",
    ],
    "references": [{
        "path": "../strings/tsconfig.json",
    }],
}
//// [/home/src/workspaces/solution/project/strings/foo.json] *new* 
{
    "foo": "bar baz"
}
//// [/home/src/workspaces/solution/project/strings/tsconfig.json] *new* 
{
    "extends": "../tsconfig.json",
    "include": ["foo.json"],
    "references": [],
}
//// [/home/src/workspaces/solution/project/tsconfig.json] *new* 
{
    "compilerOptions": {
        "target": "es5",
        "module": "commonjs",
        "rootDir": "./",
        "composite": true,
        "resolveJsonModule": true,
        "strict": true,
        "esModuleInterop": true,
    },
    "references": [
        { "path": "./strings/tsconfig.json" },
        { "path": "./main/tsconfig.json" },
    ],
    "files": [],
}

tsgo --b project --verbose --explainFiles
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * project/strings/tsconfig.json
    * project/main/tsconfig.json
    * project/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'project/strings/tsconfig.json' is out of date because output file 'project/strings/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project 'project/strings/tsconfig.json'...

[91merror[0m[90m TS5108: [0mOption 'target=ES5' has been removed. Please remove it from your configuration.
../../tslibs/TS/Lib/lib.d.ts
   Default library for target 'ES5'
project/strings/foo.json
   Matched by include pattern 'foo.json' in 'project/strings/tsconfig.json'
[[90mHH:MM:SS AM[0m] Project 'project/main/tsconfig.json' is out of date because output file 'project/main/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project 'project/main/tsconfig.json'...

[91merror[0m[90m TS5108: [0mOption 'target=ES5' has been removed. Please remove it from your configuration.
../../tslibs/TS/Lib/lib.d.ts
   Default library for target 'ES5'
project/strings/foo.json
   Imported via '../strings/foo.json' from file 'project/main/index.ts'
project/main/index.ts
   Matched by include pattern './**/*.ts' in 'project/main/tsconfig.json'

Found 2 errors.

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
//// [/home/src/workspaces/solution/project/main/index.d.ts] *new* 
export {};

//// [/home/src/workspaces/solution/project/main/index.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const foo_json_1 = require("../strings/foo.json");
console.log(foo_json_1.foo);

//// [/home/src/workspaces/solution/project/main/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","errors":true,"root":[3],"fileNames":["lib.d.ts","../strings/foo.json","./index.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"0358fbc55b36110a5af2f042a2f514aa-{\n    \"foo\": \"bar baz\"\n}"},{"version":"a22713a27f380b4892020f4caa9bb85f-import { foo } from '../strings/foo.json';\nconsole.log(foo);","signature":"abe7d9981d6018efb6b2b794f40a1607-export {};\n","impliedNodeFormat":1}],"fileIdsList":[[2]],"options":{"composite":true,"esModuleInterop":true,"module":1,"rootDir":"..","strict":true,"target":1},"referencedMap":[[3,1]],"semanticDiagnosticsPerFile":[1,2,3],"latestChangedDtsFile":"./index.d.ts"}
//// [/home/src/workspaces/solution/project/main/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "errors": true,
  "root": [
    {
      "files": [
        "./index.ts"
      ],
      "original": 3
    }
  ],
  "fileNames": [
    "lib.d.ts",
    "../strings/foo.json",
    "./index.ts"
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
      "fileName": "../strings/foo.json",
      "version": "0358fbc55b36110a5af2f042a2f514aa-{\n    \"foo\": \"bar baz\"\n}",
      "signature": "0358fbc55b36110a5af2f042a2f514aa-{\n    \"foo\": \"bar baz\"\n}",
      "impliedNodeFormat": "None",
      "original": {
        "version": "0358fbc55b36110a5af2f042a2f514aa-{\n    \"foo\": \"bar baz\"\n}"
      }
    },
    {
      "fileName": "./index.ts",
      "version": "a22713a27f380b4892020f4caa9bb85f-import { foo } from '../strings/foo.json';\nconsole.log(foo);",
      "signature": "abe7d9981d6018efb6b2b794f40a1607-export {};\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "a22713a27f380b4892020f4caa9bb85f-import { foo } from '../strings/foo.json';\nconsole.log(foo);",
        "signature": "abe7d9981d6018efb6b2b794f40a1607-export {};\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "fileIdsList": [
    [
      "../strings/foo.json"
    ]
  ],
  "options": {
    "composite": true,
    "esModuleInterop": true,
    "module": 1,
    "rootDir": "..",
    "strict": true,
    "target": 1
  },
  "referencedMap": {
    "./index.ts": [
      "../strings/foo.json"
    ]
  },
  "semanticDiagnosticsPerFile": [
    "lib.d.ts",
    "../strings/foo.json",
    "./index.ts"
  ],
  "latestChangedDtsFile": "./index.d.ts",
  "size": 1387
}
//// [/home/src/workspaces/solution/project/strings/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","errors":true,"root":[2],"fileNames":["lib.d.ts","./foo.json"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"0358fbc55b36110a5af2f042a2f514aa-{\n    \"foo\": \"bar baz\"\n}"}],"options":{"composite":true,"esModuleInterop":true,"module":1,"rootDir":"..","strict":true,"target":1},"semanticDiagnosticsPerFile":[1,2]}
//// [/home/src/workspaces/solution/project/strings/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "errors": true,
  "root": [
    {
      "files": [
        "./foo.json"
      ],
      "original": 2
    }
  ],
  "fileNames": [
    "lib.d.ts",
    "./foo.json"
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
      "fileName": "./foo.json",
      "version": "0358fbc55b36110a5af2f042a2f514aa-{\n    \"foo\": \"bar baz\"\n}",
      "signature": "0358fbc55b36110a5af2f042a2f514aa-{\n    \"foo\": \"bar baz\"\n}",
      "impliedNodeFormat": "None",
      "original": {
        "version": "0358fbc55b36110a5af2f042a2f514aa-{\n    \"foo\": \"bar baz\"\n}"
      }
    }
  ],
  "options": {
    "composite": true,
    "esModuleInterop": true,
    "module": 1,
    "rootDir": "..",
    "strict": true,
    "target": 1
  },
  "semanticDiagnosticsPerFile": [
    "lib.d.ts",
    "./foo.json"
  ],
  "size": 1090
}

project/strings/tsconfig.json::
SemanticDiagnostics::
*not cached* /home/src/tslibs/TS/Lib/lib.d.ts
*not cached* /home/src/workspaces/solution/project/strings/foo.json
Signatures::

project/main/tsconfig.json::
SemanticDiagnostics::
*not cached* /home/src/tslibs/TS/Lib/lib.d.ts
*not cached* /home/src/workspaces/solution/project/strings/foo.json
*not cached* /home/src/workspaces/solution/project/main/index.ts
Signatures::
(stored at emit) /home/src/workspaces/solution/project/main/index.ts


Edit [0]:: no change

tsgo --b project --verbose --explainFiles
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * project/strings/tsconfig.json
    * project/main/tsconfig.json
    * project/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'project/strings/tsconfig.json' is out of date because buildinfo file 'project/strings/tsconfig.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project 'project/strings/tsconfig.json'...

[91merror[0m[90m TS5108: [0mOption 'target=ES5' has been removed. Please remove it from your configuration.
../../tslibs/TS/Lib/lib.d.ts
   Default library for target 'ES5'
project/strings/foo.json
   Matched by include pattern 'foo.json' in 'project/strings/tsconfig.json'
[[90mHH:MM:SS AM[0m] Project 'project/main/tsconfig.json' is out of date because buildinfo file 'project/main/tsconfig.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project 'project/main/tsconfig.json'...

[91merror[0m[90m TS5108: [0mOption 'target=ES5' has been removed. Please remove it from your configuration.
../../tslibs/TS/Lib/lib.d.ts
   Default library for target 'ES5'
project/strings/foo.json
   Imported via '../strings/foo.json' from file 'project/main/index.ts'
project/main/index.ts
   Matched by include pattern './**/*.ts' in 'project/main/tsconfig.json'

Found 2 errors.


project/strings/tsconfig.json::
SemanticDiagnostics::
*not cached* /home/src/tslibs/TS/Lib/lib.d.ts
*not cached* /home/src/workspaces/solution/project/strings/foo.json
Signatures::

project/main/tsconfig.json::
SemanticDiagnostics::
*not cached* /home/src/tslibs/TS/Lib/lib.d.ts
*not cached* /home/src/workspaces/solution/project/strings/foo.json
*not cached* /home/src/workspaces/solution/project/main/index.ts
Signatures::
