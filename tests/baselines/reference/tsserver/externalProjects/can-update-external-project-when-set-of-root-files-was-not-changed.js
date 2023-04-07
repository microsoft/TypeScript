currentDirectory:: / useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/typesMap.json" doesn't exist
Creating project service
//// [/a/b/f1.ts]
export * from "m"

//// [/a/b/f2.ts]
export let y = 1

//// [/a/m.ts]
export let y = 1


Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/b/f1.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/b/f2.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: project
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /a 1 undefined Project: project WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a 1 undefined Project: project WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /node_modules 1 undefined Project: project WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /node_modules 1 undefined Project: project WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: project WatchType: Missing file
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: project Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project 'project' (External)
Info seq  [hh:mm:ss:mss] 	Files (2)
	/a/b/f1.ts Text-1 "export * from \"m\""
	/a/b/f2.ts Text-1 "export let y = 1"


	a/b/f1.ts
	  Root file specified for compilation
	a/b/f2.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /a 1 undefined Project: project WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /a 1 undefined Project: project WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /node_modules 1 undefined Project: project WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /node_modules 1 undefined Project: project WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: project
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/m.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /a 1 undefined Project: project WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a 1 undefined Project: project WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: project Version: 2 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project 'project' (External)
Info seq  [hh:mm:ss:mss] 	Files (3)
	/a/m.ts Text-1 "export let y = 1"
	/a/b/f1.ts Text-1 "export * from \"m\""
	/a/b/f2.ts Text-1 "export let y = 1"


	a/m.ts
	  Imported via "m" from file 'a/b/f1.ts'
	a/b/f1.ts
	  Root file specified for compilation
	a/b/f2.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------