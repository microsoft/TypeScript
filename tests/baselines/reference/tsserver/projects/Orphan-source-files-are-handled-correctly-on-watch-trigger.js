currentDirectory:: / useCaseSensitiveFileNames: false
Info 0    [00:00:25.000] Provided types map file "/typesMap.json" doesn't exist
Creating project service
//// [/user/username/projects/myproject/src/file1.ts]
export let x = 10;

//// [/user/username/projects/myproject/src/file2.ts]
export let y = 10;

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

//// [/user/username/projects/myproject/tsconfig.json]
{"files":["src/file1.ts","src/file2.ts"]}


Info 1    [00:00:26.000] Search path: /user/username/projects/myproject/src
Info 2    [00:00:27.000] For info: /user/username/projects/myproject/src/file1.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 3    [00:00:28.000] Creating configuration project /user/username/projects/myproject/tsconfig.json
Info 4    [00:00:29.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info 5    [00:00:30.000] Config: /user/username/projects/myproject/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/src/file1.ts",
  "/user/username/projects/myproject/src/file2.ts"
 ],
 "options": {
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
 }
}
Info 6    [00:00:31.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/file2.ts 500 undefined WatchType: Closed Script info
Info 7    [00:00:32.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json
Info 8    [00:00:33.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 9    [00:00:34.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 10   [00:00:35.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 11   [00:00:36.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 12   [00:00:37.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 13   [00:00:38.000] 	Files (3)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/myproject/src/file1.ts SVC-1-0 "export let x = 10;"
	/user/username/projects/myproject/src/file2.ts Text-1 "export let y = 10;"


	../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	src/file1.ts
	  Part of 'files' list in tsconfig.json
	src/file2.ts
	  Part of 'files' list in tsconfig.json

Info 14   [00:00:39.000] -----------------------------------------------
Info 15   [00:00:40.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 15   [00:00:41.000] 	Files (3)

Info 15   [00:00:42.000] -----------------------------------------------
Info 15   [00:00:43.000] Open files: 
Info 15   [00:00:44.000] 	FileName: /user/username/projects/myproject/src/file1.ts ProjectRootPath: undefined
Info 15   [00:00:45.000] 		Projects: /user/username/projects/myproject/tsconfig.json
Info 15   [00:00:49.000] FileWatcher:: Triggered with /user/username/projects/myproject/tsconfig.json 1:: WatchInfo: /user/username/projects/myproject/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info 16   [00:00:50.000] Scheduled: /user/username/projects/myproject/tsconfig.json
Info 17   [00:00:51.000] Scheduled: *ensureProjectForOpenFiles*
Info 18   [00:00:52.000] Elapsed:: *ms FileWatcher:: Triggered with /user/username/projects/myproject/tsconfig.json 1:: WatchInfo: /user/username/projects/myproject/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Before running Timeout callback:: count: 2
1: /user/username/projects/myproject/tsconfig.json
2: *ensureProjectForOpenFiles*
//// [/user/username/projects/myproject/tsconfig.json]
{"files":["src/file1.ts"]}


PolledWatches::
/user/username/projects/myproject/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/tsconfig.json: *new*
  {}
/user/username/projects/myproject/src/file2.ts: *new*
  {}
/a/lib/lib.d.ts: *new*
  {}

Info 19   [00:00:53.000] Running: /user/username/projects/myproject/tsconfig.json
Info 20   [00:00:54.000] Reloading configured project /user/username/projects/myproject/tsconfig.json
Info 21   [00:00:55.000] Config: /user/username/projects/myproject/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/src/file1.ts"
 ],
 "options": {
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
 }
}
Info 22   [00:00:56.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json
Info 23   [00:00:57.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json Version: 2 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 24   [00:00:58.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 25   [00:00:59.000] 	Files (2)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/myproject/src/file1.ts SVC-1-0 "export let x = 10;"


	../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	src/file1.ts
	  Part of 'files' list in tsconfig.json

Info 26   [00:01:00.000] -----------------------------------------------
Info 27   [00:01:01.000] Running: *ensureProjectForOpenFiles*
Info 28   [00:01:02.000] Before ensureProjectForOpenFiles:
Info 29   [00:01:03.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 29   [00:01:04.000] 	Files (2)

Info 29   [00:01:05.000] -----------------------------------------------
Info 29   [00:01:06.000] Open files: 
Info 29   [00:01:07.000] 	FileName: /user/username/projects/myproject/src/file1.ts ProjectRootPath: undefined
Info 29   [00:01:08.000] 		Projects: /user/username/projects/myproject/tsconfig.json
Info 29   [00:01:09.000] After ensureProjectForOpenFiles:
Info 30   [00:01:10.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 30   [00:01:11.000] 	Files (2)

Info 30   [00:01:12.000] -----------------------------------------------
Info 30   [00:01:13.000] Open files: 
Info 30   [00:01:14.000] 	FileName: /user/username/projects/myproject/src/file1.ts ProjectRootPath: undefined
Info 30   [00:01:15.000] 		Projects: /user/username/projects/myproject/tsconfig.json
After running Timeout callback:: count: 0

Containing projects for /user/username/projects/myproject/src/file2.ts:: 
Info 30   [00:01:19.000] FileWatcher:: Triggered with /user/username/projects/myproject/src/file2.ts 1:: WatchInfo: /user/username/projects/myproject/src/file2.ts 500 undefined WatchType: Closed Script info
Info 31   [00:01:20.000] Elapsed:: *ms FileWatcher:: Triggered with /user/username/projects/myproject/src/file2.ts 1:: WatchInfo: /user/username/projects/myproject/src/file2.ts 500 undefined WatchType: Closed Script info
Before running Timeout callback:: count: 0
//// [/user/username/projects/myproject/src/file2.ts]
export let y = 10;export let z = 10;


After running Timeout callback:: count: 0

Containing projects for /user/username/projects/myproject/src/file2.ts:: 