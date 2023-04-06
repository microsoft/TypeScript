currentDirectory:: / useCaseSensitiveFileNames: false
Info 0    [00:00:13.000] Provided types map file "/typesMap.json" doesn't exist
Creating project service
//// [/a/b/f1.ts]
let x = 1;

//// [/a/b/f2.ts]
let y = 2;

//// [/a/b/tsconfig.json]
{"compilerOptions":{}}


Info 1    [00:00:14.000] Search path: /a/b
Info 2    [00:00:15.000] For info: /a/b/f1.ts :: Config file name: /a/b/tsconfig.json
Info 3    [00:00:16.000] Creating configuration project /a/b/tsconfig.json
Info 4    [00:00:17.000] FileWatcher:: Added:: WatchInfo: /a/b/tsconfig.json 2000 undefined Project: /a/b/tsconfig.json WatchType: Config file
Info 5    [00:00:18.000] Config: /a/b/tsconfig.json : {
 "rootNames": [
  "/a/b/f1.ts",
  "/a/b/f2.ts"
 ],
 "options": {
  "configFilePath": "/a/b/tsconfig.json"
 }
}
Info 6    [00:00:19.000] DirectoryWatcher:: Added:: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Info 7    [00:00:20.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Info 8    [00:00:21.000] FileWatcher:: Added:: WatchInfo: /a/b/f2.ts 500 undefined WatchType: Closed Script info
Info 9    [00:00:22.000] Starting updateGraphWorker: Project: /a/b/tsconfig.json
Info 10   [00:00:23.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /a/b/tsconfig.json WatchType: Missing file
Info 11   [00:00:24.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/tsconfig.json WatchType: Type roots
Info 12   [00:00:25.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/tsconfig.json WatchType: Type roots
Info 13   [00:00:26.000] Finishing updateGraphWorker: Project: /a/b/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 14   [00:00:27.000] Project '/a/b/tsconfig.json' (Configured)
Info 15   [00:00:28.000] 	Files (2)
	/a/b/f1.ts SVC-1-0 "let x = 1;"
	/a/b/f2.ts Text-1 "let y = 2;"


	f1.ts
	  Matched by default include pattern '**/*'
	f2.ts
	  Matched by default include pattern '**/*'

Info 16   [00:00:29.000] -----------------------------------------------
Info 17   [00:00:30.000] Project '/a/b/tsconfig.json' (Configured)
Info 17   [00:00:31.000] 	Files (2)

Info 17   [00:00:32.000] -----------------------------------------------
Info 17   [00:00:33.000] Open files: 
Info 17   [00:00:34.000] 	FileName: /a/b/f1.ts ProjectRootPath: undefined
Info 17   [00:00:35.000] 		Projects: /a/b/tsconfig.json
Info 17   [00:00:36.000] FileWatcher:: Close:: WatchInfo: /a/b/f2.ts 500 undefined WatchType: Closed Script info
Info 18   [00:00:37.000] Search path: /a/b
Info 19   [00:00:38.000] For info: /a/b/f2.ts :: Config file name: /a/b/tsconfig.json
Info 20   [00:00:39.000] Project '/a/b/tsconfig.json' (Configured)
Info 20   [00:00:40.000] 	Files (2)

Info 20   [00:00:41.000] -----------------------------------------------
Info 20   [00:00:42.000] Open files: 
Info 20   [00:00:43.000] 	FileName: /a/b/f1.ts ProjectRootPath: undefined
Info 20   [00:00:44.000] 		Projects: /a/b/tsconfig.json
Info 20   [00:00:45.000] 	FileName: /a/b/f2.ts ProjectRootPath: undefined
Info 20   [00:00:46.000] 		Projects: /a/b/tsconfig.json
Info 20   [00:00:48.000] FileWatcher:: Triggered with /a/b/tsconfig.json 2:: WatchInfo: /a/b/tsconfig.json 2000 undefined Project: /a/b/tsconfig.json WatchType: Config file
Info 21   [00:00:49.000] `remove Project::
Info 22   [00:00:50.000] Project '/a/b/tsconfig.json' (Configured)
Info 23   [00:00:51.000] 	Files (2)
	/a/b/f1.ts
	/a/b/f2.ts


	f1.ts
	  Matched by default include pattern '**/*'
	f2.ts
	  Matched by default include pattern '**/*'

Info 24   [00:00:52.000] -----------------------------------------------
Info 25   [00:00:53.000] DirectoryWatcher:: Close:: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Info 26   [00:00:54.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Info 27   [00:00:55.000] FileWatcher:: Close:: WatchInfo: /a/b/tsconfig.json 2000 undefined Project: /a/b/tsconfig.json WatchType: Config file
Info 28   [00:00:56.000] DirectoryWatcher:: Close:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/tsconfig.json WatchType: Type roots
Info 29   [00:00:57.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/tsconfig.json WatchType: Type roots
Info 30   [00:00:58.000] FileWatcher:: Close:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /a/b/tsconfig.json WatchType: Missing file
Info 31   [00:00:59.000] Search path: /a/b
Info 32   [00:01:00.000] For info: /a/b/f1.ts :: No config files found.
Info 33   [00:01:01.000] Search path: /a/b
Info 34   [00:01:02.000] For info: /a/b/f2.ts :: No config files found.
Info 35   [00:01:03.000] Scheduled: *ensureProjectForOpenFiles*
Info 36   [00:01:04.000] Elapsed:: *ms FileWatcher:: Triggered with /a/b/tsconfig.json 2:: WatchInfo: /a/b/tsconfig.json 2000 undefined Project: /a/b/tsconfig.json WatchType: Config file
Before running Timeout callback:: count: 1
1: *ensureProjectForOpenFiles*
//// [/a/b/tsconfig.json] deleted

Info 37   [00:01:05.500] Running: *ensureProjectForOpenFiles*
Info 38   [00:01:06.500] Before ensureProjectForOpenFiles:
Info 39   [00:01:07.500] Open files: 
Info 39   [00:01:08.500] 	FileName: /a/b/f1.ts ProjectRootPath: undefined
Info 39   [00:01:09.500] 		Projects: 
Info 39   [00:01:10.500] 	FileName: /a/b/f2.ts ProjectRootPath: undefined
Info 39   [00:01:11.500] 		Projects: 
Info 39   [00:01:12.500] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 40   [00:01:13.500] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /dev/null/inferredProject1* WatchType: Missing file
Info 41   [00:01:14.500] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 42   [00:01:15.500] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 43   [00:01:16.500] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 44   [00:01:17.500] Project '/dev/null/inferredProject1*' (Inferred)
Info 45   [00:01:18.500] 	Files (1)
	/a/b/f1.ts SVC-1-0 "let x = 1;"


	f1.ts
	  Root file specified for compilation

Info 46   [00:01:19.500] -----------------------------------------------
Info 47   [00:01:20.500] Starting updateGraphWorker: Project: /dev/null/inferredProject2*
Info 48   [00:01:21.500] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /dev/null/inferredProject2* WatchType: Missing file
Info 49   [00:01:22.500] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /dev/null/inferredProject2* WatchType: Type roots
Info 50   [00:01:23.500] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /dev/null/inferredProject2* WatchType: Type roots
Info 51   [00:01:24.500] Finishing updateGraphWorker: Project: /dev/null/inferredProject2* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 52   [00:01:25.500] Project '/dev/null/inferredProject2*' (Inferred)
Info 53   [00:01:26.500] 	Files (1)
	/a/b/f2.ts Text-1 "let y = 2;"


	f2.ts
	  Root file specified for compilation

Info 54   [00:01:27.500] -----------------------------------------------
Info 55   [00:01:28.500] After ensureProjectForOpenFiles:
Info 56   [00:01:29.500] Project '/dev/null/inferredProject1*' (Inferred)
Info 56   [00:01:30.500] 	Files (1)

Info 56   [00:01:31.500] -----------------------------------------------
Info 56   [00:01:32.500] Project '/dev/null/inferredProject2*' (Inferred)
Info 56   [00:01:33.500] 	Files (1)

Info 56   [00:01:34.500] -----------------------------------------------
Info 56   [00:01:35.500] Open files: 
Info 56   [00:01:36.500] 	FileName: /a/b/f1.ts ProjectRootPath: undefined
Info 56   [00:01:37.500] 		Projects: /dev/null/inferredProject1*
Info 56   [00:01:38.500] 	FileName: /a/b/f2.ts ProjectRootPath: undefined
Info 56   [00:01:39.500] 		Projects: /dev/null/inferredProject2*
After running Timeout callback:: count: 0

PolledWatches::
/a/lib/lib.d.ts: *new*
  {"pollingInterval":500}
/a/b/node_modules/@types: *new*
  {"pollingInterval":500}
