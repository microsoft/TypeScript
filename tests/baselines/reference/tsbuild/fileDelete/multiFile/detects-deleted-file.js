currentDirectory:: / useCaseSensitiveFileNames: false
Input::
//// [/lib/lib.d.ts]
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
declare const console: { log(msg: any): void; };

//// [/src/child/child.ts]
import { child2 } from "../child/child2";
export function child() {
    child2();
}


//// [/src/child/child2.ts]
export function child2() {
}


//// [/src/child/tsconfig.json]
{
  "compilerOptions": {
    "composite": true
  }
}

//// [/src/main/main.ts]
import { child } from "../child/child";
export function main() {
    child();
}


//// [/src/main/tsconfig.json]
{
  "compilerOptions": {
    "composite": true
  },
  "references": [
    {
      "path": "../child"
    }
  ]
}



Output::
/lib/tsc --b /src/main/tsconfig.json -v --traceResolution --explainFiles
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * src/child/tsconfig.json
    * src/main/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'src/child/tsconfig.json' is out of date because output file 'src/child/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project '/src/child/tsconfig.json'...

File '/src/child/package.json' does not exist.
File '/src/package.json' does not exist.
File '/package.json' does not exist.
======== Resolving module '../child/child2' from '/src/child/child.ts'. ========
Module resolution kind is not specified, using 'Node10'.
Loading module as file / folder, candidate module location '/src/child/child2', target file types: TypeScript, Declaration.
File '/src/child/child2.ts' exists - use it as a name resolution result.
======== Module name '../child/child2' was successfully resolved to '/src/child/child2.ts'. ========
File '/src/child/package.json' does not exist according to earlier cached lookups.
File '/src/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
File '/lib/package.json' does not exist.
File '/package.json' does not exist according to earlier cached lookups.
lib/lib.d.ts
  Default library for target 'es5'
src/child/child2.ts
  Imported via "../child/child2" from file 'src/child/child.ts'
  Matched by default include pattern '**/*'
src/child/child.ts
  Matched by default include pattern '**/*'
[[90mHH:MM:SS AM[0m] Project 'src/main/tsconfig.json' is out of date because output file 'src/main/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project '/src/main/tsconfig.json'...

File '/src/main/package.json' does not exist.
File '/src/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
======== Resolving module '../child/child' from '/src/main/main.ts'. ========
Module resolution kind is not specified, using 'Node10'.
Loading module as file / folder, candidate module location '/src/child/child', target file types: TypeScript, Declaration.
File '/src/child/child.ts' exists - use it as a name resolution result.
======== Module name '../child/child' was successfully resolved to '/src/child/child.ts'. ========
File '/src/child/package.json' does not exist according to earlier cached lookups.
File '/src/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
File '/lib/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
lib/lib.d.ts
  Default library for target 'es5'
src/child/child.d.ts
  Imported via "../child/child" from file 'src/main/main.ts'
  File is output of project reference source 'src/child/child.ts'
src/main/main.ts
  Matched by default include pattern '**/*'
exitCode:: ExitStatus.Success


//// [/src/child/child.d.ts]
export declare function child(): void;


//// [/src/child/child.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.child = child;
var child2_1 = require("../child/child2");
function child() {
    (0, child2_1.child2)();
}


//// [/src/child/child2.d.ts]
export declare function child2(): void;


//// [/src/child/child2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.child2 = child2;
function child2() {
}


//// [/src/child/tsconfig.tsbuildinfo]
{"fileNames":["../../lib/lib.d.ts","./child2.ts","./child.ts"],"fileIdsList":[[2]],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedFormat":1},{"version":"6507293504-export function child2() {\n}\n","signature":"-5501507595-export declare function child2(): void;\n","impliedFormat":1},{"version":"-11458139532-import { child2 } from \"../child/child2\";\nexport function child() {\n    child2();\n}\n","signature":"-1814288093-export declare function child(): void;\n","impliedFormat":1}],"root":[2,3],"options":{"composite":true},"referencedMap":[[3,1]],"latestChangedDtsFile":"./child.d.ts","version":"FakeTSVersion"}

//// [/src/child/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../lib/lib.d.ts",
    "./child2.ts",
    "./child.ts"
  ],
  "fileIdsList": [
    [
      "./child2.ts"
    ]
  ],
  "fileInfos": {
    "../../lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true,
        "impliedFormat": 1
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true,
      "impliedFormat": "commonjs"
    },
    "./child2.ts": {
      "original": {
        "version": "6507293504-export function child2() {\n}\n",
        "signature": "-5501507595-export declare function child2(): void;\n",
        "impliedFormat": 1
      },
      "version": "6507293504-export function child2() {\n}\n",
      "signature": "-5501507595-export declare function child2(): void;\n",
      "impliedFormat": "commonjs"
    },
    "./child.ts": {
      "original": {
        "version": "-11458139532-import { child2 } from \"../child/child2\";\nexport function child() {\n    child2();\n}\n",
        "signature": "-1814288093-export declare function child(): void;\n",
        "impliedFormat": 1
      },
      "version": "-11458139532-import { child2 } from \"../child/child2\";\nexport function child() {\n    child2();\n}\n",
      "signature": "-1814288093-export declare function child(): void;\n",
      "impliedFormat": "commonjs"
    }
  },
  "root": [
    [
      2,
      "./child2.ts"
    ],
    [
      3,
      "./child.ts"
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
  "version": "FakeTSVersion",
  "size": 1070
}

//// [/src/main/main.d.ts]
export declare function main(): void;


//// [/src/main/main.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = main;
var child_1 = require("../child/child");
function main() {
    (0, child_1.child)();
}


//// [/src/main/tsconfig.tsbuildinfo]
{"fileNames":["../../lib/lib.d.ts","../child/child.d.ts","./main.ts"],"fileIdsList":[[2]],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedFormat":1},{"version":"-1814288093-export declare function child(): void;\n","impliedFormat":1},{"version":"-8540107489-import { child } from \"../child/child\";\nexport function main() {\n    child();\n}\n","signature":"-2471343004-export declare function main(): void;\n","impliedFormat":1}],"root":[3],"options":{"composite":true},"referencedMap":[[3,1]],"latestChangedDtsFile":"./main.d.ts","version":"FakeTSVersion"}

//// [/src/main/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../lib/lib.d.ts",
    "../child/child.d.ts",
    "./main.ts"
  ],
  "fileIdsList": [
    [
      "../child/child.d.ts"
    ]
  ],
  "fileInfos": {
    "../../lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true,
        "impliedFormat": 1
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true,
      "impliedFormat": "commonjs"
    },
    "../child/child.d.ts": {
      "original": {
        "version": "-1814288093-export declare function child(): void;\n",
        "impliedFormat": 1
      },
      "version": "-1814288093-export declare function child(): void;\n",
      "signature": "-1814288093-export declare function child(): void;\n",
      "impliedFormat": "commonjs"
    },
    "./main.ts": {
      "original": {
        "version": "-8540107489-import { child } from \"../child/child\";\nexport function main() {\n    child();\n}\n",
        "signature": "-2471343004-export declare function main(): void;\n",
        "impliedFormat": 1
      },
      "version": "-8540107489-import { child } from \"../child/child\";\nexport function main() {\n    child();\n}\n",
      "signature": "-2471343004-export declare function main(): void;\n",
      "impliedFormat": "commonjs"
    }
  },
  "root": [
    [
      3,
      "./main.ts"
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
  "version": "FakeTSVersion",
  "size": 1010
}



Change:: delete child2 file
Input::
//// [/src/child/child2.d.ts] unlink
//// [/src/child/child2.js] unlink
//// [/src/child/child2.ts] unlink


Output::
/lib/tsc --b /src/main/tsconfig.json -v --traceResolution --explainFiles
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * src/child/tsconfig.json
    * src/main/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'src/child/tsconfig.json' is out of date because buildinfo file 'src/child/tsconfig.tsbuildinfo' indicates that file 'src/child/child2.ts' was root file of compilation but not any more.

[[90mHH:MM:SS AM[0m] Building project '/src/child/tsconfig.json'...

File '/src/child/package.json' does not exist.
File '/src/package.json' does not exist.
File '/package.json' does not exist.
======== Resolving module '../child/child2' from '/src/child/child.ts'. ========
Module resolution kind is not specified, using 'Node10'.
Loading module as file / folder, candidate module location '/src/child/child2', target file types: TypeScript, Declaration.
File '/src/child/child2.ts' does not exist.
File '/src/child/child2.tsx' does not exist.
File '/src/child/child2.d.ts' does not exist.
Directory '/src/child/child2' does not exist, skipping all lookups in it.
Loading module as file / folder, candidate module location '/src/child/child2', target file types: JavaScript.
File '/src/child/child2.js' does not exist.
File '/src/child/child2.jsx' does not exist.
Directory '/src/child/child2' does not exist, skipping all lookups in it.
======== Module name '../child/child2' was not resolved. ========
File '/lib/package.json' does not exist.
File '/package.json' does not exist according to earlier cached lookups.
[96msrc/child/child.ts[0m:[93m1[0m:[93m24[0m - [91merror[0m[90m TS2307: [0mCannot find module '../child/child2' or its corresponding type declarations.

[7m1[0m import { child2 } from "../child/child2";
[7m [0m [91m                       ~~~~~~~~~~~~~~~~~[0m

lib/lib.d.ts
  Default library for target 'es5'
src/child/child.ts
  Matched by default include pattern '**/*'
[[90mHH:MM:SS AM[0m] Project 'src/main/tsconfig.json' can't be built because its dependency 'src/child' has errors

[[90mHH:MM:SS AM[0m] Skipping build of project '/src/main/tsconfig.json' because its dependency '/src/child' has errors


Found 1 error.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped


//// [/src/child/tsconfig.tsbuildinfo]
{"fileNames":["../../lib/lib.d.ts","./child.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedFormat":1},{"version":"-11458139532-import { child2 } from \"../child/child2\";\nexport function child() {\n    child2();\n}\n","signature":"-1814288093-export declare function child(): void;\n","impliedFormat":1}],"root":[2],"options":{"composite":true},"semanticDiagnosticsPerFile":[[2,[{"start":23,"length":17,"messageText":"Cannot find module '../child/child2' or its corresponding type declarations.","category":1,"code":2307}]]],"affectedFilesPendingEmit":[2],"latestChangedDtsFile":"./child.d.ts","version":"FakeTSVersion"}

//// [/src/child/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../lib/lib.d.ts",
    "./child.ts"
  ],
  "fileInfos": {
    "../../lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true,
        "impliedFormat": 1
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true,
      "impliedFormat": "commonjs"
    },
    "./child.ts": {
      "original": {
        "version": "-11458139532-import { child2 } from \"../child/child2\";\nexport function child() {\n    child2();\n}\n",
        "signature": "-1814288093-export declare function child(): void;\n",
        "impliedFormat": 1
      },
      "version": "-11458139532-import { child2 } from \"../child/child2\";\nexport function child() {\n    child2();\n}\n",
      "signature": "-1814288093-export declare function child(): void;\n",
      "impliedFormat": "commonjs"
    }
  },
  "root": [
    [
      2,
      "./child.ts"
    ]
  ],
  "options": {
    "composite": true
  },
  "semanticDiagnosticsPerFile": [
    [
      "./child.ts",
      [
        {
          "start": 23,
          "length": 17,
          "messageText": "Cannot find module '../child/child2' or its corresponding type declarations.",
          "category": 1,
          "code": 2307
        }
      ]
    ]
  ],
  "affectedFilesPendingEmit": [
    [
      "./child.ts",
      "Js | Dts"
    ]
  ],
  "latestChangedDtsFile": "./child.d.ts",
  "version": "FakeTSVersion",
  "size": 1078
}

