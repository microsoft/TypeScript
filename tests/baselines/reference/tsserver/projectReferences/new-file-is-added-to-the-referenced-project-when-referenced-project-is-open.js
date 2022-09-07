Info 0    [16:00:33.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Info 1    [16:00:34.000] request:{"seq":0,"type":"request","command":"open","arguments":{"file":"/user/username/projects/myproject/projects/project2/class2.ts"}}
//// [/user/username/projects/myproject/projects/project1/tsconfig.json]
{"compilerOptions":{"module":"none","composite":true},"exclude":["temp"]}

//// [/user/username/projects/myproject/projects/project1/class1.ts]
class class1 {}

//// [/user/username/projects/myproject/projects/project1/class1.d.ts]
declare class class1 {}

//// [/user/username/projects/myproject/projects/project2/tsconfig.json]
{"compilerOptions":{"module":"none","composite":true},"references":[{"path":"../project1"}]}

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


PolledWatches::

FsWatches::

FsWatchesRecursive::

Info 2    [16:00:35.000] Search path: /user/username/projects/myproject/projects/project2
Info 3    [16:00:36.000] For info: /user/username/projects/myproject/projects/project2/class2.ts :: Config file name: /user/username/projects/myproject/projects/project2/tsconfig.json
Info 4    [16:00:37.000] Creating configuration project /user/username/projects/myproject/projects/project2/tsconfig.json
Info 5    [16:00:38.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/projects/project2/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/projects/project2/tsconfig.json WatchType: Config file
Info 6    [16:00:39.000] Config: /user/username/projects/myproject/projects/project2/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/projects/project2/class2.ts"
 ],
 "options": {
  "module": 0,
  "composite": true,
  "configFilePath": "/user/username/projects/myproject/projects/project2/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/user/username/projects/myproject/projects/project1",
   "originalPath": "../project1"
  }
 ]
}
Info 7    [16:00:40.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/projects/project2 1 undefined Config: /user/username/projects/myproject/projects/project2/tsconfig.json WatchType: Wild card directory
Info 8    [16:00:41.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/projects/project2 1 undefined Config: /user/username/projects/myproject/projects/project2/tsconfig.json WatchType: Wild card directory
Info 9    [16:00:42.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 10   [16:00:43.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/projects/project2/tsconfig.json
Info 11   [16:00:44.000] Config: /user/username/projects/myproject/projects/project1/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/projects/project1/class1.ts"
 ],
 "options": {
  "module": 0,
  "composite": true,
  "configFilePath": "/user/username/projects/myproject/projects/project1/tsconfig.json"
 }
}
Info 12   [16:00:45.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/projects/project1/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/projects/project2/tsconfig.json WatchType: Config file
Info 13   [16:00:46.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/projects/project1 1 undefined Config: /user/username/projects/myproject/projects/project1/tsconfig.json WatchType: Wild card directory
Info 14   [16:00:47.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/projects/project1 1 undefined Config: /user/username/projects/myproject/projects/project1/tsconfig.json WatchType: Wild card directory
Info 15   [16:00:48.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/projects/project1/class1.ts 500 undefined WatchType: Closed Script info
Info 16   [16:00:49.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 17   [16:00:50.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/projects/project2/node_modules/@types 1 undefined Project: /user/username/projects/myproject/projects/project2/tsconfig.json WatchType: Type roots
Info 18   [16:00:51.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/projects/project2/node_modules/@types 1 undefined Project: /user/username/projects/myproject/projects/project2/tsconfig.json WatchType: Type roots
Info 19   [16:00:52.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/projects/node_modules/@types 1 undefined Project: /user/username/projects/myproject/projects/project2/tsconfig.json WatchType: Type roots
Info 20   [16:00:53.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/projects/node_modules/@types 1 undefined Project: /user/username/projects/myproject/projects/project2/tsconfig.json WatchType: Type roots
Info 21   [16:00:54.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/projects/project2/tsconfig.json WatchType: Type roots
Info 22   [16:00:55.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/projects/project2/tsconfig.json WatchType: Type roots
Info 23   [16:00:56.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/projects/project2/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 24   [16:00:57.000] Project '/user/username/projects/myproject/projects/project2/tsconfig.json' (Configured)
Info 25   [16:00:58.000] 	Files (3)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/projects/project1/class1.ts
	/user/username/projects/myproject/projects/project2/class2.ts


	../../../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	../project1/class1.ts
	  Source from referenced project '../project1/tsconfig.json' included because '--module' is specified as 'none'
	class2.ts
	  Matched by default include pattern '**/*'

Info 26   [16:00:59.000] -----------------------------------------------
Info 27   [16:01:00.000] Search path: /user/username/projects/myproject/projects/project2
Info 28   [16:01:01.000] For info: /user/username/projects/myproject/projects/project2/tsconfig.json :: No config files found.
Info 29   [16:01:02.000] Project '/user/username/projects/myproject/projects/project2/tsconfig.json' (Configured)
Info 29   [16:01:03.000] 	Files (3)

Info 29   [16:01:04.000] -----------------------------------------------
Info 29   [16:01:05.000] Open files: 
Info 29   [16:01:06.000] 	FileName: /user/username/projects/myproject/projects/project2/class2.ts ProjectRootPath: undefined
Info 29   [16:01:07.000] 		Projects: /user/username/projects/myproject/projects/project2/tsconfig.json

PolledWatches::
/user/username/projects/myproject/projects/project2/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/projects/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/projects/project2/tsconfig.json:
  {}
/user/username/projects/myproject/projects/project1/tsconfig.json:
  {}
/user/username/projects/myproject/projects/project1/class1.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/projects/project2:
  {}
/user/username/projects/myproject/projects/project1:
  {}

Info 29   [16:01:08.000] response:{"responseRequired":false}
Info 30   [16:01:09.000] request:{"seq":0,"type":"request","command":"open","arguments":{"file":"/user/username/projects/myproject/projects/project1/class1.ts"}}

PolledWatches::
/user/username/projects/myproject/projects/project2/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/projects/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/projects/project2/tsconfig.json:
  {}
/user/username/projects/myproject/projects/project1/tsconfig.json:
  {}
/user/username/projects/myproject/projects/project1/class1.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/projects/project2:
  {}
/user/username/projects/myproject/projects/project1:
  {}

Info 31   [16:01:10.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/projects/project1/class1.ts 500 undefined WatchType: Closed Script info
Info 32   [16:01:11.000] Search path: /user/username/projects/myproject/projects/project1
Info 33   [16:01:12.000] For info: /user/username/projects/myproject/projects/project1/class1.ts :: Config file name: /user/username/projects/myproject/projects/project1/tsconfig.json
Info 34   [16:01:13.000] Creating configuration project /user/username/projects/myproject/projects/project1/tsconfig.json
Info 35   [16:01:14.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 36   [16:01:15.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/projects/project1/tsconfig.json
Info 37   [16:01:16.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/projects/project1/node_modules/@types 1 undefined Project: /user/username/projects/myproject/projects/project1/tsconfig.json WatchType: Type roots
Info 38   [16:01:17.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/projects/project1/node_modules/@types 1 undefined Project: /user/username/projects/myproject/projects/project1/tsconfig.json WatchType: Type roots
Info 39   [16:01:18.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/projects/node_modules/@types 1 undefined Project: /user/username/projects/myproject/projects/project1/tsconfig.json WatchType: Type roots
Info 40   [16:01:19.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/projects/node_modules/@types 1 undefined Project: /user/username/projects/myproject/projects/project1/tsconfig.json WatchType: Type roots
Info 41   [16:01:20.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/projects/project1/tsconfig.json WatchType: Type roots
Info 42   [16:01:21.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/projects/project1/tsconfig.json WatchType: Type roots
Info 43   [16:01:22.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/projects/project1/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 44   [16:01:23.000] Project '/user/username/projects/myproject/projects/project1/tsconfig.json' (Configured)
Info 45   [16:01:24.000] 	Files (2)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/projects/project1/class1.ts


	../../../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	class1.ts
	  Matched by default include pattern '**/*'

Info 46   [16:01:25.000] -----------------------------------------------
Info 47   [16:01:26.000] Search path: /user/username/projects/myproject/projects/project1
Info 48   [16:01:27.000] For info: /user/username/projects/myproject/projects/project1/tsconfig.json :: No config files found.
Info 49   [16:01:28.000] Project '/user/username/projects/myproject/projects/project2/tsconfig.json' (Configured)
Info 49   [16:01:29.000] 	Files (3)

Info 49   [16:01:30.000] -----------------------------------------------
Info 49   [16:01:31.000] Project '/user/username/projects/myproject/projects/project1/tsconfig.json' (Configured)
Info 49   [16:01:32.000] 	Files (2)

Info 49   [16:01:33.000] -----------------------------------------------
Info 49   [16:01:34.000] Open files: 
Info 49   [16:01:35.000] 	FileName: /user/username/projects/myproject/projects/project2/class2.ts ProjectRootPath: undefined
Info 49   [16:01:36.000] 		Projects: /user/username/projects/myproject/projects/project2/tsconfig.json
Info 49   [16:01:37.000] 	FileName: /user/username/projects/myproject/projects/project1/class1.ts ProjectRootPath: undefined
Info 49   [16:01:38.000] 		Projects: /user/username/projects/myproject/projects/project2/tsconfig.json,/user/username/projects/myproject/projects/project1/tsconfig.json

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
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/projects/project2:
  {}
/user/username/projects/myproject/projects/project1:
  {}

Info 49   [16:01:39.000] response:{"responseRequired":false}
Info 50   [16:01:42.000] DirectoryWatcher:: Triggered with /user/username/projects/myproject/projects/project1/class3.ts :: WatchInfo: /user/username/projects/myproject/projects/project1 1 undefined Config: /user/username/projects/myproject/projects/project1/tsconfig.json WatchType: Wild card directory
Info 51   [16:01:43.000] Scheduled: /user/username/projects/myproject/projects/project2/tsconfig.json
Info 52   [16:01:44.000] Scheduled: *ensureProjectForOpenFiles*
Info 53   [16:01:45.000] Scheduled: /user/username/projects/myproject/projects/project1/tsconfig.json
Info 54   [16:01:46.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 55   [16:01:47.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/projects/project1/class3.ts :: WatchInfo: /user/username/projects/myproject/projects/project1 1 undefined Config: /user/username/projects/myproject/projects/project1/tsconfig.json WatchType: Wild card directory
Info 56   [16:01:48.000] Running: /user/username/projects/myproject/projects/project2/tsconfig.json
Info 57   [16:01:49.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/projects/project2/tsconfig.json
Info 58   [16:01:50.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/projects/project1/class3.ts 500 undefined WatchType: Closed Script info
Info 59   [16:01:51.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/projects/project2/tsconfig.json Version: 2 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 60   [16:01:52.000] Project '/user/username/projects/myproject/projects/project2/tsconfig.json' (Configured)
Info 61   [16:01:53.000] 	Files (4)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/projects/project1/class1.ts
	/user/username/projects/myproject/projects/project1/class3.ts
	/user/username/projects/myproject/projects/project2/class2.ts


	../../../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	../project1/class1.ts
	  Source from referenced project '../project1/tsconfig.json' included because '--module' is specified as 'none'
	../project1/class3.ts
	  Source from referenced project '../project1/tsconfig.json' included because '--module' is specified as 'none'
	class2.ts
	  Matched by default include pattern '**/*'

Info 62   [16:01:54.000] -----------------------------------------------
Info 63   [16:01:55.000] Running: /user/username/projects/myproject/projects/project1/tsconfig.json
Info 64   [16:01:56.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/projects/project1/tsconfig.json
Info 65   [16:01:57.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/projects/project1/tsconfig.json Version: 2 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 66   [16:01:58.000] Project '/user/username/projects/myproject/projects/project1/tsconfig.json' (Configured)
Info 67   [16:01:59.000] 	Files (3)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/projects/project1/class1.ts
	/user/username/projects/myproject/projects/project1/class3.ts


	../../../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	class1.ts
	  Matched by default include pattern '**/*'
	class3.ts
	  Matched by default include pattern '**/*'

Info 68   [16:02:00.000] -----------------------------------------------
Info 69   [16:02:01.000] Running: *ensureProjectForOpenFiles*
Info 70   [16:02:02.000] Before ensureProjectForOpenFiles:
Info 71   [16:02:03.000] Project '/user/username/projects/myproject/projects/project2/tsconfig.json' (Configured)
Info 71   [16:02:04.000] 	Files (4)

Info 71   [16:02:05.000] -----------------------------------------------
Info 71   [16:02:06.000] Project '/user/username/projects/myproject/projects/project1/tsconfig.json' (Configured)
Info 71   [16:02:07.000] 	Files (3)

Info 71   [16:02:08.000] -----------------------------------------------
Info 71   [16:02:09.000] Open files: 
Info 71   [16:02:10.000] 	FileName: /user/username/projects/myproject/projects/project2/class2.ts ProjectRootPath: undefined
Info 71   [16:02:11.000] 		Projects: /user/username/projects/myproject/projects/project2/tsconfig.json
Info 71   [16:02:12.000] 	FileName: /user/username/projects/myproject/projects/project1/class1.ts ProjectRootPath: undefined
Info 71   [16:02:13.000] 		Projects: /user/username/projects/myproject/projects/project2/tsconfig.json,/user/username/projects/myproject/projects/project1/tsconfig.json
Info 71   [16:02:14.000] After ensureProjectForOpenFiles:
Info 72   [16:02:15.000] Project '/user/username/projects/myproject/projects/project2/tsconfig.json' (Configured)
Info 72   [16:02:16.000] 	Files (4)

Info 72   [16:02:17.000] -----------------------------------------------
Info 72   [16:02:18.000] Project '/user/username/projects/myproject/projects/project1/tsconfig.json' (Configured)
Info 72   [16:02:19.000] 	Files (3)

Info 72   [16:02:20.000] -----------------------------------------------
Info 72   [16:02:21.000] Open files: 
Info 72   [16:02:22.000] 	FileName: /user/username/projects/myproject/projects/project2/class2.ts ProjectRootPath: undefined
Info 72   [16:02:23.000] 		Projects: /user/username/projects/myproject/projects/project2/tsconfig.json
Info 72   [16:02:24.000] 	FileName: /user/username/projects/myproject/projects/project1/class1.ts ProjectRootPath: undefined
Info 72   [16:02:25.000] 		Projects: /user/username/projects/myproject/projects/project2/tsconfig.json,/user/username/projects/myproject/projects/project1/tsconfig.json
Info 72   [16:02:29.000] DirectoryWatcher:: Triggered with /user/username/projects/myproject/projects/project1/temp :: WatchInfo: /user/username/projects/myproject/projects/project1 1 undefined Config: /user/username/projects/myproject/projects/project1/tsconfig.json WatchType: Wild card directory
Info 73   [16:02:30.000] Project: /user/username/projects/myproject/projects/project1/tsconfig.json Detected excluded file: /user/username/projects/myproject/projects/project1/temp
Info 74   [16:02:31.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/projects/project1/temp :: WatchInfo: /user/username/projects/myproject/projects/project1 1 undefined Config: /user/username/projects/myproject/projects/project1/tsconfig.json WatchType: Wild card directory
Info 75   [16:02:33.000] DirectoryWatcher:: Triggered with /user/username/projects/myproject/projects/project1/temp/file.d.ts :: WatchInfo: /user/username/projects/myproject/projects/project1 1 undefined Config: /user/username/projects/myproject/projects/project1/tsconfig.json WatchType: Wild card directory
Info 76   [16:02:34.000] Project: /user/username/projects/myproject/projects/project1/tsconfig.json Detected excluded file: /user/username/projects/myproject/projects/project1/temp/file.d.ts
Info 77   [16:02:35.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/projects/project1/temp/file.d.ts :: WatchInfo: /user/username/projects/myproject/projects/project1 1 undefined Config: /user/username/projects/myproject/projects/project1/tsconfig.json WatchType: Wild card directory
Info 78   [16:02:38.000] DirectoryWatcher:: Triggered with /user/username/projects/myproject/projects/project1/class3.d.ts :: WatchInfo: /user/username/projects/myproject/projects/project1 1 undefined Config: /user/username/projects/myproject/projects/project1/tsconfig.json WatchType: Wild card directory
Info 79   [16:02:39.000] Project: /user/username/projects/myproject/projects/project1/tsconfig.json Detected output file: /user/username/projects/myproject/projects/project1/class3.d.ts
Info 80   [16:02:40.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/projects/project1/class3.d.ts :: WatchInfo: /user/username/projects/myproject/projects/project1 1 undefined Config: /user/username/projects/myproject/projects/project1/tsconfig.json WatchType: Wild card directory