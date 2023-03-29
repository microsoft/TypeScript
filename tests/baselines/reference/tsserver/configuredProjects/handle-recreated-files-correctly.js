currentDirectory:: / useCaseSensitiveFileNames: false
Info 0    [00:00:13.000] Provided types map file "/typesMap.json" doesn't exist
Creating project service
//// [/a/b/commonFile1.ts]
let x = 1

//// [/a/b/commonFile2.ts]
let y = 1

//// [/a/b/tsconfig.json]
{}


Info 1    [00:00:14.000] Search path: /a/b
Info 2    [00:00:15.000] For info: /a/b/commonFile1.ts :: Config file name: /a/b/tsconfig.json
Info 3    [00:00:16.000] Creating configuration project /a/b/tsconfig.json
Info 4    [00:00:17.000] FileWatcher:: Added:: WatchInfo: /a/b/tsconfig.json 2000 undefined Project: /a/b/tsconfig.json WatchType: Config file
Info 5    [00:00:18.000] Config: /a/b/tsconfig.json : {
 "rootNames": [
  "/a/b/commonFile1.ts",
  "/a/b/commonFile2.ts"
 ],
 "options": {
  "configFilePath": "/a/b/tsconfig.json"
 }
}
Info 6    [00:00:19.000] DirectoryWatcher:: Added:: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Info 7    [00:00:20.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Info 8    [00:00:21.000] FileWatcher:: Added:: WatchInfo: /a/b/commonFile2.ts 500 undefined WatchType: Closed Script info
Info 9    [00:00:22.000] Starting updateGraphWorker: Project: /a/b/tsconfig.json
Info 10   [00:00:23.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /a/b/tsconfig.json WatchType: Missing file
Info 11   [00:00:24.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/tsconfig.json WatchType: Type roots
Info 12   [00:00:25.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/tsconfig.json WatchType: Type roots
Info 13   [00:00:26.000] Finishing updateGraphWorker: Project: /a/b/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 14   [00:00:27.000] Project '/a/b/tsconfig.json' (Configured)
Info 15   [00:00:28.000] 	Files (2)
	/a/b/commonFile1.ts SVC-1-0 "let x = 1"
	/a/b/commonFile2.ts Text-1 "let y = 1"


	commonFile1.ts
	  Matched by default include pattern '**/*'
	commonFile2.ts
	  Matched by default include pattern '**/*'

Info 16   [00:00:29.000] -----------------------------------------------
Info 17   [00:00:30.000] Project '/a/b/tsconfig.json' (Configured)
Info 17   [00:00:31.000] 	Files (2)

Info 17   [00:00:32.000] -----------------------------------------------
Info 17   [00:00:33.000] Open files: 
Info 17   [00:00:34.000] 	FileName: /a/b/commonFile1.ts ProjectRootPath: undefined
Info 17   [00:00:35.000] 		Projects: /a/b/tsconfig.json
Info 17   [00:00:37.000] FileWatcher:: Triggered with /a/b/commonFile2.ts 2:: WatchInfo: /a/b/commonFile2.ts 500 undefined WatchType: Closed Script info
Info 18   [00:00:38.000] FileWatcher:: Close:: WatchInfo: /a/b/commonFile2.ts 500 undefined WatchType: Closed Script info
Info 19   [00:00:39.000] Scheduled: /a/b/tsconfig.json
Info 20   [00:00:40.000] Scheduled: *ensureProjectForOpenFiles*
Info 21   [00:00:41.000] Elapsed:: *ms FileWatcher:: Triggered with /a/b/commonFile2.ts 2:: WatchInfo: /a/b/commonFile2.ts 500 undefined WatchType: Closed Script info
Info 22   [00:00:42.000] DirectoryWatcher:: Triggered with /a/b/commonFile2.ts :: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Info 23   [00:00:43.000] Scheduled: /a/b/tsconfig.json, Cancelled earlier one
Info 24   [00:00:44.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 25   [00:00:45.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /a/b/commonFile2.ts :: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Before running Timeout callback:: count: 2
3: /a/b/tsconfig.json
4: *ensureProjectForOpenFiles*
//// [/a/b/commonFile2.ts] deleted

PolledWatches::
/a/lib/lib.d.ts: *new*
  {"pollingInterval":500}
/a/b/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/a/b/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/a/b: *new*
  {}

Info 26   [00:00:46.000] Running: /a/b/tsconfig.json
Info 27   [00:00:47.000] Starting updateGraphWorker: Project: /a/b/tsconfig.json
Info 28   [00:00:48.000] Finishing updateGraphWorker: Project: /a/b/tsconfig.json Version: 2 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 29   [00:00:49.000] Project '/a/b/tsconfig.json' (Configured)
Info 30   [00:00:50.000] 	Files (1)
	/a/b/commonFile1.ts SVC-1-0 "let x = 1"


	commonFile1.ts
	  Matched by default include pattern '**/*'

Info 31   [00:00:51.000] -----------------------------------------------
Info 32   [00:00:52.000] Running: *ensureProjectForOpenFiles*
Info 33   [00:00:53.000] Before ensureProjectForOpenFiles:
Info 34   [00:00:54.000] Project '/a/b/tsconfig.json' (Configured)
Info 34   [00:00:55.000] 	Files (1)

Info 34   [00:00:56.000] -----------------------------------------------
Info 34   [00:00:57.000] Open files: 
Info 34   [00:00:58.000] 	FileName: /a/b/commonFile1.ts ProjectRootPath: undefined
Info 34   [00:00:59.000] 		Projects: /a/b/tsconfig.json
Info 34   [00:01:00.000] After ensureProjectForOpenFiles:
Info 35   [00:01:01.000] Project '/a/b/tsconfig.json' (Configured)
Info 35   [00:01:02.000] 	Files (1)

Info 35   [00:01:03.000] -----------------------------------------------
Info 35   [00:01:04.000] Open files: 
Info 35   [00:01:05.000] 	FileName: /a/b/commonFile1.ts ProjectRootPath: undefined
Info 35   [00:01:06.000] 		Projects: /a/b/tsconfig.json
After running Timeout callback:: count: 0

Info 35   [00:01:09.000] DirectoryWatcher:: Triggered with /a/b/commonFile2.ts :: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Info 36   [00:01:10.000] Scheduled: /a/b/tsconfig.json
Info 37   [00:01:11.000] Scheduled: *ensureProjectForOpenFiles*
Info 38   [00:01:12.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /a/b/commonFile2.ts :: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Before running Timeout callback:: count: 2
5: /a/b/tsconfig.json
6: *ensureProjectForOpenFiles*
//// [/a/b/commonFile2.ts]
let y = 1


Info 39   [00:01:13.000] Running: /a/b/tsconfig.json
Info 40   [00:01:14.000] FileWatcher:: Added:: WatchInfo: /a/b/commonFile2.ts 500 undefined WatchType: Closed Script info
Info 41   [00:01:15.000] Starting updateGraphWorker: Project: /a/b/tsconfig.json
Info 42   [00:01:16.000] Finishing updateGraphWorker: Project: /a/b/tsconfig.json Version: 3 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 43   [00:01:17.000] Project '/a/b/tsconfig.json' (Configured)
Info 44   [00:01:18.000] 	Files (2)
	/a/b/commonFile1.ts SVC-1-0 "let x = 1"
	/a/b/commonFile2.ts Text-2 "let y = 1"


	commonFile1.ts
	  Matched by default include pattern '**/*'
	commonFile2.ts
	  Matched by default include pattern '**/*'

Info 45   [00:01:19.000] -----------------------------------------------
Info 46   [00:01:20.000] Running: *ensureProjectForOpenFiles*
Info 47   [00:01:21.000] Before ensureProjectForOpenFiles:
Info 48   [00:01:22.000] Project '/a/b/tsconfig.json' (Configured)
Info 48   [00:01:23.000] 	Files (2)

Info 48   [00:01:24.000] -----------------------------------------------
Info 48   [00:01:25.000] Open files: 
Info 48   [00:01:26.000] 	FileName: /a/b/commonFile1.ts ProjectRootPath: undefined
Info 48   [00:01:27.000] 		Projects: /a/b/tsconfig.json
Info 48   [00:01:28.000] After ensureProjectForOpenFiles:
Info 49   [00:01:29.000] Project '/a/b/tsconfig.json' (Configured)
Info 49   [00:01:30.000] 	Files (2)

Info 49   [00:01:31.000] -----------------------------------------------
Info 49   [00:01:32.000] Open files: 
Info 49   [00:01:33.000] 	FileName: /a/b/commonFile1.ts ProjectRootPath: undefined
Info 49   [00:01:34.000] 		Projects: /a/b/tsconfig.json
After running Timeout callback:: count: 0

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/a/b/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/b/tsconfig.json:
  {}
/a/b/commonfile2.ts: *new*
  {}

FsWatchesRecursive::
/a/b:
  {}
