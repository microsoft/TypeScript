Info 0    [00:00:29.000] Provided types map file "/typesMap.json" doesn't exist
Creating project service
//// [/user/username/projects/myproject/src/module1.ts]
export function module1() {}

//// [/user/username/projects/myproject/module2.ts]
export function module2() {}

//// [/user/username/projects/myproject/src/file1.ts]
import { module1 } from "./module1";import { module2 } from "../module2";

//// [/user/username/projects/myproject/src/file2.ts]
import { module1 } from "./module1";import { module2 } from "../module2";

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

Info 1    [00:00:30.000] Search path: /user/username/projects/myproject/src
Info 2    [00:00:31.000] For info: /user/username/projects/myproject/src/file1.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 3    [00:00:32.000] Creating configuration project /user/username/projects/myproject/tsconfig.json
Info 4    [00:00:33.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info 5    [00:00:34.000] Config: /user/username/projects/myproject/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/module2.ts",
  "/user/username/projects/myproject/src/file1.ts",
  "/user/username/projects/myproject/src/file2.ts",
  "/user/username/projects/myproject/src/module1.ts"
 ],
 "options": {
  "traceResolution": true,
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
 }
}
Info 6    [00:00:35.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 7    [00:00:36.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 8    [00:00:37.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/module2.ts 500 undefined WatchType: Closed Script info
Info 9    [00:00:38.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/file2.ts 500 undefined WatchType: Closed Script info
Info 10   [00:00:39.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/module1.ts 500 undefined WatchType: Closed Script info
Info 11   [00:00:40.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json
Info 12   [00:00:41.000] ======== Resolving module './module1' from '/user/username/projects/myproject/src/file1.ts'. ========
Info 13   [00:00:42.000] Module resolution kind is not specified, using 'NodeJs'.
Info 14   [00:00:43.000] Loading module as file / folder, candidate module location '/user/username/projects/myproject/src/module1', target file type 'TypeScript'.
Info 15   [00:00:44.000] File '/user/username/projects/myproject/src/module1.ts' exist - use it as a name resolution result.
Info 16   [00:00:45.000] ======== Module name './module1' was successfully resolved to '/user/username/projects/myproject/src/module1.ts'. ========
Info 17   [00:00:46.000] ======== Resolving module '../module2' from '/user/username/projects/myproject/src/file1.ts'. ========
Info 18   [00:00:47.000] Module resolution kind is not specified, using 'NodeJs'.
Info 19   [00:00:48.000] Loading module as file / folder, candidate module location '/user/username/projects/myproject/module2', target file type 'TypeScript'.
Info 20   [00:00:49.000] File '/user/username/projects/myproject/module2.ts' exist - use it as a name resolution result.
Info 21   [00:00:50.000] ======== Module name '../module2' was successfully resolved to '/user/username/projects/myproject/module2.ts'. ========
Info 22   [00:00:51.000] Reusing resolution of module './module1' from '/user/username/projects/myproject/src/file2.ts' found in cache from location '/user/username/projects/myproject/src', it was successfully resolved to '/user/username/projects/myproject/src/module1.ts'.
Info 23   [00:00:52.000] Reusing resolution of module '../module2' from '/user/username/projects/myproject/src/file2.ts' found in cache from location '/user/username/projects/myproject/src', it was successfully resolved to '/user/username/projects/myproject/module2.ts'.
Info 24   [00:00:53.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 25   [00:00:54.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 26   [00:00:55.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 27   [00:00:56.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 28   [00:00:57.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 29   [00:00:58.000] 	Files (5)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/module2.ts
	/user/username/projects/myproject/src/module1.ts
	/user/username/projects/myproject/src/file1.ts
	/user/username/projects/myproject/src/file2.ts


	../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	module2.ts
	  Matched by default include pattern '**/*'
	  Imported via "../module2" from file 'src/file1.ts'
	  Imported via "../module2" from file 'src/file2.ts'
	src/module1.ts
	  Imported via "./module1" from file 'src/file1.ts'
	  Imported via "./module1" from file 'src/file2.ts'
	  Matched by default include pattern '**/*'
	src/file1.ts
	  Matched by default include pattern '**/*'
	src/file2.ts
	  Matched by default include pattern '**/*'

Info 30   [00:00:59.000] -----------------------------------------------
Info 31   [00:01:00.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 31   [00:01:01.000] 	Files (5)

Info 31   [00:01:02.000] -----------------------------------------------
Info 31   [00:01:03.000] Open files: 
Info 31   [00:01:04.000] 	FileName: /user/username/projects/myproject/src/file1.ts ProjectRootPath: undefined
Info 31   [00:01:05.000] 		Projects: /user/username/projects/myproject/tsconfig.json
Info 31   [00:01:12.000] FileWatcher:: Triggered with /user/username/projects/myproject/src/file2.ts 1:: WatchInfo: /user/username/projects/myproject/src/file2.ts 500 undefined WatchType: Closed Script info
Info 32   [00:01:13.000] Scheduled: /user/username/projects/myproject/tsconfig.json
Info 33   [00:01:14.000] Scheduled: *ensureProjectForOpenFiles*
Info 34   [00:01:15.000] Elapsed:: *ms FileWatcher:: Triggered with /user/username/projects/myproject/src/file2.ts 1:: WatchInfo: /user/username/projects/myproject/src/file2.ts 500 undefined WatchType: Closed Script info
Before running timeout callbacks
//// [/user/username/projects/myproject/src/file1.ts]
import { module1 } from "./module1";import { module2 } from "../module2";import { module1 } from "./module1";import { module2 } from "../module2";

//// [/user/username/projects/myproject/src/file2.ts]
import { module1 } from "./module1";import { module2 } from "../module2";import { module1 } from "./module1";import { module2 } from "../module2";


PolledWatches::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/tsconfig.json:
  {}
/user/username/projects/myproject/module2.ts:
  {}
/user/username/projects/myproject/src/file2.ts:
  {}
/user/username/projects/myproject/src/module1.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject:
  {}

Info 35   [00:01:16.000] Running: /user/username/projects/myproject/tsconfig.json
Info 36   [00:01:17.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json
Info 37   [00:01:18.000] Reusing resolution of module './module1' from '/user/username/projects/myproject/src/file1.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/module1.ts'.
Info 38   [00:01:19.000] Reusing resolution of module '../module2' from '/user/username/projects/myproject/src/file1.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/module2.ts'.
Info 39   [00:01:20.000] Reusing resolution of module './module1' from '/user/username/projects/myproject/src/file2.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/module1.ts'.
Info 40   [00:01:21.000] Reusing resolution of module '../module2' from '/user/username/projects/myproject/src/file2.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/module2.ts'.
Info 41   [00:01:22.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json Version: 2 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info 42   [00:01:23.000] Different program with same set of files
Info 43   [00:01:24.000] Running: *ensureProjectForOpenFiles*
Info 44   [00:01:25.000] Before ensureProjectForOpenFiles:
Info 45   [00:01:26.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 45   [00:01:27.000] 	Files (5)

Info 45   [00:01:28.000] -----------------------------------------------
Info 45   [00:01:29.000] Open files: 
Info 45   [00:01:30.000] 	FileName: /user/username/projects/myproject/src/file1.ts ProjectRootPath: undefined
Info 45   [00:01:31.000] 		Projects: /user/username/projects/myproject/tsconfig.json
Info 45   [00:01:32.000] After ensureProjectForOpenFiles:
Info 46   [00:01:33.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 46   [00:01:34.000] 	Files (5)

Info 46   [00:01:35.000] -----------------------------------------------
Info 46   [00:01:36.000] Open files: 
Info 46   [00:01:37.000] 	FileName: /user/username/projects/myproject/src/file1.ts ProjectRootPath: undefined
Info 46   [00:01:38.000] 		Projects: /user/username/projects/myproject/tsconfig.json
After running timeout callbacks

PolledWatches::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/tsconfig.json:
  {}
/user/username/projects/myproject/module2.ts:
  {}
/user/username/projects/myproject/src/file2.ts:
  {}
/user/username/projects/myproject/src/module1.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject:
  {}
