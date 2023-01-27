Info 0    [00:00:33.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Info 1    [00:00:34.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/myproject/projects/project2/class2.ts"
      },
      "seq": 1,
      "type": "request"
    }
Before request
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
Info 14   [00:00:47.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/projects/project1/class1.ts 500 undefined WatchType: Closed Script info
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
	/a/lib/lib.d.ts
	/user/username/projects/myproject/projects/project1/class1.ts
	/user/username/projects/myproject/projects/project2/class2.ts


	../../../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	../project1/class1.ts
	  Source from referenced project '../project1/tsconfig.json' included because '--module' is specified as 'none'
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
After request

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

Info 28   [00:01:07.000] response:
    {
      "responseRequired": false
    }
Info 29   [00:01:10.000] DirectoryWatcher:: Triggered with /user/username/projects/myproject/projects/project1/class3.ts :: WatchInfo: /user/username/projects/myproject/projects/project1 1 undefined Config: /user/username/projects/myproject/projects/project1/tsconfig.json WatchType: Wild card directory
Info 30   [00:01:11.000] Scheduled: /user/username/projects/myproject/projects/project2/tsconfig.json
Info 31   [00:01:12.000] Scheduled: *ensureProjectForOpenFiles*
Info 32   [00:01:13.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/projects/project1/class3.ts :: WatchInfo: /user/username/projects/myproject/projects/project1 1 undefined Config: /user/username/projects/myproject/projects/project1/tsconfig.json WatchType: Wild card directory
Before checking timeout queue length (2) and running
//// [/user/username/projects/myproject/projects/project1/class3.ts]
class class3 {}


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

Info 33   [00:01:14.000] Running: /user/username/projects/myproject/projects/project2/tsconfig.json
Info 34   [00:01:15.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/projects/project2/tsconfig.json
Info 35   [00:01:16.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/projects/project1/class3.ts 500 undefined WatchType: Closed Script info
Info 36   [00:01:17.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/projects/project2/tsconfig.json Version: 2 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 37   [00:01:18.000] Project '/user/username/projects/myproject/projects/project2/tsconfig.json' (Configured)
Info 38   [00:01:19.000] 	Files (4)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/projects/project1/class1.ts
	/user/username/projects/myproject/projects/project1/class3.ts
	/user/username/projects/myproject/projects/project2/class2.ts


	../../../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	../project1/class1.ts
	  Source from referenced project '../project1/tsconfig.json' included because '--module' is specified as 'none'
	../project1/class3.ts
	  Source from referenced project '../project1/tsconfig.json' included because '--module' is specified as 'none'
	class2.ts
	  Matched by default include pattern '**/*'

Info 39   [00:01:20.000] -----------------------------------------------
Info 40   [00:01:21.000] Running: *ensureProjectForOpenFiles*
Info 41   [00:01:22.000] Before ensureProjectForOpenFiles:
Info 42   [00:01:23.000] Project '/user/username/projects/myproject/projects/project2/tsconfig.json' (Configured)
Info 42   [00:01:24.000] 	Files (4)

Info 42   [00:01:25.000] -----------------------------------------------
Info 42   [00:01:26.000] Open files: 
Info 42   [00:01:27.000] 	FileName: /user/username/projects/myproject/projects/project2/class2.ts ProjectRootPath: undefined
Info 42   [00:01:28.000] 		Projects: /user/username/projects/myproject/projects/project2/tsconfig.json
Info 42   [00:01:29.000] After ensureProjectForOpenFiles:
Info 43   [00:01:30.000] Project '/user/username/projects/myproject/projects/project2/tsconfig.json' (Configured)
Info 43   [00:01:31.000] 	Files (4)

Info 43   [00:01:32.000] -----------------------------------------------
Info 43   [00:01:33.000] Open files: 
Info 43   [00:01:34.000] 	FileName: /user/username/projects/myproject/projects/project2/class2.ts ProjectRootPath: undefined
Info 43   [00:01:35.000] 		Projects: /user/username/projects/myproject/projects/project2/tsconfig.json
After checking timeout queue length (2) and running

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
/user/username/projects/myproject/projects/project1/class3.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/projects/project2:
  {}
/user/username/projects/myproject/projects/project1:
  {}

Info 43   [00:01:39.000] DirectoryWatcher:: Triggered with /user/username/projects/myproject/projects/project1/temp :: WatchInfo: /user/username/projects/myproject/projects/project1 1 undefined Config: /user/username/projects/myproject/projects/project1/tsconfig.json WatchType: Wild card directory
Info 44   [00:01:40.000] Project: /user/username/projects/myproject/projects/project1/tsconfig.json Detected excluded file: /user/username/projects/myproject/projects/project1/temp
Info 45   [00:01:41.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/projects/project1/temp :: WatchInfo: /user/username/projects/myproject/projects/project1 1 undefined Config: /user/username/projects/myproject/projects/project1/tsconfig.json WatchType: Wild card directory
Info 46   [00:01:43.000] DirectoryWatcher:: Triggered with /user/username/projects/myproject/projects/project1/temp/file.d.ts :: WatchInfo: /user/username/projects/myproject/projects/project1 1 undefined Config: /user/username/projects/myproject/projects/project1/tsconfig.json WatchType: Wild card directory
Info 47   [00:01:44.000] Project: /user/username/projects/myproject/projects/project1/tsconfig.json Detected excluded file: /user/username/projects/myproject/projects/project1/temp/file.d.ts
Info 48   [00:01:45.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/projects/project1/temp/file.d.ts :: WatchInfo: /user/username/projects/myproject/projects/project1 1 undefined Config: /user/username/projects/myproject/projects/project1/tsconfig.json WatchType: Wild card directory
Before checking timeout queue length (0) and running
//// [/user/username/projects/myproject/projects/project1/temp/file.d.ts]
declare class file {}


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
/user/username/projects/myproject/projects/project1/class3.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/projects/project2:
  {}
/user/username/projects/myproject/projects/project1:
  {}

After checking timeout queue length (0) and running

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
/user/username/projects/myproject/projects/project1/class3.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/projects/project2:
  {}
/user/username/projects/myproject/projects/project1:
  {}

Info 49   [00:01:48.000] DirectoryWatcher:: Triggered with /user/username/projects/myproject/projects/project1/class3.d.ts :: WatchInfo: /user/username/projects/myproject/projects/project1 1 undefined Config: /user/username/projects/myproject/projects/project1/tsconfig.json WatchType: Wild card directory
Info 50   [00:01:49.000] Project: /user/username/projects/myproject/projects/project1/tsconfig.json Detected output file: /user/username/projects/myproject/projects/project1/class3.d.ts
Info 51   [00:01:50.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/projects/project1/class3.d.ts :: WatchInfo: /user/username/projects/myproject/projects/project1 1 undefined Config: /user/username/projects/myproject/projects/project1/tsconfig.json WatchType: Wild card directory
Before checking timeout queue length (0) and running
//// [/user/username/projects/myproject/projects/project1/class3.d.ts]
declare class class3 {}


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
/user/username/projects/myproject/projects/project1/class3.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/projects/project2:
  {}
/user/username/projects/myproject/projects/project1:
  {}

After checking timeout queue length (0) and running

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
/user/username/projects/myproject/projects/project1/class3.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/projects/project2:
  {}
/user/username/projects/myproject/projects/project1:
  {}
