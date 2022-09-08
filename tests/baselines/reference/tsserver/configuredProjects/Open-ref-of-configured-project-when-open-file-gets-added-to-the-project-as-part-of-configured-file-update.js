Info 0    [00:00:19.000] Provided types map file "/typesMap.json" doesn't exist
Creating project service
//// [/a/b/src/file1.ts]
let x = 1;

//// [/a/b/src/file2.ts]
let y = 1;

//// [/a/b/file3.ts]
let z = 1;

//// [/a/file4.ts]
let z = 1;

//// [/a/b/tsconfig.json]
{"files":["src/file1.ts","file3.ts"]}


PolledWatches::

FsWatches::

FsWatchesRecursive::

Info 1    [00:00:20.000] Search path: /a/b/src
Info 2    [00:00:21.000] For info: /a/b/src/file1.ts :: Config file name: /a/b/tsconfig.json
Info 3    [00:00:22.000] Creating configuration project /a/b/tsconfig.json
Info 4    [00:00:23.000] FileWatcher:: Added:: WatchInfo: /a/b/tsconfig.json 2000 undefined Project: /a/b/tsconfig.json WatchType: Config file
Info 5    [00:00:24.000] Config: /a/b/tsconfig.json : {
 "rootNames": [
  "/a/b/src/file1.ts",
  "/a/b/file3.ts"
 ],
 "options": {
  "configFilePath": "/a/b/tsconfig.json"
 }
}
Info 6    [00:00:25.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 7    [00:00:26.000] FileWatcher:: Added:: WatchInfo: /a/b/file3.ts 500 undefined WatchType: Closed Script info
Info 8    [00:00:27.000] Starting updateGraphWorker: Project: /a/b/tsconfig.json
Info 9    [00:00:28.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /a/b/tsconfig.json WatchType: Missing file
Info 10   [00:00:29.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/tsconfig.json WatchType: Type roots
Info 11   [00:00:30.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/tsconfig.json WatchType: Type roots
Info 12   [00:00:31.000] Finishing updateGraphWorker: Project: /a/b/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 13   [00:00:32.000] Project '/a/b/tsconfig.json' (Configured)
Info 14   [00:00:33.000] 	Files (2)
	/a/b/src/file1.ts
	/a/b/file3.ts


	src/file1.ts
	  Part of 'files' list in tsconfig.json
	file3.ts
	  Part of 'files' list in tsconfig.json

Info 15   [00:00:34.000] -----------------------------------------------
Info 16   [00:00:35.000] Project '/a/b/tsconfig.json' (Configured)
Info 16   [00:00:36.000] 	Files (2)

Info 16   [00:00:37.000] -----------------------------------------------
Info 16   [00:00:38.000] Open files: 
Info 16   [00:00:39.000] 	FileName: /a/b/src/file1.ts ProjectRootPath: undefined
Info 16   [00:00:40.000] 		Projects: /a/b/tsconfig.json
Info 16   [00:00:41.000] Search path: /a/b/src
Info 17   [00:00:42.000] For info: /a/b/src/file2.ts :: Config file name: /a/b/tsconfig.json
Info 18   [00:00:43.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 19   [00:00:44.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 20   [00:00:45.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /dev/null/inferredProject1* WatchType: Missing file
Info 21   [00:00:46.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/src/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 22   [00:00:47.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/src/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 23   [00:00:48.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 24   [00:00:49.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 25   [00:00:50.000] 	Files (1)
	/a/b/src/file2.ts


	file2.ts
	  Root file specified for compilation

Info 26   [00:00:51.000] -----------------------------------------------
Info 27   [00:00:52.000] Project '/a/b/tsconfig.json' (Configured)
Info 27   [00:00:53.000] 	Files (2)

Info 27   [00:00:54.000] -----------------------------------------------
Info 27   [00:00:55.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 27   [00:00:56.000] 	Files (1)

Info 27   [00:00:57.000] -----------------------------------------------
Info 27   [00:00:58.000] Open files: 
Info 27   [00:00:59.000] 	FileName: /a/b/src/file1.ts ProjectRootPath: undefined
Info 27   [00:01:00.000] 		Projects: /a/b/tsconfig.json
Info 27   [00:01:01.000] 	FileName: /a/b/src/file2.ts ProjectRootPath: undefined
Info 27   [00:01:02.000] 		Projects: /dev/null/inferredProject1*
Info 27   [00:01:03.000] FileWatcher:: Close:: WatchInfo: /a/b/file3.ts 500 undefined WatchType: Closed Script info
Info 28   [00:01:04.000] Search path: /a/b
Info 29   [00:01:05.000] For info: /a/b/file3.ts :: Config file name: /a/b/tsconfig.json
Info 30   [00:01:06.000] Project '/a/b/tsconfig.json' (Configured)
Info 30   [00:01:07.000] 	Files (2)

Info 30   [00:01:08.000] -----------------------------------------------
Info 30   [00:01:09.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 30   [00:01:10.000] 	Files (1)

Info 30   [00:01:11.000] -----------------------------------------------
Info 30   [00:01:12.000] Open files: 
Info 30   [00:01:13.000] 	FileName: /a/b/src/file1.ts ProjectRootPath: undefined
Info 30   [00:01:14.000] 		Projects: /a/b/tsconfig.json
Info 30   [00:01:15.000] 	FileName: /a/b/src/file2.ts ProjectRootPath: undefined
Info 30   [00:01:16.000] 		Projects: /dev/null/inferredProject1*
Info 30   [00:01:17.000] 	FileName: /a/b/file3.ts ProjectRootPath: undefined
Info 30   [00:01:18.000] 		Projects: /a/b/tsconfig.json
Info 30   [00:01:19.000] Search path: /a
Info 31   [00:01:20.000] For info: /a/file4.ts :: No config files found.
Info 32   [00:01:21.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 33   [00:01:22.000] Starting updateGraphWorker: Project: /dev/null/inferredProject2*
Info 34   [00:01:23.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /dev/null/inferredProject2* WatchType: Missing file
Info 35   [00:01:24.000] DirectoryWatcher:: Added:: WatchInfo: /a/node_modules/@types 1 undefined Project: /dev/null/inferredProject2* WatchType: Type roots
Info 36   [00:01:25.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/node_modules/@types 1 undefined Project: /dev/null/inferredProject2* WatchType: Type roots
Info 37   [00:01:26.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject2* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 38   [00:01:27.000] Project '/dev/null/inferredProject2*' (Inferred)
Info 39   [00:01:28.000] 	Files (1)
	/a/file4.ts


	file4.ts
	  Root file specified for compilation

Info 40   [00:01:29.000] -----------------------------------------------
Info 41   [00:01:30.000] Project '/a/b/tsconfig.json' (Configured)
Info 41   [00:01:31.000] 	Files (2)

Info 41   [00:01:32.000] -----------------------------------------------
Info 41   [00:01:33.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 41   [00:01:34.000] 	Files (1)

Info 41   [00:01:35.000] -----------------------------------------------
Info 41   [00:01:36.000] Project '/dev/null/inferredProject2*' (Inferred)
Info 41   [00:01:37.000] 	Files (1)

Info 41   [00:01:38.000] -----------------------------------------------
Info 41   [00:01:39.000] Open files: 
Info 41   [00:01:40.000] 	FileName: /a/b/src/file1.ts ProjectRootPath: undefined
Info 41   [00:01:41.000] 		Projects: /a/b/tsconfig.json
Info 41   [00:01:42.000] 	FileName: /a/b/src/file2.ts ProjectRootPath: undefined
Info 41   [00:01:43.000] 		Projects: /dev/null/inferredProject1*
Info 41   [00:01:44.000] 	FileName: /a/b/file3.ts ProjectRootPath: undefined
Info 41   [00:01:45.000] 		Projects: /a/b/tsconfig.json
Info 41   [00:01:46.000] 	FileName: /a/file4.ts ProjectRootPath: undefined
Info 41   [00:01:47.000] 		Projects: /dev/null/inferredProject2*
Info 41   [00:01:51.000] FileWatcher:: Triggered with /a/b/tsconfig.json 1:: WatchInfo: /a/b/tsconfig.json 2000 undefined Project: /a/b/tsconfig.json WatchType: Config file
Info 42   [00:01:52.000] Scheduled: /a/b/tsconfig.json
Info 43   [00:01:53.000] Search path: /a/b/src
Info 44   [00:01:54.000] For info: /a/b/src/file2.ts :: Config file name: /a/b/tsconfig.json
Info 45   [00:01:55.000] Scheduled: /a/b/tsconfig.json, Cancelled earlier one
Info 46   [00:01:56.000] Scheduled: *ensureProjectForOpenFiles*
Info 47   [00:01:57.000] Elapsed:: *ms FileWatcher:: Triggered with /a/b/tsconfig.json 1:: WatchInfo: /a/b/tsconfig.json 2000 undefined Project: /a/b/tsconfig.json WatchType: Config file
Before running timeout callbacks
//// [/a/b/tsconfig.json]
{}


PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/a/b/node_modules/@types:
  {"pollingInterval":500}
/a/b/src/node_modules/@types:
  {"pollingInterval":500}
/a/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/b/tsconfig.json:
  {}

FsWatchesRecursive::

Info 48   [00:01:58.000] Running: /a/b/tsconfig.json
Info 49   [00:01:59.000] Reloading configured project /a/b/tsconfig.json
Info 50   [00:02:00.000] Config: /a/b/tsconfig.json : {
 "rootNames": [
  "/a/b/file3.ts",
  "/a/b/src/file1.ts",
  "/a/b/src/file2.ts"
 ],
 "options": {
  "configFilePath": "/a/b/tsconfig.json"
 }
}
Info 51   [00:02:01.000] DirectoryWatcher:: Added:: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Info 52   [00:02:02.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Info 53   [00:02:03.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 54   [00:02:04.000] Starting updateGraphWorker: Project: /a/b/tsconfig.json
Info 55   [00:02:05.000] Finishing updateGraphWorker: Project: /a/b/tsconfig.json Version: 2 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 56   [00:02:06.000] Project '/a/b/tsconfig.json' (Configured)
Info 57   [00:02:07.000] 	Files (3)
	/a/b/src/file1.ts
	/a/b/file3.ts
	/a/b/src/file2.ts


	src/file1.ts
	  Matched by default include pattern '**/*'
	file3.ts
	  Matched by default include pattern '**/*'
	src/file2.ts
	  Matched by default include pattern '**/*'

Info 58   [00:02:08.000] -----------------------------------------------
Info 59   [00:02:09.000] Running: *ensureProjectForOpenFiles*
Info 60   [00:02:10.000] Before ensureProjectForOpenFiles:
Info 61   [00:02:11.000] Project '/a/b/tsconfig.json' (Configured)
Info 61   [00:02:12.000] 	Files (3)

Info 61   [00:02:13.000] -----------------------------------------------
Info 61   [00:02:14.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 61   [00:02:15.000] 	Files (1)

Info 61   [00:02:16.000] -----------------------------------------------
Info 61   [00:02:17.000] Project '/dev/null/inferredProject2*' (Inferred)
Info 61   [00:02:18.000] 	Files (1)

Info 61   [00:02:19.000] -----------------------------------------------
Info 61   [00:02:20.000] Open files: 
Info 61   [00:02:21.000] 	FileName: /a/b/src/file1.ts ProjectRootPath: undefined
Info 61   [00:02:22.000] 		Projects: /a/b/tsconfig.json
Info 61   [00:02:23.000] 	FileName: /a/b/src/file2.ts ProjectRootPath: undefined
Info 61   [00:02:24.000] 		Projects: /a/b/tsconfig.json
Info 61   [00:02:25.000] 	FileName: /a/b/file3.ts ProjectRootPath: undefined
Info 61   [00:02:26.000] 		Projects: /a/b/tsconfig.json
Info 61   [00:02:27.000] 	FileName: /a/file4.ts ProjectRootPath: undefined
Info 61   [00:02:28.000] 		Projects: /dev/null/inferredProject2*
Info 61   [00:02:29.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 62   [00:02:30.000] FileWatcher:: Close:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /dev/null/inferredProject1* WatchType: Missing file
Info 63   [00:02:31.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 2 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 64   [00:02:32.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 65   [00:02:33.000] 	Files (0)



Info 66   [00:02:34.000] -----------------------------------------------
Info 67   [00:02:35.000] After ensureProjectForOpenFiles:
Info 68   [00:02:36.000] Project '/a/b/tsconfig.json' (Configured)
Info 68   [00:02:37.000] 	Files (3)

Info 68   [00:02:38.000] -----------------------------------------------
Info 68   [00:02:39.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 68   [00:02:40.000] 	Files (0)

Info 68   [00:02:41.000] -----------------------------------------------
Info 68   [00:02:42.000] Project '/dev/null/inferredProject2*' (Inferred)
Info 68   [00:02:43.000] 	Files (1)

Info 68   [00:02:44.000] -----------------------------------------------
Info 68   [00:02:45.000] Open files: 
Info 68   [00:02:46.000] 	FileName: /a/b/src/file1.ts ProjectRootPath: undefined
Info 68   [00:02:47.000] 		Projects: /a/b/tsconfig.json
Info 68   [00:02:48.000] 	FileName: /a/b/src/file2.ts ProjectRootPath: undefined
Info 68   [00:02:49.000] 		Projects: /a/b/tsconfig.json
Info 68   [00:02:50.000] 	FileName: /a/b/file3.ts ProjectRootPath: undefined
Info 68   [00:02:51.000] 		Projects: /a/b/tsconfig.json
Info 68   [00:02:52.000] 	FileName: /a/file4.ts ProjectRootPath: undefined
Info 68   [00:02:53.000] 		Projects: /dev/null/inferredProject2*
After running timeout callbacks

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/a/b/node_modules/@types:
  {"pollingInterval":500}
/a/b/src/node_modules/@types:
  {"pollingInterval":500}
/a/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/b/tsconfig.json:
  {}

FsWatchesRecursive::
/a/b:
  {}

Info 68   [00:02:54.000] FileWatcher:: Added:: WatchInfo: /a/b/src/file1.ts 500 undefined WatchType: Closed Script info
Info 69   [00:02:55.000] Project '/a/b/tsconfig.json' (Configured)
Info 69   [00:02:56.000] 	Files (3)

Info 69   [00:02:57.000] -----------------------------------------------
Info 69   [00:02:58.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 69   [00:02:59.000] 	Files (0)

Info 69   [00:03:00.000] -----------------------------------------------
Info 69   [00:03:01.000] Project '/dev/null/inferredProject2*' (Inferred)
Info 69   [00:03:02.000] 	Files (1)

Info 69   [00:03:03.000] -----------------------------------------------
Info 69   [00:03:04.000] Open files: 
Info 69   [00:03:05.000] 	FileName: /a/b/src/file2.ts ProjectRootPath: undefined
Info 69   [00:03:06.000] 		Projects: /a/b/tsconfig.json
Info 69   [00:03:07.000] 	FileName: /a/b/file3.ts ProjectRootPath: undefined
Info 69   [00:03:08.000] 		Projects: /a/b/tsconfig.json
Info 69   [00:03:09.000] 	FileName: /a/file4.ts ProjectRootPath: undefined
Info 69   [00:03:10.000] 		Projects: /dev/null/inferredProject2*
Info 69   [00:03:11.000] FileWatcher:: Added:: WatchInfo: /a/b/src/file2.ts 500 undefined WatchType: Closed Script info
Info 70   [00:03:12.000] Project '/a/b/tsconfig.json' (Configured)
Info 70   [00:03:13.000] 	Files (3)

Info 70   [00:03:14.000] -----------------------------------------------
Info 70   [00:03:15.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 70   [00:03:16.000] 	Files (0)

Info 70   [00:03:17.000] -----------------------------------------------
Info 70   [00:03:18.000] Project '/dev/null/inferredProject2*' (Inferred)
Info 70   [00:03:19.000] 	Files (1)

Info 70   [00:03:20.000] -----------------------------------------------
Info 70   [00:03:21.000] Open files: 
Info 70   [00:03:22.000] 	FileName: /a/b/file3.ts ProjectRootPath: undefined
Info 70   [00:03:23.000] 		Projects: /a/b/tsconfig.json
Info 70   [00:03:24.000] 	FileName: /a/file4.ts ProjectRootPath: undefined
Info 70   [00:03:25.000] 		Projects: /dev/null/inferredProject2*
Info 70   [00:03:26.000] FileWatcher:: Added:: WatchInfo: /a/file4.ts 500 undefined WatchType: Closed Script info
Info 71   [00:03:27.000] Project '/a/b/tsconfig.json' (Configured)
Info 71   [00:03:28.000] 	Files (3)

Info 71   [00:03:29.000] -----------------------------------------------
Info 71   [00:03:30.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 71   [00:03:31.000] 	Files (0)

Info 71   [00:03:32.000] -----------------------------------------------
Info 71   [00:03:33.000] Project '/dev/null/inferredProject2*' (Inferred)
Info 71   [00:03:34.000] 	Files (1)

Info 71   [00:03:35.000] -----------------------------------------------
Info 71   [00:03:36.000] Open files: 
Info 71   [00:03:37.000] 	FileName: /a/b/file3.ts ProjectRootPath: undefined
Info 71   [00:03:38.000] 		Projects: /a/b/tsconfig.json
Info 71   [00:03:39.000] FileWatcher:: Close:: WatchInfo: /a/file4.ts 500 undefined WatchType: Closed Script info
Info 72   [00:03:40.000] Search path: /a
Info 73   [00:03:41.000] For info: /a/file4.ts :: No config files found.
Info 74   [00:03:42.000] Starting updateGraphWorker: Project: /dev/null/inferredProject2*
Info 75   [00:03:43.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject2* Version: 2 structureChanged: false structureIsReused:: Not Elapsed:: *ms
Info 76   [00:03:44.000] Project '/dev/null/inferredProject2*' (Inferred)
Info 77   [00:03:45.000] 	Files (1)
	/a/file4.ts


	file4.ts
	  Root file specified for compilation

Info 78   [00:03:46.000] -----------------------------------------------
Info 79   [00:03:47.000] `remove Project::
Info 80   [00:03:48.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 81   [00:03:49.000] 	Files (0)



Info 82   [00:03:50.000] -----------------------------------------------
Info 83   [00:03:51.000] DirectoryWatcher:: Close:: WatchInfo: /a/b/src/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 84   [00:03:52.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /a/b/src/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 85   [00:03:53.000] Project '/a/b/tsconfig.json' (Configured)
Info 85   [00:03:54.000] 	Files (3)

Info 85   [00:03:55.000] -----------------------------------------------
Info 85   [00:03:56.000] Project '/dev/null/inferredProject2*' (Inferred)
Info 85   [00:03:57.000] 	Files (1)

Info 85   [00:03:58.000] -----------------------------------------------
Info 85   [00:03:59.000] Open files: 
Info 85   [00:04:00.000] 	FileName: /a/b/file3.ts ProjectRootPath: undefined
Info 85   [00:04:01.000] 		Projects: /a/b/tsconfig.json
Info 85   [00:04:02.000] 	FileName: /a/file4.ts ProjectRootPath: undefined
Info 85   [00:04:03.000] 		Projects: /dev/null/inferredProject2*
Info 85   [00:04:04.000] FileWatcher:: Added:: WatchInfo: /a/b/file3.ts 500 undefined WatchType: Closed Script info
Info 86   [00:04:05.000] Project '/a/b/tsconfig.json' (Configured)
Info 86   [00:04:06.000] 	Files (3)

Info 86   [00:04:07.000] -----------------------------------------------
Info 86   [00:04:08.000] Project '/dev/null/inferredProject2*' (Inferred)
Info 86   [00:04:09.000] 	Files (1)

Info 86   [00:04:10.000] -----------------------------------------------
Info 86   [00:04:11.000] Open files: 
Info 86   [00:04:12.000] 	FileName: /a/file4.ts ProjectRootPath: undefined
Info 86   [00:04:13.000] 		Projects: /dev/null/inferredProject2*
File5 written
//// [/file5.ts]
let zz = 1;


PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/a/b/node_modules/@types:
  {"pollingInterval":500}
/a/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/b/tsconfig.json:
  {}
/a/b/src/file1.ts:
  {}
/a/b/src/file2.ts:
  {}
/a/b/file3.ts:
  {}

FsWatchesRecursive::
/a/b:
  {}

Info 86   [00:04:16.000] Search path: /
Info 87   [00:04:17.000] For info: /file5.ts :: No config files found.
Info 88   [00:04:18.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 89   [00:04:19.000] Starting updateGraphWorker: Project: /dev/null/inferredProject3*
Info 90   [00:04:20.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /dev/null/inferredProject3* WatchType: Missing file
Info 91   [00:04:21.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject3* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 92   [00:04:22.000] Project '/dev/null/inferredProject3*' (Inferred)
Info 93   [00:04:23.000] 	Files (1)
	/file5.ts


	file5.ts
	  Root file specified for compilation

Info 94   [00:04:24.000] -----------------------------------------------
Info 95   [00:04:25.000] `remove Project::
Info 96   [00:04:26.000] Project '/a/b/tsconfig.json' (Configured)
Info 97   [00:04:27.000] 	Files (3)
	/a/b/src/file1.ts
	/a/b/file3.ts
	/a/b/src/file2.ts


	src/file1.ts
	  Matched by default include pattern '**/*'
	file3.ts
	  Matched by default include pattern '**/*'
	src/file2.ts
	  Matched by default include pattern '**/*'

Info 98   [00:04:28.000] -----------------------------------------------
Info 99   [00:04:29.000] DirectoryWatcher:: Close:: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Info 100  [00:04:30.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Info 101  [00:04:31.000] FileWatcher:: Close:: WatchInfo: /a/b/tsconfig.json 2000 undefined Project: /a/b/tsconfig.json WatchType: Config file
Info 102  [00:04:32.000] DirectoryWatcher:: Close:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/tsconfig.json WatchType: Type roots
Info 103  [00:04:33.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/tsconfig.json WatchType: Type roots
Info 104  [00:04:34.000] FileWatcher:: Close:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /a/b/tsconfig.json WatchType: Missing file
Info 105  [00:04:35.000] FileWatcher:: Close:: WatchInfo: /a/b/src/file1.ts 500 undefined WatchType: Closed Script info
Info 106  [00:04:36.000] FileWatcher:: Close:: WatchInfo: /a/b/file3.ts 500 undefined WatchType: Closed Script info
Info 107  [00:04:37.000] FileWatcher:: Close:: WatchInfo: /a/b/src/file2.ts 500 undefined WatchType: Closed Script info
Info 108  [00:04:38.000] Project '/dev/null/inferredProject2*' (Inferred)
Info 108  [00:04:39.000] 	Files (1)

Info 108  [00:04:40.000] -----------------------------------------------
Info 108  [00:04:41.000] Project '/dev/null/inferredProject3*' (Inferred)
Info 108  [00:04:42.000] 	Files (1)

Info 108  [00:04:43.000] -----------------------------------------------
Info 108  [00:04:44.000] Open files: 
Info 108  [00:04:45.000] 	FileName: /a/file4.ts ProjectRootPath: undefined
Info 108  [00:04:46.000] 		Projects: /dev/null/inferredProject2*
Info 108  [00:04:47.000] 	FileName: /file5.ts ProjectRootPath: undefined
Info 108  [00:04:48.000] 		Projects: /dev/null/inferredProject3*