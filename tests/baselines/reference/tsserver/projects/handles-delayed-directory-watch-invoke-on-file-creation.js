Info 0    [16:00:25.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Info 1    [16:00:26.000] request:{"seq":0,"type":"request","command":"open","arguments":{"file":"/users/username/projects/project/b.ts","projectRootPath":"/users/username/projects/project"}}
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


PolledWatches::

FsWatches::

FsWatchesRecursive::

Info 2    [16:00:27.000] Search path: /users/username/projects/project
Info 3    [16:00:28.000] For info: /users/username/projects/project/b.ts :: Config file name: /users/username/projects/project/tsconfig.json
Info 4    [16:00:29.000] Creating configuration project /users/username/projects/project/tsconfig.json
Info 5    [16:00:30.000] FileWatcher:: Added:: WatchInfo: /users/username/projects/project/tsconfig.json 2000 undefined Project: /users/username/projects/project/tsconfig.json WatchType: Config file
Info 6    [16:00:31.000] event:
    {"seq":0,"type":"event","event":"projectLoadingStart","body":{"projectName":"/users/username/projects/project/tsconfig.json","reason":"Creating possible configured project for /users/username/projects/project/b.ts to open"}}
Info 7    [16:00:32.000] Config: /users/username/projects/project/tsconfig.json : {
 "rootNames": [
  "/users/username/projects/project/b.ts",
  "/users/username/projects/project/sub/a.ts"
 ],
 "options": {
  "configFilePath": "/users/username/projects/project/tsconfig.json"
 }
}
Info 8    [16:00:33.000] DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/project 1 undefined Config: /users/username/projects/project/tsconfig.json WatchType: Wild card directory
Info 9    [16:00:34.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/project 1 undefined Config: /users/username/projects/project/tsconfig.json WatchType: Wild card directory
Info 10   [16:00:35.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 11   [16:00:36.000] FileWatcher:: Added:: WatchInfo: /users/username/projects/project/sub/a.ts 500 undefined WatchType: Closed Script info
Info 12   [16:00:37.000] Starting updateGraphWorker: Project: /users/username/projects/project/tsconfig.json
Info 13   [16:00:38.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 14   [16:00:39.000] DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/project/node_modules/@types 1 undefined Project: /users/username/projects/project/tsconfig.json WatchType: Type roots
Info 15   [16:00:40.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/project/node_modules/@types 1 undefined Project: /users/username/projects/project/tsconfig.json WatchType: Type roots
Info 16   [16:00:41.000] Finishing updateGraphWorker: Project: /users/username/projects/project/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 17   [16:00:42.000] Project '/users/username/projects/project/tsconfig.json' (Configured)
Info 18   [16:00:43.000] 	Files (3)
	/a/lib/lib.d.ts
	/users/username/projects/project/b.ts
	/users/username/projects/project/sub/a.ts


	../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	b.ts
	  Matched by default include pattern '**/*'
	sub/a.ts
	  Matched by default include pattern '**/*'

Info 19   [16:00:44.000] -----------------------------------------------
Info 20   [16:00:45.000] event:
    {"seq":0,"type":"event","event":"projectLoadingFinish","body":{"projectName":"/users/username/projects/project/tsconfig.json"}}
Info 21   [16:00:46.000] event:
    {"seq":0,"type":"event","event":"telemetry","body":{"telemetryEventName":"projectInfo","payload":{"projectId":"5b0be5fc7f7235edf5a31bffe614b4e0819e55ec5f118558864b1f882e283c0d","fileStats":{"js":0,"jsSize":0,"jsx":0,"jsxSize":0,"ts":2,"tsSize":40,"tsx":0,"tsxSize":0,"dts":1,"dtsSize":334,"deferred":0,"deferredSize":0},"compilerOptions":{},"typeAcquisition":{"enable":false,"include":false,"exclude":false},"extends":false,"files":false,"include":false,"exclude":false,"compileOnSave":false,"configFileName":"tsconfig.json","projectType":"configured","languageServiceEnabled":true,"version":"FakeVersion"}}}
Info 22   [16:00:47.000] event:
    {"seq":0,"type":"event","event":"configFileDiag","body":{"triggerFile":"/users/username/projects/project/b.ts","configFile":"/users/username/projects/project/tsconfig.json","diagnostics":[]}}
Info 23   [16:00:48.000] Project '/users/username/projects/project/tsconfig.json' (Configured)
Info 23   [16:00:49.000] 	Files (3)

Info 23   [16:00:50.000] -----------------------------------------------
Info 23   [16:00:51.000] Open files: 
Info 23   [16:00:52.000] 	FileName: /users/username/projects/project/b.ts ProjectRootPath: /users/username/projects/project
Info 23   [16:00:53.000] 		Projects: /users/username/projects/project/tsconfig.json

PolledWatches::
/users/username/projects/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/users/username/projects/project/tsconfig.json:
  {}
/users/username/projects/project/sub/a.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/users/username/projects/project:
  {}

Info 23   [16:00:54.000] response:{"responseRequired":false}
Info 24   [16:00:55.000] request:{"seq":0,"type":"request","command":"open","arguments":{"file":"/users/username/projects/project/sub/a.ts","projectRootPath":"/users/username/projects/project"}}

PolledWatches::
/users/username/projects/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/users/username/projects/project/tsconfig.json:
  {}
/users/username/projects/project/sub/a.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/users/username/projects/project:
  {}

Info 25   [16:00:56.000] FileWatcher:: Close:: WatchInfo: /users/username/projects/project/sub/a.ts 500 undefined WatchType: Closed Script info
Info 26   [16:00:57.000] Search path: /users/username/projects/project/sub
Info 27   [16:00:58.000] For info: /users/username/projects/project/sub/a.ts :: Config file name: /users/username/projects/project/tsconfig.json
Info 28   [16:00:59.000] Project '/users/username/projects/project/tsconfig.json' (Configured)
Info 28   [16:01:00.000] 	Files (3)

Info 28   [16:01:01.000] -----------------------------------------------
Info 28   [16:01:02.000] Open files: 
Info 28   [16:01:03.000] 	FileName: /users/username/projects/project/b.ts ProjectRootPath: /users/username/projects/project
Info 28   [16:01:04.000] 		Projects: /users/username/projects/project/tsconfig.json
Info 28   [16:01:05.000] 	FileName: /users/username/projects/project/sub/a.ts ProjectRootPath: /users/username/projects/project
Info 28   [16:01:06.000] 		Projects: /users/username/projects/project/tsconfig.json

PolledWatches::
/users/username/projects/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/users/username/projects/project/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/users/username/projects/project:
  {}

Info 28   [16:01:07.000] response:{"responseRequired":false}
Info 29   [16:01:09.000] DirectoryWatcher:: Triggered with /users/username/projects/project/sub/a.ts :: WatchInfo: /users/username/projects/project 1 undefined Config: /users/username/projects/project/tsconfig.json WatchType: Wild card directory
Info 30   [16:01:10.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /users/username/projects/project/sub/a.ts :: WatchInfo: /users/username/projects/project 1 undefined Config: /users/username/projects/project/tsconfig.json WatchType: Wild card directory
Info 31   [16:01:12.000] DirectoryWatcher:: Triggered with /users/username/projects/project/sub :: WatchInfo: /users/username/projects/project 1 undefined Config: /users/username/projects/project/tsconfig.json WatchType: Wild card directory
Info 32   [16:01:13.000] Scheduled: /users/username/projects/project/tsconfig.json
Info 33   [16:01:14.000] Scheduled: *ensureProjectForOpenFiles*
Info 34   [16:01:15.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /users/username/projects/project/sub :: WatchInfo: /users/username/projects/project 1 undefined Config: /users/username/projects/project/tsconfig.json WatchType: Wild card directory
Info 35   [16:01:18.000] DirectoryWatcher:: Triggered with /users/username/projects/project/a.ts :: WatchInfo: /users/username/projects/project 1 undefined Config: /users/username/projects/project/tsconfig.json WatchType: Wild card directory
Info 36   [16:01:19.000] Scheduled: /users/username/projects/project/tsconfig.json, Cancelled earlier one
Info 37   [16:01:20.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 38   [16:01:21.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /users/username/projects/project/a.ts :: WatchInfo: /users/username/projects/project 1 undefined Config: /users/username/projects/project/tsconfig.json WatchType: Wild card directory
Info 39   [16:01:22.000] request:{"seq":0,"type":"request","command":"close","arguments":{"file":"/users/username/projects/project/sub/a.ts"}}
//// [/users/username/projects/project/a.ts]
export const a = 10;

//// [/users/username/projects/project/sub/a.ts] deleted

PolledWatches::
/users/username/projects/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/users/username/projects/project/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/users/username/projects/project:
  {}

Info 40   [16:01:23.000] Scheduled: /users/username/projects/project/tsconfig.json, Cancelled earlier one
Info 41   [16:01:24.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 42   [16:01:25.000] Project '/users/username/projects/project/tsconfig.json' (Configured)
Info 42   [16:01:26.000] 	Files (3)

Info 42   [16:01:27.000] -----------------------------------------------
Info 42   [16:01:28.000] Open files: 
Info 42   [16:01:29.000] 	FileName: /users/username/projects/project/b.ts ProjectRootPath: /users/username/projects/project
Info 42   [16:01:30.000] 		Projects: /users/username/projects/project/tsconfig.json

PolledWatches::
/users/username/projects/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/users/username/projects/project/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/users/username/projects/project:
  {}

Info 42   [16:01:31.000] response:{"responseRequired":false}
Info 43   [16:01:32.000] request:{"seq":0,"type":"request","command":"open","arguments":{"file":"/users/username/projects/project/a.ts","projectRootPath":"/users/username/projects/project"}}

PolledWatches::
/users/username/projects/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/users/username/projects/project/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/users/username/projects/project:
  {}

Info 44   [16:01:33.000] Search path: /users/username/projects/project
Info 45   [16:01:34.000] For info: /users/username/projects/project/a.ts :: Config file name: /users/username/projects/project/tsconfig.json
Info 46   [16:01:35.000] Starting updateGraphWorker: Project: /users/username/projects/project/tsconfig.json
Info 47   [16:01:36.000] Finishing updateGraphWorker: Project: /users/username/projects/project/tsconfig.json Version: 2 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 48   [16:01:37.000] Project '/users/username/projects/project/tsconfig.json' (Configured)
Info 49   [16:01:38.000] 	Files (3)
	/a/lib/lib.d.ts
	/users/username/projects/project/b.ts
	/users/username/projects/project/a.ts


	../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	b.ts
	  Matched by default include pattern '**/*'
	a.ts
	  Matched by default include pattern '**/*'

Info 50   [16:01:39.000] -----------------------------------------------
Info 51   [16:01:40.000] Project '/users/username/projects/project/tsconfig.json' (Configured)
Info 51   [16:01:41.000] 	Files (3)

Info 51   [16:01:42.000] -----------------------------------------------
Info 51   [16:01:43.000] Open files: 
Info 51   [16:01:44.000] 	FileName: /users/username/projects/project/b.ts ProjectRootPath: /users/username/projects/project
Info 51   [16:01:45.000] 		Projects: /users/username/projects/project/tsconfig.json
Info 51   [16:01:46.000] 	FileName: /users/username/projects/project/a.ts ProjectRootPath: /users/username/projects/project
Info 51   [16:01:47.000] 		Projects: /users/username/projects/project/tsconfig.json

PolledWatches::
/users/username/projects/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/users/username/projects/project/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/users/username/projects/project:
  {}

Info 51   [16:01:48.000] response:{"responseRequired":false}
Info 52   [16:01:49.000] Running: /users/username/projects/project/tsconfig.json
Info 53   [16:01:50.000] Running: *ensureProjectForOpenFiles*
Info 54   [16:01:51.000] Before ensureProjectForOpenFiles:
Info 55   [16:01:52.000] Project '/users/username/projects/project/tsconfig.json' (Configured)
Info 55   [16:01:53.000] 	Files (3)

Info 55   [16:01:54.000] -----------------------------------------------
Info 55   [16:01:55.000] Open files: 
Info 55   [16:01:56.000] 	FileName: /users/username/projects/project/b.ts ProjectRootPath: /users/username/projects/project
Info 55   [16:01:57.000] 		Projects: /users/username/projects/project/tsconfig.json
Info 55   [16:01:58.000] 	FileName: /users/username/projects/project/a.ts ProjectRootPath: /users/username/projects/project
Info 55   [16:01:59.000] 		Projects: /users/username/projects/project/tsconfig.json
Info 55   [16:02:00.000] After ensureProjectForOpenFiles:
Info 56   [16:02:01.000] Project '/users/username/projects/project/tsconfig.json' (Configured)
Info 56   [16:02:02.000] 	Files (3)

Info 56   [16:02:03.000] -----------------------------------------------
Info 56   [16:02:04.000] Open files: 
Info 56   [16:02:05.000] 	FileName: /users/username/projects/project/b.ts ProjectRootPath: /users/username/projects/project
Info 56   [16:02:06.000] 		Projects: /users/username/projects/project/tsconfig.json
Info 56   [16:02:07.000] 	FileName: /users/username/projects/project/a.ts ProjectRootPath: /users/username/projects/project
Info 56   [16:02:08.000] 		Projects: /users/username/projects/project/tsconfig.json
Info 56   [16:02:09.000] got projects updated in background, updating diagnostics for /users/username/projects/project/b.ts,/users/username/projects/project/a.ts
Info 57   [16:02:10.000] event:
    {"seq":0,"type":"event","event":"projectsUpdatedInBackground","body":{"openFiles":["/users/username/projects/project/b.ts","/users/username/projects/project/a.ts"]}}
Info 58   [16:02:11.000] request:{"seq":0,"type":"request","command":"close","arguments":{"file":"/users/username/projects/project/a.ts"}}

PolledWatches::
/users/username/projects/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/users/username/projects/project/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/users/username/projects/project:
  {}

Info 59   [16:02:12.000] Scheduled: /users/username/projects/project/tsconfig.json
Info 60   [16:02:13.000] Scheduled: *ensureProjectForOpenFiles*
Info 61   [16:02:14.000] Project '/users/username/projects/project/tsconfig.json' (Configured)
Info 61   [16:02:15.000] 	Files (3)

Info 61   [16:02:16.000] -----------------------------------------------
Info 61   [16:02:17.000] Open files: 
Info 61   [16:02:18.000] 	FileName: /users/username/projects/project/b.ts ProjectRootPath: /users/username/projects/project
Info 61   [16:02:19.000] 		Projects: /users/username/projects/project/tsconfig.json

PolledWatches::
/users/username/projects/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/users/username/projects/project/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/users/username/projects/project:
  {}

Info 61   [16:02:20.000] response:{"responseRequired":false}
Info 62   [16:02:21.000] request:{"seq":0,"type":"request","command":"open","arguments":{"file":"/users/username/projects/project/sub/a.ts","projectRootPath":"/users/username/projects/project"}}

PolledWatches::
/users/username/projects/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/users/username/projects/project/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/users/username/projects/project:
  {}

Info 63   [16:02:22.000] Search path: /users/username/projects/project/sub
Info 64   [16:02:23.000] For info: /users/username/projects/project/sub/a.ts :: Config file name: /users/username/projects/project/tsconfig.json
Info 65   [16:02:24.000] Starting updateGraphWorker: Project: /users/username/projects/project/tsconfig.json
Info 66   [16:02:25.000] FileWatcher:: Added:: WatchInfo: /users/username/projects/project/a.ts 500 undefined Project: /users/username/projects/project/tsconfig.json WatchType: Missing file
Info 67   [16:02:26.000] Finishing updateGraphWorker: Project: /users/username/projects/project/tsconfig.json Version: 3 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 68   [16:02:27.000] Project '/users/username/projects/project/tsconfig.json' (Configured)
Info 69   [16:02:28.000] 	Files (2)
	/a/lib/lib.d.ts
	/users/username/projects/project/b.ts


	../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	b.ts
	  Matched by default include pattern '**/*'

Info 70   [16:02:29.000] -----------------------------------------------
Info 71   [16:02:30.000] event:
    {"seq":0,"type":"event","event":"configFileDiag","body":{"triggerFile":"/users/username/projects/project/sub/a.ts","configFile":"/users/username/projects/project/tsconfig.json","diagnostics":[{"text":"File '/users/username/projects/project/a.ts' not found.\n  The file is in the program because:\n    Matched by default include pattern '**/*'","code":6053,"category":"error"}]}}
Info 72   [16:02:31.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 73   [16:02:32.000] FileWatcher:: Added:: WatchInfo: /users/username/projects/project/sub/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 74   [16:02:33.000] FileWatcher:: Added:: WatchInfo: /users/username/projects/project/sub/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 75   [16:02:34.000] FileWatcher:: Added:: WatchInfo: /users/username/projects/project/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 76   [16:02:35.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 77   [16:02:36.000] DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/project/sub/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 78   [16:02:37.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/project/sub/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 79   [16:02:38.000] DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/project/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 80   [16:02:39.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/project/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 81   [16:02:40.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 82   [16:02:41.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 83   [16:02:42.000] 	Files (2)
	/a/lib/lib.d.ts
	/users/username/projects/project/sub/a.ts


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	a.ts
	  Root file specified for compilation

Info 84   [16:02:43.000] -----------------------------------------------
Info 85   [16:02:44.000] Project '/users/username/projects/project/tsconfig.json' (Configured)
Info 85   [16:02:45.000] 	Files (2)

Info 85   [16:02:46.000] -----------------------------------------------
Info 85   [16:02:47.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 85   [16:02:48.000] 	Files (2)

Info 85   [16:02:49.000] -----------------------------------------------
Info 85   [16:02:50.000] Open files: 
Info 85   [16:02:51.000] 	FileName: /users/username/projects/project/b.ts ProjectRootPath: /users/username/projects/project
Info 85   [16:02:52.000] 		Projects: /users/username/projects/project/tsconfig.json
Info 85   [16:02:53.000] 	FileName: /users/username/projects/project/sub/a.ts ProjectRootPath: /users/username/projects/project
Info 85   [16:02:54.000] 		Projects: /dev/null/inferredProject1*

PolledWatches::
/users/username/projects/project/node_modules/@types:
  {"pollingInterval":500}
/users/username/projects/project/a.ts:
  {"pollingInterval":500}
/users/username/projects/project/sub/tsconfig.json:
  {"pollingInterval":2000}
/users/username/projects/project/sub/jsconfig.json:
  {"pollingInterval":2000}
/users/username/projects/project/jsconfig.json:
  {"pollingInterval":2000}
/users/username/projects/project/sub/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/users/username/projects/project/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/users/username/projects/project:
  {}

Info 85   [16:02:55.000] response:{"responseRequired":false}
Info 86   [16:02:56.000] Running: /users/username/projects/project/tsconfig.json
Info 87   [16:02:57.000] Running: *ensureProjectForOpenFiles*
Info 88   [16:02:58.000] Before ensureProjectForOpenFiles:
Info 89   [16:02:59.000] Project '/users/username/projects/project/tsconfig.json' (Configured)
Info 89   [16:03:00.000] 	Files (2)

Info 89   [16:03:01.000] -----------------------------------------------
Info 89   [16:03:02.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 89   [16:03:03.000] 	Files (2)

Info 89   [16:03:04.000] -----------------------------------------------
Info 89   [16:03:05.000] Open files: 
Info 89   [16:03:06.000] 	FileName: /users/username/projects/project/b.ts ProjectRootPath: /users/username/projects/project
Info 89   [16:03:07.000] 		Projects: /users/username/projects/project/tsconfig.json
Info 89   [16:03:08.000] 	FileName: /users/username/projects/project/sub/a.ts ProjectRootPath: /users/username/projects/project
Info 89   [16:03:09.000] 		Projects: /dev/null/inferredProject1*
Info 89   [16:03:10.000] After ensureProjectForOpenFiles:
Info 90   [16:03:11.000] Project '/users/username/projects/project/tsconfig.json' (Configured)
Info 90   [16:03:12.000] 	Files (2)

Info 90   [16:03:13.000] -----------------------------------------------
Info 90   [16:03:14.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 90   [16:03:15.000] 	Files (2)

Info 90   [16:03:16.000] -----------------------------------------------
Info 90   [16:03:17.000] Open files: 
Info 90   [16:03:18.000] 	FileName: /users/username/projects/project/b.ts ProjectRootPath: /users/username/projects/project
Info 90   [16:03:19.000] 		Projects: /users/username/projects/project/tsconfig.json
Info 90   [16:03:20.000] 	FileName: /users/username/projects/project/sub/a.ts ProjectRootPath: /users/username/projects/project
Info 90   [16:03:21.000] 		Projects: /dev/null/inferredProject1*
Info 90   [16:03:22.000] got projects updated in background, updating diagnostics for /users/username/projects/project/b.ts,/users/username/projects/project/sub/a.ts
Info 91   [16:03:23.000] event:
    {"seq":0,"type":"event","event":"projectsUpdatedInBackground","body":{"openFiles":["/users/username/projects/project/b.ts","/users/username/projects/project/sub/a.ts"]}}
Info 92   [16:03:25.000] DirectoryWatcher:: Triggered with /users/username/projects/project/a.ts :: WatchInfo: /users/username/projects/project 1 undefined Config: /users/username/projects/project/tsconfig.json WatchType: Wild card directory
Info 93   [16:03:26.000] Scheduled: /users/username/projects/project/tsconfig.json
Info 94   [16:03:27.000] Scheduled: *ensureProjectForOpenFiles*
Info 95   [16:03:28.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /users/username/projects/project/a.ts :: WatchInfo: /users/username/projects/project 1 undefined Config: /users/username/projects/project/tsconfig.json WatchType: Wild card directory
Info 96   [16:03:32.000] DirectoryWatcher:: Triggered with /users/username/projects/project/sub :: WatchInfo: /users/username/projects/project 1 undefined Config: /users/username/projects/project/tsconfig.json WatchType: Wild card directory
Info 97   [16:03:33.000] Scheduled: /users/username/projects/project/tsconfig.json, Cancelled earlier one
Info 98   [16:03:34.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 99   [16:03:35.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /users/username/projects/project/sub :: WatchInfo: /users/username/projects/project 1 undefined Config: /users/username/projects/project/tsconfig.json WatchType: Wild card directory
Info 100  [16:03:37.000] DirectoryWatcher:: Triggered with /users/username/projects/project/sub/a.ts :: WatchInfo: /users/username/projects/project 1 undefined Config: /users/username/projects/project/tsconfig.json WatchType: Wild card directory
Info 101  [16:03:38.000] Scheduled: /users/username/projects/project/tsconfig.json, Cancelled earlier one
Info 102  [16:03:39.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 103  [16:03:40.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /users/username/projects/project/sub/a.ts :: WatchInfo: /users/username/projects/project 1 undefined Config: /users/username/projects/project/tsconfig.json WatchType: Wild card directory
Info 104  [16:03:41.000] request:{"command":"geterr","arguments":{"delay":0,"files":["/users/username/projects/project/b.ts","/users/username/projects/project/sub/a.ts"]},"seq":1,"type":"request"}
//// [/users/username/projects/project/sub/a.ts]
export const a = 10;

//// [/users/username/projects/project/a.ts] deleted

PolledWatches::
/users/username/projects/project/node_modules/@types:
  {"pollingInterval":500}
/users/username/projects/project/a.ts:
  {"pollingInterval":500}
/users/username/projects/project/sub/tsconfig.json:
  {"pollingInterval":2000}
/users/username/projects/project/sub/jsconfig.json:
  {"pollingInterval":2000}
/users/username/projects/project/jsconfig.json:
  {"pollingInterval":2000}
/users/username/projects/project/sub/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/users/username/projects/project/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/users/username/projects/project:
  {}


PolledWatches::
/users/username/projects/project/node_modules/@types:
  {"pollingInterval":500}
/users/username/projects/project/a.ts:
  {"pollingInterval":500}
/users/username/projects/project/sub/tsconfig.json:
  {"pollingInterval":2000}
/users/username/projects/project/sub/jsconfig.json:
  {"pollingInterval":2000}
/users/username/projects/project/jsconfig.json:
  {"pollingInterval":2000}
/users/username/projects/project/sub/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/users/username/projects/project/tsconfig.json:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/users/username/projects/project:
  {}

Info 105  [16:03:42.000] response:{"responseRequired":false}
Info 106  [16:03:43.000] FileWatcher:: Close:: WatchInfo: /users/username/projects/project/sub/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 107  [16:03:44.000] FileWatcher:: Close:: WatchInfo: /users/username/projects/project/sub/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 108  [16:03:45.000] FileWatcher:: Close:: WatchInfo: /users/username/projects/project/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 109  [16:03:46.000] Starting updateGraphWorker: Project: /users/username/projects/project/tsconfig.json
Info 110  [16:03:47.000] FileWatcher:: Close:: WatchInfo: /users/username/projects/project/a.ts 500 undefined Project: /users/username/projects/project/tsconfig.json WatchType: Missing file
Info 111  [16:03:48.000] Finishing updateGraphWorker: Project: /users/username/projects/project/tsconfig.json Version: 4 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 112  [16:03:49.000] Project '/users/username/projects/project/tsconfig.json' (Configured)
Info 113  [16:03:50.000] 	Files (3)
	/a/lib/lib.d.ts
	/users/username/projects/project/b.ts
	/users/username/projects/project/sub/a.ts


	../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	b.ts
	  Matched by default include pattern '**/*'
	sub/a.ts
	  Matched by default include pattern '**/*'

Info 114  [16:03:51.000] -----------------------------------------------
Info 115  [16:03:52.000] event:
    {"seq":0,"type":"event","event":"syntaxDiag","body":{"file":"/users/username/projects/project/b.ts","diagnostics":[]}}
Info 116  [16:03:53.000] event:
    {"seq":0,"type":"event","event":"semanticDiag","body":{"file":"/users/username/projects/project/b.ts","diagnostics":[]}}
Info 117  [16:03:54.000] event:
    {"seq":0,"type":"event","event":"suggestionDiag","body":{"file":"/users/username/projects/project/b.ts","diagnostics":[]}}
Info 118  [16:03:55.000] event:
    {"seq":0,"type":"event","event":"syntaxDiag","body":{"file":"/users/username/projects/project/sub/a.ts","diagnostics":[]}}
Info 119  [16:03:56.000] event:
    {"seq":0,"type":"event","event":"semanticDiag","body":{"file":"/users/username/projects/project/sub/a.ts","diagnostics":[]}}
Info 120  [16:03:57.000] event:
    {"seq":0,"type":"event","event":"suggestionDiag","body":{"file":"/users/username/projects/project/sub/a.ts","diagnostics":[]}}
Info 121  [16:03:58.000] event:
    {"seq":0,"type":"event","event":"requestCompleted","body":{"request_seq":1}}