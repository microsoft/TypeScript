Info 0    [00:00:13.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Before request
//// [/a/b/moduleFile.ts]
export function bar() { };

//// [/a/b/file1.ts]
import * as T from './moduleFile'; T.bar();

//// [/a/b/tsconfig.json]
{}


Info 1    [00:00:14.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/a/b/file1.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info 2    [00:00:15.000] Search path: /a/b
Info 3    [00:00:16.000] For info: /a/b/file1.ts :: Config file name: /a/b/tsconfig.json
Info 4    [00:00:17.000] Creating configuration project /a/b/tsconfig.json
Info 5    [00:00:18.000] FileWatcher:: Added:: WatchInfo: /a/b/tsconfig.json 2000 undefined Project: /a/b/tsconfig.json WatchType: Config file
Info 6    [00:00:19.000] Config: /a/b/tsconfig.json : {
 "rootNames": [
  "/a/b/file1.ts",
  "/a/b/moduleFile.ts"
 ],
 "options": {
  "configFilePath": "/a/b/tsconfig.json"
 }
}
Info 7    [00:00:20.000] DirectoryWatcher:: Added:: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Info 8    [00:00:21.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Info 9    [00:00:22.000] FileWatcher:: Added:: WatchInfo: /a/b/moduleFile.ts 500 undefined WatchType: Closed Script info
Info 10   [00:00:23.000] Starting updateGraphWorker: Project: /a/b/tsconfig.json
Info 11   [00:00:24.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /a/b/tsconfig.json WatchType: Missing file
Info 12   [00:00:25.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/tsconfig.json WatchType: Type roots
Info 13   [00:00:26.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/tsconfig.json WatchType: Type roots
Info 14   [00:00:27.000] Finishing updateGraphWorker: Project: /a/b/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 15   [00:00:28.000] Project '/a/b/tsconfig.json' (Configured)
Info 16   [00:00:29.000] 	Files (2)
	/a/b/moduleFile.ts Text-1 "export function bar() { };"
	/a/b/file1.ts SVC-1-0 "import * as T from './moduleFile'; T.bar();"


	moduleFile.ts
	  Imported via './moduleFile' from file 'file1.ts'
	  Matched by default include pattern '**/*'
	file1.ts
	  Matched by default include pattern '**/*'

Info 17   [00:00:30.000] -----------------------------------------------
Info 18   [00:00:31.000] Project '/a/b/tsconfig.json' (Configured)
Info 18   [00:00:32.000] 	Files (2)

Info 18   [00:00:33.000] -----------------------------------------------
Info 18   [00:00:34.000] Open files: 
Info 18   [00:00:35.000] 	FileName: /a/b/file1.ts ProjectRootPath: undefined
Info 18   [00:00:36.000] 		Projects: /a/b/tsconfig.json
Info 18   [00:00:37.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/lib/lib.d.ts: *new*
  {"pollingInterval":500}
/a/b/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/a/b/tsconfig.json: *new*
  {}
/a/b/modulefile.ts: *new*
  {}

FsWatchesRecursive::
/a/b: *new*
  {}

Before request

Info 19   [00:00:38.000] request:
    {
      "command": "semanticDiagnosticsSync",
      "arguments": {
        "file": "/a/b/file1.ts"
      },
      "seq": 2,
      "type": "request"
    }
Info 20   [00:00:39.000] response:
    {
      "response": [],
      "responseRequired": true
    }
After request

Info 21   [00:00:41.000] FileWatcher:: Triggered with /a/b/moduleFile.ts 2:: WatchInfo: /a/b/moduleFile.ts 500 undefined WatchType: Closed Script info
Info 22   [00:00:42.000] FileWatcher:: Close:: WatchInfo: /a/b/moduleFile.ts 500 undefined WatchType: Closed Script info
Info 23   [00:00:43.000] Scheduled: /a/b/tsconfig.json
Info 24   [00:00:44.000] Scheduled: *ensureProjectForOpenFiles*
Info 25   [00:00:45.000] Elapsed:: *ms FileWatcher:: Triggered with /a/b/moduleFile.ts 2:: WatchInfo: /a/b/moduleFile.ts 500 undefined WatchType: Closed Script info
Info 26   [00:00:46.000] DirectoryWatcher:: Triggered with /a/b/moduleFile.ts :: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Info 27   [00:00:47.000] Scheduled: /a/b/tsconfig.json, Cancelled earlier one
Info 28   [00:00:48.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 29   [00:00:49.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /a/b/moduleFile.ts :: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Info 30   [00:00:52.000] DirectoryWatcher:: Triggered with /a/b/moduleFile1.ts :: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Info 31   [00:00:53.000] Scheduled: /a/b/tsconfig.json, Cancelled earlier one
Info 32   [00:00:54.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 33   [00:00:55.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /a/b/moduleFile1.ts :: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Before running timeout callbacks
//// [/a/b/moduleFile1.ts]
export function bar() { };

//// [/a/b/moduleFile.ts] deleted

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/a/b/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/b/tsconfig.json:
  {}

FsWatches *deleted*::
/a/b/modulefile.ts:
  {}

FsWatchesRecursive::
/a/b:
  {}

Info 34   [00:00:56.000] Running: /a/b/tsconfig.json
Info 35   [00:00:57.000] FileWatcher:: Added:: WatchInfo: /a/b/moduleFile1.ts 500 undefined WatchType: Closed Script info
Info 36   [00:00:58.000] Starting updateGraphWorker: Project: /a/b/tsconfig.json
Info 37   [00:00:59.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/moduleFile 1 undefined Project: /a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 38   [00:01:00.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/moduleFile 1 undefined Project: /a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 39   [00:01:01.000] DirectoryWatcher:: Added:: WatchInfo: /a/b 0 undefined Project: /a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 40   [00:01:02.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b 0 undefined Project: /a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 41   [00:01:03.000] Finishing updateGraphWorker: Project: /a/b/tsconfig.json Version: 2 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 42   [00:01:04.000] Project '/a/b/tsconfig.json' (Configured)
Info 43   [00:01:05.000] 	Files (2)
	/a/b/file1.ts SVC-1-0 "import * as T from './moduleFile'; T.bar();"
	/a/b/moduleFile1.ts Text-1 "export function bar() { };"


	file1.ts
	  Matched by default include pattern '**/*'
	moduleFile1.ts
	  Matched by default include pattern '**/*'

Info 44   [00:01:06.000] -----------------------------------------------
Info 45   [00:01:07.000] Running: *ensureProjectForOpenFiles*
Info 46   [00:01:08.000] Before ensureProjectForOpenFiles:
Info 47   [00:01:09.000] Project '/a/b/tsconfig.json' (Configured)
Info 47   [00:01:10.000] 	Files (2)

Info 47   [00:01:11.000] -----------------------------------------------
Info 47   [00:01:12.000] Open files: 
Info 47   [00:01:13.000] 	FileName: /a/b/file1.ts ProjectRootPath: undefined
Info 47   [00:01:14.000] 		Projects: /a/b/tsconfig.json
Info 47   [00:01:15.000] After ensureProjectForOpenFiles:
Info 48   [00:01:16.000] Project '/a/b/tsconfig.json' (Configured)
Info 48   [00:01:17.000] 	Files (2)

Info 48   [00:01:18.000] -----------------------------------------------
Info 48   [00:01:19.000] Open files: 
Info 48   [00:01:20.000] 	FileName: /a/b/file1.ts ProjectRootPath: undefined
Info 48   [00:01:21.000] 		Projects: /a/b/tsconfig.json
After running timeout callbacks

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/a/b/node_modules/@types:
  {"pollingInterval":500}
/a/b/modulefile: *new*
  {"pollingInterval":500}

FsWatches::
/a/b/tsconfig.json:
  {}
/a/b/modulefile1.ts: *new*
  {}
/a/b: *new*
  {}

FsWatchesRecursive::
/a/b:
  {}

Before request

Info 48   [00:01:22.000] request:
    {
      "command": "semanticDiagnosticsSync",
      "arguments": {
        "file": "/a/b/file1.ts"
      },
      "seq": 3,
      "type": "request"
    }
Info 49   [00:01:23.000] response:
    {
      "response": [
        {
          "start": {
            "line": 1,
            "offset": 20
          },
          "end": {
            "line": 1,
            "offset": 34
          },
          "text": "Cannot find module './moduleFile' or its corresponding type declarations.",
          "code": 2307,
          "category": "error"
        }
      ],
      "responseRequired": true
    }
After request

Info 50   [00:01:25.000] FileWatcher:: Triggered with /a/b/moduleFile1.ts 2:: WatchInfo: /a/b/moduleFile1.ts 500 undefined WatchType: Closed Script info
Info 51   [00:01:26.000] FileWatcher:: Close:: WatchInfo: /a/b/moduleFile1.ts 500 undefined WatchType: Closed Script info
Info 52   [00:01:27.000] Scheduled: /a/b/tsconfig.json
Info 53   [00:01:28.000] Scheduled: *ensureProjectForOpenFiles*
Info 54   [00:01:29.000] Elapsed:: *ms FileWatcher:: Triggered with /a/b/moduleFile1.ts 2:: WatchInfo: /a/b/moduleFile1.ts 500 undefined WatchType: Closed Script info
Info 55   [00:01:30.000] DirectoryWatcher:: Triggered with /a/b/moduleFile1.ts :: WatchInfo: /a/b 0 undefined Project: /a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 56   [00:01:31.000] Scheduled: /a/b/tsconfig.jsonFailedLookupInvalidation
Info 57   [00:01:32.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /a/b/moduleFile1.ts :: WatchInfo: /a/b 0 undefined Project: /a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 58   [00:01:33.000] DirectoryWatcher:: Triggered with /a/b/moduleFile1.ts :: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Info 59   [00:01:34.000] Scheduled: /a/b/tsconfig.json, Cancelled earlier one
Info 60   [00:01:35.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 61   [00:01:36.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /a/b/moduleFile1.ts :: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Info 62   [00:01:39.000] DirectoryWatcher:: Triggered with /a/b/moduleFile.ts :: WatchInfo: /a/b 0 undefined Project: /a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 63   [00:01:40.000] Scheduled: /a/b/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info 64   [00:01:41.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /a/b/moduleFile.ts :: WatchInfo: /a/b 0 undefined Project: /a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 65   [00:01:42.000] DirectoryWatcher:: Triggered with /a/b/moduleFile.ts :: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Info 66   [00:01:43.000] Scheduled: /a/b/tsconfig.json, Cancelled earlier one
Info 67   [00:01:44.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 68   [00:01:45.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /a/b/moduleFile.ts :: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Before running timeout callbacks
//// [/a/b/moduleFile.ts]
export function bar() { };

//// [/a/b/moduleFile1.ts] deleted

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/a/b/node_modules/@types:
  {"pollingInterval":500}
/a/b/modulefile:
  {"pollingInterval":500}

FsWatches::
/a/b/tsconfig.json:
  {}
/a/b:
  {}

FsWatches *deleted*::
/a/b/modulefile1.ts:
  {}

FsWatchesRecursive::
/a/b:
  {}

Info 69   [00:01:46.000] Running: /a/b/tsconfig.jsonFailedLookupInvalidation
Info 70   [00:01:47.000] Scheduled: /a/b/tsconfig.json, Cancelled earlier one
Info 71   [00:01:48.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
After running timeout callbacks

Before request

Info 72   [00:01:49.000] request:
    {
      "command": "semanticDiagnosticsSync",
      "arguments": {
        "file": "/a/b/file1.ts"
      },
      "seq": 4,
      "type": "request"
    }
Info 73   [00:01:50.000] FileWatcher:: Added:: WatchInfo: /a/b/moduleFile.ts 500 undefined WatchType: Closed Script info
Info 74   [00:01:51.000] Starting updateGraphWorker: Project: /a/b/tsconfig.json
Info 75   [00:01:52.000] DirectoryWatcher:: Close:: WatchInfo: /a/b/moduleFile 1 undefined Project: /a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 76   [00:01:53.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /a/b/moduleFile 1 undefined Project: /a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 77   [00:01:54.000] DirectoryWatcher:: Close:: WatchInfo: /a/b 0 undefined Project: /a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 78   [00:01:55.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /a/b 0 undefined Project: /a/b/tsconfig.json WatchType: Failed Lookup Locations
Info 79   [00:01:56.000] Finishing updateGraphWorker: Project: /a/b/tsconfig.json Version: 3 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 80   [00:01:57.000] Project '/a/b/tsconfig.json' (Configured)
Info 81   [00:01:58.000] 	Files (2)
	/a/b/moduleFile.ts Text-2 "export function bar() { };"
	/a/b/file1.ts SVC-1-0 "import * as T from './moduleFile'; T.bar();"


	moduleFile.ts
	  Imported via './moduleFile' from file 'file1.ts'
	  Matched by default include pattern '**/*'
	file1.ts
	  Matched by default include pattern '**/*'

Info 82   [00:01:59.000] -----------------------------------------------
Info 83   [00:02:00.000] response:
    {
      "response": [],
      "responseRequired": true
    }
After request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/a/b/node_modules/@types:
  {"pollingInterval":500}

PolledWatches *deleted*::
/a/b/modulefile:
  {"pollingInterval":500}

FsWatches::
/a/b/tsconfig.json:
  {}
/a/b/modulefile.ts: *new*
  {}

FsWatches *deleted*::
/a/b:
  {}

FsWatchesRecursive::
/a/b:
  {}
