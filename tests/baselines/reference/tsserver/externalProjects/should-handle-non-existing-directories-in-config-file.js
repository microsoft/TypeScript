currentDirectory:: / useCaseSensitiveFileNames: false
Info 0    [00:00:11.000] Provided types map file "/typesMap.json" doesn't exist
Creating project service
//// [/a/src/app.ts]
let x = 1;

//// [/a/tsconfig.json]
{"compilerOptions":{},"include":["src/**/*","notexistingfolder/*"]}


Info 1    [00:00:12.000] Search path: /a/src
Info 2    [00:00:13.000] For info: /a/src/app.ts :: Config file name: /a/tsconfig.json
Info 3    [00:00:14.000] Creating configuration project /a/tsconfig.json
Info 4    [00:00:15.000] FileWatcher:: Added:: WatchInfo: /a/tsconfig.json 2000 undefined Project: /a/tsconfig.json WatchType: Config file
Info 5    [00:00:16.000] Config: /a/tsconfig.json : {
 "rootNames": [
  "/a/src/app.ts"
 ],
 "options": {
  "configFilePath": "/a/tsconfig.json"
 }
}
Info 6    [00:00:17.000] DirectoryWatcher:: Added:: WatchInfo: /a/src 1 undefined Config: /a/tsconfig.json WatchType: Wild card directory
Info 7    [00:00:18.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/src 1 undefined Config: /a/tsconfig.json WatchType: Wild card directory
Info 8    [00:00:19.000] DirectoryWatcher:: Added:: WatchInfo: /a/notexistingfolder 0 undefined Config: /a/tsconfig.json WatchType: Wild card directory
Info 9    [00:00:20.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/notexistingfolder 0 undefined Config: /a/tsconfig.json WatchType: Wild card directory
Info 10   [00:00:21.000] Starting updateGraphWorker: Project: /a/tsconfig.json
Info 11   [00:00:22.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /a/tsconfig.json WatchType: Missing file
Info 12   [00:00:23.000] DirectoryWatcher:: Added:: WatchInfo: /a/node_modules/@types 1 undefined Project: /a/tsconfig.json WatchType: Type roots
Info 13   [00:00:24.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/node_modules/@types 1 undefined Project: /a/tsconfig.json WatchType: Type roots
Info 14   [00:00:25.000] Finishing updateGraphWorker: Project: /a/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 15   [00:00:26.000] Project '/a/tsconfig.json' (Configured)
Info 16   [00:00:27.000] 	Files (1)
	/a/src/app.ts SVC-1-0 "let x = 1;"


	src/app.ts
	  Matched by include pattern 'src/**/*' in 'tsconfig.json'

Info 17   [00:00:28.000] -----------------------------------------------
Info 18   [00:00:29.000] Project '/a/tsconfig.json' (Configured)
Info 18   [00:00:30.000] 	Files (1)

Info 18   [00:00:31.000] -----------------------------------------------
Info 18   [00:00:32.000] Open files: 
Info 18   [00:00:33.000] 	FileName: /a/src/app.ts ProjectRootPath: undefined
Info 18   [00:00:34.000] 		Projects: /a/tsconfig.json
Configured project: /a/tsconfig.json hasOpenRef:: true isClosed: false
Info 18   [00:00:35.000] FileWatcher:: Added:: WatchInfo: /a/src/app.ts 500 undefined WatchType: Closed Script info
Info 19   [00:00:36.000] Project '/a/tsconfig.json' (Configured)
Info 19   [00:00:37.000] 	Files (1)

Info 19   [00:00:38.000] -----------------------------------------------
Info 19   [00:00:39.000] Open files: 
Configured project: /a/tsconfig.json hasOpenRef:: false isClosed: false
Info 19   [00:00:40.000] FileWatcher:: Close:: WatchInfo: /a/src/app.ts 500 undefined WatchType: Closed Script info
Info 20   [00:00:41.000] Search path: /a/src
Info 21   [00:00:42.000] For info: /a/src/app.ts :: Config file name: /a/tsconfig.json
Info 22   [00:00:43.000] Project '/a/tsconfig.json' (Configured)
Info 22   [00:00:44.000] 	Files (1)

Info 22   [00:00:45.000] -----------------------------------------------
Info 22   [00:00:46.000] Open files: 
Info 22   [00:00:47.000] 	FileName: /a/src/app.ts ProjectRootPath: undefined
Info 22   [00:00:48.000] 		Projects: /a/tsconfig.json
Configured project: /a/tsconfig.json hasOpenRef:: true isClosed: false