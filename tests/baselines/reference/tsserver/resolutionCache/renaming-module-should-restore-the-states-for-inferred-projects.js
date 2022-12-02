Info 0    [00:00:11.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Info 1    [00:00:12.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/a/b/file1.ts"
      },
      "seq": 1,
      "type": "request"
    }
Before request
//// [/a/b/moduleFile.ts]
export function bar() { };

//// [/a/b/file1.ts]
import * as T from './moduleFile'; T.bar();


PolledWatches::

FsWatches::

FsWatchesRecursive::

Info 2    [00:00:13.000] Search path: /a/b
Info 3    [00:00:14.000] For info: /a/b/file1.ts :: No config files found.
Info 4    [00:00:15.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 5    [00:00:16.000] FileWatcher:: Added:: WatchInfo: /a/b/moduleFile.ts 500 undefined WatchType: Closed Script info
Info 6    [00:00:17.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /dev/null/inferredProject1* WatchType: Missing file
Info 7    [00:00:18.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 8    [00:00:19.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 9    [00:00:20.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 10   [00:00:21.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 11   [00:00:22.000] 	Files (2)
	/a/b/moduleFile.ts
	/a/b/file1.ts


	moduleFile.ts
	  Imported via './moduleFile' from file 'file1.ts'
	file1.ts
	  Root file specified for compilation

Info 12   [00:00:23.000] -----------------------------------------------
Info 13   [00:00:24.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 13   [00:00:25.000] 	Files (2)

Info 13   [00:00:26.000] -----------------------------------------------
Info 13   [00:00:27.000] Open files: 
Info 13   [00:00:28.000] 	FileName: /a/b/file1.ts ProjectRootPath: undefined
Info 13   [00:00:29.000] 		Projects: /dev/null/inferredProject1*
After request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/a/b/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/b/modulefile.ts:
  {}

FsWatchesRecursive::

Info 13   [00:00:30.000] response:
    {
      "responseRequired": false
    }
Info 14   [00:00:31.000] request:
    {
      "command": "semanticDiagnosticsSync",
      "arguments": {
        "file": "/a/b/file1.ts"
      },
      "seq": 2,
      "type": "request"
    }
Before request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/a/b/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/b/modulefile.ts:
  {}

FsWatchesRecursive::

After request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/a/b/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/b/modulefile.ts:
  {}

FsWatchesRecursive::

Info 15   [00:00:32.000] response:
    {
      "response": [],
      "responseRequired": true
    }
Info 16   [00:00:34.000] FileWatcher:: Triggered with /a/b/moduleFile.ts 2:: WatchInfo: /a/b/moduleFile.ts 500 undefined WatchType: Closed Script info
Info 17   [00:00:35.000] FileWatcher:: Close:: WatchInfo: /a/b/moduleFile.ts 500 undefined WatchType: Closed Script info
Info 18   [00:00:36.000] Scheduled: /dev/null/inferredProject1*
Info 19   [00:00:37.000] Scheduled: *ensureProjectForOpenFiles*
Info 20   [00:00:38.000] Elapsed:: *ms FileWatcher:: Triggered with /a/b/moduleFile.ts 2:: WatchInfo: /a/b/moduleFile.ts 500 undefined WatchType: Closed Script info
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

FsWatchesRecursive::

Info 21   [00:00:41.000] Running: /dev/null/inferredProject1*
Info 22   [00:00:42.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 23   [00:00:43.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/moduleFile 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 24   [00:00:44.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/moduleFile 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 25   [00:00:45.000] DirectoryWatcher:: Added:: WatchInfo: /a/b 0 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 26   [00:00:46.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b 0 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 27   [00:00:47.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 2 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 28   [00:00:48.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 29   [00:00:49.000] 	Files (1)
	/a/b/file1.ts


	file1.ts
	  Root file specified for compilation

Info 30   [00:00:50.000] -----------------------------------------------
Info 31   [00:00:51.000] Running: *ensureProjectForOpenFiles*
Info 32   [00:00:52.000] Before ensureProjectForOpenFiles:
Info 33   [00:00:53.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 33   [00:00:54.000] 	Files (1)

Info 33   [00:00:55.000] -----------------------------------------------
Info 33   [00:00:56.000] Open files: 
Info 33   [00:00:57.000] 	FileName: /a/b/file1.ts ProjectRootPath: undefined
Info 33   [00:00:58.000] 		Projects: /dev/null/inferredProject1*
Info 33   [00:00:59.000] After ensureProjectForOpenFiles:
Info 34   [00:01:00.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 34   [00:01:01.000] 	Files (1)

Info 34   [00:01:02.000] -----------------------------------------------
Info 34   [00:01:03.000] Open files: 
Info 34   [00:01:04.000] 	FileName: /a/b/file1.ts ProjectRootPath: undefined
Info 34   [00:01:05.000] 		Projects: /dev/null/inferredProject1*
After running timeout callbacks

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/a/b/node_modules/@types:
  {"pollingInterval":500}
/a/b/modulefile:
  {"pollingInterval":500}

FsWatches::
/a/b:
  {}

FsWatchesRecursive::

Info 34   [00:01:06.000] request:
    {
      "command": "semanticDiagnosticsSync",
      "arguments": {
        "file": "/a/b/file1.ts"
      },
      "seq": 3,
      "type": "request"
    }
Before request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/a/b/node_modules/@types:
  {"pollingInterval":500}
/a/b/modulefile:
  {"pollingInterval":500}

FsWatches::
/a/b:
  {}

FsWatchesRecursive::

After request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/a/b/node_modules/@types:
  {"pollingInterval":500}
/a/b/modulefile:
  {"pollingInterval":500}

FsWatches::
/a/b:
  {}

FsWatchesRecursive::

Info 35   [00:01:07.000] response:
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
Info 36   [00:01:09.000] DirectoryWatcher:: Triggered with /a/b/moduleFile1.ts :: WatchInfo: /a/b 0 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 37   [00:01:10.000] Scheduled: /dev/null/inferredProject1*FailedLookupInvalidation
Info 38   [00:01:11.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /a/b/moduleFile1.ts :: WatchInfo: /a/b 0 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 39   [00:01:14.000] DirectoryWatcher:: Triggered with /a/b/moduleFile.ts :: WatchInfo: /a/b 0 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 40   [00:01:15.000] Scheduled: /dev/null/inferredProject1*FailedLookupInvalidation, Cancelled earlier one
Info 41   [00:01:16.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /a/b/moduleFile.ts :: WatchInfo: /a/b 0 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
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
/a/b:
  {}

FsWatchesRecursive::

Info 42   [00:01:17.000] Running: /dev/null/inferredProject1*FailedLookupInvalidation
Info 43   [00:01:18.000] Scheduled: /dev/null/inferredProject1*
Info 44   [00:01:19.000] Scheduled: *ensureProjectForOpenFiles*
After running timeout callbacks

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/a/b/node_modules/@types:
  {"pollingInterval":500}
/a/b/modulefile:
  {"pollingInterval":500}

FsWatches::
/a/b:
  {}

FsWatchesRecursive::

Info 45   [00:01:20.000] request:
    {
      "command": "change",
      "arguments": {
        "file": "/a/b/file1.ts",
        "line": 1,
        "offset": 44,
        "endLine": 1,
        "endOffset": 44,
        "insertString": "\n"
      },
      "seq": 4,
      "type": "request"
    }
Before request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/a/b/node_modules/@types:
  {"pollingInterval":500}
/a/b/modulefile:
  {"pollingInterval":500}

FsWatches::
/a/b:
  {}

FsWatchesRecursive::

After request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/a/b/node_modules/@types:
  {"pollingInterval":500}
/a/b/modulefile:
  {"pollingInterval":500}

FsWatches::
/a/b:
  {}

FsWatchesRecursive::

Info 46   [00:01:21.000] response:
    {
      "responseRequired": false
    }
Before running timeout callbacks

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/a/b/node_modules/@types:
  {"pollingInterval":500}
/a/b/modulefile:
  {"pollingInterval":500}

FsWatches::
/a/b:
  {}

FsWatchesRecursive::

Info 47   [00:01:22.000] Running: /dev/null/inferredProject1*
Info 48   [00:01:23.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 49   [00:01:24.000] FileWatcher:: Added:: WatchInfo: /a/b/moduleFile.ts 500 undefined WatchType: Closed Script info
Info 50   [00:01:25.000] DirectoryWatcher:: Close:: WatchInfo: /a/b/moduleFile 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 51   [00:01:26.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /a/b/moduleFile 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 52   [00:01:27.000] DirectoryWatcher:: Close:: WatchInfo: /a/b 0 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 53   [00:01:28.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /a/b 0 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 54   [00:01:29.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 3 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info 55   [00:01:30.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 56   [00:01:31.000] 	Files (2)
	/a/b/moduleFile.ts
	/a/b/file1.ts


	moduleFile.ts
	  Imported via './moduleFile' from file 'file1.ts'
	file1.ts
	  Root file specified for compilation

Info 57   [00:01:32.000] -----------------------------------------------
Info 58   [00:01:33.000] Running: *ensureProjectForOpenFiles*
Info 59   [00:01:34.000] Before ensureProjectForOpenFiles:
Info 60   [00:01:35.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 60   [00:01:36.000] 	Files (2)

Info 60   [00:01:37.000] -----------------------------------------------
Info 60   [00:01:38.000] Open files: 
Info 60   [00:01:39.000] 	FileName: /a/b/file1.ts ProjectRootPath: undefined
Info 60   [00:01:40.000] 		Projects: /dev/null/inferredProject1*
Info 60   [00:01:41.000] After ensureProjectForOpenFiles:
Info 61   [00:01:42.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 61   [00:01:43.000] 	Files (2)

Info 61   [00:01:44.000] -----------------------------------------------
Info 61   [00:01:45.000] Open files: 
Info 61   [00:01:46.000] 	FileName: /a/b/file1.ts ProjectRootPath: undefined
Info 61   [00:01:47.000] 		Projects: /dev/null/inferredProject1*
After running timeout callbacks

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/a/b/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/b/modulefile.ts:
  {}

FsWatchesRecursive::

Info 61   [00:01:48.000] request:
    {
      "command": "semanticDiagnosticsSync",
      "arguments": {
        "file": "/a/b/file1.ts"
      },
      "seq": 5,
      "type": "request"
    }
Before request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/a/b/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/b/modulefile.ts:
  {}

FsWatchesRecursive::

After request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/a/b/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/b/modulefile.ts:
  {}

FsWatchesRecursive::

Info 62   [00:01:49.000] response:
    {
      "response": [],
      "responseRequired": true
    }