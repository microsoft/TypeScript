currentDirectory:: /home/src/workspace/projects useCaseSensitiveFileNames:: false
Input::
//// [/home/src/workspace/projects/project1/utils.d.ts]
export const y = 10;

//// [/home/src/workspace/projects/project1/file.ts]
export const file = 10;

//// [/home/src/workspace/projects/project1/core.d.ts]
export const core = 10;

//// [/home/src/workspace/projects/project1/index.ts]
export const x = "type1";

//// [/home/src/workspace/projects/project1/file2.ts]
/// <reference lib="webworker"/>
/// <reference lib="scripthost"/>
/// <reference lib="es5"/>


//// [/home/src/workspace/projects/project1/tsconfig.json]
{
  "compilerOptions": {
    "composite": true,
    "typeRoots": [
      "./typeroot1"
    ],
    "lib": [
      "es5",
      "dom"
    ],
    "traceResolution": true
  }
}

//// [/home/src/workspace/projects/project1/typeroot1/sometype/index.d.ts]
export type TheNum = "type1";

//// [/home/src/workspace/projects/project2/utils.d.ts]
export const y = 10;

//// [/home/src/workspace/projects/project2/index.ts]
export const y = 10

//// [/home/src/workspace/projects/project2/tsconfig.json]
{
  "compilerOptions": {
    "composite": true,
    "lib": [
      "es5",
      "dom"
    ],
    "traceResolution": true
  }
}

//// [/home/src/workspace/projects/project3/utils.d.ts]
export const y = 10;

//// [/home/src/workspace/projects/project3/index.ts]
export const z = 10

//// [/home/src/workspace/projects/project3/tsconfig.json]
{
  "compilerOptions": {
    "composite": true,
    "lib": [
      "es5",
      "dom"
    ],
    "traceResolution": true
  }
}

//// [/home/src/workspace/projects/project4/utils.d.ts]
export const y = 10;

//// [/home/src/workspace/projects/project4/index.ts]
export const z = 10

//// [/home/src/workspace/projects/project4/tsconfig.json]
{
  "compilerOptions": {
    "composite": true,
    "lib": [
      "esnext",
      "dom",
      "webworker"
    ],
    "traceResolution": true
  }
}

//// [/home/src/tslibs/TS/Lib/lib.dom.d.ts]
interface DOMInterface { }

//// [/home/src/tslibs/TS/Lib/lib.webworker.d.ts]
interface WebWorkerInterface { }

//// [/home/src/tslibs/TS/Lib/lib.scripthost.d.ts]
interface ScriptHostInterface { }

//// [/home/src/workspace/projects/node_modules/@typescript/unlreated/index.d.ts]
export const unrelated = 10;

//// [/home/src/tslibs/TS/Lib/lib.d.ts]
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


/home/src/tslibs/TS/Lib/tsc.js -b -w project1 project2 project3 project4 --verbose --explainFiles --extendedDiagnostics
Output::
[[90mHH:MM:SS AM[0m] Starting compilation in watch mode...

[[90mHH:MM:SS AM[0m] Projects in this build: 
    * project1/tsconfig.json
    * project2/tsconfig.json
    * project3/tsconfig.json
    * project4/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'project1/tsconfig.json' is out of date because output file 'project1/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspace/projects/project1/tsconfig.json'...

======== Resolving type reference directive 'sometype', containing file '/home/src/workspace/projects/project1/__inferred type names__.ts', root directory '/home/src/workspace/projects/project1/typeroot1'. ========
Resolving with primary search path '/home/src/workspace/projects/project1/typeroot1'.
File '/home/src/workspace/projects/project1/typeroot1/sometype.d.ts' does not exist.
File '/home/src/workspace/projects/project1/typeroot1/sometype/package.json' does not exist.
File '/home/src/workspace/projects/project1/typeroot1/sometype/index.d.ts' exists - use it as a name resolution result.
Resolving real path for '/home/src/workspace/projects/project1/typeroot1/sometype/index.d.ts', result '/home/src/workspace/projects/project1/typeroot1/sometype/index.d.ts'.
======== Type reference directive 'sometype' was successfully resolved to '/home/src/workspace/projects/project1/typeroot1/sometype/index.d.ts', primary: true. ========
../../tslibs/TS/Lib/lib.es5.d.ts
  Library referenced via 'es5' from file 'project1/file2.ts'
  Library 'lib.es5.d.ts' specified in compilerOptions
../../tslibs/TS/Lib/lib.dom.d.ts
  Library 'lib.dom.d.ts' specified in compilerOptions
../../tslibs/TS/Lib/lib.webworker.d.ts
  Library referenced via 'webworker' from file 'project1/file2.ts'
../../tslibs/TS/Lib/lib.scripthost.d.ts
  Library referenced via 'scripthost' from file 'project1/file2.ts'
project1/core.d.ts
  Matched by default include pattern '**/*'
project1/file.ts
  Matched by default include pattern '**/*'
project1/file2.ts
  Matched by default include pattern '**/*'
project1/index.ts
  Matched by default include pattern '**/*'
project1/utils.d.ts
  Matched by default include pattern '**/*'
project1/typeroot1/sometype/index.d.ts
  Matched by default include pattern '**/*'
  Entry point for implicit type library 'sometype'
[[90mHH:MM:SS AM[0m] Project 'project2/tsconfig.json' is out of date because output file 'project2/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspace/projects/project2/tsconfig.json'...

../../tslibs/TS/Lib/lib.es5.d.ts
  Library 'lib.es5.d.ts' specified in compilerOptions
../../tslibs/TS/Lib/lib.dom.d.ts
  Library 'lib.dom.d.ts' specified in compilerOptions
project2/index.ts
  Matched by default include pattern '**/*'
project2/utils.d.ts
  Matched by default include pattern '**/*'
[[90mHH:MM:SS AM[0m] Project 'project3/tsconfig.json' is out of date because output file 'project3/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspace/projects/project3/tsconfig.json'...

../../tslibs/TS/Lib/lib.es5.d.ts
  Library 'lib.es5.d.ts' specified in compilerOptions
../../tslibs/TS/Lib/lib.dom.d.ts
  Library 'lib.dom.d.ts' specified in compilerOptions
project3/index.ts
  Matched by default include pattern '**/*'
project3/utils.d.ts
  Matched by default include pattern '**/*'
[[90mHH:MM:SS AM[0m] Project 'project4/tsconfig.json' is out of date because output file 'project4/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspace/projects/project4/tsconfig.json'...

../../tslibs/TS/Lib/lib.esnext.d.ts
  Library 'lib.esnext.d.ts' specified in compilerOptions
../../tslibs/TS/Lib/lib.dom.d.ts
  Library 'lib.dom.d.ts' specified in compilerOptions
../../tslibs/TS/Lib/lib.webworker.d.ts
  Library 'lib.webworker.d.ts' specified in compilerOptions
project4/index.ts
  Matched by default include pattern '**/*'
project4/utils.d.ts
  Matched by default include pattern '**/*'
[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.

FileWatcher:: Added:: WatchInfo: /home/src/workspace/projects/project1/tsconfig.json 2000 undefined Config file /home/src/workspace/projects/project1/tsconfig.json
DirectoryWatcher:: Added:: WatchInfo: /home/src/workspace/projects/project1 1 undefined Wild card directory /home/src/workspace/projects/project1/tsconfig.json
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspace/projects/project1 1 undefined Wild card directory /home/src/workspace/projects/project1/tsconfig.json
FileWatcher:: Added:: WatchInfo: /home/src/workspace/projects/project1/core.d.ts 250 undefined Source file /home/src/workspace/projects/project1/tsconfig.json
FileWatcher:: Added:: WatchInfo: /home/src/workspace/projects/project1/file.ts 250 undefined Source file /home/src/workspace/projects/project1/tsconfig.json
FileWatcher:: Added:: WatchInfo: /home/src/workspace/projects/project1/file2.ts 250 undefined Source file /home/src/workspace/projects/project1/tsconfig.json
FileWatcher:: Added:: WatchInfo: /home/src/workspace/projects/project1/index.ts 250 undefined Source file /home/src/workspace/projects/project1/tsconfig.json
FileWatcher:: Added:: WatchInfo: /home/src/workspace/projects/project1/utils.d.ts 250 undefined Source file /home/src/workspace/projects/project1/tsconfig.json
FileWatcher:: Added:: WatchInfo: /home/src/workspace/projects/project1/typeroot1/sometype/index.d.ts 250 undefined Source file /home/src/workspace/projects/project1/tsconfig.json
FileWatcher:: Added:: WatchInfo: /home/src/workspace/projects/project1/typeroot1/sometype/package.json 2000 undefined package.json file /home/src/workspace/projects/project1/tsconfig.json
FileWatcher:: Added:: WatchInfo: /home/src/workspace/projects/project2/tsconfig.json 2000 undefined Config file /home/src/workspace/projects/project2/tsconfig.json
DirectoryWatcher:: Added:: WatchInfo: /home/src/workspace/projects/project2 1 undefined Wild card directory /home/src/workspace/projects/project2/tsconfig.json
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspace/projects/project2 1 undefined Wild card directory /home/src/workspace/projects/project2/tsconfig.json
FileWatcher:: Added:: WatchInfo: /home/src/workspace/projects/project2/index.ts 250 undefined Source file /home/src/workspace/projects/project2/tsconfig.json
FileWatcher:: Added:: WatchInfo: /home/src/workspace/projects/project2/utils.d.ts 250 undefined Source file /home/src/workspace/projects/project2/tsconfig.json
FileWatcher:: Added:: WatchInfo: /home/src/workspace/projects/project3/tsconfig.json 2000 undefined Config file /home/src/workspace/projects/project3/tsconfig.json
DirectoryWatcher:: Added:: WatchInfo: /home/src/workspace/projects/project3 1 undefined Wild card directory /home/src/workspace/projects/project3/tsconfig.json
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspace/projects/project3 1 undefined Wild card directory /home/src/workspace/projects/project3/tsconfig.json
FileWatcher:: Added:: WatchInfo: /home/src/workspace/projects/project3/index.ts 250 undefined Source file /home/src/workspace/projects/project3/tsconfig.json
FileWatcher:: Added:: WatchInfo: /home/src/workspace/projects/project3/utils.d.ts 250 undefined Source file /home/src/workspace/projects/project3/tsconfig.json
FileWatcher:: Added:: WatchInfo: /home/src/workspace/projects/project4/tsconfig.json 2000 undefined Config file /home/src/workspace/projects/project4/tsconfig.json
DirectoryWatcher:: Added:: WatchInfo: /home/src/workspace/projects/project4 1 undefined Wild card directory /home/src/workspace/projects/project4/tsconfig.json
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspace/projects/project4 1 undefined Wild card directory /home/src/workspace/projects/project4/tsconfig.json
FileWatcher:: Added:: WatchInfo: /home/src/workspace/projects/project4/index.ts 250 undefined Source file /home/src/workspace/projects/project4/tsconfig.json
FileWatcher:: Added:: WatchInfo: /home/src/workspace/projects/project4/utils.d.ts 250 undefined Source file /home/src/workspace/projects/project4/tsconfig.json


//// [/home/src/tslibs/TS/Lib/lib.es5.d.ts] *Lib*

//// [/home/src/tslibs/TS/Lib/lib.esnext.d.ts] *Lib*

//// [/home/src/workspace/projects/project1/file.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.file = void 0;
exports.file = 10;


//// [/home/src/workspace/projects/project1/file.d.ts]
export declare const file = 10;


//// [/home/src/workspace/projects/project1/file2.js]
/// <reference lib="webworker"/>
/// <reference lib="scripthost"/>
/// <reference lib="es5"/>


//// [/home/src/workspace/projects/project1/file2.d.ts]


//// [/home/src/workspace/projects/project1/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = "type1";


//// [/home/src/workspace/projects/project1/index.d.ts]
export declare const x = "type1";


//// [/home/src/workspace/projects/project1/tsconfig.tsbuildinfo]
{"fileNames":["../../../tslibs/ts/lib/lib.es5.d.ts","../../../tslibs/ts/lib/lib.dom.d.ts","../../../tslibs/ts/lib/lib.webworker.d.ts","../../../tslibs/ts/lib/lib.scripthost.d.ts","./core.d.ts","./file.ts","./file2.ts","./index.ts","./utils.d.ts","./typeroot1/sometype/index.d.ts"],"fileInfos":[{"version":"-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-8673759361-interface DOMInterface { }","affectsGlobalScope":true},{"version":"-3990185033-interface WebWorkerInterface { }","affectsGlobalScope":true},{"version":"-5403980302-interface ScriptHostInterface { }","affectsGlobalScope":true},"-15683237936-export const core = 10;",{"version":"-16628394009-export const file = 10;","signature":"-9025507999-export declare const file = 10;\n"},{"version":"-11916614574-/// <reference lib=\"webworker\"/>\n/// <reference lib=\"scripthost\"/>\n/// <reference lib=\"es5\"/>\n","signature":"5381-"},{"version":"-11532698187-export const x = \"type1\";","signature":"-5899226897-export declare const x = \"type1\";\n"},"-13729955264-export const y = 10;","-12476477079-export type TheNum = \"type1\";"],"root":[[5,10]],"options":{"composite":true},"latestChangedDtsFile":"./index.d.ts","version":"FakeTSVersion"}

//// [/home/src/workspace/projects/project1/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../tslibs/ts/lib/lib.es5.d.ts",
    "../../../tslibs/ts/lib/lib.dom.d.ts",
    "../../../tslibs/ts/lib/lib.webworker.d.ts",
    "../../../tslibs/ts/lib/lib.scripthost.d.ts",
    "./core.d.ts",
    "./file.ts",
    "./file2.ts",
    "./index.ts",
    "./utils.d.ts",
    "./typeroot1/sometype/index.d.ts"
  ],
  "fileInfos": {
    "../../../tslibs/ts/lib/lib.es5.d.ts": {
      "original": {
        "version": "-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "../../../tslibs/ts/lib/lib.dom.d.ts": {
      "original": {
        "version": "-8673759361-interface DOMInterface { }",
        "affectsGlobalScope": true
      },
      "version": "-8673759361-interface DOMInterface { }",
      "signature": "-8673759361-interface DOMInterface { }",
      "affectsGlobalScope": true
    },
    "../../../tslibs/ts/lib/lib.webworker.d.ts": {
      "original": {
        "version": "-3990185033-interface WebWorkerInterface { }",
        "affectsGlobalScope": true
      },
      "version": "-3990185033-interface WebWorkerInterface { }",
      "signature": "-3990185033-interface WebWorkerInterface { }",
      "affectsGlobalScope": true
    },
    "../../../tslibs/ts/lib/lib.scripthost.d.ts": {
      "original": {
        "version": "-5403980302-interface ScriptHostInterface { }",
        "affectsGlobalScope": true
      },
      "version": "-5403980302-interface ScriptHostInterface { }",
      "signature": "-5403980302-interface ScriptHostInterface { }",
      "affectsGlobalScope": true
    },
    "./core.d.ts": {
      "version": "-15683237936-export const core = 10;",
      "signature": "-15683237936-export const core = 10;"
    },
    "./file.ts": {
      "original": {
        "version": "-16628394009-export const file = 10;",
        "signature": "-9025507999-export declare const file = 10;\n"
      },
      "version": "-16628394009-export const file = 10;",
      "signature": "-9025507999-export declare const file = 10;\n"
    },
    "./file2.ts": {
      "original": {
        "version": "-11916614574-/// <reference lib=\"webworker\"/>\n/// <reference lib=\"scripthost\"/>\n/// <reference lib=\"es5\"/>\n",
        "signature": "5381-"
      },
      "version": "-11916614574-/// <reference lib=\"webworker\"/>\n/// <reference lib=\"scripthost\"/>\n/// <reference lib=\"es5\"/>\n",
      "signature": "5381-"
    },
    "./index.ts": {
      "original": {
        "version": "-11532698187-export const x = \"type1\";",
        "signature": "-5899226897-export declare const x = \"type1\";\n"
      },
      "version": "-11532698187-export const x = \"type1\";",
      "signature": "-5899226897-export declare const x = \"type1\";\n"
    },
    "./utils.d.ts": {
      "version": "-13729955264-export const y = 10;",
      "signature": "-13729955264-export const y = 10;"
    },
    "./typeroot1/sometype/index.d.ts": {
      "version": "-12476477079-export type TheNum = \"type1\";",
      "signature": "-12476477079-export type TheNum = \"type1\";"
    }
  },
  "root": [
    [
      [
        5,
        10
      ],
      [
        "./core.d.ts",
        "./file.ts",
        "./file2.ts",
        "./index.ts",
        "./utils.d.ts",
        "./typeroot1/sometype/index.d.ts"
      ]
    ]
  ],
  "options": {
    "composite": true
  },
  "latestChangedDtsFile": "./index.d.ts",
  "version": "FakeTSVersion",
  "size": 1596
}

//// [/home/src/workspace/projects/project2/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.y = void 0;
exports.y = 10;


//// [/home/src/workspace/projects/project2/index.d.ts]
export declare const y = 10;


//// [/home/src/workspace/projects/project2/tsconfig.tsbuildinfo]
{"fileNames":["../../../tslibs/ts/lib/lib.es5.d.ts","../../../tslibs/ts/lib/lib.dom.d.ts","./index.ts","./utils.d.ts"],"fileInfos":[{"version":"-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-8673759361-interface DOMInterface { }","affectsGlobalScope":true},{"version":"-11999455899-export const y = 10","signature":"-7152472870-export declare const y = 10;\n"},"-13729955264-export const y = 10;"],"root":[3,4],"options":{"composite":true},"latestChangedDtsFile":"./index.d.ts","version":"FakeTSVersion"}

//// [/home/src/workspace/projects/project2/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../tslibs/ts/lib/lib.es5.d.ts",
    "../../../tslibs/ts/lib/lib.dom.d.ts",
    "./index.ts",
    "./utils.d.ts"
  ],
  "fileInfos": {
    "../../../tslibs/ts/lib/lib.es5.d.ts": {
      "original": {
        "version": "-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "../../../tslibs/ts/lib/lib.dom.d.ts": {
      "original": {
        "version": "-8673759361-interface DOMInterface { }",
        "affectsGlobalScope": true
      },
      "version": "-8673759361-interface DOMInterface { }",
      "signature": "-8673759361-interface DOMInterface { }",
      "affectsGlobalScope": true
    },
    "./index.ts": {
      "original": {
        "version": "-11999455899-export const y = 10",
        "signature": "-7152472870-export declare const y = 10;\n"
      },
      "version": "-11999455899-export const y = 10",
      "signature": "-7152472870-export declare const y = 10;\n"
    },
    "./utils.d.ts": {
      "version": "-13729955264-export const y = 10;",
      "signature": "-13729955264-export const y = 10;"
    }
  },
  "root": [
    [
      3,
      "./index.ts"
    ],
    [
      4,
      "./utils.d.ts"
    ]
  ],
  "options": {
    "composite": true
  },
  "latestChangedDtsFile": "./index.d.ts",
  "version": "FakeTSVersion",
  "size": 897
}

//// [/home/src/workspace/projects/project3/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.z = void 0;
exports.z = 10;


//// [/home/src/workspace/projects/project3/index.d.ts]
export declare const z = 10;


//// [/home/src/workspace/projects/project3/tsconfig.tsbuildinfo]
{"fileNames":["../../../tslibs/ts/lib/lib.es5.d.ts","../../../tslibs/ts/lib/lib.dom.d.ts","./index.ts","./utils.d.ts"],"fileInfos":[{"version":"-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-8673759361-interface DOMInterface { }","affectsGlobalScope":true},{"version":"-11960320506-export const z = 10","signature":"-7483702853-export declare const z = 10;\n"},"-13729955264-export const y = 10;"],"root":[3,4],"options":{"composite":true},"latestChangedDtsFile":"./index.d.ts","version":"FakeTSVersion"}

//// [/home/src/workspace/projects/project3/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../tslibs/ts/lib/lib.es5.d.ts",
    "../../../tslibs/ts/lib/lib.dom.d.ts",
    "./index.ts",
    "./utils.d.ts"
  ],
  "fileInfos": {
    "../../../tslibs/ts/lib/lib.es5.d.ts": {
      "original": {
        "version": "-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "../../../tslibs/ts/lib/lib.dom.d.ts": {
      "original": {
        "version": "-8673759361-interface DOMInterface { }",
        "affectsGlobalScope": true
      },
      "version": "-8673759361-interface DOMInterface { }",
      "signature": "-8673759361-interface DOMInterface { }",
      "affectsGlobalScope": true
    },
    "./index.ts": {
      "original": {
        "version": "-11960320506-export const z = 10",
        "signature": "-7483702853-export declare const z = 10;\n"
      },
      "version": "-11960320506-export const z = 10",
      "signature": "-7483702853-export declare const z = 10;\n"
    },
    "./utils.d.ts": {
      "version": "-13729955264-export const y = 10;",
      "signature": "-13729955264-export const y = 10;"
    }
  },
  "root": [
    [
      3,
      "./index.ts"
    ],
    [
      4,
      "./utils.d.ts"
    ]
  ],
  "options": {
    "composite": true
  },
  "latestChangedDtsFile": "./index.d.ts",
  "version": "FakeTSVersion",
  "size": 897
}

//// [/home/src/workspace/projects/project4/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.z = void 0;
exports.z = 10;


//// [/home/src/workspace/projects/project4/index.d.ts]
export declare const z = 10;


//// [/home/src/workspace/projects/project4/tsconfig.tsbuildinfo]
{"fileNames":["../../../tslibs/ts/lib/lib.esnext.d.ts","../../../tslibs/ts/lib/lib.dom.d.ts","../../../tslibs/ts/lib/lib.webworker.d.ts","./index.ts","./utils.d.ts"],"fileInfos":[{"version":"-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-8673759361-interface DOMInterface { }","affectsGlobalScope":true},{"version":"-3990185033-interface WebWorkerInterface { }","affectsGlobalScope":true},{"version":"-11960320506-export const z = 10","signature":"-7483702853-export declare const z = 10;\n"},"-13729955264-export const y = 10;"],"root":[4,5],"options":{"composite":true},"latestChangedDtsFile":"./index.d.ts","version":"FakeTSVersion"}

//// [/home/src/workspace/projects/project4/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../tslibs/ts/lib/lib.esnext.d.ts",
    "../../../tslibs/ts/lib/lib.dom.d.ts",
    "../../../tslibs/ts/lib/lib.webworker.d.ts",
    "./index.ts",
    "./utils.d.ts"
  ],
  "fileInfos": {
    "../../../tslibs/ts/lib/lib.esnext.d.ts": {
      "original": {
        "version": "-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "../../../tslibs/ts/lib/lib.dom.d.ts": {
      "original": {
        "version": "-8673759361-interface DOMInterface { }",
        "affectsGlobalScope": true
      },
      "version": "-8673759361-interface DOMInterface { }",
      "signature": "-8673759361-interface DOMInterface { }",
      "affectsGlobalScope": true
    },
    "../../../tslibs/ts/lib/lib.webworker.d.ts": {
      "original": {
        "version": "-3990185033-interface WebWorkerInterface { }",
        "affectsGlobalScope": true
      },
      "version": "-3990185033-interface WebWorkerInterface { }",
      "signature": "-3990185033-interface WebWorkerInterface { }",
      "affectsGlobalScope": true
    },
    "./index.ts": {
      "original": {
        "version": "-11960320506-export const z = 10",
        "signature": "-7483702853-export declare const z = 10;\n"
      },
      "version": "-11960320506-export const z = 10",
      "signature": "-7483702853-export declare const z = 10;\n"
    },
    "./utils.d.ts": {
      "version": "-13729955264-export const y = 10;",
      "signature": "-13729955264-export const y = 10;"
    }
  },
  "root": [
    [
      4,
      "./index.ts"
    ],
    [
      5,
      "./utils.d.ts"
    ]
  ],
  "options": {
    "composite": true
  },
  "latestChangedDtsFile": "./index.d.ts",
  "version": "FakeTSVersion",
  "size": 1029
}


PolledWatches::
/home/src/workspace/projects/project1/typeroot1/sometype/package.json: *new*
  {"pollingInterval":2000}

FsWatches::
/home/src/workspace/projects/project1/core.d.ts: *new*
  {}
/home/src/workspace/projects/project1/file.ts: *new*
  {}
/home/src/workspace/projects/project1/file2.ts: *new*
  {}
/home/src/workspace/projects/project1/index.ts: *new*
  {}
/home/src/workspace/projects/project1/tsconfig.json: *new*
  {}
/home/src/workspace/projects/project1/typeroot1/sometype/index.d.ts: *new*
  {}
/home/src/workspace/projects/project1/utils.d.ts: *new*
  {}
/home/src/workspace/projects/project2/index.ts: *new*
  {}
/home/src/workspace/projects/project2/tsconfig.json: *new*
  {}
/home/src/workspace/projects/project2/utils.d.ts: *new*
  {}
/home/src/workspace/projects/project3/index.ts: *new*
  {}
/home/src/workspace/projects/project3/tsconfig.json: *new*
  {}
/home/src/workspace/projects/project3/utils.d.ts: *new*
  {}
/home/src/workspace/projects/project4/index.ts: *new*
  {}
/home/src/workspace/projects/project4/tsconfig.json: *new*
  {}
/home/src/workspace/projects/project4/utils.d.ts: *new*
  {}

FsWatchesRecursive::
/home/src/workspace/projects/project1: *new*
  {}
/home/src/workspace/projects/project2: *new*
  {}
/home/src/workspace/projects/project3: *new*
  {}
/home/src/workspace/projects/project4: *new*
  {}

Program root files: [
  "/home/src/workspace/projects/project1/core.d.ts",
  "/home/src/workspace/projects/project1/file.ts",
  "/home/src/workspace/projects/project1/file2.ts",
  "/home/src/workspace/projects/project1/index.ts",
  "/home/src/workspace/projects/project1/utils.d.ts",
  "/home/src/workspace/projects/project1/typeroot1/sometype/index.d.ts"
]
Program options: {
  "composite": true,
  "typeRoots": [
    "/home/src/workspace/projects/project1/typeroot1"
  ],
  "lib": [
    "lib.es5.d.ts",
    "lib.dom.d.ts"
  ],
  "traceResolution": true,
  "watch": true,
  "explainFiles": true,
  "extendedDiagnostics": true,
  "tscBuild": true,
  "configFilePath": "/home/src/workspace/projects/project1/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.es5.d.ts
/home/src/tslibs/TS/Lib/lib.dom.d.ts
/home/src/tslibs/TS/Lib/lib.webworker.d.ts
/home/src/tslibs/TS/Lib/lib.scripthost.d.ts
/home/src/workspace/projects/project1/core.d.ts
/home/src/workspace/projects/project1/file.ts
/home/src/workspace/projects/project1/file2.ts
/home/src/workspace/projects/project1/index.ts
/home/src/workspace/projects/project1/utils.d.ts
/home/src/workspace/projects/project1/typeroot1/sometype/index.d.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.es5.d.ts
/home/src/tslibs/TS/Lib/lib.dom.d.ts
/home/src/tslibs/TS/Lib/lib.webworker.d.ts
/home/src/tslibs/TS/Lib/lib.scripthost.d.ts
/home/src/workspace/projects/project1/core.d.ts
/home/src/workspace/projects/project1/file.ts
/home/src/workspace/projects/project1/file2.ts
/home/src/workspace/projects/project1/index.ts
/home/src/workspace/projects/project1/utils.d.ts
/home/src/workspace/projects/project1/typeroot1/sometype/index.d.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.es5.d.ts (used version)
/home/src/workspace/projects/project1/core.d.ts (used version)
/home/src/workspace/projects/project1/file.ts (computed .d.ts during emit)
/home/src/workspace/projects/project1/file2.ts (computed .d.ts during emit)
/home/src/workspace/projects/project1/index.ts (computed .d.ts during emit)
/home/src/workspace/projects/project1/utils.d.ts (used version)
/home/src/workspace/projects/project1/typeroot1/sometype/index.d.ts (used version)
/home/src/tslibs/ts/lib/lib.dom.d.ts (used version)
/home/src/tslibs/ts/lib/lib.webworker.d.ts (used version)
/home/src/tslibs/ts/lib/lib.scripthost.d.ts (used version)

Program root files: [
  "/home/src/workspace/projects/project2/index.ts",
  "/home/src/workspace/projects/project2/utils.d.ts"
]
Program options: {
  "composite": true,
  "lib": [
    "lib.es5.d.ts",
    "lib.dom.d.ts"
  ],
  "traceResolution": true,
  "watch": true,
  "explainFiles": true,
  "extendedDiagnostics": true,
  "tscBuild": true,
  "configFilePath": "/home/src/workspace/projects/project2/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.es5.d.ts
/home/src/tslibs/TS/Lib/lib.dom.d.ts
/home/src/workspace/projects/project2/index.ts
/home/src/workspace/projects/project2/utils.d.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.es5.d.ts
/home/src/tslibs/TS/Lib/lib.dom.d.ts
/home/src/workspace/projects/project2/index.ts
/home/src/workspace/projects/project2/utils.d.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.es5.d.ts (used version)
/home/src/workspace/projects/project2/index.ts (computed .d.ts during emit)
/home/src/workspace/projects/project2/utils.d.ts (used version)
/home/src/tslibs/ts/lib/lib.dom.d.ts (used version)

Program root files: [
  "/home/src/workspace/projects/project3/index.ts",
  "/home/src/workspace/projects/project3/utils.d.ts"
]
Program options: {
  "composite": true,
  "lib": [
    "lib.es5.d.ts",
    "lib.dom.d.ts"
  ],
  "traceResolution": true,
  "watch": true,
  "explainFiles": true,
  "extendedDiagnostics": true,
  "tscBuild": true,
  "configFilePath": "/home/src/workspace/projects/project3/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.es5.d.ts
/home/src/tslibs/TS/Lib/lib.dom.d.ts
/home/src/workspace/projects/project3/index.ts
/home/src/workspace/projects/project3/utils.d.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.es5.d.ts
/home/src/tslibs/TS/Lib/lib.dom.d.ts
/home/src/workspace/projects/project3/index.ts
/home/src/workspace/projects/project3/utils.d.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.es5.d.ts (used version)
/home/src/workspace/projects/project3/index.ts (computed .d.ts during emit)
/home/src/workspace/projects/project3/utils.d.ts (used version)
/home/src/tslibs/ts/lib/lib.dom.d.ts (used version)

Program root files: [
  "/home/src/workspace/projects/project4/index.ts",
  "/home/src/workspace/projects/project4/utils.d.ts"
]
Program options: {
  "composite": true,
  "lib": [
    "lib.esnext.d.ts",
    "lib.dom.d.ts",
    "lib.webworker.d.ts"
  ],
  "traceResolution": true,
  "watch": true,
  "explainFiles": true,
  "extendedDiagnostics": true,
  "tscBuild": true,
  "configFilePath": "/home/src/workspace/projects/project4/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.esnext.d.ts
/home/src/tslibs/TS/Lib/lib.dom.d.ts
/home/src/tslibs/TS/Lib/lib.webworker.d.ts
/home/src/workspace/projects/project4/index.ts
/home/src/workspace/projects/project4/utils.d.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.esnext.d.ts
/home/src/tslibs/TS/Lib/lib.dom.d.ts
/home/src/tslibs/TS/Lib/lib.webworker.d.ts
/home/src/workspace/projects/project4/index.ts
/home/src/workspace/projects/project4/utils.d.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.esnext.d.ts (used version)
/home/src/workspace/projects/project4/index.ts (computed .d.ts during emit)
/home/src/workspace/projects/project4/utils.d.ts (used version)
/home/src/tslibs/ts/lib/lib.dom.d.ts (used version)
/home/src/tslibs/ts/lib/lib.webworker.d.ts (used version)

exitCode:: ExitStatus.undefined
