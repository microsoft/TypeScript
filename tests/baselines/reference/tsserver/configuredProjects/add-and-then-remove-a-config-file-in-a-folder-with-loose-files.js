currentDirectory:: / useCaseSensitiveFileNames: false
Info 0    [00:00:21.000] Provided types map file "/typesMap.json" doesn't exist
Creating project service
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

//// [/user/username/projects/myproject/commonFile1.ts]
let x = 1

//// [/user/username/projects/myproject/commonFile2.ts]
let y = 1


Info 1    [00:00:22.000] Search path: /user/username/projects/myproject
Info 2    [00:00:23.000] For info: /user/username/projects/myproject/commonFile1.ts :: No config files found.
Info 3    [00:00:24.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 4    [00:00:25.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 5    [00:00:26.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 6    [00:00:27.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 7    [00:00:28.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 8    [00:00:29.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 9    [00:00:30.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 10   [00:00:31.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 11   [00:00:32.000] 	Files (2)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/myproject/commonFile1.ts SVC-1-0 "let x = 1"


	../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	commonFile1.ts
	  Root file specified for compilation

Info 12   [00:00:33.000] -----------------------------------------------
Info 13   [00:00:34.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 13   [00:00:35.000] 	Files (2)

Info 13   [00:00:36.000] -----------------------------------------------
Info 13   [00:00:37.000] Open files: 
Info 13   [00:00:38.000] 	FileName: /user/username/projects/myproject/commonFile1.ts ProjectRootPath: undefined
Info 13   [00:00:39.000] 		Projects: /dev/null/inferredProject1*
Info 13   [00:00:40.000] Search path: /user/username/projects/myproject
Info 14   [00:00:41.000] For info: /user/username/projects/myproject/commonFile2.ts :: No config files found.
Info 15   [00:00:42.000] Starting updateGraphWorker: Project: /dev/null/inferredProject2*
Info 16   [00:00:43.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /dev/null/inferredProject2* WatchType: Type roots
Info 17   [00:00:44.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /dev/null/inferredProject2* WatchType: Type roots
Info 18   [00:00:45.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject2* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 19   [00:00:46.000] Project '/dev/null/inferredProject2*' (Inferred)
Info 20   [00:00:47.000] 	Files (2)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/myproject/commonFile2.ts SVC-1-0 "let y = 1"


	../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	commonFile2.ts
	  Root file specified for compilation

Info 21   [00:00:48.000] -----------------------------------------------
Info 22   [00:00:49.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 22   [00:00:50.000] 	Files (2)

Info 22   [00:00:51.000] -----------------------------------------------
Info 22   [00:00:52.000] Project '/dev/null/inferredProject2*' (Inferred)
Info 22   [00:00:53.000] 	Files (2)

Info 22   [00:00:54.000] -----------------------------------------------
Info 22   [00:00:55.000] Open files: 
Info 22   [00:00:56.000] 	FileName: /user/username/projects/myproject/commonFile1.ts ProjectRootPath: undefined
Info 22   [00:00:57.000] 		Projects: /dev/null/inferredProject1*
Info 22   [00:00:58.000] 	FileName: /user/username/projects/myproject/commonFile2.ts ProjectRootPath: undefined
Info 22   [00:00:59.000] 		Projects: /dev/null/inferredProject2*
Info 22   [00:01:02.000] FileWatcher:: Triggered with /user/username/projects/myproject/tsconfig.json 0:: WatchInfo: /user/username/projects/myproject/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 23   [00:01:03.000] Search path: /user/username/projects/myproject
Info 24   [00:01:04.000] For info: /user/username/projects/myproject/commonFile1.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 25   [00:01:05.000] Creating configuration project /user/username/projects/myproject/tsconfig.json
Info 26   [00:01:06.000] Scheduled: /user/username/projects/myproject/tsconfig.json
Info 27   [00:01:07.000] Search path: /user/username/projects/myproject
Info 28   [00:01:08.000] For info: /user/username/projects/myproject/commonFile2.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 29   [00:01:09.000] Scheduled: *ensureProjectForOpenFiles*
Info 30   [00:01:10.000] Elapsed:: *ms FileWatcher:: Triggered with /user/username/projects/myproject/tsconfig.json 0:: WatchInfo: /user/username/projects/myproject/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 31   [00:01:11.000] FileWatcher:: Triggered with /user/username/projects/myproject/tsconfig.json 0:: WatchInfo: /user/username/projects/myproject/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 32   [00:01:12.000] Search path: /user/username/projects/myproject
Info 33   [00:01:13.000] For info: /user/username/projects/myproject/commonFile1.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 34   [00:01:14.000] Scheduled: /user/username/projects/myproject/tsconfig.json, Cancelled earlier one
Info 35   [00:01:15.000] Search path: /user/username/projects/myproject
Info 36   [00:01:16.000] For info: /user/username/projects/myproject/commonFile2.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 37   [00:01:17.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 38   [00:01:18.000] Elapsed:: *ms FileWatcher:: Triggered with /user/username/projects/myproject/tsconfig.json 0:: WatchInfo: /user/username/projects/myproject/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Before running Timeout callback:: count: 2
3: /user/username/projects/myproject/tsconfig.json
4: *ensureProjectForOpenFiles*
//// [/user/username/projects/myproject/tsconfig.json]
{
                    "files": ["commonFile1.ts"]
                }


PolledWatches::
/user/username/projects/myproject/jsconfig.json: *new*
  {"pollingInterval":2000}
/user/username/projects/myproject/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts: *new*
  {}
/user/username/projects/myproject/tsconfig.json: *new*
  {}

Info 39   [00:01:19.000] Running: /user/username/projects/myproject/tsconfig.json
Info 40   [00:01:20.000] Loading configured project /user/username/projects/myproject/tsconfig.json
Info 41   [00:01:21.000] Config: /user/username/projects/myproject/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/commonFile1.ts"
 ],
 "options": {
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
 }
}
Info 42   [00:01:22.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json
Info 43   [00:01:23.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 44   [00:01:24.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 45   [00:01:25.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 46   [00:01:26.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 47   [00:01:27.000] 	Files (2)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/myproject/commonFile1.ts SVC-1-0 "let x = 1"


	../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	commonFile1.ts
	  Part of 'files' list in tsconfig.json

Info 48   [00:01:28.000] -----------------------------------------------
Info 49   [00:01:29.000] Running: *ensureProjectForOpenFiles*
Info 50   [00:01:30.000] Before ensureProjectForOpenFiles:
Info 51   [00:01:31.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 51   [00:01:32.000] 	Files (2)

Info 51   [00:01:33.000] -----------------------------------------------
Info 51   [00:01:34.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 51   [00:01:35.000] 	Files (2)

Info 51   [00:01:36.000] -----------------------------------------------
Info 51   [00:01:37.000] Project '/dev/null/inferredProject2*' (Inferred)
Info 51   [00:01:38.000] 	Files (2)

Info 51   [00:01:39.000] -----------------------------------------------
Info 51   [00:01:40.000] Open files: 
Info 51   [00:01:41.000] 	FileName: /user/username/projects/myproject/commonFile1.ts ProjectRootPath: undefined
Info 51   [00:01:42.000] 		Projects: /user/username/projects/myproject/tsconfig.json
Info 51   [00:01:43.000] 	FileName: /user/username/projects/myproject/commonFile2.ts ProjectRootPath: undefined
Info 51   [00:01:44.000] 		Projects: /dev/null/inferredProject2*
Info 51   [00:01:45.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 52   [00:01:46.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 2 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 53   [00:01:47.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 54   [00:01:48.000] 	Files (0)



Info 55   [00:01:49.000] -----------------------------------------------
Info 56   [00:01:50.000] After ensureProjectForOpenFiles:
Info 57   [00:01:51.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 57   [00:01:52.000] 	Files (2)

Info 57   [00:01:53.000] -----------------------------------------------
Info 57   [00:01:54.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 57   [00:01:55.000] 	Files (0)

Info 57   [00:01:56.000] -----------------------------------------------
Info 57   [00:01:57.000] Project '/dev/null/inferredProject2*' (Inferred)
Info 57   [00:01:58.000] 	Files (2)

Info 57   [00:01:59.000] -----------------------------------------------
Info 57   [00:02:00.000] Open files: 
Info 57   [00:02:01.000] 	FileName: /user/username/projects/myproject/commonFile1.ts ProjectRootPath: undefined
Info 57   [00:02:02.000] 		Projects: /user/username/projects/myproject/tsconfig.json
Info 57   [00:02:03.000] 	FileName: /user/username/projects/myproject/commonFile2.ts ProjectRootPath: undefined
Info 57   [00:02:04.000] 		Projects: /dev/null/inferredProject2*
After running Timeout callback:: count: 0

Info 57   [00:02:06.000] FileWatcher:: Triggered with /user/username/projects/myproject/tsconfig.json 2:: WatchInfo: /user/username/projects/myproject/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 58   [00:02:07.000] `remove Project::
Info 59   [00:02:08.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 60   [00:02:09.000] 	Files (2)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/commonFile1.ts


	../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	commonFile1.ts
	  Part of 'files' list in tsconfig.json

Info 61   [00:02:10.000] -----------------------------------------------
Info 62   [00:02:11.000] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 63   [00:02:12.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 64   [00:02:13.000] Search path: /user/username/projects/myproject
Info 65   [00:02:14.000] For info: /user/username/projects/myproject/commonFile1.ts :: No config files found.
Info 66   [00:02:15.000] Search path: /user/username/projects/myproject
Info 67   [00:02:16.000] For info: /user/username/projects/myproject/commonFile2.ts :: No config files found.
Info 68   [00:02:17.000] Scheduled: *ensureProjectForOpenFiles*
Info 69   [00:02:18.000] Elapsed:: *ms FileWatcher:: Triggered with /user/username/projects/myproject/tsconfig.json 2:: WatchInfo: /user/username/projects/myproject/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Before running Timeout callback:: count: 1
5: *ensureProjectForOpenFiles*
//// [/user/username/projects/myproject/tsconfig.json] deleted

Info 70   [00:02:19.500] Running: *ensureProjectForOpenFiles*
Info 71   [00:02:20.500] Before ensureProjectForOpenFiles:
Info 72   [00:02:21.500] Project '/dev/null/inferredProject1*' (Inferred)
Info 72   [00:02:22.500] 	Files (0)

Info 72   [00:02:23.500] -----------------------------------------------
Info 72   [00:02:24.500] Project '/dev/null/inferredProject2*' (Inferred)
Info 72   [00:02:25.500] 	Files (2)

Info 72   [00:02:26.500] -----------------------------------------------
Info 72   [00:02:27.500] Open files: 
Info 72   [00:02:28.500] 	FileName: /user/username/projects/myproject/commonFile1.ts ProjectRootPath: undefined
Info 72   [00:02:29.500] 		Projects: 
Info 72   [00:02:30.500] 	FileName: /user/username/projects/myproject/commonFile2.ts ProjectRootPath: undefined
Info 72   [00:02:31.500] 		Projects: /dev/null/inferredProject2*
Info 72   [00:02:32.500] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 73   [00:02:33.500] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 3 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 74   [00:02:34.500] Project '/dev/null/inferredProject1*' (Inferred)
Info 75   [00:02:35.500] 	Files (2)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/myproject/commonFile1.ts SVC-1-0 "let x = 1"


	../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	commonFile1.ts
	  Root file specified for compilation

Info 76   [00:02:36.500] -----------------------------------------------
Info 77   [00:02:37.500] After ensureProjectForOpenFiles:
Info 78   [00:02:38.500] Project '/dev/null/inferredProject1*' (Inferred)
Info 78   [00:02:39.500] 	Files (2)

Info 78   [00:02:40.500] -----------------------------------------------
Info 78   [00:02:41.500] Project '/dev/null/inferredProject2*' (Inferred)
Info 78   [00:02:42.500] 	Files (2)

Info 78   [00:02:43.500] -----------------------------------------------
Info 78   [00:02:44.500] Open files: 
Info 78   [00:02:45.500] 	FileName: /user/username/projects/myproject/commonFile1.ts ProjectRootPath: undefined
Info 78   [00:02:46.500] 		Projects: /dev/null/inferredProject1*
Info 78   [00:02:47.500] 	FileName: /user/username/projects/myproject/commonFile2.ts ProjectRootPath: undefined
Info 78   [00:02:48.500] 		Projects: /dev/null/inferredProject2*
After running Timeout callback:: count: 0
