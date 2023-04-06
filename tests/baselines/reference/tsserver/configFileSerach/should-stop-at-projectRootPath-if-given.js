currentDirectory:: / useCaseSensitiveFileNames: false
Info 0    [00:00:09.000] Provided types map file "/typesMap.json" doesn't exist
Creating project service
//// [/a/file1.ts]


//// [/tsconfig.json]
{}


Info 1    [00:00:10.000] Search path: /a
Info 2    [00:00:11.000] For info: /a/file1.ts :: No config files found.
Info 3    [00:00:12.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 4    [00:00:13.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /dev/null/inferredProject1* WatchType: Missing file
Info 5    [00:00:14.000] DirectoryWatcher:: Added:: WatchInfo: /a/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 6    [00:00:15.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 7    [00:00:16.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 8    [00:00:17.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 9    [00:00:18.000] 	Files (1)
	/a/file1.ts SVC-1-0 ""


	file1.ts
	  Root file specified for compilation

Info 10   [00:00:19.000] -----------------------------------------------
Info 11   [00:00:20.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 11   [00:00:21.000] 	Files (1)

Info 11   [00:00:22.000] -----------------------------------------------
Info 11   [00:00:23.000] Open files: 
Info 11   [00:00:24.000] 	FileName: /a/file1.ts ProjectRootPath: /a
Info 11   [00:00:25.000] 		Projects: /dev/null/inferredProject1*
Info 11   [00:00:26.000] FileWatcher:: Added:: WatchInfo: /a/file1.ts 500 undefined WatchType: Closed Script info
Info 12   [00:00:27.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 12   [00:00:28.000] 	Files (1)

Info 12   [00:00:29.000] -----------------------------------------------
Info 12   [00:00:30.000] Open files: 
Info 12   [00:00:31.000] FileWatcher:: Close:: WatchInfo: /a/file1.ts 500 undefined WatchType: Closed Script info
Info 13   [00:00:32.000] Search path: /a
Info 14   [00:00:33.000] For info: /a/file1.ts :: Config file name: /tsconfig.json
Info 15   [00:00:34.000] Creating configuration project /tsconfig.json
Info 16   [00:00:35.000] FileWatcher:: Added:: WatchInfo: /tsconfig.json 2000 undefined Project: /tsconfig.json WatchType: Config file
Info 17   [00:00:36.000] Config: /tsconfig.json : {
 "rootNames": [
  "/a/file1.ts"
 ],
 "options": {
  "configFilePath": "/tsconfig.json"
 }
}
Info 18   [00:00:37.000] DirectoryWatcher:: Added:: WatchInfo:  1 undefined Config: /tsconfig.json WatchType: Wild card directory
Info 19   [00:00:38.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo:  1 undefined Config: /tsconfig.json WatchType: Wild card directory
Info 20   [00:00:39.000] Starting updateGraphWorker: Project: /tsconfig.json
Info 21   [00:00:40.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /tsconfig.json WatchType: Missing file
Info 22   [00:00:41.000] Finishing updateGraphWorker: Project: /tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 23   [00:00:42.000] Project '/tsconfig.json' (Configured)
Info 24   [00:00:43.000] 	Files (1)
	/a/file1.ts SVC-1-0 ""


	a/file1.ts
	  Matched by default include pattern '**/*'

Info 25   [00:00:44.000] -----------------------------------------------
Info 26   [00:00:45.000] `remove Project::
Info 27   [00:00:46.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 28   [00:00:47.000] 	Files (1)
	/a/file1.ts


	file1.ts
	  Root file specified for compilation

Info 29   [00:00:48.000] -----------------------------------------------
Info 30   [00:00:49.000] DirectoryWatcher:: Close:: WatchInfo: /a/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 31   [00:00:50.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /a/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 32   [00:00:51.000] FileWatcher:: Close:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /dev/null/inferredProject1* WatchType: Missing file
Info 33   [00:00:52.000] Project '/tsconfig.json' (Configured)
Info 33   [00:00:53.000] 	Files (1)

Info 33   [00:00:54.000] -----------------------------------------------
Info 33   [00:00:55.000] Open files: 
Info 33   [00:00:56.000] 	FileName: /a/file1.ts ProjectRootPath: undefined
Info 33   [00:00:57.000] 		Projects: /tsconfig.json