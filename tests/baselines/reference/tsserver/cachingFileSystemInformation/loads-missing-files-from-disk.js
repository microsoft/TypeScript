Provided types map file "/typesMap.json" doesn't exist
Search path: /c
For info: /c/foo.ts :: No config files found.
Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Starting updateGraphWorker: Project: /dev/null/inferredProject1*
DirectoryWatcher:: Added:: WatchInfo: /c/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /c/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
DirectoryWatcher:: Added:: WatchInfo: /c 0 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /c 0 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
DirectoryWatcher:: Added:: WatchInfo: /c/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /c/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Project '/dev/null/inferredProject1*' (Inferred)
	Files (1)
	/c/foo.ts


	foo.ts
	  Root file specified for compilation

-----------------------------------------------
Project '/dev/null/inferredProject1*' (Inferred)
	Files (1)

-----------------------------------------------
Open files: 
	FileName: /c/foo.ts ProjectRootPath: undefined
		Projects: /dev/null/inferredProject1*
getSemanticDiagnostics:: /c/foo.ts:: 1
foo.ts(1,17): error TS2792: Cannot find module 'bar'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

fileExists:: [{"key":"/c/tsconfig.json","count":1},{"key":"/c/jsconfig.json","count":1},{"key":"/tsconfig.json","count":1},{"key":"/jsconfig.json","count":1},{"key":"/c/bar.ts","count":1},{"key":"/c/bar.tsx","count":1},{"key":"/c/bar.d.ts","count":1},{"key":"/bar.ts","count":1},{"key":"/bar.tsx","count":1},{"key":"/bar.d.ts","count":1},{"key":"/c/bar.js","count":1},{"key":"/c/bar.jsx","count":1},{"key":"/bar.js","count":1},{"key":"/bar.jsx","count":1},{"key":"/c/package.json","count":1},{"key":"/package.json","count":1}]
directoryExists:: [{"key":"/c","count":3},{"key":"/","count":2},{"key":"/c/node_modules","count":2},{"key":"/node_modules","count":1},{"key":"/c/node_modules/@types","count":2},{"key":"/node_modules/@types","count":1}]
getDirectories:: []
readFile:: [{"key":"/c/foo.ts","count":1}]
readDirectory:: []
DirectoryWatcher:: Triggered with /c/bar.d.ts :: WatchInfo: /c 0 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Scheduled: /dev/null/inferredProject1*FailedLookupInvalidation
Elapsed:: *ms DirectoryWatcher:: Triggered with /c/bar.d.ts :: WatchInfo: /c 0 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Running: /dev/null/inferredProject1*FailedLookupInvalidation
Scheduled: /dev/null/inferredProject1*
Scheduled: *ensureProjectForOpenFiles*
Starting updateGraphWorker: Project: /dev/null/inferredProject1*
FileWatcher:: Added:: WatchInfo: /c/bar.d.ts 500 undefined WatchType: Closed Script info
DirectoryWatcher:: Close:: WatchInfo: /c/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /c/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 2 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Project '/dev/null/inferredProject1*' (Inferred)
	Files (2)
	/c/bar.d.ts
	/c/foo.ts


	bar.d.ts
	  Imported via "bar" from file 'foo.ts'
	foo.ts
	  Root file specified for compilation

-----------------------------------------------
getSemanticDiagnostics:: /c/foo.ts:: 0
fileExists:: [{"key":"/c/bar.ts","count":1},{"key":"/c/bar.tsx","count":1},{"key":"/c/bar.d.ts","count":2}]
directoryExists:: [{"key":"/c","count":1},{"key":"/c/node_modules/@types","count":1},{"key":"/node_modules/@types","count":1}]
getDirectories:: []
readFile:: [{"key":"/c/bar.d.ts","count":1}]
readDirectory:: []