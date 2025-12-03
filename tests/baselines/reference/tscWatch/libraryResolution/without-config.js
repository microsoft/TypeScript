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


/home/src/tslibs/TS/Lib/tsc.js -w project1/core.d.ts project1/utils.d.ts project1/file.ts project1/index.ts project1/file2.ts --lib es5,dom --traceResolution --explainFiles --extendedDiagnostics
Output::
[[90mHH:MM:SS AM[0m] Starting compilation in watch mode...

Current directory: /home/src/workspace/projects CaseSensitiveFileNames: false
Synchronizing program
CreatingProgramWith::
  roots: ["project1/core.d.ts","project1/utils.d.ts","project1/file.ts","project1/index.ts","project1/file2.ts"]
  options: {"watch":true,"lib":["lib.es5.d.ts","lib.dom.d.ts"],"traceResolution":true,"explainFiles":true,"extendedDiagnostics":true}
FileWatcher:: Added:: WatchInfo: project1/core.d.ts 250 undefined Source file
FileWatcher:: Added:: WatchInfo: project1/utils.d.ts 250 undefined Source file
FileWatcher:: Added:: WatchInfo: project1/file.ts 250 undefined Source file
FileWatcher:: Added:: WatchInfo: project1/index.ts 250 undefined Source file
FileWatcher:: Added:: WatchInfo: project1/file2.ts 250 undefined Source file
FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.webworker.d.ts 250 undefined Source file
FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.scripthost.d.ts 250 undefined Source file
FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.es5.d.ts 250 undefined Source file
FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.dom.d.ts 250 undefined Source file
DirectoryWatcher:: Added:: WatchInfo: /home/src/workspace/projects/node_modules/@types 1 undefined Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspace/projects/node_modules/@types 1 undefined Type roots
DirectoryWatcher:: Added:: WatchInfo: /home/src/workspace/node_modules/@types 1 undefined Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspace/node_modules/@types 1 undefined Type roots
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
  Root file specified for compilation
project1/utils.d.ts
  Root file specified for compilation
project1/file.ts
  Root file specified for compilation
project1/index.ts
  Root file specified for compilation
project1/file2.ts
  Root file specified for compilation
[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/home/src/tslibs/TS/Lib/lib.es5.d.ts] *Lib*

//// [/home/src/workspace/projects/project1/file.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.file = void 0;
exports.file = 10;


//// [/home/src/workspace/projects/project1/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = "type1";


//// [/home/src/workspace/projects/project1/file2.js]
/// <reference lib="webworker"/>
/// <reference lib="scripthost"/>
/// <reference lib="es5"/>



PolledWatches::
/home/src/workspace/node_modules/@types: *new*
  {"pollingInterval":500}
/home/src/workspace/projects/node_modules/@types: *new*
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
/home/src/workspace/projects/project1/utils.d.ts: *new*
  {}

Program root files: [
  "project1/core.d.ts",
  "project1/utils.d.ts",
  "project1/file.ts",
  "project1/index.ts",
  "project1/file2.ts"
]
Program options: {
  "watch": true,
  "lib": [
    "lib.es5.d.ts",
    "lib.dom.d.ts"
  ],
  "traceResolution": true,
  "explainFiles": true,
  "extendedDiagnostics": true
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.es5.d.ts
/home/src/tslibs/TS/Lib/lib.dom.d.ts
/home/src/tslibs/TS/Lib/lib.webworker.d.ts
/home/src/tslibs/TS/Lib/lib.scripthost.d.ts
project1/core.d.ts
project1/utils.d.ts
project1/file.ts
project1/index.ts
project1/file2.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.es5.d.ts
/home/src/tslibs/TS/Lib/lib.dom.d.ts
/home/src/tslibs/TS/Lib/lib.webworker.d.ts
/home/src/tslibs/TS/Lib/lib.scripthost.d.ts
project1/core.d.ts
project1/utils.d.ts
project1/file.ts
project1/index.ts
project1/file2.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.es5.d.ts (used version)
/home/src/workspace/projects/project1/core.d.ts (used version)
/home/src/workspace/projects/project1/utils.d.ts (used version)
/home/src/workspace/projects/project1/file.ts (used version)
/home/src/workspace/projects/project1/index.ts (used version)
/home/src/workspace/projects/project1/file2.ts (used version)
/home/src/tslibs/ts/lib/lib.dom.d.ts (used version)
/home/src/tslibs/ts/lib/lib.webworker.d.ts (used version)
/home/src/tslibs/ts/lib/lib.scripthost.d.ts (used version)

exitCode:: ExitStatus.undefined

Change:: write redirect file dom

Input::
//// [/home/src/workspace/projects/node_modules/@typescript/lib-dom/index.d.ts]
interface DOMInterface { }


Before running Timeout callback:: count: 0

After running Timeout callback:: count: 0

Before running Timeout callback:: count: 0

After running Timeout callback:: count: 0


exitCode:: ExitStatus.undefined

Change:: edit file

Input::
//// [/home/src/workspace/projects/project1/file.ts]
export const file = 10;export const xyz = 10;


Output::
FileWatcher:: Triggered with project1/file.ts 1:: WatchInfo: project1/file.ts 250 undefined Source file
Scheduling update
Elapsed:: *ms FileWatcher:: Triggered with project1/file.ts 1:: WatchInfo: project1/file.ts 250 undefined Source file


Timeout callback:: count: 1
1: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
1: timerToUpdateProgram

Host is moving to new time
After running Timeout callback:: count: 0
Output::
Synchronizing program
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

CreatingProgramWith::
  roots: ["project1/core.d.ts","project1/utils.d.ts","project1/file.ts","project1/index.ts","project1/file2.ts"]
  options: {"watch":true,"lib":["lib.es5.d.ts","lib.dom.d.ts"],"traceResolution":true,"explainFiles":true,"extendedDiagnostics":true}
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
  Root file specified for compilation
project1/utils.d.ts
  Root file specified for compilation
project1/file.ts
  Root file specified for compilation
project1/index.ts
  Root file specified for compilation
project1/file2.ts
  Root file specified for compilation
[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/home/src/workspace/projects/project1/file.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.xyz = exports.file = void 0;
exports.file = 10;
exports.xyz = 10;




Program root files: [
  "project1/core.d.ts",
  "project1/utils.d.ts",
  "project1/file.ts",
  "project1/index.ts",
  "project1/file2.ts"
]
Program options: {
  "watch": true,
  "lib": [
    "lib.es5.d.ts",
    "lib.dom.d.ts"
  ],
  "traceResolution": true,
  "explainFiles": true,
  "extendedDiagnostics": true
}
Program structureReused: Completely
Program files::
/home/src/tslibs/TS/Lib/lib.es5.d.ts
/home/src/tslibs/TS/Lib/lib.dom.d.ts
/home/src/tslibs/TS/Lib/lib.webworker.d.ts
/home/src/tslibs/TS/Lib/lib.scripthost.d.ts
project1/core.d.ts
project1/utils.d.ts
project1/file.ts
project1/index.ts
project1/file2.ts

Semantic diagnostics in builder refreshed for::
project1/file.ts

Shape signatures in builder refreshed for::
/home/src/workspace/projects/project1/file.ts (computed .d.ts)

exitCode:: ExitStatus.undefined

Change:: delete core

Input::
//// [/home/src/workspace/projects/project1/core.d.ts] deleted

Output::
FileWatcher:: Triggered with project1/core.d.ts 2:: WatchInfo: project1/core.d.ts 250 undefined Source file
Scheduling update
Elapsed:: *ms FileWatcher:: Triggered with project1/core.d.ts 2:: WatchInfo: project1/core.d.ts 250 undefined Source file


Timeout callback:: count: 1
2: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
2: timerToUpdateProgram

Host is moving to new time
After running Timeout callback:: count: 0
Output::
Synchronizing program
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

CreatingProgramWith::
  roots: ["project1/core.d.ts","project1/utils.d.ts","project1/file.ts","project1/index.ts","project1/file2.ts"]
  options: {"watch":true,"lib":["lib.es5.d.ts","lib.dom.d.ts"],"traceResolution":true,"explainFiles":true,"extendedDiagnostics":true}
FileWatcher:: Close:: WatchInfo: project1/core.d.ts 250 undefined Source file
FileWatcher:: Added:: WatchInfo: project1/core.d.ts 500 undefined Missing file
[91merror[0m[90m TS6053: [0mFile 'project1/core.d.ts' not found.
  The file is in the program because:
    Root file specified for compilation

../../tslibs/TS/Lib/lib.es5.d.ts
  Library referenced via 'es5' from file 'project1/file2.ts'
  Library 'lib.es5.d.ts' specified in compilerOptions
../../tslibs/TS/Lib/lib.dom.d.ts
  Library 'lib.dom.d.ts' specified in compilerOptions
../../tslibs/TS/Lib/lib.webworker.d.ts
  Library referenced via 'webworker' from file 'project1/file2.ts'
../../tslibs/TS/Lib/lib.scripthost.d.ts
  Library referenced via 'scripthost' from file 'project1/file2.ts'
project1/utils.d.ts
  Root file specified for compilation
project1/file.ts
  Root file specified for compilation
project1/index.ts
  Root file specified for compilation
project1/file2.ts
  Root file specified for compilation
[[90mHH:MM:SS AM[0m] Found 1 error. Watching for file changes.




PolledWatches::
/home/src/workspace/node_modules/@types:
  {"pollingInterval":500}
/home/src/workspace/projects/node_modules/@types:
  {"pollingInterval":500}
/home/src/workspace/projects/project1/core.d.ts: *new*
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
/home/src/workspace/projects/project1/utils.d.ts:
  {}

FsWatches *deleted*::
/home/src/workspace/projects/project1/core.d.ts:
  {}


Program root files: [
  "project1/core.d.ts",
  "project1/utils.d.ts",
  "project1/file.ts",
  "project1/index.ts",
  "project1/file2.ts"
]
Program options: {
  "watch": true,
  "lib": [
    "lib.es5.d.ts",
    "lib.dom.d.ts"
  ],
  "traceResolution": true,
  "explainFiles": true,
  "extendedDiagnostics": true
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.es5.d.ts
/home/src/tslibs/TS/Lib/lib.dom.d.ts
/home/src/tslibs/TS/Lib/lib.webworker.d.ts
/home/src/tslibs/TS/Lib/lib.scripthost.d.ts
project1/utils.d.ts
project1/file.ts
project1/index.ts
project1/file2.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

exitCode:: ExitStatus.undefined

Change:: delete redirect file dom

Input::
//// [/home/src/workspace/projects/node_modules/@typescript/lib-dom/index.d.ts] deleted

Before running Timeout callback:: count: 0

After running Timeout callback:: count: 0


exitCode:: ExitStatus.undefined

Change:: write redirect file webworker

Input::
//// [/home/src/workspace/projects/node_modules/@typescript/lib-webworker/index.d.ts]
interface WebWorkerInterface { }


Before running Timeout callback:: count: 0

After running Timeout callback:: count: 0

Before running Timeout callback:: count: 0

After running Timeout callback:: count: 0


exitCode:: ExitStatus.undefined

Change:: delete redirect file webworker

Input::
//// [/home/src/workspace/projects/node_modules/@typescript/lib-webworker/index.d.ts] deleted

Before running Timeout callback:: count: 0

After running Timeout callback:: count: 0


exitCode:: ExitStatus.undefined
