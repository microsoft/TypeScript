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
  "disableSolutionSearching": true,
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
Project '/user/username/projects/solution/compiler/tsconfig.json' (Configured)
	Files (3)

-----------------------------------------------
Open files: 
	FileName: /user/username/projects/solution/compiler/program.ts ProjectRootPath: undefined
		Projects: /user/username/projects/solution/compiler/tsconfig.json
response:{"responseRequired":false}
request:{"command":"references","arguments":{"file":"/user/username/projects/solution/compiler/program.ts","line":4,"offset":25},"seq":1,"type":"request"}
response:{"response":{"refs":[{"file":"/user/username/projects/solution/compiler/types.ts","start":{"line":4,"offset":25},"end":{"line":4,"offset":39},"contextStart":{"line":4,"offset":25},"contextEnd":{"line":4,"offset":52},"lineText":"                        getSourceFiles(): string[];","isWriteAccess":false,"isDefinition":false},{"file":"/user/username/projects/solution/compiler/program.ts","start":{"line":4,"offset":25},"end":{"line":4,"offset":39},"contextStart":{"line":4,"offset":25},"contextEnd":{"line":4,"offset":64},"lineText":"                        getSourceFiles: () => [getSourceFile()]","isWriteAccess":true,"isDefinition":true}],"symbolName":"getSourceFiles","symbolStartOffset":25,"symbolDisplayString":"(method) ts.Program.getSourceFiles(): string[]"},"responseRequired":true}