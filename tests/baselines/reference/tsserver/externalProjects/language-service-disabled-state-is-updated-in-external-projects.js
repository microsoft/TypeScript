currentDirectory:: / useCaseSensitiveFileNames: false
Info 0    [00:00:09.000] Provided types map file "/typesMap.json" doesn't exist
Creating project service
//// [/a/app.js]
var x = 1

//// [/a/largefile.js]



Info 1    [00:00:10.000] Non TS file size exceeded limit (20971530). Largest files: /a/largefile.js:20971521, /a/app.js:9
Info 2    [00:00:11.000] FileWatcher:: Added:: WatchInfo: /a/app.js 500 undefined WatchType: Closed Script info
Info 3    [00:00:12.000] FileWatcher:: Added:: WatchInfo: /a/largefile.js 500 undefined WatchType: Closed Script info
Info 4    [00:00:13.000] Starting updateGraphWorker: Project: /a/proj.csproj
Info 5    [00:00:14.000] Finishing updateGraphWorker: Project: /a/proj.csproj Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 6    [00:00:15.000] Project '/a/proj.csproj' (External)
Info 7    [00:00:16.000] 	Files (0)



Info 8    [00:00:17.000] -----------------------------------------------
Info 9    [00:00:18.000] Starting updateGraphWorker: Project: /a/proj.csproj
Info 10   [00:00:19.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /a/proj.csproj WatchType: Missing file
Info 11   [00:00:20.000] DirectoryWatcher:: Added:: WatchInfo: /a/node_modules/@types 1 undefined Project: /a/proj.csproj WatchType: Type roots
Info 12   [00:00:21.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/node_modules/@types 1 undefined Project: /a/proj.csproj WatchType: Type roots
Info 13   [00:00:22.000] Finishing updateGraphWorker: Project: /a/proj.csproj Version: 2 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 14   [00:00:23.000] Project '/a/proj.csproj' (External)
Info 15   [00:00:24.000] 	Files (1)
	/a/app.js Text-1 "var x = 1"


	app.js
	  Root file specified for compilation

Info 16   [00:00:25.000] -----------------------------------------------
Info 17   [00:00:26.000] Non TS file size exceeded limit (20971530). Largest files: /a/largefile.js:20971521, /a/app.js:9
Info 18   [00:00:27.000] DirectoryWatcher:: Close:: WatchInfo: /a/node_modules/@types 1 undefined Project: /a/proj.csproj WatchType: Type roots
Info 19   [00:00:28.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /a/node_modules/@types 1 undefined Project: /a/proj.csproj WatchType: Type roots
Info 20   [00:00:29.000] Starting updateGraphWorker: Project: /a/proj.csproj
Info 21   [00:00:30.000] FileWatcher:: Close:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /a/proj.csproj WatchType: Missing file
Info 22   [00:00:31.000] Finishing updateGraphWorker: Project: /a/proj.csproj Version: 3 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 23   [00:00:32.000] Project '/a/proj.csproj' (External)
Info 24   [00:00:33.000] 	Files (0)



Info 25   [00:00:34.000] -----------------------------------------------