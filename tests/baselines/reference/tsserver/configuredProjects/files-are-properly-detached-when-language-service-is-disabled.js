currentDirectory:: / useCaseSensitiveFileNames: false
Info 0    [00:00:13.000] Provided types map file "/typesMap.json" doesn't exist
Creating project service
//// [/a/app.js]
var x = 1

//// [/a/largefile.js]


//// [/a/lib.js]
var x = 1

//// [/a/tsconfig.json]
{"compilerOptions":{"allowJs":true}}


Info 1    [00:00:14.000] Search path: /a
Info 2    [00:00:15.000] For info: /a/app.js :: Config file name: /a/tsconfig.json
Info 3    [00:00:16.000] Creating configuration project /a/tsconfig.json
Info 4    [00:00:17.000] FileWatcher:: Added:: WatchInfo: /a/tsconfig.json 2000 undefined Project: /a/tsconfig.json WatchType: Config file
Info 5    [00:00:18.000] Config: /a/tsconfig.json : {
 "rootNames": [
  "/a/app.js",
  "/a/largefile.js",
  "/a/lib.js"
 ],
 "options": {
  "allowJs": true,
  "configFilePath": "/a/tsconfig.json"
 }
}
Info 6    [00:00:19.000] Non TS file size exceeded limit (20971530). Largest files: /a/largefile.js:20971521, /a/app.js:9, /a/lib.js:9
Info 7    [00:00:20.000] FileWatcher:: Added:: WatchInfo: /a/largefile.js 500 undefined WatchType: Closed Script info
Info 8    [00:00:21.000] FileWatcher:: Added:: WatchInfo: /a/lib.js 500 undefined WatchType: Closed Script info
Info 9    [00:00:22.000] Starting updateGraphWorker: Project: /a/tsconfig.json
Info 10   [00:00:23.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /a/tsconfig.json WatchType: Missing file
Info 11   [00:00:24.000] Finishing updateGraphWorker: Project: /a/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 12   [00:00:25.000] Project '/a/tsconfig.json' (Configured)
Info 13   [00:00:26.000] 	Files (1)
	/a/app.js SVC-1-0 "var x = 1"


	app.js
	  Matched by default include pattern '**/*'

Info 14   [00:00:27.000] -----------------------------------------------
Info 15   [00:00:28.000] Project '/a/tsconfig.json' (Configured)
Info 15   [00:00:29.000] 	Files (1)

Info 15   [00:00:30.000] -----------------------------------------------
Info 15   [00:00:31.000] Open files: 
Info 15   [00:00:32.000] 	FileName: /a/app.js ProjectRootPath: undefined
Info 15   [00:00:33.000] 		Projects: /a/tsconfig.json
Configured project: /a/tsconfig.json hasOpenRef:: true isClosed: false
Info 15   [00:00:34.000] FileWatcher:: Added:: WatchInfo: /a/app.js 500 undefined WatchType: Closed Script info
Info 16   [00:00:35.000] Project '/a/tsconfig.json' (Configured)
Info 16   [00:00:36.000] 	Files (1)

Info 16   [00:00:37.000] -----------------------------------------------
Info 16   [00:00:38.000] Open files: 
Configured project: /a/tsconfig.json hasOpenRef:: false isClosed: false
Containing projects for /a/app.js:: /a/tsconfig.json
Containing projects for /a/largefile.js:: /a/tsconfig.json
Containing projects for /a/lib.js:: /a/tsconfig.json
Info 16   [00:00:41.000] Search path: /
Info 17   [00:00:42.000] For info: /aa.js :: No config files found.
Info 18   [00:00:43.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 19   [00:00:44.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /dev/null/inferredProject1* WatchType: Missing file
Info 20   [00:00:45.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 21   [00:00:46.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 22   [00:00:47.000] 	Files (1)
	/aa.js SVC-1-0 "var x = 1"


	aa.js
	  Root file specified for compilation

Info 23   [00:00:48.000] -----------------------------------------------
Info 24   [00:00:49.000] `remove Project::
Info 25   [00:00:50.000] Project '/a/tsconfig.json' (Configured)
Info 26   [00:00:51.000] 	Files (1)
	/a/app.js


	app.js
	  Matched by default include pattern '**/*'

Info 27   [00:00:52.000] -----------------------------------------------
Info 28   [00:00:53.000] FileWatcher:: Close:: WatchInfo: /a/tsconfig.json 2000 undefined Project: /a/tsconfig.json WatchType: Config file
Info 29   [00:00:54.000] FileWatcher:: Close:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /a/tsconfig.json WatchType: Missing file
Info 30   [00:00:55.000] FileWatcher:: Close:: WatchInfo: /a/app.js 500 undefined WatchType: Closed Script info
Info 31   [00:00:56.000] FileWatcher:: Close:: WatchInfo: /a/largefile.js 500 undefined WatchType: Closed Script info
Info 32   [00:00:57.000] FileWatcher:: Close:: WatchInfo: /a/lib.js 500 undefined WatchType: Closed Script info
Info 33   [00:00:58.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 33   [00:00:59.000] 	Files (1)

Info 33   [00:01:00.000] -----------------------------------------------
Info 33   [00:01:01.000] Open files: 
Info 33   [00:01:02.000] 	FileName: /aa.js ProjectRootPath: undefined
Info 33   [00:01:03.000] 		Projects: /dev/null/inferredProject1*