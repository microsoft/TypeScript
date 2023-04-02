currentDirectory:: / useCaseSensitiveFileNames: false
Info 0    [00:00:17.000] Provided types map file "/typesMap.json" doesn't exist
Creating project service
//// [/a/b/app.ts]
let x = 1;

//// [/a/c/f.ts]
/// <reference path="../b/app.ts"/>

//// [/a/c/tsconfig.json]
{}

//// [/a/b/tsconfig.json]
{}


Info 1    [00:00:18.000] Search path: /a/c
Info 2    [00:00:19.000] For info: /a/c/f.ts :: Config file name: /a/c/tsconfig.json
Info 3    [00:00:20.000] Creating configuration project /a/c/tsconfig.json
Info 4    [00:00:21.000] FileWatcher:: Added:: WatchInfo: /a/c/tsconfig.json 2000 undefined Project: /a/c/tsconfig.json WatchType: Config file
Info 5    [00:00:22.000] Config: /a/c/tsconfig.json : {
 "rootNames": [
  "/a/c/f.ts"
 ],
 "options": {
  "configFilePath": "/a/c/tsconfig.json"
 }
}
Info 6    [00:00:23.000] DirectoryWatcher:: Added:: WatchInfo: /a/c 1 undefined Config: /a/c/tsconfig.json WatchType: Wild card directory
Info 7    [00:00:24.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/c 1 undefined Config: /a/c/tsconfig.json WatchType: Wild card directory
Info 8    [00:00:25.000] Starting updateGraphWorker: Project: /a/c/tsconfig.json
Info 9    [00:00:26.000] FileWatcher:: Added:: WatchInfo: /a/b/app.ts 500 undefined WatchType: Closed Script info
Info 10   [00:00:27.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /a/c/tsconfig.json WatchType: Missing file
Info 11   [00:00:28.000] DirectoryWatcher:: Added:: WatchInfo: /a/c/node_modules/@types 1 undefined Project: /a/c/tsconfig.json WatchType: Type roots
Info 12   [00:00:29.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/c/node_modules/@types 1 undefined Project: /a/c/tsconfig.json WatchType: Type roots
Info 13   [00:00:30.000] Finishing updateGraphWorker: Project: /a/c/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 14   [00:00:31.000] Project '/a/c/tsconfig.json' (Configured)
Info 15   [00:00:32.000] 	Files (2)
	/a/b/app.ts Text-1 "let x = 1;"
	/a/c/f.ts SVC-1-0 "/// <reference path=\"../b/app.ts\"/>"


	../b/app.ts
	  Referenced via '../b/app.ts' from file 'f.ts'
	f.ts
	  Matched by default include pattern '**/*'

Info 16   [00:00:33.000] -----------------------------------------------
Info 17   [00:00:34.000] Project '/a/c/tsconfig.json' (Configured)
Info 17   [00:00:35.000] 	Files (2)

Info 17   [00:00:36.000] -----------------------------------------------
Info 17   [00:00:37.000] Open files: 
Info 17   [00:00:38.000] 	FileName: /a/c/f.ts ProjectRootPath: undefined
Info 17   [00:00:39.000] 		Projects: /a/c/tsconfig.json
Configured project: /a/c/tsconfig.json hasOpenRef:: true isClosed: false
Info 17   [00:00:40.000] FileWatcher:: Close:: WatchInfo: /a/b/app.ts 500 undefined WatchType: Closed Script info
Info 18   [00:00:41.000] Search path: /a/b
Info 19   [00:00:42.000] For info: /a/b/app.ts :: Config file name: /a/b/tsconfig.json
Info 20   [00:00:43.000] Creating configuration project /a/b/tsconfig.json
Info 21   [00:00:44.000] FileWatcher:: Added:: WatchInfo: /a/b/tsconfig.json 2000 undefined Project: /a/b/tsconfig.json WatchType: Config file
Info 22   [00:00:45.000] Config: /a/b/tsconfig.json : {
 "rootNames": [
  "/a/b/app.ts"
 ],
 "options": {
  "configFilePath": "/a/b/tsconfig.json"
 }
}
Info 23   [00:00:46.000] DirectoryWatcher:: Added:: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Info 24   [00:00:47.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Info 25   [00:00:48.000] Starting updateGraphWorker: Project: /a/b/tsconfig.json
Info 26   [00:00:49.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /a/b/tsconfig.json WatchType: Missing file
Info 27   [00:00:50.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/tsconfig.json WatchType: Type roots
Info 28   [00:00:51.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/tsconfig.json WatchType: Type roots
Info 29   [00:00:52.000] Finishing updateGraphWorker: Project: /a/b/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 30   [00:00:53.000] Project '/a/b/tsconfig.json' (Configured)
Info 31   [00:00:54.000] 	Files (1)
	/a/b/app.ts Text-1 "let x = 1;"


	app.ts
	  Matched by default include pattern '**/*'

Info 32   [00:00:55.000] -----------------------------------------------
Info 33   [00:00:56.000] Project '/a/c/tsconfig.json' (Configured)
Info 33   [00:00:57.000] 	Files (2)

Info 33   [00:00:58.000] -----------------------------------------------
Info 33   [00:00:59.000] Project '/a/b/tsconfig.json' (Configured)
Info 33   [00:01:00.000] 	Files (1)

Info 33   [00:01:01.000] -----------------------------------------------
Info 33   [00:01:02.000] Open files: 
Info 33   [00:01:03.000] 	FileName: /a/c/f.ts ProjectRootPath: undefined
Info 33   [00:01:04.000] 		Projects: /a/c/tsconfig.json
Info 33   [00:01:05.000] 	FileName: /a/b/app.ts ProjectRootPath: undefined
Info 33   [00:01:06.000] 		Projects: /a/c/tsconfig.json,/a/b/tsconfig.json
Configured project: /a/c/tsconfig.json hasOpenRef:: true isClosed: false
Configured project: /a/b/tsconfig.json hasOpenRef:: true isClosed: false
Info 33   [00:01:07.000] FileWatcher:: Added:: WatchInfo: /a/c/f.ts 500 undefined WatchType: Closed Script info
Info 34   [00:01:08.000] Project '/a/c/tsconfig.json' (Configured)
Info 34   [00:01:09.000] 	Files (2)

Info 34   [00:01:10.000] -----------------------------------------------
Info 34   [00:01:11.000] Project '/a/b/tsconfig.json' (Configured)
Info 34   [00:01:12.000] 	Files (1)

Info 34   [00:01:13.000] -----------------------------------------------
Info 34   [00:01:14.000] Open files: 
Info 34   [00:01:15.000] 	FileName: /a/b/app.ts ProjectRootPath: undefined
Info 34   [00:01:16.000] 		Projects: /a/c/tsconfig.json,/a/b/tsconfig.json
Configured project: /a/c/tsconfig.json hasOpenRef:: false isClosed: false
Configured project: /a/b/tsconfig.json hasOpenRef:: true isClosed: false
Info 34   [00:01:17.000] FileWatcher:: Added:: WatchInfo: /a/b/app.ts 500 undefined WatchType: Closed Script info
Info 35   [00:01:18.000] Project '/a/c/tsconfig.json' (Configured)
Info 35   [00:01:19.000] 	Files (2)

Info 35   [00:01:20.000] -----------------------------------------------
Info 35   [00:01:21.000] Project '/a/b/tsconfig.json' (Configured)
Info 35   [00:01:22.000] 	Files (1)

Info 35   [00:01:23.000] -----------------------------------------------
Info 35   [00:01:24.000] Open files: 
Configured project: /a/c/tsconfig.json hasOpenRef:: false isClosed: false
Configured project: /a/b/tsconfig.json hasOpenRef:: false isClosed: false
Info 35   [00:01:25.000] FileWatcher:: Close:: WatchInfo: /a/c/f.ts 500 undefined WatchType: Closed Script info
Info 36   [00:01:26.000] Search path: /a/c
Info 37   [00:01:27.000] For info: /a/c/f.ts :: Config file name: /a/c/tsconfig.json
Info 38   [00:01:28.000] `remove Project::
Info 39   [00:01:29.000] Project '/a/b/tsconfig.json' (Configured)
Info 40   [00:01:30.000] 	Files (1)
	/a/b/app.ts


	app.ts
	  Matched by default include pattern '**/*'

Info 41   [00:01:31.000] -----------------------------------------------
Info 42   [00:01:32.000] DirectoryWatcher:: Close:: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Info 43   [00:01:33.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Info 44   [00:01:34.000] FileWatcher:: Close:: WatchInfo: /a/b/tsconfig.json 2000 undefined Project: /a/b/tsconfig.json WatchType: Config file
Info 45   [00:01:35.000] DirectoryWatcher:: Close:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/tsconfig.json WatchType: Type roots
Info 46   [00:01:36.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/tsconfig.json WatchType: Type roots
Info 47   [00:01:37.000] FileWatcher:: Close:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /a/b/tsconfig.json WatchType: Missing file
Info 48   [00:01:38.000] Project '/a/c/tsconfig.json' (Configured)
Info 48   [00:01:39.000] 	Files (2)

Info 48   [00:01:40.000] -----------------------------------------------
Info 48   [00:01:41.000] Open files: 
Info 48   [00:01:42.000] 	FileName: /a/c/f.ts ProjectRootPath: undefined
Info 48   [00:01:43.000] 		Projects: /a/c/tsconfig.json
Configured project: /a/c/tsconfig.json hasOpenRef:: true isClosed: false