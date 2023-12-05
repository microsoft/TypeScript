currentDirectory:: /home/src/projects useCaseSensitiveFileNames: false
Input::
//// [/home/src/projects/project1/utils.d.ts]
export const y = 10;

//// [/home/src/projects/project1/file.ts]
export const file = 10;

//// [/home/src/projects/project1/core.d.ts]
export const core = 10;

//// [/home/src/projects/project1/index.ts]
export const x = "type1";

//// [/home/src/projects/project1/file2.ts]
/// <reference lib="webworker"/>
/// <reference lib="scripthost"/>
/// <reference lib="es5"/>


//// [/home/src/projects/project1/tsconfig.json]
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

//// [/home/src/projects/project1/typeroot1/sometype/index.d.ts]
export type TheNum = "type1";

//// [/home/src/projects/project2/utils.d.ts]
export const y = 10;

//// [/home/src/projects/project2/index.ts]
export const y = 10

//// [/home/src/projects/project2/tsconfig.json]
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

//// [/home/src/projects/project3/utils.d.ts]
export const y = 10;

//// [/home/src/projects/project3/index.ts]
export const z = 10

//// [/home/src/projects/project3/tsconfig.json]
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

//// [/home/src/projects/project4/utils.d.ts]
export const y = 10;

//// [/home/src/projects/project4/index.ts]
export const z = 10

//// [/home/src/projects/project4/tsconfig.json]
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

//// [/home/src/lib/lib.es5.d.ts]
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

//// [/home/src/lib/lib.esnext.d.ts]
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

//// [/home/src/lib/lib.dom.d.ts]
interface DOMInterface { }

//// [/home/src/lib/lib.webworker.d.ts]
interface WebWorkerInterface { }

//// [/home/src/lib/lib.scripthost.d.ts]
interface ScriptHostInterface { }

//// [/home/src/projects/node_modules/@typescript/unlreated/index.d.ts]
export const unrelated = 10;

//// [/home/src/projects/node_modules/@typescript/lib-es5/index.d.ts]
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

//// [/home/src/projects/node_modules/@typescript/lib-esnext/index.d.ts]
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

//// [/home/src/projects/node_modules/@typescript/lib-dom/index.d.ts]
interface DOMInterface { }

//// [/home/src/projects/node_modules/@typescript/lib-webworker/index.d.ts]
interface WebworkerInterface { }

//// [/home/src/projects/node_modules/@typescript/lib-scripthost/index.d.ts]
interface ScriptHostInterface { }


/home/src/lib/tsc.js -w -p project1 --explainFiles --extendedDiagnostics
Output::
[[90m12:01:33 AM[0m] Starting compilation in watch mode...

Current directory: /home/src/projects CaseSensitiveFileNames: false
FileWatcher:: Added:: WatchInfo: /home/src/projects/project1/tsconfig.json 2000 undefined Config file
Synchronizing program
CreatingProgramWith::
  roots: ["/home/src/projects/project1/core.d.ts","/home/src/projects/project1/file.ts","/home/src/projects/project1/file2.ts","/home/src/projects/project1/index.ts","/home/src/projects/project1/utils.d.ts","/home/src/projects/project1/typeroot1/sometype/index.d.ts"]
  options: {"composite":true,"typeRoots":["/home/src/projects/project1/typeroot1"],"lib":["lib.es5.d.ts","lib.dom.d.ts"],"traceResolution":true,"watch":true,"project":"/home/src/projects/project1","explainFiles":true,"extendedDiagnostics":true,"configFilePath":"/home/src/projects/project1/tsconfig.json"}
FileWatcher:: Added:: WatchInfo: /home/src/projects/project1/core.d.ts 250 undefined Source file
FileWatcher:: Added:: WatchInfo: /home/src/projects/project1/file.ts 250 undefined Source file
FileWatcher:: Added:: WatchInfo: /home/src/projects/project1/file2.ts 250 undefined Source file
======== Resolving module '@typescript/lib-webworker' from '/home/src/projects/project1/__lib_node_modules_lookup_lib.webworker.d.ts__.ts'. ========
Explicitly specified module resolution kind: 'Node10'.
Loading module '@typescript/lib-webworker' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Directory '/home/src/projects/project1/node_modules' does not exist, skipping all lookups in it.
Scoped package detected, looking in 'typescript__lib-webworker'
File '/home/src/projects/node_modules/@typescript/lib-webworker/package.json' does not exist.
File '/home/src/projects/node_modules/@typescript/lib-webworker.ts' does not exist.
File '/home/src/projects/node_modules/@typescript/lib-webworker.tsx' does not exist.
File '/home/src/projects/node_modules/@typescript/lib-webworker.d.ts' does not exist.
File '/home/src/projects/node_modules/@typescript/lib-webworker/index.ts' does not exist.
File '/home/src/projects/node_modules/@typescript/lib-webworker/index.tsx' does not exist.
File '/home/src/projects/node_modules/@typescript/lib-webworker/index.d.ts' exists - use it as a name resolution result.
Resolving real path for '/home/src/projects/node_modules/@typescript/lib-webworker/index.d.ts', result '/home/src/projects/node_modules/@typescript/lib-webworker/index.d.ts'.
======== Module name '@typescript/lib-webworker' was successfully resolved to '/home/src/projects/node_modules/@typescript/lib-webworker/index.d.ts'. ========
DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project1/node_modules 1 undefined Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project1/node_modules 1 undefined Failed Lookup Locations
DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/node_modules 1 undefined Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/node_modules 1 undefined Failed Lookup Locations
FileWatcher:: Added:: WatchInfo: /home/src/projects/node_modules/@typescript/lib-webworker/index.d.ts 250 undefined Source file
======== Resolving module '@typescript/lib-scripthost' from '/home/src/projects/project1/__lib_node_modules_lookup_lib.scripthost.d.ts__.ts'. ========
Explicitly specified module resolution kind: 'Node10'.
Loading module '@typescript/lib-scripthost' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Directory '/home/src/projects/project1/node_modules' does not exist, skipping all lookups in it.
Scoped package detected, looking in 'typescript__lib-scripthost'
File '/home/src/projects/node_modules/@typescript/lib-scripthost/package.json' does not exist.
File '/home/src/projects/node_modules/@typescript/lib-scripthost.ts' does not exist.
File '/home/src/projects/node_modules/@typescript/lib-scripthost.tsx' does not exist.
File '/home/src/projects/node_modules/@typescript/lib-scripthost.d.ts' does not exist.
File '/home/src/projects/node_modules/@typescript/lib-scripthost/index.ts' does not exist.
File '/home/src/projects/node_modules/@typescript/lib-scripthost/index.tsx' does not exist.
File '/home/src/projects/node_modules/@typescript/lib-scripthost/index.d.ts' exists - use it as a name resolution result.
Resolving real path for '/home/src/projects/node_modules/@typescript/lib-scripthost/index.d.ts', result '/home/src/projects/node_modules/@typescript/lib-scripthost/index.d.ts'.
======== Module name '@typescript/lib-scripthost' was successfully resolved to '/home/src/projects/node_modules/@typescript/lib-scripthost/index.d.ts'. ========
FileWatcher:: Added:: WatchInfo: /home/src/projects/node_modules/@typescript/lib-scripthost/index.d.ts 250 undefined Source file
======== Resolving module '@typescript/lib-es5' from '/home/src/projects/project1/__lib_node_modules_lookup_lib.es5.d.ts__.ts'. ========
Explicitly specified module resolution kind: 'Node10'.
Loading module '@typescript/lib-es5' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Directory '/home/src/projects/project1/node_modules' does not exist, skipping all lookups in it.
Scoped package detected, looking in 'typescript__lib-es5'
File '/home/src/projects/node_modules/@typescript/lib-es5/package.json' does not exist.
File '/home/src/projects/node_modules/@typescript/lib-es5.ts' does not exist.
File '/home/src/projects/node_modules/@typescript/lib-es5.tsx' does not exist.
File '/home/src/projects/node_modules/@typescript/lib-es5.d.ts' does not exist.
File '/home/src/projects/node_modules/@typescript/lib-es5/index.ts' does not exist.
File '/home/src/projects/node_modules/@typescript/lib-es5/index.tsx' does not exist.
File '/home/src/projects/node_modules/@typescript/lib-es5/index.d.ts' exists - use it as a name resolution result.
Resolving real path for '/home/src/projects/node_modules/@typescript/lib-es5/index.d.ts', result '/home/src/projects/node_modules/@typescript/lib-es5/index.d.ts'.
======== Module name '@typescript/lib-es5' was successfully resolved to '/home/src/projects/node_modules/@typescript/lib-es5/index.d.ts'. ========
FileWatcher:: Added:: WatchInfo: /home/src/projects/node_modules/@typescript/lib-es5/index.d.ts 250 undefined Source file
FileWatcher:: Added:: WatchInfo: /home/src/projects/project1/index.ts 250 undefined Source file
FileWatcher:: Added:: WatchInfo: /home/src/projects/project1/utils.d.ts 250 undefined Source file
FileWatcher:: Added:: WatchInfo: /home/src/projects/project1/typeroot1/sometype/index.d.ts 250 undefined Source file
======== Resolving type reference directive 'sometype', containing file '/home/src/projects/project1/__inferred type names__.ts', root directory '/home/src/projects/project1/typeroot1'. ========
Resolving with primary search path '/home/src/projects/project1/typeroot1'.
File '/home/src/projects/project1/typeroot1/sometype.d.ts' does not exist.
File '/home/src/projects/project1/typeroot1/sometype/package.json' does not exist.
File '/home/src/projects/project1/typeroot1/sometype/index.d.ts' exists - use it as a name resolution result.
Resolving real path for '/home/src/projects/project1/typeroot1/sometype/index.d.ts', result '/home/src/projects/project1/typeroot1/sometype/index.d.ts'.
======== Type reference directive 'sometype' was successfully resolved to '/home/src/projects/project1/typeroot1/sometype/index.d.ts', primary: true. ========
DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project1/typeroot1 1 undefined Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project1/typeroot1 1 undefined Failed Lookup Locations
======== Resolving module '@typescript/lib-dom' from '/home/src/projects/project1/__lib_node_modules_lookup_lib.dom.d.ts__.ts'. ========
Explicitly specified module resolution kind: 'Node10'.
Loading module '@typescript/lib-dom' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Directory '/home/src/projects/project1/node_modules' does not exist, skipping all lookups in it.
Scoped package detected, looking in 'typescript__lib-dom'
File '/home/src/projects/node_modules/@typescript/lib-dom/package.json' does not exist.
File '/home/src/projects/node_modules/@typescript/lib-dom.ts' does not exist.
File '/home/src/projects/node_modules/@typescript/lib-dom.tsx' does not exist.
File '/home/src/projects/node_modules/@typescript/lib-dom.d.ts' does not exist.
File '/home/src/projects/node_modules/@typescript/lib-dom/index.ts' does not exist.
File '/home/src/projects/node_modules/@typescript/lib-dom/index.tsx' does not exist.
File '/home/src/projects/node_modules/@typescript/lib-dom/index.d.ts' exists - use it as a name resolution result.
Resolving real path for '/home/src/projects/node_modules/@typescript/lib-dom/index.d.ts', result '/home/src/projects/node_modules/@typescript/lib-dom/index.d.ts'.
======== Module name '@typescript/lib-dom' was successfully resolved to '/home/src/projects/node_modules/@typescript/lib-dom/index.d.ts'. ========
FileWatcher:: Added:: WatchInfo: /home/src/projects/node_modules/@typescript/lib-dom/index.d.ts 250 undefined Source file
DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project1/typeroot1 1 undefined Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project1/typeroot1 1 undefined Type roots
node_modules/@typescript/lib-webworker/index.d.ts
  Library referenced via 'webworker' from file 'project1/file2.ts'
node_modules/@typescript/lib-scripthost/index.d.ts
  Library referenced via 'scripthost' from file 'project1/file2.ts'
node_modules/@typescript/lib-es5/index.d.ts
  Library referenced via 'es5' from file 'project1/file2.ts'
  Library 'lib.es5.d.ts' specified in compilerOptions
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
[[90m12:01:48 AM[0m] Found 0 errors. Watching for file changes.

DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project1 1 undefined Wild card directory
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project1 1 undefined Wild card directory


//// [/home/src/projects/project1/file.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.file = void 0;
exports.file = 10;


//// [/home/src/projects/project1/file.d.ts]
export declare const file = 10;


//// [/home/src/projects/project1/file2.js]
/// <reference lib="webworker"/>
/// <reference lib="scripthost"/>
/// <reference lib="es5"/>


//// [/home/src/projects/project1/file2.d.ts]
/// <reference lib="webworker" />
/// <reference lib="scripthost" />
/// <reference lib="es5" />


//// [/home/src/projects/project1/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = "type1";


//// [/home/src/projects/project1/index.d.ts]
export declare const x = "type1";


//// [/home/src/projects/project1/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../node_modules/@typescript/lib-webworker/index.d.ts","../node_modules/@typescript/lib-scripthost/index.d.ts","../node_modules/@typescript/lib-es5/index.d.ts","../node_modules/@typescript/lib-dom/index.d.ts","./core.d.ts","./file.ts","./file2.ts","./index.ts","./utils.d.ts","./typeroot1/sometype/index.d.ts"],"fileInfos":[{"version":"-7827135529-interface WebworkerInterface { }","affectsGlobalScope":true},{"version":"-5403980302-interface ScriptHostInterface { }","affectsGlobalScope":true},{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-8673759361-interface DOMInterface { }","affectsGlobalScope":true},"-15683237936-export const core = 10;",{"version":"-16628394009-export const file = 10;","signature":"-9025507999-export declare const file = 10;\n"},{"version":"-11916614574-/// <reference lib=\"webworker\"/>\n/// <reference lib=\"scripthost\"/>\n/// <reference lib=\"es5\"/>\n","signature":"-14493813102-/// <reference lib=\"webworker\" />\n/// <reference lib=\"scripthost\" />\n/// <reference lib=\"es5\" />\n"},{"version":"-11532698187-export const x = \"type1\";","signature":"-5899226897-export declare const x = \"type1\";\n"},"-13729955264-export const y = 10;","-12476477079-export type TheNum = \"type1\";"],"root":[[5,10]],"options":{"composite":true},"referencedMap":[],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[4,3,2,1,5,6,7,8,10,9],"latestChangedDtsFile":"./index.d.ts"},"version":"FakeTSVersion"}

//// [/home/src/projects/project1/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../node_modules/@typescript/lib-webworker/index.d.ts",
      "../node_modules/@typescript/lib-scripthost/index.d.ts",
      "../node_modules/@typescript/lib-es5/index.d.ts",
      "../node_modules/@typescript/lib-dom/index.d.ts",
      "./core.d.ts",
      "./file.ts",
      "./file2.ts",
      "./index.ts",
      "./utils.d.ts",
      "./typeroot1/sometype/index.d.ts"
    ],
    "fileInfos": {
      "../node_modules/@typescript/lib-webworker/index.d.ts": {
        "original": {
          "version": "-7827135529-interface WebworkerInterface { }",
          "affectsGlobalScope": true
        },
        "version": "-7827135529-interface WebworkerInterface { }",
        "signature": "-7827135529-interface WebworkerInterface { }",
        "affectsGlobalScope": true
      },
      "../node_modules/@typescript/lib-scripthost/index.d.ts": {
        "original": {
          "version": "-5403980302-interface ScriptHostInterface { }",
          "affectsGlobalScope": true
        },
        "version": "-5403980302-interface ScriptHostInterface { }",
        "signature": "-5403980302-interface ScriptHostInterface { }",
        "affectsGlobalScope": true
      },
      "../node_modules/@typescript/lib-es5/index.d.ts": {
        "original": {
          "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
          "affectsGlobalScope": true
        },
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "../node_modules/@typescript/lib-dom/index.d.ts": {
        "original": {
          "version": "-8673759361-interface DOMInterface { }",
          "affectsGlobalScope": true
        },
        "version": "-8673759361-interface DOMInterface { }",
        "signature": "-8673759361-interface DOMInterface { }",
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
          "signature": "-14493813102-/// <reference lib=\"webworker\" />\n/// <reference lib=\"scripthost\" />\n/// <reference lib=\"es5\" />\n"
        },
        "version": "-11916614574-/// <reference lib=\"webworker\"/>\n/// <reference lib=\"scripthost\"/>\n/// <reference lib=\"es5\"/>\n",
        "signature": "-14493813102-/// <reference lib=\"webworker\" />\n/// <reference lib=\"scripthost\" />\n/// <reference lib=\"es5\" />\n"
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
    "referencedMap": {},
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../node_modules/@typescript/lib-dom/index.d.ts",
      "../node_modules/@typescript/lib-es5/index.d.ts",
      "../node_modules/@typescript/lib-scripthost/index.d.ts",
      "../node_modules/@typescript/lib-webworker/index.d.ts",
      "./core.d.ts",
      "./file.ts",
      "./file2.ts",
      "./index.ts",
      "./typeroot1/sometype/index.d.ts",
      "./utils.d.ts"
    ],
    "latestChangedDtsFile": "./index.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 1901
}


PolledWatches::
/home/src/projects/project1/node_modules: *new*
  {"pollingInterval":500}

FsWatches::
/home/src/projects/node_modules/@typescript/lib-dom/index.d.ts: *new*
  {}
/home/src/projects/node_modules/@typescript/lib-es5/index.d.ts: *new*
  {}
/home/src/projects/node_modules/@typescript/lib-scripthost/index.d.ts: *new*
  {}
/home/src/projects/node_modules/@typescript/lib-webworker/index.d.ts: *new*
  {}
/home/src/projects/project1/core.d.ts: *new*
  {}
/home/src/projects/project1/file.ts: *new*
  {}
/home/src/projects/project1/file2.ts: *new*
  {}
/home/src/projects/project1/index.ts: *new*
  {}
/home/src/projects/project1/tsconfig.json: *new*
  {}
/home/src/projects/project1/typeroot1/sometype/index.d.ts: *new*
  {}
/home/src/projects/project1/utils.d.ts: *new*
  {}

FsWatchesRecursive::
/home/src/projects/node_modules: *new*
  {}
/home/src/projects/project1: *new*
  {}
/home/src/projects/project1/typeroot1: *new*
  {}

Program root files: [
  "/home/src/projects/project1/core.d.ts",
  "/home/src/projects/project1/file.ts",
  "/home/src/projects/project1/file2.ts",
  "/home/src/projects/project1/index.ts",
  "/home/src/projects/project1/utils.d.ts",
  "/home/src/projects/project1/typeroot1/sometype/index.d.ts"
]
Program options: {
  "composite": true,
  "typeRoots": [
    "/home/src/projects/project1/typeroot1"
  ],
  "lib": [
    "lib.es5.d.ts",
    "lib.dom.d.ts"
  ],
  "traceResolution": true,
  "watch": true,
  "project": "/home/src/projects/project1",
  "explainFiles": true,
  "extendedDiagnostics": true,
  "configFilePath": "/home/src/projects/project1/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/projects/node_modules/@typescript/lib-webworker/index.d.ts
/home/src/projects/node_modules/@typescript/lib-scripthost/index.d.ts
/home/src/projects/node_modules/@typescript/lib-es5/index.d.ts
/home/src/projects/node_modules/@typescript/lib-dom/index.d.ts
/home/src/projects/project1/core.d.ts
/home/src/projects/project1/file.ts
/home/src/projects/project1/file2.ts
/home/src/projects/project1/index.ts
/home/src/projects/project1/utils.d.ts
/home/src/projects/project1/typeroot1/sometype/index.d.ts

Semantic diagnostics in builder refreshed for::
/home/src/projects/node_modules/@typescript/lib-webworker/index.d.ts
/home/src/projects/node_modules/@typescript/lib-scripthost/index.d.ts
/home/src/projects/node_modules/@typescript/lib-es5/index.d.ts
/home/src/projects/node_modules/@typescript/lib-dom/index.d.ts
/home/src/projects/project1/core.d.ts
/home/src/projects/project1/file.ts
/home/src/projects/project1/file2.ts
/home/src/projects/project1/index.ts
/home/src/projects/project1/utils.d.ts
/home/src/projects/project1/typeroot1/sometype/index.d.ts

Shape signatures in builder refreshed for::
/home/src/projects/node_modules/@typescript/lib-webworker/index.d.ts (used version)
/home/src/projects/node_modules/@typescript/lib-scripthost/index.d.ts (used version)
/home/src/projects/node_modules/@typescript/lib-dom/index.d.ts (used version)
/home/src/projects/project1/core.d.ts (used version)
/home/src/projects/project1/file.ts (computed .d.ts during emit)
/home/src/projects/project1/file2.ts (computed .d.ts during emit)
/home/src/projects/project1/index.ts (computed .d.ts during emit)
/home/src/projects/project1/utils.d.ts (used version)
/home/src/projects/project1/typeroot1/sometype/index.d.ts (used version)
/home/src/projects/node_modules/@typescript/lib-es5/index.d.ts (used version)

exitCode:: ExitStatus.undefined

Change:: delete redirect file dom

Input::
//// [/home/src/projects/node_modules/@typescript/lib-dom/index.d.ts] deleted

Output::
FileWatcher:: Triggered with /home/src/projects/node_modules/@typescript/lib-dom/index.d.ts 2:: WatchInfo: /home/src/projects/node_modules/@typescript/lib-dom/index.d.ts 250 undefined Source file
Scheduling update
Elapsed:: *ms FileWatcher:: Triggered with /home/src/projects/node_modules/@typescript/lib-dom/index.d.ts 2:: WatchInfo: /home/src/projects/node_modules/@typescript/lib-dom/index.d.ts 250 undefined Source file
DirectoryWatcher:: Triggered with /home/src/projects/node_modules/@typescript/lib-dom/index.d.ts :: WatchInfo: /home/src/projects/node_modules 1 undefined Failed Lookup Locations
Scheduling invalidateFailedLookup
Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/projects/node_modules/@typescript/lib-dom/index.d.ts :: WatchInfo: /home/src/projects/node_modules 1 undefined Failed Lookup Locations


Timeout callback:: count: 2
1: timerToUpdateProgram *new*
2: timerToInvalidateFailedLookupResolutions *new*

Before running Timeout callback:: count: 2
1: timerToUpdateProgram
2: timerToInvalidateFailedLookupResolutions

After running Timeout callback:: count: 0
Output::
Synchronizing program
[[90m12:01:52 AM[0m] File change detected. Starting incremental compilation...

CreatingProgramWith::
  roots: ["/home/src/projects/project1/core.d.ts","/home/src/projects/project1/file.ts","/home/src/projects/project1/file2.ts","/home/src/projects/project1/index.ts","/home/src/projects/project1/utils.d.ts","/home/src/projects/project1/typeroot1/sometype/index.d.ts"]
  options: {"composite":true,"typeRoots":["/home/src/projects/project1/typeroot1"],"lib":["lib.es5.d.ts","lib.dom.d.ts"],"traceResolution":true,"watch":true,"project":"/home/src/projects/project1","explainFiles":true,"extendedDiagnostics":true,"configFilePath":"/home/src/projects/project1/tsconfig.json"}
FileWatcher:: Close:: WatchInfo: /home/src/projects/node_modules/@typescript/lib-dom/index.d.ts 250 undefined Source file
Reusing resolution of module '@typescript/lib-webworker' from '/home/src/projects/project1/__lib_node_modules_lookup_lib.webworker.d.ts__.ts' of old program, it was successfully resolved to '/home/src/projects/node_modules/@typescript/lib-webworker/index.d.ts'.
Reusing resolution of module '@typescript/lib-scripthost' from '/home/src/projects/project1/__lib_node_modules_lookup_lib.scripthost.d.ts__.ts' of old program, it was successfully resolved to '/home/src/projects/node_modules/@typescript/lib-scripthost/index.d.ts'.
Reusing resolution of module '@typescript/lib-es5' from '/home/src/projects/project1/__lib_node_modules_lookup_lib.es5.d.ts__.ts' of old program, it was successfully resolved to '/home/src/projects/node_modules/@typescript/lib-es5/index.d.ts'.
Reusing resolution of type reference directive 'sometype' from '/home/src/projects/project1/__inferred type names__.ts' of old program, it was successfully resolved to '/home/src/projects/project1/typeroot1/sometype/index.d.ts'.
======== Resolving module '@typescript/lib-dom' from '/home/src/projects/project1/__lib_node_modules_lookup_lib.dom.d.ts__.ts'. ========
Explicitly specified module resolution kind: 'Node10'.
Loading module '@typescript/lib-dom' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Directory '/home/src/projects/project1/node_modules' does not exist, skipping all lookups in it.
Scoped package detected, looking in 'typescript__lib-dom'
File '/home/src/projects/node_modules/@typescript/lib-dom/package.json' does not exist.
File '/home/src/projects/node_modules/@typescript/lib-dom.ts' does not exist.
File '/home/src/projects/node_modules/@typescript/lib-dom.tsx' does not exist.
File '/home/src/projects/node_modules/@typescript/lib-dom.d.ts' does not exist.
File '/home/src/projects/node_modules/@typescript/lib-dom/index.ts' does not exist.
File '/home/src/projects/node_modules/@typescript/lib-dom/index.tsx' does not exist.
File '/home/src/projects/node_modules/@typescript/lib-dom/index.d.ts' does not exist.
Directory '/home/src/projects/node_modules/@types' does not exist, skipping all lookups in it.
Scoped package detected, looking in 'typescript__lib-dom'
Directory '/home/src/node_modules' does not exist, skipping all lookups in it.
Scoped package detected, looking in 'typescript__lib-dom'
Directory '/home/node_modules' does not exist, skipping all lookups in it.
Scoped package detected, looking in 'typescript__lib-dom'
Directory '/node_modules' does not exist, skipping all lookups in it.
Scoped package detected, looking in 'typescript__lib-dom'
Loading module '@typescript/lib-dom' from 'node_modules' folder, target file types: JavaScript.
Searching all ancestor node_modules directories for fallback extensions: JavaScript.
Directory '/home/src/projects/project1/node_modules' does not exist, skipping all lookups in it.
File '/home/src/projects/node_modules/@typescript/lib-dom/package.json' does not exist according to earlier cached lookups.
File '/home/src/projects/node_modules/@typescript/lib-dom.js' does not exist.
File '/home/src/projects/node_modules/@typescript/lib-dom.jsx' does not exist.
File '/home/src/projects/node_modules/@typescript/lib-dom/index.js' does not exist.
File '/home/src/projects/node_modules/@typescript/lib-dom/index.jsx' does not exist.
Directory '/home/src/node_modules' does not exist, skipping all lookups in it.
Directory '/home/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
======== Module name '@typescript/lib-dom' was not resolved. ========
FileWatcher:: Added:: WatchInfo: /home/src/lib/lib.dom.d.ts 250 undefined Source file
../lib/lib.dom.d.ts
  Library 'lib.dom.d.ts' specified in compilerOptions
node_modules/@typescript/lib-webworker/index.d.ts
  Library referenced via 'webworker' from file 'project1/file2.ts'
node_modules/@typescript/lib-scripthost/index.d.ts
  Library referenced via 'scripthost' from file 'project1/file2.ts'
node_modules/@typescript/lib-es5/index.d.ts
  Library referenced via 'es5' from file 'project1/file2.ts'
  Library 'lib.es5.d.ts' specified in compilerOptions
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
[[90m12:02:05 AM[0m] Found 0 errors. Watching for file changes.



//// [/home/src/projects/project1/file.js] file written with same contents
//// [/home/src/projects/project1/file2.js] file written with same contents
//// [/home/src/projects/project1/index.js] file written with same contents
//// [/home/src/projects/project1/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../lib/lib.dom.d.ts","../node_modules/@typescript/lib-webworker/index.d.ts","../node_modules/@typescript/lib-scripthost/index.d.ts","../node_modules/@typescript/lib-es5/index.d.ts","./core.d.ts","./file.ts","./file2.ts","./index.ts","./utils.d.ts","./typeroot1/sometype/index.d.ts"],"fileInfos":[{"version":"-8673759361-interface DOMInterface { }","affectsGlobalScope":true},{"version":"-7827135529-interface WebworkerInterface { }","affectsGlobalScope":true},{"version":"-5403980302-interface ScriptHostInterface { }","affectsGlobalScope":true},{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},"-15683237936-export const core = 10;",{"version":"-16628394009-export const file = 10;","signature":"-9025507999-export declare const file = 10;\n"},{"version":"-11916614574-/// <reference lib=\"webworker\"/>\n/// <reference lib=\"scripthost\"/>\n/// <reference lib=\"es5\"/>\n","signature":"-14493813102-/// <reference lib=\"webworker\" />\n/// <reference lib=\"scripthost\" />\n/// <reference lib=\"es5\" />\n"},{"version":"-11532698187-export const x = \"type1\";","signature":"-5899226897-export declare const x = \"type1\";\n"},"-13729955264-export const y = 10;","-12476477079-export type TheNum = \"type1\";"],"root":[[5,10]],"options":{"composite":true},"referencedMap":[],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,4,3,2,5,6,7,8,10,9],"latestChangedDtsFile":"./index.d.ts"},"version":"FakeTSVersion"}

//// [/home/src/projects/project1/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../lib/lib.dom.d.ts",
      "../node_modules/@typescript/lib-webworker/index.d.ts",
      "../node_modules/@typescript/lib-scripthost/index.d.ts",
      "../node_modules/@typescript/lib-es5/index.d.ts",
      "./core.d.ts",
      "./file.ts",
      "./file2.ts",
      "./index.ts",
      "./utils.d.ts",
      "./typeroot1/sometype/index.d.ts"
    ],
    "fileInfos": {
      "../../lib/lib.dom.d.ts": {
        "original": {
          "version": "-8673759361-interface DOMInterface { }",
          "affectsGlobalScope": true
        },
        "version": "-8673759361-interface DOMInterface { }",
        "signature": "-8673759361-interface DOMInterface { }",
        "affectsGlobalScope": true
      },
      "../node_modules/@typescript/lib-webworker/index.d.ts": {
        "original": {
          "version": "-7827135529-interface WebworkerInterface { }",
          "affectsGlobalScope": true
        },
        "version": "-7827135529-interface WebworkerInterface { }",
        "signature": "-7827135529-interface WebworkerInterface { }",
        "affectsGlobalScope": true
      },
      "../node_modules/@typescript/lib-scripthost/index.d.ts": {
        "original": {
          "version": "-5403980302-interface ScriptHostInterface { }",
          "affectsGlobalScope": true
        },
        "version": "-5403980302-interface ScriptHostInterface { }",
        "signature": "-5403980302-interface ScriptHostInterface { }",
        "affectsGlobalScope": true
      },
      "../node_modules/@typescript/lib-es5/index.d.ts": {
        "original": {
          "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
          "affectsGlobalScope": true
        },
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
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
          "signature": "-14493813102-/// <reference lib=\"webworker\" />\n/// <reference lib=\"scripthost\" />\n/// <reference lib=\"es5\" />\n"
        },
        "version": "-11916614574-/// <reference lib=\"webworker\"/>\n/// <reference lib=\"scripthost\"/>\n/// <reference lib=\"es5\"/>\n",
        "signature": "-14493813102-/// <reference lib=\"webworker\" />\n/// <reference lib=\"scripthost\" />\n/// <reference lib=\"es5\" />\n"
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
    "referencedMap": {},
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.dom.d.ts",
      "../node_modules/@typescript/lib-es5/index.d.ts",
      "../node_modules/@typescript/lib-scripthost/index.d.ts",
      "../node_modules/@typescript/lib-webworker/index.d.ts",
      "./core.d.ts",
      "./file.ts",
      "./file2.ts",
      "./index.ts",
      "./typeroot1/sometype/index.d.ts",
      "./utils.d.ts"
    ],
    "latestChangedDtsFile": "./index.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 1877
}


PolledWatches::
/home/src/projects/project1/node_modules:
  {"pollingInterval":500}

FsWatches::
/home/src/lib/lib.dom.d.ts: *new*
  {}
/home/src/projects/node_modules/@typescript/lib-es5/index.d.ts:
  {}
/home/src/projects/node_modules/@typescript/lib-scripthost/index.d.ts:
  {}
/home/src/projects/node_modules/@typescript/lib-webworker/index.d.ts:
  {}
/home/src/projects/project1/core.d.ts:
  {}
/home/src/projects/project1/file.ts:
  {}
/home/src/projects/project1/file2.ts:
  {}
/home/src/projects/project1/index.ts:
  {}
/home/src/projects/project1/tsconfig.json:
  {}
/home/src/projects/project1/typeroot1/sometype/index.d.ts:
  {}
/home/src/projects/project1/utils.d.ts:
  {}

FsWatches *deleted*::
/home/src/projects/node_modules/@typescript/lib-dom/index.d.ts:
  {}

FsWatchesRecursive::
/home/src/projects/node_modules:
  {}
/home/src/projects/project1:
  {}
/home/src/projects/project1/typeroot1:
  {}

Timeout callback:: count: 0
2: timerToInvalidateFailedLookupResolutions *deleted*


Program root files: [
  "/home/src/projects/project1/core.d.ts",
  "/home/src/projects/project1/file.ts",
  "/home/src/projects/project1/file2.ts",
  "/home/src/projects/project1/index.ts",
  "/home/src/projects/project1/utils.d.ts",
  "/home/src/projects/project1/typeroot1/sometype/index.d.ts"
]
Program options: {
  "composite": true,
  "typeRoots": [
    "/home/src/projects/project1/typeroot1"
  ],
  "lib": [
    "lib.es5.d.ts",
    "lib.dom.d.ts"
  ],
  "traceResolution": true,
  "watch": true,
  "project": "/home/src/projects/project1",
  "explainFiles": true,
  "extendedDiagnostics": true,
  "configFilePath": "/home/src/projects/project1/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/lib/lib.dom.d.ts
/home/src/projects/node_modules/@typescript/lib-webworker/index.d.ts
/home/src/projects/node_modules/@typescript/lib-scripthost/index.d.ts
/home/src/projects/node_modules/@typescript/lib-es5/index.d.ts
/home/src/projects/project1/core.d.ts
/home/src/projects/project1/file.ts
/home/src/projects/project1/file2.ts
/home/src/projects/project1/index.ts
/home/src/projects/project1/utils.d.ts
/home/src/projects/project1/typeroot1/sometype/index.d.ts

Semantic diagnostics in builder refreshed for::
/home/src/lib/lib.dom.d.ts
/home/src/projects/node_modules/@typescript/lib-webworker/index.d.ts
/home/src/projects/node_modules/@typescript/lib-scripthost/index.d.ts
/home/src/projects/node_modules/@typescript/lib-es5/index.d.ts
/home/src/projects/project1/core.d.ts
/home/src/projects/project1/file.ts
/home/src/projects/project1/file2.ts
/home/src/projects/project1/index.ts
/home/src/projects/project1/utils.d.ts
/home/src/projects/project1/typeroot1/sometype/index.d.ts

Shape signatures in builder refreshed for::
/home/src/lib/lib.dom.d.ts (used version)
/home/src/projects/node_modules/@typescript/lib-webworker/index.d.ts (used version)
/home/src/projects/node_modules/@typescript/lib-scripthost/index.d.ts (used version)
/home/src/projects/project1/core.d.ts (used version)
/home/src/projects/project1/file.ts (computed .d.ts)
/home/src/projects/project1/file2.ts (computed .d.ts)
/home/src/projects/project1/index.ts (computed .d.ts)
/home/src/projects/project1/utils.d.ts (used version)
/home/src/projects/project1/typeroot1/sometype/index.d.ts (used version)

exitCode:: ExitStatus.undefined

Change:: edit index

Input::
//// [/home/src/projects/project1/index.ts]
export const x = "type1";export const xyz = 10;


Output::
FileWatcher:: Triggered with /home/src/projects/project1/index.ts 1:: WatchInfo: /home/src/projects/project1/index.ts 250 undefined Source file
Scheduling update
Elapsed:: *ms FileWatcher:: Triggered with /home/src/projects/project1/index.ts 1:: WatchInfo: /home/src/projects/project1/index.ts 250 undefined Source file


Timeout callback:: count: 1
3: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
3: timerToUpdateProgram

After running Timeout callback:: count: 0
Output::
Synchronizing program
[[90m12:02:11 AM[0m] File change detected. Starting incremental compilation...

CreatingProgramWith::
  roots: ["/home/src/projects/project1/core.d.ts","/home/src/projects/project1/file.ts","/home/src/projects/project1/file2.ts","/home/src/projects/project1/index.ts","/home/src/projects/project1/utils.d.ts","/home/src/projects/project1/typeroot1/sometype/index.d.ts"]
  options: {"composite":true,"typeRoots":["/home/src/projects/project1/typeroot1"],"lib":["lib.es5.d.ts","lib.dom.d.ts"],"traceResolution":true,"watch":true,"project":"/home/src/projects/project1","explainFiles":true,"extendedDiagnostics":true,"configFilePath":"/home/src/projects/project1/tsconfig.json"}
Reusing resolution of module '@typescript/lib-webworker' from '/home/src/projects/project1/__lib_node_modules_lookup_lib.webworker.d.ts__.ts' of old program, it was successfully resolved to '/home/src/projects/node_modules/@typescript/lib-webworker/index.d.ts'.
Reusing resolution of module '@typescript/lib-scripthost' from '/home/src/projects/project1/__lib_node_modules_lookup_lib.scripthost.d.ts__.ts' of old program, it was successfully resolved to '/home/src/projects/node_modules/@typescript/lib-scripthost/index.d.ts'.
Reusing resolution of module '@typescript/lib-es5' from '/home/src/projects/project1/__lib_node_modules_lookup_lib.es5.d.ts__.ts' of old program, it was successfully resolved to '/home/src/projects/node_modules/@typescript/lib-es5/index.d.ts'.
Reusing resolution of module '@typescript/lib-dom' from '/home/src/projects/project1/__lib_node_modules_lookup_lib.dom.d.ts__.ts' of old program, it was not resolved.
../lib/lib.dom.d.ts
  Library 'lib.dom.d.ts' specified in compilerOptions
node_modules/@typescript/lib-webworker/index.d.ts
  Library referenced via 'webworker' from file 'project1/file2.ts'
node_modules/@typescript/lib-scripthost/index.d.ts
  Library referenced via 'scripthost' from file 'project1/file2.ts'
node_modules/@typescript/lib-es5/index.d.ts
  Library referenced via 'es5' from file 'project1/file2.ts'
  Library 'lib.es5.d.ts' specified in compilerOptions
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
[[90m12:02:21 AM[0m] Found 0 errors. Watching for file changes.



//// [/home/src/projects/project1/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.xyz = exports.x = void 0;
exports.x = "type1";
exports.xyz = 10;


//// [/home/src/projects/project1/index.d.ts]
export declare const x = "type1";
export declare const xyz = 10;


//// [/home/src/projects/project1/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../lib/lib.dom.d.ts","../node_modules/@typescript/lib-webworker/index.d.ts","../node_modules/@typescript/lib-scripthost/index.d.ts","../node_modules/@typescript/lib-es5/index.d.ts","./core.d.ts","./file.ts","./file2.ts","./index.ts","./utils.d.ts","./typeroot1/sometype/index.d.ts"],"fileInfos":[{"version":"-8673759361-interface DOMInterface { }","affectsGlobalScope":true},{"version":"-7827135529-interface WebworkerInterface { }","affectsGlobalScope":true},{"version":"-5403980302-interface ScriptHostInterface { }","affectsGlobalScope":true},{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},"-15683237936-export const core = 10;",{"version":"-16628394009-export const file = 10;","signature":"-9025507999-export declare const file = 10;\n"},{"version":"-11916614574-/// <reference lib=\"webworker\"/>\n/// <reference lib=\"scripthost\"/>\n/// <reference lib=\"es5\"/>\n","signature":"-14493813102-/// <reference lib=\"webworker\" />\n/// <reference lib=\"scripthost\" />\n/// <reference lib=\"es5\" />\n"},{"version":"-6136895998-export const x = \"type1\";export const xyz = 10;","signature":"-9988949802-export declare const x = \"type1\";\nexport declare const xyz = 10;\n"},"-13729955264-export const y = 10;","-12476477079-export type TheNum = \"type1\";"],"root":[[5,10]],"options":{"composite":true},"referencedMap":[],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,4,3,2,5,6,7,8,10,9],"latestChangedDtsFile":"./index.d.ts"},"version":"FakeTSVersion"}

//// [/home/src/projects/project1/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../lib/lib.dom.d.ts",
      "../node_modules/@typescript/lib-webworker/index.d.ts",
      "../node_modules/@typescript/lib-scripthost/index.d.ts",
      "../node_modules/@typescript/lib-es5/index.d.ts",
      "./core.d.ts",
      "./file.ts",
      "./file2.ts",
      "./index.ts",
      "./utils.d.ts",
      "./typeroot1/sometype/index.d.ts"
    ],
    "fileInfos": {
      "../../lib/lib.dom.d.ts": {
        "original": {
          "version": "-8673759361-interface DOMInterface { }",
          "affectsGlobalScope": true
        },
        "version": "-8673759361-interface DOMInterface { }",
        "signature": "-8673759361-interface DOMInterface { }",
        "affectsGlobalScope": true
      },
      "../node_modules/@typescript/lib-webworker/index.d.ts": {
        "original": {
          "version": "-7827135529-interface WebworkerInterface { }",
          "affectsGlobalScope": true
        },
        "version": "-7827135529-interface WebworkerInterface { }",
        "signature": "-7827135529-interface WebworkerInterface { }",
        "affectsGlobalScope": true
      },
      "../node_modules/@typescript/lib-scripthost/index.d.ts": {
        "original": {
          "version": "-5403980302-interface ScriptHostInterface { }",
          "affectsGlobalScope": true
        },
        "version": "-5403980302-interface ScriptHostInterface { }",
        "signature": "-5403980302-interface ScriptHostInterface { }",
        "affectsGlobalScope": true
      },
      "../node_modules/@typescript/lib-es5/index.d.ts": {
        "original": {
          "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
          "affectsGlobalScope": true
        },
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
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
          "signature": "-14493813102-/// <reference lib=\"webworker\" />\n/// <reference lib=\"scripthost\" />\n/// <reference lib=\"es5\" />\n"
        },
        "version": "-11916614574-/// <reference lib=\"webworker\"/>\n/// <reference lib=\"scripthost\"/>\n/// <reference lib=\"es5\"/>\n",
        "signature": "-14493813102-/// <reference lib=\"webworker\" />\n/// <reference lib=\"scripthost\" />\n/// <reference lib=\"es5\" />\n"
      },
      "./index.ts": {
        "original": {
          "version": "-6136895998-export const x = \"type1\";export const xyz = 10;",
          "signature": "-9988949802-export declare const x = \"type1\";\nexport declare const xyz = 10;\n"
        },
        "version": "-6136895998-export const x = \"type1\";export const xyz = 10;",
        "signature": "-9988949802-export declare const x = \"type1\";\nexport declare const xyz = 10;\n"
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
    "referencedMap": {},
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.dom.d.ts",
      "../node_modules/@typescript/lib-es5/index.d.ts",
      "../node_modules/@typescript/lib-scripthost/index.d.ts",
      "../node_modules/@typescript/lib-webworker/index.d.ts",
      "./core.d.ts",
      "./file.ts",
      "./file2.ts",
      "./index.ts",
      "./typeroot1/sometype/index.d.ts",
      "./utils.d.ts"
    ],
    "latestChangedDtsFile": "./index.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 1930
}



Program root files: [
  "/home/src/projects/project1/core.d.ts",
  "/home/src/projects/project1/file.ts",
  "/home/src/projects/project1/file2.ts",
  "/home/src/projects/project1/index.ts",
  "/home/src/projects/project1/utils.d.ts",
  "/home/src/projects/project1/typeroot1/sometype/index.d.ts"
]
Program options: {
  "composite": true,
  "typeRoots": [
    "/home/src/projects/project1/typeroot1"
  ],
  "lib": [
    "lib.es5.d.ts",
    "lib.dom.d.ts"
  ],
  "traceResolution": true,
  "watch": true,
  "project": "/home/src/projects/project1",
  "explainFiles": true,
  "extendedDiagnostics": true,
  "configFilePath": "/home/src/projects/project1/tsconfig.json"
}
Program structureReused: Completely
Program files::
/home/src/lib/lib.dom.d.ts
/home/src/projects/node_modules/@typescript/lib-webworker/index.d.ts
/home/src/projects/node_modules/@typescript/lib-scripthost/index.d.ts
/home/src/projects/node_modules/@typescript/lib-es5/index.d.ts
/home/src/projects/project1/core.d.ts
/home/src/projects/project1/file.ts
/home/src/projects/project1/file2.ts
/home/src/projects/project1/index.ts
/home/src/projects/project1/utils.d.ts
/home/src/projects/project1/typeroot1/sometype/index.d.ts

Semantic diagnostics in builder refreshed for::
/home/src/projects/project1/index.ts

Shape signatures in builder refreshed for::
/home/src/projects/project1/index.ts (computed .d.ts)

exitCode:: ExitStatus.undefined

Change:: delete core

Input::
//// [/home/src/projects/project1/core.d.ts] deleted

Output::
FileWatcher:: Triggered with /home/src/projects/project1/core.d.ts 2:: WatchInfo: /home/src/projects/project1/core.d.ts 250 undefined Source file
Scheduling update
Elapsed:: *ms FileWatcher:: Triggered with /home/src/projects/project1/core.d.ts 2:: WatchInfo: /home/src/projects/project1/core.d.ts 250 undefined Source file
DirectoryWatcher:: Triggered with /home/src/projects/project1/core.d.ts :: WatchInfo: /home/src/projects/project1 1 undefined Wild card directory
Scheduling update
Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/projects/project1/core.d.ts :: WatchInfo: /home/src/projects/project1 1 undefined Wild card directory


Timeout callback:: count: 1
5: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
5: timerToUpdateProgram

After running Timeout callback:: count: 0
Output::
Reloading new file names and options
Synchronizing program
[[90m12:02:26 AM[0m] File change detected. Starting incremental compilation...

CreatingProgramWith::
  roots: ["/home/src/projects/project1/file.ts","/home/src/projects/project1/file2.ts","/home/src/projects/project1/index.ts","/home/src/projects/project1/utils.d.ts","/home/src/projects/project1/typeroot1/sometype/index.d.ts"]
  options: {"composite":true,"typeRoots":["/home/src/projects/project1/typeroot1"],"lib":["lib.es5.d.ts","lib.dom.d.ts"],"traceResolution":true,"watch":true,"project":"/home/src/projects/project1","explainFiles":true,"extendedDiagnostics":true,"configFilePath":"/home/src/projects/project1/tsconfig.json"}
Reusing resolution of module '@typescript/lib-webworker' from '/home/src/projects/project1/__lib_node_modules_lookup_lib.webworker.d.ts__.ts' of old program, it was successfully resolved to '/home/src/projects/node_modules/@typescript/lib-webworker/index.d.ts'.
Reusing resolution of module '@typescript/lib-scripthost' from '/home/src/projects/project1/__lib_node_modules_lookup_lib.scripthost.d.ts__.ts' of old program, it was successfully resolved to '/home/src/projects/node_modules/@typescript/lib-scripthost/index.d.ts'.
Reusing resolution of module '@typescript/lib-es5' from '/home/src/projects/project1/__lib_node_modules_lookup_lib.es5.d.ts__.ts' of old program, it was successfully resolved to '/home/src/projects/node_modules/@typescript/lib-es5/index.d.ts'.
Reusing resolution of type reference directive 'sometype' from '/home/src/projects/project1/__inferred type names__.ts' of old program, it was successfully resolved to '/home/src/projects/project1/typeroot1/sometype/index.d.ts'.
Reusing resolution of module '@typescript/lib-dom' from '/home/src/projects/project1/__lib_node_modules_lookup_lib.dom.d.ts__.ts' of old program, it was not resolved.
FileWatcher:: Close:: WatchInfo: /home/src/projects/project1/core.d.ts 250 undefined Source file
../lib/lib.dom.d.ts
  Library 'lib.dom.d.ts' specified in compilerOptions
node_modules/@typescript/lib-webworker/index.d.ts
  Library referenced via 'webworker' from file 'project1/file2.ts'
node_modules/@typescript/lib-scripthost/index.d.ts
  Library referenced via 'scripthost' from file 'project1/file2.ts'
node_modules/@typescript/lib-es5/index.d.ts
  Library referenced via 'es5' from file 'project1/file2.ts'
  Library 'lib.es5.d.ts' specified in compilerOptions
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
[[90m12:02:30 AM[0m] Found 0 errors. Watching for file changes.



//// [/home/src/projects/project1/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../lib/lib.dom.d.ts","../node_modules/@typescript/lib-webworker/index.d.ts","../node_modules/@typescript/lib-scripthost/index.d.ts","../node_modules/@typescript/lib-es5/index.d.ts","./file.ts","./file2.ts","./index.ts","./utils.d.ts","./typeroot1/sometype/index.d.ts"],"fileInfos":[{"version":"-8673759361-interface DOMInterface { }","affectsGlobalScope":true},{"version":"-7827135529-interface WebworkerInterface { }","affectsGlobalScope":true},{"version":"-5403980302-interface ScriptHostInterface { }","affectsGlobalScope":true},{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-16628394009-export const file = 10;","signature":"-9025507999-export declare const file = 10;\n"},{"version":"-11916614574-/// <reference lib=\"webworker\"/>\n/// <reference lib=\"scripthost\"/>\n/// <reference lib=\"es5\"/>\n","signature":"-14493813102-/// <reference lib=\"webworker\" />\n/// <reference lib=\"scripthost\" />\n/// <reference lib=\"es5\" />\n"},{"version":"-6136895998-export const x = \"type1\";export const xyz = 10;","signature":"-9988949802-export declare const x = \"type1\";\nexport declare const xyz = 10;\n"},"-13729955264-export const y = 10;","-12476477079-export type TheNum = \"type1\";"],"root":[[5,9]],"options":{"composite":true},"referencedMap":[],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,4,3,2,5,6,7,9,8],"latestChangedDtsFile":"./index.d.ts"},"version":"FakeTSVersion"}

//// [/home/src/projects/project1/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../lib/lib.dom.d.ts",
      "../node_modules/@typescript/lib-webworker/index.d.ts",
      "../node_modules/@typescript/lib-scripthost/index.d.ts",
      "../node_modules/@typescript/lib-es5/index.d.ts",
      "./file.ts",
      "./file2.ts",
      "./index.ts",
      "./utils.d.ts",
      "./typeroot1/sometype/index.d.ts"
    ],
    "fileInfos": {
      "../../lib/lib.dom.d.ts": {
        "original": {
          "version": "-8673759361-interface DOMInterface { }",
          "affectsGlobalScope": true
        },
        "version": "-8673759361-interface DOMInterface { }",
        "signature": "-8673759361-interface DOMInterface { }",
        "affectsGlobalScope": true
      },
      "../node_modules/@typescript/lib-webworker/index.d.ts": {
        "original": {
          "version": "-7827135529-interface WebworkerInterface { }",
          "affectsGlobalScope": true
        },
        "version": "-7827135529-interface WebworkerInterface { }",
        "signature": "-7827135529-interface WebworkerInterface { }",
        "affectsGlobalScope": true
      },
      "../node_modules/@typescript/lib-scripthost/index.d.ts": {
        "original": {
          "version": "-5403980302-interface ScriptHostInterface { }",
          "affectsGlobalScope": true
        },
        "version": "-5403980302-interface ScriptHostInterface { }",
        "signature": "-5403980302-interface ScriptHostInterface { }",
        "affectsGlobalScope": true
      },
      "../node_modules/@typescript/lib-es5/index.d.ts": {
        "original": {
          "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
          "affectsGlobalScope": true
        },
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
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
          "signature": "-14493813102-/// <reference lib=\"webworker\" />\n/// <reference lib=\"scripthost\" />\n/// <reference lib=\"es5\" />\n"
        },
        "version": "-11916614574-/// <reference lib=\"webworker\"/>\n/// <reference lib=\"scripthost\"/>\n/// <reference lib=\"es5\"/>\n",
        "signature": "-14493813102-/// <reference lib=\"webworker\" />\n/// <reference lib=\"scripthost\" />\n/// <reference lib=\"es5\" />\n"
      },
      "./index.ts": {
        "original": {
          "version": "-6136895998-export const x = \"type1\";export const xyz = 10;",
          "signature": "-9988949802-export declare const x = \"type1\";\nexport declare const xyz = 10;\n"
        },
        "version": "-6136895998-export const x = \"type1\";export const xyz = 10;",
        "signature": "-9988949802-export declare const x = \"type1\";\nexport declare const xyz = 10;\n"
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
    "referencedMap": {},
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.dom.d.ts",
      "../node_modules/@typescript/lib-es5/index.d.ts",
      "../node_modules/@typescript/lib-scripthost/index.d.ts",
      "../node_modules/@typescript/lib-webworker/index.d.ts",
      "./file.ts",
      "./file2.ts",
      "./index.ts",
      "./typeroot1/sometype/index.d.ts",
      "./utils.d.ts"
    ],
    "latestChangedDtsFile": "./index.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 1873
}


PolledWatches::
/home/src/projects/project1/node_modules:
  {"pollingInterval":500}

FsWatches::
/home/src/lib/lib.dom.d.ts:
  {}
/home/src/projects/node_modules/@typescript/lib-es5/index.d.ts:
  {}
/home/src/projects/node_modules/@typescript/lib-scripthost/index.d.ts:
  {}
/home/src/projects/node_modules/@typescript/lib-webworker/index.d.ts:
  {}
/home/src/projects/project1/file.ts:
  {}
/home/src/projects/project1/file2.ts:
  {}
/home/src/projects/project1/index.ts:
  {}
/home/src/projects/project1/tsconfig.json:
  {}
/home/src/projects/project1/typeroot1/sometype/index.d.ts:
  {}
/home/src/projects/project1/utils.d.ts:
  {}

FsWatches *deleted*::
/home/src/projects/project1/core.d.ts:
  {}

FsWatchesRecursive::
/home/src/projects/node_modules:
  {}
/home/src/projects/project1:
  {}
/home/src/projects/project1/typeroot1:
  {}


Program root files: [
  "/home/src/projects/project1/file.ts",
  "/home/src/projects/project1/file2.ts",
  "/home/src/projects/project1/index.ts",
  "/home/src/projects/project1/utils.d.ts",
  "/home/src/projects/project1/typeroot1/sometype/index.d.ts"
]
Program options: {
  "composite": true,
  "typeRoots": [
    "/home/src/projects/project1/typeroot1"
  ],
  "lib": [
    "lib.es5.d.ts",
    "lib.dom.d.ts"
  ],
  "traceResolution": true,
  "watch": true,
  "project": "/home/src/projects/project1",
  "explainFiles": true,
  "extendedDiagnostics": true,
  "configFilePath": "/home/src/projects/project1/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/lib/lib.dom.d.ts
/home/src/projects/node_modules/@typescript/lib-webworker/index.d.ts
/home/src/projects/node_modules/@typescript/lib-scripthost/index.d.ts
/home/src/projects/node_modules/@typescript/lib-es5/index.d.ts
/home/src/projects/project1/file.ts
/home/src/projects/project1/file2.ts
/home/src/projects/project1/index.ts
/home/src/projects/project1/utils.d.ts
/home/src/projects/project1/typeroot1/sometype/index.d.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

exitCode:: ExitStatus.undefined

Change:: write redirect file dom

Input::
//// [/home/src/projects/node_modules/@typescript/lib-dom/index.d.ts]
interface DOMInterface { }


Output::
DirectoryWatcher:: Triggered with /home/src/projects/node_modules/@typescript/lib-dom/index.d.ts :: WatchInfo: /home/src/projects/node_modules 1 undefined Failed Lookup Locations
Scheduling invalidateFailedLookup
Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/projects/node_modules/@typescript/lib-dom/index.d.ts :: WatchInfo: /home/src/projects/node_modules 1 undefined Failed Lookup Locations


Timeout callback:: count: 1
6: timerToInvalidateFailedLookupResolutions *new*

Before running Timeout callback:: count: 1
6: timerToInvalidateFailedLookupResolutions

After running Timeout callback:: count: 1
Output::
Scheduling update



Timeout callback:: count: 1
7: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
7: timerToUpdateProgram

After running Timeout callback:: count: 0
Output::
Synchronizing program
[[90m12:02:37 AM[0m] File change detected. Starting incremental compilation...

CreatingProgramWith::
  roots: ["/home/src/projects/project1/file.ts","/home/src/projects/project1/file2.ts","/home/src/projects/project1/index.ts","/home/src/projects/project1/utils.d.ts","/home/src/projects/project1/typeroot1/sometype/index.d.ts"]
  options: {"composite":true,"typeRoots":["/home/src/projects/project1/typeroot1"],"lib":["lib.es5.d.ts","lib.dom.d.ts"],"traceResolution":true,"watch":true,"project":"/home/src/projects/project1","explainFiles":true,"extendedDiagnostics":true,"configFilePath":"/home/src/projects/project1/tsconfig.json"}
Reusing resolution of module '@typescript/lib-webworker' from '/home/src/projects/project1/__lib_node_modules_lookup_lib.webworker.d.ts__.ts' of old program, it was successfully resolved to '/home/src/projects/node_modules/@typescript/lib-webworker/index.d.ts'.
Reusing resolution of module '@typescript/lib-scripthost' from '/home/src/projects/project1/__lib_node_modules_lookup_lib.scripthost.d.ts__.ts' of old program, it was successfully resolved to '/home/src/projects/node_modules/@typescript/lib-scripthost/index.d.ts'.
Reusing resolution of module '@typescript/lib-es5' from '/home/src/projects/project1/__lib_node_modules_lookup_lib.es5.d.ts__.ts' of old program, it was successfully resolved to '/home/src/projects/node_modules/@typescript/lib-es5/index.d.ts'.
======== Resolving module '@typescript/lib-dom' from '/home/src/projects/project1/__lib_node_modules_lookup_lib.dom.d.ts__.ts'. ========
Explicitly specified module resolution kind: 'Node10'.
Loading module '@typescript/lib-dom' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Directory '/home/src/projects/project1/node_modules' does not exist, skipping all lookups in it.
Scoped package detected, looking in 'typescript__lib-dom'
File '/home/src/projects/node_modules/@typescript/lib-dom/package.json' does not exist.
File '/home/src/projects/node_modules/@typescript/lib-dom.ts' does not exist.
File '/home/src/projects/node_modules/@typescript/lib-dom.tsx' does not exist.
File '/home/src/projects/node_modules/@typescript/lib-dom.d.ts' does not exist.
File '/home/src/projects/node_modules/@typescript/lib-dom/index.ts' does not exist.
File '/home/src/projects/node_modules/@typescript/lib-dom/index.tsx' does not exist.
File '/home/src/projects/node_modules/@typescript/lib-dom/index.d.ts' exists - use it as a name resolution result.
Resolving real path for '/home/src/projects/node_modules/@typescript/lib-dom/index.d.ts', result '/home/src/projects/node_modules/@typescript/lib-dom/index.d.ts'.
======== Module name '@typescript/lib-dom' was successfully resolved to '/home/src/projects/node_modules/@typescript/lib-dom/index.d.ts'. ========
Reusing resolution of type reference directive 'sometype' from '/home/src/projects/project1/__inferred type names__.ts' of old program, it was successfully resolved to '/home/src/projects/project1/typeroot1/sometype/index.d.ts'.
FileWatcher:: Added:: WatchInfo: /home/src/projects/node_modules/@typescript/lib-dom/index.d.ts 250 undefined Source file
FileWatcher:: Close:: WatchInfo: /home/src/lib/lib.dom.d.ts 250 undefined Source file
node_modules/@typescript/lib-webworker/index.d.ts
  Library referenced via 'webworker' from file 'project1/file2.ts'
node_modules/@typescript/lib-scripthost/index.d.ts
  Library referenced via 'scripthost' from file 'project1/file2.ts'
node_modules/@typescript/lib-es5/index.d.ts
  Library referenced via 'es5' from file 'project1/file2.ts'
  Library 'lib.es5.d.ts' specified in compilerOptions
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
[[90m12:02:50 AM[0m] Found 0 errors. Watching for file changes.



//// [/home/src/projects/project1/file.js] file written with same contents
//// [/home/src/projects/project1/file2.js] file written with same contents
//// [/home/src/projects/project1/index.js] file written with same contents
//// [/home/src/projects/project1/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../node_modules/@typescript/lib-webworker/index.d.ts","../node_modules/@typescript/lib-scripthost/index.d.ts","../node_modules/@typescript/lib-es5/index.d.ts","../node_modules/@typescript/lib-dom/index.d.ts","./file.ts","./file2.ts","./index.ts","./utils.d.ts","./typeroot1/sometype/index.d.ts"],"fileInfos":[{"version":"-7827135529-interface WebworkerInterface { }","affectsGlobalScope":true},{"version":"-5403980302-interface ScriptHostInterface { }","affectsGlobalScope":true},{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-8673759361-interface DOMInterface { }","affectsGlobalScope":true},{"version":"-16628394009-export const file = 10;","signature":"-9025507999-export declare const file = 10;\n"},{"version":"-11916614574-/// <reference lib=\"webworker\"/>\n/// <reference lib=\"scripthost\"/>\n/// <reference lib=\"es5\"/>\n","signature":"-14493813102-/// <reference lib=\"webworker\" />\n/// <reference lib=\"scripthost\" />\n/// <reference lib=\"es5\" />\n"},{"version":"-6136895998-export const x = \"type1\";export const xyz = 10;","signature":"-9988949802-export declare const x = \"type1\";\nexport declare const xyz = 10;\n"},"-13729955264-export const y = 10;","-12476477079-export type TheNum = \"type1\";"],"root":[[5,9]],"options":{"composite":true},"referencedMap":[],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[4,3,2,1,5,6,7,9,8],"latestChangedDtsFile":"./index.d.ts"},"version":"FakeTSVersion"}

//// [/home/src/projects/project1/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../node_modules/@typescript/lib-webworker/index.d.ts",
      "../node_modules/@typescript/lib-scripthost/index.d.ts",
      "../node_modules/@typescript/lib-es5/index.d.ts",
      "../node_modules/@typescript/lib-dom/index.d.ts",
      "./file.ts",
      "./file2.ts",
      "./index.ts",
      "./utils.d.ts",
      "./typeroot1/sometype/index.d.ts"
    ],
    "fileInfos": {
      "../node_modules/@typescript/lib-webworker/index.d.ts": {
        "original": {
          "version": "-7827135529-interface WebworkerInterface { }",
          "affectsGlobalScope": true
        },
        "version": "-7827135529-interface WebworkerInterface { }",
        "signature": "-7827135529-interface WebworkerInterface { }",
        "affectsGlobalScope": true
      },
      "../node_modules/@typescript/lib-scripthost/index.d.ts": {
        "original": {
          "version": "-5403980302-interface ScriptHostInterface { }",
          "affectsGlobalScope": true
        },
        "version": "-5403980302-interface ScriptHostInterface { }",
        "signature": "-5403980302-interface ScriptHostInterface { }",
        "affectsGlobalScope": true
      },
      "../node_modules/@typescript/lib-es5/index.d.ts": {
        "original": {
          "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
          "affectsGlobalScope": true
        },
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "../node_modules/@typescript/lib-dom/index.d.ts": {
        "original": {
          "version": "-8673759361-interface DOMInterface { }",
          "affectsGlobalScope": true
        },
        "version": "-8673759361-interface DOMInterface { }",
        "signature": "-8673759361-interface DOMInterface { }",
        "affectsGlobalScope": true
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
          "signature": "-14493813102-/// <reference lib=\"webworker\" />\n/// <reference lib=\"scripthost\" />\n/// <reference lib=\"es5\" />\n"
        },
        "version": "-11916614574-/// <reference lib=\"webworker\"/>\n/// <reference lib=\"scripthost\"/>\n/// <reference lib=\"es5\"/>\n",
        "signature": "-14493813102-/// <reference lib=\"webworker\" />\n/// <reference lib=\"scripthost\" />\n/// <reference lib=\"es5\" />\n"
      },
      "./index.ts": {
        "original": {
          "version": "-6136895998-export const x = \"type1\";export const xyz = 10;",
          "signature": "-9988949802-export declare const x = \"type1\";\nexport declare const xyz = 10;\n"
        },
        "version": "-6136895998-export const x = \"type1\";export const xyz = 10;",
        "signature": "-9988949802-export declare const x = \"type1\";\nexport declare const xyz = 10;\n"
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
    "referencedMap": {},
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../node_modules/@typescript/lib-dom/index.d.ts",
      "../node_modules/@typescript/lib-es5/index.d.ts",
      "../node_modules/@typescript/lib-scripthost/index.d.ts",
      "../node_modules/@typescript/lib-webworker/index.d.ts",
      "./file.ts",
      "./file2.ts",
      "./index.ts",
      "./typeroot1/sometype/index.d.ts",
      "./utils.d.ts"
    ],
    "latestChangedDtsFile": "./index.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 1897
}


PolledWatches::
/home/src/projects/project1/node_modules:
  {"pollingInterval":500}

FsWatches::
/home/src/projects/node_modules/@typescript/lib-dom/index.d.ts: *new*
  {}
/home/src/projects/node_modules/@typescript/lib-es5/index.d.ts:
  {}
/home/src/projects/node_modules/@typescript/lib-scripthost/index.d.ts:
  {}
/home/src/projects/node_modules/@typescript/lib-webworker/index.d.ts:
  {}
/home/src/projects/project1/file.ts:
  {}
/home/src/projects/project1/file2.ts:
  {}
/home/src/projects/project1/index.ts:
  {}
/home/src/projects/project1/tsconfig.json:
  {}
/home/src/projects/project1/typeroot1/sometype/index.d.ts:
  {}
/home/src/projects/project1/utils.d.ts:
  {}

FsWatches *deleted*::
/home/src/lib/lib.dom.d.ts:
  {}

FsWatchesRecursive::
/home/src/projects/node_modules:
  {}
/home/src/projects/project1:
  {}
/home/src/projects/project1/typeroot1:
  {}


Program root files: [
  "/home/src/projects/project1/file.ts",
  "/home/src/projects/project1/file2.ts",
  "/home/src/projects/project1/index.ts",
  "/home/src/projects/project1/utils.d.ts",
  "/home/src/projects/project1/typeroot1/sometype/index.d.ts"
]
Program options: {
  "composite": true,
  "typeRoots": [
    "/home/src/projects/project1/typeroot1"
  ],
  "lib": [
    "lib.es5.d.ts",
    "lib.dom.d.ts"
  ],
  "traceResolution": true,
  "watch": true,
  "project": "/home/src/projects/project1",
  "explainFiles": true,
  "extendedDiagnostics": true,
  "configFilePath": "/home/src/projects/project1/tsconfig.json"
}
Program structureReused: SafeModules
Program files::
/home/src/projects/node_modules/@typescript/lib-webworker/index.d.ts
/home/src/projects/node_modules/@typescript/lib-scripthost/index.d.ts
/home/src/projects/node_modules/@typescript/lib-es5/index.d.ts
/home/src/projects/node_modules/@typescript/lib-dom/index.d.ts
/home/src/projects/project1/file.ts
/home/src/projects/project1/file2.ts
/home/src/projects/project1/index.ts
/home/src/projects/project1/utils.d.ts
/home/src/projects/project1/typeroot1/sometype/index.d.ts

Semantic diagnostics in builder refreshed for::
/home/src/projects/node_modules/@typescript/lib-webworker/index.d.ts
/home/src/projects/node_modules/@typescript/lib-scripthost/index.d.ts
/home/src/projects/node_modules/@typescript/lib-es5/index.d.ts
/home/src/projects/node_modules/@typescript/lib-dom/index.d.ts
/home/src/projects/project1/file.ts
/home/src/projects/project1/file2.ts
/home/src/projects/project1/index.ts
/home/src/projects/project1/utils.d.ts
/home/src/projects/project1/typeroot1/sometype/index.d.ts

Shape signatures in builder refreshed for::
/home/src/projects/node_modules/@typescript/lib-dom/index.d.ts (used version)
/home/src/projects/node_modules/@typescript/lib-webworker/index.d.ts (used version)
/home/src/projects/node_modules/@typescript/lib-scripthost/index.d.ts (used version)
/home/src/projects/project1/file.ts (computed .d.ts)
/home/src/projects/project1/file2.ts (computed .d.ts)
/home/src/projects/project1/index.ts (computed .d.ts)
/home/src/projects/project1/utils.d.ts (used version)
/home/src/projects/project1/typeroot1/sometype/index.d.ts (used version)

exitCode:: ExitStatus.undefined

Change:: change program options to update module resolution

Input::
//// [/home/src/projects/project1/tsconfig.json]
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
    "traceResolution": true
  }
}


Output::
FileWatcher:: Triggered with /home/src/projects/project1/tsconfig.json 1:: WatchInfo: /home/src/projects/project1/tsconfig.json 2000 undefined Config file
Scheduling update
Elapsed:: *ms FileWatcher:: Triggered with /home/src/projects/project1/tsconfig.json 1:: WatchInfo: /home/src/projects/project1/tsconfig.json 2000 undefined Config file


Timeout callback:: count: 1
8: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
8: timerToUpdateProgram

After running Timeout callback:: count: 0
Output::
Reloading config file: /home/src/projects/project1/tsconfig.json
Synchronizing program
[[90m12:02:57 AM[0m] File change detected. Starting incremental compilation...

CreatingProgramWith::
  roots: ["/home/src/projects/project1/file.ts","/home/src/projects/project1/file2.ts","/home/src/projects/project1/index.ts","/home/src/projects/project1/utils.d.ts","/home/src/projects/project1/typeroot1/sometype/index.d.ts"]
  options: {"composite":true,"typeRoots":["/home/src/projects/project1/typeroot1","/home/src/projects/project1/typeroot2"],"lib":["lib.es5.d.ts","lib.dom.d.ts"],"traceResolution":true,"watch":true,"project":"/home/src/projects/project1","explainFiles":true,"extendedDiagnostics":true,"configFilePath":"/home/src/projects/project1/tsconfig.json"}
Reusing resolution of module '@typescript/lib-webworker' from '/home/src/projects/project1/__lib_node_modules_lookup_lib.webworker.d.ts__.ts' of old program, it was successfully resolved to '/home/src/projects/node_modules/@typescript/lib-webworker/index.d.ts'.
Reusing resolution of module '@typescript/lib-scripthost' from '/home/src/projects/project1/__lib_node_modules_lookup_lib.scripthost.d.ts__.ts' of old program, it was successfully resolved to '/home/src/projects/node_modules/@typescript/lib-scripthost/index.d.ts'.
Reusing resolution of module '@typescript/lib-es5' from '/home/src/projects/project1/__lib_node_modules_lookup_lib.es5.d.ts__.ts' of old program, it was successfully resolved to '/home/src/projects/node_modules/@typescript/lib-es5/index.d.ts'.
======== Resolving type reference directive 'sometype', containing file '/home/src/projects/project1/__inferred type names__.ts', root directory '/home/src/projects/project1/typeroot1,/home/src/projects/project1/typeroot2'. ========
Resolving with primary search path '/home/src/projects/project1/typeroot1, /home/src/projects/project1/typeroot2'.
File '/home/src/projects/project1/typeroot1/sometype.d.ts' does not exist.
File '/home/src/projects/project1/typeroot1/sometype/package.json' does not exist according to earlier cached lookups.
File '/home/src/projects/project1/typeroot1/sometype/index.d.ts' exists - use it as a name resolution result.
Resolving real path for '/home/src/projects/project1/typeroot1/sometype/index.d.ts', result '/home/src/projects/project1/typeroot1/sometype/index.d.ts'.
======== Type reference directive 'sometype' was successfully resolved to '/home/src/projects/project1/typeroot1/sometype/index.d.ts', primary: true. ========
Reusing resolution of module '@typescript/lib-dom' from '/home/src/projects/project1/__lib_node_modules_lookup_lib.dom.d.ts__.ts' of old program, it was successfully resolved to '/home/src/projects/node_modules/@typescript/lib-dom/index.d.ts'.
DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project1/typeroot2 1 undefined Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project1/typeroot2 1 undefined Type roots
node_modules/@typescript/lib-webworker/index.d.ts
  Library referenced via 'webworker' from file 'project1/file2.ts'
node_modules/@typescript/lib-scripthost/index.d.ts
  Library referenced via 'scripthost' from file 'project1/file2.ts'
node_modules/@typescript/lib-es5/index.d.ts
  Library referenced via 'es5' from file 'project1/file2.ts'
  Library 'lib.es5.d.ts' specified in compilerOptions
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
[[90m12:02:58 AM[0m] Found 0 errors. Watching for file changes.




PolledWatches::
/home/src/projects/project1/node_modules:
  {"pollingInterval":500}
/home/src/projects/project1/typeroot2: *new*
  {"pollingInterval":500}

FsWatches::
/home/src/projects/node_modules/@typescript/lib-dom/index.d.ts:
  {}
/home/src/projects/node_modules/@typescript/lib-es5/index.d.ts:
  {}
/home/src/projects/node_modules/@typescript/lib-scripthost/index.d.ts:
  {}
/home/src/projects/node_modules/@typescript/lib-webworker/index.d.ts:
  {}
/home/src/projects/project1/file.ts:
  {}
/home/src/projects/project1/file2.ts:
  {}
/home/src/projects/project1/index.ts:
  {}
/home/src/projects/project1/tsconfig.json:
  {}
/home/src/projects/project1/typeroot1/sometype/index.d.ts:
  {}
/home/src/projects/project1/utils.d.ts:
  {}

FsWatchesRecursive::
/home/src/projects/node_modules:
  {}
/home/src/projects/project1:
  {}
/home/src/projects/project1/typeroot1:
  {}


Program root files: [
  "/home/src/projects/project1/file.ts",
  "/home/src/projects/project1/file2.ts",
  "/home/src/projects/project1/index.ts",
  "/home/src/projects/project1/utils.d.ts",
  "/home/src/projects/project1/typeroot1/sometype/index.d.ts"
]
Program options: {
  "composite": true,
  "typeRoots": [
    "/home/src/projects/project1/typeroot1",
    "/home/src/projects/project1/typeroot2"
  ],
  "lib": [
    "lib.es5.d.ts",
    "lib.dom.d.ts"
  ],
  "traceResolution": true,
  "watch": true,
  "project": "/home/src/projects/project1",
  "explainFiles": true,
  "extendedDiagnostics": true,
  "configFilePath": "/home/src/projects/project1/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/projects/node_modules/@typescript/lib-webworker/index.d.ts
/home/src/projects/node_modules/@typescript/lib-scripthost/index.d.ts
/home/src/projects/node_modules/@typescript/lib-es5/index.d.ts
/home/src/projects/node_modules/@typescript/lib-dom/index.d.ts
/home/src/projects/project1/file.ts
/home/src/projects/project1/file2.ts
/home/src/projects/project1/index.ts
/home/src/projects/project1/utils.d.ts
/home/src/projects/project1/typeroot1/sometype/index.d.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

exitCode:: ExitStatus.undefined

Change:: change program options to update module resolution and also update lib file

Input::
//// [/home/src/projects/project1/tsconfig.json]
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

//// [/home/src/projects/node_modules/@typescript/lib-dom/index.d.ts] deleted

Output::
FileWatcher:: Triggered with /home/src/projects/project1/tsconfig.json 1:: WatchInfo: /home/src/projects/project1/tsconfig.json 2000 undefined Config file
Scheduling update
Elapsed:: *ms FileWatcher:: Triggered with /home/src/projects/project1/tsconfig.json 1:: WatchInfo: /home/src/projects/project1/tsconfig.json 2000 undefined Config file
FileWatcher:: Triggered with /home/src/projects/node_modules/@typescript/lib-dom/index.d.ts 2:: WatchInfo: /home/src/projects/node_modules/@typescript/lib-dom/index.d.ts 250 undefined Source file
Scheduling update
Elapsed:: *ms FileWatcher:: Triggered with /home/src/projects/node_modules/@typescript/lib-dom/index.d.ts 2:: WatchInfo: /home/src/projects/node_modules/@typescript/lib-dom/index.d.ts 250 undefined Source file
DirectoryWatcher:: Triggered with /home/src/projects/node_modules/@typescript/lib-dom/index.d.ts :: WatchInfo: /home/src/projects/node_modules 1 undefined Failed Lookup Locations
Scheduling invalidateFailedLookup
Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/projects/node_modules/@typescript/lib-dom/index.d.ts :: WatchInfo: /home/src/projects/node_modules 1 undefined Failed Lookup Locations


Timeout callback:: count: 2
10: timerToUpdateProgram *new*
11: timerToInvalidateFailedLookupResolutions *new*

Before running Timeout callback:: count: 2
10: timerToUpdateProgram
11: timerToInvalidateFailedLookupResolutions

After running Timeout callback:: count: 0
Output::
Reloading config file: /home/src/projects/project1/tsconfig.json
Synchronizing program
[[90m12:03:03 AM[0m] File change detected. Starting incremental compilation...

CreatingProgramWith::
  roots: ["/home/src/projects/project1/file.ts","/home/src/projects/project1/file2.ts","/home/src/projects/project1/index.ts","/home/src/projects/project1/utils.d.ts","/home/src/projects/project1/typeroot1/sometype/index.d.ts"]
  options: {"composite":true,"typeRoots":["/home/src/projects/project1/typeroot1"],"lib":["lib.es5.d.ts","lib.dom.d.ts"],"traceResolution":true,"watch":true,"project":"/home/src/projects/project1","explainFiles":true,"extendedDiagnostics":true,"configFilePath":"/home/src/projects/project1/tsconfig.json"}
Reusing resolution of module '@typescript/lib-webworker' from '/home/src/projects/project1/__lib_node_modules_lookup_lib.webworker.d.ts__.ts' of old program, it was successfully resolved to '/home/src/projects/node_modules/@typescript/lib-webworker/index.d.ts'.
Reusing resolution of module '@typescript/lib-scripthost' from '/home/src/projects/project1/__lib_node_modules_lookup_lib.scripthost.d.ts__.ts' of old program, it was successfully resolved to '/home/src/projects/node_modules/@typescript/lib-scripthost/index.d.ts'.
Reusing resolution of module '@typescript/lib-es5' from '/home/src/projects/project1/__lib_node_modules_lookup_lib.es5.d.ts__.ts' of old program, it was successfully resolved to '/home/src/projects/node_modules/@typescript/lib-es5/index.d.ts'.
======== Resolving type reference directive 'sometype', containing file '/home/src/projects/project1/__inferred type names__.ts', root directory '/home/src/projects/project1/typeroot1'. ========
Resolving with primary search path '/home/src/projects/project1/typeroot1'.
File '/home/src/projects/project1/typeroot1/sometype.d.ts' does not exist.
File '/home/src/projects/project1/typeroot1/sometype/package.json' does not exist according to earlier cached lookups.
File '/home/src/projects/project1/typeroot1/sometype/index.d.ts' exists - use it as a name resolution result.
Resolving real path for '/home/src/projects/project1/typeroot1/sometype/index.d.ts', result '/home/src/projects/project1/typeroot1/sometype/index.d.ts'.
======== Type reference directive 'sometype' was successfully resolved to '/home/src/projects/project1/typeroot1/sometype/index.d.ts', primary: true. ========
======== Resolving module '@typescript/lib-dom' from '/home/src/projects/project1/__lib_node_modules_lookup_lib.dom.d.ts__.ts'. ========
Explicitly specified module resolution kind: 'Node10'.
Loading module '@typescript/lib-dom' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Directory '/home/src/projects/project1/node_modules' does not exist, skipping all lookups in it.
Scoped package detected, looking in 'typescript__lib-dom'
File '/home/src/projects/node_modules/@typescript/lib-dom/package.json' does not exist.
File '/home/src/projects/node_modules/@typescript/lib-dom.ts' does not exist.
File '/home/src/projects/node_modules/@typescript/lib-dom.tsx' does not exist.
File '/home/src/projects/node_modules/@typescript/lib-dom.d.ts' does not exist.
File '/home/src/projects/node_modules/@typescript/lib-dom/index.ts' does not exist.
File '/home/src/projects/node_modules/@typescript/lib-dom/index.tsx' does not exist.
File '/home/src/projects/node_modules/@typescript/lib-dom/index.d.ts' does not exist.
Directory '/home/src/projects/node_modules/@types' does not exist, skipping all lookups in it.
Scoped package detected, looking in 'typescript__lib-dom'
Directory '/home/src/node_modules' does not exist, skipping all lookups in it.
Scoped package detected, looking in 'typescript__lib-dom'
Directory '/home/node_modules' does not exist, skipping all lookups in it.
Scoped package detected, looking in 'typescript__lib-dom'
Directory '/node_modules' does not exist, skipping all lookups in it.
Scoped package detected, looking in 'typescript__lib-dom'
Loading module '@typescript/lib-dom' from 'node_modules' folder, target file types: JavaScript.
Searching all ancestor node_modules directories for fallback extensions: JavaScript.
Directory '/home/src/projects/project1/node_modules' does not exist, skipping all lookups in it.
File '/home/src/projects/node_modules/@typescript/lib-dom/package.json' does not exist according to earlier cached lookups.
File '/home/src/projects/node_modules/@typescript/lib-dom.js' does not exist.
File '/home/src/projects/node_modules/@typescript/lib-dom.jsx' does not exist.
File '/home/src/projects/node_modules/@typescript/lib-dom/index.js' does not exist.
File '/home/src/projects/node_modules/@typescript/lib-dom/index.jsx' does not exist.
Directory '/home/src/node_modules' does not exist, skipping all lookups in it.
Directory '/home/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
======== Module name '@typescript/lib-dom' was not resolved. ========
FileWatcher:: Added:: WatchInfo: /home/src/lib/lib.dom.d.ts 250 undefined Source file
FileWatcher:: Close:: WatchInfo: /home/src/projects/node_modules/@typescript/lib-dom/index.d.ts 250 undefined Source file
DirectoryWatcher:: Close:: WatchInfo: /home/src/projects/project1/typeroot2 1 undefined Type roots
Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /home/src/projects/project1/typeroot2 1 undefined Type roots
../lib/lib.dom.d.ts
  Library 'lib.dom.d.ts' specified in compilerOptions
node_modules/@typescript/lib-webworker/index.d.ts
  Library referenced via 'webworker' from file 'project1/file2.ts'
node_modules/@typescript/lib-scripthost/index.d.ts
  Library referenced via 'scripthost' from file 'project1/file2.ts'
node_modules/@typescript/lib-es5/index.d.ts
  Library referenced via 'es5' from file 'project1/file2.ts'
  Library 'lib.es5.d.ts' specified in compilerOptions
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
[[90m12:03:16 AM[0m] Found 0 errors. Watching for file changes.



//// [/home/src/projects/project1/file.js] file written with same contents
//// [/home/src/projects/project1/file2.js] file written with same contents
//// [/home/src/projects/project1/index.js] file written with same contents
//// [/home/src/projects/project1/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../lib/lib.dom.d.ts","../node_modules/@typescript/lib-webworker/index.d.ts","../node_modules/@typescript/lib-scripthost/index.d.ts","../node_modules/@typescript/lib-es5/index.d.ts","./file.ts","./file2.ts","./index.ts","./utils.d.ts","./typeroot1/sometype/index.d.ts"],"fileInfos":[{"version":"-8673759361-interface DOMInterface { }","affectsGlobalScope":true},{"version":"-7827135529-interface WebworkerInterface { }","affectsGlobalScope":true},{"version":"-5403980302-interface ScriptHostInterface { }","affectsGlobalScope":true},{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-16628394009-export const file = 10;","signature":"-9025507999-export declare const file = 10;\n"},{"version":"-11916614574-/// <reference lib=\"webworker\"/>\n/// <reference lib=\"scripthost\"/>\n/// <reference lib=\"es5\"/>\n","signature":"-14493813102-/// <reference lib=\"webworker\" />\n/// <reference lib=\"scripthost\" />\n/// <reference lib=\"es5\" />\n"},{"version":"-6136895998-export const x = \"type1\";export const xyz = 10;","signature":"-9988949802-export declare const x = \"type1\";\nexport declare const xyz = 10;\n"},"-13729955264-export const y = 10;","-12476477079-export type TheNum = \"type1\";"],"root":[[5,9]],"options":{"composite":true},"referencedMap":[],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,4,3,2,5,6,7,9,8],"latestChangedDtsFile":"./index.d.ts"},"version":"FakeTSVersion"}

//// [/home/src/projects/project1/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../lib/lib.dom.d.ts",
      "../node_modules/@typescript/lib-webworker/index.d.ts",
      "../node_modules/@typescript/lib-scripthost/index.d.ts",
      "../node_modules/@typescript/lib-es5/index.d.ts",
      "./file.ts",
      "./file2.ts",
      "./index.ts",
      "./utils.d.ts",
      "./typeroot1/sometype/index.d.ts"
    ],
    "fileInfos": {
      "../../lib/lib.dom.d.ts": {
        "original": {
          "version": "-8673759361-interface DOMInterface { }",
          "affectsGlobalScope": true
        },
        "version": "-8673759361-interface DOMInterface { }",
        "signature": "-8673759361-interface DOMInterface { }",
        "affectsGlobalScope": true
      },
      "../node_modules/@typescript/lib-webworker/index.d.ts": {
        "original": {
          "version": "-7827135529-interface WebworkerInterface { }",
          "affectsGlobalScope": true
        },
        "version": "-7827135529-interface WebworkerInterface { }",
        "signature": "-7827135529-interface WebworkerInterface { }",
        "affectsGlobalScope": true
      },
      "../node_modules/@typescript/lib-scripthost/index.d.ts": {
        "original": {
          "version": "-5403980302-interface ScriptHostInterface { }",
          "affectsGlobalScope": true
        },
        "version": "-5403980302-interface ScriptHostInterface { }",
        "signature": "-5403980302-interface ScriptHostInterface { }",
        "affectsGlobalScope": true
      },
      "../node_modules/@typescript/lib-es5/index.d.ts": {
        "original": {
          "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
          "affectsGlobalScope": true
        },
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
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
          "signature": "-14493813102-/// <reference lib=\"webworker\" />\n/// <reference lib=\"scripthost\" />\n/// <reference lib=\"es5\" />\n"
        },
        "version": "-11916614574-/// <reference lib=\"webworker\"/>\n/// <reference lib=\"scripthost\"/>\n/// <reference lib=\"es5\"/>\n",
        "signature": "-14493813102-/// <reference lib=\"webworker\" />\n/// <reference lib=\"scripthost\" />\n/// <reference lib=\"es5\" />\n"
      },
      "./index.ts": {
        "original": {
          "version": "-6136895998-export const x = \"type1\";export const xyz = 10;",
          "signature": "-9988949802-export declare const x = \"type1\";\nexport declare const xyz = 10;\n"
        },
        "version": "-6136895998-export const x = \"type1\";export const xyz = 10;",
        "signature": "-9988949802-export declare const x = \"type1\";\nexport declare const xyz = 10;\n"
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
    "referencedMap": {},
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.dom.d.ts",
      "../node_modules/@typescript/lib-es5/index.d.ts",
      "../node_modules/@typescript/lib-scripthost/index.d.ts",
      "../node_modules/@typescript/lib-webworker/index.d.ts",
      "./file.ts",
      "./file2.ts",
      "./index.ts",
      "./typeroot1/sometype/index.d.ts",
      "./utils.d.ts"
    ],
    "latestChangedDtsFile": "./index.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 1873
}


PolledWatches::
/home/src/projects/project1/node_modules:
  {"pollingInterval":500}

PolledWatches *deleted*::
/home/src/projects/project1/typeroot2:
  {"pollingInterval":500}

FsWatches::
/home/src/lib/lib.dom.d.ts: *new*
  {}
/home/src/projects/node_modules/@typescript/lib-es5/index.d.ts:
  {}
/home/src/projects/node_modules/@typescript/lib-scripthost/index.d.ts:
  {}
/home/src/projects/node_modules/@typescript/lib-webworker/index.d.ts:
  {}
/home/src/projects/project1/file.ts:
  {}
/home/src/projects/project1/file2.ts:
  {}
/home/src/projects/project1/index.ts:
  {}
/home/src/projects/project1/tsconfig.json:
  {}
/home/src/projects/project1/typeroot1/sometype/index.d.ts:
  {}
/home/src/projects/project1/utils.d.ts:
  {}

FsWatches *deleted*::
/home/src/projects/node_modules/@typescript/lib-dom/index.d.ts:
  {}

FsWatchesRecursive::
/home/src/projects/node_modules:
  {}
/home/src/projects/project1:
  {}
/home/src/projects/project1/typeroot1:
  {}

Timeout callback:: count: 0
11: timerToInvalidateFailedLookupResolutions *deleted*


Program root files: [
  "/home/src/projects/project1/file.ts",
  "/home/src/projects/project1/file2.ts",
  "/home/src/projects/project1/index.ts",
  "/home/src/projects/project1/utils.d.ts",
  "/home/src/projects/project1/typeroot1/sometype/index.d.ts"
]
Program options: {
  "composite": true,
  "typeRoots": [
    "/home/src/projects/project1/typeroot1"
  ],
  "lib": [
    "lib.es5.d.ts",
    "lib.dom.d.ts"
  ],
  "traceResolution": true,
  "watch": true,
  "project": "/home/src/projects/project1",
  "explainFiles": true,
  "extendedDiagnostics": true,
  "configFilePath": "/home/src/projects/project1/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/lib/lib.dom.d.ts
/home/src/projects/node_modules/@typescript/lib-webworker/index.d.ts
/home/src/projects/node_modules/@typescript/lib-scripthost/index.d.ts
/home/src/projects/node_modules/@typescript/lib-es5/index.d.ts
/home/src/projects/project1/file.ts
/home/src/projects/project1/file2.ts
/home/src/projects/project1/index.ts
/home/src/projects/project1/utils.d.ts
/home/src/projects/project1/typeroot1/sometype/index.d.ts

Semantic diagnostics in builder refreshed for::
/home/src/lib/lib.dom.d.ts
/home/src/projects/node_modules/@typescript/lib-webworker/index.d.ts
/home/src/projects/node_modules/@typescript/lib-scripthost/index.d.ts
/home/src/projects/node_modules/@typescript/lib-es5/index.d.ts
/home/src/projects/project1/file.ts
/home/src/projects/project1/file2.ts
/home/src/projects/project1/index.ts
/home/src/projects/project1/utils.d.ts
/home/src/projects/project1/typeroot1/sometype/index.d.ts

Shape signatures in builder refreshed for::
/home/src/lib/lib.dom.d.ts (used version)
/home/src/projects/node_modules/@typescript/lib-webworker/index.d.ts (used version)
/home/src/projects/node_modules/@typescript/lib-scripthost/index.d.ts (used version)
/home/src/projects/project1/file.ts (computed .d.ts)
/home/src/projects/project1/file2.ts (computed .d.ts)
/home/src/projects/project1/index.ts (computed .d.ts)
/home/src/projects/project1/utils.d.ts (used version)
/home/src/projects/project1/typeroot1/sometype/index.d.ts (used version)

exitCode:: ExitStatus.undefined

Change:: delete redirect file webworker

Input::
//// [/home/src/projects/node_modules/@typescript/lib-webworker/index.d.ts] deleted

Output::
FileWatcher:: Triggered with /home/src/projects/node_modules/@typescript/lib-webworker/index.d.ts 2:: WatchInfo: /home/src/projects/node_modules/@typescript/lib-webworker/index.d.ts 250 undefined Source file
Scheduling update
Elapsed:: *ms FileWatcher:: Triggered with /home/src/projects/node_modules/@typescript/lib-webworker/index.d.ts 2:: WatchInfo: /home/src/projects/node_modules/@typescript/lib-webworker/index.d.ts 250 undefined Source file
DirectoryWatcher:: Triggered with /home/src/projects/node_modules/@typescript/lib-webworker/index.d.ts :: WatchInfo: /home/src/projects/node_modules 1 undefined Failed Lookup Locations
Scheduling invalidateFailedLookup
Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/projects/node_modules/@typescript/lib-webworker/index.d.ts :: WatchInfo: /home/src/projects/node_modules 1 undefined Failed Lookup Locations


Timeout callback:: count: 2
12: timerToUpdateProgram *new*
13: timerToInvalidateFailedLookupResolutions *new*

Before running Timeout callback:: count: 2
12: timerToUpdateProgram
13: timerToInvalidateFailedLookupResolutions

After running Timeout callback:: count: 0
Output::
Synchronizing program
[[90m12:03:22 AM[0m] File change detected. Starting incremental compilation...

CreatingProgramWith::
  roots: ["/home/src/projects/project1/file.ts","/home/src/projects/project1/file2.ts","/home/src/projects/project1/index.ts","/home/src/projects/project1/utils.d.ts","/home/src/projects/project1/typeroot1/sometype/index.d.ts"]
  options: {"composite":true,"typeRoots":["/home/src/projects/project1/typeroot1"],"lib":["lib.es5.d.ts","lib.dom.d.ts"],"traceResolution":true,"watch":true,"project":"/home/src/projects/project1","explainFiles":true,"extendedDiagnostics":true,"configFilePath":"/home/src/projects/project1/tsconfig.json"}
FileWatcher:: Close:: WatchInfo: /home/src/projects/node_modules/@typescript/lib-webworker/index.d.ts 250 undefined Source file
======== Resolving module '@typescript/lib-webworker' from '/home/src/projects/project1/__lib_node_modules_lookup_lib.webworker.d.ts__.ts'. ========
Explicitly specified module resolution kind: 'Node10'.
Loading module '@typescript/lib-webworker' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Directory '/home/src/projects/project1/node_modules' does not exist, skipping all lookups in it.
Scoped package detected, looking in 'typescript__lib-webworker'
File '/home/src/projects/node_modules/@typescript/lib-webworker/package.json' does not exist.
File '/home/src/projects/node_modules/@typescript/lib-webworker.ts' does not exist.
File '/home/src/projects/node_modules/@typescript/lib-webworker.tsx' does not exist.
File '/home/src/projects/node_modules/@typescript/lib-webworker.d.ts' does not exist.
File '/home/src/projects/node_modules/@typescript/lib-webworker/index.ts' does not exist.
File '/home/src/projects/node_modules/@typescript/lib-webworker/index.tsx' does not exist.
File '/home/src/projects/node_modules/@typescript/lib-webworker/index.d.ts' does not exist.
Directory '/home/src/projects/node_modules/@types' does not exist, skipping all lookups in it.
Scoped package detected, looking in 'typescript__lib-webworker'
Directory '/home/src/node_modules' does not exist, skipping all lookups in it.
Scoped package detected, looking in 'typescript__lib-webworker'
Directory '/home/node_modules' does not exist, skipping all lookups in it.
Scoped package detected, looking in 'typescript__lib-webworker'
Directory '/node_modules' does not exist, skipping all lookups in it.
Scoped package detected, looking in 'typescript__lib-webworker'
Loading module '@typescript/lib-webworker' from 'node_modules' folder, target file types: JavaScript.
Searching all ancestor node_modules directories for fallback extensions: JavaScript.
Directory '/home/src/projects/project1/node_modules' does not exist, skipping all lookups in it.
File '/home/src/projects/node_modules/@typescript/lib-webworker/package.json' does not exist according to earlier cached lookups.
File '/home/src/projects/node_modules/@typescript/lib-webworker.js' does not exist.
File '/home/src/projects/node_modules/@typescript/lib-webworker.jsx' does not exist.
File '/home/src/projects/node_modules/@typescript/lib-webworker/index.js' does not exist.
File '/home/src/projects/node_modules/@typescript/lib-webworker/index.jsx' does not exist.
Directory '/home/src/node_modules' does not exist, skipping all lookups in it.
Directory '/home/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
======== Module name '@typescript/lib-webworker' was not resolved. ========
FileWatcher:: Added:: WatchInfo: /home/src/lib/lib.webworker.d.ts 250 undefined Source file
Reusing resolution of module '@typescript/lib-scripthost' from '/home/src/projects/project1/__lib_node_modules_lookup_lib.scripthost.d.ts__.ts' of old program, it was successfully resolved to '/home/src/projects/node_modules/@typescript/lib-scripthost/index.d.ts'.
Reusing resolution of module '@typescript/lib-es5' from '/home/src/projects/project1/__lib_node_modules_lookup_lib.es5.d.ts__.ts' of old program, it was successfully resolved to '/home/src/projects/node_modules/@typescript/lib-es5/index.d.ts'.
Reusing resolution of type reference directive 'sometype' from '/home/src/projects/project1/__inferred type names__.ts' of old program, it was successfully resolved to '/home/src/projects/project1/typeroot1/sometype/index.d.ts'.
Reusing resolution of module '@typescript/lib-dom' from '/home/src/projects/project1/__lib_node_modules_lookup_lib.dom.d.ts__.ts' of old program, it was not resolved.
../lib/lib.dom.d.ts
  Library 'lib.dom.d.ts' specified in compilerOptions
../lib/lib.webworker.d.ts
  Library referenced via 'webworker' from file 'project1/file2.ts'
node_modules/@typescript/lib-scripthost/index.d.ts
  Library referenced via 'scripthost' from file 'project1/file2.ts'
node_modules/@typescript/lib-es5/index.d.ts
  Library referenced via 'es5' from file 'project1/file2.ts'
  Library 'lib.es5.d.ts' specified in compilerOptions
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
[[90m12:03:35 AM[0m] Found 0 errors. Watching for file changes.



//// [/home/src/projects/project1/file.js] file written with same contents
//// [/home/src/projects/project1/file2.js] file written with same contents
//// [/home/src/projects/project1/index.js] file written with same contents
//// [/home/src/projects/project1/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../lib/lib.dom.d.ts","../../lib/lib.webworker.d.ts","../node_modules/@typescript/lib-scripthost/index.d.ts","../node_modules/@typescript/lib-es5/index.d.ts","./file.ts","./file2.ts","./index.ts","./utils.d.ts","./typeroot1/sometype/index.d.ts"],"fileInfos":[{"version":"-8673759361-interface DOMInterface { }","affectsGlobalScope":true},{"version":"-3990185033-interface WebWorkerInterface { }","affectsGlobalScope":true},{"version":"-5403980302-interface ScriptHostInterface { }","affectsGlobalScope":true},{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-16628394009-export const file = 10;","signature":"-9025507999-export declare const file = 10;\n"},{"version":"-11916614574-/// <reference lib=\"webworker\"/>\n/// <reference lib=\"scripthost\"/>\n/// <reference lib=\"es5\"/>\n","signature":"-14493813102-/// <reference lib=\"webworker\" />\n/// <reference lib=\"scripthost\" />\n/// <reference lib=\"es5\" />\n"},{"version":"-6136895998-export const x = \"type1\";export const xyz = 10;","signature":"-9988949802-export declare const x = \"type1\";\nexport declare const xyz = 10;\n"},"-13729955264-export const y = 10;","-12476477079-export type TheNum = \"type1\";"],"root":[[5,9]],"options":{"composite":true},"referencedMap":[],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,2,4,3,5,6,7,9,8],"latestChangedDtsFile":"./index.d.ts"},"version":"FakeTSVersion"}

//// [/home/src/projects/project1/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../lib/lib.dom.d.ts",
      "../../lib/lib.webworker.d.ts",
      "../node_modules/@typescript/lib-scripthost/index.d.ts",
      "../node_modules/@typescript/lib-es5/index.d.ts",
      "./file.ts",
      "./file2.ts",
      "./index.ts",
      "./utils.d.ts",
      "./typeroot1/sometype/index.d.ts"
    ],
    "fileInfos": {
      "../../lib/lib.dom.d.ts": {
        "original": {
          "version": "-8673759361-interface DOMInterface { }",
          "affectsGlobalScope": true
        },
        "version": "-8673759361-interface DOMInterface { }",
        "signature": "-8673759361-interface DOMInterface { }",
        "affectsGlobalScope": true
      },
      "../../lib/lib.webworker.d.ts": {
        "original": {
          "version": "-3990185033-interface WebWorkerInterface { }",
          "affectsGlobalScope": true
        },
        "version": "-3990185033-interface WebWorkerInterface { }",
        "signature": "-3990185033-interface WebWorkerInterface { }",
        "affectsGlobalScope": true
      },
      "../node_modules/@typescript/lib-scripthost/index.d.ts": {
        "original": {
          "version": "-5403980302-interface ScriptHostInterface { }",
          "affectsGlobalScope": true
        },
        "version": "-5403980302-interface ScriptHostInterface { }",
        "signature": "-5403980302-interface ScriptHostInterface { }",
        "affectsGlobalScope": true
      },
      "../node_modules/@typescript/lib-es5/index.d.ts": {
        "original": {
          "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
          "affectsGlobalScope": true
        },
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
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
          "signature": "-14493813102-/// <reference lib=\"webworker\" />\n/// <reference lib=\"scripthost\" />\n/// <reference lib=\"es5\" />\n"
        },
        "version": "-11916614574-/// <reference lib=\"webworker\"/>\n/// <reference lib=\"scripthost\"/>\n/// <reference lib=\"es5\"/>\n",
        "signature": "-14493813102-/// <reference lib=\"webworker\" />\n/// <reference lib=\"scripthost\" />\n/// <reference lib=\"es5\" />\n"
      },
      "./index.ts": {
        "original": {
          "version": "-6136895998-export const x = \"type1\";export const xyz = 10;",
          "signature": "-9988949802-export declare const x = \"type1\";\nexport declare const xyz = 10;\n"
        },
        "version": "-6136895998-export const x = \"type1\";export const xyz = 10;",
        "signature": "-9988949802-export declare const x = \"type1\";\nexport declare const xyz = 10;\n"
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
    "referencedMap": {},
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.dom.d.ts",
      "../../lib/lib.webworker.d.ts",
      "../node_modules/@typescript/lib-es5/index.d.ts",
      "../node_modules/@typescript/lib-scripthost/index.d.ts",
      "./file.ts",
      "./file2.ts",
      "./index.ts",
      "./typeroot1/sometype/index.d.ts",
      "./utils.d.ts"
    ],
    "latestChangedDtsFile": "./index.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 1849
}


PolledWatches::
/home/src/projects/project1/node_modules:
  {"pollingInterval":500}

FsWatches::
/home/src/lib/lib.dom.d.ts:
  {}
/home/src/lib/lib.webworker.d.ts: *new*
  {}
/home/src/projects/node_modules/@typescript/lib-es5/index.d.ts:
  {}
/home/src/projects/node_modules/@typescript/lib-scripthost/index.d.ts:
  {}
/home/src/projects/project1/file.ts:
  {}
/home/src/projects/project1/file2.ts:
  {}
/home/src/projects/project1/index.ts:
  {}
/home/src/projects/project1/tsconfig.json:
  {}
/home/src/projects/project1/typeroot1/sometype/index.d.ts:
  {}
/home/src/projects/project1/utils.d.ts:
  {}

FsWatches *deleted*::
/home/src/projects/node_modules/@typescript/lib-webworker/index.d.ts:
  {}

FsWatchesRecursive::
/home/src/projects/node_modules:
  {}
/home/src/projects/project1:
  {}
/home/src/projects/project1/typeroot1:
  {}

Timeout callback:: count: 0
13: timerToInvalidateFailedLookupResolutions *deleted*


Program root files: [
  "/home/src/projects/project1/file.ts",
  "/home/src/projects/project1/file2.ts",
  "/home/src/projects/project1/index.ts",
  "/home/src/projects/project1/utils.d.ts",
  "/home/src/projects/project1/typeroot1/sometype/index.d.ts"
]
Program options: {
  "composite": true,
  "typeRoots": [
    "/home/src/projects/project1/typeroot1"
  ],
  "lib": [
    "lib.es5.d.ts",
    "lib.dom.d.ts"
  ],
  "traceResolution": true,
  "watch": true,
  "project": "/home/src/projects/project1",
  "explainFiles": true,
  "extendedDiagnostics": true,
  "configFilePath": "/home/src/projects/project1/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/lib/lib.dom.d.ts
/home/src/lib/lib.webworker.d.ts
/home/src/projects/node_modules/@typescript/lib-scripthost/index.d.ts
/home/src/projects/node_modules/@typescript/lib-es5/index.d.ts
/home/src/projects/project1/file.ts
/home/src/projects/project1/file2.ts
/home/src/projects/project1/index.ts
/home/src/projects/project1/utils.d.ts
/home/src/projects/project1/typeroot1/sometype/index.d.ts

Semantic diagnostics in builder refreshed for::
/home/src/lib/lib.dom.d.ts
/home/src/lib/lib.webworker.d.ts
/home/src/projects/node_modules/@typescript/lib-scripthost/index.d.ts
/home/src/projects/node_modules/@typescript/lib-es5/index.d.ts
/home/src/projects/project1/file.ts
/home/src/projects/project1/file2.ts
/home/src/projects/project1/index.ts
/home/src/projects/project1/utils.d.ts
/home/src/projects/project1/typeroot1/sometype/index.d.ts

Shape signatures in builder refreshed for::
/home/src/lib/lib.webworker.d.ts (used version)
/home/src/lib/lib.dom.d.ts (used version)
/home/src/projects/node_modules/@typescript/lib-scripthost/index.d.ts (used version)
/home/src/projects/project1/file.ts (computed .d.ts)
/home/src/projects/project1/file2.ts (computed .d.ts)
/home/src/projects/project1/index.ts (computed .d.ts)
/home/src/projects/project1/utils.d.ts (used version)
/home/src/projects/project1/typeroot1/sometype/index.d.ts (used version)

exitCode:: ExitStatus.undefined

Change:: write redirect file webworker

Input::
//// [/home/src/projects/node_modules/@typescript/lib-webworker/index.d.ts]
interface WebworkerInterface { }


Output::
DirectoryWatcher:: Triggered with /home/src/projects/node_modules/@typescript/lib-webworker/index.d.ts :: WatchInfo: /home/src/projects/node_modules 1 undefined Failed Lookup Locations
Scheduling invalidateFailedLookup
Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/projects/node_modules/@typescript/lib-webworker/index.d.ts :: WatchInfo: /home/src/projects/node_modules 1 undefined Failed Lookup Locations


Timeout callback:: count: 1
14: timerToInvalidateFailedLookupResolutions *new*

Before running Timeout callback:: count: 1
14: timerToInvalidateFailedLookupResolutions

After running Timeout callback:: count: 1
Output::
Scheduling update



Timeout callback:: count: 1
15: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
15: timerToUpdateProgram

After running Timeout callback:: count: 0
Output::
Synchronizing program
[[90m12:03:41 AM[0m] File change detected. Starting incremental compilation...

CreatingProgramWith::
  roots: ["/home/src/projects/project1/file.ts","/home/src/projects/project1/file2.ts","/home/src/projects/project1/index.ts","/home/src/projects/project1/utils.d.ts","/home/src/projects/project1/typeroot1/sometype/index.d.ts"]
  options: {"composite":true,"typeRoots":["/home/src/projects/project1/typeroot1"],"lib":["lib.es5.d.ts","lib.dom.d.ts"],"traceResolution":true,"watch":true,"project":"/home/src/projects/project1","explainFiles":true,"extendedDiagnostics":true,"configFilePath":"/home/src/projects/project1/tsconfig.json"}
======== Resolving module '@typescript/lib-webworker' from '/home/src/projects/project1/__lib_node_modules_lookup_lib.webworker.d.ts__.ts'. ========
Explicitly specified module resolution kind: 'Node10'.
Loading module '@typescript/lib-webworker' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Directory '/home/src/projects/project1/node_modules' does not exist, skipping all lookups in it.
Scoped package detected, looking in 'typescript__lib-webworker'
File '/home/src/projects/node_modules/@typescript/lib-webworker/package.json' does not exist.
File '/home/src/projects/node_modules/@typescript/lib-webworker.ts' does not exist.
File '/home/src/projects/node_modules/@typescript/lib-webworker.tsx' does not exist.
File '/home/src/projects/node_modules/@typescript/lib-webworker.d.ts' does not exist.
File '/home/src/projects/node_modules/@typescript/lib-webworker/index.ts' does not exist.
File '/home/src/projects/node_modules/@typescript/lib-webworker/index.tsx' does not exist.
File '/home/src/projects/node_modules/@typescript/lib-webworker/index.d.ts' exists - use it as a name resolution result.
Resolving real path for '/home/src/projects/node_modules/@typescript/lib-webworker/index.d.ts', result '/home/src/projects/node_modules/@typescript/lib-webworker/index.d.ts'.
======== Module name '@typescript/lib-webworker' was successfully resolved to '/home/src/projects/node_modules/@typescript/lib-webworker/index.d.ts'. ========
FileWatcher:: Added:: WatchInfo: /home/src/projects/node_modules/@typescript/lib-webworker/index.d.ts 250 undefined Source file
Reusing resolution of module '@typescript/lib-scripthost' from '/home/src/projects/project1/__lib_node_modules_lookup_lib.scripthost.d.ts__.ts' of old program, it was successfully resolved to '/home/src/projects/node_modules/@typescript/lib-scripthost/index.d.ts'.
Reusing resolution of module '@typescript/lib-es5' from '/home/src/projects/project1/__lib_node_modules_lookup_lib.es5.d.ts__.ts' of old program, it was successfully resolved to '/home/src/projects/node_modules/@typescript/lib-es5/index.d.ts'.
Reusing resolution of type reference directive 'sometype' from '/home/src/projects/project1/__inferred type names__.ts' of old program, it was successfully resolved to '/home/src/projects/project1/typeroot1/sometype/index.d.ts'.
Reusing resolution of module '@typescript/lib-dom' from '/home/src/projects/project1/__lib_node_modules_lookup_lib.dom.d.ts__.ts' of old program, it was not resolved.
FileWatcher:: Close:: WatchInfo: /home/src/lib/lib.webworker.d.ts 250 undefined Source file
../lib/lib.dom.d.ts
  Library 'lib.dom.d.ts' specified in compilerOptions
node_modules/@typescript/lib-webworker/index.d.ts
  Library referenced via 'webworker' from file 'project1/file2.ts'
node_modules/@typescript/lib-scripthost/index.d.ts
  Library referenced via 'scripthost' from file 'project1/file2.ts'
node_modules/@typescript/lib-es5/index.d.ts
  Library referenced via 'es5' from file 'project1/file2.ts'
  Library 'lib.es5.d.ts' specified in compilerOptions
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
[[90m12:03:54 AM[0m] Found 0 errors. Watching for file changes.



//// [/home/src/projects/project1/file.js] file written with same contents
//// [/home/src/projects/project1/file2.js] file written with same contents
//// [/home/src/projects/project1/index.js] file written with same contents
//// [/home/src/projects/project1/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../lib/lib.dom.d.ts","../node_modules/@typescript/lib-webworker/index.d.ts","../node_modules/@typescript/lib-scripthost/index.d.ts","../node_modules/@typescript/lib-es5/index.d.ts","./file.ts","./file2.ts","./index.ts","./utils.d.ts","./typeroot1/sometype/index.d.ts"],"fileInfos":[{"version":"-8673759361-interface DOMInterface { }","affectsGlobalScope":true},{"version":"-7827135529-interface WebworkerInterface { }","affectsGlobalScope":true},{"version":"-5403980302-interface ScriptHostInterface { }","affectsGlobalScope":true},{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-16628394009-export const file = 10;","signature":"-9025507999-export declare const file = 10;\n"},{"version":"-11916614574-/// <reference lib=\"webworker\"/>\n/// <reference lib=\"scripthost\"/>\n/// <reference lib=\"es5\"/>\n","signature":"-14493813102-/// <reference lib=\"webworker\" />\n/// <reference lib=\"scripthost\" />\n/// <reference lib=\"es5\" />\n"},{"version":"-6136895998-export const x = \"type1\";export const xyz = 10;","signature":"-9988949802-export declare const x = \"type1\";\nexport declare const xyz = 10;\n"},"-13729955264-export const y = 10;","-12476477079-export type TheNum = \"type1\";"],"root":[[5,9]],"options":{"composite":true},"referencedMap":[],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,4,3,2,5,6,7,9,8],"latestChangedDtsFile":"./index.d.ts"},"version":"FakeTSVersion"}

//// [/home/src/projects/project1/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../lib/lib.dom.d.ts",
      "../node_modules/@typescript/lib-webworker/index.d.ts",
      "../node_modules/@typescript/lib-scripthost/index.d.ts",
      "../node_modules/@typescript/lib-es5/index.d.ts",
      "./file.ts",
      "./file2.ts",
      "./index.ts",
      "./utils.d.ts",
      "./typeroot1/sometype/index.d.ts"
    ],
    "fileInfos": {
      "../../lib/lib.dom.d.ts": {
        "original": {
          "version": "-8673759361-interface DOMInterface { }",
          "affectsGlobalScope": true
        },
        "version": "-8673759361-interface DOMInterface { }",
        "signature": "-8673759361-interface DOMInterface { }",
        "affectsGlobalScope": true
      },
      "../node_modules/@typescript/lib-webworker/index.d.ts": {
        "original": {
          "version": "-7827135529-interface WebworkerInterface { }",
          "affectsGlobalScope": true
        },
        "version": "-7827135529-interface WebworkerInterface { }",
        "signature": "-7827135529-interface WebworkerInterface { }",
        "affectsGlobalScope": true
      },
      "../node_modules/@typescript/lib-scripthost/index.d.ts": {
        "original": {
          "version": "-5403980302-interface ScriptHostInterface { }",
          "affectsGlobalScope": true
        },
        "version": "-5403980302-interface ScriptHostInterface { }",
        "signature": "-5403980302-interface ScriptHostInterface { }",
        "affectsGlobalScope": true
      },
      "../node_modules/@typescript/lib-es5/index.d.ts": {
        "original": {
          "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
          "affectsGlobalScope": true
        },
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
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
          "signature": "-14493813102-/// <reference lib=\"webworker\" />\n/// <reference lib=\"scripthost\" />\n/// <reference lib=\"es5\" />\n"
        },
        "version": "-11916614574-/// <reference lib=\"webworker\"/>\n/// <reference lib=\"scripthost\"/>\n/// <reference lib=\"es5\"/>\n",
        "signature": "-14493813102-/// <reference lib=\"webworker\" />\n/// <reference lib=\"scripthost\" />\n/// <reference lib=\"es5\" />\n"
      },
      "./index.ts": {
        "original": {
          "version": "-6136895998-export const x = \"type1\";export const xyz = 10;",
          "signature": "-9988949802-export declare const x = \"type1\";\nexport declare const xyz = 10;\n"
        },
        "version": "-6136895998-export const x = \"type1\";export const xyz = 10;",
        "signature": "-9988949802-export declare const x = \"type1\";\nexport declare const xyz = 10;\n"
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
    "referencedMap": {},
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.dom.d.ts",
      "../node_modules/@typescript/lib-es5/index.d.ts",
      "../node_modules/@typescript/lib-scripthost/index.d.ts",
      "../node_modules/@typescript/lib-webworker/index.d.ts",
      "./file.ts",
      "./file2.ts",
      "./index.ts",
      "./typeroot1/sometype/index.d.ts",
      "./utils.d.ts"
    ],
    "latestChangedDtsFile": "./index.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 1873
}


PolledWatches::
/home/src/projects/project1/node_modules:
  {"pollingInterval":500}

FsWatches::
/home/src/lib/lib.dom.d.ts:
  {}
/home/src/projects/node_modules/@typescript/lib-es5/index.d.ts:
  {}
/home/src/projects/node_modules/@typescript/lib-scripthost/index.d.ts:
  {}
/home/src/projects/node_modules/@typescript/lib-webworker/index.d.ts: *new*
  {}
/home/src/projects/project1/file.ts:
  {}
/home/src/projects/project1/file2.ts:
  {}
/home/src/projects/project1/index.ts:
  {}
/home/src/projects/project1/tsconfig.json:
  {}
/home/src/projects/project1/typeroot1/sometype/index.d.ts:
  {}
/home/src/projects/project1/utils.d.ts:
  {}

FsWatches *deleted*::
/home/src/lib/lib.webworker.d.ts:
  {}

FsWatchesRecursive::
/home/src/projects/node_modules:
  {}
/home/src/projects/project1:
  {}
/home/src/projects/project1/typeroot1:
  {}


Program root files: [
  "/home/src/projects/project1/file.ts",
  "/home/src/projects/project1/file2.ts",
  "/home/src/projects/project1/index.ts",
  "/home/src/projects/project1/utils.d.ts",
  "/home/src/projects/project1/typeroot1/sometype/index.d.ts"
]
Program options: {
  "composite": true,
  "typeRoots": [
    "/home/src/projects/project1/typeroot1"
  ],
  "lib": [
    "lib.es5.d.ts",
    "lib.dom.d.ts"
  ],
  "traceResolution": true,
  "watch": true,
  "project": "/home/src/projects/project1",
  "explainFiles": true,
  "extendedDiagnostics": true,
  "configFilePath": "/home/src/projects/project1/tsconfig.json"
}
Program structureReused: SafeModules
Program files::
/home/src/lib/lib.dom.d.ts
/home/src/projects/node_modules/@typescript/lib-webworker/index.d.ts
/home/src/projects/node_modules/@typescript/lib-scripthost/index.d.ts
/home/src/projects/node_modules/@typescript/lib-es5/index.d.ts
/home/src/projects/project1/file.ts
/home/src/projects/project1/file2.ts
/home/src/projects/project1/index.ts
/home/src/projects/project1/utils.d.ts
/home/src/projects/project1/typeroot1/sometype/index.d.ts

Semantic diagnostics in builder refreshed for::
/home/src/lib/lib.dom.d.ts
/home/src/projects/node_modules/@typescript/lib-webworker/index.d.ts
/home/src/projects/node_modules/@typescript/lib-scripthost/index.d.ts
/home/src/projects/node_modules/@typescript/lib-es5/index.d.ts
/home/src/projects/project1/file.ts
/home/src/projects/project1/file2.ts
/home/src/projects/project1/index.ts
/home/src/projects/project1/utils.d.ts
/home/src/projects/project1/typeroot1/sometype/index.d.ts

Shape signatures in builder refreshed for::
/home/src/projects/node_modules/@typescript/lib-webworker/index.d.ts (used version)
/home/src/lib/lib.dom.d.ts (used version)
/home/src/projects/node_modules/@typescript/lib-scripthost/index.d.ts (used version)
/home/src/projects/project1/file.ts (computed .d.ts)
/home/src/projects/project1/file2.ts (computed .d.ts)
/home/src/projects/project1/index.ts (computed .d.ts)
/home/src/projects/project1/utils.d.ts (used version)
/home/src/projects/project1/typeroot1/sometype/index.d.ts (used version)

exitCode:: ExitStatus.undefined
