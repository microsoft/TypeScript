currentDirectory:: / useCaseSensitiveFileNames: false
Info 0    [00:00:21.000] Provided types map file "/typesMap.json" doesn't exist
Creating project service
//// [/a/b/f1.ts]
let x =1;

//// [/a/c/f2.ts]
let y =1;

//// [/a/d/f3.ts]
let z =1;

//// [/a/b/tsconfig.json]
{"compilerOptions":{},"files":["f1.ts"]}

//// [/a/c/tsconfig.json]
{"compilerOptions":{},"files":["f2.ts"]}


Info 1    [00:00:22.000] Creating configuration project /a/b/tsconfig.json
Info 2    [00:00:23.000] FileWatcher:: Added:: WatchInfo: /a/b/tsconfig.json 2000 undefined Project: /a/b/tsconfig.json WatchType: Config file
Info 3    [00:00:24.000] Config: /a/b/tsconfig.json : {
 "rootNames": [
  "/a/b/f1.ts"
 ],
 "options": {
  "configFilePath": "/a/b/tsconfig.json"
 }
}
Info 4    [00:00:25.000] FileWatcher:: Added:: WatchInfo: /a/b/f1.ts 500 undefined WatchType: Closed Script info
Info 5    [00:00:26.000] Starting updateGraphWorker: Project: /a/b/tsconfig.json
Info 6    [00:00:27.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /a/b/tsconfig.json WatchType: Missing file
Info 7    [00:00:28.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/tsconfig.json WatchType: Type roots
Info 8    [00:00:29.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/tsconfig.json WatchType: Type roots
Info 9    [00:00:30.000] Finishing updateGraphWorker: Project: /a/b/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 10   [00:00:31.000] Project '/a/b/tsconfig.json' (Configured)
Info 11   [00:00:32.000] 	Files (1)
	/a/b/f1.ts Text-1 "let x =1;"


	f1.ts
	  Part of 'files' list in tsconfig.json

Info 12   [00:00:33.000] -----------------------------------------------
Info 13   [00:00:34.000] Creating configuration project /a/c/tsconfig.json
Info 14   [00:00:35.000] FileWatcher:: Added:: WatchInfo: /a/c/tsconfig.json 2000 undefined Project: /a/c/tsconfig.json WatchType: Config file
Info 15   [00:00:36.000] Config: /a/c/tsconfig.json : {
 "rootNames": [
  "/a/c/f2.ts"
 ],
 "options": {
  "configFilePath": "/a/c/tsconfig.json"
 }
}
Info 16   [00:00:37.000] FileWatcher:: Added:: WatchInfo: /a/c/f2.ts 500 undefined WatchType: Closed Script info
Info 17   [00:00:38.000] Starting updateGraphWorker: Project: /a/c/tsconfig.json
Info 18   [00:00:39.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /a/c/tsconfig.json WatchType: Missing file
Info 19   [00:00:40.000] DirectoryWatcher:: Added:: WatchInfo: /a/c/node_modules/@types 1 undefined Project: /a/c/tsconfig.json WatchType: Type roots
Info 20   [00:00:41.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/c/node_modules/@types 1 undefined Project: /a/c/tsconfig.json WatchType: Type roots
Info 21   [00:00:42.000] Finishing updateGraphWorker: Project: /a/c/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 22   [00:00:43.000] Project '/a/c/tsconfig.json' (Configured)
Info 23   [00:00:44.000] 	Files (1)
	/a/c/f2.ts Text-1 "let y =1;"


	f2.ts
	  Part of 'files' list in tsconfig.json

Info 24   [00:00:45.000] -----------------------------------------------
Info 25   [00:00:46.000] FileWatcher:: Close:: WatchInfo: /a/b/f1.ts 500 undefined WatchType: Closed Script info
Info 26   [00:00:47.000] Search path: /a/b
Info 27   [00:00:48.000] For info: /a/b/f1.ts :: Config file name: /a/b/tsconfig.json
Info 28   [00:00:49.000] Project '/a/b/tsconfig.json' (Configured)
Info 28   [00:00:50.000] 	Files (1)

Info 28   [00:00:51.000] -----------------------------------------------
Info 28   [00:00:52.000] Project '/a/c/tsconfig.json' (Configured)
Info 28   [00:00:53.000] 	Files (1)

Info 28   [00:00:54.000] -----------------------------------------------
Info 28   [00:00:55.000] Open files: 
Info 28   [00:00:56.000] 	FileName: /a/b/f1.ts ProjectRootPath: undefined
Info 28   [00:00:57.000] 		Projects: /a/b/tsconfig.json
Info 28   [00:00:58.000] Search path: /a/d
Info 29   [00:00:59.000] For info: /a/d/f3.ts :: No config files found.
Info 30   [00:01:00.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 31   [00:01:01.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /dev/null/inferredProject1* WatchType: Missing file
Info 32   [00:01:02.000] DirectoryWatcher:: Added:: WatchInfo: /a/d/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 33   [00:01:03.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/d/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 34   [00:01:04.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 35   [00:01:05.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 36   [00:01:06.000] 	Files (1)
	/a/d/f3.ts SVC-1-0 "let z =1;"


	f3.ts
	  Root file specified for compilation

Info 37   [00:01:07.000] -----------------------------------------------
Info 38   [00:01:08.000] Project '/a/b/tsconfig.json' (Configured)
Info 38   [00:01:09.000] 	Files (1)

Info 38   [00:01:10.000] -----------------------------------------------
Info 38   [00:01:11.000] Project '/a/c/tsconfig.json' (Configured)
Info 38   [00:01:12.000] 	Files (1)

Info 38   [00:01:13.000] -----------------------------------------------
Info 38   [00:01:14.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 38   [00:01:15.000] 	Files (1)

Info 38   [00:01:16.000] -----------------------------------------------
Info 38   [00:01:17.000] Open files: 
Info 38   [00:01:18.000] 	FileName: /a/b/f1.ts ProjectRootPath: undefined
Info 38   [00:01:19.000] 		Projects: /a/b/tsconfig.json
Info 38   [00:01:20.000] 	FileName: /a/d/f3.ts ProjectRootPath: undefined
Info 38   [00:01:21.000] 		Projects: /dev/null/inferredProject1*
Inferred project: /dev/null/inferredProject1* isOrphan:: false isClosed: false
Info 38   [00:01:22.000] `remove Project::
Info 39   [00:01:23.000] Project '/a/c/tsconfig.json' (Configured)
Info 40   [00:01:24.000] 	Files (1)
	/a/c/f2.ts


	f2.ts
	  Part of 'files' list in tsconfig.json

Info 41   [00:01:25.000] -----------------------------------------------
Info 42   [00:01:26.000] FileWatcher:: Close:: WatchInfo: /a/c/tsconfig.json 2000 undefined Project: /a/c/tsconfig.json WatchType: Config file
Info 43   [00:01:27.000] DirectoryWatcher:: Close:: WatchInfo: /a/c/node_modules/@types 1 undefined Project: /a/c/tsconfig.json WatchType: Type roots
Info 44   [00:01:28.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /a/c/node_modules/@types 1 undefined Project: /a/c/tsconfig.json WatchType: Type roots
Info 45   [00:01:29.000] FileWatcher:: Close:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /a/c/tsconfig.json WatchType: Missing file
Inferred project: /dev/null/inferredProject1* isOrphan:: false isClosed: false
Info 46   [00:01:30.000] FileWatcher:: Added:: WatchInfo: /a/d/f3.ts 500 undefined WatchType: Closed Script info
Info 47   [00:01:31.000] Project '/a/b/tsconfig.json' (Configured)
Info 47   [00:01:32.000] 	Files (1)

Info 47   [00:01:33.000] -----------------------------------------------
Info 47   [00:01:34.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 47   [00:01:35.000] 	Files (1)

Info 47   [00:01:36.000] -----------------------------------------------
Info 47   [00:01:37.000] Open files: 
Info 47   [00:01:38.000] 	FileName: /a/b/f1.ts ProjectRootPath: undefined
Info 47   [00:01:39.000] 		Projects: /a/b/tsconfig.json
Inferred project: /dev/null/inferredProject1* isOrphan:: true isClosed: false
Info 47   [00:01:40.000] FileWatcher:: Added:: WatchInfo: /a/b/f1.ts 500 undefined WatchType: Closed Script info
Info 48   [00:01:41.000] Project '/a/b/tsconfig.json' (Configured)
Info 48   [00:01:42.000] 	Files (1)

Info 48   [00:01:43.000] -----------------------------------------------
Info 48   [00:01:44.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 48   [00:01:45.000] 	Files (1)

Info 48   [00:01:46.000] -----------------------------------------------
Info 48   [00:01:47.000] Open files: 
Inferred project: /dev/null/inferredProject1* isOrphan:: true isClosed: false
Info 48   [00:01:48.000] FileWatcher:: Close:: WatchInfo: /a/c/f2.ts 500 undefined WatchType: Closed Script info
Info 49   [00:01:49.000] Search path: /a/c
Info 50   [00:01:50.000] For info: /a/c/f2.ts :: Config file name: /a/c/tsconfig.json
Info 51   [00:01:51.000] Creating configuration project /a/c/tsconfig.json
Info 52   [00:01:52.000] FileWatcher:: Added:: WatchInfo: /a/c/tsconfig.json 2000 undefined Project: /a/c/tsconfig.json WatchType: Config file
Info 53   [00:01:53.000] Config: /a/c/tsconfig.json : {
 "rootNames": [
  "/a/c/f2.ts"
 ],
 "options": {
  "configFilePath": "/a/c/tsconfig.json"
 }
}
Info 54   [00:01:54.000] Starting updateGraphWorker: Project: /a/c/tsconfig.json
Info 55   [00:01:55.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /a/c/tsconfig.json WatchType: Missing file
Info 56   [00:01:56.000] DirectoryWatcher:: Added:: WatchInfo: /a/c/node_modules/@types 1 undefined Project: /a/c/tsconfig.json WatchType: Type roots
Info 57   [00:01:57.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/c/node_modules/@types 1 undefined Project: /a/c/tsconfig.json WatchType: Type roots
Info 58   [00:01:58.000] Finishing updateGraphWorker: Project: /a/c/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 59   [00:01:59.000] Project '/a/c/tsconfig.json' (Configured)
Info 60   [00:02:00.000] 	Files (1)
	/a/c/f2.ts Text-1 "let y =1;"


	f2.ts
	  Part of 'files' list in tsconfig.json

Info 61   [00:02:01.000] -----------------------------------------------
Info 62   [00:02:02.000] `remove Project::
Info 63   [00:02:03.000] Project '/a/b/tsconfig.json' (Configured)
Info 64   [00:02:04.000] 	Files (1)
	/a/b/f1.ts


	f1.ts
	  Part of 'files' list in tsconfig.json

Info 65   [00:02:05.000] -----------------------------------------------
Info 66   [00:02:06.000] FileWatcher:: Close:: WatchInfo: /a/b/tsconfig.json 2000 undefined Project: /a/b/tsconfig.json WatchType: Config file
Info 67   [00:02:07.000] DirectoryWatcher:: Close:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/tsconfig.json WatchType: Type roots
Info 68   [00:02:08.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/tsconfig.json WatchType: Type roots
Info 69   [00:02:09.000] FileWatcher:: Close:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /a/b/tsconfig.json WatchType: Missing file
Info 70   [00:02:10.000] `remove Project::
Info 71   [00:02:11.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 72   [00:02:12.000] 	Files (1)
	/a/d/f3.ts


	f3.ts
	  Root file specified for compilation

Info 73   [00:02:13.000] -----------------------------------------------
Info 74   [00:02:14.000] DirectoryWatcher:: Close:: WatchInfo: /a/d/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 75   [00:02:15.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /a/d/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 76   [00:02:16.000] FileWatcher:: Close:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /dev/null/inferredProject1* WatchType: Missing file
Info 77   [00:02:17.000] FileWatcher:: Close:: WatchInfo: /a/b/f1.ts 500 undefined WatchType: Closed Script info
Info 78   [00:02:18.000] FileWatcher:: Close:: WatchInfo: /a/d/f3.ts 500 undefined WatchType: Closed Script info
Info 79   [00:02:19.000] Project '/a/c/tsconfig.json' (Configured)
Info 79   [00:02:20.000] 	Files (1)

Info 79   [00:02:21.000] -----------------------------------------------
Info 79   [00:02:22.000] Open files: 
Info 79   [00:02:23.000] 	FileName: /a/c/f2.ts ProjectRootPath: undefined
Info 79   [00:02:24.000] 		Projects: /a/c/tsconfig.json