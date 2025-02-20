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


/home/src/tslibs/TS/Lib/tsc.js -w -p project1 --explainFiles --extendedDiagnostics
Output::
[[90mHH:MM:SS AM[0m] Starting compilation in watch mode...

Current directory: /home/src/workspace/projects CaseSensitiveFileNames: false
FileWatcher:: Added:: WatchInfo: /home/src/workspace/projects/project1/tsconfig.json 2000 undefined Config file
Synchronizing program
CreatingProgramWith::
  roots: ["/home/src/workspace/projects/project1/core.d.ts","/home/src/workspace/projects/project1/file.ts","/home/src/workspace/projects/project1/file2.ts","/home/src/workspace/projects/project1/index.ts","/home/src/workspace/projects/project1/utils.d.ts","/home/src/workspace/projects/project1/typeroot1/sometype/index.d.ts"]
  options: {"composite":true,"typeRoots":["/home/src/workspace/projects/project1/typeroot1"],"lib":["lib.es5.d.ts","lib.dom.d.ts"],"traceResolution":true,"watch":true,"project":"/home/src/workspace/projects/project1","explainFiles":true,"extendedDiagnostics":true,"configFilePath":"/home/src/workspace/projects/project1/tsconfig.json"}
FileWatcher:: Added:: WatchInfo: /home/src/workspace/projects/project1/core.d.ts 250 undefined Source file
FileWatcher:: Added:: WatchInfo: /home/src/workspace/projects/project1/file.ts 250 undefined Source file
FileWatcher:: Added:: WatchInfo: /home/src/workspace/projects/project1/file2.ts 250 undefined Source file
======== Resolving module '@typescript/lib-webworker' from '/home/src/workspace/projects/project1/__lib_node_modules_lookup_lib.webworker.d.ts__.ts'. ========
Explicitly specified module resolution kind: 'Node10'.
Loading module '@typescript/lib-webworker' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Directory '/home/src/workspace/projects/project1/node_modules' does not exist, skipping all lookups in it.
Scoped package detected, looking in 'typescript__lib-webworker'
File '/home/src/workspace/projects/node_modules/@typescript/lib-webworker.ts' does not exist.
File '/home/src/workspace/projects/node_modules/@typescript/lib-webworker.tsx' does not exist.
File '/home/src/workspace/projects/node_modules/@typescript/lib-webworker.d.ts' does not exist.
Directory '/home/src/workspace/projects/node_modules/@types' does not exist, skipping all lookups in it.
Scoped package detected, looking in 'typescript__lib-webworker'
Directory '/home/src/workspace/node_modules' does not exist, skipping all lookups in it.
Scoped package detected, looking in 'typescript__lib-webworker'
Directory '/home/src/node_modules' does not exist, skipping all lookups in it.
Scoped package detected, looking in 'typescript__lib-webworker'
Directory '/home/node_modules' does not exist, skipping all lookups in it.
Scoped package detected, looking in 'typescript__lib-webworker'
Directory '/node_modules' does not exist, skipping all lookups in it.
Scoped package detected, looking in 'typescript__lib-webworker'
Loading module '@typescript/lib-webworker' from 'node_modules' folder, target file types: JavaScript.
Searching all ancestor node_modules directories for fallback extensions: JavaScript.
Directory '/home/src/workspace/projects/project1/node_modules' does not exist, skipping all lookups in it.
File '/home/src/workspace/projects/node_modules/@typescript/lib-webworker.js' does not exist.
File '/home/src/workspace/projects/node_modules/@typescript/lib-webworker.jsx' does not exist.
Directory '/home/src/workspace/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/node_modules' does not exist, skipping all lookups in it.
Directory '/home/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
======== Module name '@typescript/lib-webworker' was not resolved. ========
DirectoryWatcher:: Added:: WatchInfo: /home/src/workspace/projects/project1/node_modules 1 undefined Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspace/projects/project1/node_modules 1 undefined Failed Lookup Locations
DirectoryWatcher:: Added:: WatchInfo: /home/src/workspace/projects/node_modules 1 undefined Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspace/projects/node_modules 1 undefined Failed Lookup Locations
DirectoryWatcher:: Added:: WatchInfo: /home/src/workspace/node_modules 1 undefined Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspace/node_modules 1 undefined Failed Lookup Locations
FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.webworker.d.ts 250 undefined Source file
======== Resolving module '@typescript/lib-scripthost' from '/home/src/workspace/projects/project1/__lib_node_modules_lookup_lib.scripthost.d.ts__.ts'. ========
Explicitly specified module resolution kind: 'Node10'.
Loading module '@typescript/lib-scripthost' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Directory '/home/src/workspace/projects/project1/node_modules' does not exist, skipping all lookups in it.
Scoped package detected, looking in 'typescript__lib-scripthost'
File '/home/src/workspace/projects/node_modules/@typescript/lib-scripthost.ts' does not exist.
File '/home/src/workspace/projects/node_modules/@typescript/lib-scripthost.tsx' does not exist.
File '/home/src/workspace/projects/node_modules/@typescript/lib-scripthost.d.ts' does not exist.
Directory '/home/src/workspace/projects/node_modules/@types' does not exist, skipping all lookups in it.
Scoped package detected, looking in 'typescript__lib-scripthost'
Directory '/home/src/workspace/node_modules' does not exist, skipping all lookups in it.
Scoped package detected, looking in 'typescript__lib-scripthost'
Directory '/home/src/node_modules' does not exist, skipping all lookups in it.
Scoped package detected, looking in 'typescript__lib-scripthost'
Directory '/home/node_modules' does not exist, skipping all lookups in it.
Scoped package detected, looking in 'typescript__lib-scripthost'
Directory '/node_modules' does not exist, skipping all lookups in it.
Scoped package detected, looking in 'typescript__lib-scripthost'
Loading module '@typescript/lib-scripthost' from 'node_modules' folder, target file types: JavaScript.
Searching all ancestor node_modules directories for fallback extensions: JavaScript.
Directory '/home/src/workspace/projects/project1/node_modules' does not exist, skipping all lookups in it.
File '/home/src/workspace/projects/node_modules/@typescript/lib-scripthost.js' does not exist.
File '/home/src/workspace/projects/node_modules/@typescript/lib-scripthost.jsx' does not exist.
Directory '/home/src/workspace/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/node_modules' does not exist, skipping all lookups in it.
Directory '/home/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
======== Module name '@typescript/lib-scripthost' was not resolved. ========
FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.scripthost.d.ts 250 undefined Source file
======== Resolving module '@typescript/lib-es5' from '/home/src/workspace/projects/project1/__lib_node_modules_lookup_lib.es5.d.ts__.ts'. ========
Explicitly specified module resolution kind: 'Node10'.
Loading module '@typescript/lib-es5' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Directory '/home/src/workspace/projects/project1/node_modules' does not exist, skipping all lookups in it.
Scoped package detected, looking in 'typescript__lib-es5'
File '/home/src/workspace/projects/node_modules/@typescript/lib-es5.ts' does not exist.
File '/home/src/workspace/projects/node_modules/@typescript/lib-es5.tsx' does not exist.
File '/home/src/workspace/projects/node_modules/@typescript/lib-es5.d.ts' does not exist.
Directory '/home/src/workspace/projects/node_modules/@types' does not exist, skipping all lookups in it.
Scoped package detected, looking in 'typescript__lib-es5'
Directory '/home/src/workspace/node_modules' does not exist, skipping all lookups in it.
Scoped package detected, looking in 'typescript__lib-es5'
Directory '/home/src/node_modules' does not exist, skipping all lookups in it.
Scoped package detected, looking in 'typescript__lib-es5'
Directory '/home/node_modules' does not exist, skipping all lookups in it.
Scoped package detected, looking in 'typescript__lib-es5'
Directory '/node_modules' does not exist, skipping all lookups in it.
Scoped package detected, looking in 'typescript__lib-es5'
Loading module '@typescript/lib-es5' from 'node_modules' folder, target file types: JavaScript.
Searching all ancestor node_modules directories for fallback extensions: JavaScript.
Directory '/home/src/workspace/projects/project1/node_modules' does not exist, skipping all lookups in it.
File '/home/src/workspace/projects/node_modules/@typescript/lib-es5.js' does not exist.
File '/home/src/workspace/projects/node_modules/@typescript/lib-es5.jsx' does not exist.
Directory '/home/src/workspace/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/node_modules' does not exist, skipping all lookups in it.
Directory '/home/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
======== Module name '@typescript/lib-es5' was not resolved. ========
FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.es5.d.ts 250 undefined Source file
FileWatcher:: Added:: WatchInfo: /home/src/workspace/projects/project1/index.ts 250 undefined Source file
FileWatcher:: Added:: WatchInfo: /home/src/workspace/projects/project1/utils.d.ts 250 undefined Source file
FileWatcher:: Added:: WatchInfo: /home/src/workspace/projects/project1/typeroot1/sometype/index.d.ts 250 undefined Source file
======== Resolving type reference directive 'sometype', containing file '/home/src/workspace/projects/project1/__inferred type names__.ts', root directory '/home/src/workspace/projects/project1/typeroot1'. ========
Resolving with primary search path '/home/src/workspace/projects/project1/typeroot1'.
File '/home/src/workspace/projects/project1/typeroot1/sometype.d.ts' does not exist.
File '/home/src/workspace/projects/project1/typeroot1/sometype/package.json' does not exist.
File '/home/src/workspace/projects/project1/typeroot1/sometype/index.d.ts' exists - use it as a name resolution result.
Resolving real path for '/home/src/workspace/projects/project1/typeroot1/sometype/index.d.ts', result '/home/src/workspace/projects/project1/typeroot1/sometype/index.d.ts'.
======== Type reference directive 'sometype' was successfully resolved to '/home/src/workspace/projects/project1/typeroot1/sometype/index.d.ts', primary: true. ========
DirectoryWatcher:: Added:: WatchInfo: /home/src/workspace/projects/project1/typeroot1 1 undefined Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspace/projects/project1/typeroot1 1 undefined Failed Lookup Locations
======== Resolving module '@typescript/lib-dom' from '/home/src/workspace/projects/project1/__lib_node_modules_lookup_lib.dom.d.ts__.ts'. ========
Explicitly specified module resolution kind: 'Node10'.
Loading module '@typescript/lib-dom' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Directory '/home/src/workspace/projects/project1/node_modules' does not exist, skipping all lookups in it.
Scoped package detected, looking in 'typescript__lib-dom'
File '/home/src/workspace/projects/node_modules/@typescript/lib-dom.ts' does not exist.
File '/home/src/workspace/projects/node_modules/@typescript/lib-dom.tsx' does not exist.
File '/home/src/workspace/projects/node_modules/@typescript/lib-dom.d.ts' does not exist.
Directory '/home/src/workspace/projects/node_modules/@types' does not exist, skipping all lookups in it.
Scoped package detected, looking in 'typescript__lib-dom'
Directory '/home/src/workspace/node_modules' does not exist, skipping all lookups in it.
Scoped package detected, looking in 'typescript__lib-dom'
Directory '/home/src/node_modules' does not exist, skipping all lookups in it.
Scoped package detected, looking in 'typescript__lib-dom'
Directory '/home/node_modules' does not exist, skipping all lookups in it.
Scoped package detected, looking in 'typescript__lib-dom'
Directory '/node_modules' does not exist, skipping all lookups in it.
Scoped package detected, looking in 'typescript__lib-dom'
Loading module '@typescript/lib-dom' from 'node_modules' folder, target file types: JavaScript.
Searching all ancestor node_modules directories for fallback extensions: JavaScript.
Directory '/home/src/workspace/projects/project1/node_modules' does not exist, skipping all lookups in it.
File '/home/src/workspace/projects/node_modules/@typescript/lib-dom.js' does not exist.
File '/home/src/workspace/projects/node_modules/@typescript/lib-dom.jsx' does not exist.
Directory '/home/src/workspace/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/node_modules' does not exist, skipping all lookups in it.
Directory '/home/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
======== Module name '@typescript/lib-dom' was not resolved. ========
FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.dom.d.ts 250 undefined Source file
DirectoryWatcher:: Added:: WatchInfo: /home/src/workspace/projects/project1/typeroot1 1 undefined Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspace/projects/project1/typeroot1 1 undefined Type roots
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
[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.

DirectoryWatcher:: Added:: WatchInfo: /home/src/workspace/projects/project1 1 undefined Wild card directory
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspace/projects/project1 1 undefined Wild card directory


//// [/home/src/tslibs/TS/Lib/lib.es5.d.ts] *Lib*

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
{"fileNames":["../../../tslibs/ts/lib/lib.es5.d.ts","../../../tslibs/ts/lib/lib.dom.d.ts","../../../tslibs/ts/lib/lib.webworker.d.ts","../../../tslibs/ts/lib/lib.scripthost.d.ts","./core.d.ts","./file.ts","./file2.ts","./index.ts","./utils.d.ts","./typeroot1/sometype/index.d.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-8673759361-interface DOMInterface { }","affectsGlobalScope":true},{"version":"-3990185033-interface WebWorkerInterface { }","affectsGlobalScope":true},{"version":"-5403980302-interface ScriptHostInterface { }","affectsGlobalScope":true},"-15683237936-export const core = 10;",{"version":"-16628394009-export const file = 10;","signature":"-9025507999-export declare const file = 10;\n"},{"version":"-11916614574-/// <reference lib=\"webworker\"/>\n/// <reference lib=\"scripthost\"/>\n/// <reference lib=\"es5\"/>\n","signature":"5381-"},{"version":"-11532698187-export const x = \"type1\";","signature":"-5899226897-export declare const x = \"type1\";\n"},"-13729955264-export const y = 10;","-12476477079-export type TheNum = \"type1\";"],"root":[[5,10]],"options":{"composite":true},"latestChangedDtsFile":"./index.d.ts","version":"FakeTSVersion"}

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
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
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
  "size": 1636
}


PolledWatches::
/home/src/workspace/node_modules: *new*
  {"pollingInterval":500}
/home/src/workspace/projects/project1/node_modules: *new*
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.dom.d.ts: *new*
  {}
/home/src/tslibs/TS/Lib/lib.es5.d.ts: *new*
  {}
/home/src/tslibs/TS/Lib/lib.scripthost.d.ts: *new*
  {}
/home/src/tslibs/TS/Lib/lib.webworker.d.ts: *new*
  {}
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

FsWatchesRecursive::
/home/src/workspace/projects/node_modules: *new*
  {}
/home/src/workspace/projects/project1: *new*
  {}
/home/src/workspace/projects/project1/typeroot1: *new*
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
  "project": "/home/src/workspace/projects/project1",
  "explainFiles": true,
  "extendedDiagnostics": true,
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
/home/src/tslibs/ts/lib/lib.webworker.d.ts (used version)
/home/src/tslibs/ts/lib/lib.scripthost.d.ts (used version)
/home/src/workspace/projects/project1/core.d.ts (used version)
/home/src/workspace/projects/project1/file.ts (computed .d.ts during emit)
/home/src/workspace/projects/project1/file2.ts (computed .d.ts during emit)
/home/src/workspace/projects/project1/index.ts (computed .d.ts during emit)
/home/src/workspace/projects/project1/utils.d.ts (used version)
/home/src/workspace/projects/project1/typeroot1/sometype/index.d.ts (used version)
/home/src/tslibs/ts/lib/lib.dom.d.ts (used version)

exitCode:: ExitStatus.undefined

Change:: write redirect file dom

Input::
//// [/home/src/workspace/projects/node_modules/@typescript/lib-dom/index.d.ts]
interface DOMInterface { }


Output::
DirectoryWatcher:: Triggered with /home/src/workspace/projects/node_modules/@typescript/lib-dom :: WatchInfo: /home/src/workspace/projects/node_modules 1 undefined Failed Lookup Locations
Scheduling invalidateFailedLookup
Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/workspace/projects/node_modules/@typescript/lib-dom :: WatchInfo: /home/src/workspace/projects/node_modules 1 undefined Failed Lookup Locations
DirectoryWatcher:: Triggered with /home/src/workspace/projects/node_modules/@typescript/lib-dom/index.d.ts :: WatchInfo: /home/src/workspace/projects/node_modules 1 undefined Failed Lookup Locations
Scheduling invalidateFailedLookup, Cancelled earlier one
Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/workspace/projects/node_modules/@typescript/lib-dom/index.d.ts :: WatchInfo: /home/src/workspace/projects/node_modules 1 undefined Failed Lookup Locations


Timeout callback:: count: 1
2: timerToInvalidateFailedLookupResolutions *new*

Before running Timeout callback:: count: 1
2: timerToInvalidateFailedLookupResolutions

Host is moving to new time
After running Timeout callback:: count: 1
Output::
Scheduling update



Timeout callback:: count: 1
3: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
3: timerToUpdateProgram

Host is moving to new time
After running Timeout callback:: count: 0
Output::
Synchronizing program
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

CreatingProgramWith::
  roots: ["/home/src/workspace/projects/project1/core.d.ts","/home/src/workspace/projects/project1/file.ts","/home/src/workspace/projects/project1/file2.ts","/home/src/workspace/projects/project1/index.ts","/home/src/workspace/projects/project1/utils.d.ts","/home/src/workspace/projects/project1/typeroot1/sometype/index.d.ts"]
  options: {"composite":true,"typeRoots":["/home/src/workspace/projects/project1/typeroot1"],"lib":["lib.es5.d.ts","lib.dom.d.ts"],"traceResolution":true,"watch":true,"project":"/home/src/workspace/projects/project1","explainFiles":true,"extendedDiagnostics":true,"configFilePath":"/home/src/workspace/projects/project1/tsconfig.json"}
Reusing resolution of module '@typescript/lib-webworker' from '/home/src/workspace/projects/project1/__lib_node_modules_lookup_lib.webworker.d.ts__.ts' of old program, it was not resolved.
Reusing resolution of module '@typescript/lib-scripthost' from '/home/src/workspace/projects/project1/__lib_node_modules_lookup_lib.scripthost.d.ts__.ts' of old program, it was not resolved.
Reusing resolution of module '@typescript/lib-es5' from '/home/src/workspace/projects/project1/__lib_node_modules_lookup_lib.es5.d.ts__.ts' of old program, it was not resolved.
======== Resolving module '@typescript/lib-dom' from '/home/src/workspace/projects/project1/__lib_node_modules_lookup_lib.dom.d.ts__.ts'. ========
Explicitly specified module resolution kind: 'Node10'.
Loading module '@typescript/lib-dom' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Directory '/home/src/workspace/projects/project1/node_modules' does not exist, skipping all lookups in it.
Scoped package detected, looking in 'typescript__lib-dom'
File '/home/src/workspace/projects/node_modules/@typescript/lib-dom/package.json' does not exist.
File '/home/src/workspace/projects/node_modules/@typescript/lib-dom.ts' does not exist.
File '/home/src/workspace/projects/node_modules/@typescript/lib-dom.tsx' does not exist.
File '/home/src/workspace/projects/node_modules/@typescript/lib-dom.d.ts' does not exist.
File '/home/src/workspace/projects/node_modules/@typescript/lib-dom/index.ts' does not exist.
File '/home/src/workspace/projects/node_modules/@typescript/lib-dom/index.tsx' does not exist.
File '/home/src/workspace/projects/node_modules/@typescript/lib-dom/index.d.ts' exists - use it as a name resolution result.
Resolving real path for '/home/src/workspace/projects/node_modules/@typescript/lib-dom/index.d.ts', result '/home/src/workspace/projects/node_modules/@typescript/lib-dom/index.d.ts'.
======== Module name '@typescript/lib-dom' was successfully resolved to '/home/src/workspace/projects/node_modules/@typescript/lib-dom/index.d.ts'. ========
Reusing resolution of type reference directive 'sometype' from '/home/src/workspace/projects/project1/__inferred type names__.ts' of old program, it was successfully resolved to '/home/src/workspace/projects/project1/typeroot1/sometype/index.d.ts'.
File '/home/src/workspace/projects/node_modules/@typescript/lib-dom/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspace/projects/node_modules/@typescript/package.json' does not exist.
File '/home/src/workspace/projects/node_modules/package.json' does not exist.
File '/home/src/workspace/projects/package.json' does not exist.
File '/home/src/workspace/package.json' does not exist.
File '/home/src/package.json' does not exist.
File '/home/package.json' does not exist.
File '/package.json' does not exist.
FileWatcher:: Added:: WatchInfo: /home/src/workspace/projects/node_modules/@typescript/lib-dom/index.d.ts 250 undefined Source file
FileWatcher:: Close:: WatchInfo: /home/src/tslibs/TS/Lib/lib.dom.d.ts 250 undefined Source file
FileWatcher:: Added:: WatchInfo: /home/src/workspace/projects/node_modules/@typescript/lib-dom/package.json 2000 undefined File location affecting resolution
FileWatcher:: Added:: WatchInfo: /home/src/workspace/projects/node_modules/@typescript/package.json 2000 undefined File location affecting resolution
FileWatcher:: Added:: WatchInfo: /home/src/workspace/projects/node_modules/package.json 2000 undefined File location affecting resolution
FileWatcher:: Added:: WatchInfo: /home/src/workspace/projects/package.json 2000 undefined File location affecting resolution
FileWatcher:: Added:: WatchInfo: /home/src/workspace/package.json 2000 undefined File location affecting resolution
../../tslibs/TS/Lib/lib.es5.d.ts
  Library referenced via 'es5' from file 'project1/file2.ts'
  Library 'lib.es5.d.ts' specified in compilerOptions
../../tslibs/TS/Lib/lib.webworker.d.ts
  Library referenced via 'webworker' from file 'project1/file2.ts'
../../tslibs/TS/Lib/lib.scripthost.d.ts
  Library referenced via 'scripthost' from file 'project1/file2.ts'
node_modules/@typescript/lib-dom/index.d.ts
  Library 'lib.dom.d.ts' specified in compilerOptions
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
[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/home/src/workspace/projects/project1/file.js] file written with same contents
//// [/home/src/workspace/projects/project1/file2.js] file written with same contents
//// [/home/src/workspace/projects/project1/index.js] file written with same contents
//// [/home/src/workspace/projects/project1/tsconfig.tsbuildinfo]
{"fileNames":["../../../tslibs/ts/lib/lib.es5.d.ts","../../../tslibs/ts/lib/lib.webworker.d.ts","../../../tslibs/ts/lib/lib.scripthost.d.ts","../node_modules/@typescript/lib-dom/index.d.ts","./core.d.ts","./file.ts","./file2.ts","./index.ts","./utils.d.ts","./typeroot1/sometype/index.d.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-3990185033-interface WebWorkerInterface { }","affectsGlobalScope":true},{"version":"-5403980302-interface ScriptHostInterface { }","affectsGlobalScope":true},{"version":"-8673759361-interface DOMInterface { }","affectsGlobalScope":true,"impliedFormat":1},"-15683237936-export const core = 10;",{"version":"-16628394009-export const file = 10;","signature":"-9025507999-export declare const file = 10;\n"},{"version":"-11916614574-/// <reference lib=\"webworker\"/>\n/// <reference lib=\"scripthost\"/>\n/// <reference lib=\"es5\"/>\n","signature":"5381-"},{"version":"-11532698187-export const x = \"type1\";","signature":"-5899226897-export declare const x = \"type1\";\n"},"-13729955264-export const y = 10;","-12476477079-export type TheNum = \"type1\";"],"root":[[5,10]],"options":{"composite":true},"latestChangedDtsFile":"./index.d.ts","version":"FakeTSVersion"}

//// [/home/src/workspace/projects/project1/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../tslibs/ts/lib/lib.es5.d.ts",
    "../../../tslibs/ts/lib/lib.webworker.d.ts",
    "../../../tslibs/ts/lib/lib.scripthost.d.ts",
    "../node_modules/@typescript/lib-dom/index.d.ts",
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
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
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
    "../node_modules/@typescript/lib-dom/index.d.ts": {
      "original": {
        "version": "-8673759361-interface DOMInterface { }",
        "affectsGlobalScope": true,
        "impliedFormat": 1
      },
      "version": "-8673759361-interface DOMInterface { }",
      "signature": "-8673759361-interface DOMInterface { }",
      "affectsGlobalScope": true,
      "impliedFormat": "commonjs"
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
  "size": 1665
}


PolledWatches::
/home/src/workspace/node_modules:
  {"pollingInterval":500}
/home/src/workspace/package.json: *new*
  {"pollingInterval":2000}
/home/src/workspace/projects/node_modules/@typescript/lib-dom/package.json: *new*
  {"pollingInterval":2000}
/home/src/workspace/projects/node_modules/@typescript/package.json: *new*
  {"pollingInterval":2000}
/home/src/workspace/projects/node_modules/package.json: *new*
  {"pollingInterval":2000}
/home/src/workspace/projects/package.json: *new*
  {"pollingInterval":2000}
/home/src/workspace/projects/project1/node_modules:
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.es5.d.ts:
  {}
/home/src/tslibs/TS/Lib/lib.scripthost.d.ts:
  {}
/home/src/tslibs/TS/Lib/lib.webworker.d.ts:
  {}
/home/src/workspace/projects/node_modules/@typescript/lib-dom/index.d.ts: *new*
  {}
/home/src/workspace/projects/project1/core.d.ts:
  {}
/home/src/workspace/projects/project1/file.ts:
  {}
/home/src/workspace/projects/project1/file2.ts:
  {}
/home/src/workspace/projects/project1/index.ts:
  {}
/home/src/workspace/projects/project1/tsconfig.json:
  {}
/home/src/workspace/projects/project1/typeroot1/sometype/index.d.ts:
  {}
/home/src/workspace/projects/project1/utils.d.ts:
  {}

FsWatches *deleted*::
/home/src/tslibs/TS/Lib/lib.dom.d.ts:
  {}

FsWatchesRecursive::
/home/src/workspace/projects/node_modules:
  {}
/home/src/workspace/projects/project1:
  {}
/home/src/workspace/projects/project1/typeroot1:
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
  "project": "/home/src/workspace/projects/project1",
  "explainFiles": true,
  "extendedDiagnostics": true,
  "configFilePath": "/home/src/workspace/projects/project1/tsconfig.json"
}
Program structureReused: SafeModules
Program files::
/home/src/tslibs/TS/Lib/lib.es5.d.ts
/home/src/tslibs/TS/Lib/lib.webworker.d.ts
/home/src/tslibs/TS/Lib/lib.scripthost.d.ts
/home/src/workspace/projects/node_modules/@typescript/lib-dom/index.d.ts
/home/src/workspace/projects/project1/core.d.ts
/home/src/workspace/projects/project1/file.ts
/home/src/workspace/projects/project1/file2.ts
/home/src/workspace/projects/project1/index.ts
/home/src/workspace/projects/project1/utils.d.ts
/home/src/workspace/projects/project1/typeroot1/sometype/index.d.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.es5.d.ts
/home/src/tslibs/TS/Lib/lib.webworker.d.ts
/home/src/tslibs/TS/Lib/lib.scripthost.d.ts
/home/src/workspace/projects/node_modules/@typescript/lib-dom/index.d.ts
/home/src/workspace/projects/project1/core.d.ts
/home/src/workspace/projects/project1/file.ts
/home/src/workspace/projects/project1/file2.ts
/home/src/workspace/projects/project1/index.ts
/home/src/workspace/projects/project1/utils.d.ts
/home/src/workspace/projects/project1/typeroot1/sometype/index.d.ts

Shape signatures in builder refreshed for::
/home/src/workspace/projects/node_modules/@typescript/lib-dom/index.d.ts (used version)
/home/src/tslibs/ts/lib/lib.webworker.d.ts (used version)
/home/src/tslibs/ts/lib/lib.scripthost.d.ts (used version)
/home/src/workspace/projects/project1/core.d.ts (used version)
/home/src/workspace/projects/project1/file.ts (computed .d.ts)
/home/src/workspace/projects/project1/file2.ts (computed .d.ts)
/home/src/workspace/projects/project1/index.ts (computed .d.ts)
/home/src/workspace/projects/project1/utils.d.ts (used version)
/home/src/workspace/projects/project1/typeroot1/sometype/index.d.ts (used version)

exitCode:: ExitStatus.undefined

Change:: edit file

Input::
//// [/home/src/workspace/projects/project1/file.ts]
export const file = 10;export const xyz = 10;


Output::
FileWatcher:: Triggered with /home/src/workspace/projects/project1/file.ts 1:: WatchInfo: /home/src/workspace/projects/project1/file.ts 250 undefined Source file
Scheduling update
Elapsed:: *ms FileWatcher:: Triggered with /home/src/workspace/projects/project1/file.ts 1:: WatchInfo: /home/src/workspace/projects/project1/file.ts 250 undefined Source file


Timeout callback:: count: 1
4: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
4: timerToUpdateProgram

Host is moving to new time
After running Timeout callback:: count: 0
Output::
Synchronizing program
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

CreatingProgramWith::
  roots: ["/home/src/workspace/projects/project1/core.d.ts","/home/src/workspace/projects/project1/file.ts","/home/src/workspace/projects/project1/file2.ts","/home/src/workspace/projects/project1/index.ts","/home/src/workspace/projects/project1/utils.d.ts","/home/src/workspace/projects/project1/typeroot1/sometype/index.d.ts"]
  options: {"composite":true,"typeRoots":["/home/src/workspace/projects/project1/typeroot1"],"lib":["lib.es5.d.ts","lib.dom.d.ts"],"traceResolution":true,"watch":true,"project":"/home/src/workspace/projects/project1","explainFiles":true,"extendedDiagnostics":true,"configFilePath":"/home/src/workspace/projects/project1/tsconfig.json"}
File '/home/src/workspace/projects/node_modules/@typescript/lib-dom/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspace/projects/node_modules/@typescript/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspace/projects/node_modules/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspace/projects/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspace/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
Reusing resolution of module '@typescript/lib-webworker' from '/home/src/workspace/projects/project1/__lib_node_modules_lookup_lib.webworker.d.ts__.ts' of old program, it was not resolved.
Reusing resolution of module '@typescript/lib-scripthost' from '/home/src/workspace/projects/project1/__lib_node_modules_lookup_lib.scripthost.d.ts__.ts' of old program, it was not resolved.
Reusing resolution of module '@typescript/lib-es5' from '/home/src/workspace/projects/project1/__lib_node_modules_lookup_lib.es5.d.ts__.ts' of old program, it was not resolved.
Reusing resolution of module '@typescript/lib-dom' from '/home/src/workspace/projects/project1/__lib_node_modules_lookup_lib.dom.d.ts__.ts' of old program, it was successfully resolved to '/home/src/workspace/projects/node_modules/@typescript/lib-dom/index.d.ts'.
../../tslibs/TS/Lib/lib.es5.d.ts
  Library referenced via 'es5' from file 'project1/file2.ts'
  Library 'lib.es5.d.ts' specified in compilerOptions
../../tslibs/TS/Lib/lib.webworker.d.ts
  Library referenced via 'webworker' from file 'project1/file2.ts'
../../tslibs/TS/Lib/lib.scripthost.d.ts
  Library referenced via 'scripthost' from file 'project1/file2.ts'
node_modules/@typescript/lib-dom/index.d.ts
  Library 'lib.dom.d.ts' specified in compilerOptions
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
[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/home/src/workspace/projects/project1/file.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.xyz = exports.file = void 0;
exports.file = 10;
exports.xyz = 10;


//// [/home/src/workspace/projects/project1/file.d.ts]
export declare const file = 10;
export declare const xyz = 10;


//// [/home/src/workspace/projects/project1/tsconfig.tsbuildinfo]
{"fileNames":["../../../tslibs/ts/lib/lib.es5.d.ts","../../../tslibs/ts/lib/lib.webworker.d.ts","../../../tslibs/ts/lib/lib.scripthost.d.ts","../node_modules/@typescript/lib-dom/index.d.ts","./core.d.ts","./file.ts","./file2.ts","./index.ts","./utils.d.ts","./typeroot1/sometype/index.d.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-3990185033-interface WebWorkerInterface { }","affectsGlobalScope":true},{"version":"-5403980302-interface ScriptHostInterface { }","affectsGlobalScope":true},{"version":"-8673759361-interface DOMInterface { }","affectsGlobalScope":true,"impliedFormat":1},"-15683237936-export const core = 10;",{"version":"-8860155468-export const file = 10;export const xyz = 10;","signature":"-7578913016-export declare const file = 10;\nexport declare const xyz = 10;\n"},{"version":"-11916614574-/// <reference lib=\"webworker\"/>\n/// <reference lib=\"scripthost\"/>\n/// <reference lib=\"es5\"/>\n","signature":"5381-"},{"version":"-11532698187-export const x = \"type1\";","signature":"-5899226897-export declare const x = \"type1\";\n"},"-13729955264-export const y = 10;","-12476477079-export type TheNum = \"type1\";"],"root":[[5,10]],"options":{"composite":true},"latestChangedDtsFile":"./file.d.ts","version":"FakeTSVersion"}

//// [/home/src/workspace/projects/project1/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../tslibs/ts/lib/lib.es5.d.ts",
    "../../../tslibs/ts/lib/lib.webworker.d.ts",
    "../../../tslibs/ts/lib/lib.scripthost.d.ts",
    "../node_modules/@typescript/lib-dom/index.d.ts",
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
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
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
    "../node_modules/@typescript/lib-dom/index.d.ts": {
      "original": {
        "version": "-8673759361-interface DOMInterface { }",
        "affectsGlobalScope": true,
        "impliedFormat": 1
      },
      "version": "-8673759361-interface DOMInterface { }",
      "signature": "-8673759361-interface DOMInterface { }",
      "affectsGlobalScope": true,
      "impliedFormat": "commonjs"
    },
    "./core.d.ts": {
      "version": "-15683237936-export const core = 10;",
      "signature": "-15683237936-export const core = 10;"
    },
    "./file.ts": {
      "original": {
        "version": "-8860155468-export const file = 10;export const xyz = 10;",
        "signature": "-7578913016-export declare const file = 10;\nexport declare const xyz = 10;\n"
      },
      "version": "-8860155468-export const file = 10;export const xyz = 10;",
      "signature": "-7578913016-export declare const file = 10;\nexport declare const xyz = 10;\n"
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
  "latestChangedDtsFile": "./file.d.ts",
  "version": "FakeTSVersion",
  "size": 1717
}



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
  "project": "/home/src/workspace/projects/project1",
  "explainFiles": true,
  "extendedDiagnostics": true,
  "configFilePath": "/home/src/workspace/projects/project1/tsconfig.json"
}
Program structureReused: Completely
Program files::
/home/src/tslibs/TS/Lib/lib.es5.d.ts
/home/src/tslibs/TS/Lib/lib.webworker.d.ts
/home/src/tslibs/TS/Lib/lib.scripthost.d.ts
/home/src/workspace/projects/node_modules/@typescript/lib-dom/index.d.ts
/home/src/workspace/projects/project1/core.d.ts
/home/src/workspace/projects/project1/file.ts
/home/src/workspace/projects/project1/file2.ts
/home/src/workspace/projects/project1/index.ts
/home/src/workspace/projects/project1/utils.d.ts
/home/src/workspace/projects/project1/typeroot1/sometype/index.d.ts

Semantic diagnostics in builder refreshed for::
/home/src/workspace/projects/project1/file.ts

Shape signatures in builder refreshed for::
/home/src/workspace/projects/project1/file.ts (computed .d.ts)

exitCode:: ExitStatus.undefined

Change:: delete core

Input::
//// [/home/src/workspace/projects/project1/core.d.ts] deleted

Output::
FileWatcher:: Triggered with /home/src/workspace/projects/project1/core.d.ts 2:: WatchInfo: /home/src/workspace/projects/project1/core.d.ts 250 undefined Source file
Scheduling update
Elapsed:: *ms FileWatcher:: Triggered with /home/src/workspace/projects/project1/core.d.ts 2:: WatchInfo: /home/src/workspace/projects/project1/core.d.ts 250 undefined Source file
DirectoryWatcher:: Triggered with /home/src/workspace/projects/project1/core.d.ts :: WatchInfo: /home/src/workspace/projects/project1 1 undefined Wild card directory
Scheduling update
Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/workspace/projects/project1/core.d.ts :: WatchInfo: /home/src/workspace/projects/project1 1 undefined Wild card directory


Timeout callback:: count: 1
6: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
6: timerToUpdateProgram

Host is moving to new time
After running Timeout callback:: count: 0
Output::
Reloading new file names and options
Synchronizing program
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

CreatingProgramWith::
  roots: ["/home/src/workspace/projects/project1/file.ts","/home/src/workspace/projects/project1/file2.ts","/home/src/workspace/projects/project1/index.ts","/home/src/workspace/projects/project1/utils.d.ts","/home/src/workspace/projects/project1/typeroot1/sometype/index.d.ts"]
  options: {"composite":true,"typeRoots":["/home/src/workspace/projects/project1/typeroot1"],"lib":["lib.es5.d.ts","lib.dom.d.ts"],"traceResolution":true,"watch":true,"project":"/home/src/workspace/projects/project1","explainFiles":true,"extendedDiagnostics":true,"configFilePath":"/home/src/workspace/projects/project1/tsconfig.json"}
Reusing resolution of module '@typescript/lib-webworker' from '/home/src/workspace/projects/project1/__lib_node_modules_lookup_lib.webworker.d.ts__.ts' of old program, it was not resolved.
Reusing resolution of module '@typescript/lib-scripthost' from '/home/src/workspace/projects/project1/__lib_node_modules_lookup_lib.scripthost.d.ts__.ts' of old program, it was not resolved.
Reusing resolution of module '@typescript/lib-es5' from '/home/src/workspace/projects/project1/__lib_node_modules_lookup_lib.es5.d.ts__.ts' of old program, it was not resolved.
Reusing resolution of type reference directive 'sometype' from '/home/src/workspace/projects/project1/__inferred type names__.ts' of old program, it was successfully resolved to '/home/src/workspace/projects/project1/typeroot1/sometype/index.d.ts'.
Reusing resolution of module '@typescript/lib-dom' from '/home/src/workspace/projects/project1/__lib_node_modules_lookup_lib.dom.d.ts__.ts' of old program, it was successfully resolved to '/home/src/workspace/projects/node_modules/@typescript/lib-dom/index.d.ts'.
File '/home/src/workspace/projects/node_modules/@typescript/lib-dom/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspace/projects/node_modules/@typescript/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspace/projects/node_modules/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspace/projects/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspace/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
FileWatcher:: Close:: WatchInfo: /home/src/workspace/projects/project1/core.d.ts 250 undefined Source file
../../tslibs/TS/Lib/lib.es5.d.ts
  Library referenced via 'es5' from file 'project1/file2.ts'
  Library 'lib.es5.d.ts' specified in compilerOptions
../../tslibs/TS/Lib/lib.webworker.d.ts
  Library referenced via 'webworker' from file 'project1/file2.ts'
../../tslibs/TS/Lib/lib.scripthost.d.ts
  Library referenced via 'scripthost' from file 'project1/file2.ts'
node_modules/@typescript/lib-dom/index.d.ts
  Library 'lib.dom.d.ts' specified in compilerOptions
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
[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/home/src/workspace/projects/project1/tsconfig.tsbuildinfo]
{"fileNames":["../../../tslibs/ts/lib/lib.es5.d.ts","../../../tslibs/ts/lib/lib.webworker.d.ts","../../../tslibs/ts/lib/lib.scripthost.d.ts","../node_modules/@typescript/lib-dom/index.d.ts","./file.ts","./file2.ts","./index.ts","./utils.d.ts","./typeroot1/sometype/index.d.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-3990185033-interface WebWorkerInterface { }","affectsGlobalScope":true},{"version":"-5403980302-interface ScriptHostInterface { }","affectsGlobalScope":true},{"version":"-8673759361-interface DOMInterface { }","affectsGlobalScope":true,"impliedFormat":1},{"version":"-8860155468-export const file = 10;export const xyz = 10;","signature":"-7578913016-export declare const file = 10;\nexport declare const xyz = 10;\n"},{"version":"-11916614574-/// <reference lib=\"webworker\"/>\n/// <reference lib=\"scripthost\"/>\n/// <reference lib=\"es5\"/>\n","signature":"5381-"},{"version":"-11532698187-export const x = \"type1\";","signature":"-5899226897-export declare const x = \"type1\";\n"},"-13729955264-export const y = 10;","-12476477079-export type TheNum = \"type1\";"],"root":[[5,9]],"options":{"composite":true},"latestChangedDtsFile":"./file.d.ts","version":"FakeTSVersion"}

//// [/home/src/workspace/projects/project1/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../tslibs/ts/lib/lib.es5.d.ts",
    "../../../tslibs/ts/lib/lib.webworker.d.ts",
    "../../../tslibs/ts/lib/lib.scripthost.d.ts",
    "../node_modules/@typescript/lib-dom/index.d.ts",
    "./file.ts",
    "./file2.ts",
    "./index.ts",
    "./utils.d.ts",
    "./typeroot1/sometype/index.d.ts"
  ],
  "fileInfos": {
    "../../../tslibs/ts/lib/lib.es5.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
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
    "../node_modules/@typescript/lib-dom/index.d.ts": {
      "original": {
        "version": "-8673759361-interface DOMInterface { }",
        "affectsGlobalScope": true,
        "impliedFormat": 1
      },
      "version": "-8673759361-interface DOMInterface { }",
      "signature": "-8673759361-interface DOMInterface { }",
      "affectsGlobalScope": true,
      "impliedFormat": "commonjs"
    },
    "./file.ts": {
      "original": {
        "version": "-8860155468-export const file = 10;export const xyz = 10;",
        "signature": "-7578913016-export declare const file = 10;\nexport declare const xyz = 10;\n"
      },
      "version": "-8860155468-export const file = 10;export const xyz = 10;",
      "signature": "-7578913016-export declare const file = 10;\nexport declare const xyz = 10;\n"
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
        9
      ],
      [
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
  "latestChangedDtsFile": "./file.d.ts",
  "version": "FakeTSVersion",
  "size": 1663
}


PolledWatches::
/home/src/workspace/node_modules:
  {"pollingInterval":500}
/home/src/workspace/package.json:
  {"pollingInterval":2000}
/home/src/workspace/projects/node_modules/@typescript/lib-dom/package.json:
  {"pollingInterval":2000}
/home/src/workspace/projects/node_modules/@typescript/package.json:
  {"pollingInterval":2000}
/home/src/workspace/projects/node_modules/package.json:
  {"pollingInterval":2000}
/home/src/workspace/projects/package.json:
  {"pollingInterval":2000}
/home/src/workspace/projects/project1/node_modules:
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.es5.d.ts:
  {}
/home/src/tslibs/TS/Lib/lib.scripthost.d.ts:
  {}
/home/src/tslibs/TS/Lib/lib.webworker.d.ts:
  {}
/home/src/workspace/projects/node_modules/@typescript/lib-dom/index.d.ts:
  {}
/home/src/workspace/projects/project1/file.ts:
  {}
/home/src/workspace/projects/project1/file2.ts:
  {}
/home/src/workspace/projects/project1/index.ts:
  {}
/home/src/workspace/projects/project1/tsconfig.json:
  {}
/home/src/workspace/projects/project1/typeroot1/sometype/index.d.ts:
  {}
/home/src/workspace/projects/project1/utils.d.ts:
  {}

FsWatches *deleted*::
/home/src/workspace/projects/project1/core.d.ts:
  {}

FsWatchesRecursive::
/home/src/workspace/projects/node_modules:
  {}
/home/src/workspace/projects/project1:
  {}
/home/src/workspace/projects/project1/typeroot1:
  {}


Program root files: [
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
  "project": "/home/src/workspace/projects/project1",
  "explainFiles": true,
  "extendedDiagnostics": true,
  "configFilePath": "/home/src/workspace/projects/project1/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.es5.d.ts
/home/src/tslibs/TS/Lib/lib.webworker.d.ts
/home/src/tslibs/TS/Lib/lib.scripthost.d.ts
/home/src/workspace/projects/node_modules/@typescript/lib-dom/index.d.ts
/home/src/workspace/projects/project1/file.ts
/home/src/workspace/projects/project1/file2.ts
/home/src/workspace/projects/project1/index.ts
/home/src/workspace/projects/project1/utils.d.ts
/home/src/workspace/projects/project1/typeroot1/sometype/index.d.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

exitCode:: ExitStatus.undefined

Change:: delete redirect file dom

Input::
//// [/home/src/workspace/projects/node_modules/@typescript/lib-dom/index.d.ts] deleted

Output::
FileWatcher:: Triggered with /home/src/workspace/projects/node_modules/@typescript/lib-dom/index.d.ts 2:: WatchInfo: /home/src/workspace/projects/node_modules/@typescript/lib-dom/index.d.ts 250 undefined Source file
Scheduling update
Elapsed:: *ms FileWatcher:: Triggered with /home/src/workspace/projects/node_modules/@typescript/lib-dom/index.d.ts 2:: WatchInfo: /home/src/workspace/projects/node_modules/@typescript/lib-dom/index.d.ts 250 undefined Source file
DirectoryWatcher:: Triggered with /home/src/workspace/projects/node_modules/@typescript/lib-dom/index.d.ts :: WatchInfo: /home/src/workspace/projects/node_modules 1 undefined Failed Lookup Locations
Scheduling invalidateFailedLookup
Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/workspace/projects/node_modules/@typescript/lib-dom/index.d.ts :: WatchInfo: /home/src/workspace/projects/node_modules 1 undefined Failed Lookup Locations


Timeout callback:: count: 2
7: timerToUpdateProgram *new*
8: timerToInvalidateFailedLookupResolutions *new*

Before running Timeout callback:: count: 2
7: timerToUpdateProgram
8: timerToInvalidateFailedLookupResolutions

Host is moving to new time
After running Timeout callback:: count: 0
Output::
Synchronizing program
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

CreatingProgramWith::
  roots: ["/home/src/workspace/projects/project1/file.ts","/home/src/workspace/projects/project1/file2.ts","/home/src/workspace/projects/project1/index.ts","/home/src/workspace/projects/project1/utils.d.ts","/home/src/workspace/projects/project1/typeroot1/sometype/index.d.ts"]
  options: {"composite":true,"typeRoots":["/home/src/workspace/projects/project1/typeroot1"],"lib":["lib.es5.d.ts","lib.dom.d.ts"],"traceResolution":true,"watch":true,"project":"/home/src/workspace/projects/project1","explainFiles":true,"extendedDiagnostics":true,"configFilePath":"/home/src/workspace/projects/project1/tsconfig.json"}
File '/home/src/workspace/projects/node_modules/@typescript/lib-dom/package.json' does not exist.
File '/home/src/workspace/projects/node_modules/@typescript/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspace/projects/node_modules/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspace/projects/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspace/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
FileWatcher:: Close:: WatchInfo: /home/src/workspace/projects/node_modules/@typescript/lib-dom/index.d.ts 250 undefined Source file
Reusing resolution of module '@typescript/lib-webworker' from '/home/src/workspace/projects/project1/__lib_node_modules_lookup_lib.webworker.d.ts__.ts' of old program, it was not resolved.
Reusing resolution of module '@typescript/lib-scripthost' from '/home/src/workspace/projects/project1/__lib_node_modules_lookup_lib.scripthost.d.ts__.ts' of old program, it was not resolved.
Reusing resolution of module '@typescript/lib-es5' from '/home/src/workspace/projects/project1/__lib_node_modules_lookup_lib.es5.d.ts__.ts' of old program, it was not resolved.
Reusing resolution of type reference directive 'sometype' from '/home/src/workspace/projects/project1/__inferred type names__.ts' of old program, it was successfully resolved to '/home/src/workspace/projects/project1/typeroot1/sometype/index.d.ts'.
======== Resolving module '@typescript/lib-dom' from '/home/src/workspace/projects/project1/__lib_node_modules_lookup_lib.dom.d.ts__.ts'. ========
Explicitly specified module resolution kind: 'Node10'.
Loading module '@typescript/lib-dom' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Directory '/home/src/workspace/projects/project1/node_modules' does not exist, skipping all lookups in it.
Scoped package detected, looking in 'typescript__lib-dom'
File '/home/src/workspace/projects/node_modules/@typescript/lib-dom/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspace/projects/node_modules/@typescript/lib-dom.ts' does not exist.
File '/home/src/workspace/projects/node_modules/@typescript/lib-dom.tsx' does not exist.
File '/home/src/workspace/projects/node_modules/@typescript/lib-dom.d.ts' does not exist.
File '/home/src/workspace/projects/node_modules/@typescript/lib-dom/index.ts' does not exist.
File '/home/src/workspace/projects/node_modules/@typescript/lib-dom/index.tsx' does not exist.
File '/home/src/workspace/projects/node_modules/@typescript/lib-dom/index.d.ts' does not exist.
Directory '/home/src/workspace/projects/node_modules/@types' does not exist, skipping all lookups in it.
Scoped package detected, looking in 'typescript__lib-dom'
Directory '/home/src/workspace/node_modules' does not exist, skipping all lookups in it.
Scoped package detected, looking in 'typescript__lib-dom'
Directory '/home/src/node_modules' does not exist, skipping all lookups in it.
Scoped package detected, looking in 'typescript__lib-dom'
Directory '/home/node_modules' does not exist, skipping all lookups in it.
Scoped package detected, looking in 'typescript__lib-dom'
Directory '/node_modules' does not exist, skipping all lookups in it.
Scoped package detected, looking in 'typescript__lib-dom'
Loading module '@typescript/lib-dom' from 'node_modules' folder, target file types: JavaScript.
Searching all ancestor node_modules directories for fallback extensions: JavaScript.
Directory '/home/src/workspace/projects/project1/node_modules' does not exist, skipping all lookups in it.
File '/home/src/workspace/projects/node_modules/@typescript/lib-dom/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspace/projects/node_modules/@typescript/lib-dom.js' does not exist.
File '/home/src/workspace/projects/node_modules/@typescript/lib-dom.jsx' does not exist.
File '/home/src/workspace/projects/node_modules/@typescript/lib-dom/index.js' does not exist.
File '/home/src/workspace/projects/node_modules/@typescript/lib-dom/index.jsx' does not exist.
Directory '/home/src/workspace/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/node_modules' does not exist, skipping all lookups in it.
Directory '/home/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
======== Module name '@typescript/lib-dom' was not resolved. ========
FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.dom.d.ts 250 undefined Source file
FileWatcher:: Close:: WatchInfo: /home/src/workspace/projects/node_modules/@typescript/lib-dom/package.json 2000 undefined File location affecting resolution
FileWatcher:: Close:: WatchInfo: /home/src/workspace/projects/node_modules/@typescript/package.json 2000 undefined File location affecting resolution
FileWatcher:: Close:: WatchInfo: /home/src/workspace/projects/node_modules/package.json 2000 undefined File location affecting resolution
FileWatcher:: Close:: WatchInfo: /home/src/workspace/projects/package.json 2000 undefined File location affecting resolution
FileWatcher:: Close:: WatchInfo: /home/src/workspace/package.json 2000 undefined File location affecting resolution
../../tslibs/TS/Lib/lib.es5.d.ts
  Library referenced via 'es5' from file 'project1/file2.ts'
  Library 'lib.es5.d.ts' specified in compilerOptions
../../tslibs/TS/Lib/lib.dom.d.ts
  Library 'lib.dom.d.ts' specified in compilerOptions
../../tslibs/TS/Lib/lib.webworker.d.ts
  Library referenced via 'webworker' from file 'project1/file2.ts'
../../tslibs/TS/Lib/lib.scripthost.d.ts
  Library referenced via 'scripthost' from file 'project1/file2.ts'
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
[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/home/src/workspace/projects/project1/file.js] file written with same contents
//// [/home/src/workspace/projects/project1/file2.js] file written with same contents
//// [/home/src/workspace/projects/project1/index.js] file written with same contents
//// [/home/src/workspace/projects/project1/tsconfig.tsbuildinfo]
{"fileNames":["../../../tslibs/ts/lib/lib.es5.d.ts","../../../tslibs/ts/lib/lib.dom.d.ts","../../../tslibs/ts/lib/lib.webworker.d.ts","../../../tslibs/ts/lib/lib.scripthost.d.ts","./file.ts","./file2.ts","./index.ts","./utils.d.ts","./typeroot1/sometype/index.d.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-8673759361-interface DOMInterface { }","affectsGlobalScope":true},{"version":"-3990185033-interface WebWorkerInterface { }","affectsGlobalScope":true},{"version":"-5403980302-interface ScriptHostInterface { }","affectsGlobalScope":true},{"version":"-8860155468-export const file = 10;export const xyz = 10;","signature":"-7578913016-export declare const file = 10;\nexport declare const xyz = 10;\n"},{"version":"-11916614574-/// <reference lib=\"webworker\"/>\n/// <reference lib=\"scripthost\"/>\n/// <reference lib=\"es5\"/>\n","signature":"5381-"},{"version":"-11532698187-export const x = \"type1\";","signature":"-5899226897-export declare const x = \"type1\";\n"},"-13729955264-export const y = 10;","-12476477079-export type TheNum = \"type1\";"],"root":[[5,9]],"options":{"composite":true},"latestChangedDtsFile":"./file.d.ts","version":"FakeTSVersion"}

//// [/home/src/workspace/projects/project1/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../tslibs/ts/lib/lib.es5.d.ts",
    "../../../tslibs/ts/lib/lib.dom.d.ts",
    "../../../tslibs/ts/lib/lib.webworker.d.ts",
    "../../../tslibs/ts/lib/lib.scripthost.d.ts",
    "./file.ts",
    "./file2.ts",
    "./index.ts",
    "./utils.d.ts",
    "./typeroot1/sometype/index.d.ts"
  ],
  "fileInfos": {
    "../../../tslibs/ts/lib/lib.es5.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
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
    "./file.ts": {
      "original": {
        "version": "-8860155468-export const file = 10;export const xyz = 10;",
        "signature": "-7578913016-export declare const file = 10;\nexport declare const xyz = 10;\n"
      },
      "version": "-8860155468-export const file = 10;export const xyz = 10;",
      "signature": "-7578913016-export declare const file = 10;\nexport declare const xyz = 10;\n"
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
        9
      ],
      [
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
  "latestChangedDtsFile": "./file.d.ts",
  "version": "FakeTSVersion",
  "size": 1634
}


PolledWatches::
/home/src/workspace/node_modules:
  {"pollingInterval":500}
/home/src/workspace/projects/project1/node_modules:
  {"pollingInterval":500}

PolledWatches *deleted*::
/home/src/workspace/package.json:
  {"pollingInterval":2000}
/home/src/workspace/projects/node_modules/@typescript/lib-dom/package.json:
  {"pollingInterval":2000}
/home/src/workspace/projects/node_modules/@typescript/package.json:
  {"pollingInterval":2000}
/home/src/workspace/projects/node_modules/package.json:
  {"pollingInterval":2000}
/home/src/workspace/projects/package.json:
  {"pollingInterval":2000}

FsWatches::
/home/src/tslibs/TS/Lib/lib.dom.d.ts: *new*
  {}
/home/src/tslibs/TS/Lib/lib.es5.d.ts:
  {}
/home/src/tslibs/TS/Lib/lib.scripthost.d.ts:
  {}
/home/src/tslibs/TS/Lib/lib.webworker.d.ts:
  {}
/home/src/workspace/projects/project1/file.ts:
  {}
/home/src/workspace/projects/project1/file2.ts:
  {}
/home/src/workspace/projects/project1/index.ts:
  {}
/home/src/workspace/projects/project1/tsconfig.json:
  {}
/home/src/workspace/projects/project1/typeroot1/sometype/index.d.ts:
  {}
/home/src/workspace/projects/project1/utils.d.ts:
  {}

FsWatches *deleted*::
/home/src/workspace/projects/node_modules/@typescript/lib-dom/index.d.ts:
  {}

FsWatchesRecursive::
/home/src/workspace/projects/node_modules:
  {}
/home/src/workspace/projects/project1:
  {}
/home/src/workspace/projects/project1/typeroot1:
  {}

Timeout callback:: count: 0
8: timerToInvalidateFailedLookupResolutions *deleted*


Program root files: [
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
  "project": "/home/src/workspace/projects/project1",
  "explainFiles": true,
  "extendedDiagnostics": true,
  "configFilePath": "/home/src/workspace/projects/project1/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.es5.d.ts
/home/src/tslibs/TS/Lib/lib.dom.d.ts
/home/src/tslibs/TS/Lib/lib.webworker.d.ts
/home/src/tslibs/TS/Lib/lib.scripthost.d.ts
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
/home/src/workspace/projects/project1/file.ts
/home/src/workspace/projects/project1/file2.ts
/home/src/workspace/projects/project1/index.ts
/home/src/workspace/projects/project1/utils.d.ts
/home/src/workspace/projects/project1/typeroot1/sometype/index.d.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.dom.d.ts (used version)
/home/src/tslibs/ts/lib/lib.webworker.d.ts (used version)
/home/src/tslibs/ts/lib/lib.scripthost.d.ts (used version)
/home/src/workspace/projects/project1/file.ts (computed .d.ts)
/home/src/workspace/projects/project1/file2.ts (computed .d.ts)
/home/src/workspace/projects/project1/index.ts (computed .d.ts)
/home/src/workspace/projects/project1/utils.d.ts (used version)
/home/src/workspace/projects/project1/typeroot1/sometype/index.d.ts (used version)

exitCode:: ExitStatus.undefined

Change:: change program options to update module resolution

Input::
//// [/home/src/workspace/projects/project1/tsconfig.json]
{
  "compilerOptions": {
    "composite": true,
    "typeRoots": [
      "./typeroot1",
      "./typeroot2"
    ],
    "lib": [
      "es5",
      "dom"
    ],
    "traceResolution": true,
    "libReplacement": true
  }
}


Output::
FileWatcher:: Triggered with /home/src/workspace/projects/project1/tsconfig.json 1:: WatchInfo: /home/src/workspace/projects/project1/tsconfig.json 2000 undefined Config file
Scheduling update
Elapsed:: *ms FileWatcher:: Triggered with /home/src/workspace/projects/project1/tsconfig.json 1:: WatchInfo: /home/src/workspace/projects/project1/tsconfig.json 2000 undefined Config file


Timeout callback:: count: 1
9: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
9: timerToUpdateProgram

Host is moving to new time
After running Timeout callback:: count: 0
Output::
Reloading config file: /home/src/workspace/projects/project1/tsconfig.json
Synchronizing program
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

CreatingProgramWith::
  roots: ["/home/src/workspace/projects/project1/file.ts","/home/src/workspace/projects/project1/file2.ts","/home/src/workspace/projects/project1/index.ts","/home/src/workspace/projects/project1/utils.d.ts","/home/src/workspace/projects/project1/typeroot1/sometype/index.d.ts"]
  options: {"composite":true,"typeRoots":["/home/src/workspace/projects/project1/typeroot1","/home/src/workspace/projects/project1/typeroot2"],"lib":["lib.es5.d.ts","lib.dom.d.ts"],"traceResolution":true,"libReplacement":true,"watch":true,"project":"/home/src/workspace/projects/project1","explainFiles":true,"extendedDiagnostics":true,"configFilePath":"/home/src/workspace/projects/project1/tsconfig.json"}
Reusing resolution of module '@typescript/lib-webworker' from '/home/src/workspace/projects/project1/__lib_node_modules_lookup_lib.webworker.d.ts__.ts' of old program, it was not resolved.
Reusing resolution of module '@typescript/lib-scripthost' from '/home/src/workspace/projects/project1/__lib_node_modules_lookup_lib.scripthost.d.ts__.ts' of old program, it was not resolved.
Reusing resolution of module '@typescript/lib-es5' from '/home/src/workspace/projects/project1/__lib_node_modules_lookup_lib.es5.d.ts__.ts' of old program, it was not resolved.
======== Resolving type reference directive 'sometype', containing file '/home/src/workspace/projects/project1/__inferred type names__.ts', root directory '/home/src/workspace/projects/project1/typeroot1,/home/src/workspace/projects/project1/typeroot2'. ========
Resolving with primary search path '/home/src/workspace/projects/project1/typeroot1, /home/src/workspace/projects/project1/typeroot2'.
File '/home/src/workspace/projects/project1/typeroot1/sometype.d.ts' does not exist.
File '/home/src/workspace/projects/project1/typeroot1/sometype/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspace/projects/project1/typeroot1/sometype/index.d.ts' exists - use it as a name resolution result.
Resolving real path for '/home/src/workspace/projects/project1/typeroot1/sometype/index.d.ts', result '/home/src/workspace/projects/project1/typeroot1/sometype/index.d.ts'.
======== Type reference directive 'sometype' was successfully resolved to '/home/src/workspace/projects/project1/typeroot1/sometype/index.d.ts', primary: true. ========
Reusing resolution of module '@typescript/lib-dom' from '/home/src/workspace/projects/project1/__lib_node_modules_lookup_lib.dom.d.ts__.ts' of old program, it was not resolved.
DirectoryWatcher:: Added:: WatchInfo: /home/src/workspace/projects/project1/typeroot2 1 undefined Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspace/projects/project1/typeroot2 1 undefined Type roots
../../tslibs/TS/Lib/lib.es5.d.ts
  Library referenced via 'es5' from file 'project1/file2.ts'
  Library 'lib.es5.d.ts' specified in compilerOptions
../../tslibs/TS/Lib/lib.dom.d.ts
  Library 'lib.dom.d.ts' specified in compilerOptions
../../tslibs/TS/Lib/lib.webworker.d.ts
  Library referenced via 'webworker' from file 'project1/file2.ts'
../../tslibs/TS/Lib/lib.scripthost.d.ts
  Library referenced via 'scripthost' from file 'project1/file2.ts'
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
[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.




PolledWatches::
/home/src/workspace/node_modules:
  {"pollingInterval":500}
/home/src/workspace/projects/project1/node_modules:
  {"pollingInterval":500}
/home/src/workspace/projects/project1/typeroot2: *new*
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.dom.d.ts:
  {}
/home/src/tslibs/TS/Lib/lib.es5.d.ts:
  {}
/home/src/tslibs/TS/Lib/lib.scripthost.d.ts:
  {}
/home/src/tslibs/TS/Lib/lib.webworker.d.ts:
  {}
/home/src/workspace/projects/project1/file.ts:
  {}
/home/src/workspace/projects/project1/file2.ts:
  {}
/home/src/workspace/projects/project1/index.ts:
  {}
/home/src/workspace/projects/project1/tsconfig.json:
  {}
/home/src/workspace/projects/project1/typeroot1/sometype/index.d.ts:
  {}
/home/src/workspace/projects/project1/utils.d.ts:
  {}

FsWatchesRecursive::
/home/src/workspace/projects/node_modules:
  {}
/home/src/workspace/projects/project1:
  {}
/home/src/workspace/projects/project1/typeroot1:
  {}

Before running Timeout callback:: count: 0

After running Timeout callback:: count: 0


Program root files: [
  "/home/src/workspace/projects/project1/file.ts",
  "/home/src/workspace/projects/project1/file2.ts",
  "/home/src/workspace/projects/project1/index.ts",
  "/home/src/workspace/projects/project1/utils.d.ts",
  "/home/src/workspace/projects/project1/typeroot1/sometype/index.d.ts"
]
Program options: {
  "composite": true,
  "typeRoots": [
    "/home/src/workspace/projects/project1/typeroot1",
    "/home/src/workspace/projects/project1/typeroot2"
  ],
  "lib": [
    "lib.es5.d.ts",
    "lib.dom.d.ts"
  ],
  "traceResolution": true,
  "libReplacement": true,
  "watch": true,
  "project": "/home/src/workspace/projects/project1",
  "explainFiles": true,
  "extendedDiagnostics": true,
  "configFilePath": "/home/src/workspace/projects/project1/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.es5.d.ts
/home/src/tslibs/TS/Lib/lib.dom.d.ts
/home/src/tslibs/TS/Lib/lib.webworker.d.ts
/home/src/tslibs/TS/Lib/lib.scripthost.d.ts
/home/src/workspace/projects/project1/file.ts
/home/src/workspace/projects/project1/file2.ts
/home/src/workspace/projects/project1/index.ts
/home/src/workspace/projects/project1/utils.d.ts
/home/src/workspace/projects/project1/typeroot1/sometype/index.d.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

exitCode:: ExitStatus.undefined

Change:: change program options to update module resolution and also update lib file

Input::
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
    "traceResolution": true,
    "libReplacement": true
  }
}

//// [/home/src/workspace/projects/node_modules/@typescript/lib-dom/index.d.ts]
interface DOMInterface { }


Output::
FileWatcher:: Triggered with /home/src/workspace/projects/project1/tsconfig.json 1:: WatchInfo: /home/src/workspace/projects/project1/tsconfig.json 2000 undefined Config file
Scheduling update
Elapsed:: *ms FileWatcher:: Triggered with /home/src/workspace/projects/project1/tsconfig.json 1:: WatchInfo: /home/src/workspace/projects/project1/tsconfig.json 2000 undefined Config file
DirectoryWatcher:: Triggered with /home/src/workspace/projects/node_modules/@typescript/lib-dom/index.d.ts :: WatchInfo: /home/src/workspace/projects/node_modules 1 undefined Failed Lookup Locations
Scheduling invalidateFailedLookup
Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/workspace/projects/node_modules/@typescript/lib-dom/index.d.ts :: WatchInfo: /home/src/workspace/projects/node_modules 1 undefined Failed Lookup Locations


Timeout callback:: count: 2
10: timerToUpdateProgram *new*
11: timerToInvalidateFailedLookupResolutions *new*

Before running Timeout callback:: count: 2
10: timerToUpdateProgram
11: timerToInvalidateFailedLookupResolutions

After running Timeout callback:: count: 0
Output::
Reloading config file: /home/src/workspace/projects/project1/tsconfig.json
Synchronizing program
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

CreatingProgramWith::
  roots: ["/home/src/workspace/projects/project1/file.ts","/home/src/workspace/projects/project1/file2.ts","/home/src/workspace/projects/project1/index.ts","/home/src/workspace/projects/project1/utils.d.ts","/home/src/workspace/projects/project1/typeroot1/sometype/index.d.ts"]
  options: {"composite":true,"typeRoots":["/home/src/workspace/projects/project1/typeroot1"],"lib":["lib.es5.d.ts","lib.dom.d.ts"],"traceResolution":true,"libReplacement":true,"watch":true,"project":"/home/src/workspace/projects/project1","explainFiles":true,"extendedDiagnostics":true,"configFilePath":"/home/src/workspace/projects/project1/tsconfig.json"}
Reusing resolution of module '@typescript/lib-webworker' from '/home/src/workspace/projects/project1/__lib_node_modules_lookup_lib.webworker.d.ts__.ts' of old program, it was not resolved.
Reusing resolution of module '@typescript/lib-scripthost' from '/home/src/workspace/projects/project1/__lib_node_modules_lookup_lib.scripthost.d.ts__.ts' of old program, it was not resolved.
Reusing resolution of module '@typescript/lib-es5' from '/home/src/workspace/projects/project1/__lib_node_modules_lookup_lib.es5.d.ts__.ts' of old program, it was not resolved.
======== Resolving type reference directive 'sometype', containing file '/home/src/workspace/projects/project1/__inferred type names__.ts', root directory '/home/src/workspace/projects/project1/typeroot1'. ========
Resolving with primary search path '/home/src/workspace/projects/project1/typeroot1'.
File '/home/src/workspace/projects/project1/typeroot1/sometype.d.ts' does not exist.
File '/home/src/workspace/projects/project1/typeroot1/sometype/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspace/projects/project1/typeroot1/sometype/index.d.ts' exists - use it as a name resolution result.
Resolving real path for '/home/src/workspace/projects/project1/typeroot1/sometype/index.d.ts', result '/home/src/workspace/projects/project1/typeroot1/sometype/index.d.ts'.
======== Type reference directive 'sometype' was successfully resolved to '/home/src/workspace/projects/project1/typeroot1/sometype/index.d.ts', primary: true. ========
======== Resolving module '@typescript/lib-dom' from '/home/src/workspace/projects/project1/__lib_node_modules_lookup_lib.dom.d.ts__.ts'. ========
Explicitly specified module resolution kind: 'Node10'.
Loading module '@typescript/lib-dom' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Directory '/home/src/workspace/projects/project1/node_modules' does not exist, skipping all lookups in it.
Scoped package detected, looking in 'typescript__lib-dom'
File '/home/src/workspace/projects/node_modules/@typescript/lib-dom/package.json' does not exist.
File '/home/src/workspace/projects/node_modules/@typescript/lib-dom.ts' does not exist.
File '/home/src/workspace/projects/node_modules/@typescript/lib-dom.tsx' does not exist.
File '/home/src/workspace/projects/node_modules/@typescript/lib-dom.d.ts' does not exist.
File '/home/src/workspace/projects/node_modules/@typescript/lib-dom/index.ts' does not exist.
File '/home/src/workspace/projects/node_modules/@typescript/lib-dom/index.tsx' does not exist.
File '/home/src/workspace/projects/node_modules/@typescript/lib-dom/index.d.ts' exists - use it as a name resolution result.
Resolving real path for '/home/src/workspace/projects/node_modules/@typescript/lib-dom/index.d.ts', result '/home/src/workspace/projects/node_modules/@typescript/lib-dom/index.d.ts'.
======== Module name '@typescript/lib-dom' was successfully resolved to '/home/src/workspace/projects/node_modules/@typescript/lib-dom/index.d.ts'. ========
File '/home/src/workspace/projects/node_modules/@typescript/lib-dom/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspace/projects/node_modules/@typescript/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspace/projects/node_modules/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspace/projects/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspace/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
FileWatcher:: Added:: WatchInfo: /home/src/workspace/projects/node_modules/@typescript/lib-dom/index.d.ts 250 undefined Source file
FileWatcher:: Close:: WatchInfo: /home/src/tslibs/TS/Lib/lib.dom.d.ts 250 undefined Source file
FileWatcher:: Added:: WatchInfo: /home/src/workspace/projects/node_modules/@typescript/lib-dom/package.json 2000 undefined File location affecting resolution
FileWatcher:: Added:: WatchInfo: /home/src/workspace/projects/node_modules/@typescript/package.json 2000 undefined File location affecting resolution
FileWatcher:: Added:: WatchInfo: /home/src/workspace/projects/node_modules/package.json 2000 undefined File location affecting resolution
FileWatcher:: Added:: WatchInfo: /home/src/workspace/projects/package.json 2000 undefined File location affecting resolution
FileWatcher:: Added:: WatchInfo: /home/src/workspace/package.json 2000 undefined File location affecting resolution
DirectoryWatcher:: Close:: WatchInfo: /home/src/workspace/projects/project1/typeroot2 1 undefined Type roots
Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /home/src/workspace/projects/project1/typeroot2 1 undefined Type roots
../../tslibs/TS/Lib/lib.es5.d.ts
  Library referenced via 'es5' from file 'project1/file2.ts'
  Library 'lib.es5.d.ts' specified in compilerOptions
../../tslibs/TS/Lib/lib.webworker.d.ts
  Library referenced via 'webworker' from file 'project1/file2.ts'
../../tslibs/TS/Lib/lib.scripthost.d.ts
  Library referenced via 'scripthost' from file 'project1/file2.ts'
node_modules/@typescript/lib-dom/index.d.ts
  Library 'lib.dom.d.ts' specified in compilerOptions
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
[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/home/src/workspace/projects/project1/file.js] file written with same contents
//// [/home/src/workspace/projects/project1/file2.js] file written with same contents
//// [/home/src/workspace/projects/project1/index.js] file written with same contents
//// [/home/src/workspace/projects/project1/tsconfig.tsbuildinfo]
{"fileNames":["../../../tslibs/ts/lib/lib.es5.d.ts","../../../tslibs/ts/lib/lib.webworker.d.ts","../../../tslibs/ts/lib/lib.scripthost.d.ts","../node_modules/@typescript/lib-dom/index.d.ts","./file.ts","./file2.ts","./index.ts","./utils.d.ts","./typeroot1/sometype/index.d.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-3990185033-interface WebWorkerInterface { }","affectsGlobalScope":true},{"version":"-5403980302-interface ScriptHostInterface { }","affectsGlobalScope":true},{"version":"-8673759361-interface DOMInterface { }","affectsGlobalScope":true,"impliedFormat":1},{"version":"-8860155468-export const file = 10;export const xyz = 10;","signature":"-7578913016-export declare const file = 10;\nexport declare const xyz = 10;\n"},{"version":"-11916614574-/// <reference lib=\"webworker\"/>\n/// <reference lib=\"scripthost\"/>\n/// <reference lib=\"es5\"/>\n","signature":"5381-"},{"version":"-11532698187-export const x = \"type1\";","signature":"-5899226897-export declare const x = \"type1\";\n"},"-13729955264-export const y = 10;","-12476477079-export type TheNum = \"type1\";"],"root":[[5,9]],"options":{"composite":true},"latestChangedDtsFile":"./file.d.ts","version":"FakeTSVersion"}

//// [/home/src/workspace/projects/project1/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../tslibs/ts/lib/lib.es5.d.ts",
    "../../../tslibs/ts/lib/lib.webworker.d.ts",
    "../../../tslibs/ts/lib/lib.scripthost.d.ts",
    "../node_modules/@typescript/lib-dom/index.d.ts",
    "./file.ts",
    "./file2.ts",
    "./index.ts",
    "./utils.d.ts",
    "./typeroot1/sometype/index.d.ts"
  ],
  "fileInfos": {
    "../../../tslibs/ts/lib/lib.es5.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
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
    "../node_modules/@typescript/lib-dom/index.d.ts": {
      "original": {
        "version": "-8673759361-interface DOMInterface { }",
        "affectsGlobalScope": true,
        "impliedFormat": 1
      },
      "version": "-8673759361-interface DOMInterface { }",
      "signature": "-8673759361-interface DOMInterface { }",
      "affectsGlobalScope": true,
      "impliedFormat": "commonjs"
    },
    "./file.ts": {
      "original": {
        "version": "-8860155468-export const file = 10;export const xyz = 10;",
        "signature": "-7578913016-export declare const file = 10;\nexport declare const xyz = 10;\n"
      },
      "version": "-8860155468-export const file = 10;export const xyz = 10;",
      "signature": "-7578913016-export declare const file = 10;\nexport declare const xyz = 10;\n"
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
        9
      ],
      [
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
  "latestChangedDtsFile": "./file.d.ts",
  "version": "FakeTSVersion",
  "size": 1663
}


PolledWatches::
/home/src/workspace/node_modules:
  {"pollingInterval":500}
/home/src/workspace/package.json: *new*
  {"pollingInterval":2000}
/home/src/workspace/projects/node_modules/@typescript/lib-dom/package.json: *new*
  {"pollingInterval":2000}
/home/src/workspace/projects/node_modules/@typescript/package.json: *new*
  {"pollingInterval":2000}
/home/src/workspace/projects/node_modules/package.json: *new*
  {"pollingInterval":2000}
/home/src/workspace/projects/package.json: *new*
  {"pollingInterval":2000}
/home/src/workspace/projects/project1/node_modules:
  {"pollingInterval":500}

PolledWatches *deleted*::
/home/src/workspace/projects/project1/typeroot2:
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.es5.d.ts:
  {}
/home/src/tslibs/TS/Lib/lib.scripthost.d.ts:
  {}
/home/src/tslibs/TS/Lib/lib.webworker.d.ts:
  {}
/home/src/workspace/projects/node_modules/@typescript/lib-dom/index.d.ts: *new*
  {}
/home/src/workspace/projects/project1/file.ts:
  {}
/home/src/workspace/projects/project1/file2.ts:
  {}
/home/src/workspace/projects/project1/index.ts:
  {}
/home/src/workspace/projects/project1/tsconfig.json:
  {}
/home/src/workspace/projects/project1/typeroot1/sometype/index.d.ts:
  {}
/home/src/workspace/projects/project1/utils.d.ts:
  {}

FsWatches *deleted*::
/home/src/tslibs/TS/Lib/lib.dom.d.ts:
  {}

FsWatchesRecursive::
/home/src/workspace/projects/node_modules:
  {}
/home/src/workspace/projects/project1:
  {}
/home/src/workspace/projects/project1/typeroot1:
  {}

Timeout callback:: count: 0
11: timerToInvalidateFailedLookupResolutions *deleted*

Before running Timeout callback:: count: 0

After running Timeout callback:: count: 0


Program root files: [
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
  "libReplacement": true,
  "watch": true,
  "project": "/home/src/workspace/projects/project1",
  "explainFiles": true,
  "extendedDiagnostics": true,
  "configFilePath": "/home/src/workspace/projects/project1/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.es5.d.ts
/home/src/tslibs/TS/Lib/lib.webworker.d.ts
/home/src/tslibs/TS/Lib/lib.scripthost.d.ts
/home/src/workspace/projects/node_modules/@typescript/lib-dom/index.d.ts
/home/src/workspace/projects/project1/file.ts
/home/src/workspace/projects/project1/file2.ts
/home/src/workspace/projects/project1/index.ts
/home/src/workspace/projects/project1/utils.d.ts
/home/src/workspace/projects/project1/typeroot1/sometype/index.d.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.es5.d.ts
/home/src/tslibs/TS/Lib/lib.webworker.d.ts
/home/src/tslibs/TS/Lib/lib.scripthost.d.ts
/home/src/workspace/projects/node_modules/@typescript/lib-dom/index.d.ts
/home/src/workspace/projects/project1/file.ts
/home/src/workspace/projects/project1/file2.ts
/home/src/workspace/projects/project1/index.ts
/home/src/workspace/projects/project1/utils.d.ts
/home/src/workspace/projects/project1/typeroot1/sometype/index.d.ts

Shape signatures in builder refreshed for::
/home/src/workspace/projects/node_modules/@typescript/lib-dom/index.d.ts (used version)
/home/src/tslibs/ts/lib/lib.webworker.d.ts (used version)
/home/src/tslibs/ts/lib/lib.scripthost.d.ts (used version)
/home/src/workspace/projects/project1/file.ts (computed .d.ts)
/home/src/workspace/projects/project1/file2.ts (computed .d.ts)
/home/src/workspace/projects/project1/index.ts (computed .d.ts)
/home/src/workspace/projects/project1/utils.d.ts (used version)
/home/src/workspace/projects/project1/typeroot1/sometype/index.d.ts (used version)

exitCode:: ExitStatus.undefined

Change:: write redirect file webworker

Input::
//// [/home/src/workspace/projects/node_modules/@typescript/lib-webworker/index.d.ts]
interface WebWorkerInterface { }


Output::
DirectoryWatcher:: Triggered with /home/src/workspace/projects/node_modules/@typescript/lib-webworker :: WatchInfo: /home/src/workspace/projects/node_modules 1 undefined Failed Lookup Locations
Scheduling invalidateFailedLookup
Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/workspace/projects/node_modules/@typescript/lib-webworker :: WatchInfo: /home/src/workspace/projects/node_modules 1 undefined Failed Lookup Locations
DirectoryWatcher:: Triggered with /home/src/workspace/projects/node_modules/@typescript/lib-webworker/index.d.ts :: WatchInfo: /home/src/workspace/projects/node_modules 1 undefined Failed Lookup Locations
Scheduling invalidateFailedLookup, Cancelled earlier one
Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/workspace/projects/node_modules/@typescript/lib-webworker/index.d.ts :: WatchInfo: /home/src/workspace/projects/node_modules 1 undefined Failed Lookup Locations


Timeout callback:: count: 1
13: timerToInvalidateFailedLookupResolutions *new*

Before running Timeout callback:: count: 1
13: timerToInvalidateFailedLookupResolutions

Host is moving to new time
After running Timeout callback:: count: 1
Output::
Scheduling update



Timeout callback:: count: 1
14: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
14: timerToUpdateProgram

Host is moving to new time
After running Timeout callback:: count: 0
Output::
Synchronizing program
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

CreatingProgramWith::
  roots: ["/home/src/workspace/projects/project1/file.ts","/home/src/workspace/projects/project1/file2.ts","/home/src/workspace/projects/project1/index.ts","/home/src/workspace/projects/project1/utils.d.ts","/home/src/workspace/projects/project1/typeroot1/sometype/index.d.ts"]
  options: {"composite":true,"typeRoots":["/home/src/workspace/projects/project1/typeroot1"],"lib":["lib.es5.d.ts","lib.dom.d.ts"],"traceResolution":true,"libReplacement":true,"watch":true,"project":"/home/src/workspace/projects/project1","explainFiles":true,"extendedDiagnostics":true,"configFilePath":"/home/src/workspace/projects/project1/tsconfig.json"}
File '/home/src/workspace/projects/node_modules/@typescript/lib-dom/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspace/projects/node_modules/@typescript/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspace/projects/node_modules/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspace/projects/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspace/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
======== Resolving module '@typescript/lib-webworker' from '/home/src/workspace/projects/project1/__lib_node_modules_lookup_lib.webworker.d.ts__.ts'. ========
Explicitly specified module resolution kind: 'Node10'.
Loading module '@typescript/lib-webworker' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Directory '/home/src/workspace/projects/project1/node_modules' does not exist, skipping all lookups in it.
Scoped package detected, looking in 'typescript__lib-webworker'
File '/home/src/workspace/projects/node_modules/@typescript/lib-webworker/package.json' does not exist.
File '/home/src/workspace/projects/node_modules/@typescript/lib-webworker.ts' does not exist.
File '/home/src/workspace/projects/node_modules/@typescript/lib-webworker.tsx' does not exist.
File '/home/src/workspace/projects/node_modules/@typescript/lib-webworker.d.ts' does not exist.
File '/home/src/workspace/projects/node_modules/@typescript/lib-webworker/index.ts' does not exist.
File '/home/src/workspace/projects/node_modules/@typescript/lib-webworker/index.tsx' does not exist.
File '/home/src/workspace/projects/node_modules/@typescript/lib-webworker/index.d.ts' exists - use it as a name resolution result.
Resolving real path for '/home/src/workspace/projects/node_modules/@typescript/lib-webworker/index.d.ts', result '/home/src/workspace/projects/node_modules/@typescript/lib-webworker/index.d.ts'.
======== Module name '@typescript/lib-webworker' was successfully resolved to '/home/src/workspace/projects/node_modules/@typescript/lib-webworker/index.d.ts'. ========
File '/home/src/workspace/projects/node_modules/@typescript/lib-webworker/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspace/projects/node_modules/@typescript/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspace/projects/node_modules/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspace/projects/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspace/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
FileWatcher:: Added:: WatchInfo: /home/src/workspace/projects/node_modules/@typescript/lib-webworker/index.d.ts 250 undefined Source file
Reusing resolution of module '@typescript/lib-scripthost' from '/home/src/workspace/projects/project1/__lib_node_modules_lookup_lib.scripthost.d.ts__.ts' of old program, it was not resolved.
Reusing resolution of module '@typescript/lib-es5' from '/home/src/workspace/projects/project1/__lib_node_modules_lookup_lib.es5.d.ts__.ts' of old program, it was not resolved.
Reusing resolution of type reference directive 'sometype' from '/home/src/workspace/projects/project1/__inferred type names__.ts' of old program, it was successfully resolved to '/home/src/workspace/projects/project1/typeroot1/sometype/index.d.ts'.
Reusing resolution of module '@typescript/lib-dom' from '/home/src/workspace/projects/project1/__lib_node_modules_lookup_lib.dom.d.ts__.ts' of old program, it was successfully resolved to '/home/src/workspace/projects/node_modules/@typescript/lib-dom/index.d.ts'.
File '/home/src/workspace/projects/node_modules/@typescript/lib-dom/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspace/projects/node_modules/@typescript/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspace/projects/node_modules/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspace/projects/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspace/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
FileWatcher:: Close:: WatchInfo: /home/src/tslibs/TS/Lib/lib.webworker.d.ts 250 undefined Source file
FileWatcher:: Added:: WatchInfo: /home/src/workspace/projects/node_modules/@typescript/lib-webworker/package.json 2000 undefined File location affecting resolution
../../tslibs/TS/Lib/lib.es5.d.ts
  Library referenced via 'es5' from file 'project1/file2.ts'
  Library 'lib.es5.d.ts' specified in compilerOptions
../../tslibs/TS/Lib/lib.scripthost.d.ts
  Library referenced via 'scripthost' from file 'project1/file2.ts'
node_modules/@typescript/lib-webworker/index.d.ts
  Library referenced via 'webworker' from file 'project1/file2.ts'
node_modules/@typescript/lib-dom/index.d.ts
  Library 'lib.dom.d.ts' specified in compilerOptions
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
[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/home/src/workspace/projects/project1/file.js] file written with same contents
//// [/home/src/workspace/projects/project1/file2.js] file written with same contents
//// [/home/src/workspace/projects/project1/index.js] file written with same contents
//// [/home/src/workspace/projects/project1/tsconfig.tsbuildinfo]
{"fileNames":["../../../tslibs/ts/lib/lib.es5.d.ts","../../../tslibs/ts/lib/lib.scripthost.d.ts","../node_modules/@typescript/lib-webworker/index.d.ts","../node_modules/@typescript/lib-dom/index.d.ts","./file.ts","./file2.ts","./index.ts","./utils.d.ts","./typeroot1/sometype/index.d.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-5403980302-interface ScriptHostInterface { }","affectsGlobalScope":true},{"version":"-3990185033-interface WebWorkerInterface { }","affectsGlobalScope":true,"impliedFormat":1},{"version":"-8673759361-interface DOMInterface { }","affectsGlobalScope":true,"impliedFormat":1},{"version":"-8860155468-export const file = 10;export const xyz = 10;","signature":"-7578913016-export declare const file = 10;\nexport declare const xyz = 10;\n"},{"version":"-11916614574-/// <reference lib=\"webworker\"/>\n/// <reference lib=\"scripthost\"/>\n/// <reference lib=\"es5\"/>\n","signature":"5381-"},{"version":"-11532698187-export const x = \"type1\";","signature":"-5899226897-export declare const x = \"type1\";\n"},"-13729955264-export const y = 10;","-12476477079-export type TheNum = \"type1\";"],"root":[[5,9]],"options":{"composite":true},"latestChangedDtsFile":"./file.d.ts","version":"FakeTSVersion"}

//// [/home/src/workspace/projects/project1/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../tslibs/ts/lib/lib.es5.d.ts",
    "../../../tslibs/ts/lib/lib.scripthost.d.ts",
    "../node_modules/@typescript/lib-webworker/index.d.ts",
    "../node_modules/@typescript/lib-dom/index.d.ts",
    "./file.ts",
    "./file2.ts",
    "./index.ts",
    "./utils.d.ts",
    "./typeroot1/sometype/index.d.ts"
  ],
  "fileInfos": {
    "../../../tslibs/ts/lib/lib.es5.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
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
    "../node_modules/@typescript/lib-webworker/index.d.ts": {
      "original": {
        "version": "-3990185033-interface WebWorkerInterface { }",
        "affectsGlobalScope": true,
        "impliedFormat": 1
      },
      "version": "-3990185033-interface WebWorkerInterface { }",
      "signature": "-3990185033-interface WebWorkerInterface { }",
      "affectsGlobalScope": true,
      "impliedFormat": "commonjs"
    },
    "../node_modules/@typescript/lib-dom/index.d.ts": {
      "original": {
        "version": "-8673759361-interface DOMInterface { }",
        "affectsGlobalScope": true,
        "impliedFormat": 1
      },
      "version": "-8673759361-interface DOMInterface { }",
      "signature": "-8673759361-interface DOMInterface { }",
      "affectsGlobalScope": true,
      "impliedFormat": "commonjs"
    },
    "./file.ts": {
      "original": {
        "version": "-8860155468-export const file = 10;export const xyz = 10;",
        "signature": "-7578913016-export declare const file = 10;\nexport declare const xyz = 10;\n"
      },
      "version": "-8860155468-export const file = 10;export const xyz = 10;",
      "signature": "-7578913016-export declare const file = 10;\nexport declare const xyz = 10;\n"
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
        9
      ],
      [
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
  "latestChangedDtsFile": "./file.d.ts",
  "version": "FakeTSVersion",
  "size": 1692
}


PolledWatches::
/home/src/workspace/node_modules:
  {"pollingInterval":500}
/home/src/workspace/package.json:
  {"pollingInterval":2000}
/home/src/workspace/projects/node_modules/@typescript/lib-dom/package.json:
  {"pollingInterval":2000}
/home/src/workspace/projects/node_modules/@typescript/lib-webworker/package.json: *new*
  {"pollingInterval":2000}
/home/src/workspace/projects/node_modules/@typescript/package.json:
  {"pollingInterval":2000}
/home/src/workspace/projects/node_modules/package.json:
  {"pollingInterval":2000}
/home/src/workspace/projects/package.json:
  {"pollingInterval":2000}
/home/src/workspace/projects/project1/node_modules:
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.es5.d.ts:
  {}
/home/src/tslibs/TS/Lib/lib.scripthost.d.ts:
  {}
/home/src/workspace/projects/node_modules/@typescript/lib-dom/index.d.ts:
  {}
/home/src/workspace/projects/node_modules/@typescript/lib-webworker/index.d.ts: *new*
  {}
/home/src/workspace/projects/project1/file.ts:
  {}
/home/src/workspace/projects/project1/file2.ts:
  {}
/home/src/workspace/projects/project1/index.ts:
  {}
/home/src/workspace/projects/project1/tsconfig.json:
  {}
/home/src/workspace/projects/project1/typeroot1/sometype/index.d.ts:
  {}
/home/src/workspace/projects/project1/utils.d.ts:
  {}

FsWatches *deleted*::
/home/src/tslibs/TS/Lib/lib.webworker.d.ts:
  {}

FsWatchesRecursive::
/home/src/workspace/projects/node_modules:
  {}
/home/src/workspace/projects/project1:
  {}
/home/src/workspace/projects/project1/typeroot1:
  {}


Program root files: [
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
  "libReplacement": true,
  "watch": true,
  "project": "/home/src/workspace/projects/project1",
  "explainFiles": true,
  "extendedDiagnostics": true,
  "configFilePath": "/home/src/workspace/projects/project1/tsconfig.json"
}
Program structureReused: SafeModules
Program files::
/home/src/tslibs/TS/Lib/lib.es5.d.ts
/home/src/tslibs/TS/Lib/lib.scripthost.d.ts
/home/src/workspace/projects/node_modules/@typescript/lib-webworker/index.d.ts
/home/src/workspace/projects/node_modules/@typescript/lib-dom/index.d.ts
/home/src/workspace/projects/project1/file.ts
/home/src/workspace/projects/project1/file2.ts
/home/src/workspace/projects/project1/index.ts
/home/src/workspace/projects/project1/utils.d.ts
/home/src/workspace/projects/project1/typeroot1/sometype/index.d.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.es5.d.ts
/home/src/tslibs/TS/Lib/lib.scripthost.d.ts
/home/src/workspace/projects/node_modules/@typescript/lib-webworker/index.d.ts
/home/src/workspace/projects/node_modules/@typescript/lib-dom/index.d.ts
/home/src/workspace/projects/project1/file.ts
/home/src/workspace/projects/project1/file2.ts
/home/src/workspace/projects/project1/index.ts
/home/src/workspace/projects/project1/utils.d.ts
/home/src/workspace/projects/project1/typeroot1/sometype/index.d.ts

Shape signatures in builder refreshed for::
/home/src/workspace/projects/node_modules/@typescript/lib-webworker/index.d.ts (used version)
/home/src/tslibs/ts/lib/lib.scripthost.d.ts (used version)
/home/src/workspace/projects/project1/file.ts (computed .d.ts)
/home/src/workspace/projects/project1/file2.ts (computed .d.ts)
/home/src/workspace/projects/project1/index.ts (computed .d.ts)
/home/src/workspace/projects/project1/utils.d.ts (used version)
/home/src/workspace/projects/project1/typeroot1/sometype/index.d.ts (used version)

exitCode:: ExitStatus.undefined

Change:: delete redirect file webworker

Input::
//// [/home/src/workspace/projects/node_modules/@typescript/lib-webworker/index.d.ts] deleted

Output::
FileWatcher:: Triggered with /home/src/workspace/projects/node_modules/@typescript/lib-webworker/index.d.ts 2:: WatchInfo: /home/src/workspace/projects/node_modules/@typescript/lib-webworker/index.d.ts 250 undefined Source file
Scheduling update
Elapsed:: *ms FileWatcher:: Triggered with /home/src/workspace/projects/node_modules/@typescript/lib-webworker/index.d.ts 2:: WatchInfo: /home/src/workspace/projects/node_modules/@typescript/lib-webworker/index.d.ts 250 undefined Source file
DirectoryWatcher:: Triggered with /home/src/workspace/projects/node_modules/@typescript/lib-webworker/index.d.ts :: WatchInfo: /home/src/workspace/projects/node_modules 1 undefined Failed Lookup Locations
Scheduling invalidateFailedLookup
Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/workspace/projects/node_modules/@typescript/lib-webworker/index.d.ts :: WatchInfo: /home/src/workspace/projects/node_modules 1 undefined Failed Lookup Locations


Timeout callback:: count: 2
15: timerToUpdateProgram *new*
16: timerToInvalidateFailedLookupResolutions *new*

Before running Timeout callback:: count: 2
15: timerToUpdateProgram
16: timerToInvalidateFailedLookupResolutions

Host is moving to new time
After running Timeout callback:: count: 0
Output::
Synchronizing program
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

CreatingProgramWith::
  roots: ["/home/src/workspace/projects/project1/file.ts","/home/src/workspace/projects/project1/file2.ts","/home/src/workspace/projects/project1/index.ts","/home/src/workspace/projects/project1/utils.d.ts","/home/src/workspace/projects/project1/typeroot1/sometype/index.d.ts"]
  options: {"composite":true,"typeRoots":["/home/src/workspace/projects/project1/typeroot1"],"lib":["lib.es5.d.ts","lib.dom.d.ts"],"traceResolution":true,"libReplacement":true,"watch":true,"project":"/home/src/workspace/projects/project1","explainFiles":true,"extendedDiagnostics":true,"configFilePath":"/home/src/workspace/projects/project1/tsconfig.json"}
File '/home/src/workspace/projects/node_modules/@typescript/lib-webworker/package.json' does not exist.
File '/home/src/workspace/projects/node_modules/@typescript/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspace/projects/node_modules/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspace/projects/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspace/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
FileWatcher:: Close:: WatchInfo: /home/src/workspace/projects/node_modules/@typescript/lib-webworker/index.d.ts 250 undefined Source file
======== Resolving module '@typescript/lib-webworker' from '/home/src/workspace/projects/project1/__lib_node_modules_lookup_lib.webworker.d.ts__.ts'. ========
Explicitly specified module resolution kind: 'Node10'.
Loading module '@typescript/lib-webworker' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Directory '/home/src/workspace/projects/project1/node_modules' does not exist, skipping all lookups in it.
Scoped package detected, looking in 'typescript__lib-webworker'
File '/home/src/workspace/projects/node_modules/@typescript/lib-webworker/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspace/projects/node_modules/@typescript/lib-webworker.ts' does not exist.
File '/home/src/workspace/projects/node_modules/@typescript/lib-webworker.tsx' does not exist.
File '/home/src/workspace/projects/node_modules/@typescript/lib-webworker.d.ts' does not exist.
File '/home/src/workspace/projects/node_modules/@typescript/lib-webworker/index.ts' does not exist.
File '/home/src/workspace/projects/node_modules/@typescript/lib-webworker/index.tsx' does not exist.
File '/home/src/workspace/projects/node_modules/@typescript/lib-webworker/index.d.ts' does not exist.
Directory '/home/src/workspace/projects/node_modules/@types' does not exist, skipping all lookups in it.
Scoped package detected, looking in 'typescript__lib-webworker'
Directory '/home/src/workspace/node_modules' does not exist, skipping all lookups in it.
Scoped package detected, looking in 'typescript__lib-webworker'
Directory '/home/src/node_modules' does not exist, skipping all lookups in it.
Scoped package detected, looking in 'typescript__lib-webworker'
Directory '/home/node_modules' does not exist, skipping all lookups in it.
Scoped package detected, looking in 'typescript__lib-webworker'
Directory '/node_modules' does not exist, skipping all lookups in it.
Scoped package detected, looking in 'typescript__lib-webworker'
Loading module '@typescript/lib-webworker' from 'node_modules' folder, target file types: JavaScript.
Searching all ancestor node_modules directories for fallback extensions: JavaScript.
Directory '/home/src/workspace/projects/project1/node_modules' does not exist, skipping all lookups in it.
File '/home/src/workspace/projects/node_modules/@typescript/lib-webworker/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspace/projects/node_modules/@typescript/lib-webworker.js' does not exist.
File '/home/src/workspace/projects/node_modules/@typescript/lib-webworker.jsx' does not exist.
File '/home/src/workspace/projects/node_modules/@typescript/lib-webworker/index.js' does not exist.
File '/home/src/workspace/projects/node_modules/@typescript/lib-webworker/index.jsx' does not exist.
Directory '/home/src/workspace/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/node_modules' does not exist, skipping all lookups in it.
Directory '/home/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
======== Module name '@typescript/lib-webworker' was not resolved. ========
FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.webworker.d.ts 250 undefined Source file
Reusing resolution of module '@typescript/lib-scripthost' from '/home/src/workspace/projects/project1/__lib_node_modules_lookup_lib.scripthost.d.ts__.ts' of old program, it was not resolved.
Reusing resolution of module '@typescript/lib-es5' from '/home/src/workspace/projects/project1/__lib_node_modules_lookup_lib.es5.d.ts__.ts' of old program, it was not resolved.
Reusing resolution of type reference directive 'sometype' from '/home/src/workspace/projects/project1/__inferred type names__.ts' of old program, it was successfully resolved to '/home/src/workspace/projects/project1/typeroot1/sometype/index.d.ts'.
Reusing resolution of module '@typescript/lib-dom' from '/home/src/workspace/projects/project1/__lib_node_modules_lookup_lib.dom.d.ts__.ts' of old program, it was successfully resolved to '/home/src/workspace/projects/node_modules/@typescript/lib-dom/index.d.ts'.
File '/home/src/workspace/projects/node_modules/@typescript/lib-dom/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspace/projects/node_modules/@typescript/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspace/projects/node_modules/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspace/projects/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspace/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
FileWatcher:: Close:: WatchInfo: /home/src/workspace/projects/node_modules/@typescript/lib-webworker/package.json 2000 undefined File location affecting resolution
../../tslibs/TS/Lib/lib.es5.d.ts
  Library referenced via 'es5' from file 'project1/file2.ts'
  Library 'lib.es5.d.ts' specified in compilerOptions
../../tslibs/TS/Lib/lib.webworker.d.ts
  Library referenced via 'webworker' from file 'project1/file2.ts'
../../tslibs/TS/Lib/lib.scripthost.d.ts
  Library referenced via 'scripthost' from file 'project1/file2.ts'
node_modules/@typescript/lib-dom/index.d.ts
  Library 'lib.dom.d.ts' specified in compilerOptions
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
[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/home/src/workspace/projects/project1/file.js] file written with same contents
//// [/home/src/workspace/projects/project1/file2.js] file written with same contents
//// [/home/src/workspace/projects/project1/index.js] file written with same contents
//// [/home/src/workspace/projects/project1/tsconfig.tsbuildinfo]
{"fileNames":["../../../tslibs/ts/lib/lib.es5.d.ts","../../../tslibs/ts/lib/lib.webworker.d.ts","../../../tslibs/ts/lib/lib.scripthost.d.ts","../node_modules/@typescript/lib-dom/index.d.ts","./file.ts","./file2.ts","./index.ts","./utils.d.ts","./typeroot1/sometype/index.d.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-3990185033-interface WebWorkerInterface { }","affectsGlobalScope":true},{"version":"-5403980302-interface ScriptHostInterface { }","affectsGlobalScope":true},{"version":"-8673759361-interface DOMInterface { }","affectsGlobalScope":true,"impliedFormat":1},{"version":"-8860155468-export const file = 10;export const xyz = 10;","signature":"-7578913016-export declare const file = 10;\nexport declare const xyz = 10;\n"},{"version":"-11916614574-/// <reference lib=\"webworker\"/>\n/// <reference lib=\"scripthost\"/>\n/// <reference lib=\"es5\"/>\n","signature":"5381-"},{"version":"-11532698187-export const x = \"type1\";","signature":"-5899226897-export declare const x = \"type1\";\n"},"-13729955264-export const y = 10;","-12476477079-export type TheNum = \"type1\";"],"root":[[5,9]],"options":{"composite":true},"latestChangedDtsFile":"./file.d.ts","version":"FakeTSVersion"}

//// [/home/src/workspace/projects/project1/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../tslibs/ts/lib/lib.es5.d.ts",
    "../../../tslibs/ts/lib/lib.webworker.d.ts",
    "../../../tslibs/ts/lib/lib.scripthost.d.ts",
    "../node_modules/@typescript/lib-dom/index.d.ts",
    "./file.ts",
    "./file2.ts",
    "./index.ts",
    "./utils.d.ts",
    "./typeroot1/sometype/index.d.ts"
  ],
  "fileInfos": {
    "../../../tslibs/ts/lib/lib.es5.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
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
    "../node_modules/@typescript/lib-dom/index.d.ts": {
      "original": {
        "version": "-8673759361-interface DOMInterface { }",
        "affectsGlobalScope": true,
        "impliedFormat": 1
      },
      "version": "-8673759361-interface DOMInterface { }",
      "signature": "-8673759361-interface DOMInterface { }",
      "affectsGlobalScope": true,
      "impliedFormat": "commonjs"
    },
    "./file.ts": {
      "original": {
        "version": "-8860155468-export const file = 10;export const xyz = 10;",
        "signature": "-7578913016-export declare const file = 10;\nexport declare const xyz = 10;\n"
      },
      "version": "-8860155468-export const file = 10;export const xyz = 10;",
      "signature": "-7578913016-export declare const file = 10;\nexport declare const xyz = 10;\n"
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
        9
      ],
      [
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
  "latestChangedDtsFile": "./file.d.ts",
  "version": "FakeTSVersion",
  "size": 1663
}


PolledWatches::
/home/src/workspace/node_modules:
  {"pollingInterval":500}
/home/src/workspace/package.json:
  {"pollingInterval":2000}
/home/src/workspace/projects/node_modules/@typescript/lib-dom/package.json:
  {"pollingInterval":2000}
/home/src/workspace/projects/node_modules/@typescript/package.json:
  {"pollingInterval":2000}
/home/src/workspace/projects/node_modules/package.json:
  {"pollingInterval":2000}
/home/src/workspace/projects/package.json:
  {"pollingInterval":2000}
/home/src/workspace/projects/project1/node_modules:
  {"pollingInterval":500}

PolledWatches *deleted*::
/home/src/workspace/projects/node_modules/@typescript/lib-webworker/package.json:
  {"pollingInterval":2000}

FsWatches::
/home/src/tslibs/TS/Lib/lib.es5.d.ts:
  {}
/home/src/tslibs/TS/Lib/lib.scripthost.d.ts:
  {}
/home/src/tslibs/TS/Lib/lib.webworker.d.ts: *new*
  {}
/home/src/workspace/projects/node_modules/@typescript/lib-dom/index.d.ts:
  {}
/home/src/workspace/projects/project1/file.ts:
  {}
/home/src/workspace/projects/project1/file2.ts:
  {}
/home/src/workspace/projects/project1/index.ts:
  {}
/home/src/workspace/projects/project1/tsconfig.json:
  {}
/home/src/workspace/projects/project1/typeroot1/sometype/index.d.ts:
  {}
/home/src/workspace/projects/project1/utils.d.ts:
  {}

FsWatches *deleted*::
/home/src/workspace/projects/node_modules/@typescript/lib-webworker/index.d.ts:
  {}

FsWatchesRecursive::
/home/src/workspace/projects/node_modules:
  {}
/home/src/workspace/projects/project1:
  {}
/home/src/workspace/projects/project1/typeroot1:
  {}

Timeout callback:: count: 0
16: timerToInvalidateFailedLookupResolutions *deleted*


Program root files: [
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
  "libReplacement": true,
  "watch": true,
  "project": "/home/src/workspace/projects/project1",
  "explainFiles": true,
  "extendedDiagnostics": true,
  "configFilePath": "/home/src/workspace/projects/project1/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.es5.d.ts
/home/src/tslibs/TS/Lib/lib.webworker.d.ts
/home/src/tslibs/TS/Lib/lib.scripthost.d.ts
/home/src/workspace/projects/node_modules/@typescript/lib-dom/index.d.ts
/home/src/workspace/projects/project1/file.ts
/home/src/workspace/projects/project1/file2.ts
/home/src/workspace/projects/project1/index.ts
/home/src/workspace/projects/project1/utils.d.ts
/home/src/workspace/projects/project1/typeroot1/sometype/index.d.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.es5.d.ts
/home/src/tslibs/TS/Lib/lib.webworker.d.ts
/home/src/tslibs/TS/Lib/lib.scripthost.d.ts
/home/src/workspace/projects/node_modules/@typescript/lib-dom/index.d.ts
/home/src/workspace/projects/project1/file.ts
/home/src/workspace/projects/project1/file2.ts
/home/src/workspace/projects/project1/index.ts
/home/src/workspace/projects/project1/utils.d.ts
/home/src/workspace/projects/project1/typeroot1/sometype/index.d.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.webworker.d.ts (used version)
/home/src/tslibs/ts/lib/lib.scripthost.d.ts (used version)
/home/src/workspace/projects/project1/file.ts (computed .d.ts)
/home/src/workspace/projects/project1/file2.ts (computed .d.ts)
/home/src/workspace/projects/project1/index.ts (computed .d.ts)
/home/src/workspace/projects/project1/utils.d.ts (used version)
/home/src/workspace/projects/project1/typeroot1/sometype/index.d.ts (used version)

exitCode:: ExitStatus.undefined
