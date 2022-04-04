Provided types map file "/a/lib/typesMap.json" doesn't exist
request:{"seq":0,"type":"request","command":"open","arguments":{"file":"/users/username/projects/a/a.ts","projectRootPath":"/users/username/projects/a"}}
Search path: /users/username/projects/a
For info: /users/username/projects/a/a.ts :: Config file name: /users/username/projects/a/tsconfig.json
Creating configuration project /users/username/projects/a/tsconfig.json
FileWatcher:: Added:: WatchInfo: /users/username/projects/a/tsconfig.json 2000 undefined Project: /users/username/projects/a/tsconfig.json WatchType: Config file
Config: /users/username/projects/a/tsconfig.json : {
 "rootNames": [
  "/users/username/projects/a/a.ts",
  "/users/username/projects/a/c/fc.ts"
 ],
 "options": {
  "module": 1,
  "configFilePath": "/users/username/projects/a/tsconfig.json"
 }
}
DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/a 1 undefined Config: /users/username/projects/a/tsconfig.json WatchType: Wild card directory
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/a 1 undefined Config: /users/username/projects/a/tsconfig.json WatchType: Wild card directory
Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
FileWatcher:: Added:: WatchInfo: /users/username/projects/a/c/fc.ts 500 undefined WatchType: Closed Script info
Starting updateGraphWorker: Project: /users/username/projects/a/tsconfig.json
FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/a/node_modules/@types 1 undefined Project: /users/username/projects/a/tsconfig.json WatchType: Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/a/node_modules/@types 1 undefined Project: /users/username/projects/a/tsconfig.json WatchType: Type roots
Finishing updateGraphWorker: Project: /users/username/projects/a/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Project '/users/username/projects/a/tsconfig.json' (Configured)
	Files (3)
	/a/lib/lib.d.ts
	/users/username/projects/a/c/fc.ts
	/users/username/projects/a/a.ts


	../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	c/fc.ts
	  Imported via "./c/fc" from file 'a.ts'
	  Matched by include pattern '**/*' in 'tsconfig.json'
	a.ts
	  Matched by include pattern '**/*' in 'tsconfig.json'

-----------------------------------------------
Project '/users/username/projects/a/tsconfig.json' (Configured)
	Files (3)

-----------------------------------------------
Open files: 
	FileName: /users/username/projects/a/a.ts ProjectRootPath: /users/username/projects/a
		Projects: /users/username/projects/a/tsconfig.json
response:{"responseRequired":false}
request:{"seq":0,"type":"request","command":"open","arguments":{"file":"/users/username/projects/b/b.ts","projectRootPath":"/users/username/projects/b"}}
Search path: /users/username/projects/b
For info: /users/username/projects/b/b.ts :: Config file name: /users/username/projects/b/tsconfig.json
Creating configuration project /users/username/projects/b/tsconfig.json
FileWatcher:: Added:: WatchInfo: /users/username/projects/b/tsconfig.json 2000 undefined Project: /users/username/projects/b/tsconfig.json WatchType: Config file
Config: /users/username/projects/b/tsconfig.json : {
 "rootNames": [
  "/users/username/projects/b/b.ts",
  "/users/username/projects/b/c/fc.ts"
 ],
 "options": {
  "module": 1,
  "configFilePath": "/users/username/projects/b/tsconfig.json"
 }
}
DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/b 1 undefined Config: /users/username/projects/b/tsconfig.json WatchType: Wild card directory
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/b 1 undefined Config: /users/username/projects/b/tsconfig.json WatchType: Wild card directory
Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
FileWatcher:: Added:: WatchInfo: /users/username/projects/b/c/fc.ts 500 undefined WatchType: Closed Script info
Starting updateGraphWorker: Project: /users/username/projects/b/tsconfig.json
DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/b/node_modules/@types 1 undefined Project: /users/username/projects/b/tsconfig.json WatchType: Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/b/node_modules/@types 1 undefined Project: /users/username/projects/b/tsconfig.json WatchType: Type roots
Finishing updateGraphWorker: Project: /users/username/projects/b/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Project '/users/username/projects/b/tsconfig.json' (Configured)
	Files (3)
	/a/lib/lib.d.ts
	/users/username/projects/b/c/fc.ts
	/users/username/projects/b/b.ts


	../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	c/fc.ts
	  Imported via "./c/fc" from file 'b.ts'
	  Matched by include pattern '**/*' in 'tsconfig.json'
	b.ts
	  Matched by include pattern '**/*' in 'tsconfig.json'

-----------------------------------------------
Project '/users/username/projects/a/tsconfig.json' (Configured)
	Files (3)

-----------------------------------------------
Project '/users/username/projects/b/tsconfig.json' (Configured)
	Files (3)

-----------------------------------------------
Open files: 
	FileName: /users/username/projects/a/a.ts ProjectRootPath: /users/username/projects/a
		Projects: /users/username/projects/a/tsconfig.json
	FileName: /users/username/projects/b/b.ts ProjectRootPath: /users/username/projects/b
		Projects: /users/username/projects/b/tsconfig.json
response:{"responseRequired":false}
request:{"seq":0,"type":"request","command":"open","arguments":{"file":"/users/username/projects/a/c/fc.ts","projectRootPath":"/users/username/projects/a"}}
FileWatcher:: Close:: WatchInfo: /users/username/projects/a/c/fc.ts 500 undefined WatchType: Closed Script info
Search path: /users/username/projects/a/c
For info: /users/username/projects/a/c/fc.ts :: Config file name: /users/username/projects/a/tsconfig.json
Project '/users/username/projects/a/tsconfig.json' (Configured)
	Files (3)

-----------------------------------------------
Project '/users/username/projects/b/tsconfig.json' (Configured)
	Files (3)

-----------------------------------------------
Open files: 
	FileName: /users/username/projects/a/a.ts ProjectRootPath: /users/username/projects/a
		Projects: /users/username/projects/a/tsconfig.json
	FileName: /users/username/projects/b/b.ts ProjectRootPath: /users/username/projects/b
		Projects: /users/username/projects/b/tsconfig.json
	FileName: /users/username/projects/a/c/fc.ts ProjectRootPath: /users/username/projects/a
		Projects: /users/username/projects/a/tsconfig.json
response:{"responseRequired":false}
request:{"seq":0,"type":"request","command":"open","arguments":{"file":"/users/username/projects/b/c/fc.ts","projectRootPath":"/users/username/projects/b"}}
FileWatcher:: Close:: WatchInfo: /users/username/projects/b/c/fc.ts 500 undefined WatchType: Closed Script info
Search path: /users/username/projects/b/c
For info: /users/username/projects/b/c/fc.ts :: Config file name: /users/username/projects/b/tsconfig.json
Project '/users/username/projects/a/tsconfig.json' (Configured)
	Files (3)

-----------------------------------------------
Project '/users/username/projects/b/tsconfig.json' (Configured)
	Files (3)

-----------------------------------------------
Open files: 
	FileName: /users/username/projects/a/a.ts ProjectRootPath: /users/username/projects/a
		Projects: /users/username/projects/a/tsconfig.json
	FileName: /users/username/projects/b/b.ts ProjectRootPath: /users/username/projects/b
		Projects: /users/username/projects/b/tsconfig.json
	FileName: /users/username/projects/a/c/fc.ts ProjectRootPath: /users/username/projects/a
		Projects: /users/username/projects/a/tsconfig.json
	FileName: /users/username/projects/b/c/fc.ts ProjectRootPath: /users/username/projects/b
		Projects: /users/username/projects/b/tsconfig.json
response:{"responseRequired":false}
request:{"seq":0,"type":"request","command":"rename","arguments":{"file":"/users/username/projects/a/c/fc.ts","line":1,"offset":14}}
response:{"response":{"info":{"canRename":true,"displayName":"C","fullDisplayName":"\"/users/username/projects/a/c/fc\".C","kind":"const","kindModifiers":"export","triggerSpan":{"start":{"line":1,"offset":14},"end":{"line":1,"offset":15}}},"locs":[{"file":"/users/username/projects/a/c/fc.ts","locs":[{"start":{"line":1,"offset":14},"end":{"line":1,"offset":15},"contextStart":{"line":1,"offset":1},"contextEnd":{"line":1,"offset":19}}]},{"file":"/users/username/projects/a/a.ts","locs":[{"start":{"line":1,"offset":9},"end":{"line":1,"offset":10},"contextStart":{"line":1,"offset":1},"contextEnd":{"line":1,"offset":26}},{"start":{"line":1,"offset":39},"end":{"line":1,"offset":40}}]},{"file":"/users/username/projects/b/c/fc.ts","locs":[{"start":{"line":1,"offset":14},"end":{"line":1,"offset":15},"contextStart":{"line":1,"offset":1},"contextEnd":{"line":1,"offset":19}}]},{"file":"/users/username/projects/b/b.ts","locs":[{"start":{"line":1,"offset":9},"end":{"line":1,"offset":10},"contextStart":{"line":1,"offset":1},"contextEnd":{"line":1,"offset":26}},{"start":{"line":1,"offset":39},"end":{"line":1,"offset":40}}]}]},"responseRequired":true}