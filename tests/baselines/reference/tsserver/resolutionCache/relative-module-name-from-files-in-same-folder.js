Info 0    [16:00:29.000] Provided types map file "/typesMap.json" doesn't exist
Info 1    [16:00:30.000] Search path: /user/username/projects/myproject/src
Info 2    [16:00:31.000] For info: /user/username/projects/myproject/src/file1.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 3    [16:00:32.000] Creating configuration project /user/username/projects/myproject/tsconfig.json
Info 4    [16:00:33.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info 5    [16:00:34.000] Config: /user/username/projects/myproject/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/module2.ts",
  "/user/username/projects/myproject/src/file1.ts",
  "/user/username/projects/myproject/src/file2.ts",
  "/user/username/projects/myproject/src/module1.ts"
 ],
 "options": {
  "traceResolution": true,
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
 }
}
Info 6    [16:00:35.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 7    [16:00:36.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 8    [16:00:37.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 9    [16:00:38.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/module2.ts 500 undefined WatchType: Closed Script info
Info 10   [16:00:39.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/file2.ts 500 undefined WatchType: Closed Script info
Info 11   [16:00:40.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/module1.ts 500 undefined WatchType: Closed Script info
Info 12   [16:00:41.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json
Info 13   [16:00:42.000] ======== Resolving module './module1' from '/user/username/projects/myproject/src/file1.ts'. ========
Info 14   [16:00:43.000] Module resolution kind is not specified, using 'NodeJs'.
Info 15   [16:00:44.000] Loading module as file / folder, candidate module location '/user/username/projects/myproject/src/module1', target file type 'TypeScript'.
Info 16   [16:00:45.000] File '/user/username/projects/myproject/src/module1.ts' exist - use it as a name resolution result.
Info 17   [16:00:46.000] ======== Module name './module1' was successfully resolved to '/user/username/projects/myproject/src/module1.ts'. ========
Info 18   [16:00:47.000] ======== Resolving module '../module2' from '/user/username/projects/myproject/src/file1.ts'. ========
Info 19   [16:00:48.000] Module resolution kind is not specified, using 'NodeJs'.
Info 20   [16:00:49.000] Loading module as file / folder, candidate module location '/user/username/projects/myproject/module2', target file type 'TypeScript'.
Info 21   [16:00:50.000] File '/user/username/projects/myproject/module2.ts' exist - use it as a name resolution result.
Info 22   [16:00:51.000] ======== Module name '../module2' was successfully resolved to '/user/username/projects/myproject/module2.ts'. ========
Info 23   [16:00:52.000] Reusing resolution of module './module1' from '/user/username/projects/myproject/src/file2.ts' found in cache from location '/user/username/projects/myproject/src', it was successfully resolved to '/user/username/projects/myproject/src/module1.ts'.
Info 24   [16:00:53.000] Reusing resolution of module '../module2' from '/user/username/projects/myproject/src/file2.ts' found in cache from location '/user/username/projects/myproject/src', it was successfully resolved to '/user/username/projects/myproject/module2.ts'.
Info 25   [16:00:54.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 26   [16:00:55.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 27   [16:00:56.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 28   [16:00:57.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 29   [16:00:58.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 30   [16:00:59.000] 	Files (5)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/module2.ts
	/user/username/projects/myproject/src/module1.ts
	/user/username/projects/myproject/src/file1.ts
	/user/username/projects/myproject/src/file2.ts


	../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	module2.ts
	  Matched by default include pattern '**/*'
	  Imported via "../module2" from file 'src/file1.ts'
	  Imported via "../module2" from file 'src/file2.ts'
	src/module1.ts
	  Imported via "./module1" from file 'src/file1.ts'
	  Imported via "./module1" from file 'src/file2.ts'
	  Matched by default include pattern '**/*'
	src/file1.ts
	  Matched by default include pattern '**/*'
	src/file2.ts
	  Matched by default include pattern '**/*'

Info 31   [16:01:00.000] -----------------------------------------------
Info 32   [16:01:01.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 32   [16:01:02.000] 	Files (5)

Info 32   [16:01:03.000] -----------------------------------------------
Info 32   [16:01:04.000] Open files: 
Info 32   [16:01:05.000] 	FileName: /user/username/projects/myproject/src/file1.ts ProjectRootPath: undefined
Info 32   [16:01:06.000] 		Projects: /user/username/projects/myproject/tsconfig.json
Info 32   [16:01:13.000] FileWatcher:: Triggered with /user/username/projects/myproject/src/file2.ts 1:: WatchInfo: /user/username/projects/myproject/src/file2.ts 500 undefined WatchType: Closed Script info
Info 33   [16:01:14.000] Scheduled: /user/username/projects/myproject/tsconfig.json
Info 34   [16:01:15.000] Scheduled: *ensureProjectForOpenFiles*
Info 35   [16:01:16.000] Elapsed:: *ms FileWatcher:: Triggered with /user/username/projects/myproject/src/file2.ts 1:: WatchInfo: /user/username/projects/myproject/src/file2.ts 500 undefined WatchType: Closed Script info
Info 36   [16:01:17.000] Running: /user/username/projects/myproject/tsconfig.json
Info 37   [16:01:18.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json
Info 38   [16:01:19.000] Reusing resolution of module './module1' from '/user/username/projects/myproject/src/file1.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/module1.ts'.
Info 39   [16:01:20.000] Reusing resolution of module '../module2' from '/user/username/projects/myproject/src/file1.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/module2.ts'.
Info 40   [16:01:21.000] Reusing resolution of module './module1' from '/user/username/projects/myproject/src/file2.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/module1.ts'.
Info 41   [16:01:22.000] Reusing resolution of module '../module2' from '/user/username/projects/myproject/src/file2.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/module2.ts'.
Info 42   [16:01:23.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json Version: 2 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info 43   [16:01:24.000] Different program with same set of files
Info 44   [16:01:25.000] Running: *ensureProjectForOpenFiles*
Info 45   [16:01:26.000] Before ensureProjectForOpenFiles:
Info 46   [16:01:27.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 46   [16:01:28.000] 	Files (5)

Info 46   [16:01:29.000] -----------------------------------------------
Info 46   [16:01:30.000] Open files: 
Info 46   [16:01:31.000] 	FileName: /user/username/projects/myproject/src/file1.ts ProjectRootPath: undefined
Info 46   [16:01:32.000] 		Projects: /user/username/projects/myproject/tsconfig.json
Info 46   [16:01:33.000] After ensureProjectForOpenFiles:
Info 47   [16:01:34.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 47   [16:01:35.000] 	Files (5)

Info 47   [16:01:36.000] -----------------------------------------------
Info 47   [16:01:37.000] Open files: 
Info 47   [16:01:38.000] 	FileName: /user/username/projects/myproject/src/file1.ts ProjectRootPath: undefined
Info 47   [16:01:39.000] 		Projects: /user/username/projects/myproject/tsconfig.json