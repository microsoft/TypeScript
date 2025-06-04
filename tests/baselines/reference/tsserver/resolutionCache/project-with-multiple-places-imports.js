Info seq  [hh:mm:ss:mss] currentDirectory:: /home/src/Vscode/Projects/bin useCaseSensitiveFileNames:: false
Info seq  [hh:mm:ss:mss] libs Location:: /home/src/tslibs/TS/Lib
Info seq  [hh:mm:ss:mss] globalTypingsCacheLocation:: /home/src/Library/Caches/typescript
Info seq  [hh:mm:ss:mss] Provided types map file "/home/src/tslibs/TS/Lib/typesMap.json" doesn't exist
Before request
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


Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/home/src/workspaces/project/main.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /home/src/workspaces/project/main.ts ProjectRootPath: undefined:: Result: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating ConfiguredProject: /home/src/workspaces/project/tsconfig.json, currentDirectory: /home/src/workspaces/project
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/tsconfig.json 2000 undefined Project: /home/src/workspaces/project/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] Config: /home/src/workspaces/project/tsconfig.json : {
 "rootNames": [
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
 ],
 "options": {
  "traceResolution": true,
  "configFilePath": "/home/src/workspaces/project/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/home/src/workspaces/project/tsconfig.json",
        "reason": "Creating possible configured project for /home/src/workspaces/project/main.ts to open"
      }
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/fileWithImports.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/randomFileForImport.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/a/fileWithImports.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/b/ba/fileWithImports.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/b/randomFileForImport.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/c/ca/fileWithImports.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/c/ca/caa/randomFileForImport.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/c/cb/fileWithImports.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/d/da/daa/fileWithImports.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/d/da/fileWithImports.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/e/ea/fileWithImports.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/e/ea/eaa/fileWithImports.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/f/fa/faa/x/y/z/randomFileForImport.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] ======== Resolving module 'pkg0' from '/home/src/workspaces/project/fileWithImports.ts'. ========
Info seq  [hh:mm:ss:mss] Module resolution kind is not specified, using 'Node10'.
Info seq  [hh:mm:ss:mss] Loading module 'pkg0' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg0/package.json' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg0.ts' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg0.tsx' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg0.d.ts' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg0/index.ts' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg0/index.tsx' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg0/index.d.ts' exists - use it as a name resolution result.
Info seq  [hh:mm:ss:mss] Resolving real path for '/home/src/workspaces/project/node_modules/pkg0/index.d.ts', result '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] ======== Module name 'pkg0' was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'. ========
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules 1 undefined Project: /home/src/workspaces/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules 1 undefined Project: /home/src/workspaces/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] ======== Resolving module 'pkg1' from '/home/src/workspaces/project/fileWithImports.ts'. ========
Info seq  [hh:mm:ss:mss] Module resolution kind is not specified, using 'Node10'.
Info seq  [hh:mm:ss:mss] Loading module 'pkg1' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg1.ts' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg1.tsx' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg1.d.ts' does not exist.
Info seq  [hh:mm:ss:mss] Directory '/home/src/workspaces/project/node_modules/@types' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/src/workspaces/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/src/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Loading module 'pkg1' from 'node_modules' folder, target file types: JavaScript.
Info seq  [hh:mm:ss:mss] Searching all ancestor node_modules directories for fallback extensions: JavaScript.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg1.js' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg1.jsx' does not exist.
Info seq  [hh:mm:ss:mss] Directory '/home/src/workspaces/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/src/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] ======== Module name 'pkg1' was not resolved. ========
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/node_modules 1 undefined Project: /home/src/workspaces/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/node_modules 1 undefined Project: /home/src/workspaces/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg0/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/package.json' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist.
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info seq  [hh:mm:ss:mss] ======== Resolving module 'pkg0' from '/home/src/workspaces/project/a/fileWithImports.ts'. ========
Info seq  [hh:mm:ss:mss] Module resolution kind is not specified, using 'Node10'.
Info seq  [hh:mm:ss:mss] Loading module 'pkg0' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Directory '/home/src/workspaces/project/a/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Resolution for module 'pkg0' was found in cache from location '/home/src/workspaces/project'.
Info seq  [hh:mm:ss:mss] ======== Module name 'pkg0' was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'. ========
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/a 1 undefined Project: /home/src/workspaces/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/a 1 undefined Project: /home/src/workspaces/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] ======== Resolving module 'pkg1' from '/home/src/workspaces/project/a/fileWithImports.ts'. ========
Info seq  [hh:mm:ss:mss] Module resolution kind is not specified, using 'Node10'.
Info seq  [hh:mm:ss:mss] Loading module 'pkg1' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Directory '/home/src/workspaces/project/a/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Resolution for module 'pkg1' was found in cache from location '/home/src/workspaces/project'.
Info seq  [hh:mm:ss:mss] ======== Module name 'pkg1' was not resolved. ========
Info seq  [hh:mm:ss:mss] ======== Resolving module 'pkg0' from '/home/src/workspaces/project/b/ba/fileWithImports.ts'. ========
Info seq  [hh:mm:ss:mss] Module resolution kind is not specified, using 'Node10'.
Info seq  [hh:mm:ss:mss] Loading module 'pkg0' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Directory '/home/src/workspaces/project/b/ba/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/src/workspaces/project/b/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Resolution for module 'pkg0' was found in cache from location '/home/src/workspaces/project'.
Info seq  [hh:mm:ss:mss] ======== Module name 'pkg0' was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'. ========
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/b 1 undefined Project: /home/src/workspaces/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/b 1 undefined Project: /home/src/workspaces/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] ======== Resolving module 'pkg1' from '/home/src/workspaces/project/b/ba/fileWithImports.ts'. ========
Info seq  [hh:mm:ss:mss] Module resolution kind is not specified, using 'Node10'.
Info seq  [hh:mm:ss:mss] Loading module 'pkg1' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Directory '/home/src/workspaces/project/b/ba/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/src/workspaces/project/b/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Resolution for module 'pkg1' was found in cache from location '/home/src/workspaces/project'.
Info seq  [hh:mm:ss:mss] ======== Module name 'pkg1' was not resolved. ========
Info seq  [hh:mm:ss:mss] ======== Resolving module 'pkg0' from '/home/src/workspaces/project/c/ca/fileWithImports.ts'. ========
Info seq  [hh:mm:ss:mss] Module resolution kind is not specified, using 'Node10'.
Info seq  [hh:mm:ss:mss] Loading module 'pkg0' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Directory '/home/src/workspaces/project/c/ca/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/src/workspaces/project/c/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Resolution for module 'pkg0' was found in cache from location '/home/src/workspaces/project'.
Info seq  [hh:mm:ss:mss] ======== Module name 'pkg0' was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'. ========
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/c 1 undefined Project: /home/src/workspaces/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/c 1 undefined Project: /home/src/workspaces/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] ======== Resolving module 'pkg1' from '/home/src/workspaces/project/c/ca/fileWithImports.ts'. ========
Info seq  [hh:mm:ss:mss] Module resolution kind is not specified, using 'Node10'.
Info seq  [hh:mm:ss:mss] Loading module 'pkg1' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Directory '/home/src/workspaces/project/c/ca/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/src/workspaces/project/c/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Resolution for module 'pkg1' was found in cache from location '/home/src/workspaces/project'.
Info seq  [hh:mm:ss:mss] ======== Module name 'pkg1' was not resolved. ========
Info seq  [hh:mm:ss:mss] ======== Resolving module 'pkg0' from '/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts'. ========
Info seq  [hh:mm:ss:mss] Module resolution kind is not specified, using 'Node10'.
Info seq  [hh:mm:ss:mss] Loading module 'pkg0' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Directory '/home/src/workspaces/project/c/ca/caa/caaa/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/src/workspaces/project/c/ca/caa/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Resolution for module 'pkg0' was found in cache from location '/home/src/workspaces/project/c/ca'.
Info seq  [hh:mm:ss:mss] ======== Module name 'pkg0' was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'. ========
Info seq  [hh:mm:ss:mss] ======== Resolving module 'pkg1' from '/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts'. ========
Info seq  [hh:mm:ss:mss] Module resolution kind is not specified, using 'Node10'.
Info seq  [hh:mm:ss:mss] Loading module 'pkg1' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Directory '/home/src/workspaces/project/c/ca/caa/caaa/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/src/workspaces/project/c/ca/caa/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Resolution for module 'pkg1' was found in cache from location '/home/src/workspaces/project/c/ca'.
Info seq  [hh:mm:ss:mss] ======== Module name 'pkg1' was not resolved. ========
Info seq  [hh:mm:ss:mss] ======== Resolving module 'pkg0' from '/home/src/workspaces/project/c/cb/fileWithImports.ts'. ========
Info seq  [hh:mm:ss:mss] Module resolution kind is not specified, using 'Node10'.
Info seq  [hh:mm:ss:mss] Loading module 'pkg0' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Directory '/home/src/workspaces/project/c/cb/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Resolution for module 'pkg0' was found in cache from location '/home/src/workspaces/project/c'.
Info seq  [hh:mm:ss:mss] ======== Module name 'pkg0' was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'. ========
Info seq  [hh:mm:ss:mss] ======== Resolving module 'pkg1' from '/home/src/workspaces/project/c/cb/fileWithImports.ts'. ========
Info seq  [hh:mm:ss:mss] Module resolution kind is not specified, using 'Node10'.
Info seq  [hh:mm:ss:mss] Loading module 'pkg1' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Directory '/home/src/workspaces/project/c/cb/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Resolution for module 'pkg1' was found in cache from location '/home/src/workspaces/project/c'.
Info seq  [hh:mm:ss:mss] ======== Module name 'pkg1' was not resolved. ========
Info seq  [hh:mm:ss:mss] ======== Resolving module 'pkg0' from '/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts'. ========
Info seq  [hh:mm:ss:mss] Module resolution kind is not specified, using 'Node10'.
Info seq  [hh:mm:ss:mss] Loading module 'pkg0' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Directory '/home/src/workspaces/project/d/da/daa/daaa/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/src/workspaces/project/d/da/daa/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/src/workspaces/project/d/da/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/src/workspaces/project/d/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Resolution for module 'pkg0' was found in cache from location '/home/src/workspaces/project'.
Info seq  [hh:mm:ss:mss] ======== Module name 'pkg0' was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'. ========
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/d 1 undefined Project: /home/src/workspaces/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/d 1 undefined Project: /home/src/workspaces/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] ======== Resolving module 'pkg1' from '/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts'. ========
Info seq  [hh:mm:ss:mss] Module resolution kind is not specified, using 'Node10'.
Info seq  [hh:mm:ss:mss] Loading module 'pkg1' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Directory '/home/src/workspaces/project/d/da/daa/daaa/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/src/workspaces/project/d/da/daa/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/src/workspaces/project/d/da/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/src/workspaces/project/d/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Resolution for module 'pkg1' was found in cache from location '/home/src/workspaces/project'.
Info seq  [hh:mm:ss:mss] ======== Module name 'pkg1' was not resolved. ========
Info seq  [hh:mm:ss:mss] ======== Resolving module 'pkg0' from '/home/src/workspaces/project/d/da/daa/fileWithImports.ts'. ========
Info seq  [hh:mm:ss:mss] Module resolution kind is not specified, using 'Node10'.
Info seq  [hh:mm:ss:mss] Loading module 'pkg0' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Resolution for module 'pkg0' was found in cache from location '/home/src/workspaces/project/d/da/daa'.
Info seq  [hh:mm:ss:mss] ======== Module name 'pkg0' was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'. ========
Info seq  [hh:mm:ss:mss] ======== Resolving module 'pkg1' from '/home/src/workspaces/project/d/da/daa/fileWithImports.ts'. ========
Info seq  [hh:mm:ss:mss] Module resolution kind is not specified, using 'Node10'.
Info seq  [hh:mm:ss:mss] Loading module 'pkg1' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Resolution for module 'pkg1' was found in cache from location '/home/src/workspaces/project/d/da/daa'.
Info seq  [hh:mm:ss:mss] ======== Module name 'pkg1' was not resolved. ========
Info seq  [hh:mm:ss:mss] ======== Resolving module 'pkg0' from '/home/src/workspaces/project/d/da/fileWithImports.ts'. ========
Info seq  [hh:mm:ss:mss] Module resolution kind is not specified, using 'Node10'.
Info seq  [hh:mm:ss:mss] Loading module 'pkg0' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Resolution for module 'pkg0' was found in cache from location '/home/src/workspaces/project/d/da'.
Info seq  [hh:mm:ss:mss] ======== Module name 'pkg0' was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'. ========
Info seq  [hh:mm:ss:mss] ======== Resolving module 'pkg1' from '/home/src/workspaces/project/d/da/fileWithImports.ts'. ========
Info seq  [hh:mm:ss:mss] Module resolution kind is not specified, using 'Node10'.
Info seq  [hh:mm:ss:mss] Loading module 'pkg1' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Resolution for module 'pkg1' was found in cache from location '/home/src/workspaces/project/d/da'.
Info seq  [hh:mm:ss:mss] ======== Module name 'pkg1' was not resolved. ========
Info seq  [hh:mm:ss:mss] ======== Resolving module 'pkg0' from '/home/src/workspaces/project/e/ea/fileWithImports.ts'. ========
Info seq  [hh:mm:ss:mss] Module resolution kind is not specified, using 'Node10'.
Info seq  [hh:mm:ss:mss] Loading module 'pkg0' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Directory '/home/src/workspaces/project/e/ea/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/src/workspaces/project/e/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Resolution for module 'pkg0' was found in cache from location '/home/src/workspaces/project'.
Info seq  [hh:mm:ss:mss] ======== Module name 'pkg0' was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'. ========
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/e 1 undefined Project: /home/src/workspaces/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/e 1 undefined Project: /home/src/workspaces/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] ======== Resolving module 'pkg1' from '/home/src/workspaces/project/e/ea/fileWithImports.ts'. ========
Info seq  [hh:mm:ss:mss] Module resolution kind is not specified, using 'Node10'.
Info seq  [hh:mm:ss:mss] Loading module 'pkg1' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Directory '/home/src/workspaces/project/e/ea/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/src/workspaces/project/e/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Resolution for module 'pkg1' was found in cache from location '/home/src/workspaces/project'.
Info seq  [hh:mm:ss:mss] ======== Module name 'pkg1' was not resolved. ========
Info seq  [hh:mm:ss:mss] ======== Resolving module 'pkg0' from '/home/src/workspaces/project/e/ea/eaa/fileWithImports.ts'. ========
Info seq  [hh:mm:ss:mss] Module resolution kind is not specified, using 'Node10'.
Info seq  [hh:mm:ss:mss] Loading module 'pkg0' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Directory '/home/src/workspaces/project/e/ea/eaa/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Resolution for module 'pkg0' was found in cache from location '/home/src/workspaces/project/e/ea'.
Info seq  [hh:mm:ss:mss] ======== Module name 'pkg0' was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'. ========
Info seq  [hh:mm:ss:mss] ======== Resolving module 'pkg1' from '/home/src/workspaces/project/e/ea/eaa/fileWithImports.ts'. ========
Info seq  [hh:mm:ss:mss] Module resolution kind is not specified, using 'Node10'.
Info seq  [hh:mm:ss:mss] Loading module 'pkg1' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Directory '/home/src/workspaces/project/e/ea/eaa/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Resolution for module 'pkg1' was found in cache from location '/home/src/workspaces/project/e/ea'.
Info seq  [hh:mm:ss:mss] ======== Module name 'pkg1' was not resolved. ========
Info seq  [hh:mm:ss:mss] ======== Resolving module 'pkg0' from '/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts'. ========
Info seq  [hh:mm:ss:mss] Module resolution kind is not specified, using 'Node10'.
Info seq  [hh:mm:ss:mss] Loading module 'pkg0' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Directory '/home/src/workspaces/project/e/ea/eaa/eaaa/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Resolution for module 'pkg0' was found in cache from location '/home/src/workspaces/project/e/ea/eaa'.
Info seq  [hh:mm:ss:mss] ======== Module name 'pkg0' was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'. ========
Info seq  [hh:mm:ss:mss] ======== Resolving module 'pkg1' from '/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts'. ========
Info seq  [hh:mm:ss:mss] Module resolution kind is not specified, using 'Node10'.
Info seq  [hh:mm:ss:mss] Loading module 'pkg1' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Directory '/home/src/workspaces/project/e/ea/eaa/eaaa/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Resolution for module 'pkg1' was found in cache from location '/home/src/workspaces/project/e/ea/eaa'.
Info seq  [hh:mm:ss:mss] ======== Module name 'pkg1' was not resolved. ========
Info seq  [hh:mm:ss:mss] ======== Resolving module 'pkg0' from '/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts'. ========
Info seq  [hh:mm:ss:mss] Module resolution kind is not specified, using 'Node10'.
Info seq  [hh:mm:ss:mss] Loading module 'pkg0' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Directory '/home/src/workspaces/project/f/fa/faa/faaa/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/src/workspaces/project/f/fa/faa/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/src/workspaces/project/f/fa/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/src/workspaces/project/f/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Resolution for module 'pkg0' was found in cache from location '/home/src/workspaces/project'.
Info seq  [hh:mm:ss:mss] ======== Module name 'pkg0' was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'. ========
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/f 1 undefined Project: /home/src/workspaces/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/f 1 undefined Project: /home/src/workspaces/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] ======== Resolving module 'pkg1' from '/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts'. ========
Info seq  [hh:mm:ss:mss] Module resolution kind is not specified, using 'Node10'.
Info seq  [hh:mm:ss:mss] Loading module 'pkg1' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Directory '/home/src/workspaces/project/f/fa/faa/faaa/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/src/workspaces/project/f/fa/faa/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/src/workspaces/project/f/fa/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/src/workspaces/project/f/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Resolution for module 'pkg1' was found in cache from location '/home/src/workspaces/project'.
Info seq  [hh:mm:ss:mss] ======== Module name 'pkg1' was not resolved. ========
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules/pkg0/package.json 2000 undefined Project: /home/src/workspaces/project/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules/package.json 2000 undefined Project: /home/src/workspaces/project/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/package.json 2000 undefined Project: /home/src/workspaces/project/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/package.json 2000 undefined Project: /home/src/workspaces/project/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules/@types 1 undefined Project: /home/src/workspaces/project/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules/@types 1 undefined Project: /home/src/workspaces/project/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/node_modules/@types 1 undefined Project: /home/src/workspaces/project/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/node_modules/@types 1 undefined Project: /home/src/workspaces/project/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/workspaces/project/tsconfig.json projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (22)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/home/src/workspaces/project/main.ts SVC-1-0 "export const x = 10;"
	/home/src/workspaces/project/node_modules/pkg0/index.d.ts Text-1 "export interface ImportInterface0 {}"
	/home/src/workspaces/project/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/randomFileForImport.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/a/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/b/ba/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/b/randomFileForImport.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/c/ca/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/c/ca/caa/randomFileForImport.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/c/cb/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/d/da/daa/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/d/da/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/e/ea/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/e/ea/eaa/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/f/fa/faa/x/y/z/randomFileForImport.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"


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

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/home/src/workspaces/project/tsconfig.json"
      }
    }
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "telemetry",
      "body": {
        "telemetryEventName": "projectInfo",
        "payload": {
          "projectId": "c508fd683797f5f4c77b8519182a36985021d6361b6a0aa9c8b69f7e25d6e876",
          "fileStats": {
            "js": 0,
            "jsSize": 0,
            "jsx": 0,
            "jsxSize": 0,
            "ts": 20,
            "tsSize": 1336,
            "tsx": 0,
            "tsxSize": 0,
            "dts": 2,
            "dtsSize": 449,
            "deferred": 0,
            "deferredSize": 0
          },
          "compilerOptions": {
            "traceResolution": true
          },
          "typeAcquisition": {
            "enable": false,
            "include": false,
            "exclude": false
          },
          "extends": false,
          "files": true,
          "include": false,
          "exclude": false,
          "compileOnSave": false,
          "configFileName": "tsconfig.json",
          "projectType": "configured",
          "languageServiceEnabled": true,
          "version": "FakeVersion"
        }
      }
    }
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "configFileDiag",
      "body": {
        "triggerFile": "/home/src/workspaces/project/main.ts",
        "configFile": "/home/src/workspaces/project/tsconfig.json",
        "diagnostics": []
      }
    }
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (22)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/project/main.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "open",
      "request_seq": 1,
      "success": true,
      "performanceData": {
        "updateGraphDurationMs": *
      }
    }
After request

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

Projects::
/home/src/workspaces/project/tsconfig.json (Configured) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/a/fileWithImports.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/b/ba/fileWithImports.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/b/randomFileForImport.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/c/ca/caa/randomFileForImport.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/c/ca/fileWithImports.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/c/cb/fileWithImports.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/d/da/daa/fileWithImports.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/d/da/fileWithImports.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/e/ea/eaa/fileWithImports.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/e/ea/fileWithImports.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/f/fa/faa/x/y/z/randomFileForImport.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/fileWithImports.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/main.ts (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json *default*
/home/src/workspaces/project/node_modules/pkg0/index.d.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/randomFileForImport.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json

modify randomFileForImport by adding import
Info seq  [hh:mm:ss:mss] FileWatcher:: Triggered with /home/src/workspaces/project/randomFileForImport.ts 1:: WatchInfo: /home/src/workspaces/project/randomFileForImport.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Scheduled: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Elapsed:: *ms FileWatcher:: Triggered with /home/src/workspaces/project/randomFileForImport.ts 1:: WatchInfo: /home/src/workspaces/project/randomFileForImport.ts 500 undefined WatchType: Closed Script info
Before running Timeout callback:: count: 2
1: /home/src/workspaces/project/tsconfig.json
2: *ensureProjectForOpenFiles*
//// [/home/src/workspaces/project/randomFileForImport.ts]
import type { ImportInterface0 } from "pkg0";
export const x = 10;


Timeout callback:: count: 2
1: /home/src/workspaces/project/tsconfig.json *new*
2: *ensureProjectForOpenFiles* *new*

Projects::
/home/src/workspaces/project/tsconfig.json (Configured) *changed*
    projectStateVersion: 2 *changed*
    projectProgramVersion: 1
    dirty: true *changed*
    autoImportProviderHost: false

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/a/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/b/ba/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/b/randomFileForImport.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/c/ca/caa/randomFileForImport.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/c/ca/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/c/cb/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/d/da/daa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/d/da/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/e/ea/eaa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/e/ea/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/f/fa/faa/x/y/z/randomFileForImport.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/main.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json *default*
/home/src/workspaces/project/node_modules/pkg0/index.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/randomFileForImport.ts *changed*
    version: Text-1
    pendingReloadFromDisk: true *changed*
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json

Info seq  [hh:mm:ss:mss] Running: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg0/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg0/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] ======== Resolving module 'pkg0' from '/home/src/workspaces/project/randomFileForImport.ts'. ========
Info seq  [hh:mm:ss:mss] Resolution for module 'pkg0' was found in cache from location '/home/src/workspaces/project'.
Info seq  [hh:mm:ss:mss] ======== Module name 'pkg0' was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'. ========
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/a/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/a/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/b/ba/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/b/ba/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/c/ca/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/c/ca/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/c/cb/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/c/cb/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/d/da/daa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/d/da/daa/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/d/da/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/d/da/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/e/ea/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/e/ea/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/e/ea/eaa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/e/ea/eaa/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/workspaces/project/tsconfig.json projectStateVersion: 2 projectProgramVersion: 1 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (22)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/home/src/workspaces/project/main.ts SVC-1-0 "export const x = 10;"
	/home/src/workspaces/project/node_modules/pkg0/index.d.ts Text-1 "export interface ImportInterface0 {}"
	/home/src/workspaces/project/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/randomFileForImport.ts Text-2 "import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;"
	/home/src/workspaces/project/a/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/b/ba/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/b/randomFileForImport.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/c/ca/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/c/ca/caa/randomFileForImport.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/c/cb/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/d/da/daa/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/d/da/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/e/ea/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/e/ea/eaa/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/f/fa/faa/x/y/z/randomFileForImport.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Running: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Before ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (22)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/project/main.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] After ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (22)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/project/main.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] got projects updated in background /home/src/workspaces/project/main.ts
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectsUpdatedInBackground",
      "body": {
        "openFiles": [
          "/home/src/workspaces/project/main.ts"
        ]
      }
    }
After running Timeout callback:: count: 0

Projects::
/home/src/workspaces/project/tsconfig.json (Configured) *changed*
    projectStateVersion: 2
    projectProgramVersion: 2 *changed*
    dirty: false *changed*
    autoImportProviderHost: false

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/a/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/b/ba/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/b/randomFileForImport.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/c/ca/caa/randomFileForImport.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/c/ca/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/c/cb/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/d/da/daa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/d/da/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/e/ea/eaa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/e/ea/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/f/fa/faa/x/y/z/randomFileForImport.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/main.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json *default*
/home/src/workspaces/project/node_modules/pkg0/index.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/randomFileForImport.ts *changed*
    version: Text-2 *changed*
    pendingReloadFromDisk: false *changed*
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json

modify b/randomFileForImport by adding import
Info seq  [hh:mm:ss:mss] FileWatcher:: Triggered with /home/src/workspaces/project/b/randomFileForImport.ts 1:: WatchInfo: /home/src/workspaces/project/b/randomFileForImport.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Scheduled: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Elapsed:: *ms FileWatcher:: Triggered with /home/src/workspaces/project/b/randomFileForImport.ts 1:: WatchInfo: /home/src/workspaces/project/b/randomFileForImport.ts 500 undefined WatchType: Closed Script info
Before running Timeout callback:: count: 2
3: /home/src/workspaces/project/tsconfig.json
4: *ensureProjectForOpenFiles*
//// [/home/src/workspaces/project/b/randomFileForImport.ts]
import type { ImportInterface0 } from "pkg0";
export const x = 10;


Timeout callback:: count: 2
3: /home/src/workspaces/project/tsconfig.json *new*
4: *ensureProjectForOpenFiles* *new*

Projects::
/home/src/workspaces/project/tsconfig.json (Configured) *changed*
    projectStateVersion: 3 *changed*
    projectProgramVersion: 2
    dirty: true *changed*
    autoImportProviderHost: false

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/a/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/b/ba/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/b/randomFileForImport.ts *changed*
    version: Text-1
    pendingReloadFromDisk: true *changed*
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/c/ca/caa/randomFileForImport.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/c/ca/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/c/cb/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/d/da/daa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/d/da/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/e/ea/eaa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/e/ea/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/f/fa/faa/x/y/z/randomFileForImport.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/main.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json *default*
/home/src/workspaces/project/node_modules/pkg0/index.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/randomFileForImport.ts
    version: Text-2
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json

Info seq  [hh:mm:ss:mss] Running: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg0/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg0/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/randomFileForImport.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/a/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/a/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/b/ba/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/b/ba/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] ======== Resolving module 'pkg0' from '/home/src/workspaces/project/b/randomFileForImport.ts'. ========
Info seq  [hh:mm:ss:mss] Module resolution kind is not specified, using 'Node10'.
Info seq  [hh:mm:ss:mss] Loading module 'pkg0' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Resolution for module 'pkg0' was found in cache from location '/home/src/workspaces/project/b'.
Info seq  [hh:mm:ss:mss] ======== Module name 'pkg0' was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'. ========
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/c/ca/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/c/ca/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/c/cb/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/c/cb/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/d/da/daa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/d/da/daa/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/d/da/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/d/da/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/e/ea/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/e/ea/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/e/ea/eaa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/e/ea/eaa/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/workspaces/project/tsconfig.json projectStateVersion: 3 projectProgramVersion: 2 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (22)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/home/src/workspaces/project/main.ts SVC-1-0 "export const x = 10;"
	/home/src/workspaces/project/node_modules/pkg0/index.d.ts Text-1 "export interface ImportInterface0 {}"
	/home/src/workspaces/project/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/randomFileForImport.ts Text-2 "import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;"
	/home/src/workspaces/project/a/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/b/ba/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/b/randomFileForImport.ts Text-2 "import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;"
	/home/src/workspaces/project/c/ca/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/c/ca/caa/randomFileForImport.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/c/cb/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/d/da/daa/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/d/da/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/e/ea/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/e/ea/eaa/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/f/fa/faa/x/y/z/randomFileForImport.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Running: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Before ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (22)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/project/main.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] After ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (22)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/project/main.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] got projects updated in background /home/src/workspaces/project/main.ts
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectsUpdatedInBackground",
      "body": {
        "openFiles": [
          "/home/src/workspaces/project/main.ts"
        ]
      }
    }
After running Timeout callback:: count: 0

Projects::
/home/src/workspaces/project/tsconfig.json (Configured) *changed*
    projectStateVersion: 3
    projectProgramVersion: 3 *changed*
    dirty: false *changed*
    autoImportProviderHost: false

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/a/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/b/ba/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/b/randomFileForImport.ts *changed*
    version: Text-2 *changed*
    pendingReloadFromDisk: false *changed*
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/c/ca/caa/randomFileForImport.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/c/ca/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/c/cb/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/d/da/daa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/d/da/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/e/ea/eaa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/e/ea/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/f/fa/faa/x/y/z/randomFileForImport.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/main.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json *default*
/home/src/workspaces/project/node_modules/pkg0/index.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/randomFileForImport.ts
    version: Text-2
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json

modify c/ca/caa/randomFileForImport by adding import
Info seq  [hh:mm:ss:mss] FileWatcher:: Triggered with /home/src/workspaces/project/c/ca/caa/randomFileForImport.ts 1:: WatchInfo: /home/src/workspaces/project/c/ca/caa/randomFileForImport.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Scheduled: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Elapsed:: *ms FileWatcher:: Triggered with /home/src/workspaces/project/c/ca/caa/randomFileForImport.ts 1:: WatchInfo: /home/src/workspaces/project/c/ca/caa/randomFileForImport.ts 500 undefined WatchType: Closed Script info
Before running Timeout callback:: count: 2
5: /home/src/workspaces/project/tsconfig.json
6: *ensureProjectForOpenFiles*
//// [/home/src/workspaces/project/c/ca/caa/randomFileForImport.ts]
import type { ImportInterface0 } from "pkg0";
export const x = 10;


Timeout callback:: count: 2
5: /home/src/workspaces/project/tsconfig.json *new*
6: *ensureProjectForOpenFiles* *new*

Projects::
/home/src/workspaces/project/tsconfig.json (Configured) *changed*
    projectStateVersion: 4 *changed*
    projectProgramVersion: 3
    dirty: true *changed*
    autoImportProviderHost: false

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/a/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/b/ba/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/b/randomFileForImport.ts
    version: Text-2
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/c/ca/caa/randomFileForImport.ts *changed*
    version: Text-1
    pendingReloadFromDisk: true *changed*
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/c/ca/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/c/cb/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/d/da/daa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/d/da/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/e/ea/eaa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/e/ea/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/f/fa/faa/x/y/z/randomFileForImport.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/main.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json *default*
/home/src/workspaces/project/node_modules/pkg0/index.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/randomFileForImport.ts
    version: Text-2
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json

Info seq  [hh:mm:ss:mss] Running: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg0/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg0/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/randomFileForImport.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/a/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/a/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/b/ba/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/b/ba/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/b/randomFileForImport.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/c/ca/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/c/ca/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] ======== Resolving module 'pkg0' from '/home/src/workspaces/project/c/ca/caa/randomFileForImport.ts'. ========
Info seq  [hh:mm:ss:mss] Module resolution kind is not specified, using 'Node10'.
Info seq  [hh:mm:ss:mss] Loading module 'pkg0' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Resolution for module 'pkg0' was found in cache from location '/home/src/workspaces/project/c/ca/caa'.
Info seq  [hh:mm:ss:mss] ======== Module name 'pkg0' was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'. ========
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/c/cb/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/c/cb/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/d/da/daa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/d/da/daa/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/d/da/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/d/da/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/e/ea/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/e/ea/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/e/ea/eaa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/e/ea/eaa/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/workspaces/project/tsconfig.json projectStateVersion: 4 projectProgramVersion: 3 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (22)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/home/src/workspaces/project/main.ts SVC-1-0 "export const x = 10;"
	/home/src/workspaces/project/node_modules/pkg0/index.d.ts Text-1 "export interface ImportInterface0 {}"
	/home/src/workspaces/project/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/randomFileForImport.ts Text-2 "import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;"
	/home/src/workspaces/project/a/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/b/ba/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/b/randomFileForImport.ts Text-2 "import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;"
	/home/src/workspaces/project/c/ca/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/c/ca/caa/randomFileForImport.ts Text-2 "import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;"
	/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/c/cb/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/d/da/daa/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/d/da/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/e/ea/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/e/ea/eaa/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/f/fa/faa/x/y/z/randomFileForImport.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Running: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Before ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (22)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/project/main.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] After ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (22)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/project/main.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] got projects updated in background /home/src/workspaces/project/main.ts
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectsUpdatedInBackground",
      "body": {
        "openFiles": [
          "/home/src/workspaces/project/main.ts"
        ]
      }
    }
After running Timeout callback:: count: 0

Projects::
/home/src/workspaces/project/tsconfig.json (Configured) *changed*
    projectStateVersion: 4
    projectProgramVersion: 4 *changed*
    dirty: false *changed*
    autoImportProviderHost: false

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/a/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/b/ba/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/b/randomFileForImport.ts
    version: Text-2
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/c/ca/caa/randomFileForImport.ts *changed*
    version: Text-2 *changed*
    pendingReloadFromDisk: false *changed*
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/c/ca/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/c/cb/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/d/da/daa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/d/da/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/e/ea/eaa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/e/ea/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/f/fa/faa/x/y/z/randomFileForImport.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/main.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json *default*
/home/src/workspaces/project/node_modules/pkg0/index.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/randomFileForImport.ts
    version: Text-2
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json

modify d/da/daa/daaa/x/y/z/randomFileForImport by adding import
Info seq  [hh:mm:ss:mss] FileWatcher:: Triggered with /home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts 1:: WatchInfo: /home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Scheduled: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Elapsed:: *ms FileWatcher:: Triggered with /home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts 1:: WatchInfo: /home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts 500 undefined WatchType: Closed Script info
Before running Timeout callback:: count: 2
7: /home/src/workspaces/project/tsconfig.json
8: *ensureProjectForOpenFiles*
//// [/home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts]
import type { ImportInterface0 } from "pkg0";
export const x = 10;


Timeout callback:: count: 2
7: /home/src/workspaces/project/tsconfig.json *new*
8: *ensureProjectForOpenFiles* *new*

Projects::
/home/src/workspaces/project/tsconfig.json (Configured) *changed*
    projectStateVersion: 5 *changed*
    projectProgramVersion: 4
    dirty: true *changed*
    autoImportProviderHost: false

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/a/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/b/ba/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/b/randomFileForImport.ts
    version: Text-2
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/c/ca/caa/randomFileForImport.ts
    version: Text-2
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/c/ca/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/c/cb/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts *changed*
    version: Text-1
    pendingReloadFromDisk: true *changed*
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/d/da/daa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/d/da/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/e/ea/eaa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/e/ea/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/f/fa/faa/x/y/z/randomFileForImport.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/main.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json *default*
/home/src/workspaces/project/node_modules/pkg0/index.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/randomFileForImport.ts
    version: Text-2
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json

Info seq  [hh:mm:ss:mss] Running: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg0/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg0/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/randomFileForImport.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/a/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/a/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/b/ba/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/b/ba/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/b/randomFileForImport.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/c/ca/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/c/ca/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/c/ca/caa/randomFileForImport.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/c/cb/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/c/cb/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] ======== Resolving module 'pkg0' from '/home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts'. ========
Info seq  [hh:mm:ss:mss] Module resolution kind is not specified, using 'Node10'.
Info seq  [hh:mm:ss:mss] Loading module 'pkg0' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Directory '/home/src/workspaces/project/d/da/daa/daaa/x/y/z/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/src/workspaces/project/d/da/daa/daaa/x/y/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/src/workspaces/project/d/da/daa/daaa/x/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Resolution for module 'pkg0' was found in cache from location '/home/src/workspaces/project/d/da/daa/daaa'.
Info seq  [hh:mm:ss:mss] ======== Module name 'pkg0' was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'. ========
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/d/da/daa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/d/da/daa/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/d/da/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/d/da/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/e/ea/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/e/ea/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/e/ea/eaa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/e/ea/eaa/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/workspaces/project/tsconfig.json projectStateVersion: 5 projectProgramVersion: 4 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (22)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/home/src/workspaces/project/main.ts SVC-1-0 "export const x = 10;"
	/home/src/workspaces/project/node_modules/pkg0/index.d.ts Text-1 "export interface ImportInterface0 {}"
	/home/src/workspaces/project/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/randomFileForImport.ts Text-2 "import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;"
	/home/src/workspaces/project/a/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/b/ba/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/b/randomFileForImport.ts Text-2 "import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;"
	/home/src/workspaces/project/c/ca/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/c/ca/caa/randomFileForImport.ts Text-2 "import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;"
	/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/c/cb/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts Text-2 "import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;"
	/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/d/da/daa/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/d/da/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/e/ea/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/e/ea/eaa/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/f/fa/faa/x/y/z/randomFileForImport.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Running: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Before ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (22)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/project/main.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] After ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (22)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/project/main.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] got projects updated in background /home/src/workspaces/project/main.ts
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectsUpdatedInBackground",
      "body": {
        "openFiles": [
          "/home/src/workspaces/project/main.ts"
        ]
      }
    }
After running Timeout callback:: count: 0

Projects::
/home/src/workspaces/project/tsconfig.json (Configured) *changed*
    projectStateVersion: 5
    projectProgramVersion: 5 *changed*
    dirty: false *changed*
    autoImportProviderHost: false

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/a/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/b/ba/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/b/randomFileForImport.ts
    version: Text-2
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/c/ca/caa/randomFileForImport.ts
    version: Text-2
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/c/ca/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/c/cb/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts *changed*
    version: Text-2 *changed*
    pendingReloadFromDisk: false *changed*
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/d/da/daa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/d/da/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/e/ea/eaa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/e/ea/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/f/fa/faa/x/y/z/randomFileForImport.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/main.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json *default*
/home/src/workspaces/project/node_modules/pkg0/index.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/randomFileForImport.ts
    version: Text-2
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json

modify e/ea/eaa/eaaa/x/y/z/randomFileForImport by adding import
Info seq  [hh:mm:ss:mss] FileWatcher:: Triggered with /home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts 1:: WatchInfo: /home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Scheduled: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Elapsed:: *ms FileWatcher:: Triggered with /home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts 1:: WatchInfo: /home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts 500 undefined WatchType: Closed Script info
Before running Timeout callback:: count: 2
9: /home/src/workspaces/project/tsconfig.json
10: *ensureProjectForOpenFiles*
//// [/home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts]
import type { ImportInterface0 } from "pkg0";
export const x = 10;


Timeout callback:: count: 2
9: /home/src/workspaces/project/tsconfig.json *new*
10: *ensureProjectForOpenFiles* *new*

Projects::
/home/src/workspaces/project/tsconfig.json (Configured) *changed*
    projectStateVersion: 6 *changed*
    projectProgramVersion: 5
    dirty: true *changed*
    autoImportProviderHost: false

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/a/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/b/ba/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/b/randomFileForImport.ts
    version: Text-2
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/c/ca/caa/randomFileForImport.ts
    version: Text-2
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/c/ca/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/c/cb/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts
    version: Text-2
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/d/da/daa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/d/da/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts *changed*
    version: Text-1
    pendingReloadFromDisk: true *changed*
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/e/ea/eaa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/e/ea/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/f/fa/faa/x/y/z/randomFileForImport.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/main.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json *default*
/home/src/workspaces/project/node_modules/pkg0/index.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/randomFileForImport.ts
    version: Text-2
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json

Info seq  [hh:mm:ss:mss] Running: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg0/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg0/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/randomFileForImport.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/a/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/a/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/b/ba/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/b/ba/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/b/randomFileForImport.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/c/ca/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/c/ca/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/c/ca/caa/randomFileForImport.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/c/cb/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/c/cb/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/d/da/daa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/d/da/daa/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/d/da/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/d/da/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/e/ea/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/e/ea/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/e/ea/eaa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/e/ea/eaa/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] ======== Resolving module 'pkg0' from '/home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts'. ========
Info seq  [hh:mm:ss:mss] Module resolution kind is not specified, using 'Node10'.
Info seq  [hh:mm:ss:mss] Loading module 'pkg0' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Directory '/home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/src/workspaces/project/e/ea/eaa/eaaa/x/y/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/src/workspaces/project/e/ea/eaa/eaaa/x/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Resolution for module 'pkg0' was found in cache from location '/home/src/workspaces/project/e/ea/eaa/eaaa'.
Info seq  [hh:mm:ss:mss] ======== Module name 'pkg0' was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'. ========
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/workspaces/project/tsconfig.json projectStateVersion: 6 projectProgramVersion: 5 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (22)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/home/src/workspaces/project/main.ts SVC-1-0 "export const x = 10;"
	/home/src/workspaces/project/node_modules/pkg0/index.d.ts Text-1 "export interface ImportInterface0 {}"
	/home/src/workspaces/project/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/randomFileForImport.ts Text-2 "import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;"
	/home/src/workspaces/project/a/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/b/ba/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/b/randomFileForImport.ts Text-2 "import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;"
	/home/src/workspaces/project/c/ca/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/c/ca/caa/randomFileForImport.ts Text-2 "import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;"
	/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/c/cb/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts Text-2 "import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;"
	/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/d/da/daa/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/d/da/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/e/ea/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/e/ea/eaa/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts Text-2 "import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;"
	/home/src/workspaces/project/f/fa/faa/x/y/z/randomFileForImport.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Running: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Before ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (22)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/project/main.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] After ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (22)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/project/main.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] got projects updated in background /home/src/workspaces/project/main.ts
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectsUpdatedInBackground",
      "body": {
        "openFiles": [
          "/home/src/workspaces/project/main.ts"
        ]
      }
    }
After running Timeout callback:: count: 0

Projects::
/home/src/workspaces/project/tsconfig.json (Configured) *changed*
    projectStateVersion: 6
    projectProgramVersion: 6 *changed*
    dirty: false *changed*
    autoImportProviderHost: false

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/a/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/b/ba/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/b/randomFileForImport.ts
    version: Text-2
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/c/ca/caa/randomFileForImport.ts
    version: Text-2
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/c/ca/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/c/cb/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts
    version: Text-2
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/d/da/daa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/d/da/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts *changed*
    version: Text-2 *changed*
    pendingReloadFromDisk: false *changed*
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/e/ea/eaa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/e/ea/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/f/fa/faa/x/y/z/randomFileForImport.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/main.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json *default*
/home/src/workspaces/project/node_modules/pkg0/index.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/randomFileForImport.ts
    version: Text-2
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json

modify randomFileForImport by adding unresolved import
Info seq  [hh:mm:ss:mss] FileWatcher:: Triggered with /home/src/workspaces/project/randomFileForImport.ts 1:: WatchInfo: /home/src/workspaces/project/randomFileForImport.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Scheduled: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Elapsed:: *ms FileWatcher:: Triggered with /home/src/workspaces/project/randomFileForImport.ts 1:: WatchInfo: /home/src/workspaces/project/randomFileForImport.ts 500 undefined WatchType: Closed Script info
Before running Timeout callback:: count: 2
11: /home/src/workspaces/project/tsconfig.json
12: *ensureProjectForOpenFiles*
//// [/home/src/workspaces/project/randomFileForImport.ts]
import type { ImportInterface1 } from "pkg1";
import type { ImportInterface0 } from "pkg0";
export const x = 10;


Timeout callback:: count: 2
11: /home/src/workspaces/project/tsconfig.json *new*
12: *ensureProjectForOpenFiles* *new*

Projects::
/home/src/workspaces/project/tsconfig.json (Configured) *changed*
    projectStateVersion: 7 *changed*
    projectProgramVersion: 6
    dirty: true *changed*
    autoImportProviderHost: false

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/a/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/b/ba/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/b/randomFileForImport.ts
    version: Text-2
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/c/ca/caa/randomFileForImport.ts
    version: Text-2
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/c/ca/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/c/cb/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts
    version: Text-2
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/d/da/daa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/d/da/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts
    version: Text-2
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/e/ea/eaa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/e/ea/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/f/fa/faa/x/y/z/randomFileForImport.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/main.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json *default*
/home/src/workspaces/project/node_modules/pkg0/index.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/randomFileForImport.ts *changed*
    version: Text-2
    pendingReloadFromDisk: true *changed*
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json

Info seq  [hh:mm:ss:mss] Running: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg0/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg0/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] ======== Resolving module 'pkg1' from '/home/src/workspaces/project/randomFileForImport.ts'. ========
Info seq  [hh:mm:ss:mss] Resolution for module 'pkg1' was found in cache from location '/home/src/workspaces/project'.
Info seq  [hh:mm:ss:mss] ======== Module name 'pkg1' was not resolved. ========
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/randomFileForImport.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/a/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/a/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/b/ba/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/b/ba/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/b/randomFileForImport.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/c/ca/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/c/ca/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/c/ca/caa/randomFileForImport.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/c/cb/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/c/cb/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/d/da/daa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/d/da/daa/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/d/da/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/d/da/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/e/ea/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/e/ea/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/e/ea/eaa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/e/ea/eaa/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/workspaces/project/tsconfig.json projectStateVersion: 7 projectProgramVersion: 6 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (22)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/home/src/workspaces/project/main.ts SVC-1-0 "export const x = 10;"
	/home/src/workspaces/project/node_modules/pkg0/index.d.ts Text-1 "export interface ImportInterface0 {}"
	/home/src/workspaces/project/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/randomFileForImport.ts Text-3 "import type { ImportInterface1 } from \"pkg1\";\nimport type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;"
	/home/src/workspaces/project/a/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/b/ba/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/b/randomFileForImport.ts Text-2 "import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;"
	/home/src/workspaces/project/c/ca/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/c/ca/caa/randomFileForImport.ts Text-2 "import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;"
	/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/c/cb/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts Text-2 "import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;"
	/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/d/da/daa/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/d/da/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/e/ea/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/e/ea/eaa/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts Text-2 "import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;"
	/home/src/workspaces/project/f/fa/faa/x/y/z/randomFileForImport.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Running: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Before ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (22)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/project/main.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] After ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (22)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/project/main.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] got projects updated in background /home/src/workspaces/project/main.ts
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectsUpdatedInBackground",
      "body": {
        "openFiles": [
          "/home/src/workspaces/project/main.ts"
        ]
      }
    }
After running Timeout callback:: count: 0

Projects::
/home/src/workspaces/project/tsconfig.json (Configured) *changed*
    projectStateVersion: 7
    projectProgramVersion: 7 *changed*
    dirty: false *changed*
    autoImportProviderHost: false

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/a/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/b/ba/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/b/randomFileForImport.ts
    version: Text-2
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/c/ca/caa/randomFileForImport.ts
    version: Text-2
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/c/ca/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/c/cb/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts
    version: Text-2
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/d/da/daa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/d/da/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts
    version: Text-2
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/e/ea/eaa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/e/ea/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/f/fa/faa/x/y/z/randomFileForImport.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/main.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json *default*
/home/src/workspaces/project/node_modules/pkg0/index.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/randomFileForImport.ts *changed*
    version: Text-3 *changed*
    pendingReloadFromDisk: false *changed*
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json

modify b/randomFileForImport by adding unresolved import
Info seq  [hh:mm:ss:mss] FileWatcher:: Triggered with /home/src/workspaces/project/b/randomFileForImport.ts 1:: WatchInfo: /home/src/workspaces/project/b/randomFileForImport.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Scheduled: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Elapsed:: *ms FileWatcher:: Triggered with /home/src/workspaces/project/b/randomFileForImport.ts 1:: WatchInfo: /home/src/workspaces/project/b/randomFileForImport.ts 500 undefined WatchType: Closed Script info
Before running Timeout callback:: count: 2
13: /home/src/workspaces/project/tsconfig.json
14: *ensureProjectForOpenFiles*
//// [/home/src/workspaces/project/b/randomFileForImport.ts]
import type { ImportInterface1 } from "pkg1";
import type { ImportInterface0 } from "pkg0";
export const x = 10;


Timeout callback:: count: 2
13: /home/src/workspaces/project/tsconfig.json *new*
14: *ensureProjectForOpenFiles* *new*

Projects::
/home/src/workspaces/project/tsconfig.json (Configured) *changed*
    projectStateVersion: 8 *changed*
    projectProgramVersion: 7
    dirty: true *changed*
    autoImportProviderHost: false

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/a/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/b/ba/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/b/randomFileForImport.ts *changed*
    version: Text-2
    pendingReloadFromDisk: true *changed*
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/c/ca/caa/randomFileForImport.ts
    version: Text-2
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/c/ca/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/c/cb/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts
    version: Text-2
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/d/da/daa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/d/da/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts
    version: Text-2
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/e/ea/eaa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/e/ea/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/f/fa/faa/x/y/z/randomFileForImport.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/main.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json *default*
/home/src/workspaces/project/node_modules/pkg0/index.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/randomFileForImport.ts
    version: Text-3
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json

Info seq  [hh:mm:ss:mss] Running: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg0/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg0/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/randomFileForImport.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/randomFileForImport.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/a/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/a/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/b/ba/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/b/ba/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] ======== Resolving module 'pkg1' from '/home/src/workspaces/project/b/randomFileForImport.ts'. ========
Info seq  [hh:mm:ss:mss] Module resolution kind is not specified, using 'Node10'.
Info seq  [hh:mm:ss:mss] Loading module 'pkg1' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Resolution for module 'pkg1' was found in cache from location '/home/src/workspaces/project/b'.
Info seq  [hh:mm:ss:mss] ======== Module name 'pkg1' was not resolved. ========
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/b/randomFileForImport.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/c/ca/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/c/ca/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/c/ca/caa/randomFileForImport.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/c/cb/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/c/cb/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/d/da/daa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/d/da/daa/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/d/da/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/d/da/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/e/ea/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/e/ea/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/e/ea/eaa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/e/ea/eaa/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/workspaces/project/tsconfig.json projectStateVersion: 8 projectProgramVersion: 7 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (22)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/home/src/workspaces/project/main.ts SVC-1-0 "export const x = 10;"
	/home/src/workspaces/project/node_modules/pkg0/index.d.ts Text-1 "export interface ImportInterface0 {}"
	/home/src/workspaces/project/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/randomFileForImport.ts Text-3 "import type { ImportInterface1 } from \"pkg1\";\nimport type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;"
	/home/src/workspaces/project/a/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/b/ba/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/b/randomFileForImport.ts Text-3 "import type { ImportInterface1 } from \"pkg1\";\nimport type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;"
	/home/src/workspaces/project/c/ca/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/c/ca/caa/randomFileForImport.ts Text-2 "import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;"
	/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/c/cb/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts Text-2 "import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;"
	/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/d/da/daa/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/d/da/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/e/ea/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/e/ea/eaa/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts Text-2 "import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;"
	/home/src/workspaces/project/f/fa/faa/x/y/z/randomFileForImport.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Running: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Before ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (22)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/project/main.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] After ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (22)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/project/main.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] got projects updated in background /home/src/workspaces/project/main.ts
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectsUpdatedInBackground",
      "body": {
        "openFiles": [
          "/home/src/workspaces/project/main.ts"
        ]
      }
    }
After running Timeout callback:: count: 0

Projects::
/home/src/workspaces/project/tsconfig.json (Configured) *changed*
    projectStateVersion: 8
    projectProgramVersion: 8 *changed*
    dirty: false *changed*
    autoImportProviderHost: false

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/a/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/b/ba/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/b/randomFileForImport.ts *changed*
    version: Text-3 *changed*
    pendingReloadFromDisk: false *changed*
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/c/ca/caa/randomFileForImport.ts
    version: Text-2
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/c/ca/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/c/cb/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts
    version: Text-2
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/d/da/daa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/d/da/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts
    version: Text-2
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/e/ea/eaa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/e/ea/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/f/fa/faa/x/y/z/randomFileForImport.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/main.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json *default*
/home/src/workspaces/project/node_modules/pkg0/index.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/randomFileForImport.ts
    version: Text-3
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json

modify c/ca/caa/randomFileForImport by adding unresolved import
Info seq  [hh:mm:ss:mss] FileWatcher:: Triggered with /home/src/workspaces/project/c/ca/caa/randomFileForImport.ts 1:: WatchInfo: /home/src/workspaces/project/c/ca/caa/randomFileForImport.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Scheduled: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Elapsed:: *ms FileWatcher:: Triggered with /home/src/workspaces/project/c/ca/caa/randomFileForImport.ts 1:: WatchInfo: /home/src/workspaces/project/c/ca/caa/randomFileForImport.ts 500 undefined WatchType: Closed Script info
Before running Timeout callback:: count: 2
15: /home/src/workspaces/project/tsconfig.json
16: *ensureProjectForOpenFiles*
//// [/home/src/workspaces/project/c/ca/caa/randomFileForImport.ts]
import type { ImportInterface1 } from "pkg1";
import type { ImportInterface0 } from "pkg0";
export const x = 10;


Timeout callback:: count: 2
15: /home/src/workspaces/project/tsconfig.json *new*
16: *ensureProjectForOpenFiles* *new*

Projects::
/home/src/workspaces/project/tsconfig.json (Configured) *changed*
    projectStateVersion: 9 *changed*
    projectProgramVersion: 8
    dirty: true *changed*
    autoImportProviderHost: false

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/a/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/b/ba/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/b/randomFileForImport.ts
    version: Text-3
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/c/ca/caa/randomFileForImport.ts *changed*
    version: Text-2
    pendingReloadFromDisk: true *changed*
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/c/ca/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/c/cb/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts
    version: Text-2
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/d/da/daa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/d/da/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts
    version: Text-2
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/e/ea/eaa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/e/ea/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/f/fa/faa/x/y/z/randomFileForImport.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/main.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json *default*
/home/src/workspaces/project/node_modules/pkg0/index.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/randomFileForImport.ts
    version: Text-3
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json

Info seq  [hh:mm:ss:mss] Running: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg0/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg0/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/randomFileForImport.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/randomFileForImport.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/a/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/a/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/b/ba/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/b/ba/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/b/randomFileForImport.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/b/randomFileForImport.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/c/ca/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/c/ca/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] ======== Resolving module 'pkg1' from '/home/src/workspaces/project/c/ca/caa/randomFileForImport.ts'. ========
Info seq  [hh:mm:ss:mss] Module resolution kind is not specified, using 'Node10'.
Info seq  [hh:mm:ss:mss] Loading module 'pkg1' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Resolution for module 'pkg1' was found in cache from location '/home/src/workspaces/project/c/ca/caa'.
Info seq  [hh:mm:ss:mss] ======== Module name 'pkg1' was not resolved. ========
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/c/ca/caa/randomFileForImport.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/c/cb/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/c/cb/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/d/da/daa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/d/da/daa/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/d/da/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/d/da/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/e/ea/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/e/ea/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/e/ea/eaa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/e/ea/eaa/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/workspaces/project/tsconfig.json projectStateVersion: 9 projectProgramVersion: 8 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (22)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/home/src/workspaces/project/main.ts SVC-1-0 "export const x = 10;"
	/home/src/workspaces/project/node_modules/pkg0/index.d.ts Text-1 "export interface ImportInterface0 {}"
	/home/src/workspaces/project/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/randomFileForImport.ts Text-3 "import type { ImportInterface1 } from \"pkg1\";\nimport type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;"
	/home/src/workspaces/project/a/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/b/ba/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/b/randomFileForImport.ts Text-3 "import type { ImportInterface1 } from \"pkg1\";\nimport type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;"
	/home/src/workspaces/project/c/ca/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/c/ca/caa/randomFileForImport.ts Text-3 "import type { ImportInterface1 } from \"pkg1\";\nimport type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;"
	/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/c/cb/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts Text-2 "import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;"
	/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/d/da/daa/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/d/da/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/e/ea/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/e/ea/eaa/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts Text-2 "import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;"
	/home/src/workspaces/project/f/fa/faa/x/y/z/randomFileForImport.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Running: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Before ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (22)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/project/main.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] After ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (22)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/project/main.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] got projects updated in background /home/src/workspaces/project/main.ts
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectsUpdatedInBackground",
      "body": {
        "openFiles": [
          "/home/src/workspaces/project/main.ts"
        ]
      }
    }
After running Timeout callback:: count: 0

Projects::
/home/src/workspaces/project/tsconfig.json (Configured) *changed*
    projectStateVersion: 9
    projectProgramVersion: 9 *changed*
    dirty: false *changed*
    autoImportProviderHost: false

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/a/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/b/ba/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/b/randomFileForImport.ts
    version: Text-3
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/c/ca/caa/randomFileForImport.ts *changed*
    version: Text-3 *changed*
    pendingReloadFromDisk: false *changed*
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/c/ca/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/c/cb/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts
    version: Text-2
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/d/da/daa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/d/da/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts
    version: Text-2
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/e/ea/eaa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/e/ea/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/f/fa/faa/x/y/z/randomFileForImport.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/main.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json *default*
/home/src/workspaces/project/node_modules/pkg0/index.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/randomFileForImport.ts
    version: Text-3
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json

modify d/da/daa/daaa/x/y/z/randomFileForImport by adding unresolved import
Info seq  [hh:mm:ss:mss] FileWatcher:: Triggered with /home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts 1:: WatchInfo: /home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Scheduled: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Elapsed:: *ms FileWatcher:: Triggered with /home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts 1:: WatchInfo: /home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts 500 undefined WatchType: Closed Script info
Before running Timeout callback:: count: 2
17: /home/src/workspaces/project/tsconfig.json
18: *ensureProjectForOpenFiles*
//// [/home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts]
import type { ImportInterface1 } from "pkg1";
import type { ImportInterface0 } from "pkg0";
export const x = 10;


Timeout callback:: count: 2
17: /home/src/workspaces/project/tsconfig.json *new*
18: *ensureProjectForOpenFiles* *new*

Projects::
/home/src/workspaces/project/tsconfig.json (Configured) *changed*
    projectStateVersion: 10 *changed*
    projectProgramVersion: 9
    dirty: true *changed*
    autoImportProviderHost: false

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/a/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/b/ba/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/b/randomFileForImport.ts
    version: Text-3
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/c/ca/caa/randomFileForImport.ts
    version: Text-3
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/c/ca/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/c/cb/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts *changed*
    version: Text-2
    pendingReloadFromDisk: true *changed*
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/d/da/daa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/d/da/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts
    version: Text-2
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/e/ea/eaa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/e/ea/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/f/fa/faa/x/y/z/randomFileForImport.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/main.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json *default*
/home/src/workspaces/project/node_modules/pkg0/index.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/randomFileForImport.ts
    version: Text-3
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json

Info seq  [hh:mm:ss:mss] Running: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg0/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg0/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/randomFileForImport.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/randomFileForImport.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/a/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/a/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/b/ba/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/b/ba/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/b/randomFileForImport.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/b/randomFileForImport.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/c/ca/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/c/ca/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/c/ca/caa/randomFileForImport.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/c/ca/caa/randomFileForImport.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/c/cb/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/c/cb/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] ======== Resolving module 'pkg1' from '/home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts'. ========
Info seq  [hh:mm:ss:mss] Module resolution kind is not specified, using 'Node10'.
Info seq  [hh:mm:ss:mss] Loading module 'pkg1' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Directory '/home/src/workspaces/project/d/da/daa/daaa/x/y/z/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/src/workspaces/project/d/da/daa/daaa/x/y/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/src/workspaces/project/d/da/daa/daaa/x/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Resolution for module 'pkg1' was found in cache from location '/home/src/workspaces/project/d/da/daa/daaa'.
Info seq  [hh:mm:ss:mss] ======== Module name 'pkg1' was not resolved. ========
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/d/da/daa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/d/da/daa/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/d/da/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/d/da/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/e/ea/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/e/ea/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/e/ea/eaa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/e/ea/eaa/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/workspaces/project/tsconfig.json projectStateVersion: 10 projectProgramVersion: 9 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (22)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/home/src/workspaces/project/main.ts SVC-1-0 "export const x = 10;"
	/home/src/workspaces/project/node_modules/pkg0/index.d.ts Text-1 "export interface ImportInterface0 {}"
	/home/src/workspaces/project/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/randomFileForImport.ts Text-3 "import type { ImportInterface1 } from \"pkg1\";\nimport type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;"
	/home/src/workspaces/project/a/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/b/ba/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/b/randomFileForImport.ts Text-3 "import type { ImportInterface1 } from \"pkg1\";\nimport type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;"
	/home/src/workspaces/project/c/ca/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/c/ca/caa/randomFileForImport.ts Text-3 "import type { ImportInterface1 } from \"pkg1\";\nimport type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;"
	/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/c/cb/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts Text-3 "import type { ImportInterface1 } from \"pkg1\";\nimport type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;"
	/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/d/da/daa/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/d/da/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/e/ea/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/e/ea/eaa/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts Text-2 "import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;"
	/home/src/workspaces/project/f/fa/faa/x/y/z/randomFileForImport.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Running: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Before ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (22)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/project/main.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] After ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (22)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/project/main.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] got projects updated in background /home/src/workspaces/project/main.ts
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectsUpdatedInBackground",
      "body": {
        "openFiles": [
          "/home/src/workspaces/project/main.ts"
        ]
      }
    }
After running Timeout callback:: count: 0

Projects::
/home/src/workspaces/project/tsconfig.json (Configured) *changed*
    projectStateVersion: 10
    projectProgramVersion: 10 *changed*
    dirty: false *changed*
    autoImportProviderHost: false

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/a/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/b/ba/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/b/randomFileForImport.ts
    version: Text-3
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/c/ca/caa/randomFileForImport.ts
    version: Text-3
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/c/ca/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/c/cb/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts *changed*
    version: Text-3 *changed*
    pendingReloadFromDisk: false *changed*
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/d/da/daa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/d/da/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts
    version: Text-2
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/e/ea/eaa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/e/ea/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/f/fa/faa/x/y/z/randomFileForImport.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/main.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json *default*
/home/src/workspaces/project/node_modules/pkg0/index.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/randomFileForImport.ts
    version: Text-3
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json

modify e/ea/eaa/eaaa/x/y/z/randomFileForImport by adding unresolved import
Info seq  [hh:mm:ss:mss] FileWatcher:: Triggered with /home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts 1:: WatchInfo: /home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Scheduled: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Elapsed:: *ms FileWatcher:: Triggered with /home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts 1:: WatchInfo: /home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts 500 undefined WatchType: Closed Script info
Before running Timeout callback:: count: 2
19: /home/src/workspaces/project/tsconfig.json
20: *ensureProjectForOpenFiles*
//// [/home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts]
import type { ImportInterface1 } from "pkg1";
import type { ImportInterface0 } from "pkg0";
export const x = 10;


Timeout callback:: count: 2
19: /home/src/workspaces/project/tsconfig.json *new*
20: *ensureProjectForOpenFiles* *new*

Projects::
/home/src/workspaces/project/tsconfig.json (Configured) *changed*
    projectStateVersion: 11 *changed*
    projectProgramVersion: 10
    dirty: true *changed*
    autoImportProviderHost: false

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/a/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/b/ba/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/b/randomFileForImport.ts
    version: Text-3
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/c/ca/caa/randomFileForImport.ts
    version: Text-3
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/c/ca/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/c/cb/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts
    version: Text-3
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/d/da/daa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/d/da/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts *changed*
    version: Text-2
    pendingReloadFromDisk: true *changed*
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/e/ea/eaa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/e/ea/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/f/fa/faa/x/y/z/randomFileForImport.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/main.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json *default*
/home/src/workspaces/project/node_modules/pkg0/index.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/randomFileForImport.ts
    version: Text-3
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json

Info seq  [hh:mm:ss:mss] Running: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg0/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg0/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/randomFileForImport.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/randomFileForImport.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/a/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/a/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/b/ba/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/b/ba/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/b/randomFileForImport.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/b/randomFileForImport.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/c/ca/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/c/ca/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/c/ca/caa/randomFileForImport.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/c/ca/caa/randomFileForImport.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/c/cb/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/c/cb/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/d/da/daa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/d/da/daa/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/d/da/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/d/da/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/e/ea/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/e/ea/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/e/ea/eaa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/e/ea/eaa/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] ======== Resolving module 'pkg1' from '/home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts'. ========
Info seq  [hh:mm:ss:mss] Module resolution kind is not specified, using 'Node10'.
Info seq  [hh:mm:ss:mss] Loading module 'pkg1' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Directory '/home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/src/workspaces/project/e/ea/eaa/eaaa/x/y/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/src/workspaces/project/e/ea/eaa/eaaa/x/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Resolution for module 'pkg1' was found in cache from location '/home/src/workspaces/project/e/ea/eaa/eaaa'.
Info seq  [hh:mm:ss:mss] ======== Module name 'pkg1' was not resolved. ========
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/workspaces/project/tsconfig.json projectStateVersion: 11 projectProgramVersion: 10 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (22)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/home/src/workspaces/project/main.ts SVC-1-0 "export const x = 10;"
	/home/src/workspaces/project/node_modules/pkg0/index.d.ts Text-1 "export interface ImportInterface0 {}"
	/home/src/workspaces/project/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/randomFileForImport.ts Text-3 "import type { ImportInterface1 } from \"pkg1\";\nimport type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;"
	/home/src/workspaces/project/a/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/b/ba/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/b/randomFileForImport.ts Text-3 "import type { ImportInterface1 } from \"pkg1\";\nimport type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;"
	/home/src/workspaces/project/c/ca/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/c/ca/caa/randomFileForImport.ts Text-3 "import type { ImportInterface1 } from \"pkg1\";\nimport type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;"
	/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/c/cb/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts Text-3 "import type { ImportInterface1 } from \"pkg1\";\nimport type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;"
	/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/d/da/daa/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/d/da/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/e/ea/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/e/ea/eaa/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts Text-3 "import type { ImportInterface1 } from \"pkg1\";\nimport type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;"
	/home/src/workspaces/project/f/fa/faa/x/y/z/randomFileForImport.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Running: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Before ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (22)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/project/main.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] After ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (22)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/project/main.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] got projects updated in background /home/src/workspaces/project/main.ts
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectsUpdatedInBackground",
      "body": {
        "openFiles": [
          "/home/src/workspaces/project/main.ts"
        ]
      }
    }
After running Timeout callback:: count: 0

Projects::
/home/src/workspaces/project/tsconfig.json (Configured) *changed*
    projectStateVersion: 11
    projectProgramVersion: 11 *changed*
    dirty: false *changed*
    autoImportProviderHost: false

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/a/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/b/ba/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/b/randomFileForImport.ts
    version: Text-3
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/c/ca/caa/randomFileForImport.ts
    version: Text-3
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/c/ca/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/c/cb/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts
    version: Text-3
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/d/da/daa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/d/da/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts *changed*
    version: Text-3 *changed*
    pendingReloadFromDisk: false *changed*
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/e/ea/eaa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/e/ea/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/f/fa/faa/x/y/z/randomFileForImport.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/main.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json *default*
/home/src/workspaces/project/node_modules/pkg0/index.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/randomFileForImport.ts
    version: Text-3
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json

modify f/fa/faa/x/y/z/randomFileForImport by adding import
Info seq  [hh:mm:ss:mss] FileWatcher:: Triggered with /home/src/workspaces/project/f/fa/faa/x/y/z/randomFileForImport.ts 1:: WatchInfo: /home/src/workspaces/project/f/fa/faa/x/y/z/randomFileForImport.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Scheduled: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Elapsed:: *ms FileWatcher:: Triggered with /home/src/workspaces/project/f/fa/faa/x/y/z/randomFileForImport.ts 1:: WatchInfo: /home/src/workspaces/project/f/fa/faa/x/y/z/randomFileForImport.ts 500 undefined WatchType: Closed Script info
Before running Timeout callback:: count: 2
21: /home/src/workspaces/project/tsconfig.json
22: *ensureProjectForOpenFiles*
//// [/home/src/workspaces/project/f/fa/faa/x/y/z/randomFileForImport.ts]
import type { ImportInterface0 } from "pkg0";
export const x = 10;


Timeout callback:: count: 2
21: /home/src/workspaces/project/tsconfig.json *new*
22: *ensureProjectForOpenFiles* *new*

Projects::
/home/src/workspaces/project/tsconfig.json (Configured) *changed*
    projectStateVersion: 12 *changed*
    projectProgramVersion: 11
    dirty: true *changed*
    autoImportProviderHost: false

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/a/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/b/ba/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/b/randomFileForImport.ts
    version: Text-3
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/c/ca/caa/randomFileForImport.ts
    version: Text-3
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/c/ca/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/c/cb/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts
    version: Text-3
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/d/da/daa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/d/da/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts
    version: Text-3
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/e/ea/eaa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/e/ea/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/f/fa/faa/x/y/z/randomFileForImport.ts *changed*
    version: Text-1
    pendingReloadFromDisk: true *changed*
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/main.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json *default*
/home/src/workspaces/project/node_modules/pkg0/index.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/randomFileForImport.ts
    version: Text-3
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json

Info seq  [hh:mm:ss:mss] Running: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg0/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg0/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/randomFileForImport.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/randomFileForImport.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/a/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/a/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/b/ba/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/b/ba/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/b/randomFileForImport.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/b/randomFileForImport.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/c/ca/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/c/ca/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/c/ca/caa/randomFileForImport.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/c/ca/caa/randomFileForImport.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/c/cb/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/c/cb/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/d/da/daa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/d/da/daa/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/d/da/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/d/da/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/e/ea/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/e/ea/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/e/ea/eaa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/e/ea/eaa/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] ======== Resolving module 'pkg0' from '/home/src/workspaces/project/f/fa/faa/x/y/z/randomFileForImport.ts'. ========
Info seq  [hh:mm:ss:mss] Module resolution kind is not specified, using 'Node10'.
Info seq  [hh:mm:ss:mss] Loading module 'pkg0' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Directory '/home/src/workspaces/project/f/fa/faa/x/y/z/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/src/workspaces/project/f/fa/faa/x/y/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/src/workspaces/project/f/fa/faa/x/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Resolution for module 'pkg0' was found in cache from location '/home/src/workspaces/project/f/fa/faa'.
Info seq  [hh:mm:ss:mss] ======== Module name 'pkg0' was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'. ========
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/workspaces/project/tsconfig.json projectStateVersion: 12 projectProgramVersion: 11 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (22)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/home/src/workspaces/project/main.ts SVC-1-0 "export const x = 10;"
	/home/src/workspaces/project/node_modules/pkg0/index.d.ts Text-1 "export interface ImportInterface0 {}"
	/home/src/workspaces/project/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/randomFileForImport.ts Text-3 "import type { ImportInterface1 } from \"pkg1\";\nimport type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;"
	/home/src/workspaces/project/a/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/b/ba/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/b/randomFileForImport.ts Text-3 "import type { ImportInterface1 } from \"pkg1\";\nimport type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;"
	/home/src/workspaces/project/c/ca/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/c/ca/caa/randomFileForImport.ts Text-3 "import type { ImportInterface1 } from \"pkg1\";\nimport type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;"
	/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/c/cb/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts Text-3 "import type { ImportInterface1 } from \"pkg1\";\nimport type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;"
	/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/d/da/daa/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/d/da/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/e/ea/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/e/ea/eaa/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts Text-3 "import type { ImportInterface1 } from \"pkg1\";\nimport type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;"
	/home/src/workspaces/project/f/fa/faa/x/y/z/randomFileForImport.ts Text-2 "import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;"
	/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Running: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Before ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (22)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/project/main.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] After ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (22)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/project/main.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] got projects updated in background /home/src/workspaces/project/main.ts
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectsUpdatedInBackground",
      "body": {
        "openFiles": [
          "/home/src/workspaces/project/main.ts"
        ]
      }
    }
After running Timeout callback:: count: 0

Projects::
/home/src/workspaces/project/tsconfig.json (Configured) *changed*
    projectStateVersion: 12
    projectProgramVersion: 12 *changed*
    dirty: false *changed*
    autoImportProviderHost: false

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/a/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/b/ba/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/b/randomFileForImport.ts
    version: Text-3
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/c/ca/caa/randomFileForImport.ts
    version: Text-3
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/c/ca/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/c/cb/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts
    version: Text-3
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/d/da/daa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/d/da/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts
    version: Text-3
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/e/ea/eaa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/e/ea/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/f/fa/faa/x/y/z/randomFileForImport.ts *changed*
    version: Text-2 *changed*
    pendingReloadFromDisk: false *changed*
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/main.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json *default*
/home/src/workspaces/project/node_modules/pkg0/index.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/randomFileForImport.ts
    version: Text-3
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json

modify f/fa/faa/x/y/z/randomFileForImport by adding unresolved import
Info seq  [hh:mm:ss:mss] FileWatcher:: Triggered with /home/src/workspaces/project/f/fa/faa/x/y/z/randomFileForImport.ts 1:: WatchInfo: /home/src/workspaces/project/f/fa/faa/x/y/z/randomFileForImport.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Scheduled: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Elapsed:: *ms FileWatcher:: Triggered with /home/src/workspaces/project/f/fa/faa/x/y/z/randomFileForImport.ts 1:: WatchInfo: /home/src/workspaces/project/f/fa/faa/x/y/z/randomFileForImport.ts 500 undefined WatchType: Closed Script info
Before running Timeout callback:: count: 2
23: /home/src/workspaces/project/tsconfig.json
24: *ensureProjectForOpenFiles*
//// [/home/src/workspaces/project/f/fa/faa/x/y/z/randomFileForImport.ts]
import type { ImportInterface1 } from "pkg1";
import type { ImportInterface0 } from "pkg0";
export const x = 10;


Timeout callback:: count: 2
23: /home/src/workspaces/project/tsconfig.json *new*
24: *ensureProjectForOpenFiles* *new*

Projects::
/home/src/workspaces/project/tsconfig.json (Configured) *changed*
    projectStateVersion: 13 *changed*
    projectProgramVersion: 12
    dirty: true *changed*
    autoImportProviderHost: false

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/a/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/b/ba/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/b/randomFileForImport.ts
    version: Text-3
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/c/ca/caa/randomFileForImport.ts
    version: Text-3
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/c/ca/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/c/cb/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts
    version: Text-3
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/d/da/daa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/d/da/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts
    version: Text-3
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/e/ea/eaa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/e/ea/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/f/fa/faa/x/y/z/randomFileForImport.ts *changed*
    version: Text-2
    pendingReloadFromDisk: true *changed*
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/main.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json *default*
/home/src/workspaces/project/node_modules/pkg0/index.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/randomFileForImport.ts
    version: Text-3
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json

Info seq  [hh:mm:ss:mss] Running: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg0/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg0/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/randomFileForImport.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/randomFileForImport.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/a/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/a/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/b/ba/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/b/ba/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/b/randomFileForImport.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/b/randomFileForImport.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/c/ca/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/c/ca/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/c/ca/caa/randomFileForImport.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/c/ca/caa/randomFileForImport.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/c/cb/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/c/cb/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/d/da/daa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/d/da/daa/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/d/da/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/d/da/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/e/ea/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/e/ea/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/e/ea/eaa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/e/ea/eaa/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] ======== Resolving module 'pkg1' from '/home/src/workspaces/project/f/fa/faa/x/y/z/randomFileForImport.ts'. ========
Info seq  [hh:mm:ss:mss] Module resolution kind is not specified, using 'Node10'.
Info seq  [hh:mm:ss:mss] Loading module 'pkg1' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Directory '/home/src/workspaces/project/f/fa/faa/x/y/z/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/src/workspaces/project/f/fa/faa/x/y/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/src/workspaces/project/f/fa/faa/x/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Resolution for module 'pkg1' was found in cache from location '/home/src/workspaces/project/f/fa/faa'.
Info seq  [hh:mm:ss:mss] ======== Module name 'pkg1' was not resolved. ========
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/f/fa/faa/x/y/z/randomFileForImport.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/workspaces/project/tsconfig.json projectStateVersion: 13 projectProgramVersion: 12 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (22)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/home/src/workspaces/project/main.ts SVC-1-0 "export const x = 10;"
	/home/src/workspaces/project/node_modules/pkg0/index.d.ts Text-1 "export interface ImportInterface0 {}"
	/home/src/workspaces/project/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/randomFileForImport.ts Text-3 "import type { ImportInterface1 } from \"pkg1\";\nimport type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;"
	/home/src/workspaces/project/a/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/b/ba/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/b/randomFileForImport.ts Text-3 "import type { ImportInterface1 } from \"pkg1\";\nimport type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;"
	/home/src/workspaces/project/c/ca/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/c/ca/caa/randomFileForImport.ts Text-3 "import type { ImportInterface1 } from \"pkg1\";\nimport type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;"
	/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/c/cb/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts Text-3 "import type { ImportInterface1 } from \"pkg1\";\nimport type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;"
	/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/d/da/daa/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/d/da/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/e/ea/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/e/ea/eaa/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts Text-3 "import type { ImportInterface1 } from \"pkg1\";\nimport type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;"
	/home/src/workspaces/project/f/fa/faa/x/y/z/randomFileForImport.ts Text-3 "import type { ImportInterface1 } from \"pkg1\";\nimport type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;"
	/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Running: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Before ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (22)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/project/main.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] After ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (22)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/project/main.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] got projects updated in background /home/src/workspaces/project/main.ts
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectsUpdatedInBackground",
      "body": {
        "openFiles": [
          "/home/src/workspaces/project/main.ts"
        ]
      }
    }
After running Timeout callback:: count: 0

Projects::
/home/src/workspaces/project/tsconfig.json (Configured) *changed*
    projectStateVersion: 13
    projectProgramVersion: 13 *changed*
    dirty: false *changed*
    autoImportProviderHost: false

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/a/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/b/ba/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/b/randomFileForImport.ts
    version: Text-3
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/c/ca/caa/randomFileForImport.ts
    version: Text-3
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/c/ca/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/c/cb/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts
    version: Text-3
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/d/da/daa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/d/da/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts
    version: Text-3
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/e/ea/eaa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/e/ea/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/f/fa/faa/x/y/z/randomFileForImport.ts *changed*
    version: Text-3 *changed*
    pendingReloadFromDisk: false *changed*
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/main.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json *default*
/home/src/workspaces/project/node_modules/pkg0/index.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/randomFileForImport.ts
    version: Text-3
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json

add file for unresolved import and random edit
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /home/src/workspaces/project/node_modules/pkg1 :: WatchInfo: /home/src/workspaces/project/node_modules 1 undefined Project: /home/src/workspaces/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Scheduled: /home/src/workspaces/project/tsconfig.jsonFailedLookupInvalidation
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/workspaces/project/node_modules/pkg1 :: WatchInfo: /home/src/workspaces/project/node_modules 1 undefined Project: /home/src/workspaces/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /home/src/workspaces/project/node_modules/pkg1 :: WatchInfo: /home/src/workspaces/project/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/workspaces/project/node_modules/pkg1 :: WatchInfo: /home/src/workspaces/project/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /home/src/workspaces/project/node_modules/pkg1/index.d.ts :: WatchInfo: /home/src/workspaces/project/node_modules 1 undefined Project: /home/src/workspaces/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Scheduled: /home/src/workspaces/project/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/workspaces/project/node_modules/pkg1/index.d.ts :: WatchInfo: /home/src/workspaces/project/node_modules 1 undefined Project: /home/src/workspaces/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /home/src/workspaces/project/node_modules/pkg1/index.d.ts :: WatchInfo: /home/src/workspaces/project/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/workspaces/project/node_modules/pkg1/index.d.ts :: WatchInfo: /home/src/workspaces/project/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info seq  [hh:mm:ss:mss] FileWatcher:: Triggered with /home/src/workspaces/project/randomFileForImport.ts 1:: WatchInfo: /home/src/workspaces/project/randomFileForImport.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Scheduled: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Elapsed:: *ms FileWatcher:: Triggered with /home/src/workspaces/project/randomFileForImport.ts 1:: WatchInfo: /home/src/workspaces/project/randomFileForImport.ts 500 undefined WatchType: Closed Script info
Before running Timeout callback:: count: 3
26: /home/src/workspaces/project/tsconfig.jsonFailedLookupInvalidation
27: /home/src/workspaces/project/tsconfig.json
28: *ensureProjectForOpenFiles*
//// [/home/src/workspaces/project/randomFileForImport.ts]
import type { ImportInterface1 } from "pkg1";
import type { ImportInterface0 } from "pkg0";
export const x = 10;export const y = 10;

//// [/home/src/workspaces/project/node_modules/pkg1/index.d.ts]
export interface ImportInterface1 {}


Timeout callback:: count: 3
26: /home/src/workspaces/project/tsconfig.jsonFailedLookupInvalidation *new*
27: /home/src/workspaces/project/tsconfig.json *new*
28: *ensureProjectForOpenFiles* *new*

Projects::
/home/src/workspaces/project/tsconfig.json (Configured) *changed*
    projectStateVersion: 14 *changed*
    projectProgramVersion: 13
    dirty: true *changed*
    autoImportProviderHost: false

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/a/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/b/ba/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/b/randomFileForImport.ts
    version: Text-3
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/c/ca/caa/randomFileForImport.ts
    version: Text-3
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/c/ca/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/c/cb/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts
    version: Text-3
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/d/da/daa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/d/da/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts
    version: Text-3
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/e/ea/eaa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/e/ea/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/f/fa/faa/x/y/z/randomFileForImport.ts
    version: Text-3
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/main.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json *default*
/home/src/workspaces/project/node_modules/pkg0/index.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/randomFileForImport.ts *changed*
    version: Text-3
    pendingReloadFromDisk: true *changed*
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json

Info seq  [hh:mm:ss:mss] Running: /home/src/workspaces/project/tsconfig.jsonFailedLookupInvalidation
Info seq  [hh:mm:ss:mss] Scheduled: /home/src/workspaces/project/tsconfig.json, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
After running Timeout callback:: count: 2

Timeout callback:: count: 2
27: /home/src/workspaces/project/tsconfig.json *deleted*
28: *ensureProjectForOpenFiles* *deleted*
29: /home/src/workspaces/project/tsconfig.json *new*
30: *ensureProjectForOpenFiles* *new*

Before running Timeout callback:: count: 2
29: /home/src/workspaces/project/tsconfig.json
30: *ensureProjectForOpenFiles*

Info seq  [hh:mm:ss:mss] Running: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg0/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] ======== Resolving module 'pkg1' from '/home/src/workspaces/project/fileWithImports.ts'. ========
Info seq  [hh:mm:ss:mss] Module resolution kind is not specified, using 'Node10'.
Info seq  [hh:mm:ss:mss] Loading module 'pkg1' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg1/package.json' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg1.ts' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg1.tsx' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg1.d.ts' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg1/index.ts' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg1/index.tsx' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg1/index.d.ts' exists - use it as a name resolution result.
Info seq  [hh:mm:ss:mss] Resolving real path for '/home/src/workspaces/project/node_modules/pkg1/index.d.ts', result '/home/src/workspaces/project/node_modules/pkg1/index.d.ts'.
Info seq  [hh:mm:ss:mss] ======== Module name 'pkg1' was successfully resolved to '/home/src/workspaces/project/node_modules/pkg1/index.d.ts'. ========
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg0/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg1/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] ======== Resolving module 'pkg1' from '/home/src/workspaces/project/randomFileForImport.ts'. ========
Info seq  [hh:mm:ss:mss] Resolution for module 'pkg1' was found in cache from location '/home/src/workspaces/project'.
Info seq  [hh:mm:ss:mss] ======== Module name 'pkg1' was successfully resolved to '/home/src/workspaces/project/node_modules/pkg1/index.d.ts'. ========
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/randomFileForImport.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/a/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] ======== Resolving module 'pkg1' from '/home/src/workspaces/project/a/fileWithImports.ts'. ========
Info seq  [hh:mm:ss:mss] Module resolution kind is not specified, using 'Node10'.
Info seq  [hh:mm:ss:mss] Loading module 'pkg1' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Directory '/home/src/workspaces/project/a/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Resolution for module 'pkg1' was found in cache from location '/home/src/workspaces/project'.
Info seq  [hh:mm:ss:mss] ======== Module name 'pkg1' was successfully resolved to '/home/src/workspaces/project/node_modules/pkg1/index.d.ts'. ========
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/b/ba/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] ======== Resolving module 'pkg1' from '/home/src/workspaces/project/b/ba/fileWithImports.ts'. ========
Info seq  [hh:mm:ss:mss] Module resolution kind is not specified, using 'Node10'.
Info seq  [hh:mm:ss:mss] Loading module 'pkg1' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Directory '/home/src/workspaces/project/b/ba/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/src/workspaces/project/b/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Resolution for module 'pkg1' was found in cache from location '/home/src/workspaces/project'.
Info seq  [hh:mm:ss:mss] ======== Module name 'pkg1' was successfully resolved to '/home/src/workspaces/project/node_modules/pkg1/index.d.ts'. ========
Info seq  [hh:mm:ss:mss] ======== Resolving module 'pkg1' from '/home/src/workspaces/project/b/randomFileForImport.ts'. ========
Info seq  [hh:mm:ss:mss] Module resolution kind is not specified, using 'Node10'.
Info seq  [hh:mm:ss:mss] Loading module 'pkg1' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Resolution for module 'pkg1' was found in cache from location '/home/src/workspaces/project/b'.
Info seq  [hh:mm:ss:mss] ======== Module name 'pkg1' was successfully resolved to '/home/src/workspaces/project/node_modules/pkg1/index.d.ts'. ========
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/b/randomFileForImport.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/c/ca/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] ======== Resolving module 'pkg1' from '/home/src/workspaces/project/c/ca/fileWithImports.ts'. ========
Info seq  [hh:mm:ss:mss] Module resolution kind is not specified, using 'Node10'.
Info seq  [hh:mm:ss:mss] Loading module 'pkg1' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Directory '/home/src/workspaces/project/c/ca/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/src/workspaces/project/c/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Resolution for module 'pkg1' was found in cache from location '/home/src/workspaces/project'.
Info seq  [hh:mm:ss:mss] ======== Module name 'pkg1' was successfully resolved to '/home/src/workspaces/project/node_modules/pkg1/index.d.ts'. ========
Info seq  [hh:mm:ss:mss] ======== Resolving module 'pkg1' from '/home/src/workspaces/project/c/ca/caa/randomFileForImport.ts'. ========
Info seq  [hh:mm:ss:mss] Module resolution kind is not specified, using 'Node10'.
Info seq  [hh:mm:ss:mss] Loading module 'pkg1' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Directory '/home/src/workspaces/project/c/ca/caa/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Resolution for module 'pkg1' was found in cache from location '/home/src/workspaces/project/c/ca'.
Info seq  [hh:mm:ss:mss] ======== Module name 'pkg1' was successfully resolved to '/home/src/workspaces/project/node_modules/pkg1/index.d.ts'. ========
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/c/ca/caa/randomFileForImport.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] ======== Resolving module 'pkg1' from '/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts'. ========
Info seq  [hh:mm:ss:mss] Module resolution kind is not specified, using 'Node10'.
Info seq  [hh:mm:ss:mss] Loading module 'pkg1' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Directory '/home/src/workspaces/project/c/ca/caa/caaa/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Resolution for module 'pkg1' was found in cache from location '/home/src/workspaces/project/c/ca/caa'.
Info seq  [hh:mm:ss:mss] ======== Module name 'pkg1' was successfully resolved to '/home/src/workspaces/project/node_modules/pkg1/index.d.ts'. ========
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/c/cb/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] ======== Resolving module 'pkg1' from '/home/src/workspaces/project/c/cb/fileWithImports.ts'. ========
Info seq  [hh:mm:ss:mss] Module resolution kind is not specified, using 'Node10'.
Info seq  [hh:mm:ss:mss] Loading module 'pkg1' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Directory '/home/src/workspaces/project/c/cb/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Resolution for module 'pkg1' was found in cache from location '/home/src/workspaces/project/c'.
Info seq  [hh:mm:ss:mss] ======== Module name 'pkg1' was successfully resolved to '/home/src/workspaces/project/node_modules/pkg1/index.d.ts'. ========
Info seq  [hh:mm:ss:mss] ======== Resolving module 'pkg1' from '/home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts'. ========
Info seq  [hh:mm:ss:mss] Module resolution kind is not specified, using 'Node10'.
Info seq  [hh:mm:ss:mss] Loading module 'pkg1' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Directory '/home/src/workspaces/project/d/da/daa/daaa/x/y/z/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/src/workspaces/project/d/da/daa/daaa/x/y/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/src/workspaces/project/d/da/daa/daaa/x/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/src/workspaces/project/d/da/daa/daaa/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/src/workspaces/project/d/da/daa/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/src/workspaces/project/d/da/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/src/workspaces/project/d/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Resolution for module 'pkg1' was found in cache from location '/home/src/workspaces/project'.
Info seq  [hh:mm:ss:mss] ======== Module name 'pkg1' was successfully resolved to '/home/src/workspaces/project/node_modules/pkg1/index.d.ts'. ========
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] ======== Resolving module 'pkg1' from '/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts'. ========
Info seq  [hh:mm:ss:mss] Module resolution kind is not specified, using 'Node10'.
Info seq  [hh:mm:ss:mss] Loading module 'pkg1' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Resolution for module 'pkg1' was found in cache from location '/home/src/workspaces/project/d/da/daa/daaa'.
Info seq  [hh:mm:ss:mss] ======== Module name 'pkg1' was successfully resolved to '/home/src/workspaces/project/node_modules/pkg1/index.d.ts'. ========
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/d/da/daa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] ======== Resolving module 'pkg1' from '/home/src/workspaces/project/d/da/daa/fileWithImports.ts'. ========
Info seq  [hh:mm:ss:mss] Module resolution kind is not specified, using 'Node10'.
Info seq  [hh:mm:ss:mss] Loading module 'pkg1' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Resolution for module 'pkg1' was found in cache from location '/home/src/workspaces/project/d/da/daa'.
Info seq  [hh:mm:ss:mss] ======== Module name 'pkg1' was successfully resolved to '/home/src/workspaces/project/node_modules/pkg1/index.d.ts'. ========
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/d/da/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] ======== Resolving module 'pkg1' from '/home/src/workspaces/project/d/da/fileWithImports.ts'. ========
Info seq  [hh:mm:ss:mss] Module resolution kind is not specified, using 'Node10'.
Info seq  [hh:mm:ss:mss] Loading module 'pkg1' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Resolution for module 'pkg1' was found in cache from location '/home/src/workspaces/project/d/da'.
Info seq  [hh:mm:ss:mss] ======== Module name 'pkg1' was successfully resolved to '/home/src/workspaces/project/node_modules/pkg1/index.d.ts'. ========
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/e/ea/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] ======== Resolving module 'pkg1' from '/home/src/workspaces/project/e/ea/fileWithImports.ts'. ========
Info seq  [hh:mm:ss:mss] Module resolution kind is not specified, using 'Node10'.
Info seq  [hh:mm:ss:mss] Loading module 'pkg1' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Directory '/home/src/workspaces/project/e/ea/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/src/workspaces/project/e/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Resolution for module 'pkg1' was found in cache from location '/home/src/workspaces/project'.
Info seq  [hh:mm:ss:mss] ======== Module name 'pkg1' was successfully resolved to '/home/src/workspaces/project/node_modules/pkg1/index.d.ts'. ========
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/e/ea/eaa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] ======== Resolving module 'pkg1' from '/home/src/workspaces/project/e/ea/eaa/fileWithImports.ts'. ========
Info seq  [hh:mm:ss:mss] Module resolution kind is not specified, using 'Node10'.
Info seq  [hh:mm:ss:mss] Loading module 'pkg1' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Directory '/home/src/workspaces/project/e/ea/eaa/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Resolution for module 'pkg1' was found in cache from location '/home/src/workspaces/project/e/ea'.
Info seq  [hh:mm:ss:mss] ======== Module name 'pkg1' was successfully resolved to '/home/src/workspaces/project/node_modules/pkg1/index.d.ts'. ========
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] ======== Resolving module 'pkg1' from '/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts'. ========
Info seq  [hh:mm:ss:mss] Module resolution kind is not specified, using 'Node10'.
Info seq  [hh:mm:ss:mss] Loading module 'pkg1' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Directory '/home/src/workspaces/project/e/ea/eaa/eaaa/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Resolution for module 'pkg1' was found in cache from location '/home/src/workspaces/project/e/ea/eaa'.
Info seq  [hh:mm:ss:mss] ======== Module name 'pkg1' was successfully resolved to '/home/src/workspaces/project/node_modules/pkg1/index.d.ts'. ========
Info seq  [hh:mm:ss:mss] ======== Resolving module 'pkg1' from '/home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts'. ========
Info seq  [hh:mm:ss:mss] Module resolution kind is not specified, using 'Node10'.
Info seq  [hh:mm:ss:mss] Loading module 'pkg1' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Directory '/home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/src/workspaces/project/e/ea/eaa/eaaa/x/y/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/src/workspaces/project/e/ea/eaa/eaaa/x/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Resolution for module 'pkg1' was found in cache from location '/home/src/workspaces/project/e/ea/eaa/eaaa'.
Info seq  [hh:mm:ss:mss] ======== Module name 'pkg1' was successfully resolved to '/home/src/workspaces/project/node_modules/pkg1/index.d.ts'. ========
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] ======== Resolving module 'pkg1' from '/home/src/workspaces/project/f/fa/faa/x/y/z/randomFileForImport.ts'. ========
Info seq  [hh:mm:ss:mss] Module resolution kind is not specified, using 'Node10'.
Info seq  [hh:mm:ss:mss] Loading module 'pkg1' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Directory '/home/src/workspaces/project/f/fa/faa/x/y/z/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/src/workspaces/project/f/fa/faa/x/y/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/src/workspaces/project/f/fa/faa/x/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/src/workspaces/project/f/fa/faa/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/src/workspaces/project/f/fa/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/src/workspaces/project/f/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Resolution for module 'pkg1' was found in cache from location '/home/src/workspaces/project'.
Info seq  [hh:mm:ss:mss] ======== Module name 'pkg1' was successfully resolved to '/home/src/workspaces/project/node_modules/pkg1/index.d.ts'. ========
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/f/fa/faa/x/y/z/randomFileForImport.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] ======== Resolving module 'pkg1' from '/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts'. ========
Info seq  [hh:mm:ss:mss] Module resolution kind is not specified, using 'Node10'.
Info seq  [hh:mm:ss:mss] Loading module 'pkg1' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Directory '/home/src/workspaces/project/f/fa/faa/faaa/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Resolution for module 'pkg1' was found in cache from location '/home/src/workspaces/project/f/fa/faa'.
Info seq  [hh:mm:ss:mss] ======== Module name 'pkg1' was successfully resolved to '/home/src/workspaces/project/node_modules/pkg1/index.d.ts'. ========
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules/pkg1/package.json 2000 undefined Project: /home/src/workspaces/project/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /home/src/workspaces/node_modules 1 undefined Project: /home/src/workspaces/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /home/src/workspaces/node_modules 1 undefined Project: /home/src/workspaces/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/workspaces/project/tsconfig.json projectStateVersion: 14 projectProgramVersion: 13 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (23)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/home/src/workspaces/project/main.ts SVC-1-0 "export const x = 10;"
	/home/src/workspaces/project/node_modules/pkg0/index.d.ts Text-1 "export interface ImportInterface0 {}"
	/home/src/workspaces/project/node_modules/pkg1/index.d.ts Text-1 "export interface ImportInterface1 {}"
	/home/src/workspaces/project/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/randomFileForImport.ts Text-4 "import type { ImportInterface1 } from \"pkg1\";\nimport type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;export const y = 10;"
	/home/src/workspaces/project/a/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/b/ba/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/b/randomFileForImport.ts Text-3 "import type { ImportInterface1 } from \"pkg1\";\nimport type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;"
	/home/src/workspaces/project/c/ca/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/c/ca/caa/randomFileForImport.ts Text-3 "import type { ImportInterface1 } from \"pkg1\";\nimport type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;"
	/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/c/cb/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts Text-3 "import type { ImportInterface1 } from \"pkg1\";\nimport type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;"
	/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/d/da/daa/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/d/da/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/e/ea/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/e/ea/eaa/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts Text-3 "import type { ImportInterface1 } from \"pkg1\";\nimport type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;"
	/home/src/workspaces/project/f/fa/faa/x/y/z/randomFileForImport.ts Text-3 "import type { ImportInterface1 } from \"pkg1\";\nimport type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;"
	/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"


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

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Running: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Before ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (23)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/project/main.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] After ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (23)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/project/main.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] got projects updated in background /home/src/workspaces/project/main.ts
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectsUpdatedInBackground",
      "body": {
        "openFiles": [
          "/home/src/workspaces/project/main.ts"
        ]
      }
    }
After running Timeout callback:: count: 0

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

Projects::
/home/src/workspaces/project/tsconfig.json (Configured) *changed*
    projectStateVersion: 14
    projectProgramVersion: 14 *changed*
    dirty: false *changed*
    autoImportProviderHost: undefined *changed*

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/a/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/b/ba/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/b/randomFileForImport.ts
    version: Text-3
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/c/ca/caa/randomFileForImport.ts
    version: Text-3
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/c/ca/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/c/cb/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts
    version: Text-3
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/d/da/daa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/d/da/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts
    version: Text-3
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/e/ea/eaa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/e/ea/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/f/fa/faa/x/y/z/randomFileForImport.ts
    version: Text-3
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/main.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json *default*
/home/src/workspaces/project/node_modules/pkg0/index.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/node_modules/pkg1/index.d.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/randomFileForImport.ts *changed*
    version: Text-4 *changed*
    pendingReloadFromDisk: false *changed*
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json

delete file b/ba/fileWithImports.ts
Info seq  [hh:mm:ss:mss] FileWatcher:: Triggered with /home/src/workspaces/project/b/ba/fileWithImports.ts 2:: WatchInfo: /home/src/workspaces/project/b/ba/fileWithImports.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Scheduled: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Elapsed:: *ms FileWatcher:: Triggered with /home/src/workspaces/project/b/ba/fileWithImports.ts 2:: WatchInfo: /home/src/workspaces/project/b/ba/fileWithImports.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /home/src/workspaces/project/b/ba/fileWithImports.ts :: WatchInfo: /home/src/workspaces/project/b 1 undefined Project: /home/src/workspaces/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Scheduled: /home/src/workspaces/project/tsconfig.jsonFailedLookupInvalidation
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/workspaces/project/b/ba/fileWithImports.ts :: WatchInfo: /home/src/workspaces/project/b 1 undefined Project: /home/src/workspaces/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] FileWatcher:: Triggered with /home/src/workspaces/project/tsconfig.json 1:: WatchInfo: /home/src/workspaces/project/tsconfig.json 2000 undefined Project: /home/src/workspaces/project/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] Scheduled: /home/src/workspaces/project/tsconfig.json, Cancelled earlier one
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /home/src/workspaces/project/main.ts ProjectRootPath: undefined:: Result: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms FileWatcher:: Triggered with /home/src/workspaces/project/tsconfig.json 1:: WatchInfo: /home/src/workspaces/project/tsconfig.json 2000 undefined Project: /home/src/workspaces/project/tsconfig.json WatchType: Config file
Before running Timeout callback:: count: 3
33: /home/src/workspaces/project/tsconfig.jsonFailedLookupInvalidation
34: /home/src/workspaces/project/tsconfig.json
35: *ensureProjectForOpenFiles*
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

Timeout callback:: count: 3
33: /home/src/workspaces/project/tsconfig.jsonFailedLookupInvalidation *new*
34: /home/src/workspaces/project/tsconfig.json *new*
35: *ensureProjectForOpenFiles* *new*

Projects::
/home/src/workspaces/project/tsconfig.json (Configured) *changed*
    projectStateVersion: 15 *changed*
    projectProgramVersion: 14
    dirty: true *changed*

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/a/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/b/ba/fileWithImports.ts *changed*
    version: Text-1
    pendingReloadFromDisk: true *changed*
    deferredDelete: true *changed*
    containingProjects: 0 *changed*
        /home/src/workspaces/project/tsconfig.json *deleted*
/home/src/workspaces/project/b/randomFileForImport.ts
    version: Text-3
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/c/ca/caa/randomFileForImport.ts
    version: Text-3
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/c/ca/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/c/cb/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts
    version: Text-3
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/d/da/daa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/d/da/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts
    version: Text-3
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/e/ea/eaa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/e/ea/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/f/fa/faa/x/y/z/randomFileForImport.ts
    version: Text-3
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/main.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json *default*
/home/src/workspaces/project/node_modules/pkg0/index.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/node_modules/pkg1/index.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/randomFileForImport.ts
    version: Text-4
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json

Info seq  [hh:mm:ss:mss] Running: /home/src/workspaces/project/tsconfig.jsonFailedLookupInvalidation
Info seq  [hh:mm:ss:mss] Running: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/home/src/workspaces/project/tsconfig.json",
        "reason": "Change in config file detected"
      }
    }
Info seq  [hh:mm:ss:mss] Config: /home/src/workspaces/project/tsconfig.json : {
 "rootNames": [
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
 ],
 "options": {
  "traceResolution": true,
  "configFilePath": "/home/src/workspaces/project/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg1/index.d.ts'.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg0/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg1/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/randomFileForImport.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg1/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/randomFileForImport.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/a/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/a/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg1/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/b/randomFileForImport.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg1/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/b/randomFileForImport.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/c/ca/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/c/ca/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg1/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/c/ca/caa/randomFileForImport.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg1/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/c/ca/caa/randomFileForImport.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg1/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/c/cb/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/c/cb/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg1/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg1/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg1/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/d/da/daa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/d/da/daa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg1/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/d/da/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/d/da/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg1/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/e/ea/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/e/ea/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg1/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/e/ea/eaa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/e/ea/eaa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg1/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg1/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg1/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/f/fa/faa/x/y/z/randomFileForImport.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg1/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/f/fa/faa/x/y/z/randomFileForImport.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg1/index.d.ts'.
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/workspaces/project/tsconfig.json projectStateVersion: 15 projectProgramVersion: 14 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (22)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/home/src/workspaces/project/main.ts SVC-1-0 "export const x = 10;"
	/home/src/workspaces/project/node_modules/pkg0/index.d.ts Text-1 "export interface ImportInterface0 {}"
	/home/src/workspaces/project/node_modules/pkg1/index.d.ts Text-1 "export interface ImportInterface1 {}"
	/home/src/workspaces/project/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/randomFileForImport.ts Text-4 "import type { ImportInterface1 } from \"pkg1\";\nimport type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;export const y = 10;"
	/home/src/workspaces/project/a/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/b/randomFileForImport.ts Text-3 "import type { ImportInterface1 } from \"pkg1\";\nimport type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;"
	/home/src/workspaces/project/c/ca/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/c/ca/caa/randomFileForImport.ts Text-3 "import type { ImportInterface1 } from \"pkg1\";\nimport type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;"
	/home/src/workspaces/project/c/ca/caa/caaa/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/c/cb/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts Text-3 "import type { ImportInterface1 } from \"pkg1\";\nimport type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;"
	/home/src/workspaces/project/d/da/daa/daaa/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/d/da/daa/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/d/da/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/e/ea/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/e/ea/eaa/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/e/ea/eaa/eaaa/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"
	/home/src/workspaces/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts Text-3 "import type { ImportInterface1 } from \"pkg1\";\nimport type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;"
	/home/src/workspaces/project/f/fa/faa/x/y/z/randomFileForImport.ts Text-3 "import type { ImportInterface1 } from \"pkg1\";\nimport type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;"
	/home/src/workspaces/project/f/fa/faa/faaa/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\";\nimport type { ImportInterface1 } from \"pkg1\";\n"


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

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/home/src/workspaces/project/tsconfig.json"
      }
    }
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "configFileDiag",
      "body": {
        "triggerFile": "/home/src/workspaces/project/tsconfig.json",
        "configFile": "/home/src/workspaces/project/tsconfig.json",
        "diagnostics": []
      }
    }
Info seq  [hh:mm:ss:mss] Running: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Before ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (22)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/project/main.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] After ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (22)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/project/main.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] got projects updated in background /home/src/workspaces/project/main.ts
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectsUpdatedInBackground",
      "body": {
        "openFiles": [
          "/home/src/workspaces/project/main.ts"
        ]
      }
    }
After running Timeout callback:: count: 0

Projects::
/home/src/workspaces/project/tsconfig.json (Configured) *changed*
    projectStateVersion: 15
    projectProgramVersion: 15 *changed*
    dirty: false *changed*
