currentDirectory:: /home/src/projects useCaseSensitiveFileNames: false
Input::
//// [/home/src/lib/lib.d.ts]
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

//// [/home/src/lib/lib.scripthost.d.ts]
interface ScriptHostInterface { }

//// [/home/src/lib/lib.webworker.d.ts]
interface WebWorkerInterface { }

//// [/home/src/projects/node_modules/@typescript/lib-dom/index.d.ts]
interface DOMInterface { }

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

//// [/home/src/projects/node_modules/@typescript/lib-scripthost/index.d.ts]
interface ScriptHostInterface { }

//// [/home/src/projects/node_modules/@typescript/lib-webworker/index.d.ts]
interface WebworkerInterface { }

//// [/home/src/projects/node_modules/@typescript/unlreated/index.d.ts]
export const unrelated = 10;

//// [/home/src/projects/project1/core.d.ts]
export const core = 10;

//// [/home/src/projects/project1/file.ts]
export const file = 10;

//// [/home/src/projects/project1/file2.ts]
/// <reference lib="webworker"/>
/// <reference lib="scripthost"/>
/// <reference lib="es5"/>


//// [/home/src/projects/project1/index.ts]
export const x = "type1";

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

//// [/home/src/projects/project1/utils.d.ts]
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

//// [/home/src/projects/project2/utils.d.ts]
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

//// [/home/src/projects/project3/utils.d.ts]
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

//// [/home/src/projects/project4/utils.d.ts]
export const y = 10;



Output::
/home/src/lib/tsc project1/core.d.ts project1/utils.d.ts project1/file.ts project1/index.ts project1/file2.ts --lib es5,dom --traceResolution --explainFiles
======== Resolving module '@typescript/lib-webworker' from '/home/src/projects/__lib_node_modules_lookup_lib.webworker.d.ts__.ts'. ========
Explicitly specified module resolution kind: 'Node10'.
Loading module '@typescript/lib-webworker' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
File '/home/src/projects/node_modules/@typescript/lib-webworker/package.json' does not exist.
File '/home/src/projects/node_modules/@typescript/lib-webworker.ts' does not exist.
File '/home/src/projects/node_modules/@typescript/lib-webworker.tsx' does not exist.
File '/home/src/projects/node_modules/@typescript/lib-webworker.d.ts' does not exist.
File '/home/src/projects/node_modules/@typescript/lib-webworker/index.ts' does not exist.
File '/home/src/projects/node_modules/@typescript/lib-webworker/index.tsx' does not exist.
File '/home/src/projects/node_modules/@typescript/lib-webworker/index.d.ts' exists - use it as a name resolution result.
Resolving real path for '/home/src/projects/node_modules/@typescript/lib-webworker/index.d.ts', result '/home/src/projects/node_modules/@typescript/lib-webworker/index.d.ts'.
======== Module name '@typescript/lib-webworker' was successfully resolved to '/home/src/projects/node_modules/@typescript/lib-webworker/index.d.ts'. ========
File '/home/src/projects/node_modules/@typescript/lib-webworker/package.json' does not exist according to earlier cached lookups.
File '/home/src/projects/node_modules/@typescript/package.json' does not exist.
File '/home/src/projects/node_modules/package.json' does not exist.
File '/home/src/projects/package.json' does not exist.
File '/home/src/package.json' does not exist.
File '/home/package.json' does not exist.
File '/package.json' does not exist.
======== Resolving module '@typescript/lib-scripthost' from '/home/src/projects/__lib_node_modules_lookup_lib.scripthost.d.ts__.ts'. ========
Explicitly specified module resolution kind: 'Node10'.
Loading module '@typescript/lib-scripthost' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
File '/home/src/projects/node_modules/@typescript/lib-scripthost/package.json' does not exist.
File '/home/src/projects/node_modules/@typescript/lib-scripthost.ts' does not exist.
File '/home/src/projects/node_modules/@typescript/lib-scripthost.tsx' does not exist.
File '/home/src/projects/node_modules/@typescript/lib-scripthost.d.ts' does not exist.
File '/home/src/projects/node_modules/@typescript/lib-scripthost/index.ts' does not exist.
File '/home/src/projects/node_modules/@typescript/lib-scripthost/index.tsx' does not exist.
File '/home/src/projects/node_modules/@typescript/lib-scripthost/index.d.ts' exists - use it as a name resolution result.
Resolving real path for '/home/src/projects/node_modules/@typescript/lib-scripthost/index.d.ts', result '/home/src/projects/node_modules/@typescript/lib-scripthost/index.d.ts'.
======== Module name '@typescript/lib-scripthost' was successfully resolved to '/home/src/projects/node_modules/@typescript/lib-scripthost/index.d.ts'. ========
File '/home/src/projects/node_modules/@typescript/lib-scripthost/package.json' does not exist according to earlier cached lookups.
File '/home/src/projects/node_modules/@typescript/package.json' does not exist according to earlier cached lookups.
File '/home/src/projects/node_modules/package.json' does not exist according to earlier cached lookups.
File '/home/src/projects/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
======== Resolving module '@typescript/lib-es5' from '/home/src/projects/__lib_node_modules_lookup_lib.es5.d.ts__.ts'. ========
Explicitly specified module resolution kind: 'Node10'.
Loading module '@typescript/lib-es5' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
File '/home/src/projects/node_modules/@typescript/lib-es5/package.json' does not exist.
File '/home/src/projects/node_modules/@typescript/lib-es5.ts' does not exist.
File '/home/src/projects/node_modules/@typescript/lib-es5.tsx' does not exist.
File '/home/src/projects/node_modules/@typescript/lib-es5.d.ts' does not exist.
File '/home/src/projects/node_modules/@typescript/lib-es5/index.ts' does not exist.
File '/home/src/projects/node_modules/@typescript/lib-es5/index.tsx' does not exist.
File '/home/src/projects/node_modules/@typescript/lib-es5/index.d.ts' exists - use it as a name resolution result.
Resolving real path for '/home/src/projects/node_modules/@typescript/lib-es5/index.d.ts', result '/home/src/projects/node_modules/@typescript/lib-es5/index.d.ts'.
======== Module name '@typescript/lib-es5' was successfully resolved to '/home/src/projects/node_modules/@typescript/lib-es5/index.d.ts'. ========
File '/home/src/projects/node_modules/@typescript/lib-es5/package.json' does not exist according to earlier cached lookups.
File '/home/src/projects/node_modules/@typescript/package.json' does not exist according to earlier cached lookups.
File '/home/src/projects/node_modules/package.json' does not exist according to earlier cached lookups.
File '/home/src/projects/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
======== Resolving module '@typescript/lib-dom' from '/home/src/projects/__lib_node_modules_lookup_lib.dom.d.ts__.ts'. ========
Explicitly specified module resolution kind: 'Node10'.
Loading module '@typescript/lib-dom' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
File '/home/src/projects/node_modules/@typescript/lib-dom/package.json' does not exist.
File '/home/src/projects/node_modules/@typescript/lib-dom.ts' does not exist.
File '/home/src/projects/node_modules/@typescript/lib-dom.tsx' does not exist.
File '/home/src/projects/node_modules/@typescript/lib-dom.d.ts' does not exist.
File '/home/src/projects/node_modules/@typescript/lib-dom/index.ts' does not exist.
File '/home/src/projects/node_modules/@typescript/lib-dom/index.tsx' does not exist.
File '/home/src/projects/node_modules/@typescript/lib-dom/index.d.ts' exists - use it as a name resolution result.
Resolving real path for '/home/src/projects/node_modules/@typescript/lib-dom/index.d.ts', result '/home/src/projects/node_modules/@typescript/lib-dom/index.d.ts'.
======== Module name '@typescript/lib-dom' was successfully resolved to '/home/src/projects/node_modules/@typescript/lib-dom/index.d.ts'. ========
File '/home/src/projects/node_modules/@typescript/lib-dom/package.json' does not exist according to earlier cached lookups.
File '/home/src/projects/node_modules/@typescript/package.json' does not exist according to earlier cached lookups.
File '/home/src/projects/node_modules/package.json' does not exist according to earlier cached lookups.
File '/home/src/projects/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
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
  Root file specified for compilation
project1/utils.d.ts
  Root file specified for compilation
project1/file.ts
  Root file specified for compilation
project1/index.ts
  Root file specified for compilation
project1/file2.ts
  Root file specified for compilation
exitCode:: ExitStatus.Success
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
/home/src/projects/node_modules/@typescript/lib-webworker/index.d.ts
/home/src/projects/node_modules/@typescript/lib-scripthost/index.d.ts
/home/src/projects/node_modules/@typescript/lib-es5/index.d.ts
/home/src/projects/node_modules/@typescript/lib-dom/index.d.ts
project1/core.d.ts
project1/utils.d.ts
project1/file.ts
project1/index.ts
project1/file2.ts


//// [/home/src/projects/project1/file.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.file = void 0;
exports.file = 10;


//// [/home/src/projects/project1/file2.js]
/// <reference lib="webworker"/>
/// <reference lib="scripthost"/>
/// <reference lib="es5"/>


//// [/home/src/projects/project1/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = "type1";


