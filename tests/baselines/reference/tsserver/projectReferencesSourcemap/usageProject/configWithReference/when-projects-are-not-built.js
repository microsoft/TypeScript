Info 0    [16:00:35.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Info 1    [16:00:36.000] request:{"seq":0,"type":"request","command":"open","arguments":{"file":"/user/username/projects/myproject/main/main.ts"}}
Info 2    [16:00:37.000] Search path: /user/username/projects/myproject/main
Info 3    [16:00:38.000] For info: /user/username/projects/myproject/main/main.ts :: Config file name: /user/username/projects/myproject/main/tsconfig.json
Info 4    [16:00:39.000] Creating configuration project /user/username/projects/myproject/main/tsconfig.json
Info 5    [16:00:40.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/main/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/main/tsconfig.json WatchType: Config file
Info 6    [16:00:41.000] Config: /user/username/projects/myproject/main/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/main/main.ts"
 ],
 "options": {
  "composite": true,
  "declarationMap": true,
  "configFilePath": "/user/username/projects/myproject/main/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/user/username/projects/myproject/dependency",
   "originalPath": "../dependency"
  }
 ]
}
Info 7    [16:00:42.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/main 1 undefined Config: /user/username/projects/myproject/main/tsconfig.json WatchType: Wild card directory
Info 8    [16:00:43.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/main 1 undefined Config: /user/username/projects/myproject/main/tsconfig.json WatchType: Wild card directory
Info 9    [16:00:44.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 10   [16:00:45.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/main/tsconfig.json
Info 11   [16:00:46.000] Config: /user/username/projects/myproject/dependency/tsconfig.json : {
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
Info 12   [16:00:47.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/dependency/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/main/tsconfig.json WatchType: Config file
Info 13   [16:00:48.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/dependency 1 undefined Config: /user/username/projects/myproject/dependency/tsconfig.json WatchType: Wild card directory
Info 14   [16:00:49.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/dependency 1 undefined Config: /user/username/projects/myproject/dependency/tsconfig.json WatchType: Wild card directory
Info 15   [16:00:50.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/decls 1 undefined Project: /user/username/projects/myproject/main/tsconfig.json WatchType: Failed Lookup Locations
Info 16   [16:00:51.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/decls 1 undefined Project: /user/username/projects/myproject/main/tsconfig.json WatchType: Failed Lookup Locations
Info 17   [16:00:52.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/dependency/FnS.ts 500 undefined WatchType: Closed Script info
Info 18   [16:00:53.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 19   [16:00:54.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/main/node_modules/@types 1 undefined Project: /user/username/projects/myproject/main/tsconfig.json WatchType: Type roots
Info 20   [16:00:55.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/main/node_modules/@types 1 undefined Project: /user/username/projects/myproject/main/tsconfig.json WatchType: Type roots
Info 21   [16:00:56.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/main/tsconfig.json WatchType: Type roots
Info 22   [16:00:57.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/main/tsconfig.json WatchType: Type roots
Info 23   [16:00:58.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/main/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 24   [16:00:59.000] Project '/user/username/projects/myproject/main/tsconfig.json' (Configured)
Info 25   [16:01:00.000] 	Files (3)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/dependency/FnS.ts
	/user/username/projects/myproject/main/main.ts


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	../dependency/FnS.ts
	  Imported via '../decls/fns' from file 'main.ts'
	main.ts
	  Matched by default include pattern '**/*'

Info 26   [16:01:01.000] -----------------------------------------------
Info 27   [16:01:02.000] Search path: /user/username/projects/myproject/main
Info 28   [16:01:03.000] For info: /user/username/projects/myproject/main/tsconfig.json :: No config files found.
Info 29   [16:01:04.000] Project '/user/username/projects/myproject/main/tsconfig.json' (Configured)
Info 29   [16:01:05.000] 	Files (3)

Info 29   [16:01:06.000] -----------------------------------------------
Info 29   [16:01:07.000] Open files: 
Info 29   [16:01:08.000] 	FileName: /user/username/projects/myproject/main/main.ts ProjectRootPath: undefined
Info 29   [16:01:09.000] 		Projects: /user/username/projects/myproject/main/tsconfig.json
Info 29   [16:01:10.000] response:{"responseRequired":false}
Info 30   [16:01:11.000] request:{"seq":0,"type":"request","command":"open","arguments":{"file":"/user/username/projects/myproject/random/random.ts"}}
Info 31   [16:01:12.000] Search path: /user/username/projects/myproject/random
Info 32   [16:01:13.000] For info: /user/username/projects/myproject/random/random.ts :: Config file name: /user/username/projects/myproject/random/tsconfig.json
Info 33   [16:01:14.000] Creating configuration project /user/username/projects/myproject/random/tsconfig.json
Info 34   [16:01:15.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/random/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/random/tsconfig.json WatchType: Config file
Info 35   [16:01:16.000] Config: /user/username/projects/myproject/random/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/random/random.ts"
 ],
 "options": {
  "configFilePath": "/user/username/projects/myproject/random/tsconfig.json"
 }
}
Info 36   [16:01:17.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/random 1 undefined Config: /user/username/projects/myproject/random/tsconfig.json WatchType: Wild card directory
Info 37   [16:01:18.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/random 1 undefined Config: /user/username/projects/myproject/random/tsconfig.json WatchType: Wild card directory
Info 38   [16:01:19.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 39   [16:01:20.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/random/tsconfig.json
Info 40   [16:01:21.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/random/node_modules/@types 1 undefined Project: /user/username/projects/myproject/random/tsconfig.json WatchType: Type roots
Info 41   [16:01:22.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/random/node_modules/@types 1 undefined Project: /user/username/projects/myproject/random/tsconfig.json WatchType: Type roots
Info 42   [16:01:23.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/random/tsconfig.json WatchType: Type roots
Info 43   [16:01:24.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/random/tsconfig.json WatchType: Type roots
Info 44   [16:01:25.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/random/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 45   [16:01:26.000] Project '/user/username/projects/myproject/random/tsconfig.json' (Configured)
Info 46   [16:01:27.000] 	Files (2)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/random/random.ts


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	random.ts
	  Matched by default include pattern '**/*'

Info 47   [16:01:28.000] -----------------------------------------------
Info 48   [16:01:29.000] Project '/user/username/projects/myproject/main/tsconfig.json' (Configured)
Info 48   [16:01:30.000] 	Files (3)

Info 48   [16:01:31.000] -----------------------------------------------
Info 48   [16:01:32.000] Project '/user/username/projects/myproject/random/tsconfig.json' (Configured)
Info 48   [16:01:33.000] 	Files (2)

Info 48   [16:01:34.000] -----------------------------------------------
Info 48   [16:01:35.000] Open files: 
Info 48   [16:01:36.000] 	FileName: /user/username/projects/myproject/main/main.ts ProjectRootPath: undefined
Info 48   [16:01:37.000] 		Projects: /user/username/projects/myproject/main/tsconfig.json
Info 48   [16:01:38.000] 	FileName: /user/username/projects/myproject/random/random.ts ProjectRootPath: undefined
Info 48   [16:01:39.000] 		Projects: /user/username/projects/myproject/random/tsconfig.json
Info 48   [16:01:40.000] response:{"responseRequired":false}
Info 49   [16:01:41.000] request:{"command":"definitionAndBoundSpan","arguments":{"file":"/user/username/projects/myproject/main/main.ts","line":9,"offset":1},"seq":1,"type":"request"}
Info 50   [16:01:42.000] response:{"response":{"definitions":[{"file":"/user/username/projects/myproject/dependency/FnS.ts","start":{"line":1,"offset":17},"end":{"line":1,"offset":20},"contextStart":{"line":1,"offset":1},"contextEnd":{"line":1,"offset":26}}],"textSpan":{"start":{"line":9,"offset":1},"end":{"line":9,"offset":4}}},"responseRequired":true}
Info 51   [16:01:43.000] request:{"command":"definitionAndBoundSpan","arguments":{"file":"/user/username/projects/myproject/main/main.ts","line":10,"offset":1},"seq":2,"type":"request"}
Info 52   [16:01:44.000] response:{"response":{"definitions":[{"file":"/user/username/projects/myproject/dependency/FnS.ts","start":{"line":2,"offset":17},"end":{"line":2,"offset":20},"contextStart":{"line":2,"offset":1},"contextEnd":{"line":2,"offset":26}}],"textSpan":{"start":{"line":10,"offset":1},"end":{"line":10,"offset":4}}},"responseRequired":true}
Info 53   [16:01:45.000] request:{"command":"definitionAndBoundSpan","arguments":{"file":"/user/username/projects/myproject/main/main.ts","line":11,"offset":1},"seq":3,"type":"request"}
Info 54   [16:01:46.000] response:{"response":{"definitions":[{"file":"/user/username/projects/myproject/dependency/FnS.ts","start":{"line":3,"offset":17},"end":{"line":3,"offset":20},"contextStart":{"line":3,"offset":1},"contextEnd":{"line":3,"offset":26}}],"textSpan":{"start":{"line":11,"offset":1},"end":{"line":11,"offset":4}}},"responseRequired":true}
Info 55   [16:01:47.000] request:{"command":"definitionAndBoundSpan","arguments":{"file":"/user/username/projects/myproject/main/main.ts","line":12,"offset":1},"seq":4,"type":"request"}
Info 56   [16:01:48.000] response:{"response":{"definitions":[{"file":"/user/username/projects/myproject/dependency/FnS.ts","start":{"line":4,"offset":17},"end":{"line":4,"offset":20},"contextStart":{"line":4,"offset":1},"contextEnd":{"line":4,"offset":26}}],"textSpan":{"start":{"line":12,"offset":1},"end":{"line":12,"offset":4}}},"responseRequired":true}
Info 57   [16:01:49.000] request:{"command":"definitionAndBoundSpan","arguments":{"file":"/user/username/projects/myproject/main/main.ts","line":13,"offset":1},"seq":5,"type":"request"}
Info 58   [16:01:50.000] response:{"response":{"definitions":[{"file":"/user/username/projects/myproject/dependency/FnS.ts","start":{"line":5,"offset":17},"end":{"line":5,"offset":20},"contextStart":{"line":5,"offset":1},"contextEnd":{"line":5,"offset":26}}],"textSpan":{"start":{"line":13,"offset":1},"end":{"line":13,"offset":4}}},"responseRequired":true}
Info 59   [16:01:51.000] request:{"seq":0,"type":"request","command":"close","arguments":{"file":"/user/username/projects/myproject/random/random.ts"}}
Info 60   [16:01:52.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/random/random.ts 500 undefined WatchType: Closed Script info
Info 61   [16:01:53.000] Project '/user/username/projects/myproject/main/tsconfig.json' (Configured)
Info 61   [16:01:54.000] 	Files (3)

Info 61   [16:01:55.000] -----------------------------------------------
Info 61   [16:01:56.000] Project '/user/username/projects/myproject/random/tsconfig.json' (Configured)
Info 61   [16:01:57.000] 	Files (2)

Info 61   [16:01:58.000] -----------------------------------------------
Info 61   [16:01:59.000] Open files: 
Info 61   [16:02:00.000] 	FileName: /user/username/projects/myproject/main/main.ts ProjectRootPath: undefined
Info 61   [16:02:01.000] 		Projects: /user/username/projects/myproject/main/tsconfig.json
Info 61   [16:02:02.000] response:{"responseRequired":false}
Info 62   [16:02:03.000] request:{"seq":0,"type":"request","command":"open","arguments":{"file":"/user/username/projects/myproject/random/random.ts"}}
Info 63   [16:02:04.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/random/random.ts 500 undefined WatchType: Closed Script info
Info 64   [16:02:05.000] Search path: /user/username/projects/myproject/random
Info 65   [16:02:06.000] For info: /user/username/projects/myproject/random/random.ts :: Config file name: /user/username/projects/myproject/random/tsconfig.json
Info 66   [16:02:07.000] Project '/user/username/projects/myproject/main/tsconfig.json' (Configured)
Info 66   [16:02:08.000] 	Files (3)

Info 66   [16:02:09.000] -----------------------------------------------
Info 66   [16:02:10.000] Project '/user/username/projects/myproject/random/tsconfig.json' (Configured)
Info 66   [16:02:11.000] 	Files (2)

Info 66   [16:02:12.000] -----------------------------------------------
Info 66   [16:02:13.000] Open files: 
Info 66   [16:02:14.000] 	FileName: /user/username/projects/myproject/main/main.ts ProjectRootPath: undefined
Info 66   [16:02:15.000] 		Projects: /user/username/projects/myproject/main/tsconfig.json
Info 66   [16:02:16.000] 	FileName: /user/username/projects/myproject/random/random.ts ProjectRootPath: undefined
Info 66   [16:02:17.000] 		Projects: /user/username/projects/myproject/random/tsconfig.json
Info 66   [16:02:18.000] response:{"responseRequired":false}
Info 67   [16:02:19.000] request:{"seq":0,"type":"request","command":"close","arguments":{"file":"/user/username/projects/myproject/main/main.ts"}}
Info 68   [16:02:20.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/main/main.ts 500 undefined WatchType: Closed Script info
Info 69   [16:02:21.000] Project '/user/username/projects/myproject/main/tsconfig.json' (Configured)
Info 69   [16:02:22.000] 	Files (3)

Info 69   [16:02:23.000] -----------------------------------------------
Info 69   [16:02:24.000] Project '/user/username/projects/myproject/random/tsconfig.json' (Configured)
Info 69   [16:02:25.000] 	Files (2)

Info 69   [16:02:26.000] -----------------------------------------------
Info 69   [16:02:27.000] Open files: 
Info 69   [16:02:28.000] 	FileName: /user/username/projects/myproject/random/random.ts ProjectRootPath: undefined
Info 69   [16:02:29.000] 		Projects: /user/username/projects/myproject/random/tsconfig.json
Info 69   [16:02:30.000] response:{"responseRequired":false}
Info 70   [16:02:31.000] request:{"seq":0,"type":"request","command":"close","arguments":{"file":"/user/username/projects/myproject/random/random.ts"}}
Info 71   [16:02:32.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/random/random.ts 500 undefined WatchType: Closed Script info
Info 72   [16:02:33.000] Project '/user/username/projects/myproject/main/tsconfig.json' (Configured)
Info 72   [16:02:34.000] 	Files (3)

Info 72   [16:02:35.000] -----------------------------------------------
Info 72   [16:02:36.000] Project '/user/username/projects/myproject/random/tsconfig.json' (Configured)
Info 72   [16:02:37.000] 	Files (2)

Info 72   [16:02:38.000] -----------------------------------------------
Info 72   [16:02:39.000] Open files: 
Info 72   [16:02:40.000] response:{"responseRequired":false}
Info 73   [16:02:41.000] request:{"seq":0,"type":"request","command":"open","arguments":{"file":"/user/username/projects/myproject/random/random.ts"}}
Info 74   [16:02:42.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/random/random.ts 500 undefined WatchType: Closed Script info
Info 75   [16:02:43.000] Search path: /user/username/projects/myproject/random
Info 76   [16:02:44.000] For info: /user/username/projects/myproject/random/random.ts :: Config file name: /user/username/projects/myproject/random/tsconfig.json
Info 77   [16:02:45.000] `remove Project::
Info 78   [16:02:46.000] Project '/user/username/projects/myproject/main/tsconfig.json' (Configured)
Info 79   [16:02:47.000] 	Files (3)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/dependency/FnS.ts
	/user/username/projects/myproject/main/main.ts


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	../dependency/FnS.ts
	  Imported via '../decls/fns' from file 'main.ts'
	main.ts
	  Matched by default include pattern '**/*'

Info 80   [16:02:48.000] -----------------------------------------------
Info 81   [16:02:49.000] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/main 1 undefined Config: /user/username/projects/myproject/main/tsconfig.json WatchType: Wild card directory
Info 82   [16:02:50.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/main 1 undefined Config: /user/username/projects/myproject/main/tsconfig.json WatchType: Wild card directory
Info 83   [16:02:51.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/main/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/main/tsconfig.json WatchType: Config file
Info 84   [16:02:52.000] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/dependency 1 undefined Config: /user/username/projects/myproject/dependency/tsconfig.json WatchType: Wild card directory
Info 85   [16:02:53.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/dependency 1 undefined Config: /user/username/projects/myproject/dependency/tsconfig.json WatchType: Wild card directory
Info 86   [16:02:54.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/dependency/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/main/tsconfig.json WatchType: Config file
Info 87   [16:02:55.000] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/decls 1 undefined Project: /user/username/projects/myproject/main/tsconfig.json WatchType: Failed Lookup Locations
Info 88   [16:02:56.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/decls 1 undefined Project: /user/username/projects/myproject/main/tsconfig.json WatchType: Failed Lookup Locations
Info 89   [16:02:57.000] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/main/node_modules/@types 1 undefined Project: /user/username/projects/myproject/main/tsconfig.json WatchType: Type roots
Info 90   [16:02:58.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/main/node_modules/@types 1 undefined Project: /user/username/projects/myproject/main/tsconfig.json WatchType: Type roots
Info 91   [16:02:59.000] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/main/tsconfig.json WatchType: Type roots
Info 92   [16:03:00.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/main/tsconfig.json WatchType: Type roots
Info 93   [16:03:01.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/main/main.ts 500 undefined WatchType: Closed Script info
Info 94   [16:03:02.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/dependency/FnS.ts 500 undefined WatchType: Closed Script info
Info 95   [16:03:03.000] Project '/user/username/projects/myproject/random/tsconfig.json' (Configured)
Info 95   [16:03:04.000] 	Files (2)

Info 95   [16:03:05.000] -----------------------------------------------
Info 95   [16:03:06.000] Open files: 
Info 95   [16:03:07.000] 	FileName: /user/username/projects/myproject/random/random.ts ProjectRootPath: undefined
Info 95   [16:03:08.000] 		Projects: /user/username/projects/myproject/random/tsconfig.json
Info 95   [16:03:09.000] response:{"responseRequired":false}