Info 0    [16:00:17.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Info 1    [16:00:18.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/a/b/projects/temp/a.ts",
        "fileContent": "import f = require(\"pad\"); f;",
        "scriptKindName": "TS",
        "projectRootPath": "/a/b/projects/temp"
      },
      "seq": 1,
      "type": "request"
    }
Before request
//// [/a/b/projects/temp/a.ts]
import f = require("pad"); f;

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

Info 2    [16:00:19.000] Search path: /a/b/projects/temp
Info 3    [16:00:20.000] For info: /a/b/projects/temp/a.ts :: No config files found.
Info 4    [16:00:21.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 5    [16:00:22.000] FileWatcher:: Added:: WatchInfo: /a/b/projects/temp/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 6    [16:00:23.000] FileWatcher:: Added:: WatchInfo: /a/b/projects/temp/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 7    [16:00:24.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 8    [16:00:25.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 9    [16:00:26.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/projects/temp/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 10   [16:00:27.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/projects/temp/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 11   [16:00:28.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/projects/temp/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 12   [16:00:29.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/projects/temp/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 13   [16:00:30.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 14   [16:00:31.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 15   [16:00:32.000] 	Files (2)
	/a/lib/lib.d.ts
	/a/b/projects/temp/a.ts


	../../../lib/lib.d.ts
	  Default library for target 'es5'
	a.ts
	  Root file specified for compilation

Info 16   [16:00:33.000] -----------------------------------------------
Info 17   [16:00:34.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 17   [16:00:35.000] 	Files (2)

Info 17   [16:00:36.000] -----------------------------------------------
Info 17   [16:00:37.000] Open files: 
Info 17   [16:00:38.000] 	FileName: /a/b/projects/temp/a.ts ProjectRootPath: /a/b/projects/temp
Info 17   [16:00:39.000] 		Projects: /dev/null/inferredProject1*
After request

PolledWatches::
/a/b/projects/temp/tsconfig.json:
  {"pollingInterval":2000}
/a/b/projects/temp/jsconfig.json:
  {"pollingInterval":2000}
/a/b/projects/temp/node_modules:
  {"pollingInterval":500}
/a/b/projects/temp/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::

Info 17   [16:00:40.000] response:
    {
      "responseRequired": false
    }
Info 18   [16:00:41.000] request:
    {
      "command": "geterr",
      "arguments": {
        "delay": 0,
        "files": [
          "/a/b/projects/temp/a.ts"
        ]
      },
      "seq": 2,
      "type": "request"
    }
Before request

PolledWatches::
/a/b/projects/temp/tsconfig.json:
  {"pollingInterval":2000}
/a/b/projects/temp/jsconfig.json:
  {"pollingInterval":2000}
/a/b/projects/temp/node_modules:
  {"pollingInterval":500}
/a/b/projects/temp/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::

After request

PolledWatches::
/a/b/projects/temp/tsconfig.json:
  {"pollingInterval":2000}
/a/b/projects/temp/jsconfig.json:
  {"pollingInterval":2000}
/a/b/projects/temp/node_modules:
  {"pollingInterval":500}
/a/b/projects/temp/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::

Info 19   [16:00:42.000] response:
    {
      "responseRequired": false
    }
Before checking timeout queue length (1) and running

PolledWatches::
/a/b/projects/temp/tsconfig.json:
  {"pollingInterval":2000}
/a/b/projects/temp/jsconfig.json:
  {"pollingInterval":2000}
/a/b/projects/temp/node_modules:
  {"pollingInterval":500}
/a/b/projects/temp/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::

Info 20   [16:00:43.000] event:
    {"seq":0,"type":"event","event":"syntaxDiag","body":{"file":"/a/b/projects/temp/a.ts","diagnostics":[]}}
After checking timeout queue length (1) and running

PolledWatches::
/a/b/projects/temp/tsconfig.json:
  {"pollingInterval":2000}
/a/b/projects/temp/jsconfig.json:
  {"pollingInterval":2000}
/a/b/projects/temp/node_modules:
  {"pollingInterval":500}
/a/b/projects/temp/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::

Before running immediate callbacks and checking length (1)

PolledWatches::
/a/b/projects/temp/tsconfig.json:
  {"pollingInterval":2000}
/a/b/projects/temp/jsconfig.json:
  {"pollingInterval":2000}
/a/b/projects/temp/node_modules:
  {"pollingInterval":500}
/a/b/projects/temp/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::

Info 21   [16:00:44.000] event:
    {"seq":0,"type":"event","event":"semanticDiag","body":{"file":"/a/b/projects/temp/a.ts","diagnostics":[{"start":{"line":1,"offset":20},"end":{"line":1,"offset":25},"text":"Cannot find module 'pad' or its corresponding type declarations.","code":2307,"category":"error"}]}}
Before running immediate callbacks and checking length (1)

PolledWatches::
/a/b/projects/temp/tsconfig.json:
  {"pollingInterval":2000}
/a/b/projects/temp/jsconfig.json:
  {"pollingInterval":2000}
/a/b/projects/temp/node_modules:
  {"pollingInterval":500}
/a/b/projects/temp/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::

Before running immediate callbacks and checking length (1)

PolledWatches::
/a/b/projects/temp/tsconfig.json:
  {"pollingInterval":2000}
/a/b/projects/temp/jsconfig.json:
  {"pollingInterval":2000}
/a/b/projects/temp/node_modules:
  {"pollingInterval":500}
/a/b/projects/temp/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::

Info 22   [16:00:45.000] event:
    {"seq":0,"type":"event","event":"suggestionDiag","body":{"file":"/a/b/projects/temp/a.ts","diagnostics":[]}}
Info 23   [16:00:46.000] event:
    {"seq":0,"type":"event","event":"requestCompleted","body":{"request_seq":2}}
Before running immediate callbacks and checking length (1)

PolledWatches::
/a/b/projects/temp/tsconfig.json:
  {"pollingInterval":2000}
/a/b/projects/temp/jsconfig.json:
  {"pollingInterval":2000}
/a/b/projects/temp/node_modules:
  {"pollingInterval":500}
/a/b/projects/temp/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::

Info 24   [16:00:52.000] DirectoryWatcher:: Triggered with /a/b/projects/temp/node_modules :: WatchInfo: /a/b/projects/temp/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 25   [16:00:53.000] Scheduled: /dev/null/inferredProject1*FailedLookupInvalidation
Info 26   [16:00:54.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /a/b/projects/temp/node_modules :: WatchInfo: /a/b/projects/temp/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 27   [16:00:55.000] DirectoryWatcher:: Triggered with /a/b/projects/temp/node_modules :: WatchInfo: /a/b/projects/temp/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 28   [16:00:56.000] Scheduled: /dev/null/inferredProject1*FailedLookupInvalidation, Cancelled earlier one
Info 29   [16:00:57.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /a/b/projects/temp/node_modules :: WatchInfo: /a/b/projects/temp/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 30   [16:00:59.000] DirectoryWatcher:: Triggered with /a/b/projects/temp/node_modules/@types :: WatchInfo: /a/b/projects/temp/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 31   [16:01:00.000] Scheduled: /dev/null/inferredProject1*
Info 32   [16:01:01.000] Scheduled: *ensureProjectForOpenFiles*
Info 33   [16:01:02.000] Scheduled: /dev/null/inferredProject1*FailedLookupInvalidation, Cancelled earlier one
Info 34   [16:01:03.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /a/b/projects/temp/node_modules/@types :: WatchInfo: /a/b/projects/temp/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 35   [16:01:04.000] DirectoryWatcher:: Triggered with /a/b/projects/temp/node_modules/@types :: WatchInfo: /a/b/projects/temp/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 36   [16:01:05.000] Scheduled: /dev/null/inferredProject1*, Cancelled earlier one
Info 37   [16:01:06.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 38   [16:01:07.000] Scheduled: /dev/null/inferredProject1*FailedLookupInvalidation, Cancelled earlier one
Info 39   [16:01:08.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /a/b/projects/temp/node_modules/@types :: WatchInfo: /a/b/projects/temp/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 40   [16:01:09.000] DirectoryWatcher:: Triggered with /a/b/projects/temp/node_modules/@types :: WatchInfo: /a/b/projects/temp/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 41   [16:01:10.000] Scheduled: /dev/null/inferredProject1*FailedLookupInvalidation, Cancelled earlier one
Info 42   [16:01:11.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /a/b/projects/temp/node_modules/@types :: WatchInfo: /a/b/projects/temp/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 43   [16:01:13.000] DirectoryWatcher:: Triggered with /a/b/projects/temp/node_modules/@types/pad :: WatchInfo: /a/b/projects/temp/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 44   [16:01:14.000] Scheduled: /dev/null/inferredProject1*, Cancelled earlier one
Info 45   [16:01:15.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 46   [16:01:16.000] Scheduled: /dev/null/inferredProject1*FailedLookupInvalidation, Cancelled earlier one
Info 47   [16:01:17.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /a/b/projects/temp/node_modules/@types/pad :: WatchInfo: /a/b/projects/temp/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 48   [16:01:18.000] DirectoryWatcher:: Triggered with /a/b/projects/temp/node_modules/@types/pad :: WatchInfo: /a/b/projects/temp/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 49   [16:01:19.000] Scheduled: /dev/null/inferredProject1*FailedLookupInvalidation, Cancelled earlier one
Info 50   [16:01:20.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /a/b/projects/temp/node_modules/@types/pad :: WatchInfo: /a/b/projects/temp/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Before running timeout callbacks
//// [/a/b/projects/temp/node_modules/@types/pad/index.d.ts]
export = pad;declare function pad(length: number, text: string, char ?: string): string;


PolledWatches::
/a/b/projects/temp/tsconfig.json:
  {"pollingInterval":2000}
/a/b/projects/temp/jsconfig.json:
  {"pollingInterval":2000}

FsWatches::
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/a/b/projects/temp/node_modules:
  {}
/a/b/projects/temp/node_modules/@types:
  {}

Info 51   [16:01:22.000] Running: /dev/null/inferredProject1*
Info 52   [16:01:23.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 53   [16:01:24.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 54   [16:01:25.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/projects/temp/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info 55   [16:01:26.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/projects/temp/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info 56   [16:01:27.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 2 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info 57   [16:01:28.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 58   [16:01:29.000] 	Files (3)
	/a/lib/lib.d.ts
	/a/b/projects/temp/node_modules/@types/pad/index.d.ts
	/a/b/projects/temp/a.ts


	../../../lib/lib.d.ts
	  Default library for target 'es5'
	node_modules/@types/pad/index.d.ts
	  Imported via "pad" from file 'a.ts'
	  Entry point for implicit type library 'pad'
	a.ts
	  Root file specified for compilation

Info 59   [16:01:30.000] -----------------------------------------------
After running timeout callbacks

PolledWatches::
/a/b/projects/temp/tsconfig.json:
  {"pollingInterval":2000}
/a/b/projects/temp/jsconfig.json:
  {"pollingInterval":2000}

FsWatches::
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/a/b/projects/temp/node_modules:
  {}
/a/b/projects/temp/node_modules/@types:
  {}

Before running timeout callbacks

PolledWatches::
/a/b/projects/temp/tsconfig.json:
  {"pollingInterval":2000}
/a/b/projects/temp/jsconfig.json:
  {"pollingInterval":2000}

FsWatches::
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/a/b/projects/temp/node_modules:
  {}
/a/b/projects/temp/node_modules/@types:
  {}

Info 60   [16:01:31.000] Running: *ensureProjectForOpenFiles*
Info 61   [16:01:32.000] Before ensureProjectForOpenFiles:
Info 62   [16:01:33.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 62   [16:01:34.000] 	Files (3)

Info 62   [16:01:35.000] -----------------------------------------------
Info 62   [16:01:36.000] Open files: 
Info 62   [16:01:37.000] 	FileName: /a/b/projects/temp/a.ts ProjectRootPath: /a/b/projects/temp
Info 62   [16:01:38.000] 		Projects: /dev/null/inferredProject1*
Info 62   [16:01:39.000] After ensureProjectForOpenFiles:
Info 63   [16:01:40.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 63   [16:01:41.000] 	Files (3)

Info 63   [16:01:42.000] -----------------------------------------------
Info 63   [16:01:43.000] Open files: 
Info 63   [16:01:44.000] 	FileName: /a/b/projects/temp/a.ts ProjectRootPath: /a/b/projects/temp
Info 63   [16:01:45.000] 		Projects: /dev/null/inferredProject1*
Info 63   [16:01:46.000] got projects updated in background, updating diagnostics for /a/b/projects/temp/a.ts
Info 64   [16:01:47.000] event:
    {"seq":0,"type":"event","event":"projectsUpdatedInBackground","body":{"openFiles":["/a/b/projects/temp/a.ts"]}}
After running timeout callbacks

PolledWatches::
/a/b/projects/temp/tsconfig.json:
  {"pollingInterval":2000}
/a/b/projects/temp/jsconfig.json:
  {"pollingInterval":2000}

FsWatches::
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/a/b/projects/temp/node_modules:
  {}
/a/b/projects/temp/node_modules/@types:
  {}

Before running timeout callbacks

PolledWatches::
/a/b/projects/temp/tsconfig.json:
  {"pollingInterval":2000}
/a/b/projects/temp/jsconfig.json:
  {"pollingInterval":2000}

FsWatches::
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/a/b/projects/temp/node_modules:
  {}
/a/b/projects/temp/node_modules/@types:
  {}

Info 65   [16:01:48.000] event:
    {"seq":0,"type":"event","event":"syntaxDiag","body":{"file":"/a/b/projects/temp/a.ts","diagnostics":[]}}
After running timeout callbacks

PolledWatches::
/a/b/projects/temp/tsconfig.json:
  {"pollingInterval":2000}
/a/b/projects/temp/jsconfig.json:
  {"pollingInterval":2000}

FsWatches::
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/a/b/projects/temp/node_modules:
  {}
/a/b/projects/temp/node_modules/@types:
  {}

Before running immediate callbacks

PolledWatches::
/a/b/projects/temp/tsconfig.json:
  {"pollingInterval":2000}
/a/b/projects/temp/jsconfig.json:
  {"pollingInterval":2000}

FsWatches::
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/a/b/projects/temp/node_modules:
  {}
/a/b/projects/temp/node_modules/@types:
  {}

Info 66   [16:01:49.000] event:
    {"seq":0,"type":"event","event":"semanticDiag","body":{"file":"/a/b/projects/temp/a.ts","diagnostics":[]}}
Before running immediate callbacks

PolledWatches::
/a/b/projects/temp/tsconfig.json:
  {"pollingInterval":2000}
/a/b/projects/temp/jsconfig.json:
  {"pollingInterval":2000}

FsWatches::
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/a/b/projects/temp/node_modules:
  {}
/a/b/projects/temp/node_modules/@types:
  {}
