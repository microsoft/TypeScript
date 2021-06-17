Provided types map file "/a/lib/typesMap.json" doesn't exist
request:{"seq":0,"type":"request","command":"open","arguments":{"file":"/a/b/commonFile1.ts"}}
Search path: /a/b
For info: /a/b/commonFile1.ts :: No config files found.
Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Starting updateGraphWorker: Project: /dev/null/inferredProject1*
FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
FileWatcher:: Added:: WatchInfo: /a/b/commonfile2.ts 500 undefined Project: /dev/null/inferredProject1* WatchType: Missing file
DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Project '/dev/null/inferredProject1*' (Inferred)
	Files (2)
	/a/lib/lib.d.ts
	/a/b/commonFile1.ts


	../lib/lib.d.ts
	  Default library for target 'es5'
	commonFile1.ts
	  Root file specified for compilation

-----------------------------------------------
Project '/dev/null/inferredProject1*' (Inferred)
	Files (2)

-----------------------------------------------
Open files: 
	FileName: /a/b/commonFile1.ts ProjectRootPath: undefined
		Projects: /dev/null/inferredProject1*
response:{"responseRequired":false}
request:{"seq":0,"type":"request","command":"semanticDiagnosticsSync","arguments":{"file":"/a/b/commonFile1.ts"}}
response:{"response":[{"start":{"line":2,"offset":29},"end":{"line":2,"offset":30},"text":"Cannot find name 'y'.","code":2304,"category":"error"},{"start":{"line":1,"offset":22},"end":{"line":1,"offset":36},"text":"File '/a/b/commonFile2.ts' not found.","code":6053,"category":"error"}],"responseRequired":true}
FileWatcher:: Triggered with /a/b/commonFile2.ts 0:: WatchInfo: /a/b/commonfile2.ts 500 undefined Project: /dev/null/inferredProject1* WatchType: Missing file
FileWatcher:: Close:: WatchInfo: /a/b/commonfile2.ts 500 undefined Project: /dev/null/inferredProject1* WatchType: Missing file
Scheduled: /dev/null/inferredProject1*
Scheduled: *ensureProjectForOpenFiles*
Elapsed:: *ms FileWatcher:: Triggered with /a/b/commonFile2.ts 0:: WatchInfo: /a/b/commonfile2.ts 500 undefined Project: /dev/null/inferredProject1* WatchType: Missing file
Running: /dev/null/inferredProject1*
Starting updateGraphWorker: Project: /dev/null/inferredProject1*
FileWatcher:: Added:: WatchInfo: /a/b/commonFile2.ts 500 undefined WatchType: Closed Script info
Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 2 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Project '/dev/null/inferredProject1*' (Inferred)
	Files (3)
	/a/lib/lib.d.ts
	/a/b/commonFile2.ts
	/a/b/commonFile1.ts


	../lib/lib.d.ts
	  Default library for target 'es5'
	commonFile2.ts
	  Referenced via 'commonFile2.ts' from file 'commonFile1.ts'
	commonFile1.ts
	  Root file specified for compilation

-----------------------------------------------
Running: *ensureProjectForOpenFiles*
Before ensureProjectForOpenFiles:
Project '/dev/null/inferredProject1*' (Inferred)
	Files (3)

-----------------------------------------------
Open files: 
	FileName: /a/b/commonFile1.ts ProjectRootPath: undefined
		Projects: /dev/null/inferredProject1*
After ensureProjectForOpenFiles:
Project '/dev/null/inferredProject1*' (Inferred)
	Files (3)

-----------------------------------------------
Open files: 
	FileName: /a/b/commonFile1.ts ProjectRootPath: undefined
		Projects: /dev/null/inferredProject1*
request:{"seq":0,"type":"request","command":"semanticDiagnosticsSync","arguments":{"file":"/a/b/commonFile1.ts"}}
response:{"response":[],"responseRequired":true}