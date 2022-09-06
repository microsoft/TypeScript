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
Info 30   [16:01:11.000] request:{"seq":0,"type":"request","command":"open","arguments":{"file":"/user/username/projects/myproject/dependency/FnS.ts"}}
Info 31   [16:01:12.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/dependency/FnS.ts 500 undefined WatchType: Closed Script info
Info 32   [16:01:13.000] Search path: /user/username/projects/myproject/dependency
Info 33   [16:01:14.000] For info: /user/username/projects/myproject/dependency/FnS.ts :: Config file name: /user/username/projects/myproject/dependency/tsconfig.json
Info 34   [16:01:15.000] Creating configuration project /user/username/projects/myproject/dependency/tsconfig.json
Info 35   [16:01:16.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 36   [16:01:17.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/dependency/tsconfig.json
Info 37   [16:01:18.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/dependency/node_modules/@types 1 undefined Project: /user/username/projects/myproject/dependency/tsconfig.json WatchType: Type roots
Info 38   [16:01:19.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/dependency/node_modules/@types 1 undefined Project: /user/username/projects/myproject/dependency/tsconfig.json WatchType: Type roots
Info 39   [16:01:20.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/dependency/tsconfig.json WatchType: Type roots
Info 40   [16:01:21.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/dependency/tsconfig.json WatchType: Type roots
Info 41   [16:01:22.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/dependency/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 42   [16:01:23.000] Project '/user/username/projects/myproject/dependency/tsconfig.json' (Configured)
Info 43   [16:01:24.000] 	Files (2)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/dependency/FnS.ts


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	FnS.ts
	  Matched by default include pattern '**/*'

Info 44   [16:01:25.000] -----------------------------------------------
Info 45   [16:01:26.000] Search path: /user/username/projects/myproject/dependency
Info 46   [16:01:27.000] For info: /user/username/projects/myproject/dependency/tsconfig.json :: No config files found.
Info 47   [16:01:28.000] Project '/user/username/projects/myproject/main/tsconfig.json' (Configured)
Info 47   [16:01:29.000] 	Files (3)

Info 47   [16:01:30.000] -----------------------------------------------
Info 47   [16:01:31.000] Project '/user/username/projects/myproject/dependency/tsconfig.json' (Configured)
Info 47   [16:01:32.000] 	Files (2)

Info 47   [16:01:33.000] -----------------------------------------------
Info 47   [16:01:34.000] Open files: 
Info 47   [16:01:35.000] 	FileName: /user/username/projects/myproject/main/main.ts ProjectRootPath: undefined
Info 47   [16:01:36.000] 		Projects: /user/username/projects/myproject/main/tsconfig.json
Info 47   [16:01:37.000] 	FileName: /user/username/projects/myproject/dependency/FnS.ts ProjectRootPath: undefined
Info 47   [16:01:38.000] 		Projects: /user/username/projects/myproject/main/tsconfig.json,/user/username/projects/myproject/dependency/tsconfig.json
Info 47   [16:01:39.000] response:{"responseRequired":false}
Info 48   [16:01:40.000] request:{"seq":0,"type":"request","command":"open","arguments":{"file":"/user/username/projects/myproject/random/random.ts"}}
Info 49   [16:01:41.000] Search path: /user/username/projects/myproject/random
Info 50   [16:01:42.000] For info: /user/username/projects/myproject/random/random.ts :: Config file name: /user/username/projects/myproject/random/tsconfig.json
Info 51   [16:01:43.000] Creating configuration project /user/username/projects/myproject/random/tsconfig.json
Info 52   [16:01:44.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/random/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/random/tsconfig.json WatchType: Config file
Info 53   [16:01:45.000] Config: /user/username/projects/myproject/random/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/random/random.ts"
 ],
 "options": {
  "configFilePath": "/user/username/projects/myproject/random/tsconfig.json"
 }
}
Info 54   [16:01:46.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/random 1 undefined Config: /user/username/projects/myproject/random/tsconfig.json WatchType: Wild card directory
Info 55   [16:01:47.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/random 1 undefined Config: /user/username/projects/myproject/random/tsconfig.json WatchType: Wild card directory
Info 56   [16:01:48.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 57   [16:01:49.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/random/tsconfig.json
Info 58   [16:01:50.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/random/node_modules/@types 1 undefined Project: /user/username/projects/myproject/random/tsconfig.json WatchType: Type roots
Info 59   [16:01:51.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/random/node_modules/@types 1 undefined Project: /user/username/projects/myproject/random/tsconfig.json WatchType: Type roots
Info 60   [16:01:52.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/random/tsconfig.json WatchType: Type roots
Info 61   [16:01:53.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/random/tsconfig.json WatchType: Type roots
Info 62   [16:01:54.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/random/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 63   [16:01:55.000] Project '/user/username/projects/myproject/random/tsconfig.json' (Configured)
Info 64   [16:01:56.000] 	Files (2)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/random/random.ts


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	random.ts
	  Matched by default include pattern '**/*'

Info 65   [16:01:57.000] -----------------------------------------------
Info 66   [16:01:58.000] Project '/user/username/projects/myproject/main/tsconfig.json' (Configured)
Info 66   [16:01:59.000] 	Files (3)

Info 66   [16:02:00.000] -----------------------------------------------
Info 66   [16:02:01.000] Project '/user/username/projects/myproject/dependency/tsconfig.json' (Configured)
Info 66   [16:02:02.000] 	Files (2)

Info 66   [16:02:03.000] -----------------------------------------------
Info 66   [16:02:04.000] Project '/user/username/projects/myproject/random/tsconfig.json' (Configured)
Info 66   [16:02:05.000] 	Files (2)

Info 66   [16:02:06.000] -----------------------------------------------
Info 66   [16:02:07.000] Open files: 
Info 66   [16:02:08.000] 	FileName: /user/username/projects/myproject/main/main.ts ProjectRootPath: undefined
Info 66   [16:02:09.000] 		Projects: /user/username/projects/myproject/main/tsconfig.json
Info 66   [16:02:10.000] 	FileName: /user/username/projects/myproject/dependency/FnS.ts ProjectRootPath: undefined
Info 66   [16:02:11.000] 		Projects: /user/username/projects/myproject/main/tsconfig.json,/user/username/projects/myproject/dependency/tsconfig.json
Info 66   [16:02:12.000] 	FileName: /user/username/projects/myproject/random/random.ts ProjectRootPath: undefined
Info 66   [16:02:13.000] 		Projects: /user/username/projects/myproject/random/tsconfig.json
Info 66   [16:02:14.000] response:{"responseRequired":false}
Info 67   [16:02:15.000] request:{"command":"definitionAndBoundSpan","arguments":{"file":"/user/username/projects/myproject/main/main.ts","line":9,"offset":1},"seq":1,"type":"request"}
Info 68   [16:02:16.000] response:{"response":{"definitions":[{"file":"/user/username/projects/myproject/dependency/FnS.ts","start":{"line":1,"offset":17},"end":{"line":1,"offset":20},"contextStart":{"line":1,"offset":1},"contextEnd":{"line":1,"offset":26}}],"textSpan":{"start":{"line":9,"offset":1},"end":{"line":9,"offset":4}}},"responseRequired":true}
Info 69   [16:02:17.000] request:{"command":"definitionAndBoundSpan","arguments":{"file":"/user/username/projects/myproject/main/main.ts","line":10,"offset":1},"seq":2,"type":"request"}
Info 70   [16:02:18.000] response:{"response":{"definitions":[{"file":"/user/username/projects/myproject/dependency/FnS.ts","start":{"line":2,"offset":17},"end":{"line":2,"offset":20},"contextStart":{"line":2,"offset":1},"contextEnd":{"line":2,"offset":26}}],"textSpan":{"start":{"line":10,"offset":1},"end":{"line":10,"offset":4}}},"responseRequired":true}
Info 71   [16:02:19.000] request:{"command":"definitionAndBoundSpan","arguments":{"file":"/user/username/projects/myproject/main/main.ts","line":11,"offset":1},"seq":3,"type":"request"}
Info 72   [16:02:20.000] response:{"response":{"definitions":[{"file":"/user/username/projects/myproject/dependency/FnS.ts","start":{"line":3,"offset":17},"end":{"line":3,"offset":20},"contextStart":{"line":3,"offset":1},"contextEnd":{"line":3,"offset":26}}],"textSpan":{"start":{"line":11,"offset":1},"end":{"line":11,"offset":4}}},"responseRequired":true}
Info 73   [16:02:21.000] request:{"command":"definitionAndBoundSpan","arguments":{"file":"/user/username/projects/myproject/main/main.ts","line":12,"offset":1},"seq":4,"type":"request"}
Info 74   [16:02:22.000] response:{"response":{"definitions":[{"file":"/user/username/projects/myproject/dependency/FnS.ts","start":{"line":4,"offset":17},"end":{"line":4,"offset":20},"contextStart":{"line":4,"offset":1},"contextEnd":{"line":4,"offset":26}}],"textSpan":{"start":{"line":12,"offset":1},"end":{"line":12,"offset":4}}},"responseRequired":true}
Info 75   [16:02:23.000] request:{"command":"definitionAndBoundSpan","arguments":{"file":"/user/username/projects/myproject/main/main.ts","line":13,"offset":1},"seq":5,"type":"request"}
Info 76   [16:02:24.000] response:{"response":{"definitions":[{"file":"/user/username/projects/myproject/dependency/FnS.ts","start":{"line":5,"offset":17},"end":{"line":5,"offset":20},"contextStart":{"line":5,"offset":1},"contextEnd":{"line":5,"offset":26}}],"textSpan":{"start":{"line":13,"offset":1},"end":{"line":13,"offset":4}}},"responseRequired":true}
Info 77   [16:02:25.000] request:{"command":"rename","arguments":{"file":"/user/username/projects/myproject/dependency/FnS.ts","line":1,"offset":17},"seq":6,"type":"request"}
Info 78   [16:02:26.000] Search path: /user/username/projects/myproject/dependency
Info 79   [16:02:27.000] For info: /user/username/projects/myproject/dependency/FnS.ts :: Config file name: /user/username/projects/myproject/dependency/tsconfig.json
Info 80   [16:02:28.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/decls/FnS.d.ts 2000 undefined Project: /user/username/projects/myproject/dependency/tsconfig.json WatchType: Missing generated file
Info 81   [16:02:29.000] response:{"response":{"info":{"canRename":true,"displayName":"fn1","fullDisplayName":"\"/user/username/projects/myproject/dependency/FnS\".fn1","kind":"function","kindModifiers":"export","triggerSpan":{"start":{"line":1,"offset":17},"end":{"line":1,"offset":20}}},"locs":[{"file":"/user/username/projects/myproject/dependency/FnS.ts","locs":[{"start":{"line":1,"offset":17},"end":{"line":1,"offset":20},"contextStart":{"line":1,"offset":1},"contextEnd":{"line":1,"offset":26}}]},{"file":"/user/username/projects/myproject/main/main.ts","locs":[{"start":{"line":2,"offset":5},"end":{"line":2,"offset":8},"contextStart":{"line":1,"offset":1},"contextEnd":{"line":7,"offset":22}},{"start":{"line":9,"offset":1},"end":{"line":9,"offset":4}}]}]},"responseRequired":true}
Info 82   [16:02:30.000] request:{"command":"rename","arguments":{"file":"/user/username/projects/myproject/dependency/FnS.ts","line":2,"offset":17},"seq":7,"type":"request"}
Info 83   [16:02:31.000] Search path: /user/username/projects/myproject/dependency
Info 84   [16:02:32.000] For info: /user/username/projects/myproject/dependency/FnS.ts :: Config file name: /user/username/projects/myproject/dependency/tsconfig.json
Info 85   [16:02:33.000] response:{"response":{"info":{"canRename":true,"displayName":"fn2","fullDisplayName":"\"/user/username/projects/myproject/dependency/FnS\".fn2","kind":"function","kindModifiers":"export","triggerSpan":{"start":{"line":2,"offset":17},"end":{"line":2,"offset":20}}},"locs":[{"file":"/user/username/projects/myproject/dependency/FnS.ts","locs":[{"start":{"line":2,"offset":17},"end":{"line":2,"offset":20},"contextStart":{"line":2,"offset":1},"contextEnd":{"line":2,"offset":26}}]},{"file":"/user/username/projects/myproject/main/main.ts","locs":[{"start":{"line":3,"offset":5},"end":{"line":3,"offset":8},"contextStart":{"line":1,"offset":1},"contextEnd":{"line":7,"offset":22}},{"start":{"line":10,"offset":1},"end":{"line":10,"offset":4}}]}]},"responseRequired":true}
Info 86   [16:02:34.000] request:{"command":"rename","arguments":{"file":"/user/username/projects/myproject/dependency/FnS.ts","line":3,"offset":17},"seq":8,"type":"request"}
Info 87   [16:02:35.000] Search path: /user/username/projects/myproject/dependency
Info 88   [16:02:36.000] For info: /user/username/projects/myproject/dependency/FnS.ts :: Config file name: /user/username/projects/myproject/dependency/tsconfig.json
Info 89   [16:02:37.000] response:{"response":{"info":{"canRename":true,"displayName":"fn3","fullDisplayName":"\"/user/username/projects/myproject/dependency/FnS\".fn3","kind":"function","kindModifiers":"export","triggerSpan":{"start":{"line":3,"offset":17},"end":{"line":3,"offset":20}}},"locs":[{"file":"/user/username/projects/myproject/dependency/FnS.ts","locs":[{"start":{"line":3,"offset":17},"end":{"line":3,"offset":20},"contextStart":{"line":3,"offset":1},"contextEnd":{"line":3,"offset":26}}]},{"file":"/user/username/projects/myproject/main/main.ts","locs":[{"start":{"line":4,"offset":5},"end":{"line":4,"offset":8},"contextStart":{"line":1,"offset":1},"contextEnd":{"line":7,"offset":22}},{"start":{"line":11,"offset":1},"end":{"line":11,"offset":4}}]}]},"responseRequired":true}
Info 90   [16:02:38.000] request:{"command":"rename","arguments":{"file":"/user/username/projects/myproject/dependency/FnS.ts","line":4,"offset":17},"seq":9,"type":"request"}
Info 91   [16:02:39.000] Search path: /user/username/projects/myproject/dependency
Info 92   [16:02:40.000] For info: /user/username/projects/myproject/dependency/FnS.ts :: Config file name: /user/username/projects/myproject/dependency/tsconfig.json
Info 93   [16:02:41.000] response:{"response":{"info":{"canRename":true,"displayName":"fn4","fullDisplayName":"\"/user/username/projects/myproject/dependency/FnS\".fn4","kind":"function","kindModifiers":"export","triggerSpan":{"start":{"line":4,"offset":17},"end":{"line":4,"offset":20}}},"locs":[{"file":"/user/username/projects/myproject/dependency/FnS.ts","locs":[{"start":{"line":4,"offset":17},"end":{"line":4,"offset":20},"contextStart":{"line":4,"offset":1},"contextEnd":{"line":4,"offset":26}}]},{"file":"/user/username/projects/myproject/main/main.ts","locs":[{"start":{"line":5,"offset":5},"end":{"line":5,"offset":8},"contextStart":{"line":1,"offset":1},"contextEnd":{"line":7,"offset":22}},{"start":{"line":12,"offset":1},"end":{"line":12,"offset":4}}]}]},"responseRequired":true}
Info 94   [16:02:42.000] request:{"command":"rename","arguments":{"file":"/user/username/projects/myproject/dependency/FnS.ts","line":5,"offset":17},"seq":10,"type":"request"}
Info 95   [16:02:43.000] Search path: /user/username/projects/myproject/dependency
Info 96   [16:02:44.000] For info: /user/username/projects/myproject/dependency/FnS.ts :: Config file name: /user/username/projects/myproject/dependency/tsconfig.json
Info 97   [16:02:45.000] response:{"response":{"info":{"canRename":true,"displayName":"fn5","fullDisplayName":"\"/user/username/projects/myproject/dependency/FnS\".fn5","kind":"function","kindModifiers":"export","triggerSpan":{"start":{"line":5,"offset":17},"end":{"line":5,"offset":20}}},"locs":[{"file":"/user/username/projects/myproject/dependency/FnS.ts","locs":[{"start":{"line":5,"offset":17},"end":{"line":5,"offset":20},"contextStart":{"line":5,"offset":1},"contextEnd":{"line":5,"offset":26}}]},{"file":"/user/username/projects/myproject/main/main.ts","locs":[{"start":{"line":6,"offset":5},"end":{"line":6,"offset":8},"contextStart":{"line":1,"offset":1},"contextEnd":{"line":7,"offset":22}},{"start":{"line":13,"offset":1},"end":{"line":13,"offset":4}}]}]},"responseRequired":true}
Info 98   [16:02:46.000] request:{"seq":0,"type":"request","command":"close","arguments":{"file":"/user/username/projects/myproject/random/random.ts"}}
Info 99   [16:02:47.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/random/random.ts 500 undefined WatchType: Closed Script info
Info 100  [16:02:48.000] Project '/user/username/projects/myproject/main/tsconfig.json' (Configured)
Info 100  [16:02:49.000] 	Files (3)

Info 100  [16:02:50.000] -----------------------------------------------
Info 100  [16:02:51.000] Project '/user/username/projects/myproject/dependency/tsconfig.json' (Configured)
Info 100  [16:02:52.000] 	Files (2)

Info 100  [16:02:53.000] -----------------------------------------------
Info 100  [16:02:54.000] Project '/user/username/projects/myproject/random/tsconfig.json' (Configured)
Info 100  [16:02:55.000] 	Files (2)

Info 100  [16:02:56.000] -----------------------------------------------
Info 100  [16:02:57.000] Open files: 
Info 100  [16:02:58.000] 	FileName: /user/username/projects/myproject/main/main.ts ProjectRootPath: undefined
Info 100  [16:02:59.000] 		Projects: /user/username/projects/myproject/main/tsconfig.json
Info 100  [16:03:00.000] 	FileName: /user/username/projects/myproject/dependency/FnS.ts ProjectRootPath: undefined
Info 100  [16:03:01.000] 		Projects: /user/username/projects/myproject/main/tsconfig.json,/user/username/projects/myproject/dependency/tsconfig.json
Info 100  [16:03:02.000] response:{"responseRequired":false}
Info 101  [16:03:03.000] request:{"seq":0,"type":"request","command":"open","arguments":{"file":"/user/username/projects/myproject/random/random.ts"}}
Info 102  [16:03:04.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/random/random.ts 500 undefined WatchType: Closed Script info
Info 103  [16:03:05.000] Search path: /user/username/projects/myproject/random
Info 104  [16:03:06.000] For info: /user/username/projects/myproject/random/random.ts :: Config file name: /user/username/projects/myproject/random/tsconfig.json
Info 105  [16:03:07.000] Project '/user/username/projects/myproject/main/tsconfig.json' (Configured)
Info 105  [16:03:08.000] 	Files (3)

Info 105  [16:03:09.000] -----------------------------------------------
Info 105  [16:03:10.000] Project '/user/username/projects/myproject/dependency/tsconfig.json' (Configured)
Info 105  [16:03:11.000] 	Files (2)

Info 105  [16:03:12.000] -----------------------------------------------
Info 105  [16:03:13.000] Project '/user/username/projects/myproject/random/tsconfig.json' (Configured)
Info 105  [16:03:14.000] 	Files (2)

Info 105  [16:03:15.000] -----------------------------------------------
Info 105  [16:03:16.000] Open files: 
Info 105  [16:03:17.000] 	FileName: /user/username/projects/myproject/main/main.ts ProjectRootPath: undefined
Info 105  [16:03:18.000] 		Projects: /user/username/projects/myproject/main/tsconfig.json
Info 105  [16:03:19.000] 	FileName: /user/username/projects/myproject/dependency/FnS.ts ProjectRootPath: undefined
Info 105  [16:03:20.000] 		Projects: /user/username/projects/myproject/main/tsconfig.json,/user/username/projects/myproject/dependency/tsconfig.json
Info 105  [16:03:21.000] 	FileName: /user/username/projects/myproject/random/random.ts ProjectRootPath: undefined
Info 105  [16:03:22.000] 		Projects: /user/username/projects/myproject/random/tsconfig.json
Info 105  [16:03:23.000] response:{"responseRequired":false}
Info 106  [16:03:24.000] request:{"seq":0,"type":"request","command":"close","arguments":{"file":"/user/username/projects/myproject/main/main.ts"}}
Info 107  [16:03:25.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/main/main.ts 500 undefined WatchType: Closed Script info
Info 108  [16:03:26.000] Project '/user/username/projects/myproject/main/tsconfig.json' (Configured)
Info 108  [16:03:27.000] 	Files (3)

Info 108  [16:03:28.000] -----------------------------------------------
Info 108  [16:03:29.000] Project '/user/username/projects/myproject/dependency/tsconfig.json' (Configured)
Info 108  [16:03:30.000] 	Files (2)

Info 108  [16:03:31.000] -----------------------------------------------
Info 108  [16:03:32.000] Project '/user/username/projects/myproject/random/tsconfig.json' (Configured)
Info 108  [16:03:33.000] 	Files (2)

Info 108  [16:03:34.000] -----------------------------------------------
Info 108  [16:03:35.000] Open files: 
Info 108  [16:03:36.000] 	FileName: /user/username/projects/myproject/dependency/FnS.ts ProjectRootPath: undefined
Info 108  [16:03:37.000] 		Projects: /user/username/projects/myproject/main/tsconfig.json,/user/username/projects/myproject/dependency/tsconfig.json
Info 108  [16:03:38.000] 	FileName: /user/username/projects/myproject/random/random.ts ProjectRootPath: undefined
Info 108  [16:03:39.000] 		Projects: /user/username/projects/myproject/random/tsconfig.json
Info 108  [16:03:40.000] response:{"responseRequired":false}
Info 109  [16:03:41.000] request:{"seq":0,"type":"request","command":"close","arguments":{"file":"/user/username/projects/myproject/dependency/FnS.ts"}}
Info 110  [16:03:42.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/dependency/FnS.ts 500 undefined WatchType: Closed Script info
Info 111  [16:03:43.000] Project '/user/username/projects/myproject/main/tsconfig.json' (Configured)
Info 111  [16:03:44.000] 	Files (3)

Info 111  [16:03:45.000] -----------------------------------------------
Info 111  [16:03:46.000] Project '/user/username/projects/myproject/dependency/tsconfig.json' (Configured)
Info 111  [16:03:47.000] 	Files (2)

Info 111  [16:03:48.000] -----------------------------------------------
Info 111  [16:03:49.000] Project '/user/username/projects/myproject/random/tsconfig.json' (Configured)
Info 111  [16:03:50.000] 	Files (2)

Info 111  [16:03:51.000] -----------------------------------------------
Info 111  [16:03:52.000] Open files: 
Info 111  [16:03:53.000] 	FileName: /user/username/projects/myproject/random/random.ts ProjectRootPath: undefined
Info 111  [16:03:54.000] 		Projects: /user/username/projects/myproject/random/tsconfig.json
Info 111  [16:03:55.000] response:{"responseRequired":false}
Info 112  [16:03:56.000] request:{"seq":0,"type":"request","command":"close","arguments":{"file":"/user/username/projects/myproject/random/random.ts"}}
Info 113  [16:03:57.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/random/random.ts 500 undefined WatchType: Closed Script info
Info 114  [16:03:58.000] Project '/user/username/projects/myproject/main/tsconfig.json' (Configured)
Info 114  [16:03:59.000] 	Files (3)

Info 114  [16:04:00.000] -----------------------------------------------
Info 114  [16:04:01.000] Project '/user/username/projects/myproject/dependency/tsconfig.json' (Configured)
Info 114  [16:04:02.000] 	Files (2)

Info 114  [16:04:03.000] -----------------------------------------------
Info 114  [16:04:04.000] Project '/user/username/projects/myproject/random/tsconfig.json' (Configured)
Info 114  [16:04:05.000] 	Files (2)

Info 114  [16:04:06.000] -----------------------------------------------
Info 114  [16:04:07.000] Open files: 
Info 114  [16:04:08.000] response:{"responseRequired":false}
Info 115  [16:04:09.000] request:{"seq":0,"type":"request","command":"open","arguments":{"file":"/user/username/projects/myproject/random/random.ts"}}
Info 116  [16:04:10.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/random/random.ts 500 undefined WatchType: Closed Script info
Info 117  [16:04:11.000] Search path: /user/username/projects/myproject/random
Info 118  [16:04:12.000] For info: /user/username/projects/myproject/random/random.ts :: Config file name: /user/username/projects/myproject/random/tsconfig.json
Info 119  [16:04:13.000] `remove Project::
Info 120  [16:04:14.000] Project '/user/username/projects/myproject/main/tsconfig.json' (Configured)
Info 121  [16:04:15.000] 	Files (3)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/dependency/FnS.ts
	/user/username/projects/myproject/main/main.ts


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	../dependency/FnS.ts
	  Imported via '../decls/fns' from file 'main.ts'
	main.ts
	  Matched by default include pattern '**/*'

Info 122  [16:04:16.000] -----------------------------------------------
Info 123  [16:04:17.000] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/main 1 undefined Config: /user/username/projects/myproject/main/tsconfig.json WatchType: Wild card directory
Info 124  [16:04:18.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/main 1 undefined Config: /user/username/projects/myproject/main/tsconfig.json WatchType: Wild card directory
Info 125  [16:04:19.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/main/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/main/tsconfig.json WatchType: Config file
Info 126  [16:04:20.000] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/decls 1 undefined Project: /user/username/projects/myproject/main/tsconfig.json WatchType: Failed Lookup Locations
Info 127  [16:04:21.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/decls 1 undefined Project: /user/username/projects/myproject/main/tsconfig.json WatchType: Failed Lookup Locations
Info 128  [16:04:22.000] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/main/node_modules/@types 1 undefined Project: /user/username/projects/myproject/main/tsconfig.json WatchType: Type roots
Info 129  [16:04:23.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/main/node_modules/@types 1 undefined Project: /user/username/projects/myproject/main/tsconfig.json WatchType: Type roots
Info 130  [16:04:24.000] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/main/tsconfig.json WatchType: Type roots
Info 131  [16:04:25.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/main/tsconfig.json WatchType: Type roots
Info 132  [16:04:26.000] `remove Project::
Info 133  [16:04:27.000] Project '/user/username/projects/myproject/dependency/tsconfig.json' (Configured)
Info 134  [16:04:28.000] 	Files (2)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/dependency/FnS.ts


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	FnS.ts
	  Matched by default include pattern '**/*'

Info 135  [16:04:29.000] -----------------------------------------------
Info 136  [16:04:30.000] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/dependency 1 undefined Config: /user/username/projects/myproject/dependency/tsconfig.json WatchType: Wild card directory
Info 137  [16:04:31.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/dependency 1 undefined Config: /user/username/projects/myproject/dependency/tsconfig.json WatchType: Wild card directory
Info 138  [16:04:32.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/dependency/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/main/tsconfig.json WatchType: Config file
Info 139  [16:04:33.000] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/dependency/node_modules/@types 1 undefined Project: /user/username/projects/myproject/dependency/tsconfig.json WatchType: Type roots
Info 140  [16:04:34.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/dependency/node_modules/@types 1 undefined Project: /user/username/projects/myproject/dependency/tsconfig.json WatchType: Type roots
Info 141  [16:04:35.000] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/dependency/tsconfig.json WatchType: Type roots
Info 142  [16:04:36.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/dependency/tsconfig.json WatchType: Type roots
Info 143  [16:04:37.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/decls/FnS.d.ts 2000 undefined Project: /user/username/projects/myproject/dependency/tsconfig.json WatchType: Missing generated file
Info 144  [16:04:38.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/main/main.ts 500 undefined WatchType: Closed Script info
Info 145  [16:04:39.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/dependency/FnS.ts 500 undefined WatchType: Closed Script info
Info 146  [16:04:40.000] Project '/user/username/projects/myproject/random/tsconfig.json' (Configured)
Info 146  [16:04:41.000] 	Files (2)

Info 146  [16:04:42.000] -----------------------------------------------
Info 146  [16:04:43.000] Open files: 
Info 146  [16:04:44.000] 	FileName: /user/username/projects/myproject/random/random.ts ProjectRootPath: undefined
Info 146  [16:04:45.000] 		Projects: /user/username/projects/myproject/random/tsconfig.json
Info 146  [16:04:46.000] response:{"responseRequired":false}