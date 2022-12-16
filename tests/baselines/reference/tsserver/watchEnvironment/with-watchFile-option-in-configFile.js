Info 0    [00:00:17.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Info 1    [00:00:18.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/a/b/commonFile1.ts",
        "projectRootPath": "/a/b"
      },
      "seq": 1,
      "type": "request"
    }
Before request
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

//// [/a/b/commonFile2.ts]
let y = 1

//// [/a/b/tsconfig.json]
{"watchOptions":{"watchFile":"UseFsEvents"}}

//// [/a/b/commonFile1.ts]
let x = 1


PolledWatches::

FsWatches::

FsWatchesRecursive::

Info 2    [00:00:19.000] Search path: /a/b
Info 3    [00:00:20.000] For info: /a/b/commonFile1.ts :: Config file name: /a/b/tsconfig.json
Info 4    [00:00:21.000] Creating configuration project /a/b/tsconfig.json
Info 5    [00:00:22.000] FileWatcher:: Added:: WatchInfo: /a/b/tsconfig.json 2000 undefined Project: /a/b/tsconfig.json WatchType: Config file
Info 6    [00:00:23.000] Config: /a/b/tsconfig.json : {
 "rootNames": [
  "/a/b/commonFile1.ts",
  "/a/b/commonFile2.ts"
 ],
 "options": {
  "configFilePath": "/a/b/tsconfig.json"
 },
 "watchOptions": {
  "watchFile": 4
 }
}
Info 7    [00:00:24.000] FileWatcher:: Close:: WatchInfo: /a/b/tsconfig.json 2000 undefined Project: /a/b/tsconfig.json WatchType: Config file
Info 8    [00:00:25.000] FileWatcher:: Added:: WatchInfo: /a/b/tsconfig.json 2000 {"watchFile":4} Project: /a/b/tsconfig.json WatchType: Config file
Info 9    [00:00:26.000] DirectoryWatcher:: Added:: WatchInfo: /a/b 1 {"watchFile":4} Config: /a/b/tsconfig.json WatchType: Wild card directory
Info 10   [00:00:27.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b 1 {"watchFile":4} Config: /a/b/tsconfig.json WatchType: Wild card directory
Info 11   [00:00:28.000] FileWatcher:: Added:: WatchInfo: /a/b/commonFile2.ts 500 undefined WatchType: Closed Script info
Info 12   [00:00:29.000] Starting updateGraphWorker: Project: /a/b/tsconfig.json
Info 13   [00:00:30.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 14   [00:00:31.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 {"watchFile":4} Project: /a/b/tsconfig.json WatchType: Type roots
Info 15   [00:00:32.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 {"watchFile":4} Project: /a/b/tsconfig.json WatchType: Type roots
Info 16   [00:00:33.000] Finishing updateGraphWorker: Project: /a/b/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 17   [00:00:34.000] Project '/a/b/tsconfig.json' (Configured)
Info 18   [00:00:35.000] 	Files (3)
	/a/lib/lib.d.ts
	/a/b/commonFile1.ts
	/a/b/commonFile2.ts


	../lib/lib.d.ts
	  Default library for target 'es5'
	commonFile1.ts
	  Matched by default include pattern '**/*'
	commonFile2.ts
	  Matched by default include pattern '**/*'

Info 19   [00:00:36.000] -----------------------------------------------
Info 20   [00:00:37.000] Project '/a/b/tsconfig.json' (Configured)
Info 20   [00:00:38.000] 	Files (3)

Info 20   [00:00:39.000] -----------------------------------------------
Info 20   [00:00:40.000] Open files: 
Info 20   [00:00:41.000] 	FileName: /a/b/commonFile1.ts ProjectRootPath: /a/b
Info 20   [00:00:42.000] 		Projects: /a/b/tsconfig.json
After request

PolledWatches::
/a/b/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/b/tsconfig.json:
  {}
/a/b/commonfile2.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/a/b:
  {}

Info 20   [00:00:43.000] response:
    {
      "responseRequired": false
    }