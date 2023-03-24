currentDirectory:: / useCaseSensitiveFileNames: false
Info 0    [00:00:29.000] Provided types map file "/typesMap.json" doesn't exist
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


Info 1    [00:00:30.000] Search path: /user/username/projects/myproject/a
Info 2    [00:00:31.000] For info: /user/username/projects/myproject/a/a.ts :: Config file name: /user/username/projects/myproject/a/tsconfig.json
Info 3    [00:00:32.000] Creating configuration project /user/username/projects/myproject/a/tsconfig.json
Info 4    [00:00:33.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/a/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/a/tsconfig.json WatchType: Config file
Info 5    [00:00:34.000] Config: /user/username/projects/myproject/a/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/a/a.ts"
 ],
 "options": {
  "configFilePath": "/user/username/projects/myproject/a/tsconfig.json"
 }
}
Info 6    [00:00:35.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/extended/alpha.tsconfig.json 2000 undefined Config: /user/username/projects/myproject/a/tsconfig.json WatchType: Extended config file
Info 7    [00:00:36.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/a/tsconfig.json
Info 8    [00:00:37.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /user/username/projects/myproject/a/tsconfig.json WatchType: Missing file
Info 9    [00:00:38.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/a/node_modules/@types 1 undefined Project: /user/username/projects/myproject/a/tsconfig.json WatchType: Type roots
Info 10   [00:00:39.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/a/node_modules/@types 1 undefined Project: /user/username/projects/myproject/a/tsconfig.json WatchType: Type roots
Info 11   [00:00:40.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/a/tsconfig.json WatchType: Type roots
Info 12   [00:00:41.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/a/tsconfig.json WatchType: Type roots
Info 13   [00:00:42.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/myproject/a/tsconfig.json WatchType: Type roots
Info 14   [00:00:43.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/myproject/a/tsconfig.json WatchType: Type roots
Info 15   [00:00:44.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/a/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 16   [00:00:45.000] Project '/user/username/projects/myproject/a/tsconfig.json' (Configured)
Info 17   [00:00:46.000] 	Files (1)
	/user/username/projects/myproject/a/a.ts SVC-1-0 "let a = 1;"


	a.ts
	  Part of 'files' list in tsconfig.json

Info 18   [00:00:47.000] -----------------------------------------------
Info 19   [00:00:48.000] Project '/user/username/projects/myproject/a/tsconfig.json' (Configured)
Info 19   [00:00:49.000] 	Files (1)

Info 19   [00:00:50.000] -----------------------------------------------
Info 19   [00:00:51.000] Open files: 
Info 19   [00:00:52.000] 	FileName: /user/username/projects/myproject/a/a.ts ProjectRootPath: undefined
Info 19   [00:00:53.000] 		Projects: /user/username/projects/myproject/a/tsconfig.json
Info 19   [00:00:54.000] Search path: /user/username/projects/myproject/b
Info 20   [00:00:55.000] For info: /user/username/projects/myproject/b/b.ts :: Config file name: /user/username/projects/myproject/b/tsconfig.json
Info 21   [00:00:56.000] Creating configuration project /user/username/projects/myproject/b/tsconfig.json
Info 22   [00:00:57.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/b/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/b/tsconfig.json WatchType: Config file
Info 23   [00:00:58.000] Config: /user/username/projects/myproject/b/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/b/b.ts"
 ],
 "options": {
  "configFilePath": "/user/username/projects/myproject/b/tsconfig.json"
 }
}
Info 24   [00:00:59.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/extended/bravo.tsconfig.json 2000 undefined Config: /user/username/projects/myproject/b/tsconfig.json WatchType: Extended config file
Info 25   [00:01:00.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/b/tsconfig.json
Info 26   [00:01:01.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /user/username/projects/myproject/b/tsconfig.json WatchType: Missing file
Info 27   [00:01:02.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/b/node_modules/@types 1 undefined Project: /user/username/projects/myproject/b/tsconfig.json WatchType: Type roots
Info 28   [00:01:03.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/b/node_modules/@types 1 undefined Project: /user/username/projects/myproject/b/tsconfig.json WatchType: Type roots
Info 29   [00:01:04.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/b/tsconfig.json WatchType: Type roots
Info 30   [00:01:05.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/b/tsconfig.json WatchType: Type roots
Info 31   [00:01:06.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/myproject/b/tsconfig.json WatchType: Type roots
Info 32   [00:01:07.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/myproject/b/tsconfig.json WatchType: Type roots
Info 33   [00:01:08.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/b/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 34   [00:01:09.000] Project '/user/username/projects/myproject/b/tsconfig.json' (Configured)
Info 35   [00:01:10.000] 	Files (1)
	/user/username/projects/myproject/b/b.ts SVC-1-0 "let b = 1;"


	b.ts
	  Part of 'files' list in tsconfig.json

Info 36   [00:01:11.000] -----------------------------------------------
Info 37   [00:01:12.000] Project '/user/username/projects/myproject/a/tsconfig.json' (Configured)
Info 37   [00:01:13.000] 	Files (1)

Info 37   [00:01:14.000] -----------------------------------------------
Info 37   [00:01:15.000] Project '/user/username/projects/myproject/b/tsconfig.json' (Configured)
Info 37   [00:01:16.000] 	Files (1)

Info 37   [00:01:17.000] -----------------------------------------------
Info 37   [00:01:18.000] Open files: 
Info 37   [00:01:19.000] 	FileName: /user/username/projects/myproject/a/a.ts ProjectRootPath: undefined
Info 37   [00:01:20.000] 		Projects: /user/username/projects/myproject/a/tsconfig.json
Info 37   [00:01:21.000] 	FileName: /user/username/projects/myproject/b/b.ts ProjectRootPath: undefined
Info 37   [00:01:22.000] 		Projects: /user/username/projects/myproject/b/tsconfig.json
Info 37   [00:01:26.000] FileWatcher:: Triggered with /user/username/projects/myproject/extended/alpha.tsconfig.json 1:: WatchInfo: /user/username/projects/myproject/extended/alpha.tsconfig.json 2000 undefined Config: /user/username/projects/myproject/a/tsconfig.json WatchType: Extended config file
Info 38   [00:01:27.000] Scheduled: /user/username/projects/myproject/a/tsconfig.json
Info 39   [00:01:28.000] Scheduled: /user/username/projects/myproject/b/tsconfig.json
Info 40   [00:01:29.000] Scheduled: *ensureProjectForOpenFiles*
Info 41   [00:01:30.000] Elapsed:: *ms FileWatcher:: Triggered with /user/username/projects/myproject/extended/alpha.tsconfig.json 1:: WatchInfo: /user/username/projects/myproject/extended/alpha.tsconfig.json 2000 undefined Config: /user/username/projects/myproject/a/tsconfig.json WatchType: Extended config file
Before checking timeout queue length (3) and running
//// [/user/username/projects/myproject/extended/alpha.tsconfig.json]
{"compilerOptions":{"strict":true}}


PolledWatches::
/a/lib/lib.d.ts: *new*
  {"pollingInterval":500}
/user/username/projects/myproject/a/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/myproject/b/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/a/tsconfig.json: *new*
  {}
/user/username/projects/myproject/extended/alpha.tsconfig.json: *new*
  {}
/user/username/projects/myproject/b/tsconfig.json: *new*
  {}
/user/username/projects/myproject/extended/bravo.tsconfig.json: *new*
  {}

Info 42   [00:01:31.000] Running: /user/username/projects/myproject/a/tsconfig.json
Info 43   [00:01:32.000] Reloading configured project /user/username/projects/myproject/a/tsconfig.json
Info 44   [00:01:33.000] Config: /user/username/projects/myproject/a/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/a/a.ts"
 ],
 "options": {
  "strict": true,
  "configFilePath": "/user/username/projects/myproject/a/tsconfig.json"
 }
}
Info 45   [00:01:34.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/a/tsconfig.json
Info 46   [00:01:35.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/a/tsconfig.json Version: 2 structureChanged: false structureIsReused:: Completely Elapsed:: *ms
Info 47   [00:01:36.000] Project '/user/username/projects/myproject/a/tsconfig.json' (Configured)
Info 48   [00:01:37.000] 	Files (1)
	/user/username/projects/myproject/a/a.ts SVC-1-0 "let a = 1;"

Info 49   [00:01:38.000] -----------------------------------------------
Info 50   [00:01:39.000] Running: /user/username/projects/myproject/b/tsconfig.json
Info 51   [00:01:40.000] Reloading configured project /user/username/projects/myproject/b/tsconfig.json
Info 52   [00:01:41.000] Config: /user/username/projects/myproject/b/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/b/b.ts"
 ],
 "options": {
  "strict": true,
  "configFilePath": "/user/username/projects/myproject/b/tsconfig.json"
 }
}
Info 53   [00:01:42.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/b/tsconfig.json
Info 54   [00:01:43.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/b/tsconfig.json Version: 2 structureChanged: false structureIsReused:: Completely Elapsed:: *ms
Info 55   [00:01:44.000] Project '/user/username/projects/myproject/b/tsconfig.json' (Configured)
Info 56   [00:01:45.000] 	Files (1)
	/user/username/projects/myproject/b/b.ts SVC-1-0 "let b = 1;"

Info 57   [00:01:46.000] -----------------------------------------------
Info 58   [00:01:47.000] Running: *ensureProjectForOpenFiles*
Info 59   [00:01:48.000] Before ensureProjectForOpenFiles:
Info 60   [00:01:49.000] Project '/user/username/projects/myproject/a/tsconfig.json' (Configured)
Info 60   [00:01:50.000] 	Files (1)

Info 60   [00:01:51.000] -----------------------------------------------
Info 60   [00:01:52.000] Project '/user/username/projects/myproject/b/tsconfig.json' (Configured)
Info 60   [00:01:53.000] 	Files (1)

Info 60   [00:01:54.000] -----------------------------------------------
Info 60   [00:01:55.000] Open files: 
Info 60   [00:01:56.000] 	FileName: /user/username/projects/myproject/a/a.ts ProjectRootPath: undefined
Info 60   [00:01:57.000] 		Projects: /user/username/projects/myproject/a/tsconfig.json
Info 60   [00:01:58.000] 	FileName: /user/username/projects/myproject/b/b.ts ProjectRootPath: undefined
Info 60   [00:01:59.000] 		Projects: /user/username/projects/myproject/b/tsconfig.json
Info 60   [00:02:00.000] After ensureProjectForOpenFiles:
Info 61   [00:02:01.000] Project '/user/username/projects/myproject/a/tsconfig.json' (Configured)
Info 61   [00:02:02.000] 	Files (1)

Info 61   [00:02:03.000] -----------------------------------------------
Info 61   [00:02:04.000] Project '/user/username/projects/myproject/b/tsconfig.json' (Configured)
Info 61   [00:02:05.000] 	Files (1)

Info 61   [00:02:06.000] -----------------------------------------------
Info 61   [00:02:07.000] Open files: 
Info 61   [00:02:08.000] 	FileName: /user/username/projects/myproject/a/a.ts ProjectRootPath: undefined
Info 61   [00:02:09.000] 		Projects: /user/username/projects/myproject/a/tsconfig.json
Info 61   [00:02:10.000] 	FileName: /user/username/projects/myproject/b/b.ts ProjectRootPath: undefined
Info 61   [00:02:11.000] 		Projects: /user/username/projects/myproject/b/tsconfig.json
After checking timeout queue length (3) and running

Info 61   [00:02:15.000] FileWatcher:: Triggered with /user/username/projects/myproject/extended/bravo.tsconfig.json 1:: WatchInfo: /user/username/projects/myproject/extended/bravo.tsconfig.json 2000 undefined Config: /user/username/projects/myproject/b/tsconfig.json WatchType: Extended config file
Info 62   [00:02:16.000] Scheduled: /user/username/projects/myproject/b/tsconfig.json
Info 63   [00:02:17.000] Scheduled: *ensureProjectForOpenFiles*
Info 64   [00:02:18.000] Elapsed:: *ms FileWatcher:: Triggered with /user/username/projects/myproject/extended/bravo.tsconfig.json 1:: WatchInfo: /user/username/projects/myproject/extended/bravo.tsconfig.json 2000 undefined Config: /user/username/projects/myproject/b/tsconfig.json WatchType: Extended config file
Before checking timeout queue length (2) and running
//// [/user/username/projects/myproject/extended/bravo.tsconfig.json]
{"extends":"./alpha.tsconfig.json","compilerOptions":{"strict":false}}


Info 65   [00:02:19.000] Running: /user/username/projects/myproject/b/tsconfig.json
Info 66   [00:02:20.000] Reloading configured project /user/username/projects/myproject/b/tsconfig.json
Info 67   [00:02:21.000] Config: /user/username/projects/myproject/b/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/b/b.ts"
 ],
 "options": {
  "strict": false,
  "configFilePath": "/user/username/projects/myproject/b/tsconfig.json"
 }
}
Info 68   [00:02:22.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/b/tsconfig.json
Info 69   [00:02:23.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/b/tsconfig.json Version: 3 structureChanged: false structureIsReused:: Completely Elapsed:: *ms
Info 70   [00:02:24.000] Project '/user/username/projects/myproject/b/tsconfig.json' (Configured)
Info 71   [00:02:25.000] 	Files (1)
	/user/username/projects/myproject/b/b.ts SVC-1-0 "let b = 1;"

Info 72   [00:02:26.000] -----------------------------------------------
Info 73   [00:02:27.000] Running: *ensureProjectForOpenFiles*
Info 74   [00:02:28.000] Before ensureProjectForOpenFiles:
Info 75   [00:02:29.000] Project '/user/username/projects/myproject/a/tsconfig.json' (Configured)
Info 75   [00:02:30.000] 	Files (1)

Info 75   [00:02:31.000] -----------------------------------------------
Info 75   [00:02:32.000] Project '/user/username/projects/myproject/b/tsconfig.json' (Configured)
Info 75   [00:02:33.000] 	Files (1)

Info 75   [00:02:34.000] -----------------------------------------------
Info 75   [00:02:35.000] Open files: 
Info 75   [00:02:36.000] 	FileName: /user/username/projects/myproject/a/a.ts ProjectRootPath: undefined
Info 75   [00:02:37.000] 		Projects: /user/username/projects/myproject/a/tsconfig.json
Info 75   [00:02:38.000] 	FileName: /user/username/projects/myproject/b/b.ts ProjectRootPath: undefined
Info 75   [00:02:39.000] 		Projects: /user/username/projects/myproject/b/tsconfig.json
Info 75   [00:02:40.000] After ensureProjectForOpenFiles:
Info 76   [00:02:41.000] Project '/user/username/projects/myproject/a/tsconfig.json' (Configured)
Info 76   [00:02:42.000] 	Files (1)

Info 76   [00:02:43.000] -----------------------------------------------
Info 76   [00:02:44.000] Project '/user/username/projects/myproject/b/tsconfig.json' (Configured)
Info 76   [00:02:45.000] 	Files (1)

Info 76   [00:02:46.000] -----------------------------------------------
Info 76   [00:02:47.000] Open files: 
Info 76   [00:02:48.000] 	FileName: /user/username/projects/myproject/a/a.ts ProjectRootPath: undefined
Info 76   [00:02:49.000] 		Projects: /user/username/projects/myproject/a/tsconfig.json
Info 76   [00:02:50.000] 	FileName: /user/username/projects/myproject/b/b.ts ProjectRootPath: undefined
Info 76   [00:02:51.000] 		Projects: /user/username/projects/myproject/b/tsconfig.json
After checking timeout queue length (2) and running

Info 76   [00:02:55.000] FileWatcher:: Triggered with /user/username/projects/myproject/b/tsconfig.json 1:: WatchInfo: /user/username/projects/myproject/b/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/b/tsconfig.json WatchType: Config file
Info 77   [00:02:56.000] Scheduled: /user/username/projects/myproject/b/tsconfig.json
Info 78   [00:02:57.000] Scheduled: *ensureProjectForOpenFiles*
Info 79   [00:02:58.000] Elapsed:: *ms FileWatcher:: Triggered with /user/username/projects/myproject/b/tsconfig.json 1:: WatchInfo: /user/username/projects/myproject/b/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/b/tsconfig.json WatchType: Config file
Before checking timeout queue length (2) and running
//// [/user/username/projects/myproject/b/tsconfig.json]
{"extends":"../extended/alpha.tsconfig.json"}


Info 80   [00:02:59.000] Running: /user/username/projects/myproject/b/tsconfig.json
Info 81   [00:03:00.000] Reloading configured project /user/username/projects/myproject/b/tsconfig.json
Info 82   [00:03:01.000] Config: /user/username/projects/myproject/b/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/b/b.ts"
 ],
 "options": {
  "strict": true,
  "configFilePath": "/user/username/projects/myproject/b/tsconfig.json"
 }
}
Info 83   [00:03:02.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/extended/bravo.tsconfig.json 2000 undefined Config: /user/username/projects/myproject/b/tsconfig.json WatchType: Extended config file
Info 84   [00:03:03.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/b 1 undefined Config: /user/username/projects/myproject/b/tsconfig.json WatchType: Wild card directory
Info 85   [00:03:04.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/b 1 undefined Config: /user/username/projects/myproject/b/tsconfig.json WatchType: Wild card directory
Info 86   [00:03:05.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/b/tsconfig.json
Info 87   [00:03:06.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/b/tsconfig.json Version: 4 structureChanged: false structureIsReused:: Completely Elapsed:: *ms
Info 88   [00:03:07.000] Project '/user/username/projects/myproject/b/tsconfig.json' (Configured)
Info 89   [00:03:08.000] 	Files (1)
	/user/username/projects/myproject/b/b.ts SVC-1-0 "let b = 1;"

Info 90   [00:03:09.000] -----------------------------------------------
Info 91   [00:03:10.000] Running: *ensureProjectForOpenFiles*
Info 92   [00:03:11.000] Before ensureProjectForOpenFiles:
Info 93   [00:03:12.000] Project '/user/username/projects/myproject/a/tsconfig.json' (Configured)
Info 93   [00:03:13.000] 	Files (1)

Info 93   [00:03:14.000] -----------------------------------------------
Info 93   [00:03:15.000] Project '/user/username/projects/myproject/b/tsconfig.json' (Configured)
Info 93   [00:03:16.000] 	Files (1)

Info 93   [00:03:17.000] -----------------------------------------------
Info 93   [00:03:18.000] Open files: 
Info 93   [00:03:19.000] 	FileName: /user/username/projects/myproject/a/a.ts ProjectRootPath: undefined
Info 93   [00:03:20.000] 		Projects: /user/username/projects/myproject/a/tsconfig.json
Info 93   [00:03:21.000] 	FileName: /user/username/projects/myproject/b/b.ts ProjectRootPath: undefined
Info 93   [00:03:22.000] 		Projects: /user/username/projects/myproject/b/tsconfig.json
Info 93   [00:03:23.000] After ensureProjectForOpenFiles:
Info 94   [00:03:24.000] Project '/user/username/projects/myproject/a/tsconfig.json' (Configured)
Info 94   [00:03:25.000] 	Files (1)

Info 94   [00:03:26.000] -----------------------------------------------
Info 94   [00:03:27.000] Project '/user/username/projects/myproject/b/tsconfig.json' (Configured)
Info 94   [00:03:28.000] 	Files (1)

Info 94   [00:03:29.000] -----------------------------------------------
Info 94   [00:03:30.000] Open files: 
Info 94   [00:03:31.000] 	FileName: /user/username/projects/myproject/a/a.ts ProjectRootPath: undefined
Info 94   [00:03:32.000] 		Projects: /user/username/projects/myproject/a/tsconfig.json
Info 94   [00:03:33.000] 	FileName: /user/username/projects/myproject/b/b.ts ProjectRootPath: undefined
Info 94   [00:03:34.000] 		Projects: /user/username/projects/myproject/b/tsconfig.json
After checking timeout queue length (2) and running

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/user/username/projects/myproject/a/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/b/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/a/tsconfig.json:
  {}
/user/username/projects/myproject/extended/alpha.tsconfig.json:
  {}
/user/username/projects/myproject/b/tsconfig.json:
  {}

FsWatches *deleted*::
/user/username/projects/myproject/extended/bravo.tsconfig.json:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/b: *new*
  {}

Info 94   [00:03:38.000] FileWatcher:: Triggered with /user/username/projects/myproject/extended/alpha.tsconfig.json 1:: WatchInfo: /user/username/projects/myproject/extended/alpha.tsconfig.json 2000 undefined Config: /user/username/projects/myproject/a/tsconfig.json WatchType: Extended config file
Info 95   [00:03:39.000] Scheduled: /user/username/projects/myproject/a/tsconfig.json
Info 96   [00:03:40.000] Scheduled: /user/username/projects/myproject/b/tsconfig.json
Info 97   [00:03:41.000] Scheduled: *ensureProjectForOpenFiles*
Info 98   [00:03:42.000] Elapsed:: *ms FileWatcher:: Triggered with /user/username/projects/myproject/extended/alpha.tsconfig.json 1:: WatchInfo: /user/username/projects/myproject/extended/alpha.tsconfig.json 2000 undefined Config: /user/username/projects/myproject/a/tsconfig.json WatchType: Extended config file
Before checking timeout queue length (3) and running
//// [/user/username/projects/myproject/extended/alpha.tsconfig.json]
{}


Info 99   [00:03:43.000] Running: /user/username/projects/myproject/a/tsconfig.json
Info 100  [00:03:44.000] Reloading configured project /user/username/projects/myproject/a/tsconfig.json
Info 101  [00:03:45.000] Config: /user/username/projects/myproject/a/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/a/a.ts"
 ],
 "options": {
  "configFilePath": "/user/username/projects/myproject/a/tsconfig.json"
 }
}
Info 102  [00:03:46.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/a/tsconfig.json
Info 103  [00:03:47.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/a/tsconfig.json Version: 3 structureChanged: false structureIsReused:: Completely Elapsed:: *ms
Info 104  [00:03:48.000] Project '/user/username/projects/myproject/a/tsconfig.json' (Configured)
Info 105  [00:03:49.000] 	Files (1)
	/user/username/projects/myproject/a/a.ts SVC-1-0 "let a = 1;"

Info 106  [00:03:50.000] -----------------------------------------------
Info 107  [00:03:51.000] Running: /user/username/projects/myproject/b/tsconfig.json
Info 108  [00:03:52.000] Reloading configured project /user/username/projects/myproject/b/tsconfig.json
Info 109  [00:03:53.000] Config: /user/username/projects/myproject/b/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/b/b.ts"
 ],
 "options": {
  "configFilePath": "/user/username/projects/myproject/b/tsconfig.json"
 }
}
Info 110  [00:03:54.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/b/tsconfig.json
Info 111  [00:03:55.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/b/tsconfig.json Version: 5 structureChanged: false structureIsReused:: Completely Elapsed:: *ms
Info 112  [00:03:56.000] Project '/user/username/projects/myproject/b/tsconfig.json' (Configured)
Info 113  [00:03:57.000] 	Files (1)
	/user/username/projects/myproject/b/b.ts SVC-1-0 "let b = 1;"

Info 114  [00:03:58.000] -----------------------------------------------
Info 115  [00:03:59.000] Running: *ensureProjectForOpenFiles*
Info 116  [00:04:00.000] Before ensureProjectForOpenFiles:
Info 117  [00:04:01.000] Project '/user/username/projects/myproject/a/tsconfig.json' (Configured)
Info 117  [00:04:02.000] 	Files (1)

Info 117  [00:04:03.000] -----------------------------------------------
Info 117  [00:04:04.000] Project '/user/username/projects/myproject/b/tsconfig.json' (Configured)
Info 117  [00:04:05.000] 	Files (1)

Info 117  [00:04:06.000] -----------------------------------------------
Info 117  [00:04:07.000] Open files: 
Info 117  [00:04:08.000] 	FileName: /user/username/projects/myproject/a/a.ts ProjectRootPath: undefined
Info 117  [00:04:09.000] 		Projects: /user/username/projects/myproject/a/tsconfig.json
Info 117  [00:04:10.000] 	FileName: /user/username/projects/myproject/b/b.ts ProjectRootPath: undefined
Info 117  [00:04:11.000] 		Projects: /user/username/projects/myproject/b/tsconfig.json
Info 117  [00:04:12.000] After ensureProjectForOpenFiles:
Info 118  [00:04:13.000] Project '/user/username/projects/myproject/a/tsconfig.json' (Configured)
Info 118  [00:04:14.000] 	Files (1)

Info 118  [00:04:15.000] -----------------------------------------------
Info 118  [00:04:16.000] Project '/user/username/projects/myproject/b/tsconfig.json' (Configured)
Info 118  [00:04:17.000] 	Files (1)

Info 118  [00:04:18.000] -----------------------------------------------
Info 118  [00:04:19.000] Open files: 
Info 118  [00:04:20.000] 	FileName: /user/username/projects/myproject/a/a.ts ProjectRootPath: undefined
Info 118  [00:04:21.000] 		Projects: /user/username/projects/myproject/a/tsconfig.json
Info 118  [00:04:22.000] 	FileName: /user/username/projects/myproject/b/b.ts ProjectRootPath: undefined
Info 118  [00:04:23.000] 		Projects: /user/username/projects/myproject/b/tsconfig.json
After checking timeout queue length (3) and running
