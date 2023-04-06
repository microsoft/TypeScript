currentDirectory:: / useCaseSensitiveFileNames: false
Info 0    [00:00:11.000] Provided types map file "/typesMap.json" doesn't exist
Creating project service
//// [/a/b/f1.ts]
import {x} from "./f2"

//// [/a/b/f2.ts]
export let x = 1


Info 1    [00:00:12.000] Search path: /a/b
Info 2    [00:00:13.000] For info: /a/b/f1.ts :: No config files found.
Info 3    [00:00:14.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 4    [00:00:15.000] FileWatcher:: Added:: WatchInfo: /a/b/f2.ts 500 undefined WatchType: Closed Script info
Info 5    [00:00:16.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /dev/null/inferredProject1* WatchType: Missing file
Info 6    [00:00:17.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 7    [00:00:18.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 8    [00:00:19.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 9    [00:00:20.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 10   [00:00:21.000] 	Files (2)
	/a/b/f2.ts Text-1 "export let x = 1"
	/a/b/f1.ts SVC-1-0 "import {x} from \"./f2\""


	f2.ts
	  Imported via "./f2" from file 'f1.ts'
	f1.ts
	  Root file specified for compilation

Info 11   [00:00:22.000] -----------------------------------------------
Info 12   [00:00:23.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 12   [00:00:24.000] 	Files (2)

Info 12   [00:00:25.000] -----------------------------------------------
Info 12   [00:00:26.000] Open files: 
Info 12   [00:00:27.000] 	FileName: /a/b/f1.ts ProjectRootPath: undefined
Info 12   [00:00:28.000] 		Projects: /dev/null/inferredProject1*
Info 12   [00:00:29.000] FileWatcher:: Close:: WatchInfo: /a/b/f2.ts 500 undefined WatchType: Closed Script info
Info 13   [00:00:30.000] Search path: /a/b
Info 14   [00:00:31.000] For info: /a/b/f2.ts :: No config files found.
Info 15   [00:00:32.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 15   [00:00:33.000] 	Files (2)

Info 15   [00:00:34.000] -----------------------------------------------
Info 15   [00:00:35.000] Open files: 
Info 15   [00:00:36.000] 	FileName: /a/b/f1.ts ProjectRootPath: undefined
Info 15   [00:00:37.000] 		Projects: /dev/null/inferredProject1*
Info 15   [00:00:38.000] 	FileName: /a/b/f2.ts ProjectRootPath: undefined
Info 15   [00:00:39.000] 		Projects: /dev/null/inferredProject1*
Info 15   [00:00:40.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 16   [00:00:41.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 2 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info 17   [00:00:42.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 18   [00:00:43.000] 	Files (1)
	/a/b/f1.ts SVC-1-1 "let y = 1 from \"./f2\""


	f1.ts
	  Root file specified for compilation

Info 19   [00:00:44.000] -----------------------------------------------
Info 20   [00:00:45.000] Before ensureProjectForOpenFiles:
Info 21   [00:00:46.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 21   [00:00:47.000] 	Files (1)

Info 21   [00:00:48.000] -----------------------------------------------
Info 21   [00:00:49.000] Open files: 
Info 21   [00:00:50.000] 	FileName: /a/b/f1.ts ProjectRootPath: undefined
Info 21   [00:00:51.000] 		Projects: /dev/null/inferredProject1*
Info 21   [00:00:52.000] 	FileName: /a/b/f2.ts ProjectRootPath: undefined
Info 21   [00:00:53.000] 		Projects: 
Info 21   [00:00:54.000] Starting updateGraphWorker: Project: /dev/null/inferredProject2*
Info 22   [00:00:55.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /dev/null/inferredProject2* WatchType: Missing file
Info 23   [00:00:56.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /dev/null/inferredProject2* WatchType: Type roots
Info 24   [00:00:57.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /dev/null/inferredProject2* WatchType: Type roots
Info 25   [00:00:58.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject2* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 26   [00:00:59.000] Project '/dev/null/inferredProject2*' (Inferred)
Info 27   [00:01:00.000] 	Files (1)
	/a/b/f2.ts Text-1 "export let x = 1"


	f2.ts
	  Root file specified for compilation

Info 28   [00:01:01.000] -----------------------------------------------
Info 29   [00:01:02.000] After ensureProjectForOpenFiles:
Info 30   [00:01:03.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 30   [00:01:04.000] 	Files (1)

Info 30   [00:01:05.000] -----------------------------------------------
Info 30   [00:01:06.000] Project '/dev/null/inferredProject2*' (Inferred)
Info 30   [00:01:07.000] 	Files (1)

Info 30   [00:01:08.000] -----------------------------------------------
Info 30   [00:01:09.000] Open files: 
Info 30   [00:01:10.000] 	FileName: /a/b/f1.ts ProjectRootPath: undefined
Info 30   [00:01:11.000] 		Projects: /dev/null/inferredProject1*
Info 30   [00:01:12.000] 	FileName: /a/b/f2.ts ProjectRootPath: undefined
Info 30   [00:01:13.000] 		Projects: /dev/null/inferredProject2*