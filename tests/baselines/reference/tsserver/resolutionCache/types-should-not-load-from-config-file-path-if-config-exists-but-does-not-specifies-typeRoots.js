Info 0    [00:00:21.000] Provided types map file "/typesMap.json" doesn't exist
Creating project service
//// [/a/b/app.ts]
let x = 1

//// [/a/b/tsconfig.json]
{"compilerOptions":{"types":["node"],"typeRoots":[]}}

//// [/a/b/node_modules/@types/node/index.d.ts]
declare var process: any


Info 1    [00:00:22.000] Search path: /a/b
Info 2    [00:00:23.000] For info: /a/b/app.ts :: Config file name: /a/b/tsconfig.json
Info 3    [00:00:24.000] Creating configuration project /a/b/tsconfig.json
Info 4    [00:00:25.000] FileWatcher:: Added:: WatchInfo: /a/b/tsconfig.json 2000 undefined Project: /a/b/tsconfig.json WatchType: Config file
Info 5    [00:00:26.000] Config: /a/b/tsconfig.json : {
 "rootNames": [
  "/a/b/app.ts"
 ],
 "options": {
  "types": [
   "node"
  ],
  "typeRoots": [],
  "configFilePath": "/a/b/tsconfig.json"
 }
}
Info 6    [00:00:27.000] DirectoryWatcher:: Added:: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Info 7    [00:00:28.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Info 8    [00:00:29.000] Starting updateGraphWorker: Project: /a/b/tsconfig.json
Info 9    [00:00:30.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /a/b/tsconfig.json WatchType: Missing file
Info 10   [00:00:31.000] Finishing updateGraphWorker: Project: /a/b/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 11   [00:00:32.000] Project '/a/b/tsconfig.json' (Configured)
Info 12   [00:00:33.000] 	Files (1)
	/a/b/app.ts SVC-1-0 "let x = 1"


	app.ts
	  Matched by default include pattern '**/*'

Info 13   [00:00:34.000] -----------------------------------------------
Info 14   [00:00:35.000] Project '/a/b/tsconfig.json' (Configured)
Info 14   [00:00:36.000] 	Files (1)

Info 14   [00:00:37.000] -----------------------------------------------
Info 14   [00:00:38.000] Open files: 
Info 14   [00:00:39.000] 	FileName: /a/b/app.ts ProjectRootPath: undefined
Info 14   [00:00:40.000] 		Projects: /a/b/tsconfig.json