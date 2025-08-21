currentDirectory::/home/src/workspaces/project
useCaseSensitiveFileNames::true
Input::
//// [/home/src/workspaces/project/package.json] *new* 
{
    "name": "app",
    "version": "1.0.0"
}
//// [/home/src/workspaces/project/src/fileA.ts] *new* 
import { foo } from "./fileB.mjs";
foo();
//// [/home/src/workspaces/project/src/fileB.mts] *new* 
export function foo() {}
//// [/home/src/workspaces/project/src/main.ts] *new* 
export const x = 10;
//// [/home/src/workspaces/project/src/tsconfig.json] *new* 
{
    "compilerOptions": {
        "target": "ES2016",
        "composite": true,
        "module": "Node16",
        "traceResolution": true,
    },
    "files": [
        "main.ts",
        "fileA.ts",
        "fileB.mts",
    ],
}

tsgo -p src --explainFiles --extendedDiagnostics
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
======== Resolving module './fileB.mjs' from '/home/src/workspaces/project/src/fileA.ts'. ========
Module resolution kind is not specified, using 'Node16'.
Resolving in CJS mode with conditions 'require', 'types', 'node'.
Loading module as file / folder, candidate module location '/home/src/workspaces/project/src/fileB.mjs', target file types: TypeScript, JavaScript, Declaration.
File name '/home/src/workspaces/project/src/fileB.mjs' has a '.mjs' extension - stripping it.
File '/home/src/workspaces/project/src/fileB.mts' exists - use it as a name resolution result.
======== Module name './fileB.mjs' was successfully resolved to '/home/src/workspaces/project/src/fileB.mts'. ========
[96msrc/fileA.ts[0m:[93m1[0m:[93m21[0m - [91merror[0m[90m TS1479: [0mThe current file is a CommonJS module whose imports will produce 'require' calls; however, the referenced file is an ECMAScript module and cannot be imported with 'require'. Consider writing a dynamic 'import("./fileB.mjs")' call instead.
  To convert this file to an ECMAScript module, change its file extension to '.mts', or add the field `"type": "module"` to '/home/src/workspaces/project/package.json'.

[7m1[0m import { foo } from "./fileB.mjs";
[7m [0m [91m                    ~~~~~~~~~~~~~[0m

../../tslibs/TS/Lib/lib.es2016.full.d.ts
   Default library for target 'ES2016'
src/main.ts
   Part of 'files' list in tsconfig.json
   File is CommonJS module because 'package.json' does not have field "type"
src/fileB.mts
   Imported via "./fileB.mjs" from file 'src/fileA.ts'
   Part of 'files' list in tsconfig.json
src/fileA.ts
   Part of 'files' list in tsconfig.json
   File is CommonJS module because 'package.json' does not have field "type"

Found 1 error in src/fileA.ts[90m:1[0m

//// [/home/src/tslibs/TS/Lib/lib.es2016.full.d.ts] *Lib*
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
//// [/home/src/workspaces/project/src/fileA.d.ts] *new* 
export {};

//// [/home/src/workspaces/project/src/fileA.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fileB_mjs_1 = require("./fileB.mjs");
(0, fileB_mjs_1.foo)();

//// [/home/src/workspaces/project/src/fileB.d.mts] *new* 
export declare function foo(): void;

//// [/home/src/workspaces/project/src/fileB.mjs] *new* 
export function foo() { }

//// [/home/src/workspaces/project/src/main.d.ts] *new* 
export declare const x = 10;

//// [/home/src/workspaces/project/src/main.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = 10;

//// [/home/src/workspaces/project/src/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":[[2,4]],"fileNames":["lib.es2016.full.d.ts","./main.ts","./fileB.mts","./fileA.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"28e8748a7acd58f4f59388926e914f86-export const x = 10;","signature":"f9b4154a9a5944099ecf197d4519d083-export declare const x = 10;\n","impliedNodeFormat":1},{"version":"d03690d860e74c03bcacf63f0dd68b93-export function foo() {}","signature":"7ffb4ea6089b1a385965a214ba412941-export declare function foo(): void;\n","impliedNodeFormat":99},{"version":"cc520ca096f0b81d18073ba8a9776fe3-import { foo } from \"./fileB.mjs\";\nfoo();","signature":"abe7d9981d6018efb6b2b794f40a1607-export {};\n","impliedNodeFormat":1}],"fileIdsList":[[3]],"options":{"composite":true,"module":100,"target":3},"referencedMap":[[4,1]],"semanticDiagnosticsPerFile":[[4,[{"pos":20,"end":33,"code":1479,"category":1,"message":"The current file is a CommonJS module whose imports will produce 'require' calls; however, the referenced file is an ECMAScript module and cannot be imported with 'require'. Consider writing a dynamic 'import(\"./fileB.mjs\")' call instead.","messageChain":[{"pos":20,"end":33,"code":1481,"category":3,"message":"To convert this file to an ECMAScript module, change its file extension to '.mts', or add the field `\"type\": \"module\"` to '/home/src/workspaces/project/package.json'."}]}]]],"latestChangedDtsFile":"./fileA.d.ts"}
//// [/home/src/workspaces/project/src/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./main.ts",
        "./fileB.mts",
        "./fileA.ts"
      ],
      "original": [
        2,
        4
      ]
    }
  ],
  "fileNames": [
    "lib.es2016.full.d.ts",
    "./main.ts",
    "./fileB.mts",
    "./fileA.ts"
  ],
  "fileInfos": [
    {
      "fileName": "lib.es2016.full.d.ts",
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
      "fileName": "./main.ts",
      "version": "28e8748a7acd58f4f59388926e914f86-export const x = 10;",
      "signature": "f9b4154a9a5944099ecf197d4519d083-export declare const x = 10;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "28e8748a7acd58f4f59388926e914f86-export const x = 10;",
        "signature": "f9b4154a9a5944099ecf197d4519d083-export declare const x = 10;\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./fileB.mts",
      "version": "d03690d860e74c03bcacf63f0dd68b93-export function foo() {}",
      "signature": "7ffb4ea6089b1a385965a214ba412941-export declare function foo(): void;\n",
      "impliedNodeFormat": "ESNext",
      "original": {
        "version": "d03690d860e74c03bcacf63f0dd68b93-export function foo() {}",
        "signature": "7ffb4ea6089b1a385965a214ba412941-export declare function foo(): void;\n",
        "impliedNodeFormat": 99
      }
    },
    {
      "fileName": "./fileA.ts",
      "version": "cc520ca096f0b81d18073ba8a9776fe3-import { foo } from \"./fileB.mjs\";\nfoo();",
      "signature": "abe7d9981d6018efb6b2b794f40a1607-export {};\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "cc520ca096f0b81d18073ba8a9776fe3-import { foo } from \"./fileB.mjs\";\nfoo();",
        "signature": "abe7d9981d6018efb6b2b794f40a1607-export {};\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "fileIdsList": [
    [
      "./fileB.mts"
    ]
  ],
  "options": {
    "composite": true,
    "module": 100,
    "target": 3
  },
  "referencedMap": {
    "./fileA.ts": [
      "./fileB.mts"
    ]
  },
  "semanticDiagnosticsPerFile": [
    [
      "./fileA.ts",
      [
        {
          "pos": 20,
          "end": 33,
          "code": 1479,
          "category": 1,
          "message": "The current file is a CommonJS module whose imports will produce 'require' calls; however, the referenced file is an ECMAScript module and cannot be imported with 'require'. Consider writing a dynamic 'import(\"./fileB.mjs\")' call instead.",
          "messageChain": [
            {
              "pos": 20,
              "end": 33,
              "code": 1481,
              "category": 3,
              "message": "To convert this file to an ECMAScript module, change its file extension to '.mts', or add the field `\"type\": \"module\"` to '/home/src/workspaces/project/package.json'."
            }
          ]
        }
      ]
    ]
  ],
  "latestChangedDtsFile": "./fileA.d.ts",
  "size": 2140
}

src/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es2016.full.d.ts
*refresh*    /home/src/workspaces/project/src/main.ts
*refresh*    /home/src/workspaces/project/src/fileB.mts
*refresh*    /home/src/workspaces/project/src/fileA.ts
Signatures::
(stored at emit) /home/src/workspaces/project/src/main.ts
(stored at emit) /home/src/workspaces/project/src/fileB.mts
(stored at emit) /home/src/workspaces/project/src/fileA.ts


Edit [0]:: Delete package.json
//// [/home/src/workspaces/project/package.json] *deleted*

tsgo -p src --explainFiles --extendedDiagnostics
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
======== Resolving module './fileB.mjs' from '/home/src/workspaces/project/src/fileA.ts'. ========
Module resolution kind is not specified, using 'Node16'.
Resolving in CJS mode with conditions 'require', 'types', 'node'.
Loading module as file / folder, candidate module location '/home/src/workspaces/project/src/fileB.mjs', target file types: TypeScript, JavaScript, Declaration.
File name '/home/src/workspaces/project/src/fileB.mjs' has a '.mjs' extension - stripping it.
File '/home/src/workspaces/project/src/fileB.mts' exists - use it as a name resolution result.
======== Module name './fileB.mjs' was successfully resolved to '/home/src/workspaces/project/src/fileB.mts'. ========
[96msrc/fileA.ts[0m:[93m1[0m:[93m21[0m - [91merror[0m[90m TS1479: [0mThe current file is a CommonJS module whose imports will produce 'require' calls; however, the referenced file is an ECMAScript module and cannot be imported with 'require'. Consider writing a dynamic 'import("./fileB.mjs")' call instead.
  To convert this file to an ECMAScript module, change its file extension to '.mts', or add the field `"type": "module"` to '/home/src/workspaces/project/package.json'.

[7m1[0m import { foo } from "./fileB.mjs";
[7m [0m [91m                    ~~~~~~~~~~~~~[0m

../../tslibs/TS/Lib/lib.es2016.full.d.ts
   Default library for target 'ES2016'
src/main.ts
   Part of 'files' list in tsconfig.json
   File is CommonJS module because 'package.json' was not found
src/fileB.mts
   Imported via "./fileB.mjs" from file 'src/fileA.ts'
   Part of 'files' list in tsconfig.json
src/fileA.ts
   Part of 'files' list in tsconfig.json
   File is CommonJS module because 'package.json' was not found

Found 1 error in src/fileA.ts[90m:1[0m


src/tsconfig.json::
SemanticDiagnostics::
Signatures::


Diff:: Currently we arent repopulating error chain so errors will be different
--- nonIncremental.output.txt
+++ incremental.output.txt
@@ -1,5 +1,5 @@
 [96msrc/fileA.ts[0m:[93m1[0m:[93m21[0m - [91merror[0m[90m TS1479: [0mThe current file is a CommonJS module whose imports will produce 'require' calls; however, the referenced file is an ECMAScript module and cannot be imported with 'require'. Consider writing a dynamic 'import("./fileB.mjs")' call instead.
-  To convert this file to an ECMAScript module, change its file extension to '.mts' or create a local package.json file with `{ "type": "module" }`.
+  To convert this file to an ECMAScript module, change its file extension to '.mts', or add the field `"type": "module"` to '/home/src/workspaces/project/package.json'.

 [7m1[0m import { foo } from "./fileB.mjs";
 [7m [0m [91m                    ~~~~~~~~~~~~~[0m