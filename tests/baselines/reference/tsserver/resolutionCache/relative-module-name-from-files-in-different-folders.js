Info 0    [00:00:41.000] Provided types map file "/typesMap.json" doesn't exist
Creating project service
//// [/user/username/projects/myproject/product/src/module1.ts]
export function module1() {}

//// [/user/username/projects/myproject/product/module2.ts]
export function module2() {}

//// [/user/username/projects/myproject/product/src/file1.ts]
import { module1 } from "./module1";import { module2 } from "../module2";

//// [/user/username/projects/myproject/product/src/feature/file2.ts]
import { module1 } from "../module1";import { module2 } from "../../module2";

//// [/user/username/projects/myproject/product/test/src/file3.ts]
import { module1 } from "../../src/module1";import { module2 } from "../../module2";

//// [/user/username/projects/myproject/product/test/file4.ts]
import { module1 } from "../src/module1}";import { module2 } from "../module2";

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

Info 1    [00:00:42.000] Search path: /user/username/projects/myproject/product/src
Info 2    [00:00:43.000] For info: /user/username/projects/myproject/product/src/file1.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 3    [00:00:44.000] Creating configuration project /user/username/projects/myproject/tsconfig.json
Info 4    [00:00:45.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info 5    [00:00:46.000] Config: /user/username/projects/myproject/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/product/module2.ts",
  "/user/username/projects/myproject/product/src/file1.ts",
  "/user/username/projects/myproject/product/src/module1.ts",
  "/user/username/projects/myproject/product/src/feature/file2.ts",
  "/user/username/projects/myproject/product/test/file4.ts",
  "/user/username/projects/myproject/product/test/src/file3.ts"
 ],
 "options": {
  "traceResolution": true,
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
 }
}
Info 6    [00:00:47.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 7    [00:00:48.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 8    [00:00:49.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/product/module2.ts 500 undefined WatchType: Closed Script info
Info 9    [00:00:50.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/product/src/module1.ts 500 undefined WatchType: Closed Script info
Info 10   [00:00:51.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/product/src/feature/file2.ts 500 undefined WatchType: Closed Script info
Info 11   [00:00:52.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/product/test/file4.ts 500 undefined WatchType: Closed Script info
Info 12   [00:00:53.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/product/test/src/file3.ts 500 undefined WatchType: Closed Script info
Info 13   [00:00:54.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json
Info 14   [00:00:55.000] ======== Resolving module './module1' from '/user/username/projects/myproject/product/src/file1.ts'. ========
Info 15   [00:00:56.000] Module resolution kind is not specified, using 'Node10'.
Info 16   [00:00:57.000] Loading module as file / folder, candidate module location '/user/username/projects/myproject/product/src/module1', target file types: TypeScript, Declaration.
Info 17   [00:00:58.000] File '/user/username/projects/myproject/product/src/module1.ts' exist - use it as a name resolution result.
Info 18   [00:00:59.000] ======== Module name './module1' was successfully resolved to '/user/username/projects/myproject/product/src/module1.ts'. ========
Info 19   [00:01:00.000] ======== Resolving module '../module2' from '/user/username/projects/myproject/product/src/file1.ts'. ========
Info 20   [00:01:01.000] Module resolution kind is not specified, using 'Node10'.
Info 21   [00:01:02.000] Loading module as file / folder, candidate module location '/user/username/projects/myproject/product/module2', target file types: TypeScript, Declaration.
Info 22   [00:01:03.000] File '/user/username/projects/myproject/product/module2.ts' exist - use it as a name resolution result.
Info 23   [00:01:04.000] ======== Module name '../module2' was successfully resolved to '/user/username/projects/myproject/product/module2.ts'. ========
Info 24   [00:01:05.000] ======== Resolving module '../module1' from '/user/username/projects/myproject/product/src/feature/file2.ts'. ========
Info 25   [00:01:06.000] Module resolution kind is not specified, using 'Node10'.
Info 26   [00:01:07.000] Loading module as file / folder, candidate module location '/user/username/projects/myproject/product/src/module1', target file types: TypeScript, Declaration.
Info 27   [00:01:08.000] File '/user/username/projects/myproject/product/src/module1.ts' exist - use it as a name resolution result.
Info 28   [00:01:09.000] ======== Module name '../module1' was successfully resolved to '/user/username/projects/myproject/product/src/module1.ts'. ========
Info 29   [00:01:10.000] ======== Resolving module '../../module2' from '/user/username/projects/myproject/product/src/feature/file2.ts'. ========
Info 30   [00:01:11.000] Module resolution kind is not specified, using 'Node10'.
Info 31   [00:01:12.000] Loading module as file / folder, candidate module location '/user/username/projects/myproject/product/module2', target file types: TypeScript, Declaration.
Info 32   [00:01:13.000] File '/user/username/projects/myproject/product/module2.ts' exist - use it as a name resolution result.
Info 33   [00:01:14.000] ======== Module name '../../module2' was successfully resolved to '/user/username/projects/myproject/product/module2.ts'. ========
Info 34   [00:01:15.000] ======== Resolving module '../src/module1}' from '/user/username/projects/myproject/product/test/file4.ts'. ========
Info 35   [00:01:16.000] Module resolution kind is not specified, using 'Node10'.
Info 36   [00:01:17.000] Loading module as file / folder, candidate module location '/user/username/projects/myproject/product/src/module1}', target file types: TypeScript, Declaration.
Info 37   [00:01:18.000] File '/user/username/projects/myproject/product/src/module1}.ts' does not exist.
Info 38   [00:01:19.000] File '/user/username/projects/myproject/product/src/module1}.tsx' does not exist.
Info 39   [00:01:20.000] File '/user/username/projects/myproject/product/src/module1}.d.ts' does not exist.
Info 40   [00:01:21.000] Directory '/user/username/projects/myproject/product/src/module1}' does not exist, skipping all lookups in it.
Info 41   [00:01:22.000] Loading module as file / folder, candidate module location '/user/username/projects/myproject/product/src/module1}', target file types: JavaScript.
Info 42   [00:01:23.000] File '/user/username/projects/myproject/product/src/module1}.js' does not exist.
Info 43   [00:01:24.000] File '/user/username/projects/myproject/product/src/module1}.jsx' does not exist.
Info 44   [00:01:25.000] Directory '/user/username/projects/myproject/product/src/module1}' does not exist, skipping all lookups in it.
Info 45   [00:01:26.000] ======== Module name '../src/module1}' was not resolved. ========
Info 46   [00:01:27.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/product 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 47   [00:01:28.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/product 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 48   [00:01:29.000] ======== Resolving module '../module2' from '/user/username/projects/myproject/product/test/file4.ts'. ========
Info 49   [00:01:30.000] Module resolution kind is not specified, using 'Node10'.
Info 50   [00:01:31.000] Loading module as file / folder, candidate module location '/user/username/projects/myproject/product/module2', target file types: TypeScript, Declaration.
Info 51   [00:01:32.000] File '/user/username/projects/myproject/product/module2.ts' exist - use it as a name resolution result.
Info 52   [00:01:33.000] ======== Module name '../module2' was successfully resolved to '/user/username/projects/myproject/product/module2.ts'. ========
Info 53   [00:01:34.000] ======== Resolving module '../../src/module1' from '/user/username/projects/myproject/product/test/src/file3.ts'. ========
Info 54   [00:01:35.000] Module resolution kind is not specified, using 'Node10'.
Info 55   [00:01:36.000] Loading module as file / folder, candidate module location '/user/username/projects/myproject/product/src/module1', target file types: TypeScript, Declaration.
Info 56   [00:01:37.000] File '/user/username/projects/myproject/product/src/module1.ts' exist - use it as a name resolution result.
Info 57   [00:01:38.000] ======== Module name '../../src/module1' was successfully resolved to '/user/username/projects/myproject/product/src/module1.ts'. ========
Info 58   [00:01:39.000] ======== Resolving module '../../module2' from '/user/username/projects/myproject/product/test/src/file3.ts'. ========
Info 59   [00:01:40.000] Module resolution kind is not specified, using 'Node10'.
Info 60   [00:01:41.000] Loading module as file / folder, candidate module location '/user/username/projects/myproject/product/module2', target file types: TypeScript, Declaration.
Info 61   [00:01:42.000] File '/user/username/projects/myproject/product/module2.ts' exist - use it as a name resolution result.
Info 62   [00:01:43.000] ======== Module name '../../module2' was successfully resolved to '/user/username/projects/myproject/product/module2.ts'. ========
Info 63   [00:01:44.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 64   [00:01:45.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 65   [00:01:46.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 66   [00:01:47.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 67   [00:01:48.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 68   [00:01:49.000] 	Files (7)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/product/module2.ts
	/user/username/projects/myproject/product/src/module1.ts
	/user/username/projects/myproject/product/src/file1.ts
	/user/username/projects/myproject/product/src/feature/file2.ts
	/user/username/projects/myproject/product/test/file4.ts
	/user/username/projects/myproject/product/test/src/file3.ts


	../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	product/module2.ts
	  Matched by default include pattern '**/*'
	  Imported via "../module2" from file 'product/src/file1.ts'
	  Imported via "../../module2" from file 'product/src/feature/file2.ts'
	  Imported via "../module2" from file 'product/test/file4.ts'
	  Imported via "../../module2" from file 'product/test/src/file3.ts'
	product/src/module1.ts
	  Imported via "./module1" from file 'product/src/file1.ts'
	  Matched by default include pattern '**/*'
	  Imported via "../module1" from file 'product/src/feature/file2.ts'
	  Imported via "../../src/module1" from file 'product/test/src/file3.ts'
	product/src/file1.ts
	  Matched by default include pattern '**/*'
	product/src/feature/file2.ts
	  Matched by default include pattern '**/*'
	product/test/file4.ts
	  Matched by default include pattern '**/*'
	product/test/src/file3.ts
	  Matched by default include pattern '**/*'

Info 69   [00:01:50.000] -----------------------------------------------
Info 70   [00:01:51.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 70   [00:01:52.000] 	Files (7)

Info 70   [00:01:53.000] -----------------------------------------------
Info 70   [00:01:54.000] Open files: 
Info 70   [00:01:55.000] 	FileName: /user/username/projects/myproject/product/src/file1.ts ProjectRootPath: undefined
Info 70   [00:01:56.000] 		Projects: /user/username/projects/myproject/tsconfig.json
Info 70   [00:02:03.000] FileWatcher:: Triggered with /user/username/projects/myproject/product/src/feature/file2.ts 1:: WatchInfo: /user/username/projects/myproject/product/src/feature/file2.ts 500 undefined WatchType: Closed Script info
Info 71   [00:02:04.000] Scheduled: /user/username/projects/myproject/tsconfig.json
Info 72   [00:02:05.000] Scheduled: *ensureProjectForOpenFiles*
Info 73   [00:02:06.000] Elapsed:: *ms FileWatcher:: Triggered with /user/username/projects/myproject/product/src/feature/file2.ts 1:: WatchInfo: /user/username/projects/myproject/product/src/feature/file2.ts 500 undefined WatchType: Closed Script info
Info 74   [00:02:10.000] FileWatcher:: Triggered with /user/username/projects/myproject/product/test/src/file3.ts 1:: WatchInfo: /user/username/projects/myproject/product/test/src/file3.ts 500 undefined WatchType: Closed Script info
Info 75   [00:02:11.000] Scheduled: /user/username/projects/myproject/tsconfig.json, Cancelled earlier one
Info 76   [00:02:12.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 77   [00:02:13.000] Elapsed:: *ms FileWatcher:: Triggered with /user/username/projects/myproject/product/test/src/file3.ts 1:: WatchInfo: /user/username/projects/myproject/product/test/src/file3.ts 500 undefined WatchType: Closed Script info
Info 78   [00:02:17.000] FileWatcher:: Triggered with /user/username/projects/myproject/product/test/file4.ts 1:: WatchInfo: /user/username/projects/myproject/product/test/file4.ts 500 undefined WatchType: Closed Script info
Info 79   [00:02:18.000] Scheduled: /user/username/projects/myproject/tsconfig.json, Cancelled earlier one
Info 80   [00:02:19.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 81   [00:02:20.000] Elapsed:: *ms FileWatcher:: Triggered with /user/username/projects/myproject/product/test/file4.ts 1:: WatchInfo: /user/username/projects/myproject/product/test/file4.ts 500 undefined WatchType: Closed Script info
Before running timeout callbacks
//// [/user/username/projects/myproject/product/src/file1.ts]
import { module1 } from "./module1";import { module2 } from "../module2";import { module1 } from "./module1";import { module2 } from "../module2";

//// [/user/username/projects/myproject/product/src/feature/file2.ts]
import { module1 } from "../module1";import { module2 } from "../../module2";import { module1 } from "../module1";import { module2 } from "../../module2";

//// [/user/username/projects/myproject/product/test/src/file3.ts]
import { module1 } from "../../src/module1";import { module2 } from "../../module2";import { module1 } from "../../src/module1";import { module2 } from "../../module2";

//// [/user/username/projects/myproject/product/test/file4.ts]
import { module1 } from "../src/module1}";import { module2 } from "../module2";import { module1 } from "../src/module1}";import { module2 } from "../module2";


PolledWatches::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/tsconfig.json:
  {}
/user/username/projects/myproject/product/module2.ts:
  {}
/user/username/projects/myproject/product/src/module1.ts:
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
/user/username/projects/myproject/product:
  {}

Info 82   [00:02:21.000] Running: /user/username/projects/myproject/tsconfig.json
Info 83   [00:02:22.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json
Info 84   [00:02:23.000] Reusing resolution of module './module1' from '/user/username/projects/myproject/product/src/file1.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/product/src/module1.ts'.
Info 85   [00:02:24.000] Reusing resolution of module '../module2' from '/user/username/projects/myproject/product/src/file1.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/product/module2.ts'.
Info 86   [00:02:25.000] Reusing resolution of module '../module1' from '/user/username/projects/myproject/product/src/feature/file2.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/product/src/module1.ts'.
Info 87   [00:02:26.000] Reusing resolution of module '../../module2' from '/user/username/projects/myproject/product/src/feature/file2.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/product/module2.ts'.
Info 88   [00:02:27.000] Reusing resolution of module '../src/module1}' from '/user/username/projects/myproject/product/test/file4.ts' of old program, it was not resolved.
Info 89   [00:02:28.000] Reusing resolution of module '../module2' from '/user/username/projects/myproject/product/test/file4.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/product/module2.ts'.
Info 90   [00:02:29.000] Reusing resolution of module '../../src/module1' from '/user/username/projects/myproject/product/test/src/file3.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/product/src/module1.ts'.
Info 91   [00:02:30.000] Reusing resolution of module '../../module2' from '/user/username/projects/myproject/product/test/src/file3.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/product/module2.ts'.
Info 92   [00:02:31.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json Version: 2 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info 93   [00:02:32.000] Different program with same set of files
Info 94   [00:02:33.000] Running: *ensureProjectForOpenFiles*
Info 95   [00:02:34.000] Before ensureProjectForOpenFiles:
Info 96   [00:02:35.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 96   [00:02:36.000] 	Files (7)

Info 96   [00:02:37.000] -----------------------------------------------
Info 96   [00:02:38.000] Open files: 
Info 96   [00:02:39.000] 	FileName: /user/username/projects/myproject/product/src/file1.ts ProjectRootPath: undefined
Info 96   [00:02:40.000] 		Projects: /user/username/projects/myproject/tsconfig.json
Info 96   [00:02:41.000] After ensureProjectForOpenFiles:
Info 97   [00:02:42.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 97   [00:02:43.000] 	Files (7)

Info 97   [00:02:44.000] -----------------------------------------------
Info 97   [00:02:45.000] Open files: 
Info 97   [00:02:46.000] 	FileName: /user/username/projects/myproject/product/src/file1.ts ProjectRootPath: undefined
Info 97   [00:02:47.000] 		Projects: /user/username/projects/myproject/tsconfig.json
After running timeout callbacks

PolledWatches::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/tsconfig.json:
  {}
/user/username/projects/myproject/product/module2.ts:
  {}
/user/username/projects/myproject/product/src/module1.ts:
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
/user/username/projects/myproject/product:
  {}
