currentDirectory:: /home/src/workspaces/solution useCaseSensitiveFileNames:: false
Input::
//// [/home/src/workspaces/solution/project1/tsconfig.json]
{
  "compilerOptions": {
    "composite": true
  },
  "references": []
}

//// [/home/src/workspaces/solution/project2/tsconfig.json]
{
  "compilerOptions": {
    "composite": true
  },
  "references": []
}

//// [/home/src/workspaces/solution/project2/src/b.ts]
export const b = 10;

//// [/home/src/workspaces/solution/project3/tsconfig.json]
{
  "compilerOptions": {
    "composite": true
  },
  "references": [
    {
      "path": "../project1"
    },
    {
      "path": "../project2"
    }
  ]
}

//// [/home/src/workspaces/solution/project3/src/c.ts]
export const c = 10;

//// [/home/src/workspaces/solution/project4/tsconfig.json]
{
  "compilerOptions": {
    "composite": true
  },
  "references": [
    {
      "path": "../project3"
    }
  ]
}

//// [/home/src/workspaces/solution/project4/src/d.ts]
export const d = 10;

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


/home/src/tslibs/TS/Lib/tsc.js --b project4 --verbose --explainFiles
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * project1/tsconfig.json
    * project2/tsconfig.json
    * project3/tsconfig.json
    * project4/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'project2/tsconfig.json' is out of date because output file 'project2/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/solution/project2/tsconfig.json'...

../../tslibs/TS/Lib/lib.d.ts
  Default library for target 'es5'
project2/src/b.ts
  Matched by default include pattern '**/*'
[[90mHH:MM:SS AM[0m] Project 'project3/tsconfig.json' is out of date because output file 'project3/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/solution/project3/tsconfig.json'...

../../tslibs/TS/Lib/lib.d.ts
  Default library for target 'es5'
project3/src/c.ts
  Matched by default include pattern '**/*'
[[90mHH:MM:SS AM[0m] Project 'project4/tsconfig.json' is out of date because output file 'project4/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/solution/project4/tsconfig.json'...

../../tslibs/TS/Lib/lib.d.ts
  Default library for target 'es5'
project4/src/d.ts
  Matched by default include pattern '**/*'


//// [/home/src/workspaces/solution/project2/src/b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.b = void 0;
exports.b = 10;


//// [/home/src/workspaces/solution/project2/src/b.d.ts]
export declare const b = 10;


//// [/home/src/workspaces/solution/project2/tsconfig.tsbuildinfo]
{"fileNames":["../../../tslibs/ts/lib/lib.d.ts","./src/b.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-13368947479-export const b = 10;","signature":"-3829150557-export declare const b = 10;\n"}],"root":[2],"options":{"composite":true},"latestChangedDtsFile":"./src/b.d.ts","version":"FakeTSVersion"}

//// [/home/src/workspaces/solution/project2/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../tslibs/ts/lib/lib.d.ts",
    "./src/b.ts"
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
    "./src/b.ts": {
      "original": {
        "version": "-13368947479-export const b = 10;",
        "signature": "-3829150557-export declare const b = 10;\n"
      },
      "version": "-13368947479-export const b = 10;",
      "signature": "-3829150557-export declare const b = 10;\n"
    }
  },
  "root": [
    [
      2,
      "./src/b.ts"
    ]
  ],
  "options": {
    "composite": true
  },
  "latestChangedDtsFile": "./src/b.d.ts",
  "version": "FakeTSVersion",
  "size": 764
}

//// [/home/src/workspaces/solution/project3/src/c.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.c = void 0;
exports.c = 10;


//// [/home/src/workspaces/solution/project3/src/c.d.ts]
export declare const c = 10;


//// [/home/src/workspaces/solution/project3/tsconfig.tsbuildinfo]
{"fileNames":["../../../tslibs/ts/lib/lib.d.ts","./src/c.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-12077479510-export const c = 10;","signature":"-4160380540-export declare const c = 10;\n"}],"root":[2],"options":{"composite":true},"latestChangedDtsFile":"./src/c.d.ts","version":"FakeTSVersion"}

//// [/home/src/workspaces/solution/project3/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../tslibs/ts/lib/lib.d.ts",
    "./src/c.ts"
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
    "./src/c.ts": {
      "original": {
        "version": "-12077479510-export const c = 10;",
        "signature": "-4160380540-export declare const c = 10;\n"
      },
      "version": "-12077479510-export const c = 10;",
      "signature": "-4160380540-export declare const c = 10;\n"
    }
  },
  "root": [
    [
      2,
      "./src/c.ts"
    ]
  ],
  "options": {
    "composite": true
  },
  "latestChangedDtsFile": "./src/c.d.ts",
  "version": "FakeTSVersion",
  "size": 764
}

//// [/home/src/workspaces/solution/project4/src/d.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.d = void 0;
exports.d = 10;


//// [/home/src/workspaces/solution/project4/src/d.d.ts]
export declare const d = 10;


//// [/home/src/workspaces/solution/project4/tsconfig.tsbuildinfo]
{"fileNames":["../../../tslibs/ts/lib/lib.d.ts","./src/d.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-10786011541-export const d = 10;","signature":"-4491610523-export declare const d = 10;\n"}],"root":[2],"options":{"composite":true},"latestChangedDtsFile":"./src/d.d.ts","version":"FakeTSVersion"}

//// [/home/src/workspaces/solution/project4/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../tslibs/ts/lib/lib.d.ts",
    "./src/d.ts"
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
    "./src/d.ts": {
      "original": {
        "version": "-10786011541-export const d = 10;",
        "signature": "-4491610523-export declare const d = 10;\n"
      },
      "version": "-10786011541-export const d = 10;",
      "signature": "-4491610523-export declare const d = 10;\n"
    }
  },
  "root": [
    [
      2,
      "./src/d.ts"
    ]
  ],
  "options": {
    "composite": true
  },
  "latestChangedDtsFile": "./src/d.d.ts",
  "version": "FakeTSVersion",
  "size": 764
}


exitCode:: ExitStatus.Success

Change:: modify project3 file

Input::
//// [/home/src/workspaces/solution/project3/src/c.ts]
export const cc = 10;


/home/src/tslibs/TS/Lib/tsc.js --b project4 --verbose --explainFiles
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * project1/tsconfig.json
    * project2/tsconfig.json
    * project3/tsconfig.json
    * project4/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'project2/tsconfig.json' is up to date because newest input 'project2/src/b.ts' is older than output 'project2/tsconfig.tsbuildinfo'

[[90mHH:MM:SS AM[0m] Project 'project3/tsconfig.json' is out of date because output 'project3/tsconfig.tsbuildinfo' is older than input 'project3/src/c.ts'

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/solution/project3/tsconfig.json'...

../../tslibs/TS/Lib/lib.d.ts
  Default library for target 'es5'
project3/src/c.ts
  Matched by default include pattern '**/*'
[[90mHH:MM:SS AM[0m] Project 'project4/tsconfig.json' is out of date because output 'project4/tsconfig.tsbuildinfo' is older than input 'project3'

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/solution/project4/tsconfig.json'...

../../tslibs/TS/Lib/lib.d.ts
  Default library for target 'es5'
project4/src/d.ts
  Matched by default include pattern '**/*'
[[90mHH:MM:SS AM[0m] Updating unchanged output timestamps of project '/home/src/workspaces/solution/project4/tsconfig.json'...



//// [/home/src/workspaces/solution/project3/src/c.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cc = void 0;
exports.cc = 10;


//// [/home/src/workspaces/solution/project3/src/c.d.ts]
export declare const cc = 10;


//// [/home/src/workspaces/solution/project3/tsconfig.tsbuildinfo]
{"fileNames":["../../../tslibs/ts/lib/lib.d.ts","./src/c.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-12481904019-export const cc = 10;","signature":"-2549218137-export declare const cc = 10;\n"}],"root":[2],"options":{"composite":true},"latestChangedDtsFile":"./src/c.d.ts","version":"FakeTSVersion"}

//// [/home/src/workspaces/solution/project3/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../tslibs/ts/lib/lib.d.ts",
    "./src/c.ts"
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
    "./src/c.ts": {
      "original": {
        "version": "-12481904019-export const cc = 10;",
        "signature": "-2549218137-export declare const cc = 10;\n"
      },
      "version": "-12481904019-export const cc = 10;",
      "signature": "-2549218137-export declare const cc = 10;\n"
    }
  },
  "root": [
    [
      2,
      "./src/c.ts"
    ]
  ],
  "options": {
    "composite": true
  },
  "latestChangedDtsFile": "./src/c.d.ts",
  "version": "FakeTSVersion",
  "size": 766
}

//// [/home/src/workspaces/solution/project4/tsconfig.tsbuildinfo] file changed its modified time

exitCode:: ExitStatus.Success
