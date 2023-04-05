currentDirectory:: / useCaseSensitiveFileNames: false
Info 0    [00:00:31.000] Provided types map file "/typesMap.json" doesn't exist
Creating project service
//// [/user/username/projects/myproject/a/b/main.ts]
let x =1;

//// [/user/username/projects/myproject/a/c/main.ts]
let x =1;

//// [/user/username/projects/myproject/a/d/main.ts]
let x =1;

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


Info 1    [00:00:32.000] Search path: /user/username/projects/myproject/a/b
Info 2    [00:00:33.000] For info: /user/username/projects/myproject/a/b/main.ts :: No config files found.
Info 3    [00:00:34.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/a/b/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 4    [00:00:35.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/a/b/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 5    [00:00:36.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/a/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 6    [00:00:37.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/a/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 7    [00:00:38.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 8    [00:00:39.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 9    [00:00:40.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 10   [00:00:41.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 11   [00:00:42.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 12   [00:00:43.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 13   [00:00:44.000] 	Files (2)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/myproject/a/b/main.ts SVC-1-0 "let x =1;"


	a/lib/lib.d.ts
	  Default library for target 'es5'
	user/username/projects/myproject/a/b/main.ts
	  Root file specified for compilation

Info 14   [00:00:45.000] -----------------------------------------------
Info 15   [00:00:46.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 15   [00:00:47.000] 	Files (2)

Info 15   [00:00:48.000] -----------------------------------------------
Info 15   [00:00:49.000] Open files: 
Info 15   [00:00:50.000] 	FileName: /user/username/projects/myproject/a/b/main.ts ProjectRootPath: undefined
Info 15   [00:00:51.000] 		Projects: /dev/null/inferredProject1*
Info 15   [00:00:52.000] Search path: /user/username/projects/myproject/a/c
Info 16   [00:00:53.000] For info: /user/username/projects/myproject/a/c/main.ts :: No config files found.
Info 17   [00:00:54.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/a/c/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 18   [00:00:55.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/a/c/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 19   [00:00:56.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 20   [00:00:57.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 2 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 21   [00:00:58.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 22   [00:00:59.000] 	Files (3)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/myproject/a/b/main.ts SVC-1-0 "let x =1;"
	/user/username/projects/myproject/a/c/main.ts SVC-1-0 "let x =1;"


	a/lib/lib.d.ts
	  Default library for target 'es5'
	user/username/projects/myproject/a/b/main.ts
	  Root file specified for compilation
	user/username/projects/myproject/a/c/main.ts
	  Root file specified for compilation

Info 23   [00:01:00.000] -----------------------------------------------
Info 24   [00:01:01.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 24   [00:01:02.000] 	Files (3)

Info 24   [00:01:03.000] -----------------------------------------------
Info 24   [00:01:04.000] Open files: 
Info 24   [00:01:05.000] 	FileName: /user/username/projects/myproject/a/b/main.ts ProjectRootPath: undefined
Info 24   [00:01:06.000] 		Projects: /dev/null/inferredProject1*
Info 24   [00:01:07.000] 	FileName: /user/username/projects/myproject/a/c/main.ts ProjectRootPath: undefined
Info 24   [00:01:08.000] 		Projects: /dev/null/inferredProject1*
Info 24   [00:01:09.000] Search path: /user/username/projects/myproject/a/d
Info 25   [00:01:10.000] For info: /user/username/projects/myproject/a/d/main.ts :: No config files found.
Info 26   [00:01:11.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/a/d/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 27   [00:01:12.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/a/d/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 28   [00:01:13.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 29   [00:01:14.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 3 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 30   [00:01:15.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 31   [00:01:16.000] 	Files (4)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/myproject/a/b/main.ts SVC-1-0 "let x =1;"
	/user/username/projects/myproject/a/c/main.ts SVC-1-0 "let x =1;"
	/user/username/projects/myproject/a/d/main.ts SVC-1-0 "let x =1;"


	a/lib/lib.d.ts
	  Default library for target 'es5'
	user/username/projects/myproject/a/b/main.ts
	  Root file specified for compilation
	user/username/projects/myproject/a/c/main.ts
	  Root file specified for compilation
	user/username/projects/myproject/a/d/main.ts
	  Root file specified for compilation

Info 32   [00:01:17.000] -----------------------------------------------
Info 33   [00:01:18.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 33   [00:01:19.000] 	Files (4)

Info 33   [00:01:20.000] -----------------------------------------------
Info 33   [00:01:21.000] Open files: 
Info 33   [00:01:22.000] 	FileName: /user/username/projects/myproject/a/b/main.ts ProjectRootPath: undefined
Info 33   [00:01:23.000] 		Projects: /dev/null/inferredProject1*
Info 33   [00:01:24.000] 	FileName: /user/username/projects/myproject/a/c/main.ts ProjectRootPath: undefined
Info 33   [00:01:25.000] 		Projects: /dev/null/inferredProject1*
Info 33   [00:01:26.000] 	FileName: /user/username/projects/myproject/a/d/main.ts ProjectRootPath: undefined
Info 33   [00:01:27.000] 		Projects: /dev/null/inferredProject1*
Info 33   [00:01:30.000] FileWatcher:: Triggered with /user/username/projects/myproject/a/b/tsconfig.json 0:: WatchInfo: /user/username/projects/myproject/a/b/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 34   [00:01:31.000] Search path: /user/username/projects/myproject/a/b
Info 35   [00:01:32.000] For info: /user/username/projects/myproject/a/b/main.ts :: Config file name: /user/username/projects/myproject/a/b/tsconfig.json
Info 36   [00:01:33.000] Creating configuration project /user/username/projects/myproject/a/b/tsconfig.json
Info 37   [00:01:34.000] Scheduled: /user/username/projects/myproject/a/b/tsconfig.json
Info 38   [00:01:35.000] Scheduled: *ensureProjectForOpenFiles*
Info 39   [00:01:36.000] Elapsed:: *ms FileWatcher:: Triggered with /user/username/projects/myproject/a/b/tsconfig.json 0:: WatchInfo: /user/username/projects/myproject/a/b/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 40   [00:01:37.000] FileWatcher:: Triggered with /user/username/projects/myproject/a/b/tsconfig.json 0:: WatchInfo: /user/username/projects/myproject/a/b/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 41   [00:01:38.000] Search path: /user/username/projects/myproject/a/b
Info 42   [00:01:39.000] For info: /user/username/projects/myproject/a/b/main.ts :: Config file name: /user/username/projects/myproject/a/b/tsconfig.json
Info 43   [00:01:40.000] Scheduled: /user/username/projects/myproject/a/b/tsconfig.json, Cancelled earlier one
Info 44   [00:01:41.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 45   [00:01:42.000] Elapsed:: *ms FileWatcher:: Triggered with /user/username/projects/myproject/a/b/tsconfig.json 0:: WatchInfo: /user/username/projects/myproject/a/b/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Before running Timeout callback:: count: 2
3: /user/username/projects/myproject/a/b/tsconfig.json
4: *ensureProjectForOpenFiles*
//// [/user/username/projects/myproject/a/b/tsconfig.json]
{
                    "compilerOptions": {
                        "target": "es6"
                    },
                    "files": [ "main.ts" ]
                }


PolledWatches::
/user/username/projects/myproject/a/b/jsconfig.json: *new*
  {"pollingInterval":2000}
/user/username/projects/myproject/a/tsconfig.json: *new*
  {"pollingInterval":2000}
/user/username/projects/myproject/a/jsconfig.json: *new*
  {"pollingInterval":2000}
/user/username/projects/myproject/tsconfig.json: *new*
  {"pollingInterval":2000}
/user/username/projects/myproject/jsconfig.json: *new*
  {"pollingInterval":2000}
/user/username/projects/myproject/a/c/tsconfig.json: *new*
  {"pollingInterval":2000}
/user/username/projects/myproject/a/c/jsconfig.json: *new*
  {"pollingInterval":2000}
/user/username/projects/myproject/a/d/tsconfig.json: *new*
  {"pollingInterval":2000}
/user/username/projects/myproject/a/d/jsconfig.json: *new*
  {"pollingInterval":2000}

FsWatches::
/a/lib/lib.d.ts: *new*
  {}
/user/username/projects/myproject/a/b/tsconfig.json: *new*
  {}

Info 46   [00:01:43.000] Running: /user/username/projects/myproject/a/b/tsconfig.json
Info 47   [00:01:44.000] Loading configured project /user/username/projects/myproject/a/b/tsconfig.json
Info 48   [00:01:45.000] Config: /user/username/projects/myproject/a/b/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/a/b/main.ts"
 ],
 "options": {
  "target": 2,
  "configFilePath": "/user/username/projects/myproject/a/b/tsconfig.json"
 }
}
Info 49   [00:01:46.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/a/b/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 50   [00:01:47.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/a/b/tsconfig.json
Info 51   [00:01:48.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.es6.d.ts 500 undefined Project: /user/username/projects/myproject/a/b/tsconfig.json WatchType: Missing file
Info 52   [00:01:49.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/a/b/node_modules/@types 1 undefined Project: /user/username/projects/myproject/a/b/tsconfig.json WatchType: Type roots
Info 53   [00:01:50.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/a/b/node_modules/@types 1 undefined Project: /user/username/projects/myproject/a/b/tsconfig.json WatchType: Type roots
Info 54   [00:01:51.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/a/node_modules/@types 1 undefined Project: /user/username/projects/myproject/a/b/tsconfig.json WatchType: Type roots
Info 55   [00:01:52.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/a/node_modules/@types 1 undefined Project: /user/username/projects/myproject/a/b/tsconfig.json WatchType: Type roots
Info 56   [00:01:53.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/a/b/tsconfig.json WatchType: Type roots
Info 57   [00:01:54.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/a/b/tsconfig.json WatchType: Type roots
Info 58   [00:01:55.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/a/b/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 59   [00:01:56.000] Project '/user/username/projects/myproject/a/b/tsconfig.json' (Configured)
Info 60   [00:01:57.000] 	Files (1)
	/user/username/projects/myproject/a/b/main.ts SVC-1-0 "let x =1;"


	main.ts
	  Part of 'files' list in tsconfig.json

Info 61   [00:01:58.000] -----------------------------------------------
Info 62   [00:01:59.000] Running: *ensureProjectForOpenFiles*
Info 63   [00:02:00.000] Before ensureProjectForOpenFiles:
Info 64   [00:02:01.000] Project '/user/username/projects/myproject/a/b/tsconfig.json' (Configured)
Info 64   [00:02:02.000] 	Files (1)

Info 64   [00:02:03.000] -----------------------------------------------
Info 64   [00:02:04.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 64   [00:02:05.000] 	Files (4)

Info 64   [00:02:06.000] -----------------------------------------------
Info 64   [00:02:07.000] Open files: 
Info 64   [00:02:08.000] 	FileName: /user/username/projects/myproject/a/b/main.ts ProjectRootPath: undefined
Info 64   [00:02:09.000] 		Projects: /user/username/projects/myproject/a/b/tsconfig.json
Info 64   [00:02:10.000] 	FileName: /user/username/projects/myproject/a/c/main.ts ProjectRootPath: undefined
Info 64   [00:02:11.000] 		Projects: /dev/null/inferredProject1*
Info 64   [00:02:12.000] 	FileName: /user/username/projects/myproject/a/d/main.ts ProjectRootPath: undefined
Info 64   [00:02:13.000] 		Projects: /dev/null/inferredProject1*
Info 64   [00:02:14.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 65   [00:02:15.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 4 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 66   [00:02:16.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 67   [00:02:17.000] 	Files (3)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/myproject/a/c/main.ts SVC-1-0 "let x =1;"
	/user/username/projects/myproject/a/d/main.ts SVC-1-0 "let x =1;"


	a/lib/lib.d.ts
	  Default library for target 'es5'
	user/username/projects/myproject/a/c/main.ts
	  Root file specified for compilation
	user/username/projects/myproject/a/d/main.ts
	  Root file specified for compilation

Info 68   [00:02:18.000] -----------------------------------------------
Info 69   [00:02:19.000] After ensureProjectForOpenFiles:
Info 70   [00:02:20.000] Project '/user/username/projects/myproject/a/b/tsconfig.json' (Configured)
Info 70   [00:02:21.000] 	Files (1)

Info 70   [00:02:22.000] -----------------------------------------------
Info 70   [00:02:23.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 70   [00:02:24.000] 	Files (3)

Info 70   [00:02:25.000] -----------------------------------------------
Info 70   [00:02:26.000] Open files: 
Info 70   [00:02:27.000] 	FileName: /user/username/projects/myproject/a/b/main.ts ProjectRootPath: undefined
Info 70   [00:02:28.000] 		Projects: /user/username/projects/myproject/a/b/tsconfig.json
Info 70   [00:02:29.000] 	FileName: /user/username/projects/myproject/a/c/main.ts ProjectRootPath: undefined
Info 70   [00:02:30.000] 		Projects: /dev/null/inferredProject1*
Info 70   [00:02:31.000] 	FileName: /user/username/projects/myproject/a/d/main.ts ProjectRootPath: undefined
Info 70   [00:02:32.000] 		Projects: /dev/null/inferredProject1*
After running Timeout callback:: count: 0

PolledWatches::
/user/username/projects/myproject/a/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/a/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/a/c/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/a/c/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/a/d/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/a/d/jsconfig.json:
  {"pollingInterval":2000}
/a/lib/lib.es6.d.ts: *new*
  {"pollingInterval":500}
/user/username/projects/myproject/a/b/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/myproject/a/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types: *new*
  {"pollingInterval":500}

PolledWatches *deleted*::
/user/username/projects/myproject/a/b/jsconfig.json:
  {"pollingInterval":2000}

FsWatches::
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/a/b/tsconfig.json:
  {}
