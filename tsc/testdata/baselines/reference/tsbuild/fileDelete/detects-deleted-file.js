currentDirectory::/home/src/workspaces/solution
useCaseSensitiveFileNames::true
Input::
//// [/home/src/workspaces/solution/child/child.ts] *new* 
import { child2 } from "../child/child2";
export function child() {
    child2();
}
//// [/home/src/workspaces/solution/child/child2.ts] *new* 
export function child2() {
}
//// [/home/src/workspaces/solution/child/tsconfig.json] *new* 
{
    "compilerOptions": { "composite": true }
}
//// [/home/src/workspaces/solution/main/main.ts] *new* 
import { child } from "../child/child";
export function main() {
    child();
}
//// [/home/src/workspaces/solution/main/tsconfig.json] *new* 
{
    "compilerOptions": { "composite": true },
    "references": [{ "path": "../child" }],
}

tsgo --b main/tsconfig.json -v --traceResolution --explainFiles
ExitStatus:: Success
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * child/tsconfig.json
    * main/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'child/tsconfig.json' is out of date because output file 'child/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project 'child/tsconfig.json'...

======== Resolving module '../child/child2' from '/home/src/workspaces/solution/child/child.ts'. ========
Module resolution kind is not specified, using 'Bundler'.
Resolving in CJS mode with conditions 'require', 'types'.
Loading module as file / folder, candidate module location '/home/src/workspaces/solution/child/child2', target file types: TypeScript, JavaScript, Declaration, JSON.
File '/home/src/workspaces/solution/child/child2.ts' exists - use it as a name resolution result.
======== Module name '../child/child2' was successfully resolved to '/home/src/workspaces/solution/child/child2.ts'. ========
../../tslibs/TS/Lib/lib.d.ts
   Default library for target 'ES5'
child/child2.ts
   Imported via "../child/child2" from file 'child/child.ts'
   Matched by default include pattern '**/*'
child/child.ts
   Matched by default include pattern '**/*'
[[90mHH:MM:SS AM[0m] Project 'main/tsconfig.json' is out of date because output file 'main/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project 'main/tsconfig.json'...

======== Resolving module '../child/child' from '/home/src/workspaces/solution/main/main.ts'. ========
Module resolution kind is not specified, using 'Bundler'.
Resolving in CJS mode with conditions 'require', 'types'.
Loading module as file / folder, candidate module location '/home/src/workspaces/solution/child/child', target file types: TypeScript, JavaScript, Declaration, JSON.
File '/home/src/workspaces/solution/child/child.ts' exists - use it as a name resolution result.
======== Module name '../child/child' was successfully resolved to '/home/src/workspaces/solution/child/child.ts'. ========
../../tslibs/TS/Lib/lib.d.ts
   Default library for target 'ES5'
child/child.d.ts
   Imported via "../child/child" from file 'main/main.ts'
   File is output of project reference source 'child/child.ts'
main/main.ts
   Matched by default include pattern '**/*'
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
//// [/home/src/workspaces/solution/child/child.d.ts] *new* 
export declare function child(): void;

//// [/home/src/workspaces/solution/child/child.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.child = child;
const child2_1 = require("../child/child2");
function child() {
    (0, child2_1.child2)();
}

//// [/home/src/workspaces/solution/child/child2.d.ts] *new* 
export declare function child2(): void;

//// [/home/src/workspaces/solution/child/child2.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.child2 = child2;
function child2() {
}

//// [/home/src/workspaces/solution/child/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":[[2,3]],"fileNames":["lib.d.ts","./child2.ts","./child.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"85942d10a7b48fc9efb88a3f01fa243f-export function child2() {\n}","signature":"a48d766cad04341d4c420407878f4d51-export declare function child2(): void;\n","impliedNodeFormat":1},{"version":"9686fb058ae9baf28ea93ef1e3b32b74-import { child2 } from \"../child/child2\";\nexport function child() {\n    child2();\n}","signature":"3a48d078ac909d932ed914f17038d634-export declare function child(): void;\n","impliedNodeFormat":1}],"fileIdsList":[[2]],"options":{"composite":true},"referencedMap":[[3,1]],"latestChangedDtsFile":"./child.d.ts"}
//// [/home/src/workspaces/solution/child/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./child2.ts",
        "./child.ts"
      ],
      "original": [
        2,
        3
      ]
    }
  ],
  "fileNames": [
    "lib.d.ts",
    "./child2.ts",
    "./child.ts"
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
      "fileName": "./child2.ts",
      "version": "85942d10a7b48fc9efb88a3f01fa243f-export function child2() {\n}",
      "signature": "a48d766cad04341d4c420407878f4d51-export declare function child2(): void;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "85942d10a7b48fc9efb88a3f01fa243f-export function child2() {\n}",
        "signature": "a48d766cad04341d4c420407878f4d51-export declare function child2(): void;\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./child.ts",
      "version": "9686fb058ae9baf28ea93ef1e3b32b74-import { child2 } from \"../child/child2\";\nexport function child() {\n    child2();\n}",
      "signature": "3a48d078ac909d932ed914f17038d634-export declare function child(): void;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "9686fb058ae9baf28ea93ef1e3b32b74-import { child2 } from \"../child/child2\";\nexport function child() {\n    child2();\n}",
        "signature": "3a48d078ac909d932ed914f17038d634-export declare function child(): void;\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "fileIdsList": [
    [
      "./child2.ts"
    ]
  ],
  "options": {
    "composite": true
  },
  "referencedMap": {
    "./child.ts": [
      "./child2.ts"
    ]
  },
  "latestChangedDtsFile": "./child.d.ts",
  "size": 1423
}
//// [/home/src/workspaces/solution/main/main.d.ts] *new* 
export declare function main(): void;

//// [/home/src/workspaces/solution/main/main.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = main;
const child_1 = require("../child/child");
function main() {
    (0, child_1.child)();
}

//// [/home/src/workspaces/solution/main/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":[3],"fileNames":["lib.d.ts","../child/child.d.ts","./main.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},"3a48d078ac909d932ed914f17038d634-export declare function child(): void;\n",{"version":"d75ecee856a9674923c51d13bc094a97-import { child } from \"../child/child\";\nexport function main() {\n    child();\n}","signature":"c59caa3814ee834e4ffefaf173a2be2a-export declare function main(): void;\n","impliedNodeFormat":1}],"fileIdsList":[[2]],"options":{"composite":true},"referencedMap":[[3,1]],"latestChangedDtsFile":"./main.d.ts"}
//// [/home/src/workspaces/solution/main/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./main.ts"
      ],
      "original": 3
    }
  ],
  "fileNames": [
    "lib.d.ts",
    "../child/child.d.ts",
    "./main.ts"
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
      "fileName": "../child/child.d.ts",
      "version": "3a48d078ac909d932ed914f17038d634-export declare function child(): void;\n",
      "signature": "3a48d078ac909d932ed914f17038d634-export declare function child(): void;\n",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "./main.ts",
      "version": "d75ecee856a9674923c51d13bc094a97-import { child } from \"../child/child\";\nexport function main() {\n    child();\n}",
      "signature": "c59caa3814ee834e4ffefaf173a2be2a-export declare function main(): void;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "d75ecee856a9674923c51d13bc094a97-import { child } from \"../child/child\";\nexport function main() {\n    child();\n}",
        "signature": "c59caa3814ee834e4ffefaf173a2be2a-export declare function main(): void;\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "fileIdsList": [
    [
      "../child/child.d.ts"
    ]
  ],
  "options": {
    "composite": true
  },
  "referencedMap": {
    "./main.ts": [
      "../child/child.d.ts"
    ]
  },
  "latestChangedDtsFile": "./main.d.ts",
  "size": 1308
}

child/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.d.ts
*refresh*    /home/src/workspaces/solution/child/child2.ts
*refresh*    /home/src/workspaces/solution/child/child.ts
Signatures::
(stored at emit) /home/src/workspaces/solution/child/child2.ts
(stored at emit) /home/src/workspaces/solution/child/child.ts

main/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.d.ts
*refresh*    /home/src/workspaces/solution/child/child.d.ts
*refresh*    /home/src/workspaces/solution/main/main.ts
Signatures::
(stored at emit) /home/src/workspaces/solution/main/main.ts


Edit [0]:: delete child2 file
//// [/home/src/workspaces/solution/child/child2.d.ts] *deleted*
//// [/home/src/workspaces/solution/child/child2.js] *deleted*
//// [/home/src/workspaces/solution/child/child2.ts] *deleted*

tsgo --b main/tsconfig.json -v --traceResolution --explainFiles
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * child/tsconfig.json
    * main/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'child/tsconfig.json' is out of date because buildinfo file 'child/tsconfig.tsbuildinfo' indicates that file 'child/child2.ts' was root file of compilation but not any more.

[[90mHH:MM:SS AM[0m] Building project 'child/tsconfig.json'...

======== Resolving module '../child/child2' from '/home/src/workspaces/solution/child/child.ts'. ========
Module resolution kind is not specified, using 'Bundler'.
Resolving in CJS mode with conditions 'require', 'types'.
Loading module as file / folder, candidate module location '/home/src/workspaces/solution/child/child2', target file types: TypeScript, JavaScript, Declaration, JSON.
File '/home/src/workspaces/solution/child/child2.ts' does not exist.
File '/home/src/workspaces/solution/child/child2.tsx' does not exist.
File '/home/src/workspaces/solution/child/child2.d.ts' does not exist.
File '/home/src/workspaces/solution/child/child2.js' does not exist.
File '/home/src/workspaces/solution/child/child2.jsx' does not exist.
Directory '/home/src/workspaces/solution/child/child2' does not exist, skipping all lookups in it.
======== Module name '../child/child2' was not resolved. ========
[96mchild/child.ts[0m:[93m1[0m:[93m24[0m - [91merror[0m[90m TS2307: [0mCannot find module '../child/child2' or its corresponding type declarations.

[7m1[0m import { child2 } from "../child/child2";
[7m [0m [91m                       ~~~~~~~~~~~~~~~~~[0m

../../tslibs/TS/Lib/lib.d.ts
   Default library for target 'ES5'
child/child.ts
   Matched by default include pattern '**/*'
[[90mHH:MM:SS AM[0m] Project 'main/tsconfig.json' is up to date with .d.ts files from its dependencies

[[90mHH:MM:SS AM[0m] Updating output timestamps of project 'main/tsconfig.json'...


Found 1 error in child/child.ts[90m:1[0m

//// [/home/src/workspaces/solution/child/child.js] *rewrite with same content*
//// [/home/src/workspaces/solution/child/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[2],"fileNames":["lib.d.ts","./child.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"9686fb058ae9baf28ea93ef1e3b32b74-import { child2 } from \"../child/child2\";\nexport function child() {\n    child2();\n}","signature":"3a48d078ac909d932ed914f17038d634-export declare function child(): void;\n","impliedNodeFormat":1}],"options":{"composite":true},"semanticDiagnosticsPerFile":[[2,[{"pos":23,"end":40,"code":2307,"category":1,"message":"Cannot find module '../child/child2' or its corresponding type declarations."}]]],"latestChangedDtsFile":"./child.d.ts"}
//// [/home/src/workspaces/solution/child/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./child.ts"
      ],
      "original": 2
    }
  ],
  "fileNames": [
    "lib.d.ts",
    "./child.ts"
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
      "fileName": "./child.ts",
      "version": "9686fb058ae9baf28ea93ef1e3b32b74-import { child2 } from \"../child/child2\";\nexport function child() {\n    child2();\n}",
      "signature": "3a48d078ac909d932ed914f17038d634-export declare function child(): void;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "9686fb058ae9baf28ea93ef1e3b32b74-import { child2 } from \"../child/child2\";\nexport function child() {\n    child2();\n}",
        "signature": "3a48d078ac909d932ed914f17038d634-export declare function child(): void;\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "options": {
    "composite": true
  },
  "semanticDiagnosticsPerFile": [
    [
      "./child.ts",
      [
        {
          "pos": 23,
          "end": 40,
          "code": 2307,
          "category": 1,
          "message": "Cannot find module '../child/child2' or its corresponding type declarations."
        }
      ]
    ]
  ],
  "latestChangedDtsFile": "./child.d.ts",
  "size": 1344
}
//// [/home/src/workspaces/solution/main/tsconfig.tsbuildinfo] *mTime changed*

child/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/workspaces/solution/child/child.ts
Signatures::
(computed .d.ts) /home/src/workspaces/solution/child/child.ts
