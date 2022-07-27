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

//// [/src/project/a/fileWithImports.ts]
import type { ImportInterface0 } from "pkg0";
import type { ImportInterface1 } from "pkg1";


//// [/src/project/b/ba/fileWithImports.ts]
import type { ImportInterface0 } from "pkg0";
import type { ImportInterface1 } from "pkg1";


//// [/src/project/b/randomFileForImport.ts]
export const x = 10;

//// [/src/project/c/ca/caa/caaa/fileWithImports.ts]
import type { ImportInterface0 } from "pkg0";
import type { ImportInterface1 } from "pkg1";


//// [/src/project/c/ca/caa/randomFileForImport.ts]
export const x = 10;

//// [/src/project/c/ca/fileWithImports.ts]
import type { ImportInterface0 } from "pkg0";
import type { ImportInterface1 } from "pkg1";


//// [/src/project/c/cb/fileWithImports.ts]
import type { ImportInterface0 } from "pkg0";
import type { ImportInterface1 } from "pkg1";


//// [/src/project/d/da/daa/daaa/fileWithImports.ts]
import type { ImportInterface0 } from "pkg0";
import type { ImportInterface1 } from "pkg1";


//// [/src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts]
export const x = 10;

//// [/src/project/d/da/daa/fileWithImports.ts]
import type { ImportInterface0 } from "pkg0";
import type { ImportInterface1 } from "pkg1";


//// [/src/project/d/da/fileWithImports.ts]
import type { ImportInterface0 } from "pkg0";
import type { ImportInterface1 } from "pkg1";


//// [/src/project/e/ea/eaa/eaaa/fileWithImports.ts]
import type { ImportInterface0 } from "pkg0";
import type { ImportInterface1 } from "pkg1";


//// [/src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts]
export const x = 10;

//// [/src/project/e/ea/eaa/fileWithImports.ts]
import type { ImportInterface0 } from "pkg0";
import type { ImportInterface1 } from "pkg1";


//// [/src/project/e/ea/fileWithImports.ts]
import type { ImportInterface0 } from "pkg0";
import type { ImportInterface1 } from "pkg1";


//// [/src/project/fileWithImports.ts]
import type { ImportInterface0 } from "pkg0";
import type { ImportInterface1 } from "pkg1";


//// [/src/project/node_modules/pkg0/index.d.ts]
export interface ImportInterface0 {}

//// [/src/project/randomFileForImport.ts]
export const x = 10;

//// [/src/project/tsconfig.json]
{"compilerOptions":{"composite":true,"cacheResolutions":true,"traceResolution":true},"files":["fileWithImports.ts","randomFileForImport.ts","a/fileWithImports.ts","b/ba/fileWithImports.ts","b/randomFileForImport.ts","c/ca/fileWithImports.ts","c/ca/caa/randomFileForImport.ts","c/ca/caa/caaa/fileWithImports.ts","c/cb/fileWithImports.ts","d/da/daa/daaa/x/y/z/randomFileForImport.ts","d/da/daa/daaa/fileWithImports.ts","d/da/daa/fileWithImports.ts","d/da/fileWithImports.ts","e/ea/fileWithImports.ts","e/ea/eaa/fileWithImports.ts","e/ea/eaa/eaaa/fileWithImports.ts","e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts"]}



Output::
/lib/tsc -b /src/project --explainFiles
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
======== Resolving module 'pkg1' from '/src/project/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
File '/src/project/node_modules/pkg1.ts' does not exist.
File '/src/project/node_modules/pkg1.tsx' does not exist.
File '/src/project/node_modules/pkg1.d.ts' does not exist.
Directory '/src/project/node_modules/@types' does not exist, skipping all lookups in it.
Directory '/src/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
Loading module 'pkg1' from 'node_modules' folder, target file type 'JavaScript'.
File '/src/project/node_modules/pkg1.js' does not exist.
File '/src/project/node_modules/pkg1.jsx' does not exist.
Directory '/src/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
======== Module name 'pkg1' was not resolved. ========
======== Resolving module 'pkg0' from '/src/project/a/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg0' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/a/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg0' was found in cache from location '/src/project'.
======== Module name 'pkg0' was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'. ========
======== Resolving module 'pkg1' from '/src/project/a/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/a/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project'.
======== Module name 'pkg1' was not resolved. ========
======== Resolving module 'pkg0' from '/src/project/b/ba/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg0' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/b/ba/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/b/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg0' was found in cache from location '/src/project'.
======== Module name 'pkg0' was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'. ========
======== Resolving module 'pkg1' from '/src/project/b/ba/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/b/ba/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/b/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project'.
======== Module name 'pkg1' was not resolved. ========
======== Resolving module 'pkg0' from '/src/project/c/ca/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg0' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/c/ca/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/c/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg0' was found in cache from location '/src/project'.
======== Module name 'pkg0' was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'. ========
======== Resolving module 'pkg1' from '/src/project/c/ca/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/c/ca/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/c/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project'.
======== Module name 'pkg1' was not resolved. ========
======== Resolving module 'pkg0' from '/src/project/c/ca/caa/caaa/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg0' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/c/ca/caa/caaa/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/c/ca/caa/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg0' was found in cache from location '/src/project/c/ca'.
======== Module name 'pkg0' was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'. ========
======== Resolving module 'pkg1' from '/src/project/c/ca/caa/caaa/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/c/ca/caa/caaa/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/c/ca/caa/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project/c/ca'.
======== Module name 'pkg1' was not resolved. ========
======== Resolving module 'pkg0' from '/src/project/c/cb/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg0' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/c/cb/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg0' was found in cache from location '/src/project/c'.
======== Module name 'pkg0' was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'. ========
======== Resolving module 'pkg1' from '/src/project/c/cb/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/c/cb/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project/c'.
======== Module name 'pkg1' was not resolved. ========
======== Resolving module 'pkg0' from '/src/project/d/da/daa/daaa/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg0' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/d/da/daa/daaa/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/d/da/daa/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/d/da/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/d/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg0' was found in cache from location '/src/project'.
======== Module name 'pkg0' was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'. ========
======== Resolving module 'pkg1' from '/src/project/d/da/daa/daaa/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/d/da/daa/daaa/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/d/da/daa/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/d/da/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/d/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project'.
======== Module name 'pkg1' was not resolved. ========
======== Resolving module 'pkg0' from '/src/project/d/da/daa/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg0' from 'node_modules' folder, target file type 'TypeScript'.
Resolution for module 'pkg0' was found in cache from location '/src/project/d/da/daa'.
======== Module name 'pkg0' was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'. ========
======== Resolving module 'pkg1' from '/src/project/d/da/daa/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Resolution for module 'pkg1' was found in cache from location '/src/project/d/da/daa'.
======== Module name 'pkg1' was not resolved. ========
======== Resolving module 'pkg0' from '/src/project/d/da/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg0' from 'node_modules' folder, target file type 'TypeScript'.
Resolution for module 'pkg0' was found in cache from location '/src/project/d/da'.
======== Module name 'pkg0' was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'. ========
======== Resolving module 'pkg1' from '/src/project/d/da/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Resolution for module 'pkg1' was found in cache from location '/src/project/d/da'.
======== Module name 'pkg1' was not resolved. ========
======== Resolving module 'pkg0' from '/src/project/e/ea/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg0' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/e/ea/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/e/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg0' was found in cache from location '/src/project'.
======== Module name 'pkg0' was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'. ========
======== Resolving module 'pkg1' from '/src/project/e/ea/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/e/ea/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/e/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project'.
======== Module name 'pkg1' was not resolved. ========
======== Resolving module 'pkg0' from '/src/project/e/ea/eaa/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg0' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/e/ea/eaa/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg0' was found in cache from location '/src/project/e/ea'.
======== Module name 'pkg0' was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'. ========
======== Resolving module 'pkg1' from '/src/project/e/ea/eaa/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/e/ea/eaa/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project/e/ea'.
======== Module name 'pkg1' was not resolved. ========
======== Resolving module 'pkg0' from '/src/project/e/ea/eaa/eaaa/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg0' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/e/ea/eaa/eaaa/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg0' was found in cache from location '/src/project/e/ea/eaa'.
======== Module name 'pkg0' was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'. ========
======== Resolving module 'pkg1' from '/src/project/e/ea/eaa/eaaa/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/e/ea/eaa/eaaa/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project/e/ea/eaa'.
======== Module name 'pkg1' was not resolved. ========
[96msrc/project/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96msrc/project/a/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96msrc/project/b/ba/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96msrc/project/c/ca/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96msrc/project/c/ca/caa/caaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96msrc/project/c/cb/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96msrc/project/d/da/daa/daaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96msrc/project/d/da/daa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96msrc/project/d/da/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96msrc/project/e/ea/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96msrc/project/e/ea/eaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96msrc/project/e/ea/eaa/eaaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

lib/lib.d.ts
  Default library for target 'es3'
src/project/node_modules/pkg0/index.d.ts
  Imported via "pkg0" from file 'src/project/fileWithImports.ts'
  Imported via "pkg0" from file 'src/project/a/fileWithImports.ts'
  Imported via "pkg0" from file 'src/project/b/ba/fileWithImports.ts'
  Imported via "pkg0" from file 'src/project/c/ca/fileWithImports.ts'
  Imported via "pkg0" from file 'src/project/c/ca/caa/caaa/fileWithImports.ts'
  Imported via "pkg0" from file 'src/project/c/cb/fileWithImports.ts'
  Imported via "pkg0" from file 'src/project/d/da/daa/daaa/fileWithImports.ts'
  Imported via "pkg0" from file 'src/project/d/da/daa/fileWithImports.ts'
  Imported via "pkg0" from file 'src/project/d/da/fileWithImports.ts'
  Imported via "pkg0" from file 'src/project/e/ea/fileWithImports.ts'
  Imported via "pkg0" from file 'src/project/e/ea/eaa/fileWithImports.ts'
  Imported via "pkg0" from file 'src/project/e/ea/eaa/eaaa/fileWithImports.ts'
src/project/fileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/randomFileForImport.ts
  Part of 'files' list in tsconfig.json
src/project/a/fileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/b/ba/fileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/b/randomFileForImport.ts
  Part of 'files' list in tsconfig.json
src/project/c/ca/fileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/c/ca/caa/randomFileForImport.ts
  Part of 'files' list in tsconfig.json
src/project/c/ca/caa/caaa/fileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/c/cb/fileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts
  Part of 'files' list in tsconfig.json
src/project/d/da/daa/daaa/fileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/d/da/daa/fileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/d/da/fileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/e/ea/fileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/e/ea/eaa/fileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/e/ea/eaa/eaaa/fileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts
  Part of 'files' list in tsconfig.json

Found 12 errors.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped


//// [/src/project/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../lib/lib.d.ts","./node_modules/pkg0/index.d.ts","./filewithimports.ts","./randomfileforimport.ts","./a/filewithimports.ts","./b/ba/filewithimports.ts","./b/randomfileforimport.ts","./c/ca/filewithimports.ts","./c/ca/caa/randomfileforimport.ts","./c/ca/caa/caaa/filewithimports.ts","./c/cb/filewithimports.ts","./d/da/daa/daaa/x/y/z/randomfileforimport.ts","./d/da/daa/daaa/filewithimports.ts","./d/da/daa/filewithimports.ts","./d/da/filewithimports.ts","./e/ea/filewithimports.ts","./e/ea/eaa/filewithimports.ts","./e/ea/eaa/eaaa/filewithimports.ts","./e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts","./a","./b/ba","./c/ca/caa/caaa","./c/cb","./d/da/daa/daaa","./e/ea/eaa/eaaa"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},"769951468-export interface ImportInterface0 {}","9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","-10726455937-export const x = 10;","9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","-10726455937-export const x = 10;","9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","-10726455937-export const x = 10;","9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","-10726455937-export const x = 10;","9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","-10726455937-export const x = 10;"],"options":{"cacheResolutions":true,"composite":true},"fileIdsList":[[2]],"referencedMap":[[5,1],[6,1],[10,1],[8,1],[11,1],[13,1],[14,1],[15,1],[18,1],[17,1],[16,1],[3,1]],"exportedModulesMap":[[5,1],[6,1],[10,1],[8,1],[11,1],[13,1],[14,1],[15,1],[18,1],[17,1],[16,1],[3,1]],"semanticDiagnosticsPerFile":[1,[5,[{"file":"./a/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[6,[{"file":"./b/ba/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],7,[10,[{"file":"./c/ca/caa/caaa/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],9,[8,[{"file":"./c/ca/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[11,[{"file":"./c/cb/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[13,[{"file":"./d/da/daa/daaa/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],12,[14,[{"file":"./d/da/daa/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[15,[{"file":"./d/da/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[18,[{"file":"./e/ea/eaa/eaaa/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],19,[17,[{"file":"./e/ea/eaa/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[16,[{"file":"./e/ea/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[3,[{"file":"./filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],2,4],"affectedFilesPendingEmit":[[5,1],[6,1],[7,1],[10,1],[9,1],[8,1],[11,1],[13,1],[12,1],[14,1],[15,1],[18,1],[19,1],[17,1],[16,1],[3,1],[2,1],[4,1]],"emitSignatures":[3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19],"cacheResolutions":{"resolutions":[{"resolvedModule":{"resolvedFileName":2,"isExternalLibraryImport":true}}],"names":["pkg0"],"resolutionEntries":[[1,1]],"modules":[[20,[1]],[21,[1]],[22,[1]],[23,[1]],[24,[1]],[25,[1]]]}},"version":"FakeTSVersion"}

//// [/src/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
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
      "./d/da/daa/daaa/x/y/z/randomfileforimport.ts",
      "./d/da/daa/daaa/filewithimports.ts",
      "./d/da/daa/filewithimports.ts",
      "./d/da/filewithimports.ts",
      "./e/ea/filewithimports.ts",
      "./e/ea/eaa/filewithimports.ts",
      "./e/ea/eaa/eaaa/filewithimports.ts",
      "./e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts",
      "./a",
      "./b/ba",
      "./c/ca/caa/caaa",
      "./c/cb",
      "./d/da/daa/daaa",
      "./e/ea/eaa/eaaa"
    ],
    "fileNamesList": [
      [
        "./node_modules/pkg0/index.d.ts"
      ]
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./node_modules/pkg0/index.d.ts": {
        "version": "769951468-export interface ImportInterface0 {}",
        "signature": "769951468-export interface ImportInterface0 {}"
      },
      "./filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
      },
      "./randomfileforimport.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-10726455937-export const x = 10;"
      },
      "./a/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
      },
      "./b/ba/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
      },
      "./b/randomfileforimport.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-10726455937-export const x = 10;"
      },
      "./c/ca/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
      },
      "./c/ca/caa/randomfileforimport.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-10726455937-export const x = 10;"
      },
      "./c/ca/caa/caaa/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
      },
      "./c/cb/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
      },
      "./d/da/daa/daaa/x/y/z/randomfileforimport.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-10726455937-export const x = 10;"
      },
      "./d/da/daa/daaa/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
      },
      "./d/da/daa/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
      },
      "./d/da/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
      },
      "./e/ea/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
      },
      "./e/ea/eaa/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
      },
      "./e/ea/eaa/eaaa/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
      },
      "./e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-10726455937-export const x = 10;"
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
    "exportedModulesMap": {
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
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      [
        "./a/filewithimports.ts",
        [
          {
            "file": "./a/filewithimports.ts",
            "start": 84,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      [
        "./b/ba/filewithimports.ts",
        [
          {
            "file": "./b/ba/filewithimports.ts",
            "start": 84,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      "./b/randomfileforimport.ts",
      [
        "./c/ca/caa/caaa/filewithimports.ts",
        [
          {
            "file": "./c/ca/caa/caaa/filewithimports.ts",
            "start": 84,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      "./c/ca/caa/randomfileforimport.ts",
      [
        "./c/ca/filewithimports.ts",
        [
          {
            "file": "./c/ca/filewithimports.ts",
            "start": 84,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      [
        "./c/cb/filewithimports.ts",
        [
          {
            "file": "./c/cb/filewithimports.ts",
            "start": 84,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      [
        "./d/da/daa/daaa/filewithimports.ts",
        [
          {
            "file": "./d/da/daa/daaa/filewithimports.ts",
            "start": 84,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      "./d/da/daa/daaa/x/y/z/randomfileforimport.ts",
      [
        "./d/da/daa/filewithimports.ts",
        [
          {
            "file": "./d/da/daa/filewithimports.ts",
            "start": 84,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      [
        "./d/da/filewithimports.ts",
        [
          {
            "file": "./d/da/filewithimports.ts",
            "start": 84,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      [
        "./e/ea/eaa/eaaa/filewithimports.ts",
        [
          {
            "file": "./e/ea/eaa/eaaa/filewithimports.ts",
            "start": 84,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      "./e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts",
      [
        "./e/ea/eaa/filewithimports.ts",
        [
          {
            "file": "./e/ea/eaa/filewithimports.ts",
            "start": 84,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      [
        "./e/ea/filewithimports.ts",
        [
          {
            "file": "./e/ea/filewithimports.ts",
            "start": 84,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      [
        "./filewithimports.ts",
        [
          {
            "file": "./filewithimports.ts",
            "start": 84,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      "./node_modules/pkg0/index.d.ts",
      "./randomfileforimport.ts"
    ],
    "affectedFilesPendingEmit": [
      [
        "./a/filewithimports.ts",
        "Full"
      ],
      [
        "./b/ba/filewithimports.ts",
        "Full"
      ],
      [
        "./b/randomfileforimport.ts",
        "Full"
      ],
      [
        "./c/ca/caa/caaa/filewithimports.ts",
        "Full"
      ],
      [
        "./c/ca/caa/randomfileforimport.ts",
        "Full"
      ],
      [
        "./c/ca/filewithimports.ts",
        "Full"
      ],
      [
        "./c/cb/filewithimports.ts",
        "Full"
      ],
      [
        "./d/da/daa/daaa/filewithimports.ts",
        "Full"
      ],
      [
        "./d/da/daa/daaa/x/y/z/randomfileforimport.ts",
        "Full"
      ],
      [
        "./d/da/daa/filewithimports.ts",
        "Full"
      ],
      [
        "./d/da/filewithimports.ts",
        "Full"
      ],
      [
        "./e/ea/eaa/eaaa/filewithimports.ts",
        "Full"
      ],
      [
        "./e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts",
        "Full"
      ],
      [
        "./e/ea/eaa/filewithimports.ts",
        "Full"
      ],
      [
        "./e/ea/filewithimports.ts",
        "Full"
      ],
      [
        "./filewithimports.ts",
        "Full"
      ],
      [
        "./node_modules/pkg0/index.d.ts",
        "Full"
      ],
      [
        "./randomfileforimport.ts",
        "Full"
      ]
    ],
    "emitSignatures": [
      "./filewithimports.ts",
      "./randomfileforimport.ts",
      "./a/filewithimports.ts",
      "./b/ba/filewithimports.ts",
      "./b/randomfileforimport.ts",
      "./c/ca/filewithimports.ts",
      "./c/ca/caa/randomfileforimport.ts",
      "./c/ca/caa/caaa/filewithimports.ts",
      "./c/cb/filewithimports.ts",
      "./d/da/daa/daaa/x/y/z/randomfileforimport.ts",
      "./d/da/daa/daaa/filewithimports.ts",
      "./d/da/daa/filewithimports.ts",
      "./d/da/filewithimports.ts",
      "./e/ea/filewithimports.ts",
      "./e/ea/eaa/filewithimports.ts",
      "./e/ea/eaa/eaaa/filewithimports.ts",
      "./e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts"
    ],
    "cacheResolutions": {
      "resolutions": [
        {
          "id": 1,
          "resolvedModule": {
            "resolvedFileName": "./node_modules/pkg0/index.d.ts",
            "isExternalLibraryImport": true
          }
        }
      ],
      "names": [
        "pkg0"
      ],
      "resolutionEntries": [
        [
          "pkg0",
          {
            "id": 1,
            "resolvedModule": {
              "resolvedFileName": "./node_modules/pkg0/index.d.ts",
              "isExternalLibraryImport": true
            }
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
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
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
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
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
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
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
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
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
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
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
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ]
      ]
    }
  },
  "version": "FakeTSVersion",
  "size": 5651
}



Change:: modify randomFileForImport by adding import
Input::
//// [/src/project/randomFileForImport.ts]
import type { ImportInterface0 } from "pkg0";
export const x = 10;



Output::
/lib/tsc -b /src/project --explainFiles
Reusing resolution of module 'pkg0' from '/src/project/fileWithImports.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
File '/src/project/node_modules/pkg1.ts' does not exist.
File '/src/project/node_modules/pkg1.tsx' does not exist.
File '/src/project/node_modules/pkg1.d.ts' does not exist.
Directory '/src/project/node_modules/@types' does not exist, skipping all lookups in it.
Directory '/src/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
Loading module 'pkg1' from 'node_modules' folder, target file type 'JavaScript'.
File '/src/project/node_modules/pkg1.js' does not exist.
File '/src/project/node_modules/pkg1.jsx' does not exist.
Directory '/src/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/randomFileForImport.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/src/project/a/fileWithImports.ts' found in cache from location '/src/project/a', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/a/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/a/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project'.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/b/ba/fileWithImports.ts' found in cache from location '/src/project/b/ba', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/b/ba/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/b/ba/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/b/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project'.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/c/ca/fileWithImports.ts' found in cache from location '/src/project/c/ca', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/c/ca/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/c/ca/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/c/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project'.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/c/ca/caa/caaa/fileWithImports.ts' found in cache from location '/src/project/c/ca/caa/caaa', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/c/ca/caa/caaa/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/c/ca/caa/caaa/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/c/ca/caa/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project/c/ca'.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/c/cb/fileWithImports.ts' found in cache from location '/src/project/c/cb', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/c/cb/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/c/cb/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project/c'.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/daaa/fileWithImports.ts' found in cache from location '/src/project/d/da/daa/daaa', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/d/da/daa/daaa/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/d/da/daa/daaa/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/d/da/daa/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/d/da/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/d/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project'.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/fileWithImports.ts' found in cache from location '/src/project/d/da/daa', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/d/da/daa/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Resolution for module 'pkg1' was found in cache from location '/src/project/d/da/daa'.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/d/da/fileWithImports.ts' found in cache from location '/src/project/d/da', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/d/da/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Resolution for module 'pkg1' was found in cache from location '/src/project/d/da'.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/e/ea/fileWithImports.ts' found in cache from location '/src/project/e/ea', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/e/ea/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/e/ea/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/e/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project'.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/fileWithImports.ts' found in cache from location '/src/project/e/ea/eaa', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/e/ea/eaa/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/e/ea/eaa/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project/e/ea'.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/eaaa/fileWithImports.ts' found in cache from location '/src/project/e/ea/eaa/eaaa', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/e/ea/eaa/eaaa/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/e/ea/eaa/eaaa/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project/e/ea/eaa'.
======== Module name 'pkg1' was not resolved. ========
[96msrc/project/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96msrc/project/a/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96msrc/project/b/ba/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96msrc/project/c/ca/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96msrc/project/c/ca/caa/caaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96msrc/project/c/cb/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96msrc/project/d/da/daa/daaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96msrc/project/d/da/daa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96msrc/project/d/da/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96msrc/project/e/ea/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96msrc/project/e/ea/eaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96msrc/project/e/ea/eaa/eaaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

lib/lib.d.ts
  Default library for target 'es3'
src/project/node_modules/pkg0/index.d.ts
  Imported via "pkg0" from file 'src/project/fileWithImports.ts'
  Imported via "pkg0" from file 'src/project/randomFileForImport.ts'
  Imported via "pkg0" from file 'src/project/a/fileWithImports.ts'
  Imported via "pkg0" from file 'src/project/b/ba/fileWithImports.ts'
  Imported via "pkg0" from file 'src/project/c/ca/fileWithImports.ts'
  Imported via "pkg0" from file 'src/project/c/ca/caa/caaa/fileWithImports.ts'
  Imported via "pkg0" from file 'src/project/c/cb/fileWithImports.ts'
  Imported via "pkg0" from file 'src/project/d/da/daa/daaa/fileWithImports.ts'
  Imported via "pkg0" from file 'src/project/d/da/daa/fileWithImports.ts'
  Imported via "pkg0" from file 'src/project/d/da/fileWithImports.ts'
  Imported via "pkg0" from file 'src/project/e/ea/fileWithImports.ts'
  Imported via "pkg0" from file 'src/project/e/ea/eaa/fileWithImports.ts'
  Imported via "pkg0" from file 'src/project/e/ea/eaa/eaaa/fileWithImports.ts'
src/project/fileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/randomFileForImport.ts
  Part of 'files' list in tsconfig.json
src/project/a/fileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/b/ba/fileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/b/randomFileForImport.ts
  Part of 'files' list in tsconfig.json
src/project/c/ca/fileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/c/ca/caa/randomFileForImport.ts
  Part of 'files' list in tsconfig.json
src/project/c/ca/caa/caaa/fileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/c/cb/fileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts
  Part of 'files' list in tsconfig.json
src/project/d/da/daa/daaa/fileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/d/da/daa/fileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/d/da/fileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/e/ea/fileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/e/ea/eaa/fileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/e/ea/eaa/eaaa/fileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts
  Part of 'files' list in tsconfig.json

Found 12 errors.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped


//// [/src/project/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../lib/lib.d.ts","./node_modules/pkg0/index.d.ts","./filewithimports.ts","./randomfileforimport.ts","./a/filewithimports.ts","./b/ba/filewithimports.ts","./b/randomfileforimport.ts","./c/ca/filewithimports.ts","./c/ca/caa/randomfileforimport.ts","./c/ca/caa/caaa/filewithimports.ts","./c/cb/filewithimports.ts","./d/da/daa/daaa/x/y/z/randomfileforimport.ts","./d/da/daa/daaa/filewithimports.ts","./d/da/daa/filewithimports.ts","./d/da/filewithimports.ts","./e/ea/filewithimports.ts","./e/ea/eaa/filewithimports.ts","./e/ea/eaa/eaaa/filewithimports.ts","./e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts","./a","./b/ba","./c/ca/caa/caaa","./c/cb","./d/da/daa/daaa","./e/ea/eaa/eaaa"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},"769951468-export interface ImportInterface0 {}","9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",{"version":"10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;","signature":"-6057683066-export declare const x = 10;\r\n"},"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","-10726455937-export const x = 10;","9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","-10726455937-export const x = 10;","9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","-10726455937-export const x = 10;","9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","-10726455937-export const x = 10;"],"options":{"cacheResolutions":true,"composite":true},"fileIdsList":[[2]],"referencedMap":[[5,1],[6,1],[10,1],[8,1],[11,1],[13,1],[14,1],[15,1],[18,1],[17,1],[16,1],[3,1],[4,1]],"exportedModulesMap":[[5,1],[6,1],[10,1],[8,1],[11,1],[13,1],[14,1],[15,1],[18,1],[17,1],[16,1],[3,1]],"semanticDiagnosticsPerFile":[1,[5,[{"file":"./a/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[6,[{"file":"./b/ba/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],7,[10,[{"file":"./c/ca/caa/caaa/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],9,[8,[{"file":"./c/ca/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[11,[{"file":"./c/cb/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[13,[{"file":"./d/da/daa/daaa/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],12,[14,[{"file":"./d/da/daa/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[15,[{"file":"./d/da/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[18,[{"file":"./e/ea/eaa/eaaa/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],19,[17,[{"file":"./e/ea/eaa/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[16,[{"file":"./e/ea/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[3,[{"file":"./filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],2,4],"affectedFilesPendingEmit":[[5,1],[6,1],[7,1],[10,1],[9,1],[8,1],[11,1],[13,1],[12,1],[14,1],[15,1],[18,1],[19,1],[17,1],[16,1],[3,1],[2,1],[4,1]],"emitSignatures":[3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19],"cacheResolutions":{"resolutions":[{"resolvedModule":{"resolvedFileName":2,"isExternalLibraryImport":true}}],"names":["pkg0"],"resolutionEntries":[[1,1]],"modules":[[20,[1]],[21,[1]],[22,[1]],[23,[1]],[24,[1]],[25,[1]]]}},"version":"FakeTSVersion"}

//// [/src/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
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
      "./d/da/daa/daaa/x/y/z/randomfileforimport.ts",
      "./d/da/daa/daaa/filewithimports.ts",
      "./d/da/daa/filewithimports.ts",
      "./d/da/filewithimports.ts",
      "./e/ea/filewithimports.ts",
      "./e/ea/eaa/filewithimports.ts",
      "./e/ea/eaa/eaaa/filewithimports.ts",
      "./e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts",
      "./a",
      "./b/ba",
      "./c/ca/caa/caaa",
      "./c/cb",
      "./d/da/daa/daaa",
      "./e/ea/eaa/eaaa"
    ],
    "fileNamesList": [
      [
        "./node_modules/pkg0/index.d.ts"
      ]
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./node_modules/pkg0/index.d.ts": {
        "version": "769951468-export interface ImportInterface0 {}",
        "signature": "769951468-export interface ImportInterface0 {}"
      },
      "./filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
      },
      "./randomfileforimport.ts": {
        "version": "10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;",
        "signature": "-6057683066-export declare const x = 10;\r\n"
      },
      "./a/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
      },
      "./b/ba/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
      },
      "./b/randomfileforimport.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-10726455937-export const x = 10;"
      },
      "./c/ca/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
      },
      "./c/ca/caa/randomfileforimport.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-10726455937-export const x = 10;"
      },
      "./c/ca/caa/caaa/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
      },
      "./c/cb/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
      },
      "./d/da/daa/daaa/x/y/z/randomfileforimport.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-10726455937-export const x = 10;"
      },
      "./d/da/daa/daaa/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
      },
      "./d/da/daa/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
      },
      "./d/da/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
      },
      "./e/ea/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
      },
      "./e/ea/eaa/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
      },
      "./e/ea/eaa/eaaa/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
      },
      "./e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-10726455937-export const x = 10;"
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
    "exportedModulesMap": {
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
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      [
        "./a/filewithimports.ts",
        [
          {
            "file": "./a/filewithimports.ts",
            "start": 84,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      [
        "./b/ba/filewithimports.ts",
        [
          {
            "file": "./b/ba/filewithimports.ts",
            "start": 84,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      "./b/randomfileforimport.ts",
      [
        "./c/ca/caa/caaa/filewithimports.ts",
        [
          {
            "file": "./c/ca/caa/caaa/filewithimports.ts",
            "start": 84,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      "./c/ca/caa/randomfileforimport.ts",
      [
        "./c/ca/filewithimports.ts",
        [
          {
            "file": "./c/ca/filewithimports.ts",
            "start": 84,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      [
        "./c/cb/filewithimports.ts",
        [
          {
            "file": "./c/cb/filewithimports.ts",
            "start": 84,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      [
        "./d/da/daa/daaa/filewithimports.ts",
        [
          {
            "file": "./d/da/daa/daaa/filewithimports.ts",
            "start": 84,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      "./d/da/daa/daaa/x/y/z/randomfileforimport.ts",
      [
        "./d/da/daa/filewithimports.ts",
        [
          {
            "file": "./d/da/daa/filewithimports.ts",
            "start": 84,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      [
        "./d/da/filewithimports.ts",
        [
          {
            "file": "./d/da/filewithimports.ts",
            "start": 84,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      [
        "./e/ea/eaa/eaaa/filewithimports.ts",
        [
          {
            "file": "./e/ea/eaa/eaaa/filewithimports.ts",
            "start": 84,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      "./e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts",
      [
        "./e/ea/eaa/filewithimports.ts",
        [
          {
            "file": "./e/ea/eaa/filewithimports.ts",
            "start": 84,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      [
        "./e/ea/filewithimports.ts",
        [
          {
            "file": "./e/ea/filewithimports.ts",
            "start": 84,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      [
        "./filewithimports.ts",
        [
          {
            "file": "./filewithimports.ts",
            "start": 84,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      "./node_modules/pkg0/index.d.ts",
      "./randomfileforimport.ts"
    ],
    "affectedFilesPendingEmit": [
      [
        "./a/filewithimports.ts",
        "Full"
      ],
      [
        "./b/ba/filewithimports.ts",
        "Full"
      ],
      [
        "./b/randomfileforimport.ts",
        "Full"
      ],
      [
        "./c/ca/caa/caaa/filewithimports.ts",
        "Full"
      ],
      [
        "./c/ca/caa/randomfileforimport.ts",
        "Full"
      ],
      [
        "./c/ca/filewithimports.ts",
        "Full"
      ],
      [
        "./c/cb/filewithimports.ts",
        "Full"
      ],
      [
        "./d/da/daa/daaa/filewithimports.ts",
        "Full"
      ],
      [
        "./d/da/daa/daaa/x/y/z/randomfileforimport.ts",
        "Full"
      ],
      [
        "./d/da/daa/filewithimports.ts",
        "Full"
      ],
      [
        "./d/da/filewithimports.ts",
        "Full"
      ],
      [
        "./e/ea/eaa/eaaa/filewithimports.ts",
        "Full"
      ],
      [
        "./e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts",
        "Full"
      ],
      [
        "./e/ea/eaa/filewithimports.ts",
        "Full"
      ],
      [
        "./e/ea/filewithimports.ts",
        "Full"
      ],
      [
        "./filewithimports.ts",
        "Full"
      ],
      [
        "./node_modules/pkg0/index.d.ts",
        "Full"
      ],
      [
        "./randomfileforimport.ts",
        "Full"
      ]
    ],
    "emitSignatures": [
      "./filewithimports.ts",
      "./randomfileforimport.ts",
      "./a/filewithimports.ts",
      "./b/ba/filewithimports.ts",
      "./b/randomfileforimport.ts",
      "./c/ca/filewithimports.ts",
      "./c/ca/caa/randomfileforimport.ts",
      "./c/ca/caa/caaa/filewithimports.ts",
      "./c/cb/filewithimports.ts",
      "./d/da/daa/daaa/x/y/z/randomfileforimport.ts",
      "./d/da/daa/daaa/filewithimports.ts",
      "./d/da/daa/filewithimports.ts",
      "./d/da/filewithimports.ts",
      "./e/ea/filewithimports.ts",
      "./e/ea/eaa/filewithimports.ts",
      "./e/ea/eaa/eaaa/filewithimports.ts",
      "./e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts"
    ],
    "cacheResolutions": {
      "resolutions": [
        {
          "id": 1,
          "resolvedModule": {
            "resolvedFileName": "./node_modules/pkg0/index.d.ts",
            "isExternalLibraryImport": true
          }
        }
      ],
      "names": [
        "pkg0"
      ],
      "resolutionEntries": [
        [
          "pkg0",
          {
            "id": 1,
            "resolvedModule": {
              "resolvedFileName": "./node_modules/pkg0/index.d.ts",
              "isExternalLibraryImport": true
            }
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
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
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
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
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
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
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
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
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
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
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
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ]
      ]
    }
  },
  "version": "FakeTSVersion",
  "size": 5776
}



Change:: modify b/randomFileForImport by adding import
Input::
//// [/src/project/b/randomFileForImport.ts]
import type { ImportInterface0 } from "pkg0";
export const x = 10;



Output::
/lib/tsc -b /src/project --explainFiles
Reusing resolution of module 'pkg0' from '/src/project/fileWithImports.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
File '/src/project/node_modules/pkg1.ts' does not exist.
File '/src/project/node_modules/pkg1.tsx' does not exist.
File '/src/project/node_modules/pkg1.d.ts' does not exist.
Directory '/src/project/node_modules/@types' does not exist, skipping all lookups in it.
Directory '/src/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
Loading module 'pkg1' from 'node_modules' folder, target file type 'JavaScript'.
File '/src/project/node_modules/pkg1.js' does not exist.
File '/src/project/node_modules/pkg1.jsx' does not exist.
Directory '/src/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/randomFileForImport.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/src/project/a/fileWithImports.ts' found in cache from location '/src/project/a', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/a/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/a/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project'.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/b/ba/fileWithImports.ts' found in cache from location '/src/project/b/ba', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/b/ba/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/b/ba/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/b/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project'.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/b/randomFileForImport.ts' found in cache from location '/src/project/b', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/src/project/c/ca/fileWithImports.ts' found in cache from location '/src/project/c/ca', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/c/ca/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/c/ca/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/c/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project'.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/c/ca/caa/caaa/fileWithImports.ts' found in cache from location '/src/project/c/ca/caa/caaa', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/c/ca/caa/caaa/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/c/ca/caa/caaa/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/c/ca/caa/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project/c/ca'.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/c/cb/fileWithImports.ts' found in cache from location '/src/project/c/cb', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/c/cb/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/c/cb/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project/c'.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/daaa/fileWithImports.ts' found in cache from location '/src/project/d/da/daa/daaa', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/d/da/daa/daaa/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/d/da/daa/daaa/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/d/da/daa/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/d/da/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/d/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project'.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/fileWithImports.ts' found in cache from location '/src/project/d/da/daa', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/d/da/daa/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Resolution for module 'pkg1' was found in cache from location '/src/project/d/da/daa'.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/d/da/fileWithImports.ts' found in cache from location '/src/project/d/da', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/d/da/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Resolution for module 'pkg1' was found in cache from location '/src/project/d/da'.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/e/ea/fileWithImports.ts' found in cache from location '/src/project/e/ea', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/e/ea/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/e/ea/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/e/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project'.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/fileWithImports.ts' found in cache from location '/src/project/e/ea/eaa', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/e/ea/eaa/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/e/ea/eaa/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project/e/ea'.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/eaaa/fileWithImports.ts' found in cache from location '/src/project/e/ea/eaa/eaaa', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/e/ea/eaa/eaaa/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/e/ea/eaa/eaaa/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project/e/ea/eaa'.
======== Module name 'pkg1' was not resolved. ========
[96msrc/project/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96msrc/project/a/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96msrc/project/b/ba/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96msrc/project/c/ca/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96msrc/project/c/ca/caa/caaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96msrc/project/c/cb/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96msrc/project/d/da/daa/daaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96msrc/project/d/da/daa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96msrc/project/d/da/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96msrc/project/e/ea/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96msrc/project/e/ea/eaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96msrc/project/e/ea/eaa/eaaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

lib/lib.d.ts
  Default library for target 'es3'
src/project/node_modules/pkg0/index.d.ts
  Imported via "pkg0" from file 'src/project/fileWithImports.ts'
  Imported via "pkg0" from file 'src/project/randomFileForImport.ts'
  Imported via "pkg0" from file 'src/project/a/fileWithImports.ts'
  Imported via "pkg0" from file 'src/project/b/ba/fileWithImports.ts'
  Imported via "pkg0" from file 'src/project/b/randomFileForImport.ts'
  Imported via "pkg0" from file 'src/project/c/ca/fileWithImports.ts'
  Imported via "pkg0" from file 'src/project/c/ca/caa/caaa/fileWithImports.ts'
  Imported via "pkg0" from file 'src/project/c/cb/fileWithImports.ts'
  Imported via "pkg0" from file 'src/project/d/da/daa/daaa/fileWithImports.ts'
  Imported via "pkg0" from file 'src/project/d/da/daa/fileWithImports.ts'
  Imported via "pkg0" from file 'src/project/d/da/fileWithImports.ts'
  Imported via "pkg0" from file 'src/project/e/ea/fileWithImports.ts'
  Imported via "pkg0" from file 'src/project/e/ea/eaa/fileWithImports.ts'
  Imported via "pkg0" from file 'src/project/e/ea/eaa/eaaa/fileWithImports.ts'
src/project/fileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/randomFileForImport.ts
  Part of 'files' list in tsconfig.json
src/project/a/fileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/b/ba/fileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/b/randomFileForImport.ts
  Part of 'files' list in tsconfig.json
src/project/c/ca/fileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/c/ca/caa/randomFileForImport.ts
  Part of 'files' list in tsconfig.json
src/project/c/ca/caa/caaa/fileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/c/cb/fileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts
  Part of 'files' list in tsconfig.json
src/project/d/da/daa/daaa/fileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/d/da/daa/fileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/d/da/fileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/e/ea/fileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/e/ea/eaa/fileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/e/ea/eaa/eaaa/fileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts
  Part of 'files' list in tsconfig.json

Found 12 errors.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped


//// [/src/project/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../lib/lib.d.ts","./node_modules/pkg0/index.d.ts","./filewithimports.ts","./randomfileforimport.ts","./a/filewithimports.ts","./b/ba/filewithimports.ts","./b/randomfileforimport.ts","./c/ca/filewithimports.ts","./c/ca/caa/randomfileforimport.ts","./c/ca/caa/caaa/filewithimports.ts","./c/cb/filewithimports.ts","./d/da/daa/daaa/x/y/z/randomfileforimport.ts","./d/da/daa/daaa/filewithimports.ts","./d/da/daa/filewithimports.ts","./d/da/filewithimports.ts","./e/ea/filewithimports.ts","./e/ea/eaa/filewithimports.ts","./e/ea/eaa/eaaa/filewithimports.ts","./e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts","./a","./b/ba","./c/ca/caa/caaa","./c/cb","./d/da/daa/daaa","./e/ea/eaa/eaaa"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},"769951468-export interface ImportInterface0 {}","9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",{"version":"10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;","signature":"-6057683066-export declare const x = 10;\r\n"},"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",{"version":"10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;","signature":"-6057683066-export declare const x = 10;\r\n"},"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","-10726455937-export const x = 10;","9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","-10726455937-export const x = 10;","9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","-10726455937-export const x = 10;"],"options":{"cacheResolutions":true,"composite":true},"fileIdsList":[[2]],"referencedMap":[[5,1],[6,1],[7,1],[10,1],[8,1],[11,1],[13,1],[14,1],[15,1],[18,1],[17,1],[16,1],[3,1],[4,1]],"exportedModulesMap":[[5,1],[6,1],[10,1],[8,1],[11,1],[13,1],[14,1],[15,1],[18,1],[17,1],[16,1],[3,1]],"semanticDiagnosticsPerFile":[1,[5,[{"file":"./a/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[6,[{"file":"./b/ba/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],7,[10,[{"file":"./c/ca/caa/caaa/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],9,[8,[{"file":"./c/ca/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[11,[{"file":"./c/cb/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[13,[{"file":"./d/da/daa/daaa/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],12,[14,[{"file":"./d/da/daa/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[15,[{"file":"./d/da/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[18,[{"file":"./e/ea/eaa/eaaa/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],19,[17,[{"file":"./e/ea/eaa/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[16,[{"file":"./e/ea/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[3,[{"file":"./filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],2,4],"affectedFilesPendingEmit":[[5,1],[6,1],[7,1],[10,1],[9,1],[8,1],[11,1],[13,1],[12,1],[14,1],[15,1],[18,1],[19,1],[17,1],[16,1],[3,1],[2,1],[4,1]],"emitSignatures":[3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19],"cacheResolutions":{"resolutions":[{"resolvedModule":{"resolvedFileName":2,"isExternalLibraryImport":true}}],"names":["pkg0"],"resolutionEntries":[[1,1]],"modules":[[20,[1]],[21,[1]],[22,[1]],[23,[1]],[24,[1]],[25,[1]]]}},"version":"FakeTSVersion"}

//// [/src/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
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
      "./d/da/daa/daaa/x/y/z/randomfileforimport.ts",
      "./d/da/daa/daaa/filewithimports.ts",
      "./d/da/daa/filewithimports.ts",
      "./d/da/filewithimports.ts",
      "./e/ea/filewithimports.ts",
      "./e/ea/eaa/filewithimports.ts",
      "./e/ea/eaa/eaaa/filewithimports.ts",
      "./e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts",
      "./a",
      "./b/ba",
      "./c/ca/caa/caaa",
      "./c/cb",
      "./d/da/daa/daaa",
      "./e/ea/eaa/eaaa"
    ],
    "fileNamesList": [
      [
        "./node_modules/pkg0/index.d.ts"
      ]
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./node_modules/pkg0/index.d.ts": {
        "version": "769951468-export interface ImportInterface0 {}",
        "signature": "769951468-export interface ImportInterface0 {}"
      },
      "./filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
      },
      "./randomfileforimport.ts": {
        "version": "10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;",
        "signature": "-6057683066-export declare const x = 10;\r\n"
      },
      "./a/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
      },
      "./b/ba/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
      },
      "./b/randomfileforimport.ts": {
        "version": "10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;",
        "signature": "-6057683066-export declare const x = 10;\r\n"
      },
      "./c/ca/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
      },
      "./c/ca/caa/randomfileforimport.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-10726455937-export const x = 10;"
      },
      "./c/ca/caa/caaa/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
      },
      "./c/cb/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
      },
      "./d/da/daa/daaa/x/y/z/randomfileforimport.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-10726455937-export const x = 10;"
      },
      "./d/da/daa/daaa/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
      },
      "./d/da/daa/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
      },
      "./d/da/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
      },
      "./e/ea/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
      },
      "./e/ea/eaa/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
      },
      "./e/ea/eaa/eaaa/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
      },
      "./e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-10726455937-export const x = 10;"
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
    "exportedModulesMap": {
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
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      [
        "./a/filewithimports.ts",
        [
          {
            "file": "./a/filewithimports.ts",
            "start": 84,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      [
        "./b/ba/filewithimports.ts",
        [
          {
            "file": "./b/ba/filewithimports.ts",
            "start": 84,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      "./b/randomfileforimport.ts",
      [
        "./c/ca/caa/caaa/filewithimports.ts",
        [
          {
            "file": "./c/ca/caa/caaa/filewithimports.ts",
            "start": 84,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      "./c/ca/caa/randomfileforimport.ts",
      [
        "./c/ca/filewithimports.ts",
        [
          {
            "file": "./c/ca/filewithimports.ts",
            "start": 84,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      [
        "./c/cb/filewithimports.ts",
        [
          {
            "file": "./c/cb/filewithimports.ts",
            "start": 84,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      [
        "./d/da/daa/daaa/filewithimports.ts",
        [
          {
            "file": "./d/da/daa/daaa/filewithimports.ts",
            "start": 84,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      "./d/da/daa/daaa/x/y/z/randomfileforimport.ts",
      [
        "./d/da/daa/filewithimports.ts",
        [
          {
            "file": "./d/da/daa/filewithimports.ts",
            "start": 84,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      [
        "./d/da/filewithimports.ts",
        [
          {
            "file": "./d/da/filewithimports.ts",
            "start": 84,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      [
        "./e/ea/eaa/eaaa/filewithimports.ts",
        [
          {
            "file": "./e/ea/eaa/eaaa/filewithimports.ts",
            "start": 84,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      "./e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts",
      [
        "./e/ea/eaa/filewithimports.ts",
        [
          {
            "file": "./e/ea/eaa/filewithimports.ts",
            "start": 84,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      [
        "./e/ea/filewithimports.ts",
        [
          {
            "file": "./e/ea/filewithimports.ts",
            "start": 84,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      [
        "./filewithimports.ts",
        [
          {
            "file": "./filewithimports.ts",
            "start": 84,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      "./node_modules/pkg0/index.d.ts",
      "./randomfileforimport.ts"
    ],
    "affectedFilesPendingEmit": [
      [
        "./a/filewithimports.ts",
        "Full"
      ],
      [
        "./b/ba/filewithimports.ts",
        "Full"
      ],
      [
        "./b/randomfileforimport.ts",
        "Full"
      ],
      [
        "./c/ca/caa/caaa/filewithimports.ts",
        "Full"
      ],
      [
        "./c/ca/caa/randomfileforimport.ts",
        "Full"
      ],
      [
        "./c/ca/filewithimports.ts",
        "Full"
      ],
      [
        "./c/cb/filewithimports.ts",
        "Full"
      ],
      [
        "./d/da/daa/daaa/filewithimports.ts",
        "Full"
      ],
      [
        "./d/da/daa/daaa/x/y/z/randomfileforimport.ts",
        "Full"
      ],
      [
        "./d/da/daa/filewithimports.ts",
        "Full"
      ],
      [
        "./d/da/filewithimports.ts",
        "Full"
      ],
      [
        "./e/ea/eaa/eaaa/filewithimports.ts",
        "Full"
      ],
      [
        "./e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts",
        "Full"
      ],
      [
        "./e/ea/eaa/filewithimports.ts",
        "Full"
      ],
      [
        "./e/ea/filewithimports.ts",
        "Full"
      ],
      [
        "./filewithimports.ts",
        "Full"
      ],
      [
        "./node_modules/pkg0/index.d.ts",
        "Full"
      ],
      [
        "./randomfileforimport.ts",
        "Full"
      ]
    ],
    "emitSignatures": [
      "./filewithimports.ts",
      "./randomfileforimport.ts",
      "./a/filewithimports.ts",
      "./b/ba/filewithimports.ts",
      "./b/randomfileforimport.ts",
      "./c/ca/filewithimports.ts",
      "./c/ca/caa/randomfileforimport.ts",
      "./c/ca/caa/caaa/filewithimports.ts",
      "./c/cb/filewithimports.ts",
      "./d/da/daa/daaa/x/y/z/randomfileforimport.ts",
      "./d/da/daa/daaa/filewithimports.ts",
      "./d/da/daa/filewithimports.ts",
      "./d/da/filewithimports.ts",
      "./e/ea/filewithimports.ts",
      "./e/ea/eaa/filewithimports.ts",
      "./e/ea/eaa/eaaa/filewithimports.ts",
      "./e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts"
    ],
    "cacheResolutions": {
      "resolutions": [
        {
          "id": 1,
          "resolvedModule": {
            "resolvedFileName": "./node_modules/pkg0/index.d.ts",
            "isExternalLibraryImport": true
          }
        }
      ],
      "names": [
        "pkg0"
      ],
      "resolutionEntries": [
        [
          "pkg0",
          {
            "id": 1,
            "resolvedModule": {
              "resolvedFileName": "./node_modules/pkg0/index.d.ts",
              "isExternalLibraryImport": true
            }
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
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
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
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
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
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
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
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
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
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
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
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ]
      ]
    }
  },
  "version": "FakeTSVersion",
  "size": 5901
}



Change:: modify c/ca/caa/randomFileForImport by adding import
Input::
//// [/src/project/c/ca/caa/randomFileForImport.ts]
import type { ImportInterface0 } from "pkg0";
export const x = 10;



Output::
/lib/tsc -b /src/project --explainFiles
Reusing resolution of module 'pkg0' from '/src/project/fileWithImports.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
File '/src/project/node_modules/pkg1.ts' does not exist.
File '/src/project/node_modules/pkg1.tsx' does not exist.
File '/src/project/node_modules/pkg1.d.ts' does not exist.
Directory '/src/project/node_modules/@types' does not exist, skipping all lookups in it.
Directory '/src/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
Loading module 'pkg1' from 'node_modules' folder, target file type 'JavaScript'.
File '/src/project/node_modules/pkg1.js' does not exist.
File '/src/project/node_modules/pkg1.jsx' does not exist.
Directory '/src/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/randomFileForImport.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/src/project/a/fileWithImports.ts' found in cache from location '/src/project/a', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/a/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/a/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project'.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/b/ba/fileWithImports.ts' found in cache from location '/src/project/b/ba', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/b/ba/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/b/ba/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/b/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project'.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/b/randomFileForImport.ts' found in cache from location '/src/project/b', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/src/project/c/ca/fileWithImports.ts' found in cache from location '/src/project/c/ca', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/c/ca/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/c/ca/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/c/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project'.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/c/ca/caa/randomFileForImport.ts' found in cache from location '/src/project/c/ca/caa', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/src/project/c/ca/caa/caaa/fileWithImports.ts' found in cache from location '/src/project/c/ca/caa/caaa', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/c/ca/caa/caaa/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/c/ca/caa/caaa/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/c/ca/caa/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project/c/ca'.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/c/cb/fileWithImports.ts' found in cache from location '/src/project/c/cb', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/c/cb/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/c/cb/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project/c'.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/daaa/fileWithImports.ts' found in cache from location '/src/project/d/da/daa/daaa', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/d/da/daa/daaa/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/d/da/daa/daaa/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/d/da/daa/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/d/da/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/d/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project'.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/fileWithImports.ts' found in cache from location '/src/project/d/da/daa', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/d/da/daa/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Resolution for module 'pkg1' was found in cache from location '/src/project/d/da/daa'.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/d/da/fileWithImports.ts' found in cache from location '/src/project/d/da', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/d/da/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Resolution for module 'pkg1' was found in cache from location '/src/project/d/da'.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/e/ea/fileWithImports.ts' found in cache from location '/src/project/e/ea', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/e/ea/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/e/ea/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/e/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project'.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/fileWithImports.ts' found in cache from location '/src/project/e/ea/eaa', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/e/ea/eaa/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/e/ea/eaa/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project/e/ea'.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/eaaa/fileWithImports.ts' found in cache from location '/src/project/e/ea/eaa/eaaa', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/e/ea/eaa/eaaa/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/e/ea/eaa/eaaa/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project/e/ea/eaa'.
======== Module name 'pkg1' was not resolved. ========
[96msrc/project/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96msrc/project/a/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96msrc/project/b/ba/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96msrc/project/c/ca/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96msrc/project/c/ca/caa/caaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96msrc/project/c/cb/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96msrc/project/d/da/daa/daaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96msrc/project/d/da/daa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96msrc/project/d/da/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96msrc/project/e/ea/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96msrc/project/e/ea/eaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96msrc/project/e/ea/eaa/eaaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

lib/lib.d.ts
  Default library for target 'es3'
src/project/node_modules/pkg0/index.d.ts
  Imported via "pkg0" from file 'src/project/fileWithImports.ts'
  Imported via "pkg0" from file 'src/project/randomFileForImport.ts'
  Imported via "pkg0" from file 'src/project/a/fileWithImports.ts'
  Imported via "pkg0" from file 'src/project/b/ba/fileWithImports.ts'
  Imported via "pkg0" from file 'src/project/b/randomFileForImport.ts'
  Imported via "pkg0" from file 'src/project/c/ca/fileWithImports.ts'
  Imported via "pkg0" from file 'src/project/c/ca/caa/randomFileForImport.ts'
  Imported via "pkg0" from file 'src/project/c/ca/caa/caaa/fileWithImports.ts'
  Imported via "pkg0" from file 'src/project/c/cb/fileWithImports.ts'
  Imported via "pkg0" from file 'src/project/d/da/daa/daaa/fileWithImports.ts'
  Imported via "pkg0" from file 'src/project/d/da/daa/fileWithImports.ts'
  Imported via "pkg0" from file 'src/project/d/da/fileWithImports.ts'
  Imported via "pkg0" from file 'src/project/e/ea/fileWithImports.ts'
  Imported via "pkg0" from file 'src/project/e/ea/eaa/fileWithImports.ts'
  Imported via "pkg0" from file 'src/project/e/ea/eaa/eaaa/fileWithImports.ts'
src/project/fileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/randomFileForImport.ts
  Part of 'files' list in tsconfig.json
src/project/a/fileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/b/ba/fileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/b/randomFileForImport.ts
  Part of 'files' list in tsconfig.json
src/project/c/ca/fileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/c/ca/caa/randomFileForImport.ts
  Part of 'files' list in tsconfig.json
src/project/c/ca/caa/caaa/fileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/c/cb/fileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts
  Part of 'files' list in tsconfig.json
src/project/d/da/daa/daaa/fileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/d/da/daa/fileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/d/da/fileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/e/ea/fileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/e/ea/eaa/fileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/e/ea/eaa/eaaa/fileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts
  Part of 'files' list in tsconfig.json

Found 12 errors.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped


//// [/src/project/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../lib/lib.d.ts","./node_modules/pkg0/index.d.ts","./filewithimports.ts","./randomfileforimport.ts","./a/filewithimports.ts","./b/ba/filewithimports.ts","./b/randomfileforimport.ts","./c/ca/filewithimports.ts","./c/ca/caa/randomfileforimport.ts","./c/ca/caa/caaa/filewithimports.ts","./c/cb/filewithimports.ts","./d/da/daa/daaa/x/y/z/randomfileforimport.ts","./d/da/daa/daaa/filewithimports.ts","./d/da/daa/filewithimports.ts","./d/da/filewithimports.ts","./e/ea/filewithimports.ts","./e/ea/eaa/filewithimports.ts","./e/ea/eaa/eaaa/filewithimports.ts","./e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts","./a","./b/ba","./c/ca/caa/caaa","./c/cb","./d/da/daa/daaa","./e/ea/eaa/eaaa"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},"769951468-export interface ImportInterface0 {}","9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",{"version":"10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;","signature":"-6057683066-export declare const x = 10;\r\n"},"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",{"version":"10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;","signature":"-6057683066-export declare const x = 10;\r\n"},"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",{"version":"10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;","signature":"-6057683066-export declare const x = 10;\r\n"},"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","-10726455937-export const x = 10;","9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","-10726455937-export const x = 10;"],"options":{"cacheResolutions":true,"composite":true},"fileIdsList":[[2]],"referencedMap":[[5,1],[6,1],[7,1],[10,1],[9,1],[8,1],[11,1],[13,1],[14,1],[15,1],[18,1],[17,1],[16,1],[3,1],[4,1]],"exportedModulesMap":[[5,1],[6,1],[10,1],[8,1],[11,1],[13,1],[14,1],[15,1],[18,1],[17,1],[16,1],[3,1]],"semanticDiagnosticsPerFile":[1,[5,[{"file":"./a/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[6,[{"file":"./b/ba/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],7,[10,[{"file":"./c/ca/caa/caaa/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],9,[8,[{"file":"./c/ca/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[11,[{"file":"./c/cb/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[13,[{"file":"./d/da/daa/daaa/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],12,[14,[{"file":"./d/da/daa/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[15,[{"file":"./d/da/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[18,[{"file":"./e/ea/eaa/eaaa/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],19,[17,[{"file":"./e/ea/eaa/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[16,[{"file":"./e/ea/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[3,[{"file":"./filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],2,4],"affectedFilesPendingEmit":[[5,1],[6,1],[7,1],[10,1],[9,1],[8,1],[11,1],[13,1],[12,1],[14,1],[15,1],[18,1],[19,1],[17,1],[16,1],[3,1],[2,1],[4,1]],"emitSignatures":[3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19],"cacheResolutions":{"resolutions":[{"resolvedModule":{"resolvedFileName":2,"isExternalLibraryImport":true}}],"names":["pkg0"],"resolutionEntries":[[1,1]],"modules":[[20,[1]],[21,[1]],[22,[1]],[23,[1]],[24,[1]],[25,[1]]]}},"version":"FakeTSVersion"}

//// [/src/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
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
      "./d/da/daa/daaa/x/y/z/randomfileforimport.ts",
      "./d/da/daa/daaa/filewithimports.ts",
      "./d/da/daa/filewithimports.ts",
      "./d/da/filewithimports.ts",
      "./e/ea/filewithimports.ts",
      "./e/ea/eaa/filewithimports.ts",
      "./e/ea/eaa/eaaa/filewithimports.ts",
      "./e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts",
      "./a",
      "./b/ba",
      "./c/ca/caa/caaa",
      "./c/cb",
      "./d/da/daa/daaa",
      "./e/ea/eaa/eaaa"
    ],
    "fileNamesList": [
      [
        "./node_modules/pkg0/index.d.ts"
      ]
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./node_modules/pkg0/index.d.ts": {
        "version": "769951468-export interface ImportInterface0 {}",
        "signature": "769951468-export interface ImportInterface0 {}"
      },
      "./filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
      },
      "./randomfileforimport.ts": {
        "version": "10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;",
        "signature": "-6057683066-export declare const x = 10;\r\n"
      },
      "./a/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
      },
      "./b/ba/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
      },
      "./b/randomfileforimport.ts": {
        "version": "10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;",
        "signature": "-6057683066-export declare const x = 10;\r\n"
      },
      "./c/ca/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
      },
      "./c/ca/caa/randomfileforimport.ts": {
        "version": "10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;",
        "signature": "-6057683066-export declare const x = 10;\r\n"
      },
      "./c/ca/caa/caaa/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
      },
      "./c/cb/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
      },
      "./d/da/daa/daaa/x/y/z/randomfileforimport.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-10726455937-export const x = 10;"
      },
      "./d/da/daa/daaa/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
      },
      "./d/da/daa/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
      },
      "./d/da/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
      },
      "./e/ea/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
      },
      "./e/ea/eaa/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
      },
      "./e/ea/eaa/eaaa/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
      },
      "./e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-10726455937-export const x = 10;"
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
    "exportedModulesMap": {
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
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      [
        "./a/filewithimports.ts",
        [
          {
            "file": "./a/filewithimports.ts",
            "start": 84,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      [
        "./b/ba/filewithimports.ts",
        [
          {
            "file": "./b/ba/filewithimports.ts",
            "start": 84,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      "./b/randomfileforimport.ts",
      [
        "./c/ca/caa/caaa/filewithimports.ts",
        [
          {
            "file": "./c/ca/caa/caaa/filewithimports.ts",
            "start": 84,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      "./c/ca/caa/randomfileforimport.ts",
      [
        "./c/ca/filewithimports.ts",
        [
          {
            "file": "./c/ca/filewithimports.ts",
            "start": 84,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      [
        "./c/cb/filewithimports.ts",
        [
          {
            "file": "./c/cb/filewithimports.ts",
            "start": 84,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      [
        "./d/da/daa/daaa/filewithimports.ts",
        [
          {
            "file": "./d/da/daa/daaa/filewithimports.ts",
            "start": 84,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      "./d/da/daa/daaa/x/y/z/randomfileforimport.ts",
      [
        "./d/da/daa/filewithimports.ts",
        [
          {
            "file": "./d/da/daa/filewithimports.ts",
            "start": 84,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      [
        "./d/da/filewithimports.ts",
        [
          {
            "file": "./d/da/filewithimports.ts",
            "start": 84,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      [
        "./e/ea/eaa/eaaa/filewithimports.ts",
        [
          {
            "file": "./e/ea/eaa/eaaa/filewithimports.ts",
            "start": 84,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      "./e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts",
      [
        "./e/ea/eaa/filewithimports.ts",
        [
          {
            "file": "./e/ea/eaa/filewithimports.ts",
            "start": 84,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      [
        "./e/ea/filewithimports.ts",
        [
          {
            "file": "./e/ea/filewithimports.ts",
            "start": 84,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      [
        "./filewithimports.ts",
        [
          {
            "file": "./filewithimports.ts",
            "start": 84,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      "./node_modules/pkg0/index.d.ts",
      "./randomfileforimport.ts"
    ],
    "affectedFilesPendingEmit": [
      [
        "./a/filewithimports.ts",
        "Full"
      ],
      [
        "./b/ba/filewithimports.ts",
        "Full"
      ],
      [
        "./b/randomfileforimport.ts",
        "Full"
      ],
      [
        "./c/ca/caa/caaa/filewithimports.ts",
        "Full"
      ],
      [
        "./c/ca/caa/randomfileforimport.ts",
        "Full"
      ],
      [
        "./c/ca/filewithimports.ts",
        "Full"
      ],
      [
        "./c/cb/filewithimports.ts",
        "Full"
      ],
      [
        "./d/da/daa/daaa/filewithimports.ts",
        "Full"
      ],
      [
        "./d/da/daa/daaa/x/y/z/randomfileforimport.ts",
        "Full"
      ],
      [
        "./d/da/daa/filewithimports.ts",
        "Full"
      ],
      [
        "./d/da/filewithimports.ts",
        "Full"
      ],
      [
        "./e/ea/eaa/eaaa/filewithimports.ts",
        "Full"
      ],
      [
        "./e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts",
        "Full"
      ],
      [
        "./e/ea/eaa/filewithimports.ts",
        "Full"
      ],
      [
        "./e/ea/filewithimports.ts",
        "Full"
      ],
      [
        "./filewithimports.ts",
        "Full"
      ],
      [
        "./node_modules/pkg0/index.d.ts",
        "Full"
      ],
      [
        "./randomfileforimport.ts",
        "Full"
      ]
    ],
    "emitSignatures": [
      "./filewithimports.ts",
      "./randomfileforimport.ts",
      "./a/filewithimports.ts",
      "./b/ba/filewithimports.ts",
      "./b/randomfileforimport.ts",
      "./c/ca/filewithimports.ts",
      "./c/ca/caa/randomfileforimport.ts",
      "./c/ca/caa/caaa/filewithimports.ts",
      "./c/cb/filewithimports.ts",
      "./d/da/daa/daaa/x/y/z/randomfileforimport.ts",
      "./d/da/daa/daaa/filewithimports.ts",
      "./d/da/daa/filewithimports.ts",
      "./d/da/filewithimports.ts",
      "./e/ea/filewithimports.ts",
      "./e/ea/eaa/filewithimports.ts",
      "./e/ea/eaa/eaaa/filewithimports.ts",
      "./e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts"
    ],
    "cacheResolutions": {
      "resolutions": [
        {
          "id": 1,
          "resolvedModule": {
            "resolvedFileName": "./node_modules/pkg0/index.d.ts",
            "isExternalLibraryImport": true
          }
        }
      ],
      "names": [
        "pkg0"
      ],
      "resolutionEntries": [
        [
          "pkg0",
          {
            "id": 1,
            "resolvedModule": {
              "resolvedFileName": "./node_modules/pkg0/index.d.ts",
              "isExternalLibraryImport": true
            }
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
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
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
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
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
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
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
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
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
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
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
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ]
      ]
    }
  },
  "version": "FakeTSVersion",
  "size": 6026
}



Change:: modify d/da/daa/daaa/x/y/z/randomFileForImport by adding import
Input::
//// [/src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts]
import type { ImportInterface0 } from "pkg0";
export const x = 10;



Output::
/lib/tsc -b /src/project --explainFiles
Reusing resolution of module 'pkg0' from '/src/project/fileWithImports.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
File '/src/project/node_modules/pkg1.ts' does not exist.
File '/src/project/node_modules/pkg1.tsx' does not exist.
File '/src/project/node_modules/pkg1.d.ts' does not exist.
Directory '/src/project/node_modules/@types' does not exist, skipping all lookups in it.
Directory '/src/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
Loading module 'pkg1' from 'node_modules' folder, target file type 'JavaScript'.
File '/src/project/node_modules/pkg1.js' does not exist.
File '/src/project/node_modules/pkg1.jsx' does not exist.
Directory '/src/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/randomFileForImport.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/src/project/a/fileWithImports.ts' found in cache from location '/src/project/a', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/a/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/a/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project'.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/b/ba/fileWithImports.ts' found in cache from location '/src/project/b/ba', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/b/ba/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/b/ba/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/b/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project'.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/b/randomFileForImport.ts' found in cache from location '/src/project/b', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/src/project/c/ca/fileWithImports.ts' found in cache from location '/src/project/c/ca', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/c/ca/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/c/ca/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/c/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project'.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/c/ca/caa/randomFileForImport.ts' found in cache from location '/src/project/c/ca/caa', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/src/project/c/ca/caa/caaa/fileWithImports.ts' found in cache from location '/src/project/c/ca/caa/caaa', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/c/ca/caa/caaa/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/c/ca/caa/caaa/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/c/ca/caa/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project/c/ca'.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/c/cb/fileWithImports.ts' found in cache from location '/src/project/c/cb', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/c/cb/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/c/cb/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project/c'.
======== Module name 'pkg1' was not resolved. ========
======== Resolving module 'pkg0' from '/src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg0' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/d/da/daa/daaa/x/y/z/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/d/da/daa/daaa/x/y/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/d/da/daa/daaa/x/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg0' was found in cache from location '/src/project/d/da/daa/daaa'.
======== Module name 'pkg0' was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'. ========
Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/daaa/fileWithImports.ts' found in cache from location '/src/project/d/da/daa/daaa', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/d/da/daa/daaa/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/d/da/daa/daaa/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/d/da/daa/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/d/da/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/d/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project'.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/fileWithImports.ts' found in cache from location '/src/project/d/da/daa', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/d/da/daa/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Resolution for module 'pkg1' was found in cache from location '/src/project/d/da/daa'.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/d/da/fileWithImports.ts' found in cache from location '/src/project/d/da', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/d/da/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Resolution for module 'pkg1' was found in cache from location '/src/project/d/da'.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/e/ea/fileWithImports.ts' found in cache from location '/src/project/e/ea', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/e/ea/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/e/ea/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/e/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project'.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/fileWithImports.ts' found in cache from location '/src/project/e/ea/eaa', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/e/ea/eaa/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/e/ea/eaa/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project/e/ea'.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/eaaa/fileWithImports.ts' found in cache from location '/src/project/e/ea/eaa/eaaa', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/e/ea/eaa/eaaa/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/e/ea/eaa/eaaa/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project/e/ea/eaa'.
======== Module name 'pkg1' was not resolved. ========
[96msrc/project/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96msrc/project/a/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96msrc/project/b/ba/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96msrc/project/c/ca/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96msrc/project/c/ca/caa/caaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96msrc/project/c/cb/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96msrc/project/d/da/daa/daaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96msrc/project/d/da/daa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96msrc/project/d/da/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96msrc/project/e/ea/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96msrc/project/e/ea/eaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96msrc/project/e/ea/eaa/eaaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

lib/lib.d.ts
  Default library for target 'es3'
src/project/node_modules/pkg0/index.d.ts
  Imported via "pkg0" from file 'src/project/fileWithImports.ts'
  Imported via "pkg0" from file 'src/project/randomFileForImport.ts'
  Imported via "pkg0" from file 'src/project/a/fileWithImports.ts'
  Imported via "pkg0" from file 'src/project/b/ba/fileWithImports.ts'
  Imported via "pkg0" from file 'src/project/b/randomFileForImport.ts'
  Imported via "pkg0" from file 'src/project/c/ca/fileWithImports.ts'
  Imported via "pkg0" from file 'src/project/c/ca/caa/randomFileForImport.ts'
  Imported via "pkg0" from file 'src/project/c/ca/caa/caaa/fileWithImports.ts'
  Imported via "pkg0" from file 'src/project/c/cb/fileWithImports.ts'
  Imported via "pkg0" from file 'src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts'
  Imported via "pkg0" from file 'src/project/d/da/daa/daaa/fileWithImports.ts'
  Imported via "pkg0" from file 'src/project/d/da/daa/fileWithImports.ts'
  Imported via "pkg0" from file 'src/project/d/da/fileWithImports.ts'
  Imported via "pkg0" from file 'src/project/e/ea/fileWithImports.ts'
  Imported via "pkg0" from file 'src/project/e/ea/eaa/fileWithImports.ts'
  Imported via "pkg0" from file 'src/project/e/ea/eaa/eaaa/fileWithImports.ts'
src/project/fileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/randomFileForImport.ts
  Part of 'files' list in tsconfig.json
src/project/a/fileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/b/ba/fileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/b/randomFileForImport.ts
  Part of 'files' list in tsconfig.json
src/project/c/ca/fileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/c/ca/caa/randomFileForImport.ts
  Part of 'files' list in tsconfig.json
src/project/c/ca/caa/caaa/fileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/c/cb/fileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts
  Part of 'files' list in tsconfig.json
src/project/d/da/daa/daaa/fileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/d/da/daa/fileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/d/da/fileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/e/ea/fileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/e/ea/eaa/fileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/e/ea/eaa/eaaa/fileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts
  Part of 'files' list in tsconfig.json

Found 12 errors.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped


//// [/src/project/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../lib/lib.d.ts","./node_modules/pkg0/index.d.ts","./filewithimports.ts","./randomfileforimport.ts","./a/filewithimports.ts","./b/ba/filewithimports.ts","./b/randomfileforimport.ts","./c/ca/filewithimports.ts","./c/ca/caa/randomfileforimport.ts","./c/ca/caa/caaa/filewithimports.ts","./c/cb/filewithimports.ts","./d/da/daa/daaa/x/y/z/randomfileforimport.ts","./d/da/daa/daaa/filewithimports.ts","./d/da/daa/filewithimports.ts","./d/da/filewithimports.ts","./e/ea/filewithimports.ts","./e/ea/eaa/filewithimports.ts","./e/ea/eaa/eaaa/filewithimports.ts","./e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts","./a","./b/ba","./c/ca/caa/caaa","./c/cb","./d/da/daa/daaa/x/y/z","./e/ea/eaa/eaaa"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},"769951468-export interface ImportInterface0 {}","9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",{"version":"10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;","signature":"-6057683066-export declare const x = 10;\r\n"},"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",{"version":"10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;","signature":"-6057683066-export declare const x = 10;\r\n"},"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",{"version":"10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;","signature":"-6057683066-export declare const x = 10;\r\n"},"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",{"version":"10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;","signature":"-6057683066-export declare const x = 10;\r\n"},"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","-10726455937-export const x = 10;"],"options":{"cacheResolutions":true,"composite":true},"fileIdsList":[[2]],"referencedMap":[[5,1],[6,1],[7,1],[10,1],[9,1],[8,1],[11,1],[13,1],[12,1],[14,1],[15,1],[18,1],[17,1],[16,1],[3,1],[4,1]],"exportedModulesMap":[[5,1],[6,1],[10,1],[8,1],[11,1],[13,1],[14,1],[15,1],[18,1],[17,1],[16,1],[3,1]],"semanticDiagnosticsPerFile":[1,[5,[{"file":"./a/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[6,[{"file":"./b/ba/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],7,[10,[{"file":"./c/ca/caa/caaa/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],9,[8,[{"file":"./c/ca/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[11,[{"file":"./c/cb/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[13,[{"file":"./d/da/daa/daaa/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],12,[14,[{"file":"./d/da/daa/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[15,[{"file":"./d/da/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[18,[{"file":"./e/ea/eaa/eaaa/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],19,[17,[{"file":"./e/ea/eaa/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[16,[{"file":"./e/ea/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[3,[{"file":"./filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],2,4],"affectedFilesPendingEmit":[[5,1],[6,1],[7,1],[10,1],[9,1],[8,1],[11,1],[13,1],[12,1],[14,1],[15,1],[18,1],[19,1],[17,1],[16,1],[3,1],[2,1],[4,1]],"emitSignatures":[3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19],"cacheResolutions":{"resolutions":[{"resolvedModule":{"resolvedFileName":2,"isExternalLibraryImport":true}}],"names":["pkg0"],"resolutionEntries":[[1,1]],"modules":[[20,[1]],[21,[1]],[22,[1]],[23,[1]],[24,[1]],[25,[1]]]}},"version":"FakeTSVersion"}

//// [/src/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
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
      "./d/da/daa/daaa/x/y/z/randomfileforimport.ts",
      "./d/da/daa/daaa/filewithimports.ts",
      "./d/da/daa/filewithimports.ts",
      "./d/da/filewithimports.ts",
      "./e/ea/filewithimports.ts",
      "./e/ea/eaa/filewithimports.ts",
      "./e/ea/eaa/eaaa/filewithimports.ts",
      "./e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts",
      "./a",
      "./b/ba",
      "./c/ca/caa/caaa",
      "./c/cb",
      "./d/da/daa/daaa/x/y/z",
      "./e/ea/eaa/eaaa"
    ],
    "fileNamesList": [
      [
        "./node_modules/pkg0/index.d.ts"
      ]
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./node_modules/pkg0/index.d.ts": {
        "version": "769951468-export interface ImportInterface0 {}",
        "signature": "769951468-export interface ImportInterface0 {}"
      },
      "./filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
      },
      "./randomfileforimport.ts": {
        "version": "10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;",
        "signature": "-6057683066-export declare const x = 10;\r\n"
      },
      "./a/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
      },
      "./b/ba/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
      },
      "./b/randomfileforimport.ts": {
        "version": "10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;",
        "signature": "-6057683066-export declare const x = 10;\r\n"
      },
      "./c/ca/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
      },
      "./c/ca/caa/randomfileforimport.ts": {
        "version": "10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;",
        "signature": "-6057683066-export declare const x = 10;\r\n"
      },
      "./c/ca/caa/caaa/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
      },
      "./c/cb/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
      },
      "./d/da/daa/daaa/x/y/z/randomfileforimport.ts": {
        "version": "10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;",
        "signature": "-6057683066-export declare const x = 10;\r\n"
      },
      "./d/da/daa/daaa/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
      },
      "./d/da/daa/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
      },
      "./d/da/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
      },
      "./e/ea/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
      },
      "./e/ea/eaa/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
      },
      "./e/ea/eaa/eaaa/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
      },
      "./e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-10726455937-export const x = 10;"
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
      "./d/da/daa/daaa/x/y/z/randomfileforimport.ts": [
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
    "exportedModulesMap": {
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
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      [
        "./a/filewithimports.ts",
        [
          {
            "file": "./a/filewithimports.ts",
            "start": 84,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      [
        "./b/ba/filewithimports.ts",
        [
          {
            "file": "./b/ba/filewithimports.ts",
            "start": 84,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      "./b/randomfileforimport.ts",
      [
        "./c/ca/caa/caaa/filewithimports.ts",
        [
          {
            "file": "./c/ca/caa/caaa/filewithimports.ts",
            "start": 84,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      "./c/ca/caa/randomfileforimport.ts",
      [
        "./c/ca/filewithimports.ts",
        [
          {
            "file": "./c/ca/filewithimports.ts",
            "start": 84,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      [
        "./c/cb/filewithimports.ts",
        [
          {
            "file": "./c/cb/filewithimports.ts",
            "start": 84,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      [
        "./d/da/daa/daaa/filewithimports.ts",
        [
          {
            "file": "./d/da/daa/daaa/filewithimports.ts",
            "start": 84,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      "./d/da/daa/daaa/x/y/z/randomfileforimport.ts",
      [
        "./d/da/daa/filewithimports.ts",
        [
          {
            "file": "./d/da/daa/filewithimports.ts",
            "start": 84,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      [
        "./d/da/filewithimports.ts",
        [
          {
            "file": "./d/da/filewithimports.ts",
            "start": 84,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      [
        "./e/ea/eaa/eaaa/filewithimports.ts",
        [
          {
            "file": "./e/ea/eaa/eaaa/filewithimports.ts",
            "start": 84,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      "./e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts",
      [
        "./e/ea/eaa/filewithimports.ts",
        [
          {
            "file": "./e/ea/eaa/filewithimports.ts",
            "start": 84,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      [
        "./e/ea/filewithimports.ts",
        [
          {
            "file": "./e/ea/filewithimports.ts",
            "start": 84,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      [
        "./filewithimports.ts",
        [
          {
            "file": "./filewithimports.ts",
            "start": 84,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      "./node_modules/pkg0/index.d.ts",
      "./randomfileforimport.ts"
    ],
    "affectedFilesPendingEmit": [
      [
        "./a/filewithimports.ts",
        "Full"
      ],
      [
        "./b/ba/filewithimports.ts",
        "Full"
      ],
      [
        "./b/randomfileforimport.ts",
        "Full"
      ],
      [
        "./c/ca/caa/caaa/filewithimports.ts",
        "Full"
      ],
      [
        "./c/ca/caa/randomfileforimport.ts",
        "Full"
      ],
      [
        "./c/ca/filewithimports.ts",
        "Full"
      ],
      [
        "./c/cb/filewithimports.ts",
        "Full"
      ],
      [
        "./d/da/daa/daaa/filewithimports.ts",
        "Full"
      ],
      [
        "./d/da/daa/daaa/x/y/z/randomfileforimport.ts",
        "Full"
      ],
      [
        "./d/da/daa/filewithimports.ts",
        "Full"
      ],
      [
        "./d/da/filewithimports.ts",
        "Full"
      ],
      [
        "./e/ea/eaa/eaaa/filewithimports.ts",
        "Full"
      ],
      [
        "./e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts",
        "Full"
      ],
      [
        "./e/ea/eaa/filewithimports.ts",
        "Full"
      ],
      [
        "./e/ea/filewithimports.ts",
        "Full"
      ],
      [
        "./filewithimports.ts",
        "Full"
      ],
      [
        "./node_modules/pkg0/index.d.ts",
        "Full"
      ],
      [
        "./randomfileforimport.ts",
        "Full"
      ]
    ],
    "emitSignatures": [
      "./filewithimports.ts",
      "./randomfileforimport.ts",
      "./a/filewithimports.ts",
      "./b/ba/filewithimports.ts",
      "./b/randomfileforimport.ts",
      "./c/ca/filewithimports.ts",
      "./c/ca/caa/randomfileforimport.ts",
      "./c/ca/caa/caaa/filewithimports.ts",
      "./c/cb/filewithimports.ts",
      "./d/da/daa/daaa/x/y/z/randomfileforimport.ts",
      "./d/da/daa/daaa/filewithimports.ts",
      "./d/da/daa/filewithimports.ts",
      "./d/da/filewithimports.ts",
      "./e/ea/filewithimports.ts",
      "./e/ea/eaa/filewithimports.ts",
      "./e/ea/eaa/eaaa/filewithimports.ts",
      "./e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts"
    ],
    "cacheResolutions": {
      "resolutions": [
        {
          "id": 1,
          "resolvedModule": {
            "resolvedFileName": "./node_modules/pkg0/index.d.ts",
            "isExternalLibraryImport": true
          }
        }
      ],
      "names": [
        "pkg0"
      ],
      "resolutionEntries": [
        [
          "pkg0",
          {
            "id": 1,
            "resolvedModule": {
              "resolvedFileName": "./node_modules/pkg0/index.d.ts",
              "isExternalLibraryImport": true
            }
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
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
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
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
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
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
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
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ],
        [
          "./d/da/daa/daaa/x/y/z",
          [
            [
              "pkg0",
              {
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
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
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ]
      ]
    }
  },
  "version": "FakeTSVersion",
  "size": 6158
}



Change:: modify e/ea/eaa/eaaa/x/y/z/randomFileForImport by adding import
Input::
//// [/src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts]
import type { ImportInterface0 } from "pkg0";
export const x = 10;



Output::
/lib/tsc -b /src/project --explainFiles
Reusing resolution of module 'pkg0' from '/src/project/fileWithImports.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
File '/src/project/node_modules/pkg1.ts' does not exist.
File '/src/project/node_modules/pkg1.tsx' does not exist.
File '/src/project/node_modules/pkg1.d.ts' does not exist.
Directory '/src/project/node_modules/@types' does not exist, skipping all lookups in it.
Directory '/src/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
Loading module 'pkg1' from 'node_modules' folder, target file type 'JavaScript'.
File '/src/project/node_modules/pkg1.js' does not exist.
File '/src/project/node_modules/pkg1.jsx' does not exist.
Directory '/src/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/randomFileForImport.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/src/project/a/fileWithImports.ts' found in cache from location '/src/project/a', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/a/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/a/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project'.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/b/ba/fileWithImports.ts' found in cache from location '/src/project/b/ba', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/b/ba/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/b/ba/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/b/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project'.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/b/randomFileForImport.ts' found in cache from location '/src/project/b', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/src/project/c/ca/fileWithImports.ts' found in cache from location '/src/project/c/ca', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/c/ca/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/c/ca/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/c/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project'.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/c/ca/caa/randomFileForImport.ts' found in cache from location '/src/project/c/ca/caa', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/src/project/c/ca/caa/caaa/fileWithImports.ts' found in cache from location '/src/project/c/ca/caa/caaa', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/c/ca/caa/caaa/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/c/ca/caa/caaa/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/c/ca/caa/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project/c/ca'.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/c/cb/fileWithImports.ts' found in cache from location '/src/project/c/cb', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/c/cb/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/c/cb/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project/c'.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts' found in cache from location '/src/project/d/da/daa/daaa/x/y/z', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/daaa/fileWithImports.ts' found in cache from location '/src/project/d/da/daa/daaa', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/d/da/daa/daaa/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/d/da/daa/daaa/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/d/da/daa/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/d/da/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/d/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project'.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/fileWithImports.ts' found in cache from location '/src/project/d/da/daa', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/d/da/daa/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Resolution for module 'pkg1' was found in cache from location '/src/project/d/da/daa'.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/d/da/fileWithImports.ts' found in cache from location '/src/project/d/da', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/d/da/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Resolution for module 'pkg1' was found in cache from location '/src/project/d/da'.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/e/ea/fileWithImports.ts' found in cache from location '/src/project/e/ea', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/e/ea/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/e/ea/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/e/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project'.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/fileWithImports.ts' found in cache from location '/src/project/e/ea/eaa', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/e/ea/eaa/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/e/ea/eaa/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project/e/ea'.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/eaaa/fileWithImports.ts' found in cache from location '/src/project/e/ea/eaa/eaaa', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/e/ea/eaa/eaaa/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/e/ea/eaa/eaaa/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project/e/ea/eaa'.
======== Module name 'pkg1' was not resolved. ========
======== Resolving module 'pkg0' from '/src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg0' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/e/ea/eaa/eaaa/x/y/z/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/e/ea/eaa/eaaa/x/y/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/e/ea/eaa/eaaa/x/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg0' was found in cache from location '/src/project/e/ea/eaa/eaaa'.
======== Module name 'pkg0' was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'. ========
[96msrc/project/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96msrc/project/a/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96msrc/project/b/ba/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96msrc/project/c/ca/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96msrc/project/c/ca/caa/caaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96msrc/project/c/cb/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96msrc/project/d/da/daa/daaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96msrc/project/d/da/daa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96msrc/project/d/da/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96msrc/project/e/ea/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96msrc/project/e/ea/eaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96msrc/project/e/ea/eaa/eaaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

lib/lib.d.ts
  Default library for target 'es3'
src/project/node_modules/pkg0/index.d.ts
  Imported via "pkg0" from file 'src/project/fileWithImports.ts'
  Imported via "pkg0" from file 'src/project/randomFileForImport.ts'
  Imported via "pkg0" from file 'src/project/a/fileWithImports.ts'
  Imported via "pkg0" from file 'src/project/b/ba/fileWithImports.ts'
  Imported via "pkg0" from file 'src/project/b/randomFileForImport.ts'
  Imported via "pkg0" from file 'src/project/c/ca/fileWithImports.ts'
  Imported via "pkg0" from file 'src/project/c/ca/caa/randomFileForImport.ts'
  Imported via "pkg0" from file 'src/project/c/ca/caa/caaa/fileWithImports.ts'
  Imported via "pkg0" from file 'src/project/c/cb/fileWithImports.ts'
  Imported via "pkg0" from file 'src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts'
  Imported via "pkg0" from file 'src/project/d/da/daa/daaa/fileWithImports.ts'
  Imported via "pkg0" from file 'src/project/d/da/daa/fileWithImports.ts'
  Imported via "pkg0" from file 'src/project/d/da/fileWithImports.ts'
  Imported via "pkg0" from file 'src/project/e/ea/fileWithImports.ts'
  Imported via "pkg0" from file 'src/project/e/ea/eaa/fileWithImports.ts'
  Imported via "pkg0" from file 'src/project/e/ea/eaa/eaaa/fileWithImports.ts'
  Imported via "pkg0" from file 'src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts'
src/project/fileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/randomFileForImport.ts
  Part of 'files' list in tsconfig.json
src/project/a/fileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/b/ba/fileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/b/randomFileForImport.ts
  Part of 'files' list in tsconfig.json
src/project/c/ca/fileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/c/ca/caa/randomFileForImport.ts
  Part of 'files' list in tsconfig.json
src/project/c/ca/caa/caaa/fileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/c/cb/fileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts
  Part of 'files' list in tsconfig.json
src/project/d/da/daa/daaa/fileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/d/da/daa/fileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/d/da/fileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/e/ea/fileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/e/ea/eaa/fileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/e/ea/eaa/eaaa/fileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts
  Part of 'files' list in tsconfig.json

Found 12 errors.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped


//// [/src/project/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../lib/lib.d.ts","./node_modules/pkg0/index.d.ts","./filewithimports.ts","./randomfileforimport.ts","./a/filewithimports.ts","./b/ba/filewithimports.ts","./b/randomfileforimport.ts","./c/ca/filewithimports.ts","./c/ca/caa/randomfileforimport.ts","./c/ca/caa/caaa/filewithimports.ts","./c/cb/filewithimports.ts","./d/da/daa/daaa/x/y/z/randomfileforimport.ts","./d/da/daa/daaa/filewithimports.ts","./d/da/daa/filewithimports.ts","./d/da/filewithimports.ts","./e/ea/filewithimports.ts","./e/ea/eaa/filewithimports.ts","./e/ea/eaa/eaaa/filewithimports.ts","./e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts","./a","./b/ba","./c/ca/caa/caaa","./c/cb","./d/da/daa/daaa/x/y/z","./e/ea/eaa/eaaa/x/y/z"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},"769951468-export interface ImportInterface0 {}","9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",{"version":"10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;","signature":"-6057683066-export declare const x = 10;\r\n"},"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",{"version":"10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;","signature":"-6057683066-export declare const x = 10;\r\n"},"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",{"version":"10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;","signature":"-6057683066-export declare const x = 10;\r\n"},"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",{"version":"10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;","signature":"-6057683066-export declare const x = 10;\r\n"},"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",{"version":"10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;","signature":"-6057683066-export declare const x = 10;\r\n"}],"options":{"cacheResolutions":true,"composite":true},"fileIdsList":[[2]],"referencedMap":[[5,1],[6,1],[7,1],[10,1],[9,1],[8,1],[11,1],[13,1],[12,1],[14,1],[15,1],[18,1],[19,1],[17,1],[16,1],[3,1],[4,1]],"exportedModulesMap":[[5,1],[6,1],[10,1],[8,1],[11,1],[13,1],[14,1],[15,1],[18,1],[17,1],[16,1],[3,1]],"semanticDiagnosticsPerFile":[1,[5,[{"file":"./a/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[6,[{"file":"./b/ba/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],7,[10,[{"file":"./c/ca/caa/caaa/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],9,[8,[{"file":"./c/ca/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[11,[{"file":"./c/cb/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[13,[{"file":"./d/da/daa/daaa/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],12,[14,[{"file":"./d/da/daa/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[15,[{"file":"./d/da/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[18,[{"file":"./e/ea/eaa/eaaa/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],19,[17,[{"file":"./e/ea/eaa/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[16,[{"file":"./e/ea/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[3,[{"file":"./filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],2,4],"affectedFilesPendingEmit":[[5,1],[6,1],[7,1],[10,1],[9,1],[8,1],[11,1],[13,1],[12,1],[14,1],[15,1],[18,1],[19,1],[17,1],[16,1],[3,1],[2,1],[4,1]],"emitSignatures":[3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19],"cacheResolutions":{"resolutions":[{"resolvedModule":{"resolvedFileName":2,"isExternalLibraryImport":true}}],"names":["pkg0"],"resolutionEntries":[[1,1]],"modules":[[20,[1]],[21,[1]],[22,[1]],[23,[1]],[24,[1]],[25,[1]]]}},"version":"FakeTSVersion"}

//// [/src/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
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
      "./d/da/daa/daaa/x/y/z/randomfileforimport.ts",
      "./d/da/daa/daaa/filewithimports.ts",
      "./d/da/daa/filewithimports.ts",
      "./d/da/filewithimports.ts",
      "./e/ea/filewithimports.ts",
      "./e/ea/eaa/filewithimports.ts",
      "./e/ea/eaa/eaaa/filewithimports.ts",
      "./e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts",
      "./a",
      "./b/ba",
      "./c/ca/caa/caaa",
      "./c/cb",
      "./d/da/daa/daaa/x/y/z",
      "./e/ea/eaa/eaaa/x/y/z"
    ],
    "fileNamesList": [
      [
        "./node_modules/pkg0/index.d.ts"
      ]
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./node_modules/pkg0/index.d.ts": {
        "version": "769951468-export interface ImportInterface0 {}",
        "signature": "769951468-export interface ImportInterface0 {}"
      },
      "./filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
      },
      "./randomfileforimport.ts": {
        "version": "10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;",
        "signature": "-6057683066-export declare const x = 10;\r\n"
      },
      "./a/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
      },
      "./b/ba/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
      },
      "./b/randomfileforimport.ts": {
        "version": "10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;",
        "signature": "-6057683066-export declare const x = 10;\r\n"
      },
      "./c/ca/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
      },
      "./c/ca/caa/randomfileforimport.ts": {
        "version": "10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;",
        "signature": "-6057683066-export declare const x = 10;\r\n"
      },
      "./c/ca/caa/caaa/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
      },
      "./c/cb/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
      },
      "./d/da/daa/daaa/x/y/z/randomfileforimport.ts": {
        "version": "10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;",
        "signature": "-6057683066-export declare const x = 10;\r\n"
      },
      "./d/da/daa/daaa/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
      },
      "./d/da/daa/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
      },
      "./d/da/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
      },
      "./e/ea/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
      },
      "./e/ea/eaa/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
      },
      "./e/ea/eaa/eaaa/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
      },
      "./e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts": {
        "version": "10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;",
        "signature": "-6057683066-export declare const x = 10;\r\n"
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
      "./d/da/daa/daaa/x/y/z/randomfileforimport.ts": [
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
      "./e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts": [
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
    "exportedModulesMap": {
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
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      [
        "./a/filewithimports.ts",
        [
          {
            "file": "./a/filewithimports.ts",
            "start": 84,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      [
        "./b/ba/filewithimports.ts",
        [
          {
            "file": "./b/ba/filewithimports.ts",
            "start": 84,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      "./b/randomfileforimport.ts",
      [
        "./c/ca/caa/caaa/filewithimports.ts",
        [
          {
            "file": "./c/ca/caa/caaa/filewithimports.ts",
            "start": 84,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      "./c/ca/caa/randomfileforimport.ts",
      [
        "./c/ca/filewithimports.ts",
        [
          {
            "file": "./c/ca/filewithimports.ts",
            "start": 84,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      [
        "./c/cb/filewithimports.ts",
        [
          {
            "file": "./c/cb/filewithimports.ts",
            "start": 84,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      [
        "./d/da/daa/daaa/filewithimports.ts",
        [
          {
            "file": "./d/da/daa/daaa/filewithimports.ts",
            "start": 84,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      "./d/da/daa/daaa/x/y/z/randomfileforimport.ts",
      [
        "./d/da/daa/filewithimports.ts",
        [
          {
            "file": "./d/da/daa/filewithimports.ts",
            "start": 84,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      [
        "./d/da/filewithimports.ts",
        [
          {
            "file": "./d/da/filewithimports.ts",
            "start": 84,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      [
        "./e/ea/eaa/eaaa/filewithimports.ts",
        [
          {
            "file": "./e/ea/eaa/eaaa/filewithimports.ts",
            "start": 84,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      "./e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts",
      [
        "./e/ea/eaa/filewithimports.ts",
        [
          {
            "file": "./e/ea/eaa/filewithimports.ts",
            "start": 84,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      [
        "./e/ea/filewithimports.ts",
        [
          {
            "file": "./e/ea/filewithimports.ts",
            "start": 84,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      [
        "./filewithimports.ts",
        [
          {
            "file": "./filewithimports.ts",
            "start": 84,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      "./node_modules/pkg0/index.d.ts",
      "./randomfileforimport.ts"
    ],
    "affectedFilesPendingEmit": [
      [
        "./a/filewithimports.ts",
        "Full"
      ],
      [
        "./b/ba/filewithimports.ts",
        "Full"
      ],
      [
        "./b/randomfileforimport.ts",
        "Full"
      ],
      [
        "./c/ca/caa/caaa/filewithimports.ts",
        "Full"
      ],
      [
        "./c/ca/caa/randomfileforimport.ts",
        "Full"
      ],
      [
        "./c/ca/filewithimports.ts",
        "Full"
      ],
      [
        "./c/cb/filewithimports.ts",
        "Full"
      ],
      [
        "./d/da/daa/daaa/filewithimports.ts",
        "Full"
      ],
      [
        "./d/da/daa/daaa/x/y/z/randomfileforimport.ts",
        "Full"
      ],
      [
        "./d/da/daa/filewithimports.ts",
        "Full"
      ],
      [
        "./d/da/filewithimports.ts",
        "Full"
      ],
      [
        "./e/ea/eaa/eaaa/filewithimports.ts",
        "Full"
      ],
      [
        "./e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts",
        "Full"
      ],
      [
        "./e/ea/eaa/filewithimports.ts",
        "Full"
      ],
      [
        "./e/ea/filewithimports.ts",
        "Full"
      ],
      [
        "./filewithimports.ts",
        "Full"
      ],
      [
        "./node_modules/pkg0/index.d.ts",
        "Full"
      ],
      [
        "./randomfileforimport.ts",
        "Full"
      ]
    ],
    "emitSignatures": [
      "./filewithimports.ts",
      "./randomfileforimport.ts",
      "./a/filewithimports.ts",
      "./b/ba/filewithimports.ts",
      "./b/randomfileforimport.ts",
      "./c/ca/filewithimports.ts",
      "./c/ca/caa/randomfileforimport.ts",
      "./c/ca/caa/caaa/filewithimports.ts",
      "./c/cb/filewithimports.ts",
      "./d/da/daa/daaa/x/y/z/randomfileforimport.ts",
      "./d/da/daa/daaa/filewithimports.ts",
      "./d/da/daa/filewithimports.ts",
      "./d/da/filewithimports.ts",
      "./e/ea/filewithimports.ts",
      "./e/ea/eaa/filewithimports.ts",
      "./e/ea/eaa/eaaa/filewithimports.ts",
      "./e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts"
    ],
    "cacheResolutions": {
      "resolutions": [
        {
          "id": 1,
          "resolvedModule": {
            "resolvedFileName": "./node_modules/pkg0/index.d.ts",
            "isExternalLibraryImport": true
          }
        }
      ],
      "names": [
        "pkg0"
      ],
      "resolutionEntries": [
        [
          "pkg0",
          {
            "id": 1,
            "resolvedModule": {
              "resolvedFileName": "./node_modules/pkg0/index.d.ts",
              "isExternalLibraryImport": true
            }
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
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
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
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
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
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
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
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ],
        [
          "./d/da/daa/daaa/x/y/z",
          [
            [
              "pkg0",
              {
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ],
        [
          "./e/ea/eaa/eaaa/x/y/z",
          [
            [
              "pkg0",
              {
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ]
      ]
    }
  },
  "version": "FakeTSVersion",
  "size": 6290
}



Change:: modify randomFileForImport by adding unresolved import
Input::
//// [/src/project/randomFileForImport.ts]
import type { ImportInterface1 } from "pkg1";
import type { ImportInterface0 } from "pkg0";
export const x = 10;



Output::
/lib/tsc -b /src/project --explainFiles
Reusing resolution of module 'pkg0' from '/src/project/fileWithImports.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
File '/src/project/node_modules/pkg1.ts' does not exist.
File '/src/project/node_modules/pkg1.tsx' does not exist.
File '/src/project/node_modules/pkg1.d.ts' does not exist.
Directory '/src/project/node_modules/@types' does not exist, skipping all lookups in it.
Directory '/src/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
Loading module 'pkg1' from 'node_modules' folder, target file type 'JavaScript'.
File '/src/project/node_modules/pkg1.js' does not exist.
File '/src/project/node_modules/pkg1.jsx' does not exist.
Directory '/src/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/randomFileForImport.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/randomFileForImport.ts'. ========
Resolution for module 'pkg1' was found in cache from location '/src/project'.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/a/fileWithImports.ts' found in cache from location '/src/project/a', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/a/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/a/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project'.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/b/ba/fileWithImports.ts' found in cache from location '/src/project/b/ba', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/b/ba/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/b/ba/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/b/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project'.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/b/randomFileForImport.ts' found in cache from location '/src/project/b', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/src/project/c/ca/fileWithImports.ts' found in cache from location '/src/project/c/ca', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/c/ca/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/c/ca/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/c/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project'.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/c/ca/caa/randomFileForImport.ts' found in cache from location '/src/project/c/ca/caa', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/src/project/c/ca/caa/caaa/fileWithImports.ts' found in cache from location '/src/project/c/ca/caa/caaa', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/c/ca/caa/caaa/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/c/ca/caa/caaa/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/c/ca/caa/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project/c/ca'.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/c/cb/fileWithImports.ts' found in cache from location '/src/project/c/cb', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/c/cb/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/c/cb/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project/c'.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts' found in cache from location '/src/project/d/da/daa/daaa/x/y/z', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/daaa/fileWithImports.ts' found in cache from location '/src/project/d/da/daa/daaa', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/d/da/daa/daaa/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/d/da/daa/daaa/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/d/da/daa/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/d/da/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/d/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project'.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/fileWithImports.ts' found in cache from location '/src/project/d/da/daa', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/d/da/daa/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Resolution for module 'pkg1' was found in cache from location '/src/project/d/da/daa'.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/d/da/fileWithImports.ts' found in cache from location '/src/project/d/da', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/d/da/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Resolution for module 'pkg1' was found in cache from location '/src/project/d/da'.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/e/ea/fileWithImports.ts' found in cache from location '/src/project/e/ea', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/e/ea/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/e/ea/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/e/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project'.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/fileWithImports.ts' found in cache from location '/src/project/e/ea/eaa', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/e/ea/eaa/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/e/ea/eaa/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project/e/ea'.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/eaaa/fileWithImports.ts' found in cache from location '/src/project/e/ea/eaa/eaaa', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/e/ea/eaa/eaaa/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/e/ea/eaa/eaaa/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project/e/ea/eaa'.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts' found in cache from location '/src/project/e/ea/eaa/eaaa/x/y/z', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
[96msrc/project/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96msrc/project/randomFileForImport.ts[0m:[93m1[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m1[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96msrc/project/a/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96msrc/project/b/ba/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96msrc/project/c/ca/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96msrc/project/c/ca/caa/caaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96msrc/project/c/cb/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96msrc/project/d/da/daa/daaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96msrc/project/d/da/daa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96msrc/project/d/da/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96msrc/project/e/ea/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96msrc/project/e/ea/eaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96msrc/project/e/ea/eaa/eaaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

lib/lib.d.ts
  Default library for target 'es3'
src/project/node_modules/pkg0/index.d.ts
  Imported via "pkg0" from file 'src/project/fileWithImports.ts'
  Imported via "pkg0" from file 'src/project/randomFileForImport.ts'
  Imported via "pkg0" from file 'src/project/a/fileWithImports.ts'
  Imported via "pkg0" from file 'src/project/b/ba/fileWithImports.ts'
  Imported via "pkg0" from file 'src/project/b/randomFileForImport.ts'
  Imported via "pkg0" from file 'src/project/c/ca/fileWithImports.ts'
  Imported via "pkg0" from file 'src/project/c/ca/caa/randomFileForImport.ts'
  Imported via "pkg0" from file 'src/project/c/ca/caa/caaa/fileWithImports.ts'
  Imported via "pkg0" from file 'src/project/c/cb/fileWithImports.ts'
  Imported via "pkg0" from file 'src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts'
  Imported via "pkg0" from file 'src/project/d/da/daa/daaa/fileWithImports.ts'
  Imported via "pkg0" from file 'src/project/d/da/daa/fileWithImports.ts'
  Imported via "pkg0" from file 'src/project/d/da/fileWithImports.ts'
  Imported via "pkg0" from file 'src/project/e/ea/fileWithImports.ts'
  Imported via "pkg0" from file 'src/project/e/ea/eaa/fileWithImports.ts'
  Imported via "pkg0" from file 'src/project/e/ea/eaa/eaaa/fileWithImports.ts'
  Imported via "pkg0" from file 'src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts'
src/project/fileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/randomFileForImport.ts
  Part of 'files' list in tsconfig.json
src/project/a/fileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/b/ba/fileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/b/randomFileForImport.ts
  Part of 'files' list in tsconfig.json
src/project/c/ca/fileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/c/ca/caa/randomFileForImport.ts
  Part of 'files' list in tsconfig.json
src/project/c/ca/caa/caaa/fileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/c/cb/fileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts
  Part of 'files' list in tsconfig.json
src/project/d/da/daa/daaa/fileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/d/da/daa/fileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/d/da/fileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/e/ea/fileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/e/ea/eaa/fileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/e/ea/eaa/eaaa/fileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts
  Part of 'files' list in tsconfig.json

Found 13 errors.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped


//// [/src/project/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../lib/lib.d.ts","./node_modules/pkg0/index.d.ts","./filewithimports.ts","./randomfileforimport.ts","./a/filewithimports.ts","./b/ba/filewithimports.ts","./b/randomfileforimport.ts","./c/ca/filewithimports.ts","./c/ca/caa/randomfileforimport.ts","./c/ca/caa/caaa/filewithimports.ts","./c/cb/filewithimports.ts","./d/da/daa/daaa/x/y/z/randomfileforimport.ts","./d/da/daa/daaa/filewithimports.ts","./d/da/daa/filewithimports.ts","./d/da/filewithimports.ts","./e/ea/filewithimports.ts","./e/ea/eaa/filewithimports.ts","./e/ea/eaa/eaaa/filewithimports.ts","./e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts","./a","./b/ba","./c/ca/caa/caaa","./c/cb","./d/da/daa/daaa/x/y/z","./e/ea/eaa/eaaa/x/y/z"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},"769951468-export interface ImportInterface0 {}","9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",{"version":"8470059553-import type { ImportInterface1 } from \"pkg1\";\nimport type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;","signature":"-6057683066-export declare const x = 10;\r\n"},"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",{"version":"10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;","signature":"-6057683066-export declare const x = 10;\r\n"},"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",{"version":"10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;","signature":"-6057683066-export declare const x = 10;\r\n"},"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",{"version":"10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;","signature":"-6057683066-export declare const x = 10;\r\n"},"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",{"version":"10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;","signature":"-6057683066-export declare const x = 10;\r\n"}],"options":{"cacheResolutions":true,"composite":true},"fileIdsList":[[2]],"referencedMap":[[5,1],[6,1],[7,1],[10,1],[9,1],[8,1],[11,1],[13,1],[12,1],[14,1],[15,1],[18,1],[19,1],[17,1],[16,1],[3,1],[4,1]],"exportedModulesMap":[[5,1],[6,1],[10,1],[8,1],[11,1],[13,1],[14,1],[15,1],[18,1],[17,1],[16,1],[3,1]],"semanticDiagnosticsPerFile":[1,[5,[{"file":"./a/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[6,[{"file":"./b/ba/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],7,[10,[{"file":"./c/ca/caa/caaa/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],9,[8,[{"file":"./c/ca/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[11,[{"file":"./c/cb/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[13,[{"file":"./d/da/daa/daaa/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],12,[14,[{"file":"./d/da/daa/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[15,[{"file":"./d/da/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[18,[{"file":"./e/ea/eaa/eaaa/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],19,[17,[{"file":"./e/ea/eaa/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[16,[{"file":"./e/ea/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[3,[{"file":"./filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],2,[4,[{"file":"./randomfileforimport.ts","start":38,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]]],"affectedFilesPendingEmit":[[5,1],[6,1],[7,1],[10,1],[9,1],[8,1],[11,1],[13,1],[12,1],[14,1],[15,1],[18,1],[19,1],[17,1],[16,1],[3,1],[2,1],[4,1]],"emitSignatures":[3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19],"cacheResolutions":{"resolutions":[{"resolvedModule":{"resolvedFileName":2,"isExternalLibraryImport":true}}],"names":["pkg0"],"resolutionEntries":[[1,1]],"modules":[[20,[1]],[21,[1]],[22,[1]],[23,[1]],[24,[1]],[25,[1]]]}},"version":"FakeTSVersion"}

//// [/src/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
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
      "./d/da/daa/daaa/x/y/z/randomfileforimport.ts",
      "./d/da/daa/daaa/filewithimports.ts",
      "./d/da/daa/filewithimports.ts",
      "./d/da/filewithimports.ts",
      "./e/ea/filewithimports.ts",
      "./e/ea/eaa/filewithimports.ts",
      "./e/ea/eaa/eaaa/filewithimports.ts",
      "./e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts",
      "./a",
      "./b/ba",
      "./c/ca/caa/caaa",
      "./c/cb",
      "./d/da/daa/daaa/x/y/z",
      "./e/ea/eaa/eaaa/x/y/z"
    ],
    "fileNamesList": [
      [
        "./node_modules/pkg0/index.d.ts"
      ]
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./node_modules/pkg0/index.d.ts": {
        "version": "769951468-export interface ImportInterface0 {}",
        "signature": "769951468-export interface ImportInterface0 {}"
      },
      "./filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
      },
      "./randomfileforimport.ts": {
        "version": "8470059553-import type { ImportInterface1 } from \"pkg1\";\nimport type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;",
        "signature": "-6057683066-export declare const x = 10;\r\n"
      },
      "./a/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
      },
      "./b/ba/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
      },
      "./b/randomfileforimport.ts": {
        "version": "10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;",
        "signature": "-6057683066-export declare const x = 10;\r\n"
      },
      "./c/ca/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
      },
      "./c/ca/caa/randomfileforimport.ts": {
        "version": "10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;",
        "signature": "-6057683066-export declare const x = 10;\r\n"
      },
      "./c/ca/caa/caaa/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
      },
      "./c/cb/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
      },
      "./d/da/daa/daaa/x/y/z/randomfileforimport.ts": {
        "version": "10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;",
        "signature": "-6057683066-export declare const x = 10;\r\n"
      },
      "./d/da/daa/daaa/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
      },
      "./d/da/daa/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
      },
      "./d/da/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
      },
      "./e/ea/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
      },
      "./e/ea/eaa/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
      },
      "./e/ea/eaa/eaaa/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
      },
      "./e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts": {
        "version": "10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;",
        "signature": "-6057683066-export declare const x = 10;\r\n"
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
      "./d/da/daa/daaa/x/y/z/randomfileforimport.ts": [
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
      "./e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts": [
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
    "exportedModulesMap": {
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
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      [
        "./a/filewithimports.ts",
        [
          {
            "file": "./a/filewithimports.ts",
            "start": 84,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      [
        "./b/ba/filewithimports.ts",
        [
          {
            "file": "./b/ba/filewithimports.ts",
            "start": 84,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      "./b/randomfileforimport.ts",
      [
        "./c/ca/caa/caaa/filewithimports.ts",
        [
          {
            "file": "./c/ca/caa/caaa/filewithimports.ts",
            "start": 84,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      "./c/ca/caa/randomfileforimport.ts",
      [
        "./c/ca/filewithimports.ts",
        [
          {
            "file": "./c/ca/filewithimports.ts",
            "start": 84,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      [
        "./c/cb/filewithimports.ts",
        [
          {
            "file": "./c/cb/filewithimports.ts",
            "start": 84,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      [
        "./d/da/daa/daaa/filewithimports.ts",
        [
          {
            "file": "./d/da/daa/daaa/filewithimports.ts",
            "start": 84,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      "./d/da/daa/daaa/x/y/z/randomfileforimport.ts",
      [
        "./d/da/daa/filewithimports.ts",
        [
          {
            "file": "./d/da/daa/filewithimports.ts",
            "start": 84,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      [
        "./d/da/filewithimports.ts",
        [
          {
            "file": "./d/da/filewithimports.ts",
            "start": 84,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      [
        "./e/ea/eaa/eaaa/filewithimports.ts",
        [
          {
            "file": "./e/ea/eaa/eaaa/filewithimports.ts",
            "start": 84,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      "./e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts",
      [
        "./e/ea/eaa/filewithimports.ts",
        [
          {
            "file": "./e/ea/eaa/filewithimports.ts",
            "start": 84,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      [
        "./e/ea/filewithimports.ts",
        [
          {
            "file": "./e/ea/filewithimports.ts",
            "start": 84,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      [
        "./filewithimports.ts",
        [
          {
            "file": "./filewithimports.ts",
            "start": 84,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      "./node_modules/pkg0/index.d.ts",
      [
        "./randomfileforimport.ts",
        [
          {
            "file": "./randomfileforimport.ts",
            "start": 38,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ]
    ],
    "affectedFilesPendingEmit": [
      [
        "./a/filewithimports.ts",
        "Full"
      ],
      [
        "./b/ba/filewithimports.ts",
        "Full"
      ],
      [
        "./b/randomfileforimport.ts",
        "Full"
      ],
      [
        "./c/ca/caa/caaa/filewithimports.ts",
        "Full"
      ],
      [
        "./c/ca/caa/randomfileforimport.ts",
        "Full"
      ],
      [
        "./c/ca/filewithimports.ts",
        "Full"
      ],
      [
        "./c/cb/filewithimports.ts",
        "Full"
      ],
      [
        "./d/da/daa/daaa/filewithimports.ts",
        "Full"
      ],
      [
        "./d/da/daa/daaa/x/y/z/randomfileforimport.ts",
        "Full"
      ],
      [
        "./d/da/daa/filewithimports.ts",
        "Full"
      ],
      [
        "./d/da/filewithimports.ts",
        "Full"
      ],
      [
        "./e/ea/eaa/eaaa/filewithimports.ts",
        "Full"
      ],
      [
        "./e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts",
        "Full"
      ],
      [
        "./e/ea/eaa/filewithimports.ts",
        "Full"
      ],
      [
        "./e/ea/filewithimports.ts",
        "Full"
      ],
      [
        "./filewithimports.ts",
        "Full"
      ],
      [
        "./node_modules/pkg0/index.d.ts",
        "Full"
      ],
      [
        "./randomfileforimport.ts",
        "Full"
      ]
    ],
    "emitSignatures": [
      "./filewithimports.ts",
      "./randomfileforimport.ts",
      "./a/filewithimports.ts",
      "./b/ba/filewithimports.ts",
      "./b/randomfileforimport.ts",
      "./c/ca/filewithimports.ts",
      "./c/ca/caa/randomfileforimport.ts",
      "./c/ca/caa/caaa/filewithimports.ts",
      "./c/cb/filewithimports.ts",
      "./d/da/daa/daaa/x/y/z/randomfileforimport.ts",
      "./d/da/daa/daaa/filewithimports.ts",
      "./d/da/daa/filewithimports.ts",
      "./d/da/filewithimports.ts",
      "./e/ea/filewithimports.ts",
      "./e/ea/eaa/filewithimports.ts",
      "./e/ea/eaa/eaaa/filewithimports.ts",
      "./e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts"
    ],
    "cacheResolutions": {
      "resolutions": [
        {
          "id": 1,
          "resolvedModule": {
            "resolvedFileName": "./node_modules/pkg0/index.d.ts",
            "isExternalLibraryImport": true
          }
        }
      ],
      "names": [
        "pkg0"
      ],
      "resolutionEntries": [
        [
          "pkg0",
          {
            "id": 1,
            "resolvedModule": {
              "resolvedFileName": "./node_modules/pkg0/index.d.ts",
              "isExternalLibraryImport": true
            }
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
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
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
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
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
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
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
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ],
        [
          "./d/da/daa/daaa/x/y/z",
          [
            [
              "pkg0",
              {
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ],
        [
          "./e/ea/eaa/eaaa/x/y/z",
          [
            [
              "pkg0",
              {
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ]
      ]
    }
  },
  "version": "FakeTSVersion",
  "size": 6507
}



Change:: modify b/randomFileForImport by adding unresolved import
Input::
//// [/src/project/b/randomFileForImport.ts]
import type { ImportInterface1 } from "pkg1";
import type { ImportInterface0 } from "pkg0";
export const x = 10;



Output::
/lib/tsc -b /src/project --explainFiles
Reusing resolution of module 'pkg0' from '/src/project/fileWithImports.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
File '/src/project/node_modules/pkg1.ts' does not exist.
File '/src/project/node_modules/pkg1.tsx' does not exist.
File '/src/project/node_modules/pkg1.d.ts' does not exist.
Directory '/src/project/node_modules/@types' does not exist, skipping all lookups in it.
Directory '/src/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
Loading module 'pkg1' from 'node_modules' folder, target file type 'JavaScript'.
File '/src/project/node_modules/pkg1.js' does not exist.
File '/src/project/node_modules/pkg1.jsx' does not exist.
Directory '/src/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/randomFileForImport.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/randomFileForImport.ts'. ========
Resolution for module 'pkg1' was found in cache from location '/src/project'.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/a/fileWithImports.ts' found in cache from location '/src/project/a', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/a/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/a/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project'.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/b/ba/fileWithImports.ts' found in cache from location '/src/project/b/ba', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/b/ba/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/b/ba/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/b/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project'.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/b/randomFileForImport.ts' found in cache from location '/src/project/b', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/b/randomFileForImport.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Resolution for module 'pkg1' was found in cache from location '/src/project/b'.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/c/ca/fileWithImports.ts' found in cache from location '/src/project/c/ca', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/c/ca/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/c/ca/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/c/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project'.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/c/ca/caa/randomFileForImport.ts' found in cache from location '/src/project/c/ca/caa', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/src/project/c/ca/caa/caaa/fileWithImports.ts' found in cache from location '/src/project/c/ca/caa/caaa', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/c/ca/caa/caaa/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/c/ca/caa/caaa/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/c/ca/caa/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project/c/ca'.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/c/cb/fileWithImports.ts' found in cache from location '/src/project/c/cb', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/c/cb/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/c/cb/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project/c'.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts' found in cache from location '/src/project/d/da/daa/daaa/x/y/z', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/daaa/fileWithImports.ts' found in cache from location '/src/project/d/da/daa/daaa', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/d/da/daa/daaa/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/d/da/daa/daaa/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/d/da/daa/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/d/da/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/d/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project'.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/fileWithImports.ts' found in cache from location '/src/project/d/da/daa', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/d/da/daa/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Resolution for module 'pkg1' was found in cache from location '/src/project/d/da/daa'.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/d/da/fileWithImports.ts' found in cache from location '/src/project/d/da', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/d/da/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Resolution for module 'pkg1' was found in cache from location '/src/project/d/da'.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/e/ea/fileWithImports.ts' found in cache from location '/src/project/e/ea', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/e/ea/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/e/ea/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/e/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project'.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/fileWithImports.ts' found in cache from location '/src/project/e/ea/eaa', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/e/ea/eaa/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/e/ea/eaa/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project/e/ea'.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/eaaa/fileWithImports.ts' found in cache from location '/src/project/e/ea/eaa/eaaa', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/e/ea/eaa/eaaa/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/e/ea/eaa/eaaa/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project/e/ea/eaa'.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts' found in cache from location '/src/project/e/ea/eaa/eaaa/x/y/z', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
[96msrc/project/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96msrc/project/randomFileForImport.ts[0m:[93m1[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m1[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96msrc/project/a/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96msrc/project/b/ba/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96msrc/project/b/randomFileForImport.ts[0m:[93m1[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m1[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96msrc/project/c/ca/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96msrc/project/c/ca/caa/caaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96msrc/project/c/cb/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96msrc/project/d/da/daa/daaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96msrc/project/d/da/daa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96msrc/project/d/da/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96msrc/project/e/ea/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96msrc/project/e/ea/eaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96msrc/project/e/ea/eaa/eaaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

lib/lib.d.ts
  Default library for target 'es3'
src/project/node_modules/pkg0/index.d.ts
  Imported via "pkg0" from file 'src/project/fileWithImports.ts'
  Imported via "pkg0" from file 'src/project/randomFileForImport.ts'
  Imported via "pkg0" from file 'src/project/a/fileWithImports.ts'
  Imported via "pkg0" from file 'src/project/b/ba/fileWithImports.ts'
  Imported via "pkg0" from file 'src/project/b/randomFileForImport.ts'
  Imported via "pkg0" from file 'src/project/c/ca/fileWithImports.ts'
  Imported via "pkg0" from file 'src/project/c/ca/caa/randomFileForImport.ts'
  Imported via "pkg0" from file 'src/project/c/ca/caa/caaa/fileWithImports.ts'
  Imported via "pkg0" from file 'src/project/c/cb/fileWithImports.ts'
  Imported via "pkg0" from file 'src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts'
  Imported via "pkg0" from file 'src/project/d/da/daa/daaa/fileWithImports.ts'
  Imported via "pkg0" from file 'src/project/d/da/daa/fileWithImports.ts'
  Imported via "pkg0" from file 'src/project/d/da/fileWithImports.ts'
  Imported via "pkg0" from file 'src/project/e/ea/fileWithImports.ts'
  Imported via "pkg0" from file 'src/project/e/ea/eaa/fileWithImports.ts'
  Imported via "pkg0" from file 'src/project/e/ea/eaa/eaaa/fileWithImports.ts'
  Imported via "pkg0" from file 'src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts'
src/project/fileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/randomFileForImport.ts
  Part of 'files' list in tsconfig.json
src/project/a/fileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/b/ba/fileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/b/randomFileForImport.ts
  Part of 'files' list in tsconfig.json
src/project/c/ca/fileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/c/ca/caa/randomFileForImport.ts
  Part of 'files' list in tsconfig.json
src/project/c/ca/caa/caaa/fileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/c/cb/fileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts
  Part of 'files' list in tsconfig.json
src/project/d/da/daa/daaa/fileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/d/da/daa/fileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/d/da/fileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/e/ea/fileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/e/ea/eaa/fileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/e/ea/eaa/eaaa/fileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts
  Part of 'files' list in tsconfig.json

Found 14 errors.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped


//// [/src/project/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../lib/lib.d.ts","./node_modules/pkg0/index.d.ts","./filewithimports.ts","./randomfileforimport.ts","./a/filewithimports.ts","./b/ba/filewithimports.ts","./b/randomfileforimport.ts","./c/ca/filewithimports.ts","./c/ca/caa/randomfileforimport.ts","./c/ca/caa/caaa/filewithimports.ts","./c/cb/filewithimports.ts","./d/da/daa/daaa/x/y/z/randomfileforimport.ts","./d/da/daa/daaa/filewithimports.ts","./d/da/daa/filewithimports.ts","./d/da/filewithimports.ts","./e/ea/filewithimports.ts","./e/ea/eaa/filewithimports.ts","./e/ea/eaa/eaaa/filewithimports.ts","./e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts","./a","./b/ba","./c/ca/caa/caaa","./c/cb","./d/da/daa/daaa/x/y/z","./e/ea/eaa/eaaa/x/y/z"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},"769951468-export interface ImportInterface0 {}","9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",{"version":"8470059553-import type { ImportInterface1 } from \"pkg1\";\nimport type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;","signature":"-6057683066-export declare const x = 10;\r\n"},"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",{"version":"8470059553-import type { ImportInterface1 } from \"pkg1\";\nimport type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;","signature":"-6057683066-export declare const x = 10;\r\n"},"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",{"version":"10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;","signature":"-6057683066-export declare const x = 10;\r\n"},"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",{"version":"10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;","signature":"-6057683066-export declare const x = 10;\r\n"},"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",{"version":"10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;","signature":"-6057683066-export declare const x = 10;\r\n"}],"options":{"cacheResolutions":true,"composite":true},"fileIdsList":[[2]],"referencedMap":[[5,1],[6,1],[7,1],[10,1],[9,1],[8,1],[11,1],[13,1],[12,1],[14,1],[15,1],[18,1],[19,1],[17,1],[16,1],[3,1],[4,1]],"exportedModulesMap":[[5,1],[6,1],[10,1],[8,1],[11,1],[13,1],[14,1],[15,1],[18,1],[17,1],[16,1],[3,1]],"semanticDiagnosticsPerFile":[1,[5,[{"file":"./a/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[6,[{"file":"./b/ba/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[7,[{"file":"./b/randomfileforimport.ts","start":38,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[10,[{"file":"./c/ca/caa/caaa/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],9,[8,[{"file":"./c/ca/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[11,[{"file":"./c/cb/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[13,[{"file":"./d/da/daa/daaa/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],12,[14,[{"file":"./d/da/daa/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[15,[{"file":"./d/da/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[18,[{"file":"./e/ea/eaa/eaaa/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],19,[17,[{"file":"./e/ea/eaa/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[16,[{"file":"./e/ea/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[3,[{"file":"./filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],2,[4,[{"file":"./randomfileforimport.ts","start":38,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]]],"affectedFilesPendingEmit":[[5,1],[6,1],[7,1],[10,1],[9,1],[8,1],[11,1],[13,1],[12,1],[14,1],[15,1],[18,1],[19,1],[17,1],[16,1],[3,1],[2,1],[4,1]],"emitSignatures":[3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19],"cacheResolutions":{"resolutions":[{"resolvedModule":{"resolvedFileName":2,"isExternalLibraryImport":true}}],"names":["pkg0"],"resolutionEntries":[[1,1]],"modules":[[20,[1]],[21,[1]],[22,[1]],[23,[1]],[24,[1]],[25,[1]]]}},"version":"FakeTSVersion"}

//// [/src/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
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
      "./d/da/daa/daaa/x/y/z/randomfileforimport.ts",
      "./d/da/daa/daaa/filewithimports.ts",
      "./d/da/daa/filewithimports.ts",
      "./d/da/filewithimports.ts",
      "./e/ea/filewithimports.ts",
      "./e/ea/eaa/filewithimports.ts",
      "./e/ea/eaa/eaaa/filewithimports.ts",
      "./e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts",
      "./a",
      "./b/ba",
      "./c/ca/caa/caaa",
      "./c/cb",
      "./d/da/daa/daaa/x/y/z",
      "./e/ea/eaa/eaaa/x/y/z"
    ],
    "fileNamesList": [
      [
        "./node_modules/pkg0/index.d.ts"
      ]
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./node_modules/pkg0/index.d.ts": {
        "version": "769951468-export interface ImportInterface0 {}",
        "signature": "769951468-export interface ImportInterface0 {}"
      },
      "./filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
      },
      "./randomfileforimport.ts": {
        "version": "8470059553-import type { ImportInterface1 } from \"pkg1\";\nimport type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;",
        "signature": "-6057683066-export declare const x = 10;\r\n"
      },
      "./a/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
      },
      "./b/ba/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
      },
      "./b/randomfileforimport.ts": {
        "version": "8470059553-import type { ImportInterface1 } from \"pkg1\";\nimport type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;",
        "signature": "-6057683066-export declare const x = 10;\r\n"
      },
      "./c/ca/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
      },
      "./c/ca/caa/randomfileforimport.ts": {
        "version": "10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;",
        "signature": "-6057683066-export declare const x = 10;\r\n"
      },
      "./c/ca/caa/caaa/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
      },
      "./c/cb/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
      },
      "./d/da/daa/daaa/x/y/z/randomfileforimport.ts": {
        "version": "10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;",
        "signature": "-6057683066-export declare const x = 10;\r\n"
      },
      "./d/da/daa/daaa/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
      },
      "./d/da/daa/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
      },
      "./d/da/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
      },
      "./e/ea/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
      },
      "./e/ea/eaa/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
      },
      "./e/ea/eaa/eaaa/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
      },
      "./e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts": {
        "version": "10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;",
        "signature": "-6057683066-export declare const x = 10;\r\n"
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
      "./d/da/daa/daaa/x/y/z/randomfileforimport.ts": [
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
      "./e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts": [
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
    "exportedModulesMap": {
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
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      [
        "./a/filewithimports.ts",
        [
          {
            "file": "./a/filewithimports.ts",
            "start": 84,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      [
        "./b/ba/filewithimports.ts",
        [
          {
            "file": "./b/ba/filewithimports.ts",
            "start": 84,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      [
        "./b/randomfileforimport.ts",
        [
          {
            "file": "./b/randomfileforimport.ts",
            "start": 38,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      [
        "./c/ca/caa/caaa/filewithimports.ts",
        [
          {
            "file": "./c/ca/caa/caaa/filewithimports.ts",
            "start": 84,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      "./c/ca/caa/randomfileforimport.ts",
      [
        "./c/ca/filewithimports.ts",
        [
          {
            "file": "./c/ca/filewithimports.ts",
            "start": 84,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      [
        "./c/cb/filewithimports.ts",
        [
          {
            "file": "./c/cb/filewithimports.ts",
            "start": 84,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      [
        "./d/da/daa/daaa/filewithimports.ts",
        [
          {
            "file": "./d/da/daa/daaa/filewithimports.ts",
            "start": 84,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      "./d/da/daa/daaa/x/y/z/randomfileforimport.ts",
      [
        "./d/da/daa/filewithimports.ts",
        [
          {
            "file": "./d/da/daa/filewithimports.ts",
            "start": 84,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      [
        "./d/da/filewithimports.ts",
        [
          {
            "file": "./d/da/filewithimports.ts",
            "start": 84,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      [
        "./e/ea/eaa/eaaa/filewithimports.ts",
        [
          {
            "file": "./e/ea/eaa/eaaa/filewithimports.ts",
            "start": 84,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      "./e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts",
      [
        "./e/ea/eaa/filewithimports.ts",
        [
          {
            "file": "./e/ea/eaa/filewithimports.ts",
            "start": 84,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      [
        "./e/ea/filewithimports.ts",
        [
          {
            "file": "./e/ea/filewithimports.ts",
            "start": 84,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      [
        "./filewithimports.ts",
        [
          {
            "file": "./filewithimports.ts",
            "start": 84,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      "./node_modules/pkg0/index.d.ts",
      [
        "./randomfileforimport.ts",
        [
          {
            "file": "./randomfileforimport.ts",
            "start": 38,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ]
    ],
    "affectedFilesPendingEmit": [
      [
        "./a/filewithimports.ts",
        "Full"
      ],
      [
        "./b/ba/filewithimports.ts",
        "Full"
      ],
      [
        "./b/randomfileforimport.ts",
        "Full"
      ],
      [
        "./c/ca/caa/caaa/filewithimports.ts",
        "Full"
      ],
      [
        "./c/ca/caa/randomfileforimport.ts",
        "Full"
      ],
      [
        "./c/ca/filewithimports.ts",
        "Full"
      ],
      [
        "./c/cb/filewithimports.ts",
        "Full"
      ],
      [
        "./d/da/daa/daaa/filewithimports.ts",
        "Full"
      ],
      [
        "./d/da/daa/daaa/x/y/z/randomfileforimport.ts",
        "Full"
      ],
      [
        "./d/da/daa/filewithimports.ts",
        "Full"
      ],
      [
        "./d/da/filewithimports.ts",
        "Full"
      ],
      [
        "./e/ea/eaa/eaaa/filewithimports.ts",
        "Full"
      ],
      [
        "./e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts",
        "Full"
      ],
      [
        "./e/ea/eaa/filewithimports.ts",
        "Full"
      ],
      [
        "./e/ea/filewithimports.ts",
        "Full"
      ],
      [
        "./filewithimports.ts",
        "Full"
      ],
      [
        "./node_modules/pkg0/index.d.ts",
        "Full"
      ],
      [
        "./randomfileforimport.ts",
        "Full"
      ]
    ],
    "emitSignatures": [
      "./filewithimports.ts",
      "./randomfileforimport.ts",
      "./a/filewithimports.ts",
      "./b/ba/filewithimports.ts",
      "./b/randomfileforimport.ts",
      "./c/ca/filewithimports.ts",
      "./c/ca/caa/randomfileforimport.ts",
      "./c/ca/caa/caaa/filewithimports.ts",
      "./c/cb/filewithimports.ts",
      "./d/da/daa/daaa/x/y/z/randomfileforimport.ts",
      "./d/da/daa/daaa/filewithimports.ts",
      "./d/da/daa/filewithimports.ts",
      "./d/da/filewithimports.ts",
      "./e/ea/filewithimports.ts",
      "./e/ea/eaa/filewithimports.ts",
      "./e/ea/eaa/eaaa/filewithimports.ts",
      "./e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts"
    ],
    "cacheResolutions": {
      "resolutions": [
        {
          "id": 1,
          "resolvedModule": {
            "resolvedFileName": "./node_modules/pkg0/index.d.ts",
            "isExternalLibraryImport": true
          }
        }
      ],
      "names": [
        "pkg0"
      ],
      "resolutionEntries": [
        [
          "pkg0",
          {
            "id": 1,
            "resolvedModule": {
              "resolvedFileName": "./node_modules/pkg0/index.d.ts",
              "isExternalLibraryImport": true
            }
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
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
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
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
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
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
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
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ],
        [
          "./d/da/daa/daaa/x/y/z",
          [
            [
              "pkg0",
              {
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ],
        [
          "./e/ea/eaa/eaaa/x/y/z",
          [
            [
              "pkg0",
              {
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ]
      ]
    }
  },
  "version": "FakeTSVersion",
  "size": 6726
}



Change:: modify c/ca/caa/randomFileForImport by adding unresolved import
Input::
//// [/src/project/c/ca/caa/randomFileForImport.ts]
import type { ImportInterface1 } from "pkg1";
import type { ImportInterface0 } from "pkg0";
export const x = 10;



Output::
/lib/tsc -b /src/project --explainFiles
Reusing resolution of module 'pkg0' from '/src/project/fileWithImports.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
File '/src/project/node_modules/pkg1.ts' does not exist.
File '/src/project/node_modules/pkg1.tsx' does not exist.
File '/src/project/node_modules/pkg1.d.ts' does not exist.
Directory '/src/project/node_modules/@types' does not exist, skipping all lookups in it.
Directory '/src/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
Loading module 'pkg1' from 'node_modules' folder, target file type 'JavaScript'.
File '/src/project/node_modules/pkg1.js' does not exist.
File '/src/project/node_modules/pkg1.jsx' does not exist.
Directory '/src/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/randomFileForImport.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/randomFileForImport.ts'. ========
Resolution for module 'pkg1' was found in cache from location '/src/project'.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/a/fileWithImports.ts' found in cache from location '/src/project/a', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/a/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/a/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project'.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/b/ba/fileWithImports.ts' found in cache from location '/src/project/b/ba', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/b/ba/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/b/ba/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/b/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project'.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/b/randomFileForImport.ts' found in cache from location '/src/project/b', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/b/randomFileForImport.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Resolution for module 'pkg1' was found in cache from location '/src/project/b'.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/c/ca/fileWithImports.ts' found in cache from location '/src/project/c/ca', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/c/ca/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/c/ca/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/c/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project'.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/c/ca/caa/randomFileForImport.ts' found in cache from location '/src/project/c/ca/caa', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/c/ca/caa/randomFileForImport.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/c/ca/caa/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project/c/ca'.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/c/ca/caa/caaa/fileWithImports.ts' found in cache from location '/src/project/c/ca/caa/caaa', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/c/ca/caa/caaa/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/c/ca/caa/caaa/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project/c/ca/caa'.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/c/cb/fileWithImports.ts' found in cache from location '/src/project/c/cb', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/c/cb/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/c/cb/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project/c'.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts' found in cache from location '/src/project/d/da/daa/daaa/x/y/z', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/daaa/fileWithImports.ts' found in cache from location '/src/project/d/da/daa/daaa', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/d/da/daa/daaa/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/d/da/daa/daaa/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/d/da/daa/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/d/da/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/d/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project'.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/fileWithImports.ts' found in cache from location '/src/project/d/da/daa', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/d/da/daa/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Resolution for module 'pkg1' was found in cache from location '/src/project/d/da/daa'.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/d/da/fileWithImports.ts' found in cache from location '/src/project/d/da', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/d/da/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Resolution for module 'pkg1' was found in cache from location '/src/project/d/da'.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/e/ea/fileWithImports.ts' found in cache from location '/src/project/e/ea', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/e/ea/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/e/ea/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/e/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project'.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/fileWithImports.ts' found in cache from location '/src/project/e/ea/eaa', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/e/ea/eaa/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/e/ea/eaa/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project/e/ea'.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/eaaa/fileWithImports.ts' found in cache from location '/src/project/e/ea/eaa/eaaa', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/e/ea/eaa/eaaa/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/e/ea/eaa/eaaa/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project/e/ea/eaa'.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts' found in cache from location '/src/project/e/ea/eaa/eaaa/x/y/z', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
[96msrc/project/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96msrc/project/randomFileForImport.ts[0m:[93m1[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m1[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96msrc/project/a/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96msrc/project/b/ba/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96msrc/project/b/randomFileForImport.ts[0m:[93m1[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m1[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96msrc/project/c/ca/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96msrc/project/c/ca/caa/randomFileForImport.ts[0m:[93m1[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m1[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96msrc/project/c/ca/caa/caaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96msrc/project/c/cb/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96msrc/project/d/da/daa/daaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96msrc/project/d/da/daa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96msrc/project/d/da/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96msrc/project/e/ea/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96msrc/project/e/ea/eaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96msrc/project/e/ea/eaa/eaaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

lib/lib.d.ts
  Default library for target 'es3'
src/project/node_modules/pkg0/index.d.ts
  Imported via "pkg0" from file 'src/project/fileWithImports.ts'
  Imported via "pkg0" from file 'src/project/randomFileForImport.ts'
  Imported via "pkg0" from file 'src/project/a/fileWithImports.ts'
  Imported via "pkg0" from file 'src/project/b/ba/fileWithImports.ts'
  Imported via "pkg0" from file 'src/project/b/randomFileForImport.ts'
  Imported via "pkg0" from file 'src/project/c/ca/fileWithImports.ts'
  Imported via "pkg0" from file 'src/project/c/ca/caa/randomFileForImport.ts'
  Imported via "pkg0" from file 'src/project/c/ca/caa/caaa/fileWithImports.ts'
  Imported via "pkg0" from file 'src/project/c/cb/fileWithImports.ts'
  Imported via "pkg0" from file 'src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts'
  Imported via "pkg0" from file 'src/project/d/da/daa/daaa/fileWithImports.ts'
  Imported via "pkg0" from file 'src/project/d/da/daa/fileWithImports.ts'
  Imported via "pkg0" from file 'src/project/d/da/fileWithImports.ts'
  Imported via "pkg0" from file 'src/project/e/ea/fileWithImports.ts'
  Imported via "pkg0" from file 'src/project/e/ea/eaa/fileWithImports.ts'
  Imported via "pkg0" from file 'src/project/e/ea/eaa/eaaa/fileWithImports.ts'
  Imported via "pkg0" from file 'src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts'
src/project/fileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/randomFileForImport.ts
  Part of 'files' list in tsconfig.json
src/project/a/fileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/b/ba/fileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/b/randomFileForImport.ts
  Part of 'files' list in tsconfig.json
src/project/c/ca/fileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/c/ca/caa/randomFileForImport.ts
  Part of 'files' list in tsconfig.json
src/project/c/ca/caa/caaa/fileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/c/cb/fileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts
  Part of 'files' list in tsconfig.json
src/project/d/da/daa/daaa/fileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/d/da/daa/fileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/d/da/fileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/e/ea/fileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/e/ea/eaa/fileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/e/ea/eaa/eaaa/fileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts
  Part of 'files' list in tsconfig.json

Found 15 errors.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped


//// [/src/project/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../lib/lib.d.ts","./node_modules/pkg0/index.d.ts","./filewithimports.ts","./randomfileforimport.ts","./a/filewithimports.ts","./b/ba/filewithimports.ts","./b/randomfileforimport.ts","./c/ca/filewithimports.ts","./c/ca/caa/randomfileforimport.ts","./c/ca/caa/caaa/filewithimports.ts","./c/cb/filewithimports.ts","./d/da/daa/daaa/x/y/z/randomfileforimport.ts","./d/da/daa/daaa/filewithimports.ts","./d/da/daa/filewithimports.ts","./d/da/filewithimports.ts","./e/ea/filewithimports.ts","./e/ea/eaa/filewithimports.ts","./e/ea/eaa/eaaa/filewithimports.ts","./e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts","./a","./b/ba","./c/ca/caa/caaa","./c/cb","./d/da/daa/daaa/x/y/z","./e/ea/eaa/eaaa/x/y/z"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},"769951468-export interface ImportInterface0 {}","9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",{"version":"8470059553-import type { ImportInterface1 } from \"pkg1\";\nimport type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;","signature":"-6057683066-export declare const x = 10;\r\n"},"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",{"version":"8470059553-import type { ImportInterface1 } from \"pkg1\";\nimport type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;","signature":"-6057683066-export declare const x = 10;\r\n"},"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",{"version":"8470059553-import type { ImportInterface1 } from \"pkg1\";\nimport type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;","signature":"-6057683066-export declare const x = 10;\r\n"},"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",{"version":"10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;","signature":"-6057683066-export declare const x = 10;\r\n"},"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",{"version":"10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;","signature":"-6057683066-export declare const x = 10;\r\n"}],"options":{"cacheResolutions":true,"composite":true},"fileIdsList":[[2]],"referencedMap":[[5,1],[6,1],[7,1],[10,1],[9,1],[8,1],[11,1],[13,1],[12,1],[14,1],[15,1],[18,1],[19,1],[17,1],[16,1],[3,1],[4,1]],"exportedModulesMap":[[5,1],[6,1],[10,1],[8,1],[11,1],[13,1],[14,1],[15,1],[18,1],[17,1],[16,1],[3,1]],"semanticDiagnosticsPerFile":[1,[5,[{"file":"./a/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[6,[{"file":"./b/ba/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[7,[{"file":"./b/randomfileforimport.ts","start":38,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[10,[{"file":"./c/ca/caa/caaa/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[9,[{"file":"./c/ca/caa/randomfileforimport.ts","start":38,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[8,[{"file":"./c/ca/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[11,[{"file":"./c/cb/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[13,[{"file":"./d/da/daa/daaa/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],12,[14,[{"file":"./d/da/daa/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[15,[{"file":"./d/da/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[18,[{"file":"./e/ea/eaa/eaaa/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],19,[17,[{"file":"./e/ea/eaa/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[16,[{"file":"./e/ea/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[3,[{"file":"./filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],2,[4,[{"file":"./randomfileforimport.ts","start":38,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]]],"affectedFilesPendingEmit":[[5,1],[6,1],[7,1],[10,1],[9,1],[8,1],[11,1],[13,1],[12,1],[14,1],[15,1],[18,1],[19,1],[17,1],[16,1],[3,1],[2,1],[4,1]],"emitSignatures":[3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19],"cacheResolutions":{"resolutions":[{"resolvedModule":{"resolvedFileName":2,"isExternalLibraryImport":true}}],"names":["pkg0"],"resolutionEntries":[[1,1]],"modules":[[20,[1]],[21,[1]],[22,[1]],[23,[1]],[24,[1]],[25,[1]]]}},"version":"FakeTSVersion"}

//// [/src/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
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
      "./d/da/daa/daaa/x/y/z/randomfileforimport.ts",
      "./d/da/daa/daaa/filewithimports.ts",
      "./d/da/daa/filewithimports.ts",
      "./d/da/filewithimports.ts",
      "./e/ea/filewithimports.ts",
      "./e/ea/eaa/filewithimports.ts",
      "./e/ea/eaa/eaaa/filewithimports.ts",
      "./e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts",
      "./a",
      "./b/ba",
      "./c/ca/caa/caaa",
      "./c/cb",
      "./d/da/daa/daaa/x/y/z",
      "./e/ea/eaa/eaaa/x/y/z"
    ],
    "fileNamesList": [
      [
        "./node_modules/pkg0/index.d.ts"
      ]
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./node_modules/pkg0/index.d.ts": {
        "version": "769951468-export interface ImportInterface0 {}",
        "signature": "769951468-export interface ImportInterface0 {}"
      },
      "./filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
      },
      "./randomfileforimport.ts": {
        "version": "8470059553-import type { ImportInterface1 } from \"pkg1\";\nimport type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;",
        "signature": "-6057683066-export declare const x = 10;\r\n"
      },
      "./a/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
      },
      "./b/ba/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
      },
      "./b/randomfileforimport.ts": {
        "version": "8470059553-import type { ImportInterface1 } from \"pkg1\";\nimport type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;",
        "signature": "-6057683066-export declare const x = 10;\r\n"
      },
      "./c/ca/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
      },
      "./c/ca/caa/randomfileforimport.ts": {
        "version": "8470059553-import type { ImportInterface1 } from \"pkg1\";\nimport type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;",
        "signature": "-6057683066-export declare const x = 10;\r\n"
      },
      "./c/ca/caa/caaa/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
      },
      "./c/cb/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
      },
      "./d/da/daa/daaa/x/y/z/randomfileforimport.ts": {
        "version": "10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;",
        "signature": "-6057683066-export declare const x = 10;\r\n"
      },
      "./d/da/daa/daaa/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
      },
      "./d/da/daa/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
      },
      "./d/da/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
      },
      "./e/ea/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
      },
      "./e/ea/eaa/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
      },
      "./e/ea/eaa/eaaa/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
      },
      "./e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts": {
        "version": "10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;",
        "signature": "-6057683066-export declare const x = 10;\r\n"
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
      "./d/da/daa/daaa/x/y/z/randomfileforimport.ts": [
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
      "./e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts": [
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
    "exportedModulesMap": {
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
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      [
        "./a/filewithimports.ts",
        [
          {
            "file": "./a/filewithimports.ts",
            "start": 84,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      [
        "./b/ba/filewithimports.ts",
        [
          {
            "file": "./b/ba/filewithimports.ts",
            "start": 84,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      [
        "./b/randomfileforimport.ts",
        [
          {
            "file": "./b/randomfileforimport.ts",
            "start": 38,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      [
        "./c/ca/caa/caaa/filewithimports.ts",
        [
          {
            "file": "./c/ca/caa/caaa/filewithimports.ts",
            "start": 84,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      [
        "./c/ca/caa/randomfileforimport.ts",
        [
          {
            "file": "./c/ca/caa/randomfileforimport.ts",
            "start": 38,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      [
        "./c/ca/filewithimports.ts",
        [
          {
            "file": "./c/ca/filewithimports.ts",
            "start": 84,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      [
        "./c/cb/filewithimports.ts",
        [
          {
            "file": "./c/cb/filewithimports.ts",
            "start": 84,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      [
        "./d/da/daa/daaa/filewithimports.ts",
        [
          {
            "file": "./d/da/daa/daaa/filewithimports.ts",
            "start": 84,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      "./d/da/daa/daaa/x/y/z/randomfileforimport.ts",
      [
        "./d/da/daa/filewithimports.ts",
        [
          {
            "file": "./d/da/daa/filewithimports.ts",
            "start": 84,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      [
        "./d/da/filewithimports.ts",
        [
          {
            "file": "./d/da/filewithimports.ts",
            "start": 84,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      [
        "./e/ea/eaa/eaaa/filewithimports.ts",
        [
          {
            "file": "./e/ea/eaa/eaaa/filewithimports.ts",
            "start": 84,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      "./e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts",
      [
        "./e/ea/eaa/filewithimports.ts",
        [
          {
            "file": "./e/ea/eaa/filewithimports.ts",
            "start": 84,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      [
        "./e/ea/filewithimports.ts",
        [
          {
            "file": "./e/ea/filewithimports.ts",
            "start": 84,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      [
        "./filewithimports.ts",
        [
          {
            "file": "./filewithimports.ts",
            "start": 84,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      "./node_modules/pkg0/index.d.ts",
      [
        "./randomfileforimport.ts",
        [
          {
            "file": "./randomfileforimport.ts",
            "start": 38,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ]
    ],
    "affectedFilesPendingEmit": [
      [
        "./a/filewithimports.ts",
        "Full"
      ],
      [
        "./b/ba/filewithimports.ts",
        "Full"
      ],
      [
        "./b/randomfileforimport.ts",
        "Full"
      ],
      [
        "./c/ca/caa/caaa/filewithimports.ts",
        "Full"
      ],
      [
        "./c/ca/caa/randomfileforimport.ts",
        "Full"
      ],
      [
        "./c/ca/filewithimports.ts",
        "Full"
      ],
      [
        "./c/cb/filewithimports.ts",
        "Full"
      ],
      [
        "./d/da/daa/daaa/filewithimports.ts",
        "Full"
      ],
      [
        "./d/da/daa/daaa/x/y/z/randomfileforimport.ts",
        "Full"
      ],
      [
        "./d/da/daa/filewithimports.ts",
        "Full"
      ],
      [
        "./d/da/filewithimports.ts",
        "Full"
      ],
      [
        "./e/ea/eaa/eaaa/filewithimports.ts",
        "Full"
      ],
      [
        "./e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts",
        "Full"
      ],
      [
        "./e/ea/eaa/filewithimports.ts",
        "Full"
      ],
      [
        "./e/ea/filewithimports.ts",
        "Full"
      ],
      [
        "./filewithimports.ts",
        "Full"
      ],
      [
        "./node_modules/pkg0/index.d.ts",
        "Full"
      ],
      [
        "./randomfileforimport.ts",
        "Full"
      ]
    ],
    "emitSignatures": [
      "./filewithimports.ts",
      "./randomfileforimport.ts",
      "./a/filewithimports.ts",
      "./b/ba/filewithimports.ts",
      "./b/randomfileforimport.ts",
      "./c/ca/filewithimports.ts",
      "./c/ca/caa/randomfileforimport.ts",
      "./c/ca/caa/caaa/filewithimports.ts",
      "./c/cb/filewithimports.ts",
      "./d/da/daa/daaa/x/y/z/randomfileforimport.ts",
      "./d/da/daa/daaa/filewithimports.ts",
      "./d/da/daa/filewithimports.ts",
      "./d/da/filewithimports.ts",
      "./e/ea/filewithimports.ts",
      "./e/ea/eaa/filewithimports.ts",
      "./e/ea/eaa/eaaa/filewithimports.ts",
      "./e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts"
    ],
    "cacheResolutions": {
      "resolutions": [
        {
          "id": 1,
          "resolvedModule": {
            "resolvedFileName": "./node_modules/pkg0/index.d.ts",
            "isExternalLibraryImport": true
          }
        }
      ],
      "names": [
        "pkg0"
      ],
      "resolutionEntries": [
        [
          "pkg0",
          {
            "id": 1,
            "resolvedModule": {
              "resolvedFileName": "./node_modules/pkg0/index.d.ts",
              "isExternalLibraryImport": true
            }
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
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
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
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
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
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
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
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ],
        [
          "./d/da/daa/daaa/x/y/z",
          [
            [
              "pkg0",
              {
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ],
        [
          "./e/ea/eaa/eaaa/x/y/z",
          [
            [
              "pkg0",
              {
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ]
      ]
    }
  },
  "version": "FakeTSVersion",
  "size": 6952
}



Change:: modify d/da/daa/daaa/x/y/z/randomFileForImport by adding unresolved import
Input::
//// [/src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts]
import type { ImportInterface1 } from "pkg1";
import type { ImportInterface0 } from "pkg0";
export const x = 10;



Output::
/lib/tsc -b /src/project --explainFiles
Reusing resolution of module 'pkg0' from '/src/project/fileWithImports.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
File '/src/project/node_modules/pkg1.ts' does not exist.
File '/src/project/node_modules/pkg1.tsx' does not exist.
File '/src/project/node_modules/pkg1.d.ts' does not exist.
Directory '/src/project/node_modules/@types' does not exist, skipping all lookups in it.
Directory '/src/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
Loading module 'pkg1' from 'node_modules' folder, target file type 'JavaScript'.
File '/src/project/node_modules/pkg1.js' does not exist.
File '/src/project/node_modules/pkg1.jsx' does not exist.
Directory '/src/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/randomFileForImport.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/randomFileForImport.ts'. ========
Resolution for module 'pkg1' was found in cache from location '/src/project'.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/a/fileWithImports.ts' found in cache from location '/src/project/a', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/a/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/a/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project'.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/b/ba/fileWithImports.ts' found in cache from location '/src/project/b/ba', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/b/ba/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/b/ba/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/b/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project'.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/b/randomFileForImport.ts' found in cache from location '/src/project/b', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/b/randomFileForImport.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Resolution for module 'pkg1' was found in cache from location '/src/project/b'.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/c/ca/fileWithImports.ts' found in cache from location '/src/project/c/ca', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/c/ca/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/c/ca/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/c/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project'.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/c/ca/caa/randomFileForImport.ts' found in cache from location '/src/project/c/ca/caa', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/c/ca/caa/randomFileForImport.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/c/ca/caa/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project/c/ca'.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/c/ca/caa/caaa/fileWithImports.ts' found in cache from location '/src/project/c/ca/caa/caaa', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/c/ca/caa/caaa/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/c/ca/caa/caaa/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project/c/ca/caa'.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/c/cb/fileWithImports.ts' found in cache from location '/src/project/c/cb', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/c/cb/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/c/cb/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project/c'.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts' found in cache from location '/src/project/d/da/daa/daaa/x/y/z', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/d/da/daa/daaa/x/y/z/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/d/da/daa/daaa/x/y/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/d/da/daa/daaa/x/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/d/da/daa/daaa/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/d/da/daa/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/d/da/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/d/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project'.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/daaa/fileWithImports.ts' found in cache from location '/src/project/d/da/daa/daaa', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/d/da/daa/daaa/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Resolution for module 'pkg1' was found in cache from location '/src/project/d/da/daa/daaa'.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/fileWithImports.ts' found in cache from location '/src/project/d/da/daa', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/d/da/daa/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Resolution for module 'pkg1' was found in cache from location '/src/project/d/da/daa'.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/d/da/fileWithImports.ts' found in cache from location '/src/project/d/da', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/d/da/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Resolution for module 'pkg1' was found in cache from location '/src/project/d/da'.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/e/ea/fileWithImports.ts' found in cache from location '/src/project/e/ea', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/e/ea/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/e/ea/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/e/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project'.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/fileWithImports.ts' found in cache from location '/src/project/e/ea/eaa', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/e/ea/eaa/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/e/ea/eaa/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project/e/ea'.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/eaaa/fileWithImports.ts' found in cache from location '/src/project/e/ea/eaa/eaaa', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/e/ea/eaa/eaaa/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/e/ea/eaa/eaaa/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project/e/ea/eaa'.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts' found in cache from location '/src/project/e/ea/eaa/eaaa/x/y/z', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
[96msrc/project/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96msrc/project/randomFileForImport.ts[0m:[93m1[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m1[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96msrc/project/a/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96msrc/project/b/ba/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96msrc/project/b/randomFileForImport.ts[0m:[93m1[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m1[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96msrc/project/c/ca/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96msrc/project/c/ca/caa/randomFileForImport.ts[0m:[93m1[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m1[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96msrc/project/c/ca/caa/caaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96msrc/project/c/cb/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96msrc/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts[0m:[93m1[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m1[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96msrc/project/d/da/daa/daaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96msrc/project/d/da/daa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96msrc/project/d/da/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96msrc/project/e/ea/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96msrc/project/e/ea/eaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96msrc/project/e/ea/eaa/eaaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

lib/lib.d.ts
  Default library for target 'es3'
src/project/node_modules/pkg0/index.d.ts
  Imported via "pkg0" from file 'src/project/fileWithImports.ts'
  Imported via "pkg0" from file 'src/project/randomFileForImport.ts'
  Imported via "pkg0" from file 'src/project/a/fileWithImports.ts'
  Imported via "pkg0" from file 'src/project/b/ba/fileWithImports.ts'
  Imported via "pkg0" from file 'src/project/b/randomFileForImport.ts'
  Imported via "pkg0" from file 'src/project/c/ca/fileWithImports.ts'
  Imported via "pkg0" from file 'src/project/c/ca/caa/randomFileForImport.ts'
  Imported via "pkg0" from file 'src/project/c/ca/caa/caaa/fileWithImports.ts'
  Imported via "pkg0" from file 'src/project/c/cb/fileWithImports.ts'
  Imported via "pkg0" from file 'src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts'
  Imported via "pkg0" from file 'src/project/d/da/daa/daaa/fileWithImports.ts'
  Imported via "pkg0" from file 'src/project/d/da/daa/fileWithImports.ts'
  Imported via "pkg0" from file 'src/project/d/da/fileWithImports.ts'
  Imported via "pkg0" from file 'src/project/e/ea/fileWithImports.ts'
  Imported via "pkg0" from file 'src/project/e/ea/eaa/fileWithImports.ts'
  Imported via "pkg0" from file 'src/project/e/ea/eaa/eaaa/fileWithImports.ts'
  Imported via "pkg0" from file 'src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts'
src/project/fileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/randomFileForImport.ts
  Part of 'files' list in tsconfig.json
src/project/a/fileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/b/ba/fileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/b/randomFileForImport.ts
  Part of 'files' list in tsconfig.json
src/project/c/ca/fileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/c/ca/caa/randomFileForImport.ts
  Part of 'files' list in tsconfig.json
src/project/c/ca/caa/caaa/fileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/c/cb/fileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts
  Part of 'files' list in tsconfig.json
src/project/d/da/daa/daaa/fileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/d/da/daa/fileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/d/da/fileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/e/ea/fileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/e/ea/eaa/fileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/e/ea/eaa/eaaa/fileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts
  Part of 'files' list in tsconfig.json

Found 16 errors.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped


//// [/src/project/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../lib/lib.d.ts","./node_modules/pkg0/index.d.ts","./filewithimports.ts","./randomfileforimport.ts","./a/filewithimports.ts","./b/ba/filewithimports.ts","./b/randomfileforimport.ts","./c/ca/filewithimports.ts","./c/ca/caa/randomfileforimport.ts","./c/ca/caa/caaa/filewithimports.ts","./c/cb/filewithimports.ts","./d/da/daa/daaa/x/y/z/randomfileforimport.ts","./d/da/daa/daaa/filewithimports.ts","./d/da/daa/filewithimports.ts","./d/da/filewithimports.ts","./e/ea/filewithimports.ts","./e/ea/eaa/filewithimports.ts","./e/ea/eaa/eaaa/filewithimports.ts","./e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts","./a","./b/ba","./c/ca/caa/caaa","./c/cb","./d/da/daa/daaa/x/y/z","./e/ea/eaa/eaaa/x/y/z"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},"769951468-export interface ImportInterface0 {}","9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",{"version":"8470059553-import type { ImportInterface1 } from \"pkg1\";\nimport type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;","signature":"-6057683066-export declare const x = 10;\r\n"},"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",{"version":"8470059553-import type { ImportInterface1 } from \"pkg1\";\nimport type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;","signature":"-6057683066-export declare const x = 10;\r\n"},"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",{"version":"8470059553-import type { ImportInterface1 } from \"pkg1\";\nimport type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;","signature":"-6057683066-export declare const x = 10;\r\n"},"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",{"version":"8470059553-import type { ImportInterface1 } from \"pkg1\";\nimport type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;","signature":"-6057683066-export declare const x = 10;\r\n"},"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",{"version":"10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;","signature":"-6057683066-export declare const x = 10;\r\n"}],"options":{"cacheResolutions":true,"composite":true},"fileIdsList":[[2]],"referencedMap":[[5,1],[6,1],[7,1],[10,1],[9,1],[8,1],[11,1],[13,1],[12,1],[14,1],[15,1],[18,1],[19,1],[17,1],[16,1],[3,1],[4,1]],"exportedModulesMap":[[5,1],[6,1],[10,1],[8,1],[11,1],[13,1],[14,1],[15,1],[18,1],[17,1],[16,1],[3,1]],"semanticDiagnosticsPerFile":[1,[5,[{"file":"./a/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[6,[{"file":"./b/ba/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[7,[{"file":"./b/randomfileforimport.ts","start":38,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[10,[{"file":"./c/ca/caa/caaa/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[9,[{"file":"./c/ca/caa/randomfileforimport.ts","start":38,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[8,[{"file":"./c/ca/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[11,[{"file":"./c/cb/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[13,[{"file":"./d/da/daa/daaa/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[12,[{"file":"./d/da/daa/daaa/x/y/z/randomfileforimport.ts","start":38,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[14,[{"file":"./d/da/daa/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[15,[{"file":"./d/da/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[18,[{"file":"./e/ea/eaa/eaaa/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],19,[17,[{"file":"./e/ea/eaa/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[16,[{"file":"./e/ea/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[3,[{"file":"./filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],2,[4,[{"file":"./randomfileforimport.ts","start":38,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]]],"affectedFilesPendingEmit":[[5,1],[6,1],[7,1],[10,1],[9,1],[8,1],[11,1],[13,1],[12,1],[14,1],[15,1],[18,1],[19,1],[17,1],[16,1],[3,1],[2,1],[4,1]],"emitSignatures":[3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19],"cacheResolutions":{"resolutions":[{"resolvedModule":{"resolvedFileName":2,"isExternalLibraryImport":true}}],"names":["pkg0"],"resolutionEntries":[[1,1]],"modules":[[20,[1]],[21,[1]],[22,[1]],[23,[1]],[24,[1]],[25,[1]]]}},"version":"FakeTSVersion"}

//// [/src/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
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
      "./d/da/daa/daaa/x/y/z/randomfileforimport.ts",
      "./d/da/daa/daaa/filewithimports.ts",
      "./d/da/daa/filewithimports.ts",
      "./d/da/filewithimports.ts",
      "./e/ea/filewithimports.ts",
      "./e/ea/eaa/filewithimports.ts",
      "./e/ea/eaa/eaaa/filewithimports.ts",
      "./e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts",
      "./a",
      "./b/ba",
      "./c/ca/caa/caaa",
      "./c/cb",
      "./d/da/daa/daaa/x/y/z",
      "./e/ea/eaa/eaaa/x/y/z"
    ],
    "fileNamesList": [
      [
        "./node_modules/pkg0/index.d.ts"
      ]
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./node_modules/pkg0/index.d.ts": {
        "version": "769951468-export interface ImportInterface0 {}",
        "signature": "769951468-export interface ImportInterface0 {}"
      },
      "./filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
      },
      "./randomfileforimport.ts": {
        "version": "8470059553-import type { ImportInterface1 } from \"pkg1\";\nimport type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;",
        "signature": "-6057683066-export declare const x = 10;\r\n"
      },
      "./a/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
      },
      "./b/ba/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
      },
      "./b/randomfileforimport.ts": {
        "version": "8470059553-import type { ImportInterface1 } from \"pkg1\";\nimport type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;",
        "signature": "-6057683066-export declare const x = 10;\r\n"
      },
      "./c/ca/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
      },
      "./c/ca/caa/randomfileforimport.ts": {
        "version": "8470059553-import type { ImportInterface1 } from \"pkg1\";\nimport type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;",
        "signature": "-6057683066-export declare const x = 10;\r\n"
      },
      "./c/ca/caa/caaa/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
      },
      "./c/cb/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
      },
      "./d/da/daa/daaa/x/y/z/randomfileforimport.ts": {
        "version": "8470059553-import type { ImportInterface1 } from \"pkg1\";\nimport type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;",
        "signature": "-6057683066-export declare const x = 10;\r\n"
      },
      "./d/da/daa/daaa/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
      },
      "./d/da/daa/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
      },
      "./d/da/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
      },
      "./e/ea/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
      },
      "./e/ea/eaa/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
      },
      "./e/ea/eaa/eaaa/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
      },
      "./e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts": {
        "version": "10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;",
        "signature": "-6057683066-export declare const x = 10;\r\n"
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
      "./d/da/daa/daaa/x/y/z/randomfileforimport.ts": [
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
      "./e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts": [
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
    "exportedModulesMap": {
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
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      [
        "./a/filewithimports.ts",
        [
          {
            "file": "./a/filewithimports.ts",
            "start": 84,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      [
        "./b/ba/filewithimports.ts",
        [
          {
            "file": "./b/ba/filewithimports.ts",
            "start": 84,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      [
        "./b/randomfileforimport.ts",
        [
          {
            "file": "./b/randomfileforimport.ts",
            "start": 38,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      [
        "./c/ca/caa/caaa/filewithimports.ts",
        [
          {
            "file": "./c/ca/caa/caaa/filewithimports.ts",
            "start": 84,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      [
        "./c/ca/caa/randomfileforimport.ts",
        [
          {
            "file": "./c/ca/caa/randomfileforimport.ts",
            "start": 38,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      [
        "./c/ca/filewithimports.ts",
        [
          {
            "file": "./c/ca/filewithimports.ts",
            "start": 84,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      [
        "./c/cb/filewithimports.ts",
        [
          {
            "file": "./c/cb/filewithimports.ts",
            "start": 84,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      [
        "./d/da/daa/daaa/filewithimports.ts",
        [
          {
            "file": "./d/da/daa/daaa/filewithimports.ts",
            "start": 84,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      [
        "./d/da/daa/daaa/x/y/z/randomfileforimport.ts",
        [
          {
            "file": "./d/da/daa/daaa/x/y/z/randomfileforimport.ts",
            "start": 38,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      [
        "./d/da/daa/filewithimports.ts",
        [
          {
            "file": "./d/da/daa/filewithimports.ts",
            "start": 84,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      [
        "./d/da/filewithimports.ts",
        [
          {
            "file": "./d/da/filewithimports.ts",
            "start": 84,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      [
        "./e/ea/eaa/eaaa/filewithimports.ts",
        [
          {
            "file": "./e/ea/eaa/eaaa/filewithimports.ts",
            "start": 84,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      "./e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts",
      [
        "./e/ea/eaa/filewithimports.ts",
        [
          {
            "file": "./e/ea/eaa/filewithimports.ts",
            "start": 84,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      [
        "./e/ea/filewithimports.ts",
        [
          {
            "file": "./e/ea/filewithimports.ts",
            "start": 84,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      [
        "./filewithimports.ts",
        [
          {
            "file": "./filewithimports.ts",
            "start": 84,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      "./node_modules/pkg0/index.d.ts",
      [
        "./randomfileforimport.ts",
        [
          {
            "file": "./randomfileforimport.ts",
            "start": 38,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ]
    ],
    "affectedFilesPendingEmit": [
      [
        "./a/filewithimports.ts",
        "Full"
      ],
      [
        "./b/ba/filewithimports.ts",
        "Full"
      ],
      [
        "./b/randomfileforimport.ts",
        "Full"
      ],
      [
        "./c/ca/caa/caaa/filewithimports.ts",
        "Full"
      ],
      [
        "./c/ca/caa/randomfileforimport.ts",
        "Full"
      ],
      [
        "./c/ca/filewithimports.ts",
        "Full"
      ],
      [
        "./c/cb/filewithimports.ts",
        "Full"
      ],
      [
        "./d/da/daa/daaa/filewithimports.ts",
        "Full"
      ],
      [
        "./d/da/daa/daaa/x/y/z/randomfileforimport.ts",
        "Full"
      ],
      [
        "./d/da/daa/filewithimports.ts",
        "Full"
      ],
      [
        "./d/da/filewithimports.ts",
        "Full"
      ],
      [
        "./e/ea/eaa/eaaa/filewithimports.ts",
        "Full"
      ],
      [
        "./e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts",
        "Full"
      ],
      [
        "./e/ea/eaa/filewithimports.ts",
        "Full"
      ],
      [
        "./e/ea/filewithimports.ts",
        "Full"
      ],
      [
        "./filewithimports.ts",
        "Full"
      ],
      [
        "./node_modules/pkg0/index.d.ts",
        "Full"
      ],
      [
        "./randomfileforimport.ts",
        "Full"
      ]
    ],
    "emitSignatures": [
      "./filewithimports.ts",
      "./randomfileforimport.ts",
      "./a/filewithimports.ts",
      "./b/ba/filewithimports.ts",
      "./b/randomfileforimport.ts",
      "./c/ca/filewithimports.ts",
      "./c/ca/caa/randomfileforimport.ts",
      "./c/ca/caa/caaa/filewithimports.ts",
      "./c/cb/filewithimports.ts",
      "./d/da/daa/daaa/x/y/z/randomfileforimport.ts",
      "./d/da/daa/daaa/filewithimports.ts",
      "./d/da/daa/filewithimports.ts",
      "./d/da/filewithimports.ts",
      "./e/ea/filewithimports.ts",
      "./e/ea/eaa/filewithimports.ts",
      "./e/ea/eaa/eaaa/filewithimports.ts",
      "./e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts"
    ],
    "cacheResolutions": {
      "resolutions": [
        {
          "id": 1,
          "resolvedModule": {
            "resolvedFileName": "./node_modules/pkg0/index.d.ts",
            "isExternalLibraryImport": true
          }
        }
      ],
      "names": [
        "pkg0"
      ],
      "resolutionEntries": [
        [
          "pkg0",
          {
            "id": 1,
            "resolvedModule": {
              "resolvedFileName": "./node_modules/pkg0/index.d.ts",
              "isExternalLibraryImport": true
            }
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
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
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
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
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
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
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
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ],
        [
          "./d/da/daa/daaa/x/y/z",
          [
            [
              "pkg0",
              {
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ],
        [
          "./e/ea/eaa/eaaa/x/y/z",
          [
            [
              "pkg0",
              {
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ]
      ]
    }
  },
  "version": "FakeTSVersion",
  "size": 7189
}



Change:: modify e/ea/eaa/eaaa/x/y/z/randomFileForImport by adding unresolved import
Input::
//// [/src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts]
import type { ImportInterface1 } from "pkg1";
import type { ImportInterface0 } from "pkg0";
export const x = 10;



Output::
/lib/tsc -b /src/project --explainFiles
Reusing resolution of module 'pkg0' from '/src/project/fileWithImports.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
File '/src/project/node_modules/pkg1.ts' does not exist.
File '/src/project/node_modules/pkg1.tsx' does not exist.
File '/src/project/node_modules/pkg1.d.ts' does not exist.
Directory '/src/project/node_modules/@types' does not exist, skipping all lookups in it.
Directory '/src/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
Loading module 'pkg1' from 'node_modules' folder, target file type 'JavaScript'.
File '/src/project/node_modules/pkg1.js' does not exist.
File '/src/project/node_modules/pkg1.jsx' does not exist.
Directory '/src/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/randomFileForImport.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/randomFileForImport.ts'. ========
Resolution for module 'pkg1' was found in cache from location '/src/project'.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/a/fileWithImports.ts' found in cache from location '/src/project/a', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/a/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/a/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project'.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/b/ba/fileWithImports.ts' found in cache from location '/src/project/b/ba', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/b/ba/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/b/ba/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/b/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project'.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/b/randomFileForImport.ts' found in cache from location '/src/project/b', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/b/randomFileForImport.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Resolution for module 'pkg1' was found in cache from location '/src/project/b'.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/c/ca/fileWithImports.ts' found in cache from location '/src/project/c/ca', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/c/ca/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/c/ca/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/c/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project'.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/c/ca/caa/randomFileForImport.ts' found in cache from location '/src/project/c/ca/caa', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/c/ca/caa/randomFileForImport.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/c/ca/caa/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project/c/ca'.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/c/ca/caa/caaa/fileWithImports.ts' found in cache from location '/src/project/c/ca/caa/caaa', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/c/ca/caa/caaa/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/c/ca/caa/caaa/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project/c/ca/caa'.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/c/cb/fileWithImports.ts' found in cache from location '/src/project/c/cb', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/c/cb/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/c/cb/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project/c'.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts' found in cache from location '/src/project/d/da/daa/daaa/x/y/z', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/d/da/daa/daaa/x/y/z/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/d/da/daa/daaa/x/y/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/d/da/daa/daaa/x/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/d/da/daa/daaa/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/d/da/daa/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/d/da/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/d/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project'.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/daaa/fileWithImports.ts' found in cache from location '/src/project/d/da/daa/daaa', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/d/da/daa/daaa/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Resolution for module 'pkg1' was found in cache from location '/src/project/d/da/daa/daaa'.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/fileWithImports.ts' found in cache from location '/src/project/d/da/daa', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/d/da/daa/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Resolution for module 'pkg1' was found in cache from location '/src/project/d/da/daa'.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/d/da/fileWithImports.ts' found in cache from location '/src/project/d/da', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/d/da/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Resolution for module 'pkg1' was found in cache from location '/src/project/d/da'.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/e/ea/fileWithImports.ts' found in cache from location '/src/project/e/ea', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/e/ea/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/e/ea/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/e/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project'.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/fileWithImports.ts' found in cache from location '/src/project/e/ea/eaa', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/e/ea/eaa/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/e/ea/eaa/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project/e/ea'.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/eaaa/fileWithImports.ts' found in cache from location '/src/project/e/ea/eaa/eaaa', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/e/ea/eaa/eaaa/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/e/ea/eaa/eaaa/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project/e/ea/eaa'.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts' found in cache from location '/src/project/e/ea/eaa/eaaa/x/y/z', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/e/ea/eaa/eaaa/x/y/z/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/e/ea/eaa/eaaa/x/y/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/e/ea/eaa/eaaa/x/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project/e/ea/eaa/eaaa'.
======== Module name 'pkg1' was not resolved. ========
[96msrc/project/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96msrc/project/randomFileForImport.ts[0m:[93m1[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m1[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96msrc/project/a/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96msrc/project/b/ba/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96msrc/project/b/randomFileForImport.ts[0m:[93m1[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m1[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96msrc/project/c/ca/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96msrc/project/c/ca/caa/randomFileForImport.ts[0m:[93m1[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m1[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96msrc/project/c/ca/caa/caaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96msrc/project/c/cb/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96msrc/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts[0m:[93m1[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m1[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96msrc/project/d/da/daa/daaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96msrc/project/d/da/daa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96msrc/project/d/da/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96msrc/project/e/ea/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96msrc/project/e/ea/eaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96msrc/project/e/ea/eaa/eaaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96msrc/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts[0m:[93m1[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m1[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

lib/lib.d.ts
  Default library for target 'es3'
src/project/node_modules/pkg0/index.d.ts
  Imported via "pkg0" from file 'src/project/fileWithImports.ts'
  Imported via "pkg0" from file 'src/project/randomFileForImport.ts'
  Imported via "pkg0" from file 'src/project/a/fileWithImports.ts'
  Imported via "pkg0" from file 'src/project/b/ba/fileWithImports.ts'
  Imported via "pkg0" from file 'src/project/b/randomFileForImport.ts'
  Imported via "pkg0" from file 'src/project/c/ca/fileWithImports.ts'
  Imported via "pkg0" from file 'src/project/c/ca/caa/randomFileForImport.ts'
  Imported via "pkg0" from file 'src/project/c/ca/caa/caaa/fileWithImports.ts'
  Imported via "pkg0" from file 'src/project/c/cb/fileWithImports.ts'
  Imported via "pkg0" from file 'src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts'
  Imported via "pkg0" from file 'src/project/d/da/daa/daaa/fileWithImports.ts'
  Imported via "pkg0" from file 'src/project/d/da/daa/fileWithImports.ts'
  Imported via "pkg0" from file 'src/project/d/da/fileWithImports.ts'
  Imported via "pkg0" from file 'src/project/e/ea/fileWithImports.ts'
  Imported via "pkg0" from file 'src/project/e/ea/eaa/fileWithImports.ts'
  Imported via "pkg0" from file 'src/project/e/ea/eaa/eaaa/fileWithImports.ts'
  Imported via "pkg0" from file 'src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts'
src/project/fileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/randomFileForImport.ts
  Part of 'files' list in tsconfig.json
src/project/a/fileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/b/ba/fileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/b/randomFileForImport.ts
  Part of 'files' list in tsconfig.json
src/project/c/ca/fileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/c/ca/caa/randomFileForImport.ts
  Part of 'files' list in tsconfig.json
src/project/c/ca/caa/caaa/fileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/c/cb/fileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts
  Part of 'files' list in tsconfig.json
src/project/d/da/daa/daaa/fileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/d/da/daa/fileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/d/da/fileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/e/ea/fileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/e/ea/eaa/fileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/e/ea/eaa/eaaa/fileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts
  Part of 'files' list in tsconfig.json

Found 17 errors.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped


//// [/src/project/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../lib/lib.d.ts","./node_modules/pkg0/index.d.ts","./filewithimports.ts","./randomfileforimport.ts","./a/filewithimports.ts","./b/ba/filewithimports.ts","./b/randomfileforimport.ts","./c/ca/filewithimports.ts","./c/ca/caa/randomfileforimport.ts","./c/ca/caa/caaa/filewithimports.ts","./c/cb/filewithimports.ts","./d/da/daa/daaa/x/y/z/randomfileforimport.ts","./d/da/daa/daaa/filewithimports.ts","./d/da/daa/filewithimports.ts","./d/da/filewithimports.ts","./e/ea/filewithimports.ts","./e/ea/eaa/filewithimports.ts","./e/ea/eaa/eaaa/filewithimports.ts","./e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts","./a","./b/ba","./c/ca/caa/caaa","./c/cb","./d/da/daa/daaa/x/y/z","./e/ea/eaa/eaaa/x/y/z"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},"769951468-export interface ImportInterface0 {}","9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",{"version":"8470059553-import type { ImportInterface1 } from \"pkg1\";\nimport type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;","signature":"-6057683066-export declare const x = 10;\r\n"},"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",{"version":"8470059553-import type { ImportInterface1 } from \"pkg1\";\nimport type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;","signature":"-6057683066-export declare const x = 10;\r\n"},"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",{"version":"8470059553-import type { ImportInterface1 } from \"pkg1\";\nimport type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;","signature":"-6057683066-export declare const x = 10;\r\n"},"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",{"version":"8470059553-import type { ImportInterface1 } from \"pkg1\";\nimport type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;","signature":"-6057683066-export declare const x = 10;\r\n"},"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",{"version":"8470059553-import type { ImportInterface1 } from \"pkg1\";\nimport type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;","signature":"-6057683066-export declare const x = 10;\r\n"}],"options":{"cacheResolutions":true,"composite":true},"fileIdsList":[[2]],"referencedMap":[[5,1],[6,1],[7,1],[10,1],[9,1],[8,1],[11,1],[13,1],[12,1],[14,1],[15,1],[18,1],[19,1],[17,1],[16,1],[3,1],[4,1]],"exportedModulesMap":[[5,1],[6,1],[10,1],[8,1],[11,1],[13,1],[14,1],[15,1],[18,1],[17,1],[16,1],[3,1]],"semanticDiagnosticsPerFile":[1,[5,[{"file":"./a/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[6,[{"file":"./b/ba/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[7,[{"file":"./b/randomfileforimport.ts","start":38,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[10,[{"file":"./c/ca/caa/caaa/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[9,[{"file":"./c/ca/caa/randomfileforimport.ts","start":38,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[8,[{"file":"./c/ca/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[11,[{"file":"./c/cb/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[13,[{"file":"./d/da/daa/daaa/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[12,[{"file":"./d/da/daa/daaa/x/y/z/randomfileforimport.ts","start":38,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[14,[{"file":"./d/da/daa/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[15,[{"file":"./d/da/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[18,[{"file":"./e/ea/eaa/eaaa/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[19,[{"file":"./e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts","start":38,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[17,[{"file":"./e/ea/eaa/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[16,[{"file":"./e/ea/filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[3,[{"file":"./filewithimports.ts","start":84,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],2,[4,[{"file":"./randomfileforimport.ts","start":38,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]]],"affectedFilesPendingEmit":[[5,1],[6,1],[7,1],[10,1],[9,1],[8,1],[11,1],[13,1],[12,1],[14,1],[15,1],[18,1],[19,1],[17,1],[16,1],[3,1],[2,1],[4,1]],"emitSignatures":[3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19],"cacheResolutions":{"resolutions":[{"resolvedModule":{"resolvedFileName":2,"isExternalLibraryImport":true}}],"names":["pkg0"],"resolutionEntries":[[1,1]],"modules":[[20,[1]],[21,[1]],[22,[1]],[23,[1]],[24,[1]],[25,[1]]]}},"version":"FakeTSVersion"}

//// [/src/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
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
      "./d/da/daa/daaa/x/y/z/randomfileforimport.ts",
      "./d/da/daa/daaa/filewithimports.ts",
      "./d/da/daa/filewithimports.ts",
      "./d/da/filewithimports.ts",
      "./e/ea/filewithimports.ts",
      "./e/ea/eaa/filewithimports.ts",
      "./e/ea/eaa/eaaa/filewithimports.ts",
      "./e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts",
      "./a",
      "./b/ba",
      "./c/ca/caa/caaa",
      "./c/cb",
      "./d/da/daa/daaa/x/y/z",
      "./e/ea/eaa/eaaa/x/y/z"
    ],
    "fileNamesList": [
      [
        "./node_modules/pkg0/index.d.ts"
      ]
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./node_modules/pkg0/index.d.ts": {
        "version": "769951468-export interface ImportInterface0 {}",
        "signature": "769951468-export interface ImportInterface0 {}"
      },
      "./filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
      },
      "./randomfileforimport.ts": {
        "version": "8470059553-import type { ImportInterface1 } from \"pkg1\";\nimport type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;",
        "signature": "-6057683066-export declare const x = 10;\r\n"
      },
      "./a/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
      },
      "./b/ba/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
      },
      "./b/randomfileforimport.ts": {
        "version": "8470059553-import type { ImportInterface1 } from \"pkg1\";\nimport type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;",
        "signature": "-6057683066-export declare const x = 10;\r\n"
      },
      "./c/ca/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
      },
      "./c/ca/caa/randomfileforimport.ts": {
        "version": "8470059553-import type { ImportInterface1 } from \"pkg1\";\nimport type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;",
        "signature": "-6057683066-export declare const x = 10;\r\n"
      },
      "./c/ca/caa/caaa/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
      },
      "./c/cb/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
      },
      "./d/da/daa/daaa/x/y/z/randomfileforimport.ts": {
        "version": "8470059553-import type { ImportInterface1 } from \"pkg1\";\nimport type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;",
        "signature": "-6057683066-export declare const x = 10;\r\n"
      },
      "./d/da/daa/daaa/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
      },
      "./d/da/daa/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
      },
      "./d/da/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
      },
      "./e/ea/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
      },
      "./e/ea/eaa/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
      },
      "./e/ea/eaa/eaaa/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
      },
      "./e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts": {
        "version": "8470059553-import type { ImportInterface1 } from \"pkg1\";\nimport type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;",
        "signature": "-6057683066-export declare const x = 10;\r\n"
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
      "./d/da/daa/daaa/x/y/z/randomfileforimport.ts": [
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
      "./e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts": [
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
    "exportedModulesMap": {
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
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      [
        "./a/filewithimports.ts",
        [
          {
            "file": "./a/filewithimports.ts",
            "start": 84,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      [
        "./b/ba/filewithimports.ts",
        [
          {
            "file": "./b/ba/filewithimports.ts",
            "start": 84,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      [
        "./b/randomfileforimport.ts",
        [
          {
            "file": "./b/randomfileforimport.ts",
            "start": 38,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      [
        "./c/ca/caa/caaa/filewithimports.ts",
        [
          {
            "file": "./c/ca/caa/caaa/filewithimports.ts",
            "start": 84,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      [
        "./c/ca/caa/randomfileforimport.ts",
        [
          {
            "file": "./c/ca/caa/randomfileforimport.ts",
            "start": 38,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      [
        "./c/ca/filewithimports.ts",
        [
          {
            "file": "./c/ca/filewithimports.ts",
            "start": 84,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      [
        "./c/cb/filewithimports.ts",
        [
          {
            "file": "./c/cb/filewithimports.ts",
            "start": 84,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      [
        "./d/da/daa/daaa/filewithimports.ts",
        [
          {
            "file": "./d/da/daa/daaa/filewithimports.ts",
            "start": 84,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      [
        "./d/da/daa/daaa/x/y/z/randomfileforimport.ts",
        [
          {
            "file": "./d/da/daa/daaa/x/y/z/randomfileforimport.ts",
            "start": 38,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      [
        "./d/da/daa/filewithimports.ts",
        [
          {
            "file": "./d/da/daa/filewithimports.ts",
            "start": 84,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      [
        "./d/da/filewithimports.ts",
        [
          {
            "file": "./d/da/filewithimports.ts",
            "start": 84,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      [
        "./e/ea/eaa/eaaa/filewithimports.ts",
        [
          {
            "file": "./e/ea/eaa/eaaa/filewithimports.ts",
            "start": 84,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      [
        "./e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts",
        [
          {
            "file": "./e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts",
            "start": 38,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      [
        "./e/ea/eaa/filewithimports.ts",
        [
          {
            "file": "./e/ea/eaa/filewithimports.ts",
            "start": 84,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      [
        "./e/ea/filewithimports.ts",
        [
          {
            "file": "./e/ea/filewithimports.ts",
            "start": 84,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      [
        "./filewithimports.ts",
        [
          {
            "file": "./filewithimports.ts",
            "start": 84,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      "./node_modules/pkg0/index.d.ts",
      [
        "./randomfileforimport.ts",
        [
          {
            "file": "./randomfileforimport.ts",
            "start": 38,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ]
    ],
    "affectedFilesPendingEmit": [
      [
        "./a/filewithimports.ts",
        "Full"
      ],
      [
        "./b/ba/filewithimports.ts",
        "Full"
      ],
      [
        "./b/randomfileforimport.ts",
        "Full"
      ],
      [
        "./c/ca/caa/caaa/filewithimports.ts",
        "Full"
      ],
      [
        "./c/ca/caa/randomfileforimport.ts",
        "Full"
      ],
      [
        "./c/ca/filewithimports.ts",
        "Full"
      ],
      [
        "./c/cb/filewithimports.ts",
        "Full"
      ],
      [
        "./d/da/daa/daaa/filewithimports.ts",
        "Full"
      ],
      [
        "./d/da/daa/daaa/x/y/z/randomfileforimport.ts",
        "Full"
      ],
      [
        "./d/da/daa/filewithimports.ts",
        "Full"
      ],
      [
        "./d/da/filewithimports.ts",
        "Full"
      ],
      [
        "./e/ea/eaa/eaaa/filewithimports.ts",
        "Full"
      ],
      [
        "./e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts",
        "Full"
      ],
      [
        "./e/ea/eaa/filewithimports.ts",
        "Full"
      ],
      [
        "./e/ea/filewithimports.ts",
        "Full"
      ],
      [
        "./filewithimports.ts",
        "Full"
      ],
      [
        "./node_modules/pkg0/index.d.ts",
        "Full"
      ],
      [
        "./randomfileforimport.ts",
        "Full"
      ]
    ],
    "emitSignatures": [
      "./filewithimports.ts",
      "./randomfileforimport.ts",
      "./a/filewithimports.ts",
      "./b/ba/filewithimports.ts",
      "./b/randomfileforimport.ts",
      "./c/ca/filewithimports.ts",
      "./c/ca/caa/randomfileforimport.ts",
      "./c/ca/caa/caaa/filewithimports.ts",
      "./c/cb/filewithimports.ts",
      "./d/da/daa/daaa/x/y/z/randomfileforimport.ts",
      "./d/da/daa/daaa/filewithimports.ts",
      "./d/da/daa/filewithimports.ts",
      "./d/da/filewithimports.ts",
      "./e/ea/filewithimports.ts",
      "./e/ea/eaa/filewithimports.ts",
      "./e/ea/eaa/eaaa/filewithimports.ts",
      "./e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts"
    ],
    "cacheResolutions": {
      "resolutions": [
        {
          "id": 1,
          "resolvedModule": {
            "resolvedFileName": "./node_modules/pkg0/index.d.ts",
            "isExternalLibraryImport": true
          }
        }
      ],
      "names": [
        "pkg0"
      ],
      "resolutionEntries": [
        [
          "pkg0",
          {
            "id": 1,
            "resolvedModule": {
              "resolvedFileName": "./node_modules/pkg0/index.d.ts",
              "isExternalLibraryImport": true
            }
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
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
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
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
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
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
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
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ],
        [
          "./d/da/daa/daaa/x/y/z",
          [
            [
              "pkg0",
              {
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ],
        [
          "./e/ea/eaa/eaaa/x/y/z",
          [
            [
              "pkg0",
              {
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ]
      ]
    }
  },
  "version": "FakeTSVersion",
  "size": 7426
}



Change:: add file for unresolved import
Input::
//// [/src/project/node_modules/pkg1/index.d.ts]
export interface ImportInterface1 {}



Output::
/lib/tsc -b /src/project --explainFiles
Reusing resolution of module 'pkg0' from '/src/project/fileWithImports.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
File '/src/project/node_modules/pkg1/package.json' does not exist.
File '/src/project/node_modules/pkg1.ts' does not exist.
File '/src/project/node_modules/pkg1.tsx' does not exist.
File '/src/project/node_modules/pkg1.d.ts' does not exist.
File '/src/project/node_modules/pkg1/index.ts' does not exist.
File '/src/project/node_modules/pkg1/index.tsx' does not exist.
File '/src/project/node_modules/pkg1/index.d.ts' exist - use it as a name resolution result.
Resolving real path for '/src/project/node_modules/pkg1/index.d.ts', result '/src/project/node_modules/pkg1/index.d.ts'.
======== Module name 'pkg1' was successfully resolved to '/src/project/node_modules/pkg1/index.d.ts'. ========
Reusing resolution of module 'pkg0' from '/src/project/randomFileForImport.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/randomFileForImport.ts'. ========
Resolution for module 'pkg1' was found in cache from location '/src/project'.
======== Module name 'pkg1' was successfully resolved to '/src/project/node_modules/pkg1/index.d.ts'. ========
Reusing resolution of module 'pkg0' from '/src/project/a/fileWithImports.ts' found in cache from location '/src/project/a', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/a/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/a/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project'.
======== Module name 'pkg1' was successfully resolved to '/src/project/node_modules/pkg1/index.d.ts'. ========
Reusing resolution of module 'pkg0' from '/src/project/b/ba/fileWithImports.ts' found in cache from location '/src/project/b/ba', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/b/ba/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/b/ba/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/b/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project'.
======== Module name 'pkg1' was successfully resolved to '/src/project/node_modules/pkg1/index.d.ts'. ========
Reusing resolution of module 'pkg0' from '/src/project/b/randomFileForImport.ts' found in cache from location '/src/project/b', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/b/randomFileForImport.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Resolution for module 'pkg1' was found in cache from location '/src/project/b'.
======== Module name 'pkg1' was successfully resolved to '/src/project/node_modules/pkg1/index.d.ts'. ========
Reusing resolution of module 'pkg0' from '/src/project/c/ca/fileWithImports.ts' found in cache from location '/src/project/c/ca', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/c/ca/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/c/ca/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/c/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project'.
======== Module name 'pkg1' was successfully resolved to '/src/project/node_modules/pkg1/index.d.ts'. ========
Reusing resolution of module 'pkg0' from '/src/project/c/ca/caa/randomFileForImport.ts' found in cache from location '/src/project/c/ca/caa', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/c/ca/caa/randomFileForImport.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/c/ca/caa/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project/c/ca'.
======== Module name 'pkg1' was successfully resolved to '/src/project/node_modules/pkg1/index.d.ts'. ========
Reusing resolution of module 'pkg0' from '/src/project/c/ca/caa/caaa/fileWithImports.ts' found in cache from location '/src/project/c/ca/caa/caaa', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/c/ca/caa/caaa/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/c/ca/caa/caaa/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project/c/ca/caa'.
======== Module name 'pkg1' was successfully resolved to '/src/project/node_modules/pkg1/index.d.ts'. ========
Reusing resolution of module 'pkg0' from '/src/project/c/cb/fileWithImports.ts' found in cache from location '/src/project/c/cb', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/c/cb/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/c/cb/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project/c'.
======== Module name 'pkg1' was successfully resolved to '/src/project/node_modules/pkg1/index.d.ts'. ========
Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts' found in cache from location '/src/project/d/da/daa/daaa/x/y/z', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/d/da/daa/daaa/x/y/z/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/d/da/daa/daaa/x/y/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/d/da/daa/daaa/x/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/d/da/daa/daaa/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/d/da/daa/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/d/da/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/d/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project'.
======== Module name 'pkg1' was successfully resolved to '/src/project/node_modules/pkg1/index.d.ts'. ========
Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/daaa/fileWithImports.ts' found in cache from location '/src/project/d/da/daa/daaa', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/d/da/daa/daaa/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Resolution for module 'pkg1' was found in cache from location '/src/project/d/da/daa/daaa'.
======== Module name 'pkg1' was successfully resolved to '/src/project/node_modules/pkg1/index.d.ts'. ========
Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/fileWithImports.ts' found in cache from location '/src/project/d/da/daa', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/d/da/daa/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Resolution for module 'pkg1' was found in cache from location '/src/project/d/da/daa'.
======== Module name 'pkg1' was successfully resolved to '/src/project/node_modules/pkg1/index.d.ts'. ========
Reusing resolution of module 'pkg0' from '/src/project/d/da/fileWithImports.ts' found in cache from location '/src/project/d/da', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/d/da/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Resolution for module 'pkg1' was found in cache from location '/src/project/d/da'.
======== Module name 'pkg1' was successfully resolved to '/src/project/node_modules/pkg1/index.d.ts'. ========
Reusing resolution of module 'pkg0' from '/src/project/e/ea/fileWithImports.ts' found in cache from location '/src/project/e/ea', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/e/ea/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/e/ea/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/e/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project'.
======== Module name 'pkg1' was successfully resolved to '/src/project/node_modules/pkg1/index.d.ts'. ========
Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/fileWithImports.ts' found in cache from location '/src/project/e/ea/eaa', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/e/ea/eaa/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/e/ea/eaa/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project/e/ea'.
======== Module name 'pkg1' was successfully resolved to '/src/project/node_modules/pkg1/index.d.ts'. ========
Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/eaaa/fileWithImports.ts' found in cache from location '/src/project/e/ea/eaa/eaaa', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/e/ea/eaa/eaaa/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/e/ea/eaa/eaaa/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project/e/ea/eaa'.
======== Module name 'pkg1' was successfully resolved to '/src/project/node_modules/pkg1/index.d.ts'. ========
Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts' found in cache from location '/src/project/e/ea/eaa/eaaa/x/y/z', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/e/ea/eaa/eaaa/x/y/z/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/e/ea/eaa/eaaa/x/y/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/e/ea/eaa/eaaa/x/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project/e/ea/eaa/eaaa'.
======== Module name 'pkg1' was successfully resolved to '/src/project/node_modules/pkg1/index.d.ts'. ========
lib/lib.d.ts
  Default library for target 'es3'
src/project/node_modules/pkg0/index.d.ts
  Imported via "pkg0" from file 'src/project/fileWithImports.ts'
  Imported via "pkg0" from file 'src/project/randomFileForImport.ts'
  Imported via "pkg0" from file 'src/project/a/fileWithImports.ts'
  Imported via "pkg0" from file 'src/project/b/ba/fileWithImports.ts'
  Imported via "pkg0" from file 'src/project/b/randomFileForImport.ts'
  Imported via "pkg0" from file 'src/project/c/ca/fileWithImports.ts'
  Imported via "pkg0" from file 'src/project/c/ca/caa/randomFileForImport.ts'
  Imported via "pkg0" from file 'src/project/c/ca/caa/caaa/fileWithImports.ts'
  Imported via "pkg0" from file 'src/project/c/cb/fileWithImports.ts'
  Imported via "pkg0" from file 'src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts'
  Imported via "pkg0" from file 'src/project/d/da/daa/daaa/fileWithImports.ts'
  Imported via "pkg0" from file 'src/project/d/da/daa/fileWithImports.ts'
  Imported via "pkg0" from file 'src/project/d/da/fileWithImports.ts'
  Imported via "pkg0" from file 'src/project/e/ea/fileWithImports.ts'
  Imported via "pkg0" from file 'src/project/e/ea/eaa/fileWithImports.ts'
  Imported via "pkg0" from file 'src/project/e/ea/eaa/eaaa/fileWithImports.ts'
  Imported via "pkg0" from file 'src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts'
src/project/node_modules/pkg1/index.d.ts
  Imported via "pkg1" from file 'src/project/fileWithImports.ts'
  Imported via "pkg1" from file 'src/project/randomFileForImport.ts'
  Imported via "pkg1" from file 'src/project/a/fileWithImports.ts'
  Imported via "pkg1" from file 'src/project/b/ba/fileWithImports.ts'
  Imported via "pkg1" from file 'src/project/b/randomFileForImport.ts'
  Imported via "pkg1" from file 'src/project/c/ca/fileWithImports.ts'
  Imported via "pkg1" from file 'src/project/c/ca/caa/randomFileForImport.ts'
  Imported via "pkg1" from file 'src/project/c/ca/caa/caaa/fileWithImports.ts'
  Imported via "pkg1" from file 'src/project/c/cb/fileWithImports.ts'
  Imported via "pkg1" from file 'src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts'
  Imported via "pkg1" from file 'src/project/d/da/daa/daaa/fileWithImports.ts'
  Imported via "pkg1" from file 'src/project/d/da/daa/fileWithImports.ts'
  Imported via "pkg1" from file 'src/project/d/da/fileWithImports.ts'
  Imported via "pkg1" from file 'src/project/e/ea/fileWithImports.ts'
  Imported via "pkg1" from file 'src/project/e/ea/eaa/fileWithImports.ts'
  Imported via "pkg1" from file 'src/project/e/ea/eaa/eaaa/fileWithImports.ts'
  Imported via "pkg1" from file 'src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts'
src/project/fileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/randomFileForImport.ts
  Part of 'files' list in tsconfig.json
src/project/a/fileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/b/ba/fileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/b/randomFileForImport.ts
  Part of 'files' list in tsconfig.json
src/project/c/ca/fileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/c/ca/caa/randomFileForImport.ts
  Part of 'files' list in tsconfig.json
src/project/c/ca/caa/caaa/fileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/c/cb/fileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts
  Part of 'files' list in tsconfig.json
src/project/d/da/daa/daaa/fileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/d/da/daa/fileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/d/da/fileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/e/ea/fileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/e/ea/eaa/fileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/e/ea/eaa/eaaa/fileWithImports.ts
  Part of 'files' list in tsconfig.json
src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts
  Part of 'files' list in tsconfig.json
exitCode:: ExitStatus.Success


//// [/src/project/a/fileWithImports.d.ts]
export {};


//// [/src/project/a/fileWithImports.js]
"use strict";
exports.__esModule = true;


//// [/src/project/b/ba/fileWithImports.d.ts]
export {};


//// [/src/project/b/ba/fileWithImports.js]
"use strict";
exports.__esModule = true;


//// [/src/project/b/randomFileForImport.d.ts]
export declare const x = 10;


//// [/src/project/b/randomFileForImport.js]
"use strict";
exports.__esModule = true;
exports.x = void 0;
exports.x = 10;


//// [/src/project/c/ca/caa/caaa/fileWithImports.d.ts]
export {};


//// [/src/project/c/ca/caa/caaa/fileWithImports.js]
"use strict";
exports.__esModule = true;


//// [/src/project/c/ca/caa/randomFileForImport.d.ts]
export declare const x = 10;


//// [/src/project/c/ca/caa/randomFileForImport.js]
"use strict";
exports.__esModule = true;
exports.x = void 0;
exports.x = 10;


//// [/src/project/c/ca/fileWithImports.d.ts]
export {};


//// [/src/project/c/ca/fileWithImports.js]
"use strict";
exports.__esModule = true;


//// [/src/project/c/cb/fileWithImports.d.ts]
export {};


//// [/src/project/c/cb/fileWithImports.js]
"use strict";
exports.__esModule = true;


//// [/src/project/d/da/daa/daaa/fileWithImports.d.ts]
export {};


//// [/src/project/d/da/daa/daaa/fileWithImports.js]
"use strict";
exports.__esModule = true;


//// [/src/project/d/da/daa/daaa/x/y/z/randomFileForImport.d.ts]
export declare const x = 10;


//// [/src/project/d/da/daa/daaa/x/y/z/randomFileForImport.js]
"use strict";
exports.__esModule = true;
exports.x = void 0;
exports.x = 10;


//// [/src/project/d/da/daa/fileWithImports.d.ts]
export {};


//// [/src/project/d/da/daa/fileWithImports.js]
"use strict";
exports.__esModule = true;


//// [/src/project/d/da/fileWithImports.d.ts]
export {};


//// [/src/project/d/da/fileWithImports.js]
"use strict";
exports.__esModule = true;


//// [/src/project/e/ea/eaa/eaaa/fileWithImports.d.ts]
export {};


//// [/src/project/e/ea/eaa/eaaa/fileWithImports.js]
"use strict";
exports.__esModule = true;


//// [/src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.d.ts]
export declare const x = 10;


//// [/src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.js]
"use strict";
exports.__esModule = true;
exports.x = void 0;
exports.x = 10;


//// [/src/project/e/ea/eaa/fileWithImports.d.ts]
export {};


//// [/src/project/e/ea/eaa/fileWithImports.js]
"use strict";
exports.__esModule = true;


//// [/src/project/e/ea/fileWithImports.d.ts]
export {};


//// [/src/project/e/ea/fileWithImports.js]
"use strict";
exports.__esModule = true;


//// [/src/project/fileWithImports.d.ts]
export {};


//// [/src/project/fileWithImports.js]
"use strict";
exports.__esModule = true;


//// [/src/project/randomFileForImport.d.ts]
export declare const x = 10;


//// [/src/project/randomFileForImport.js]
"use strict";
exports.__esModule = true;
exports.x = void 0;
exports.x = 10;


//// [/src/project/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../lib/lib.d.ts","./node_modules/pkg0/index.d.ts","./node_modules/pkg1/index.d.ts","./filewithimports.ts","./randomfileforimport.ts","./a/filewithimports.ts","./b/ba/filewithimports.ts","./b/randomfileforimport.ts","./c/ca/filewithimports.ts","./c/ca/caa/randomfileforimport.ts","./c/ca/caa/caaa/filewithimports.ts","./c/cb/filewithimports.ts","./d/da/daa/daaa/x/y/z/randomfileforimport.ts","./d/da/daa/daaa/filewithimports.ts","./d/da/daa/filewithimports.ts","./d/da/filewithimports.ts","./e/ea/filewithimports.ts","./e/ea/eaa/filewithimports.ts","./e/ea/eaa/eaaa/filewithimports.ts","./e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts","./a","./b/ba","./c/ca/caa/caaa","./c/cb","./d/da/daa/daaa/x/y/z","./e/ea/eaa/eaaa/x/y/z"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},"769951468-export interface ImportInterface0 {}","769987405-export interface ImportInterface1 {}",{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-4882119183-export {};\r\n"},{"version":"8470059553-import type { ImportInterface1 } from \"pkg1\";\nimport type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;","signature":"-6057683066-export declare const x = 10;\r\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-4882119183-export {};\r\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-4882119183-export {};\r\n"},{"version":"8470059553-import type { ImportInterface1 } from \"pkg1\";\nimport type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;","signature":"-6057683066-export declare const x = 10;\r\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-4882119183-export {};\r\n"},{"version":"8470059553-import type { ImportInterface1 } from \"pkg1\";\nimport type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;","signature":"-6057683066-export declare const x = 10;\r\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-4882119183-export {};\r\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-4882119183-export {};\r\n"},{"version":"8470059553-import type { ImportInterface1 } from \"pkg1\";\nimport type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;","signature":"-6057683066-export declare const x = 10;\r\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-4882119183-export {};\r\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-4882119183-export {};\r\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-4882119183-export {};\r\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-4882119183-export {};\r\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-4882119183-export {};\r\n"},{"version":"9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n","signature":"-4882119183-export {};\r\n"},{"version":"8470059553-import type { ImportInterface1 } from \"pkg1\";\nimport type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;","signature":"-6057683066-export declare const x = 10;\r\n"}],"options":{"cacheResolutions":true,"composite":true},"fileIdsList":[[2,3]],"referencedMap":[[6,1],[7,1],[8,1],[11,1],[10,1],[9,1],[12,1],[14,1],[13,1],[15,1],[16,1],[19,1],[20,1],[18,1],[17,1],[4,1],[5,1]],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,6,7,8,11,10,9,12,14,13,15,16,19,20,18,17,4,2,3,5],"latestChangedDtsFile":"./randomFileForImport.d.ts","cacheResolutions":{"resolutions":[{"resolvedModule":{"resolvedFileName":2,"isExternalLibraryImport":true}},{"resolvedModule":{"resolvedFileName":3,"isExternalLibraryImport":true}}],"names":["pkg0","pkg1"],"resolutionEntries":[[1,1],[2,2]],"modules":[[21,[1,2]],[22,[1,2]],[23,[1,2]],[24,[1,2]],[25,[2,1]],[26,[2,1]]]}},"version":"FakeTSVersion"}

//// [/src/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "./node_modules/pkg0/index.d.ts",
      "./node_modules/pkg1/index.d.ts",
      "./filewithimports.ts",
      "./randomfileforimport.ts",
      "./a/filewithimports.ts",
      "./b/ba/filewithimports.ts",
      "./b/randomfileforimport.ts",
      "./c/ca/filewithimports.ts",
      "./c/ca/caa/randomfileforimport.ts",
      "./c/ca/caa/caaa/filewithimports.ts",
      "./c/cb/filewithimports.ts",
      "./d/da/daa/daaa/x/y/z/randomfileforimport.ts",
      "./d/da/daa/daaa/filewithimports.ts",
      "./d/da/daa/filewithimports.ts",
      "./d/da/filewithimports.ts",
      "./e/ea/filewithimports.ts",
      "./e/ea/eaa/filewithimports.ts",
      "./e/ea/eaa/eaaa/filewithimports.ts",
      "./e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts",
      "./a",
      "./b/ba",
      "./c/ca/caa/caaa",
      "./c/cb",
      "./d/da/daa/daaa/x/y/z",
      "./e/ea/eaa/eaaa/x/y/z"
    ],
    "fileNamesList": [
      [
        "./node_modules/pkg0/index.d.ts",
        "./node_modules/pkg1/index.d.ts"
      ]
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./node_modules/pkg0/index.d.ts": {
        "version": "769951468-export interface ImportInterface0 {}",
        "signature": "769951468-export interface ImportInterface0 {}"
      },
      "./node_modules/pkg1/index.d.ts": {
        "version": "769987405-export interface ImportInterface1 {}",
        "signature": "769987405-export interface ImportInterface1 {}"
      },
      "./filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-4882119183-export {};\r\n"
      },
      "./randomfileforimport.ts": {
        "version": "8470059553-import type { ImportInterface1 } from \"pkg1\";\nimport type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;",
        "signature": "-6057683066-export declare const x = 10;\r\n"
      },
      "./a/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-4882119183-export {};\r\n"
      },
      "./b/ba/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-4882119183-export {};\r\n"
      },
      "./b/randomfileforimport.ts": {
        "version": "8470059553-import type { ImportInterface1 } from \"pkg1\";\nimport type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;",
        "signature": "-6057683066-export declare const x = 10;\r\n"
      },
      "./c/ca/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-4882119183-export {};\r\n"
      },
      "./c/ca/caa/randomfileforimport.ts": {
        "version": "8470059553-import type { ImportInterface1 } from \"pkg1\";\nimport type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;",
        "signature": "-6057683066-export declare const x = 10;\r\n"
      },
      "./c/ca/caa/caaa/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-4882119183-export {};\r\n"
      },
      "./c/cb/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-4882119183-export {};\r\n"
      },
      "./d/da/daa/daaa/x/y/z/randomfileforimport.ts": {
        "version": "8470059553-import type { ImportInterface1 } from \"pkg1\";\nimport type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;",
        "signature": "-6057683066-export declare const x = 10;\r\n"
      },
      "./d/da/daa/daaa/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-4882119183-export {};\r\n"
      },
      "./d/da/daa/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-4882119183-export {};\r\n"
      },
      "./d/da/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-4882119183-export {};\r\n"
      },
      "./e/ea/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-4882119183-export {};\r\n"
      },
      "./e/ea/eaa/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-4882119183-export {};\r\n"
      },
      "./e/ea/eaa/eaaa/filewithimports.ts": {
        "version": "9626982695-import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n",
        "signature": "-4882119183-export {};\r\n"
      },
      "./e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts": {
        "version": "8470059553-import type { ImportInterface1 } from \"pkg1\";\nimport type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;",
        "signature": "-6057683066-export declare const x = 10;\r\n"
      }
    },
    "options": {
      "cacheResolutions": true,
      "composite": true
    },
    "referencedMap": {
      "./a/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts",
        "./node_modules/pkg1/index.d.ts"
      ],
      "./b/ba/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts",
        "./node_modules/pkg1/index.d.ts"
      ],
      "./b/randomfileforimport.ts": [
        "./node_modules/pkg0/index.d.ts",
        "./node_modules/pkg1/index.d.ts"
      ],
      "./c/ca/caa/caaa/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts",
        "./node_modules/pkg1/index.d.ts"
      ],
      "./c/ca/caa/randomfileforimport.ts": [
        "./node_modules/pkg0/index.d.ts",
        "./node_modules/pkg1/index.d.ts"
      ],
      "./c/ca/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts",
        "./node_modules/pkg1/index.d.ts"
      ],
      "./c/cb/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts",
        "./node_modules/pkg1/index.d.ts"
      ],
      "./d/da/daa/daaa/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts",
        "./node_modules/pkg1/index.d.ts"
      ],
      "./d/da/daa/daaa/x/y/z/randomfileforimport.ts": [
        "./node_modules/pkg0/index.d.ts",
        "./node_modules/pkg1/index.d.ts"
      ],
      "./d/da/daa/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts",
        "./node_modules/pkg1/index.d.ts"
      ],
      "./d/da/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts",
        "./node_modules/pkg1/index.d.ts"
      ],
      "./e/ea/eaa/eaaa/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts",
        "./node_modules/pkg1/index.d.ts"
      ],
      "./e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts": [
        "./node_modules/pkg0/index.d.ts",
        "./node_modules/pkg1/index.d.ts"
      ],
      "./e/ea/eaa/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts",
        "./node_modules/pkg1/index.d.ts"
      ],
      "./e/ea/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts",
        "./node_modules/pkg1/index.d.ts"
      ],
      "./filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts",
        "./node_modules/pkg1/index.d.ts"
      ],
      "./randomfileforimport.ts": [
        "./node_modules/pkg0/index.d.ts",
        "./node_modules/pkg1/index.d.ts"
      ]
    },
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      "./a/filewithimports.ts",
      "./b/ba/filewithimports.ts",
      "./b/randomfileforimport.ts",
      "./c/ca/caa/caaa/filewithimports.ts",
      "./c/ca/caa/randomfileforimport.ts",
      "./c/ca/filewithimports.ts",
      "./c/cb/filewithimports.ts",
      "./d/da/daa/daaa/filewithimports.ts",
      "./d/da/daa/daaa/x/y/z/randomfileforimport.ts",
      "./d/da/daa/filewithimports.ts",
      "./d/da/filewithimports.ts",
      "./e/ea/eaa/eaaa/filewithimports.ts",
      "./e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts",
      "./e/ea/eaa/filewithimports.ts",
      "./e/ea/filewithimports.ts",
      "./filewithimports.ts",
      "./node_modules/pkg0/index.d.ts",
      "./node_modules/pkg1/index.d.ts",
      "./randomfileforimport.ts"
    ],
    "latestChangedDtsFile": "./randomFileForImport.d.ts",
    "cacheResolutions": {
      "resolutions": [
        {
          "id": 1,
          "resolvedModule": {
            "resolvedFileName": "./node_modules/pkg0/index.d.ts",
            "isExternalLibraryImport": true
          }
        },
        {
          "id": 2,
          "resolvedModule": {
            "resolvedFileName": "./node_modules/pkg1/index.d.ts",
            "isExternalLibraryImport": true
          }
        }
      ],
      "names": [
        "pkg0",
        "pkg1"
      ],
      "resolutionEntries": [
        [
          "pkg0",
          {
            "id": 1,
            "resolvedModule": {
              "resolvedFileName": "./node_modules/pkg0/index.d.ts",
              "isExternalLibraryImport": true
            }
          }
        ],
        [
          "pkg1",
          {
            "id": 2,
            "resolvedModule": {
              "resolvedFileName": "./node_modules/pkg1/index.d.ts",
              "isExternalLibraryImport": true
            }
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
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ],
            [
              "pkg1",
              {
                "id": 2,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg1/index.d.ts",
                  "isExternalLibraryImport": true
                }
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
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ],
            [
              "pkg1",
              {
                "id": 2,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg1/index.d.ts",
                  "isExternalLibraryImport": true
                }
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
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ],
            [
              "pkg1",
              {
                "id": 2,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg1/index.d.ts",
                  "isExternalLibraryImport": true
                }
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
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ],
            [
              "pkg1",
              {
                "id": 2,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg1/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ],
        [
          "./d/da/daa/daaa/x/y/z",
          [
            [
              "pkg1",
              {
                "id": 2,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg1/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ],
            [
              "pkg0",
              {
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ],
        [
          "./e/ea/eaa/eaaa/x/y/z",
          [
            [
              "pkg1",
              {
                "id": 2,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg1/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ],
            [
              "pkg0",
              {
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ]
      ]
    }
  },
  "version": "FakeTSVersion",
  "size": 5048
}

