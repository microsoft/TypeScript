Input::
//// [/src/project/tsconfig.json]
{"compilerOptions":{"composite":true,"cacheResolutions":true,"traceResolution":true},"files":["fileWithImports.ts","randomFileForImport.ts","a/fileWithImports.ts","b/ba/fileWithImports.ts","b/randomFileForImport.ts","c/ca/fileWithImports.ts","c/ca/caa/randomFileForImport.ts","c/ca/caa/caaa/fileWithImports.ts","c/cb/fileWithImports.ts","d/da/daa/daaa/fileWithImports.ts","d/da/daa/fileWithImports.ts","d/da/fileWithImports.ts","e/ea/fileWithImports.ts","e/ea/eaa/fileWithImports.ts","e/ea/eaa/eaaa/fileWithImports.ts"]}

//// [/src/project/fileWithImports.ts]
import type { ImportInterface0 } from "pkg0";


//// [/src/project/randomFileForImport.ts]
export const x = 10;

//// [/src/project/a/fileWithImports.ts]
import type { ImportInterface0 } from "pkg0";


//// [/src/project/b/ba/fileWithImports.ts]
import type { ImportInterface0 } from "pkg0";


//// [/src/project/b/randomFileForImport.ts]
export const x = 10;

//// [/src/project/c/ca/fileWithImports.ts]
import type { ImportInterface0 } from "pkg0";


//// [/src/project/c/ca/caa/randomFileForImport.ts]
export const x = 10;

//// [/src/project/c/ca/caa/caaa/fileWithImports.ts]
import type { ImportInterface0 } from "pkg0";


//// [/src/project/c/cb/fileWithImports.ts]
import type { ImportInterface0 } from "pkg0";


//// [/src/project/d/da/daa/daaa/fileWithImports.ts]
import type { ImportInterface0 } from "pkg0";


//// [/src/project/d/da/daa/fileWithImports.ts]
import type { ImportInterface0 } from "pkg0";


//// [/src/project/d/da/fileWithImports.ts]
import type { ImportInterface0 } from "pkg0";


//// [/src/project/e/ea/fileWithImports.ts]
import type { ImportInterface0 } from "pkg0";


//// [/src/project/e/ea/eaa/fileWithImports.ts]
import type { ImportInterface0 } from "pkg0";


//// [/src/project/e/ea/eaa/eaaa/fileWithImports.ts]
import type { ImportInterface0 } from "pkg0";


//// [/src/project/node_modules/pkg0/index.d.ts]
export interface ImportInterface0 {}

//// [/a/lib/lib.d.ts]
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


/a/lib/tsc.js -b -w --explainFiles
Output::
>> Screen clear
[[90m12:01:23 AM[0m] Starting compilation in watch mode...

======== Resolving module 'pkg0' from '/src/project/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg0' from 'node_modules' folder, target file type 'TypeScript'.
File '/src/project/node_modules/pkg0/package.json' does not exist.
File '/src/project/node_modules/pkg0.ts' does not exist.
File '/src/project/node_modules/pkg0.tsx' does not exist.
File '/src/project/node_modules/pkg0.d.ts' does not exist.
File '/src/project/node_modules/pkg0/index.ts' does not exist.
File '/src/project/node_modules/pkg0/index.tsx' does not exist.
File '/src/project/node_modules/pkg0/index.d.ts' exist - use it as a name resolution result.
Resolving real path for '/src/project/node_modules/pkg0/index.d.ts', result '/src/project/node_modules/pkg0/index.d.ts'.
======== Module name 'pkg0' was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'. ========
======== Resolving module 'pkg0' from '/src/project/a/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg0' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/a/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg0' was found in cache from location '/src/project'.
======== Module name 'pkg0' was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'. ========
======== Resolving module 'pkg0' from '/src/project/b/ba/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg0' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/b/ba/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/b/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg0' was found in cache from location '/src/project'.
======== Module name 'pkg0' was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'. ========
======== Resolving module 'pkg0' from '/src/project/c/ca/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg0' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/c/ca/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/c/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg0' was found in cache from location '/src/project'.
======== Module name 'pkg0' was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'. ========
======== Resolving module 'pkg0' from '/src/project/c/ca/caa/caaa/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg0' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/c/ca/caa/caaa/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/c/ca/caa/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg0' was found in cache from location '/src/project/c/ca'.
======== Module name 'pkg0' was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'. ========
======== Resolving module 'pkg0' from '/src/project/c/cb/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg0' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/c/cb/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg0' was found in cache from location '/src/project/c'.
======== Module name 'pkg0' was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'. ========
======== Resolving module 'pkg0' from '/src/project/d/da/daa/daaa/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg0' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/d/da/daa/daaa/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/d/da/daa/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/d/da/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/d/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg0' was found in cache from location '/src/project'.
======== Module name 'pkg0' was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'. ========
======== Resolving module 'pkg0' from '/src/project/d/da/daa/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg0' from 'node_modules' folder, target file type 'TypeScript'.
Resolution for module 'pkg0' was found in cache from location '/src/project/d/da/daa'.
======== Module name 'pkg0' was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'. ========
======== Resolving module 'pkg0' from '/src/project/d/da/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg0' from 'node_modules' folder, target file type 'TypeScript'.
Resolution for module 'pkg0' was found in cache from location '/src/project/d/da'.
======== Module name 'pkg0' was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'. ========
======== Resolving module 'pkg0' from '/src/project/e/ea/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg0' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/e/ea/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/e/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg0' was found in cache from location '/src/project'.
======== Module name 'pkg0' was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'. ========
======== Resolving module 'pkg0' from '/src/project/e/ea/eaa/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg0' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/e/ea/eaa/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg0' was found in cache from location '/src/project/e/ea'.
======== Module name 'pkg0' was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'. ========
======== Resolving module 'pkg0' from '/src/project/e/ea/eaa/eaaa/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg0' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/e/ea/eaa/eaaa/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg0' was found in cache from location '/src/project/e/ea/eaa'.
======== Module name 'pkg0' was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'. ========
../../a/lib/lib.d.ts
  Default library for target 'es3'
node_modules/pkg0/index.d.ts
  Imported via "pkg0" from file 'fileWithImports.ts'
  Imported via "pkg0" from file 'a/fileWithImports.ts'
  Imported via "pkg0" from file 'b/ba/fileWithImports.ts'
  Imported via "pkg0" from file 'c/ca/fileWithImports.ts'
  Imported via "pkg0" from file 'c/ca/caa/caaa/fileWithImports.ts'
  Imported via "pkg0" from file 'c/cb/fileWithImports.ts'
  Imported via "pkg0" from file 'd/da/daa/daaa/fileWithImports.ts'
  Imported via "pkg0" from file 'd/da/daa/fileWithImports.ts'
  Imported via "pkg0" from file 'd/da/fileWithImports.ts'
  Imported via "pkg0" from file 'e/ea/fileWithImports.ts'
  Imported via "pkg0" from file 'e/ea/eaa/fileWithImports.ts'
  Imported via "pkg0" from file 'e/ea/eaa/eaaa/fileWithImports.ts'
fileWithImports.ts
  Part of 'files' list in tsconfig.json
randomFileForImport.ts
  Part of 'files' list in tsconfig.json
a/fileWithImports.ts
  Part of 'files' list in tsconfig.json
b/ba/fileWithImports.ts
  Part of 'files' list in tsconfig.json
b/randomFileForImport.ts
  Part of 'files' list in tsconfig.json
c/ca/fileWithImports.ts
  Part of 'files' list in tsconfig.json
c/ca/caa/randomFileForImport.ts
  Part of 'files' list in tsconfig.json
c/ca/caa/caaa/fileWithImports.ts
  Part of 'files' list in tsconfig.json
c/cb/fileWithImports.ts
  Part of 'files' list in tsconfig.json
d/da/daa/daaa/fileWithImports.ts
  Part of 'files' list in tsconfig.json
d/da/daa/fileWithImports.ts
  Part of 'files' list in tsconfig.json
d/da/fileWithImports.ts
  Part of 'files' list in tsconfig.json
e/ea/fileWithImports.ts
  Part of 'files' list in tsconfig.json
e/ea/eaa/fileWithImports.ts
  Part of 'files' list in tsconfig.json
e/ea/eaa/eaaa/fileWithImports.ts
  Part of 'files' list in tsconfig.json
[[90m12:02:29 AM[0m] Found 0 errors. Watching for file changes.



Program root files: ["/src/project/fileWithImports.ts","/src/project/randomFileForImport.ts","/src/project/a/fileWithImports.ts","/src/project/b/ba/fileWithImports.ts","/src/project/b/randomFileForImport.ts","/src/project/c/ca/fileWithImports.ts","/src/project/c/ca/caa/randomFileForImport.ts","/src/project/c/ca/caa/caaa/fileWithImports.ts","/src/project/c/cb/fileWithImports.ts","/src/project/d/da/daa/daaa/fileWithImports.ts","/src/project/d/da/daa/fileWithImports.ts","/src/project/d/da/fileWithImports.ts","/src/project/e/ea/fileWithImports.ts","/src/project/e/ea/eaa/fileWithImports.ts","/src/project/e/ea/eaa/eaaa/fileWithImports.ts"]
Program options: {"composite":true,"cacheResolutions":true,"traceResolution":true,"watch":true,"explainFiles":true,"configFilePath":"/src/project/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/src/project/node_modules/pkg0/index.d.ts
/src/project/fileWithImports.ts
/src/project/randomFileForImport.ts
/src/project/a/fileWithImports.ts
/src/project/b/ba/fileWithImports.ts
/src/project/b/randomFileForImport.ts
/src/project/c/ca/fileWithImports.ts
/src/project/c/ca/caa/randomFileForImport.ts
/src/project/c/ca/caa/caaa/fileWithImports.ts
/src/project/c/cb/fileWithImports.ts
/src/project/d/da/daa/daaa/fileWithImports.ts
/src/project/d/da/daa/fileWithImports.ts
/src/project/d/da/fileWithImports.ts
/src/project/e/ea/fileWithImports.ts
/src/project/e/ea/eaa/fileWithImports.ts
/src/project/e/ea/eaa/eaaa/fileWithImports.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/src/project/node_modules/pkg0/index.d.ts
/src/project/fileWithImports.ts
/src/project/randomFileForImport.ts
/src/project/a/fileWithImports.ts
/src/project/b/ba/fileWithImports.ts
/src/project/b/randomFileForImport.ts
/src/project/c/ca/fileWithImports.ts
/src/project/c/ca/caa/randomFileForImport.ts
/src/project/c/ca/caa/caaa/fileWithImports.ts
/src/project/c/cb/fileWithImports.ts
/src/project/d/da/daa/daaa/fileWithImports.ts
/src/project/d/da/daa/fileWithImports.ts
/src/project/d/da/fileWithImports.ts
/src/project/e/ea/fileWithImports.ts
/src/project/e/ea/eaa/fileWithImports.ts
/src/project/e/ea/eaa/eaaa/fileWithImports.ts

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/src/project/node_modules/pkg0/index.d.ts (used version)
/src/project/filewithimports.ts (computed .d.ts during emit)
/src/project/randomfileforimport.ts (computed .d.ts during emit)
/src/project/a/filewithimports.ts (computed .d.ts during emit)
/src/project/b/ba/filewithimports.ts (computed .d.ts during emit)
/src/project/b/randomfileforimport.ts (computed .d.ts during emit)
/src/project/c/ca/filewithimports.ts (computed .d.ts during emit)
/src/project/c/ca/caa/randomfileforimport.ts (computed .d.ts during emit)
/src/project/c/ca/caa/caaa/filewithimports.ts (computed .d.ts during emit)
/src/project/c/cb/filewithimports.ts (computed .d.ts during emit)
/src/project/d/da/daa/daaa/filewithimports.ts (computed .d.ts during emit)
/src/project/d/da/daa/filewithimports.ts (computed .d.ts during emit)
/src/project/d/da/filewithimports.ts (computed .d.ts during emit)
/src/project/e/ea/filewithimports.ts (computed .d.ts during emit)
/src/project/e/ea/eaa/filewithimports.ts (computed .d.ts during emit)
/src/project/e/ea/eaa/eaaa/filewithimports.ts (computed .d.ts during emit)

WatchedFiles::
/src/project/tsconfig.json:
  {"fileName":"/src/project/tsconfig.json","pollingInterval":250}
/src/project/filewithimports.ts:
  {"fileName":"/src/project/fileWithImports.ts","pollingInterval":250}
/src/project/randomfileforimport.ts:
  {"fileName":"/src/project/randomFileForImport.ts","pollingInterval":250}
/src/project/a/filewithimports.ts:
  {"fileName":"/src/project/a/fileWithImports.ts","pollingInterval":250}
/src/project/b/ba/filewithimports.ts:
  {"fileName":"/src/project/b/ba/fileWithImports.ts","pollingInterval":250}
/src/project/b/randomfileforimport.ts:
  {"fileName":"/src/project/b/randomFileForImport.ts","pollingInterval":250}
/src/project/c/ca/filewithimports.ts:
  {"fileName":"/src/project/c/ca/fileWithImports.ts","pollingInterval":250}
/src/project/c/ca/caa/randomfileforimport.ts:
  {"fileName":"/src/project/c/ca/caa/randomFileForImport.ts","pollingInterval":250}
/src/project/c/ca/caa/caaa/filewithimports.ts:
  {"fileName":"/src/project/c/ca/caa/caaa/fileWithImports.ts","pollingInterval":250}
/src/project/c/cb/filewithimports.ts:
  {"fileName":"/src/project/c/cb/fileWithImports.ts","pollingInterval":250}
/src/project/d/da/daa/daaa/filewithimports.ts:
  {"fileName":"/src/project/d/da/daa/daaa/fileWithImports.ts","pollingInterval":250}
/src/project/d/da/daa/filewithimports.ts:
  {"fileName":"/src/project/d/da/daa/fileWithImports.ts","pollingInterval":250}
/src/project/d/da/filewithimports.ts:
  {"fileName":"/src/project/d/da/fileWithImports.ts","pollingInterval":250}
/src/project/e/ea/filewithimports.ts:
  {"fileName":"/src/project/e/ea/fileWithImports.ts","pollingInterval":250}
/src/project/e/ea/eaa/filewithimports.ts:
  {"fileName":"/src/project/e/ea/eaa/fileWithImports.ts","pollingInterval":250}
/src/project/e/ea/eaa/eaaa/filewithimports.ts:
  {"fileName":"/src/project/e/ea/eaa/eaaa/fileWithImports.ts","pollingInterval":250}
/src/project/node_modules/pkg0/package.json:
  {"fileName":"/src/project/node_modules/pkg0/package.json","pollingInterval":250}

FsWatches::

FsWatchesRecursive::

exitCode:: ExitStatus.undefined

//// [/src/project/fileWithImports.js]
"use strict";
exports.__esModule = true;


//// [/src/project/fileWithImports.d.ts]
export {};


//// [/src/project/randomFileForImport.js]
"use strict";
exports.__esModule = true;
exports.x = void 0;
exports.x = 10;


//// [/src/project/randomFileForImport.d.ts]
export declare const x = 10;


//// [/src/project/a/fileWithImports.js]
"use strict";
exports.__esModule = true;


//// [/src/project/a/fileWithImports.d.ts]
export {};


//// [/src/project/b/ba/fileWithImports.js]
"use strict";
exports.__esModule = true;


//// [/src/project/b/ba/fileWithImports.d.ts]
export {};


//// [/src/project/b/randomFileForImport.js]
"use strict";
exports.__esModule = true;
exports.x = void 0;
exports.x = 10;


//// [/src/project/b/randomFileForImport.d.ts]
export declare const x = 10;


//// [/src/project/c/ca/fileWithImports.js]
"use strict";
exports.__esModule = true;


//// [/src/project/c/ca/fileWithImports.d.ts]
export {};


//// [/src/project/c/ca/caa/randomFileForImport.js]
"use strict";
exports.__esModule = true;
exports.x = void 0;
exports.x = 10;


//// [/src/project/c/ca/caa/randomFileForImport.d.ts]
export declare const x = 10;


//// [/src/project/c/ca/caa/caaa/fileWithImports.js]
"use strict";
exports.__esModule = true;


//// [/src/project/c/ca/caa/caaa/fileWithImports.d.ts]
export {};


//// [/src/project/c/cb/fileWithImports.js]
"use strict";
exports.__esModule = true;


//// [/src/project/c/cb/fileWithImports.d.ts]
export {};


//// [/src/project/d/da/daa/daaa/fileWithImports.js]
"use strict";
exports.__esModule = true;


//// [/src/project/d/da/daa/daaa/fileWithImports.d.ts]
export {};


//// [/src/project/d/da/daa/fileWithImports.js]
"use strict";
exports.__esModule = true;


//// [/src/project/d/da/daa/fileWithImports.d.ts]
export {};


//// [/src/project/d/da/fileWithImports.js]
"use strict";
exports.__esModule = true;


//// [/src/project/d/da/fileWithImports.d.ts]
export {};


//// [/src/project/e/ea/fileWithImports.js]
"use strict";
exports.__esModule = true;


//// [/src/project/e/ea/fileWithImports.d.ts]
export {};


//// [/src/project/e/ea/eaa/fileWithImports.js]
"use strict";
exports.__esModule = true;


//// [/src/project/e/ea/eaa/fileWithImports.d.ts]
export {};


//// [/src/project/e/ea/eaa/eaaa/fileWithImports.js]
"use strict";
exports.__esModule = true;


//// [/src/project/e/ea/eaa/eaaa/fileWithImports.d.ts]
export {};


//// [/src/project/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../a/lib/lib.d.ts","./node_modules/pkg0/index.d.ts","./filewithimports.ts","./randomfileforimport.ts","./a/filewithimports.ts","./b/ba/filewithimports.ts","./b/randomfileforimport.ts","./c/ca/filewithimports.ts","./c/ca/caa/randomfileforimport.ts","./c/ca/caa/caaa/filewithimports.ts","./c/cb/filewithimports.ts","./d/da/daa/daaa/filewithimports.ts","./d/da/daa/filewithimports.ts","./d/da/filewithimports.ts","./e/ea/filewithimports.ts","./e/ea/eaa/filewithimports.ts","./e/ea/eaa/eaaa/filewithimports.ts","./a","./b/ba","./c/ca/caa/caaa","./c/cb","./d/da/daa/daaa","./e/ea/eaa/eaaa","./node_modules/pkg0/package.json","./node_modules/pkg0.ts","./node_modules/pkg0.tsx","./node_modules/pkg0.d.ts","./node_modules/pkg0/index.ts","./node_modules/pkg0/index.tsx","./a/node_modules/pkg0/package.json","./a/node_modules/pkg0.ts","./a/node_modules/pkg0.tsx","./a/node_modules/pkg0.d.ts","./a/node_modules/pkg0/index.ts","./a/node_modules/pkg0/index.tsx","./a/node_modules/pkg0/index.d.ts","./a/node_modules/@types/pkg0/package.json","./a/node_modules/@types/pkg0.d.ts","./a/node_modules/@types/pkg0/index.d.ts","./b/ba/node_modules/pkg0/package.json","./b/ba/node_modules/pkg0.ts","./b/ba/node_modules/pkg0.tsx","./b/ba/node_modules/pkg0.d.ts","./b/ba/node_modules/pkg0/index.ts","./b/ba/node_modules/pkg0/index.tsx","./b/ba/node_modules/pkg0/index.d.ts","./b/ba/node_modules/@types/pkg0/package.json","./b/ba/node_modules/@types/pkg0.d.ts","./b/ba/node_modules/@types/pkg0/index.d.ts","./b/node_modules/pkg0/package.json","./b/node_modules/pkg0.ts","./b/node_modules/pkg0.tsx","./b/node_modules/pkg0.d.ts","./b/node_modules/pkg0/index.ts","./b/node_modules/pkg0/index.tsx","./b/node_modules/pkg0/index.d.ts","./b/node_modules/@types/pkg0/package.json","./b/node_modules/@types/pkg0.d.ts","./b/node_modules/@types/pkg0/index.d.ts","./c/ca/node_modules/pkg0/package.json","./c/ca/node_modules/pkg0.ts","./c/ca/node_modules/pkg0.tsx","./c/ca/node_modules/pkg0.d.ts","./c/ca/node_modules/pkg0/index.ts","./c/ca/node_modules/pkg0/index.tsx","./c/ca/node_modules/pkg0/index.d.ts","./c/ca/node_modules/@types/pkg0/package.json","./c/ca/node_modules/@types/pkg0.d.ts","./c/ca/node_modules/@types/pkg0/index.d.ts","./c/node_modules/pkg0/package.json","./c/node_modules/pkg0.ts","./c/node_modules/pkg0.tsx","./c/node_modules/pkg0.d.ts","./c/node_modules/pkg0/index.ts","./c/node_modules/pkg0/index.tsx","./c/node_modules/pkg0/index.d.ts","./c/node_modules/@types/pkg0/package.json","./c/node_modules/@types/pkg0.d.ts","./c/node_modules/@types/pkg0/index.d.ts","./c/ca/caa/caaa/node_modules/pkg0/package.json","./c/ca/caa/caaa/node_modules/pkg0.ts","./c/ca/caa/caaa/node_modules/pkg0.tsx","./c/ca/caa/caaa/node_modules/pkg0.d.ts","./c/ca/caa/caaa/node_modules/pkg0/index.ts","./c/ca/caa/caaa/node_modules/pkg0/index.tsx","./c/ca/caa/caaa/node_modules/pkg0/index.d.ts","./c/ca/caa/caaa/node_modules/@types/pkg0/package.json","./c/ca/caa/caaa/node_modules/@types/pkg0.d.ts","./c/ca/caa/caaa/node_modules/@types/pkg0/index.d.ts","./c/ca/caa/node_modules/pkg0/package.json","./c/ca/caa/node_modules/pkg0.ts","./c/ca/caa/node_modules/pkg0.tsx","./c/ca/caa/node_modules/pkg0.d.ts","./c/ca/caa/node_modules/pkg0/index.ts","./c/ca/caa/node_modules/pkg0/index.tsx","./c/ca/caa/node_modules/pkg0/index.d.ts","./c/ca/caa/node_modules/@types/pkg0/package.json","./c/ca/caa/node_modules/@types/pkg0.d.ts","./c/ca/caa/node_modules/@types/pkg0/index.d.ts","./c/cb/node_modules/pkg0/package.json","./c/cb/node_modules/pkg0.ts","./c/cb/node_modules/pkg0.tsx","./c/cb/node_modules/pkg0.d.ts","./c/cb/node_modules/pkg0/index.ts","./c/cb/node_modules/pkg0/index.tsx","./c/cb/node_modules/pkg0/index.d.ts","./c/cb/node_modules/@types/pkg0/package.json","./c/cb/node_modules/@types/pkg0.d.ts","./c/cb/node_modules/@types/pkg0/index.d.ts","./d/da/daa/daaa/node_modules/pkg0/package.json","./d/da/daa/daaa/node_modules/pkg0.ts","./d/da/daa/daaa/node_modules/pkg0.tsx","./d/da/daa/daaa/node_modules/pkg0.d.ts","./d/da/daa/daaa/node_modules/pkg0/index.ts","./d/da/daa/daaa/node_modules/pkg0/index.tsx","./d/da/daa/daaa/node_modules/pkg0/index.d.ts","./d/da/daa/daaa/node_modules/@types/pkg0/package.json","./d/da/daa/daaa/node_modules/@types/pkg0.d.ts","./d/da/daa/daaa/node_modules/@types/pkg0/index.d.ts","./d/da/daa/node_modules/pkg0/package.json","./d/da/daa/node_modules/pkg0.ts","./d/da/daa/node_modules/pkg0.tsx","./d/da/daa/node_modules/pkg0.d.ts","./d/da/daa/node_modules/pkg0/index.ts","./d/da/daa/node_modules/pkg0/index.tsx","./d/da/daa/node_modules/pkg0/index.d.ts","./d/da/daa/node_modules/@types/pkg0/package.json","./d/da/daa/node_modules/@types/pkg0.d.ts","./d/da/daa/node_modules/@types/pkg0/index.d.ts","./d/da/node_modules/pkg0/package.json","./d/da/node_modules/pkg0.ts","./d/da/node_modules/pkg0.tsx","./d/da/node_modules/pkg0.d.ts","./d/da/node_modules/pkg0/index.ts","./d/da/node_modules/pkg0/index.tsx","./d/da/node_modules/pkg0/index.d.ts","./d/da/node_modules/@types/pkg0/package.json","./d/da/node_modules/@types/pkg0.d.ts","./d/da/node_modules/@types/pkg0/index.d.ts","./d/node_modules/pkg0/package.json","./d/node_modules/pkg0.ts","./d/node_modules/pkg0.tsx","./d/node_modules/pkg0.d.ts","./d/node_modules/pkg0/index.ts","./d/node_modules/pkg0/index.tsx","./d/node_modules/pkg0/index.d.ts","./d/node_modules/@types/pkg0/package.json","./d/node_modules/@types/pkg0.d.ts","./d/node_modules/@types/pkg0/index.d.ts","./e/ea/node_modules/pkg0/package.json","./e/ea/node_modules/pkg0.ts","./e/ea/node_modules/pkg0.tsx","./e/ea/node_modules/pkg0.d.ts","./e/ea/node_modules/pkg0/index.ts","./e/ea/node_modules/pkg0/index.tsx","./e/ea/node_modules/pkg0/index.d.ts","./e/ea/node_modules/@types/pkg0/package.json","./e/ea/node_modules/@types/pkg0.d.ts","./e/ea/node_modules/@types/pkg0/index.d.ts","./e/node_modules/pkg0/package.json","./e/node_modules/pkg0.ts","./e/node_modules/pkg0.tsx","./e/node_modules/pkg0.d.ts","./e/node_modules/pkg0/index.ts","./e/node_modules/pkg0/index.tsx","./e/node_modules/pkg0/index.d.ts","./e/node_modules/@types/pkg0/package.json","./e/node_modules/@types/pkg0.d.ts","./e/node_modules/@types/pkg0/index.d.ts","./e/ea/eaa/node_modules/pkg0/package.json","./e/ea/eaa/node_modules/pkg0.ts","./e/ea/eaa/node_modules/pkg0.tsx","./e/ea/eaa/node_modules/pkg0.d.ts","./e/ea/eaa/node_modules/pkg0/index.ts","./e/ea/eaa/node_modules/pkg0/index.tsx","./e/ea/eaa/node_modules/pkg0/index.d.ts","./e/ea/eaa/node_modules/@types/pkg0/package.json","./e/ea/eaa/node_modules/@types/pkg0.d.ts","./e/ea/eaa/node_modules/@types/pkg0/index.d.ts","./e/ea/eaa/eaaa/node_modules/pkg0/package.json","./e/ea/eaa/eaaa/node_modules/pkg0.ts","./e/ea/eaa/eaaa/node_modules/pkg0.tsx","./e/ea/eaa/eaaa/node_modules/pkg0.d.ts","./e/ea/eaa/eaaa/node_modules/pkg0/index.ts","./e/ea/eaa/eaaa/node_modules/pkg0/index.tsx","./e/ea/eaa/eaaa/node_modules/pkg0/index.d.ts","./e/ea/eaa/eaaa/node_modules/@types/pkg0/package.json","./e/ea/eaa/eaaa/node_modules/@types/pkg0.d.ts","./e/ea/eaa/eaaa/node_modules/@types/pkg0/index.d.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},"769951468-export interface ImportInterface0 {}",{"version":"7372004325-import type { ImportInterface0 } from \"pkg0\";\n","signature":"-3531856636-export {};\n"},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n"},{"version":"7372004325-import type { ImportInterface0 } from \"pkg0\";\n","signature":"-3531856636-export {};\n"},{"version":"7372004325-import type { ImportInterface0 } from \"pkg0\";\n","signature":"-3531856636-export {};\n"},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n"},{"version":"7372004325-import type { ImportInterface0 } from \"pkg0\";\n","signature":"-3531856636-export {};\n"},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n"},{"version":"7372004325-import type { ImportInterface0 } from \"pkg0\";\n","signature":"-3531856636-export {};\n"},{"version":"7372004325-import type { ImportInterface0 } from \"pkg0\";\n","signature":"-3531856636-export {};\n"},{"version":"7372004325-import type { ImportInterface0 } from \"pkg0\";\n","signature":"-3531856636-export {};\n"},{"version":"7372004325-import type { ImportInterface0 } from \"pkg0\";\n","signature":"-3531856636-export {};\n"},{"version":"7372004325-import type { ImportInterface0 } from \"pkg0\";\n","signature":"-3531856636-export {};\n"},{"version":"7372004325-import type { ImportInterface0 } from \"pkg0\";\n","signature":"-3531856636-export {};\n"},{"version":"7372004325-import type { ImportInterface0 } from \"pkg0\";\n","signature":"-3531856636-export {};\n"},{"version":"7372004325-import type { ImportInterface0 } from \"pkg0\";\n","signature":"-3531856636-export {};\n"}],"options":{"cacheResolutions":true,"composite":true},"fileIdsList":[[2]],"referencedMap":[[5,1],[6,1],[10,1],[8,1],[11,1],[12,1],[13,1],[14,1],[17,1],[16,1],[15,1],[3,1]],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,5,6,7,10,9,8,11,12,13,14,17,16,15,3,2,4],"latestChangedDtsFile":"./e/ea/eaa/eaaa/fileWithImports.d.ts","cacheResolutions":{"resolutions":[{"resolvedModule":{"resolvedFileName":2,"isExternalLibraryImport":true},"failedLookupLocations":[24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,160,161,162,163,164,165,166,167,168,169,170,171,172,173,174,175,176,177,178,179,180,181,182,183,184,185,186,187,188,189]}],"names":["pkg0"],"resolutionEntries":[[1,1]],"modules":[[18,[1]],[19,[1]],[20,[1]],[21,[1]],[22,[1]],[23,[1]]]}},"version":"FakeTSVersion"}

//// [/src/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../a/lib/lib.d.ts",
      "./node_modules/pkg0/index.d.ts",
      "./filewithimports.ts",
      "./randomfileforimport.ts",
      "./a/filewithimports.ts",
      "./b/ba/filewithimports.ts",
      "./b/randomfileforimport.ts",
      "./c/ca/filewithimports.ts",
      "./c/ca/caa/randomfileforimport.ts",
      "./c/ca/caa/caaa/filewithimports.ts",
      "./c/cb/filewithimports.ts",
      "./d/da/daa/daaa/filewithimports.ts",
      "./d/da/daa/filewithimports.ts",
      "./d/da/filewithimports.ts",
      "./e/ea/filewithimports.ts",
      "./e/ea/eaa/filewithimports.ts",
      "./e/ea/eaa/eaaa/filewithimports.ts",
      "./a",
      "./b/ba",
      "./c/ca/caa/caaa",
      "./c/cb",
      "./d/da/daa/daaa",
      "./e/ea/eaa/eaaa",
      "./node_modules/pkg0/package.json",
      "./node_modules/pkg0.ts",
      "./node_modules/pkg0.tsx",
      "./node_modules/pkg0.d.ts",
      "./node_modules/pkg0/index.ts",
      "./node_modules/pkg0/index.tsx",
      "./a/node_modules/pkg0/package.json",
      "./a/node_modules/pkg0.ts",
      "./a/node_modules/pkg0.tsx",
      "./a/node_modules/pkg0.d.ts",
      "./a/node_modules/pkg0/index.ts",
      "./a/node_modules/pkg0/index.tsx",
      "./a/node_modules/pkg0/index.d.ts",
      "./a/node_modules/@types/pkg0/package.json",
      "./a/node_modules/@types/pkg0.d.ts",
      "./a/node_modules/@types/pkg0/index.d.ts",
      "./b/ba/node_modules/pkg0/package.json",
      "./b/ba/node_modules/pkg0.ts",
      "./b/ba/node_modules/pkg0.tsx",
      "./b/ba/node_modules/pkg0.d.ts",
      "./b/ba/node_modules/pkg0/index.ts",
      "./b/ba/node_modules/pkg0/index.tsx",
      "./b/ba/node_modules/pkg0/index.d.ts",
      "./b/ba/node_modules/@types/pkg0/package.json",
      "./b/ba/node_modules/@types/pkg0.d.ts",
      "./b/ba/node_modules/@types/pkg0/index.d.ts",
      "./b/node_modules/pkg0/package.json",
      "./b/node_modules/pkg0.ts",
      "./b/node_modules/pkg0.tsx",
      "./b/node_modules/pkg0.d.ts",
      "./b/node_modules/pkg0/index.ts",
      "./b/node_modules/pkg0/index.tsx",
      "./b/node_modules/pkg0/index.d.ts",
      "./b/node_modules/@types/pkg0/package.json",
      "./b/node_modules/@types/pkg0.d.ts",
      "./b/node_modules/@types/pkg0/index.d.ts",
      "./c/ca/node_modules/pkg0/package.json",
      "./c/ca/node_modules/pkg0.ts",
      "./c/ca/node_modules/pkg0.tsx",
      "./c/ca/node_modules/pkg0.d.ts",
      "./c/ca/node_modules/pkg0/index.ts",
      "./c/ca/node_modules/pkg0/index.tsx",
      "./c/ca/node_modules/pkg0/index.d.ts",
      "./c/ca/node_modules/@types/pkg0/package.json",
      "./c/ca/node_modules/@types/pkg0.d.ts",
      "./c/ca/node_modules/@types/pkg0/index.d.ts",
      "./c/node_modules/pkg0/package.json",
      "./c/node_modules/pkg0.ts",
      "./c/node_modules/pkg0.tsx",
      "./c/node_modules/pkg0.d.ts",
      "./c/node_modules/pkg0/index.ts",
      "./c/node_modules/pkg0/index.tsx",
      "./c/node_modules/pkg0/index.d.ts",
      "./c/node_modules/@types/pkg0/package.json",
      "./c/node_modules/@types/pkg0.d.ts",
      "./c/node_modules/@types/pkg0/index.d.ts",
      "./c/ca/caa/caaa/node_modules/pkg0/package.json",
      "./c/ca/caa/caaa/node_modules/pkg0.ts",
      "./c/ca/caa/caaa/node_modules/pkg0.tsx",
      "./c/ca/caa/caaa/node_modules/pkg0.d.ts",
      "./c/ca/caa/caaa/node_modules/pkg0/index.ts",
      "./c/ca/caa/caaa/node_modules/pkg0/index.tsx",
      "./c/ca/caa/caaa/node_modules/pkg0/index.d.ts",
      "./c/ca/caa/caaa/node_modules/@types/pkg0/package.json",
      "./c/ca/caa/caaa/node_modules/@types/pkg0.d.ts",
      "./c/ca/caa/caaa/node_modules/@types/pkg0/index.d.ts",
      "./c/ca/caa/node_modules/pkg0/package.json",
      "./c/ca/caa/node_modules/pkg0.ts",
      "./c/ca/caa/node_modules/pkg0.tsx",
      "./c/ca/caa/node_modules/pkg0.d.ts",
      "./c/ca/caa/node_modules/pkg0/index.ts",
      "./c/ca/caa/node_modules/pkg0/index.tsx",
      "./c/ca/caa/node_modules/pkg0/index.d.ts",
      "./c/ca/caa/node_modules/@types/pkg0/package.json",
      "./c/ca/caa/node_modules/@types/pkg0.d.ts",
      "./c/ca/caa/node_modules/@types/pkg0/index.d.ts",
      "./c/cb/node_modules/pkg0/package.json",
      "./c/cb/node_modules/pkg0.ts",
      "./c/cb/node_modules/pkg0.tsx",
      "./c/cb/node_modules/pkg0.d.ts",
      "./c/cb/node_modules/pkg0/index.ts",
      "./c/cb/node_modules/pkg0/index.tsx",
      "./c/cb/node_modules/pkg0/index.d.ts",
      "./c/cb/node_modules/@types/pkg0/package.json",
      "./c/cb/node_modules/@types/pkg0.d.ts",
      "./c/cb/node_modules/@types/pkg0/index.d.ts",
      "./d/da/daa/daaa/node_modules/pkg0/package.json",
      "./d/da/daa/daaa/node_modules/pkg0.ts",
      "./d/da/daa/daaa/node_modules/pkg0.tsx",
      "./d/da/daa/daaa/node_modules/pkg0.d.ts",
      "./d/da/daa/daaa/node_modules/pkg0/index.ts",
      "./d/da/daa/daaa/node_modules/pkg0/index.tsx",
      "./d/da/daa/daaa/node_modules/pkg0/index.d.ts",
      "./d/da/daa/daaa/node_modules/@types/pkg0/package.json",
      "./d/da/daa/daaa/node_modules/@types/pkg0.d.ts",
      "./d/da/daa/daaa/node_modules/@types/pkg0/index.d.ts",
      "./d/da/daa/node_modules/pkg0/package.json",
      "./d/da/daa/node_modules/pkg0.ts",
      "./d/da/daa/node_modules/pkg0.tsx",
      "./d/da/daa/node_modules/pkg0.d.ts",
      "./d/da/daa/node_modules/pkg0/index.ts",
      "./d/da/daa/node_modules/pkg0/index.tsx",
      "./d/da/daa/node_modules/pkg0/index.d.ts",
      "./d/da/daa/node_modules/@types/pkg0/package.json",
      "./d/da/daa/node_modules/@types/pkg0.d.ts",
      "./d/da/daa/node_modules/@types/pkg0/index.d.ts",
      "./d/da/node_modules/pkg0/package.json",
      "./d/da/node_modules/pkg0.ts",
      "./d/da/node_modules/pkg0.tsx",
      "./d/da/node_modules/pkg0.d.ts",
      "./d/da/node_modules/pkg0/index.ts",
      "./d/da/node_modules/pkg0/index.tsx",
      "./d/da/node_modules/pkg0/index.d.ts",
      "./d/da/node_modules/@types/pkg0/package.json",
      "./d/da/node_modules/@types/pkg0.d.ts",
      "./d/da/node_modules/@types/pkg0/index.d.ts",
      "./d/node_modules/pkg0/package.json",
      "./d/node_modules/pkg0.ts",
      "./d/node_modules/pkg0.tsx",
      "./d/node_modules/pkg0.d.ts",
      "./d/node_modules/pkg0/index.ts",
      "./d/node_modules/pkg0/index.tsx",
      "./d/node_modules/pkg0/index.d.ts",
      "./d/node_modules/@types/pkg0/package.json",
      "./d/node_modules/@types/pkg0.d.ts",
      "./d/node_modules/@types/pkg0/index.d.ts",
      "./e/ea/node_modules/pkg0/package.json",
      "./e/ea/node_modules/pkg0.ts",
      "./e/ea/node_modules/pkg0.tsx",
      "./e/ea/node_modules/pkg0.d.ts",
      "./e/ea/node_modules/pkg0/index.ts",
      "./e/ea/node_modules/pkg0/index.tsx",
      "./e/ea/node_modules/pkg0/index.d.ts",
      "./e/ea/node_modules/@types/pkg0/package.json",
      "./e/ea/node_modules/@types/pkg0.d.ts",
      "./e/ea/node_modules/@types/pkg0/index.d.ts",
      "./e/node_modules/pkg0/package.json",
      "./e/node_modules/pkg0.ts",
      "./e/node_modules/pkg0.tsx",
      "./e/node_modules/pkg0.d.ts",
      "./e/node_modules/pkg0/index.ts",
      "./e/node_modules/pkg0/index.tsx",
      "./e/node_modules/pkg0/index.d.ts",
      "./e/node_modules/@types/pkg0/package.json",
      "./e/node_modules/@types/pkg0.d.ts",
      "./e/node_modules/@types/pkg0/index.d.ts",
      "./e/ea/eaa/node_modules/pkg0/package.json",
      "./e/ea/eaa/node_modules/pkg0.ts",
      "./e/ea/eaa/node_modules/pkg0.tsx",
      "./e/ea/eaa/node_modules/pkg0.d.ts",
      "./e/ea/eaa/node_modules/pkg0/index.ts",
      "./e/ea/eaa/node_modules/pkg0/index.tsx",
      "./e/ea/eaa/node_modules/pkg0/index.d.ts",
      "./e/ea/eaa/node_modules/@types/pkg0/package.json",
      "./e/ea/eaa/node_modules/@types/pkg0.d.ts",
      "./e/ea/eaa/node_modules/@types/pkg0/index.d.ts",
      "./e/ea/eaa/eaaa/node_modules/pkg0/package.json",
      "./e/ea/eaa/eaaa/node_modules/pkg0.ts",
      "./e/ea/eaa/eaaa/node_modules/pkg0.tsx",
      "./e/ea/eaa/eaaa/node_modules/pkg0.d.ts",
      "./e/ea/eaa/eaaa/node_modules/pkg0/index.ts",
      "./e/ea/eaa/eaaa/node_modules/pkg0/index.tsx",
      "./e/ea/eaa/eaaa/node_modules/pkg0/index.d.ts",
      "./e/ea/eaa/eaaa/node_modules/@types/pkg0/package.json",
      "./e/ea/eaa/eaaa/node_modules/@types/pkg0.d.ts",
      "./e/ea/eaa/eaaa/node_modules/@types/pkg0/index.d.ts"
    ],
    "fileNamesList": [
      [
        "./node_modules/pkg0/index.d.ts"
      ]
    ],
    "fileInfos": {
      "../../a/lib/lib.d.ts": {
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true
      },
      "./node_modules/pkg0/index.d.ts": {
        "version": "769951468-export interface ImportInterface0 {}",
        "signature": "769951468-export interface ImportInterface0 {}"
      },
      "./filewithimports.ts": {
        "version": "7372004325-import type { ImportInterface0 } from \"pkg0\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./randomfileforimport.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n"
      },
      "./a/filewithimports.ts": {
        "version": "7372004325-import type { ImportInterface0 } from \"pkg0\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./b/ba/filewithimports.ts": {
        "version": "7372004325-import type { ImportInterface0 } from \"pkg0\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./b/randomfileforimport.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n"
      },
      "./c/ca/filewithimports.ts": {
        "version": "7372004325-import type { ImportInterface0 } from \"pkg0\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./c/ca/caa/randomfileforimport.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n"
      },
      "./c/ca/caa/caaa/filewithimports.ts": {
        "version": "7372004325-import type { ImportInterface0 } from \"pkg0\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./c/cb/filewithimports.ts": {
        "version": "7372004325-import type { ImportInterface0 } from \"pkg0\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./d/da/daa/daaa/filewithimports.ts": {
        "version": "7372004325-import type { ImportInterface0 } from \"pkg0\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./d/da/daa/filewithimports.ts": {
        "version": "7372004325-import type { ImportInterface0 } from \"pkg0\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./d/da/filewithimports.ts": {
        "version": "7372004325-import type { ImportInterface0 } from \"pkg0\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./e/ea/filewithimports.ts": {
        "version": "7372004325-import type { ImportInterface0 } from \"pkg0\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./e/ea/eaa/filewithimports.ts": {
        "version": "7372004325-import type { ImportInterface0 } from \"pkg0\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./e/ea/eaa/eaaa/filewithimports.ts": {
        "version": "7372004325-import type { ImportInterface0 } from \"pkg0\";\n",
        "signature": "-3531856636-export {};\n"
      }
    },
    "options": {
      "cacheResolutions": true,
      "composite": true
    },
    "referencedMap": {
      "./a/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./b/ba/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./c/ca/caa/caaa/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./c/ca/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./c/cb/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./d/da/daa/daaa/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./d/da/daa/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./d/da/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./e/ea/eaa/eaaa/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./e/ea/eaa/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./e/ea/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ]
    },
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../a/lib/lib.d.ts",
      "./a/filewithimports.ts",
      "./b/ba/filewithimports.ts",
      "./b/randomfileforimport.ts",
      "./c/ca/caa/caaa/filewithimports.ts",
      "./c/ca/caa/randomfileforimport.ts",
      "./c/ca/filewithimports.ts",
      "./c/cb/filewithimports.ts",
      "./d/da/daa/daaa/filewithimports.ts",
      "./d/da/daa/filewithimports.ts",
      "./d/da/filewithimports.ts",
      "./e/ea/eaa/eaaa/filewithimports.ts",
      "./e/ea/eaa/filewithimports.ts",
      "./e/ea/filewithimports.ts",
      "./filewithimports.ts",
      "./node_modules/pkg0/index.d.ts",
      "./randomfileforimport.ts"
    ],
    "latestChangedDtsFile": "./e/ea/eaa/eaaa/fileWithImports.d.ts",
    "cacheResolutions": {
      "resolutions": [
        {
          "resolvedModule": {
            "resolvedFileName": "./node_modules/pkg0/index.d.ts",
            "isExternalLibraryImport": true
          },
          "failedLookupLocations": [
            "./node_modules/pkg0/package.json",
            "./node_modules/pkg0.ts",
            "./node_modules/pkg0.tsx",
            "./node_modules/pkg0.d.ts",
            "./node_modules/pkg0/index.ts",
            "./node_modules/pkg0/index.tsx",
            "./a/node_modules/pkg0/package.json",
            "./a/node_modules/pkg0.ts",
            "./a/node_modules/pkg0.tsx",
            "./a/node_modules/pkg0.d.ts",
            "./a/node_modules/pkg0/index.ts",
            "./a/node_modules/pkg0/index.tsx",
            "./a/node_modules/pkg0/index.d.ts",
            "./a/node_modules/@types/pkg0/package.json",
            "./a/node_modules/@types/pkg0.d.ts",
            "./a/node_modules/@types/pkg0/index.d.ts",
            "./b/ba/node_modules/pkg0/package.json",
            "./b/ba/node_modules/pkg0.ts",
            "./b/ba/node_modules/pkg0.tsx",
            "./b/ba/node_modules/pkg0.d.ts",
            "./b/ba/node_modules/pkg0/index.ts",
            "./b/ba/node_modules/pkg0/index.tsx",
            "./b/ba/node_modules/pkg0/index.d.ts",
            "./b/ba/node_modules/@types/pkg0/package.json",
            "./b/ba/node_modules/@types/pkg0.d.ts",
            "./b/ba/node_modules/@types/pkg0/index.d.ts",
            "./b/node_modules/pkg0/package.json",
            "./b/node_modules/pkg0.ts",
            "./b/node_modules/pkg0.tsx",
            "./b/node_modules/pkg0.d.ts",
            "./b/node_modules/pkg0/index.ts",
            "./b/node_modules/pkg0/index.tsx",
            "./b/node_modules/pkg0/index.d.ts",
            "./b/node_modules/@types/pkg0/package.json",
            "./b/node_modules/@types/pkg0.d.ts",
            "./b/node_modules/@types/pkg0/index.d.ts",
            "./c/ca/node_modules/pkg0/package.json",
            "./c/ca/node_modules/pkg0.ts",
            "./c/ca/node_modules/pkg0.tsx",
            "./c/ca/node_modules/pkg0.d.ts",
            "./c/ca/node_modules/pkg0/index.ts",
            "./c/ca/node_modules/pkg0/index.tsx",
            "./c/ca/node_modules/pkg0/index.d.ts",
            "./c/ca/node_modules/@types/pkg0/package.json",
            "./c/ca/node_modules/@types/pkg0.d.ts",
            "./c/ca/node_modules/@types/pkg0/index.d.ts",
            "./c/node_modules/pkg0/package.json",
            "./c/node_modules/pkg0.ts",
            "./c/node_modules/pkg0.tsx",
            "./c/node_modules/pkg0.d.ts",
            "./c/node_modules/pkg0/index.ts",
            "./c/node_modules/pkg0/index.tsx",
            "./c/node_modules/pkg0/index.d.ts",
            "./c/node_modules/@types/pkg0/package.json",
            "./c/node_modules/@types/pkg0.d.ts",
            "./c/node_modules/@types/pkg0/index.d.ts",
            "./c/ca/caa/caaa/node_modules/pkg0/package.json",
            "./c/ca/caa/caaa/node_modules/pkg0.ts",
            "./c/ca/caa/caaa/node_modules/pkg0.tsx",
            "./c/ca/caa/caaa/node_modules/pkg0.d.ts",
            "./c/ca/caa/caaa/node_modules/pkg0/index.ts",
            "./c/ca/caa/caaa/node_modules/pkg0/index.tsx",
            "./c/ca/caa/caaa/node_modules/pkg0/index.d.ts",
            "./c/ca/caa/caaa/node_modules/@types/pkg0/package.json",
            "./c/ca/caa/caaa/node_modules/@types/pkg0.d.ts",
            "./c/ca/caa/caaa/node_modules/@types/pkg0/index.d.ts",
            "./c/ca/caa/node_modules/pkg0/package.json",
            "./c/ca/caa/node_modules/pkg0.ts",
            "./c/ca/caa/node_modules/pkg0.tsx",
            "./c/ca/caa/node_modules/pkg0.d.ts",
            "./c/ca/caa/node_modules/pkg0/index.ts",
            "./c/ca/caa/node_modules/pkg0/index.tsx",
            "./c/ca/caa/node_modules/pkg0/index.d.ts",
            "./c/ca/caa/node_modules/@types/pkg0/package.json",
            "./c/ca/caa/node_modules/@types/pkg0.d.ts",
            "./c/ca/caa/node_modules/@types/pkg0/index.d.ts",
            "./c/cb/node_modules/pkg0/package.json",
            "./c/cb/node_modules/pkg0.ts",
            "./c/cb/node_modules/pkg0.tsx",
            "./c/cb/node_modules/pkg0.d.ts",
            "./c/cb/node_modules/pkg0/index.ts",
            "./c/cb/node_modules/pkg0/index.tsx",
            "./c/cb/node_modules/pkg0/index.d.ts",
            "./c/cb/node_modules/@types/pkg0/package.json",
            "./c/cb/node_modules/@types/pkg0.d.ts",
            "./c/cb/node_modules/@types/pkg0/index.d.ts",
            "./d/da/daa/daaa/node_modules/pkg0/package.json",
            "./d/da/daa/daaa/node_modules/pkg0.ts",
            "./d/da/daa/daaa/node_modules/pkg0.tsx",
            "./d/da/daa/daaa/node_modules/pkg0.d.ts",
            "./d/da/daa/daaa/node_modules/pkg0/index.ts",
            "./d/da/daa/daaa/node_modules/pkg0/index.tsx",
            "./d/da/daa/daaa/node_modules/pkg0/index.d.ts",
            "./d/da/daa/daaa/node_modules/@types/pkg0/package.json",
            "./d/da/daa/daaa/node_modules/@types/pkg0.d.ts",
            "./d/da/daa/daaa/node_modules/@types/pkg0/index.d.ts",
            "./d/da/daa/node_modules/pkg0/package.json",
            "./d/da/daa/node_modules/pkg0.ts",
            "./d/da/daa/node_modules/pkg0.tsx",
            "./d/da/daa/node_modules/pkg0.d.ts",
            "./d/da/daa/node_modules/pkg0/index.ts",
            "./d/da/daa/node_modules/pkg0/index.tsx",
            "./d/da/daa/node_modules/pkg0/index.d.ts",
            "./d/da/daa/node_modules/@types/pkg0/package.json",
            "./d/da/daa/node_modules/@types/pkg0.d.ts",
            "./d/da/daa/node_modules/@types/pkg0/index.d.ts",
            "./d/da/node_modules/pkg0/package.json",
            "./d/da/node_modules/pkg0.ts",
            "./d/da/node_modules/pkg0.tsx",
            "./d/da/node_modules/pkg0.d.ts",
            "./d/da/node_modules/pkg0/index.ts",
            "./d/da/node_modules/pkg0/index.tsx",
            "./d/da/node_modules/pkg0/index.d.ts",
            "./d/da/node_modules/@types/pkg0/package.json",
            "./d/da/node_modules/@types/pkg0.d.ts",
            "./d/da/node_modules/@types/pkg0/index.d.ts",
            "./d/node_modules/pkg0/package.json",
            "./d/node_modules/pkg0.ts",
            "./d/node_modules/pkg0.tsx",
            "./d/node_modules/pkg0.d.ts",
            "./d/node_modules/pkg0/index.ts",
            "./d/node_modules/pkg0/index.tsx",
            "./d/node_modules/pkg0/index.d.ts",
            "./d/node_modules/@types/pkg0/package.json",
            "./d/node_modules/@types/pkg0.d.ts",
            "./d/node_modules/@types/pkg0/index.d.ts",
            "./e/ea/node_modules/pkg0/package.json",
            "./e/ea/node_modules/pkg0.ts",
            "./e/ea/node_modules/pkg0.tsx",
            "./e/ea/node_modules/pkg0.d.ts",
            "./e/ea/node_modules/pkg0/index.ts",
            "./e/ea/node_modules/pkg0/index.tsx",
            "./e/ea/node_modules/pkg0/index.d.ts",
            "./e/ea/node_modules/@types/pkg0/package.json",
            "./e/ea/node_modules/@types/pkg0.d.ts",
            "./e/ea/node_modules/@types/pkg0/index.d.ts",
            "./e/node_modules/pkg0/package.json",
            "./e/node_modules/pkg0.ts",
            "./e/node_modules/pkg0.tsx",
            "./e/node_modules/pkg0.d.ts",
            "./e/node_modules/pkg0/index.ts",
            "./e/node_modules/pkg0/index.tsx",
            "./e/node_modules/pkg0/index.d.ts",
            "./e/node_modules/@types/pkg0/package.json",
            "./e/node_modules/@types/pkg0.d.ts",
            "./e/node_modules/@types/pkg0/index.d.ts",
            "./e/ea/eaa/node_modules/pkg0/package.json",
            "./e/ea/eaa/node_modules/pkg0.ts",
            "./e/ea/eaa/node_modules/pkg0.tsx",
            "./e/ea/eaa/node_modules/pkg0.d.ts",
            "./e/ea/eaa/node_modules/pkg0/index.ts",
            "./e/ea/eaa/node_modules/pkg0/index.tsx",
            "./e/ea/eaa/node_modules/pkg0/index.d.ts",
            "./e/ea/eaa/node_modules/@types/pkg0/package.json",
            "./e/ea/eaa/node_modules/@types/pkg0.d.ts",
            "./e/ea/eaa/node_modules/@types/pkg0/index.d.ts",
            "./e/ea/eaa/eaaa/node_modules/pkg0/package.json",
            "./e/ea/eaa/eaaa/node_modules/pkg0.ts",
            "./e/ea/eaa/eaaa/node_modules/pkg0.tsx",
            "./e/ea/eaa/eaaa/node_modules/pkg0.d.ts",
            "./e/ea/eaa/eaaa/node_modules/pkg0/index.ts",
            "./e/ea/eaa/eaaa/node_modules/pkg0/index.tsx",
            "./e/ea/eaa/eaaa/node_modules/pkg0/index.d.ts",
            "./e/ea/eaa/eaaa/node_modules/@types/pkg0/package.json",
            "./e/ea/eaa/eaaa/node_modules/@types/pkg0.d.ts",
            "./e/ea/eaa/eaaa/node_modules/@types/pkg0/index.d.ts"
          ]
        }
      ],
      "names": [
        "pkg0"
      ],
      "resolutionEntries": [
        [
          "pkg0",
          {
            "resolvedModule": {
              "resolvedFileName": "./node_modules/pkg0/index.d.ts",
              "isExternalLibraryImport": true
            },
            "failedLookupLocations": [
              "./node_modules/pkg0/package.json",
              "./node_modules/pkg0.ts",
              "./node_modules/pkg0.tsx",
              "./node_modules/pkg0.d.ts",
              "./node_modules/pkg0/index.ts",
              "./node_modules/pkg0/index.tsx",
              "./a/node_modules/pkg0/package.json",
              "./a/node_modules/pkg0.ts",
              "./a/node_modules/pkg0.tsx",
              "./a/node_modules/pkg0.d.ts",
              "./a/node_modules/pkg0/index.ts",
              "./a/node_modules/pkg0/index.tsx",
              "./a/node_modules/pkg0/index.d.ts",
              "./a/node_modules/@types/pkg0/package.json",
              "./a/node_modules/@types/pkg0.d.ts",
              "./a/node_modules/@types/pkg0/index.d.ts",
              "./b/ba/node_modules/pkg0/package.json",
              "./b/ba/node_modules/pkg0.ts",
              "./b/ba/node_modules/pkg0.tsx",
              "./b/ba/node_modules/pkg0.d.ts",
              "./b/ba/node_modules/pkg0/index.ts",
              "./b/ba/node_modules/pkg0/index.tsx",
              "./b/ba/node_modules/pkg0/index.d.ts",
              "./b/ba/node_modules/@types/pkg0/package.json",
              "./b/ba/node_modules/@types/pkg0.d.ts",
              "./b/ba/node_modules/@types/pkg0/index.d.ts",
              "./b/node_modules/pkg0/package.json",
              "./b/node_modules/pkg0.ts",
              "./b/node_modules/pkg0.tsx",
              "./b/node_modules/pkg0.d.ts",
              "./b/node_modules/pkg0/index.ts",
              "./b/node_modules/pkg0/index.tsx",
              "./b/node_modules/pkg0/index.d.ts",
              "./b/node_modules/@types/pkg0/package.json",
              "./b/node_modules/@types/pkg0.d.ts",
              "./b/node_modules/@types/pkg0/index.d.ts",
              "./c/ca/node_modules/pkg0/package.json",
              "./c/ca/node_modules/pkg0.ts",
              "./c/ca/node_modules/pkg0.tsx",
              "./c/ca/node_modules/pkg0.d.ts",
              "./c/ca/node_modules/pkg0/index.ts",
              "./c/ca/node_modules/pkg0/index.tsx",
              "./c/ca/node_modules/pkg0/index.d.ts",
              "./c/ca/node_modules/@types/pkg0/package.json",
              "./c/ca/node_modules/@types/pkg0.d.ts",
              "./c/ca/node_modules/@types/pkg0/index.d.ts",
              "./c/node_modules/pkg0/package.json",
              "./c/node_modules/pkg0.ts",
              "./c/node_modules/pkg0.tsx",
              "./c/node_modules/pkg0.d.ts",
              "./c/node_modules/pkg0/index.ts",
              "./c/node_modules/pkg0/index.tsx",
              "./c/node_modules/pkg0/index.d.ts",
              "./c/node_modules/@types/pkg0/package.json",
              "./c/node_modules/@types/pkg0.d.ts",
              "./c/node_modules/@types/pkg0/index.d.ts",
              "./c/ca/caa/caaa/node_modules/pkg0/package.json",
              "./c/ca/caa/caaa/node_modules/pkg0.ts",
              "./c/ca/caa/caaa/node_modules/pkg0.tsx",
              "./c/ca/caa/caaa/node_modules/pkg0.d.ts",
              "./c/ca/caa/caaa/node_modules/pkg0/index.ts",
              "./c/ca/caa/caaa/node_modules/pkg0/index.tsx",
              "./c/ca/caa/caaa/node_modules/pkg0/index.d.ts",
              "./c/ca/caa/caaa/node_modules/@types/pkg0/package.json",
              "./c/ca/caa/caaa/node_modules/@types/pkg0.d.ts",
              "./c/ca/caa/caaa/node_modules/@types/pkg0/index.d.ts",
              "./c/ca/caa/node_modules/pkg0/package.json",
              "./c/ca/caa/node_modules/pkg0.ts",
              "./c/ca/caa/node_modules/pkg0.tsx",
              "./c/ca/caa/node_modules/pkg0.d.ts",
              "./c/ca/caa/node_modules/pkg0/index.ts",
              "./c/ca/caa/node_modules/pkg0/index.tsx",
              "./c/ca/caa/node_modules/pkg0/index.d.ts",
              "./c/ca/caa/node_modules/@types/pkg0/package.json",
              "./c/ca/caa/node_modules/@types/pkg0.d.ts",
              "./c/ca/caa/node_modules/@types/pkg0/index.d.ts",
              "./c/cb/node_modules/pkg0/package.json",
              "./c/cb/node_modules/pkg0.ts",
              "./c/cb/node_modules/pkg0.tsx",
              "./c/cb/node_modules/pkg0.d.ts",
              "./c/cb/node_modules/pkg0/index.ts",
              "./c/cb/node_modules/pkg0/index.tsx",
              "./c/cb/node_modules/pkg0/index.d.ts",
              "./c/cb/node_modules/@types/pkg0/package.json",
              "./c/cb/node_modules/@types/pkg0.d.ts",
              "./c/cb/node_modules/@types/pkg0/index.d.ts",
              "./d/da/daa/daaa/node_modules/pkg0/package.json",
              "./d/da/daa/daaa/node_modules/pkg0.ts",
              "./d/da/daa/daaa/node_modules/pkg0.tsx",
              "./d/da/daa/daaa/node_modules/pkg0.d.ts",
              "./d/da/daa/daaa/node_modules/pkg0/index.ts",
              "./d/da/daa/daaa/node_modules/pkg0/index.tsx",
              "./d/da/daa/daaa/node_modules/pkg0/index.d.ts",
              "./d/da/daa/daaa/node_modules/@types/pkg0/package.json",
              "./d/da/daa/daaa/node_modules/@types/pkg0.d.ts",
              "./d/da/daa/daaa/node_modules/@types/pkg0/index.d.ts",
              "./d/da/daa/node_modules/pkg0/package.json",
              "./d/da/daa/node_modules/pkg0.ts",
              "./d/da/daa/node_modules/pkg0.tsx",
              "./d/da/daa/node_modules/pkg0.d.ts",
              "./d/da/daa/node_modules/pkg0/index.ts",
              "./d/da/daa/node_modules/pkg0/index.tsx",
              "./d/da/daa/node_modules/pkg0/index.d.ts",
              "./d/da/daa/node_modules/@types/pkg0/package.json",
              "./d/da/daa/node_modules/@types/pkg0.d.ts",
              "./d/da/daa/node_modules/@types/pkg0/index.d.ts",
              "./d/da/node_modules/pkg0/package.json",
              "./d/da/node_modules/pkg0.ts",
              "./d/da/node_modules/pkg0.tsx",
              "./d/da/node_modules/pkg0.d.ts",
              "./d/da/node_modules/pkg0/index.ts",
              "./d/da/node_modules/pkg0/index.tsx",
              "./d/da/node_modules/pkg0/index.d.ts",
              "./d/da/node_modules/@types/pkg0/package.json",
              "./d/da/node_modules/@types/pkg0.d.ts",
              "./d/da/node_modules/@types/pkg0/index.d.ts",
              "./d/node_modules/pkg0/package.json",
              "./d/node_modules/pkg0.ts",
              "./d/node_modules/pkg0.tsx",
              "./d/node_modules/pkg0.d.ts",
              "./d/node_modules/pkg0/index.ts",
              "./d/node_modules/pkg0/index.tsx",
              "./d/node_modules/pkg0/index.d.ts",
              "./d/node_modules/@types/pkg0/package.json",
              "./d/node_modules/@types/pkg0.d.ts",
              "./d/node_modules/@types/pkg0/index.d.ts",
              "./e/ea/node_modules/pkg0/package.json",
              "./e/ea/node_modules/pkg0.ts",
              "./e/ea/node_modules/pkg0.tsx",
              "./e/ea/node_modules/pkg0.d.ts",
              "./e/ea/node_modules/pkg0/index.ts",
              "./e/ea/node_modules/pkg0/index.tsx",
              "./e/ea/node_modules/pkg0/index.d.ts",
              "./e/ea/node_modules/@types/pkg0/package.json",
              "./e/ea/node_modules/@types/pkg0.d.ts",
              "./e/ea/node_modules/@types/pkg0/index.d.ts",
              "./e/node_modules/pkg0/package.json",
              "./e/node_modules/pkg0.ts",
              "./e/node_modules/pkg0.tsx",
              "./e/node_modules/pkg0.d.ts",
              "./e/node_modules/pkg0/index.ts",
              "./e/node_modules/pkg0/index.tsx",
              "./e/node_modules/pkg0/index.d.ts",
              "./e/node_modules/@types/pkg0/package.json",
              "./e/node_modules/@types/pkg0.d.ts",
              "./e/node_modules/@types/pkg0/index.d.ts",
              "./e/ea/eaa/node_modules/pkg0/package.json",
              "./e/ea/eaa/node_modules/pkg0.ts",
              "./e/ea/eaa/node_modules/pkg0.tsx",
              "./e/ea/eaa/node_modules/pkg0.d.ts",
              "./e/ea/eaa/node_modules/pkg0/index.ts",
              "./e/ea/eaa/node_modules/pkg0/index.tsx",
              "./e/ea/eaa/node_modules/pkg0/index.d.ts",
              "./e/ea/eaa/node_modules/@types/pkg0/package.json",
              "./e/ea/eaa/node_modules/@types/pkg0.d.ts",
              "./e/ea/eaa/node_modules/@types/pkg0/index.d.ts",
              "./e/ea/eaa/eaaa/node_modules/pkg0/package.json",
              "./e/ea/eaa/eaaa/node_modules/pkg0.ts",
              "./e/ea/eaa/eaaa/node_modules/pkg0.tsx",
              "./e/ea/eaa/eaaa/node_modules/pkg0.d.ts",
              "./e/ea/eaa/eaaa/node_modules/pkg0/index.ts",
              "./e/ea/eaa/eaaa/node_modules/pkg0/index.tsx",
              "./e/ea/eaa/eaaa/node_modules/pkg0/index.d.ts",
              "./e/ea/eaa/eaaa/node_modules/@types/pkg0/package.json",
              "./e/ea/eaa/eaaa/node_modules/@types/pkg0.d.ts",
              "./e/ea/eaa/eaaa/node_modules/@types/pkg0/index.d.ts"
            ]
          }
        ]
      ],
      "modules": [
        [
          "./a",
          [
            [
              "pkg0",
              {
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                },
                "failedLookupLocations": [
                  "./node_modules/pkg0/package.json",
                  "./node_modules/pkg0.ts",
                  "./node_modules/pkg0.tsx",
                  "./node_modules/pkg0.d.ts",
                  "./node_modules/pkg0/index.ts",
                  "./node_modules/pkg0/index.tsx",
                  "./a/node_modules/pkg0/package.json",
                  "./a/node_modules/pkg0.ts",
                  "./a/node_modules/pkg0.tsx",
                  "./a/node_modules/pkg0.d.ts",
                  "./a/node_modules/pkg0/index.ts",
                  "./a/node_modules/pkg0/index.tsx",
                  "./a/node_modules/pkg0/index.d.ts",
                  "./a/node_modules/@types/pkg0/package.json",
                  "./a/node_modules/@types/pkg0.d.ts",
                  "./a/node_modules/@types/pkg0/index.d.ts",
                  "./b/ba/node_modules/pkg0/package.json",
                  "./b/ba/node_modules/pkg0.ts",
                  "./b/ba/node_modules/pkg0.tsx",
                  "./b/ba/node_modules/pkg0.d.ts",
                  "./b/ba/node_modules/pkg0/index.ts",
                  "./b/ba/node_modules/pkg0/index.tsx",
                  "./b/ba/node_modules/pkg0/index.d.ts",
                  "./b/ba/node_modules/@types/pkg0/package.json",
                  "./b/ba/node_modules/@types/pkg0.d.ts",
                  "./b/ba/node_modules/@types/pkg0/index.d.ts",
                  "./b/node_modules/pkg0/package.json",
                  "./b/node_modules/pkg0.ts",
                  "./b/node_modules/pkg0.tsx",
                  "./b/node_modules/pkg0.d.ts",
                  "./b/node_modules/pkg0/index.ts",
                  "./b/node_modules/pkg0/index.tsx",
                  "./b/node_modules/pkg0/index.d.ts",
                  "./b/node_modules/@types/pkg0/package.json",
                  "./b/node_modules/@types/pkg0.d.ts",
                  "./b/node_modules/@types/pkg0/index.d.ts",
                  "./c/ca/node_modules/pkg0/package.json",
                  "./c/ca/node_modules/pkg0.ts",
                  "./c/ca/node_modules/pkg0.tsx",
                  "./c/ca/node_modules/pkg0.d.ts",
                  "./c/ca/node_modules/pkg0/index.ts",
                  "./c/ca/node_modules/pkg0/index.tsx",
                  "./c/ca/node_modules/pkg0/index.d.ts",
                  "./c/ca/node_modules/@types/pkg0/package.json",
                  "./c/ca/node_modules/@types/pkg0.d.ts",
                  "./c/ca/node_modules/@types/pkg0/index.d.ts",
                  "./c/node_modules/pkg0/package.json",
                  "./c/node_modules/pkg0.ts",
                  "./c/node_modules/pkg0.tsx",
                  "./c/node_modules/pkg0.d.ts",
                  "./c/node_modules/pkg0/index.ts",
                  "./c/node_modules/pkg0/index.tsx",
                  "./c/node_modules/pkg0/index.d.ts",
                  "./c/node_modules/@types/pkg0/package.json",
                  "./c/node_modules/@types/pkg0.d.ts",
                  "./c/node_modules/@types/pkg0/index.d.ts",
                  "./c/ca/caa/caaa/node_modules/pkg0/package.json",
                  "./c/ca/caa/caaa/node_modules/pkg0.ts",
                  "./c/ca/caa/caaa/node_modules/pkg0.tsx",
                  "./c/ca/caa/caaa/node_modules/pkg0.d.ts",
                  "./c/ca/caa/caaa/node_modules/pkg0/index.ts",
                  "./c/ca/caa/caaa/node_modules/pkg0/index.tsx",
                  "./c/ca/caa/caaa/node_modules/pkg0/index.d.ts",
                  "./c/ca/caa/caaa/node_modules/@types/pkg0/package.json",
                  "./c/ca/caa/caaa/node_modules/@types/pkg0.d.ts",
                  "./c/ca/caa/caaa/node_modules/@types/pkg0/index.d.ts",
                  "./c/ca/caa/node_modules/pkg0/package.json",
                  "./c/ca/caa/node_modules/pkg0.ts",
                  "./c/ca/caa/node_modules/pkg0.tsx",
                  "./c/ca/caa/node_modules/pkg0.d.ts",
                  "./c/ca/caa/node_modules/pkg0/index.ts",
                  "./c/ca/caa/node_modules/pkg0/index.tsx",
                  "./c/ca/caa/node_modules/pkg0/index.d.ts",
                  "./c/ca/caa/node_modules/@types/pkg0/package.json",
                  "./c/ca/caa/node_modules/@types/pkg0.d.ts",
                  "./c/ca/caa/node_modules/@types/pkg0/index.d.ts",
                  "./c/cb/node_modules/pkg0/package.json",
                  "./c/cb/node_modules/pkg0.ts",
                  "./c/cb/node_modules/pkg0.tsx",
                  "./c/cb/node_modules/pkg0.d.ts",
                  "./c/cb/node_modules/pkg0/index.ts",
                  "./c/cb/node_modules/pkg0/index.tsx",
                  "./c/cb/node_modules/pkg0/index.d.ts",
                  "./c/cb/node_modules/@types/pkg0/package.json",
                  "./c/cb/node_modules/@types/pkg0.d.ts",
                  "./c/cb/node_modules/@types/pkg0/index.d.ts",
                  "./d/da/daa/daaa/node_modules/pkg0/package.json",
                  "./d/da/daa/daaa/node_modules/pkg0.ts",
                  "./d/da/daa/daaa/node_modules/pkg0.tsx",
                  "./d/da/daa/daaa/node_modules/pkg0.d.ts",
                  "./d/da/daa/daaa/node_modules/pkg0/index.ts",
                  "./d/da/daa/daaa/node_modules/pkg0/index.tsx",
                  "./d/da/daa/daaa/node_modules/pkg0/index.d.ts",
                  "./d/da/daa/daaa/node_modules/@types/pkg0/package.json",
                  "./d/da/daa/daaa/node_modules/@types/pkg0.d.ts",
                  "./d/da/daa/daaa/node_modules/@types/pkg0/index.d.ts",
                  "./d/da/daa/node_modules/pkg0/package.json",
                  "./d/da/daa/node_modules/pkg0.ts",
                  "./d/da/daa/node_modules/pkg0.tsx",
                  "./d/da/daa/node_modules/pkg0.d.ts",
                  "./d/da/daa/node_modules/pkg0/index.ts",
                  "./d/da/daa/node_modules/pkg0/index.tsx",
                  "./d/da/daa/node_modules/pkg0/index.d.ts",
                  "./d/da/daa/node_modules/@types/pkg0/package.json",
                  "./d/da/daa/node_modules/@types/pkg0.d.ts",
                  "./d/da/daa/node_modules/@types/pkg0/index.d.ts",
                  "./d/da/node_modules/pkg0/package.json",
                  "./d/da/node_modules/pkg0.ts",
                  "./d/da/node_modules/pkg0.tsx",
                  "./d/da/node_modules/pkg0.d.ts",
                  "./d/da/node_modules/pkg0/index.ts",
                  "./d/da/node_modules/pkg0/index.tsx",
                  "./d/da/node_modules/pkg0/index.d.ts",
                  "./d/da/node_modules/@types/pkg0/package.json",
                  "./d/da/node_modules/@types/pkg0.d.ts",
                  "./d/da/node_modules/@types/pkg0/index.d.ts",
                  "./d/node_modules/pkg0/package.json",
                  "./d/node_modules/pkg0.ts",
                  "./d/node_modules/pkg0.tsx",
                  "./d/node_modules/pkg0.d.ts",
                  "./d/node_modules/pkg0/index.ts",
                  "./d/node_modules/pkg0/index.tsx",
                  "./d/node_modules/pkg0/index.d.ts",
                  "./d/node_modules/@types/pkg0/package.json",
                  "./d/node_modules/@types/pkg0.d.ts",
                  "./d/node_modules/@types/pkg0/index.d.ts",
                  "./e/ea/node_modules/pkg0/package.json",
                  "./e/ea/node_modules/pkg0.ts",
                  "./e/ea/node_modules/pkg0.tsx",
                  "./e/ea/node_modules/pkg0.d.ts",
                  "./e/ea/node_modules/pkg0/index.ts",
                  "./e/ea/node_modules/pkg0/index.tsx",
                  "./e/ea/node_modules/pkg0/index.d.ts",
                  "./e/ea/node_modules/@types/pkg0/package.json",
                  "./e/ea/node_modules/@types/pkg0.d.ts",
                  "./e/ea/node_modules/@types/pkg0/index.d.ts",
                  "./e/node_modules/pkg0/package.json",
                  "./e/node_modules/pkg0.ts",
                  "./e/node_modules/pkg0.tsx",
                  "./e/node_modules/pkg0.d.ts",
                  "./e/node_modules/pkg0/index.ts",
                  "./e/node_modules/pkg0/index.tsx",
                  "./e/node_modules/pkg0/index.d.ts",
                  "./e/node_modules/@types/pkg0/package.json",
                  "./e/node_modules/@types/pkg0.d.ts",
                  "./e/node_modules/@types/pkg0/index.d.ts",
                  "./e/ea/eaa/node_modules/pkg0/package.json",
                  "./e/ea/eaa/node_modules/pkg0.ts",
                  "./e/ea/eaa/node_modules/pkg0.tsx",
                  "./e/ea/eaa/node_modules/pkg0.d.ts",
                  "./e/ea/eaa/node_modules/pkg0/index.ts",
                  "./e/ea/eaa/node_modules/pkg0/index.tsx",
                  "./e/ea/eaa/node_modules/pkg0/index.d.ts",
                  "./e/ea/eaa/node_modules/@types/pkg0/package.json",
                  "./e/ea/eaa/node_modules/@types/pkg0.d.ts",
                  "./e/ea/eaa/node_modules/@types/pkg0/index.d.ts",
                  "./e/ea/eaa/eaaa/node_modules/pkg0/package.json",
                  "./e/ea/eaa/eaaa/node_modules/pkg0.ts",
                  "./e/ea/eaa/eaaa/node_modules/pkg0.tsx",
                  "./e/ea/eaa/eaaa/node_modules/pkg0.d.ts",
                  "./e/ea/eaa/eaaa/node_modules/pkg0/index.ts",
                  "./e/ea/eaa/eaaa/node_modules/pkg0/index.tsx",
                  "./e/ea/eaa/eaaa/node_modules/pkg0/index.d.ts",
                  "./e/ea/eaa/eaaa/node_modules/@types/pkg0/package.json",
                  "./e/ea/eaa/eaaa/node_modules/@types/pkg0.d.ts",
                  "./e/ea/eaa/eaaa/node_modules/@types/pkg0/index.d.ts"
                ]
              }
            ]
          ]
        ],
        [
          "./b/ba",
          [
            [
              "pkg0",
              {
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                },
                "failedLookupLocations": [
                  "./node_modules/pkg0/package.json",
                  "./node_modules/pkg0.ts",
                  "./node_modules/pkg0.tsx",
                  "./node_modules/pkg0.d.ts",
                  "./node_modules/pkg0/index.ts",
                  "./node_modules/pkg0/index.tsx",
                  "./a/node_modules/pkg0/package.json",
                  "./a/node_modules/pkg0.ts",
                  "./a/node_modules/pkg0.tsx",
                  "./a/node_modules/pkg0.d.ts",
                  "./a/node_modules/pkg0/index.ts",
                  "./a/node_modules/pkg0/index.tsx",
                  "./a/node_modules/pkg0/index.d.ts",
                  "./a/node_modules/@types/pkg0/package.json",
                  "./a/node_modules/@types/pkg0.d.ts",
                  "./a/node_modules/@types/pkg0/index.d.ts",
                  "./b/ba/node_modules/pkg0/package.json",
                  "./b/ba/node_modules/pkg0.ts",
                  "./b/ba/node_modules/pkg0.tsx",
                  "./b/ba/node_modules/pkg0.d.ts",
                  "./b/ba/node_modules/pkg0/index.ts",
                  "./b/ba/node_modules/pkg0/index.tsx",
                  "./b/ba/node_modules/pkg0/index.d.ts",
                  "./b/ba/node_modules/@types/pkg0/package.json",
                  "./b/ba/node_modules/@types/pkg0.d.ts",
                  "./b/ba/node_modules/@types/pkg0/index.d.ts",
                  "./b/node_modules/pkg0/package.json",
                  "./b/node_modules/pkg0.ts",
                  "./b/node_modules/pkg0.tsx",
                  "./b/node_modules/pkg0.d.ts",
                  "./b/node_modules/pkg0/index.ts",
                  "./b/node_modules/pkg0/index.tsx",
                  "./b/node_modules/pkg0/index.d.ts",
                  "./b/node_modules/@types/pkg0/package.json",
                  "./b/node_modules/@types/pkg0.d.ts",
                  "./b/node_modules/@types/pkg0/index.d.ts",
                  "./c/ca/node_modules/pkg0/package.json",
                  "./c/ca/node_modules/pkg0.ts",
                  "./c/ca/node_modules/pkg0.tsx",
                  "./c/ca/node_modules/pkg0.d.ts",
                  "./c/ca/node_modules/pkg0/index.ts",
                  "./c/ca/node_modules/pkg0/index.tsx",
                  "./c/ca/node_modules/pkg0/index.d.ts",
                  "./c/ca/node_modules/@types/pkg0/package.json",
                  "./c/ca/node_modules/@types/pkg0.d.ts",
                  "./c/ca/node_modules/@types/pkg0/index.d.ts",
                  "./c/node_modules/pkg0/package.json",
                  "./c/node_modules/pkg0.ts",
                  "./c/node_modules/pkg0.tsx",
                  "./c/node_modules/pkg0.d.ts",
                  "./c/node_modules/pkg0/index.ts",
                  "./c/node_modules/pkg0/index.tsx",
                  "./c/node_modules/pkg0/index.d.ts",
                  "./c/node_modules/@types/pkg0/package.json",
                  "./c/node_modules/@types/pkg0.d.ts",
                  "./c/node_modules/@types/pkg0/index.d.ts",
                  "./c/ca/caa/caaa/node_modules/pkg0/package.json",
                  "./c/ca/caa/caaa/node_modules/pkg0.ts",
                  "./c/ca/caa/caaa/node_modules/pkg0.tsx",
                  "./c/ca/caa/caaa/node_modules/pkg0.d.ts",
                  "./c/ca/caa/caaa/node_modules/pkg0/index.ts",
                  "./c/ca/caa/caaa/node_modules/pkg0/index.tsx",
                  "./c/ca/caa/caaa/node_modules/pkg0/index.d.ts",
                  "./c/ca/caa/caaa/node_modules/@types/pkg0/package.json",
                  "./c/ca/caa/caaa/node_modules/@types/pkg0.d.ts",
                  "./c/ca/caa/caaa/node_modules/@types/pkg0/index.d.ts",
                  "./c/ca/caa/node_modules/pkg0/package.json",
                  "./c/ca/caa/node_modules/pkg0.ts",
                  "./c/ca/caa/node_modules/pkg0.tsx",
                  "./c/ca/caa/node_modules/pkg0.d.ts",
                  "./c/ca/caa/node_modules/pkg0/index.ts",
                  "./c/ca/caa/node_modules/pkg0/index.tsx",
                  "./c/ca/caa/node_modules/pkg0/index.d.ts",
                  "./c/ca/caa/node_modules/@types/pkg0/package.json",
                  "./c/ca/caa/node_modules/@types/pkg0.d.ts",
                  "./c/ca/caa/node_modules/@types/pkg0/index.d.ts",
                  "./c/cb/node_modules/pkg0/package.json",
                  "./c/cb/node_modules/pkg0.ts",
                  "./c/cb/node_modules/pkg0.tsx",
                  "./c/cb/node_modules/pkg0.d.ts",
                  "./c/cb/node_modules/pkg0/index.ts",
                  "./c/cb/node_modules/pkg0/index.tsx",
                  "./c/cb/node_modules/pkg0/index.d.ts",
                  "./c/cb/node_modules/@types/pkg0/package.json",
                  "./c/cb/node_modules/@types/pkg0.d.ts",
                  "./c/cb/node_modules/@types/pkg0/index.d.ts",
                  "./d/da/daa/daaa/node_modules/pkg0/package.json",
                  "./d/da/daa/daaa/node_modules/pkg0.ts",
                  "./d/da/daa/daaa/node_modules/pkg0.tsx",
                  "./d/da/daa/daaa/node_modules/pkg0.d.ts",
                  "./d/da/daa/daaa/node_modules/pkg0/index.ts",
                  "./d/da/daa/daaa/node_modules/pkg0/index.tsx",
                  "./d/da/daa/daaa/node_modules/pkg0/index.d.ts",
                  "./d/da/daa/daaa/node_modules/@types/pkg0/package.json",
                  "./d/da/daa/daaa/node_modules/@types/pkg0.d.ts",
                  "./d/da/daa/daaa/node_modules/@types/pkg0/index.d.ts",
                  "./d/da/daa/node_modules/pkg0/package.json",
                  "./d/da/daa/node_modules/pkg0.ts",
                  "./d/da/daa/node_modules/pkg0.tsx",
                  "./d/da/daa/node_modules/pkg0.d.ts",
                  "./d/da/daa/node_modules/pkg0/index.ts",
                  "./d/da/daa/node_modules/pkg0/index.tsx",
                  "./d/da/daa/node_modules/pkg0/index.d.ts",
                  "./d/da/daa/node_modules/@types/pkg0/package.json",
                  "./d/da/daa/node_modules/@types/pkg0.d.ts",
                  "./d/da/daa/node_modules/@types/pkg0/index.d.ts",
                  "./d/da/node_modules/pkg0/package.json",
                  "./d/da/node_modules/pkg0.ts",
                  "./d/da/node_modules/pkg0.tsx",
                  "./d/da/node_modules/pkg0.d.ts",
                  "./d/da/node_modules/pkg0/index.ts",
                  "./d/da/node_modules/pkg0/index.tsx",
                  "./d/da/node_modules/pkg0/index.d.ts",
                  "./d/da/node_modules/@types/pkg0/package.json",
                  "./d/da/node_modules/@types/pkg0.d.ts",
                  "./d/da/node_modules/@types/pkg0/index.d.ts",
                  "./d/node_modules/pkg0/package.json",
                  "./d/node_modules/pkg0.ts",
                  "./d/node_modules/pkg0.tsx",
                  "./d/node_modules/pkg0.d.ts",
                  "./d/node_modules/pkg0/index.ts",
                  "./d/node_modules/pkg0/index.tsx",
                  "./d/node_modules/pkg0/index.d.ts",
                  "./d/node_modules/@types/pkg0/package.json",
                  "./d/node_modules/@types/pkg0.d.ts",
                  "./d/node_modules/@types/pkg0/index.d.ts",
                  "./e/ea/node_modules/pkg0/package.json",
                  "./e/ea/node_modules/pkg0.ts",
                  "./e/ea/node_modules/pkg0.tsx",
                  "./e/ea/node_modules/pkg0.d.ts",
                  "./e/ea/node_modules/pkg0/index.ts",
                  "./e/ea/node_modules/pkg0/index.tsx",
                  "./e/ea/node_modules/pkg0/index.d.ts",
                  "./e/ea/node_modules/@types/pkg0/package.json",
                  "./e/ea/node_modules/@types/pkg0.d.ts",
                  "./e/ea/node_modules/@types/pkg0/index.d.ts",
                  "./e/node_modules/pkg0/package.json",
                  "./e/node_modules/pkg0.ts",
                  "./e/node_modules/pkg0.tsx",
                  "./e/node_modules/pkg0.d.ts",
                  "./e/node_modules/pkg0/index.ts",
                  "./e/node_modules/pkg0/index.tsx",
                  "./e/node_modules/pkg0/index.d.ts",
                  "./e/node_modules/@types/pkg0/package.json",
                  "./e/node_modules/@types/pkg0.d.ts",
                  "./e/node_modules/@types/pkg0/index.d.ts",
                  "./e/ea/eaa/node_modules/pkg0/package.json",
                  "./e/ea/eaa/node_modules/pkg0.ts",
                  "./e/ea/eaa/node_modules/pkg0.tsx",
                  "./e/ea/eaa/node_modules/pkg0.d.ts",
                  "./e/ea/eaa/node_modules/pkg0/index.ts",
                  "./e/ea/eaa/node_modules/pkg0/index.tsx",
                  "./e/ea/eaa/node_modules/pkg0/index.d.ts",
                  "./e/ea/eaa/node_modules/@types/pkg0/package.json",
                  "./e/ea/eaa/node_modules/@types/pkg0.d.ts",
                  "./e/ea/eaa/node_modules/@types/pkg0/index.d.ts",
                  "./e/ea/eaa/eaaa/node_modules/pkg0/package.json",
                  "./e/ea/eaa/eaaa/node_modules/pkg0.ts",
                  "./e/ea/eaa/eaaa/node_modules/pkg0.tsx",
                  "./e/ea/eaa/eaaa/node_modules/pkg0.d.ts",
                  "./e/ea/eaa/eaaa/node_modules/pkg0/index.ts",
                  "./e/ea/eaa/eaaa/node_modules/pkg0/index.tsx",
                  "./e/ea/eaa/eaaa/node_modules/pkg0/index.d.ts",
                  "./e/ea/eaa/eaaa/node_modules/@types/pkg0/package.json",
                  "./e/ea/eaa/eaaa/node_modules/@types/pkg0.d.ts",
                  "./e/ea/eaa/eaaa/node_modules/@types/pkg0/index.d.ts"
                ]
              }
            ]
          ]
        ],
        [
          "./c/ca/caa/caaa",
          [
            [
              "pkg0",
              {
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                },
                "failedLookupLocations": [
                  "./node_modules/pkg0/package.json",
                  "./node_modules/pkg0.ts",
                  "./node_modules/pkg0.tsx",
                  "./node_modules/pkg0.d.ts",
                  "./node_modules/pkg0/index.ts",
                  "./node_modules/pkg0/index.tsx",
                  "./a/node_modules/pkg0/package.json",
                  "./a/node_modules/pkg0.ts",
                  "./a/node_modules/pkg0.tsx",
                  "./a/node_modules/pkg0.d.ts",
                  "./a/node_modules/pkg0/index.ts",
                  "./a/node_modules/pkg0/index.tsx",
                  "./a/node_modules/pkg0/index.d.ts",
                  "./a/node_modules/@types/pkg0/package.json",
                  "./a/node_modules/@types/pkg0.d.ts",
                  "./a/node_modules/@types/pkg0/index.d.ts",
                  "./b/ba/node_modules/pkg0/package.json",
                  "./b/ba/node_modules/pkg0.ts",
                  "./b/ba/node_modules/pkg0.tsx",
                  "./b/ba/node_modules/pkg0.d.ts",
                  "./b/ba/node_modules/pkg0/index.ts",
                  "./b/ba/node_modules/pkg0/index.tsx",
                  "./b/ba/node_modules/pkg0/index.d.ts",
                  "./b/ba/node_modules/@types/pkg0/package.json",
                  "./b/ba/node_modules/@types/pkg0.d.ts",
                  "./b/ba/node_modules/@types/pkg0/index.d.ts",
                  "./b/node_modules/pkg0/package.json",
                  "./b/node_modules/pkg0.ts",
                  "./b/node_modules/pkg0.tsx",
                  "./b/node_modules/pkg0.d.ts",
                  "./b/node_modules/pkg0/index.ts",
                  "./b/node_modules/pkg0/index.tsx",
                  "./b/node_modules/pkg0/index.d.ts",
                  "./b/node_modules/@types/pkg0/package.json",
                  "./b/node_modules/@types/pkg0.d.ts",
                  "./b/node_modules/@types/pkg0/index.d.ts",
                  "./c/ca/node_modules/pkg0/package.json",
                  "./c/ca/node_modules/pkg0.ts",
                  "./c/ca/node_modules/pkg0.tsx",
                  "./c/ca/node_modules/pkg0.d.ts",
                  "./c/ca/node_modules/pkg0/index.ts",
                  "./c/ca/node_modules/pkg0/index.tsx",
                  "./c/ca/node_modules/pkg0/index.d.ts",
                  "./c/ca/node_modules/@types/pkg0/package.json",
                  "./c/ca/node_modules/@types/pkg0.d.ts",
                  "./c/ca/node_modules/@types/pkg0/index.d.ts",
                  "./c/node_modules/pkg0/package.json",
                  "./c/node_modules/pkg0.ts",
                  "./c/node_modules/pkg0.tsx",
                  "./c/node_modules/pkg0.d.ts",
                  "./c/node_modules/pkg0/index.ts",
                  "./c/node_modules/pkg0/index.tsx",
                  "./c/node_modules/pkg0/index.d.ts",
                  "./c/node_modules/@types/pkg0/package.json",
                  "./c/node_modules/@types/pkg0.d.ts",
                  "./c/node_modules/@types/pkg0/index.d.ts",
                  "./c/ca/caa/caaa/node_modules/pkg0/package.json",
                  "./c/ca/caa/caaa/node_modules/pkg0.ts",
                  "./c/ca/caa/caaa/node_modules/pkg0.tsx",
                  "./c/ca/caa/caaa/node_modules/pkg0.d.ts",
                  "./c/ca/caa/caaa/node_modules/pkg0/index.ts",
                  "./c/ca/caa/caaa/node_modules/pkg0/index.tsx",
                  "./c/ca/caa/caaa/node_modules/pkg0/index.d.ts",
                  "./c/ca/caa/caaa/node_modules/@types/pkg0/package.json",
                  "./c/ca/caa/caaa/node_modules/@types/pkg0.d.ts",
                  "./c/ca/caa/caaa/node_modules/@types/pkg0/index.d.ts",
                  "./c/ca/caa/node_modules/pkg0/package.json",
                  "./c/ca/caa/node_modules/pkg0.ts",
                  "./c/ca/caa/node_modules/pkg0.tsx",
                  "./c/ca/caa/node_modules/pkg0.d.ts",
                  "./c/ca/caa/node_modules/pkg0/index.ts",
                  "./c/ca/caa/node_modules/pkg0/index.tsx",
                  "./c/ca/caa/node_modules/pkg0/index.d.ts",
                  "./c/ca/caa/node_modules/@types/pkg0/package.json",
                  "./c/ca/caa/node_modules/@types/pkg0.d.ts",
                  "./c/ca/caa/node_modules/@types/pkg0/index.d.ts",
                  "./c/cb/node_modules/pkg0/package.json",
                  "./c/cb/node_modules/pkg0.ts",
                  "./c/cb/node_modules/pkg0.tsx",
                  "./c/cb/node_modules/pkg0.d.ts",
                  "./c/cb/node_modules/pkg0/index.ts",
                  "./c/cb/node_modules/pkg0/index.tsx",
                  "./c/cb/node_modules/pkg0/index.d.ts",
                  "./c/cb/node_modules/@types/pkg0/package.json",
                  "./c/cb/node_modules/@types/pkg0.d.ts",
                  "./c/cb/node_modules/@types/pkg0/index.d.ts",
                  "./d/da/daa/daaa/node_modules/pkg0/package.json",
                  "./d/da/daa/daaa/node_modules/pkg0.ts",
                  "./d/da/daa/daaa/node_modules/pkg0.tsx",
                  "./d/da/daa/daaa/node_modules/pkg0.d.ts",
                  "./d/da/daa/daaa/node_modules/pkg0/index.ts",
                  "./d/da/daa/daaa/node_modules/pkg0/index.tsx",
                  "./d/da/daa/daaa/node_modules/pkg0/index.d.ts",
                  "./d/da/daa/daaa/node_modules/@types/pkg0/package.json",
                  "./d/da/daa/daaa/node_modules/@types/pkg0.d.ts",
                  "./d/da/daa/daaa/node_modules/@types/pkg0/index.d.ts",
                  "./d/da/daa/node_modules/pkg0/package.json",
                  "./d/da/daa/node_modules/pkg0.ts",
                  "./d/da/daa/node_modules/pkg0.tsx",
                  "./d/da/daa/node_modules/pkg0.d.ts",
                  "./d/da/daa/node_modules/pkg0/index.ts",
                  "./d/da/daa/node_modules/pkg0/index.tsx",
                  "./d/da/daa/node_modules/pkg0/index.d.ts",
                  "./d/da/daa/node_modules/@types/pkg0/package.json",
                  "./d/da/daa/node_modules/@types/pkg0.d.ts",
                  "./d/da/daa/node_modules/@types/pkg0/index.d.ts",
                  "./d/da/node_modules/pkg0/package.json",
                  "./d/da/node_modules/pkg0.ts",
                  "./d/da/node_modules/pkg0.tsx",
                  "./d/da/node_modules/pkg0.d.ts",
                  "./d/da/node_modules/pkg0/index.ts",
                  "./d/da/node_modules/pkg0/index.tsx",
                  "./d/da/node_modules/pkg0/index.d.ts",
                  "./d/da/node_modules/@types/pkg0/package.json",
                  "./d/da/node_modules/@types/pkg0.d.ts",
                  "./d/da/node_modules/@types/pkg0/index.d.ts",
                  "./d/node_modules/pkg0/package.json",
                  "./d/node_modules/pkg0.ts",
                  "./d/node_modules/pkg0.tsx",
                  "./d/node_modules/pkg0.d.ts",
                  "./d/node_modules/pkg0/index.ts",
                  "./d/node_modules/pkg0/index.tsx",
                  "./d/node_modules/pkg0/index.d.ts",
                  "./d/node_modules/@types/pkg0/package.json",
                  "./d/node_modules/@types/pkg0.d.ts",
                  "./d/node_modules/@types/pkg0/index.d.ts",
                  "./e/ea/node_modules/pkg0/package.json",
                  "./e/ea/node_modules/pkg0.ts",
                  "./e/ea/node_modules/pkg0.tsx",
                  "./e/ea/node_modules/pkg0.d.ts",
                  "./e/ea/node_modules/pkg0/index.ts",
                  "./e/ea/node_modules/pkg0/index.tsx",
                  "./e/ea/node_modules/pkg0/index.d.ts",
                  "./e/ea/node_modules/@types/pkg0/package.json",
                  "./e/ea/node_modules/@types/pkg0.d.ts",
                  "./e/ea/node_modules/@types/pkg0/index.d.ts",
                  "./e/node_modules/pkg0/package.json",
                  "./e/node_modules/pkg0.ts",
                  "./e/node_modules/pkg0.tsx",
                  "./e/node_modules/pkg0.d.ts",
                  "./e/node_modules/pkg0/index.ts",
                  "./e/node_modules/pkg0/index.tsx",
                  "./e/node_modules/pkg0/index.d.ts",
                  "./e/node_modules/@types/pkg0/package.json",
                  "./e/node_modules/@types/pkg0.d.ts",
                  "./e/node_modules/@types/pkg0/index.d.ts",
                  "./e/ea/eaa/node_modules/pkg0/package.json",
                  "./e/ea/eaa/node_modules/pkg0.ts",
                  "./e/ea/eaa/node_modules/pkg0.tsx",
                  "./e/ea/eaa/node_modules/pkg0.d.ts",
                  "./e/ea/eaa/node_modules/pkg0/index.ts",
                  "./e/ea/eaa/node_modules/pkg0/index.tsx",
                  "./e/ea/eaa/node_modules/pkg0/index.d.ts",
                  "./e/ea/eaa/node_modules/@types/pkg0/package.json",
                  "./e/ea/eaa/node_modules/@types/pkg0.d.ts",
                  "./e/ea/eaa/node_modules/@types/pkg0/index.d.ts",
                  "./e/ea/eaa/eaaa/node_modules/pkg0/package.json",
                  "./e/ea/eaa/eaaa/node_modules/pkg0.ts",
                  "./e/ea/eaa/eaaa/node_modules/pkg0.tsx",
                  "./e/ea/eaa/eaaa/node_modules/pkg0.d.ts",
                  "./e/ea/eaa/eaaa/node_modules/pkg0/index.ts",
                  "./e/ea/eaa/eaaa/node_modules/pkg0/index.tsx",
                  "./e/ea/eaa/eaaa/node_modules/pkg0/index.d.ts",
                  "./e/ea/eaa/eaaa/node_modules/@types/pkg0/package.json",
                  "./e/ea/eaa/eaaa/node_modules/@types/pkg0.d.ts",
                  "./e/ea/eaa/eaaa/node_modules/@types/pkg0/index.d.ts"
                ]
              }
            ]
          ]
        ],
        [
          "./c/cb",
          [
            [
              "pkg0",
              {
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                },
                "failedLookupLocations": [
                  "./node_modules/pkg0/package.json",
                  "./node_modules/pkg0.ts",
                  "./node_modules/pkg0.tsx",
                  "./node_modules/pkg0.d.ts",
                  "./node_modules/pkg0/index.ts",
                  "./node_modules/pkg0/index.tsx",
                  "./a/node_modules/pkg0/package.json",
                  "./a/node_modules/pkg0.ts",
                  "./a/node_modules/pkg0.tsx",
                  "./a/node_modules/pkg0.d.ts",
                  "./a/node_modules/pkg0/index.ts",
                  "./a/node_modules/pkg0/index.tsx",
                  "./a/node_modules/pkg0/index.d.ts",
                  "./a/node_modules/@types/pkg0/package.json",
                  "./a/node_modules/@types/pkg0.d.ts",
                  "./a/node_modules/@types/pkg0/index.d.ts",
                  "./b/ba/node_modules/pkg0/package.json",
                  "./b/ba/node_modules/pkg0.ts",
                  "./b/ba/node_modules/pkg0.tsx",
                  "./b/ba/node_modules/pkg0.d.ts",
                  "./b/ba/node_modules/pkg0/index.ts",
                  "./b/ba/node_modules/pkg0/index.tsx",
                  "./b/ba/node_modules/pkg0/index.d.ts",
                  "./b/ba/node_modules/@types/pkg0/package.json",
                  "./b/ba/node_modules/@types/pkg0.d.ts",
                  "./b/ba/node_modules/@types/pkg0/index.d.ts",
                  "./b/node_modules/pkg0/package.json",
                  "./b/node_modules/pkg0.ts",
                  "./b/node_modules/pkg0.tsx",
                  "./b/node_modules/pkg0.d.ts",
                  "./b/node_modules/pkg0/index.ts",
                  "./b/node_modules/pkg0/index.tsx",
                  "./b/node_modules/pkg0/index.d.ts",
                  "./b/node_modules/@types/pkg0/package.json",
                  "./b/node_modules/@types/pkg0.d.ts",
                  "./b/node_modules/@types/pkg0/index.d.ts",
                  "./c/ca/node_modules/pkg0/package.json",
                  "./c/ca/node_modules/pkg0.ts",
                  "./c/ca/node_modules/pkg0.tsx",
                  "./c/ca/node_modules/pkg0.d.ts",
                  "./c/ca/node_modules/pkg0/index.ts",
                  "./c/ca/node_modules/pkg0/index.tsx",
                  "./c/ca/node_modules/pkg0/index.d.ts",
                  "./c/ca/node_modules/@types/pkg0/package.json",
                  "./c/ca/node_modules/@types/pkg0.d.ts",
                  "./c/ca/node_modules/@types/pkg0/index.d.ts",
                  "./c/node_modules/pkg0/package.json",
                  "./c/node_modules/pkg0.ts",
                  "./c/node_modules/pkg0.tsx",
                  "./c/node_modules/pkg0.d.ts",
                  "./c/node_modules/pkg0/index.ts",
                  "./c/node_modules/pkg0/index.tsx",
                  "./c/node_modules/pkg0/index.d.ts",
                  "./c/node_modules/@types/pkg0/package.json",
                  "./c/node_modules/@types/pkg0.d.ts",
                  "./c/node_modules/@types/pkg0/index.d.ts",
                  "./c/ca/caa/caaa/node_modules/pkg0/package.json",
                  "./c/ca/caa/caaa/node_modules/pkg0.ts",
                  "./c/ca/caa/caaa/node_modules/pkg0.tsx",
                  "./c/ca/caa/caaa/node_modules/pkg0.d.ts",
                  "./c/ca/caa/caaa/node_modules/pkg0/index.ts",
                  "./c/ca/caa/caaa/node_modules/pkg0/index.tsx",
                  "./c/ca/caa/caaa/node_modules/pkg0/index.d.ts",
                  "./c/ca/caa/caaa/node_modules/@types/pkg0/package.json",
                  "./c/ca/caa/caaa/node_modules/@types/pkg0.d.ts",
                  "./c/ca/caa/caaa/node_modules/@types/pkg0/index.d.ts",
                  "./c/ca/caa/node_modules/pkg0/package.json",
                  "./c/ca/caa/node_modules/pkg0.ts",
                  "./c/ca/caa/node_modules/pkg0.tsx",
                  "./c/ca/caa/node_modules/pkg0.d.ts",
                  "./c/ca/caa/node_modules/pkg0/index.ts",
                  "./c/ca/caa/node_modules/pkg0/index.tsx",
                  "./c/ca/caa/node_modules/pkg0/index.d.ts",
                  "./c/ca/caa/node_modules/@types/pkg0/package.json",
                  "./c/ca/caa/node_modules/@types/pkg0.d.ts",
                  "./c/ca/caa/node_modules/@types/pkg0/index.d.ts",
                  "./c/cb/node_modules/pkg0/package.json",
                  "./c/cb/node_modules/pkg0.ts",
                  "./c/cb/node_modules/pkg0.tsx",
                  "./c/cb/node_modules/pkg0.d.ts",
                  "./c/cb/node_modules/pkg0/index.ts",
                  "./c/cb/node_modules/pkg0/index.tsx",
                  "./c/cb/node_modules/pkg0/index.d.ts",
                  "./c/cb/node_modules/@types/pkg0/package.json",
                  "./c/cb/node_modules/@types/pkg0.d.ts",
                  "./c/cb/node_modules/@types/pkg0/index.d.ts",
                  "./d/da/daa/daaa/node_modules/pkg0/package.json",
                  "./d/da/daa/daaa/node_modules/pkg0.ts",
                  "./d/da/daa/daaa/node_modules/pkg0.tsx",
                  "./d/da/daa/daaa/node_modules/pkg0.d.ts",
                  "./d/da/daa/daaa/node_modules/pkg0/index.ts",
                  "./d/da/daa/daaa/node_modules/pkg0/index.tsx",
                  "./d/da/daa/daaa/node_modules/pkg0/index.d.ts",
                  "./d/da/daa/daaa/node_modules/@types/pkg0/package.json",
                  "./d/da/daa/daaa/node_modules/@types/pkg0.d.ts",
                  "./d/da/daa/daaa/node_modules/@types/pkg0/index.d.ts",
                  "./d/da/daa/node_modules/pkg0/package.json",
                  "./d/da/daa/node_modules/pkg0.ts",
                  "./d/da/daa/node_modules/pkg0.tsx",
                  "./d/da/daa/node_modules/pkg0.d.ts",
                  "./d/da/daa/node_modules/pkg0/index.ts",
                  "./d/da/daa/node_modules/pkg0/index.tsx",
                  "./d/da/daa/node_modules/pkg0/index.d.ts",
                  "./d/da/daa/node_modules/@types/pkg0/package.json",
                  "./d/da/daa/node_modules/@types/pkg0.d.ts",
                  "./d/da/daa/node_modules/@types/pkg0/index.d.ts",
                  "./d/da/node_modules/pkg0/package.json",
                  "./d/da/node_modules/pkg0.ts",
                  "./d/da/node_modules/pkg0.tsx",
                  "./d/da/node_modules/pkg0.d.ts",
                  "./d/da/node_modules/pkg0/index.ts",
                  "./d/da/node_modules/pkg0/index.tsx",
                  "./d/da/node_modules/pkg0/index.d.ts",
                  "./d/da/node_modules/@types/pkg0/package.json",
                  "./d/da/node_modules/@types/pkg0.d.ts",
                  "./d/da/node_modules/@types/pkg0/index.d.ts",
                  "./d/node_modules/pkg0/package.json",
                  "./d/node_modules/pkg0.ts",
                  "./d/node_modules/pkg0.tsx",
                  "./d/node_modules/pkg0.d.ts",
                  "./d/node_modules/pkg0/index.ts",
                  "./d/node_modules/pkg0/index.tsx",
                  "./d/node_modules/pkg0/index.d.ts",
                  "./d/node_modules/@types/pkg0/package.json",
                  "./d/node_modules/@types/pkg0.d.ts",
                  "./d/node_modules/@types/pkg0/index.d.ts",
                  "./e/ea/node_modules/pkg0/package.json",
                  "./e/ea/node_modules/pkg0.ts",
                  "./e/ea/node_modules/pkg0.tsx",
                  "./e/ea/node_modules/pkg0.d.ts",
                  "./e/ea/node_modules/pkg0/index.ts",
                  "./e/ea/node_modules/pkg0/index.tsx",
                  "./e/ea/node_modules/pkg0/index.d.ts",
                  "./e/ea/node_modules/@types/pkg0/package.json",
                  "./e/ea/node_modules/@types/pkg0.d.ts",
                  "./e/ea/node_modules/@types/pkg0/index.d.ts",
                  "./e/node_modules/pkg0/package.json",
                  "./e/node_modules/pkg0.ts",
                  "./e/node_modules/pkg0.tsx",
                  "./e/node_modules/pkg0.d.ts",
                  "./e/node_modules/pkg0/index.ts",
                  "./e/node_modules/pkg0/index.tsx",
                  "./e/node_modules/pkg0/index.d.ts",
                  "./e/node_modules/@types/pkg0/package.json",
                  "./e/node_modules/@types/pkg0.d.ts",
                  "./e/node_modules/@types/pkg0/index.d.ts",
                  "./e/ea/eaa/node_modules/pkg0/package.json",
                  "./e/ea/eaa/node_modules/pkg0.ts",
                  "./e/ea/eaa/node_modules/pkg0.tsx",
                  "./e/ea/eaa/node_modules/pkg0.d.ts",
                  "./e/ea/eaa/node_modules/pkg0/index.ts",
                  "./e/ea/eaa/node_modules/pkg0/index.tsx",
                  "./e/ea/eaa/node_modules/pkg0/index.d.ts",
                  "./e/ea/eaa/node_modules/@types/pkg0/package.json",
                  "./e/ea/eaa/node_modules/@types/pkg0.d.ts",
                  "./e/ea/eaa/node_modules/@types/pkg0/index.d.ts",
                  "./e/ea/eaa/eaaa/node_modules/pkg0/package.json",
                  "./e/ea/eaa/eaaa/node_modules/pkg0.ts",
                  "./e/ea/eaa/eaaa/node_modules/pkg0.tsx",
                  "./e/ea/eaa/eaaa/node_modules/pkg0.d.ts",
                  "./e/ea/eaa/eaaa/node_modules/pkg0/index.ts",
                  "./e/ea/eaa/eaaa/node_modules/pkg0/index.tsx",
                  "./e/ea/eaa/eaaa/node_modules/pkg0/index.d.ts",
                  "./e/ea/eaa/eaaa/node_modules/@types/pkg0/package.json",
                  "./e/ea/eaa/eaaa/node_modules/@types/pkg0.d.ts",
                  "./e/ea/eaa/eaaa/node_modules/@types/pkg0/index.d.ts"
                ]
              }
            ]
          ]
        ],
        [
          "./d/da/daa/daaa",
          [
            [
              "pkg0",
              {
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                },
                "failedLookupLocations": [
                  "./node_modules/pkg0/package.json",
                  "./node_modules/pkg0.ts",
                  "./node_modules/pkg0.tsx",
                  "./node_modules/pkg0.d.ts",
                  "./node_modules/pkg0/index.ts",
                  "./node_modules/pkg0/index.tsx",
                  "./a/node_modules/pkg0/package.json",
                  "./a/node_modules/pkg0.ts",
                  "./a/node_modules/pkg0.tsx",
                  "./a/node_modules/pkg0.d.ts",
                  "./a/node_modules/pkg0/index.ts",
                  "./a/node_modules/pkg0/index.tsx",
                  "./a/node_modules/pkg0/index.d.ts",
                  "./a/node_modules/@types/pkg0/package.json",
                  "./a/node_modules/@types/pkg0.d.ts",
                  "./a/node_modules/@types/pkg0/index.d.ts",
                  "./b/ba/node_modules/pkg0/package.json",
                  "./b/ba/node_modules/pkg0.ts",
                  "./b/ba/node_modules/pkg0.tsx",
                  "./b/ba/node_modules/pkg0.d.ts",
                  "./b/ba/node_modules/pkg0/index.ts",
                  "./b/ba/node_modules/pkg0/index.tsx",
                  "./b/ba/node_modules/pkg0/index.d.ts",
                  "./b/ba/node_modules/@types/pkg0/package.json",
                  "./b/ba/node_modules/@types/pkg0.d.ts",
                  "./b/ba/node_modules/@types/pkg0/index.d.ts",
                  "./b/node_modules/pkg0/package.json",
                  "./b/node_modules/pkg0.ts",
                  "./b/node_modules/pkg0.tsx",
                  "./b/node_modules/pkg0.d.ts",
                  "./b/node_modules/pkg0/index.ts",
                  "./b/node_modules/pkg0/index.tsx",
                  "./b/node_modules/pkg0/index.d.ts",
                  "./b/node_modules/@types/pkg0/package.json",
                  "./b/node_modules/@types/pkg0.d.ts",
                  "./b/node_modules/@types/pkg0/index.d.ts",
                  "./c/ca/node_modules/pkg0/package.json",
                  "./c/ca/node_modules/pkg0.ts",
                  "./c/ca/node_modules/pkg0.tsx",
                  "./c/ca/node_modules/pkg0.d.ts",
                  "./c/ca/node_modules/pkg0/index.ts",
                  "./c/ca/node_modules/pkg0/index.tsx",
                  "./c/ca/node_modules/pkg0/index.d.ts",
                  "./c/ca/node_modules/@types/pkg0/package.json",
                  "./c/ca/node_modules/@types/pkg0.d.ts",
                  "./c/ca/node_modules/@types/pkg0/index.d.ts",
                  "./c/node_modules/pkg0/package.json",
                  "./c/node_modules/pkg0.ts",
                  "./c/node_modules/pkg0.tsx",
                  "./c/node_modules/pkg0.d.ts",
                  "./c/node_modules/pkg0/index.ts",
                  "./c/node_modules/pkg0/index.tsx",
                  "./c/node_modules/pkg0/index.d.ts",
                  "./c/node_modules/@types/pkg0/package.json",
                  "./c/node_modules/@types/pkg0.d.ts",
                  "./c/node_modules/@types/pkg0/index.d.ts",
                  "./c/ca/caa/caaa/node_modules/pkg0/package.json",
                  "./c/ca/caa/caaa/node_modules/pkg0.ts",
                  "./c/ca/caa/caaa/node_modules/pkg0.tsx",
                  "./c/ca/caa/caaa/node_modules/pkg0.d.ts",
                  "./c/ca/caa/caaa/node_modules/pkg0/index.ts",
                  "./c/ca/caa/caaa/node_modules/pkg0/index.tsx",
                  "./c/ca/caa/caaa/node_modules/pkg0/index.d.ts",
                  "./c/ca/caa/caaa/node_modules/@types/pkg0/package.json",
                  "./c/ca/caa/caaa/node_modules/@types/pkg0.d.ts",
                  "./c/ca/caa/caaa/node_modules/@types/pkg0/index.d.ts",
                  "./c/ca/caa/node_modules/pkg0/package.json",
                  "./c/ca/caa/node_modules/pkg0.ts",
                  "./c/ca/caa/node_modules/pkg0.tsx",
                  "./c/ca/caa/node_modules/pkg0.d.ts",
                  "./c/ca/caa/node_modules/pkg0/index.ts",
                  "./c/ca/caa/node_modules/pkg0/index.tsx",
                  "./c/ca/caa/node_modules/pkg0/index.d.ts",
                  "./c/ca/caa/node_modules/@types/pkg0/package.json",
                  "./c/ca/caa/node_modules/@types/pkg0.d.ts",
                  "./c/ca/caa/node_modules/@types/pkg0/index.d.ts",
                  "./c/cb/node_modules/pkg0/package.json",
                  "./c/cb/node_modules/pkg0.ts",
                  "./c/cb/node_modules/pkg0.tsx",
                  "./c/cb/node_modules/pkg0.d.ts",
                  "./c/cb/node_modules/pkg0/index.ts",
                  "./c/cb/node_modules/pkg0/index.tsx",
                  "./c/cb/node_modules/pkg0/index.d.ts",
                  "./c/cb/node_modules/@types/pkg0/package.json",
                  "./c/cb/node_modules/@types/pkg0.d.ts",
                  "./c/cb/node_modules/@types/pkg0/index.d.ts",
                  "./d/da/daa/daaa/node_modules/pkg0/package.json",
                  "./d/da/daa/daaa/node_modules/pkg0.ts",
                  "./d/da/daa/daaa/node_modules/pkg0.tsx",
                  "./d/da/daa/daaa/node_modules/pkg0.d.ts",
                  "./d/da/daa/daaa/node_modules/pkg0/index.ts",
                  "./d/da/daa/daaa/node_modules/pkg0/index.tsx",
                  "./d/da/daa/daaa/node_modules/pkg0/index.d.ts",
                  "./d/da/daa/daaa/node_modules/@types/pkg0/package.json",
                  "./d/da/daa/daaa/node_modules/@types/pkg0.d.ts",
                  "./d/da/daa/daaa/node_modules/@types/pkg0/index.d.ts",
                  "./d/da/daa/node_modules/pkg0/package.json",
                  "./d/da/daa/node_modules/pkg0.ts",
                  "./d/da/daa/node_modules/pkg0.tsx",
                  "./d/da/daa/node_modules/pkg0.d.ts",
                  "./d/da/daa/node_modules/pkg0/index.ts",
                  "./d/da/daa/node_modules/pkg0/index.tsx",
                  "./d/da/daa/node_modules/pkg0/index.d.ts",
                  "./d/da/daa/node_modules/@types/pkg0/package.json",
                  "./d/da/daa/node_modules/@types/pkg0.d.ts",
                  "./d/da/daa/node_modules/@types/pkg0/index.d.ts",
                  "./d/da/node_modules/pkg0/package.json",
                  "./d/da/node_modules/pkg0.ts",
                  "./d/da/node_modules/pkg0.tsx",
                  "./d/da/node_modules/pkg0.d.ts",
                  "./d/da/node_modules/pkg0/index.ts",
                  "./d/da/node_modules/pkg0/index.tsx",
                  "./d/da/node_modules/pkg0/index.d.ts",
                  "./d/da/node_modules/@types/pkg0/package.json",
                  "./d/da/node_modules/@types/pkg0.d.ts",
                  "./d/da/node_modules/@types/pkg0/index.d.ts",
                  "./d/node_modules/pkg0/package.json",
                  "./d/node_modules/pkg0.ts",
                  "./d/node_modules/pkg0.tsx",
                  "./d/node_modules/pkg0.d.ts",
                  "./d/node_modules/pkg0/index.ts",
                  "./d/node_modules/pkg0/index.tsx",
                  "./d/node_modules/pkg0/index.d.ts",
                  "./d/node_modules/@types/pkg0/package.json",
                  "./d/node_modules/@types/pkg0.d.ts",
                  "./d/node_modules/@types/pkg0/index.d.ts",
                  "./e/ea/node_modules/pkg0/package.json",
                  "./e/ea/node_modules/pkg0.ts",
                  "./e/ea/node_modules/pkg0.tsx",
                  "./e/ea/node_modules/pkg0.d.ts",
                  "./e/ea/node_modules/pkg0/index.ts",
                  "./e/ea/node_modules/pkg0/index.tsx",
                  "./e/ea/node_modules/pkg0/index.d.ts",
                  "./e/ea/node_modules/@types/pkg0/package.json",
                  "./e/ea/node_modules/@types/pkg0.d.ts",
                  "./e/ea/node_modules/@types/pkg0/index.d.ts",
                  "./e/node_modules/pkg0/package.json",
                  "./e/node_modules/pkg0.ts",
                  "./e/node_modules/pkg0.tsx",
                  "./e/node_modules/pkg0.d.ts",
                  "./e/node_modules/pkg0/index.ts",
                  "./e/node_modules/pkg0/index.tsx",
                  "./e/node_modules/pkg0/index.d.ts",
                  "./e/node_modules/@types/pkg0/package.json",
                  "./e/node_modules/@types/pkg0.d.ts",
                  "./e/node_modules/@types/pkg0/index.d.ts",
                  "./e/ea/eaa/node_modules/pkg0/package.json",
                  "./e/ea/eaa/node_modules/pkg0.ts",
                  "./e/ea/eaa/node_modules/pkg0.tsx",
                  "./e/ea/eaa/node_modules/pkg0.d.ts",
                  "./e/ea/eaa/node_modules/pkg0/index.ts",
                  "./e/ea/eaa/node_modules/pkg0/index.tsx",
                  "./e/ea/eaa/node_modules/pkg0/index.d.ts",
                  "./e/ea/eaa/node_modules/@types/pkg0/package.json",
                  "./e/ea/eaa/node_modules/@types/pkg0.d.ts",
                  "./e/ea/eaa/node_modules/@types/pkg0/index.d.ts",
                  "./e/ea/eaa/eaaa/node_modules/pkg0/package.json",
                  "./e/ea/eaa/eaaa/node_modules/pkg0.ts",
                  "./e/ea/eaa/eaaa/node_modules/pkg0.tsx",
                  "./e/ea/eaa/eaaa/node_modules/pkg0.d.ts",
                  "./e/ea/eaa/eaaa/node_modules/pkg0/index.ts",
                  "./e/ea/eaa/eaaa/node_modules/pkg0/index.tsx",
                  "./e/ea/eaa/eaaa/node_modules/pkg0/index.d.ts",
                  "./e/ea/eaa/eaaa/node_modules/@types/pkg0/package.json",
                  "./e/ea/eaa/eaaa/node_modules/@types/pkg0.d.ts",
                  "./e/ea/eaa/eaaa/node_modules/@types/pkg0/index.d.ts"
                ]
              }
            ]
          ]
        ],
        [
          "./e/ea/eaa/eaaa",
          [
            [
              "pkg0",
              {
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                },
                "failedLookupLocations": [
                  "./node_modules/pkg0/package.json",
                  "./node_modules/pkg0.ts",
                  "./node_modules/pkg0.tsx",
                  "./node_modules/pkg0.d.ts",
                  "./node_modules/pkg0/index.ts",
                  "./node_modules/pkg0/index.tsx",
                  "./a/node_modules/pkg0/package.json",
                  "./a/node_modules/pkg0.ts",
                  "./a/node_modules/pkg0.tsx",
                  "./a/node_modules/pkg0.d.ts",
                  "./a/node_modules/pkg0/index.ts",
                  "./a/node_modules/pkg0/index.tsx",
                  "./a/node_modules/pkg0/index.d.ts",
                  "./a/node_modules/@types/pkg0/package.json",
                  "./a/node_modules/@types/pkg0.d.ts",
                  "./a/node_modules/@types/pkg0/index.d.ts",
                  "./b/ba/node_modules/pkg0/package.json",
                  "./b/ba/node_modules/pkg0.ts",
                  "./b/ba/node_modules/pkg0.tsx",
                  "./b/ba/node_modules/pkg0.d.ts",
                  "./b/ba/node_modules/pkg0/index.ts",
                  "./b/ba/node_modules/pkg0/index.tsx",
                  "./b/ba/node_modules/pkg0/index.d.ts",
                  "./b/ba/node_modules/@types/pkg0/package.json",
                  "./b/ba/node_modules/@types/pkg0.d.ts",
                  "./b/ba/node_modules/@types/pkg0/index.d.ts",
                  "./b/node_modules/pkg0/package.json",
                  "./b/node_modules/pkg0.ts",
                  "./b/node_modules/pkg0.tsx",
                  "./b/node_modules/pkg0.d.ts",
                  "./b/node_modules/pkg0/index.ts",
                  "./b/node_modules/pkg0/index.tsx",
                  "./b/node_modules/pkg0/index.d.ts",
                  "./b/node_modules/@types/pkg0/package.json",
                  "./b/node_modules/@types/pkg0.d.ts",
                  "./b/node_modules/@types/pkg0/index.d.ts",
                  "./c/ca/node_modules/pkg0/package.json",
                  "./c/ca/node_modules/pkg0.ts",
                  "./c/ca/node_modules/pkg0.tsx",
                  "./c/ca/node_modules/pkg0.d.ts",
                  "./c/ca/node_modules/pkg0/index.ts",
                  "./c/ca/node_modules/pkg0/index.tsx",
                  "./c/ca/node_modules/pkg0/index.d.ts",
                  "./c/ca/node_modules/@types/pkg0/package.json",
                  "./c/ca/node_modules/@types/pkg0.d.ts",
                  "./c/ca/node_modules/@types/pkg0/index.d.ts",
                  "./c/node_modules/pkg0/package.json",
                  "./c/node_modules/pkg0.ts",
                  "./c/node_modules/pkg0.tsx",
                  "./c/node_modules/pkg0.d.ts",
                  "./c/node_modules/pkg0/index.ts",
                  "./c/node_modules/pkg0/index.tsx",
                  "./c/node_modules/pkg0/index.d.ts",
                  "./c/node_modules/@types/pkg0/package.json",
                  "./c/node_modules/@types/pkg0.d.ts",
                  "./c/node_modules/@types/pkg0/index.d.ts",
                  "./c/ca/caa/caaa/node_modules/pkg0/package.json",
                  "./c/ca/caa/caaa/node_modules/pkg0.ts",
                  "./c/ca/caa/caaa/node_modules/pkg0.tsx",
                  "./c/ca/caa/caaa/node_modules/pkg0.d.ts",
                  "./c/ca/caa/caaa/node_modules/pkg0/index.ts",
                  "./c/ca/caa/caaa/node_modules/pkg0/index.tsx",
                  "./c/ca/caa/caaa/node_modules/pkg0/index.d.ts",
                  "./c/ca/caa/caaa/node_modules/@types/pkg0/package.json",
                  "./c/ca/caa/caaa/node_modules/@types/pkg0.d.ts",
                  "./c/ca/caa/caaa/node_modules/@types/pkg0/index.d.ts",
                  "./c/ca/caa/node_modules/pkg0/package.json",
                  "./c/ca/caa/node_modules/pkg0.ts",
                  "./c/ca/caa/node_modules/pkg0.tsx",
                  "./c/ca/caa/node_modules/pkg0.d.ts",
                  "./c/ca/caa/node_modules/pkg0/index.ts",
                  "./c/ca/caa/node_modules/pkg0/index.tsx",
                  "./c/ca/caa/node_modules/pkg0/index.d.ts",
                  "./c/ca/caa/node_modules/@types/pkg0/package.json",
                  "./c/ca/caa/node_modules/@types/pkg0.d.ts",
                  "./c/ca/caa/node_modules/@types/pkg0/index.d.ts",
                  "./c/cb/node_modules/pkg0/package.json",
                  "./c/cb/node_modules/pkg0.ts",
                  "./c/cb/node_modules/pkg0.tsx",
                  "./c/cb/node_modules/pkg0.d.ts",
                  "./c/cb/node_modules/pkg0/index.ts",
                  "./c/cb/node_modules/pkg0/index.tsx",
                  "./c/cb/node_modules/pkg0/index.d.ts",
                  "./c/cb/node_modules/@types/pkg0/package.json",
                  "./c/cb/node_modules/@types/pkg0.d.ts",
                  "./c/cb/node_modules/@types/pkg0/index.d.ts",
                  "./d/da/daa/daaa/node_modules/pkg0/package.json",
                  "./d/da/daa/daaa/node_modules/pkg0.ts",
                  "./d/da/daa/daaa/node_modules/pkg0.tsx",
                  "./d/da/daa/daaa/node_modules/pkg0.d.ts",
                  "./d/da/daa/daaa/node_modules/pkg0/index.ts",
                  "./d/da/daa/daaa/node_modules/pkg0/index.tsx",
                  "./d/da/daa/daaa/node_modules/pkg0/index.d.ts",
                  "./d/da/daa/daaa/node_modules/@types/pkg0/package.json",
                  "./d/da/daa/daaa/node_modules/@types/pkg0.d.ts",
                  "./d/da/daa/daaa/node_modules/@types/pkg0/index.d.ts",
                  "./d/da/daa/node_modules/pkg0/package.json",
                  "./d/da/daa/node_modules/pkg0.ts",
                  "./d/da/daa/node_modules/pkg0.tsx",
                  "./d/da/daa/node_modules/pkg0.d.ts",
                  "./d/da/daa/node_modules/pkg0/index.ts",
                  "./d/da/daa/node_modules/pkg0/index.tsx",
                  "./d/da/daa/node_modules/pkg0/index.d.ts",
                  "./d/da/daa/node_modules/@types/pkg0/package.json",
                  "./d/da/daa/node_modules/@types/pkg0.d.ts",
                  "./d/da/daa/node_modules/@types/pkg0/index.d.ts",
                  "./d/da/node_modules/pkg0/package.json",
                  "./d/da/node_modules/pkg0.ts",
                  "./d/da/node_modules/pkg0.tsx",
                  "./d/da/node_modules/pkg0.d.ts",
                  "./d/da/node_modules/pkg0/index.ts",
                  "./d/da/node_modules/pkg0/index.tsx",
                  "./d/da/node_modules/pkg0/index.d.ts",
                  "./d/da/node_modules/@types/pkg0/package.json",
                  "./d/da/node_modules/@types/pkg0.d.ts",
                  "./d/da/node_modules/@types/pkg0/index.d.ts",
                  "./d/node_modules/pkg0/package.json",
                  "./d/node_modules/pkg0.ts",
                  "./d/node_modules/pkg0.tsx",
                  "./d/node_modules/pkg0.d.ts",
                  "./d/node_modules/pkg0/index.ts",
                  "./d/node_modules/pkg0/index.tsx",
                  "./d/node_modules/pkg0/index.d.ts",
                  "./d/node_modules/@types/pkg0/package.json",
                  "./d/node_modules/@types/pkg0.d.ts",
                  "./d/node_modules/@types/pkg0/index.d.ts",
                  "./e/ea/node_modules/pkg0/package.json",
                  "./e/ea/node_modules/pkg0.ts",
                  "./e/ea/node_modules/pkg0.tsx",
                  "./e/ea/node_modules/pkg0.d.ts",
                  "./e/ea/node_modules/pkg0/index.ts",
                  "./e/ea/node_modules/pkg0/index.tsx",
                  "./e/ea/node_modules/pkg0/index.d.ts",
                  "./e/ea/node_modules/@types/pkg0/package.json",
                  "./e/ea/node_modules/@types/pkg0.d.ts",
                  "./e/ea/node_modules/@types/pkg0/index.d.ts",
                  "./e/node_modules/pkg0/package.json",
                  "./e/node_modules/pkg0.ts",
                  "./e/node_modules/pkg0.tsx",
                  "./e/node_modules/pkg0.d.ts",
                  "./e/node_modules/pkg0/index.ts",
                  "./e/node_modules/pkg0/index.tsx",
                  "./e/node_modules/pkg0/index.d.ts",
                  "./e/node_modules/@types/pkg0/package.json",
                  "./e/node_modules/@types/pkg0.d.ts",
                  "./e/node_modules/@types/pkg0/index.d.ts",
                  "./e/ea/eaa/node_modules/pkg0/package.json",
                  "./e/ea/eaa/node_modules/pkg0.ts",
                  "./e/ea/eaa/node_modules/pkg0.tsx",
                  "./e/ea/eaa/node_modules/pkg0.d.ts",
                  "./e/ea/eaa/node_modules/pkg0/index.ts",
                  "./e/ea/eaa/node_modules/pkg0/index.tsx",
                  "./e/ea/eaa/node_modules/pkg0/index.d.ts",
                  "./e/ea/eaa/node_modules/@types/pkg0/package.json",
                  "./e/ea/eaa/node_modules/@types/pkg0.d.ts",
                  "./e/ea/eaa/node_modules/@types/pkg0/index.d.ts",
                  "./e/ea/eaa/eaaa/node_modules/pkg0/package.json",
                  "./e/ea/eaa/eaaa/node_modules/pkg0.ts",
                  "./e/ea/eaa/eaaa/node_modules/pkg0.tsx",
                  "./e/ea/eaa/eaaa/node_modules/pkg0.d.ts",
                  "./e/ea/eaa/eaaa/node_modules/pkg0/index.ts",
                  "./e/ea/eaa/eaaa/node_modules/pkg0/index.tsx",
                  "./e/ea/eaa/eaaa/node_modules/pkg0/index.d.ts",
                  "./e/ea/eaa/eaaa/node_modules/@types/pkg0/package.json",
                  "./e/ea/eaa/eaaa/node_modules/@types/pkg0.d.ts",
                  "./e/ea/eaa/eaaa/node_modules/@types/pkg0/index.d.ts"
                ]
              }
            ]
          ]
        ]
      ]
    }
  },
  "version": "FakeTSVersion",
  "size": 10368
}


Change:: modify randomFileForImport by adding import

Input::
//// [/src/project/randomFileForImport.ts]
import type { ImportInterface0 } from "pkg0";
export const x = 10;


Output::
>> Screen clear
[[90m12:02:32 AM[0m] File change detected. Starting incremental compilation...

Reusing resolution of module 'pkg0' from '/src/project/fileWithImports.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/src/project/randomFileForImport.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/src/project/a/fileWithImports.ts' found in cache from location '/src/project/a', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/src/project/b/ba/fileWithImports.ts' found in cache from location '/src/project/b/ba', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/src/project/c/ca/fileWithImports.ts' found in cache from location '/src/project/c/ca', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/src/project/c/ca/caa/caaa/fileWithImports.ts' found in cache from location '/src/project/c/ca/caa/caaa', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/src/project/c/cb/fileWithImports.ts' found in cache from location '/src/project/c/cb', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/daaa/fileWithImports.ts' found in cache from location '/src/project/d/da/daa/daaa', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/fileWithImports.ts' found in cache from location '/src/project/d/da/daa', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/src/project/d/da/fileWithImports.ts' found in cache from location '/src/project/d/da', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/src/project/e/ea/fileWithImports.ts' found in cache from location '/src/project/e/ea', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/fileWithImports.ts' found in cache from location '/src/project/e/ea/eaa', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/eaaa/fileWithImports.ts' found in cache from location '/src/project/e/ea/eaa/eaaa', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
../../a/lib/lib.d.ts
  Default library for target 'es3'
node_modules/pkg0/index.d.ts
  Imported via "pkg0" from file 'fileWithImports.ts'
  Imported via "pkg0" from file 'randomFileForImport.ts'
  Imported via "pkg0" from file 'a/fileWithImports.ts'
  Imported via "pkg0" from file 'b/ba/fileWithImports.ts'
  Imported via "pkg0" from file 'c/ca/fileWithImports.ts'
  Imported via "pkg0" from file 'c/ca/caa/caaa/fileWithImports.ts'
  Imported via "pkg0" from file 'c/cb/fileWithImports.ts'
  Imported via "pkg0" from file 'd/da/daa/daaa/fileWithImports.ts'
  Imported via "pkg0" from file 'd/da/daa/fileWithImports.ts'
  Imported via "pkg0" from file 'd/da/fileWithImports.ts'
  Imported via "pkg0" from file 'e/ea/fileWithImports.ts'
  Imported via "pkg0" from file 'e/ea/eaa/fileWithImports.ts'
  Imported via "pkg0" from file 'e/ea/eaa/eaaa/fileWithImports.ts'
fileWithImports.ts
  Part of 'files' list in tsconfig.json
randomFileForImport.ts
  Part of 'files' list in tsconfig.json
a/fileWithImports.ts
  Part of 'files' list in tsconfig.json
b/ba/fileWithImports.ts
  Part of 'files' list in tsconfig.json
b/randomFileForImport.ts
  Part of 'files' list in tsconfig.json
c/ca/fileWithImports.ts
  Part of 'files' list in tsconfig.json
c/ca/caa/randomFileForImport.ts
  Part of 'files' list in tsconfig.json
c/ca/caa/caaa/fileWithImports.ts
  Part of 'files' list in tsconfig.json
c/cb/fileWithImports.ts
  Part of 'files' list in tsconfig.json
d/da/daa/daaa/fileWithImports.ts
  Part of 'files' list in tsconfig.json
d/da/daa/fileWithImports.ts
  Part of 'files' list in tsconfig.json
d/da/fileWithImports.ts
  Part of 'files' list in tsconfig.json
e/ea/fileWithImports.ts
  Part of 'files' list in tsconfig.json
e/ea/eaa/fileWithImports.ts
  Part of 'files' list in tsconfig.json
e/ea/eaa/eaaa/fileWithImports.ts
  Part of 'files' list in tsconfig.json
[[90m12:02:43 AM[0m] Found 0 errors. Watching for file changes.



Program root files: ["/src/project/fileWithImports.ts","/src/project/randomFileForImport.ts","/src/project/a/fileWithImports.ts","/src/project/b/ba/fileWithImports.ts","/src/project/b/randomFileForImport.ts","/src/project/c/ca/fileWithImports.ts","/src/project/c/ca/caa/randomFileForImport.ts","/src/project/c/ca/caa/caaa/fileWithImports.ts","/src/project/c/cb/fileWithImports.ts","/src/project/d/da/daa/daaa/fileWithImports.ts","/src/project/d/da/daa/fileWithImports.ts","/src/project/d/da/fileWithImports.ts","/src/project/e/ea/fileWithImports.ts","/src/project/e/ea/eaa/fileWithImports.ts","/src/project/e/ea/eaa/eaaa/fileWithImports.ts"]
Program options: {"composite":true,"cacheResolutions":true,"traceResolution":true,"watch":true,"explainFiles":true,"configFilePath":"/src/project/tsconfig.json"}
Program structureReused: SafeModuleCache
Program files::
/a/lib/lib.d.ts
/src/project/node_modules/pkg0/index.d.ts
/src/project/fileWithImports.ts
/src/project/randomFileForImport.ts
/src/project/a/fileWithImports.ts
/src/project/b/ba/fileWithImports.ts
/src/project/b/randomFileForImport.ts
/src/project/c/ca/fileWithImports.ts
/src/project/c/ca/caa/randomFileForImport.ts
/src/project/c/ca/caa/caaa/fileWithImports.ts
/src/project/c/cb/fileWithImports.ts
/src/project/d/da/daa/daaa/fileWithImports.ts
/src/project/d/da/daa/fileWithImports.ts
/src/project/d/da/fileWithImports.ts
/src/project/e/ea/fileWithImports.ts
/src/project/e/ea/eaa/fileWithImports.ts
/src/project/e/ea/eaa/eaaa/fileWithImports.ts

Semantic diagnostics in builder refreshed for::
/src/project/randomFileForImport.ts

Shape signatures in builder refreshed for::
/src/project/randomfileforimport.ts (computed .d.ts)

WatchedFiles::
/src/project/tsconfig.json:
  {"fileName":"/src/project/tsconfig.json","pollingInterval":250}
/src/project/filewithimports.ts:
  {"fileName":"/src/project/fileWithImports.ts","pollingInterval":250}
/src/project/randomfileforimport.ts:
  {"fileName":"/src/project/randomFileForImport.ts","pollingInterval":250}
/src/project/a/filewithimports.ts:
  {"fileName":"/src/project/a/fileWithImports.ts","pollingInterval":250}
/src/project/b/ba/filewithimports.ts:
  {"fileName":"/src/project/b/ba/fileWithImports.ts","pollingInterval":250}
/src/project/b/randomfileforimport.ts:
  {"fileName":"/src/project/b/randomFileForImport.ts","pollingInterval":250}
/src/project/c/ca/filewithimports.ts:
  {"fileName":"/src/project/c/ca/fileWithImports.ts","pollingInterval":250}
/src/project/c/ca/caa/randomfileforimport.ts:
  {"fileName":"/src/project/c/ca/caa/randomFileForImport.ts","pollingInterval":250}
/src/project/c/ca/caa/caaa/filewithimports.ts:
  {"fileName":"/src/project/c/ca/caa/caaa/fileWithImports.ts","pollingInterval":250}
/src/project/c/cb/filewithimports.ts:
  {"fileName":"/src/project/c/cb/fileWithImports.ts","pollingInterval":250}
/src/project/d/da/daa/daaa/filewithimports.ts:
  {"fileName":"/src/project/d/da/daa/daaa/fileWithImports.ts","pollingInterval":250}
/src/project/d/da/daa/filewithimports.ts:
  {"fileName":"/src/project/d/da/daa/fileWithImports.ts","pollingInterval":250}
/src/project/d/da/filewithimports.ts:
  {"fileName":"/src/project/d/da/fileWithImports.ts","pollingInterval":250}
/src/project/e/ea/filewithimports.ts:
  {"fileName":"/src/project/e/ea/fileWithImports.ts","pollingInterval":250}
/src/project/e/ea/eaa/filewithimports.ts:
  {"fileName":"/src/project/e/ea/eaa/fileWithImports.ts","pollingInterval":250}
/src/project/e/ea/eaa/eaaa/filewithimports.ts:
  {"fileName":"/src/project/e/ea/eaa/eaaa/fileWithImports.ts","pollingInterval":250}
/src/project/node_modules/pkg0/package.json:
  {"fileName":"/src/project/node_modules/pkg0/package.json","pollingInterval":250}

FsWatches::

FsWatchesRecursive::

exitCode:: ExitStatus.undefined

//// [/src/project/randomFileForImport.js] file written with same contents
//// [/src/project/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../a/lib/lib.d.ts","./node_modules/pkg0/index.d.ts","./filewithimports.ts","./randomfileforimport.ts","./a/filewithimports.ts","./b/ba/filewithimports.ts","./b/randomfileforimport.ts","./c/ca/filewithimports.ts","./c/ca/caa/randomfileforimport.ts","./c/ca/caa/caaa/filewithimports.ts","./c/cb/filewithimports.ts","./d/da/daa/daaa/filewithimports.ts","./d/da/daa/filewithimports.ts","./d/da/filewithimports.ts","./e/ea/filewithimports.ts","./e/ea/eaa/filewithimports.ts","./e/ea/eaa/eaaa/filewithimports.ts","./a","./b/ba","./c/ca/caa/caaa","./c/cb","./d/da/daa/daaa","./e/ea/eaa/eaaa","./node_modules/pkg0/package.json","./node_modules/pkg0.ts","./node_modules/pkg0.tsx","./node_modules/pkg0.d.ts","./node_modules/pkg0/index.ts","./node_modules/pkg0/index.tsx","./a/node_modules/pkg0/package.json","./a/node_modules/pkg0.ts","./a/node_modules/pkg0.tsx","./a/node_modules/pkg0.d.ts","./a/node_modules/pkg0/index.ts","./a/node_modules/pkg0/index.tsx","./a/node_modules/pkg0/index.d.ts","./a/node_modules/@types/pkg0/package.json","./a/node_modules/@types/pkg0.d.ts","./a/node_modules/@types/pkg0/index.d.ts","./b/ba/node_modules/pkg0/package.json","./b/ba/node_modules/pkg0.ts","./b/ba/node_modules/pkg0.tsx","./b/ba/node_modules/pkg0.d.ts","./b/ba/node_modules/pkg0/index.ts","./b/ba/node_modules/pkg0/index.tsx","./b/ba/node_modules/pkg0/index.d.ts","./b/ba/node_modules/@types/pkg0/package.json","./b/ba/node_modules/@types/pkg0.d.ts","./b/ba/node_modules/@types/pkg0/index.d.ts","./b/node_modules/pkg0/package.json","./b/node_modules/pkg0.ts","./b/node_modules/pkg0.tsx","./b/node_modules/pkg0.d.ts","./b/node_modules/pkg0/index.ts","./b/node_modules/pkg0/index.tsx","./b/node_modules/pkg0/index.d.ts","./b/node_modules/@types/pkg0/package.json","./b/node_modules/@types/pkg0.d.ts","./b/node_modules/@types/pkg0/index.d.ts","./c/ca/node_modules/pkg0/package.json","./c/ca/node_modules/pkg0.ts","./c/ca/node_modules/pkg0.tsx","./c/ca/node_modules/pkg0.d.ts","./c/ca/node_modules/pkg0/index.ts","./c/ca/node_modules/pkg0/index.tsx","./c/ca/node_modules/pkg0/index.d.ts","./c/ca/node_modules/@types/pkg0/package.json","./c/ca/node_modules/@types/pkg0.d.ts","./c/ca/node_modules/@types/pkg0/index.d.ts","./c/node_modules/pkg0/package.json","./c/node_modules/pkg0.ts","./c/node_modules/pkg0.tsx","./c/node_modules/pkg0.d.ts","./c/node_modules/pkg0/index.ts","./c/node_modules/pkg0/index.tsx","./c/node_modules/pkg0/index.d.ts","./c/node_modules/@types/pkg0/package.json","./c/node_modules/@types/pkg0.d.ts","./c/node_modules/@types/pkg0/index.d.ts","./c/ca/caa/caaa/node_modules/pkg0/package.json","./c/ca/caa/caaa/node_modules/pkg0.ts","./c/ca/caa/caaa/node_modules/pkg0.tsx","./c/ca/caa/caaa/node_modules/pkg0.d.ts","./c/ca/caa/caaa/node_modules/pkg0/index.ts","./c/ca/caa/caaa/node_modules/pkg0/index.tsx","./c/ca/caa/caaa/node_modules/pkg0/index.d.ts","./c/ca/caa/caaa/node_modules/@types/pkg0/package.json","./c/ca/caa/caaa/node_modules/@types/pkg0.d.ts","./c/ca/caa/caaa/node_modules/@types/pkg0/index.d.ts","./c/ca/caa/node_modules/pkg0/package.json","./c/ca/caa/node_modules/pkg0.ts","./c/ca/caa/node_modules/pkg0.tsx","./c/ca/caa/node_modules/pkg0.d.ts","./c/ca/caa/node_modules/pkg0/index.ts","./c/ca/caa/node_modules/pkg0/index.tsx","./c/ca/caa/node_modules/pkg0/index.d.ts","./c/ca/caa/node_modules/@types/pkg0/package.json","./c/ca/caa/node_modules/@types/pkg0.d.ts","./c/ca/caa/node_modules/@types/pkg0/index.d.ts","./c/cb/node_modules/pkg0/package.json","./c/cb/node_modules/pkg0.ts","./c/cb/node_modules/pkg0.tsx","./c/cb/node_modules/pkg0.d.ts","./c/cb/node_modules/pkg0/index.ts","./c/cb/node_modules/pkg0/index.tsx","./c/cb/node_modules/pkg0/index.d.ts","./c/cb/node_modules/@types/pkg0/package.json","./c/cb/node_modules/@types/pkg0.d.ts","./c/cb/node_modules/@types/pkg0/index.d.ts","./d/da/daa/daaa/node_modules/pkg0/package.json","./d/da/daa/daaa/node_modules/pkg0.ts","./d/da/daa/daaa/node_modules/pkg0.tsx","./d/da/daa/daaa/node_modules/pkg0.d.ts","./d/da/daa/daaa/node_modules/pkg0/index.ts","./d/da/daa/daaa/node_modules/pkg0/index.tsx","./d/da/daa/daaa/node_modules/pkg0/index.d.ts","./d/da/daa/daaa/node_modules/@types/pkg0/package.json","./d/da/daa/daaa/node_modules/@types/pkg0.d.ts","./d/da/daa/daaa/node_modules/@types/pkg0/index.d.ts","./d/da/daa/node_modules/pkg0/package.json","./d/da/daa/node_modules/pkg0.ts","./d/da/daa/node_modules/pkg0.tsx","./d/da/daa/node_modules/pkg0.d.ts","./d/da/daa/node_modules/pkg0/index.ts","./d/da/daa/node_modules/pkg0/index.tsx","./d/da/daa/node_modules/pkg0/index.d.ts","./d/da/daa/node_modules/@types/pkg0/package.json","./d/da/daa/node_modules/@types/pkg0.d.ts","./d/da/daa/node_modules/@types/pkg0/index.d.ts","./d/da/node_modules/pkg0/package.json","./d/da/node_modules/pkg0.ts","./d/da/node_modules/pkg0.tsx","./d/da/node_modules/pkg0.d.ts","./d/da/node_modules/pkg0/index.ts","./d/da/node_modules/pkg0/index.tsx","./d/da/node_modules/pkg0/index.d.ts","./d/da/node_modules/@types/pkg0/package.json","./d/da/node_modules/@types/pkg0.d.ts","./d/da/node_modules/@types/pkg0/index.d.ts","./d/node_modules/pkg0/package.json","./d/node_modules/pkg0.ts","./d/node_modules/pkg0.tsx","./d/node_modules/pkg0.d.ts","./d/node_modules/pkg0/index.ts","./d/node_modules/pkg0/index.tsx","./d/node_modules/pkg0/index.d.ts","./d/node_modules/@types/pkg0/package.json","./d/node_modules/@types/pkg0.d.ts","./d/node_modules/@types/pkg0/index.d.ts","./e/ea/node_modules/pkg0/package.json","./e/ea/node_modules/pkg0.ts","./e/ea/node_modules/pkg0.tsx","./e/ea/node_modules/pkg0.d.ts","./e/ea/node_modules/pkg0/index.ts","./e/ea/node_modules/pkg0/index.tsx","./e/ea/node_modules/pkg0/index.d.ts","./e/ea/node_modules/@types/pkg0/package.json","./e/ea/node_modules/@types/pkg0.d.ts","./e/ea/node_modules/@types/pkg0/index.d.ts","./e/node_modules/pkg0/package.json","./e/node_modules/pkg0.ts","./e/node_modules/pkg0.tsx","./e/node_modules/pkg0.d.ts","./e/node_modules/pkg0/index.ts","./e/node_modules/pkg0/index.tsx","./e/node_modules/pkg0/index.d.ts","./e/node_modules/@types/pkg0/package.json","./e/node_modules/@types/pkg0.d.ts","./e/node_modules/@types/pkg0/index.d.ts","./e/ea/eaa/node_modules/pkg0/package.json","./e/ea/eaa/node_modules/pkg0.ts","./e/ea/eaa/node_modules/pkg0.tsx","./e/ea/eaa/node_modules/pkg0.d.ts","./e/ea/eaa/node_modules/pkg0/index.ts","./e/ea/eaa/node_modules/pkg0/index.tsx","./e/ea/eaa/node_modules/pkg0/index.d.ts","./e/ea/eaa/node_modules/@types/pkg0/package.json","./e/ea/eaa/node_modules/@types/pkg0.d.ts","./e/ea/eaa/node_modules/@types/pkg0/index.d.ts","./e/ea/eaa/eaaa/node_modules/pkg0/package.json","./e/ea/eaa/eaaa/node_modules/pkg0.ts","./e/ea/eaa/eaaa/node_modules/pkg0.tsx","./e/ea/eaa/eaaa/node_modules/pkg0.d.ts","./e/ea/eaa/eaaa/node_modules/pkg0/index.ts","./e/ea/eaa/eaaa/node_modules/pkg0/index.tsx","./e/ea/eaa/eaaa/node_modules/pkg0/index.d.ts","./e/ea/eaa/eaaa/node_modules/@types/pkg0/package.json","./e/ea/eaa/eaaa/node_modules/@types/pkg0.d.ts","./e/ea/eaa/eaaa/node_modules/@types/pkg0/index.d.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},"769951468-export interface ImportInterface0 {}",{"version":"7372004325-import type { ImportInterface0 } from \"pkg0\";\n","signature":"-3531856636-export {};\n"},{"version":"10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;","signature":"-6821242887-export declare const x = 10;\n"},{"version":"7372004325-import type { ImportInterface0 } from \"pkg0\";\n","signature":"-3531856636-export {};\n"},{"version":"7372004325-import type { ImportInterface0 } from \"pkg0\";\n","signature":"-3531856636-export {};\n"},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n"},{"version":"7372004325-import type { ImportInterface0 } from \"pkg0\";\n","signature":"-3531856636-export {};\n"},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n"},{"version":"7372004325-import type { ImportInterface0 } from \"pkg0\";\n","signature":"-3531856636-export {};\n"},{"version":"7372004325-import type { ImportInterface0 } from \"pkg0\";\n","signature":"-3531856636-export {};\n"},{"version":"7372004325-import type { ImportInterface0 } from \"pkg0\";\n","signature":"-3531856636-export {};\n"},{"version":"7372004325-import type { ImportInterface0 } from \"pkg0\";\n","signature":"-3531856636-export {};\n"},{"version":"7372004325-import type { ImportInterface0 } from \"pkg0\";\n","signature":"-3531856636-export {};\n"},{"version":"7372004325-import type { ImportInterface0 } from \"pkg0\";\n","signature":"-3531856636-export {};\n"},{"version":"7372004325-import type { ImportInterface0 } from \"pkg0\";\n","signature":"-3531856636-export {};\n"},{"version":"7372004325-import type { ImportInterface0 } from \"pkg0\";\n","signature":"-3531856636-export {};\n"}],"options":{"cacheResolutions":true,"composite":true},"fileIdsList":[[2]],"referencedMap":[[5,1],[6,1],[10,1],[8,1],[11,1],[12,1],[13,1],[14,1],[17,1],[16,1],[15,1],[3,1],[4,1]],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,5,6,7,10,9,8,11,12,13,14,17,16,15,3,2,4],"latestChangedDtsFile":"./e/ea/eaa/eaaa/fileWithImports.d.ts","cacheResolutions":{"resolutions":[{"resolvedModule":{"resolvedFileName":2,"isExternalLibraryImport":true},"failedLookupLocations":[24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,160,161,162,163,164,165,166,167,168,169,170,171,172,173,174,175,176,177,178,179,180,181,182,183,184,185,186,187,188,189]}],"names":["pkg0"],"resolutionEntries":[[1,1]],"modules":[[18,[1]],[19,[1]],[20,[1]],[21,[1]],[22,[1]],[23,[1]]]}},"version":"FakeTSVersion"}

//// [/src/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../a/lib/lib.d.ts",
      "./node_modules/pkg0/index.d.ts",
      "./filewithimports.ts",
      "./randomfileforimport.ts",
      "./a/filewithimports.ts",
      "./b/ba/filewithimports.ts",
      "./b/randomfileforimport.ts",
      "./c/ca/filewithimports.ts",
      "./c/ca/caa/randomfileforimport.ts",
      "./c/ca/caa/caaa/filewithimports.ts",
      "./c/cb/filewithimports.ts",
      "./d/da/daa/daaa/filewithimports.ts",
      "./d/da/daa/filewithimports.ts",
      "./d/da/filewithimports.ts",
      "./e/ea/filewithimports.ts",
      "./e/ea/eaa/filewithimports.ts",
      "./e/ea/eaa/eaaa/filewithimports.ts",
      "./a",
      "./b/ba",
      "./c/ca/caa/caaa",
      "./c/cb",
      "./d/da/daa/daaa",
      "./e/ea/eaa/eaaa",
      "./node_modules/pkg0/package.json",
      "./node_modules/pkg0.ts",
      "./node_modules/pkg0.tsx",
      "./node_modules/pkg0.d.ts",
      "./node_modules/pkg0/index.ts",
      "./node_modules/pkg0/index.tsx",
      "./a/node_modules/pkg0/package.json",
      "./a/node_modules/pkg0.ts",
      "./a/node_modules/pkg0.tsx",
      "./a/node_modules/pkg0.d.ts",
      "./a/node_modules/pkg0/index.ts",
      "./a/node_modules/pkg0/index.tsx",
      "./a/node_modules/pkg0/index.d.ts",
      "./a/node_modules/@types/pkg0/package.json",
      "./a/node_modules/@types/pkg0.d.ts",
      "./a/node_modules/@types/pkg0/index.d.ts",
      "./b/ba/node_modules/pkg0/package.json",
      "./b/ba/node_modules/pkg0.ts",
      "./b/ba/node_modules/pkg0.tsx",
      "./b/ba/node_modules/pkg0.d.ts",
      "./b/ba/node_modules/pkg0/index.ts",
      "./b/ba/node_modules/pkg0/index.tsx",
      "./b/ba/node_modules/pkg0/index.d.ts",
      "./b/ba/node_modules/@types/pkg0/package.json",
      "./b/ba/node_modules/@types/pkg0.d.ts",
      "./b/ba/node_modules/@types/pkg0/index.d.ts",
      "./b/node_modules/pkg0/package.json",
      "./b/node_modules/pkg0.ts",
      "./b/node_modules/pkg0.tsx",
      "./b/node_modules/pkg0.d.ts",
      "./b/node_modules/pkg0/index.ts",
      "./b/node_modules/pkg0/index.tsx",
      "./b/node_modules/pkg0/index.d.ts",
      "./b/node_modules/@types/pkg0/package.json",
      "./b/node_modules/@types/pkg0.d.ts",
      "./b/node_modules/@types/pkg0/index.d.ts",
      "./c/ca/node_modules/pkg0/package.json",
      "./c/ca/node_modules/pkg0.ts",
      "./c/ca/node_modules/pkg0.tsx",
      "./c/ca/node_modules/pkg0.d.ts",
      "./c/ca/node_modules/pkg0/index.ts",
      "./c/ca/node_modules/pkg0/index.tsx",
      "./c/ca/node_modules/pkg0/index.d.ts",
      "./c/ca/node_modules/@types/pkg0/package.json",
      "./c/ca/node_modules/@types/pkg0.d.ts",
      "./c/ca/node_modules/@types/pkg0/index.d.ts",
      "./c/node_modules/pkg0/package.json",
      "./c/node_modules/pkg0.ts",
      "./c/node_modules/pkg0.tsx",
      "./c/node_modules/pkg0.d.ts",
      "./c/node_modules/pkg0/index.ts",
      "./c/node_modules/pkg0/index.tsx",
      "./c/node_modules/pkg0/index.d.ts",
      "./c/node_modules/@types/pkg0/package.json",
      "./c/node_modules/@types/pkg0.d.ts",
      "./c/node_modules/@types/pkg0/index.d.ts",
      "./c/ca/caa/caaa/node_modules/pkg0/package.json",
      "./c/ca/caa/caaa/node_modules/pkg0.ts",
      "./c/ca/caa/caaa/node_modules/pkg0.tsx",
      "./c/ca/caa/caaa/node_modules/pkg0.d.ts",
      "./c/ca/caa/caaa/node_modules/pkg0/index.ts",
      "./c/ca/caa/caaa/node_modules/pkg0/index.tsx",
      "./c/ca/caa/caaa/node_modules/pkg0/index.d.ts",
      "./c/ca/caa/caaa/node_modules/@types/pkg0/package.json",
      "./c/ca/caa/caaa/node_modules/@types/pkg0.d.ts",
      "./c/ca/caa/caaa/node_modules/@types/pkg0/index.d.ts",
      "./c/ca/caa/node_modules/pkg0/package.json",
      "./c/ca/caa/node_modules/pkg0.ts",
      "./c/ca/caa/node_modules/pkg0.tsx",
      "./c/ca/caa/node_modules/pkg0.d.ts",
      "./c/ca/caa/node_modules/pkg0/index.ts",
      "./c/ca/caa/node_modules/pkg0/index.tsx",
      "./c/ca/caa/node_modules/pkg0/index.d.ts",
      "./c/ca/caa/node_modules/@types/pkg0/package.json",
      "./c/ca/caa/node_modules/@types/pkg0.d.ts",
      "./c/ca/caa/node_modules/@types/pkg0/index.d.ts",
      "./c/cb/node_modules/pkg0/package.json",
      "./c/cb/node_modules/pkg0.ts",
      "./c/cb/node_modules/pkg0.tsx",
      "./c/cb/node_modules/pkg0.d.ts",
      "./c/cb/node_modules/pkg0/index.ts",
      "./c/cb/node_modules/pkg0/index.tsx",
      "./c/cb/node_modules/pkg0/index.d.ts",
      "./c/cb/node_modules/@types/pkg0/package.json",
      "./c/cb/node_modules/@types/pkg0.d.ts",
      "./c/cb/node_modules/@types/pkg0/index.d.ts",
      "./d/da/daa/daaa/node_modules/pkg0/package.json",
      "./d/da/daa/daaa/node_modules/pkg0.ts",
      "./d/da/daa/daaa/node_modules/pkg0.tsx",
      "./d/da/daa/daaa/node_modules/pkg0.d.ts",
      "./d/da/daa/daaa/node_modules/pkg0/index.ts",
      "./d/da/daa/daaa/node_modules/pkg0/index.tsx",
      "./d/da/daa/daaa/node_modules/pkg0/index.d.ts",
      "./d/da/daa/daaa/node_modules/@types/pkg0/package.json",
      "./d/da/daa/daaa/node_modules/@types/pkg0.d.ts",
      "./d/da/daa/daaa/node_modules/@types/pkg0/index.d.ts",
      "./d/da/daa/node_modules/pkg0/package.json",
      "./d/da/daa/node_modules/pkg0.ts",
      "./d/da/daa/node_modules/pkg0.tsx",
      "./d/da/daa/node_modules/pkg0.d.ts",
      "./d/da/daa/node_modules/pkg0/index.ts",
      "./d/da/daa/node_modules/pkg0/index.tsx",
      "./d/da/daa/node_modules/pkg0/index.d.ts",
      "./d/da/daa/node_modules/@types/pkg0/package.json",
      "./d/da/daa/node_modules/@types/pkg0.d.ts",
      "./d/da/daa/node_modules/@types/pkg0/index.d.ts",
      "./d/da/node_modules/pkg0/package.json",
      "./d/da/node_modules/pkg0.ts",
      "./d/da/node_modules/pkg0.tsx",
      "./d/da/node_modules/pkg0.d.ts",
      "./d/da/node_modules/pkg0/index.ts",
      "./d/da/node_modules/pkg0/index.tsx",
      "./d/da/node_modules/pkg0/index.d.ts",
      "./d/da/node_modules/@types/pkg0/package.json",
      "./d/da/node_modules/@types/pkg0.d.ts",
      "./d/da/node_modules/@types/pkg0/index.d.ts",
      "./d/node_modules/pkg0/package.json",
      "./d/node_modules/pkg0.ts",
      "./d/node_modules/pkg0.tsx",
      "./d/node_modules/pkg0.d.ts",
      "./d/node_modules/pkg0/index.ts",
      "./d/node_modules/pkg0/index.tsx",
      "./d/node_modules/pkg0/index.d.ts",
      "./d/node_modules/@types/pkg0/package.json",
      "./d/node_modules/@types/pkg0.d.ts",
      "./d/node_modules/@types/pkg0/index.d.ts",
      "./e/ea/node_modules/pkg0/package.json",
      "./e/ea/node_modules/pkg0.ts",
      "./e/ea/node_modules/pkg0.tsx",
      "./e/ea/node_modules/pkg0.d.ts",
      "./e/ea/node_modules/pkg0/index.ts",
      "./e/ea/node_modules/pkg0/index.tsx",
      "./e/ea/node_modules/pkg0/index.d.ts",
      "./e/ea/node_modules/@types/pkg0/package.json",
      "./e/ea/node_modules/@types/pkg0.d.ts",
      "./e/ea/node_modules/@types/pkg0/index.d.ts",
      "./e/node_modules/pkg0/package.json",
      "./e/node_modules/pkg0.ts",
      "./e/node_modules/pkg0.tsx",
      "./e/node_modules/pkg0.d.ts",
      "./e/node_modules/pkg0/index.ts",
      "./e/node_modules/pkg0/index.tsx",
      "./e/node_modules/pkg0/index.d.ts",
      "./e/node_modules/@types/pkg0/package.json",
      "./e/node_modules/@types/pkg0.d.ts",
      "./e/node_modules/@types/pkg0/index.d.ts",
      "./e/ea/eaa/node_modules/pkg0/package.json",
      "./e/ea/eaa/node_modules/pkg0.ts",
      "./e/ea/eaa/node_modules/pkg0.tsx",
      "./e/ea/eaa/node_modules/pkg0.d.ts",
      "./e/ea/eaa/node_modules/pkg0/index.ts",
      "./e/ea/eaa/node_modules/pkg0/index.tsx",
      "./e/ea/eaa/node_modules/pkg0/index.d.ts",
      "./e/ea/eaa/node_modules/@types/pkg0/package.json",
      "./e/ea/eaa/node_modules/@types/pkg0.d.ts",
      "./e/ea/eaa/node_modules/@types/pkg0/index.d.ts",
      "./e/ea/eaa/eaaa/node_modules/pkg0/package.json",
      "./e/ea/eaa/eaaa/node_modules/pkg0.ts",
      "./e/ea/eaa/eaaa/node_modules/pkg0.tsx",
      "./e/ea/eaa/eaaa/node_modules/pkg0.d.ts",
      "./e/ea/eaa/eaaa/node_modules/pkg0/index.ts",
      "./e/ea/eaa/eaaa/node_modules/pkg0/index.tsx",
      "./e/ea/eaa/eaaa/node_modules/pkg0/index.d.ts",
      "./e/ea/eaa/eaaa/node_modules/@types/pkg0/package.json",
      "./e/ea/eaa/eaaa/node_modules/@types/pkg0.d.ts",
      "./e/ea/eaa/eaaa/node_modules/@types/pkg0/index.d.ts"
    ],
    "fileNamesList": [
      [
        "./node_modules/pkg0/index.d.ts"
      ]
    ],
    "fileInfos": {
      "../../a/lib/lib.d.ts": {
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true
      },
      "./node_modules/pkg0/index.d.ts": {
        "version": "769951468-export interface ImportInterface0 {}",
        "signature": "769951468-export interface ImportInterface0 {}"
      },
      "./filewithimports.ts": {
        "version": "7372004325-import type { ImportInterface0 } from \"pkg0\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./randomfileforimport.ts": {
        "version": "10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n"
      },
      "./a/filewithimports.ts": {
        "version": "7372004325-import type { ImportInterface0 } from \"pkg0\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./b/ba/filewithimports.ts": {
        "version": "7372004325-import type { ImportInterface0 } from \"pkg0\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./b/randomfileforimport.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n"
      },
      "./c/ca/filewithimports.ts": {
        "version": "7372004325-import type { ImportInterface0 } from \"pkg0\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./c/ca/caa/randomfileforimport.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n"
      },
      "./c/ca/caa/caaa/filewithimports.ts": {
        "version": "7372004325-import type { ImportInterface0 } from \"pkg0\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./c/cb/filewithimports.ts": {
        "version": "7372004325-import type { ImportInterface0 } from \"pkg0\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./d/da/daa/daaa/filewithimports.ts": {
        "version": "7372004325-import type { ImportInterface0 } from \"pkg0\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./d/da/daa/filewithimports.ts": {
        "version": "7372004325-import type { ImportInterface0 } from \"pkg0\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./d/da/filewithimports.ts": {
        "version": "7372004325-import type { ImportInterface0 } from \"pkg0\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./e/ea/filewithimports.ts": {
        "version": "7372004325-import type { ImportInterface0 } from \"pkg0\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./e/ea/eaa/filewithimports.ts": {
        "version": "7372004325-import type { ImportInterface0 } from \"pkg0\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./e/ea/eaa/eaaa/filewithimports.ts": {
        "version": "7372004325-import type { ImportInterface0 } from \"pkg0\";\n",
        "signature": "-3531856636-export {};\n"
      }
    },
    "options": {
      "cacheResolutions": true,
      "composite": true
    },
    "referencedMap": {
      "./a/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./b/ba/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./c/ca/caa/caaa/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./c/ca/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./c/cb/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./d/da/daa/daaa/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./d/da/daa/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./d/da/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./e/ea/eaa/eaaa/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./e/ea/eaa/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./e/ea/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./randomfileforimport.ts": [
        "./node_modules/pkg0/index.d.ts"
      ]
    },
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../a/lib/lib.d.ts",
      "./a/filewithimports.ts",
      "./b/ba/filewithimports.ts",
      "./b/randomfileforimport.ts",
      "./c/ca/caa/caaa/filewithimports.ts",
      "./c/ca/caa/randomfileforimport.ts",
      "./c/ca/filewithimports.ts",
      "./c/cb/filewithimports.ts",
      "./d/da/daa/daaa/filewithimports.ts",
      "./d/da/daa/filewithimports.ts",
      "./d/da/filewithimports.ts",
      "./e/ea/eaa/eaaa/filewithimports.ts",
      "./e/ea/eaa/filewithimports.ts",
      "./e/ea/filewithimports.ts",
      "./filewithimports.ts",
      "./node_modules/pkg0/index.d.ts",
      "./randomfileforimport.ts"
    ],
    "latestChangedDtsFile": "./e/ea/eaa/eaaa/fileWithImports.d.ts",
    "cacheResolutions": {
      "resolutions": [
        {
          "resolvedModule": {
            "resolvedFileName": "./node_modules/pkg0/index.d.ts",
            "isExternalLibraryImport": true
          },
          "failedLookupLocations": [
            "./node_modules/pkg0/package.json",
            "./node_modules/pkg0.ts",
            "./node_modules/pkg0.tsx",
            "./node_modules/pkg0.d.ts",
            "./node_modules/pkg0/index.ts",
            "./node_modules/pkg0/index.tsx",
            "./a/node_modules/pkg0/package.json",
            "./a/node_modules/pkg0.ts",
            "./a/node_modules/pkg0.tsx",
            "./a/node_modules/pkg0.d.ts",
            "./a/node_modules/pkg0/index.ts",
            "./a/node_modules/pkg0/index.tsx",
            "./a/node_modules/pkg0/index.d.ts",
            "./a/node_modules/@types/pkg0/package.json",
            "./a/node_modules/@types/pkg0.d.ts",
            "./a/node_modules/@types/pkg0/index.d.ts",
            "./b/ba/node_modules/pkg0/package.json",
            "./b/ba/node_modules/pkg0.ts",
            "./b/ba/node_modules/pkg0.tsx",
            "./b/ba/node_modules/pkg0.d.ts",
            "./b/ba/node_modules/pkg0/index.ts",
            "./b/ba/node_modules/pkg0/index.tsx",
            "./b/ba/node_modules/pkg0/index.d.ts",
            "./b/ba/node_modules/@types/pkg0/package.json",
            "./b/ba/node_modules/@types/pkg0.d.ts",
            "./b/ba/node_modules/@types/pkg0/index.d.ts",
            "./b/node_modules/pkg0/package.json",
            "./b/node_modules/pkg0.ts",
            "./b/node_modules/pkg0.tsx",
            "./b/node_modules/pkg0.d.ts",
            "./b/node_modules/pkg0/index.ts",
            "./b/node_modules/pkg0/index.tsx",
            "./b/node_modules/pkg0/index.d.ts",
            "./b/node_modules/@types/pkg0/package.json",
            "./b/node_modules/@types/pkg0.d.ts",
            "./b/node_modules/@types/pkg0/index.d.ts",
            "./c/ca/node_modules/pkg0/package.json",
            "./c/ca/node_modules/pkg0.ts",
            "./c/ca/node_modules/pkg0.tsx",
            "./c/ca/node_modules/pkg0.d.ts",
            "./c/ca/node_modules/pkg0/index.ts",
            "./c/ca/node_modules/pkg0/index.tsx",
            "./c/ca/node_modules/pkg0/index.d.ts",
            "./c/ca/node_modules/@types/pkg0/package.json",
            "./c/ca/node_modules/@types/pkg0.d.ts",
            "./c/ca/node_modules/@types/pkg0/index.d.ts",
            "./c/node_modules/pkg0/package.json",
            "./c/node_modules/pkg0.ts",
            "./c/node_modules/pkg0.tsx",
            "./c/node_modules/pkg0.d.ts",
            "./c/node_modules/pkg0/index.ts",
            "./c/node_modules/pkg0/index.tsx",
            "./c/node_modules/pkg0/index.d.ts",
            "./c/node_modules/@types/pkg0/package.json",
            "./c/node_modules/@types/pkg0.d.ts",
            "./c/node_modules/@types/pkg0/index.d.ts",
            "./c/ca/caa/caaa/node_modules/pkg0/package.json",
            "./c/ca/caa/caaa/node_modules/pkg0.ts",
            "./c/ca/caa/caaa/node_modules/pkg0.tsx",
            "./c/ca/caa/caaa/node_modules/pkg0.d.ts",
            "./c/ca/caa/caaa/node_modules/pkg0/index.ts",
            "./c/ca/caa/caaa/node_modules/pkg0/index.tsx",
            "./c/ca/caa/caaa/node_modules/pkg0/index.d.ts",
            "./c/ca/caa/caaa/node_modules/@types/pkg0/package.json",
            "./c/ca/caa/caaa/node_modules/@types/pkg0.d.ts",
            "./c/ca/caa/caaa/node_modules/@types/pkg0/index.d.ts",
            "./c/ca/caa/node_modules/pkg0/package.json",
            "./c/ca/caa/node_modules/pkg0.ts",
            "./c/ca/caa/node_modules/pkg0.tsx",
            "./c/ca/caa/node_modules/pkg0.d.ts",
            "./c/ca/caa/node_modules/pkg0/index.ts",
            "./c/ca/caa/node_modules/pkg0/index.tsx",
            "./c/ca/caa/node_modules/pkg0/index.d.ts",
            "./c/ca/caa/node_modules/@types/pkg0/package.json",
            "./c/ca/caa/node_modules/@types/pkg0.d.ts",
            "./c/ca/caa/node_modules/@types/pkg0/index.d.ts",
            "./c/cb/node_modules/pkg0/package.json",
            "./c/cb/node_modules/pkg0.ts",
            "./c/cb/node_modules/pkg0.tsx",
            "./c/cb/node_modules/pkg0.d.ts",
            "./c/cb/node_modules/pkg0/index.ts",
            "./c/cb/node_modules/pkg0/index.tsx",
            "./c/cb/node_modules/pkg0/index.d.ts",
            "./c/cb/node_modules/@types/pkg0/package.json",
            "./c/cb/node_modules/@types/pkg0.d.ts",
            "./c/cb/node_modules/@types/pkg0/index.d.ts",
            "./d/da/daa/daaa/node_modules/pkg0/package.json",
            "./d/da/daa/daaa/node_modules/pkg0.ts",
            "./d/da/daa/daaa/node_modules/pkg0.tsx",
            "./d/da/daa/daaa/node_modules/pkg0.d.ts",
            "./d/da/daa/daaa/node_modules/pkg0/index.ts",
            "./d/da/daa/daaa/node_modules/pkg0/index.tsx",
            "./d/da/daa/daaa/node_modules/pkg0/index.d.ts",
            "./d/da/daa/daaa/node_modules/@types/pkg0/package.json",
            "./d/da/daa/daaa/node_modules/@types/pkg0.d.ts",
            "./d/da/daa/daaa/node_modules/@types/pkg0/index.d.ts",
            "./d/da/daa/node_modules/pkg0/package.json",
            "./d/da/daa/node_modules/pkg0.ts",
            "./d/da/daa/node_modules/pkg0.tsx",
            "./d/da/daa/node_modules/pkg0.d.ts",
            "./d/da/daa/node_modules/pkg0/index.ts",
            "./d/da/daa/node_modules/pkg0/index.tsx",
            "./d/da/daa/node_modules/pkg0/index.d.ts",
            "./d/da/daa/node_modules/@types/pkg0/package.json",
            "./d/da/daa/node_modules/@types/pkg0.d.ts",
            "./d/da/daa/node_modules/@types/pkg0/index.d.ts",
            "./d/da/node_modules/pkg0/package.json",
            "./d/da/node_modules/pkg0.ts",
            "./d/da/node_modules/pkg0.tsx",
            "./d/da/node_modules/pkg0.d.ts",
            "./d/da/node_modules/pkg0/index.ts",
            "./d/da/node_modules/pkg0/index.tsx",
            "./d/da/node_modules/pkg0/index.d.ts",
            "./d/da/node_modules/@types/pkg0/package.json",
            "./d/da/node_modules/@types/pkg0.d.ts",
            "./d/da/node_modules/@types/pkg0/index.d.ts",
            "./d/node_modules/pkg0/package.json",
            "./d/node_modules/pkg0.ts",
            "./d/node_modules/pkg0.tsx",
            "./d/node_modules/pkg0.d.ts",
            "./d/node_modules/pkg0/index.ts",
            "./d/node_modules/pkg0/index.tsx",
            "./d/node_modules/pkg0/index.d.ts",
            "./d/node_modules/@types/pkg0/package.json",
            "./d/node_modules/@types/pkg0.d.ts",
            "./d/node_modules/@types/pkg0/index.d.ts",
            "./e/ea/node_modules/pkg0/package.json",
            "./e/ea/node_modules/pkg0.ts",
            "./e/ea/node_modules/pkg0.tsx",
            "./e/ea/node_modules/pkg0.d.ts",
            "./e/ea/node_modules/pkg0/index.ts",
            "./e/ea/node_modules/pkg0/index.tsx",
            "./e/ea/node_modules/pkg0/index.d.ts",
            "./e/ea/node_modules/@types/pkg0/package.json",
            "./e/ea/node_modules/@types/pkg0.d.ts",
            "./e/ea/node_modules/@types/pkg0/index.d.ts",
            "./e/node_modules/pkg0/package.json",
            "./e/node_modules/pkg0.ts",
            "./e/node_modules/pkg0.tsx",
            "./e/node_modules/pkg0.d.ts",
            "./e/node_modules/pkg0/index.ts",
            "./e/node_modules/pkg0/index.tsx",
            "./e/node_modules/pkg0/index.d.ts",
            "./e/node_modules/@types/pkg0/package.json",
            "./e/node_modules/@types/pkg0.d.ts",
            "./e/node_modules/@types/pkg0/index.d.ts",
            "./e/ea/eaa/node_modules/pkg0/package.json",
            "./e/ea/eaa/node_modules/pkg0.ts",
            "./e/ea/eaa/node_modules/pkg0.tsx",
            "./e/ea/eaa/node_modules/pkg0.d.ts",
            "./e/ea/eaa/node_modules/pkg0/index.ts",
            "./e/ea/eaa/node_modules/pkg0/index.tsx",
            "./e/ea/eaa/node_modules/pkg0/index.d.ts",
            "./e/ea/eaa/node_modules/@types/pkg0/package.json",
            "./e/ea/eaa/node_modules/@types/pkg0.d.ts",
            "./e/ea/eaa/node_modules/@types/pkg0/index.d.ts",
            "./e/ea/eaa/eaaa/node_modules/pkg0/package.json",
            "./e/ea/eaa/eaaa/node_modules/pkg0.ts",
            "./e/ea/eaa/eaaa/node_modules/pkg0.tsx",
            "./e/ea/eaa/eaaa/node_modules/pkg0.d.ts",
            "./e/ea/eaa/eaaa/node_modules/pkg0/index.ts",
            "./e/ea/eaa/eaaa/node_modules/pkg0/index.tsx",
            "./e/ea/eaa/eaaa/node_modules/pkg0/index.d.ts",
            "./e/ea/eaa/eaaa/node_modules/@types/pkg0/package.json",
            "./e/ea/eaa/eaaa/node_modules/@types/pkg0.d.ts",
            "./e/ea/eaa/eaaa/node_modules/@types/pkg0/index.d.ts"
          ]
        }
      ],
      "names": [
        "pkg0"
      ],
      "resolutionEntries": [
        [
          "pkg0",
          {
            "resolvedModule": {
              "resolvedFileName": "./node_modules/pkg0/index.d.ts",
              "isExternalLibraryImport": true
            },
            "failedLookupLocations": [
              "./node_modules/pkg0/package.json",
              "./node_modules/pkg0.ts",
              "./node_modules/pkg0.tsx",
              "./node_modules/pkg0.d.ts",
              "./node_modules/pkg0/index.ts",
              "./node_modules/pkg0/index.tsx",
              "./a/node_modules/pkg0/package.json",
              "./a/node_modules/pkg0.ts",
              "./a/node_modules/pkg0.tsx",
              "./a/node_modules/pkg0.d.ts",
              "./a/node_modules/pkg0/index.ts",
              "./a/node_modules/pkg0/index.tsx",
              "./a/node_modules/pkg0/index.d.ts",
              "./a/node_modules/@types/pkg0/package.json",
              "./a/node_modules/@types/pkg0.d.ts",
              "./a/node_modules/@types/pkg0/index.d.ts",
              "./b/ba/node_modules/pkg0/package.json",
              "./b/ba/node_modules/pkg0.ts",
              "./b/ba/node_modules/pkg0.tsx",
              "./b/ba/node_modules/pkg0.d.ts",
              "./b/ba/node_modules/pkg0/index.ts",
              "./b/ba/node_modules/pkg0/index.tsx",
              "./b/ba/node_modules/pkg0/index.d.ts",
              "./b/ba/node_modules/@types/pkg0/package.json",
              "./b/ba/node_modules/@types/pkg0.d.ts",
              "./b/ba/node_modules/@types/pkg0/index.d.ts",
              "./b/node_modules/pkg0/package.json",
              "./b/node_modules/pkg0.ts",
              "./b/node_modules/pkg0.tsx",
              "./b/node_modules/pkg0.d.ts",
              "./b/node_modules/pkg0/index.ts",
              "./b/node_modules/pkg0/index.tsx",
              "./b/node_modules/pkg0/index.d.ts",
              "./b/node_modules/@types/pkg0/package.json",
              "./b/node_modules/@types/pkg0.d.ts",
              "./b/node_modules/@types/pkg0/index.d.ts",
              "./c/ca/node_modules/pkg0/package.json",
              "./c/ca/node_modules/pkg0.ts",
              "./c/ca/node_modules/pkg0.tsx",
              "./c/ca/node_modules/pkg0.d.ts",
              "./c/ca/node_modules/pkg0/index.ts",
              "./c/ca/node_modules/pkg0/index.tsx",
              "./c/ca/node_modules/pkg0/index.d.ts",
              "./c/ca/node_modules/@types/pkg0/package.json",
              "./c/ca/node_modules/@types/pkg0.d.ts",
              "./c/ca/node_modules/@types/pkg0/index.d.ts",
              "./c/node_modules/pkg0/package.json",
              "./c/node_modules/pkg0.ts",
              "./c/node_modules/pkg0.tsx",
              "./c/node_modules/pkg0.d.ts",
              "./c/node_modules/pkg0/index.ts",
              "./c/node_modules/pkg0/index.tsx",
              "./c/node_modules/pkg0/index.d.ts",
              "./c/node_modules/@types/pkg0/package.json",
              "./c/node_modules/@types/pkg0.d.ts",
              "./c/node_modules/@types/pkg0/index.d.ts",
              "./c/ca/caa/caaa/node_modules/pkg0/package.json",
              "./c/ca/caa/caaa/node_modules/pkg0.ts",
              "./c/ca/caa/caaa/node_modules/pkg0.tsx",
              "./c/ca/caa/caaa/node_modules/pkg0.d.ts",
              "./c/ca/caa/caaa/node_modules/pkg0/index.ts",
              "./c/ca/caa/caaa/node_modules/pkg0/index.tsx",
              "./c/ca/caa/caaa/node_modules/pkg0/index.d.ts",
              "./c/ca/caa/caaa/node_modules/@types/pkg0/package.json",
              "./c/ca/caa/caaa/node_modules/@types/pkg0.d.ts",
              "./c/ca/caa/caaa/node_modules/@types/pkg0/index.d.ts",
              "./c/ca/caa/node_modules/pkg0/package.json",
              "./c/ca/caa/node_modules/pkg0.ts",
              "./c/ca/caa/node_modules/pkg0.tsx",
              "./c/ca/caa/node_modules/pkg0.d.ts",
              "./c/ca/caa/node_modules/pkg0/index.ts",
              "./c/ca/caa/node_modules/pkg0/index.tsx",
              "./c/ca/caa/node_modules/pkg0/index.d.ts",
              "./c/ca/caa/node_modules/@types/pkg0/package.json",
              "./c/ca/caa/node_modules/@types/pkg0.d.ts",
              "./c/ca/caa/node_modules/@types/pkg0/index.d.ts",
              "./c/cb/node_modules/pkg0/package.json",
              "./c/cb/node_modules/pkg0.ts",
              "./c/cb/node_modules/pkg0.tsx",
              "./c/cb/node_modules/pkg0.d.ts",
              "./c/cb/node_modules/pkg0/index.ts",
              "./c/cb/node_modules/pkg0/index.tsx",
              "./c/cb/node_modules/pkg0/index.d.ts",
              "./c/cb/node_modules/@types/pkg0/package.json",
              "./c/cb/node_modules/@types/pkg0.d.ts",
              "./c/cb/node_modules/@types/pkg0/index.d.ts",
              "./d/da/daa/daaa/node_modules/pkg0/package.json",
              "./d/da/daa/daaa/node_modules/pkg0.ts",
              "./d/da/daa/daaa/node_modules/pkg0.tsx",
              "./d/da/daa/daaa/node_modules/pkg0.d.ts",
              "./d/da/daa/daaa/node_modules/pkg0/index.ts",
              "./d/da/daa/daaa/node_modules/pkg0/index.tsx",
              "./d/da/daa/daaa/node_modules/pkg0/index.d.ts",
              "./d/da/daa/daaa/node_modules/@types/pkg0/package.json",
              "./d/da/daa/daaa/node_modules/@types/pkg0.d.ts",
              "./d/da/daa/daaa/node_modules/@types/pkg0/index.d.ts",
              "./d/da/daa/node_modules/pkg0/package.json",
              "./d/da/daa/node_modules/pkg0.ts",
              "./d/da/daa/node_modules/pkg0.tsx",
              "./d/da/daa/node_modules/pkg0.d.ts",
              "./d/da/daa/node_modules/pkg0/index.ts",
              "./d/da/daa/node_modules/pkg0/index.tsx",
              "./d/da/daa/node_modules/pkg0/index.d.ts",
              "./d/da/daa/node_modules/@types/pkg0/package.json",
              "./d/da/daa/node_modules/@types/pkg0.d.ts",
              "./d/da/daa/node_modules/@types/pkg0/index.d.ts",
              "./d/da/node_modules/pkg0/package.json",
              "./d/da/node_modules/pkg0.ts",
              "./d/da/node_modules/pkg0.tsx",
              "./d/da/node_modules/pkg0.d.ts",
              "./d/da/node_modules/pkg0/index.ts",
              "./d/da/node_modules/pkg0/index.tsx",
              "./d/da/node_modules/pkg0/index.d.ts",
              "./d/da/node_modules/@types/pkg0/package.json",
              "./d/da/node_modules/@types/pkg0.d.ts",
              "./d/da/node_modules/@types/pkg0/index.d.ts",
              "./d/node_modules/pkg0/package.json",
              "./d/node_modules/pkg0.ts",
              "./d/node_modules/pkg0.tsx",
              "./d/node_modules/pkg0.d.ts",
              "./d/node_modules/pkg0/index.ts",
              "./d/node_modules/pkg0/index.tsx",
              "./d/node_modules/pkg0/index.d.ts",
              "./d/node_modules/@types/pkg0/package.json",
              "./d/node_modules/@types/pkg0.d.ts",
              "./d/node_modules/@types/pkg0/index.d.ts",
              "./e/ea/node_modules/pkg0/package.json",
              "./e/ea/node_modules/pkg0.ts",
              "./e/ea/node_modules/pkg0.tsx",
              "./e/ea/node_modules/pkg0.d.ts",
              "./e/ea/node_modules/pkg0/index.ts",
              "./e/ea/node_modules/pkg0/index.tsx",
              "./e/ea/node_modules/pkg0/index.d.ts",
              "./e/ea/node_modules/@types/pkg0/package.json",
              "./e/ea/node_modules/@types/pkg0.d.ts",
              "./e/ea/node_modules/@types/pkg0/index.d.ts",
              "./e/node_modules/pkg0/package.json",
              "./e/node_modules/pkg0.ts",
              "./e/node_modules/pkg0.tsx",
              "./e/node_modules/pkg0.d.ts",
              "./e/node_modules/pkg0/index.ts",
              "./e/node_modules/pkg0/index.tsx",
              "./e/node_modules/pkg0/index.d.ts",
              "./e/node_modules/@types/pkg0/package.json",
              "./e/node_modules/@types/pkg0.d.ts",
              "./e/node_modules/@types/pkg0/index.d.ts",
              "./e/ea/eaa/node_modules/pkg0/package.json",
              "./e/ea/eaa/node_modules/pkg0.ts",
              "./e/ea/eaa/node_modules/pkg0.tsx",
              "./e/ea/eaa/node_modules/pkg0.d.ts",
              "./e/ea/eaa/node_modules/pkg0/index.ts",
              "./e/ea/eaa/node_modules/pkg0/index.tsx",
              "./e/ea/eaa/node_modules/pkg0/index.d.ts",
              "./e/ea/eaa/node_modules/@types/pkg0/package.json",
              "./e/ea/eaa/node_modules/@types/pkg0.d.ts",
              "./e/ea/eaa/node_modules/@types/pkg0/index.d.ts",
              "./e/ea/eaa/eaaa/node_modules/pkg0/package.json",
              "./e/ea/eaa/eaaa/node_modules/pkg0.ts",
              "./e/ea/eaa/eaaa/node_modules/pkg0.tsx",
              "./e/ea/eaa/eaaa/node_modules/pkg0.d.ts",
              "./e/ea/eaa/eaaa/node_modules/pkg0/index.ts",
              "./e/ea/eaa/eaaa/node_modules/pkg0/index.tsx",
              "./e/ea/eaa/eaaa/node_modules/pkg0/index.d.ts",
              "./e/ea/eaa/eaaa/node_modules/@types/pkg0/package.json",
              "./e/ea/eaa/eaaa/node_modules/@types/pkg0.d.ts",
              "./e/ea/eaa/eaaa/node_modules/@types/pkg0/index.d.ts"
            ]
          }
        ]
      ],
      "modules": [
        [
          "./a",
          [
            [
              "pkg0",
              {
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                },
                "failedLookupLocations": [
                  "./node_modules/pkg0/package.json",
                  "./node_modules/pkg0.ts",
                  "./node_modules/pkg0.tsx",
                  "./node_modules/pkg0.d.ts",
                  "./node_modules/pkg0/index.ts",
                  "./node_modules/pkg0/index.tsx",
                  "./a/node_modules/pkg0/package.json",
                  "./a/node_modules/pkg0.ts",
                  "./a/node_modules/pkg0.tsx",
                  "./a/node_modules/pkg0.d.ts",
                  "./a/node_modules/pkg0/index.ts",
                  "./a/node_modules/pkg0/index.tsx",
                  "./a/node_modules/pkg0/index.d.ts",
                  "./a/node_modules/@types/pkg0/package.json",
                  "./a/node_modules/@types/pkg0.d.ts",
                  "./a/node_modules/@types/pkg0/index.d.ts",
                  "./b/ba/node_modules/pkg0/package.json",
                  "./b/ba/node_modules/pkg0.ts",
                  "./b/ba/node_modules/pkg0.tsx",
                  "./b/ba/node_modules/pkg0.d.ts",
                  "./b/ba/node_modules/pkg0/index.ts",
                  "./b/ba/node_modules/pkg0/index.tsx",
                  "./b/ba/node_modules/pkg0/index.d.ts",
                  "./b/ba/node_modules/@types/pkg0/package.json",
                  "./b/ba/node_modules/@types/pkg0.d.ts",
                  "./b/ba/node_modules/@types/pkg0/index.d.ts",
                  "./b/node_modules/pkg0/package.json",
                  "./b/node_modules/pkg0.ts",
                  "./b/node_modules/pkg0.tsx",
                  "./b/node_modules/pkg0.d.ts",
                  "./b/node_modules/pkg0/index.ts",
                  "./b/node_modules/pkg0/index.tsx",
                  "./b/node_modules/pkg0/index.d.ts",
                  "./b/node_modules/@types/pkg0/package.json",
                  "./b/node_modules/@types/pkg0.d.ts",
                  "./b/node_modules/@types/pkg0/index.d.ts",
                  "./c/ca/node_modules/pkg0/package.json",
                  "./c/ca/node_modules/pkg0.ts",
                  "./c/ca/node_modules/pkg0.tsx",
                  "./c/ca/node_modules/pkg0.d.ts",
                  "./c/ca/node_modules/pkg0/index.ts",
                  "./c/ca/node_modules/pkg0/index.tsx",
                  "./c/ca/node_modules/pkg0/index.d.ts",
                  "./c/ca/node_modules/@types/pkg0/package.json",
                  "./c/ca/node_modules/@types/pkg0.d.ts",
                  "./c/ca/node_modules/@types/pkg0/index.d.ts",
                  "./c/node_modules/pkg0/package.json",
                  "./c/node_modules/pkg0.ts",
                  "./c/node_modules/pkg0.tsx",
                  "./c/node_modules/pkg0.d.ts",
                  "./c/node_modules/pkg0/index.ts",
                  "./c/node_modules/pkg0/index.tsx",
                  "./c/node_modules/pkg0/index.d.ts",
                  "./c/node_modules/@types/pkg0/package.json",
                  "./c/node_modules/@types/pkg0.d.ts",
                  "./c/node_modules/@types/pkg0/index.d.ts",
                  "./c/ca/caa/caaa/node_modules/pkg0/package.json",
                  "./c/ca/caa/caaa/node_modules/pkg0.ts",
                  "./c/ca/caa/caaa/node_modules/pkg0.tsx",
                  "./c/ca/caa/caaa/node_modules/pkg0.d.ts",
                  "./c/ca/caa/caaa/node_modules/pkg0/index.ts",
                  "./c/ca/caa/caaa/node_modules/pkg0/index.tsx",
                  "./c/ca/caa/caaa/node_modules/pkg0/index.d.ts",
                  "./c/ca/caa/caaa/node_modules/@types/pkg0/package.json",
                  "./c/ca/caa/caaa/node_modules/@types/pkg0.d.ts",
                  "./c/ca/caa/caaa/node_modules/@types/pkg0/index.d.ts",
                  "./c/ca/caa/node_modules/pkg0/package.json",
                  "./c/ca/caa/node_modules/pkg0.ts",
                  "./c/ca/caa/node_modules/pkg0.tsx",
                  "./c/ca/caa/node_modules/pkg0.d.ts",
                  "./c/ca/caa/node_modules/pkg0/index.ts",
                  "./c/ca/caa/node_modules/pkg0/index.tsx",
                  "./c/ca/caa/node_modules/pkg0/index.d.ts",
                  "./c/ca/caa/node_modules/@types/pkg0/package.json",
                  "./c/ca/caa/node_modules/@types/pkg0.d.ts",
                  "./c/ca/caa/node_modules/@types/pkg0/index.d.ts",
                  "./c/cb/node_modules/pkg0/package.json",
                  "./c/cb/node_modules/pkg0.ts",
                  "./c/cb/node_modules/pkg0.tsx",
                  "./c/cb/node_modules/pkg0.d.ts",
                  "./c/cb/node_modules/pkg0/index.ts",
                  "./c/cb/node_modules/pkg0/index.tsx",
                  "./c/cb/node_modules/pkg0/index.d.ts",
                  "./c/cb/node_modules/@types/pkg0/package.json",
                  "./c/cb/node_modules/@types/pkg0.d.ts",
                  "./c/cb/node_modules/@types/pkg0/index.d.ts",
                  "./d/da/daa/daaa/node_modules/pkg0/package.json",
                  "./d/da/daa/daaa/node_modules/pkg0.ts",
                  "./d/da/daa/daaa/node_modules/pkg0.tsx",
                  "./d/da/daa/daaa/node_modules/pkg0.d.ts",
                  "./d/da/daa/daaa/node_modules/pkg0/index.ts",
                  "./d/da/daa/daaa/node_modules/pkg0/index.tsx",
                  "./d/da/daa/daaa/node_modules/pkg0/index.d.ts",
                  "./d/da/daa/daaa/node_modules/@types/pkg0/package.json",
                  "./d/da/daa/daaa/node_modules/@types/pkg0.d.ts",
                  "./d/da/daa/daaa/node_modules/@types/pkg0/index.d.ts",
                  "./d/da/daa/node_modules/pkg0/package.json",
                  "./d/da/daa/node_modules/pkg0.ts",
                  "./d/da/daa/node_modules/pkg0.tsx",
                  "./d/da/daa/node_modules/pkg0.d.ts",
                  "./d/da/daa/node_modules/pkg0/index.ts",
                  "./d/da/daa/node_modules/pkg0/index.tsx",
                  "./d/da/daa/node_modules/pkg0/index.d.ts",
                  "./d/da/daa/node_modules/@types/pkg0/package.json",
                  "./d/da/daa/node_modules/@types/pkg0.d.ts",
                  "./d/da/daa/node_modules/@types/pkg0/index.d.ts",
                  "./d/da/node_modules/pkg0/package.json",
                  "./d/da/node_modules/pkg0.ts",
                  "./d/da/node_modules/pkg0.tsx",
                  "./d/da/node_modules/pkg0.d.ts",
                  "./d/da/node_modules/pkg0/index.ts",
                  "./d/da/node_modules/pkg0/index.tsx",
                  "./d/da/node_modules/pkg0/index.d.ts",
                  "./d/da/node_modules/@types/pkg0/package.json",
                  "./d/da/node_modules/@types/pkg0.d.ts",
                  "./d/da/node_modules/@types/pkg0/index.d.ts",
                  "./d/node_modules/pkg0/package.json",
                  "./d/node_modules/pkg0.ts",
                  "./d/node_modules/pkg0.tsx",
                  "./d/node_modules/pkg0.d.ts",
                  "./d/node_modules/pkg0/index.ts",
                  "./d/node_modules/pkg0/index.tsx",
                  "./d/node_modules/pkg0/index.d.ts",
                  "./d/node_modules/@types/pkg0/package.json",
                  "./d/node_modules/@types/pkg0.d.ts",
                  "./d/node_modules/@types/pkg0/index.d.ts",
                  "./e/ea/node_modules/pkg0/package.json",
                  "./e/ea/node_modules/pkg0.ts",
                  "./e/ea/node_modules/pkg0.tsx",
                  "./e/ea/node_modules/pkg0.d.ts",
                  "./e/ea/node_modules/pkg0/index.ts",
                  "./e/ea/node_modules/pkg0/index.tsx",
                  "./e/ea/node_modules/pkg0/index.d.ts",
                  "./e/ea/node_modules/@types/pkg0/package.json",
                  "./e/ea/node_modules/@types/pkg0.d.ts",
                  "./e/ea/node_modules/@types/pkg0/index.d.ts",
                  "./e/node_modules/pkg0/package.json",
                  "./e/node_modules/pkg0.ts",
                  "./e/node_modules/pkg0.tsx",
                  "./e/node_modules/pkg0.d.ts",
                  "./e/node_modules/pkg0/index.ts",
                  "./e/node_modules/pkg0/index.tsx",
                  "./e/node_modules/pkg0/index.d.ts",
                  "./e/node_modules/@types/pkg0/package.json",
                  "./e/node_modules/@types/pkg0.d.ts",
                  "./e/node_modules/@types/pkg0/index.d.ts",
                  "./e/ea/eaa/node_modules/pkg0/package.json",
                  "./e/ea/eaa/node_modules/pkg0.ts",
                  "./e/ea/eaa/node_modules/pkg0.tsx",
                  "./e/ea/eaa/node_modules/pkg0.d.ts",
                  "./e/ea/eaa/node_modules/pkg0/index.ts",
                  "./e/ea/eaa/node_modules/pkg0/index.tsx",
                  "./e/ea/eaa/node_modules/pkg0/index.d.ts",
                  "./e/ea/eaa/node_modules/@types/pkg0/package.json",
                  "./e/ea/eaa/node_modules/@types/pkg0.d.ts",
                  "./e/ea/eaa/node_modules/@types/pkg0/index.d.ts",
                  "./e/ea/eaa/eaaa/node_modules/pkg0/package.json",
                  "./e/ea/eaa/eaaa/node_modules/pkg0.ts",
                  "./e/ea/eaa/eaaa/node_modules/pkg0.tsx",
                  "./e/ea/eaa/eaaa/node_modules/pkg0.d.ts",
                  "./e/ea/eaa/eaaa/node_modules/pkg0/index.ts",
                  "./e/ea/eaa/eaaa/node_modules/pkg0/index.tsx",
                  "./e/ea/eaa/eaaa/node_modules/pkg0/index.d.ts",
                  "./e/ea/eaa/eaaa/node_modules/@types/pkg0/package.json",
                  "./e/ea/eaa/eaaa/node_modules/@types/pkg0.d.ts",
                  "./e/ea/eaa/eaaa/node_modules/@types/pkg0/index.d.ts"
                ]
              }
            ]
          ]
        ],
        [
          "./b/ba",
          [
            [
              "pkg0",
              {
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                },
                "failedLookupLocations": [
                  "./node_modules/pkg0/package.json",
                  "./node_modules/pkg0.ts",
                  "./node_modules/pkg0.tsx",
                  "./node_modules/pkg0.d.ts",
                  "./node_modules/pkg0/index.ts",
                  "./node_modules/pkg0/index.tsx",
                  "./a/node_modules/pkg0/package.json",
                  "./a/node_modules/pkg0.ts",
                  "./a/node_modules/pkg0.tsx",
                  "./a/node_modules/pkg0.d.ts",
                  "./a/node_modules/pkg0/index.ts",
                  "./a/node_modules/pkg0/index.tsx",
                  "./a/node_modules/pkg0/index.d.ts",
                  "./a/node_modules/@types/pkg0/package.json",
                  "./a/node_modules/@types/pkg0.d.ts",
                  "./a/node_modules/@types/pkg0/index.d.ts",
                  "./b/ba/node_modules/pkg0/package.json",
                  "./b/ba/node_modules/pkg0.ts",
                  "./b/ba/node_modules/pkg0.tsx",
                  "./b/ba/node_modules/pkg0.d.ts",
                  "./b/ba/node_modules/pkg0/index.ts",
                  "./b/ba/node_modules/pkg0/index.tsx",
                  "./b/ba/node_modules/pkg0/index.d.ts",
                  "./b/ba/node_modules/@types/pkg0/package.json",
                  "./b/ba/node_modules/@types/pkg0.d.ts",
                  "./b/ba/node_modules/@types/pkg0/index.d.ts",
                  "./b/node_modules/pkg0/package.json",
                  "./b/node_modules/pkg0.ts",
                  "./b/node_modules/pkg0.tsx",
                  "./b/node_modules/pkg0.d.ts",
                  "./b/node_modules/pkg0/index.ts",
                  "./b/node_modules/pkg0/index.tsx",
                  "./b/node_modules/pkg0/index.d.ts",
                  "./b/node_modules/@types/pkg0/package.json",
                  "./b/node_modules/@types/pkg0.d.ts",
                  "./b/node_modules/@types/pkg0/index.d.ts",
                  "./c/ca/node_modules/pkg0/package.json",
                  "./c/ca/node_modules/pkg0.ts",
                  "./c/ca/node_modules/pkg0.tsx",
                  "./c/ca/node_modules/pkg0.d.ts",
                  "./c/ca/node_modules/pkg0/index.ts",
                  "./c/ca/node_modules/pkg0/index.tsx",
                  "./c/ca/node_modules/pkg0/index.d.ts",
                  "./c/ca/node_modules/@types/pkg0/package.json",
                  "./c/ca/node_modules/@types/pkg0.d.ts",
                  "./c/ca/node_modules/@types/pkg0/index.d.ts",
                  "./c/node_modules/pkg0/package.json",
                  "./c/node_modules/pkg0.ts",
                  "./c/node_modules/pkg0.tsx",
                  "./c/node_modules/pkg0.d.ts",
                  "./c/node_modules/pkg0/index.ts",
                  "./c/node_modules/pkg0/index.tsx",
                  "./c/node_modules/pkg0/index.d.ts",
                  "./c/node_modules/@types/pkg0/package.json",
                  "./c/node_modules/@types/pkg0.d.ts",
                  "./c/node_modules/@types/pkg0/index.d.ts",
                  "./c/ca/caa/caaa/node_modules/pkg0/package.json",
                  "./c/ca/caa/caaa/node_modules/pkg0.ts",
                  "./c/ca/caa/caaa/node_modules/pkg0.tsx",
                  "./c/ca/caa/caaa/node_modules/pkg0.d.ts",
                  "./c/ca/caa/caaa/node_modules/pkg0/index.ts",
                  "./c/ca/caa/caaa/node_modules/pkg0/index.tsx",
                  "./c/ca/caa/caaa/node_modules/pkg0/index.d.ts",
                  "./c/ca/caa/caaa/node_modules/@types/pkg0/package.json",
                  "./c/ca/caa/caaa/node_modules/@types/pkg0.d.ts",
                  "./c/ca/caa/caaa/node_modules/@types/pkg0/index.d.ts",
                  "./c/ca/caa/node_modules/pkg0/package.json",
                  "./c/ca/caa/node_modules/pkg0.ts",
                  "./c/ca/caa/node_modules/pkg0.tsx",
                  "./c/ca/caa/node_modules/pkg0.d.ts",
                  "./c/ca/caa/node_modules/pkg0/index.ts",
                  "./c/ca/caa/node_modules/pkg0/index.tsx",
                  "./c/ca/caa/node_modules/pkg0/index.d.ts",
                  "./c/ca/caa/node_modules/@types/pkg0/package.json",
                  "./c/ca/caa/node_modules/@types/pkg0.d.ts",
                  "./c/ca/caa/node_modules/@types/pkg0/index.d.ts",
                  "./c/cb/node_modules/pkg0/package.json",
                  "./c/cb/node_modules/pkg0.ts",
                  "./c/cb/node_modules/pkg0.tsx",
                  "./c/cb/node_modules/pkg0.d.ts",
                  "./c/cb/node_modules/pkg0/index.ts",
                  "./c/cb/node_modules/pkg0/index.tsx",
                  "./c/cb/node_modules/pkg0/index.d.ts",
                  "./c/cb/node_modules/@types/pkg0/package.json",
                  "./c/cb/node_modules/@types/pkg0.d.ts",
                  "./c/cb/node_modules/@types/pkg0/index.d.ts",
                  "./d/da/daa/daaa/node_modules/pkg0/package.json",
                  "./d/da/daa/daaa/node_modules/pkg0.ts",
                  "./d/da/daa/daaa/node_modules/pkg0.tsx",
                  "./d/da/daa/daaa/node_modules/pkg0.d.ts",
                  "./d/da/daa/daaa/node_modules/pkg0/index.ts",
                  "./d/da/daa/daaa/node_modules/pkg0/index.tsx",
                  "./d/da/daa/daaa/node_modules/pkg0/index.d.ts",
                  "./d/da/daa/daaa/node_modules/@types/pkg0/package.json",
                  "./d/da/daa/daaa/node_modules/@types/pkg0.d.ts",
                  "./d/da/daa/daaa/node_modules/@types/pkg0/index.d.ts",
                  "./d/da/daa/node_modules/pkg0/package.json",
                  "./d/da/daa/node_modules/pkg0.ts",
                  "./d/da/daa/node_modules/pkg0.tsx",
                  "./d/da/daa/node_modules/pkg0.d.ts",
                  "./d/da/daa/node_modules/pkg0/index.ts",
                  "./d/da/daa/node_modules/pkg0/index.tsx",
                  "./d/da/daa/node_modules/pkg0/index.d.ts",
                  "./d/da/daa/node_modules/@types/pkg0/package.json",
                  "./d/da/daa/node_modules/@types/pkg0.d.ts",
                  "./d/da/daa/node_modules/@types/pkg0/index.d.ts",
                  "./d/da/node_modules/pkg0/package.json",
                  "./d/da/node_modules/pkg0.ts",
                  "./d/da/node_modules/pkg0.tsx",
                  "./d/da/node_modules/pkg0.d.ts",
                  "./d/da/node_modules/pkg0/index.ts",
                  "./d/da/node_modules/pkg0/index.tsx",
                  "./d/da/node_modules/pkg0/index.d.ts",
                  "./d/da/node_modules/@types/pkg0/package.json",
                  "./d/da/node_modules/@types/pkg0.d.ts",
                  "./d/da/node_modules/@types/pkg0/index.d.ts",
                  "./d/node_modules/pkg0/package.json",
                  "./d/node_modules/pkg0.ts",
                  "./d/node_modules/pkg0.tsx",
                  "./d/node_modules/pkg0.d.ts",
                  "./d/node_modules/pkg0/index.ts",
                  "./d/node_modules/pkg0/index.tsx",
                  "./d/node_modules/pkg0/index.d.ts",
                  "./d/node_modules/@types/pkg0/package.json",
                  "./d/node_modules/@types/pkg0.d.ts",
                  "./d/node_modules/@types/pkg0/index.d.ts",
                  "./e/ea/node_modules/pkg0/package.json",
                  "./e/ea/node_modules/pkg0.ts",
                  "./e/ea/node_modules/pkg0.tsx",
                  "./e/ea/node_modules/pkg0.d.ts",
                  "./e/ea/node_modules/pkg0/index.ts",
                  "./e/ea/node_modules/pkg0/index.tsx",
                  "./e/ea/node_modules/pkg0/index.d.ts",
                  "./e/ea/node_modules/@types/pkg0/package.json",
                  "./e/ea/node_modules/@types/pkg0.d.ts",
                  "./e/ea/node_modules/@types/pkg0/index.d.ts",
                  "./e/node_modules/pkg0/package.json",
                  "./e/node_modules/pkg0.ts",
                  "./e/node_modules/pkg0.tsx",
                  "./e/node_modules/pkg0.d.ts",
                  "./e/node_modules/pkg0/index.ts",
                  "./e/node_modules/pkg0/index.tsx",
                  "./e/node_modules/pkg0/index.d.ts",
                  "./e/node_modules/@types/pkg0/package.json",
                  "./e/node_modules/@types/pkg0.d.ts",
                  "./e/node_modules/@types/pkg0/index.d.ts",
                  "./e/ea/eaa/node_modules/pkg0/package.json",
                  "./e/ea/eaa/node_modules/pkg0.ts",
                  "./e/ea/eaa/node_modules/pkg0.tsx",
                  "./e/ea/eaa/node_modules/pkg0.d.ts",
                  "./e/ea/eaa/node_modules/pkg0/index.ts",
                  "./e/ea/eaa/node_modules/pkg0/index.tsx",
                  "./e/ea/eaa/node_modules/pkg0/index.d.ts",
                  "./e/ea/eaa/node_modules/@types/pkg0/package.json",
                  "./e/ea/eaa/node_modules/@types/pkg0.d.ts",
                  "./e/ea/eaa/node_modules/@types/pkg0/index.d.ts",
                  "./e/ea/eaa/eaaa/node_modules/pkg0/package.json",
                  "./e/ea/eaa/eaaa/node_modules/pkg0.ts",
                  "./e/ea/eaa/eaaa/node_modules/pkg0.tsx",
                  "./e/ea/eaa/eaaa/node_modules/pkg0.d.ts",
                  "./e/ea/eaa/eaaa/node_modules/pkg0/index.ts",
                  "./e/ea/eaa/eaaa/node_modules/pkg0/index.tsx",
                  "./e/ea/eaa/eaaa/node_modules/pkg0/index.d.ts",
                  "./e/ea/eaa/eaaa/node_modules/@types/pkg0/package.json",
                  "./e/ea/eaa/eaaa/node_modules/@types/pkg0.d.ts",
                  "./e/ea/eaa/eaaa/node_modules/@types/pkg0/index.d.ts"
                ]
              }
            ]
          ]
        ],
        [
          "./c/ca/caa/caaa",
          [
            [
              "pkg0",
              {
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                },
                "failedLookupLocations": [
                  "./node_modules/pkg0/package.json",
                  "./node_modules/pkg0.ts",
                  "./node_modules/pkg0.tsx",
                  "./node_modules/pkg0.d.ts",
                  "./node_modules/pkg0/index.ts",
                  "./node_modules/pkg0/index.tsx",
                  "./a/node_modules/pkg0/package.json",
                  "./a/node_modules/pkg0.ts",
                  "./a/node_modules/pkg0.tsx",
                  "./a/node_modules/pkg0.d.ts",
                  "./a/node_modules/pkg0/index.ts",
                  "./a/node_modules/pkg0/index.tsx",
                  "./a/node_modules/pkg0/index.d.ts",
                  "./a/node_modules/@types/pkg0/package.json",
                  "./a/node_modules/@types/pkg0.d.ts",
                  "./a/node_modules/@types/pkg0/index.d.ts",
                  "./b/ba/node_modules/pkg0/package.json",
                  "./b/ba/node_modules/pkg0.ts",
                  "./b/ba/node_modules/pkg0.tsx",
                  "./b/ba/node_modules/pkg0.d.ts",
                  "./b/ba/node_modules/pkg0/index.ts",
                  "./b/ba/node_modules/pkg0/index.tsx",
                  "./b/ba/node_modules/pkg0/index.d.ts",
                  "./b/ba/node_modules/@types/pkg0/package.json",
                  "./b/ba/node_modules/@types/pkg0.d.ts",
                  "./b/ba/node_modules/@types/pkg0/index.d.ts",
                  "./b/node_modules/pkg0/package.json",
                  "./b/node_modules/pkg0.ts",
                  "./b/node_modules/pkg0.tsx",
                  "./b/node_modules/pkg0.d.ts",
                  "./b/node_modules/pkg0/index.ts",
                  "./b/node_modules/pkg0/index.tsx",
                  "./b/node_modules/pkg0/index.d.ts",
                  "./b/node_modules/@types/pkg0/package.json",
                  "./b/node_modules/@types/pkg0.d.ts",
                  "./b/node_modules/@types/pkg0/index.d.ts",
                  "./c/ca/node_modules/pkg0/package.json",
                  "./c/ca/node_modules/pkg0.ts",
                  "./c/ca/node_modules/pkg0.tsx",
                  "./c/ca/node_modules/pkg0.d.ts",
                  "./c/ca/node_modules/pkg0/index.ts",
                  "./c/ca/node_modules/pkg0/index.tsx",
                  "./c/ca/node_modules/pkg0/index.d.ts",
                  "./c/ca/node_modules/@types/pkg0/package.json",
                  "./c/ca/node_modules/@types/pkg0.d.ts",
                  "./c/ca/node_modules/@types/pkg0/index.d.ts",
                  "./c/node_modules/pkg0/package.json",
                  "./c/node_modules/pkg0.ts",
                  "./c/node_modules/pkg0.tsx",
                  "./c/node_modules/pkg0.d.ts",
                  "./c/node_modules/pkg0/index.ts",
                  "./c/node_modules/pkg0/index.tsx",
                  "./c/node_modules/pkg0/index.d.ts",
                  "./c/node_modules/@types/pkg0/package.json",
                  "./c/node_modules/@types/pkg0.d.ts",
                  "./c/node_modules/@types/pkg0/index.d.ts",
                  "./c/ca/caa/caaa/node_modules/pkg0/package.json",
                  "./c/ca/caa/caaa/node_modules/pkg0.ts",
                  "./c/ca/caa/caaa/node_modules/pkg0.tsx",
                  "./c/ca/caa/caaa/node_modules/pkg0.d.ts",
                  "./c/ca/caa/caaa/node_modules/pkg0/index.ts",
                  "./c/ca/caa/caaa/node_modules/pkg0/index.tsx",
                  "./c/ca/caa/caaa/node_modules/pkg0/index.d.ts",
                  "./c/ca/caa/caaa/node_modules/@types/pkg0/package.json",
                  "./c/ca/caa/caaa/node_modules/@types/pkg0.d.ts",
                  "./c/ca/caa/caaa/node_modules/@types/pkg0/index.d.ts",
                  "./c/ca/caa/node_modules/pkg0/package.json",
                  "./c/ca/caa/node_modules/pkg0.ts",
                  "./c/ca/caa/node_modules/pkg0.tsx",
                  "./c/ca/caa/node_modules/pkg0.d.ts",
                  "./c/ca/caa/node_modules/pkg0/index.ts",
                  "./c/ca/caa/node_modules/pkg0/index.tsx",
                  "./c/ca/caa/node_modules/pkg0/index.d.ts",
                  "./c/ca/caa/node_modules/@types/pkg0/package.json",
                  "./c/ca/caa/node_modules/@types/pkg0.d.ts",
                  "./c/ca/caa/node_modules/@types/pkg0/index.d.ts",
                  "./c/cb/node_modules/pkg0/package.json",
                  "./c/cb/node_modules/pkg0.ts",
                  "./c/cb/node_modules/pkg0.tsx",
                  "./c/cb/node_modules/pkg0.d.ts",
                  "./c/cb/node_modules/pkg0/index.ts",
                  "./c/cb/node_modules/pkg0/index.tsx",
                  "./c/cb/node_modules/pkg0/index.d.ts",
                  "./c/cb/node_modules/@types/pkg0/package.json",
                  "./c/cb/node_modules/@types/pkg0.d.ts",
                  "./c/cb/node_modules/@types/pkg0/index.d.ts",
                  "./d/da/daa/daaa/node_modules/pkg0/package.json",
                  "./d/da/daa/daaa/node_modules/pkg0.ts",
                  "./d/da/daa/daaa/node_modules/pkg0.tsx",
                  "./d/da/daa/daaa/node_modules/pkg0.d.ts",
                  "./d/da/daa/daaa/node_modules/pkg0/index.ts",
                  "./d/da/daa/daaa/node_modules/pkg0/index.tsx",
                  "./d/da/daa/daaa/node_modules/pkg0/index.d.ts",
                  "./d/da/daa/daaa/node_modules/@types/pkg0/package.json",
                  "./d/da/daa/daaa/node_modules/@types/pkg0.d.ts",
                  "./d/da/daa/daaa/node_modules/@types/pkg0/index.d.ts",
                  "./d/da/daa/node_modules/pkg0/package.json",
                  "./d/da/daa/node_modules/pkg0.ts",
                  "./d/da/daa/node_modules/pkg0.tsx",
                  "./d/da/daa/node_modules/pkg0.d.ts",
                  "./d/da/daa/node_modules/pkg0/index.ts",
                  "./d/da/daa/node_modules/pkg0/index.tsx",
                  "./d/da/daa/node_modules/pkg0/index.d.ts",
                  "./d/da/daa/node_modules/@types/pkg0/package.json",
                  "./d/da/daa/node_modules/@types/pkg0.d.ts",
                  "./d/da/daa/node_modules/@types/pkg0/index.d.ts",
                  "./d/da/node_modules/pkg0/package.json",
                  "./d/da/node_modules/pkg0.ts",
                  "./d/da/node_modules/pkg0.tsx",
                  "./d/da/node_modules/pkg0.d.ts",
                  "./d/da/node_modules/pkg0/index.ts",
                  "./d/da/node_modules/pkg0/index.tsx",
                  "./d/da/node_modules/pkg0/index.d.ts",
                  "./d/da/node_modules/@types/pkg0/package.json",
                  "./d/da/node_modules/@types/pkg0.d.ts",
                  "./d/da/node_modules/@types/pkg0/index.d.ts",
                  "./d/node_modules/pkg0/package.json",
                  "./d/node_modules/pkg0.ts",
                  "./d/node_modules/pkg0.tsx",
                  "./d/node_modules/pkg0.d.ts",
                  "./d/node_modules/pkg0/index.ts",
                  "./d/node_modules/pkg0/index.tsx",
                  "./d/node_modules/pkg0/index.d.ts",
                  "./d/node_modules/@types/pkg0/package.json",
                  "./d/node_modules/@types/pkg0.d.ts",
                  "./d/node_modules/@types/pkg0/index.d.ts",
                  "./e/ea/node_modules/pkg0/package.json",
                  "./e/ea/node_modules/pkg0.ts",
                  "./e/ea/node_modules/pkg0.tsx",
                  "./e/ea/node_modules/pkg0.d.ts",
                  "./e/ea/node_modules/pkg0/index.ts",
                  "./e/ea/node_modules/pkg0/index.tsx",
                  "./e/ea/node_modules/pkg0/index.d.ts",
                  "./e/ea/node_modules/@types/pkg0/package.json",
                  "./e/ea/node_modules/@types/pkg0.d.ts",
                  "./e/ea/node_modules/@types/pkg0/index.d.ts",
                  "./e/node_modules/pkg0/package.json",
                  "./e/node_modules/pkg0.ts",
                  "./e/node_modules/pkg0.tsx",
                  "./e/node_modules/pkg0.d.ts",
                  "./e/node_modules/pkg0/index.ts",
                  "./e/node_modules/pkg0/index.tsx",
                  "./e/node_modules/pkg0/index.d.ts",
                  "./e/node_modules/@types/pkg0/package.json",
                  "./e/node_modules/@types/pkg0.d.ts",
                  "./e/node_modules/@types/pkg0/index.d.ts",
                  "./e/ea/eaa/node_modules/pkg0/package.json",
                  "./e/ea/eaa/node_modules/pkg0.ts",
                  "./e/ea/eaa/node_modules/pkg0.tsx",
                  "./e/ea/eaa/node_modules/pkg0.d.ts",
                  "./e/ea/eaa/node_modules/pkg0/index.ts",
                  "./e/ea/eaa/node_modules/pkg0/index.tsx",
                  "./e/ea/eaa/node_modules/pkg0/index.d.ts",
                  "./e/ea/eaa/node_modules/@types/pkg0/package.json",
                  "./e/ea/eaa/node_modules/@types/pkg0.d.ts",
                  "./e/ea/eaa/node_modules/@types/pkg0/index.d.ts",
                  "./e/ea/eaa/eaaa/node_modules/pkg0/package.json",
                  "./e/ea/eaa/eaaa/node_modules/pkg0.ts",
                  "./e/ea/eaa/eaaa/node_modules/pkg0.tsx",
                  "./e/ea/eaa/eaaa/node_modules/pkg0.d.ts",
                  "./e/ea/eaa/eaaa/node_modules/pkg0/index.ts",
                  "./e/ea/eaa/eaaa/node_modules/pkg0/index.tsx",
                  "./e/ea/eaa/eaaa/node_modules/pkg0/index.d.ts",
                  "./e/ea/eaa/eaaa/node_modules/@types/pkg0/package.json",
                  "./e/ea/eaa/eaaa/node_modules/@types/pkg0.d.ts",
                  "./e/ea/eaa/eaaa/node_modules/@types/pkg0/index.d.ts"
                ]
              }
            ]
          ]
        ],
        [
          "./c/cb",
          [
            [
              "pkg0",
              {
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                },
                "failedLookupLocations": [
                  "./node_modules/pkg0/package.json",
                  "./node_modules/pkg0.ts",
                  "./node_modules/pkg0.tsx",
                  "./node_modules/pkg0.d.ts",
                  "./node_modules/pkg0/index.ts",
                  "./node_modules/pkg0/index.tsx",
                  "./a/node_modules/pkg0/package.json",
                  "./a/node_modules/pkg0.ts",
                  "./a/node_modules/pkg0.tsx",
                  "./a/node_modules/pkg0.d.ts",
                  "./a/node_modules/pkg0/index.ts",
                  "./a/node_modules/pkg0/index.tsx",
                  "./a/node_modules/pkg0/index.d.ts",
                  "./a/node_modules/@types/pkg0/package.json",
                  "./a/node_modules/@types/pkg0.d.ts",
                  "./a/node_modules/@types/pkg0/index.d.ts",
                  "./b/ba/node_modules/pkg0/package.json",
                  "./b/ba/node_modules/pkg0.ts",
                  "./b/ba/node_modules/pkg0.tsx",
                  "./b/ba/node_modules/pkg0.d.ts",
                  "./b/ba/node_modules/pkg0/index.ts",
                  "./b/ba/node_modules/pkg0/index.tsx",
                  "./b/ba/node_modules/pkg0/index.d.ts",
                  "./b/ba/node_modules/@types/pkg0/package.json",
                  "./b/ba/node_modules/@types/pkg0.d.ts",
                  "./b/ba/node_modules/@types/pkg0/index.d.ts",
                  "./b/node_modules/pkg0/package.json",
                  "./b/node_modules/pkg0.ts",
                  "./b/node_modules/pkg0.tsx",
                  "./b/node_modules/pkg0.d.ts",
                  "./b/node_modules/pkg0/index.ts",
                  "./b/node_modules/pkg0/index.tsx",
                  "./b/node_modules/pkg0/index.d.ts",
                  "./b/node_modules/@types/pkg0/package.json",
                  "./b/node_modules/@types/pkg0.d.ts",
                  "./b/node_modules/@types/pkg0/index.d.ts",
                  "./c/ca/node_modules/pkg0/package.json",
                  "./c/ca/node_modules/pkg0.ts",
                  "./c/ca/node_modules/pkg0.tsx",
                  "./c/ca/node_modules/pkg0.d.ts",
                  "./c/ca/node_modules/pkg0/index.ts",
                  "./c/ca/node_modules/pkg0/index.tsx",
                  "./c/ca/node_modules/pkg0/index.d.ts",
                  "./c/ca/node_modules/@types/pkg0/package.json",
                  "./c/ca/node_modules/@types/pkg0.d.ts",
                  "./c/ca/node_modules/@types/pkg0/index.d.ts",
                  "./c/node_modules/pkg0/package.json",
                  "./c/node_modules/pkg0.ts",
                  "./c/node_modules/pkg0.tsx",
                  "./c/node_modules/pkg0.d.ts",
                  "./c/node_modules/pkg0/index.ts",
                  "./c/node_modules/pkg0/index.tsx",
                  "./c/node_modules/pkg0/index.d.ts",
                  "./c/node_modules/@types/pkg0/package.json",
                  "./c/node_modules/@types/pkg0.d.ts",
                  "./c/node_modules/@types/pkg0/index.d.ts",
                  "./c/ca/caa/caaa/node_modules/pkg0/package.json",
                  "./c/ca/caa/caaa/node_modules/pkg0.ts",
                  "./c/ca/caa/caaa/node_modules/pkg0.tsx",
                  "./c/ca/caa/caaa/node_modules/pkg0.d.ts",
                  "./c/ca/caa/caaa/node_modules/pkg0/index.ts",
                  "./c/ca/caa/caaa/node_modules/pkg0/index.tsx",
                  "./c/ca/caa/caaa/node_modules/pkg0/index.d.ts",
                  "./c/ca/caa/caaa/node_modules/@types/pkg0/package.json",
                  "./c/ca/caa/caaa/node_modules/@types/pkg0.d.ts",
                  "./c/ca/caa/caaa/node_modules/@types/pkg0/index.d.ts",
                  "./c/ca/caa/node_modules/pkg0/package.json",
                  "./c/ca/caa/node_modules/pkg0.ts",
                  "./c/ca/caa/node_modules/pkg0.tsx",
                  "./c/ca/caa/node_modules/pkg0.d.ts",
                  "./c/ca/caa/node_modules/pkg0/index.ts",
                  "./c/ca/caa/node_modules/pkg0/index.tsx",
                  "./c/ca/caa/node_modules/pkg0/index.d.ts",
                  "./c/ca/caa/node_modules/@types/pkg0/package.json",
                  "./c/ca/caa/node_modules/@types/pkg0.d.ts",
                  "./c/ca/caa/node_modules/@types/pkg0/index.d.ts",
                  "./c/cb/node_modules/pkg0/package.json",
                  "./c/cb/node_modules/pkg0.ts",
                  "./c/cb/node_modules/pkg0.tsx",
                  "./c/cb/node_modules/pkg0.d.ts",
                  "./c/cb/node_modules/pkg0/index.ts",
                  "./c/cb/node_modules/pkg0/index.tsx",
                  "./c/cb/node_modules/pkg0/index.d.ts",
                  "./c/cb/node_modules/@types/pkg0/package.json",
                  "./c/cb/node_modules/@types/pkg0.d.ts",
                  "./c/cb/node_modules/@types/pkg0/index.d.ts",
                  "./d/da/daa/daaa/node_modules/pkg0/package.json",
                  "./d/da/daa/daaa/node_modules/pkg0.ts",
                  "./d/da/daa/daaa/node_modules/pkg0.tsx",
                  "./d/da/daa/daaa/node_modules/pkg0.d.ts",
                  "./d/da/daa/daaa/node_modules/pkg0/index.ts",
                  "./d/da/daa/daaa/node_modules/pkg0/index.tsx",
                  "./d/da/daa/daaa/node_modules/pkg0/index.d.ts",
                  "./d/da/daa/daaa/node_modules/@types/pkg0/package.json",
                  "./d/da/daa/daaa/node_modules/@types/pkg0.d.ts",
                  "./d/da/daa/daaa/node_modules/@types/pkg0/index.d.ts",
                  "./d/da/daa/node_modules/pkg0/package.json",
                  "./d/da/daa/node_modules/pkg0.ts",
                  "./d/da/daa/node_modules/pkg0.tsx",
                  "./d/da/daa/node_modules/pkg0.d.ts",
                  "./d/da/daa/node_modules/pkg0/index.ts",
                  "./d/da/daa/node_modules/pkg0/index.tsx",
                  "./d/da/daa/node_modules/pkg0/index.d.ts",
                  "./d/da/daa/node_modules/@types/pkg0/package.json",
                  "./d/da/daa/node_modules/@types/pkg0.d.ts",
                  "./d/da/daa/node_modules/@types/pkg0/index.d.ts",
                  "./d/da/node_modules/pkg0/package.json",
                  "./d/da/node_modules/pkg0.ts",
                  "./d/da/node_modules/pkg0.tsx",
                  "./d/da/node_modules/pkg0.d.ts",
                  "./d/da/node_modules/pkg0/index.ts",
                  "./d/da/node_modules/pkg0/index.tsx",
                  "./d/da/node_modules/pkg0/index.d.ts",
                  "./d/da/node_modules/@types/pkg0/package.json",
                  "./d/da/node_modules/@types/pkg0.d.ts",
                  "./d/da/node_modules/@types/pkg0/index.d.ts",
                  "./d/node_modules/pkg0/package.json",
                  "./d/node_modules/pkg0.ts",
                  "./d/node_modules/pkg0.tsx",
                  "./d/node_modules/pkg0.d.ts",
                  "./d/node_modules/pkg0/index.ts",
                  "./d/node_modules/pkg0/index.tsx",
                  "./d/node_modules/pkg0/index.d.ts",
                  "./d/node_modules/@types/pkg0/package.json",
                  "./d/node_modules/@types/pkg0.d.ts",
                  "./d/node_modules/@types/pkg0/index.d.ts",
                  "./e/ea/node_modules/pkg0/package.json",
                  "./e/ea/node_modules/pkg0.ts",
                  "./e/ea/node_modules/pkg0.tsx",
                  "./e/ea/node_modules/pkg0.d.ts",
                  "./e/ea/node_modules/pkg0/index.ts",
                  "./e/ea/node_modules/pkg0/index.tsx",
                  "./e/ea/node_modules/pkg0/index.d.ts",
                  "./e/ea/node_modules/@types/pkg0/package.json",
                  "./e/ea/node_modules/@types/pkg0.d.ts",
                  "./e/ea/node_modules/@types/pkg0/index.d.ts",
                  "./e/node_modules/pkg0/package.json",
                  "./e/node_modules/pkg0.ts",
                  "./e/node_modules/pkg0.tsx",
                  "./e/node_modules/pkg0.d.ts",
                  "./e/node_modules/pkg0/index.ts",
                  "./e/node_modules/pkg0/index.tsx",
                  "./e/node_modules/pkg0/index.d.ts",
                  "./e/node_modules/@types/pkg0/package.json",
                  "./e/node_modules/@types/pkg0.d.ts",
                  "./e/node_modules/@types/pkg0/index.d.ts",
                  "./e/ea/eaa/node_modules/pkg0/package.json",
                  "./e/ea/eaa/node_modules/pkg0.ts",
                  "./e/ea/eaa/node_modules/pkg0.tsx",
                  "./e/ea/eaa/node_modules/pkg0.d.ts",
                  "./e/ea/eaa/node_modules/pkg0/index.ts",
                  "./e/ea/eaa/node_modules/pkg0/index.tsx",
                  "./e/ea/eaa/node_modules/pkg0/index.d.ts",
                  "./e/ea/eaa/node_modules/@types/pkg0/package.json",
                  "./e/ea/eaa/node_modules/@types/pkg0.d.ts",
                  "./e/ea/eaa/node_modules/@types/pkg0/index.d.ts",
                  "./e/ea/eaa/eaaa/node_modules/pkg0/package.json",
                  "./e/ea/eaa/eaaa/node_modules/pkg0.ts",
                  "./e/ea/eaa/eaaa/node_modules/pkg0.tsx",
                  "./e/ea/eaa/eaaa/node_modules/pkg0.d.ts",
                  "./e/ea/eaa/eaaa/node_modules/pkg0/index.ts",
                  "./e/ea/eaa/eaaa/node_modules/pkg0/index.tsx",
                  "./e/ea/eaa/eaaa/node_modules/pkg0/index.d.ts",
                  "./e/ea/eaa/eaaa/node_modules/@types/pkg0/package.json",
                  "./e/ea/eaa/eaaa/node_modules/@types/pkg0.d.ts",
                  "./e/ea/eaa/eaaa/node_modules/@types/pkg0/index.d.ts"
                ]
              }
            ]
          ]
        ],
        [
          "./d/da/daa/daaa",
          [
            [
              "pkg0",
              {
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                },
                "failedLookupLocations": [
                  "./node_modules/pkg0/package.json",
                  "./node_modules/pkg0.ts",
                  "./node_modules/pkg0.tsx",
                  "./node_modules/pkg0.d.ts",
                  "./node_modules/pkg0/index.ts",
                  "./node_modules/pkg0/index.tsx",
                  "./a/node_modules/pkg0/package.json",
                  "./a/node_modules/pkg0.ts",
                  "./a/node_modules/pkg0.tsx",
                  "./a/node_modules/pkg0.d.ts",
                  "./a/node_modules/pkg0/index.ts",
                  "./a/node_modules/pkg0/index.tsx",
                  "./a/node_modules/pkg0/index.d.ts",
                  "./a/node_modules/@types/pkg0/package.json",
                  "./a/node_modules/@types/pkg0.d.ts",
                  "./a/node_modules/@types/pkg0/index.d.ts",
                  "./b/ba/node_modules/pkg0/package.json",
                  "./b/ba/node_modules/pkg0.ts",
                  "./b/ba/node_modules/pkg0.tsx",
                  "./b/ba/node_modules/pkg0.d.ts",
                  "./b/ba/node_modules/pkg0/index.ts",
                  "./b/ba/node_modules/pkg0/index.tsx",
                  "./b/ba/node_modules/pkg0/index.d.ts",
                  "./b/ba/node_modules/@types/pkg0/package.json",
                  "./b/ba/node_modules/@types/pkg0.d.ts",
                  "./b/ba/node_modules/@types/pkg0/index.d.ts",
                  "./b/node_modules/pkg0/package.json",
                  "./b/node_modules/pkg0.ts",
                  "./b/node_modules/pkg0.tsx",
                  "./b/node_modules/pkg0.d.ts",
                  "./b/node_modules/pkg0/index.ts",
                  "./b/node_modules/pkg0/index.tsx",
                  "./b/node_modules/pkg0/index.d.ts",
                  "./b/node_modules/@types/pkg0/package.json",
                  "./b/node_modules/@types/pkg0.d.ts",
                  "./b/node_modules/@types/pkg0/index.d.ts",
                  "./c/ca/node_modules/pkg0/package.json",
                  "./c/ca/node_modules/pkg0.ts",
                  "./c/ca/node_modules/pkg0.tsx",
                  "./c/ca/node_modules/pkg0.d.ts",
                  "./c/ca/node_modules/pkg0/index.ts",
                  "./c/ca/node_modules/pkg0/index.tsx",
                  "./c/ca/node_modules/pkg0/index.d.ts",
                  "./c/ca/node_modules/@types/pkg0/package.json",
                  "./c/ca/node_modules/@types/pkg0.d.ts",
                  "./c/ca/node_modules/@types/pkg0/index.d.ts",
                  "./c/node_modules/pkg0/package.json",
                  "./c/node_modules/pkg0.ts",
                  "./c/node_modules/pkg0.tsx",
                  "./c/node_modules/pkg0.d.ts",
                  "./c/node_modules/pkg0/index.ts",
                  "./c/node_modules/pkg0/index.tsx",
                  "./c/node_modules/pkg0/index.d.ts",
                  "./c/node_modules/@types/pkg0/package.json",
                  "./c/node_modules/@types/pkg0.d.ts",
                  "./c/node_modules/@types/pkg0/index.d.ts",
                  "./c/ca/caa/caaa/node_modules/pkg0/package.json",
                  "./c/ca/caa/caaa/node_modules/pkg0.ts",
                  "./c/ca/caa/caaa/node_modules/pkg0.tsx",
                  "./c/ca/caa/caaa/node_modules/pkg0.d.ts",
                  "./c/ca/caa/caaa/node_modules/pkg0/index.ts",
                  "./c/ca/caa/caaa/node_modules/pkg0/index.tsx",
                  "./c/ca/caa/caaa/node_modules/pkg0/index.d.ts",
                  "./c/ca/caa/caaa/node_modules/@types/pkg0/package.json",
                  "./c/ca/caa/caaa/node_modules/@types/pkg0.d.ts",
                  "./c/ca/caa/caaa/node_modules/@types/pkg0/index.d.ts",
                  "./c/ca/caa/node_modules/pkg0/package.json",
                  "./c/ca/caa/node_modules/pkg0.ts",
                  "./c/ca/caa/node_modules/pkg0.tsx",
                  "./c/ca/caa/node_modules/pkg0.d.ts",
                  "./c/ca/caa/node_modules/pkg0/index.ts",
                  "./c/ca/caa/node_modules/pkg0/index.tsx",
                  "./c/ca/caa/node_modules/pkg0/index.d.ts",
                  "./c/ca/caa/node_modules/@types/pkg0/package.json",
                  "./c/ca/caa/node_modules/@types/pkg0.d.ts",
                  "./c/ca/caa/node_modules/@types/pkg0/index.d.ts",
                  "./c/cb/node_modules/pkg0/package.json",
                  "./c/cb/node_modules/pkg0.ts",
                  "./c/cb/node_modules/pkg0.tsx",
                  "./c/cb/node_modules/pkg0.d.ts",
                  "./c/cb/node_modules/pkg0/index.ts",
                  "./c/cb/node_modules/pkg0/index.tsx",
                  "./c/cb/node_modules/pkg0/index.d.ts",
                  "./c/cb/node_modules/@types/pkg0/package.json",
                  "./c/cb/node_modules/@types/pkg0.d.ts",
                  "./c/cb/node_modules/@types/pkg0/index.d.ts",
                  "./d/da/daa/daaa/node_modules/pkg0/package.json",
                  "./d/da/daa/daaa/node_modules/pkg0.ts",
                  "./d/da/daa/daaa/node_modules/pkg0.tsx",
                  "./d/da/daa/daaa/node_modules/pkg0.d.ts",
                  "./d/da/daa/daaa/node_modules/pkg0/index.ts",
                  "./d/da/daa/daaa/node_modules/pkg0/index.tsx",
                  "./d/da/daa/daaa/node_modules/pkg0/index.d.ts",
                  "./d/da/daa/daaa/node_modules/@types/pkg0/package.json",
                  "./d/da/daa/daaa/node_modules/@types/pkg0.d.ts",
                  "./d/da/daa/daaa/node_modules/@types/pkg0/index.d.ts",
                  "./d/da/daa/node_modules/pkg0/package.json",
                  "./d/da/daa/node_modules/pkg0.ts",
                  "./d/da/daa/node_modules/pkg0.tsx",
                  "./d/da/daa/node_modules/pkg0.d.ts",
                  "./d/da/daa/node_modules/pkg0/index.ts",
                  "./d/da/daa/node_modules/pkg0/index.tsx",
                  "./d/da/daa/node_modules/pkg0/index.d.ts",
                  "./d/da/daa/node_modules/@types/pkg0/package.json",
                  "./d/da/daa/node_modules/@types/pkg0.d.ts",
                  "./d/da/daa/node_modules/@types/pkg0/index.d.ts",
                  "./d/da/node_modules/pkg0/package.json",
                  "./d/da/node_modules/pkg0.ts",
                  "./d/da/node_modules/pkg0.tsx",
                  "./d/da/node_modules/pkg0.d.ts",
                  "./d/da/node_modules/pkg0/index.ts",
                  "./d/da/node_modules/pkg0/index.tsx",
                  "./d/da/node_modules/pkg0/index.d.ts",
                  "./d/da/node_modules/@types/pkg0/package.json",
                  "./d/da/node_modules/@types/pkg0.d.ts",
                  "./d/da/node_modules/@types/pkg0/index.d.ts",
                  "./d/node_modules/pkg0/package.json",
                  "./d/node_modules/pkg0.ts",
                  "./d/node_modules/pkg0.tsx",
                  "./d/node_modules/pkg0.d.ts",
                  "./d/node_modules/pkg0/index.ts",
                  "./d/node_modules/pkg0/index.tsx",
                  "./d/node_modules/pkg0/index.d.ts",
                  "./d/node_modules/@types/pkg0/package.json",
                  "./d/node_modules/@types/pkg0.d.ts",
                  "./d/node_modules/@types/pkg0/index.d.ts",
                  "./e/ea/node_modules/pkg0/package.json",
                  "./e/ea/node_modules/pkg0.ts",
                  "./e/ea/node_modules/pkg0.tsx",
                  "./e/ea/node_modules/pkg0.d.ts",
                  "./e/ea/node_modules/pkg0/index.ts",
                  "./e/ea/node_modules/pkg0/index.tsx",
                  "./e/ea/node_modules/pkg0/index.d.ts",
                  "./e/ea/node_modules/@types/pkg0/package.json",
                  "./e/ea/node_modules/@types/pkg0.d.ts",
                  "./e/ea/node_modules/@types/pkg0/index.d.ts",
                  "./e/node_modules/pkg0/package.json",
                  "./e/node_modules/pkg0.ts",
                  "./e/node_modules/pkg0.tsx",
                  "./e/node_modules/pkg0.d.ts",
                  "./e/node_modules/pkg0/index.ts",
                  "./e/node_modules/pkg0/index.tsx",
                  "./e/node_modules/pkg0/index.d.ts",
                  "./e/node_modules/@types/pkg0/package.json",
                  "./e/node_modules/@types/pkg0.d.ts",
                  "./e/node_modules/@types/pkg0/index.d.ts",
                  "./e/ea/eaa/node_modules/pkg0/package.json",
                  "./e/ea/eaa/node_modules/pkg0.ts",
                  "./e/ea/eaa/node_modules/pkg0.tsx",
                  "./e/ea/eaa/node_modules/pkg0.d.ts",
                  "./e/ea/eaa/node_modules/pkg0/index.ts",
                  "./e/ea/eaa/node_modules/pkg0/index.tsx",
                  "./e/ea/eaa/node_modules/pkg0/index.d.ts",
                  "./e/ea/eaa/node_modules/@types/pkg0/package.json",
                  "./e/ea/eaa/node_modules/@types/pkg0.d.ts",
                  "./e/ea/eaa/node_modules/@types/pkg0/index.d.ts",
                  "./e/ea/eaa/eaaa/node_modules/pkg0/package.json",
                  "./e/ea/eaa/eaaa/node_modules/pkg0.ts",
                  "./e/ea/eaa/eaaa/node_modules/pkg0.tsx",
                  "./e/ea/eaa/eaaa/node_modules/pkg0.d.ts",
                  "./e/ea/eaa/eaaa/node_modules/pkg0/index.ts",
                  "./e/ea/eaa/eaaa/node_modules/pkg0/index.tsx",
                  "./e/ea/eaa/eaaa/node_modules/pkg0/index.d.ts",
                  "./e/ea/eaa/eaaa/node_modules/@types/pkg0/package.json",
                  "./e/ea/eaa/eaaa/node_modules/@types/pkg0.d.ts",
                  "./e/ea/eaa/eaaa/node_modules/@types/pkg0/index.d.ts"
                ]
              }
            ]
          ]
        ],
        [
          "./e/ea/eaa/eaaa",
          [
            [
              "pkg0",
              {
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                },
                "failedLookupLocations": [
                  "./node_modules/pkg0/package.json",
                  "./node_modules/pkg0.ts",
                  "./node_modules/pkg0.tsx",
                  "./node_modules/pkg0.d.ts",
                  "./node_modules/pkg0/index.ts",
                  "./node_modules/pkg0/index.tsx",
                  "./a/node_modules/pkg0/package.json",
                  "./a/node_modules/pkg0.ts",
                  "./a/node_modules/pkg0.tsx",
                  "./a/node_modules/pkg0.d.ts",
                  "./a/node_modules/pkg0/index.ts",
                  "./a/node_modules/pkg0/index.tsx",
                  "./a/node_modules/pkg0/index.d.ts",
                  "./a/node_modules/@types/pkg0/package.json",
                  "./a/node_modules/@types/pkg0.d.ts",
                  "./a/node_modules/@types/pkg0/index.d.ts",
                  "./b/ba/node_modules/pkg0/package.json",
                  "./b/ba/node_modules/pkg0.ts",
                  "./b/ba/node_modules/pkg0.tsx",
                  "./b/ba/node_modules/pkg0.d.ts",
                  "./b/ba/node_modules/pkg0/index.ts",
                  "./b/ba/node_modules/pkg0/index.tsx",
                  "./b/ba/node_modules/pkg0/index.d.ts",
                  "./b/ba/node_modules/@types/pkg0/package.json",
                  "./b/ba/node_modules/@types/pkg0.d.ts",
                  "./b/ba/node_modules/@types/pkg0/index.d.ts",
                  "./b/node_modules/pkg0/package.json",
                  "./b/node_modules/pkg0.ts",
                  "./b/node_modules/pkg0.tsx",
                  "./b/node_modules/pkg0.d.ts",
                  "./b/node_modules/pkg0/index.ts",
                  "./b/node_modules/pkg0/index.tsx",
                  "./b/node_modules/pkg0/index.d.ts",
                  "./b/node_modules/@types/pkg0/package.json",
                  "./b/node_modules/@types/pkg0.d.ts",
                  "./b/node_modules/@types/pkg0/index.d.ts",
                  "./c/ca/node_modules/pkg0/package.json",
                  "./c/ca/node_modules/pkg0.ts",
                  "./c/ca/node_modules/pkg0.tsx",
                  "./c/ca/node_modules/pkg0.d.ts",
                  "./c/ca/node_modules/pkg0/index.ts",
                  "./c/ca/node_modules/pkg0/index.tsx",
                  "./c/ca/node_modules/pkg0/index.d.ts",
                  "./c/ca/node_modules/@types/pkg0/package.json",
                  "./c/ca/node_modules/@types/pkg0.d.ts",
                  "./c/ca/node_modules/@types/pkg0/index.d.ts",
                  "./c/node_modules/pkg0/package.json",
                  "./c/node_modules/pkg0.ts",
                  "./c/node_modules/pkg0.tsx",
                  "./c/node_modules/pkg0.d.ts",
                  "./c/node_modules/pkg0/index.ts",
                  "./c/node_modules/pkg0/index.tsx",
                  "./c/node_modules/pkg0/index.d.ts",
                  "./c/node_modules/@types/pkg0/package.json",
                  "./c/node_modules/@types/pkg0.d.ts",
                  "./c/node_modules/@types/pkg0/index.d.ts",
                  "./c/ca/caa/caaa/node_modules/pkg0/package.json",
                  "./c/ca/caa/caaa/node_modules/pkg0.ts",
                  "./c/ca/caa/caaa/node_modules/pkg0.tsx",
                  "./c/ca/caa/caaa/node_modules/pkg0.d.ts",
                  "./c/ca/caa/caaa/node_modules/pkg0/index.ts",
                  "./c/ca/caa/caaa/node_modules/pkg0/index.tsx",
                  "./c/ca/caa/caaa/node_modules/pkg0/index.d.ts",
                  "./c/ca/caa/caaa/node_modules/@types/pkg0/package.json",
                  "./c/ca/caa/caaa/node_modules/@types/pkg0.d.ts",
                  "./c/ca/caa/caaa/node_modules/@types/pkg0/index.d.ts",
                  "./c/ca/caa/node_modules/pkg0/package.json",
                  "./c/ca/caa/node_modules/pkg0.ts",
                  "./c/ca/caa/node_modules/pkg0.tsx",
                  "./c/ca/caa/node_modules/pkg0.d.ts",
                  "./c/ca/caa/node_modules/pkg0/index.ts",
                  "./c/ca/caa/node_modules/pkg0/index.tsx",
                  "./c/ca/caa/node_modules/pkg0/index.d.ts",
                  "./c/ca/caa/node_modules/@types/pkg0/package.json",
                  "./c/ca/caa/node_modules/@types/pkg0.d.ts",
                  "./c/ca/caa/node_modules/@types/pkg0/index.d.ts",
                  "./c/cb/node_modules/pkg0/package.json",
                  "./c/cb/node_modules/pkg0.ts",
                  "./c/cb/node_modules/pkg0.tsx",
                  "./c/cb/node_modules/pkg0.d.ts",
                  "./c/cb/node_modules/pkg0/index.ts",
                  "./c/cb/node_modules/pkg0/index.tsx",
                  "./c/cb/node_modules/pkg0/index.d.ts",
                  "./c/cb/node_modules/@types/pkg0/package.json",
                  "./c/cb/node_modules/@types/pkg0.d.ts",
                  "./c/cb/node_modules/@types/pkg0/index.d.ts",
                  "./d/da/daa/daaa/node_modules/pkg0/package.json",
                  "./d/da/daa/daaa/node_modules/pkg0.ts",
                  "./d/da/daa/daaa/node_modules/pkg0.tsx",
                  "./d/da/daa/daaa/node_modules/pkg0.d.ts",
                  "./d/da/daa/daaa/node_modules/pkg0/index.ts",
                  "./d/da/daa/daaa/node_modules/pkg0/index.tsx",
                  "./d/da/daa/daaa/node_modules/pkg0/index.d.ts",
                  "./d/da/daa/daaa/node_modules/@types/pkg0/package.json",
                  "./d/da/daa/daaa/node_modules/@types/pkg0.d.ts",
                  "./d/da/daa/daaa/node_modules/@types/pkg0/index.d.ts",
                  "./d/da/daa/node_modules/pkg0/package.json",
                  "./d/da/daa/node_modules/pkg0.ts",
                  "./d/da/daa/node_modules/pkg0.tsx",
                  "./d/da/daa/node_modules/pkg0.d.ts",
                  "./d/da/daa/node_modules/pkg0/index.ts",
                  "./d/da/daa/node_modules/pkg0/index.tsx",
                  "./d/da/daa/node_modules/pkg0/index.d.ts",
                  "./d/da/daa/node_modules/@types/pkg0/package.json",
                  "./d/da/daa/node_modules/@types/pkg0.d.ts",
                  "./d/da/daa/node_modules/@types/pkg0/index.d.ts",
                  "./d/da/node_modules/pkg0/package.json",
                  "./d/da/node_modules/pkg0.ts",
                  "./d/da/node_modules/pkg0.tsx",
                  "./d/da/node_modules/pkg0.d.ts",
                  "./d/da/node_modules/pkg0/index.ts",
                  "./d/da/node_modules/pkg0/index.tsx",
                  "./d/da/node_modules/pkg0/index.d.ts",
                  "./d/da/node_modules/@types/pkg0/package.json",
                  "./d/da/node_modules/@types/pkg0.d.ts",
                  "./d/da/node_modules/@types/pkg0/index.d.ts",
                  "./d/node_modules/pkg0/package.json",
                  "./d/node_modules/pkg0.ts",
                  "./d/node_modules/pkg0.tsx",
                  "./d/node_modules/pkg0.d.ts",
                  "./d/node_modules/pkg0/index.ts",
                  "./d/node_modules/pkg0/index.tsx",
                  "./d/node_modules/pkg0/index.d.ts",
                  "./d/node_modules/@types/pkg0/package.json",
                  "./d/node_modules/@types/pkg0.d.ts",
                  "./d/node_modules/@types/pkg0/index.d.ts",
                  "./e/ea/node_modules/pkg0/package.json",
                  "./e/ea/node_modules/pkg0.ts",
                  "./e/ea/node_modules/pkg0.tsx",
                  "./e/ea/node_modules/pkg0.d.ts",
                  "./e/ea/node_modules/pkg0/index.ts",
                  "./e/ea/node_modules/pkg0/index.tsx",
                  "./e/ea/node_modules/pkg0/index.d.ts",
                  "./e/ea/node_modules/@types/pkg0/package.json",
                  "./e/ea/node_modules/@types/pkg0.d.ts",
                  "./e/ea/node_modules/@types/pkg0/index.d.ts",
                  "./e/node_modules/pkg0/package.json",
                  "./e/node_modules/pkg0.ts",
                  "./e/node_modules/pkg0.tsx",
                  "./e/node_modules/pkg0.d.ts",
                  "./e/node_modules/pkg0/index.ts",
                  "./e/node_modules/pkg0/index.tsx",
                  "./e/node_modules/pkg0/index.d.ts",
                  "./e/node_modules/@types/pkg0/package.json",
                  "./e/node_modules/@types/pkg0.d.ts",
                  "./e/node_modules/@types/pkg0/index.d.ts",
                  "./e/ea/eaa/node_modules/pkg0/package.json",
                  "./e/ea/eaa/node_modules/pkg0.ts",
                  "./e/ea/eaa/node_modules/pkg0.tsx",
                  "./e/ea/eaa/node_modules/pkg0.d.ts",
                  "./e/ea/eaa/node_modules/pkg0/index.ts",
                  "./e/ea/eaa/node_modules/pkg0/index.tsx",
                  "./e/ea/eaa/node_modules/pkg0/index.d.ts",
                  "./e/ea/eaa/node_modules/@types/pkg0/package.json",
                  "./e/ea/eaa/node_modules/@types/pkg0.d.ts",
                  "./e/ea/eaa/node_modules/@types/pkg0/index.d.ts",
                  "./e/ea/eaa/eaaa/node_modules/pkg0/package.json",
                  "./e/ea/eaa/eaaa/node_modules/pkg0.ts",
                  "./e/ea/eaa/eaaa/node_modules/pkg0.tsx",
                  "./e/ea/eaa/eaaa/node_modules/pkg0.d.ts",
                  "./e/ea/eaa/eaaa/node_modules/pkg0/index.ts",
                  "./e/ea/eaa/eaaa/node_modules/pkg0/index.tsx",
                  "./e/ea/eaa/eaaa/node_modules/pkg0/index.d.ts",
                  "./e/ea/eaa/eaaa/node_modules/@types/pkg0/package.json",
                  "./e/ea/eaa/eaaa/node_modules/@types/pkg0.d.ts",
                  "./e/ea/eaa/eaaa/node_modules/@types/pkg0/index.d.ts"
                ]
              }
            ]
          ]
        ]
      ]
    }
  },
  "version": "FakeTSVersion",
  "size": 10422
}


Change:: modify b/randomFileForImport by adding import

Input::
//// [/src/project/b/randomFileForImport.ts]
import type { ImportInterface0 } from "pkg0";
export const x = 10;


Output::
>> Screen clear
[[90m12:02:46 AM[0m] File change detected. Starting incremental compilation...

Reusing resolution of module 'pkg0' from '/src/project/fileWithImports.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/src/project/randomFileForImport.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/src/project/a/fileWithImports.ts' found in cache from location '/src/project/a', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/src/project/b/ba/fileWithImports.ts' found in cache from location '/src/project/b/ba', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/src/project/b/randomFileForImport.ts' found in cache from location '/src/project/b', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/src/project/c/ca/fileWithImports.ts' found in cache from location '/src/project/c/ca', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/src/project/c/ca/caa/caaa/fileWithImports.ts' found in cache from location '/src/project/c/ca/caa/caaa', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/src/project/c/cb/fileWithImports.ts' found in cache from location '/src/project/c/cb', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/daaa/fileWithImports.ts' found in cache from location '/src/project/d/da/daa/daaa', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/fileWithImports.ts' found in cache from location '/src/project/d/da/daa', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/src/project/d/da/fileWithImports.ts' found in cache from location '/src/project/d/da', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/src/project/e/ea/fileWithImports.ts' found in cache from location '/src/project/e/ea', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/fileWithImports.ts' found in cache from location '/src/project/e/ea/eaa', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/eaaa/fileWithImports.ts' found in cache from location '/src/project/e/ea/eaa/eaaa', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
../../a/lib/lib.d.ts
  Default library for target 'es3'
node_modules/pkg0/index.d.ts
  Imported via "pkg0" from file 'fileWithImports.ts'
  Imported via "pkg0" from file 'randomFileForImport.ts'
  Imported via "pkg0" from file 'a/fileWithImports.ts'
  Imported via "pkg0" from file 'b/ba/fileWithImports.ts'
  Imported via "pkg0" from file 'b/randomFileForImport.ts'
  Imported via "pkg0" from file 'c/ca/fileWithImports.ts'
  Imported via "pkg0" from file 'c/ca/caa/caaa/fileWithImports.ts'
  Imported via "pkg0" from file 'c/cb/fileWithImports.ts'
  Imported via "pkg0" from file 'd/da/daa/daaa/fileWithImports.ts'
  Imported via "pkg0" from file 'd/da/daa/fileWithImports.ts'
  Imported via "pkg0" from file 'd/da/fileWithImports.ts'
  Imported via "pkg0" from file 'e/ea/fileWithImports.ts'
  Imported via "pkg0" from file 'e/ea/eaa/fileWithImports.ts'
  Imported via "pkg0" from file 'e/ea/eaa/eaaa/fileWithImports.ts'
fileWithImports.ts
  Part of 'files' list in tsconfig.json
randomFileForImport.ts
  Part of 'files' list in tsconfig.json
a/fileWithImports.ts
  Part of 'files' list in tsconfig.json
b/ba/fileWithImports.ts
  Part of 'files' list in tsconfig.json
b/randomFileForImport.ts
  Part of 'files' list in tsconfig.json
c/ca/fileWithImports.ts
  Part of 'files' list in tsconfig.json
c/ca/caa/randomFileForImport.ts
  Part of 'files' list in tsconfig.json
c/ca/caa/caaa/fileWithImports.ts
  Part of 'files' list in tsconfig.json
c/cb/fileWithImports.ts
  Part of 'files' list in tsconfig.json
d/da/daa/daaa/fileWithImports.ts
  Part of 'files' list in tsconfig.json
d/da/daa/fileWithImports.ts
  Part of 'files' list in tsconfig.json
d/da/fileWithImports.ts
  Part of 'files' list in tsconfig.json
e/ea/fileWithImports.ts
  Part of 'files' list in tsconfig.json
e/ea/eaa/fileWithImports.ts
  Part of 'files' list in tsconfig.json
e/ea/eaa/eaaa/fileWithImports.ts
  Part of 'files' list in tsconfig.json
[[90m12:02:57 AM[0m] Found 0 errors. Watching for file changes.



Program root files: ["/src/project/fileWithImports.ts","/src/project/randomFileForImport.ts","/src/project/a/fileWithImports.ts","/src/project/b/ba/fileWithImports.ts","/src/project/b/randomFileForImport.ts","/src/project/c/ca/fileWithImports.ts","/src/project/c/ca/caa/randomFileForImport.ts","/src/project/c/ca/caa/caaa/fileWithImports.ts","/src/project/c/cb/fileWithImports.ts","/src/project/d/da/daa/daaa/fileWithImports.ts","/src/project/d/da/daa/fileWithImports.ts","/src/project/d/da/fileWithImports.ts","/src/project/e/ea/fileWithImports.ts","/src/project/e/ea/eaa/fileWithImports.ts","/src/project/e/ea/eaa/eaaa/fileWithImports.ts"]
Program options: {"composite":true,"cacheResolutions":true,"traceResolution":true,"watch":true,"explainFiles":true,"configFilePath":"/src/project/tsconfig.json"}
Program structureReused: SafeModuleCache
Program files::
/a/lib/lib.d.ts
/src/project/node_modules/pkg0/index.d.ts
/src/project/fileWithImports.ts
/src/project/randomFileForImport.ts
/src/project/a/fileWithImports.ts
/src/project/b/ba/fileWithImports.ts
/src/project/b/randomFileForImport.ts
/src/project/c/ca/fileWithImports.ts
/src/project/c/ca/caa/randomFileForImport.ts
/src/project/c/ca/caa/caaa/fileWithImports.ts
/src/project/c/cb/fileWithImports.ts
/src/project/d/da/daa/daaa/fileWithImports.ts
/src/project/d/da/daa/fileWithImports.ts
/src/project/d/da/fileWithImports.ts
/src/project/e/ea/fileWithImports.ts
/src/project/e/ea/eaa/fileWithImports.ts
/src/project/e/ea/eaa/eaaa/fileWithImports.ts

Semantic diagnostics in builder refreshed for::
/src/project/b/randomFileForImport.ts

Shape signatures in builder refreshed for::
/src/project/b/randomfileforimport.ts (computed .d.ts)

WatchedFiles::
/src/project/tsconfig.json:
  {"fileName":"/src/project/tsconfig.json","pollingInterval":250}
/src/project/filewithimports.ts:
  {"fileName":"/src/project/fileWithImports.ts","pollingInterval":250}
/src/project/randomfileforimport.ts:
  {"fileName":"/src/project/randomFileForImport.ts","pollingInterval":250}
/src/project/a/filewithimports.ts:
  {"fileName":"/src/project/a/fileWithImports.ts","pollingInterval":250}
/src/project/b/ba/filewithimports.ts:
  {"fileName":"/src/project/b/ba/fileWithImports.ts","pollingInterval":250}
/src/project/b/randomfileforimport.ts:
  {"fileName":"/src/project/b/randomFileForImport.ts","pollingInterval":250}
/src/project/c/ca/filewithimports.ts:
  {"fileName":"/src/project/c/ca/fileWithImports.ts","pollingInterval":250}
/src/project/c/ca/caa/randomfileforimport.ts:
  {"fileName":"/src/project/c/ca/caa/randomFileForImport.ts","pollingInterval":250}
/src/project/c/ca/caa/caaa/filewithimports.ts:
  {"fileName":"/src/project/c/ca/caa/caaa/fileWithImports.ts","pollingInterval":250}
/src/project/c/cb/filewithimports.ts:
  {"fileName":"/src/project/c/cb/fileWithImports.ts","pollingInterval":250}
/src/project/d/da/daa/daaa/filewithimports.ts:
  {"fileName":"/src/project/d/da/daa/daaa/fileWithImports.ts","pollingInterval":250}
/src/project/d/da/daa/filewithimports.ts:
  {"fileName":"/src/project/d/da/daa/fileWithImports.ts","pollingInterval":250}
/src/project/d/da/filewithimports.ts:
  {"fileName":"/src/project/d/da/fileWithImports.ts","pollingInterval":250}
/src/project/e/ea/filewithimports.ts:
  {"fileName":"/src/project/e/ea/fileWithImports.ts","pollingInterval":250}
/src/project/e/ea/eaa/filewithimports.ts:
  {"fileName":"/src/project/e/ea/eaa/fileWithImports.ts","pollingInterval":250}
/src/project/e/ea/eaa/eaaa/filewithimports.ts:
  {"fileName":"/src/project/e/ea/eaa/eaaa/fileWithImports.ts","pollingInterval":250}
/src/project/node_modules/pkg0/package.json:
  {"fileName":"/src/project/node_modules/pkg0/package.json","pollingInterval":250}

FsWatches::

FsWatchesRecursive::

exitCode:: ExitStatus.undefined

//// [/src/project/b/randomFileForImport.js] file written with same contents
//// [/src/project/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../a/lib/lib.d.ts","./node_modules/pkg0/index.d.ts","./filewithimports.ts","./randomfileforimport.ts","./a/filewithimports.ts","./b/ba/filewithimports.ts","./b/randomfileforimport.ts","./c/ca/filewithimports.ts","./c/ca/caa/randomfileforimport.ts","./c/ca/caa/caaa/filewithimports.ts","./c/cb/filewithimports.ts","./d/da/daa/daaa/filewithimports.ts","./d/da/daa/filewithimports.ts","./d/da/filewithimports.ts","./e/ea/filewithimports.ts","./e/ea/eaa/filewithimports.ts","./e/ea/eaa/eaaa/filewithimports.ts","./a","./b/ba","./c/ca/caa/caaa","./c/cb","./d/da/daa/daaa","./e/ea/eaa/eaaa","./node_modules/pkg0/package.json","./node_modules/pkg0.ts","./node_modules/pkg0.tsx","./node_modules/pkg0.d.ts","./node_modules/pkg0/index.ts","./node_modules/pkg0/index.tsx","./a/node_modules/pkg0/package.json","./a/node_modules/pkg0.ts","./a/node_modules/pkg0.tsx","./a/node_modules/pkg0.d.ts","./a/node_modules/pkg0/index.ts","./a/node_modules/pkg0/index.tsx","./a/node_modules/pkg0/index.d.ts","./a/node_modules/@types/pkg0/package.json","./a/node_modules/@types/pkg0.d.ts","./a/node_modules/@types/pkg0/index.d.ts","./b/ba/node_modules/pkg0/package.json","./b/ba/node_modules/pkg0.ts","./b/ba/node_modules/pkg0.tsx","./b/ba/node_modules/pkg0.d.ts","./b/ba/node_modules/pkg0/index.ts","./b/ba/node_modules/pkg0/index.tsx","./b/ba/node_modules/pkg0/index.d.ts","./b/ba/node_modules/@types/pkg0/package.json","./b/ba/node_modules/@types/pkg0.d.ts","./b/ba/node_modules/@types/pkg0/index.d.ts","./b/node_modules/pkg0/package.json","./b/node_modules/pkg0.ts","./b/node_modules/pkg0.tsx","./b/node_modules/pkg0.d.ts","./b/node_modules/pkg0/index.ts","./b/node_modules/pkg0/index.tsx","./b/node_modules/pkg0/index.d.ts","./b/node_modules/@types/pkg0/package.json","./b/node_modules/@types/pkg0.d.ts","./b/node_modules/@types/pkg0/index.d.ts","./c/ca/node_modules/pkg0/package.json","./c/ca/node_modules/pkg0.ts","./c/ca/node_modules/pkg0.tsx","./c/ca/node_modules/pkg0.d.ts","./c/ca/node_modules/pkg0/index.ts","./c/ca/node_modules/pkg0/index.tsx","./c/ca/node_modules/pkg0/index.d.ts","./c/ca/node_modules/@types/pkg0/package.json","./c/ca/node_modules/@types/pkg0.d.ts","./c/ca/node_modules/@types/pkg0/index.d.ts","./c/node_modules/pkg0/package.json","./c/node_modules/pkg0.ts","./c/node_modules/pkg0.tsx","./c/node_modules/pkg0.d.ts","./c/node_modules/pkg0/index.ts","./c/node_modules/pkg0/index.tsx","./c/node_modules/pkg0/index.d.ts","./c/node_modules/@types/pkg0/package.json","./c/node_modules/@types/pkg0.d.ts","./c/node_modules/@types/pkg0/index.d.ts","./c/ca/caa/caaa/node_modules/pkg0/package.json","./c/ca/caa/caaa/node_modules/pkg0.ts","./c/ca/caa/caaa/node_modules/pkg0.tsx","./c/ca/caa/caaa/node_modules/pkg0.d.ts","./c/ca/caa/caaa/node_modules/pkg0/index.ts","./c/ca/caa/caaa/node_modules/pkg0/index.tsx","./c/ca/caa/caaa/node_modules/pkg0/index.d.ts","./c/ca/caa/caaa/node_modules/@types/pkg0/package.json","./c/ca/caa/caaa/node_modules/@types/pkg0.d.ts","./c/ca/caa/caaa/node_modules/@types/pkg0/index.d.ts","./c/ca/caa/node_modules/pkg0/package.json","./c/ca/caa/node_modules/pkg0.ts","./c/ca/caa/node_modules/pkg0.tsx","./c/ca/caa/node_modules/pkg0.d.ts","./c/ca/caa/node_modules/pkg0/index.ts","./c/ca/caa/node_modules/pkg0/index.tsx","./c/ca/caa/node_modules/pkg0/index.d.ts","./c/ca/caa/node_modules/@types/pkg0/package.json","./c/ca/caa/node_modules/@types/pkg0.d.ts","./c/ca/caa/node_modules/@types/pkg0/index.d.ts","./c/cb/node_modules/pkg0/package.json","./c/cb/node_modules/pkg0.ts","./c/cb/node_modules/pkg0.tsx","./c/cb/node_modules/pkg0.d.ts","./c/cb/node_modules/pkg0/index.ts","./c/cb/node_modules/pkg0/index.tsx","./c/cb/node_modules/pkg0/index.d.ts","./c/cb/node_modules/@types/pkg0/package.json","./c/cb/node_modules/@types/pkg0.d.ts","./c/cb/node_modules/@types/pkg0/index.d.ts","./d/da/daa/daaa/node_modules/pkg0/package.json","./d/da/daa/daaa/node_modules/pkg0.ts","./d/da/daa/daaa/node_modules/pkg0.tsx","./d/da/daa/daaa/node_modules/pkg0.d.ts","./d/da/daa/daaa/node_modules/pkg0/index.ts","./d/da/daa/daaa/node_modules/pkg0/index.tsx","./d/da/daa/daaa/node_modules/pkg0/index.d.ts","./d/da/daa/daaa/node_modules/@types/pkg0/package.json","./d/da/daa/daaa/node_modules/@types/pkg0.d.ts","./d/da/daa/daaa/node_modules/@types/pkg0/index.d.ts","./d/da/daa/node_modules/pkg0/package.json","./d/da/daa/node_modules/pkg0.ts","./d/da/daa/node_modules/pkg0.tsx","./d/da/daa/node_modules/pkg0.d.ts","./d/da/daa/node_modules/pkg0/index.ts","./d/da/daa/node_modules/pkg0/index.tsx","./d/da/daa/node_modules/pkg0/index.d.ts","./d/da/daa/node_modules/@types/pkg0/package.json","./d/da/daa/node_modules/@types/pkg0.d.ts","./d/da/daa/node_modules/@types/pkg0/index.d.ts","./d/da/node_modules/pkg0/package.json","./d/da/node_modules/pkg0.ts","./d/da/node_modules/pkg0.tsx","./d/da/node_modules/pkg0.d.ts","./d/da/node_modules/pkg0/index.ts","./d/da/node_modules/pkg0/index.tsx","./d/da/node_modules/pkg0/index.d.ts","./d/da/node_modules/@types/pkg0/package.json","./d/da/node_modules/@types/pkg0.d.ts","./d/da/node_modules/@types/pkg0/index.d.ts","./d/node_modules/pkg0/package.json","./d/node_modules/pkg0.ts","./d/node_modules/pkg0.tsx","./d/node_modules/pkg0.d.ts","./d/node_modules/pkg0/index.ts","./d/node_modules/pkg0/index.tsx","./d/node_modules/pkg0/index.d.ts","./d/node_modules/@types/pkg0/package.json","./d/node_modules/@types/pkg0.d.ts","./d/node_modules/@types/pkg0/index.d.ts","./e/ea/node_modules/pkg0/package.json","./e/ea/node_modules/pkg0.ts","./e/ea/node_modules/pkg0.tsx","./e/ea/node_modules/pkg0.d.ts","./e/ea/node_modules/pkg0/index.ts","./e/ea/node_modules/pkg0/index.tsx","./e/ea/node_modules/pkg0/index.d.ts","./e/ea/node_modules/@types/pkg0/package.json","./e/ea/node_modules/@types/pkg0.d.ts","./e/ea/node_modules/@types/pkg0/index.d.ts","./e/node_modules/pkg0/package.json","./e/node_modules/pkg0.ts","./e/node_modules/pkg0.tsx","./e/node_modules/pkg0.d.ts","./e/node_modules/pkg0/index.ts","./e/node_modules/pkg0/index.tsx","./e/node_modules/pkg0/index.d.ts","./e/node_modules/@types/pkg0/package.json","./e/node_modules/@types/pkg0.d.ts","./e/node_modules/@types/pkg0/index.d.ts","./e/ea/eaa/node_modules/pkg0/package.json","./e/ea/eaa/node_modules/pkg0.ts","./e/ea/eaa/node_modules/pkg0.tsx","./e/ea/eaa/node_modules/pkg0.d.ts","./e/ea/eaa/node_modules/pkg0/index.ts","./e/ea/eaa/node_modules/pkg0/index.tsx","./e/ea/eaa/node_modules/pkg0/index.d.ts","./e/ea/eaa/node_modules/@types/pkg0/package.json","./e/ea/eaa/node_modules/@types/pkg0.d.ts","./e/ea/eaa/node_modules/@types/pkg0/index.d.ts","./e/ea/eaa/eaaa/node_modules/pkg0/package.json","./e/ea/eaa/eaaa/node_modules/pkg0.ts","./e/ea/eaa/eaaa/node_modules/pkg0.tsx","./e/ea/eaa/eaaa/node_modules/pkg0.d.ts","./e/ea/eaa/eaaa/node_modules/pkg0/index.ts","./e/ea/eaa/eaaa/node_modules/pkg0/index.tsx","./e/ea/eaa/eaaa/node_modules/pkg0/index.d.ts","./e/ea/eaa/eaaa/node_modules/@types/pkg0/package.json","./e/ea/eaa/eaaa/node_modules/@types/pkg0.d.ts","./e/ea/eaa/eaaa/node_modules/@types/pkg0/index.d.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},"769951468-export interface ImportInterface0 {}",{"version":"7372004325-import type { ImportInterface0 } from \"pkg0\";\n","signature":"-3531856636-export {};\n"},{"version":"10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;","signature":"-6821242887-export declare const x = 10;\n"},{"version":"7372004325-import type { ImportInterface0 } from \"pkg0\";\n","signature":"-3531856636-export {};\n"},{"version":"7372004325-import type { ImportInterface0 } from \"pkg0\";\n","signature":"-3531856636-export {};\n"},{"version":"10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;","signature":"-6821242887-export declare const x = 10;\n"},{"version":"7372004325-import type { ImportInterface0 } from \"pkg0\";\n","signature":"-3531856636-export {};\n"},{"version":"-10726455937-export const x = 10;","signature":"-6821242887-export declare const x = 10;\n"},{"version":"7372004325-import type { ImportInterface0 } from \"pkg0\";\n","signature":"-3531856636-export {};\n"},{"version":"7372004325-import type { ImportInterface0 } from \"pkg0\";\n","signature":"-3531856636-export {};\n"},{"version":"7372004325-import type { ImportInterface0 } from \"pkg0\";\n","signature":"-3531856636-export {};\n"},{"version":"7372004325-import type { ImportInterface0 } from \"pkg0\";\n","signature":"-3531856636-export {};\n"},{"version":"7372004325-import type { ImportInterface0 } from \"pkg0\";\n","signature":"-3531856636-export {};\n"},{"version":"7372004325-import type { ImportInterface0 } from \"pkg0\";\n","signature":"-3531856636-export {};\n"},{"version":"7372004325-import type { ImportInterface0 } from \"pkg0\";\n","signature":"-3531856636-export {};\n"},{"version":"7372004325-import type { ImportInterface0 } from \"pkg0\";\n","signature":"-3531856636-export {};\n"}],"options":{"cacheResolutions":true,"composite":true},"fileIdsList":[[2]],"referencedMap":[[5,1],[6,1],[7,1],[10,1],[8,1],[11,1],[12,1],[13,1],[14,1],[17,1],[16,1],[15,1],[3,1],[4,1]],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,5,6,7,10,9,8,11,12,13,14,17,16,15,3,2,4],"latestChangedDtsFile":"./e/ea/eaa/eaaa/fileWithImports.d.ts","cacheResolutions":{"resolutions":[{"resolvedModule":{"resolvedFileName":2,"isExternalLibraryImport":true},"failedLookupLocations":[24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,160,161,162,163,164,165,166,167,168,169,170,171,172,173,174,175,176,177,178,179,180,181,182,183,184,185,186,187,188,189]}],"names":["pkg0"],"resolutionEntries":[[1,1]],"modules":[[18,[1]],[19,[1]],[20,[1]],[21,[1]],[22,[1]],[23,[1]]]}},"version":"FakeTSVersion"}

//// [/src/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../a/lib/lib.d.ts",
      "./node_modules/pkg0/index.d.ts",
      "./filewithimports.ts",
      "./randomfileforimport.ts",
      "./a/filewithimports.ts",
      "./b/ba/filewithimports.ts",
      "./b/randomfileforimport.ts",
      "./c/ca/filewithimports.ts",
      "./c/ca/caa/randomfileforimport.ts",
      "./c/ca/caa/caaa/filewithimports.ts",
      "./c/cb/filewithimports.ts",
      "./d/da/daa/daaa/filewithimports.ts",
      "./d/da/daa/filewithimports.ts",
      "./d/da/filewithimports.ts",
      "./e/ea/filewithimports.ts",
      "./e/ea/eaa/filewithimports.ts",
      "./e/ea/eaa/eaaa/filewithimports.ts",
      "./a",
      "./b/ba",
      "./c/ca/caa/caaa",
      "./c/cb",
      "./d/da/daa/daaa",
      "./e/ea/eaa/eaaa",
      "./node_modules/pkg0/package.json",
      "./node_modules/pkg0.ts",
      "./node_modules/pkg0.tsx",
      "./node_modules/pkg0.d.ts",
      "./node_modules/pkg0/index.ts",
      "./node_modules/pkg0/index.tsx",
      "./a/node_modules/pkg0/package.json",
      "./a/node_modules/pkg0.ts",
      "./a/node_modules/pkg0.tsx",
      "./a/node_modules/pkg0.d.ts",
      "./a/node_modules/pkg0/index.ts",
      "./a/node_modules/pkg0/index.tsx",
      "./a/node_modules/pkg0/index.d.ts",
      "./a/node_modules/@types/pkg0/package.json",
      "./a/node_modules/@types/pkg0.d.ts",
      "./a/node_modules/@types/pkg0/index.d.ts",
      "./b/ba/node_modules/pkg0/package.json",
      "./b/ba/node_modules/pkg0.ts",
      "./b/ba/node_modules/pkg0.tsx",
      "./b/ba/node_modules/pkg0.d.ts",
      "./b/ba/node_modules/pkg0/index.ts",
      "./b/ba/node_modules/pkg0/index.tsx",
      "./b/ba/node_modules/pkg0/index.d.ts",
      "./b/ba/node_modules/@types/pkg0/package.json",
      "./b/ba/node_modules/@types/pkg0.d.ts",
      "./b/ba/node_modules/@types/pkg0/index.d.ts",
      "./b/node_modules/pkg0/package.json",
      "./b/node_modules/pkg0.ts",
      "./b/node_modules/pkg0.tsx",
      "./b/node_modules/pkg0.d.ts",
      "./b/node_modules/pkg0/index.ts",
      "./b/node_modules/pkg0/index.tsx",
      "./b/node_modules/pkg0/index.d.ts",
      "./b/node_modules/@types/pkg0/package.json",
      "./b/node_modules/@types/pkg0.d.ts",
      "./b/node_modules/@types/pkg0/index.d.ts",
      "./c/ca/node_modules/pkg0/package.json",
      "./c/ca/node_modules/pkg0.ts",
      "./c/ca/node_modules/pkg0.tsx",
      "./c/ca/node_modules/pkg0.d.ts",
      "./c/ca/node_modules/pkg0/index.ts",
      "./c/ca/node_modules/pkg0/index.tsx",
      "./c/ca/node_modules/pkg0/index.d.ts",
      "./c/ca/node_modules/@types/pkg0/package.json",
      "./c/ca/node_modules/@types/pkg0.d.ts",
      "./c/ca/node_modules/@types/pkg0/index.d.ts",
      "./c/node_modules/pkg0/package.json",
      "./c/node_modules/pkg0.ts",
      "./c/node_modules/pkg0.tsx",
      "./c/node_modules/pkg0.d.ts",
      "./c/node_modules/pkg0/index.ts",
      "./c/node_modules/pkg0/index.tsx",
      "./c/node_modules/pkg0/index.d.ts",
      "./c/node_modules/@types/pkg0/package.json",
      "./c/node_modules/@types/pkg0.d.ts",
      "./c/node_modules/@types/pkg0/index.d.ts",
      "./c/ca/caa/caaa/node_modules/pkg0/package.json",
      "./c/ca/caa/caaa/node_modules/pkg0.ts",
      "./c/ca/caa/caaa/node_modules/pkg0.tsx",
      "./c/ca/caa/caaa/node_modules/pkg0.d.ts",
      "./c/ca/caa/caaa/node_modules/pkg0/index.ts",
      "./c/ca/caa/caaa/node_modules/pkg0/index.tsx",
      "./c/ca/caa/caaa/node_modules/pkg0/index.d.ts",
      "./c/ca/caa/caaa/node_modules/@types/pkg0/package.json",
      "./c/ca/caa/caaa/node_modules/@types/pkg0.d.ts",
      "./c/ca/caa/caaa/node_modules/@types/pkg0/index.d.ts",
      "./c/ca/caa/node_modules/pkg0/package.json",
      "./c/ca/caa/node_modules/pkg0.ts",
      "./c/ca/caa/node_modules/pkg0.tsx",
      "./c/ca/caa/node_modules/pkg0.d.ts",
      "./c/ca/caa/node_modules/pkg0/index.ts",
      "./c/ca/caa/node_modules/pkg0/index.tsx",
      "./c/ca/caa/node_modules/pkg0/index.d.ts",
      "./c/ca/caa/node_modules/@types/pkg0/package.json",
      "./c/ca/caa/node_modules/@types/pkg0.d.ts",
      "./c/ca/caa/node_modules/@types/pkg0/index.d.ts",
      "./c/cb/node_modules/pkg0/package.json",
      "./c/cb/node_modules/pkg0.ts",
      "./c/cb/node_modules/pkg0.tsx",
      "./c/cb/node_modules/pkg0.d.ts",
      "./c/cb/node_modules/pkg0/index.ts",
      "./c/cb/node_modules/pkg0/index.tsx",
      "./c/cb/node_modules/pkg0/index.d.ts",
      "./c/cb/node_modules/@types/pkg0/package.json",
      "./c/cb/node_modules/@types/pkg0.d.ts",
      "./c/cb/node_modules/@types/pkg0/index.d.ts",
      "./d/da/daa/daaa/node_modules/pkg0/package.json",
      "./d/da/daa/daaa/node_modules/pkg0.ts",
      "./d/da/daa/daaa/node_modules/pkg0.tsx",
      "./d/da/daa/daaa/node_modules/pkg0.d.ts",
      "./d/da/daa/daaa/node_modules/pkg0/index.ts",
      "./d/da/daa/daaa/node_modules/pkg0/index.tsx",
      "./d/da/daa/daaa/node_modules/pkg0/index.d.ts",
      "./d/da/daa/daaa/node_modules/@types/pkg0/package.json",
      "./d/da/daa/daaa/node_modules/@types/pkg0.d.ts",
      "./d/da/daa/daaa/node_modules/@types/pkg0/index.d.ts",
      "./d/da/daa/node_modules/pkg0/package.json",
      "./d/da/daa/node_modules/pkg0.ts",
      "./d/da/daa/node_modules/pkg0.tsx",
      "./d/da/daa/node_modules/pkg0.d.ts",
      "./d/da/daa/node_modules/pkg0/index.ts",
      "./d/da/daa/node_modules/pkg0/index.tsx",
      "./d/da/daa/node_modules/pkg0/index.d.ts",
      "./d/da/daa/node_modules/@types/pkg0/package.json",
      "./d/da/daa/node_modules/@types/pkg0.d.ts",
      "./d/da/daa/node_modules/@types/pkg0/index.d.ts",
      "./d/da/node_modules/pkg0/package.json",
      "./d/da/node_modules/pkg0.ts",
      "./d/da/node_modules/pkg0.tsx",
      "./d/da/node_modules/pkg0.d.ts",
      "./d/da/node_modules/pkg0/index.ts",
      "./d/da/node_modules/pkg0/index.tsx",
      "./d/da/node_modules/pkg0/index.d.ts",
      "./d/da/node_modules/@types/pkg0/package.json",
      "./d/da/node_modules/@types/pkg0.d.ts",
      "./d/da/node_modules/@types/pkg0/index.d.ts",
      "./d/node_modules/pkg0/package.json",
      "./d/node_modules/pkg0.ts",
      "./d/node_modules/pkg0.tsx",
      "./d/node_modules/pkg0.d.ts",
      "./d/node_modules/pkg0/index.ts",
      "./d/node_modules/pkg0/index.tsx",
      "./d/node_modules/pkg0/index.d.ts",
      "./d/node_modules/@types/pkg0/package.json",
      "./d/node_modules/@types/pkg0.d.ts",
      "./d/node_modules/@types/pkg0/index.d.ts",
      "./e/ea/node_modules/pkg0/package.json",
      "./e/ea/node_modules/pkg0.ts",
      "./e/ea/node_modules/pkg0.tsx",
      "./e/ea/node_modules/pkg0.d.ts",
      "./e/ea/node_modules/pkg0/index.ts",
      "./e/ea/node_modules/pkg0/index.tsx",
      "./e/ea/node_modules/pkg0/index.d.ts",
      "./e/ea/node_modules/@types/pkg0/package.json",
      "./e/ea/node_modules/@types/pkg0.d.ts",
      "./e/ea/node_modules/@types/pkg0/index.d.ts",
      "./e/node_modules/pkg0/package.json",
      "./e/node_modules/pkg0.ts",
      "./e/node_modules/pkg0.tsx",
      "./e/node_modules/pkg0.d.ts",
      "./e/node_modules/pkg0/index.ts",
      "./e/node_modules/pkg0/index.tsx",
      "./e/node_modules/pkg0/index.d.ts",
      "./e/node_modules/@types/pkg0/package.json",
      "./e/node_modules/@types/pkg0.d.ts",
      "./e/node_modules/@types/pkg0/index.d.ts",
      "./e/ea/eaa/node_modules/pkg0/package.json",
      "./e/ea/eaa/node_modules/pkg0.ts",
      "./e/ea/eaa/node_modules/pkg0.tsx",
      "./e/ea/eaa/node_modules/pkg0.d.ts",
      "./e/ea/eaa/node_modules/pkg0/index.ts",
      "./e/ea/eaa/node_modules/pkg0/index.tsx",
      "./e/ea/eaa/node_modules/pkg0/index.d.ts",
      "./e/ea/eaa/node_modules/@types/pkg0/package.json",
      "./e/ea/eaa/node_modules/@types/pkg0.d.ts",
      "./e/ea/eaa/node_modules/@types/pkg0/index.d.ts",
      "./e/ea/eaa/eaaa/node_modules/pkg0/package.json",
      "./e/ea/eaa/eaaa/node_modules/pkg0.ts",
      "./e/ea/eaa/eaaa/node_modules/pkg0.tsx",
      "./e/ea/eaa/eaaa/node_modules/pkg0.d.ts",
      "./e/ea/eaa/eaaa/node_modules/pkg0/index.ts",
      "./e/ea/eaa/eaaa/node_modules/pkg0/index.tsx",
      "./e/ea/eaa/eaaa/node_modules/pkg0/index.d.ts",
      "./e/ea/eaa/eaaa/node_modules/@types/pkg0/package.json",
      "./e/ea/eaa/eaaa/node_modules/@types/pkg0.d.ts",
      "./e/ea/eaa/eaaa/node_modules/@types/pkg0/index.d.ts"
    ],
    "fileNamesList": [
      [
        "./node_modules/pkg0/index.d.ts"
      ]
    ],
    "fileInfos": {
      "../../a/lib/lib.d.ts": {
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true
      },
      "./node_modules/pkg0/index.d.ts": {
        "version": "769951468-export interface ImportInterface0 {}",
        "signature": "769951468-export interface ImportInterface0 {}"
      },
      "./filewithimports.ts": {
        "version": "7372004325-import type { ImportInterface0 } from \"pkg0\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./randomfileforimport.ts": {
        "version": "10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n"
      },
      "./a/filewithimports.ts": {
        "version": "7372004325-import type { ImportInterface0 } from \"pkg0\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./b/ba/filewithimports.ts": {
        "version": "7372004325-import type { ImportInterface0 } from \"pkg0\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./b/randomfileforimport.ts": {
        "version": "10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n"
      },
      "./c/ca/filewithimports.ts": {
        "version": "7372004325-import type { ImportInterface0 } from \"pkg0\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./c/ca/caa/randomfileforimport.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n"
      },
      "./c/ca/caa/caaa/filewithimports.ts": {
        "version": "7372004325-import type { ImportInterface0 } from \"pkg0\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./c/cb/filewithimports.ts": {
        "version": "7372004325-import type { ImportInterface0 } from \"pkg0\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./d/da/daa/daaa/filewithimports.ts": {
        "version": "7372004325-import type { ImportInterface0 } from \"pkg0\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./d/da/daa/filewithimports.ts": {
        "version": "7372004325-import type { ImportInterface0 } from \"pkg0\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./d/da/filewithimports.ts": {
        "version": "7372004325-import type { ImportInterface0 } from \"pkg0\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./e/ea/filewithimports.ts": {
        "version": "7372004325-import type { ImportInterface0 } from \"pkg0\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./e/ea/eaa/filewithimports.ts": {
        "version": "7372004325-import type { ImportInterface0 } from \"pkg0\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./e/ea/eaa/eaaa/filewithimports.ts": {
        "version": "7372004325-import type { ImportInterface0 } from \"pkg0\";\n",
        "signature": "-3531856636-export {};\n"
      }
    },
    "options": {
      "cacheResolutions": true,
      "composite": true
    },
    "referencedMap": {
      "./a/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./b/ba/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./b/randomfileforimport.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./c/ca/caa/caaa/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./c/ca/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./c/cb/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./d/da/daa/daaa/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./d/da/daa/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./d/da/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./e/ea/eaa/eaaa/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./e/ea/eaa/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./e/ea/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./randomfileforimport.ts": [
        "./node_modules/pkg0/index.d.ts"
      ]
    },
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../a/lib/lib.d.ts",
      "./a/filewithimports.ts",
      "./b/ba/filewithimports.ts",
      "./b/randomfileforimport.ts",
      "./c/ca/caa/caaa/filewithimports.ts",
      "./c/ca/caa/randomfileforimport.ts",
      "./c/ca/filewithimports.ts",
      "./c/cb/filewithimports.ts",
      "./d/da/daa/daaa/filewithimports.ts",
      "./d/da/daa/filewithimports.ts",
      "./d/da/filewithimports.ts",
      "./e/ea/eaa/eaaa/filewithimports.ts",
      "./e/ea/eaa/filewithimports.ts",
      "./e/ea/filewithimports.ts",
      "./filewithimports.ts",
      "./node_modules/pkg0/index.d.ts",
      "./randomfileforimport.ts"
    ],
    "latestChangedDtsFile": "./e/ea/eaa/eaaa/fileWithImports.d.ts",
    "cacheResolutions": {
      "resolutions": [
        {
          "resolvedModule": {
            "resolvedFileName": "./node_modules/pkg0/index.d.ts",
            "isExternalLibraryImport": true
          },
          "failedLookupLocations": [
            "./node_modules/pkg0/package.json",
            "./node_modules/pkg0.ts",
            "./node_modules/pkg0.tsx",
            "./node_modules/pkg0.d.ts",
            "./node_modules/pkg0/index.ts",
            "./node_modules/pkg0/index.tsx",
            "./a/node_modules/pkg0/package.json",
            "./a/node_modules/pkg0.ts",
            "./a/node_modules/pkg0.tsx",
            "./a/node_modules/pkg0.d.ts",
            "./a/node_modules/pkg0/index.ts",
            "./a/node_modules/pkg0/index.tsx",
            "./a/node_modules/pkg0/index.d.ts",
            "./a/node_modules/@types/pkg0/package.json",
            "./a/node_modules/@types/pkg0.d.ts",
            "./a/node_modules/@types/pkg0/index.d.ts",
            "./b/ba/node_modules/pkg0/package.json",
            "./b/ba/node_modules/pkg0.ts",
            "./b/ba/node_modules/pkg0.tsx",
            "./b/ba/node_modules/pkg0.d.ts",
            "./b/ba/node_modules/pkg0/index.ts",
            "./b/ba/node_modules/pkg0/index.tsx",
            "./b/ba/node_modules/pkg0/index.d.ts",
            "./b/ba/node_modules/@types/pkg0/package.json",
            "./b/ba/node_modules/@types/pkg0.d.ts",
            "./b/ba/node_modules/@types/pkg0/index.d.ts",
            "./b/node_modules/pkg0/package.json",
            "./b/node_modules/pkg0.ts",
            "./b/node_modules/pkg0.tsx",
            "./b/node_modules/pkg0.d.ts",
            "./b/node_modules/pkg0/index.ts",
            "./b/node_modules/pkg0/index.tsx",
            "./b/node_modules/pkg0/index.d.ts",
            "./b/node_modules/@types/pkg0/package.json",
            "./b/node_modules/@types/pkg0.d.ts",
            "./b/node_modules/@types/pkg0/index.d.ts",
            "./c/ca/node_modules/pkg0/package.json",
            "./c/ca/node_modules/pkg0.ts",
            "./c/ca/node_modules/pkg0.tsx",
            "./c/ca/node_modules/pkg0.d.ts",
            "./c/ca/node_modules/pkg0/index.ts",
            "./c/ca/node_modules/pkg0/index.tsx",
            "./c/ca/node_modules/pkg0/index.d.ts",
            "./c/ca/node_modules/@types/pkg0/package.json",
            "./c/ca/node_modules/@types/pkg0.d.ts",
            "./c/ca/node_modules/@types/pkg0/index.d.ts",
            "./c/node_modules/pkg0/package.json",
            "./c/node_modules/pkg0.ts",
            "./c/node_modules/pkg0.tsx",
            "./c/node_modules/pkg0.d.ts",
            "./c/node_modules/pkg0/index.ts",
            "./c/node_modules/pkg0/index.tsx",
            "./c/node_modules/pkg0/index.d.ts",
            "./c/node_modules/@types/pkg0/package.json",
            "./c/node_modules/@types/pkg0.d.ts",
            "./c/node_modules/@types/pkg0/index.d.ts",
            "./c/ca/caa/caaa/node_modules/pkg0/package.json",
            "./c/ca/caa/caaa/node_modules/pkg0.ts",
            "./c/ca/caa/caaa/node_modules/pkg0.tsx",
            "./c/ca/caa/caaa/node_modules/pkg0.d.ts",
            "./c/ca/caa/caaa/node_modules/pkg0/index.ts",
            "./c/ca/caa/caaa/node_modules/pkg0/index.tsx",
            "./c/ca/caa/caaa/node_modules/pkg0/index.d.ts",
            "./c/ca/caa/caaa/node_modules/@types/pkg0/package.json",
            "./c/ca/caa/caaa/node_modules/@types/pkg0.d.ts",
            "./c/ca/caa/caaa/node_modules/@types/pkg0/index.d.ts",
            "./c/ca/caa/node_modules/pkg0/package.json",
            "./c/ca/caa/node_modules/pkg0.ts",
            "./c/ca/caa/node_modules/pkg0.tsx",
            "./c/ca/caa/node_modules/pkg0.d.ts",
            "./c/ca/caa/node_modules/pkg0/index.ts",
            "./c/ca/caa/node_modules/pkg0/index.tsx",
            "./c/ca/caa/node_modules/pkg0/index.d.ts",
            "./c/ca/caa/node_modules/@types/pkg0/package.json",
            "./c/ca/caa/node_modules/@types/pkg0.d.ts",
            "./c/ca/caa/node_modules/@types/pkg0/index.d.ts",
            "./c/cb/node_modules/pkg0/package.json",
            "./c/cb/node_modules/pkg0.ts",
            "./c/cb/node_modules/pkg0.tsx",
            "./c/cb/node_modules/pkg0.d.ts",
            "./c/cb/node_modules/pkg0/index.ts",
            "./c/cb/node_modules/pkg0/index.tsx",
            "./c/cb/node_modules/pkg0/index.d.ts",
            "./c/cb/node_modules/@types/pkg0/package.json",
            "./c/cb/node_modules/@types/pkg0.d.ts",
            "./c/cb/node_modules/@types/pkg0/index.d.ts",
            "./d/da/daa/daaa/node_modules/pkg0/package.json",
            "./d/da/daa/daaa/node_modules/pkg0.ts",
            "./d/da/daa/daaa/node_modules/pkg0.tsx",
            "./d/da/daa/daaa/node_modules/pkg0.d.ts",
            "./d/da/daa/daaa/node_modules/pkg0/index.ts",
            "./d/da/daa/daaa/node_modules/pkg0/index.tsx",
            "./d/da/daa/daaa/node_modules/pkg0/index.d.ts",
            "./d/da/daa/daaa/node_modules/@types/pkg0/package.json",
            "./d/da/daa/daaa/node_modules/@types/pkg0.d.ts",
            "./d/da/daa/daaa/node_modules/@types/pkg0/index.d.ts",
            "./d/da/daa/node_modules/pkg0/package.json",
            "./d/da/daa/node_modules/pkg0.ts",
            "./d/da/daa/node_modules/pkg0.tsx",
            "./d/da/daa/node_modules/pkg0.d.ts",
            "./d/da/daa/node_modules/pkg0/index.ts",
            "./d/da/daa/node_modules/pkg0/index.tsx",
            "./d/da/daa/node_modules/pkg0/index.d.ts",
            "./d/da/daa/node_modules/@types/pkg0/package.json",
            "./d/da/daa/node_modules/@types/pkg0.d.ts",
            "./d/da/daa/node_modules/@types/pkg0/index.d.ts",
            "./d/da/node_modules/pkg0/package.json",
            "./d/da/node_modules/pkg0.ts",
            "./d/da/node_modules/pkg0.tsx",
            "./d/da/node_modules/pkg0.d.ts",
            "./d/da/node_modules/pkg0/index.ts",
            "./d/da/node_modules/pkg0/index.tsx",
            "./d/da/node_modules/pkg0/index.d.ts",
            "./d/da/node_modules/@types/pkg0/package.json",
            "./d/da/node_modules/@types/pkg0.d.ts",
            "./d/da/node_modules/@types/pkg0/index.d.ts",
            "./d/node_modules/pkg0/package.json",
            "./d/node_modules/pkg0.ts",
            "./d/node_modules/pkg0.tsx",
            "./d/node_modules/pkg0.d.ts",
            "./d/node_modules/pkg0/index.ts",
            "./d/node_modules/pkg0/index.tsx",
            "./d/node_modules/pkg0/index.d.ts",
            "./d/node_modules/@types/pkg0/package.json",
            "./d/node_modules/@types/pkg0.d.ts",
            "./d/node_modules/@types/pkg0/index.d.ts",
            "./e/ea/node_modules/pkg0/package.json",
            "./e/ea/node_modules/pkg0.ts",
            "./e/ea/node_modules/pkg0.tsx",
            "./e/ea/node_modules/pkg0.d.ts",
            "./e/ea/node_modules/pkg0/index.ts",
            "./e/ea/node_modules/pkg0/index.tsx",
            "./e/ea/node_modules/pkg0/index.d.ts",
            "./e/ea/node_modules/@types/pkg0/package.json",
            "./e/ea/node_modules/@types/pkg0.d.ts",
            "./e/ea/node_modules/@types/pkg0/index.d.ts",
            "./e/node_modules/pkg0/package.json",
            "./e/node_modules/pkg0.ts",
            "./e/node_modules/pkg0.tsx",
            "./e/node_modules/pkg0.d.ts",
            "./e/node_modules/pkg0/index.ts",
            "./e/node_modules/pkg0/index.tsx",
            "./e/node_modules/pkg0/index.d.ts",
            "./e/node_modules/@types/pkg0/package.json",
            "./e/node_modules/@types/pkg0.d.ts",
            "./e/node_modules/@types/pkg0/index.d.ts",
            "./e/ea/eaa/node_modules/pkg0/package.json",
            "./e/ea/eaa/node_modules/pkg0.ts",
            "./e/ea/eaa/node_modules/pkg0.tsx",
            "./e/ea/eaa/node_modules/pkg0.d.ts",
            "./e/ea/eaa/node_modules/pkg0/index.ts",
            "./e/ea/eaa/node_modules/pkg0/index.tsx",
            "./e/ea/eaa/node_modules/pkg0/index.d.ts",
            "./e/ea/eaa/node_modules/@types/pkg0/package.json",
            "./e/ea/eaa/node_modules/@types/pkg0.d.ts",
            "./e/ea/eaa/node_modules/@types/pkg0/index.d.ts",
            "./e/ea/eaa/eaaa/node_modules/pkg0/package.json",
            "./e/ea/eaa/eaaa/node_modules/pkg0.ts",
            "./e/ea/eaa/eaaa/node_modules/pkg0.tsx",
            "./e/ea/eaa/eaaa/node_modules/pkg0.d.ts",
            "./e/ea/eaa/eaaa/node_modules/pkg0/index.ts",
            "./e/ea/eaa/eaaa/node_modules/pkg0/index.tsx",
            "./e/ea/eaa/eaaa/node_modules/pkg0/index.d.ts",
            "./e/ea/eaa/eaaa/node_modules/@types/pkg0/package.json",
            "./e/ea/eaa/eaaa/node_modules/@types/pkg0.d.ts",
            "./e/ea/eaa/eaaa/node_modules/@types/pkg0/index.d.ts"
          ]
        }
      ],
      "names": [
        "pkg0"
      ],
      "resolutionEntries": [
        [
          "pkg0",
          {
            "resolvedModule": {
              "resolvedFileName": "./node_modules/pkg0/index.d.ts",
              "isExternalLibraryImport": true
            },
            "failedLookupLocations": [
              "./node_modules/pkg0/package.json",
              "./node_modules/pkg0.ts",
              "./node_modules/pkg0.tsx",
              "./node_modules/pkg0.d.ts",
              "./node_modules/pkg0/index.ts",
              "./node_modules/pkg0/index.tsx",
              "./a/node_modules/pkg0/package.json",
              "./a/node_modules/pkg0.ts",
              "./a/node_modules/pkg0.tsx",
              "./a/node_modules/pkg0.d.ts",
              "./a/node_modules/pkg0/index.ts",
              "./a/node_modules/pkg0/index.tsx",
              "./a/node_modules/pkg0/index.d.ts",
              "./a/node_modules/@types/pkg0/package.json",
              "./a/node_modules/@types/pkg0.d.ts",
              "./a/node_modules/@types/pkg0/index.d.ts",
              "./b/ba/node_modules/pkg0/package.json",
              "./b/ba/node_modules/pkg0.ts",
              "./b/ba/node_modules/pkg0.tsx",
              "./b/ba/node_modules/pkg0.d.ts",
              "./b/ba/node_modules/pkg0/index.ts",
              "./b/ba/node_modules/pkg0/index.tsx",
              "./b/ba/node_modules/pkg0/index.d.ts",
              "./b/ba/node_modules/@types/pkg0/package.json",
              "./b/ba/node_modules/@types/pkg0.d.ts",
              "./b/ba/node_modules/@types/pkg0/index.d.ts",
              "./b/node_modules/pkg0/package.json",
              "./b/node_modules/pkg0.ts",
              "./b/node_modules/pkg0.tsx",
              "./b/node_modules/pkg0.d.ts",
              "./b/node_modules/pkg0/index.ts",
              "./b/node_modules/pkg0/index.tsx",
              "./b/node_modules/pkg0/index.d.ts",
              "./b/node_modules/@types/pkg0/package.json",
              "./b/node_modules/@types/pkg0.d.ts",
              "./b/node_modules/@types/pkg0/index.d.ts",
              "./c/ca/node_modules/pkg0/package.json",
              "./c/ca/node_modules/pkg0.ts",
              "./c/ca/node_modules/pkg0.tsx",
              "./c/ca/node_modules/pkg0.d.ts",
              "./c/ca/node_modules/pkg0/index.ts",
              "./c/ca/node_modules/pkg0/index.tsx",
              "./c/ca/node_modules/pkg0/index.d.ts",
              "./c/ca/node_modules/@types/pkg0/package.json",
              "./c/ca/node_modules/@types/pkg0.d.ts",
              "./c/ca/node_modules/@types/pkg0/index.d.ts",
              "./c/node_modules/pkg0/package.json",
              "./c/node_modules/pkg0.ts",
              "./c/node_modules/pkg0.tsx",
              "./c/node_modules/pkg0.d.ts",
              "./c/node_modules/pkg0/index.ts",
              "./c/node_modules/pkg0/index.tsx",
              "./c/node_modules/pkg0/index.d.ts",
              "./c/node_modules/@types/pkg0/package.json",
              "./c/node_modules/@types/pkg0.d.ts",
              "./c/node_modules/@types/pkg0/index.d.ts",
              "./c/ca/caa/caaa/node_modules/pkg0/package.json",
              "./c/ca/caa/caaa/node_modules/pkg0.ts",
              "./c/ca/caa/caaa/node_modules/pkg0.tsx",
              "./c/ca/caa/caaa/node_modules/pkg0.d.ts",
              "./c/ca/caa/caaa/node_modules/pkg0/index.ts",
              "./c/ca/caa/caaa/node_modules/pkg0/index.tsx",
              "./c/ca/caa/caaa/node_modules/pkg0/index.d.ts",
              "./c/ca/caa/caaa/node_modules/@types/pkg0/package.json",
              "./c/ca/caa/caaa/node_modules/@types/pkg0.d.ts",
              "./c/ca/caa/caaa/node_modules/@types/pkg0/index.d.ts",
              "./c/ca/caa/node_modules/pkg0/package.json",
              "./c/ca/caa/node_modules/pkg0.ts",
              "./c/ca/caa/node_modules/pkg0.tsx",
              "./c/ca/caa/node_modules/pkg0.d.ts",
              "./c/ca/caa/node_modules/pkg0/index.ts",
              "./c/ca/caa/node_modules/pkg0/index.tsx",
              "./c/ca/caa/node_modules/pkg0/index.d.ts",
              "./c/ca/caa/node_modules/@types/pkg0/package.json",
              "./c/ca/caa/node_modules/@types/pkg0.d.ts",
              "./c/ca/caa/node_modules/@types/pkg0/index.d.ts",
              "./c/cb/node_modules/pkg0/package.json",
              "./c/cb/node_modules/pkg0.ts",
              "./c/cb/node_modules/pkg0.tsx",
              "./c/cb/node_modules/pkg0.d.ts",
              "./c/cb/node_modules/pkg0/index.ts",
              "./c/cb/node_modules/pkg0/index.tsx",
              "./c/cb/node_modules/pkg0/index.d.ts",
              "./c/cb/node_modules/@types/pkg0/package.json",
              "./c/cb/node_modules/@types/pkg0.d.ts",
              "./c/cb/node_modules/@types/pkg0/index.d.ts",
              "./d/da/daa/daaa/node_modules/pkg0/package.json",
              "./d/da/daa/daaa/node_modules/pkg0.ts",
              "./d/da/daa/daaa/node_modules/pkg0.tsx",
              "./d/da/daa/daaa/node_modules/pkg0.d.ts",
              "./d/da/daa/daaa/node_modules/pkg0/index.ts",
              "./d/da/daa/daaa/node_modules/pkg0/index.tsx",
              "./d/da/daa/daaa/node_modules/pkg0/index.d.ts",
              "./d/da/daa/daaa/node_modules/@types/pkg0/package.json",
              "./d/da/daa/daaa/node_modules/@types/pkg0.d.ts",
              "./d/da/daa/daaa/node_modules/@types/pkg0/index.d.ts",
              "./d/da/daa/node_modules/pkg0/package.json",
              "./d/da/daa/node_modules/pkg0.ts",
              "./d/da/daa/node_modules/pkg0.tsx",
              "./d/da/daa/node_modules/pkg0.d.ts",
              "./d/da/daa/node_modules/pkg0/index.ts",
              "./d/da/daa/node_modules/pkg0/index.tsx",
              "./d/da/daa/node_modules/pkg0/index.d.ts",
              "./d/da/daa/node_modules/@types/pkg0/package.json",
              "./d/da/daa/node_modules/@types/pkg0.d.ts",
              "./d/da/daa/node_modules/@types/pkg0/index.d.ts",
              "./d/da/node_modules/pkg0/package.json",
              "./d/da/node_modules/pkg0.ts",
              "./d/da/node_modules/pkg0.tsx",
              "./d/da/node_modules/pkg0.d.ts",
              "./d/da/node_modules/pkg0/index.ts",
              "./d/da/node_modules/pkg0/index.tsx",
              "./d/da/node_modules/pkg0/index.d.ts",
              "./d/da/node_modules/@types/pkg0/package.json",
              "./d/da/node_modules/@types/pkg0.d.ts",
              "./d/da/node_modules/@types/pkg0/index.d.ts",
              "./d/node_modules/pkg0/package.json",
              "./d/node_modules/pkg0.ts",
              "./d/node_modules/pkg0.tsx",
              "./d/node_modules/pkg0.d.ts",
              "./d/node_modules/pkg0/index.ts",
              "./d/node_modules/pkg0/index.tsx",
              "./d/node_modules/pkg0/index.d.ts",
              "./d/node_modules/@types/pkg0/package.json",
              "./d/node_modules/@types/pkg0.d.ts",
              "./d/node_modules/@types/pkg0/index.d.ts",
              "./e/ea/node_modules/pkg0/package.json",
              "./e/ea/node_modules/pkg0.ts",
              "./e/ea/node_modules/pkg0.tsx",
              "./e/ea/node_modules/pkg0.d.ts",
              "./e/ea/node_modules/pkg0/index.ts",
              "./e/ea/node_modules/pkg0/index.tsx",
              "./e/ea/node_modules/pkg0/index.d.ts",
              "./e/ea/node_modules/@types/pkg0/package.json",
              "./e/ea/node_modules/@types/pkg0.d.ts",
              "./e/ea/node_modules/@types/pkg0/index.d.ts",
              "./e/node_modules/pkg0/package.json",
              "./e/node_modules/pkg0.ts",
              "./e/node_modules/pkg0.tsx",
              "./e/node_modules/pkg0.d.ts",
              "./e/node_modules/pkg0/index.ts",
              "./e/node_modules/pkg0/index.tsx",
              "./e/node_modules/pkg0/index.d.ts",
              "./e/node_modules/@types/pkg0/package.json",
              "./e/node_modules/@types/pkg0.d.ts",
              "./e/node_modules/@types/pkg0/index.d.ts",
              "./e/ea/eaa/node_modules/pkg0/package.json",
              "./e/ea/eaa/node_modules/pkg0.ts",
              "./e/ea/eaa/node_modules/pkg0.tsx",
              "./e/ea/eaa/node_modules/pkg0.d.ts",
              "./e/ea/eaa/node_modules/pkg0/index.ts",
              "./e/ea/eaa/node_modules/pkg0/index.tsx",
              "./e/ea/eaa/node_modules/pkg0/index.d.ts",
              "./e/ea/eaa/node_modules/@types/pkg0/package.json",
              "./e/ea/eaa/node_modules/@types/pkg0.d.ts",
              "./e/ea/eaa/node_modules/@types/pkg0/index.d.ts",
              "./e/ea/eaa/eaaa/node_modules/pkg0/package.json",
              "./e/ea/eaa/eaaa/node_modules/pkg0.ts",
              "./e/ea/eaa/eaaa/node_modules/pkg0.tsx",
              "./e/ea/eaa/eaaa/node_modules/pkg0.d.ts",
              "./e/ea/eaa/eaaa/node_modules/pkg0/index.ts",
              "./e/ea/eaa/eaaa/node_modules/pkg0/index.tsx",
              "./e/ea/eaa/eaaa/node_modules/pkg0/index.d.ts",
              "./e/ea/eaa/eaaa/node_modules/@types/pkg0/package.json",
              "./e/ea/eaa/eaaa/node_modules/@types/pkg0.d.ts",
              "./e/ea/eaa/eaaa/node_modules/@types/pkg0/index.d.ts"
            ]
          }
        ]
      ],
      "modules": [
        [
          "./a",
          [
            [
              "pkg0",
              {
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                },
                "failedLookupLocations": [
                  "./node_modules/pkg0/package.json",
                  "./node_modules/pkg0.ts",
                  "./node_modules/pkg0.tsx",
                  "./node_modules/pkg0.d.ts",
                  "./node_modules/pkg0/index.ts",
                  "./node_modules/pkg0/index.tsx",
                  "./a/node_modules/pkg0/package.json",
                  "./a/node_modules/pkg0.ts",
                  "./a/node_modules/pkg0.tsx",
                  "./a/node_modules/pkg0.d.ts",
                  "./a/node_modules/pkg0/index.ts",
                  "./a/node_modules/pkg0/index.tsx",
                  "./a/node_modules/pkg0/index.d.ts",
                  "./a/node_modules/@types/pkg0/package.json",
                  "./a/node_modules/@types/pkg0.d.ts",
                  "./a/node_modules/@types/pkg0/index.d.ts",
                  "./b/ba/node_modules/pkg0/package.json",
                  "./b/ba/node_modules/pkg0.ts",
                  "./b/ba/node_modules/pkg0.tsx",
                  "./b/ba/node_modules/pkg0.d.ts",
                  "./b/ba/node_modules/pkg0/index.ts",
                  "./b/ba/node_modules/pkg0/index.tsx",
                  "./b/ba/node_modules/pkg0/index.d.ts",
                  "./b/ba/node_modules/@types/pkg0/package.json",
                  "./b/ba/node_modules/@types/pkg0.d.ts",
                  "./b/ba/node_modules/@types/pkg0/index.d.ts",
                  "./b/node_modules/pkg0/package.json",
                  "./b/node_modules/pkg0.ts",
                  "./b/node_modules/pkg0.tsx",
                  "./b/node_modules/pkg0.d.ts",
                  "./b/node_modules/pkg0/index.ts",
                  "./b/node_modules/pkg0/index.tsx",
                  "./b/node_modules/pkg0/index.d.ts",
                  "./b/node_modules/@types/pkg0/package.json",
                  "./b/node_modules/@types/pkg0.d.ts",
                  "./b/node_modules/@types/pkg0/index.d.ts",
                  "./c/ca/node_modules/pkg0/package.json",
                  "./c/ca/node_modules/pkg0.ts",
                  "./c/ca/node_modules/pkg0.tsx",
                  "./c/ca/node_modules/pkg0.d.ts",
                  "./c/ca/node_modules/pkg0/index.ts",
                  "./c/ca/node_modules/pkg0/index.tsx",
                  "./c/ca/node_modules/pkg0/index.d.ts",
                  "./c/ca/node_modules/@types/pkg0/package.json",
                  "./c/ca/node_modules/@types/pkg0.d.ts",
                  "./c/ca/node_modules/@types/pkg0/index.d.ts",
                  "./c/node_modules/pkg0/package.json",
                  "./c/node_modules/pkg0.ts",
                  "./c/node_modules/pkg0.tsx",
                  "./c/node_modules/pkg0.d.ts",
                  "./c/node_modules/pkg0/index.ts",
                  "./c/node_modules/pkg0/index.tsx",
                  "./c/node_modules/pkg0/index.d.ts",
                  "./c/node_modules/@types/pkg0/package.json",
                  "./c/node_modules/@types/pkg0.d.ts",
                  "./c/node_modules/@types/pkg0/index.d.ts",
                  "./c/ca/caa/caaa/node_modules/pkg0/package.json",
                  "./c/ca/caa/caaa/node_modules/pkg0.ts",
                  "./c/ca/caa/caaa/node_modules/pkg0.tsx",
                  "./c/ca/caa/caaa/node_modules/pkg0.d.ts",
                  "./c/ca/caa/caaa/node_modules/pkg0/index.ts",
                  "./c/ca/caa/caaa/node_modules/pkg0/index.tsx",
                  "./c/ca/caa/caaa/node_modules/pkg0/index.d.ts",
                  "./c/ca/caa/caaa/node_modules/@types/pkg0/package.json",
                  "./c/ca/caa/caaa/node_modules/@types/pkg0.d.ts",
                  "./c/ca/caa/caaa/node_modules/@types/pkg0/index.d.ts",
                  "./c/ca/caa/node_modules/pkg0/package.json",
                  "./c/ca/caa/node_modules/pkg0.ts",
                  "./c/ca/caa/node_modules/pkg0.tsx",
                  "./c/ca/caa/node_modules/pkg0.d.ts",
                  "./c/ca/caa/node_modules/pkg0/index.ts",
                  "./c/ca/caa/node_modules/pkg0/index.tsx",
                  "./c/ca/caa/node_modules/pkg0/index.d.ts",
                  "./c/ca/caa/node_modules/@types/pkg0/package.json",
                  "./c/ca/caa/node_modules/@types/pkg0.d.ts",
                  "./c/ca/caa/node_modules/@types/pkg0/index.d.ts",
                  "./c/cb/node_modules/pkg0/package.json",
                  "./c/cb/node_modules/pkg0.ts",
                  "./c/cb/node_modules/pkg0.tsx",
                  "./c/cb/node_modules/pkg0.d.ts",
                  "./c/cb/node_modules/pkg0/index.ts",
                  "./c/cb/node_modules/pkg0/index.tsx",
                  "./c/cb/node_modules/pkg0/index.d.ts",
                  "./c/cb/node_modules/@types/pkg0/package.json",
                  "./c/cb/node_modules/@types/pkg0.d.ts",
                  "./c/cb/node_modules/@types/pkg0/index.d.ts",
                  "./d/da/daa/daaa/node_modules/pkg0/package.json",
                  "./d/da/daa/daaa/node_modules/pkg0.ts",
                  "./d/da/daa/daaa/node_modules/pkg0.tsx",
                  "./d/da/daa/daaa/node_modules/pkg0.d.ts",
                  "./d/da/daa/daaa/node_modules/pkg0/index.ts",
                  "./d/da/daa/daaa/node_modules/pkg0/index.tsx",
                  "./d/da/daa/daaa/node_modules/pkg0/index.d.ts",
                  "./d/da/daa/daaa/node_modules/@types/pkg0/package.json",
                  "./d/da/daa/daaa/node_modules/@types/pkg0.d.ts",
                  "./d/da/daa/daaa/node_modules/@types/pkg0/index.d.ts",
                  "./d/da/daa/node_modules/pkg0/package.json",
                  "./d/da/daa/node_modules/pkg0.ts",
                  "./d/da/daa/node_modules/pkg0.tsx",
                  "./d/da/daa/node_modules/pkg0.d.ts",
                  "./d/da/daa/node_modules/pkg0/index.ts",
                  "./d/da/daa/node_modules/pkg0/index.tsx",
                  "./d/da/daa/node_modules/pkg0/index.d.ts",
                  "./d/da/daa/node_modules/@types/pkg0/package.json",
                  "./d/da/daa/node_modules/@types/pkg0.d.ts",
                  "./d/da/daa/node_modules/@types/pkg0/index.d.ts",
                  "./d/da/node_modules/pkg0/package.json",
                  "./d/da/node_modules/pkg0.ts",
                  "./d/da/node_modules/pkg0.tsx",
                  "./d/da/node_modules/pkg0.d.ts",
                  "./d/da/node_modules/pkg0/index.ts",
                  "./d/da/node_modules/pkg0/index.tsx",
                  "./d/da/node_modules/pkg0/index.d.ts",
                  "./d/da/node_modules/@types/pkg0/package.json",
                  "./d/da/node_modules/@types/pkg0.d.ts",
                  "./d/da/node_modules/@types/pkg0/index.d.ts",
                  "./d/node_modules/pkg0/package.json",
                  "./d/node_modules/pkg0.ts",
                  "./d/node_modules/pkg0.tsx",
                  "./d/node_modules/pkg0.d.ts",
                  "./d/node_modules/pkg0/index.ts",
                  "./d/node_modules/pkg0/index.tsx",
                  "./d/node_modules/pkg0/index.d.ts",
                  "./d/node_modules/@types/pkg0/package.json",
                  "./d/node_modules/@types/pkg0.d.ts",
                  "./d/node_modules/@types/pkg0/index.d.ts",
                  "./e/ea/node_modules/pkg0/package.json",
                  "./e/ea/node_modules/pkg0.ts",
                  "./e/ea/node_modules/pkg0.tsx",
                  "./e/ea/node_modules/pkg0.d.ts",
                  "./e/ea/node_modules/pkg0/index.ts",
                  "./e/ea/node_modules/pkg0/index.tsx",
                  "./e/ea/node_modules/pkg0/index.d.ts",
                  "./e/ea/node_modules/@types/pkg0/package.json",
                  "./e/ea/node_modules/@types/pkg0.d.ts",
                  "./e/ea/node_modules/@types/pkg0/index.d.ts",
                  "./e/node_modules/pkg0/package.json",
                  "./e/node_modules/pkg0.ts",
                  "./e/node_modules/pkg0.tsx",
                  "./e/node_modules/pkg0.d.ts",
                  "./e/node_modules/pkg0/index.ts",
                  "./e/node_modules/pkg0/index.tsx",
                  "./e/node_modules/pkg0/index.d.ts",
                  "./e/node_modules/@types/pkg0/package.json",
                  "./e/node_modules/@types/pkg0.d.ts",
                  "./e/node_modules/@types/pkg0/index.d.ts",
                  "./e/ea/eaa/node_modules/pkg0/package.json",
                  "./e/ea/eaa/node_modules/pkg0.ts",
                  "./e/ea/eaa/node_modules/pkg0.tsx",
                  "./e/ea/eaa/node_modules/pkg0.d.ts",
                  "./e/ea/eaa/node_modules/pkg0/index.ts",
                  "./e/ea/eaa/node_modules/pkg0/index.tsx",
                  "./e/ea/eaa/node_modules/pkg0/index.d.ts",
                  "./e/ea/eaa/node_modules/@types/pkg0/package.json",
                  "./e/ea/eaa/node_modules/@types/pkg0.d.ts",
                  "./e/ea/eaa/node_modules/@types/pkg0/index.d.ts",
                  "./e/ea/eaa/eaaa/node_modules/pkg0/package.json",
                  "./e/ea/eaa/eaaa/node_modules/pkg0.ts",
                  "./e/ea/eaa/eaaa/node_modules/pkg0.tsx",
                  "./e/ea/eaa/eaaa/node_modules/pkg0.d.ts",
                  "./e/ea/eaa/eaaa/node_modules/pkg0/index.ts",
                  "./e/ea/eaa/eaaa/node_modules/pkg0/index.tsx",
                  "./e/ea/eaa/eaaa/node_modules/pkg0/index.d.ts",
                  "./e/ea/eaa/eaaa/node_modules/@types/pkg0/package.json",
                  "./e/ea/eaa/eaaa/node_modules/@types/pkg0.d.ts",
                  "./e/ea/eaa/eaaa/node_modules/@types/pkg0/index.d.ts"
                ]
              }
            ]
          ]
        ],
        [
          "./b/ba",
          [
            [
              "pkg0",
              {
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                },
                "failedLookupLocations": [
                  "./node_modules/pkg0/package.json",
                  "./node_modules/pkg0.ts",
                  "./node_modules/pkg0.tsx",
                  "./node_modules/pkg0.d.ts",
                  "./node_modules/pkg0/index.ts",
                  "./node_modules/pkg0/index.tsx",
                  "./a/node_modules/pkg0/package.json",
                  "./a/node_modules/pkg0.ts",
                  "./a/node_modules/pkg0.tsx",
                  "./a/node_modules/pkg0.d.ts",
                  "./a/node_modules/pkg0/index.ts",
                  "./a/node_modules/pkg0/index.tsx",
                  "./a/node_modules/pkg0/index.d.ts",
                  "./a/node_modules/@types/pkg0/package.json",
                  "./a/node_modules/@types/pkg0.d.ts",
                  "./a/node_modules/@types/pkg0/index.d.ts",
                  "./b/ba/node_modules/pkg0/package.json",
                  "./b/ba/node_modules/pkg0.ts",
                  "./b/ba/node_modules/pkg0.tsx",
                  "./b/ba/node_modules/pkg0.d.ts",
                  "./b/ba/node_modules/pkg0/index.ts",
                  "./b/ba/node_modules/pkg0/index.tsx",
                  "./b/ba/node_modules/pkg0/index.d.ts",
                  "./b/ba/node_modules/@types/pkg0/package.json",
                  "./b/ba/node_modules/@types/pkg0.d.ts",
                  "./b/ba/node_modules/@types/pkg0/index.d.ts",
                  "./b/node_modules/pkg0/package.json",
                  "./b/node_modules/pkg0.ts",
                  "./b/node_modules/pkg0.tsx",
                  "./b/node_modules/pkg0.d.ts",
                  "./b/node_modules/pkg0/index.ts",
                  "./b/node_modules/pkg0/index.tsx",
                  "./b/node_modules/pkg0/index.d.ts",
                  "./b/node_modules/@types/pkg0/package.json",
                  "./b/node_modules/@types/pkg0.d.ts",
                  "./b/node_modules/@types/pkg0/index.d.ts",
                  "./c/ca/node_modules/pkg0/package.json",
                  "./c/ca/node_modules/pkg0.ts",
                  "./c/ca/node_modules/pkg0.tsx",
                  "./c/ca/node_modules/pkg0.d.ts",
                  "./c/ca/node_modules/pkg0/index.ts",
                  "./c/ca/node_modules/pkg0/index.tsx",
                  "./c/ca/node_modules/pkg0/index.d.ts",
                  "./c/ca/node_modules/@types/pkg0/package.json",
                  "./c/ca/node_modules/@types/pkg0.d.ts",
                  "./c/ca/node_modules/@types/pkg0/index.d.ts",
                  "./c/node_modules/pkg0/package.json",
                  "./c/node_modules/pkg0.ts",
                  "./c/node_modules/pkg0.tsx",
                  "./c/node_modules/pkg0.d.ts",
                  "./c/node_modules/pkg0/index.ts",
                  "./c/node_modules/pkg0/index.tsx",
                  "./c/node_modules/pkg0/index.d.ts",
                  "./c/node_modules/@types/pkg0/package.json",
                  "./c/node_modules/@types/pkg0.d.ts",
                  "./c/node_modules/@types/pkg0/index.d.ts",
                  "./c/ca/caa/caaa/node_modules/pkg0/package.json",
                  "./c/ca/caa/caaa/node_modules/pkg0.ts",
                  "./c/ca/caa/caaa/node_modules/pkg0.tsx",
                  "./c/ca/caa/caaa/node_modules/pkg0.d.ts",
                  "./c/ca/caa/caaa/node_modules/pkg0/index.ts",
                  "./c/ca/caa/caaa/node_modules/pkg0/index.tsx",
                  "./c/ca/caa/caaa/node_modules/pkg0/index.d.ts",
                  "./c/ca/caa/caaa/node_modules/@types/pkg0/package.json",
                  "./c/ca/caa/caaa/node_modules/@types/pkg0.d.ts",
                  "./c/ca/caa/caaa/node_modules/@types/pkg0/index.d.ts",
                  "./c/ca/caa/node_modules/pkg0/package.json",
                  "./c/ca/caa/node_modules/pkg0.ts",
                  "./c/ca/caa/node_modules/pkg0.tsx",
                  "./c/ca/caa/node_modules/pkg0.d.ts",
                  "./c/ca/caa/node_modules/pkg0/index.ts",
                  "./c/ca/caa/node_modules/pkg0/index.tsx",
                  "./c/ca/caa/node_modules/pkg0/index.d.ts",
                  "./c/ca/caa/node_modules/@types/pkg0/package.json",
                  "./c/ca/caa/node_modules/@types/pkg0.d.ts",
                  "./c/ca/caa/node_modules/@types/pkg0/index.d.ts",
                  "./c/cb/node_modules/pkg0/package.json",
                  "./c/cb/node_modules/pkg0.ts",
                  "./c/cb/node_modules/pkg0.tsx",
                  "./c/cb/node_modules/pkg0.d.ts",
                  "./c/cb/node_modules/pkg0/index.ts",
                  "./c/cb/node_modules/pkg0/index.tsx",
                  "./c/cb/node_modules/pkg0/index.d.ts",
                  "./c/cb/node_modules/@types/pkg0/package.json",
                  "./c/cb/node_modules/@types/pkg0.d.ts",
                  "./c/cb/node_modules/@types/pkg0/index.d.ts",
                  "./d/da/daa/daaa/node_modules/pkg0/package.json",
                  "./d/da/daa/daaa/node_modules/pkg0.ts",
                  "./d/da/daa/daaa/node_modules/pkg0.tsx",
                  "./d/da/daa/daaa/node_modules/pkg0.d.ts",
                  "./d/da/daa/daaa/node_modules/pkg0/index.ts",
                  "./d/da/daa/daaa/node_modules/pkg0/index.tsx",
                  "./d/da/daa/daaa/node_modules/pkg0/index.d.ts",
                  "./d/da/daa/daaa/node_modules/@types/pkg0/package.json",
                  "./d/da/daa/daaa/node_modules/@types/pkg0.d.ts",
                  "./d/da/daa/daaa/node_modules/@types/pkg0/index.d.ts",
                  "./d/da/daa/node_modules/pkg0/package.json",
                  "./d/da/daa/node_modules/pkg0.ts",
                  "./d/da/daa/node_modules/pkg0.tsx",
                  "./d/da/daa/node_modules/pkg0.d.ts",
                  "./d/da/daa/node_modules/pkg0/index.ts",
                  "./d/da/daa/node_modules/pkg0/index.tsx",
                  "./d/da/daa/node_modules/pkg0/index.d.ts",
                  "./d/da/daa/node_modules/@types/pkg0/package.json",
                  "./d/da/daa/node_modules/@types/pkg0.d.ts",
                  "./d/da/daa/node_modules/@types/pkg0/index.d.ts",
                  "./d/da/node_modules/pkg0/package.json",
                  "./d/da/node_modules/pkg0.ts",
                  "./d/da/node_modules/pkg0.tsx",
                  "./d/da/node_modules/pkg0.d.ts",
                  "./d/da/node_modules/pkg0/index.ts",
                  "./d/da/node_modules/pkg0/index.tsx",
                  "./d/da/node_modules/pkg0/index.d.ts",
                  "./d/da/node_modules/@types/pkg0/package.json",
                  "./d/da/node_modules/@types/pkg0.d.ts",
                  "./d/da/node_modules/@types/pkg0/index.d.ts",
                  "./d/node_modules/pkg0/package.json",
                  "./d/node_modules/pkg0.ts",
                  "./d/node_modules/pkg0.tsx",
                  "./d/node_modules/pkg0.d.ts",
                  "./d/node_modules/pkg0/index.ts",
                  "./d/node_modules/pkg0/index.tsx",
                  "./d/node_modules/pkg0/index.d.ts",
                  "./d/node_modules/@types/pkg0/package.json",
                  "./d/node_modules/@types/pkg0.d.ts",
                  "./d/node_modules/@types/pkg0/index.d.ts",
                  "./e/ea/node_modules/pkg0/package.json",
                  "./e/ea/node_modules/pkg0.ts",
                  "./e/ea/node_modules/pkg0.tsx",
                  "./e/ea/node_modules/pkg0.d.ts",
                  "./e/ea/node_modules/pkg0/index.ts",
                  "./e/ea/node_modules/pkg0/index.tsx",
                  "./e/ea/node_modules/pkg0/index.d.ts",
                  "./e/ea/node_modules/@types/pkg0/package.json",
                  "./e/ea/node_modules/@types/pkg0.d.ts",
                  "./e/ea/node_modules/@types/pkg0/index.d.ts",
                  "./e/node_modules/pkg0/package.json",
                  "./e/node_modules/pkg0.ts",
                  "./e/node_modules/pkg0.tsx",
                  "./e/node_modules/pkg0.d.ts",
                  "./e/node_modules/pkg0/index.ts",
                  "./e/node_modules/pkg0/index.tsx",
                  "./e/node_modules/pkg0/index.d.ts",
                  "./e/node_modules/@types/pkg0/package.json",
                  "./e/node_modules/@types/pkg0.d.ts",
                  "./e/node_modules/@types/pkg0/index.d.ts",
                  "./e/ea/eaa/node_modules/pkg0/package.json",
                  "./e/ea/eaa/node_modules/pkg0.ts",
                  "./e/ea/eaa/node_modules/pkg0.tsx",
                  "./e/ea/eaa/node_modules/pkg0.d.ts",
                  "./e/ea/eaa/node_modules/pkg0/index.ts",
                  "./e/ea/eaa/node_modules/pkg0/index.tsx",
                  "./e/ea/eaa/node_modules/pkg0/index.d.ts",
                  "./e/ea/eaa/node_modules/@types/pkg0/package.json",
                  "./e/ea/eaa/node_modules/@types/pkg0.d.ts",
                  "./e/ea/eaa/node_modules/@types/pkg0/index.d.ts",
                  "./e/ea/eaa/eaaa/node_modules/pkg0/package.json",
                  "./e/ea/eaa/eaaa/node_modules/pkg0.ts",
                  "./e/ea/eaa/eaaa/node_modules/pkg0.tsx",
                  "./e/ea/eaa/eaaa/node_modules/pkg0.d.ts",
                  "./e/ea/eaa/eaaa/node_modules/pkg0/index.ts",
                  "./e/ea/eaa/eaaa/node_modules/pkg0/index.tsx",
                  "./e/ea/eaa/eaaa/node_modules/pkg0/index.d.ts",
                  "./e/ea/eaa/eaaa/node_modules/@types/pkg0/package.json",
                  "./e/ea/eaa/eaaa/node_modules/@types/pkg0.d.ts",
                  "./e/ea/eaa/eaaa/node_modules/@types/pkg0/index.d.ts"
                ]
              }
            ]
          ]
        ],
        [
          "./c/ca/caa/caaa",
          [
            [
              "pkg0",
              {
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                },
                "failedLookupLocations": [
                  "./node_modules/pkg0/package.json",
                  "./node_modules/pkg0.ts",
                  "./node_modules/pkg0.tsx",
                  "./node_modules/pkg0.d.ts",
                  "./node_modules/pkg0/index.ts",
                  "./node_modules/pkg0/index.tsx",
                  "./a/node_modules/pkg0/package.json",
                  "./a/node_modules/pkg0.ts",
                  "./a/node_modules/pkg0.tsx",
                  "./a/node_modules/pkg0.d.ts",
                  "./a/node_modules/pkg0/index.ts",
                  "./a/node_modules/pkg0/index.tsx",
                  "./a/node_modules/pkg0/index.d.ts",
                  "./a/node_modules/@types/pkg0/package.json",
                  "./a/node_modules/@types/pkg0.d.ts",
                  "./a/node_modules/@types/pkg0/index.d.ts",
                  "./b/ba/node_modules/pkg0/package.json",
                  "./b/ba/node_modules/pkg0.ts",
                  "./b/ba/node_modules/pkg0.tsx",
                  "./b/ba/node_modules/pkg0.d.ts",
                  "./b/ba/node_modules/pkg0/index.ts",
                  "./b/ba/node_modules/pkg0/index.tsx",
                  "./b/ba/node_modules/pkg0/index.d.ts",
                  "./b/ba/node_modules/@types/pkg0/package.json",
                  "./b/ba/node_modules/@types/pkg0.d.ts",
                  "./b/ba/node_modules/@types/pkg0/index.d.ts",
                  "./b/node_modules/pkg0/package.json",
                  "./b/node_modules/pkg0.ts",
                  "./b/node_modules/pkg0.tsx",
                  "./b/node_modules/pkg0.d.ts",
                  "./b/node_modules/pkg0/index.ts",
                  "./b/node_modules/pkg0/index.tsx",
                  "./b/node_modules/pkg0/index.d.ts",
                  "./b/node_modules/@types/pkg0/package.json",
                  "./b/node_modules/@types/pkg0.d.ts",
                  "./b/node_modules/@types/pkg0/index.d.ts",
                  "./c/ca/node_modules/pkg0/package.json",
                  "./c/ca/node_modules/pkg0.ts",
                  "./c/ca/node_modules/pkg0.tsx",
                  "./c/ca/node_modules/pkg0.d.ts",
                  "./c/ca/node_modules/pkg0/index.ts",
                  "./c/ca/node_modules/pkg0/index.tsx",
                  "./c/ca/node_modules/pkg0/index.d.ts",
                  "./c/ca/node_modules/@types/pkg0/package.json",
                  "./c/ca/node_modules/@types/pkg0.d.ts",
                  "./c/ca/node_modules/@types/pkg0/index.d.ts",
                  "./c/node_modules/pkg0/package.json",
                  "./c/node_modules/pkg0.ts",
                  "./c/node_modules/pkg0.tsx",
                  "./c/node_modules/pkg0.d.ts",
                  "./c/node_modules/pkg0/index.ts",
                  "./c/node_modules/pkg0/index.tsx",
                  "./c/node_modules/pkg0/index.d.ts",
                  "./c/node_modules/@types/pkg0/package.json",
                  "./c/node_modules/@types/pkg0.d.ts",
                  "./c/node_modules/@types/pkg0/index.d.ts",
                  "./c/ca/caa/caaa/node_modules/pkg0/package.json",
                  "./c/ca/caa/caaa/node_modules/pkg0.ts",
                  "./c/ca/caa/caaa/node_modules/pkg0.tsx",
                  "./c/ca/caa/caaa/node_modules/pkg0.d.ts",
                  "./c/ca/caa/caaa/node_modules/pkg0/index.ts",
                  "./c/ca/caa/caaa/node_modules/pkg0/index.tsx",
                  "./c/ca/caa/caaa/node_modules/pkg0/index.d.ts",
                  "./c/ca/caa/caaa/node_modules/@types/pkg0/package.json",
                  "./c/ca/caa/caaa/node_modules/@types/pkg0.d.ts",
                  "./c/ca/caa/caaa/node_modules/@types/pkg0/index.d.ts",
                  "./c/ca/caa/node_modules/pkg0/package.json",
                  "./c/ca/caa/node_modules/pkg0.ts",
                  "./c/ca/caa/node_modules/pkg0.tsx",
                  "./c/ca/caa/node_modules/pkg0.d.ts",
                  "./c/ca/caa/node_modules/pkg0/index.ts",
                  "./c/ca/caa/node_modules/pkg0/index.tsx",
                  "./c/ca/caa/node_modules/pkg0/index.d.ts",
                  "./c/ca/caa/node_modules/@types/pkg0/package.json",
                  "./c/ca/caa/node_modules/@types/pkg0.d.ts",
                  "./c/ca/caa/node_modules/@types/pkg0/index.d.ts",
                  "./c/cb/node_modules/pkg0/package.json",
                  "./c/cb/node_modules/pkg0.ts",
                  "./c/cb/node_modules/pkg0.tsx",
                  "./c/cb/node_modules/pkg0.d.ts",
                  "./c/cb/node_modules/pkg0/index.ts",
                  "./c/cb/node_modules/pkg0/index.tsx",
                  "./c/cb/node_modules/pkg0/index.d.ts",
                  "./c/cb/node_modules/@types/pkg0/package.json",
                  "./c/cb/node_modules/@types/pkg0.d.ts",
                  "./c/cb/node_modules/@types/pkg0/index.d.ts",
                  "./d/da/daa/daaa/node_modules/pkg0/package.json",
                  "./d/da/daa/daaa/node_modules/pkg0.ts",
                  "./d/da/daa/daaa/node_modules/pkg0.tsx",
                  "./d/da/daa/daaa/node_modules/pkg0.d.ts",
                  "./d/da/daa/daaa/node_modules/pkg0/index.ts",
                  "./d/da/daa/daaa/node_modules/pkg0/index.tsx",
                  "./d/da/daa/daaa/node_modules/pkg0/index.d.ts",
                  "./d/da/daa/daaa/node_modules/@types/pkg0/package.json",
                  "./d/da/daa/daaa/node_modules/@types/pkg0.d.ts",
                  "./d/da/daa/daaa/node_modules/@types/pkg0/index.d.ts",
                  "./d/da/daa/node_modules/pkg0/package.json",
                  "./d/da/daa/node_modules/pkg0.ts",
                  "./d/da/daa/node_modules/pkg0.tsx",
                  "./d/da/daa/node_modules/pkg0.d.ts",
                  "./d/da/daa/node_modules/pkg0/index.ts",
                  "./d/da/daa/node_modules/pkg0/index.tsx",
                  "./d/da/daa/node_modules/pkg0/index.d.ts",
                  "./d/da/daa/node_modules/@types/pkg0/package.json",
                  "./d/da/daa/node_modules/@types/pkg0.d.ts",
                  "./d/da/daa/node_modules/@types/pkg0/index.d.ts",
                  "./d/da/node_modules/pkg0/package.json",
                  "./d/da/node_modules/pkg0.ts",
                  "./d/da/node_modules/pkg0.tsx",
                  "./d/da/node_modules/pkg0.d.ts",
                  "./d/da/node_modules/pkg0/index.ts",
                  "./d/da/node_modules/pkg0/index.tsx",
                  "./d/da/node_modules/pkg0/index.d.ts",
                  "./d/da/node_modules/@types/pkg0/package.json",
                  "./d/da/node_modules/@types/pkg0.d.ts",
                  "./d/da/node_modules/@types/pkg0/index.d.ts",
                  "./d/node_modules/pkg0/package.json",
                  "./d/node_modules/pkg0.ts",
                  "./d/node_modules/pkg0.tsx",
                  "./d/node_modules/pkg0.d.ts",
                  "./d/node_modules/pkg0/index.ts",
                  "./d/node_modules/pkg0/index.tsx",
                  "./d/node_modules/pkg0/index.d.ts",
                  "./d/node_modules/@types/pkg0/package.json",
                  "./d/node_modules/@types/pkg0.d.ts",
                  "./d/node_modules/@types/pkg0/index.d.ts",
                  "./e/ea/node_modules/pkg0/package.json",
                  "./e/ea/node_modules/pkg0.ts",
                  "./e/ea/node_modules/pkg0.tsx",
                  "./e/ea/node_modules/pkg0.d.ts",
                  "./e/ea/node_modules/pkg0/index.ts",
                  "./e/ea/node_modules/pkg0/index.tsx",
                  "./e/ea/node_modules/pkg0/index.d.ts",
                  "./e/ea/node_modules/@types/pkg0/package.json",
                  "./e/ea/node_modules/@types/pkg0.d.ts",
                  "./e/ea/node_modules/@types/pkg0/index.d.ts",
                  "./e/node_modules/pkg0/package.json",
                  "./e/node_modules/pkg0.ts",
                  "./e/node_modules/pkg0.tsx",
                  "./e/node_modules/pkg0.d.ts",
                  "./e/node_modules/pkg0/index.ts",
                  "./e/node_modules/pkg0/index.tsx",
                  "./e/node_modules/pkg0/index.d.ts",
                  "./e/node_modules/@types/pkg0/package.json",
                  "./e/node_modules/@types/pkg0.d.ts",
                  "./e/node_modules/@types/pkg0/index.d.ts",
                  "./e/ea/eaa/node_modules/pkg0/package.json",
                  "./e/ea/eaa/node_modules/pkg0.ts",
                  "./e/ea/eaa/node_modules/pkg0.tsx",
                  "./e/ea/eaa/node_modules/pkg0.d.ts",
                  "./e/ea/eaa/node_modules/pkg0/index.ts",
                  "./e/ea/eaa/node_modules/pkg0/index.tsx",
                  "./e/ea/eaa/node_modules/pkg0/index.d.ts",
                  "./e/ea/eaa/node_modules/@types/pkg0/package.json",
                  "./e/ea/eaa/node_modules/@types/pkg0.d.ts",
                  "./e/ea/eaa/node_modules/@types/pkg0/index.d.ts",
                  "./e/ea/eaa/eaaa/node_modules/pkg0/package.json",
                  "./e/ea/eaa/eaaa/node_modules/pkg0.ts",
                  "./e/ea/eaa/eaaa/node_modules/pkg0.tsx",
                  "./e/ea/eaa/eaaa/node_modules/pkg0.d.ts",
                  "./e/ea/eaa/eaaa/node_modules/pkg0/index.ts",
                  "./e/ea/eaa/eaaa/node_modules/pkg0/index.tsx",
                  "./e/ea/eaa/eaaa/node_modules/pkg0/index.d.ts",
                  "./e/ea/eaa/eaaa/node_modules/@types/pkg0/package.json",
                  "./e/ea/eaa/eaaa/node_modules/@types/pkg0.d.ts",
                  "./e/ea/eaa/eaaa/node_modules/@types/pkg0/index.d.ts"
                ]
              }
            ]
          ]
        ],
        [
          "./c/cb",
          [
            [
              "pkg0",
              {
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                },
                "failedLookupLocations": [
                  "./node_modules/pkg0/package.json",
                  "./node_modules/pkg0.ts",
                  "./node_modules/pkg0.tsx",
                  "./node_modules/pkg0.d.ts",
                  "./node_modules/pkg0/index.ts",
                  "./node_modules/pkg0/index.tsx",
                  "./a/node_modules/pkg0/package.json",
                  "./a/node_modules/pkg0.ts",
                  "./a/node_modules/pkg0.tsx",
                  "./a/node_modules/pkg0.d.ts",
                  "./a/node_modules/pkg0/index.ts",
                  "./a/node_modules/pkg0/index.tsx",
                  "./a/node_modules/pkg0/index.d.ts",
                  "./a/node_modules/@types/pkg0/package.json",
                  "./a/node_modules/@types/pkg0.d.ts",
                  "./a/node_modules/@types/pkg0/index.d.ts",
                  "./b/ba/node_modules/pkg0/package.json",
                  "./b/ba/node_modules/pkg0.ts",
                  "./b/ba/node_modules/pkg0.tsx",
                  "./b/ba/node_modules/pkg0.d.ts",
                  "./b/ba/node_modules/pkg0/index.ts",
                  "./b/ba/node_modules/pkg0/index.tsx",
                  "./b/ba/node_modules/pkg0/index.d.ts",
                  "./b/ba/node_modules/@types/pkg0/package.json",
                  "./b/ba/node_modules/@types/pkg0.d.ts",
                  "./b/ba/node_modules/@types/pkg0/index.d.ts",
                  "./b/node_modules/pkg0/package.json",
                  "./b/node_modules/pkg0.ts",
                  "./b/node_modules/pkg0.tsx",
                  "./b/node_modules/pkg0.d.ts",
                  "./b/node_modules/pkg0/index.ts",
                  "./b/node_modules/pkg0/index.tsx",
                  "./b/node_modules/pkg0/index.d.ts",
                  "./b/node_modules/@types/pkg0/package.json",
                  "./b/node_modules/@types/pkg0.d.ts",
                  "./b/node_modules/@types/pkg0/index.d.ts",
                  "./c/ca/node_modules/pkg0/package.json",
                  "./c/ca/node_modules/pkg0.ts",
                  "./c/ca/node_modules/pkg0.tsx",
                  "./c/ca/node_modules/pkg0.d.ts",
                  "./c/ca/node_modules/pkg0/index.ts",
                  "./c/ca/node_modules/pkg0/index.tsx",
                  "./c/ca/node_modules/pkg0/index.d.ts",
                  "./c/ca/node_modules/@types/pkg0/package.json",
                  "./c/ca/node_modules/@types/pkg0.d.ts",
                  "./c/ca/node_modules/@types/pkg0/index.d.ts",
                  "./c/node_modules/pkg0/package.json",
                  "./c/node_modules/pkg0.ts",
                  "./c/node_modules/pkg0.tsx",
                  "./c/node_modules/pkg0.d.ts",
                  "./c/node_modules/pkg0/index.ts",
                  "./c/node_modules/pkg0/index.tsx",
                  "./c/node_modules/pkg0/index.d.ts",
                  "./c/node_modules/@types/pkg0/package.json",
                  "./c/node_modules/@types/pkg0.d.ts",
                  "./c/node_modules/@types/pkg0/index.d.ts",
                  "./c/ca/caa/caaa/node_modules/pkg0/package.json",
                  "./c/ca/caa/caaa/node_modules/pkg0.ts",
                  "./c/ca/caa/caaa/node_modules/pkg0.tsx",
                  "./c/ca/caa/caaa/node_modules/pkg0.d.ts",
                  "./c/ca/caa/caaa/node_modules/pkg0/index.ts",
                  "./c/ca/caa/caaa/node_modules/pkg0/index.tsx",
                  "./c/ca/caa/caaa/node_modules/pkg0/index.d.ts",
                  "./c/ca/caa/caaa/node_modules/@types/pkg0/package.json",
                  "./c/ca/caa/caaa/node_modules/@types/pkg0.d.ts",
                  "./c/ca/caa/caaa/node_modules/@types/pkg0/index.d.ts",
                  "./c/ca/caa/node_modules/pkg0/package.json",
                  "./c/ca/caa/node_modules/pkg0.ts",
                  "./c/ca/caa/node_modules/pkg0.tsx",
                  "./c/ca/caa/node_modules/pkg0.d.ts",
                  "./c/ca/caa/node_modules/pkg0/index.ts",
                  "./c/ca/caa/node_modules/pkg0/index.tsx",
                  "./c/ca/caa/node_modules/pkg0/index.d.ts",
                  "./c/ca/caa/node_modules/@types/pkg0/package.json",
                  "./c/ca/caa/node_modules/@types/pkg0.d.ts",
                  "./c/ca/caa/node_modules/@types/pkg0/index.d.ts",
                  "./c/cb/node_modules/pkg0/package.json",
                  "./c/cb/node_modules/pkg0.ts",
                  "./c/cb/node_modules/pkg0.tsx",
                  "./c/cb/node_modules/pkg0.d.ts",
                  "./c/cb/node_modules/pkg0/index.ts",
                  "./c/cb/node_modules/pkg0/index.tsx",
                  "./c/cb/node_modules/pkg0/index.d.ts",
                  "./c/cb/node_modules/@types/pkg0/package.json",
                  "./c/cb/node_modules/@types/pkg0.d.ts",
                  "./c/cb/node_modules/@types/pkg0/index.d.ts",
                  "./d/da/daa/daaa/node_modules/pkg0/package.json",
                  "./d/da/daa/daaa/node_modules/pkg0.ts",
                  "./d/da/daa/daaa/node_modules/pkg0.tsx",
                  "./d/da/daa/daaa/node_modules/pkg0.d.ts",
                  "./d/da/daa/daaa/node_modules/pkg0/index.ts",
                  "./d/da/daa/daaa/node_modules/pkg0/index.tsx",
                  "./d/da/daa/daaa/node_modules/pkg0/index.d.ts",
                  "./d/da/daa/daaa/node_modules/@types/pkg0/package.json",
                  "./d/da/daa/daaa/node_modules/@types/pkg0.d.ts",
                  "./d/da/daa/daaa/node_modules/@types/pkg0/index.d.ts",
                  "./d/da/daa/node_modules/pkg0/package.json",
                  "./d/da/daa/node_modules/pkg0.ts",
                  "./d/da/daa/node_modules/pkg0.tsx",
                  "./d/da/daa/node_modules/pkg0.d.ts",
                  "./d/da/daa/node_modules/pkg0/index.ts",
                  "./d/da/daa/node_modules/pkg0/index.tsx",
                  "./d/da/daa/node_modules/pkg0/index.d.ts",
                  "./d/da/daa/node_modules/@types/pkg0/package.json",
                  "./d/da/daa/node_modules/@types/pkg0.d.ts",
                  "./d/da/daa/node_modules/@types/pkg0/index.d.ts",
                  "./d/da/node_modules/pkg0/package.json",
                  "./d/da/node_modules/pkg0.ts",
                  "./d/da/node_modules/pkg0.tsx",
                  "./d/da/node_modules/pkg0.d.ts",
                  "./d/da/node_modules/pkg0/index.ts",
                  "./d/da/node_modules/pkg0/index.tsx",
                  "./d/da/node_modules/pkg0/index.d.ts",
                  "./d/da/node_modules/@types/pkg0/package.json",
                  "./d/da/node_modules/@types/pkg0.d.ts",
                  "./d/da/node_modules/@types/pkg0/index.d.ts",
                  "./d/node_modules/pkg0/package.json",
                  "./d/node_modules/pkg0.ts",
                  "./d/node_modules/pkg0.tsx",
                  "./d/node_modules/pkg0.d.ts",
                  "./d/node_modules/pkg0/index.ts",
                  "./d/node_modules/pkg0/index.tsx",
                  "./d/node_modules/pkg0/index.d.ts",
                  "./d/node_modules/@types/pkg0/package.json",
                  "./d/node_modules/@types/pkg0.d.ts",
                  "./d/node_modules/@types/pkg0/index.d.ts",
                  "./e/ea/node_modules/pkg0/package.json",
                  "./e/ea/node_modules/pkg0.ts",
                  "./e/ea/node_modules/pkg0.tsx",
                  "./e/ea/node_modules/pkg0.d.ts",
                  "./e/ea/node_modules/pkg0/index.ts",
                  "./e/ea/node_modules/pkg0/index.tsx",
                  "./e/ea/node_modules/pkg0/index.d.ts",
                  "./e/ea/node_modules/@types/pkg0/package.json",
                  "./e/ea/node_modules/@types/pkg0.d.ts",
                  "./e/ea/node_modules/@types/pkg0/index.d.ts",
                  "./e/node_modules/pkg0/package.json",
                  "./e/node_modules/pkg0.ts",
                  "./e/node_modules/pkg0.tsx",
                  "./e/node_modules/pkg0.d.ts",
                  "./e/node_modules/pkg0/index.ts",
                  "./e/node_modules/pkg0/index.tsx",
                  "./e/node_modules/pkg0/index.d.ts",
                  "./e/node_modules/@types/pkg0/package.json",
                  "./e/node_modules/@types/pkg0.d.ts",
                  "./e/node_modules/@types/pkg0/index.d.ts",
                  "./e/ea/eaa/node_modules/pkg0/package.json",
                  "./e/ea/eaa/node_modules/pkg0.ts",
                  "./e/ea/eaa/node_modules/pkg0.tsx",
                  "./e/ea/eaa/node_modules/pkg0.d.ts",
                  "./e/ea/eaa/node_modules/pkg0/index.ts",
                  "./e/ea/eaa/node_modules/pkg0/index.tsx",
                  "./e/ea/eaa/node_modules/pkg0/index.d.ts",
                  "./e/ea/eaa/node_modules/@types/pkg0/package.json",
                  "./e/ea/eaa/node_modules/@types/pkg0.d.ts",
                  "./e/ea/eaa/node_modules/@types/pkg0/index.d.ts",
                  "./e/ea/eaa/eaaa/node_modules/pkg0/package.json",
                  "./e/ea/eaa/eaaa/node_modules/pkg0.ts",
                  "./e/ea/eaa/eaaa/node_modules/pkg0.tsx",
                  "./e/ea/eaa/eaaa/node_modules/pkg0.d.ts",
                  "./e/ea/eaa/eaaa/node_modules/pkg0/index.ts",
                  "./e/ea/eaa/eaaa/node_modules/pkg0/index.tsx",
                  "./e/ea/eaa/eaaa/node_modules/pkg0/index.d.ts",
                  "./e/ea/eaa/eaaa/node_modules/@types/pkg0/package.json",
                  "./e/ea/eaa/eaaa/node_modules/@types/pkg0.d.ts",
                  "./e/ea/eaa/eaaa/node_modules/@types/pkg0/index.d.ts"
                ]
              }
            ]
          ]
        ],
        [
          "./d/da/daa/daaa",
          [
            [
              "pkg0",
              {
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                },
                "failedLookupLocations": [
                  "./node_modules/pkg0/package.json",
                  "./node_modules/pkg0.ts",
                  "./node_modules/pkg0.tsx",
                  "./node_modules/pkg0.d.ts",
                  "./node_modules/pkg0/index.ts",
                  "./node_modules/pkg0/index.tsx",
                  "./a/node_modules/pkg0/package.json",
                  "./a/node_modules/pkg0.ts",
                  "./a/node_modules/pkg0.tsx",
                  "./a/node_modules/pkg0.d.ts",
                  "./a/node_modules/pkg0/index.ts",
                  "./a/node_modules/pkg0/index.tsx",
                  "./a/node_modules/pkg0/index.d.ts",
                  "./a/node_modules/@types/pkg0/package.json",
                  "./a/node_modules/@types/pkg0.d.ts",
                  "./a/node_modules/@types/pkg0/index.d.ts",
                  "./b/ba/node_modules/pkg0/package.json",
                  "./b/ba/node_modules/pkg0.ts",
                  "./b/ba/node_modules/pkg0.tsx",
                  "./b/ba/node_modules/pkg0.d.ts",
                  "./b/ba/node_modules/pkg0/index.ts",
                  "./b/ba/node_modules/pkg0/index.tsx",
                  "./b/ba/node_modules/pkg0/index.d.ts",
                  "./b/ba/node_modules/@types/pkg0/package.json",
                  "./b/ba/node_modules/@types/pkg0.d.ts",
                  "./b/ba/node_modules/@types/pkg0/index.d.ts",
                  "./b/node_modules/pkg0/package.json",
                  "./b/node_modules/pkg0.ts",
                  "./b/node_modules/pkg0.tsx",
                  "./b/node_modules/pkg0.d.ts",
                  "./b/node_modules/pkg0/index.ts",
                  "./b/node_modules/pkg0/index.tsx",
                  "./b/node_modules/pkg0/index.d.ts",
                  "./b/node_modules/@types/pkg0/package.json",
                  "./b/node_modules/@types/pkg0.d.ts",
                  "./b/node_modules/@types/pkg0/index.d.ts",
                  "./c/ca/node_modules/pkg0/package.json",
                  "./c/ca/node_modules/pkg0.ts",
                  "./c/ca/node_modules/pkg0.tsx",
                  "./c/ca/node_modules/pkg0.d.ts",
                  "./c/ca/node_modules/pkg0/index.ts",
                  "./c/ca/node_modules/pkg0/index.tsx",
                  "./c/ca/node_modules/pkg0/index.d.ts",
                  "./c/ca/node_modules/@types/pkg0/package.json",
                  "./c/ca/node_modules/@types/pkg0.d.ts",
                  "./c/ca/node_modules/@types/pkg0/index.d.ts",
                  "./c/node_modules/pkg0/package.json",
                  "./c/node_modules/pkg0.ts",
                  "./c/node_modules/pkg0.tsx",
                  "./c/node_modules/pkg0.d.ts",
                  "./c/node_modules/pkg0/index.ts",
                  "./c/node_modules/pkg0/index.tsx",
                  "./c/node_modules/pkg0/index.d.ts",
                  "./c/node_modules/@types/pkg0/package.json",
                  "./c/node_modules/@types/pkg0.d.ts",
                  "./c/node_modules/@types/pkg0/index.d.ts",
                  "./c/ca/caa/caaa/node_modules/pkg0/package.json",
                  "./c/ca/caa/caaa/node_modules/pkg0.ts",
                  "./c/ca/caa/caaa/node_modules/pkg0.tsx",
                  "./c/ca/caa/caaa/node_modules/pkg0.d.ts",
                  "./c/ca/caa/caaa/node_modules/pkg0/index.ts",
                  "./c/ca/caa/caaa/node_modules/pkg0/index.tsx",
                  "./c/ca/caa/caaa/node_modules/pkg0/index.d.ts",
                  "./c/ca/caa/caaa/node_modules/@types/pkg0/package.json",
                  "./c/ca/caa/caaa/node_modules/@types/pkg0.d.ts",
                  "./c/ca/caa/caaa/node_modules/@types/pkg0/index.d.ts",
                  "./c/ca/caa/node_modules/pkg0/package.json",
                  "./c/ca/caa/node_modules/pkg0.ts",
                  "./c/ca/caa/node_modules/pkg0.tsx",
                  "./c/ca/caa/node_modules/pkg0.d.ts",
                  "./c/ca/caa/node_modules/pkg0/index.ts",
                  "./c/ca/caa/node_modules/pkg0/index.tsx",
                  "./c/ca/caa/node_modules/pkg0/index.d.ts",
                  "./c/ca/caa/node_modules/@types/pkg0/package.json",
                  "./c/ca/caa/node_modules/@types/pkg0.d.ts",
                  "./c/ca/caa/node_modules/@types/pkg0/index.d.ts",
                  "./c/cb/node_modules/pkg0/package.json",
                  "./c/cb/node_modules/pkg0.ts",
                  "./c/cb/node_modules/pkg0.tsx",
                  "./c/cb/node_modules/pkg0.d.ts",
                  "./c/cb/node_modules/pkg0/index.ts",
                  "./c/cb/node_modules/pkg0/index.tsx",
                  "./c/cb/node_modules/pkg0/index.d.ts",
                  "./c/cb/node_modules/@types/pkg0/package.json",
                  "./c/cb/node_modules/@types/pkg0.d.ts",
                  "./c/cb/node_modules/@types/pkg0/index.d.ts",
                  "./d/da/daa/daaa/node_modules/pkg0/package.json",
                  "./d/da/daa/daaa/node_modules/pkg0.ts",
                  "./d/da/daa/daaa/node_modules/pkg0.tsx",
                  "./d/da/daa/daaa/node_modules/pkg0.d.ts",
                  "./d/da/daa/daaa/node_modules/pkg0/index.ts",
                  "./d/da/daa/daaa/node_modules/pkg0/index.tsx",
                  "./d/da/daa/daaa/node_modules/pkg0/index.d.ts",
                  "./d/da/daa/daaa/node_modules/@types/pkg0/package.json",
                  "./d/da/daa/daaa/node_modules/@types/pkg0.d.ts",
                  "./d/da/daa/daaa/node_modules/@types/pkg0/index.d.ts",
                  "./d/da/daa/node_modules/pkg0/package.json",
                  "./d/da/daa/node_modules/pkg0.ts",
                  "./d/da/daa/node_modules/pkg0.tsx",
                  "./d/da/daa/node_modules/pkg0.d.ts",
                  "./d/da/daa/node_modules/pkg0/index.ts",
                  "./d/da/daa/node_modules/pkg0/index.tsx",
                  "./d/da/daa/node_modules/pkg0/index.d.ts",
                  "./d/da/daa/node_modules/@types/pkg0/package.json",
                  "./d/da/daa/node_modules/@types/pkg0.d.ts",
                  "./d/da/daa/node_modules/@types/pkg0/index.d.ts",
                  "./d/da/node_modules/pkg0/package.json",
                  "./d/da/node_modules/pkg0.ts",
                  "./d/da/node_modules/pkg0.tsx",
                  "./d/da/node_modules/pkg0.d.ts",
                  "./d/da/node_modules/pkg0/index.ts",
                  "./d/da/node_modules/pkg0/index.tsx",
                  "./d/da/node_modules/pkg0/index.d.ts",
                  "./d/da/node_modules/@types/pkg0/package.json",
                  "./d/da/node_modules/@types/pkg0.d.ts",
                  "./d/da/node_modules/@types/pkg0/index.d.ts",
                  "./d/node_modules/pkg0/package.json",
                  "./d/node_modules/pkg0.ts",
                  "./d/node_modules/pkg0.tsx",
                  "./d/node_modules/pkg0.d.ts",
                  "./d/node_modules/pkg0/index.ts",
                  "./d/node_modules/pkg0/index.tsx",
                  "./d/node_modules/pkg0/index.d.ts",
                  "./d/node_modules/@types/pkg0/package.json",
                  "./d/node_modules/@types/pkg0.d.ts",
                  "./d/node_modules/@types/pkg0/index.d.ts",
                  "./e/ea/node_modules/pkg0/package.json",
                  "./e/ea/node_modules/pkg0.ts",
                  "./e/ea/node_modules/pkg0.tsx",
                  "./e/ea/node_modules/pkg0.d.ts",
                  "./e/ea/node_modules/pkg0/index.ts",
                  "./e/ea/node_modules/pkg0/index.tsx",
                  "./e/ea/node_modules/pkg0/index.d.ts",
                  "./e/ea/node_modules/@types/pkg0/package.json",
                  "./e/ea/node_modules/@types/pkg0.d.ts",
                  "./e/ea/node_modules/@types/pkg0/index.d.ts",
                  "./e/node_modules/pkg0/package.json",
                  "./e/node_modules/pkg0.ts",
                  "./e/node_modules/pkg0.tsx",
                  "./e/node_modules/pkg0.d.ts",
                  "./e/node_modules/pkg0/index.ts",
                  "./e/node_modules/pkg0/index.tsx",
                  "./e/node_modules/pkg0/index.d.ts",
                  "./e/node_modules/@types/pkg0/package.json",
                  "./e/node_modules/@types/pkg0.d.ts",
                  "./e/node_modules/@types/pkg0/index.d.ts",
                  "./e/ea/eaa/node_modules/pkg0/package.json",
                  "./e/ea/eaa/node_modules/pkg0.ts",
                  "./e/ea/eaa/node_modules/pkg0.tsx",
                  "./e/ea/eaa/node_modules/pkg0.d.ts",
                  "./e/ea/eaa/node_modules/pkg0/index.ts",
                  "./e/ea/eaa/node_modules/pkg0/index.tsx",
                  "./e/ea/eaa/node_modules/pkg0/index.d.ts",
                  "./e/ea/eaa/node_modules/@types/pkg0/package.json",
                  "./e/ea/eaa/node_modules/@types/pkg0.d.ts",
                  "./e/ea/eaa/node_modules/@types/pkg0/index.d.ts",
                  "./e/ea/eaa/eaaa/node_modules/pkg0/package.json",
                  "./e/ea/eaa/eaaa/node_modules/pkg0.ts",
                  "./e/ea/eaa/eaaa/node_modules/pkg0.tsx",
                  "./e/ea/eaa/eaaa/node_modules/pkg0.d.ts",
                  "./e/ea/eaa/eaaa/node_modules/pkg0/index.ts",
                  "./e/ea/eaa/eaaa/node_modules/pkg0/index.tsx",
                  "./e/ea/eaa/eaaa/node_modules/pkg0/index.d.ts",
                  "./e/ea/eaa/eaaa/node_modules/@types/pkg0/package.json",
                  "./e/ea/eaa/eaaa/node_modules/@types/pkg0.d.ts",
                  "./e/ea/eaa/eaaa/node_modules/@types/pkg0/index.d.ts"
                ]
              }
            ]
          ]
        ],
        [
          "./e/ea/eaa/eaaa",
          [
            [
              "pkg0",
              {
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                },
                "failedLookupLocations": [
                  "./node_modules/pkg0/package.json",
                  "./node_modules/pkg0.ts",
                  "./node_modules/pkg0.tsx",
                  "./node_modules/pkg0.d.ts",
                  "./node_modules/pkg0/index.ts",
                  "./node_modules/pkg0/index.tsx",
                  "./a/node_modules/pkg0/package.json",
                  "./a/node_modules/pkg0.ts",
                  "./a/node_modules/pkg0.tsx",
                  "./a/node_modules/pkg0.d.ts",
                  "./a/node_modules/pkg0/index.ts",
                  "./a/node_modules/pkg0/index.tsx",
                  "./a/node_modules/pkg0/index.d.ts",
                  "./a/node_modules/@types/pkg0/package.json",
                  "./a/node_modules/@types/pkg0.d.ts",
                  "./a/node_modules/@types/pkg0/index.d.ts",
                  "./b/ba/node_modules/pkg0/package.json",
                  "./b/ba/node_modules/pkg0.ts",
                  "./b/ba/node_modules/pkg0.tsx",
                  "./b/ba/node_modules/pkg0.d.ts",
                  "./b/ba/node_modules/pkg0/index.ts",
                  "./b/ba/node_modules/pkg0/index.tsx",
                  "./b/ba/node_modules/pkg0/index.d.ts",
                  "./b/ba/node_modules/@types/pkg0/package.json",
                  "./b/ba/node_modules/@types/pkg0.d.ts",
                  "./b/ba/node_modules/@types/pkg0/index.d.ts",
                  "./b/node_modules/pkg0/package.json",
                  "./b/node_modules/pkg0.ts",
                  "./b/node_modules/pkg0.tsx",
                  "./b/node_modules/pkg0.d.ts",
                  "./b/node_modules/pkg0/index.ts",
                  "./b/node_modules/pkg0/index.tsx",
                  "./b/node_modules/pkg0/index.d.ts",
                  "./b/node_modules/@types/pkg0/package.json",
                  "./b/node_modules/@types/pkg0.d.ts",
                  "./b/node_modules/@types/pkg0/index.d.ts",
                  "./c/ca/node_modules/pkg0/package.json",
                  "./c/ca/node_modules/pkg0.ts",
                  "./c/ca/node_modules/pkg0.tsx",
                  "./c/ca/node_modules/pkg0.d.ts",
                  "./c/ca/node_modules/pkg0/index.ts",
                  "./c/ca/node_modules/pkg0/index.tsx",
                  "./c/ca/node_modules/pkg0/index.d.ts",
                  "./c/ca/node_modules/@types/pkg0/package.json",
                  "./c/ca/node_modules/@types/pkg0.d.ts",
                  "./c/ca/node_modules/@types/pkg0/index.d.ts",
                  "./c/node_modules/pkg0/package.json",
                  "./c/node_modules/pkg0.ts",
                  "./c/node_modules/pkg0.tsx",
                  "./c/node_modules/pkg0.d.ts",
                  "./c/node_modules/pkg0/index.ts",
                  "./c/node_modules/pkg0/index.tsx",
                  "./c/node_modules/pkg0/index.d.ts",
                  "./c/node_modules/@types/pkg0/package.json",
                  "./c/node_modules/@types/pkg0.d.ts",
                  "./c/node_modules/@types/pkg0/index.d.ts",
                  "./c/ca/caa/caaa/node_modules/pkg0/package.json",
                  "./c/ca/caa/caaa/node_modules/pkg0.ts",
                  "./c/ca/caa/caaa/node_modules/pkg0.tsx",
                  "./c/ca/caa/caaa/node_modules/pkg0.d.ts",
                  "./c/ca/caa/caaa/node_modules/pkg0/index.ts",
                  "./c/ca/caa/caaa/node_modules/pkg0/index.tsx",
                  "./c/ca/caa/caaa/node_modules/pkg0/index.d.ts",
                  "./c/ca/caa/caaa/node_modules/@types/pkg0/package.json",
                  "./c/ca/caa/caaa/node_modules/@types/pkg0.d.ts",
                  "./c/ca/caa/caaa/node_modules/@types/pkg0/index.d.ts",
                  "./c/ca/caa/node_modules/pkg0/package.json",
                  "./c/ca/caa/node_modules/pkg0.ts",
                  "./c/ca/caa/node_modules/pkg0.tsx",
                  "./c/ca/caa/node_modules/pkg0.d.ts",
                  "./c/ca/caa/node_modules/pkg0/index.ts",
                  "./c/ca/caa/node_modules/pkg0/index.tsx",
                  "./c/ca/caa/node_modules/pkg0/index.d.ts",
                  "./c/ca/caa/node_modules/@types/pkg0/package.json",
                  "./c/ca/caa/node_modules/@types/pkg0.d.ts",
                  "./c/ca/caa/node_modules/@types/pkg0/index.d.ts",
                  "./c/cb/node_modules/pkg0/package.json",
                  "./c/cb/node_modules/pkg0.ts",
                  "./c/cb/node_modules/pkg0.tsx",
                  "./c/cb/node_modules/pkg0.d.ts",
                  "./c/cb/node_modules/pkg0/index.ts",
                  "./c/cb/node_modules/pkg0/index.tsx",
                  "./c/cb/node_modules/pkg0/index.d.ts",
                  "./c/cb/node_modules/@types/pkg0/package.json",
                  "./c/cb/node_modules/@types/pkg0.d.ts",
                  "./c/cb/node_modules/@types/pkg0/index.d.ts",
                  "./d/da/daa/daaa/node_modules/pkg0/package.json",
                  "./d/da/daa/daaa/node_modules/pkg0.ts",
                  "./d/da/daa/daaa/node_modules/pkg0.tsx",
                  "./d/da/daa/daaa/node_modules/pkg0.d.ts",
                  "./d/da/daa/daaa/node_modules/pkg0/index.ts",
                  "./d/da/daa/daaa/node_modules/pkg0/index.tsx",
                  "./d/da/daa/daaa/node_modules/pkg0/index.d.ts",
                  "./d/da/daa/daaa/node_modules/@types/pkg0/package.json",
                  "./d/da/daa/daaa/node_modules/@types/pkg0.d.ts",
                  "./d/da/daa/daaa/node_modules/@types/pkg0/index.d.ts",
                  "./d/da/daa/node_modules/pkg0/package.json",
                  "./d/da/daa/node_modules/pkg0.ts",
                  "./d/da/daa/node_modules/pkg0.tsx",
                  "./d/da/daa/node_modules/pkg0.d.ts",
                  "./d/da/daa/node_modules/pkg0/index.ts",
                  "./d/da/daa/node_modules/pkg0/index.tsx",
                  "./d/da/daa/node_modules/pkg0/index.d.ts",
                  "./d/da/daa/node_modules/@types/pkg0/package.json",
                  "./d/da/daa/node_modules/@types/pkg0.d.ts",
                  "./d/da/daa/node_modules/@types/pkg0/index.d.ts",
                  "./d/da/node_modules/pkg0/package.json",
                  "./d/da/node_modules/pkg0.ts",
                  "./d/da/node_modules/pkg0.tsx",
                  "./d/da/node_modules/pkg0.d.ts",
                  "./d/da/node_modules/pkg0/index.ts",
                  "./d/da/node_modules/pkg0/index.tsx",
                  "./d/da/node_modules/pkg0/index.d.ts",
                  "./d/da/node_modules/@types/pkg0/package.json",
                  "./d/da/node_modules/@types/pkg0.d.ts",
                  "./d/da/node_modules/@types/pkg0/index.d.ts",
                  "./d/node_modules/pkg0/package.json",
                  "./d/node_modules/pkg0.ts",
                  "./d/node_modules/pkg0.tsx",
                  "./d/node_modules/pkg0.d.ts",
                  "./d/node_modules/pkg0/index.ts",
                  "./d/node_modules/pkg0/index.tsx",
                  "./d/node_modules/pkg0/index.d.ts",
                  "./d/node_modules/@types/pkg0/package.json",
                  "./d/node_modules/@types/pkg0.d.ts",
                  "./d/node_modules/@types/pkg0/index.d.ts",
                  "./e/ea/node_modules/pkg0/package.json",
                  "./e/ea/node_modules/pkg0.ts",
                  "./e/ea/node_modules/pkg0.tsx",
                  "./e/ea/node_modules/pkg0.d.ts",
                  "./e/ea/node_modules/pkg0/index.ts",
                  "./e/ea/node_modules/pkg0/index.tsx",
                  "./e/ea/node_modules/pkg0/index.d.ts",
                  "./e/ea/node_modules/@types/pkg0/package.json",
                  "./e/ea/node_modules/@types/pkg0.d.ts",
                  "./e/ea/node_modules/@types/pkg0/index.d.ts",
                  "./e/node_modules/pkg0/package.json",
                  "./e/node_modules/pkg0.ts",
                  "./e/node_modules/pkg0.tsx",
                  "./e/node_modules/pkg0.d.ts",
                  "./e/node_modules/pkg0/index.ts",
                  "./e/node_modules/pkg0/index.tsx",
                  "./e/node_modules/pkg0/index.d.ts",
                  "./e/node_modules/@types/pkg0/package.json",
                  "./e/node_modules/@types/pkg0.d.ts",
                  "./e/node_modules/@types/pkg0/index.d.ts",
                  "./e/ea/eaa/node_modules/pkg0/package.json",
                  "./e/ea/eaa/node_modules/pkg0.ts",
                  "./e/ea/eaa/node_modules/pkg0.tsx",
                  "./e/ea/eaa/node_modules/pkg0.d.ts",
                  "./e/ea/eaa/node_modules/pkg0/index.ts",
                  "./e/ea/eaa/node_modules/pkg0/index.tsx",
                  "./e/ea/eaa/node_modules/pkg0/index.d.ts",
                  "./e/ea/eaa/node_modules/@types/pkg0/package.json",
                  "./e/ea/eaa/node_modules/@types/pkg0.d.ts",
                  "./e/ea/eaa/node_modules/@types/pkg0/index.d.ts",
                  "./e/ea/eaa/eaaa/node_modules/pkg0/package.json",
                  "./e/ea/eaa/eaaa/node_modules/pkg0.ts",
                  "./e/ea/eaa/eaaa/node_modules/pkg0.tsx",
                  "./e/ea/eaa/eaaa/node_modules/pkg0.d.ts",
                  "./e/ea/eaa/eaaa/node_modules/pkg0/index.ts",
                  "./e/ea/eaa/eaaa/node_modules/pkg0/index.tsx",
                  "./e/ea/eaa/eaaa/node_modules/pkg0/index.d.ts",
                  "./e/ea/eaa/eaaa/node_modules/@types/pkg0/package.json",
                  "./e/ea/eaa/eaaa/node_modules/@types/pkg0.d.ts",
                  "./e/ea/eaa/eaaa/node_modules/@types/pkg0/index.d.ts"
                ]
              }
            ]
          ]
        ]
      ]
    }
  },
  "version": "FakeTSVersion",
  "size": 10476
}


Change:: modify c/ca/caa/randomFileForImport by adding import

Input::
//// [/src/project/c/ca/caa/randomFileForImport.ts]
import type { ImportInterface0 } from "pkg0";
export const x = 10;


Output::
>> Screen clear
[[90m12:03:00 AM[0m] File change detected. Starting incremental compilation...

Reusing resolution of module 'pkg0' from '/src/project/fileWithImports.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/src/project/randomFileForImport.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/src/project/a/fileWithImports.ts' found in cache from location '/src/project/a', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/src/project/b/ba/fileWithImports.ts' found in cache from location '/src/project/b/ba', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/src/project/b/randomFileForImport.ts' found in cache from location '/src/project/b', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/src/project/c/ca/fileWithImports.ts' found in cache from location '/src/project/c/ca', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/src/project/c/ca/caa/randomFileForImport.ts' found in cache from location '/src/project/c/ca/caa', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/src/project/c/ca/caa/caaa/fileWithImports.ts' found in cache from location '/src/project/c/ca/caa/caaa', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/src/project/c/cb/fileWithImports.ts' found in cache from location '/src/project/c/cb', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/daaa/fileWithImports.ts' found in cache from location '/src/project/d/da/daa/daaa', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/fileWithImports.ts' found in cache from location '/src/project/d/da/daa', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/src/project/d/da/fileWithImports.ts' found in cache from location '/src/project/d/da', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/src/project/e/ea/fileWithImports.ts' found in cache from location '/src/project/e/ea', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/fileWithImports.ts' found in cache from location '/src/project/e/ea/eaa', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/eaaa/fileWithImports.ts' found in cache from location '/src/project/e/ea/eaa/eaaa', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
../../a/lib/lib.d.ts
  Default library for target 'es3'
node_modules/pkg0/index.d.ts
  Imported via "pkg0" from file 'fileWithImports.ts'
  Imported via "pkg0" from file 'randomFileForImport.ts'
  Imported via "pkg0" from file 'a/fileWithImports.ts'
  Imported via "pkg0" from file 'b/ba/fileWithImports.ts'
  Imported via "pkg0" from file 'b/randomFileForImport.ts'
  Imported via "pkg0" from file 'c/ca/fileWithImports.ts'
  Imported via "pkg0" from file 'c/ca/caa/randomFileForImport.ts'
  Imported via "pkg0" from file 'c/ca/caa/caaa/fileWithImports.ts'
  Imported via "pkg0" from file 'c/cb/fileWithImports.ts'
  Imported via "pkg0" from file 'd/da/daa/daaa/fileWithImports.ts'
  Imported via "pkg0" from file 'd/da/daa/fileWithImports.ts'
  Imported via "pkg0" from file 'd/da/fileWithImports.ts'
  Imported via "pkg0" from file 'e/ea/fileWithImports.ts'
  Imported via "pkg0" from file 'e/ea/eaa/fileWithImports.ts'
  Imported via "pkg0" from file 'e/ea/eaa/eaaa/fileWithImports.ts'
fileWithImports.ts
  Part of 'files' list in tsconfig.json
randomFileForImport.ts
  Part of 'files' list in tsconfig.json
a/fileWithImports.ts
  Part of 'files' list in tsconfig.json
b/ba/fileWithImports.ts
  Part of 'files' list in tsconfig.json
b/randomFileForImport.ts
  Part of 'files' list in tsconfig.json
c/ca/fileWithImports.ts
  Part of 'files' list in tsconfig.json
c/ca/caa/randomFileForImport.ts
  Part of 'files' list in tsconfig.json
c/ca/caa/caaa/fileWithImports.ts
  Part of 'files' list in tsconfig.json
c/cb/fileWithImports.ts
  Part of 'files' list in tsconfig.json
d/da/daa/daaa/fileWithImports.ts
  Part of 'files' list in tsconfig.json
d/da/daa/fileWithImports.ts
  Part of 'files' list in tsconfig.json
d/da/fileWithImports.ts
  Part of 'files' list in tsconfig.json
e/ea/fileWithImports.ts
  Part of 'files' list in tsconfig.json
e/ea/eaa/fileWithImports.ts
  Part of 'files' list in tsconfig.json
e/ea/eaa/eaaa/fileWithImports.ts
  Part of 'files' list in tsconfig.json
[[90m12:03:11 AM[0m] Found 0 errors. Watching for file changes.



Program root files: ["/src/project/fileWithImports.ts","/src/project/randomFileForImport.ts","/src/project/a/fileWithImports.ts","/src/project/b/ba/fileWithImports.ts","/src/project/b/randomFileForImport.ts","/src/project/c/ca/fileWithImports.ts","/src/project/c/ca/caa/randomFileForImport.ts","/src/project/c/ca/caa/caaa/fileWithImports.ts","/src/project/c/cb/fileWithImports.ts","/src/project/d/da/daa/daaa/fileWithImports.ts","/src/project/d/da/daa/fileWithImports.ts","/src/project/d/da/fileWithImports.ts","/src/project/e/ea/fileWithImports.ts","/src/project/e/ea/eaa/fileWithImports.ts","/src/project/e/ea/eaa/eaaa/fileWithImports.ts"]
Program options: {"composite":true,"cacheResolutions":true,"traceResolution":true,"watch":true,"explainFiles":true,"configFilePath":"/src/project/tsconfig.json"}
Program structureReused: SafeModuleCache
Program files::
/a/lib/lib.d.ts
/src/project/node_modules/pkg0/index.d.ts
/src/project/fileWithImports.ts
/src/project/randomFileForImport.ts
/src/project/a/fileWithImports.ts
/src/project/b/ba/fileWithImports.ts
/src/project/b/randomFileForImport.ts
/src/project/c/ca/fileWithImports.ts
/src/project/c/ca/caa/randomFileForImport.ts
/src/project/c/ca/caa/caaa/fileWithImports.ts
/src/project/c/cb/fileWithImports.ts
/src/project/d/da/daa/daaa/fileWithImports.ts
/src/project/d/da/daa/fileWithImports.ts
/src/project/d/da/fileWithImports.ts
/src/project/e/ea/fileWithImports.ts
/src/project/e/ea/eaa/fileWithImports.ts
/src/project/e/ea/eaa/eaaa/fileWithImports.ts

Semantic diagnostics in builder refreshed for::
/src/project/c/ca/caa/randomFileForImport.ts

Shape signatures in builder refreshed for::
/src/project/c/ca/caa/randomfileforimport.ts (computed .d.ts)

WatchedFiles::
/src/project/tsconfig.json:
  {"fileName":"/src/project/tsconfig.json","pollingInterval":250}
/src/project/filewithimports.ts:
  {"fileName":"/src/project/fileWithImports.ts","pollingInterval":250}
/src/project/randomfileforimport.ts:
  {"fileName":"/src/project/randomFileForImport.ts","pollingInterval":250}
/src/project/a/filewithimports.ts:
  {"fileName":"/src/project/a/fileWithImports.ts","pollingInterval":250}
/src/project/b/ba/filewithimports.ts:
  {"fileName":"/src/project/b/ba/fileWithImports.ts","pollingInterval":250}
/src/project/b/randomfileforimport.ts:
  {"fileName":"/src/project/b/randomFileForImport.ts","pollingInterval":250}
/src/project/c/ca/filewithimports.ts:
  {"fileName":"/src/project/c/ca/fileWithImports.ts","pollingInterval":250}
/src/project/c/ca/caa/randomfileforimport.ts:
  {"fileName":"/src/project/c/ca/caa/randomFileForImport.ts","pollingInterval":250}
/src/project/c/ca/caa/caaa/filewithimports.ts:
  {"fileName":"/src/project/c/ca/caa/caaa/fileWithImports.ts","pollingInterval":250}
/src/project/c/cb/filewithimports.ts:
  {"fileName":"/src/project/c/cb/fileWithImports.ts","pollingInterval":250}
/src/project/d/da/daa/daaa/filewithimports.ts:
  {"fileName":"/src/project/d/da/daa/daaa/fileWithImports.ts","pollingInterval":250}
/src/project/d/da/daa/filewithimports.ts:
  {"fileName":"/src/project/d/da/daa/fileWithImports.ts","pollingInterval":250}
/src/project/d/da/filewithimports.ts:
  {"fileName":"/src/project/d/da/fileWithImports.ts","pollingInterval":250}
/src/project/e/ea/filewithimports.ts:
  {"fileName":"/src/project/e/ea/fileWithImports.ts","pollingInterval":250}
/src/project/e/ea/eaa/filewithimports.ts:
  {"fileName":"/src/project/e/ea/eaa/fileWithImports.ts","pollingInterval":250}
/src/project/e/ea/eaa/eaaa/filewithimports.ts:
  {"fileName":"/src/project/e/ea/eaa/eaaa/fileWithImports.ts","pollingInterval":250}
/src/project/node_modules/pkg0/package.json:
  {"fileName":"/src/project/node_modules/pkg0/package.json","pollingInterval":250}

FsWatches::

FsWatchesRecursive::

exitCode:: ExitStatus.undefined

//// [/src/project/c/ca/caa/randomFileForImport.js] file written with same contents
//// [/src/project/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../a/lib/lib.d.ts","./node_modules/pkg0/index.d.ts","./filewithimports.ts","./randomfileforimport.ts","./a/filewithimports.ts","./b/ba/filewithimports.ts","./b/randomfileforimport.ts","./c/ca/filewithimports.ts","./c/ca/caa/randomfileforimport.ts","./c/ca/caa/caaa/filewithimports.ts","./c/cb/filewithimports.ts","./d/da/daa/daaa/filewithimports.ts","./d/da/daa/filewithimports.ts","./d/da/filewithimports.ts","./e/ea/filewithimports.ts","./e/ea/eaa/filewithimports.ts","./e/ea/eaa/eaaa/filewithimports.ts","./a","./b/ba","./c/ca/caa/caaa","./c/cb","./d/da/daa/daaa","./e/ea/eaa/eaaa","./node_modules/pkg0/package.json","./node_modules/pkg0.ts","./node_modules/pkg0.tsx","./node_modules/pkg0.d.ts","./node_modules/pkg0/index.ts","./node_modules/pkg0/index.tsx","./a/node_modules/pkg0/package.json","./a/node_modules/pkg0.ts","./a/node_modules/pkg0.tsx","./a/node_modules/pkg0.d.ts","./a/node_modules/pkg0/index.ts","./a/node_modules/pkg0/index.tsx","./a/node_modules/pkg0/index.d.ts","./a/node_modules/@types/pkg0/package.json","./a/node_modules/@types/pkg0.d.ts","./a/node_modules/@types/pkg0/index.d.ts","./b/ba/node_modules/pkg0/package.json","./b/ba/node_modules/pkg0.ts","./b/ba/node_modules/pkg0.tsx","./b/ba/node_modules/pkg0.d.ts","./b/ba/node_modules/pkg0/index.ts","./b/ba/node_modules/pkg0/index.tsx","./b/ba/node_modules/pkg0/index.d.ts","./b/ba/node_modules/@types/pkg0/package.json","./b/ba/node_modules/@types/pkg0.d.ts","./b/ba/node_modules/@types/pkg0/index.d.ts","./b/node_modules/pkg0/package.json","./b/node_modules/pkg0.ts","./b/node_modules/pkg0.tsx","./b/node_modules/pkg0.d.ts","./b/node_modules/pkg0/index.ts","./b/node_modules/pkg0/index.tsx","./b/node_modules/pkg0/index.d.ts","./b/node_modules/@types/pkg0/package.json","./b/node_modules/@types/pkg0.d.ts","./b/node_modules/@types/pkg0/index.d.ts","./c/ca/node_modules/pkg0/package.json","./c/ca/node_modules/pkg0.ts","./c/ca/node_modules/pkg0.tsx","./c/ca/node_modules/pkg0.d.ts","./c/ca/node_modules/pkg0/index.ts","./c/ca/node_modules/pkg0/index.tsx","./c/ca/node_modules/pkg0/index.d.ts","./c/ca/node_modules/@types/pkg0/package.json","./c/ca/node_modules/@types/pkg0.d.ts","./c/ca/node_modules/@types/pkg0/index.d.ts","./c/node_modules/pkg0/package.json","./c/node_modules/pkg0.ts","./c/node_modules/pkg0.tsx","./c/node_modules/pkg0.d.ts","./c/node_modules/pkg0/index.ts","./c/node_modules/pkg0/index.tsx","./c/node_modules/pkg0/index.d.ts","./c/node_modules/@types/pkg0/package.json","./c/node_modules/@types/pkg0.d.ts","./c/node_modules/@types/pkg0/index.d.ts","./c/ca/caa/caaa/node_modules/pkg0/package.json","./c/ca/caa/caaa/node_modules/pkg0.ts","./c/ca/caa/caaa/node_modules/pkg0.tsx","./c/ca/caa/caaa/node_modules/pkg0.d.ts","./c/ca/caa/caaa/node_modules/pkg0/index.ts","./c/ca/caa/caaa/node_modules/pkg0/index.tsx","./c/ca/caa/caaa/node_modules/pkg0/index.d.ts","./c/ca/caa/caaa/node_modules/@types/pkg0/package.json","./c/ca/caa/caaa/node_modules/@types/pkg0.d.ts","./c/ca/caa/caaa/node_modules/@types/pkg0/index.d.ts","./c/ca/caa/node_modules/pkg0/package.json","./c/ca/caa/node_modules/pkg0.ts","./c/ca/caa/node_modules/pkg0.tsx","./c/ca/caa/node_modules/pkg0.d.ts","./c/ca/caa/node_modules/pkg0/index.ts","./c/ca/caa/node_modules/pkg0/index.tsx","./c/ca/caa/node_modules/pkg0/index.d.ts","./c/ca/caa/node_modules/@types/pkg0/package.json","./c/ca/caa/node_modules/@types/pkg0.d.ts","./c/ca/caa/node_modules/@types/pkg0/index.d.ts","./c/cb/node_modules/pkg0/package.json","./c/cb/node_modules/pkg0.ts","./c/cb/node_modules/pkg0.tsx","./c/cb/node_modules/pkg0.d.ts","./c/cb/node_modules/pkg0/index.ts","./c/cb/node_modules/pkg0/index.tsx","./c/cb/node_modules/pkg0/index.d.ts","./c/cb/node_modules/@types/pkg0/package.json","./c/cb/node_modules/@types/pkg0.d.ts","./c/cb/node_modules/@types/pkg0/index.d.ts","./d/da/daa/daaa/node_modules/pkg0/package.json","./d/da/daa/daaa/node_modules/pkg0.ts","./d/da/daa/daaa/node_modules/pkg0.tsx","./d/da/daa/daaa/node_modules/pkg0.d.ts","./d/da/daa/daaa/node_modules/pkg0/index.ts","./d/da/daa/daaa/node_modules/pkg0/index.tsx","./d/da/daa/daaa/node_modules/pkg0/index.d.ts","./d/da/daa/daaa/node_modules/@types/pkg0/package.json","./d/da/daa/daaa/node_modules/@types/pkg0.d.ts","./d/da/daa/daaa/node_modules/@types/pkg0/index.d.ts","./d/da/daa/node_modules/pkg0/package.json","./d/da/daa/node_modules/pkg0.ts","./d/da/daa/node_modules/pkg0.tsx","./d/da/daa/node_modules/pkg0.d.ts","./d/da/daa/node_modules/pkg0/index.ts","./d/da/daa/node_modules/pkg0/index.tsx","./d/da/daa/node_modules/pkg0/index.d.ts","./d/da/daa/node_modules/@types/pkg0/package.json","./d/da/daa/node_modules/@types/pkg0.d.ts","./d/da/daa/node_modules/@types/pkg0/index.d.ts","./d/da/node_modules/pkg0/package.json","./d/da/node_modules/pkg0.ts","./d/da/node_modules/pkg0.tsx","./d/da/node_modules/pkg0.d.ts","./d/da/node_modules/pkg0/index.ts","./d/da/node_modules/pkg0/index.tsx","./d/da/node_modules/pkg0/index.d.ts","./d/da/node_modules/@types/pkg0/package.json","./d/da/node_modules/@types/pkg0.d.ts","./d/da/node_modules/@types/pkg0/index.d.ts","./d/node_modules/pkg0/package.json","./d/node_modules/pkg0.ts","./d/node_modules/pkg0.tsx","./d/node_modules/pkg0.d.ts","./d/node_modules/pkg0/index.ts","./d/node_modules/pkg0/index.tsx","./d/node_modules/pkg0/index.d.ts","./d/node_modules/@types/pkg0/package.json","./d/node_modules/@types/pkg0.d.ts","./d/node_modules/@types/pkg0/index.d.ts","./e/ea/node_modules/pkg0/package.json","./e/ea/node_modules/pkg0.ts","./e/ea/node_modules/pkg0.tsx","./e/ea/node_modules/pkg0.d.ts","./e/ea/node_modules/pkg0/index.ts","./e/ea/node_modules/pkg0/index.tsx","./e/ea/node_modules/pkg0/index.d.ts","./e/ea/node_modules/@types/pkg0/package.json","./e/ea/node_modules/@types/pkg0.d.ts","./e/ea/node_modules/@types/pkg0/index.d.ts","./e/node_modules/pkg0/package.json","./e/node_modules/pkg0.ts","./e/node_modules/pkg0.tsx","./e/node_modules/pkg0.d.ts","./e/node_modules/pkg0/index.ts","./e/node_modules/pkg0/index.tsx","./e/node_modules/pkg0/index.d.ts","./e/node_modules/@types/pkg0/package.json","./e/node_modules/@types/pkg0.d.ts","./e/node_modules/@types/pkg0/index.d.ts","./e/ea/eaa/node_modules/pkg0/package.json","./e/ea/eaa/node_modules/pkg0.ts","./e/ea/eaa/node_modules/pkg0.tsx","./e/ea/eaa/node_modules/pkg0.d.ts","./e/ea/eaa/node_modules/pkg0/index.ts","./e/ea/eaa/node_modules/pkg0/index.tsx","./e/ea/eaa/node_modules/pkg0/index.d.ts","./e/ea/eaa/node_modules/@types/pkg0/package.json","./e/ea/eaa/node_modules/@types/pkg0.d.ts","./e/ea/eaa/node_modules/@types/pkg0/index.d.ts","./e/ea/eaa/eaaa/node_modules/pkg0/package.json","./e/ea/eaa/eaaa/node_modules/pkg0.ts","./e/ea/eaa/eaaa/node_modules/pkg0.tsx","./e/ea/eaa/eaaa/node_modules/pkg0.d.ts","./e/ea/eaa/eaaa/node_modules/pkg0/index.ts","./e/ea/eaa/eaaa/node_modules/pkg0/index.tsx","./e/ea/eaa/eaaa/node_modules/pkg0/index.d.ts","./e/ea/eaa/eaaa/node_modules/@types/pkg0/package.json","./e/ea/eaa/eaaa/node_modules/@types/pkg0.d.ts","./e/ea/eaa/eaaa/node_modules/@types/pkg0/index.d.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},"769951468-export interface ImportInterface0 {}",{"version":"7372004325-import type { ImportInterface0 } from \"pkg0\";\n","signature":"-3531856636-export {};\n"},{"version":"10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;","signature":"-6821242887-export declare const x = 10;\n"},{"version":"7372004325-import type { ImportInterface0 } from \"pkg0\";\n","signature":"-3531856636-export {};\n"},{"version":"7372004325-import type { ImportInterface0 } from \"pkg0\";\n","signature":"-3531856636-export {};\n"},{"version":"10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;","signature":"-6821242887-export declare const x = 10;\n"},{"version":"7372004325-import type { ImportInterface0 } from \"pkg0\";\n","signature":"-3531856636-export {};\n"},{"version":"10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;","signature":"-6821242887-export declare const x = 10;\n"},{"version":"7372004325-import type { ImportInterface0 } from \"pkg0\";\n","signature":"-3531856636-export {};\n"},{"version":"7372004325-import type { ImportInterface0 } from \"pkg0\";\n","signature":"-3531856636-export {};\n"},{"version":"7372004325-import type { ImportInterface0 } from \"pkg0\";\n","signature":"-3531856636-export {};\n"},{"version":"7372004325-import type { ImportInterface0 } from \"pkg0\";\n","signature":"-3531856636-export {};\n"},{"version":"7372004325-import type { ImportInterface0 } from \"pkg0\";\n","signature":"-3531856636-export {};\n"},{"version":"7372004325-import type { ImportInterface0 } from \"pkg0\";\n","signature":"-3531856636-export {};\n"},{"version":"7372004325-import type { ImportInterface0 } from \"pkg0\";\n","signature":"-3531856636-export {};\n"},{"version":"7372004325-import type { ImportInterface0 } from \"pkg0\";\n","signature":"-3531856636-export {};\n"}],"options":{"cacheResolutions":true,"composite":true},"fileIdsList":[[2]],"referencedMap":[[5,1],[6,1],[7,1],[10,1],[9,1],[8,1],[11,1],[12,1],[13,1],[14,1],[17,1],[16,1],[15,1],[3,1],[4,1]],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,5,6,7,10,9,8,11,12,13,14,17,16,15,3,2,4],"latestChangedDtsFile":"./e/ea/eaa/eaaa/fileWithImports.d.ts","cacheResolutions":{"resolutions":[{"resolvedModule":{"resolvedFileName":2,"isExternalLibraryImport":true},"failedLookupLocations":[24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,160,161,162,163,164,165,166,167,168,169,170,171,172,173,174,175,176,177,178,179,180,181,182,183,184,185,186,187,188,189]}],"names":["pkg0"],"resolutionEntries":[[1,1]],"modules":[[18,[1]],[19,[1]],[20,[1]],[21,[1]],[22,[1]],[23,[1]]]}},"version":"FakeTSVersion"}

//// [/src/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../a/lib/lib.d.ts",
      "./node_modules/pkg0/index.d.ts",
      "./filewithimports.ts",
      "./randomfileforimport.ts",
      "./a/filewithimports.ts",
      "./b/ba/filewithimports.ts",
      "./b/randomfileforimport.ts",
      "./c/ca/filewithimports.ts",
      "./c/ca/caa/randomfileforimport.ts",
      "./c/ca/caa/caaa/filewithimports.ts",
      "./c/cb/filewithimports.ts",
      "./d/da/daa/daaa/filewithimports.ts",
      "./d/da/daa/filewithimports.ts",
      "./d/da/filewithimports.ts",
      "./e/ea/filewithimports.ts",
      "./e/ea/eaa/filewithimports.ts",
      "./e/ea/eaa/eaaa/filewithimports.ts",
      "./a",
      "./b/ba",
      "./c/ca/caa/caaa",
      "./c/cb",
      "./d/da/daa/daaa",
      "./e/ea/eaa/eaaa",
      "./node_modules/pkg0/package.json",
      "./node_modules/pkg0.ts",
      "./node_modules/pkg0.tsx",
      "./node_modules/pkg0.d.ts",
      "./node_modules/pkg0/index.ts",
      "./node_modules/pkg0/index.tsx",
      "./a/node_modules/pkg0/package.json",
      "./a/node_modules/pkg0.ts",
      "./a/node_modules/pkg0.tsx",
      "./a/node_modules/pkg0.d.ts",
      "./a/node_modules/pkg0/index.ts",
      "./a/node_modules/pkg0/index.tsx",
      "./a/node_modules/pkg0/index.d.ts",
      "./a/node_modules/@types/pkg0/package.json",
      "./a/node_modules/@types/pkg0.d.ts",
      "./a/node_modules/@types/pkg0/index.d.ts",
      "./b/ba/node_modules/pkg0/package.json",
      "./b/ba/node_modules/pkg0.ts",
      "./b/ba/node_modules/pkg0.tsx",
      "./b/ba/node_modules/pkg0.d.ts",
      "./b/ba/node_modules/pkg0/index.ts",
      "./b/ba/node_modules/pkg0/index.tsx",
      "./b/ba/node_modules/pkg0/index.d.ts",
      "./b/ba/node_modules/@types/pkg0/package.json",
      "./b/ba/node_modules/@types/pkg0.d.ts",
      "./b/ba/node_modules/@types/pkg0/index.d.ts",
      "./b/node_modules/pkg0/package.json",
      "./b/node_modules/pkg0.ts",
      "./b/node_modules/pkg0.tsx",
      "./b/node_modules/pkg0.d.ts",
      "./b/node_modules/pkg0/index.ts",
      "./b/node_modules/pkg0/index.tsx",
      "./b/node_modules/pkg0/index.d.ts",
      "./b/node_modules/@types/pkg0/package.json",
      "./b/node_modules/@types/pkg0.d.ts",
      "./b/node_modules/@types/pkg0/index.d.ts",
      "./c/ca/node_modules/pkg0/package.json",
      "./c/ca/node_modules/pkg0.ts",
      "./c/ca/node_modules/pkg0.tsx",
      "./c/ca/node_modules/pkg0.d.ts",
      "./c/ca/node_modules/pkg0/index.ts",
      "./c/ca/node_modules/pkg0/index.tsx",
      "./c/ca/node_modules/pkg0/index.d.ts",
      "./c/ca/node_modules/@types/pkg0/package.json",
      "./c/ca/node_modules/@types/pkg0.d.ts",
      "./c/ca/node_modules/@types/pkg0/index.d.ts",
      "./c/node_modules/pkg0/package.json",
      "./c/node_modules/pkg0.ts",
      "./c/node_modules/pkg0.tsx",
      "./c/node_modules/pkg0.d.ts",
      "./c/node_modules/pkg0/index.ts",
      "./c/node_modules/pkg0/index.tsx",
      "./c/node_modules/pkg0/index.d.ts",
      "./c/node_modules/@types/pkg0/package.json",
      "./c/node_modules/@types/pkg0.d.ts",
      "./c/node_modules/@types/pkg0/index.d.ts",
      "./c/ca/caa/caaa/node_modules/pkg0/package.json",
      "./c/ca/caa/caaa/node_modules/pkg0.ts",
      "./c/ca/caa/caaa/node_modules/pkg0.tsx",
      "./c/ca/caa/caaa/node_modules/pkg0.d.ts",
      "./c/ca/caa/caaa/node_modules/pkg0/index.ts",
      "./c/ca/caa/caaa/node_modules/pkg0/index.tsx",
      "./c/ca/caa/caaa/node_modules/pkg0/index.d.ts",
      "./c/ca/caa/caaa/node_modules/@types/pkg0/package.json",
      "./c/ca/caa/caaa/node_modules/@types/pkg0.d.ts",
      "./c/ca/caa/caaa/node_modules/@types/pkg0/index.d.ts",
      "./c/ca/caa/node_modules/pkg0/package.json",
      "./c/ca/caa/node_modules/pkg0.ts",
      "./c/ca/caa/node_modules/pkg0.tsx",
      "./c/ca/caa/node_modules/pkg0.d.ts",
      "./c/ca/caa/node_modules/pkg0/index.ts",
      "./c/ca/caa/node_modules/pkg0/index.tsx",
      "./c/ca/caa/node_modules/pkg0/index.d.ts",
      "./c/ca/caa/node_modules/@types/pkg0/package.json",
      "./c/ca/caa/node_modules/@types/pkg0.d.ts",
      "./c/ca/caa/node_modules/@types/pkg0/index.d.ts",
      "./c/cb/node_modules/pkg0/package.json",
      "./c/cb/node_modules/pkg0.ts",
      "./c/cb/node_modules/pkg0.tsx",
      "./c/cb/node_modules/pkg0.d.ts",
      "./c/cb/node_modules/pkg0/index.ts",
      "./c/cb/node_modules/pkg0/index.tsx",
      "./c/cb/node_modules/pkg0/index.d.ts",
      "./c/cb/node_modules/@types/pkg0/package.json",
      "./c/cb/node_modules/@types/pkg0.d.ts",
      "./c/cb/node_modules/@types/pkg0/index.d.ts",
      "./d/da/daa/daaa/node_modules/pkg0/package.json",
      "./d/da/daa/daaa/node_modules/pkg0.ts",
      "./d/da/daa/daaa/node_modules/pkg0.tsx",
      "./d/da/daa/daaa/node_modules/pkg0.d.ts",
      "./d/da/daa/daaa/node_modules/pkg0/index.ts",
      "./d/da/daa/daaa/node_modules/pkg0/index.tsx",
      "./d/da/daa/daaa/node_modules/pkg0/index.d.ts",
      "./d/da/daa/daaa/node_modules/@types/pkg0/package.json",
      "./d/da/daa/daaa/node_modules/@types/pkg0.d.ts",
      "./d/da/daa/daaa/node_modules/@types/pkg0/index.d.ts",
      "./d/da/daa/node_modules/pkg0/package.json",
      "./d/da/daa/node_modules/pkg0.ts",
      "./d/da/daa/node_modules/pkg0.tsx",
      "./d/da/daa/node_modules/pkg0.d.ts",
      "./d/da/daa/node_modules/pkg0/index.ts",
      "./d/da/daa/node_modules/pkg0/index.tsx",
      "./d/da/daa/node_modules/pkg0/index.d.ts",
      "./d/da/daa/node_modules/@types/pkg0/package.json",
      "./d/da/daa/node_modules/@types/pkg0.d.ts",
      "./d/da/daa/node_modules/@types/pkg0/index.d.ts",
      "./d/da/node_modules/pkg0/package.json",
      "./d/da/node_modules/pkg0.ts",
      "./d/da/node_modules/pkg0.tsx",
      "./d/da/node_modules/pkg0.d.ts",
      "./d/da/node_modules/pkg0/index.ts",
      "./d/da/node_modules/pkg0/index.tsx",
      "./d/da/node_modules/pkg0/index.d.ts",
      "./d/da/node_modules/@types/pkg0/package.json",
      "./d/da/node_modules/@types/pkg0.d.ts",
      "./d/da/node_modules/@types/pkg0/index.d.ts",
      "./d/node_modules/pkg0/package.json",
      "./d/node_modules/pkg0.ts",
      "./d/node_modules/pkg0.tsx",
      "./d/node_modules/pkg0.d.ts",
      "./d/node_modules/pkg0/index.ts",
      "./d/node_modules/pkg0/index.tsx",
      "./d/node_modules/pkg0/index.d.ts",
      "./d/node_modules/@types/pkg0/package.json",
      "./d/node_modules/@types/pkg0.d.ts",
      "./d/node_modules/@types/pkg0/index.d.ts",
      "./e/ea/node_modules/pkg0/package.json",
      "./e/ea/node_modules/pkg0.ts",
      "./e/ea/node_modules/pkg0.tsx",
      "./e/ea/node_modules/pkg0.d.ts",
      "./e/ea/node_modules/pkg0/index.ts",
      "./e/ea/node_modules/pkg0/index.tsx",
      "./e/ea/node_modules/pkg0/index.d.ts",
      "./e/ea/node_modules/@types/pkg0/package.json",
      "./e/ea/node_modules/@types/pkg0.d.ts",
      "./e/ea/node_modules/@types/pkg0/index.d.ts",
      "./e/node_modules/pkg0/package.json",
      "./e/node_modules/pkg0.ts",
      "./e/node_modules/pkg0.tsx",
      "./e/node_modules/pkg0.d.ts",
      "./e/node_modules/pkg0/index.ts",
      "./e/node_modules/pkg0/index.tsx",
      "./e/node_modules/pkg0/index.d.ts",
      "./e/node_modules/@types/pkg0/package.json",
      "./e/node_modules/@types/pkg0.d.ts",
      "./e/node_modules/@types/pkg0/index.d.ts",
      "./e/ea/eaa/node_modules/pkg0/package.json",
      "./e/ea/eaa/node_modules/pkg0.ts",
      "./e/ea/eaa/node_modules/pkg0.tsx",
      "./e/ea/eaa/node_modules/pkg0.d.ts",
      "./e/ea/eaa/node_modules/pkg0/index.ts",
      "./e/ea/eaa/node_modules/pkg0/index.tsx",
      "./e/ea/eaa/node_modules/pkg0/index.d.ts",
      "./e/ea/eaa/node_modules/@types/pkg0/package.json",
      "./e/ea/eaa/node_modules/@types/pkg0.d.ts",
      "./e/ea/eaa/node_modules/@types/pkg0/index.d.ts",
      "./e/ea/eaa/eaaa/node_modules/pkg0/package.json",
      "./e/ea/eaa/eaaa/node_modules/pkg0.ts",
      "./e/ea/eaa/eaaa/node_modules/pkg0.tsx",
      "./e/ea/eaa/eaaa/node_modules/pkg0.d.ts",
      "./e/ea/eaa/eaaa/node_modules/pkg0/index.ts",
      "./e/ea/eaa/eaaa/node_modules/pkg0/index.tsx",
      "./e/ea/eaa/eaaa/node_modules/pkg0/index.d.ts",
      "./e/ea/eaa/eaaa/node_modules/@types/pkg0/package.json",
      "./e/ea/eaa/eaaa/node_modules/@types/pkg0.d.ts",
      "./e/ea/eaa/eaaa/node_modules/@types/pkg0/index.d.ts"
    ],
    "fileNamesList": [
      [
        "./node_modules/pkg0/index.d.ts"
      ]
    ],
    "fileInfos": {
      "../../a/lib/lib.d.ts": {
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true
      },
      "./node_modules/pkg0/index.d.ts": {
        "version": "769951468-export interface ImportInterface0 {}",
        "signature": "769951468-export interface ImportInterface0 {}"
      },
      "./filewithimports.ts": {
        "version": "7372004325-import type { ImportInterface0 } from \"pkg0\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./randomfileforimport.ts": {
        "version": "10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n"
      },
      "./a/filewithimports.ts": {
        "version": "7372004325-import type { ImportInterface0 } from \"pkg0\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./b/ba/filewithimports.ts": {
        "version": "7372004325-import type { ImportInterface0 } from \"pkg0\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./b/randomfileforimport.ts": {
        "version": "10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n"
      },
      "./c/ca/filewithimports.ts": {
        "version": "7372004325-import type { ImportInterface0 } from \"pkg0\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./c/ca/caa/randomfileforimport.ts": {
        "version": "10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;",
        "signature": "-6821242887-export declare const x = 10;\n"
      },
      "./c/ca/caa/caaa/filewithimports.ts": {
        "version": "7372004325-import type { ImportInterface0 } from \"pkg0\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./c/cb/filewithimports.ts": {
        "version": "7372004325-import type { ImportInterface0 } from \"pkg0\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./d/da/daa/daaa/filewithimports.ts": {
        "version": "7372004325-import type { ImportInterface0 } from \"pkg0\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./d/da/daa/filewithimports.ts": {
        "version": "7372004325-import type { ImportInterface0 } from \"pkg0\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./d/da/filewithimports.ts": {
        "version": "7372004325-import type { ImportInterface0 } from \"pkg0\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./e/ea/filewithimports.ts": {
        "version": "7372004325-import type { ImportInterface0 } from \"pkg0\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./e/ea/eaa/filewithimports.ts": {
        "version": "7372004325-import type { ImportInterface0 } from \"pkg0\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "./e/ea/eaa/eaaa/filewithimports.ts": {
        "version": "7372004325-import type { ImportInterface0 } from \"pkg0\";\n",
        "signature": "-3531856636-export {};\n"
      }
    },
    "options": {
      "cacheResolutions": true,
      "composite": true
    },
    "referencedMap": {
      "./a/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./b/ba/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./b/randomfileforimport.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./c/ca/caa/caaa/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./c/ca/caa/randomfileforimport.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./c/ca/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./c/cb/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./d/da/daa/daaa/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./d/da/daa/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./d/da/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./e/ea/eaa/eaaa/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./e/ea/eaa/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./e/ea/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./randomfileforimport.ts": [
        "./node_modules/pkg0/index.d.ts"
      ]
    },
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../a/lib/lib.d.ts",
      "./a/filewithimports.ts",
      "./b/ba/filewithimports.ts",
      "./b/randomfileforimport.ts",
      "./c/ca/caa/caaa/filewithimports.ts",
      "./c/ca/caa/randomfileforimport.ts",
      "./c/ca/filewithimports.ts",
      "./c/cb/filewithimports.ts",
      "./d/da/daa/daaa/filewithimports.ts",
      "./d/da/daa/filewithimports.ts",
      "./d/da/filewithimports.ts",
      "./e/ea/eaa/eaaa/filewithimports.ts",
      "./e/ea/eaa/filewithimports.ts",
      "./e/ea/filewithimports.ts",
      "./filewithimports.ts",
      "./node_modules/pkg0/index.d.ts",
      "./randomfileforimport.ts"
    ],
    "latestChangedDtsFile": "./e/ea/eaa/eaaa/fileWithImports.d.ts",
    "cacheResolutions": {
      "resolutions": [
        {
          "resolvedModule": {
            "resolvedFileName": "./node_modules/pkg0/index.d.ts",
            "isExternalLibraryImport": true
          },
          "failedLookupLocations": [
            "./node_modules/pkg0/package.json",
            "./node_modules/pkg0.ts",
            "./node_modules/pkg0.tsx",
            "./node_modules/pkg0.d.ts",
            "./node_modules/pkg0/index.ts",
            "./node_modules/pkg0/index.tsx",
            "./a/node_modules/pkg0/package.json",
            "./a/node_modules/pkg0.ts",
            "./a/node_modules/pkg0.tsx",
            "./a/node_modules/pkg0.d.ts",
            "./a/node_modules/pkg0/index.ts",
            "./a/node_modules/pkg0/index.tsx",
            "./a/node_modules/pkg0/index.d.ts",
            "./a/node_modules/@types/pkg0/package.json",
            "./a/node_modules/@types/pkg0.d.ts",
            "./a/node_modules/@types/pkg0/index.d.ts",
            "./b/ba/node_modules/pkg0/package.json",
            "./b/ba/node_modules/pkg0.ts",
            "./b/ba/node_modules/pkg0.tsx",
            "./b/ba/node_modules/pkg0.d.ts",
            "./b/ba/node_modules/pkg0/index.ts",
            "./b/ba/node_modules/pkg0/index.tsx",
            "./b/ba/node_modules/pkg0/index.d.ts",
            "./b/ba/node_modules/@types/pkg0/package.json",
            "./b/ba/node_modules/@types/pkg0.d.ts",
            "./b/ba/node_modules/@types/pkg0/index.d.ts",
            "./b/node_modules/pkg0/package.json",
            "./b/node_modules/pkg0.ts",
            "./b/node_modules/pkg0.tsx",
            "./b/node_modules/pkg0.d.ts",
            "./b/node_modules/pkg0/index.ts",
            "./b/node_modules/pkg0/index.tsx",
            "./b/node_modules/pkg0/index.d.ts",
            "./b/node_modules/@types/pkg0/package.json",
            "./b/node_modules/@types/pkg0.d.ts",
            "./b/node_modules/@types/pkg0/index.d.ts",
            "./c/ca/node_modules/pkg0/package.json",
            "./c/ca/node_modules/pkg0.ts",
            "./c/ca/node_modules/pkg0.tsx",
            "./c/ca/node_modules/pkg0.d.ts",
            "./c/ca/node_modules/pkg0/index.ts",
            "./c/ca/node_modules/pkg0/index.tsx",
            "./c/ca/node_modules/pkg0/index.d.ts",
            "./c/ca/node_modules/@types/pkg0/package.json",
            "./c/ca/node_modules/@types/pkg0.d.ts",
            "./c/ca/node_modules/@types/pkg0/index.d.ts",
            "./c/node_modules/pkg0/package.json",
            "./c/node_modules/pkg0.ts",
            "./c/node_modules/pkg0.tsx",
            "./c/node_modules/pkg0.d.ts",
            "./c/node_modules/pkg0/index.ts",
            "./c/node_modules/pkg0/index.tsx",
            "./c/node_modules/pkg0/index.d.ts",
            "./c/node_modules/@types/pkg0/package.json",
            "./c/node_modules/@types/pkg0.d.ts",
            "./c/node_modules/@types/pkg0/index.d.ts",
            "./c/ca/caa/caaa/node_modules/pkg0/package.json",
            "./c/ca/caa/caaa/node_modules/pkg0.ts",
            "./c/ca/caa/caaa/node_modules/pkg0.tsx",
            "./c/ca/caa/caaa/node_modules/pkg0.d.ts",
            "./c/ca/caa/caaa/node_modules/pkg0/index.ts",
            "./c/ca/caa/caaa/node_modules/pkg0/index.tsx",
            "./c/ca/caa/caaa/node_modules/pkg0/index.d.ts",
            "./c/ca/caa/caaa/node_modules/@types/pkg0/package.json",
            "./c/ca/caa/caaa/node_modules/@types/pkg0.d.ts",
            "./c/ca/caa/caaa/node_modules/@types/pkg0/index.d.ts",
            "./c/ca/caa/node_modules/pkg0/package.json",
            "./c/ca/caa/node_modules/pkg0.ts",
            "./c/ca/caa/node_modules/pkg0.tsx",
            "./c/ca/caa/node_modules/pkg0.d.ts",
            "./c/ca/caa/node_modules/pkg0/index.ts",
            "./c/ca/caa/node_modules/pkg0/index.tsx",
            "./c/ca/caa/node_modules/pkg0/index.d.ts",
            "./c/ca/caa/node_modules/@types/pkg0/package.json",
            "./c/ca/caa/node_modules/@types/pkg0.d.ts",
            "./c/ca/caa/node_modules/@types/pkg0/index.d.ts",
            "./c/cb/node_modules/pkg0/package.json",
            "./c/cb/node_modules/pkg0.ts",
            "./c/cb/node_modules/pkg0.tsx",
            "./c/cb/node_modules/pkg0.d.ts",
            "./c/cb/node_modules/pkg0/index.ts",
            "./c/cb/node_modules/pkg0/index.tsx",
            "./c/cb/node_modules/pkg0/index.d.ts",
            "./c/cb/node_modules/@types/pkg0/package.json",
            "./c/cb/node_modules/@types/pkg0.d.ts",
            "./c/cb/node_modules/@types/pkg0/index.d.ts",
            "./d/da/daa/daaa/node_modules/pkg0/package.json",
            "./d/da/daa/daaa/node_modules/pkg0.ts",
            "./d/da/daa/daaa/node_modules/pkg0.tsx",
            "./d/da/daa/daaa/node_modules/pkg0.d.ts",
            "./d/da/daa/daaa/node_modules/pkg0/index.ts",
            "./d/da/daa/daaa/node_modules/pkg0/index.tsx",
            "./d/da/daa/daaa/node_modules/pkg0/index.d.ts",
            "./d/da/daa/daaa/node_modules/@types/pkg0/package.json",
            "./d/da/daa/daaa/node_modules/@types/pkg0.d.ts",
            "./d/da/daa/daaa/node_modules/@types/pkg0/index.d.ts",
            "./d/da/daa/node_modules/pkg0/package.json",
            "./d/da/daa/node_modules/pkg0.ts",
            "./d/da/daa/node_modules/pkg0.tsx",
            "./d/da/daa/node_modules/pkg0.d.ts",
            "./d/da/daa/node_modules/pkg0/index.ts",
            "./d/da/daa/node_modules/pkg0/index.tsx",
            "./d/da/daa/node_modules/pkg0/index.d.ts",
            "./d/da/daa/node_modules/@types/pkg0/package.json",
            "./d/da/daa/node_modules/@types/pkg0.d.ts",
            "./d/da/daa/node_modules/@types/pkg0/index.d.ts",
            "./d/da/node_modules/pkg0/package.json",
            "./d/da/node_modules/pkg0.ts",
            "./d/da/node_modules/pkg0.tsx",
            "./d/da/node_modules/pkg0.d.ts",
            "./d/da/node_modules/pkg0/index.ts",
            "./d/da/node_modules/pkg0/index.tsx",
            "./d/da/node_modules/pkg0/index.d.ts",
            "./d/da/node_modules/@types/pkg0/package.json",
            "./d/da/node_modules/@types/pkg0.d.ts",
            "./d/da/node_modules/@types/pkg0/index.d.ts",
            "./d/node_modules/pkg0/package.json",
            "./d/node_modules/pkg0.ts",
            "./d/node_modules/pkg0.tsx",
            "./d/node_modules/pkg0.d.ts",
            "./d/node_modules/pkg0/index.ts",
            "./d/node_modules/pkg0/index.tsx",
            "./d/node_modules/pkg0/index.d.ts",
            "./d/node_modules/@types/pkg0/package.json",
            "./d/node_modules/@types/pkg0.d.ts",
            "./d/node_modules/@types/pkg0/index.d.ts",
            "./e/ea/node_modules/pkg0/package.json",
            "./e/ea/node_modules/pkg0.ts",
            "./e/ea/node_modules/pkg0.tsx",
            "./e/ea/node_modules/pkg0.d.ts",
            "./e/ea/node_modules/pkg0/index.ts",
            "./e/ea/node_modules/pkg0/index.tsx",
            "./e/ea/node_modules/pkg0/index.d.ts",
            "./e/ea/node_modules/@types/pkg0/package.json",
            "./e/ea/node_modules/@types/pkg0.d.ts",
            "./e/ea/node_modules/@types/pkg0/index.d.ts",
            "./e/node_modules/pkg0/package.json",
            "./e/node_modules/pkg0.ts",
            "./e/node_modules/pkg0.tsx",
            "./e/node_modules/pkg0.d.ts",
            "./e/node_modules/pkg0/index.ts",
            "./e/node_modules/pkg0/index.tsx",
            "./e/node_modules/pkg0/index.d.ts",
            "./e/node_modules/@types/pkg0/package.json",
            "./e/node_modules/@types/pkg0.d.ts",
            "./e/node_modules/@types/pkg0/index.d.ts",
            "./e/ea/eaa/node_modules/pkg0/package.json",
            "./e/ea/eaa/node_modules/pkg0.ts",
            "./e/ea/eaa/node_modules/pkg0.tsx",
            "./e/ea/eaa/node_modules/pkg0.d.ts",
            "./e/ea/eaa/node_modules/pkg0/index.ts",
            "./e/ea/eaa/node_modules/pkg0/index.tsx",
            "./e/ea/eaa/node_modules/pkg0/index.d.ts",
            "./e/ea/eaa/node_modules/@types/pkg0/package.json",
            "./e/ea/eaa/node_modules/@types/pkg0.d.ts",
            "./e/ea/eaa/node_modules/@types/pkg0/index.d.ts",
            "./e/ea/eaa/eaaa/node_modules/pkg0/package.json",
            "./e/ea/eaa/eaaa/node_modules/pkg0.ts",
            "./e/ea/eaa/eaaa/node_modules/pkg0.tsx",
            "./e/ea/eaa/eaaa/node_modules/pkg0.d.ts",
            "./e/ea/eaa/eaaa/node_modules/pkg0/index.ts",
            "./e/ea/eaa/eaaa/node_modules/pkg0/index.tsx",
            "./e/ea/eaa/eaaa/node_modules/pkg0/index.d.ts",
            "./e/ea/eaa/eaaa/node_modules/@types/pkg0/package.json",
            "./e/ea/eaa/eaaa/node_modules/@types/pkg0.d.ts",
            "./e/ea/eaa/eaaa/node_modules/@types/pkg0/index.d.ts"
          ]
        }
      ],
      "names": [
        "pkg0"
      ],
      "resolutionEntries": [
        [
          "pkg0",
          {
            "resolvedModule": {
              "resolvedFileName": "./node_modules/pkg0/index.d.ts",
              "isExternalLibraryImport": true
            },
            "failedLookupLocations": [
              "./node_modules/pkg0/package.json",
              "./node_modules/pkg0.ts",
              "./node_modules/pkg0.tsx",
              "./node_modules/pkg0.d.ts",
              "./node_modules/pkg0/index.ts",
              "./node_modules/pkg0/index.tsx",
              "./a/node_modules/pkg0/package.json",
              "./a/node_modules/pkg0.ts",
              "./a/node_modules/pkg0.tsx",
              "./a/node_modules/pkg0.d.ts",
              "./a/node_modules/pkg0/index.ts",
              "./a/node_modules/pkg0/index.tsx",
              "./a/node_modules/pkg0/index.d.ts",
              "./a/node_modules/@types/pkg0/package.json",
              "./a/node_modules/@types/pkg0.d.ts",
              "./a/node_modules/@types/pkg0/index.d.ts",
              "./b/ba/node_modules/pkg0/package.json",
              "./b/ba/node_modules/pkg0.ts",
              "./b/ba/node_modules/pkg0.tsx",
              "./b/ba/node_modules/pkg0.d.ts",
              "./b/ba/node_modules/pkg0/index.ts",
              "./b/ba/node_modules/pkg0/index.tsx",
              "./b/ba/node_modules/pkg0/index.d.ts",
              "./b/ba/node_modules/@types/pkg0/package.json",
              "./b/ba/node_modules/@types/pkg0.d.ts",
              "./b/ba/node_modules/@types/pkg0/index.d.ts",
              "./b/node_modules/pkg0/package.json",
              "./b/node_modules/pkg0.ts",
              "./b/node_modules/pkg0.tsx",
              "./b/node_modules/pkg0.d.ts",
              "./b/node_modules/pkg0/index.ts",
              "./b/node_modules/pkg0/index.tsx",
              "./b/node_modules/pkg0/index.d.ts",
              "./b/node_modules/@types/pkg0/package.json",
              "./b/node_modules/@types/pkg0.d.ts",
              "./b/node_modules/@types/pkg0/index.d.ts",
              "./c/ca/node_modules/pkg0/package.json",
              "./c/ca/node_modules/pkg0.ts",
              "./c/ca/node_modules/pkg0.tsx",
              "./c/ca/node_modules/pkg0.d.ts",
              "./c/ca/node_modules/pkg0/index.ts",
              "./c/ca/node_modules/pkg0/index.tsx",
              "./c/ca/node_modules/pkg0/index.d.ts",
              "./c/ca/node_modules/@types/pkg0/package.json",
              "./c/ca/node_modules/@types/pkg0.d.ts",
              "./c/ca/node_modules/@types/pkg0/index.d.ts",
              "./c/node_modules/pkg0/package.json",
              "./c/node_modules/pkg0.ts",
              "./c/node_modules/pkg0.tsx",
              "./c/node_modules/pkg0.d.ts",
              "./c/node_modules/pkg0/index.ts",
              "./c/node_modules/pkg0/index.tsx",
              "./c/node_modules/pkg0/index.d.ts",
              "./c/node_modules/@types/pkg0/package.json",
              "./c/node_modules/@types/pkg0.d.ts",
              "./c/node_modules/@types/pkg0/index.d.ts",
              "./c/ca/caa/caaa/node_modules/pkg0/package.json",
              "./c/ca/caa/caaa/node_modules/pkg0.ts",
              "./c/ca/caa/caaa/node_modules/pkg0.tsx",
              "./c/ca/caa/caaa/node_modules/pkg0.d.ts",
              "./c/ca/caa/caaa/node_modules/pkg0/index.ts",
              "./c/ca/caa/caaa/node_modules/pkg0/index.tsx",
              "./c/ca/caa/caaa/node_modules/pkg0/index.d.ts",
              "./c/ca/caa/caaa/node_modules/@types/pkg0/package.json",
              "./c/ca/caa/caaa/node_modules/@types/pkg0.d.ts",
              "./c/ca/caa/caaa/node_modules/@types/pkg0/index.d.ts",
              "./c/ca/caa/node_modules/pkg0/package.json",
              "./c/ca/caa/node_modules/pkg0.ts",
              "./c/ca/caa/node_modules/pkg0.tsx",
              "./c/ca/caa/node_modules/pkg0.d.ts",
              "./c/ca/caa/node_modules/pkg0/index.ts",
              "./c/ca/caa/node_modules/pkg0/index.tsx",
              "./c/ca/caa/node_modules/pkg0/index.d.ts",
              "./c/ca/caa/node_modules/@types/pkg0/package.json",
              "./c/ca/caa/node_modules/@types/pkg0.d.ts",
              "./c/ca/caa/node_modules/@types/pkg0/index.d.ts",
              "./c/cb/node_modules/pkg0/package.json",
              "./c/cb/node_modules/pkg0.ts",
              "./c/cb/node_modules/pkg0.tsx",
              "./c/cb/node_modules/pkg0.d.ts",
              "./c/cb/node_modules/pkg0/index.ts",
              "./c/cb/node_modules/pkg0/index.tsx",
              "./c/cb/node_modules/pkg0/index.d.ts",
              "./c/cb/node_modules/@types/pkg0/package.json",
              "./c/cb/node_modules/@types/pkg0.d.ts",
              "./c/cb/node_modules/@types/pkg0/index.d.ts",
              "./d/da/daa/daaa/node_modules/pkg0/package.json",
              "./d/da/daa/daaa/node_modules/pkg0.ts",
              "./d/da/daa/daaa/node_modules/pkg0.tsx",
              "./d/da/daa/daaa/node_modules/pkg0.d.ts",
              "./d/da/daa/daaa/node_modules/pkg0/index.ts",
              "./d/da/daa/daaa/node_modules/pkg0/index.tsx",
              "./d/da/daa/daaa/node_modules/pkg0/index.d.ts",
              "./d/da/daa/daaa/node_modules/@types/pkg0/package.json",
              "./d/da/daa/daaa/node_modules/@types/pkg0.d.ts",
              "./d/da/daa/daaa/node_modules/@types/pkg0/index.d.ts",
              "./d/da/daa/node_modules/pkg0/package.json",
              "./d/da/daa/node_modules/pkg0.ts",
              "./d/da/daa/node_modules/pkg0.tsx",
              "./d/da/daa/node_modules/pkg0.d.ts",
              "./d/da/daa/node_modules/pkg0/index.ts",
              "./d/da/daa/node_modules/pkg0/index.tsx",
              "./d/da/daa/node_modules/pkg0/index.d.ts",
              "./d/da/daa/node_modules/@types/pkg0/package.json",
              "./d/da/daa/node_modules/@types/pkg0.d.ts",
              "./d/da/daa/node_modules/@types/pkg0/index.d.ts",
              "./d/da/node_modules/pkg0/package.json",
              "./d/da/node_modules/pkg0.ts",
              "./d/da/node_modules/pkg0.tsx",
              "./d/da/node_modules/pkg0.d.ts",
              "./d/da/node_modules/pkg0/index.ts",
              "./d/da/node_modules/pkg0/index.tsx",
              "./d/da/node_modules/pkg0/index.d.ts",
              "./d/da/node_modules/@types/pkg0/package.json",
              "./d/da/node_modules/@types/pkg0.d.ts",
              "./d/da/node_modules/@types/pkg0/index.d.ts",
              "./d/node_modules/pkg0/package.json",
              "./d/node_modules/pkg0.ts",
              "./d/node_modules/pkg0.tsx",
              "./d/node_modules/pkg0.d.ts",
              "./d/node_modules/pkg0/index.ts",
              "./d/node_modules/pkg0/index.tsx",
              "./d/node_modules/pkg0/index.d.ts",
              "./d/node_modules/@types/pkg0/package.json",
              "./d/node_modules/@types/pkg0.d.ts",
              "./d/node_modules/@types/pkg0/index.d.ts",
              "./e/ea/node_modules/pkg0/package.json",
              "./e/ea/node_modules/pkg0.ts",
              "./e/ea/node_modules/pkg0.tsx",
              "./e/ea/node_modules/pkg0.d.ts",
              "./e/ea/node_modules/pkg0/index.ts",
              "./e/ea/node_modules/pkg0/index.tsx",
              "./e/ea/node_modules/pkg0/index.d.ts",
              "./e/ea/node_modules/@types/pkg0/package.json",
              "./e/ea/node_modules/@types/pkg0.d.ts",
              "./e/ea/node_modules/@types/pkg0/index.d.ts",
              "./e/node_modules/pkg0/package.json",
              "./e/node_modules/pkg0.ts",
              "./e/node_modules/pkg0.tsx",
              "./e/node_modules/pkg0.d.ts",
              "./e/node_modules/pkg0/index.ts",
              "./e/node_modules/pkg0/index.tsx",
              "./e/node_modules/pkg0/index.d.ts",
              "./e/node_modules/@types/pkg0/package.json",
              "./e/node_modules/@types/pkg0.d.ts",
              "./e/node_modules/@types/pkg0/index.d.ts",
              "./e/ea/eaa/node_modules/pkg0/package.json",
              "./e/ea/eaa/node_modules/pkg0.ts",
              "./e/ea/eaa/node_modules/pkg0.tsx",
              "./e/ea/eaa/node_modules/pkg0.d.ts",
              "./e/ea/eaa/node_modules/pkg0/index.ts",
              "./e/ea/eaa/node_modules/pkg0/index.tsx",
              "./e/ea/eaa/node_modules/pkg0/index.d.ts",
              "./e/ea/eaa/node_modules/@types/pkg0/package.json",
              "./e/ea/eaa/node_modules/@types/pkg0.d.ts",
              "./e/ea/eaa/node_modules/@types/pkg0/index.d.ts",
              "./e/ea/eaa/eaaa/node_modules/pkg0/package.json",
              "./e/ea/eaa/eaaa/node_modules/pkg0.ts",
              "./e/ea/eaa/eaaa/node_modules/pkg0.tsx",
              "./e/ea/eaa/eaaa/node_modules/pkg0.d.ts",
              "./e/ea/eaa/eaaa/node_modules/pkg0/index.ts",
              "./e/ea/eaa/eaaa/node_modules/pkg0/index.tsx",
              "./e/ea/eaa/eaaa/node_modules/pkg0/index.d.ts",
              "./e/ea/eaa/eaaa/node_modules/@types/pkg0/package.json",
              "./e/ea/eaa/eaaa/node_modules/@types/pkg0.d.ts",
              "./e/ea/eaa/eaaa/node_modules/@types/pkg0/index.d.ts"
            ]
          }
        ]
      ],
      "modules": [
        [
          "./a",
          [
            [
              "pkg0",
              {
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                },
                "failedLookupLocations": [
                  "./node_modules/pkg0/package.json",
                  "./node_modules/pkg0.ts",
                  "./node_modules/pkg0.tsx",
                  "./node_modules/pkg0.d.ts",
                  "./node_modules/pkg0/index.ts",
                  "./node_modules/pkg0/index.tsx",
                  "./a/node_modules/pkg0/package.json",
                  "./a/node_modules/pkg0.ts",
                  "./a/node_modules/pkg0.tsx",
                  "./a/node_modules/pkg0.d.ts",
                  "./a/node_modules/pkg0/index.ts",
                  "./a/node_modules/pkg0/index.tsx",
                  "./a/node_modules/pkg0/index.d.ts",
                  "./a/node_modules/@types/pkg0/package.json",
                  "./a/node_modules/@types/pkg0.d.ts",
                  "./a/node_modules/@types/pkg0/index.d.ts",
                  "./b/ba/node_modules/pkg0/package.json",
                  "./b/ba/node_modules/pkg0.ts",
                  "./b/ba/node_modules/pkg0.tsx",
                  "./b/ba/node_modules/pkg0.d.ts",
                  "./b/ba/node_modules/pkg0/index.ts",
                  "./b/ba/node_modules/pkg0/index.tsx",
                  "./b/ba/node_modules/pkg0/index.d.ts",
                  "./b/ba/node_modules/@types/pkg0/package.json",
                  "./b/ba/node_modules/@types/pkg0.d.ts",
                  "./b/ba/node_modules/@types/pkg0/index.d.ts",
                  "./b/node_modules/pkg0/package.json",
                  "./b/node_modules/pkg0.ts",
                  "./b/node_modules/pkg0.tsx",
                  "./b/node_modules/pkg0.d.ts",
                  "./b/node_modules/pkg0/index.ts",
                  "./b/node_modules/pkg0/index.tsx",
                  "./b/node_modules/pkg0/index.d.ts",
                  "./b/node_modules/@types/pkg0/package.json",
                  "./b/node_modules/@types/pkg0.d.ts",
                  "./b/node_modules/@types/pkg0/index.d.ts",
                  "./c/ca/node_modules/pkg0/package.json",
                  "./c/ca/node_modules/pkg0.ts",
                  "./c/ca/node_modules/pkg0.tsx",
                  "./c/ca/node_modules/pkg0.d.ts",
                  "./c/ca/node_modules/pkg0/index.ts",
                  "./c/ca/node_modules/pkg0/index.tsx",
                  "./c/ca/node_modules/pkg0/index.d.ts",
                  "./c/ca/node_modules/@types/pkg0/package.json",
                  "./c/ca/node_modules/@types/pkg0.d.ts",
                  "./c/ca/node_modules/@types/pkg0/index.d.ts",
                  "./c/node_modules/pkg0/package.json",
                  "./c/node_modules/pkg0.ts",
                  "./c/node_modules/pkg0.tsx",
                  "./c/node_modules/pkg0.d.ts",
                  "./c/node_modules/pkg0/index.ts",
                  "./c/node_modules/pkg0/index.tsx",
                  "./c/node_modules/pkg0/index.d.ts",
                  "./c/node_modules/@types/pkg0/package.json",
                  "./c/node_modules/@types/pkg0.d.ts",
                  "./c/node_modules/@types/pkg0/index.d.ts",
                  "./c/ca/caa/caaa/node_modules/pkg0/package.json",
                  "./c/ca/caa/caaa/node_modules/pkg0.ts",
                  "./c/ca/caa/caaa/node_modules/pkg0.tsx",
                  "./c/ca/caa/caaa/node_modules/pkg0.d.ts",
                  "./c/ca/caa/caaa/node_modules/pkg0/index.ts",
                  "./c/ca/caa/caaa/node_modules/pkg0/index.tsx",
                  "./c/ca/caa/caaa/node_modules/pkg0/index.d.ts",
                  "./c/ca/caa/caaa/node_modules/@types/pkg0/package.json",
                  "./c/ca/caa/caaa/node_modules/@types/pkg0.d.ts",
                  "./c/ca/caa/caaa/node_modules/@types/pkg0/index.d.ts",
                  "./c/ca/caa/node_modules/pkg0/package.json",
                  "./c/ca/caa/node_modules/pkg0.ts",
                  "./c/ca/caa/node_modules/pkg0.tsx",
                  "./c/ca/caa/node_modules/pkg0.d.ts",
                  "./c/ca/caa/node_modules/pkg0/index.ts",
                  "./c/ca/caa/node_modules/pkg0/index.tsx",
                  "./c/ca/caa/node_modules/pkg0/index.d.ts",
                  "./c/ca/caa/node_modules/@types/pkg0/package.json",
                  "./c/ca/caa/node_modules/@types/pkg0.d.ts",
                  "./c/ca/caa/node_modules/@types/pkg0/index.d.ts",
                  "./c/cb/node_modules/pkg0/package.json",
                  "./c/cb/node_modules/pkg0.ts",
                  "./c/cb/node_modules/pkg0.tsx",
                  "./c/cb/node_modules/pkg0.d.ts",
                  "./c/cb/node_modules/pkg0/index.ts",
                  "./c/cb/node_modules/pkg0/index.tsx",
                  "./c/cb/node_modules/pkg0/index.d.ts",
                  "./c/cb/node_modules/@types/pkg0/package.json",
                  "./c/cb/node_modules/@types/pkg0.d.ts",
                  "./c/cb/node_modules/@types/pkg0/index.d.ts",
                  "./d/da/daa/daaa/node_modules/pkg0/package.json",
                  "./d/da/daa/daaa/node_modules/pkg0.ts",
                  "./d/da/daa/daaa/node_modules/pkg0.tsx",
                  "./d/da/daa/daaa/node_modules/pkg0.d.ts",
                  "./d/da/daa/daaa/node_modules/pkg0/index.ts",
                  "./d/da/daa/daaa/node_modules/pkg0/index.tsx",
                  "./d/da/daa/daaa/node_modules/pkg0/index.d.ts",
                  "./d/da/daa/daaa/node_modules/@types/pkg0/package.json",
                  "./d/da/daa/daaa/node_modules/@types/pkg0.d.ts",
                  "./d/da/daa/daaa/node_modules/@types/pkg0/index.d.ts",
                  "./d/da/daa/node_modules/pkg0/package.json",
                  "./d/da/daa/node_modules/pkg0.ts",
                  "./d/da/daa/node_modules/pkg0.tsx",
                  "./d/da/daa/node_modules/pkg0.d.ts",
                  "./d/da/daa/node_modules/pkg0/index.ts",
                  "./d/da/daa/node_modules/pkg0/index.tsx",
                  "./d/da/daa/node_modules/pkg0/index.d.ts",
                  "./d/da/daa/node_modules/@types/pkg0/package.json",
                  "./d/da/daa/node_modules/@types/pkg0.d.ts",
                  "./d/da/daa/node_modules/@types/pkg0/index.d.ts",
                  "./d/da/node_modules/pkg0/package.json",
                  "./d/da/node_modules/pkg0.ts",
                  "./d/da/node_modules/pkg0.tsx",
                  "./d/da/node_modules/pkg0.d.ts",
                  "./d/da/node_modules/pkg0/index.ts",
                  "./d/da/node_modules/pkg0/index.tsx",
                  "./d/da/node_modules/pkg0/index.d.ts",
                  "./d/da/node_modules/@types/pkg0/package.json",
                  "./d/da/node_modules/@types/pkg0.d.ts",
                  "./d/da/node_modules/@types/pkg0/index.d.ts",
                  "./d/node_modules/pkg0/package.json",
                  "./d/node_modules/pkg0.ts",
                  "./d/node_modules/pkg0.tsx",
                  "./d/node_modules/pkg0.d.ts",
                  "./d/node_modules/pkg0/index.ts",
                  "./d/node_modules/pkg0/index.tsx",
                  "./d/node_modules/pkg0/index.d.ts",
                  "./d/node_modules/@types/pkg0/package.json",
                  "./d/node_modules/@types/pkg0.d.ts",
                  "./d/node_modules/@types/pkg0/index.d.ts",
                  "./e/ea/node_modules/pkg0/package.json",
                  "./e/ea/node_modules/pkg0.ts",
                  "./e/ea/node_modules/pkg0.tsx",
                  "./e/ea/node_modules/pkg0.d.ts",
                  "./e/ea/node_modules/pkg0/index.ts",
                  "./e/ea/node_modules/pkg0/index.tsx",
                  "./e/ea/node_modules/pkg0/index.d.ts",
                  "./e/ea/node_modules/@types/pkg0/package.json",
                  "./e/ea/node_modules/@types/pkg0.d.ts",
                  "./e/ea/node_modules/@types/pkg0/index.d.ts",
                  "./e/node_modules/pkg0/package.json",
                  "./e/node_modules/pkg0.ts",
                  "./e/node_modules/pkg0.tsx",
                  "./e/node_modules/pkg0.d.ts",
                  "./e/node_modules/pkg0/index.ts",
                  "./e/node_modules/pkg0/index.tsx",
                  "./e/node_modules/pkg0/index.d.ts",
                  "./e/node_modules/@types/pkg0/package.json",
                  "./e/node_modules/@types/pkg0.d.ts",
                  "./e/node_modules/@types/pkg0/index.d.ts",
                  "./e/ea/eaa/node_modules/pkg0/package.json",
                  "./e/ea/eaa/node_modules/pkg0.ts",
                  "./e/ea/eaa/node_modules/pkg0.tsx",
                  "./e/ea/eaa/node_modules/pkg0.d.ts",
                  "./e/ea/eaa/node_modules/pkg0/index.ts",
                  "./e/ea/eaa/node_modules/pkg0/index.tsx",
                  "./e/ea/eaa/node_modules/pkg0/index.d.ts",
                  "./e/ea/eaa/node_modules/@types/pkg0/package.json",
                  "./e/ea/eaa/node_modules/@types/pkg0.d.ts",
                  "./e/ea/eaa/node_modules/@types/pkg0/index.d.ts",
                  "./e/ea/eaa/eaaa/node_modules/pkg0/package.json",
                  "./e/ea/eaa/eaaa/node_modules/pkg0.ts",
                  "./e/ea/eaa/eaaa/node_modules/pkg0.tsx",
                  "./e/ea/eaa/eaaa/node_modules/pkg0.d.ts",
                  "./e/ea/eaa/eaaa/node_modules/pkg0/index.ts",
                  "./e/ea/eaa/eaaa/node_modules/pkg0/index.tsx",
                  "./e/ea/eaa/eaaa/node_modules/pkg0/index.d.ts",
                  "./e/ea/eaa/eaaa/node_modules/@types/pkg0/package.json",
                  "./e/ea/eaa/eaaa/node_modules/@types/pkg0.d.ts",
                  "./e/ea/eaa/eaaa/node_modules/@types/pkg0/index.d.ts"
                ]
              }
            ]
          ]
        ],
        [
          "./b/ba",
          [
            [
              "pkg0",
              {
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                },
                "failedLookupLocations": [
                  "./node_modules/pkg0/package.json",
                  "./node_modules/pkg0.ts",
                  "./node_modules/pkg0.tsx",
                  "./node_modules/pkg0.d.ts",
                  "./node_modules/pkg0/index.ts",
                  "./node_modules/pkg0/index.tsx",
                  "./a/node_modules/pkg0/package.json",
                  "./a/node_modules/pkg0.ts",
                  "./a/node_modules/pkg0.tsx",
                  "./a/node_modules/pkg0.d.ts",
                  "./a/node_modules/pkg0/index.ts",
                  "./a/node_modules/pkg0/index.tsx",
                  "./a/node_modules/pkg0/index.d.ts",
                  "./a/node_modules/@types/pkg0/package.json",
                  "./a/node_modules/@types/pkg0.d.ts",
                  "./a/node_modules/@types/pkg0/index.d.ts",
                  "./b/ba/node_modules/pkg0/package.json",
                  "./b/ba/node_modules/pkg0.ts",
                  "./b/ba/node_modules/pkg0.tsx",
                  "./b/ba/node_modules/pkg0.d.ts",
                  "./b/ba/node_modules/pkg0/index.ts",
                  "./b/ba/node_modules/pkg0/index.tsx",
                  "./b/ba/node_modules/pkg0/index.d.ts",
                  "./b/ba/node_modules/@types/pkg0/package.json",
                  "./b/ba/node_modules/@types/pkg0.d.ts",
                  "./b/ba/node_modules/@types/pkg0/index.d.ts",
                  "./b/node_modules/pkg0/package.json",
                  "./b/node_modules/pkg0.ts",
                  "./b/node_modules/pkg0.tsx",
                  "./b/node_modules/pkg0.d.ts",
                  "./b/node_modules/pkg0/index.ts",
                  "./b/node_modules/pkg0/index.tsx",
                  "./b/node_modules/pkg0/index.d.ts",
                  "./b/node_modules/@types/pkg0/package.json",
                  "./b/node_modules/@types/pkg0.d.ts",
                  "./b/node_modules/@types/pkg0/index.d.ts",
                  "./c/ca/node_modules/pkg0/package.json",
                  "./c/ca/node_modules/pkg0.ts",
                  "./c/ca/node_modules/pkg0.tsx",
                  "./c/ca/node_modules/pkg0.d.ts",
                  "./c/ca/node_modules/pkg0/index.ts",
                  "./c/ca/node_modules/pkg0/index.tsx",
                  "./c/ca/node_modules/pkg0/index.d.ts",
                  "./c/ca/node_modules/@types/pkg0/package.json",
                  "./c/ca/node_modules/@types/pkg0.d.ts",
                  "./c/ca/node_modules/@types/pkg0/index.d.ts",
                  "./c/node_modules/pkg0/package.json",
                  "./c/node_modules/pkg0.ts",
                  "./c/node_modules/pkg0.tsx",
                  "./c/node_modules/pkg0.d.ts",
                  "./c/node_modules/pkg0/index.ts",
                  "./c/node_modules/pkg0/index.tsx",
                  "./c/node_modules/pkg0/index.d.ts",
                  "./c/node_modules/@types/pkg0/package.json",
                  "./c/node_modules/@types/pkg0.d.ts",
                  "./c/node_modules/@types/pkg0/index.d.ts",
                  "./c/ca/caa/caaa/node_modules/pkg0/package.json",
                  "./c/ca/caa/caaa/node_modules/pkg0.ts",
                  "./c/ca/caa/caaa/node_modules/pkg0.tsx",
                  "./c/ca/caa/caaa/node_modules/pkg0.d.ts",
                  "./c/ca/caa/caaa/node_modules/pkg0/index.ts",
                  "./c/ca/caa/caaa/node_modules/pkg0/index.tsx",
                  "./c/ca/caa/caaa/node_modules/pkg0/index.d.ts",
                  "./c/ca/caa/caaa/node_modules/@types/pkg0/package.json",
                  "./c/ca/caa/caaa/node_modules/@types/pkg0.d.ts",
                  "./c/ca/caa/caaa/node_modules/@types/pkg0/index.d.ts",
                  "./c/ca/caa/node_modules/pkg0/package.json",
                  "./c/ca/caa/node_modules/pkg0.ts",
                  "./c/ca/caa/node_modules/pkg0.tsx",
                  "./c/ca/caa/node_modules/pkg0.d.ts",
                  "./c/ca/caa/node_modules/pkg0/index.ts",
                  "./c/ca/caa/node_modules/pkg0/index.tsx",
                  "./c/ca/caa/node_modules/pkg0/index.d.ts",
                  "./c/ca/caa/node_modules/@types/pkg0/package.json",
                  "./c/ca/caa/node_modules/@types/pkg0.d.ts",
                  "./c/ca/caa/node_modules/@types/pkg0/index.d.ts",
                  "./c/cb/node_modules/pkg0/package.json",
                  "./c/cb/node_modules/pkg0.ts",
                  "./c/cb/node_modules/pkg0.tsx",
                  "./c/cb/node_modules/pkg0.d.ts",
                  "./c/cb/node_modules/pkg0/index.ts",
                  "./c/cb/node_modules/pkg0/index.tsx",
                  "./c/cb/node_modules/pkg0/index.d.ts",
                  "./c/cb/node_modules/@types/pkg0/package.json",
                  "./c/cb/node_modules/@types/pkg0.d.ts",
                  "./c/cb/node_modules/@types/pkg0/index.d.ts",
                  "./d/da/daa/daaa/node_modules/pkg0/package.json",
                  "./d/da/daa/daaa/node_modules/pkg0.ts",
                  "./d/da/daa/daaa/node_modules/pkg0.tsx",
                  "./d/da/daa/daaa/node_modules/pkg0.d.ts",
                  "./d/da/daa/daaa/node_modules/pkg0/index.ts",
                  "./d/da/daa/daaa/node_modules/pkg0/index.tsx",
                  "./d/da/daa/daaa/node_modules/pkg0/index.d.ts",
                  "./d/da/daa/daaa/node_modules/@types/pkg0/package.json",
                  "./d/da/daa/daaa/node_modules/@types/pkg0.d.ts",
                  "./d/da/daa/daaa/node_modules/@types/pkg0/index.d.ts",
                  "./d/da/daa/node_modules/pkg0/package.json",
                  "./d/da/daa/node_modules/pkg0.ts",
                  "./d/da/daa/node_modules/pkg0.tsx",
                  "./d/da/daa/node_modules/pkg0.d.ts",
                  "./d/da/daa/node_modules/pkg0/index.ts",
                  "./d/da/daa/node_modules/pkg0/index.tsx",
                  "./d/da/daa/node_modules/pkg0/index.d.ts",
                  "./d/da/daa/node_modules/@types/pkg0/package.json",
                  "./d/da/daa/node_modules/@types/pkg0.d.ts",
                  "./d/da/daa/node_modules/@types/pkg0/index.d.ts",
                  "./d/da/node_modules/pkg0/package.json",
                  "./d/da/node_modules/pkg0.ts",
                  "./d/da/node_modules/pkg0.tsx",
                  "./d/da/node_modules/pkg0.d.ts",
                  "./d/da/node_modules/pkg0/index.ts",
                  "./d/da/node_modules/pkg0/index.tsx",
                  "./d/da/node_modules/pkg0/index.d.ts",
                  "./d/da/node_modules/@types/pkg0/package.json",
                  "./d/da/node_modules/@types/pkg0.d.ts",
                  "./d/da/node_modules/@types/pkg0/index.d.ts",
                  "./d/node_modules/pkg0/package.json",
                  "./d/node_modules/pkg0.ts",
                  "./d/node_modules/pkg0.tsx",
                  "./d/node_modules/pkg0.d.ts",
                  "./d/node_modules/pkg0/index.ts",
                  "./d/node_modules/pkg0/index.tsx",
                  "./d/node_modules/pkg0/index.d.ts",
                  "./d/node_modules/@types/pkg0/package.json",
                  "./d/node_modules/@types/pkg0.d.ts",
                  "./d/node_modules/@types/pkg0/index.d.ts",
                  "./e/ea/node_modules/pkg0/package.json",
                  "./e/ea/node_modules/pkg0.ts",
                  "./e/ea/node_modules/pkg0.tsx",
                  "./e/ea/node_modules/pkg0.d.ts",
                  "./e/ea/node_modules/pkg0/index.ts",
                  "./e/ea/node_modules/pkg0/index.tsx",
                  "./e/ea/node_modules/pkg0/index.d.ts",
                  "./e/ea/node_modules/@types/pkg0/package.json",
                  "./e/ea/node_modules/@types/pkg0.d.ts",
                  "./e/ea/node_modules/@types/pkg0/index.d.ts",
                  "./e/node_modules/pkg0/package.json",
                  "./e/node_modules/pkg0.ts",
                  "./e/node_modules/pkg0.tsx",
                  "./e/node_modules/pkg0.d.ts",
                  "./e/node_modules/pkg0/index.ts",
                  "./e/node_modules/pkg0/index.tsx",
                  "./e/node_modules/pkg0/index.d.ts",
                  "./e/node_modules/@types/pkg0/package.json",
                  "./e/node_modules/@types/pkg0.d.ts",
                  "./e/node_modules/@types/pkg0/index.d.ts",
                  "./e/ea/eaa/node_modules/pkg0/package.json",
                  "./e/ea/eaa/node_modules/pkg0.ts",
                  "./e/ea/eaa/node_modules/pkg0.tsx",
                  "./e/ea/eaa/node_modules/pkg0.d.ts",
                  "./e/ea/eaa/node_modules/pkg0/index.ts",
                  "./e/ea/eaa/node_modules/pkg0/index.tsx",
                  "./e/ea/eaa/node_modules/pkg0/index.d.ts",
                  "./e/ea/eaa/node_modules/@types/pkg0/package.json",
                  "./e/ea/eaa/node_modules/@types/pkg0.d.ts",
                  "./e/ea/eaa/node_modules/@types/pkg0/index.d.ts",
                  "./e/ea/eaa/eaaa/node_modules/pkg0/package.json",
                  "./e/ea/eaa/eaaa/node_modules/pkg0.ts",
                  "./e/ea/eaa/eaaa/node_modules/pkg0.tsx",
                  "./e/ea/eaa/eaaa/node_modules/pkg0.d.ts",
                  "./e/ea/eaa/eaaa/node_modules/pkg0/index.ts",
                  "./e/ea/eaa/eaaa/node_modules/pkg0/index.tsx",
                  "./e/ea/eaa/eaaa/node_modules/pkg0/index.d.ts",
                  "./e/ea/eaa/eaaa/node_modules/@types/pkg0/package.json",
                  "./e/ea/eaa/eaaa/node_modules/@types/pkg0.d.ts",
                  "./e/ea/eaa/eaaa/node_modules/@types/pkg0/index.d.ts"
                ]
              }
            ]
          ]
        ],
        [
          "./c/ca/caa/caaa",
          [
            [
              "pkg0",
              {
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                },
                "failedLookupLocations": [
                  "./node_modules/pkg0/package.json",
                  "./node_modules/pkg0.ts",
                  "./node_modules/pkg0.tsx",
                  "./node_modules/pkg0.d.ts",
                  "./node_modules/pkg0/index.ts",
                  "./node_modules/pkg0/index.tsx",
                  "./a/node_modules/pkg0/package.json",
                  "./a/node_modules/pkg0.ts",
                  "./a/node_modules/pkg0.tsx",
                  "./a/node_modules/pkg0.d.ts",
                  "./a/node_modules/pkg0/index.ts",
                  "./a/node_modules/pkg0/index.tsx",
                  "./a/node_modules/pkg0/index.d.ts",
                  "./a/node_modules/@types/pkg0/package.json",
                  "./a/node_modules/@types/pkg0.d.ts",
                  "./a/node_modules/@types/pkg0/index.d.ts",
                  "./b/ba/node_modules/pkg0/package.json",
                  "./b/ba/node_modules/pkg0.ts",
                  "./b/ba/node_modules/pkg0.tsx",
                  "./b/ba/node_modules/pkg0.d.ts",
                  "./b/ba/node_modules/pkg0/index.ts",
                  "./b/ba/node_modules/pkg0/index.tsx",
                  "./b/ba/node_modules/pkg0/index.d.ts",
                  "./b/ba/node_modules/@types/pkg0/package.json",
                  "./b/ba/node_modules/@types/pkg0.d.ts",
                  "./b/ba/node_modules/@types/pkg0/index.d.ts",
                  "./b/node_modules/pkg0/package.json",
                  "./b/node_modules/pkg0.ts",
                  "./b/node_modules/pkg0.tsx",
                  "./b/node_modules/pkg0.d.ts",
                  "./b/node_modules/pkg0/index.ts",
                  "./b/node_modules/pkg0/index.tsx",
                  "./b/node_modules/pkg0/index.d.ts",
                  "./b/node_modules/@types/pkg0/package.json",
                  "./b/node_modules/@types/pkg0.d.ts",
                  "./b/node_modules/@types/pkg0/index.d.ts",
                  "./c/ca/node_modules/pkg0/package.json",
                  "./c/ca/node_modules/pkg0.ts",
                  "./c/ca/node_modules/pkg0.tsx",
                  "./c/ca/node_modules/pkg0.d.ts",
                  "./c/ca/node_modules/pkg0/index.ts",
                  "./c/ca/node_modules/pkg0/index.tsx",
                  "./c/ca/node_modules/pkg0/index.d.ts",
                  "./c/ca/node_modules/@types/pkg0/package.json",
                  "./c/ca/node_modules/@types/pkg0.d.ts",
                  "./c/ca/node_modules/@types/pkg0/index.d.ts",
                  "./c/node_modules/pkg0/package.json",
                  "./c/node_modules/pkg0.ts",
                  "./c/node_modules/pkg0.tsx",
                  "./c/node_modules/pkg0.d.ts",
                  "./c/node_modules/pkg0/index.ts",
                  "./c/node_modules/pkg0/index.tsx",
                  "./c/node_modules/pkg0/index.d.ts",
                  "./c/node_modules/@types/pkg0/package.json",
                  "./c/node_modules/@types/pkg0.d.ts",
                  "./c/node_modules/@types/pkg0/index.d.ts",
                  "./c/ca/caa/caaa/node_modules/pkg0/package.json",
                  "./c/ca/caa/caaa/node_modules/pkg0.ts",
                  "./c/ca/caa/caaa/node_modules/pkg0.tsx",
                  "./c/ca/caa/caaa/node_modules/pkg0.d.ts",
                  "./c/ca/caa/caaa/node_modules/pkg0/index.ts",
                  "./c/ca/caa/caaa/node_modules/pkg0/index.tsx",
                  "./c/ca/caa/caaa/node_modules/pkg0/index.d.ts",
                  "./c/ca/caa/caaa/node_modules/@types/pkg0/package.json",
                  "./c/ca/caa/caaa/node_modules/@types/pkg0.d.ts",
                  "./c/ca/caa/caaa/node_modules/@types/pkg0/index.d.ts",
                  "./c/ca/caa/node_modules/pkg0/package.json",
                  "./c/ca/caa/node_modules/pkg0.ts",
                  "./c/ca/caa/node_modules/pkg0.tsx",
                  "./c/ca/caa/node_modules/pkg0.d.ts",
                  "./c/ca/caa/node_modules/pkg0/index.ts",
                  "./c/ca/caa/node_modules/pkg0/index.tsx",
                  "./c/ca/caa/node_modules/pkg0/index.d.ts",
                  "./c/ca/caa/node_modules/@types/pkg0/package.json",
                  "./c/ca/caa/node_modules/@types/pkg0.d.ts",
                  "./c/ca/caa/node_modules/@types/pkg0/index.d.ts",
                  "./c/cb/node_modules/pkg0/package.json",
                  "./c/cb/node_modules/pkg0.ts",
                  "./c/cb/node_modules/pkg0.tsx",
                  "./c/cb/node_modules/pkg0.d.ts",
                  "./c/cb/node_modules/pkg0/index.ts",
                  "./c/cb/node_modules/pkg0/index.tsx",
                  "./c/cb/node_modules/pkg0/index.d.ts",
                  "./c/cb/node_modules/@types/pkg0/package.json",
                  "./c/cb/node_modules/@types/pkg0.d.ts",
                  "./c/cb/node_modules/@types/pkg0/index.d.ts",
                  "./d/da/daa/daaa/node_modules/pkg0/package.json",
                  "./d/da/daa/daaa/node_modules/pkg0.ts",
                  "./d/da/daa/daaa/node_modules/pkg0.tsx",
                  "./d/da/daa/daaa/node_modules/pkg0.d.ts",
                  "./d/da/daa/daaa/node_modules/pkg0/index.ts",
                  "./d/da/daa/daaa/node_modules/pkg0/index.tsx",
                  "./d/da/daa/daaa/node_modules/pkg0/index.d.ts",
                  "./d/da/daa/daaa/node_modules/@types/pkg0/package.json",
                  "./d/da/daa/daaa/node_modules/@types/pkg0.d.ts",
                  "./d/da/daa/daaa/node_modules/@types/pkg0/index.d.ts",
                  "./d/da/daa/node_modules/pkg0/package.json",
                  "./d/da/daa/node_modules/pkg0.ts",
                  "./d/da/daa/node_modules/pkg0.tsx",
                  "./d/da/daa/node_modules/pkg0.d.ts",
                  "./d/da/daa/node_modules/pkg0/index.ts",
                  "./d/da/daa/node_modules/pkg0/index.tsx",
                  "./d/da/daa/node_modules/pkg0/index.d.ts",
                  "./d/da/daa/node_modules/@types/pkg0/package.json",
                  "./d/da/daa/node_modules/@types/pkg0.d.ts",
                  "./d/da/daa/node_modules/@types/pkg0/index.d.ts",
                  "./d/da/node_modules/pkg0/package.json",
                  "./d/da/node_modules/pkg0.ts",
                  "./d/da/node_modules/pkg0.tsx",
                  "./d/da/node_modules/pkg0.d.ts",
                  "./d/da/node_modules/pkg0/index.ts",
                  "./d/da/node_modules/pkg0/index.tsx",
                  "./d/da/node_modules/pkg0/index.d.ts",
                  "./d/da/node_modules/@types/pkg0/package.json",
                  "./d/da/node_modules/@types/pkg0.d.ts",
                  "./d/da/node_modules/@types/pkg0/index.d.ts",
                  "./d/node_modules/pkg0/package.json",
                  "./d/node_modules/pkg0.ts",
                  "./d/node_modules/pkg0.tsx",
                  "./d/node_modules/pkg0.d.ts",
                  "./d/node_modules/pkg0/index.ts",
                  "./d/node_modules/pkg0/index.tsx",
                  "./d/node_modules/pkg0/index.d.ts",
                  "./d/node_modules/@types/pkg0/package.json",
                  "./d/node_modules/@types/pkg0.d.ts",
                  "./d/node_modules/@types/pkg0/index.d.ts",
                  "./e/ea/node_modules/pkg0/package.json",
                  "./e/ea/node_modules/pkg0.ts",
                  "./e/ea/node_modules/pkg0.tsx",
                  "./e/ea/node_modules/pkg0.d.ts",
                  "./e/ea/node_modules/pkg0/index.ts",
                  "./e/ea/node_modules/pkg0/index.tsx",
                  "./e/ea/node_modules/pkg0/index.d.ts",
                  "./e/ea/node_modules/@types/pkg0/package.json",
                  "./e/ea/node_modules/@types/pkg0.d.ts",
                  "./e/ea/node_modules/@types/pkg0/index.d.ts",
                  "./e/node_modules/pkg0/package.json",
                  "./e/node_modules/pkg0.ts",
                  "./e/node_modules/pkg0.tsx",
                  "./e/node_modules/pkg0.d.ts",
                  "./e/node_modules/pkg0/index.ts",
                  "./e/node_modules/pkg0/index.tsx",
                  "./e/node_modules/pkg0/index.d.ts",
                  "./e/node_modules/@types/pkg0/package.json",
                  "./e/node_modules/@types/pkg0.d.ts",
                  "./e/node_modules/@types/pkg0/index.d.ts",
                  "./e/ea/eaa/node_modules/pkg0/package.json",
                  "./e/ea/eaa/node_modules/pkg0.ts",
                  "./e/ea/eaa/node_modules/pkg0.tsx",
                  "./e/ea/eaa/node_modules/pkg0.d.ts",
                  "./e/ea/eaa/node_modules/pkg0/index.ts",
                  "./e/ea/eaa/node_modules/pkg0/index.tsx",
                  "./e/ea/eaa/node_modules/pkg0/index.d.ts",
                  "./e/ea/eaa/node_modules/@types/pkg0/package.json",
                  "./e/ea/eaa/node_modules/@types/pkg0.d.ts",
                  "./e/ea/eaa/node_modules/@types/pkg0/index.d.ts",
                  "./e/ea/eaa/eaaa/node_modules/pkg0/package.json",
                  "./e/ea/eaa/eaaa/node_modules/pkg0.ts",
                  "./e/ea/eaa/eaaa/node_modules/pkg0.tsx",
                  "./e/ea/eaa/eaaa/node_modules/pkg0.d.ts",
                  "./e/ea/eaa/eaaa/node_modules/pkg0/index.ts",
                  "./e/ea/eaa/eaaa/node_modules/pkg0/index.tsx",
                  "./e/ea/eaa/eaaa/node_modules/pkg0/index.d.ts",
                  "./e/ea/eaa/eaaa/node_modules/@types/pkg0/package.json",
                  "./e/ea/eaa/eaaa/node_modules/@types/pkg0.d.ts",
                  "./e/ea/eaa/eaaa/node_modules/@types/pkg0/index.d.ts"
                ]
              }
            ]
          ]
        ],
        [
          "./c/cb",
          [
            [
              "pkg0",
              {
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                },
                "failedLookupLocations": [
                  "./node_modules/pkg0/package.json",
                  "./node_modules/pkg0.ts",
                  "./node_modules/pkg0.tsx",
                  "./node_modules/pkg0.d.ts",
                  "./node_modules/pkg0/index.ts",
                  "./node_modules/pkg0/index.tsx",
                  "./a/node_modules/pkg0/package.json",
                  "./a/node_modules/pkg0.ts",
                  "./a/node_modules/pkg0.tsx",
                  "./a/node_modules/pkg0.d.ts",
                  "./a/node_modules/pkg0/index.ts",
                  "./a/node_modules/pkg0/index.tsx",
                  "./a/node_modules/pkg0/index.d.ts",
                  "./a/node_modules/@types/pkg0/package.json",
                  "./a/node_modules/@types/pkg0.d.ts",
                  "./a/node_modules/@types/pkg0/index.d.ts",
                  "./b/ba/node_modules/pkg0/package.json",
                  "./b/ba/node_modules/pkg0.ts",
                  "./b/ba/node_modules/pkg0.tsx",
                  "./b/ba/node_modules/pkg0.d.ts",
                  "./b/ba/node_modules/pkg0/index.ts",
                  "./b/ba/node_modules/pkg0/index.tsx",
                  "./b/ba/node_modules/pkg0/index.d.ts",
                  "./b/ba/node_modules/@types/pkg0/package.json",
                  "./b/ba/node_modules/@types/pkg0.d.ts",
                  "./b/ba/node_modules/@types/pkg0/index.d.ts",
                  "./b/node_modules/pkg0/package.json",
                  "./b/node_modules/pkg0.ts",
                  "./b/node_modules/pkg0.tsx",
                  "./b/node_modules/pkg0.d.ts",
                  "./b/node_modules/pkg0/index.ts",
                  "./b/node_modules/pkg0/index.tsx",
                  "./b/node_modules/pkg0/index.d.ts",
                  "./b/node_modules/@types/pkg0/package.json",
                  "./b/node_modules/@types/pkg0.d.ts",
                  "./b/node_modules/@types/pkg0/index.d.ts",
                  "./c/ca/node_modules/pkg0/package.json",
                  "./c/ca/node_modules/pkg0.ts",
                  "./c/ca/node_modules/pkg0.tsx",
                  "./c/ca/node_modules/pkg0.d.ts",
                  "./c/ca/node_modules/pkg0/index.ts",
                  "./c/ca/node_modules/pkg0/index.tsx",
                  "./c/ca/node_modules/pkg0/index.d.ts",
                  "./c/ca/node_modules/@types/pkg0/package.json",
                  "./c/ca/node_modules/@types/pkg0.d.ts",
                  "./c/ca/node_modules/@types/pkg0/index.d.ts",
                  "./c/node_modules/pkg0/package.json",
                  "./c/node_modules/pkg0.ts",
                  "./c/node_modules/pkg0.tsx",
                  "./c/node_modules/pkg0.d.ts",
                  "./c/node_modules/pkg0/index.ts",
                  "./c/node_modules/pkg0/index.tsx",
                  "./c/node_modules/pkg0/index.d.ts",
                  "./c/node_modules/@types/pkg0/package.json",
                  "./c/node_modules/@types/pkg0.d.ts",
                  "./c/node_modules/@types/pkg0/index.d.ts",
                  "./c/ca/caa/caaa/node_modules/pkg0/package.json",
                  "./c/ca/caa/caaa/node_modules/pkg0.ts",
                  "./c/ca/caa/caaa/node_modules/pkg0.tsx",
                  "./c/ca/caa/caaa/node_modules/pkg0.d.ts",
                  "./c/ca/caa/caaa/node_modules/pkg0/index.ts",
                  "./c/ca/caa/caaa/node_modules/pkg0/index.tsx",
                  "./c/ca/caa/caaa/node_modules/pkg0/index.d.ts",
                  "./c/ca/caa/caaa/node_modules/@types/pkg0/package.json",
                  "./c/ca/caa/caaa/node_modules/@types/pkg0.d.ts",
                  "./c/ca/caa/caaa/node_modules/@types/pkg0/index.d.ts",
                  "./c/ca/caa/node_modules/pkg0/package.json",
                  "./c/ca/caa/node_modules/pkg0.ts",
                  "./c/ca/caa/node_modules/pkg0.tsx",
                  "./c/ca/caa/node_modules/pkg0.d.ts",
                  "./c/ca/caa/node_modules/pkg0/index.ts",
                  "./c/ca/caa/node_modules/pkg0/index.tsx",
                  "./c/ca/caa/node_modules/pkg0/index.d.ts",
                  "./c/ca/caa/node_modules/@types/pkg0/package.json",
                  "./c/ca/caa/node_modules/@types/pkg0.d.ts",
                  "./c/ca/caa/node_modules/@types/pkg0/index.d.ts",
                  "./c/cb/node_modules/pkg0/package.json",
                  "./c/cb/node_modules/pkg0.ts",
                  "./c/cb/node_modules/pkg0.tsx",
                  "./c/cb/node_modules/pkg0.d.ts",
                  "./c/cb/node_modules/pkg0/index.ts",
                  "./c/cb/node_modules/pkg0/index.tsx",
                  "./c/cb/node_modules/pkg0/index.d.ts",
                  "./c/cb/node_modules/@types/pkg0/package.json",
                  "./c/cb/node_modules/@types/pkg0.d.ts",
                  "./c/cb/node_modules/@types/pkg0/index.d.ts",
                  "./d/da/daa/daaa/node_modules/pkg0/package.json",
                  "./d/da/daa/daaa/node_modules/pkg0.ts",
                  "./d/da/daa/daaa/node_modules/pkg0.tsx",
                  "./d/da/daa/daaa/node_modules/pkg0.d.ts",
                  "./d/da/daa/daaa/node_modules/pkg0/index.ts",
                  "./d/da/daa/daaa/node_modules/pkg0/index.tsx",
                  "./d/da/daa/daaa/node_modules/pkg0/index.d.ts",
                  "./d/da/daa/daaa/node_modules/@types/pkg0/package.json",
                  "./d/da/daa/daaa/node_modules/@types/pkg0.d.ts",
                  "./d/da/daa/daaa/node_modules/@types/pkg0/index.d.ts",
                  "./d/da/daa/node_modules/pkg0/package.json",
                  "./d/da/daa/node_modules/pkg0.ts",
                  "./d/da/daa/node_modules/pkg0.tsx",
                  "./d/da/daa/node_modules/pkg0.d.ts",
                  "./d/da/daa/node_modules/pkg0/index.ts",
                  "./d/da/daa/node_modules/pkg0/index.tsx",
                  "./d/da/daa/node_modules/pkg0/index.d.ts",
                  "./d/da/daa/node_modules/@types/pkg0/package.json",
                  "./d/da/daa/node_modules/@types/pkg0.d.ts",
                  "./d/da/daa/node_modules/@types/pkg0/index.d.ts",
                  "./d/da/node_modules/pkg0/package.json",
                  "./d/da/node_modules/pkg0.ts",
                  "./d/da/node_modules/pkg0.tsx",
                  "./d/da/node_modules/pkg0.d.ts",
                  "./d/da/node_modules/pkg0/index.ts",
                  "./d/da/node_modules/pkg0/index.tsx",
                  "./d/da/node_modules/pkg0/index.d.ts",
                  "./d/da/node_modules/@types/pkg0/package.json",
                  "./d/da/node_modules/@types/pkg0.d.ts",
                  "./d/da/node_modules/@types/pkg0/index.d.ts",
                  "./d/node_modules/pkg0/package.json",
                  "./d/node_modules/pkg0.ts",
                  "./d/node_modules/pkg0.tsx",
                  "./d/node_modules/pkg0.d.ts",
                  "./d/node_modules/pkg0/index.ts",
                  "./d/node_modules/pkg0/index.tsx",
                  "./d/node_modules/pkg0/index.d.ts",
                  "./d/node_modules/@types/pkg0/package.json",
                  "./d/node_modules/@types/pkg0.d.ts",
                  "./d/node_modules/@types/pkg0/index.d.ts",
                  "./e/ea/node_modules/pkg0/package.json",
                  "./e/ea/node_modules/pkg0.ts",
                  "./e/ea/node_modules/pkg0.tsx",
                  "./e/ea/node_modules/pkg0.d.ts",
                  "./e/ea/node_modules/pkg0/index.ts",
                  "./e/ea/node_modules/pkg0/index.tsx",
                  "./e/ea/node_modules/pkg0/index.d.ts",
                  "./e/ea/node_modules/@types/pkg0/package.json",
                  "./e/ea/node_modules/@types/pkg0.d.ts",
                  "./e/ea/node_modules/@types/pkg0/index.d.ts",
                  "./e/node_modules/pkg0/package.json",
                  "./e/node_modules/pkg0.ts",
                  "./e/node_modules/pkg0.tsx",
                  "./e/node_modules/pkg0.d.ts",
                  "./e/node_modules/pkg0/index.ts",
                  "./e/node_modules/pkg0/index.tsx",
                  "./e/node_modules/pkg0/index.d.ts",
                  "./e/node_modules/@types/pkg0/package.json",
                  "./e/node_modules/@types/pkg0.d.ts",
                  "./e/node_modules/@types/pkg0/index.d.ts",
                  "./e/ea/eaa/node_modules/pkg0/package.json",
                  "./e/ea/eaa/node_modules/pkg0.ts",
                  "./e/ea/eaa/node_modules/pkg0.tsx",
                  "./e/ea/eaa/node_modules/pkg0.d.ts",
                  "./e/ea/eaa/node_modules/pkg0/index.ts",
                  "./e/ea/eaa/node_modules/pkg0/index.tsx",
                  "./e/ea/eaa/node_modules/pkg0/index.d.ts",
                  "./e/ea/eaa/node_modules/@types/pkg0/package.json",
                  "./e/ea/eaa/node_modules/@types/pkg0.d.ts",
                  "./e/ea/eaa/node_modules/@types/pkg0/index.d.ts",
                  "./e/ea/eaa/eaaa/node_modules/pkg0/package.json",
                  "./e/ea/eaa/eaaa/node_modules/pkg0.ts",
                  "./e/ea/eaa/eaaa/node_modules/pkg0.tsx",
                  "./e/ea/eaa/eaaa/node_modules/pkg0.d.ts",
                  "./e/ea/eaa/eaaa/node_modules/pkg0/index.ts",
                  "./e/ea/eaa/eaaa/node_modules/pkg0/index.tsx",
                  "./e/ea/eaa/eaaa/node_modules/pkg0/index.d.ts",
                  "./e/ea/eaa/eaaa/node_modules/@types/pkg0/package.json",
                  "./e/ea/eaa/eaaa/node_modules/@types/pkg0.d.ts",
                  "./e/ea/eaa/eaaa/node_modules/@types/pkg0/index.d.ts"
                ]
              }
            ]
          ]
        ],
        [
          "./d/da/daa/daaa",
          [
            [
              "pkg0",
              {
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                },
                "failedLookupLocations": [
                  "./node_modules/pkg0/package.json",
                  "./node_modules/pkg0.ts",
                  "./node_modules/pkg0.tsx",
                  "./node_modules/pkg0.d.ts",
                  "./node_modules/pkg0/index.ts",
                  "./node_modules/pkg0/index.tsx",
                  "./a/node_modules/pkg0/package.json",
                  "./a/node_modules/pkg0.ts",
                  "./a/node_modules/pkg0.tsx",
                  "./a/node_modules/pkg0.d.ts",
                  "./a/node_modules/pkg0/index.ts",
                  "./a/node_modules/pkg0/index.tsx",
                  "./a/node_modules/pkg0/index.d.ts",
                  "./a/node_modules/@types/pkg0/package.json",
                  "./a/node_modules/@types/pkg0.d.ts",
                  "./a/node_modules/@types/pkg0/index.d.ts",
                  "./b/ba/node_modules/pkg0/package.json",
                  "./b/ba/node_modules/pkg0.ts",
                  "./b/ba/node_modules/pkg0.tsx",
                  "./b/ba/node_modules/pkg0.d.ts",
                  "./b/ba/node_modules/pkg0/index.ts",
                  "./b/ba/node_modules/pkg0/index.tsx",
                  "./b/ba/node_modules/pkg0/index.d.ts",
                  "./b/ba/node_modules/@types/pkg0/package.json",
                  "./b/ba/node_modules/@types/pkg0.d.ts",
                  "./b/ba/node_modules/@types/pkg0/index.d.ts",
                  "./b/node_modules/pkg0/package.json",
                  "./b/node_modules/pkg0.ts",
                  "./b/node_modules/pkg0.tsx",
                  "./b/node_modules/pkg0.d.ts",
                  "./b/node_modules/pkg0/index.ts",
                  "./b/node_modules/pkg0/index.tsx",
                  "./b/node_modules/pkg0/index.d.ts",
                  "./b/node_modules/@types/pkg0/package.json",
                  "./b/node_modules/@types/pkg0.d.ts",
                  "./b/node_modules/@types/pkg0/index.d.ts",
                  "./c/ca/node_modules/pkg0/package.json",
                  "./c/ca/node_modules/pkg0.ts",
                  "./c/ca/node_modules/pkg0.tsx",
                  "./c/ca/node_modules/pkg0.d.ts",
                  "./c/ca/node_modules/pkg0/index.ts",
                  "./c/ca/node_modules/pkg0/index.tsx",
                  "./c/ca/node_modules/pkg0/index.d.ts",
                  "./c/ca/node_modules/@types/pkg0/package.json",
                  "./c/ca/node_modules/@types/pkg0.d.ts",
                  "./c/ca/node_modules/@types/pkg0/index.d.ts",
                  "./c/node_modules/pkg0/package.json",
                  "./c/node_modules/pkg0.ts",
                  "./c/node_modules/pkg0.tsx",
                  "./c/node_modules/pkg0.d.ts",
                  "./c/node_modules/pkg0/index.ts",
                  "./c/node_modules/pkg0/index.tsx",
                  "./c/node_modules/pkg0/index.d.ts",
                  "./c/node_modules/@types/pkg0/package.json",
                  "./c/node_modules/@types/pkg0.d.ts",
                  "./c/node_modules/@types/pkg0/index.d.ts",
                  "./c/ca/caa/caaa/node_modules/pkg0/package.json",
                  "./c/ca/caa/caaa/node_modules/pkg0.ts",
                  "./c/ca/caa/caaa/node_modules/pkg0.tsx",
                  "./c/ca/caa/caaa/node_modules/pkg0.d.ts",
                  "./c/ca/caa/caaa/node_modules/pkg0/index.ts",
                  "./c/ca/caa/caaa/node_modules/pkg0/index.tsx",
                  "./c/ca/caa/caaa/node_modules/pkg0/index.d.ts",
                  "./c/ca/caa/caaa/node_modules/@types/pkg0/package.json",
                  "./c/ca/caa/caaa/node_modules/@types/pkg0.d.ts",
                  "./c/ca/caa/caaa/node_modules/@types/pkg0/index.d.ts",
                  "./c/ca/caa/node_modules/pkg0/package.json",
                  "./c/ca/caa/node_modules/pkg0.ts",
                  "./c/ca/caa/node_modules/pkg0.tsx",
                  "./c/ca/caa/node_modules/pkg0.d.ts",
                  "./c/ca/caa/node_modules/pkg0/index.ts",
                  "./c/ca/caa/node_modules/pkg0/index.tsx",
                  "./c/ca/caa/node_modules/pkg0/index.d.ts",
                  "./c/ca/caa/node_modules/@types/pkg0/package.json",
                  "./c/ca/caa/node_modules/@types/pkg0.d.ts",
                  "./c/ca/caa/node_modules/@types/pkg0/index.d.ts",
                  "./c/cb/node_modules/pkg0/package.json",
                  "./c/cb/node_modules/pkg0.ts",
                  "./c/cb/node_modules/pkg0.tsx",
                  "./c/cb/node_modules/pkg0.d.ts",
                  "./c/cb/node_modules/pkg0/index.ts",
                  "./c/cb/node_modules/pkg0/index.tsx",
                  "./c/cb/node_modules/pkg0/index.d.ts",
                  "./c/cb/node_modules/@types/pkg0/package.json",
                  "./c/cb/node_modules/@types/pkg0.d.ts",
                  "./c/cb/node_modules/@types/pkg0/index.d.ts",
                  "./d/da/daa/daaa/node_modules/pkg0/package.json",
                  "./d/da/daa/daaa/node_modules/pkg0.ts",
                  "./d/da/daa/daaa/node_modules/pkg0.tsx",
                  "./d/da/daa/daaa/node_modules/pkg0.d.ts",
                  "./d/da/daa/daaa/node_modules/pkg0/index.ts",
                  "./d/da/daa/daaa/node_modules/pkg0/index.tsx",
                  "./d/da/daa/daaa/node_modules/pkg0/index.d.ts",
                  "./d/da/daa/daaa/node_modules/@types/pkg0/package.json",
                  "./d/da/daa/daaa/node_modules/@types/pkg0.d.ts",
                  "./d/da/daa/daaa/node_modules/@types/pkg0/index.d.ts",
                  "./d/da/daa/node_modules/pkg0/package.json",
                  "./d/da/daa/node_modules/pkg0.ts",
                  "./d/da/daa/node_modules/pkg0.tsx",
                  "./d/da/daa/node_modules/pkg0.d.ts",
                  "./d/da/daa/node_modules/pkg0/index.ts",
                  "./d/da/daa/node_modules/pkg0/index.tsx",
                  "./d/da/daa/node_modules/pkg0/index.d.ts",
                  "./d/da/daa/node_modules/@types/pkg0/package.json",
                  "./d/da/daa/node_modules/@types/pkg0.d.ts",
                  "./d/da/daa/node_modules/@types/pkg0/index.d.ts",
                  "./d/da/node_modules/pkg0/package.json",
                  "./d/da/node_modules/pkg0.ts",
                  "./d/da/node_modules/pkg0.tsx",
                  "./d/da/node_modules/pkg0.d.ts",
                  "./d/da/node_modules/pkg0/index.ts",
                  "./d/da/node_modules/pkg0/index.tsx",
                  "./d/da/node_modules/pkg0/index.d.ts",
                  "./d/da/node_modules/@types/pkg0/package.json",
                  "./d/da/node_modules/@types/pkg0.d.ts",
                  "./d/da/node_modules/@types/pkg0/index.d.ts",
                  "./d/node_modules/pkg0/package.json",
                  "./d/node_modules/pkg0.ts",
                  "./d/node_modules/pkg0.tsx",
                  "./d/node_modules/pkg0.d.ts",
                  "./d/node_modules/pkg0/index.ts",
                  "./d/node_modules/pkg0/index.tsx",
                  "./d/node_modules/pkg0/index.d.ts",
                  "./d/node_modules/@types/pkg0/package.json",
                  "./d/node_modules/@types/pkg0.d.ts",
                  "./d/node_modules/@types/pkg0/index.d.ts",
                  "./e/ea/node_modules/pkg0/package.json",
                  "./e/ea/node_modules/pkg0.ts",
                  "./e/ea/node_modules/pkg0.tsx",
                  "./e/ea/node_modules/pkg0.d.ts",
                  "./e/ea/node_modules/pkg0/index.ts",
                  "./e/ea/node_modules/pkg0/index.tsx",
                  "./e/ea/node_modules/pkg0/index.d.ts",
                  "./e/ea/node_modules/@types/pkg0/package.json",
                  "./e/ea/node_modules/@types/pkg0.d.ts",
                  "./e/ea/node_modules/@types/pkg0/index.d.ts",
                  "./e/node_modules/pkg0/package.json",
                  "./e/node_modules/pkg0.ts",
                  "./e/node_modules/pkg0.tsx",
                  "./e/node_modules/pkg0.d.ts",
                  "./e/node_modules/pkg0/index.ts",
                  "./e/node_modules/pkg0/index.tsx",
                  "./e/node_modules/pkg0/index.d.ts",
                  "./e/node_modules/@types/pkg0/package.json",
                  "./e/node_modules/@types/pkg0.d.ts",
                  "./e/node_modules/@types/pkg0/index.d.ts",
                  "./e/ea/eaa/node_modules/pkg0/package.json",
                  "./e/ea/eaa/node_modules/pkg0.ts",
                  "./e/ea/eaa/node_modules/pkg0.tsx",
                  "./e/ea/eaa/node_modules/pkg0.d.ts",
                  "./e/ea/eaa/node_modules/pkg0/index.ts",
                  "./e/ea/eaa/node_modules/pkg0/index.tsx",
                  "./e/ea/eaa/node_modules/pkg0/index.d.ts",
                  "./e/ea/eaa/node_modules/@types/pkg0/package.json",
                  "./e/ea/eaa/node_modules/@types/pkg0.d.ts",
                  "./e/ea/eaa/node_modules/@types/pkg0/index.d.ts",
                  "./e/ea/eaa/eaaa/node_modules/pkg0/package.json",
                  "./e/ea/eaa/eaaa/node_modules/pkg0.ts",
                  "./e/ea/eaa/eaaa/node_modules/pkg0.tsx",
                  "./e/ea/eaa/eaaa/node_modules/pkg0.d.ts",
                  "./e/ea/eaa/eaaa/node_modules/pkg0/index.ts",
                  "./e/ea/eaa/eaaa/node_modules/pkg0/index.tsx",
                  "./e/ea/eaa/eaaa/node_modules/pkg0/index.d.ts",
                  "./e/ea/eaa/eaaa/node_modules/@types/pkg0/package.json",
                  "./e/ea/eaa/eaaa/node_modules/@types/pkg0.d.ts",
                  "./e/ea/eaa/eaaa/node_modules/@types/pkg0/index.d.ts"
                ]
              }
            ]
          ]
        ],
        [
          "./e/ea/eaa/eaaa",
          [
            [
              "pkg0",
              {
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                },
                "failedLookupLocations": [
                  "./node_modules/pkg0/package.json",
                  "./node_modules/pkg0.ts",
                  "./node_modules/pkg0.tsx",
                  "./node_modules/pkg0.d.ts",
                  "./node_modules/pkg0/index.ts",
                  "./node_modules/pkg0/index.tsx",
                  "./a/node_modules/pkg0/package.json",
                  "./a/node_modules/pkg0.ts",
                  "./a/node_modules/pkg0.tsx",
                  "./a/node_modules/pkg0.d.ts",
                  "./a/node_modules/pkg0/index.ts",
                  "./a/node_modules/pkg0/index.tsx",
                  "./a/node_modules/pkg0/index.d.ts",
                  "./a/node_modules/@types/pkg0/package.json",
                  "./a/node_modules/@types/pkg0.d.ts",
                  "./a/node_modules/@types/pkg0/index.d.ts",
                  "./b/ba/node_modules/pkg0/package.json",
                  "./b/ba/node_modules/pkg0.ts",
                  "./b/ba/node_modules/pkg0.tsx",
                  "./b/ba/node_modules/pkg0.d.ts",
                  "./b/ba/node_modules/pkg0/index.ts",
                  "./b/ba/node_modules/pkg0/index.tsx",
                  "./b/ba/node_modules/pkg0/index.d.ts",
                  "./b/ba/node_modules/@types/pkg0/package.json",
                  "./b/ba/node_modules/@types/pkg0.d.ts",
                  "./b/ba/node_modules/@types/pkg0/index.d.ts",
                  "./b/node_modules/pkg0/package.json",
                  "./b/node_modules/pkg0.ts",
                  "./b/node_modules/pkg0.tsx",
                  "./b/node_modules/pkg0.d.ts",
                  "./b/node_modules/pkg0/index.ts",
                  "./b/node_modules/pkg0/index.tsx",
                  "./b/node_modules/pkg0/index.d.ts",
                  "./b/node_modules/@types/pkg0/package.json",
                  "./b/node_modules/@types/pkg0.d.ts",
                  "./b/node_modules/@types/pkg0/index.d.ts",
                  "./c/ca/node_modules/pkg0/package.json",
                  "./c/ca/node_modules/pkg0.ts",
                  "./c/ca/node_modules/pkg0.tsx",
                  "./c/ca/node_modules/pkg0.d.ts",
                  "./c/ca/node_modules/pkg0/index.ts",
                  "./c/ca/node_modules/pkg0/index.tsx",
                  "./c/ca/node_modules/pkg0/index.d.ts",
                  "./c/ca/node_modules/@types/pkg0/package.json",
                  "./c/ca/node_modules/@types/pkg0.d.ts",
                  "./c/ca/node_modules/@types/pkg0/index.d.ts",
                  "./c/node_modules/pkg0/package.json",
                  "./c/node_modules/pkg0.ts",
                  "./c/node_modules/pkg0.tsx",
                  "./c/node_modules/pkg0.d.ts",
                  "./c/node_modules/pkg0/index.ts",
                  "./c/node_modules/pkg0/index.tsx",
                  "./c/node_modules/pkg0/index.d.ts",
                  "./c/node_modules/@types/pkg0/package.json",
                  "./c/node_modules/@types/pkg0.d.ts",
                  "./c/node_modules/@types/pkg0/index.d.ts",
                  "./c/ca/caa/caaa/node_modules/pkg0/package.json",
                  "./c/ca/caa/caaa/node_modules/pkg0.ts",
                  "./c/ca/caa/caaa/node_modules/pkg0.tsx",
                  "./c/ca/caa/caaa/node_modules/pkg0.d.ts",
                  "./c/ca/caa/caaa/node_modules/pkg0/index.ts",
                  "./c/ca/caa/caaa/node_modules/pkg0/index.tsx",
                  "./c/ca/caa/caaa/node_modules/pkg0/index.d.ts",
                  "./c/ca/caa/caaa/node_modules/@types/pkg0/package.json",
                  "./c/ca/caa/caaa/node_modules/@types/pkg0.d.ts",
                  "./c/ca/caa/caaa/node_modules/@types/pkg0/index.d.ts",
                  "./c/ca/caa/node_modules/pkg0/package.json",
                  "./c/ca/caa/node_modules/pkg0.ts",
                  "./c/ca/caa/node_modules/pkg0.tsx",
                  "./c/ca/caa/node_modules/pkg0.d.ts",
                  "./c/ca/caa/node_modules/pkg0/index.ts",
                  "./c/ca/caa/node_modules/pkg0/index.tsx",
                  "./c/ca/caa/node_modules/pkg0/index.d.ts",
                  "./c/ca/caa/node_modules/@types/pkg0/package.json",
                  "./c/ca/caa/node_modules/@types/pkg0.d.ts",
                  "./c/ca/caa/node_modules/@types/pkg0/index.d.ts",
                  "./c/cb/node_modules/pkg0/package.json",
                  "./c/cb/node_modules/pkg0.ts",
                  "./c/cb/node_modules/pkg0.tsx",
                  "./c/cb/node_modules/pkg0.d.ts",
                  "./c/cb/node_modules/pkg0/index.ts",
                  "./c/cb/node_modules/pkg0/index.tsx",
                  "./c/cb/node_modules/pkg0/index.d.ts",
                  "./c/cb/node_modules/@types/pkg0/package.json",
                  "./c/cb/node_modules/@types/pkg0.d.ts",
                  "./c/cb/node_modules/@types/pkg0/index.d.ts",
                  "./d/da/daa/daaa/node_modules/pkg0/package.json",
                  "./d/da/daa/daaa/node_modules/pkg0.ts",
                  "./d/da/daa/daaa/node_modules/pkg0.tsx",
                  "./d/da/daa/daaa/node_modules/pkg0.d.ts",
                  "./d/da/daa/daaa/node_modules/pkg0/index.ts",
                  "./d/da/daa/daaa/node_modules/pkg0/index.tsx",
                  "./d/da/daa/daaa/node_modules/pkg0/index.d.ts",
                  "./d/da/daa/daaa/node_modules/@types/pkg0/package.json",
                  "./d/da/daa/daaa/node_modules/@types/pkg0.d.ts",
                  "./d/da/daa/daaa/node_modules/@types/pkg0/index.d.ts",
                  "./d/da/daa/node_modules/pkg0/package.json",
                  "./d/da/daa/node_modules/pkg0.ts",
                  "./d/da/daa/node_modules/pkg0.tsx",
                  "./d/da/daa/node_modules/pkg0.d.ts",
                  "./d/da/daa/node_modules/pkg0/index.ts",
                  "./d/da/daa/node_modules/pkg0/index.tsx",
                  "./d/da/daa/node_modules/pkg0/index.d.ts",
                  "./d/da/daa/node_modules/@types/pkg0/package.json",
                  "./d/da/daa/node_modules/@types/pkg0.d.ts",
                  "./d/da/daa/node_modules/@types/pkg0/index.d.ts",
                  "./d/da/node_modules/pkg0/package.json",
                  "./d/da/node_modules/pkg0.ts",
                  "./d/da/node_modules/pkg0.tsx",
                  "./d/da/node_modules/pkg0.d.ts",
                  "./d/da/node_modules/pkg0/index.ts",
                  "./d/da/node_modules/pkg0/index.tsx",
                  "./d/da/node_modules/pkg0/index.d.ts",
                  "./d/da/node_modules/@types/pkg0/package.json",
                  "./d/da/node_modules/@types/pkg0.d.ts",
                  "./d/da/node_modules/@types/pkg0/index.d.ts",
                  "./d/node_modules/pkg0/package.json",
                  "./d/node_modules/pkg0.ts",
                  "./d/node_modules/pkg0.tsx",
                  "./d/node_modules/pkg0.d.ts",
                  "./d/node_modules/pkg0/index.ts",
                  "./d/node_modules/pkg0/index.tsx",
                  "./d/node_modules/pkg0/index.d.ts",
                  "./d/node_modules/@types/pkg0/package.json",
                  "./d/node_modules/@types/pkg0.d.ts",
                  "./d/node_modules/@types/pkg0/index.d.ts",
                  "./e/ea/node_modules/pkg0/package.json",
                  "./e/ea/node_modules/pkg0.ts",
                  "./e/ea/node_modules/pkg0.tsx",
                  "./e/ea/node_modules/pkg0.d.ts",
                  "./e/ea/node_modules/pkg0/index.ts",
                  "./e/ea/node_modules/pkg0/index.tsx",
                  "./e/ea/node_modules/pkg0/index.d.ts",
                  "./e/ea/node_modules/@types/pkg0/package.json",
                  "./e/ea/node_modules/@types/pkg0.d.ts",
                  "./e/ea/node_modules/@types/pkg0/index.d.ts",
                  "./e/node_modules/pkg0/package.json",
                  "./e/node_modules/pkg0.ts",
                  "./e/node_modules/pkg0.tsx",
                  "./e/node_modules/pkg0.d.ts",
                  "./e/node_modules/pkg0/index.ts",
                  "./e/node_modules/pkg0/index.tsx",
                  "./e/node_modules/pkg0/index.d.ts",
                  "./e/node_modules/@types/pkg0/package.json",
                  "./e/node_modules/@types/pkg0.d.ts",
                  "./e/node_modules/@types/pkg0/index.d.ts",
                  "./e/ea/eaa/node_modules/pkg0/package.json",
                  "./e/ea/eaa/node_modules/pkg0.ts",
                  "./e/ea/eaa/node_modules/pkg0.tsx",
                  "./e/ea/eaa/node_modules/pkg0.d.ts",
                  "./e/ea/eaa/node_modules/pkg0/index.ts",
                  "./e/ea/eaa/node_modules/pkg0/index.tsx",
                  "./e/ea/eaa/node_modules/pkg0/index.d.ts",
                  "./e/ea/eaa/node_modules/@types/pkg0/package.json",
                  "./e/ea/eaa/node_modules/@types/pkg0.d.ts",
                  "./e/ea/eaa/node_modules/@types/pkg0/index.d.ts",
                  "./e/ea/eaa/eaaa/node_modules/pkg0/package.json",
                  "./e/ea/eaa/eaaa/node_modules/pkg0.ts",
                  "./e/ea/eaa/eaaa/node_modules/pkg0.tsx",
                  "./e/ea/eaa/eaaa/node_modules/pkg0.d.ts",
                  "./e/ea/eaa/eaaa/node_modules/pkg0/index.ts",
                  "./e/ea/eaa/eaaa/node_modules/pkg0/index.tsx",
                  "./e/ea/eaa/eaaa/node_modules/pkg0/index.d.ts",
                  "./e/ea/eaa/eaaa/node_modules/@types/pkg0/package.json",
                  "./e/ea/eaa/eaaa/node_modules/@types/pkg0.d.ts",
                  "./e/ea/eaa/eaaa/node_modules/@types/pkg0/index.d.ts"
                ]
              }
            ]
          ]
        ]
      ]
    }
  },
  "version": "FakeTSVersion",
  "size": 10530
}

