currentDirectory:: / useCaseSensitiveFileNames: false
Info 0    [00:00:17.000] Provided types map file "/typesMap.json" doesn't exist
Creating project service
//// [/a/b/f1.ts]

                export * from "../c/f2";
                export * from "../d/f3";

//// [/a/c/f2.ts]
export let x = 1;

//// [/a/d/f3.ts]
export let y = 1;


Info 1    [00:00:18.000] Search path: /a/c
Info 2    [00:00:19.000] For info: /a/c/f2.ts :: No config files found.
Info 3    [00:00:20.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 4    [00:00:21.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /dev/null/inferredProject1* WatchType: Missing file
Info 5    [00:00:22.000] DirectoryWatcher:: Added:: WatchInfo: /a/c/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 6    [00:00:23.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/c/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 7    [00:00:24.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 8    [00:00:25.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 9    [00:00:26.000] 	Files (1)
	/a/c/f2.ts SVC-1-0 "export let x = 1;"


	f2.ts
	  Root file specified for compilation

Info 10   [00:00:27.000] -----------------------------------------------
Info 11   [00:00:28.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 11   [00:00:29.000] 	Files (1)

Info 11   [00:00:30.000] -----------------------------------------------
Info 11   [00:00:31.000] Open files: 
Info 11   [00:00:32.000] 	FileName: /a/c/f2.ts ProjectRootPath: undefined
Info 11   [00:00:33.000] 		Projects: /dev/null/inferredProject1*
Inferred project: /dev/null/inferredProject1* isOrphan:: false isClosed: false
Info 11   [00:00:34.000] Search path: /a/d
Info 12   [00:00:35.000] For info: /a/d/f3.ts :: No config files found.
Info 13   [00:00:36.000] Starting updateGraphWorker: Project: /dev/null/inferredProject2*
Info 14   [00:00:37.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /dev/null/inferredProject2* WatchType: Missing file
Info 15   [00:00:38.000] DirectoryWatcher:: Added:: WatchInfo: /a/d/node_modules/@types 1 undefined Project: /dev/null/inferredProject2* WatchType: Type roots
Info 16   [00:00:39.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/d/node_modules/@types 1 undefined Project: /dev/null/inferredProject2* WatchType: Type roots
Info 17   [00:00:40.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject2* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 18   [00:00:41.000] Project '/dev/null/inferredProject2*' (Inferred)
Info 19   [00:00:42.000] 	Files (1)
	/a/d/f3.ts SVC-1-0 "export let y = 1;"


	f3.ts
	  Root file specified for compilation

Info 20   [00:00:43.000] -----------------------------------------------
Info 21   [00:00:44.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 21   [00:00:45.000] 	Files (1)

Info 21   [00:00:46.000] -----------------------------------------------
Info 21   [00:00:47.000] Project '/dev/null/inferredProject2*' (Inferred)
Info 21   [00:00:48.000] 	Files (1)

Info 21   [00:00:49.000] -----------------------------------------------
Info 21   [00:00:50.000] Open files: 
Info 21   [00:00:51.000] 	FileName: /a/c/f2.ts ProjectRootPath: undefined
Info 21   [00:00:52.000] 		Projects: /dev/null/inferredProject1*
Info 21   [00:00:53.000] 	FileName: /a/d/f3.ts ProjectRootPath: undefined
Info 21   [00:00:54.000] 		Projects: /dev/null/inferredProject2*
Inferred project: /dev/null/inferredProject1* isOrphan:: false isClosed: false
Inferred project: /dev/null/inferredProject2* isOrphan:: false isClosed: false
Info 21   [00:00:55.000] Search path: /a/b
Info 22   [00:00:56.000] For info: /a/b/f1.ts :: No config files found.
Info 23   [00:00:57.000] Starting updateGraphWorker: Project: /dev/null/inferredProject3*
Info 24   [00:00:58.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /dev/null/inferredProject3* WatchType: Missing file
Info 25   [00:00:59.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /dev/null/inferredProject3* WatchType: Type roots
Info 26   [00:01:00.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /dev/null/inferredProject3* WatchType: Type roots
Info 27   [00:01:01.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject3* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 28   [00:01:02.000] Project '/dev/null/inferredProject3*' (Inferred)
Info 29   [00:01:03.000] 	Files (3)
	/a/c/f2.ts SVC-1-0 "export let x = 1;"
	/a/d/f3.ts SVC-1-0 "export let y = 1;"
	/a/b/f1.ts SVC-1-0 "\n                export * from \"../c/f2\";\n                export * from \"../d/f3\";"


	../c/f2.ts
	  Imported via "../c/f2" from file 'f1.ts'
	../d/f3.ts
	  Imported via "../d/f3" from file 'f1.ts'
	f1.ts
	  Root file specified for compilation

Info 30   [00:01:04.000] -----------------------------------------------
Info 31   [00:01:05.000] `remove Project::
Info 32   [00:01:06.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 33   [00:01:07.000] 	Files (1)
	/a/c/f2.ts


	f2.ts
	  Root file specified for compilation

Info 34   [00:01:08.000] -----------------------------------------------
Info 35   [00:01:09.000] DirectoryWatcher:: Close:: WatchInfo: /a/c/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 36   [00:01:10.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /a/c/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 37   [00:01:11.000] FileWatcher:: Close:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /dev/null/inferredProject1* WatchType: Missing file
Info 38   [00:01:12.000] `remove Project::
Info 39   [00:01:13.000] Project '/dev/null/inferredProject2*' (Inferred)
Info 40   [00:01:14.000] 	Files (1)
	/a/d/f3.ts


	f3.ts
	  Root file specified for compilation

Info 41   [00:01:15.000] -----------------------------------------------
Info 42   [00:01:16.000] DirectoryWatcher:: Close:: WatchInfo: /a/d/node_modules/@types 1 undefined Project: /dev/null/inferredProject2* WatchType: Type roots
Info 43   [00:01:17.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /a/d/node_modules/@types 1 undefined Project: /dev/null/inferredProject2* WatchType: Type roots
Info 44   [00:01:18.000] FileWatcher:: Close:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /dev/null/inferredProject2* WatchType: Missing file
Info 45   [00:01:19.000] Project '/dev/null/inferredProject3*' (Inferred)
Info 45   [00:01:20.000] 	Files (3)

Info 45   [00:01:21.000] -----------------------------------------------
Info 45   [00:01:22.000] Open files: 
Info 45   [00:01:23.000] 	FileName: /a/c/f2.ts ProjectRootPath: undefined
Info 45   [00:01:24.000] 		Projects: /dev/null/inferredProject3*
Info 45   [00:01:25.000] 	FileName: /a/d/f3.ts ProjectRootPath: undefined
Info 45   [00:01:26.000] 		Projects: /dev/null/inferredProject3*
Info 45   [00:01:27.000] 	FileName: /a/b/f1.ts ProjectRootPath: undefined
Info 45   [00:01:28.000] 		Projects: /dev/null/inferredProject3*
Inferred project: /dev/null/inferredProject3* isOrphan:: false isClosed: false
Info 45   [00:01:29.000] Starting updateGraphWorker: Project: /dev/null/inferredProject4*
Info 46   [00:01:30.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /dev/null/inferredProject4* WatchType: Missing file
Info 47   [00:01:31.000] DirectoryWatcher:: Added:: WatchInfo: /a/c/node_modules/@types 1 undefined Project: /dev/null/inferredProject4* WatchType: Type roots
Info 48   [00:01:32.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/c/node_modules/@types 1 undefined Project: /dev/null/inferredProject4* WatchType: Type roots
Info 49   [00:01:33.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject4* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 50   [00:01:34.000] Project '/dev/null/inferredProject4*' (Inferred)
Info 51   [00:01:35.000] 	Files (1)
	/a/c/f2.ts SVC-1-0 "export let x = 1;"


	f2.ts
	  Root file specified for compilation

Info 52   [00:01:36.000] -----------------------------------------------
Info 53   [00:01:37.000] Starting updateGraphWorker: Project: /dev/null/inferredProject5*
Info 54   [00:01:38.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /dev/null/inferredProject5* WatchType: Missing file
Info 55   [00:01:39.000] DirectoryWatcher:: Added:: WatchInfo: /a/d/node_modules/@types 1 undefined Project: /dev/null/inferredProject5* WatchType: Type roots
Info 56   [00:01:40.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/d/node_modules/@types 1 undefined Project: /dev/null/inferredProject5* WatchType: Type roots
Info 57   [00:01:41.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject5* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 58   [00:01:42.000] Project '/dev/null/inferredProject5*' (Inferred)
Info 59   [00:01:43.000] 	Files (1)
	/a/d/f3.ts SVC-1-0 "export let y = 1;"


	f3.ts
	  Root file specified for compilation

Info 60   [00:01:44.000] -----------------------------------------------
Info 61   [00:01:45.000] FileWatcher:: Added:: WatchInfo: /a/b/f1.ts 500 undefined WatchType: Closed Script info
Info 62   [00:01:46.000] Project '/dev/null/inferredProject3*' (Inferred)
Info 62   [00:01:47.000] 	Files (3)

Info 62   [00:01:48.000] -----------------------------------------------
Info 62   [00:01:49.000] Project '/dev/null/inferredProject4*' (Inferred)
Info 62   [00:01:50.000] 	Files (1)

Info 62   [00:01:51.000] -----------------------------------------------
Info 62   [00:01:52.000] Project '/dev/null/inferredProject5*' (Inferred)
Info 62   [00:01:53.000] 	Files (1)

Info 62   [00:01:54.000] -----------------------------------------------
Info 62   [00:01:55.000] Open files: 
Info 62   [00:01:56.000] 	FileName: /a/c/f2.ts ProjectRootPath: undefined
Info 62   [00:01:57.000] 		Projects: /dev/null/inferredProject4*,/dev/null/inferredProject3*
Info 62   [00:01:58.000] 	FileName: /a/d/f3.ts ProjectRootPath: undefined
Info 62   [00:01:59.000] 		Projects: /dev/null/inferredProject5*,/dev/null/inferredProject3*
Inferred project: /dev/null/inferredProject3* isOrphan:: true isClosed: false
Inferred project: /dev/null/inferredProject4* isOrphan:: false isClosed: false
Inferred project: /dev/null/inferredProject5* isOrphan:: false isClosed: false
Info 62   [00:02:00.000] FileWatcher:: Added:: WatchInfo: /a/d/f3.ts 500 undefined WatchType: Closed Script info
Info 63   [00:02:01.000] Project '/dev/null/inferredProject3*' (Inferred)
Info 63   [00:02:02.000] 	Files (3)

Info 63   [00:02:03.000] -----------------------------------------------
Info 63   [00:02:04.000] Project '/dev/null/inferredProject4*' (Inferred)
Info 63   [00:02:05.000] 	Files (1)

Info 63   [00:02:06.000] -----------------------------------------------
Info 63   [00:02:07.000] Project '/dev/null/inferredProject5*' (Inferred)
Info 63   [00:02:08.000] 	Files (1)

Info 63   [00:02:09.000] -----------------------------------------------
Info 63   [00:02:10.000] Open files: 
Info 63   [00:02:11.000] 	FileName: /a/c/f2.ts ProjectRootPath: undefined
Info 63   [00:02:12.000] 		Projects: /dev/null/inferredProject4*,/dev/null/inferredProject3*
Inferred project: /dev/null/inferredProject3* isOrphan:: true isClosed: false
Inferred project: /dev/null/inferredProject4* isOrphan:: false isClosed: false
Inferred project: /dev/null/inferredProject5* isOrphan:: true isClosed: false
Info 63   [00:02:13.000] FileWatcher:: Close:: WatchInfo: /a/d/f3.ts 500 undefined WatchType: Closed Script info
Info 64   [00:02:14.000] Search path: /a/d
Info 65   [00:02:15.000] For info: /a/d/f3.ts :: No config files found.
Info 66   [00:02:16.000] Starting updateGraphWorker: Project: /dev/null/inferredProject3*
Info 67   [00:02:17.000] FileWatcher:: Close:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /dev/null/inferredProject3* WatchType: Missing file
Info 68   [00:02:18.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject3* Version: 2 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 69   [00:02:19.000] Project '/dev/null/inferredProject3*' (Inferred)
Info 70   [00:02:20.000] 	Files (0)



Info 71   [00:02:21.000] -----------------------------------------------
Info 72   [00:02:22.000] Starting updateGraphWorker: Project: /dev/null/inferredProject5*
Info 73   [00:02:23.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject5* Version: 2 structureChanged: false structureIsReused:: Not Elapsed:: *ms
Info 74   [00:02:24.000] Same program as before
Info 75   [00:02:25.000] `remove Project::
Info 76   [00:02:26.000] Project '/dev/null/inferredProject3*' (Inferred)
Info 77   [00:02:27.000] 	Files (0)



Info 78   [00:02:28.000] -----------------------------------------------
Info 79   [00:02:29.000] DirectoryWatcher:: Close:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /dev/null/inferredProject3* WatchType: Type roots
Info 80   [00:02:30.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /dev/null/inferredProject3* WatchType: Type roots
Info 81   [00:02:31.000] FileWatcher:: Close:: WatchInfo: /a/b/f1.ts 500 undefined WatchType: Closed Script info
Info 82   [00:02:32.000] Project '/dev/null/inferredProject5*' (Inferred)
Info 82   [00:02:33.000] 	Files (1)

Info 82   [00:02:34.000] -----------------------------------------------
Info 82   [00:02:35.000] Project '/dev/null/inferredProject4*' (Inferred)
Info 82   [00:02:36.000] 	Files (1)

Info 82   [00:02:37.000] -----------------------------------------------
Info 82   [00:02:38.000] Open files: 
Info 82   [00:02:39.000] 	FileName: /a/c/f2.ts ProjectRootPath: undefined
Info 82   [00:02:40.000] 		Projects: /dev/null/inferredProject4*
Info 82   [00:02:41.000] 	FileName: /a/d/f3.ts ProjectRootPath: undefined
Info 82   [00:02:42.000] 		Projects: /dev/null/inferredProject5*
Inferred project: /dev/null/inferredProject5* isOrphan:: false isClosed: false
Inferred project: /dev/null/inferredProject4* isOrphan:: false isClosed: false