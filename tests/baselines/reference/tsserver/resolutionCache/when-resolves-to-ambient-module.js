Info 0    [16:00:33.000] Provided types map file "/typesMap.json" doesn't exist
Info 1    [16:00:34.000] Search path: /user/username/projects/myproject/src/somefolder
Info 2    [16:00:35.000] For info: /user/username/projects/myproject/src/somefolder/srcfile.ts :: Config file name: /user/username/projects/myproject/src/tsconfig.json
Info 3    [16:00:36.000] Creating configuration project /user/username/projects/myproject/src/tsconfig.json
Info 4    [16:00:37.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/src/tsconfig.json WatchType: Config file
Info 5    [16:00:38.000] Config: /user/username/projects/myproject/src/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/src/somefolder/module1.ts",
  "/user/username/projects/myproject/src/somefolder/srcfile.ts",
  "/user/username/projects/myproject/src/typings/electron.d.ts",
  "/user/username/projects/myproject/src/typings/node.d.ts"
 ],
 "options": {
  "module": 2,
  "moduleResolution": 1,
  "target": 1,
  "outDir": "/user/username/projects/myproject/out",
  "baseUrl": "/user/username/projects/myproject/src",
  "typeRoots": [
   "/user/username/projects/myproject/src/typings"
  ],
  "configFilePath": "/user/username/projects/myproject/src/tsconfig.json"
 }
}
Info 6    [16:00:39.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src 1 undefined Config: /user/username/projects/myproject/src/tsconfig.json WatchType: Wild card directory
Info 7    [16:00:40.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src 1 undefined Config: /user/username/projects/myproject/src/tsconfig.json WatchType: Wild card directory
Info 8    [16:00:41.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 9    [16:00:42.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/somefolder/module1.ts 500 undefined WatchType: Closed Script info
Info 10   [16:00:43.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/typings/electron.d.ts 500 undefined WatchType: Closed Script info
Info 11   [16:00:44.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/typings/node.d.ts 500 undefined WatchType: Closed Script info
Info 12   [16:00:45.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/src/tsconfig.json
Info 13   [16:00:46.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 14   [16:00:47.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/somefolder 1 undefined Project: /user/username/projects/myproject/src/tsconfig.json WatchType: Failed Lookup Locations
Info 15   [16:00:48.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/somefolder 1 undefined Project: /user/username/projects/myproject/src/tsconfig.json WatchType: Failed Lookup Locations
Info 16   [16:00:49.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/somefolder 1 undefined Project: /user/username/projects/myproject/src/tsconfig.json WatchType: Failed Lookup Locations
Info 17   [16:00:50.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/somefolder 1 undefined Project: /user/username/projects/myproject/src/tsconfig.json WatchType: Failed Lookup Locations
Info 18   [16:00:51.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/node_modules 1 undefined Project: /user/username/projects/myproject/src/tsconfig.json WatchType: Failed Lookup Locations
Info 19   [16:00:52.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/node_modules 1 undefined Project: /user/username/projects/myproject/src/tsconfig.json WatchType: Failed Lookup Locations
Info 20   [16:00:53.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/src/tsconfig.json WatchType: Failed Lookup Locations
Info 21   [16:00:54.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/src/tsconfig.json WatchType: Failed Lookup Locations
Info 22   [16:00:55.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/typings 1 undefined Project: /user/username/projects/myproject/src/tsconfig.json WatchType: Type roots
Info 23   [16:00:56.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/typings 1 undefined Project: /user/username/projects/myproject/src/tsconfig.json WatchType: Type roots
Info 24   [16:00:57.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/src/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 25   [16:00:58.000] Project '/user/username/projects/myproject/src/tsconfig.json' (Configured)
Info 26   [16:00:59.000] 	Files (5)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/src/somefolder/module1.ts
	/user/username/projects/myproject/src/somefolder/srcfile.ts
	/user/username/projects/myproject/src/typings/electron.d.ts
	/user/username/projects/myproject/src/typings/node.d.ts


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	somefolder/module1.ts
	  Matched by default include pattern '**/*'
	  Imported via "somefolder/module1" from file 'somefolder/srcfile.ts'
	somefolder/srcfile.ts
	  Matched by default include pattern '**/*'
	typings/electron.d.ts
	  Matched by default include pattern '**/*'
	typings/node.d.ts
	  Matched by default include pattern '**/*'

Info 27   [16:01:00.000] -----------------------------------------------
Info 28   [16:01:01.000] Project '/user/username/projects/myproject/src/tsconfig.json' (Configured)
Info 28   [16:01:02.000] 	Files (5)

Info 28   [16:01:03.000] -----------------------------------------------
Info 28   [16:01:04.000] Open files: 
Info 28   [16:01:05.000] 	FileName: /user/username/projects/myproject/src/somefolder/srcfile.ts ProjectRootPath: /user/username/projects/myproject
Info 28   [16:01:06.000] 		Projects: /user/username/projects/myproject/src/tsconfig.json