Info 0    [00:00:19.000] Provided types map file "/typesMap.json" doesn't exist
Creating project service
//// [/a/b/src/app.ts]
let x = 10;

//// [/a/B/lib/module2.ts]
let z = 10;

//// [/a/b/tsconfig.json]


//// [/a/tsconfig.json]



Info 1    [00:00:20.000] Search path: /a/b/src
Info 2    [00:00:21.000] For info: /a/b/src/app.ts :: Config file name: /a/b/tsconfig.json
Info 3    [00:00:22.000] Creating configuration project /a/b/tsconfig.json
Info 4    [00:00:23.000] FileWatcher:: Added:: WatchInfo: /a/b/tsconfig.json 2000 undefined Project: /a/b/tsconfig.json WatchType: Config file
Info 5    [00:00:24.000] Config: /a/b/tsconfig.json : {
 "rootNames": [
  "/a/b/lib/module2.ts",
  "/a/b/src/app.ts"
 ],
 "options": {
  "configFilePath": "/a/b/tsconfig.json"
 }
}
Info 6    [00:00:25.000] DirectoryWatcher:: Added:: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Info 7    [00:00:26.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Info 8    [00:00:27.000] FileWatcher:: Added:: WatchInfo: /a/b/lib/module2.ts 500 undefined WatchType: Closed Script info
Info 9    [00:00:28.000] Starting updateGraphWorker: Project: /a/b/tsconfig.json
Info 10   [00:00:29.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /a/b/tsconfig.json WatchType: Missing file
Info 11   [00:00:30.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/tsconfig.json WatchType: Type roots
Info 12   [00:00:31.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/tsconfig.json WatchType: Type roots
Info 13   [00:00:32.000] Finishing updateGraphWorker: Project: /a/b/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 14   [00:00:33.000] Project '/a/b/tsconfig.json' (Configured)
Info 15   [00:00:34.000] 	Files (2)
	/a/b/lib/module2.ts Text-1 "let z = 10;"
	/a/b/src/app.ts SVC-1-0 "let x = 10;"


	lib/module2.ts
	  Matched by default include pattern '**/*'
	src/app.ts
	  Matched by default include pattern '**/*'

Info 16   [00:00:35.000] -----------------------------------------------
Info 17   [00:00:36.000] Project '/a/b/tsconfig.json' (Configured)
Info 17   [00:00:37.000] 	Files (2)

Info 17   [00:00:38.000] -----------------------------------------------
Info 17   [00:00:39.000] Open files: 
Info 17   [00:00:40.000] 	FileName: /a/b/src/app.ts ProjectRootPath: /a
Info 17   [00:00:41.000] 		Projects: /a/b/tsconfig.json
file: /a/b/src/app.ts configFile: /a/b/tsconfig.json
Info 17   [00:00:42.000] FileWatcher:: Added:: WatchInfo: /a/b/src/app.ts 500 undefined WatchType: Closed Script info
Info 18   [00:00:43.000] Project '/a/b/tsconfig.json' (Configured)
Info 18   [00:00:44.000] 	Files (2)

Info 18   [00:00:45.000] -----------------------------------------------
Info 18   [00:00:46.000] Open files: 
Info 18   [00:00:47.000] FileWatcher:: Close:: WatchInfo: /a/b/src/app.ts 500 undefined WatchType: Closed Script info
Info 19   [00:00:48.000] Search path: /a/b/src
Info 20   [00:00:49.000] For info: /a/b/src/app.ts :: Config file name: /a/b/tsconfig.json
Info 21   [00:00:50.000] Project '/a/b/tsconfig.json' (Configured)
Info 21   [00:00:51.000] 	Files (2)

Info 21   [00:00:52.000] -----------------------------------------------
Info 21   [00:00:53.000] Open files: 
Info 21   [00:00:54.000] 	FileName: /a/b/src/app.ts ProjectRootPath: /a/b
Info 21   [00:00:55.000] 		Projects: /a/b/tsconfig.json
file: /a/b/src/app.ts configFile: /a/b/tsconfig.json
Info 21   [00:00:56.000] FileWatcher:: Added:: WatchInfo: /a/b/src/app.ts 500 undefined WatchType: Closed Script info
Info 22   [00:00:57.000] Project '/a/b/tsconfig.json' (Configured)
Info 22   [00:00:58.000] 	Files (2)

Info 22   [00:00:59.000] -----------------------------------------------
Info 22   [00:01:00.000] Open files: 
Info 22   [00:01:01.000] FileWatcher:: Close:: WatchInfo: /a/b/src/app.ts 500 undefined WatchType: Closed Script info
Info 23   [00:01:02.000] Search path: /a/b/src
Info 24   [00:01:03.000] For info: /a/b/src/app.ts :: Config file name: /a/b/tsconfig.json
Info 25   [00:01:04.000] Project '/a/b/tsconfig.json' (Configured)
Info 25   [00:01:05.000] 	Files (2)

Info 25   [00:01:06.000] -----------------------------------------------
Info 25   [00:01:07.000] Open files: 
Info 25   [00:01:08.000] 	FileName: /a/b/src/app.ts ProjectRootPath: /a/B
Info 25   [00:01:09.000] 		Projects: /a/b/tsconfig.json
file: /a/b/src/app.ts configFile: /a/b/tsconfig.json
Info 25   [00:01:10.000] FileWatcher:: Added:: WatchInfo: /a/b/src/app.ts 500 undefined WatchType: Closed Script info
Info 26   [00:01:11.000] Project '/a/b/tsconfig.json' (Configured)
Info 26   [00:01:12.000] 	Files (2)

Info 26   [00:01:13.000] -----------------------------------------------
Info 26   [00:01:14.000] Open files: 
Info 26   [00:01:15.000] FileWatcher:: Close:: WatchInfo: /a/b/lib/module2.ts 500 undefined WatchType: Closed Script info
Info 27   [00:01:16.000] Search path: /a/b/lib
Info 28   [00:01:17.000] For info: /a/b/lib/module2.ts :: Config file name: /a/b/tsconfig.json
Info 29   [00:01:18.000] Project '/a/b/tsconfig.json' (Configured)
Info 29   [00:01:19.000] 	Files (2)

Info 29   [00:01:20.000] -----------------------------------------------
Info 29   [00:01:21.000] Open files: 
Info 29   [00:01:22.000] 	FileName: /a/b/lib/module2.ts ProjectRootPath: /a
Info 29   [00:01:23.000] 		Projects: /a/b/tsconfig.json
file: /a/B/lib/module2.ts configFile: /a/b/tsconfig.json
Info 29   [00:01:24.000] FileWatcher:: Added:: WatchInfo: /a/b/lib/module2.ts 500 undefined WatchType: Closed Script info
Info 30   [00:01:25.000] Project '/a/b/tsconfig.json' (Configured)
Info 30   [00:01:26.000] 	Files (2)

Info 30   [00:01:27.000] -----------------------------------------------
Info 30   [00:01:28.000] Open files: 
Info 30   [00:01:29.000] FileWatcher:: Close:: WatchInfo: /a/b/lib/module2.ts 500 undefined WatchType: Closed Script info
Info 31   [00:01:30.000] Search path: /a/b/lib
Info 32   [00:01:31.000] For info: /a/b/lib/module2.ts :: Config file name: /a/b/tsconfig.json
Info 33   [00:01:32.000] Project '/a/b/tsconfig.json' (Configured)
Info 33   [00:01:33.000] 	Files (2)

Info 33   [00:01:34.000] -----------------------------------------------
Info 33   [00:01:35.000] Open files: 
Info 33   [00:01:36.000] 	FileName: /a/b/lib/module2.ts ProjectRootPath: /a/b
Info 33   [00:01:37.000] 		Projects: /a/b/tsconfig.json
file: /a/B/lib/module2.ts configFile: /a/b/tsconfig.json
Info 33   [00:01:38.000] FileWatcher:: Added:: WatchInfo: /a/b/lib/module2.ts 500 undefined WatchType: Closed Script info
Info 34   [00:01:39.000] Project '/a/b/tsconfig.json' (Configured)
Info 34   [00:01:40.000] 	Files (2)

Info 34   [00:01:41.000] -----------------------------------------------
Info 34   [00:01:42.000] Open files: 
Info 34   [00:01:43.000] FileWatcher:: Close:: WatchInfo: /a/b/lib/module2.ts 500 undefined WatchType: Closed Script info
Info 35   [00:01:44.000] Search path: /a/b/lib
Info 36   [00:01:45.000] For info: /a/b/lib/module2.ts :: Config file name: /a/b/tsconfig.json
Info 37   [00:01:46.000] Project '/a/b/tsconfig.json' (Configured)
Info 37   [00:01:47.000] 	Files (2)

Info 37   [00:01:48.000] -----------------------------------------------
Info 37   [00:01:49.000] Open files: 
Info 37   [00:01:50.000] 	FileName: /a/b/lib/module2.ts ProjectRootPath: /a/B
Info 37   [00:01:51.000] 		Projects: /a/b/tsconfig.json
file: /a/B/lib/module2.ts configFile: /a/b/tsconfig.json
Info 37   [00:01:52.000] FileWatcher:: Added:: WatchInfo: /a/b/lib/module2.ts 500 undefined WatchType: Closed Script info
Info 38   [00:01:53.000] Project '/a/b/tsconfig.json' (Configured)
Info 38   [00:01:54.000] 	Files (2)

Info 38   [00:01:55.000] -----------------------------------------------
Info 38   [00:01:56.000] Open files: 