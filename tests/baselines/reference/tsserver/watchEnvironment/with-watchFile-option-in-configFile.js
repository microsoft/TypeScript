Info 0    [16:00:17.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Info 1    [16:00:18.000] request:{"seq":0,"type":"request","command":"open","arguments":{"file":"/a/b/commonFile1.ts","projectRootPath":"/a/b"}}
Info 2    [16:00:19.000] Search path: /a/b
Info 3    [16:00:20.000] For info: /a/b/commonFile1.ts :: Config file name: /a/b/tsconfig.json
Info 4    [16:00:21.000] Creating configuration project /a/b/tsconfig.json
Info 5    [16:00:22.000] FileWatcher:: Added:: WatchInfo: /a/b/tsconfig.json 2000 undefined Project: /a/b/tsconfig.json WatchType: Config file
Info 6    [16:00:23.000] Config: /a/b/tsconfig.json : {
 "rootNames": [
  "/a/b/commonFile1.ts",
  "/a/b/commonFile2.ts"
 ],
 "options": {
  "configFilePath": "/a/b/tsconfig.json"
 },
 "watchOptions": {
  "watchFile": 4
 }
}
Info 7    [16:00:24.000] FileWatcher:: Close:: WatchInfo: /a/b/tsconfig.json 2000 undefined Project: /a/b/tsconfig.json WatchType: Config file
Info 8    [16:00:25.000] FileWatcher:: Added:: WatchInfo: /a/b/tsconfig.json 2000 {"watchFile":4} Project: /a/b/tsconfig.json WatchType: Config file
Info 9    [16:00:26.000] DirectoryWatcher:: Added:: WatchInfo: /a/b 1 {"watchFile":4} Config: /a/b/tsconfig.json WatchType: Wild card directory
Info 10   [16:00:27.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b 1 {"watchFile":4} Config: /a/b/tsconfig.json WatchType: Wild card directory
Info 11   [16:00:28.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 12   [16:00:29.000] FileWatcher:: Added:: WatchInfo: /a/b/commonFile2.ts 500 undefined WatchType: Closed Script info
Info 13   [16:00:30.000] Starting updateGraphWorker: Project: /a/b/tsconfig.json
Info 14   [16:00:31.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 15   [16:00:32.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 {"watchFile":4} Project: /a/b/tsconfig.json WatchType: Type roots
Info 16   [16:00:33.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 {"watchFile":4} Project: /a/b/tsconfig.json WatchType: Type roots
Info 17   [16:00:34.000] Finishing updateGraphWorker: Project: /a/b/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 18   [16:00:35.000] Project '/a/b/tsconfig.json' (Configured)
Info 19   [16:00:36.000] 	Files (3)
	/a/lib/lib.d.ts
	/a/b/commonFile1.ts
	/a/b/commonFile2.ts


	../lib/lib.d.ts
	  Default library for target 'es3'
	commonFile1.ts
	  Matched by default include pattern '**/*'
	commonFile2.ts
	  Matched by default include pattern '**/*'

Info 20   [16:00:37.000] -----------------------------------------------
Info 21   [16:00:38.000] Project '/a/b/tsconfig.json' (Configured)
Info 21   [16:00:39.000] 	Files (3)

Info 21   [16:00:40.000] -----------------------------------------------
Info 21   [16:00:41.000] Open files: 
Info 21   [16:00:42.000] 	FileName: /a/b/commonFile1.ts ProjectRootPath: /a/b
Info 21   [16:00:43.000] 		Projects: /a/b/tsconfig.json
Info 21   [16:00:44.000] response:{"responseRequired":false}
Info 22   [16:00:45.000] PolledWatches::
Info 23   [16:00:46.000] /a/b/node_modules/@types:
Info 24   [16:00:47.000]   {"pollingInterval":500}
Info 25   [16:00:48.000] 
Info 26   [16:00:49.000] FsWatches::
Info 27   [16:00:50.000] /a/b/tsconfig.json:
Info 28   [16:00:51.000]   {}
Info 29   [16:00:52.000] /a/b/commonfile2.ts:
Info 30   [16:00:53.000]   {}
Info 31   [16:00:54.000] /a/lib/lib.d.ts:
Info 32   [16:00:55.000]   {}
Info 33   [16:00:56.000] 
Info 34   [16:00:57.000] FsWatchesRecursive::
Info 35   [16:00:58.000] /a/b:
Info 36   [16:00:59.000]   {}
Info 37   [16:01:00.000] 