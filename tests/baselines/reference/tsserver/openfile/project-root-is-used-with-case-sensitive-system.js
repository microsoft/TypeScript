Info 0    [00:00:21.000] Provided types map file "/typesMap.json" doesn't exist
Creating project service
//// [/a/b/src/app.ts]
let x = 10;

//// [/a/B/lib/module2.ts]
let z = 10;

//// [/a/b/tsconfig.json]


//// [/a/tsconfig.json]



Info 1    [00:00:22.000] Search path: /a/b/src
Info 2    [00:00:23.000] For info: /a/b/src/app.ts :: Config file name: /a/b/tsconfig.json
Info 3    [00:00:24.000] Creating configuration project /a/b/tsconfig.json
Info 4    [00:00:25.000] FileWatcher:: Added:: WatchInfo: /a/b/tsconfig.json 2000 undefined Project: /a/b/tsconfig.json WatchType: Config file
Info 5    [00:00:26.000] Config: /a/b/tsconfig.json : {
 "rootNames": [
  "/a/b/src/app.ts"
 ],
 "options": {
  "configFilePath": "/a/b/tsconfig.json"
 }
}
Info 6    [00:00:27.000] DirectoryWatcher:: Added:: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Info 7    [00:00:28.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Info 8    [00:00:29.000] Starting updateGraphWorker: Project: /a/b/tsconfig.json
Info 9    [00:00:30.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /a/b/tsconfig.json WatchType: Missing file
Info 10   [00:00:31.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/tsconfig.json WatchType: Type roots
Info 11   [00:00:32.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/tsconfig.json WatchType: Type roots
Info 12   [00:00:33.000] Finishing updateGraphWorker: Project: /a/b/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 13   [00:00:34.000] Project '/a/b/tsconfig.json' (Configured)
Info 14   [00:00:35.000] 	Files (1)
	/a/b/src/app.ts SVC-1-0 "let x = 10;"


	src/app.ts
	  Matched by default include pattern '**/*'

Info 15   [00:00:36.000] -----------------------------------------------
Info 16   [00:00:37.000] Project '/a/b/tsconfig.json' (Configured)
Info 16   [00:00:38.000] 	Files (1)

Info 16   [00:00:39.000] -----------------------------------------------
Info 16   [00:00:40.000] Open files: 
Info 16   [00:00:41.000] 	FileName: /a/b/src/app.ts ProjectRootPath: /a
Info 16   [00:00:42.000] 		Projects: /a/b/tsconfig.json
file: /a/b/src/app.ts configFile: /a/b/tsconfig.json
Info 16   [00:00:43.000] FileWatcher:: Added:: WatchInfo: /a/b/src/app.ts 500 undefined WatchType: Closed Script info
Info 17   [00:00:44.000] Project '/a/b/tsconfig.json' (Configured)
Info 17   [00:00:45.000] 	Files (1)

Info 17   [00:00:46.000] -----------------------------------------------
Info 17   [00:00:47.000] Open files: 
Info 17   [00:00:48.000] FileWatcher:: Close:: WatchInfo: /a/b/src/app.ts 500 undefined WatchType: Closed Script info
Info 18   [00:00:49.000] Search path: /a/b/src
Info 19   [00:00:50.000] For info: /a/b/src/app.ts :: Config file name: /a/b/tsconfig.json
Info 20   [00:00:51.000] Project '/a/b/tsconfig.json' (Configured)
Info 20   [00:00:52.000] 	Files (1)

Info 20   [00:00:53.000] -----------------------------------------------
Info 20   [00:00:54.000] Open files: 
Info 20   [00:00:55.000] 	FileName: /a/b/src/app.ts ProjectRootPath: /a/b
Info 20   [00:00:56.000] 		Projects: /a/b/tsconfig.json
file: /a/b/src/app.ts configFile: /a/b/tsconfig.json
Info 20   [00:00:57.000] FileWatcher:: Added:: WatchInfo: /a/b/src/app.ts 500 undefined WatchType: Closed Script info
Info 21   [00:00:58.000] Project '/a/b/tsconfig.json' (Configured)
Info 21   [00:00:59.000] 	Files (1)

Info 21   [00:01:00.000] -----------------------------------------------
Info 21   [00:01:01.000] Open files: 
Info 21   [00:01:02.000] FileWatcher:: Close:: WatchInfo: /a/b/src/app.ts 500 undefined WatchType: Closed Script info
Info 22   [00:01:03.000] Search path: /a/b/src
Info 23   [00:01:04.000] For info: /a/b/src/app.ts :: Config file name: /a/b/tsconfig.json
Info 24   [00:01:05.000] Project '/a/b/tsconfig.json' (Configured)
Info 24   [00:01:06.000] 	Files (1)

Info 24   [00:01:07.000] -----------------------------------------------
Info 24   [00:01:08.000] Open files: 
Info 24   [00:01:09.000] 	FileName: /a/b/src/app.ts ProjectRootPath: /a/B
Info 24   [00:01:10.000] 		Projects: /a/b/tsconfig.json
file: /a/b/src/app.ts configFile: /a/b/tsconfig.json
Info 24   [00:01:11.000] FileWatcher:: Added:: WatchInfo: /a/b/src/app.ts 500 undefined WatchType: Closed Script info
Info 25   [00:01:12.000] Project '/a/b/tsconfig.json' (Configured)
Info 25   [00:01:13.000] 	Files (1)

Info 25   [00:01:14.000] -----------------------------------------------
Info 25   [00:01:15.000] Open files: 
Info 25   [00:01:16.000] Search path: /a/B/lib
Info 26   [00:01:17.000] For info: /a/B/lib/module2.ts :: Config file name: /a/tsconfig.json
Info 27   [00:01:18.000] Creating configuration project /a/tsconfig.json
Info 28   [00:01:19.000] FileWatcher:: Added:: WatchInfo: /a/tsconfig.json 2000 undefined Project: /a/tsconfig.json WatchType: Config file
Info 29   [00:01:20.000] Config: /a/tsconfig.json : {
 "rootNames": [
  "/a/B/lib/module2.ts",
  "/a/b/src/app.ts"
 ],
 "options": {
  "configFilePath": "/a/tsconfig.json"
 }
}
Info 30   [00:01:21.000] DirectoryWatcher:: Added:: WatchInfo: /a 1 undefined Config: /a/tsconfig.json WatchType: Wild card directory
Info 31   [00:01:22.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a 1 undefined Config: /a/tsconfig.json WatchType: Wild card directory
Info 32   [00:01:23.000] Starting updateGraphWorker: Project: /a/tsconfig.json
Info 33   [00:01:24.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /a/tsconfig.json WatchType: Missing file
Info 34   [00:01:25.000] DirectoryWatcher:: Added:: WatchInfo: /a/node_modules/@types 1 undefined Project: /a/tsconfig.json WatchType: Type roots
Info 35   [00:01:26.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/node_modules/@types 1 undefined Project: /a/tsconfig.json WatchType: Type roots
Info 36   [00:01:27.000] Finishing updateGraphWorker: Project: /a/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 37   [00:01:28.000] Project '/a/tsconfig.json' (Configured)
Info 38   [00:01:29.000] 	Files (2)
	/a/B/lib/module2.ts SVC-1-0 "let z = 10;"
	/a/b/src/app.ts SVC-1-0 "let x = 10;"


	B/lib/module2.ts
	  Matched by default include pattern '**/*'
	b/src/app.ts
	  Matched by default include pattern '**/*'

Info 39   [00:01:30.000] -----------------------------------------------
Info 40   [00:01:31.000] `remove Project::
Info 41   [00:01:32.000] Project '/a/b/tsconfig.json' (Configured)
Info 42   [00:01:33.000] 	Files (1)
	/a/b/src/app.ts


	src/app.ts
	  Matched by default include pattern '**/*'

Info 43   [00:01:34.000] -----------------------------------------------
Info 44   [00:01:35.000] DirectoryWatcher:: Close:: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Info 45   [00:01:36.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Info 46   [00:01:37.000] FileWatcher:: Close:: WatchInfo: /a/b/tsconfig.json 2000 undefined Project: /a/b/tsconfig.json WatchType: Config file
Info 47   [00:01:38.000] DirectoryWatcher:: Close:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/tsconfig.json WatchType: Type roots
Info 48   [00:01:39.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/tsconfig.json WatchType: Type roots
Info 49   [00:01:40.000] FileWatcher:: Close:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /a/b/tsconfig.json WatchType: Missing file
Info 50   [00:01:41.000] Project '/a/tsconfig.json' (Configured)
Info 50   [00:01:42.000] 	Files (2)

Info 50   [00:01:43.000] -----------------------------------------------
Info 50   [00:01:44.000] Open files: 
Info 50   [00:01:45.000] 	FileName: /a/B/lib/module2.ts ProjectRootPath: /a
Info 50   [00:01:46.000] 		Projects: /a/tsconfig.json
file: /a/B/lib/module2.ts configFile: /a/tsconfig.json
Info 50   [00:01:47.000] FileWatcher:: Added:: WatchInfo: /a/B/lib/module2.ts 500 undefined WatchType: Closed Script info
Info 51   [00:01:48.000] Project '/a/tsconfig.json' (Configured)
Info 51   [00:01:49.000] 	Files (2)

Info 51   [00:01:50.000] -----------------------------------------------
Info 51   [00:01:51.000] Open files: 
Info 51   [00:01:52.000] FileWatcher:: Close:: WatchInfo: /a/B/lib/module2.ts 500 undefined WatchType: Closed Script info
Info 52   [00:01:53.000] Search path: /a/B/lib
Info 53   [00:01:54.000] For info: /a/B/lib/module2.ts :: Config file name: /a/tsconfig.json
Info 54   [00:01:55.000] Project '/a/tsconfig.json' (Configured)
Info 54   [00:01:56.000] 	Files (2)

Info 54   [00:01:57.000] -----------------------------------------------
Info 54   [00:01:58.000] Open files: 
Info 54   [00:01:59.000] 	FileName: /a/B/lib/module2.ts ProjectRootPath: /a/b
Info 54   [00:02:00.000] 		Projects: /a/tsconfig.json
file: /a/B/lib/module2.ts configFile: /a/tsconfig.json
Info 54   [00:02:01.000] FileWatcher:: Added:: WatchInfo: /a/B/lib/module2.ts 500 undefined WatchType: Closed Script info
Info 55   [00:02:02.000] Project '/a/tsconfig.json' (Configured)
Info 55   [00:02:03.000] 	Files (2)

Info 55   [00:02:04.000] -----------------------------------------------
Info 55   [00:02:05.000] Open files: 
Info 55   [00:02:06.000] FileWatcher:: Close:: WatchInfo: /a/B/lib/module2.ts 500 undefined WatchType: Closed Script info
Info 56   [00:02:07.000] Search path: /a/B/lib
Info 57   [00:02:08.000] For info: /a/B/lib/module2.ts :: No config files found.
Info 58   [00:02:09.000] `remove Project::
Info 59   [00:02:10.000] Project '/a/tsconfig.json' (Configured)
Info 60   [00:02:11.000] 	Files (2)
	/a/B/lib/module2.ts
	/a/b/src/app.ts


	B/lib/module2.ts
	  Matched by default include pattern '**/*'
	b/src/app.ts
	  Matched by default include pattern '**/*'

Info 61   [00:02:12.000] -----------------------------------------------
Info 62   [00:02:13.000] DirectoryWatcher:: Close:: WatchInfo: /a 1 undefined Config: /a/tsconfig.json WatchType: Wild card directory
Info 63   [00:02:14.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /a 1 undefined Config: /a/tsconfig.json WatchType: Wild card directory
Info 64   [00:02:15.000] FileWatcher:: Close:: WatchInfo: /a/tsconfig.json 2000 undefined Project: /a/tsconfig.json WatchType: Config file
Info 65   [00:02:16.000] DirectoryWatcher:: Close:: WatchInfo: /a/node_modules/@types 1 undefined Project: /a/tsconfig.json WatchType: Type roots
Info 66   [00:02:17.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /a/node_modules/@types 1 undefined Project: /a/tsconfig.json WatchType: Type roots
Info 67   [00:02:18.000] FileWatcher:: Close:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /a/tsconfig.json WatchType: Missing file
Info 68   [00:02:19.000] FileWatcher:: Close:: WatchInfo: /a/b/src/app.ts 500 undefined WatchType: Closed Script info
Info 69   [00:02:20.000] Open files: 
Info 69   [00:02:21.000] 	FileName: /a/B/lib/module2.ts ProjectRootPath: /a/B
Info 69   [00:02:22.000] 		Projects: 
file: /a/B/lib/module2.ts configFile: undefined
Info 69   [00:02:23.000] FileWatcher:: Added:: WatchInfo: /a/B/lib/module2.ts 500 undefined WatchType: Closed Script info
Info 70   [00:02:24.000] Open files: 