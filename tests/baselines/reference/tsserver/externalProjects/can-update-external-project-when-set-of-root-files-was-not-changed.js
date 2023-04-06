currentDirectory:: / useCaseSensitiveFileNames: false
Info 0    [00:00:13.000] Provided types map file "/typesMap.json" doesn't exist
Creating project service
//// [/a/b/f1.ts]
export * from "m"

//// [/a/b/f2.ts]
export let y = 1

//// [/a/m.ts]
export let y = 1


Info 1    [00:00:14.000] FileWatcher:: Added:: WatchInfo: /a/b/f1.ts 500 undefined WatchType: Closed Script info
Info 2    [00:00:15.000] FileWatcher:: Added:: WatchInfo: /a/b/f2.ts 500 undefined WatchType: Closed Script info
Info 3    [00:00:16.000] Starting updateGraphWorker: Project: project
Info 4    [00:00:17.000] DirectoryWatcher:: Added:: WatchInfo: /a 1 undefined Project: project WatchType: Failed Lookup Locations
Info 5    [00:00:18.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a 1 undefined Project: project WatchType: Failed Lookup Locations
Info 6    [00:00:19.000] DirectoryWatcher:: Added:: WatchInfo: /node_modules 1 undefined Project: project WatchType: Failed Lookup Locations
Info 7    [00:00:20.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /node_modules 1 undefined Project: project WatchType: Failed Lookup Locations
Info 8    [00:00:21.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: project WatchType: Missing file
Info 9    [00:00:22.000] Finishing updateGraphWorker: Project: project Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 10   [00:00:23.000] Project 'project' (External)
Info 11   [00:00:24.000] 	Files (2)
	/a/b/f1.ts Text-1 "export * from \"m\""
	/a/b/f2.ts Text-1 "export let y = 1"


	a/b/f1.ts
	  Root file specified for compilation
	a/b/f2.ts
	  Root file specified for compilation

Info 12   [00:00:25.000] -----------------------------------------------
Info 13   [00:00:26.000] DirectoryWatcher:: Close:: WatchInfo: /a 1 undefined Project: project WatchType: Failed Lookup Locations
Info 14   [00:00:27.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /a 1 undefined Project: project WatchType: Failed Lookup Locations
Info 15   [00:00:28.000] DirectoryWatcher:: Close:: WatchInfo: /node_modules 1 undefined Project: project WatchType: Failed Lookup Locations
Info 16   [00:00:29.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /node_modules 1 undefined Project: project WatchType: Failed Lookup Locations
Info 17   [00:00:30.000] Starting updateGraphWorker: Project: project
Info 18   [00:00:31.000] FileWatcher:: Added:: WatchInfo: /a/m.ts 500 undefined WatchType: Closed Script info
Info 19   [00:00:32.000] DirectoryWatcher:: Added:: WatchInfo: /a 1 undefined Project: project WatchType: Failed Lookup Locations
Info 20   [00:00:33.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a 1 undefined Project: project WatchType: Failed Lookup Locations
Info 21   [00:00:34.000] Finishing updateGraphWorker: Project: project Version: 2 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 22   [00:00:35.000] Project 'project' (External)
Info 23   [00:00:36.000] 	Files (3)
	/a/m.ts Text-1 "export let y = 1"
	/a/b/f1.ts Text-1 "export * from \"m\""
	/a/b/f2.ts Text-1 "export let y = 1"


	a/m.ts
	  Imported via "m" from file 'a/b/f1.ts'
	a/b/f1.ts
	  Root file specified for compilation
	a/b/f2.ts
	  Root file specified for compilation

Info 24   [00:00:37.000] -----------------------------------------------