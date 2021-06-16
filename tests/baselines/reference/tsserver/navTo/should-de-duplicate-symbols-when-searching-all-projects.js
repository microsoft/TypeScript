Provided types map file "/a/lib/typesMap.json" doesn't exist
request:{"seq":0,"type":"request","command":"open","arguments":{"file":"/a/index.ts"}}
Search path: /a
For info: /a/index.ts :: Config file name: /a/tsconfig.json
Creating configuration project /a/tsconfig.json
FileWatcher:: Added:: WatchInfo: /a/tsconfig.json 2000 undefined Project: /a/tsconfig.json WatchType: Config file
Config: /a/tsconfig.json : {
 "rootNames": [
  "/a/index.ts"
 ],
 "options": {
  "composite": true,
  "configFilePath": "/a/tsconfig.json"
 }
}
DirectoryWatcher:: Added:: WatchInfo: /a 1 undefined Config: /a/tsconfig.json WatchType: Wild card directory
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a 1 undefined Config: /a/tsconfig.json WatchType: Wild card directory
Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Starting updateGraphWorker: Project: /a/tsconfig.json
FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /a/tsconfig.json WatchType: Missing file
DirectoryWatcher:: Added:: WatchInfo: /a/node_modules/@types 1 undefined Project: /a/tsconfig.json WatchType: Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/node_modules/@types 1 undefined Project: /a/tsconfig.json WatchType: Type roots
Finishing updateGraphWorker: Project: /a/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Project '/a/tsconfig.json' (Configured)
	Files (1)
	/a/index.ts


	index.ts
	  Matched by include pattern '**/*' in 'tsconfig.json'

-----------------------------------------------
Search path: /a
For info: /a/tsconfig.json :: Config file name: /tsconfig.json
Creating configuration project /tsconfig.json
FileWatcher:: Added:: WatchInfo: /tsconfig.json 2000 undefined Project: /tsconfig.json WatchType: Config file
Search path: /
For info: /tsconfig.json :: No config files found.
Project '/a/tsconfig.json' (Configured)
	Files (1)

-----------------------------------------------
Project '/tsconfig.json' (Configured)
	Files (0) InitialLoadPending

-----------------------------------------------
Open files: 
	FileName: /a/index.ts ProjectRootPath: undefined
		Projects: /a/tsconfig.json
response:{"responseRequired":false}
request:{"seq":0,"type":"request","command":"navto","arguments":{"searchValue":"abcdef"}}
Loading configured project /tsconfig.json
Config: /tsconfig.json : {
 "rootNames": [],
 "options": {
  "configFilePath": "/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/a",
   "originalPath": "./a"
  },
  {
   "path": "/b",
   "originalPath": "./b"
  }
 ]
}
Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Starting updateGraphWorker: Project: /tsconfig.json
Config: /b/tsconfig.json : {
 "rootNames": [
  "/b/index.ts"
 ],
 "options": {
  "composite": true,
  "configFilePath": "/b/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/a",
   "originalPath": "../a"
  }
 ]
}
FileWatcher:: Added:: WatchInfo: /b/tsconfig.json 2000 undefined Project: /tsconfig.json WatchType: Config file
DirectoryWatcher:: Added:: WatchInfo: /b 1 undefined Config: /b/tsconfig.json WatchType: Wild card directory
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /b 1 undefined Config: /b/tsconfig.json WatchType: Wild card directory
Finishing updateGraphWorker: Project: /tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Different program with same set of files
Creating configuration project /b/tsconfig.json
Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
FileWatcher:: Added:: WatchInfo: /b/index.ts 500 undefined WatchType: Closed Script info
Starting updateGraphWorker: Project: /b/tsconfig.json
FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /b/tsconfig.json WatchType: Missing file
DirectoryWatcher:: Added:: WatchInfo: /b/node_modules/@types 1 undefined Project: /b/tsconfig.json WatchType: Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /b/node_modules/@types 1 undefined Project: /b/tsconfig.json WatchType: Type roots
Finishing updateGraphWorker: Project: /b/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Project '/b/tsconfig.json' (Configured)
	Files (2)
	/a/index.ts
	/b/index.ts


	../a/index.ts
	  Imported via "../a" from file 'index.ts'
	index.ts
	  Matched by include pattern '**/*' in 'tsconfig.json'

-----------------------------------------------
response:{"response":[{"name":"abcdef","kind":"const","kindModifiers":"export","isCaseSensitive":true,"matchKind":"exact","file":"/a/index.ts","start":{"line":1,"offset":14},"end":{"line":1,"offset":24}}],"responseRequired":true}