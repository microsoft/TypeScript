Provided types map file "/a/lib/typesMap.json" doesn't exist
request:{"seq":0,"type":"request","command":"open","arguments":{"file":"/user/username/projects/solution/compiler/program.ts"}}
Search path: /user/username/projects/solution/compiler
For info: /user/username/projects/solution/compiler/program.ts :: Config file name: /user/username/projects/solution/compiler/tsconfig.json
Creating configuration project /user/username/projects/solution/compiler/tsconfig.json
FileWatcher:: Added:: WatchInfo: /user/username/projects/solution/compiler/tsconfig.json 2000 undefined Project: /user/username/projects/solution/compiler/tsconfig.json WatchType: Config file
Config: /user/username/projects/solution/compiler/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/solution/compiler/types.ts",
  "/user/username/projects/solution/compiler/program.ts"
 ],
 "options": {
  "composite": true,
  "module": 0,
  "configFilePath": "/user/username/projects/solution/compiler/tsconfig.json"
 }
}
Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
FileWatcher:: Added:: WatchInfo: /user/username/projects/solution/compiler/types.ts 500 undefined WatchType: Closed Script info
Starting updateGraphWorker: Project: /user/username/projects/solution/compiler/tsconfig.json
FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/compiler/node_modules/@types 1 undefined Project: /user/username/projects/solution/compiler/tsconfig.json WatchType: Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/compiler/node_modules/@types 1 undefined Project: /user/username/projects/solution/compiler/tsconfig.json WatchType: Type roots
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/node_modules/@types 1 undefined Project: /user/username/projects/solution/compiler/tsconfig.json WatchType: Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/node_modules/@types 1 undefined Project: /user/username/projects/solution/compiler/tsconfig.json WatchType: Type roots
Finishing updateGraphWorker: Project: /user/username/projects/solution/compiler/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Project '/user/username/projects/solution/compiler/tsconfig.json' (Configured)
	Files (3)
	/a/lib/lib.d.ts
	/user/username/projects/solution/compiler/types.ts
	/user/username/projects/solution/compiler/program.ts


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	types.ts
	  Part of 'files' list in tsconfig.json
	program.ts
	  Part of 'files' list in tsconfig.json

-----------------------------------------------
Search path: /user/username/projects/solution/compiler
For info: /user/username/projects/solution/compiler/tsconfig.json :: Config file name: /user/username/projects/solution/tsconfig.json
Creating configuration project /user/username/projects/solution/tsconfig.json
FileWatcher:: Added:: WatchInfo: /user/username/projects/solution/tsconfig.json 2000 undefined Project: /user/username/projects/solution/tsconfig.json WatchType: Config file
Search path: /user/username/projects/solution
For info: /user/username/projects/solution/tsconfig.json :: No config files found.
Project '/user/username/projects/solution/compiler/tsconfig.json' (Configured)
	Files (3)

-----------------------------------------------
Project '/user/username/projects/solution/tsconfig.json' (Configured)
	Files (0) InitialLoadPending

-----------------------------------------------
Open files: 
	FileName: /user/username/projects/solution/compiler/program.ts ProjectRootPath: undefined
		Projects: /user/username/projects/solution/compiler/tsconfig.json
response:{"responseRequired":false}
request:{"command":"references","arguments":{"file":"/user/username/projects/solution/compiler/program.ts","line":4,"offset":48},"seq":1,"type":"request"}
response:{"response":{"refs":[{"file":"/user/username/projects/solution/compiler/program.ts","start":{"line":4,"offset":48},"end":{"line":4,"offset":61},"lineText":"                        getSourceFiles: () => [getSourceFile()]","isWriteAccess":false,"isDefinition":false},{"file":"/user/username/projects/solution/compiler/program.ts","start":{"line":6,"offset":30},"end":{"line":6,"offset":43},"contextStart":{"line":6,"offset":21},"contextEnd":{"line":6,"offset":69},"lineText":"                    function getSourceFile() { return \"something\"; }","isWriteAccess":true,"isDefinition":true}],"symbolName":"getSourceFile","symbolStartOffset":48,"symbolDisplayString":"function getSourceFile(): string"},"responseRequired":true}
request:{"command":"references","arguments":{"file":"/user/username/projects/solution/compiler/program.ts","line":4,"offset":25},"seq":2,"type":"request"}
Loading configured project /user/username/projects/solution/tsconfig.json
Config: /user/username/projects/solution/tsconfig.json : {
 "rootNames": [],
 "options": {
  "configFilePath": "/user/username/projects/solution/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/user/username/projects/solution/compiler",
   "originalPath": "./compiler"
  },
  {
   "path": "/user/username/projects/solution/services",
   "originalPath": "./services"
  }
 ]
}
Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Starting updateGraphWorker: Project: /user/username/projects/solution/tsconfig.json
Config: /user/username/projects/solution/services/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/solution/services/services.ts"
 ],
 "options": {
  "composite": true,
  "configFilePath": "/user/username/projects/solution/services/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/user/username/projects/solution/compiler",
   "originalPath": "../compiler"
  }
 ]
}
FileWatcher:: Added:: WatchInfo: /user/username/projects/solution/services/tsconfig.json 2000 undefined Project: /user/username/projects/solution/tsconfig.json WatchType: Config file
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/node_modules/@types 1 undefined Project: /user/username/projects/solution/tsconfig.json WatchType: Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/node_modules/@types 1 undefined Project: /user/username/projects/solution/tsconfig.json WatchType: Type roots
Finishing updateGraphWorker: Project: /user/username/projects/solution/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Different program with same set of files
Creating configuration project /user/username/projects/solution/services/tsconfig.json
Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
FileWatcher:: Added:: WatchInfo: /user/username/projects/solution/services/services.ts 500 undefined WatchType: Closed Script info
Starting updateGraphWorker: Project: /user/username/projects/solution/services/tsconfig.json
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/services/node_modules/@types 1 undefined Project: /user/username/projects/solution/services/tsconfig.json WatchType: Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/services/node_modules/@types 1 undefined Project: /user/username/projects/solution/services/tsconfig.json WatchType: Type roots
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/node_modules/@types 1 undefined Project: /user/username/projects/solution/services/tsconfig.json WatchType: Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/node_modules/@types 1 undefined Project: /user/username/projects/solution/services/tsconfig.json WatchType: Type roots
Finishing updateGraphWorker: Project: /user/username/projects/solution/services/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Project '/user/username/projects/solution/services/tsconfig.json' (Configured)
	Files (4)
	/a/lib/lib.d.ts
	/user/username/projects/solution/compiler/types.ts
	/user/username/projects/solution/compiler/program.ts
	/user/username/projects/solution/services/services.ts


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	../compiler/types.ts
	  Source from referenced project '../compiler/tsconfig.json' included because '--module' is specified as 'none'
	../compiler/program.ts
	  Source from referenced project '../compiler/tsconfig.json' included because '--module' is specified as 'none'
	services.ts
	  Part of 'files' list in tsconfig.json

-----------------------------------------------
FileWatcher:: Added:: WatchInfo: /user/username/projects/solution/compiler/types.d.ts 2000 undefined Project: /user/username/projects/solution/compiler/tsconfig.json WatchType: Missing generated file
Search path: /user/username/projects/solution/compiler
For info: /user/username/projects/solution/compiler/types.ts :: Config file name: /user/username/projects/solution/compiler/tsconfig.json
response:{"response":{"refs":[{"file":"/user/username/projects/solution/compiler/types.ts","start":{"line":4,"offset":25},"end":{"line":4,"offset":39},"contextStart":{"line":4,"offset":25},"contextEnd":{"line":4,"offset":52},"lineText":"                        getSourceFiles(): string[];","isWriteAccess":false,"isDefinition":false},{"file":"/user/username/projects/solution/compiler/program.ts","start":{"line":4,"offset":25},"end":{"line":4,"offset":39},"contextStart":{"line":4,"offset":25},"contextEnd":{"line":4,"offset":64},"lineText":"                        getSourceFiles: () => [getSourceFile()]","isWriteAccess":true,"isDefinition":true},{"file":"/user/username/projects/solution/services/services.ts","start":{"line":3,"offset":44},"end":{"line":3,"offset":58},"lineText":"                    const result = program.getSourceFiles();","isWriteAccess":false,"isDefinition":false}],"symbolName":"getSourceFiles","symbolStartOffset":25,"symbolDisplayString":"(method) ts.Program.getSourceFiles(): string[]"},"responseRequired":true}