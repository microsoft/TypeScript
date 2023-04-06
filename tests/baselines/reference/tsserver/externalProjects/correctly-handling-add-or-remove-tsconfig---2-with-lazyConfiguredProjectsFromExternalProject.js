currentDirectory:: / useCaseSensitiveFileNames: false
Info 0    [00:00:21.000] Provided types map file "/typesMap.json" doesn't exist
Creating project service
//// [/a/b/app.ts]
let x = 1;

//// [/a/b/c/lib.ts]


//// [/a/b/c/tsconfig.json]
{}

//// [/a/b/d/lib.ts]


//// [/a/b/d/tsconfig.json]
{}


Info 1    [00:00:22.000] FileWatcher:: Added:: WatchInfo: /a/b/app.ts 500 undefined WatchType: Closed Script info
Info 2    [00:00:23.000] Starting updateGraphWorker: Project: /a/b/proj1
Info 3    [00:00:24.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /a/b/proj1 WatchType: Missing file
Info 4    [00:00:25.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/proj1 WatchType: Type roots
Info 5    [00:00:26.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/proj1 WatchType: Type roots
Info 6    [00:00:27.000] Finishing updateGraphWorker: Project: /a/b/proj1 Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 7    [00:00:28.000] Project '/a/b/proj1' (External)
Info 8    [00:00:29.000] 	Files (1)
	/a/b/app.ts Text-1 "let x = 1;"


	app.ts
	  Root file specified for compilation

Info 9    [00:00:30.000] -----------------------------------------------
Info 10   [00:00:31.000] `remove Project::
Info 11   [00:00:32.000] Project '/a/b/proj1' (External)
Info 12   [00:00:33.000] 	Files (1)
	/a/b/app.ts


	app.ts
	  Root file specified for compilation

Info 13   [00:00:34.000] -----------------------------------------------
Info 14   [00:00:35.000] DirectoryWatcher:: Close:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/proj1 WatchType: Type roots
Info 15   [00:00:36.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/proj1 WatchType: Type roots
Info 16   [00:00:37.000] FileWatcher:: Close:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /a/b/proj1 WatchType: Missing file
Info 17   [00:00:38.000] Creating configuration project /a/b/c/tsconfig.json
Info 18   [00:00:39.000] FileWatcher:: Added:: WatchInfo: /a/b/c/tsconfig.json 2000 undefined Project: /a/b/c/tsconfig.json WatchType: Config file
Info 19   [00:00:40.000] Creating configuration project /a/b/d/tsconfig.json
Info 20   [00:00:41.000] FileWatcher:: Added:: WatchInfo: /a/b/d/tsconfig.json 2000 undefined Project: /a/b/d/tsconfig.json WatchType: Config file
Info 21   [00:00:42.000] Loading configured project /a/b/c/tsconfig.json
Info 22   [00:00:43.000] Config: /a/b/c/tsconfig.json : {
 "rootNames": [
  "/a/b/c/lib.ts"
 ],
 "options": {
  "configFilePath": "/a/b/c/tsconfig.json"
 }
}
Info 23   [00:00:44.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/c 1 undefined Config: /a/b/c/tsconfig.json WatchType: Wild card directory
Info 24   [00:00:45.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/c 1 undefined Config: /a/b/c/tsconfig.json WatchType: Wild card directory
Info 25   [00:00:46.000] FileWatcher:: Added:: WatchInfo: /a/b/c/lib.ts 500 undefined WatchType: Closed Script info
Info 26   [00:00:47.000] Starting updateGraphWorker: Project: /a/b/c/tsconfig.json
Info 27   [00:00:48.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /a/b/c/tsconfig.json WatchType: Missing file
Info 28   [00:00:49.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/c/node_modules/@types 1 undefined Project: /a/b/c/tsconfig.json WatchType: Type roots
Info 29   [00:00:50.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/c/node_modules/@types 1 undefined Project: /a/b/c/tsconfig.json WatchType: Type roots
Info 30   [00:00:51.000] Finishing updateGraphWorker: Project: /a/b/c/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 31   [00:00:52.000] Project '/a/b/c/tsconfig.json' (Configured)
Info 32   [00:00:53.000] 	Files (1)
	/a/b/c/lib.ts Text-1 ""


	lib.ts
	  Matched by default include pattern '**/*'

Info 33   [00:00:54.000] -----------------------------------------------
Info 34   [00:00:55.000] Loading configured project /a/b/d/tsconfig.json
Info 35   [00:00:56.000] Config: /a/b/d/tsconfig.json : {
 "rootNames": [
  "/a/b/d/lib.ts"
 ],
 "options": {
  "configFilePath": "/a/b/d/tsconfig.json"
 }
}
Info 36   [00:00:57.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/d 1 undefined Config: /a/b/d/tsconfig.json WatchType: Wild card directory
Info 37   [00:00:58.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/d 1 undefined Config: /a/b/d/tsconfig.json WatchType: Wild card directory
Info 38   [00:00:59.000] FileWatcher:: Added:: WatchInfo: /a/b/d/lib.ts 500 undefined WatchType: Closed Script info
Info 39   [00:01:00.000] Starting updateGraphWorker: Project: /a/b/d/tsconfig.json
Info 40   [00:01:01.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /a/b/d/tsconfig.json WatchType: Missing file
Info 41   [00:01:02.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/d/node_modules/@types 1 undefined Project: /a/b/d/tsconfig.json WatchType: Type roots
Info 42   [00:01:03.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/d/node_modules/@types 1 undefined Project: /a/b/d/tsconfig.json WatchType: Type roots
Info 43   [00:01:04.000] Finishing updateGraphWorker: Project: /a/b/d/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 44   [00:01:05.000] Project '/a/b/d/tsconfig.json' (Configured)
Info 45   [00:01:06.000] 	Files (1)
	/a/b/d/lib.ts Text-1 ""


	lib.ts
	  Matched by default include pattern '**/*'

Info 46   [00:01:07.000] -----------------------------------------------
Info 47   [00:01:08.000] Before ensureProjectForOpenFiles:
Info 48   [00:01:09.000] Project '/a/b/c/tsconfig.json' (Configured)
Info 48   [00:01:10.000] 	Files (1)

Info 48   [00:01:11.000] -----------------------------------------------
Info 48   [00:01:12.000] Project '/a/b/d/tsconfig.json' (Configured)
Info 48   [00:01:13.000] 	Files (1)

Info 48   [00:01:14.000] -----------------------------------------------
Info 48   [00:01:15.000] Open files: 
Info 48   [00:01:16.000] After ensureProjectForOpenFiles:
Info 49   [00:01:17.000] Project '/a/b/c/tsconfig.json' (Configured)
Info 49   [00:01:18.000] 	Files (1)

Info 49   [00:01:19.000] -----------------------------------------------
Info 49   [00:01:20.000] Project '/a/b/d/tsconfig.json' (Configured)
Info 49   [00:01:21.000] 	Files (1)

Info 49   [00:01:22.000] -----------------------------------------------
Info 49   [00:01:23.000] Open files: 
Info 49   [00:01:24.000] `remove Project::
Info 50   [00:01:25.000] Project '/a/b/c/tsconfig.json' (Configured)
Info 51   [00:01:26.000] 	Files (1)
	/a/b/c/lib.ts


	lib.ts
	  Matched by default include pattern '**/*'

Info 52   [00:01:27.000] -----------------------------------------------
Info 53   [00:01:28.000] DirectoryWatcher:: Close:: WatchInfo: /a/b/c 1 undefined Config: /a/b/c/tsconfig.json WatchType: Wild card directory
Info 54   [00:01:29.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /a/b/c 1 undefined Config: /a/b/c/tsconfig.json WatchType: Wild card directory
Info 55   [00:01:30.000] FileWatcher:: Close:: WatchInfo: /a/b/c/tsconfig.json 2000 undefined Project: /a/b/c/tsconfig.json WatchType: Config file
Info 56   [00:01:31.000] DirectoryWatcher:: Close:: WatchInfo: /a/b/c/node_modules/@types 1 undefined Project: /a/b/c/tsconfig.json WatchType: Type roots
Info 57   [00:01:32.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /a/b/c/node_modules/@types 1 undefined Project: /a/b/c/tsconfig.json WatchType: Type roots
Info 58   [00:01:33.000] FileWatcher:: Close:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /a/b/c/tsconfig.json WatchType: Missing file
Info 59   [00:01:34.000] `remove Project::
Info 60   [00:01:35.000] Project '/a/b/d/tsconfig.json' (Configured)
Info 61   [00:01:36.000] 	Files (1)
	/a/b/d/lib.ts


	lib.ts
	  Matched by default include pattern '**/*'

Info 62   [00:01:37.000] -----------------------------------------------
Info 63   [00:01:38.000] DirectoryWatcher:: Close:: WatchInfo: /a/b/d 1 undefined Config: /a/b/d/tsconfig.json WatchType: Wild card directory
Info 64   [00:01:39.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /a/b/d 1 undefined Config: /a/b/d/tsconfig.json WatchType: Wild card directory
Info 65   [00:01:40.000] FileWatcher:: Close:: WatchInfo: /a/b/d/tsconfig.json 2000 undefined Project: /a/b/d/tsconfig.json WatchType: Config file
Info 66   [00:01:41.000] DirectoryWatcher:: Close:: WatchInfo: /a/b/d/node_modules/@types 1 undefined Project: /a/b/d/tsconfig.json WatchType: Type roots
Info 67   [00:01:42.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /a/b/d/node_modules/@types 1 undefined Project: /a/b/d/tsconfig.json WatchType: Type roots
Info 68   [00:01:43.000] FileWatcher:: Close:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /a/b/d/tsconfig.json WatchType: Missing file
Info 69   [00:01:44.000] Starting updateGraphWorker: Project: /a/b/proj1
Info 70   [00:01:45.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /a/b/proj1 WatchType: Missing file
Info 71   [00:01:46.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/proj1 WatchType: Type roots
Info 72   [00:01:47.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/proj1 WatchType: Type roots
Info 73   [00:01:48.000] Finishing updateGraphWorker: Project: /a/b/proj1 Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 74   [00:01:49.000] Project '/a/b/proj1' (External)
Info 75   [00:01:50.000] 	Files (1)
	/a/b/app.ts Text-1 "let x = 1;"


	app.ts
	  Root file specified for compilation

Info 76   [00:01:51.000] -----------------------------------------------
Info 77   [00:01:52.000] `remove Project::
Info 78   [00:01:53.000] Project '/a/b/proj1' (External)
Info 79   [00:01:54.000] 	Files (1)
	/a/b/app.ts


	app.ts
	  Root file specified for compilation

Info 80   [00:01:55.000] -----------------------------------------------
Info 81   [00:01:56.000] DirectoryWatcher:: Close:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/proj1 WatchType: Type roots
Info 82   [00:01:57.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/proj1 WatchType: Type roots
Info 83   [00:01:58.000] FileWatcher:: Close:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /a/b/proj1 WatchType: Missing file
Info 84   [00:01:59.000] Creating configuration project /a/b/c/tsconfig.json
Info 85   [00:02:00.000] FileWatcher:: Added:: WatchInfo: /a/b/c/tsconfig.json 2000 undefined Project: /a/b/c/tsconfig.json WatchType: Config file
Info 86   [00:02:01.000] Creating configuration project /a/b/d/tsconfig.json
Info 87   [00:02:02.000] FileWatcher:: Added:: WatchInfo: /a/b/d/tsconfig.json 2000 undefined Project: /a/b/d/tsconfig.json WatchType: Config file
Info 88   [00:02:03.000] Loading configured project /a/b/c/tsconfig.json
Info 89   [00:02:04.000] Config: /a/b/c/tsconfig.json : {
 "rootNames": [
  "/a/b/c/lib.ts"
 ],
 "options": {
  "configFilePath": "/a/b/c/tsconfig.json"
 }
}
Info 90   [00:02:05.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/c 1 undefined Config: /a/b/c/tsconfig.json WatchType: Wild card directory
Info 91   [00:02:06.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/c 1 undefined Config: /a/b/c/tsconfig.json WatchType: Wild card directory
Info 92   [00:02:07.000] Starting updateGraphWorker: Project: /a/b/c/tsconfig.json
Info 93   [00:02:08.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /a/b/c/tsconfig.json WatchType: Missing file
Info 94   [00:02:09.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/c/node_modules/@types 1 undefined Project: /a/b/c/tsconfig.json WatchType: Type roots
Info 95   [00:02:10.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/c/node_modules/@types 1 undefined Project: /a/b/c/tsconfig.json WatchType: Type roots
Info 96   [00:02:11.000] Finishing updateGraphWorker: Project: /a/b/c/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 97   [00:02:12.000] Project '/a/b/c/tsconfig.json' (Configured)
Info 98   [00:02:13.000] 	Files (1)
	/a/b/c/lib.ts Text-1 ""


	lib.ts
	  Matched by default include pattern '**/*'

Info 99   [00:02:14.000] -----------------------------------------------
Info 100  [00:02:15.000] Loading configured project /a/b/d/tsconfig.json
Info 101  [00:02:16.000] Config: /a/b/d/tsconfig.json : {
 "rootNames": [
  "/a/b/d/lib.ts"
 ],
 "options": {
  "configFilePath": "/a/b/d/tsconfig.json"
 }
}
Info 102  [00:02:17.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/d 1 undefined Config: /a/b/d/tsconfig.json WatchType: Wild card directory
Info 103  [00:02:18.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/d 1 undefined Config: /a/b/d/tsconfig.json WatchType: Wild card directory
Info 104  [00:02:19.000] Starting updateGraphWorker: Project: /a/b/d/tsconfig.json
Info 105  [00:02:20.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /a/b/d/tsconfig.json WatchType: Missing file
Info 106  [00:02:21.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/d/node_modules/@types 1 undefined Project: /a/b/d/tsconfig.json WatchType: Type roots
Info 107  [00:02:22.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/d/node_modules/@types 1 undefined Project: /a/b/d/tsconfig.json WatchType: Type roots
Info 108  [00:02:23.000] Finishing updateGraphWorker: Project: /a/b/d/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 109  [00:02:24.000] Project '/a/b/d/tsconfig.json' (Configured)
Info 110  [00:02:25.000] 	Files (1)
	/a/b/d/lib.ts Text-1 ""


	lib.ts
	  Matched by default include pattern '**/*'

Info 111  [00:02:26.000] -----------------------------------------------
Info 112  [00:02:27.000] Before ensureProjectForOpenFiles:
Info 113  [00:02:28.000] Project '/a/b/c/tsconfig.json' (Configured)
Info 113  [00:02:29.000] 	Files (1)

Info 113  [00:02:30.000] -----------------------------------------------
Info 113  [00:02:31.000] Project '/a/b/d/tsconfig.json' (Configured)
Info 113  [00:02:32.000] 	Files (1)

Info 113  [00:02:33.000] -----------------------------------------------
Info 113  [00:02:34.000] Open files: 
Info 113  [00:02:35.000] After ensureProjectForOpenFiles:
Info 114  [00:02:36.000] Project '/a/b/c/tsconfig.json' (Configured)
Info 114  [00:02:37.000] 	Files (1)

Info 114  [00:02:38.000] -----------------------------------------------
Info 114  [00:02:39.000] Project '/a/b/d/tsconfig.json' (Configured)
Info 114  [00:02:40.000] 	Files (1)

Info 114  [00:02:41.000] -----------------------------------------------
Info 114  [00:02:42.000] Open files: 
Info 114  [00:02:43.000] `remove Project::
Info 115  [00:02:44.000] Project '/a/b/c/tsconfig.json' (Configured)
Info 116  [00:02:45.000] 	Files (1)
	/a/b/c/lib.ts


	lib.ts
	  Matched by default include pattern '**/*'

Info 117  [00:02:46.000] -----------------------------------------------
Info 118  [00:02:47.000] DirectoryWatcher:: Close:: WatchInfo: /a/b/c 1 undefined Config: /a/b/c/tsconfig.json WatchType: Wild card directory
Info 119  [00:02:48.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /a/b/c 1 undefined Config: /a/b/c/tsconfig.json WatchType: Wild card directory
Info 120  [00:02:49.000] FileWatcher:: Close:: WatchInfo: /a/b/c/tsconfig.json 2000 undefined Project: /a/b/c/tsconfig.json WatchType: Config file
Info 121  [00:02:50.000] DirectoryWatcher:: Close:: WatchInfo: /a/b/c/node_modules/@types 1 undefined Project: /a/b/c/tsconfig.json WatchType: Type roots
Info 122  [00:02:51.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /a/b/c/node_modules/@types 1 undefined Project: /a/b/c/tsconfig.json WatchType: Type roots
Info 123  [00:02:52.000] FileWatcher:: Close:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /a/b/c/tsconfig.json WatchType: Missing file
Info 124  [00:02:53.000] `remove Project::
Info 125  [00:02:54.000] Project '/a/b/d/tsconfig.json' (Configured)
Info 126  [00:02:55.000] 	Files (1)
	/a/b/d/lib.ts


	lib.ts
	  Matched by default include pattern '**/*'

Info 127  [00:02:56.000] -----------------------------------------------
Info 128  [00:02:57.000] DirectoryWatcher:: Close:: WatchInfo: /a/b/d 1 undefined Config: /a/b/d/tsconfig.json WatchType: Wild card directory
Info 129  [00:02:58.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /a/b/d 1 undefined Config: /a/b/d/tsconfig.json WatchType: Wild card directory
Info 130  [00:02:59.000] FileWatcher:: Close:: WatchInfo: /a/b/d/tsconfig.json 2000 undefined Project: /a/b/d/tsconfig.json WatchType: Config file
Info 131  [00:03:00.000] DirectoryWatcher:: Close:: WatchInfo: /a/b/d/node_modules/@types 1 undefined Project: /a/b/d/tsconfig.json WatchType: Type roots
Info 132  [00:03:01.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /a/b/d/node_modules/@types 1 undefined Project: /a/b/d/tsconfig.json WatchType: Type roots
Info 133  [00:03:02.000] FileWatcher:: Close:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /a/b/d/tsconfig.json WatchType: Missing file