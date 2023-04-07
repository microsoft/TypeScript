currentDirectory:: / useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/typesMap.json" doesn't exist
Creating project service
//// [/c/foo.ts]
import {y} from "bar"


Info seq  [hh:mm:ss:mss] Search path: /c
Info seq  [hh:mm:ss:mss] For info: /c/foo.ts :: No config files found.
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /c/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /c/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /c 0 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /c 0 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /c/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /c/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (1)
	/c/foo.ts SVC-1-0 "import {y} from \"bar\""


	foo.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (1)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /c/foo.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] getSemanticDiagnostics:: /c/foo.ts:: 1
Info seq  [hh:mm:ss:mss] foo.ts(1,17): error TS2792: Cannot find module 'bar'. Did you mean to set the 'moduleResolution' option to 'nodenext', or to add aliases to the 'paths' option?

Info seq  [hh:mm:ss:mss] fileExists:: [{"key":"/c/tsconfig.json","count":1},{"key":"/c/jsconfig.json","count":1},{"key":"/tsconfig.json","count":1},{"key":"/jsconfig.json","count":1},{"key":"/c/bar.ts","count":1},{"key":"/c/bar.tsx","count":1},{"key":"/c/bar.d.ts","count":1},{"key":"/bar.ts","count":1},{"key":"/bar.tsx","count":1},{"key":"/bar.d.ts","count":1},{"key":"/c/bar.js","count":1},{"key":"/c/bar.jsx","count":1},{"key":"/bar.js","count":1},{"key":"/bar.jsx","count":1},{"key":"/c/package.json","count":1},{"key":"/package.json","count":1}]
Info seq  [hh:mm:ss:mss] directoryExists:: [{"key":"/c","count":3},{"key":"/","count":2},{"key":"/c/node_modules","count":2},{"key":"/node_modules","count":1},{"key":"/c/node_modules/@types","count":2},{"key":"/node_modules/@types","count":1}]
Info seq  [hh:mm:ss:mss] getDirectories:: []
Info seq  [hh:mm:ss:mss] readFile:: [{"key":"/c/foo.ts","count":1}]
Info seq  [hh:mm:ss:mss] readDirectory:: []
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /c/bar.d.ts :: WatchInfo: /c 0 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Scheduled: /dev/null/inferredProject1*FailedLookupInvalidation
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /c/bar.d.ts :: WatchInfo: /c 0 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Before running Timeout callback:: count: 1
1: /dev/null/inferredProject1*FailedLookupInvalidation
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

Info seq  [hh:mm:ss:mss] Running: /dev/null/inferredProject1*FailedLookupInvalidation
Info seq  [hh:mm:ss:mss] Scheduled: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*
After running Timeout callback:: count: 2
2: /dev/null/inferredProject1*
3: *ensureProjectForOpenFiles*

Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /c/bar.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /c/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /c/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 2 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)
	/c/bar.d.ts Text-1 "export var y = 1"
	/c/foo.ts SVC-1-0 "import {y} from \"bar\""


	bar.d.ts
	  Imported via "bar" from file 'foo.ts'
	foo.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] getSemanticDiagnostics:: /c/foo.ts:: 0
Info seq  [hh:mm:ss:mss] fileExists:: [{"key":"/c/bar.ts","count":1},{"key":"/c/bar.tsx","count":1},{"key":"/c/bar.d.ts","count":3}]
Info seq  [hh:mm:ss:mss] directoryExists:: [{"key":"/c","count":1},{"key":"/c/node_modules/@types","count":1},{"key":"/node_modules/@types","count":1}]
Info seq  [hh:mm:ss:mss] getDirectories:: []
Info seq  [hh:mm:ss:mss] readFile:: [{"key":"/c/bar.d.ts","count":1}]
Info seq  [hh:mm:ss:mss] readDirectory:: []