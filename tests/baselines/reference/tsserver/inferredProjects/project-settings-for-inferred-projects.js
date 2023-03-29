currentDirectory:: / useCaseSensitiveFileNames: false
Info 0    [00:00:11.000] Provided types map file "/typesMap.json" doesn't exist
Creating project service
//// [/a/b/app.ts]
import {x} from "mod"

//// [/a/mod.ts]
export let x: number


Info 1    [00:00:12.000] Search path: /a/b
Info 2    [00:00:13.000] For info: /a/b/app.ts :: No config files found.
Info 3    [00:00:14.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 4    [00:00:15.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 5    [00:00:16.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 6    [00:00:17.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /dev/null/inferredProject1* WatchType: Missing file
Info 7    [00:00:18.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 8    [00:00:19.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 9    [00:00:20.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 10   [00:00:21.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 11   [00:00:22.000] 	Files (1)
	/a/b/app.ts SVC-1-0 "import {x} from \"mod\""


	app.ts
	  Root file specified for compilation

Info 12   [00:00:23.000] -----------------------------------------------
Info 13   [00:00:24.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 13   [00:00:25.000] 	Files (1)

Info 13   [00:00:26.000] -----------------------------------------------
Info 13   [00:00:27.000] Open files: 
Info 13   [00:00:28.000] 	FileName: /a/b/app.ts ProjectRootPath: undefined
Info 13   [00:00:29.000] 		Projects: /dev/null/inferredProject1*
Info 13   [00:00:30.000] Search path: /a
Info 14   [00:00:31.000] For info: /a/mod.ts :: No config files found.
Info 15   [00:00:32.000] Starting updateGraphWorker: Project: /dev/null/inferredProject2*
Info 16   [00:00:33.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /dev/null/inferredProject2* WatchType: Missing file
Info 17   [00:00:34.000] DirectoryWatcher:: Added:: WatchInfo: /a/node_modules/@types 1 undefined Project: /dev/null/inferredProject2* WatchType: Type roots
Info 18   [00:00:35.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/node_modules/@types 1 undefined Project: /dev/null/inferredProject2* WatchType: Type roots
Info 19   [00:00:36.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject2* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 20   [00:00:37.000] Project '/dev/null/inferredProject2*' (Inferred)
Info 21   [00:00:38.000] 	Files (1)
	/a/mod.ts SVC-1-0 "export let x: number"


	mod.ts
	  Root file specified for compilation

Info 22   [00:00:39.000] -----------------------------------------------
Info 23   [00:00:40.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 23   [00:00:41.000] 	Files (1)

Info 23   [00:00:42.000] -----------------------------------------------
Info 23   [00:00:43.000] Project '/dev/null/inferredProject2*' (Inferred)
Info 23   [00:00:44.000] 	Files (1)

Info 23   [00:00:45.000] -----------------------------------------------
Info 23   [00:00:46.000] Open files: 
Info 23   [00:00:47.000] 	FileName: /a/b/app.ts ProjectRootPath: undefined
Info 23   [00:00:48.000] 		Projects: /dev/null/inferredProject1*
Info 23   [00:00:49.000] 	FileName: /a/mod.ts ProjectRootPath: undefined
Info 23   [00:00:50.000] 		Projects: /dev/null/inferredProject2*
Info 23   [00:00:51.000] DirectoryWatcher:: Close:: WatchInfo: /a/b/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 24   [00:00:52.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /a/b/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 25   [00:00:53.000] DirectoryWatcher:: Close:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 26   [00:00:54.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 27   [00:00:55.000] Scheduled: /dev/null/inferredProject1*
Info 28   [00:00:56.000] DirectoryWatcher:: Close:: WatchInfo: /a/node_modules/@types 1 undefined Project: /dev/null/inferredProject2* WatchType: Type roots
Info 29   [00:00:57.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /a/node_modules/@types 1 undefined Project: /dev/null/inferredProject2* WatchType: Type roots
Info 30   [00:00:58.000] Scheduled: /dev/null/inferredProject2*
Info 31   [00:00:59.000] Scheduled: *ensureProjectForOpenFiles*
Before running Timeout callback:: count: 3
1: /dev/null/inferredProject1*
2: /dev/null/inferredProject2*
3: *ensureProjectForOpenFiles*

PolledWatches::
/a/lib/lib.d.ts: *new*
  {"pollingInterval":500}

Info 32   [00:01:00.000] Running: /dev/null/inferredProject1*
Info 33   [00:01:01.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 34   [00:01:02.000] DirectoryWatcher:: Added:: WatchInfo: /a/b 0 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 35   [00:01:03.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b 0 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 36   [00:01:04.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 37   [00:01:05.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 38   [00:01:06.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 2 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 39   [00:01:07.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 40   [00:01:08.000] 	Files (2)
	/a/mod.ts SVC-1-0 "export let x: number"
	/a/b/app.ts SVC-1-0 "import {x} from \"mod\""


	../mod.ts
	  Imported via "mod" from file 'app.ts'
	app.ts
	  Root file specified for compilation

Info 41   [00:01:09.000] -----------------------------------------------
Info 42   [00:01:10.000] Running: /dev/null/inferredProject2*
Info 43   [00:01:11.000] Starting updateGraphWorker: Project: /dev/null/inferredProject2*
Info 44   [00:01:12.000] DirectoryWatcher:: Added:: WatchInfo: /a/node_modules/@types 1 undefined Project: /dev/null/inferredProject2* WatchType: Type roots
Info 45   [00:01:13.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/node_modules/@types 1 undefined Project: /dev/null/inferredProject2* WatchType: Type roots
Info 46   [00:01:14.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject2* Version: 2 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 47   [00:01:15.000] Project '/dev/null/inferredProject2*' (Inferred)
Info 48   [00:01:16.000] 	Files (1)
	/a/mod.ts SVC-1-0 "export let x: number"

Info 49   [00:01:17.000] -----------------------------------------------
Info 50   [00:01:18.000] Running: *ensureProjectForOpenFiles*
Info 51   [00:01:19.000] Before ensureProjectForOpenFiles:
Info 52   [00:01:20.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 52   [00:01:21.000] 	Files (2)

Info 52   [00:01:22.000] -----------------------------------------------
Info 52   [00:01:23.000] Project '/dev/null/inferredProject2*' (Inferred)
Info 52   [00:01:24.000] 	Files (1)

Info 52   [00:01:25.000] -----------------------------------------------
Info 52   [00:01:26.000] Open files: 
Info 52   [00:01:27.000] 	FileName: /a/b/app.ts ProjectRootPath: undefined
Info 52   [00:01:28.000] 		Projects: /dev/null/inferredProject1*
Info 52   [00:01:29.000] 	FileName: /a/mod.ts ProjectRootPath: undefined
Info 52   [00:01:30.000] 		Projects: /dev/null/inferredProject2*,/dev/null/inferredProject1*
Info 52   [00:01:31.000] Starting updateGraphWorker: Project: /dev/null/inferredProject2*
Info 53   [00:01:32.000] FileWatcher:: Close:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /dev/null/inferredProject2* WatchType: Missing file
Info 54   [00:01:33.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject2* Version: 3 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 55   [00:01:34.000] Project '/dev/null/inferredProject2*' (Inferred)
Info 56   [00:01:35.000] 	Files (0)



Info 57   [00:01:36.000] -----------------------------------------------
Info 58   [00:01:37.000] After ensureProjectForOpenFiles:
Info 59   [00:01:38.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 59   [00:01:39.000] 	Files (2)

Info 59   [00:01:40.000] -----------------------------------------------
Info 59   [00:01:41.000] Project '/dev/null/inferredProject2*' (Inferred)
Info 59   [00:01:42.000] 	Files (0)

Info 59   [00:01:43.000] -----------------------------------------------
Info 59   [00:01:44.000] Open files: 
Info 59   [00:01:45.000] 	FileName: /a/b/app.ts ProjectRootPath: undefined
Info 59   [00:01:46.000] 		Projects: /dev/null/inferredProject1*
Info 59   [00:01:47.000] 	FileName: /a/mod.ts ProjectRootPath: undefined
Info 59   [00:01:48.000] 		Projects: /dev/null/inferredProject1*
After running Timeout callback:: count: 0

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/a/b/node_modules/@types: *new*
  {"pollingInterval":500}
/a/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/a/b: *new*
  {}

Inferred project: /dev/null/inferredProject1* isOrphan:: false isClosed: false
Inferred project: /dev/null/inferredProject2* isOrphan:: true isClosed: false