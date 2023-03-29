currentDirectory:: / useCaseSensitiveFileNames: false
Info 0    [00:00:11.000] Provided types map file "/typesMap.json" doesn't exist
Creating project service
//// [/a/b/f1.ts]
let x =1;

//// [/a/b/f2.ts]
let y =1;


Info 1    [00:00:12.000] FileWatcher:: Added:: WatchInfo: /a/b/f1.ts 500 undefined WatchType: Closed Script info
Info 2    [00:00:13.000] FileWatcher:: Added:: WatchInfo: /a/b/f2.ts 500 undefined WatchType: Closed Script info
Info 3    [00:00:14.000] Starting updateGraphWorker: Project: externalproject
Info 4    [00:00:15.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: externalproject WatchType: Missing file
Info 5    [00:00:16.000] Finishing updateGraphWorker: Project: externalproject Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 6    [00:00:17.000] Project 'externalproject' (External)
Info 7    [00:00:18.000] 	Files (2)
	/a/b/f1.ts Text-1 "let x =1;"
	/a/b/f2.ts Text-1 "let y =1;"


	a/b/f1.ts
	  Root file specified for compilation
	a/b/f2.ts
	  Root file specified for compilation

Info 8    [00:00:19.000] -----------------------------------------------
Info 9    [00:00:20.000] FileWatcher:: Close:: WatchInfo: /a/b/f1.ts 500 undefined WatchType: Closed Script info
Info 10   [00:00:21.000] Project 'externalproject' (External)
Info 10   [00:00:22.000] 	Files (2)

Info 10   [00:00:23.000] -----------------------------------------------
Info 10   [00:00:24.000] Open files: 
Info 10   [00:00:25.000] 	FileName: /a/b/f1.ts ProjectRootPath: undefined
Info 10   [00:00:26.000] 		Projects: externalproject
Info 10   [00:00:27.000] FileWatcher:: Added:: WatchInfo: /a/b/f1.ts 500 undefined WatchType: Closed Script info
Info 11   [00:00:28.000] Project 'externalproject' (External)
Info 11   [00:00:29.000] 	Files (2)

Info 11   [00:00:30.000] -----------------------------------------------
Info 11   [00:00:31.000] Open files: 
Info 11   [00:00:32.000] `remove Project::
Info 12   [00:00:33.000] Project 'externalproject' (External)
Info 13   [00:00:34.000] 	Files (2)
	/a/b/f1.ts
	/a/b/f2.ts


	a/b/f1.ts
	  Root file specified for compilation
	a/b/f2.ts
	  Root file specified for compilation

Info 14   [00:00:35.000] -----------------------------------------------
Info 15   [00:00:36.000] FileWatcher:: Close:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: externalproject WatchType: Missing file