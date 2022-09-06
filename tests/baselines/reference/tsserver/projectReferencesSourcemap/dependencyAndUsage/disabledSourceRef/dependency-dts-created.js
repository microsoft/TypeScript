Info 0    [16:01:04.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Info 1    [16:01:05.000] request:{"seq":0,"type":"request","command":"open","arguments":{"file":"/user/username/projects/myproject/main/main.ts"}}
Info 2    [16:01:06.000] Search path: /user/username/projects/myproject/main
Info 3    [16:01:07.000] For info: /user/username/projects/myproject/main/main.ts :: Config file name: /user/username/projects/myproject/main/tsconfig.json
Info 4    [16:01:08.000] Creating configuration project /user/username/projects/myproject/main/tsconfig.json
Info 5    [16:01:09.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/main/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/main/tsconfig.json WatchType: Config file
Info 6    [16:01:10.000] Config: /user/username/projects/myproject/main/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/main/main.ts"
 ],
 "options": {
  "composite": true,
  "declarationMap": true,
  "disableSourceOfProjectReferenceRedirect": true,
  "configFilePath": "/user/username/projects/myproject/main/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/user/username/projects/myproject/dependency",
   "originalPath": "../dependency"
  }
 ]
}
Info 7    [16:01:11.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/main 1 undefined Config: /user/username/projects/myproject/main/tsconfig.json WatchType: Wild card directory
Info 8    [16:01:12.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/main 1 undefined Config: /user/username/projects/myproject/main/tsconfig.json WatchType: Wild card directory
Info 9    [16:01:13.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 10   [16:01:14.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/main/tsconfig.json
Info 11   [16:01:15.000] Config: /user/username/projects/myproject/dependency/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/dependency/FnS.ts"
 ],
 "options": {
  "composite": true,
  "declarationMap": true,
  "declarationDir": "/user/username/projects/myproject/decls",
  "configFilePath": "/user/username/projects/myproject/dependency/tsconfig.json"
 }
}
Info 12   [16:01:16.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/dependency/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/main/tsconfig.json WatchType: Config file
Info 13   [16:01:17.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/dependency 1 undefined Config: /user/username/projects/myproject/dependency/tsconfig.json WatchType: Wild card directory
Info 14   [16:01:18.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/dependency 1 undefined Config: /user/username/projects/myproject/dependency/tsconfig.json WatchType: Wild card directory
Info 15   [16:01:19.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/decls 1 undefined Project: /user/username/projects/myproject/main/tsconfig.json WatchType: Failed Lookup Locations
Info 16   [16:01:20.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/decls 1 undefined Project: /user/username/projects/myproject/main/tsconfig.json WatchType: Failed Lookup Locations
Info 17   [16:01:21.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 18   [16:01:22.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/main/node_modules/@types 1 undefined Project: /user/username/projects/myproject/main/tsconfig.json WatchType: Type roots
Info 19   [16:01:23.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/main/node_modules/@types 1 undefined Project: /user/username/projects/myproject/main/tsconfig.json WatchType: Type roots
Info 20   [16:01:24.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/main/tsconfig.json WatchType: Type roots
Info 21   [16:01:25.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/main/tsconfig.json WatchType: Type roots
Info 22   [16:01:26.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/main/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 23   [16:01:27.000] Project '/user/username/projects/myproject/main/tsconfig.json' (Configured)
Info 24   [16:01:28.000] 	Files (2)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/main/main.ts


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	main.ts
	  Matched by default include pattern '**/*'

Info 25   [16:01:29.000] -----------------------------------------------
Info 26   [16:01:30.000] Search path: /user/username/projects/myproject/main
Info 27   [16:01:31.000] For info: /user/username/projects/myproject/main/tsconfig.json :: No config files found.
Info 28   [16:01:32.000] Project '/user/username/projects/myproject/main/tsconfig.json' (Configured)
Info 28   [16:01:33.000] 	Files (2)

Info 28   [16:01:34.000] -----------------------------------------------
Info 28   [16:01:35.000] Open files: 
Info 28   [16:01:36.000] 	FileName: /user/username/projects/myproject/main/main.ts ProjectRootPath: undefined
Info 28   [16:01:37.000] 		Projects: /user/username/projects/myproject/main/tsconfig.json
Info 28   [16:01:38.000] response:{"responseRequired":false}
Info 29   [16:01:39.000] request:{"seq":0,"type":"request","command":"open","arguments":{"file":"/user/username/projects/myproject/dependency/FnS.ts"}}
Info 30   [16:01:40.000] Search path: /user/username/projects/myproject/dependency
Info 31   [16:01:41.000] For info: /user/username/projects/myproject/dependency/FnS.ts :: Config file name: /user/username/projects/myproject/dependency/tsconfig.json
Info 32   [16:01:42.000] Creating configuration project /user/username/projects/myproject/dependency/tsconfig.json
Info 33   [16:01:43.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 34   [16:01:44.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/dependency/tsconfig.json
Info 35   [16:01:45.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/dependency/node_modules/@types 1 undefined Project: /user/username/projects/myproject/dependency/tsconfig.json WatchType: Type roots
Info 36   [16:01:46.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/dependency/node_modules/@types 1 undefined Project: /user/username/projects/myproject/dependency/tsconfig.json WatchType: Type roots
Info 37   [16:01:47.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/dependency/tsconfig.json WatchType: Type roots
Info 38   [16:01:48.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/dependency/tsconfig.json WatchType: Type roots
Info 39   [16:01:49.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/dependency/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 40   [16:01:50.000] Project '/user/username/projects/myproject/dependency/tsconfig.json' (Configured)
Info 41   [16:01:51.000] 	Files (2)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/dependency/FnS.ts


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	FnS.ts
	  Matched by default include pattern '**/*'

Info 42   [16:01:52.000] -----------------------------------------------
Info 43   [16:01:53.000] Search path: /user/username/projects/myproject/dependency
Info 44   [16:01:54.000] For info: /user/username/projects/myproject/dependency/tsconfig.json :: No config files found.
Info 45   [16:01:55.000] Project '/user/username/projects/myproject/main/tsconfig.json' (Configured)
Info 45   [16:01:56.000] 	Files (2)

Info 45   [16:01:57.000] -----------------------------------------------
Info 45   [16:01:58.000] Project '/user/username/projects/myproject/dependency/tsconfig.json' (Configured)
Info 45   [16:01:59.000] 	Files (2)

Info 45   [16:02:00.000] -----------------------------------------------
Info 45   [16:02:01.000] Open files: 
Info 45   [16:02:02.000] 	FileName: /user/username/projects/myproject/main/main.ts ProjectRootPath: undefined
Info 45   [16:02:03.000] 		Projects: /user/username/projects/myproject/main/tsconfig.json
Info 45   [16:02:04.000] 	FileName: /user/username/projects/myproject/dependency/FnS.ts ProjectRootPath: undefined
Info 45   [16:02:05.000] 		Projects: /user/username/projects/myproject/dependency/tsconfig.json
Info 45   [16:02:06.000] response:{"responseRequired":false}
Info 46   [16:02:07.000] request:{"seq":0,"type":"request","command":"open","arguments":{"file":"/user/username/projects/myproject/random/random.ts"}}
Info 47   [16:02:08.000] Search path: /user/username/projects/myproject/random
Info 48   [16:02:09.000] For info: /user/username/projects/myproject/random/random.ts :: Config file name: /user/username/projects/myproject/random/tsconfig.json
Info 49   [16:02:10.000] Creating configuration project /user/username/projects/myproject/random/tsconfig.json
Info 50   [16:02:11.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/random/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/random/tsconfig.json WatchType: Config file
Info 51   [16:02:12.000] Config: /user/username/projects/myproject/random/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/random/random.ts"
 ],
 "options": {
  "configFilePath": "/user/username/projects/myproject/random/tsconfig.json"
 }
}
Info 52   [16:02:13.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/random 1 undefined Config: /user/username/projects/myproject/random/tsconfig.json WatchType: Wild card directory
Info 53   [16:02:14.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/random 1 undefined Config: /user/username/projects/myproject/random/tsconfig.json WatchType: Wild card directory
Info 54   [16:02:15.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 55   [16:02:16.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/random/tsconfig.json
Info 56   [16:02:17.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/random/node_modules/@types 1 undefined Project: /user/username/projects/myproject/random/tsconfig.json WatchType: Type roots
Info 57   [16:02:18.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/random/node_modules/@types 1 undefined Project: /user/username/projects/myproject/random/tsconfig.json WatchType: Type roots
Info 58   [16:02:19.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/random/tsconfig.json WatchType: Type roots
Info 59   [16:02:20.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/random/tsconfig.json WatchType: Type roots
Info 60   [16:02:21.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/random/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 61   [16:02:22.000] Project '/user/username/projects/myproject/random/tsconfig.json' (Configured)
Info 62   [16:02:23.000] 	Files (2)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/random/random.ts


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	random.ts
	  Matched by default include pattern '**/*'

Info 63   [16:02:24.000] -----------------------------------------------
Info 64   [16:02:25.000] Project '/user/username/projects/myproject/main/tsconfig.json' (Configured)
Info 64   [16:02:26.000] 	Files (2)

Info 64   [16:02:27.000] -----------------------------------------------
Info 64   [16:02:28.000] Project '/user/username/projects/myproject/dependency/tsconfig.json' (Configured)
Info 64   [16:02:29.000] 	Files (2)

Info 64   [16:02:30.000] -----------------------------------------------
Info 64   [16:02:31.000] Project '/user/username/projects/myproject/random/tsconfig.json' (Configured)
Info 64   [16:02:32.000] 	Files (2)

Info 64   [16:02:33.000] -----------------------------------------------
Info 64   [16:02:34.000] Open files: 
Info 64   [16:02:35.000] 	FileName: /user/username/projects/myproject/main/main.ts ProjectRootPath: undefined
Info 64   [16:02:36.000] 		Projects: /user/username/projects/myproject/main/tsconfig.json
Info 64   [16:02:37.000] 	FileName: /user/username/projects/myproject/dependency/FnS.ts ProjectRootPath: undefined
Info 64   [16:02:38.000] 		Projects: /user/username/projects/myproject/dependency/tsconfig.json
Info 64   [16:02:39.000] 	FileName: /user/username/projects/myproject/random/random.ts ProjectRootPath: undefined
Info 64   [16:02:40.000] 		Projects: /user/username/projects/myproject/random/tsconfig.json
Info 64   [16:02:41.000] response:{"responseRequired":false}
Info 65   [16:02:42.000] request:{"command":"definitionAndBoundSpan","arguments":{"file":"/user/username/projects/myproject/main/main.ts","line":9,"offset":1},"seq":1,"type":"request"}
Info 66   [16:02:43.000] response:{"response":{"definitions":[{"file":"/user/username/projects/myproject/main/main.ts","start":{"line":2,"offset":5},"end":{"line":2,"offset":8},"contextStart":{"line":1,"offset":1},"contextEnd":{"line":7,"offset":22}}],"textSpan":{"start":{"line":9,"offset":1},"end":{"line":9,"offset":4}}},"responseRequired":true}
Info 67   [16:02:44.000] request:{"command":"rename","arguments":{"file":"/user/username/projects/myproject/dependency/FnS.ts","line":1,"offset":17},"seq":2,"type":"request"}
Info 68   [16:02:45.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/decls/FnS.d.ts 2000 undefined Project: /user/username/projects/myproject/dependency/tsconfig.json WatchType: Missing generated file
Info 69   [16:02:46.000] response:{"response":{"info":{"canRename":true,"displayName":"fn1","fullDisplayName":"\"/user/username/projects/myproject/dependency/FnS\".fn1","kind":"function","kindModifiers":"export","triggerSpan":{"start":{"line":1,"offset":17},"end":{"line":1,"offset":20}}},"locs":[{"file":"/user/username/projects/myproject/dependency/FnS.ts","locs":[{"start":{"line":1,"offset":17},"end":{"line":1,"offset":20},"contextStart":{"line":1,"offset":1},"contextEnd":{"line":1,"offset":26}}]}]},"responseRequired":true}
Info 70   [16:02:49.000] FileWatcher:: Triggered with /user/username/projects/myproject/decls/FnS.d.ts 0:: WatchInfo: /user/username/projects/myproject/decls/FnS.d.ts 2000 undefined Project: /user/username/projects/myproject/dependency/tsconfig.json WatchType: Missing generated file
Info 71   [16:02:50.000] Scheduled: /user/username/projects/myproject/dependency/tsconfig.json
Info 72   [16:02:51.000] Scheduled: *ensureProjectForOpenFiles*
Info 73   [16:02:52.000] Elapsed:: *ms FileWatcher:: Triggered with /user/username/projects/myproject/decls/FnS.d.ts 0:: WatchInfo: /user/username/projects/myproject/decls/FnS.d.ts 2000 undefined Project: /user/username/projects/myproject/dependency/tsconfig.json WatchType: Missing generated file
Info 74   [16:02:53.000] FileWatcher:: Triggered with /user/username/projects/myproject/decls/FnS.d.ts 0:: WatchInfo: /user/username/projects/myproject/decls/FnS.d.ts 2000 undefined Project: /user/username/projects/myproject/dependency/tsconfig.json WatchType: Missing generated file
Info 75   [16:02:54.000] Scheduled: /user/username/projects/myproject/dependency/tsconfig.json, Cancelled earlier one
Info 76   [16:02:55.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 77   [16:02:56.000] Elapsed:: *ms FileWatcher:: Triggered with /user/username/projects/myproject/decls/FnS.d.ts 0:: WatchInfo: /user/username/projects/myproject/decls/FnS.d.ts 2000 undefined Project: /user/username/projects/myproject/dependency/tsconfig.json WatchType: Missing generated file
Info 78   [16:02:57.000] DirectoryWatcher:: Triggered with /user/username/projects/myproject/decls/FnS.d.ts :: WatchInfo: /user/username/projects/myproject/decls 1 undefined Project: /user/username/projects/myproject/main/tsconfig.json WatchType: Failed Lookup Locations
Info 79   [16:02:58.000] Scheduled: /user/username/projects/myproject/main/tsconfig.jsonFailedLookupInvalidation
Info 80   [16:02:59.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/decls/FnS.d.ts :: WatchInfo: /user/username/projects/myproject/decls 1 undefined Project: /user/username/projects/myproject/main/tsconfig.json WatchType: Failed Lookup Locations
Info 81   [16:03:00.000] request:{"command":"definitionAndBoundSpan","arguments":{"file":"/user/username/projects/myproject/main/main.ts","line":9,"offset":1},"seq":3,"type":"request"}
Info 82   [16:03:01.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 83   [16:03:02.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/main/tsconfig.json
Info 84   [16:03:03.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/decls/fns.d.ts 500 undefined WatchType: Closed Script info
Info 85   [16:03:04.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/main/tsconfig.json Version: 2 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info 86   [16:03:05.000] Project '/user/username/projects/myproject/main/tsconfig.json' (Configured)
Info 87   [16:03:06.000] 	Files (3)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/decls/fns.d.ts
	/user/username/projects/myproject/main/main.ts


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	../decls/fns.d.ts
	  Imported via '../decls/fns' from file 'main.ts'
	main.ts
	  Matched by default include pattern '**/*'

Info 88   [16:03:07.000] -----------------------------------------------
Info 89   [16:03:08.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/decls/FnS.d.ts.map 500 undefined WatchType: Closed Script info
Info 90   [16:03:09.000] response:{"response":{"definitions":[{"file":"/user/username/projects/myproject/dependency/FnS.ts","start":{"line":1,"offset":17},"end":{"line":1,"offset":20},"contextStart":{"line":1,"offset":1},"contextEnd":{"line":1,"offset":26}}],"textSpan":{"start":{"line":9,"offset":1},"end":{"line":9,"offset":4}}},"responseRequired":true}
Info 91   [16:03:10.000] request:{"command":"definitionAndBoundSpan","arguments":{"file":"/user/username/projects/myproject/main/main.ts","line":10,"offset":1},"seq":4,"type":"request"}
Info 92   [16:03:11.000] response:{"response":{"definitions":[{"file":"/user/username/projects/myproject/dependency/FnS.ts","start":{"line":2,"offset":17},"end":{"line":2,"offset":20},"contextStart":{"line":2,"offset":1},"contextEnd":{"line":2,"offset":26}}],"textSpan":{"start":{"line":10,"offset":1},"end":{"line":10,"offset":4}}},"responseRequired":true}
Info 93   [16:03:12.000] request:{"command":"definitionAndBoundSpan","arguments":{"file":"/user/username/projects/myproject/main/main.ts","line":11,"offset":1},"seq":5,"type":"request"}
Info 94   [16:03:13.000] response:{"response":{"definitions":[{"file":"/user/username/projects/myproject/dependency/FnS.ts","start":{"line":3,"offset":17},"end":{"line":3,"offset":20},"contextStart":{"line":3,"offset":1},"contextEnd":{"line":3,"offset":26}}],"textSpan":{"start":{"line":11,"offset":1},"end":{"line":11,"offset":4}}},"responseRequired":true}
Info 95   [16:03:14.000] request:{"command":"definitionAndBoundSpan","arguments":{"file":"/user/username/projects/myproject/main/main.ts","line":12,"offset":1},"seq":6,"type":"request"}
Info 96   [16:03:15.000] response:{"response":{"definitions":[{"file":"/user/username/projects/myproject/dependency/FnS.ts","start":{"line":4,"offset":17},"end":{"line":4,"offset":20},"contextStart":{"line":4,"offset":1},"contextEnd":{"line":4,"offset":26}}],"textSpan":{"start":{"line":12,"offset":1},"end":{"line":12,"offset":4}}},"responseRequired":true}
Info 97   [16:03:16.000] request:{"command":"definitionAndBoundSpan","arguments":{"file":"/user/username/projects/myproject/main/main.ts","line":13,"offset":1},"seq":7,"type":"request"}
Info 98   [16:03:17.000] response:{"response":{"definitions":[{"file":"/user/username/projects/myproject/dependency/FnS.ts","start":{"line":5,"offset":17},"end":{"line":5,"offset":20},"contextStart":{"line":5,"offset":1},"contextEnd":{"line":5,"offset":26}}],"textSpan":{"start":{"line":13,"offset":1},"end":{"line":13,"offset":4}}},"responseRequired":true}
Info 99   [16:03:18.000] request:{"command":"rename","arguments":{"file":"/user/username/projects/myproject/dependency/FnS.ts","line":1,"offset":17},"seq":8,"type":"request"}
Info 100  [16:03:19.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/dependency/tsconfig.json
Info 101  [16:03:20.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/dependency/tsconfig.json Version: 2 structureChanged: false structureIsReused:: Not Elapsed:: *ms
Info 102  [16:03:21.000] Search path: /user/username/projects/myproject/dependency
Info 103  [16:03:22.000] For info: /user/username/projects/myproject/dependency/FnS.ts :: Config file name: /user/username/projects/myproject/dependency/tsconfig.json
Info 104  [16:03:23.000] response:{"response":{"info":{"canRename":true,"displayName":"fn1","fullDisplayName":"\"/user/username/projects/myproject/dependency/FnS\".fn1","kind":"function","kindModifiers":"export","triggerSpan":{"start":{"line":1,"offset":17},"end":{"line":1,"offset":20}}},"locs":[{"file":"/user/username/projects/myproject/dependency/FnS.ts","locs":[{"start":{"line":1,"offset":17},"end":{"line":1,"offset":20},"contextStart":{"line":1,"offset":1},"contextEnd":{"line":1,"offset":26}}]},{"file":"/user/username/projects/myproject/main/main.ts","locs":[{"start":{"line":2,"offset":5},"end":{"line":2,"offset":8},"contextStart":{"line":1,"offset":1},"contextEnd":{"line":7,"offset":22}},{"start":{"line":9,"offset":1},"end":{"line":9,"offset":4}}]}]},"responseRequired":true}
Info 105  [16:03:24.000] request:{"command":"rename","arguments":{"file":"/user/username/projects/myproject/dependency/FnS.ts","line":2,"offset":17},"seq":9,"type":"request"}
Info 106  [16:03:25.000] Search path: /user/username/projects/myproject/dependency
Info 107  [16:03:26.000] For info: /user/username/projects/myproject/dependency/FnS.ts :: Config file name: /user/username/projects/myproject/dependency/tsconfig.json
Info 108  [16:03:27.000] response:{"response":{"info":{"canRename":true,"displayName":"fn2","fullDisplayName":"\"/user/username/projects/myproject/dependency/FnS\".fn2","kind":"function","kindModifiers":"export","triggerSpan":{"start":{"line":2,"offset":17},"end":{"line":2,"offset":20}}},"locs":[{"file":"/user/username/projects/myproject/dependency/FnS.ts","locs":[{"start":{"line":2,"offset":17},"end":{"line":2,"offset":20},"contextStart":{"line":2,"offset":1},"contextEnd":{"line":2,"offset":26}}]},{"file":"/user/username/projects/myproject/main/main.ts","locs":[{"start":{"line":3,"offset":5},"end":{"line":3,"offset":8},"contextStart":{"line":1,"offset":1},"contextEnd":{"line":7,"offset":22}},{"start":{"line":10,"offset":1},"end":{"line":10,"offset":4}}]}]},"responseRequired":true}
Info 109  [16:03:28.000] request:{"command":"rename","arguments":{"file":"/user/username/projects/myproject/dependency/FnS.ts","line":3,"offset":17},"seq":10,"type":"request"}
Info 110  [16:03:29.000] Search path: /user/username/projects/myproject/dependency
Info 111  [16:03:30.000] For info: /user/username/projects/myproject/dependency/FnS.ts :: Config file name: /user/username/projects/myproject/dependency/tsconfig.json
Info 112  [16:03:31.000] response:{"response":{"info":{"canRename":true,"displayName":"fn3","fullDisplayName":"\"/user/username/projects/myproject/dependency/FnS\".fn3","kind":"function","kindModifiers":"export","triggerSpan":{"start":{"line":3,"offset":17},"end":{"line":3,"offset":20}}},"locs":[{"file":"/user/username/projects/myproject/dependency/FnS.ts","locs":[{"start":{"line":3,"offset":17},"end":{"line":3,"offset":20},"contextStart":{"line":3,"offset":1},"contextEnd":{"line":3,"offset":26}}]},{"file":"/user/username/projects/myproject/main/main.ts","locs":[{"start":{"line":4,"offset":5},"end":{"line":4,"offset":8},"contextStart":{"line":1,"offset":1},"contextEnd":{"line":7,"offset":22}},{"start":{"line":11,"offset":1},"end":{"line":11,"offset":4}}]}]},"responseRequired":true}
Info 113  [16:03:32.000] request:{"command":"rename","arguments":{"file":"/user/username/projects/myproject/dependency/FnS.ts","line":4,"offset":17},"seq":11,"type":"request"}
Info 114  [16:03:33.000] Search path: /user/username/projects/myproject/dependency
Info 115  [16:03:34.000] For info: /user/username/projects/myproject/dependency/FnS.ts :: Config file name: /user/username/projects/myproject/dependency/tsconfig.json
Info 116  [16:03:35.000] response:{"response":{"info":{"canRename":true,"displayName":"fn4","fullDisplayName":"\"/user/username/projects/myproject/dependency/FnS\".fn4","kind":"function","kindModifiers":"export","triggerSpan":{"start":{"line":4,"offset":17},"end":{"line":4,"offset":20}}},"locs":[{"file":"/user/username/projects/myproject/dependency/FnS.ts","locs":[{"start":{"line":4,"offset":17},"end":{"line":4,"offset":20},"contextStart":{"line":4,"offset":1},"contextEnd":{"line":4,"offset":26}}]},{"file":"/user/username/projects/myproject/main/main.ts","locs":[{"start":{"line":5,"offset":5},"end":{"line":5,"offset":8},"contextStart":{"line":1,"offset":1},"contextEnd":{"line":7,"offset":22}},{"start":{"line":12,"offset":1},"end":{"line":12,"offset":4}}]}]},"responseRequired":true}
Info 117  [16:03:36.000] request:{"command":"rename","arguments":{"file":"/user/username/projects/myproject/dependency/FnS.ts","line":5,"offset":17},"seq":12,"type":"request"}
Info 118  [16:03:37.000] Search path: /user/username/projects/myproject/dependency
Info 119  [16:03:38.000] For info: /user/username/projects/myproject/dependency/FnS.ts :: Config file name: /user/username/projects/myproject/dependency/tsconfig.json
Info 120  [16:03:39.000] response:{"response":{"info":{"canRename":true,"displayName":"fn5","fullDisplayName":"\"/user/username/projects/myproject/dependency/FnS\".fn5","kind":"function","kindModifiers":"export","triggerSpan":{"start":{"line":5,"offset":17},"end":{"line":5,"offset":20}}},"locs":[{"file":"/user/username/projects/myproject/dependency/FnS.ts","locs":[{"start":{"line":5,"offset":17},"end":{"line":5,"offset":20},"contextStart":{"line":5,"offset":1},"contextEnd":{"line":5,"offset":26}}]},{"file":"/user/username/projects/myproject/main/main.ts","locs":[{"start":{"line":6,"offset":5},"end":{"line":6,"offset":8},"contextStart":{"line":1,"offset":1},"contextEnd":{"line":7,"offset":22}},{"start":{"line":13,"offset":1},"end":{"line":13,"offset":4}}]}]},"responseRequired":true}
Info 121  [16:03:40.000] request:{"seq":0,"type":"request","command":"close","arguments":{"file":"/user/username/projects/myproject/random/random.ts"}}
Info 122  [16:03:41.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/random/random.ts 500 undefined WatchType: Closed Script info
Info 123  [16:03:42.000] Project '/user/username/projects/myproject/main/tsconfig.json' (Configured)
Info 123  [16:03:43.000] 	Files (3)

Info 123  [16:03:44.000] -----------------------------------------------
Info 123  [16:03:45.000] Project '/user/username/projects/myproject/dependency/tsconfig.json' (Configured)
Info 123  [16:03:46.000] 	Files (2)

Info 123  [16:03:47.000] -----------------------------------------------
Info 123  [16:03:48.000] Project '/user/username/projects/myproject/random/tsconfig.json' (Configured)
Info 123  [16:03:49.000] 	Files (2)

Info 123  [16:03:50.000] -----------------------------------------------
Info 123  [16:03:51.000] Open files: 
Info 123  [16:03:52.000] 	FileName: /user/username/projects/myproject/main/main.ts ProjectRootPath: undefined
Info 123  [16:03:53.000] 		Projects: /user/username/projects/myproject/main/tsconfig.json
Info 123  [16:03:54.000] 	FileName: /user/username/projects/myproject/dependency/FnS.ts ProjectRootPath: undefined
Info 123  [16:03:55.000] 		Projects: /user/username/projects/myproject/dependency/tsconfig.json
Info 123  [16:03:56.000] response:{"responseRequired":false}
Info 124  [16:03:57.000] request:{"seq":0,"type":"request","command":"open","arguments":{"file":"/user/username/projects/myproject/random/random.ts"}}
Info 125  [16:03:58.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/random/random.ts 500 undefined WatchType: Closed Script info
Info 126  [16:03:59.000] Search path: /user/username/projects/myproject/random
Info 127  [16:04:00.000] For info: /user/username/projects/myproject/random/random.ts :: Config file name: /user/username/projects/myproject/random/tsconfig.json
Info 128  [16:04:01.000] Project '/user/username/projects/myproject/main/tsconfig.json' (Configured)
Info 128  [16:04:02.000] 	Files (3)

Info 128  [16:04:03.000] -----------------------------------------------
Info 128  [16:04:04.000] Project '/user/username/projects/myproject/dependency/tsconfig.json' (Configured)
Info 128  [16:04:05.000] 	Files (2)

Info 128  [16:04:06.000] -----------------------------------------------
Info 128  [16:04:07.000] Project '/user/username/projects/myproject/random/tsconfig.json' (Configured)
Info 128  [16:04:08.000] 	Files (2)

Info 128  [16:04:09.000] -----------------------------------------------
Info 128  [16:04:10.000] Open files: 
Info 128  [16:04:11.000] 	FileName: /user/username/projects/myproject/main/main.ts ProjectRootPath: undefined
Info 128  [16:04:12.000] 		Projects: /user/username/projects/myproject/main/tsconfig.json
Info 128  [16:04:13.000] 	FileName: /user/username/projects/myproject/dependency/FnS.ts ProjectRootPath: undefined
Info 128  [16:04:14.000] 		Projects: /user/username/projects/myproject/dependency/tsconfig.json
Info 128  [16:04:15.000] 	FileName: /user/username/projects/myproject/random/random.ts ProjectRootPath: undefined
Info 128  [16:04:16.000] 		Projects: /user/username/projects/myproject/random/tsconfig.json
Info 128  [16:04:17.000] response:{"responseRequired":false}
Info 129  [16:04:18.000] request:{"seq":0,"type":"request","command":"close","arguments":{"file":"/user/username/projects/myproject/main/main.ts"}}
Info 130  [16:04:19.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/main/main.ts 500 undefined WatchType: Closed Script info
Info 131  [16:04:20.000] Project '/user/username/projects/myproject/main/tsconfig.json' (Configured)
Info 131  [16:04:21.000] 	Files (3)

Info 131  [16:04:22.000] -----------------------------------------------
Info 131  [16:04:23.000] Project '/user/username/projects/myproject/dependency/tsconfig.json' (Configured)
Info 131  [16:04:24.000] 	Files (2)

Info 131  [16:04:25.000] -----------------------------------------------
Info 131  [16:04:26.000] Project '/user/username/projects/myproject/random/tsconfig.json' (Configured)
Info 131  [16:04:27.000] 	Files (2)

Info 131  [16:04:28.000] -----------------------------------------------
Info 131  [16:04:29.000] Open files: 
Info 131  [16:04:30.000] 	FileName: /user/username/projects/myproject/dependency/FnS.ts ProjectRootPath: undefined
Info 131  [16:04:31.000] 		Projects: /user/username/projects/myproject/dependency/tsconfig.json
Info 131  [16:04:32.000] 	FileName: /user/username/projects/myproject/random/random.ts ProjectRootPath: undefined
Info 131  [16:04:33.000] 		Projects: /user/username/projects/myproject/random/tsconfig.json
Info 131  [16:04:34.000] response:{"responseRequired":false}
Info 132  [16:04:35.000] request:{"seq":0,"type":"request","command":"close","arguments":{"file":"/user/username/projects/myproject/dependency/FnS.ts"}}
Info 133  [16:04:36.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/dependency/FnS.ts 500 undefined WatchType: Closed Script info
Info 134  [16:04:37.000] Project '/user/username/projects/myproject/main/tsconfig.json' (Configured)
Info 134  [16:04:38.000] 	Files (3)

Info 134  [16:04:39.000] -----------------------------------------------
Info 134  [16:04:40.000] Project '/user/username/projects/myproject/dependency/tsconfig.json' (Configured)
Info 134  [16:04:41.000] 	Files (2)

Info 134  [16:04:42.000] -----------------------------------------------
Info 134  [16:04:43.000] Project '/user/username/projects/myproject/random/tsconfig.json' (Configured)
Info 134  [16:04:44.000] 	Files (2)

Info 134  [16:04:45.000] -----------------------------------------------
Info 134  [16:04:46.000] Open files: 
Info 134  [16:04:47.000] 	FileName: /user/username/projects/myproject/random/random.ts ProjectRootPath: undefined
Info 134  [16:04:48.000] 		Projects: /user/username/projects/myproject/random/tsconfig.json
Info 134  [16:04:49.000] response:{"responseRequired":false}
Info 135  [16:04:50.000] request:{"seq":0,"type":"request","command":"close","arguments":{"file":"/user/username/projects/myproject/random/random.ts"}}
Info 136  [16:04:51.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/random/random.ts 500 undefined WatchType: Closed Script info
Info 137  [16:04:52.000] Project '/user/username/projects/myproject/main/tsconfig.json' (Configured)
Info 137  [16:04:53.000] 	Files (3)

Info 137  [16:04:54.000] -----------------------------------------------
Info 137  [16:04:55.000] Project '/user/username/projects/myproject/dependency/tsconfig.json' (Configured)
Info 137  [16:04:56.000] 	Files (2)

Info 137  [16:04:57.000] -----------------------------------------------
Info 137  [16:04:58.000] Project '/user/username/projects/myproject/random/tsconfig.json' (Configured)
Info 137  [16:04:59.000] 	Files (2)

Info 137  [16:05:00.000] -----------------------------------------------
Info 137  [16:05:01.000] Open files: 
Info 137  [16:05:02.000] response:{"responseRequired":false}
Info 138  [16:05:03.000] request:{"seq":0,"type":"request","command":"open","arguments":{"file":"/user/username/projects/myproject/random/random.ts"}}
Info 139  [16:05:04.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/random/random.ts 500 undefined WatchType: Closed Script info
Info 140  [16:05:05.000] Search path: /user/username/projects/myproject/random
Info 141  [16:05:06.000] For info: /user/username/projects/myproject/random/random.ts :: Config file name: /user/username/projects/myproject/random/tsconfig.json
Info 142  [16:05:07.000] `remove Project::
Info 143  [16:05:08.000] Project '/user/username/projects/myproject/main/tsconfig.json' (Configured)
Info 144  [16:05:09.000] 	Files (3)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/decls/fns.d.ts
	/user/username/projects/myproject/main/main.ts


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	../decls/fns.d.ts
	  Imported via '../decls/fns' from file 'main.ts'
	main.ts
	  Matched by default include pattern '**/*'

Info 145  [16:05:10.000] -----------------------------------------------
Info 146  [16:05:11.000] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/main 1 undefined Config: /user/username/projects/myproject/main/tsconfig.json WatchType: Wild card directory
Info 147  [16:05:12.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/main 1 undefined Config: /user/username/projects/myproject/main/tsconfig.json WatchType: Wild card directory
Info 148  [16:05:13.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/main/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/main/tsconfig.json WatchType: Config file
Info 149  [16:05:14.000] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/decls 1 undefined Project: /user/username/projects/myproject/main/tsconfig.json WatchType: Failed Lookup Locations
Info 150  [16:05:15.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/decls 1 undefined Project: /user/username/projects/myproject/main/tsconfig.json WatchType: Failed Lookup Locations
Info 151  [16:05:16.000] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/main/node_modules/@types 1 undefined Project: /user/username/projects/myproject/main/tsconfig.json WatchType: Type roots
Info 152  [16:05:17.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/main/node_modules/@types 1 undefined Project: /user/username/projects/myproject/main/tsconfig.json WatchType: Type roots
Info 153  [16:05:18.000] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/main/tsconfig.json WatchType: Type roots
Info 154  [16:05:19.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/main/tsconfig.json WatchType: Type roots
Info 155  [16:05:20.000] `remove Project::
Info 156  [16:05:21.000] Project '/user/username/projects/myproject/dependency/tsconfig.json' (Configured)
Info 157  [16:05:22.000] 	Files (2)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/dependency/FnS.ts


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	FnS.ts
	  Matched by default include pattern '**/*'

Info 158  [16:05:23.000] -----------------------------------------------
Info 159  [16:05:24.000] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/dependency 1 undefined Config: /user/username/projects/myproject/dependency/tsconfig.json WatchType: Wild card directory
Info 160  [16:05:25.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/dependency 1 undefined Config: /user/username/projects/myproject/dependency/tsconfig.json WatchType: Wild card directory
Info 161  [16:05:26.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/dependency/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/main/tsconfig.json WatchType: Config file
Info 162  [16:05:27.000] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/dependency/node_modules/@types 1 undefined Project: /user/username/projects/myproject/dependency/tsconfig.json WatchType: Type roots
Info 163  [16:05:28.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/dependency/node_modules/@types 1 undefined Project: /user/username/projects/myproject/dependency/tsconfig.json WatchType: Type roots
Info 164  [16:05:29.000] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/dependency/tsconfig.json WatchType: Type roots
Info 165  [16:05:30.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/dependency/tsconfig.json WatchType: Type roots
Info 166  [16:05:31.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/decls/FnS.d.ts 2000 undefined Project: /user/username/projects/myproject/dependency/tsconfig.json WatchType: Missing generated file
Info 167  [16:05:32.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/main/main.ts 500 undefined WatchType: Closed Script info
Info 168  [16:05:33.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/dependency/FnS.ts 500 undefined WatchType: Closed Script info
Info 169  [16:05:34.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/decls/fns.d.ts 500 undefined WatchType: Closed Script info
Info 170  [16:05:35.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/decls/FnS.d.ts.map 500 undefined WatchType: Closed Script info
Info 171  [16:05:36.000] Project '/user/username/projects/myproject/random/tsconfig.json' (Configured)
Info 171  [16:05:37.000] 	Files (2)

Info 171  [16:05:38.000] -----------------------------------------------
Info 171  [16:05:39.000] Open files: 
Info 171  [16:05:40.000] 	FileName: /user/username/projects/myproject/random/random.ts ProjectRootPath: undefined
Info 171  [16:05:41.000] 		Projects: /user/username/projects/myproject/random/tsconfig.json
Info 171  [16:05:42.000] response:{"responseRequired":false}