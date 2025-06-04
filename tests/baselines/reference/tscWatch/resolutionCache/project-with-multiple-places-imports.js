currentDirectory:: /home/src/workspaces/project useCaseSensitiveFileNames:: false
Input::
//// [/home/src/workspaces/project/tsconfig.json]
{
  "compilerOptions": {
    "traceResolution": true
  },
  "files": [
    "main.ts",
    "fileWithImports.ts",
    "randomFileForImport.ts",
    "a/fileWithImports.ts",
    "b/ba/fileWithImports.ts",
    "b/randomFileForImport.ts",
    "c/ca/fileWithImports.ts",
    "c/ca/caa/randomFileForImport.ts",
    "c/ca/caa/caaa/fileWithImports.ts",
    "c/cb/fileWithImports.ts",
    "d/da/daa/daaa/x/y/z/randomFileForImport.ts",
    "d/da/daa/daaa/fileWithImports.ts",
    "d/da/daa/fileWithImports.ts",
    "d/da/fileWithImports.ts",
    "e/ea/fileWithImports.ts",
    "e/ea/eaa/fileWithImports.ts",
    "e/ea/eaa/eaaa/fileWithImports.ts",
    "e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts",
    "f/fa/faa/x/y/z/randomFileForImport.ts",
    "f/fa/faa/faaa/fileWithImports.ts"
  ]
}

//// [/home/src/workspaces/project/main.ts]
export const x = 10;

//// [/home/src/workspaces/project/fileWithImports.ts]
import type { ImportInterface0 } from "pkg0";
import type { ImportInterface1 } from "pkg1";


//// [/home/src/workspaces/project/randomFileForImport.ts]
export const x = 10;

//// [/home/src/workspaces/project/a/fileWithImports.ts]
import type { ImportInterface0 } from "pkg0";
import type { ImportInterface1 } from "pkg1";


//// [/home/src/workspaces/project/b/ba/fileWithImports.ts]
import type { ImportInterface0 } from "pkg0";
import type { ImportInterface1 } from "pkg1";


//// [/home/src/workspaces/project/b/randomFileForImport.ts]
export const x = 10;

//// [/home/src/workspaces/project/c/ca/fileWithImports.ts]
import type { ImportInterface0 } from "pkg0";
import type { ImportInterface1 } from "pkg1";


//// [/home/src/workspaces/project/c/ca/caa/randomFileForImport.ts]
export const x = 10;

//// [/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts]
import type { ImportInterface0 } from "pkg0";
import type { ImportInterface1 } from "pkg1";


//// [/home/src/workspaces/project/c/cb/fileWithImports.ts]
import type { ImportInterface0 } from "pkg0";
import type { ImportInterface1 } from "pkg1";


//// [/home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts]
export const x = 10;

//// [/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts]
import type { ImportInterface0 } from "pkg0";
import type { ImportInterface1 } from "pkg1";


//// [/home/src/workspaces/project/d/da/daa/fileWithImports.ts]
import type { ImportInterface0 } from "pkg0";
import type { ImportInterface1 } from "pkg1";


//// [/home/src/workspaces/project/d/da/fileWithImports.ts]
import type { ImportInterface0 } from "pkg0";
import type { ImportInterface1 } from "pkg1";


//// [/home/src/workspaces/project/e/ea/fileWithImports.ts]
import type { ImportInterface0 } from "pkg0";
import type { ImportInterface1 } from "pkg1";


//// [/home/src/workspaces/project/e/ea/eaa/fileWithImports.ts]
import type { ImportInterface0 } from "pkg0";
import type { ImportInterface1 } from "pkg1";


//// [/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts]
import type { ImportInterface0 } from "pkg0";
import type { ImportInterface1 } from "pkg1";


//// [/home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts]
export const x = 10;

//// [/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts]
import type { ImportInterface0 } from "pkg0";
import type { ImportInterface1 } from "pkg1";


//// [/home/src/workspaces/project/f/fa/faa/x/y/z/randomFileForImport.ts]
export const x = 10;

//// [/home/src/workspaces/project/node_modules/pkg0/index.d.ts]
export interface ImportInterface0 {}

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


/home/src/tslibs/TS/Lib/tsc.js -w -p /home/src/workspaces/project/tsconfig.json --explainFiles --extendedDiagnostics
Output::
[[90mHH:MM:SS AM[0m] Starting compilation in watch mode...

Current directory: /home/src/workspaces/project CaseSensitiveFileNames: false
FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/tsconfig.json 2000 undefined Config file
Synchronizing program
CreatingProgramWith::
  roots: ["/home/src/workspaces/project/main.ts","/home/src/workspaces/project/fileWithImports.ts","/home/src/workspaces/project/randomFileForImport.ts","/home/src/workspaces/project/a/fileWithImports.ts","/home/src/workspaces/project/b/ba/fileWithImports.ts","/home/src/workspaces/project/b/randomFileForImport.ts","/home/src/workspaces/project/c/ca/fileWithImports.ts","/home/src/workspaces/project/c/ca/caa/randomFileForImport.ts","/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts","/home/src/workspaces/project/c/cb/fileWithImports.ts","/home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts","/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts","/home/src/workspaces/project/d/da/daa/fileWithImports.ts","/home/src/workspaces/project/d/da/fileWithImports.ts","/home/src/workspaces/project/e/ea/fileWithImports.ts","/home/src/workspaces/project/e/ea/eaa/fileWithImports.ts","/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts","/home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts","/home/src/workspaces/project/f/fa/faa/x/y/z/randomFileForImport.ts","/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts"]
  options: {"traceResolution":true,"watch":true,"project":"/home/src/workspaces/project/tsconfig.json","explainFiles":true,"extendedDiagnostics":true,"configFilePath":"/home/src/workspaces/project/tsconfig.json"}
FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/main.ts 250 undefined Source file
FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/fileWithImports.ts 250 undefined Source file
======== Resolving module 'pkg0' from '/home/src/workspaces/project/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'Node10'.
Loading module 'pkg0' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
File '/home/src/workspaces/project/node_modules/pkg0/package.json' does not exist.
File '/home/src/workspaces/project/node_modules/pkg0.ts' does not exist.
File '/home/src/workspaces/project/node_modules/pkg0.tsx' does not exist.
File '/home/src/workspaces/project/node_modules/pkg0.d.ts' does not exist.
File '/home/src/workspaces/project/node_modules/pkg0/index.ts' does not exist.
File '/home/src/workspaces/project/node_modules/pkg0/index.tsx' does not exist.
File '/home/src/workspaces/project/node_modules/pkg0/index.d.ts' exists - use it as a name resolution result.
Resolving real path for '/home/src/workspaces/project/node_modules/pkg0/index.d.ts', result '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
======== Module name 'pkg0' was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'. ========
DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules 1 undefined Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules 1 undefined Failed Lookup Locations
======== Resolving module 'pkg1' from '/home/src/workspaces/project/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'Node10'.
Loading module 'pkg1' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
File '/home/src/workspaces/project/node_modules/pkg1.ts' does not exist.
File '/home/src/workspaces/project/node_modules/pkg1.tsx' does not exist.
File '/home/src/workspaces/project/node_modules/pkg1.d.ts' does not exist.
Directory '/home/src/workspaces/project/node_modules/@types' does not exist, skipping all lookups in it.
Directory '/home/src/workspaces/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/node_modules' does not exist, skipping all lookups in it.
Directory '/home/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
Loading module 'pkg1' from 'node_modules' folder, target file types: JavaScript.
Searching all ancestor node_modules directories for fallback extensions: JavaScript.
File '/home/src/workspaces/project/node_modules/pkg1.js' does not exist.
File '/home/src/workspaces/project/node_modules/pkg1.jsx' does not exist.
Directory '/home/src/workspaces/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/node_modules' does not exist, skipping all lookups in it.
Directory '/home/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
======== Module name 'pkg1' was not resolved. ========
DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/node_modules 1 undefined Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/node_modules 1 undefined Failed Lookup Locations
File '/home/src/workspaces/project/node_modules/pkg0/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/node_modules/package.json' does not exist.
File '/home/src/workspaces/project/package.json' does not exist.
File '/home/src/workspaces/package.json' does not exist.
File '/home/src/package.json' does not exist.
File '/home/package.json' does not exist.
File '/package.json' does not exist.
FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules/pkg0/index.d.ts 250 undefined Source file
FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/randomFileForImport.ts 250 undefined Source file
FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/a/fileWithImports.ts 250 undefined Source file
======== Resolving module 'pkg0' from '/home/src/workspaces/project/a/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'Node10'.
Loading module 'pkg0' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Directory '/home/src/workspaces/project/a/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg0' was found in cache from location '/home/src/workspaces/project'.
======== Module name 'pkg0' was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'. ========
DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/a 1 undefined Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/a 1 undefined Failed Lookup Locations
======== Resolving module 'pkg1' from '/home/src/workspaces/project/a/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'Node10'.
Loading module 'pkg1' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Directory '/home/src/workspaces/project/a/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/home/src/workspaces/project'.
======== Module name 'pkg1' was not resolved. ========
FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/b/ba/fileWithImports.ts 250 undefined Source file
======== Resolving module 'pkg0' from '/home/src/workspaces/project/b/ba/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'Node10'.
Loading module 'pkg0' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Directory '/home/src/workspaces/project/b/ba/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/workspaces/project/b/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg0' was found in cache from location '/home/src/workspaces/project'.
======== Module name 'pkg0' was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'. ========
DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/b 1 undefined Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/b 1 undefined Failed Lookup Locations
======== Resolving module 'pkg1' from '/home/src/workspaces/project/b/ba/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'Node10'.
Loading module 'pkg1' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Directory '/home/src/workspaces/project/b/ba/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/workspaces/project/b/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/home/src/workspaces/project'.
======== Module name 'pkg1' was not resolved. ========
FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/b/randomFileForImport.ts 250 undefined Source file
FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/c/ca/fileWithImports.ts 250 undefined Source file
======== Resolving module 'pkg0' from '/home/src/workspaces/project/c/ca/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'Node10'.
Loading module 'pkg0' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Directory '/home/src/workspaces/project/c/ca/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/workspaces/project/c/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg0' was found in cache from location '/home/src/workspaces/project'.
======== Module name 'pkg0' was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'. ========
DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/c 1 undefined Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/c 1 undefined Failed Lookup Locations
======== Resolving module 'pkg1' from '/home/src/workspaces/project/c/ca/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'Node10'.
Loading module 'pkg1' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Directory '/home/src/workspaces/project/c/ca/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/workspaces/project/c/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/home/src/workspaces/project'.
======== Module name 'pkg1' was not resolved. ========
FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/c/ca/caa/randomFileForImport.ts 250 undefined Source file
FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts 250 undefined Source file
======== Resolving module 'pkg0' from '/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'Node10'.
Loading module 'pkg0' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Directory '/home/src/workspaces/project/c/ca/caa/caaa/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/workspaces/project/c/ca/caa/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg0' was found in cache from location '/home/src/workspaces/project/c/ca'.
======== Module name 'pkg0' was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'. ========
======== Resolving module 'pkg1' from '/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'Node10'.
Loading module 'pkg1' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Directory '/home/src/workspaces/project/c/ca/caa/caaa/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/workspaces/project/c/ca/caa/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/home/src/workspaces/project/c/ca'.
======== Module name 'pkg1' was not resolved. ========
FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/c/cb/fileWithImports.ts 250 undefined Source file
======== Resolving module 'pkg0' from '/home/src/workspaces/project/c/cb/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'Node10'.
Loading module 'pkg0' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Directory '/home/src/workspaces/project/c/cb/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg0' was found in cache from location '/home/src/workspaces/project/c'.
======== Module name 'pkg0' was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'. ========
======== Resolving module 'pkg1' from '/home/src/workspaces/project/c/cb/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'Node10'.
Loading module 'pkg1' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Directory '/home/src/workspaces/project/c/cb/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/home/src/workspaces/project/c'.
======== Module name 'pkg1' was not resolved. ========
FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts 250 undefined Source file
FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts 250 undefined Source file
======== Resolving module 'pkg0' from '/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'Node10'.
Loading module 'pkg0' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Directory '/home/src/workspaces/project/d/da/daa/daaa/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/workspaces/project/d/da/daa/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/workspaces/project/d/da/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/workspaces/project/d/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg0' was found in cache from location '/home/src/workspaces/project'.
======== Module name 'pkg0' was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'. ========
DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/d 1 undefined Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/d 1 undefined Failed Lookup Locations
======== Resolving module 'pkg1' from '/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'Node10'.
Loading module 'pkg1' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Directory '/home/src/workspaces/project/d/da/daa/daaa/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/workspaces/project/d/da/daa/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/workspaces/project/d/da/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/workspaces/project/d/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/home/src/workspaces/project'.
======== Module name 'pkg1' was not resolved. ========
FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/d/da/daa/fileWithImports.ts 250 undefined Source file
======== Resolving module 'pkg0' from '/home/src/workspaces/project/d/da/daa/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'Node10'.
Loading module 'pkg0' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Resolution for module 'pkg0' was found in cache from location '/home/src/workspaces/project/d/da/daa'.
======== Module name 'pkg0' was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'. ========
======== Resolving module 'pkg1' from '/home/src/workspaces/project/d/da/daa/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'Node10'.
Loading module 'pkg1' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Resolution for module 'pkg1' was found in cache from location '/home/src/workspaces/project/d/da/daa'.
======== Module name 'pkg1' was not resolved. ========
FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/d/da/fileWithImports.ts 250 undefined Source file
======== Resolving module 'pkg0' from '/home/src/workspaces/project/d/da/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'Node10'.
Loading module 'pkg0' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Resolution for module 'pkg0' was found in cache from location '/home/src/workspaces/project/d/da'.
======== Module name 'pkg0' was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'. ========
======== Resolving module 'pkg1' from '/home/src/workspaces/project/d/da/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'Node10'.
Loading module 'pkg1' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Resolution for module 'pkg1' was found in cache from location '/home/src/workspaces/project/d/da'.
======== Module name 'pkg1' was not resolved. ========
FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/e/ea/fileWithImports.ts 250 undefined Source file
======== Resolving module 'pkg0' from '/home/src/workspaces/project/e/ea/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'Node10'.
Loading module 'pkg0' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Directory '/home/src/workspaces/project/e/ea/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/workspaces/project/e/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg0' was found in cache from location '/home/src/workspaces/project'.
======== Module name 'pkg0' was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'. ========
DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/e 1 undefined Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/e 1 undefined Failed Lookup Locations
======== Resolving module 'pkg1' from '/home/src/workspaces/project/e/ea/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'Node10'.
Loading module 'pkg1' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Directory '/home/src/workspaces/project/e/ea/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/workspaces/project/e/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/home/src/workspaces/project'.
======== Module name 'pkg1' was not resolved. ========
FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/e/ea/eaa/fileWithImports.ts 250 undefined Source file
======== Resolving module 'pkg0' from '/home/src/workspaces/project/e/ea/eaa/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'Node10'.
Loading module 'pkg0' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Directory '/home/src/workspaces/project/e/ea/eaa/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg0' was found in cache from location '/home/src/workspaces/project/e/ea'.
======== Module name 'pkg0' was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'. ========
======== Resolving module 'pkg1' from '/home/src/workspaces/project/e/ea/eaa/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'Node10'.
Loading module 'pkg1' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Directory '/home/src/workspaces/project/e/ea/eaa/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/home/src/workspaces/project/e/ea'.
======== Module name 'pkg1' was not resolved. ========
FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts 250 undefined Source file
======== Resolving module 'pkg0' from '/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'Node10'.
Loading module 'pkg0' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Directory '/home/src/workspaces/project/e/ea/eaa/eaaa/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg0' was found in cache from location '/home/src/workspaces/project/e/ea/eaa'.
======== Module name 'pkg0' was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'. ========
======== Resolving module 'pkg1' from '/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'Node10'.
Loading module 'pkg1' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Directory '/home/src/workspaces/project/e/ea/eaa/eaaa/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/home/src/workspaces/project/e/ea/eaa'.
======== Module name 'pkg1' was not resolved. ========
FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts 250 undefined Source file
FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/f/fa/faa/x/y/z/randomFileForImport.ts 250 undefined Source file
FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts 250 undefined Source file
======== Resolving module 'pkg0' from '/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'Node10'.
Loading module 'pkg0' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Directory '/home/src/workspaces/project/f/fa/faa/faaa/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/workspaces/project/f/fa/faa/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/workspaces/project/f/fa/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/workspaces/project/f/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg0' was found in cache from location '/home/src/workspaces/project'.
======== Module name 'pkg0' was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'. ========
DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/f 1 undefined Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/f 1 undefined Failed Lookup Locations
======== Resolving module 'pkg1' from '/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'Node10'.
Loading module 'pkg1' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Directory '/home/src/workspaces/project/f/fa/faa/faaa/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/workspaces/project/f/fa/faa/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/workspaces/project/f/fa/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/workspaces/project/f/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/home/src/workspaces/project'.
======== Module name 'pkg1' was not resolved. ========
FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.d.ts 250 undefined Source file
FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules/pkg0/package.json 2000 undefined File location affecting resolution
FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules/package.json 2000 undefined File location affecting resolution
FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/package.json 2000 undefined File location affecting resolution
FileWatcher:: Added:: WatchInfo: /home/src/workspaces/package.json 2000 undefined File location affecting resolution
DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules/@types 1 undefined Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules/@types 1 undefined Type roots
DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/node_modules/@types 1 undefined Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/node_modules/@types 1 undefined Type roots
DirectoryWatcher:: Triggered with /home/src/workspaces/project/a/fileWithImports.js :: WatchInfo: /home/src/workspaces/project/a 1 undefined Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/workspaces/project/a/fileWithImports.js :: WatchInfo: /home/src/workspaces/project/a 1 undefined Failed Lookup Locations
DirectoryWatcher:: Triggered with /home/src/workspaces/project/b/ba/fileWithImports.js :: WatchInfo: /home/src/workspaces/project/b 1 undefined Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/workspaces/project/b/ba/fileWithImports.js :: WatchInfo: /home/src/workspaces/project/b 1 undefined Failed Lookup Locations
DirectoryWatcher:: Triggered with /home/src/workspaces/project/b/randomFileForImport.js :: WatchInfo: /home/src/workspaces/project/b 1 undefined Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/workspaces/project/b/randomFileForImport.js :: WatchInfo: /home/src/workspaces/project/b 1 undefined Failed Lookup Locations
DirectoryWatcher:: Triggered with /home/src/workspaces/project/c/ca/fileWithImports.js :: WatchInfo: /home/src/workspaces/project/c 1 undefined Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/workspaces/project/c/ca/fileWithImports.js :: WatchInfo: /home/src/workspaces/project/c 1 undefined Failed Lookup Locations
DirectoryWatcher:: Triggered with /home/src/workspaces/project/c/ca/caa/randomFileForImport.js :: WatchInfo: /home/src/workspaces/project/c 1 undefined Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/workspaces/project/c/ca/caa/randomFileForImport.js :: WatchInfo: /home/src/workspaces/project/c 1 undefined Failed Lookup Locations
DirectoryWatcher:: Triggered with /home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.js :: WatchInfo: /home/src/workspaces/project/c 1 undefined Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.js :: WatchInfo: /home/src/workspaces/project/c 1 undefined Failed Lookup Locations
DirectoryWatcher:: Triggered with /home/src/workspaces/project/c/cb/fileWithImports.js :: WatchInfo: /home/src/workspaces/project/c 1 undefined Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/workspaces/project/c/cb/fileWithImports.js :: WatchInfo: /home/src/workspaces/project/c 1 undefined Failed Lookup Locations
DirectoryWatcher:: Triggered with /home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.js :: WatchInfo: /home/src/workspaces/project/d 1 undefined Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.js :: WatchInfo: /home/src/workspaces/project/d 1 undefined Failed Lookup Locations
DirectoryWatcher:: Triggered with /home/src/workspaces/project/d/da/daa/daaa/fileWithImports.js :: WatchInfo: /home/src/workspaces/project/d 1 undefined Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/workspaces/project/d/da/daa/daaa/fileWithImports.js :: WatchInfo: /home/src/workspaces/project/d 1 undefined Failed Lookup Locations
DirectoryWatcher:: Triggered with /home/src/workspaces/project/d/da/daa/fileWithImports.js :: WatchInfo: /home/src/workspaces/project/d 1 undefined Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/workspaces/project/d/da/daa/fileWithImports.js :: WatchInfo: /home/src/workspaces/project/d 1 undefined Failed Lookup Locations
DirectoryWatcher:: Triggered with /home/src/workspaces/project/d/da/fileWithImports.js :: WatchInfo: /home/src/workspaces/project/d 1 undefined Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/workspaces/project/d/da/fileWithImports.js :: WatchInfo: /home/src/workspaces/project/d 1 undefined Failed Lookup Locations
DirectoryWatcher:: Triggered with /home/src/workspaces/project/e/ea/fileWithImports.js :: WatchInfo: /home/src/workspaces/project/e 1 undefined Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/workspaces/project/e/ea/fileWithImports.js :: WatchInfo: /home/src/workspaces/project/e 1 undefined Failed Lookup Locations
DirectoryWatcher:: Triggered with /home/src/workspaces/project/e/ea/eaa/fileWithImports.js :: WatchInfo: /home/src/workspaces/project/e 1 undefined Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/workspaces/project/e/ea/eaa/fileWithImports.js :: WatchInfo: /home/src/workspaces/project/e 1 undefined Failed Lookup Locations
DirectoryWatcher:: Triggered with /home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.js :: WatchInfo: /home/src/workspaces/project/e 1 undefined Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.js :: WatchInfo: /home/src/workspaces/project/e 1 undefined Failed Lookup Locations
DirectoryWatcher:: Triggered with /home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.js :: WatchInfo: /home/src/workspaces/project/e 1 undefined Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.js :: WatchInfo: /home/src/workspaces/project/e 1 undefined Failed Lookup Locations
DirectoryWatcher:: Triggered with /home/src/workspaces/project/f/fa/faa/x/y/z/randomFileForImport.js :: WatchInfo: /home/src/workspaces/project/f 1 undefined Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/workspaces/project/f/fa/faa/x/y/z/randomFileForImport.js :: WatchInfo: /home/src/workspaces/project/f 1 undefined Failed Lookup Locations
DirectoryWatcher:: Triggered with /home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.js :: WatchInfo: /home/src/workspaces/project/f 1 undefined Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.js :: WatchInfo: /home/src/workspaces/project/f 1 undefined Failed Lookup Locations
[96ma/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mb/ba/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mc/ca/caa/caaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mc/ca/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mc/cb/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96md/da/daa/daaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96md/da/daa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96md/da/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96me/ea/eaa/eaaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96me/ea/eaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96me/ea/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mf/fa/faa/faaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mfileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

../../tslibs/TS/Lib/lib.d.ts
  Default library for target 'es5'
main.ts
  Part of 'files' list in tsconfig.json
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
  Imported via "pkg0" from file 'f/fa/faa/faaa/fileWithImports.ts'
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
d/da/daa/daaa/x/y/z/randomFileForImport.ts
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
e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts
  Part of 'files' list in tsconfig.json
f/fa/faa/x/y/z/randomFileForImport.ts
  Part of 'files' list in tsconfig.json
f/fa/faa/faaa/fileWithImports.ts
  Part of 'files' list in tsconfig.json
[[90mHH:MM:SS AM[0m] Found 13 errors. Watching for file changes.



//// [/home/src/workspaces/project/main.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = 10;


//// [/home/src/workspaces/project/fileWithImports.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });


//// [/home/src/workspaces/project/randomFileForImport.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = 10;


//// [/home/src/workspaces/project/a/fileWithImports.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });


//// [/home/src/workspaces/project/b/ba/fileWithImports.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });


//// [/home/src/workspaces/project/b/randomFileForImport.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = 10;


//// [/home/src/workspaces/project/c/ca/fileWithImports.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });


//// [/home/src/workspaces/project/c/ca/caa/randomFileForImport.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = 10;


//// [/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });


//// [/home/src/workspaces/project/c/cb/fileWithImports.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });


//// [/home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = 10;


//// [/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });


//// [/home/src/workspaces/project/d/da/daa/fileWithImports.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });


//// [/home/src/workspaces/project/d/da/fileWithImports.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });


//// [/home/src/workspaces/project/e/ea/fileWithImports.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });


//// [/home/src/workspaces/project/e/ea/eaa/fileWithImports.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });


//// [/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });


//// [/home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = 10;


//// [/home/src/workspaces/project/f/fa/faa/x/y/z/randomFileForImport.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = 10;


//// [/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });



PolledWatches::
/home/src/workspaces/node_modules: *new*
  {"pollingInterval":500}
/home/src/workspaces/node_modules/@types: *new*
  {"pollingInterval":500}
/home/src/workspaces/package.json: *new*
  {"pollingInterval":2000}
/home/src/workspaces/project/node_modules/@types: *new*
  {"pollingInterval":500}
/home/src/workspaces/project/node_modules/package.json: *new*
  {"pollingInterval":2000}
/home/src/workspaces/project/node_modules/pkg0/package.json: *new*
  {"pollingInterval":2000}
/home/src/workspaces/project/package.json: *new*
  {"pollingInterval":2000}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts: *new*
  {}
/home/src/workspaces/project/a/fileWithImports.ts: *new*
  {}
/home/src/workspaces/project/b/ba/fileWithImports.ts: *new*
  {}
/home/src/workspaces/project/b/randomFileForImport.ts: *new*
  {}
/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts: *new*
  {}
/home/src/workspaces/project/c/ca/caa/randomFileForImport.ts: *new*
  {}
/home/src/workspaces/project/c/ca/fileWithImports.ts: *new*
  {}
/home/src/workspaces/project/c/cb/fileWithImports.ts: *new*
  {}
/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts: *new*
  {}
/home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts: *new*
  {}
/home/src/workspaces/project/d/da/daa/fileWithImports.ts: *new*
  {}
/home/src/workspaces/project/d/da/fileWithImports.ts: *new*
  {}
/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts: *new*
  {}
/home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts: *new*
  {}
/home/src/workspaces/project/e/ea/eaa/fileWithImports.ts: *new*
  {}
/home/src/workspaces/project/e/ea/fileWithImports.ts: *new*
  {}
/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts: *new*
  {}
/home/src/workspaces/project/f/fa/faa/x/y/z/randomFileForImport.ts: *new*
  {}
/home/src/workspaces/project/fileWithImports.ts: *new*
  {}
/home/src/workspaces/project/main.ts: *new*
  {}
/home/src/workspaces/project/node_modules/pkg0/index.d.ts: *new*
  {}
/home/src/workspaces/project/randomFileForImport.ts: *new*
  {}
/home/src/workspaces/project/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/home/src/workspaces/project/a: *new*
  {}
/home/src/workspaces/project/b: *new*
  {}
/home/src/workspaces/project/c: *new*
  {}
/home/src/workspaces/project/d: *new*
  {}
/home/src/workspaces/project/e: *new*
  {}
/home/src/workspaces/project/f: *new*
  {}
/home/src/workspaces/project/node_modules: *new*
  {}

Program root files: [
  "/home/src/workspaces/project/main.ts",
  "/home/src/workspaces/project/fileWithImports.ts",
  "/home/src/workspaces/project/randomFileForImport.ts",
  "/home/src/workspaces/project/a/fileWithImports.ts",
  "/home/src/workspaces/project/b/ba/fileWithImports.ts",
  "/home/src/workspaces/project/b/randomFileForImport.ts",
  "/home/src/workspaces/project/c/ca/fileWithImports.ts",
  "/home/src/workspaces/project/c/ca/caa/randomFileForImport.ts",
  "/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts",
  "/home/src/workspaces/project/c/cb/fileWithImports.ts",
  "/home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts",
  "/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts",
  "/home/src/workspaces/project/d/da/daa/fileWithImports.ts",
  "/home/src/workspaces/project/d/da/fileWithImports.ts",
  "/home/src/workspaces/project/e/ea/fileWithImports.ts",
  "/home/src/workspaces/project/e/ea/eaa/fileWithImports.ts",
  "/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts",
  "/home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts",
  "/home/src/workspaces/project/f/fa/faa/x/y/z/randomFileForImport.ts",
  "/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts"
]
Program options: {
  "traceResolution": true,
  "watch": true,
  "project": "/home/src/workspaces/project/tsconfig.json",
  "explainFiles": true,
  "extendedDiagnostics": true,
  "configFilePath": "/home/src/workspaces/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/project/main.ts
/home/src/workspaces/project/node_modules/pkg0/index.d.ts
/home/src/workspaces/project/fileWithImports.ts
/home/src/workspaces/project/randomFileForImport.ts
/home/src/workspaces/project/a/fileWithImports.ts
/home/src/workspaces/project/b/ba/fileWithImports.ts
/home/src/workspaces/project/b/randomFileForImport.ts
/home/src/workspaces/project/c/ca/fileWithImports.ts
/home/src/workspaces/project/c/ca/caa/randomFileForImport.ts
/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts
/home/src/workspaces/project/c/cb/fileWithImports.ts
/home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts
/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts
/home/src/workspaces/project/d/da/daa/fileWithImports.ts
/home/src/workspaces/project/d/da/fileWithImports.ts
/home/src/workspaces/project/e/ea/fileWithImports.ts
/home/src/workspaces/project/e/ea/eaa/fileWithImports.ts
/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts
/home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts
/home/src/workspaces/project/f/fa/faa/x/y/z/randomFileForImport.ts
/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/project/main.ts
/home/src/workspaces/project/node_modules/pkg0/index.d.ts
/home/src/workspaces/project/fileWithImports.ts
/home/src/workspaces/project/randomFileForImport.ts
/home/src/workspaces/project/a/fileWithImports.ts
/home/src/workspaces/project/b/ba/fileWithImports.ts
/home/src/workspaces/project/b/randomFileForImport.ts
/home/src/workspaces/project/c/ca/fileWithImports.ts
/home/src/workspaces/project/c/ca/caa/randomFileForImport.ts
/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts
/home/src/workspaces/project/c/cb/fileWithImports.ts
/home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts
/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts
/home/src/workspaces/project/d/da/daa/fileWithImports.ts
/home/src/workspaces/project/d/da/fileWithImports.ts
/home/src/workspaces/project/e/ea/fileWithImports.ts
/home/src/workspaces/project/e/ea/eaa/fileWithImports.ts
/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts
/home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts
/home/src/workspaces/project/f/fa/faa/x/y/z/randomFileForImport.ts
/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/home/src/workspaces/project/main.ts (used version)
/home/src/workspaces/project/node_modules/pkg0/index.d.ts (used version)
/home/src/workspaces/project/filewithimports.ts (used version)
/home/src/workspaces/project/randomfileforimport.ts (used version)
/home/src/workspaces/project/a/filewithimports.ts (used version)
/home/src/workspaces/project/b/ba/filewithimports.ts (used version)
/home/src/workspaces/project/b/randomfileforimport.ts (used version)
/home/src/workspaces/project/c/ca/filewithimports.ts (used version)
/home/src/workspaces/project/c/ca/caa/randomfileforimport.ts (used version)
/home/src/workspaces/project/c/ca/caa/caaa/filewithimports.ts (used version)
/home/src/workspaces/project/c/cb/filewithimports.ts (used version)
/home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomfileforimport.ts (used version)
/home/src/workspaces/project/d/da/daa/daaa/filewithimports.ts (used version)
/home/src/workspaces/project/d/da/daa/filewithimports.ts (used version)
/home/src/workspaces/project/d/da/filewithimports.ts (used version)
/home/src/workspaces/project/e/ea/filewithimports.ts (used version)
/home/src/workspaces/project/e/ea/eaa/filewithimports.ts (used version)
/home/src/workspaces/project/e/ea/eaa/eaaa/filewithimports.ts (used version)
/home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts (used version)
/home/src/workspaces/project/f/fa/faa/x/y/z/randomfileforimport.ts (used version)
/home/src/workspaces/project/f/fa/faa/faaa/filewithimports.ts (used version)

exitCode:: ExitStatus.undefined

Change:: modify randomFileForImport by adding import

Input::
//// [/home/src/workspaces/project/randomFileForImport.ts]
import type { ImportInterface0 } from "pkg0";
export const x = 10;


Output::
FileWatcher:: Triggered with /home/src/workspaces/project/randomFileForImport.ts 1:: WatchInfo: /home/src/workspaces/project/randomFileForImport.ts 250 undefined Source file
Scheduling update
Elapsed:: *ms FileWatcher:: Triggered with /home/src/workspaces/project/randomFileForImport.ts 1:: WatchInfo: /home/src/workspaces/project/randomFileForImport.ts 250 undefined Source file


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
  roots: ["/home/src/workspaces/project/main.ts","/home/src/workspaces/project/fileWithImports.ts","/home/src/workspaces/project/randomFileForImport.ts","/home/src/workspaces/project/a/fileWithImports.ts","/home/src/workspaces/project/b/ba/fileWithImports.ts","/home/src/workspaces/project/b/randomFileForImport.ts","/home/src/workspaces/project/c/ca/fileWithImports.ts","/home/src/workspaces/project/c/ca/caa/randomFileForImport.ts","/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts","/home/src/workspaces/project/c/cb/fileWithImports.ts","/home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts","/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts","/home/src/workspaces/project/d/da/daa/fileWithImports.ts","/home/src/workspaces/project/d/da/fileWithImports.ts","/home/src/workspaces/project/e/ea/fileWithImports.ts","/home/src/workspaces/project/e/ea/eaa/fileWithImports.ts","/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts","/home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts","/home/src/workspaces/project/f/fa/faa/x/y/z/randomFileForImport.ts","/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts"]
  options: {"traceResolution":true,"watch":true,"project":"/home/src/workspaces/project/tsconfig.json","explainFiles":true,"extendedDiagnostics":true,"configFilePath":"/home/src/workspaces/project/tsconfig.json"}
File '/home/src/workspaces/project/node_modules/pkg0/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/node_modules/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/fileWithImports.ts' of old program, it was not resolved.
File '/home/src/workspaces/project/node_modules/pkg0/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/node_modules/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
======== Resolving module 'pkg0' from '/home/src/workspaces/project/randomFileForImport.ts'. ========
Resolution for module 'pkg0' was found in cache from location '/home/src/workspaces/project'.
======== Module name 'pkg0' was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'. ========
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/a/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/a/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/b/ba/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/b/ba/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/c/ca/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/c/ca/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/c/cb/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/c/cb/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/d/da/daa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/d/da/daa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/d/da/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/d/da/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/e/ea/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/e/ea/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/e/ea/eaa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/e/ea/eaa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts' of old program, it was not resolved.
[96ma/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mb/ba/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mc/ca/caa/caaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mc/ca/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mc/cb/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96md/da/daa/daaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96md/da/daa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96md/da/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96me/ea/eaa/eaaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96me/ea/eaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96me/ea/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mf/fa/faa/faaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mfileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

../../tslibs/TS/Lib/lib.d.ts
  Default library for target 'es5'
main.ts
  Part of 'files' list in tsconfig.json
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
  Imported via "pkg0" from file 'f/fa/faa/faaa/fileWithImports.ts'
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
d/da/daa/daaa/x/y/z/randomFileForImport.ts
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
e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts
  Part of 'files' list in tsconfig.json
f/fa/faa/x/y/z/randomFileForImport.ts
  Part of 'files' list in tsconfig.json
f/fa/faa/faaa/fileWithImports.ts
  Part of 'files' list in tsconfig.json
[[90mHH:MM:SS AM[0m] Found 13 errors. Watching for file changes.



//// [/home/src/workspaces/project/randomFileForImport.js] file written with same contents


Program root files: [
  "/home/src/workspaces/project/main.ts",
  "/home/src/workspaces/project/fileWithImports.ts",
  "/home/src/workspaces/project/randomFileForImport.ts",
  "/home/src/workspaces/project/a/fileWithImports.ts",
  "/home/src/workspaces/project/b/ba/fileWithImports.ts",
  "/home/src/workspaces/project/b/randomFileForImport.ts",
  "/home/src/workspaces/project/c/ca/fileWithImports.ts",
  "/home/src/workspaces/project/c/ca/caa/randomFileForImport.ts",
  "/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts",
  "/home/src/workspaces/project/c/cb/fileWithImports.ts",
  "/home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts",
  "/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts",
  "/home/src/workspaces/project/d/da/daa/fileWithImports.ts",
  "/home/src/workspaces/project/d/da/fileWithImports.ts",
  "/home/src/workspaces/project/e/ea/fileWithImports.ts",
  "/home/src/workspaces/project/e/ea/eaa/fileWithImports.ts",
  "/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts",
  "/home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts",
  "/home/src/workspaces/project/f/fa/faa/x/y/z/randomFileForImport.ts",
  "/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts"
]
Program options: {
  "traceResolution": true,
  "watch": true,
  "project": "/home/src/workspaces/project/tsconfig.json",
  "explainFiles": true,
  "extendedDiagnostics": true,
  "configFilePath": "/home/src/workspaces/project/tsconfig.json"
}
Program structureReused: SafeModules
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/project/main.ts
/home/src/workspaces/project/node_modules/pkg0/index.d.ts
/home/src/workspaces/project/fileWithImports.ts
/home/src/workspaces/project/randomFileForImport.ts
/home/src/workspaces/project/a/fileWithImports.ts
/home/src/workspaces/project/b/ba/fileWithImports.ts
/home/src/workspaces/project/b/randomFileForImport.ts
/home/src/workspaces/project/c/ca/fileWithImports.ts
/home/src/workspaces/project/c/ca/caa/randomFileForImport.ts
/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts
/home/src/workspaces/project/c/cb/fileWithImports.ts
/home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts
/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts
/home/src/workspaces/project/d/da/daa/fileWithImports.ts
/home/src/workspaces/project/d/da/fileWithImports.ts
/home/src/workspaces/project/e/ea/fileWithImports.ts
/home/src/workspaces/project/e/ea/eaa/fileWithImports.ts
/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts
/home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts
/home/src/workspaces/project/f/fa/faa/x/y/z/randomFileForImport.ts
/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts

Semantic diagnostics in builder refreshed for::
/home/src/workspaces/project/randomFileForImport.ts

Shape signatures in builder refreshed for::
/home/src/workspaces/project/randomfileforimport.ts (computed .d.ts)

exitCode:: ExitStatus.undefined

Change:: modify b/randomFileForImport by adding import

Input::
//// [/home/src/workspaces/project/b/randomFileForImport.ts]
import type { ImportInterface0 } from "pkg0";
export const x = 10;


Output::
FileWatcher:: Triggered with /home/src/workspaces/project/b/randomFileForImport.ts 1:: WatchInfo: /home/src/workspaces/project/b/randomFileForImport.ts 250 undefined Source file
Scheduling update
Elapsed:: *ms FileWatcher:: Triggered with /home/src/workspaces/project/b/randomFileForImport.ts 1:: WatchInfo: /home/src/workspaces/project/b/randomFileForImport.ts 250 undefined Source file


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
  roots: ["/home/src/workspaces/project/main.ts","/home/src/workspaces/project/fileWithImports.ts","/home/src/workspaces/project/randomFileForImport.ts","/home/src/workspaces/project/a/fileWithImports.ts","/home/src/workspaces/project/b/ba/fileWithImports.ts","/home/src/workspaces/project/b/randomFileForImport.ts","/home/src/workspaces/project/c/ca/fileWithImports.ts","/home/src/workspaces/project/c/ca/caa/randomFileForImport.ts","/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts","/home/src/workspaces/project/c/cb/fileWithImports.ts","/home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts","/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts","/home/src/workspaces/project/d/da/daa/fileWithImports.ts","/home/src/workspaces/project/d/da/fileWithImports.ts","/home/src/workspaces/project/e/ea/fileWithImports.ts","/home/src/workspaces/project/e/ea/eaa/fileWithImports.ts","/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts","/home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts","/home/src/workspaces/project/f/fa/faa/x/y/z/randomFileForImport.ts","/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts"]
  options: {"traceResolution":true,"watch":true,"project":"/home/src/workspaces/project/tsconfig.json","explainFiles":true,"extendedDiagnostics":true,"configFilePath":"/home/src/workspaces/project/tsconfig.json"}
File '/home/src/workspaces/project/node_modules/pkg0/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/node_modules/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/fileWithImports.ts' of old program, it was not resolved.
File '/home/src/workspaces/project/node_modules/pkg0/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/node_modules/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/randomFileForImport.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/a/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/a/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/b/ba/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/b/ba/fileWithImports.ts' of old program, it was not resolved.
======== Resolving module 'pkg0' from '/home/src/workspaces/project/b/randomFileForImport.ts'. ========
Module resolution kind is not specified, using 'Node10'.
Loading module 'pkg0' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Resolution for module 'pkg0' was found in cache from location '/home/src/workspaces/project/b'.
======== Module name 'pkg0' was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'. ========
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/c/ca/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/c/ca/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/c/cb/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/c/cb/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/d/da/daa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/d/da/daa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/d/da/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/d/da/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/e/ea/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/e/ea/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/e/ea/eaa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/e/ea/eaa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts' of old program, it was not resolved.
[96ma/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mb/ba/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mc/ca/caa/caaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mc/ca/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mc/cb/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96md/da/daa/daaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96md/da/daa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96md/da/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96me/ea/eaa/eaaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96me/ea/eaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96me/ea/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mf/fa/faa/faaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mfileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

../../tslibs/TS/Lib/lib.d.ts
  Default library for target 'es5'
main.ts
  Part of 'files' list in tsconfig.json
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
  Imported via "pkg0" from file 'f/fa/faa/faaa/fileWithImports.ts'
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
d/da/daa/daaa/x/y/z/randomFileForImport.ts
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
e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts
  Part of 'files' list in tsconfig.json
f/fa/faa/x/y/z/randomFileForImport.ts
  Part of 'files' list in tsconfig.json
f/fa/faa/faaa/fileWithImports.ts
  Part of 'files' list in tsconfig.json
[[90mHH:MM:SS AM[0m] Found 13 errors. Watching for file changes.



//// [/home/src/workspaces/project/b/randomFileForImport.js] file written with same contents


Program root files: [
  "/home/src/workspaces/project/main.ts",
  "/home/src/workspaces/project/fileWithImports.ts",
  "/home/src/workspaces/project/randomFileForImport.ts",
  "/home/src/workspaces/project/a/fileWithImports.ts",
  "/home/src/workspaces/project/b/ba/fileWithImports.ts",
  "/home/src/workspaces/project/b/randomFileForImport.ts",
  "/home/src/workspaces/project/c/ca/fileWithImports.ts",
  "/home/src/workspaces/project/c/ca/caa/randomFileForImport.ts",
  "/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts",
  "/home/src/workspaces/project/c/cb/fileWithImports.ts",
  "/home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts",
  "/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts",
  "/home/src/workspaces/project/d/da/daa/fileWithImports.ts",
  "/home/src/workspaces/project/d/da/fileWithImports.ts",
  "/home/src/workspaces/project/e/ea/fileWithImports.ts",
  "/home/src/workspaces/project/e/ea/eaa/fileWithImports.ts",
  "/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts",
  "/home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts",
  "/home/src/workspaces/project/f/fa/faa/x/y/z/randomFileForImport.ts",
  "/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts"
]
Program options: {
  "traceResolution": true,
  "watch": true,
  "project": "/home/src/workspaces/project/tsconfig.json",
  "explainFiles": true,
  "extendedDiagnostics": true,
  "configFilePath": "/home/src/workspaces/project/tsconfig.json"
}
Program structureReused: SafeModules
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/project/main.ts
/home/src/workspaces/project/node_modules/pkg0/index.d.ts
/home/src/workspaces/project/fileWithImports.ts
/home/src/workspaces/project/randomFileForImport.ts
/home/src/workspaces/project/a/fileWithImports.ts
/home/src/workspaces/project/b/ba/fileWithImports.ts
/home/src/workspaces/project/b/randomFileForImport.ts
/home/src/workspaces/project/c/ca/fileWithImports.ts
/home/src/workspaces/project/c/ca/caa/randomFileForImport.ts
/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts
/home/src/workspaces/project/c/cb/fileWithImports.ts
/home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts
/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts
/home/src/workspaces/project/d/da/daa/fileWithImports.ts
/home/src/workspaces/project/d/da/fileWithImports.ts
/home/src/workspaces/project/e/ea/fileWithImports.ts
/home/src/workspaces/project/e/ea/eaa/fileWithImports.ts
/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts
/home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts
/home/src/workspaces/project/f/fa/faa/x/y/z/randomFileForImport.ts
/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts

Semantic diagnostics in builder refreshed for::
/home/src/workspaces/project/b/randomFileForImport.ts

Shape signatures in builder refreshed for::
/home/src/workspaces/project/b/randomfileforimport.ts (computed .d.ts)

exitCode:: ExitStatus.undefined

Change:: modify c/ca/caa/randomFileForImport by adding import

Input::
//// [/home/src/workspaces/project/c/ca/caa/randomFileForImport.ts]
import type { ImportInterface0 } from "pkg0";
export const x = 10;


Output::
FileWatcher:: Triggered with /home/src/workspaces/project/c/ca/caa/randomFileForImport.ts 1:: WatchInfo: /home/src/workspaces/project/c/ca/caa/randomFileForImport.ts 250 undefined Source file
Scheduling update
Elapsed:: *ms FileWatcher:: Triggered with /home/src/workspaces/project/c/ca/caa/randomFileForImport.ts 1:: WatchInfo: /home/src/workspaces/project/c/ca/caa/randomFileForImport.ts 250 undefined Source file


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
  roots: ["/home/src/workspaces/project/main.ts","/home/src/workspaces/project/fileWithImports.ts","/home/src/workspaces/project/randomFileForImport.ts","/home/src/workspaces/project/a/fileWithImports.ts","/home/src/workspaces/project/b/ba/fileWithImports.ts","/home/src/workspaces/project/b/randomFileForImport.ts","/home/src/workspaces/project/c/ca/fileWithImports.ts","/home/src/workspaces/project/c/ca/caa/randomFileForImport.ts","/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts","/home/src/workspaces/project/c/cb/fileWithImports.ts","/home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts","/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts","/home/src/workspaces/project/d/da/daa/fileWithImports.ts","/home/src/workspaces/project/d/da/fileWithImports.ts","/home/src/workspaces/project/e/ea/fileWithImports.ts","/home/src/workspaces/project/e/ea/eaa/fileWithImports.ts","/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts","/home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts","/home/src/workspaces/project/f/fa/faa/x/y/z/randomFileForImport.ts","/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts"]
  options: {"traceResolution":true,"watch":true,"project":"/home/src/workspaces/project/tsconfig.json","explainFiles":true,"extendedDiagnostics":true,"configFilePath":"/home/src/workspaces/project/tsconfig.json"}
File '/home/src/workspaces/project/node_modules/pkg0/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/node_modules/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/fileWithImports.ts' of old program, it was not resolved.
File '/home/src/workspaces/project/node_modules/pkg0/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/node_modules/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/randomFileForImport.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/a/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/a/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/b/ba/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/b/ba/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/b/randomFileForImport.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/c/ca/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/c/ca/fileWithImports.ts' of old program, it was not resolved.
======== Resolving module 'pkg0' from '/home/src/workspaces/project/c/ca/caa/randomFileForImport.ts'. ========
Module resolution kind is not specified, using 'Node10'.
Loading module 'pkg0' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Resolution for module 'pkg0' was found in cache from location '/home/src/workspaces/project/c/ca/caa'.
======== Module name 'pkg0' was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'. ========
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/c/cb/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/c/cb/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/d/da/daa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/d/da/daa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/d/da/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/d/da/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/e/ea/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/e/ea/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/e/ea/eaa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/e/ea/eaa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts' of old program, it was not resolved.
[96ma/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mb/ba/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mc/ca/caa/caaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mc/ca/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mc/cb/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96md/da/daa/daaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96md/da/daa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96md/da/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96me/ea/eaa/eaaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96me/ea/eaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96me/ea/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mf/fa/faa/faaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mfileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

../../tslibs/TS/Lib/lib.d.ts
  Default library for target 'es5'
main.ts
  Part of 'files' list in tsconfig.json
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
  Imported via "pkg0" from file 'f/fa/faa/faaa/fileWithImports.ts'
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
d/da/daa/daaa/x/y/z/randomFileForImport.ts
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
e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts
  Part of 'files' list in tsconfig.json
f/fa/faa/x/y/z/randomFileForImport.ts
  Part of 'files' list in tsconfig.json
f/fa/faa/faaa/fileWithImports.ts
  Part of 'files' list in tsconfig.json
[[90mHH:MM:SS AM[0m] Found 13 errors. Watching for file changes.



//// [/home/src/workspaces/project/c/ca/caa/randomFileForImport.js] file written with same contents


Program root files: [
  "/home/src/workspaces/project/main.ts",
  "/home/src/workspaces/project/fileWithImports.ts",
  "/home/src/workspaces/project/randomFileForImport.ts",
  "/home/src/workspaces/project/a/fileWithImports.ts",
  "/home/src/workspaces/project/b/ba/fileWithImports.ts",
  "/home/src/workspaces/project/b/randomFileForImport.ts",
  "/home/src/workspaces/project/c/ca/fileWithImports.ts",
  "/home/src/workspaces/project/c/ca/caa/randomFileForImport.ts",
  "/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts",
  "/home/src/workspaces/project/c/cb/fileWithImports.ts",
  "/home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts",
  "/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts",
  "/home/src/workspaces/project/d/da/daa/fileWithImports.ts",
  "/home/src/workspaces/project/d/da/fileWithImports.ts",
  "/home/src/workspaces/project/e/ea/fileWithImports.ts",
  "/home/src/workspaces/project/e/ea/eaa/fileWithImports.ts",
  "/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts",
  "/home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts",
  "/home/src/workspaces/project/f/fa/faa/x/y/z/randomFileForImport.ts",
  "/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts"
]
Program options: {
  "traceResolution": true,
  "watch": true,
  "project": "/home/src/workspaces/project/tsconfig.json",
  "explainFiles": true,
  "extendedDiagnostics": true,
  "configFilePath": "/home/src/workspaces/project/tsconfig.json"
}
Program structureReused: SafeModules
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/project/main.ts
/home/src/workspaces/project/node_modules/pkg0/index.d.ts
/home/src/workspaces/project/fileWithImports.ts
/home/src/workspaces/project/randomFileForImport.ts
/home/src/workspaces/project/a/fileWithImports.ts
/home/src/workspaces/project/b/ba/fileWithImports.ts
/home/src/workspaces/project/b/randomFileForImport.ts
/home/src/workspaces/project/c/ca/fileWithImports.ts
/home/src/workspaces/project/c/ca/caa/randomFileForImport.ts
/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts
/home/src/workspaces/project/c/cb/fileWithImports.ts
/home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts
/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts
/home/src/workspaces/project/d/da/daa/fileWithImports.ts
/home/src/workspaces/project/d/da/fileWithImports.ts
/home/src/workspaces/project/e/ea/fileWithImports.ts
/home/src/workspaces/project/e/ea/eaa/fileWithImports.ts
/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts
/home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts
/home/src/workspaces/project/f/fa/faa/x/y/z/randomFileForImport.ts
/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts

Semantic diagnostics in builder refreshed for::
/home/src/workspaces/project/c/ca/caa/randomFileForImport.ts

Shape signatures in builder refreshed for::
/home/src/workspaces/project/c/ca/caa/randomfileforimport.ts (computed .d.ts)

exitCode:: ExitStatus.undefined

Change:: modify d/da/daa/daaa/x/y/z/randomFileForImport by adding import

Input::
//// [/home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts]
import type { ImportInterface0 } from "pkg0";
export const x = 10;


Output::
FileWatcher:: Triggered with /home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts 1:: WatchInfo: /home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts 250 undefined Source file
Scheduling update
Elapsed:: *ms FileWatcher:: Triggered with /home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts 1:: WatchInfo: /home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts 250 undefined Source file


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
  roots: ["/home/src/workspaces/project/main.ts","/home/src/workspaces/project/fileWithImports.ts","/home/src/workspaces/project/randomFileForImport.ts","/home/src/workspaces/project/a/fileWithImports.ts","/home/src/workspaces/project/b/ba/fileWithImports.ts","/home/src/workspaces/project/b/randomFileForImport.ts","/home/src/workspaces/project/c/ca/fileWithImports.ts","/home/src/workspaces/project/c/ca/caa/randomFileForImport.ts","/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts","/home/src/workspaces/project/c/cb/fileWithImports.ts","/home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts","/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts","/home/src/workspaces/project/d/da/daa/fileWithImports.ts","/home/src/workspaces/project/d/da/fileWithImports.ts","/home/src/workspaces/project/e/ea/fileWithImports.ts","/home/src/workspaces/project/e/ea/eaa/fileWithImports.ts","/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts","/home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts","/home/src/workspaces/project/f/fa/faa/x/y/z/randomFileForImport.ts","/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts"]
  options: {"traceResolution":true,"watch":true,"project":"/home/src/workspaces/project/tsconfig.json","explainFiles":true,"extendedDiagnostics":true,"configFilePath":"/home/src/workspaces/project/tsconfig.json"}
File '/home/src/workspaces/project/node_modules/pkg0/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/node_modules/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/fileWithImports.ts' of old program, it was not resolved.
File '/home/src/workspaces/project/node_modules/pkg0/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/node_modules/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/randomFileForImport.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/a/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/a/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/b/ba/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/b/ba/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/b/randomFileForImport.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/c/ca/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/c/ca/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/c/ca/caa/randomFileForImport.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/c/cb/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/c/cb/fileWithImports.ts' of old program, it was not resolved.
======== Resolving module 'pkg0' from '/home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts'. ========
Module resolution kind is not specified, using 'Node10'.
Loading module 'pkg0' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Directory '/home/src/workspaces/project/d/da/daa/daaa/x/y/z/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/workspaces/project/d/da/daa/daaa/x/y/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/workspaces/project/d/da/daa/daaa/x/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg0' was found in cache from location '/home/src/workspaces/project/d/da/daa/daaa'.
======== Module name 'pkg0' was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'. ========
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/d/da/daa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/d/da/daa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/d/da/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/d/da/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/e/ea/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/e/ea/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/e/ea/eaa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/e/ea/eaa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts' of old program, it was not resolved.
[96ma/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mb/ba/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mc/ca/caa/caaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mc/ca/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mc/cb/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96md/da/daa/daaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96md/da/daa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96md/da/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96me/ea/eaa/eaaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96me/ea/eaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96me/ea/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mf/fa/faa/faaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mfileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

../../tslibs/TS/Lib/lib.d.ts
  Default library for target 'es5'
main.ts
  Part of 'files' list in tsconfig.json
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
  Imported via "pkg0" from file 'd/da/daa/daaa/x/y/z/randomFileForImport.ts'
  Imported via "pkg0" from file 'd/da/daa/daaa/fileWithImports.ts'
  Imported via "pkg0" from file 'd/da/daa/fileWithImports.ts'
  Imported via "pkg0" from file 'd/da/fileWithImports.ts'
  Imported via "pkg0" from file 'e/ea/fileWithImports.ts'
  Imported via "pkg0" from file 'e/ea/eaa/fileWithImports.ts'
  Imported via "pkg0" from file 'e/ea/eaa/eaaa/fileWithImports.ts'
  Imported via "pkg0" from file 'f/fa/faa/faaa/fileWithImports.ts'
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
d/da/daa/daaa/x/y/z/randomFileForImport.ts
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
e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts
  Part of 'files' list in tsconfig.json
f/fa/faa/x/y/z/randomFileForImport.ts
  Part of 'files' list in tsconfig.json
f/fa/faa/faaa/fileWithImports.ts
  Part of 'files' list in tsconfig.json
[[90mHH:MM:SS AM[0m] Found 13 errors. Watching for file changes.



//// [/home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.js] file written with same contents


Program root files: [
  "/home/src/workspaces/project/main.ts",
  "/home/src/workspaces/project/fileWithImports.ts",
  "/home/src/workspaces/project/randomFileForImport.ts",
  "/home/src/workspaces/project/a/fileWithImports.ts",
  "/home/src/workspaces/project/b/ba/fileWithImports.ts",
  "/home/src/workspaces/project/b/randomFileForImport.ts",
  "/home/src/workspaces/project/c/ca/fileWithImports.ts",
  "/home/src/workspaces/project/c/ca/caa/randomFileForImport.ts",
  "/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts",
  "/home/src/workspaces/project/c/cb/fileWithImports.ts",
  "/home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts",
  "/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts",
  "/home/src/workspaces/project/d/da/daa/fileWithImports.ts",
  "/home/src/workspaces/project/d/da/fileWithImports.ts",
  "/home/src/workspaces/project/e/ea/fileWithImports.ts",
  "/home/src/workspaces/project/e/ea/eaa/fileWithImports.ts",
  "/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts",
  "/home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts",
  "/home/src/workspaces/project/f/fa/faa/x/y/z/randomFileForImport.ts",
  "/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts"
]
Program options: {
  "traceResolution": true,
  "watch": true,
  "project": "/home/src/workspaces/project/tsconfig.json",
  "explainFiles": true,
  "extendedDiagnostics": true,
  "configFilePath": "/home/src/workspaces/project/tsconfig.json"
}
Program structureReused: SafeModules
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/project/main.ts
/home/src/workspaces/project/node_modules/pkg0/index.d.ts
/home/src/workspaces/project/fileWithImports.ts
/home/src/workspaces/project/randomFileForImport.ts
/home/src/workspaces/project/a/fileWithImports.ts
/home/src/workspaces/project/b/ba/fileWithImports.ts
/home/src/workspaces/project/b/randomFileForImport.ts
/home/src/workspaces/project/c/ca/fileWithImports.ts
/home/src/workspaces/project/c/ca/caa/randomFileForImport.ts
/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts
/home/src/workspaces/project/c/cb/fileWithImports.ts
/home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts
/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts
/home/src/workspaces/project/d/da/daa/fileWithImports.ts
/home/src/workspaces/project/d/da/fileWithImports.ts
/home/src/workspaces/project/e/ea/fileWithImports.ts
/home/src/workspaces/project/e/ea/eaa/fileWithImports.ts
/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts
/home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts
/home/src/workspaces/project/f/fa/faa/x/y/z/randomFileForImport.ts
/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts

Semantic diagnostics in builder refreshed for::
/home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts

Shape signatures in builder refreshed for::
/home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomfileforimport.ts (computed .d.ts)

exitCode:: ExitStatus.undefined

Change:: modify e/ea/eaa/eaaa/x/y/z/randomFileForImport by adding import

Input::
//// [/home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts]
import type { ImportInterface0 } from "pkg0";
export const x = 10;


Output::
FileWatcher:: Triggered with /home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts 1:: WatchInfo: /home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts 250 undefined Source file
Scheduling update
Elapsed:: *ms FileWatcher:: Triggered with /home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts 1:: WatchInfo: /home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts 250 undefined Source file


Timeout callback:: count: 1
5: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
5: timerToUpdateProgram

Host is moving to new time
After running Timeout callback:: count: 0
Output::
Synchronizing program
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

CreatingProgramWith::
  roots: ["/home/src/workspaces/project/main.ts","/home/src/workspaces/project/fileWithImports.ts","/home/src/workspaces/project/randomFileForImport.ts","/home/src/workspaces/project/a/fileWithImports.ts","/home/src/workspaces/project/b/ba/fileWithImports.ts","/home/src/workspaces/project/b/randomFileForImport.ts","/home/src/workspaces/project/c/ca/fileWithImports.ts","/home/src/workspaces/project/c/ca/caa/randomFileForImport.ts","/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts","/home/src/workspaces/project/c/cb/fileWithImports.ts","/home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts","/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts","/home/src/workspaces/project/d/da/daa/fileWithImports.ts","/home/src/workspaces/project/d/da/fileWithImports.ts","/home/src/workspaces/project/e/ea/fileWithImports.ts","/home/src/workspaces/project/e/ea/eaa/fileWithImports.ts","/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts","/home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts","/home/src/workspaces/project/f/fa/faa/x/y/z/randomFileForImport.ts","/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts"]
  options: {"traceResolution":true,"watch":true,"project":"/home/src/workspaces/project/tsconfig.json","explainFiles":true,"extendedDiagnostics":true,"configFilePath":"/home/src/workspaces/project/tsconfig.json"}
File '/home/src/workspaces/project/node_modules/pkg0/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/node_modules/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/fileWithImports.ts' of old program, it was not resolved.
File '/home/src/workspaces/project/node_modules/pkg0/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/node_modules/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/randomFileForImport.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/a/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/a/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/b/ba/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/b/ba/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/b/randomFileForImport.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/c/ca/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/c/ca/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/c/ca/caa/randomFileForImport.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/c/cb/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/c/cb/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/d/da/daa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/d/da/daa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/d/da/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/d/da/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/e/ea/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/e/ea/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/e/ea/eaa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/e/ea/eaa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts' of old program, it was not resolved.
======== Resolving module 'pkg0' from '/home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts'. ========
Module resolution kind is not specified, using 'Node10'.
Loading module 'pkg0' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Directory '/home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/workspaces/project/e/ea/eaa/eaaa/x/y/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/workspaces/project/e/ea/eaa/eaaa/x/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg0' was found in cache from location '/home/src/workspaces/project/e/ea/eaa/eaaa'.
======== Module name 'pkg0' was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'. ========
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts' of old program, it was not resolved.
[96ma/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mb/ba/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mc/ca/caa/caaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mc/ca/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mc/cb/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96md/da/daa/daaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96md/da/daa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96md/da/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96me/ea/eaa/eaaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96me/ea/eaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96me/ea/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mf/fa/faa/faaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mfileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

../../tslibs/TS/Lib/lib.d.ts
  Default library for target 'es5'
main.ts
  Part of 'files' list in tsconfig.json
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
  Imported via "pkg0" from file 'd/da/daa/daaa/x/y/z/randomFileForImport.ts'
  Imported via "pkg0" from file 'd/da/daa/daaa/fileWithImports.ts'
  Imported via "pkg0" from file 'd/da/daa/fileWithImports.ts'
  Imported via "pkg0" from file 'd/da/fileWithImports.ts'
  Imported via "pkg0" from file 'e/ea/fileWithImports.ts'
  Imported via "pkg0" from file 'e/ea/eaa/fileWithImports.ts'
  Imported via "pkg0" from file 'e/ea/eaa/eaaa/fileWithImports.ts'
  Imported via "pkg0" from file 'e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts'
  Imported via "pkg0" from file 'f/fa/faa/faaa/fileWithImports.ts'
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
d/da/daa/daaa/x/y/z/randomFileForImport.ts
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
e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts
  Part of 'files' list in tsconfig.json
f/fa/faa/x/y/z/randomFileForImport.ts
  Part of 'files' list in tsconfig.json
f/fa/faa/faaa/fileWithImports.ts
  Part of 'files' list in tsconfig.json
[[90mHH:MM:SS AM[0m] Found 13 errors. Watching for file changes.



//// [/home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.js] file written with same contents


Program root files: [
  "/home/src/workspaces/project/main.ts",
  "/home/src/workspaces/project/fileWithImports.ts",
  "/home/src/workspaces/project/randomFileForImport.ts",
  "/home/src/workspaces/project/a/fileWithImports.ts",
  "/home/src/workspaces/project/b/ba/fileWithImports.ts",
  "/home/src/workspaces/project/b/randomFileForImport.ts",
  "/home/src/workspaces/project/c/ca/fileWithImports.ts",
  "/home/src/workspaces/project/c/ca/caa/randomFileForImport.ts",
  "/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts",
  "/home/src/workspaces/project/c/cb/fileWithImports.ts",
  "/home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts",
  "/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts",
  "/home/src/workspaces/project/d/da/daa/fileWithImports.ts",
  "/home/src/workspaces/project/d/da/fileWithImports.ts",
  "/home/src/workspaces/project/e/ea/fileWithImports.ts",
  "/home/src/workspaces/project/e/ea/eaa/fileWithImports.ts",
  "/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts",
  "/home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts",
  "/home/src/workspaces/project/f/fa/faa/x/y/z/randomFileForImport.ts",
  "/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts"
]
Program options: {
  "traceResolution": true,
  "watch": true,
  "project": "/home/src/workspaces/project/tsconfig.json",
  "explainFiles": true,
  "extendedDiagnostics": true,
  "configFilePath": "/home/src/workspaces/project/tsconfig.json"
}
Program structureReused: SafeModules
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/project/main.ts
/home/src/workspaces/project/node_modules/pkg0/index.d.ts
/home/src/workspaces/project/fileWithImports.ts
/home/src/workspaces/project/randomFileForImport.ts
/home/src/workspaces/project/a/fileWithImports.ts
/home/src/workspaces/project/b/ba/fileWithImports.ts
/home/src/workspaces/project/b/randomFileForImport.ts
/home/src/workspaces/project/c/ca/fileWithImports.ts
/home/src/workspaces/project/c/ca/caa/randomFileForImport.ts
/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts
/home/src/workspaces/project/c/cb/fileWithImports.ts
/home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts
/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts
/home/src/workspaces/project/d/da/daa/fileWithImports.ts
/home/src/workspaces/project/d/da/fileWithImports.ts
/home/src/workspaces/project/e/ea/fileWithImports.ts
/home/src/workspaces/project/e/ea/eaa/fileWithImports.ts
/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts
/home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts
/home/src/workspaces/project/f/fa/faa/x/y/z/randomFileForImport.ts
/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts

Semantic diagnostics in builder refreshed for::
/home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts

Shape signatures in builder refreshed for::
/home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts (computed .d.ts)

exitCode:: ExitStatus.undefined

Change:: modify randomFileForImport by adding unresolved import

Input::
//// [/home/src/workspaces/project/randomFileForImport.ts]
import type { ImportInterface1 } from "pkg1";
import type { ImportInterface0 } from "pkg0";
export const x = 10;


Output::
FileWatcher:: Triggered with /home/src/workspaces/project/randomFileForImport.ts 1:: WatchInfo: /home/src/workspaces/project/randomFileForImport.ts 250 undefined Source file
Scheduling update
Elapsed:: *ms FileWatcher:: Triggered with /home/src/workspaces/project/randomFileForImport.ts 1:: WatchInfo: /home/src/workspaces/project/randomFileForImport.ts 250 undefined Source file


Timeout callback:: count: 1
6: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
6: timerToUpdateProgram

Host is moving to new time
After running Timeout callback:: count: 0
Output::
Synchronizing program
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

CreatingProgramWith::
  roots: ["/home/src/workspaces/project/main.ts","/home/src/workspaces/project/fileWithImports.ts","/home/src/workspaces/project/randomFileForImport.ts","/home/src/workspaces/project/a/fileWithImports.ts","/home/src/workspaces/project/b/ba/fileWithImports.ts","/home/src/workspaces/project/b/randomFileForImport.ts","/home/src/workspaces/project/c/ca/fileWithImports.ts","/home/src/workspaces/project/c/ca/caa/randomFileForImport.ts","/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts","/home/src/workspaces/project/c/cb/fileWithImports.ts","/home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts","/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts","/home/src/workspaces/project/d/da/daa/fileWithImports.ts","/home/src/workspaces/project/d/da/fileWithImports.ts","/home/src/workspaces/project/e/ea/fileWithImports.ts","/home/src/workspaces/project/e/ea/eaa/fileWithImports.ts","/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts","/home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts","/home/src/workspaces/project/f/fa/faa/x/y/z/randomFileForImport.ts","/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts"]
  options: {"traceResolution":true,"watch":true,"project":"/home/src/workspaces/project/tsconfig.json","explainFiles":true,"extendedDiagnostics":true,"configFilePath":"/home/src/workspaces/project/tsconfig.json"}
File '/home/src/workspaces/project/node_modules/pkg0/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/node_modules/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/fileWithImports.ts' of old program, it was not resolved.
File '/home/src/workspaces/project/node_modules/pkg0/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/node_modules/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
======== Resolving module 'pkg1' from '/home/src/workspaces/project/randomFileForImport.ts'. ========
Resolution for module 'pkg1' was found in cache from location '/home/src/workspaces/project'.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/randomFileForImport.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/a/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/a/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/b/ba/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/b/ba/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/b/randomFileForImport.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/c/ca/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/c/ca/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/c/ca/caa/randomFileForImport.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/c/cb/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/c/cb/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/d/da/daa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/d/da/daa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/d/da/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/d/da/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/e/ea/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/e/ea/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/e/ea/eaa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/e/ea/eaa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts' of old program, it was not resolved.
[96ma/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mb/ba/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mc/ca/caa/caaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mc/ca/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mc/cb/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96md/da/daa/daaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96md/da/daa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96md/da/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96me/ea/eaa/eaaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96me/ea/eaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96me/ea/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mf/fa/faa/faaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mfileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mrandomFileForImport.ts[0m:[93m1[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m1[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

../../tslibs/TS/Lib/lib.d.ts
  Default library for target 'es5'
main.ts
  Part of 'files' list in tsconfig.json
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
  Imported via "pkg0" from file 'd/da/daa/daaa/x/y/z/randomFileForImport.ts'
  Imported via "pkg0" from file 'd/da/daa/daaa/fileWithImports.ts'
  Imported via "pkg0" from file 'd/da/daa/fileWithImports.ts'
  Imported via "pkg0" from file 'd/da/fileWithImports.ts'
  Imported via "pkg0" from file 'e/ea/fileWithImports.ts'
  Imported via "pkg0" from file 'e/ea/eaa/fileWithImports.ts'
  Imported via "pkg0" from file 'e/ea/eaa/eaaa/fileWithImports.ts'
  Imported via "pkg0" from file 'e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts'
  Imported via "pkg0" from file 'f/fa/faa/faaa/fileWithImports.ts'
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
d/da/daa/daaa/x/y/z/randomFileForImport.ts
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
e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts
  Part of 'files' list in tsconfig.json
f/fa/faa/x/y/z/randomFileForImport.ts
  Part of 'files' list in tsconfig.json
f/fa/faa/faaa/fileWithImports.ts
  Part of 'files' list in tsconfig.json
[[90mHH:MM:SS AM[0m] Found 14 errors. Watching for file changes.



//// [/home/src/workspaces/project/randomFileForImport.js] file written with same contents


Program root files: [
  "/home/src/workspaces/project/main.ts",
  "/home/src/workspaces/project/fileWithImports.ts",
  "/home/src/workspaces/project/randomFileForImport.ts",
  "/home/src/workspaces/project/a/fileWithImports.ts",
  "/home/src/workspaces/project/b/ba/fileWithImports.ts",
  "/home/src/workspaces/project/b/randomFileForImport.ts",
  "/home/src/workspaces/project/c/ca/fileWithImports.ts",
  "/home/src/workspaces/project/c/ca/caa/randomFileForImport.ts",
  "/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts",
  "/home/src/workspaces/project/c/cb/fileWithImports.ts",
  "/home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts",
  "/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts",
  "/home/src/workspaces/project/d/da/daa/fileWithImports.ts",
  "/home/src/workspaces/project/d/da/fileWithImports.ts",
  "/home/src/workspaces/project/e/ea/fileWithImports.ts",
  "/home/src/workspaces/project/e/ea/eaa/fileWithImports.ts",
  "/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts",
  "/home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts",
  "/home/src/workspaces/project/f/fa/faa/x/y/z/randomFileForImport.ts",
  "/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts"
]
Program options: {
  "traceResolution": true,
  "watch": true,
  "project": "/home/src/workspaces/project/tsconfig.json",
  "explainFiles": true,
  "extendedDiagnostics": true,
  "configFilePath": "/home/src/workspaces/project/tsconfig.json"
}
Program structureReused: SafeModules
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/project/main.ts
/home/src/workspaces/project/node_modules/pkg0/index.d.ts
/home/src/workspaces/project/fileWithImports.ts
/home/src/workspaces/project/randomFileForImport.ts
/home/src/workspaces/project/a/fileWithImports.ts
/home/src/workspaces/project/b/ba/fileWithImports.ts
/home/src/workspaces/project/b/randomFileForImport.ts
/home/src/workspaces/project/c/ca/fileWithImports.ts
/home/src/workspaces/project/c/ca/caa/randomFileForImport.ts
/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts
/home/src/workspaces/project/c/cb/fileWithImports.ts
/home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts
/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts
/home/src/workspaces/project/d/da/daa/fileWithImports.ts
/home/src/workspaces/project/d/da/fileWithImports.ts
/home/src/workspaces/project/e/ea/fileWithImports.ts
/home/src/workspaces/project/e/ea/eaa/fileWithImports.ts
/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts
/home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts
/home/src/workspaces/project/f/fa/faa/x/y/z/randomFileForImport.ts
/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts

Semantic diagnostics in builder refreshed for::
/home/src/workspaces/project/randomFileForImport.ts

Shape signatures in builder refreshed for::
/home/src/workspaces/project/randomfileforimport.ts (computed .d.ts)

exitCode:: ExitStatus.undefined

Change:: modify b/randomFileForImport by adding unresolved import

Input::
//// [/home/src/workspaces/project/b/randomFileForImport.ts]
import type { ImportInterface1 } from "pkg1";
import type { ImportInterface0 } from "pkg0";
export const x = 10;


Output::
FileWatcher:: Triggered with /home/src/workspaces/project/b/randomFileForImport.ts 1:: WatchInfo: /home/src/workspaces/project/b/randomFileForImport.ts 250 undefined Source file
Scheduling update
Elapsed:: *ms FileWatcher:: Triggered with /home/src/workspaces/project/b/randomFileForImport.ts 1:: WatchInfo: /home/src/workspaces/project/b/randomFileForImport.ts 250 undefined Source file


Timeout callback:: count: 1
7: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
7: timerToUpdateProgram

Host is moving to new time
After running Timeout callback:: count: 0
Output::
Synchronizing program
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

CreatingProgramWith::
  roots: ["/home/src/workspaces/project/main.ts","/home/src/workspaces/project/fileWithImports.ts","/home/src/workspaces/project/randomFileForImport.ts","/home/src/workspaces/project/a/fileWithImports.ts","/home/src/workspaces/project/b/ba/fileWithImports.ts","/home/src/workspaces/project/b/randomFileForImport.ts","/home/src/workspaces/project/c/ca/fileWithImports.ts","/home/src/workspaces/project/c/ca/caa/randomFileForImport.ts","/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts","/home/src/workspaces/project/c/cb/fileWithImports.ts","/home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts","/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts","/home/src/workspaces/project/d/da/daa/fileWithImports.ts","/home/src/workspaces/project/d/da/fileWithImports.ts","/home/src/workspaces/project/e/ea/fileWithImports.ts","/home/src/workspaces/project/e/ea/eaa/fileWithImports.ts","/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts","/home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts","/home/src/workspaces/project/f/fa/faa/x/y/z/randomFileForImport.ts","/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts"]
  options: {"traceResolution":true,"watch":true,"project":"/home/src/workspaces/project/tsconfig.json","explainFiles":true,"extendedDiagnostics":true,"configFilePath":"/home/src/workspaces/project/tsconfig.json"}
File '/home/src/workspaces/project/node_modules/pkg0/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/node_modules/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/fileWithImports.ts' of old program, it was not resolved.
File '/home/src/workspaces/project/node_modules/pkg0/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/node_modules/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/randomFileForImport.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/randomFileForImport.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/a/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/a/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/b/ba/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/b/ba/fileWithImports.ts' of old program, it was not resolved.
======== Resolving module 'pkg1' from '/home/src/workspaces/project/b/randomFileForImport.ts'. ========
Module resolution kind is not specified, using 'Node10'.
Loading module 'pkg1' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Resolution for module 'pkg1' was found in cache from location '/home/src/workspaces/project/b'.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/b/randomFileForImport.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/c/ca/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/c/ca/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/c/ca/caa/randomFileForImport.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/c/cb/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/c/cb/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/d/da/daa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/d/da/daa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/d/da/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/d/da/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/e/ea/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/e/ea/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/e/ea/eaa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/e/ea/eaa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts' of old program, it was not resolved.
[96ma/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mb/ba/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mb/randomFileForImport.ts[0m:[93m1[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m1[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mc/ca/caa/caaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mc/ca/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mc/cb/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96md/da/daa/daaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96md/da/daa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96md/da/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96me/ea/eaa/eaaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96me/ea/eaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96me/ea/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mf/fa/faa/faaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mfileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mrandomFileForImport.ts[0m:[93m1[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m1[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

../../tslibs/TS/Lib/lib.d.ts
  Default library for target 'es5'
main.ts
  Part of 'files' list in tsconfig.json
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
  Imported via "pkg0" from file 'd/da/daa/daaa/x/y/z/randomFileForImport.ts'
  Imported via "pkg0" from file 'd/da/daa/daaa/fileWithImports.ts'
  Imported via "pkg0" from file 'd/da/daa/fileWithImports.ts'
  Imported via "pkg0" from file 'd/da/fileWithImports.ts'
  Imported via "pkg0" from file 'e/ea/fileWithImports.ts'
  Imported via "pkg0" from file 'e/ea/eaa/fileWithImports.ts'
  Imported via "pkg0" from file 'e/ea/eaa/eaaa/fileWithImports.ts'
  Imported via "pkg0" from file 'e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts'
  Imported via "pkg0" from file 'f/fa/faa/faaa/fileWithImports.ts'
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
d/da/daa/daaa/x/y/z/randomFileForImport.ts
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
e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts
  Part of 'files' list in tsconfig.json
f/fa/faa/x/y/z/randomFileForImport.ts
  Part of 'files' list in tsconfig.json
f/fa/faa/faaa/fileWithImports.ts
  Part of 'files' list in tsconfig.json
[[90mHH:MM:SS AM[0m] Found 15 errors. Watching for file changes.



//// [/home/src/workspaces/project/b/randomFileForImport.js] file written with same contents


Program root files: [
  "/home/src/workspaces/project/main.ts",
  "/home/src/workspaces/project/fileWithImports.ts",
  "/home/src/workspaces/project/randomFileForImport.ts",
  "/home/src/workspaces/project/a/fileWithImports.ts",
  "/home/src/workspaces/project/b/ba/fileWithImports.ts",
  "/home/src/workspaces/project/b/randomFileForImport.ts",
  "/home/src/workspaces/project/c/ca/fileWithImports.ts",
  "/home/src/workspaces/project/c/ca/caa/randomFileForImport.ts",
  "/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts",
  "/home/src/workspaces/project/c/cb/fileWithImports.ts",
  "/home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts",
  "/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts",
  "/home/src/workspaces/project/d/da/daa/fileWithImports.ts",
  "/home/src/workspaces/project/d/da/fileWithImports.ts",
  "/home/src/workspaces/project/e/ea/fileWithImports.ts",
  "/home/src/workspaces/project/e/ea/eaa/fileWithImports.ts",
  "/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts",
  "/home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts",
  "/home/src/workspaces/project/f/fa/faa/x/y/z/randomFileForImport.ts",
  "/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts"
]
Program options: {
  "traceResolution": true,
  "watch": true,
  "project": "/home/src/workspaces/project/tsconfig.json",
  "explainFiles": true,
  "extendedDiagnostics": true,
  "configFilePath": "/home/src/workspaces/project/tsconfig.json"
}
Program structureReused: SafeModules
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/project/main.ts
/home/src/workspaces/project/node_modules/pkg0/index.d.ts
/home/src/workspaces/project/fileWithImports.ts
/home/src/workspaces/project/randomFileForImport.ts
/home/src/workspaces/project/a/fileWithImports.ts
/home/src/workspaces/project/b/ba/fileWithImports.ts
/home/src/workspaces/project/b/randomFileForImport.ts
/home/src/workspaces/project/c/ca/fileWithImports.ts
/home/src/workspaces/project/c/ca/caa/randomFileForImport.ts
/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts
/home/src/workspaces/project/c/cb/fileWithImports.ts
/home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts
/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts
/home/src/workspaces/project/d/da/daa/fileWithImports.ts
/home/src/workspaces/project/d/da/fileWithImports.ts
/home/src/workspaces/project/e/ea/fileWithImports.ts
/home/src/workspaces/project/e/ea/eaa/fileWithImports.ts
/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts
/home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts
/home/src/workspaces/project/f/fa/faa/x/y/z/randomFileForImport.ts
/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts

Semantic diagnostics in builder refreshed for::
/home/src/workspaces/project/b/randomFileForImport.ts

Shape signatures in builder refreshed for::
/home/src/workspaces/project/b/randomfileforimport.ts (computed .d.ts)

exitCode:: ExitStatus.undefined

Change:: modify c/ca/caa/randomFileForImport by adding unresolved import

Input::
//// [/home/src/workspaces/project/c/ca/caa/randomFileForImport.ts]
import type { ImportInterface1 } from "pkg1";
import type { ImportInterface0 } from "pkg0";
export const x = 10;


Output::
FileWatcher:: Triggered with /home/src/workspaces/project/c/ca/caa/randomFileForImport.ts 1:: WatchInfo: /home/src/workspaces/project/c/ca/caa/randomFileForImport.ts 250 undefined Source file
Scheduling update
Elapsed:: *ms FileWatcher:: Triggered with /home/src/workspaces/project/c/ca/caa/randomFileForImport.ts 1:: WatchInfo: /home/src/workspaces/project/c/ca/caa/randomFileForImport.ts 250 undefined Source file


Timeout callback:: count: 1
8: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
8: timerToUpdateProgram

Host is moving to new time
After running Timeout callback:: count: 0
Output::
Synchronizing program
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

CreatingProgramWith::
  roots: ["/home/src/workspaces/project/main.ts","/home/src/workspaces/project/fileWithImports.ts","/home/src/workspaces/project/randomFileForImport.ts","/home/src/workspaces/project/a/fileWithImports.ts","/home/src/workspaces/project/b/ba/fileWithImports.ts","/home/src/workspaces/project/b/randomFileForImport.ts","/home/src/workspaces/project/c/ca/fileWithImports.ts","/home/src/workspaces/project/c/ca/caa/randomFileForImport.ts","/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts","/home/src/workspaces/project/c/cb/fileWithImports.ts","/home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts","/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts","/home/src/workspaces/project/d/da/daa/fileWithImports.ts","/home/src/workspaces/project/d/da/fileWithImports.ts","/home/src/workspaces/project/e/ea/fileWithImports.ts","/home/src/workspaces/project/e/ea/eaa/fileWithImports.ts","/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts","/home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts","/home/src/workspaces/project/f/fa/faa/x/y/z/randomFileForImport.ts","/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts"]
  options: {"traceResolution":true,"watch":true,"project":"/home/src/workspaces/project/tsconfig.json","explainFiles":true,"extendedDiagnostics":true,"configFilePath":"/home/src/workspaces/project/tsconfig.json"}
File '/home/src/workspaces/project/node_modules/pkg0/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/node_modules/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/fileWithImports.ts' of old program, it was not resolved.
File '/home/src/workspaces/project/node_modules/pkg0/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/node_modules/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/randomFileForImport.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/randomFileForImport.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/a/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/a/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/b/ba/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/b/ba/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/b/randomFileForImport.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/b/randomFileForImport.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/c/ca/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/c/ca/fileWithImports.ts' of old program, it was not resolved.
======== Resolving module 'pkg1' from '/home/src/workspaces/project/c/ca/caa/randomFileForImport.ts'. ========
Module resolution kind is not specified, using 'Node10'.
Loading module 'pkg1' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Resolution for module 'pkg1' was found in cache from location '/home/src/workspaces/project/c/ca/caa'.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/c/ca/caa/randomFileForImport.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/c/cb/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/c/cb/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/d/da/daa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/d/da/daa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/d/da/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/d/da/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/e/ea/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/e/ea/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/e/ea/eaa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/e/ea/eaa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts' of old program, it was not resolved.
[96ma/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mb/ba/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mb/randomFileForImport.ts[0m:[93m1[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m1[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mc/ca/caa/caaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mc/ca/caa/randomFileForImport.ts[0m:[93m1[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m1[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mc/ca/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mc/cb/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96md/da/daa/daaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96md/da/daa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96md/da/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96me/ea/eaa/eaaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96me/ea/eaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96me/ea/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mf/fa/faa/faaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mfileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mrandomFileForImport.ts[0m:[93m1[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m1[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

../../tslibs/TS/Lib/lib.d.ts
  Default library for target 'es5'
main.ts
  Part of 'files' list in tsconfig.json
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
  Imported via "pkg0" from file 'd/da/daa/daaa/x/y/z/randomFileForImport.ts'
  Imported via "pkg0" from file 'd/da/daa/daaa/fileWithImports.ts'
  Imported via "pkg0" from file 'd/da/daa/fileWithImports.ts'
  Imported via "pkg0" from file 'd/da/fileWithImports.ts'
  Imported via "pkg0" from file 'e/ea/fileWithImports.ts'
  Imported via "pkg0" from file 'e/ea/eaa/fileWithImports.ts'
  Imported via "pkg0" from file 'e/ea/eaa/eaaa/fileWithImports.ts'
  Imported via "pkg0" from file 'e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts'
  Imported via "pkg0" from file 'f/fa/faa/faaa/fileWithImports.ts'
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
d/da/daa/daaa/x/y/z/randomFileForImport.ts
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
e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts
  Part of 'files' list in tsconfig.json
f/fa/faa/x/y/z/randomFileForImport.ts
  Part of 'files' list in tsconfig.json
f/fa/faa/faaa/fileWithImports.ts
  Part of 'files' list in tsconfig.json
[[90mHH:MM:SS AM[0m] Found 16 errors. Watching for file changes.



//// [/home/src/workspaces/project/c/ca/caa/randomFileForImport.js] file written with same contents


Program root files: [
  "/home/src/workspaces/project/main.ts",
  "/home/src/workspaces/project/fileWithImports.ts",
  "/home/src/workspaces/project/randomFileForImport.ts",
  "/home/src/workspaces/project/a/fileWithImports.ts",
  "/home/src/workspaces/project/b/ba/fileWithImports.ts",
  "/home/src/workspaces/project/b/randomFileForImport.ts",
  "/home/src/workspaces/project/c/ca/fileWithImports.ts",
  "/home/src/workspaces/project/c/ca/caa/randomFileForImport.ts",
  "/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts",
  "/home/src/workspaces/project/c/cb/fileWithImports.ts",
  "/home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts",
  "/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts",
  "/home/src/workspaces/project/d/da/daa/fileWithImports.ts",
  "/home/src/workspaces/project/d/da/fileWithImports.ts",
  "/home/src/workspaces/project/e/ea/fileWithImports.ts",
  "/home/src/workspaces/project/e/ea/eaa/fileWithImports.ts",
  "/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts",
  "/home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts",
  "/home/src/workspaces/project/f/fa/faa/x/y/z/randomFileForImport.ts",
  "/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts"
]
Program options: {
  "traceResolution": true,
  "watch": true,
  "project": "/home/src/workspaces/project/tsconfig.json",
  "explainFiles": true,
  "extendedDiagnostics": true,
  "configFilePath": "/home/src/workspaces/project/tsconfig.json"
}
Program structureReused: SafeModules
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/project/main.ts
/home/src/workspaces/project/node_modules/pkg0/index.d.ts
/home/src/workspaces/project/fileWithImports.ts
/home/src/workspaces/project/randomFileForImport.ts
/home/src/workspaces/project/a/fileWithImports.ts
/home/src/workspaces/project/b/ba/fileWithImports.ts
/home/src/workspaces/project/b/randomFileForImport.ts
/home/src/workspaces/project/c/ca/fileWithImports.ts
/home/src/workspaces/project/c/ca/caa/randomFileForImport.ts
/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts
/home/src/workspaces/project/c/cb/fileWithImports.ts
/home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts
/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts
/home/src/workspaces/project/d/da/daa/fileWithImports.ts
/home/src/workspaces/project/d/da/fileWithImports.ts
/home/src/workspaces/project/e/ea/fileWithImports.ts
/home/src/workspaces/project/e/ea/eaa/fileWithImports.ts
/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts
/home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts
/home/src/workspaces/project/f/fa/faa/x/y/z/randomFileForImport.ts
/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts

Semantic diagnostics in builder refreshed for::
/home/src/workspaces/project/c/ca/caa/randomFileForImport.ts

Shape signatures in builder refreshed for::
/home/src/workspaces/project/c/ca/caa/randomfileforimport.ts (computed .d.ts)

exitCode:: ExitStatus.undefined

Change:: modify d/da/daa/daaa/x/y/z/randomFileForImport by adding unresolved import

Input::
//// [/home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts]
import type { ImportInterface1 } from "pkg1";
import type { ImportInterface0 } from "pkg0";
export const x = 10;


Output::
FileWatcher:: Triggered with /home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts 1:: WatchInfo: /home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts 250 undefined Source file
Scheduling update
Elapsed:: *ms FileWatcher:: Triggered with /home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts 1:: WatchInfo: /home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts 250 undefined Source file


Timeout callback:: count: 1
9: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
9: timerToUpdateProgram

Host is moving to new time
After running Timeout callback:: count: 0
Output::
Synchronizing program
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

CreatingProgramWith::
  roots: ["/home/src/workspaces/project/main.ts","/home/src/workspaces/project/fileWithImports.ts","/home/src/workspaces/project/randomFileForImport.ts","/home/src/workspaces/project/a/fileWithImports.ts","/home/src/workspaces/project/b/ba/fileWithImports.ts","/home/src/workspaces/project/b/randomFileForImport.ts","/home/src/workspaces/project/c/ca/fileWithImports.ts","/home/src/workspaces/project/c/ca/caa/randomFileForImport.ts","/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts","/home/src/workspaces/project/c/cb/fileWithImports.ts","/home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts","/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts","/home/src/workspaces/project/d/da/daa/fileWithImports.ts","/home/src/workspaces/project/d/da/fileWithImports.ts","/home/src/workspaces/project/e/ea/fileWithImports.ts","/home/src/workspaces/project/e/ea/eaa/fileWithImports.ts","/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts","/home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts","/home/src/workspaces/project/f/fa/faa/x/y/z/randomFileForImport.ts","/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts"]
  options: {"traceResolution":true,"watch":true,"project":"/home/src/workspaces/project/tsconfig.json","explainFiles":true,"extendedDiagnostics":true,"configFilePath":"/home/src/workspaces/project/tsconfig.json"}
File '/home/src/workspaces/project/node_modules/pkg0/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/node_modules/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/fileWithImports.ts' of old program, it was not resolved.
File '/home/src/workspaces/project/node_modules/pkg0/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/node_modules/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/randomFileForImport.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/randomFileForImport.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/a/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/a/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/b/ba/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/b/ba/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/b/randomFileForImport.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/b/randomFileForImport.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/c/ca/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/c/ca/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/c/ca/caa/randomFileForImport.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/c/ca/caa/randomFileForImport.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/c/cb/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/c/cb/fileWithImports.ts' of old program, it was not resolved.
======== Resolving module 'pkg1' from '/home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts'. ========
Module resolution kind is not specified, using 'Node10'.
Loading module 'pkg1' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Directory '/home/src/workspaces/project/d/da/daa/daaa/x/y/z/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/workspaces/project/d/da/daa/daaa/x/y/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/workspaces/project/d/da/daa/daaa/x/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/home/src/workspaces/project/d/da/daa/daaa'.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/d/da/daa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/d/da/daa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/d/da/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/d/da/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/e/ea/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/e/ea/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/e/ea/eaa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/e/ea/eaa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts' of old program, it was not resolved.
[96ma/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mb/ba/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mb/randomFileForImport.ts[0m:[93m1[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m1[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mc/ca/caa/caaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mc/ca/caa/randomFileForImport.ts[0m:[93m1[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m1[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mc/ca/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mc/cb/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96md/da/daa/daaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96md/da/daa/daaa/x/y/z/randomFileForImport.ts[0m:[93m1[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m1[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96md/da/daa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96md/da/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96me/ea/eaa/eaaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96me/ea/eaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96me/ea/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mf/fa/faa/faaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mfileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mrandomFileForImport.ts[0m:[93m1[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m1[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

../../tslibs/TS/Lib/lib.d.ts
  Default library for target 'es5'
main.ts
  Part of 'files' list in tsconfig.json
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
  Imported via "pkg0" from file 'd/da/daa/daaa/x/y/z/randomFileForImport.ts'
  Imported via "pkg0" from file 'd/da/daa/daaa/fileWithImports.ts'
  Imported via "pkg0" from file 'd/da/daa/fileWithImports.ts'
  Imported via "pkg0" from file 'd/da/fileWithImports.ts'
  Imported via "pkg0" from file 'e/ea/fileWithImports.ts'
  Imported via "pkg0" from file 'e/ea/eaa/fileWithImports.ts'
  Imported via "pkg0" from file 'e/ea/eaa/eaaa/fileWithImports.ts'
  Imported via "pkg0" from file 'e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts'
  Imported via "pkg0" from file 'f/fa/faa/faaa/fileWithImports.ts'
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
d/da/daa/daaa/x/y/z/randomFileForImport.ts
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
e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts
  Part of 'files' list in tsconfig.json
f/fa/faa/x/y/z/randomFileForImport.ts
  Part of 'files' list in tsconfig.json
f/fa/faa/faaa/fileWithImports.ts
  Part of 'files' list in tsconfig.json
[[90mHH:MM:SS AM[0m] Found 17 errors. Watching for file changes.



//// [/home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.js] file written with same contents


Program root files: [
  "/home/src/workspaces/project/main.ts",
  "/home/src/workspaces/project/fileWithImports.ts",
  "/home/src/workspaces/project/randomFileForImport.ts",
  "/home/src/workspaces/project/a/fileWithImports.ts",
  "/home/src/workspaces/project/b/ba/fileWithImports.ts",
  "/home/src/workspaces/project/b/randomFileForImport.ts",
  "/home/src/workspaces/project/c/ca/fileWithImports.ts",
  "/home/src/workspaces/project/c/ca/caa/randomFileForImport.ts",
  "/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts",
  "/home/src/workspaces/project/c/cb/fileWithImports.ts",
  "/home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts",
  "/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts",
  "/home/src/workspaces/project/d/da/daa/fileWithImports.ts",
  "/home/src/workspaces/project/d/da/fileWithImports.ts",
  "/home/src/workspaces/project/e/ea/fileWithImports.ts",
  "/home/src/workspaces/project/e/ea/eaa/fileWithImports.ts",
  "/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts",
  "/home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts",
  "/home/src/workspaces/project/f/fa/faa/x/y/z/randomFileForImport.ts",
  "/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts"
]
Program options: {
  "traceResolution": true,
  "watch": true,
  "project": "/home/src/workspaces/project/tsconfig.json",
  "explainFiles": true,
  "extendedDiagnostics": true,
  "configFilePath": "/home/src/workspaces/project/tsconfig.json"
}
Program structureReused: SafeModules
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/project/main.ts
/home/src/workspaces/project/node_modules/pkg0/index.d.ts
/home/src/workspaces/project/fileWithImports.ts
/home/src/workspaces/project/randomFileForImport.ts
/home/src/workspaces/project/a/fileWithImports.ts
/home/src/workspaces/project/b/ba/fileWithImports.ts
/home/src/workspaces/project/b/randomFileForImport.ts
/home/src/workspaces/project/c/ca/fileWithImports.ts
/home/src/workspaces/project/c/ca/caa/randomFileForImport.ts
/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts
/home/src/workspaces/project/c/cb/fileWithImports.ts
/home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts
/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts
/home/src/workspaces/project/d/da/daa/fileWithImports.ts
/home/src/workspaces/project/d/da/fileWithImports.ts
/home/src/workspaces/project/e/ea/fileWithImports.ts
/home/src/workspaces/project/e/ea/eaa/fileWithImports.ts
/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts
/home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts
/home/src/workspaces/project/f/fa/faa/x/y/z/randomFileForImport.ts
/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts

Semantic diagnostics in builder refreshed for::
/home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts

Shape signatures in builder refreshed for::
/home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomfileforimport.ts (computed .d.ts)

exitCode:: ExitStatus.undefined

Change:: modify e/ea/eaa/eaaa/x/y/z/randomFileForImport by adding unresolved import

Input::
//// [/home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts]
import type { ImportInterface1 } from "pkg1";
import type { ImportInterface0 } from "pkg0";
export const x = 10;


Output::
FileWatcher:: Triggered with /home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts 1:: WatchInfo: /home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts 250 undefined Source file
Scheduling update
Elapsed:: *ms FileWatcher:: Triggered with /home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts 1:: WatchInfo: /home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts 250 undefined Source file


Timeout callback:: count: 1
10: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
10: timerToUpdateProgram

Host is moving to new time
After running Timeout callback:: count: 0
Output::
Synchronizing program
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

CreatingProgramWith::
  roots: ["/home/src/workspaces/project/main.ts","/home/src/workspaces/project/fileWithImports.ts","/home/src/workspaces/project/randomFileForImport.ts","/home/src/workspaces/project/a/fileWithImports.ts","/home/src/workspaces/project/b/ba/fileWithImports.ts","/home/src/workspaces/project/b/randomFileForImport.ts","/home/src/workspaces/project/c/ca/fileWithImports.ts","/home/src/workspaces/project/c/ca/caa/randomFileForImport.ts","/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts","/home/src/workspaces/project/c/cb/fileWithImports.ts","/home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts","/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts","/home/src/workspaces/project/d/da/daa/fileWithImports.ts","/home/src/workspaces/project/d/da/fileWithImports.ts","/home/src/workspaces/project/e/ea/fileWithImports.ts","/home/src/workspaces/project/e/ea/eaa/fileWithImports.ts","/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts","/home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts","/home/src/workspaces/project/f/fa/faa/x/y/z/randomFileForImport.ts","/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts"]
  options: {"traceResolution":true,"watch":true,"project":"/home/src/workspaces/project/tsconfig.json","explainFiles":true,"extendedDiagnostics":true,"configFilePath":"/home/src/workspaces/project/tsconfig.json"}
File '/home/src/workspaces/project/node_modules/pkg0/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/node_modules/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/fileWithImports.ts' of old program, it was not resolved.
File '/home/src/workspaces/project/node_modules/pkg0/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/node_modules/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/randomFileForImport.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/randomFileForImport.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/a/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/a/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/b/ba/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/b/ba/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/b/randomFileForImport.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/b/randomFileForImport.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/c/ca/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/c/ca/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/c/ca/caa/randomFileForImport.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/c/ca/caa/randomFileForImport.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/c/cb/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/c/cb/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/d/da/daa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/d/da/daa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/d/da/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/d/da/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/e/ea/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/e/ea/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/e/ea/eaa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/e/ea/eaa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts' of old program, it was not resolved.
======== Resolving module 'pkg1' from '/home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts'. ========
Module resolution kind is not specified, using 'Node10'.
Loading module 'pkg1' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Directory '/home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/workspaces/project/e/ea/eaa/eaaa/x/y/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/workspaces/project/e/ea/eaa/eaaa/x/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/home/src/workspaces/project/e/ea/eaa/eaaa'.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts' of old program, it was not resolved.
[96ma/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mb/ba/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mb/randomFileForImport.ts[0m:[93m1[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m1[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mc/ca/caa/caaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mc/ca/caa/randomFileForImport.ts[0m:[93m1[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m1[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mc/ca/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mc/cb/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96md/da/daa/daaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96md/da/daa/daaa/x/y/z/randomFileForImport.ts[0m:[93m1[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m1[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96md/da/daa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96md/da/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96me/ea/eaa/eaaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96me/ea/eaa/eaaa/x/y/z/randomFileForImport.ts[0m:[93m1[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m1[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96me/ea/eaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96me/ea/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mf/fa/faa/faaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mfileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mrandomFileForImport.ts[0m:[93m1[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m1[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

../../tslibs/TS/Lib/lib.d.ts
  Default library for target 'es5'
main.ts
  Part of 'files' list in tsconfig.json
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
  Imported via "pkg0" from file 'd/da/daa/daaa/x/y/z/randomFileForImport.ts'
  Imported via "pkg0" from file 'd/da/daa/daaa/fileWithImports.ts'
  Imported via "pkg0" from file 'd/da/daa/fileWithImports.ts'
  Imported via "pkg0" from file 'd/da/fileWithImports.ts'
  Imported via "pkg0" from file 'e/ea/fileWithImports.ts'
  Imported via "pkg0" from file 'e/ea/eaa/fileWithImports.ts'
  Imported via "pkg0" from file 'e/ea/eaa/eaaa/fileWithImports.ts'
  Imported via "pkg0" from file 'e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts'
  Imported via "pkg0" from file 'f/fa/faa/faaa/fileWithImports.ts'
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
d/da/daa/daaa/x/y/z/randomFileForImport.ts
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
e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts
  Part of 'files' list in tsconfig.json
f/fa/faa/x/y/z/randomFileForImport.ts
  Part of 'files' list in tsconfig.json
f/fa/faa/faaa/fileWithImports.ts
  Part of 'files' list in tsconfig.json
[[90mHH:MM:SS AM[0m] Found 18 errors. Watching for file changes.



//// [/home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.js] file written with same contents


Program root files: [
  "/home/src/workspaces/project/main.ts",
  "/home/src/workspaces/project/fileWithImports.ts",
  "/home/src/workspaces/project/randomFileForImport.ts",
  "/home/src/workspaces/project/a/fileWithImports.ts",
  "/home/src/workspaces/project/b/ba/fileWithImports.ts",
  "/home/src/workspaces/project/b/randomFileForImport.ts",
  "/home/src/workspaces/project/c/ca/fileWithImports.ts",
  "/home/src/workspaces/project/c/ca/caa/randomFileForImport.ts",
  "/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts",
  "/home/src/workspaces/project/c/cb/fileWithImports.ts",
  "/home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts",
  "/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts",
  "/home/src/workspaces/project/d/da/daa/fileWithImports.ts",
  "/home/src/workspaces/project/d/da/fileWithImports.ts",
  "/home/src/workspaces/project/e/ea/fileWithImports.ts",
  "/home/src/workspaces/project/e/ea/eaa/fileWithImports.ts",
  "/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts",
  "/home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts",
  "/home/src/workspaces/project/f/fa/faa/x/y/z/randomFileForImport.ts",
  "/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts"
]
Program options: {
  "traceResolution": true,
  "watch": true,
  "project": "/home/src/workspaces/project/tsconfig.json",
  "explainFiles": true,
  "extendedDiagnostics": true,
  "configFilePath": "/home/src/workspaces/project/tsconfig.json"
}
Program structureReused: SafeModules
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/project/main.ts
/home/src/workspaces/project/node_modules/pkg0/index.d.ts
/home/src/workspaces/project/fileWithImports.ts
/home/src/workspaces/project/randomFileForImport.ts
/home/src/workspaces/project/a/fileWithImports.ts
/home/src/workspaces/project/b/ba/fileWithImports.ts
/home/src/workspaces/project/b/randomFileForImport.ts
/home/src/workspaces/project/c/ca/fileWithImports.ts
/home/src/workspaces/project/c/ca/caa/randomFileForImport.ts
/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts
/home/src/workspaces/project/c/cb/fileWithImports.ts
/home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts
/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts
/home/src/workspaces/project/d/da/daa/fileWithImports.ts
/home/src/workspaces/project/d/da/fileWithImports.ts
/home/src/workspaces/project/e/ea/fileWithImports.ts
/home/src/workspaces/project/e/ea/eaa/fileWithImports.ts
/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts
/home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts
/home/src/workspaces/project/f/fa/faa/x/y/z/randomFileForImport.ts
/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts

Semantic diagnostics in builder refreshed for::
/home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts

Shape signatures in builder refreshed for::
/home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts (computed .d.ts)

exitCode:: ExitStatus.undefined

Change:: modify f/fa/faa/x/y/z/randomFileForImport by adding import

Input::
//// [/home/src/workspaces/project/f/fa/faa/x/y/z/randomFileForImport.ts]
import type { ImportInterface0 } from "pkg0";
export const x = 10;


Output::
FileWatcher:: Triggered with /home/src/workspaces/project/f/fa/faa/x/y/z/randomFileForImport.ts 1:: WatchInfo: /home/src/workspaces/project/f/fa/faa/x/y/z/randomFileForImport.ts 250 undefined Source file
Scheduling update
Elapsed:: *ms FileWatcher:: Triggered with /home/src/workspaces/project/f/fa/faa/x/y/z/randomFileForImport.ts 1:: WatchInfo: /home/src/workspaces/project/f/fa/faa/x/y/z/randomFileForImport.ts 250 undefined Source file


Timeout callback:: count: 1
11: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
11: timerToUpdateProgram

Host is moving to new time
After running Timeout callback:: count: 0
Output::
Synchronizing program
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

CreatingProgramWith::
  roots: ["/home/src/workspaces/project/main.ts","/home/src/workspaces/project/fileWithImports.ts","/home/src/workspaces/project/randomFileForImport.ts","/home/src/workspaces/project/a/fileWithImports.ts","/home/src/workspaces/project/b/ba/fileWithImports.ts","/home/src/workspaces/project/b/randomFileForImport.ts","/home/src/workspaces/project/c/ca/fileWithImports.ts","/home/src/workspaces/project/c/ca/caa/randomFileForImport.ts","/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts","/home/src/workspaces/project/c/cb/fileWithImports.ts","/home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts","/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts","/home/src/workspaces/project/d/da/daa/fileWithImports.ts","/home/src/workspaces/project/d/da/fileWithImports.ts","/home/src/workspaces/project/e/ea/fileWithImports.ts","/home/src/workspaces/project/e/ea/eaa/fileWithImports.ts","/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts","/home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts","/home/src/workspaces/project/f/fa/faa/x/y/z/randomFileForImport.ts","/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts"]
  options: {"traceResolution":true,"watch":true,"project":"/home/src/workspaces/project/tsconfig.json","explainFiles":true,"extendedDiagnostics":true,"configFilePath":"/home/src/workspaces/project/tsconfig.json"}
File '/home/src/workspaces/project/node_modules/pkg0/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/node_modules/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/fileWithImports.ts' of old program, it was not resolved.
File '/home/src/workspaces/project/node_modules/pkg0/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/node_modules/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/randomFileForImport.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/randomFileForImport.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/a/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/a/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/b/ba/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/b/ba/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/b/randomFileForImport.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/b/randomFileForImport.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/c/ca/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/c/ca/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/c/ca/caa/randomFileForImport.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/c/ca/caa/randomFileForImport.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/c/cb/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/c/cb/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/d/da/daa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/d/da/daa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/d/da/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/d/da/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/e/ea/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/e/ea/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/e/ea/eaa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/e/ea/eaa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts' of old program, it was not resolved.
======== Resolving module 'pkg0' from '/home/src/workspaces/project/f/fa/faa/x/y/z/randomFileForImport.ts'. ========
Module resolution kind is not specified, using 'Node10'.
Loading module 'pkg0' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Directory '/home/src/workspaces/project/f/fa/faa/x/y/z/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/workspaces/project/f/fa/faa/x/y/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/workspaces/project/f/fa/faa/x/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg0' was found in cache from location '/home/src/workspaces/project/f/fa/faa'.
======== Module name 'pkg0' was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'. ========
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts' of old program, it was not resolved.
[96ma/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mb/ba/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mb/randomFileForImport.ts[0m:[93m1[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m1[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mc/ca/caa/caaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mc/ca/caa/randomFileForImport.ts[0m:[93m1[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m1[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mc/ca/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mc/cb/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96md/da/daa/daaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96md/da/daa/daaa/x/y/z/randomFileForImport.ts[0m:[93m1[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m1[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96md/da/daa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96md/da/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96me/ea/eaa/eaaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96me/ea/eaa/eaaa/x/y/z/randomFileForImport.ts[0m:[93m1[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m1[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96me/ea/eaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96me/ea/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mf/fa/faa/faaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mfileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mrandomFileForImport.ts[0m:[93m1[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m1[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

../../tslibs/TS/Lib/lib.d.ts
  Default library for target 'es5'
main.ts
  Part of 'files' list in tsconfig.json
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
  Imported via "pkg0" from file 'd/da/daa/daaa/x/y/z/randomFileForImport.ts'
  Imported via "pkg0" from file 'd/da/daa/daaa/fileWithImports.ts'
  Imported via "pkg0" from file 'd/da/daa/fileWithImports.ts'
  Imported via "pkg0" from file 'd/da/fileWithImports.ts'
  Imported via "pkg0" from file 'e/ea/fileWithImports.ts'
  Imported via "pkg0" from file 'e/ea/eaa/fileWithImports.ts'
  Imported via "pkg0" from file 'e/ea/eaa/eaaa/fileWithImports.ts'
  Imported via "pkg0" from file 'e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts'
  Imported via "pkg0" from file 'f/fa/faa/x/y/z/randomFileForImport.ts'
  Imported via "pkg0" from file 'f/fa/faa/faaa/fileWithImports.ts'
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
d/da/daa/daaa/x/y/z/randomFileForImport.ts
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
e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts
  Part of 'files' list in tsconfig.json
f/fa/faa/x/y/z/randomFileForImport.ts
  Part of 'files' list in tsconfig.json
f/fa/faa/faaa/fileWithImports.ts
  Part of 'files' list in tsconfig.json
[[90mHH:MM:SS AM[0m] Found 18 errors. Watching for file changes.



//// [/home/src/workspaces/project/f/fa/faa/x/y/z/randomFileForImport.js] file written with same contents


Program root files: [
  "/home/src/workspaces/project/main.ts",
  "/home/src/workspaces/project/fileWithImports.ts",
  "/home/src/workspaces/project/randomFileForImport.ts",
  "/home/src/workspaces/project/a/fileWithImports.ts",
  "/home/src/workspaces/project/b/ba/fileWithImports.ts",
  "/home/src/workspaces/project/b/randomFileForImport.ts",
  "/home/src/workspaces/project/c/ca/fileWithImports.ts",
  "/home/src/workspaces/project/c/ca/caa/randomFileForImport.ts",
  "/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts",
  "/home/src/workspaces/project/c/cb/fileWithImports.ts",
  "/home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts",
  "/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts",
  "/home/src/workspaces/project/d/da/daa/fileWithImports.ts",
  "/home/src/workspaces/project/d/da/fileWithImports.ts",
  "/home/src/workspaces/project/e/ea/fileWithImports.ts",
  "/home/src/workspaces/project/e/ea/eaa/fileWithImports.ts",
  "/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts",
  "/home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts",
  "/home/src/workspaces/project/f/fa/faa/x/y/z/randomFileForImport.ts",
  "/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts"
]
Program options: {
  "traceResolution": true,
  "watch": true,
  "project": "/home/src/workspaces/project/tsconfig.json",
  "explainFiles": true,
  "extendedDiagnostics": true,
  "configFilePath": "/home/src/workspaces/project/tsconfig.json"
}
Program structureReused: SafeModules
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/project/main.ts
/home/src/workspaces/project/node_modules/pkg0/index.d.ts
/home/src/workspaces/project/fileWithImports.ts
/home/src/workspaces/project/randomFileForImport.ts
/home/src/workspaces/project/a/fileWithImports.ts
/home/src/workspaces/project/b/ba/fileWithImports.ts
/home/src/workspaces/project/b/randomFileForImport.ts
/home/src/workspaces/project/c/ca/fileWithImports.ts
/home/src/workspaces/project/c/ca/caa/randomFileForImport.ts
/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts
/home/src/workspaces/project/c/cb/fileWithImports.ts
/home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts
/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts
/home/src/workspaces/project/d/da/daa/fileWithImports.ts
/home/src/workspaces/project/d/da/fileWithImports.ts
/home/src/workspaces/project/e/ea/fileWithImports.ts
/home/src/workspaces/project/e/ea/eaa/fileWithImports.ts
/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts
/home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts
/home/src/workspaces/project/f/fa/faa/x/y/z/randomFileForImport.ts
/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts

Semantic diagnostics in builder refreshed for::
/home/src/workspaces/project/f/fa/faa/x/y/z/randomFileForImport.ts

Shape signatures in builder refreshed for::
/home/src/workspaces/project/f/fa/faa/x/y/z/randomfileforimport.ts (computed .d.ts)

exitCode:: ExitStatus.undefined

Change:: modify f/fa/faa/x/y/z/randomFileForImport by adding unresolved import

Input::
//// [/home/src/workspaces/project/f/fa/faa/x/y/z/randomFileForImport.ts]
import type { ImportInterface1 } from "pkg1";
import type { ImportInterface0 } from "pkg0";
export const x = 10;


Output::
FileWatcher:: Triggered with /home/src/workspaces/project/f/fa/faa/x/y/z/randomFileForImport.ts 1:: WatchInfo: /home/src/workspaces/project/f/fa/faa/x/y/z/randomFileForImport.ts 250 undefined Source file
Scheduling update
Elapsed:: *ms FileWatcher:: Triggered with /home/src/workspaces/project/f/fa/faa/x/y/z/randomFileForImport.ts 1:: WatchInfo: /home/src/workspaces/project/f/fa/faa/x/y/z/randomFileForImport.ts 250 undefined Source file


Timeout callback:: count: 1
12: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
12: timerToUpdateProgram

Host is moving to new time
After running Timeout callback:: count: 0
Output::
Synchronizing program
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

CreatingProgramWith::
  roots: ["/home/src/workspaces/project/main.ts","/home/src/workspaces/project/fileWithImports.ts","/home/src/workspaces/project/randomFileForImport.ts","/home/src/workspaces/project/a/fileWithImports.ts","/home/src/workspaces/project/b/ba/fileWithImports.ts","/home/src/workspaces/project/b/randomFileForImport.ts","/home/src/workspaces/project/c/ca/fileWithImports.ts","/home/src/workspaces/project/c/ca/caa/randomFileForImport.ts","/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts","/home/src/workspaces/project/c/cb/fileWithImports.ts","/home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts","/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts","/home/src/workspaces/project/d/da/daa/fileWithImports.ts","/home/src/workspaces/project/d/da/fileWithImports.ts","/home/src/workspaces/project/e/ea/fileWithImports.ts","/home/src/workspaces/project/e/ea/eaa/fileWithImports.ts","/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts","/home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts","/home/src/workspaces/project/f/fa/faa/x/y/z/randomFileForImport.ts","/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts"]
  options: {"traceResolution":true,"watch":true,"project":"/home/src/workspaces/project/tsconfig.json","explainFiles":true,"extendedDiagnostics":true,"configFilePath":"/home/src/workspaces/project/tsconfig.json"}
File '/home/src/workspaces/project/node_modules/pkg0/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/node_modules/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/fileWithImports.ts' of old program, it was not resolved.
File '/home/src/workspaces/project/node_modules/pkg0/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/node_modules/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/randomFileForImport.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/randomFileForImport.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/a/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/a/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/b/ba/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/b/ba/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/b/randomFileForImport.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/b/randomFileForImport.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/c/ca/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/c/ca/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/c/ca/caa/randomFileForImport.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/c/ca/caa/randomFileForImport.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/c/cb/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/c/cb/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/d/da/daa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/d/da/daa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/d/da/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/d/da/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/e/ea/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/e/ea/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/e/ea/eaa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/e/ea/eaa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts' of old program, it was not resolved.
======== Resolving module 'pkg1' from '/home/src/workspaces/project/f/fa/faa/x/y/z/randomFileForImport.ts'. ========
Module resolution kind is not specified, using 'Node10'.
Loading module 'pkg1' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Directory '/home/src/workspaces/project/f/fa/faa/x/y/z/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/workspaces/project/f/fa/faa/x/y/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/workspaces/project/f/fa/faa/x/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/home/src/workspaces/project/f/fa/faa'.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/f/fa/faa/x/y/z/randomFileForImport.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts' of old program, it was not resolved.
[96ma/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mb/ba/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mb/randomFileForImport.ts[0m:[93m1[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m1[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mc/ca/caa/caaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mc/ca/caa/randomFileForImport.ts[0m:[93m1[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m1[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mc/ca/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mc/cb/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96md/da/daa/daaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96md/da/daa/daaa/x/y/z/randomFileForImport.ts[0m:[93m1[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m1[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96md/da/daa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96md/da/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96me/ea/eaa/eaaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96me/ea/eaa/eaaa/x/y/z/randomFileForImport.ts[0m:[93m1[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m1[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96me/ea/eaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96me/ea/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mf/fa/faa/faaa/fileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mf/fa/faa/x/y/z/randomFileForImport.ts[0m:[93m1[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m1[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mfileWithImports.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

[96mrandomFileForImport.ts[0m:[93m1[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m1[0m import type { ImportInterface1 } from "pkg1";
[7m [0m [91m                                      ~~~~~~[0m

../../tslibs/TS/Lib/lib.d.ts
  Default library for target 'es5'
main.ts
  Part of 'files' list in tsconfig.json
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
  Imported via "pkg0" from file 'd/da/daa/daaa/x/y/z/randomFileForImport.ts'
  Imported via "pkg0" from file 'd/da/daa/daaa/fileWithImports.ts'
  Imported via "pkg0" from file 'd/da/daa/fileWithImports.ts'
  Imported via "pkg0" from file 'd/da/fileWithImports.ts'
  Imported via "pkg0" from file 'e/ea/fileWithImports.ts'
  Imported via "pkg0" from file 'e/ea/eaa/fileWithImports.ts'
  Imported via "pkg0" from file 'e/ea/eaa/eaaa/fileWithImports.ts'
  Imported via "pkg0" from file 'e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts'
  Imported via "pkg0" from file 'f/fa/faa/x/y/z/randomFileForImport.ts'
  Imported via "pkg0" from file 'f/fa/faa/faaa/fileWithImports.ts'
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
d/da/daa/daaa/x/y/z/randomFileForImport.ts
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
e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts
  Part of 'files' list in tsconfig.json
f/fa/faa/x/y/z/randomFileForImport.ts
  Part of 'files' list in tsconfig.json
f/fa/faa/faaa/fileWithImports.ts
  Part of 'files' list in tsconfig.json
[[90mHH:MM:SS AM[0m] Found 19 errors. Watching for file changes.



//// [/home/src/workspaces/project/f/fa/faa/x/y/z/randomFileForImport.js] file written with same contents


Program root files: [
  "/home/src/workspaces/project/main.ts",
  "/home/src/workspaces/project/fileWithImports.ts",
  "/home/src/workspaces/project/randomFileForImport.ts",
  "/home/src/workspaces/project/a/fileWithImports.ts",
  "/home/src/workspaces/project/b/ba/fileWithImports.ts",
  "/home/src/workspaces/project/b/randomFileForImport.ts",
  "/home/src/workspaces/project/c/ca/fileWithImports.ts",
  "/home/src/workspaces/project/c/ca/caa/randomFileForImport.ts",
  "/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts",
  "/home/src/workspaces/project/c/cb/fileWithImports.ts",
  "/home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts",
  "/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts",
  "/home/src/workspaces/project/d/da/daa/fileWithImports.ts",
  "/home/src/workspaces/project/d/da/fileWithImports.ts",
  "/home/src/workspaces/project/e/ea/fileWithImports.ts",
  "/home/src/workspaces/project/e/ea/eaa/fileWithImports.ts",
  "/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts",
  "/home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts",
  "/home/src/workspaces/project/f/fa/faa/x/y/z/randomFileForImport.ts",
  "/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts"
]
Program options: {
  "traceResolution": true,
  "watch": true,
  "project": "/home/src/workspaces/project/tsconfig.json",
  "explainFiles": true,
  "extendedDiagnostics": true,
  "configFilePath": "/home/src/workspaces/project/tsconfig.json"
}
Program structureReused: SafeModules
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/project/main.ts
/home/src/workspaces/project/node_modules/pkg0/index.d.ts
/home/src/workspaces/project/fileWithImports.ts
/home/src/workspaces/project/randomFileForImport.ts
/home/src/workspaces/project/a/fileWithImports.ts
/home/src/workspaces/project/b/ba/fileWithImports.ts
/home/src/workspaces/project/b/randomFileForImport.ts
/home/src/workspaces/project/c/ca/fileWithImports.ts
/home/src/workspaces/project/c/ca/caa/randomFileForImport.ts
/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts
/home/src/workspaces/project/c/cb/fileWithImports.ts
/home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts
/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts
/home/src/workspaces/project/d/da/daa/fileWithImports.ts
/home/src/workspaces/project/d/da/fileWithImports.ts
/home/src/workspaces/project/e/ea/fileWithImports.ts
/home/src/workspaces/project/e/ea/eaa/fileWithImports.ts
/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts
/home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts
/home/src/workspaces/project/f/fa/faa/x/y/z/randomFileForImport.ts
/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts

Semantic diagnostics in builder refreshed for::
/home/src/workspaces/project/f/fa/faa/x/y/z/randomFileForImport.ts

Shape signatures in builder refreshed for::
/home/src/workspaces/project/f/fa/faa/x/y/z/randomfileforimport.ts (computed .d.ts)

exitCode:: ExitStatus.undefined

Change:: add file for unresolved import and random edit

Input::
//// [/home/src/workspaces/project/randomFileForImport.ts]
import type { ImportInterface1 } from "pkg1";
import type { ImportInterface0 } from "pkg0";
export const x = 10;export const y = 10;

//// [/home/src/workspaces/project/node_modules/pkg1/index.d.ts]
export interface ImportInterface1 {}


Output::
DirectoryWatcher:: Triggered with /home/src/workspaces/project/node_modules/pkg1 :: WatchInfo: /home/src/workspaces/project/node_modules 1 undefined Failed Lookup Locations
Scheduling invalidateFailedLookup
Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/workspaces/project/node_modules/pkg1 :: WatchInfo: /home/src/workspaces/project/node_modules 1 undefined Failed Lookup Locations
DirectoryWatcher:: Triggered with /home/src/workspaces/project/node_modules/pkg1/index.d.ts :: WatchInfo: /home/src/workspaces/project/node_modules 1 undefined Failed Lookup Locations
Scheduling invalidateFailedLookup, Cancelled earlier one
Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/workspaces/project/node_modules/pkg1/index.d.ts :: WatchInfo: /home/src/workspaces/project/node_modules 1 undefined Failed Lookup Locations
FileWatcher:: Triggered with /home/src/workspaces/project/randomFileForImport.ts 1:: WatchInfo: /home/src/workspaces/project/randomFileForImport.ts 250 undefined Source file
Scheduling update
Elapsed:: *ms FileWatcher:: Triggered with /home/src/workspaces/project/randomFileForImport.ts 1:: WatchInfo: /home/src/workspaces/project/randomFileForImport.ts 250 undefined Source file


Timeout callback:: count: 2
14: timerToInvalidateFailedLookupResolutions *new*
15: timerToUpdateProgram *new*

Before running Timeout callback:: count: 2
14: timerToInvalidateFailedLookupResolutions
15: timerToUpdateProgram

After running Timeout callback:: count: 1
Output::
Scheduling update



Timeout callback:: count: 1
15: timerToUpdateProgram *deleted*
16: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
16: timerToUpdateProgram

Host is moving to new time
After running Timeout callback:: count: 0
Output::
Synchronizing program
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

CreatingProgramWith::
  roots: ["/home/src/workspaces/project/main.ts","/home/src/workspaces/project/fileWithImports.ts","/home/src/workspaces/project/randomFileForImport.ts","/home/src/workspaces/project/a/fileWithImports.ts","/home/src/workspaces/project/b/ba/fileWithImports.ts","/home/src/workspaces/project/b/randomFileForImport.ts","/home/src/workspaces/project/c/ca/fileWithImports.ts","/home/src/workspaces/project/c/ca/caa/randomFileForImport.ts","/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts","/home/src/workspaces/project/c/cb/fileWithImports.ts","/home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts","/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts","/home/src/workspaces/project/d/da/daa/fileWithImports.ts","/home/src/workspaces/project/d/da/fileWithImports.ts","/home/src/workspaces/project/e/ea/fileWithImports.ts","/home/src/workspaces/project/e/ea/eaa/fileWithImports.ts","/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts","/home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts","/home/src/workspaces/project/f/fa/faa/x/y/z/randomFileForImport.ts","/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts"]
  options: {"traceResolution":true,"watch":true,"project":"/home/src/workspaces/project/tsconfig.json","explainFiles":true,"extendedDiagnostics":true,"configFilePath":"/home/src/workspaces/project/tsconfig.json"}
File '/home/src/workspaces/project/node_modules/pkg0/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/node_modules/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/home/src/workspaces/project/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'Node10'.
Loading module 'pkg1' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
File '/home/src/workspaces/project/node_modules/pkg1/package.json' does not exist.
File '/home/src/workspaces/project/node_modules/pkg1.ts' does not exist.
File '/home/src/workspaces/project/node_modules/pkg1.tsx' does not exist.
File '/home/src/workspaces/project/node_modules/pkg1.d.ts' does not exist.
File '/home/src/workspaces/project/node_modules/pkg1/index.ts' does not exist.
File '/home/src/workspaces/project/node_modules/pkg1/index.tsx' does not exist.
File '/home/src/workspaces/project/node_modules/pkg1/index.d.ts' exists - use it as a name resolution result.
Resolving real path for '/home/src/workspaces/project/node_modules/pkg1/index.d.ts', result '/home/src/workspaces/project/node_modules/pkg1/index.d.ts'.
======== Module name 'pkg1' was successfully resolved to '/home/src/workspaces/project/node_modules/pkg1/index.d.ts'. ========
File '/home/src/workspaces/project/node_modules/pkg0/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/node_modules/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/node_modules/pkg1/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/node_modules/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules/pkg1/index.d.ts 250 undefined Source file
======== Resolving module 'pkg1' from '/home/src/workspaces/project/randomFileForImport.ts'. ========
Resolution for module 'pkg1' was found in cache from location '/home/src/workspaces/project'.
======== Module name 'pkg1' was successfully resolved to '/home/src/workspaces/project/node_modules/pkg1/index.d.ts'. ========
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/randomFileForImport.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/a/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/home/src/workspaces/project/a/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'Node10'.
Loading module 'pkg1' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Directory '/home/src/workspaces/project/a/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/home/src/workspaces/project'.
======== Module name 'pkg1' was successfully resolved to '/home/src/workspaces/project/node_modules/pkg1/index.d.ts'. ========
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/b/ba/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/home/src/workspaces/project/b/ba/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'Node10'.
Loading module 'pkg1' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Directory '/home/src/workspaces/project/b/ba/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/workspaces/project/b/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/home/src/workspaces/project'.
======== Module name 'pkg1' was successfully resolved to '/home/src/workspaces/project/node_modules/pkg1/index.d.ts'. ========
======== Resolving module 'pkg1' from '/home/src/workspaces/project/b/randomFileForImport.ts'. ========
Module resolution kind is not specified, using 'Node10'.
Loading module 'pkg1' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Resolution for module 'pkg1' was found in cache from location '/home/src/workspaces/project/b'.
======== Module name 'pkg1' was successfully resolved to '/home/src/workspaces/project/node_modules/pkg1/index.d.ts'. ========
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/b/randomFileForImport.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/c/ca/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/home/src/workspaces/project/c/ca/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'Node10'.
Loading module 'pkg1' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Directory '/home/src/workspaces/project/c/ca/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/workspaces/project/c/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/home/src/workspaces/project'.
======== Module name 'pkg1' was successfully resolved to '/home/src/workspaces/project/node_modules/pkg1/index.d.ts'. ========
======== Resolving module 'pkg1' from '/home/src/workspaces/project/c/ca/caa/randomFileForImport.ts'. ========
Module resolution kind is not specified, using 'Node10'.
Loading module 'pkg1' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Directory '/home/src/workspaces/project/c/ca/caa/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/home/src/workspaces/project/c/ca'.
======== Module name 'pkg1' was successfully resolved to '/home/src/workspaces/project/node_modules/pkg1/index.d.ts'. ========
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/c/ca/caa/randomFileForImport.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'Node10'.
Loading module 'pkg1' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Directory '/home/src/workspaces/project/c/ca/caa/caaa/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/home/src/workspaces/project/c/ca/caa'.
======== Module name 'pkg1' was successfully resolved to '/home/src/workspaces/project/node_modules/pkg1/index.d.ts'. ========
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/c/cb/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/home/src/workspaces/project/c/cb/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'Node10'.
Loading module 'pkg1' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Directory '/home/src/workspaces/project/c/cb/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/home/src/workspaces/project/c'.
======== Module name 'pkg1' was successfully resolved to '/home/src/workspaces/project/node_modules/pkg1/index.d.ts'. ========
======== Resolving module 'pkg1' from '/home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts'. ========
Module resolution kind is not specified, using 'Node10'.
Loading module 'pkg1' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Directory '/home/src/workspaces/project/d/da/daa/daaa/x/y/z/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/workspaces/project/d/da/daa/daaa/x/y/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/workspaces/project/d/da/daa/daaa/x/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/workspaces/project/d/da/daa/daaa/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/workspaces/project/d/da/daa/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/workspaces/project/d/da/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/workspaces/project/d/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/home/src/workspaces/project'.
======== Module name 'pkg1' was successfully resolved to '/home/src/workspaces/project/node_modules/pkg1/index.d.ts'. ========
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'Node10'.
Loading module 'pkg1' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Resolution for module 'pkg1' was found in cache from location '/home/src/workspaces/project/d/da/daa/daaa'.
======== Module name 'pkg1' was successfully resolved to '/home/src/workspaces/project/node_modules/pkg1/index.d.ts'. ========
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/d/da/daa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/home/src/workspaces/project/d/da/daa/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'Node10'.
Loading module 'pkg1' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Resolution for module 'pkg1' was found in cache from location '/home/src/workspaces/project/d/da/daa'.
======== Module name 'pkg1' was successfully resolved to '/home/src/workspaces/project/node_modules/pkg1/index.d.ts'. ========
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/d/da/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/home/src/workspaces/project/d/da/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'Node10'.
Loading module 'pkg1' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Resolution for module 'pkg1' was found in cache from location '/home/src/workspaces/project/d/da'.
======== Module name 'pkg1' was successfully resolved to '/home/src/workspaces/project/node_modules/pkg1/index.d.ts'. ========
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/e/ea/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/home/src/workspaces/project/e/ea/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'Node10'.
Loading module 'pkg1' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Directory '/home/src/workspaces/project/e/ea/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/workspaces/project/e/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/home/src/workspaces/project'.
======== Module name 'pkg1' was successfully resolved to '/home/src/workspaces/project/node_modules/pkg1/index.d.ts'. ========
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/e/ea/eaa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/home/src/workspaces/project/e/ea/eaa/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'Node10'.
Loading module 'pkg1' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Directory '/home/src/workspaces/project/e/ea/eaa/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/home/src/workspaces/project/e/ea'.
======== Module name 'pkg1' was successfully resolved to '/home/src/workspaces/project/node_modules/pkg1/index.d.ts'. ========
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'Node10'.
Loading module 'pkg1' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Directory '/home/src/workspaces/project/e/ea/eaa/eaaa/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/home/src/workspaces/project/e/ea/eaa'.
======== Module name 'pkg1' was successfully resolved to '/home/src/workspaces/project/node_modules/pkg1/index.d.ts'. ========
======== Resolving module 'pkg1' from '/home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts'. ========
Module resolution kind is not specified, using 'Node10'.
Loading module 'pkg1' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Directory '/home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/workspaces/project/e/ea/eaa/eaaa/x/y/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/workspaces/project/e/ea/eaa/eaaa/x/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/home/src/workspaces/project/e/ea/eaa/eaaa'.
======== Module name 'pkg1' was successfully resolved to '/home/src/workspaces/project/node_modules/pkg1/index.d.ts'. ========
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/home/src/workspaces/project/f/fa/faa/x/y/z/randomFileForImport.ts'. ========
Module resolution kind is not specified, using 'Node10'.
Loading module 'pkg1' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Directory '/home/src/workspaces/project/f/fa/faa/x/y/z/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/workspaces/project/f/fa/faa/x/y/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/workspaces/project/f/fa/faa/x/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/workspaces/project/f/fa/faa/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/workspaces/project/f/fa/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/workspaces/project/f/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/home/src/workspaces/project'.
======== Module name 'pkg1' was successfully resolved to '/home/src/workspaces/project/node_modules/pkg1/index.d.ts'. ========
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/f/fa/faa/x/y/z/randomFileForImport.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'Node10'.
Loading module 'pkg1' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Directory '/home/src/workspaces/project/f/fa/faa/faaa/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/home/src/workspaces/project/f/fa/faa'.
======== Module name 'pkg1' was successfully resolved to '/home/src/workspaces/project/node_modules/pkg1/index.d.ts'. ========
FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules/pkg1/package.json 2000 undefined File location affecting resolution
DirectoryWatcher:: Close:: WatchInfo: /home/src/workspaces/node_modules 1 undefined Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /home/src/workspaces/node_modules 1 undefined Failed Lookup Locations
../../tslibs/TS/Lib/lib.d.ts
  Default library for target 'es5'
main.ts
  Part of 'files' list in tsconfig.json
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
  Imported via "pkg0" from file 'd/da/daa/daaa/x/y/z/randomFileForImport.ts'
  Imported via "pkg0" from file 'd/da/daa/daaa/fileWithImports.ts'
  Imported via "pkg0" from file 'd/da/daa/fileWithImports.ts'
  Imported via "pkg0" from file 'd/da/fileWithImports.ts'
  Imported via "pkg0" from file 'e/ea/fileWithImports.ts'
  Imported via "pkg0" from file 'e/ea/eaa/fileWithImports.ts'
  Imported via "pkg0" from file 'e/ea/eaa/eaaa/fileWithImports.ts'
  Imported via "pkg0" from file 'e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts'
  Imported via "pkg0" from file 'f/fa/faa/x/y/z/randomFileForImport.ts'
  Imported via "pkg0" from file 'f/fa/faa/faaa/fileWithImports.ts'
node_modules/pkg1/index.d.ts
  Imported via "pkg1" from file 'fileWithImports.ts'
  Imported via "pkg1" from file 'randomFileForImport.ts'
  Imported via "pkg1" from file 'a/fileWithImports.ts'
  Imported via "pkg1" from file 'b/ba/fileWithImports.ts'
  Imported via "pkg1" from file 'b/randomFileForImport.ts'
  Imported via "pkg1" from file 'c/ca/fileWithImports.ts'
  Imported via "pkg1" from file 'c/ca/caa/randomFileForImport.ts'
  Imported via "pkg1" from file 'c/ca/caa/caaa/fileWithImports.ts'
  Imported via "pkg1" from file 'c/cb/fileWithImports.ts'
  Imported via "pkg1" from file 'd/da/daa/daaa/x/y/z/randomFileForImport.ts'
  Imported via "pkg1" from file 'd/da/daa/daaa/fileWithImports.ts'
  Imported via "pkg1" from file 'd/da/daa/fileWithImports.ts'
  Imported via "pkg1" from file 'd/da/fileWithImports.ts'
  Imported via "pkg1" from file 'e/ea/fileWithImports.ts'
  Imported via "pkg1" from file 'e/ea/eaa/fileWithImports.ts'
  Imported via "pkg1" from file 'e/ea/eaa/eaaa/fileWithImports.ts'
  Imported via "pkg1" from file 'e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts'
  Imported via "pkg1" from file 'f/fa/faa/x/y/z/randomFileForImport.ts'
  Imported via "pkg1" from file 'f/fa/faa/faaa/fileWithImports.ts'
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
d/da/daa/daaa/x/y/z/randomFileForImport.ts
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
e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts
  Part of 'files' list in tsconfig.json
f/fa/faa/x/y/z/randomFileForImport.ts
  Part of 'files' list in tsconfig.json
f/fa/faa/faaa/fileWithImports.ts
  Part of 'files' list in tsconfig.json
[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/home/src/workspaces/project/fileWithImports.js] file written with same contents
//// [/home/src/workspaces/project/randomFileForImport.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.y = exports.x = void 0;
exports.x = 10;
exports.y = 10;


//// [/home/src/workspaces/project/a/fileWithImports.js] file written with same contents
//// [/home/src/workspaces/project/b/ba/fileWithImports.js] file written with same contents
//// [/home/src/workspaces/project/b/randomFileForImport.js] file written with same contents
//// [/home/src/workspaces/project/c/ca/fileWithImports.js] file written with same contents
//// [/home/src/workspaces/project/c/ca/caa/randomFileForImport.js] file written with same contents
//// [/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.js] file written with same contents
//// [/home/src/workspaces/project/c/cb/fileWithImports.js] file written with same contents
//// [/home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.js] file written with same contents
//// [/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.js] file written with same contents
//// [/home/src/workspaces/project/d/da/daa/fileWithImports.js] file written with same contents
//// [/home/src/workspaces/project/d/da/fileWithImports.js] file written with same contents
//// [/home/src/workspaces/project/e/ea/fileWithImports.js] file written with same contents
//// [/home/src/workspaces/project/e/ea/eaa/fileWithImports.js] file written with same contents
//// [/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.js] file written with same contents
//// [/home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.js] file written with same contents
//// [/home/src/workspaces/project/f/fa/faa/x/y/z/randomFileForImport.js] file written with same contents
//// [/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.js] file written with same contents

PolledWatches::
/home/src/workspaces/node_modules/@types:
  {"pollingInterval":500}
/home/src/workspaces/package.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/node_modules/@types:
  {"pollingInterval":500}
/home/src/workspaces/project/node_modules/package.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/node_modules/pkg0/package.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/node_modules/pkg1/package.json: *new*
  {"pollingInterval":2000}
/home/src/workspaces/project/package.json:
  {"pollingInterval":2000}

PolledWatches *deleted*::
/home/src/workspaces/node_modules:
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts:
  {}
/home/src/workspaces/project/a/fileWithImports.ts:
  {}
/home/src/workspaces/project/b/ba/fileWithImports.ts:
  {}
/home/src/workspaces/project/b/randomFileForImport.ts:
  {}
/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts:
  {}
/home/src/workspaces/project/c/ca/caa/randomFileForImport.ts:
  {}
/home/src/workspaces/project/c/ca/fileWithImports.ts:
  {}
/home/src/workspaces/project/c/cb/fileWithImports.ts:
  {}
/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts:
  {}
/home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts:
  {}
/home/src/workspaces/project/d/da/daa/fileWithImports.ts:
  {}
/home/src/workspaces/project/d/da/fileWithImports.ts:
  {}
/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts:
  {}
/home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts:
  {}
/home/src/workspaces/project/e/ea/eaa/fileWithImports.ts:
  {}
/home/src/workspaces/project/e/ea/fileWithImports.ts:
  {}
/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts:
  {}
/home/src/workspaces/project/f/fa/faa/x/y/z/randomFileForImport.ts:
  {}
/home/src/workspaces/project/fileWithImports.ts:
  {}
/home/src/workspaces/project/main.ts:
  {}
/home/src/workspaces/project/node_modules/pkg0/index.d.ts:
  {}
/home/src/workspaces/project/node_modules/pkg1/index.d.ts: *new*
  {}
/home/src/workspaces/project/randomFileForImport.ts:
  {}
/home/src/workspaces/project/tsconfig.json:
  {}

FsWatchesRecursive::
/home/src/workspaces/project/a:
  {}
/home/src/workspaces/project/b:
  {}
/home/src/workspaces/project/c:
  {}
/home/src/workspaces/project/d:
  {}
/home/src/workspaces/project/e:
  {}
/home/src/workspaces/project/f:
  {}
/home/src/workspaces/project/node_modules:
  {}


Program root files: [
  "/home/src/workspaces/project/main.ts",
  "/home/src/workspaces/project/fileWithImports.ts",
  "/home/src/workspaces/project/randomFileForImport.ts",
  "/home/src/workspaces/project/a/fileWithImports.ts",
  "/home/src/workspaces/project/b/ba/fileWithImports.ts",
  "/home/src/workspaces/project/b/randomFileForImport.ts",
  "/home/src/workspaces/project/c/ca/fileWithImports.ts",
  "/home/src/workspaces/project/c/ca/caa/randomFileForImport.ts",
  "/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts",
  "/home/src/workspaces/project/c/cb/fileWithImports.ts",
  "/home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts",
  "/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts",
  "/home/src/workspaces/project/d/da/daa/fileWithImports.ts",
  "/home/src/workspaces/project/d/da/fileWithImports.ts",
  "/home/src/workspaces/project/e/ea/fileWithImports.ts",
  "/home/src/workspaces/project/e/ea/eaa/fileWithImports.ts",
  "/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts",
  "/home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts",
  "/home/src/workspaces/project/f/fa/faa/x/y/z/randomFileForImport.ts",
  "/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts"
]
Program options: {
  "traceResolution": true,
  "watch": true,
  "project": "/home/src/workspaces/project/tsconfig.json",
  "explainFiles": true,
  "extendedDiagnostics": true,
  "configFilePath": "/home/src/workspaces/project/tsconfig.json"
}
Program structureReused: SafeModules
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/project/main.ts
/home/src/workspaces/project/node_modules/pkg0/index.d.ts
/home/src/workspaces/project/node_modules/pkg1/index.d.ts
/home/src/workspaces/project/fileWithImports.ts
/home/src/workspaces/project/randomFileForImport.ts
/home/src/workspaces/project/a/fileWithImports.ts
/home/src/workspaces/project/b/ba/fileWithImports.ts
/home/src/workspaces/project/b/randomFileForImport.ts
/home/src/workspaces/project/c/ca/fileWithImports.ts
/home/src/workspaces/project/c/ca/caa/randomFileForImport.ts
/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts
/home/src/workspaces/project/c/cb/fileWithImports.ts
/home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts
/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts
/home/src/workspaces/project/d/da/daa/fileWithImports.ts
/home/src/workspaces/project/d/da/fileWithImports.ts
/home/src/workspaces/project/e/ea/fileWithImports.ts
/home/src/workspaces/project/e/ea/eaa/fileWithImports.ts
/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts
/home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts
/home/src/workspaces/project/f/fa/faa/x/y/z/randomFileForImport.ts
/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts

Semantic diagnostics in builder refreshed for::
/home/src/workspaces/project/node_modules/pkg1/index.d.ts
/home/src/workspaces/project/fileWithImports.ts
/home/src/workspaces/project/randomFileForImport.ts
/home/src/workspaces/project/a/fileWithImports.ts
/home/src/workspaces/project/b/ba/fileWithImports.ts
/home/src/workspaces/project/b/randomFileForImport.ts
/home/src/workspaces/project/c/ca/fileWithImports.ts
/home/src/workspaces/project/c/ca/caa/randomFileForImport.ts
/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts
/home/src/workspaces/project/c/cb/fileWithImports.ts
/home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts
/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts
/home/src/workspaces/project/d/da/daa/fileWithImports.ts
/home/src/workspaces/project/d/da/fileWithImports.ts
/home/src/workspaces/project/e/ea/fileWithImports.ts
/home/src/workspaces/project/e/ea/eaa/fileWithImports.ts
/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts
/home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts
/home/src/workspaces/project/f/fa/faa/x/y/z/randomFileForImport.ts
/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts

Shape signatures in builder refreshed for::
/home/src/workspaces/project/node_modules/pkg1/index.d.ts (used version)
/home/src/workspaces/project/f/fa/faa/faaa/filewithimports.ts (computed .d.ts)
/home/src/workspaces/project/f/fa/faa/x/y/z/randomfileforimport.ts (computed .d.ts)
/home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts (computed .d.ts)
/home/src/workspaces/project/e/ea/eaa/eaaa/filewithimports.ts (computed .d.ts)
/home/src/workspaces/project/e/ea/eaa/filewithimports.ts (computed .d.ts)
/home/src/workspaces/project/e/ea/filewithimports.ts (computed .d.ts)
/home/src/workspaces/project/d/da/filewithimports.ts (computed .d.ts)
/home/src/workspaces/project/d/da/daa/filewithimports.ts (computed .d.ts)
/home/src/workspaces/project/d/da/daa/daaa/filewithimports.ts (computed .d.ts)
/home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomfileforimport.ts (computed .d.ts)
/home/src/workspaces/project/c/cb/filewithimports.ts (computed .d.ts)
/home/src/workspaces/project/c/ca/caa/caaa/filewithimports.ts (computed .d.ts)
/home/src/workspaces/project/c/ca/caa/randomfileforimport.ts (computed .d.ts)
/home/src/workspaces/project/c/ca/filewithimports.ts (computed .d.ts)
/home/src/workspaces/project/b/randomfileforimport.ts (computed .d.ts)
/home/src/workspaces/project/b/ba/filewithimports.ts (computed .d.ts)
/home/src/workspaces/project/a/filewithimports.ts (computed .d.ts)
/home/src/workspaces/project/randomfileforimport.ts (computed .d.ts)
/home/src/workspaces/project/filewithimports.ts (computed .d.ts)

exitCode:: ExitStatus.undefined

Change:: delete file b/ba/fileWithImports.ts

Input::
//// [/home/src/workspaces/project/tsconfig.json]
{
  "compilerOptions": {
    "traceResolution": true
  },
  "files": [
    "main.ts",
    "fileWithImports.ts",
    "randomFileForImport.ts",
    "a/fileWithImports.ts",
    "b/randomFileForImport.ts",
    "c/ca/fileWithImports.ts",
    "c/ca/caa/randomFileForImport.ts",
    "c/ca/caa/caaa/fileWithImports.ts",
    "c/cb/fileWithImports.ts",
    "d/da/daa/daaa/x/y/z/randomFileForImport.ts",
    "d/da/daa/daaa/fileWithImports.ts",
    "d/da/daa/fileWithImports.ts",
    "d/da/fileWithImports.ts",
    "e/ea/fileWithImports.ts",
    "e/ea/eaa/fileWithImports.ts",
    "e/ea/eaa/eaaa/fileWithImports.ts",
    "e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts",
    "f/fa/faa/x/y/z/randomFileForImport.ts",
    "f/fa/faa/faaa/fileWithImports.ts"
  ]
}

//// [/home/src/workspaces/project/b/ba/fileWithImports.ts] deleted

Output::
FileWatcher:: Triggered with /home/src/workspaces/project/b/ba/fileWithImports.ts 2:: WatchInfo: /home/src/workspaces/project/b/ba/fileWithImports.ts 250 undefined Source file
Scheduling update
Elapsed:: *ms FileWatcher:: Triggered with /home/src/workspaces/project/b/ba/fileWithImports.ts 2:: WatchInfo: /home/src/workspaces/project/b/ba/fileWithImports.ts 250 undefined Source file
DirectoryWatcher:: Triggered with /home/src/workspaces/project/b/ba/fileWithImports.ts :: WatchInfo: /home/src/workspaces/project/b 1 undefined Failed Lookup Locations
Scheduling invalidateFailedLookup
Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/workspaces/project/b/ba/fileWithImports.ts :: WatchInfo: /home/src/workspaces/project/b 1 undefined Failed Lookup Locations
FileWatcher:: Triggered with /home/src/workspaces/project/tsconfig.json 1:: WatchInfo: /home/src/workspaces/project/tsconfig.json 2000 undefined Config file
Scheduling update
Elapsed:: *ms FileWatcher:: Triggered with /home/src/workspaces/project/tsconfig.json 1:: WatchInfo: /home/src/workspaces/project/tsconfig.json 2000 undefined Config file


Timeout callback:: count: 2
18: timerToInvalidateFailedLookupResolutions *new*
19: timerToUpdateProgram *new*

Before running Timeout callback:: count: 2
18: timerToInvalidateFailedLookupResolutions
19: timerToUpdateProgram

Host is moving to new time
After running Timeout callback:: count: 0
Output::
Reloading config file: /home/src/workspaces/project/tsconfig.json
Synchronizing program
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

CreatingProgramWith::
  roots: ["/home/src/workspaces/project/main.ts","/home/src/workspaces/project/fileWithImports.ts","/home/src/workspaces/project/randomFileForImport.ts","/home/src/workspaces/project/a/fileWithImports.ts","/home/src/workspaces/project/b/randomFileForImport.ts","/home/src/workspaces/project/c/ca/fileWithImports.ts","/home/src/workspaces/project/c/ca/caa/randomFileForImport.ts","/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts","/home/src/workspaces/project/c/cb/fileWithImports.ts","/home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts","/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts","/home/src/workspaces/project/d/da/daa/fileWithImports.ts","/home/src/workspaces/project/d/da/fileWithImports.ts","/home/src/workspaces/project/e/ea/fileWithImports.ts","/home/src/workspaces/project/e/ea/eaa/fileWithImports.ts","/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts","/home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts","/home/src/workspaces/project/f/fa/faa/x/y/z/randomFileForImport.ts","/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts"]
  options: {"traceResolution":true,"watch":true,"project":"/home/src/workspaces/project/tsconfig.json","explainFiles":true,"extendedDiagnostics":true,"configFilePath":"/home/src/workspaces/project/tsconfig.json"}
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg1/index.d.ts'.
File '/home/src/workspaces/project/node_modules/pkg0/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/node_modules/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/node_modules/pkg1/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/node_modules/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/randomFileForImport.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg1/index.d.ts'.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/randomFileForImport.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/a/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/a/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg1/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/b/randomFileForImport.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg1/index.d.ts'.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/b/randomFileForImport.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/c/ca/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/c/ca/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg1/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/c/ca/caa/randomFileForImport.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg1/index.d.ts'.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/c/ca/caa/randomFileForImport.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg1/index.d.ts'.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/c/cb/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/c/cb/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg1/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg1/index.d.ts'.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg1/index.d.ts'.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/d/da/daa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/d/da/daa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg1/index.d.ts'.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/d/da/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/d/da/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg1/index.d.ts'.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/e/ea/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/e/ea/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg1/index.d.ts'.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/e/ea/eaa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/e/ea/eaa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg1/index.d.ts'.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg1/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg1/index.d.ts'.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/f/fa/faa/x/y/z/randomFileForImport.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg1/index.d.ts'.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/f/fa/faa/x/y/z/randomFileForImport.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg1/index.d.ts'.
FileWatcher:: Close:: WatchInfo: /home/src/workspaces/project/b/ba/fileWithImports.ts 250 undefined Source file
../../tslibs/TS/Lib/lib.d.ts
  Default library for target 'es5'
main.ts
  Part of 'files' list in tsconfig.json
node_modules/pkg0/index.d.ts
  Imported via "pkg0" from file 'fileWithImports.ts'
  Imported via "pkg0" from file 'randomFileForImport.ts'
  Imported via "pkg0" from file 'a/fileWithImports.ts'
  Imported via "pkg0" from file 'b/randomFileForImport.ts'
  Imported via "pkg0" from file 'c/ca/fileWithImports.ts'
  Imported via "pkg0" from file 'c/ca/caa/randomFileForImport.ts'
  Imported via "pkg0" from file 'c/ca/caa/caaa/fileWithImports.ts'
  Imported via "pkg0" from file 'c/cb/fileWithImports.ts'
  Imported via "pkg0" from file 'd/da/daa/daaa/x/y/z/randomFileForImport.ts'
  Imported via "pkg0" from file 'd/da/daa/daaa/fileWithImports.ts'
  Imported via "pkg0" from file 'd/da/daa/fileWithImports.ts'
  Imported via "pkg0" from file 'd/da/fileWithImports.ts'
  Imported via "pkg0" from file 'e/ea/fileWithImports.ts'
  Imported via "pkg0" from file 'e/ea/eaa/fileWithImports.ts'
  Imported via "pkg0" from file 'e/ea/eaa/eaaa/fileWithImports.ts'
  Imported via "pkg0" from file 'e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts'
  Imported via "pkg0" from file 'f/fa/faa/x/y/z/randomFileForImport.ts'
  Imported via "pkg0" from file 'f/fa/faa/faaa/fileWithImports.ts'
node_modules/pkg1/index.d.ts
  Imported via "pkg1" from file 'fileWithImports.ts'
  Imported via "pkg1" from file 'randomFileForImport.ts'
  Imported via "pkg1" from file 'a/fileWithImports.ts'
  Imported via "pkg1" from file 'b/randomFileForImport.ts'
  Imported via "pkg1" from file 'c/ca/fileWithImports.ts'
  Imported via "pkg1" from file 'c/ca/caa/randomFileForImport.ts'
  Imported via "pkg1" from file 'c/ca/caa/caaa/fileWithImports.ts'
  Imported via "pkg1" from file 'c/cb/fileWithImports.ts'
  Imported via "pkg1" from file 'd/da/daa/daaa/x/y/z/randomFileForImport.ts'
  Imported via "pkg1" from file 'd/da/daa/daaa/fileWithImports.ts'
  Imported via "pkg1" from file 'd/da/daa/fileWithImports.ts'
  Imported via "pkg1" from file 'd/da/fileWithImports.ts'
  Imported via "pkg1" from file 'e/ea/fileWithImports.ts'
  Imported via "pkg1" from file 'e/ea/eaa/fileWithImports.ts'
  Imported via "pkg1" from file 'e/ea/eaa/eaaa/fileWithImports.ts'
  Imported via "pkg1" from file 'e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts'
  Imported via "pkg1" from file 'f/fa/faa/x/y/z/randomFileForImport.ts'
  Imported via "pkg1" from file 'f/fa/faa/faaa/fileWithImports.ts'
fileWithImports.ts
  Part of 'files' list in tsconfig.json
randomFileForImport.ts
  Part of 'files' list in tsconfig.json
a/fileWithImports.ts
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
d/da/daa/daaa/x/y/z/randomFileForImport.ts
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
e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts
  Part of 'files' list in tsconfig.json
f/fa/faa/x/y/z/randomFileForImport.ts
  Part of 'files' list in tsconfig.json
f/fa/faa/faaa/fileWithImports.ts
  Part of 'files' list in tsconfig.json
[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.




PolledWatches::
/home/src/workspaces/node_modules/@types:
  {"pollingInterval":500}
/home/src/workspaces/package.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/node_modules/@types:
  {"pollingInterval":500}
/home/src/workspaces/project/node_modules/package.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/node_modules/pkg0/package.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/node_modules/pkg1/package.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/package.json:
  {"pollingInterval":2000}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts:
  {}
/home/src/workspaces/project/a/fileWithImports.ts:
  {}
/home/src/workspaces/project/b/randomFileForImport.ts:
  {}
/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts:
  {}
/home/src/workspaces/project/c/ca/caa/randomFileForImport.ts:
  {}
/home/src/workspaces/project/c/ca/fileWithImports.ts:
  {}
/home/src/workspaces/project/c/cb/fileWithImports.ts:
  {}
/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts:
  {}
/home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts:
  {}
/home/src/workspaces/project/d/da/daa/fileWithImports.ts:
  {}
/home/src/workspaces/project/d/da/fileWithImports.ts:
  {}
/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts:
  {}
/home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts:
  {}
/home/src/workspaces/project/e/ea/eaa/fileWithImports.ts:
  {}
/home/src/workspaces/project/e/ea/fileWithImports.ts:
  {}
/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts:
  {}
/home/src/workspaces/project/f/fa/faa/x/y/z/randomFileForImport.ts:
  {}
/home/src/workspaces/project/fileWithImports.ts:
  {}
/home/src/workspaces/project/main.ts:
  {}
/home/src/workspaces/project/node_modules/pkg0/index.d.ts:
  {}
/home/src/workspaces/project/node_modules/pkg1/index.d.ts:
  {}
/home/src/workspaces/project/randomFileForImport.ts:
  {}
/home/src/workspaces/project/tsconfig.json:
  {}

FsWatches *deleted*::
/home/src/workspaces/project/b/ba/fileWithImports.ts:
  {}

FsWatchesRecursive::
/home/src/workspaces/project/a:
  {}
/home/src/workspaces/project/b:
  {}
/home/src/workspaces/project/c:
  {}
/home/src/workspaces/project/d:
  {}
/home/src/workspaces/project/e:
  {}
/home/src/workspaces/project/f:
  {}
/home/src/workspaces/project/node_modules:
  {}


Program root files: [
  "/home/src/workspaces/project/main.ts",
  "/home/src/workspaces/project/fileWithImports.ts",
  "/home/src/workspaces/project/randomFileForImport.ts",
  "/home/src/workspaces/project/a/fileWithImports.ts",
  "/home/src/workspaces/project/b/randomFileForImport.ts",
  "/home/src/workspaces/project/c/ca/fileWithImports.ts",
  "/home/src/workspaces/project/c/ca/caa/randomFileForImport.ts",
  "/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts",
  "/home/src/workspaces/project/c/cb/fileWithImports.ts",
  "/home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts",
  "/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts",
  "/home/src/workspaces/project/d/da/daa/fileWithImports.ts",
  "/home/src/workspaces/project/d/da/fileWithImports.ts",
  "/home/src/workspaces/project/e/ea/fileWithImports.ts",
  "/home/src/workspaces/project/e/ea/eaa/fileWithImports.ts",
  "/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts",
  "/home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts",
  "/home/src/workspaces/project/f/fa/faa/x/y/z/randomFileForImport.ts",
  "/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts"
]
Program options: {
  "traceResolution": true,
  "watch": true,
  "project": "/home/src/workspaces/project/tsconfig.json",
  "explainFiles": true,
  "extendedDiagnostics": true,
  "configFilePath": "/home/src/workspaces/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/project/main.ts
/home/src/workspaces/project/node_modules/pkg0/index.d.ts
/home/src/workspaces/project/node_modules/pkg1/index.d.ts
/home/src/workspaces/project/fileWithImports.ts
/home/src/workspaces/project/randomFileForImport.ts
/home/src/workspaces/project/a/fileWithImports.ts
/home/src/workspaces/project/b/randomFileForImport.ts
/home/src/workspaces/project/c/ca/fileWithImports.ts
/home/src/workspaces/project/c/ca/caa/randomFileForImport.ts
/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts
/home/src/workspaces/project/c/cb/fileWithImports.ts
/home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts
/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts
/home/src/workspaces/project/d/da/daa/fileWithImports.ts
/home/src/workspaces/project/d/da/fileWithImports.ts
/home/src/workspaces/project/e/ea/fileWithImports.ts
/home/src/workspaces/project/e/ea/eaa/fileWithImports.ts
/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts
/home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts
/home/src/workspaces/project/f/fa/faa/x/y/z/randomFileForImport.ts
/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

exitCode:: ExitStatus.undefined
