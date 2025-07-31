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
    "traceResolution": true,
    "libReplacement": true
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
    "traceResolution": true,
    "libReplacement": true
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
    "traceResolution": true,
    "libReplacement": true
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
    "traceResolution": true,
    "libReplacement": true
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

//// [/home/src/workspace/projects/node_modules/@typescript/lib-es5/index.d.ts]
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

//// [/home/src/workspace/projects/node_modules/@typescript/lib-esnext/index.d.ts]
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

//// [/home/src/workspace/projects/node_modules/@typescript/lib-dom/index.d.ts]
interface DOMInterface { }

//// [/home/src/workspace/projects/node_modules/@typescript/lib-webworker/index.d.ts]
interface WebWorkerInterface { }

//// [/home/src/workspace/projects/node_modules/@typescript/lib-scripthost/index.d.ts]
interface ScriptHostInterface { }

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
File '/home/src/workspace/projects/node_modules/@typescript/package.json' does not exist.
File '/home/src/workspace/projects/node_modules/package.json' does not exist.
File '/home/src/workspace/projects/package.json' does not exist.
File '/home/src/workspace/package.json' does not exist.
File '/home/src/package.json' does not exist.
File '/home/package.json' does not exist.
File '/package.json' does not exist.
======== Resolving module '@typescript/lib-scripthost' from '/home/src/workspace/projects/__lib_node_modules_lookup_lib.scripthost.d.ts__.ts'. ========
Explicitly specified module resolution kind: 'Node10'.
Loading module '@typescript/lib-scripthost' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
File '/home/src/workspace/projects/node_modules/@typescript/lib-scripthost/package.json' does not exist.
File '/home/src/workspace/projects/node_modules/@typescript/lib-scripthost.ts' does not exist.
File '/home/src/workspace/projects/node_modules/@typescript/lib-scripthost.tsx' does not exist.
File '/home/src/workspace/projects/node_modules/@typescript/lib-scripthost.d.ts' does not exist.
File '/home/src/workspace/projects/node_modules/@typescript/lib-scripthost/index.ts' does not exist.
File '/home/src/workspace/projects/node_modules/@typescript/lib-scripthost/index.tsx' does not exist.
File '/home/src/workspace/projects/node_modules/@typescript/lib-scripthost/index.d.ts' exists - use it as a name resolution result.
Resolving real path for '/home/src/workspace/projects/node_modules/@typescript/lib-scripthost/index.d.ts', result '/home/src/workspace/projects/node_modules/@typescript/lib-scripthost/index.d.ts'.
======== Module name '@typescript/lib-scripthost' was successfully resolved to '/home/src/workspace/projects/node_modules/@typescript/lib-scripthost/index.d.ts'. ========
File '/home/src/workspace/projects/node_modules/@typescript/lib-scripthost/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspace/projects/node_modules/@typescript/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspace/projects/node_modules/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspace/projects/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspace/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
======== Resolving module '@typescript/lib-es5' from '/home/src/workspace/projects/__lib_node_modules_lookup_lib.es5.d.ts__.ts'. ========
Explicitly specified module resolution kind: 'Node10'.
Loading module '@typescript/lib-es5' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
File '/home/src/workspace/projects/node_modules/@typescript/lib-es5/package.json' does not exist.
File '/home/src/workspace/projects/node_modules/@typescript/lib-es5.ts' does not exist.
File '/home/src/workspace/projects/node_modules/@typescript/lib-es5.tsx' does not exist.
File '/home/src/workspace/projects/node_modules/@typescript/lib-es5.d.ts' does not exist.
File '/home/src/workspace/projects/node_modules/@typescript/lib-es5/index.ts' does not exist.
File '/home/src/workspace/projects/node_modules/@typescript/lib-es5/index.tsx' does not exist.
File '/home/src/workspace/projects/node_modules/@typescript/lib-es5/index.d.ts' exists - use it as a name resolution result.
Resolving real path for '/home/src/workspace/projects/node_modules/@typescript/lib-es5/index.d.ts', result '/home/src/workspace/projects/node_modules/@typescript/lib-es5/index.d.ts'.
======== Module name '@typescript/lib-es5' was successfully resolved to '/home/src/workspace/projects/node_modules/@typescript/lib-es5/index.d.ts'. ========
======== Resolving module '@typescript/lib-es2015' from '/home/src/workspace/projects/__lib_node_modules_lookup_lib.es2015.d.ts__.ts'. ========
Explicitly specified module resolution kind: 'Node10'.
Loading module '@typescript/lib-es2015' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
File '/home/src/workspace/projects/node_modules/@typescript/lib-es2015.ts' does not exist.
File '/home/src/workspace/projects/node_modules/@typescript/lib-es2015.tsx' does not exist.
File '/home/src/workspace/projects/node_modules/@typescript/lib-es2015.d.ts' does not exist.
Directory '/home/src/workspace/projects/node_modules/@types' does not exist, skipping all lookups in it.
Scoped package detected, looking in 'typescript__lib-es2015'
Directory '/home/src/workspace/node_modules' does not exist, skipping all lookups in it.
Scoped package detected, looking in 'typescript__lib-es2015'
Directory '/home/src/node_modules' does not exist, skipping all lookups in it.
Scoped package detected, looking in 'typescript__lib-es2015'
Directory '/home/node_modules' does not exist, skipping all lookups in it.
Scoped package detected, looking in 'typescript__lib-es2015'
Directory '/node_modules' does not exist, skipping all lookups in it.
Scoped package detected, looking in 'typescript__lib-es2015'
Loading module '@typescript/lib-es2015' from 'node_modules' folder, target file types: JavaScript.
Searching all ancestor node_modules directories for fallback extensions: JavaScript.
File '/home/src/workspace/projects/node_modules/@typescript/lib-es2015.js' does not exist.
File '/home/src/workspace/projects/node_modules/@typescript/lib-es2015.jsx' does not exist.
Directory '/home/src/workspace/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/node_modules' does not exist, skipping all lookups in it.
Directory '/home/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
======== Module name '@typescript/lib-es2015' was not resolved. ========
File '/home/src/workspace/projects/node_modules/@typescript/lib-es5/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspace/projects/node_modules/@typescript/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspace/projects/node_modules/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspace/projects/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspace/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
======== Resolving module '@typescript/lib-dom' from '/home/src/workspace/projects/__lib_node_modules_lookup_lib.dom.d.ts__.ts'. ========
Explicitly specified module resolution kind: 'Node10'.
Loading module '@typescript/lib-dom' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
File '/home/src/workspace/projects/node_modules/@typescript/lib-dom/package.json' does not exist.
File '/home/src/workspace/projects/node_modules/@typescript/lib-dom.ts' does not exist.
File '/home/src/workspace/projects/node_modules/@typescript/lib-dom.tsx' does not exist.
File '/home/src/workspace/projects/node_modules/@typescript/lib-dom.d.ts' does not exist.
File '/home/src/workspace/projects/node_modules/@typescript/lib-dom/index.ts' does not exist.
File '/home/src/workspace/projects/node_modules/@typescript/lib-dom/index.tsx' does not exist.
File '/home/src/workspace/projects/node_modules/@typescript/lib-dom/index.d.ts' exists - use it as a name resolution result.
Resolving real path for '/home/src/workspace/projects/node_modules/@typescript/lib-dom/index.d.ts', result '/home/src/workspace/projects/node_modules/@typescript/lib-dom/index.d.ts'.
======== Module name '@typescript/lib-dom' was successfully resolved to '/home/src/workspace/projects/node_modules/@typescript/lib-dom/index.d.ts'. ========
======== Resolving module '@typescript/lib-dom/iterable' from '/home/src/workspace/projects/__lib_node_modules_lookup_lib.dom.iterable.d.ts__.ts'. ========
Explicitly specified module resolution kind: 'Node10'.
Loading module '@typescript/lib-dom/iterable' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
File '/home/src/workspace/projects/node_modules/@typescript/lib-dom/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspace/projects/node_modules/@typescript/lib-dom/iterable.ts' does not exist.
File '/home/src/workspace/projects/node_modules/@typescript/lib-dom/iterable.tsx' does not exist.
File '/home/src/workspace/projects/node_modules/@typescript/lib-dom/iterable.d.ts' does not exist.
Directory '/home/src/workspace/projects/node_modules/@types' does not exist, skipping all lookups in it.
Scoped package detected, looking in 'typescript__lib-dom/iterable'
Directory '/home/src/workspace/node_modules' does not exist, skipping all lookups in it.
Scoped package detected, looking in 'typescript__lib-dom/iterable'
Directory '/home/src/node_modules' does not exist, skipping all lookups in it.
Scoped package detected, looking in 'typescript__lib-dom/iterable'
Directory '/home/node_modules' does not exist, skipping all lookups in it.
Scoped package detected, looking in 'typescript__lib-dom/iterable'
Directory '/node_modules' does not exist, skipping all lookups in it.
Scoped package detected, looking in 'typescript__lib-dom/iterable'
Loading module '@typescript/lib-dom/iterable' from 'node_modules' folder, target file types: JavaScript.
Searching all ancestor node_modules directories for fallback extensions: JavaScript.
File '/home/src/workspace/projects/node_modules/@typescript/lib-dom/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspace/projects/node_modules/@typescript/lib-dom/iterable.js' does not exist.
File '/home/src/workspace/projects/node_modules/@typescript/lib-dom/iterable.jsx' does not exist.
Directory '/home/src/workspace/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/node_modules' does not exist, skipping all lookups in it.
Directory '/home/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
======== Module name '@typescript/lib-dom/iterable' was not resolved. ========
File '/home/src/workspace/projects/node_modules/@typescript/lib-dom/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspace/projects/node_modules/@typescript/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspace/projects/node_modules/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspace/projects/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspace/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
[96m../../tslibs/TS/Lib/lib.dom.iterable.d.ts[0m:[93m11[0m:[93m38[0m - [91merror[0m[90m TS2374: [0mDuplicate index signature for type 'number'.

[7m11[0m interface Array<T> { length: number; [n: number]: T; }
[7m  [0m [91m                                     ~~~~~~~~~~~~~~~[0m

[96m../../tslibs/TS/Lib/lib.dom.iterable.d.ts[0m:[93m13[0m:[93m15[0m - [91merror[0m[90m TS2451: [0mCannot redeclare block-scoped variable 'console'.

[7m13[0m declare const console: { log(msg: any): void; };
[7m  [0m [91m              ~~~~~~~[0m

  [96m../../tslibs/TS/Lib/lib.es2015.d.ts[0m:[93m13[0m:[93m15[0m
    [7m13[0m declare const console: { log(msg: any): void; };
    [7m  [0m [96m              ~~~~~~~[0m
    'console' was also declared here.

[96m../../tslibs/TS/Lib/lib.es2015.d.ts[0m:[93m11[0m:[93m38[0m - [91merror[0m[90m TS2374: [0mDuplicate index signature for type 'number'.

[7m11[0m interface Array<T> { length: number; [n: number]: T; }
[7m  [0m [91m                                     ~~~~~~~~~~~~~~~[0m

[96m../../tslibs/TS/Lib/lib.es2015.d.ts[0m:[93m13[0m:[93m15[0m - [91merror[0m[90m TS2451: [0mCannot redeclare block-scoped variable 'console'.

[7m13[0m declare const console: { log(msg: any): void; };
[7m  [0m [91m              ~~~~~~~[0m

  [96m../../tslibs/TS/Lib/lib.dom.iterable.d.ts[0m:[93m13[0m:[93m15[0m
    [7m13[0m declare const console: { log(msg: any): void; };
    [7m  [0m [96m              ~~~~~~~[0m
    'console' was also declared here.
  [96mnode_modules/@typescript/lib-es5/index.d.ts[0m:[93m13[0m:[93m15[0m
    [7m13[0m declare const console: { log(msg: any): void; };
    [7m  [0m [96m              ~~~~~~~[0m
    and here.

[96mnode_modules/@typescript/lib-es5/index.d.ts[0m:[93m11[0m:[93m38[0m - [91merror[0m[90m TS2374: [0mDuplicate index signature for type 'number'.

[7m11[0m interface Array<T> { length: number; [n: number]: T; }
[7m  [0m [91m                                     ~~~~~~~~~~~~~~~[0m

[96mnode_modules/@typescript/lib-es5/index.d.ts[0m:[93m13[0m:[93m15[0m - [91merror[0m[90m TS2451: [0mCannot redeclare block-scoped variable 'console'.

[7m13[0m declare const console: { log(msg: any): void; };
[7m  [0m [91m              ~~~~~~~[0m

  [96m../../tslibs/TS/Lib/lib.es2015.d.ts[0m:[93m13[0m:[93m15[0m
    [7m13[0m declare const console: { log(msg: any): void; };
    [7m  [0m [96m              ~~~~~~~[0m
    'console' was also declared here.

../../tslibs/TS/Lib/lib.es2015.d.ts
  Library referenced via 'es5' from file 'project1/file2.ts'
  Library 'lib.es5.d.ts' specified in compilerOptions
../../tslibs/TS/Lib/lib.dom.iterable.d.ts
  Library 'lib.dom.d.ts' specified in compilerOptions
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

Found 6 errors in 3 files.

Errors  Files
     2  ../../tslibs/TS/Lib/lib.dom.iterable.d.ts[90m:11[0m
     2  ../../tslibs/TS/Lib/lib.es2015.d.ts[90m:11[0m
     2  node_modules/@typescript/lib-es5/index.d.ts[90m:11[0m


//// [/home/src/tslibs/TS/Lib/lib.es2015.d.ts] *Lib*

//// [/home/src/tslibs/TS/Lib/lib.dom.iterable.d.ts] *Lib*

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
/home/src/tslibs/TS/Lib/lib.es2015.d.ts
/home/src/tslibs/TS/Lib/lib.dom.iterable.d.ts
/home/src/workspace/projects/node_modules/@typescript/lib-webworker/index.d.ts
/home/src/workspace/projects/node_modules/@typescript/lib-scripthost/index.d.ts
/home/src/workspace/projects/node_modules/@typescript/lib-es5/index.d.ts
/home/src/workspace/projects/node_modules/@typescript/lib-dom/index.d.ts
project1/core.d.ts
project1/utils.d.ts
project1/file.ts
project1/index.ts
project1/file2.ts

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated
