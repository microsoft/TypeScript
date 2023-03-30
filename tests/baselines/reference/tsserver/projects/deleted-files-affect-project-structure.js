currentDirectory:: / useCaseSensitiveFileNames: false
Info 0    [00:00:15.000] Provided types map file "/typesMap.json" doesn't exist
Creating project service
//// [/a/b/f1.ts]
export * from "./f2"

//// [/a/b/f2.ts]
export * from "../c/f3"

//// [/a/c/f3.ts]
export let y = 1;


Info 1    [00:00:16.000] Search path: /a/b
Info 2    [00:00:17.000] For info: /a/b/f1.ts :: No config files found.
Info 3    [00:00:18.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 4    [00:00:19.000] FileWatcher:: Added:: WatchInfo: /a/b/f2.ts 500 undefined WatchType: Closed Script info
Info 5    [00:00:20.000] FileWatcher:: Added:: WatchInfo: /a/c/f3.ts 500 undefined WatchType: Closed Script info
Info 6    [00:00:21.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /dev/null/inferredProject1* WatchType: Missing file
Info 7    [00:00:22.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 8    [00:00:23.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 9    [00:00:24.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 10   [00:00:25.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 11   [00:00:26.000] 	Files (3)
	/a/c/f3.ts Text-1 "export let y = 1;"
	/a/b/f2.ts Text-1 "export * from \"../c/f3\""
	/a/b/f1.ts SVC-1-0 "export * from \"./f2\""


	../c/f3.ts
	  Imported via "../c/f3" from file 'f2.ts'
	f2.ts
	  Imported via "./f2" from file 'f1.ts'
	f1.ts
	  Root file specified for compilation

Info 12   [00:00:27.000] -----------------------------------------------
Info 13   [00:00:28.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 13   [00:00:29.000] 	Files (3)

Info 13   [00:00:30.000] -----------------------------------------------
Info 13   [00:00:31.000] Open files: 
Info 13   [00:00:32.000] 	FileName: /a/b/f1.ts ProjectRootPath: undefined
Info 13   [00:00:33.000] 		Projects: /dev/null/inferredProject1*
Info 13   [00:00:34.000] FileWatcher:: Close:: WatchInfo: /a/c/f3.ts 500 undefined WatchType: Closed Script info
Info 14   [00:00:35.000] Search path: /a/c
Info 15   [00:00:36.000] For info: /a/c/f3.ts :: No config files found.
Info 16   [00:00:37.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 16   [00:00:38.000] 	Files (3)

Info 16   [00:00:39.000] -----------------------------------------------
Info 16   [00:00:40.000] Open files: 
Info 16   [00:00:41.000] 	FileName: /a/b/f1.ts ProjectRootPath: undefined
Info 16   [00:00:42.000] 		Projects: /dev/null/inferredProject1*
Info 16   [00:00:43.000] 	FileName: /a/c/f3.ts ProjectRootPath: undefined
Info 16   [00:00:44.000] 		Projects: /dev/null/inferredProject1*
Info 16   [00:00:46.000] FileWatcher:: Triggered with /a/b/f2.ts 2:: WatchInfo: /a/b/f2.ts 500 undefined WatchType: Closed Script info
Info 17   [00:00:47.000] FileWatcher:: Close:: WatchInfo: /a/b/f2.ts 500 undefined WatchType: Closed Script info
Info 18   [00:00:48.000] Scheduled: /dev/null/inferredProject1*
Info 19   [00:00:49.000] Scheduled: *ensureProjectForOpenFiles*
Info 20   [00:00:50.000] Elapsed:: *ms FileWatcher:: Triggered with /a/b/f2.ts 2:: WatchInfo: /a/b/f2.ts 500 undefined WatchType: Closed Script info
Before running Timeout callback:: count: 2
1: /dev/null/inferredProject1*
2: *ensureProjectForOpenFiles*
//// [/a/b/f2.ts] deleted

PolledWatches::
/a/lib/lib.d.ts: *new*
  {"pollingInterval":500}
/a/b/node_modules/@types: *new*
  {"pollingInterval":500}

Info 21   [00:00:51.000] Running: /dev/null/inferredProject1*
Info 22   [00:00:52.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 23   [00:00:53.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/f2 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 24   [00:00:54.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/f2 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 25   [00:00:55.000] DirectoryWatcher:: Added:: WatchInfo: /a/b 0 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 26   [00:00:56.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b 0 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 27   [00:00:57.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 2 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 28   [00:00:58.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 29   [00:00:59.000] 	Files (1)
	/a/b/f1.ts SVC-1-0 "export * from \"./f2\""


	f1.ts
	  Root file specified for compilation

Info 30   [00:01:00.000] -----------------------------------------------
Info 31   [00:01:01.000] Running: *ensureProjectForOpenFiles*
Info 32   [00:01:02.000] Before ensureProjectForOpenFiles:
Info 33   [00:01:03.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 33   [00:01:04.000] 	Files (1)

Info 33   [00:01:05.000] -----------------------------------------------
Info 33   [00:01:06.000] Open files: 
Info 33   [00:01:07.000] 	FileName: /a/b/f1.ts ProjectRootPath: undefined
Info 33   [00:01:08.000] 		Projects: /dev/null/inferredProject1*
Info 33   [00:01:09.000] 	FileName: /a/c/f3.ts ProjectRootPath: undefined
Info 33   [00:01:10.000] 		Projects: 
Info 33   [00:01:11.000] Starting updateGraphWorker: Project: /dev/null/inferredProject2*
Info 34   [00:01:12.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /dev/null/inferredProject2* WatchType: Missing file
Info 35   [00:01:13.000] DirectoryWatcher:: Added:: WatchInfo: /a/c/node_modules/@types 1 undefined Project: /dev/null/inferredProject2* WatchType: Type roots
Info 36   [00:01:14.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/c/node_modules/@types 1 undefined Project: /dev/null/inferredProject2* WatchType: Type roots
Info 37   [00:01:15.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject2* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 38   [00:01:16.000] Project '/dev/null/inferredProject2*' (Inferred)
Info 39   [00:01:17.000] 	Files (1)
	/a/c/f3.ts Text-1 "export let y = 1;"


	f3.ts
	  Root file specified for compilation

Info 40   [00:01:18.000] -----------------------------------------------
Info 41   [00:01:19.000] After ensureProjectForOpenFiles:
Info 42   [00:01:20.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 42   [00:01:21.000] 	Files (1)

Info 42   [00:01:22.000] -----------------------------------------------
Info 42   [00:01:23.000] Project '/dev/null/inferredProject2*' (Inferred)
Info 42   [00:01:24.000] 	Files (1)

Info 42   [00:01:25.000] -----------------------------------------------
Info 42   [00:01:26.000] Open files: 
Info 42   [00:01:27.000] 	FileName: /a/b/f1.ts ProjectRootPath: undefined
Info 42   [00:01:28.000] 		Projects: /dev/null/inferredProject1*
Info 42   [00:01:29.000] 	FileName: /a/c/f3.ts ProjectRootPath: undefined
Info 42   [00:01:30.000] 		Projects: /dev/null/inferredProject2*
After running Timeout callback:: count: 0

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/a/b/node_modules/@types:
  {"pollingInterval":500}
/a/b/f2: *new*
  {"pollingInterval":500}
/a/c/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/a/b: *new*
  {}
