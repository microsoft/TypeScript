Provided types map file "/typesMap.json" doesn't exist
Search path: /c/d
For info: /c/d/f0.ts :: No config files found.
Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Starting updateGraphWorker: Project: /dev/null/inferredProject1*
FileWatcher:: Added:: WatchInfo: /c/f1.ts 500 undefined WatchType: Closed Script info
DirectoryWatcher:: Added:: WatchInfo: /c/d 0 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /c/d 0 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
DirectoryWatcher:: Added:: WatchInfo: /c/d/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /c/d/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Project '/dev/null/inferredProject1*' (Inferred)
	Files (2)
	/c/f1.ts
	/c/d/f0.ts


	../f1.ts
	  Imported via "f1" from file 'f0.ts'
	f0.ts
	  Root file specified for compilation

-----------------------------------------------
Project '/dev/null/inferredProject1*' (Inferred)
	Files (2)

-----------------------------------------------
Open files: 
	FileName: /c/d/f0.ts ProjectRootPath: undefined
		Projects: /dev/null/inferredProject1*
getSemanticDiagnostics:: /c/f1.ts:: 1
../f1.ts(1,1): error TS2304: Cannot find name 'foo'.

Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 2 structureChanged: false structureIsReused:: Completely Elapsed:: *ms
Different program with same set of files
getSemanticDiagnostics:: /c/f1.ts:: 1
../f1.ts(1,1): error TS2304: Cannot find name 'foo'.

fileExists:: []
directoryExists:: []
getDirectories:: []
readFile:: []
readDirectory:: []
Starting updateGraphWorker: Project: /dev/null/inferredProject1*
DirectoryWatcher:: Added:: WatchInfo: /c/d/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /c/d/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 3 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Project '/dev/null/inferredProject1*' (Inferred)
	Files (1)
	/c/d/f0.ts


	f0.ts
	  Root file specified for compilation

-----------------------------------------------
Could not find source file: '/c/f1.ts'.
fileExists:: [{"key":"/c/d/f2.ts","count":1},{"key":"/c/d/f2.tsx","count":1},{"key":"/c/d/f2.d.ts","count":1},{"key":"/c/f2.ts","count":1},{"key":"/c/f2.tsx","count":1},{"key":"/c/f2.d.ts","count":1},{"key":"/f2.ts","count":1},{"key":"/f2.tsx","count":1},{"key":"/f2.d.ts","count":1},{"key":"/c/d/f2.js","count":1},{"key":"/c/d/f2.jsx","count":1},{"key":"/c/f2.js","count":1},{"key":"/c/f2.jsx","count":1},{"key":"/f2.js","count":1},{"key":"/f2.jsx","count":1}]
directoryExists:: [{"key":"/c/d","count":2},{"key":"/c","count":2},{"key":"/","count":2},{"key":"/c/d/node_modules","count":2},{"key":"/c/node_modules","count":1},{"key":"/node_modules","count":1},{"key":"/c/d/node_modules/@types","count":1},{"key":"/c/node_modules/@types","count":1},{"key":"/node_modules/@types","count":1}]
getDirectories:: []
readFile:: []
readDirectory:: []
Starting updateGraphWorker: Project: /dev/null/inferredProject1*
DirectoryWatcher:: Close:: WatchInfo: /c/d/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /c/d/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 4 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Project '/dev/null/inferredProject1*' (Inferred)
	Files (2)
	/c/f1.ts
	/c/d/f0.ts


	../f1.ts
	  Imported via "f1" from file 'f0.ts'
	f0.ts
	  Root file specified for compilation

-----------------------------------------------
getSemanticDiagnostics:: /c/f1.ts:: 1
../f1.ts(1,1): error TS2304: Cannot find name 'foo'.

fileExists:: [{"key":"/c/d/f1.ts","count":1},{"key":"/c/d/f1.tsx","count":1},{"key":"/c/d/f1.d.ts","count":1},{"key":"/c/f1.ts","count":1}]
directoryExists:: [{"key":"/c/d","count":1},{"key":"/c","count":1},{"key":"/c/d/node_modules/@types","count":1},{"key":"/c/node_modules/@types","count":1},{"key":"/node_modules/@types","count":1}]
getDirectories:: []
readFile:: []
readDirectory:: []
DirectoryWatcher:: Close:: WatchInfo: /c/d 0 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /c/d 0 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
DirectoryWatcher:: Close:: WatchInfo: /c/d/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /c/d/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Scheduled: /dev/null/inferredProject1*
Scheduled: *ensureProjectForOpenFiles*
Starting updateGraphWorker: Project: /dev/null/inferredProject1*
DirectoryWatcher:: Added:: WatchInfo: /c/d 0 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /c/d 0 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
DirectoryWatcher:: Added:: WatchInfo: /c/d/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /c/d/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 5 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Different program with same set of files
getSemanticDiagnostics:: /c/f1.ts:: 1
../f1.ts(1,1): error TS2304: Cannot find name 'foo'.

fileExists:: [{"key":"/c/d/f1.ts","count":1},{"key":"/c/d/f1.tsx","count":1},{"key":"/c/d/f1.d.ts","count":1},{"key":"/c/f1.ts","count":1}]
directoryExists:: [{"key":"/c/d","count":2},{"key":"/c","count":1},{"key":"/c/d/node_modules/@types","count":2},{"key":"/c/node_modules/@types","count":1},{"key":"/node_modules/@types","count":1}]
getDirectories:: []
readFile:: []
readDirectory:: []