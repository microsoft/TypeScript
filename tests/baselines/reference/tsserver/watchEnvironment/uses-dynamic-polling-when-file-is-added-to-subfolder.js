Info 0    [00:00:21.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Info 1    [00:00:22.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/a/username/project/src/index.ts"
      },
      "seq": 1,
      "type": "request"
    }
Before request
//// [/a/username/project/src/index.ts]
import {} from "./"

//// [/a/username/project/src/file1.ts]


//// [/a/username/project/tsconfig.json]
{"watchOptions":{"synchronousWatchDirectory":true}}

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

Info 2    [00:00:23.000] Search path: /a/username/project/src
Info 3    [00:00:24.000] For info: /a/username/project/src/index.ts :: Config file name: /a/username/project/tsconfig.json
Info 4    [00:00:25.000] Creating configuration project /a/username/project/tsconfig.json
Info 5    [00:00:26.000] FileWatcher:: Added:: WatchInfo: /a/username/project/tsconfig.json 2000 undefined Project: /a/username/project/tsconfig.json WatchType: Config file
Info 6    [00:00:27.000] Config: /a/username/project/tsconfig.json : {
 "rootNames": [
  "/a/username/project/src/file1.ts",
  "/a/username/project/src/index.ts"
 ],
 "options": {
  "configFilePath": "/a/username/project/tsconfig.json"
 },
 "watchOptions": {
  "synchronousWatchDirectory": true
 }
}
Info 7    [00:00:28.000] FileWatcher:: Close:: WatchInfo: /a/username/project/tsconfig.json 2000 undefined Project: /a/username/project/tsconfig.json WatchType: Config file
Info 8    [00:00:29.000] FileWatcher:: Added:: WatchInfo: /a/username/project/tsconfig.json 2000 {"synchronousWatchDirectory":true} Project: /a/username/project/tsconfig.json WatchType: Config file
Info 9    [00:00:30.000] DirectoryWatcher:: Added:: WatchInfo: /a/username/project 1 {"synchronousWatchDirectory":true} Config: /a/username/project/tsconfig.json WatchType: Wild card directory
Info 10   [00:00:31.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/username/project 1 {"synchronousWatchDirectory":true} Config: /a/username/project/tsconfig.json WatchType: Wild card directory
Info 11   [00:00:32.000] FileWatcher:: Added:: WatchInfo: /a/username/project/src/file1.ts 500 undefined WatchType: Closed Script info
Info 12   [00:00:33.000] Starting updateGraphWorker: Project: /a/username/project/tsconfig.json
Info 13   [00:00:34.000] DirectoryWatcher:: Added:: WatchInfo: /a/username/project/src 1 {"synchronousWatchDirectory":true} Project: /a/username/project/tsconfig.json WatchType: Failed Lookup Locations
Info 14   [00:00:35.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/username/project/src 1 {"synchronousWatchDirectory":true} Project: /a/username/project/tsconfig.json WatchType: Failed Lookup Locations
Info 15   [00:00:36.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 16   [00:00:37.000] DirectoryWatcher:: Added:: WatchInfo: /a/username/project/node_modules/@types 1 {"synchronousWatchDirectory":true} Project: /a/username/project/tsconfig.json WatchType: Type roots
Info 17   [00:00:38.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/username/project/node_modules/@types 1 {"synchronousWatchDirectory":true} Project: /a/username/project/tsconfig.json WatchType: Type roots
Info 18   [00:00:39.000] Finishing updateGraphWorker: Project: /a/username/project/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 19   [00:00:40.000] Project '/a/username/project/tsconfig.json' (Configured)
Info 20   [00:00:41.000] 	Files (3)
	/a/lib/lib.d.ts
	/a/username/project/src/file1.ts
	/a/username/project/src/index.ts


	../../lib/lib.d.ts
	  Default library for target 'es5'
	src/file1.ts
	  Matched by default include pattern '**/*'
	src/index.ts
	  Matched by default include pattern '**/*'
	  Imported via "./" from file 'src/index.ts'

Info 21   [00:00:42.000] -----------------------------------------------
Info 22   [00:00:43.000] Project '/a/username/project/tsconfig.json' (Configured)
Info 22   [00:00:44.000] 	Files (3)

Info 22   [00:00:45.000] -----------------------------------------------
Info 22   [00:00:46.000] Open files: 
Info 22   [00:00:47.000] 	FileName: /a/username/project/src/index.ts ProjectRootPath: undefined
Info 22   [00:00:48.000] 		Projects: /a/username/project/tsconfig.json
After request

PolledWatches::

FsWatches::
/a/username/project/tsconfig.json:
  {}
/a/username/project/src/file1.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::

Info 22   [00:00:49.000] response:
    {
      "responseRequired": false
    }
Info 23   [00:00:50.000] request:
    {
      "command": "completionInfo",
      "arguments": {
        "file": "/a/username/project/src/index.ts",
        "line": 1,
        "offset": 19
      },
      "seq": 2,
      "type": "request"
    }
Before request

PolledWatches::

FsWatches::
/a/username/project/tsconfig.json:
  {}
/a/username/project/src/file1.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::

After request

PolledWatches::

FsWatches::
/a/username/project/tsconfig.json:
  {}
/a/username/project/src/file1.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::

Info 24   [00:00:51.000] response:
    {
      "response": {
        "isGlobalCompletion": false,
        "isMemberCompletion": false,
        "isNewIdentifierLocation": true,
        "entries": [
          {
            "name": "file1",
            "kind": "script",
            "kindModifiers": ".ts",
            "sortText": "11"
          }
        ]
      },
      "responseRequired": true
    }
Before running timeout callbacks
//// [/a/username/project/src/file2.ts]



PolledWatches::

FsWatches::
/a/username/project/tsconfig.json:
  {}
/a/username/project/src/file1.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::

Info 25   [00:00:54.000] DirectoryWatcher:: Triggered with /a/username/project/src :: WatchInfo: /a/username/project 1 {"synchronousWatchDirectory":true} Config: /a/username/project/tsconfig.json WatchType: Wild card directory
Info 26   [00:00:55.000] Scheduled: /a/username/project/tsconfig.json
Info 27   [00:00:56.000] Scheduled: *ensureProjectForOpenFiles*
Info 28   [00:00:57.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /a/username/project/src :: WatchInfo: /a/username/project 1 {"synchronousWatchDirectory":true} Config: /a/username/project/tsconfig.json WatchType: Wild card directory
Info 29   [00:00:58.000] DirectoryWatcher:: Triggered with /a/username/project/src :: WatchInfo: /a/username/project/src 1 {"synchronousWatchDirectory":true} Project: /a/username/project/tsconfig.json WatchType: Failed Lookup Locations
Info 30   [00:00:59.000] Scheduled: /a/username/project/tsconfig.jsonFailedLookupInvalidation
Info 31   [00:01:00.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /a/username/project/src :: WatchInfo: /a/username/project/src 1 {"synchronousWatchDirectory":true} Project: /a/username/project/tsconfig.json WatchType: Failed Lookup Locations
After running timeout callbacks

PolledWatches::

FsWatches::
/a/username/project/tsconfig.json:
  {}
/a/username/project/src/file1.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::

Info 32   [00:01:01.000] request:
    {
      "command": "completionInfo",
      "arguments": {
        "file": "/a/username/project/src/index.ts",
        "line": 1,
        "offset": 19
      },
      "seq": 3,
      "type": "request"
    }
Before request

PolledWatches::

FsWatches::
/a/username/project/tsconfig.json:
  {}
/a/username/project/src/file1.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::

Info 33   [00:01:02.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 34   [00:01:03.000] FileWatcher:: Added:: WatchInfo: /a/username/project/src/file2.ts 500 undefined WatchType: Closed Script info
Info 35   [00:01:04.000] Starting updateGraphWorker: Project: /a/username/project/tsconfig.json
Info 36   [00:01:05.000] Finishing updateGraphWorker: Project: /a/username/project/tsconfig.json Version: 2 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 37   [00:01:06.000] Project '/a/username/project/tsconfig.json' (Configured)
Info 38   [00:01:07.000] 	Files (4)
	/a/lib/lib.d.ts
	/a/username/project/src/file1.ts
	/a/username/project/src/index.ts
	/a/username/project/src/file2.ts


	../../lib/lib.d.ts
	  Default library for target 'es5'
	src/file1.ts
	  Matched by default include pattern '**/*'
	src/index.ts
	  Matched by default include pattern '**/*'
	  Imported via "./" from file 'src/index.ts'
	src/file2.ts
	  Matched by default include pattern '**/*'

Info 39   [00:01:08.000] -----------------------------------------------
After request

PolledWatches::

FsWatches::
/a/username/project/tsconfig.json:
  {}
/a/username/project/src/file1.ts:
  {}
/a/lib/lib.d.ts:
  {}
/a/username/project/src/file2.ts:
  {}

FsWatchesRecursive::

Info 40   [00:01:09.000] response:
    {
      "response": {
        "isGlobalCompletion": false,
        "isMemberCompletion": false,
        "isNewIdentifierLocation": true,
        "entries": [
          {
            "name": "file1",
            "kind": "script",
            "kindModifiers": ".ts",
            "sortText": "11"
          },
          {
            "name": "file2",
            "kind": "script",
            "kindModifiers": ".ts",
            "sortText": "11"
          }
        ]
      },
      "responseRequired": true
    }