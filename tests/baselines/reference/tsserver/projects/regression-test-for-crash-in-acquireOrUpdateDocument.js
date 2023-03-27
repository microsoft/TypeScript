currentDirectory:: / useCaseSensitiveFileNames: false
Info 0    [00:00:03.000] Provided types map file "/typesMap.json" doesn't exist
Creating project service

Info 1    [00:00:04.000] Search path: /a/b
Info 2    [00:00:05.000] For info: /a/b/file1.ts :: No config files found.
Info 3    [00:00:06.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 4    [00:00:07.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /dev/null/inferredProject1* WatchType: Missing file
Info 5    [00:00:08.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 6    [00:00:09.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 7    [00:00:10.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 8    [00:00:11.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 9    [00:00:12.000] 	Files (1)
	/a/b/file1.ts SVC-1-0 ""


	file1.ts
	  Root file specified for compilation

Info 10   [00:00:13.000] -----------------------------------------------
Info 11   [00:00:14.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 11   [00:00:15.000] 	Files (1)

Info 11   [00:00:16.000] -----------------------------------------------
Info 11   [00:00:17.000] Open files: 
Info 11   [00:00:18.000] 	FileName: /a/b/file1.ts ProjectRootPath: undefined
Info 11   [00:00:19.000] 		Projects: /dev/null/inferredProject1*
Info 11   [00:00:20.000] Search path: /a/b
Info 12   [00:00:21.000] For info: /a/b/file1.js :: No config files found.
Info 13   [00:00:22.000] Starting updateGraphWorker: Project: /dev/null/inferredProject2*
Info 14   [00:00:23.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /dev/null/inferredProject2* WatchType: Missing file
Info 15   [00:00:24.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /dev/null/inferredProject2* WatchType: Type roots
Info 16   [00:00:25.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /dev/null/inferredProject2* WatchType: Type roots
Info 17   [00:00:26.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject2* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 18   [00:00:27.000] Project '/dev/null/inferredProject2*' (Inferred)
Info 19   [00:00:28.000] 	Files (1)
	/a/b/file1.js SVC-1-0 "var x = 10;"


	file1.js
	  Root file specified for compilation

Info 20   [00:00:29.000] -----------------------------------------------
Info 21   [00:00:30.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 21   [00:00:31.000] 	Files (1)

Info 21   [00:00:32.000] -----------------------------------------------
Info 21   [00:00:33.000] Project '/dev/null/inferredProject2*' (Inferred)
Info 21   [00:00:34.000] 	Files (1)

Info 21   [00:00:35.000] -----------------------------------------------
Info 21   [00:00:36.000] Open files: 
Info 21   [00:00:37.000] 	FileName: /a/b/file1.ts ProjectRootPath: undefined
Info 21   [00:00:38.000] 		Projects: /dev/null/inferredProject1*
Info 21   [00:00:39.000] 	FileName: /a/b/file1.js ProjectRootPath: undefined
Info 21   [00:00:40.000] 		Projects: /dev/null/inferredProject2*