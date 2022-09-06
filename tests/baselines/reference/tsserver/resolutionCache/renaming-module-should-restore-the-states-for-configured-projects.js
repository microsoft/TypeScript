Info 0    [16:00:13.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Info 1    [16:00:14.000] request:{"seq":0,"type":"request","command":"open","arguments":{"file":"/a/b/file1.ts"}}
Info 2    [16:00:15.000] Search path: /a/b
Info 3    [16:00:16.000] For info: /a/b/file1.ts :: Config file name: /a/b/tsconfig.json
Info 4    [16:00:17.000] Creating configuration project /a/b/tsconfig.json
Info 5    [16:00:18.000] FileWatcher:: Added:: WatchInfo: /a/b/tsconfig.json 2000 undefined Project: /a/b/tsconfig.json WatchType: Config file
Info 6    [16:00:19.000] Config: /a/b/tsconfig.json : {
 "rootNames": [
  "/a/b/file1.ts",
  "/a/b/moduleFile.ts"
 ],
 "options": {
  "configFilePath": "/a/b/tsconfig.json"
 }
}
Info 7    [16:00:20.000] DirectoryWatcher:: Added:: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Info 8    [16:00:21.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Info 9    [16:00:22.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 10   [16:00:23.000] FileWatcher:: Added:: WatchInfo: /a/b/moduleFile.ts 500 undefined WatchType: Closed Script info
Info 11   [16:00:24.000] Starting updateGraphWorker: Project: /a/b/tsconfig.json
Info 12   [16:00:25.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /a/b/tsconfig.json WatchType: Missing file
Info 13   [16:00:26.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/tsconfig.json WatchType: Type roots
Info 14   [16:00:27.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/tsconfig.json WatchType: Type roots
Info 15   [16:00:28.000] Finishing updateGraphWorker: Project: /a/b/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 16   [16:00:29.000] Project '/a/b/tsconfig.json' (Configured)
Info 17   [16:00:30.000] 	Files (2)
	/a/b/moduleFile.ts
	/a/b/file1.ts


	moduleFile.ts
	  Imported via './moduleFile' from file 'file1.ts'
	  Matched by default include pattern '**/*'
	file1.ts
	  Matched by default include pattern '**/*'

Info 18   [16:00:31.000] -----------------------------------------------
Info 19   [16:00:32.000] Project '/a/b/tsconfig.json' (Configured)
Info 19   [16:00:33.000] 	Files (2)

Info 19   [16:00:34.000] -----------------------------------------------
Info 19   [16:00:35.000] Open files: 
Info 19   [16:00:36.000] 	FileName: /a/b/file1.ts ProjectRootPath: undefined
Info 19   [16:00:37.000] 		Projects: /a/b/tsconfig.json
Info 19   [16:00:38.000] response:{"responseRequired":false}
Info 20   [16:00:39.000] request:{"seq":0,"type":"request","command":"semanticDiagnosticsSync","arguments":{"file":"/a/b/file1.ts"}}
Info 21   [16:00:40.000] response:{"response":[],"responseRequired":true}
Info 22   [16:00:42.000] FileWatcher:: Triggered with /a/b/moduleFile.ts 2:: WatchInfo: /a/b/moduleFile.ts 500 undefined WatchType: Closed Script info
Info 23   [16:00:43.000] FileWatcher:: Close:: WatchInfo: /a/b/moduleFile.ts 500 undefined WatchType: Closed Script info
Info 24   [16:00:44.000] Scheduled: /a/b/tsconfig.json
Info 25   [16:00:45.000] Scheduled: *ensureProjectForOpenFiles*
Info 26   [16:00:46.000] Elapsed:: *ms FileWatcher:: Triggered with /a/b/moduleFile.ts 2:: WatchInfo: /a/b/moduleFile.ts 500 undefined WatchType: Closed Script info
Info 27   [16:00:47.000] DirectoryWatcher:: Triggered with /a/b/moduleFile.ts :: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Info 28   [16:00:48.000] Scheduled: /a/b/tsconfig.json, Cancelled earlier one
Info 29   [16:00:49.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 30   [16:00:50.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /a/b/moduleFile.ts :: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Info 31   [16:00:53.000] DirectoryWatcher:: Triggered with /a/b/moduleFile1.ts :: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Info 32   [16:00:54.000] Scheduled: /a/b/tsconfig.json, Cancelled earlier one
Info 33   [16:00:55.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 34   [16:00:56.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /a/b/moduleFile1.ts :: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Info 35   [16:00:57.000] Running: /a/b/tsconfig.json
Info 36   [16:00:58.000] FileWatcher:: Added:: WatchInfo: /a/b/moduleFile1.ts 500 undefined WatchType: Closed Script info
Info 37   [16:00:59.000] Starting updateGraphWorker: Project: /a/b/tsconfig.json
Info 38   [16:01:00.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/moduleFile 1 undefined Project: /a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 39   [16:01:01.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/moduleFile 1 undefined Project: /a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 40   [16:01:02.000] DirectoryWatcher:: Added:: WatchInfo: /a/b 0 undefined Project: /a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 41   [16:01:03.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b 0 undefined Project: /a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 42   [16:01:04.000] Finishing updateGraphWorker: Project: /a/b/tsconfig.json Version: 2 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 43   [16:01:05.000] Project '/a/b/tsconfig.json' (Configured)
Info 44   [16:01:06.000] 	Files (2)
	/a/b/file1.ts
	/a/b/moduleFile1.ts


	file1.ts
	  Matched by default include pattern '**/*'
	moduleFile1.ts
	  Matched by default include pattern '**/*'

Info 45   [16:01:07.000] -----------------------------------------------
Info 46   [16:01:08.000] Running: *ensureProjectForOpenFiles*
Info 47   [16:01:09.000] Before ensureProjectForOpenFiles:
Info 48   [16:01:10.000] Project '/a/b/tsconfig.json' (Configured)
Info 48   [16:01:11.000] 	Files (2)

Info 48   [16:01:12.000] -----------------------------------------------
Info 48   [16:01:13.000] Open files: 
Info 48   [16:01:14.000] 	FileName: /a/b/file1.ts ProjectRootPath: undefined
Info 48   [16:01:15.000] 		Projects: /a/b/tsconfig.json
Info 48   [16:01:16.000] After ensureProjectForOpenFiles:
Info 49   [16:01:17.000] Project '/a/b/tsconfig.json' (Configured)
Info 49   [16:01:18.000] 	Files (2)

Info 49   [16:01:19.000] -----------------------------------------------
Info 49   [16:01:20.000] Open files: 
Info 49   [16:01:21.000] 	FileName: /a/b/file1.ts ProjectRootPath: undefined
Info 49   [16:01:22.000] 		Projects: /a/b/tsconfig.json
Info 49   [16:01:23.000] request:{"seq":0,"type":"request","command":"semanticDiagnosticsSync","arguments":{"file":"/a/b/file1.ts"}}
Info 50   [16:01:24.000] response:{"response":[{"start":{"line":1,"offset":20},"end":{"line":1,"offset":34},"text":"Cannot find module './moduleFile' or its corresponding type declarations.","code":2307,"category":"error"}],"responseRequired":true}
Info 51   [16:01:26.000] FileWatcher:: Triggered with /a/b/moduleFile1.ts 2:: WatchInfo: /a/b/moduleFile1.ts 500 undefined WatchType: Closed Script info
Info 52   [16:01:27.000] FileWatcher:: Close:: WatchInfo: /a/b/moduleFile1.ts 500 undefined WatchType: Closed Script info
Info 53   [16:01:28.000] Scheduled: /a/b/tsconfig.json
Info 54   [16:01:29.000] Scheduled: *ensureProjectForOpenFiles*
Info 55   [16:01:30.000] Elapsed:: *ms FileWatcher:: Triggered with /a/b/moduleFile1.ts 2:: WatchInfo: /a/b/moduleFile1.ts 500 undefined WatchType: Closed Script info
Info 56   [16:01:31.000] DirectoryWatcher:: Triggered with /a/b/moduleFile1.ts :: WatchInfo: /a/b 0 undefined Project: /a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 57   [16:01:32.000] Scheduled: /a/b/tsconfig.jsonFailedLookupInvalidation
Info 58   [16:01:33.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /a/b/moduleFile1.ts :: WatchInfo: /a/b 0 undefined Project: /a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 59   [16:01:34.000] DirectoryWatcher:: Triggered with /a/b/moduleFile1.ts :: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Info 60   [16:01:35.000] Scheduled: /a/b/tsconfig.json, Cancelled earlier one
Info 61   [16:01:36.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 62   [16:01:37.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /a/b/moduleFile1.ts :: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Info 63   [16:01:40.000] DirectoryWatcher:: Triggered with /a/b/moduleFile.ts :: WatchInfo: /a/b 0 undefined Project: /a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 64   [16:01:41.000] Scheduled: /a/b/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info 65   [16:01:42.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /a/b/moduleFile.ts :: WatchInfo: /a/b 0 undefined Project: /a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 66   [16:01:43.000] DirectoryWatcher:: Triggered with /a/b/moduleFile.ts :: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Info 67   [16:01:44.000] Scheduled: /a/b/tsconfig.json, Cancelled earlier one
Info 68   [16:01:45.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 69   [16:01:46.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /a/b/moduleFile.ts :: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Info 70   [16:01:47.000] Running: /a/b/tsconfig.jsonFailedLookupInvalidation
Info 71   [16:01:48.000] Scheduled: /a/b/tsconfig.json, Cancelled earlier one
Info 72   [16:01:49.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 73   [16:01:50.000] request:{"seq":0,"type":"request","command":"semanticDiagnosticsSync","arguments":{"file":"/a/b/file1.ts"}}
Info 74   [16:01:51.000] FileWatcher:: Added:: WatchInfo: /a/b/moduleFile.ts 500 undefined WatchType: Closed Script info
Info 75   [16:01:52.000] Starting updateGraphWorker: Project: /a/b/tsconfig.json
Info 76   [16:01:53.000] DirectoryWatcher:: Close:: WatchInfo: /a/b/moduleFile 1 undefined Project: /a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 77   [16:01:54.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /a/b/moduleFile 1 undefined Project: /a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 78   [16:01:55.000] DirectoryWatcher:: Close:: WatchInfo: /a/b 0 undefined Project: /a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 79   [16:01:56.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /a/b 0 undefined Project: /a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 80   [16:01:57.000] Finishing updateGraphWorker: Project: /a/b/tsconfig.json Version: 3 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 81   [16:01:58.000] Project '/a/b/tsconfig.json' (Configured)
Info 82   [16:01:59.000] 	Files (2)
	/a/b/moduleFile.ts
	/a/b/file1.ts


	moduleFile.ts
	  Imported via './moduleFile' from file 'file1.ts'
	  Matched by default include pattern '**/*'
	file1.ts
	  Matched by default include pattern '**/*'

Info 83   [16:02:00.000] -----------------------------------------------
Info 84   [16:02:01.000] response:{"response":[],"responseRequired":true}