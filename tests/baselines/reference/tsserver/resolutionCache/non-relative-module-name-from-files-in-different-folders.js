Info 0    [00:00:49.000] Provided types map file "/typesMap.json" doesn't exist
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

Info 1    [00:00:50.000] Search path: /user/username/projects/myproject/product/src
Info 2    [00:00:51.000] For info: /user/username/projects/myproject/product/src/file1.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 3    [00:00:52.000] Creating configuration project /user/username/projects/myproject/tsconfig.json
Info 4    [00:00:53.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info 5    [00:00:54.000] Config: /user/username/projects/myproject/tsconfig.json : {
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
Info 6    [00:00:55.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 7    [00:00:56.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 8    [00:00:57.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/product/src/feature/file2.ts 500 undefined WatchType: Closed Script info
Info 9    [00:00:58.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/product/test/file4.ts 500 undefined WatchType: Closed Script info
Info 10   [00:00:59.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/product/test/src/file3.ts 500 undefined WatchType: Closed Script info
Info 11   [00:01:00.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json
Info 12   [00:01:01.000] ======== Resolving module 'module1' from '/user/username/projects/myproject/product/src/file1.ts'. ========
Info 13   [00:01:02.000] Module resolution kind is not specified, using 'NodeJs'.
Info 14   [00:01:03.000] Loading module 'module1' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info 15   [00:01:04.000] Directory '/user/username/projects/myproject/product/src/node_modules' does not exist, skipping all lookups in it.
Info 16   [00:01:05.000] File '/user/username/projects/myproject/product/node_modules/module1/package.json' does not exist.
Info 17   [00:01:06.000] File '/user/username/projects/myproject/product/node_modules/module1.ts' does not exist.
Info 18   [00:01:07.000] File '/user/username/projects/myproject/product/node_modules/module1.tsx' does not exist.
Info 19   [00:01:08.000] File '/user/username/projects/myproject/product/node_modules/module1.d.ts' does not exist.
Info 20   [00:01:09.000] File '/user/username/projects/myproject/product/node_modules/module1/index.ts' exist - use it as a name resolution result.
Info 21   [00:01:10.000] Resolving real path for '/user/username/projects/myproject/product/node_modules/module1/index.ts', result '/user/username/projects/myproject/product/node_modules/module1/index.ts'.
Info 22   [00:01:11.000] ======== Module name 'module1' was successfully resolved to '/user/username/projects/myproject/product/node_modules/module1/index.ts'. ========
Info 23   [00:01:12.000] ======== Resolving module 'module2' from '/user/username/projects/myproject/product/src/file1.ts'. ========
Info 24   [00:01:13.000] Module resolution kind is not specified, using 'NodeJs'.
Info 25   [00:01:14.000] Loading module 'module2' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info 26   [00:01:15.000] Directory '/user/username/projects/myproject/product/src/node_modules' does not exist, skipping all lookups in it.
Info 27   [00:01:16.000] File '/user/username/projects/myproject/product/node_modules/module2.ts' does not exist.
Info 28   [00:01:17.000] File '/user/username/projects/myproject/product/node_modules/module2.tsx' does not exist.
Info 29   [00:01:18.000] File '/user/username/projects/myproject/product/node_modules/module2.d.ts' does not exist.
Info 30   [00:01:19.000] Directory '/user/username/projects/myproject/product/node_modules/@types' does not exist, skipping all lookups in it.
Info 31   [00:01:20.000] File '/user/username/projects/myproject/node_modules/module2/package.json' does not exist.
Info 32   [00:01:21.000] File '/user/username/projects/myproject/node_modules/module2.ts' does not exist.
Info 33   [00:01:22.000] File '/user/username/projects/myproject/node_modules/module2.tsx' does not exist.
Info 34   [00:01:23.000] File '/user/username/projects/myproject/node_modules/module2.d.ts' does not exist.
Info 35   [00:01:24.000] File '/user/username/projects/myproject/node_modules/module2/index.ts' exist - use it as a name resolution result.
Info 36   [00:01:25.000] Resolving real path for '/user/username/projects/myproject/node_modules/module2/index.ts', result '/user/username/projects/myproject/node_modules/module2/index.ts'.
Info 37   [00:01:26.000] ======== Module name 'module2' was successfully resolved to '/user/username/projects/myproject/node_modules/module2/index.ts'. ========
Info 38   [00:01:27.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/product/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info 39   [00:01:28.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/product/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info 40   [00:01:29.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info 41   [00:01:30.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info 42   [00:01:31.000] ======== Resolving module 'module1' from '/user/username/projects/myproject/product/src/feature/file2.ts'. ========
Info 43   [00:01:32.000] Module resolution kind is not specified, using 'NodeJs'.
Info 44   [00:01:33.000] Loading module 'module1' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info 45   [00:01:34.000] Directory '/user/username/projects/myproject/product/src/feature/node_modules' does not exist, skipping all lookups in it.
Info 46   [00:01:35.000] Resolution for module 'module1' was found in cache from location '/user/username/projects/myproject/product/src'.
Info 47   [00:01:36.000] ======== Module name 'module1' was successfully resolved to '/user/username/projects/myproject/product/node_modules/module1/index.ts'. ========
Info 48   [00:01:37.000] ======== Resolving module 'module2' from '/user/username/projects/myproject/product/src/feature/file2.ts'. ========
Info 49   [00:01:38.000] Module resolution kind is not specified, using 'NodeJs'.
Info 50   [00:01:39.000] Loading module 'module2' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info 51   [00:01:40.000] Directory '/user/username/projects/myproject/product/src/feature/node_modules' does not exist, skipping all lookups in it.
Info 52   [00:01:41.000] Resolution for module 'module2' was found in cache from location '/user/username/projects/myproject/product/src'.
Info 53   [00:01:42.000] ======== Module name 'module2' was successfully resolved to '/user/username/projects/myproject/node_modules/module2/index.ts'. ========
Info 54   [00:01:43.000] ======== Resolving module 'module1' from '/user/username/projects/myproject/product/test/file4.ts'. ========
Info 55   [00:01:44.000] Module resolution kind is not specified, using 'NodeJs'.
Info 56   [00:01:45.000] Loading module 'module1' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info 57   [00:01:46.000] Directory '/user/username/projects/myproject/product/test/node_modules' does not exist, skipping all lookups in it.
Info 58   [00:01:47.000] Resolution for module 'module1' was found in cache from location '/user/username/projects/myproject/product'.
Info 59   [00:01:48.000] ======== Module name 'module1' was successfully resolved to '/user/username/projects/myproject/product/node_modules/module1/index.ts'. ========
Info 60   [00:01:49.000] ======== Resolving module 'module2' from '/user/username/projects/myproject/product/test/file4.ts'. ========
Info 61   [00:01:50.000] Module resolution kind is not specified, using 'NodeJs'.
Info 62   [00:01:51.000] Loading module 'module2' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info 63   [00:01:52.000] Directory '/user/username/projects/myproject/product/test/node_modules' does not exist, skipping all lookups in it.
Info 64   [00:01:53.000] Resolution for module 'module2' was found in cache from location '/user/username/projects/myproject/product'.
Info 65   [00:01:54.000] ======== Module name 'module2' was successfully resolved to '/user/username/projects/myproject/node_modules/module2/index.ts'. ========
Info 66   [00:01:55.000] ======== Resolving module 'module1' from '/user/username/projects/myproject/product/test/src/file3.ts'. ========
Info 67   [00:01:56.000] Module resolution kind is not specified, using 'NodeJs'.
Info 68   [00:01:57.000] Loading module 'module1' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info 69   [00:01:58.000] Directory '/user/username/projects/myproject/product/test/src/node_modules' does not exist, skipping all lookups in it.
Info 70   [00:01:59.000] Resolution for module 'module1' was found in cache from location '/user/username/projects/myproject/product/test'.
Info 71   [00:02:00.000] ======== Module name 'module1' was successfully resolved to '/user/username/projects/myproject/product/node_modules/module1/index.ts'. ========
Info 72   [00:02:01.000] ======== Resolving module 'module2' from '/user/username/projects/myproject/product/test/src/file3.ts'. ========
Info 73   [00:02:02.000] Module resolution kind is not specified, using 'NodeJs'.
Info 74   [00:02:03.000] Loading module 'module2' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info 75   [00:02:04.000] Directory '/user/username/projects/myproject/product/test/src/node_modules' does not exist, skipping all lookups in it.
Info 76   [00:02:05.000] Resolution for module 'module2' was found in cache from location '/user/username/projects/myproject/product/test'.
Info 77   [00:02:06.000] ======== Module name 'module2' was successfully resolved to '/user/username/projects/myproject/node_modules/module2/index.ts'. ========
Info 78   [00:02:07.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 79   [00:02:08.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/product 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 80   [00:02:09.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/product 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 81   [00:02:10.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 82   [00:02:11.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 83   [00:02:12.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 84   [00:02:13.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 85   [00:02:14.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 86   [00:02:15.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 87   [00:02:16.000] 	Files (7)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/product/node_modules/module1/index.ts
	/user/username/projects/myproject/node_modules/module2/index.ts
	/user/username/projects/myproject/product/src/file1.ts
	/user/username/projects/myproject/product/src/feature/file2.ts
	/user/username/projects/myproject/product/test/file4.ts
	/user/username/projects/myproject/product/test/src/file3.ts


	../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
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

Info 88   [00:02:17.000] -----------------------------------------------
Info 89   [00:02:18.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 89   [00:02:19.000] 	Files (7)

Info 89   [00:02:20.000] -----------------------------------------------
Info 89   [00:02:21.000] Open files: 
Info 89   [00:02:22.000] 	FileName: /user/username/projects/myproject/product/src/file1.ts ProjectRootPath: undefined
Info 89   [00:02:23.000] 		Projects: /user/username/projects/myproject/tsconfig.json
Info 89   [00:02:30.000] FileWatcher:: Triggered with /user/username/projects/myproject/product/src/feature/file2.ts 1:: WatchInfo: /user/username/projects/myproject/product/src/feature/file2.ts 500 undefined WatchType: Closed Script info
Info 90   [00:02:31.000] Scheduled: /user/username/projects/myproject/tsconfig.json
Info 91   [00:02:32.000] Scheduled: *ensureProjectForOpenFiles*
Info 92   [00:02:33.000] Elapsed:: *ms FileWatcher:: Triggered with /user/username/projects/myproject/product/src/feature/file2.ts 1:: WatchInfo: /user/username/projects/myproject/product/src/feature/file2.ts 500 undefined WatchType: Closed Script info
Info 93   [00:02:37.000] FileWatcher:: Triggered with /user/username/projects/myproject/product/test/src/file3.ts 1:: WatchInfo: /user/username/projects/myproject/product/test/src/file3.ts 500 undefined WatchType: Closed Script info
Info 94   [00:02:38.000] Scheduled: /user/username/projects/myproject/tsconfig.json, Cancelled earlier one
Info 95   [00:02:39.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 96   [00:02:40.000] Elapsed:: *ms FileWatcher:: Triggered with /user/username/projects/myproject/product/test/src/file3.ts 1:: WatchInfo: /user/username/projects/myproject/product/test/src/file3.ts 500 undefined WatchType: Closed Script info
Info 97   [00:02:44.000] FileWatcher:: Triggered with /user/username/projects/myproject/product/test/file4.ts 1:: WatchInfo: /user/username/projects/myproject/product/test/file4.ts 500 undefined WatchType: Closed Script info
Info 98   [00:02:45.000] Scheduled: /user/username/projects/myproject/tsconfig.json, Cancelled earlier one
Info 99   [00:02:46.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 100  [00:02:47.000] Elapsed:: *ms FileWatcher:: Triggered with /user/username/projects/myproject/product/test/file4.ts 1:: WatchInfo: /user/username/projects/myproject/product/test/file4.ts 500 undefined WatchType: Closed Script info
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

Info 101  [00:02:48.000] Running: /user/username/projects/myproject/tsconfig.json
Info 102  [00:02:49.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json
Info 103  [00:02:50.000] Reusing resolution of module 'module1' from '/user/username/projects/myproject/product/src/file1.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/product/node_modules/module1/index.ts'.
Info 104  [00:02:51.000] Reusing resolution of module 'module2' from '/user/username/projects/myproject/product/src/file1.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/node_modules/module2/index.ts'.
Info 105  [00:02:52.000] Reusing resolution of module 'module1' from '/user/username/projects/myproject/product/src/feature/file2.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/product/node_modules/module1/index.ts'.
Info 106  [00:02:53.000] Reusing resolution of module 'module2' from '/user/username/projects/myproject/product/src/feature/file2.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/node_modules/module2/index.ts'.
Info 107  [00:02:54.000] Reusing resolution of module 'module1' from '/user/username/projects/myproject/product/test/file4.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/product/node_modules/module1/index.ts'.
Info 108  [00:02:55.000] Reusing resolution of module 'module2' from '/user/username/projects/myproject/product/test/file4.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/node_modules/module2/index.ts'.
Info 109  [00:02:56.000] Reusing resolution of module 'module1' from '/user/username/projects/myproject/product/test/src/file3.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/product/node_modules/module1/index.ts'.
Info 110  [00:02:57.000] Reusing resolution of module 'module2' from '/user/username/projects/myproject/product/test/src/file3.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/node_modules/module2/index.ts'.
Info 111  [00:02:58.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json Version: 2 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info 112  [00:02:59.000] Different program with same set of files
Info 113  [00:03:00.000] Running: *ensureProjectForOpenFiles*
Info 114  [00:03:01.000] Before ensureProjectForOpenFiles:
Info 115  [00:03:02.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 115  [00:03:03.000] 	Files (7)

Info 115  [00:03:04.000] -----------------------------------------------
Info 115  [00:03:05.000] Open files: 
Info 115  [00:03:06.000] 	FileName: /user/username/projects/myproject/product/src/file1.ts ProjectRootPath: undefined
Info 115  [00:03:07.000] 		Projects: /user/username/projects/myproject/tsconfig.json
Info 115  [00:03:08.000] After ensureProjectForOpenFiles:
Info 116  [00:03:09.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 116  [00:03:10.000] 	Files (7)

Info 116  [00:03:11.000] -----------------------------------------------
Info 116  [00:03:12.000] Open files: 
Info 116  [00:03:13.000] 	FileName: /user/username/projects/myproject/product/src/file1.ts ProjectRootPath: undefined
Info 116  [00:03:14.000] 		Projects: /user/username/projects/myproject/tsconfig.json
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
