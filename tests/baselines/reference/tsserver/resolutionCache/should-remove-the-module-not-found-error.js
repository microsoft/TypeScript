Info 0    [16:00:09.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Info 1    [16:00:10.000] request:
    {
      "seq": 0,
      "type": "request",
      "command": "open",
      "arguments": {
        "file": "/a/b/file1.ts"
      }
    }
//// [/a/b/file1.ts]
import * as T from './moduleFile'; T.bar();


PolledWatches::

FsWatches::

FsWatchesRecursive::

Info 2    [16:00:11.000] Search path: /a/b
Info 3    [16:00:12.000] For info: /a/b/file1.ts :: No config files found.
Info 4    [16:00:13.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 5    [16:00:14.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 6    [16:00:15.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/moduleFile 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 7    [16:00:16.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/moduleFile 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 8    [16:00:17.000] DirectoryWatcher:: Added:: WatchInfo: /a/b 0 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 9    [16:00:18.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b 0 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 10   [16:00:19.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /dev/null/inferredProject1* WatchType: Missing file
Info 11   [16:00:20.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 12   [16:00:21.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 13   [16:00:22.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 14   [16:00:23.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 15   [16:00:24.000] 	Files (1)
	/a/b/file1.ts


	file1.ts
	  Root file specified for compilation

Info 16   [16:00:25.000] -----------------------------------------------
Info 17   [16:00:26.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 17   [16:00:27.000] 	Files (1)

Info 17   [16:00:28.000] -----------------------------------------------
Info 17   [16:00:29.000] Open files: 
Info 17   [16:00:30.000] 	FileName: /a/b/file1.ts ProjectRootPath: undefined
Info 17   [16:00:31.000] 		Projects: /dev/null/inferredProject1*

PolledWatches::
/a/b/modulefile:
  {"pollingInterval":500}
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/a/b/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/b:
  {}

FsWatchesRecursive::

Info 17   [16:00:32.000] response:
    {
      "responseRequired": false
    }
Info 18   [16:00:33.000] request:
    {
      "seq": 0,
      "type": "request",
      "command": "semanticDiagnosticsSync",
      "arguments": {
        "file": "/a/b/file1.ts"
      }
    }

PolledWatches::
/a/b/modulefile:
  {"pollingInterval":500}
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/a/b/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/b:
  {}

FsWatchesRecursive::


PolledWatches::
/a/b/modulefile:
  {"pollingInterval":500}
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/a/b/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/b:
  {}

FsWatchesRecursive::

Info 19   [16:00:34.000] response:
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
Info 20   [16:00:37.000] DirectoryWatcher:: Triggered with /a/b/moduleFile.ts :: WatchInfo: /a/b 0 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 21   [16:00:38.000] Scheduled: /dev/null/inferredProject1*FailedLookupInvalidation
Info 22   [16:00:39.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /a/b/moduleFile.ts :: WatchInfo: /a/b 0 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 23   [16:00:40.000] Running: /dev/null/inferredProject1*FailedLookupInvalidation
Info 24   [16:00:41.000] Scheduled: /dev/null/inferredProject1*
Info 25   [16:00:42.000] Scheduled: *ensureProjectForOpenFiles*
Info 26   [16:00:43.000] request:
    {
      "seq": 0,
      "type": "request",
      "command": "change",
      "arguments": {
        "file": "/a/b/file1.ts",
        "line": 1,
        "offset": 44,
        "endLine": 1,
        "endOffset": 44,
        "insertString": "\n"
      }
    }
//// [/a/b/moduleFile.ts]
export function bar() { };


PolledWatches::
/a/b/modulefile:
  {"pollingInterval":500}
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/a/b/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/b:
  {}

FsWatchesRecursive::


PolledWatches::
/a/b/modulefile:
  {"pollingInterval":500}
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/a/b/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/b:
  {}

FsWatchesRecursive::

Info 27   [16:00:44.000] response:
    {
      "responseRequired": false
    }
Info 28   [16:00:45.000] request:
    {
      "seq": 0,
      "type": "request",
      "command": "semanticDiagnosticsSync",
      "arguments": {
        "file": "/a/b/file1.ts"
      }
    }

PolledWatches::
/a/b/modulefile:
  {"pollingInterval":500}
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/a/b/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/b:
  {}

FsWatchesRecursive::

Info 29   [16:00:46.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 30   [16:00:47.000] FileWatcher:: Added:: WatchInfo: /a/b/moduleFile.ts 500 undefined WatchType: Closed Script info
Info 31   [16:00:48.000] DirectoryWatcher:: Close:: WatchInfo: /a/b/moduleFile 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 32   [16:00:49.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /a/b/moduleFile 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 33   [16:00:50.000] DirectoryWatcher:: Close:: WatchInfo: /a/b 0 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 34   [16:00:51.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /a/b 0 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 35   [16:00:52.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 2 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info 36   [16:00:53.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 37   [16:00:54.000] 	Files (2)
	/a/b/moduleFile.ts
	/a/b/file1.ts


	moduleFile.ts
	  Imported via './moduleFile' from file 'file1.ts'
	file1.ts
	  Root file specified for compilation

Info 38   [16:00:55.000] -----------------------------------------------

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/a/b/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/b/modulefile.ts:
  {}

FsWatchesRecursive::

Info 39   [16:00:56.000] response:
    {
      "response": [],
      "responseRequired": true
    }