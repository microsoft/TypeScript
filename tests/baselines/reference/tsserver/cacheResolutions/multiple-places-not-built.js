Info 0    [00:01:40.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Info 1    [00:01:41.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/src/project/randomFileForImport.ts"
      },
      "seq": 1,
      "type": "request"
    }
Before request
//// [/src/project/tsconfig.json]
{"compilerOptions":{"composite":true,"cacheResolutions":true,"traceResolution":true},"files":["fileWithImports.ts","randomFileForImport.ts","a/fileWithImports.ts","b/ba/fileWithImports.ts","b/randomFileForImport.ts","c/ca/fileWithImports.ts","c/ca/caa/randomFileForImport.ts","c/ca/caa/caaa/fileWithImports.ts","c/cb/fileWithImports.ts","d/da/daa/daaa/x/y/z/randomFileForImport.ts","d/da/daa/daaa/fileWithImports.ts","d/da/daa/fileWithImports.ts","d/da/fileWithImports.ts","e/ea/fileWithImports.ts","e/ea/eaa/fileWithImports.ts","e/ea/eaa/eaaa/fileWithImports.ts","e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts"]}

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


//// [/src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts]
export const x = 10;

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


//// [/src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts]
export const x = 10;

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


PolledWatches::

FsWatches::

FsWatchesRecursive::

Info 2    [00:01:42.000] Search path: /src/project
Info 3    [00:01:43.000] For info: /src/project/randomFileForImport.ts :: Config file name: /src/project/tsconfig.json
Info 4    [00:01:44.000] Creating configuration project /src/project/tsconfig.json
Info 5    [00:01:45.000] FileWatcher:: Added:: WatchInfo: /src/project/tsconfig.json 2000 undefined Project: /src/project/tsconfig.json WatchType: Config file
Info 6    [00:01:46.000] Config: /src/project/tsconfig.json : {
 "rootNames": [
  "/src/project/fileWithImports.ts",
  "/src/project/randomFileForImport.ts",
  "/src/project/a/fileWithImports.ts",
  "/src/project/b/ba/fileWithImports.ts",
  "/src/project/b/randomFileForImport.ts",
  "/src/project/c/ca/fileWithImports.ts",
  "/src/project/c/ca/caa/randomFileForImport.ts",
  "/src/project/c/ca/caa/caaa/fileWithImports.ts",
  "/src/project/c/cb/fileWithImports.ts",
  "/src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts",
  "/src/project/d/da/daa/daaa/fileWithImports.ts",
  "/src/project/d/da/daa/fileWithImports.ts",
  "/src/project/d/da/fileWithImports.ts",
  "/src/project/e/ea/fileWithImports.ts",
  "/src/project/e/ea/eaa/fileWithImports.ts",
  "/src/project/e/ea/eaa/eaaa/fileWithImports.ts",
  "/src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts"
 ],
 "options": {
  "composite": true,
  "cacheResolutions": true,
  "traceResolution": true,
  "configFilePath": "/src/project/tsconfig.json"
 }
}
Info 7    [00:01:47.000] FileWatcher:: Added:: WatchInfo: /src/project/fileWithImports.ts 500 undefined WatchType: Closed Script info
Info 8    [00:01:48.000] FileWatcher:: Added:: WatchInfo: /src/project/a/fileWithImports.ts 500 undefined WatchType: Closed Script info
Info 9    [00:01:49.000] FileWatcher:: Added:: WatchInfo: /src/project/b/ba/fileWithImports.ts 500 undefined WatchType: Closed Script info
Info 10   [00:01:50.000] FileWatcher:: Added:: WatchInfo: /src/project/b/randomFileForImport.ts 500 undefined WatchType: Closed Script info
Info 11   [00:01:51.000] FileWatcher:: Added:: WatchInfo: /src/project/c/ca/fileWithImports.ts 500 undefined WatchType: Closed Script info
Info 12   [00:01:52.000] FileWatcher:: Added:: WatchInfo: /src/project/c/ca/caa/randomFileForImport.ts 500 undefined WatchType: Closed Script info
Info 13   [00:01:53.000] FileWatcher:: Added:: WatchInfo: /src/project/c/ca/caa/caaa/fileWithImports.ts 500 undefined WatchType: Closed Script info
Info 14   [00:01:54.000] FileWatcher:: Added:: WatchInfo: /src/project/c/cb/fileWithImports.ts 500 undefined WatchType: Closed Script info
Info 15   [00:01:55.000] FileWatcher:: Added:: WatchInfo: /src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts 500 undefined WatchType: Closed Script info
Info 16   [00:01:56.000] FileWatcher:: Added:: WatchInfo: /src/project/d/da/daa/daaa/fileWithImports.ts 500 undefined WatchType: Closed Script info
Info 17   [00:01:57.000] FileWatcher:: Added:: WatchInfo: /src/project/d/da/daa/fileWithImports.ts 500 undefined WatchType: Closed Script info
Info 18   [00:01:58.000] FileWatcher:: Added:: WatchInfo: /src/project/d/da/fileWithImports.ts 500 undefined WatchType: Closed Script info
Info 19   [00:01:59.000] FileWatcher:: Added:: WatchInfo: /src/project/e/ea/fileWithImports.ts 500 undefined WatchType: Closed Script info
Info 20   [00:02:00.000] FileWatcher:: Added:: WatchInfo: /src/project/e/ea/eaa/fileWithImports.ts 500 undefined WatchType: Closed Script info
Info 21   [00:02:01.000] FileWatcher:: Added:: WatchInfo: /src/project/e/ea/eaa/eaaa/fileWithImports.ts 500 undefined WatchType: Closed Script info
Info 22   [00:02:02.000] FileWatcher:: Added:: WatchInfo: /src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts 500 undefined WatchType: Closed Script info
Info 23   [00:02:03.000] Starting updateGraphWorker: Project: /src/project/tsconfig.json
Info 24   [00:02:04.000] ======== Resolving module 'pkg0' from '/src/project/fileWithImports.ts'. ========
Info 25   [00:02:05.000] Module resolution kind is not specified, using 'NodeJs'.
Info 26   [00:02:06.000] Loading module 'pkg0' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info 27   [00:02:07.000] File '/src/project/node_modules/pkg0/package.json' does not exist.
Info 28   [00:02:08.000] File '/src/project/node_modules/pkg0.ts' does not exist.
Info 29   [00:02:09.000] File '/src/project/node_modules/pkg0.tsx' does not exist.
Info 30   [00:02:10.000] File '/src/project/node_modules/pkg0.d.ts' does not exist.
Info 31   [00:02:11.000] File '/src/project/node_modules/pkg0/index.ts' does not exist.
Info 32   [00:02:12.000] File '/src/project/node_modules/pkg0/index.tsx' does not exist.
Info 33   [00:02:13.000] File '/src/project/node_modules/pkg0/index.d.ts' exist - use it as a name resolution result.
Info 34   [00:02:14.000] Resolving real path for '/src/project/node_modules/pkg0/index.d.ts', result '/src/project/node_modules/pkg0/index.d.ts'.
Info 35   [00:02:15.000] ======== Module name 'pkg0' was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'. ========
Info 36   [00:02:16.000] DirectoryWatcher:: Added:: WatchInfo: /src/project/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info 37   [00:02:17.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /src/project/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info 38   [00:02:18.000] ======== Resolving module 'pkg0' from '/src/project/a/fileWithImports.ts'. ========
Info 39   [00:02:19.000] Module resolution kind is not specified, using 'NodeJs'.
Info 40   [00:02:20.000] Loading module 'pkg0' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info 41   [00:02:21.000] Directory '/src/project/a/node_modules' does not exist, skipping all lookups in it.
Info 42   [00:02:22.000] Resolution for module 'pkg0' was found in cache from location '/src/project'.
Info 43   [00:02:23.000] ======== Module name 'pkg0' was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'. ========
Info 44   [00:02:24.000] ======== Resolving module 'pkg0' from '/src/project/b/ba/fileWithImports.ts'. ========
Info 45   [00:02:25.000] Module resolution kind is not specified, using 'NodeJs'.
Info 46   [00:02:26.000] Loading module 'pkg0' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info 47   [00:02:27.000] Directory '/src/project/b/ba/node_modules' does not exist, skipping all lookups in it.
Info 48   [00:02:28.000] Directory '/src/project/b/node_modules' does not exist, skipping all lookups in it.
Info 49   [00:02:29.000] Resolution for module 'pkg0' was found in cache from location '/src/project'.
Info 50   [00:02:30.000] ======== Module name 'pkg0' was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'. ========
Info 51   [00:02:31.000] ======== Resolving module 'pkg0' from '/src/project/c/ca/fileWithImports.ts'. ========
Info 52   [00:02:32.000] Module resolution kind is not specified, using 'NodeJs'.
Info 53   [00:02:33.000] Loading module 'pkg0' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info 54   [00:02:34.000] Directory '/src/project/c/ca/node_modules' does not exist, skipping all lookups in it.
Info 55   [00:02:35.000] Directory '/src/project/c/node_modules' does not exist, skipping all lookups in it.
Info 56   [00:02:36.000] Resolution for module 'pkg0' was found in cache from location '/src/project'.
Info 57   [00:02:37.000] ======== Module name 'pkg0' was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'. ========
Info 58   [00:02:38.000] ======== Resolving module 'pkg0' from '/src/project/c/ca/caa/caaa/fileWithImports.ts'. ========
Info 59   [00:02:39.000] Module resolution kind is not specified, using 'NodeJs'.
Info 60   [00:02:40.000] Loading module 'pkg0' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info 61   [00:02:41.000] Directory '/src/project/c/ca/caa/caaa/node_modules' does not exist, skipping all lookups in it.
Info 62   [00:02:42.000] Directory '/src/project/c/ca/caa/node_modules' does not exist, skipping all lookups in it.
Info 63   [00:02:43.000] Resolution for module 'pkg0' was found in cache from location '/src/project/c/ca'.
Info 64   [00:02:44.000] ======== Module name 'pkg0' was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'. ========
Info 65   [00:02:45.000] ======== Resolving module 'pkg0' from '/src/project/c/cb/fileWithImports.ts'. ========
Info 66   [00:02:46.000] Module resolution kind is not specified, using 'NodeJs'.
Info 67   [00:02:47.000] Loading module 'pkg0' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info 68   [00:02:48.000] Directory '/src/project/c/cb/node_modules' does not exist, skipping all lookups in it.
Info 69   [00:02:49.000] Resolution for module 'pkg0' was found in cache from location '/src/project/c'.
Info 70   [00:02:50.000] ======== Module name 'pkg0' was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'. ========
Info 71   [00:02:51.000] ======== Resolving module 'pkg0' from '/src/project/d/da/daa/daaa/fileWithImports.ts'. ========
Info 72   [00:02:52.000] Module resolution kind is not specified, using 'NodeJs'.
Info 73   [00:02:53.000] Loading module 'pkg0' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info 74   [00:02:54.000] Directory '/src/project/d/da/daa/daaa/node_modules' does not exist, skipping all lookups in it.
Info 75   [00:02:55.000] Directory '/src/project/d/da/daa/node_modules' does not exist, skipping all lookups in it.
Info 76   [00:02:56.000] Directory '/src/project/d/da/node_modules' does not exist, skipping all lookups in it.
Info 77   [00:02:57.000] Directory '/src/project/d/node_modules' does not exist, skipping all lookups in it.
Info 78   [00:02:58.000] Resolution for module 'pkg0' was found in cache from location '/src/project'.
Info 79   [00:02:59.000] ======== Module name 'pkg0' was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'. ========
Info 80   [00:03:00.000] ======== Resolving module 'pkg0' from '/src/project/d/da/daa/fileWithImports.ts'. ========
Info 81   [00:03:01.000] Module resolution kind is not specified, using 'NodeJs'.
Info 82   [00:03:02.000] Loading module 'pkg0' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info 83   [00:03:03.000] Resolution for module 'pkg0' was found in cache from location '/src/project/d/da/daa'.
Info 84   [00:03:04.000] ======== Module name 'pkg0' was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'. ========
Info 85   [00:03:05.000] ======== Resolving module 'pkg0' from '/src/project/d/da/fileWithImports.ts'. ========
Info 86   [00:03:06.000] Module resolution kind is not specified, using 'NodeJs'.
Info 87   [00:03:07.000] Loading module 'pkg0' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info 88   [00:03:08.000] Resolution for module 'pkg0' was found in cache from location '/src/project/d/da'.
Info 89   [00:03:09.000] ======== Module name 'pkg0' was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'. ========
Info 90   [00:03:10.000] ======== Resolving module 'pkg0' from '/src/project/e/ea/fileWithImports.ts'. ========
Info 91   [00:03:11.000] Module resolution kind is not specified, using 'NodeJs'.
Info 92   [00:03:12.000] Loading module 'pkg0' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info 93   [00:03:13.000] Directory '/src/project/e/ea/node_modules' does not exist, skipping all lookups in it.
Info 94   [00:03:14.000] Directory '/src/project/e/node_modules' does not exist, skipping all lookups in it.
Info 95   [00:03:15.000] Resolution for module 'pkg0' was found in cache from location '/src/project'.
Info 96   [00:03:16.000] ======== Module name 'pkg0' was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'. ========
Info 97   [00:03:17.000] ======== Resolving module 'pkg0' from '/src/project/e/ea/eaa/fileWithImports.ts'. ========
Info 98   [00:03:18.000] Module resolution kind is not specified, using 'NodeJs'.
Info 99   [00:03:19.000] Loading module 'pkg0' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info 100  [00:03:20.000] Directory '/src/project/e/ea/eaa/node_modules' does not exist, skipping all lookups in it.
Info 101  [00:03:21.000] Resolution for module 'pkg0' was found in cache from location '/src/project/e/ea'.
Info 102  [00:03:22.000] ======== Module name 'pkg0' was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'. ========
Info 103  [00:03:23.000] ======== Resolving module 'pkg0' from '/src/project/e/ea/eaa/eaaa/fileWithImports.ts'. ========
Info 104  [00:03:24.000] Module resolution kind is not specified, using 'NodeJs'.
Info 105  [00:03:25.000] Loading module 'pkg0' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info 106  [00:03:26.000] Directory '/src/project/e/ea/eaa/eaaa/node_modules' does not exist, skipping all lookups in it.
Info 107  [00:03:27.000] Resolution for module 'pkg0' was found in cache from location '/src/project/e/ea/eaa'.
Info 108  [00:03:28.000] ======== Module name 'pkg0' was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'. ========
Info 109  [00:03:29.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 110  [00:03:30.000] DirectoryWatcher:: Added:: WatchInfo: /src/project/node_modules/@types 1 undefined Project: /src/project/tsconfig.json WatchType: Type roots
Info 111  [00:03:31.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /src/project/node_modules/@types 1 undefined Project: /src/project/tsconfig.json WatchType: Type roots
Info 112  [00:03:32.000] Finishing updateGraphWorker: Project: /src/project/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 113  [00:03:33.000] Project '/src/project/tsconfig.json' (Configured)
Info 114  [00:03:34.000] 	Files (19)
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
	/src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts
	/src/project/d/da/daa/daaa/fileWithImports.ts
	/src/project/d/da/daa/fileWithImports.ts
	/src/project/d/da/fileWithImports.ts
	/src/project/e/ea/fileWithImports.ts
	/src/project/e/ea/eaa/fileWithImports.ts
	/src/project/e/ea/eaa/eaaa/fileWithImports.ts
	/src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts


	../../a/lib/lib.d.ts
	  Default library for target 'es5'
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

Info 115  [00:03:35.000] -----------------------------------------------
Info 116  [00:03:36.000] Search path: /src/project
Info 117  [00:03:37.000] For info: /src/project/tsconfig.json :: No config files found.
Info 118  [00:03:38.000] Project '/src/project/tsconfig.json' (Configured)
Info 118  [00:03:39.000] 	Files (19)

Info 118  [00:03:40.000] -----------------------------------------------
Info 118  [00:03:41.000] Open files: 
Info 118  [00:03:42.000] 	FileName: /src/project/randomFileForImport.ts ProjectRootPath: undefined
Info 118  [00:03:43.000] 		Projects: /src/project/tsconfig.json
After request

PolledWatches::
/src/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project/filewithimports.ts:
  {}
/src/project/a/filewithimports.ts:
  {}
/src/project/b/ba/filewithimports.ts:
  {}
/src/project/b/randomfileforimport.ts:
  {}
/src/project/c/ca/filewithimports.ts:
  {}
/src/project/c/ca/caa/randomfileforimport.ts:
  {}
/src/project/c/ca/caa/caaa/filewithimports.ts:
  {}
/src/project/c/cb/filewithimports.ts:
  {}
/src/project/d/da/daa/daaa/x/y/z/randomfileforimport.ts:
  {}
/src/project/d/da/daa/daaa/filewithimports.ts:
  {}
/src/project/d/da/daa/filewithimports.ts:
  {}
/src/project/d/da/filewithimports.ts:
  {}
/src/project/e/ea/filewithimports.ts:
  {}
/src/project/e/ea/eaa/filewithimports.ts:
  {}
/src/project/e/ea/eaa/eaaa/filewithimports.ts:
  {}
/src/project/e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/src/project/node_modules:
  {}

Info 118  [00:03:44.000] response:
    {
      "responseRequired": false
    }
Info 119  [00:03:45.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/src/project/b/randomFileForImport.ts"
      },
      "seq": 2,
      "type": "request"
    }
Before request

PolledWatches::
/src/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project/filewithimports.ts:
  {}
/src/project/a/filewithimports.ts:
  {}
/src/project/b/ba/filewithimports.ts:
  {}
/src/project/b/randomfileforimport.ts:
  {}
/src/project/c/ca/filewithimports.ts:
  {}
/src/project/c/ca/caa/randomfileforimport.ts:
  {}
/src/project/c/ca/caa/caaa/filewithimports.ts:
  {}
/src/project/c/cb/filewithimports.ts:
  {}
/src/project/d/da/daa/daaa/x/y/z/randomfileforimport.ts:
  {}
/src/project/d/da/daa/daaa/filewithimports.ts:
  {}
/src/project/d/da/daa/filewithimports.ts:
  {}
/src/project/d/da/filewithimports.ts:
  {}
/src/project/e/ea/filewithimports.ts:
  {}
/src/project/e/ea/eaa/filewithimports.ts:
  {}
/src/project/e/ea/eaa/eaaa/filewithimports.ts:
  {}
/src/project/e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/src/project/node_modules:
  {}

Info 120  [00:03:46.000] FileWatcher:: Close:: WatchInfo: /src/project/b/randomFileForImport.ts 500 undefined WatchType: Closed Script info
Info 121  [00:03:47.000] Search path: /src/project/b
Info 122  [00:03:48.000] For info: /src/project/b/randomFileForImport.ts :: Config file name: /src/project/tsconfig.json
Info 123  [00:03:49.000] Search path: /src/project
Info 124  [00:03:50.000] For info: /src/project/tsconfig.json :: No config files found.
Info 125  [00:03:51.000] Project '/src/project/tsconfig.json' (Configured)
Info 125  [00:03:52.000] 	Files (19)

Info 125  [00:03:53.000] -----------------------------------------------
Info 125  [00:03:54.000] Open files: 
Info 125  [00:03:55.000] 	FileName: /src/project/randomFileForImport.ts ProjectRootPath: undefined
Info 125  [00:03:56.000] 		Projects: /src/project/tsconfig.json
Info 125  [00:03:57.000] 	FileName: /src/project/b/randomFileForImport.ts ProjectRootPath: undefined
Info 125  [00:03:58.000] 		Projects: /src/project/tsconfig.json
After request

PolledWatches::
/src/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project/filewithimports.ts:
  {}
/src/project/a/filewithimports.ts:
  {}
/src/project/b/ba/filewithimports.ts:
  {}
/src/project/c/ca/filewithimports.ts:
  {}
/src/project/c/ca/caa/randomfileforimport.ts:
  {}
/src/project/c/ca/caa/caaa/filewithimports.ts:
  {}
/src/project/c/cb/filewithimports.ts:
  {}
/src/project/d/da/daa/daaa/x/y/z/randomfileforimport.ts:
  {}
/src/project/d/da/daa/daaa/filewithimports.ts:
  {}
/src/project/d/da/daa/filewithimports.ts:
  {}
/src/project/d/da/filewithimports.ts:
  {}
/src/project/e/ea/filewithimports.ts:
  {}
/src/project/e/ea/eaa/filewithimports.ts:
  {}
/src/project/e/ea/eaa/eaaa/filewithimports.ts:
  {}
/src/project/e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/src/project/node_modules:
  {}

Info 125  [00:03:59.000] response:
    {
      "responseRequired": false
    }
Info 126  [00:04:00.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/src/project/c/ca/caa/randomFileForImport.ts"
      },
      "seq": 3,
      "type": "request"
    }
Before request

PolledWatches::
/src/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project/filewithimports.ts:
  {}
/src/project/a/filewithimports.ts:
  {}
/src/project/b/ba/filewithimports.ts:
  {}
/src/project/c/ca/filewithimports.ts:
  {}
/src/project/c/ca/caa/randomfileforimport.ts:
  {}
/src/project/c/ca/caa/caaa/filewithimports.ts:
  {}
/src/project/c/cb/filewithimports.ts:
  {}
/src/project/d/da/daa/daaa/x/y/z/randomfileforimport.ts:
  {}
/src/project/d/da/daa/daaa/filewithimports.ts:
  {}
/src/project/d/da/daa/filewithimports.ts:
  {}
/src/project/d/da/filewithimports.ts:
  {}
/src/project/e/ea/filewithimports.ts:
  {}
/src/project/e/ea/eaa/filewithimports.ts:
  {}
/src/project/e/ea/eaa/eaaa/filewithimports.ts:
  {}
/src/project/e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/src/project/node_modules:
  {}

Info 127  [00:04:01.000] FileWatcher:: Close:: WatchInfo: /src/project/c/ca/caa/randomFileForImport.ts 500 undefined WatchType: Closed Script info
Info 128  [00:04:02.000] Search path: /src/project/c/ca/caa
Info 129  [00:04:03.000] For info: /src/project/c/ca/caa/randomFileForImport.ts :: Config file name: /src/project/tsconfig.json
Info 130  [00:04:04.000] Search path: /src/project
Info 131  [00:04:05.000] For info: /src/project/tsconfig.json :: No config files found.
Info 132  [00:04:06.000] Project '/src/project/tsconfig.json' (Configured)
Info 132  [00:04:07.000] 	Files (19)

Info 132  [00:04:08.000] -----------------------------------------------
Info 132  [00:04:09.000] Open files: 
Info 132  [00:04:10.000] 	FileName: /src/project/randomFileForImport.ts ProjectRootPath: undefined
Info 132  [00:04:11.000] 		Projects: /src/project/tsconfig.json
Info 132  [00:04:12.000] 	FileName: /src/project/b/randomFileForImport.ts ProjectRootPath: undefined
Info 132  [00:04:13.000] 		Projects: /src/project/tsconfig.json
Info 132  [00:04:14.000] 	FileName: /src/project/c/ca/caa/randomFileForImport.ts ProjectRootPath: undefined
Info 132  [00:04:15.000] 		Projects: /src/project/tsconfig.json
After request

PolledWatches::
/src/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project/filewithimports.ts:
  {}
/src/project/a/filewithimports.ts:
  {}
/src/project/b/ba/filewithimports.ts:
  {}
/src/project/c/ca/filewithimports.ts:
  {}
/src/project/c/ca/caa/caaa/filewithimports.ts:
  {}
/src/project/c/cb/filewithimports.ts:
  {}
/src/project/d/da/daa/daaa/x/y/z/randomfileforimport.ts:
  {}
/src/project/d/da/daa/daaa/filewithimports.ts:
  {}
/src/project/d/da/daa/filewithimports.ts:
  {}
/src/project/d/da/filewithimports.ts:
  {}
/src/project/e/ea/filewithimports.ts:
  {}
/src/project/e/ea/eaa/filewithimports.ts:
  {}
/src/project/e/ea/eaa/eaaa/filewithimports.ts:
  {}
/src/project/e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/src/project/node_modules:
  {}

Info 132  [00:04:16.000] response:
    {
      "responseRequired": false
    }
Info 133  [00:04:17.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts"
      },
      "seq": 4,
      "type": "request"
    }
Before request

PolledWatches::
/src/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project/filewithimports.ts:
  {}
/src/project/a/filewithimports.ts:
  {}
/src/project/b/ba/filewithimports.ts:
  {}
/src/project/c/ca/filewithimports.ts:
  {}
/src/project/c/ca/caa/caaa/filewithimports.ts:
  {}
/src/project/c/cb/filewithimports.ts:
  {}
/src/project/d/da/daa/daaa/x/y/z/randomfileforimport.ts:
  {}
/src/project/d/da/daa/daaa/filewithimports.ts:
  {}
/src/project/d/da/daa/filewithimports.ts:
  {}
/src/project/d/da/filewithimports.ts:
  {}
/src/project/e/ea/filewithimports.ts:
  {}
/src/project/e/ea/eaa/filewithimports.ts:
  {}
/src/project/e/ea/eaa/eaaa/filewithimports.ts:
  {}
/src/project/e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/src/project/node_modules:
  {}

Info 134  [00:04:18.000] FileWatcher:: Close:: WatchInfo: /src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts 500 undefined WatchType: Closed Script info
Info 135  [00:04:19.000] Search path: /src/project/d/da/daa/daaa/x/y/z
Info 136  [00:04:20.000] For info: /src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts :: Config file name: /src/project/tsconfig.json
Info 137  [00:04:21.000] Search path: /src/project
Info 138  [00:04:22.000] For info: /src/project/tsconfig.json :: No config files found.
Info 139  [00:04:23.000] Project '/src/project/tsconfig.json' (Configured)
Info 139  [00:04:24.000] 	Files (19)

Info 139  [00:04:25.000] -----------------------------------------------
Info 139  [00:04:26.000] Open files: 
Info 139  [00:04:27.000] 	FileName: /src/project/randomFileForImport.ts ProjectRootPath: undefined
Info 139  [00:04:28.000] 		Projects: /src/project/tsconfig.json
Info 139  [00:04:29.000] 	FileName: /src/project/b/randomFileForImport.ts ProjectRootPath: undefined
Info 139  [00:04:30.000] 		Projects: /src/project/tsconfig.json
Info 139  [00:04:31.000] 	FileName: /src/project/c/ca/caa/randomFileForImport.ts ProjectRootPath: undefined
Info 139  [00:04:32.000] 		Projects: /src/project/tsconfig.json
Info 139  [00:04:33.000] 	FileName: /src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts ProjectRootPath: undefined
Info 139  [00:04:34.000] 		Projects: /src/project/tsconfig.json
After request

PolledWatches::
/src/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project/filewithimports.ts:
  {}
/src/project/a/filewithimports.ts:
  {}
/src/project/b/ba/filewithimports.ts:
  {}
/src/project/c/ca/filewithimports.ts:
  {}
/src/project/c/ca/caa/caaa/filewithimports.ts:
  {}
/src/project/c/cb/filewithimports.ts:
  {}
/src/project/d/da/daa/daaa/filewithimports.ts:
  {}
/src/project/d/da/daa/filewithimports.ts:
  {}
/src/project/d/da/filewithimports.ts:
  {}
/src/project/e/ea/filewithimports.ts:
  {}
/src/project/e/ea/eaa/filewithimports.ts:
  {}
/src/project/e/ea/eaa/eaaa/filewithimports.ts:
  {}
/src/project/e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/src/project/node_modules:
  {}

Info 139  [00:04:35.000] response:
    {
      "responseRequired": false
    }
Info 140  [00:04:36.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts"
      },
      "seq": 5,
      "type": "request"
    }
Before request

PolledWatches::
/src/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project/filewithimports.ts:
  {}
/src/project/a/filewithimports.ts:
  {}
/src/project/b/ba/filewithimports.ts:
  {}
/src/project/c/ca/filewithimports.ts:
  {}
/src/project/c/ca/caa/caaa/filewithimports.ts:
  {}
/src/project/c/cb/filewithimports.ts:
  {}
/src/project/d/da/daa/daaa/filewithimports.ts:
  {}
/src/project/d/da/daa/filewithimports.ts:
  {}
/src/project/d/da/filewithimports.ts:
  {}
/src/project/e/ea/filewithimports.ts:
  {}
/src/project/e/ea/eaa/filewithimports.ts:
  {}
/src/project/e/ea/eaa/eaaa/filewithimports.ts:
  {}
/src/project/e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/src/project/node_modules:
  {}

Info 141  [00:04:37.000] FileWatcher:: Close:: WatchInfo: /src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts 500 undefined WatchType: Closed Script info
Info 142  [00:04:38.000] Search path: /src/project/e/ea/eaa/eaaa/x/y/z
Info 143  [00:04:39.000] For info: /src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts :: Config file name: /src/project/tsconfig.json
Info 144  [00:04:40.000] Search path: /src/project
Info 145  [00:04:41.000] For info: /src/project/tsconfig.json :: No config files found.
Info 146  [00:04:42.000] Project '/src/project/tsconfig.json' (Configured)
Info 146  [00:04:43.000] 	Files (19)

Info 146  [00:04:44.000] -----------------------------------------------
Info 146  [00:04:45.000] Open files: 
Info 146  [00:04:46.000] 	FileName: /src/project/randomFileForImport.ts ProjectRootPath: undefined
Info 146  [00:04:47.000] 		Projects: /src/project/tsconfig.json
Info 146  [00:04:48.000] 	FileName: /src/project/b/randomFileForImport.ts ProjectRootPath: undefined
Info 146  [00:04:49.000] 		Projects: /src/project/tsconfig.json
Info 146  [00:04:50.000] 	FileName: /src/project/c/ca/caa/randomFileForImport.ts ProjectRootPath: undefined
Info 146  [00:04:51.000] 		Projects: /src/project/tsconfig.json
Info 146  [00:04:52.000] 	FileName: /src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts ProjectRootPath: undefined
Info 146  [00:04:53.000] 		Projects: /src/project/tsconfig.json
Info 146  [00:04:54.000] 	FileName: /src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts ProjectRootPath: undefined
Info 146  [00:04:55.000] 		Projects: /src/project/tsconfig.json
After request

PolledWatches::
/src/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project/filewithimports.ts:
  {}
/src/project/a/filewithimports.ts:
  {}
/src/project/b/ba/filewithimports.ts:
  {}
/src/project/c/ca/filewithimports.ts:
  {}
/src/project/c/ca/caa/caaa/filewithimports.ts:
  {}
/src/project/c/cb/filewithimports.ts:
  {}
/src/project/d/da/daa/daaa/filewithimports.ts:
  {}
/src/project/d/da/daa/filewithimports.ts:
  {}
/src/project/d/da/filewithimports.ts:
  {}
/src/project/e/ea/filewithimports.ts:
  {}
/src/project/e/ea/eaa/filewithimports.ts:
  {}
/src/project/e/ea/eaa/eaaa/filewithimports.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/src/project/node_modules:
  {}

Info 146  [00:04:56.000] response:
    {
      "responseRequired": false
    }
Info 147  [00:04:57.000] modify randomFileForImport by adding import
Info 148  [00:04:58.000] request:
    {
      "command": "change",
      "arguments": {
        "file": "/src/project/randomFileForImport.ts",
        "line": 1,
        "offset": 1,
        "endLine": 1,
        "endOffset": 1,
        "insertString": "import type { ImportInterface0 } from \"pkg0\";\n"
      },
      "seq": 6,
      "type": "request"
    }
Before request

PolledWatches::
/src/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project/filewithimports.ts:
  {}
/src/project/a/filewithimports.ts:
  {}
/src/project/b/ba/filewithimports.ts:
  {}
/src/project/c/ca/filewithimports.ts:
  {}
/src/project/c/ca/caa/caaa/filewithimports.ts:
  {}
/src/project/c/cb/filewithimports.ts:
  {}
/src/project/d/da/daa/daaa/filewithimports.ts:
  {}
/src/project/d/da/daa/filewithimports.ts:
  {}
/src/project/d/da/filewithimports.ts:
  {}
/src/project/e/ea/filewithimports.ts:
  {}
/src/project/e/ea/eaa/filewithimports.ts:
  {}
/src/project/e/ea/eaa/eaaa/filewithimports.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/src/project/node_modules:
  {}

After request

PolledWatches::
/src/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project/filewithimports.ts:
  {}
/src/project/a/filewithimports.ts:
  {}
/src/project/b/ba/filewithimports.ts:
  {}
/src/project/c/ca/filewithimports.ts:
  {}
/src/project/c/ca/caa/caaa/filewithimports.ts:
  {}
/src/project/c/cb/filewithimports.ts:
  {}
/src/project/d/da/daa/daaa/filewithimports.ts:
  {}
/src/project/d/da/daa/filewithimports.ts:
  {}
/src/project/d/da/filewithimports.ts:
  {}
/src/project/e/ea/filewithimports.ts:
  {}
/src/project/e/ea/eaa/filewithimports.ts:
  {}
/src/project/e/ea/eaa/eaaa/filewithimports.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/src/project/node_modules:
  {}

Info 149  [00:04:59.000] response:
    {
      "responseRequired": false
    }
Info 150  [00:05:00.000] Starting updateGraphWorker: Project: /src/project/tsconfig.json
Info 151  [00:05:01.000] Reusing resolution of module 'pkg0' from '/src/project/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 152  [00:05:02.000] ======== Resolving module 'pkg0' from '/src/project/randomFileForImport.ts'. ========
Info 153  [00:05:03.000] Module resolution kind is not specified, using 'NodeJs'.
Info 154  [00:05:04.000] Loading module 'pkg0' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info 155  [00:05:05.000] File '/src/project/node_modules/pkg0/package.json' does not exist according to earlier cached lookups.
Info 156  [00:05:06.000] File '/src/project/node_modules/pkg0.ts' does not exist.
Info 157  [00:05:07.000] File '/src/project/node_modules/pkg0.tsx' does not exist.
Info 158  [00:05:08.000] File '/src/project/node_modules/pkg0.d.ts' does not exist.
Info 159  [00:05:09.000] File '/src/project/node_modules/pkg0/index.ts' does not exist.
Info 160  [00:05:10.000] File '/src/project/node_modules/pkg0/index.tsx' does not exist.
Info 161  [00:05:11.000] File '/src/project/node_modules/pkg0/index.d.ts' exist - use it as a name resolution result.
Info 162  [00:05:12.000] Resolving real path for '/src/project/node_modules/pkg0/index.d.ts', result '/src/project/node_modules/pkg0/index.d.ts'.
Info 163  [00:05:13.000] ======== Module name 'pkg0' was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'. ========
Info 164  [00:05:14.000] Reusing resolution of module 'pkg0' from '/src/project/a/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 165  [00:05:15.000] Reusing resolution of module 'pkg0' from '/src/project/b/ba/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 166  [00:05:16.000] Reusing resolution of module 'pkg0' from '/src/project/c/ca/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 167  [00:05:17.000] Reusing resolution of module 'pkg0' from '/src/project/c/ca/caa/caaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 168  [00:05:18.000] Reusing resolution of module 'pkg0' from '/src/project/c/cb/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 169  [00:05:19.000] Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/daaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 170  [00:05:20.000] Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 171  [00:05:21.000] Reusing resolution of module 'pkg0' from '/src/project/d/da/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 172  [00:05:22.000] Reusing resolution of module 'pkg0' from '/src/project/e/ea/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 173  [00:05:23.000] Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 174  [00:05:24.000] Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/eaaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 175  [00:05:25.000] Finishing updateGraphWorker: Project: /src/project/tsconfig.json Version: 2 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info 176  [00:05:26.000] Different program with same set of files
Info 177  [00:05:27.000] modify b/randomFileForImport by adding import
Info 178  [00:05:28.000] request:
    {
      "command": "change",
      "arguments": {
        "file": "/src/project/b/randomFileForImport.ts",
        "line": 1,
        "offset": 1,
        "endLine": 1,
        "endOffset": 1,
        "insertString": "import type { ImportInterface0 } from \"pkg0\";\n"
      },
      "seq": 7,
      "type": "request"
    }
Before request

PolledWatches::
/src/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project/filewithimports.ts:
  {}
/src/project/a/filewithimports.ts:
  {}
/src/project/b/ba/filewithimports.ts:
  {}
/src/project/c/ca/filewithimports.ts:
  {}
/src/project/c/ca/caa/caaa/filewithimports.ts:
  {}
/src/project/c/cb/filewithimports.ts:
  {}
/src/project/d/da/daa/daaa/filewithimports.ts:
  {}
/src/project/d/da/daa/filewithimports.ts:
  {}
/src/project/d/da/filewithimports.ts:
  {}
/src/project/e/ea/filewithimports.ts:
  {}
/src/project/e/ea/eaa/filewithimports.ts:
  {}
/src/project/e/ea/eaa/eaaa/filewithimports.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/src/project/node_modules:
  {}

After request

PolledWatches::
/src/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project/filewithimports.ts:
  {}
/src/project/a/filewithimports.ts:
  {}
/src/project/b/ba/filewithimports.ts:
  {}
/src/project/c/ca/filewithimports.ts:
  {}
/src/project/c/ca/caa/caaa/filewithimports.ts:
  {}
/src/project/c/cb/filewithimports.ts:
  {}
/src/project/d/da/daa/daaa/filewithimports.ts:
  {}
/src/project/d/da/daa/filewithimports.ts:
  {}
/src/project/d/da/filewithimports.ts:
  {}
/src/project/e/ea/filewithimports.ts:
  {}
/src/project/e/ea/eaa/filewithimports.ts:
  {}
/src/project/e/ea/eaa/eaaa/filewithimports.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/src/project/node_modules:
  {}

Info 179  [00:05:29.000] response:
    {
      "responseRequired": false
    }
Info 180  [00:05:30.000] Starting updateGraphWorker: Project: /src/project/tsconfig.json
Info 181  [00:05:31.000] Reusing resolution of module 'pkg0' from '/src/project/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 182  [00:05:32.000] Reusing resolution of module 'pkg0' from '/src/project/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 183  [00:05:33.000] Reusing resolution of module 'pkg0' from '/src/project/a/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 184  [00:05:34.000] Reusing resolution of module 'pkg0' from '/src/project/b/ba/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 185  [00:05:35.000] ======== Resolving module 'pkg0' from '/src/project/b/randomFileForImport.ts'. ========
Info 186  [00:05:36.000] Module resolution kind is not specified, using 'NodeJs'.
Info 187  [00:05:37.000] Loading module 'pkg0' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info 188  [00:05:38.000] Directory '/src/project/b/node_modules' does not exist, skipping all lookups in it.
Info 189  [00:05:39.000] File '/src/project/node_modules/pkg0/package.json' does not exist according to earlier cached lookups.
Info 190  [00:05:40.000] File '/src/project/node_modules/pkg0.ts' does not exist.
Info 191  [00:05:41.000] File '/src/project/node_modules/pkg0.tsx' does not exist.
Info 192  [00:05:42.000] File '/src/project/node_modules/pkg0.d.ts' does not exist.
Info 193  [00:05:43.000] File '/src/project/node_modules/pkg0/index.ts' does not exist.
Info 194  [00:05:44.000] File '/src/project/node_modules/pkg0/index.tsx' does not exist.
Info 195  [00:05:45.000] File '/src/project/node_modules/pkg0/index.d.ts' exist - use it as a name resolution result.
Info 196  [00:05:46.000] Resolving real path for '/src/project/node_modules/pkg0/index.d.ts', result '/src/project/node_modules/pkg0/index.d.ts'.
Info 197  [00:05:47.000] ======== Module name 'pkg0' was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'. ========
Info 198  [00:05:48.000] Reusing resolution of module 'pkg0' from '/src/project/c/ca/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 199  [00:05:49.000] Reusing resolution of module 'pkg0' from '/src/project/c/ca/caa/caaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 200  [00:05:50.000] Reusing resolution of module 'pkg0' from '/src/project/c/cb/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 201  [00:05:51.000] Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/daaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 202  [00:05:52.000] Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 203  [00:05:53.000] Reusing resolution of module 'pkg0' from '/src/project/d/da/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 204  [00:05:54.000] Reusing resolution of module 'pkg0' from '/src/project/e/ea/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 205  [00:05:55.000] Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 206  [00:05:56.000] Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/eaaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 207  [00:05:57.000] Finishing updateGraphWorker: Project: /src/project/tsconfig.json Version: 3 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info 208  [00:05:58.000] Different program with same set of files
Info 209  [00:05:59.000] modify c/ca/caa/randomFileForImport by adding import
Info 210  [00:06:00.000] request:
    {
      "command": "change",
      "arguments": {
        "file": "/src/project/c/ca/caa/randomFileForImport.ts",
        "line": 1,
        "offset": 1,
        "endLine": 1,
        "endOffset": 1,
        "insertString": "import type { ImportInterface0 } from \"pkg0\";\n"
      },
      "seq": 8,
      "type": "request"
    }
Before request

PolledWatches::
/src/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project/filewithimports.ts:
  {}
/src/project/a/filewithimports.ts:
  {}
/src/project/b/ba/filewithimports.ts:
  {}
/src/project/c/ca/filewithimports.ts:
  {}
/src/project/c/ca/caa/caaa/filewithimports.ts:
  {}
/src/project/c/cb/filewithimports.ts:
  {}
/src/project/d/da/daa/daaa/filewithimports.ts:
  {}
/src/project/d/da/daa/filewithimports.ts:
  {}
/src/project/d/da/filewithimports.ts:
  {}
/src/project/e/ea/filewithimports.ts:
  {}
/src/project/e/ea/eaa/filewithimports.ts:
  {}
/src/project/e/ea/eaa/eaaa/filewithimports.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/src/project/node_modules:
  {}

After request

PolledWatches::
/src/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project/filewithimports.ts:
  {}
/src/project/a/filewithimports.ts:
  {}
/src/project/b/ba/filewithimports.ts:
  {}
/src/project/c/ca/filewithimports.ts:
  {}
/src/project/c/ca/caa/caaa/filewithimports.ts:
  {}
/src/project/c/cb/filewithimports.ts:
  {}
/src/project/d/da/daa/daaa/filewithimports.ts:
  {}
/src/project/d/da/daa/filewithimports.ts:
  {}
/src/project/d/da/filewithimports.ts:
  {}
/src/project/e/ea/filewithimports.ts:
  {}
/src/project/e/ea/eaa/filewithimports.ts:
  {}
/src/project/e/ea/eaa/eaaa/filewithimports.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/src/project/node_modules:
  {}

Info 211  [00:06:01.000] response:
    {
      "responseRequired": false
    }
Info 212  [00:06:02.000] Starting updateGraphWorker: Project: /src/project/tsconfig.json
Info 213  [00:06:03.000] Reusing resolution of module 'pkg0' from '/src/project/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 214  [00:06:04.000] Reusing resolution of module 'pkg0' from '/src/project/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 215  [00:06:05.000] Reusing resolution of module 'pkg0' from '/src/project/a/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 216  [00:06:06.000] Reusing resolution of module 'pkg0' from '/src/project/b/ba/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 217  [00:06:07.000] Reusing resolution of module 'pkg0' from '/src/project/b/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 218  [00:06:08.000] Reusing resolution of module 'pkg0' from '/src/project/c/ca/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 219  [00:06:09.000] ======== Resolving module 'pkg0' from '/src/project/c/ca/caa/randomFileForImport.ts'. ========
Info 220  [00:06:10.000] Module resolution kind is not specified, using 'NodeJs'.
Info 221  [00:06:11.000] Loading module 'pkg0' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info 222  [00:06:12.000] Directory '/src/project/c/ca/caa/node_modules' does not exist, skipping all lookups in it.
Info 223  [00:06:13.000] Directory '/src/project/c/ca/node_modules' does not exist, skipping all lookups in it.
Info 224  [00:06:14.000] Directory '/src/project/c/node_modules' does not exist, skipping all lookups in it.
Info 225  [00:06:15.000] File '/src/project/node_modules/pkg0/package.json' does not exist according to earlier cached lookups.
Info 226  [00:06:16.000] File '/src/project/node_modules/pkg0.ts' does not exist.
Info 227  [00:06:17.000] File '/src/project/node_modules/pkg0.tsx' does not exist.
Info 228  [00:06:18.000] File '/src/project/node_modules/pkg0.d.ts' does not exist.
Info 229  [00:06:19.000] File '/src/project/node_modules/pkg0/index.ts' does not exist.
Info 230  [00:06:20.000] File '/src/project/node_modules/pkg0/index.tsx' does not exist.
Info 231  [00:06:21.000] File '/src/project/node_modules/pkg0/index.d.ts' exist - use it as a name resolution result.
Info 232  [00:06:22.000] Resolving real path for '/src/project/node_modules/pkg0/index.d.ts', result '/src/project/node_modules/pkg0/index.d.ts'.
Info 233  [00:06:23.000] ======== Module name 'pkg0' was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'. ========
Info 234  [00:06:24.000] Reusing resolution of module 'pkg0' from '/src/project/c/ca/caa/caaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 235  [00:06:25.000] Reusing resolution of module 'pkg0' from '/src/project/c/cb/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 236  [00:06:26.000] Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/daaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 237  [00:06:27.000] Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 238  [00:06:28.000] Reusing resolution of module 'pkg0' from '/src/project/d/da/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 239  [00:06:29.000] Reusing resolution of module 'pkg0' from '/src/project/e/ea/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 240  [00:06:30.000] Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 241  [00:06:31.000] Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/eaaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 242  [00:06:32.000] Finishing updateGraphWorker: Project: /src/project/tsconfig.json Version: 4 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info 243  [00:06:33.000] Different program with same set of files
Info 244  [00:06:34.000] modify d/da/daa/daaa/x/y/z/randomFileForImport by adding import
Info 245  [00:06:35.000] request:
    {
      "command": "change",
      "arguments": {
        "file": "/src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts",
        "line": 1,
        "offset": 1,
        "endLine": 1,
        "endOffset": 1,
        "insertString": "import type { ImportInterface0 } from \"pkg0\";\n"
      },
      "seq": 9,
      "type": "request"
    }
Before request

PolledWatches::
/src/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project/filewithimports.ts:
  {}
/src/project/a/filewithimports.ts:
  {}
/src/project/b/ba/filewithimports.ts:
  {}
/src/project/c/ca/filewithimports.ts:
  {}
/src/project/c/ca/caa/caaa/filewithimports.ts:
  {}
/src/project/c/cb/filewithimports.ts:
  {}
/src/project/d/da/daa/daaa/filewithimports.ts:
  {}
/src/project/d/da/daa/filewithimports.ts:
  {}
/src/project/d/da/filewithimports.ts:
  {}
/src/project/e/ea/filewithimports.ts:
  {}
/src/project/e/ea/eaa/filewithimports.ts:
  {}
/src/project/e/ea/eaa/eaaa/filewithimports.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/src/project/node_modules:
  {}

After request

PolledWatches::
/src/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project/filewithimports.ts:
  {}
/src/project/a/filewithimports.ts:
  {}
/src/project/b/ba/filewithimports.ts:
  {}
/src/project/c/ca/filewithimports.ts:
  {}
/src/project/c/ca/caa/caaa/filewithimports.ts:
  {}
/src/project/c/cb/filewithimports.ts:
  {}
/src/project/d/da/daa/daaa/filewithimports.ts:
  {}
/src/project/d/da/daa/filewithimports.ts:
  {}
/src/project/d/da/filewithimports.ts:
  {}
/src/project/e/ea/filewithimports.ts:
  {}
/src/project/e/ea/eaa/filewithimports.ts:
  {}
/src/project/e/ea/eaa/eaaa/filewithimports.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/src/project/node_modules:
  {}

Info 246  [00:06:36.000] response:
    {
      "responseRequired": false
    }
Info 247  [00:06:37.000] Starting updateGraphWorker: Project: /src/project/tsconfig.json
Info 248  [00:06:38.000] Reusing resolution of module 'pkg0' from '/src/project/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 249  [00:06:39.000] Reusing resolution of module 'pkg0' from '/src/project/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 250  [00:06:40.000] Reusing resolution of module 'pkg0' from '/src/project/a/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 251  [00:06:41.000] Reusing resolution of module 'pkg0' from '/src/project/b/ba/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 252  [00:06:42.000] Reusing resolution of module 'pkg0' from '/src/project/b/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 253  [00:06:43.000] Reusing resolution of module 'pkg0' from '/src/project/c/ca/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 254  [00:06:44.000] Reusing resolution of module 'pkg0' from '/src/project/c/ca/caa/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 255  [00:06:45.000] Reusing resolution of module 'pkg0' from '/src/project/c/ca/caa/caaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 256  [00:06:46.000] Reusing resolution of module 'pkg0' from '/src/project/c/cb/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 257  [00:06:47.000] ======== Resolving module 'pkg0' from '/src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts'. ========
Info 258  [00:06:48.000] Module resolution kind is not specified, using 'NodeJs'.
Info 259  [00:06:49.000] Loading module 'pkg0' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info 260  [00:06:50.000] Directory '/src/project/d/da/daa/daaa/x/y/z/node_modules' does not exist, skipping all lookups in it.
Info 261  [00:06:51.000] Directory '/src/project/d/da/daa/daaa/x/y/node_modules' does not exist, skipping all lookups in it.
Info 262  [00:06:52.000] Directory '/src/project/d/da/daa/daaa/x/node_modules' does not exist, skipping all lookups in it.
Info 263  [00:06:53.000] Directory '/src/project/d/da/daa/daaa/node_modules' does not exist, skipping all lookups in it.
Info 264  [00:06:54.000] Directory '/src/project/d/da/daa/node_modules' does not exist, skipping all lookups in it.
Info 265  [00:06:55.000] Directory '/src/project/d/da/node_modules' does not exist, skipping all lookups in it.
Info 266  [00:06:56.000] Directory '/src/project/d/node_modules' does not exist, skipping all lookups in it.
Info 267  [00:06:57.000] File '/src/project/node_modules/pkg0/package.json' does not exist according to earlier cached lookups.
Info 268  [00:06:58.000] File '/src/project/node_modules/pkg0.ts' does not exist.
Info 269  [00:06:59.000] File '/src/project/node_modules/pkg0.tsx' does not exist.
Info 270  [00:07:00.000] File '/src/project/node_modules/pkg0.d.ts' does not exist.
Info 271  [00:07:01.000] File '/src/project/node_modules/pkg0/index.ts' does not exist.
Info 272  [00:07:02.000] File '/src/project/node_modules/pkg0/index.tsx' does not exist.
Info 273  [00:07:03.000] File '/src/project/node_modules/pkg0/index.d.ts' exist - use it as a name resolution result.
Info 274  [00:07:04.000] Resolving real path for '/src/project/node_modules/pkg0/index.d.ts', result '/src/project/node_modules/pkg0/index.d.ts'.
Info 275  [00:07:05.000] ======== Module name 'pkg0' was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'. ========
Info 276  [00:07:06.000] Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/daaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 277  [00:07:07.000] Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 278  [00:07:08.000] Reusing resolution of module 'pkg0' from '/src/project/d/da/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 279  [00:07:09.000] Reusing resolution of module 'pkg0' from '/src/project/e/ea/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 280  [00:07:10.000] Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 281  [00:07:11.000] Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/eaaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 282  [00:07:12.000] Finishing updateGraphWorker: Project: /src/project/tsconfig.json Version: 5 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info 283  [00:07:13.000] Different program with same set of files
Info 284  [00:07:14.000] modify e/ea/eaa/eaaa/x/y/z/randomFileForImport by adding import
Info 285  [00:07:15.000] request:
    {
      "command": "change",
      "arguments": {
        "file": "/src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts",
        "line": 1,
        "offset": 1,
        "endLine": 1,
        "endOffset": 1,
        "insertString": "import type { ImportInterface0 } from \"pkg0\";\n"
      },
      "seq": 10,
      "type": "request"
    }
Before request

PolledWatches::
/src/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project/filewithimports.ts:
  {}
/src/project/a/filewithimports.ts:
  {}
/src/project/b/ba/filewithimports.ts:
  {}
/src/project/c/ca/filewithimports.ts:
  {}
/src/project/c/ca/caa/caaa/filewithimports.ts:
  {}
/src/project/c/cb/filewithimports.ts:
  {}
/src/project/d/da/daa/daaa/filewithimports.ts:
  {}
/src/project/d/da/daa/filewithimports.ts:
  {}
/src/project/d/da/filewithimports.ts:
  {}
/src/project/e/ea/filewithimports.ts:
  {}
/src/project/e/ea/eaa/filewithimports.ts:
  {}
/src/project/e/ea/eaa/eaaa/filewithimports.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/src/project/node_modules:
  {}

After request

PolledWatches::
/src/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project/filewithimports.ts:
  {}
/src/project/a/filewithimports.ts:
  {}
/src/project/b/ba/filewithimports.ts:
  {}
/src/project/c/ca/filewithimports.ts:
  {}
/src/project/c/ca/caa/caaa/filewithimports.ts:
  {}
/src/project/c/cb/filewithimports.ts:
  {}
/src/project/d/da/daa/daaa/filewithimports.ts:
  {}
/src/project/d/da/daa/filewithimports.ts:
  {}
/src/project/d/da/filewithimports.ts:
  {}
/src/project/e/ea/filewithimports.ts:
  {}
/src/project/e/ea/eaa/filewithimports.ts:
  {}
/src/project/e/ea/eaa/eaaa/filewithimports.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/src/project/node_modules:
  {}

Info 286  [00:07:16.000] response:
    {
      "responseRequired": false
    }
Info 287  [00:07:17.000] Starting updateGraphWorker: Project: /src/project/tsconfig.json
Info 288  [00:07:18.000] Reusing resolution of module 'pkg0' from '/src/project/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 289  [00:07:19.000] Reusing resolution of module 'pkg0' from '/src/project/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 290  [00:07:20.000] Reusing resolution of module 'pkg0' from '/src/project/a/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 291  [00:07:21.000] Reusing resolution of module 'pkg0' from '/src/project/b/ba/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 292  [00:07:22.000] Reusing resolution of module 'pkg0' from '/src/project/b/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 293  [00:07:23.000] Reusing resolution of module 'pkg0' from '/src/project/c/ca/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 294  [00:07:24.000] Reusing resolution of module 'pkg0' from '/src/project/c/ca/caa/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 295  [00:07:25.000] Reusing resolution of module 'pkg0' from '/src/project/c/ca/caa/caaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 296  [00:07:26.000] Reusing resolution of module 'pkg0' from '/src/project/c/cb/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 297  [00:07:27.000] Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 298  [00:07:28.000] Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/daaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 299  [00:07:29.000] Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 300  [00:07:30.000] Reusing resolution of module 'pkg0' from '/src/project/d/da/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 301  [00:07:31.000] Reusing resolution of module 'pkg0' from '/src/project/e/ea/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 302  [00:07:32.000] Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 303  [00:07:33.000] Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/eaaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Info 304  [00:07:34.000] ======== Resolving module 'pkg0' from '/src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts'. ========
Info 305  [00:07:35.000] Module resolution kind is not specified, using 'NodeJs'.
Info 306  [00:07:36.000] Loading module 'pkg0' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info 307  [00:07:37.000] Directory '/src/project/e/ea/eaa/eaaa/x/y/z/node_modules' does not exist, skipping all lookups in it.
Info 308  [00:07:38.000] Directory '/src/project/e/ea/eaa/eaaa/x/y/node_modules' does not exist, skipping all lookups in it.
Info 309  [00:07:39.000] Directory '/src/project/e/ea/eaa/eaaa/x/node_modules' does not exist, skipping all lookups in it.
Info 310  [00:07:40.000] Directory '/src/project/e/ea/eaa/eaaa/node_modules' does not exist, skipping all lookups in it.
Info 311  [00:07:41.000] Directory '/src/project/e/ea/eaa/node_modules' does not exist, skipping all lookups in it.
Info 312  [00:07:42.000] Directory '/src/project/e/ea/node_modules' does not exist, skipping all lookups in it.
Info 313  [00:07:43.000] Directory '/src/project/e/node_modules' does not exist, skipping all lookups in it.
Info 314  [00:07:44.000] File '/src/project/node_modules/pkg0/package.json' does not exist according to earlier cached lookups.
Info 315  [00:07:45.000] File '/src/project/node_modules/pkg0.ts' does not exist.
Info 316  [00:07:46.000] File '/src/project/node_modules/pkg0.tsx' does not exist.
Info 317  [00:07:47.000] File '/src/project/node_modules/pkg0.d.ts' does not exist.
Info 318  [00:07:48.000] File '/src/project/node_modules/pkg0/index.ts' does not exist.
Info 319  [00:07:49.000] File '/src/project/node_modules/pkg0/index.tsx' does not exist.
Info 320  [00:07:50.000] File '/src/project/node_modules/pkg0/index.d.ts' exist - use it as a name resolution result.
Info 321  [00:07:51.000] Resolving real path for '/src/project/node_modules/pkg0/index.d.ts', result '/src/project/node_modules/pkg0/index.d.ts'.
Info 322  [00:07:52.000] ======== Module name 'pkg0' was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'. ========
Info 323  [00:07:53.000] Finishing updateGraphWorker: Project: /src/project/tsconfig.json Version: 6 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info 324  [00:07:54.000] Different program with same set of files