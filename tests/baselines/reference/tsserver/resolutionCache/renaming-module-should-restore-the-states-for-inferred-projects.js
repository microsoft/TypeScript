Info 0    [16:00:11.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Info 1    [16:00:12.000] request:{"seq":0,"type":"request","command":"open","arguments":{"file":"/a/b/file1.ts"}}
Info 2    [16:00:13.000] Search path: /a/b
Info 3    [16:00:14.000] For info: /a/b/file1.ts :: No config files found.
Info 4    [16:00:15.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 5    [16:00:16.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 6    [16:00:17.000] FileWatcher:: Added:: WatchInfo: /a/b/moduleFile.ts 500 undefined WatchType: Closed Script info
Info 7    [16:00:18.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /dev/null/inferredProject1* WatchType: Missing file
Info 8    [16:00:19.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 9    [16:00:20.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 10   [16:00:21.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 11   [16:00:22.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 12   [16:00:23.000] 	Files (2)
	/a/b/moduleFile.ts
	/a/b/file1.ts


	moduleFile.ts
	  Imported via './moduleFile' from file 'file1.ts'
	file1.ts
	  Root file specified for compilation

Info 13   [16:00:24.000] -----------------------------------------------
Info 14   [16:00:25.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 14   [16:00:26.000] 	Files (2)

Info 14   [16:00:27.000] -----------------------------------------------
Info 14   [16:00:28.000] Open files: 
Info 14   [16:00:29.000] 	FileName: /a/b/file1.ts ProjectRootPath: undefined
Info 14   [16:00:30.000] 		Projects: /dev/null/inferredProject1*
Info 14   [16:00:31.000] response:{"responseRequired":false}
Info 15   [16:00:32.000] request:{"seq":0,"type":"request","command":"semanticDiagnosticsSync","arguments":{"file":"/a/b/file1.ts"}}
Info 16   [16:00:33.000] response:{"response":[],"responseRequired":true}
Info 17   [16:00:35.000] FileWatcher:: Triggered with /a/b/moduleFile.ts 2:: WatchInfo: /a/b/moduleFile.ts 500 undefined WatchType: Closed Script info
Info 18   [16:00:36.000] FileWatcher:: Close:: WatchInfo: /a/b/moduleFile.ts 500 undefined WatchType: Closed Script info
Info 19   [16:00:37.000] Scheduled: /dev/null/inferredProject1*
Info 20   [16:00:38.000] Scheduled: *ensureProjectForOpenFiles*
Info 21   [16:00:39.000] Elapsed:: *ms FileWatcher:: Triggered with /a/b/moduleFile.ts 2:: WatchInfo: /a/b/moduleFile.ts 500 undefined WatchType: Closed Script info
Info 22   [16:00:42.000] Running: /dev/null/inferredProject1*
Info 23   [16:00:43.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 24   [16:00:44.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/moduleFile 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 25   [16:00:45.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/moduleFile 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 26   [16:00:46.000] DirectoryWatcher:: Added:: WatchInfo: /a/b 0 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 27   [16:00:47.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b 0 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 28   [16:00:48.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 2 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 29   [16:00:49.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 30   [16:00:50.000] 	Files (1)
	/a/b/file1.ts


	file1.ts
	  Root file specified for compilation

Info 31   [16:00:51.000] -----------------------------------------------
Info 32   [16:00:52.000] Running: *ensureProjectForOpenFiles*
Info 33   [16:00:53.000] Before ensureProjectForOpenFiles:
Info 34   [16:00:54.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 34   [16:00:55.000] 	Files (1)

Info 34   [16:00:56.000] -----------------------------------------------
Info 34   [16:00:57.000] Open files: 
Info 34   [16:00:58.000] 	FileName: /a/b/file1.ts ProjectRootPath: undefined
Info 34   [16:00:59.000] 		Projects: /dev/null/inferredProject1*
Info 34   [16:01:00.000] After ensureProjectForOpenFiles:
Info 35   [16:01:01.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 35   [16:01:02.000] 	Files (1)

Info 35   [16:01:03.000] -----------------------------------------------
Info 35   [16:01:04.000] Open files: 
Info 35   [16:01:05.000] 	FileName: /a/b/file1.ts ProjectRootPath: undefined
Info 35   [16:01:06.000] 		Projects: /dev/null/inferredProject1*
Info 35   [16:01:07.000] request:{"seq":0,"type":"request","command":"semanticDiagnosticsSync","arguments":{"file":"/a/b/file1.ts"}}
Info 36   [16:01:08.000] response:{"response":[{"start":{"line":1,"offset":20},"end":{"line":1,"offset":34},"text":"Cannot find module './moduleFile' or its corresponding type declarations.","code":2307,"category":"error"}],"responseRequired":true}
Info 37   [16:01:10.000] DirectoryWatcher:: Triggered with /a/b/moduleFile1.ts :: WatchInfo: /a/b 0 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 38   [16:01:11.000] Scheduled: /dev/null/inferredProject1*FailedLookupInvalidation
Info 39   [16:01:12.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /a/b/moduleFile1.ts :: WatchInfo: /a/b 0 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 40   [16:01:15.000] DirectoryWatcher:: Triggered with /a/b/moduleFile.ts :: WatchInfo: /a/b 0 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 41   [16:01:16.000] Scheduled: /dev/null/inferredProject1*FailedLookupInvalidation, Cancelled earlier one
Info 42   [16:01:17.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /a/b/moduleFile.ts :: WatchInfo: /a/b 0 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 43   [16:01:18.000] Running: /dev/null/inferredProject1*FailedLookupInvalidation
Info 44   [16:01:19.000] Scheduled: /dev/null/inferredProject1*
Info 45   [16:01:20.000] Scheduled: *ensureProjectForOpenFiles*
Info 46   [16:01:21.000] request:{"seq":0,"type":"request","command":"change","arguments":{"file":"/a/b/file1.ts","line":1,"offset":44,"endLine":1,"endOffset":44,"insertString":"\n"}}
Info 47   [16:01:22.000] response:{"responseRequired":false}
Info 48   [16:01:23.000] Running: /dev/null/inferredProject1*
Info 49   [16:01:24.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 50   [16:01:25.000] FileWatcher:: Added:: WatchInfo: /a/b/moduleFile.ts 500 undefined WatchType: Closed Script info
Info 51   [16:01:26.000] DirectoryWatcher:: Close:: WatchInfo: /a/b/moduleFile 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 52   [16:01:27.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /a/b/moduleFile 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 53   [16:01:28.000] DirectoryWatcher:: Close:: WatchInfo: /a/b 0 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 54   [16:01:29.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /a/b 0 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 55   [16:01:30.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 3 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info 56   [16:01:31.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 57   [16:01:32.000] 	Files (2)
	/a/b/moduleFile.ts
	/a/b/file1.ts


	moduleFile.ts
	  Imported via './moduleFile' from file 'file1.ts'
	file1.ts
	  Root file specified for compilation

Info 58   [16:01:33.000] -----------------------------------------------
Info 59   [16:01:34.000] Running: *ensureProjectForOpenFiles*
Info 60   [16:01:35.000] Before ensureProjectForOpenFiles:
Info 61   [16:01:36.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 61   [16:01:37.000] 	Files (2)

Info 61   [16:01:38.000] -----------------------------------------------
Info 61   [16:01:39.000] Open files: 
Info 61   [16:01:40.000] 	FileName: /a/b/file1.ts ProjectRootPath: undefined
Info 61   [16:01:41.000] 		Projects: /dev/null/inferredProject1*
Info 61   [16:01:42.000] After ensureProjectForOpenFiles:
Info 62   [16:01:43.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 62   [16:01:44.000] 	Files (2)

Info 62   [16:01:45.000] -----------------------------------------------
Info 62   [16:01:46.000] Open files: 
Info 62   [16:01:47.000] 	FileName: /a/b/file1.ts ProjectRootPath: undefined
Info 62   [16:01:48.000] 		Projects: /dev/null/inferredProject1*
Info 62   [16:01:49.000] request:{"seq":0,"type":"request","command":"semanticDiagnosticsSync","arguments":{"file":"/a/b/file1.ts"}}
Info 63   [16:01:50.000] response:{"response":[],"responseRequired":true}