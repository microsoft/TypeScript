Info 0    [16:00:21.000] Provided types map file "/typesMap.json" doesn't exist
Info 1    [16:00:22.000] Search path: /a/username/project/src
Info 2    [16:00:23.000] For info: /a/username/project/src/index.ts :: Config file name: /a/username/project/tsconfig.json
Info 3    [16:00:24.000] Creating configuration project /a/username/project/tsconfig.json
Info 4    [16:00:25.000] FileWatcher:: Added:: WatchInfo: /a/username/project/tsconfig.json 2000 undefined Project: /a/username/project/tsconfig.json WatchType: Config file
Info 5    [16:00:26.000] Config: /a/username/project/tsconfig.json : {
 "rootNames": [
  "/a/username/project/src/file1.ts",
  "/a/username/project/src/index.ts"
 ],
 "options": {
  "configFilePath": "/a/username/project/tsconfig.json"
 },
 "watchOptions": {
  "synchronousWatchDirectory": true
 }
}
Info 6    [16:00:27.000] FileWatcher:: Close:: WatchInfo: /a/username/project/tsconfig.json 2000 undefined Project: /a/username/project/tsconfig.json WatchType: Config file
Info 7    [16:00:28.000] FileWatcher:: Added:: WatchInfo: /a/username/project/tsconfig.json 2000 {"synchronousWatchDirectory":true} Project: /a/username/project/tsconfig.json WatchType: Config file
Info 8    [16:00:29.000] DirectoryWatcher:: Added:: WatchInfo: /a/username/project 1 {"synchronousWatchDirectory":true} Config: /a/username/project/tsconfig.json WatchType: Wild card directory
Info 9    [16:00:30.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/username/project 1 {"synchronousWatchDirectory":true} Config: /a/username/project/tsconfig.json WatchType: Wild card directory
Info 10   [16:00:31.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 11   [16:00:32.000] FileWatcher:: Added:: WatchInfo: /a/username/project/src/file1.ts 500 undefined WatchType: Closed Script info
Info 12   [16:00:33.000] Starting updateGraphWorker: Project: /a/username/project/tsconfig.json
Info 13   [16:00:34.000] DirectoryWatcher:: Added:: WatchInfo: /a/username/project/src 1 {"synchronousWatchDirectory":true} Project: /a/username/project/tsconfig.json WatchType: Failed Lookup Locations
Info 14   [16:00:35.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/username/project/src 1 {"synchronousWatchDirectory":true} Project: /a/username/project/tsconfig.json WatchType: Failed Lookup Locations
Info 15   [16:00:36.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 16   [16:00:37.000] DirectoryWatcher:: Added:: WatchInfo: /a/username/project/node_modules/@types 1 {"synchronousWatchDirectory":true} Project: /a/username/project/tsconfig.json WatchType: Type roots
Info 17   [16:00:38.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/username/project/node_modules/@types 1 {"synchronousWatchDirectory":true} Project: /a/username/project/tsconfig.json WatchType: Type roots
Info 18   [16:00:39.000] Finishing updateGraphWorker: Project: /a/username/project/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 19   [16:00:40.000] Project '/a/username/project/tsconfig.json' (Configured)
Info 20   [16:00:41.000] 	Files (3)
	/a/lib/lib.d.ts
	/a/username/project/src/file1.ts
	/a/username/project/src/index.ts


	../../lib/lib.d.ts
	  Default library for target 'es3'
	src/file1.ts
	  Matched by default include pattern '**/*'
	src/index.ts
	  Matched by default include pattern '**/*'
	  Imported via "./" from file 'src/index.ts'

Info 21   [16:00:42.000] -----------------------------------------------
Info 22   [16:00:43.000] Project '/a/username/project/tsconfig.json' (Configured)
Info 22   [16:00:44.000] 	Files (3)

Info 22   [16:00:45.000] -----------------------------------------------
Info 22   [16:00:46.000] Open files: 
Info 22   [16:00:47.000] 	FileName: /a/username/project/src/index.ts ProjectRootPath: undefined
Info 22   [16:00:48.000] 		Projects: /a/username/project/tsconfig.json
Info 22   [16:00:49.000] Completion Entries:: ["file1"]
Info 23   [16:00:50.000] PolledWatches::
Info 24   [16:00:51.000] /a/username/project/node_modules/@types:
Info 25   [16:00:52.000]   {"pollingInterval":500}
Info 26   [16:00:53.000] 
Info 27   [16:00:54.000] FsWatches::
Info 28   [16:00:55.000] /a/username/project/tsconfig.json:
Info 29   [16:00:56.000]   {}
Info 30   [16:00:57.000] /a/username/project:
Info 31   [16:00:58.000]   {}
Info 32   [16:00:59.000] /a/username/project/src:
Info 33   [16:01:00.000]   {}
Info 34   [16:01:01.000] /a/username/project/src/file1.ts:
Info 35   [16:01:02.000]   {}
Info 36   [16:01:03.000] /a/lib/lib.d.ts:
Info 37   [16:01:04.000]   {}
Info 38   [16:01:05.000] 
Info 39   [16:01:06.000] FsWatchesRecursive::
Info 40   [16:01:07.000] 
Info 41   [16:01:10.000] DirectoryWatcher:: Triggered with /a/username/project/src/file2.ts :: WatchInfo: /a/username/project 1 {"synchronousWatchDirectory":true} Config: /a/username/project/tsconfig.json WatchType: Wild card directory
Info 42   [16:01:11.000] Scheduled: /a/username/project/tsconfig.json
Info 43   [16:01:12.000] Scheduled: *ensureProjectForOpenFiles*
Info 44   [16:01:13.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /a/username/project/src/file2.ts :: WatchInfo: /a/username/project 1 {"synchronousWatchDirectory":true} Config: /a/username/project/tsconfig.json WatchType: Wild card directory
Info 45   [16:01:14.000] DirectoryWatcher:: Triggered with /a/username/project/src/file2.ts :: WatchInfo: /a/username/project/src 1 {"synchronousWatchDirectory":true} Project: /a/username/project/tsconfig.json WatchType: Failed Lookup Locations
Info 46   [16:01:15.000] Scheduled: /a/username/project/tsconfig.jsonFailedLookupInvalidation
Info 47   [16:01:16.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /a/username/project/src/file2.ts :: WatchInfo: /a/username/project/src 1 {"synchronousWatchDirectory":true} Project: /a/username/project/tsconfig.json WatchType: Failed Lookup Locations
Info 48   [16:01:17.000] Running: /a/username/project/tsconfig.json
Info 49   [16:01:18.000] FileWatcher:: Added:: WatchInfo: /a/username/project/src/file2.ts 500 undefined WatchType: Closed Script info
Info 50   [16:01:19.000] Starting updateGraphWorker: Project: /a/username/project/tsconfig.json
Info 51   [16:01:20.000] Finishing updateGraphWorker: Project: /a/username/project/tsconfig.json Version: 2 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 52   [16:01:21.000] Project '/a/username/project/tsconfig.json' (Configured)
Info 53   [16:01:22.000] 	Files (4)
	/a/lib/lib.d.ts
	/a/username/project/src/file1.ts
	/a/username/project/src/index.ts
	/a/username/project/src/file2.ts


	../../lib/lib.d.ts
	  Default library for target 'es3'
	src/file1.ts
	  Matched by default include pattern '**/*'
	src/index.ts
	  Matched by default include pattern '**/*'
	  Imported via "./" from file 'src/index.ts'
	src/file2.ts
	  Matched by default include pattern '**/*'

Info 54   [16:01:23.000] -----------------------------------------------
Info 55   [16:01:24.000] Running: *ensureProjectForOpenFiles*
Info 56   [16:01:25.000] Before ensureProjectForOpenFiles:
Info 57   [16:01:26.000] Project '/a/username/project/tsconfig.json' (Configured)
Info 57   [16:01:27.000] 	Files (4)

Info 57   [16:01:28.000] -----------------------------------------------
Info 57   [16:01:29.000] Open files: 
Info 57   [16:01:30.000] 	FileName: /a/username/project/src/index.ts ProjectRootPath: undefined
Info 57   [16:01:31.000] 		Projects: /a/username/project/tsconfig.json
Info 57   [16:01:32.000] After ensureProjectForOpenFiles:
Info 58   [16:01:33.000] Project '/a/username/project/tsconfig.json' (Configured)
Info 58   [16:01:34.000] 	Files (4)

Info 58   [16:01:35.000] -----------------------------------------------
Info 58   [16:01:36.000] Open files: 
Info 58   [16:01:37.000] 	FileName: /a/username/project/src/index.ts ProjectRootPath: undefined
Info 58   [16:01:38.000] 		Projects: /a/username/project/tsconfig.json
Info 58   [16:01:39.000] Completion Entries:: ["file1","file2"]
Info 59   [16:01:40.000] PolledWatches::
Info 60   [16:01:41.000] /a/username/project/node_modules/@types:
Info 61   [16:01:42.000]   {"pollingInterval":500}
Info 62   [16:01:43.000] 
Info 63   [16:01:44.000] FsWatches::
Info 64   [16:01:45.000] /a/username/project/tsconfig.json:
Info 65   [16:01:46.000]   {}
Info 66   [16:01:47.000] /a/username/project:
Info 67   [16:01:48.000]   {}
Info 68   [16:01:49.000] /a/username/project/src:
Info 69   [16:01:50.000]   {}
Info 70   [16:01:51.000] /a/username/project/src/file1.ts:
Info 71   [16:01:52.000]   {}
Info 72   [16:01:53.000] /a/lib/lib.d.ts:
Info 73   [16:01:54.000]   {}
Info 74   [16:01:55.000] /a/username/project/src/file2.ts:
Info 75   [16:01:56.000]   {}
Info 76   [16:01:57.000] 
Info 77   [16:01:58.000] FsWatchesRecursive::
Info 78   [16:01:59.000] 