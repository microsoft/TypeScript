Info 0    [00:00:19.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Info 1    [00:00:20.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/a/b/project/file1.ts"
      },
      "seq": 1,
      "type": "request"
    }
Before request
//// [/a/b/project/file1.ts]
import a from "file2"

//// [/a/b/project/file3.ts]
export class c { }

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

//// [/a/b/project/tsconfig.json]
{"compilerOptions":{"typeRoots":[]}}


PolledWatches::

FsWatches::

FsWatchesRecursive::

Info 2    [00:00:21.000] Search path: /a/b/project
Info 3    [00:00:22.000] For info: /a/b/project/file1.ts :: Config file name: /a/b/project/tsconfig.json
Info 4    [00:00:23.000] Creating configuration project /a/b/project/tsconfig.json
Info 5    [00:00:24.000] FileWatcher:: Added:: WatchInfo: /a/b/project/tsconfig.json 2000 undefined Project: /a/b/project/tsconfig.json WatchType: Config file
Info 6    [00:00:25.000] Config: /a/b/project/tsconfig.json : {
 "rootNames": [
  "/a/b/project/file1.ts",
  "/a/b/project/file3.ts"
 ],
 "options": {
  "typeRoots": [],
  "configFilePath": "/a/b/project/tsconfig.json"
 }
}
Info 7    [00:00:26.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/project 1 undefined Config: /a/b/project/tsconfig.json WatchType: Wild card directory
Info 8    [00:00:27.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/project 1 undefined Config: /a/b/project/tsconfig.json WatchType: Wild card directory
Info 9    [00:00:28.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 10   [00:00:29.000] FileWatcher:: Added:: WatchInfo: /a/b/project/file3.ts 500 undefined WatchType: Closed Script info
Info 11   [00:00:30.000] Starting updateGraphWorker: Project: /a/b/project/tsconfig.json
Info 12   [00:00:31.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 13   [00:00:32.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/project/node_modules 1 undefined Project: /a/b/project/tsconfig.json WatchType: Failed Lookup Locations
Info 14   [00:00:33.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/project/node_modules 1 undefined Project: /a/b/project/tsconfig.json WatchType: Failed Lookup Locations
Info 15   [00:00:34.000] Finishing updateGraphWorker: Project: /a/b/project/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 16   [00:00:35.000] Project '/a/b/project/tsconfig.json' (Configured)
Info 17   [00:00:36.000] 	Files (3)
	/a/lib/lib.d.ts
	/a/b/project/file1.ts
	/a/b/project/file3.ts


	../../lib/lib.d.ts
	  Default library for target 'es3'
	file1.ts
	  Matched by default include pattern '**/*'
	file3.ts
	  Matched by default include pattern '**/*'

Info 18   [00:00:37.000] -----------------------------------------------
Info 19   [00:00:38.000] Project '/a/b/project/tsconfig.json' (Configured)
Info 19   [00:00:39.000] 	Files (3)

Info 19   [00:00:40.000] -----------------------------------------------
Info 19   [00:00:41.000] Open files: 
Info 19   [00:00:42.000] 	FileName: /a/b/project/file1.ts ProjectRootPath: undefined
Info 19   [00:00:43.000] 		Projects: /a/b/project/tsconfig.json
After request

PolledWatches::
/a/b/project/node_modules:
  {"pollingInterval":500}

FsWatches::
/a/b/project/tsconfig.json:
  {}
/a/b/project/file3.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/a/b/project:
  {}

Info 19   [00:00:44.000] response:
    {
      "responseRequired": false
    }
Info 20   [00:00:48.000] FileWatcher:: Triggered with /a/b/project/file3.ts 1:: WatchInfo: /a/b/project/file3.ts 500 undefined WatchType: Closed Script info
Info 21   [00:00:49.000] Scheduled: /a/b/project/tsconfig.json
Info 22   [00:00:50.000] Scheduled: *ensureProjectForOpenFiles*
Info 23   [00:00:51.000] Elapsed:: *ms FileWatcher:: Triggered with /a/b/project/file3.ts 1:: WatchInfo: /a/b/project/file3.ts 500 undefined WatchType: Closed Script info
Before checking timeout queue length (2) and running
//// [/a/b/project/file3.ts]
export class c { }export class d {}


PolledWatches::
/a/b/project/node_modules:
  {"pollingInterval":500}

FsWatches::
/a/b/project/tsconfig.json:
  {}
/a/b/project/file3.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/a/b/project:
  {}

Info 24   [00:00:52.000] Running: /a/b/project/tsconfig.json
Info 25   [00:00:53.000] Starting updateGraphWorker: Project: /a/b/project/tsconfig.json
Info 26   [00:00:54.000] Finishing updateGraphWorker: Project: /a/b/project/tsconfig.json Version: 2 structureChanged: false structureIsReused:: Completely Elapsed:: *ms
Info 27   [00:00:55.000] Different program with same set of files
Info 28   [00:00:56.000] Running: *ensureProjectForOpenFiles*
Info 29   [00:00:57.000] Before ensureProjectForOpenFiles:
Info 30   [00:00:58.000] Project '/a/b/project/tsconfig.json' (Configured)
Info 30   [00:00:59.000] 	Files (3)

Info 30   [00:01:00.000] -----------------------------------------------
Info 30   [00:01:01.000] Open files: 
Info 30   [00:01:02.000] 	FileName: /a/b/project/file1.ts ProjectRootPath: undefined
Info 30   [00:01:03.000] 		Projects: /a/b/project/tsconfig.json
Info 30   [00:01:04.000] After ensureProjectForOpenFiles:
Info 31   [00:01:05.000] Project '/a/b/project/tsconfig.json' (Configured)
Info 31   [00:01:06.000] 	Files (3)

Info 31   [00:01:07.000] -----------------------------------------------
Info 31   [00:01:08.000] Open files: 
Info 31   [00:01:09.000] 	FileName: /a/b/project/file1.ts ProjectRootPath: undefined
Info 31   [00:01:10.000] 		Projects: /a/b/project/tsconfig.json
After checking timeout queue length (2) and running

PolledWatches::
/a/b/project/node_modules:
  {"pollingInterval":500}

FsWatches::
/a/b/project/tsconfig.json:
  {}
/a/b/project/file3.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/a/b/project:
  {}

Before running timeout callbacks
//// [/a/b/node_modules/file2.d.ts]
export class a { }


PolledWatches::
/a/b/project/node_modules:
  {"pollingInterval":500}

FsWatches::
/a/b/project/tsconfig.json:
  {}
/a/b/project/file3.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/a/b/project:
  {}

After running timeout callbacks

PolledWatches::
/a/b/project/node_modules:
  {"pollingInterval":500}

FsWatches::
/a/b/project/tsconfig.json:
  {}
/a/b/project/file3.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/a/b/project:
  {}

Before running timeout callbacks

PolledWatches::
/a/b/project/node_modules:
  {"pollingInterval":500}

FsWatches::
/a/b/project/tsconfig.json:
  {}
/a/b/project/file3.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/a/b/project:
  {}

After running timeout callbacks

PolledWatches::
/a/b/project/node_modules:
  {"pollingInterval":500}

FsWatches::
/a/b/project/tsconfig.json:
  {}
/a/b/project/file3.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/a/b/project:
  {}
