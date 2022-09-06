Info 0    [16:00:19.000] Provided types map file "/typesMap.json" doesn't exist
Info 1    [16:00:20.000] Search path: /a/b/src
Info 2    [16:00:21.000] For info: /a/b/src/file1.ts :: Config file name: /a/b/tsconfig.json
Info 3    [16:00:22.000] Creating configuration project /a/b/tsconfig.json
Info 4    [16:00:23.000] FileWatcher:: Added:: WatchInfo: /a/b/tsconfig.json 2000 undefined Project: /a/b/tsconfig.json WatchType: Config file
Info 5    [16:00:24.000] Config: /a/b/tsconfig.json : {
 "rootNames": [
  "/a/b/src/file1.ts",
  "/a/b/file3.ts"
 ],
 "options": {
  "configFilePath": "/a/b/tsconfig.json"
 }
}
Info 6    [16:00:25.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 7    [16:00:26.000] FileWatcher:: Added:: WatchInfo: /a/b/file3.ts 500 undefined WatchType: Closed Script info
Info 8    [16:00:27.000] Starting updateGraphWorker: Project: /a/b/tsconfig.json
Info 9    [16:00:28.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /a/b/tsconfig.json WatchType: Missing file
Info 10   [16:00:29.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/tsconfig.json WatchType: Type roots
Info 11   [16:00:30.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/tsconfig.json WatchType: Type roots
Info 12   [16:00:31.000] Finishing updateGraphWorker: Project: /a/b/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 13   [16:00:32.000] Project '/a/b/tsconfig.json' (Configured)
Info 14   [16:00:33.000] 	Files (2)
	/a/b/src/file1.ts
	/a/b/file3.ts


	src/file1.ts
	  Part of 'files' list in tsconfig.json
	file3.ts
	  Part of 'files' list in tsconfig.json

Info 15   [16:00:34.000] -----------------------------------------------
Info 16   [16:00:35.000] Project '/a/b/tsconfig.json' (Configured)
Info 16   [16:00:36.000] 	Files (2)

Info 16   [16:00:37.000] -----------------------------------------------
Info 16   [16:00:38.000] Open files: 
Info 16   [16:00:39.000] 	FileName: /a/b/src/file1.ts ProjectRootPath: undefined
Info 16   [16:00:40.000] 		Projects: /a/b/tsconfig.json
Info 16   [16:00:41.000] Search path: /a/b/src
Info 17   [16:00:42.000] For info: /a/b/src/file2.ts :: Config file name: /a/b/tsconfig.json
Info 18   [16:00:43.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 19   [16:00:44.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 20   [16:00:45.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /dev/null/inferredProject1* WatchType: Missing file
Info 21   [16:00:46.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/src/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 22   [16:00:47.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/src/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 23   [16:00:48.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 24   [16:00:49.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 25   [16:00:50.000] 	Files (1)
	/a/b/src/file2.ts


	file2.ts
	  Root file specified for compilation

Info 26   [16:00:51.000] -----------------------------------------------
Info 27   [16:00:52.000] Project '/a/b/tsconfig.json' (Configured)
Info 27   [16:00:53.000] 	Files (2)

Info 27   [16:00:54.000] -----------------------------------------------
Info 27   [16:00:55.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 27   [16:00:56.000] 	Files (1)

Info 27   [16:00:57.000] -----------------------------------------------
Info 27   [16:00:58.000] Open files: 
Info 27   [16:00:59.000] 	FileName: /a/b/src/file1.ts ProjectRootPath: undefined
Info 27   [16:01:00.000] 		Projects: /a/b/tsconfig.json
Info 27   [16:01:01.000] 	FileName: /a/b/src/file2.ts ProjectRootPath: undefined
Info 27   [16:01:02.000] 		Projects: /dev/null/inferredProject1*
Info 27   [16:01:03.000] FileWatcher:: Close:: WatchInfo: /a/b/file3.ts 500 undefined WatchType: Closed Script info
Info 28   [16:01:04.000] Search path: /a/b
Info 29   [16:01:05.000] For info: /a/b/file3.ts :: Config file name: /a/b/tsconfig.json
Info 30   [16:01:06.000] Project '/a/b/tsconfig.json' (Configured)
Info 30   [16:01:07.000] 	Files (2)

Info 30   [16:01:08.000] -----------------------------------------------
Info 30   [16:01:09.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 30   [16:01:10.000] 	Files (1)

Info 30   [16:01:11.000] -----------------------------------------------
Info 30   [16:01:12.000] Open files: 
Info 30   [16:01:13.000] 	FileName: /a/b/src/file1.ts ProjectRootPath: undefined
Info 30   [16:01:14.000] 		Projects: /a/b/tsconfig.json
Info 30   [16:01:15.000] 	FileName: /a/b/src/file2.ts ProjectRootPath: undefined
Info 30   [16:01:16.000] 		Projects: /dev/null/inferredProject1*
Info 30   [16:01:17.000] 	FileName: /a/b/file3.ts ProjectRootPath: undefined
Info 30   [16:01:18.000] 		Projects: /a/b/tsconfig.json
Info 30   [16:01:19.000] Search path: /a
Info 31   [16:01:20.000] For info: /a/file4.ts :: No config files found.
Info 32   [16:01:21.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 33   [16:01:22.000] Starting updateGraphWorker: Project: /dev/null/inferredProject2*
Info 34   [16:01:23.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /dev/null/inferredProject2* WatchType: Missing file
Info 35   [16:01:24.000] DirectoryWatcher:: Added:: WatchInfo: /a/node_modules/@types 1 undefined Project: /dev/null/inferredProject2* WatchType: Type roots
Info 36   [16:01:25.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/node_modules/@types 1 undefined Project: /dev/null/inferredProject2* WatchType: Type roots
Info 37   [16:01:26.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject2* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 38   [16:01:27.000] Project '/dev/null/inferredProject2*' (Inferred)
Info 39   [16:01:28.000] 	Files (1)
	/a/file4.ts


	file4.ts
	  Root file specified for compilation

Info 40   [16:01:29.000] -----------------------------------------------
Info 41   [16:01:30.000] Project '/a/b/tsconfig.json' (Configured)
Info 41   [16:01:31.000] 	Files (2)

Info 41   [16:01:32.000] -----------------------------------------------
Info 41   [16:01:33.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 41   [16:01:34.000] 	Files (1)

Info 41   [16:01:35.000] -----------------------------------------------
Info 41   [16:01:36.000] Project '/dev/null/inferredProject2*' (Inferred)
Info 41   [16:01:37.000] 	Files (1)

Info 41   [16:01:38.000] -----------------------------------------------
Info 41   [16:01:39.000] Open files: 
Info 41   [16:01:40.000] 	FileName: /a/b/src/file1.ts ProjectRootPath: undefined
Info 41   [16:01:41.000] 		Projects: /a/b/tsconfig.json
Info 41   [16:01:42.000] 	FileName: /a/b/src/file2.ts ProjectRootPath: undefined
Info 41   [16:01:43.000] 		Projects: /dev/null/inferredProject1*
Info 41   [16:01:44.000] 	FileName: /a/b/file3.ts ProjectRootPath: undefined
Info 41   [16:01:45.000] 		Projects: /a/b/tsconfig.json
Info 41   [16:01:46.000] 	FileName: /a/file4.ts ProjectRootPath: undefined
Info 41   [16:01:47.000] 		Projects: /dev/null/inferredProject2*
Info 41   [16:01:51.000] FileWatcher:: Triggered with /a/b/tsconfig.json 1:: WatchInfo: /a/b/tsconfig.json 2000 undefined Project: /a/b/tsconfig.json WatchType: Config file
Info 42   [16:01:52.000] Scheduled: /a/b/tsconfig.json
Info 43   [16:01:53.000] Search path: /a/b/src
Info 44   [16:01:54.000] For info: /a/b/src/file2.ts :: Config file name: /a/b/tsconfig.json
Info 45   [16:01:55.000] Scheduled: /a/b/tsconfig.json, Cancelled earlier one
Info 46   [16:01:56.000] Scheduled: *ensureProjectForOpenFiles*
Info 47   [16:01:57.000] Elapsed:: *ms FileWatcher:: Triggered with /a/b/tsconfig.json 1:: WatchInfo: /a/b/tsconfig.json 2000 undefined Project: /a/b/tsconfig.json WatchType: Config file
Info 48   [16:01:58.000] Running: /a/b/tsconfig.json
Info 49   [16:01:59.000] Reloading configured project /a/b/tsconfig.json
Info 50   [16:02:00.000] Config: /a/b/tsconfig.json : {
 "rootNames": [
  "/a/b/file3.ts",
  "/a/b/src/file1.ts",
  "/a/b/src/file2.ts"
 ],
 "options": {
  "configFilePath": "/a/b/tsconfig.json"
 }
}
Info 51   [16:02:01.000] DirectoryWatcher:: Added:: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Info 52   [16:02:02.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Info 53   [16:02:03.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 54   [16:02:04.000] Starting updateGraphWorker: Project: /a/b/tsconfig.json
Info 55   [16:02:05.000] Finishing updateGraphWorker: Project: /a/b/tsconfig.json Version: 2 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 56   [16:02:06.000] Project '/a/b/tsconfig.json' (Configured)
Info 57   [16:02:07.000] 	Files (3)
	/a/b/src/file1.ts
	/a/b/file3.ts
	/a/b/src/file2.ts


	src/file1.ts
	  Matched by default include pattern '**/*'
	file3.ts
	  Matched by default include pattern '**/*'
	src/file2.ts
	  Matched by default include pattern '**/*'

Info 58   [16:02:08.000] -----------------------------------------------
Info 59   [16:02:09.000] Running: *ensureProjectForOpenFiles*
Info 60   [16:02:10.000] Before ensureProjectForOpenFiles:
Info 61   [16:02:11.000] Project '/a/b/tsconfig.json' (Configured)
Info 61   [16:02:12.000] 	Files (3)

Info 61   [16:02:13.000] -----------------------------------------------
Info 61   [16:02:14.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 61   [16:02:15.000] 	Files (1)

Info 61   [16:02:16.000] -----------------------------------------------
Info 61   [16:02:17.000] Project '/dev/null/inferredProject2*' (Inferred)
Info 61   [16:02:18.000] 	Files (1)

Info 61   [16:02:19.000] -----------------------------------------------
Info 61   [16:02:20.000] Open files: 
Info 61   [16:02:21.000] 	FileName: /a/b/src/file1.ts ProjectRootPath: undefined
Info 61   [16:02:22.000] 		Projects: /a/b/tsconfig.json
Info 61   [16:02:23.000] 	FileName: /a/b/src/file2.ts ProjectRootPath: undefined
Info 61   [16:02:24.000] 		Projects: /a/b/tsconfig.json
Info 61   [16:02:25.000] 	FileName: /a/b/file3.ts ProjectRootPath: undefined
Info 61   [16:02:26.000] 		Projects: /a/b/tsconfig.json
Info 61   [16:02:27.000] 	FileName: /a/file4.ts ProjectRootPath: undefined
Info 61   [16:02:28.000] 		Projects: /dev/null/inferredProject2*
Info 61   [16:02:29.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 62   [16:02:30.000] FileWatcher:: Close:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /dev/null/inferredProject1* WatchType: Missing file
Info 63   [16:02:31.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 2 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 64   [16:02:32.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 65   [16:02:33.000] 	Files (0)



Info 66   [16:02:34.000] -----------------------------------------------
Info 67   [16:02:35.000] After ensureProjectForOpenFiles:
Info 68   [16:02:36.000] Project '/a/b/tsconfig.json' (Configured)
Info 68   [16:02:37.000] 	Files (3)

Info 68   [16:02:38.000] -----------------------------------------------
Info 68   [16:02:39.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 68   [16:02:40.000] 	Files (0)

Info 68   [16:02:41.000] -----------------------------------------------
Info 68   [16:02:42.000] Project '/dev/null/inferredProject2*' (Inferred)
Info 68   [16:02:43.000] 	Files (1)

Info 68   [16:02:44.000] -----------------------------------------------
Info 68   [16:02:45.000] Open files: 
Info 68   [16:02:46.000] 	FileName: /a/b/src/file1.ts ProjectRootPath: undefined
Info 68   [16:02:47.000] 		Projects: /a/b/tsconfig.json
Info 68   [16:02:48.000] 	FileName: /a/b/src/file2.ts ProjectRootPath: undefined
Info 68   [16:02:49.000] 		Projects: /a/b/tsconfig.json
Info 68   [16:02:50.000] 	FileName: /a/b/file3.ts ProjectRootPath: undefined
Info 68   [16:02:51.000] 		Projects: /a/b/tsconfig.json
Info 68   [16:02:52.000] 	FileName: /a/file4.ts ProjectRootPath: undefined
Info 68   [16:02:53.000] 		Projects: /dev/null/inferredProject2*
Info 68   [16:02:54.000] FileWatcher:: Added:: WatchInfo: /a/b/src/file1.ts 500 undefined WatchType: Closed Script info
Info 69   [16:02:55.000] Project '/a/b/tsconfig.json' (Configured)
Info 69   [16:02:56.000] 	Files (3)

Info 69   [16:02:57.000] -----------------------------------------------
Info 69   [16:02:58.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 69   [16:02:59.000] 	Files (0)

Info 69   [16:03:00.000] -----------------------------------------------
Info 69   [16:03:01.000] Project '/dev/null/inferredProject2*' (Inferred)
Info 69   [16:03:02.000] 	Files (1)

Info 69   [16:03:03.000] -----------------------------------------------
Info 69   [16:03:04.000] Open files: 
Info 69   [16:03:05.000] 	FileName: /a/b/src/file2.ts ProjectRootPath: undefined
Info 69   [16:03:06.000] 		Projects: /a/b/tsconfig.json
Info 69   [16:03:07.000] 	FileName: /a/b/file3.ts ProjectRootPath: undefined
Info 69   [16:03:08.000] 		Projects: /a/b/tsconfig.json
Info 69   [16:03:09.000] 	FileName: /a/file4.ts ProjectRootPath: undefined
Info 69   [16:03:10.000] 		Projects: /dev/null/inferredProject2*
Info 69   [16:03:11.000] FileWatcher:: Added:: WatchInfo: /a/b/src/file2.ts 500 undefined WatchType: Closed Script info
Info 70   [16:03:12.000] Project '/a/b/tsconfig.json' (Configured)
Info 70   [16:03:13.000] 	Files (3)

Info 70   [16:03:14.000] -----------------------------------------------
Info 70   [16:03:15.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 70   [16:03:16.000] 	Files (0)

Info 70   [16:03:17.000] -----------------------------------------------
Info 70   [16:03:18.000] Project '/dev/null/inferredProject2*' (Inferred)
Info 70   [16:03:19.000] 	Files (1)

Info 70   [16:03:20.000] -----------------------------------------------
Info 70   [16:03:21.000] Open files: 
Info 70   [16:03:22.000] 	FileName: /a/b/file3.ts ProjectRootPath: undefined
Info 70   [16:03:23.000] 		Projects: /a/b/tsconfig.json
Info 70   [16:03:24.000] 	FileName: /a/file4.ts ProjectRootPath: undefined
Info 70   [16:03:25.000] 		Projects: /dev/null/inferredProject2*
Info 70   [16:03:26.000] FileWatcher:: Added:: WatchInfo: /a/file4.ts 500 undefined WatchType: Closed Script info
Info 71   [16:03:27.000] Project '/a/b/tsconfig.json' (Configured)
Info 71   [16:03:28.000] 	Files (3)

Info 71   [16:03:29.000] -----------------------------------------------
Info 71   [16:03:30.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 71   [16:03:31.000] 	Files (0)

Info 71   [16:03:32.000] -----------------------------------------------
Info 71   [16:03:33.000] Project '/dev/null/inferredProject2*' (Inferred)
Info 71   [16:03:34.000] 	Files (1)

Info 71   [16:03:35.000] -----------------------------------------------
Info 71   [16:03:36.000] Open files: 
Info 71   [16:03:37.000] 	FileName: /a/b/file3.ts ProjectRootPath: undefined
Info 71   [16:03:38.000] 		Projects: /a/b/tsconfig.json
Info 71   [16:03:39.000] FileWatcher:: Close:: WatchInfo: /a/file4.ts 500 undefined WatchType: Closed Script info
Info 72   [16:03:40.000] Search path: /a
Info 73   [16:03:41.000] For info: /a/file4.ts :: No config files found.
Info 74   [16:03:42.000] Starting updateGraphWorker: Project: /dev/null/inferredProject2*
Info 75   [16:03:43.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject2* Version: 2 structureChanged: false structureIsReused:: Not Elapsed:: *ms
Info 76   [16:03:44.000] Project '/dev/null/inferredProject2*' (Inferred)
Info 77   [16:03:45.000] 	Files (1)
	/a/file4.ts


	file4.ts
	  Root file specified for compilation

Info 78   [16:03:46.000] -----------------------------------------------
Info 79   [16:03:47.000] `remove Project::
Info 80   [16:03:48.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 81   [16:03:49.000] 	Files (0)



Info 82   [16:03:50.000] -----------------------------------------------
Info 83   [16:03:51.000] DirectoryWatcher:: Close:: WatchInfo: /a/b/src/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 84   [16:03:52.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /a/b/src/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 85   [16:03:53.000] Project '/a/b/tsconfig.json' (Configured)
Info 85   [16:03:54.000] 	Files (3)

Info 85   [16:03:55.000] -----------------------------------------------
Info 85   [16:03:56.000] Project '/dev/null/inferredProject2*' (Inferred)
Info 85   [16:03:57.000] 	Files (1)

Info 85   [16:03:58.000] -----------------------------------------------
Info 85   [16:03:59.000] Open files: 
Info 85   [16:04:00.000] 	FileName: /a/b/file3.ts ProjectRootPath: undefined
Info 85   [16:04:01.000] 		Projects: /a/b/tsconfig.json
Info 85   [16:04:02.000] 	FileName: /a/file4.ts ProjectRootPath: undefined
Info 85   [16:04:03.000] 		Projects: /dev/null/inferredProject2*
Info 85   [16:04:04.000] FileWatcher:: Added:: WatchInfo: /a/b/file3.ts 500 undefined WatchType: Closed Script info
Info 86   [16:04:05.000] Project '/a/b/tsconfig.json' (Configured)
Info 86   [16:04:06.000] 	Files (3)

Info 86   [16:04:07.000] -----------------------------------------------
Info 86   [16:04:08.000] Project '/dev/null/inferredProject2*' (Inferred)
Info 86   [16:04:09.000] 	Files (1)

Info 86   [16:04:10.000] -----------------------------------------------
Info 86   [16:04:11.000] Open files: 
Info 86   [16:04:12.000] 	FileName: /a/file4.ts ProjectRootPath: undefined
Info 86   [16:04:13.000] 		Projects: /dev/null/inferredProject2*
Info 86   [16:04:16.000] Search path: /
Info 87   [16:04:17.000] For info: /file5.ts :: No config files found.
Info 88   [16:04:18.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 89   [16:04:19.000] Starting updateGraphWorker: Project: /dev/null/inferredProject3*
Info 90   [16:04:20.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /dev/null/inferredProject3* WatchType: Missing file
Info 91   [16:04:21.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject3* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 92   [16:04:22.000] Project '/dev/null/inferredProject3*' (Inferred)
Info 93   [16:04:23.000] 	Files (1)
	/file5.ts


	file5.ts
	  Root file specified for compilation

Info 94   [16:04:24.000] -----------------------------------------------
Info 95   [16:04:25.000] `remove Project::
Info 96   [16:04:26.000] Project '/a/b/tsconfig.json' (Configured)
Info 97   [16:04:27.000] 	Files (3)
	/a/b/src/file1.ts
	/a/b/file3.ts
	/a/b/src/file2.ts


	src/file1.ts
	  Matched by default include pattern '**/*'
	file3.ts
	  Matched by default include pattern '**/*'
	src/file2.ts
	  Matched by default include pattern '**/*'

Info 98   [16:04:28.000] -----------------------------------------------
Info 99   [16:04:29.000] DirectoryWatcher:: Close:: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Info 100  [16:04:30.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Info 101  [16:04:31.000] FileWatcher:: Close:: WatchInfo: /a/b/tsconfig.json 2000 undefined Project: /a/b/tsconfig.json WatchType: Config file
Info 102  [16:04:32.000] DirectoryWatcher:: Close:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/tsconfig.json WatchType: Type roots
Info 103  [16:04:33.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/tsconfig.json WatchType: Type roots
Info 104  [16:04:34.000] FileWatcher:: Close:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /a/b/tsconfig.json WatchType: Missing file
Info 105  [16:04:35.000] FileWatcher:: Close:: WatchInfo: /a/b/src/file1.ts 500 undefined WatchType: Closed Script info
Info 106  [16:04:36.000] FileWatcher:: Close:: WatchInfo: /a/b/file3.ts 500 undefined WatchType: Closed Script info
Info 107  [16:04:37.000] FileWatcher:: Close:: WatchInfo: /a/b/src/file2.ts 500 undefined WatchType: Closed Script info
Info 108  [16:04:38.000] Project '/dev/null/inferredProject2*' (Inferred)
Info 108  [16:04:39.000] 	Files (1)

Info 108  [16:04:40.000] -----------------------------------------------
Info 108  [16:04:41.000] Project '/dev/null/inferredProject3*' (Inferred)
Info 108  [16:04:42.000] 	Files (1)

Info 108  [16:04:43.000] -----------------------------------------------
Info 108  [16:04:44.000] Open files: 
Info 108  [16:04:45.000] 	FileName: /a/file4.ts ProjectRootPath: undefined
Info 108  [16:04:46.000] 		Projects: /dev/null/inferredProject2*
Info 108  [16:04:47.000] 	FileName: /file5.ts ProjectRootPath: undefined
Info 108  [16:04:48.000] 		Projects: /dev/null/inferredProject3*