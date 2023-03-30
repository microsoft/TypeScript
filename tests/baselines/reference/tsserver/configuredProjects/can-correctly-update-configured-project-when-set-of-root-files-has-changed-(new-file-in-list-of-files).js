currentDirectory:: / useCaseSensitiveFileNames: false
Info 0    [00:00:13.000] Provided types map file "/typesMap.json" doesn't exist
Creating project service
//// [/a/b/f1.ts]
let x = 1

//// [/a/b/f2.ts]
let y = 1

//// [/a/b/tsconfig.json]
{"compilerOptions":{},"files":["f1.ts"]}


Info 1    [00:00:14.000] Search path: /a/b
Info 2    [00:00:15.000] For info: /a/b/f1.ts :: Config file name: /a/b/tsconfig.json
Info 3    [00:00:16.000] Creating configuration project /a/b/tsconfig.json
Info 4    [00:00:17.000] FileWatcher:: Added:: WatchInfo: /a/b/tsconfig.json 2000 undefined Project: /a/b/tsconfig.json WatchType: Config file
Info 5    [00:00:18.000] Config: /a/b/tsconfig.json : {
 "rootNames": [
  "/a/b/f1.ts"
 ],
 "options": {
  "configFilePath": "/a/b/tsconfig.json"
 }
}
Info 6    [00:00:19.000] Starting updateGraphWorker: Project: /a/b/tsconfig.json
Info 7    [00:00:20.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /a/b/tsconfig.json WatchType: Missing file
Info 8    [00:00:21.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/tsconfig.json WatchType: Type roots
Info 9    [00:00:22.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/tsconfig.json WatchType: Type roots
Info 10   [00:00:23.000] Finishing updateGraphWorker: Project: /a/b/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 11   [00:00:24.000] Project '/a/b/tsconfig.json' (Configured)
Info 12   [00:00:25.000] 	Files (1)
	/a/b/f1.ts SVC-1-0 "let x = 1"


	f1.ts
	  Part of 'files' list in tsconfig.json

Info 13   [00:00:26.000] -----------------------------------------------
Info 14   [00:00:27.000] Project '/a/b/tsconfig.json' (Configured)
Info 14   [00:00:28.000] 	Files (1)

Info 14   [00:00:29.000] -----------------------------------------------
Info 14   [00:00:30.000] Open files: 
Info 14   [00:00:31.000] 	FileName: /a/b/f1.ts ProjectRootPath: undefined
Info 14   [00:00:32.000] 		Projects: /a/b/tsconfig.json
Info 14   [00:00:36.000] FileWatcher:: Triggered with /a/b/tsconfig.json 1:: WatchInfo: /a/b/tsconfig.json 2000 undefined Project: /a/b/tsconfig.json WatchType: Config file
Info 15   [00:00:37.000] Scheduled: /a/b/tsconfig.json
Info 16   [00:00:38.000] Scheduled: *ensureProjectForOpenFiles*
Info 17   [00:00:39.000] Elapsed:: *ms FileWatcher:: Triggered with /a/b/tsconfig.json 1:: WatchInfo: /a/b/tsconfig.json 2000 undefined Project: /a/b/tsconfig.json WatchType: Config file
Before running Timeout callback:: count: 2
1: /a/b/tsconfig.json
2: *ensureProjectForOpenFiles*
//// [/a/b/tsconfig.json]
{"compilerOptions":{},"files":["f1.ts","f2.ts"]}


PolledWatches::
/a/lib/lib.d.ts: *new*
  {"pollingInterval":500}
/a/b/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/a/b/tsconfig.json: *new*
  {}

Info 18   [00:00:40.000] Running: /a/b/tsconfig.json
Info 19   [00:00:41.000] Reloading configured project /a/b/tsconfig.json
Info 20   [00:00:42.000] Config: /a/b/tsconfig.json : {
 "rootNames": [
  "/a/b/f1.ts",
  "/a/b/f2.ts"
 ],
 "options": {
  "configFilePath": "/a/b/tsconfig.json"
 }
}
Info 21   [00:00:43.000] FileWatcher:: Added:: WatchInfo: /a/b/f2.ts 500 undefined WatchType: Closed Script info
Info 22   [00:00:44.000] Starting updateGraphWorker: Project: /a/b/tsconfig.json
Info 23   [00:00:45.000] Finishing updateGraphWorker: Project: /a/b/tsconfig.json Version: 2 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 24   [00:00:46.000] Project '/a/b/tsconfig.json' (Configured)
Info 25   [00:00:47.000] 	Files (2)
	/a/b/f1.ts SVC-1-0 "let x = 1"
	/a/b/f2.ts Text-1 "let y = 1"


	f1.ts
	  Part of 'files' list in tsconfig.json
	f2.ts
	  Part of 'files' list in tsconfig.json

Info 26   [00:00:48.000] -----------------------------------------------
Info 27   [00:00:49.000] Running: *ensureProjectForOpenFiles*
Info 28   [00:00:50.000] Before ensureProjectForOpenFiles:
Info 29   [00:00:51.000] Project '/a/b/tsconfig.json' (Configured)
Info 29   [00:00:52.000] 	Files (2)

Info 29   [00:00:53.000] -----------------------------------------------
Info 29   [00:00:54.000] Open files: 
Info 29   [00:00:55.000] 	FileName: /a/b/f1.ts ProjectRootPath: undefined
Info 29   [00:00:56.000] 		Projects: /a/b/tsconfig.json
Info 29   [00:00:57.000] After ensureProjectForOpenFiles:
Info 30   [00:00:58.000] Project '/a/b/tsconfig.json' (Configured)
Info 30   [00:00:59.000] 	Files (2)

Info 30   [00:01:00.000] -----------------------------------------------
Info 30   [00:01:01.000] Open files: 
Info 30   [00:01:02.000] 	FileName: /a/b/f1.ts ProjectRootPath: undefined
Info 30   [00:01:03.000] 		Projects: /a/b/tsconfig.json
After running Timeout callback:: count: 0

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/a/b/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/b/tsconfig.json:
  {}
/a/b/f2.ts: *new*
  {}
