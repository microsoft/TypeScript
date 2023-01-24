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
{"compilerOptions":{"composite":true}}

//// [/src/main/main.ts]
import { child } from "../child/child";
export function main() {
    child();
}


//// [/src/main/tsconfig.json]
{"compilerOptions":{"composite":true},"references":[{"path":"../child"}]}



Output::
/lib/tsc --b /src/main/tsconfig.json -v --traceResolution --explainFiles
[[90m12:00:13 AM[0m] Projects in this build: 
    * src/child/tsconfig.json
    * src/main/tsconfig.json

[[90m12:00:14 AM[0m] Project 'src/child/tsconfig.json' is out of date because output file 'src/child/tsconfig.tsbuildinfo' does not exist

[[90m12:00:15 AM[0m] Building project '/src/child/tsconfig.json'...

======== Resolving module '../child/child2' from '/src/child/child.ts'. ========
Module resolution kind is not specified, using 'Node10'.
Loading module as file / folder, candidate module location '/src/child/child2', target file types: TypeScript, Declaration.
File '/src/child/child2.ts' exist - use it as a name resolution result.
======== Module name '../child/child2' was successfully resolved to '/src/child/child2.ts'. ========
lib/lib.d.ts
  Default library for target 'es5'
src/child/child2.ts
  Imported via "../child/child2" from file 'src/child/child.ts'
  Matched by default include pattern '**/*'
src/child/child.ts
  Matched by default include pattern '**/*'
[[90m12:00:23 AM[0m] Project 'src/main/tsconfig.json' is out of date because output file 'src/main/tsconfig.tsbuildinfo' does not exist

[[90m12:00:24 AM[0m] Building project '/src/main/tsconfig.json'...

======== Resolving module '../child/child' from '/src/main/main.ts'. ========
Module resolution kind is not specified, using 'Node10'.
Loading module as file / folder, candidate module location '/src/child/child', target file types: TypeScript, Declaration.
File '/src/child/child.ts' exist - use it as a name resolution result.
======== Module name '../child/child' was successfully resolved to '/src/child/child.ts'. ========
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
exports.child = void 0;
var child2_1 = require("../child/child2");
function child() {
    (0, child2_1.child2)();
}
exports.child = child;


//// [/src/child/child2.d.ts]
export declare function child2(): void;


//// [/src/child/child2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.child2 = void 0;
function child2() {
}
exports.child2 = child2;


//// [/src/child/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../lib/lib.d.ts","./child2.ts","./child.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"6507293504-export function child2() {\n}\n","signature":"-5501507595-export declare function child2(): void;\n"},{"version":"-11458139532-import { child2 } from \"../child/child2\";\nexport function child() {\n    child2();\n}\n","signature":"-1814288093-export declare function child(): void;\n"}],"options":{"composite":true},"fileIdsList":[[2]],"referencedMap":[[3,1]],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,3,2],"latestChangedDtsFile":"./child.d.ts"},"version":"FakeTSVersion"}

//// [/src/child/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "./child2.ts",
      "./child.ts"
    ],
    "fileNamesList": [
      [
        "./child2.ts"
      ]
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": {
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
    "options": {
      "composite": true
    },
    "referencedMap": {
      "./child.ts": [
        "./child2.ts"
      ]
    },
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      "./child.ts",
      "./child2.ts"
    ],
    "latestChangedDtsFile": "./child.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 1076
}

//// [/src/main/main.d.ts]
export declare function main(): void;


//// [/src/main/main.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
var child_1 = require("../child/child");
function main() {
    (0, child_1.child)();
}
exports.main = main;


//// [/src/main/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../lib/lib.d.ts","../child/child.d.ts","./main.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},"-1814288093-export declare function child(): void;\n",{"version":"-8540107489-import { child } from \"../child/child\";\nexport function main() {\n    child();\n}\n","signature":"-2471343004-export declare function main(): void;\n"}],"options":{"composite":true},"fileIdsList":[[2]],"referencedMap":[[3,1]],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,2,3],"latestChangedDtsFile":"./main.d.ts"},"version":"FakeTSVersion"}

//// [/src/main/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "../child/child.d.ts",
      "./main.ts"
    ],
    "fileNamesList": [
      [
        "../child/child.d.ts"
      ]
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": {
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
    "options": {
      "composite": true
    },
    "referencedMap": {
      "./main.ts": [
        "../child/child.d.ts"
      ]
    },
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      "../child/child.d.ts",
      "./main.ts"
    ],
    "latestChangedDtsFile": "./main.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 1006
}



Change:: delete child2 file
Input::
//// [/src/child/child2.d.ts] unlink
//// [/src/child/child2.js] unlink
//// [/src/child/child2.ts] unlink


Output::
/lib/tsc --b /src/main/tsconfig.json -v --traceResolution --explainFiles
[[90m12:00:33 AM[0m] Projects in this build: 
    * src/child/tsconfig.json
    * src/main/tsconfig.json

[[90m12:00:34 AM[0m] Project 'src/child/tsconfig.json' is up to date because newest input 'src/child/child.ts' is older than output 'src/child/tsconfig.tsbuildinfo'

[[90m12:00:35 AM[0m] Project 'src/main/tsconfig.json' is up to date because newest input 'src/main/main.ts' is older than output 'src/main/tsconfig.tsbuildinfo'

exitCode:: ExitStatus.Success


