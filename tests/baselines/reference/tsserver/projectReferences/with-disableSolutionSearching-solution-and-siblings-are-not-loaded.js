Info 0    [16:00:34.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Info 1    [16:00:35.000] request:{"seq":0,"type":"request","command":"open","arguments":{"file":"/user/username/projects/solution/compiler/program.ts"}}
Info 2    [16:00:36.000] Search path: /user/username/projects/solution/compiler
Info 3    [16:00:37.000] For info: /user/username/projects/solution/compiler/program.ts :: Config file name: /user/username/projects/solution/compiler/tsconfig.json
Info 4    [16:00:38.000] Creating configuration project /user/username/projects/solution/compiler/tsconfig.json
Info 5    [16:00:39.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/solution/compiler/tsconfig.json 2000 undefined Project: /user/username/projects/solution/compiler/tsconfig.json WatchType: Config file
Info 6    [16:00:40.000] Config: /user/username/projects/solution/compiler/tsconfig.json : {
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
Info 7    [16:00:41.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 8    [16:00:42.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/solution/compiler/types.ts 500 undefined WatchType: Closed Script info
Info 9    [16:00:43.000] Starting updateGraphWorker: Project: /user/username/projects/solution/compiler/tsconfig.json
Info 10   [16:00:44.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 11   [16:00:45.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/compiler/node_modules/@types 1 undefined Project: /user/username/projects/solution/compiler/tsconfig.json WatchType: Type roots
Info 12   [16:00:46.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/compiler/node_modules/@types 1 undefined Project: /user/username/projects/solution/compiler/tsconfig.json WatchType: Type roots
Info 13   [16:00:47.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/node_modules/@types 1 undefined Project: /user/username/projects/solution/compiler/tsconfig.json WatchType: Type roots
Info 14   [16:00:48.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/node_modules/@types 1 undefined Project: /user/username/projects/solution/compiler/tsconfig.json WatchType: Type roots
Info 15   [16:00:49.000] Finishing updateGraphWorker: Project: /user/username/projects/solution/compiler/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 16   [16:00:50.000] Project '/user/username/projects/solution/compiler/tsconfig.json' (Configured)
Info 17   [16:00:51.000] 	Files (3)
	/a/lib/lib.d.ts
	/user/username/projects/solution/compiler/types.ts
	/user/username/projects/solution/compiler/program.ts


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	types.ts
	  Part of 'files' list in tsconfig.json
	program.ts
	  Part of 'files' list in tsconfig.json

Info 18   [16:00:52.000] -----------------------------------------------
Info 19   [16:00:53.000] Project '/user/username/projects/solution/compiler/tsconfig.json' (Configured)
Info 19   [16:00:54.000] 	Files (3)

Info 19   [16:00:55.000] -----------------------------------------------
Info 19   [16:00:56.000] Open files: 
Info 19   [16:00:57.000] 	FileName: /user/username/projects/solution/compiler/program.ts ProjectRootPath: undefined
Info 19   [16:00:58.000] 		Projects: /user/username/projects/solution/compiler/tsconfig.json
Info 19   [16:00:59.000] response:{"responseRequired":false}
Info 20   [16:01:00.000] request:{"command":"references","arguments":{"file":"/user/username/projects/solution/compiler/program.ts","line":4,"offset":25},"seq":1,"type":"request"}
Info 21   [16:01:01.000] Finding references to /user/username/projects/solution/compiler/program.ts position 110 in project /user/username/projects/solution/compiler/tsconfig.json
Info 22   [16:01:02.000] response:{"response":{"refs":[{"file":"/user/username/projects/solution/compiler/types.ts","start":{"line":4,"offset":25},"end":{"line":4,"offset":39},"contextStart":{"line":4,"offset":25},"contextEnd":{"line":4,"offset":52},"lineText":"                        getSourceFiles(): string[];","isWriteAccess":false,"isDefinition":false},{"file":"/user/username/projects/solution/compiler/program.ts","start":{"line":4,"offset":25},"end":{"line":4,"offset":39},"contextStart":{"line":4,"offset":25},"contextEnd":{"line":4,"offset":64},"lineText":"                        getSourceFiles: () => [getSourceFile()]","isWriteAccess":true,"isDefinition":true}],"symbolName":"getSourceFiles","symbolStartOffset":25,"symbolDisplayString":"(method) ts.Program.getSourceFiles(): string[]"},"responseRequired":true}