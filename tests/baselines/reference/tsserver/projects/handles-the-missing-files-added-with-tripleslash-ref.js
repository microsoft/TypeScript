Info 0    [00:00:13.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Info 1    [00:00:14.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/a/b/commonFile1.ts"
      },
      "seq": 1,
      "type": "request"
    }
Before request
//// [/a/b/commonFile1.ts]
/// <reference path="commonFile2.ts"/>
                    let x = y

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

Info 2    [00:00:15.000] Search path: /a/b
Info 3    [00:00:16.000] For info: /a/b/commonFile1.ts :: No config files found.
Info 4    [00:00:17.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 5    [00:00:18.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 6    [00:00:19.000] FileWatcher:: Added:: WatchInfo: /a/b/commonfile2.ts 500 undefined Project: /dev/null/inferredProject1* WatchType: Missing file
Info 7    [00:00:20.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 8    [00:00:21.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 9    [00:00:22.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 10   [00:00:23.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 11   [00:00:24.000] 	Files (2)
	/a/lib/lib.d.ts
	/a/b/commonFile1.ts


	../lib/lib.d.ts
	  Default library for target 'es5'
	commonFile1.ts
	  Root file specified for compilation

Info 12   [00:00:25.000] -----------------------------------------------
Info 13   [00:00:26.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 13   [00:00:27.000] 	Files (2)

Info 13   [00:00:28.000] -----------------------------------------------
Info 13   [00:00:29.000] Open files: 
Info 13   [00:00:30.000] 	FileName: /a/b/commonFile1.ts ProjectRootPath: undefined
Info 13   [00:00:31.000] 		Projects: /dev/null/inferredProject1*
After request

PolledWatches::
/a/b/commonfile2.ts:
  {"pollingInterval":500}
/a/b/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::

Info 13   [00:00:32.000] response:
    {
      "responseRequired": false
    }
Info 14   [00:00:33.000] request:
    {
      "command": "semanticDiagnosticsSync",
      "arguments": {
        "file": "/a/b/commonFile1.ts"
      },
      "seq": 2,
      "type": "request"
    }
Before request

PolledWatches::
/a/b/commonfile2.ts:
  {"pollingInterval":500}
/a/b/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::

After request

PolledWatches::
/a/b/commonfile2.ts:
  {"pollingInterval":500}
/a/b/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::

Info 15   [00:00:34.000] response:
    {
      "response": [
        {
          "start": {
            "line": 2,
            "offset": 29
          },
          "end": {
            "line": 2,
            "offset": 30
          },
          "text": "Cannot find name 'y'.",
          "code": 2304,
          "category": "error"
        },
        {
          "start": {
            "line": 1,
            "offset": 22
          },
          "end": {
            "line": 1,
            "offset": 36
          },
          "text": "File '/a/b/commonFile2.ts' not found.",
          "code": 6053,
          "category": "error"
        }
      ],
      "responseRequired": true
    }
Info 16   [00:00:37.000] FileWatcher:: Triggered with /a/b/commonfile2.ts 0:: WatchInfo: /a/b/commonfile2.ts 500 undefined Project: /dev/null/inferredProject1* WatchType: Missing file
Info 17   [00:00:38.000] FileWatcher:: Close:: WatchInfo: /a/b/commonfile2.ts 500 undefined Project: /dev/null/inferredProject1* WatchType: Missing file
Info 18   [00:00:39.000] Scheduled: /dev/null/inferredProject1*
Info 19   [00:00:40.000] Scheduled: *ensureProjectForOpenFiles*
Info 20   [00:00:41.000] Elapsed:: *ms FileWatcher:: Triggered with /a/b/commonfile2.ts 0:: WatchInfo: /a/b/commonfile2.ts 500 undefined Project: /dev/null/inferredProject1* WatchType: Missing file
Before running timeout callbacks
//// [/a/b/commonFile2.ts]
let y = 1


PolledWatches::
/a/b/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::

Info 21   [00:00:42.000] Running: /dev/null/inferredProject1*
Info 22   [00:00:43.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 23   [00:00:44.000] FileWatcher:: Added:: WatchInfo: /a/b/commonFile2.ts 500 undefined WatchType: Closed Script info
Info 24   [00:00:45.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 2 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 25   [00:00:46.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 26   [00:00:47.000] 	Files (3)
	/a/lib/lib.d.ts
	/a/b/commonFile2.ts
	/a/b/commonFile1.ts


	../lib/lib.d.ts
	  Default library for target 'es5'
	commonFile2.ts
	  Referenced via 'commonFile2.ts' from file 'commonFile1.ts'
	commonFile1.ts
	  Root file specified for compilation

Info 27   [00:00:48.000] -----------------------------------------------
Info 28   [00:00:49.000] Running: *ensureProjectForOpenFiles*
Info 29   [00:00:50.000] Before ensureProjectForOpenFiles:
Info 30   [00:00:51.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 30   [00:00:52.000] 	Files (3)

Info 30   [00:00:53.000] -----------------------------------------------
Info 30   [00:00:54.000] Open files: 
Info 30   [00:00:55.000] 	FileName: /a/b/commonFile1.ts ProjectRootPath: undefined
Info 30   [00:00:56.000] 		Projects: /dev/null/inferredProject1*
Info 30   [00:00:57.000] After ensureProjectForOpenFiles:
Info 31   [00:00:58.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 31   [00:00:59.000] 	Files (3)

Info 31   [00:01:00.000] -----------------------------------------------
Info 31   [00:01:01.000] Open files: 
Info 31   [00:01:02.000] 	FileName: /a/b/commonFile1.ts ProjectRootPath: undefined
Info 31   [00:01:03.000] 		Projects: /dev/null/inferredProject1*
After running timeout callbacks

PolledWatches::
/a/b/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts:
  {}
/a/b/commonfile2.ts:
  {}

FsWatchesRecursive::

Info 31   [00:01:04.000] request:
    {
      "command": "semanticDiagnosticsSync",
      "arguments": {
        "file": "/a/b/commonFile1.ts"
      },
      "seq": 3,
      "type": "request"
    }
Before request

PolledWatches::
/a/b/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts:
  {}
/a/b/commonfile2.ts:
  {}

FsWatchesRecursive::

After request

PolledWatches::
/a/b/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts:
  {}
/a/b/commonfile2.ts:
  {}

FsWatchesRecursive::

Info 32   [00:01:05.000] response:
    {
      "response": [],
      "responseRequired": true
    }