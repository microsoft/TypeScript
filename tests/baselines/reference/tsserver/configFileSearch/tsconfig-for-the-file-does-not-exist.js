Info 0    [00:00:19.000] Provided types map file "/typesMap.json" doesn't exist
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


PolledWatches::

FsWatches::

FsWatchesRecursive::

Info 1    [00:00:20.000] Search path: /a/b/projects/project/src
Info 2    [00:00:21.000] For info: /a/b/projects/project/src/index.ts :: No config files found.
Info 3    [00:00:22.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 4    [00:00:23.000] FileWatcher:: Added:: WatchInfo: /a/b/projects/project/src/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 5    [00:00:24.000] FileWatcher:: Added:: WatchInfo: /a/b/projects/project/src/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 6    [00:00:25.000] FileWatcher:: Added:: WatchInfo: /a/b/projects/project/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 7    [00:00:26.000] FileWatcher:: Added:: WatchInfo: /a/b/projects/project/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 8    [00:00:27.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 9    [00:00:28.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 10   [00:00:29.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/projects/project/src/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 11   [00:00:30.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/projects/project/src/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 12   [00:00:31.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/projects/project/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 13   [00:00:32.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/projects/project/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 14   [00:00:33.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 15   [00:00:34.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 16   [00:00:35.000] 	Files (2)
	/a/lib/lib.d.ts
	/a/b/projects/project/src/index.ts


	../../../../lib/lib.d.ts
	  Default library for target 'es5'
	index.ts
	  Root file specified for compilation

Info 17   [00:00:36.000] -----------------------------------------------
Info 18   [00:00:37.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 18   [00:00:38.000] 	Files (2)

Info 18   [00:00:39.000] -----------------------------------------------
Info 18   [00:00:40.000] Open files: 
Info 18   [00:00:41.000] 	FileName: /a/b/projects/project/src/index.ts ProjectRootPath: /a/b/projects/proj
Info 18   [00:00:42.000] 		Projects: /dev/null/inferredProject1*
Info 18   [00:00:45.000] FileWatcher:: Triggered with /a/b/projects/project/tsconfig.json 0:: WatchInfo: /a/b/projects/project/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 19   [00:00:46.000] Search path: /a/b/projects/project/src
Info 20   [00:00:47.000] For info: /a/b/projects/project/src/index.ts :: Config file name: /a/b/projects/project/tsconfig.json
Info 21   [00:00:48.000] Creating configuration project /a/b/projects/project/tsconfig.json
Info 22   [00:00:49.000] Scheduled: /a/b/projects/project/tsconfig.json
Info 23   [00:00:50.000] Scheduled: *ensureProjectForOpenFiles*
Info 24   [00:00:51.000] Elapsed:: *ms FileWatcher:: Triggered with /a/b/projects/project/tsconfig.json 0:: WatchInfo: /a/b/projects/project/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 25   [00:00:52.000] FileWatcher:: Triggered with /a/b/projects/project/tsconfig.json 0:: WatchInfo: /a/b/projects/project/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 26   [00:00:53.000] Search path: /a/b/projects/project/src
Info 27   [00:00:54.000] For info: /a/b/projects/project/src/index.ts :: Config file name: /a/b/projects/project/tsconfig.json
Info 28   [00:00:55.000] Scheduled: /a/b/projects/project/tsconfig.json, Cancelled earlier one
Info 29   [00:00:56.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 30   [00:00:57.000] Elapsed:: *ms FileWatcher:: Triggered with /a/b/projects/project/tsconfig.json 0:: WatchInfo: /a/b/projects/project/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
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

Info 31   [00:00:58.000] Running: /a/b/projects/project/tsconfig.json
Info 32   [00:00:59.000] Loading configured project /a/b/projects/project/tsconfig.json
Info 33   [00:01:00.000] Config: /a/b/projects/project/tsconfig.json : {
 "rootNames": [
  "/a/b/projects/project/src/index.ts"
 ],
 "options": {
  "configFilePath": "/a/b/projects/project/tsconfig.json"
 }
}
Info 34   [00:01:01.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/projects/project 1 undefined Config: /a/b/projects/project/tsconfig.json WatchType: Wild card directory
Info 35   [00:01:02.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/projects/project 1 undefined Config: /a/b/projects/project/tsconfig.json WatchType: Wild card directory
Info 36   [00:01:03.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 37   [00:01:04.000] FileWatcher:: Close:: WatchInfo: /a/b/projects/project/src/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 38   [00:01:05.000] FileWatcher:: Close:: WatchInfo: /a/b/projects/project/src/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 39   [00:01:06.000] FileWatcher:: Close:: WatchInfo: /a/b/projects/project/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 40   [00:01:07.000] Starting updateGraphWorker: Project: /a/b/projects/project/tsconfig.json
Info 41   [00:01:08.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/projects/project/node_modules/@types 1 undefined Project: /a/b/projects/project/tsconfig.json WatchType: Type roots
Info 42   [00:01:09.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/projects/project/node_modules/@types 1 undefined Project: /a/b/projects/project/tsconfig.json WatchType: Type roots
Info 43   [00:01:10.000] Finishing updateGraphWorker: Project: /a/b/projects/project/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 44   [00:01:11.000] Project '/a/b/projects/project/tsconfig.json' (Configured)
Info 45   [00:01:12.000] 	Files (2)
	/a/lib/lib.d.ts
	/a/b/projects/project/src/index.ts


	../../../lib/lib.d.ts
	  Default library for target 'es3'
	src/index.ts
	  Matched by default include pattern '**/*'

Info 46   [00:01:13.000] -----------------------------------------------
Info 47   [00:01:14.000] Running: *ensureProjectForOpenFiles*
Info 48   [00:01:15.000] Before ensureProjectForOpenFiles:
Info 49   [00:01:16.000] Project '/a/b/projects/project/tsconfig.json' (Configured)
Info 49   [00:01:17.000] 	Files (2)

Info 49   [00:01:18.000] -----------------------------------------------
Info 49   [00:01:19.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 49   [00:01:20.000] 	Files (2)

Info 49   [00:01:21.000] -----------------------------------------------
Info 49   [00:01:22.000] Open files: 
Info 49   [00:01:23.000] 	FileName: /a/b/projects/project/src/index.ts ProjectRootPath: /a/b/projects/proj
Info 49   [00:01:24.000] 		Projects: /a/b/projects/project/tsconfig.json
Info 49   [00:01:25.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 50   [00:01:26.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 2 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 51   [00:01:27.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 52   [00:01:28.000] 	Files (0)



Info 53   [00:01:29.000] -----------------------------------------------
Info 54   [00:01:30.000] After ensureProjectForOpenFiles:
Info 55   [00:01:31.000] Project '/a/b/projects/project/tsconfig.json' (Configured)
Info 55   [00:01:32.000] 	Files (2)

Info 55   [00:01:33.000] -----------------------------------------------
Info 55   [00:01:34.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 55   [00:01:35.000] 	Files (0)

Info 55   [00:01:36.000] -----------------------------------------------
Info 55   [00:01:37.000] Open files: 
Info 55   [00:01:38.000] 	FileName: /a/b/projects/project/src/index.ts ProjectRootPath: /a/b/projects/proj
Info 55   [00:01:39.000] 		Projects: /a/b/projects/project/tsconfig.json
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

Info 55   [00:01:41.000] FileWatcher:: Triggered with /a/b/projects/project/tsconfig.json 2:: WatchInfo: /a/b/projects/project/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 56   [00:01:42.000] `remove Project::
Info 57   [00:01:43.000] Project '/a/b/projects/project/tsconfig.json' (Configured)
Info 58   [00:01:44.000] 	Files (2)
	/a/lib/lib.d.ts
	/a/b/projects/project/src/index.ts


	../../../lib/lib.d.ts
	  Default library for target 'es3'
	src/index.ts
	  Matched by default include pattern '**/*'

Info 59   [00:01:45.000] -----------------------------------------------
Info 60   [00:01:46.000] DirectoryWatcher:: Close:: WatchInfo: /a/b/projects/project 1 undefined Config: /a/b/projects/project/tsconfig.json WatchType: Wild card directory
Info 61   [00:01:47.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /a/b/projects/project 1 undefined Config: /a/b/projects/project/tsconfig.json WatchType: Wild card directory
Info 62   [00:01:48.000] FileWatcher:: Close:: WatchInfo: /a/b/projects/project/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 63   [00:01:49.000] DirectoryWatcher:: Close:: WatchInfo: /a/b/projects/project/node_modules/@types 1 undefined Project: /a/b/projects/project/tsconfig.json WatchType: Type roots
Info 64   [00:01:50.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /a/b/projects/project/node_modules/@types 1 undefined Project: /a/b/projects/project/tsconfig.json WatchType: Type roots
Info 65   [00:01:51.000] Search path: /a/b/projects/project/src
Info 66   [00:01:52.000] For info: /a/b/projects/project/src/index.ts :: No config files found.
Info 67   [00:01:53.000] Scheduled: *ensureProjectForOpenFiles*
Info 68   [00:01:54.000] Elapsed:: *ms FileWatcher:: Triggered with /a/b/projects/project/tsconfig.json 2:: WatchInfo: /a/b/projects/project/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Before running timeout callbacks
//// [/a/b/projects/project/tsconfig.json] deleted

PolledWatches::
/a/b/projects/project/src/node_modules/@types:
  {"pollingInterval":500}
/a/b/projects/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::

Info 69   [00:01:55.500] Running: *ensureProjectForOpenFiles*
Info 70   [00:01:56.500] Before ensureProjectForOpenFiles:
Info 71   [00:01:57.500] Project '/dev/null/inferredProject1*' (Inferred)
Info 71   [00:01:58.500] 	Files (0)

Info 71   [00:01:59.500] -----------------------------------------------
Info 71   [00:02:00.500] Open files: 
Info 71   [00:02:01.500] 	FileName: /a/b/projects/project/src/index.ts ProjectRootPath: /a/b/projects/proj
Info 71   [00:02:02.500] 		Projects: 
Info 71   [00:02:03.500] FileWatcher:: Added:: WatchInfo: /a/b/projects/project/src/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 72   [00:02:04.500] FileWatcher:: Added:: WatchInfo: /a/b/projects/project/src/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 73   [00:02:05.500] FileWatcher:: Added:: WatchInfo: /a/b/projects/project/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 74   [00:02:06.500] FileWatcher:: Added:: WatchInfo: /a/b/projects/project/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 75   [00:02:07.500] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 76   [00:02:08.500] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 3 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 77   [00:02:09.500] Project '/dev/null/inferredProject1*' (Inferred)
Info 78   [00:02:10.500] 	Files (2)
	/a/lib/lib.d.ts
	/a/b/projects/project/src/index.ts


	../../../../lib/lib.d.ts
	  Default library for target 'es5'
	index.ts
	  Root file specified for compilation

Info 79   [00:02:11.500] -----------------------------------------------
Info 80   [00:02:12.500] After ensureProjectForOpenFiles:
Info 81   [00:02:13.500] Project '/dev/null/inferredProject1*' (Inferred)
Info 81   [00:02:14.500] 	Files (2)

Info 81   [00:02:15.500] -----------------------------------------------
Info 81   [00:02:16.500] Open files: 
Info 81   [00:02:17.500] 	FileName: /a/b/projects/project/src/index.ts ProjectRootPath: /a/b/projects/proj
Info 81   [00:02:18.500] 		Projects: /dev/null/inferredProject1*
After running timeout callbacks

PolledWatches::
/a/b/projects/project/src/node_modules/@types:
  {"pollingInterval":500}
/a/b/projects/project/node_modules/@types:
  {"pollingInterval":500}
/a/b/projects/project/src/tsconfig.json:
  {"pollingInterval":2000}
/a/b/projects/project/src/jsconfig.json:
  {"pollingInterval":2000}
/a/b/projects/project/tsconfig.json:
  {"pollingInterval":2000}
/a/b/projects/project/jsconfig.json:
  {"pollingInterval":2000}

FsWatches::
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
