Info 0    [16:00:49.000] Provided types map file "/typesMap.json" doesn't exist
Creating project service
//// [/user/username/projects/myproject/product/node_modules/module1/index.ts]
export function module1() {}

//// [/user/username/projects/myproject/node_modules/module2/index.ts]
export function module2() {}

//// [/user/username/projects/myproject/product/src/file1.ts]
import { module1 } from "module1";import { module2 } from "module2";

//// [/user/username/projects/myproject/product/src/feature/file2.ts]
import { module1 } from "module1";import { module2 } from "module2";

//// [/user/username/projects/myproject/product/test/src/file3.ts]
import { module1 } from "module1";import { module2 } from "module2";

//// [/user/username/projects/myproject/product/test/file4.ts]
import { module1 } from "module1";import { module2 } from "module2";

//// [/user/username/projects/myproject/tsconfig.json]
{"compilerOptions":{"traceResolution":true}}

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

Info 1    [16:00:50.000] Search path: /user/username/projects/myproject/product/src
Info 2    [16:00:51.000] For info: /user/username/projects/myproject/product/src/file1.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 3    [16:00:52.000] Creating configuration project /user/username/projects/myproject/tsconfig.json
Info 4    [16:00:53.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info 5    [16:00:54.000] Config: /user/username/projects/myproject/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/product/src/file1.ts",
  "/user/username/projects/myproject/product/src/feature/file2.ts",
  "/user/username/projects/myproject/product/test/file4.ts",
  "/user/username/projects/myproject/product/test/src/file3.ts"
 ],
 "options": {
  "traceResolution": true,
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
 }
}
Info 6    [16:00:55.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 7    [16:00:56.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 8    [16:00:57.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 9    [16:00:58.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/product/src/feature/file2.ts 500 undefined WatchType: Closed Script info
Info 10   [16:00:59.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/product/test/file4.ts 500 undefined WatchType: Closed Script info
Info 11   [16:01:00.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/product/test/src/file3.ts 500 undefined WatchType: Closed Script info
Info 12   [16:01:01.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json
Info 13   [16:01:02.000] ======== Resolving module 'module1' from '/user/username/projects/myproject/product/src/file1.ts'. ========
Info 14   [16:01:03.000] Module resolution kind is not specified, using 'NodeJs'.
Info 15   [16:01:04.000] Loading module 'module1' from 'node_modules' folder, target file type 'TypeScript'.
Info 16   [16:01:05.000] Directory '/user/username/projects/myproject/product/src/node_modules' does not exist, skipping all lookups in it.
Info 17   [16:01:06.000] File '/user/username/projects/myproject/product/node_modules/module1/package.json' does not exist.
Info 18   [16:01:07.000] File '/user/username/projects/myproject/product/node_modules/module1.ts' does not exist.
Info 19   [16:01:08.000] File '/user/username/projects/myproject/product/node_modules/module1.tsx' does not exist.
Info 20   [16:01:09.000] File '/user/username/projects/myproject/product/node_modules/module1.d.ts' does not exist.
Info 21   [16:01:10.000] File '/user/username/projects/myproject/product/node_modules/module1/index.ts' exist - use it as a name resolution result.
Info 22   [16:01:11.000] Resolving real path for '/user/username/projects/myproject/product/node_modules/module1/index.ts', result '/user/username/projects/myproject/product/node_modules/module1/index.ts'.
Info 23   [16:01:12.000] ======== Module name 'module1' was successfully resolved to '/user/username/projects/myproject/product/node_modules/module1/index.ts'. ========
Info 24   [16:01:13.000] ======== Resolving module 'module2' from '/user/username/projects/myproject/product/src/file1.ts'. ========
Info 25   [16:01:14.000] Module resolution kind is not specified, using 'NodeJs'.
Info 26   [16:01:15.000] Loading module 'module2' from 'node_modules' folder, target file type 'TypeScript'.
Info 27   [16:01:16.000] Directory '/user/username/projects/myproject/product/src/node_modules' does not exist, skipping all lookups in it.
Info 28   [16:01:17.000] File '/user/username/projects/myproject/product/node_modules/module2.ts' does not exist.
Info 29   [16:01:18.000] File '/user/username/projects/myproject/product/node_modules/module2.tsx' does not exist.
Info 30   [16:01:19.000] File '/user/username/projects/myproject/product/node_modules/module2.d.ts' does not exist.
Info 31   [16:01:20.000] Directory '/user/username/projects/myproject/product/node_modules/@types' does not exist, skipping all lookups in it.
Info 32   [16:01:21.000] File '/user/username/projects/myproject/node_modules/module2/package.json' does not exist.
Info 33   [16:01:22.000] File '/user/username/projects/myproject/node_modules/module2.ts' does not exist.
Info 34   [16:01:23.000] File '/user/username/projects/myproject/node_modules/module2.tsx' does not exist.
Info 35   [16:01:24.000] File '/user/username/projects/myproject/node_modules/module2.d.ts' does not exist.
Info 36   [16:01:25.000] File '/user/username/projects/myproject/node_modules/module2/index.ts' exist - use it as a name resolution result.
Info 37   [16:01:26.000] Resolving real path for '/user/username/projects/myproject/node_modules/module2/index.ts', result '/user/username/projects/myproject/node_modules/module2/index.ts'.
Info 38   [16:01:27.000] ======== Module name 'module2' was successfully resolved to '/user/username/projects/myproject/node_modules/module2/index.ts'. ========
Info 39   [16:01:28.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/product/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info 40   [16:01:29.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/product/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info 41   [16:01:30.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info 42   [16:01:31.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info 43   [16:01:32.000] ======== Resolving module 'module1' from '/user/username/projects/myproject/product/src/feature/file2.ts'. ========
Info 44   [16:01:33.000] Module resolution kind is not specified, using 'NodeJs'.
Info 45   [16:01:34.000] Loading module 'module1' from 'node_modules' folder, target file type 'TypeScript'.
Info 46   [16:01:35.000] Directory '/user/username/projects/myproject/product/src/feature/node_modules' does not exist, skipping all lookups in it.
Info 47   [16:01:36.000] Resolution for module 'module1' was found in cache from location '/user/username/projects/myproject/product/src'.
Info 48   [16:01:37.000] ======== Module name 'module1' was successfully resolved to '/user/username/projects/myproject/product/node_modules/module1/index.ts'. ========
Info 49   [16:01:38.000] ======== Resolving module 'module2' from '/user/username/projects/myproject/product/src/feature/file2.ts'. ========
Info 50   [16:01:39.000] Module resolution kind is not specified, using 'NodeJs'.
Info 51   [16:01:40.000] Loading module 'module2' from 'node_modules' folder, target file type 'TypeScript'.
Info 52   [16:01:41.000] Directory '/user/username/projects/myproject/product/src/feature/node_modules' does not exist, skipping all lookups in it.
Info 53   [16:01:42.000] Resolution for module 'module2' was found in cache from location '/user/username/projects/myproject/product/src'.
Info 54   [16:01:43.000] ======== Module name 'module2' was successfully resolved to '/user/username/projects/myproject/node_modules/module2/index.ts'. ========
Info 55   [16:01:44.000] ======== Resolving module 'module1' from '/user/username/projects/myproject/product/test/file4.ts'. ========
Info 56   [16:01:45.000] Module resolution kind is not specified, using 'NodeJs'.
Info 57   [16:01:46.000] Loading module 'module1' from 'node_modules' folder, target file type 'TypeScript'.
Info 58   [16:01:47.000] Directory '/user/username/projects/myproject/product/test/node_modules' does not exist, skipping all lookups in it.
Info 59   [16:01:48.000] Resolution for module 'module1' was found in cache from location '/user/username/projects/myproject/product'.
Info 60   [16:01:49.000] ======== Module name 'module1' was successfully resolved to '/user/username/projects/myproject/product/node_modules/module1/index.ts'. ========
Info 61   [16:01:50.000] ======== Resolving module 'module2' from '/user/username/projects/myproject/product/test/file4.ts'. ========
Info 62   [16:01:51.000] Module resolution kind is not specified, using 'NodeJs'.
Info 63   [16:01:52.000] Loading module 'module2' from 'node_modules' folder, target file type 'TypeScript'.
Info 64   [16:01:53.000] Directory '/user/username/projects/myproject/product/test/node_modules' does not exist, skipping all lookups in it.
Info 65   [16:01:54.000] Resolution for module 'module2' was found in cache from location '/user/username/projects/myproject/product'.
Info 66   [16:01:55.000] ======== Module name 'module2' was successfully resolved to '/user/username/projects/myproject/node_modules/module2/index.ts'. ========
Info 67   [16:01:56.000] ======== Resolving module 'module1' from '/user/username/projects/myproject/product/test/src/file3.ts'. ========
Info 68   [16:01:57.000] Module resolution kind is not specified, using 'NodeJs'.
Info 69   [16:01:58.000] Loading module 'module1' from 'node_modules' folder, target file type 'TypeScript'.
Info 70   [16:01:59.000] Directory '/user/username/projects/myproject/product/test/src/node_modules' does not exist, skipping all lookups in it.
Info 71   [16:02:00.000] Resolution for module 'module1' was found in cache from location '/user/username/projects/myproject/product/test'.
Info 72   [16:02:01.000] ======== Module name 'module1' was successfully resolved to '/user/username/projects/myproject/product/node_modules/module1/index.ts'. ========
Info 73   [16:02:02.000] ======== Resolving module 'module2' from '/user/username/projects/myproject/product/test/src/file3.ts'. ========
Info 74   [16:02:03.000] Module resolution kind is not specified, using 'NodeJs'.
Info 75   [16:02:04.000] Loading module 'module2' from 'node_modules' folder, target file type 'TypeScript'.
Info 76   [16:02:05.000] Directory '/user/username/projects/myproject/product/test/src/node_modules' does not exist, skipping all lookups in it.
Info 77   [16:02:06.000] Resolution for module 'module2' was found in cache from location '/user/username/projects/myproject/product/test'.
Info 78   [16:02:07.000] ======== Module name 'module2' was successfully resolved to '/user/username/projects/myproject/node_modules/module2/index.ts'. ========
Info 79   [16:02:08.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 80   [16:02:09.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/product 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 81   [16:02:10.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/product 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 82   [16:02:11.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 83   [16:02:12.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 84   [16:02:13.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 85   [16:02:14.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 86   [16:02:15.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 87   [16:02:16.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 88   [16:02:17.000] 	Files (7)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/product/node_modules/module1/index.ts
	/user/username/projects/myproject/node_modules/module2/index.ts
	/user/username/projects/myproject/product/src/file1.ts
	/user/username/projects/myproject/product/src/feature/file2.ts
	/user/username/projects/myproject/product/test/file4.ts
	/user/username/projects/myproject/product/test/src/file3.ts


	../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	product/node_modules/module1/index.ts
	  Imported via "module1" from file 'product/src/file1.ts'
	  Imported via "module1" from file 'product/src/feature/file2.ts'
	  Imported via "module1" from file 'product/test/file4.ts'
	  Imported via "module1" from file 'product/test/src/file3.ts'
	node_modules/module2/index.ts
	  Imported via "module2" from file 'product/src/file1.ts'
	  Imported via "module2" from file 'product/src/feature/file2.ts'
	  Imported via "module2" from file 'product/test/file4.ts'
	  Imported via "module2" from file 'product/test/src/file3.ts'
	product/src/file1.ts
	  Matched by default include pattern '**/*'
	product/src/feature/file2.ts
	  Matched by default include pattern '**/*'
	product/test/file4.ts
	  Matched by default include pattern '**/*'
	product/test/src/file3.ts
	  Matched by default include pattern '**/*'

Info 89   [16:02:18.000] -----------------------------------------------
Info 90   [16:02:19.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 90   [16:02:20.000] 	Files (7)

Info 90   [16:02:21.000] -----------------------------------------------
Info 90   [16:02:22.000] Open files: 
Info 90   [16:02:23.000] 	FileName: /user/username/projects/myproject/product/src/file1.ts ProjectRootPath: undefined
Info 90   [16:02:24.000] 		Projects: /user/username/projects/myproject/tsconfig.json
Info 90   [16:02:31.000] FileWatcher:: Triggered with /user/username/projects/myproject/product/src/feature/file2.ts 1:: WatchInfo: /user/username/projects/myproject/product/src/feature/file2.ts 500 undefined WatchType: Closed Script info
Info 91   [16:02:32.000] Scheduled: /user/username/projects/myproject/tsconfig.json
Info 92   [16:02:33.000] Scheduled: *ensureProjectForOpenFiles*
Info 93   [16:02:34.000] Elapsed:: *ms FileWatcher:: Triggered with /user/username/projects/myproject/product/src/feature/file2.ts 1:: WatchInfo: /user/username/projects/myproject/product/src/feature/file2.ts 500 undefined WatchType: Closed Script info
Info 94   [16:02:38.000] FileWatcher:: Triggered with /user/username/projects/myproject/product/test/src/file3.ts 1:: WatchInfo: /user/username/projects/myproject/product/test/src/file3.ts 500 undefined WatchType: Closed Script info
Info 95   [16:02:39.000] Scheduled: /user/username/projects/myproject/tsconfig.json, Cancelled earlier one
Info 96   [16:02:40.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 97   [16:02:41.000] Elapsed:: *ms FileWatcher:: Triggered with /user/username/projects/myproject/product/test/src/file3.ts 1:: WatchInfo: /user/username/projects/myproject/product/test/src/file3.ts 500 undefined WatchType: Closed Script info
Info 98   [16:02:45.000] FileWatcher:: Triggered with /user/username/projects/myproject/product/test/file4.ts 1:: WatchInfo: /user/username/projects/myproject/product/test/file4.ts 500 undefined WatchType: Closed Script info
Info 99   [16:02:46.000] Scheduled: /user/username/projects/myproject/tsconfig.json, Cancelled earlier one
Info 100  [16:02:47.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 101  [16:02:48.000] Elapsed:: *ms FileWatcher:: Triggered with /user/username/projects/myproject/product/test/file4.ts 1:: WatchInfo: /user/username/projects/myproject/product/test/file4.ts 500 undefined WatchType: Closed Script info
Before running timeout callbacks
//// [/user/username/projects/myproject/product/src/file1.ts]
import { module1 } from "module1";import { module2 } from "module2";import { module1 } from "module1";import { module2 } from "module2";

//// [/user/username/projects/myproject/product/src/feature/file2.ts]
import { module1 } from "module1";import { module2 } from "module2";import { module1 } from "module1";import { module2 } from "module2";

//// [/user/username/projects/myproject/product/test/src/file3.ts]
import { module1 } from "module1";import { module2 } from "module2";import { module1 } from "module1";import { module2 } from "module2";

//// [/user/username/projects/myproject/product/test/file4.ts]
import { module1 } from "module1";import { module2 } from "module2";import { module1 } from "module1";import { module2 } from "module2";


PolledWatches::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/tsconfig.json:
  {}
/user/username/projects/myproject/product/src/feature/file2.ts:
  {}
/user/username/projects/myproject/product/test/file4.ts:
  {}
/user/username/projects/myproject/product/test/src/file3.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject:
  {}
/user/username/projects/myproject/product/node_modules:
  {}
/user/username/projects/myproject/node_modules:
  {}
/user/username/projects/myproject/product:
  {}

Info 102  [16:02:49.000] Running: /user/username/projects/myproject/tsconfig.json
Info 103  [16:02:50.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json
Info 104  [16:02:51.000] Reusing resolution of module 'module1' from '/user/username/projects/myproject/product/src/file1.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/product/node_modules/module1/index.ts'.
Info 105  [16:02:52.000] Reusing resolution of module 'module2' from '/user/username/projects/myproject/product/src/file1.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/node_modules/module2/index.ts'.
Info 106  [16:02:53.000] Reusing resolution of module 'module1' from '/user/username/projects/myproject/product/src/feature/file2.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/product/node_modules/module1/index.ts'.
Info 107  [16:02:54.000] Reusing resolution of module 'module2' from '/user/username/projects/myproject/product/src/feature/file2.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/node_modules/module2/index.ts'.
Info 108  [16:02:55.000] Reusing resolution of module 'module1' from '/user/username/projects/myproject/product/test/file4.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/product/node_modules/module1/index.ts'.
Info 109  [16:02:56.000] Reusing resolution of module 'module2' from '/user/username/projects/myproject/product/test/file4.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/node_modules/module2/index.ts'.
Info 110  [16:02:57.000] Reusing resolution of module 'module1' from '/user/username/projects/myproject/product/test/src/file3.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/product/node_modules/module1/index.ts'.
Info 111  [16:02:58.000] Reusing resolution of module 'module2' from '/user/username/projects/myproject/product/test/src/file3.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/node_modules/module2/index.ts'.
Info 112  [16:02:59.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json Version: 2 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info 113  [16:03:00.000] Different program with same set of files
Info 114  [16:03:01.000] Running: *ensureProjectForOpenFiles*
Info 115  [16:03:02.000] Before ensureProjectForOpenFiles:
Info 116  [16:03:03.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 116  [16:03:04.000] 	Files (7)

Info 116  [16:03:05.000] -----------------------------------------------
Info 116  [16:03:06.000] Open files: 
Info 116  [16:03:07.000] 	FileName: /user/username/projects/myproject/product/src/file1.ts ProjectRootPath: undefined
Info 116  [16:03:08.000] 		Projects: /user/username/projects/myproject/tsconfig.json
Info 116  [16:03:09.000] After ensureProjectForOpenFiles:
Info 117  [16:03:10.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 117  [16:03:11.000] 	Files (7)

Info 117  [16:03:12.000] -----------------------------------------------
Info 117  [16:03:13.000] Open files: 
Info 117  [16:03:14.000] 	FileName: /user/username/projects/myproject/product/src/file1.ts ProjectRootPath: undefined
Info 117  [16:03:15.000] 		Projects: /user/username/projects/myproject/tsconfig.json
After running timeout callbacks

PolledWatches::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/tsconfig.json:
  {}
/user/username/projects/myproject/product/src/feature/file2.ts:
  {}
/user/username/projects/myproject/product/test/file4.ts:
  {}
/user/username/projects/myproject/product/test/src/file3.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject:
  {}
/user/username/projects/myproject/product/node_modules:
  {}
/user/username/projects/myproject/node_modules:
  {}
/user/username/projects/myproject/product:
  {}
