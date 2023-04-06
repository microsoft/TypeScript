currentDirectory:: / useCaseSensitiveFileNames: false
Info 0    [00:00:19.000] Provided types map file "/typesMap.json" doesn't exist
Creating project service
//// [/a/b/app.ts]
let x = 1;

//// [/a/b/node_modules/@types/lib1/index.d.ts]
export let a: number

//// [/a/b/tsconfig.json]
{"compilerOptions":{},"exclude":["node_modules"]}


Info 1    [00:00:20.000] Search path: /a/b
Info 2    [00:00:21.000] For info: /a/b/app.ts :: Config file name: /a/b/tsconfig.json
Info 3    [00:00:22.000] Creating configuration project /a/b/tsconfig.json
Info 4    [00:00:23.000] FileWatcher:: Added:: WatchInfo: /a/b/tsconfig.json 2000 undefined Project: /a/b/tsconfig.json WatchType: Config file
Info 5    [00:00:24.000] Config: /a/b/tsconfig.json : {
 "rootNames": [
  "/a/b/app.ts"
 ],
 "options": {
  "configFilePath": "/a/b/tsconfig.json"
 }
}
Info 6    [00:00:25.000] DirectoryWatcher:: Added:: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Info 7    [00:00:26.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Info 8    [00:00:27.000] Starting updateGraphWorker: Project: /a/b/tsconfig.json
Info 9    [00:00:28.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info 10   [00:00:29.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info 11   [00:00:30.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules 1 undefined Project: /a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 12   [00:00:31.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules 1 undefined Project: /a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 13   [00:00:32.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /a/b/tsconfig.json WatchType: Missing file
Info 14   [00:00:33.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/tsconfig.json WatchType: Type roots
Info 15   [00:00:34.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/tsconfig.json WatchType: Type roots
Info 16   [00:00:35.000] Finishing updateGraphWorker: Project: /a/b/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 17   [00:00:36.000] Project '/a/b/tsconfig.json' (Configured)
Info 18   [00:00:37.000] 	Files (2)
	/a/b/app.ts SVC-1-0 "let x = 1;"
	/a/b/node_modules/@types/lib1/index.d.ts Text-1 "export let a: number"


	app.ts
	  Matched by default include pattern '**/*'
	node_modules/@types/lib1/index.d.ts
	  Entry point for implicit type library 'lib1'

Info 19   [00:00:38.000] -----------------------------------------------
Info 20   [00:00:39.000] Project '/a/b/tsconfig.json' (Configured)
Info 20   [00:00:40.000] 	Files (2)

Info 20   [00:00:41.000] -----------------------------------------------
Info 20   [00:00:42.000] Open files: 
Info 20   [00:00:43.000] 	FileName: /a/b/app.ts ProjectRootPath: undefined
Info 20   [00:00:44.000] 		Projects: /a/b/tsconfig.json
Info 20   [00:00:46.000] DirectoryWatcher:: Triggered with /a/b/node_modules/@types/lib1/index.d.ts :: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/tsconfig.json WatchType: Type roots
Info 21   [00:00:47.000] Scheduled: /a/b/tsconfig.json
Info 22   [00:00:48.000] Scheduled: *ensureProjectForOpenFiles*
Info 23   [00:00:49.000] Scheduled: /a/b/tsconfig.jsonFailedLookupInvalidation
Info 24   [00:00:50.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /a/b/node_modules/@types/lib1/index.d.ts :: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/tsconfig.json WatchType: Type roots
Info 25   [00:00:51.000] DirectoryWatcher:: Triggered with /a/b/node_modules/@types/lib1/index.d.ts :: WatchInfo: /a/b/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info 26   [00:00:52.000] DirectoryWatcher:: Close:: WatchInfo: /a/b/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info 27   [00:00:53.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /a/b/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info 28   [00:00:54.000] Scheduled: /a/b/tsconfig.json, Cancelled earlier one
Info 29   [00:00:55.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 30   [00:00:56.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /a/b/node_modules/@types/lib1/index.d.ts :: WatchInfo: /a/b/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info 31   [00:00:57.000] DirectoryWatcher:: Triggered with /a/b/node_modules/@types/lib1/index.d.ts :: WatchInfo: /a/b/node_modules 1 undefined Project: /a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 32   [00:00:58.000] Scheduled: /a/b/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info 33   [00:00:59.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /a/b/node_modules/@types/lib1/index.d.ts :: WatchInfo: /a/b/node_modules 1 undefined Project: /a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 34   [00:01:00.000] DirectoryWatcher:: Triggered with /a/b/node_modules/@types/lib1/index.d.ts :: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Info 35   [00:01:01.000] Project: /a/b/tsconfig.json Detected excluded file: /a/b/node_modules/@types/lib1/index.d.ts
Info 36   [00:01:02.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /a/b/node_modules/@types/lib1/index.d.ts :: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Before running Timeout callback:: count: 3
4: /a/b/tsconfig.json
5: *ensureProjectForOpenFiles*
6: /a/b/tsconfig.jsonFailedLookupInvalidation
//// [/a/b/node_modules/@types/lib1/index.d.ts] deleted

PolledWatches::
/a/lib/lib.d.ts: *new*
  {"pollingInterval":500}

FsWatches::
/a/b/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/a/b: *new*
  {}
/a/b/node_modules: *new*
  {}
/a/b/node_modules/@types: *new*
  {}

Info 37   [00:01:03.000] Running: /a/b/tsconfig.json
Info 38   [00:01:04.000] Starting updateGraphWorker: Project: /a/b/tsconfig.json
Info 39   [00:01:05.000] Finishing updateGraphWorker: Project: /a/b/tsconfig.json Version: 2 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 40   [00:01:06.000] Project '/a/b/tsconfig.json' (Configured)
Info 41   [00:01:07.000] 	Files (1)
	/a/b/app.ts SVC-1-0 "let x = 1;"


	app.ts
	  Matched by default include pattern '**/*'

Info 42   [00:01:08.000] -----------------------------------------------
Info 43   [00:01:09.000] Running: *ensureProjectForOpenFiles*
Info 44   [00:01:10.000] Before ensureProjectForOpenFiles:
Info 45   [00:01:11.000] Project '/a/b/tsconfig.json' (Configured)
Info 45   [00:01:12.000] 	Files (1)

Info 45   [00:01:13.000] -----------------------------------------------
Info 45   [00:01:14.000] Open files: 
Info 45   [00:01:15.000] 	FileName: /a/b/app.ts ProjectRootPath: undefined
Info 45   [00:01:16.000] 		Projects: /a/b/tsconfig.json
Info 45   [00:01:17.000] After ensureProjectForOpenFiles:
Info 46   [00:01:18.000] Project '/a/b/tsconfig.json' (Configured)
Info 46   [00:01:19.000] 	Files (1)

Info 46   [00:01:20.000] -----------------------------------------------
Info 46   [00:01:21.000] Open files: 
Info 46   [00:01:22.000] 	FileName: /a/b/app.ts ProjectRootPath: undefined
Info 46   [00:01:23.000] 		Projects: /a/b/tsconfig.json
After running Timeout callback:: count: 0

Info 46   [00:01:27.000] DirectoryWatcher:: Triggered with /a/b/node_modules/@types/lib2 :: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/tsconfig.json WatchType: Type roots
Info 47   [00:01:28.000] Scheduled: /a/b/tsconfig.json
Info 48   [00:01:29.000] Scheduled: *ensureProjectForOpenFiles*
Info 49   [00:01:30.000] Scheduled: /a/b/tsconfig.jsonFailedLookupInvalidation
Info 50   [00:01:31.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /a/b/node_modules/@types/lib2 :: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/tsconfig.json WatchType: Type roots
Info 51   [00:01:32.000] DirectoryWatcher:: Triggered with /a/b/node_modules/@types/lib2 :: WatchInfo: /a/b/node_modules 1 undefined Project: /a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 52   [00:01:33.000] Scheduled: /a/b/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info 53   [00:01:34.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /a/b/node_modules/@types/lib2 :: WatchInfo: /a/b/node_modules 1 undefined Project: /a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 54   [00:01:35.000] DirectoryWatcher:: Triggered with /a/b/node_modules/@types/lib2 :: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Info 55   [00:01:36.000] Project: /a/b/tsconfig.json Detected excluded file: /a/b/node_modules/@types/lib2
Info 56   [00:01:37.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /a/b/node_modules/@types/lib2 :: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Info 57   [00:01:40.000] DirectoryWatcher:: Triggered with /a/b/node_modules/@types/lib2/index.d.ts :: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/tsconfig.json WatchType: Type roots
Info 58   [00:01:41.000] Scheduled: /a/b/tsconfig.json, Cancelled earlier one
Info 59   [00:01:42.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 60   [00:01:43.000] Scheduled: /a/b/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info 61   [00:01:44.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /a/b/node_modules/@types/lib2/index.d.ts :: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/tsconfig.json WatchType: Type roots
Info 62   [00:01:45.000] DirectoryWatcher:: Triggered with /a/b/node_modules/@types/lib2/index.d.ts :: WatchInfo: /a/b/node_modules 1 undefined Project: /a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 63   [00:01:46.000] Scheduled: /a/b/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info 64   [00:01:47.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /a/b/node_modules/@types/lib2/index.d.ts :: WatchInfo: /a/b/node_modules 1 undefined Project: /a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 65   [00:01:48.000] DirectoryWatcher:: Triggered with /a/b/node_modules/@types/lib2/index.d.ts :: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Info 66   [00:01:49.000] Project: /a/b/tsconfig.json Detected excluded file: /a/b/node_modules/@types/lib2/index.d.ts
Info 67   [00:01:50.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /a/b/node_modules/@types/lib2/index.d.ts :: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Before running Timeout callback:: count: 3
11: /a/b/tsconfig.json
12: *ensureProjectForOpenFiles*
14: /a/b/tsconfig.jsonFailedLookupInvalidation
//// [/a/b/node_modules/@types/lib2/index.d.ts]
export let b: number


Info 68   [00:01:51.000] Running: /a/b/tsconfig.json
Info 69   [00:01:52.000] Starting updateGraphWorker: Project: /a/b/tsconfig.json
Info 70   [00:01:53.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info 71   [00:01:54.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info 72   [00:01:55.000] Finishing updateGraphWorker: Project: /a/b/tsconfig.json Version: 3 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info 73   [00:01:56.000] Project '/a/b/tsconfig.json' (Configured)
Info 74   [00:01:57.000] 	Files (2)
	/a/b/app.ts SVC-1-0 "let x = 1;"
	/a/b/node_modules/@types/lib2/index.d.ts Text-1 "export let b: number"


	app.ts
	  Matched by default include pattern '**/*'
	node_modules/@types/lib2/index.d.ts
	  Entry point for implicit type library 'lib2'

Info 75   [00:01:58.000] -----------------------------------------------
Info 76   [00:01:59.000] Running: *ensureProjectForOpenFiles*
Info 77   [00:02:00.000] Before ensureProjectForOpenFiles:
Info 78   [00:02:01.000] Project '/a/b/tsconfig.json' (Configured)
Info 78   [00:02:02.000] 	Files (2)

Info 78   [00:02:03.000] -----------------------------------------------
Info 78   [00:02:04.000] Open files: 
Info 78   [00:02:05.000] 	FileName: /a/b/app.ts ProjectRootPath: undefined
Info 78   [00:02:06.000] 		Projects: /a/b/tsconfig.json
Info 78   [00:02:07.000] After ensureProjectForOpenFiles:
Info 79   [00:02:08.000] Project '/a/b/tsconfig.json' (Configured)
Info 79   [00:02:09.000] 	Files (2)

Info 79   [00:02:10.000] -----------------------------------------------
Info 79   [00:02:11.000] Open files: 
Info 79   [00:02:12.000] 	FileName: /a/b/app.ts ProjectRootPath: undefined
Info 79   [00:02:13.000] 		Projects: /a/b/tsconfig.json
After running Timeout callback:: count: 0
