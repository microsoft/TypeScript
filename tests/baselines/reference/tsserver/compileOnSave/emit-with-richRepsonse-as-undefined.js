Info 0    [00:00:23.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Info 1    [00:00:24.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/myproject/file1.ts"
      },
      "seq": 1,
      "type": "request"
    }
Before request
//// [/user/username/projects/myproject/file1.ts]
const x = 1;

//// [/user/username/projects/myproject/file2.ts]
const y = 2;

//// [/user/username/projects/myproject/tsconfig.json]
{"compileOnSave":true,"compilerOptions":{"outDir":"test","noEmitOnError":true,"declaration":true},"exclude":["node_modules"]}

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

Info 2    [00:00:25.000] Search path: /user/username/projects/myproject
Info 3    [00:00:26.000] For info: /user/username/projects/myproject/file1.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 4    [00:00:27.000] Creating configuration project /user/username/projects/myproject/tsconfig.json
Info 5    [00:00:28.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info 6    [00:00:29.000] Config: /user/username/projects/myproject/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/file1.ts",
  "/user/username/projects/myproject/file2.ts"
 ],
 "options": {
  "outDir": "/user/username/projects/myproject/test",
  "noEmitOnError": true,
  "declaration": true,
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
 }
}
Info 7    [00:00:30.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 8    [00:00:31.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 9    [00:00:32.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/file2.ts 500 undefined WatchType: Closed Script info
Info 10   [00:00:33.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json
Info 11   [00:00:34.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 12   [00:00:35.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 13   [00:00:36.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 14   [00:00:37.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 15   [00:00:38.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 16   [00:00:39.000] 	Files (3)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/file1.ts
	/user/username/projects/myproject/file2.ts


	../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	file1.ts
	  Matched by default include pattern '**/*'
	file2.ts
	  Matched by default include pattern '**/*'

Info 17   [00:00:40.000] -----------------------------------------------
Info 18   [00:00:41.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 18   [00:00:42.000] 	Files (3)

Info 18   [00:00:43.000] -----------------------------------------------
Info 18   [00:00:44.000] Open files: 
Info 18   [00:00:45.000] 	FileName: /user/username/projects/myproject/file1.ts ProjectRootPath: undefined
Info 18   [00:00:46.000] 		Projects: /user/username/projects/myproject/tsconfig.json
After request

PolledWatches::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/tsconfig.json:
  {}
/user/username/projects/myproject/file2.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject:
  {}

Info 18   [00:00:47.000] response:
    {
      "responseRequired": false
    }
Info 19   [00:00:48.000] request:
    {
      "command": "compileOnSaveAffectedFileList",
      "arguments": {
        "file": "/user/username/projects/myproject/file1.ts"
      },
      "seq": 2,
      "type": "request"
    }
Before request

PolledWatches::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/tsconfig.json:
  {}
/user/username/projects/myproject/file2.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject:
  {}

Info 20   [00:00:49.000] Before ensureProjectForOpenFiles:
Info 21   [00:00:50.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 21   [00:00:51.000] 	Files (3)

Info 21   [00:00:52.000] -----------------------------------------------
Info 21   [00:00:53.000] Open files: 
Info 21   [00:00:54.000] 	FileName: /user/username/projects/myproject/file1.ts ProjectRootPath: undefined
Info 21   [00:00:55.000] 		Projects: /user/username/projects/myproject/tsconfig.json
Info 21   [00:00:56.000] After ensureProjectForOpenFiles:
Info 22   [00:00:57.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 22   [00:00:58.000] 	Files (3)

Info 22   [00:00:59.000] -----------------------------------------------
Info 22   [00:01:00.000] Open files: 
Info 22   [00:01:01.000] 	FileName: /user/username/projects/myproject/file1.ts ProjectRootPath: undefined
Info 22   [00:01:02.000] 		Projects: /user/username/projects/myproject/tsconfig.json
After request

PolledWatches::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/tsconfig.json:
  {}
/user/username/projects/myproject/file2.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject:
  {}

Info 22   [00:01:03.000] response:
    {
      "response": [
        {
          "projectFileName": "/user/username/projects/myproject/tsconfig.json",
          "fileNames": [
            "/user/username/projects/myproject/file1.ts",
            "/user/username/projects/myproject/file2.ts"
          ],
          "projectUsesOutFile": false
        }
      ],
      "responseRequired": true
    }
Info 23   [00:01:04.000] request:
    {
      "command": "compileOnSaveEmitFile",
      "arguments": {
        "file": "/user/username/projects/myproject/file1.ts"
      },
      "seq": 3,
      "type": "request"
    }
Before request

PolledWatches::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/tsconfig.json:
  {}
/user/username/projects/myproject/file2.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject:
  {}

Info 24   [00:01:08.000] DirectoryWatcher:: Triggered with /user/username/projects/myproject/test :: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 25   [00:01:09.000] Scheduled: /user/username/projects/myproject/tsconfig.json
Info 26   [00:01:10.000] Scheduled: *ensureProjectForOpenFiles*
Info 27   [00:01:11.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/test :: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 28   [00:01:14.000] DirectoryWatcher:: Triggered with /user/username/projects/myproject/test/file1.js :: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 29   [00:01:15.000] Project: /user/username/projects/myproject/tsconfig.json Detected file add/remove of non supported extension: /user/username/projects/myproject/test/file1.js
Info 30   [00:01:16.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/test/file1.js :: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 31   [00:01:19.000] DirectoryWatcher:: Triggered with /user/username/projects/myproject/test/file1.d.ts :: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 32   [00:01:20.000] Scheduled: /user/username/projects/myproject/tsconfig.json, Cancelled earlier one
Info 33   [00:01:21.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 34   [00:01:22.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/test/file1.d.ts :: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
After request
//// [/user/username/projects/myproject/test/file1.js]
var x = 1;


//// [/user/username/projects/myproject/test/file1.d.ts]
declare const x = 1;



PolledWatches::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/tsconfig.json:
  {}
/user/username/projects/myproject/file2.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject:
  {}

Info 35   [00:01:23.000] response:
    {
      "response": true,
      "responseRequired": true
    }
Info 36   [00:01:24.000] request:
    {
      "command": "compileOnSaveEmitFile",
      "arguments": {
        "file": "/user/username/projects/myproject/file2.ts"
      },
      "seq": 4,
      "type": "request"
    }
Before request

PolledWatches::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/tsconfig.json:
  {}
/user/username/projects/myproject/file2.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject:
  {}

Info 37   [00:01:25.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/test/file1.d.ts 500 undefined WatchType: Closed Script info
Info 38   [00:01:26.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json
Info 39   [00:01:27.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json Version: 2 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 40   [00:01:28.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 41   [00:01:29.000] 	Files (4)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/file1.ts
	/user/username/projects/myproject/file2.ts
	/user/username/projects/myproject/test/file1.d.ts


	../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	file1.ts
	  Matched by default include pattern '**/*'
	file2.ts
	  Matched by default include pattern '**/*'
	test/file1.d.ts
	  Matched by default include pattern '**/*'

Info 42   [00:01:30.000] -----------------------------------------------
After request

PolledWatches::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/tsconfig.json:
  {}
/user/username/projects/myproject/file2.ts:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/test/file1.d.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject:
  {}

Info 43   [00:01:31.000] response:
    {
      "response": false,
      "responseRequired": true
    }