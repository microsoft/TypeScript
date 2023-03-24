currentDirectory:: /a/c useCaseSensitiveFileNames: false
Info 0    [00:00:21.000] Provided types map file "/typesMap.json" doesn't exist
Creating project service
//// [/a/b/app.ts]
let x = 1

//// [/a/b/tsconfig.json]
{"compilerOptions":{"types":["node"]}}

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
  "configFilePath": "/a/b/tsconfig.json"
 }
}
Info 6    [00:00:27.000] DirectoryWatcher:: Added:: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Info 7    [00:00:28.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Info 8    [00:00:29.000] Starting updateGraphWorker: Project: /a/b/tsconfig.json
Info 9    [00:00:30.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info 10   [00:00:31.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info 11   [00:00:32.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules 1 undefined Project: /a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 12   [00:00:33.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules 1 undefined Project: /a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 13   [00:00:34.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /a/b/tsconfig.json WatchType: Missing file
Info 14   [00:00:35.000] Finishing updateGraphWorker: Project: /a/b/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 15   [00:00:36.000] Project '/a/b/tsconfig.json' (Configured)
Info 16   [00:00:37.000] 	Files (2)
	/a/b/app.ts SVC-1-0 "let x = 1"
	/a/b/node_modules/@types/node/index.d.ts Text-1 "declare var process: any"


	app.ts
	  Matched by default include pattern '**/*'
	node_modules/@types/node/index.d.ts
	  Entry point of type library 'node' specified in compilerOptions

Info 17   [00:00:38.000] -----------------------------------------------
Info 18   [00:00:39.000] Project '/a/b/tsconfig.json' (Configured)
Info 18   [00:00:40.000] 	Files (2)

Info 18   [00:00:41.000] -----------------------------------------------
Info 18   [00:00:42.000] Open files: 
Info 18   [00:00:43.000] 	FileName: /a/b/app.ts ProjectRootPath: undefined
Info 18   [00:00:44.000] 		Projects: /a/b/tsconfig.json