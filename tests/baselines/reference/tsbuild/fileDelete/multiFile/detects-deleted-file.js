currentDirectory:: /home/src/workspaces/solution useCaseSensitiveFileNames:: false
Input::
//// [/home/src/workspaces/solution/child/child.ts]
import { child2 } from "../child/child2";
export function child() {
    child2();
}


//// [/home/src/workspaces/solution/child/child2.ts]
export function child2() {
}


//// [/home/src/workspaces/solution/child/tsconfig.json]
{
  "compilerOptions": {
    "composite": true
  }
}

//// [/home/src/workspaces/solution/main/main.ts]
import { child } from "../child/child";
export function main() {
    child();
}


//// [/home/src/workspaces/solution/main/tsconfig.json]
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

//// [/home/src/tslibs/TS/Lib/lib.d.ts]
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


/home/src/tslibs/TS/Lib/tsc.js --b main/tsconfig.json -v --traceResolution --explainFiles
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * child/tsconfig.json
    * main/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'child/tsconfig.json' is out of date because output file 'child/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/solution/child/tsconfig.json'...

======== Resolving module '../child/child2' from '/home/src/workspaces/solution/child/child.ts'. ========
Module resolution kind is not specified, using 'Node10'.
Loading module as file / folder, candidate module location '/home/src/workspaces/solution/child/child2', target file types: TypeScript, Declaration.
File '/home/src/workspaces/solution/child/child2.ts' exists - use it as a name resolution result.
======== Module name '../child/child2' was successfully resolved to '/home/src/workspaces/solution/child/child2.ts'. ========
../../tslibs/TS/Lib/lib.d.ts
  Default library for target 'es5'
child/child2.ts
  Imported via "../child/child2" from file 'child/child.ts'
  Matched by default include pattern '**/*'
child/child.ts
  Matched by default include pattern '**/*'
[[90mHH:MM:SS AM[0m] Project 'main/tsconfig.json' is out of date because output file 'main/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/solution/main/tsconfig.json'...

======== Resolving module '../child/child' from '/home/src/workspaces/solution/main/main.ts'. ========
Module resolution kind is not specified, using 'Node10'.
Loading module as file / folder, candidate module location '/home/src/workspaces/solution/child/child', target file types: TypeScript, Declaration.
File '/home/src/workspaces/solution/child/child.ts' exists - use it as a name resolution result.
======== Module name '../child/child' was successfully resolved to '/home/src/workspaces/solution/child/child.ts'. ========
../../tslibs/TS/Lib/lib.d.ts
  Default library for target 'es5'
child/child.d.ts
  Imported via "../child/child" from file 'main/main.ts'
  File is output of project reference source 'child/child.ts'
main/main.ts
  Matched by default include pattern '**/*'


//// [/home/src/workspaces/solution/child/child2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.child2 = child2;
function child2() {
}


//// [/home/src/workspaces/solution/child/child2.d.ts]
export declare function child2(): void;


//// [/home/src/workspaces/solution/child/child.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.child = child;
var child2_1 = require("../child/child2");
function child() {
    (0, child2_1.child2)();
}


//// [/home/src/workspaces/solution/child/child.d.ts]
export declare function child(): void;


//// [/home/src/workspaces/solution/child/tsconfig.tsbuildinfo]
{"fileNames":["../../../tslibs/ts/lib/lib.d.ts","./child2.ts","./child.ts"],"fileIdsList":[[2]],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"6507293504-export function child2() {\n}\n","signature":"-5501507595-export declare function child2(): void;\n"},{"version":"-11458139532-import { child2 } from \"../child/child2\";\nexport function child() {\n    child2();\n}\n","signature":"-1814288093-export declare function child(): void;\n"}],"root":[2,3],"options":{"composite":true},"referencedMap":[[3,1]],"latestChangedDtsFile":"./child.d.ts","version":"FakeTSVersion"}

//// [/home/src/workspaces/solution/child/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../tslibs/ts/lib/lib.d.ts",
    "./child2.ts",
    "./child.ts"
  ],
  "fileIdsList": [
    [
      "./child2.ts"
    ]
  ],
  "fileInfos": {
    "../../../tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "./child2.ts": {
      "original": {
        "version": "6507293504-export function child2() {\n}\n",
        "signature": "-5501507595-export declare function child2(): void;\n"
      },
      "version": "6507293504-export function child2() {\n}\n",
      "signature": "-5501507595-export declare function child2(): void;\n"
    },
    "./child.ts": {
      "original": {
        "version": "-11458139532-import { child2 } from \"../child/child2\";\nexport function child() {\n    child2();\n}\n",
        "signature": "-1814288093-export declare function child(): void;\n"
      },
      "version": "-11458139532-import { child2 } from \"../child/child2\";\nexport function child() {\n    child2();\n}\n",
      "signature": "-1814288093-export declare function child(): void;\n"
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
  "size": 1029
}

//// [/home/src/workspaces/solution/main/main.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = main;
var child_1 = require("../child/child");
function main() {
    (0, child_1.child)();
}


//// [/home/src/workspaces/solution/main/main.d.ts]
export declare function main(): void;


//// [/home/src/workspaces/solution/main/tsconfig.tsbuildinfo]
{"fileNames":["../../../tslibs/ts/lib/lib.d.ts","../child/child.d.ts","./main.ts"],"fileIdsList":[[2]],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},"-1814288093-export declare function child(): void;\n",{"version":"-8540107489-import { child } from \"../child/child\";\nexport function main() {\n    child();\n}\n","signature":"-2471343004-export declare function main(): void;\n"}],"root":[3],"options":{"composite":true},"referencedMap":[[3,1]],"latestChangedDtsFile":"./main.d.ts","version":"FakeTSVersion"}

//// [/home/src/workspaces/solution/main/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../tslibs/ts/lib/lib.d.ts",
    "../child/child.d.ts",
    "./main.ts"
  ],
  "fileIdsList": [
    [
      "../child/child.d.ts"
    ]
  ],
  "fileInfos": {
    "../../../tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "../child/child.d.ts": {
      "version": "-1814288093-export declare function child(): void;\n",
      "signature": "-1814288093-export declare function child(): void;\n"
    },
    "./main.ts": {
      "original": {
        "version": "-8540107489-import { child } from \"../child/child\";\nexport function main() {\n    child();\n}\n",
        "signature": "-2471343004-export declare function main(): void;\n"
      },
      "version": "-8540107489-import { child } from \"../child/child\";\nexport function main() {\n    child();\n}\n",
      "signature": "-2471343004-export declare function main(): void;\n"
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
  "size": 957
}


exitCode:: ExitStatus.Success

Change:: delete child2 file

Input::
//// [/home/src/workspaces/solution/child/child2.ts] deleted
//// [/home/src/workspaces/solution/child/child2.js] deleted
//// [/home/src/workspaces/solution/child/child2.d.ts] deleted

/home/src/tslibs/TS/Lib/tsc.js --b main/tsconfig.json -v --traceResolution --explainFiles
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * child/tsconfig.json
    * main/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'child/tsconfig.json' is out of date because buildinfo file 'child/tsconfig.tsbuildinfo' indicates that file 'child/child2.ts' was root file of compilation but not any more.

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/solution/child/tsconfig.json'...

======== Resolving module '../child/child2' from '/home/src/workspaces/solution/child/child.ts'. ========
Module resolution kind is not specified, using 'Node10'.
Loading module as file / folder, candidate module location '/home/src/workspaces/solution/child/child2', target file types: TypeScript, Declaration.
File '/home/src/workspaces/solution/child/child2.ts' does not exist.
File '/home/src/workspaces/solution/child/child2.tsx' does not exist.
File '/home/src/workspaces/solution/child/child2.d.ts' does not exist.
Directory '/home/src/workspaces/solution/child/child2' does not exist, skipping all lookups in it.
Loading module as file / folder, candidate module location '/home/src/workspaces/solution/child/child2', target file types: JavaScript.
File '/home/src/workspaces/solution/child/child2.js' does not exist.
File '/home/src/workspaces/solution/child/child2.jsx' does not exist.
Directory '/home/src/workspaces/solution/child/child2' does not exist, skipping all lookups in it.
======== Module name '../child/child2' was not resolved. ========
[96mchild/child.ts[0m:[93m1[0m:[93m24[0m - [91merror[0m[90m TS2307: [0mCannot find module '../child/child2' or its corresponding type declarations.

[7m1[0m import { child2 } from "../child/child2";
[7m [0m [91m                       ~~~~~~~~~~~~~~~~~[0m

../../tslibs/TS/Lib/lib.d.ts
  Default library for target 'es5'
child/child.ts
  Matched by default include pattern '**/*'
[[90mHH:MM:SS AM[0m] Project 'main/tsconfig.json' is up to date with .d.ts files from its dependencies

[[90mHH:MM:SS AM[0m] Updating output timestamps of project '/home/src/workspaces/solution/main/tsconfig.json'...


Found 1 error.



//// [/home/src/workspaces/solution/child/child.js] file written with same contents
//// [/home/src/workspaces/solution/child/tsconfig.tsbuildinfo]
{"fileNames":["../../../tslibs/ts/lib/lib.d.ts","./child.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-11458139532-import { child2 } from \"../child/child2\";\nexport function child() {\n    child2();\n}\n","signature":"-1814288093-export declare function child(): void;\n"}],"root":[2],"options":{"composite":true},"semanticDiagnosticsPerFile":[[2,[{"start":23,"length":17,"messageText":"Cannot find module '../child/child2' or its corresponding type declarations.","category":1,"code":2307}]]],"latestChangedDtsFile":"./child.d.ts","version":"FakeTSVersion"}

//// [/home/src/workspaces/solution/child/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../tslibs/ts/lib/lib.d.ts",
    "./child.ts"
  ],
  "fileInfos": {
    "../../../tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "./child.ts": {
      "original": {
        "version": "-11458139532-import { child2 } from \"../child/child2\";\nexport function child() {\n    child2();\n}\n",
        "signature": "-1814288093-export declare function child(): void;\n"
      },
      "version": "-11458139532-import { child2 } from \"../child/child2\";\nexport function child() {\n    child2();\n}\n",
      "signature": "-1814288093-export declare function child(): void;\n"
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
  "latestChangedDtsFile": "./child.d.ts",
  "version": "FakeTSVersion",
  "size": 1024
}

//// [/home/src/workspaces/solution/main/tsconfig.tsbuildinfo] file changed its modified time

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated
