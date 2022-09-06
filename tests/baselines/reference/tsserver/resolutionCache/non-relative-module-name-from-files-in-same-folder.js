Info 0    [16:00:37.000] Provided types map file "/typesMap.json" doesn't exist
Info 1    [16:00:38.000] Search path: /user/username/projects/myproject/src
Info 2    [16:00:39.000] For info: /user/username/projects/myproject/src/file1.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 3    [16:00:40.000] Creating configuration project /user/username/projects/myproject/tsconfig.json
Info 4    [16:00:41.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info 5    [16:00:42.000] Config: /user/username/projects/myproject/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/src/file1.ts",
  "/user/username/projects/myproject/src/file2.ts"
 ],
 "options": {
  "traceResolution": true,
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
 }
}
Info 6    [16:00:43.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 7    [16:00:44.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 8    [16:00:45.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 9    [16:00:46.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/file2.ts 500 undefined WatchType: Closed Script info
Info 10   [16:00:47.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json
Info 11   [16:00:48.000] ======== Resolving module 'module1' from '/user/username/projects/myproject/src/file1.ts'. ========
Info 12   [16:00:49.000] Module resolution kind is not specified, using 'NodeJs'.
Info 13   [16:00:50.000] Loading module 'module1' from 'node_modules' folder, target file type 'TypeScript'.
Info 14   [16:00:51.000] File '/user/username/projects/myproject/src/node_modules/module1/package.json' does not exist.
Info 15   [16:00:52.000] File '/user/username/projects/myproject/src/node_modules/module1.ts' does not exist.
Info 16   [16:00:53.000] File '/user/username/projects/myproject/src/node_modules/module1.tsx' does not exist.
Info 17   [16:00:54.000] File '/user/username/projects/myproject/src/node_modules/module1.d.ts' does not exist.
Info 18   [16:00:55.000] File '/user/username/projects/myproject/src/node_modules/module1/index.ts' exist - use it as a name resolution result.
Info 19   [16:00:56.000] Resolving real path for '/user/username/projects/myproject/src/node_modules/module1/index.ts', result '/user/username/projects/myproject/src/node_modules/module1/index.ts'.
Info 20   [16:00:57.000] ======== Module name 'module1' was successfully resolved to '/user/username/projects/myproject/src/node_modules/module1/index.ts'. ========
Info 21   [16:00:58.000] ======== Resolving module 'module2' from '/user/username/projects/myproject/src/file1.ts'. ========
Info 22   [16:00:59.000] Module resolution kind is not specified, using 'NodeJs'.
Info 23   [16:01:00.000] Loading module 'module2' from 'node_modules' folder, target file type 'TypeScript'.
Info 24   [16:01:01.000] File '/user/username/projects/myproject/src/node_modules/module2.ts' does not exist.
Info 25   [16:01:02.000] File '/user/username/projects/myproject/src/node_modules/module2.tsx' does not exist.
Info 26   [16:01:03.000] File '/user/username/projects/myproject/src/node_modules/module2.d.ts' does not exist.
Info 27   [16:01:04.000] Directory '/user/username/projects/myproject/src/node_modules/@types' does not exist, skipping all lookups in it.
Info 28   [16:01:05.000] File '/user/username/projects/myproject/node_modules/module2/package.json' does not exist.
Info 29   [16:01:06.000] File '/user/username/projects/myproject/node_modules/module2.ts' does not exist.
Info 30   [16:01:07.000] File '/user/username/projects/myproject/node_modules/module2.tsx' does not exist.
Info 31   [16:01:08.000] File '/user/username/projects/myproject/node_modules/module2.d.ts' does not exist.
Info 32   [16:01:09.000] File '/user/username/projects/myproject/node_modules/module2/index.ts' exist - use it as a name resolution result.
Info 33   [16:01:10.000] Resolving real path for '/user/username/projects/myproject/node_modules/module2/index.ts', result '/user/username/projects/myproject/node_modules/module2/index.ts'.
Info 34   [16:01:11.000] ======== Module name 'module2' was successfully resolved to '/user/username/projects/myproject/node_modules/module2/index.ts'. ========
Info 35   [16:01:12.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info 36   [16:01:13.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info 37   [16:01:14.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info 38   [16:01:15.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info 39   [16:01:16.000] Reusing resolution of module 'module1' from '/user/username/projects/myproject/src/file2.ts' found in cache from location '/user/username/projects/myproject/src', it was successfully resolved to '/user/username/projects/myproject/src/node_modules/module1/index.ts'.
Info 40   [16:01:17.000] Reusing resolution of module 'module2' from '/user/username/projects/myproject/src/file2.ts' found in cache from location '/user/username/projects/myproject/src', it was successfully resolved to '/user/username/projects/myproject/node_modules/module2/index.ts'.
Info 41   [16:01:18.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 42   [16:01:19.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 43   [16:01:20.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 44   [16:01:21.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 45   [16:01:22.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 46   [16:01:23.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 47   [16:01:24.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 48   [16:01:25.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 49   [16:01:26.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 50   [16:01:27.000] 	Files (5)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/src/node_modules/module1/index.ts
	/user/username/projects/myproject/node_modules/module2/index.ts
	/user/username/projects/myproject/src/file1.ts
	/user/username/projects/myproject/src/file2.ts


	../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	src/node_modules/module1/index.ts
	  Imported via "module1" from file 'src/file1.ts'
	  Imported via "module1" from file 'src/file2.ts'
	node_modules/module2/index.ts
	  Imported via "module2" from file 'src/file1.ts'
	  Imported via "module2" from file 'src/file2.ts'
	src/file1.ts
	  Matched by default include pattern '**/*'
	src/file2.ts
	  Matched by default include pattern '**/*'

Info 51   [16:01:28.000] -----------------------------------------------
Info 52   [16:01:29.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 52   [16:01:30.000] 	Files (5)

Info 52   [16:01:31.000] -----------------------------------------------
Info 52   [16:01:32.000] Open files: 
Info 52   [16:01:33.000] 	FileName: /user/username/projects/myproject/src/file1.ts ProjectRootPath: undefined
Info 52   [16:01:34.000] 		Projects: /user/username/projects/myproject/tsconfig.json
Info 52   [16:01:41.000] FileWatcher:: Triggered with /user/username/projects/myproject/src/file2.ts 1:: WatchInfo: /user/username/projects/myproject/src/file2.ts 500 undefined WatchType: Closed Script info
Info 53   [16:01:42.000] Scheduled: /user/username/projects/myproject/tsconfig.json
Info 54   [16:01:43.000] Scheduled: *ensureProjectForOpenFiles*
Info 55   [16:01:44.000] Elapsed:: *ms FileWatcher:: Triggered with /user/username/projects/myproject/src/file2.ts 1:: WatchInfo: /user/username/projects/myproject/src/file2.ts 500 undefined WatchType: Closed Script info
Info 56   [16:01:45.000] Running: /user/username/projects/myproject/tsconfig.json
Info 57   [16:01:46.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json
Info 58   [16:01:47.000] Reusing resolution of module 'module1' from '/user/username/projects/myproject/src/file1.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/node_modules/module1/index.ts'.
Info 59   [16:01:48.000] Reusing resolution of module 'module2' from '/user/username/projects/myproject/src/file1.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/node_modules/module2/index.ts'.
Info 60   [16:01:49.000] Reusing resolution of module 'module1' from '/user/username/projects/myproject/src/file2.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/node_modules/module1/index.ts'.
Info 61   [16:01:50.000] Reusing resolution of module 'module2' from '/user/username/projects/myproject/src/file2.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/node_modules/module2/index.ts'.
Info 62   [16:01:51.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json Version: 2 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info 63   [16:01:52.000] Different program with same set of files
Info 64   [16:01:53.000] Running: *ensureProjectForOpenFiles*
Info 65   [16:01:54.000] Before ensureProjectForOpenFiles:
Info 66   [16:01:55.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 66   [16:01:56.000] 	Files (5)

Info 66   [16:01:57.000] -----------------------------------------------
Info 66   [16:01:58.000] Open files: 
Info 66   [16:01:59.000] 	FileName: /user/username/projects/myproject/src/file1.ts ProjectRootPath: undefined
Info 66   [16:02:00.000] 		Projects: /user/username/projects/myproject/tsconfig.json
Info 66   [16:02:01.000] After ensureProjectForOpenFiles:
Info 67   [16:02:02.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 67   [16:02:03.000] 	Files (5)

Info 67   [16:02:04.000] -----------------------------------------------
Info 67   [16:02:05.000] Open files: 
Info 67   [16:02:06.000] 	FileName: /user/username/projects/myproject/src/file1.ts ProjectRootPath: undefined
Info 67   [16:02:07.000] 		Projects: /user/username/projects/myproject/tsconfig.json