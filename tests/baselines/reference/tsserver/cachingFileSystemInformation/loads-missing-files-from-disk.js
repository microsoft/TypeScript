Info 0    [00:00:07.000] Provided types map file "/typesMap.json" doesn't exist
Creating project service
//// [/c/foo.ts]
import {y} from "bar"


Info 1    [00:00:08.000] Search path: /c
Info 2    [00:00:09.000] For info: /c/foo.ts :: No config files found.
Info 3    [00:00:10.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 4    [00:00:11.000] DirectoryWatcher:: Added:: WatchInfo: /c/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 5    [00:00:12.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /c/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 6    [00:00:13.000] DirectoryWatcher:: Added:: WatchInfo: /c 0 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 7    [00:00:14.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /c 0 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 8    [00:00:15.000] DirectoryWatcher:: Added:: WatchInfo: /c/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 9    [00:00:16.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /c/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 10   [00:00:17.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 11   [00:00:18.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 12   [00:00:19.000] 	Files (1)
	/c/foo.ts SVC-1-0 "import {y} from \"bar\""


	foo.ts
	  Root file specified for compilation

Info 13   [00:00:20.000] -----------------------------------------------
Info 14   [00:00:21.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 14   [00:00:22.000] 	Files (1)

Info 14   [00:00:23.000] -----------------------------------------------
Info 14   [00:00:24.000] Open files: 
Info 14   [00:00:25.000] 	FileName: /c/foo.ts ProjectRootPath: undefined
Info 14   [00:00:26.000] 		Projects: /dev/null/inferredProject1*
Info 14   [00:00:27.000] getSemanticDiagnostics:: /c/foo.ts:: 1
Info 15   [00:00:28.000] foo.ts(1,17): error TS2792: Cannot find module 'bar'. Did you mean to set the 'moduleResolution' option to 'nodenext', or to add aliases to the 'paths' option?

Info 16   [00:00:29.000] fileExists:: [{"key":"/c/tsconfig.json","count":1},{"key":"/c/jsconfig.json","count":1},{"key":"/tsconfig.json","count":1},{"key":"/jsconfig.json","count":1},{"key":"/c/bar.ts","count":1},{"key":"/c/bar.tsx","count":1},{"key":"/c/bar.d.ts","count":1},{"key":"/bar.ts","count":1},{"key":"/bar.tsx","count":1},{"key":"/bar.d.ts","count":1},{"key":"/c/bar.js","count":1},{"key":"/c/bar.jsx","count":1},{"key":"/bar.js","count":1},{"key":"/bar.jsx","count":1},{"key":"/c/package.json","count":1},{"key":"/package.json","count":1}]
Info 17   [00:00:30.000] directoryExists:: [{"key":"/c","count":3},{"key":"/","count":2},{"key":"/c/node_modules","count":2},{"key":"/node_modules","count":1},{"key":"/c/node_modules/@types","count":2},{"key":"/node_modules/@types","count":1}]
Info 18   [00:00:31.000] getDirectories:: []
Info 19   [00:00:32.000] readFile:: [{"key":"/c/foo.ts","count":1}]
Info 20   [00:00:33.000] readDirectory:: []
Info 21   [00:00:36.000] DirectoryWatcher:: Triggered with /c/bar.d.ts :: WatchInfo: /c 0 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 22   [00:00:37.000] Scheduled: /dev/null/inferredProject1*FailedLookupInvalidation
Info 23   [00:00:38.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /c/bar.d.ts :: WatchInfo: /c 0 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Before running timeout callbacks
//// [/c/bar.d.ts]
export var y = 1


PolledWatches::
/c/node_modules: *new*
  {"pollingInterval":500}
/c/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/c: *new*
  {}

Info 24   [00:00:39.000] Running: /dev/null/inferredProject1*FailedLookupInvalidation
Info 25   [00:00:40.000] Scheduled: /dev/null/inferredProject1*
Info 26   [00:00:41.000] Scheduled: *ensureProjectForOpenFiles*
After running timeout callbacks

Info 27   [00:00:42.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 28   [00:00:43.000] FileWatcher:: Added:: WatchInfo: /c/bar.d.ts 500 undefined WatchType: Closed Script info
Info 29   [00:00:44.000] DirectoryWatcher:: Close:: WatchInfo: /c/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 30   [00:00:45.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /c/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 31   [00:00:46.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 2 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info 32   [00:00:47.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 33   [00:00:48.000] 	Files (2)
	/c/bar.d.ts Text-1 "export var y = 1"
	/c/foo.ts SVC-1-0 "import {y} from \"bar\""


	bar.d.ts
	  Imported via "bar" from file 'foo.ts'
	foo.ts
	  Root file specified for compilation

Info 34   [00:00:49.000] -----------------------------------------------
Info 35   [00:00:50.000] getSemanticDiagnostics:: /c/foo.ts:: 0
Info 36   [00:00:51.000] fileExists:: [{"key":"/c/bar.ts","count":1},{"key":"/c/bar.tsx","count":1},{"key":"/c/bar.d.ts","count":3}]
Info 37   [00:00:52.000] directoryExists:: [{"key":"/c","count":1},{"key":"/c/node_modules/@types","count":1},{"key":"/node_modules/@types","count":1}]
Info 38   [00:00:53.000] getDirectories:: []
Info 39   [00:00:54.000] readFile:: [{"key":"/c/bar.d.ts","count":1}]
Info 40   [00:00:55.000] readDirectory:: []