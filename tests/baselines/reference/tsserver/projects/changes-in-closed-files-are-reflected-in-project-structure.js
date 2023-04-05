currentDirectory:: / useCaseSensitiveFileNames: false
Info 0    [00:00:15.000] Provided types map file "/typesMap.json" doesn't exist
Creating project service
//// [/a/b/f1.ts]
export * from "./f2"

//// [/a/b/f2.ts]
export let x = 1

//// [/a/c/f3.ts]
export let y = 1;


Info 1    [00:00:16.000] Search path: /a/b
Info 2    [00:00:17.000] For info: /a/b/f1.ts :: No config files found.
Info 3    [00:00:18.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 4    [00:00:19.000] FileWatcher:: Added:: WatchInfo: /a/b/f2.ts 500 undefined WatchType: Closed Script info
Info 5    [00:00:20.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /dev/null/inferredProject1* WatchType: Missing file
Info 6    [00:00:21.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 7    [00:00:22.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 8    [00:00:23.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 9    [00:00:24.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 10   [00:00:25.000] 	Files (2)
	/a/b/f2.ts Text-1 "export let x = 1"
	/a/b/f1.ts SVC-1-0 "export * from \"./f2\""


	f2.ts
	  Imported via "./f2" from file 'f1.ts'
	f1.ts
	  Root file specified for compilation

Info 11   [00:00:26.000] -----------------------------------------------
Info 12   [00:00:27.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 12   [00:00:28.000] 	Files (2)

Info 12   [00:00:29.000] -----------------------------------------------
Info 12   [00:00:30.000] Open files: 
Info 12   [00:00:31.000] 	FileName: /a/b/f1.ts ProjectRootPath: undefined
Info 12   [00:00:32.000] 		Projects: /dev/null/inferredProject1*
Info 12   [00:00:33.000] Search path: /a/c
Info 13   [00:00:34.000] For info: /a/c/f3.ts :: No config files found.
Info 14   [00:00:35.000] Starting updateGraphWorker: Project: /dev/null/inferredProject2*
Info 15   [00:00:36.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /dev/null/inferredProject2* WatchType: Missing file
Info 16   [00:00:37.000] DirectoryWatcher:: Added:: WatchInfo: /a/c/node_modules/@types 1 undefined Project: /dev/null/inferredProject2* WatchType: Type roots
Info 17   [00:00:38.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/c/node_modules/@types 1 undefined Project: /dev/null/inferredProject2* WatchType: Type roots
Info 18   [00:00:39.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject2* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 19   [00:00:40.000] Project '/dev/null/inferredProject2*' (Inferred)
Info 20   [00:00:41.000] 	Files (1)
	/a/c/f3.ts SVC-1-0 "export let y = 1;"


	f3.ts
	  Root file specified for compilation

Info 21   [00:00:42.000] -----------------------------------------------
Info 22   [00:00:43.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 22   [00:00:44.000] 	Files (2)

Info 22   [00:00:45.000] -----------------------------------------------
Info 22   [00:00:46.000] Project '/dev/null/inferredProject2*' (Inferred)
Info 22   [00:00:47.000] 	Files (1)

Info 22   [00:00:48.000] -----------------------------------------------
Info 22   [00:00:49.000] Open files: 
Info 22   [00:00:50.000] 	FileName: /a/b/f1.ts ProjectRootPath: undefined
Info 22   [00:00:51.000] 		Projects: /dev/null/inferredProject1*
Info 22   [00:00:52.000] 	FileName: /a/c/f3.ts ProjectRootPath: undefined
Info 22   [00:00:53.000] 		Projects: /dev/null/inferredProject2*
Info 22   [00:00:57.000] FileWatcher:: Triggered with /a/b/f2.ts 1:: WatchInfo: /a/b/f2.ts 500 undefined WatchType: Closed Script info
Info 23   [00:00:58.000] Scheduled: /dev/null/inferredProject1*
Info 24   [00:00:59.000] Scheduled: *ensureProjectForOpenFiles*
Info 25   [00:01:00.000] Elapsed:: *ms FileWatcher:: Triggered with /a/b/f2.ts 1:: WatchInfo: /a/b/f2.ts 500 undefined WatchType: Closed Script info
Before running Timeout callback:: count: 2
1: /dev/null/inferredProject1*
2: *ensureProjectForOpenFiles*
//// [/a/b/f2.ts]
export * from "../c/f3"


PolledWatches::
/a/lib/lib.d.ts: *new*
  {"pollingInterval":500}
/a/b/node_modules/@types: *new*
  {"pollingInterval":500}
/a/c/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/a/b/f2.ts: *new*
  {}

Info 26   [00:01:01.000] Running: /dev/null/inferredProject1*
Info 27   [00:01:02.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 28   [00:01:03.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 2 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info 29   [00:01:04.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 30   [00:01:05.000] 	Files (3)
	/a/c/f3.ts SVC-1-0 "export let y = 1;"
	/a/b/f2.ts Text-2 "export * from \"../c/f3\""
	/a/b/f1.ts SVC-1-0 "export * from \"./f2\""


	../c/f3.ts
	  Imported via "../c/f3" from file 'f2.ts'
	f2.ts
	  Imported via "./f2" from file 'f1.ts'
	f1.ts
	  Root file specified for compilation

Info 31   [00:01:06.000] -----------------------------------------------
Info 32   [00:01:07.000] Running: *ensureProjectForOpenFiles*
Info 33   [00:01:08.000] Before ensureProjectForOpenFiles:
Info 34   [00:01:09.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 34   [00:01:10.000] 	Files (3)

Info 34   [00:01:11.000] -----------------------------------------------
Info 34   [00:01:12.000] Project '/dev/null/inferredProject2*' (Inferred)
Info 34   [00:01:13.000] 	Files (1)

Info 34   [00:01:14.000] -----------------------------------------------
Info 34   [00:01:15.000] Open files: 
Info 34   [00:01:16.000] 	FileName: /a/b/f1.ts ProjectRootPath: undefined
Info 34   [00:01:17.000] 		Projects: /dev/null/inferredProject1*
Info 34   [00:01:18.000] 	FileName: /a/c/f3.ts ProjectRootPath: undefined
Info 34   [00:01:19.000] 		Projects: /dev/null/inferredProject2*,/dev/null/inferredProject1*
Info 34   [00:01:20.000] Starting updateGraphWorker: Project: /dev/null/inferredProject2*
Info 35   [00:01:21.000] FileWatcher:: Close:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /dev/null/inferredProject2* WatchType: Missing file
Info 36   [00:01:22.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject2* Version: 2 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 37   [00:01:23.000] Project '/dev/null/inferredProject2*' (Inferred)
Info 38   [00:01:24.000] 	Files (0)



Info 39   [00:01:25.000] -----------------------------------------------
Info 40   [00:01:26.000] After ensureProjectForOpenFiles:
Info 41   [00:01:27.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 41   [00:01:28.000] 	Files (3)

Info 41   [00:01:29.000] -----------------------------------------------
Info 41   [00:01:30.000] Project '/dev/null/inferredProject2*' (Inferred)
Info 41   [00:01:31.000] 	Files (0)

Info 41   [00:01:32.000] -----------------------------------------------
Info 41   [00:01:33.000] Open files: 
Info 41   [00:01:34.000] 	FileName: /a/b/f1.ts ProjectRootPath: undefined
Info 41   [00:01:35.000] 		Projects: /dev/null/inferredProject1*
Info 41   [00:01:36.000] 	FileName: /a/c/f3.ts ProjectRootPath: undefined
Info 41   [00:01:37.000] 		Projects: /dev/null/inferredProject1*
After running Timeout callback:: count: 0

Inferred project: /dev/null/inferredProject1* isOrphan:: false isClosed: false
Inferred project: /dev/null/inferredProject2* isOrphan:: true isClosed: false