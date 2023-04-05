currentDirectory:: / useCaseSensitiveFileNames: false
Info 0    [00:00:11.000] Provided types map file "/typesMap.json" doesn't exist
Creating project service
//// [/a/b/f1.ts]
let x = 1

//// [/a/b/tsconfig.json]
{"compilerOptions":{}}


Info 1    [00:00:12.000] Search path: /a/b
Info 2    [00:00:13.000] For info: /a/b/f1.ts :: Config file name: /a/b/tsconfig.json
Info 3    [00:00:14.000] Creating configuration project /a/b/tsconfig.json
Info 4    [00:00:15.000] FileWatcher:: Added:: WatchInfo: /a/b/tsconfig.json 2000 undefined Project: /a/b/tsconfig.json WatchType: Config file
Info 5    [00:00:16.000] Config: /a/b/tsconfig.json : {
 "rootNames": [
  "/a/b/f1.ts"
 ],
 "options": {
  "configFilePath": "/a/b/tsconfig.json"
 }
}
Info 6    [00:00:17.000] DirectoryWatcher:: Added:: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Info 7    [00:00:18.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Info 8    [00:00:19.000] Starting updateGraphWorker: Project: /a/b/tsconfig.json
Info 9    [00:00:20.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /a/b/tsconfig.json WatchType: Missing file
Info 10   [00:00:21.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/tsconfig.json WatchType: Type roots
Info 11   [00:00:22.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/tsconfig.json WatchType: Type roots
Info 12   [00:00:23.000] Finishing updateGraphWorker: Project: /a/b/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 13   [00:00:24.000] Project '/a/b/tsconfig.json' (Configured)
Info 14   [00:00:25.000] 	Files (1)
	/a/b/f1.ts SVC-1-0 "let x = 1"


	f1.ts
	  Matched by default include pattern '**/*'

Info 15   [00:00:26.000] -----------------------------------------------
Info 16   [00:00:27.000] Project '/a/b/tsconfig.json' (Configured)
Info 16   [00:00:28.000] 	Files (1)

Info 16   [00:00:29.000] -----------------------------------------------
Info 16   [00:00:30.000] Open files: 
Info 16   [00:00:31.000] 	FileName: /a/b/f1.ts ProjectRootPath: undefined
Info 16   [00:00:32.000] 		Projects: /a/b/tsconfig.json
Info 16   [00:00:33.000] FileWatcher:: Added:: WatchInfo: /a/b/f1.ts 500 undefined WatchType: Closed Script info
Info 17   [00:00:34.000] Project '/a/b/tsconfig.json' (Configured)
Info 17   [00:00:35.000] 	Files (1)

Info 17   [00:00:36.000] -----------------------------------------------
Info 17   [00:00:37.000] Open files: 
Info 17   [00:00:38.000] `remove Project::
Info 18   [00:00:39.000] Project '/a/b/tsconfig.json' (Configured)
Info 19   [00:00:40.000] 	Files (1)
	/a/b/f1.ts


	f1.ts
	  Matched by default include pattern '**/*'

Info 20   [00:00:41.000] -----------------------------------------------
Info 21   [00:00:42.000] DirectoryWatcher:: Close:: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Info 22   [00:00:43.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Info 23   [00:00:44.000] FileWatcher:: Close:: WatchInfo: /a/b/tsconfig.json 2000 undefined Project: /a/b/tsconfig.json WatchType: Config file
Info 24   [00:00:45.000] DirectoryWatcher:: Close:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/tsconfig.json WatchType: Type roots
Info 25   [00:00:46.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/tsconfig.json WatchType: Type roots
Info 26   [00:00:47.000] FileWatcher:: Close:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /a/b/tsconfig.json WatchType: Missing file