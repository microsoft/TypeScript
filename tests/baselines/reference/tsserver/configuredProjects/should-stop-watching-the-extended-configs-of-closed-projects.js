currentDirectory:: / useCaseSensitiveFileNames: false
Info 0    [00:00:35.000] Provided types map file "/typesMap.json" doesn't exist
Creating project service
//// [/user/username/projects/myproject/extended/alpha.tsconfig.json]
{}

//// [/user/username/projects/myproject/a/tsconfig.json]
{"extends":"../extended/alpha.tsconfig.json","files":["a.ts"]}

//// [/user/username/projects/myproject/a/a.ts]
let a = 1;

//// [/user/username/projects/myproject/extended/bravo.tsconfig.json]
{"extends":"./alpha.tsconfig.json"}

//// [/user/username/projects/myproject/b/tsconfig.json]
{"extends":"../extended/bravo.tsconfig.json","files":["b.ts"]}

//// [/user/username/projects/myproject/b/b.ts]
let b = 1;

//// [/user/username/projects/myproject/dummy/dummy.ts]
let dummy = 1;

//// [/user/username/projects/myproject/dummy/tsconfig.json]
{}


Info 1    [00:00:36.000] Search path: /user/username/projects/myproject/a
Info 2    [00:00:37.000] For info: /user/username/projects/myproject/a/a.ts :: Config file name: /user/username/projects/myproject/a/tsconfig.json
Info 3    [00:00:38.000] Creating configuration project /user/username/projects/myproject/a/tsconfig.json
Info 4    [00:00:39.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/a/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/a/tsconfig.json WatchType: Config file
Info 5    [00:00:40.000] Config: /user/username/projects/myproject/a/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/a/a.ts"
 ],
 "options": {
  "configFilePath": "/user/username/projects/myproject/a/tsconfig.json"
 }
}
Info 6    [00:00:41.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/extended/alpha.tsconfig.json 2000 undefined Config: /user/username/projects/myproject/a/tsconfig.json WatchType: Extended config file
Info 7    [00:00:42.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/a/tsconfig.json
Info 8    [00:00:43.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /user/username/projects/myproject/a/tsconfig.json WatchType: Missing file
Info 9    [00:00:44.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/a/node_modules/@types 1 undefined Project: /user/username/projects/myproject/a/tsconfig.json WatchType: Type roots
Info 10   [00:00:45.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/a/node_modules/@types 1 undefined Project: /user/username/projects/myproject/a/tsconfig.json WatchType: Type roots
Info 11   [00:00:46.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/a/tsconfig.json WatchType: Type roots
Info 12   [00:00:47.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/a/tsconfig.json WatchType: Type roots
Info 13   [00:00:48.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/a/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 14   [00:00:49.000] Project '/user/username/projects/myproject/a/tsconfig.json' (Configured)
Info 15   [00:00:50.000] 	Files (1)
	/user/username/projects/myproject/a/a.ts SVC-1-0 "let a = 1;"


	a.ts
	  Part of 'files' list in tsconfig.json

Info 16   [00:00:51.000] -----------------------------------------------
Info 17   [00:00:52.000] Project '/user/username/projects/myproject/a/tsconfig.json' (Configured)
Info 17   [00:00:53.000] 	Files (1)

Info 17   [00:00:54.000] -----------------------------------------------
Info 17   [00:00:55.000] Open files: 
Info 17   [00:00:56.000] 	FileName: /user/username/projects/myproject/a/a.ts ProjectRootPath: undefined
Info 17   [00:00:57.000] 		Projects: /user/username/projects/myproject/a/tsconfig.json
Info 17   [00:00:58.000] Search path: /user/username/projects/myproject/b
Info 18   [00:00:59.000] For info: /user/username/projects/myproject/b/b.ts :: Config file name: /user/username/projects/myproject/b/tsconfig.json
Info 19   [00:01:00.000] Creating configuration project /user/username/projects/myproject/b/tsconfig.json
Info 20   [00:01:01.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/b/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/b/tsconfig.json WatchType: Config file
Info 21   [00:01:02.000] Config: /user/username/projects/myproject/b/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/b/b.ts"
 ],
 "options": {
  "configFilePath": "/user/username/projects/myproject/b/tsconfig.json"
 }
}
Info 22   [00:01:03.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/extended/bravo.tsconfig.json 2000 undefined Config: /user/username/projects/myproject/b/tsconfig.json WatchType: Extended config file
Info 23   [00:01:04.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/b/tsconfig.json
Info 24   [00:01:05.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /user/username/projects/myproject/b/tsconfig.json WatchType: Missing file
Info 25   [00:01:06.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/b/node_modules/@types 1 undefined Project: /user/username/projects/myproject/b/tsconfig.json WatchType: Type roots
Info 26   [00:01:07.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/b/node_modules/@types 1 undefined Project: /user/username/projects/myproject/b/tsconfig.json WatchType: Type roots
Info 27   [00:01:08.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/b/tsconfig.json WatchType: Type roots
Info 28   [00:01:09.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/b/tsconfig.json WatchType: Type roots
Info 29   [00:01:10.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/b/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 30   [00:01:11.000] Project '/user/username/projects/myproject/b/tsconfig.json' (Configured)
Info 31   [00:01:12.000] 	Files (1)
	/user/username/projects/myproject/b/b.ts SVC-1-0 "let b = 1;"


	b.ts
	  Part of 'files' list in tsconfig.json

Info 32   [00:01:13.000] -----------------------------------------------
Info 33   [00:01:14.000] Project '/user/username/projects/myproject/a/tsconfig.json' (Configured)
Info 33   [00:01:15.000] 	Files (1)

Info 33   [00:01:16.000] -----------------------------------------------
Info 33   [00:01:17.000] Project '/user/username/projects/myproject/b/tsconfig.json' (Configured)
Info 33   [00:01:18.000] 	Files (1)

Info 33   [00:01:19.000] -----------------------------------------------
Info 33   [00:01:20.000] Open files: 
Info 33   [00:01:21.000] 	FileName: /user/username/projects/myproject/a/a.ts ProjectRootPath: undefined
Info 33   [00:01:22.000] 		Projects: /user/username/projects/myproject/a/tsconfig.json
Info 33   [00:01:23.000] 	FileName: /user/username/projects/myproject/b/b.ts ProjectRootPath: undefined
Info 33   [00:01:24.000] 		Projects: /user/username/projects/myproject/b/tsconfig.json
Info 33   [00:01:25.000] Search path: /user/username/projects/myproject/dummy
Info 34   [00:01:26.000] For info: /user/username/projects/myproject/dummy/dummy.ts :: Config file name: /user/username/projects/myproject/dummy/tsconfig.json
Info 35   [00:01:27.000] Creating configuration project /user/username/projects/myproject/dummy/tsconfig.json
Info 36   [00:01:28.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/dummy/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/dummy/tsconfig.json WatchType: Config file
Info 37   [00:01:29.000] Config: /user/username/projects/myproject/dummy/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/dummy/dummy.ts"
 ],
 "options": {
  "configFilePath": "/user/username/projects/myproject/dummy/tsconfig.json"
 }
}
Info 38   [00:01:30.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/dummy 1 undefined Config: /user/username/projects/myproject/dummy/tsconfig.json WatchType: Wild card directory
Info 39   [00:01:31.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/dummy 1 undefined Config: /user/username/projects/myproject/dummy/tsconfig.json WatchType: Wild card directory
Info 40   [00:01:32.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/dummy/tsconfig.json
Info 41   [00:01:33.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /user/username/projects/myproject/dummy/tsconfig.json WatchType: Missing file
Info 42   [00:01:34.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/dummy/node_modules/@types 1 undefined Project: /user/username/projects/myproject/dummy/tsconfig.json WatchType: Type roots
Info 43   [00:01:35.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/dummy/node_modules/@types 1 undefined Project: /user/username/projects/myproject/dummy/tsconfig.json WatchType: Type roots
Info 44   [00:01:36.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/dummy/tsconfig.json WatchType: Type roots
Info 45   [00:01:37.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/dummy/tsconfig.json WatchType: Type roots
Info 46   [00:01:38.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/dummy/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 47   [00:01:39.000] Project '/user/username/projects/myproject/dummy/tsconfig.json' (Configured)
Info 48   [00:01:40.000] 	Files (1)
	/user/username/projects/myproject/dummy/dummy.ts SVC-1-0 "let dummy = 1;"


	dummy.ts
	  Matched by default include pattern '**/*'

Info 49   [00:01:41.000] -----------------------------------------------
Info 50   [00:01:42.000] Project '/user/username/projects/myproject/a/tsconfig.json' (Configured)
Info 50   [00:01:43.000] 	Files (1)

Info 50   [00:01:44.000] -----------------------------------------------
Info 50   [00:01:45.000] Project '/user/username/projects/myproject/b/tsconfig.json' (Configured)
Info 50   [00:01:46.000] 	Files (1)

Info 50   [00:01:47.000] -----------------------------------------------
Info 50   [00:01:48.000] Project '/user/username/projects/myproject/dummy/tsconfig.json' (Configured)
Info 50   [00:01:49.000] 	Files (1)

Info 50   [00:01:50.000] -----------------------------------------------
Info 50   [00:01:51.000] Open files: 
Info 50   [00:01:52.000] 	FileName: /user/username/projects/myproject/a/a.ts ProjectRootPath: undefined
Info 50   [00:01:53.000] 		Projects: /user/username/projects/myproject/a/tsconfig.json
Info 50   [00:01:54.000] 	FileName: /user/username/projects/myproject/b/b.ts ProjectRootPath: undefined
Info 50   [00:01:55.000] 		Projects: /user/username/projects/myproject/b/tsconfig.json
Info 50   [00:01:56.000] 	FileName: /user/username/projects/myproject/dummy/dummy.ts ProjectRootPath: undefined
Info 50   [00:01:57.000] 		Projects: /user/username/projects/myproject/dummy/tsconfig.json
Info 50   [00:01:58.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/b/b.ts 500 undefined WatchType: Closed Script info
Info 51   [00:01:59.000] Project '/user/username/projects/myproject/a/tsconfig.json' (Configured)
Info 51   [00:02:00.000] 	Files (1)

Info 51   [00:02:01.000] -----------------------------------------------
Info 51   [00:02:02.000] Project '/user/username/projects/myproject/b/tsconfig.json' (Configured)
Info 51   [00:02:03.000] 	Files (1)

Info 51   [00:02:04.000] -----------------------------------------------
Info 51   [00:02:05.000] Project '/user/username/projects/myproject/dummy/tsconfig.json' (Configured)
Info 51   [00:02:06.000] 	Files (1)

Info 51   [00:02:07.000] -----------------------------------------------
Info 51   [00:02:08.000] Open files: 
Info 51   [00:02:09.000] 	FileName: /user/username/projects/myproject/a/a.ts ProjectRootPath: undefined
Info 51   [00:02:10.000] 		Projects: /user/username/projects/myproject/a/tsconfig.json
Info 51   [00:02:11.000] 	FileName: /user/username/projects/myproject/dummy/dummy.ts ProjectRootPath: undefined
Info 51   [00:02:12.000] 		Projects: /user/username/projects/myproject/dummy/tsconfig.json
Info 51   [00:02:13.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/dummy/dummy.ts 500 undefined WatchType: Closed Script info
Info 52   [00:02:14.000] Project '/user/username/projects/myproject/a/tsconfig.json' (Configured)
Info 52   [00:02:15.000] 	Files (1)

Info 52   [00:02:16.000] -----------------------------------------------
Info 52   [00:02:17.000] Project '/user/username/projects/myproject/b/tsconfig.json' (Configured)
Info 52   [00:02:18.000] 	Files (1)

Info 52   [00:02:19.000] -----------------------------------------------
Info 52   [00:02:20.000] Project '/user/username/projects/myproject/dummy/tsconfig.json' (Configured)
Info 52   [00:02:21.000] 	Files (1)

Info 52   [00:02:22.000] -----------------------------------------------
Info 52   [00:02:23.000] Open files: 
Info 52   [00:02:24.000] 	FileName: /user/username/projects/myproject/a/a.ts ProjectRootPath: undefined
Info 52   [00:02:25.000] 		Projects: /user/username/projects/myproject/a/tsconfig.json
Info 52   [00:02:26.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/dummy/dummy.ts 500 undefined WatchType: Closed Script info
Info 53   [00:02:27.000] Search path: /user/username/projects/myproject/dummy
Info 54   [00:02:28.000] For info: /user/username/projects/myproject/dummy/dummy.ts :: Config file name: /user/username/projects/myproject/dummy/tsconfig.json
Info 55   [00:02:29.000] `remove Project::
Info 56   [00:02:30.000] Project '/user/username/projects/myproject/b/tsconfig.json' (Configured)
Info 57   [00:02:31.000] 	Files (1)
	/user/username/projects/myproject/b/b.ts


	b.ts
	  Part of 'files' list in tsconfig.json

Info 58   [00:02:32.000] -----------------------------------------------
Info 59   [00:02:33.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/extended/bravo.tsconfig.json 2000 undefined Config: /user/username/projects/myproject/b/tsconfig.json WatchType: Extended config file
Info 60   [00:02:34.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/b/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/b/tsconfig.json WatchType: Config file
Info 61   [00:02:35.000] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/b/node_modules/@types 1 undefined Project: /user/username/projects/myproject/b/tsconfig.json WatchType: Type roots
Info 62   [00:02:36.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/b/node_modules/@types 1 undefined Project: /user/username/projects/myproject/b/tsconfig.json WatchType: Type roots
Info 63   [00:02:37.000] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/b/tsconfig.json WatchType: Type roots
Info 64   [00:02:38.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/b/tsconfig.json WatchType: Type roots
Info 65   [00:02:39.000] FileWatcher:: Close:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /user/username/projects/myproject/b/tsconfig.json WatchType: Missing file
Info 66   [00:02:40.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/b/b.ts 500 undefined WatchType: Closed Script info
Info 67   [00:02:41.000] Project '/user/username/projects/myproject/a/tsconfig.json' (Configured)
Info 67   [00:02:42.000] 	Files (1)

Info 67   [00:02:43.000] -----------------------------------------------
Info 67   [00:02:44.000] Project '/user/username/projects/myproject/dummy/tsconfig.json' (Configured)
Info 67   [00:02:45.000] 	Files (1)

Info 67   [00:02:46.000] -----------------------------------------------
Info 67   [00:02:47.000] Open files: 
Info 67   [00:02:48.000] 	FileName: /user/username/projects/myproject/a/a.ts ProjectRootPath: undefined
Info 67   [00:02:49.000] 		Projects: /user/username/projects/myproject/a/tsconfig.json
Info 67   [00:02:50.000] 	FileName: /user/username/projects/myproject/dummy/dummy.ts ProjectRootPath: undefined
Info 67   [00:02:51.000] 		Projects: /user/username/projects/myproject/dummy/tsconfig.json
Info 67   [00:02:52.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/a/a.ts 500 undefined WatchType: Closed Script info
Info 68   [00:02:53.000] Project '/user/username/projects/myproject/a/tsconfig.json' (Configured)
Info 68   [00:02:54.000] 	Files (1)

Info 68   [00:02:55.000] -----------------------------------------------
Info 68   [00:02:56.000] Project '/user/username/projects/myproject/dummy/tsconfig.json' (Configured)
Info 68   [00:02:57.000] 	Files (1)

Info 68   [00:02:58.000] -----------------------------------------------
Info 68   [00:02:59.000] Open files: 
Info 68   [00:03:00.000] 	FileName: /user/username/projects/myproject/dummy/dummy.ts ProjectRootPath: undefined
Info 68   [00:03:01.000] 		Projects: /user/username/projects/myproject/dummy/tsconfig.json
Info 68   [00:03:02.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/dummy/dummy.ts 500 undefined WatchType: Closed Script info
Info 69   [00:03:03.000] Project '/user/username/projects/myproject/a/tsconfig.json' (Configured)
Info 69   [00:03:04.000] 	Files (1)

Info 69   [00:03:05.000] -----------------------------------------------
Info 69   [00:03:06.000] Project '/user/username/projects/myproject/dummy/tsconfig.json' (Configured)
Info 69   [00:03:07.000] 	Files (1)

Info 69   [00:03:08.000] -----------------------------------------------
Info 69   [00:03:09.000] Open files: 
Info 69   [00:03:10.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/dummy/dummy.ts 500 undefined WatchType: Closed Script info
Info 70   [00:03:11.000] Search path: /user/username/projects/myproject/dummy
Info 71   [00:03:12.000] For info: /user/username/projects/myproject/dummy/dummy.ts :: Config file name: /user/username/projects/myproject/dummy/tsconfig.json
Info 72   [00:03:13.000] `remove Project::
Info 73   [00:03:14.000] Project '/user/username/projects/myproject/a/tsconfig.json' (Configured)
Info 74   [00:03:15.000] 	Files (1)
	/user/username/projects/myproject/a/a.ts


	a.ts
	  Part of 'files' list in tsconfig.json

Info 75   [00:03:16.000] -----------------------------------------------
Info 76   [00:03:17.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/extended/alpha.tsconfig.json 2000 undefined Config: /user/username/projects/myproject/a/tsconfig.json WatchType: Extended config file
Info 77   [00:03:18.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/a/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/a/tsconfig.json WatchType: Config file
Info 78   [00:03:19.000] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/a/node_modules/@types 1 undefined Project: /user/username/projects/myproject/a/tsconfig.json WatchType: Type roots
Info 79   [00:03:20.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/a/node_modules/@types 1 undefined Project: /user/username/projects/myproject/a/tsconfig.json WatchType: Type roots
Info 80   [00:03:21.000] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/a/tsconfig.json WatchType: Type roots
Info 81   [00:03:22.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/a/tsconfig.json WatchType: Type roots
Info 82   [00:03:23.000] FileWatcher:: Close:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /user/username/projects/myproject/a/tsconfig.json WatchType: Missing file
Info 83   [00:03:24.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/a/a.ts 500 undefined WatchType: Closed Script info
Info 84   [00:03:25.000] Project '/user/username/projects/myproject/dummy/tsconfig.json' (Configured)
Info 84   [00:03:26.000] 	Files (1)

Info 84   [00:03:27.000] -----------------------------------------------
Info 84   [00:03:28.000] Open files: 
Info 84   [00:03:29.000] 	FileName: /user/username/projects/myproject/dummy/dummy.ts ProjectRootPath: undefined
Info 84   [00:03:30.000] 		Projects: /user/username/projects/myproject/dummy/tsconfig.json