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

//// [/src/project1/tsconfig.json]
{"compilerOptions":{"composite":true},"references":[]}

//// [/src/project2/src/b.ts]
export const b = 10;

//// [/src/project2/tsconfig.json]
{"compilerOptions":{"composite":true},"references":[]}

//// [/src/project3/src/c.ts]
export const c = 10;

//// [/src/project3/tsconfig.json]
{"compilerOptions":{"composite":true},"references":[{"path":"../project1"},{"path":"../project2"}]}

//// [/src/project4/src/d.ts]
export const d = 10;

//// [/src/project4/tsconfig.json]
{"compilerOptions":{"composite":true},"references":[{"path":"../project3"}]}



Output::
/lib/tsc --b /src/project4 --verbose --explainFiles
[[90m12:00:20 AM[0m] Projects in this build: 
    * src/project1/tsconfig.json
    * src/project2/tsconfig.json
    * src/project3/tsconfig.json
    * src/project4/tsconfig.json

[[90m12:00:21 AM[0m] Project 'src/project2/tsconfig.json' is out of date because output file 'src/project2/tsconfig.tsbuildinfo' does not exist

[[90m12:00:22 AM[0m] Building project '/src/project2/tsconfig.json'...

lib/lib.d.ts
  Default library for target 'es3'
src/project2/src/b.ts
  Matched by default include pattern '**/*'
[[90m12:00:28 AM[0m] Project 'src/project3/tsconfig.json' is out of date because output file 'src/project3/tsconfig.tsbuildinfo' does not exist

[[90m12:00:29 AM[0m] Building project '/src/project3/tsconfig.json'...

lib/lib.d.ts
  Default library for target 'es3'
src/project3/src/c.ts
  Matched by default include pattern '**/*'
[[90m12:00:35 AM[0m] Project 'src/project4/tsconfig.json' is out of date because output file 'src/project4/tsconfig.tsbuildinfo' does not exist

[[90m12:00:36 AM[0m] Building project '/src/project4/tsconfig.json'...

lib/lib.d.ts
  Default library for target 'es3'
src/project4/src/d.ts
  Matched by default include pattern '**/*'
exitCode:: ExitStatus.Success


//// [/src/project2/src/b.d.ts]
export declare const b = 10;


//// [/src/project2/src/b.js]
"use strict";
exports.__esModule = true;
exports.b = void 0;
exports.b = 10;


//// [/src/project2/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../lib/lib.d.ts","./src/b.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-13368947479-export const b = 10;","signature":"-1807916688-export declare const b = 10;\r\n"}],"options":{"composite":true},"referencedMap":[],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,2],"latestChangedDtsFile":"./src/b.d.ts"},"version":"FakeTSVersion"}

//// [/src/project2/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "./src/b.ts"
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./src/b.ts": {
        "version": "-13368947479-export const b = 10;",
        "signature": "-1807916688-export declare const b = 10;\r\n"
      }
    },
    "options": {
      "composite": true
    },
    "referencedMap": {},
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      "./src/b.ts"
    ],
    "latestChangedDtsFile": "./src/b.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 832
}

//// [/src/project3/src/c.d.ts]
export declare const c = 10;


//// [/src/project3/src/c.js]
"use strict";
exports.__esModule = true;
exports.c = void 0;
exports.c = 10;


//// [/src/project3/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../lib/lib.d.ts","./src/c.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-12077479510-export const c = 10;","signature":"-4148571535-export declare const c = 10;\r\n"}],"options":{"composite":true},"referencedMap":[],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,2],"latestChangedDtsFile":"./src/c.d.ts"},"version":"FakeTSVersion"}

//// [/src/project3/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "./src/c.ts"
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./src/c.ts": {
        "version": "-12077479510-export const c = 10;",
        "signature": "-4148571535-export declare const c = 10;\r\n"
      }
    },
    "options": {
      "composite": true
    },
    "referencedMap": {},
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      "./src/c.ts"
    ],
    "latestChangedDtsFile": "./src/c.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 832
}

//// [/src/project4/src/d.d.ts]
export declare const d = 10;


//// [/src/project4/src/d.js]
"use strict";
exports.__esModule = true;
exports.d = void 0;
exports.d = 10;


//// [/src/project4/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../lib/lib.d.ts","./src/d.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-10786011541-export const d = 10;","signature":"-6489226382-export declare const d = 10;\r\n"}],"options":{"composite":true},"referencedMap":[],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,2],"latestChangedDtsFile":"./src/d.d.ts"},"version":"FakeTSVersion"}

//// [/src/project4/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "./src/d.ts"
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./src/d.ts": {
        "version": "-10786011541-export const d = 10;",
        "signature": "-6489226382-export declare const d = 10;\r\n"
      }
    },
    "options": {
      "composite": true
    },
    "referencedMap": {},
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      "./src/d.ts"
    ],
    "latestChangedDtsFile": "./src/d.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 832
}



Change:: modify project3 file
Input::
//// [/src/project3/src/c.ts]
export const cc = 10;



Output::
/lib/tsc --b /src/project4 --verbose --explainFiles
[[90m12:00:43 AM[0m] Projects in this build: 
    * src/project1/tsconfig.json
    * src/project2/tsconfig.json
    * src/project3/tsconfig.json
    * src/project4/tsconfig.json

[[90m12:00:44 AM[0m] Project 'src/project2/tsconfig.json' is up to date because newest input 'src/project2/src/b.ts' is older than output 'src/project2/tsconfig.tsbuildinfo'

[[90m12:00:45 AM[0m] Project 'src/project3/tsconfig.json' is out of date because output 'src/project3/tsconfig.tsbuildinfo' is older than input 'src/project3/src/c.ts'

[[90m12:00:46 AM[0m] Building project '/src/project3/tsconfig.json'...

lib/lib.d.ts
  Default library for target 'es3'
src/project3/src/c.ts
  Matched by default include pattern '**/*'
[[90m12:00:52 AM[0m] Project 'src/project4/tsconfig.json' is out of date because output 'src/project4/tsconfig.tsbuildinfo' is older than input 'src/project3'

[[90m12:00:53 AM[0m] Building project '/src/project4/tsconfig.json'...

[[90m12:00:54 AM[0m] Updating unchanged output timestamps of project '/src/project4/tsconfig.json'...

lib/lib.d.ts
  Default library for target 'es3'
src/project4/src/d.ts
  Matched by default include pattern '**/*'
exitCode:: ExitStatus.Success


//// [/src/project3/src/c.d.ts]
export declare const cc = 10;


//// [/src/project3/src/c.js]
"use strict";
exports.__esModule = true;
exports.cc = void 0;
exports.cc = 10;


//// [/src/project3/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../lib/lib.d.ts","./src/c.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-12481904019-export const cc = 10;","signature":"-2519819788-export declare const cc = 10;\r\n"}],"options":{"composite":true},"referencedMap":[],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,2],"latestChangedDtsFile":"./src/c.d.ts"},"version":"FakeTSVersion"}

//// [/src/project3/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "./src/c.ts"
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./src/c.ts": {
        "version": "-12481904019-export const cc = 10;",
        "signature": "-2519819788-export declare const cc = 10;\r\n"
      }
    },
    "options": {
      "composite": true
    },
    "referencedMap": {},
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      "./src/c.ts"
    ],
    "latestChangedDtsFile": "./src/c.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 834
}

//// [/src/project4/tsconfig.tsbuildinfo] file changed its modified time
