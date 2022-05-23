Provided types map file "/a/lib/typesMap.json" doesn't exist
request:{"seq":0,"type":"request","command":"open","arguments":{"file":"/user/username/projects/myproject/main/main.ts"}}
Search path: /user/username/projects/myproject/main
For info: /user/username/projects/myproject/main/main.ts :: Config file name: /user/username/projects/myproject/main/tsconfig.json
Creating configuration project /user/username/projects/myproject/main/tsconfig.json
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/main/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/main/tsconfig.json WatchType: Config file
Config: /user/username/projects/myproject/main/tsconfig.json : {
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
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/main 1 undefined Config: /user/username/projects/myproject/main/tsconfig.json WatchType: Wild card directory
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/main 1 undefined Config: /user/username/projects/myproject/main/tsconfig.json WatchType: Wild card directory
Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Starting updateGraphWorker: Project: /user/username/projects/myproject/main/tsconfig.json
Config: /user/username/projects/myproject/dependency/tsconfig.json : {
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
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/dependency/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/main/tsconfig.json WatchType: Config file
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/dependency 1 undefined Config: /user/username/projects/myproject/dependency/tsconfig.json WatchType: Wild card directory
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/dependency 1 undefined Config: /user/username/projects/myproject/dependency/tsconfig.json WatchType: Wild card directory
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/decls 1 undefined Project: /user/username/projects/myproject/main/tsconfig.json WatchType: Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/decls 1 undefined Project: /user/username/projects/myproject/main/tsconfig.json WatchType: Failed Lookup Locations
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/dependency/FnS.ts 500 undefined WatchType: Closed Script info
FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/main/node_modules/@types 1 undefined Project: /user/username/projects/myproject/main/tsconfig.json WatchType: Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/main/node_modules/@types 1 undefined Project: /user/username/projects/myproject/main/tsconfig.json WatchType: Type roots
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/main/tsconfig.json WatchType: Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/main/tsconfig.json WatchType: Type roots
Finishing updateGraphWorker: Project: /user/username/projects/myproject/main/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Project '/user/username/projects/myproject/main/tsconfig.json' (Configured)
	Files (3)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/dependency/FnS.ts
	/user/username/projects/myproject/main/main.ts


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	../dependency/FnS.ts
	  Imported via '../decls/fns' from file 'main.ts'
	main.ts
	  Matched by default include pattern '**/*'

-----------------------------------------------
Search path: /user/username/projects/myproject/main
For info: /user/username/projects/myproject/main/tsconfig.json :: No config files found.
Project '/user/username/projects/myproject/main/tsconfig.json' (Configured)
	Files (3)

-----------------------------------------------
Open files: 
	FileName: /user/username/projects/myproject/main/main.ts ProjectRootPath: undefined
		Projects: /user/username/projects/myproject/main/tsconfig.json
response:{"responseRequired":false}
request:{"seq":0,"type":"request","command":"open","arguments":{"file":"/user/username/projects/myproject/dependency/FnS.ts"}}
FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/dependency/FnS.ts 500 undefined WatchType: Closed Script info
Search path: /user/username/projects/myproject/dependency
For info: /user/username/projects/myproject/dependency/FnS.ts :: Config file name: /user/username/projects/myproject/dependency/tsconfig.json
Creating configuration project /user/username/projects/myproject/dependency/tsconfig.json
Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Starting updateGraphWorker: Project: /user/username/projects/myproject/dependency/tsconfig.json
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/dependency/node_modules/@types 1 undefined Project: /user/username/projects/myproject/dependency/tsconfig.json WatchType: Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/dependency/node_modules/@types 1 undefined Project: /user/username/projects/myproject/dependency/tsconfig.json WatchType: Type roots
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/dependency/tsconfig.json WatchType: Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/dependency/tsconfig.json WatchType: Type roots
Finishing updateGraphWorker: Project: /user/username/projects/myproject/dependency/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Project '/user/username/projects/myproject/dependency/tsconfig.json' (Configured)
	Files (2)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/dependency/FnS.ts


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	FnS.ts
	  Matched by default include pattern '**/*'

-----------------------------------------------
Search path: /user/username/projects/myproject/dependency
For info: /user/username/projects/myproject/dependency/tsconfig.json :: No config files found.
Project '/user/username/projects/myproject/main/tsconfig.json' (Configured)
	Files (3)

-----------------------------------------------
Project '/user/username/projects/myproject/dependency/tsconfig.json' (Configured)
	Files (2)

-----------------------------------------------
Open files: 
	FileName: /user/username/projects/myproject/main/main.ts ProjectRootPath: undefined
		Projects: /user/username/projects/myproject/main/tsconfig.json
	FileName: /user/username/projects/myproject/dependency/FnS.ts ProjectRootPath: undefined
		Projects: /user/username/projects/myproject/main/tsconfig.json,/user/username/projects/myproject/dependency/tsconfig.json
response:{"responseRequired":false}
request:{"seq":0,"type":"request","command":"open","arguments":{"file":"/user/username/projects/myproject/random/random.ts"}}
Search path: /user/username/projects/myproject/random
For info: /user/username/projects/myproject/random/random.ts :: Config file name: /user/username/projects/myproject/random/tsconfig.json
Creating configuration project /user/username/projects/myproject/random/tsconfig.json
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/random/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/random/tsconfig.json WatchType: Config file
Config: /user/username/projects/myproject/random/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/random/random.ts"
 ],
 "options": {
  "configFilePath": "/user/username/projects/myproject/random/tsconfig.json"
 }
}
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/random 1 undefined Config: /user/username/projects/myproject/random/tsconfig.json WatchType: Wild card directory
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/random 1 undefined Config: /user/username/projects/myproject/random/tsconfig.json WatchType: Wild card directory
Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Starting updateGraphWorker: Project: /user/username/projects/myproject/random/tsconfig.json
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/random/node_modules/@types 1 undefined Project: /user/username/projects/myproject/random/tsconfig.json WatchType: Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/random/node_modules/@types 1 undefined Project: /user/username/projects/myproject/random/tsconfig.json WatchType: Type roots
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/random/tsconfig.json WatchType: Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/random/tsconfig.json WatchType: Type roots
Finishing updateGraphWorker: Project: /user/username/projects/myproject/random/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Project '/user/username/projects/myproject/random/tsconfig.json' (Configured)
	Files (2)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/random/random.ts


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	random.ts
	  Matched by default include pattern '**/*'

-----------------------------------------------
Project '/user/username/projects/myproject/main/tsconfig.json' (Configured)
	Files (3)

-----------------------------------------------
Project '/user/username/projects/myproject/dependency/tsconfig.json' (Configured)
	Files (2)

-----------------------------------------------
Project '/user/username/projects/myproject/random/tsconfig.json' (Configured)
	Files (2)

-----------------------------------------------
Open files: 
	FileName: /user/username/projects/myproject/main/main.ts ProjectRootPath: undefined
		Projects: /user/username/projects/myproject/main/tsconfig.json
	FileName: /user/username/projects/myproject/dependency/FnS.ts ProjectRootPath: undefined
		Projects: /user/username/projects/myproject/main/tsconfig.json,/user/username/projects/myproject/dependency/tsconfig.json
	FileName: /user/username/projects/myproject/random/random.ts ProjectRootPath: undefined
		Projects: /user/username/projects/myproject/random/tsconfig.json
response:{"responseRequired":false}
request:{"command":"definitionAndBoundSpan","arguments":{"file":"/user/username/projects/myproject/main/main.ts","line":9,"offset":1},"seq":1,"type":"request"}
response:{"response":{"definitions":[{"file":"/user/username/projects/myproject/dependency/FnS.ts","start":{"line":1,"offset":17},"end":{"line":1,"offset":20},"contextStart":{"line":1,"offset":1},"contextEnd":{"line":1,"offset":26}}],"textSpan":{"start":{"line":9,"offset":1},"end":{"line":9,"offset":4}}},"responseRequired":true}
request:{"command":"definitionAndBoundSpan","arguments":{"file":"/user/username/projects/myproject/main/main.ts","line":10,"offset":1},"seq":2,"type":"request"}
response:{"response":{"definitions":[{"file":"/user/username/projects/myproject/dependency/FnS.ts","start":{"line":2,"offset":17},"end":{"line":2,"offset":20},"contextStart":{"line":2,"offset":1},"contextEnd":{"line":2,"offset":26}}],"textSpan":{"start":{"line":10,"offset":1},"end":{"line":10,"offset":4}}},"responseRequired":true}
request:{"command":"definitionAndBoundSpan","arguments":{"file":"/user/username/projects/myproject/main/main.ts","line":11,"offset":1},"seq":3,"type":"request"}
response:{"response":{"definitions":[{"file":"/user/username/projects/myproject/dependency/FnS.ts","start":{"line":3,"offset":17},"end":{"line":3,"offset":20},"contextStart":{"line":3,"offset":1},"contextEnd":{"line":3,"offset":26}}],"textSpan":{"start":{"line":11,"offset":1},"end":{"line":11,"offset":4}}},"responseRequired":true}
request:{"command":"definitionAndBoundSpan","arguments":{"file":"/user/username/projects/myproject/main/main.ts","line":12,"offset":1},"seq":4,"type":"request"}
response:{"response":{"definitions":[{"file":"/user/username/projects/myproject/dependency/FnS.ts","start":{"line":4,"offset":17},"end":{"line":4,"offset":20},"contextStart":{"line":4,"offset":1},"contextEnd":{"line":4,"offset":26}}],"textSpan":{"start":{"line":12,"offset":1},"end":{"line":12,"offset":4}}},"responseRequired":true}
request:{"command":"definitionAndBoundSpan","arguments":{"file":"/user/username/projects/myproject/main/main.ts","line":13,"offset":1},"seq":5,"type":"request"}
response:{"response":{"definitions":[{"file":"/user/username/projects/myproject/dependency/FnS.ts","start":{"line":5,"offset":17},"end":{"line":5,"offset":20},"contextStart":{"line":5,"offset":1},"contextEnd":{"line":5,"offset":26}}],"textSpan":{"start":{"line":13,"offset":1},"end":{"line":13,"offset":4}}},"responseRequired":true}
request:{"command":"rename","arguments":{"file":"/user/username/projects/myproject/dependency/FnS.ts","line":1,"offset":17},"seq":6,"type":"request"}
Search path: /user/username/projects/myproject/dependency
For info: /user/username/projects/myproject/dependency/FnS.ts :: Config file name: /user/username/projects/myproject/dependency/tsconfig.json
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/decls/FnS.d.ts 2000 undefined Project: /user/username/projects/myproject/dependency/tsconfig.json WatchType: Missing generated file
response:{"response":{"info":{"canRename":true,"displayName":"fn1","fullDisplayName":"\"/user/username/projects/myproject/dependency/FnS\".fn1","kind":"function","kindModifiers":"export","triggerSpan":{"start":{"line":1,"offset":17},"end":{"line":1,"offset":20}}},"locs":[{"file":"/user/username/projects/myproject/dependency/FnS.ts","locs":[{"start":{"line":1,"offset":17},"end":{"line":1,"offset":20},"contextStart":{"line":1,"offset":1},"contextEnd":{"line":1,"offset":26}}]},{"file":"/user/username/projects/myproject/main/main.ts","locs":[{"start":{"line":2,"offset":5},"end":{"line":2,"offset":8},"contextStart":{"line":1,"offset":1},"contextEnd":{"line":7,"offset":22}},{"start":{"line":9,"offset":1},"end":{"line":9,"offset":4}}]}]},"responseRequired":true}
request:{"command":"rename","arguments":{"file":"/user/username/projects/myproject/dependency/FnS.ts","line":2,"offset":17},"seq":7,"type":"request"}
Search path: /user/username/projects/myproject/dependency
For info: /user/username/projects/myproject/dependency/FnS.ts :: Config file name: /user/username/projects/myproject/dependency/tsconfig.json
response:{"response":{"info":{"canRename":true,"displayName":"fn2","fullDisplayName":"\"/user/username/projects/myproject/dependency/FnS\".fn2","kind":"function","kindModifiers":"export","triggerSpan":{"start":{"line":2,"offset":17},"end":{"line":2,"offset":20}}},"locs":[{"file":"/user/username/projects/myproject/dependency/FnS.ts","locs":[{"start":{"line":2,"offset":17},"end":{"line":2,"offset":20},"contextStart":{"line":2,"offset":1},"contextEnd":{"line":2,"offset":26}}]},{"file":"/user/username/projects/myproject/main/main.ts","locs":[{"start":{"line":3,"offset":5},"end":{"line":3,"offset":8},"contextStart":{"line":1,"offset":1},"contextEnd":{"line":7,"offset":22}},{"start":{"line":10,"offset":1},"end":{"line":10,"offset":4}}]}]},"responseRequired":true}
request:{"command":"rename","arguments":{"file":"/user/username/projects/myproject/dependency/FnS.ts","line":3,"offset":17},"seq":8,"type":"request"}
Search path: /user/username/projects/myproject/dependency
For info: /user/username/projects/myproject/dependency/FnS.ts :: Config file name: /user/username/projects/myproject/dependency/tsconfig.json
response:{"response":{"info":{"canRename":true,"displayName":"fn3","fullDisplayName":"\"/user/username/projects/myproject/dependency/FnS\".fn3","kind":"function","kindModifiers":"export","triggerSpan":{"start":{"line":3,"offset":17},"end":{"line":3,"offset":20}}},"locs":[{"file":"/user/username/projects/myproject/dependency/FnS.ts","locs":[{"start":{"line":3,"offset":17},"end":{"line":3,"offset":20},"contextStart":{"line":3,"offset":1},"contextEnd":{"line":3,"offset":26}}]},{"file":"/user/username/projects/myproject/main/main.ts","locs":[{"start":{"line":4,"offset":5},"end":{"line":4,"offset":8},"contextStart":{"line":1,"offset":1},"contextEnd":{"line":7,"offset":22}},{"start":{"line":11,"offset":1},"end":{"line":11,"offset":4}}]}]},"responseRequired":true}
request:{"command":"rename","arguments":{"file":"/user/username/projects/myproject/dependency/FnS.ts","line":4,"offset":17},"seq":9,"type":"request"}
Search path: /user/username/projects/myproject/dependency
For info: /user/username/projects/myproject/dependency/FnS.ts :: Config file name: /user/username/projects/myproject/dependency/tsconfig.json
response:{"response":{"info":{"canRename":true,"displayName":"fn4","fullDisplayName":"\"/user/username/projects/myproject/dependency/FnS\".fn4","kind":"function","kindModifiers":"export","triggerSpan":{"start":{"line":4,"offset":17},"end":{"line":4,"offset":20}}},"locs":[{"file":"/user/username/projects/myproject/dependency/FnS.ts","locs":[{"start":{"line":4,"offset":17},"end":{"line":4,"offset":20},"contextStart":{"line":4,"offset":1},"contextEnd":{"line":4,"offset":26}}]},{"file":"/user/username/projects/myproject/main/main.ts","locs":[{"start":{"line":5,"offset":5},"end":{"line":5,"offset":8},"contextStart":{"line":1,"offset":1},"contextEnd":{"line":7,"offset":22}},{"start":{"line":12,"offset":1},"end":{"line":12,"offset":4}}]}]},"responseRequired":true}
request:{"command":"rename","arguments":{"file":"/user/username/projects/myproject/dependency/FnS.ts","line":5,"offset":17},"seq":10,"type":"request"}
Search path: /user/username/projects/myproject/dependency
For info: /user/username/projects/myproject/dependency/FnS.ts :: Config file name: /user/username/projects/myproject/dependency/tsconfig.json
response:{"response":{"info":{"canRename":true,"displayName":"fn5","fullDisplayName":"\"/user/username/projects/myproject/dependency/FnS\".fn5","kind":"function","kindModifiers":"export","triggerSpan":{"start":{"line":5,"offset":17},"end":{"line":5,"offset":20}}},"locs":[{"file":"/user/username/projects/myproject/dependency/FnS.ts","locs":[{"start":{"line":5,"offset":17},"end":{"line":5,"offset":20},"contextStart":{"line":5,"offset":1},"contextEnd":{"line":5,"offset":26}}]},{"file":"/user/username/projects/myproject/main/main.ts","locs":[{"start":{"line":6,"offset":5},"end":{"line":6,"offset":8},"contextStart":{"line":1,"offset":1},"contextEnd":{"line":7,"offset":22}},{"start":{"line":13,"offset":1},"end":{"line":13,"offset":4}}]}]},"responseRequired":true}
request:{"seq":0,"type":"request","command":"close","arguments":{"file":"/user/username/projects/myproject/random/random.ts"}}
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/random/random.ts 500 undefined WatchType: Closed Script info
Project '/user/username/projects/myproject/main/tsconfig.json' (Configured)
	Files (3)

-----------------------------------------------
Project '/user/username/projects/myproject/dependency/tsconfig.json' (Configured)
	Files (2)

-----------------------------------------------
Project '/user/username/projects/myproject/random/tsconfig.json' (Configured)
	Files (2)

-----------------------------------------------
Open files: 
	FileName: /user/username/projects/myproject/main/main.ts ProjectRootPath: undefined
		Projects: /user/username/projects/myproject/main/tsconfig.json
	FileName: /user/username/projects/myproject/dependency/FnS.ts ProjectRootPath: undefined
		Projects: /user/username/projects/myproject/main/tsconfig.json,/user/username/projects/myproject/dependency/tsconfig.json
response:{"responseRequired":false}
request:{"seq":0,"type":"request","command":"open","arguments":{"file":"/user/username/projects/myproject/random/random.ts"}}
FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/random/random.ts 500 undefined WatchType: Closed Script info
Search path: /user/username/projects/myproject/random
For info: /user/username/projects/myproject/random/random.ts :: Config file name: /user/username/projects/myproject/random/tsconfig.json
Project '/user/username/projects/myproject/main/tsconfig.json' (Configured)
	Files (3)

-----------------------------------------------
Project '/user/username/projects/myproject/dependency/tsconfig.json' (Configured)
	Files (2)

-----------------------------------------------
Project '/user/username/projects/myproject/random/tsconfig.json' (Configured)
	Files (2)

-----------------------------------------------
Open files: 
	FileName: /user/username/projects/myproject/main/main.ts ProjectRootPath: undefined
		Projects: /user/username/projects/myproject/main/tsconfig.json
	FileName: /user/username/projects/myproject/dependency/FnS.ts ProjectRootPath: undefined
		Projects: /user/username/projects/myproject/main/tsconfig.json,/user/username/projects/myproject/dependency/tsconfig.json
	FileName: /user/username/projects/myproject/random/random.ts ProjectRootPath: undefined
		Projects: /user/username/projects/myproject/random/tsconfig.json
response:{"responseRequired":false}
request:{"seq":0,"type":"request","command":"close","arguments":{"file":"/user/username/projects/myproject/main/main.ts"}}
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/main/main.ts 500 undefined WatchType: Closed Script info
Project '/user/username/projects/myproject/main/tsconfig.json' (Configured)
	Files (3)

-----------------------------------------------
Project '/user/username/projects/myproject/dependency/tsconfig.json' (Configured)
	Files (2)

-----------------------------------------------
Project '/user/username/projects/myproject/random/tsconfig.json' (Configured)
	Files (2)

-----------------------------------------------
Open files: 
	FileName: /user/username/projects/myproject/dependency/FnS.ts ProjectRootPath: undefined
		Projects: /user/username/projects/myproject/main/tsconfig.json,/user/username/projects/myproject/dependency/tsconfig.json
	FileName: /user/username/projects/myproject/random/random.ts ProjectRootPath: undefined
		Projects: /user/username/projects/myproject/random/tsconfig.json
response:{"responseRequired":false}
request:{"seq":0,"type":"request","command":"close","arguments":{"file":"/user/username/projects/myproject/dependency/FnS.ts"}}
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/dependency/FnS.ts 500 undefined WatchType: Closed Script info
Project '/user/username/projects/myproject/main/tsconfig.json' (Configured)
	Files (3)

-----------------------------------------------
Project '/user/username/projects/myproject/dependency/tsconfig.json' (Configured)
	Files (2)

-----------------------------------------------
Project '/user/username/projects/myproject/random/tsconfig.json' (Configured)
	Files (2)

-----------------------------------------------
Open files: 
	FileName: /user/username/projects/myproject/random/random.ts ProjectRootPath: undefined
		Projects: /user/username/projects/myproject/random/tsconfig.json
response:{"responseRequired":false}
request:{"seq":0,"type":"request","command":"close","arguments":{"file":"/user/username/projects/myproject/random/random.ts"}}
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/random/random.ts 500 undefined WatchType: Closed Script info
Project '/user/username/projects/myproject/main/tsconfig.json' (Configured)
	Files (3)

-----------------------------------------------
Project '/user/username/projects/myproject/dependency/tsconfig.json' (Configured)
	Files (2)

-----------------------------------------------
Project '/user/username/projects/myproject/random/tsconfig.json' (Configured)
	Files (2)

-----------------------------------------------
Open files: 
response:{"responseRequired":false}
request:{"seq":0,"type":"request","command":"open","arguments":{"file":"/user/username/projects/myproject/random/random.ts"}}
FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/random/random.ts 500 undefined WatchType: Closed Script info
Search path: /user/username/projects/myproject/random
For info: /user/username/projects/myproject/random/random.ts :: Config file name: /user/username/projects/myproject/random/tsconfig.json
`remove Project::
Project '/user/username/projects/myproject/main/tsconfig.json' (Configured)
	Files (3)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/dependency/FnS.ts
	/user/username/projects/myproject/main/main.ts


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	../dependency/FnS.ts
	  Imported via '../decls/fns' from file 'main.ts'
	main.ts
	  Matched by default include pattern '**/*'

-----------------------------------------------
DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/main 1 undefined Config: /user/username/projects/myproject/main/tsconfig.json WatchType: Wild card directory
Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/main 1 undefined Config: /user/username/projects/myproject/main/tsconfig.json WatchType: Wild card directory
FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/main/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/main/tsconfig.json WatchType: Config file
DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/decls 1 undefined Project: /user/username/projects/myproject/main/tsconfig.json WatchType: Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/decls 1 undefined Project: /user/username/projects/myproject/main/tsconfig.json WatchType: Failed Lookup Locations
DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/main/node_modules/@types 1 undefined Project: /user/username/projects/myproject/main/tsconfig.json WatchType: Type roots
Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/main/node_modules/@types 1 undefined Project: /user/username/projects/myproject/main/tsconfig.json WatchType: Type roots
DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/main/tsconfig.json WatchType: Type roots
Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/main/tsconfig.json WatchType: Type roots
`remove Project::
Project '/user/username/projects/myproject/dependency/tsconfig.json' (Configured)
	Files (2)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/dependency/FnS.ts


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	FnS.ts
	  Matched by default include pattern '**/*'

-----------------------------------------------
DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/dependency 1 undefined Config: /user/username/projects/myproject/dependency/tsconfig.json WatchType: Wild card directory
Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/dependency 1 undefined Config: /user/username/projects/myproject/dependency/tsconfig.json WatchType: Wild card directory
FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/dependency/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/main/tsconfig.json WatchType: Config file
DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/dependency/node_modules/@types 1 undefined Project: /user/username/projects/myproject/dependency/tsconfig.json WatchType: Type roots
Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/dependency/node_modules/@types 1 undefined Project: /user/username/projects/myproject/dependency/tsconfig.json WatchType: Type roots
DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/dependency/tsconfig.json WatchType: Type roots
Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/dependency/tsconfig.json WatchType: Type roots
FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/decls/FnS.d.ts 2000 undefined Project: /user/username/projects/myproject/dependency/tsconfig.json WatchType: Missing generated file
FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/main/main.ts 500 undefined WatchType: Closed Script info
FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/dependency/FnS.ts 500 undefined WatchType: Closed Script info
Project '/user/username/projects/myproject/random/tsconfig.json' (Configured)
	Files (2)

-----------------------------------------------
Open files: 
	FileName: /user/username/projects/myproject/random/random.ts ProjectRootPath: undefined
		Projects: /user/username/projects/myproject/random/tsconfig.json
response:{"responseRequired":false}