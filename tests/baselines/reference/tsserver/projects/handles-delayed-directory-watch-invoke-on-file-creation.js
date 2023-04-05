currentDirectory:: / useCaseSensitiveFileNames: false
Info 0    [00:00:25.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Before request
//// [/users/username/projects/project/sub/a.ts]
export const a = 10;

//// [/users/username/projects/project/b.ts]
export const b = 10;

//// [/users/username/projects/project/tsconfig.json]
{}

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


Info 1    [00:00:26.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/users/username/projects/project/b.ts",
        "projectRootPath": "/users/username/projects/project"
      },
      "seq": 1,
      "type": "request"
    }
Info 2    [00:00:27.000] Search path: /users/username/projects/project
Info 3    [00:00:28.000] For info: /users/username/projects/project/b.ts :: Config file name: /users/username/projects/project/tsconfig.json
Info 4    [00:00:29.000] Creating configuration project /users/username/projects/project/tsconfig.json
Info 5    [00:00:30.000] FileWatcher:: Added:: WatchInfo: /users/username/projects/project/tsconfig.json 2000 undefined Project: /users/username/projects/project/tsconfig.json WatchType: Config file
Info 6    [00:00:31.000] event:
    {"seq":0,"type":"event","event":"projectLoadingStart","body":{"projectName":"/users/username/projects/project/tsconfig.json","reason":"Creating possible configured project for /users/username/projects/project/b.ts to open"}}
Info 7    [00:00:32.000] Config: /users/username/projects/project/tsconfig.json : {
 "rootNames": [
  "/users/username/projects/project/b.ts",
  "/users/username/projects/project/sub/a.ts"
 ],
 "options": {
  "configFilePath": "/users/username/projects/project/tsconfig.json"
 }
}
Info 8    [00:00:33.000] DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/project 1 undefined Config: /users/username/projects/project/tsconfig.json WatchType: Wild card directory
Info 9    [00:00:34.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/project 1 undefined Config: /users/username/projects/project/tsconfig.json WatchType: Wild card directory
Info 10   [00:00:35.000] FileWatcher:: Added:: WatchInfo: /users/username/projects/project/sub/a.ts 500 undefined WatchType: Closed Script info
Info 11   [00:00:36.000] Starting updateGraphWorker: Project: /users/username/projects/project/tsconfig.json
Info 12   [00:00:37.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 13   [00:00:38.000] DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/project/node_modules/@types 1 undefined Project: /users/username/projects/project/tsconfig.json WatchType: Type roots
Info 14   [00:00:39.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/project/node_modules/@types 1 undefined Project: /users/username/projects/project/tsconfig.json WatchType: Type roots
Info 15   [00:00:40.000] Finishing updateGraphWorker: Project: /users/username/projects/project/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 16   [00:00:41.000] Project '/users/username/projects/project/tsconfig.json' (Configured)
Info 17   [00:00:42.000] 	Files (3)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/users/username/projects/project/b.ts SVC-1-0 "export const b = 10;"
	/users/username/projects/project/sub/a.ts Text-1 "export const a = 10;"


	../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	b.ts
	  Matched by default include pattern '**/*'
	sub/a.ts
	  Matched by default include pattern '**/*'

Info 18   [00:00:43.000] -----------------------------------------------
Info 19   [00:00:44.000] event:
    {"seq":0,"type":"event","event":"projectLoadingFinish","body":{"projectName":"/users/username/projects/project/tsconfig.json"}}
Info 20   [00:00:45.000] event:
    {"seq":0,"type":"event","event":"telemetry","body":{"telemetryEventName":"projectInfo","payload":{"projectId":"5b0be5fc7f7235edf5a31bffe614b4e0819e55ec5f118558864b1f882e283c0d","fileStats":{"js":0,"jsSize":0,"jsx":0,"jsxSize":0,"ts":2,"tsSize":40,"tsx":0,"tsxSize":0,"dts":1,"dtsSize":334,"deferred":0,"deferredSize":0},"compilerOptions":{},"typeAcquisition":{"enable":false,"include":false,"exclude":false},"extends":false,"files":false,"include":false,"exclude":false,"compileOnSave":false,"configFileName":"tsconfig.json","projectType":"configured","languageServiceEnabled":true,"version":"FakeVersion"}}}
Info 21   [00:00:46.000] event:
    {"seq":0,"type":"event","event":"configFileDiag","body":{"triggerFile":"/users/username/projects/project/b.ts","configFile":"/users/username/projects/project/tsconfig.json","diagnostics":[]}}
Info 22   [00:00:47.000] Project '/users/username/projects/project/tsconfig.json' (Configured)
Info 22   [00:00:48.000] 	Files (3)

Info 22   [00:00:49.000] -----------------------------------------------
Info 22   [00:00:50.000] Open files: 
Info 22   [00:00:51.000] 	FileName: /users/username/projects/project/b.ts ProjectRootPath: /users/username/projects/project
Info 22   [00:00:52.000] 		Projects: /users/username/projects/project/tsconfig.json
Info 22   [00:00:53.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/users/username/projects/project/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/users/username/projects/project/tsconfig.json: *new*
  {}
/users/username/projects/project/sub/a.ts: *new*
  {}
/a/lib/lib.d.ts: *new*
  {}

FsWatchesRecursive::
/users/username/projects/project: *new*
  {}

Before request

Info 23   [00:00:54.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/users/username/projects/project/sub/a.ts",
        "projectRootPath": "/users/username/projects/project"
      },
      "seq": 2,
      "type": "request"
    }
Info 24   [00:00:55.000] FileWatcher:: Close:: WatchInfo: /users/username/projects/project/sub/a.ts 500 undefined WatchType: Closed Script info
Info 25   [00:00:56.000] Search path: /users/username/projects/project/sub
Info 26   [00:00:57.000] For info: /users/username/projects/project/sub/a.ts :: Config file name: /users/username/projects/project/tsconfig.json
Info 27   [00:00:58.000] Project '/users/username/projects/project/tsconfig.json' (Configured)
Info 27   [00:00:59.000] 	Files (3)

Info 27   [00:01:00.000] -----------------------------------------------
Info 27   [00:01:01.000] Open files: 
Info 27   [00:01:02.000] 	FileName: /users/username/projects/project/b.ts ProjectRootPath: /users/username/projects/project
Info 27   [00:01:03.000] 		Projects: /users/username/projects/project/tsconfig.json
Info 27   [00:01:04.000] 	FileName: /users/username/projects/project/sub/a.ts ProjectRootPath: /users/username/projects/project
Info 27   [00:01:05.000] 		Projects: /users/username/projects/project/tsconfig.json
Info 27   [00:01:06.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/users/username/projects/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/users/username/projects/project/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}

FsWatches *deleted*::
/users/username/projects/project/sub/a.ts:
  {}

FsWatchesRecursive::
/users/username/projects/project:
  {}

Before running Timeout callback:: count: 0

After running Timeout callback:: count: 0

Info 28   [00:01:08.000] DirectoryWatcher:: Triggered with /users/username/projects/project/sub/a.ts :: WatchInfo: /users/username/projects/project 1 undefined Config: /users/username/projects/project/tsconfig.json WatchType: Wild card directory
Info 29   [00:01:09.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /users/username/projects/project/sub/a.ts :: WatchInfo: /users/username/projects/project 1 undefined Config: /users/username/projects/project/tsconfig.json WatchType: Wild card directory
Info 30   [00:01:11.000] DirectoryWatcher:: Triggered with /users/username/projects/project/sub :: WatchInfo: /users/username/projects/project 1 undefined Config: /users/username/projects/project/tsconfig.json WatchType: Wild card directory
Info 31   [00:01:12.000] Scheduled: /users/username/projects/project/tsconfig.json
Info 32   [00:01:13.000] Scheduled: *ensureProjectForOpenFiles*
Info 33   [00:01:14.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /users/username/projects/project/sub :: WatchInfo: /users/username/projects/project 1 undefined Config: /users/username/projects/project/tsconfig.json WatchType: Wild card directory
Info 34   [00:01:17.000] DirectoryWatcher:: Triggered with /users/username/projects/project/a.ts :: WatchInfo: /users/username/projects/project 1 undefined Config: /users/username/projects/project/tsconfig.json WatchType: Wild card directory
Info 35   [00:01:18.000] Scheduled: /users/username/projects/project/tsconfig.json, Cancelled earlier one
Info 36   [00:01:19.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 37   [00:01:20.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /users/username/projects/project/a.ts :: WatchInfo: /users/username/projects/project 1 undefined Config: /users/username/projects/project/tsconfig.json WatchType: Wild card directory
Timeout callback:: count: 2
3: /users/username/projects/project/tsconfig.json
4: *ensureProjectForOpenFiles*
Immedidate callback:: count: 0
//// [/users/username/projects/project/a.ts]
export const a = 10;

//// [/users/username/projects/project/sub/a.ts] deleted

Before request

Info 38   [00:01:21.000] request:
    {
      "command": "close",
      "arguments": {
        "file": "/users/username/projects/project/sub/a.ts"
      },
      "seq": 3,
      "type": "request"
    }
Info 39   [00:01:22.000] Scheduled: /users/username/projects/project/tsconfig.json, Cancelled earlier one
Info 40   [00:01:23.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 41   [00:01:24.000] Project '/users/username/projects/project/tsconfig.json' (Configured)
Info 41   [00:01:25.000] 	Files (3)

Info 41   [00:01:26.000] -----------------------------------------------
Info 41   [00:01:27.000] Open files: 
Info 41   [00:01:28.000] 	FileName: /users/username/projects/project/b.ts ProjectRootPath: /users/username/projects/project
Info 41   [00:01:29.000] 		Projects: /users/username/projects/project/tsconfig.json
Info 41   [00:01:30.000] response:
    {
      "responseRequired": false
    }
After request

Timeout callback:: count: 2
5: /users/username/projects/project/tsconfig.json
6: *ensureProjectForOpenFiles*
Immedidate callback:: count: 0

Before request

Info 42   [00:01:31.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/users/username/projects/project/a.ts",
        "projectRootPath": "/users/username/projects/project"
      },
      "seq": 4,
      "type": "request"
    }
Info 43   [00:01:32.000] Search path: /users/username/projects/project
Info 44   [00:01:33.000] For info: /users/username/projects/project/a.ts :: Config file name: /users/username/projects/project/tsconfig.json
Info 45   [00:01:34.000] Starting updateGraphWorker: Project: /users/username/projects/project/tsconfig.json
Info 46   [00:01:35.000] Finishing updateGraphWorker: Project: /users/username/projects/project/tsconfig.json Version: 2 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 47   [00:01:36.000] Project '/users/username/projects/project/tsconfig.json' (Configured)
Info 48   [00:01:37.000] 	Files (3)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/users/username/projects/project/b.ts SVC-1-0 "export const b = 10;"
	/users/username/projects/project/a.ts SVC-1-0 "export const a = 10;"


	../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	b.ts
	  Matched by default include pattern '**/*'
	a.ts
	  Matched by default include pattern '**/*'

Info 49   [00:01:38.000] -----------------------------------------------
Info 50   [00:01:39.000] Project '/users/username/projects/project/tsconfig.json' (Configured)
Info 50   [00:01:40.000] 	Files (3)

Info 50   [00:01:41.000] -----------------------------------------------
Info 50   [00:01:42.000] Open files: 
Info 50   [00:01:43.000] 	FileName: /users/username/projects/project/b.ts ProjectRootPath: /users/username/projects/project
Info 50   [00:01:44.000] 		Projects: /users/username/projects/project/tsconfig.json
Info 50   [00:01:45.000] 	FileName: /users/username/projects/project/a.ts ProjectRootPath: /users/username/projects/project
Info 50   [00:01:46.000] 		Projects: /users/username/projects/project/tsconfig.json
Info 50   [00:01:47.000] response:
    {
      "responseRequired": false
    }
After request

Before running Timeout callback:: count: 2
5: /users/username/projects/project/tsconfig.json
6: *ensureProjectForOpenFiles*

Info 51   [00:01:48.000] Running: /users/username/projects/project/tsconfig.json
Info 52   [00:01:49.000] Running: *ensureProjectForOpenFiles*
Info 53   [00:01:50.000] Before ensureProjectForOpenFiles:
Info 54   [00:01:51.000] Project '/users/username/projects/project/tsconfig.json' (Configured)
Info 54   [00:01:52.000] 	Files (3)

Info 54   [00:01:53.000] -----------------------------------------------
Info 54   [00:01:54.000] Open files: 
Info 54   [00:01:55.000] 	FileName: /users/username/projects/project/b.ts ProjectRootPath: /users/username/projects/project
Info 54   [00:01:56.000] 		Projects: /users/username/projects/project/tsconfig.json
Info 54   [00:01:57.000] 	FileName: /users/username/projects/project/a.ts ProjectRootPath: /users/username/projects/project
Info 54   [00:01:58.000] 		Projects: /users/username/projects/project/tsconfig.json
Info 54   [00:01:59.000] After ensureProjectForOpenFiles:
Info 55   [00:02:00.000] Project '/users/username/projects/project/tsconfig.json' (Configured)
Info 55   [00:02:01.000] 	Files (3)

Info 55   [00:02:02.000] -----------------------------------------------
Info 55   [00:02:03.000] Open files: 
Info 55   [00:02:04.000] 	FileName: /users/username/projects/project/b.ts ProjectRootPath: /users/username/projects/project
Info 55   [00:02:05.000] 		Projects: /users/username/projects/project/tsconfig.json
Info 55   [00:02:06.000] 	FileName: /users/username/projects/project/a.ts ProjectRootPath: /users/username/projects/project
Info 55   [00:02:07.000] 		Projects: /users/username/projects/project/tsconfig.json
Info 55   [00:02:08.000] got projects updated in background, updating diagnostics for /users/username/projects/project/b.ts,/users/username/projects/project/a.ts
Info 56   [00:02:09.000] event:
    {"seq":0,"type":"event","event":"projectsUpdatedInBackground","body":{"openFiles":["/users/username/projects/project/b.ts","/users/username/projects/project/a.ts"]}}
After running Timeout callback:: count: 0

Before request

Info 57   [00:02:10.000] request:
    {
      "command": "close",
      "arguments": {
        "file": "/users/username/projects/project/a.ts"
      },
      "seq": 5,
      "type": "request"
    }
Info 58   [00:02:11.000] Scheduled: /users/username/projects/project/tsconfig.json
Info 59   [00:02:12.000] Scheduled: *ensureProjectForOpenFiles*
Info 60   [00:02:13.000] Project '/users/username/projects/project/tsconfig.json' (Configured)
Info 60   [00:02:14.000] 	Files (3)

Info 60   [00:02:15.000] -----------------------------------------------
Info 60   [00:02:16.000] Open files: 
Info 60   [00:02:17.000] 	FileName: /users/username/projects/project/b.ts ProjectRootPath: /users/username/projects/project
Info 60   [00:02:18.000] 		Projects: /users/username/projects/project/tsconfig.json
Info 60   [00:02:19.000] response:
    {
      "responseRequired": false
    }
After request

Timeout callback:: count: 2
7: /users/username/projects/project/tsconfig.json
8: *ensureProjectForOpenFiles*
Immedidate callback:: count: 0

Before request

Info 61   [00:02:20.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/users/username/projects/project/sub/a.ts",
        "projectRootPath": "/users/username/projects/project"
      },
      "seq": 6,
      "type": "request"
    }
Info 62   [00:02:21.000] Search path: /users/username/projects/project/sub
Info 63   [00:02:22.000] For info: /users/username/projects/project/sub/a.ts :: Config file name: /users/username/projects/project/tsconfig.json
Info 64   [00:02:23.000] Starting updateGraphWorker: Project: /users/username/projects/project/tsconfig.json
Info 65   [00:02:24.000] FileWatcher:: Added:: WatchInfo: /users/username/projects/project/a.ts 500 undefined Project: /users/username/projects/project/tsconfig.json WatchType: Missing file
Info 66   [00:02:25.000] Finishing updateGraphWorker: Project: /users/username/projects/project/tsconfig.json Version: 3 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 67   [00:02:26.000] Project '/users/username/projects/project/tsconfig.json' (Configured)
Info 68   [00:02:27.000] 	Files (2)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/users/username/projects/project/b.ts SVC-1-0 "export const b = 10;"


	../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	b.ts
	  Matched by default include pattern '**/*'

Info 69   [00:02:28.000] -----------------------------------------------
Info 70   [00:02:29.000] event:
    {"seq":0,"type":"event","event":"configFileDiag","body":{"triggerFile":"/users/username/projects/project/sub/a.ts","configFile":"/users/username/projects/project/tsconfig.json","diagnostics":[{"text":"File '/users/username/projects/project/a.ts' not found.\n  The file is in the program because:\n    Matched by default include pattern '**/*'","code":6053,"category":"error"}]}}
Info 71   [00:02:30.000] FileWatcher:: Added:: WatchInfo: /users/username/projects/project/sub/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 72   [00:02:31.000] FileWatcher:: Added:: WatchInfo: /users/username/projects/project/sub/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 73   [00:02:32.000] FileWatcher:: Added:: WatchInfo: /users/username/projects/project/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 74   [00:02:33.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 75   [00:02:34.000] DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/project/sub/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 76   [00:02:35.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/project/sub/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 77   [00:02:36.000] DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/project/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 78   [00:02:37.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/project/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 79   [00:02:38.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 80   [00:02:39.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 81   [00:02:40.000] 	Files (2)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/users/username/projects/project/sub/a.ts SVC-2-0 ""


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	a.ts
	  Root file specified for compilation

Info 82   [00:02:41.000] -----------------------------------------------
Info 83   [00:02:42.000] Project '/users/username/projects/project/tsconfig.json' (Configured)
Info 83   [00:02:43.000] 	Files (2)

Info 83   [00:02:44.000] -----------------------------------------------
Info 83   [00:02:45.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 83   [00:02:46.000] 	Files (2)

Info 83   [00:02:47.000] -----------------------------------------------
Info 83   [00:02:48.000] Open files: 
Info 83   [00:02:49.000] 	FileName: /users/username/projects/project/b.ts ProjectRootPath: /users/username/projects/project
Info 83   [00:02:50.000] 		Projects: /users/username/projects/project/tsconfig.json
Info 83   [00:02:51.000] 	FileName: /users/username/projects/project/sub/a.ts ProjectRootPath: /users/username/projects/project
Info 83   [00:02:52.000] 		Projects: /dev/null/inferredProject1*
Info 83   [00:02:53.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/users/username/projects/project/node_modules/@types:
  {"pollingInterval":500}
/users/username/projects/project/a.ts: *new*
  {"pollingInterval":500}
/users/username/projects/project/sub/tsconfig.json: *new*
  {"pollingInterval":2000}
/users/username/projects/project/sub/jsconfig.json: *new*
  {"pollingInterval":2000}
/users/username/projects/project/jsconfig.json: *new*
  {"pollingInterval":2000}
/users/username/projects/project/sub/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/users/username/projects/project/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/users/username/projects/project:
  {}

Before running Timeout callback:: count: 2
7: /users/username/projects/project/tsconfig.json
8: *ensureProjectForOpenFiles*

Info 84   [00:02:54.000] Running: /users/username/projects/project/tsconfig.json
Info 85   [00:02:55.000] Running: *ensureProjectForOpenFiles*
Info 86   [00:02:56.000] Before ensureProjectForOpenFiles:
Info 87   [00:02:57.000] Project '/users/username/projects/project/tsconfig.json' (Configured)
Info 87   [00:02:58.000] 	Files (2)

Info 87   [00:02:59.000] -----------------------------------------------
Info 87   [00:03:00.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 87   [00:03:01.000] 	Files (2)

Info 87   [00:03:02.000] -----------------------------------------------
Info 87   [00:03:03.000] Open files: 
Info 87   [00:03:04.000] 	FileName: /users/username/projects/project/b.ts ProjectRootPath: /users/username/projects/project
Info 87   [00:03:05.000] 		Projects: /users/username/projects/project/tsconfig.json
Info 87   [00:03:06.000] 	FileName: /users/username/projects/project/sub/a.ts ProjectRootPath: /users/username/projects/project
Info 87   [00:03:07.000] 		Projects: /dev/null/inferredProject1*
Info 87   [00:03:08.000] After ensureProjectForOpenFiles:
Info 88   [00:03:09.000] Project '/users/username/projects/project/tsconfig.json' (Configured)
Info 88   [00:03:10.000] 	Files (2)

Info 88   [00:03:11.000] -----------------------------------------------
Info 88   [00:03:12.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 88   [00:03:13.000] 	Files (2)

Info 88   [00:03:14.000] -----------------------------------------------
Info 88   [00:03:15.000] Open files: 
Info 88   [00:03:16.000] 	FileName: /users/username/projects/project/b.ts ProjectRootPath: /users/username/projects/project
Info 88   [00:03:17.000] 		Projects: /users/username/projects/project/tsconfig.json
Info 88   [00:03:18.000] 	FileName: /users/username/projects/project/sub/a.ts ProjectRootPath: /users/username/projects/project
Info 88   [00:03:19.000] 		Projects: /dev/null/inferredProject1*
Info 88   [00:03:20.000] got projects updated in background, updating diagnostics for /users/username/projects/project/b.ts,/users/username/projects/project/sub/a.ts
Info 89   [00:03:21.000] event:
    {"seq":0,"type":"event","event":"projectsUpdatedInBackground","body":{"openFiles":["/users/username/projects/project/b.ts","/users/username/projects/project/sub/a.ts"]}}
After running Timeout callback:: count: 0

Info 90   [00:03:23.000] DirectoryWatcher:: Triggered with /users/username/projects/project/a.ts :: WatchInfo: /users/username/projects/project 1 undefined Config: /users/username/projects/project/tsconfig.json WatchType: Wild card directory
Info 91   [00:03:24.000] Scheduled: /users/username/projects/project/tsconfig.json
Info 92   [00:03:25.000] Scheduled: *ensureProjectForOpenFiles*
Info 93   [00:03:26.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /users/username/projects/project/a.ts :: WatchInfo: /users/username/projects/project 1 undefined Config: /users/username/projects/project/tsconfig.json WatchType: Wild card directory
Info 94   [00:03:30.000] DirectoryWatcher:: Triggered with /users/username/projects/project/sub :: WatchInfo: /users/username/projects/project 1 undefined Config: /users/username/projects/project/tsconfig.json WatchType: Wild card directory
Info 95   [00:03:31.000] Scheduled: /users/username/projects/project/tsconfig.json, Cancelled earlier one
Info 96   [00:03:32.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 97   [00:03:33.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /users/username/projects/project/sub :: WatchInfo: /users/username/projects/project 1 undefined Config: /users/username/projects/project/tsconfig.json WatchType: Wild card directory
Info 98   [00:03:35.000] DirectoryWatcher:: Triggered with /users/username/projects/project/sub/a.ts :: WatchInfo: /users/username/projects/project 1 undefined Config: /users/username/projects/project/tsconfig.json WatchType: Wild card directory
Info 99   [00:03:36.000] Scheduled: /users/username/projects/project/tsconfig.json, Cancelled earlier one
Info 100  [00:03:37.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 101  [00:03:38.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /users/username/projects/project/sub/a.ts :: WatchInfo: /users/username/projects/project 1 undefined Config: /users/username/projects/project/tsconfig.json WatchType: Wild card directory
Timeout callback:: count: 2
13: /users/username/projects/project/tsconfig.json
14: *ensureProjectForOpenFiles*
Immedidate callback:: count: 0
//// [/users/username/projects/project/sub/a.ts]
export const a = 10;

//// [/users/username/projects/project/a.ts] deleted

Before request

Info 102  [00:03:39.000] request:
    {
      "command": "geterr",
      "arguments": {
        "delay": 0,
        "files": [
          "/users/username/projects/project/b.ts",
          "/users/username/projects/project/sub/a.ts"
        ]
      },
      "seq": 7,
      "type": "request"
    }
Info 103  [00:03:40.000] response:
    {
      "responseRequired": false
    }
After request

Before running Timeout callback:: count: 3
13: /users/username/projects/project/tsconfig.json
14: *ensureProjectForOpenFiles*
15: checkOne

Invoking Timeout callback:: timeoutId:: 15:: checkOne
Info 104  [00:03:41.000] FileWatcher:: Close:: WatchInfo: /users/username/projects/project/sub/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 105  [00:03:42.000] FileWatcher:: Close:: WatchInfo: /users/username/projects/project/sub/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 106  [00:03:43.000] FileWatcher:: Close:: WatchInfo: /users/username/projects/project/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 107  [00:03:44.000] Starting updateGraphWorker: Project: /users/username/projects/project/tsconfig.json
Info 108  [00:03:45.000] FileWatcher:: Close:: WatchInfo: /users/username/projects/project/a.ts 500 undefined Project: /users/username/projects/project/tsconfig.json WatchType: Missing file
Info 109  [00:03:46.000] Finishing updateGraphWorker: Project: /users/username/projects/project/tsconfig.json Version: 4 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 110  [00:03:47.000] Project '/users/username/projects/project/tsconfig.json' (Configured)
Info 111  [00:03:48.000] 	Files (3)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/users/username/projects/project/b.ts SVC-1-0 "export const b = 10;"
	/users/username/projects/project/sub/a.ts SVC-2-0 ""


	../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	b.ts
	  Matched by default include pattern '**/*'
	sub/a.ts
	  Matched by default include pattern '**/*'

Info 112  [00:03:49.000] -----------------------------------------------
Info 113  [00:03:50.000] event:
    {"seq":0,"type":"event","event":"syntaxDiag","body":{"file":"/users/username/projects/project/b.ts","diagnostics":[]}}
After running Timeout callback:: count: 2
13: /users/username/projects/project/tsconfig.json
14: *ensureProjectForOpenFiles*

PolledWatches::
/users/username/projects/project/node_modules/@types:
  {"pollingInterval":500}
/users/username/projects/project/sub/node_modules/@types:
  {"pollingInterval":500}

PolledWatches *deleted*::
/users/username/projects/project/a.ts:
  {"pollingInterval":500}
/users/username/projects/project/sub/tsconfig.json:
  {"pollingInterval":2000}
/users/username/projects/project/sub/jsconfig.json:
  {"pollingInterval":2000}
/users/username/projects/project/jsconfig.json:
  {"pollingInterval":2000}

FsWatches::
/users/username/projects/project/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/users/username/projects/project:
  {}

Before running Immedidate callback:: count: 1
1: semanticCheck

Info 114  [00:03:51.000] event:
    {"seq":0,"type":"event","event":"semanticDiag","body":{"file":"/users/username/projects/project/b.ts","diagnostics":[]}}
After running Immedidate callback:: count: 1
2: suggestionCheck

Before running Immedidate callback:: count: 1
2: suggestionCheck

Info 115  [00:03:52.000] event:
    {"seq":0,"type":"event","event":"suggestionDiag","body":{"file":"/users/username/projects/project/b.ts","diagnostics":[]}}
After running Immedidate callback:: count: 0

Before running Timeout callback:: count: 3
13: /users/username/projects/project/tsconfig.json
14: *ensureProjectForOpenFiles*
16: checkOne

Invoking Timeout callback:: timeoutId:: 16:: checkOne
Info 116  [00:03:53.000] event:
    {"seq":0,"type":"event","event":"syntaxDiag","body":{"file":"/users/username/projects/project/sub/a.ts","diagnostics":[]}}
After running Timeout callback:: count: 2
13: /users/username/projects/project/tsconfig.json
14: *ensureProjectForOpenFiles*

Before running Immedidate callback:: count: 1
3: semanticCheck

Info 117  [00:03:54.000] event:
    {"seq":0,"type":"event","event":"semanticDiag","body":{"file":"/users/username/projects/project/sub/a.ts","diagnostics":[]}}
After running Immedidate callback:: count: 1
4: suggestionCheck

Before running Immedidate callback:: count: 1
4: suggestionCheck

Info 118  [00:03:55.000] event:
    {"seq":0,"type":"event","event":"suggestionDiag","body":{"file":"/users/username/projects/project/sub/a.ts","diagnostics":[]}}
Info 119  [00:03:56.000] event:
    {"seq":0,"type":"event","event":"requestCompleted","body":{"request_seq":7}}
After running Immedidate callback:: count: 0
