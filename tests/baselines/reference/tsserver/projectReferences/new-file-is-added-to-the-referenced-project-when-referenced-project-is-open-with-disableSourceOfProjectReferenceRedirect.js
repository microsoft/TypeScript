currentDirectory:: / useCaseSensitiveFileNames: false
Info 0    [00:00:33.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Before request
//// [/user/username/projects/myproject/projects/project1/tsconfig.json]
{"compilerOptions":{"module":"none","composite":true},"exclude":["temp"]}

//// [/user/username/projects/myproject/projects/project1/class1.ts]
class class1 {}

//// [/user/username/projects/myproject/projects/project1/class1.d.ts]
declare class class1 {}

//// [/user/username/projects/myproject/projects/project2/tsconfig.json]
{"compilerOptions":{"module":"none","composite":true,"disableSourceOfProjectReferenceRedirect":true},"references":[{"path":"../project1"}]}

//// [/user/username/projects/myproject/projects/project2/class2.ts]
class class2 {}

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


Info 1    [00:00:34.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/myproject/projects/project2/class2.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info 2    [00:00:35.000] Search path: /user/username/projects/myproject/projects/project2
Info 3    [00:00:36.000] For info: /user/username/projects/myproject/projects/project2/class2.ts :: Config file name: /user/username/projects/myproject/projects/project2/tsconfig.json
Info 4    [00:00:37.000] Creating configuration project /user/username/projects/myproject/projects/project2/tsconfig.json
Info 5    [00:00:38.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/projects/project2/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/projects/project2/tsconfig.json WatchType: Config file
Info 6    [00:00:39.000] Config: /user/username/projects/myproject/projects/project2/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/projects/project2/class2.ts"
 ],
 "options": {
  "module": 0,
  "composite": true,
  "disableSourceOfProjectReferenceRedirect": true,
  "configFilePath": "/user/username/projects/myproject/projects/project2/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/user/username/projects/myproject/projects/project1",
   "originalPath": "../project1"
  }
 ]
}
Info 7    [00:00:40.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/projects/project2 1 undefined Config: /user/username/projects/myproject/projects/project2/tsconfig.json WatchType: Wild card directory
Info 8    [00:00:41.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/projects/project2 1 undefined Config: /user/username/projects/myproject/projects/project2/tsconfig.json WatchType: Wild card directory
Info 9    [00:00:42.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/projects/project2/tsconfig.json
Info 10   [00:00:43.000] Config: /user/username/projects/myproject/projects/project1/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/projects/project1/class1.ts"
 ],
 "options": {
  "module": 0,
  "composite": true,
  "configFilePath": "/user/username/projects/myproject/projects/project1/tsconfig.json"
 }
}
Info 11   [00:00:44.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/projects/project1/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/projects/project2/tsconfig.json WatchType: Config file
Info 12   [00:00:45.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/projects/project1 1 undefined Config: /user/username/projects/myproject/projects/project1/tsconfig.json WatchType: Wild card directory
Info 13   [00:00:46.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/projects/project1 1 undefined Config: /user/username/projects/myproject/projects/project1/tsconfig.json WatchType: Wild card directory
Info 14   [00:00:47.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/projects/project1/class1.d.ts 500 undefined WatchType: Closed Script info
Info 15   [00:00:48.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 16   [00:00:49.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/projects/project2/node_modules/@types 1 undefined Project: /user/username/projects/myproject/projects/project2/tsconfig.json WatchType: Type roots
Info 17   [00:00:50.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/projects/project2/node_modules/@types 1 undefined Project: /user/username/projects/myproject/projects/project2/tsconfig.json WatchType: Type roots
Info 18   [00:00:51.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/projects/node_modules/@types 1 undefined Project: /user/username/projects/myproject/projects/project2/tsconfig.json WatchType: Type roots
Info 19   [00:00:52.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/projects/node_modules/@types 1 undefined Project: /user/username/projects/myproject/projects/project2/tsconfig.json WatchType: Type roots
Info 20   [00:00:53.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/projects/project2/tsconfig.json WatchType: Type roots
Info 21   [00:00:54.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/projects/project2/tsconfig.json WatchType: Type roots
Info 22   [00:00:55.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/projects/project2/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 23   [00:00:56.000] Project '/user/username/projects/myproject/projects/project2/tsconfig.json' (Configured)
Info 24   [00:00:57.000] 	Files (3)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/myproject/projects/project1/class1.d.ts Text-1 "declare class class1 {}"
	/user/username/projects/myproject/projects/project2/class2.ts SVC-1-0 "class class2 {}"


	../../../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	../project1/class1.d.ts
	  Output from referenced project '../project1/tsconfig.json' included because '--module' is specified as 'none'
	class2.ts
	  Matched by default include pattern '**/*'

Info 25   [00:00:58.000] -----------------------------------------------
Info 26   [00:00:59.000] Search path: /user/username/projects/myproject/projects/project2
Info 27   [00:01:00.000] For info: /user/username/projects/myproject/projects/project2/tsconfig.json :: No config files found.
Info 28   [00:01:01.000] Project '/user/username/projects/myproject/projects/project2/tsconfig.json' (Configured)
Info 28   [00:01:02.000] 	Files (3)

Info 28   [00:01:03.000] -----------------------------------------------
Info 28   [00:01:04.000] Open files: 
Info 28   [00:01:05.000] 	FileName: /user/username/projects/myproject/projects/project2/class2.ts ProjectRootPath: undefined
Info 28   [00:01:06.000] 		Projects: /user/username/projects/myproject/projects/project2/tsconfig.json
Info 28   [00:01:07.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/user/username/projects/myproject/projects/project2/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/myproject/projects/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/projects/project2/tsconfig.json: *new*
  {}
/user/username/projects/myproject/projects/project1/tsconfig.json: *new*
  {}
/user/username/projects/myproject/projects/project1/class1.d.ts: *new*
  {}
/a/lib/lib.d.ts: *new*
  {}

FsWatchesRecursive::
/user/username/projects/myproject/projects/project2: *new*
  {}
/user/username/projects/myproject/projects/project1: *new*
  {}

Before request

Info 29   [00:01:08.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/myproject/projects/project1/class1.ts"
      },
      "seq": 2,
      "type": "request"
    }
Info 30   [00:01:09.000] Search path: /user/username/projects/myproject/projects/project1
Info 31   [00:01:10.000] For info: /user/username/projects/myproject/projects/project1/class1.ts :: Config file name: /user/username/projects/myproject/projects/project1/tsconfig.json
Info 32   [00:01:11.000] Creating configuration project /user/username/projects/myproject/projects/project1/tsconfig.json
Info 33   [00:01:12.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/projects/project1/tsconfig.json
Info 34   [00:01:13.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/projects/project1/node_modules/@types 1 undefined Project: /user/username/projects/myproject/projects/project1/tsconfig.json WatchType: Type roots
Info 35   [00:01:14.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/projects/project1/node_modules/@types 1 undefined Project: /user/username/projects/myproject/projects/project1/tsconfig.json WatchType: Type roots
Info 36   [00:01:15.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/projects/node_modules/@types 1 undefined Project: /user/username/projects/myproject/projects/project1/tsconfig.json WatchType: Type roots
Info 37   [00:01:16.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/projects/node_modules/@types 1 undefined Project: /user/username/projects/myproject/projects/project1/tsconfig.json WatchType: Type roots
Info 38   [00:01:17.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/projects/project1/tsconfig.json WatchType: Type roots
Info 39   [00:01:18.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/projects/project1/tsconfig.json WatchType: Type roots
Info 40   [00:01:19.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/projects/project1/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 41   [00:01:20.000] Project '/user/username/projects/myproject/projects/project1/tsconfig.json' (Configured)
Info 42   [00:01:21.000] 	Files (2)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/myproject/projects/project1/class1.ts SVC-1-0 "class class1 {}"


	../../../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	class1.ts
	  Matched by default include pattern '**/*'

Info 43   [00:01:22.000] -----------------------------------------------
Info 44   [00:01:23.000] Search path: /user/username/projects/myproject/projects/project1
Info 45   [00:01:24.000] For info: /user/username/projects/myproject/projects/project1/tsconfig.json :: No config files found.
Info 46   [00:01:25.000] Project '/user/username/projects/myproject/projects/project2/tsconfig.json' (Configured)
Info 46   [00:01:26.000] 	Files (3)

Info 46   [00:01:27.000] -----------------------------------------------
Info 46   [00:01:28.000] Project '/user/username/projects/myproject/projects/project1/tsconfig.json' (Configured)
Info 46   [00:01:29.000] 	Files (2)

Info 46   [00:01:30.000] -----------------------------------------------
Info 46   [00:01:31.000] Open files: 
Info 46   [00:01:32.000] 	FileName: /user/username/projects/myproject/projects/project2/class2.ts ProjectRootPath: undefined
Info 46   [00:01:33.000] 		Projects: /user/username/projects/myproject/projects/project2/tsconfig.json
Info 46   [00:01:34.000] 	FileName: /user/username/projects/myproject/projects/project1/class1.ts ProjectRootPath: undefined
Info 46   [00:01:35.000] 		Projects: /user/username/projects/myproject/projects/project1/tsconfig.json
Info 46   [00:01:36.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/user/username/projects/myproject/projects/project2/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/projects/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/projects/project1/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/projects/project2/tsconfig.json:
  {}
/user/username/projects/myproject/projects/project1/tsconfig.json:
  {}
/user/username/projects/myproject/projects/project1/class1.d.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/projects/project2:
  {}
/user/username/projects/myproject/projects/project1:
  {}

Info 47   [00:01:39.000] DirectoryWatcher:: Triggered with /user/username/projects/myproject/projects/project1/class3.ts :: WatchInfo: /user/username/projects/myproject/projects/project1 1 undefined Config: /user/username/projects/myproject/projects/project1/tsconfig.json WatchType: Wild card directory
Info 48   [00:01:40.000] Scheduled: /user/username/projects/myproject/projects/project2/tsconfig.json
Info 49   [00:01:41.000] Scheduled: *ensureProjectForOpenFiles*
Info 50   [00:01:42.000] Scheduled: /user/username/projects/myproject/projects/project1/tsconfig.json
Info 51   [00:01:43.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 52   [00:01:44.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/projects/project1/class3.ts :: WatchInfo: /user/username/projects/myproject/projects/project1 1 undefined Config: /user/username/projects/myproject/projects/project1/tsconfig.json WatchType: Wild card directory
Before running Timeout callback:: count: 3
1: /user/username/projects/myproject/projects/project2/tsconfig.json
3: /user/username/projects/myproject/projects/project1/tsconfig.json
4: *ensureProjectForOpenFiles*
//// [/user/username/projects/myproject/projects/project1/class3.ts]
class class3 {}


Info 53   [00:01:45.000] Running: /user/username/projects/myproject/projects/project2/tsconfig.json
Info 54   [00:01:46.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/projects/project2/tsconfig.json
Info 55   [00:01:47.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/projects/project1/class3.d.ts 500 undefined Project: /user/username/projects/myproject/projects/project2/tsconfig.json WatchType: Missing file
Info 56   [00:01:48.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/projects/project2/tsconfig.json Version: 2 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 57   [00:01:49.000] Project '/user/username/projects/myproject/projects/project2/tsconfig.json' (Configured)
Info 58   [00:01:50.000] 	Files (3)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/myproject/projects/project1/class1.d.ts Text-1 "declare class class1 {}"
	/user/username/projects/myproject/projects/project2/class2.ts SVC-1-0 "class class2 {}"

Info 59   [00:01:51.000] -----------------------------------------------
Info 60   [00:01:52.000] Running: /user/username/projects/myproject/projects/project1/tsconfig.json
Info 61   [00:01:53.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/projects/project1/class3.ts 500 undefined WatchType: Closed Script info
Info 62   [00:01:54.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/projects/project1/tsconfig.json
Info 63   [00:01:55.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/projects/project1/tsconfig.json Version: 2 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 64   [00:01:56.000] Project '/user/username/projects/myproject/projects/project1/tsconfig.json' (Configured)
Info 65   [00:01:57.000] 	Files (3)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/myproject/projects/project1/class1.ts SVC-1-0 "class class1 {}"
	/user/username/projects/myproject/projects/project1/class3.ts Text-1 "class class3 {}"


	../../../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	class1.ts
	  Matched by default include pattern '**/*'
	class3.ts
	  Matched by default include pattern '**/*'

Info 66   [00:01:58.000] -----------------------------------------------
Info 67   [00:01:59.000] Running: *ensureProjectForOpenFiles*
Info 68   [00:02:00.000] Before ensureProjectForOpenFiles:
Info 69   [00:02:01.000] Project '/user/username/projects/myproject/projects/project2/tsconfig.json' (Configured)
Info 69   [00:02:02.000] 	Files (3)

Info 69   [00:02:03.000] -----------------------------------------------
Info 69   [00:02:04.000] Project '/user/username/projects/myproject/projects/project1/tsconfig.json' (Configured)
Info 69   [00:02:05.000] 	Files (3)

Info 69   [00:02:06.000] -----------------------------------------------
Info 69   [00:02:07.000] Open files: 
Info 69   [00:02:08.000] 	FileName: /user/username/projects/myproject/projects/project2/class2.ts ProjectRootPath: undefined
Info 69   [00:02:09.000] 		Projects: /user/username/projects/myproject/projects/project2/tsconfig.json
Info 69   [00:02:10.000] 	FileName: /user/username/projects/myproject/projects/project1/class1.ts ProjectRootPath: undefined
Info 69   [00:02:11.000] 		Projects: /user/username/projects/myproject/projects/project1/tsconfig.json
Info 69   [00:02:12.000] After ensureProjectForOpenFiles:
Info 70   [00:02:13.000] Project '/user/username/projects/myproject/projects/project2/tsconfig.json' (Configured)
Info 70   [00:02:14.000] 	Files (3)

Info 70   [00:02:15.000] -----------------------------------------------
Info 70   [00:02:16.000] Project '/user/username/projects/myproject/projects/project1/tsconfig.json' (Configured)
Info 70   [00:02:17.000] 	Files (3)

Info 70   [00:02:18.000] -----------------------------------------------
Info 70   [00:02:19.000] Open files: 
Info 70   [00:02:20.000] 	FileName: /user/username/projects/myproject/projects/project2/class2.ts ProjectRootPath: undefined
Info 70   [00:02:21.000] 		Projects: /user/username/projects/myproject/projects/project2/tsconfig.json
Info 70   [00:02:22.000] 	FileName: /user/username/projects/myproject/projects/project1/class1.ts ProjectRootPath: undefined
Info 70   [00:02:23.000] 		Projects: /user/username/projects/myproject/projects/project1/tsconfig.json
After running Timeout callback:: count: 0

PolledWatches::
/user/username/projects/myproject/projects/project2/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/projects/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/projects/project1/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/projects/project1/class3.d.ts: *new*
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/projects/project2/tsconfig.json:
  {}
/user/username/projects/myproject/projects/project1/tsconfig.json:
  {}
/user/username/projects/myproject/projects/project1/class1.d.ts:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/projects/project1/class3.ts: *new*
  {}

FsWatchesRecursive::
/user/username/projects/myproject/projects/project2:
  {}
/user/username/projects/myproject/projects/project1:
  {}

Info 70   [00:02:26.000] FileWatcher:: Triggered with /user/username/projects/myproject/projects/project1/class3.d.ts 0:: WatchInfo: /user/username/projects/myproject/projects/project1/class3.d.ts 500 undefined Project: /user/username/projects/myproject/projects/project2/tsconfig.json WatchType: Missing file
Info 71   [00:02:27.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/projects/project1/class3.d.ts 500 undefined Project: /user/username/projects/myproject/projects/project2/tsconfig.json WatchType: Missing file
Info 72   [00:02:28.000] Scheduled: /user/username/projects/myproject/projects/project2/tsconfig.json
Info 73   [00:02:29.000] Scheduled: *ensureProjectForOpenFiles*
Info 74   [00:02:30.000] Elapsed:: *ms FileWatcher:: Triggered with /user/username/projects/myproject/projects/project1/class3.d.ts 0:: WatchInfo: /user/username/projects/myproject/projects/project1/class3.d.ts 500 undefined Project: /user/username/projects/myproject/projects/project2/tsconfig.json WatchType: Missing file
Info 75   [00:02:31.000] DirectoryWatcher:: Triggered with /user/username/projects/myproject/projects/project1/class3.d.ts :: WatchInfo: /user/username/projects/myproject/projects/project1 1 undefined Config: /user/username/projects/myproject/projects/project1/tsconfig.json WatchType: Wild card directory
Info 76   [00:02:32.000] Project: /user/username/projects/myproject/projects/project1/tsconfig.json Detected output file: /user/username/projects/myproject/projects/project1/class3.d.ts
Info 77   [00:02:33.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/projects/project1/class3.d.ts :: WatchInfo: /user/username/projects/myproject/projects/project1 1 undefined Config: /user/username/projects/myproject/projects/project1/tsconfig.json WatchType: Wild card directory
Before running Timeout callback:: count: 2
5: /user/username/projects/myproject/projects/project2/tsconfig.json
6: *ensureProjectForOpenFiles*
//// [/user/username/projects/myproject/projects/project1/class3.d.ts]
declare class class3 {}


PolledWatches::
/user/username/projects/myproject/projects/project2/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/projects/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/projects/project1/node_modules/@types:
  {"pollingInterval":500}

PolledWatches *deleted*::
/user/username/projects/myproject/projects/project1/class3.d.ts:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/projects/project2/tsconfig.json:
  {}
/user/username/projects/myproject/projects/project1/tsconfig.json:
  {}
/user/username/projects/myproject/projects/project1/class1.d.ts:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/projects/project1/class3.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/projects/project2:
  {}
/user/username/projects/myproject/projects/project1:
  {}

Info 78   [00:02:34.000] Running: /user/username/projects/myproject/projects/project2/tsconfig.json
Info 79   [00:02:35.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/projects/project2/tsconfig.json
Info 80   [00:02:36.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/projects/project1/class3.d.ts 500 undefined WatchType: Closed Script info
Info 81   [00:02:37.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/projects/project2/tsconfig.json Version: 3 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 82   [00:02:38.000] Project '/user/username/projects/myproject/projects/project2/tsconfig.json' (Configured)
Info 83   [00:02:39.000] 	Files (4)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/myproject/projects/project1/class1.d.ts Text-1 "declare class class1 {}"
	/user/username/projects/myproject/projects/project1/class3.d.ts Text-1 "declare class class3 {}"
	/user/username/projects/myproject/projects/project2/class2.ts SVC-1-0 "class class2 {}"


	../../../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	../project1/class1.d.ts
	  Output from referenced project '../project1/tsconfig.json' included because '--module' is specified as 'none'
	../project1/class3.d.ts
	  Output from referenced project '../project1/tsconfig.json' included because '--module' is specified as 'none'
	class2.ts
	  Matched by default include pattern '**/*'

Info 84   [00:02:40.000] -----------------------------------------------
Info 85   [00:02:41.000] Running: *ensureProjectForOpenFiles*
Info 86   [00:02:42.000] Before ensureProjectForOpenFiles:
Info 87   [00:02:43.000] Project '/user/username/projects/myproject/projects/project2/tsconfig.json' (Configured)
Info 87   [00:02:44.000] 	Files (4)

Info 87   [00:02:45.000] -----------------------------------------------
Info 87   [00:02:46.000] Project '/user/username/projects/myproject/projects/project1/tsconfig.json' (Configured)
Info 87   [00:02:47.000] 	Files (3)

Info 87   [00:02:48.000] -----------------------------------------------
Info 87   [00:02:49.000] Open files: 
Info 87   [00:02:50.000] 	FileName: /user/username/projects/myproject/projects/project2/class2.ts ProjectRootPath: undefined
Info 87   [00:02:51.000] 		Projects: /user/username/projects/myproject/projects/project2/tsconfig.json
Info 87   [00:02:52.000] 	FileName: /user/username/projects/myproject/projects/project1/class1.ts ProjectRootPath: undefined
Info 87   [00:02:53.000] 		Projects: /user/username/projects/myproject/projects/project1/tsconfig.json
Info 87   [00:02:54.000] After ensureProjectForOpenFiles:
Info 88   [00:02:55.000] Project '/user/username/projects/myproject/projects/project2/tsconfig.json' (Configured)
Info 88   [00:02:56.000] 	Files (4)

Info 88   [00:02:57.000] -----------------------------------------------
Info 88   [00:02:58.000] Project '/user/username/projects/myproject/projects/project1/tsconfig.json' (Configured)
Info 88   [00:02:59.000] 	Files (3)

Info 88   [00:03:00.000] -----------------------------------------------
Info 88   [00:03:01.000] Open files: 
Info 88   [00:03:02.000] 	FileName: /user/username/projects/myproject/projects/project2/class2.ts ProjectRootPath: undefined
Info 88   [00:03:03.000] 		Projects: /user/username/projects/myproject/projects/project2/tsconfig.json
Info 88   [00:03:04.000] 	FileName: /user/username/projects/myproject/projects/project1/class1.ts ProjectRootPath: undefined
Info 88   [00:03:05.000] 		Projects: /user/username/projects/myproject/projects/project1/tsconfig.json
After running Timeout callback:: count: 0

PolledWatches::
/user/username/projects/myproject/projects/project2/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/projects/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/projects/project1/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/projects/project2/tsconfig.json:
  {}
/user/username/projects/myproject/projects/project1/tsconfig.json:
  {}
/user/username/projects/myproject/projects/project1/class1.d.ts:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/projects/project1/class3.ts:
  {}
/user/username/projects/myproject/projects/project1/class3.d.ts: *new*
  {}

FsWatchesRecursive::
/user/username/projects/myproject/projects/project2:
  {}
/user/username/projects/myproject/projects/project1:
  {}

Info 88   [00:03:09.000] DirectoryWatcher:: Triggered with /user/username/projects/myproject/projects/project1/temp :: WatchInfo: /user/username/projects/myproject/projects/project1 1 undefined Config: /user/username/projects/myproject/projects/project1/tsconfig.json WatchType: Wild card directory
Info 89   [00:03:10.000] Project: /user/username/projects/myproject/projects/project1/tsconfig.json Detected excluded file: /user/username/projects/myproject/projects/project1/temp
Info 90   [00:03:11.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/projects/project1/temp :: WatchInfo: /user/username/projects/myproject/projects/project1 1 undefined Config: /user/username/projects/myproject/projects/project1/tsconfig.json WatchType: Wild card directory
Info 91   [00:03:13.000] DirectoryWatcher:: Triggered with /user/username/projects/myproject/projects/project1/temp/file.d.ts :: WatchInfo: /user/username/projects/myproject/projects/project1 1 undefined Config: /user/username/projects/myproject/projects/project1/tsconfig.json WatchType: Wild card directory
Info 92   [00:03:14.000] Project: /user/username/projects/myproject/projects/project1/tsconfig.json Detected excluded file: /user/username/projects/myproject/projects/project1/temp/file.d.ts
Info 93   [00:03:15.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/projects/project1/temp/file.d.ts :: WatchInfo: /user/username/projects/myproject/projects/project1 1 undefined Config: /user/username/projects/myproject/projects/project1/tsconfig.json WatchType: Wild card directory
Before running Timeout callback:: count: 0
//// [/user/username/projects/myproject/projects/project1/temp/file.d.ts]
declare class file {}


After running Timeout callback:: count: 0

Info 94   [00:03:17.000] FileWatcher:: Triggered with /user/username/projects/myproject/projects/project1/class3.d.ts 2:: WatchInfo: /user/username/projects/myproject/projects/project1/class3.d.ts 500 undefined WatchType: Closed Script info
Info 95   [00:03:18.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/projects/project1/class3.d.ts 500 undefined WatchType: Closed Script info
Info 96   [00:03:19.000] Scheduled: /user/username/projects/myproject/projects/project2/tsconfig.json
Info 97   [00:03:20.000] Scheduled: *ensureProjectForOpenFiles*
Info 98   [00:03:21.000] Elapsed:: *ms FileWatcher:: Triggered with /user/username/projects/myproject/projects/project1/class3.d.ts 2:: WatchInfo: /user/username/projects/myproject/projects/project1/class3.d.ts 500 undefined WatchType: Closed Script info
Info 99   [00:03:22.000] DirectoryWatcher:: Triggered with /user/username/projects/myproject/projects/project1/class3.d.ts :: WatchInfo: /user/username/projects/myproject/projects/project1 1 undefined Config: /user/username/projects/myproject/projects/project1/tsconfig.json WatchType: Wild card directory
Info 100  [00:03:23.000] Project: /user/username/projects/myproject/projects/project1/tsconfig.json Detected output file: /user/username/projects/myproject/projects/project1/class3.d.ts
Info 101  [00:03:24.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/projects/project1/class3.d.ts :: WatchInfo: /user/username/projects/myproject/projects/project1 1 undefined Config: /user/username/projects/myproject/projects/project1/tsconfig.json WatchType: Wild card directory
Before running Timeout callback:: count: 2
7: /user/username/projects/myproject/projects/project2/tsconfig.json
8: *ensureProjectForOpenFiles*
//// [/user/username/projects/myproject/projects/project1/class3.d.ts] deleted

PolledWatches::
/user/username/projects/myproject/projects/project2/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/projects/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/projects/project1/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/projects/project2/tsconfig.json:
  {}
/user/username/projects/myproject/projects/project1/tsconfig.json:
  {}
/user/username/projects/myproject/projects/project1/class1.d.ts:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/projects/project1/class3.ts:
  {}

FsWatches *deleted*::
/user/username/projects/myproject/projects/project1/class3.d.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/projects/project2:
  {}
/user/username/projects/myproject/projects/project1:
  {}

Info 102  [00:03:25.000] Running: /user/username/projects/myproject/projects/project2/tsconfig.json
Info 103  [00:03:26.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/projects/project2/tsconfig.json
Info 104  [00:03:27.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/projects/project1/class3.d.ts 500 undefined Project: /user/username/projects/myproject/projects/project2/tsconfig.json WatchType: Missing file
Info 105  [00:03:28.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/projects/project2/tsconfig.json Version: 4 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 106  [00:03:29.000] Project '/user/username/projects/myproject/projects/project2/tsconfig.json' (Configured)
Info 107  [00:03:30.000] 	Files (3)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/myproject/projects/project1/class1.d.ts Text-1 "declare class class1 {}"
	/user/username/projects/myproject/projects/project2/class2.ts SVC-1-0 "class class2 {}"


	../../../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	../project1/class1.d.ts
	  Output from referenced project '../project1/tsconfig.json' included because '--module' is specified as 'none'
	class2.ts
	  Matched by default include pattern '**/*'

Info 108  [00:03:31.000] -----------------------------------------------
Info 109  [00:03:32.000] Running: *ensureProjectForOpenFiles*
Info 110  [00:03:33.000] Before ensureProjectForOpenFiles:
Info 111  [00:03:34.000] Project '/user/username/projects/myproject/projects/project2/tsconfig.json' (Configured)
Info 111  [00:03:35.000] 	Files (3)

Info 111  [00:03:36.000] -----------------------------------------------
Info 111  [00:03:37.000] Project '/user/username/projects/myproject/projects/project1/tsconfig.json' (Configured)
Info 111  [00:03:38.000] 	Files (3)

Info 111  [00:03:39.000] -----------------------------------------------
Info 111  [00:03:40.000] Open files: 
Info 111  [00:03:41.000] 	FileName: /user/username/projects/myproject/projects/project2/class2.ts ProjectRootPath: undefined
Info 111  [00:03:42.000] 		Projects: /user/username/projects/myproject/projects/project2/tsconfig.json
Info 111  [00:03:43.000] 	FileName: /user/username/projects/myproject/projects/project1/class1.ts ProjectRootPath: undefined
Info 111  [00:03:44.000] 		Projects: /user/username/projects/myproject/projects/project1/tsconfig.json
Info 111  [00:03:45.000] After ensureProjectForOpenFiles:
Info 112  [00:03:46.000] Project '/user/username/projects/myproject/projects/project2/tsconfig.json' (Configured)
Info 112  [00:03:47.000] 	Files (3)

Info 112  [00:03:48.000] -----------------------------------------------
Info 112  [00:03:49.000] Project '/user/username/projects/myproject/projects/project1/tsconfig.json' (Configured)
Info 112  [00:03:50.000] 	Files (3)

Info 112  [00:03:51.000] -----------------------------------------------
Info 112  [00:03:52.000] Open files: 
Info 112  [00:03:53.000] 	FileName: /user/username/projects/myproject/projects/project2/class2.ts ProjectRootPath: undefined
Info 112  [00:03:54.000] 		Projects: /user/username/projects/myproject/projects/project2/tsconfig.json
Info 112  [00:03:55.000] 	FileName: /user/username/projects/myproject/projects/project1/class1.ts ProjectRootPath: undefined
Info 112  [00:03:56.000] 		Projects: /user/username/projects/myproject/projects/project1/tsconfig.json
After running Timeout callback:: count: 0

PolledWatches::
/user/username/projects/myproject/projects/project2/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/projects/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/projects/project1/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/projects/project1/class3.d.ts: *new*
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/projects/project2/tsconfig.json:
  {}
/user/username/projects/myproject/projects/project1/tsconfig.json:
  {}
/user/username/projects/myproject/projects/project1/class1.d.ts:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/projects/project1/class3.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/projects/project2:
  {}
/user/username/projects/myproject/projects/project1:
  {}

Info 112  [00:03:59.000] FileWatcher:: Triggered with /user/username/projects/myproject/projects/project1/class3.d.ts 0:: WatchInfo: /user/username/projects/myproject/projects/project1/class3.d.ts 500 undefined Project: /user/username/projects/myproject/projects/project2/tsconfig.json WatchType: Missing file
Info 113  [00:04:00.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/projects/project1/class3.d.ts 500 undefined Project: /user/username/projects/myproject/projects/project2/tsconfig.json WatchType: Missing file
Info 114  [00:04:01.000] Scheduled: /user/username/projects/myproject/projects/project2/tsconfig.json
Info 115  [00:04:02.000] Scheduled: *ensureProjectForOpenFiles*
Info 116  [00:04:03.000] Elapsed:: *ms FileWatcher:: Triggered with /user/username/projects/myproject/projects/project1/class3.d.ts 0:: WatchInfo: /user/username/projects/myproject/projects/project1/class3.d.ts 500 undefined Project: /user/username/projects/myproject/projects/project2/tsconfig.json WatchType: Missing file
Info 117  [00:04:04.000] DirectoryWatcher:: Triggered with /user/username/projects/myproject/projects/project1/class3.d.ts :: WatchInfo: /user/username/projects/myproject/projects/project1 1 undefined Config: /user/username/projects/myproject/projects/project1/tsconfig.json WatchType: Wild card directory
Info 118  [00:04:05.000] Project: /user/username/projects/myproject/projects/project1/tsconfig.json Detected output file: /user/username/projects/myproject/projects/project1/class3.d.ts
Info 119  [00:04:06.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/projects/project1/class3.d.ts :: WatchInfo: /user/username/projects/myproject/projects/project1 1 undefined Config: /user/username/projects/myproject/projects/project1/tsconfig.json WatchType: Wild card directory
Before running Timeout callback:: count: 2
9: /user/username/projects/myproject/projects/project2/tsconfig.json
10: *ensureProjectForOpenFiles*
//// [/user/username/projects/myproject/projects/project1/class3.d.ts]
declare class class3 {}


PolledWatches::
/user/username/projects/myproject/projects/project2/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/projects/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/projects/project1/node_modules/@types:
  {"pollingInterval":500}

PolledWatches *deleted*::
/user/username/projects/myproject/projects/project1/class3.d.ts:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/projects/project2/tsconfig.json:
  {}
/user/username/projects/myproject/projects/project1/tsconfig.json:
  {}
/user/username/projects/myproject/projects/project1/class1.d.ts:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/projects/project1/class3.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/projects/project2:
  {}
/user/username/projects/myproject/projects/project1:
  {}

Info 120  [00:04:07.000] Running: /user/username/projects/myproject/projects/project2/tsconfig.json
Info 121  [00:04:08.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/projects/project2/tsconfig.json
Info 122  [00:04:09.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/projects/project1/class3.d.ts 500 undefined WatchType: Closed Script info
Info 123  [00:04:10.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/projects/project2/tsconfig.json Version: 5 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 124  [00:04:11.000] Project '/user/username/projects/myproject/projects/project2/tsconfig.json' (Configured)
Info 125  [00:04:12.000] 	Files (4)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/myproject/projects/project1/class1.d.ts Text-1 "declare class class1 {}"
	/user/username/projects/myproject/projects/project1/class3.d.ts Text-2 "declare class class3 {}"
	/user/username/projects/myproject/projects/project2/class2.ts SVC-1-0 "class class2 {}"


	../../../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	../project1/class1.d.ts
	  Output from referenced project '../project1/tsconfig.json' included because '--module' is specified as 'none'
	../project1/class3.d.ts
	  Output from referenced project '../project1/tsconfig.json' included because '--module' is specified as 'none'
	class2.ts
	  Matched by default include pattern '**/*'

Info 126  [00:04:13.000] -----------------------------------------------
Info 127  [00:04:14.000] Running: *ensureProjectForOpenFiles*
Info 128  [00:04:15.000] Before ensureProjectForOpenFiles:
Info 129  [00:04:16.000] Project '/user/username/projects/myproject/projects/project2/tsconfig.json' (Configured)
Info 129  [00:04:17.000] 	Files (4)

Info 129  [00:04:18.000] -----------------------------------------------
Info 129  [00:04:19.000] Project '/user/username/projects/myproject/projects/project1/tsconfig.json' (Configured)
Info 129  [00:04:20.000] 	Files (3)

Info 129  [00:04:21.000] -----------------------------------------------
Info 129  [00:04:22.000] Open files: 
Info 129  [00:04:23.000] 	FileName: /user/username/projects/myproject/projects/project2/class2.ts ProjectRootPath: undefined
Info 129  [00:04:24.000] 		Projects: /user/username/projects/myproject/projects/project2/tsconfig.json
Info 129  [00:04:25.000] 	FileName: /user/username/projects/myproject/projects/project1/class1.ts ProjectRootPath: undefined
Info 129  [00:04:26.000] 		Projects: /user/username/projects/myproject/projects/project1/tsconfig.json
Info 129  [00:04:27.000] After ensureProjectForOpenFiles:
Info 130  [00:04:28.000] Project '/user/username/projects/myproject/projects/project2/tsconfig.json' (Configured)
Info 130  [00:04:29.000] 	Files (4)

Info 130  [00:04:30.000] -----------------------------------------------
Info 130  [00:04:31.000] Project '/user/username/projects/myproject/projects/project1/tsconfig.json' (Configured)
Info 130  [00:04:32.000] 	Files (3)

Info 130  [00:04:33.000] -----------------------------------------------
Info 130  [00:04:34.000] Open files: 
Info 130  [00:04:35.000] 	FileName: /user/username/projects/myproject/projects/project2/class2.ts ProjectRootPath: undefined
Info 130  [00:04:36.000] 		Projects: /user/username/projects/myproject/projects/project2/tsconfig.json
Info 130  [00:04:37.000] 	FileName: /user/username/projects/myproject/projects/project1/class1.ts ProjectRootPath: undefined
Info 130  [00:04:38.000] 		Projects: /user/username/projects/myproject/projects/project1/tsconfig.json
After running Timeout callback:: count: 0

PolledWatches::
/user/username/projects/myproject/projects/project2/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/projects/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/projects/project1/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/projects/project2/tsconfig.json:
  {}
/user/username/projects/myproject/projects/project1/tsconfig.json:
  {}
/user/username/projects/myproject/projects/project1/class1.d.ts:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/projects/project1/class3.ts:
  {}
/user/username/projects/myproject/projects/project1/class3.d.ts: *new*
  {}

FsWatchesRecursive::
/user/username/projects/myproject/projects/project2:
  {}
/user/username/projects/myproject/projects/project1:
  {}
