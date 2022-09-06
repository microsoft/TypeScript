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
Info 19   [16:00:53.000] Search path: /user/username/projects/solution/compiler
Info 20   [16:00:54.000] For info: /user/username/projects/solution/compiler/tsconfig.json :: Config file name: /user/username/projects/solution/tsconfig.json
Info 21   [16:00:55.000] Creating configuration project /user/username/projects/solution/tsconfig.json
Info 22   [16:00:56.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/solution/tsconfig.json 2000 undefined Project: /user/username/projects/solution/tsconfig.json WatchType: Config file
Info 23   [16:00:57.000] Search path: /user/username/projects/solution
Info 24   [16:00:58.000] For info: /user/username/projects/solution/tsconfig.json :: No config files found.
Info 25   [16:00:59.000] Project '/user/username/projects/solution/compiler/tsconfig.json' (Configured)
Info 25   [16:01:00.000] 	Files (3)

Info 25   [16:01:01.000] -----------------------------------------------
Info 25   [16:01:02.000] Project '/user/username/projects/solution/tsconfig.json' (Configured)
Info 25   [16:01:03.000] 	Files (0) InitialLoadPending

Info 25   [16:01:04.000] -----------------------------------------------
Info 25   [16:01:05.000] Open files: 
Info 25   [16:01:06.000] 	FileName: /user/username/projects/solution/compiler/program.ts ProjectRootPath: undefined
Info 25   [16:01:07.000] 		Projects: /user/username/projects/solution/compiler/tsconfig.json
Info 25   [16:01:08.000] response:{"responseRequired":false}
Info 26   [16:01:09.000] request:{"command":"references","arguments":{"file":"/user/username/projects/solution/compiler/program.ts","line":4,"offset":48},"seq":1,"type":"request"}
Info 27   [16:01:10.000] Finding references to /user/username/projects/solution/compiler/program.ts position 133 in project /user/username/projects/solution/compiler/tsconfig.json
Info 28   [16:01:11.000] response:{"response":{"refs":[{"file":"/user/username/projects/solution/compiler/program.ts","start":{"line":4,"offset":48},"end":{"line":4,"offset":61},"lineText":"                        getSourceFiles: () => [getSourceFile()]","isWriteAccess":false},{"file":"/user/username/projects/solution/compiler/program.ts","start":{"line":6,"offset":30},"end":{"line":6,"offset":43},"contextStart":{"line":6,"offset":21},"contextEnd":{"line":6,"offset":69},"lineText":"                    function getSourceFile() { return \"something\"; }","isWriteAccess":true}],"symbolName":"getSourceFile","symbolStartOffset":48,"symbolDisplayString":"function getSourceFile(): string"},"responseRequired":true}
Info 29   [16:01:12.000] request:{"command":"references","arguments":{"file":"/user/username/projects/solution/compiler/program.ts","line":4,"offset":25},"seq":2,"type":"request"}
Info 30   [16:01:13.000] Finding references to /user/username/projects/solution/compiler/program.ts position 110 in project /user/username/projects/solution/compiler/tsconfig.json
Info 31   [16:01:14.000] Loading configured project /user/username/projects/solution/tsconfig.json
Info 32   [16:01:15.000] Config: /user/username/projects/solution/tsconfig.json : {
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
Info 33   [16:01:16.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 34   [16:01:17.000] Starting updateGraphWorker: Project: /user/username/projects/solution/tsconfig.json
Info 35   [16:01:18.000] Config: /user/username/projects/solution/services/tsconfig.json : {
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
Info 36   [16:01:19.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/solution/services/tsconfig.json 2000 undefined Project: /user/username/projects/solution/tsconfig.json WatchType: Config file
Info 37   [16:01:20.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/node_modules/@types 1 undefined Project: /user/username/projects/solution/tsconfig.json WatchType: Type roots
Info 38   [16:01:21.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/node_modules/@types 1 undefined Project: /user/username/projects/solution/tsconfig.json WatchType: Type roots
Info 39   [16:01:22.000] Finishing updateGraphWorker: Project: /user/username/projects/solution/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 40   [16:01:23.000] Different program with same set of files
Info 41   [16:01:24.000] Creating configuration project /user/username/projects/solution/services/tsconfig.json
Info 42   [16:01:25.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 43   [16:01:26.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/solution/services/services.ts 500 undefined WatchType: Closed Script info
Info 44   [16:01:27.000] Starting updateGraphWorker: Project: /user/username/projects/solution/services/tsconfig.json
Info 45   [16:01:28.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/services/node_modules/@types 1 undefined Project: /user/username/projects/solution/services/tsconfig.json WatchType: Type roots
Info 46   [16:01:29.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/services/node_modules/@types 1 undefined Project: /user/username/projects/solution/services/tsconfig.json WatchType: Type roots
Info 47   [16:01:30.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/node_modules/@types 1 undefined Project: /user/username/projects/solution/services/tsconfig.json WatchType: Type roots
Info 48   [16:01:31.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/node_modules/@types 1 undefined Project: /user/username/projects/solution/services/tsconfig.json WatchType: Type roots
Info 49   [16:01:32.000] Finishing updateGraphWorker: Project: /user/username/projects/solution/services/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 50   [16:01:33.000] Project '/user/username/projects/solution/services/tsconfig.json' (Configured)
Info 51   [16:01:34.000] 	Files (4)
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

Info 52   [16:01:35.000] -----------------------------------------------
Info 53   [16:01:36.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/solution/compiler/types.d.ts 2000 undefined Project: /user/username/projects/solution/compiler/tsconfig.json WatchType: Missing generated file
Info 54   [16:01:37.000] Finding references to /user/username/projects/solution/compiler/types.ts position 103 in project /user/username/projects/solution/services/tsconfig.json
Info 55   [16:01:38.000] Search path: /user/username/projects/solution/compiler
Info 56   [16:01:39.000] For info: /user/username/projects/solution/compiler/types.ts :: Config file name: /user/username/projects/solution/compiler/tsconfig.json
Info 57   [16:01:40.000] Search path: /user/username/projects/solution/compiler
Info 58   [16:01:41.000] For info: /user/username/projects/solution/compiler/types.ts :: Config file name: /user/username/projects/solution/compiler/tsconfig.json
Info 59   [16:01:42.000] Search path: /user/username/projects/solution/compiler
Info 60   [16:01:43.000] For info: /user/username/projects/solution/compiler/program.ts :: Config file name: /user/username/projects/solution/compiler/tsconfig.json
Info 61   [16:01:44.000] response:{"response":{"refs":[{"file":"/user/username/projects/solution/compiler/types.ts","start":{"line":4,"offset":25},"end":{"line":4,"offset":39},"contextStart":{"line":4,"offset":25},"contextEnd":{"line":4,"offset":52},"lineText":"                        getSourceFiles(): string[];","isWriteAccess":false,"isDefinition":false},{"file":"/user/username/projects/solution/compiler/program.ts","start":{"line":4,"offset":25},"end":{"line":4,"offset":39},"contextStart":{"line":4,"offset":25},"contextEnd":{"line":4,"offset":64},"lineText":"                        getSourceFiles: () => [getSourceFile()]","isWriteAccess":true,"isDefinition":true},{"file":"/user/username/projects/solution/services/services.ts","start":{"line":3,"offset":44},"end":{"line":3,"offset":58},"lineText":"                    const result = program.getSourceFiles();","isWriteAccess":false,"isDefinition":false}],"symbolName":"getSourceFiles","symbolStartOffset":25,"symbolDisplayString":"(method) ts.Program.getSourceFiles(): string[]"},"responseRequired":true}