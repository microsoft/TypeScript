Info 0    [00:00:21.000] Provided types map file "/typesMap.json" doesn't exist
Creating project service
//// [/a/b/projects/project/src/index.ts]
let y = 10

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

//// [/a/b/projects/project/tsconfig.json]
{}


PolledWatches::

FsWatches::

FsWatchesRecursive::

Info 1    [00:00:22.000] Search path: /a/b/projects/project/src
Info 2    [00:00:23.000] For info: /a/b/projects/project/src/index.ts :: Config file name: /a/b/projects/project/tsconfig.json
Info 3    [00:00:24.000] Creating configuration project /a/b/projects/project/tsconfig.json
Info 4    [00:00:25.000] FileWatcher:: Added:: WatchInfo: /a/b/projects/project/tsconfig.json 2000 undefined Project: /a/b/projects/project/tsconfig.json WatchType: Config file
Info 5    [00:00:26.000] Config: /a/b/projects/project/tsconfig.json : {
 "rootNames": [
  "/a/b/projects/project/src/index.ts"
 ],
 "options": {
  "configFilePath": "/a/b/projects/project/tsconfig.json"
 }
}
Info 6    [00:00:27.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/projects/project 1 undefined Config: /a/b/projects/project/tsconfig.json WatchType: Wild card directory
Info 7    [00:00:28.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/projects/project 1 undefined Config: /a/b/projects/project/tsconfig.json WatchType: Wild card directory
Info 8    [00:00:29.000] Starting updateGraphWorker: Project: /a/b/projects/project/tsconfig.json
Info 9    [00:00:30.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 10   [00:00:31.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/projects/project/node_modules/@types 1 undefined Project: /a/b/projects/project/tsconfig.json WatchType: Type roots
Info 11   [00:00:32.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/projects/project/node_modules/@types 1 undefined Project: /a/b/projects/project/tsconfig.json WatchType: Type roots
Info 12   [00:00:33.000] Finishing updateGraphWorker: Project: /a/b/projects/project/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 13   [00:00:34.000] Project '/a/b/projects/project/tsconfig.json' (Configured)
Info 14   [00:00:35.000] 	Files (2)
	/a/lib/lib.d.ts
	/a/b/projects/project/src/index.ts


	../../../lib/lib.d.ts
	  Default library for target 'es3'
	src/index.ts
	  Matched by default include pattern '**/*'

Info 15   [00:00:36.000] -----------------------------------------------
Info 16   [00:00:37.000] Project '/a/b/projects/project/tsconfig.json' (Configured)
Info 16   [00:00:38.000] 	Files (2)

Info 16   [00:00:39.000] -----------------------------------------------
Info 16   [00:00:40.000] Open files: 
Info 16   [00:00:41.000] 	FileName: /a/b/projects/project/src/index.ts ProjectRootPath: /a/b/projects/proj
Info 16   [00:00:42.000] 		Projects: /a/b/projects/project/tsconfig.json
Info 16   [00:00:44.000] FileWatcher:: Triggered with /a/b/projects/project/tsconfig.json 2:: WatchInfo: /a/b/projects/project/tsconfig.json 2000 undefined Project: /a/b/projects/project/tsconfig.json WatchType: Config file
Info 17   [00:00:45.000] `remove Project::
Info 18   [00:00:46.000] Project '/a/b/projects/project/tsconfig.json' (Configured)
Info 19   [00:00:47.000] 	Files (2)
	/a/lib/lib.d.ts
	/a/b/projects/project/src/index.ts


	../../../lib/lib.d.ts
	  Default library for target 'es3'
	src/index.ts
	  Matched by default include pattern '**/*'

Info 20   [00:00:48.000] -----------------------------------------------
Info 21   [00:00:49.000] DirectoryWatcher:: Close:: WatchInfo: /a/b/projects/project 1 undefined Config: /a/b/projects/project/tsconfig.json WatchType: Wild card directory
Info 22   [00:00:50.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /a/b/projects/project 1 undefined Config: /a/b/projects/project/tsconfig.json WatchType: Wild card directory
Info 23   [00:00:51.000] FileWatcher:: Close:: WatchInfo: /a/b/projects/project/tsconfig.json 2000 undefined Project: /a/b/projects/project/tsconfig.json WatchType: Config file
Info 24   [00:00:52.000] DirectoryWatcher:: Close:: WatchInfo: /a/b/projects/project/node_modules/@types 1 undefined Project: /a/b/projects/project/tsconfig.json WatchType: Type roots
Info 25   [00:00:53.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /a/b/projects/project/node_modules/@types 1 undefined Project: /a/b/projects/project/tsconfig.json WatchType: Type roots
Info 26   [00:00:54.000] Search path: /a/b/projects/project/src
Info 27   [00:00:55.000] For info: /a/b/projects/project/src/index.ts :: No config files found.
Info 28   [00:00:56.000] Scheduled: *ensureProjectForOpenFiles*
Info 29   [00:00:57.000] Elapsed:: *ms FileWatcher:: Triggered with /a/b/projects/project/tsconfig.json 2:: WatchInfo: /a/b/projects/project/tsconfig.json 2000 undefined Project: /a/b/projects/project/tsconfig.json WatchType: Config file
Before running timeout callbacks
//// [/a/b/projects/project/tsconfig.json] deleted

PolledWatches::

FsWatches::
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::

Info 30   [00:00:58.500] Running: *ensureProjectForOpenFiles*
Info 31   [00:00:59.500] Before ensureProjectForOpenFiles:
Info 32   [00:01:00.500] Open files: 
Info 32   [00:01:01.500] 	FileName: /a/b/projects/project/src/index.ts ProjectRootPath: /a/b/projects/proj
Info 32   [00:01:02.500] 		Projects: 
Info 32   [00:01:03.500] FileWatcher:: Added:: WatchInfo: /a/b/projects/project/src/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 33   [00:01:04.500] FileWatcher:: Added:: WatchInfo: /a/b/projects/project/src/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 34   [00:01:05.500] FileWatcher:: Added:: WatchInfo: /a/b/projects/project/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 35   [00:01:06.500] FileWatcher:: Added:: WatchInfo: /a/b/projects/project/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 36   [00:01:07.500] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 37   [00:01:08.500] DirectoryWatcher:: Added:: WatchInfo: /a/b/projects/project/src/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 38   [00:01:09.500] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/projects/project/src/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 39   [00:01:10.500] DirectoryWatcher:: Added:: WatchInfo: /a/b/projects/project/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 40   [00:01:11.500] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/projects/project/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 41   [00:01:12.500] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 42   [00:01:13.500] Project '/dev/null/inferredProject1*' (Inferred)
Info 43   [00:01:14.500] 	Files (2)
	/a/lib/lib.d.ts
	/a/b/projects/project/src/index.ts


	../../../../lib/lib.d.ts
	  Default library for target 'es5'
	index.ts
	  Root file specified for compilation

Info 44   [00:01:15.500] -----------------------------------------------
Info 45   [00:01:16.500] After ensureProjectForOpenFiles:
Info 46   [00:01:17.500] Project '/dev/null/inferredProject1*' (Inferred)
Info 46   [00:01:18.500] 	Files (2)

Info 46   [00:01:19.500] -----------------------------------------------
Info 46   [00:01:20.500] Open files: 
Info 46   [00:01:21.500] 	FileName: /a/b/projects/project/src/index.ts ProjectRootPath: /a/b/projects/proj
Info 46   [00:01:22.500] 		Projects: /dev/null/inferredProject1*
After running timeout callbacks

PolledWatches::
/a/b/projects/project/src/tsconfig.json:
  {"pollingInterval":2000}
/a/b/projects/project/src/jsconfig.json:
  {"pollingInterval":2000}
/a/b/projects/project/tsconfig.json:
  {"pollingInterval":2000}
/a/b/projects/project/jsconfig.json:
  {"pollingInterval":2000}
/a/b/projects/project/src/node_modules/@types:
  {"pollingInterval":500}
/a/b/projects/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::

Info 46   [00:01:25.500] FileWatcher:: Triggered with /a/b/projects/project/tsconfig.json 0:: WatchInfo: /a/b/projects/project/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 47   [00:01:26.500] Search path: /a/b/projects/project/src
Info 48   [00:01:27.500] For info: /a/b/projects/project/src/index.ts :: Config file name: /a/b/projects/project/tsconfig.json
Info 49   [00:01:28.500] Creating configuration project /a/b/projects/project/tsconfig.json
Info 50   [00:01:29.500] Scheduled: /a/b/projects/project/tsconfig.json
Info 51   [00:01:30.500] Scheduled: *ensureProjectForOpenFiles*
Info 52   [00:01:31.500] Elapsed:: *ms FileWatcher:: Triggered with /a/b/projects/project/tsconfig.json 0:: WatchInfo: /a/b/projects/project/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 53   [00:01:32.500] FileWatcher:: Triggered with /a/b/projects/project/tsconfig.json 0:: WatchInfo: /a/b/projects/project/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 54   [00:01:33.500] Search path: /a/b/projects/project/src
Info 55   [00:01:34.500] For info: /a/b/projects/project/src/index.ts :: Config file name: /a/b/projects/project/tsconfig.json
Info 56   [00:01:35.500] Scheduled: /a/b/projects/project/tsconfig.json, Cancelled earlier one
Info 57   [00:01:36.500] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 58   [00:01:37.500] Elapsed:: *ms FileWatcher:: Triggered with /a/b/projects/project/tsconfig.json 0:: WatchInfo: /a/b/projects/project/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Before running timeout callbacks
//// [/a/b/projects/project/tsconfig.json]
{}


PolledWatches::
/a/b/projects/project/src/tsconfig.json:
  {"pollingInterval":2000}
/a/b/projects/project/src/jsconfig.json:
  {"pollingInterval":2000}
/a/b/projects/project/jsconfig.json:
  {"pollingInterval":2000}
/a/b/projects/project/src/node_modules/@types:
  {"pollingInterval":500}
/a/b/projects/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts:
  {}
/a/b/projects/project/tsconfig.json:
  {}

FsWatchesRecursive::

Info 59   [00:01:38.500] Running: /a/b/projects/project/tsconfig.json
Info 60   [00:01:39.500] Loading configured project /a/b/projects/project/tsconfig.json
Info 61   [00:01:40.500] Config: /a/b/projects/project/tsconfig.json : {
 "rootNames": [
  "/a/b/projects/project/src/index.ts"
 ],
 "options": {
  "configFilePath": "/a/b/projects/project/tsconfig.json"
 }
}
Info 62   [00:01:41.500] DirectoryWatcher:: Added:: WatchInfo: /a/b/projects/project 1 undefined Config: /a/b/projects/project/tsconfig.json WatchType: Wild card directory
Info 63   [00:01:42.500] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/projects/project 1 undefined Config: /a/b/projects/project/tsconfig.json WatchType: Wild card directory
Info 64   [00:01:43.500] FileWatcher:: Close:: WatchInfo: /a/b/projects/project/src/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 65   [00:01:44.500] FileWatcher:: Close:: WatchInfo: /a/b/projects/project/src/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 66   [00:01:45.500] FileWatcher:: Close:: WatchInfo: /a/b/projects/project/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 67   [00:01:46.500] Starting updateGraphWorker: Project: /a/b/projects/project/tsconfig.json
Info 68   [00:01:47.500] DirectoryWatcher:: Added:: WatchInfo: /a/b/projects/project/node_modules/@types 1 undefined Project: /a/b/projects/project/tsconfig.json WatchType: Type roots
Info 69   [00:01:48.500] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/projects/project/node_modules/@types 1 undefined Project: /a/b/projects/project/tsconfig.json WatchType: Type roots
Info 70   [00:01:49.500] Finishing updateGraphWorker: Project: /a/b/projects/project/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 71   [00:01:50.500] Project '/a/b/projects/project/tsconfig.json' (Configured)
Info 72   [00:01:51.500] 	Files (2)
	/a/lib/lib.d.ts
	/a/b/projects/project/src/index.ts


	../../../lib/lib.d.ts
	  Default library for target 'es3'
	src/index.ts
	  Matched by default include pattern '**/*'

Info 73   [00:01:52.500] -----------------------------------------------
Info 74   [00:01:53.500] Running: *ensureProjectForOpenFiles*
Info 75   [00:01:54.500] Before ensureProjectForOpenFiles:
Info 76   [00:01:55.500] Project '/a/b/projects/project/tsconfig.json' (Configured)
Info 76   [00:01:56.500] 	Files (2)

Info 76   [00:01:57.500] -----------------------------------------------
Info 76   [00:01:58.500] Project '/dev/null/inferredProject1*' (Inferred)
Info 76   [00:01:59.500] 	Files (2)

Info 76   [00:02:00.500] -----------------------------------------------
Info 76   [00:02:01.500] Open files: 
Info 76   [00:02:02.500] 	FileName: /a/b/projects/project/src/index.ts ProjectRootPath: /a/b/projects/proj
Info 76   [00:02:03.500] 		Projects: /a/b/projects/project/tsconfig.json
Info 76   [00:02:04.500] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 77   [00:02:05.500] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 2 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 78   [00:02:06.500] Project '/dev/null/inferredProject1*' (Inferred)
Info 79   [00:02:07.500] 	Files (0)



Info 80   [00:02:08.500] -----------------------------------------------
Info 81   [00:02:09.500] After ensureProjectForOpenFiles:
Info 82   [00:02:10.500] Project '/a/b/projects/project/tsconfig.json' (Configured)
Info 82   [00:02:11.500] 	Files (2)

Info 82   [00:02:12.500] -----------------------------------------------
Info 82   [00:02:13.500] Project '/dev/null/inferredProject1*' (Inferred)
Info 82   [00:02:14.500] 	Files (0)

Info 82   [00:02:15.500] -----------------------------------------------
Info 82   [00:02:16.500] Open files: 
Info 82   [00:02:17.500] 	FileName: /a/b/projects/project/src/index.ts ProjectRootPath: /a/b/projects/proj
Info 82   [00:02:18.500] 		Projects: /a/b/projects/project/tsconfig.json
After running timeout callbacks

PolledWatches::
/a/b/projects/project/src/node_modules/@types:
  {"pollingInterval":500}
/a/b/projects/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts:
  {}
/a/b/projects/project/tsconfig.json:
  {}

FsWatchesRecursive::
/a/b/projects/project:
  {}
