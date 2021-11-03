Provided types map file "/a/lib/typesMap.json" doesn't exist
request:{"seq":0,"type":"request","command":"open","arguments":{"file":"/user/username/projects/solution/api/src/server.ts"}}
Search path: /user/username/projects/solution/api/src
For info: /user/username/projects/solution/api/src/server.ts :: Config file name: /user/username/projects/solution/api/tsconfig.json
Creating configuration project /user/username/projects/solution/api/tsconfig.json
FileWatcher:: Added:: WatchInfo: /user/username/projects/solution/api/tsconfig.json 2000 undefined Project: /user/username/projects/solution/api/tsconfig.json WatchType: Config file
Config: /user/username/projects/solution/api/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/solution/api/src/server.ts"
 ],
 "options": {
  "composite": true,
  "outDir": "/user/username/projects/solution/api/dist",
  "rootDir": "/user/username/projects/solution/api/src",
  "configFilePath": "/user/username/projects/solution/api/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/user/username/projects/solution/shared",
   "originalPath": "../shared"
  }
 ]
}
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/api/src 1 undefined Config: /user/username/projects/solution/api/tsconfig.json WatchType: Wild card directory
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/api/src 1 undefined Config: /user/username/projects/solution/api/tsconfig.json WatchType: Wild card directory
Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Starting updateGraphWorker: Project: /user/username/projects/solution/api/tsconfig.json
Config: /user/username/projects/solution/shared/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/solution/shared/src/index.ts"
 ],
 "options": {
  "composite": true,
  "outDir": "/user/username/projects/solution/shared/dist",
  "rootDir": "/user/username/projects/solution/shared/src",
  "configFilePath": "/user/username/projects/solution/shared/tsconfig.json"
 }
}
FileWatcher:: Added:: WatchInfo: /user/username/projects/solution/shared/tsconfig.json 2000 undefined Project: /user/username/projects/solution/api/tsconfig.json WatchType: Config file
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/shared/src 1 undefined Config: /user/username/projects/solution/shared/tsconfig.json WatchType: Wild card directory
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/shared/src 1 undefined Config: /user/username/projects/solution/shared/tsconfig.json WatchType: Wild card directory
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/shared 1 undefined Project: /user/username/projects/solution/api/tsconfig.json WatchType: Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/shared 1 undefined Project: /user/username/projects/solution/api/tsconfig.json WatchType: Failed Lookup Locations
FileWatcher:: Added:: WatchInfo: /user/username/projects/solution/shared/src/index.ts 500 undefined WatchType: Closed Script info
FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/api/node_modules/@types 1 undefined Project: /user/username/projects/solution/api/tsconfig.json WatchType: Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/api/node_modules/@types 1 undefined Project: /user/username/projects/solution/api/tsconfig.json WatchType: Type roots
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/node_modules/@types 1 undefined Project: /user/username/projects/solution/api/tsconfig.json WatchType: Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/node_modules/@types 1 undefined Project: /user/username/projects/solution/api/tsconfig.json WatchType: Type roots
Finishing updateGraphWorker: Project: /user/username/projects/solution/api/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Project '/user/username/projects/solution/api/tsconfig.json' (Configured)
	Files (3)
	/a/lib/lib.d.ts
	/user/username/projects/solution/shared/src/index.ts
	/user/username/projects/solution/api/src/server.ts


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	../shared/src/index.ts
	  Imported via "../../shared/dist" from file 'src/server.ts'
	src/server.ts
	  Matched by include pattern 'src' in 'tsconfig.json'

-----------------------------------------------
Search path: /user/username/projects/solution/api
For info: /user/username/projects/solution/api/tsconfig.json :: Config file name: /user/username/projects/solution/tsconfig.json
Creating configuration project /user/username/projects/solution/tsconfig.json
FileWatcher:: Added:: WatchInfo: /user/username/projects/solution/tsconfig.json 2000 undefined Project: /user/username/projects/solution/tsconfig.json WatchType: Config file
Search path: /user/username/projects/solution
For info: /user/username/projects/solution/tsconfig.json :: No config files found.
Project '/user/username/projects/solution/api/tsconfig.json' (Configured)
	Files (3)

-----------------------------------------------
Project '/user/username/projects/solution/tsconfig.json' (Configured)
	Files (0) InitialLoadPending

-----------------------------------------------
Open files: 
	FileName: /user/username/projects/solution/api/src/server.ts ProjectRootPath: undefined
		Projects: /user/username/projects/solution/api/tsconfig.json
response:{"responseRequired":false}
request:{"command":"references","arguments":{"file":"/user/username/projects/solution/api/src/server.ts","line":2,"offset":12},"seq":1,"type":"request"}
Search path: /user/username/projects/solution/shared/src
For info: /user/username/projects/solution/shared/src/index.ts :: Config file name: /user/username/projects/solution/shared/tsconfig.json
Creating configuration project /user/username/projects/solution/shared/tsconfig.json
Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Starting updateGraphWorker: Project: /user/username/projects/solution/shared/tsconfig.json
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/shared/node_modules/@types 1 undefined Project: /user/username/projects/solution/shared/tsconfig.json WatchType: Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/shared/node_modules/@types 1 undefined Project: /user/username/projects/solution/shared/tsconfig.json WatchType: Type roots
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/node_modules/@types 1 undefined Project: /user/username/projects/solution/shared/tsconfig.json WatchType: Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/node_modules/@types 1 undefined Project: /user/username/projects/solution/shared/tsconfig.json WatchType: Type roots
Finishing updateGraphWorker: Project: /user/username/projects/solution/shared/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Project '/user/username/projects/solution/shared/tsconfig.json' (Configured)
	Files (2)
	/a/lib/lib.d.ts
	/user/username/projects/solution/shared/src/index.ts


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	src/index.ts
	  Matched by include pattern 'src' in 'tsconfig.json'

-----------------------------------------------
Search path: /user/username/projects/solution/shared/src
For info: /user/username/projects/solution/shared/src/index.ts :: Config file name: /user/username/projects/solution/shared/tsconfig.json
response:{"response":{"refs":[{"file":"/user/username/projects/solution/shared/src/index.ts","start":{"line":1,"offset":17},"end":{"line":1,"offset":20},"contextStart":{"line":1,"offset":17},"contextEnd":{"line":1,"offset":31},"lineText":"const local = { bar: () => { } };","isWriteAccess":true,"isDefinition":true},{"file":"/user/username/projects/solution/api/src/server.ts","start":{"line":2,"offset":12},"end":{"line":2,"offset":15},"lineText":"shared.foo.bar();","isWriteAccess":false,"isDefinition":false}],"symbolName":"bar","symbolStartOffset":12,"symbolDisplayString":"(property) bar: () => void"},"responseRequired":true}