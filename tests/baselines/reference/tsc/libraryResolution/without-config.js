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


/home/src/tslibs/TS/Lib/tsc.js project1/core.d.ts project1/utils.d.ts project1/file.ts project1/index.ts project1/file2.ts --lib es5,dom --traceResolution --explainFiles
Output::
======== Resolving module '@typescript/lib-webworker' from '/home/src/workspace/projects/__lib_node_modules_lookup_lib.webworker.d.ts__.ts'. ========
Explicitly specified module resolution kind: 'Node10'.
Loading module '@typescript/lib-webworker' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
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
File '/home/src/workspace/projects/node_modules/@typescript/lib-webworker.js' does not exist.
File '/home/src/workspace/projects/node_modules/@typescript/lib-webworker.jsx' does not exist.
Directory '/home/src/workspace/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/node_modules' does not exist, skipping all lookups in it.
Directory '/home/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
======== Module name '@typescript/lib-webworker' was not resolved. ========
======== Resolving module '@typescript/lib-scripthost' from '/home/src/workspace/projects/__lib_node_modules_lookup_lib.scripthost.d.ts__.ts'. ========
Explicitly specified module resolution kind: 'Node10'.
Loading module '@typescript/lib-scripthost' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
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
File '/home/src/workspace/projects/node_modules/@typescript/lib-scripthost.js' does not exist.
File '/home/src/workspace/projects/node_modules/@typescript/lib-scripthost.jsx' does not exist.
Directory '/home/src/workspace/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/node_modules' does not exist, skipping all lookups in it.
Directory '/home/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
======== Module name '@typescript/lib-scripthost' was not resolved. ========
======== Resolving module '@typescript/lib-es5' from '/home/src/workspace/projects/__lib_node_modules_lookup_lib.es5.d.ts__.ts'. ========
Explicitly specified module resolution kind: 'Node10'.
Loading module '@typescript/lib-es5' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
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
File '/home/src/workspace/projects/node_modules/@typescript/lib-es5.js' does not exist.
File '/home/src/workspace/projects/node_modules/@typescript/lib-es5.jsx' does not exist.
Directory '/home/src/workspace/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/node_modules' does not exist, skipping all lookups in it.
Directory '/home/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
======== Module name '@typescript/lib-es5' was not resolved. ========
======== Resolving module '@typescript/lib-dom' from '/home/src/workspace/projects/__lib_node_modules_lookup_lib.dom.d.ts__.ts'. ========
Explicitly specified module resolution kind: 'Node10'.
Loading module '@typescript/lib-dom' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
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
File '/home/src/workspace/projects/node_modules/@typescript/lib-dom.js' does not exist.
File '/home/src/workspace/projects/node_modules/@typescript/lib-dom.jsx' does not exist.
Directory '/home/src/workspace/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/node_modules' does not exist, skipping all lookups in it.
Directory '/home/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
======== Module name '@typescript/lib-dom' was not resolved. ========
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



Program root files: [
  "project1/core.d.ts",
  "project1/utils.d.ts",
  "project1/file.ts",
  "project1/index.ts",
  "project1/file2.ts"
]
Program options: {
  "lib": [
    "lib.es5.d.ts",
    "lib.dom.d.ts"
  ],
  "traceResolution": true,
  "explainFiles": true
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

exitCode:: ExitStatus.Success
