Info 0    [00:00:17.000] Provided types map file "/typesMap.json" doesn't exist
Creating project service
//// [/a/b/file1.ts]
import classc from "file2"

//// [/a/file2.ts]
export classc { method2a() { return 10; } }

//// [/a/b/tsconfig.json]
{"files":["/a/b/file1.ts"],"compilerOptions":{"module":"amd"}}

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

Info 1    [00:00:18.000] Search path: /a/b
Info 2    [00:00:19.000] For info: /a/b/file1.ts :: Config file name: /a/b/tsconfig.json
Info 3    [00:00:20.000] Creating configuration project /a/b/tsconfig.json
Info 4    [00:00:21.000] FileWatcher:: Added:: WatchInfo: /a/b/tsconfig.json 2000 undefined Project: /a/b/tsconfig.json WatchType: Config file
Info 5    [00:00:22.000] Config: /a/b/tsconfig.json : {
 "rootNames": [
  "/a/b/file1.ts"
 ],
 "options": {
  "module": 2,
  "configFilePath": "/a/b/tsconfig.json"
 }
}
Info 6    [00:00:23.000] Starting updateGraphWorker: Project: /a/b/tsconfig.json
Info 7    [00:00:24.000] FileWatcher:: Added:: WatchInfo: /a/file2.ts 500 undefined WatchType: Closed Script info
Info 8    [00:00:25.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 9    [00:00:26.000] DirectoryWatcher:: Added:: WatchInfo: /a/b 0 undefined Project: /a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 10   [00:00:27.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b 0 undefined Project: /a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 11   [00:00:28.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/tsconfig.json WatchType: Type roots
Info 12   [00:00:29.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/tsconfig.json WatchType: Type roots
Info 13   [00:00:30.000] Finishing updateGraphWorker: Project: /a/b/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 14   [00:00:31.000] Project '/a/b/tsconfig.json' (Configured)
Info 15   [00:00:32.000] 	Files (3)
	/a/lib/lib.d.ts
	/a/file2.ts
	/a/b/file1.ts


	../lib/lib.d.ts
	  Default library for target 'es5'
	../file2.ts
	  Imported via "file2" from file 'file1.ts'
	file1.ts
	  Part of 'files' list in tsconfig.json

Info 16   [00:00:33.000] -----------------------------------------------
Info 17   [00:00:34.000] Project '/a/b/tsconfig.json' (Configured)
Info 17   [00:00:35.000] 	Files (3)

Info 17   [00:00:36.000] -----------------------------------------------
Info 17   [00:00:37.000] Open files: 
Info 17   [00:00:38.000] 	FileName: /a/b/file1.ts ProjectRootPath: undefined
Info 17   [00:00:39.000] 		Projects: /a/b/tsconfig.json
Info 17   [00:00:42.000] DirectoryWatcher:: Triggered with /a/b/file2.ts :: WatchInfo: /a/b 0 undefined Project: /a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 18   [00:00:43.000] Scheduled: /a/b/tsconfig.jsonFailedLookupInvalidation
Info 19   [00:00:44.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /a/b/file2.ts :: WatchInfo: /a/b 0 undefined Project: /a/b/tsconfig.json WatchType: Failed Lookup Locations
Before running timeout callbacks
//// [/a/b/file2.ts]
export classc { method2() { return 10; } }


PolledWatches::
/a/b/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/b/tsconfig.json:
  {}
/a/file2.ts:
  {}
/a/lib/lib.d.ts:
  {}
/a/b:
  {}

FsWatchesRecursive::

Info 20   [00:00:45.000] Running: /a/b/tsconfig.jsonFailedLookupInvalidation
Info 21   [00:00:46.000] Scheduled: /a/b/tsconfig.json
Info 22   [00:00:47.000] Scheduled: *ensureProjectForOpenFiles*
After running timeout callbacks

PolledWatches::
/a/b/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/b/tsconfig.json:
  {}
/a/file2.ts:
  {}
/a/lib/lib.d.ts:
  {}
/a/b:
  {}

FsWatchesRecursive::

Before running timeout callbacks

PolledWatches::
/a/b/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/b/tsconfig.json:
  {}
/a/file2.ts:
  {}
/a/lib/lib.d.ts:
  {}
/a/b:
  {}

FsWatchesRecursive::

Info 23   [00:00:48.000] Running: /a/b/tsconfig.json
Info 24   [00:00:49.000] Starting updateGraphWorker: Project: /a/b/tsconfig.json
Info 25   [00:00:50.000] FileWatcher:: Added:: WatchInfo: /a/b/file2.ts 500 undefined WatchType: Closed Script info
Info 26   [00:00:51.000] DirectoryWatcher:: Close:: WatchInfo: /a/b 0 undefined Project: /a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 27   [00:00:52.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /a/b 0 undefined Project: /a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 28   [00:00:53.000] Finishing updateGraphWorker: Project: /a/b/tsconfig.json Version: 2 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info 29   [00:00:54.000] Project '/a/b/tsconfig.json' (Configured)
Info 30   [00:00:55.000] 	Files (3)
	/a/lib/lib.d.ts
	/a/b/file2.ts
	/a/b/file1.ts


	../lib/lib.d.ts
	  Default library for target 'es5'
	file2.ts
	  Imported via "file2" from file 'file1.ts'
	file1.ts
	  Part of 'files' list in tsconfig.json

Info 31   [00:00:56.000] -----------------------------------------------
Info 32   [00:00:57.000] Running: *ensureProjectForOpenFiles*
Info 33   [00:00:58.000] Before ensureProjectForOpenFiles:
Info 34   [00:00:59.000] Project '/a/b/tsconfig.json' (Configured)
Info 34   [00:01:00.000] 	Files (3)

Info 34   [00:01:01.000] -----------------------------------------------
Info 34   [00:01:02.000] Open files: 
Info 34   [00:01:03.000] 	FileName: /a/b/file1.ts ProjectRootPath: undefined
Info 34   [00:01:04.000] 		Projects: /a/b/tsconfig.json
Info 34   [00:01:05.000] After ensureProjectForOpenFiles:
Info 35   [00:01:06.000] Project '/a/b/tsconfig.json' (Configured)
Info 35   [00:01:07.000] 	Files (3)

Info 35   [00:01:08.000] -----------------------------------------------
Info 35   [00:01:09.000] Open files: 
Info 35   [00:01:10.000] 	FileName: /a/b/file1.ts ProjectRootPath: undefined
Info 35   [00:01:11.000] 		Projects: /a/b/tsconfig.json
After running timeout callbacks

PolledWatches::
/a/b/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/b/tsconfig.json:
  {}
/a/file2.ts:
  {}
/a/lib/lib.d.ts:
  {}
/a/b/file2.ts:
  {}

FsWatchesRecursive::

Info 35   [00:01:12.000] FileWatcher:: Close:: WatchInfo: /a/b/file2.ts 500 undefined WatchType: Closed Script info
Info 36   [00:01:13.000] Search path: /a/b
Info 37   [00:01:14.000] For info: /a/b/file2.ts :: Config file name: /a/b/tsconfig.json
Info 38   [00:01:15.000] FileWatcher:: Close:: WatchInfo: /a/file2.ts 500 undefined WatchType: Closed Script info
Info 39   [00:01:16.000] Project '/a/b/tsconfig.json' (Configured)
Info 39   [00:01:17.000] 	Files (3)

Info 39   [00:01:18.000] -----------------------------------------------
Info 39   [00:01:19.000] Open files: 
Info 39   [00:01:20.000] 	FileName: /a/b/file1.ts ProjectRootPath: undefined
Info 39   [00:01:21.000] 		Projects: /a/b/tsconfig.json
Info 39   [00:01:22.000] 	FileName: /a/b/file2.ts ProjectRootPath: undefined
Info 39   [00:01:23.000] 		Projects: /a/b/tsconfig.json