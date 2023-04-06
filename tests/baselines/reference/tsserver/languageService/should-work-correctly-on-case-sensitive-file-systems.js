currentDirectory:: / useCaseSensitiveFileNames: true
Info 0    [00:00:13.000] Provided types map file "/typesMap.json" doesn't exist
Creating project service
//// [/a/Lib/lib.d.ts]
let x: number

//// [/a/b/app.ts]
let x = 1;


Info 1    [00:00:14.000] Search path: /a/b
Info 2    [00:00:15.000] For info: /a/b/app.ts :: No config files found.
Info 3    [00:00:16.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 4    [00:00:17.000] FileWatcher:: Added:: WatchInfo: /a/Lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 5    [00:00:18.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 6    [00:00:19.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 7    [00:00:20.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 8    [00:00:21.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 9    [00:00:22.000] 	Files (2)
	/a/Lib/lib.d.ts Text-1 "let x: number"
	/a/b/app.ts SVC-1-0 "let x = 1;"


	../Lib/lib.d.ts
	  Default library for target 'es5'
	app.ts
	  Root file specified for compilation

Info 10   [00:00:23.000] -----------------------------------------------
Info 11   [00:00:24.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 11   [00:00:25.000] 	Files (2)

Info 11   [00:00:26.000] -----------------------------------------------
Info 11   [00:00:27.000] Open files: 
Info 11   [00:00:28.000] 	FileName: /a/b/app.ts ProjectRootPath: undefined
Info 11   [00:00:29.000] 		Projects: /dev/null/inferredProject1*