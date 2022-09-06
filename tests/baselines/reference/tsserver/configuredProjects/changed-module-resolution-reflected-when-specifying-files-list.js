Info 0    [16:00:17.000] Provided types map file "/typesMap.json" doesn't exist
Info 1    [16:00:18.000] Search path: /a/b
Info 2    [16:00:19.000] For info: /a/b/file1.ts :: Config file name: /a/b/tsconfig.json
Info 3    [16:00:20.000] Creating configuration project /a/b/tsconfig.json
Info 4    [16:00:21.000] FileWatcher:: Added:: WatchInfo: /a/b/tsconfig.json 2000 undefined Project: /a/b/tsconfig.json WatchType: Config file
Info 5    [16:00:22.000] Config: /a/b/tsconfig.json : {
 "rootNames": [
  "/a/b/file1.ts"
 ],
 "options": {
  "module": 2,
  "configFilePath": "/a/b/tsconfig.json"
 }
}
Info 6    [16:00:23.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 7    [16:00:24.000] Starting updateGraphWorker: Project: /a/b/tsconfig.json
Info 8    [16:00:25.000] FileWatcher:: Added:: WatchInfo: /a/file2.ts 500 undefined WatchType: Closed Script info
Info 9    [16:00:26.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 10   [16:00:27.000] DirectoryWatcher:: Added:: WatchInfo: /a/b 0 undefined Project: /a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 11   [16:00:28.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b 0 undefined Project: /a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 12   [16:00:29.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/tsconfig.json WatchType: Type roots
Info 13   [16:00:30.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/tsconfig.json WatchType: Type roots
Info 14   [16:00:31.000] Finishing updateGraphWorker: Project: /a/b/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 15   [16:00:32.000] Project '/a/b/tsconfig.json' (Configured)
Info 16   [16:00:33.000] 	Files (3)
	/a/lib/lib.d.ts
	/a/file2.ts
	/a/b/file1.ts


	../lib/lib.d.ts
	  Default library for target 'es3'
	../file2.ts
	  Imported via "file2" from file 'file1.ts'
	file1.ts
	  Part of 'files' list in tsconfig.json

Info 17   [16:00:34.000] -----------------------------------------------
Info 18   [16:00:35.000] Project '/a/b/tsconfig.json' (Configured)
Info 18   [16:00:36.000] 	Files (3)

Info 18   [16:00:37.000] -----------------------------------------------
Info 18   [16:00:38.000] Open files: 
Info 18   [16:00:39.000] 	FileName: /a/b/file1.ts ProjectRootPath: undefined
Info 18   [16:00:40.000] 		Projects: /a/b/tsconfig.json
Info 18   [16:00:43.000] DirectoryWatcher:: Triggered with /a/b/file2.ts :: WatchInfo: /a/b 0 undefined Project: /a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 19   [16:00:44.000] Scheduled: /a/b/tsconfig.jsonFailedLookupInvalidation
Info 20   [16:00:45.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /a/b/file2.ts :: WatchInfo: /a/b 0 undefined Project: /a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 21   [16:00:46.000] Running: /a/b/tsconfig.jsonFailedLookupInvalidation
Info 22   [16:00:47.000] Scheduled: /a/b/tsconfig.json
Info 23   [16:00:48.000] Scheduled: *ensureProjectForOpenFiles*
Info 24   [16:00:49.000] Running: /a/b/tsconfig.json
Info 25   [16:00:50.000] Starting updateGraphWorker: Project: /a/b/tsconfig.json
Info 26   [16:00:51.000] FileWatcher:: Added:: WatchInfo: /a/b/file2.ts 500 undefined WatchType: Closed Script info
Info 27   [16:00:52.000] DirectoryWatcher:: Close:: WatchInfo: /a/b 0 undefined Project: /a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 28   [16:00:53.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /a/b 0 undefined Project: /a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 29   [16:00:54.000] Finishing updateGraphWorker: Project: /a/b/tsconfig.json Version: 2 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info 30   [16:00:55.000] Project '/a/b/tsconfig.json' (Configured)
Info 31   [16:00:56.000] 	Files (3)
	/a/lib/lib.d.ts
	/a/b/file2.ts
	/a/b/file1.ts


	../lib/lib.d.ts
	  Default library for target 'es3'
	file2.ts
	  Imported via "file2" from file 'file1.ts'
	file1.ts
	  Part of 'files' list in tsconfig.json

Info 32   [16:00:57.000] -----------------------------------------------
Info 33   [16:00:58.000] Running: *ensureProjectForOpenFiles*
Info 34   [16:00:59.000] Before ensureProjectForOpenFiles:
Info 35   [16:01:00.000] Project '/a/b/tsconfig.json' (Configured)
Info 35   [16:01:01.000] 	Files (3)

Info 35   [16:01:02.000] -----------------------------------------------
Info 35   [16:01:03.000] Open files: 
Info 35   [16:01:04.000] 	FileName: /a/b/file1.ts ProjectRootPath: undefined
Info 35   [16:01:05.000] 		Projects: /a/b/tsconfig.json
Info 35   [16:01:06.000] After ensureProjectForOpenFiles:
Info 36   [16:01:07.000] Project '/a/b/tsconfig.json' (Configured)
Info 36   [16:01:08.000] 	Files (3)

Info 36   [16:01:09.000] -----------------------------------------------
Info 36   [16:01:10.000] Open files: 
Info 36   [16:01:11.000] 	FileName: /a/b/file1.ts ProjectRootPath: undefined
Info 36   [16:01:12.000] 		Projects: /a/b/tsconfig.json
Info 36   [16:01:13.000] FileWatcher:: Close:: WatchInfo: /a/b/file2.ts 500 undefined WatchType: Closed Script info
Info 37   [16:01:14.000] Search path: /a/b
Info 38   [16:01:15.000] For info: /a/b/file2.ts :: Config file name: /a/b/tsconfig.json
Info 39   [16:01:16.000] FileWatcher:: Close:: WatchInfo: /a/file2.ts 500 undefined WatchType: Closed Script info
Info 40   [16:01:17.000] Project '/a/b/tsconfig.json' (Configured)
Info 40   [16:01:18.000] 	Files (3)

Info 40   [16:01:19.000] -----------------------------------------------
Info 40   [16:01:20.000] Open files: 
Info 40   [16:01:21.000] 	FileName: /a/b/file1.ts ProjectRootPath: undefined
Info 40   [16:01:22.000] 		Projects: /a/b/tsconfig.json
Info 40   [16:01:23.000] 	FileName: /a/b/file2.ts ProjectRootPath: undefined
Info 40   [16:01:24.000] 		Projects: /a/b/tsconfig.json