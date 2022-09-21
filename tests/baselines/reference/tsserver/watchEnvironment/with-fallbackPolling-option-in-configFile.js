Info 0    [00:00:17.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Info 1    [00:00:18.000] request:
    {
      "command": "configure",
      "arguments": {
        "watchOptions": {
          "fallbackPolling": "PriorityInterval"
        }
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
{"watchOptions":{"fallbackPolling":"PriorityInterval"}}

//// [/a/b/commonFile1.ts]
let x = 1


PolledWatches::

FsWatches::

FsWatchesRecursive::

Info 2    [00:00:19.000] Host watch options changed to {"fallbackPolling":1}, it will be take effect for next watches.
Info 3    [00:00:20.000] response:
    {"seq":0,"type":"response","command":"configure","request_seq":1,"success":true}
After request

PolledWatches::

FsWatches::

FsWatchesRecursive::

Info 4    [00:00:21.000] response:
    {
      "responseRequired": false
    }
Info 5    [00:00:22.000] request:
    {
      "seq": 0,
      "type": "request",
      "command": "open",
      "arguments": {
        "file": "/a/b/commonFile1.ts",
        "projectRootPath": "/a/b"
      }
    }
Before request

PolledWatches::

FsWatches::

FsWatchesRecursive::

Info 6    [00:00:23.000] Search path: /a/b
Info 7    [00:00:24.000] For info: /a/b/commonFile1.ts :: Config file name: /a/b/tsconfig.json
Info 8    [00:00:25.000] Creating configuration project /a/b/tsconfig.json
Info 9    [00:00:26.000] FileWatcher:: Added:: WatchInfo: /a/b/tsconfig.json 2000 {"fallbackPolling":1} Project: /a/b/tsconfig.json WatchType: Config file
Info 10   [00:00:27.000] Config: /a/b/tsconfig.json : {
 "rootNames": [
  "/a/b/commonFile1.ts",
  "/a/b/commonFile2.ts"
 ],
 "options": {
  "configFilePath": "/a/b/tsconfig.json"
 },
 "watchOptions": {
  "fallbackPolling": 1
 }
}
Info 11   [00:00:28.000] DirectoryWatcher:: Added:: WatchInfo: /a/b 1 {"fallbackPolling":1} Config: /a/b/tsconfig.json WatchType: Wild card directory
Info 12   [00:00:29.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b 1 {"fallbackPolling":1} Config: /a/b/tsconfig.json WatchType: Wild card directory
Info 13   [00:00:30.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 14   [00:00:31.000] FileWatcher:: Added:: WatchInfo: /a/b/commonFile2.ts 500 {"fallbackPolling":1} WatchType: Closed Script info
Info 15   [00:00:32.000] Starting updateGraphWorker: Project: /a/b/tsconfig.json
Info 16   [00:00:33.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 {"fallbackPolling":1} WatchType: Closed Script info
Info 17   [00:00:34.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 {"fallbackPolling":1} Project: /a/b/tsconfig.json WatchType: Type roots
Info 18   [00:00:35.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 {"fallbackPolling":1} Project: /a/b/tsconfig.json WatchType: Type roots
Info 19   [00:00:36.000] Finishing updateGraphWorker: Project: /a/b/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 20   [00:00:37.000] Project '/a/b/tsconfig.json' (Configured)
Info 21   [00:00:38.000] 	Files (3)
	/a/lib/lib.d.ts
	/a/b/commonFile1.ts
	/a/b/commonFile2.ts


	../lib/lib.d.ts
	  Default library for target 'es3'
	commonFile1.ts
	  Matched by default include pattern '**/*'
	commonFile2.ts
	  Matched by default include pattern '**/*'

Info 22   [00:00:39.000] -----------------------------------------------
Info 23   [00:00:40.000] Project '/a/b/tsconfig.json' (Configured)
Info 23   [00:00:41.000] 	Files (3)

Info 23   [00:00:42.000] -----------------------------------------------
Info 23   [00:00:43.000] Open files: 
Info 23   [00:00:44.000] 	FileName: /a/b/commonFile1.ts ProjectRootPath: /a/b
Info 23   [00:00:45.000] 		Projects: /a/b/tsconfig.json
After request

PolledWatches::
/a/b/tsconfig.json:
  {"pollingInterval":2000}
/a/b:
  {"pollingInterval":500}
/a/b/commonfile2.ts:
  {"pollingInterval":500}
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/a/b/node_modules/@types:
  {"pollingInterval":500}

FsWatches::

FsWatchesRecursive::

Info 23   [00:00:46.000] response:
    {
      "responseRequired": false
    }