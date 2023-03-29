currentDirectory:: / useCaseSensitiveFileNames: false
Info 0    [00:00:13.000] Provided types map file "/typesMap.json" doesn't exist
Creating project service
//// [/a/main.ts]
let x = 1

//// [/a/main.js]
var y = 1

//// [/main.js]
var y = 1

//// [/a/tsconfig.json]
{"compilerOptions":{"allowJs":true}}


Info 1    [00:00:14.000] reload projects.
Info 2    [00:00:15.000] Before ensureProjectForOpenFiles:
Info 3    [00:00:16.000] Open files: 
Info 3    [00:00:17.000] After ensureProjectForOpenFiles:
Info 4    [00:00:18.000] Open files: 
Info 4    [00:00:19.000] Host file extension mappings updated
Info 5    [00:00:20.000] Search path: /a
Info 6    [00:00:21.000] For info: /a/main.ts :: Config file name: /a/tsconfig.json
Info 7    [00:00:22.000] Creating configuration project /a/tsconfig.json
Info 8    [00:00:23.000] FileWatcher:: Added:: WatchInfo: /a/tsconfig.json 2000 undefined Project: /a/tsconfig.json WatchType: Config file
Info 9    [00:00:24.000] Config: /a/tsconfig.json : {
 "rootNames": [
  "/a/main.ts"
 ],
 "options": {
  "allowJs": true,
  "configFilePath": "/a/tsconfig.json"
 }
}
Info 10   [00:00:25.000] DirectoryWatcher:: Added:: WatchInfo: /a 1 undefined Config: /a/tsconfig.json WatchType: Wild card directory
Info 11   [00:00:26.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a 1 undefined Config: /a/tsconfig.json WatchType: Wild card directory
Info 12   [00:00:27.000] Starting updateGraphWorker: Project: /a/tsconfig.json
Info 13   [00:00:28.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /a/tsconfig.json WatchType: Missing file
Info 14   [00:00:29.000] DirectoryWatcher:: Added:: WatchInfo: /a/node_modules/@types 1 undefined Project: /a/tsconfig.json WatchType: Type roots
Info 15   [00:00:30.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/node_modules/@types 1 undefined Project: /a/tsconfig.json WatchType: Type roots
Info 16   [00:00:31.000] Finishing updateGraphWorker: Project: /a/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 17   [00:00:32.000] Project '/a/tsconfig.json' (Configured)
Info 18   [00:00:33.000] 	Files (1)
	/a/main.ts SVC-1-0 "let x = 1"


	main.ts
	  Matched by default include pattern '**/*'

Info 19   [00:00:34.000] -----------------------------------------------
Info 20   [00:00:35.000] Project '/a/tsconfig.json' (Configured)
Info 20   [00:00:36.000] 	Files (1)

Info 20   [00:00:37.000] -----------------------------------------------
Info 20   [00:00:38.000] Open files: 
Info 20   [00:00:39.000] 	FileName: /a/main.ts ProjectRootPath: undefined
Info 20   [00:00:40.000] 		Projects: /a/tsconfig.json
Info 20   [00:00:41.000] FileWatcher:: Added:: WatchInfo: /a/main.ts 500 undefined WatchType: Closed Script info
Info 21   [00:00:42.000] Project '/a/tsconfig.json' (Configured)
Info 21   [00:00:43.000] 	Files (1)

Info 21   [00:00:44.000] -----------------------------------------------
Info 21   [00:00:45.000] Open files: 
Info 21   [00:00:46.000] Search path: /a
Info 22   [00:00:47.000] For info: /a/main.js :: Config file name: /a/tsconfig.json
Info 23   [00:00:48.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 24   [00:00:49.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /dev/null/inferredProject1* WatchType: Missing file
Info 25   [00:00:50.000] DirectoryWatcher:: Added:: WatchInfo: /a/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 26   [00:00:51.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 27   [00:00:52.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 28   [00:00:53.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 29   [00:00:54.000] 	Files (1)
	/a/main.js SVC-1-0 "var y = 1"


	main.js
	  Root file specified for compilation

Info 30   [00:00:55.000] -----------------------------------------------
Info 31   [00:00:56.000] Project '/a/tsconfig.json' (Configured)
Info 31   [00:00:57.000] 	Files (1)

Info 31   [00:00:58.000] -----------------------------------------------
Info 31   [00:00:59.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 31   [00:01:00.000] 	Files (1)

Info 31   [00:01:01.000] -----------------------------------------------
Info 31   [00:01:02.000] Open files: 
Info 31   [00:01:03.000] 	FileName: /a/main.js ProjectRootPath: undefined
Info 31   [00:01:04.000] 		Projects: /dev/null/inferredProject1*
Info 31   [00:01:05.000] DirectoryWatcher:: Close:: WatchInfo: /a/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 32   [00:01:06.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /a/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 33   [00:01:07.000] FileWatcher:: Added:: WatchInfo: /a/main.js 500 undefined WatchType: Closed Script info
Info 34   [00:01:08.000] Project '/a/tsconfig.json' (Configured)
Info 34   [00:01:09.000] 	Files (1)

Info 34   [00:01:10.000] -----------------------------------------------
Info 34   [00:01:11.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 34   [00:01:12.000] 	Files (1)

Info 34   [00:01:13.000] -----------------------------------------------
Info 34   [00:01:14.000] Open files: 
Info 34   [00:01:15.000] Search path: /
Info 35   [00:01:16.000] For info: /main.js :: No config files found.
Info 36   [00:01:17.000] Starting updateGraphWorker: Project: /dev/null/inferredProject2*
Info 37   [00:01:18.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /dev/null/inferredProject2* WatchType: Missing file
Info 38   [00:01:19.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject2* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 39   [00:01:20.000] Project '/dev/null/inferredProject2*' (Inferred)
Info 40   [00:01:21.000] 	Files (1)
	/main.js SVC-1-0 "var y = 1"


	main.js
	  Root file specified for compilation

Info 41   [00:01:22.000] -----------------------------------------------
Info 42   [00:01:23.000] `remove Project::
Info 43   [00:01:24.000] Project '/a/tsconfig.json' (Configured)
Info 44   [00:01:25.000] 	Files (1)
	/a/main.ts


	main.ts
	  Matched by default include pattern '**/*'

Info 45   [00:01:26.000] -----------------------------------------------
Info 46   [00:01:27.000] DirectoryWatcher:: Close:: WatchInfo: /a 1 undefined Config: /a/tsconfig.json WatchType: Wild card directory
Info 47   [00:01:28.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /a 1 undefined Config: /a/tsconfig.json WatchType: Wild card directory
Info 48   [00:01:29.000] FileWatcher:: Close:: WatchInfo: /a/tsconfig.json 2000 undefined Project: /a/tsconfig.json WatchType: Config file
Info 49   [00:01:30.000] DirectoryWatcher:: Close:: WatchInfo: /a/node_modules/@types 1 undefined Project: /a/tsconfig.json WatchType: Type roots
Info 50   [00:01:31.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /a/node_modules/@types 1 undefined Project: /a/tsconfig.json WatchType: Type roots
Info 51   [00:01:32.000] FileWatcher:: Close:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /a/tsconfig.json WatchType: Missing file
Info 52   [00:01:33.000] `remove Project::
Info 53   [00:01:34.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 54   [00:01:35.000] 	Files (1)
	/a/main.js


	main.js
	  Root file specified for compilation

Info 55   [00:01:36.000] -----------------------------------------------
Info 56   [00:01:37.000] FileWatcher:: Close:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /dev/null/inferredProject1* WatchType: Missing file
Info 57   [00:01:38.000] FileWatcher:: Close:: WatchInfo: /a/main.ts 500 undefined WatchType: Closed Script info
Info 58   [00:01:39.000] FileWatcher:: Close:: WatchInfo: /a/main.js 500 undefined WatchType: Closed Script info
Info 59   [00:01:40.000] Project '/dev/null/inferredProject2*' (Inferred)
Info 59   [00:01:41.000] 	Files (1)

Info 59   [00:01:42.000] -----------------------------------------------
Info 59   [00:01:43.000] Open files: 
Info 59   [00:01:44.000] 	FileName: /main.js ProjectRootPath: undefined
Info 59   [00:01:45.000] 		Projects: /dev/null/inferredProject2*