currentDirectory:: / useCaseSensitiveFileNames: false
Info 0    [00:00:15.000] Provided types map file "/typesMap.json" doesn't exist
Creating project service
//// [/a/b/commonFile1.ts]
let x = 1

//// [/a/lib/lib.d.ts]
/// <reference no-default-lib="true"/>
interface Boolean {}
interface Function {}
interface CallableFunction {}
interface NewableFunction {}
interface IArguments {}
interface Number { toExponential: any; }
interface Object {}
interface RegExp {}
interface String { charAt: any; }
interface Array<T> { length: number; [n: number]: T; }

//// [/a/b/tsconfig.json]
{}


Info 1    [00:00:16.000] Search path: /a/b
Info 2    [00:00:17.000] For info: /a/b/commonFile1.ts :: Config file name: /a/b/tsconfig.json
Info 3    [00:00:18.000] Creating configuration project /a/b/tsconfig.json
Info 4    [00:00:19.000] FileWatcher:: Added:: WatchInfo: /a/b/tsconfig.json 2000 undefined Project: /a/b/tsconfig.json WatchType: Config file
Info 5    [00:00:20.000] Config: /a/b/tsconfig.json : {
 "rootNames": [
  "/a/b/commonFile1.ts"
 ],
 "options": {
  "configFilePath": "/a/b/tsconfig.json"
 }
}
Info 6    [00:00:21.000] DirectoryWatcher:: Added:: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Info 7    [00:00:22.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Info 8    [00:00:23.000] Starting updateGraphWorker: Project: /a/b/tsconfig.json
Info 9    [00:00:24.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 10   [00:00:25.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/tsconfig.json WatchType: Type roots
Info 11   [00:00:26.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/tsconfig.json WatchType: Type roots
Info 12   [00:00:27.000] Finishing updateGraphWorker: Project: /a/b/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 13   [00:00:28.000] Project '/a/b/tsconfig.json' (Configured)
Info 14   [00:00:29.000] 	Files (2)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/a/b/commonFile1.ts SVC-1-0 "let x = 1"


	../lib/lib.d.ts
	  Default library for target 'es5'
	commonFile1.ts
	  Matched by default include pattern '**/*'

Info 15   [00:00:30.000] -----------------------------------------------
Info 16   [00:00:31.000] Project '/a/b/tsconfig.json' (Configured)
Info 16   [00:00:32.000] 	Files (2)

Info 16   [00:00:33.000] -----------------------------------------------
Info 16   [00:00:34.000] Open files: 
Info 16   [00:00:35.000] 	FileName: /a/b/commonFile1.ts ProjectRootPath: undefined
Info 16   [00:00:36.000] 		Projects: /a/b/tsconfig.json
Info 16   [00:00:39.000] DirectoryWatcher:: Triggered with /a/b/commonFile2.ts :: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Info 17   [00:00:40.000] Scheduled: /a/b/tsconfig.json
Info 18   [00:00:41.000] Scheduled: *ensureProjectForOpenFiles*
Info 19   [00:00:42.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /a/b/commonFile2.ts :: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Before checking timeout queue length (2) and running
//// [/a/b/commonFile2.ts]
let y = 1


PolledWatches::
/a/b/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/a/b/tsconfig.json: *new*
  {}
/a/lib/lib.d.ts: *new*
  {}

FsWatchesRecursive::
/a/b: *new*
  {}

Info 20   [00:00:43.000] Running: /a/b/tsconfig.json
Info 21   [00:00:44.000] FileWatcher:: Added:: WatchInfo: /a/b/commonFile2.ts 500 undefined WatchType: Closed Script info
Info 22   [00:00:45.000] Starting updateGraphWorker: Project: /a/b/tsconfig.json
Info 23   [00:00:46.000] Finishing updateGraphWorker: Project: /a/b/tsconfig.json Version: 2 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 24   [00:00:47.000] Project '/a/b/tsconfig.json' (Configured)
Info 25   [00:00:48.000] 	Files (3)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/a/b/commonFile1.ts SVC-1-0 "let x = 1"
	/a/b/commonFile2.ts Text-1 "let y = 1"


	../lib/lib.d.ts
	  Default library for target 'es5'
	commonFile1.ts
	  Matched by default include pattern '**/*'
	commonFile2.ts
	  Matched by default include pattern '**/*'

Info 26   [00:00:49.000] -----------------------------------------------
Info 27   [00:00:50.000] Running: *ensureProjectForOpenFiles*
Info 28   [00:00:51.000] Before ensureProjectForOpenFiles:
Info 29   [00:00:52.000] Project '/a/b/tsconfig.json' (Configured)
Info 29   [00:00:53.000] 	Files (3)

Info 29   [00:00:54.000] -----------------------------------------------
Info 29   [00:00:55.000] Open files: 
Info 29   [00:00:56.000] 	FileName: /a/b/commonFile1.ts ProjectRootPath: undefined
Info 29   [00:00:57.000] 		Projects: /a/b/tsconfig.json
Info 29   [00:00:58.000] After ensureProjectForOpenFiles:
Info 30   [00:00:59.000] Project '/a/b/tsconfig.json' (Configured)
Info 30   [00:01:00.000] 	Files (3)

Info 30   [00:01:01.000] -----------------------------------------------
Info 30   [00:01:02.000] Open files: 
Info 30   [00:01:03.000] 	FileName: /a/b/commonFile1.ts ProjectRootPath: undefined
Info 30   [00:01:04.000] 		Projects: /a/b/tsconfig.json
After checking timeout queue length (2) and running

PolledWatches::
/a/b/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/b/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}
/a/b/commonfile2.ts: *new*
  {}

FsWatchesRecursive::
/a/b:
  {}
